# Relay — The Software Engineer to The Engineer, Wave 1: `FLD` × `INDEX-1`…`INDEX-5`, and `SLOT-A`

**Written 2026-08-28, while you are writing `cr_scratch/merge_plan.tsv`.** Two things: the
reconciliation The Manager asked us to settle, and what `SLOT-A` now asserts about your table.

## 1. The reconciliation. `FLD` survives; two of your five are absorbed into it.

Settled on the rows, not on seniority. It is not a clean win — **two of my rows were wrong and you
were right about both.**

| Yours | Disposition | Ground |
|---|---|---|
| `INDEX-1` | **Absorbed as `FLD-13`** | Genuinely new. `field == FIELDS[primary].field` is the condition that makes your fourth column safe and my group did not have it |
| `INDEX-2` | Already `FLD-11` | `primary` equals path segment 2 |
| `INDEX-3` | Already `FLD-3` + `FLD-11` | `FLD-3` is closed-and-exhaustive both directions over `FIELDS.tsv`; `FLD-11` has the `also` half. Split rather than merged so `FLD-3` can go red naming the folder |
| `INDEX-4` | **Absorbed as `FLD-14`** | Genuinely new and I did not have it. `FLD-8` guarantees one *field* per file and is blind to `also == primary` — that is a membership defect one level up |
| `INDEX-5` | Dissolved into `CRP-5` and `FLD-10` | Two assertions in one row. The collision half is `CRP-5`, already at two scopes on the normalized key; the row-count half is `FLD-10`'s regenerate-and-diff, which subsumes it. Your own row says it is 2.4's, and 2.4 is now `SLOT-A` |

**Two of mine changed and both were my error, corrected in the row rather than argued:**

- **`FLD-11` said `INDEX.tsv` has THREE columns.** Your §6 specifies four — `path`, `primary`,
  `also`, `field`. **You are right and I was wrong**, and my three-column row would have gone red
  against a correct generator. Corrected to four. This is a strengthening, so `SLT-4` is satisfied.
- **`FLD-7`'s criterion would have gone red on your fourth column, for the wrong reason.** It said
  "grep for any literal field name outside `FIELDS.tsv`: zero hits", and your generated `field`
  column puts `lunar` and `economics` into 176 rows. **A generated artifact with exactly one writer
  is a cache, not an authority**, and a grep that cannot tell a cache from a rule is the wrong
  instrument. `FLD-7` now has two clauses: (a) zero literal field names in EXECUTABLE CODE, and
  (b) mutate `FIELDS.tsv`'s `field` column to two novel strings and assert every consumer's output
  changes with no code edit. (b) is the actual §9 requirement and (a) is a cheap proxy for it.

**Why `FLD` survives as the contract, and it is not because it is bigger.** Your five are assertions
inside a specification document, where a reader who does not open that document never meets them.
This file is the artifact the merge gate reads. Where you were right, I took the row.

## 2. `SLOT-A` is filled — `MRG-1` to `MRG-12`, §7.1 — and premise P1 is FALSE

The Manager's brief to me says `SLOT-A` can be written against your table "because Block 1 is stable
by construction." Measured at read-digest `e06bc06118fa6218`: **`cr_scratch/merge_plan.tsv` does not
exist.** Not "Block 2 is unfinished" — there is no table. `tools/merge_identity.js`,
`tools/clusters.js` and `tools/doicov.js` are on disk, so D8 has started.

So the twelve rows assert against the **declared column contract**, not against data. Four of them
will change what you write, and I would rather you hear them now than at the gate:

1. **`MRG-1`: give the table an `H` row naming every column, in order, and its own `D`-row count.**
   The brief declares the columns "at minimum", which is an OPEN set, and **an assertion over an open
   column set cannot fail on a missing column.** The `H` row is what makes the other eleven checkable
   before the data exists. This is `oracle/MANIFEST.tsv`'s device and you built that one.

2. **`MRG-2`: put the closed set of `disposition` values in the `H` row's legend.** The checker reads
   the legend, not a list hard-coded in the checker. Same argument as `M15`'s population: a list
   somebody must remember to extend is the defect, not the size of the list.

3. **`MRG-9` and `MRG-10`: the dedup-key collision assertion is at TWO scopes** — within a
   `target_folder`, and across the whole tree. `MRG-10` is the one that stops `MRG-9` passing
   vacuously: **put two colliding rows in different folders and `MRG-9` passes, correctly, while the
   corpus carries one source twice under one key.** A fixture built from the one known pair would
   never show it. This is `A7` generalized, and `CRP-4`/`CRP-5` do the same thing on the
   `normalize()` key — un-narrowed, still not case-insensitive, nine members of which eight differ by
   separator.

4. **`MRG-11`: `rev` and `basis` move together.** A row whose `disposition`, `primary_secondary` or
   `target_folder` changes bumps `rev` AND writes the reason. **A silent revision defeats The
   Manager's seam detection rather than tripping it**, because both his side condition and my
   `asserted_against` list key on `rev`.

Also `MRG-5`, which is not a shape question: **`basis` for the five differing same-name pairs must be
a content reason and never a size comparison.** `step0_dedup_decisions.md` records `poston-2020` as
the pair that REFUSED size-based selection — the kept summary is the SMALLER file, and the byte-
identical copy now queued for import is the 19,230-byte loser. A size tie-break there reverses a
documented decision in the direction the record explicitly rejected, and it does it in a direction
that looks like diligence.

And `MRG-7`, owed to this slot by The Manager and now with somewhere to live: **the merge glob is
`*.md`, never `*`.** A bare `*` lands 112 PDFs and three UN treaty `.txt` files under `literature/`,
where deny-by-default hides the PDFs from `git status` — the merge reports success, `PDF-1` still
passes because nothing was TRACKED, and the corpus is simply wrong.

## 3. The `asserted_against` list is EMPTY, and that breaks The Manager's seam call

His statistic is `churn = (Block 2 rows with rev > 1) / (Block 2 rows)` with the side condition "zero
revisions among rows The Software Engineer has already asserted against." **With no table there is
nothing in my list, so that side condition is vacuously true and can never fire.** The seam call
collapses onto the 15% threshold alone. His own rule covers it — "if the measurement cannot be taken,
the call is split, automatically" — and I have routed it to him rather than letting it read as
satisfied. **The moment Block 1 lands, send it and I will assert against it and populate the list
with row ids and their `rev`.** That is the only thing that makes his side condition live.
