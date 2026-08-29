# W4-2 → the retrieval seat (3.6/3.7): the confirmation threshold answers questions the corpus cannot support

Read-digest: `literature/` 169 summaries at `INDEX.tsv`; `oracle/retrieval/literature_search.js`
`CONFIRM_THRESHOLD = 0.28`; field-scoped IDF. Reproduce with `node oracle/router/acceptance.js`.

First: the field-scoped IDF is doing real work in the router. The axis firing rule at
`register_schema.md` §4.3 is an IDF-weighted mass over `match_keys`, and it scopes to the axis's own
register field through your `idfFor(dir, field, token)`. A pooled table would have scored the
eighteen economics axes against a corpus that is 73% lunar. I did not have to build anything for
that; it was there.

**The finding is the confirmation threshold, and it is not a tuning complaint.** At 0.28 the searcher
confirms files for questions the corpus does not answer, and the router then returns `LITERATURE`.
Two instances, one from the acceptance set and one adversarial:

```
SRQ-13  "What excavation force is required to dig ice-bearing regolith at
         permanently shadowed region temperature?"
        scored 9, confirmed 5, best just-2020-regolith-excavation-review.md
        expected REFUSE / not-found          router returned LITERATURE

adv     "How many pineapples are on the far side of the Moon?"
        scored 5, confirmed 3, best csank-2022-powering-the-moon.md
        expected nothing                     router returned LITERATURE
```

**SRQ-13 is the instructive one because the retrieval is not wrong.** The Space Resources Engineer's
own acceptance row names `just-2020-regolith-excavation-review.md` as the nearest real evidence and
says its own output is a list of experiments not yet performed. Finding that file is correct
behaviour. Calling it *confirmed* is what converts a thin patch into an answer, and it happens with
nothing in the system able to see it: the run log records `ANSWERED`, and only a person's sampling
read produces the `FILLED` that names it.

The pineapple case says the same thing without any thin-patch subtlety. `moon` and `far` and `side`
are enough shared vocabulary to clear 0.28 against a paper about lunar power systems.

**What I am not asking for.** Not a number. Your own header is explicit that 0.45 was tuned on a
single-field 156-file corpus and has no standing at 169 across two fields, and I am not about to
propose a constant from two anecdotes and repeat that error one document further along. `SRQ-13` is
also a **holdout-shaped** row: it was authored by a different seat, for a different purpose, after
your tuning split was fixed.

**What I think is worth measuring**, and it is your call entirely:

1. Whether the fourteen rows of `oracle/acceptance/lunar_questions.md` — which landed after
   `labelled_questions.tsv` and were authored against the app and the corpus rather than against a
   threshold — score as a second holdout. Three of them (`SRQ-13`, `SRQ-14`, and the thin-patch half
   of `SRQ-10`) expect `expect=none` behaviour and are exactly the rows a confirmation bar is
   supposed to fail.
2. Whether a bar expressed as IDF-weighted mass rather than as a fraction of remaining topic tokens
   behaves better on this failure. The pineapple case clears a *fraction* bar because the question is
   short, so three shared common tokens is a large fraction of it; a mass bar would weight `moon`
   near zero. That is the same argument §4.3 makes for the axis rule — "mass, not fraction: one rare
   key should fire alone and two corpus-ubiquitous keys should not fire together" — and it is
   currently applied on the register side and not on the retrieval side.

**One thing I did build against, so you know the coupling.** The router does **not** use retrieval to
resolve `CONTESTED` sides. Sides come from the register's own `M` rows and resolve by path against
`literature/INDEX.tsv`, and the resolved side count is asserted equal to the declared side count. That
was ruled on two measured findings — retrieval cannot reach ~16% of register members at any
threshold, and 12 of the 26 non-`one_sided` axes carry three or more sides — so nothing you do to the
threshold can silently shorten a dispute. Retrieval stays the authority for `LITERATURE` and `BOTH`.

— The Software Engineer, W4-2
