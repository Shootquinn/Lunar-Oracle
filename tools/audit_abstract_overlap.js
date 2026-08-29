#!/usr/bin/env node
/* audit_abstract_overlap.js -- measure verbatim 10-gram overlap between a summary's ## Abstract
 * section and the first pages of its paired source PDF.
 *
 * The corpus is going into a public repository under a public-domain dedication. The dedication
 * covers this project's own summaries and cannot cover the sources they describe. A summary whose
 * abstract is the publisher's abstract retyped is therefore not this project's to dedicate,
 * whether or not it says so.
 *
 * Method: normalize both texts to lowercase word sequences, build the set of 10-word shingles from
 * the summary's abstract, and report the fraction of them that appear in the PDF's own first-page
 * text. Ten words is long enough that shared technical vocabulary does not trigger it and short
 * enough to survive line-break and hyphenation noise from PDF extraction.
 *
 *   node tools/audit_abstract_overlap.js [dir] [threshold] [--sources <dir>]... [--selftest]
 *
 * ============================================================================ 8.9, 2026-08-28
 * REPAIRED AT STEP 8.9 (W5-3). THE DEFECT WAS NOT THE MEASUREMENT, IT WAS THE POPULATION.
 *
 * `node tools/audit_abstract_overlap.js literature 10` -- the invocation the release gate names in
 * RG-2, and the one `oracle/tests/fault_inject.js` decoy I7 fires at -- printed:
 *
 *     tested 0 summaries with a paired PDF and an abstract
 *     skipped: 0 with no ## Abstract section, 0 with no readable paired PDF
 *     AT OR ABOVE 10% VERBATIM: 0
 *
 * and exited 0. Note the second line: it skipped nothing either. The tool did not test 169 files
 * and find them clean, and it did not test 113 and skip 56. It opened NO FILE AT ALL, because
 * `literature/` holds no `.md` at its top level -- the corpus lives one directory down, in eleven
 * taxonomy folders -- and `readdirSync(dir)` does not recurse. The last line and the exit code, the
 * only two things a gate consumes, were byte-identical to a clean corpus. I7 calls this the best
 * decoy in the repository and it was right.
 *
 * THREE REPAIRS, ALL OF THEM STRICTLY STRICTER. None of them lowers a threshold, widens a tolerance
 * or excuses a file. Each one increases the number of files that can be caught.
 *
 *   1. WALK THE TREE, NOT THE DIRECTORY. `literature/` is walked recursively, so the corpus is
 *      reachable from the path the release gate actually names. Flat directories still work, so the
 *      historical `_intake/japanese-miracle/lit` invocation is unchanged and comparable.
 *
 *   2. RESOLVE THE SOURCE ACROSS ROOTS. The old tool looked for `foo.pdf` beside `foo.md`. In this
 *      repository the summaries live under `literature/` and the PDFs live under `_intake/`, and
 *      they never sit beside each other, so same-directory pairing can only ever find zero here.
 *      Sources are now searched across roots -- the walked tree itself, plus `_intake/`, plus any
 *      `--sources` -- by exact basename, then by basename with `_` folded to `-`, then by an
 *      EXACT and UNIQUE DOI shared between the summary and the PDF's first three pages.
 *
 *      Deliberately NOT by fuzzy or partial name match. Eleven summaries were renamed on landing
 *      and their PDFs are on disk under the old name (`colaprete-2010-lcross-water.pdf` against
 *      `colaprete-2010-lcross-ejecta-water-detection.md`, and ten more). A fuzzy matcher would pair
 *      most of them and would also pair `sowers-2019-thermal-mining-ice.pdf` against whichever of
 *      the two `sowers-2019-*` summaries it reached first. A WRONG PAIRING SCORES NEAR ZERO AND
 *      READS AS CLEAN -- it manufactures exactly the false clearance this tool exists to prevent.
 *      Unresolved summaries are listed by name under `--verbose` instead, so the gap is a visible
 *      worklist rather than a guess. The cheap close is a `Source file:` line in those summaries;
 *      that key is honoured here and today only 14 of 169 carry one.
 *
 *   3. VACUOUS IS NOT PASS, AT THE INTERFACE AND NOT ONLY IN THE PROSE. A tested count of zero now
 *      prints a VACUOUS block and exits 3. The old tool was honest in prose -- it printed the
 *      denominator one line up -- and silent in its interface, and a gate does not read prose.
 *      There is also a §KA known-answer test, in the style of `tools/verify_corpus.js`, which
 *      declares the population and the finding set it expects and FAILS on a mismatch in either
 *      direction, so neither a shrinking population nor a silently un-flagged file can pass.
 *
 * THE OUTPUT SHAPES `fault_inject.js` I7 PARSES ARE PRESERVED VERBATIM: a line matching
 * /tested (\d+) summaries/ and a line matching /^AT OR ABOVE .*$/m. I7 passes when tested > 0.
 * Changing those strings would silence the decoy that found this, which is the same failure in a
 * new place.
 *
 * WHAT THIS TOOL STILL DOES NOT DO. It classifies nothing (CHK-02). A percentage is not a verdict:
 * an open-licensed abstract reproduced in full and a copyrighted one reproduced in full score
 * identically, and only reading the source's own licence line separates them. Three of the six
 * findings standing at 8.8 are CC BY 4.0 at source, verified by reading the licence sentence out of
 * each PDF, and they are correctly NOT repaired. The tool reports; a person rules.
 *
 * EXIT CODES.  0 clean and non-vacuous.  1 a §KA known-answer mismatch.  2 usage.  3 VACUOUS --
 * the tested population was zero and this run asserted nothing.
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');

const N = 10;
const ROOT = path.resolve(__dirname, '..');
const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
function shingles(words, n) {
  const out = new Set();
  for (let i = 0; i + n <= words.length; i++) out.add(words.slice(i, i + n).join(' '));
  return out;
}

/* ==================================================================================== §KA
 * KNOWN ANSWERS. Declared here, checked against the artifact on every run over the canonical tree.
 *
 * Taken 2026-08-28 at Step 8.8/8.9 (W5-3), on the author's working copy, AFTER the two AGU repairs
 * of 8.8. These are STRUCTURAL EXPECTATIONS. A mismatch is a FAIL, because the alternative is a
 * tool that re-baselines itself against whatever it happens to find and can therefore never report
 * that the corpus, the source shelf or the finding set moved underneath it.
 *
 * `findings` is the part that earns its keep. Without it, a repair that accidentally deleted an
 * abstract, or a regression that reverted one to the publisher's text, would both still print a
 * plausible number and pass. With it, either direction is a named FAIL.
 *
 * When any of these legitimately moves, the numbers are re-taken IN THIS FILE, in the same edit
 * that moves them. That is the point of writing them down: the update is a visible act.
 *
 * `sourcesPresent` is NOT a count and is deliberately a boolean. `_intake/` is gitignored (RG-9 --
 * no source carrier is tracked), so a FRESH CLONE HAS NO PDFs AND THIS AUDIT IS VACUOUS THERE BY
 * CONSTRUCTION. That is BC-19's two-trees fact -- the author's `literature/` and a clone's have the
 * same name and are permanently different -- and it is a reported state, not a failure of the
 * clone. What must never happen is a clone printing a clean result. It now exits 3.
 */
const KA = {
  at: 'Step 8.8/8.9b (W5-3), 2026-08-28, after all three AGU repairs landed and measured to 0.0%, and the 34 Source file: declarations, measured across all three source roots',
  tree: 'literature',
  threshold: 10,
  corpusFiles: 169,        // .md under literature/, excluding README
  withAbstract: 166,       // of those, carrying an ## Abstract heading the extractor resolves
                           // (declared 167 on first write; the KAT caught the guess on the first
                           //  real run and this is the measured value. Left visible on purpose.)
  resolvedSources: 160,    // of those, paired to a source PDF by declaration, basename or unique DOI
                           // (109 when only _intake/ was searched; the other two roots hold the rest)
  findings: [              // expected at or above KA.threshold, exactly. Not a maximum.
    'mcleod-2017-extraterrestrial-ree.md',                    // 74.0  CC BY 4.0 at source
    'castillo-rogez-2022-ceres-habitability.md',              // 54.1  CC BY 4.0 at source
    'andrews-hanna-2025-spa-magma-ocean.md',                  // 40.9  CC BY 4.0 at source
    'lawrence-2003-small-area-thorium.md',                    // 11.4  project prose, clause carryover
    'nasa-2025-fission-surface-power-directive.md',           // 11.3  US Govt work, public domain
    'wilson-2018-lp-thorium-reconstruction.md',               // 11.2  project prose, clause carryover
  ],
};

/* ------------------------------------------------------------------ source text extraction
 * Injectable so `--selftest` can drive the scoring and reporting core with known texts. Building a
 * PDF to test a PDF reader is not possible here without a writer; substituting the extractor is,
 * and it tests the part that can actually be wrong -- the shingle engine, the heading regex, the
 * population ledger and the vacuous verdict. */
let extractText = function (file, pages) {
  try {
    return cp.execFileSync('pdftotext', ['-f', '1', '-l', String(pages), file, '-'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch { return null; }
};
function havePdftotext() {
  /* `pdftotext -v` prints its banner to stderr and EXITS 99 on poppler. A probe that treated any
   * non-zero exit as absent therefore printed "pdftotext IS NOT ON THE PATH" on a run that had just
   * read 109 PDFs successfully -- a false alarm on the one line a reader would use to explain a
   * zero. Only ENOENT means absent. Found by the first real run, not by reading the line. */
  try { cp.execFileSync('pdftotext', ['-v'], { stdio: 'ignore' }); return true; }
  catch (e) { return e.code !== 'ENOENT'; }
}

function abstractOf(md) {
  /* REPAIRED 2026-08-28 (W2-2), against PRV-15. The shipped pattern was
   *     /^##+\s*Abstract\s*$([\s\S]*?)(?=^##\s)/mi
   * and it returned null on 73 of the 267 union files that carry an Abstract heading, for TWO
   * independent reasons, both of them a regex asserting a document shape the corpus does not have:
   *
   *   HEADING SHAPE (18 files, tree-wide). `\s*$` after `Abstract` demands a BARE heading. Every
   *   annotated one was skipped -- `## Abstract (transcribed from title page)`, `## Abstract
   *   (transcribed)`, `## Abstract (as transcribed / paraphrased from the paper)`. All 18 carry the
   *   word "transcribed" IN THE HEADING, which is exactly the population PRV-15 exists to measure.
   *   The instrument was blind to its own target set and returned zero findings on it.
   *
   *   TERMINATOR (55 more files, and nobody had named this one). `(?=^##\s)` demands a FOLLOWING
   *   `##` heading. In most summaries the Abstract is the LAST section, so there is nothing to look
   *   ahead to and the match fails on a perfectly well-formed bare heading. Three times the size of
   *   the defect I was sent to fix, same class, found by measuring instead of by reading the line.
   *
   * Measured on the 271-file union: 194 extracted before, 267 after. The 4 remaining files carry
   * no Abstract heading at all and correctly return null. */
  const m = md.match(/^##+[ \t]*Abstract\b[^\n]*$([\s\S]*?)(?=^##[ \t]|$(?![\s\S]))/mi);
  return m ? m[1].trim() : null;
}

/* ------------------------------------------------------------------------------ file walking */
function walk(dir, re, out) {
  out = out || [];
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== '.git' && e.name !== 'node_modules') walk(p, re, out); }
    else if (re.test(e.name)) out.push(p);
  }
  return out;
}

const DOI_RE = /\b10\.\d{4,9}\/[-._;()\/:a-z0-9]+/gi;
const cleanDoi = d => d.toLowerCase().replace(/[)>\].,;`"']+$/, '');
const normBase = b => b.toLowerCase().replace(/_/g, '-');

/* -------------------------------------------------------------------------- source index */
function indexSources(roots, pages) {
  const byBase = new Map(), byNorm = new Map(), byDoi = new Map();
  const seen = new Set();
  for (const r of roots) {
    for (const p of walk(r, /\.pdf$/i)) {
      const real = path.resolve(p);
      if (seen.has(real)) continue;
      seen.add(real);
      const b = path.basename(p).replace(/\.pdf$/i, '');
      if (!byBase.has(b.toLowerCase())) byBase.set(b.toLowerCase(), []);
      byBase.get(b.toLowerCase()).push(p);
      const nb = normBase(b);
      if (!byNorm.has(nb)) byNorm.set(nb, []);
      byNorm.get(nb).push(p);
    }
  }
  return { byBase, byNorm, byDoi, doiBuilt: false, pages };
}
function buildDoiIndex(idx) {
  if (idx.doiBuilt) return;
  idx.doiBuilt = true;
  const all = new Set();
  for (const list of idx.byBase.values()) for (const p of list) all.add(p);
  for (const p of all) {
    const t = extractText(p, idx.pages);
    if (!t) continue;
    for (const d of new Set((t.match(DOI_RE) || []).map(cleanDoi))) {
      if (!idx.byDoi.has(d)) idx.byDoi.set(d, []);
      idx.byDoi.get(d).push(p);
    }
  }
}

/* ------------------------------------------------------------------ candidate disambiguation
 * ADDED WHEN THE SEARCH WIDENED TO THREE ROOTS (8.9b). The resolver requires ONE candidate. With a
 * single root that was almost free; across three overlapping trees it is not, because the same
 * paper is genuinely present in more than one of them -- `_intake/japanese-miracle/lit/` is a
 * partial copy of `Japanese Miracle Lit Review\lit\`, and `CSA_LSEI_Workshops` carries a third
 * copy of much of it. A resolver that treats "two candidates" as ambiguity would have turned every
 * duplicated paper into an UNMEASURED file, and WIDENING THE SEARCH WOULD HAVE LOWERED THE
 * MEASURED POPULATION. That is the opposite of the instruction and it would have looked like a
 * finding.
 *
 * The distinction that matters is content, not count. Several paths holding BYTE-IDENTICAL PDFs are
 * one source filed in several places and resolve normally. Several paths holding DIFFERENT PDFs
 * under one name are real ambiguity -- two editions, a preprint against the published version, two
 * different papers colliding on a slug -- and are a REPORTED SKIP, never a guess. Picking one would
 * be the fuzzy matching this tool refuses, arrived at by a different route: a wrong pick scores near
 * zero and reads as clean. */
function digest(p) {
  try { return require('crypto').createHash('sha256').update(fs.readFileSync(p)).digest('hex'); }
  catch { return 'UNREADABLE:' + p; }
}
function pickUnique(cands) {
  if (!cands || !cands.length) return null;
  if (cands.length === 1) return { pdf: cands[0], copies: 1 };
  const seen = new Map();
  for (const p of cands) { const d = digest(p); if (!seen.has(d)) seen.set(d, p); }
  if (seen.size === 1) return { pdf: cands[0], copies: cands.length };
  return { ambiguous: seen.size, cands };
}

/* Resolve one summary to one source PDF. Exact mechanisms only, each reported by name so the
 * pairing is auditable. `null` means unresolved, which is a REPORTED SKIP and never a pass. */
function resolveSource(mdPath, mdText, idx) {
  const base = path.basename(mdPath).replace(/\.md$/i, '');
  const note = n => n > 1 ? ` (${n} identical copies across roots)` : '';
  let amb = null;
  const declared = mdText.match(/^[-*]?\s*\*{0,2}Source file:?\*{0,2}:?\s*`?([^`\n(]+)/mi);
  if (declared) {
    const nm = path.basename(declared[1].trim()).replace(/\.pdf$/i, '').toLowerCase();
    const r = pickUnique(idx.byBase.get(nm));
    if (r && r.pdf) return { pdf: r.pdf, how: 'declared Source file:' + note(r.copies) };
    if (r && r.ambiguous) amb = amb || r;
  }
  const r1 = pickUnique(idx.byBase.get(base.toLowerCase()));
  if (r1 && r1.pdf) return { pdf: r1.pdf, how: 'basename' + note(r1.copies) };
  if (r1 && r1.ambiguous) amb = amb || r1;
  const r2 = pickUnique(idx.byNorm.get(normBase(base)));
  if (r2 && r2.pdf) return { pdf: r2.pdf, how: 'basename (_ folded to -)' + note(r2.copies) };
  if (r2 && r2.ambiguous) amb = amb || r2;
  buildDoiIndex(idx);
  for (const d of new Set((mdText.match(DOI_RE) || []).map(cleanDoi))) {
    const r3 = pickUnique(idx.byDoi.get(d));
    if (r3 && r3.pdf) return { pdf: r3.pdf, how: 'unique DOI ' + d + note(r3.copies) };
    if (r3 && r3.ambiguous) amb = amb || r3;
  }
  if (amb) return { ambiguous: amb.ambiguous, cands: amb.cands };
  return null;
}

/* ------------------------------------------------------------------------------- the audit */
function audit(opts) {
  const { tree, thresh, sourceRoots, pages } = opts;
  const idx = indexSources(sourceRoots, pages);
  const mds = walk(tree, /\.md$/i).filter(p => !/^readme\.md$/i.test(path.basename(p)));

  const rows = [], noAbstract = [], noSource = [], unreadable = [], emptyAbstract = [], ambiguous = [];
  for (const f of mds) {
    const md = fs.readFileSync(f, 'utf8');
    const abs = abstractOf(md);
    if (!abs) { noAbstract.push(f); continue; }
    const src = resolveSource(f, md, idx);
    if (src && src.ambiguous) { ambiguous.push({ f, n: src.ambiguous, cands: src.cands }); continue; }
    if (!src) { noSource.push(f); continue; }
    const txt = extractText(src.pdf, pages);
    if (!txt) { unreadable.push(f); continue; }
    const a = shingles(norm(abs), N);
    if (!a.size) { emptyAbstract.push(f); continue; }
    const s = shingles(norm(txt), N);
    let hit = 0; for (const g of a) if (s.has(g)) hit++;
    rows.push({ f, name: path.basename(f), pct: 100 * hit / a.size, grams: a.size, how: src.how });
  }
  rows.sort((x, y) => y.pct - x.pct);
  return { rows, mds, noAbstract, noSource, unreadable, emptyAbstract, ambiguous, idx,
    flagged: rows.filter(r => r.pct >= thresh) };
}

/* ---------------------------------------------------------------------------- §KA runner */
function knownAnswers(res, opts, treeRel) {
  const out = [];
  if (treeRel !== KA.tree) {
    out.push(['VACUOUS', `KA the known answers are declared for ${KA.tree}/ and this run walked "${treeRel}". They were NOT compared, and this run certifies nothing about corpus size, source coverage or the finding set`]);
    return out;
  }
  if (opts.thresh !== KA.threshold) {
    out.push(['VACUOUS', `KA the known answers are declared at threshold ${KA.threshold}% and this run used ${opts.thresh}%. The finding set was NOT compared`]);
    return out;
  }
  if (!res.rows.length) {
    out.push(['VACUOUS', `KA the tested population is zero, so every declared count is compared against nothing. THIS IS THE CASE THE KNOWN-ANSWER TEST EXISTS FOR: a tool that printed a clean line here would be certifying ${KA.corpusFiles} files it never opened`]);
    return out;
  }
  const cmp = (label, exp, got) => out.push(exp === got
    ? ['OK', `KA ${label} = ${got}, as declared`]
    : ['FAIL', `KA ${label}: this tool declares ${exp} (taken at ${KA.at}) and measured ${got}. One of the two is wrong and the tool will not guess which; re-take the known answers in tools/audit_abstract_overlap.js §KA in the same edit that moved them`]);

  cmp('corpus .md files', KA.corpusFiles, res.mds.length);
  cmp('files with an extractable Abstract', KA.withAbstract, res.mds.length - res.noAbstract.length);
  cmp('summaries paired to a source', KA.resolvedSources, res.rows.length + res.unreadable.length + res.emptyAbstract.length);

  const got = new Set(res.flagged.map(r => r.name));
  const exp = new Set(KA.findings);
  for (const n of exp) if (!got.has(n))
    out.push(['FAIL', `KA finding "${n}" is declared at or above ${KA.threshold}% and did NOT appear. Either its abstract was repaired -- in which case re-take §KA in the same edit -- or its source stopped resolving and the file is now UNMEASURED rather than clean`]);
  for (const n of got) if (!exp.has(n))
    out.push(['FAIL', `KA "${n}" measured at or above ${KA.threshold}% and is NOT in the declared finding set. A new reproduction has landed, or an existing summary was replaced with source text. It needs a licence ruling before release`]);
  if (got.size === exp.size && [...exp].every(n => got.has(n)))
    out.push(['OK', `KA finding set = ${exp.size} files, exactly as declared`]);
  return out;
}

/* -------------------------------------------------------------------------------- selftest
 * The known-answer test of the ENGINE, in the spirit of `verify_corpus.js --selftest`. Each case
 * plants a fixture with a known right answer and proves the tool reaches it. The case that matters
 * most is the last one: an empty population must go red, because that is the state that shipped. */
function selftest() {
  const os = require('os');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aao-selftest-'));
  const SRC = 'the lunar regolith at the south pole contains water ice in permanently shadowed craters ' +
    'and the abundance of that ice is the single largest open question for any propellant architecture';
  const write = (n, body) => { fs.writeFileSync(path.join(dir, n + '.md'), body, 'utf8');
    fs.writeFileSync(path.join(dir, n + '.pdf'), 'x', 'utf8'); };

  write('identical', '# t\n\n## Abstract\n' + SRC + '\n');
  write('annotated', '# t\n\n## Abstract (transcribed from title page)\n' + SRC + '\n\n## Summary\nx\n');
  write('lastsection', '# t\n\n## Summary\nx\n\n## Abstract\n' + SRC + '\n');
  write('disjoint', '# t\n\n## Abstract\n' +
    'orbital mechanics of low energy transfers through the earth moon lagrange points require ' +
    'careful phasing and a launch window measured in days rather than in minutes\n');
  write('noabstract', '# t\n\n## Summary\nno abstract heading here at all\n');

  const saved = extractText;
  extractText = () => SRC;
  const cases = [], fail = [];
  const res = audit({ tree: dir, thresh: 10, sourceRoots: [dir], pages: 3 });
  const by = new Map(res.rows.map(r => [r.name, r]));
  const check = (label, cond, got) => { cases.push([cond, label, got]); if (!cond) fail.push(label); };

  check('identical abstract scores 100.0%', by.get('identical.md') && by.get('identical.md').pct === 100,
    by.get('identical.md') ? by.get('identical.md').pct.toFixed(1) + '%' : 'NOT TESTED');
  check('disjoint abstract scores 0.0%', by.get('disjoint.md') && by.get('disjoint.md').pct === 0,
    by.get('disjoint.md') ? by.get('disjoint.md').pct.toFixed(1) + '%' : 'NOT TESTED');
  check('ANNOTATED heading is extracted (the W2-2 regression: `## Abstract (transcribed...)`)',
    by.has('annotated.md') && by.get('annotated.md').pct === 100,
    by.has('annotated.md') ? by.get('annotated.md').pct.toFixed(1) + '%' : 'SKIPPED -- the tool is blind to its own target set');
  check('Abstract as LAST section is extracted (the terminator regression)',
    by.has('lastsection.md') && by.get('lastsection.md').pct === 100,
    by.has('lastsection.md') ? by.get('lastsection.md').pct.toFixed(1) + '%' : 'SKIPPED');
  check('a file with no Abstract heading is a reported skip, not a silent one',
    res.noAbstract.length === 1, res.noAbstract.length + ' reported');
  check('the threshold flags the reproductions and only them',
    res.flagged.length === 3, res.flagged.length + ' flagged (identical, annotated, lastsection)');

  /* THE ONE THIS TOOL SHIPPED BROKEN. An empty tree must not produce a clean-looking result. */
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'aao-empty-'));
  const vac = audit({ tree: empty, thresh: 10, sourceRoots: [empty], pages: 3 });
  check('an EMPTY population is VACUOUS, not clean -- tested 0 must not read as a pass',
    vac.rows.length === 0, 'tested ' + vac.rows.length + '; the caller must exit 3 on this');

  /* And a summary whose source is absent must be a reported skip rather than a scored zero. */
  const orph = fs.mkdtempSync(path.join(os.tmpdir(), 'aao-orphan-'));
  fs.writeFileSync(path.join(orph, 'lonely.md'), '# t\n\n## Abstract\n' + SRC + '\n', 'utf8');
  const o = audit({ tree: orph, thresh: 10, sourceRoots: [orph], pages: 3 });
  check('a summary with NO source is skipped and named, never scored 0%',
    o.rows.length === 0 && o.noSource.length === 1,
    o.rows.length + ' scored, ' + o.noSource.length + ' reported unresolved');

  extractText = saved;
  for (const d of [dir, empty, orph]) { try { fs.rmSync(d, { recursive: true, force: true }); } catch {} }

  console.log('--selftest: known-answer test of the scoring engine, the heading extractor and the\n' +
    '            population ledger. Each case has a right answer declared in this file.\n');
  for (const [ok, label, got] of cases) console.log((ok ? '  OK   ' : '  FAIL ') + label + '  ->  ' + got);
  console.log('\n' + (fail.length ? 'SELFTEST FAILED: ' + fail.length + ' of ' + cases.length
    : 'SELFTEST PASSED: ' + cases.length + ' of ' + cases.length));
  return fail.length ? 1 : 0;
}

/* ------------------------------------------------------------------------------------ main */
function main(argv) {
  const args = [], sources = [];
  let verbose = false;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--selftest') return selftest();
    else if (argv[i] === '--verbose') verbose = true;
    else if (argv[i] === '--sources') sources.push(argv[++i]);
    else args.push(argv[i]);
  }
  const tree = args[0] || 'literature';
  const thresh = Number(args[1] || 10);
  if (!fs.existsSync(tree)) {
    console.error('usage: audit_abstract_overlap.js [dir] [threshold%] [--sources <dir>]... [--selftest] [--verbose]');
    console.error(`       "${tree}" does not exist`);
    return 2;
  }
  const treeRel = path.relative(ROOT, path.resolve(tree)).split(path.sep).join('/') || tree;

  /* ------------------------------------------------------------------------- source roots
   * The walked tree (so flat paired directories still work exactly as before), then the in-repo
   * shelves, then MACHINE-LOCAL roots, then anything the caller named with --sources.
   *
   * Machine-local roots exist because the sources for this corpus are NOT all in this repository
   * and never will be: `_intake/` is gitignored under RG-9 and holds a partial copy, while the
   * bulk lives in the author's own trees outside the repo. Measuring only `_intake/` under-reported
   * the population and produced a 57-file "unmeasured" list that was mostly an artifact of where
   * the tool looked.
   *
   * They are read from `tools/source_roots.local` (one path per line, `#` comments) and from
   * $LUNAR_ORACLE_SOURCE_ROOTS. Both are OPTIONAL and neither is tracked: absolute paths into
   * somebody's OneDrive are machine state, not repository content, and hardcoding one here would
   * ship a dead path to every clone. A clone with neither file configured finds no sources and is
   * VACUOUS, which is correct and is exit 3.
   *
   * THESE ROOTS ARE READ-ONLY. This tool opens PDFs for text and hashes them for identity. It does
   * not copy, move, write or delete anything under them, and no PDF enters version control. */
  const roots = [tree];
  for (const d of ['_intake', 'literature/_pdf']) {
    const p = path.join(ROOT, d);
    if (fs.existsSync(p) && path.resolve(p) !== path.resolve(tree)) roots.push(p);
  }
  const cfg = path.join(ROOT, 'tools', 'source_roots.local');
  if (fs.existsSync(cfg)) for (const line of fs.readFileSync(cfg, 'utf8').split(/\r?\n/)) {
    const s = line.replace(/^\s+|\s+$/g, '');
    if (!s || s.startsWith('#')) continue;
    if (fs.existsSync(s)) roots.push(s);
    else console.log(`  NOTE: source_roots.local names a path that does not exist: ${s}`);
  }
  if (process.env.LUNAR_ORACLE_SOURCE_ROOTS)
    for (const s of process.env.LUNAR_ORACLE_SOURCE_ROOTS.split(path.delimiter))
      if (s && fs.existsSync(s)) roots.push(s);
  for (const s of sources) roots.push(s);

  const pdftotext = havePdftotext();
  const res = audit({ tree, thresh, sourceRoots: roots, pages: 3 });
  const measurable = res.rows.length;
  const sourcesOnDisk = res.idx.byBase.size;

  /* --------------------------------------------------------------- the population ledger */
  console.log(`tree: ${treeRel}/   threshold: ${thresh}%   shingle: ${N} words`);
  console.log(`source roots searched: ${roots.map(r => path.relative(ROOT, path.resolve(r)).split(path.sep).join('/') || '.').join(', ')}`);
  console.log(`source PDFs found on disk: ${sourcesOnDisk}` + (pdftotext ? '' : '   [pdftotext IS NOT ON THE PATH -- no PDF could be read this run]'));
  console.log('');
  console.log(`tested ${measurable} summaries with a paired PDF and an abstract`);
  console.log(`population: ${res.mds.length} .md walked; ${res.mds.length - res.noAbstract.length} carry an extractable Abstract`);
  console.log(`skipped: ${res.noAbstract.length} with no ## Abstract section, ` +
    `${res.noSource.length} with no source PDF resolvable on disk, ` +
    `${res.ambiguous.length} whose candidates differ in content under one name, ` +
    `${res.unreadable.length} whose paired PDF would not extract, ` +
    `${res.emptyAbstract.length} whose abstract is too short to shingle`);
  console.log(`median overlap ${measurable ? res.rows[Math.floor(measurable / 2)].pct.toFixed(1) : 'n/a'}%`);
  console.log('');

  /* ------------------------------------------------------------------ VACUOUS IS NOT PASS */
  if (measurable === 0) {
    console.log('AT OR ABOVE ' + thresh + '% VERBATIM: 0 OF 0 TESTED -- VACUOUS, NOT CLEAN');
    console.log('');
    console.log('  VACUOUS. THIS RUN ASSERTED NOTHING. The tested population was zero, so the zero');
    console.log('  above is the size of an empty set and not a finding about this corpus. A clean');
    console.log('  corpus and an unexamined one print the same number, and this tool will not let');
    console.log('  the two share an exit code.');
    console.log('');
    if (!pdftotext) {
      console.log('  CAUSE: `pdftotext` is not on the PATH, so no source could be read whatever else');
      console.log('  is on disk. Install poppler-utils and re-run.');
    } else if (sourcesOnDisk === 0) {
      console.log('  CAUSE: no source PDF was found under any of the roots above. `_intake/` is');
      console.log('  gitignored (RG-9: no source carrier is tracked), so A FRESH CLONE CANNOT RUN');
      console.log('  THIS AUDIT AT ALL. That is BC-19\'s two-trees fact and it is expected on a');
      console.log('  clone -- but it is a VACUOUS state, never a clearance. Point --sources at a');
      console.log('  shelf of PDFs, or run sub-step 2.11 (the PDF pull), then re-run.');
    } else if (res.mds.length === 0) {
      console.log(`  CAUSE: no .md file was found under ${treeRel}/ at all.`);
    } else {
      console.log(`  CAUSE: ${sourcesOnDisk} source PDFs are on disk but none resolved to a summary.`);
    }
    console.log('');
    console.log('  VACUOUS IS NOT PASS.  exit 3');
    return 3;
  }

  /* ------------------------------------------------------------------------- the findings */
  console.log(`AT OR ABOVE ${thresh}% VERBATIM: ${res.flagged.length} of ${measurable} tested`);
  for (const r of res.flagged)
    console.log('  ' + r.pct.toFixed(1).padStart(5) + '%  ' + r.name + '  (' + r.grams + ' shingles, paired by ' + r.how + ')');
  if (!res.flagged.length) console.log(`  none -- and ${measurable} summaries were genuinely opened and measured to say so`);
  console.log('');
  console.log('  A PERCENTAGE IS NOT A VERDICT. This tool classifies nothing (CHK-02). An abstract');
  console.log('  reproduced in full under CC BY and one reproduced in full under all-rights-reserved');
  console.log('  score identically; only the source\'s own licence line separates them, and only a');
  console.log('  person reading it can rule. High overlap is a question, not a violation.');

  /* -------------------------------------------------------------------- unmeasured worklist */
  if (res.noSource.length) {
    console.log('');
    console.log(`UNMEASURED: ${res.noSource.length} summaries carry an abstract that could not be checked because`);
    console.log('no source PDF resolved. These are NOT clean; nothing was compared against them.');
    for (const f of res.noSource)
      console.log('  ' + path.relative(ROOT, f).split(path.sep).join('/'));
  }
  if (res.ambiguous.length) {
    console.log('');
    console.log(`AMBIGUOUS: ${res.ambiguous.length} summaries matched more than one source that DIFFER in`);
    console.log('content under the same name. Not guessed -- a wrong pairing scores near zero and reads clean.');
    for (const a of res.ambiguous) {
      console.log('  ' + path.relative(ROOT, a.f).split(path.sep).join('/') + `  (${a.n} distinct candidates)`);
      if (verbose) for (const c of a.cands) console.log('      ' + c);
    }
  }

  /* ------------------------------------------------------------------------------ the KAT */
  console.log('');
  const ka = knownAnswers(res, { thresh }, treeRel);
  for (const [v, m] of ka) console.log('  ' + v.padEnd(8) + m);
  const kaFail = ka.filter(x => x[0] === 'FAIL').length;
  console.log('');
  if (kaFail) { console.log(`KNOWN-ANSWER TEST FAILED: ${kaFail} mismatch(es).  exit 1`); return 1; }
  return 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { abstractOf, shingles, norm, audit, KA };
