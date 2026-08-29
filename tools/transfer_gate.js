#!/usr/bin/env node
/* transfer_gate.js -- sub-step 4.6 (ECON-4b). The build step between a specification and a suite.
 *
 * SPECIFICATION  `oracle/transfer_gate.md` §3, by The Manager (economics prompt) at 4.4.
 * ACCEPTANCE     `oracle/acceptance/transfer_assertions.md`, by the same seat at 4.5, written
 *                before this file existed. Those assertions are taken as given. Where one is
 *                unsatisfiable it is routed back with the measurement, never weakened here.
 * VERDICT STORE  `oracle/mechanism_table.md`, 24 rows.
 *
 * WHY THIS FILE EXISTS AT ALL, in the sub-step's own words: "a specification and a suite with no
 * build step between them is not a mechanism." The split was made deliberately and this is the
 * half that turns three verdict words into something that can fail.
 *
 * THE ONE STRUCTURAL DECISION, and it is what makes F12 mechanical rather than procedural.
 * §0 says all three stages run BEFORE composition, and §3.8 says the gate composes nothing. A gate
 * that runs after composition is a review, and a review can only ask the composer to try again --
 * which is a second retrieval repairing a first, which `register_schema.md` §1 forbids. "Runs
 * before" is not observable in a finished file: a transfer line emitted first and a transfer line
 * appended afterwards are the same bytes.
 *
 * So the ordering is made observable by making the gate the SOLE PRODUCER of transfer lines and
 * carrying its output forward as a set. `runGate()` returns a `GateOutput` whose `lines` are the
 * only legal transfer lines for that run; `checkAnswer(text, gateOutput)` fails on any transfer
 * line in the delivered bytes that the gate did not emit. A post-hoc line is then not a matter of
 * timing but of set membership, and TG-40 is a decoy that can actually be run. This is the same
 * device the register uses for its own blocks: generated, then regenerate-and-diff.
 *
 *   node tools/transfer_gate.js --table                 print the parsed table and the basis map
 *   node tools/transfer_gate.js --mechanism MT-02       emit that row's transfer line
 *   node tools/transfer_gate.js <answer-file>           check the transfer lines in a delivered answer
 *   node tools/transfer_gate.js --prove                 the decoys, against real produced output
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process'), os = require('os');
const FSW = require('./fswalk.js');
const ROOT = path.resolve(__dirname, '..');
const R = p => path.join(ROOT, p);

/* ------------------------------------------------------------- closed sets */
const VERDICTS = ['legitimate', 'illustration', 'unknown'];          // §3.3, closed at three
const DIRECTIONS = ['positive', 'negative', 'both'];                 // §3.5, closed at three
const BASES = ['absent', 'inverted', 'holds', 'unmeasured'];         // §3.4, closed at four
const CONDITIONS = ['capability', 'congruence'];                     // §3.2, closed at two
const TABLE_PATH = 'oracle/mechanism_table.md';

/* THE BASIS-TO-VERDICT MAP IS MECHANICAL AND IT IS THE WHOLE OF §3.4.
 * `absent` is a BASIS, never a verdict: a mechanism whose enabling condition is measured and known
 * to be missing has failed a condition, so its verdict is `illustration` and its basis is `absent`.
 * A mechanism whose condition cannot be evaluated is `unknown`. Collapsing the two would be the
 * error; promoting `absent` to a fourth verdict would split `illustration` on a distinction §3.2's
 * test does not draw. The acceptance target for this gate emits `absent` as a verdict word, which
 * is why TG-09 asserts the correction rather than trusting it. */
function verdictFromBasis(capability, congruence) {
  for (const b of [capability, congruence]) if (!BASES.includes(b)) return { verdict: null, why: 'basis "' + b + '" outside the closed four' };
  if (capability === 'unmeasured' || congruence === 'unmeasured')
    return { verdict: 'unknown', why: 'a condition is not evaluable from disk' };
  if (capability === 'holds' && congruence === 'holds')
    return { verdict: 'legitimate', why: 'both conditions measured and holding' };
  return { verdict: 'illustration', why: 'a condition is measured and fails (' + capability + '/' + congruence + ')' };
}

/* ---------------------------------------------------------------- the table */
/* Parsed from the specification's own markdown, never transcribed into a JSON mirror beside it. A
 * mirror is the two-copies-of-one-truth defect and this project has found it four times. */
function loadTable(file) {
  const t = fs.readFileSync(R(file || TABLE_PATH), 'utf8').replace(/\r\n/g, '\n');
  const rows = new Map();
  // Rows are `### MT-nn[a-z] -- <title>` followed by `- **field:** value` bullets that may wrap.
  const parts = t.split(/\n(?=### MT-)/).slice(1);
  for (const p of parts) {
    const head = p.match(/^### (MT-[0-9]+[a-z]?) *[—-]+ *(.*)$/m);
    if (!head) continue;
    const id = head[1], title = head[2].trim();
    const body = p.split(/\n(?=## )/)[0];
    const field = name => {
      // Capture from the bullet to the next bullet or heading, so a wrapped value survives.
      const re = new RegExp('^- \\*\\*' + name + ':\\*\\*([\\s\\S]*?)(?=\\n- \\*\\*|\\n#|$)', 'm');
      const m = body.match(re);
      return m ? m[1].replace(/\s+/g, ' ').trim() : '';
    };
    const first = s => { const m = s.match(/`([^`]+)`/); return m ? m[1] : ''; };
    // verdict and direction share one bullet: `- **verdict:** `x` -- **direction:** `y``
    const vLine = field('verdict');
    const verdict = first(vLine);
    const dm = vLine.match(/\*\*direction:\*\*\s*`([^`]+)`/);
    const leaves = [...field('leaves').matchAll(/`([^`]+\.md)`/g)].map(m => m[1]);
    const capLine = field('capability'), conLine = field('congruence');
    rows.set(id, {
      id, title,
      mechanism: field('mechanism'),
      evidence: field('evidence'),
      leaves,
      verdict,
      direction: dm ? dm[1] : '',
      capability: first(capLine), capability_note: capLine.replace(/^`[^`]+`\s*[—-]*\s*/, ''),
      congruence: first(conLine), congruence_note: conLine.replace(/^`[^`]+`\s*[—-]*\s*/, ''),
      disanalogy: field('disanalogy'),
      axis: first(field('axis')),
    });
  }
  return rows;
}

/* TG-08 and TG-38, run over the table itself. A store whose own rows do not obey the map the gate
 * applies is a store the gate cannot be trusted to read. */
function auditTable(rows) {
  const findings = [];
  for (const r of rows.values()) {
    for (const f of ['verdict', 'capability', 'congruence', 'disanalogy', 'axis'])
      if (!r[f]) findings.push(r.id + ': field `' + f + '` is empty (TG-38)');
    if (!r.leaves.length) findings.push(r.id + ': names no leaves (TG-38)');
    if (!VERDICTS.includes(r.verdict)) findings.push(r.id + ': verdict `' + r.verdict + '` outside the closed three (TG-02/TG-09)');
    const want = verdictFromBasis(r.capability, r.congruence);
    if (want.verdict && want.verdict !== r.verdict)
      findings.push(r.id + ': basis ' + r.capability + '/' + r.congruence + ' maps to `' + want.verdict + '`, row says `' + r.verdict + '` (TG-08)');
    // §3.5 via TG-38: `direction` is `-` exactly when `verdict` is `unknown`.
    const isDash = r.direction === '-' || r.direction === '';
    if (r.verdict === 'unknown' && !isDash) findings.push(r.id + ': verdict unknown but direction `' + r.direction + '` (TG-38)');
    if (r.verdict !== 'unknown' && isDash) findings.push(r.id + ': verdict `' + r.verdict + '` carries no direction (TG-19/F10)');
    if (r.verdict !== 'unknown' && !isDash && !DIRECTIONS.includes(r.direction))
      findings.push(r.id + ': direction `' + r.direction + '` outside the closed three (TG-19)');
  }
  return findings;
}

/* TG-36 / TG-37. Every leaf resolves, and the extraction is not silently partial. TG-37 exists
 * because the first version of this check under-counted by a third and reported success. */
function leafResolution(rows, tree) {
  const dir = R(tree || 'literature');
  const index = new Set();
  /* W5-11: routed through tools/fswalk.js. `e.isDirectory()` is false for a reparse-pointed
     directory; a pruned taxonomy folder here reports every one of its leaves as UNRESOLVED, and
     TG-37's independent count would agree with it, because both read the same broken index. */
  for (const p of FSW.walk(dir, q => /\.md$/i.test(q), [], { skipDir: n => n === '_pdf' })) {
    index.add(path.basename(p));
  }
  const all = [], distinct = new Set();
  for (const r of rows.values()) for (const l of r.leaves) { all.push({ id: r.id, leaf: l }); distinct.add(l); }
  const unresolved = all.filter(x => !index.has(x.leaf));
  // The independent count TG-37 compares against: a raw scan of every `- **leaves:**` bullet's
  // backticked .md tokens across the whole file, done WITHOUT the row parser, so a parser that
  // drops rows or truncates a wrapped bullet is caught rather than believed.
  const raw = new Set([...fs.readFileSync(R(TABLE_PATH), 'utf8')
    .replace(/\r\n/g, '\n')
    .matchAll(/^- \*\*leaves:\*\*([\s\S]*?)(?=\n- \*\*|\n#|$)/gm)]
    .flatMap(m => [...m[1].matchAll(/`([^`]+\.md)`/g)].map(x => x[1])));
  return { references: all.length, distinct: distinct.size, unresolved, rawDistinct: raw.size, corpus: index.size };
}

/* ----------------------------------------------------------------- the gate */
/* §3.7: a mechanism with no row is `unknown`. THE DEFAULT IS CHOSEN, not inherited. The
 * alternative -- treat an unlisted mechanism as `legitimate` until someone objects -- licenses
 * every transfer nobody has thought about yet, which is the whole failure mode. */
const UNLISTED = id => ({
  id, title: '(no row)', mechanism: id, leaves: [], verdict: 'unknown', direction: '-',
  capability: 'unmeasured', congruence: 'unmeasured',
  capability_note: 'no row in ' + TABLE_PATH + ' measures this condition',
  congruence_note: 'no row in ' + TABLE_PATH + ' measures this condition',
  disanalogy: '', axis: '', unlisted: true,
});

/* §3.6, the emitted grammar. Fixed, and arity-fixed:
 *   Transfer (<verdict>, <direction>): <mechanism> -- <condition>/<basis>: <disanalogy or quantity>
 * One line per CONDITION carrying a non-`holds` basis, so `illustration` names WHICH condition
 * failed (TG-04) and `unknown` names WHICH quantity is unmeasured (TG-05). A single line for a
 * two-condition verdict cannot do that, and TG-04 would pass on an empty field. */
function emit(row, opts) {
  const o = opts || {};
  const lines = [];
  const label = row.title && row.title !== '(no row)' ? row.title : row.mechanism;
  const short = s => String(s).replace(/\s+/g, ' ').trim();
  if (row.verdict === 'legitimate') {
    // §3.3: two names, one per condition, or the verdict is not `legitimate`.
    const src = row.leaves.length ? row.leaves.join(', ') : '';
    for (const c of CONDITIONS)
      lines.push('Transfer (legitimate, ' + row.direction + '): ' + label + ' -- ' + c + '/' + row[c] + ': ' + short(row[c + '_note']) + ' [' + src + ']');
  } else if (row.verdict === 'illustration') {
    const failed = CONDITIONS.filter(c => row[c] !== 'holds');
    for (const c of failed)
      lines.push('Transfer (illustration, ' + row.direction + '): ' + label + ' -- ' + c + '/' + row[c] + ': ' + short(row.disanalogy || row[c + '_note']));
  } else {
    const un = CONDITIONS.filter(c => row[c] === 'unmeasured');
    const region = o.region || 'literature/ and the app';
    for (const c of un)
      lines.push('Transfer (unknown, -): ' + label + ' -- ' + c + '/unmeasured: ' + short(row[c + '_note']) + ' [region searched: ' + region + ']');
  }
  return lines;
}

/* The stage the composition path calls. Returns the ONLY legal transfer lines for this run, plus
 * the composition constraint the verdict imposes. It composes nothing (§3.8). */
function runGate(rows, mechanismIds, opts) {
  const records = mechanismIds.map(id => rows.get(id) || UNLISTED(id));
  const lines = [];
  for (const r of records) lines.push(...emit(r, opts));
  const anyUnknown = records.some(r => r.verdict === 'unknown');
  return {
    records, lines,
    // §3.3: `unknown` composes a refusal, not a hedge. This is a REQUIREMENT ON THE COMPOSER that
    // the gate states and does not itself perform, which is the §3.8 boundary.
    requiredVerdict: anyUnknown ? 'REFUSE' : null,
    requiredReasonCode: anyUnknown ? 'not-found' : null,
    // §3.3's own reported misfit, carried forward rather than hidden: contract §5 states
    // `not-found` as "no address resolved and no shelf file confirmed", and here shelf files WERE
    // confirmed and what is missing is a measurement of a CONDITION. `not-found` is the closest of
    // the six and its owner is right. The wording does not cover this case, and the fix is a
    // contract edit, which is not this seat's file.
    reasonCodeMisfit: anyUnknown ? 'contract §5 `not-found` is the closest of six and its owner is correct; its stated condition does not cover a confirmed-shelf/unmeasured-condition refusal. Owner: the contract. Relayed at transfer_gate.md §3.3' : null,
  };
}

/* ------------------------------------------------------- checking an answer */
/* The tail is `:\s*(.*)$` and not `: (.*)$`. An emptied tail is the TG-04 decoy, and a pattern
 * requiring the space after the colon rejects that line as MALFORMED instead of reporting it as an
 * `illustration` with no disanalogy. Both are failures, so the run still goes red -- but it goes
 * red for the wrong reason, and a decoy that fires the wrong assertion is a decoy that will be
 * "fixed" by the next person to touch the grammar. It cost one proof to find and is recorded here
 * rather than silently corrected. */
const LINE_RE = /^Transfer \(([a-z]+), ([a-z-]+)\): (.+?) -- ([a-z]+)\/([a-z]+):\s*(.*)$/;
function parseLines(text) {
  const out = [];
  for (const raw of text.replace(/\r\n/g, '\n').split('\n')) {
    const s = raw.trim();
    if (!/^Transfer \(/.test(s)) continue;
    const m = s.match(LINE_RE);
    out.push(m ? { raw: s, ok: true, verdict: m[1], direction: m[2], mechanism: m[3], condition: m[4], basis: m[5], tail: m[6] }
      : { raw: s, ok: false });
  }
  return out;
}

/* `gateOutput` is optional. Without it this checks the grammar and the closed sets; with it, it
 * also checks that no line reached the bytes except through the gate, which is F12/TG-40. */
function checkAnswer(text, gateOutput) {
  const parsed = parseLines(text);
  const findings = [];
  const runVerdict = (text.match(/^\s*ROUTING VERDICT\s+([A-Z]+)/m) || [])[1] || null;
  for (const L of parsed) {
    if (!L.ok) { findings.push('TG-02/§3.6 grammar: line does not match the fixed arity: ' + JSON.stringify(L.raw.slice(0, 120))); continue; }
    if (!VERDICTS.includes(L.verdict)) findings.push('TG-02: verdict `' + L.verdict + '` outside the closed three: ' + L.raw.slice(0, 90));
    if (!BASES.includes(L.basis)) findings.push('TG-09: basis `' + L.basis + '` outside the closed four: ' + L.raw.slice(0, 90));
    if (!CONDITIONS.includes(L.condition)) findings.push('§3.2: condition `' + L.condition + '` outside {capability, congruence}');
    if (L.verdict === 'legitimate') {
      if (!DIRECTIONS.includes(L.direction)) findings.push('TG-19/F10: `legitimate` with no direction: ' + L.raw.slice(0, 90));
      const named = (L.tail.match(/\[([^\]]*)\]/) || [, ''])[1].split(',').map(s => s.trim()).filter(s => /\.md$/.test(s));
      if (named.length < 2) findings.push('TG-03: `legitimate` names ' + named.length + ' source(s); §3.3 requires two, one per condition: ' + L.raw.slice(0, 90));
    }
    if (L.verdict === 'illustration' && !L.tail.trim())
      findings.push('TG-04/F8: `illustration` with an empty disanalogy is a hedge wearing a label: ' + L.raw.slice(0, 90));
    if (L.verdict === 'unknown') {
      if (!L.tail.trim()) findings.push('TG-05: `unknown` names no unmeasured quantity: ' + L.raw.slice(0, 90));
      if (!/region searched:/.test(L.tail)) findings.push('TG-05: `unknown` names no region searched: ' + L.raw.slice(0, 90));
      if (L.direction !== '-') findings.push('§3.5: `unknown` carries a direction; direction is `-` exactly when the verdict is unknown');
    }
  }
  // TG-06/F9. `unknown` composes a refusal, not a hedge.
  if (parsed.some(L => L.ok && L.verdict === 'unknown') && runVerdict && runVerdict !== 'REFUSE')
    findings.push('TG-06/F9: a transfer line reads `unknown` and the run verdict is ' + runVerdict + ', not REFUSE. `unknown` composes a refusal, not a hedge');
  // TG-40/F12. Set membership, not timing.
  if (gateOutput) {
    const legal = new Set(gateOutput.lines);
    for (const L of parsed) if (!legal.has(L.raw))
      findings.push('TG-40/F12: a transfer line is present that the gate did not emit -- it was appended to a composed answer rather than produced before composition: ' + L.raw.slice(0, 90));
    for (const l of gateOutput.lines) if (!parsed.some(L => L.raw === l))
      findings.push('TG-40/F12: the gate emitted a line the deliverable does not carry: ' + l.slice(0, 90));
  }
  return { lines: parsed, runVerdict, findings };
}

/* ------------------------------------------------------------------ report */
function report(label, r) {
  const W = s => process.stdout.write(s + '\n');
  W('TRANSFER GATE  ' + label);
  W('  transfer lines read    ' + r.lines.length);
  W('  run verdict            ' + (r.runVerdict || '(not stated in these bytes)'));
  if (!r.lines.length) {
    W('');
    W('  EMPTY POPULATION: this text carries no transfer line. That is correct for an answer that');
    W('  carries no mechanism into a lunar context (§3.1: quoting a Japanese figure as a Japanese');
    W('  figure is not a transfer). Reported as empty, NEVER as a pass.');
    W('');
    W('RESULT  EMPTY (0 findings over a population of 0 -- not a pass)');
    return r;
  }
  for (const L of r.lines) W('  ' + (L.ok ? 'ok    ' : 'FAIL  ') + L.raw.slice(0, 160));
  if (r.findings.length) { W(''); for (const f of r.findings) W('  FAIL  ' + f); }
  W('');
  W('LIMIT   this checks that the gate emitted the verdict the table carries, in the fixed grammar,');
  W('        and that nothing reached the bytes except through the gate. It does not check that a');
  W('        table verdict is CORRECT -- whether MT-14 should read `legitimate` rather than');
  W('        `illustration` is a judgement with an author, and it closes by a person\'s sampling');
  W('        read or it does not close (transfer_assertions.md §9.1).');
  W('');
  W(r.findings.length ? 'RESULT  FAIL, ' + r.findings.length + ' finding(s)' : 'RESULT  PASS');
  return r;
}

/* ------------------------------------------------------------------- proof */
const PRODUCER = 'lsei/oracle/answer_question.js';
function produce(question) {
  const log = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tg-prove-')), 'run.jsonl');
  const cmd = 'node "' + R(PRODUCER) + '" ' + JSON.stringify(question) +
    ' --app=lsei/index.html --lit=literature --log="' + log.replace(/\\/g, '/') + '"';
  try { return cp.execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { return (e.stdout || '') + (e.stderr || ''); }
}
function bytesChanged(a, b) {
  const n = Math.min(a.length, b.length); let d = Math.abs(a.length - b.length);
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) d++;
  return d + ' byte position(s) differ, length delta ' + (b.length - a.length);
}

function prove() {
  const out = [];
  const add = (id, expect, got, pass) => out.push({ id, expect, got, pass });
  const rows = loadTable();

  add('TABLE-PARSES', '24 rows parse out of ' + TABLE_PATH, rows.size + ' rows', rows.size === 24);
  const audit = auditTable(rows);
  add('TG-08/TG-38 TABLE-AUDIT', 'every row carries its fields and obeys the basis-to-verdict map',
    audit.length ? audit.length + ' finding(s): ' + audit.slice(0, 3).join(' ; ') : '0 findings over ' + rows.size + ' rows',
    audit.length === 0);
  const res = leafResolution(rows);
  add('TG-36 LEAVES-RESOLVE', 'every leaf named by every row resolves under literature/',
    res.references + ' references, ' + res.distinct + ' distinct, ' + res.unresolved.length + ' unresolved over ' + res.corpus + ' corpus leaves',
    res.unresolved.length === 0);
  add('TG-37 EXTRACTION-NOT-PARTIAL', 'the row parser and an independent raw scan find the same distinct leaves',
    'parser ' + res.distinct + ', raw scan ' + res.rawDistinct, res.distinct === res.rawDistinct);
  const verdictWord = [...rows.values()].filter(r => r.verdict === 'absent');
  add('TG-09 ABSENT-IS-NOT-A-VERDICT', '`absent` never appears in a verdict field',
    verdictWord.length + ' row(s) carry verdict `absent`; ' + [...rows.values()].filter(r => r.capability === 'absent' || r.congruence === 'absent').length + ' carry it as a basis',
    verdictWord.length === 0);

  /* §3.7's default, and it is chosen. */
  const g0 = runGate(rows, ['MT-99-not-a-row']);
  add('TG-39 UNLISTED-DEFAULTS-UNKNOWN', 'a mechanism with no row reads `unknown` and forces REFUSE',
    g0.records[0].verdict + ' / requiredVerdict ' + g0.requiredVerdict,
    g0.records[0].verdict === 'unknown' && g0.requiredVerdict === 'REFUSE');

  /* The producer, and the answer every decoy below is built from. */
  const real = produce('Did Japanese industrial policy raise productivity?');
  add('PRODUCER-RAN', 'the real router emitted an answer', real.length + ' bytes, verdict ' +
    ((real.match(/ROUTING VERDICT\s+(\w+)/) || [])[1] || '?'), real.length > 200 && /ROUTING VERDICT/.test(real));
  if (real.length < 200) { process.stdout.write('FAIL  PRODUCER-RAN  no produced output to mutate; this file refuses to build decoys on a stand-in\n'); process.exit(1); }

  /* CONTROL. Splice the gate's own emitted lines into the real produced answer. The lines are the
     gate's output, not strings this proof composed, which is the difference between a control and
     a stand-in. MT-02 is `illustration`; the run is a LITERATURE answer, which is legal. */
  const gIll = runGate(rows, ['MT-02']);
  const controlIll = real.replace(/\nLIMIT:/, '\n' + gIll.lines.join('\n') + '\nLIMIT:');
  add('MUTATION-APPLIED / illustration splice', 'the splice changed the bytes',
    controlIll === real ? 'DECOY DID NOT APPLY' : bytesChanged(real, controlIll), controlIll !== real);
  const cIll = checkAnswer(controlIll, gIll);
  add('CONTROL-ILLUSTRATION', 'MT-02 emits `illustration` naming its failing condition, 0 findings',
    gIll.lines.length + ' line(s), ' + cIll.findings.length + ' finding(s)' + (cIll.findings[0] ? ': ' + cIll.findings[0] : ''),
    gIll.lines.length > 0 && cIll.findings.length === 0);

  /* TG-04/F8. An `illustration` whose disanalogy is emptied. */
  const emptied = controlIll.replace(/^(Transfer \(illustration, [a-z]+\): .+? -- [a-z]+\/[a-z]+: ).*$/m, '$1');
  add('MUTATION-APPLIED / empty the disanalogy', 'the mutation changed the bytes',
    emptied === controlIll ? 'DECOY DID NOT APPLY' : bytesChanged(controlIll, emptied), emptied !== controlIll);
  const cEmpty = checkAnswer(emptied, null);
  add('DECOY-ILLUSTRATION-NO-DISANALOGY', 'TG-04 fires: an `illustration` with an empty disanalogy is a hedge wearing a label',
    cEmpty.findings.filter(f => /TG-04/.test(f)).length + ' TG-04 finding(s)',
    cEmpty.findings.some(f => /TG-04/.test(f)));

  /* TG-02. A fourth verdict word. `absent` is the one the acceptance target itself emits, so it is
     the word the decoy uses rather than an invented one. */
  const fourth = controlIll.replace('Transfer (illustration,', 'Transfer (absent,');
  add('MUTATION-APPLIED / fourth verdict word', 'the mutation changed the bytes',
    fourth === controlIll ? 'DECOY DID NOT APPLY' : bytesChanged(controlIll, fourth), fourth !== controlIll);
  const cFourth = checkAnswer(fourth, null);
  add('DECOY-FOURTH-VERDICT', 'TG-02 fires on `absent` used as a verdict — the word the acceptance target emits',
    cFourth.findings.filter(f => /TG-02/.test(f)).length + ' TG-02 finding(s)',
    cFourth.findings.some(f => /TG-02/.test(f)));

  /* TG-19/F10, the highest-value assertion in 4.5. A `legitimate` stripped of its direction
     licenses the negation of what the source measured. */
  const legRow = [...rows.values()].find(r => r.verdict === 'legitimate' && r.direction === 'negative');
  if (legRow) {
    const gLeg = runGate(rows, [legRow.id]);
    const controlLeg = real.replace(/\nLIMIT:/, '\n' + gLeg.lines.join('\n') + '\nLIMIT:');
    const cLeg = checkAnswer(controlLeg, gLeg);
    add('CONTROL-LEGITIMATE-NEGATIVE', legRow.id + ' emits `legitimate, negative` naming two sources, 0 findings',
      gLeg.lines.length + ' line(s), ' + cLeg.findings.length + ' finding(s)' + (cLeg.findings[0] ? ': ' + cLeg.findings[0] : ''),
      cLeg.findings.length === 0);
    const stripped = controlLeg.replace(/Transfer \(legitimate, negative\)/g, 'Transfer (legitimate, )');
    add('MUTATION-APPLIED / strip the direction', 'the mutation changed the bytes',
      stripped === controlLeg ? 'DECOY DID NOT APPLY' : bytesChanged(controlLeg, stripped), stripped !== controlLeg);
    const cStrip = checkAnswer(stripped, null);
    add('DECOY-LEGITIMATE-NO-DIRECTION', 'TG-19/F10 fires: a direction-free `legitimate` reads as "the mechanism transfers" and a composer will use it the wrong way round',
      cStrip.findings.filter(f => /TG-19|grammar/.test(f)).length + ' finding(s)',
      cStrip.findings.some(f => /TG-19|grammar/.test(f)));
    const flipped = controlLeg.replace(/Transfer \(legitimate, negative\)/g, 'Transfer (legitimate, positive)');
    const cFlip = checkAnswer(flipped, gLeg);
    add('DECOY-DIRECTION-FLIPPED / TG-20', 'the flipped direction is not a line the gate emitted, so F12 catches what the grammar alone cannot',
      cFlip.findings.filter(f => /TG-40/.test(f)).length + ' TG-40 finding(s)',
      cFlip.findings.some(f => /TG-40/.test(f)));
  } else {
    add('CONTROL-LEGITIMATE-NEGATIVE', 'the table carries at least one legitimate/negative row',
      'NONE FOUND -- TG-20, the highest-value assertion in 4.5, has no subject in this table', false);
  }

  /* TG-06/F9. `unknown` composes a refusal. The real answer's verdict is LITERATURE. */
  const unkRow = [...rows.values()].find(r => r.verdict === 'unknown');
  if (unkRow) {
    const gUnk = runGate(rows, [unkRow.id]);
    const hedged = real.replace(/\nLIMIT:/, '\n' + gUnk.lines.join('\n') + '\nLIMIT:');
    add('MUTATION-APPLIED / unknown into a LITERATURE answer', 'the mutation changed the bytes',
      hedged === real ? 'DECOY DID NOT APPLY' : bytesChanged(real, hedged), hedged !== real);
    const cUnk = checkAnswer(hedged, gUnk);
    add('DECOY-UNKNOWN-AS-HEDGE / TG-06', '`unknown` in an answer whose verdict is not REFUSE fails',
      cUnk.runVerdict + ' run verdict, ' + cUnk.findings.filter(f => /TG-06/.test(f)).length + ' TG-06 finding(s)',
      cUnk.findings.some(f => /TG-06/.test(f)));
    add('TG-05 UNKNOWN-NAMES-REGION', 'the gate\'s own `unknown` line names the unmeasured quantity and the region searched',
      /region searched:/.test(gUnk.lines[0] || '') ? 'named' : 'NOT NAMED', /region searched:/.test(gUnk.lines[0] || ''));
  }

  /* TG-40/F12, the post-hoc line, which is the whole reason the gate carries its output forward. */
  const posthoc = controlIll + '\nTransfer (legitimate, positive): a mechanism nobody gated -- capability/holds: appended after composition [a.md, b.md]\n';
  add('MUTATION-APPLIED / append after composition', 'the mutation changed the bytes',
    posthoc === controlIll ? 'DECOY DID NOT APPLY' : bytesChanged(controlIll, posthoc), posthoc !== controlIll);
  const cPost = checkAnswer(posthoc, gIll);
  const grammarOnly = checkAnswer(posthoc, null);
  add('DECOY-POST-HOC-LINE / TG-40', 'the appended line is caught by set membership, and a grammar-only check passes it',
    'with gate output: ' + cPost.findings.filter(f => /TG-40/.test(f)).length + ' TG-40 finding(s); grammar only: ' + grammarOnly.findings.length + ' finding(s)',
    cPost.findings.some(f => /TG-40/.test(f)) && grammarOnly.findings.length === 0);

  /* The empty population, stated. §3.1: quoting a Japanese figure as a Japanese figure is not a
     transfer, so an ungated answer carries no lines and that is not a pass. */
  const cNone = checkAnswer(real, null);
  add('EMPTY-IS-NOT-PASS', 'an answer carrying no transfer line is reported EMPTY, never PASS',
    cNone.lines.length + ' line(s), ' + cNone.findings.length + ' finding(s)', cNone.lines.length === 0);

  const w = Math.max(...out.map(o => o.id.length));
  let bad = 0;
  for (const o of out) { if (!o.pass) bad++; process.stdout.write((o.pass ? 'PASS  ' : 'FAIL  ') + o.id.padEnd(w) + '  expected ' + o.expect + '  |  got ' + o.got + '\n'); }
  const applied = out.filter(o => /^MUTATION-APPLIED/.test(o.id));
  process.stdout.write('\nmutations written ' + applied.length + ', mutations observed to apply ' + applied.filter(o => o.pass).length +
    '. A decoy that fails to apply is a FAILURE, not a skip (INV-11).\n');
  process.stdout.write((out.length - bad) + ' of ' + out.length + ' proofs pass\n');
  process.exit(bad ? 1 : 0);
}

/* ------------------------------------------------------------------- entry */
if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv[0] === '--prove') prove();
  else if (argv[0] === '--table') {
    const rows = loadTable();
    const audit = auditTable(rows), res = leafResolution(rows);
    process.stdout.write('MECHANISM TABLE  ' + TABLE_PATH + '\n  rows ' + rows.size + '\n');
    for (const r of rows.values())
      process.stdout.write('  ' + r.id.padEnd(7) + r.verdict.padEnd(13) + (r.direction || '-').padEnd(10) +
        (r.capability + '/' + r.congruence).padEnd(24) + r.leaves.length + ' leaf/leaves  ' + r.title.slice(0, 44) + '\n');
    process.stdout.write('\n  leaf references ' + res.references + ', distinct ' + res.distinct +
      ' (raw scan ' + res.rawDistinct + '), unresolved ' + res.unresolved.length + '\n');
    process.stdout.write(audit.length ? '\nAUDIT FINDINGS (' + audit.length + '):\n  ' + audit.join('\n  ') + '\n' : '\nAUDIT  0 findings\n');
    process.exit(audit.length || res.unresolved.length ? 1 : 0);
  } else if (argv[0] === '--mechanism') {
    const g = runGate(loadTable(), argv.slice(1));
    for (const l of g.lines) process.stdout.write(l + '\n');
    if (g.requiredVerdict) process.stdout.write('\nrequired run verdict: ' + g.requiredVerdict + ' / ' + g.requiredReasonCode +
      '\nreason-code misfit reported, not hidden: ' + g.reasonCodeMisfit + '\n');
    process.exit(0);
  } else if (!argv.length) {
    process.stderr.write('usage: node tools/transfer_gate.js <answer-file> | --table | --mechanism <MT-id...> | --prove\n');
    process.exit(2);
  } else {
    let findings = 0;
    for (const f of argv) { const r = report(f, checkAnswer(fs.readFileSync(f, 'utf8'), null)); findings += r.findings.length; }
    process.exit(findings ? 1 : 0);
  }
}

module.exports = { VERDICTS, DIRECTIONS, BASES, CONDITIONS, verdictFromBasis, loadTable, auditTable,
  leafResolution, emit, runGate, parseLines, checkAnswer };
