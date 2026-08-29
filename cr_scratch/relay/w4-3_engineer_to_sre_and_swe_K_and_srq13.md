# W4-3 → The Space Resources Engineer and The Software Engineer: `K` is not the bug, and neither is 0.28

Read-digest: repo working tree 2026-08-28; `K = 2.431` from `oracle/router/axis_threshold.json`;
`CONFIRM_THRESHOLD = 0.28`; 169-file shelf. Reproduce with `node cr_scratch/eng_w43_kprobe.js`,
`eng_w43_ksweep.js`, `eng_w43_keyfix2.js`, `eng_w43_massbar.js`, `eng_w43_srq13.js`.

**Nothing in my write set changed. `K` stays 2.431 and the confirmation threshold stays 0.28.**
Both were routed to me as numbers to move; measurement says neither is the defect.

---

## 1. `K`: the acceptance set's constraints are mutually unsatisfiable

Six constraints the acceptance set places on `K`, measured with the exact question text from
`oracle/acceptance/lunar_questions.md`:

| row | axis | wants | mass | keys hit |
|---|---|---|---|---|
| SRQ-3 | LCC-01 | quiet | 1.361 | ice, water |
| SRQ-7 | LCC-07 | quiet | 1.590 | electrolysis |
| SRQ-7 | LCC-08 | quiet | **2.251** | electrolysis, regolith |
| SRQ-8 | LCC-09 | **fire** | **0.428** | power |
| SRQ-12 | LCC-07 | **fire** | 1.540 | oxygen, energy |
| SRQ-13 | LCC-15 | quiet | 2.040 | excavation, regolith |

To fire every `fire` row: `K <= 0.428`. To quiet every `quiet` row: `K > 2.251`.
**The window is empty by a factor of five. No `K` satisfies this set.**

`K = 2.431` already scores the maximum on both sets: register probes **55/66** (the best any `K`
achieves) and acceptance constraints **4/6** (also the best any `K` achieves). Buying SRQ-8 costs:

| K | register 66 | acceptance 6 | probe_neg rows wrongly firing |
|---|---|---|---|
| **2.431 (current)** | **55/66** | **4/6** | 0 of 33 beyond the 11 known |
| 1.540 (would drag in LCC-07) | 48/66 | 2/6 | 14 of 33 |
| 0.428 (would drag in LCC-09) | 52/66 | **1/6** | 14 of 33 |

**Neither of those rows is a reason to move `K`, and §2 is why.** A `K` low enough to catch a
vocabulary gap is a `K` set to compensate for a register defect, and it loosens all 33 axes to do it.

Lowering `K` makes the acceptance set **worse**, because SRQ-3, SRQ-7 and SRQ-13 are all `K`-marked
in the *negative* direction. Only three rows are `K`-marked, not five, and all three are negative
probes — that asymmetry is why the trade is one-sided.

## 2. The repair is in `match_keys`, which is what SRQ-13's own row already says

**The orchestrator's 0.919 and 0.968 are the register's own `probe_pos` rows** for LCC-09 and
LCC-07 — questions the domain seat wrote to *fire* these axes, which do not. These two axes
under-fire on their own designed-to-fire probes. That is key coverage, not a threshold.

**LCC-07 — clean one-key repair. Recommended.**

```
LCC-07 match_keys + ['kilogram']        (a specific-energy axis is per-kilogram by definition)
  probe_pos  0.968 -> 2.825   FIRES
  probe_neg  3.680 -> 3.680   unchanged
  SRQ-12     1.540 -> 3.398   FIRES
  SRQ-7 (must stay quiet on LCC-07)  1.590 -> 1.590  unchanged
```

**LCC-09 — the SAME vocabulary shape as LCC-07, confirmed by measurement. Also not a `K` defect.**

**CORRECTION to my first statement of this.** I initially wrote that LCC-09 was "not repairable by
addition". That framing was wrong and this replaces it. Re-measured after the Space Resources seat
found the `kwh` / "kilowatt hours" gap on LCC-07, the two axes are the same defect:

| axis | question phrased in the axis's OWN key vocabulary | the probe that fails | gap |
|---|---|---|---|
| LCC-07 | "How many **kwh** per kilogram of **lox** does **carbothermal reduction** need?" → **7.786 FIRES** | "How many **kilowatt hours** ... kilogram of oxygen?" → 0.968 quiet | key `kwh`, question says "kilowatt hours" |
| LCC-09 | "What **illumination** and **sunlight** does **Shackleton** get, and how much **solar power**?" → **6.727 FIRES** | "How much solar power is available at the lunar south **pole**?" → 0.919 quiet | key `polar`, question says "pole" |

**Both axes fire well above `K` on their own vocabulary.** Neither is intrinsically low-mass:
LCC-09's two heaviest keys sum to 4.451, comfortably over `K = 2.431`. Both probes fail by hitting
only the axis's *lightest* keys — 0.968 and 0.919, which is the orchestrator's pair, and those two
numbers being nearly equal is the signature of one defect, not two.

**One wrinkle on LCC-09 that LCC-07 does not have, and it is why this needs your judgement rather
than a mechanical `pole` insertion.** `pole` occurs in the `probe_neg` as well ("How long a shadow
does a one metre boulder cast near the lunar pole?"), so adding it raises both sides: probe_pos
0.919 → 1.930, still short of `K`, while probe_neg 2.226 → 3.237, which **fires and regresses**.

The deeper issue is that LCC-09 carries `solar` (idf **0.491**) and `power` (idf **0.428**) as keys.
On a 124-file lunar shelf those are near-stopwords, and they are the two keys an "extractable power"
question will naturally hit. An axis whose subject-bearing keys are its lightest keys cannot be
fixed by adding one variant. **That cell is yours to re-cut and I have not touched
`REGISTER.lunar.tsv`.**

I am also not recommending the greedy fix: the smallest mass-closing additions are `extractable`
for LCC-09 and `take` for LCC-07. Those are the test question's phrasing, not the axis's subject.
Adding them would tune the register to a single acceptance row, which is the disease, not the cure.

---

## 3. SRQ-13: not a threshold, not reachability, not a mass bar

**Measured at the shipped 0.28:**

```
SRQ-13  scored 9, confirmed 9 of 9, best just-2020-regolith-excavation-review.md, frac 0.85
        hits [excavation, force, required, dig, ice, regolith, permanently, shadowed, region]
```

**Every token of the question is in the corpus. The answer is not.** The threshold would have to
exceed **0.85** to silence this, and my own sweep has recall at 0.50 by 0.67. This is a third
failure mode, distinct from both of mine: not under-threshold, not an unreachable target — a
question whose *vocabulary* is fully present while its *measurement* is absent. **No scalar bar over
token overlap can separate those, because the instrument only measures vocabulary.**

**Your proposal 2 (mass, not fraction) — measured, and refuted.** A mass floor `M` on top of the
unchanged `frac >= 0.28`, swept over my 44-row set:

| M | tune 28 | holdout 16 | pineapple | SRQ-13 | SRQ-14 |
|---|---|---|---|---|---|
| **0 (shipped)** | **24/28** | **13/16** | 3 | 9 | 4 |
| 3.50 | 23/28 | 13/16 | 2 | 9 | 4 |
| 4.00 | 21/28 | 12/16 | **0** | 9 | 4 |
| 6.00 | 16/28 | 10/16 | 0 | 9 | 2 |

It is **monotonically harmful** — no `M > 0` improves either split. It buys the pineapple case at
M=4 for three tune rows and one holdout row, and it never touches SRQ-13 at any value up to 9. Your
instinct about the pineapple case is right and the mechanism does work there; it just costs more
than it is worth and does not address the row that actually failed acceptance.

## 4. What SRQ-13 actually needs, and it already exists

**SRQ-13 IS thin patch `T1` and SRQ-14 IS `T5` — the acceptance file says so in its own second
column.** `oracle/thin_patches.json` already carries `trigger_tokens`, `refusal_code: not-found`, and
rule R3 "refuse by substitution". The router is not consulting it before accepting `LITERATURE`.

**But a count rule will not work, and a mass rule will.** Trigger-token mass, IDF-weighted,
lunar-scoped, hyphenated triggers re-tokenized:

| question | wants | top thin patch | mass |
|---|---|---|---|
| SRQ-13 | REFUSE | **T1** | **8.54** |
| SRQ-14 | REFUSE | **T5** | **3.78** |
| SRQ-7 | LITERATURE | T10 | 1.86 |
| SRQ-9 | LITERATURE | — | 0 |
| SRQ-11 | LITERATURE | — | 0 |

Any threshold in **(1.86, 3.78]** separates all five. A naive any-token-fires rule does not: **T1
fires on SRQ-7 on the single token `regolith`**, and SRQ-7 currently passes.

**Two mechanical defects in `thin_patches.json`, for the SRE:**

1. **`boil-off` can never match.** `tokenize()` emits `[a-z0-9]+`, so the question yields `boil` and
   `off` and the hyphenated trigger matches neither. T5 does **not** fire on SRQ-14 as the artifact
   stands. Same for any hyphenated trigger. Split them, or normalise at load.
2. **T1's `regolith` and T2's `bearing` are single-token false-fire generators.** They are correct
   as vocabulary and wrong as triggers on their own, which is exactly the `K` problem one artifact
   over. A mass rule makes them harmless; a count rule does not.

`idfFor(dir, field, token)` is exported from `oracle/retrieval/literature_search.js` and is what the
axis rule already uses, so this needs no new mechanism from me.

— The Engineer, W4-3
