#!/usr/bin/env node
/* oracle/router/acceptance.js -- run the router over a question set and assert what it now claims.
 *
 *   node oracle/router/acceptance.js                 every question set present on disk
 *   node oracle/router/acceptance.js <path> [...]    the named sets only
 *   node oracle/router/acceptance.js --findings      print one line per question
 *   node oracle/router/acceptance.js --reach         print the evidence-reachability detail
 *
 * ===================================================================================================
 * WHAT THIS HARNESS MEASURES NOW, AND WHAT IT CAN NO LONGER MEASURE. Read this before reading a
 * number out of it. A harness whose meaning changed silently is worse than one that was deleted.
 * ===================================================================================================
 *
 * IT MEASURED, UNTIL SUB-STEP 8.1:
 *
 *   (a) exactly one verdict per question, from the closed six, never two and never zero;
 *   (b) never two retrieval modes on one sub-claim, never zero;
 *   (c) AGREEMENT with the expected-verdict column of oracle/acceptance/lunar_questions.md --
 *       the 11-of-14 figure this project has quoted since Step 4.
 *
 * IT CANNOT MEASURE ANY OF THE THREE ANY MORE, and not because they got harder. There is no verdict
 * to count, no mode to be exclusive, and nothing to agree or disagree with, because the router
 * stopped choosing. (a), (b) and (c) were all assertions about a decision this program no longer
 * makes. Reporting them would be reporting on a function that is not there.
 *
 * IT MEASURES NOW, and every one of these executes on every run:
 *
 *   1. WELL-FORMED. Every report carries question, closed_set, closed_refusal_codes, reliability,
 *      failure_modes and sub_claims; every sub-claim carries all five evidence channels; every
 *      finding in every channel carries a confidence from the published scale and a stated reason.
 *      A finding with a confidence and no reason is the shape this whole sub-step exists to stop.
 *   2. EVERY QUESTION YIELDS FINDINGS. findings_count > 0 for every question in every set. A report
 *      with no findings is a report that told the session nothing, and it used to be indistinguishable
 *      from a confident REFUSE.
 *   3. THE CLOSED SET IS STILL CLOSED. Not asserted by reading a constant -- asserted by CALLING
 *      assertVerdict() and assertReasonCode() with values inside and outside the sets and requiring
 *      the throw. A closed set nothing tries to break is a closed set nobody has tested.
 *   4. NO REPORT CONTAINS A VERDICT FIELD. assertNoVerdict() walks every report to every depth for a
 *      key named verdict, reason_code, reasonCode or mode. This is the one-way valve, and it is run
 *      here as well as inside adviseQuestion() because an assertion that lives only inside the thing
 *      it checks is the thing checking itself.
 *   5. THE CHANNELS ARE NOT EXCLUSIVE, AND RETRIEVAL RAN ONCE AND LAST. The property that replaced
 *      "never two modes". Asserted per sub-claim.
 *
 * IT REPORTS, WITHOUT ASSERTING:
 *
 *   6. EVIDENCE REACHABILITY on the labelled rows. The expected-verdict column was authored by The
 *      Space Resources Engineer against the app and the corpus, before this router existed, and
 *      throwing it away because the router stopped deciding would be throwing away the one label in
 *      this project nobody wrote to make an implementation pass. It can no longer be an agreement
 *      test. It CAN be a reachability question, which is strictly more informative: for a row
 *      expecting CONTESTED, does any register axis appear in the report at all? For a row expecting
 *      APP or FIGURE, does an app address resolve? For BOTH, do both channels carry something?
 *      Under the retired gate the answer for SRQ-12 was NO -- LCC-07 was filtered out below K and
 *      the report could not mention it. Reachability is what changed; agreement is what is gone.
 *
 *   7. THE FOUR af7abec FAILURES, RELOCATED AND NAMED. RFX-04/07/09/13 in oracle/tests/run_suite.js
 *      recorded that LCC-04, LCC-07, LCC-09 and LCC-13 do not reach K on their own probe_pos. Those
 *      rows assert a verdict and cannot survive 8.1. The FINDING survives, at full resolution and
 *      with the masses, in the AXES BELOW THE MARK ON THEIR OWN PROBE_POS block below. It is not
 *      silenced; it moved, and this is where it moved to.
 *
 * WHICH QUESTION SETS. The harness takes paths rather than embedding them, discovers whatever sets
 * are present, and reports which ones it found.
 *
 *   oracle/acceptance/lunar_questions.md       14 questions, labelled, The Space Resources Engineer
 *   oracle/acceptance/labelled_questions.tsv   44 questions, sub-step 3.6
 *   the register's own probe_pos/probe_neg     66 questions, sub-steps 1.9 and 1.10
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./classify.js');
const RC = require('../reason_codes.js');

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

/* --- the two label alternations, BUILT AT LOAD TIME FROM THE TWO CLOSED SETS ----------------------
 *
 * Both of these were hard-coded alternations in adjacent lines, over two closed sets, in the same
 * expression. One of them had drifted and one had not, and they are ONE defect: correcting only the
 * drifted one is how a repository arranges to have this conversation twice.
 *
 * WHY A DERIVED ALTERNATION IS NOT ON ITS OWN THE FIX. Measured at Step 48 on a real row: fed a row
 * whose Expected cell reads `transfer-unevaluable`, the old code alternation did NOT return null. It
 * returned `excluded`, taken from a cell further down the same row describing what a WRONG answer
 * would be -- so a row correctly labelled with the seventh code was silently relabelled as the exact
 * code the row exists to say is wrong. A missing label is visible. A plausible wrong label is not.
 * Two live rows of the shipped acceptance set were being mislabelled that way with no mutation at
 * all: SRQ-7, a LITERATURE row, read `misclassified`, and SRQ-12, a CONTESTED row, read `excluded`.
 * Widening the alternation from six branches to seven fixes today and leaves the mechanism intact
 * for the eighth code, so the reader below matches the SEMANTIC CLASS in the LABEL CELL and then
 * tests membership, and reports an unrecognised label as a finding.
 */
const escAlt = a => '`(' + a.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')`';
const LABEL_VERDICT_RX = new RegExp(escAlt(C.VERDICTS));
/* THE SEMANTIC CLASS: a backticked lowercase token, hyphens admitted. It is deliberately WIDER than
   the set -- that width is what turns an unrecognised code into a finding instead of a silence. */
const CODE_CLASS_RX = /`([a-z][a-z0-9]*(?:-[a-z0-9]+)*)`/g;

/* A markdown question set. The Space Resources Engineer's oracle/acceptance/lunar_questions.md is a
   TABLE whose rows carry an id, the question, and the verdict a reader is expected to reach. That
   label is READ AND KEPT even though nothing agrees or disagrees with it any more, because it is the
   input to the reachability report -- see (6) above. */
function readMarkdownQuestions(p) {
  const out = [];
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  let n = 0;
  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith('|')) {
      const cells = line.split('|').map(s => s.trim());
      const idCell = cells.find(c => /^\*?\*?[A-Z]{2,4}-\d+\b/.test(c));
      const qCell = cells.find(c => c.endsWith('?') && c.length > 12);
      if (!qCell) continue;
      /* THE LABEL IS READ OUT OF THE LABEL CELL, NOT OUT OF THE WHOLE ROW, and the code is
         matched as a SEMANTIC CLASS and then tested for membership. Both halves are required and
         neither is sufficient, which was measured rather than argued -- see the block above
         LABEL_VERDICT_RX for what the old line did when it was fed the seventh code. */
      const labelCell = cells.find(c => LABEL_VERDICT_RX.test(c)) || '';
      const label = (labelCell.match(LABEL_VERDICT_RX) || [])[1] || null;
      const tokens = [...labelCell.matchAll(CODE_CLASS_RX)].map(m => m[1]);
      const known = tokens.filter(t => RC.CODES.includes(t));
      const unknown = tokens.filter(t => !RC.CODES.includes(t));
      out.push({
        id: (idCell || (path.basename(p) + '#' + (n + 1))).replace(/\*/g, '').split(/\s/)[0],
        question: qCell.replace(/\*\*/g, '').replace(/`/g, '').replace(/\\\|/g, '|').trim(),
        label_verdict: label, label_code: known[0] || null,
        /* AN UNRECOGNISED LABEL IS A FINDING, NEVER AN ABSENCE. `null` for "this row carries no
           expected code" and `null` for "this row carries a code I do not recognise" are the same
           byte, and a harness that cannot tell them apart reports the second as the first and
           produces a coverage number out of it. */
        label_code_finding: unknown.length
          ? ('row ' + (idCell || '#' + (n + 1)) + ' labels reason code(s) [' + unknown.join(', ') +
             '] that are not in the closed set of ' + RC.arityWord() + ' at oracle/reason_codes.js')
          : null,
      });
      n++;
      continue;
    }

    const m = /^(?:[-*+]|\d+[.)])\s+(.*\?)\s*$/.exec(line);
    if (!m) continue;
    const q = m[1].replace(/\*\*/g, '').replace(/^`|`$/g, '').trim();
    if (q.length < 8) continue;
    out.push({ id: path.basename(p) + '#' + (++n), question: q, label_verdict: null, label_code: null });
  }
  return out;
}

function registerProbes(ctx) {
  const out = [];
  for (const ax of ctx.axes.values()) {
    if (ax.probe_pos && ax.probe_pos !== '-') out.push({ id: ax.axis_id + '/pos', question: ax.probe_pos, probe_axis: ax.axis_id, probe_polarity: 'pos' });
    if (ax.probe_neg && ax.probe_neg !== '-') out.push({ id: ax.axis_id + '/neg', question: ax.probe_neg, probe_axis: ax.axis_id, probe_polarity: 'neg' });
  }
  return out;
}

function discover(ctx, argPaths) {
  const sets = [];
  const named = (argPaths || []).filter(a => !a.startsWith('--'));
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

/* --- 1. well-formedness ---------------------------------------------------------------------------
 * Structural, and it is checked field by field rather than by "the object is truthy", because the
 * failure this catches is a channel that silently stopped returning findings. */
const REQUIRED_REPORT_FIELDS = ['question', 'closed_set', 'closed_refusal_codes', 'reliability',
                               'failure_modes', 'sub_claims'];
const REQUIRED_CHANNELS = ['register', 'app', 'exclusions', 'thin_patches', 'retrieval'];

function checkWellFormed(report, where, push) {
  for (const f of REQUIRED_REPORT_FIELDS) {
    if (report[f] === undefined) push(where, 'the report carries no `' + f + '`');
  }
  if (!Array.isArray(report.closed_set) || report.closed_set.length !== C.VERDICTS.length) {
    push(where, 'the report\'s closed_set is not the closed six');
  }
  if (!Array.isArray(report.failure_modes) || report.failure_modes.length === 0) {
    push(where, 'the report carries no failure modes; sub-step 8.2 requires them inline');
  }
  if (!report.reliability || report.reliability.weight !== 'VERY LOW') {
    push(where, 'the report does not state its own weight as VERY LOW');
  }
  if (!report.reliability || !report.reliability.a_non_match_is_weak_evidence_of_absence) {
    push(where, 'the report does not state that a non-match is weak evidence of absence');
  }
  if (!report.reliability || !report.reliability.override_on_judgement) {
    push(where, 'the report does not tell the reader to override it on judgement');
  }
  if (!Array.isArray(report.sub_claims)) { push(where, '`sub_claims` is not an array'); return; }
  if (report.sub_claims.length === 0 && !(report.inputs_unavailable || []).length) {
    push(where, 'zero sub-claims and no unavailable input to explain it');
  }
  for (const s of report.sub_claims) {
    for (const ch of REQUIRED_CHANNELS) {
      if (!s[ch] || s[ch].channel !== ch) { push(where, 'sub-claim is missing channel `' + ch + '`'); continue; }
    }
    /* Every finding carries a confidence from the published scale AND the reason for it. */
    const graded = []
      .concat((s.register && s.register.findings) || [])
      .concat((s.exclusions && s.exclusions.findings) || [])
      .concat((s.thin_patches && s.thin_patches.findings) || [])
      .concat([s.app, s.retrieval].filter(Boolean));
    for (const f of graded) {
      if (!C.CONFIDENCE_LEVELS.includes(f.confidence)) {
        push(where, 'a finding carries confidence "' + f.confidence + '", outside the published scale');
      }
      if (!f.confidence_why || String(f.confidence_why).length < 20) {
        push(where, 'a finding carries a confidence and no stated reason for it');
      }
    }
    /* 5. the channels are not exclusive, retrieval ran once and last. */
    if (!s.retrieval || s.retrieval.runs !== 1) push(where, 'retrieval did not run exactly once on a sub-claim');
    if (!s.retrieval || s.retrieval.ran_after_text_channels !== true) push(where, 'retrieval did not run after the text channels');
    if (!s.register || s.register.suppressed_by_a_threshold !== 0) push(where, 'a register finding was suppressed by a threshold');
  }
}

/* --- 6. evidence reachability, reported and never asserted ---------------------------------------
 * What each label needs to be REACHABLE in the evidence, stated as the channel that would have to
 * carry something. This is not a claim that the label is right and not a claim the router agrees. */
function reachability(label, report) {
  const subs = report.sub_claims || [];
  const anyAxis = subs.some(s => s.register.findings.length > 0);
  const anyApp = subs.some(s => s.app.resolves);
  const anyAppScalar = subs.some(s => s.app.resolves && s.app.address_form === 'scalar');
  const anyFigure = subs.some(s => s.app.resolves && s.app.address_form === 'sweep');
  const anyShelf = subs.some(s => s.retrieval.candidates.length > 0);
  const anyExcl = subs.some(s => s.exclusions.findings.length > 0);
  const anyThin = subs.some(s => s.thin_patches.findings.length > 0);
  switch (label) {
    case 'CONTESTED':  return { reachable: anyAxis, needs: 'at least one register axis in the findings' };
    case 'APP':        return { reachable: anyAppScalar, needs: 'a resolved scalar app address' };
    case 'FIGURE':     return { reachable: anyFigure || anyApp, needs: 'a resolved app address drawing a figure' };
    case 'BOTH':       return { reachable: anyApp && anyShelf, needs: 'an app resolution and a shelf candidate' };
    case 'LITERATURE': return { reachable: anyShelf, needs: 'at least one shelf candidate' };
    case 'REFUSE':     return { reachable: anyExcl || anyThin || !anyShelf,
                                needs: 'an exclusion match, a thin patch, or an empty shelf' };
    default:           return { reachable: null, needs: 'no rule for this label' };
  }
}

/* --- the run ------------------------------------------------------------------------------------- */

function run(ctx, sets) {
  const rows = [];
  const failures = [];
  const push = (where, msg) => failures.push({ where, error: msg });

  for (const set of sets) {
    for (const q of set.questions) {
      const where = set.name + ' ' + q.id;
      let report;
      try { report = C.adviseQuestion(ctx, q.question); }
      catch (e) { push(where, 'adviseQuestion threw: ' + e.message); continue; }

      /* 1. well-formed */
      checkWellFormed(report, where, push);
      /* 2. EVERY QUESTION YIELDS FINDINGS, OR SAYS IN WORDS THAT IT DID NOT.
       *
       * The brief this seat was given said "every question yields findings". Run against the real
       * question sets, that is false and correctly so: N-10 (hospital wastewater antibiotic
       * resistance) and N-12 (the Antarctic ozone hole) are deliberate out-of-scope controls in
       * oracle/acceptance/labelled_questions.tsv and all five channels return nothing on both.
       * Asserting findings > 0 would have made the harness demand that the router hallucinate
       * evidence for a question about hospital plumbing.
       *
       * So the assertion is the one that actually protects the reader: a zero is never left as an
       * absence. Either the report carries findings, or it declares `no_findings_anywhere` with the
       * channel counts and the warning that an empty result and a broken install are the same
       * shape. An unstated zero is the failure; a stated zero is a finding. */
      if (!(report.findings_count > 0) && !(report.inputs_unavailable || []).length) {
        if (report.no_findings_anywhere !== true || !report.no_findings_note) {
          push(where, 'the report carries ZERO findings across all five channels and does not DECLARE ' +
            'the empty result: ' + JSON.stringify(q.question).slice(0, 90));
        }
      }
      /* 4. no report contains a verdict field */
      try { C.assertNoVerdict(report, where); }
      catch (e) { push(where, e.message); }

      const subs = report.sub_claims || [];
      const topAxis = subs.flatMap(s => s.register.findings).sort((a, b) => b.mass - a.mass)[0] || null;
      rows.push({
        set: set.name, id: q.id, question: q.question,
        sub_claims: subs.length,
        findings: report.findings_count,
        axes: subs.reduce((a, s) => a + s.register.findings.length, 0),
        top_axis: topAxis ? topAxis.axis_id : null,
        top_axis_mass: topAxis ? topAxis.mass : null,
        top_axis_margin: topAxis ? topAxis.margin : null,
        top_axis_confidence: topAxis ? topAxis.confidence : null,
        app_resolves: subs.some(s => s.app.resolves),
        app_form: (subs.find(s => s.app.resolves) || {}).app ? subs.find(s => s.app.resolves).app.address_form : null,
        app_echo: subs.some(s => s.app.input_echo_keys_named.length > 0),
        app_answers_grade: (subs.find(s => s.app.resolves && s.app.answers_output_grade) || { app: {} }).app.answers_output_grade || null,
        exclusions: subs.reduce((a, s) => a + s.exclusions.findings.length, 0),
        thin: subs.reduce((a, s) => a + s.thin_patches.findings.length, 0),
        shelf: subs.reduce((a, s) => a + s.retrieval.candidates.length, 0),
        shelf_confirmed: subs.reduce((a, s) => a + (s.retrieval.top_confirmed ? 1 : 0), 0),
        label_verdict: q.label_verdict || null,
        label_code: q.label_code || null,
        reach: q.label_verdict ? reachability(q.label_verdict, report) : null,
        probe_axis: q.probe_axis || null,
        probe_polarity: q.probe_polarity || null,
      });
    }
  }
  return { rows, failures };
}

/* --- 3. the closed set is still closed, tested by trying to break it ------------------------------ */
function closedSetProbes() {
  const proofs = [];
  const expectThrow = (name, fn) => {
    let threw = false;
    try { fn(); } catch (e) { threw = true; }
    proofs.push({ name, pass: threw, why: threw ? 'threw, as it must' : 'DID NOT THROW' });
  };
  const expectPass = (name, fn) => {
    let ok = true, msg = '';
    try { fn(); } catch (e) { ok = false; msg = e.message; }
    proofs.push({ name, pass: ok, why: ok ? 'accepted, as it must' : 'threw: ' + msg });
  };
  for (const v of C.VERDICTS) expectPass('assertVerdict accepts ' + v, () => C.assertVerdict(v));
  expectThrow('assertVerdict rejects MAYBE', () => C.assertVerdict('MAYBE'));
  expectThrow('assertVerdict rejects null', () => C.assertVerdict(null));
  expectThrow('assertVerdict rejects lowercase app', () => C.assertVerdict('app'));
  expectThrow('assertReasonCode rejects a REFUSE with no code', () => C.assertReasonCode('REFUSE', null));
  expectThrow('assertReasonCode rejects a REFUSE with an unknown code', () => C.assertReasonCode('REFUSE', 'nope'));
  expectThrow('assertReasonCode rejects a non-REFUSE carrying a code', () => C.assertReasonCode('APP', 'not-found'));
  for (const c of C.REASON_CODES) expectPass('assertReasonCode accepts REFUSE/' + c, () => C.assertReasonCode('REFUSE', c));
  expectThrow('assertNoVerdict rejects a report carrying a verdict', () => C.assertNoVerdict({ a: { b: [{ verdict: 'APP' }] } }));
  expectThrow('assertNoVerdict rejects a report carrying a reason_code', () => C.assertNoVerdict({ reason_code: 'not-found' }));
  expectThrow('assertNoVerdict rejects a report carrying a mode', () => C.assertNoVerdict({ x: { mode: 'APP' } }));
  expectPass('assertNoVerdict accepts a report carrying only the MENU', () => C.assertNoVerdict({ closed_set: C.VERDICTS }));
  expectThrow('classifyQuestion() is retired and says so', () => C.classifyQuestion({}, 'x'));
  expectThrow('compose() is retired and says so', () => C.compose([]));
  return proofs;
}

/* --- 7. the relocated af7abec finding ------------------------------------------------------------
 * The axes that do not reach K on their own probe_pos, with the masses. This is the signal
 * RFX-04/07/09/13 carried in oracle/tests/run_suite.js, which cannot survive 8.1 because it asserts
 * a verdict. It is not silenced. It is here, and it is richer here, because a mass and a margin say
 * how far short the axis fell and the verdict comparison did not. */
function axesBelowTheirOwnProbe(ctx) {
  const LIT = require('../retrieval/literature_search.js');
  const out = [];
  for (const ax of ctx.axes.values()) {
    if (!ax.probe_pos || ax.probe_pos === '-') continue;
    const { mass, hits } = C.axisMass(ctx, ax, LIT.tokenize(ax.probe_pos));
    if (ctx.K != null && mass >= ctx.K) continue;
    out.push({ axis_id: ax.axis_id, class: ax.class, sides: ax.sides.size,
               mass: Number(mass.toFixed(3)), mark: ctx.K,
               margin: ctx.K == null ? null : Number((mass - ctx.K).toFixed(3)),
               keys_matched: hits, probe: ax.probe_pos });
  }
  return out.sort((a, b) => a.mass - b.mass);
}

function tally(rows, key) {
  const t = {};
  for (const r of rows) { const k = r[key] == null ? '-' : String(r[key]); t[k] = (t[k] || 0) + 1; }
  return t;
}

function main() {
  const args = process.argv.slice(2);
  const ctx = C.loadContext({});
  if (ctx.refuse) {
    console.error('INPUTS UNAVAILABLE, so no channel could run: ' + ctx.refuse.missing.join('; '));
    console.error('The router reports this and does not rule on it. Zero personas spent.');
    process.exit(1);
  }

  const sets = discover(ctx, args);
  for (const s of sets) {
    console.log((s.present ? 'set   ' : 'ABSENT') + '  ' + s.name.padEnd(46) + s.questions.length + ' question(s)');
  }
  const { rows, failures } = run(ctx, sets);

  console.log('');
  console.log('THE ROUTER ADVISES. It emits no verdict; the six stay closed and the session picks one.');
  console.log('questions advised: ' + rows.length +
    '   sub-claims: ' + rows.reduce((a, r) => a + r.sub_claims, 0) +
    '   findings: ' + rows.reduce((a, r) => a + r.findings, 0));
  console.log('channels:   register ' + rows.reduce((a, r) => a + r.axes, 0) +
    ' axis finding(s), app ' + rows.filter(r => r.app_resolves).length + ' resolution(s), exclusions ' +
    rows.reduce((a, r) => a + r.exclusions, 0) + ', thin ' + rows.reduce((a, r) => a + r.thin, 0) +
    ', shelf ' + rows.reduce((a, r) => a + r.shelf, 0) + ' candidate(s)');
  console.log('questions with ZERO findings: ' + rows.filter(r => r.findings === 0).length +
    ' (each one DECLARES the empty result; an unstated zero is the failure, a stated zero is a finding)');
  for (const r of rows.filter(x => x.findings === 0)) console.log('    empty  ' + String(r.id).padEnd(9) + r.question.slice(0, 78));
  console.log('top-axis confidence: ' + JSON.stringify(tally(rows, 'top_axis_confidence')));
  console.log('app answers on an echo/constant key: ' +
    rows.filter(r => r.app_answers_grade === 'input_echo' || r.app_answers_grade === 'constant').length +
    ' of ' + rows.filter(r => r.app_resolves).length + ' resolution(s)');
  console.log('reference marks (reported, retired as gates at 8.6): K=' + ctx.K +
    ' (' + (ctx.K_status || 'no status') + ')  thin fire=' + ctx.thinFire + ' govern=' + ctx.thinGovern);

  /* 3. the closed set */
  const proofs = closedSetProbes();
  const badProofs = proofs.filter(p => !p.pass);
  console.log('');
  console.log('CLOSED-SET PROBES: ' + (proofs.length - badProofs.length) + ' of ' + proofs.length +
    ' pass. Each one CALLS the assertion with a legal or an illegal value and requires the outcome.');
  for (const p of badProofs) console.log('  BROKEN  ' + p.name + ' -- ' + p.why);

  /* 6. reachability */
  /* The label findings, printed before reachability because an unrecognised label makes every
     number below it about a row whose expected code nobody read. */
  const labelFindings = rows.map(r => r.label_code_finding).filter(Boolean);
  if (labelFindings.length) {
    console.log('');
    console.log('LABEL FINDINGS: ' + labelFindings.length + ' question row(s) label a reason code outside the closed set.');
    for (const f of labelFindings) console.log('  ' + f);
  }
  const labelled = rows.filter(r => r.label_verdict);
  if (labelled.length) {
    const reached = labelled.filter(r => r.reach && r.reach.reachable);
    console.log('');
    console.log('EVIDENCE REACHABILITY on ' + labelled.length + ' labelled row(s) -- REPORTED, NOT ASSERTED.');
    console.log('  This is NOT the old 11-of-14 agreement figure and is not comparable to it. It asks');
    console.log('  whether the evidence a reader would need to reach the label is PRESENT in the report,');
    console.log('  not whether this tool agrees with the label. Nothing here can pass or fail the run.');
    console.log('  reachable ' + reached.length + '   not reachable ' + (labelled.length - reached.length));
    for (const r of labelled) {
      const mark = r.reach.reachable ? 'reachable    ' : 'NOT REACHABLE';
      console.log('  ' + mark + ' ' + String(r.id).padEnd(9) + 'label ' + String(r.label_verdict).padEnd(11) +
        'axes=' + String(r.axes).padEnd(3) + 'app=' + String(r.app_resolves).padEnd(6) +
        'shelf=' + String(r.shelf).padEnd(3) + 'top=' +
        (r.top_axis ? r.top_axis + '@' + r.top_axis_mass + '/' + r.top_axis_margin : '-'));
    }
  }

  /* 7. the relocated finding */
  const below = axesBelowTheirOwnProbe(ctx);
  console.log('');
  console.log('AXES BELOW THE MARK ON THEIR OWN probe_pos: ' + below.length + ' of ' + ctx.axes.size + '.');
  console.log('  This is where the RFX-04/07/09/13 finding lives now. Those rows in oracle/tests/run_suite.js');
  console.log('  assert a verdict and cannot survive 8.1; the measurement they carried is below, with the');
  console.log('  masses they never printed. Under the retired gate every one of these axes was INVISIBLE to');
  console.log('  a reader on its own probe question. It is reported now, which is the whole of sub-step 8.1.');
  for (const b of below) {
    console.log('  ' + b.axis_id.padEnd(8) + b.class.padEnd(12) + 'mass ' + String(b.mass).padEnd(7) +
      'margin ' + String(b.margin).padEnd(8) + 'on [' + b.keys_matched.join(',') + ']');
  }

  if (args.includes('--findings')) {
    console.log('');
    for (const r of rows) {
      console.log('  ' + String(r.id).padEnd(14) + 'f=' + String(r.findings).padEnd(4) +
        'ax=' + String(r.axes).padEnd(3) + 'app=' + (r.app_resolves ? (r.app_form || 'y') : '-').padEnd(7) +
        'ex=' + String(r.exclusions).padEnd(3) + 'tp=' + String(r.thin).padEnd(3) +
        'sh=' + String(r.shelf).padEnd(3) + r.question.slice(0, 60));
    }
  }

  console.log('');
  const allFail = failures.concat(badProofs.map(p => ({ where: 'closed-set probe', error: p.name + ': ' + p.why })));
  if (allFail.length) {
    for (const f of allFail.slice(0, 40)) console.error('FAIL  ' + f.where + '  ' + f.error);
    if (allFail.length > 40) console.error('... and ' + (allFail.length - 40) + ' more');
    console.error('CLOSE CONDITION NOT MET: ' + allFail.length + ' violation(s).');
    process.exit(1);
  }
  console.log('CLOSE CONDITION MET: every report is well-formed and states its own weight, its failure');
  console.log('modes and a confidence with a reason on every finding; every question either yielded');
  console.log('findings or DECLARED that it did not; the closed six survived ' + proofs.length + ' probes against the');
  console.log('assertions that guard them; and no report anywhere carries a verdict, a reason_code or a');
  console.log('mode field at any depth.');
  console.log('NOT MEASURED HERE, AND NOT MEASURABLE: agreement with the labelled column (the old 11/14),');
  console.log('one-verdict-per-question, and mode exclusivity. All three were assertions about a decision');
  console.log('this program no longer makes. See the header of this file.');
  process.exit(0);
}

if (require.main === module) main();
module.exports = { run, discover, readTsvQuestions, readMarkdownQuestions, registerProbes,
                   checkWellFormed, closedSetProbes, reachability, axesBelowTheirOwnProbe };
