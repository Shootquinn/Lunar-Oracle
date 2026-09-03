/* oracle/router/classify.js -- the ROUTER. Sub-step 3.8, re-scoped at sub-step 8.1.
 *
 * THE TOOL REPORTS; THE SESSION RULES. Until 8.1 this file returned a verdict. It does not any
 * more. It returns an EVIDENCE REPORT -- what matched, at what mass, how far from the reference
 * mark, and what each score is worth -- and a reading session under oracle/answer_contract.md picks
 * one of the six verdicts from it.
 *
 * THE AUTHOR'S RULING, 2026-08-28, which is why:
 *
 *   "Have Claude think about stuff instead of trying to use algebra to run a fucking AI. Let it use
 *    your little tool to help inform itself but don't have it be how it chooses a verdict."
 *
 *   "I actually want the result of that tool to be a very low weight to Claude."
 *
 * THE PROOF THAT THE ALGEBRA WAS WRONG IS MEASURED, NOT ASSERTED. SRQ-12 asks "how much energy does
 * it take to produce a kilogram of oxygen on the Moon?". LCC-07 is an axis about oxygen production
 * energy. It scores 1.540 against a bar of 2.431 and, under the old file, was FILTERED OUT before
 * anything downstream could see it -- because the key that would have carried the mass reads `kwh`
 * and no reader writes "kwh". SRQ-8 is the same shape on `polar` against "pole", and worse: three
 * axes -- LCC-06, LCC-09, LCC-10 -- tie at EXACTLY 0.428 on the single shared key `power`. The
 * score cannot tell them apart. No reader misses either question. Only a scorer does.
 *
 * So the filter is gone. Every axis with at least one key hit is REPORTED, with its mass, the
 * reference mark, the signed margin, and a confidence that says in words what the number is worth.
 * A near-miss is evidence; the old file destroyed it.
 *
 * FIVE EVIDENCE CHANNELS, ALL FOUR OF THE NON-RETRIEVAL ONES COMPUTED FIRST, AND ALL OF THEM
 * REPORTED SIDE BY SIDE. The old file ran four modes in precedence order and stopped at the first
 * hit, so a question that resolved against the app never showed its register evidence and a
 * question that reached the shelf never showed its near-miss axes. Precedence WAS the decision.
 * It is gone with the decision. What survives from it is the ordering RULE that made it worth
 * having -- the four text-only channels (register, app grammar, exclusions, thin patches) are
 * computed from the sub-claim's own words BEFORE retrieval runs, retrieval runs exactly once, and
 * no channel is recomputed against what retrieval found. That rule is asserted, not arranged:
 * `retrieval.ran_after_text_channels` and `retrieval.runs` are on every report.
 *
 * THE SIX VERDICTS STAY CLOSED AND MOVE TO THE COMPOSING SESSION. VERDICTS and REASON_CODES are
 * still exported, still closed, and assertVerdict()/assertReasonCode() still throw on a value
 * outside them. What is deleted is the code that PICKED one. A session that rules a verdict passes
 * it through those assertions and into selectWave(verdict, ruling, ctx), which now takes the
 * verdict as an argument rather than reading one this file chose.
 *
 * LOW WEIGHT, STATED INLINE (sub-step 8.2). Every report carries FAILURE_MODES -- the kwh and polar
 * misses as worked examples with their measured numbers -- and RELIABILITY, which says in the
 * artifact that a non-match is weak evidence of absence and that the reader should override on
 * judgement. A caveat in a document the session may never open is not a caveat.
 *
 * THE CALIBRATED THRESHOLDS ARE REFERENCE MARKS, NOT GATES (sub-step 8.6). K (2.431), the thin fire
 * and govern tiers (1.7 / 6.175) are still READ, so that a margin can be reported. Nothing is
 * filtered by them and nothing is decided by them. An absent mark is no longer `input-missing`: it
 * is a report line saying margins are unavailable, because a tool that refuses to describe the
 * evidence because a number it no longer obeys is missing has the dependency backwards.
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
const RC = require('../reason_codes.js');

/* --- closed sets ------------------------------------------------------------------------------- */

/* THE CLOSED SIX. This file no longer picks one. It publishes the set a composing session picks
   FROM, and it keeps the machinery that throws on anything outside it -- because the property worth
   keeping was never "the router chose correctly", it was "nothing outside the six can ever be
   emitted by anybody". That property is now enforced at the session's boundary rather than at the
   router's, which is the only place it was ever really needed. */
const VERDICTS = ['APP', 'FIGURE', 'LITERATURE', 'BOTH', 'CONTESTED', 'REFUSE'];

/* SEVEN REASON CODES. `transfer-unevaluable` is the seventh and it is ruled here, at W4-2, on W4-4's
 * escalation from the transfer gate at 4.4.
 *
 * THE RULING, AND WHY IT IS NOT A WIDENING OF `not-found`. Answer contract section 5 gave the codes
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
 * ROUTED, AND LANDED AT STEP 48. The paragraph here used to say the routing was owed: the table row,
 * the version bump and the oracle/question_classes.json edit were written out and waiting, and
 * assertContractSets() below REPORTED the difference on ctx.owed_contract_codes rather than throwing
 * on it, because the direction that can do damage is an UNKNOWN code arriving and not a known code
 * not yet written down. All three landed. The contract's table carries the row and its section 9
 * version reads 5; question_classes.json's refusal_codes key is DELETED rather than corrected, and
 * the report channel that watched it went with the key, because a channel over an empty population
 * can never fire and is indistinguishable from one nobody wired. The verdicts half of that block is
 * a different set, is correct, and still throws.
 *
 * THIS COMMENT STAYS HERE AND THE DECLARATION DOES NOT. The ruling was made in this file at W4-2 and
 * the record of a ruling belongs where the ruling was made; the SET now lives one layer up, at
 * oracle/reason_codes.js, because an authority selected from among the consumers migrates to
 * whichever copy a seat last reasoned about, and a thing that moves is not an authority. Provenance
 * picks the content. It does not pick the location. classifyQuestion() still throws on any code
 * outside the array, which is the run-time property that matters, and it now sits over a derived one.
 */
const REASON_CODES = RC.CODES;

/* Precedence among reason codes, answer contract section 5: `excluded` routes to nobody and must
   never mask a code that routes to someone, so it is written only when no other code applies. The
   function that APPLIED this to pick a dominant code for a question is deleted with the rest of the
   decision surface; the ORDER survives, published on every report, because it is a statement in the
   contract about who owns a repair and a session ruling REFUSE needs it.
   DERIVED AT STEP 48 FOR THE SAME REASON THE SET IS. This was a second literal enumeration of the
   same table, in the same file, three lines below the one that had drifted -- and a sweep that
   computes its own population found it, which a list of the five known sites could not have. */
const CODE_PRECEDENCE = RC.CODE_PRECEDENCE;

/* THE FIVE EVIDENCE CHANNELS. These replace the four RETRIEVAL MODES, and the replacement is the
   whole of sub-step 8.1 in one line. A MODE was exclusive: one fired, the rest were never looked
   at, and which one fired WAS the decision. A CHANNEL is not exclusive: all five are computed for
   every sub-claim and all five are reported, so a session sees the register near-miss on a question
   that also resolves against the app. Nothing is suppressed by something else having matched. */
const EVIDENCE_CHANNELS = ['register', 'app', 'exclusions', 'thin_patches', 'retrieval'];

/* Retained under its old name because it is still the historical record of what the four exclusive
   modes were. Nothing in this file branches on it any more. */
const RETRIEVAL_MODES = ['CONTESTED', 'APP', 'REFUSE', 'LITERATURE'];

/* --- the assertion machinery on the closed sets, kept; the code that PICKED, deleted ------------
 *
 * A composing session that has ruled a verdict runs it through here. The throw is the same throw
 * assertOneMode() used to make; what changed is who is being checked. Before, the router checked
 * itself, which is the shape this project has already been bitten by twice -- the check register
 * that agreed with itself and had never been executed. Now the checker and the decider are
 * different agents, which is the only arrangement in which an assertion is worth anything. */
function assertVerdict(verdict, where) {
  const w = where ? ' [' + where + ']' : '';
  if (verdict == null) {
    throw new Error('oracle/router/classify: a ruling carries no verdict. The closed set is [' +
      VERDICTS.join(', ') + '] and the session must name one' + w);
  }
  if (typeof verdict !== 'string' || !VERDICTS.includes(verdict)) {
    throw new Error('oracle/router/classify: "' + verdict + '" is outside the closed six [' +
      VERDICTS.join(', ') + ']' + w);
  }
  return verdict;
}

function assertReasonCode(verdict, reason_code, where) {
  const w = where ? ' [' + where + ']' : '';
  if (verdict === 'REFUSE') {
    if (!REASON_CODES.includes(reason_code)) {
      throw new Error('oracle/router/classify: a REFUSE ruling carries reason code ' +
        JSON.stringify(reason_code) + ', outside the closed set [' + REASON_CODES.join(', ') + ']' + w);
    }
  } else if (reason_code != null) {
    throw new Error('oracle/router/classify: a ' + verdict + ' ruling carries a reason code, and ' +
      'only a refusal has one' + w);
  }
  return reason_code;
}

/* THE ONE-WAY VALVE. An evidence report that carries a verdict is a router that went back to
   deciding, and the way that happens is not a rewrite -- it is one convenience field added by
   somebody in a hurry. So it is asserted, on every report, on every run, by key name and at every
   depth. `closed_set` and `verdict_options` are the MENU and are allowed; a key literally named
   `verdict`, `reason_code` or `mode` is not. */
const FORBIDDEN_REPORT_KEYS = ['verdict', 'reason_code', 'mode', 'reasonCode'];
function assertNoVerdict(report, where) {
  const found = [];
  const seen = new Set();
  (function walk(node, pathStr) {
    if (node === null || typeof node !== 'object') return;
    if (seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, pathStr + '[' + i + ']')); return; }
    for (const k of Object.keys(node)) {
      if (FORBIDDEN_REPORT_KEYS.includes(k)) found.push(pathStr + '.' + k);
      walk(node[k], pathStr + '.' + k);
    }
  })(report, 'report');
  if (found.length) {
    throw new Error('oracle/router/classify: the evidence report carries decision field(s) ' +
      found.join(', ') + '. Sub-step 8.1: the tool reports, the session rules. A report that names ' +
      'a verdict has made the choice it exists to inform' + (where ? ' [' + where + ']' : ''));
  }
  return true;
}

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

  const ctx = { root, missing: [], reference_marks_absent: [] };

  /* THE `registerPaths` BUG, FIXED AT 8.1. This loader took `registerPaths` in the signature W4-2
     relayed and IGNORED IT in the body -- the register file list below was hard-coded. Three
     fault-injection decoys had to reach it by staging a whole fake `root` instead, which is a
     harness working around a defect rather than testing through an interface. It is honoured now,
     and the hard-coded pair is what it falls back to. */
  ctx.registerPaths = (opts.registerPaths && opts.registerPaths.length)
    ? opts.registerPaths.map(rel)
    : [rel(path.join('oracle', 'REGISTER.lunar.tsv')), rel(path.join('oracle', 'REGISTER.econ.tsv'))];

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

  /* K: READ, NEVER DEFAULTED, AND NO LONGER AN INPUT WHOSE ABSENCE REFUSES.
   *
   * Sub-step 8.6. K was the axis FIRING threshold and its absence made CONTESTED unreachable, which
   * is why an absent K used to refuse `input-missing` before classification. Under 8.1 K decides
   * nothing: it is a reference mark, present so that a mass can be reported with a signed margin
   * against the number that used to matter. An absent mark costs the margins and costs nothing
   * else, so it is a REPORT LINE and not a refusal. Refusing to describe the evidence because a
   * number the router no longer obeys is missing has the dependency backwards.
   *
   * `never defaulted` survives verbatim and is the half that still matters. A defaulted K would put
   * a margin in front of a reading session against a bar nobody chose, which is the C2 shape --
   * a routing input nobody can see -- wearing an advisory hat. */
  if (opts.K != null) {
    ctx.K = opts.K;
    ctx.K_provenance = 'passed by the caller';
  } else if (fs.existsSync(ctx.thresholdPath)) {
    const t = JSON.parse(fs.readFileSync(ctx.thresholdPath, 'utf8'));
    ctx.K = t.K;
    ctx.K_provenance = t.provenance || ctx.thresholdPath;
    ctx.K_status = t.status || null;
  } else {
    ctx.K = null;
    ctx.K_provenance = null;
    ctx.reference_marks_absent.push('K, the axis reference mark (' + ctx.thresholdPath + '). ' +
      'Axis masses are still reported; their margins are not.');
  }

  if (ctx.missing.length) {
    ctx.refuse = { verdict: 'REFUSE', reason_code: 'input-missing', missing: ctx.missing.slice() };
    return ctx;
  }

  ctx.surface = loadAppSurface(ctx.appPath);
  /* Probed once per context, against the app itself. See deriveOutputGrades() for why this is a
     probe and not a list. */
  ctx.outputGrades = deriveOutputGrades(ctx.surface);
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
    /* Same disposition as K, and for the same reason plus a sharper one. The govern tier was the
       number that could SILENTLY CONVERT A CORRECT ANSWER INTO A REFUSAL, and one band on this
       sub-step -- (1.86, 3.78], measured on five control rows -- did exactly that to six of them.
       A gate with that failure mode had to refuse rather than default. A reference mark with no
       power to refuse anything does not. */
    ctx.thinFire = null;
    ctx.thinGovern = null;
    ctx.reference_marks_absent.push('the thin-patch fire and govern reference marks (' +
      ctx.thinThresholdPath + '). Patch masses are still reported; their margins are not.');
  }
  if (ctx.missing.length) {
    ctx.refuse = { verdict: 'REFUSE', reason_code: 'input-missing', missing: ctx.missing.slice() };
    return ctx;
  }


  /* The field a register's axes belong to is read off the file's own basename against ROOT_FIELD,
     which keeps `registerPaths` honourable: a caller may stage a register anywhere, and the field
     still comes from the file rather than from the position in a hard-coded pair. */
  ctx.axes = new Map();
  ctx.registerPathsRead = [];
  for (const p of ctx.registerPaths) {
    if (!fs.existsSync(p)) continue;
    const base = path.basename(p);
    const field = /econ/i.test(base) ? ROOT_FIELD.economics : ROOT_FIELD.lunar;
    ctx.registerPathsRead.push(p);
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
    /* THE refusal_codes HALF OF THIS BLOCK IS DELETED AT STEP 48, WITH THE KEY IT READ.
     * It threw on a code question_classes.json carried that this router does not implement, and
     * reported the other direction on ctx.owed_contract_codes. Both are gone because the key is
     * gone: oracle/reason_codes.js is now the single declaration and this file derives from it, so
     * there is no second copy for the two directions to differ across. A throw over an empty
     * population can never fire, and a reporting channel that can never fire is indistinguishable
     * from one that was never wired. The two-direction DOCTRINE survives and moved to the check,
     * where both directions block -- at check time there is no wave to unblock and the orphan is
     * the more dangerous failure.
     *
     * THE verdicts HALF ABOVE STAYS AND KEEPS THROWING. It is about a different set, that set is
     * still declared in two files, and it is correct as written. */
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

/* --- output grades: which app keys are answers and which are the caller's own input ------------
 *
 * MEASURED HERE, NOT TYPED. `model()` returns 26 keys and they are not 26 answers. Five of them --
 * `ice`, `power`, `mass`, `fission`, `phi_c` -- are the caller's own arguments handed straight back
 * (`const ice = a.ice, power = a.power, mass = a.mass, fission = !!a.fission`; `phi_c` is the same
 * value clamped into [0,1]). Two more, `transDistKm` and `phi_c0`, are `a.x != null ? a.x : <const>`
 * and, because this router's address grammar never supplies either, are a fixed 3 and 0.10 at every
 * address it can build. Two further keys, `envPowerFrac` and `envMassFrac`, are genuinely computed
 * and are nonetheless CONSTANT across all nine (scenario, phase) addresses.
 *
 * A resolved address on a key in any of those groups is not an answer. It looks exactly like one:
 * the same slug, the same recompute trace, the same number-with-units. So the grade is computed by
 * PROBING the app -- vary the address, watch the value -- rather than by a list somebody maintains,
 * because a list goes stale the first time the app changes and a stale list here reads as an answer.
 *
 * The brief this seat was given named seven echo keys and included `transDistKm` and `phi_c0` among
 * them. The probe refutes that in detail and agrees with it in substance: neither is an ECHO, since
 * neither is an input key at any address this grammar builds -- both are DEFAULTS. And the brief
 * missed `envPowerFrac`/`envMassFrac`. Nine of the twenty-six keys, not seven, carry no
 * address-dependent information, in three different ways. Three grades, therefore, not two.
 */
const OUTPUT_GRADES = ['computed', 'input_echo', 'constant', 'value_computed'];

function deriveOutputGrades(surface) {
  const grades = new Map();
  const samples = [];
  for (const sk of Object.keys(surface.PRESETS)) {
    for (const ph of surface.phases) {
      let args;
      try { args = A.scenarioArgs(surface, sk, ph); } catch (e) { continue; }
      let out;
      try { out = surface.model(args); } catch (e) { continue; }
      samples.push({ args, out });
    }
  }
  if (samples.length === 0) return grades;

  const keys = Object.keys(samples[0].out);
  for (const k of keys) {
    const isEcho = samples.every(s => Object.prototype.hasOwnProperty.call(s.args, k) && s.out[k] === s.args[k]);
    if (isEcho) {
      grades.set(k, { grade: 'input_echo', varies_over_addresses: false,
        why: 'model() returns this key unchanged from the caller\'s own argument at every one of the ' +
             samples.length + ' addresses this grammar can build. Resolving an address on it echoes ' +
             'the question\'s own input back with a slug attached.' });
      continue;
    }
    const distinct = new Set(samples.map(s => JSON.stringify(s.out[k])));
    if (distinct.size === 1) {
      grades.set(k, { grade: 'constant', varies_over_addresses: false, value: samples[0].out[k],
        why: 'this key takes the same value (' + JSON.stringify(samples[0].out[k]) + ') at all ' +
             samples.length + ' addresses this grammar can build, so the address is doing no work. ' +
             'It is either a CONFIG default the grammar never overrides, or a ratio that the ' +
             'scenario envelope fixes by construction.' });
      continue;
    }
    grades.set(k, { grade: 'computed', varies_over_addresses: true, distinct_values: distinct.size,
      why: 'model() computes this key and it takes ' + distinct.size + ' distinct values over the ' +
           samples.length + ' addresses this grammar can build.' });
  }
  for (const spec of surface.outputs.values()) {
    if (grades.has(spec.key)) continue;
    grades.set(spec.key, { grade: 'value_computed', varies_over_addresses: true,
      why: 'computed by valueModel(), which needs a landed cost; not probed here because a landed ' +
           'cost is a dimension of the address rather than of the scenario.' });
  }
  return grades;
}

function gradeOf(ctx, key) {
  return (ctx.outputGrades && ctx.outputGrades.get(key)) ||
    { grade: 'computed', varies_over_addresses: null, why: 'not probed' };
}

/* --- confidence: every finding says what it is worth, in the finding -----------------------------
 *
 * Sub-step 8.2. The author asked for this tool's result to carry VERY LOW WEIGHT, so the ceiling is
 * low by construction and the reasons are written out rather than encoded as a number a reader has
 * to look up.
 *
 * THE CEILING IS `moderate` FOR EVERY WORD-MATCH SCORE. Register mass, thin-patch mass, exclusion
 * overlap and retrieval score are all the same instrument -- tokens of the question against tokens
 * somebody wrote into a register -- and that instrument demonstrably misses `kwh` against "kilowatt
 * hours" and `polar` against "pole". Nothing measured that way earns `high`.
 *
 * `high` IS REACHABLE EXACTLY ONCE: a fully-bound app address on a COMPUTED key. That is not a word
 * match; it is arithmetic performed by the app itself and carried with a recompute trace, and the
 * grammar refuses rather than defaults when a dimension is unbound. An address on an input-echo or
 * constant key does NOT earn it, however well-formed, because a well-formed address on a key that
 * does not vary is a perfect answer to nothing.
 */
const CONFIDENCE_LEVELS = ['none', 'very-low', 'low', 'moderate', 'high'];

/* A mass against a reference mark, with the mark's direction and nearness spelled out. */
function confidenceForMargin(mass, mark, opts) {
  opts = opts || {};
  if (mark == null) {
    return { confidence: 'very-low', confidence_why:
      'the reference mark is absent, so there is nothing to measure this mass against. A bare mass ' +
      'is a number without a scale.' };
  }
  const margin = mass - mark;
  const near = Math.abs(margin) / (mark || 1);
  const side = margin >= 0 ? 'at or above' : 'below';
  if (opts.tied_with && opts.tied_with.length) {
    return { confidence: 'very-low', confidence_why:
      'this mass is EXACTLY equal to ' + opts.tied_with.length + ' other axis mass(es) (' +
      opts.tied_with.join(', ') + '), so the score cannot tell them apart at all. Whatever it is ' +
      'evidence of, it is not evidence about THIS axis rather than those.' };
  }
  if (near < 0.10) {
    return { confidence: 'very-low', confidence_why:
      'mass ' + mass.toFixed(3) + ' sits ' + (margin >= 0 ? '+' : '') + margin.toFixed(3) +
      ' from the mark ' + mark + ' -- within 10% of it. A match this close to the bar is a ' +
      'coin-flip wearing a number: one word choice either way moves it across.' };
  }
  /* THE CONFIDENCE IS IN THE SCORE'S ABILITY TO DISCRIMINATE, NOT IN THE CONCLUSION. A finding can
     be confidently BELOW the mark and still be the right axis -- LCC-07 on SRQ-12 is exactly that,
     at 36% below -- so a below-mark finding carries the asymmetry with it rather than leaving the
     reader to remember it. */
  const below = margin < 0 ? ' NOTE THE DIRECTION: this mass is BELOW the retired mark, and a ' +
    'below-mark score is barely evidence against the axis. FM-1 is a measured case where the ' +
    'correct axis scored 36% below and was right anyway.' : '';
  if (near < 0.35) {
    return { confidence: 'low', confidence_why:
      'mass ' + mass.toFixed(3) + ' is ' + side + ' the mark ' + mark + ' by ' +
      Math.abs(margin).toFixed(3) + ' (' + (near * 100).toFixed(0) + '% of it), which is not close ' +
      'to the bar but is well inside the range a single missing synonym moves.' + below };
  }
  return { confidence: 'moderate', confidence_why:
    'mass ' + mass.toFixed(3) + ' is ' + side + ' the mark ' + mark + ' by ' +
    Math.abs(margin).toFixed(3) + ' (' + (near * 100).toFixed(0) + '% of it). This is the strongest ' +
    'a word-match score gets in this tool; it is still a word-match score.' + below };
}

/* --- the five evidence channels -------------------------------------------------------------------
 *
 * Each returns findings and nothing else. None of them returns a verdict, none of them suppresses
 * another, and none of them stops early because something matched.
 */

/* CHANNEL 1 -- the register. EVERY axis with at least one key hit, with its distance from K.
 *
 * The filter `mass >= ctx.K` is what this sub-step deletes and it is worth being explicit about
 * what it destroyed. On SRQ-12 it removed LCC-07 -- the axis whose statement is about the energy
 * cost of oxygen production -- from a question that asks the energy cost of oxygen production,
 * because 1.540 < 2.431. The report never mentioned it. Nothing downstream could weigh it, because
 * nothing downstream was ever told it existed. */
function registerChannel(ctx, tokens) {
  const scored = [];
  for (const ax of ctx.axes.values()) {
    const { mass, hits } = axisMass(ctx, ax, tokens);
    if (hits.length === 0) continue;
    scored.push({ ax, mass, hits });
  }
  scored.sort((a, b) => b.mass - a.mass || (a.ax.axis_id < b.ax.axis_id ? -1 : 1));

  /* Exact ties are reported as ties. SRQ-8 puts LCC-06, LCC-09 and LCC-10 at 0.428 on the single
     shared key `power`; a ranked list hides that by printing one of them first. */
  const byMass = new Map();
  for (const s of scored) {
    const k = s.mass.toFixed(6);
    if (!byMass.has(k)) byMass.set(k, []);
    byMass.get(k).push(s.ax.axis_id);
  }

  const findings = scored.map(s => {
    const tied = (byMass.get(s.mass.toFixed(6)) || []).filter(id => id !== s.ax.axis_id);
    const c = confidenceForMargin(s.mass, ctx.K, { tied_with: tied });
    const sideInfo = resolveSides(ctx, s.ax);
    return {
      axis_id: s.ax.axis_id, axis_class: s.ax.class, field: s.ax.field,
      axis_statement: s.ax.axis_statement, scope_token: s.ax.scope_token,
      keys_matched: s.hits, keys_declared: s.ax.match_keys.length,
      keys_not_matched: s.ax.match_keys.filter(k => !s.hits.includes(k)),
      mass: Number(s.mass.toFixed(3)),
      reference_mark: ctx.K == null ? null : Number(ctx.K),
      margin: ctx.K == null ? null : Number((s.mass - ctx.K).toFixed(3)),
      margin_as_fraction_of_mark: ctx.K == null ? null : Number(((s.mass - ctx.K) / ctx.K).toFixed(3)),
      side_of_mark: ctx.K == null ? 'unknown' : (s.mass >= ctx.K ? 'at or above' : 'below'),
      would_have_fired_under_the_retired_gate: ctx.K == null ? null : s.mass >= ctx.K,
      tied_at_identical_mass_with: tied,
      carried_by_a_single_key: s.hits.length === 1 ? s.hits[0] : null,
      sides_declared: sideInfo.declared,
      sides_resolved: sideInfo.resolved,
      side_resolution: sideInfo.status,
      unresolved_members: sideInfo.unresolved,
      members: sideInfo.members,
      one_sided: s.ax.class === 'one_sided',
      confidence: c.confidence, confidence_why: c.confidence_why,
    };
  });

  return {
    channel: 'register',
    reference_mark: {
      name: 'K', value: ctx.K == null ? null : Number(ctx.K), available: ctx.K != null,
      status: ctx.K_status || null, provenance: ctx.K_provenance || null,
      role: 'REPORTED, NOT ENFORCED (sub-step 8.6). Nothing is filtered by this number.',
    },
    axes_with_at_least_one_key_hit: findings.length,
    axes_in_register: ctx.axes.size,
    suppressed_by_a_threshold: 0,
    findings,
  };
}

/* THE SIDE RESOLUTION SURVIVES 8.1 UNCHANGED IN SUBSTANCE, because it is a LOOKUP and not a score.
 *
 * Two measured findings force it and they compound. (1) Retrieval cannot reach every register member
 * at any threshold: on fixture X-01 the scored pool holds 38 candidates and
 * henderson-2008-myth-of-miti.md is not among them -- absent from the pool, not below the bar --
 * while beason-1996-targeting-japan.md, the other side of the same pair, is present. About 16% of
 * targets are unreachable at any threshold. (2) Seven of the twenty-two two_sided axes carry three
 * or four sides rather than two.
 *
 * Sourced from retrieval, a contested answer therefore drops sides for two unrelated reasons at once
 * and the reader sees a dispute with a side missing and nothing saying one is missing. What CHANGED
 * at 8.1 is only the consequence: an unresolved member used to become REFUSE/axis-incomplete, which
 * is a decision. Now it is a reported defect with the member named, and the session rules on it.
 *
 * The assertion that stays is the one that stops a side from VANISHING FROM THE REPORT: every
 * declared side is accounted for as resolved or as unresolved, and the two counts must add up. That
 * throws, because a report that has silently lost a side is worse than no report. */
function resolveSides(ctx, ax) {
  const declared = [...ax.sides.keys()];
  const unresolved = [];
  const resolved = new Set();
  const members = [];
  for (const [side, ms] of ax.sides) {
    const leaves = [], paths = [];
    for (const m of ms) {
      const hit = indexPathFor(ctx, m.leaf);
      leaves.push(m.leaf);
      paths.push(hit || null);
      if (hit) { m.path = hit; resolved.add(side); }
      else unresolved.push(side + ':' + m.leaf);
    }
    members.push({ side, leaves, paths });
  }
  const accounted = new Set([...resolved, ...unresolved.map(u => u.split(':')[0])]);
  if (accounted.size !== declared.length) {
    throw new Error('oracle/router/classify: axis ' + ax.axis_id + ' declares ' + declared.length +
      ' side(s) and the resolution accounted for ' + accounted.size + '. A side has vanished from ' +
      'the evidence report, which is the one failure this lookup exists to prevent.');
  }
  return {
    declared: declared.length, resolved: resolved.size, unresolved, members,
    status: unresolved.length === 0 && resolved.size === declared.length ? 'complete'
      : 'INCOMPLETE -- ' + unresolved.length + ' member(s) named by the register do not resolve ' +
        'against literature/INDEX.tsv. A dispute answered from what is left would be a dispute with ' +
        'a side missing and nothing saying so.',
  };
}

/* CHANNEL 2 -- the app's own address grammar, with a grade per output key. */
function appChannel(ctx, text) {
  const surface = ctx.surface;
  const outputs_named = findOutputs(surface, text).map(key => {
    const g = gradeOf(ctx, key);
    return { key, source: (surface.outputs.get(key) || {}).source || null,
             grade: g.grade, varies_over_addresses: g.varies_over_addresses, why: g.why };
  });
  const echoes = outputs_named.filter(o => o.grade === 'input_echo').map(o => o.key);
  const constants = outputs_named.filter(o => o.grade === 'constant').map(o => o.key);

  const out = {
    channel: 'app',
    scenario_named: findScenario(surface, text),
    phase_named: findPhase(surface, text),
    knob_named: findKnob(surface, text),
    landed_cost_named: (() => { try { return findLandedCost(surface, text); } catch (e) { return null; } })(),
    sweep_language_present: SWEEP_LANGUAGE.test(text),
    outputs_named,
    input_echo_keys_named: echoes,
    constant_keys_named: constants,
    echo_warning: echoes.length ? 'THE QUESTION NAMES ' + echoes.length + ' KEY(S) THE APP HANDS ' +
      'BACK UNCHANGED (' + echoes.join(', ') + '). An address that resolves on one of these returns ' +
      'the caller\'s own input with a slug and a recompute trace attached. It is not an answer, and ' +
      'it is indistinguishable from one on the wire.' : null,
    constant_warning: constants.length ? 'The question names ' + constants.length + ' key(s) that ' +
      'take the same value at every address this grammar builds (' + constants.join(', ') + '). ' +
      'The address is doing no work.' : null,
    resolves: false, address_form: null, resolved_address: null,
    points: 0, slugs_addressed: null, unbound_dimension: null,
    coefficients: [], derivation_note: null, unbuildable_reason: null,
    confidence: 'none', confidence_why: 'the sub-claim names no address this grammar can build.',
  };

  let app = null;
  try { app = tryAppPath(surface, text); }
  catch (e) { out.unbuildable_reason = 'the grammar threw: ' + e.message; return out; }
  if (!app) return out;

  if (app.unbuildable) {
    out.unbuildable_reason = app.reason;
    out.confidence = 'moderate';
    out.confidence_why = 'the grammar REFUSED to build this address rather than defaulting a ' +
      'dimension, which is a mechanical fact about the app rather than a score. What it does not ' +
      'tell you is whether the question was app-shaped at all.';
    return out;
  }
  if (app.form === 'coefficient') {
    out.resolves = true;
    out.address_form = 'coefficient';
    out.coefficients = app.coefficients;
    out.confidence = 'moderate';
    out.confidence_why = 'the sub-claim names ' + app.coefficients.length + ' coefficient(s) by the ' +
      'app\'s own key or by its own unit string, which is a mechanical match against CONFIG/VALUE ' +
      'rather than a word-overlap score. The app says what the coefficient IS and with what status; ' +
      'it does not say where the number came from, and the two are different questions.';
    return out;
  }

  out.resolves = true;
  out.address_form = app.form;
  out.resolved_address = app.resolved.resolvedAddress;
  out.slugs_addressed = app.resolved.slugsAddressed;
  out.points = (app.resolved.points || []).length;
  out.unbound_dimension = app.unbound || null;
  out.derivation_note = app.note || null;
  out.answers_output_key = app.output;
  const g = gradeOf(ctx, app.output);
  out.answers_output_grade = g.grade;
  if (g.grade === 'input_echo') {
    out.confidence = 'very-low';
    out.confidence_why = 'the address resolves cleanly, and the key it resolves on (' + app.output +
      ') is one the app hands straight back from the caller\'s argument. A perfectly-formed address ' +
      'on an echo key is a well-traced restatement of the question. ' + g.why;
  } else if (g.grade === 'constant') {
    out.confidence = 'low';
    out.confidence_why = 'the address resolves cleanly, and the key it resolves on (' + app.output +
      ') takes the same value at every address this grammar builds, so the scenario and phase in ' +
      'the address changed nothing. ' + g.why;
  } else {
    out.confidence = 'high';
    out.confidence_why = 'a fully-bound address on a computed key, evaluated by the app itself and ' +
      'carried with a recompute trace over ' + out.points + ' point(s). This is the ONE finding in ' +
      'this report that is arithmetic rather than word-matching, and it is the only one that earns ' +
      '`high`. It is still only as good as the app\'s model.';
  }
  return out;
}

/* CHANNEL 3 -- the app's own EXCLUSIONS. The two-token bar is reported, not applied. */
function exclusionChannel(ctx, text) {
  const cands = X.matchExclusions(ctx.surface, text, ctx.excludedBySlug);
  const band = X.topBand(cands);
  const bandKeys = new Set(band.map(b => b.key));
  const findings = cands.slice(0, 6).map(cand => {
    const node = ctx.excludedBySlug.get(cand.key) || null;
    const mapped = node ? X.verdictForOutcome(node.outcome, node) : null;
    const overlap = cand.overlap;
    const conf = overlap >= 3 ? 'moderate' : overlap === 2 ? 'low' : 'very-low';
    return {
      slug: cand.key,
      overlap,
      matched_tokens: cand.matched || cand.hits || null,
      in_top_band: bandKeys.has(cand.key),
      meets_the_retired_two_token_bar: overlap >= 2,
      outcome: node ? node.outcome : null,
      /* NOT a verdict this tool chose. The three outcomes are a closed table the APP declares about
         its own boundary, and this is the table's own entry for the outcome the app wrote. A session
         may take it, and a session may overrule it; what it must not do is mistake it for a score. */
      outcome_maps_to: mapped ? mapped.verdict : null,
      outcome_maps_to_code: mapped ? mapped.reason_code : null,
      outcome_mapping_is: 'a lookup in the app\'s own closed three-entry outcome table, not a score',
      app_says: node && node.refusal && node.refusal.absent_object ? node.refusal.absent_object.app_says : null,
      nearest_present_object: node && node.refusal ? node.refusal.nearest_present_object : null,
      adjacency: node ? node.adjacency || null : null,
      why: mapped ? mapped.why : null,
      confidence: conf,
      confidence_why: 'the match is ' + overlap + ' token(s) of overlap between the sub-claim and ' +
        'this excluded node\'s match keys. The retired gate fired at two. Two tokens of English ' +
        'overlap is a weak signal in either direction: it neither establishes that the app excludes ' +
        'this topic nor, when absent, that the app covers it.',
    };
  });
  return {
    channel: 'exclusions',
    nodes_in_artifact: ctx.excluded.nodes.length,
    candidates_scored: cands.length,
    retired_bar: { rule: 'top band and overlap >= 2', role: 'REPORTED, NOT ENFORCED' },
    findings,
  };
}

/* CHANNEL 4 -- the thin-patch register. Both tiers reported as marks; neither applied. */
function thinChannel(ctx, text) {
  const thin = TP.matchThinPatches(ctx, text);
  const findings = thin.scored.map(s => {
    const rec = TP.substitutionRecord(s);
    const cFire = confidenceForMargin(s.mass, ctx.thinFire);
    return {
      patch_id: s.id,
      title: rec.title,
      mass: Number(s.mass.toFixed(3)),
      triggered_on: s.hits,
      trigger_tokens_declared: (s.patch.trigger_tokens || []).length,
      fire_mark: ctx.thinFire == null ? null : Number(ctx.thinFire),
      govern_mark: ctx.thinGovern == null ? null : Number(ctx.thinGovern),
      margin_to_fire_mark: ctx.thinFire == null ? null : Number((s.mass - ctx.thinFire).toFixed(3)),
      margin_to_govern_mark: ctx.thinGovern == null ? null : Number((s.mass - ctx.thinGovern).toFixed(3)),
      crosses_fire_mark: ctx.thinFire == null ? null : s.mass >= ctx.thinFire,
      crosses_govern_mark: ctx.thinGovern == null ? null : s.mass >= ctx.thinGovern,
      absent_object: rec.absent_object,
      substitution: rec.substitution,
      nearest_present_object: rec.nearest_present_object,
      /* The patch's own declared code, from oracle/thin_patches.json. Not a code this tool assigned;
         the register's author wrote it against the patch, not against this question. */
      patch_declares_code: rec.reason_code,
      confidence: cFire.confidence,
      confidence_why: cFire.confidence_why + ' The govern tier (' + ctx.thinGovern + ') is RETIRED ' +
        'as a gate at 8.6: it was the number that could silently turn a correct answer into a ' +
        'refusal, and one band measured on five control rows already did exactly that to six of them.',
    };
  });
  return {
    channel: 'thin_patches',
    patches_in_register: ctx.thinPatches.patches.length,
    reference_marks: {
      fire: ctx.thinFire == null ? null : Number(ctx.thinFire),
      govern: ctx.thinGovern == null ? null : Number(ctx.thinGovern),
      available: ctx.thinFire != null && ctx.thinGovern != null,
      status: ctx.thin_status || null, provenance: ctx.thin_provenance || null,
      role: 'REPORTED, NOT ENFORCED (sub-step 8.6).',
    },
    patches_with_any_mass: findings.length,
    findings,
  };
}

/* CHANNEL 5 -- retrieval. RUNS EXACTLY ONCE, AND LAST.
 *
 * "Classification before retrieval" was the rule and the rule survives the decision it was written
 * for. Its substance is that the four text-only channels are computed from the sub-claim's own words
 * and are never recomputed against what retrieval found -- so retrieval cannot talk the register
 * into firing, and a confident search result cannot manufacture a topic. All four run above this
 * one, none of them reads its result, and no second retrieval repairs a first. */
function retrievalChannel(ctx, text) {
  const search = LIT.searchLiterature(ctx.litDir, text, { limit: 5 });
  const cands = (search.candidates || []).map(c => ({
    filename: c.filename, path: c.path || null, field: c.field || null,
    score: Number((c.score || 0).toFixed(4)),
    confirmed: !!c.confirmed,
    confirmation_fraction: c.frac == null ? null : Number(c.frac.toFixed(3)),
    confirmation_threshold: c.threshold == null ? null : c.threshold,
  }));
  const best = search.best ? search.best.filename : null;
  const top = cands[0];
  let confidence = 'none', why = 'the shelf returned no scored candidate for this sub-claim.';
  if (top) {
    const gap = cands.length > 1 ? top.score - cands[1].score : top.score;
    const confirmedCount = cands.filter(c => c.confirmed).length;
    if (!best) {
      confidence = 'very-low';
      why = 'candidates scored but NONE confirmed in full text. A filename that scores and a body ' +
        'that does not confirm is the shape a near-miss takes here, and it is not a source.';
    } else if (gap < 0.1 * (top.score || 1)) {
      confidence = 'very-low';
      why = 'the top candidate leads the second by ' + gap.toFixed(4) + ' on a score of ' +
        top.score.toFixed(4) + ' -- under 10%. The ranking is not distinguishing them.';
    } else {
      confidence = confirmedCount >= 2 ? 'moderate' : 'low';
      why = confirmedCount + ' of ' + cands.length + ' candidate(s) confirmed in full text at ' +
        'threshold ' + top.confirmation_threshold + ', top score ' + top.score.toFixed(4) +
        ' leading by ' + gap.toFixed(4) + '. This is a filename-and-token score, not a reading.';
    }
  }
  return {
    channel: 'retrieval',
    ran_after_text_channels: true,
    runs: 1,
    scored_in_corpus: search.scoredCount,
    returned: cands.length,
    truncated: search.truncated,
    confirmed_count: (search.confirmedSet || []).length,
    confirmation_threshold: search.threshold,
    top_confirmed: best,
    candidates: cands,
    confidence, confidence_why: why,
  };
}

/* --- the sub-claim advisor ----------------------------------------------------------------------
 * All five channels, every time, in this order, and nothing suppresses anything.
 */
function adviseSubClaim(ctx, subClaim) {
  const piece = (typeof subClaim === 'string') ? { own: subClaim, full: subClaim } : subClaim;
  const tokens = LIT.tokenize(piece.own);

  /* The four text-only channels first, from the sub-claim's own words alone. */
  const register = registerChannel(ctx, tokens);
  const app = appChannel(ctx, piece.full);
  const exclusions = exclusionChannel(ctx, piece.own);
  const thin_patches = thinChannel(ctx, piece.own);
  /* Retrieval last, once, reading none of the above. */
  const retrieval = retrievalChannel(ctx, piece.own);

  const findings_count = register.findings.length + (app.resolves || app.unbuildable_reason ? 1 : 0) +
    exclusions.findings.length + thin_patches.findings.length + retrieval.candidates.length;

  return {
    text: piece.own,
    text_with_context: piece.full,
    tokens,
    channels_run: EVIDENCE_CHANNELS.slice(),
    findings_count,
    register, app, exclusions, thin_patches, retrieval,
  };
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

/* --- what this report is worth, carried IN the report ---------------------------------------------
 *
 * SUB-STEP 8.2, AND THE REASON IT IS HERE RATHER THAN IN A DOCUMENT. The author's instruction is
 * that this tool's result carries VERY LOW WEIGHT. A caveat in a design note is a caveat the reading
 * session may never open. So every report carries its own known failure modes as WORKED EXAMPLES
 * with the measured numbers attached, at the moment the session reads the report.
 *
 * These are not hypotheticals and they are not fixed by a synonym table. They are what a word-match
 * score IS.
 */
const FAILURE_MODES = [
  {
    id: 'FM-1',
    name: 'a register key the reader would never write',
    question: 'How much energy does it take to produce a kilogram of oxygen on the Moon?',
    fixture: 'SRQ-12',
    what_happened: 'LCC-07 is an axis about the energy cost of oxygen production. It matched on ' +
      '`oxygen` and `energy` for a mass of 1.540 against a reference mark of 2.431 -- a margin of ' +
      '-0.891 -- and under the retired gate it was filtered out before anything downstream could ' +
      'see it. The key that would have carried the rest of the mass reads `kwh`. The question reads ' +
      '"kilowatt hours", which tokenizes to `kilowatt` and `hours` and matches neither.',
    the_point: 'No reader misses this. Only a scorer does. If you are looking at a near-miss axis ' +
      'whose statement plainly answers the question, the near-miss is the defect and not the verdict.',
  },
  {
    id: 'FM-2',
    name: 'a morphological miss, and a three-way tie underneath it',
    question: 'How much electrical power is actually extractable at the lunar south pole?',
    fixture: 'SRQ-8',
    what_happened: 'LCC-09 carries `polar` among its match keys. The question says "pole". They do ' +
      'not match. What is left is the single shared key `power`, giving a mass of 0.428 against a ' +
      'mark of 2.431 -- and LCC-06 and LCC-10 score EXACTLY 0.428 on the same single key. Three ' +
      'axes, one number, no way for the score to tell them apart.',
    the_point: 'A ranked list prints one of three tied axes first and looks like it chose. It did ' +
      'not. Read `tied_at_identical_mass_with` before reading the order.',
  },
  {
    id: 'FM-3',
    name: 'a perfectly-formed address that answers nothing',
    question: 'any question naming ice, power, mass, fission or phi_c as the thing to be reported',
    fixture: 'measured by probe against lsei/index.html',
    what_happened: 'Nine of model()\'s twenty-six output keys carry no address-dependent ' +
      'information. Five (`ice`, `power`, `mass`, `fission`, `phi_c`) are the caller\'s own ' +
      'arguments handed back. Two (`transDistKm`, `phi_c0`) are CONFIG defaults this grammar never ' +
      'overrides, fixed at 3 and 0.10 at every address. Two (`envPowerFrac`, `envMassFrac`) are ' +
      'computed and constant across all nine addresses. Each resolves with a full slug and a ' +
      'recompute trace, and looks exactly like an answer.',
    the_point: 'Read `answers_output_grade` and `input_echo_keys_named` on the app channel before ' +
      'you believe a resolved address. `resolves: true` is not `answers: true`.',
  },
  {
    id: 'FM-4',
    name: 'the bar was a coin-flip and the number hid it',
    question: 'any question whose top axis mass sits within a few percent of the reference mark',
    fixture: 'the general case',
    what_happened: 'The retired gate compared a mass against 2.431 and returned a categorical ' +
      'answer. A mass of 2.44 and a mass of 2.42 sit on opposite sides of it and are the same ' +
      'measurement. Every finding here therefore carries its signed margin and a confidence that ' +
      'says so in words.',
    the_point: 'Where `confidence` reads `very-low` because the margin is small, the number is not ' +
      'evidence about which side of the line the question falls on. It is evidence that the ' +
      'question is near a line somebody drew.',
  },
  {
    id: 'FM-5',
    name: 'decomposition is a heuristic and never became anything else',
    question: 'any multi-clause question',
    fixture: 'decomposeSubClaims()',
    what_happened: 'Sub-claims are split on semicolons and on ", and <wh-word>" with one anaphoric ' +
      'exception. It is a regular expression over English. It has never been calibrated and it is ' +
      'not the thing carrying any guarantee in this file.',
    the_point: 'If the sub-claim boundaries in this report look wrong to you, they are wrong. ' +
      'Re-read the question yourself; do not reason from the split.',
  },
];

const RELIABILITY = {
  weight: 'VERY LOW',
  weight_source: 'the author\'s ruling, 2026-08-28: "I actually want the result of that tool to be ' +
    'a very low weight to Claude."',
  what_this_is: 'An evidence report. It says what matched, at what mass, how far that mass sits ' +
    'from a reference mark that no longer decides anything, and what each of those is worth. It ' +
    'does not name a verdict and it must not be read as implying one.',
  who_rules: 'The composing session, under oracle/answer_contract.md. The six verdicts are closed ' +
    'and published on this report as `closed_set`; picking one is the session\'s act.',
  a_non_match_is_weak_evidence_of_absence:
    'READ THIS BEFORE CONCLUDING ANYTHING FROM A ZERO. An axis that does not appear in the register ' +
    'findings, an app address that does not resolve, an exclusion that does not match, a patch that ' +
    'does not score -- none of these establishes that the thing is not there. Every one of them is ' +
    'a statement about token overlap between the question\'s words and words somebody wrote into a ' +
    'register months ago. FM-1 and FM-2 are two measured cases where the right answer was present ' +
    'in the register and the score did not find it. A NON-MATCH IS WEAK EVIDENCE OF ABSENCE and a ' +
    'below-mark mass is weak evidence against. The asymmetry is real and it runs one way: a match ' +
    'is mild evidence FOR, a non-match is barely evidence AGAINST.',
  override_on_judgement:
    'You are expected to overrule this report. If the axis statement plainly answers the question ' +
    'and the mass is below the mark, the mass is wrong. If the address resolves and the key is an ' +
    'echo, the address is worthless. Read the axis statements, read the candidate summaries, and ' +
    'rule. This tool exists to put evidence in front of you, not to save you from reading it.',
  confidence_scale: CONFIDENCE_LEVELS.slice(),
  confidence_ceiling: 'Every word-match score in this report is capped at `moderate`. `high` is ' +
    'reachable in exactly one place: a fully-bound app address on a COMPUTED output key, which is ' +
    'arithmetic the app performed and carried with a recompute trace, not a token overlap.',
  thresholds_are_reference_marks:
    'K (2.431), the thin-patch fire tier (1.7) and the thin-patch govern tier (6.175) were ' +
    'calibrated to DECIDE and are retired as gates at sub-step 8.6. They are still read, and only ' +
    'so that a margin can be reported. Nothing in this report is filtered, suppressed or ranked out ' +
    'by any of them.',
};

/* --- the question-level report ------------------------------------------------------------------ */

function adviseQuestion(ctx, questionText) {
  const base = {
    question: questionText,
    /* The MENU, not a pick. A session chooses one of these and runs it through assertVerdict(). */
    closed_set: VERDICTS.slice(),
    closed_refusal_codes: REASON_CODES.slice(),
    refusal_code_precedence: CODE_PRECEDENCE.slice(),
    reliability: RELIABILITY,
    failure_modes: FAILURE_MODES,
    contract: 'oracle/answer_contract.md -- the composing session rules the verdict; this report is ' +
      'evidence and carries very low weight.',
  };

  if (ctx.refuse) {
    /* An input this router cannot open is a fact about the installation, not a verdict. It is
       reported at the top of the report where a session cannot miss it, with zero personas spent
       and zero channels claimed to have run. The session still rules; what it rules on is that four
       of the five channels had nothing to read. */
    return Object.assign(base, {
      inputs_unavailable: ctx.refuse.missing.slice(),
      inputs_note: 'ONE OR MORE INPUTS THIS ROUTER READS IS ABSENT, so the channels below did not ' +
        'run. Answer contract section 3 puts a missing input before the wave, at zero persona cost. ' +
        'That timing is a fact about cost; the ruling is still the session\'s.',
      sub_claims: [],
      findings_count: 0,
      assertions: { no_decision_field: true, channels_are_not_exclusive: true },
    });
  }

  const pieces = decomposeSubClaims(questionText);
  const sub_claims = pieces.map(p => adviseSubClaim(ctx, p));

  const report = Object.assign(base, {
    inputs_unavailable: [],
    sub_claims,
    sub_claim_count: sub_claims.length,
    findings_count: sub_claims.reduce((a, s) => a + s.findings_count, 0),
    /* AN EMPTY RESULT IS STATED, NEVER LEFT AS AN ABSENCE.
     *
     * Two of the 44 rows in oracle/acceptance/labelled_questions.tsv are deliberate out-of-scope
     * controls -- hospital wastewater antibiotic resistance, and the Antarctic ozone hole -- and all
     * five channels return nothing on both. That is CORRECT and it is the strongest signal this tool
     * produces. It is also the exact shape of a broken install: a register that failed to parse and
     * a corpus that is empty both return nothing on everything. So the empty result is declared as a
     * positive finding with the channel counts attached, rather than inferred from a zero. */
    no_findings_anywhere: sub_claims.every(s => s.findings_count === 0),
    no_findings_note: sub_claims.every(s => s.findings_count === 0)
      ? 'ALL FIVE CHANNELS RAN AND ALL FIVE RETURNED NOTHING. Against a register of ' + ctx.axes.size +
        ' axes, ' + ctx.excluded.nodes.length + ' excluded nodes, ' + ctx.thinPatches.patches.length +
        ' thin patches and the shelf, not one key, token, address or filename matched. For a corpus ' +
        'about lunar industrialisation that is what an out-of-scope question looks like -- and it is ' +
        'ALSO what a broken install looks like, so check the channel counts on this report before ' +
        'concluding the first. What it is not is a refusal: the ruling is still the session\'s.'
      : null,
    reference_marks: {
      K: { value: ctx.K == null ? null : Number(ctx.K), status: ctx.K_status || null,
           role: 'reported, retired as a gate at 8.6' },
      thin_fire: { value: ctx.thinFire == null ? null : Number(ctx.thinFire),
                   role: 'reported, retired as a gate at 8.6' },
      thin_govern: { value: ctx.thinGovern == null ? null : Number(ctx.thinGovern),
                     role: 'reported, retired as a gate at 8.6' },
    },
    known_defects_in_the_inputs: {
      token_form_failures: ctx.token_form_failures || [],
      /* `owed_contract_codes` was removed at Step 48 with the computation that fed it. Checked
         before removing: acceptance.js's REQUIRED_REPORT_FIELDS does not name it, and nothing else
         reads it. `closed_refusal_codes`, which acceptance.js:162 DOES require, is a different
         field, is fed from REASON_CODES below, and is a correct derivation that stays. */
    },
    assertions: {
      no_decision_field: true,
      channels_are_not_exclusive: true,
      retrieval_ran_once_per_sub_claim: sub_claims.every(s => s.retrieval.runs === 1),
      retrieval_ran_after_the_text_channels: sub_claims.every(s => s.retrieval.ran_after_text_channels),
      no_finding_suppressed_by_a_threshold:
        sub_claims.every(s => s.register.suppressed_by_a_threshold === 0),
    },
  });

  /* THE ONE-WAY VALVE, RUN ON EVERY REPORT ON EVERY CALL. Cheap, and it is the only thing standing
     between this file and somebody re-adding a convenience verdict field in six months. */
  assertNoVerdict(report, 'adviseQuestion(' + JSON.stringify(String(questionText).slice(0, 60)) + ')');
  return report;
}

/* --- the retired decision surface ----------------------------------------------------------------
 *
 * These four functions PICKED a verdict. They are deleted, and they throw rather than vanishing,
 * because a caller that reaches for one is a caller expecting a decision and the useful thing to
 * hand it is a sentence saying where the decision went. `Cannot read property 'verdict' of
 * undefined`, three frames down, says nothing.
 *
 * KNOWN CALLERS OUTSIDE THIS SEAT'S WRITE SET, ROUTED RATHER THAN SILENCED:
 *   oracle/tests/run_suite.js   RFX-01..33 read `q.verdict` against the axis class.
 *   oracle/tests/fault_inject.js  reads `r.verdict`/`r.reason_code` on two decoys.
 * Both assert a property that no longer exists. The signal RFX-04/07/09/13 carried -- four axes
 * that do not reach K on their own probe_pos -- is NOT lost: it is measured and printed by name in
 * oracle/router/acceptance.js, at full resolution, with the masses.
 */
function retired(name, instead) {
  return function () {
    throw new Error('oracle/router/classify: ' + name + '() is RETIRED at sub-step 8.1. The router ' +
      'advises; it does not decide. Call ' + instead + ' and rule the verdict in the composing ' +
      'session under oracle/answer_contract.md, then pass it through assertVerdict(). ' +
      'The author\'s ruling, 2026-08-28: "Let it use your little tool to help inform itself but ' +
      'don\'t have it be how it chooses a verdict."');
  };
}
const classifyQuestion = retired('classifyQuestion', 'adviseQuestion(ctx, questionText)');
const classifySubClaim = retired('classifySubClaim', 'adviseSubClaim(ctx, subClaim)');
const compose = retired('compose', 'nothing -- composition WAS the decision');
const assertOneMode = retired('assertOneMode', 'assertNoVerdict(report) and assertVerdict(v)');

module.exports = {
  VERDICTS, REASON_CODES, CODE_PRECEDENCE, EVIDENCE_CHANNELS, RETRIEVAL_MODES,
  CONFIDENCE_LEVELS, OUTPUT_GRADES, FAILURE_MODES, RELIABILITY, FORBIDDEN_REPORT_KEYS,
  OUTPUT_ALIASES, KNOB_ALIASES, SWEEP_LANGUAGE,
  loadContext, loadRegister, decomposeSubClaims, lexiconCoverage,
  findOutputs, findScenario, findPhase, findKnob, findCoefficients, tryAppPath, axisMass, indexPathFor,
  deriveOutputGrades, gradeOf, confidenceForMargin, resolveSides, axisView,
  registerChannel, appChannel, exclusionChannel, thinChannel, retrievalChannel,
  adviseSubClaim, adviseQuestion,
  assertVerdict, assertReasonCode, assertNoVerdict,
  /* retired, and they say so when called */
  classifyQuestion, classifySubClaim, compose, assertOneMode,
};
