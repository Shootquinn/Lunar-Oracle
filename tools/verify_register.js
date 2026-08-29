#!/usr/bin/env node
/* verify_register.js -- sub-step 5.1, Check B. The check on the TEAM DELIVERABLE.
 *
 * Specified at `cr_scratch/step0_software_engineer_loop.md` §4.3, and the governing principle is
 * the report generator's, which is already this project's law:
 *
 *   "An instruction telling a model to flag what it cannot source is a behavioural request, and
 *    this project's record says a behavioural request is not a control. So the control is a check
 *    that runs after generation, over the bytes that were produced."
 *
 * DO NOT CHECK FOR THEATER. CHECK THE STRUCTURAL SIGNATURES OF THEATER. A stylistic linter for
 * AI-isms is a known losing game: you cannot regex "performative rigor", and a checker that tries
 * produces false positives at a rate that gets it switched off within a week. A check that gets
 * switched off is worse than no check, because the plan still lists it. So three assertions,
 * ascending in value, each mechanical and countable.
 *
 *   B1  Every claim-bearing sentence carries a trace.       The highest-yield check in the project.
 *   B2  Self-referential subjects, COUNTED with a denominator, not gated.   A smoke detector.
 *   B3  Every trace grade is one of three. Anything else is a FAIL, not a warning.  Real teeth.
 *
 * B1'S OWN REASONING IS WORTH RESTATING: a fabricated sentence does not arrive with a broken
 * reference, it arrives with NO reference at all, and a forward-only check passes it. This is the
 * backward half.
 *
 * THE THREE LISTS ARE READ OUT OF THE APP, NOT TYPED INTO THIS FILE. Contract §7: "a unit is
 * claim-bearing if it holds a numeral, a unit token, a coefficient name, or a named source. The
 * last three lists are read out of the app rather than typed into a checker." So the coefficient
 * names are `KNOB_DATA.CONFIG`'s own keys and the named sources are `KNOB_DATA.REFERENCES`'s own
 * keys and author surnames, both at run time. A typed copy would drift from the app the moment a
 * coefficient was renamed, and the check would then pass the sentence it was built to catch.
 *
 * B2 IS DELIBERATELY WEAK AND IS NOT A GATE. Its output is a number a human reads. A gate here
 * would be tuned into uselessness within a month.
 *
 *   node tools/verify_register.js <deliverable.md> [...]
 *   node tools/verify_register.js --lists            print the three lists and where each came from
 *   node tools/verify_register.js --prove
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process'), os = require('os');
const ROOT = path.resolve(__dirname, '..');
const R = p => path.join(ROOT, p);
const APP = 'lsei/index.html';

/* ------------------------------------------------------- the closed sets */
/* Contract §2, three grades, closed. §4.3 B3's blacklist of six is the same set complemented, and
 * both are stated here because this file is the only consumer and a copy in the suite would be the
 * second authority LIM-7 forbids. */
const GRADES = ['recompute-verified', 'resolution-only', 'refused'];
const FAKE_GRADES = ['verified', 'confirmed', 'validated', 'proven', 'established', 'supported'];
/* §4.3 B2's closed list, plus whatever The Editor's prohibition adds. Read from the prohibition
 * file when it is on disk, so the two do not drift; the seed list here is §4.3's own. */
const SEED_SELFREF = ['this analysis', 'this answer', 'it is worth noting', 'importantly',
  'rigorously', 'carefully', 'notably', 'it should be noted', 'this report', 'this assessment',
  'we can see that', 'as we have seen', 'thoroughly', 'comprehensively'];
const EXEMPT = '<!-- not app-derived -->';

/* --------------------------------------------- read the lists off the app */
let APP_LISTS = null;
function appLists() {
  if (APP_LISTS) return APP_LISTS;
  let coefficients = [], sources = [], why = 'read from ' + APP + ' at run time';
  try {
    const { loadModelAPI } = require(R('lsei/oracle/lib/app_model.js'));
    const api = loadModelAPI(R(APP));
    coefficients = Object.keys(api.CONFIG || {});
    const refs = api.REFERENCES || {};
    // A reference KEY (`colaprete-2010`) is unambiguous. A bare surname is not: `Li` and `Ye` occur
    // as ordinary words, so a surname enters the list only at five characters or more. That is a
    // stated under-selection and it is the one place this file under-selects rather than over-
    // selects, because a false positive here lands on a sentence a person then has to argue about.
    const names = new Set(Object.keys(refs));
    for (const r of Object.values(refs)) {
      const first = String(r.authors || '').split(',')[0].trim();
      if (first.length >= 5 && /^[A-Z][A-Za-z'-]+$/.test(first)) names.add(first);
    }
    sources = [...names];
  } catch (e) {
    why = 'THE APP COULD NOT BE READ (' + e.message.slice(0, 80) + ')';
    APP_LISTS = { coefficients, sources, units: [], why, ok: false };
    return APP_LISTS;
  }
  /* Units are the one list the app does not hold as a list: `KNOB_DATA` carries values and labels,
   * not a unit vocabulary. They are declared here and asserted against the corpus by `--lists`, on
   * the same rule the ISRU check uses -- a closed list nothing can trip is decoration. */
  const units = ['kwh', 'kw', 'kg', 'kilogram', 'tonne', 'tonnes', 'mt', 'wt%', 'percent', '%',
    'per year', 'per kg', 'per kilogram', 'g/kwh', 'mj/kg', 'kwe', 'km', 'metre', 'meter', 'year',
    'years', 'usd', 'dollars', '$/kg', 'k$', 'w/kg', 'trl'];
  APP_LISTS = { coefficients, sources, units, why, ok: true };
  return APP_LISTS;
}

/* --------------------------------------------------------------- parsing */
function sentences(text) {
  const out = [];
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  lines.forEach((line, i) => {
    const t = line.trim();
    if (!t) return;
    for (const s of t.split(/(?<=[.!?])\s+(?=[A-Z(\[])/)) if (s.trim()) out.push({ text: s.trim(), line: i });
  });
  return out;
}
const isTrace = s => /^Trace \(/.test(s.trim());
const isLimit = s => /^LIMIT:/.test(s.trim());
const isTransfer = s => /^Transfer \(/.test(s.trim());

function claimBearing(sentence, L) {
  const why = [];
  if (/\b[0-9]+([.,][0-9]+)?\b/.test(sentence)) why.push('numeral');
  const lc = ' ' + sentence.toLowerCase().replace(/[^a-z0-9%$/. ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  for (const u of L.units) if (lc.includes(' ' + u + ' ') || lc.includes(u + ' ')) { why.push('unit "' + u + '"'); break; }
  for (const c of L.coefficients) if (new RegExp('\\b' + c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(sentence)) { why.push('coefficient "' + c + '"'); break; }
  for (const s of L.sources) if (sentence.includes(s)) { why.push('named source "' + s + '"'); break; }
  return why;
}

/* ------------------------------------------------------------------ check */
function check(text) {
  const L = appLists();
  const S = sentences(text);
  const findings = [], reports = [];

  /* B1. Every claim-bearing sentence carries a trace. A trace on the sentence's own line or on the
   * next non-blank line satisfies it, which is the prototype's own convention: claim, then trace. */
  const units = [], exempted = [];
  for (let i = 0; i < S.length; i++) {
    const s = S[i];
    if (isTrace(s.text) || isLimit(s.text) || isTransfer(s.text)) continue;   // fixed grammar, not prose
    const why = claimBearing(s.text, L);
    if (!why.length) continue;
    const exempt = s.text.includes(EXEMPT) || (S[i - 1] && S[i - 1].text.includes(EXEMPT));
    const traced = isTrace((S[i + 1] || {}).text || '') || /Trace \(/.test(s.text) ||
      isTrace((S[i + 2] || {}).text || '');
    units.push({ s, why, traced, exempt });
    if (exempt) exempted.push(s);
    else if (!traced) findings.push('B1: claim-bearing (' + why.join(', ') + ') and carries no trace: ' +
      JSON.stringify(s.text.slice(0, 110)));
  }
  /* THE ALL-EXEMPT FAILURE CASE, from §4.3 B1. A deliverable in which every claim-bearing unit is
   * exempted has not passed B1; it has switched B1 off, one comment at a time. */
  if (units.length && exempted.length === units.length)
    findings.push('B1: ALL ' + units.length + ' claim-bearing unit(s) carry the ' + EXEMPT +
      ' exemption. A deliverable that exempts every unit has not passed this check, it has disabled it');

  /* B2. Counted with its denominator. NOT A GATE. */
  const selfref = selfRefList();
  const lc = ' ' + text.toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  const hits = [];
  for (const p of selfref) { const n = lc.split(' ' + p + ' ').length - 1; if (n) hits.push({ p, n }); }
  const selfrefTotal = hits.reduce((a, b) => a + b.n, 0);
  reports.push('B2: ' + selfrefTotal + ' self-referential subject(s) over ' + S.length +
    ' sentence(s), against a closed list of ' + selfref.length +
    (hits.length ? ': ' + hits.map(h => h.p + ' x' + h.n).join(', ') : '') +
    '. REPORTED WITH ITS DENOMINATOR, never gated: a gate here would be tuned into uselessness within a month');

  /* B3. Real teeth, and it is cheap: a closed set of three strings and a blacklist of six. */
  const traceLines = S.filter(s => isTrace(s.text));
  for (const s of traceLines) {
    const m = s.text.match(/^Trace \(([^)]*)\)/);
    const cells = m ? m[1].split(',').map(x => x.trim()) : [];
    const grade = cells.find(c => GRADES.includes(c));
    if (!grade) {
      const fake = cells.find(c => FAKE_GRADES.includes(c));
      findings.push('B3: trace carries ' + (fake ? 'the grade word "' + fake + '", which is outside the closed three'
        : 'no grade from {' + GRADES.join(', ') + '}') + ': ' + JSON.stringify(s.text.slice(0, 110)));
    }
    const extra = cells.filter(c => GRADES.includes(c));
    if (extra.length > 1) findings.push('B3: trace carries ' + extra.length + ' grades; contract §2 says exactly one: ' + JSON.stringify(s.text.slice(0, 90)));
  }
  // A grade word from the blacklist anywhere a trace-like claim is made, not only inside `Trace (`.
  for (const s of S) {
    if (isTrace(s.text)) continue;
    for (const f of FAKE_GRADES) {
      if (new RegExp('\\b' + f + '\\b', 'i').test(s.text) && /\.md\b|\bTrace\b|\bcitation\b|\bsource\b/i.test(s.text))
        findings.push('B3: "' + f + '" used as a grade outside a trace line: ' + JSON.stringify(s.text.slice(0, 100)));
    }
  }

  return { sentences: S.length, units, traceLines: traceLines.length, findings, reports, lists: L };
}

let SELFREF = null;
function selfRefList() {
  if (SELFREF) return SELFREF;
  const set = new Set(SEED_SELFREF);
  // The Editor owns the additions at 0.4; read them rather than transcribe them.
  const f = R('cr_scratch/step0_editor_prohibition.md');
  if (fs.existsSync(f)) {
    const t = fs.readFileSync(f, 'utf8');
    for (const m of t.matchAll(/`([a-z][a-z ,']{4,40})`/g)) {
      const p = m[1].trim();
      if (/^(this|it is|as we|we can|the analysis|the assessment)/.test(p)) set.add(p);
    }
  }
  return (SELFREF = [...set]);
}

/* ------------------------------------------------------------------ report */
function report(label, r) {
  const W = s => process.stdout.write(s + '\n');
  W('VERIFY REGISTER  ' + label);
  W('  sentences              ' + r.sentences);
  W('  claim-bearing units    ' + r.units.length + '  (' + r.units.filter(u => u.traced).length + ' traced, ' +
    r.units.filter(u => u.exempt).length + ' exempted)');
  W('  trace lines            ' + r.traceLines);
  W('  lists read from app    coefficients ' + r.lists.coefficients.length + ', named sources ' +
    r.lists.sources.length + ' -- ' + r.lists.why);
  if (!r.units.length && !r.traceLines) {
    W('');
    W('  EMPTY POPULATION: this deliverable carries no claim-bearing sentence and no trace line.');
    W('  Reported as empty, NEVER as a pass. B1 over zero units is vacuously true and an empty');
    W('  list must never read as a clean one.');
    W('');
    W('RESULT  EMPTY (not a pass)');
    return r;
  }
  for (const x of r.reports) W('  note   ' + x);
  for (const x of r.findings) W('  FAIL   ' + x);
  W('');
  W('LIMIT   this catches the STRUCTURAL SIGNATURE of theater. It does not catch theater. A');
  W('        deliverable can pass all three assertions and still narrate its own honesty in prose');
  W('        carrying no numerals, no self-referential subject from the closed list, and no trace');
  W('        lines at all. Only The Editor\'s read, or the author\'s, closes that gap. The check');
  W('        makes the cheap failures impossible and the expensive one visible; it does not make');
  W('        it impossible. Saying so here is the difference between a control and a claim.');
  W('');
  W(r.findings.length ? 'RESULT  FAIL, ' + r.findings.length + ' finding(s)' : 'RESULT  PASS');
  return r;
}

/* ------------------------------------------------------------------ proof */
const PRODUCER = 'lsei/oracle/answer_question.js';
function produce(question) {
  const log = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'vr-prove-')), 'run.jsonl');
  const cmd = 'node "' + R(PRODUCER) + '" ' + JSON.stringify(question) +
    ' --app=lsei/index.html --lit=literature --log="' + log.replace(/\\/g, '/') + '"';
  try { return cp.execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { return (e.stdout || '') + (e.stderr || ''); }
}
/* THE DELIVERABLE, NOT THE TRANSCRIPT -- and the first draft of this proof got it wrong, which is
 * worth recording rather than quietly fixing. The prototype prints a TRANSCRIPT to stdout: a
 * question echo, a `SUB-CLAIMS  (1)` header, a routing verdict, then the answer. Run against the
 * whole transcript, B1 correctly fires on `SUB-CLAIMS  (1)` and on the echoed question, because
 * both carry numerals and neither carries a trace. The checker was right and the input was wrong.
 *
 * Contract §6 settles it: "Every deliverable is a file, without exception." The bytes this check
 * runs over are the deliverable's, and the deliverable is the answer body. The prototype predates
 * that clause and writes no file, so the proof slices the body out of the transcript at the
 * `--- sub-claim` rule the prototype itself prints. That is a property of the PROTOTYPE, not of
 * this checker, and it is the reason 3.9's composition path writes a file rather than a stream. */
function deliverable(transcript) {
  const i = transcript.indexOf('--- sub-claim');
  if (i < 0) return transcript;
  const body = transcript.slice(i);
  return body.split('\n').filter(l => !/^--- sub-claim/.test(l)).join('\n');
}
function bytesChanged(a, b) {
  const n = Math.min(a.length, b.length); let d = Math.abs(a.length - b.length);
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) d++;
  return d + ' byte position(s) differ, length delta ' + (b.length - a.length);
}

function prove() {
  const out = [];
  const add = (id, expect, got, pass) => out.push({ id, expect, got, pass });
  const L = appLists();
  add('LISTS-FROM-THE-APP', 'coefficient names and named sources are read out of ' + APP + ', not typed here',
    L.coefficients.length + ' coefficients, ' + L.sources.length + ' named sources -- ' + L.why,
    L.ok && L.coefficients.length > 5 && L.sources.length > 20);

  /* THE PRODUCER. Every decoy below mutates bytes this program wrote. */
  const app = deliverable(produce('What is water output under Agency Led Baseline in 2040?'));
  const lit = deliverable(produce('How much ice is in Cabeus?'));
  add('PRODUCER-RAN', 'two real answers, one APP and one LITERATURE, each carrying a trace line',
    app.length + '/' + lit.length + ' bytes, ' + ((app + lit).match(/Trace \(/g) || []).length + ' trace lines',
    /Trace \(/.test(app) && /Trace \(/.test(lit));
  if (!/Trace \(/.test(app)) { process.stdout.write('FAIL  PRODUCER-RAN  refusing to build decoys on a stand-in\n'); process.exit(1); }

  /* CONTROL. Real produced answers pass all three. */
  for (const [id, t] of [['APP', app], ['LITERATURE', lit]]) {
    const r = check(t);
    add('CONTROL-' + id, 'a real produced answer passes B1, B2 and B3',
      r.units.length + ' claim-bearing unit(s), ' + r.findings.length + ' finding(s)' + (r.findings[0] ? ': ' + r.findings[0].slice(0, 100) : ''),
      r.findings.length === 0);
  }

  /* B1, and it is the discriminating one. Delete the trace line and leave the claim standing. This
     is the shape of a fabricated sentence: not a broken reference, NO reference. */
  const noTrace = lit.replace(/^Trace \(.*$/m, '');
  add('MUTATION-APPLIED / delete the trace', 'the mutation changed the bytes',
    noTrace === lit ? 'DECOY DID NOT APPLY' : bytesChanged(lit, noTrace), noTrace !== lit);
  const rb1 = check(noTrace);
  add('DECOY-B1-CLAIM-WITHOUT-TRACE', 'B1 fires on a claim-bearing sentence left with no trace beside it',
    rb1.findings.filter(f => /^B1/.test(f)).length + ' B1 finding(s)', rb1.findings.some(f => /^B1/.test(f)));

  /* The all-exempt failure case. Exempting every unit is not passing B1. */
  // Exempt EVERY claim-bearing line, not one: the failure case is a deliverable that has switched
  // B1 off one comment at a time, so a partial exemption does not exercise it.
  const allExempt = noTrace.split('\n').map(l => (claimBearing(l, L).length && !/^Trace \(|^LIMIT:/.test(l.trim()) && l.trim()) ? l + ' ' + EXEMPT : l).join('\n');
  add('MUTATION-APPLIED / exempt every unit', 'the mutation changed the bytes',
    allExempt === noTrace ? 'DECOY DID NOT APPLY' : bytesChanged(noTrace, allExempt), allExempt !== noTrace);
  const rex = check(allExempt);
  add('DECOY-B1-ALL-EXEMPT', 'a deliverable exempting every claim-bearing unit fails rather than passes',
    rex.findings.filter(f => /ALL /.test(f)).length + ' all-exempt finding(s) over ' + rex.units.length + ' unit(s)',
    rex.findings.some(f => /ALL /.test(f)));

  /* B3. The six blacklisted words, one decoy each, on a real trace line. */
  for (const f of FAKE_GRADES) {
    const d = lit.replace(/Trace \(citation, resolution-only\)/, 'Trace (citation, ' + f + ')');
    add('MUTATION-APPLIED / grade "' + f + '"', 'the mutation changed the bytes',
      d === lit ? 'DECOY DID NOT APPLY' : 'applied', d !== lit);
    const r = check(d);
    add('DECOY-B3-' + f.toUpperCase(), 'B3 fires: "' + f + '" is a FAIL, not a warning',
      r.findings.filter(x => /^B3/.test(x)).length + ' B3 finding(s)', r.findings.some(x => /^B3/.test(x)));
  }
  /* B3, the recompute case: an app trace relabelled to a shelf-legal grade is NOT caught by the
     blacklist, and is caught by the closed set. The pair is what proves the set is the control. */
  const twoGrades = app.replace(/Trace \(scalar, recompute-verified\)/, 'Trace (scalar, recompute-verified, resolution-only)');
  const rt = check(twoGrades);
  add('DECOY-B3-TWO-GRADES', 'contract §2 says a trace line carries exactly one grade',
    rt.findings.filter(x => /exactly one/.test(x)).length + ' finding(s)', rt.findings.some(x => /exactly one/.test(x)));

  /* B2 is counted, never gated. The proof is that it does not change the verdict. */
  // Added as its own line, so B2's count moves and B1's does not: the point is that B2 reports.
  const chatty = 'It is worth noting that this analysis proceeded carefully.\n' + lit;
  add('MUTATION-APPLIED / self-referential prose', 'the mutation changed the bytes',
    chatty === lit ? 'DECOY DID NOT APPLY' : bytesChanged(lit, chatty), chatty !== lit);
  const rb2 = check(chatty);
  const counted = (rb2.reports.find(x => /^B2/.test(x)) || '').match(/^B2: ([0-9]+)/);
  add('B2-COUNTS-AND-DOES-NOT-GATE', 'B2 reports a count with its denominator and does not change the verdict',
    'counted ' + (counted ? counted[1] : '?') + '; findings ' + rb2.findings.length,
    !!counted && Number(counted[1]) > 0 && rb2.findings.length === 0);

  /* The claim-bearing definition is the app's, and a coefficient rename must move it. */
  const coeffSentence = 'The captureEff term governs this.';
  add('CLAIM-BEARING-READS-THE-APP', 'a sentence naming an app coefficient is claim-bearing because CONFIG names it',
    JSON.stringify(claimBearing(coeffSentence, L)), claimBearing(coeffSentence, L).some(w => /coefficient/.test(w)));
  add('CLAIM-BEARING-NAMED-SOURCE', 'a sentence naming a REFERENCES author is claim-bearing',
    JSON.stringify(claimBearing('Colaprete reports the plume figure.', L)),
    claimBearing('Colaprete reports the plume figure.', L).some(w => /named source/.test(w)));

  const w = Math.max(...out.map(o => o.id.length));
  let bad = 0;
  for (const o of out) { if (!o.pass) bad++; process.stdout.write((o.pass ? 'PASS  ' : 'FAIL  ') + o.id.padEnd(w) + '  expected ' + o.expect + '  |  got ' + o.got + '\n'); }
  const applied = out.filter(o => /^MUTATION-APPLIED/.test(o.id));
  process.stdout.write('\nmutations written ' + applied.length + ', mutations observed to apply ' + applied.filter(o => o.pass).length +
    '. A decoy that fails to apply is a FAILURE, not a skip (INV-11).\n');
  process.stdout.write((out.length - bad) + ' of ' + out.length + ' proofs pass\n');
  process.exit(bad ? 1 : 0);
}

/* ------------------------------------------------------------------ entry */
if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv[0] === '--prove') prove();
  else if (argv[0] === '--lists') {
    const L = appLists();
    process.stdout.write('claim-bearing lists, ' + L.why + '\n');
    process.stdout.write('  coefficient names (' + L.coefficients.length + ', KNOB_DATA.CONFIG keys): ' + L.coefficients.join(' ') + '\n');
    process.stdout.write('  named sources (' + L.sources.length + ', KNOB_DATA.REFERENCES keys + surnames >= 5 chars)\n');
    process.stdout.write('  unit tokens (' + L.units.length + ', declared here; the app holds no unit vocabulary)\n');
    process.stdout.write('  trace grades (3, closed): ' + GRADES.join(' ') + '\n');
    process.stdout.write('  blacklisted grade words (6): ' + FAKE_GRADES.join(' ') + '\n');
    process.stdout.write('  B2 self-referential subjects (' + selfRefList().length + ', §4.3 B2 + The Editor\'s 0.4 additions)\n');
    process.exit(L.ok ? 0 : 1);
  } else if (!argv.length) {
    process.stderr.write('usage: node tools/verify_register.js <deliverable.md> [...] | --lists | --prove\n');
    process.exit(2);
  } else {
    let findings = 0;
    for (const f of argv) { const r = report(f, check(fs.readFileSync(f, 'utf8'))); findings += r.findings.length; }
    process.exit(findings ? 1 : 0);
  }
}

module.exports = { GRADES, FAKE_GRADES, EXEMPT, appLists, sentences, claimBearing, selfRefList, check };
