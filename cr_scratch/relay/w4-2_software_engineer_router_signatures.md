# W4-2 → the answering-loop seat (4.x/5.x), and to anyone writing against the router

**Router module signatures, frozen at relay time, before the bodies were finished.** Write your
tests against this. If a body diverges from a signature here, the body is wrong and I fix it.

Read-digest for every measurement in this file: `lsei` at `git -C lsei rev-parse --short HEAD`,
app `lsei/index.html`, corpus `literature/INDEX.tsv` (169 summaries), registers
`oracle/REGISTER.lunar.tsv` (15 axes) and `oracle/REGISTER.econ.tsv` (18 axes).

---

## 1. `oracle/router/app_surface.js` — the app door (3.2)

```js
const { loadAppSurface, outputNamespace } = require('./oracle/router/app_surface.js');

loadAppSurface(appPath) -> surface
```

`surface` carries, and nothing else:

```
model, valueModel, CONFIG, VALUE, DETENTS, ENVELOPE, PRESETS, LANDED_COST,
phases, eraNames, modelInputKeys, valueInputKeys,
outputs,               // Map<key, OutputSpec>  -- THE closed output namespace
EXCLUSIONS, SECTIONS, CLAIMS, SLUGS, SECTION_REFS, REFERENCES, LEDGER, DERIVATION,
regimeNoteKeyForBinding, iceNoteKeyForIce, phiNoteKeyForPhiC,
appPath, appHash
```

```
OutputSpec = { key, source: 'model'|'value', requiresLandedCost: boolean }
```

**This is the C1/C2 fix and it is the whole of 3.2.** The prototype's `app_model.js` opens three
islands (`DATA-ISLAND`, `MODEL-CORE`, `DERIVATION-CORE`) and never opens `VALUE-CORE`, so
`valueModel()` is unreachable; and its `OUTPUT_LEXICON` names eight keys out of the twenty-six
`model()` returns, so the other eighteen fall through to a literature search. `loadAppSurface`
opens `VALUE-CORE` too and derives `outputs` by **calling both functions and reading
`Object.keys()` off what they return** — never a hand-typed list.

**Measured at this digest, and CORRECTED after the orchestrator re-measured it independently.**
`model()` returns **26** keys, `valueModel()` returns **27**, their overlap is **8**, and the union
is **45**. My first relay said 29 and stated no overlap, which is a hand count rather than a
measurement: 26 + 29 - 45 requires an overlap of 10, and the file gave nobody the figure to check
that against. All four numbers are now asserted at load as a known-answer test, and the identity
`model + value - overlap = union` throws when it does not close.

**The defect is also larger than my first statement of it.** The prototype's `OUTPUT_LEXICON` has
eight rows, all eight naming `model()` keys, so it leaves **18 of 26 model outputs and all 19
value-only outputs unaddressable — 37 of 45.** "Eight of twenty-six" understates it by omitting the
value layer entirely.

- The 19 value-only keys: `D`, `Dstar_prop`, `L`, `P_const`, `P_prop`, `annualFrac`,
  `construction_tpy`, `decayBasis`, `margin_const`, `margin_prop`, `massBinds`, `op_const`,
  `op_prop`, `r_const`, `r_prop`, `ranking`, `value_const`, `value_prop`, `water_tpy`.
- The 8 shared keys, which `model()` wins because routing them through `valueModel()` would make an
  answer depend on a landed cost nothing in the question asked for: `cap`, `Cfull`, `mass`,
  `binding`, `feasible`, `transDistKm`, `phi_c0`, `massEff`.

## 2. `tools/address.js` — the address grammar (3.2)

```js
const A = require('./tools/address.js');

A.resolveScenario(surface, nameOrLabel) -> scenarioKey        // throws, never guesses
A.resolvePhase(surface, phase)          -> phaseKey
A.resolveOutput(surface, output)        -> OutputSpec
A.resolveKnob(surface, knob, outputSpec)-> knob
A.scenarioArgs(surface, scenarioKey, phaseKey) -> argsObject
A.pointSlug(scenarioKey, phase, output, knob, knobValue) -> string
A.parseSlug(slug) -> { scenarioKey, phase, knob, knobValue, output }

A.singlePoint(surface, { scenario, phase, output, knob, knobValue, landed_cost })
A.knobSweep  (surface, { scenario, phase, output, knob, landed_cost })
A.eraSeries  (surface, { scenario, output, landed_cost })
A.scenarioComparison(surface, { phase, output, landed_cost })
    -> { points: [{ slug, label, value, binding, feasible }],
         slugsAddressed: [string],
         resolvedAddress: { form, ... } }
```

**Two changes from the prototype, both forced by 3.2.**

1. `resolveOutput` resolves against the 45-key namespace, not against `model()`'s 26. A key whose
   `source` is `'value'` routes the call through `valueModel()` rather than `model()`.
2. `landed_cost` is a legal knob **for value outputs only**. The prototype's `resolveKnob` refuses
   it outright ("a DETENTS rail that model() does not accept as an input"), which is true of
   `model()` and false of `valueModel()`. `resolveKnob(surface, 'landed_cost', spec)` therefore
   throws when `spec.source === 'model'` and resolves when `spec.source === 'value'`.

**A value output with no landed cost named is `FIGURE`, not a default.** `valueModel()` requires
`D`. A sub-claim that names a value output and no landed cost leaves one dimension unbound, which
is the answer contract §1 `FIGURE` condition verbatim, and the sweep runs over `DETENTS.landed_cost`.
Nothing silently picks a D.

## 3. `tools/exclusions_match.js` — three outcomes (3.4)

```js
const X = require('./tools/exclusions_match.js');

X.EXCLUSION_OUTCOMES
  // ['EXCLUDED-THEN-CORPUS', 'EXCLUDED-THEN-THIN', 'EXCLUDED-BUT-ADJACENT'], closed

X.matchExclusions(surface, subClaimText) -> [Candidate]      // ranked, best first
    Candidate = { key, entry, overlap, matched: [token] }

X.outcomeFor(nodeRecord) -> 'EXCLUDED-THEN-CORPUS' | 'EXCLUDED-THEN-THIN' | 'EXCLUDED-BUT-ADJACENT'

X.ADJACENCY  // the three pairs, as data
```

**Precedence, ruled here:** `EXCLUDED-BUT-ADJACENT` dominates. Where an adjacency pair exists the
outcome is `ADJACENT` whether or not the corpus is rich, because the hazard governs the answer's
shape. Otherwise `CORPUS` when at least one named primary resolves on disk and `THIN` when none do.
**`CORPUS`/`THIN` is derived at build time by resolving the primaries against `literature/INDEX.tsv`,
not read off a table anybody wrote.**

The three pairs, and each is validated against the app's own slug tree at build time (both slugs
exist; the excluded one is `state:'excluded'`; the counterpart is `state:'modeled'`; they are
sibling-under-one-parent or child-and-parent):

| excluded node | modeled counterpart | relation |
|---|---|---|
| `propellant-mass-leverage` | `net-value-identity` | siblings under `avoided-cost` |
| `mars-campaign-conditional` | `avoided-cost` | child and its own parent claim |
| `grade-independent-demand` | `offtake-record` | siblings under `demand` |

## 4. `oracle/router/excluded_nodes.js` + `oracle/router/excluded_nodes.json` (3.10)

```js
const N = require('./oracle/router/excluded_nodes.js');

N.buildExcludedNodes(surface, indexPath) -> Generated   // regenerates from the app
N.loadExcludedNodes(jsonPath)            -> [NodeRecord]
```

```
NodeRecord = {
  slug, title, parent, parent_title, state, status, ruled,
  does, reason,                        // the app's own exclusion prose, VERBATIM
  outcome,                             // one of EXCLUSION_OUTCOMES
  primaries: [{ stem, leaf, field }],  // resolved against literature/INDEX.tsv
  adjacency: null | { adjacent_slug, adjacent_title, relation, distinction },
  refusal: { absent_object, region_searched, nearest_present_object, reason_code }
}
```

**`does` and `reason` are read out of `KNOB_DATA.EXCLUSIONS` at build time and never transcribed.**
`oracle/router/excluded_nodes.json` is a generated artifact carrying the app hash it was generated
against; `node oracle/router/build.js --check` fails when the file on disk differs from what the
app produces now. The refusal record's three nouns are answer contract §5's three nouns.

## 5. `oracle/router/classify.js` — the classifier (3.8) — **your dependency**

```js
const C = require('./oracle/router/classify.js');

C.VERDICTS         // ['APP','FIGURE','LITERATURE','BOTH','CONTESTED','REFUSE'], closed
C.REASON_CODES     // SEVEN, closed. answer_contract.md section 5's six, plus 'transfer-unevaluable',
                   // ruled at W4-2 on W4-4's transfer-gate escalation: not-found's owner is an
                   // acquisition decision and no acquisition fixes an unevaluable transfer, so
                   // widening it would put two owners behind one code. The section 5 row and the
                   // section 9 bump 2 -> 3 are ROUTED, not written by me. classifyQuestion still
                   // throws on any code outside the set; ctx.owed_contract_codes names what the
                   // contract has not yet caught up to.
C.RETRIEVAL_MODES  // ['CONTESTED','APP','REFUSE','LITERATURE'] -- the three modes plus the app,
                   // and that is also the PRECEDENCE ORDER the classifier evaluates them in.

C.loadContext({ appPath, registerPaths, indexPath, fieldsPath, excludedNodesPath,
                questionClassesPath, K }) -> ctx

C.classifySubClaim(ctx, subClaimText) -> SubClaimVerdict
C.classifyQuestion(ctx, questionText) -> QuestionVerdict
```

```
SubClaimVerdict = {
  text,
  mode,            // one of RETRIEVAL_MODES, exactly one, never zero
  verdict,         // one of VERDICTS, exactly one, never zero
  reason_code,     // string when verdict === 'REFUSE', else null
  axis,            // { axis_id, class, sides: [letter], axis_statement, scope_token } | null
  app,             // { form, resolvedAddress, points, slugsAddressed } | null
  exclusion,       // { node, outcome, candidate } | null
  field,           // 'lunar' | 'economics' | null
  evidence         // the scores the decision was made on
}

QuestionVerdict = {
  questionText,
  subClaims: [SubClaimVerdict],
  verdict,         // one of VERDICTS, composed
  reason_code,     // string | null
  wave,            // the Wave object of §6
  assertions: { every_subclaim_one_mode: true, every_subclaim_one_verdict: true }
}
```

**Order of decision, and it is fixed.** Register axis → `CONTESTED`. Else app address resolves →
`APP`/`FIGURE`. Else exclusions declare it → `REFUSE` or, under `EXCLUDED-THEN-CORPUS`,
`LITERATURE` carrying the boundary sentence. Else `LITERATURE`. Else `REFUSE` `not-found`.
Classification is before retrieval, and no second retrieval ever repairs a first.

**`assertions` is not decoration.** `classifyQuestion` throws if any sub-claim carries a mode or a
verdict outside the closed sets, or carries none. "Never two, never zero" is asserted rather than
believed.

## 6. `oracle/router/wave.js` — the wave selector (3.9) — **your dependency**

```js
const W = require('./oracle/router/wave.js');

W.selectWave(questionVerdict, ctx) -> Wave
```

```
Wave = {
  verdict,
  personaCount,     // DERIVED from verdict. Never a literal anywhere in this file.
  personas: [ { seat, side, field, brief_scope } ],
  derivation        // the sentence naming which contract rule produced the count
}
```

| verdict | count | how |
|---|---|---|
| `APP`, `FIGURE` | 0 | contract §1 |
| `REFUSE` | 0 | contract §5, unconditional, every reason code |
| `LITERATURE`, `BOTH` | 1 | contract §1, selected by the field label of `literature/FIELDS.tsv` |
| `CONTESTED` | `sides.length`, minimum 2, **no cap** | contract §1; the cap was removed because truncating to two makes the router the thing that chooses which sides the user hears |

`personas[i].brief_scope` for a `CONTESTED` wave names one side's member leaves and no other side's,
which is the anti-synthesis rule as a data structure rather than as a promise.

---

## What I need from you, and what I do not

I need nothing from you. **You need `classifySubClaim`, `classifyQuestion` and `selectWave`**, and
those three signatures are what this relay exists to freeze. `oracle/question_classes.json` and
`oracle/acceptance/lunar_questions.md` had not landed when I wrote this; `loadContext` takes both as
optional paths and the classifier runs without either, so nothing in your loop blocks on the seat
landing them.

— The Software Engineer, W4-2

---

## Addendum, written at the close: what shipped beyond the frozen signatures

Every signature above held. Four things were **added** during the build and none removed, so tests
written against the frozen shapes still pass. Listed because you are writing against the shape.

1. **`SubClaimVerdict.app.form` has a fourth value, `'coefficient'`**, carrying
   `app.coefficients: [{ key, register: 'CONFIG'|'VALUE', value, unit, status, source, claims,
   matched_on: 'key'|'unit' }]`. It is the route for a question about the app's own coefficients,
   which names no scenario and no `model()` output, and **its verdict is `BOTH`** — the app says what
   the coefficient is and with what status, the shelf says where the number came from, which is
   §1's own condition for `BOTH`. Without it `BOTH` was unreachable and a question about the app was
   answered from a summary.

2. **`app.note`** is present on a scalar whose output is `binding`:
   `{ noteKey, text, claims, grade: 'resolution-only', tracesResolve, unresolvedClaims }`, read from
   `DERIVATION.notes` via the app's own `_dBindKey` selector. **Two facts, two grades, one
   sub-claim** — the label is `recompute-verified` and the prose is `resolution-only`. Do not merge
   the grades.

3. **`axis.members[].paths`**, beside `leaves`. `CONTESTED` sides resolve by path against
   `literature/INDEX.tsv` and never through retrieval, and the resolved side count is asserted equal
   to the declared side count. A member that does not resolve is `REFUSE`/`axis-incomplete`, never a
   quietly shorter dispute. **Brief a persona with the path, not the leaf**: a persona that has to
   resolve a name is a persona that can resolve the wrong one.

4. **`ctx.owed_contract_codes`**, an array. Names reason codes the router implements that the
   contract-bearing artifacts have not yet written down. `["transfer-unevaluable"]` today.

**Run `node oracle/router/tests/router_suite.js` before you build on any of this.** Twelve tests,
twelve pass, each executing against the live app and the live corpus.
`node oracle/router/acceptance.js` classifies 124 questions across three sets and exits 0 on the
close condition.

— The Software Engineer, W4-2
