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
  // decoys below inject through `root`. Without this the shelf vanishes under the fake root and
  // every one of them refuses `input-missing` before it reaches the assertion it was written for
  // -- the neighbouring-assertion failure again.
  //
  // THE `registerPaths` ENTRY BELOW IS THE DEFAULT AND IS OVERRIDDEN BY EVERY FAKE-ROOT DECOY.
  // It named the REAL registers back when the loader ignored the option; the loader honours it
  // since 8.1, so a decoy that left it in place would stage a mutation and then read past it.
  // See the note above `fakeRoot()`.
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
 *
 * THE ROUTE WAS REPAIRED AT 8.1 AND THAT BROKE THE WORKAROUND, WHICH IS THE RIGHT WAY ROUND.
 * `loadContext` now honours `registerPaths` -- and BASE passes ABSOLUTE paths to the REAL registers,
 * so the moment the honouring landed, every fake root staged a mutated register that the loader
 * then declined to read in favour of the real one. `reached(ctx)` caught it and reported NOT
 * APPLIED, which is the second half of the fix above doing exactly its job three waves later. So
 * the decoys now pass `registerPaths` at the STAGED files as well as `root`: the interface is used
 * because the interface works, and `root` stays because `literature/INDEX.tsv` is resolved off it.
 */
/* The staged register list for a fake root, honouring an override that omitted a file. Computed
   from what is on disk rather than from the override map, so a decoy cannot name a path it did not
   write. */
const stagedRegisters = d => REGISTERS.map(f => path.join(d, f)).filter(p => fs.existsSync(p));
function fakeRoot(name, registerOverrides) {
  const d = stage(name);
  fs.mkdirSync(path.join(d, 'oracle', 'router'), { recursive: true });
  // INDEX.tsv and FIELDS.tsv come too, and their absence is the reason this list is explicit
  // rather than "whatever the loader happens to need". Without them I4d and I5 both threw on
  // "literature/INDEX.tsv is absent" -- a real refusal, correctly raised, and NOT the one either
  // decoy was aimed at. A decoy that fires a neighbouring assertion has not tested its own, and
  // the next person to read the green would conclude the member-resolution path was exercised.
  // THE LIST GREW AT 8.1 AND THE GROWTH WAS INVISIBLE UNTIL THEN. `oracle/thin_patches.json` and
  // `oracle/router/thin_threshold.json` became inputs of `loadContext` after this function was
  // written, so every fake root refused `input-missing` on the thin-patch register before it built
  // a single axis. Nothing reported it, because `classifyQuestion()` threw the retirement message
  // first and three decoys credited any throw. That is this file's own lesson landing on this file:
  // a decoy that fires a NEIGHBOURING assertion has not tested its own.
  for (const f of ['oracle/router/excluded_nodes.json', 'oracle/router/axis_threshold.json',
                   'oracle/router/thin_threshold.json', 'oracle/thin_patches.json',
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

/* MIGRATED AT SUB-STEP 8.1. This function used to call `classifyQuestion()` and return the verdict
 * and reason code it produced. That function is RETIRED -- the router advises and the composing
 * session rules -- so every call here threw, and three decoys whose `expect()` credits any throw
 * (I4a, I4c, I4d) went GREEN on the retirement message rather than on the fault they inject. A
 * decoy that passes on the wrong throw is the false green this whole file exists to prevent, in
 * this file.
 *
 * It now runs `adviseQuestion()` and hands the EVIDENCE REPORT to `expect()`, together with the
 * loaded modules so that a decoy about the wave can rule its own antecedent verdict and call
 * `selectWave(verdict, ruling, ctx)` itself. THE STAGE STILL MATTERS AND IS STILL RETURNED: a
 * throw at `load` is a startup refusal, which is what I4b and I4c assert, and a throw at `advise`
 * is the loop reaching the top, which is what I4a asserts. */
function runLoop(opts, question) {
  // Loaded fresh each time so a cached context cannot carry an unmutated input into a decoy.
  for (const k of Object.keys(require.cache)) if (/oracle[\\/]router[\\/]/.test(k)) delete require.cache[k];
  const C = require(R('oracle/router/classify.js'));
  const W = require(R('oracle/router/wave.js'));
  let ctx;
  try { ctx = C.loadContext(opts); }
  catch (e) { return { stage: 'load', threw: true, message: String(e.message || e) }; }
  let report;
  try { report = C.adviseQuestion(ctx, question); }
  catch (e) { return { stage: 'advise', threw: true, message: String(e.message || e), ctx, C, W }; }
  return { stage: 'advised', threw: false, report, ctx, C, W };
}
/* The axis's own finding on the report, across sub-claims. Returns null when the axis is not
   reported at all, which is a distinct result from being reported with a defect. */
function findingFor(report, axisId) {
  for (const s of (report.sub_claims || [])) {
    const f = (s.register.findings || []).find(x => x.axis_id === axisId);
    if (f) return f;
  }
  return null;
}
const describe = r => r.threw ? 'THREW at ' + r.stage + ': ' + r.message.slice(0, 130)
  : (r.report.inputs_unavailable && r.report.inputs_unavailable.length
      ? 'ADVISED with inputs unavailable: ' + r.report.inputs_unavailable.join('; ').slice(0, 120)
      : 'ADVISED: ' + r.report.findings_count + ' finding(s) over ' + r.report.sub_claim_count +
        ' sub-claim(s), ' + (r.report.sub_claims[0] ? r.report.sub_claims[0].register.findings.length : 0) +
        ' axis/axes with a key hit');

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
    /* The PASS CONDITION IS UNCHANGED at 8.1 -- the empty population must reach the top as a throw
       -- and it is now reached on the throw this decoy injects rather than on the retired
       classifyQuestion message. The failure branches are re-pointed at the evidence report because
       there is no verdict to name in one. */
    if (r.threw) return { pass: true, why: 'the empty population reached the top as a throw at ' + r.stage + ': ' + r.message.slice(0, 70) };
    if (r.report.no_findings_anywhere)
      return { pass: false, why: 'ADVISED "no findings anywhere" over an empty corpus. An empty list must never read as a clean one: the report cannot tell "nobody wrote it" from "I did not look"' };
    return { pass: false, why: 'advised over an empty corpus with ' + r.report.findings_count + ' finding(s) and no throw' };
  },
},

/* ---- I4b. INV-7. A missing lsei/index.html, or present and wrong. ------- */
{
  id: 'I4b-missing', row: 'INV-7',
  what: 'a missing lsei/index.html -> a refusal naming the missing clone, never a literature-only answer to a question that needed the app',
  build() {
    const d = stage('no-app');
    const p = path.join(d, 'index.html');   // deliberately never created
    this.staged = p;
    return {
      opts: Object.assign({}, BASE, { appPath: p }),
      question: 'What is water output under Agency Led Baseline in 2040?',
      applied: { ok: fs.existsSync(BASE.appPath) && !fs.existsSync(p), what: 'the real app exists and the staged path does not' },
      dir: d,
    };
  },
  /* REWRITTEN at 8.1 by W5-10, and the assertion got STRICTER rather than looser.
   *
   * The old form read `r.verdict` and `r.reason_code` off the loop's return. Those fields were the
   * router DECIDING, and the author retired that at 8.1: the router advises. So the old expect()
   * asserted a behaviour that no longer exists, and it failed on the migration throw rather than on
   * anything about a missing app -- the throw it was reading said `classifyQuestion() is RETIRED`.
   * A red for the wrong reason is the same defect class as a green for the wrong reason: in both,
   * the control that was written was never exercised.
   *
   * The PROPERTY is unchanged and is the one I4b names -- a missing app is reported as a missing
   * app, and the shelf never silently substitutes for it. Under an advising router that property is
   * observable in MORE detail than a verdict field ever carried, and all four halves are asserted:
   *   1. the missing input is NAMED, not merely flagged -- `inputs_unavailable` carries the path;
   *   2. `sub_claims` is EMPTY, so a literature-only answer is not merely discouraged but
   *      impossible: there are no sub-claims to carry one and `findings_count` is 0;
   *   3. the report carries NO decision field, which is 8.1's own rule and is what stops this
   *      decoy from quietly re-acquiring a verdict to read;
   *   4. `ctx.refuse` records `input-missing`, so contract sec.3's zero-persona timing still holds.
   * The old form asserted only that some throw mentioned the word "app". */
  expect(r) {
    const names = s => typeof s === 'string' && (s.includes(this.staged) || /index\.html/i.test(s));
    if (r.threw) return { pass: names(r.message), why: 'threw at ' + r.stage + ' rather than advising; the missing app is ' + (names(r.message) ? '' : 'NOT ') + 'named in the throw' };
    const rep = r.report || {};
    const iu = rep.inputs_unavailable || [];
    const subs = rep.sub_claims || [];
    if (!iu.length && subs.length)
      return { pass: false, why: 'A LITERATURE-ONLY ANSWER TO A QUESTION THAT NEEDED THE APP. This is the exact failure INV-7 names: ' +
        'the app is absent, the report does not say so, and it offers ' + rep.findings_count + ' finding(s) over ' + subs.length +
        ' sub-claim(s) drawn from the shelf. The shelf silently substitutes for the authority' };
    if (!iu.length) return { pass: false, why: 'the app is absent and inputs_unavailable is EMPTY: the report does not report it at all' };
    if (!iu.some(names)) return { pass: false, why: 'inputs_unavailable is non-empty but does not NAME the missing app: ' + JSON.stringify(iu.slice(0, 3)) +
      '. A reader told "an input is missing" cannot go and fix it; a reader told which one can' };
    if (subs.length) return { pass: false, why: 'the missing app is named, but the report ALSO carries ' + subs.length +
      ' sub-claim(s) and ' + rep.findings_count + ' finding(s). A named refusal beside a shelf answer is still a shelf answer' };
    if ('verdict' in rep || 'reason_code' in rep)
      return { pass: false, why: 'the report carries a decision field (' + Object.keys(rep).filter(k => k === 'verdict' || k === 'reason_code').join(',') +
        '), and 8.1 retired the router deciding. The session rules the verdict; this report is evidence' };
    const cr = (r.ctx && r.ctx.refuse) || null;
    if (!cr || cr.reason_code !== 'input-missing')
      return { pass: false, why: 'inputs_unavailable is right but ctx.refuse is ' + JSON.stringify(cr) + '; contract sec.3 puts a missing input BEFORE the wave, at zero persona cost, and that timing is what ctx.refuse records' };
    return { pass: true, why: 'the missing app is NAMED in inputs_unavailable (' + JSON.stringify(iu[0].slice(0, 60)) + '), sub_claims is empty and findings_count is 0 ' +
      'so a shelf-only answer is impossible, the report carries no decision field, and ctx.refuse records input-missing before the wave' };
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
      opts: Object.assign({}, BASE, { root: d, registerPaths: stagedRegisters(d) }),
      question: 'What is the water ice concentration in the regolith at Cabeus crater?',
      applied: { ok: realAxes > 0 && stagedAxes === 0, what: 'real lunar register carries ' + realAxes + ' A rows; the staged one carries ' + stagedAxes + ' while its H row still declares 15' },
      reached: ctx => (!ctx || !ctx.axes) ? { ok: false, what: 'the context refused before axes were built: ' + JSON.stringify((ctx && ctx.refuse) || 'no ctx') } : ({ ok: ![...ctx.axes.keys()].some(k => /^LCC-/.test(k)),
        what: 'the loaded context holds ' + [...ctx.axes.keys()].filter(k => /^LCC-/.test(k)).length + ' LCC axis/axes (the mutated register declares none)' }),
      dir: d,
    };
  },
  expect(r) {
    /* The PASS CONDITION IS UNCHANGED at 8.1 and is now stricter about WHERE: the refusal must be
       at STARTUP, which is the whole content of INV-8. Before this migration any throw counted, and
       the throw actually being counted was `classifyQuestion() is RETIRED` -- a green for a startup
       refusal that had not been observed. */
    if (r.threw && r.stage === 'load') return { pass: true, why: 'startup refusal: the declared size and the parsed size disagreed and the load refused' };
    if (r.threw) return { pass: false, why: 'threw at ' + r.stage + ' rather than at load. The register was accepted at startup and the failure surfaced later: ' + r.message.slice(0, 90) };
    const lcc = (r.report.sub_claims || []).some(s => s.register.findings.some(f => /^LCC-/.test(f.axis_id)));
    if (lcc)
      return { pass: false, why: 'the report carries LCC findings off a register that parsed to zero lunar rows -- impossible, so the axes came from somewhere the decoy did not stage' };
    return { pass: false, why: 'the load ACCEPTED a register whose H row declares 15 axes and whose body carries none, and advising proceeded. The contested-claims invariant is now switched off and every other test in the suite still passes green. This is the failure INV-8 calls the one people forget' };
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
      opts: Object.assign({}, BASE, { root: d, registerPaths: stagedRegisters(d) }),
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
  /* MIGRATED AT 8.1. The old assertion was `REFUSE`/`axis-incomplete`, and the router no longer
   * refuses anything. What replaces it is what classify.js's own comment says replaced it: "an
   * unresolved member used to become REFUSE/axis-incomplete, which is a decision. Now it is a
   * reported defect WITH THE MEMBER NAMED, and the session rules on it." So the assertion is that
   * the report NAMES the member that does not resolve, and marks the axis incomplete. The failure
   * this guards is unchanged and is the one that matters: an axis reported as answerable with a
   * side whose source is not there is a one-sided answer with nothing saying so. */
  expect(r) {
    if (r.threw) return { pass: false, why: 'threw at ' + r.stage + ' rather than REPORTING the defect: ' + r.message.slice(0, 110) };
    const f = findingFor(r.report, 'LCC-01');
    if (!f) return { pass: false, why: 'LCC-01 does not appear in the register findings at all, so the unresolved member is not reported and nothing downstream can see it. A broken register row has become invisible rather than routed' };
    const named = (f.unresolved_members || []).filter(u => /DECOY/.test(u));
    if (!named.length)
      return { pass: false, why: 'LCC-01 is reported with side_resolution "' + String(f.side_resolution).slice(0, 40) +
        '" and unresolved_members [' + (f.unresolved_members || []).join(' ') + ']: THE MEMBER THAT DOES NOT RESOLVE IS NOT NAMED. ' +
        'Contract §5 routes axis-incomplete to a broken register row and a named owner; a report that shows the axis as ' +
        'complete has converted the broken row into a deliverable one-sided answer' };
    if (!/^INCOMPLETE/.test(String(f.side_resolution)))
      return { pass: false, why: 'the member is named but side_resolution reads "' + String(f.side_resolution).slice(0, 40) + '"' };
    if (f.sides_resolved >= f.sides_declared)
      return { pass: false, why: 'sides_resolved ' + f.sides_resolved + ' of ' + f.sides_declared + ' declared: the counts do not show the loss' };
    return { pass: true, why: 'the unresolved member is NAMED in the report (' + named.join(' ') + '), side_resolution is INCOMPLETE, and ' +
      f.sides_resolved + ' of ' + f.sides_declared + ' sides resolve. The defect is reported to the session rather than decided by the router' };
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
      opts: Object.assign({}, BASE, { root: d, registerPaths: stagedRegisters(d) }),
      question: 'What is the water ice concentration in the regolith at Cabeus crater?',
      applied: { ok: removed === 1, what: removed + ' M row(s) removed from LCC-01 side C; the H row M count follows' },
      reached: ctx => { if (!ctx || !ctx.axes) return { ok: false, what: 'the context refused before axes were built: ' + JSON.stringify((ctx && ctx.refuse) || 'no ctx') };
        const a = ctx.axes.get('LCC-01');
        const n = a && a.sides ? a.sides.size : 0;
        return { ok: n === 2, what: 'LCC-01 in the loaded context declares ' + n + ' side(s); the mutated register declares 2' }; },
      dir: d, expectSides: 2,
    };
  },
  /* MIGRATED AT 8.1, AND THE PROPERTY IS UNCHANGED. This decoy was never about the verdict: it is
   * about whether the persona count is DERIVED from the register's side count or is a literal
   * somewhere. `selectWave()` now takes the verdict as an argument, so the decoy supplies CONTESTED
   * as the antecedent of the implication it is testing -- IF a session rules CONTESTED on this
   * axis, the wave must follow sides.length -- and rules nothing itself. The axis view is built
   * from the MUTATED context, which is the whole point of the staging. */
  expect(r) {
    if (r.threw) return { pass: false, why: 'threw at ' + r.stage + ' rather than advising: ' + r.message.slice(0, 90) };
    const ax = r.ctx.axes.get('LCC-01');
    if (!ax) return { pass: false, why: 'LCC-01 is not in the mutated context at all' };
    try { r.C.resolveSides(r.ctx, ax); } catch (e) { return { pass: false, why: 'side resolution threw: ' + String(e.message).slice(0, 90) }; }
    let w;
    try { w = r.W.selectWave('CONTESTED', { axes: [r.C.axisView(ax)] }, r.ctx); }
    catch (e) { return { pass: false, why: 'selectWave threw on a CONTESTED ruling over a two-sided axis: ' + String(e.message).slice(0, 110) }; }
    const n = w.personaCount;
    if (n === 2) return { pass: true, why: 'the wave followed sides.length down to 2 on the mutated register; the count is derived, not a literal' };
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
  /* MIGRATED AT 8.1. The old assertion was `APP` or `FIGURE`, never `LITERATURE`, and the router
   * names none of the three now. What survives is the channel: a sub-claim naming a value-layer
   * output must produce an APP-CHANNEL finding -- a resolved address or a grammar that refused to
   * build one -- rather than leaving the shelf as the only channel with anything in it. Since 8.1
   * the channels are not exclusive, so the assertion is that the app channel is NON-EMPTY, not
   * that it suppressed retrieval. */
  expect(r) {
    if (r.threw) return { pass: false, why: 'threw at ' + r.stage + ': ' + r.message.slice(0, 90) };
    const app = (r.report.sub_claims || []).map(s => s.app).find(a => a && (a.resolves || a.unbuildable_reason));
    if (app && app.resolves)
      return { pass: true, why: 'the app channel resolves a ' + app.address_form + ' address on ' + app.answers_output_key +
        ' (grade ' + app.answers_output_grade + '), so the 45-key namespace is reachable rather than 8 keys wide' };
    if (app && app.unbuildable_reason)
      return { pass: true, why: 'the app channel REFUSED to build the address rather than defaulting a dimension, which FIX-10 ' +
        'accepts while valueModel() is unreachable: ' + String(app.unbuildable_reason).slice(0, 80) };
    const outs = (r.report.sub_claims || []).flatMap(s => (s.app.outputs_named || []).map(o => o.key));
    return { pass: false, why: 'NO APP-CHANNEL FINDING AT ALL for a value-layer output (outputs named: [' + outs.join(' ') +
      ']). The shelf is the only channel carrying anything, which is the shape FIX-10 names: 37 of the 45-key output ' +
      'namespace falling through to a literature search' };
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
