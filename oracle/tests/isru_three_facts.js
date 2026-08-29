#!/usr/bin/env node
/* isru_three_facts.js -- sub-step 4.7 (LUNAR-6). The three-named-facts assertion.
 *
 * THE RULE, from `cr_scratch/step0_space_resources_engineer_question_surface.md` sec.6 R5,
 * verbatim: "For any answer carrying a quantitative ISRU figure, three facts must be named: the
 * system boundary, the scale, and the maturity. Extraction only or integrated. Bench kilograms or
 * tonnes per year. Measured, modelled, or assumed."
 *
 * R5's own closing sentence is why this file exists rather than a preference: "That is a
 * machine-checkable assertion and it is the whole of the discipline." A rule that is machine
 * checkable and is not machine checked is a preference wearing a rule's clothes.
 *
 * WHAT IS DECIDABLE HERE AND WHAT IS NOT.
 *   DECIDABLE  whether a numeral sits next to a unit token from a closed list; whether a token
 *              from each of three closed lists appears in the sentence carrying that figure or in
 *              the one after it; whether a TRL numeral has a trace beside it.
 *   NOT        whether the boundary named is the RIGHT boundary for that figure. A sentence
 *              reading "1.3 kWh/kg, integrated, tonnes per year, measured" names three facts and
 *              names three wrong ones. This file cannot see that and does not claim to. R2 -- that
 *              where a demonstrated figure exists it is the answer and the modelled figure is
 *              context -- is a person's read and is carried in the suite as an `H` row, not here.
 *
 * SCOPE IS THE SENTENCE, PLUS ONE LOOKAHEAD, NEVER THE ANSWER. This is the whole design decision
 * and it is worth the paragraph. R5 says "for any answer carrying a quantitative ISRU figure",
 * and an answer-wide scope is the weaker reading: an answer carrying an extraction-only modelled
 * figure and an integrated measured one satisfies an answer-wide check with one facts block, and
 * the reader cannot tell which figure it belongs to. That is exactly the LCC-04 case, which sec.6
 * names as where R5 binds hardest -- four figures whose difference IS the boundary and the
 * maturity. So the scope is the figure-bearing sentence and the sentence immediately after it
 * (R1's worked example puts the facts inside the sentence; a following sentence is the common
 * legitimate variant). ISR-8 is the decoy that proves the scope is not answer-wide.
 *
 * THE UNIT LIST OVER-SELECTS, DELIBERATELY, and that posture is the answer contract's own sec.7:
 * "a unit wrongly called claim-bearing costs one trace, and a unit wrongly excused costs the whole
 * control." A figure wrongly called ISRU costs three tokens in a sentence. A figure wrongly
 * excused costs the discipline.
 *
 * THE LISTS ARE ASSERTED AGAINST THE CORPUS, not merely declared. ISR-2 requires every unit token
 * to occur at least once under `literature/`. A closed list nothing can trip is decoration, and
 * this project has already shipped one closed list whose members occurred nowhere.
 *
 *   node oracle/tests/isru_three_facts.js <answer-file> [<answer-file> ...]
 *   node oracle/tests/isru_three_facts.js --prove
 *   node oracle/tests/isru_three_facts.js --units          print the three lists and their corpus counts
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process'), os = require('os');
const FSW = require('../../tools/fswalk.js');
const ROOT = path.resolve(__dirname, '..', '..');
const R = p => path.join(ROOT, p);

/* ------------------------------------------------------------------ lists */
/* Every token below was taken from a figure that occurs in this corpus, not invented. The
 * provenance is named per token so that a later reader can delete one without guessing. */
const UNITS = [
  'kwh/kg',            // LCC-04 side A, sowers-2019
  'kwh per kg',        // sec.6 R1's worked example
  'kwh per kilogram',  // sec.6 R5
  'g/kwh',             // LCC-04 side B, kiewiet-2026 measured
  'w.h/g',             // LCC-04 side C, wang-2025
  'wt%',               // ice grade, LCC-01 and LCC-04 both
  'wt %',
  'kg/day',            // kiewiet-2026 equivalent continuous production
  'kg per run',        // kiewiet-2026 scale
  'kg/h',              // recovery rate
  'g/h',
  't/yr',              // sowers-2019 plant scale
  'tonnes per year',
  'kg/hr',
  'kwh/kg o2',         // oxygen-side specific energy, LCC-07
];
const BOUNDARY = [
  'extraction only', 'extraction-only', 'integrated', 'end-to-end', 'end to end',
  'through liquefaction', 'capture and liquefaction', 'extraction and capture',
  'extraction, capture', 'system boundary', 'capture included', 'excluding capture',
];
const SCALE = [
  'bench', 'per run', 'per year', 't/yr', 'tonnes per year', 'pilot', 'laboratory',
  'lab scale', 'bench scale', 'plant scale', 'full scale', 'kg per run', 'kg/day',
];
const MATURITY = [
  'measured', 'modelled', 'modeled', 'assumed', 'demonstrated', 'trl', 'concept level',
  'derived', 'simulated', 'bench demonstration', 'as-built',
];
const FACTS = { boundary: BOUNDARY, scale: SCALE, maturity: MATURITY };

/* ------------------------------------------------------------------ parse */
/* Sentence splitting is a heuristic and is stated as one. A figure that straddles a split is seen
 * by the lookahead, which is half of why the lookahead exists. */
function sentences(text) {
  const flat = text.replace(/\r\n/g, '\n');
  const out = [];
  for (const line of flat.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    // A trace line and a LIMIT line are fixed grammar, not prose, and neither carries a figure the
    // three facts apply to. They are still SPLIT here rather than dropped, so that a figure hidden
    // inside one is seen rather than excused.
    for (const s of t.split(/(?<=[.!?])\s+(?=[A-Z(\[])/)) if (s.trim()) out.push(s.trim());
  }
  return out;
}
const lc = s => s.toLowerCase();
// A numeral adjacent to a unit token: the numeral must be within 24 characters before the unit, so
// "22.88 to 66.33 g/kWh" fires and "the g/kWh column" does not.
function figureHits(sentence) {
  const s = lc(sentence);
  const hits = [];
  for (const u of UNITS) {
    let i = 0;
    while ((i = s.indexOf(u, i)) >= 0) {
      const before = s.slice(Math.max(0, i - 24), i);
      if (/[0-9]/.test(before)) hits.push(u);
      i += u.length;
    }
  }
  return [...new Set(hits)];
}
const namesFact = (s, list) => list.filter(t => lc(s).includes(t));

/* ------------------------------------------------------------------ check */
/* One record per figure-bearing sentence. `missing` is the finding; an empty `missing` is clean. */
function check(text) {
  const S = sentences(text);
  const figures = [];
  for (let i = 0; i < S.length; i++) {
    const units = figureHits(S[i]);
    if (!units.length) continue;
    const scope = S[i] + ' ' + (S[i + 1] || '');
    const named = {}, missing = [];
    for (const k of Object.keys(FACTS)) {
      named[k] = namesFact(scope, FACTS[k]);
      if (!named[k].length) missing.push(k);
    }
    figures.push({ index: i, sentence: S[i], units, named, missing });
  }
  /* R4, a separate finding with a separate owner. Sec.6 R4, verbatim: "A TRL number is sourced or
   * absent... Every TRL claim the Oracle makes resolves to it [the corpus's one TRL sheet] or to a
   * primary that states its own maturity, and any answer quoting it names the date."
   *
   * Mechanized in the only form decidable from bytes: a TRL numeral anywhere in the answer requires
   * the answer to carry at least one locator that RESOLVES ON DISK to a file which itself contains
   * the string `TRL`, and whose leaf carries a four-digit year. The year requirement is R4's date
   * clause and it is free -- NAMING.md already puts the year in the leaf, so "names the date" costs
   * the answer nothing beyond citing the right file.
   *
   * A PROXIMITY CHECK ON THE WORD "Trace" WOULD PASS THE FAILURE R4 NAMES. A TRL numeral sitting
   * beside a trace that resolves to a file with no TRL content anywhere in it is exactly the
   * fabricated measurement wearing a number, and it is the common case rather than the exotic one:
   * every literature answer this router emits carries a trace, so proximity is satisfied by
   * construction and asserts nothing. The locator has to be opened. */
  const locators = [...text.matchAll(/([A-Za-z0-9_\-\/]+\.md)\b/g)].map(m => m[1]);
  const support = [];
  for (const loc of [...new Set(locators)]) {
    const abs = R(loc);
    if (!fs.existsSync(abs)) continue;
    if (!/\b(19|20)[0-9]{2}\b/.test(path.basename(loc))) continue;
    if (!/TRL/.test(fs.readFileSync(abs, 'utf8'))) continue;
    support.push(loc);
  }
  const trl = [];
  for (let i = 0; i < S.length; i++) {
    if (!/\btrl\s*-?\s*[0-9]/i.test(S[i])) continue;
    trl.push({ index: i, sentence: S[i], traced: support.length > 0, support: support.slice() });
  }
  const findings = figures.filter(f => f.missing.length).length + trl.filter(t => !t.traced).length;
  return { sentences: S.length, figures, trl, findings };
}

/* ------------------------------------------------------------------ report */
function report(label, r) {
  const W = s => process.stdout.write(s + '\n');
  W('ISRU THREE NAMED FACTS  ' + label);
  W('  sentences read         ' + r.sentences);
  W('  ISRU figures found     ' + r.figures.length);
  if (!r.figures.length && !r.trl.length) {
    W('');
    W('  EMPTY POPULATION: this text carries no quantitative ISRU figure and no TRL numeral, so');
    W('  R5 has nothing to bind to here. Reported as empty, NEVER as a pass. An answer that names');
    W('  no figure has not satisfied the discipline; it has not engaged it.');
    W('');
    W('RESULT  EMPTY (0 findings over a population of 0 -- not a pass)');
    return r;
  }
  for (const f of r.figures) {
    const ok = f.missing.length === 0;
    W((ok ? '  ok    ' : '  FAIL  ') + 'figure [' + f.units.join(', ') + '] sentence ' + f.index);
    W('        ' + f.sentence.slice(0, 150));
    for (const k of Object.keys(FACTS)) {
      W('          ' + k.padEnd(9) + (f.named[k].length ? 'named: ' + f.named[k].join(', ') : 'NOT NAMED'));
    }
  }
  for (const t of r.trl) {
    W((t.traced ? '  ok    ' : '  FAIL  ') + 'R4 TRL numeral sentence ' + t.index +
      (t.traced ? ' is supported by ' + t.support.join(', ')
        : ' is UNSOURCED -- no locator in this answer resolves to a dated file containing TRL'));
  }
  W('');
  W('LIMIT   this checks that three facts are NAMED. It does not check that they are the right');
  W('        three for that figure: "1.3 kWh/kg, integrated, tonnes per year, measured" names');
  W('        three facts and names three wrong ones. R2 -- prefer the demonstrated figure -- is a');
  W('        person\'s read and is carried in the suite as an H row, not here.');
  W('');
  W(r.findings === 0 ? 'RESULT  PASS (' + r.figures.length + ' figure(s), 0 findings)' : 'RESULT  FAIL, ' + r.findings + ' finding(s)');
  return r;
}

/* ------------------------------------------------------------ corpus check */
/* ISR-2. Every unit token occurs at least once under literature/. A token nothing can trip is
 * decoration, and the list is the trigger for the whole check. */
function unitCoverage(tree) {
  const dir = R(tree || 'literature');
  /* W5-11: routed through tools/fswalk.js. `e.isDirectory()` is false for a reparse-pointed
     directory, and a pruned taxonomy folder here turns every unit token that only occurs in that
     folder into a zero -- reported as "this token is decoration", which is a wrong answer arrived
     at cleanly. The vacuity guard below is what stops the whole check going quiet. */
  const files = FSW.walk(dir, p => /\.md$/i.test(p), [], { skipDir: n => n === '_pdf' });
  const counts = {};
  for (const u of UNITS) counts[u] = 0;
  for (const p of files) {
    const t = lc(fs.readFileSync(p, 'utf8'));
    for (const u of UNITS) if (t.includes(u)) counts[u]++;
  }
  /* VACUITY, W5-11. Over zero files every token is dead, so this check already FAILS rather than
     going quiet -- which is the right verdict reached for the wrong reason, and a reader told
     "37 tokens occur nowhere" will go looking for 37 bad tokens instead of one missing corpus.
     `vacuous` makes the walk's own emptiness the headline. It changes no pass/fail: an empty
     population failed before this line existed and fails after it. */
  return {
    files: files.length, counts, vacuous: files.length === 0,
    dead: UNITS.filter(u => counts[u] === 0),
  };
}

/* ------------------------------------------------------------------ proof
 *
 * THE PRODUCER IS REAL AND SO IS THE OUTPUT. `lsei/oracle/answer_question.js` is the prototype
 * router; it runs, and it emits real answers against the real corpus. Every artifact below starts
 * as bytes that program wrote. Where a compliant answer is needed -- and no producer on disk emits
 * one yet, because the composition path is 3.9 and is not built -- the compliant sentence is
 * SPLICED IN FROM A REAL MEMBER SUMMARY (`kiewiet-2026-luwex-water-extraction.md`, LCC-04 side B),
 * which is a mutation of real produced output using real corpus bytes. It is never a string this
 * file composed. That is the house rule from `verify_figure.js`: a proof run against a hand-built
 * stand-in returns a false green, and only a mutation of the real artifact discriminates.
 *
 * EVERY MUTATION IS ASSERTED TO HAVE APPLIED before its red is asserted (INV-11). A decoy that
 * fails to apply is a FAILURE here, not a skip -- it is reported as `DECOY DID NOT APPLY` and it
 * fails the run. A mutation that changed no bytes proves nothing, and a proof harness that scores
 * it as a pass is the exact false green this rule exists to stop.
 */
const PRODUCER = 'lsei/oracle/answer_question.js';
function produce(question) {
  const log = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'isru-prove-')), 'run.jsonl');
  const cmd = 'node "' + R(PRODUCER) + '" ' + JSON.stringify(question) +
    ' --app=lsei/index.html --lit=literature --log="' + log.replace(/\\/g, '/') + '"';
  try { return cp.execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { return (e.stdout || '') + (e.stderr || ''); }
}

// Real bytes, from literature/isru-processing/kiewiet-2026-luwex-water-extraction.md, LCC-04 side
// B. The figure, the boundary, the scale and the maturity are all that file's own.
const COMPLIANT = 'LUWEX measured a recovery energy efficiency of 22.88 to 66.33 g/kWh for an ' +
  'integrated extraction and capture chain at up to 13 kg per run.';
// The second figure, from LCC-04 side C, wang-2025. Its own boundary and maturity differ from
// side B's, which is the entire point of ISR-8.
const SECOND = 'Microwave heating gives 1.9 to 10.0 W.h/g at 800 W.';

// How many bytes differ, plus the length delta. Used by every MUTATION-APPLIED row.
function bytesChanged(a, b) {
  const n = Math.min(a.length, b.length);
  let d = Math.abs(a.length - b.length);
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) d++;
  return d + ' byte position(s) differ, length delta ' + (b.length - a.length);
}

function prove() {
  const out = [];
  const add = (id, expect, got, pass) => out.push({ id, expect, got, pass });

  /* 0. The producer runs and wrote bytes. If it did not, every proof below is vacuous and the run
   *    must say so rather than scoring zero decoys as zero failures. */
  const real = produce('How much energy does it take to extract a kilogram of water from lunar regolith?');
  add('PRODUCER-RAN', 'the real router emitted an answer carrying a trace line',
    real.length + ' bytes, ' + ((real.match(/Trace \(/g) || []).length) + ' trace line(s)',
    real.length > 200 && /Trace \(/.test(real));
  if (!/Trace \(/.test(real)) {
    process.stdout.write('FAIL  PRODUCER-RAN  the producer emitted nothing usable; every decoy below would be built on a stand-in, which this file refuses to do\n');
    process.exit(1);
  }

  /* 1. CONTROL, negative. The real produced literature answer carries no ISRU figure. The checker
   *    must report an EMPTY population, not a pass. This is the row every naive implementation
   *    gets wrong: zero findings over zero figures reads as green. */
  const c0 = check(real);
  add('CONTROL-NO-FIGURE / empty is not pass',
    'the unmutated real answer carries 0 ISRU figures and is reported EMPTY, never PASS',
    c0.figures.length + ' figure(s), ' + c0.findings + ' finding(s)', c0.figures.length === 0);

  /* 2. CONTROL, positive. Splice one real member-summary sentence into the real produced answer. */
  const compliant = real.replace(/\nLIMIT:/, '\n' + COMPLIANT + '\nLIMIT:');
  add('MUTATION-APPLIED / compliant splice', 'the splice changed the bytes',
    compliant === real ? 'DECOY DID NOT APPLY' : '+' + (compliant.length - real.length) + ' bytes',
    compliant !== real);
  const c1 = check(compliant);
  add('CONTROL-COMPLIANT', 'one ISRU figure, all three facts named, 0 findings',
    c1.figures.length + ' figure(s), ' + c1.findings + ' finding(s)' +
    (c1.figures[0] ? ' [' + Object.keys(FACTS).map(k => k + '=' + (c1.figures[0].named[k][0] || 'NONE')).join(' ') + ']' : ''),
    c1.figures.length === 1 && c1.findings === 0);

  /* 3-5. One decoy per fact. Each deletes exactly one token from the compliant bytes. */
  /* Each deletion must remove EVERY token of its fact from the scope, not one of them. The first
   * draft of the boundary decoy deleted only the word "integrated" and left "extraction and
   * capture", which is itself a boundary token; the checker correctly did not fire and the decoy
   * was reported NOT CAUGHT. That is the decoy being wrong rather than the checker, and it is
   * recorded here rather than quietly repaired, because a badly aimed decoy that a later reader
   * re-aims at the checker instead is how a real control gets relaxed. */
  const decoys = [
    ['maturity', /measured /, 'reported ', null, null],
    ['boundary', /integrated extraction and capture chain/, 'chain', null, null],
    ['scale', / at up to 13 kg per run/, '', null, null],
  ];
  for (const [fact, re1, to1, re2, to2] of decoys) {
    let d = compliant.replace(re1, to1);
    if (re2) d = d.replace(re2, to2);
    // Report BYTES CHANGED, never the length delta. A same-length substitution ("measured" ->
    // "reported") has a delta of zero and is a real mutation; a harness that printed the delta
    // would report a genuine decoy as "0 bytes" and invite the next reader to call it a no-op.
    add('MUTATION-APPLIED / delete ' + fact, 'the deletion changed the bytes',
      d === compliant ? 'DECOY DID NOT APPLY' : bytesChanged(compliant, d), d !== compliant);
    const c = check(d);
    const f = c.figures[0];
    add('DECOY-' + fact.toUpperCase() + '-DELETED', 'the figure is flagged, and ' + fact + ' is the fact named missing',
      f ? (f.missing.length ? 'caught, missing: ' + f.missing.join(',') : 'NOT CAUGHT') : 'figure lost -- the deletion broke the trigger, so this decoy tests nothing',
      !!f && f.missing.includes(fact));
  }

  /* 6. The scope decoy. Two figures, one facts block. An answer-wide check passes this and a
   *    per-sentence check does not. This is the proof that the scope decision is load-bearing. */
  const borrow = compliant.replace(/\nLIMIT:/, '\n' + SECOND + '\nLIMIT:');
  add('MUTATION-APPLIED / second figure', 'the second figure was added',
    borrow === compliant ? 'DECOY DID NOT APPLY' : '+' + (borrow.length - compliant.length) + ' bytes',
    borrow !== compliant);
  const cb = check(borrow);
  const second = cb.figures.find(f => f.units.includes('w.h/g'));
  add('DECOY-BORROWED-FACTS / scope is the sentence',
    'the second figure is flagged even though the answer as a whole names all three facts',
    cb.figures.length + ' figure(s); second figure ' + (second ? (second.missing.length ? 'flagged, missing: ' + second.missing.join(',') : 'NOT CAUGHT -- scope leaked to the answer') : 'not detected'),
    !!second && second.missing.length > 0);

  /* 7. The false-positive defence. A real APP answer carries a numeral and no ISRU unit. If this
   *    check taxed every quantitative answer it would be switched off inside a month. */
  const app = produce('What is water output under Agency Led Baseline in 2040?');
  const ca = check(app);
  add('FALSE-POSITIVE-DEFENCE', 'a real APP answer carrying a scalar is not an ISRU figure and draws 0 findings',
    ca.figures.length + ' figure(s), ' + ca.findings + ' finding(s)', ca.figures.length === 0 && ca.findings === 0);

  /* 8. R4, both directions, and the pair is the point. Both texts are real produced answers; both
   *    carry a trace line; both get the same spliced TRL sentence. The ONLY difference is which
   *    file the router's own locator resolves to. A proximity check cannot tell them apart. */
  const TRL_SENTENCE = 'The process sits at TRL 4.';
  const trlAnswer = produce('What is the technology readiness level of lunar water extraction hardware?');
  const trlSupported = trlAnswer.replace(/\nLIMIT:/, '\n' + TRL_SENTENCE + '\nLIMIT:');
  add('MUTATION-APPLIED / TRL onto a TRL-bearing citation', 'the splice changed the bytes',
    trlSupported === trlAnswer ? 'DECOY DID NOT APPLY' : '+' + (trlSupported.length - trlAnswer.length) + ' bytes',
    trlSupported !== trlAnswer);
  const cts = check(trlSupported);
  add('CONTROL-TRL-SOURCED', 'R4 is satisfied: the answer\'s own locator opens a dated file containing TRL',
    cts.trl.length + ' TRL sentence(s), support: ' + (cts.trl[0] ? (cts.trl[0].support.join(', ') || 'NONE') : 'n/a'),
    cts.trl.length === 1 && cts.trl[0].traced);

  const trlBare = real.replace(/\nLIMIT:/, '\n' + TRL_SENTENCE + '\nLIMIT:');
  add('MUTATION-APPLIED / TRL onto a non-TRL citation', 'the splice changed the bytes',
    trlBare === real ? 'DECOY DID NOT APPLY' : '+' + (trlBare.length - real.length) + ' bytes', trlBare !== real);
  const ct = check(trlBare);
  const proximity = /Trace \(/.test(trlBare);
  add('DECOY-TRL-UNSOURCED', 'R4 fires: the trace resolves, and the file it resolves to contains no TRL at all',
    ct.trl.filter(t => !t.traced).length + ' unsourced of ' + ct.trl.length +
    '; a proximity check would have passed this (a trace line is present: ' + proximity + ')',
    ct.trl.length > 0 && ct.trl.every(t => !t.traced) && proximity);

  /* 9. ISR-2. The unit list is not aspirational. */
  const cov = unitCoverage('literature');
  add('UNIT-LIST-NOT-ASPIRATIONAL', 'every unit token occurs in at least one file under literature/',
    (cov.vacuous
      ? 'VACUOUS: the walk of literature/ returned ZERO files, so all ' + cov.dead.length +
        ' token(s) are "dead" by arithmetic and this check has no subject. ' +
        FSW.emptyPopulationMessage(R('literature'), 'isru_three_facts.js unitCoverage()')
      : cov.files + ' files; ' + cov.dead.length + ' token(s) occur nowhere' +
        (cov.dead.length ? ': ' + cov.dead.join(', ') : '')),
    cov.dead.length === 0);

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
  else if (argv[0] === '--units') {
    const cov = unitCoverage('literature');
    process.stdout.write('unit tokens (' + UNITS.length + '), corpus file counts over ' + cov.files + ' files under literature/:\n');
    for (const u of UNITS) process.stdout.write('  ' + String(cov.counts[u]).padStart(4) + '  ' + u + '\n');
    process.stdout.write('\nboundary tokens ' + BOUNDARY.length + ', scale tokens ' + SCALE.length + ', maturity tokens ' + MATURITY.length + '\n');
    process.stdout.write(cov.dead.length ? 'DEAD TOKENS: ' + cov.dead.join(', ') + '\n' : 'no dead tokens\n');
    process.exit(cov.dead.length ? 1 : 0);
  } else if (!argv.length) {
    process.stderr.write('usage: node oracle/tests/isru_three_facts.js <answer-file> [...] | --prove | --units\n');
    process.exit(2);
  } else {
    let findings = 0;
    for (const f of argv) { const r = report(f, check(fs.readFileSync(f, 'utf8'))); findings += r.findings; }
    process.exit(findings ? 1 : 0);
  }
}

module.exports = { UNITS, BOUNDARY, SCALE, MATURITY, FACTS, sentences, figureHits, check, unitCoverage };
