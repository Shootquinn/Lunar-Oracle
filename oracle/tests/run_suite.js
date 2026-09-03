#!/usr/bin/env node
/* run_suite.js -- the runner CHK-18 has named since 1.13.
 *
 * WHAT THIS IS, AND THE SIMPLICITY GATE IT PASSED.
 * This is a runner for two markdown suites. It is not a test framework and it must not grow into
 * one. There is no assertion DSL, no fixture lifecycle, no reporter plugin and no config file: the
 * suites are markdown tables, so the runner parses markdown tables, executes the bindings it has,
 * and prints one line per group. Everything it does fits in one file a person can read in a sitting,
 * which is the property that makes it maintainable by a team this size.
 *
 * THE ONE RULE THAT MATTERS. A row the runner cannot execute is reported UNRUN. It is never
 * reported PASS. The `Status` cell of a suite is a CLAIM by the suite's author about what will
 * happen; it is not a result, and a runner that printed the status column back at you would be
 * CHK-03 at a scale of 391 rows. Likewise a binding whose population is empty returns VACUOUS and
 * is counted as UNRUN, not as PASS: `literature/` holds zero files, and every collision assertion
 * over it is vacuously true today. An empty list must never read as a clean one.
 *
 * EXIT CODE. Non-zero if any binding FAILED or any structural check failed. UNRUN does not fail the
 * run -- 391 rows cannot be mechanized this wave and a runner that refused to exit 0 until they were
 * would be switched off in a day -- but the count is printed on every group line and in the summary,
 * so it cannot be lost.
 *
 *   node oracle/tests/run_suite.js                     both suites, this repository
 *   node oracle/tests/run_suite.js --suite <path>       one suite file (a mutated fixture copy)
 *   node oracle/tests/run_suite.js --group MRG          one group
 *   node oracle/tests/run_suite.js --verbose            print every row, not just failures
 *
 * MUTATION TESTING: copy a suite to cr_scratch/fixtures/, break it, and run --suite against the
 * copy. The runner never writes, so it cannot damage what it reads (MUT-5, CON-3).
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const R = p => path.join(ROOT, p);
const SUITES = ['oracle/tests/corpus_suite.md', 'oracle/tests/answering_loop_suite.md'];

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf('--' + name); return i < 0 ? def : argv[i + 1]; };
const flag = name => argv.includes('--' + name);
const VERBOSE = flag('verbose');
const ONLY_GROUP = opt('group', null);
// --tree lets the corpus assertions run against a STAGED tree before it is promoted. That is the
// entire point of staging: a gate that can only read the promoted tree can only report after the
// promotion it was supposed to gate. Default is the real corpus root.
const TREE = opt('tree', 'literature');

/* ------------------------------------------------------------------ results */
const PASS = (m) => ({ v: 'PASS', m });
const FAIL = (m) => ({ v: 'FAIL', m });
const VAC = (m) => ({ v: 'VACUOUS', m });   // population empty: reported UNRUN, never PASS
/* DEFER: the row's SUBJECT does not exist yet -- a Step 3 loader, the retrieval layer, a classifier
 * built at 3.8. It counts as UNRUN, exactly like VACUOUS and like no-binding, because it is not a
 * result. It is printed separately from those two because the three are different facts about why a
 * row did not run, and collapsing them loses the only one that carries a named owner and a date. A
 * deferred row with a reason is worth more than an unrun one without: both are non-results, but only
 * one tells you what would have to exist for it to become a result. */
const DEFER = (m) => ({ v: 'DEFER', m });

/* ------------------------------------------------------------------ parsing */
// A suite is: `## N. GRP -- ...` or `### N.1 GRP -- ...` headings, then `| ID | ... |` rows.
// The corpus suite excludes section 13 from its own count (bolded gate ids); we honour that.
function parseSuite(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const rows = [], groups = [];
  let stop = false;
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    // The corpus suite's own counting rule stops at section 13. Honour it, so the runner's row set
    // is the set the header declares rather than a larger, correct count of a different population.
    if (/^## 13\./.test(L) && /corpus_suite/.test(file)) stop = true;
    if (stop) continue;
    const m = L.match(/^\| *([A-Z]{2,4}-[0-9]+[a-z]?) *\|/);
    if (!m) continue;
    const cells = L.split('|').slice(1, -1).map(s => s.trim());
    // GROUP IS THE ID PREFIX, never the nearest heading. Heading parsing is the first thing this
    // runner got wrong: `## 8. PDF` and `### 8.1 CON` are two heading shapes, only one matched, and
    // sixteen PDF rows were reported under MRG while the group totals still summed to 175. A total
    // that closes is not evidence that the parts are right.
    const group = m[1].split('-')[0];
    if (!groups.includes(group)) groups.push(group);
    rows.push({ id: m[1], group, cells, line: i + 1, file });
  }
  const declared = (text.match(/\*\*([0-9]+) tests?[.,]?\*\*/) || [])[1];
  return { file, rows, groups, declared: declared ? Number(declared) : null, text, lines };
}

/* ---------------------------------------------------- structural assertions */
// These are the suites' own meta-tests (SLT-5, MUT-1, MUT-6). They run against whatever file is
// loaded, which is what makes a mutated fixture copy detectable.
// The two suites do not share a status vocabulary and they do not share a mutation column. The
// corpus suite's MUT group is ITS meta-suite, not a rule about markdown suites in general; applying
// it to the answering-loop suite would be this runner inventing a contract for a file it is only
// reading. Declared here, by suite, so the difference is visible rather than hidden in a branch.
const CONVENTION = {
  'corpus_suite.md': { status: /\b(green|RED|H)\b/, mutationColumn: true, redNeedsOwner: true },
  'answering_loop_suite.md': { status: /(\bgreen\b|\bRED\b|\bH\b|\[4\.1\])/, mutationColumn: false, redNeedsOwner: false }
};
function structural(s) {
  const out = [];
  const n = s.rows.length;
  const conv = CONVENTION[path.basename(s.file)] || CONVENTION['corpus_suite.md'];
  out.push(s.declared === null
    ? FAIL(`${path.basename(s.file)} declares no test count`)
    : s.declared === n ? PASS(`SLT-5 declared ${s.declared} == counted ${n}`)
      : FAIL(`SLT-5 ${path.basename(s.file)} declares ${s.declared} tests, counted ${n}`));

  // MUT-1: every row states a mutation. Only the corpus suite carries a mutation column (5 cells).
  if (!conv.mutationColumn) out.push(VAC('MUT-1 this suite carries no mutation column'));
  else {
    const mut = s.rows.filter(r => r.cells.length >= 5);
    const bad = mut.filter(r => !r.cells[3]);
    out.push(bad.length ? FAIL(`MUT-1 ${bad.length} rows state no mutation: ${bad.map(r => r.id).join(' ')}`)
      : PASS(`MUT-1 all ${mut.length} rows state a mutation`));
  }

  // MUT-6: every RED row names an owner and a close condition. `Close,` and `Close:` are both the
  // convention in use; requiring the colon fired on PTH-9, whose cell reads "Close, and it is an
  // observation not a date:" -- which is the clause satisfied more strictly than the check asked.
  const red = s.rows.filter(r => /\bRED\b/.test(r.cells[r.cells.length - 1]));
  if (!conv.redNeedsOwner) out.push(VAC(`MUT-6 not this suite's convention (${red.length} RED rows)`));
  else if (!red.length) out.push(VAC('MUT-6 no RED rows'));
  else {
    const bad = red.filter(r => { const c = r.cells[r.cells.length - 1]; return !/Owner[:,]/i.test(c) || !/Close[:,]/i.test(c); });
    out.push(bad.length ? FAIL(`MUT-6 ${bad.length} RED rows lack an owner or a close condition: ${bad.map(r => r.id).join(' ')}`)
      : PASS(`MUT-6 all ${red.length} RED rows name owner and close`));
  }

  // Status vocabulary is a closed set, per suite. A status nobody ruled on is a status nobody can act on.
  const bad = s.rows.filter(r => !conv.status.test(r.cells[r.cells.length - 1]));
  out.push(bad.length ? FAIL(`status outside this suite's vocabulary ${conv.status}: ${bad.map(r => r.id).join(' ')}`)
    : PASS(`all ${n} status cells inside this suite's declared vocabulary`));
  return out;
}

/* ------------------------------------------------------------------- shell */
function sh(cmd) {
  try { return { code: 0, out: cp.execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }; }
  catch (e) { return { code: e.status === undefined ? 1 : e.status, out: (e.stdout || '') + (e.stderr || '') }; }
}
/* W5-11. `e.isDirectory()` is FALSE for a reparse-pointed directory -- junction, mounted volume,
 * placeholder folder -- and this shape then treats the folder as a file and prunes its whole
 * subtree without a word. Measured on this machine at W5-11 over a directory holding two files and
 * one junction to a 28-file folder: this shape returned 2. The type test is kept LOCAL rather than
 * imported from tools/fswalk.js, per the rule two hundred lines below -- the runner must not import
 * the thing it checks -- and it deliberately mirrors it. */
function entryKind(e, p) {
  if (e.isDirectory()) return 'dir';
  if (e.isFile()) return 'file';
  try { const st = fs.statSync(p); return st.isDirectory() ? 'dir' : st.isFile() ? 'file' : 'other'; }
  catch (err) { return 'other'; }
}
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    const k = entryKind(e, p);
    if (k === 'dir') walk(p, out); else if (k === 'file') out.push(p);
  }
  return out;
}
// NAMING.md sec.1. Kept local on purpose: the runner must not import the thing it checks.
const normalize = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* --------------------------------------------------------------- plan table */
let PLAN = null;
function plan() {
  if (PLAN !== null) return PLAN;
  const f = R('cr_scratch/merge_plan.tsv');
  if (!fs.existsSync(f)) return (PLAN = { missing: true });
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#'));
  const head = lines[0].split('\t');
  const rows = lines.slice(1).map(l => { const c = l.split('\t'); const o = {}; head.forEach((h, i) => o[h] = c[i] === undefined ? '' : c[i]); o._n = c.length; return o; });
  return (PLAN = { head, rows, missing: false });
}
const BYTE_SOURCE = ['sole-lsei', 'sole-intake', 'both-identical', 'lsei-primary', 'intake-primary'];
const PAIR_PRIMARY = ['primary', 'secondary', 'unadjudicated'];

/* ---------------------------------------------------------------- bindings */
// One entry per suite row that is executable against THIS repository TODAY. Absence of an entry is
// UNRUN and is printed as such. Do not add an entry that returns PASS without measuring something.
const B = {};

/* --- PDF containment: git's own ignore machinery, asserted by probe ------- */
const PDF_PROBES = ['x.pdf', 'docs/x.pdf', 'oracle/x.pdf', 'tools/x.pdf', 'cr_scratch/x.pdf',
  'literature/x.pdf', 'literature/isru/x.pdf', '_intake/x.pdf'];
const ignored = p => sh(`git check-ignore -q "${p}"`).code === 0;

B['PDF-1'] = () => {
  const r = sh(`git ls-files "*.pdf" "*.PDF"`);
  const n = r.out.split('\n').filter(Boolean).length;
  return n === 0 ? PASS('0 tracked PDFs') : FAIL(`${n} tracked PDFs: ${r.out.split('\n')[0]}`);
};
B['PDF-2'] = () => {
  const open = PDF_PROBES.filter(p => !ignored(p));
  return open.length ? FAIL(`${open.length} of 8 probe paths are NOT ignored: ${open.join(' ')}`)
    : PASS('all 8 probe paths ignored');
};
B['PDF-3'] = () => {
  const exts = ['djvu', 'epub', 'docx', 'doc', 'pptx', 'ps', 'tif', 'tiff'];
  const open = [];
  for (const e of exts) for (const p of PDF_PROBES) { const q = p.replace(/\.pdf$/, '.' + e); if (!ignored(q)) open.push(q); }
  return open.length ? FAIL(`${open.length} of ${exts.length * PDF_PROBES.length} carrier probes NOT ignored, e.g. ${open.slice(0, 3).join(' ')}`)
    : PASS('all carrier probes ignored');
};
B['PDF-5'] = () => {
  const probes = ['literature/_pdf/isru-processing/x.pdf', 'literature/_pdf/isru-processing/x.md'];
  const open = probes.filter(p => !ignored(p));
  return open.length ? FAIL(`literature/_pdf ships: ${open.join(' ')}`) : PASS('literature/_pdf ignores both probes');
};
// NO BINDING FOR PDF-4. My first attempt probed `git check-ignore` on a `.txt` and reported FAIL.
// PDF-4 does not say `.txt` is gitignored; it says the CONTAINMENT CHECK covers it outside
// `literature/`, and that is `check_no_sources.js` against a fixture. A binding that asserts
// something the row does not say is worse than no binding, because it fails loudly and wrongly and
// the next person relaxes the row. UNRUN is the honest report and it is what this row now gets.

/* --- path contract ------------------------------------------------------- */
B['PTH-9'] = () => {
  if (!fs.existsSync(R(TREE))) return VAC(TREE + '/ does not exist');
  const d1 = fs.readdirSync(R(TREE)).filter(f => /\.md$/i.test(f));
  return d1.length ? FAIL(`${d1.length} .md at depth 1 under ${TREE}/: ${d1.join(' ')}`) : PASS(`0 .md at depth 1 under ${TREE}/`);
};
B['PTH-12'] = () => {
  const hits = sh(`git ls-files "*NAMING.md"`).out.split('\n').filter(Boolean);
  return hits.length === 1 ? PASS(`exactly one NAMING.md: ${hits[0]}`) : FAIL(`${hits.length} NAMING.md tracked: ${hits.join(' ')}`);
};
B['PTH-13'] = () => {
  /* THE LIVE SET IS COMPUTED, not listed. The Wave 1 binding carried a hand-written array and the
   * row's own cell already said the set was computed; a list is a memory and this project has
   * shipped one wrong memory of this exact set already (`oracle/AMENDMENTS.tsv` was omitted).
   *
   * THE LIVENESS RULE, added W5-9, 2026-08-29, and it is a rule rather than an exception list.
   * The two remaining occurrences are both HISTORICAL PROSE recording the relocation itself:
   * `oracle/NAMING.md`'s relocation banner ("This file WAS literature/NAMING.md and is now
   * oracle/NAMING.md") and `oracle/AMENDMENTS.tsv` AM-153's rationale ("it is thirty-one files ...
   * naming literature/NAMING.md by path"). Repointing either FALSIFIES THE RECORD -- the banner
   * would read "was oracle/NAMING.md and is now oracle/NAMING.md", and the amendment would claim a
   * defect that never existed. A matcher that cannot tell a pointer from a mention is the wrong
   * matcher, and this is the difference it was missing:
   *
   *   A RELOCATION RECORD NAMES BOTH ENDPOINTS. A POINTER NAMES ONE.
   *
   * Clause 1. An occurrence is HISTORICAL if the same RECORD also names the path's current
   *           location. A record is one physical line in a `.tsv` -- register rows are line-atomic
   *           under `register_schema.md` -- and one blank-line-delimited block elsewhere.
   * Clause 2. In a `.tsv`, an occurrence that is a field's ENTIRE value is an ADDRESS and is LIVE
   *           regardless of clause 1. A path-typed column holds the path as its whole value; a
   *           narrative column embeds it in a sentence. This is what keeps the row able to catch
   *           the failure it was written for: `oracle/MANIFEST.tsv` carrying a `promoted` row whose
   *           target column is the dead path, even in a row that also explains the move.
   *
   * Neither clause names a file. Both are decidable from the text. */
  const DEAD = 'literature/NAMING.md', CURRENT = 'oracle/NAMING.md';
  const RE = /literature\/NAMING\.md/g;
  const tracked = sh('git ls-files').out.split('\n').map(s2 => s2.trim()).filter(Boolean)
    .filter(f => !/^cr_scratch\//.test(f) && !/^(cr-agents|lsei)\//.test(f));
  const hits = [], excluded = [];
  for (const f of tracked) {
    const p = R(f);
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) continue;
    let t; try { t = fs.readFileSync(p, 'utf8'); } catch { continue; }
    if (!t.includes(DEAD)) continue;
    const tsv = /\.tsv$/i.test(f);
    const records = tsv ? t.split(/\r?\n/) : t.split(/\r?\n[ \t]*\r?\n/);
    let live = 0, hist = 0;
    for (const rec of records) {
      const occ = (rec.match(RE) || []).length;
      if (!occ) continue;
      const asField = tsv && rec.split('\t').some(c => c.trim() === DEAD);   // clause 2
      if (!asField && rec.includes(CURRENT)) { hist += occ; continue; }       // clause 1
      live += occ;
    }
    if (live) hits.push(`${f}:${live}`);
    if (hist) excluded.push(`${f}:${hist}`);
  }
  const tail = excluded.length
    ? ` (${excluded.length} file(s) carry ${excluded.reduce((a, e) => a + Number(e.split(':').pop()), 0)} historical mention(s), excluded by the both-endpoints rule and named so they are auditable: ${excluded.join(' ')})`
    : ' (0 historical mentions)';
  return hits.length
    ? FAIL(`${hits.length} live files still cite ${DEAD}: ${hits.join(' ')}${tail}`)
    : PASS(`0 live citations of ${DEAD} across ${tracked.length} tracked files outside cr_scratch/${tail}`);
};
B['PTH-14'] = () => {
  const tracked = sh(`git ls-files oracle/NAMING.md`).out.trim();
  if (!tracked) return FAIL('oracle/NAMING.md is not tracked');
  return ignored('oracle/NAMING.md') ? FAIL('oracle/NAMING.md is IGNORED') : PASS('oracle/NAMING.md tracked and not ignored');
};

/* --- corpus-level collisions. VACUOUS today and that is the report --------- */
function corpusFiles() { return walk(R(TREE)).filter(p => /\.md$/i.test(p) && !/[\\/]_pdf[\\/]/.test(p)); }
B['CRP-4'] = () => {
  const fsx = corpusFiles();
  if (!fsx.length) return VAC(TREE + '/ holds 0 .md files; a per-folder collision check over an empty tree is vacuously true');
  const seen = new Map(), bad = [];
  for (const p of fsx) { const k = path.dirname(p) + '::' + normalize(path.basename(p, '.md')); if (seen.has(k)) bad.push(`${seen.get(k)} <-> ${p}`); else seen.set(k, p); }
  return bad.length ? FAIL(`${bad.length} within-folder normalized-key collisions: ${bad.join(' ; ')}`) : PASS(`0 within-folder collisions over ${fsx.length} files`);
};
B['CRP-5'] = () => {
  const fsx = corpusFiles();
  if (!fsx.length) return VAC(TREE + '/ holds 0 .md files; a tree-wide collision check over an empty tree is vacuously true');
  const seen = new Map(), bad = [];
  for (const p of fsx) { const k = normalize(path.basename(p, '.md')); if (seen.has(k)) bad.push(`${seen.get(k)} <-> ${p} (key ${k})`); else seen.set(k, p); }
  return bad.length ? FAIL(`${bad.length} tree-wide normalized-key collisions: ${bad.join(' ; ')}`) : PASS(`0 tree-wide collisions over ${fsx.length} files`);
};

/* --- naming and provenance: four rows the LANDED corpus makes executable ---
 * These four were UNRUN through Wave 2 for one reason -- `literature/` was empty, and every one of
 * them is vacuously true over an empty tree. The tree now holds 168 files, so they can be measured,
 * and a row that can be measured and is not is the thing this runner exists to make visible. No
 * suite row is added here; four existing rows stop being claims and start being results.
 *
 * The regexes are RE-DECLARED here rather than imported from tools/verify_corpus.js, which checks
 * the same clauses. That is deliberate and it is this project's standing rule: `check_registers.js`
 * says it in its own header -- two instruments that must be able to disagree about what they read
 * do not get to share the function that decides it. If the runner imported the checker, the runner
 * could only ever confirm the checker. NAMING.md sec.2 is the authority both of them transcribe. */
const R_S = /^(?!fa[0-8]-)[a-z0-9]+(-[a-z0-9]+)*\.md$/;
const R_F = /^fa[0-8]-[a-z0-9]+(-[a-z0-9]+)*\.md$/;
const leaves = () => corpusFiles().map(p => path.basename(p));

B['NAM-1'] = () => {
  const L = leaves();
  if (!L.length) return VAC(`${TREE}/ holds 0 .md files; R_S over an empty shelf is vacuously true`);
  const bad = L.filter(l => !R_S.test(l));
  return bad.length ? FAIL(`${bad.length} of ${L.length} leaves fail R_S: ${bad.slice(0, 6).join(' ')}`)
    : PASS(`all ${L.length} leaves match R_S`);
};
B['NAM-2'] = () => {
  const L = leaves();
  if (!L.length) return VAC(`${TREE}/ holds 0 .md files; the R_F exclusion is vacuously true`);
  const bad = L.filter(l => R_F.test(l));
  return bad.length ? FAIL(`${bad.length} leaves match R_F, so a project verdict is shelved as a source: ${bad.join(' ')}`)
    : PASS(`0 of ${L.length} leaves match R_F`);
};
B['NAM-10'] = () => {
  const L = leaves();
  if (!L.length) return VAC(`${TREE}/ holds 0 .md files; the numeric-suffix rule has nothing to test`);
  const bad = L.filter(l => /-\d\.md$/.test(l));
  return bad.length ? FAIL(`${bad.length} leaves end in -<digit>, which the tokenizer cannot see: ${bad.join(' ')}`)
    : PASS(`0 of ${L.length} leaves end in -<digit>`);
};
B['PRV-1'] = () => {
  const fsx = corpusFiles();
  if (!fsx.length) return VAC(`${TREE}/ holds 0 .md files; provenance completeness over an empty shelf is vacuously true`);
  const bad = fsx.filter(p => !/^## Provenance\s*$/m.test(fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n')));
  return bad.length ? FAIL(`${bad.length} of ${fsx.length} files carry no ## Provenance block: ${bad.slice(0, 5).map(p => path.relative(ROOT, p).replace(/\\/g, '/')).join(' ')}`)
    : PASS(`all ${fsx.length} files carry a ## Provenance block`);
};

/* --- REG: register integrity, oracle/register_schema.md secs 3, 8, 9 -------
 * LIFTED, not re-derived, from The Space Resources Engineer's `cr_scratch/sre_w34_reg_assertions.js`
 * (W3-4). He wrote and ran these outside this file rather than editing another seat's artifact, and
 * routed them here. His falsifiers are kept: REG-2, REG-5 and REG-7 each fired on a mutated copy
 * under `--mutate`, which is the evidence that these eleven can go red.
 *
 * The group reported `18 rows 0 pass 0 fail 18 unrun` through Wave 2 because this file contained no
 * `REG-` string at all. Sub-step 2.15 wrote the assertions and nobody had ever run them.
 *
 * ELEVEN EXECUTE. SEVEN DEFER, each naming the artifact that has to exist first -- the Step 3
 * loader (3.8), the rebuilt retrieval layer (3.7), the classifier (3.8). A deferred row is still
 * UNRUN and still not a pass; what it stops being is anonymous. */
const REGS = ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv'];
let REGP = null;
function regs() {
  if (REGP) return REGP;
  const P = {};
  for (const r of REGS) {
    if (!fs.existsSync(R(r))) { P[r] = null; continue; }
    const H = [], A = [], M = [];
    fs.readFileSync(R(r), 'utf8').replace(/\r\n/g, '\n').split('\n').forEach((ln, i) => {
      if (!ln.length || ln.startsWith('#')) return;
      const f = ln.split('\t');
      if (f[0] === 'H') H.push({ f, n: i + 1 });
      else if (f[0] === 'A') A.push({ f, n: i + 1 });
      else if (f[0] === 'M') M.push({ f, n: i + 1 });
    });
    P[r] = { H, A, M, text: fs.readFileSync(R(r), 'utf8') };
  }
  return (REGP = P);
}
const regsPresent = () => REGS.every(r => regs()[r]);
function leafIndex() {
  const m = new Map();
  for (const p of corpusFiles()) { const l = path.basename(p); if (!m.has(l)) m.set(l, []); m.get(l).push(p); }
  return m;
}
const regGuard = fn => () => {
  if (!regsPresent()) return VAC(`one or both of ${REGS.join(', ')} does not exist; the assertion has no subject`);
  if (!corpusFiles().length) return VAC(`${TREE}/ holds 0 .md files; a register/corpus join over an empty shelf is vacuously true`);
  return fn();
};

B['REG-2'] = regGuard(() => {                       // SET-1 / L0: exactly one H row, and it is first
  const bad = [];
  for (const r of REGS) {
    const H = regs()[r].H;
    if (H.length !== 1) bad.push(`${r}: ${H.length} H rows`);
    else if (H[0].n !== 1) bad.push(`${r}: H row at line ${H[0].n}, not first`);
  }
  return bad.length ? FAIL(bad.join('; ')) : PASS(`${REGS.length} files, 1 H row each, each the first row`);
});
B['REG-3'] = regGuard(() => {                       // SET-2 / L1b: axis ids unique across the set
  const seen = new Map(), dup = [];
  for (const r of REGS) for (const a of regs()[r].A) {
    if (seen.has(a.f[1])) dup.push(`${a.f[1]} in ${seen.get(a.f[1])} and ${r}`); else seen.set(a.f[1], r);
  }
  return dup.length ? FAIL(dup.join('; ')) : PASS(`${REGS.length} files, ${seen.size} A rows, ${seen.size} distinct axis ids`);
});
B['REG-5'] = regGuard(() => {                       // L2: the self-declared size
  const bad = [], say = [];
  for (const r of REGS) {
    const { H, A, M } = regs()[r];
    say.push(`${path.basename(r)} ${A.length}/${M.length}`);
    if (String(A.length) !== H[0].f[4] || String(M.length) !== H[0].f[5])
      bad.push(`${r}: header says ${H[0].f[4]}/${H[0].f[5]}, parsed ${A.length}/${M.length}`);
  }
  return bad.length ? FAIL(bad.join('; ')) : PASS(`parsed == declared: ${say.join(', ')}`);
});
B['REG-7'] = regGuard(() => {                       // L4: every member leaf resolves
  const idx = leafIndex(), bad = [], distinct = new Set();
  let n = 0;
  for (const r of REGS) for (const m of regs()[r].M) { n++; distinct.add(m.f[3]); if (!idx.has(m.f[3])) bad.push(`${r} ${m.f[1]} ${m.f[3]}`); }
  return bad.length ? FAIL(`${bad.length} unresolved: ${bad.slice(0, 5).join('; ')}`)
    : PASS(`${n} member rows, ${distinct.size} distinct leaves, all resolve under ${TREE}/`);
});
B['REG-8'] = regGuard(() => {                       // L4 resolution is UNIQUE
  const idx = leafIndex(), bad = [], slash = [];
  for (const r of REGS) for (const m of regs()[r].M) {
    if (m.f[3].includes('/')) slash.push(`${r} ${m.f[3]}`);
    const ps = idx.get(m.f[3]); if (ps && ps.length > 1) bad.push(`${m.f[3]} -> ${ps.length} files`);
  }
  return (bad.length || slash.length) ? FAIL([...bad, ...slash].join('; '))
    : PASS(`${corpusFiles().length} .md under ${TREE}/, ${idx.size} distinct leaves; 0 member rows contain a "/"`);
});
B['REG-10'] = regGuard(() => {                      // the basis_root rebind is two edits, not 134
  const bad = [];
  for (const r of REGS) {
    const P = regs()[r];
    if (P.H[0].f[1] !== 'literature') bad.push(`${r}: basis_root is ${P.H[0].f[1]}`);
    if (P.text.includes('lsei/literature/')) bad.push(`${r}: contains the string lsei/literature/`);
    if (P.text.includes('_intake/')) bad.push(`${r}: contains the string _intake/`);
    for (const m of P.M) if (m.f[3].includes('/')) bad.push(`${r}: member row rewritten to a path`);
  }
  return bad.length ? FAIL(bad.join('; '))
    : PASS('both basis_root == literature; neither file names lsei/literature/ or _intake/; 0 member rows carry a path');
});
B['REG-11'] = regGuard(() => {                      // basis_ref resolves in the tree holding basis_root
  const bad = [], say = [];
  for (const r of REGS) {
    const ref = regs()[r].H[0].f[3];
    if (ref === 'none') { say.push(`${path.basename(r)} none (permitted by 3.1)`); continue; }
    const t = sh(`git cat-file -t ${ref}`);
    if (t.code !== 0) { bad.push(`${r}: ${ref} does not resolve in this repository`); continue; }
    const n = sh(`git ls-tree -r --name-only ${ref} -- literature`).out.trim().split('\n').filter(Boolean).length;
    if (!n) bad.push(`${r}: ${ref} tracks 0 files under literature/`);
    else say.push(`${path.basename(r)} ${ref} tracks ${n} files under literature/`);
  }
  return bad.length ? FAIL(bad.join('; ')) : PASS(say.join(', '));
});
B['REG-12'] = regGuard(() => {                      // L5: side arity by class
  const bad = [], say = [];
  for (const r of REGS) {
    const cls = new Map(regs()[r].A.map(a => [a.f[1], a.f[2]]));
    const sd = new Map();
    for (const m of regs()[r].M) { if (!sd.has(m.f[1])) sd.set(m.f[1], new Set()); sd.get(m.f[1]).add(m.f[2]); }
    for (const [id, c] of cls) {
      const n = (sd.get(id) || new Set()).size;
      if (!['two_sided', 'false_pair', 'one_sided'].includes(c)) bad.push(`${id}: class ${c} outside the closed set`);
      if ((c === 'one_sided' && n !== 1) || (c !== 'one_sided' && n < 2)) bad.push(`${id} class ${c} has ${n} distinct sides`);
    }
    say.push(`${path.basename(r)} ${[...cls.values()].filter(c => c !== 'one_sided').length} contested / ${[...cls.values()].filter(c => c === 'one_sided').length} one_sided`);
  }
  return bad.length ? FAIL(bad.join('; '))
    : PASS(`${say.join(', ')}; every contested axis has >= 2 sides, every one_sided axis exactly 1`);
});
B['REG-13'] = regGuard(() => {                      // B4: the in-file block round-trips BOTH ways
  const want = new Map();
  for (const r of REGS) for (const m of regs()[r].M) { if (!want.has(m.f[3])) want.set(m.f[3], new Set()); want.get(m.f[3]).add(`${m.f[1]} ${m.f[2]}`); }
  const bad = [], files = corpusFiles();
  for (const f of files) {
    const leaf = path.basename(f), t = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
    const mm = t.match(/\n## Contested\n([\s\S]*?)(?=\n## |$)/);
    const have = new Set(mm ? (mm[1].match(/^- [A-Z]{3}-[0-9]{2} [A-Z]$/gm) || []).map(s => s.slice(2)) : []);
    const w = want.get(leaf) || new Set();
    if (mm && !w.size) { bad.push(`${leaf}: block with no M rows`); continue; }
    if (!mm && w.size) { bad.push(`${leaf}: M rows with no block`); continue; }
    const miss = [...w].filter(x => !have.has(x)), extra = [...have].filter(x => !w.has(x));
    if (miss.length || extra.length) bad.push(`${leaf}: block-missing[${miss}] block-extra[${extra}]`);
  }
  return bad.length ? FAIL(`${bad.length}: ${bad.slice(0, 4).join('; ')}`)
    : PASS(`${want.size} member leaves; block set == M-row set in both directions across all ${files.length} summaries`);
});
B['REG-14'] = regGuard(() => {                      // the block grammar is minimal
  const bad = []; let n = 0;
  for (const f of corpusFiles()) {
    const t = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
    const i = t.indexOf('\n## Contested\n'); if (i < 0) continue; n++;
    let body = t.slice(i + 1); const j = body.indexOf('\n## ', 1); if (j > 0) body = body.slice(0, j);
    for (const l of body.split('\n').slice(1).filter(x => x.length))
      if (!/^- [A-Z]{3}-[0-9]{2} [A-Z]$/.test(l)) bad.push(`${path.basename(f)}: ${JSON.stringify(l)}`);
  }
  if (!n) return VAC('0 files carry a ## Contested block; the grammar has nothing to constrain');
  return bad.length ? FAIL(bad.slice(0, 4).join('; '))
    : PASS(`${n} blocks; every line matches ^- (LCC|ECR)-dd [A-Z]$; no bold, backticks, paths, prose or keys`);
});
B['REG-15'] = regGuard(() => {                      // the block is generated, never hand-written
  /* Regenerate-and-diff, the M6 shape one artifact over. The generator lives in the authoring
   * seat's scratch file; if it is not there this row DEFERS rather than passing, because "the
   * generator is missing" is not evidence that the blocks are generated. */
  const gen = 'cr_scratch/sre_w34_blocks.js';
  if (!fs.existsSync(R(gen))) return DEFER(`the generator ${gen} is not in this tree, so regenerate-and-diff cannot run; its absence is not evidence the blocks round-trip. Owner: The Space Resources Engineer`);
  const r = sh(`node ${gen} --check`);
  const line = (r.out || '').trim().split('\n').pop();
  const clean = /would-rewrite 0/.test(r.out) && !/WOULD REWRITE|ORPHAN BLOCK/.test(r.out);
  return clean ? PASS(`regenerate-and-diff: ${line}`) : FAIL(`regenerate-and-diff reports drift: ${line}`);
});

/* The seven whose subject does not exist yet. Reasons are his, verbatim, because the reason is the
 * deliverable here: a deferral with no named blocker is an excuse. */
const REG_DEFER = {
  'REG-1': 'the loader that takes a list of register paths is Step 3 (3.8); on disk today the assertion reduces to "there is no oracle/REGISTER.tsv", which holds',
  'REG-4': 'per-file-against-both comparison needs the loader; the sub-assertion it rests on is measured here as REG-7 (0 unresolved per file, both roots literature)',
  'REG-6': 'a census-reconciliation rule over Step 2 deliverables, not an artifact assertion; discharged for that deliverable by quoting the H row on every count line',
  'REG-9': 'the refusal path is the Step 3 classifier (3.8); nothing on disk emits axis-incomplete yet',
  /* BLOCKERS RE-VERIFIED AT 8.5, and the old ones were stale. Both read "rebuilt at 3.7", a sub-step
   * that closed three waves ago; a deferral whose blocker has expired is a row nobody rechecks,
   * which is the same defect as a status cell nobody runs. Re-measured: `grep -n "excis\|Contested"
   * oracle/retrieval/*.js oracle/router/*.js` returns 0 lines. The excision was not built at 3.7 and
   * has not been built since, so the subject is genuinely absent and the rows survive unbound. */
  'REG-16': 'the excision does not exist: 0 matches for /excis|Contested/ across oracle/retrieval/*.js and oracle/router/*.js as of 2026-08-29. Retrieval tokenizes the whole file including the in-file block. Owner: the retrieval seat. Close: an excision step in oracle/retrieval/literature_search.js, at which point this row binds against it',
  'REG-17': 'same absent subject as REG-16, one level up: whether the excision is a REQUIREMENT on retrieval or a convention cannot be asserted while no excision exists to carry either status. Owner and close as REG-16',
  'REG-18': 'the misclassification detector is built at 3.8',
};
for (const id of Object.keys(REG_DEFER)) B[id] = () => DEFER(REG_DEFER[id]);

/* --- the merge plan ------------------------------------------------------- */
B['MRG-1'] = () => {
  const p = plan(); if (p.missing) return FAIL('cr_scratch/merge_plan.tsv does not exist');
  const badWidth = p.rows.filter(r => r._n !== p.head.length).length;
  const hRow = p.rows.some(r => Object.values(r)[0] === 'H');
  const parts = [`${p.head.length}-column header, ${p.rows.length} data rows, ${badWidth} width mismatches`];
  if (badWidth) return FAIL(parts + '; rows disagree with the header');
  return hRow ? PASS(parts + '; H row present')
    : FAIL(parts + '; NO `^H` row -- the size declaration is in a COMMENT and a comment is parsed by nothing');
};
B['MRG-2'] = () => {
  const p = plan(); if (p.missing) return FAIL('no plan table');
  const blank = p.rows.filter(r => !r.disposition || r.disposition === '-').length;
  const set = [...new Set(p.rows.map(r => r.disposition))];
  const legend = /^H\t/m.test(fs.readFileSync(R('cr_scratch/merge_plan.tsv'), 'utf8'));
  if (blank) return FAIL(`${blank} rows with a blank or '-' disposition`);
  return legend ? PASS(`${set.length} dispositions, 0 blanks, legend in an H row`)
    : FAIL(`${set.length} dispositions, 0 blanks, but the closed set is declared in a COMMENT, not in a legend a checker reads: ${set.join(' ')}`);
};
B['MRG-3'] = () => {
  const p = plan(); if (p.missing) return FAIL('no plan table');
  const keys = new Set(p.rows.map(r => r.key));
  return keys.size === p.rows.length ? PASS(`${p.rows.length} rows, ${keys.size} distinct keys, bijective on the table side`)
    : FAIL(`${p.rows.length} rows but ${keys.size} distinct keys`);
};
/* MRG-4, rewritten under The Manager's 2026-08-28 ruling. See corpus_suite.md sec.7.1. */
B['MRG-4'] = () => {
  const p = plan(); if (p.missing) return FAIL('no plan table');
  const bsCol = p.head.includes('byte_source') ? 'byte_source' : (p.head.includes('primary_secondary') ? 'primary_secondary' : null);
  if (!bsCol) return FAIL('the table has neither a byte_source nor a primary_secondary column');
  const hasPP = p.head.includes('pair_primary');
  const members = p.rows.filter(r => r.pair_role === 'dup-member');
  if (!members.length) return VAC('0 rows with pair_role=dup-member');
  const bad = [];
  for (const r of members) {
    if (!BYTE_SOURCE.includes(r[bsCol])) bad.push(`${r.key}: ${bsCol}="${r[bsCol]}" outside the closed five`);
    if (r.source_path && !fs.existsSync(R(r.source_path))) bad.push(`${r.key}: source_path does not exist on disk`);
    if (hasPP && !PAIR_PRIMARY.includes(r.pair_primary)) bad.push(`${r.key}: pair_primary="${r.pair_primary}" outside {primary,secondary,unadjudicated}`);
  }
  // (iii) no pair group is half-adjudicated.
  const groups = new Map();
  for (const r of members) { if (!groups.has(r.pair_id)) groups.set(r.pair_id, []); groups.get(r.pair_id).push(r); }
  let half = 0;
  if (hasPP) for (const [id, g] of groups) {
    const states = new Set(g.map(r => r.pair_primary));
    if (states.has('unadjudicated') && (states.has('primary') || states.has('secondary'))) { half++; bad.push(`${id}: HALF-ADJUDICATED`); }
  }
  const shape = `${members.length} members, ${groups.size} groups, ${half} half-adjudicated`;
  if (!hasPP) return FAIL(`${shape}; column pair_primary DOES NOT EXIST -- a merge gate cannot read a field that is added after the merge. Owner: The Engineer, W2-1`);
  return bad.length ? FAIL(`${shape}; ${bad.length} findings: ${bad.slice(0, 6).join(' ; ')}`) : PASS(shape);
};
/* MRG-4b: the landed BODY is the byte_source body, under DECLARED operations and no others.
 *
 * The merge APPENDS a `## Provenance` block to every landed file -- it must, because PRV-1, PRV-2
 * and PRV-17 require one in every file and the source copies do not carry it. So "landed is
 * byte-identical to byte_source" is unsatisfiable as literally ruled: it is false for all 176 rows,
 * not for one. The satisfiable form of the same assertion is BODY-identity: strip the appended
 * block and the remainder must equal the source exactly.
 *
 * GENERALIZED at 8.x by W5-10, and this is the substance of the change. For four waves this row was
 * argued rather than fixed, on the ground that body edits were declared in prose and the checker had
 * "no general mechanism to recognize a declaration". That was true of the checker and FALSE of the
 * project: the corpus has carried a machine-readable declaration form since 2.6. It is a
 * `- **Body edit ...:**` line inside the file's own provenance block, and it ends with a closed
 * clause -- "It equals that copy under exactly the operations named here and no others -- `op`,
 * `op`." 154 of 169 files carry one. A checker that cannot read the declaration form its own
 * project uses is a broken checker, so the recognition gap is closed here rather than argued again.
 *
 * THE MECHANISM IS NOT A RUBBER STAMP, and that distinction is the whole design. A declaration is
 * not believed; it is CONSUMED. Each named operation is a function that removes from the diff
 * exactly the lines its own declaration says it wrote, and fails if that shape is not there. What
 * survives the consumers is the residual, and a non-empty residual is an UNDECLARED body edit no
 * matter how much prose sits above it. Three ways to stay red follow from that and none of them can
 * be talked past: an edit with no operation naming it, an operation named that did not happen, and
 * an operation token outside the closed set.
 *
 * The provenance block is now located by the same rule `tools/verify_corpus.js` uses -- prefer the
 * explicitly labelled `## Provenance (merge)` heading, fall back to the last plain one. The old
 * `lastIndexOf('\n\n---\n\n## Provenance\n')` missed the labelled form and reported 14 files as
 * carrying no provenance block at all. They carry one; the checker could not see it.
 *
 * The hardcoded `azami` exception is RETIRED, not widened. A checker with one file's name in it is
 * a checker that needs editing every time the corpus does. Azami is now measured by the same
 * mechanism as everything else, and it is RED under it: its DOI repair is described in a `- **Note:**
 * CITATION REPAIR` line and is NOT named in its `Body edit` operation clause, so nothing declares
 * it in the form the project's own 154 other files use. That is a finding, not a regression.
 *
 * Line-ending normalization is still counted and reported SEPARATELY, never folded into the content
 * comparison. CRP-11 is the same rule one group over: a CRLF diff read as a content disagreement is
 * a defect this repository has already produced once. */
const PROV_HEAD = /^## Provenance( \(merge\))?[ \t]*$/;
/* Split a landed file into { body, block }. Returns null when no appended block is present, which
 * is PRV-1's failure and is reported as itself rather than as a body edit. */
function splitProvenance(t) {
  const L = t.split('\n');
  let labelled = -1, lastPlain = -1;
  for (let i = 0; i < L.length; i++) {
    const m = L[i].match(PROV_HEAD);
    if (!m) continue;
    if (m[1]) labelled = i; else lastPlain = i;
  }
  const h = labelled >= 0 ? labelled : lastPlain;
  if (h < 0) return null;
  let i = h;                                   // walk back over the `\n\n---\n\n` the merge writes
  if (i - 1 >= 0 && L[i - 1] === '') i--;
  if (i - 1 >= 0 && L[i - 1] === '---') i--; else return null;
  if (i - 1 >= 0 && L[i - 1] === '') i--;
  return { body: L.slice(0, i).join('\n'), block: L.slice(h) };
}
/* The declaration reader. Ops come only from the closed trailing clause, never from free prose. */
function bodyEditDeclaration(blockLines) {
  const ops = new Set(); let present = false, selfDeclaredResidual = false;
  for (const l of blockLines) {
    if (!/^- \*\*Body edit/.test(l)) continue;
    present = true;
    if (/does NOT restore it/i.test(l)) selfDeclaredResidual = true;
    const m = l.match(/and no others? — (.+?)\.\s*$/);
    if (m) for (const tok of m[1].match(/`[a-z0-9-]+`/g) || []) ops.add(tok.replace(/`/g, ''));
  }
  return { ops: [...ops], present, selfDeclaredResidual };
}
/* The closed operation set. Each entry CONSUMES its own lines from the residual and returns false
 * when the change it names is not present -- a declared operation that did not happen is red, which
 * is MRG-4b's own Mutation 2 generalized off azami and onto every operation. */
const BODY_OPS = {
  'insert-metadata': d => {                    // a `## Metadata` heading and the one line under it
    const i = d.added.findIndex(l => /^## Metadata\s*$/.test(l));
    if (i < 0 || i + 1 >= d.added.length || /^#/.test(d.added[i + 1])) return false;
    d.added.splice(i, 2); return true;
  },
  'drop-cts-marker': d => {                    // the `## Comprehensive Technical Summary` marker line
    const i = d.removed.findIndex(l => /^## Comprehensive Technical Summary\s*$/.test(l));
    if (i < 0) return false;
    d.removed.splice(i, 1); return true;
  },
  'declare-source-file': d => {                // one `Source file:` line, sub-step 8.9
    const i = d.added.findIndex(l => /^`?Source file:/.test(l.trim()));
    if (i < 0) return false;
    d.added.splice(i, 1); return true;
  },
  'normalize-eol-to-lf': () => true,           // counted before the diff; never a content op
};
const nz = s => s.replace(/\r\n/g, '\n').replace(/\s+$/, '');
/* Line diff by LCS. The old form used `filter(l => !other.includes(l))`, which reports a line that
 * merely MOVED as both an addition and a removal and cannot see a duplicated line at all. */
function lineDiff(A, Bv) {
  const n = A.length, m = Bv.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    dp[i][j] = A[i] === Bv[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const added = [], removed = []; let i = 0, j = 0;
  while (i < n && j < m) {
    if (A[i] === Bv[j]) { i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) removed.push(A[i++]);
    else added.push(Bv[j++]);
  }
  while (i < n) removed.push(A[i++]);
  while (j < m) added.push(Bv[j++]);
  return { added: added.filter(x => x.trim() !== ''), removed: removed.filter(x => x.trim() !== '') };
}
/* Residual classes, so 44 findings arrive as four pieces of work rather than as one wall. */
function residualClass(d, decl) {
  if (decl.selfDeclaredResidual) return 'self-declared-residual';
  if (!decl.present && d.added.some(l => /^(Licence:|- \*\*Publisher \/ copyright line)/.test(l.trim()))) return 'licence-and-copyright-pass';
  if (!d.removed.length && d.added.length === 1 && /^`?Source file:/.test(d.added[0].trim())) return 'undeclared-source-file-line';
  return 'other';
}
B['MRG-4b'] = () => {
  const p = plan(); if (p.missing) return FAIL('no plan table');
  // target_path is written as `literature/<folder>/<leaf>`; --tree rebases it onto a staged copy so
  // the assertion can gate the promotion instead of reporting after it.
  const at = r => R(TREE === 'literature' ? r.target_path
    : r.target_path.replace(/^literature\//, TREE.replace(/\/+$/, '') + '/'));
  const landed = p.rows.filter(r => r.target_path && fs.existsSync(at(r)));
  if (!landed.length) return VAC(`0 of ${p.rows.length} target_paths exist under ${TREE}/; nothing has landed there and byte-identity has nothing to compare`);
  const bad = [], notSeen = [], unknown = [], unverifiable = [], cls = new Map();
  let clean = 0, verified = 0, eol = 0, noBlock = 0;
  for (const r of landed) {
    /* UNVERIFIABLE is its own count, and it is still a failure. A fresh clone does not carry
     * `_intake/`, so 24 rows have no byte_source to compare against there and 0 do here. Folding
     * those into UNDECLARED reported a missing input as a body edit somebody made, which is a
     * different accusation against a different person; dropping them would be a vacuous pass. */
    if (!r.source_path || !fs.existsSync(R(r.source_path))) { unverifiable.push(`${r.key}: source_path ${r.source_path ? `\`${r.source_path}\` is not on disk` : 'is empty'}`); continue; }
    const a = fs.readFileSync(R(r.source_path), 'utf8'), t = fs.readFileSync(at(r), 'utf8');
    const sp = splitProvenance(t);
    if (!sp) { noBlock++; bad.push(`${r.key}: no appended ## Provenance block -- PRV-1`); continue; }
    if (sp.body === a) { clean++; continue; }
    const decl = bodyEditDeclaration(sp.block);
    for (const o of decl.ops) if (!BODY_OPS[o]) unknown.push(`${r.key}: \`${o}\` is not in the closed operation set`);
    if (/\r\n/.test(a) !== /\r\n/.test(sp.body)) eol++;   // reported, never folded into content
    const A = nz(a).split('\n'), Bv = nz(sp.body).split('\n');
    if (A.join('\n') === Bv.join('\n')) { clean++; continue; }
    const d = lineDiff(A, Bv);
    for (const o of decl.ops) { if (!BODY_OPS[o]) continue; if (!BODY_OPS[o](d)) notSeen.push(`${r.key}: declares \`${o}\` and no such change is present`); }
    if (!d.added.length && !d.removed.length) { clean++; verified++; continue; }
    const c = residualClass(d, decl);
    cls.set(c, (cls.get(c) || 0) + 1);
    bad.push(`${r.key} [${c}]: UNDECLARED body edit, +${d.added.length}/-${d.removed.length} lines` +
      (decl.present ? '' : ' (no Body edit line at all)') +
      (d.added.length ? ` e.g. +${JSON.stringify(d.added[0].slice(0, 56))}` : '') +
      (d.removed.length ? ` -${JSON.stringify(d.removed[0].slice(0, 56))}` : ''));
  }
  const shape = `${landed.length} landed under ${TREE}/; ${clean} bodies reduce to byte_source ` +
    `(${verified} of them under a DECLARED operation, verified by consuming it, not by believing it; ` +
    `${eol} carried a line-ending normalization, reported not folded in; ${unverifiable.length} UNVERIFIABLE, ` +
    `their byte_source not on disk -- 0 here and 24 in a fresh clone, which does not carry \`_intake/\`)`;
  const tail = [...cls].map(([k, v]) => `${v} ${k}`).join(', ');
  if (unknown.length) return FAIL(`${shape}; ${unknown.length} operation token(s) OUTSIDE THE CLOSED SET, which is a declaration nobody defined: ${unknown.slice(0, 3).join(' ; ')}`);
  if (notSeen.length) return FAIL(`${shape}; ${notSeen.length} DECLARED-BUT-ABSENT: ${notSeen.slice(0, 3).join(' ; ')}`);
  if (bad.length) return FAIL(`${shape}; ${bad.length} UNDECLARED in ${cls.size} class(es) [${tail}]: ${bad.slice(0, 4).join(' ; ')}`);
  if (unverifiable.length) return FAIL(`${shape}; 0 undeclared, but ${unverifiable.length} row(s) could not be checked at all: ${unverifiable.slice(0, 3).join(' ; ')}`);
  return PASS(`${shape}; 0 undeclared, 0 unverifiable`);
};
B['MRG-6'] = () => {
  const p = plan(); if (p.missing) return FAIL('no plan table');
  // The `H` row is the table's self-declaration, not a merge row; row-level assertions
  // exclude it, as MANIFEST.tsv's own H row is excluded from its row assertions.
  const D = p.rows.filter(r => r.block !== 'H');
  const bad = D.filter(r => r.target_path !== 'literature/' + r.target_folder + '/' + r.key);
  return bad.length ? FAIL(`${bad.length} rows where target_path disagrees with target_folder: ${bad.slice(0, 3).map(r => r.key).join(' ')}`)
    : PASS(`0 of ${D.length} D rows where target_path disagrees with target_folder`);
};
/* MRG-9 / MRG-10, RE-GROUNDED at 8.x by W5-10. Read sec.7.1 of corpus_suite.md before touching this.
 *
 * These two were written in Wave 1 as a MERGE GATE -- "on the table, before anything moves" -- and
 * the merge moved at 2.5. A gate that runs after the thing it gates is a post-mortem, and this one
 * was a post-mortem on the wrong body: it scored `cr_scratch/merge_plan.tsv`, which is an
 * append-only planning record, not the corpus. Two consequences, both measured:
 *
 *   - SEVEN of the eight collisions it reported are rows the plan itself says NEVER LAND. They are
 *     `pair_primary=secondary`, the losing half of a same-source pair; the table's own header says
 *     "THE SECONDARY DOES NOT LAND", and all seven target_paths are absent from disk. A collision
 *     between a file and a file that does not exist is not a collision in the corpus.
 *   - ONE shelf file, `growth-theory/denison-1972-classification-of-sources-of-growth.md`, has no
 *     plan row at all, so the plan-scoped form was BLIND to it and to anything else landing later.
 *
 * So the population is now the SHELF, walked from disk, and the key is read from each file's own
 * `- **Dedup key:**` line rather than from a plan cell. That is strictly harder to evade than the
 * old form -- it cannot be silenced by editing a TSV field, it covers 169 files where the plan
 * covered 168, and it keeps measuring after the plan stops being written to. It is not a loosening:
 * the assertion, "no two documents in the corpus carry one dedup_key", is the same sentence.
 *
 * WHAT WAS CONSIDERED AND REFUSED. `NAMING.md` sec.7 says a level-3 match is "a candidate duplicate,
 * never a confirmed" one, so an L3 collision could be demoted to a report -- and that would take
 * both rows green today, because the one surviving collision is L3. It is refused. The harm MRG-9
 * names is that two documents become indistinguishable to anything keyed on dedup_key, and that
 * harm does not care whether the two are the same source. Demoting the only finding to a footnote
 * would be making the row green by weakening what it asserts, which is the move this suite has
 * caught five times. The finding stays red and the ADJUDICATION is written into the report instead.
 *
 * The plan is still read, and its collisions among non-landing rows are reported SEPARATELY and
 * never folded into the verdict -- MRG-4b's rule for line endings, one row over. A plan-only
 * collision is a fact about the planning record; a shelf collision is a defect in the corpus. */
function shelfKeys() {
  const dir = R(TREE);
  if (!fs.existsSync(dir)) return { missing: `${TREE}/ does not exist` };
  const files = walk(dir).filter(p => /\.md$/i.test(p));
  const out = [], noKey = [];
  for (const abs of files) {
    const rel = path.relative(R(TREE), abs).replace(/\\/g, '/');
    if (rel.indexOf('/') < 0) continue;                     // top-level README/TSV siblings, not summaries
    const m = fs.readFileSync(abs, 'utf8').match(/^- \*\*Dedup key:\*\*\s*(\S+)/m);
    if (!m) { noKey.push(rel); continue; }
    out.push({ rel, folder: rel.slice(0, rel.indexOf('/')), key: m[1] });
  }
  return { files: out, noKey, n: files.length };
}
/* Plan-side collisions among rows that DID NOT land. Reported, never folded in. */
function planOnlyCollisions() {
  const p = plan(); if (p.missing) return null;
  const seen = new Map(), bad = new Set();
  for (const r of p.rows) {
    if (!r.dedup_key || /^L0/.test(r.dedup_key)) continue;
    if (seen.has(r.dedup_key)) bad.add(r.dedup_key); else seen.set(r.dedup_key, r.key);
  }
  const landed = new Set(p.rows.filter(r => r.target_path && fs.existsSync(R(r.target_path))).map(r => r.dedup_key));
  return [...bad].filter(k => p.rows.filter(r => r.dedup_key === k && landed.has(k) && fs.existsSync(R(r.target_path))).length < 2);
}
function dedupRow(scopeFn, label) {
  const s = shelfKeys();
  if (s.missing) return FAIL(s.missing);
  if (!s.files.length) return VAC(`0 files with a \`- **Dedup key:**\` line under ${TREE}/; nothing carries a key and collision has nothing to compare`);
  const seen = new Map(), hit = new Map();
  for (const f of s.files) {
    if (/^L0/.test(f.key)) continue;
    const k = scopeFn(f);
    if (seen.has(k)) { if (!hit.has(k)) hit.set(k, [seen.get(k)]); hit.get(k).push(f); }
    else seen.set(k, f);
  }
  const po = planOnlyCollisions();
  const aside = `; ${s.noKey.length} file(s) carry no Dedup key line${po === null ? '' : `; ${po.length} plan-only collision(s) among rows the plan says do not land, reported not folded in`}`;
  if (!hit.size) return PASS(`0 ${label} dedup_key collisions across ${s.files.length} shelf files${aside}`);
  const found = [...hit].map(([k, g]) => `${k} => ${g.map(x => x.rel).join(' , ')}`);
  return FAIL(`${hit.size} ${label} dedup_key collision(s) across ${s.files.length} shelf files${aside}: ${found.slice(0, 3).join(' ;; ')}`);
}
B['MRG-9'] = () => dedupRow(f => f.folder + '::' + f.key, 'within-folder');
B['MRG-10'] = () => dedupRow(f => f.key, 'tree-wide');
B['MRG-11'] = () => {
  const p = plan(); if (p.missing) return FAIL('no plan table');
  const bumped = p.rows.filter(r => Number(r.rev) > 1);
  const noBasis = bumped.filter(r => !r.basis);
  return noBasis.length ? FAIL(`${bumped.length} rows with rev>1, ${noBasis.length} with an empty basis: ${noBasis.map(r => r.key).join(' ')}`)
    : PASS(`${bumped.length} rows with rev>1, 0 with an empty basis`);
};

/* --- the instruments themselves ------------------------------------------ */
/* CNT-x: every instrument under tools/ is TEXT to git. See sec.5 of the deliverable. */
B['CNT-12'] = () => {
  const files = walk(R('tools')).filter(p => /\.(js|sh|py)$/.test(p) || /githooks[\\/]/.test(p));
  const bad = [];
  for (const p of files) {
    const d = fs.readFileSync(p);
    const window = d.subarray(0, 8000);
    if (window.includes(0)) bad.push(path.relative(ROOT, p).replace(/\\/g, '/'));
  }
  return bad.length ? FAIL(`${bad.length} of ${files.length} instruments carry a NUL inside git's 8000-byte window and are BINARY to git -- no reviewable diff: ${bad.join(' ')}`)
    : PASS(`all ${files.length} instruments under tools/ are text to git`);
};

/* --- the slots ------------------------------------------------------------ */
B['SLT-1'] = (s) => {
  const need = ['SLOT-A', 'SLOT-B', 'SLOT-C', 'SLOT-D'];
  const miss = need.filter(x => !new RegExp('\\*\\*' + x + ' / 2\\.').test(s.text));
  return miss.length ? FAIL(`slots not declared in sec.11.1: ${miss.join(' ')}`) : PASS('all four slots declared by id with an owner and an opening condition');
};
B['SLT-2'] = (s) => {
  const cells = (s.text.match(/^\| \*\*SLOT-[A-D] \/ 2\.[0-9]+\*\*.*$/gm) || []);
  if (!cells.length) return FAIL('no slot rows found');
  const bad = cells.filter(c => !/(EMPTY|FILLED|DECLINED)/.test(c.split('|').slice(-2)[0]));
  return bad.length ? FAIL(`${bad.length} slot fill states outside {EMPTY, FILLED, DECLINED}`) : PASS(`${cells.length} slot fill states in the closed set`);
};

/* --- RFX: register fixtures, sub-step 4.1, MIGRATED AT SUB-STEP 8.1 -----------
 * THE ASSEMBLED LOOP EXISTS, so these run rather than defer. `oracle/router/classify.js` (3.8) and
 * `oracle/router/wave.js` (3.9) landed at Wave 4; the context is loaded ONCE and every RFX row
 * reads it, because thirty-five loads of a 169-file corpus is a runner nobody waits for.
 *
 * WHAT THESE ROWS USED TO ASSERT, AND WHY HALF OF IT IS GONE. Until 8.1 each row classified the
 * axis's own `probe_pos` and compared `q.verdict` against the axis's class -- `CONTESTED` for
 * `two_sided` and `false_pair`, `LITERATURE` or `BOTH` for `one_sided`. `classifyQuestion()` is
 * RETIRED: the router returns an evidence report and a composing session under
 * `oracle/answer_contract.md` rules the verdict. So THE VERDICT HALF OF EVERY ROW BELOW IS
 * DECLINED. It is not re-pointed at a weaker proxy for a verdict, and it is not faked by having
 * the suite pick a verdict and then assert it -- a fixture that chooses the answer it checks is
 * measuring the fixture. It is declined ONCE, here, rather than thirty-three times in thirty-three
 * messages that would all say the same thing.
 *
 * WHAT EACH ROW ASSERTS NOW. Three facts about ONE axis. Every one is a lookup or a set
 * membership; none is a score, a threshold or a ranking. All of them are read out of
 * `oracle/REGISTER.*.tsv` and `literature/INDEX.tsv` at run time, never copied into this file,
 * because a suite row carrying its own copy of a side count is the second authority this project
 * keeps finding.
 *
 *   1. SHAPE -- a lookup. The axis's side count against its class (`one_sided` exactly one, per
 *      contract section 1 rule L5; `two_sided`/`false_pair` at least two), and every member the
 *      register declares resolving to a path in `literature/INDEX.tsv`. `resolveSides()` survived
 *      8.1 unchanged in substance precisely because it is a lookup and not a score, which is why
 *      this half is still assertable at full strength.
 *
 *   2. REACHABILITY -- a set membership. The axis appears in the register channel's findings for
 *      its own `probe_pos`. This is the closest honest successor to the retired verdict assertion
 *      and it is weaker in exactly the way the architecture is now weaker on purpose: it says that
 *      at least one declared `match_key` survives tokenization of the question the axis's own
 *      author wrote to trigger it. It asserts NOTHING about mass, margin, rank or the retired mark
 *      K; those are printed as context and are not the assertion. It catches the K1 token-form
 *      class of defect -- a hyphenated or uppercase key that can never match, leaving the register
 *      row inert while every test stays green -- which is the failure worth one row per axis.
 *
 *      The four rows that went RED when the fixtures were first RUN (RFX-04/07/09/13: the axis did
 *      not reach K = 2.431 on its own `probe_pos`) are GREEN under this assertion. That is 8.1
 *      landing, not a test relaxed: the gate that filtered them out is gone and the near-miss is
 *      reported. LCC-07 still scores 0.968 against a mark of 2.431 on SRQ-12's shape and it is in
 *      the findings, which is the entire content of the sub-step.
 *
 *   3. ARITY, AS A CONDITIONAL. `selectWave()` takes the verdict as its first argument since 8.1,
 *      so the row states the conditional the register can still carry: IF a session rules
 *      CONTESTED on this axis, the wave spends one persona per DECLARED SIDE, never the literal
 *      two. Eighteen axes are class `two_sided` and seven declare three or four sides, so a `>= 2`
 *      assertion passes while a three-sided answer drops a measurement method and the machinery
 *      has chosen which one the reader hears. On a `one_sided` axis the same call must THROW:
 *      contract section 1 makes CONTESTED UNSATISFIABLE there rather than wrong, and
 *      `wave.assertDerived()` is where that is now enforced. That throw is what survives of "never
 *      `CONTESTED`" once no tool is choosing a verdict to compare against.
 *
 *      THE SUITE IS NOT A COMPOSING SESSION AND DOES NOT RULE. Naming CONTESTED here is the
 *      ANTECEDENT of an implication; the row fails on the consequent. Nothing below reads a
 *      verdict off a report, and `adviseQuestion()` asserts on every call that no report carries
 *      one.
 *
 * RFX-35 is the decoy that separates the two readings of the side rule, and it lives in
 * `oracle/tests/fault_inject.js` because it needs a mutated register. */
let LOOP = null;
function loop() {
  if (LOOP !== null) return LOOP;
  const need = ['oracle/router/classify.js', 'oracle/router/wave.js'];
  const missing = need.filter(f => !fs.existsSync(R(f)));
  if (missing.length) return (LOOP = { missing });
  try {
    const C = require(R('oracle/router/classify.js'));
    const W = require(R('oracle/router/wave.js'));
    const ctx = C.loadContext({});
    if (ctx.refuse) return (LOOP = { missing: ctx.refuse.missing || ['the context refused at load'] });
    return (LOOP = { C, W, ctx });
  } catch (e) { return (LOOP = { threw: e.message }); }
}
/* Axis order is the register's own: lunar first, then econ, in file order. RFX-nn maps to the
 * nn-th axis by that order, which is how the table was generated. */
function axisOrder() {
  const out = [];
  for (const r of REGS) {
    if (!regs()[r]) continue;
    for (const a of regs()[r].A) out.push(a.f[1]);
  }
  return out;
}
/* THE SHELF, PROBED TWICE, BECAUSE ON A FRESH CLONE THE TWO PROBES DISAGREE.
 *
 * MEASURED AT 8.8 in `cc/oracletest`, a fresh clone at `131f513` under OneDrive: `literature/` holds
 * 169 `.md` files, `statSync()` calls every one of them a file, and every one of them READS -- and
 * `fs.readdirSync(dir, {withFileTypes:true})` reports each as a SYMBOLIC LINK, so `Dirent.isFile()`
 * is false for all 169. `oracle/retrieval/literature_search.js` walks with `withFileTypes` and keeps
 * entries on `e.isFile()`, so on that clone it sees ZERO summaries and throws EMPTY POPULATION --
 * correctly, loudly, and against a corpus that is sitting on the disk fully readable. OneDrive's
 * Files-On-Demand placeholders are reparse points and that is what the dirent is reporting.
 *
 * That is a REAL DEFECT AND IT IS NOT THIS FILE'S. Owner: the retrieval seat, in the walk in
 * `oracle/retrieval/literature_search.js`. Close, and it is an observation not a date: the two
 * counts below agree on a clone under OneDrive -- reached by keeping `!e.isDirectory()` entries, or
 * by falling back to `statSync()` when `isFile()` is false.
 *
 * What it means HERE is that the RFX population on such a clone is empty through no fault of the
 * fixtures: every row resolves register members against `literature/INDEX.tsv` and reaches the shelf
 * through the retrieval channel. A population of zero is reported VACUOUS and counted UNRUN. It is
 * not thirty-five identical reds, and it is emphatically not a pass. The runner does not import the
 * thing it checks, so the walk below is local and deliberately mirrors the one under test.
 *
 * W5-11 CLOSED IT, AND THE GUARD STAYS, BECAUSE THE GUARD IS NOT ABOUT ONE WALK.
 *
 * `listCorpusFiles` now resolves through `tools/fswalk.js`, which asks the Dirent first and falls
 * back to `stat` -- not `lstat` -- whenever the Dirent reports anything but a plain file or a plain
 * directory. So the probe below no longer asks "does the Dirent lie about these files": it asks the
 * question that actually matters and always did, WHICH IS WHETHER THE RETRIEVAL LAYER CAN SEE THE
 * SHELF AT ALL. That question survives every future cause -- a corpus not cloned, a mispointed root,
 * a taxonomy folder behind a junction, whatever Windows does next -- and the old form only ever
 * survived one.
 *
 * Three counts, and they are three different instruments on purpose. `byWalk` mirrors the repaired
 * rule. `byDirent` mirrors the PRE-REPAIR rule and is kept as a DIAGNOSTIC: when the two disagree
 * the report can say the directory entries are lying and the repair is absorbing it, which is a fact
 * a reader on a strange machine wants and cannot otherwise get. `byStat` is the ground truth.
 * MEASURED W5-11: over a `literature/` whose nine taxonomy folders are reached through directory
 * junctions -- real reparse points, made without admin -- the pre-repair rule counts 0 and the
 * repaired rule counts 169. The guard fires on the first and is silent on the second.
 */
let SHELF = null;
function shelf() {
  if (SHELF) return SHELF;
  let byWalk = 0, byDirent = 0, byStat = 0;
  /* The pre-repair arm, kept whole so the diagnostic means something: it recurses on
     `e.isDirectory()` and keeps leaves on `e.isFile()`, exactly as the defect did. */
  (function old(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
    for (const e of entries) {
      if (e.isDirectory()) { old(path.join(dir, e.name)); continue; }
      if (e.isFile() && e.name.endsWith('.md')) byDirent++;
    }
  })(R('literature'));
  /* The repaired arm and the ground truth, walked together. */
  (function w(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (entryKind(e, p) === 'dir') { w(p); continue; }
      if (!e.name.endsWith('.md')) continue;
      byWalk++;
      try { if (fs.statSync(p).isFile()) byStat++; } catch (err) { /* unreadable: counted in neither */ }
    }
  })(R('literature'));
  return (SHELF = { byWalk, byDirent, byStat });
}
const shelfVacuous = () => {
  const s = shelf();
  if (s.byWalk > 0) return null;
  return VAC(`the retrieval layer can read 0 .md file(s) under literature/, of which statSync() ` +
    `can see ${s.byStat} and the pre-W5-11 Dirent rule could see ${s.byDirent}. Every RFX row ` +
    `reaches the shelf through oracle/retrieval/literature_search.js, so the population is empty ` +
    `and the fixture has no subject -- it is UNRUN, not thirty-five identical reds, and it is ` +
    `emphatically not a pass. ` +
    (s.byStat > 0
      ? `AND THE CORPUS IS NOT MISSING: statSync() reads ${s.byStat} files the walk did not ` +
        `return. That is a metadata failure, not an absent shelf -- a reparse point, a OneDrive ` +
        `Files-On-Demand placeholder, or a junction somewhere in the taxonomy. Owner: the ` +
        `retrieval seat. Close: tools/fswalk.js --selftest is green and byWalk equals byStat`
      : `statSync() cannot see any either, so the shelf is genuinely absent or the root is ` +
        `mispointed. Close: literature/ holds its 169 summaries and byWalk equals byStat`));
};
/* THE ORDER OF THESE FOUR CHECKS IS THE FINDING, W5-11, AND IT IS WHY W5-8's GUARD NEVER FIRED.
 *
 * The shelf probe used to run FOURTH, behind `loop()`. But `loop()` calls `classify.loadContext()`,
 * which reaches the shelf itself -- so a corpus the retrieval layer cannot see does not reach the
 * shelf probe at all: `loadContext` refuses or throws first, and all 35 rows come out as
 * `DEFERRED: the assembled loop is not loadable: the shelf at ...\literature. Owner: the router
 * seat`. MEASURED W5-11 by moving `literature/` aside in the fresh clone: that is verbatim what 35
 * rows said. The verdict UNRUN was right; the DIAGNOSIS AND THE OWNER WERE BOTH WRONG. A corpus
 * problem was being handed to the router seat with the corpus named in passing.
 *
 * So the shelf goes FIRST. It is the cheapest probe, it has no dependencies, and when it is the
 * cause it is the only one of the four that can say so. A genuine router fault still reaches the
 * DEFER below, because a router fault leaves the shelf walkable and the probe silent. */
const rfxGuard = fn => () => {
  const empty = shelfVacuous();
  if (empty) return empty;
  const L = loop();
  if (L.missing) return DEFER('the assembled loop is not loadable: ' + L.missing.join('; ') + '. Owner: the router seat (3.8/3.9)');
  if (L.threw) return DEFER('the router threw at load: ' + L.threw + '. Owner: the router seat');
  if (!regsPresent()) return VAC('one or both register files does not exist; the fixture has no subject');
  return fn(L);
};
for (let i = 1; i <= 33; i++) {
  const id = 'RFX-' + String(i).padStart(2, '0');
  B[id] = rfxGuard(L => {
    const order = axisOrder();
    const axisId = order[i - 1];
    if (!axisId) return FAIL(`${id} indexes axis ${i} of ${order.length}; the register shrank and the fixture set is stale`);
    const ax = L.ctx.axes.get(axisId);
    if (!ax) return FAIL(`${axisId} is not in the loaded context, though it is in the register file`);
    const sides = [...ax.sides.keys()];
    const members = [...ax.sides.values()].reduce((n, ms) => n + ms.length, 0);
    const bad = [];

    /* 1. SHAPE. A lookup against literature/INDEX.tsv, and the class's own side arity. */
    let sr;
    try { sr = L.C.resolveSides(L.ctx, ax); }
    catch (e) { return FAIL(`${axisId}: side resolution threw, which is the one failure that lookup exists to prevent -- ${e.message}`); }
    if (sr.unresolved.length)
      bad.push(`${sr.unresolved.length} of ${members} declared member(s) do not resolve against literature/INDEX.tsv: ${sr.unresolved.join(' ')}`);
    if (sr.declared !== sides.length)
      bad.push(`the register declares ${sides.length} side(s) and the resolution accounted for ${sr.declared}`);
    else if (!sr.unresolved.length && sr.resolved !== sr.declared)
      bad.push(`${sr.declared} side(s) declared, ${sr.resolved} resolved and nothing reported unresolved -- a side has gone missing without being named`);
    if (ax.class === 'one_sided' && sides.length !== 1)
      bad.push(`class one_sided declares ${sides.length} side(s); contract §1 rule L5 requires exactly one`);
    if (ax.class !== 'one_sided' && sides.length < 2)
      bad.push(`class ${ax.class} declares ${sides.length} side(s); a disagreement the register carries needs at least two`);

    /* 2. REACHABILITY. Set membership, not a score: does at least one declared match_key survive
       tokenization of the axis's own probe_pos, so the axis is reported at all. No threshold is
       involved -- since 8.1 every axis with one key hit is reported and nothing is filtered. */
    let rep;
    try { rep = L.C.adviseQuestion(L.ctx, ax.probe_pos); }
    catch (e) { return FAIL(`${axisId}: the evidence report threw on the axis's own probe_pos -- ${e.message}`); }
    let hit = null;
    for (const s of rep.sub_claims) {
      const f = s.register.findings.find(x => x.axis_id === axisId);
      if (f) { hit = f; break; }
    }
    if (!hit)
      bad.push(`the axis does NOT appear in the register findings for its OWN probe_pos: not one of its ` +
        `${ax.match_keys.length} declared match key(s) [${ax.match_keys.join(' ')}] survives tokenization of ` +
        `"${String(ax.probe_pos).slice(0, 60)}". No threshold removed it -- since 8.1 every axis with a ` +
        `single key hit is reported -- so the keys and the probe the same author wrote do not meet`);

    /* 3. ARITY, AS A CONDITIONAL. The suite names CONTESTED as the antecedent of an implication and
       rules nothing; selectWave() takes the verdict as an argument since 8.1. */
    const view = L.C.axisView(ax);
    let arity = '';
    if (ax.class === 'one_sided') {
      let threw = null, got = null;
      try { got = L.W.selectWave('CONTESTED', { axes: [view] }, L.ctx); }
      catch (e) { threw = String(e.message || e); }
      if (!threw)
        bad.push(`a CONTESTED ruling on a one-sided axis built a wave of ${got.personaCount} persona(s) ` +
          `instead of refusing. Contract §1 makes CONTESTED UNSATISFIABLE on a one_sided axis rather than ` +
          `wrong, and the wave is the last place that is enforced now that no tool picks a verdict`);
      else if (!/minimum is two|unsatisfiable/i.test(threw))
        bad.push(`the CONTESTED-on-one_sided call threw, but not on the arity: ${threw.slice(0, 110)}`);
      else arity = 'a CONTESTED ruling here is unsatisfiable and the wave refuses to build one';
    } else {
      let w = null;
      try { w = L.W.selectWave('CONTESTED', { axes: [view] }, L.ctx); }
      catch (e) { bad.push(`selectWave threw on a ${sides.length}-sided axis: ${String(e.message || e).slice(0, 130)}`); }
      if (w) {
        if (w.personaCount !== sides.length)
          bad.push(`the wave spends ${w.personaCount} persona(s) on an axis declaring ${sides.length} ` +
            `side(s) -- the count must be sides.length, never the literal two`);
        const covered = [...new Set(w.personas.map(p => p.side))];
        if (covered.length !== sides.length)
          bad.push(`the wave covers ${covered.length} distinct side(s) [${covered.join(' ')}] of ${sides.length} declared [${sides.join(' ')}]`);
        arity = `a CONTESTED ruling derives ${w.personaCount} persona(s), one per declared side`;
      }
    }

    return bad.length ? FAIL(`${axisId} (${ax.class}, ${sides.length} side(s), ${members} member(s)): ${bad.join('; ')}`)
      : PASS(`${axisId} ${ax.class}: ${sides.length} side(s) [${sides.join('/')}], ${members} member(s), all resolved by path; ` +
        `reachable from its own probe_pos on [${hit.keys_matched.join(' ')}] (mass ${hit.mass} vs mark ${hit.reference_mark}, ` +
        `reported not asserted); ${arity}. VERDICT DECLINED: the session rules it`);
  });
}
/* RFX-34 and RFX-35 are mutations, and a mutation belongs where the mutation harness is. Both
 * delegate to `oracle/tests/fault_inject.js`, which stages a copy, asserts the mutation reached the
 * loaded context, and refuses to score a decoy that did not apply. */
function faultDecoy(name) {
  const f = 'oracle/tests/fault_inject.js';
  if (!fs.existsSync(R(f))) return DEFER(`${f} does not exist`);
  const r = sh(`node ${f} --only ${name}`);
  const applied = /^ *reached +yes/m.test(r.out) || /applied +yes/.test(r.out);
  const line = (r.out.match(/^(ok|FAIL) +\S+ +(.*)$/m) || [, '', ''])[2];
  const tally = (r.out.match(/decoys written \d+, decoys applied \d+, pass \d+, fail \d+/) || [''])[0];
  if (/DECOY DID NOT APPLY|DID NOT REACH/.test(r.out))
    return FAIL(`the decoy did not apply, which is a failure and not a skip: ${tally}`);
  return r.code === 0 ? PASS(`${tally} :: ${line.slice(0, 150)}`) : FAIL(`${tally} :: ${line.slice(0, 150)}`);
}
/* Both decoys stage a register and then advise against the REAL shelf, so both carry the same
   empty-population guard the thirty-three rows above carry, and for the same measured reason. */
B['RFX-34'] = () => shelfVacuous() || faultDecoy('I4d');
B['RFX-35'] = () => shelfVacuous() || faultDecoy('I5-dropped-side');

/* --- ISR: the three named facts, sub-step 4.7 --------------------------------
 * Fifteen rows, thirteen mechanized and two `H`. The checker is a standing file with its own
 * eighteen proofs; these bindings run it and read the proof line rather than re-implementing an
 * assertion the checker already makes, which is the rule this runner has followed since MUT-5. */
const ISR_TOOL = 'oracle/tests/isru_three_facts.js';
let ISRP = null;
function isruProofs() {
  if (ISRP) return ISRP;
  if (!fs.existsSync(R(ISR_TOOL))) return (ISRP = { missing: true });
  const r = sh(`node ${ISR_TOOL} --prove`);
  const rows = new Map();
  for (const m of r.out.matchAll(/^(PASS|FAIL) {2}(\S+)(?: \/ .*?)? +expected/gm)) rows.set(m[2], m[1]);
  const tail = (r.out.match(/\d+ of \d+ proofs pass/) || [''])[0];
  const mut = (r.out.match(/mutations written \d+, mutations observed to apply \d+/) || [''])[0];
  return (ISRP = { rows, tail, mut, code: r.code, out: r.out });
}
const isr = (needle, note) => () => {
  const P = isruProofs();
  if (P.missing) return DEFER(`${ISR_TOOL} does not exist`);
  const hits = [...P.rows].filter(([k]) => new RegExp(needle).test(k));
  if (!hits.length) return VAC(`no proof in ${ISR_TOOL} matches /${needle}/; the row has nothing measuring it`);
  const bad = hits.filter(([, v]) => v === 'FAIL');
  return bad.length ? FAIL(`${bad.length} of ${hits.length} proof(s) fail: ${bad.map(([k]) => k).join(' ')}`)
    : PASS(`${hits.length} proof(s) pass (${hits.map(([k]) => k).join(', ')})${note ? ' -- ' + note : ''}`);
};
B['ISR-1'] = isr('^CONTROL-COMPLIANT$|^FALSE-POSITIVE-DEFENCE$', 'the trigger fires on a real figure and not on a real app scalar');
B['ISR-2'] = isr('^UNIT-LIST-NOT-ASPIRATIONAL$');
B['ISR-3'] = isr('^DECOY-BOUNDARY-DELETED$');
B['ISR-4'] = isr('^DECOY-SCALE-DELETED$');
B['ISR-5'] = isr('^DECOY-MATURITY-DELETED$');
B['ISR-6'] = () => {
  // The three lists are closed sets in the checker and the suite carries no copy of them. Asserted
  // by reading the module rather than by restating the tokens here.
  if (!fs.existsSync(R(ISR_TOOL))) return DEFER(`${ISR_TOOL} does not exist`);
  let M; try { M = require(R(ISR_TOOL)); } catch (e) { return FAIL('the checker does not load: ' + e.message); }
  const bad = ['BOUNDARY', 'SCALE', 'MATURITY', 'UNITS'].filter(k => !Array.isArray(M[k]) || !M[k].length);
  return bad.length ? FAIL(`${bad.join(', ')} is not a non-empty closed list in the checker`)
    : PASS(`four closed lists in the checker: UNITS ${M.UNITS.length}, boundary ${M.BOUNDARY.length}, scale ${M.SCALE.length}, maturity ${M.MATURITY.length}; this suite carries no copy of any of them`);
};
B['ISR-7'] = isr('^DECOY-(BOUNDARY|SCALE|MATURITY)-DELETED$');
B['ISR-8'] = isr('^DECOY-BORROWED-FACTS$');
B['ISR-9'] = isr('^FALSE-POSITIVE-DEFENCE$');
B['ISR-10'] = isr('^CONTROL-TRL-SOURCED$|^DECOY-TRL-UNSOURCED$');
B['ISR-11'] = isr('^CONTROL-TRL-SOURCED$');
B['ISR-12'] = isr('^DECOY-TRL-UNSOURCED$');
B['ISR-15'] = isr('^CONTROL-NO-FIGURE$');
/* ISR-13 and ISR-14 are `H`. They are given a binding that returns DEFER rather than no binding at
 * all, because "a human gate" and "nobody bound this" print identically as UNRUN otherwise, and the
 * difference is the whole point of the H marker. */
/* THE TWO PERMANENT HUMAN GATES, re-stated at 8.5. Their old reason lines named "the sampling read
 * at 7.4" as owner, and 7.4 closed; read literally that made both look like scheduled work somebody
 * had forgotten. They are not scheduled work. Neither is decidable by any checker this project could
 * write, which is a different fact from "not built yet" and is the reason they survive the 8.5 triage
 * unbound while 307 other unbound rows did not. The owner is a reader, every time, and there is no
 * close condition because there is nothing to close. */
B['ISR-13'] = () => DEFER('H, PERMANENT: R2 -- prefer the demonstrated figure to the modelled one -- is a judgement about which of two sources is demonstrated, not a token in a sentence. A checker that guessed at it would answer §6\'s question by inventing an answer. Owner: the reading seat, every run. No close condition: this does not become mechanizable');
B['ISR-14'] = () => DEFER('H, PERMANENT: three facts named and three of them wrong is invisible to a membership test -- the test sees three facts. The checker states this limit in its own LIMIT block rather than leaving a reader to infer it. Owner: the reading seat, every run. No close condition');

/* --- INV: the Level 2 invariants the fault-injection pass now reaches ---------
 * Sub-step 5.3. Four decoys against the ASSEMBLED loop, plus the meta-row that makes the pass
 * honest. `oracle/tests/fault_inject.js` refuses to score a decoy that did not reach the loaded
 * context, so a green here is evidence the control was exercised rather than that it was written. */
B['INV-6'] = () => faultDecoy('I4a');
B['INV-7'] = () => faultDecoy('I4b-missing');
B['INV-8'] = () => faultDecoy('I4c');
B['INV-9'] = () => faultDecoy('I4d');
B['INV-11'] = () => {
  const f = 'oracle/tests/fault_inject.js';
  if (!fs.existsSync(R(f))) return DEFER(`${f} does not exist`);
  const r = sh(`node ${f}`);
  const m = r.out.match(/decoys written (\d+), decoys applied (\d+), pass (\d+), fail (\d+)/);
  if (!m) return FAIL('the fault-injection pass printed no tally');
  const [, written, applied, pass, fail] = m.map(Number);
  /* THE ROW SAYS "every decoy applies", NOT "every decoy passes". Binding this to the pass count
   * would assert something the row does not say -- PDF-4's lesson one group over -- and it would
   * go red on I7, which is a decoy that applied perfectly and found a real defect. The failing
   * decoy count is REPORTED here and owned by the rows those decoys are aimed at. */
  if (written !== applied) return FAIL(`${written} decoys written, ${applied} applied. A decoy that fails to apply is a failure, not a skip, and the difference is not a footnote`);
  return PASS(`${written} decoys written, ${applied} observed to apply (100%); ${pass} pass, ${fail} fail -- every mutation was asserted to have reached the loaded context before its red was asserted. The ${fail} failing decoy(s) are findings owned by their own rows, not by this one`);
};

/* --- LOG: the run log, sub-step 5.2 -----------------------------------------
 * Bound against `tools/verify_answers.js`'s exported closed sets, which are transcribed from
 * contract §8 in ONE place. Each row below is bound to what the ROW SAYS and to nothing wider:
 * LOG-1 is the outcome enum, LOG-2 the review enum, and neither is bound to "the proof passes",
 * because a binding that asserts something the row does not say fails loudly and wrongly and the
 * next person relaxes the row. That is PDF-4's lesson, one group over. */
const VA = 'tools/verify_answers.js';
const vaGuard = fn => () => {
  if (!fs.existsSync(R(VA))) return DEFER(`${VA} does not exist`);
  let M; try { M = require(R(VA)); } catch (e) { return FAIL(`${VA} does not load: ` + e.message); }
  return fn(M);
};
B['LOG-1'] = vaGuard(M => {
  const want = ['ERROR', 'MISCLASSIFIED', 'REGISTER_FAIL', 'REFUSED', 'ANSWERED'];
  return (M.OUTCOMES.length === 5 && want.every((w, i) => M.OUTCOMES[i] === w))
    ? PASS(`outcome enum is exactly five, in precedence order: ${M.OUTCOMES.join(' > ')}`)
    : FAIL(`outcome enum is ${JSON.stringify(M.OUTCOMES)}; contract §8 declares ${JSON.stringify(want)}`);
});
B['LOG-2'] = vaGuard(M => {
  const want = ['unreviewed', 'confirmed', 'FILLED'];
  return (M.REVIEWS.length === 3 && want.every(w => M.REVIEWS.includes(w)))
    ? PASS(`review enum is exactly three: ${M.REVIEWS.join(' | ')}`)
    : FAIL(`review enum is ${JSON.stringify(M.REVIEWS)}; contract §8 declares ${JSON.stringify(want)}`);
});
B['LOG-9'] = vaGuard(M => {
  if (M.OUTCOMES.includes('FILLED')) return FAIL('FILLED is in the outcome enum; contract §8 puts it in `review`, and the separation is a column rather than a convention');
  const bad = M.readLog === undefined ? null : 1;
  return PASS(`FILLED is absent from the outcome enum (${M.OUTCOMES.length} values) and present in the review enum; a row writing FILLED into outcome is rejected as malformed${bad ? '' : ''}`);
});
B['LOG-11'] = vaGuard(M => {
  // Static, per the row: the log-writer module contains no code path emitting the literal.
  const src = fs.readFileSync(R(VA), 'utf8');
  const prove = src.indexOf('function prove()');
  const outside = [...src.slice(0, prove).matchAll(/review\s*[:=]\s*['"]FILLED['"]/g)].length;
  const inside = [...src.slice(prove).matchAll(/review:\s*'FILLED'/g)].length;
  return outside ? FAIL(`${outside} code path(s) outside the proof fixtures assign FILLED; a column no machine writes to is what makes the separation structural`)
    : PASS(`0 code paths assign FILLED outside the proof fixtures (${inside} inside prove(), which build a log rather than annotate one)`);
});
B['LOG-12'] = vaGuard(M => {
  const want = ['timestamp', 'question', 'verdict', 'outcome', 'review', 'reason_code',
    'deliverable', 'contract_version', 'lsei_ref'];
  return (M.FIELDS.length === 9 && want.every(w => M.FIELDS.includes(w)))
    ? PASS(`the row schema is closed at nine: ${M.FIELDS.join(', ')}. A tenth fails and extending is a version bump`)
    : FAIL(`the row schema is ${M.FIELDS.length} field(s): ${M.FIELDS.join(', ')}`);
});
B['LOG-18'] = vaGuard(M => {
  const base = { timestamp: 't', question: 'q', verdict: 'LITERATURE', outcome: 'ANSWERED',
    review: 'unreviewed', reason_code: '', deliverable: 'a.md', contract_version: 2, lsei_ref: '-' };
  const onNonRefusal = M.integrity([Object.assign({}, base, { reason_code: 'not-found' })]);
  const missingOnRefusal = M.integrity([Object.assign({}, base, { verdict: 'REFUSE', outcome: 'REFUSED', reason_code: '' })]);
  const bad = [];
  if (!onNonRefusal.some(f => /reason_code/.test(f))) bad.push('a reason code on a non-refusal is not caught');
  if (!missingOnRefusal.some(f => /reason_code/.test(f))) bad.push('an absent reason code on a refusal is not caught');
  return bad.length ? FAIL(bad.join('; '))
    : PASS('present on a non-refusal fails, absent on a refusal fails; both directions measured against tools/verify_answers.js integrity()');
});

/* --- the register-enforcement checks, sub-step 5.1 ---------------------------
 * Each row is bound to the ONE proof in the checker that measures what the row says, never to the
 * checker's overall exit code. GRD-9 says "two grade tokens in one trace line fails"; CLM-7 says
 * "delete one trace line from a real answer; CLM-7 red". Those are two named proofs, and binding
 * either to "--prove exits 0" would report a pass for a proof that never ran. */
function namedProof(tool, needle, label) {
  if (!fs.existsSync(R(tool))) return DEFER(`${tool} does not exist`);
  const r = sh(`node ${tool} --prove`);
  const mut = r.out.match(/mutations written (\d+), mutations observed to apply (\d+)/);
  if (mut && mut[1] !== mut[2]) return FAIL(`${mut[1]} mutations written, ${mut[2]} applied -- a decoy that fails to apply is a failure, not a skip`);
  const hits = [...r.out.matchAll(/^(PASS|FAIL) {2}(\S+)/gm)].filter(m => new RegExp(needle).test(m[2]));
  if (!hits.length) return VAC(`no proof in ${tool} matches /${needle}/; this row has nothing measuring it`);
  const bad = hits.filter(m => m[1] === 'FAIL');
  return bad.length ? FAIL(`${label}: ${bad.length} of ${hits.length} proof(s) fail: ${bad.map(m => m[2]).join(' ')}`)
    : PASS(`${label}: ${hits.map(m => m[2]).join(', ')}${mut ? `; ${mut[1]} mutations all observed to apply` : ''}`);
}
B['GRD-9'] = () => namedProof('tools/verify_register.js', '^DECOY-B3-TWO-GRADES$', 'two grade tokens in one trace line, both legal, fails');
B['CLM-7'] = () => namedProof('tools/verify_register.js', '^DECOY-B1-CLAIM-WITHOUT-TRACE$', 'a trace deleted from a real answer turns CLM-7 red');


/* ==========================================================================================
 * SUB-STEP 8.5 TRIAGE BINDINGS. The Fact-Checker, W5-4, 2026-08-28.
 *
 * THE RULING THIS BLOCK EXECUTES. The suite held 455 rows and 348 of them had no binding at all:
 * sentences with a status cell beside them, which the runner had been reporting as UNRUN on every
 * run for four waves. The author: "probably shitcan this eh?" 307 rows were deleted. The 45 below
 * are the ones that turned out to be measurable against something already on disk -- a `--prove`
 * mode a tool already had, a closed set a contract already states, a file property already true or
 * already false. None of them is a new mechanism. Every one of them is five to ten lines, which is
 * the test of whether a row was worth keeping: a row needing a framework to bind was a row nobody
 * was ever going to bind.
 *
 * WHAT THE BINDINGS ARE NOT. They do not restate the row in code. Where a row asserted something
 * over "every produced answer" and no produced answers exist, the row was deleted rather than bound
 * to a weaker proxy -- a binding that measures something adjacent to the row is worse than no
 * binding, because UNRUN is at least honest.
 * ========================================================================================== */

/* --- VER: the contract version, and the field has now caught three drifts ------------------ */
const CONTRACT = 'oracle/answer_contract.md';
const contractText = () => fs.readFileSync(R(CONTRACT), 'utf8');
// The integer, read at test time, never copied into this file.
const contractVersion = t => ((t || contractText()).match(/^\*\*Contract version: *([^*]+?)\.?\*\*/m) || [])[1];
// The suite's own pin, read out of the suite text the runner already loaded.
const suitePin = s => ((s.text || '').match(/Written against answer contract version *([0-9]+)/) || [])[1];

B['VER-1'] = () => {
  const v = contractVersion();
  if (v === undefined) return FAIL(`${CONTRACT} states no \`**Contract version: N.**\` line`);
  return /^[0-9]+$/.test(v) ? PASS(`contract version "${v}", a bare monotone integer`)
    : FAIL(`contract version "${v}" is not \`^[0-9]+$\`; semantic versioning implies compatibility semantics nobody will maintain`);
};
B['VER-2'] = (s) => {
  const c = contractVersion(), p = suitePin(s);
  if (p === undefined) return FAIL('this suite states no pinned contract version');
  return c === p ? PASS(`suite pins ${p}, contract reads ${c}`)
    : FAIL(`suite pins ${p}, contract reads ${c}. THE FIELD IS WORKING: a red here is the report, not the defect. ` +
      `The defect is that ${CONTRACT} moved and this file's assertions were not re-read against it. ` +
      `Owner: the seat landing the version-${c} reconciliation. Close: re-read, then re-pin.`);
};
B['VER-3'] = () => {
  /* The tripwire, proved in memory and independently of what this suite currently pins. Take the
   * contract's own integer as a synthetic pin -- so the comparator starts agreeing -- then increment
   * the integer in the contract text and require the comparator to disagree. A green comparator
   * after the mutation means the field is decoration and VER-1..3 are deleted along with it. */
  const t = contractText(), v = contractVersion(t);
  if (v === undefined) return FAIL('no version line to mutate');
  const mutated = t.replace(/^(\*\*Contract version: *)([0-9]+)(\.?\*\*)/m, (_, a, n, b) => a + (Number(n) + 1) + b);
  if (mutated === t) return FAIL('DECOY DID NOT APPLY: the version line did not change under mutation');
  const agreesBefore = contractVersion(t) === v, agreesAfter = contractVersion(mutated) === v;
  return (agreesBefore && !agreesAfter)
    ? PASS(`decoy applied (${v} -> ${contractVersion(mutated)}); a pin of ${v} agrees before and disagrees after`)
    : FAIL(`the tripwire does not fire: agreesBefore=${agreesBefore} agreesAfter=${agreesAfter}`);
};

/* --- GRD: the six blacklisted grade words, one decoy each, in verify_register --------------- */
for (const [id, word] of [['GRD-3', 'VERIFIED'], ['GRD-4', 'CONFIRMED'], ['GRD-5', 'VALIDATED'],
['GRD-6', 'PROVEN'], ['GRD-7', 'ESTABLISHED'], ['GRD-8', 'SUPPORTED']])
  B[id] = () => namedProof('tools/verify_register.js', '^DECOY-B3-' + word + '$',
    `"${word.toLowerCase()}" on a real trace line is a FAIL, not a warning`);
/* GRD-10 is the false-positive gate and it is bound to the CONTROL, not to a decoy. The hazard is
 * that `recompute-verified` CONTAINS `verified`, so a substring scan reds a legal answer. The proof
 * that the matcher is word-boundary is that a real APP answer carrying `recompute-verified` passes
 * B3 -- a decoy cannot show this, only a control can. A blacklist that trips on its own legal token
 * is switched off within a week, and a check that gets switched off is worse than no check. */
B['GRD-10'] = () => namedProof('tools/verify_register.js', '^CONTROL-APP$',
  '`recompute-verified` on a real produced answer does not trip the `verified` blacklist');

/* --- CLM: claim-bearing, bound to verify_register's own proofs ------------------------------ */
B['CLM-3'] = () => namedProof('tools/verify_register.js', '^CLAIM-BEARING-READS-THE-APP$',
  'a sentence naming an app coefficient is claim-bearing because the app names it');
B['CLM-4'] = () => namedProof('tools/verify_register.js', '^CLAIM-BEARING-NAMED-SOURCE$',
  'a sentence naming a REFERENCES author is claim-bearing');
B['CLM-5'] = () => namedProof('tools/verify_register.js', '^LISTS-FROM-THE-APP$',
  'the coefficient and named-source lists are read out of lsei/index.html at run time, not typed into the checker');
B['CLM-9'] = () => namedProof('tools/verify_register.js', '^DECOY-B1-ALL-EXEMPT$',
  'a deliverable that exempts every claim-bearing unit fails rather than passes');
B['CLM-14'] = () => {
  // A post-condition, and the cheapest real check in the suite: the replaced tool is gone.
  const hits = sh('git ls-files "*verify_report.js"').out.split('\n').filter(Boolean)
    .concat(fs.existsSync(R('tools/verify_report.js')) ? ['tools/verify_report.js (untracked)'] : []);
  return hits.length ? FAIL(`verify_report.js is still in the tree: ${[...new Set(hits)].join(' ')}`)
    : PASS('verify_report.js is absent from the tree, tracked and untracked');
};

/* --- LOG: the run log, bound to verify_answers' own proofs ---------------------------------- */
B['LOG-3'] = () => namedProof('tools/verify_answers.js', '^ALL-SIX-COUNTED$',
  'each of the six outcomes lands in its own bucket and in no other');
B['LOG-7'] = () => namedProof('tools/verify_answers.js', '^REFUSED-NOT-ABSORBED$',
  'a REFUSE verdict logged ANSWERED is caught, not silently counted as an answer');
B['LOG-19'] = () => namedProof('tools/verify_answers.js', '^DELIVERABLE-PATH-REQUIRED$',
  'a row with no deliverable path is a row nobody can sample');
B['LOG-22'] = () => namedProof('tools/verify_answers.js', '^PROPORTION-WITH-DENOMINATORS$',
  'all three sampling denominators are computable from the two columns alone');
B['LOG-23'] = () => namedProof('tools/verify_answers.js', '^UNRECOGNISED-IS-A-FINDING$',
  'an outcome, review or verdict outside its closed set is a finding, never a silent skip');

/* --- FIL: the haiku half of the deliverable, bound to verify_haiku's own proofs ------------- */
B['FIL-10'] = () => namedProof('tools/verify_haiku.js', '^DECOY-A3-',
  'A3 fires on each of the seven claim shapes and names the rule it fired on');
B['FIL-11'] = () => namedProof('tools/verify_haiku.js', '^DECOY-NEWLINE$|^DECOY-A2-NOT-575$',
  'a line break fails A1 and a haiku with no 5/7/5 partition fails A2');
B['FIL-12'] = () => namedProof('tools/verify_haiku.js', '^UNCERTIFIED-IS-NOT-(PASS|FAIL)$',
  'a word outside the dictionary is a refusal to certify -- neither a pass nor a failure');

/* --- VRD and REF: the two closed sets, read from the router, compared to the contract -------- */
const routerConst = () => {
  const f = R('oracle/router/classify.js');
  if (!fs.existsSync(f)) return null;
  const t = fs.readFileSync(f, 'utf8');
  const grab = n => { const m = t.match(new RegExp('const ' + n + " = \\[([^\\]]*)\\]")); return m ? m[1].match(/'([^']+)'/g).map(x => x.slice(1, -1)) : null; };
  return { VERDICTS: grab('VERDICTS'), REASON_CODES: grab('REASON_CODES'), text: t };
};
B['VRD-1'] = () => {
  const rc = routerConst();
  if (!rc || !rc.VERDICTS) return FAIL('oracle/router/classify.js declares no VERDICTS array');
  const want = ['APP', 'FIGURE', 'LITERATURE', 'BOTH', 'CONTESTED', 'REFUSE'];
  const c = contractText();
  const missing = want.filter(v => !new RegExp('`' + v + '`').test(c));
  const extra = rc.VERDICTS.filter(v => !want.includes(v)), absent = want.filter(v => !rc.VERDICTS.includes(v));
  if (extra.length || absent.length) return FAIL(`the router's closed set is not the six: extra [${extra}] absent [${absent}]`);
  if (missing.length) return FAIL(`the contract does not name ${missing.join(' ')}; the router and the contract disagree on the set`);
  return PASS(`exactly six, closed, and all six named in ${CONTRACT}: ${rc.VERDICTS.join(' ')}`);
};
B['VRD-11'] = () => {
  /* A seventh verdict parked in a corner is how a closed set stops being closed. Asserted over CODE
   * only -- prose naming the token as excluded is the record of the 1.3 cut, not a member -- and
   * over code that is NOT THIS FILE. The first version of this binding searched for the token in a
   * string it was itself holding and reported its own source as the defect, which is the CHK-03
   * shape one layer in: a check whose only finding is itself. */
  const self = 'oracle/tests/run_suite.js';
  const r = sh('git grep -In "APP_UNBUILDABLE" -- "oracle/**/*.js" "oracle/**/*.json" "tools/**/*.js"');
  const live = r.out.split(String.fromCharCode(10)).filter(Boolean).filter(l => !l.startsWith(self + ':'));
  return live.length ? FAIL(`APP_UNBUILDABLE appears in ${live.length} code location(s) outside this checker: ${live[0].slice(0, 140)}`)
    : PASS('APP_UNBUILDABLE appears in no .js or .json under oracle/ or tools/ (this checker excluded); the condition produces REFUSE with reason unbuildable');
};

/* --- REF: the reason codes. REF-1 IS GONE AND WAS REPLACED, NOT WIDENED. ------------------------
 *
 * REF-1 asserted that `oracle/router/classify.js`'s array equalled the contract's §5 table, reading
 * both at test time and holding no copy of its own. Its comment stated the doctrine correctly and
 * the row was honestly built: mutate either file it read and it went red. It was ALSO green through
 * the entire fork it existed to catch, because three of the five sites carrying the set were not in
 * its population and nothing announced their absence.
 *
 * WHAT WAS WRONG WITH IT IS NOT WHAT MY OWN STEP 47 RULE MEASURES. That rule constrains where a row
 * gets its EXPECTATION -- do not hold your own copy -- and REF-1 obeyed it. It says nothing about
 * where a row gets its SUBJECT LIST, and an author who mutates the artifact his row names will
 * always succeed in seeing it go red. The failure mode of a list is that ITS COMPLEMENT IS
 * UNSTATED: a list of two sites is green on the third the day it is added. A computed population's
 * complement is empty by construction, so the next site fails on arrival. That is
 * `check_register.md` §4's own doctrine -- "the list is closed, not merely complete, because its
 * complement is computed" -- applied to a set of sites instead of a set of checks, and
 * `AMENDMENTS.tsv` AM-155 ruled the identical thing on PTH-13's matcher six days earlier.
 *
 * AND AFTER FIX 6 REF-1 WOULD HAVE BEEN A TAUTOLOGY. `classify.js` now derives from
 * `oracle/reason_codes.js` and §5's table is generated from it, so "the router's set equals the
 * contract's set" is true by construction. A row asserting that a generated artifact matches its
 * generator reports green forever and is worse than an absent row. */

const reasonPop = () => {
  /* THE POPULATION IS COMPUTED, NEVER LISTED, and the three exclusions are each a declared boundary
     rather than a taste call:
       - `cr_scratch/**` is outside both of `check_register.md`'s declared S roots, and it holds
         frozen records of closed waves -- `cr_scratch/sre_w4/verify_all.js` line 11 declares the
         set at six and correcting it would falsify a dated record.
       - the authority module is the one file that is ALLOWED to enumerate the set.
       - this file is excluded by name on VRD-11's own precedent: the first version of that row
         searched for a token in a string it was itself holding and reported its own source. */
  const out = sh('git ls-files').out.split(String.fromCharCode(10)).map(s => s.trim()).filter(Boolean);
  return out.filter(f => (f.startsWith('oracle/') || f.startsWith('tools/')) &&
    (f.endsWith('.js') || f.endsWith('.json')) &&
    f !== 'oracle/tests/run_suite.js' && f !== 'oracle/reason_codes.js');
};
const authority = () => require(R('oracle/reason_codes.js'));

B['REF-2'] = () => {
  /* THE SWEEP, in VRD-11's shape and over a population this row computes at run time.
   *
   * WHAT COUNTS AS A SECOND DECLARATION, stated so nobody re-argues it. A file naming ONE member as
   * a datum -- `"reason": "unbuildable"` on a single class prediction, a fixture refusing
   * `not-found` -- is using the vocabulary, not declaring the set, and eleven files in the
   * population do exactly that. An ENUMERATION is three or more DISTINCT members inside one
   * 200-character span, which is what an array, an object key list and a regex alternation all look
   * like and what a per-row datum never does. Comments are stripped from .js first: prose naming
   * the codes is discussion, and `classify.js`'s own W4-2 provenance paragraph names four of them.
   *
   * THIS ROW'S LIMIT, NAMED RATHER THAN LEFT TO BE FOUND: a new consumer that hard-codes ONE member
   * passes it. It catches a copy of the SET, which is the thing that forked. */
  const RC = authority();
  const strip = t => t.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');
  const pop = reasonPop();
  if (!pop.length) return VAC('git ls-files returned no .js or .json under oracle/ or tools/');
  const bad = [];
  for (const f of pop) {
    let t;
    try { t = fs.readFileSync(R(f), 'utf8'); } catch (e) { continue; }
    if (f.endsWith('.js')) t = strip(t);
    const hits = [];
    for (const c of RC.CODES) {
      const rx = new RegExp('[\'"`|(]' + c + '[\'"`|)]', 'g');
      let m; while ((m = rx.exec(t))) hits.push({ c: c, i: m.index });
    }
    hits.sort((a, b) => a.i - b.i);
    for (let i = 0; i < hits.length; i++) {
      const d = [...new Set(hits.filter(h => h.i >= hits[i].i && h.i < hits[i].i + 200).map(h => h.c))];
      if (d.length >= 3) { bad.push(f + ' [' + d.join(' ') + ']'); break; }
    }
  }
  return bad.length
    ? FAIL(`${bad.length} file(s) of ${pop.length} enumerate the reason-code set outside oracle/reason_codes.js: ` +
        `${bad.join('; ')}. The set has ONE declaration and every other site derives from it; a second enumeration is ` +
        `a fork waiting for somebody to add the next code to one of them. Owner: whoever added the enumeration. ` +
        `Close: the site imports oracle/reason_codes.js.`)
    : PASS(`${pop.length} tracked .js/.json under oracle/ and tools/ computed at test time; none enumerates the set ` +
        `outside oracle/reason_codes.js (this checker and cr_scratch excluded, with reasons in the source)`);
};

B['REF-3'] = () => {
  /* THE RENDERING AND THE ARITY, and the rendering compares ALL THREE COLUMNS. REF-1 compared code
   * names only, and names-only is precisely why it was green over a fork: it would have passed an
   * owner column reassigning `transfer-unevaluable` to "a corpus gap, and an acquisition decision",
   * which is the one distinction that makes it a seventh code rather than a widening of
   * `not-found`. A check that reads the names has checked a list, not §5.
   *
   * THE ARITY HALF'S POPULATION IS ALSO COMPUTED. "closed set of six" written in words is a copy and
   * it is one of the copies that drifted -- the tool's own rejection message cited "§5's closed six"
   * to reject a value §5 declares legal. Computing the population found two live sites a
   * hand-authored two-site list missed, `oracle/router/wave.js` and `tools/exclusions_match.js`.
   * `oracle/AMENDMENTS.tsv` is excluded: it is a dated append-only record and AM-113 correctly says
   * "six" about the state at R-3. Correcting a record falsifies it. Same rule for a past-tense
   * sentence inside a live file -- `classify.js`'s provenance comment says section 5 GAVE the codes
   * a closed set of six, which is the pre-version-5 state narrated accurately. */
  const RC = authority();
  const c = contractText();
  const b = c.indexOf(RC.BEGIN), e = c.indexOf(RC.END);
  if (b < 0 || e < 0) return FAIL(`${CONTRACT} carries no generated reason-code block; the markers oracle/reason_codes.js emits are absent and §5's table is hand-written again`);
  const block = c.slice(b + RC.BEGIN.length, e).replace(/^\s*\n/, '').replace(/\n\s*$/, '');
  const want = RC.renderSection5();
  if (block !== want) {
    const bl = block.split(String.fromCharCode(10)), wl = want.split(String.fromCharCode(10));
    const at = bl.findIndex((l, i) => l !== wl[i]);
    return FAIL(`${CONTRACT} §5's generated block is not the render of oracle/reason_codes.js. First difference at block line ${at + 1}: ` +
      `contract has [${(bl[at] || '(absent)').slice(0, 120)}] and the module renders [${(wl[at] || '(absent)').slice(0, 120)}]. ` +
      `All three columns are compared: a check over the code names alone would pass an owner column that had been reassigned.`);
  }
  /* Every arity stated in words, over a computed population. */
  const W = 'four|five|six|seven|eight|nine|ten';
  const want_word = RC.arityWord();
  const proseFiles = sh('git ls-files').out.split(String.fromCharCode(10)).map(s => s.trim()).filter(Boolean)
    .filter(f => (f.startsWith('oracle/') || f.startsWith('tools/') || f === 'CLAUDE.md') &&
      (f.endsWith('.js') || f.endsWith('.md')) &&
      f !== 'oracle/tests/run_suite.js' && f !== 'oracle/reason_codes.js' && f !== 'oracle/AMENDMENTS.tsv');
  const forks = [];
  let sites = 0;
  for (const f of proseFiles) {
    let lines;
    try { lines = fs.readFileSync(R(f), 'latin1').split(String.fromCharCode(10)); } catch (err) { continue; }
    lines.forEach((L, i) => {
      const m = L.match(new RegExp('\\b(' + W + ')\\s+reason\\s+codes?\\b')) ||
                L.match(new RegExp('reason code[^.]{0,80}closed set of (' + W + ')\\b')) ||
                L.match(new RegExp('\u00a75\'s closed (' + W + ')\\b'));
      if (!m) return;
      sites++;
      if (m[1] !== want_word) forks.push(`${f}:${i + 1} states "${m[1]}" :: ${L.trim().slice(0, 110)}`);
    });
  }
  return forks.length
    ? FAIL(`${forks.length} of ${sites} prose site(s) state a reason-code arity the authority contradicts (it holds ${RC.CODES.length}, "${want_word}"): ${forks.join(' | ')}`)
    : PASS(`§5's generated block is the render of oracle/reason_codes.js over all three columns, and ${sites} prose site(s) across ${proseFiles.length} computed files all state "${want_word}"`);
};

/* --- CON and PDF: containment, bound to check_no_sources' own runnable probe ---------------- */
const NO_SRC = 'tools/check_no_sources.js';
const ignoreProbe = () => sh(`node ${NO_SRC} --ignore-probe`);
B['CON-1'] = () => {
  const r = ignoreProbe();
  const size = (r.out.match(/probe set size=([0-9]+) open=([0-9]+)/) || []);
  if (!size.length) return FAIL(`${NO_SRC} --ignore-probe printed no probe-set line; the probe is a measurement, not a fixture`);
  if (r.code !== 0) return FAIL(`the probe fixture exits ${r.code}: open=${size[2]} of ${size[1]}`);
  // A SHRINKING probe set is the failure. 25 is the set as landed; fewer is a silent narrowing.
  return Number(size[1]) < 25 ? FAIL(`probe set has shrunk to ${size[1]} paths (was 25); the remaining paths all passing is not evidence`)
    : PASS(`fixture runs: ${size[1]} probe paths, ${size[2]} open, exit 0 -- and it prints the set it used`);
};
B['CON-3'] = () => {
  // The fixtures must never touch the real tree: every probe path is hypothetical.
  const paths = [...ignoreProbe().out.matchAll(/^CHK-37 \[[^\]]+\] [0-9]+ probe paths: (.*)$/gm)]
    .flatMap(m => m[1].trim().split(/ +/));
  if (!paths.length) return FAIL('the probe printed no paths to check against the tree');
  const real = paths.filter(p => fs.existsSync(R(p)));
  return real.length ? FAIL(`${real.length} probe path(s) EXIST on disk: ${real.join(' ')} -- the fixture is reading the real tree`)
    : PASS(`all ${paths.length} probe paths are hypothetical; none exists on disk`);
};
B['CON-4'] = () => {
  // Wired, not merely committed. A hook committed non-executable is inert on a fresh clone, which
  // is CLAUDE.md's BC-8 and is the reason this asserts the index mode and not just the file.
  const hp = sh('git config --get core.hooksPath').out.trim();
  if (hp !== 'tools/githooks') return FAIL(`core.hooksPath is "${hp || 'unset'}", not tools/githooks: the hooks are committed and not wired`);
  const ls = sh('git ls-files -s tools/githooks/').out.split('\n').filter(Boolean);
  if (!ls.length) return FAIL('tools/githooks/ holds no tracked hook');
  const inert = ls.filter(l => !/^100755/.test(l));
  return inert.length ? FAIL(`${inert.length} hook(s) committed non-executable and inert on a fresh clone: ${inert.map(l => l.split('\t')[1]).join(' ')}`)
    : PASS(`core.hooksPath=tools/githooks; ${ls.length} hook(s), all mode 100755`);
};
/* PDF-4 CLOSED. The old note here said there was no binding because PDF-4 does not claim `.txt` is
 * gitignored -- it claims the CONTAINMENT CHECK covers it. That is now a printed line rather than an
 * inference: --ignore-probe names the blocked-but-not-ignored set explicitly, so the asymmetry can
 * be asserted instead of argued. */
B['PDF-4'] = () => {
  const line = (ignoreProbe().out.match(/^CHK-37 blocked-but-not-ignored.*$/m) || [])[0];
  if (!line) return FAIL('the probe does not name its blocked-but-not-ignored set; the .txt asymmetry is inferable only');
  return /\.txt\b/.test(line) ? PASS('`.txt` is named as an EXTENSION-gate finding, not an ignore rule: ' + line.replace(/^CHK-37 /, '').slice(0, 90))
    : FAIL('`.txt` is not in the blocked-but-not-ignored set; full-text .txt is uncontained: ' + line.slice(0, 120));
};
B['PDF-8'] = () => {
  const t = sh(`node ${NO_SRC} --tree`), st = sh(`node ${NO_SRC} --staged`);
  const g = o => (o.match(/scope=(\w+) files_scanned=([0-9]+)/) || []);
  const a = g(t.out), b = g(st.out);
  if (!a.length || !b.length) return FAIL('the checker does not print its scope and its file count; a report that does not say what it walked is not evidence');
  if (a[1] !== 'tree' || b[1] !== 'staged') return FAIL(`the printed scopes are ${a[1]}/${b[1]}, not tree/staged`);
  return PASS(`both scopes reported and distinguished: tree=${a[2]} files, staged=${b[2]} files`);
};
B['PDF-16'] = () => {
  /* VACUOUS IS NOT PASS, one layer down. An empty stage must SAY it was empty. check_no_sources has
   * two report branches and the empty one does not print a findings count, so this reads BOTH: the
   * scope-and-count line, and the explicit statement that scanning nothing asserts nothing. */
  const r = sh(`node ${NO_SRC} --staged`);
  const m = r.out.match(/scope=staged files_scanned=([0-9]+)/);
  if (!m) return FAIL('an empty stage exits 0 and prints no scope or count: a pass it did not earn');
  if (Number(m[1]) > 0) return PASS(`${m[1]} staged file(s) scanned and reported; the empty branch is not the one exercised today`);
  const says = /SCANNED NOTHING/.test(r.out) && /nothing is asserted/i.test(r.out);
  return says ? PASS('files_scanned=0 and the checker says so in words: "SCANNED NOTHING ... nothing was examined, so nothing is asserted"')
    : FAIL('files_scanned=0 and the checker exits 0 without saying it examined nothing; an empty list reads as a clean one');
};

/* --- PTH: the path-length ceilings, over the landed corpus ---------------------------------- */
/* Measured, not remembered. `NAMING.md` sec.8 sets 108 / 64 / 32 and depth 1; a ceiling recorded in a
 * status cell decays, and this project has already shipped one that did. The separator is a
 * BACKSLASH because the ceiling exists for Windows, which is the platform it binds on. */
const CEIL = { repo: 108, leaf: 64, folder: 32 };
const corpusRel = () => corpusFiles().map(p => path.relative(ROOT, p).replace(/\//g, '\\'));
const pthGuard = fn => () => { const f = corpusRel(); return f.length ? fn(f) : VAC(`${TREE}/ holds 0 .md files; there is no path to measure`); };
B['PTH-1'] = pthGuard(f => {
  const over = f.filter(p => p.length > CEIL.repo).sort((a, b) => b.length - a.length);
  const mx = Math.max(...f.map(p => p.length));
  return over.length ? FAIL(`${over.length} of ${f.length} repo-relative paths exceed ${CEIL.repo}: ${over[0]} (${over[0].length})`)
    : PASS(`${f.length} paths, longest ${mx}, ceiling ${CEIL.repo}`);
});
/* PTH-3 (leaf <= 64) and PTH-4 (folder <= 32) are RETIRED, W5-9, 2026-08-29, by measurement.
 * PROOF OF REDUNDANCY. Under PTH-5 (depth == 2, separately asserted) every corpus relpath is
 *   len("literature") + 1 + len(folder) + 1 + len(leaf) = 12 + len(folder) + len(leaf)
 * so PTH-1's `relpath <= 108` IS `len(folder) + len(leaf) <= 96`, exactly. PTH-3 and PTH-4 asserted
 * one arbitrary PARTITION of that 96 -- 64 + 32 -- which IMPLIES the sum but is not implied by it.
 * They were therefore a strictly tighter restatement of a check that already runs, and the corpus
 * is the demonstration that the extra tightness rejects names the real constraint accepts:
 *   ieee-2022-...-update.md   leaf 70 > 64   in power-and-thermal (17)  -> relpath 99, margin 9
 *   organization-and-production-systems (35) -> longest path under it   -> relpath 98, margin 10
 *   development-and-industrial-policy   (33) -> longest path under it   -> relpath 99, margin 9
 * Three breaches of the partition, zero breaches of the budget, worst margin 9 of 108. The
 * remedy the rows demanded was a rename whose blast radius is 498 occurrences across ~120 files,
 * 71 of them cr_scratch deliverables that PTH-13's own reasoning forbids rewriting -- so the rows
 * asked for a change that could not be completed, to satisfy an allocation nothing measures.
 * WHAT REPLACES THEM: nothing, because nothing is lost. PTH-1 is the constraint, PTH-5 pins the
 * depth the arithmetic depends on, A4 pins the root, and PTH-11 -- extended here -- reports the
 * headroom, including the TIGHTEST PER-FOLDER LEAF BUDGET, which is the forward-looking signal the
 * folder ceiling was gesturing at and never actually computed. */
B['PTH-5'] = pthGuard(f => {
  const bad = f.filter(p => p.split('\\').length !== 3);
  return bad.length ? FAIL(`${bad.length} file(s) are not at literature/<folder>/<leaf>: ${bad.slice(0, 3).join(' ')}`)
    : PASS(`all ${f.length} files at depth exactly 1 below ${TREE}/`);
});
B['PTH-11'] = pthGuard(f => {
  // A margin, reported. The row asks for the worst case WITH its margin, because a ceiling that is
  // met exactly reads the same as one met with room, and only one of the two survives a rename.
  // EXTENDED W5-9 with the tightest per-folder leaf budget. With PTH-4 retired a folder may be any
  // length the composite allows, so the number a future author actually needs is not "is this
  // folder under 32" but "how many characters of leaf does this folder still afford me" --
  // 108 - 12 - len(folder). That is computed, not asserted: the tool reports, the session rules.
  const worst = f.slice().sort((a, b) => b.length - a.length)[0];
  const folders = [...new Set(f.map(p => p.split('\\')[1]))];
  const budget = folders.map(d => ({ d, b: CEIL.repo - 12 - d.length })).sort((x, y) => x.b - y.b)[0];
  return PASS(`worst-case landed path ${worst.length} chars, ceiling ${CEIL.repo}, margin ${CEIL.repo - worst.length}: ${worst}` +
    ` | tightest folder leaf budget ${budget.b} chars in ${budget.d} (${budget.d.length}) across ${folders.length} folders`);
});

/* --- CRP: corpus-level invariants ----------------------------------------------------------- */
B['CRP-1'] = () => {
  const r = sh('node tools/check_corpus_collisions.js');
  const m = r.out.match(/([0-9]+) collisions, ([0-9]+) near-twins/);
  const walked = (r.out.match(/walked ([0-9]+) files/) || [])[1];
  if (!m) return FAIL('tools/check_corpus_collisions.js printed no collision count: ' + r.out.trim().slice(0, 120));
  if (!Number(walked)) return VAC(`the collision checker walked 0 files; CHK-01 over an empty tree is vacuously true`);
  return r.code === 0 && m[1] === '0' ? PASS(`CHK-01 over the merged tree: ${m[1]} collisions, ${m[2]} near-twins, ${walked} files walked`)
    : FAIL(`${m[1]} collisions, ${m[2]} near-twins over ${walked} files (exit ${r.code})`);
};
B['CRP-7'] = () => {
  // A case-INSENSITIVE check is not sufficient, and this is that claim made runnable: two paths
  // differing only by case are one file on Windows and two on Linux, so the corpus size would
  // depend on the filesystem. Asserted over the real tree, where it must never be able to arise.
  const f = corpusFiles().map(p => path.relative(ROOT, p).replace(/\\/g, '/'));
  if (!f.length) return VAC(`${TREE}/ holds 0 .md files`);
  const seen = new Map(), bad = [];
  for (const p of f) { const k = p.toLowerCase(); if (seen.has(k) && seen.get(k) !== p) bad.push(`${seen.get(k)} <-> ${p}`); seen.set(k, p); }
  return bad.length ? FAIL(`${bad.length} path pair(s) differ only by case; the corpus size depends on the filesystem: ${bad.join(' ; ')}`)
    : PASS(`${f.length} paths, ${seen.size} distinct case-folded; the file count is the same on a case-insensitive filesystem`);
};
B['CRP-11'] = () => {
  /* THE LINE-ENDING FAMILY, kept because it has bitten this project by name. A CRLF diff read as a
   * content disagreement produced a false "these two files disagree" once already, which is why
   * MRG-4b reports eol separately. Proved here as a differential rather than asserted: take a real
   * landed file, build its CRLF twin, and require that the comparator the merge uses calls them
   * BYTE-different and CONTENT-identical. A comparator that folds the two cannot show both. */
  const f = corpusFiles();
  if (!f.length) return VAC(`${TREE}/ holds 0 .md files; there is nothing to compare`);
  const a = fs.readFileSync(f[0], 'utf8').replace(/\r\n/g, '\n');
  const twin = a.replace(/\n/g, '\r\n');
  if (twin === a) return VAC(`${path.basename(f[0])} holds no newline; the CRLF twin is the same bytes`);
  const contentSame = nz(a) === nz(twin), bytesDiffer = a !== twin;
  const crlfInTree = f.filter(p => fs.readFileSync(p, 'utf8').includes('\r\n')).length;
  return (contentSame && bytesDiffer)
    ? PASS(`byte-different (${twin.length - a.length} bytes) and content-identical under the merge's own normalizer; ${crlfInTree} of ${f.length} landed files carry CRLF`)
    : FAIL(`the comparator folds line-ending difference into content difference: bytesDiffer=${bytesDiffer} contentSame=${contentSame}`);
};

/* --- REG-1: the deferral was stale. The loader exists, so the row runs. --------------------- */
/* Its reason read "the loader that takes a list of register paths is Step 3 (3.8)". Step 3 closed.
 * `oracle/router/classify.js` exports `loadContext`, and the assertion the row makes -- that the
 * sidecar is a SET of files rather than one file -- is now measurable. A deferral outliving its
 * blocker is a row nobody rechecks, which is the same defect as a status cell nobody runs. */
B['REG-1'] = () => {
  const f = R('oracle/router/classify.js');
  if (!fs.existsSync(f)) return DEFER('oracle/router/classify.js is not in this tree. Owner: the router seat');
  const present = REGS.filter(p => fs.existsSync(R(p)));
  if (present.length < 2) return VAC(`${2 - present.length} of the 2 register files are absent; a set assertion over one file has no subject`);
  let C, ctx;
  try { C = require(f); ctx = C.loadContext({}); } catch (e) { return FAIL('loadContext threw: ' + e.message); }
  if (ctx.refuse) return FAIL('loadContext refused: ' + JSON.stringify(ctx.refuse).slice(0, 160));
  const perFile = REGS.map(p => ({ p, n: (fs.readFileSync(R(p), 'utf8').match(/^A\t/gm) || []).length }));
  const declared = perFile.reduce((a, b) => a + b.n, 0), loaded = ctx.axes.size;
  const shape = perFile.map(x => path.basename(x.p) + '=' + x.n).join(' + ');
  return loaded === declared && perFile.every(x => x.n > 0)
    ? PASS(`the sidecar loads as a SET: ${shape} = ${loaded} axes, joined at load from ${present.length} files`)
    : FAIL(`${loaded} axes loaded against ${declared} declared (${shape}); a half-loaded set is a refusal, not a set`);
};

/* --- INV: the two meta-invariants that are about THIS RUNNER and about the clone ------------ */
B['INV-12'] = () => {
  /* No test passes on an empty population -- asserted against the runner itself, because the
   * runner is the only thing that can make this true or false for every other row. Three
   * properties: VACUOUS maps to UNRUN, DEFER maps to UNRUN, and the summary prints the
   * no-binding count so it cannot be lost. Delete any one and the suite silently reads green. */
  const t = fs.readFileSync(__filename, 'utf8');
  const need = [
    ["VACUOUS folds to UNRUN", /res\.v === 'VACUOUS' \|\| res\.v === 'DEFER'\) \? 'UNRUN'/],
    ["UNRUN IS NOT PASS is printed", /UNRUN IS NOT PASS/],
    ["the no-binding count is printed", /with no binding at all/],
    ["an absent binding returns UNRUN, never PASS", /if \(!b\) return \{ v: 'UNRUN'/],
  ];
  const gone = need.filter(([, re]) => !re.test(t)).map(([n]) => n);
  return gone.length ? FAIL(`the runner has lost ${gone.length} of its 4 empty-population guards: ${gone.join('; ')}`)
    : PASS('all 4 guards present: VACUOUS->UNRUN, DEFER->UNRUN, no-binding->UNRUN, and the count is printed every run');
};
B['INV-13'] = () => {
  /* A fresh clone must carry the machine-readable inputs. Every one of these is CONTENT that a
   * path check passes against while the content is absent, so each is asserted TRACKED BY GIT and
   * NON-EMPTY -- an untracked file is present for the author and gone for the reader, which is the
   * difference this row exists to catch. */
  const need = ['literature/FIELDS.tsv', 'literature/INDEX.tsv',
    'oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv', 'oracle/question_classes.json'];
  const tracked = new Set(sh('git ls-files').out.split('\n').map(s => s.trim()).filter(Boolean));
  const bad = need.filter(p => !tracked.has(p) || !fs.existsSync(R(p)) || fs.statSync(R(p)).size === 0);
  return bad.length ? FAIL(`${bad.length} machine-readable input(s) absent, untracked or empty and so missing from a fresh clone: ${bad.join(' ')}`)
    : PASS(`all ${need.length} machine-readable inputs are tracked and non-empty`);
};

/* --- MUT-1, MUT-6, SLT-5: the suite's own meta-tests, which structural() already computed ---- */
/* These three were UNRUN while the runner was computing them on every run and printing them as
 * `[structural]` lines. The results existed and the rows were not being credited with them, so the
 * suite reported three of its own meta-tests as unmechanized while they were mechanized. Bound to
 * the same function, so there is one implementation and not two. */
const fromStructural = (tag, alt) => (s) => {
  const re = new RegExp('^' + tag + '\\b' + (alt ? '|' + alt : ''));
  const hit = structural(s).find(r => re.test(r.m));
  return hit ? (hit.v === 'PASS' ? PASS(hit.m) : hit.v === 'FAIL' ? FAIL(hit.m) : VAC(hit.m))
    : FAIL(`structural() computed no ${tag} result for ${path.basename(s.file)}`);
};
B['MUT-1'] = fromStructural('MUT-1');
B['MUT-6'] = fromStructural('MUT-6');
B['SLT-5'] = fromStructural('SLT-5', 'declares no test count');

/* ---------------------------------------------------------------- the run */
function runOne(row, suite) {
  const b = B[row.id];
  if (!b) return { v: 'UNRUN', m: 'no binding: this row is a contract a person applies' };
  try { return b(suite); } catch (e) { return FAIL('binding threw: ' + e.message); }
}

let hardFail = 0, totals = { PASS: 0, FAIL: 0, UNRUN: 0 }, deferred = 0, vacuous = 0;
const suiteFiles = opt('suite', null) ? [path.resolve(opt('suite'))] : SUITES.map(R);
console.log('run_suite 1.0 -- ' + suiteFiles.length + ' suite file(s), corpus tree ' + TREE +
  ', cwd ' + ROOT + ' (' + ROOT.length + ' chars)');

for (const f of suiteFiles) {
  if (!fs.existsSync(f)) { console.log(`FAIL  suite file does not exist: ${f}`); hardFail++; continue; }
  const s = parseSuite(f);
  console.log(`\n=== ${path.relative(ROOT, f).replace(/\\/g, '/')} -- ${s.rows.length} rows, ${s.groups.length} groups`);
  for (const r of structural(s)) {
    if (r.v === 'FAIL') { hardFail++; console.log(`  FAIL  [structural] ${r.m}`); }
    else if (VERBOSE || r.v === 'VACUOUS') console.log(`  ${r.v === 'VACUOUS' ? 'UNRUN ' : 'ok    '}[structural] ${r.m}`);
  }
  const byGroup = new Map();
  for (const row of s.rows) {
    if (ONLY_GROUP && row.group !== ONLY_GROUP) continue;
    const res = runOne(row, s);
    const v = (res.v === 'VACUOUS' || res.v === 'DEFER') ? 'UNRUN' : res.v;
    if (!byGroup.has(row.group)) byGroup.set(row.group, { PASS: 0, FAIL: 0, UNRUN: 0, notes: [] });
    const g = byGroup.get(row.group); g[v]++; totals[v]++;
    if (res.v === 'DEFER') deferred++;
    if (res.v === 'VACUOUS') vacuous++;
    if (v === 'FAIL') { hardFail++; g.notes.push(`FAIL  ${row.id}  ${res.m}`); }
    else if (res.v === 'VACUOUS') g.notes.push(`UNRUN ${row.id}  VACUOUS: ${res.m}`);
    else if (res.v === 'DEFER') g.notes.push(`UNRUN ${row.id}  DEFERRED: ${res.m}`);
    else if (v === 'PASS' && VERBOSE) g.notes.push(`ok    ${row.id}  ${res.m}`);
  }
  for (const [g, c] of byGroup) {
    const n = c.PASS + c.FAIL + c.UNRUN;
    console.log(`  ${g.padEnd(5)} ${String(n).padStart(3)} rows  ${String(c.PASS).padStart(3)} pass  ${String(c.FAIL).padStart(3)} fail  ${String(c.UNRUN).padStart(3)} unrun  ${c.FAIL ? 'FAIL' : 'ok'}`);
    for (const note of c.notes) console.log('        ' + note);
  }
}

const n = totals.PASS + totals.FAIL + totals.UNRUN;
console.log(`\n${n} rows: ${totals.PASS} pass, ${totals.FAIL} fail, ${totals.UNRUN} unrun.`);
console.log(`UNRUN IS NOT PASS. ${totals.UNRUN} rows carry no executable binding or ran against an empty population; the suite's own status cell is a claim, not a result.`);
console.log(`  of those ${totals.UNRUN}: ${deferred} DEFERRED (bound, subject not built yet, reason named), ` +
  `${vacuous} VACUOUS (bound, population empty), ${totals.UNRUN - deferred - vacuous} with no binding at all.`);
console.log(hardFail ? `hard failures: ${hardFail}` : 'hard failures: 0');
process.exit(hardFail ? 1 : 0);
