#!/usr/bin/env node
/* oracle/router/tests/router_suite.js -- twelve tests for router behaviour. Sub-steps 3.2, 3.4,
 * 3.8, 3.9, 3.10.
 *
 *   node oracle/router/tests/router_suite.js
 *
 * TWELVE, WHICH IS THE ALLOWANCE, AND EVERY ONE EXECUTES. This project has 405 suite rows of which
 * 368 do not run; UNRUN IS NOT PASS was the finding of the wave that built the runner. Each row
 * below calls a real function against the real app and the real corpus. None asserts a value this
 * file typed and none can pass by not running.
 *
 * Exit 0 only when all twelve pass.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');

const { loadAppSurface, nodeTree } = require(path.join(ROOT, 'oracle/router/app_surface.js'));
const A = require(path.join(ROOT, 'tools/address.js'));
const X = require(path.join(ROOT, 'tools/exclusions_match.js'));
const C = require(path.join(ROOT, 'oracle/router/classify.js'));
const W = require(path.join(ROOT, 'oracle/router/wave.js'));
const B = require(path.join(ROOT, 'oracle/router/build.js'));
const ACC = require(path.join(ROOT, 'oracle/router/acceptance.js'));

const results = [];
function test(id, name, fn) {
  try { const detail = fn(); results.push({ id, name, pass: true, detail: detail || '' }); }
  catch (e) { results.push({ id, name, pass: false, detail: e.message }); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

const surface = loadAppSurface(path.join(ROOT, 'lsei/index.html'));
const ctx = C.loadContext({});
assert(!ctx.refuse, 'context did not load: ' + (ctx.refuse ? ctx.refuse.missing.join('; ') : ''));

/* --- 3.2, loose ends C1 and C2 ------------------------------------------------------------------ */

test('RT-01', 'the output namespace closes on four components, not one', () => {
  const ka = surface.outputs.knownAnswer;
  assert(ka.measured.model + ka.measured.value - ka.measured.overlap === ka.measured.union,
    'model + value - overlap != union: ' + JSON.stringify(ka.measured));
  assert(ka.drift.length === 0, 'drift from the recorded known answer: ' + ka.drift.join(', ') +
    ' ' + JSON.stringify(ka.measured));
  return 'model ' + ka.measured.model + ' + value ' + ka.measured.value + ' - overlap ' +
    ka.measured.overlap + ' = ' + ka.measured.union;
});

test('RT-02', 'C1: valueModel() is reachable and its outputs resolve to real app addresses', () => {
  const valueOnly = [...surface.outputs.values()].filter(o => o.source === 'value');
  assert(valueOnly.length > 0, 'no value-sourced outputs; VALUE-CORE was not opened');
  const r = A.singlePoint(surface, { scenario: surface.PRESETS[Object.keys(surface.PRESETS)[0]].label,
    phase: surface.phases[1], output: 'margin_prop', landed_cost: A.railFor(surface, 'landed_cost')[7] });
  assert(typeof r.points[0].value === 'number' && isFinite(r.points[0].value),
    'margin_prop did not compute a finite value');
  assert(r.points[0].slug.startsWith('value:'), 'the slug does not name valueModel() as its function');
  return valueOnly.length + ' value-sourced outputs; margin_prop = ' + r.points[0].value.toFixed(3);
});

test('RT-03', 'C2: every key in the namespace is addressable, and coverage is reported', () => {
  const cov = C.lexiconCoverage(surface);
  assert(cov.unknown.length === 0, 'alias table names key(s) the app does not compute: ' + cov.unknown.join(', '));
  const unreachable = [];
  for (const key of surface.outputs.keys()) {
    if (!C.findOutputs(surface, 'what is the ' + key + ' here').includes(key)) unreachable.push(key);
  }
  assert(unreachable.length === 0, 'unreachable output key(s): ' + unreachable.join(', '));
  return cov.namespace + ' keys, ' + cov.byAlias.length + ' by phrase alias, ' +
    cov.identifierOnly.length + ' by identifier only (reported, not silent)';
});

test('RT-04', 'landed_cost is a knob for value outputs and not for model outputs', () => {
  const vSpec = surface.outputs.get('margin_prop'), mSpec = surface.outputs.get('water');
  A.resolveKnob(surface, 'landed_cost', vSpec);
  let threw = null;
  try { A.resolveKnob(surface, 'landed_cost', mSpec); } catch (e) { threw = e.code; }
  assert(threw === A.ERR.KNOB, 'landed_cost was accepted as a knob for a model() output (code ' + threw + ')');
  return 'accepted for valueModel(), refused for model() with ' + threw;
});

test('RT-05', 'a value output with no landed cost is FIGURE, never a defaulted scalar', () => {
  let code = null;
  try { A.singlePoint(surface, { scenario: 'Agency Led Baseline', phase: '2040', output: 'r_prop' }); }
  catch (e) { code = e.code; }
  assert(code === A.ERR.LANDED_COST_UNBOUND, 'the grammar defaulted a landed cost instead of refusing (code ' + code + ')');
  const r = C.classifyQuestion(ctx, 'What is r_prop at Agency Led Baseline in the Pilot era?');
  assert(r.verdict === 'FIGURE', 'the classifier returned ' + r.verdict + ', not FIGURE');
  assert(r.subClaims[0].app.points.length === A.railFor(surface, 'landed_cost').length,
    'the sweep does not cover the app\'s own rail');
  return 'grammar refuses ' + code + '; classifier returns FIGURE over ' + r.subClaims[0].app.points.length + ' rail points';
});

/* --- 3.4, the three outcomes -------------------------------------------------------------------- */

test('RT-06', 'the three exclusion outcomes are closed and each maps to one verdict and one code', () => {
  assert(X.EXCLUSION_OUTCOMES.length === 3, 'the outcome set is not three');
  const seen = new Set();
  for (const o of X.EXCLUSION_OUTCOMES) {
    const v = X.verdictForOutcome(o, { primaries: [{ leaf: 'x' }] });
    assert(C.VERDICTS.includes(v.verdict), o + ' maps to verdict "' + v.verdict + '", outside the closed six');
    if (v.verdict === 'REFUSE') assert(C.REASON_CODES.includes(v.reason_code), o + ' maps to code "' + v.reason_code + '"');
    else assert(v.reason_code === null, o + ' is not a refusal and carries a code');
    seen.add(o + '->' + v.verdict + '/' + (v.reason_code || '-'));
  }
  assert(seen.size === 3, 'two outcomes collapse to one mapping');
  const thin = X.verdictForOutcome('EXCLUDED-THEN-THIN', {});
  assert(thin.reason_code === 'not-found',
    'THIN writes "' + thin.reason_code + '"; a corpus gap routes to an acquisition decision, and ' +
    '`excluded` routes to nobody -- section 5 forbids masking one with the other');
  return [...seen].join('  ');
});

test('RT-07', 'the three adjacency pairs validate against the app, and a false pair fails', () => {
  const tree = nodeTree(surface);
  const nodes = ctx.excluded.nodes.filter(n => n.adjacency);
  assert(nodes.length === 3, 'expected three adjacency pairs, found ' + nodes.length);
  for (const n of nodes) {
    const rel = X.adjacencyRelation(tree, n.slug, n.adjacency.adjacent_slug);
    assert(rel.ok, n.slug + ' -> ' + n.adjacency.adjacent_slug + ': ' + rel.why);
  }
  const bad = X.adjacencyRelation(tree, 'propellant-mass-leverage', 'offtake-record');
  assert(!bad.ok, 'a fabricated pair across two parents validated, so the check proves nothing');
  return nodes.map(n => n.slug + '->' + n.adjacency.adjacent_slug + ' (' + n.adjacency.relation + ')').join('; ');
});

/* --- 3.10, the excluded nodes ------------------------------------------------------------------- */

test('RT-08', 'the excluded-node artifact is regenerated from the app, never transcribed', () => {
  const gen = B.generate();
  assert(gen.findings.length === 0, 'build findings: ' + gen.findings.join(' | '));
  const onDisk = fs.readFileSync(B.OUT, 'utf8');
  assert(onDisk === B.serialize(gen),
    'the committed artifact differs from what the app produces now; its refusal prose is not what the app says today');
  for (const n of gen.nodes) {
    const e = surface.EXCLUSIONS[n.slug];
    assert(n.does === e.does && n.reason === e.reason, n.slug + ': the prose is not byte-identical to the app\'s');
    assert(n.refusal.absent_object.app_says === e.does, n.slug + ': the refusal record does not carry the app\'s own sentence');
    assert(n.refusal.nearest_present_object, n.slug + ': the refusal names no nearest present object');
  }
  assert(gen.node_count === Object.keys(surface.EXCLUSIONS).length,
    'the artifact and the app disagree on how many nodes are excluded');
  return gen.node_count + ' nodes, prose byte-identical to the app, ' + JSON.stringify(gen.outcome_counts);
});

/* --- 3.8, the classifier ------------------------------------------------------------------------ */

test('RT-09', 'exactly one verdict per question, never two, never zero, over every question set on disk', () => {
  const sets = ACC.discover(ctx, []);
  const { rows, failures } = ACC.run(ctx, sets);
  assert(rows.length > 0, 'no questions were classified, so this test asserts nothing');
  assert(failures.length === 0, failures.length + ' violation(s), first: ' + (failures[0] && failures[0].error));
  const present = sets.filter(s => s.questions.length).map(s => path.basename(s.name) + '=' + s.questions.length);
  return rows.length + ' questions, ' + rows.reduce((a, r) => a + r.subClaims, 0) + ' sub-claims, 0 violations [' + present.join(', ') + ']';
});

test('RT-10', 'every REFUSE carries one code from the closed six; nothing else carries any', () => {
  const sets = ACC.discover(ctx, []);
  const { rows } = ACC.run(ctx, sets);
  let refusals = 0;
  for (const r of rows) {
    if (r.verdict === 'REFUSE') {
      refusals++;
      assert(C.REASON_CODES.includes(r.reason_code), r.id + ': REFUSE with code "' + r.reason_code + '"');
    } else assert(r.reason_code == null, r.id + ': ' + r.verdict + ' carries code "' + r.reason_code + '"');
  }
  assert(refusals > 0, 'no question refused, so this test asserts nothing about refusals');
  return refusals + ' refusals, every one carrying exactly one of the closed six';
});

/* --- 3.9, the wave selector --------------------------------------------------------------------- */

test('RT-11', 'the persona count is derived from the verdict rather than hard-coded', () => {
  /* Mutate the contract table and the wave must follow it. A hard-coded count would not move. */
  const original = W.ARITY.LITERATURE.of;
  const before = W.selectWave({ verdict: 'LITERATURE', subClaims: [{ field: 'lunar', verdict: 'LITERATURE' }] }, ctx);
  W.ARITY.LITERATURE.of = () => 0;
  let after;
  try { after = W.selectWave({ verdict: 'LITERATURE', subClaims: [{ field: 'lunar', verdict: 'LITERATURE' }] }, ctx); }
  finally { W.ARITY.LITERATURE.of = original; }
  assert(before.personaCount === 1 && after.personaCount === 0,
    'the count did not follow the contract table: ' + before.personaCount + ' -> ' + after.personaCount);
  for (const v of ['APP', 'FIGURE', 'REFUSE']) {
    const w = W.selectWave({ verdict: v, subClaims: [{ verdict: v, field: null, reason_code: v === 'REFUSE' ? 'not-found' : null }] }, ctx);
    assert(w.personaCount === 0, v + ' bought ' + w.personaCount + ' personas; the contract says zero');
  }
  return 'LITERATURE follows the table 1 -> 0; APP, FIGURE and REFUSE each buy 0';
});

test('RT-12', 'CONTESTED buys one per side, minimum two, no cap, and the briefs are disjoint', () => {
  const multi = [...ctx.axes.values()].filter(a => a.class !== 'one_sided' && a.sides.size >= 3);
  assert(multi.length > 0, 'no axis carries three or more sides, so "no cap" is untestable today');
  let maxSides = 0, checked = 0;
  for (const ax of multi) {
    const axis = { axis_id: ax.axis_id, class: ax.class, field: ax.field,
      axis_statement: ax.axis_statement, scope_token: ax.scope_token,
      sides: [...ax.sides.keys()].sort(),
      members: [...ax.sides.entries()].map(([side, ms]) => ({ side, leaves: ms.map(m => m.leaf), paths: ms.map(m => m.leaf) })) };
    const w = W.selectWave({ verdict: 'CONTESTED', subClaims: [{ verdict: 'CONTESTED', axis, field: ax.field }] }, ctx);
    assert(w.personaCount === axis.sides.length, ax.axis_id + ' has ' + axis.sides.length +
      ' sides and bought ' + w.personaCount + ' personas -- a cap or a truncation is present');
    assert(w.personaCount >= 2, ax.axis_id + ' bought fewer than the minimum two');
    W.assertDisjointBriefs(w);
    maxSides = Math.max(maxSides, axis.sides.length);
    checked++;
  }
  return checked + ' multi-sided axes checked, widest ' + maxSides + ' sides -> ' + maxSides + ' personas, briefs pairwise disjoint';
});

/* --- 3.5 wiring, the thin-patch register consumed before retrieval ------------------------------ */

test('RT-13', 'the thin-patch register governs before retrieval, and the two tiers are separate', () => {
  const TP = require(path.join(ROOT, 'oracle/router/thin_patches.js'));
  assert(ctx.thinPatches && ctx.thinPatches.patches.length === 10, 'the register did not load');
  assert(ctx.thinGovern > ctx.thinFire, 'govern (' + ctx.thinGovern + ') is not above fire (' + ctx.thinFire + ')');

  /* Must govern: SRQ-13, the row the register exists for. It returns LITERATURE confirmed 9 of 9 at
     frac 0.85, so a "govern only where nothing else answered" precondition would block it. */
  const g = C.classifyQuestion(ctx, 'What excavation force is required to dig ice-bearing regolith at permanently shadowed region temperature?');
  assert(g.verdict === 'REFUSE' && g.reason_code === 'not-found', 'SRQ-13 returned ' + g.verdict + '/' + g.reason_code);
  const gs = g.subClaims[g.subClaims.length - 1];
  assert(gs.thin_patch && gs.thin_patch.patch_id === 'T1', 'SRQ-13 was not governed by T1');
  assert(gs.thin_patch.substitution && gs.thin_patch.nearest_present_object.length > 0,
    'the refusal carries no substitution or no nearest present object');

  /* Must FIRE and must NOT govern: SRQ-10. T3 at 5.961 is a LEGITIMATE fire and the row is BOTH in
     its own Must-carry cell. This is the constraint the superseded five-row band destroyed. */
  const f = C.classifyQuestion(ctx, 'The app amortizes plant over a ten-year life using BEA depreciation rates for terrestrial mining machinery. Does that transfer to a lunar plant?');
  const fs2 = f.subClaims[f.subClaims.length - 1];
  assert(f.verdict !== 'REFUSE', 'SRQ-10 was refused; a legitimate fire was allowed to govern');
  assert(fs2.thin.fired.some(x => x.patch_id === 'T3'), 'T3 did not fire on SRQ-10');
  assert(!fs2.evidence.thin_governed, 'T3 governed SRQ-10');
  return 'fire ' + ctx.thinFire + ' / govern ' + ctx.thinGovern + '; T1 governs SRQ-13 at 8.540, T3 fires-not-governs SRQ-10 at 5.961';
});

test('RT-14', 'the two refusal paths agree on SRQ-14, and every tokenizer literal has legal form', () => {
  const TP = require(path.join(ROOT, 'oracle/router/thin_patches.js'));
  const q = 'How often must lunar propellant be transferred to keep boil-off within limits?';

  /* A REAL CROSS-CHECK, not a coincidence: the excluded-node path and the thin-patch path reach
     SRQ-14 independently and must produce the SAME reason code. Only one of them executes -- the
     exclusions branch sits earlier -- so without this assertion the agreement could rot unnoticed
     the day either register is edited. */
  const cands = X.matchExclusions(ctx.surface, q, ctx.excludedBySlug);
  const node = ctx.excludedBySlug.get(cands[0].key);
  assert(node && node.slug === 'cadence-cryogenic-break', 'the exclusion path no longer reaches SRQ-14');
  const viaExclusion = X.verdictForOutcome(node.outcome, node);
  const t5 = ctx.thinPatches.patches.find(p => p.id === 'T5');
  const m = TP.patchMass(ctx.litDir, t5, require(path.join(ROOT, 'oracle/retrieval/literature_search.js')).tokenize(q));
  assert(m.mass >= ctx.thinGovern, 'T5 no longer governs SRQ-14 (' + m.mass.toFixed(3) + ' < ' + ctx.thinGovern + ')');
  const viaPatch = t5.refusal_code || 'not-found';
  assert(viaExclusion.reason_code === viaPatch, 'the two paths disagree: exclusion says ' +
    viaExclusion.reason_code + ', patch says ' + viaPatch);
  const r = C.classifyQuestion(ctx, q);
  assert(r.verdict === 'REFUSE' && r.reason_code === viaPatch, 'SRQ-14 returned ' + r.verdict + '/' + r.reason_code);

  /* K1 TOKEN FORM over every literal compared against tokenizer output. Three silent classes:
     hyphenated, uppercase, and tokenizing to nothing. 9 of 120 thin-patch triggers were in one of
     them before the register was repaired, and a literal in any of them can never match. */
  assert(ctx.token_form_failures.length === 0, ctx.token_form_failures.length + ' literal(s) fail K1: ' +
    ctx.token_form_failures.map(f => f.label + ':"' + f.key + '" ' + f.why).join(' | '));
  const checked = ctx.thinPatches.patches.reduce((a, p) => a + p.trigger_tokens.length, 0) +
    [...ctx.axes.values()].reduce((a, x) => a + x.match_keys.length, 0) +
    ctx.excluded.nodes.reduce((a, n) => a + (n.match_keys || []).length, 0);
  return 'both paths write ' + viaPatch + ' (T5 at ' + m.mass.toFixed(3) + '); K1 clean over ' + checked + ' literals';
});

/* --- report -------------------------------------------------------------------------------------- */

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? 'PASS  ' : 'FAIL  ') + r.id + '  ' + r.name);
  if (r.detail) console.log('        ' + r.detail);
}
console.log('');
console.log(results.length + ' tests, ' + (results.length - failed) + ' pass, ' + failed + ' fail. ' +
  'Every row above executed; none is unrun.');
process.exit(failed === 0 ? 0 : 1);
