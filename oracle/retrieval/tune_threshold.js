/* tune_threshold.js -- sets the confirmation threshold by sweeping it against the labelled question
 * set, rather than by hand. Sub-step 3.7(b).
 *
 * `frac >= 0.45` was tuned against a single-field 156-file lunar corpus. It has no standing at the
 * merged 169 across two fields, and part 7 measured what it costs there: a question naming both
 * sides of a contested pair ranked both members at the top and gated BOTH of them out, turning the
 * corpus mute on precisely its best questions.
 *
 * HOW THIS AVOIDS BEING CIRCULAR, which is the only interesting question about it. The fixture set
 * and this tuner have the same author, and a threshold that scores well on a fixture set its own
 * author also wrote proves nothing. Three things are done about that, and none of them is a claim:
 *
 *   1. SPLIT. Only rows marked `tune` are swept. The `holdout` rows are scored exactly once, after
 *      the threshold is fixed, and the holdout score is reported whatever it says.
 *   2. TWO-SIDED FIXTURES. The set carries `none` rows -- questions the corpus provably cannot
 *      answer -- and an `absent` row. A sweep with only positive fixtures has its optimum at
 *      threshold 0, where everything confirms and the instrument is worthless. The negatives are
 *      what give the objective an interior maximum.
 *   3. PLATEAU, NOT PEAK. The reported threshold is the midpoint of the widest interval that scores
 *      the tune-split maximum, not the first value that hits it. A threshold sitting on a knife edge
 *      between two fixtures is overfitted by construction; the midpoint of a wide plateau is the
 *      value that would survive one more fixture being added.
 *
 * Run: node oracle/retrieval/tune_threshold.js [--gate-anchor] [--pooled]
 *   --gate-anchor  score with the identity-anchor field gate ON, to measure whether it helps
 *   --pooled       score with a POOLED idf table, to measure what field scoping is worth
 */
'use strict';
const fs = require('fs');
const path = require('path');
const S = require('./literature_search.js');

const ROOT = path.join(__dirname, '..', '..');
const LIT = path.join(ROOT, 'literature');
const FIXTURES = path.join(ROOT, 'oracle', 'acceptance', 'labelled_questions.tsv');

function loadFixtures() {
  const lines = fs.readFileSync(FIXTURES, 'utf8').split('\n')
    .filter(l => l.length > 0 && l[0] !== '#');
  const head = lines[0].split('\t');
  return lines.slice(1).filter(l => l.trim().length > 0).map(l => {
    const cells = l.split('\t');
    const r = {};
    head.forEach((h, i) => { r[h] = (cells[i] === undefined ? '' : cells[i]).trim(); });
    r.targets = r.target ? r.target.split(';').map(s => s.trim()).filter(Boolean) : [];
    return r;
  });
}

/* Score one fixture against one search result. Returns {pass, detail}. */
function judge(fix, res) {
  const names = res.confirmedSet.map(c => c.filename);
  switch (fix.expect) {
    case 'top':
      return { pass: !!res.best && res.best.filename === fix.targets[0],
               detail: 'best=' + (res.best ? res.best.filename : 'NULL') };
    case 'confirmed':
      return { pass: names.indexOf(fix.targets[0]) !== -1,
               detail: 'confirmed=[' + names.join(', ') + ']' };
    case 'both': {
      const missing = fix.targets.filter(t => names.indexOf(t) === -1);
      return { pass: missing.length === 0,
               detail: missing.length ? 'missing ' + missing.join(', ') : 'both present' };
    }
    case 'none':
      return { pass: names.length === 0,
               detail: names.length ? 'wrongly confirmed ' + names.join(', ') : 'empty, correct' };
    case 'absent':
      return { pass: names.indexOf(fix.targets[0]) === -1,
               detail: names.indexOf(fix.targets[0]) === -1 ? 'absent, correct'
                                                            : 'wrongly confirmed ' + fix.targets[0] };
    default:
      throw new Error('unknown expect "' + fix.expect + '" on ' + fix.id);
  }
}

/* THE OBJECTIVE IS BALANCED, AND THAT IS THE WHOLE DEFENCE AGAINST A DEGENERATE OPTIMUM.
 *
 * The fixture set carries 32 rows that want something FOUND and 4 that want something NOT found.
 * Maximising a raw pass count over that set has its optimum at threshold 0, where every question
 * confirms every file it touches and the instrument is worthless -- and the first run of this tuner
 * did exactly that, reporting 0.05 at the bottom edge of the swept range with a plateau one value
 * wide. A raw count does not measure an instrument; it measures how many positives are in the
 * fixture set.
 *
 * So the objective is the unweighted mean of the recall side and the precision side: the fraction of
 * find-something rows that pass, plus the fraction of find-nothing rows that pass, halved. Driving
 * the threshold to zero now costs the whole second term. The two sides trade against each other and
 * the optimum is interior, which is the only kind of optimum worth reporting.
 */
function objective(rows) {
  const pos = rows.filter(r => r.fix.expect !== 'none' && r.fix.expect !== 'absent');
  const neg = rows.filter(r => r.fix.expect === 'none' || r.fix.expect === 'absent');
  const pr = pos.length ? pos.filter(r => r.pass).length / pos.length : 1;
  const nr = neg.length ? neg.filter(r => r.pass).length / neg.length : 1;
  return { score: (pr + nr) / 2, posRate: pr, negRate: nr, pos: pos.length, neg: neg.length };
}

function scoreAt(fixtures, thr, opts) {
  const rows = fixtures.map(f => {
    const res = S.searchLiterature(LIT, f.question,
      Object.assign({ limit: 10, threshold: thr }, opts));
    const j = judge(f, res);
    return { fix: f, res, pass: j.pass, detail: j.detail };
  });
  const o = objective(rows);
  return { pass: rows.filter(r => r.pass).length, total: rows.length, rows,
           obj: o.score, posRate: o.posRate, negRate: o.negRate, nPos: o.pos, nNeg: o.neg };
}

function sweep(fixtures, opts, lo, hi, step) {
  const out = [];
  for (let t = lo; t <= hi + 1e-9; t += step) {
    const thr = Math.round(t * 1000) / 1000;
    out.push(Object.assign({ threshold: thr }, scoreAt(fixtures, thr, opts)));
  }
  return out;
}

/* The widest run of consecutive swept thresholds that all score the maximum objective; return its
   midpoint. The MIDPOINT of the WIDEST plateau, not the first value to reach the maximum: a
   threshold sitting on a knife edge between two fixtures is overfitted by construction, and the
   midpoint of a wide plateau is the value most likely to survive one more fixture being added. */
function plateauMidpoint(curve) {
  const best = Math.max.apply(null, curve.map(c => c.obj));
  const EPS = 1e-9;
  let bestRun = null, run = null;
  for (const c of curve) {
    if (c.obj >= best - EPS) {
      if (!run) run = { lo: c.threshold, hi: c.threshold, n: 0 };
      run.hi = c.threshold; run.n += 1;
    } else if (run) {
      if (!bestRun || run.n > bestRun.n) bestRun = run;
      run = null;
    }
  }
  if (run && (!bestRun || run.n > bestRun.n)) bestRun = run;
  return { best, lo: bestRun.lo, hi: bestRun.hi, width: bestRun.n,
           mid: Math.round(((bestRun.lo + bestRun.hi) / 2) * 100) / 100 };
}

function main() {
  const gateAnchor = process.argv.indexOf('--gate-anchor') !== -1;
  const pooled = process.argv.indexOf('--pooled') !== -1;
  const opts = { gateAnchor, pooled };
  const fixtures = loadFixtures();
  const tune = fixtures.filter(f => f.split === 'tune');
  const hold = fixtures.filter(f => f.split === 'holdout');

  console.log('fixture set: ' + fixtures.length + ' rows (' + tune.length + ' tune, ' +
    hold.length + ' holdout)');
  const byKind = {};
  for (const f of fixtures) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
  console.log('  by kind: ' + Object.keys(byKind).sort().map(k => k + ' ' + byKind[k]).join(', '));
  console.log('  identity-anchor gate: ' + (gateAnchor ? 'ON' : 'off') +
    ';  IDF table: ' + (pooled ? 'POOLED (counterfactual arm, B3 intact)' : 'FIELD-SCOPED'));
  console.log('');

  const curve = sweep(tune, opts, 0.05, 0.80, 0.01);
  console.log('TUNE-SPLIT SWEEP (' + tune.length + ' rows)');
  console.log('  thr    obj    find/' + curve[0].nPos + '  none/' + curve[0].nNeg + '   pass');
  let last = null;
  for (const c of curve) {
    const key = c.pass + ':' + c.obj.toFixed(4);
    if (last === null || key !== last) {
      console.log('  ' + c.threshold.toFixed(2) + '  ' + c.obj.toFixed(3) +
        '   ' + c.posRate.toFixed(2) + '     ' + c.negRate.toFixed(2) +
        '     ' + c.pass + '/' + c.total);
      last = key;
    }
  }

  const p = plateauMidpoint(curve);
  console.log('');
  console.log('  maximum objective ' + p.best.toFixed(3) + ' over [' + p.lo.toFixed(2) + ', ' +
    p.hi.toFixed(2) + '], ' + p.width + ' swept values wide');
  console.log('  CHOSEN THRESHOLD = ' + p.mid.toFixed(2) + '  (plateau midpoint)');

  const old = scoreAt(tune, 0.45, opts);
  console.log('');
  const chosen = scoreAt(tune, p.mid, opts);
  console.log('  the incumbent 0.45 on this same tune split: ' + old.pass + '/' + old.total +
    '  (obj ' + old.obj.toFixed(3) + ', find ' + old.posRate.toFixed(2) +
    ', none ' + old.negRate.toFixed(2) + ')');
  console.log('  the chosen ' + p.mid.toFixed(2) + ' on the same: ' + chosen.pass + '/' + chosen.total +
    '  (obj ' + chosen.obj.toFixed(3) + ', find ' + chosen.posRate.toFixed(2) +
    ', none ' + chosen.negRate.toFixed(2) + ')');

  console.log('');
  console.log('HOLDOUT, scored once, at the threshold the tune split chose (' + p.mid.toFixed(2) + ')');
  const h = scoreAt(hold, p.mid, opts);
  const hOld = scoreAt(hold, 0.45, opts);
  for (const r of h.rows) {
    console.log('  ' + (r.pass ? 'PASS' : 'FAIL') + '  ' + r.fix.id + ' [' + r.fix.kind + '] ' +
      r.fix.expect + '  ' + r.detail);
  }
  console.log('  holdout: ' + h.pass + '/' + h.total + ' (obj ' + h.obj.toFixed(3) + ') at ' +
    p.mid.toFixed(2) + ';  ' + hOld.pass + '/' + hOld.total + ' (obj ' + hOld.obj.toFixed(3) +
    ') at the incumbent 0.45');

  console.log('');
  console.log('FULL SET at ' + p.mid.toFixed(2) + ' against 0.45');
  const allNew = scoreAt(fixtures, p.mid, opts);
  const allOld = scoreAt(fixtures, 0.45, opts);
  console.log('  ' + p.mid.toFixed(2) + ': ' + allNew.pass + '/' + allNew.total +
    ' (obj ' + allNew.obj.toFixed(3) + ')    0.45: ' + allOld.pass + '/' + allOld.total +
    ' (obj ' + allOld.obj.toFixed(3) + ')');
  console.log('');
  console.log('  per-row, at ' + p.mid.toFixed(2) + ':');
  for (const r of allNew.rows) {
    const o = allOld.rows.find(x => x.fix.id === r.fix.id);
    console.log('   ' + (r.pass ? 'PASS' : 'FAIL') + ' ' + (o.pass ? '(0.45 PASS)' : '(0.45 FAIL)') +
      '  ' + r.fix.id.padEnd(5) + r.fix.split.padEnd(9) + r.fix.expect.padEnd(10) + r.detail);
  }
  return { chosen: p.mid, tune: chosen.pass, tuneTotal: tune.length, hold: h.pass, holdTotal: h.total,
           all: allNew.pass, allOld: allOld.pass, total: fixtures.length, oldTune: old.pass };
}

if (require.main === module) main();
module.exports = { loadFixtures, judge, scoreAt, sweep, plateauMidpoint, LIT, FIXTURES };
