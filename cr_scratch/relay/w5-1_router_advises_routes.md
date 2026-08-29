# W5-1 routes out — the router advises, and two files outside my write set assert a verdict

**From** The Software Engineer, seat W5-1, sub-steps 8.1 / 8.2 / 8.6.
**Write set** `oracle/router/**`, `tools/address.js`, `tools/exclusions_match.js`,
`cr_scratch/step8_w5-1_router_advises.md`. Neither file below is in it, so neither is edited.

## What changed at the interface

`oracle/router/classify.js` no longer emits a verdict. Three entry points are retired and **throw a
sentence naming the replacement** rather than returning `undefined`:

| retired | replacement |
|---|---|
| `classifyQuestion(ctx, text)` | `adviseQuestion(ctx, text)` → an evidence report, no verdict |
| `classifySubClaim(ctx, piece)` | `adviseSubClaim(ctx, piece)` |
| `compose(subs)` | nothing — composition **was** the decision |
| `assertOneMode(sub, text)` | `assertNoVerdict(report)` and `assertVerdict(v)` |

`oracle/router/wave.js`:

```
  was   selectWave(questionVerdictObject, ctx)
  now   selectWave(verdictString, { field, axes }, ctx)
```

The old object-shaped call is **refused by name**, not silently accepted, because silently accepting
it is how a verdict arrives without anybody ruling it.

## R-1 — `oracle/tests/run_suite.js`, RFX-01..33. OWED. Owner: the suite seat.

Each row calls `classifyQuestion` and compares `q.verdict` against the axis class. That property no
longer exists. **29 rows moved from pass to fail and every one carries the migration sentence**, so
nothing is silent, but nothing is measuring either.

What the rows should assert instead, stated so it does not need re-derivation:

```js
const r = L.C.adviseQuestion(L.ctx, ax.probe_pos);
const f = r.sub_claims.flatMap(s => s.register.findings).find(x => x.axis_id === axisId);
// the axis appears in its OWN probe's findings at all -- it used to be filtered out below K
// f.mass, f.margin, f.side_of_mark, f.confidence are the reportable measurement
// f.sides_declared / f.sides_resolved / f.unresolved_members replace the axis-incomplete refusal
const w = L.W.selectWave('CONTESTED', { axes: [f_as_axisView], field: ax.field }, L.ctx);
// w.personaCount === sides  -- UNCHANGED, and still the assertion worth having
```

**The `af7abec` four are not silenced and are not mine to silence.** RFX-04/07/09/13 recorded that
LCC-04, LCC-07, LCC-09 and LCC-13 do not reach K on their own `probe_pos`. That measurement is now
printed by `node oracle/router/acceptance.js` under **AXES BELOW THE MARK ON THEIR OWN probe_pos**,
at higher resolution than the verdict comparison ever gave — with the masses and the signed margins
the old rows never printed:

```
  LCC-09  two_sided   mass 0.919  margin -1.512  on [solar,power]
  LCC-07  two_sided   mass 0.968  margin -1.463  on [oxygen]
  LCC-04  two_sided   mass 1.174  margin -1.257  on [energy,water]
  LCC-14  one_sided   mass 1.234  margin -1.197  on [energy,regolith]
  LCC-13  two_sided   mass 2.087  margin -0.344  on [helium]
```

Five, not four. **LCC-14 is the fifth and it never failed RFX**, because it is `one_sided` and RFX
expects `LITERATURE or BOTH` for that class — so a `one_sided` axis missing its own probe was
invisible to the old row by construction. That is a finding the relocation produced.

## R-2 — `oracle/tests/fault_inject.js`. OWED. Owner: the fault-injection seat.

`runLoop()` calls `classifyQuestion` and reads `r.verdict` / `r.reason_code`. Three decoys fail on
the interface, and **none of them is a behavioural regression**. Measured, directly, after the
change:

| decoy | row | why it fails | is the behaviour intact? |
|---|---|---|---|
| `I4b-missing` | INV-7 | expects `REFUSE/input-missing`; gets the migration throw | **Yes.** `loadContext({appPath:'C:/nope'})` still sets `ctx.refuse`, and `adviseQuestion` returns `inputs_unavailable: ["the app at C:/nope"]` with `sub_claims: []`. A shelf-only answer to an app question remains impossible — there are no sub-claims to carry one. |
| `I5-dropped-side` | RFX-35 | same throw | **Yes.** Side resolution against `INDEX.tsv` is kept, and the assertion that no side vanishes from the report still throws. |
| `I6-value-output` | — | same throw | **Yes.** RT-05 in `oracle/router/tests/router_suite.js` covers it: the swept address over all 11 rail points with `unbound_dimension: 'landed_cost'`. |

Re-point: read `report.inputs_unavailable` where the decoy read `REFUSE/input-missing`, and
`report.sub_claims[i].<channel>.findings` where it read a verdict.

**Two decoys that were failing at the wave open now pass, and the cause is a bug I fixed.**
`loadContext` declared `registerPaths` and ignored it, so `I4c` and `I4d` had to inject through a
staged `root` and came back NOT APPLIED. `registerPaths` is honoured now.

```
  fault_inject   before  8 decoys written, 5 applied
                 after   8 decoys written, 8 applied, 5 pass, 3 fail
  INV group      before  15 rows, 2 pass, 3 fail   (INV-8, INV-9, INV-11)
                 after   15 rows, 4 pass, 1 fail   (INV-11 only)
```

## R-3 — `oracle/acceptance/lunar_questions.md` SRQ-10. FOR 8.7, not a defect here.

SRQ-10 is labelled `BOTH` and is the **one labelled row of fourteen where the evidence a reader would
need is still not reachable**. The app channel reports `resolves: false`: no scenario is named and no
CONFIG/VALUE coefficient matches by key or by unit. What the report *does* carry is `ECR-11` at 1.386
on the single key `transfer`, `T3` crossing the fire mark at 5.961, and five shelf candidates. If
`BOTH` is right, the app half of it is not in the app's own address grammar, and that is a finding
about the grammar rather than about the router's arithmetic. Routed to The Space Resources Engineer
at 8.7 with the numbers.

## R-4 — `oracle/answer_contract.md` §1 and §5. FOR W5-2.

Section 1's table is written as *the router returns a verdict*. It does not. The verdicts and the
persona arities are unchanged and the closed sets are unchanged; what moved is **who picks**. Two
sentences that need to exist somewhere in the contract, offered as text rather than as a request:

> The router does not return a verdict. It returns an evidence report, and the composing session
> rules one of the six from it. The report carries very low weight and states its own failure modes
> inline; a non-match in it is weak evidence of absence and the session is expected to override it
> on judgement.

Also owed and already known: `question_classes.json` does not carry `transfer-unevaluable`, so
`ctx.owed_contract_codes` reports it by name rather than throwing. Unchanged by this seat.
