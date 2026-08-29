/* oracle/router/classify.js -- the classifier. Sub-step 3.8.
 *
 * THREE RETRIEVAL MODES AND ONE APP MODE. The mode is decided BEFORE any retrieval runs, from the
 * sub-claim's own text against three registers the router already holds: the contested-claims
 * register, the app's own address grammar, and the app's own EXCLUSIONS. Two sources are never
 * searched and then reconciled.
 *
 *   CONTESTED   a register axis fires                     -> CONTESTED
 *   APP         an app address resolves                   -> APP, or FIGURE if a dimension is unbound
 *   REFUSE      the app's EXCLUSIONS declare the topic     -> REFUSE, or LITERATURE under
 *                                                            EXCLUDED-THEN-CORPUS (3.4)
 *   LITERATURE  none of the above; the shelf is searched  -> LITERATURE, or REFUSE not-found
 *
 * NEVER TWO MODES FOR ONE SUB-CLAIM; NEVER ZERO. That is the contract, and this file ASSERTS it
 * rather than arranging its branches so that it happens to hold. assertOneMode() runs on every
 * sub-claim of every question and throws on a violation. An unasserted contract is this project's
 * signature defect: the check register agreed with itself, passed its own known-answer test, and
 * had never been executed.
 *
 * The order above is the precedence and it is not arbitrary.
 *
 * - CONTESTED is first because the register is a statement that the sources DISAGREE, and a
 *   disagreement is not repaired by finding one of the sources. D2 in the loose-ends register, a
 *   position taken at 1.8 and upheld at 0.5: the register is consulted at classification time, as a
 *   third retrieval mode, never after retrieval.
 * - APP is second because of the standing authority rule the app paid for three times: a question
 *   the app can answer is answered from the app, never from a summary that happens to carry a
 *   number.
 * - EXCLUSIONS is third and not first, because an exclusion is a claim about the APP's boundary and
 *   a resolved app address is a claim about the app's content. Where both fire, the app has the
 *   thing; where only the exclusion fires, the app has declared it does not.
 * - LITERATURE is last, and REFUSE not-found is what last place returns when the shelf is empty.
 *
 * K, THE AXIS FIRING THRESHOLD, IS NOT SET HERE. oracle/register_schema.md section 4.3 assigns it
 * to sub-step 3.6 and refuses to state a number in the document that corrects the practice of
 * stating one. This file therefore READS it, from oracle/router/axis_threshold.json, and refuses
 * `input-missing` before classification when it is absent -- which is answer contract section 3's
 * own timing rule for a missing input, and costs zero personas. A classifier that defaulted K would
 * make CONTESTED fire or not fire on a number nobody chose, which is the same shape as C2: a
 * routing decision nobody can see.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const A = require('../../tools/address.js');
const X = require('../../tools/exclusions_match.js');
const { loadAppSurface } = require('./app_surface.js');
const { loadExcludedNodes } = require('./excluded_nodes.js');
const LIT = require('../retrieval/literature_search.js');
const TP = require('./thin_patches.js');

/* --- closed sets ------------------------------------------------------------------------------- */

const VERDICTS = ['APP', 'FIGURE', 'LITERATURE', 'BOTH', 'CONTESTED', 'REFUSE'];

/* SEVEN REASON CODES. `transfer-unevaluable` is the seventh and it is ruled here, at W4-2, on W4-4's
 * escalation from the transfer gate at 4.4.
 *
 * THE RULING, AND WHY IT IS NOT A WIDENING OF `not-found`. Answer contract section 5 gives the codes
 * a closed set of six and says in its own words why they are not one code: "Each routes to a
 * different owner." `not-found`'s owner is "a corpus gap, and an acquisition decision." A transfer
 * refusal is the opposite situation -- the object IS present in the corpus and the TRANSFER between
 * two fields is what cannot be evaluated -- and no acquisition fixes it. Widening `not-found` to
 * cover it would put two different owners behind one code, which is precisely the failure section 5
 * spends its longest clause preventing for `excluded`: a code must not tell the reader that the
 * corpus is empty when it is not, and must not route a repair to somebody who cannot make it.
 *
 * So: a seventh code, and the set stays closed. classifyQuestion() still throws on any code outside
 * this array, which is the property that matters and which a widening would have preserved equally.
 *
 * OWED, AND ROUTED. This array is the implementation; the authority is answer_contract.md section 5,
 * which is frozen at version 2 and is not in my write set. The exact table row, the section 9
 * version bump to 3, and the oracle/question_classes.json refusal_codes edit are routed with their
 * text written out. Until they land, assertContractSets() below REPORTS the difference by name
 * rather than throwing on it -- because the direction that can do damage is an UNKNOWN code
 * arriving, not a known code not yet written down, and those two directions are checked separately.
 */
const REASON_CODES = ['excluded', 'not-found', 'unbuildable', 'axis-incomplete', 'misclassified',
                      'input-missing', 'transfer-unevaluable'];

const RETRIEVAL_MODES = ['CONTESTED', 'APP', 'REFUSE', 'LITERATURE'];

/* --- register loading -------------------------------------------------------------------------- */

/* The field a register file's axes belong to. Read off the file's own H row basis_root rather than
   off the filename, because the filename is a convention and the H row is a declaration. */
const ROOT_FIELD = { lunar: 'lunar', economics: 'economics' };

function loadRegister(registerPath, fieldHint) {
  const text = fs.readFileSync(registerPath, 'utf8');
  const rows = text.split('\n').filter(Boolean).map(l => l.split('\t'));
  const head = rows.find(r => r[0] === 'H');
  if (!head) throw new Error('oracle/router/classify: ' + registerPath + ' carries no H row.');
  const declaredAxes = Number(head[4]), declaredMembers = Number(head[5]);

  const axes = new Map();
  for (const r of rows) {
    if (r[0] !== 'A') continue;
    const [, axis_id, cls, match_keys, scope_token, axis_statement, app_surface, probe_pos, probe_neg] = r;
    axes.set(axis_id, {
      axis_id, class: cls,
      match_keys: match_keys.split(',').map(s => s.trim()).filter(Boolean),
      scope_token, axis_statement,
      app_surface: (app_surface && app_surface !== '-') ? app_surface.split(',').map(s => s.trim()) : [],
      probe_pos, probe_neg,
      field: fieldHint, source: registerPath,
      sides: new Map(),
    });
  }
  let memberCount = 0;
  for (const r of rows) {
    if (r[0] !== 'M') continue;
    const [, axis_id, side, leaf, position] = r;
    memberCount++;
    const ax = axes.get(axis_id);
    if (!ax) throw new Error('oracle/router/classify: ' + registerPath + ' M row names axis ' +
      axis_id + ', which has no A row.');
    if (!ax.sides.has(side)) ax.sides.set(side, []);
    ax.sides.get(side).push({ leaf, position });
  }

  /* The file declares its own size; a row lost to a bad splice is detectable by counting. */
  if (axes.size !== declaredAxes || memberCount !== declaredMembers) {
    throw new Error('oracle/router/classify: ' + registerPath + ' H row declares ' + declaredAxes +
      ' axes and ' + declaredMembers + ' members; the parse found ' + axes.size + ' and ' +
      memberCount + '. Refusing to classify against a register that disagrees with itself.');
  }
  return axes;
}

/* --- the axis firing rule ----------------------------------------------------------------------- */

/* IDF-weighted MASS, not fraction: one rare key should fire alone and two corpus-ubiquitous keys
   should not fire together (oracle/register_schema.md section 4.3). IDF comes from the retrieval
   layer's FIELD-SCOPED tables, scoped to the axis's own field -- loose end B3. A pooled table would
   score an economics axis's keys against a corpus that is 73% lunar. */
function axisMass(ctx, axis, questionTokens) {
  const qs = new Set(questionTokens);
  const hits = axis.match_keys.filter(k => qs.has(k));
  let mass = 0;
  for (const k of hits) mass += LIT.idfFor(ctx.litDir, axis.field, k);
  return { mass, hits };
}

/* --- context ------------------------------------------------------------------------------------ */

function loadContext(opts) {
  opts = opts || {};
  const root = opts.root || path.resolve(__dirname, '..', '..');
  const rel = (p) => path.isAbsolute(p) ? p : path.join(root, p);

  const ctx = { root, missing: [] };

  ctx.appPath = rel(opts.appPath || path.join('lsei', 'index.html'));
  ctx.litDir = rel(opts.litDir || 'literature');
  ctx.excludedNodesPath = rel(opts.excludedNodesPath || path.join('oracle', 'router', 'excluded_nodes.json'));
  ctx.thresholdPath = rel(opts.thresholdPath || path.join('oracle', 'router', 'axis_threshold.json'));
  ctx.thinPatchesPath = rel(opts.thinPatchesPath || path.join('oracle', 'thin_patches.json'));
  ctx.thinThresholdPath = rel(opts.thinThresholdPath || path.join('oracle', 'router', 'thin_threshold.json'));
  if (!fs.existsSync(ctx.thinPatchesPath)) ctx.missing.push('the thin-patch register at ' + ctx.thinPatchesPath);

  if (!fs.existsSync(ctx.appPath)) ctx.missing.push('the app at ' + ctx.appPath);
  if (!fs.existsSync(ctx.litDir)) ctx.missing.push('the shelf at ' + ctx.litDir);
  if (!fs.existsSync(ctx.excludedNodesPath)) ctx.missing.push('the excluded-node artifact at ' + ctx.excludedNodesPath);

  /* K: read, never defaulted. */
  if (opts.K != null) {
    ctx.K = opts.K;
    ctx.K_provenance = 'passed by the caller';
  } else if (fs.existsSync(ctx.thresholdPath)) {
    const t = JSON.parse(fs.readFileSync(ctx.thresholdPath, 'utf8'));
    ctx.K = t.K;
    ctx.K_provenance = t.provenance || ctx.thresholdPath;
    ctx.K_status = t.status || null;
  } else {
    ctx.missing.push('the axis firing threshold K (oracle/register_schema.md section 4.3 assigns it to sub-step 3.6)');
  }

  if (ctx.missing.length) {
    ctx.refuse = { verdict: 'REFUSE', reason_code: 'input-missing', missing: ctx.missing.slice() };
    return ctx;
  }

  ctx.surface = loadAppSurface(ctx.appPath);
  ctx.excluded = loadExcludedNodes(ctx.excludedNodesPath);
  ctx.excludedBySlug = new Map(ctx.excluded.nodes.map(n => [n.slug, n]));

  /* THE THIN-PATCH REGISTER, AND ITS TWO THRESHOLDS, READ RATHER THAN TYPED.
   *
   * The register is sub-step 3.5's; the two tiers and the measured bands are its author's; the
   * VALUES are this seat's to set, on the same footing as K. They live in an artifact so that
   * replacing one is a data edit, and an absent artifact refuses input-missing before
   * classification rather than defaulting.
   *
   * A default here would be worse than a default for K. An unset K makes CONTESTED unreachable,
   * which is visible as a distribution with no CONTESTED rows in it. A wrong govern threshold
   * silently converts CORRECT ANSWERS INTO REFUSALS, and this sub-step has already had one band --
   * (1.86, 3.78], measured on five control rows -- that would have flipped SRQ-10 from BOTH and
   * LCC-14 from CONTESTED. It looked well-measured. The five rows simply did not contain the two
   * that constrain the answer. */
  ctx.thinPatches = TP.loadThinPatches(ctx.thinPatchesPath);
  if (opts.thinFire != null || opts.thinGovern != null) {
    ctx.thinFire = opts.thinFire != null ? opts.thinFire : Infinity;
    ctx.thinGovern = opts.thinGovern != null ? opts.thinGovern : Infinity;
    ctx.thin_provenance = 'passed by the caller (calibration run)';
  } else if (fs.existsSync(ctx.thinThresholdPath)) {
    const t = JSON.parse(fs.readFileSync(ctx.thinThresholdPath, 'utf8'));
    ctx.thinFire = t.fire_threshold;
    ctx.thinGovern = t.govern_threshold;
    ctx.thin_provenance = t.provenance || ctx.thinThresholdPath;
    ctx.thin_status = t.status || null;
  } else {
    ctx.missing.push('the thin-patch thresholds (oracle/router/thin_threshold.json; run oracle/router/calibrate_thin.js --write)');
  }
  if (ctx.missing.length) {
    ctx.refuse = { verdict: 'REFUSE', reason_code: 'input-missing', missing: ctx.missing.slice() };
    return ctx;
  }


  ctx.axes = new Map();
  for (const [file, field] of [['oracle/REGISTER.lunar.tsv', ROOT_FIELD.lunar],
                               ['oracle/REGISTER.econ.tsv', ROOT_FIELD.economics]]) {
    const p = rel(file);
    if (!fs.existsSync(p)) continue;
    for (const [id, ax] of loadRegister(p, field)) {
      if (ctx.axes.has(id)) throw new Error('oracle/router/classify: axis id ' + id + ' occurs in two register files.');
      ctx.axes.set(id, ax);
    }
  }

  ctx.questionClassesPath = rel(opts.questionClassesPath || path.join('oracle', 'question_classes.json'));
  ctx.questionClasses = fs.existsSync(ctx.questionClassesPath)
    ? JSON.parse(fs.readFileSync(ctx.questionClassesPath, 'utf8')) : null;

  /* The closed sets this router executes against must be the ones the deliverables were authored
     against. A verdict list that has drifted between two files is a fork of the contract. */
  if (ctx.questionClasses) {
    const qv = ctx.questionClasses.verdicts || [];
    if (qv.length && qv.slice().sort().join(',') !== VERDICTS.slice().sort().join(',')) {
      throw new Error('oracle/router/classify: question_classes.json carries a different verdict set ' +
        'than this file. [' + qv.join(',') + '] vs [' + VERDICTS.join(',') + '].');
    }
    /* THE TWO DIRECTIONS ARE NOT THE SAME FAILURE AND ARE NOT CHECKED THE SAME WAY.
     *
     * A code in the contract-bearing artifact that this file does not implement is an UNKNOWN CODE
     * ARRIVING: the router would emit or accept something it has no branch for. That is a fork and
     * it throws.
     *
     * A code this file implements that the artifact has not yet written down is an OWED CONTRACT
     * ROW. It is real, it is routed, and it does damage only by being forgotten -- so it is named
     * on ctx and reported, not thrown. Throwing here would block the transfer gate on a document
     * edit in another seat's write set, which is the barrier the wave structure exists to remove.
     * `transfer-unevaluable` is the one such code today. */
    const qr = ctx.questionClasses.refusal_codes || [];
    const unknown = qr.filter(c => !REASON_CODES.includes(c));
    if (unknown.length) {
      throw new Error('oracle/router/classify: question_classes.json carries reason code(s) this ' +
        'router does not implement: ' + unknown.join(', ') + '. An unknown code arriving is a fork ' +
        'of the closed set, not a drift in it.');
    }
    ctx.owed_contract_codes = REASON_CODES.filter(c => qr.length && !qr.includes(c));
  }

  /* K1 TOKEN FORM over every literal this router compares against tokenizer output. Three silent
     failure classes -- hyphenated, uppercase, and tokenizing to nothing -- and a literal in any of
     them can never match, so the register carrying it is inert while every test passes green.
     Reported on ctx rather than thrown: these are other seats' registers, and a router that
     refuses to start because somebody else's key is hyphenated is a router nobody can run. */
  ctx.token_form_failures = []
    .concat(TP.checkTokenForms(ctx.thinPatches.patches.flatMap(p => p.trigger_tokens || []), 'thin_patches.trigger_tokens'))
    .concat(TP.checkTokenForms([...ctx.axes.values()].flatMap(a => a.match_keys || []), 'REGISTER.match_keys'))
    .concat(TP.checkTokenForms(ctx.excluded.nodes.flatMap(n => n.match_keys || []), 'excluded_nodes.match_keys'));

  ctx.fieldMap = null;
  return ctx;
}

/* --- decomposition ------------------------------------------------------------------------------
 * Carried over from the prototype unchanged in behaviour. It is a heuristic front end and is named
 * as one; what carries the guarantees is the resolution test each candidate sub-claim is put
 * through afterward, which is mechanical. Rewriting it was not in this sub-step and inventing a
 * different heuristic would have moved every fixture for no measured reason. */
/* A continuation clause, not a second sub-claim. The prototype's test is a bare anaphoric pronoun
   subject ("what did IT conclude"); this adds the two definite noun phrases that are anaphoric to
   the same antecedent in every question this system will ever see -- "the model" and "the app".
   The test stays syntactic: does the clause introduce its OWN noun-phrase subject. "why does THE
   MODEL take a minimum of two limits" introduces none; it continues whatever the first clause was
   asking the model. Splitting it anyway sends a clause with no scenario to the shelf, which turns
   a two-grade APP answer -- a computed label plus the app's own stored prose -- into a BOTH answer
   whose second half comes from a summary. That is the authority rule failing quietly. */
const PRONOUN_CONTINUATION = /^(what|why|how)\s+(did|does|is|would|will|could|should)\s+(it|that|this|they|the\s+(model|app))\b/i;

function decomposeSubClaims(questionText) {
  const semiParts = String(questionText).split(';').map(s => s.trim()).filter(Boolean);
  const context = semiParts.length > 1 ? semiParts.slice(0, -1).join('; ') : '';
  const questionPart = semiParts[semiParts.length - 1] || '';
  const raw = questionPart
    .split(/,\s*and\s+(?=what\b|why\b|how\b|does\b|is\b|did\b|would\b|will\b|which\b)/i)
    .map(s => s.trim()).filter(Boolean);
  const pieces = [];
  for (const piece of raw) {
    if (pieces.length > 0 && PRONOUN_CONTINUATION.test(piece)) {
      pieces[pieces.length - 1] = pieces[pieces.length - 1].replace(/[?.]?$/, '') + ', and ' + piece;
    } else pieces.push(piece);
  }
  if (pieces.length === 0) pieces.push(questionPart);
  return pieces.map(p => ({ own: p, full: context ? context + '. ' + p : p }));
}

/* --- the app path -------------------------------------------------------------------------------
 *
 * THE OUTPUT NAMESPACE IS 45 KEYS AND EVERY ONE IS ADDRESSABLE (loose ends C1 and C2). Two routes,
 * and the second is the fix:
 *
 *   1. the phrase lexicon, a small hand-built alias table, every target of which is checked against
 *      the derived namespace at load;
 *   2. the key's own identifier as a whole token in the sub-claim.
 *
 * Route 2 is what makes the namespace closed rather than eight keys wide. It costs nothing, it
 * cannot go stale, and a key reachable only by route 2 is REPORTED by lexiconCoverage() rather than
 * being silently absent, which is exactly what C2 was.
 */
const OUTPUT_ALIASES = [
  [/\bwater output\b|\bwater yield(?!\s+model)\b|\btonnes? of water\b/i, 'water'],
  [/\bbinding constraint\b|\bwhat binds\b|\bbinding regime\b/i, 'binding'],
  [/\bice fraction\b|\bice concentration\b|\bice content\b|\bice assumption\b|\bregolith ice\b/i, 'ice'],
  [/\bconstruction potential\b/i, 'constructionPotential'],
  [/\bconstruction\b/i, 'construction'],
  [/\bfeasib(le|ility)\b/i, 'feasible'],
  [/\bphi[_ ]?c\b|\bconstruction share\b/i, 'phi_c'],
  [/\bregolith\b(?!.*\bice\b)/i, 'regolith'],
  /* The value half, unreachable through the prototype's door at all (C1). */
  [/\bpayback ratio\b|\bplant[- ]mass payback\b/i, 'r_prop'],
  [/\bmargin\b.*\bpropellant\b|\bpropellant margin\b/i, 'margin_prop'],
  [/\bmargin\b.*\bconstruction\b|\bconstruction margin\b/i, 'margin_const'],
  [/\bnet value\b|\bvalue per year\b|\bannual value\b/i, 'value_prop'],
  [/\bcrossover\b|\bbreak[- ]?even\b|\bd ?star\b/i, 'Dstar_prop'],
  [/\bproduct ranking\b|\branking factor\b/i, 'ranking'],
  [/\bproduction cost\b|\blocal production cost\b/i, 'P_prop'],
  [/\blanded cost\b|\bdelivery cost\b|\bdelivered cost\b/i, 'D'],
];

/* The prototype's list plus three shapes it misses, each measured against a fixture rather than
   imagined: "across the ice DETENT RAIL" (the prototype required the word "full" before it),
   "how does X change ACROSS/OVER/WITH Y" (it required "as"), and "as a function of". A sweep the
   router does not recognise is answered as a scalar at one detent, which returns one number to a
   question that asked for a curve -- and returns it as APP, so nothing downstream can tell. */
const SWEEP_LANGUAGE = /\bswept?\b|\bsweep\b|\bdetent rail\b|\bacross its full\b|\bacross the .*\brail\b|\bhow does .* (change|vary|move) (as|across|over|with)\b|\bas a function of\b|\bvaries?\b|\bsensitiv/i;

const KNOB_ALIASES = [
  [/\bconstruction share\b|\bphi[_ ]?c\b/i, 'phi_c'],
  [/\bice fraction\b|\bice knob\b|\bice grade\b/i, 'ice'],
  [/\bpower rail\b|\bpower knob\b|\bpower detent\b|\bpower budget\b/i, 'power'],
  [/\bmass rail\b|\bmass knob\b|\bmass detent\b|\blanded mass\b/i, 'mass'],
  [/\blanded cost\b|\bdelivery cost\b|\bcost ladder\b/i, 'landed_cost'],
];

/* Every alias target is checked against the derived namespace at load time. A stale alias is a
   loud failure here rather than a silent misroute at answer time -- the posture the prototype
   already took toward its own lexicon and could not take toward the keys it omitted. */
function lexiconCoverage(surface) {
  const byAlias = new Set();
  const unknown = [];
  for (const [, key] of OUTPUT_ALIASES) {
    if (!surface.outputs.has(key)) unknown.push(key); else byAlias.add(key);
  }
  const identifierOnly = [...surface.outputs.keys()].filter(k => !byAlias.has(k)).sort();
  return { namespace: surface.outputs.size, byAlias: [...byAlias].sort(), identifierOnly, unknown };
}

function wholeTokenPresent(text, token) {
  return new RegExp('(^|[^A-Za-z0-9_])' + token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
                    '([^A-Za-z0-9_]|$)').test(text);
}

function findOutputs(surface, text) {
  const hits = [];
  for (const [re, key] of OUTPUT_ALIASES) {
    if (re.test(text) && !hits.includes(key) && surface.outputs.has(key)) hits.push(key);
  }
  for (const key of surface.outputs.keys()) {
    if (!hits.includes(key) && wholeTokenPresent(text, key)) hits.push(key);
  }
  return hits;
}

function findScenario(surface, text) {
  const lower = String(text).toLowerCase();
  for (const key of Object.keys(surface.PRESETS)) {
    if (lower.includes(surface.PRESETS[key].label.toLowerCase())) return key;
  }
  return null;
}

function findPhase(surface, text) {
  const lower = String(text).toLowerCase();
  for (const phase of surface.phases) {
    const era = (surface.eraNames[phase] || '').toLowerCase();
    if (era && lower.includes(era)) return phase;
    if (lower.includes(phase)) return phase;
  }
  return null;
}

/* Two routes, exactly as for outputs, and for the same reason. The alias table is a convenience;
   the DETENTS key's own identifier as a whole token is what makes the knob namespace CLOSED. The
   prototype had aliases only, so "across the ice detent rail" -- which names the knob by its own
   name -- found no knob and returned `unbuildable` on an address that resolves perfectly. A phrase
   table that must anticipate every wording is the C2 defect wearing a different hat. */
function findKnob(surface, text) {
  for (const [re, knob] of KNOB_ALIASES) if (re.test(text)) return knob;
  for (const knob of Object.keys(surface.DETENTS)) if (wholeTokenPresent(text, knob)) return knob;
  return null;
}

function findLandedCost(surface, text) {
  const rail = A.railFor(surface, 'landed_cost');
  const nums = (String(text).match(/[0-9][0-9,]*/g) || []).map(s => Number(s.replace(/,/g, '')));
  for (const n of nums) if (rail.includes(n)) return n;
  return null;
}

/* --- the coefficient route ----------------------------------------------------------------------
 *
 * A fourth app surface, and it is what makes BOTH reachable at all. CONFIG and VALUE are the app's
 * own coefficient registers: thirteen and six entries, each carrying a value, a unit, a status and
 * the app's own source sentence. "Where does the app's transmission coefficient of 10 kg/kWe/km
 * come from" names no scenario and no model() output, so the address grammar returns nothing and
 * the prototype sends it to the shelf -- which answers a question about the APP from a summary.
 *
 * The match is mechanical: the coefficient's own key as a whole token, or the coefficient's own
 * unit string verbatim. Keys shorter than two characters are excluded, because `L` and `H` as bare
 * tokens match ordinary English. Nothing here is a phrase table.
 *
 * The verdict is BOTH rather than APP, and that is the contract rather than a preference: the app
 * says what the coefficient IS and with what status, and the shelf says where the number came from.
 * Two distinct questions, which is answer contract section 1's own condition for BOTH. One
 * retrieval mode, one verdict.
 */
function findCoefficients(surface, text) {
  const hits = [];
  for (const [reg, table] of [['CONFIG', surface.CONFIG || {}], ['VALUE', surface.VALUE || {}]]) {
    for (const key of Object.keys(table)) {
      const c = table[key];
      const byKey = key.length >= 2 && wholeTokenPresent(text, key);
      const byUnit = c && c.unit && String(c.unit).length >= 4 && text.includes(c.unit);
      if (!byKey && !byUnit) continue;
      hits.push({ key, register: reg, value: c.value, unit: c.unit, status: c.status,
                  source: c.source, claims: c.claims || [], matched_on: byKey ? 'key' : 'unit' });
    }
  }
  return hits;
}

/* Returns one of:
     null                        the sub-claim is not app-shaped at all
     { form:'scalar' ... }       APP
     { form:'sweep' ... }        FIGURE
     { form:'coefficient' ... }  BOTH
     { unbuildable, reason }     REFUSE unbuildable -- NEVER falls through to a shelf search */
function tryAppPath(surface, text) {
  const scenarioKey = findScenario(surface, text);
  if (!scenarioKey) return coefficientPath(surface, text);
  const outputs = findOutputs(surface, text);
  if (outputs.length === 0) return coefficientPath(surface, text);

  const scenario = surface.PRESETS[scenarioKey].label;
  const phase = findPhase(surface, text) || surface.phases[0];
  const landed_cost = findLandedCost(surface, text);
  const output = outputs[0];
  const spec = surface.outputs.get(output);

  const sweepAsked = SWEEP_LANGUAGE.test(text);
  const knob = findKnob(surface, text);

  if (sweepAsked) {
    if (!knob) {
      return { unbuildable: true, reason: 'the sub-claim asks for a sweep ("' +
        (text.match(SWEEP_LANGUAGE) || [''])[0] + '") and names no knob this Oracle can sweep. ' +
        'DETENTS holds: ' + Object.keys(surface.DETENTS).join(', ') + '.' };
    }
    try {
      const resolved = A.knobSweep(surface, { scenario, phase, output, knob, landed_cost });
      return { form: 'sweep', resolved, output, spec, scenarioKey, phase, knob, landed_cost };
    } catch (e) {
      if (e.code === A.ERR.LANDED_COST_UNBOUND) {
        /* A value output swept on a non-cost knob still needs a D. Two unbound dimensions is not a
           figure this grammar draws, and guessing one of them is the thing this file will not do. */
        return { unbuildable: true, reason: e.message };
      }
      return { unbuildable: true, reason: e.message };
    }
  }

  try {
    const resolved = A.singlePoint(surface, { scenario, phase, output, landed_cost });
    /* The binding-regime narrative rides along whenever `binding` was matched. The label is a
       model() output and is recompute-verified; the structural why is DERIVATION.notes, which is a
       stored field and is resolution-only. TWO FACTS, TWO GRADES, ONE SUB-CLAIM. Dropping the note
       does not lose a sentence, it sends the "why" half to the shelf, where the app's own answer to
       a question about the app is replaced by a summary's. */
    let note = null;
    if (output === 'binding' && surface.regimeNoteKeyForBinding) {
      const args = A.scenarioArgs(surface, scenarioKey, phase);
      const noteKey = surface.regimeNoteKeyForBinding(surface.model(args).binding);
      const n = noteKey && surface.DERIVATION.notes ? surface.DERIVATION.notes[noteKey] : null;
      if (n) {
        const unresolved = (n.claims || []).filter(c => !(surface.SLUGS && surface.SLUGS[c]));
        note = { noteKey, text: n.text, claims: n.claims || [], grade: 'resolution-only',
                 tracesResolve: unresolved.length === 0, unresolvedClaims: unresolved };
      }
    }
    return { form: 'scalar', resolved, output, spec, scenarioKey, phase, landed_cost, note };
  } catch (e) {
    /* THE ONE UNBOUND DIMENSION IS A FIGURE, NOT A REFUSAL. Answer contract section 1: FIGURE is
       "an app address resolved with one dimension unbound, so more than one call into the model".
       A value output with no landed cost named is exactly that, and the app's own DETENTS rail is
       what it sweeps. This is the branch that would otherwise have defaulted a D. */
    if (e.code === A.ERR.LANDED_COST_UNBOUND) {
      const resolved = A.knobSweep(surface, { scenario, phase, output, knob: 'landed_cost' });
      return { form: 'sweep', resolved, output, spec, scenarioKey, phase, knob: 'landed_cost',
               unbound: 'landed_cost' };
    }
    return { unbuildable: true, reason: e.message };
  }
}

function coefficientPath(surface, text) {
  const coefficients = findCoefficients(surface, text);
  if (coefficients.length === 0) return null;
  return { form: 'coefficient', coefficients };
}

/* --- per-sub-claim classification ---------------------------------------------------------------- */

function classifySubClaim(ctx, subClaim) {
  const piece = (typeof subClaim === 'string') ? { own: subClaim, full: subClaim } : subClaim;
  const out = {
    text: piece.own, mode: null, verdict: null, reason_code: null,
    axis: null, app: null, exclusion: null, field: null, evidence: {},
  };

  /* MODE 1 -- CONTESTED. The register, at classification time. */
  const tokens = LIT.tokenize(piece.own);

  /* THE THIN-PATCH MATCH IS COMPUTED HERE, BEFORE ANY MODE RESOLVES, for one reason: a patch that
     FIRES attaches its substitution to whatever answer results, including a CONTESTED or a BOTH.
     T3 fires on SRQ-10, which is BOTH, and its own Must-carry cell requires the substitution to be
     delivered there. Computing it inside the refusal branch would attach it only to refusals, which
     is the one verdict that needs it least. */
  const thin = TP.matchThinPatches(ctx, piece.own);
  out.thin = {
    fired: thin.fired.map(f => TP.substitutionRecord(f)),
    governing: thin.governing.map(g => g.id),
    max_mass: thin.scored.length ? Number(thin.scored[0].mass.toFixed(3)) : 0,
    top: thin.scored.length ? thin.scored[0].id : null,
  };
  out.evidence.thin = { fire_threshold: ctx.thinFire, govern_threshold: ctx.thinGovern,
    scored: thin.scored.map(x => x.id + '=' + x.mass.toFixed(3)) };
  const fired = [];
  for (const ax of ctx.axes.values()) {
    const { mass, hits } = axisMass(ctx, ax, tokens);
    if (mass >= ctx.K && hits.length > 0) fired.push({ ax, mass, hits });
  }
  fired.sort((a, b) => b.mass - a.mass);
  out.evidence.axes_fired = fired.map(f => ({ axis_id: f.ax.axis_id, mass: Number(f.mass.toFixed(3)), keys: f.hits }));

  if (fired.length) {
    const top = fired[0].ax;
    /* A one_sided axis never produces CONTESTED: it has one side, Rule V wants one literature
       trace per side over at least two sides, and such a run is UNSATISFIABLE rather than wrong.
       Answer contract section 1 rules it to LITERATURE or BOTH. */
    if (top.class === 'one_sided') {
      out.mode = 'LITERATURE';
      out.verdict = 'LITERATURE';
      out.field = top.field;
      out.axis = axisView(top);
      out.evidence.one_sided_disclosure = true;
      return out;
    }
    out.mode = 'CONTESTED';
    out.field = top.field;
    out.axis = axisView(top);
    /* A two_sided or false_pair axis with fewer than two sides is UNSATISFIABLE under Rule V --
       one literature trace per side over at least two sides -- rather than answerable with one.
       Answer contract section 1 says so about one_sided in its own words, and the same reasoning
       applies to an axis whose class promises sides its M rows do not carry. That is a broken
       register row, which is what axis-incomplete routes to. */
    if (out.axis.sides.length < 2) {
      out.verdict = 'REFUSE';
      out.reason_code = 'axis-incomplete';
      out.evidence.side_count = out.axis.sides.length;
      return out;
    }
    /* SIDES ARE RESOLVED BY PATH AGAINST literature/INDEX.tsv, NEVER THROUGH RETRIEVAL, and the
       resolved side count is asserted equal to the declared side count.
     *
     * Two measured findings force this and they compound. (1) Retrieval cannot reach every register
     * member at any threshold: on fixture X-01 the scored pool holds 38 candidates and
     * henderson-2008-myth-of-miti.md is not among them -- absent from the pool, not below the bar --
     * while beason-1996-targeting-japan.md, the other side of the same pair, is present. Six of 37
     * targets, about 16%, are unreachable at any threshold. (2) Seven of the twenty-two two_sided
     * axes carry three or four sides rather than two: LCC-01, LCC-03, LCC-04, LCC-07, LCC-09,
     * LCC-12, ECR-13.
     *
     * Sourced from retrieval, a CONTESTED answer therefore drops sides for two unrelated reasons at
     * once and the reader sees a dispute with a side missing and nothing saying one is missing. The
     * register already knows its member paths. A member that does not resolve is a HARD ERROR --
     * axis-incomplete, owner a broken register row -- and never a quietly shorter dispute. */
    const unresolved = [];
    const resolvedSides = new Set();
    for (const [side, members] of top.sides) {
      for (const m of members) {
        const hit = indexPathFor(ctx, m.leaf);
        if (hit) { m.path = hit; resolvedSides.add(side); }
        else unresolved.push(side + ':' + m.leaf);
      }
    }
    const declaredSides = [...top.sides.keys()];
    if (unresolved.length || resolvedSides.size !== declaredSides.length) {
      out.verdict = 'REFUSE';
      out.reason_code = 'axis-incomplete';
      out.evidence.unresolved_members = unresolved;
      out.evidence.sides_declared = declaredSides.length;
      out.evidence.sides_resolved = resolvedSides.size;
      out.axis = axisView(top);
      return out;
    }
    out.axis = axisView(top);
    out.verdict = 'CONTESTED';
    return out;
  }

  /* MODE 2 -- APP. */
  const app = tryAppPath(ctx.surface, piece.full);
  if (app) {
    out.mode = 'APP';
    if (app.unbuildable) {
      out.verdict = 'REFUSE';
      out.reason_code = 'unbuildable';
      out.evidence.unbuildable_reason = app.reason;
      return out;
    }
    if (app.form === 'coefficient') {
      out.app = { form: 'coefficient', coefficients: app.coefficients };
      /* BOTH, per answer contract section 1: the app says what the coefficient IS and with what
         status; the shelf says where the number came from. Two distinct questions. The app fact is
         first and the shelf figure is never folded in as a second app sentence. */
      out.verdict = 'BOTH';
      out.field = 'lunar';
      return out;
    }
    out.app = {
      form: app.form,
      resolvedAddress: app.resolved.resolvedAddress,
      slugsAddressed: app.resolved.slugsAddressed,
      points: app.resolved.points,
      unbound: app.unbound || null,
      note: app.note || null,
    };
    out.verdict = app.form === 'sweep' ? 'FIGURE' : 'APP';
    return out;
  }

  /* MODE 3 -- REFUSE, via the app's own EXCLUSIONS and the three outcomes of sub-step 3.4. */
  const cands = X.matchExclusions(ctx.surface, piece.own, ctx.excludedBySlug);
  const band = X.topBand(cands);
  if (band.length && band[0].overlap >= 2) {
    const node = ctx.excludedBySlug.get(band[0].key);
    const v = X.verdictForOutcome(node.outcome, node);
    out.mode = v.verdict === 'REFUSE' ? 'REFUSE' : 'LITERATURE';
    out.verdict = v.verdict;
    out.reason_code = v.reason_code;
    out.field = 'lunar';
    out.exclusion = { node, outcome: node.outcome, candidate: band[0], tied: band.map(b => b.key), why: v.why };
    out.evidence.exclusion_overlap = band[0].overlap;
    return out;
  }

  /* MODE 3b -- REFUSE, via the thin-patch register. BEFORE RETRIEVAL, which is sub-step 3.3's
     specification and the whole point of the register: a question landing in a thin patch must not
     answer from the nearest word-overlap match. SRQ-13 is why the obvious precondition -- govern
     only where no competing route answered -- is wrong and was refuted rather than re-derived: it
     returns LITERATURE confirmed 9 of 9 at frac 0.85, so that rule would block T1 on the one row it
     must govern. Retrieval being confident is the symptom, not the licence.

     It sits AFTER the app and the register and the exclusions, and BEFORE the shelf. A patch says a
     specific MEASUREMENT is absent; it does not say the app cannot compute something, and it does
     not settle a disagreement the register already records. Where the app answers, the patch is
     irrelevant; where the register records a dispute, the dispute is the answer. */
  if (thin.governing.length) {
    const g = thin.governing[0];
    out.mode = 'REFUSE';
    out.verdict = 'REFUSE';
    out.reason_code = g.patch.refusal_code || 'not-found';
    out.thin_patch = TP.substitutionRecord(g);
    out.field = 'lunar';
    out.evidence.thin_governed = g.id + ' at mass ' + g.mass.toFixed(3) + ' >= ' + ctx.thinGovern;
    return out;
  }

  /* MODE 4 -- LITERATURE. The shelf is searched HERE and nowhere earlier. */
  out.mode = 'LITERATURE';
  const search = LIT.searchLiterature(ctx.litDir, piece.own, { limit: 5 });
  out.evidence.search = {
    scored: search.scoredCount, returned: (search.candidates || []).length,
    confirmed: (search.confirmedSet || []).length,
    best: search.best ? search.best.filename : null,
    threshold: search.threshold,
  };
  if (search.best) {
    out.verdict = 'LITERATURE';
    out.field = search.best.field || null;
    return out;
  }
  /* A weaker exclusion hit, below the two-token bar, is not a verdict but it IS the refusal's
     nearest present object (answer contract section 5's three nouns, and its rule that a code
     routing to nobody must never mask a code routing to someone). */
  out.verdict = 'REFUSE';
  out.reason_code = 'not-found';
  if (band.length) out.exclusion = { node: ctx.excludedBySlug.get(band[0].key) || null, outcome: null, candidate: band[0], why: 'below the exclusion bar; carried as the refusal\'s nearest present object only' };
  return out;
}

function axisView(ax) {
  return {
    axis_id: ax.axis_id, class: ax.class, field: ax.field,
    axis_statement: ax.axis_statement, scope_token: ax.scope_token,
    sides: [...ax.sides.keys()].sort(),
    /* Paths, not bare leaves. A persona brief that names a leaf makes the persona resolve it, and
       a persona that resolves a name is a persona that can resolve the wrong one. */
    members: [...ax.sides.entries()].map(([side, ms]) =>
      ({ side, leaves: ms.map(m => m.leaf), paths: ms.map(m => m.path || null) })),
  };
}

/* THE CORPUS'S OWN INDEX IS THE AUTHORITY ON WHERE A LEAF LIVES, not a directory walk. INDEX.tsv is
   what the merge produced and what verify_corpus.js checks; a walk is a second opinion about the
   same tree that can disagree with it after a move and report a member present that the corpus does
   not index. */
function indexPathFor(ctx, leaf) {
  if (!ctx._indexLeaves) {
    ctx._indexLeaves = new Map();
    const p = path.join(ctx.root, 'literature', 'INDEX.tsv');
    if (!fs.existsSync(p)) {
      throw new Error('oracle/router/classify: literature/INDEX.tsv is absent, so no register ' +
        'member can be resolved by path. Refusing rather than falling back to a directory walk, ' +
        'which is a second authority on the same tree.');
    }
    const lines = fs.readFileSync(p, 'utf8').split('\n').filter(Boolean);
    for (const line of lines.slice(1)) {
      const c = line.split('\t');
      if (c.length < 1 || !c[0]) continue;
      ctx._indexLeaves.set(path.posix.basename(c[0]), c[0]);
    }
  }
  return ctx._indexLeaves.get(leaf) || null;
}

/* --- assertions ---------------------------------------------------------------------------------
 * "Never two modes for one sub-claim; never zero." A contract nothing asserts is a sentence. */
function assertOneMode(sub, questionText) {
  const where = ' [question: ' + JSON.stringify(questionText) + ' sub-claim: ' + JSON.stringify(sub.text) + ']';
  if (sub.mode == null) throw new Error('oracle/router/classify: sub-claim emitted ZERO retrieval modes' + where);
  if (!RETRIEVAL_MODES.includes(sub.mode)) throw new Error('oracle/router/classify: sub-claim emitted mode "' + sub.mode + '", outside the closed set' + where);
  if (Array.isArray(sub.mode)) throw new Error('oracle/router/classify: sub-claim emitted more than one mode' + where);
  if (sub.verdict == null) throw new Error('oracle/router/classify: sub-claim emitted ZERO verdicts' + where);
  if (!VERDICTS.includes(sub.verdict)) throw new Error('oracle/router/classify: sub-claim emitted verdict "' + sub.verdict + '", outside the closed six' + where);
  if (sub.verdict === 'REFUSE' && !REASON_CODES.includes(sub.reason_code)) {
    throw new Error('oracle/router/classify: a REFUSE sub-claim carries reason code ' +
      JSON.stringify(sub.reason_code) + ', outside the closed six' + where);
  }
  if (sub.verdict !== 'REFUSE' && sub.reason_code != null) {
    throw new Error('oracle/router/classify: a non-REFUSE sub-claim carries a reason code' + where);
  }
  return true;
}

/* --- composition --------------------------------------------------------------------------------
 * Answer contract section 1. all-APP -> APP (FIGURE where any sub-claim drew a figure); all-shelf
 * -> LITERATURE; a genuine mix of an app fact and a shelf fact answering two DISTINCT questions ->
 * BOTH; any CONTESTED sub-claim -> CONTESTED, because a disagreement does not stop being one
 * because something else in the question resolved; all refused -> REFUSE.
 */
function compose(subs) {
  const v = new Set(subs.map(s => s.verdict));
  if (v.has('CONTESTED')) return { verdict: 'CONTESTED', reason_code: null };
  if (v.size === 1) {
    const only = [...v][0];
    return { verdict: only, reason_code: only === 'REFUSE' ? dominantCode(subs) : null };
  }
  const answered = subs.filter(s => s.verdict !== 'REFUSE');
  if (answered.length === 0) return { verdict: 'REFUSE', reason_code: dominantCode(subs) };
  const appish = answered.some(s => s.verdict === 'APP' || s.verdict === 'FIGURE');
  const shelfish = answered.some(s => s.verdict === 'LITERATURE' || s.verdict === 'BOTH');
  if (appish && shelfish) return { verdict: 'BOTH', reason_code: null };
  if (appish) return { verdict: answered.some(s => s.verdict === 'FIGURE') ? 'FIGURE' : 'APP', reason_code: null };
  return { verdict: 'LITERATURE', reason_code: null };
}

/* Precedence among reason codes, answer contract section 5: `excluded` routes to nobody and must
   never mask a code that routes to someone, so it is written only when no other code applies. */
const CODE_PRECEDENCE = ['input-missing', 'misclassified', 'axis-incomplete', 'unbuildable', 'not-found', 'excluded'];
function dominantCode(subs) {
  const codes = new Set(subs.filter(s => s.verdict === 'REFUSE').map(s => s.reason_code));
  for (const c of CODE_PRECEDENCE) if (codes.has(c)) return c;
  return 'not-found';
}

function classifyQuestion(ctx, questionText) {
  if (ctx.refuse) {
    /* A missing input refuses BEFORE classification, with zero personas spent. Answer contract
       section 3: a refusal reached after the wave has run costs more than the answer it replaces. */
    return { questionText, subClaims: [], verdict: 'REFUSE', reason_code: 'input-missing',
             missing: ctx.refuse.missing, assertions: { every_subclaim_one_mode: true, every_subclaim_one_verdict: true } };
  }
  const pieces = decomposeSubClaims(questionText);
  const subClaims = pieces.map(p => classifySubClaim(ctx, p));
  for (const s of subClaims) assertOneMode(s, questionText);
  const c = compose(subClaims);
  return {
    questionText, subClaims,
    verdict: c.verdict, reason_code: c.reason_code,
    assertions: { every_subclaim_one_mode: true, every_subclaim_one_verdict: true, subclaims: subClaims.length },
  };
}

module.exports = {
  VERDICTS, REASON_CODES, RETRIEVAL_MODES, CODE_PRECEDENCE,
  OUTPUT_ALIASES, KNOB_ALIASES, SWEEP_LANGUAGE,
  loadContext, loadRegister, decomposeSubClaims, lexiconCoverage,
  findOutputs, findScenario, findPhase, findKnob, findCoefficients, tryAppPath, axisMass, indexPathFor,
  classifySubClaim, classifyQuestion, compose, assertOneMode,
};
