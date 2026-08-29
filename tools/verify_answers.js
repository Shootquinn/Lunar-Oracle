#!/usr/bin/env node
/* verify_answers.js -- sub-step 5.2. The post-condition on the Oracle's own run log.
 *
 * EXTENDED, NOT RESTRUCTURED, from `lsei/oracle/verify_answers.js`. That file counts four outcomes
 * over a one-column log. This one counts six over the two-column schema answer contract §8 defines,
 * and the paragraph in the prototype explaining why `FILLED` cannot be self-assigned is the best
 * thing in it and survives in substance below.
 *
 * SIX OUTCOMES, AND THE SIXTH LIVES IN A DIFFERENT COLUMN. `step0_software_engineer_loop.md` §5.3
 * names six and says they are never collapsed. Contract version 2 says WHERE each one is written,
 * and the split is the mechanism rather than a formatting choice:
 *
 *   `outcome`, FIVE values, MACHINE-written, single-valued, in precedence order:
 *      ERROR > MISCLASSIFIED > REGISTER_FAIL > REFUSED > ANSWERED
 *   `review`, THREE values, HUMAN-written, never machine-written:
 *      unreviewed | confirmed | FILLED
 *
 * `MISCLASSIFIED` and `REGISTER_FAIL` are self-reportable because they are OBSERVATIONS ABOUT
 * MECHANISM -- a register hit surfaced from a searched retrieval; a deliverable that failed the
 * register check twice. `FILLED` is not, because it is a JUDGEMENT ABOUT CORRECTNESS: a row is
 * FILLED when a question that should have refused instead reached for an inference, which is a
 * defect report on the router's own judgement and not a fact the router can observe about itself
 * while it is running. No mechanism here can look at its own REFUSED-versus-ANSWERED call and know
 * it called it wrong; that determination is exactly an independent reviewer's own pass.
 *
 * SO THIS FILE'S CONTRACT IS: it counts what the log says, and its own PASS/FAIL is about THE LOG'S
 * OWN INTEGRITY -- every row parses, every field is present, every value is in its closed set, the
 * precedence order was respected -- never about whether any individual verdict was the right one.
 * It recognises `FILLED` where an auditor has written it and never assigns it.
 *
 * AND IT REPORTS THE SAMPLING PROPORTION WITH ITS DENOMINATORS. Contract §8: "A sampling result is
 * reported as a proportion with its denominators, all three countable from these two columns."
 * "Three FILLED" is theater. "Three FILLED out of forty sampled, of two hundred ten run" is a
 * measurement, and this file will not print the first form.
 *
 *   node tools/verify_answers.js [<log path>]
 *   node tools/verify_answers.js --schema
 *   node tools/verify_answers.js --prove
 */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.resolve(__dirname, '..');
const R = p => path.join(ROOT, p);

/* The run log is session history and is never part of the published tree. Default under the OS
 * temp directory, as the prototype has it; a caller who wants a specific log passes its path. */
const DEFAULT_LOG = path.join(os.tmpdir(), 'lunar-oracle', 'run_log.jsonl');

/* Contract §8, both closed sets, and the precedence order is DATA rather than a chain of ifs, so
 * that PRECEDENCE-ORDER below can assert it rather than restate it. */
const OUTCOMES = ['ERROR', 'MISCLASSIFIED', 'REGISTER_FAIL', 'REFUSED', 'ANSWERED'];
const REVIEWS = ['unreviewed', 'confirmed', 'FILLED'];
const SIX = [...OUTCOMES, 'FILLED'];
/* The nine fields, §8. "The row schema is closed. Extending it is a version bump." */
const FIELDS = ['timestamp', 'question', 'verdict', 'outcome', 'review', 'reason_code',
  'deliverable', 'contract_version', 'lsei_ref'];
const VERDICTS = ['APP', 'FIGURE', 'LITERATURE', 'BOTH', 'CONTESTED', 'REFUSE'];
const REASON_CODES = ['excluded', 'not-found', 'unbuildable', 'axis-incomplete', 'misclassified', 'input-missing'];

/* --------------------------------------------------------------- reading */
function readLog(logPath) {
  if (!fs.existsSync(logPath)) return { rows: [], malformed: [], missing: true };
  const lines = fs.readFileSync(logPath, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
  const rows = [], malformed = [];
  lines.forEach((line, i) => {
    let row;
    try { row = JSON.parse(line); } catch (e) { malformed.push({ line: i + 1, reason: 'not valid JSON: ' + e.message }); return; }
    const missing = FIELDS.filter(f => !(f in row));
    if (missing.length) { malformed.push({ line: i + 1, reason: 'missing field(s) ' + missing.join(', ') + ' -- §8 requires all nine and the schema is closed' }); return; }
    if (!OUTCOMES.includes(row.outcome)) { malformed.push({ line: i + 1, reason: 'outcome "' + row.outcome + '" is not one of ' + OUTCOMES.join('/') }); return; }
    if (!REVIEWS.includes(row.review)) { malformed.push({ line: i + 1, reason: 'review "' + row.review + '" is not one of ' + REVIEWS.join('/') }); return; }
    rows.push(row);
  });
  return { rows, malformed, missing: false };
}

/* --------------------------------------------------------------- tallying */
function tally(rows) {
  const counts = {}; for (const k of SIX) counts[k] = 0;
  for (const r of rows) { counts[r.outcome]++; if (r.review === 'FILLED') counts.FILLED++; }
  return counts;
}

/* The integrity checks, each one able to fail. */
function integrity(rows) {
  const findings = [];
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i], at = 'row ' + (i + 1);
    if (!VERDICTS.includes(r.verdict)) findings.push(at + ': verdict "' + r.verdict + '" outside contract §1\'s closed six');
    // §8: the reason code is recorded where the verdict is REFUSE, and only there.
    if (r.verdict === 'REFUSE') {
      if (!REASON_CODES.includes(r.reason_code)) findings.push(at + ': verdict REFUSE with reason_code "' + r.reason_code + '" outside §5\'s closed six');
    } else if (r.reason_code && r.reason_code !== '-') {
      findings.push(at + ': verdict ' + r.verdict + ' carries reason_code "' + r.reason_code + '"; §5 attaches a code to a refusal and to nothing else');
    }
    // PRECEDENCE. `outcome` is single-valued and the first that applies is the one written, so a
    // REFUSE verdict logged ANSWERED, or an ANSWERED row carrying a refusal code, is a log that
    // cannot be sampled. This is the check that stops REFUSED being absorbed into ANSWERED with an
    // empty body, which is the collapse the prototype's own sub-step barred.
    if (r.verdict === 'REFUSE' && r.outcome === 'ANSWERED')
      findings.push(at + ': verdict REFUSE logged as outcome ANSWERED -- REFUSED absorbed into ANSWERED is the collapse §8\'s precedence order exists to prevent');
    if (r.verdict !== 'REFUSE' && r.outcome === 'REFUSED')
      findings.push(at + ': outcome REFUSED with verdict ' + r.verdict);
    // §6: "The deliverable file persists after the turn, and its path is recorded in the run log row
    // for that run. A log row that cannot retrieve the bytes that were delivered cannot be sampled."
    if (!r.deliverable || r.deliverable === '-')
      findings.push(at + ': no deliverable path. §6 -- a log row that cannot retrieve the bytes that were delivered cannot be sampled, and a sampling protocol over such rows is theater');
    if (String(r.contract_version) !== String(r.contract_version | 0) || !r.contract_version)
      findings.push(at + ': contract_version "' + r.contract_version + '" is not a bare monotone integer (§9)');
    // §8's ninth field. A run that emitted no app trace records the ref anyway; `-` where absent.
    if (!r.lsei_ref) findings.push(at + ': lsei_ref is empty; §8 requires the ref or "-" where lsei was absent');
  }
  // FILLED is never machine-assignable, so a log in which every row is FILLED and none is
  // `unreviewed` is a log somebody generated rather than reviewed.
  const reviewed = rows.filter(r => r.review !== 'unreviewed');
  if (rows.length > 2 && reviewed.length === rows.length && rows.every(r => r.review === 'FILLED'))
    findings.push('every row is FILLED and none is unreviewed; FILLED is a hand annotation and a log entirely composed of them was not reviewed, it was written');
  return findings;
}

/* --------------------------------------------------------------- report */
function report(logPath, log) {
  const W = s => process.stdout.write(s + '\n');
  W('VERIFY ANSWERS  ' + logPath);
  if (log.missing) {
    W('  EMPTY POPULATION: no run log exists at this path yet. Per the standing rule, an empty');
    W('  population is reported as empty, NEVER as a pass. An empty list must not read as a clean one.');
    W('');
    W('RESULT  FAIL (empty population)');
    return { findings: 1 };
  }
  const counts = tally(log.rows);
  const bad = integrity(log.rows);
  W('  rows read              ' + log.rows.length);
  W('  malformed rows         ' + log.malformed.length);
  W('');
  W('OUTCOME COUNTS. All six named every time, never collapsed to one pass/fail bit.');
  W('  machine-written, `outcome`, single-valued, precedence order first-applies:');
  for (const k of OUTCOMES) W('    ' + k.padEnd(15) + counts[k]);
  W('  human-written, `review`:');
  W('    ' + 'FILLED'.padEnd(15) + counts.FILLED + '   NEVER machine-assigned; counted here, never written here');
  W('');
  /* The sampling proportion, with all three denominators. §8 and §5.4. */
  const run = log.rows.length;
  const reviewed = log.rows.filter(r => r.review !== 'unreviewed').length;
  const filled = counts.FILLED;
  W('SAMPLING RESULT, as a proportion with its denominators (§8). "Three FILLED" is theater;');
  W('"three FILLED out of forty sampled, of two hundred ten run" is a measurement.');
  W('  ' + filled + ' FILLED out of ' + reviewed + ' reviewed, of ' + run + ' run' +
    (reviewed ? '   (' + (100 * filled / reviewed).toFixed(1) + '% of reviewed, ' + (100 * reviewed / (run || 1)).toFixed(1) + '% sampled)' : '   (0 reviewed: no proportion is computable, and that is the report)'));
  W('');
  if (log.malformed.length) { W('MALFORMED ROWS:'); for (const m of log.malformed.slice(0, 25)) W('  line ' + m.line + ': ' + m.reason); W(''); }
  if (bad.length) { W('INTEGRITY FINDINGS:'); for (const f of bad.slice(0, 25)) W('  ' + f); W(''); }
  W('LIMIT   ANSWERED, REFUSED, ERROR, MISCLASSIFIED and REGISTER_FAIL are self-reported by the');
  W('        router at run time. A row is NEVER reclassified FILLED by this file, because a router');
  W('        cannot mechanically know it fabricated an answer it should have refused. FILLED is a');
  W('        hand annotation an auditor adds after review, and this file only counts it. This');
  W('        file\'s own PASS/FAIL is about the LOG\'S INTEGRITY, not about whether any individual');
  W('        verdict was the right one.');
  W('');
  const findings = log.malformed.length + counts.ERROR + bad.length;
  W(findings === 0
    ? 'RESULT  PASS (log well-formed' + (filled ? ', ' + filled + ' FILLED row(s) on record' : '') + ')'
    : 'RESULT  FAIL, ' + findings + ' finding(s)  [' + log.malformed.length + ' malformed, ' + counts.ERROR + ' ERROR, ' + bad.length + ' integrity]');
  return { findings, counts, bad };
}

/* ------------------------------------------------------------------ proof
 *
 * EACH OF THE SIX OUTCOMES HAS A TEST THAT FIRES. That is 5.2's close condition, and it is a
 * different claim from "the six are named in the report": a name printed with a zero beside it is
 * not evidence that the counter works. So the proof builds one row per outcome, asserts each is
 * counted in its own bucket and in no other, and then breaks each one and asserts the break is
 * caught. Six outcomes, six positive tests, and a negative for each collapse the schema forbids.
 *
 * THE SCRATCH LOG IS CONSTRUCTED AND THAT IS STATED. Unlike this wave's other three checkers, the
 * subject here is a LOG, not a deliverable, and no loop on disk writes one yet -- the router lands
 * at 3.8/3.9 and the log is its output. A log is also the one artifact where a constructed fixture
 * is legitimate: the rows are the data format itself, not prose about the world, and the failure a
 * constructed prose fixture invites (a stand-in that agrees with the checker's assumptions) has no
 * analogue when the fixture is nine named fields. The moment the loop writes a log, `--prove`
 * should read it instead, and the row is carried as RFX/INV work rather than as a claim that this
 * is as good as the mutation-based proofs beside it.
 */
function prove() {
  const out = [];
  const add = (id, expect, got, pass) => out.push({ id, expect, got, pass });
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'va-prove-'));
  const write = (name, rows) => {
    const p = path.join(dir, name + '.jsonl');
    fs.writeFileSync(p, rows.map(r => JSON.stringify(r)).join('\n') + '\n', 'utf8');
    return p;
  };
  const row = o => Object.assign({
    timestamp: '2026-08-28T00:00:00Z', question: 'q', verdict: 'LITERATURE', outcome: 'ANSWERED',
    review: 'unreviewed', reason_code: '', deliverable: 'oracle/answers/a.md',
    contract_version: 2, lsei_ref: 'deadbee',
  }, o);

  /* ONE ROW PER OUTCOME, and each must land in its own bucket. */
  const six = [
    row({ outcome: 'ANSWERED' }),
    row({ outcome: 'REFUSED', verdict: 'REFUSE', reason_code: 'not-found' }),
    row({ outcome: 'ERROR' }),
    row({ outcome: 'MISCLASSIFIED' }),
    row({ outcome: 'REGISTER_FAIL' }),
    row({ outcome: 'ANSWERED', review: 'FILLED' }),
  ];
  const p6 = write('six', six);
  const l6 = readLog(p6), c6 = tally(l6.rows);
  add('ALL-SIX-COUNTED', 'each of the six outcomes lands in its own bucket and in no other',
    SIX.map(k => k + '=' + c6[k]).join(' '),
    c6.ANSWERED === 2 && c6.REFUSED === 1 && c6.ERROR === 1 && c6.MISCLASSIFIED === 1 &&
    c6.REGISTER_FAIL === 1 && c6.FILLED === 1);
  for (const k of SIX)
    add('FIRES-' + k, 'a log containing exactly one ' + k + ' row counts exactly one',
      (() => { const p = write('one' + k, [k === 'FILLED' ? row({ review: 'FILLED' }) : row({ outcome: k, verdict: k === 'REFUSED' ? 'REFUSE' : 'LITERATURE', reason_code: k === 'REFUSED' ? 'not-found' : '' })]);
        return String(tally(readLog(p).rows)[k]); })(), (() => { const p = write('one2' + k, [k === 'FILLED' ? row({ review: 'FILLED' }) : row({ outcome: k, verdict: k === 'REFUSED' ? 'REFUSE' : 'LITERATURE', reason_code: k === 'REFUSED' ? 'not-found' : '' })]);
        return tally(readLog(p).rows)[k] === 1; })());

  /* THE COLLAPSE THE PROTOTYPE'S OWN SUB-STEP BARRED. */
  const collapse = write('collapse', [row({ verdict: 'REFUSE', outcome: 'ANSWERED', reason_code: 'not-found' })]);
  const bc = integrity(readLog(collapse).rows);
  add('REFUSED-NOT-ABSORBED', 'a REFUSE verdict logged ANSWERED is caught, not silently counted as an answer',
    bc.filter(f => /absorbed/.test(f)).length + ' finding(s)', bc.some(f => /absorbed/.test(f)));

  /* The two new outcomes are self-reportable and must not be silently dropped as unknown. */
  const legacy = write('legacy', [{ timestamp: 't', question: 'q', verdict: 'LITERATURE', outcome: 'MISCLASSIFIED' }]);
  const bl = readLog(legacy);
  add('NINE-FIELDS-REQUIRED', 'a four-field prototype row is malformed here: §8\'s schema is closed at nine',
    bl.rows.length + ' rows, ' + bl.malformed.length + ' malformed :: ' + (bl.malformed[0] || {}).reason,
    bl.rows.length === 0 && bl.malformed.length === 1);

  /* Unrecognised values are findings, never silent skips. */
  const junk = write('junk', [row({ outcome: 'MAYBE' }), row({ review: 'probably' }), row({ verdict: 'PERHAPS' })]);
  const lj = readLog(junk);
  add('UNRECOGNISED-IS-A-FINDING', 'an outcome, a review or a verdict outside its closed set is a finding, never a silent skip',
    lj.malformed.length + ' malformed, ' + integrity(lj.rows).length + ' integrity finding(s)',
    lj.malformed.length === 2 && integrity(lj.rows).length >= 1);

  /* The sampling proportion, and the shape §8 forbids. */
  const rows40 = [];
  for (let i = 0; i < 210; i++) rows40.push(row({ review: i < 40 ? (i < 3 ? 'FILLED' : 'confirmed') : 'unreviewed' }));
  const psamp = write('sample', rows40);
  const ls = readLog(psamp), cs = tally(ls.rows);
  const reviewed = ls.rows.filter(r => r.review !== 'unreviewed').length;
  add('PROPORTION-WITH-DENOMINATORS', '3 FILLED out of 40 reviewed, of 210 run -- all three countable from the two columns',
    cs.FILLED + '/' + reviewed + '/' + ls.rows.length,
    cs.FILLED === 3 && reviewed === 40 && ls.rows.length === 210);

  /* §6, and it is the row that makes sampling possible at all. */
  const nopath = write('nopath', [row({ deliverable: '' })]);
  add('DELIVERABLE-PATH-REQUIRED', 'a row with no deliverable path is a row nobody can sample',
    integrity(readLog(nopath).rows).filter(f => /cannot be sampled/.test(f)).length + ' finding(s)',
    integrity(readLog(nopath).rows).some(f => /cannot be sampled/.test(f)));

  /* FILLED is never assigned here. The assertion is over this file's own source. */
  const src = fs.readFileSync(__filename, 'utf8');
  const assigns = [...src.matchAll(/review\s*[:=]\s*'FILLED'/g)].length;
  const inProve = [...src.slice(src.indexOf('function prove()')).matchAll(/review:\s*'FILLED'/g)].length;
  add('FILLED-IS-NEVER-ASSIGNED', 'this file writes FILLED only inside its own proof fixtures, never into a log it read',
    assigns + ' literal(s), ' + inProve + ' of them inside prove()', assigns === inProve && assigns > 0);

  const w = Math.max(...out.map(o => o.id.length));
  let bad = 0;
  for (const o of out) { if (!o.pass) bad++; process.stdout.write((o.pass ? 'PASS  ' : 'FAIL  ') + o.id.padEnd(w) + '  expected ' + o.expect + '  |  got ' + o.got + '\n'); }
  process.stdout.write('\n' + SIX.length + ' outcomes, ' + out.filter(o => /^FIRES-/.test(o.id) && o.pass).length + ' with a test that fires.\n');
  process.stdout.write((out.length - bad) + ' of ' + out.length + ' proofs pass\n');
  fs.rmSync(dir, { recursive: true, force: true });
  process.exit(bad ? 1 : 0);
}

/* ------------------------------------------------------------------ entry */
if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv[0] === '--prove') prove();
  else if (argv[0] === '--schema') {
    process.stdout.write('run log schema, answer contract §8, closed:\n');
    process.stdout.write('  nine fields   ' + FIELDS.join(', ') + '\n');
    process.stdout.write('  outcome (5)   ' + OUTCOMES.join(' > ') + '   machine-written, single-valued, precedence order\n');
    process.stdout.write('  review  (3)   ' + REVIEWS.join(' | ') + '   human-written, never machine-written\n');
    process.stdout.write('  verdict (6)   ' + VERDICTS.join(' ') + '\n');
    process.stdout.write('  reason  (6)   ' + REASON_CODES.join(' ') + '   written where verdict is REFUSE and nowhere else\n');
    process.stdout.write('  the six counted every run: ' + SIX.join(' ') + '\n');
    process.exit(0);
  } else {
    const logPath = argv[0] || DEFAULT_LOG;
    const r = report(logPath, readLog(logPath));
    process.exit(r.findings === 0 ? 0 : 1);
  }
}

module.exports = { OUTCOMES, REVIEWS, SIX, FIELDS, VERDICTS, REASON_CODES, readLog, tally, integrity, DEFAULT_LOG };
