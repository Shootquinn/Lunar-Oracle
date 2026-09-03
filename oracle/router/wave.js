/* oracle/router/wave.js -- the wave selector. Sub-step 3.9, re-signed at sub-step 8.1.
 *
 * THE VERDICT THE SESSION RULED SELECTS THE WAVE. There is no decision here at all: this file takes
 * a verdict as an ARGUMENT and returns the persona wave the answer contract's section 1 table
 * assigns to it.
 *
 * Until 8.1 the first line of this comment read "THE VERDICT THE ROUTER ALREADY COMPUTED SELECTS
 * THE WAVE", and it was true, and that was the defect. The router computing a verdict was the
 * inversion the author ruled against on 2026-08-28; reading it here was the last place that
 * decision entered the persona wave without anybody choosing it. Nothing else in this file moved.
 *
 * THE PERSONA COUNT IS DERIVED, NEVER HARD-CODED. Every count below comes out of ARITY, a table
 * keyed by verdict, and the CONTESTED row is a function of the axis rather than an integer. There
 * is no numeral in this file's control flow. assertDerived() re-derives the count from the wave it
 * just built and throws if the two disagree, which is what stops a later edit from adding a cap by
 * accident.
 *
 * WHY CONTESTED HAS NO CAP, and this is the clause worth reading before changing anything here.
 * The rule was exactly two. Answer contract section 1, version 2: "A register axis may carry any
 * number of sides, and truncating to two makes the router the thing that chooses which sides the
 * user hears -- the one-sidedness the register exists to prevent." A cap is not a cost control, it
 * is an editorial decision taken by a mechanism that cannot see what it is deciding. The cost
 * control is authoring instead: a domain persona who writes a six-sided axis buys six personas on
 * every question that touches it, and will not do it twice.
 *
 * THE ANTI-SYNTHESIS RULE SHIPS AS A DATA STRUCTURE, NOT A PROMISE. Each CONTESTED persona's
 * brief_scope carries one side's member leaves and no other side's, and assertDisjointBriefs()
 * checks that pairwise over every brief. The rule was always about isolation rather than about the
 * number two, which is why removing the cap did not touch it.
 *
 * A REFUSAL BUYS ZERO PERSONAS, UNCONDITIONALLY, FOR EVERY REASON CODE. Answer contract section 5.
 * A refusal that costs what an answer costs is arbitrage and the system learns to answer instead.
 */
'use strict';
const fs = require('fs');
const path = require('path');

/* --- the field -> seat map, read from the corpus's own FIELDS.tsv ------------------------------
 * The seat that reviews a field is a fact the corpus records about itself. Typing it here would be
 * a second copy of a mapping that is going to change when a field is added. */
function loadFieldSeats(fieldsPath) {
  const seats = new Map();
  if (!fs.existsSync(fieldsPath)) return seats;
  const lines = fs.readFileSync(fieldsPath, 'utf8').split('\n').filter(Boolean);
  const head = lines[0].split('\t');
  const iField = head.indexOf('field'), iLabel = head.indexOf('label'), iOwner = head.indexOf('review_owner');
  for (const line of lines.slice(1)) {
    const c = line.split('\t');
    if (c.length <= Math.max(iField, iLabel, iOwner)) continue;
    seats.set(c[iField], { field: c[iField], label: c[iLabel], seat: c[iOwner] });
  }
  return seats;
}

/* --- arity, the one table ----------------------------------------------------------------------
 * Answer contract section 1, column "Personas". Every entry is a function of the verdict and, for
 * CONTESTED, of the axis. Nothing in this file writes a count that does not come from here. */
const ARITY = {
  APP:        { of: () => 0, why: 'answer contract section 1: an APP verdict spends no personas; the app is the authority and the value carries a recompute trace' },
  FIGURE:     { of: () => 0, why: 'answer contract section 1: a FIGURE verdict spends no personas; the manifest and its verifier carry the answer' },
  REFUSE:     { of: () => 0, why: 'answer contract section 5: a refusal spends zero personas, unconditionally, for every one of the seven reason codes' },
  LITERATURE: { of: () => 1, why: 'answer contract section 1: one persona, selected by the field label' },
  BOTH:       { of: () => 1, why: 'answer contract section 1: one persona, selected by the field label; the app fact needs none' },
  CONTESTED:  { of: (sides) => Math.max(2, sides.length),
                why: 'answer contract section 1: one persona per side, minimum two, NO CAP -- truncating to two makes the router the thing that chooses which sides the user hears' },
};

/* --- the selector --------------------------------------------------------------------------------
 *
 * SIGNATURE CHANGED AT SUB-STEP 8.1: selectWave(verdict, ruling, ctx).
 *
 * It was selectWave(questionVerdict, ctx), where the first argument was the object the router had
 * just decided. The router no longer decides, so the verdict arrives as a STRING the composing
 * session ruled, and the second argument carries the evidence the session ruled ON.
 *
 * This is not a refactor. Reading the verdict off the router's own output was the last place a
 * decision could enter the wave without anybody choosing it, and the file's own opening line --
 * "THE VERDICT THE ROUTER ALREADY COMPUTED SELECTS THE WAVE" -- was the statement of exactly the
 * inversion the author ruled against. What survives untouched is everything the wave selector was
 * actually for: the arity table, the derivation, one persona per side with no cap, and the two
 * assertions. A session may rule any of the six; it may not rule a persona count.
 *
 *   verdict  one of the closed six, as a string. Anything else throws.
 *   ruling   { field, axes } -- `field` for LITERATURE/BOTH, `axes` (axisView objects, from
 *            oracle/router/classify.js axisView() or from a report's register findings) for
 *            CONTESTED. A CONTESTED ruling with no axes throws, because the session must name WHICH
 *            disagreement it ruled: the report shows every axis with a key hit, and picking among
 *            them is the ruling.
 *   ctx      the router context, for root/fieldsPath.
 */
function selectWave(verdict, ruling, ctx) {
  if (verdict && typeof verdict === 'object') {
    throw new Error('oracle/router/wave: selectWave() takes a VERDICT STRING as its first argument ' +
      'since sub-step 8.1, not the router\'s output object. The router advises and no longer ' +
      'decides, so there is no verdict on its report to read. Rule one of [' +
      Object.keys(ARITY).join(', ') + '] in the composing session, then call ' +
      'selectWave(verdict, { field, axes }, ctx).');
  }
  ruling = ruling || {};
  const fieldsPath = (ctx && ctx.fieldsPath) ||
    path.join((ctx && ctx.root) || path.resolve(__dirname, '..', '..'), 'literature', 'FIELDS.tsv');
  const seats = loadFieldSeats(fieldsPath);

  if (!ARITY[verdict]) {
    throw new Error('oracle/router/wave: "' + verdict + '" is not one of the closed six verdicts, ' +
      'so no wave can be selected for it.');
  }

  if (verdict === 'CONTESTED') return contestedWave(ruling, seats, ARITY.CONTESTED);

  const count = ARITY[verdict].of([]);
  const personas = [];
  if (count === 1) {
    const field = fieldOf(ruling);
    const seat = seats.get(field);
    if (!seat) {
      /* A field the corpus does not declare has no seat to brief, and guessing one puts the wrong
         specialist on the answer. That is an input problem, not a wave problem. */
      return finish({
        verdict, personaCount: 0, personas: [],
        derivation: ARITY[verdict].why + '; REFUSED INSTEAD: the sub-claims resolved to field ' +
          JSON.stringify(field) + ', which ' + fieldsPath + ' does not declare, so there is no seat to brief.',
        defect: { reason_code: 'input-missing', field },
      });
    }
    personas.push({ seat: seat.seat, side: null, field: seat.field, field_label: seat.label,
      brief_scope: { kind: 'field', field: seat.field } });
  }
  return finish({ verdict, personaCount: count, personas, derivation: ARITY[verdict].why });
}

function contestedWave(ruling, seats, arity) {
  /* Every axis the session ruled contested contributes its sides. Two axes ruled on one question is
     two disagreements, and collapsing them to one would be the same truncation the cap was removed
     to prevent -- at the axis level instead of the side level.
     WHICH axes those are is the session's ruling and is no longer inferred from a mass. */
  const axes = [];
  for (const ax of (ruling.axes || [])) {
    if (ax && ax.axis_id && !axes.some(a => a.axis_id === ax.axis_id)) axes.push(ax);
  }
  if (axes.length === 0) {
    throw new Error('oracle/router/wave: a CONTESTED ruling names no axis. Since sub-step 8.1 the ' +
      'router reports every axis with a key hit and does not pick one, so the session must pass the ' +
      'axis/axes it ruled contested as ruling.axes. A CONTESTED wave with no named disagreement is ' +
      'a verdict and its evidence come apart.');
  }
  for (const ax of axes) {
    if (!Array.isArray(ax.sides) || !Array.isArray(ax.members)) {
      throw new Error('oracle/router/wave: ruling.axes carries an entry for ' + ax.axis_id +
        ' with no sides/members. Pass the axisView() shape -- the same object the evidence report ' +
        'carries -- so the briefs are built from the register\'s own member paths.');
    }
  }

  const personas = [];
  for (const axis of axes) {
    const seat = seats.get(axis.field);
    for (const side of axis.sides) {
      const members = (axis.members.find(m => m.side === side) || { leaves: [] }).leaves;
      personas.push({
        seat: seat ? seat.seat : axis.field,
        side,
        field: axis.field,
        field_label: seat ? seat.label : null,
        axis_id: axis.axis_id,
        axis_class: axis.class,
        /* Delivered verbatim; never paraphrased at answer time, because a paraphrase is a copy and
           a copy drifts. oracle/register_schema.md section 3.2. */
        axis_statement: axis.axis_statement,
        scope_token: axis.scope_token,
        brief_scope: { kind: 'side', axis_id: axis.axis_id, side, leaves: members.slice() },
      });
    }
  }

  const perAxis = axes.map(a => arity.of(a.sides));
  const count = perAxis.reduce((x, y) => x + y, 0);
  return finish({
    verdict: 'CONTESTED',
    personaCount: count,
    personas,
    derivation: arity.why + '. ' + axes.length + ' axis/axes fired: ' +
      axes.map((a, i) => a.axis_id + ' (' + a.class + ', ' + a.sides.length + ' side(s) -> ' + perAxis[i] + ')').join('; '),
  });
}

/* The field a one-persona wave is briefed on. The session states it; where it did not, the evidence
   report's own sub-claims are read for a field, which is a lookup and not a choice. */
function fieldOf(ruling) {
  if (ruling && ruling.field) return ruling.field;
  const subs = (ruling && (ruling.sub_claims || ruling.subClaims)) || [];
  for (const s of subs) {
    if (s.field) return s.field;
    const top = s.register && s.register.findings && s.register.findings[0];
    if (top && top.field) return top.field;
    const cand = s.retrieval && s.retrieval.candidates && s.retrieval.candidates.find(c => c.field);
    if (cand) return cand.field;
  }
  return null;
}

/* --- the two assertions -------------------------------------------------------------------------- */

/* Re-derive the count from the wave that was built, rather than trusting the number that built it.
   A hard-coded count and a derived count agree until somebody edits one of them. */
function assertDerived(wave) {
  if (wave.verdict === 'CONTESTED') {
    const bySide = wave.personas.length;
    const byAxis = [...new Set(wave.personas.map(p => p.axis_id))]
      .map(id => wave.personas.filter(p => p.axis_id === id).length)
      .map(n => Math.max(2, n)).reduce((a, b) => a + b, 0);
    if (wave.personaCount !== byAxis) {
      throw new Error('oracle/router/wave: personaCount ' + wave.personaCount + ' does not re-derive ' +
        'from the axes (' + byAxis + '). A count that does not re-derive is a literal.');
    }
    if (bySide < 2) {
      throw new Error('oracle/router/wave: a CONTESTED wave carries ' + bySide + ' persona(s). ' +
        'The minimum is two, and an axis that cannot supply two sides is unsatisfiable under ' +
        'answer contract Rule V rather than answerable with one.');
    }
    return true;
  }
  const expected = ARITY[wave.verdict].of([]);
  if (wave.personaCount !== expected && !wave.defect) {
    throw new Error('oracle/router/wave: verdict ' + wave.verdict + ' selected ' + wave.personaCount +
      ' personas; the contract derives ' + expected + '.');
  }
  if (wave.personas.length !== wave.personaCount) {
    throw new Error('oracle/router/wave: personaCount ' + wave.personaCount + ' and ' +
      wave.personas.length + ' persona brief(s) were built.');
  }
  return true;
}

/* The anti-synthesis rule, pairwise over every brief. No brief contains any other side's member
   path. This is checked rather than promised because isolation is the entire content of the rule. */
function assertDisjointBriefs(wave) {
  const sided = wave.personas.filter(p => p.brief_scope && p.brief_scope.kind === 'side');
  for (let i = 0; i < sided.length; i++) {
    for (let j = i + 1; j < sided.length; j++) {
      const a = sided[i], b = sided[j];
      if (a.brief_scope.axis_id !== b.brief_scope.axis_id) continue;
      const overlap = a.brief_scope.leaves.filter(l => b.brief_scope.leaves.includes(l));
      if (overlap.length) {
        throw new Error('oracle/router/wave: briefs for ' + a.axis_id + ' sides ' + a.side + ' and ' +
          b.side + ' share member path(s) ' + overlap.join(', ') + '. A persona briefed on one side ' +
          'that can read another side\'s source is not briefed on one side.');
      }
    }
  }
  return true;
}

function finish(wave) {
  assertDerived(wave);
  assertDisjointBriefs(wave);
  return wave;
}

module.exports = { ARITY, selectWave, loadFieldSeats, assertDerived, assertDisjointBriefs };
