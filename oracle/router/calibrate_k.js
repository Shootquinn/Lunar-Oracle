#!/usr/bin/env node

/* ============================================================================================
 * RETIRED AT SUB-STEP 8.6. THIS FILE CALIBRATED A GATE THAT NO LONGER EXISTS.
 *
 * K was the axis FIRING threshold: an axis whose mass reached it fired, and one that did not was
 * removed from the router output. Sub-step 8.1 deleted the decision. K survives as a REPORTED
 * reference mark so that a mass can be shown with a signed margin, and oracle/router/classify.js
 * reads oracle/router/axis_threshold.json for exactly that.
 *
 * WHY THIS FILE IS KEPT AND NOT DELETED. Its sweep is the record of what was measured, and the
 * record argues against the gate better than any prose could: 11 of 66 probe questions disagree
 * with the plateau midpoint, and the plateau itself is 9% wide, so every value in [2.3195, 2.5416]
 * scores identically. Those eleven rows are preserved verbatim in axis_threshold.json.
 *
 * IT NO LONGER WRITES. --write is refused, because writing a new K would move a mark this project
 * has ruled is not a decision, on the strength of an objective (agreement with a verdict the router
 * emits) that no longer has a subject. The sweep still RUNS and still prints, for anybody who wants
 * to re-measure the record.
 * ============================================================================================ */
/* oracle/router/calibrate_k.js -- measure a value for K, the axis firing threshold.
 *
 *   node oracle/router/calibrate_k.js            report the sweep
 *   node oracle/router/calibrate_k.js --write    write oracle/router/axis_threshold.json
 *
 * K IS NOT MINE TO SET AND THIS FILE DOES NOT SET IT. oracle/register_schema.md section 4.3 assigns
 * K to sub-step 3.6 and deliberately states no number, on the ground that a threshold tuned on a
 * single-field 156-file corpus has no standing at the merged size and that stating one inside the
 * document correcting that practice would repeat the error. 3.6 landed
 * oracle/acceptance/labelled_questions.tsv and the retrieval confirmation threshold; it did not
 * land K, and sub-step 3.8's classifier cannot fire an axis without one.
 *
 * So this file MEASURES a value and marks it PROVISIONAL with 3.6 as its owner. What it does not do
 * is put a number in classify.js. The classifier reads K from the artifact this writes and refuses
 * `input-missing` when the artifact is absent, so an unset K is a visible refusal rather than a
 * silent default -- which is the same failure shape as C2, a routing decision nobody can see.
 *
 * THE FIXTURE SET IS THE REGISTER'S OWN, and section 4.2 names it: "probe_pos and probe_neg are the
 * test that replaces the checker." Every axis carries one question that MUST fire it and one that
 * touches at least one of its member files and must NOT. Thirty-three axes, sixty-six labelled
 * questions, authored by the two domain seats before any threshold existed. That is a labelled
 * fixture set whose author is not the seat tuning against it, which is this project's own remedy.
 *
 * THE OBJECTIVE IS NOT ACCURACY, IT IS THE PLATEAU. A single best-accuracy point can sit on a
 * knife edge. The value reported is the midpoint of the widest interval over which the score does
 * not change, which is the same posture oracle/retrieval/tune_threshold.js takes toward its own
 * constant.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./classify.js');
const LIT = require('../retrieval/literature_search.js');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'oracle', 'router', 'axis_threshold.json');

function fixtures(ctx) {
  const rows = [];
  for (const ax of ctx.axes.values()) {
    if (ax.probe_pos && ax.probe_pos !== '-') rows.push({ axis_id: ax.axis_id, expect: 'fire', question: ax.probe_pos });
    if (ax.probe_neg && ax.probe_neg !== '-') rows.push({ axis_id: ax.axis_id, expect: 'quiet', question: ax.probe_neg });
  }
  return rows;
}

/* The mass of an axis's keys in one question, independent of K. Computed once per (row, axis) and
   reused across the whole sweep; scoring 66 questions against 33 axes at 200 thresholds otherwise
   rebuilds the same IDF lookups forty thousand times. */
function massTable(ctx, rows) {
  return rows.map(r => {
    const tokens = LIT.tokenize(r.question);
    const masses = new Map();
    for (const ax of ctx.axes.values()) masses.set(ax.axis_id, C.axisMass(ctx, ax, tokens).mass);
    return { row: r, masses };
  });
}

function scoreAt(table, K) {
  let pass = 0;
  const fails = [];
  for (const t of table) {
    const m = t.masses.get(t.row.axis_id);
    const ok = t.row.expect === 'fire' ? (m >= K) : (m < K);
    if (ok) pass++; else fails.push({ axis_id: t.row.axis_id, expect: t.row.expect, mass: Number(m.toFixed(3)), question: t.row.question });
  }
  return { K, pass, total: table.length, fails };
}

function sweep(table) {
  const all = [];
  for (const t of table) all.push(t.masses.get(t.row.axis_id));
  const lo = 0, hi = Math.max(...all) + 1;
  const step = (hi - lo) / 400;
  const pts = [];
  for (let k = lo; k <= hi; k += step) pts.push(scoreAt(table, Number(k.toFixed(4))));
  return pts;
}

/* Widest run of consecutive thresholds sharing the best score; report its midpoint. */
function plateauMidpoint(pts) {
  const best = Math.max(...pts.map(p => p.pass));
  let bestRun = null, run = null;
  for (const p of pts) {
    if (p.pass === best) { if (!run) run = { from: p.K, to: p.K, pass: p.pass }; else run.to = p.K; }
    else { if (run && (!bestRun || (run.to - run.from) > (bestRun.to - bestRun.from))) bestRun = run; run = null; }
  }
  if (run && (!bestRun || (run.to - run.from) > (bestRun.to - bestRun.from))) bestRun = run;
  return { best, from: bestRun.from, to: bestRun.to, mid: Number(((bestRun.from + bestRun.to) / 2).toFixed(3)) };
}

function main() {
  if (process.argv.includes('--write')) {
    console.error('oracle/router/calibrate_k.js: --write is REFUSED. K was retired as a gate at sub-step');
    console.error('8.6 and survives only as a reported reference mark. Editing the mark is a data edit to');
    console.error('oracle/router/axis_threshold.json, made by whoever owns that number, not a re-run of a');
    console.error('calibration whose objective was agreement with a verdict this router no longer emits.');
    process.exit(2);
  }

  /* Bootstrapping: the classifier refuses input-missing without K, and this file is what produces
     K, so it loads the context with an explicit placeholder that it never uses for classification.
     It only needs ctx.axes and ctx.litDir. */
  const ctx = C.loadContext({ K: 0 });
  if (ctx.refuse) {
    console.error('cannot calibrate: ' + ctx.refuse.missing.join('; '));
    process.exit(1);
  }
  const rows = fixtures(ctx);
  const table = massTable(ctx, rows);
  const pts = sweep(table);
  const p = plateauMidpoint(pts);
  const at = scoreAt(table, p.mid);

  console.log('fixtures: ' + rows.length + ' (' + rows.filter(r => r.expect === 'fire').length +
    ' probe_pos, ' + rows.filter(r => r.expect === 'quiet').length + ' probe_neg) over ' + ctx.axes.size + ' axes');
  console.log('best score ' + p.best + '/' + rows.length + ' over the plateau K in [' +
    p.from.toFixed(3) + ', ' + p.to.toFixed(3) + ']; midpoint K = ' + p.mid);
  console.log('at K = ' + p.mid + ': ' + at.pass + '/' + at.total + ' pass, ' + at.fails.length + ' fail');
  for (const f of at.fails.slice(0, 12)) {
    console.log('  FAIL ' + f.axis_id + ' expect ' + f.expect.padEnd(5) + ' mass ' + String(f.mass).padStart(7) + '  ' + f.question);
  }
  if (at.fails.length > 12) console.log('  ... ' + (at.fails.length - 12) + ' more');

  if (process.argv.includes('--write')) {
    const artifact = {
      K: p.mid,
      status: 'PROVISIONAL',
      owner: 'sub-step 3.6',
      set_by: 'oracle/router/calibrate_k.js, run by The Software Engineer at sub-step 3.8',
      provenance: 'plateau midpoint of the widest best-scoring interval over the register\'s own ' +
        'probe_pos/probe_neg fixture set (oracle/register_schema.md section 4.2), ' + rows.length +
        ' labelled questions over ' + ctx.axes.size + ' axes',
      score: { pass: at.pass, total: at.total, plateau: [p.from, p.to] },
      idf: 'field-scoped, oracle/retrieval/literature_search.js idfFor(), scoped to the axis\'s own register field',
      rule: 'an axis fires when the IDF-weighted MASS of its match_keys present in the question tokens is >= K',
      caveat: 'This is a measurement, not a ruling. 3.6 owns K. The classifier reads this file and ' +
        'refuses input-missing when it is absent rather than defaulting, so replacing this value is ' +
        'an edit to one artifact and touches no code.',
      fails: at.fails,
    };
    fs.writeFileSync(OUT, JSON.stringify(artifact, null, 2) + '\n', 'utf8');
    console.log('wrote ' + path.relative(ROOT, OUT));
  }
}

if (require.main === module) main();
module.exports = { fixtures, massTable, scoreAt, sweep, plateauMidpoint };
