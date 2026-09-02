#!/usr/bin/env node
/* verify_haiku.js -- sub-step 5.1, Check A. The check on the ORCHESTRATOR'S OWN TURN.
 *
 * Specified at `cr_scratch/step0_software_engineer_loop.md` §4.2, and the form it checks is
 * specified at `cr_scratch/step0_writer_register_spec.md` §1. Contract §6: "The haiku is the
 * orchestrator's own turn and is not a deliverable. It carries no numeral, no unit token, no
 * coefficient name, and no named source."
 *
 * WHY THE THIRD ASSERTION IS THE ONE THAT MATTERS. A haiku carrying a number is a leak in the
 * dangerous direction: an untraced quantitative claim sitting in a register that has no trace
 * convention and cannot acquire one, because you cannot put a locator in a haiku. The haiku must be
 * structurally incapable of asserting. Decorative by construction.
 *
 * THE HONEST LIMIT, STATED IN THE FILE RATHER THAN GLOSSED. English syllable counting is not
 * decidable by algorithm. What is here is a dictionary lookup plus a vowel-group heuristic plus an
 * EXPLICIT UNKNOWN BUCKET, and **an unknown word is a refusal to certify, not a pass.** A missing
 * input is a refusal, not a fallback, and that inherited rule binds this checker exactly as it binds
 * the router. Failing closed means no certified haiku and no delivery; the orchestrator rewrites or
 * adds the word to the dictionary with its count, which is a two-line edit somebody can review.
 *
 * THE THREE OUTCOMES ARE THREE, NOT TWO. `PASS`, `FAIL`, and `UNCERTIFIED`. Collapsing UNCERTIFIED
 * into either is the whole defect: into PASS and the check is decoration; into FAIL and the first
 * unusual word gets the check switched off.
 *
 * ONE LINE, NOT THREE. §1.2: the haiku renders as a single line of running text, and a newline in
 * it is the one thing the contract forbids. So 5-7-5 is not read off line breaks -- it is the
 * assertion that a partition of the word sequence into three contiguous groups counting 5, 7 and 5
 * EXISTS at word boundaries. That is exact, decidable, and it is what the form actually requires
 * once the breaks are gone.
 *
 * TWO TO FIVE UNITS, AUTHOR RULING 2026-08-28, carried into `oracle/answer_contract.md` §6 and §6b.
 * A delivered user-facing TURN is 2 to 5 haiku strung linearly with no line breaks between them; a
 * single haiku is a UNIT and is still what §1.3 rules. The two objects are checked in two modes and
 * the mode is required at the command line, because the six worked haiku on disk are units and a
 * checker that silently treated them as turns would invalidate its own known-answer set.
 *
 *   node tools/verify_haiku.js "<text>" (--turn|--unit) [--verdict APP|FIGURE|LITERATURE|BOTH|CONTESTED|REFUSE-boundary|REFUSE-thin|APP-unresolved]
 *   node tools/verify_haiku.js --prove
 *   node tools/verify_haiku.js --syllables "<text>"
 */
'use strict';
const fs = require('fs'), path = require('path');
const USAGE = [
  'usage: node tools/verify_haiku.js "<text>" (--turn|--unit) [--verdict <V>]',
  '       node tools/verify_haiku.js --prove',
  '       node tools/verify_haiku.js --syllables "<text>"',
  '',
  '  --turn  a delivered user-facing turn: 2 to 5 haiku. Line breaks permitted.',
  '  --unit  a single haiku examined on its own. There is no default; pick one.',
  '',
  '  --allow-breaks  retired 2026-09-01, accepted as a no-op. Line breaks are permitted.',
  '',
].join('\n');
const ROOT = path.resolve(__dirname, '..');
const R = p => path.join(ROOT, p);

/* ------------------------------------------------------------- syllables */
/* The dictionary is the certified half. Every entry is a word that appears in a real haiku on disk
 * or a common English word whose count the heuristic gets wrong, and the count is the author's own
 * where the author stated one. Growing this list is the intended repair for an UNCERTIFIED result. */
const DICT = {
  // From the six worked haiku at step0_writer_register_spec.md §1.5, with the author's own
  // segmentation (`the-mo-del-turns-once` 5, and so on) as the authority.
  the: 1, model: 2, turns: 1, once: 1, number: 2, it: 1, gives: 1, back: 1, is: 1, cold: 1,
  and: 1, yours: 1, others: 2, have: 1, stood: 1, here: 1, their: 1, words: 1, are: 1, set: 1,
  down: 1, below: 2, read: 1, them: 1, not: 1, me: 1, corpus: 2, argues: 2, with: 1, itself: 2,
  i: 1, will: 1, take: 1, a: 1, side: 1, for: 1, you: 1, map: 1, has: 1, an: 1, edge: 1,
  your: 1, question: 2, over: 2, guess: 1, shelf: 1, where: 1, this: 1, lives: 1, empty: 2,
  nearest: 2, thing: 1, named: 1, asked: 1, had: 1, no: 1, door: 1, one: 1, of: 1, to: 1,
  // From the four rejected haiku at §1.6, so the counterexamples count too.
  fifteen: 2, forty: 2, four: 1, bench: 1, measured: 2, that: 1, much: 1, rest: 1, answer: 2,
  file: 1, proof: 1, asked_me: 0, all: 1, well: 1, thing_you: 0, rests: 1, go: 1, now: 1,
  beason: 2, says: 1, henderson: 3, another: 3, both: 1, in: 1,
  // Words the heuristic reliably gets wrong, with the reason in one word.
  every: 2, fire: 1, hour: 1, our: 1, being: 2, doing: 2, quiet: 2, science: 2, area: 3,
  idea: 3, real: 1, poem: 2, lion: 2, ruin: 2, evening: 2, business: 2, interest: 2,
};
/* Patterns the vowel-group heuristic cannot resolve. A word matching one of these and absent from
 * DICT is UNCERTIFIED -- not counted, not guessed. This is the unknown bucket, declared. */
const AMBIGUOUS = [
  /[aeiou](ia|io|ie|ua|uo|eo|oa|ea|ui)[aeiou]?/,  // hiatus: `quiet` is 2, `question` is 2, `science` is 2
  /[^aeiou]le$/,                                   // `-le`: `table` is 2, `whale` is 1
  /[td]ed$/,                                       // `-ed` after t or d is voiced: `wanted` is 2
  /'/,                                             // contractions
];
const VOWELS = /[aeiouy]+/g;
function syllables(word) {
  const w = word.toLowerCase().replace(/[^a-z']/g, '');
  if (!w) return { n: 0, certain: true, why: 'no letters' };
  if (Object.prototype.hasOwnProperty.call(DICT, w)) return { n: DICT[w], certain: true, why: 'dictionary' };
  for (const re of AMBIGUOUS) if (re.test(w)) return { n: null, certain: false, why: 'matches ambiguity pattern ' + re };
  let n = (w.match(VOWELS) || []).length;
  // A trailing silent `e`, and a trailing silent `-es`/`-ed`, each remove one group the regex found.
  if (/[^aeiou]e$/.test(w) && n > 1) n--;
  else if (/[^aeiouls]es$/.test(w) && n > 1) n--;
  if (/[^td]ed$/.test(w) && n > 1) n--;
  if (n < 1) n = 1;
  return { n, certain: true, why: 'heuristic' };
}
const words = s => s.split(/[\s]+/).map(x => x.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, '')).filter(Boolean);

/* N HAIKU STRUNG LINEARLY, WITHOUT LINE BREAKS. AUTHOR RULING 2026-08-28, carried at
 * `oracle/answer_contract.md` §6: *"it should be more like 2-5 haikus strung together linearly (not
 * using line breaks like the style uses typically)."*
 *
 * THE NUMBER OF UNITS IS NOT SEARCHED FOR, IT IS DIVIDED OUT. A valid string of N haiku is exactly
 * 17N syllables, so `total % 17` decides N with no ambiguity and no backtracking: a text of 34
 * syllables can only be two, and a text of 35 can be none. That is worth stating because the obvious
 * implementation -- try N = 2, then 3, then 4 -- invites a greedy split that succeeds on one reading
 * of an ambiguous text and fails on another, and there is no such ambiguity here.
 *
 * THE PARTITION TEST IS A MEMBERSHIP TEST ON THE PREFIX SUMS, and it replaces the old O(n^2) double
 * loop with the same assertion. Syllable counts are positive, so the prefix sums strictly increase
 * and each boundary value occurs at most once; a boundary that is present is therefore present at a
 * word boundary, and every group is non-empty for free. The boundaries are the running totals
 * 5, 12, 17, 22, 29, 34, ... -- and 17k must be among them, which is what makes the k-th haiku a
 * haiku rather than seventeen syllables that happen to sit in the right place. */
const UNIT_MAX = 5;
function haikuSequence(text, opts) {
  const maxUnits = (opts && opts.maxUnits) || UNIT_MAX;
  const W = words(text);
  const counts = W.map(syllables);
  const unknown = W.filter((w, i) => !counts[i].certain);
  if (unknown.length) return { certified: false, unknown, total: null, units: null, split: null };
  const n = counts.map(c => c.n);
  const total = n.reduce((a, b) => a + b, 0);
  const pre = [0]; for (const x of n) pre.push(pre[pre.length - 1] + x);
  const at = new Map(); pre.forEach((v, i) => { if (!at.has(v)) at.set(v, i); });
  if (total === 0 || total % 17 !== 0) return { certified: true, unknown: [], total, units: null, split: null };
  const units = total / 17;
  if (units > maxUnits) return { certified: true, unknown: [], total, units: null, split: null,
    overlong: units };
  /* Every boundary must be achieved at a word boundary. 5 and 12 within each unit, and 17 between. */
  const bounds = [];
  for (let k = 0; k < units; k++) bounds.push(17 * k + 5, 17 * k + 12, 17 * k + 17);
  if (!bounds.every(b => at.has(b))) return { certified: true, unknown: [], total, units: null, split: null };
  const cuts = [0, ...bounds.map(b => at.get(b))];
  const split = [];
  for (let g = 1; g < cuts.length; g++) split.push(W.slice(cuts[g - 1], cuts[g]));
  return { certified: true, unknown: [], total, units, split };
}
/* The single-unit form, kept as a named export because it is what every caller written before the
 * 2026-08-28 ruling asks for, and because a haiku UNIT is still a haiku unit. The ruling is about
 * what a TURN carries, not about what a haiku is; conflating the two would invalidate the six worked
 * haiku on disk, which are the known-answer set this checker is proved against. */
function fiveSevenFive(text) {
  const r = haikuSequence(text, { maxUnits: 1 });
  return { certified: r.certified, unknown: r.unknown, total: r.total,
    split: r.units === 1 ? r.split : null };
}

/* ---------------------------------------------------------- prohibitions */
/* §1.3, the seven, closed. The lists are here because §1.3 is where they are ruled and this file is
 * the only consumer; a copy in the suite would be the second authority LIM-7 forbids. */
const NUMERALS = /\b[0-9]+([.,][0-9]+)?\b/;
const SPELLED = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven',
  'twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','thirty',
  'forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','billion','dozen',
  'both','half','several','few','many','pair','couple','score'];
const UNITS = ['kwh','kg','kilogram','kilowatt','tonne','ton','metre','meter','percent','per cent',
  'watt','joule','degree','kelvin','celsius','year','years','month','day','hour','per year','per kg',
  'wt','gram','litre','liter','mile','km'];
const COMPARATIVES = ['more than','less than','twice','most','least','largest','smallest','low','high',
  'higher','lower','cheaper','costlier','greater','fewer','biggest','best','worst','faster','slower',
  'better','worse','enough','nearly all','almost all'];
const GRADES = ['proven','verified','confirmed','established','certain','validated','supported',
  'exact','proof','rigorous','robust','conclusive'];
const HEDGES = ['perhaps','may','maybe','possibly','it seems','might','probably','likely','apparently',
  'somewhat','arguably'];
const OFFERS = ['ask me more','let me know','happy to','feel free','if you want','just ask','i can also'];
const PROHIBITIONS = [
  /* `one` after a determiner is a PRONOUN, not a cardinal, and the exception is not a convenience:
   * the author's own sixth worked haiku ships "it had no door for this one", and the first draft of
   * this list failed it. §1.3 rule 1 prohibits "a cardinal quantity, in any orthography" -- `15`,
   * `fifteen`, `a dozen` -- and "this one" counts nothing. The list over-fired on the artifact it
   * was written to protect, which is what a known-answer set is for. */
  { rule: 1, name: 'cardinal quantity',
    test: t => NUMERALS.test(t) ? [t.match(NUMERALS)[0]]
      : hits(t.replace(/\b(this|that|the|which|any|no|each|every|another|such a)\s+one\b/gi, '$1 item'), SPELLED) },
  { rule: 2, name: 'unit token', test: t => hits(t, UNITS) },
  { rule: 3, name: 'comparative implying measurement', test: t => hits(t, COMPARATIVES) },
  { rule: 4, name: 'named source, filename, slug, coefficient name, or year',
    test: t => [...(t.match(/\b(19|20)[0-9]{2}\b/g) || []), ...(t.match(/\b[a-z0-9-]+\.md\b/gi) || []),
      ...(t.match(/\b[A-Z][a-z]+ (?:says|found|reports)/g) || []), ...(t.match(/\[\[[^\]]+\]\]/g) || [])] },
  { rule: 5, name: 'grade word', test: t => hits(t, GRADES) },
  { rule: 6, name: 'hedge', test: t => hits(t, HEDGES) },
  { rule: 7, name: 'offer of further help', test: t => hits(t, OFFERS) },
];
function hits(text, list) {
  const t = ' ' + text.toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  return list.filter(w => t.includes(' ' + w + ' '));
}

/* ------------------------------------------------------------- §1.4 mood */
/* The image families are DATA and the check is word-list membership, not a judgement about tone. */
const FAMILIES = {
  'APP':              { allow: ['model','turns','turned','dial','number','arithmetic','cold','machine','gear','returns','gives'], forbid: ['reading','testimony','papers','shelf','witness'] },
  'FIGURE':           { allow: ['model','turns','turned','dial','number','arithmetic','cold','machine','gear','returns','gives'], forbid: ['reading','testimony','papers','shelf','witness'] },
  'LITERATURE':       { allow: ['paper','papers','words','voices','witness','witnesses','shelf','stood','spoken','wrote'], forbid: ['machinery','machine','recomputation','model','dial'] },
  'BOTH':             { allow: ['paper','papers','words','voices','witness','witnesses','shelf','stood','spoken','wrote'], forbid: ['machinery','recomputation'] },
  'CONTESTED':        { allow: ['argues','argue','dispute','pulling','facing','sides','side','arbitrate','quarrel'], forbid: ['resolution','settled','settlement','verdict','resolved'] },
  'REFUSE-boundary':  { allow: ['edge','wall','margin','door','map','boundary','shut','over'], forbid: ['search','absence','elsewhere','empty','bare'] },
  'REFUSE-thin':      { allow: ['empty','bare','shelf','gap','nearest','nobody','unwritten'], forbid: ['edge','boundary','wall','margin'] },
  'APP-unresolved':   { allow: ['door','lock','key','handle','name','missing','model'], forbid: ['absence','evidence','empty'] },
};
/* ------------------------------------------------------------ §4.4 the flat Oracle */
/* "The opposite leak, and the one nobody plans for, BECAUSE A FLAT ORACLE PASSES EVERY CHECK."
 * §4.4's positive form is a rule, not a taste: *the haiku states a disposition or announces a
 * position; it never describes the machinery that produced either.* `read them and not me`
 * announces a position; `the search is complete` describes machinery.
 *
 * This assertion exists because the author's own §1.6 counterexample #7 passed A1 through A4 in
 * this file's first draft. It is a closed list of machinery subjects and constraint-explaining
 * phrases, exactly the shape of §4.3's B2 -- weak on purpose, and a smoke detector rather than a
 * judge. It cannot catch "any verdict, always the same image family", which §4.4 calls the
 * expensive row: that one is visible only across a transcript, and it is a sampling read. */
const MACHINERY = [
  'the search is', 'the search has', 'the search', 'the query', 'the run is', 'the retrieval',
  'the process', 'the system', 'the answer is in', 'the answer is below', 'the lookup',
  'has finished', 'is complete', 'was run', 'has run', 'the check', 'the corpus was searched',
];
const CONSTRAINT_TALK = [
  'haiku', 'the form is', 'i have to', 'i cannot say', 'i must', 'syllable', 'seventeen',
  'in this form', 'so here is',
];
function flatCheck(text) {
  const t = ' ' + text.toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  const machinery = MACHINERY.filter(p => t.includes(' ' + p + ' '));
  const constraint = CONSTRAINT_TALK.filter(p => t.includes(' ' + p + ' '));
  return { machinery, constraint, ok: machinery.length === 0 && constraint.length === 0 };
}

function moodCheck(text, verdict) {
  if (!verdict) return { checked: false, note: 'no verdict supplied; §1.4 not checked' };
  const f = FAMILIES[verdict];
  if (!f) return { checked: false, note: 'verdict "' + verdict + '" is not one of the eight §1.4 rows' };
  const t = ' ' + text.toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  const allowed = f.allow.filter(w => t.includes(' ' + w + ' '));
  const forbidden = f.forbid.filter(w => t.includes(' ' + w + ' '));
  return { checked: true, allowed, forbidden, ok: allowed.length > 0 && forbidden.length === 0 };
}

/* --------------------------------------------------------- the run-on tell */
/* AUTHOR RULING 2026-08-28, and the reasoning is his: *"it is a way to keep AI from AIing... you'd
 * give it a paragraph that is one run-on sentence if you were allowed and it would have 16 em
 * dashes."* The haiku form is the anti-AI-voice mechanism, not a decoration on the output.
 *
 * A7 IS SEPARATE FROM §1.3's SEVEN AND DOES NOT JOIN THEM. §1.3 is a closed list of seven ruled at
 * `cr_scratch/step0_writer_register_spec.md`, and quietly making it eight would put this file in
 * disagreement with the document it implements. This is a distinct assertion with a distinct owner
 * and a distinct date, reported on its own line.
 *
 * THE FIRST DRAFT OF THIS LIST WAS REFUTED BY THE KNOWN-ANSWER SET AND THE REFUTATION IS RECORDED
 * RATHER THAN QUIETLY FIXED. It read `em dash, semicolon, colon splice`, on the reasoning that all
 * three are the punctuation of the run-on paragraph. Running `--prove` turned three of the six
 * author-written worked haiku red: #4, #5 and #6 each use a SEMICOLON as the caesura -- `the map has
 * an edge, and your question is over it; I will not guess`. The semicolon is not the AI tell in this
 * form, it is the pivot the form is built on, and a rule that fires on half the artifact it protects
 * is wrong about the artifact. **Em dashes: zero across all six.** That is what the author named and
 * that is all this list holds. This is the second time on this file that a prohibition list
 * over-fired on the known-answer set -- see the §1.3 rule-1 note on `this one` -- and both times the
 * set caught it before anything shipped, which is the entire argument for having one. */
const RUNON_TELL = [
  { name: 'em dash', re: /—|\s--\s|\w--\w/ },
];
function runonCheck(text) {
  const hitsList = RUNON_TELL.filter(p => p.re.test(text)).map(p => p.name);
  return { hits: hitsList, ok: hitsList.length === 0 };
}

/* ------------------------------------------------------------------ check */
/* `mode` is 'unit' (one haiku, the object §1.3 rules) or 'turn' (a delivered user-facing turn, which
 * the 2026-08-28 ruling requires to be 2 to 5 units). It defaults to 'unit' HERE and is REQUIRED at
 * the CLI, and the asymmetry is deliberate: 'unit' is what every caller written before the ruling
 * means, and the risk of a silent default is at the command line, where a real turn is checked. A
 * default that cannot be reached by the thing it would excuse is not an escape hatch. */
function check(text, verdict, mode) {
  const findings = [], uncertified = [];
  const M = mode || 'unit';
  // A1. LINE BREAKS ARE PERMITTED, in a unit and in a turn alike. Author ruling 2026-09-01, which
  // reverses the 2026-08-28 ruling that required a turn to be strung linearly. The reason is measured
  // rather than aesthetic: two delivered turns under the linear form read as run-on mush, and a form
  // whose boundaries are invisible is not doing the work the form exists to do. The anti-run-on
  // control does not weaken, because it never lived here: A7 is the run-on tell and A2 is the
  // syllable partition, and both are untouched. A1 is retired and the newline count is reported.
  const nl = (text.match(/\n/g) || []).length;
  // A2. 5-7-5 per unit, by the stated rule, with the unknown bucket.
  const f = haikuSequence(text.replace(/\n/g, ' '), { maxUnits: M === 'turn' ? UNIT_MAX : 1 });
  if (!f.certified) uncertified.push('A2: ' + f.unknown.length + ' word(s) the syllable rule cannot count: ' +
    f.unknown.map(w => '"' + w + '" (' + syllables(w).why + ')').join(', ') +
    ' -- an unknown word is a refusal to certify, not a pass. Add it to DICT with its count, or rewrite.');
  else if (!f.split) findings.push('A2: ' + f.total + ' syllables and no ' +
    (M === 'turn' ? '5/7/5 x N (N up to ' + UNIT_MAX + ')' : '5/7/5') +
    ' partition exists at a word boundary' + (f.overlong ? '; ' + f.overlong + ' units exceeds the cap of ' + UNIT_MAX : ''));
  // A6. The turn carries 2 to 5 units. Author ruling 2026-08-28; contract §6.
  if (M === 'turn' && f.certified && f.split && (f.units < 2 || f.units > UNIT_MAX))
    findings.push('A6: a delivered turn carries 2 to ' + UNIT_MAX + ' haiku strung linearly; this carries ' + f.units);
  // A7. The run-on tell. The failure mode the form exists to prevent.
  const runon = runonCheck(text);
  if (!runon.ok) findings.push('A7 (the run-on tell): ' + runon.hits.join(', ') +
    ' -- the haiku form is the anti-AI-voice mechanism and these are the punctuation of the paragraph it replaces');
  // A3. The seven prohibitions.
  for (const p of PROHIBITIONS) {
    const h = p.test(text);
    if (h && h.length) findings.push('A3 rule ' + p.rule + ' (' + p.name + '): ' + h.map(x => '"' + x + '"').join(', '));
  }
  // A4. Mood, §1.4.
  const mood = moodCheck(text, verdict);
  if (mood.checked && !mood.ok) findings.push('A4 (§1.4 mood): governing image ' +
    (mood.allowed.length ? '' : 'draws on no noun from the ' + verdict + ' family; ') +
    (mood.forbidden.length ? 'uses forbidden noun(s) ' + mood.forbidden.join(', ') : '').trim());
  // A5. §4.4, the flat Oracle. A status line in 5-7-5 passes A1 through A4 and is the leak nobody
  // plans for, because a flat Oracle passes every check.
  const flat = flatCheck(text);
  if (!flat.ok) findings.push('A5 (§4.4 flat Oracle): the haiku describes the machinery that produced the disposition rather than stating the disposition' +
    (flat.machinery.length ? '; machinery subject: ' + flat.machinery.map(x => '"' + x + '"').join(', ') : '') +
    (flat.constraint.length ? '; explains or apologises for the constraint: ' + flat.constraint.map(x => '"' + x + '"').join(', ') : ''));
  const outcome = findings.length ? 'FAIL' : (uncertified.length ? 'UNCERTIFIED' : 'PASS');
  return { text, outcome, findings, uncertified, form: f, mood, flat, runon, newlines: nl, mode: M };
}

function report(r) {
  const W = s => process.stdout.write(s + '\n');
  W('VERIFY HAIKU  ' + JSON.stringify(r.text.slice(0, 100)));
  W('  mode                   ' + r.mode + (r.mode === 'turn' ? '  (2 to ' + UNIT_MAX + ' units required)' : '  (one unit)'));
  W('  newlines               ' + r.newlines + (r.newlines ? '   <- A1' : ''));
  W('  units                  ' + (r.form.units === null || r.form.units === undefined ? '-' : r.form.units));
  W('  syllables              ' + (r.form.certified ? r.form.total + (r.form.split ?
    '  ' + Array.from({ length: r.form.split.length / 3 }, (_, k) =>
      r.form.split.slice(k * 3, k * 3 + 3).map(g => g.join('-')).join(' | ')).join('   //   ')
    : '  NO 5/7/5 PARTITION') : 'UNCERTIFIED'));
  W('  A7 run-on tell         ' + (r.runon.ok ? 'ok' : r.runon.hits.join(', ')));
  W('  §4.4 flat-Oracle       ' + (r.flat.ok ? 'ok' : 'machinery[' + r.flat.machinery.join(',') + '] constraint[' + r.flat.constraint.join(',') + ']'));
  if (r.mood.checked) W('  §1.4 family            ' + (r.mood.ok ? 'ok, on ' + r.mood.allowed.join(', ') :
    'allowed[' + r.mood.allowed.join(',') + '] forbidden[' + r.mood.forbidden.join(',') + ']'));
  else W('  §1.4 family            not checked: ' + r.mood.note);
  for (const x of r.uncertified) W('  UNCERT ' + x);
  for (const x of r.findings) W('  FAIL   ' + x);
  W('');
  W('LIMIT   English syllable counting is not decidable by algorithm. This is a dictionary plus a');
  W('        heuristic plus an explicit unknown bucket, and an unknown word is a REFUSAL TO CERTIFY,');
  W('        never a pass. The three outcomes are three. It also cannot see §1.4\'s real test --');
  W('        hand the haiku to someone who has seen neither question nor deliverable and ask whether');
  W('        the Oracle answered. Word-list membership is the bindable half of that, not the whole.');
  W('');
  W('RESULT  ' + r.outcome + (r.outcome === 'FAIL' ? ', ' + r.findings.length + ' finding(s)' : ''));
  return r;
}

/* ------------------------------------------------------------------ proof
 *
 * THE PROOF SET IS REAL PRODUCED OUTPUT AND IT IS BETTER THAN A MUTATION.
 * `cr_scratch/step0_writer_register_spec.md` §1.5 carries SIX haiku written by the seat that owns
 * the register, each with the author's own syllable segmentation stated beside it; §1.6 carries
 * FOUR that must not ship, each with the rule it violates named. That is a known-answer test set
 * produced by a person, on disk, which no mutation of mine can improve on: the six are what the
 * checker must certify and the four are what it must catch, and both halves were written before
 * this checker existed and without reference to it.
 *
 * The haiku are READ OUT OF THAT FILE AT PROOF TIME, never copied into this one. A copy would drift
 * from the spec and the checker would then be proving itself against its own transcription.
 *
 * The mutations come on top of that: each of the six is mutated once, minimally, into each
 * prohibition, and every mutation is asserted to have changed the bytes before its red is asserted.
 */
const SPEC = 'cr_scratch/step0_writer_register_spec.md';
function readSpecHaiku() {
  const t = fs.readFileSync(R(SPEC), 'utf8').replace(/\r\n/g, '\n');
  const s15 = t.slice(t.indexOf('### 1.5 Worked haiku'), t.indexOf('### 1.6'));
  // §1.6 ONLY, and the bound matters. Slicing to end-of-file swept in thirteen further rejected
  // lines from §2 and §4's tables, which are deliverable-prose counterexamples rather than haiku:
  // most are not seventeen-syllable lines at all, so this checker's verdict on them is not
  // comparable to the author's stated reason. Four rows, which is what §1.6 declares.
  const after16 = t.indexOf('\n## ', t.indexOf('### 1.6'));
  const s16 = t.slice(t.indexOf('### 1.6'), after16 < 0 ? undefined : after16);
  const good = [...s15.matchAll(/```\n([^\n`]+)\n```/g)].map(m => m[1].trim());
  // §1.6 is a markdown table: | `haiku` | why |
  const bad = [...s16.matchAll(/^\| `([^`]+)` \| (.+?) \|$/gm)].map(m => ({ text: m[1].trim(), why: m[2].trim() }));
  return { good, bad };
}
const VERDICT_OF = ['APP', 'LITERATURE', 'CONTESTED', 'REFUSE-boundary', 'REFUSE-thin', 'APP-unresolved'];

function prove() {
  const out = [];
  const add = (id, expect, got, pass) => out.push({ id, expect, got, pass });
  const { good, bad } = readSpecHaiku();

  add('SPEC-READ', 'six worked haiku and seven rejected haiku read out of ' + SPEC,
    good.length + ' worked, ' + bad.length + ' rejected', good.length === 6 && bad.length === 7);
  if (good.length !== 6) { process.stdout.write('FAIL  SPEC-READ  the known-answer set could not be read; refusing to prove against a stand-in\n'); process.exit(1); }

  /* CONTROL. All six must certify, and each must land on its own verdict's image family. */
  good.forEach((h, i) => {
    const r = check(h, VERDICT_OF[i]);
    add('CONTROL-' + (i + 1) + ' / ' + VERDICT_OF[i], 'certifies 5-7-5, no prohibition, on the ' + VERDICT_OF[i] + ' family',
      r.outcome + (r.form.certified ? ' ' + r.form.total + ' syll' + (r.form.split ? ' 5/7/5' : ' NO SPLIT') : '') +
      (r.findings.length ? ' :: ' + r.findings[0] : '') + (r.uncertified.length ? ' :: ' + r.uncertified[0].slice(0, 110) : ''),
      r.outcome === 'PASS');
  });

  /* THE FOUR THE AUTHOR REJECTED. Each must FAIL, and the mood one must fail only under §1.4. */
  bad.forEach((b, i) => {
    // The third rejected haiku "passes §1.3 entirely" and fails §1.4 only after a refusal. Supply
    // that verdict, because without it the checker is being asked to catch a failure that is
    // defined relative to a disposition it was not told.
    const v = /§1.4/.test(b.why) ? 'REFUSE-thin' : null;
    const r = check(b.text, v);
    add('REJECTED-' + (i + 1), 'fails, per the author: ' + b.why.slice(0, 60),
      r.outcome + (r.findings.length ? ' :: ' + r.findings[0].slice(0, 120) : ''), r.outcome === 'FAIL');
  });

  /* A1. The newline, which is half the stated contract and is the one a mutation reaches directly. */
  const base = good[0];
  const broken = base.replace(/, /, ',\n');
  add('MUTATION-APPLIED / newline', 'the mutation changed the bytes',
    broken === base ? 'DECOY DID NOT APPLY' : '+1 newline', broken !== base);
  const rb = check(broken, 'APP');
  add('NEWLINE-PERMITTED', 'a line break is not a finding: A1 retired 2026-09-01, nothing replaced it',
    rb.findings.filter(f => /^A1/.test(f)).length + ' A1 finding(s)', !rb.findings.some(f => /^A1/.test(f)));

  /* A3, one decoy per prohibition, each a minimal edit to a real haiku. The replacement words are
     chosen to keep the syllable count so the decoy tests A3 and not A2. */
  const A3 = [
    ['rule 1 cardinal', good[0], /the number/, 'the fifteen'],
    ['rule 2 unit', good[0], /is cold/, 'per year'],
    ['rule 3 comparative', good[0], /is cold/, 'is low'],
    ['rule 4 named source', good[1], /others have/, 'Beason says'],
    ['rule 5 grade word', good[0], /is cold/, 'is proven'],
    ['rule 6 hedge', good[0], /is cold/, 'may hold'],
    ['rule 7 offer', good[0], /and it is yours/, 'so ask me more'],
  ];
  for (const [label, src, re, to] of A3) {
    const d = src.replace(re, to);
    add('MUTATION-APPLIED / ' + label, 'the mutation changed the bytes',
      d === src ? 'DECOY DID NOT APPLY' : 'applied', d !== src);
    const r = check(d, null);
    add('DECOY-A3-' + label.replace(/ /g, '-'), 'A3 fires and names the rule',
      r.outcome + (r.findings.length ? ' :: ' + r.findings.find(f => /^A3/.test(f)) : ' :: no A3 finding'),
      r.findings.some(f => /^A3/.test(f)));
  }

  /* A2. A syllable added, so no 5/7/5 partition exists. */
  const long = base.replace(/the model/, 'the model machine');
  add('MUTATION-APPLIED / extra syllables', 'the mutation changed the bytes', long === base ? 'DECOY DID NOT APPLY' : 'applied', long !== base);
  const rl = check(long, 'APP');
  add('DECOY-A2-NOT-575', 'A2 fires: no 5/7/5 partition exists',
    (rl.form.total || '?') + ' syllables, split ' + (rl.form.split ? 'FOUND' : 'none'),
    rl.findings.some(f => /^A2/.test(f)));

  /* THE UNKNOWN BUCKET, and it is the assertion this file exists to make honestly. */
  const odd = base.replace(/the model/, 'the quiet');   // `quiet` is in DICT; `quieter` is not
  const odd2 = base.replace(/the model/, 'the quieter');  // `quieter` matches the hiatus pattern and is not in DICT
  add('MUTATION-APPLIED / unknown word', 'the mutation changed the bytes', odd2 === base ? 'DECOY DID NOT APPLY' : 'applied', odd2 !== base);
  const ru = check(odd2, 'APP');
  add('UNCERTIFIED-IS-NOT-PASS', 'an unknown word yields UNCERTIFIED, which is neither PASS nor FAIL',
    ru.outcome + ' :: ' + (ru.uncertified[0] || '').slice(0, 90), ru.outcome === 'UNCERTIFIED');
  add('UNCERTIFIED-IS-NOT-FAIL', 'UNCERTIFIED is a third outcome and is reported as one, so an unusual word does not get the check switched off',
    'outcomes are ' + ['PASS', 'FAIL', 'UNCERTIFIED'].join('/') + '; this run: ' + ru.outcome,
    ru.outcome !== 'FAIL' && ru.outcome !== 'PASS');
  add('DICT-REPAIR-WORKS', 'adding the word to DICT with its count moves the same haiku to a decided outcome',
    (() => { DICT.quieter = 3; const r2 = check(odd2, 'APP'); delete DICT.quieter; return r2.outcome; })(),
    (() => { DICT.quieter = 3; const r2 = check(odd2, 'APP'); delete DICT.quieter; return r2.outcome !== 'UNCERTIFIED'; })());

  /* §1.4, on its own. The third rejected haiku is the case: it passes §1.3 entirely. */
  const moodOnly = bad.find(b => /§1.4/.test(b.why));
  if (moodOnly) {
    const p13 = PROHIBITIONS.every(p => { const h = p.test(moodOnly.text); return !h || !h.length; });
    add('MOOD-IS-THE-ONLY-FAILURE', 'the author\'s §1.4 counterexample passes all seven §1.3 prohibitions and fails only on mood',
      '§1.3 clean: ' + p13 + '; outcome with a REFUSE verdict: ' + check(moodOnly.text, 'REFUSE-thin').outcome,
      p13 && check(moodOnly.text, 'REFUSE-thin').outcome === 'FAIL');
  }

  /* ---------------------------------------------- 2 to 5 units, the 2026-08-28 ruling
   * Every decoy below is built by CONCATENATING REAL AUTHOR-WRITTEN HAIKU, not by constructing a
   * string of the right length. A synthetic 34-syllable string proves the arithmetic; two real haiku
   * strung the way the ruling says to string them prove the thing the ruling is about. */
  const two  = good[0] + ' ' + good[1];
  const five = good.slice(0, 5).join(' ');
  const six  = good.join(' ');

  const r2 = check(two, null, 'turn');
  add('SEQ-TWO-UNITS', 'two worked haiku strung linearly certify as a turn, units = 2',
    r2.outcome + ' units=' + r2.form.units + (r2.findings.length ? ' :: ' + r2.findings[0].slice(0, 100) : ''),
    r2.outcome === 'PASS' && r2.form.units === 2);

  const r5 = check(five, null, 'turn');
  add('SEQ-FIVE-UNITS', 'five is the cap and certifies, units = 5',
    r5.outcome + ' units=' + r5.form.units + (r5.findings.length ? ' :: ' + r5.findings[0].slice(0, 100) : ''),
    r5.outcome === 'PASS' && r5.form.units === 5);

  const r6 = check(six, null, 'turn');
  add('SEQ-SIX-UNITS-FAILS', 'six exceeds the cap and fails; the cap is a cap, not a suggestion',
    r6.outcome + (r6.findings.length ? ' :: ' + r6.findings[0].slice(0, 110) : ''), r6.outcome === 'FAIL');

  const r1t = check(good[0], null, 'turn');
  add('SEQ-ONE-UNIT-FAILS-AS-A-TURN', 'a single haiku is a valid unit and is NOT a valid turn; A6 fires',
    r1t.outcome + (r1t.findings.length ? ' :: ' + r1t.findings.find(f => /^A6/.test(f)) : ' :: no A6'),
    r1t.outcome === 'FAIL' && r1t.findings.some(f => /^A6/.test(f)));

  /* THE DISCRIMINATOR BETWEEN THE TWO MODES. Without this, `unit` could be `turn` with a loose cap
   * and nothing would notice; the six CONTROL rows would still be green. */
  const r2u = check(two, null, 'unit');
  add('SEQ-UNIT-MODE-REJECTS-TWO', 'unit mode is not turn mode with a loose cap: two units fail in unit mode',
    r2u.outcome + (r2u.findings.length ? ' :: ' + r2u.findings[0].slice(0, 90) : ''), r2u.outcome === 'FAIL');

  /* 17N IS NOT A CONVENIENCE. One syllable added to a valid two-unit turn and nothing partitions. */
  const off = two.replace(/the model/, 'the model machine');
  add('MUTATION-APPLIED / off-by-one syllable', 'the mutation changed the bytes',
    off === two ? 'DECOY DID NOT APPLY' : 'applied', off !== two);
  const roff = check(off, null, 'turn');
  add('SEQ-NOT-A-MULTIPLE-OF-17', 'a turn that is not 17N syllables has no partition at any N',
    (roff.form.total || '?') + ' syllables, units ' + roff.form.units,
    roff.findings.some(f => /^A2/.test(f)));

  /* THE UNIT BOUNDARY MUST BE AT A WORD BOUNDARY, and this is the assertion a prefix-sum check can
   * lose. `yours others` (1 + 2) becomes `another` (3): the total stays 34, both units still look
   * like 17, and the boundary at 17 now falls INSIDE a word. It must not certify. */
  const straddle = two.replace(/yours others/, 'another');
  add('MUTATION-APPLIED / straddled unit boundary', 'the mutation changed the bytes',
    straddle === two ? 'DECOY DID NOT APPLY' : 'applied', straddle !== two);
  const rst = check(straddle, null, 'turn');
  add('SEQ-BOUNDARY-MUST-BE-AT-A-WORD', 'a 34-syllable turn whose 17-boundary falls inside a word does not certify',
    (rst.form.total || '?') + ' syllables, units ' + rst.form.units,
    rst.form.total === 34 && !rst.form.split);

  /* A PROHIBITION IN THE SECOND UNIT. The decoy against an implementation that checks unit one and
   * calls it a turn. It is the cheapest wrong way to build this and it passes every other row here. */
  const late = good[0] + ' ' + good[1].replace(/others have/, 'Beason says');
  add('MUTATION-APPLIED / prohibition in unit two', 'the mutation changed the bytes',
    late === two ? 'DECOY DID NOT APPLY' : 'applied', late !== two);
  const rlate = check(late, null, 'turn');
  add('SEQ-A3-FIRES-IN-THE-SECOND-UNIT', 'A3 fires on a prohibition planted in unit two, not only unit one',
    rlate.outcome + (rlate.findings.length ? ' :: ' + rlate.findings.find(f => /^A3/.test(f)) : ' :: no A3'),
    rlate.findings.some(f => /^A3/.test(f)));

  /* A7, and it is the author's named failure mode rather than a general taste about punctuation. */
  const dashed = two.replace(/, the number/, ' — the number');
  add('MUTATION-APPLIED / em dash', 'the mutation changed the bytes',
    dashed === two ? 'DECOY DID NOT APPLY' : 'applied', dashed !== two);
  const rdash = check(dashed, null, 'turn');
  add('DECOY-A7-EM-DASH', 'A7 fires on an em dash, the tell the author named',
    rdash.outcome + (rdash.findings.length ? ' :: ' + (rdash.findings.find(f => /^A7/.test(f)) || rdash.findings[0]).slice(0, 90) : ''),
    rdash.findings.some(f => /^A7/.test(f)));
  add('A7-SPARES-THE-SEMICOLON', 'the semicolon is the caesura three of the six worked haiku use, and A7 does not fire on it',
    good.filter(h => /;/.test(h)).length + ' of 6 worked haiku use a semicolon; A7 hits on them: ' +
      good.filter(h => /;/.test(h)).filter(h => !runonCheck(h).ok).length,
    good.filter(h => /;/.test(h)).length === 3 && good.every(h => runonCheck(h).ok));

  /* THE MODE IS REQUIRED AT THE CLI. A missing input is a refusal, not a fallback, and that rule
   * binds this checker's argument parsing exactly as it binds its dictionary. */
  const cp = require('child_process');
  const run = args => { try { cp.execFileSync(process.execPath, [__filename, ...args], { stdio: 'pipe' }); return 0; }
    catch (e) { return e.status; } };
  add('CLI-MODE-IS-REQUIRED', 'the CLI refuses a haiku with no --unit or --turn, exit 2, rather than assuming one',
    'exit ' + run([good[0]]), run([good[0]]) === 2);
  add('CLI-UNIT-MODE-WORKS', 'an explicit --unit on a worked haiku exits 0',
    'exit ' + run([good[0], '--unit', '--verdict', 'APP']), run([good[0], '--unit', '--verdict', 'APP']) === 0);
  add('CLI-TURN-MODE-WORKS', 'an explicit --turn on two strung haiku exits 0',
    'exit ' + run([two, '--turn']), run([two, '--turn']) === 0);

  const w = Math.max(...out.map(o => o.id.length));
  let bad2 = 0;
  for (const o of out) { if (!o.pass) bad2++; process.stdout.write((o.pass ? 'PASS  ' : 'FAIL  ') + o.id.padEnd(w) + '  expected ' + o.expect + '  |  got ' + o.got + '\n'); }
  const applied = out.filter(o => /^MUTATION-APPLIED/.test(o.id));
  process.stdout.write('\nmutations written ' + applied.length + ', mutations observed to apply ' + applied.filter(o => o.pass).length +
    '. A decoy that fails to apply is a FAILURE, not a skip (INV-11).\n');
  process.stdout.write((out.length - bad2) + ' of ' + out.length + ' proofs pass\n');
  process.exit(bad2 ? 1 : 0);
}

/* ------------------------------------------------------------------ entry */
if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv[0] === '--prove') prove();
  else if (argv[0] === '--syllables') {
    for (const w of words(argv[1] || '')) { const s = syllables(w); process.stdout.write(String(s.n === null ? '?' : s.n).padStart(3) + '  ' + w.padEnd(14) + s.why + '\n'); }
    process.exit(0);
  } else if (!argv.length) {
    process.stderr.write(USAGE);
    process.exit(2);
  } else {
    /* THE MODE IS REQUIRED AND HAS NO DEFAULT HERE. `check()` defaults to 'unit' for the callers
     * written before the 2026-08-28 ruling; the command line is where a real delivered turn is
     * checked, and a default there is the escape hatch that switches the control off. A missing
     * input is a refusal, not a fallback. */
    const turn = argv.includes('--turn'), unit = argv.includes('--unit');
    if (turn === unit) {
      process.stderr.write((turn ? 'both --turn and --unit given; they are exclusive\n'
        : 'no mode given. A delivered user-facing turn is --turn (2 to ' + UNIT_MAX +
          ' haiku strung linearly); a single haiku examined on its own is --unit. There is no default.\n') + USAGE);
      process.exit(2);
    }
    // --allow-breaks is retired and accepted as a no-op: line breaks need no permission now.
    const i = argv.indexOf('--verdict');
    const r = report(check(argv[0], i < 0 ? null : argv[i + 1], turn ? 'turn' : 'unit'));
    process.exit(r.outcome === 'PASS' ? 0 : 1);
  }
}

module.exports = { DICT, AMBIGUOUS, syllables, words, fiveSevenFive, haikuSequence, UNIT_MAX,
  PROHIBITIONS, FAMILIES, MACHINERY, CONSTRAINT_TALK, RUNON_TELL, moodCheck, flatCheck, runonCheck,
  check, readSpecHaiku };
