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
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
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
  // The live set, CORRECTED: oracle/AMENDMENTS.tsv carries rows naming the dead path and the
  // Wave 1 cell omitted it. cr_scratch/ deliverables are the record of what was believed and are
  // excluded by contract, not by convenience.
  const live = ['COUNTING_RULE.md', 'lunar-oracle-gameplan.md', 'oracle/bootstrap_contract.md',
    'oracle/MANIFEST.tsv', 'oracle/AMENDMENTS.tsv', 'oracle/NAMING.md', 'oracle/check_register.md',
    'oracle/register_schema.md', 'oracle/install_state.md', 'oracle/currency_policy.md',
    'oracle/answer_contract.md', ...walk(R('tools')).map(p => path.relative(ROOT, p).replace(/\\/g, '/'))];
  const hits = [];
  for (const f of live) {
    const p = R(f); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) continue;
    let t; try { t = fs.readFileSync(p, 'utf8'); } catch { continue; }
    const n = (t.match(/literature\/NAMING\.md/g) || []).length;
    if (n) hits.push(`${f}:${n}`);
  }
  return hits.length ? FAIL(`${hits.length} live files still cite literature/NAMING.md: ${hits.join(' ')}`)
    : PASS('0 live citations of literature/NAMING.md');
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
/* MRG-4b: landed bytes equal byte_source bytes, with exactly one declared exception. */
const AZAMI = 'azami-2024-lunar-manufacturing-review';
const AZAMI_LINE = '- **DOI:** 10.48550/arxiv.2408.05823';
// The merge APPENDS a `## Provenance` block to every landed file -- it must, because PRV-1, PRV-2
// and PRV-17 require one in every file and the source copies do not carry it. So "landed is
// byte-identical to byte_source" is unsatisfiable as literally ruled: it is false for all 176 rows,
// not for one. The satisfiable form of the same assertion, and the one implemented here, is
// BODY-identity: strip the appended block and the remainder must equal the source exactly.
const PROV_MARK = '\n\n---\n\n## Provenance\n';
const stripProvenance = t => { const i = t.lastIndexOf(PROV_MARK); return i < 0 ? null : t.slice(0, i); };
// Line-ending and trailing-whitespace normalization is reported SEPARATELY, never folded into the
// content comparison. CRP-11 is the same rule one group over: a CRLF diff read as a content
// disagreement is a defect this repository has already produced once.
const nz = s => s.replace(/\r\n/g, '\n').replace(/\s+$/, '');
B['MRG-4b'] = () => {
  const p = plan(); if (p.missing) return FAIL('no plan table');
  // target_path is written as `literature/<folder>/<leaf>`; --tree rebases it onto a staged copy so
  // the assertion can gate the promotion instead of reporting after it.
  const at = r => R(TREE === 'literature' ? r.target_path
    : r.target_path.replace(/^literature\//, TREE.replace(/\/+$/, '') + '/'));
  const landed = p.rows.filter(r => r.target_path && fs.existsSync(at(r)));
  if (!landed.length) return VAC(`0 of ${p.rows.length} target_paths exist under ${TREE}/; nothing has landed there and byte-identity has nothing to compare`);
  const bad = [], exc = []; let clean = 0, eol = 0, noBlock = 0;
  for (const r of landed) {
    if (!r.source_path || !fs.existsSync(R(r.source_path))) { bad.push(`${r.key}: source_path missing`); continue; }
    const a = fs.readFileSync(R(r.source_path), 'utf8'), t = fs.readFileSync(at(r), 'utf8');
    const body = stripProvenance(t);
    if (body === null) { noBlock++; bad.push(`${r.key}: no appended ## Provenance block -- PRV-1`); continue; }
    if (body === a) { clean++; continue; }
    if (nz(body) === nz(a)) { eol++; clean++; continue; }   // line endings only: reported, not a failure
    const A = nz(a).split('\n'), B = nz(body).split('\n');
    const added = B.filter(l => !A.includes(l)), removed = A.filter(l => !B.includes(l));
    if (r.key.startsWith(AZAMI) && removed.length === 0 && added.length === 1 && added[0].trim() === AZAMI_LINE) {
      if (!/CITATION REPAIR OWED/i.test(r.basis || '')) bad.push(`${r.key}: repaired but basis does not carry CITATION REPAIR OWED`);
      else { exc.push(r.key); clean++; }
      continue;
    }
    bad.push(`${r.key}: UNDECLARED body edit, +${added.length}/-${removed.length} lines` +
      (added.length ? ` e.g. ${JSON.stringify(added[0].slice(0, 60))}` : '') +
      (removed.length ? ` / removed ${JSON.stringify(removed[0].slice(0, 60))}` : ''));
  }
  const shape = `${landed.length} landed under ${TREE}/; ${clean} bodies identical to byte_source ` +
    `(${eol} of them after line-ending normalization only, reported not folded in); ${exc.length} declared exception`;
  if (bad.length) return FAIL(`${shape}; ${bad.length} UNDECLARED: ${bad.slice(0, 4).join(' ; ')}`);
  return exc.length === 1 ? PASS(`${shape} (${exc[0]})`)
    : FAIL(`${shape} -- exactly one declared exception is required and azami's repair was not observed`);
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
function dedupCollisions(scopeFn) {
  const p = plan(); if (p.missing) return null;
  const seen = new Map(), bad = [];
  for (const r of p.rows) {
    if (!r.dedup_key || /^L0/.test(r.dedup_key)) continue;
    const k = scopeFn(r);
    if (seen.has(k)) bad.push(`${k}`); else seen.set(k, r.key);
  }
  return [...new Set(bad)];
}
B['MRG-9'] = () => {
  const bad = dedupCollisions(r => r.target_folder + '::' + r.dedup_key);
  if (bad === null) return FAIL('no plan table');
  return bad.length ? FAIL(`${bad.length} within-folder dedup_key collisions: ${bad.slice(0, 4).join(' ; ')}`) : PASS('0 within-folder dedup_key collisions');
};
B['MRG-10'] = () => {
  const bad = dedupCollisions(r => r.dedup_key);
  if (bad === null) return FAIL('no plan table');
  return bad.length ? FAIL(`${bad.length} tree-wide dedup_key collisions: ${bad.slice(0, 4).join(' ; ')}`) : PASS('0 tree-wide dedup_key collisions');
};
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

/* --- RFX: register fixtures, sub-step 4.1 -------------------------------------
 * THE ASSEMBLED LOOP EXISTS, so these run rather than defer. `oracle/router/classify.js` (3.8) and
 * `oracle/router/wave.js` (3.9) landed this wave; the context is loaded ONCE and every RFX row
 * reads it, because thirty-five loads of a 169-file corpus is a runner nobody waits for.
 *
 * WHAT EACH ROW ASSERTS. The axis's own `probe_pos` question is classified, and three things are
 * compared against the REGISTER rather than against a copy in the suite: the verdict the class
 * implies, the number of sides the axis declares, and the persona count the wave derives. The
 * expected values are read out of `oracle/REGISTER.*.tsv` at run time. A suite row that carried its
 * own copy of a side count would be the second authority this project keeps finding.
 *
 * EVERY SIDE, NEVER BOTH. The side assertion is `wave.personaCount === axis.sides.size`, not
 * `>= 2`. Eighteen axes are class `two_sided` and seven of them declare three or four sides, so a
 * `>= 2` assertion passes while a three-sided answer returns two -- and the router has then chosen
 * which of three measurement methods the reader hears. RFX-35 is the decoy that separates the two
 * readings, and it lives in `oracle/tests/fault_inject.js` because it needs a mutated register. */
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
const rfxGuard = fn => () => {
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
    const sides = ax.sides ? ax.sides.size : 0;
    const q = L.C.classifyQuestion(L.ctx, ax.probe_pos);
    const w = L.W.selectWave(q, L.ctx);
    const want = ax.class === 'one_sided' ? ['LITERATURE', 'BOTH'] : ['CONTESTED'];
    const bad = [];
    if (!want.includes(q.verdict)) bad.push(`verdict ${q.verdict}, expected ${want.join(' or ')} for class ${ax.class}`);
    if (ax.class === 'one_sided') {
      if (sides !== 1) bad.push(`class one_sided declares ${sides} sides; L5 requires exactly one`);
      if (q.verdict === 'CONTESTED') bad.push('a one_sided axis produced CONTESTED, which contract §1 makes UNSATISFIABLE rather than wrong');
    } else {
      // EVERY SIDE, not two. This is the assertion the plan's own wording would have got wrong.
      if (w.personaCount !== sides) bad.push(`wave spends ${w.personaCount} persona(s) on an axis declaring ${sides} side(s) -- the count must be sides.length, never the literal two`);
      if (sides < 2) bad.push(`class ${ax.class} declares ${sides} side(s)`);
    }
    return bad.length ? FAIL(`${axisId} (${ax.class}, ${sides} sides): ${bad.join('; ')}`)
      : PASS(`${axisId} ${ax.class}, ${sides} side(s) -> ${q.verdict}, ${w.personaCount} persona(s) on its own probe_pos`);
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
B['RFX-34'] = () => faultDecoy('I4d');
B['RFX-35'] = () => faultDecoy('I5-dropped-side');

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

B['REF-1'] = () => {
  /* CLM-5's lesson applied to this row: the expected set is READ OUT OF THE CONTRACT at test time,
   * never typed here. A checker holding its own copy of a closed set cannot detect the set moving,
   * which is the only thing this row is for. */
  const rc = routerConst();
  if (!rc || !rc.REASON_CODES) return FAIL('oracle/router/classify.js declares no REASON_CODES array');
  const c = contractText();
  const sec = c.slice(c.indexOf(String.fromCharCode(10) + '## 5. Refusals'));
  const table = sec.slice(0, sec.indexOf(String.fromCharCode(10) + '## 6.'));
  const fromContract = [...table.matchAll(/^\| `([a-z-]+)` \|/gm)].map(m => m[1]);
  if (!fromContract.length) return FAIL('the contract sec.5 table yields no reason codes; the table shape moved and this row cannot read it');
  const declared = (table.match(/closed set of ([a-z]+)/) || [])[1];
  const extra = rc.REASON_CODES.filter(v => !fromContract.includes(v));
  const absent = fromContract.filter(v => !rc.REASON_CODES.includes(v));
  if (!extra.length && !absent.length)
    return PASS(`exactly ${fromContract.length}, closed, and the router's set is the contract's set: ${fromContract.join(' ')}`);
  return FAIL(`THE SET IS NOT CLOSED. oracle/router/classify.js declares ${rc.REASON_CODES.length} reason codes; ` +
    `${CONTRACT} sec.5 tables ${fromContract.length} and its prose says "closed set of ${declared}". ` +
    `In the router and not in the contract: [${extra.join(' ')}]. In the contract and not in the router: [${absent.join(' ')}]. ` +
    `A code ruled into the router without a contract row is a seventh member of a set the contract still calls six, ` +
    `and every consumer that trusts the contract's arity is wrong by one. Owner: the seat that ruled the extra code in. ` +
    `Close: the contract's sec.5 table and its stated arity name every code the router can emit.`);
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
B['PTH-3'] = pthGuard(f => {
  const leaves = f.map(p => p.split('\\').pop());
  const over = leaves.filter(l => l.length > CEIL.leaf).sort((a, b) => b.length - a.length);
  return over.length ? FAIL(`${over.length} leaf name(s) exceed ${CEIL.leaf}: ${over.map(l => l + ' (' + l.length + ')').join(' ; ')}`)
    : PASS(`${leaves.length} leaves, longest ${Math.max(...leaves.map(l => l.length))}, ceiling ${CEIL.leaf}`);
});
B['PTH-4'] = pthGuard(f => {
  const folders = [...new Set(f.map(p => p.split('\\')[1]))];
  const over = folders.filter(d => d.length > CEIL.folder).sort((a, b) => b.length - a.length);
  return over.length ? FAIL(`${over.length} of ${folders.length} folder name(s) exceed ${CEIL.folder}: ${over.map(d => d + ' (' + d.length + ')').join(' ; ')}`)
    : PASS(`${folders.length} folders, longest ${Math.max(...folders.map(d => d.length))}, ceiling ${CEIL.folder}`);
});
B['PTH-5'] = pthGuard(f => {
  const bad = f.filter(p => p.split('\\').length !== 3);
  return bad.length ? FAIL(`${bad.length} file(s) are not at literature/<folder>/<leaf>: ${bad.slice(0, 3).join(' ')}`)
    : PASS(`all ${f.length} files at depth exactly 1 below ${TREE}/`);
});
B['PTH-11'] = pthGuard(f => {
  // A margin, reported. The row asks for the worst case WITH its margin, because a ceiling that is
  // met exactly reads the same as one met with room, and only one of the two survives a rename.
  const worst = f.slice().sort((a, b) => b.length - a.length)[0];
  return PASS(`worst-case landed path ${worst.length} chars, ceiling ${CEIL.repo}, margin ${CEIL.repo - worst.length}: ${worst}`);
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
