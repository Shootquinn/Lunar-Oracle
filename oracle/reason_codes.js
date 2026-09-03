#!/usr/bin/env node
/* oracle/reason_codes.js -- THE SINGLE DECLARATION OF THE REFUSAL REASON-CODE SET.
 *
 * Landed at Step 48 sub-step 2 on The Manager's Ruling 1. Every other site in this repository
 * DERIVES from this file. If you are adding a code, this is the only place a code is written down,
 * and `--render-section-5` regenerates the contract's own table from here.
 *
 * WHY A NEW FILE RATHER THAN ONE OF THE FIVE THAT ALREADY CARRIED THE SET. The set was declared in
 * five places and three of them had drifted to six members while the contract said seven. The
 * question "which of the five is the authority" has no good answer, and the ruling is that none of
 * them is: an authority chosen from among the consumers inverts the layering. Two consequences of
 * that, stated because they are the reasons and not decoration:
 *
 *   1. A LOG LINTER MUST NOT TAKE ITS EXPECTATION FROM THE SUBSYSTEM IT VERIFIES.
 *      `tools/verify_answers.js` checks the router's output. Had it imported the router's array,
 *      a router that widened its set would silently widen what the linter accepts, and a visible
 *      drift would have become an invisible agreement -- strictly worse than the fork being fixed.
 *      Both files are consumers of this one. Neither can move the other's expectation.
 *
 *   2. THE FILE THE ROUTER VALIDATES CANNOT BE THE FILE THE ROUTER DERIVES FROM.
 *      `oracle/question_classes.json` used to carry a `refusal_codes` key and `classify.js` threw
 *      on a code in it the router did not implement. Deriving from it would have converted that
 *      assertion into a tautology. The key is deleted at this step instead; the throw over the
 *      `verdicts` key is untouched and still fires.
 *
 * WHY `.js` AND NOT `.json`, WHICH IS NOT A TASTE CALL. `oracle/check_register.md` §4 declares two
 * scan roots -- `tools` and the JS under `oracle` -- and CL-1 requires every file under them to carry a
 * `C` row. A `.json` under `oracle/` falls outside every closure clause in the register, so an
 * authority written as `.json` is an authority nobody can prove is the only one. This file is
 * covered by CL-1 on the day it lands and its row -- CHK-41 -- landed in the same edit.
 * `oracle/NAMING.md` was checked and does not bind this path: it governs two namespaces,
 * `literature/<folder>/` and `findings/`, and both of its regexes require `.md`.
 *
 * WHY THREE COLUMNS AND NOT A NAME LIST. Answer contract §5's table has three columns and the set
 * is seven BECAUSE of the third one -- the contract's own words are "Each routes to a different
 * owner." `not-found`'s owner is a corpus gap and an acquisition decision; `transfer-unevaluable`'s
 * is whoever can measure the condition. A name list cannot express why the set has the members it
 * has, which makes it a list rather than a declaration, and it cannot catch an owner column being
 * quietly reassigned. Any check that compares this file to the contract compares ALL THREE COLUMNS.
 *
 * PROVENANCE OF THE CELL TEXT. The `condition` and `owner` cells below were LIFTED from
 * `oracle/answer_contract.md` §5's table by a parser, not retyped, and the contract's block is now
 * regenerated from here. The two cannot differ by a character without `REF-2` failing.
 *
 *   node oracle/reason_codes.js                    the set, one line per code
 *   node oracle/reason_codes.js --render-section-5 the contract's §5 table block, on stdout
 */
'use strict';

/* Section 5's table, in section 5's order. ONE RECORD PER CODE, THREE FIELDS PER RECORD. */
const REASON_CODES = [
  { code: 'excluded',
    condition: 'The app\'s EXCLUSIONS register declares the topic.',
    owner: 'Nobody. The app\'s declared boundary, working.' },
  { code: 'not-found',
    condition: 'No address resolved and no shelf file confirmed.',
    owner: 'A corpus gap, and an acquisition decision.' },
  { code: 'unbuildable',
    condition: 'An app address was named in intent and the address grammar cannot build it. Never falls through to a shelf search.',
    owner: 'The address grammar.' },
  { code: 'axis-incomplete',
    condition: 'A register axis matched and a member path does not resolve on disk. Never falls through to search.',
    owner: 'A broken register row.' },
  { code: 'misclassified',
    condition: 'A searched retrieval returned a file belonging to an axis whose `match_keys` this question touched at any nonzero overlap, while classification did not fire that axis at its stated firing rule.',
    owner: 'The axis\'s `match_keys`.' },
  { code: 'input-missing',
    condition: 'A required input is absent, empty, or unparseable.',
    owner: 'The bootstrap.' },
  { code: 'transfer-unevaluable',
    condition: 'The transfer gate reached `unknown`: the object is present in the corpus and a condition of the transfer between two fields cannot be evaluated, because no source on disk measures it. Names the unmeasured condition and the region searched.',
    owner: 'Whoever can measure the condition — a research question, not an acquisition.' },
];

/* The name array, DERIVED. Consumers that want names only take this rather than declaring one.
   It is computed rather than written out for the same reason everything else here is: a second
   literal list in the file that exists to end literal lists would be the joke telling itself. */
const CODES = REASON_CODES.map(r => r.code);

/* Precedence among the codes, answer contract §5. `excluded` routes to nobody and must never mask a
   code that routes to someone, so it is written only when no other code applies. It lives here
   beside the set because it is a statement about the same table.
   `transfer-unevaluable` HAS NO POSITION, and that is §5's statement rather than an omission: it is
   raised by the transfer gate after classification, no question has yet produced it together with
   another code, and the first that does is owed a ruling by the seat that meets it. */
const CODE_PRECEDENCE = ['input-missing', 'misclassified', 'axis-incomplete', 'unbuildable', 'not-found', 'excluded'];

/* The number-word for the arity, so that prose stating the arity can DERIVE it. A corrected literal
   is the same defect with a later expiry date: "closed set of six" written in words is a copy, and
   it is one of the copies that drifted. */
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const arityWord = () => WORDS[CODES.length] || String(CODES.length);

/* --- the contract's §5 table, rendered -----------------------------------------------------------
 * `oracle/answer_contract.md` §5 keeps its table and stops declaring it. The block between the two
 * markers below is generated from the records above; the seventh-code argument, the precedence
 * paragraph, the `misclassified` paragraph and the §11 record around it stay hand-written, because
 * they are prose no generator should touch. */
const BEGIN = '<!-- BEGIN GENERATED reason-code table -- oracle/reason_codes.js --render-section-5 -->';
const END = '<!-- END GENERATED reason-code table -->';

function renderSection5() {
  const nl = String.fromCharCode(10);
  const out = ['| Code | Condition | Who owns the fix |', '|---|---|---|'];
  for (const r of REASON_CODES) out.push('| `' + r.code + '` | ' + r.condition + ' | ' + r.owner + ' |');
  return out.join(nl);
}

if (require.main === module) {
  if (process.argv[2] === '--render-section-5') process.stdout.write(renderSection5() + String.fromCharCode(10));
  else {
    process.stdout.write('closed set of ' + arityWord() + ', answer contract §5:' + String.fromCharCode(10));
    for (const r of REASON_CODES)
      process.stdout.write('  ' + r.code.padEnd(22) + r.owner + String.fromCharCode(10));
  }
}

module.exports = { REASON_CODES, CODES, CODE_PRECEDENCE, arityWord, renderSection5, BEGIN, END };
