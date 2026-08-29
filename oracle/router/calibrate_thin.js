#!/usr/bin/env node

/* ============================================================================================
 * RETIRED AT SUB-STEP 8.6. THIS FILE CALIBRATED A GATE THAT NO LONGER EXISTS, AND ITS OBJECTIVE
 * HAS NO SUBJECT.
 *
 * It swept the govern threshold against two objectives, and the second one was AGREEMENT WITH THE
 * VERDICT THE CLASSIFIER EMITTED on the 14 labelled acceptance rows. Sub-step 8.1 deleted the
 * verdict. There is nothing left for the sweep to score against, and a calibration re-pointed at
 * some other objective would be a different measurement wearing this one name.
 *
 * IT NO LONGER WRITES, AND IT NO LONGER RUNS ITS VERDICT SWEEP. Both tiers survive as REPORTED
 * reference marks in oracle/router/thin_threshold.json, which now carries the disposition, the two
 * band endpoint observations, and the superseded five-row band with its measured damage -- six
 * correct verdicts destroyed. That record is the whole reason this sub-step is not simply deleted:
 * it cost two seat-sittings and it is falsifiable.
 * ============================================================================================ */
/* oracle/router/calibrate_thin.js -- re-measure the two thin-patch thresholds.
 *
 *   node oracle/router/calibrate_thin.js            report the sweep
 *   node oracle/router/calibrate_thin.js --write    write oracle/router/thin_threshold.json
 *
 * WHY THIS RE-MEASURES RATHER THAN ADOPTS. The Space Resources seat measured fire 1.7 and govern
 * 6.175 over 49 control rows and marked both PROVISIONAL and mine to set. That is the better figure
 * and I am not second-guessing it. I am re-measuring because THIS SUB-STEP HAS ALREADY SHIPPED A
 * WRONG BAND ONCE: (1.86, 3.78], measured on five control rows, would have made T3 govern SRQ-10
 * and T6 govern LCC-14, converting a correct BOTH and a correct CONTESTED into refusals. It did not
 * look like a guess. The five rows simply did not contain the two rows that constrain it.
 *
 * The lesson is not "measure more rows". It is that a threshold is only as good as the COVERAGE OF
 * THE OBJECTIVE it was measured against. So this file uses a different objective from the seat's,
 * over a wider population, and adopts a value only where they agree:
 *
 *   Objective A, the register's own.  The 20 probe_pos/probe_neg rows of oracle/thin_patches.json.
 *                                     probe_pos must govern; probe_neg must not.
 *   Objective B, INDEPENDENT.         The labelled rows of oracle/acceptance/lunar_questions.md,
 *                                     scored through the FULL CLASSIFIER against their expected
 *                                     verdict column. Authored by a different seat, against the app
 *                                     and the corpus, for a different purpose. This is the kind of
 *                                     objective the five-row set lacked.
 *   Objective C, COLLATERAL.          Every question on disk. Counts how many non-REFUSE verdicts a
 *                                     candidate threshold DESTROYS -- the damage the wrong band did,
 *                                     measured directly rather than inferred.
 *
 * Where A and B do not share a plateau, this file adopts nothing and says so.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./classify.js');
const TP = require('./thin_patches.js');
const ACC = require('./acceptance.js');
const LIT = require('../retrieval/literature_search.js');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'oracle', 'router', 'thin_threshold.json');

/* Classify every question ONCE with both tiers switched off, recording each sub-claim's verdict and
   its maximum patch mass. Every candidate threshold is then evaluated analytically off that table:
   a sub-claim flips to REFUSE exactly when its max mass crosses govern AND it reached the thin
   stage, which is recorded rather than assumed. Re-running the classifier per threshold would be
   thousands of literature searches measuring the same thing. */
function baseline() {
  const ctx = C.loadContext({ thinFire: Infinity, thinGovern: Infinity });
  if (ctx.refuse) throw new Error('cannot calibrate: ' + ctx.refuse.missing.join('; '));
  const sets = ACC.discover(ctx, []);
  const rows = [];
  for (const set of sets) {
    for (const q of set.questions) {
      const r = C.classifyQuestion(ctx, q.question);
      for (const s of r.subClaims) {
        rows.push({
          set: set.name, id: q.id, question: q.question,
          expect_verdict: q.expect_verdict || null, expect_code: q.expect_code || null,
          verdict: r.verdict, sub_verdict: s.verdict, sub_code: s.reason_code,
          /* The thin branch sits after APP, CONTESTED and EXCLUSIONS and before the shelf, so the
             stage is reached exactly when the sub-claim ended in the LITERATURE mode. */
          reached: s.mode === 'LITERATURE',
          max_mass: s.thin ? s.thin.max_mass : 0,
          top: s.thin ? s.thin.top : null,
        });
      }
    }
  }
  return { ctx, rows };
}

function probeRows(ctx) {
  const out = [];
  for (const p of ctx.thinPatches.patches) {
    for (const pair of [['probe_pos', 'govern'], ['probe_neg', 'quiet']]) {
      if (!p[pair[0]]) continue;
      const m = TP.patchMass(ctx.litDir, p, LIT.tokenize(p[pair[0]]));
      out.push({ patch: p.id, expect: pair[1], question: p[pair[0]], mass: m.mass });
    }
  }
  return out;
}

function scoreA(probes, govern) {
  const fails = probes.filter(r => (r.expect === 'govern') !== (r.mass >= govern));
  return { pass: probes.length - fails.length, total: probes.length, fails };
}

function verdictAt(row, govern) {
  if (row.reached && row.max_mass >= govern) return { verdict: 'REFUSE', code: 'not-found' };
  return { verdict: row.verdict, code: row.sub_code };
}

function scoreB(rows, govern) {
  const byId = new Map();
  for (const r of rows.filter(x => x.expect_verdict)) {
    const v = verdictAt(r, govern);
    const prev = byId.get(r.id);
    if (!prev || v.verdict === 'REFUSE') byId.set(r.id, { row: r, v: v });
  }
  let agree = 0; const disagree = [];
  for (const entry of byId.values()) {
    const row = entry.row, v = entry.v;
    let ok = v.verdict === row.expect_verdict;
    if (ok && row.expect_verdict === 'REFUSE' && row.expect_code) ok = (v.code === row.expect_code);
    if (ok) agree++;
    else disagree.push({ id: row.id, expected: row.expect_verdict + (row.expect_code ? '/' + row.expect_code : ''),
      got: v.verdict + (v.code ? '/' + v.code : ''), mass: row.max_mass, top: row.top });
  }
  return { agree: agree, total: byId.size, disagree: disagree };
}

/* OBJECTIVE D, ADDED AFTER OBJECTIVE B GOT IT WRONG, and this is the finding of the re-measurement.
 *
 * B scores the labelled rows through the full classifier. That makes it BLIND TO A CONSTRAINT
 * ANOTHER PATH IS MASKING. SRQ-14 must be governed by T5 at mass 6.389 -- but SRQ-14 ALSO reaches
 * REFUSE/not-found through the excluded-node path, so B scores it correct at any govern threshold
 * above 6.389, where the patch contributes nothing. B therefore plateaus out to 8.516 and its
 * midpoint, 7.038, SILENTLY DROPS THE CROSS-CHECK the orchestrator identified as real.
 *
 * That is the five-row failure again, one level up: an objective whose coverage does not contain
 * the row that constrains it. The fix is the same in kind -- a constraint that does not depend on
 * any other path succeeding. D requires that where a labelled row expects REFUSE, the THIN PATH
 * ITSELF governs it, independent of what any other mode would have returned. */
function scoreD(rows, govern) {
  const byId = new Map();
  for (const r of rows.filter(x => x.expect_verdict === 'REFUSE')) {
    const prev = byId.get(r.id);
    if (!prev || r.max_mass > prev.max_mass) byId.set(r.id, r);
  }
  const fails = [];
  for (const r of byId.values()) if (!(r.max_mass >= govern)) fails.push(r);
  return { pass: byId.size - fails.length, total: byId.size, fails: fails };
}

function scoreC(rows, govern) {
  const destroyed = rows.filter(r => r.reached && r.max_mass >= govern && r.sub_verdict !== 'REFUSE');
  return { destroyed: destroyed.length, rows: destroyed };
}

function plateau(points, key) {
  const best = Math.max.apply(null, points.map(p => p[key]));
  let bestRun = null, run = null;
  for (const p of points) {
    if (p[key] === best) { if (!run) run = { from: p.T, to: p.T }; else run.to = p.T; }
    else { if (run && (!bestRun || run.to - run.from > bestRun.to - bestRun.from)) bestRun = run; run = null; }
  }
  if (run && (!bestRun || run.to - run.from > bestRun.to - bestRun.from)) bestRun = run;
  return { best: best, from: bestRun.from, to: bestRun.to };
}

function seatValue(ctx) { return ctx.thinPatches.firing_rule.govern_threshold.value; }
function inBandOf(both, v, step) { return both.some(p => Math.abs(p.T - v) <= step); }

function main() {
  console.error('oracle/router/calibrate_thin.js: RETIRED at sub-step 8.6.');
  console.error('');
  console.error('Its sweep scored a govern threshold against the VERDICT the classifier emitted on the 14');
  console.error('labelled acceptance rows. Sub-step 8.1 deleted the verdict, so the objective has no subject');
  console.error('and the sweep cannot be run honestly. Both tiers survive as reported reference marks in');
  console.error('oracle/router/thin_threshold.json, which carries the disposition, the two band endpoint');
  console.error('observations, and the superseded five-row band with its measured damage.');
  console.error('');
  console.error('If you need to change a mark, it is a data edit to that artifact by whoever owns the number.');
  process.exit(2);
}

function mainRetired() {
  const base = baseline();
  const ctx = base.ctx, rows = base.rows;
  const probes = probeRows(ctx);
  const hi = Math.max.apply(null, rows.map(r => r.max_mass).concat(probes.map(p => p.mass))) + 1;

  const pts = [];
  for (let i = 0; i <= 800; i++) {
    const T = Number(((hi * i) / 800).toFixed(4));
    const a = scoreA(probes, T), b = scoreB(rows, T), c = scoreC(rows, T), d = scoreD(rows, T);
    pts.push({ T: T, a: a.pass, b: b.agree, c: c.destroyed, d: d.pass, total_a: a.total, total_b: b.total, total_d: d.total });
  }

  const pa = plateau(pts, 'a');
  const pb = plateau(pts, 'b');
  const pd = plateau(pts, 'd');
  const both = pts.filter(p => p.a === pa.best && p.b === pb.best && p.d === pd.best);
  const lo = both.length ? both[0].T : null;
  const up = both.length ? both[both.length - 1].T : null;
  const seat = seatValue(ctx);
  const step = hi / 800;
  const inBand = inBandOf(both, seat, step);
  const myMid = both.length ? Number(((lo + up) / 2).toFixed(3)) : null;

  /* ADOPTION. Where the register's own figure lies inside the joint interval, IT is adopted and my
     midpoint is not. Three reasons, in order of weight.

     1. It was measured against 49 control rows including the two that actually bind; my interval is
        wider because my objectives cannot separate points the register's controls can.
     2. MARGIN. The binding must-not-govern row is T3 on SRQ-10 at 5.961, a LEGITIMATE fire. My
        midpoint clears it by 0.006. The register's figure clears it by 0.214, thirty-five times the
        margin, and the row above it (T5 on SRQ-14 at 6.389) by 0.214 as well -- it sits at the
        centre of the true band where mine sits on its edge.
     3. A midpoint of an interval whose width is an artifact of MY objectives' blindness is not a
        better number for being mine.

     My measurement's job was to check the figure, not to replace it. It checks out. */
  const chosen = (both.length && inBand) ? seat : myMid;

  console.log('THIN-PATCH GOVERN THRESHOLD, RE-MEASURED');
  console.log('  population: ' + rows.length + ' sub-claims over ' +
    new Set(rows.map(r => r.id)).size + ' questions, plus ' + probes.length + ' register probe rows');
  console.log('');
  console.log('  A  register probes    best ' + pa.best + '/' + pts[0].total_a +
    '   over T in [' + pa.from.toFixed(3) + ', ' + pa.to.toFixed(3) + ']');
  console.log('  B  labelled rows      best ' + pb.best + '/' + pts[0].total_b +
    '   over T in [' + pb.from.toFixed(3) + ', ' + pb.to.toFixed(3) + ']');
  console.log('  D  must-govern rows    best ' + pd.best + '/' + pts[0].total_d +
    '   over T in [' + pd.from.toFixed(3) + ', ' + pd.to.toFixed(3) + ']');
  console.log('  A, B and D jointly    T in [' + (lo == null ? '-' : lo.toFixed(3)) + ', ' +
    (up == null ? '-' : up.toFixed(3)) + ']    midpoint ' + chosen);
  console.log('  the seat\'s 6.175 is ' + (inBand ? 'INSIDE' : 'OUTSIDE') + ' the joint interval');
  console.log('');

  const cAt = scoreC(rows, chosen == null ? Infinity : chosen);
  console.log('  C  collateral at ' + chosen + ': ' + cAt.destroyed + ' non-REFUSE verdict(s) destroyed');
  for (const r of cAt.rows.slice(0, 8)) {
    console.log('       ' + r.id + '  ' + r.sub_verdict + ' -> REFUSE  (' + r.top + ' at ' +
      r.max_mass + ')  ' + r.question.slice(0, 58));
  }

  const oldMid = 2.82;
  const cOld = scoreC(rows, oldMid);
  const bOld = scoreB(rows, oldMid);
  console.log('');
  console.log('  the superseded five-row band (1.86, 3.78] at midpoint ' + oldMid + ': destroys ' +
    cOld.destroyed + ' verdict(s), scores B ' + bOld.agree + '/' + pts[0].total_b);
  for (const r of cOld.rows.slice(0, 6)) {
    console.log('       would destroy  ' + r.id + '  ' + r.sub_verdict + ' -> REFUSE  (' + r.top +
      ' at ' + r.max_mass + ')');
  }

  const bAt = scoreB(rows, chosen == null ? Infinity : chosen);
  if (bAt.disagree.length) {
    console.log('');
    console.log('  B disagreements remaining at ' + chosen + ':');
    for (const d of bAt.disagree) {
      console.log('       ' + d.id + '  expected ' + d.expected + '  got ' + d.got +
        '  (top patch ' + d.top + ' at ' + d.mass + ')');
    }
  }

  if (ctx.token_form_failures && ctx.token_form_failures.length) {
    console.log('');
    console.log('  K1 TOKEN FORM failures across every literal compared against tokenizer output: ' +
      ctx.token_form_failures.length);
    for (const f of ctx.token_form_failures) {
      console.log('       ' + f.label + '  "' + f.key + '"  ' + f.why);
    }
  } else {
    console.log('');
    console.log('  K1 TOKEN FORM: 0 failures across thin_patches.trigger_tokens, REGISTER.match_keys ' +
      'and excluded_nodes.match_keys');
  }

  if (process.argv.indexOf('--write') >= 0) {
    if (chosen == null) {
      console.error('no threshold satisfies both objectives; adopting nothing.');
      process.exit(1);
    }
    const fire = ctx.thinPatches.firing_rule.fire_threshold.value;
    fs.writeFileSync(OUT, JSON.stringify({
      fire_threshold: fire,
      govern_threshold: chosen,
      status: 'PROVISIONAL',
      owner: 'the router seat (W4-2), on the same footing as K in oracle/router/axis_threshold.json',
      set_by: 'oracle/router/calibrate_thin.js',
      provenance: 'joint plateau of two independently measured objectives: the thin-patch register\'s ' +
        'own ' + probes.length + ' probe rows, and the ' + pts[0].total_b + ' labelled acceptance rows ' +
        'scored through the full classifier. Joint interval [' + lo.toFixed(3) + ', ' + up.toFixed(3) + '].',
      joint_interval: [lo, up],
      register_figure: seat,
      register_figure_inside_joint_interval: inBand,
      fire_threshold_source: 'oracle/thin_patches.json firing_rule.fire_threshold, adopted unchanged. ' +
        'The fire tier attaches content and never moves a verdict, so it carries no collateral risk ' +
        'and re-measuring it against a verdict objective would measure nothing.',
      collateral_at_adopted: cAt.destroyed,
      superseded_band: {
        band: [1.86, 3.78], midpoint: oldMid,
        verdicts_destroyed: cOld.destroyed, labelled_score: bOld.agree + '/' + pts[0].total_b,
        note: 'the five-row band. Recorded with its measured damage so the failure is falsifiable ' +
          'rather than remembered.',
      },
    }, null, 2) + '\n', 'utf8');
    console.log('');
    console.log('wrote ' + path.relative(ROOT, OUT) + '   fire=' + fire + '  govern=' + chosen);
  }
}

if (require.main === module) main();
module.exports = { baseline, probeRows, scoreA, scoreB, scoreC, verdictAt };
