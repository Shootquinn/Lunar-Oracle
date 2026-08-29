/* tools/exclusions_match.js -- match a sub-claim against the app's own EXCLUSIONS register, and
 * decide which of THREE outcomes the match produces.
 *
 * Sub-step 3.4. Reimplementation of lsei/oracle/lib/exclusions_match.js, which is READ-ONLY.
 *
 * WHAT CHANGES, AND WHY IT IS THE WHOLE SUB-STEP. The prototype has one outcome. Its own header
 * calls an EXCLUSIONS hit "the strongest form of refusal available," which is correct about the
 * APP-AUTHORITY question and wrong about the USER'S question. The app's exclusion prose says what
 * THE APP does not do. It does not say the question is unanswerable, and on this shelf the corpus
 * answers most of them well. A router that reads "this app does not model oxygen production" as
 * "nobody can answer that" refuses six questions it could have answered from named primaries.
 *
 *   EXCLUDED-THEN-CORPUS   the app declares the boundary; the corpus holds a real primary; the
 *                          answer comes from the corpus and is never dressed as an app output.
 *   EXCLUDED-THEN-THIN     the app declares the boundary and the corpus is thin. Refuse, and name
 *                          the specific missing measurement rather than the general limitation.
 *   EXCLUDED-BUT-ADJACENT  the app models something that LOOKS like the answer. The answer states
 *                          the distinction explicitly or the reader takes the adjacent number as
 *                          the answer. This is the outcome with no mechanism in the prototype and
 *                          it is where the real damage is.
 *
 * PRECEDENCE, RULED HERE. EXCLUDED-BUT-ADJACENT dominates. Where an adjacency pair exists the
 * outcome is ADJACENT whether or not the corpus is rich, because the hazard governs the SHAPE of
 * the answer and the corpus governs only its content: an adjacent app number can be returned
 * beside a rich corpus answer and still be misread as the answer. Otherwise the outcome is CORPUS
 * when at least one named primary resolves on disk and THIN when none do.
 *
 * THE CORPUS/THIN SPLIT IS DERIVED, NOT DECLARED. It is computed at build time by resolving the
 * node's named primaries against literature/INDEX.tsv. The declared assignment in
 * oracle/question_classes.json is treated as a PREDICTION and checked against the derivation; a
 * disagreement is reported by oracle/router/build.js rather than silently resolved, because
 * whichever side is wrong, a build that hides the disagreement is the container-versus-content
 * defect again.
 *
 * THE THREE ADJACENCY PAIRS ARE DATA, NOT PROSE, AND THIS FILE DOES NOT AUTHOR THEM. They come out
 * of oracle/question_classes.json, which The Space Resources Engineer authored at 3.3, and every
 * pair is validated against the app's own slug tree before it is used: both slugs exist, the
 * excluded one carries state 'excluded', the counterpart carries state 'modeled', and the two are
 * structurally adjacent -- siblings under one parent, or a child and its own parent claim.
 */
'use strict';

const EXCLUSION_OUTCOMES = ['EXCLUDED-THEN-CORPUS', 'EXCLUDED-THEN-THIN', 'EXCLUDED-BUT-ADJACENT'];

/* The tokenizer is the retrieval layer's own, not a fourth copy. A matcher that tokenizes
   differently from the searcher it competes with is comparing two different questions. */
const { tokenize } = require('../oracle/retrieval/literature_search.js');

/* Score one EXCLUSIONS entry against a sub-claim, using the entry's OWN "does" and "reason" text --
   the app's own words for the boundary, never a hand-typed keyword list per entry. Plain overlap
   count, as in the prototype: there are ten entries and further weighting would not change a rank. */
function scoreExclusion(subClaimTokens, key, entry) {
  const entryTokens = new Set(tokenize((entry.does || '') + ' ' + (entry.reason || '')));
  const qSet = new Set(subClaimTokens);
  const matched = [...qSet].filter(t => entryTokens.has(t));
  return { key, entry, overlap: matched.length, matched };
}

/* Ranked candidates, best first. Empty array rather than a throw when nothing overlaps; the caller
   decides what an empty result means.
 *
 * MEASURED LIMIT OF THIS JOIN, and it is the reason for the optional second argument. The app's
 * boundary prose is written in the APP'S vocabulary about what the app does not model, and a user's
 * question is written in the user's vocabulary about the world. On two of the ten nodes the two
 * share no token at all: "How often must lunar propellant be transferred to keep boil-off within
 * limits?" is exactly the `cadence-cryogenic-break` question and scores ZERO against "This app does
 * not model programme milestones." So the node falls through to a shelf search, which confirms an
 * off-topic file on shared domain vocabulary and answers.
 *
 * That is oracle/register_schema.md section 4's argument, arriving at a second object: `match_keys`
 * "cannot be derived from the summaries: it requires knowing how a user phrases a question," which
 * is why it is a domain deliverable. An excluded node needs the same field for the same reason.
 * `nodesBySlug` is where that field is read from once a domain seat authors it; until then the
 * matcher scores the app's prose alone and the gap is a reported finding rather than a silence. */
function matchExclusions(surface, subClaimText, nodesBySlug) {
  const EXCLUSIONS = (surface && surface.EXCLUSIONS) || surface || {};
  const tokens = tokenize(subClaimText);
  const qSet = new Set(tokens);
  return Object.keys(EXCLUSIONS)
    .map(key => {
      const c = scoreExclusion(tokens, key, EXCLUSIONS[key]);
      const node = nodesBySlug && nodesBySlug.get ? nodesBySlug.get(key) : null;
      const keys = (node && node.match_keys) || [];
      const keyHits = keys.filter(k => qSet.has(k) && !c.matched.includes(k));
      if (keyHits.length) {
        c.matched = c.matched.concat(keyHits);
        c.overlap += keyHits.length;
        c.match_key_hits = keyHits;
      }
      return c;
    })
    .filter(c => c.overlap > 0)
    .sort((a, b) => (b.overlap - a.overlap) || (a.key < b.key ? -1 : 1));
}

/* The tied top band, which is what the router acts on: two entries at equal overlap are two
   boundaries the app declares over one sub-claim, and picking one by key order would be the router
   choosing which boundary the user hears. */
function topBand(candidates) {
  if (!candidates.length) return [];
  const top = candidates[0].overlap;
  return candidates.filter(c => c.overlap === top);
}

/* --- the three outcomes ----------------------------------------------------------------------- */

/* Derived from the node record built by oracle/router/excluded_nodes.js. Takes the record rather
   than the slug, so that this function has no table of its own to drift. */
function outcomeFor(node) {
  if (!node) throw new Error('tools/exclusions_match: outcomeFor needs a node record.');
  if (node.adjacency) return 'EXCLUDED-BUT-ADJACENT';
  const resolved = (node.primaries || []).filter(p => p.leaf).length;
  return resolved > 0 ? 'EXCLUDED-THEN-CORPUS' : 'EXCLUDED-THEN-THIN';
}

/* What each outcome does to the verdict. This is the join between 3.4's three outcomes and the
   answer contract's six verdicts, and it is a table rather than a branch because the classifier
   must be able to assert that every outcome maps to exactly one verdict.
 *
 * EXCLUDED-THEN-CORPUS is NOT a refusal. Answer contract section 5: `excluded` is the weakest of
 * the six reason codes, its owner is nobody, and "a code that routes to nobody must never mask a
 * code that routes to someone." A node whose corpus holds a named primary has an answer; refusing
 * it writes a no-owner code over a real one.
 *
 * EXCLUDED-THEN-THIN refuses `not-found`, not `excluded`, and that is the whole force of section 5's
 * precedence rule. A thin corpus is a corpus gap and an acquisition decision, which is exactly the
 * owner `not-found` routes to; `excluded` routes to nobody. Writing `excluded` here would file a
 * repairable gap under a code that names no one to repair it. The specific missing measurement is
 * carried in the node's own `thin_patches`, so the refusal names it rather than the general
 * limitation.
 *
 * EXCLUDED-BUT-ADJACENT refuses `excluded`, and it is the ONLY outcome that does. It is also the
 * only one where nobody owns a fix, which is what section 5 says the code means: the app has ruled,
 * the adjacent modeled node is present, and no acquisition and no grammar change would make the
 * excluded question answerable from the app. What the refusal spends itself on is naming the
 * adjacent node as the refusal's third noun -- the "nearest present object" slot is exactly where
 * the distinction belongs, and without it the reader takes the adjacent number as the answer.
 */
const OUTCOME_VERDICT = {
  'EXCLUDED-THEN-CORPUS':  { verdict: 'LITERATURE', reason_code: null,
    why: 'the app declared the boundary and the corpus holds a named primary; the answer comes from the corpus and the boundary sentence is printed beside it, never as an app output' },
  'EXCLUDED-THEN-THIN':    { verdict: 'REFUSE', reason_code: 'not-found',
    why: 'the app declared the boundary and no named primary resolves on the shelf; a thin corpus is a corpus gap, which is what not-found routes to' },
  'EXCLUDED-BUT-ADJACENT': { verdict: 'REFUSE', reason_code: 'excluded',
    why: 'the app models an adjacent quantity that reads as the answer and is not; the refusal names it as the nearest present object and states the distinction' },
};

/* One outcome, one verdict, one reason code. No conditional branch inside an outcome, because a
   branch here would be a fourth outcome that the closed set of three does not name. */
function verdictForOutcome(outcome, node) {
  const row = OUTCOME_VERDICT[outcome];
  if (!row) throw new Error('tools/exclusions_match: "' + outcome + '" is not one of the three outcomes.');
  return row;
}

/* --- adjacency validation --------------------------------------------------------------------- */

/* A pair is structurally adjacent when the two slugs are siblings under one parent, or when one is
   the other's own parent claim. Anything else in the pair table is a defect in the table, and it
   fails the build rather than being repaired here. */
function adjacencyRelation(tree, excluded, modeled) {
  const a = tree[excluded], b = tree[modeled];
  if (!a) return { ok: false, why: '"' + excluded + '" is not a slug the app carries' };
  if (!b) return { ok: false, why: '"' + modeled + '" is not a slug the app carries' };
  if (a.state !== 'excluded') return { ok: false, why: '"' + excluded + '" carries state "' + a.state + '", not "excluded"' };
  if (b.state !== 'modeled') return { ok: false, why: '"' + modeled + '" carries state "' + b.state + '", not "modeled"' };
  if (a.parent && a.parent === b.parent) return { ok: true, relation: 'siblings under ' + a.parent };
  if (a.parent === modeled) return { ok: true, relation: 'child of ' + modeled };
  if (b.parent === excluded) return { ok: true, relation: 'parent of ' + modeled };
  return { ok: false, why: '"' + excluded + '" (parent ' + a.parent + ') and "' + modeled +
    '" (parent ' + b.parent + ') are neither siblings nor parent-and-child; an adjacency pair that ' +
    'is not adjacent in the app\'s own tree is a claim about the app that the app does not make' };
}

module.exports = {
  EXCLUSION_OUTCOMES, OUTCOME_VERDICT,
  tokenize, scoreExclusion, matchExclusions, topBand,
  outcomeFor, verdictForOutcome, adjacencyRelation,
};
