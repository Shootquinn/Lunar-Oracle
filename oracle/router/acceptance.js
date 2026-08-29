#!/usr/bin/env node
/* oracle/router/acceptance.js -- run the router over a question set and assert the contract.
 *
 *   node oracle/router/acceptance.js                 every question set present on disk
 *   node oracle/router/acceptance.js <path> [...]    the named sets only
 *   node oracle/router/acceptance.js --verdicts      print one line per question
 *
 * THE CLOSE CONDITION OF SUB-STEP 3.8, EXECUTABLE. For every question: exactly one verdict from the
 * closed six, zero sub-claims emitting two modes, zero emitting none. Both are asserted rather than
 * inspected, because "never two, never zero" is the contract and an unasserted contract is this
 * project's signature defect.
 *
 * WHICH QUESTION SETS. The brief names oracle/acceptance/lunar_questions.md, The Space Resources
 * Engineer's fourteen-question set, and that file had not landed when this ran. This harness takes
 * the path rather than embedding it, discovers whatever sets are present, and reports which ones it
 * found -- so when the fourteen land, the same harness runs them with no edit. It does not wait for
 * them, and it does not pretend to have run them.
 *
 * What is present today:
 *   oracle/acceptance/labelled_questions.tsv   37 questions, sub-step 3.6
 *   the register's own probe_pos/probe_neg     66 questions, sub-steps 1.9 and 1.10
 *   oracle/acceptance/lunar_questions.md       when it lands
 *
 * The register probes are worth as much as the acceptance set for THIS assertion, whatever they are
 * worth for tuning: they were authored by the two domain seats, before this router existed, against
 * axes rather than against verdicts. Nobody wrote them to make a classifier pass.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./classify.js');
const W = require('./wave.js');

const ROOT = path.resolve(__dirname, '..', '..');

/* --- question set readers ------------------------------------------------------------------------ */

function readTsvQuestions(p) {
  const out = [];
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  const head = (lines.find(l => l.startsWith('id\t')) || '').split('\t');
  const iId = head.indexOf('id'), iQ = head.indexOf('question');
  if (iQ < 0) return out;
  let seenHead = false;
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    if (!seenHead) { if (line.startsWith('id\t')) seenHead = true; continue; }
    const c = line.split('\t');
    if (c.length <= iQ) continue;
    out.push({ id: c[iId], question: c[iQ] });
  }
  return out;
}

/* A markdown question set. Two shapes are read, and the second one matters: The Space Resources
   Engineer's oracle/acceptance/lunar_questions.md is a TABLE whose rows carry an id, the question,
   and THE VERDICT THE ROUTER IS EXPECTED TO EMIT. Reading only the question out of that file and
   throwing the expected verdict away would turn a labelled fixture set into an unlabelled one --
   and the label is the whole value, because it was written by a seat that is not this router's
   author, against the app and the corpus rather than against this implementation.

   The expected verdict is the first backticked token in the row that names one of the closed six;
   an expected reason code is the first backticked token that names one of the closed six codes. */
function readMarkdownQuestions(p) {
  const out = [];
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  let n = 0;
  for (const raw of lines) {
    const line = raw.trim();

    /* Table row: pick the cell that is a question and the cells naming a verdict and a code. */
    if (line.startsWith('|')) {
      const cells = line.split('|').map(s => s.trim());
      const idCell = cells.find(c => /^\*?\*?[A-Z]{2,4}-\d+\b/.test(c));
      const qCell = cells.find(c => c.endsWith('?') && c.length > 12 && !/^\*\*/.test(c.slice(0, 2)) === false || (c.endsWith('?') && c.length > 12));
      if (!qCell) continue;
      const rest = cells.join(' | ');
      const verdict = (rest.match(/`(APP|FIGURE|LITERATURE|BOTH|CONTESTED|REFUSE)`/) || [])[1] || null;
      const code = (rest.match(/`(excluded|not-found|unbuildable|axis-incomplete|misclassified|input-missing)`/) || [])[1] || null;
      out.push({
        id: (idCell || (path.basename(p) + '#' + (n + 1))).replace(/\*/g, '').split(/\s/)[0],
        question: qCell.replace(/\*\*/g, '').replace(/`/g, '').replace(/\\\|/g, '|').trim(),
        expect_verdict: verdict, expect_code: code,
      });
      n++;
      continue;
    }

    /* List item ending in a question mark. */
    const m = /^(?:[-*+]|\d+[.)])\s+(.*\?)\s*$/.exec(line);
    if (!m) continue;
    const q = m[1].replace(/\*\*/g, '').replace(/^`|`$/g, '').trim();
    if (q.length < 8) continue;
    out.push({ id: path.basename(p) + '#' + (++n), question: q, expect_verdict: null, expect_code: null });
  }
  return out;
}

function registerProbes(ctx) {
  const out = [];
  for (const ax of ctx.axes.values()) {
    if (ax.probe_pos && ax.probe_pos !== '-') out.push({ id: ax.axis_id + '/pos', question: ax.probe_pos });
    if (ax.probe_neg && ax.probe_neg !== '-') out.push({ id: ax.axis_id + '/neg', question: ax.probe_neg });
  }
  return out;
}

function discover(ctx, argPaths) {
  const sets = [];
  const named = argPaths.filter(a => !a.startsWith('--'));
  const candidates = named.length ? named : [
    path.join('oracle', 'acceptance', 'lunar_questions.md'),
    path.join('oracle', 'acceptance', 'labelled_questions.tsv'),
  ];
  for (const c of candidates) {
    const p = path.isAbsolute(c) ? c : path.join(ROOT, c);
    if (!fs.existsSync(p)) { sets.push({ name: c, present: false, questions: [] }); continue; }
    const questions = p.endsWith('.tsv') ? readTsvQuestions(p) : readMarkdownQuestions(p);
    sets.push({ name: c, present: true, questions });
  }
  if (!named.length) sets.push({ name: 'register probe_pos/probe_neg', present: true, questions: registerProbes(ctx) });
  return sets;
}

/* --- the run ------------------------------------------------------------------------------------- */

function run(ctx, sets, opts) {
  opts = opts || {};
  const rows = [];
  const failures = [];
  for (const set of sets) {
    for (const q of set.questions) {
      let r, w, err = null;
      try {
        r = C.classifyQuestion(ctx, q.question);
        w = W.selectWave(r, ctx);
      } catch (e) {
        err = e.message;
        failures.push({ set: set.name, id: q.id, question: q.question, error: e.message });
      }
      if (err) continue;

      /* The close condition, asserted here as well as inside classifyQuestion, because an
         assertion that lives only inside the thing it checks is the thing checking itself. */
      if (!C.VERDICTS.includes(r.verdict)) failures.push({ set: set.name, id: q.id, question: q.question, error: 'question verdict "' + r.verdict + '" outside the closed six' });
      for (const s of r.subClaims) {
        if (s.mode == null) failures.push({ set: set.name, id: q.id, question: q.question, error: 'sub-claim emitted ZERO modes: ' + s.text });
        if (s.verdict == null) failures.push({ set: set.name, id: q.id, question: q.question, error: 'sub-claim emitted ZERO verdicts: ' + s.text });
        if (s.verdict === 'REFUSE' && !C.REASON_CODES.includes(s.reason_code)) failures.push({ set: set.name, id: q.id, question: q.question, error: 'REFUSE sub-claim carries code ' + s.reason_code });
        if (s.verdict !== 'REFUSE' && s.reason_code != null) failures.push({ set: set.name, id: q.id, question: q.question, error: 'non-REFUSE sub-claim carries a code' });
      }
      /* The labelled comparison, where a set carries labels. A disagreement is NOT thrown: this
         harness's own close condition is one-verdict-never-two-never-zero, and the expected column
         was authored against the app and the corpus rather than against this implementation. A
         disagreement is a finding with two named parties, reported here and routed, which is a
         different thing from a test failure and a different thing from being ignored. */
      let agree = null;
      if (q.expect_verdict) {
        agree = (r.verdict === q.expect_verdict);
        if (agree && q.expect_verdict === 'REFUSE' && q.expect_code) agree = (r.reason_code === q.expect_code);
      }

      rows.push({ set: set.name, id: q.id, question: q.question, verdict: r.verdict,
                  reason_code: r.reason_code, subClaims: r.subClaims.length,
                  modes: r.subClaims.map(s => s.mode), personas: w.personaCount,
                  expect_verdict: q.expect_verdict || null,
                  expect_code: (q.expect_verdict === 'REFUSE' ? q.expect_code : null) || null,
                  agree });
    }
  }
  return { rows, failures };
}

function tally(rows, key) {
  const t = {};
  for (const r of rows) { const k = r[key] || '-'; t[k] = (t[k] || 0) + 1; }
  return t;
}

function main() {
  const args = process.argv.slice(2);
  const ctx = C.loadContext({});
  if (ctx.refuse) {
    console.error('REFUSE input-missing before classification: ' + ctx.refuse.missing.join('; '));
    console.error('Zero personas spent. Answer contract section 3: a missing input fires where every other missing input fires.');
    process.exit(1);
  }
  const sets = discover(ctx, args);
  for (const s of sets) {
    console.log((s.present ? 'set   ' : 'ABSENT') + '  ' + s.name.padEnd(46) + s.questions.length + ' question(s)');
  }
  const { rows, failures } = run(ctx, sets);

  console.log('');
  console.log('questions classified: ' + rows.length + '   sub-claims: ' + rows.reduce((a, r) => a + r.subClaims, 0));
  console.log('verdicts:   ' + JSON.stringify(tally(rows, 'verdict')));
  console.log('codes:      ' + JSON.stringify(tally(rows, 'reason_code')));
  console.log('modes:      ' + JSON.stringify(rows.flatMap(r => r.modes).reduce((a, m) => (a[m] = (a[m] || 0) + 1, a), {})));
  console.log('personas:   total ' + rows.reduce((a, r) => a + r.personas, 0) +
    ', max ' + Math.max(0, ...rows.map(r => r.personas)));
  console.log('K = ' + ctx.K + ' (' + (ctx.K_status || 'no status') + ')');

  const labelled = rows.filter(r => r.expect_verdict);
  if (labelled.length) {
    const agreed = labelled.filter(r => r.agree);
    console.log('');
    console.log('labelled rows: ' + labelled.length + '   agree ' + agreed.length + '   disagree ' + (labelled.length - agreed.length));
    for (const r of labelled.filter(x => !x.agree)) {
      console.log('  DISAGREE ' + r.id.padEnd(9) + 'expected ' + (r.expect_verdict + (r.expect_code ? '/' + r.expect_code : '')).padEnd(22) +
        'router ' + (r.verdict + (r.reason_code ? '/' + r.reason_code : '')).padEnd(22) + r.question.slice(0, 70));
    }
  }

  if (args.includes('--verdicts')) {
    console.log('');
    for (const r of rows) console.log('  ' + r.verdict.padEnd(11) + (r.reason_code || '-').padEnd(15) +
      'p=' + r.personas + '  ' + String(r.id).padEnd(14) + r.question);
  }

  console.log('');
  if (failures.length) {
    for (const f of failures) console.error('FAIL  ' + f.id + '  ' + f.error);
    console.error('CLOSE CONDITION NOT MET: ' + failures.length + ' violation(s).');
    process.exit(1);
  }
  console.log('CLOSE CONDITION MET: every question emitted exactly one verdict from the closed six; ' +
    'zero sub-claims emitted two modes; zero emitted none.');
  process.exit(0);
}

if (require.main === module) main();
module.exports = { run, discover, readTsvQuestions, readMarkdownQuestions, registerProbes };
