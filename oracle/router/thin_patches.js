/* oracle/router/thin_patches.js -- the thin-patch register, consumed BEFORE retrieval.
 *
 * Sub-step 3.5 authored oracle/thin_patches.json; sub-step 3.3 specifies that the router consumes
 * it before retrieval. This file is that consumption, and until it landed the register was correct,
 * calibrated, and read by nothing.
 *
 * TWO TIERS, AND CONFLATING THEM IS WHAT MAKES A SINGLE THRESHOLD FAIL. The Space Resources
 * Engineer's own words, and the measurement behind them is the reason this file has two constants
 * rather than one:
 *
 *   FIRE    (mass >= fire_threshold)     the patch attaches its `substitution` to the answer as
 *                                        CONTENT. The verdict does not move.
 *   GOVERN  (mass >= govern_threshold)   the patch's `refusal_code` becomes the VERDICT.
 *
 * T3 fires on SRQ-10 at 5.961 and SRQ-10 is `BOTH` -- its own Must-carry cell says T3 fires there.
 * A one-tier rule must either silence that legitimate fire or turn a `BOTH` into a `REFUSE`.
 *
 * THE MASS RULE, NOT A COUNT RULE. Under any-token-fires, T1 fires on SRQ-7 on the single token
 * `regolith` and T2 fires on SRQ-13 on `bearing`. Both are correct vocabulary and wrong triggers on
 * their own. IDF is lunar-scoped, from the retrieval layer's own field tables.
 *
 * THE THRESHOLDS ARE READ, NEVER TYPED HERE. They live in oracle/router/thin_threshold.json, the
 * same posture K takes in oracle/router/axis_threshold.json, and are re-measured by
 * oracle/router/calibrate_thin.js. An absent artifact refuses `input-missing` before classification
 * rather than defaulting -- because a defaulted threshold here does not fail loudly, it silently
 * converts correct answers into refusals, which is exactly what a band measured on too few controls
 * already did once on this sub-step.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const LIT = require('../retrieval/literature_search.js');

function loadThinPatches(jsonPath) {
  const reg = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (!Array.isArray(reg.patches) || reg.patches.length === 0) {
    throw new Error('oracle/router/thin_patches: ' + jsonPath + ' carries no patches -- refusing ' +
      'rather than governing nothing, which is indistinguishable from the register being absent.');
  }
  return reg;
}

/* mass = sum over the patch's trigger_tokens present in the question's tokens of the lunar-scoped
   IDF of that token. */
function patchMass(litDir, patch, questionTokens) {
  const qs = new Set(questionTokens);
  const hits = (patch.trigger_tokens || []).filter(t => qs.has(t));
  let mass = 0;
  for (const t of hits) mass += LIT.idfFor(litDir, 'lunar', t);
  return { mass, hits };
}

/* Every patch scored against one sub-claim, ranked by mass. `fired` and `governing` are computed
   against the two tiers; `governing` is always a subset of `fired`, asserted rather than assumed. */
function matchThinPatches(ctx, text) {
  const tokens = LIT.tokenize(text);
  const scored = ctx.thinPatches.patches.map(p => {
    const { mass, hits } = patchMass(ctx.litDir, p, tokens);
    return { id: p.id, patch: p, mass, hits };
  }).filter(s => s.mass > 0).sort((a, b) => b.mass - a.mass);

  const fired = scored.filter(s => s.mass >= ctx.thinFire);
  const governing = scored.filter(s => s.mass >= ctx.thinGovern);
  for (const g of governing) {
    if (!fired.includes(g)) {
      throw new Error('oracle/router/thin_patches: ' + g.id + ' governs at mass ' + g.mass +
        ' without firing. The govern threshold (' + ctx.thinGovern + ') is below the fire threshold (' +
        ctx.thinFire + '), which makes a patch the verdict without making it content.');
    }
  }
  return { scored, fired, governing, top: governing[0] || fired[0] || null };
}

/* The substitution record a refusal is written from. R3: name the specific missing measurement,
   then the nearest real evidence and what that evidence IS INSTEAD. Fields, not a sentence, so the
   prose seat renders it and the router does not own wording it cannot check. The strings are the
   register's own bytes. */
function substitutionRecord(hit) {
  const p = hit.patch;
  return {
    patch_id: p.id,
    title: p.title,
    absent_object: p.absent,
    substitution: p.substitution,
    nearest_present_object: (p.nearest_evidence || []).map(e => ({ path: e.path, what: e.what })),
    three_named_facts_required: true,
    reason_code: p.refusal_code || 'not-found',
    mass: Number(hit.mass.toFixed(3)),
    triggered_on: hit.hits,
  };
}

/* K1 TOKEN FORM, applied to every literal this project compares against tokenizer output.
   oracle/register_schema.md section 4.1 states the check for register match_keys; the same check is
   owed by every other such literal, and 9 of 120 thin-patch trigger tokens failed it before the
   register was repaired. Three failure classes and each is silent: a hyphenated key tokenizes to
   two tokens and matches neither; an uppercase key never equals a lowercased token; a key that is
   pure punctuation or a stopword tokenizes to nothing at all. */
function checkTokenForms(literals, label) {
  const bad = [];
  for (const k of literals) {
    const t = LIT.tokenize(String(k));
    if (t.length !== 1 || t[0] !== String(k)) {
      bad.push({ label, key: k, tokenizes_to: t,
        why: t.length === 0 ? 'tokenizes to nothing (punctuation, a stopword, or one character)'
           : t.length > 1 ? 'tokenizes to ' + t.length + ' tokens and matches none of them'
           : 'tokenizes to "' + t[0] + '", which is not the literal' });
    }
  }
  return bad;
}

module.exports = { loadThinPatches, patchMass, matchThinPatches, substitutionRecord, checkTokenForms };
