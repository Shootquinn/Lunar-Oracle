#!/usr/bin/env node
/* fault_inject.js -- sub-step 5.3. The fault-injection pass.
 *
 * I4's four decoys, run against the ASSEMBLED LOOP rather than against unit stand-ins. That
 * distinction is the whole sub-step. A unit test of a loader can prove the loader throws; only the
 * assembled loop can prove that the throw REACHES THE ANSWER instead of being caught two frames up
 * and turned into a confident refusal. The failure this pass exists to catch is not "the check is
 * missing" -- it is "the check fires and something downstream swallows it".
 *
 * THE RULE, AND IT IS WRITTEN INTO THE RUNNER SO IT CANNOT BE REPORTED AS A PASS:
 *
 *     A DECOY THAT FAILS TO APPLY IS A FAILURE, NOT A SKIP.
 *
 * Every decoy below declares a `applied()` predicate that is evaluated against the staged tree
 * BEFORE the loop is run. If the mutation did not change what it claims to change -- a file that
 * was already absent, a string that did not match, a directory that was already empty -- the decoy
 * is reported `NOT APPLIED` and it FAILS. It is never reported as a skip and never omitted from the
 * denominator. The final line prints decoys written against decoys applied, and **if they differ
 * the run exits non-zero**, because a fault-injection pass that quietly ran three of four decoys
 * and printed three passes is worse than no pass at all: it produces a green result for a control
 * that was never exercised. This is `verify_figure.js`'s lesson stated as a runner rule rather than
 * as a comment.
 *
 * STAGING. Every decoy runs against a TEMPORARY COPY of the inputs, never against the repository.
 * `literature/` is 169 files and is copied by reference where a decoy does not touch it; where one
 * does, only the files that decoy needs are staged. The repository is never mutated, so this file
 * cannot damage what it reads.
 *
 *   node oracle/tests/fault_inject.js            run every decoy
 *   node oracle/tests/fault_inject.js --list     name them without running
 *   node oracle/tests/fault_inject.js --only I4c
 */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.resolve(__dirname, '..', '..');
const R = p => path.join(ROOT, p);

const REGISTERS = ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv'];
const BASE = {
  appPath: R('lsei/index.html'),
  // ABSOLUTE, deliberately. `loadContext` resolves a relative litDir against `root`, and three
  // decoys below inject through `root` because the loader ignores `registerPaths`. Without this the
  // shelf vanishes under the fake root and every one of them refuses `input-missing` before it
  // reaches the assertion it was written for -- the neighbouring-assertion failure again.
  litDir: R('literature'),
  registerPaths: REGISTERS.map(R),
  indexPath: R('literature/INDEX.tsv'),
  fieldsPath: R('literature/FIELDS.tsv'),
  excludedNodesPath: R('oracle/router/excluded_nodes.json'),
};

function stage(name) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'fault-' + name + '-'));
  return d;
}
function copy(src, dst) {
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}
/* Run the assembled loop and return what it produced, or the throw it produced instead. A THROW IS
 * A RESULT HERE, and distinguishing it from a returned verdict is the point: I4a's spec says "the
 * empty-population throw, never a confident REFUSE", so a returned REFUSE is the failure. */
/* A FAKE ROOT, and it exists because of a defect this pass found in its first run.
 *
 * `loadContext` takes `registerPaths` in W4-2's relayed signature and IGNORES IT in the body: the
 * two register files are hardcoded relative to `root`. The first version of I4c, I4d and I5 passed
 * a staged register path, the loader silently read the REAL registers instead, and all three decoys
 * came back red against a router that had never seen the mutation. **Three false reds are the same
 * defect class as a false green** -- the harness reported a result for a control it had not
 * exercised -- and the fix is in two places, not one:
 *   1. inject through `root`, which the loader does honour, so the mutated register is the one read;
 *   2. add `reached(ctx)`, below, so that an injection the loop does not see is reported NOT APPLIED
 *      rather than allowed to produce any verdict at all.
 * The signature divergence is routed back to W4-2 rather than worked around: a body that diverges
 * from a frozen signature is the body's bug.
 */
function fakeRoot(name, registerOverrides) {
  const d = stage(name);
  fs.mkdirSync(path.join(d, 'oracle', 'router'), { recursive: true });
  // INDEX.tsv and FIELDS.tsv come too, and their absence is the reason this list is explicit
  // rather than "whatever the loader happens to need". Without them I4d and I5 both threw on
  // "literature/INDEX.tsv is absent" -- a real refusal, correctly raised, and NOT the one either
  // decoy was aimed at. A decoy that fires a neighbouring assertion has not tested its own, and
  // the next person to read the green would conclude the member-resolution path was exercised.
  for (const f of ['oracle/router/excluded_nodes.json', 'oracle/router/axis_threshold.json',
                   'literature/INDEX.tsv', 'literature/FIELDS.tsv'])
    copy(R(f), path.join(d, f));
  for (const f of REGISTERS) {
    const o = (registerOverrides || {})[f];
    if (o === null) continue;                       // omit the file entirely
    if (typeof o === 'string') { fs.mkdirSync(path.dirname(path.join(d, f)), { recursive: true }); fs.writeFileSync(path.join(d, f), o, 'utf8'); }
    else copy(R(f), path.join(d, f));
  }
  return d;
}
/* `reached` is checked AFTER the context loads and BEFORE the verdict is believed. A decoy whose
 * mutation did not reach the loaded context is NOT APPLIED, which is a failure, not a skip. */

function runLoop(opts, question) {
  // Loaded fresh each time so a cached context cannot carry an unmutated input into a decoy.
  for (const k of Object.keys(require.cache)) if (/oracle[\\/]router[\\/]/.test(k)) delete require.cache[k];
  const C = require(R('oracle/router/classify.js'));
  const W = require(R('oracle/router/wave.js'));
  let ctx;
  try { ctx = C.loadContext(opts); }
  catch (e) { return { stage: 'load', threw: true, message: String(e.message || e) }; }
  let q;
  try { q = C.classifyQuestion(ctx, question); }
  catch (e) { return { stage: 'classify', threw: true, message: String(e.message || e), ctx }; }
  let wave = null;
  try { wave = W.selectWave(q, ctx); } catch (e) { wave = { error: String(e.message || e) }; }
  return { stage: 'answered', threw: false, verdict: q.verdict, reason_code: q.reason_code, q, wave, ctx };
}
const describe = r => r.threw ? 'THREW at ' + r.stage + ': ' + r.message.slice(0, 130)
  : 'returned ' + r.verdict + (r.reason_code ? '/' + r.reason_code : '') +
    (r.wave && r.wave.personaCount != null ? ', ' + r.wave.personaCount + ' persona(s)' : '');

/* ------------------------------------------------------------- the decoys */
/* Each: `id`, `what` (the I4 clause, verbatim in substance), `build` returning
 * { opts, question, applied }, and `expect(result)` returning { pass, why }. */
const DECOYS = [

/* ---- I4a. INV-6. An empty literature directory. ------------------------- */
{
  id: 'I4a', row: 'INV-6',
  what: 'an empty literature directory -> the empty-population throw, never a confident REFUSE',
  build() {
    const d = stage('empty-lit');
    const lit = path.join(d, 'literature');
    fs.mkdirSync(lit, { recursive: true });
    // INDEX.tsv and FIELDS.tsv are staged with their headers and no data rows, so the failure under
    // test is the EMPTY POPULATION and not a missing file, which is INV-14's decoy and a different
    // owner. A decoy that fires the neighbouring assertion has not tested its own.
    for (const f of ['INDEX.tsv', 'FIELDS.tsv']) {
      const src = R('literature/' + f);
      const head = fs.existsSync(src) ? fs.readFileSync(src, 'utf8').split('\n')[0] + '\n' : 'x\n';
      fs.writeFileSync(path.join(lit, f), head, 'utf8');
    }
    const before = fs.readdirSync(R('literature')).filter(x => /\.md$/i.test(x) || fs.statSync(R('literature/' + x)).isDirectory()).length;
    const after = fs.readdirSync(lit).filter(x => /\.md$/i.test(x)).length;
    return {
      // `root` stays the REAL root. Passing the staged dir as root made every other artifact --
      // excluded_nodes.json, axis_threshold.json -- resolve under it and vanish, so the run
      // refused `input-missing` on a MISSING ARTIFACT and never reached the empty-population
      // assertion at all. That is INV-14's decoy firing in INV-6's place, which this decoy's own
      // comment warned against two lines earlier and the first draft did anyway.
      opts: Object.assign({}, BASE, { indexPath: path.join(lit, 'INDEX.tsv'), fieldsPath: path.join(lit, 'FIELDS.tsv'), litDir: lit }),
      question: 'How much ice is in Cabeus?',
      applied: { ok: before > 0 && after === 0, what: 'real tree holds ' + before + ' entries; staged tree holds ' + after + ' .md files' },
      reached: ctx => ({ ok: ctx.litDir === lit, what: 'the loaded context points at ' + ctx.litDir }),
      dir: d,
    };
  },
  expect(r) {
    if (r.threw) return { pass: true, why: 'the empty population reached the top as a throw' };
    if (r.verdict === 'REFUSE') return { pass: false, why: 'a CONFIDENT REFUSE over an empty corpus. An empty list must never read as a clean one: the run cannot tell "nobody wrote it" from "I did not look"' };
    return { pass: false, why: 'answered ' + r.verdict + ' over an empty corpus' };
  },
},

/* ---- I4b. INV-7. A missing lsei/index.html, or present and wrong. ------- */
{
  id: 'I4b-missing', row: 'INV-7',
  what: 'a missing lsei/index.html -> a refusal naming the missing clone, never a literature-only answer to a question that needed the app',
  build() {
    const d = stage('no-app');
    const p = path.join(d, 'index.html');   // deliberately never created
    return {
      opts: Object.assign({}, BASE, { appPath: p }),
      question: 'What is water output under Agency Led Baseline in 2040?',
      applied: { ok: fs.existsSync(BASE.appPath) && !fs.existsSync(p), what: 'the real app exists and the staged path does not' },
      dir: d,
    };
  },
  expect(r) {
    if (r.threw) return { pass: /index\.html|app|clone|ENOENT|not found/i.test(r.message), why: 'the missing app named in the throw' };
    if (r.verdict === 'REFUSE' && r.reason_code === 'input-missing')
      return { pass: true, why: 'refused input-missing, per contract §3: a missing input fires before classification with zero personas spent' };
    if (r.verdict === 'LITERATURE')
      return { pass: false, why: 'A LITERATURE-ONLY ANSWER TO A QUESTION THAT NEEDED THE APP. This is the exact failure INV-7 names: the shelf silently substitutes for the authority' };
    return { pass: false, why: 'returned ' + r.verdict + '/' + r.reason_code };
  },
},
{
  id: 'I4b-wrong', row: 'INV-7',
  what: 'an index.html that PARSES AS HTML AND HOLDS NO MODEL -- it satisfies a `test -f`, and the marker asserted inside the file is KNOB_DATA (bootstrap BC-14)',
  build() {
    const d = stage('empty-app');
    const p = path.join(d, 'index.html');
    fs.writeFileSync(p, '<!doctype html>\n<html><head><title>not the app</title></head>\n<body><p>This file is valid HTML and holds no model.</p></body></html>\n', 'utf8');
    const real = fs.readFileSync(BASE.appPath, 'utf8');
    return {
      opts: Object.assign({}, BASE, { appPath: p }),
      question: 'What is water output under Agency Led Baseline in 2040?',
      applied: { ok: /KNOB_DATA/.test(real) && !/KNOB_DATA/.test(fs.readFileSync(p, 'utf8')) && fs.existsSync(p),
        what: 'the real app carries the KNOB_DATA marker; the staged file exists, parses as HTML, and does not' },
      dir: d,
    };
  },
  expect(r) {
    if (r.threw) return { pass: true, why: 'the marker check reached the top as a throw' };
    if (r.verdict === 'REFUSE' && r.reason_code === 'input-missing') return { pass: true, why: 'refused input-missing on an unparseable input' };
    return { pass: false, why: 'returned ' + r.verdict + '/' + r.reason_code + ' against a file that satisfies test -f and holds no model. A `test -f` is not a check' };
  },
},

/* ---- I4c. INV-8. A register file that does not parse. -------------------
 * "THIS IS THE ONE PEOPLE FORGET AND IT MATTERS MOST: a register that silently parses to zero rows
 * disables the entire contested-claims invariant while every other test in the suite still passes
 * green." So the assertion is not merely that a bad file is noticed; it is that the run REFUSES AT
 * STARTUP rather than proceeding with the invariant switched off. */
{
  id: 'I4c', row: 'INV-8',
  what: 'a register file that does not parse -> startup refusal, NOT a run with the invariant silently disabled',
  build() {
    // Schema-conformant enough to be opened, and broken where it counts: the H row declares 15/68
    // and the file carries no A or M rows at all. This is the SILENT-ZERO shape, not a syntax
    // error, and it is the shape INV-8 calls the one people forget.
    const bad = 'H\tliterature\t2026-08-28\taf7abec\t15\t68\n';
    const d = fakeRoot('bad-register', { 'oracle/REGISTER.lunar.tsv': bad });
    const realAxes = fs.readFileSync(R('oracle/REGISTER.lunar.tsv'), 'utf8').split('\n').filter(l => l.startsWith('A\t')).length;
    const stagedAxes = bad.split('\n').filter(l => l.startsWith('A\t')).length;
    return {
      opts: Object.assign({}, BASE, { root: d }),
      question: 'What is the water ice concentration in the regolith at Cabeus crater?',
      applied: { ok: realAxes > 0 && stagedAxes === 0, what: 'real lunar register carries ' + realAxes + ' A rows; the staged one carries ' + stagedAxes + ' while its H row still declares 15' },
      reached: ctx => (!ctx || !ctx.axes) ? { ok: false, what: 'the context refused before axes were built: ' + JSON.stringify((ctx && ctx.refuse) || 'no ctx') } : ({ ok: ![...ctx.axes.keys()].some(k => /^LCC-/.test(k)),
        what: 'the loaded context holds ' + [...ctx.axes.keys()].filter(k => /^LCC-/.test(k)).length + ' LCC axis/axes (the mutated register declares none)' }),
      dir: d,
    };
  },
  expect(r) {
    if (r.threw) return { pass: true, why: 'startup refusal: the declared size and the parsed size disagreed and the load refused' };
    if (r.verdict === 'CONTESTED')
      return { pass: false, why: 'CONTESTED off a register that parsed to zero lunar rows -- impossible, so the axis came from somewhere the decoy did not stage' };
    return { pass: false, why: 'the run proceeded and returned ' + r.verdict + '. The contested-claims invariant is now switched off and every other test in the suite still passes green. This is the failure INV-8 calls the one people forget' };
  },
},

/* ---- I4d. INV-9. A register axis whose member path does not exist. ------ */
{
  id: 'I4d', row: 'INV-9 / RFX-34',
  what: 'a register axis whose member path does not resolve -> refusal for that axis, NEVER a fall-through to search',
  build() {
    const src = fs.readFileSync(R('oracle/REGISTER.lunar.tsv'), 'utf8').replace(/\r\n/g, '\n');
    // Rename ONE member leaf of LCC-01 to a name that resolves nowhere. The axis still declares
    // three sides; one of them now points at nothing. Everything else is byte-identical.
    const target = 'litvak-2024-lend-cabeus-water-ice.md';
    const DECOY = 'litvak-2024-lend-cabeus-water-ice-DECOY.md';
    const mutated = src.replace(target, DECOY);
    const d = fakeRoot('missing-member', { 'oracle/REGISTER.lunar.tsv': mutated });
    return {
      opts: Object.assign({}, BASE, { root: d }),
      question: 'What is the water ice concentration in the regolith at Cabeus crater?',
      applied: { ok: src.includes(target) && !mutated.includes(target) && mutated !== src,
        what: 'one member leaf of LCC-01 renamed to a leaf that resolves nowhere; ' + (mutated.length - src.length) + ' byte length delta' },
      reached: ctx => { if (!ctx || !ctx.axes) return { ok: false, what: 'the context refused before axes were built: ' + JSON.stringify((ctx && ctx.refuse) || 'no ctx') };
        const a = ctx.axes.get('LCC-01');
        // `axis.sides` is a Map<sideLetter, member[]>, and JSON.stringify of a Map is "{}", so the
        // first probe here was structurally blind and reported NOT REACHED for a decoy that had in
        // fact reached. The gate correctly refused to score it either way, which is the gate doing
        // its job; the probe is what was wrong, and it is fixed rather than relaxed.
        const leaves = a && a.sides ? [...a.sides.values()].flat().map(m => (m && (m.leaf || m.file || m)) + '') : [];
        const hit = leaves.some(l => String(l).includes('DECOY'));
        return { ok: hit, what: hit ? 'LCC-01 in the loaded context names the decoy leaf'
          : 'LCC-01 in the loaded context does NOT name the decoy leaf -- the loader read the real register' }; },
      dir: d,
    };
  },
  expect(r) {
    if (r.threw) return { pass: true, why: 'the unresolved member reached the top as a throw' };
    if (r.verdict === 'REFUSE' && r.reason_code === 'axis-incomplete')
      return { pass: true, why: 'refused axis-incomplete, which routes to a broken register row and a named owner' };
    if (r.verdict === 'LITERATURE')
      return { pass: false, why: 'FELL THROUGH TO SEARCH. Contract §5: axis-incomplete never falls through to search. A broken register row has been converted into a delivered one-sided answer and nothing downstream can tell the difference' };
    if (r.verdict === 'CONTESTED')
      return { pass: false, why: 'answered CONTESTED with a side whose member does not resolve -- a one-sided answer wearing a two-sided verdict' };
    return { pass: false, why: 'returned ' + r.verdict + '/' + r.reason_code };
  },
},

/* ---- The fifth, and it is not one of I4's four. -------------------------
 * The dropped-side decoy, RFX-35. Measured across both registers: 18 axes are class `two_sided`
 * and SEVEN of them carry more than two sides. On a three-sided axis, an answer returning two
 * sides satisfies "returns both sides or refuses" and drops a third of the evidence, and the
 * router has then chosen which measurement the reader hears. Only a >2-sided axis can tell the two
 * readings apart, so the decoy runs on LCC-01 (three) and LCC-07 (four). */
{
  id: 'I5-dropped-side', row: 'RFX-35 / TG-28',
  what: 'a three- or four-sided axis with one side removed -> the wave must lose a persona and the side count must follow sides.length, never the literal two',
  build() {
    const src = fs.readFileSync(R('oracle/REGISTER.lunar.tsv'), 'utf8').replace(/\r\n/g, '\n');
    const lines = src.split('\n');
    const keep = lines.filter(l => !(l.startsWith('M\tLCC-01\tC\t')));
    const removed = lines.length - keep.length;
    // The H row's declared M count must follow, or the decoy trips REG-5's size assertion instead
    // of the side-count one it is aimed at.
    const h = keep[0].split('\t'); h[5] = String(Number(h[5]) - removed); keep[0] = h.join('\t');
    const d = fakeRoot('dropped-side', { 'oracle/REGISTER.lunar.tsv': keep.join('\n') });
    return {
      opts: Object.assign({}, BASE, { root: d }),
      question: 'What is the water ice concentration in the regolith at Cabeus crater?',
      applied: { ok: removed === 1, what: removed + ' M row(s) removed from LCC-01 side C; the H row M count follows' },
      reached: ctx => { if (!ctx || !ctx.axes) return { ok: false, what: 'the context refused before axes were built: ' + JSON.stringify((ctx && ctx.refuse) || 'no ctx') };
        const a = ctx.axes.get('LCC-01');
        const n = a && a.sides ? a.sides.size : 0;
        return { ok: n === 2, what: 'LCC-01 in the loaded context declares ' + n + ' side(s); the mutated register declares 2' }; },
      dir: d, expectSides: 2,
    };
  },
  expect(r) {
    if (r.threw) return { pass: false, why: 'threw rather than answering: ' + r.message.slice(0, 90) };
    const n = r.wave && r.wave.personaCount;
    if (r.verdict !== 'CONTESTED') return { pass: false, why: 'returned ' + r.verdict + ' where a two-sided axis remains' };
    if (n === 2) return { pass: true, why: 'the wave followed sides.length down to 2; the count is derived, not a literal' };
    if (n === 3) return { pass: false, why: 'the wave still spends 3 personas on an axis that now declares 2 sides -- the count is a literal somewhere' };
    return { pass: false, why: 'persona count ' + n };
  },
},

/* ---- The sixth: the value-layer output. ---------------------------------
 * Relayed by the router seat and worth a decoy because it is a REAL past defect rather than an
 * invented one: the prototype's OUTPUT_LEXICON names 8 keys, all of them `model()`'s, so 37 of the
 * 45-key output namespace fell through to a literature search. Measured independently at this
 * digest: `model()` returns 26 keys, `valueModel()` returns 27, the overlap is 8 and the union is
 * 45. A sub-claim naming a value-only output must reach the app, not the shelf. */
{
  id: 'I6-value-output', row: 'ORG-11 / FIX-10',
  what: 'a sub-claim naming a value-layer output -> APP or FIGURE, never a literature search. The old path sent 37 of 45 outputs to the shelf',
  build() {
    return {
      opts: Object.assign({}, BASE),
      question: 'What is the propellant margin under The Commercial Break in 2055?',
      applied: { ok: true, what: 'no mutation: this decoy injects a QUESTION rather than a fault, and its applied() is the question reaching a loaded context' },
      dir: null, noMutation: true,
    };
  },
  expect(r) {
    if (r.threw) return { pass: false, why: 'threw: ' + r.message.slice(0, 90) };
    if (r.verdict === 'APP' || r.verdict === 'FIGURE') return { pass: true, why: 'reached the app across the 45-key namespace' };
    if (r.verdict === 'REFUSE' && r.reason_code === 'unbuildable')
      return { pass: true, why: 'refused unbuildable, which FIX-10 accepts while valueModel() is unreachable -- the invariant that holds across both is that it is neither LITERATURE nor excluded' };
    if (r.verdict === 'LITERATURE')
      return { pass: false, why: 'sent a value-layer output to a literature search. FIX-10 says never LITERATURE' };
    if (r.reason_code === 'excluded')
      return { pass: false, why: 'refused `excluded`. FIX-10 and contract §5: `excluded` routes to nobody and must never mask a code that routes to someone' };
    return { pass: false, why: 'returned ' + r.verdict + '/' + r.reason_code };
  },
},
/* ---- I7. The vacuous pass inside the release gate. ----------------------
 * Not one of I4's four, and it is the best decoy in the repository because it was FOUND rather
 * than invented. `node tools/audit_abstract_overlap.js literature 10` prints
 *
 *     tested 0 summaries with a paired PDF and an abstract
 *     AT OR ABOVE 10% VERBATIM: 0
 *
 * and exits 0. The last line and the exit code -- the two things a gate actually consumes -- are
 * BYTE-IDENTICAL to what a genuinely clean corpus produces. The denominator is printed one line
 * up, which is the tool being honest in prose and silent in its interface, and a gate does not
 * read prose.
 *
 * This is `VACUOUS IS NOT PASS` sitting inside the release gate, which is the same sentence the
 * runner prints at the bottom of every suite run. The decoy is the observation itself: there is no
 * mutation to apply, because the repository already ships the failing state.
 *
 * WHY IT IS NOT REPAIRED HERE. `tools/audit_abstract_overlap.js` is not this seat's file. The
 * repair is one line -- exit non-zero, or print `VACUOUS`, when the tested count is zero -- and it
 * belongs to whoever owns the corpus gate. Routed, with this decoy left red as the evidence. */
{
  id: 'I7-vacuous-gate', row: 'INV-12 / MUT-4',
  what: 'an instrument whose CLEAN verdict and whose UNRUN verdict are indistinguishable at the interface a gate reads',
  build() {
    const tool = 'tools/audit_abstract_overlap.js';
    return {
      opts: null, question: null, noMutation: true, tool,
      applied: { ok: fs.existsSync(R(tool)), what: fs.existsSync(R(tool)) ? tool + ' is on disk; no mutation is needed because the failing state already ships' : tool + ' does not exist' },
      run() {
        const cp = require('child_process');
        let out = '', code = 0;
        try { out = cp.execSync('node ' + tool + ' literature 10', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
        catch (e) { out = (e.stdout || '') + (e.stderr || ''); code = e.status === undefined ? 1 : e.status; }
        const m = out.match(/tested (\d+) summaries/);
        return { tested: m ? Number(m[1]) : null, code, summary: (out.match(/^AT OR ABOVE .*$/m) || [''])[0], out };
      },
    };
  },
  expect(r) {
    if (r.tested === null) return { pass: false, why: 'the tool printed no tested count at all, so its population is not even reportable' };
    if (r.tested > 0) return { pass: true, why: r.tested + ' summaries tested; the population is non-empty and the verdict is a result' };
    return { pass: false, why: 'TESTED 0 AND EXITED ' + r.code + ' WITH "' + r.summary + '". A population of zero is ' +
      'reported through the same exit code and the same summary line as a clean corpus, so a gate reading this tool ' +
      'cannot tell "nothing overlaps" from "nothing was examined". VACUOUS IS NOT PASS. ' +
      'Owner: whoever owns tools/audit_abstract_overlap.js. Close, and it is an observation not a date: ' +
      'the tool exits non-zero, or prints VACUOUS, when the tested count is zero' };
  },
},
];

/* ------------------------------------------------------------------- run */
function main() {
  const argv = process.argv.slice(2);
  const only = argv.includes('--only') ? argv[argv.indexOf('--only') + 1] : null;
  if (argv.includes('--list')) {
    for (const d of DECOYS) process.stdout.write(d.id.padEnd(16) + d.row.padEnd(18) + d.what + '\n');
    process.stdout.write('\n' + DECOYS.length + ' decoys.\n');
    return 0;
  }
  const chosen = DECOYS.filter(d => !only || d.id === only);
  const written = chosen.length;
  let applied = 0, passed = 0, failed = 0;
  process.stdout.write('FAULT INJECTION -- ' + written + ' decoy(s) against the assembled loop\n');
  process.stdout.write('  loop under test: oracle/router/classify.js + oracle/router/wave.js\n');
  process.stdout.write('  A DECOY THAT FAILS TO APPLY IS A FAILURE, NOT A SKIP.\n\n');

  for (const d of chosen) {
    let b;
    try { b = d.build(); }
    catch (e) { failed++; process.stdout.write('FAIL  ' + d.id + '  [' + d.row + ']  DECOY DID NOT BUILD: ' + e.message + '\n\n'); continue; }
    process.stdout.write((b.noMutation ? 'note  ' : '      ') + d.id.padEnd(16) + '[' + d.row + ']' + '\n');
    process.stdout.write('      what      ' + d.what + '\n');
    process.stdout.write('      applied   ' + (b.applied.ok ? 'yes' : 'NO') + ' -- ' + b.applied.what + '\n');
    if (!b.applied.ok) {
      failed++;
      process.stdout.write('FAIL  ' + d.id + '  DECOY DID NOT APPLY. This is a FAILURE and not a skip: the mutation did\n' +
        '      not change what it claims to change, so whatever the loop returns below proves nothing.\n\n');
      continue;
    }
    const r = b.run ? b.run() : runLoop(b.opts, b.question);
    // SECOND HALF OF `applied`. The mutation changed the artifact; did it reach the loaded context?
    // A decoy that changed a file the loop never opened has not applied, and any verdict it draws
    // is a result for a control that was never exercised.
    if (b.reached && !r.threw && !b.run) {
      const got = b.reached(r.ctx);
      process.stdout.write('      reached   ' + (got.ok ? 'yes' : 'NO') + ' -- ' + got.what + '\n');
      if (!got.ok) {
        failed++;
        process.stdout.write('FAIL  ' + d.id + '  DECOY DID NOT REACH THE LOOP. FAILURE, not a skip: the loop read an\n' +
          '      unmutated input, so whatever it returned proves nothing about the assertion.\n\n');
        if (b.dir) { try { fs.rmSync(b.dir, { recursive: true, force: true }); } catch (e) { /* temp */ } }
        continue;
      }
    }
    applied++;
    const v = d.expect(r);
    process.stdout.write('      loop      ' + (b.run ? JSON.stringify({ tested: r.tested, exit: r.code }) : describe(r)) + '\n');
    process.stdout.write((v.pass ? 'ok    ' : 'FAIL  ') + d.id.padEnd(16) + v.why + '\n\n');
    if (v.pass) passed++; else failed++;
    if (b.dir) { try { fs.rmSync(b.dir, { recursive: true, force: true }); } catch (e) { /* temp */ } }
  }

  process.stdout.write('decoys written ' + written + ', decoys applied ' + applied + ', pass ' + passed + ', fail ' + failed + '\n');
  if (applied !== written)
    process.stdout.write('MISMATCH: ' + (written - applied) + ' decoy(s) did not apply. THAT IS A FAILURE AND NOT A FOOTNOTE --\n' +
      'a pass reported for a control that was never exercised is the false green this whole pass exists to prevent.\n');
  return (failed || applied !== written) ? 1 : 0;
}

if (require.main === module) process.exit(main());
module.exports = { DECOYS, runLoop };
