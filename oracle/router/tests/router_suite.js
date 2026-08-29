#!/usr/bin/env node
/* oracle/router/tests/router_suite.js -- sixteen tests for router behaviour. Sub-steps 3.2, 3.4,
 * 3.8, 3.9, 3.10, re-pointed and extended at 8.1 and 8.2.
 *
 *   node oracle/router/tests/router_suite.js
 *
 * EVERY ONE EXECUTES. This project has 455 suite rows of which 357 do not run; UNRUN IS NOT PASS was
 * the finding of the wave that built the runner. Each row below calls a real function against the
 * real app and the real corpus. None asserts a value this file typed and none can pass by not
 * running.
 *
 * WHAT MOVED AT SUB-STEP 8.1, ROW BY ROW, because a suite whose meaning changed silently is worse
 * than one that was deleted:
 *
 *   RT-05  was "is FIGURE"; now asserts the report carries a SWEPT ADDRESS with the unbound
 *          dimension named -- and carries no verdict. FIGURE is the session's word, not this file's.
 *   RT-09  was "exactly one verdict per question, never two, never zero". There is no verdict. It
 *          now walks all 124 reports to every depth for a `verdict`/`reason_code`/`mode` key. The
 *          old row could not have caught a router that quietly went back to deciding; this one is
 *          the row that catches it.
 *   RT-10  was "every REFUSE carries one code". Nothing emits a REFUSE. It now runs the closed-set
 *          probes: the assertions are CALLED with legal and illegal values and the outcome required.
 *   RT-11  selectWave() takes the verdict as an argument; the row also asserts the PRE-8.1 CALL
 *          SHAPE IS REFUSED, because silently accepting it is how a verdict arrives unruled.
 *   RT-12  unchanged in substance; the CONTESTED ruling now names its own axes, and an axis-less
 *          CONTESTED ruling must throw.
 *   RT-13  was "the thin register GOVERNS before retrieval". It governs nothing now (8.6). It
 *          asserts both tiers are reported as marks, neither gates, the substitution still ships,
 *          and -- new -- that the shelf candidates for SRQ-13 are on the SAME report as the patch,
 *          which the old precedence order made impossible.
 *   RT-14  the exclusion/patch code agreement is now checked ON THE REPORT rather than by staging
 *          the second path by hand, because both channels run on every sub-claim.
 *   RT-15  NEW. Sub-step 8.1's close condition: the near-miss evidence the retired gate destroyed is
 *          in the report, proved on both of the author's worked examples with the masses.
 *   RT-16  NEW. Sub-step 8.2's close condition: the report states its own weight and failure modes
 *          inline, and the output grades behind FM-3 are MEASURED by probe rather than listed.
 *
 * Exit 0 only when all sixteen pass.
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

test('RT-05', 'a value output with no landed cost draws a figure, never a defaulted scalar', () => {
  let code = null;
  try { A.singlePoint(surface, { scenario: 'Agency Led Baseline', phase: '2040', output: 'r_prop' }); }
  catch (e) { code = e.code; }
  assert(code === A.ERR.LANDED_COST_UNBOUND, 'the grammar defaulted a landed cost instead of refusing (code ' + code + ')');
  const r = C.adviseQuestion(ctx, 'What is r_prop at Agency Led Baseline in the Pilot era?');
  const app = r.sub_claims[0].app;
  assert(app.resolves && app.address_form === 'sweep',
    'the router reported address_form ' + app.address_form + ', not a swept figure');
  assert(app.unbound_dimension === 'landed_cost', 'the unbound dimension is not named on the report');
  assert(app.points === A.railFor(surface, 'landed_cost').length,
    'the sweep does not cover the app\'s own rail');
  /* 8.1: the report says the address drew a figure. It does NOT say FIGURE, which is a verdict. */
  C.assertNoVerdict(r, 'RT-05');
  return 'grammar refuses ' + code + '; the report carries a swept address over ' + app.points +
    ' rail points with landed_cost named as the unbound dimension, and no verdict';
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

/* RT-09 was "exactly one verdict per question, never two, never zero". There is no verdict any
   more, so the row asserts what replaced it: a well-formed report on every question in every set,
   and NO VERDICT ANYWHERE IN ANY OF THEM at any depth. The old row could not have caught a router
   that quietly went back to deciding; this one is the thing that catches it. */
test('RT-09', 'no report anywhere carries a verdict field, over every question set on disk', () => {
  const sets = ACC.discover(ctx, []);
  const { rows, failures } = ACC.run(ctx, sets);
  assert(rows.length > 0, 'no questions were advised, so this test asserts nothing');
  assert(failures.length === 0, failures.length + ' violation(s), first: ' + (failures[0] && failures[0].error));
  let checked = 0;
  for (const set of sets) {
    for (const q of set.questions) { C.assertNoVerdict(C.adviseQuestion(ctx, q.question), q.id); checked++; }
  }
  const present = sets.filter(s => s.questions.length).map(s => path.basename(s.name) + '=' + s.questions.length);
  return checked + ' reports walked to every depth for a `verdict`, `reason_code` or `mode` key: none found. ' +
    rows.reduce((a, r) => a + r.findings, 0) + ' findings over ' + rows.reduce((a, r) => a + r.sub_claims, 0) +
    ' sub-claims [' + present.join(', ') + ']';
});

/* RT-10 was "every REFUSE carries one code from the closed six". Nothing emits a REFUSE now, so the
   row asserts the property that outlived it: the closed sets are STILL CLOSED, tested by calling
   the assertions with legal and illegal values and requiring the outcome. A closed set nothing
   tries to break is a closed set nobody has tested. */
test('RT-10', 'the closed sets are still closed, and the assertions that guard them still throw', () => {
  const proofs = ACC.closedSetProbes();
  const bad = proofs.filter(p => !p.pass);
  assert(proofs.length >= 20, 'only ' + proofs.length + ' probes; the closed sets are barely tested');
  assert(bad.length === 0, bad.length + ' probe(s) broken: ' + bad.map(p => p.name + ' -- ' + p.why).join('; '));
  assert(C.VERDICTS.length === 6, 'the verdict set is ' + C.VERDICTS.length + ', not six');
  return proofs.length + ' probes, all pass: ' + C.VERDICTS.length + ' verdicts and ' +
    C.REASON_CODES.length + ' reason codes accepted, MAYBE/null/lowercase/uncoded-REFUSE rejected, ' +
    'a report carrying a verdict rejected, and classifyQuestion()/compose() throw as retired';
});

/* --- 3.9, the wave selector --------------------------------------------------------------------- */

test('RT-11', 'the persona count is derived from the SESSION\'S verdict rather than one the router chose', () => {
  /* Mutate the contract table and the wave must follow it. A hard-coded count would not move. */
  const original = W.ARITY.LITERATURE.of;
  const before = W.selectWave('LITERATURE', { field: 'lunar' }, ctx);
  W.ARITY.LITERATURE.of = () => 0;
  let after;
  try { after = W.selectWave('LITERATURE', { field: 'lunar' }, ctx); }
  finally { W.ARITY.LITERATURE.of = original; }
  assert(before.personaCount === 1 && after.personaCount === 0,
    'the count did not follow the contract table: ' + before.personaCount + ' -> ' + after.personaCount);
  for (const v of ['APP', 'FIGURE', 'REFUSE']) {
    const w = W.selectWave(v, { field: null }, ctx);
    assert(w.personaCount === 0, v + ' bought ' + w.personaCount + ' personas; the contract says zero');
  }
  /* 8.1: the OLD call shape -- handing selectWave the router's own output object -- must not be
     silently accepted, because accepting it is how the router goes back to deciding by accident. */
  let threw = false;
  try { W.selectWave({ verdict: 'LITERATURE', subClaims: [] }, ctx); } catch (e) { threw = /VERDICT STRING/.test(e.message); }
  assert(threw, 'selectWave() still accepts the pre-8.1 object shape, so a verdict can still arrive without anybody ruling it');
  return 'LITERATURE follows the table 1 -> 0; APP, FIGURE and REFUSE each buy 0; the pre-8.1 ' +
    'object-shaped call is refused by name';
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
    const w = W.selectWave('CONTESTED', { axes: [axis], field: ax.field }, ctx);
    assert(w.personaCount === axis.sides.length, ax.axis_id + ' has ' + axis.sides.length +
      ' sides and bought ' + w.personaCount + ' personas -- a cap or a truncation is present');
    assert(w.personaCount >= 2, ax.axis_id + ' bought fewer than the minimum two');
    W.assertDisjointBriefs(w);
    maxSides = Math.max(maxSides, axis.sides.length);
    checked++;
  }
  /* 8.1: a CONTESTED ruling that names no axis must throw. The router used to supply the axis by
     scoring; now the session must say WHICH disagreement it ruled, and a wave built without one
     would be a verdict with its evidence detached. */
  let threw = false;
  try { W.selectWave('CONTESTED', { field: 'lunar' }, ctx); } catch (e) { threw = /names no axis/.test(e.message); }
  assert(threw, 'a CONTESTED ruling with no named axis built a wave anyway');
  return checked + ' multi-sided axes checked, widest ' + maxSides + ' sides -> ' + maxSides +
    ' personas, briefs pairwise disjoint; an axis-less CONTESTED ruling is refused';
});

/* --- 3.5 wiring, the thin-patch register consumed before retrieval ------------------------------ */

/* RT-13 was "the thin-patch register GOVERNS before retrieval". It no longer governs anything --
   8.6 retires the govern tier as a gate -- so the row asserts what the register is FOR once it stops
   deciding: the substitution content reaches the report on both rows, with both tiers reported as
   marks and neither applied. The two fixtures are unchanged and are still the two that matter, and
   the second is still the one that a single-tier rule destroys. */
test('RT-13', 'both thin tiers are reported as marks, neither gates, and the substitution still ships', () => {
  assert(ctx.thinPatches && ctx.thinPatches.patches.length === 10, 'the register did not load');
  assert(ctx.thinGovern > ctx.thinFire, 'govern (' + ctx.thinGovern + ') is not above fire (' + ctx.thinFire + ')');

  /* SRQ-13, the row the register exists for. It ALSO returns 5 shelf candidates -- retrieval being
     confident is the symptom, not the licence -- and both facts are now on one report at once,
     which is the thing the old precedence order made impossible. */
  const g = C.adviseQuestion(ctx, 'What excavation force is required to dig ice-bearing regolith at permanently shadowed region temperature?');
  const gs = g.sub_claims[g.sub_claims.length - 1];
  const t1 = gs.thin_patches.findings.find(f => f.patch_id === 'T1');
  assert(t1, 'T1 does not appear in the thin-patch findings for SRQ-13');
  assert(t1.crosses_govern_mark === true, 'T1 no longer crosses the govern mark on SRQ-13 (' + (t1 && t1.mass) + ')');
  assert(t1.substitution && t1.nearest_present_object.length > 0,
    'the T1 finding carries no substitution or no nearest present object');
  assert(t1.patch_declares_code === 'not-found', 'T1 declares code ' + t1.patch_declares_code);
  assert(gs.retrieval.candidates.length > 0,
    'the shelf channel returned nothing on SRQ-13, so the report cannot show the reader BOTH that a ' +
    'patch matched and that retrieval was confident anyway -- which is the whole point of running all five');

  /* SRQ-10. T3 at 5.961 crosses fire and not govern. Under the retired gate this distinction was
     load-bearing: a one-tier rule either silenced a legitimate fire or turned a BOTH into a REFUSE,
     and one band measured on five control rows did the latter to six rows. It is now a reported
     margin on both sides, which cannot destroy anything. */
  const f = C.adviseQuestion(ctx, 'The app amortizes plant over a ten-year life using BEA depreciation rates for terrestrial mining machinery. Does that transfer to a lunar plant?');
  const fs2 = f.sub_claims[f.sub_claims.length - 1];
  const t3 = fs2.thin_patches.findings.find(x => x.patch_id === 'T3');
  assert(t3, 'T3 does not appear in the thin-patch findings for SRQ-10');
  assert(t3.crosses_fire_mark === true && t3.crosses_govern_mark === false,
    'T3 on SRQ-10 reads fire=' + t3.crosses_fire_mark + ' govern=' + t3.crosses_govern_mark + ' at ' + t3.mass);
  assert(t3.margin_to_fire_mark > 0 && t3.margin_to_govern_mark < 0, 'the two margins do not straddle the tiers');
  C.assertNoVerdict(g, 'RT-13/SRQ-13'); C.assertNoVerdict(f, 'RT-13/SRQ-10');
  return 'marks fire ' + ctx.thinFire + ' / govern ' + ctx.thinGovern + ' (reported, not applied); T1 on ' +
    'SRQ-13 at ' + t1.mass + ' crosses both alongside ' + gs.retrieval.candidates.length + ' shelf candidate(s); ' +
    'T3 on SRQ-10 at ' + t3.mass + ' crosses fire (+' + t3.margin_to_fire_mark + ') and not govern (' + t3.margin_to_govern_mark + ')';
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
  /* 8.1: the agreement is now checked ON THE REPORT, which is stronger. The old row could only see
     the one code the precedence order let through -- the exclusions branch sat earlier, so the patch
     path never executed and the agreement could rot unnoticed the day either register was edited.
     Both channels run on every sub-claim now, so both codes are on the same report and can be
     compared without staging anything. */
  const r = C.adviseQuestion(ctx, q);
  const s = r.sub_claims[r.sub_claims.length - 1];
  const ex = s.exclusions.findings.find(f => f.slug === 'cadence-cryogenic-break');
  const tp = s.thin_patches.findings.find(f => f.patch_id === 'T5');
  assert(ex, 'the exclusion channel does not carry cadence-cryogenic-break on SRQ-14');
  assert(tp, 'the thin channel does not carry T5 on SRQ-14');
  assert(ex.outcome_maps_to_code === viaPatch && tp.patch_declares_code === viaPatch,
    'the report\'s two channels disagree: exclusion maps to ' + ex.outcome_maps_to_code +
    ', patch declares ' + tp.patch_declares_code);
  C.assertNoVerdict(r, 'RT-14');

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

/* --- 8.1, the near-miss survives; 8.2, the report says what it is worth ------------------------- */

/* THE CLOSE CONDITION OF SUB-STEP 8.1, EXECUTABLE. The whole sub-step is one claim: evidence that
   the retired gate destroyed is now in front of the reader. This row proves it on the two fixtures
   the author named, with the masses, and it fails if the filter ever comes back. */
test('RT-15', 'the near-miss evidence the retired gate destroyed is in the report, on both worked examples', () => {
  /* FM-1. LCC-07 is an axis about the energy cost of oxygen production; SRQ-12 asks the energy cost
     of oxygen production; the key that would have carried the mass reads `kwh`. */
  const r12 = C.adviseQuestion(ctx, 'How much energy does it take to produce a kilogram of oxygen on the Moon?');
  const f7 = r12.sub_claims.flatMap(s => s.register.findings).find(f => f.axis_id === 'LCC-07');
  assert(f7, 'LCC-07 does not appear in the report for SRQ-12 -- the axis filter is back and the ' +
    'evidence is invisible again, which is the entire defect 8.1 exists to remove');
  assert(f7.mass < ctx.K, 'LCC-07 now reaches K on SRQ-12 (' + f7.mass + '); the fixture has moved and this row is stale');
  assert(f7.margin < 0 && f7.side_of_mark === 'below', 'the margin is not reported as below the mark');
  assert(!f7.keys_matched.includes('kwh'), '`kwh` matched, so the worked example FM-1 no longer describes reality');

  /* FM-2. Three axes tie at exactly one mass on the single shared key `power`, and a ranked list
     that printed one of them first would look like it had chosen. */
  const r8 = C.adviseQuestion(ctx, 'How much electrical power is actually extractable at the lunar south pole?');
  const all8 = r8.sub_claims.flatMap(s => s.register.findings);
  const f9 = all8.find(f => f.axis_id === 'LCC-09');
  assert(f9, 'LCC-09 does not appear in the report for SRQ-8');
  assert(!f9.keys_matched.includes('polar'), '`polar` matched "pole", so FM-2 no longer describes reality');
  assert(f9.tied_at_identical_mass_with.length >= 2, 'the three-way tie at ' + f9.mass +
    ' is not reported as a tie; a ranked list would print one of them first and look like it chose');
  assert(f9.confidence === 'very-low', 'a tied finding is not marked very-low');

  /* Nothing was suppressed on the way here. */
  for (const s of r12.sub_claims.concat(r8.sub_claims)) {
    assert(s.register.suppressed_by_a_threshold === 0, 'a register finding was suppressed');
    assert(s.channels_run.length === 5, 'not all five channels ran');
  }
  return 'SRQ-12 carries LCC-07 at ' + f7.mass + ' (margin ' + f7.margin + ', ' + f7.confidence +
    ') on [' + f7.keys_matched.join(',') + ']; SRQ-8 carries LCC-09 at ' + f9.mass + ' tied with ' +
    f9.tied_at_identical_mass_with.join(',') + '. Both were invisible under the retired gate';
});

/* SUB-STEP 8.2, EXECUTABLE. The failure modes and the weight are IN the artifact, and the output
   grades that make FM-3 true are MEASURED against the app rather than typed into a list. */
test('RT-16', 'the report states its own weight and failure modes, and the echo grades are measured', () => {
  const r = C.adviseQuestion(ctx, 'What is the water output at Agency Led Baseline in 2040?');
  assert(r.reliability.weight === 'VERY LOW', 'the report does not state its weight');
  assert(/very low weight/i.test(r.reliability.weight_source), 'the weight does not cite the ruling that set it');
  assert(r.failure_modes.length >= 5, 'only ' + r.failure_modes.length + ' failure modes carried inline');
  for (const fm of r.failure_modes) {
    assert(fm.id && fm.question && fm.what_happened && fm.the_point,
      fm.id + ' is not a worked example: it is missing the question, what happened, or the point');
  }
  assert(/kwh/i.test(JSON.stringify(r.failure_modes)) && /polar/i.test(JSON.stringify(r.failure_modes)),
    'the kwh and polar misses are not both carried as worked examples');
  assert(/weak evidence/i.test(r.reliability.a_non_match_is_weak_evidence_of_absence),
    'the report does not say a non-match is weak evidence of absence');
  assert(/overrule|override/i.test(r.reliability.override_on_judgement),
    'the report does not tell the reader to override it');

  /* FM-3, measured. The grades come from probing the app, so this row moves if the app moves. */
  const echoes = [...ctx.outputGrades].filter(([, v]) => v.grade === 'input_echo').map(([k]) => k).sort();
  const consts = [...ctx.outputGrades].filter(([, v]) => v.grade === 'constant').map(([k]) => k).sort();
  assert(echoes.length > 0, 'no output key was measured as an input echo; the probe is not running');
  for (const k of echoes.concat(consts)) {
    assert(ctx.outputGrades.get(k).varies_over_addresses === false,
      k + ' is graded ' + ctx.outputGrades.get(k).grade + ' but is reported as varying');
  }
  /* An address on an echo key must never earn `high`, however well-formed it is. */
  const echoQ = C.adviseQuestion(ctx, 'What is the ice at Agency Led Baseline in 2040?');
  const ea = echoQ.sub_claims[0].app;
  if (ea.resolves && ea.answers_output_grade === 'input_echo') {
    assert(ea.confidence === 'very-low', 'a resolved address on an echo key earned ' + ea.confidence);
  }
  return r.failure_modes.length + ' worked examples inline; ' + echoes.length + ' echo key(s) [' +
    echoes.join(' ') + '] and ' + consts.length + ' constant key(s) [' + consts.join(' ') +
    '] measured by probe, not listed';
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
