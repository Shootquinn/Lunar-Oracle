#!/usr/bin/env node
/*
 * tools/verify_corpus.js - sub-step 2.17 (MERGE-11). THE SINGLE TOOL THAT REPORTS CORPUS STATE.
 *
 * Naming conformance, provenance completeness, duplicate identifiers with no primary/secondary
 * call, register integrity, well-formed source declarations, and the upstream divergence check.
 * It REPORTS. It never writes into literature/, oracle/ or any working copy. It is re-runnable
 * and every run stamps what it read.
 *
 * -------------------------------------------------------------------------------------------
 * WHY THIS FILE IS AT tools/ AND NOT AT oracle/, WHICH IS WHERE 2.17 NAMED IT.
 *
 * `oracle/check_register.md` row CHK-31 names `tools/verify_corpus.js`, and its authority cell
 * records the decision: "ROW MINTED BEFORE THE ARTIFACT ... 2.17 named it oracle/verify_corpus.js,
 * oracle/**\/*.js is a declared S root, and CL-1 would have failed it on the day it landed. Ruled
 * to tools/ at 2.20 alongside CHK-13 -- ONE PATH DECISION, MADE ONCE, by one seat holding both the
 * register and the file."
 *
 * That ruling is already made, by the seat that owns the register, in the register. Landing this
 * file at `oracle/verify_corpus.js` would (a) reproduce exactly the defect 2.20 was convened to
 * fix, (b) require a new C row, against a wave allowance of zero check rows, and (c) leave CHK-31
 * naming a path that is not the file that runs -- a register row pointing at nothing, which is the
 * CHK-03 class this project has already paid for twice. Two files, one at each path, is worse
 * again: it is two authorities on one mechanism, which is the CHK-13 defect by name.
 *
 * So the brief's ruled path is refused rather than bent, and the refusal is routed rather than
 * silently applied. See cr_scratch/step2_software_engineer_verify.md "## Not mine".
 *
 * ONE CONSEQUENCE, OWED TO THE SYSTEMS ENGINEER: CHK-31's status is `specified`, and CL-2 says a
 * `specified` row whose path exists must be moved to `live`. This file now exists. The status flip
 * is a check-register edit and the check register is not in this seat's write set. Routed.
 *
 * -------------------------------------------------------------------------------------------
 * THE TWO RULES THIS TOOL IS BUILT AROUND, both of them this project's own measured failures.
 *
 * 1. VACUOUS IS NOT PASS. Every check declares the size of the population it walked. A check whose
 *    population is empty or missing returns VACUOUS and is counted apart from PASS, forever. Every
 *    corpus tool written before Wave 2 was authored against an empty `literature/` and passed
 *    vacuously; `oracle/tests/run_suite.js` was built because that is indistinguishable, in a
 *    status column, from a clean result. An empty list must never read as a clean one.
 *
 * 2. THE TOOL DECLARES ITS OWN EXPECTED COUNTS AND CHECKS THEM. §KA below is a known-answer test:
 *    the counts this tool expects the shelf to have, checked against the shelf on every run. If the
 *    shelf moves, the tool says so in its own voice instead of quietly reporting the new number as
 *    though it had always been the number. A measuring instrument that cannot be wrong out loud is
 *    an instrument nobody can calibrate.
 *
 * -------------------------------------------------------------------------------------------
 * OUTPUT PREFIXES, at column 0 and nothing else is, per COUNTING_RULE.md section 3 rule 11, so a
 * count over unfiltered output is exact:
 *
 *   FAIL     a hard failure; exits 1
 *   VACUOUS  the population was empty or missing; ASSERTED NOTHING; never a pass
 *   REPORT   a finding for a person, which the contract rules is not a failure (e.g. DUP-4:
 *            a level-3 dedup match is a candidate, never a confirmation)
 *   OK       a clause that ran over a non-empty population and passed
 *   NOTE     an observation about the run
 *
 * EXIT CODE. 1 if any FAIL line was printed, including a known-answer mismatch. 0 otherwise.
 * REPORT and VACUOUS do not exit non-zero -- but they are counted separately in the summary and
 * the summary never folds them into the pass count.
 *
 * USAGE
 *   node tools/verify_corpus.js                 the real shelf, every check
 *   node tools/verify_corpus.js --tree <dir>    a STAGED tree, so a gate can run before promotion
 *   node tools/verify_corpus.js --only NAM,PRV  a subset of the check ids
 *   node tools/verify_corpus.js --json          machine-readable
 *   node tools/verify_corpus.js --sources       every Source: declaration, and whether the source
 *                                               it names can be opened from this machine. This is
 *                                               a listing FOR THE COPYRIGHT AUDIT, which needs the
 *                                               author's source folders. It is not a corpus check
 *                                               and it decides nothing: a clone opens none of them
 *                                               and its corpus is complete
 *   node tools/verify_corpus.js --selftest      plant defects in a scratch tree and prove each
 *                                               check goes red, and that an empty tree is VACUOUS
 *
 * The self-test is the pattern of `lsei/oracle/lib/literature_search.js`'s `--prove` foot: build a
 * fixture, run the real code paths against it, assert the result, remove the fixture. It is not a
 * copy of it -- that file proves a search, this one proves a checker, and the thing a checker has
 * to prove is that it can FAIL.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const TOOL_VERSION = '2.17-1';
const ROOT = process.env.QJS_ROOT ? path.resolve(process.env.QJS_ROOT) : process.cwd();
const R = p => path.join(ROOT, p);

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf('--' + n); return i < 0 ? d : argv[i + 1]; };
const flag = n => argv.indexOf('--' + n) !== -1;

/* ============================================================================ contract constants
 * Every one of these is a transcription of a clause in a contract file, with the clause named.
 * Nothing here is this tool's own invention; where this tool disagrees with a contract it says so
 * in a REPORT line rather than quietly implementing its own preference. */

// NAMING.md section 2.
const R_S = /^(?!fa[0-8]-)[a-z0-9]+(-[a-z0-9]+)*\.md$/;
const R_F = /^fa[0-8]-[a-z0-9]+(-[a-z0-9]+)*\.md$/;

// NAMING.md section 8 / section 11 A3.
const CEIL_RELPATH = 108, CEIL_LEAF = 64, CEIL_FOLDER = 32, CORPUS_DEPTH = 2;

// NAMING.md section 10, whitelisted BY NAME and never by pattern (A5, and corpus_suite NAM-12).
const A5_EXCEPTIONS = ['may-1977-how-japans-economy-grew-so-fast-review.md'];

// lsei/oracle/lib/literature_search.js. Transcribed, not imported: this tool must be able to
// disagree with the retrieval layer about what a token is, and a shared import hides that. It also
// must not depend on a floating read-only working copy to decide whether our own corpus is legal.
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'as', 'is',
  'are', 'was', 'were', 'be', 'been', 'being', 'it', 'its', 'this', 'that', 'these', 'those', 'what', 'which',
  'who', 'how', 'why', 'when', 'where', 'did', 'does', 'do', 'not', 'no', 'so', 'than', 'then', 'if', 'into',
  'about', 'across', 'over', 'under', 'out', 'up', 'down', 'per', 'via', 'vs', 'and/or', 'their', 'it\'s',
  'would', 'could', 'should', 'will', 'shall', 'can', 'may', 'might', 'also', 'only', 'one', 'two', 'three',
  'app', 'apps', 'model', 'models', 'modeled', 'modelled', 'modeling', 'modelling', 'assumes', 'assumed',
]);
const tokenize = t => (String(t).toLowerCase().match(/[a-z0-9]+/g) || [])
  .filter(x => x.length > 1 && !STOPWORDS.has(x));

// NAMING.md section 1, the merge key. Kept local for the same reason.
const normalize = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* THE LANDED PROVENANCE CONTRACT, and the disagreement it carries.
 *
 * corpus_suite.md section 5 (PRV-2) rules an eight-key minimum of
 *   {Origin corpus, Origin path, Merge disposition, Reconciled against, Source identifier,
 *    Source file, Licence} (+ Also).
 * MEASURED over all 168 landed files: NOT ONE of those keys is written by the merge. What the
 * merge writes, on all 168 files with no exception, is a different and internally consistent eight:
 *   {Landed, Source, Byte source, Disposition, Dedup key, Field, Folder, Plan row rev}.
 *
 * This tool checks the LANDED set, and reports the divergence from PRV-2 as a routed finding for
 * The Engineer. It does not implement PRV-2 as ruled. Implementing PRV-2 as ruled produces 168
 * failures on a shelf whose provenance is in fact complete and uniform -- a wall of findings the
 * reader must know to discount, which is the argument COUNTING_RULE.md section 8 already used to
 * keep `lsei/` out of the declared set and to cut M13 over `literature/`. Same argument, same
 * direction: demote the clause that produces the wall, not the files. Routed, not bent. */
const PRV_LANDED_KEYS = ['Landed', 'Source', 'Byte source', 'Disposition', 'Dedup key', 'Field',
  'Folder', 'Plan row rev'];
const PRV_RULED_KEYS = ['Origin corpus', 'Origin path', 'Merge disposition', 'Reconciled against',
  'Source identifier', 'Source file', 'Licence'];

/* Closed sets, measured off the shelf and cross-read against cr_scratch/merge_plan.tsv's legend.
 *
 * EXTENDED ONCE, by one member each, on ORCHESTRATOR RULING at W3-6, 2026-08-28. All 168 members
 * measured at af7abec described a LIFT: every landed file had been copied from a source, so
 * `Byte source` named which copy won and `Disposition` named the merge outcome. Neither set had a
 * member meaning "this project wrote it." `oracle/bootstrap_contract.md` already declares a
 * `findings/` shelf of this project's own prior conclusions, which is entirely original writing, so
 * a corpus that cannot represent a file it wrote itself is a Step 6 blocker. It surfaced here
 * because denison-1972-classification-of-sources-of-growth.md is the first original composition on
 * the shelf. `original-composition` and `WRITTEN` are the two new members; nothing else changed. */
const BYTE_SOURCE = ['sole-lsei', 'sole-intake', 'both-identical', 'lsei-primary', 'intake-primary',
  'original-composition'];
const DISPOSITION = ['LIFT', 'LIFT-IDENTICAL', 'LIFT-LSEI-SCRUB', 'LIFT-LSEI-STEP0',
  'HOLD-NOID', 'HOLD-PAIR', 'HOLD-FALSEMERGE', 'WRITTEN'];
const DEDUP_LEVEL = ['L0', 'L1', 'L2A', 'L2B', 'L3', 'L3-NAME'];

/* ==================================================================================== §KA
 * KNOWN ANSWERS. Declared here, checked against the artifact on every run.
 *
 * Taken 2026-08-28 at HEAD af7abec over the 168-file shelf. These are STRUCTURAL EXPECTATIONS --
 * things that should be true -- and a mismatch is a FAIL, because the alternative is a tool that
 * silently re-baselines itself against whatever it happens to find and can therefore never report
 * that the shelf moved.
 *
 * When the shelf legitimately grows, these numbers are re-taken IN THIS FILE, in the same edit that
 * grows it, and the run that re-takes them prints its read-digest. That is the point of writing
 * them down: the update is a visible act rather than an absence of one. */
/* RE-TAKEN at W3-6, 2026-08-28, in the same edit that grew the shelf, as this block requires.
 * One file landed: literature/growth-theory/denison-1972-classification-of-sources-of-growth.md,
 * economics, folder growth-theory, Source: under _intake/, dedup key L1|<doi>, one INDEX.tsv row.
 * Every count below that moved, moved by exactly one, and every one of them is that file. `folders`,
 * `fieldsRows` and `duplicatePairCalls` did not move and were not touched. */
const KA = {
  at: 'af7abec + W3-6 landing, 2026-08-28',
  files: 169,
  folders: 11,
  fieldCounts: { lunar: 124, economics: 45 },
  indexRows: 169,
  fieldsRows: 2,
  /* RE-TAKEN at W5-5, 2026-08-29, in the same edit that changed the declarations. The 25 that read
   * `_intake/japanese-miracle/...` now read `japanese-miracle:...`: same 25 files, same sources,
   * a portable identity instead of one machine's path. This count is over the DECLARATION TEXT and
   * not over what resolved, which is why it is the same number in a fresh clone as it is here --
   * a known answer that moved with the machine would not be a known answer. */
  sourceRoots: { lsei: 144, 'japanese-miracle': 25 },
  dedupParsed: 169,
  duplicatePairCalls: 8,
};

/* BASELINE OBSERVATIONS. These are DEFECT counts, not expectations. They are printed as NOTE and
 * drift in them never fails the run -- a defect count that fails when it FALLS is a check that
 * punishes the repair. They exist so that a reader can tell "the shelf still has the fourteen"
 * from "the shelf has fourteen new ones". */
const BASELINE = {
  doubleProvenanceBlocks: 14,
  danglingSourceFileRefs: 7,
  level3DuplicateGroupsUncalled: 1,
};

/* ================================================================================= read-digest
 * Computed and printed BEFORE any check runs, so the stamp survives a check that throws. The set
 * is enumerated from the actual walk, not inferred: a digest over a set the tool did not read
 * certifies the wrong moment, which is worse than no digest. */
function readDigest(absPaths) {
  const h = crypto.createHash('sha256');
  let n = 0;
  for (const p of absPaths.slice().sort()) {
    const rel = path.relative(ROOT, p).split(path.sep).join('/');
    let st;
    try { st = fs.statSync(p); } catch (e) { h.update(rel + '\0MISSING\n'); n++; continue; }
    h.update(rel + '\0' + st.size + '\0' + st.mtimeMs + '\n');
    n++;
  }
  return { n, digest: h.digest('hex').slice(0, 16) };
}

/* ======================================================================================= walk */
function walk(dir, out) {
  out = out || [];
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

/* ============================================================================ provenance parse
 * Returns EVERY `## Provenance` block in the file, in order, never just the first and never just
 * the last. That is deliberate and it is this tool's first real finding: 14 of the 168 landed
 * files carry TWO, an inherited one near the head and the merge's own at the foot, with disjoint
 * key sets. A parser that takes the first sees none of the merge's keys; a parser that takes the
 * last sees none of the inherited block's seven dangling PDF references. Both are wrong in a way
 * that reads as clean, so this one returns the list and the checks say which block they mean. */
function provenanceBlocks(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^## Provenance( \(merge\))?\s*$/);
    if (!h) continue;
    const labelled = !!h[1];
    const keys = new Map();
    const order = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (/^## /.test(lines[j])) break;
      const m = lines[j].match(/^- \*\*([^:*]+):\*\*[ \t]*(.*)$/);
      if (!m) continue;
      // A bullet may carry more than one key, separated by a middle dot:
      //   - **Field:** lunar · **Folder:** growth-theory · **Also:** space-economy-and-markets
      const parts = (m[1] + ':**' + m[2]).split(' · ');
      for (const part of parts) {
        const pm = part.match(/^\*?\*?([^:*]+):\*\*[ \t]*(.*)$/) || part.match(/^([^:*]+):\*\*[ \t]*(.*)$/);
        if (!pm) continue;
        const k = pm[1].replace(/^\*+/, '').trim();
        const v = pm[2].trim();
        if (!keys.has(k)) { keys.set(k, []); order.push(k); }
        keys.get(k).push(v);
      }
    }
    blocks.push({ line: i + 1, keys, order, labelled });
  }
  return blocks;
}
const first = (b, k) => (b && b.keys.has(k)) ? b.keys.get(k)[0] : undefined;
const unbacktick = s => String(s === undefined ? '' : s).replace(/`/g, '').trim();

/* ===================================================================================== results
 * Four verdicts and they are four, not two. `VACUOUS` exists so that "the population was empty"
 * can never be written into the same cell as "the population was checked and was clean". */
const OK = m => ({ v: 'OK', m });
const FAIL = m => ({ v: 'FAIL', m });
const VACUOUS = m => ({ v: 'VACUOUS', m });
const REPORT = m => ({ v: 'REPORT', m });
const NOTEOF = m => ({ v: 'NOTE', m });

/* =========================================================================== source resolution
 * THE IDENTITY OF A SOURCE TRAVELS IN THE REPOSITORY; THE LOCATION OF IT DOES NOT.
 *
 * WHAT THIS REPOSITORY SHIPS IS 169 SUMMARIES, AND THEY ARE THE DELIVERABLE. The publications they
 * summarise are not this project's to redistribute and were never going to be in here. A clone that
 * holds all 169 is COMPLETE: it can answer every question the Oracle exists to answer, and nothing
 * about the corpus is missing, degraded or pending. Whether the machine it is sitting on also holds
 * the publications is a fact about that machine and is of interest to exactly one activity --
 * `tools/audit_abstract_overlap.js`, the copyright-hygiene audit, which needs to open a source in
 * order to measure verbatim overlap against it. Answering never needs one.
 *
 * SO THE RESOLVER BELOW SERVES THE AUDIT AND THE DIVERGENCE CHECK, AND NOTHING REPORTS ITS RESULT
 * AS A FINDING. An earlier revision of this file printed `SRC-1 FAIL 25 of 169` on a fresh clone,
 * then printed `SRC-3 25 UNRESOLVABLE ON THIS MACHINE` after that was softened. Both taught a
 * first-time reader that something was owed. Nothing is owed. However carefully the second one was
 * worded, a line in a checker's output over a count of the reader's own files is read as a shortfall,
 * and the corpus it was counting is whole.
 *
 * WHAT SRC STILL CHECKS, AND IT IS A REAL CHECK. A declaration can be WRONG as a piece of text --
 * syntactically malformed, or naming an alias no machine could ever be configured for because the
 * alias vocabulary this repository ships does not contain it. That is a defect in the corpus, it is
 * the same defect in every clone, and it is what SRC-1 now asserts. It is a statement about the
 * DECLARATION TEXT and therefore machine-independent: SRC-1 gives the same verdict in a fresh clone
 * as it does on the author's disk, which is the property the old three-state version could not have.
 *
 * ABSENCE IS NOT A DEFECT. MALFORMATION IS.
 *
 * THE DECLARATION FORM. Two kinds, and the kind is visible in the text of the declaration itself:
 *
 *   `lsei/literature/x/y.md`     an IN-REPOSITORY PATH, resolved against the repository root.
 *   `japanese-miracle:lit/y.md`  an EXTERNAL SOURCE IDENTITY -- `<alias>:<path under that alias's
 *                                root>`. The alias is repository CONTENT and is the same string in
 *                                every clone; the root it maps to is machine STATE and lives in
 *                                tools/source_roots.local, which is gitignored and never travels.
 *
 * AN ALIAS MAY HAVE MORE THAN ONE ROOT, tried in declaration order, first hit wins. `_intake/
 * <alias>/` is prepended implicitly when this working copy has it, because that is the staging tree
 * the merge lifted from; the reasoning is at the head of resolveSource() and it is about which
 * bytes DIV compares against, not about convenience.
 *
 * OPTIONAL TREES. Some in-repository first segments are not guaranteed to exist in a clone: `lsei/`
 * and `cr-agents/` are acquired by the CLAUDE.md bootstrap and are absent when it ran offline, and
 * `_intake/` is gitignored and never travels at all. A path under one of those whose tree is absent
 * is `unconfigured` -- the tree simply is not here -- and is distinguished from `broken` so that
 * `--sources` and DIV can say which of the two they are looking at. NEITHER OF THOSE STATES IS
 * REPORTED AS A FINDING ANY MORE; the distinction survives because DIV must not call an absent tree
 * an upstream withdrawal, not because a reader is owed a number.
 *
 * NOTHING HERE WRITES ANYTHING, AND NO SOURCE ENTERS VERSION CONTROL. The configured roots are
 * read-only, tools/source_roots.local is gitignored, and the only tracked file this mechanism adds
 * is the .example beside it. */
const SOURCE_ROOTS_REL = 'tools/source_roots.local';
const SOURCE_ROOTS_EXAMPLE = 'tools/source_roots.local.example';

/* Closed. A first segment not on this list is expected in every clone.
 * `literature/_pdf/` was on this list and is off it: sub-step 2.11, the PDF pull that would have
 * created that directory, is retired (see oracle/release_gate.md RG-1), no summary declares a source
 * under it, and a path that no declaration can produce is not a case a resolver needs a rule for. */
const OPTIONAL_TREES = ['lsei', 'cr-agents', '_intake'];

/* An alias is lower-case, at least two characters, and the remainder must not begin with a
 * separator. The length floor is load-bearing rather than cosmetic: it is what stops `c:/x` from
 * parsing as alias `c` with path `/x` on the one platform where that string is an ordinary
 * absolute path. */
const ALIAS_RE = /^([a-z][a-z0-9-]*[a-z0-9]):(?![\\/])(.+)$/;

function loadSourceRoots() {
  const file = R(SOURCE_ROOTS_REL);
  const byAlias = new Map();
  const add = (a, p) => { if (!byAlias.has(a)) byAlias.set(a, []); byAlias.get(a).push(p); };
  let present = false;
  if (fs.existsSync(file)) {
    present = true;
    /* `# as: <alias>` binds the NEXT path line, and MORE THAN ONE line may carry the same alias --
     * the roots are then tried in declaration order, first hit wins. Order is the whole mechanism
     * for the case measured here: 4 of the 25 sources differ in content between the tree the merge
     * actually lifted them from and the author's newer outside copy, so the lift tree is declared
     * first and DIV keeps comparing against the bytes that were landed.
     *
     * The directive is written as a COMMENT so this file stays byte-compatible with
     * tools/audit_abstract_overlap.js, which reads the same file as bare paths and skips '#' lines.
     * A bare `alias = path` line would make that reader drop the root and silently shrink its
     * measured population -- and that tool is not in this seat's write set, so a format that needs
     * it edited is a format that cannot land. A blank line cancels a pending directive, so a
     * dangling one at the foot of a section cannot capture an unrelated root further down. */
    let pending = null;
    for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const s = raw.trim();
      if (!s) { pending = null; continue; }
      if (s.charAt(0) === '#') { const m = /^#\s*as:\s*([a-z][a-z0-9-]*[a-z0-9])\s*$/.exec(s); if (m) pending = m[1]; continue; }
      if (pending) { add(pending, s); pending = null; }
    }
  }
  /* $LUNAR_ORACLE_SOURCE_ROOTS, for a machine that cannot keep a file (CI). Entries are
   * `<alias>=<path>`, delimiter-separated. A bare path here is ignored rather than guessed at: the
   * neighbouring tool already reads bare entries from this variable for its own purpose and this
   * one must not silently re-interpret them. */
  for (const e of String(process.env.LUNAR_ORACLE_SOURCE_ROOTS || '').split(path.delimiter)) {
    const m = /^([a-z][a-z0-9-]*[a-z0-9])=(.+)$/.exec(e.trim());
    if (m) { add(m[1], m[2]); present = true; }
  }
  return { file: SOURCE_ROOTS_REL, present, byAlias };
}

/* THE ALIAS VOCABULARY, and it is repository CONTENT rather than machine state.
 *
 * `tools/source_roots.local.example` is tracked, so every clone has it and every clone reads the
 * same set of aliases out of it. That makes it the one place an alias can be declared to exist, and
 * a `Source:` cell naming an alias that is not in it is a declaration nobody can ever configure --
 * a defect in the corpus, present identically in every clone, and nothing to do with which machine
 * is running. That is exactly the kind of thing SRC-1 should fail on, and the resolvability of a
 * source is exactly the kind of thing it should not. */
function exampleAliases() {
  const file = R(SOURCE_ROOTS_EXAMPLE);
  const set = new Set();
  if (!fs.existsSync(file)) return { present: false, set };
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^#\s*as:\s*([a-z][a-z0-9-]*[a-z0-9])\s*$/.exec(raw.trim());
    if (m) set.add(m[1]);
  }
  return { present: true, set };
}

/* IS THIS DECLARATION WELL FORMED AS TEXT? Returns null when it is, and the reason when it is not.
 * Every clause is about the string and none is about this machine, so the answer is the same
 * everywhere. Each rule is here because the shape it rejects cannot travel:
 *
 *   a backslash or a drive letter   a path typed on one Windows machine, which is the original
 *                                   defect this whole mechanism was built to remove.
 *   a leading /                     absolute, so it names a location and not an identity.
 *   a `..` segment                  escapes the root it is declared against; what it resolves to
 *                                   depends on where the root happens to be.
 *   no / at all                     a bare leaf names no tree, so nothing can look it up. THIS ONE
 *                                   APPLIES TO THE IN-REPOSITORY FORM ONLY: in `<alias>:<path>` the
 *                                   alias is the tree, so `japanese-miracle:aoki.md` is a complete
 *                                   identity for a root that holds its files flat. */
function malformedDeclaration(raw, hasAlias) {
  if (!raw) return 'is empty';
  if (raw.indexOf('\\') !== -1) return 'contains a backslash, so it is one machine\'s path and not a portable identity';
  if (/^[A-Za-z]:/.test(raw)) return 'begins with a drive letter, so it is one machine\'s path and not a portable identity';
  if (raw.charAt(0) === '/') return 'is an absolute path, so it names a location rather than an identity';
  if (raw.split('/').indexOf('..') !== -1) return 'contains a ".." segment, which resolves differently depending on where the root sits';
  if (!hasAlias && raw.indexOf('/') === -1) return 'is a bare leaf with no directory and no alias, so nothing can look it up';
  return null;
}

/* ONE resolver, used by SRC and by DIV, so that the two cannot come to disagree about what
 * "resolves" means. Returns { state, abs, kind, why } and `state` is one of the three named above
 * and nothing else. */
function resolveSource(v, cfg) {
  const raw = unbacktick(v);
  const m = ALIAS_RE.exec(raw);
  if (m) {
    const alias = m[1], rel = m[2];
    /* `_intake/<alias>/` FIRST, ALWAYS, when this working copy has it. The intake convention
     * already names each staging directory after the origin corpus, and that staging tree is the
     * one the merge actually lifted the bytes from. Measured: 4 of the 25 sources differ in content
     * between the staging copy and the author's newer outside copy, so an alias that resolved to
     * the outside copy first would hand DIV a different upstream than the one that landed and
     * report body drift that never happened. The staging tree is gitignored and absent from every
     * clone, so this rule adds a resolution on the author's machine and takes none away anywhere. */
    const roots = [];
    const staged = R(path.posix.join('_intake', alias));
    if (fs.existsSync(staged)) roots.push(staged);
    for (const r of (cfg.byAlias.get(alias) || [])) roots.push(r);
    const live = roots.filter(r => fs.existsSync(r));
    if (!live.length) return {
      state: 'unconfigured', kind: alias, why: roots.length
        ? `alias "${alias}" names ${roots.length} root(s) in ${cfg.file}, none of which exists on this machine`
        : `alias "${alias}" has no root here: no _intake/${alias}/ in this working copy and no "# as: ${alias}" in ${cfg.file}` + (cfg.present ? '' : `, which is itself absent`),
    };
    for (const r of live) {
      const abs = path.resolve(r, rel);
      if (fs.existsSync(abs)) return { state: 'resolved', abs, kind: alias };
    }
    return { state: 'broken', kind: alias, why: `alias "${alias}" resolves to ${live.join(' ; ')} and "${rel}" is under none of them` };
  }
  const abs = R(raw);
  if (fs.existsSync(abs)) return { state: 'resolved', abs, kind: raw.split('/')[0] };
  const tree = OPTIONAL_TREES.find(t => raw === t || raw.indexOf(t + '/') === 0);
  if (tree && !fs.existsSync(R(tree)))
    return { state: 'unconfigured', kind: raw.split('/')[0], why: `the optional tree ${tree}/ is not present in this working copy` };
  return { state: 'broken', kind: raw.split('/')[0], why: `nothing at ${raw} and its tree is present` };
}

/* The declaration's KIND: the alias for an external identity, the first path segment for an
 * in-repository path. It is a property of the TEXT and not of this machine, which is why §KA can
 * declare a known answer over it that is the same number in every clone. */
const sourceKind = v => { const raw = unbacktick(v); const m = ALIAS_RE.exec(raw); return m ? m[1] : raw.split('/')[0]; };

/* ======================================================================================= corpus
 * One load, shared by every check, so that every check in a run is a statement about one tree at
 * one moment. A check that re-walked the tree could disagree with its neighbour about the
 * population and neither line would say so. */
function loadCorpus(treeRel) {
  const abs = R(treeRel);
  const exists = fs.existsSync(abs);
  const all = exists ? walk(abs) : [];
  const md = all.filter(p => /\.md$/i.test(p) && !/[\\/]_pdf[\\/]/.test(p));
  const rel = p => path.relative(ROOT, p).split(path.sep).join('/');
  const docs = md.map(p => {
    const text = fs.readFileSync(p, 'utf8');
    const blocks = provenanceBlocks(text);
    return {
      abs: p,
      rel: rel(p),
      leaf: path.basename(p),
      folder: path.relative(abs, path.dirname(p)).split(path.sep).join('/'),
      depth: path.relative(abs, p).split(path.sep).length,
      text,
      blocks,
      /* WHICH BLOCK IS THE MERGE'S. Stated once, here, so no check has to decide it again.
       * Prefer the EXPLICITLY LABELLED `## Provenance (merge)` heading; fall back to the last plain
       * `## Provenance` only where no labelled one exists. The label is the fix The Engineer landed
       * for the ambiguity this tool reported on its first run: 14 files carried two identically
       * titled blocks and "the block" was decided by parse order. Keying on the label rather than on
       * position means the answer no longer depends on where in the file anybody puts anything. */
      merged: blocks.find(b => b.labelled) || (blocks.length ? blocks[blocks.length - 1] : null),
      inherited: blocks.filter(b => b !== (blocks.find(x => x.labelled) || blocks[blocks.length - 1])),
    };
  });
  const folders = exists
    ? fs.readdirSync(abs, { withFileTypes: true }).filter(e => e.isDirectory() && e.name !== '_pdf').map(e => e.name)
    : [];
  return { treeRel, abs, exists, docs, folders, all };
}

/* ======================================================================================= checks
 * Each returns an array of result objects. Each is responsible for its OWN vacuity: a check that
 * cannot tell an empty population from a clean one is the defect this whole tool exists to remove,
 * and a central guard would let one check forget. */
const CHECKS = {};

/* ---- NAM: naming conformance. NAMING.md sections 2, 3, 11 A1/A2/A5 --------------------------- */
CHECKS.NAM = c => {
  const out = [];
  if (!c.exists) return [VACUOUS(`${c.treeRel}/ does not exist; no name was tested`)];
  if (!c.docs.length) return [VACUOUS(`${c.treeRel}/ holds 0 .md files; every name assertion over it is vacuously true`)];
  const n = c.docs.length;

  const badS = c.docs.filter(d => !R_S.test(d.leaf));
  out.push(badS.length ? FAIL(`NAM-1 ${badS.length} of ${n} leaves fail R_S: ${badS.map(d => d.leaf).slice(0, 6).join(' ')}`)
    : OK(`NAM-1 all ${n} leaves match R_S`));

  const isF = c.docs.filter(d => R_F.test(d.leaf));
  out.push(isF.length ? FAIL(`NAM-2 ${isF.length} of ${n} leaves match R_F, the findings namespace: ${isF.map(d => d.leaf).join(' ')}`)
    : OK(`NAM-2 0 of ${n} leaves match R_F`));

  const numSuffix = c.docs.filter(d => /-\d\.md$/.test(d.leaf));
  out.push(numSuffix.length ? FAIL(`NAM-10 ${numSuffix.length} leaves end in -<digit>, which the tokenizer cannot see: ${numSuffix.map(d => d.leaf).join(' ')}`)
    : OK(`NAM-10 0 of ${n} leaves end in -<digit>`));

  /* A5: the identity segment must survive the tokenizer, or its +3 anchor is permanently dead.
   * NAMING.md section 3 spells the expression out: `leadAuthor = baseName(filename).split('-')[0]`.
   * baseName strips the extension BEFORE the split, and the order matters -- splitting the leaf
   * with its extension still on it makes every unhyphenated name ("gdp.md", "rostami2018.md")
   * tokenize to two tokens and report a dead anchor that is not dead. This tool got that wrong on
   * its first run against the real shelf and reported exactly those two files. */
  const identity = leaf => leaf.replace(/\.md$/i, '').split('-')[0];
  const deadAnchor = c.docs.filter(d => A5_EXCEPTIONS.indexOf(d.leaf) === -1 &&
    tokenize(identity(d.leaf)).length !== 1);
  out.push(deadAnchor.length ? FAIL(`NAM-11/A5 ${deadAnchor.length} leaves whose identity segment does not survive tokenize(): ${deadAnchor.map(d => d.leaf).slice(0, 6).join(' ')}`)
    : OK(`NAM-11/A5 all ${n - A5_EXCEPTIONS.length} non-exempt identity segments tokenize to exactly 1 token`));

  // NAM-12: the exception list is literal names, never patterns.
  const meta = A5_EXCEPTIONS.filter(x => /[\\^$.|?*+()\[\]{}]/.test(x.replace(/\.md$/, '')));
  out.push(meta.length ? FAIL(`NAM-12 ${meta.length} A5 exception(s) contain a regex metacharacter; an exception must be a decision, not a pattern: ${meta.join(' ')}`)
    : OK(`NAM-12 all ${A5_EXCEPTIONS.length} A5 exceptions are literal leaf names`));
  const staleExc = A5_EXCEPTIONS.filter(x => !c.docs.some(d => d.leaf === x));
  if (staleExc.length) out.push(REPORT(`NAM-12 ${staleExc.length} whitelisted exception(s) name no file on the shelf: ${staleExc.join(' ')}`));

  // NAM-13: where a four-digit year token is present at all, it sits in the second segment.
  const yearWrong = c.docs.filter(d => /\b\d{4}\b/.test(d.leaf.replace(/\.md$/, '')) && !/-(\d{4})-/.test(d.leaf));
  out.push(yearWrong.length ? REPORT(`NAM-13 ${yearWrong.length} leaves carry a four-digit token that is not the second segment, so scoreFile() earns no year bonus: ${yearWrong.map(d => d.leaf).slice(0, 6).join(' ')}`)
    : OK(`NAM-13 every four-digit token present sits in the second segment`));

  // A1: tokenizer distinctness, per shelf.
  const byTok = new Map();
  for (const d of c.docs) {
    const k = tokenize(d.leaf.replace(/\.md$/, '')).sort().join(',');
    if (!byTok.has(k)) byTok.set(k, []);
    byTok.get(k).push(d.rel);
  }
  const tokCollide = [...byTok.entries()].filter(([, v]) => v.length > 1);
  out.push(tokCollide.length ? FAIL(`NAM-8/A1 ${tokCollide.length} token-set collisions: ${tokCollide.map(([k, v]) => v.join(' <-> ') + ' [' + k + ']').slice(0, 4).join(' ; ')}`)
    : OK(`NAM-8/A1 ${byTok.size} distinct token sets over ${n} files, 0 collisions`));

  // CRP-5: normalized-key collision across the whole tree.
  const byNorm = new Map();
  for (const d of c.docs) {
    const k = normalize(d.leaf.replace(/\.md$/, ''));
    if (!byNorm.has(k)) byNorm.set(k, []);
    byNorm.get(k).push(d.rel);
  }
  const normCollide = [...byNorm.entries()].filter(([, v]) => v.length > 1);
  out.push(normCollide.length ? FAIL(`CRP-5 ${normCollide.length} tree-wide normalize() key collisions: ${normCollide.map(([k, v]) => v.join(' <-> ') + ' (key ' + k + ')').slice(0, 4).join(' ; ')}`)
    : OK(`CRP-6 ${byNorm.size} distinct normalize() keys equals ${n} landed files; 0 collisions`));
  return out;
};

/* ---- PTH: the path-length ceiling. NAMING.md section 8, A3 ----------------------------------- */
CHECKS.PTH = c => {
  if (!c.exists) return [VACUOUS(`${c.treeRel}/ does not exist; no path was measured`)];
  if (!c.docs.length) return [VACUOUS(`${c.treeRel}/ holds 0 .md files; the ceiling has nothing to bound`)];
  const out = [], bad = [];
  let maxRel = 0, maxLeaf = 0;
  for (const d of c.docs) {
    const winLen = d.rel.replace(/\//g, '\\').length;
    maxRel = Math.max(maxRel, winLen);
    maxLeaf = Math.max(maxLeaf, d.leaf.length);
    if (winLen > CEIL_RELPATH) bad.push(`${d.rel} relpath ${winLen} > ${CEIL_RELPATH}`);
    if (d.leaf.length > CEIL_LEAF) bad.push(`${d.rel} leaf ${d.leaf.length} > ${CEIL_LEAF}`);
    if (d.depth !== CORPUS_DEPTH) bad.push(`${d.rel} depth ${d.depth} != ${CORPUS_DEPTH}`);
  }
  for (const f of c.folders) if (f.length > CEIL_FOLDER) bad.push(`folder ${f} length ${f.length} > ${CEIL_FOLDER}`);
  /* The composite is reported alongside the component breaches, always, because the two carry
   * different urgency and a reader who sees only "3 breaches" cannot tell a corpus that is broken
   * on disk today from one that has spent its headroom. NAMING.md section 8's budget is
   * 10 + 1 + 32 + 1 + 64 = 108: the components are what guarantee the composite, so a component
   * breach is a real finding even while the composite still closes. */
  const composite = `longest composite relpath ${maxRel}/${CEIL_RELPATH} (the budget still closes on disk), longest leaf ${maxLeaf}/${CEIL_LEAF}`;
  out.push(bad.length ? FAIL(`PTH/A3 ${bad.length} component ceiling breaches: ${bad.slice(0, 6).join(' ; ')} -- ${composite}`)
    : OK(`PTH/A3 ${c.docs.length} files under the ceiling; ${composite}, all at depth ${CORPUS_DEPTH}`));
  return out;
};

/* ---- PRV: provenance completeness ------------------------------------------------------------ */
CHECKS.PRV = c => {
  if (!c.exists) return [VACUOUS(`${c.treeRel}/ does not exist; no provenance block was read`)];
  if (!c.docs.length) return [VACUOUS(`${c.treeRel}/ holds 0 .md files; provenance completeness over an empty shelf is vacuously true`)];
  const out = [], n = c.docs.length;

  const none = c.docs.filter(d => !d.blocks.length);
  out.push(none.length ? FAIL(`PRV-1 ${none.length} of ${n} files carry no ## Provenance block: ${none.map(d => d.rel).slice(0, 6).join(' ')}`)
    : OK(`PRV-1 all ${n} files carry a ## Provenance block`));

  /* PRV-1b: THE MERGE BLOCK IS IDENTIFIABLE WITHOUT GUESSING. This clause is not written in
   * corpus_suite.md section 5 and is asserted anyway, because every clause that IS written there
   * says "the block" -- PRV-2 "the key set of each block", PRV-17 "the block is in the file". The
   * singular is the contract's own presupposition, and where it fails every other PRV clause is
   * decided by parse order.
   *
   * WHAT IS ASSERTED IS AMBIGUITY, NOT COUNT, and the distinction was earned. On this tool's first
   * run 14 files carried two identically titled `## Provenance` blocks with disjoint key sets. The
   * Engineer's remedy was to LABEL the merge block `## Provenance (merge)` rather than to delete the
   * inherited one -- which is right, because the inherited block is the transcriber's record and
   * deleting it would lose it. A labelled pair is not ambiguous, so it does not fail here. Two
   * UNLABELLED blocks still do: that is the case where nothing in the file says which is which. */
  const ambiguous = c.docs.filter(d => d.blocks.filter(b => !b.labelled).length > 1 && !d.blocks.some(b => b.labelled));
  out.push(ambiguous.length ? FAIL(`PRV-1b ${ambiguous.length} of ${n} files carry two or more UNLABELLED ## Provenance blocks and no ## Provenance (merge), so "the block" is decided by parse order: ${ambiguous.map(d => d.rel + '(' + d.blocks.length + ')').slice(0, 4).join(' ')}${ambiguous.length > 4 ? ' ...' : ''}`)
    : OK(`PRV-1b the merge block is unambiguously identifiable in all ${n} files`));
  const inh = c.docs.filter(d => d.inherited.length).length;
  if (inh) out.push(NOTEOF(`PRV-1b ${inh} of ${n} files carry an inherited provenance block alongside the merge block, disambiguated by the "(merge)" label. The inherited block is the transcriber's record and is read, not ignored: SRC reads its Source file: references`));

  // PRV-2, against the LANDED key set. See the PRV_LANDED_KEYS comment for why not the ruled one.
  const missing = [];
  for (const d of c.docs) {
    if (!d.merged) continue;
    const lack = PRV_LANDED_KEYS.filter(k => !d.merged.keys.has(k));
    if (lack.length) missing.push(`${d.rel} lacks ${lack.join(',')}`);
  }
  out.push(missing.length ? FAIL(`PRV-2 ${missing.length} of ${n} merge blocks are missing a landed key: ${missing.slice(0, 5).join(' ; ')}`)
    : OK(`PRV-2 all ${n} merge blocks carry the ${PRV_LANDED_KEYS.length} landed keys`));

  // PRV-3: no key carries an empty value.
  const empty = [];
  for (const d of c.docs) {
    if (!d.merged) continue;
    for (const k of PRV_LANDED_KEYS) {
      const v = first(d.merged, k);
      if (v !== undefined && v === '') empty.push(`${d.rel}:${k}`);
    }
  }
  out.push(empty.length ? FAIL(`PRV-3 ${empty.length} keys present with an empty value: ${empty.slice(0, 6).join(' ')}`)
    : OK(`PRV-3 0 of ${n * PRV_LANDED_KEYS.length} landed key slots are present-but-empty`));

  // PRV-4/5: closed sets. Disposition carries a trailing gloss the merge writes; key on the token.
  const badBS = [], badDisp = [], badField = [], badFolder = [], badAlso = [];
  const fieldsFile = R(path.posix.join(c.treeRel, 'FIELDS.tsv'));
  const knownFolders = new Set(c.folders);
  for (const d of c.docs) {
    if (!d.merged) continue;
    const bs = first(d.merged, 'Byte source');
    if (bs !== undefined && BYTE_SOURCE.indexOf(bs) === -1) badBS.push(`${d.rel}="${bs}"`);
    const disp = String(first(d.merged, 'Disposition') || '').split(' ')[0];
    if (disp && DISPOSITION.indexOf(disp) === -1) badDisp.push(`${d.rel}="${disp}"`);
    const fld = first(d.merged, 'Field');
    if (fld !== undefined && ['lunar', 'economics'].indexOf(fld) === -1) badField.push(`${d.rel}="${fld}"`);
    const fol = first(d.merged, 'Folder');
    if (fol !== undefined && fol !== d.folder) badFolder.push(`${d.rel} declares Folder="${fol}" but sits in "${d.folder}"`);
    const also = first(d.merged, 'Also');
    if (also !== undefined) for (const a of also.split(';').map(s => s.trim()).filter(Boolean))
      if (!knownFolders.has(a)) badAlso.push(`${d.rel} Also="${a}"`);
  }
  out.push(badBS.length ? FAIL(`PRV-4 ${badBS.length} Byte source values outside the closed ${BYTE_SOURCE.length}: ${badBS.slice(0, 5).join(' ')}`)
    : OK(`PRV-4 all ${n} Byte source values inside the closed set of ${BYTE_SOURCE.length}`));
  out.push(badDisp.length ? FAIL(`PRV-5 ${badDisp.length} Disposition tokens outside the closed ${DISPOSITION.length}: ${badDisp.slice(0, 5).join(' ')}`)
    : OK(`PRV-5 all ${n} Disposition tokens inside the closed set of ${DISPOSITION.length}`));
  out.push(badField.length ? FAIL(`FLD-1 ${badField.length} Field labels outside {lunar,economics}: ${badField.slice(0, 5).join(' ')}`)
    : OK(`FLD-1 all ${n} Field labels inside the closed set of 2`));
  out.push(badFolder.length ? FAIL(`FLD-11 ${badFolder.length} files whose Folder disagrees with the directory they sit in: ${badFolder.slice(0, 4).join(' ; ')}`)
    : OK(`FLD-11 all ${n} Folder values equal the containing directory`));
  out.push(badAlso.length ? FAIL(`PRV-16 ${badAlso.length} Also values naming no taxonomy folder: ${badAlso.slice(0, 5).join(' ')}`)
    : OK(`PRV-16 every Also value names an existing taxonomy folder`));
  if (!fs.existsSync(fieldsFile)) out.push(VACUOUS(`FLD FIELDS.tsv absent under ${c.treeRel}/; the field-label vocabulary was not cross-read`));

  /* The routed disagreement, reported on every run so it cannot be forgotten by being fixed
   * nowhere. This is a REPORT and not a FAIL: the shelf is not defective against it, the CONTRACT
   * is out of date against the shelf, and a checker that fails 168 files for that is a checker that
   * gets switched off. */
  const ruledPresent = c.docs.filter(d => d.merged && PRV_RULED_KEYS.some(k => d.merged.keys.has(k))).length;
  out.push(REPORT(`PRV-2/corpus_suite section 5 DIVERGENCE: the ruled key set {${PRV_RULED_KEYS.join(', ')}} is carried by ${ruledPresent} of ${n} merge blocks. The merge writes {${PRV_LANDED_KEYS.join(', ')}} instead, on all ${n}. The shelf is uniform; the suite's section 5 is stale. Owner: The Engineer (2.5/2.6 wrote the block, 2.4 wrote the assertions)`));
  return out;
};

/* ---- SRC: the Source: declaration is well formed and names an alias this repository ships ------
 *
 * WHAT THIS CHECK NO LONGER DOES, and it is deliberate. It does not count how many sources this
 * machine can open, and it does not report the ones it cannot. Those numbers used to print as
 * `SRC-1` and `SRC-3` and they made a complete corpus read as a deficient one on every clone that
 * ran the tool. The summaries are the deliverable; the publications behind them were never going to
 * be in here. `--sources` still lists the per-file resolution, because the copyright audit is a real
 * job that needs it, but nothing in the verdict column is decided by it. */
CHECKS.SRC = c => {
  if (!c.exists) return [VACUOUS(`${c.treeRel}/ does not exist; no Source: declaration was read`)];
  if (!c.docs.length) return [VACUOUS(`${c.treeRel}/ holds 0 .md files; there is no declaration to check`)];
  const out = [];
  const ex = exampleAliases();
  const bad = [], unknownAlias = [];
  const kinds = new Map();
  let checked = 0, aliased = 0;
  for (const d of c.docs) {
    const v = unbacktick(first(d.merged, 'Source'));
    if (!v) continue;
    checked++;
    kinds.set(sourceKind(v), (kinds.get(sourceKind(v)) || 0) + 1);
    const m = ALIAS_RE.exec(v);
    if (m) {
      aliased++;
      const why = malformedDeclaration(m[2], true);
      if (why) { bad.push(`${d.rel} -> "${v}": the path after the alias ${why}`); continue; }
      if (ex.present && !ex.set.has(m[1])) unknownAlias.push(`${d.rel} -> "${v}" (alias "${m[1]}")`);
      continue;
    }
    const why = malformedDeclaration(v, false);
    if (why) bad.push(`${d.rel} -> "${v}": it ${why}`);
  }
  const census = [...kinds.entries()].map(([k, n]) => k + ' ' + n).join(', ');
  if (!checked) return [VACUOUS(`SRC no merge block carries a Source: key; no declaration was checked`)];

  out.push(bad.length
    ? FAIL(`SRC-1 ${bad.length} of ${checked} Source: declarations are MALFORMED and cannot travel: ${bad.slice(0, 5).join(' ; ')}${bad.length > 5 ? ' ...' : ''}`)
    : OK(`SRC-1 all ${checked} Source: declarations are well formed as text (${census}). This is a statement about the declarations and not about this machine, so it is the same verdict in every clone`));

  /* The alias vocabulary. Checked against the TRACKED .example, so a clone gets the same answer. */
  if (!ex.present) out.push(VACUOUS(`SRC-2 ${SOURCE_ROOTS_EXAMPLE} is absent, so the ${aliased} external source identit${aliased === 1 ? 'y' : 'ies'} could not be checked against the alias vocabulary this repository ships. That file is tracked; a working copy without it is missing a tracked file`));
  else if (!aliased) out.push(NOTEOF(`SRC-2 0 of ${checked} declarations use the <alias>:<path> form, so the alias vocabulary (${ex.set.size} declared in ${SOURCE_ROOTS_EXAMPLE}) had nothing to check`));
  else out.push(unknownAlias.length
    ? FAIL(`SRC-2 ${unknownAlias.length} of ${aliased} external source identities name an alias that ${SOURCE_ROOTS_EXAMPLE} does not declare, so no machine can ever be configured for them: ${unknownAlias.slice(0, 5).join(' ; ')}${unknownAlias.length > 5 ? ' ...' : ''}. Declared aliases: ${[...ex.set].join(', ') || '(none)'}`)
    : OK(`SRC-2 all ${aliased} external source identities name an alias declared in ${SOURCE_ROOTS_EXAMPLE} (${[...ex.set].join(', ')})`));

  /* `Source file:` -- PRV-8. A NOTE, not a finding, and the reason is the same as SRC-1's.
   *
   * These cells name a PDF by basename. This repository holds no PDF and never will -- CHK-13 is the
   * mechanism that guarantees it -- so a resolution test run against the repository root can only
   * ever come back empty, and printing that emptiness as a finding is reporting the design as a
   * defect. The cells are not useless: `tools/audit_abstract_overlap.js` pairs by them across the
   * author's configured source roots and they resolve there, which is the only place they were ever
   * meant to. Counted here so the shelf's shape is on the record, and counted as an observation. */
  const sf = [];
  for (const d of c.docs) for (const b of d.blocks) {
    if (!b.keys.has('Source file')) continue;
    for (const v of b.keys.get('Source file')) {
      const name = unbacktick((v.match(/`([^`]+)`/) || [, v.split(' ')[0]])[1]);
      if (v.trim() === 'not held') continue;
      const where = b === d.merged ? 'merge block' : 'inherited block';
      if (!fs.existsSync(R(name)) && !fs.existsSync(path.join(path.dirname(d.abs), name)))
        sf.push(`${d.rel} (${where}) -> ${name}`);
    }
  }
  out.push(sf.length
    ? NOTEOF(`PRV-8 ${sf.length} Source file: cells name a PDF by basename that is not inside this repository, which is by construction: no PDF is ever in here (CHK-13). They are the pairing hints tools/audit_abstract_overlap.js uses against configured source roots, and they resolve there. Not a defect and not a shortfall: ${sf.slice(0, 4).join(' ; ')}${sf.length > 4 ? ' ...' : ''}`)
    : OK(`PRV-8 every Source file: reference resolves in this working copy or reads "not held"`));
  return out;
};

/* ---- DUP: duplicate identifiers with no primary/secondary call --------------------------------- */
CHECKS.DUP = c => {
  if (!c.exists) return [VACUOUS(`${c.treeRel}/ does not exist; no dedup key was read`)];
  if (!c.docs.length) return [VACUOUS(`${c.treeRel}/ holds 0 .md files; a duplicate-identifier check over an empty shelf is vacuously true`)];
  const out = [];
  const byKey = new Map();
  let parsed = 0;
  const badLevel = [];
  for (const d of c.docs) {
    const raw = first(d.merged, 'Dedup key');
    if (raw === undefined) continue;
    parsed++;
    // The value may carry a trailing prose gloss after an em dash. The KEY is what precedes it.
    const key = raw.split(' — ')[0].trim();
    const level = key.split('|')[0];
    if (DEDUP_LEVEL.indexOf(level) === -1) badLevel.push(`${d.rel} level "${level}"`);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(d);
  }
  if (!parsed) return [VACUOUS(`DUP no merge block carries a Dedup key:; nothing was grouped`)];

  out.push(badLevel.length ? FAIL(`DUP-2 ${badLevel.length} dedup keys whose precedence level is outside ${DEDUP_LEVEL.join('/')}: ${badLevel.slice(0, 5).join(' ')}`)
    : OK(`DUP-2 all ${parsed} dedup keys carry a level in ${DEDUP_LEVEL.join('/')}`));

  const groups = [...byKey.entries()].filter(([, v]) => v.length > 1);
  if (!groups.length) {
    out.push(OK(`DUP-3 ${byKey.size} distinct dedup keys over ${parsed} files; 0 shared keys, so there is no uncalled duplicate`));
    return out;
  }
  /* A shared key is a duplicate identifier. It needs a primary/secondary call, and the call is the
   * `Duplicate pair DUP-nn:` line the adjudication writes. Severity splits on the precedence level,
   * per DUP-4: a level-3 match is a CANDIDATE, never a confirmation, and the merge is ruled to take
   * no action on it -- so failing the build on one would be this tool overruling the contract. A
   * level-1 or level-2 collision is a confirmed same-source pair and an uncalled one is a defect. */
  const hard = [], soft = [];
  for (const [key, ds] of groups) {
    const level = key.split('|')[0];
    const called = ds.filter(d => d.blocks.some(b => [...b.keys.keys()].some(k => /^Duplicate pair /.test(k))));
    if (called.length === ds.length) continue;
    const line = `${key} :: ${ds.map(d => d.rel).join(' <-> ')} (${called.length} of ${ds.length} carry a primary/secondary call)`;
    if (level === 'L3' || level === 'L3-NAME') soft.push(line); else hard.push(line);
  }
  out.push(hard.length ? FAIL(`DUP-1 ${hard.length} level-1/level-2 duplicate identifier group(s) with no primary/secondary call: ${hard.slice(0, 4).join(' ; ')}`)
    : OK(`DUP-1 0 level-1/level-2 duplicate identifier groups lack a primary/secondary call`));
  out.push(soft.length ? REPORT(`DUP-4 ${soft.length} level-3 duplicate identifier group(s) with no call. A level-3 match is a candidate and never a confirmation, so this is a queue for a person and not a build failure: ${soft.join(' ; ')}`)
    : OK(`DUP-4 0 uncalled level-3 candidate groups`));

  const calls = c.docs.filter(d => d.blocks.some(b => [...b.keys.keys()].some(k => /^Duplicate pair /.test(k)))).length;
  out.push(REPORT(`DUP census: ${byKey.size} distinct keys over ${parsed} files, ${groups.length} shared, ${calls} files carry a primary/secondary call`));
  return out;
};

/* ---- IDX: INDEX.tsv and FIELDS.tsv are derived, and are asserted equal to a regeneration ------- */
CHECKS.IDX = c => {
  const out = [];
  const idxPath = R(path.posix.join(c.treeRel, 'INDEX.tsv'));
  if (!fs.existsSync(idxPath)) return [VACUOUS(`${c.treeRel}/INDEX.tsv does not exist; the derived index was not compared`)];
  if (!c.docs.length) return [VACUOUS(`${c.treeRel}/ holds 0 .md files; an index/disk join over an empty shelf is vacuously true`)];
  const lines = fs.readFileSync(idxPath, 'utf8').replace(/\r/g, '').split('\n').filter(Boolean);
  const head = lines[0].split('\t');
  const rows = lines.slice(1).map(l => l.split('\t'));
  /* INDEX.tsv writes its paths as `literature/<folder>/<leaf>` because that is where the corpus of
   * record lives. Under `--tree <staged>` the same files sit somewhere else, so the join is rebased
   * onto the tree actually walked -- exactly as run_suite.js's MRG-4b rebases target_path. Without
   * this, every staged run reports the whole index missing and the whole tree unlisted, which is a
   * 2N-line failure that says nothing about the staged tree. */
  const rebase = p => c.treeRel === CANONICAL_TREE ? p
    : p.replace(new RegExp('^' + CANONICAL_TREE + '/'), c.treeRel.replace(/\/+$/, '') + '/');
  const idxPaths = new Set(rows.map(r => rebase(r[0])));
  const diskPaths = new Set(c.docs.map(d => d.rel));
  const onlyDisk = [...diskPaths].filter(p => !idxPaths.has(p));
  const onlyIdx = [...idxPaths].filter(p => !diskPaths.has(p));
  out.push((onlyDisk.length || onlyIdx.length)
    ? FAIL(`FLD-10 INDEX.tsv and disk disagree: ${onlyDisk.length} on disk with no row (${onlyDisk.slice(0, 3).join(' ')}), ${onlyIdx.length} rows with no file (${onlyIdx.slice(0, 3).join(' ')})`)
    : OK(`FLD-10 INDEX.tsv joins ${rows.length} rows onto ${c.docs.length} files with no residue on either side`));

  // FLD-11 on the index side: primary equals path segment 2.
  const pmis = rows.filter(r => r[0].split('/')[1] !== r[1]);
  out.push(pmis.length ? FAIL(`FLD-11 ${pmis.length} index rows whose primary differs from path segment 2: ${pmis.slice(0, 4).map(r => r[0]).join(' ')}`)
    : OK(`FLD-11 all ${rows.length} index rows carry primary == path segment 2`));

  // The index field column must agree with the block's own Field, since PRV-17 makes the block the
  // authority and the index derived. A disagreement is a failure of the index, never of the file.
  const byRel = new Map(c.docs.map(d => [d.rel, d]));
  const fmis = rows.filter(r => { const d = byRel.get(rebase(r[0])); return d && d.merged && first(d.merged, 'Field') !== r[3]; });
  out.push(fmis.length ? FAIL(`FLD-13 ${fmis.length} index rows whose field disagrees with the file's own block; the block is the authority and the index is derived: ${fmis.slice(0, 4).map(r => r[0]).join(' ')}`)
    : OK(`FLD-13 all ${rows.length} index field cells agree with the block they are derived from`));

  const fieldsPath = R(path.posix.join(c.treeRel, 'FIELDS.tsv'));
  if (!fs.existsSync(fieldsPath)) { out.push(VACUOUS(`${c.treeRel}/FIELDS.tsv does not exist; the declared per-field counts were not checked`)); return out; }
  const fl = fs.readFileSync(fieldsPath, 'utf8').replace(/\r/g, '').split('\n').filter(Boolean);
  const frows = fl.slice(1).map(l => l.split('\t'));
  const actual = new Map();
  for (const r of rows) actual.set(r[3], (actual.get(r[3]) || 0) + 1);
  const fbad = frows.filter(r => Number(r[4]) !== (actual.get(r[0]) || 0));
  out.push(fbad.length ? FAIL(`FLD FIELDS.tsv declares a count the index does not carry: ${fbad.map(r => r[0] + ' declares ' + r[4] + ', index has ' + (actual.get(r[0]) || 0)).join(' ; ')}`)
    : OK(`FLD FIELDS.tsv's ${frows.length} declared per-field counts equal the index (${[...actual.entries()].map(([k, v]) => k + ' ' + v).join(', ')})`));
  out.push(head.join(',') === 'path,primary,also,field' ? OK(`FLD INDEX.tsv header is the declared four columns`)
    : REPORT(`FLD INDEX.tsv header is "${head.join(',')}", not the declared path,primary,also,field`));
  return out;
};

/* ---- REG: register integrity ------------------------------------------------------------------ */
CHECKS.REG = c => {
  const out = [];
  const regs = ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv'].filter(p => fs.existsSync(R(p)));
  if (!regs.length) return [VACUOUS(`neither register file exists; register integrity was not tested`)];
  /* HOW A REGISTER BINDS TO THE CORPUS, and the mistake this check made first.
   *
   * My first implementation grepped the register files for `literature/…\.md` paths, found zero, and
   * reported VACUOUS with the conclusion that 2.16's rebinding had not landed. **That conclusion was
   * wrong, and only the VACUOUS verdict stopped it being printed as a green pass.** 2.16 HAS landed.
   * The register does not carry paths at all: `register_schema.md` binds by LEAF plus a `basis_root`
   * declared once in the H row -- the rebind is two edits, not 134, which is `REG-10`'s whole point.
   * A checker looking for the string `literature/` in a file whose design is not to contain it will
   * find nothing forever, and "found nothing" is not "there is nothing to find".
   *
   * Corrected on The Space Resources Engineer's W3-4 measurement (121 member rows, 83 distinct
   * leaves, all resolving). Recorded rather than quietly fixed: a check that reports VACUOUS for the
   * wrong reason is still reporting the wrong thing, and VACUOUS earned its keep here by being the
   * verdict that made me go and look. */
  let members = 0, unresolved = [], ambiguous = [], rootBad = [];
  const idx = new Map();
  for (const d of c.docs) { if (!idx.has(d.leaf)) idx.set(d.leaf, []); idx.get(d.leaf).push(d.rel); }
  const leaves = new Set();
  for (const rf of regs) {
    const lines = fs.readFileSync(R(rf), 'utf8').replace(/\r\n/g, '\n').split('\n');
    for (const ln of lines) {
      if (!ln.length || ln.charAt(0) === '#') continue;
      const f = ln.split('\t');
      if (f[0] === 'H' && f[1] !== CANONICAL_TREE) rootBad.push(`${rf}: basis_root "${f[1]}"`);
      if (f[0] !== 'M') continue;
      members++;
      const leaf = f[3];
      leaves.add(leaf);
      const hit = idx.get(leaf);
      if (!hit) unresolved.push(`${rf} ${f[1]} ${leaf}`);
      else if (hit.length > 1) ambiguous.push(`${leaf} -> ${hit.length} files`);
    }
  }
  if (!members) {
    out.push(VACUOUS(`REG ${regs.length} register file(s) present and parsed, and they carry 0 M (member) rows between them. "Every register member resolves" is vacuously true and certifies nothing about 2.16 (MERGE-10). Owner: The Engineer`));
    return out;
  }
  if (rootBad.length) out.push(FAIL(`REG-10 ${rootBad.length} register(s) declare a basis_root that is not "${CANONICAL_TREE}": ${rootBad.join(' ; ')}`));
  out.push(unresolved.length
    ? FAIL(`REG-7 ${unresolved.length} of ${members} register member leaves do not resolve under ${c.treeRel}/: ${unresolved.slice(0, 5).join(' ; ')}`)
    : OK(`REG-7 all ${members} member rows across ${regs.length} register file(s) resolve: ${leaves.size} distinct leaves under ${c.treeRel}/`));
  out.push(ambiguous.length
    ? FAIL(`REG-8 ${ambiguous.length} member leaves resolve to more than one file, so the leaf is not a key: ${ambiguous.slice(0, 4).join(' ; ')}`)
    : OK(`REG-8 every member leaf resolves to exactly one file`));
  return out;
};

/* ---- DIV: the upstream divergence check ------------------------------------------------------- */
CHECKS.DIV = c => {
  const out = [];
  if (!c.docs.length) return [VACUOUS(`${c.treeRel}/ holds 0 .md files; there is no landed byte to compare upstream`)];

  /* The comparison is against the PROVENANCE CONTENT, not against the state record. That ordering
   * is 1.5's own ruling (`install_state.md`: "A divergence is never missed, because the comparison
   * is against the provenance content and not against this field"), and it is what lets this check
   * run at all today: `.oracle-state.json` does not exist, so the record can say nothing, and the
   * divergence is still computable. The record only supplies the adjective NEW or STANDING. */
  const state = R('.oracle-state.json');
  const haveState = fs.existsSync(state);

  const PROV_MARK = '\n\n---\n\n## Provenance\n';
  const stripMerged = t => { const i = t.lastIndexOf(PROV_MARK); return i < 0 ? null : t.slice(0, i); };
  const nz = s => s.replace(/\r\n/g, '\n').replace(/\s+$/, '');

  /* A LANDED BODY THAT DIFFERS FROM UPSTREAM IS NOT AUTOMATICALLY DRIFT.
   *
   * Sub-step 2.6 (MERGE-6) normalized the house format, and the seat that did it wrote the edit
   * into the merge block as a machine-readable key -- `- **Body edit (2.6):**` -- naming the exact
   * operations applied (`insert-metadata`, `drop-cts-marker`) and stating in terms that it amends
   * the byte-identity claim `Byte source` carries.
   *
   * Measured over the shelf: 152 files declare a body edit, 152 files differ from upstream, and the
   * two sets are THE SAME 152 -- zero declared-but-identical, zero differing-but-undeclared. The
   * declaration is exact, so this check joins on it instead of reporting 152 differences as though
   * nobody had said anything. What ARCH-5 wants reported is upstream drift, and an edit we made and
   * wrote down is not upstream drift; a check that cannot tell those apart produces a 152-line wall
   * on every run and is switched off within a week, which is COUNTING_RULE.md section 8's own
   * standing argument. The line that matters is the UNDECLARED one, and it is printed even at zero. */
  const declaresBodyEdit = d => d.merged && [...d.merged.keys.keys()].some(k => /^Body edit\b/.test(k));

  /* DIV resolves through the shared resolver, and this is the one place the unconfigured/broken
   * distinction still earns its keep. Before it existed, a clone reported 25 files as `withdrawn` --
   * a verdict bootstrap_contract.md defines as "a provenance Source cell naming an upstream path
   * that no longer resolves", i.e. an UPSTREAM event. Nothing upstream had happened; the clone
   * simply did not hold the tree. Two different facts arriving in one cell is the defect. */
  const cfg = loadSourceRoots();
  let compared = 0, identical = 0, eol = 0, declaredDiff = 0, declaredIdentical = 0;
  const undeclared = [], withdrawn = [], unstrippable = [], notHere = [];
  for (const d of c.docs) {
    const src = unbacktick(first(d.merged, 'Source'));
    if (!src) continue;
    const rs = resolveSource(src, cfg);
    if (rs.state === 'unconfigured') { notHere.push(`${d.rel} -> ${src}`); continue; }
    if (rs.state === 'broken') { withdrawn.push(`${d.rel} -> ${src}`); continue; }
    const abs = rs.abs;
    const body = stripMerged(d.text);
    if (body === null) { unstrippable.push(d.rel); continue; }
    compared++;
    const up = fs.readFileSync(abs, 'utf8');
    const declared = declaresBodyEdit(d);
    if (body === up || nz(body) === nz(up)) {
      identical++;
      if (body !== up) eol++;
      if (declared) declaredIdentical++;
      continue;
    }
    if (declared) { declaredDiff++; continue; }
    undeclared.push(`${d.rel} vs ${src}`);
  }
  if (!compared && !withdrawn.length) return [VACUOUS(`DIV 0 files named an upstream Source: this machine can open, so no landed body was compared and this clause asserted nothing` +
    (notHere.length ? `. ${notHere.length} name a source tree that is not on this machine, which is expected and is not an upstream divergence` : ''))];

  /* A NOTE, not a finding. It states the size of the population DIV actually walked, which is the
   * anti-vacuous obligation every check here carries, and it says nothing is wrong -- because
   * nothing is. A source tree that is not on this machine is not a corpus defect, not a debt and
   * not a task; it is the ordinary shape of a machine that is not the author's. */
  if (notHere.length) out.push(NOTEOF(`DIV scope: ${compared} of ${compared + notHere.length} landed files were compared against upstream. The other ${notHere.length} name a source tree that is not on this machine, so this run says nothing about them either way -- not a withdrawal, not drift, nothing owed: ${notHere.slice(0, 4).join(' ; ')}${notHere.length > 4 ? ' ...' : ''}`));
  out.push(withdrawn.length
    ? REPORT(`DIV withdrawn: ${withdrawn.length} landed file(s) name an upstream path that no longer exists: ${withdrawn.slice(0, 4).join(' ; ')}`)
    : OK(`DIV withdrawn: 0 of ${compared} landed files name a vanished upstream path`));
  out.push(undeclared.length
    ? REPORT(`DIV UNDECLARED divergence: ${undeclared.length} of ${compared} landed bodies differ from upstream with no "Body edit" declaration in the merge block. 2.18 (ARCH-5) rules divergence REPORTED and never auto-merged: ${undeclared.slice(0, 4).join(' ; ')}${undeclared.length > 4 ? ' ...' : ''}`)
    : OK(`DIV UNDECLARED divergence: 0 of ${compared} landed bodies differ from upstream without a declaration`));
  out.push(declaredIdentical
    ? REPORT(`DIV ${declaredIdentical} file(s) declare a body edit but are byte-identical to upstream; a declaration with nothing behind it is as misleading as an edit with no declaration`)
    : OK(`DIV declaration join is exact: ${declaredDiff} declared body edits, ${declaredDiff} of them actually differ from upstream, 0 declared-but-identical and 0 differing-but-undeclared`));
  out.push(NOTEOF(`DIV census: ${compared} compared, ${identical} identical to upstream (${eol} only after line-ending normalization), ${declaredDiff} differ under a declared 2.6 body edit, ${undeclared.length} differ undeclared`));
  if (unstrippable.length) out.push(REPORT(`DIV ${unstrippable.length} file(s) carry no separator-delimited merge block, so the landed body could not be isolated for comparison: ${unstrippable.slice(0, 4).join(' ')}`));
  out.push(haveState
    ? OK(`DIV .oracle-state.json present; new-vs-standing is resolvable`)
    : VACUOUS(`DIV .oracle-state.json (ARCH-3's state record) does not exist, so no divergence can be called NEW or STANDING. The divergence itself is computed above from provenance content and is unaffected. 1.5 (ARCH-3) is the owner`));
  return out;
};

/* ==================================================================================== §KA runner
 * The known-answer test. It compares the tool's declared expectations against the artifact and
 * fails on a mismatch, in both directions. It is not a summary of what was found. */
const CANONICAL_TREE = 'literature';
function knownAnswers(c) {
  const out = [];
  /* THE KNOWN ANSWERS ARE A CLAIM ABOUT ONE POPULATION: the canonical shelf at `literature/`.
   * A run under `--tree <staged>` walks a DIFFERENT population by construction -- that is the whole
   * purpose of staging, to gate a tree before it is promoted -- so comparing 168 against it is
   * comparing two figures at different read-digests, which COUNTING_RULE.md section 2 rule 2 says
   * you report as incomparable rather than reconcile. Firing the known answers there does not make
   * the tool stricter; it makes `--tree` unusable, because every staged run fails on ten counts that
   * were never about the staged tree. Found by running the tool's own documented staging mode
   * against a clean fixture and getting exit 1 with no FAIL line above the KA block. */
  if (c.treeRel !== CANONICAL_TREE) {
    return [VACUOUS(`KA the known answers are declared for ${CANONICAL_TREE}/ and this run walked "${c.treeRel}". They were NOT compared, and this run therefore certifies nothing about corpus size, field split or index width. Re-run without --tree for the known-answer test`)];
  }
  if (!c.exists || !c.docs.length) {
    return [VACUOUS(`KA the shelf is empty or missing, so every declared count is compared against nothing. THIS IS THE CASE THE KNOWN-ANSWER TEST EXISTS FOR: a tool that reported PASS here would be certifying ${KA.files} files it never saw`)];
  }
  const cmp = (label, expected, got) => out.push(expected === got
    ? OK(`KA ${label} = ${got}, as declared`)
    : FAIL(`KA ${label}: this tool declares ${expected} (taken at ${KA.at}) and measured ${got}. One of the two is wrong and the tool will not guess which; re-take the known answers in tools/verify_corpus.js §KA in the same edit that moved the shelf`));

  cmp('landed files', KA.files, c.docs.length);
  cmp('taxonomy folders', KA.folders, c.folders.length);

  const fc = new Map();
  for (const d of c.docs) { const f = first(d.merged, 'Field'); if (f) fc.set(f, (fc.get(f) || 0) + 1); }
  for (const k of Object.keys(KA.fieldCounts)) cmp(`field "${k}"`, KA.fieldCounts[k], fc.get(k) || 0);

  const roots = new Map();
  let dedup = 0, calls = 0;
  for (const d of c.docs) {
    const s = unbacktick(first(d.merged, 'Source'));
    if (s) roots.set(sourceKind(s), (roots.get(sourceKind(s)) || 0) + 1);
    if (first(d.merged, 'Dedup key') !== undefined) dedup++;
    if (d.blocks.some(b => [...b.keys.keys()].some(k => /^Duplicate pair /.test(k)))) calls++;
  }
  for (const k of Object.keys(KA.sourceRoots)) cmp(`Source: declarations of kind "${k}"`, KA.sourceRoots[k], roots.get(k) || 0);
  cmp('dedup keys parsed', KA.dedupParsed, dedup);
  cmp('primary/secondary calls', KA.duplicatePairCalls, calls);

  const idx = R(path.posix.join(c.treeRel, 'INDEX.tsv'));
  if (fs.existsSync(idx)) cmp('INDEX.tsv data rows', KA.indexRows,
    fs.readFileSync(idx, 'utf8').replace(/\r/g, '').split('\n').filter(Boolean).length - 1);
  else out.push(VACUOUS(`KA INDEX.tsv absent; its declared row count was compared against nothing`));

  const fld = R(path.posix.join(c.treeRel, 'FIELDS.tsv'));
  if (fs.existsSync(fld)) cmp('FIELDS.tsv data rows', KA.fieldsRows,
    fs.readFileSync(fld, 'utf8').replace(/\r/g, '').split('\n').filter(Boolean).length - 1);
  else out.push(VACUOUS(`KA FIELDS.tsv absent; its declared row count was compared against nothing`));

  // Baseline defect observations: drift is reported, never failed. Repairing a defect must not
  // turn a check red, or the check is a ratchet against its own purpose.
  const drift = (name, declared, measured) => NOTEOF(`KA baseline ${name}: declared ${declared}, measured ${measured}` +
    (measured === declared ? ' (standing)'
      : measured < declared ? ` (REPAIRED, ${declared - measured} fewer)`
        : ` (WORSE, ${measured - declared} new)`));
  const dbl = c.docs.filter(d => d.blocks.length > 1).length;
  let sfRefs = 0;
  for (const d of c.docs) for (const b of d.blocks) if (b.keys.has('Source file'))
    for (const v of b.keys.get('Source file')) {
      if (v.trim() === 'not held') continue;
      const nm = unbacktick((v.match(/`([^`]+)`/) || [, v.split(' ')[0]])[1]);
      if (!fs.existsSync(R(nm)) && !fs.existsSync(path.join(path.dirname(d.abs), nm))) sfRefs++;
    }
  const byKey = new Map();
  for (const d of c.docs) {
    const raw = first(d.merged, 'Dedup key');
    if (raw === undefined) continue;
    const k = raw.split(' — ')[0].trim();
    if (!byKey.has(k)) byKey.set(k, []);
    byKey.get(k).push(d);
  }
  const l3 = [...byKey.entries()].filter(([k, v]) => v.length > 1 && /^L3/.test(k) &&
    !v.every(d => d.blocks.some(b => [...b.keys.keys()].some(x => /^Duplicate pair /.test(x))))).length;
  out.push(drift('doubleProvenanceBlocks', BASELINE.doubleProvenanceBlocks, dbl));
  out.push(drift('danglingSourceFileRefs', BASELINE.danglingSourceFileRefs, sfRefs));
  out.push(drift('level3DuplicateGroupsUncalled', BASELINE.level3DuplicateGroupsUncalled, l3));
  return out;
}

/* ======================================================================================= runner */
function runAll(treeRel, only) {
  const c = loadCorpus(treeRel);
  const ids = only && only.length ? only : ['NAM', 'PTH', 'PRV', 'SRC', 'DUP', 'IDX', 'REG', 'DIV'];
  const groups = [];
  for (const id of ids) {
    if (!CHECKS[id]) { groups.push({ id, results: [FAIL(`unknown check id "${id}"`)] }); continue; }
    let results;
    try { results = CHECKS[id](c); }
    catch (e) { results = [FAIL(`${id} threw: ${e.message}`)]; }
    groups.push({ id, results });
  }
  groups.push({ id: 'KA', results: knownAnswers(c) });
  return { corpus: c, groups };
}

function tally(groups) {
  const t = { OK: 0, FAIL: 0, VACUOUS: 0, REPORT: 0, NOTE: 0 };
  for (const g of groups) for (const r of g.results) t[r.v] = (t[r.v] || 0) + 1;
  return t;
}

/* ===================================================================================== self-test
 * The pattern of literature_search.js's `--prove`, turned on a checker. A checker's self-test has
 * one job the checked-thing's does not: prove the checker can go RED. A green run against a clean
 * fixture proves nothing on its own -- an `if (true) return PASS` passes it.
 *
 * Every case builds a fixture, mutates one thing, runs the REAL check function against it, and
 * asserts the verdict. Nothing is stubbed. */
function fixture(dir, opts) {
  opts = opts || {};
  const lit = path.join(dir, 'literature');
  const fold = path.join(lit, 'isru-processing');
  fs.mkdirSync(fold, { recursive: true });
  const src = path.join(dir, 'upstream');
  fs.mkdirSync(src, { recursive: true });

  const mk = (leaf, o) => {
    o = o || {};
    const body = `# ${leaf}\n\nSome body prose about lunar regolith and oxygen extraction.\n`;
    fs.writeFileSync(path.join(src, leaf), body, 'utf8');
    const block = [
      '- **Landed:** Step 2.5, 2026-08-28, by `tools/merge_identity.js --stage`.',
      '- **Source:** `' + (o.rawSource ? o.rawSource
        : o.aliasSource ? 'fixturecorpus:' + (o.badSource ? 'nope-' : '') + leaf
          : 'upstream/' + (o.badSource ? 'nope-' : '') + leaf) + '`',
      '- **Byte source:** ' + (o.badByteSource || 'sole-lsei'),
      '- **Disposition:** LIFT (a landing mode, not a gate)',
      '- **Dedup key:** ' + (o.dedup || 'L1|10.1000/' + leaf.replace(/\.md$/, '')),
      '- **Field:** lunar · **Folder:** isru-processing',
      '- **Plan row rev:** 1',
    ];
    if (o.dropKey) { const i = block.findIndex(l => l.indexOf('**' + o.dropKey + ':**') !== -1); if (i >= 0) block.splice(i, 1); }
    if (o.pairCall) block.push('- **Duplicate pair DUP-99:** this file is the PRIMARY and it landed.');
    let text = body + '\n\n---\n\n## Provenance\n\n' + block.join('\n') + '\n';
    if (o.secondBlock) text = '# x\n\n## Provenance\n\n- **Document type:** report\n\n' + text;
    if (o.noBlock) text = body;
    fs.writeFileSync(path.join(fold, leaf), text, 'utf8');
  };

  const leaves = opts.leaves || ['csank-2022-powering-the-moon.md', 'sowers-2019-thermal-mining.md'];
  leaves.forEach(l => mk(l, (opts.per && opts.per[l]) || {}));
  if (opts.extra) opts.extra(mk, fold, src);

  /* The machine-local roots file, so a configured and an unconfigured machine can each be built
   * deliberately and asserted to give the SAME verdicts.
   * %UPSTREAM% is the fixture's own source directory; %NOWHERE% is a path guaranteed absent. */
  if (opts.sourceRootsLocal) {
    fs.mkdirSync(path.join(dir, 'tools'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'tools', 'source_roots.local'),
      String(opts.sourceRootsLocal).replace(/%UPSTREAM%/g, src)
        .replace(/%NOWHERE%/g, path.join(dir, 'no-such-root')) + '\n', 'utf8');
  }
  /* The TRACKED .example, which is the alias vocabulary SRC-2 checks against. It is written by
   * default because every clone has it: a fixture without it would test a working copy missing a
   * tracked file, which is a different case and is asserted separately. */
  if (opts.sourceRootsExample !== null) {
    fs.mkdirSync(path.join(dir, 'tools'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'tools', 'source_roots.local.example'),
      (opts.sourceRootsExample || '# as: fixturecorpus\n/replace/with/a/path') + '\n', 'utf8');
  }

  const rows = fs.readdirSync(fold).map(l => `literature/isru-processing/${l}\tisru-processing\tnone\tlunar`);
  if (!opts.noIndex) fs.writeFileSync(path.join(lit, 'INDEX.tsv'),
    'path\tprimary\talso\tfield\n' + rows.join('\n') + '\n', 'utf8');
  if (!opts.noFields) fs.writeFileSync(path.join(lit, 'FIELDS.tsv'),
    'field\tlabel\treview_owner\tfolders\tfiles\nlunar\tLunar\tspace-resources\tisru-processing\t' + rows.length + '\n', 'utf8');
  return dir;
}

function selftest() {
  const saved = process.env.QJS_ROOT;
  let pass = true;
  const cases = [];
  const report = (label, ok, detail) => {
    console.log('  ' + (ok ? 'PASS' : 'FAIL') + '  ' + label + (detail ? '   (' + detail + ')' : ''));
    if (!ok) pass = false;
    cases.push(ok);
  };
  // The checks read ROOT through the module-level const, so a fresh root means a fresh require.
  const requireFresh = dir => {
    process.env.QJS_ROOT = dir;
    delete require.cache[require.resolve(__filename)];
    return require(__filename);
  };
  const withTree = (opts, fn) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-corpus-'));
    try {
      if (opts) fixture(dir, opts);
      const mod = requireFresh(dir);
      fn(mod, dir);
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  };
  const verdicts = groups => { const s = new Set(); for (const g of groups) for (const r of g.results) s.add(r.v); return s; };
  const find = (groups, id, re) => {
    const g = groups.find(x => x.id === id);
    return g ? g.results.filter(r => re.test(r.m)) : [];
  };

  console.log('tools/verify_corpus.js --selftest, version ' + TOOL_VERSION);
  console.log('\nA. THE ANTI-VACUOUS CASES. These are the reason this tool exists.');

  // A1: a MISSING tree must be VACUOUS everywhere and PASS nowhere.
  withTree(null, mod => {
    const { groups } = mod._runAll('literature', null);
    const v = verdicts(groups);
    report('a missing literature/ yields VACUOUS and never OK',
      v.has('VACUOUS') && !v.has('OK'), [...v].join(','));
  });

  // A2: an EXISTING BUT EMPTY tree must be VACUOUS everywhere and PASS nowhere.
  withTree(null, (mod, dir) => {
    fs.mkdirSync(path.join(dir, 'literature'), { recursive: true });
    const { groups } = mod._runAll('literature', null);
    const v = verdicts(groups);
    report('an existing, empty literature/ yields VACUOUS and never OK',
      v.has('VACUOUS') && !v.has('OK'), [...v].join(','));
  });

  // A3: the known-answer test must refuse to certify counts it did not measure.
  withTree(null, mod => {
    const { groups } = mod._runAll('literature', null);
    const ka = groups.find(g => g.id === 'KA');
    report('the known-answer test reports VACUOUS on an empty shelf, not PASS',
      ka.results.every(r => r.v === 'VACUOUS'), ka.results.map(r => r.v).join(','));
  });

  console.log('\nB. THE PLANTED DEFECTS. Each must turn exactly the check that owns it RED.');

  const plant = (label, opts, id, re) => withTree(opts, mod => {
    const { groups } = mod._runAll('literature', [id]);
    const hits = find(groups, id, re).filter(r => r.v === 'FAIL');
    report(label, hits.length > 0, hits.length ? hits[0].m.slice(0, 90) : 'no FAIL line matched ' + re);
  });

  plant('a leaf failing R_S turns NAM red', { leaves: ['Csank-2022.md', 'sowers-2019-thermal-mining.md'] }, 'NAM', /NAM-1 /);
  plant('a findings-namespace leaf on the summary shelf turns NAM red', { leaves: ['fa2-growth-verdict-table.md', 'sowers-2019-thermal-mining.md'] }, 'NAM', /NAM-2 /);
  plant('a -<digit> suffix turns NAM red', { leaves: ['csank-2022-powering-the-moon-2.md', 'sowers-2019-thermal-mining.md'] }, 'NAM', /NAM-10 /);
  plant('a stopword identity segment turns NAM red', { leaves: ['the-2020-lunar-thing.md', 'sowers-2019-thermal-mining.md'] }, 'NAM', /NAM-11/);
  plant('two leaves with one token set turn NAM red', { leaves: ['csank-2022-powering-the-moon.md', 'csank-2022-moon-powering.md'] }, 'NAM', /NAM-8/);
  plant('a missing ## Provenance block turns PRV red', { per: { 'sowers-2019-thermal-mining.md': { noBlock: true } } }, 'PRV', /PRV-1 /);
  plant('a second ## Provenance block turns PRV red', { per: { 'sowers-2019-thermal-mining.md': { secondBlock: true } } }, 'PRV', /PRV-1b /);
  plant('a dropped landed key turns PRV red', { per: { 'sowers-2019-thermal-mining.md': { dropKey: 'Dedup key' } } }, 'PRV', /PRV-2 /);
  plant('a Byte source outside the closed set turns PRV red', { per: { 'sowers-2019-thermal-mining.md': { badByteSource: 'lsei' } } }, 'PRV', /PRV-4 /);
  /* ---- SOURCE DECLARATIONS: MALFORMATION FAILS, ABSENCE DOES NOT ------------------------------
   * These cases replace the seven that asserted the old three-state resolution reporting, and they
   * assert the ruling that removed it: a machine that cannot open a source has nothing wrong with
   * it, and the corpus on it is complete. What can still be wrong is the DECLARATION -- a path that
   * cannot travel, or an alias no machine could ever be configured for -- and that is wrong in every
   * clone identically. The last case is the important one and it is written as a prohibition: no
   * FAIL and no REPORT may appear anywhere in SRC merely because a source is not on this machine.
   * Without it, somebody re-adds the count in six months because it "seems useful to know". */
  const CASE = 'aoki.md';
  const srcVerdicts = (opts, fn) => withTree(opts, mod => {
    const { groups } = mod._runAll('literature', ['SRC']);
    const g = groups.find(x => x.id === 'SRC');
    fn(g.results);
  });
  const srcRow = (opts, want) => srcVerdicts(opts, results => {
    const one = results.filter(r => /SRC-1 /.test(r.m))[0];
    const two = results.filter(r => /SRC-2 /.test(r.m))[0];
    const got = `${one ? one.v : 'none'}/${two ? two.v : 'none'}`;
    report(want.label, got === want.expect, `SRC-1|SRC-2 = ${got}, wanted ${want.expect}` +
      (one ? '   ' + one.m.slice(0, 100) : ''));
  });

  // 1. A backslash: one machine's path, which is the defect the alias mechanism exists to remove.
  srcRow({ leaves: [CASE, 'sowers-2019-thermal-mining.md'], per: { [CASE]: { rawSource: 'C:\\corpora\\jm\\' + CASE } } },
    { label: 'a Windows path in a Source: cell is MALFORMED and turns SRC-1 red', expect: 'FAIL/NOTE' });

  // 2. A bare leaf names no tree, so nothing can ever look it up.
  srcRow({ leaves: [CASE, 'sowers-2019-thermal-mining.md'], per: { [CASE]: { rawSource: CASE } } },
    { label: 'a bare leaf with no directory is MALFORMED and turns SRC-1 red', expect: 'FAIL/NOTE' });

  // 3. An alias the shipped .example does not declare can never be configured by anybody.
  srcRow({
    leaves: [CASE, 'sowers-2019-thermal-mining.md'], per: { [CASE]: { aliasSource: true } },
    sourceRootsExample: '# as: someotheralias\n/x',
  }, { label: 'an alias the shipped .example does not declare turns SRC-2 red', expect: 'OK/FAIL' });

  // 4. THE REGRESSION THAT MATTERS. The same declarations, once with a root configured and once
  //    with none at all, must produce the SAME verdicts. A check whose answer moves with the
  //    machine is a check that reports the machine and calls it the corpus.
  const sameEither = { leaves: [CASE, 'sowers-2019-thermal-mining.md'], per: { [CASE]: { aliasSource: true }, 'sowers-2019-thermal-mining.md': { aliasSource: true } } };
  let unconfiguredVerdicts = null;
  srcVerdicts(sameEither, results => { unconfiguredVerdicts = results.map(r => r.v).join(','); });
  srcVerdicts(Object.assign({}, sameEither, { sourceRootsLocal: '# as: fixturecorpus\n%UPSTREAM%' }), results => {
    const configured = results.map(r => r.v).join(',');
    report('SRC returns the SAME verdicts with every root configured and with none',
      configured === unconfiguredVerdicts, `unconfigured [${unconfiguredVerdicts}] vs configured [${configured}]`);
  });

  // 5. THE PROHIBITION. Nothing in SRC may go FAIL or REPORT because a source is not on this
  //    machine. This is a fresh clone: no roots file, no _intake/, no lsei/, every source elsewhere.
  srcVerdicts({
    leaves: [CASE, 'sowers-2019-thermal-mining.md'],
    per: { [CASE]: { aliasSource: true }, 'sowers-2019-thermal-mining.md': { rawSource: 'lsei/literature/x/sowers-2019-thermal-mining.md' } },
  }, results => {
    const loud = results.filter(r => r.v === 'FAIL' || r.v === 'REPORT');
    report('a machine that can open NO source produces no FAIL and no REPORT in SRC',
      loud.length === 0, loud.length ? loud.map(r => r.v + ' ' + r.m.slice(0, 70)).join(' ; ') : 'silent, as ruled');
  });

  plant('a shared level-1 dedup key with no call turns DUP red',
    { per: { 'csank-2022-powering-the-moon.md': { dedup: 'L1|10.1000/shared' }, 'sowers-2019-thermal-mining.md': { dedup: 'L1|10.1000/shared' } } }, 'DUP', /DUP-1 /);

  // The level-3 counterpart must NOT fail: DUP-4 rules it a candidate, never a confirmation.
  withTree({ per: { 'csank-2022-powering-the-moon.md': { dedup: 'L3|a|2020|b' }, 'sowers-2019-thermal-mining.md': { dedup: 'L3|a|2020|b' } } }, mod => {
    const { groups } = mod._runAll('literature', ['DUP']);
    const fails = find(groups, 'DUP', /DUP-1 /).filter(r => r.v === 'FAIL');
    const reports = find(groups, 'DUP', /DUP-4 /).filter(r => r.v === 'REPORT');
    report('a shared LEVEL-3 key reports and does not fail, per DUP-4',
      fails.length === 0 && reports.length === 1, `${fails.length} fail, ${reports.length} report`);
  });

  // An index that has lost a row must be caught on the join, not smoothed over.
  withTree({}, (mod, dir) => {
    const p = path.join(dir, 'literature', 'INDEX.tsv');
    const l = fs.readFileSync(p, 'utf8').split('\n').filter(Boolean);
    fs.writeFileSync(p, l.slice(0, -1).join('\n') + '\n', 'utf8');
    const { groups } = mod._runAll('literature', ['IDX']);
    const hits = find(groups, 'IDX', /FLD-10/).filter(r => r.v === 'FAIL');
    report('an INDEX.tsv row removed turns IDX red', hits.length > 0, hits.length ? hits[0].m.slice(0, 80) : 'no FAIL');
  });

  console.log('\nC. THE CLEAN TREE. Every check green or vacuous, no FAIL, and the run exits 0.');
  withTree({}, mod => {
    const { groups } = mod._runAll('literature', ['NAM', 'PTH', 'PRV', 'SRC', 'DUP', 'IDX']);
    const fails = [];
    for (const g of groups) for (const r of g.results) if (r.v === 'FAIL' && g.id !== 'KA') fails.push(g.id + ': ' + r.m);
    report('a clean fixture tree produces 0 FAIL lines', fails.length === 0, fails.slice(0, 2).join(' ; ') || 'clean');
    const oks = [];
    for (const g of groups) for (const r of g.results) if (r.v === 'OK') oks.push(1);
    report('a clean fixture tree produces OK lines, so the checks are actually running', oks.length > 0, oks.length + ' OK');
  });

  // And the known-answer test must go RED on a clean-but-differently-sized tree. This is the
  // "wrong out loud" requirement: the tool declares 168 and must not accept 2 silently.
  withTree({}, mod => {
    const { groups } = mod._runAll('literature', []);
    const ka = groups.find(g => g.id === 'KA');
    const fails = ka.results.filter(r => r.v === 'FAIL');
    report('the known-answer test goes RED against a shelf that is not the declared one',
      fails.length > 0, fails.length + ' KA mismatches, e.g. ' + (fails[0] ? fails[0].m.slice(0, 70) : ''));
  });

  if (saved === undefined) delete process.env.QJS_ROOT; else process.env.QJS_ROOT = saved;
  console.log('\n' + (pass ? 'SELF-TEST: PASS' : 'SELF-TEST: FAIL') + '  (' + cases.filter(Boolean).length + '/' + cases.length + ' cases)');
  return pass;
}

/* ========================================================================================= main */
if (require.main !== module) {
  module.exports = { _runAll: runAll, loadCorpus, provenanceBlocks, tokenize, normalize,
    R_S, R_F, KA, BASELINE, TOOL_VERSION, selftest };
} else if (flag('selftest')) {
  process.exit(selftest() ? 0 : 1);
} else {
  const TREE = opt('tree', 'literature');
  const only = (opt('only', '') || '').split(',').map(s => s.trim()).filter(Boolean);
  const lines = [];
  const say = (v, m) => lines.push(v + ' '.repeat(Math.max(1, 8 - v.length)) + m);

  const { corpus, groups } = runAll(TREE, only);

  // The stamp, printed first, so it survives anything below it.
  const rd = readDigest(corpus.all);
  say('NOTE', `tools/verify_corpus.js version ${TOOL_VERSION}, tree "${TREE}", flags ${argv.length ? argv.join(' ') : '(none)'}`);
  say('NOTE', `read-digest ${rd.digest} over ${rd.n} files (path,size,mtime) under ${TREE}/`);
  say('NOTE', `population: ${corpus.docs.length} summaries in ${corpus.folders.length} folders; tree ${corpus.exists ? 'exists' : 'DOES NOT EXIST'}`);

  for (const g of groups) { say('NOTE', `--- ${g.id} ---`); for (const r of g.results) say(r.v, r.m); }

  /* --sources: a worksheet for the copyright audit, and nothing else reads it.
   *
   * It answers one question -- which sources can this machine open -- because
   * `tools/audit_abstract_overlap.js` has to open a publication to measure verbatim overlap against
   * it. IT IS NOT A CORPUS CHECK AND NO VERDICT ABOVE DEPENDS ON IT. A clone opens none of these and
   * its 169 summaries are complete; the author's machine opens most of them and its 169 summaries
   * are the same 169. Every line is INDENTED, because COUNTING_RULE.md section 3 rule 11 reserves
   * column 0 for the five verdict prefixes and a count over unfiltered output has to stay exact. */
  if (flag('sources')) {
    const cfg = loadSourceRoots();
    const rows = [];
    for (const d of corpus.docs) {
      const v = unbacktick(first(d.merged, 'Source'));
      if (!v) continue;
      const r = resolveSource(v, cfg);
      rows.push({ state: r.state, rel: d.rel, v, extra: r.state === 'resolved' ? r.abs : r.why });
    }
    const label = { resolved: 'CAN OPEN        ', unconfigured: 'NOT ON THIS MACHINE', broken: 'ROOT SET, NOT FOUND' };
    say('NOTE', `--- which sources this machine can open, ${rows.length} declarations, roots from ${cfg.file}${cfg.present ? '' : ' (not present here)'} ---`);
    say('NOTE', `THIS IS FOR THE COPYRIGHT AUDIT, WHICH NEEDS THE AUTHOR'S SOURCE FOLDERS. It is not a corpus check. A machine that can open none of these still holds the whole corpus`);
    for (const s of ['broken', 'unconfigured', 'resolved'])
      for (const r of rows.filter(x => x.state === s)) lines.push(`  ${label[s]}  ${r.rel} -> ${r.v}   [${r.extra}]`);
    for (const s of ['resolved', 'unconfigured', 'broken'])
      say('NOTE', `--sources ${label[s].trim()}: ${rows.filter(x => x.state === s).length}`);
  }

  const t = tally(groups);
  say('NOTE', `verdicts: ${t.OK} OK, ${t.FAIL} FAIL, ${t.VACUOUS} VACUOUS, ${t.REPORT} REPORT`);
  say('NOTE', `VACUOUS IS NOT PASS. ${t.VACUOUS} clause(s) walked an empty or missing population and asserted nothing; they are not in the ${t.OK} OK.`);
  say('NOTE', `hard failures: ${t.FAIL} @ read-digest ${rd.digest} over ${rd.n} files, tool ${TOOL_VERSION}`);

  if (flag('json')) console.log(JSON.stringify({ tool: TOOL_VERSION, tree: TREE, digest: rd.digest, files: rd.n, tally: t, groups }, null, 2));
  else console.log(lines.join('\n'));
  process.exit(t.FAIL ? 1 : 0);
}
