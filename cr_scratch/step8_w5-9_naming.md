# Step 8, W5-9 — The Engineer: `PTH-3`, `PTH-4`, `PTH-13`

**Seat:** The Engineer, W5-9. **Date:** 2026-08-29. **Model:** inherited session.
**Author's ruling this seat executes:** *"Fix the tests or fix the deliverables, something is wrong."*

**Disposition, one line each.**

| Row | Disposition | Standing |
|---|---|---|
| `PTH-3` leaf ≤ 64 | **RETIRED**, by proof of redundancy | **gone** |
| `PTH-4` folder ≤ 32 | **RETIRED**, by proof of redundancy | **gone** |
| `PTH-13` live citations | **ARTIFACT FIXED + MATCHER FIXED** | **green** |

---

## 1. `PTH-3` and `PTH-4` — the ceiling was wrong, not the names

### 1.1 The premise check, which the brief asked for and which failed

My brief offered three dispositions and asked for a measurement rather than a preference. The
measurement kills the first one and it also kills a premise nobody had stated: **`NAMING.md` §8 did
not derive 32 and 64 from anything.** It derived them *backwards*, from a total:

```
  150   root allowance
+   1   +  10 "literature"  +  1
+  32   taxonomy folder        <-- allocated
+   1
+  64   leaf filename          <-- allocated
-----
  259   the measured git-for-Windows limit
```

Only two numbers in that column are measured: **259** (bisected, one character at a time, and it is
real) and **150** (the root allowance, chosen). Everything between is an *allocation of the
remainder*. 32 and 64 are one partition of 96 among 97.

### 1.2 The proof of redundancy

`PTH-5` asserts `depth == 2` separately and always has. Under it, every corpus repo-relative path is

```
relpath = len("literature") + 1 + len(folder) + 1 + len(leaf) = 12 + len(folder) + len(leaf)
```

so **`PTH-1`'s `relpath <= 108` IS `len(folder) + len(leaf) <= 96`, exactly** — not approximately,
not "in the common case". `PTH-3 ∧ PTH-4` asserts `len(leaf) <= 64 ∧ len(folder) <= 32`, which
**implies** the sum but is **not implied by** it. The two rows were a strictly tighter restatement of
a check that already runs on every file on every run.

A strictly tighter check is not automatically wrong. It is wrong when it rejects things the real
constraint accepts, and the corpus is the demonstration that this one does:

```
folder                                 len   longest leaf beneath   relpath   margin   leaf budget
power-and-thermal                       17   70                     99        9        79
organization-and-production-systems     35   51                     98        10       61
development-and-industrial-policy       33   54                     99        9        63
```

**Three breaches of the partition. Zero breaches of the budget.** Longest landed relpath is **99 of
108**. Every one of the eleven folders affords a leaf of at least **61** characters, and the longest
leaf beneath either over-32 folder is **54**.

Command and figures:

```
ls literature/*/*.md | while read f; do echo "${#f} $f"; done | sort -rn | head
  -> 99  literature/power-and-thermal/ieee-2022-paper-sh-tcs-...-update.md
  -> 99  literature/development-and-industrial-policy/hoshi-1991-corporate-structure-liquidity-investment.md
  -> 98  literature/organization-and-production-systems/shewhart-1939-statistical-method-quality-control.md
node tools/verify_corpus.js  -> longest composite relpath 99/108, margin 9
```

### 1.3 The one thing the components could have protected, and why they did not

The only property a per-component ceiling carries that the composite does not is **forward
headroom**: a guarantee that a folder still affords a full-length leaf to a file that does not exist
yet. That is a real property. But `folder <= 32` never *computed* it — it asserted a constant and
left the actual number, `108 - 12 - len(folder)`, uncalculated anywhere in the repository. A check
that gestures at a quantity without measuring it is exactly the apparatus the ruling is about.

So the headroom is now **computed and reported** rather than asserted through a proxy. `PTH-11`,
which already existed to report the worst-case margin, was extended in the same edit:

```
PTH-11  worst-case landed path 99 chars, ceiling 108, margin 9:
        literature\power-and-thermal\ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md
        | tightest folder leaf budget 61 chars in organization-and-production-systems (35) across 11 folders
```

`verify_corpus.js` `PTH/A3` reports the same pair. **The tool reports; the constraint asserts.**
No new row was created: extending a reporting row is not the same as adding an authority.

### 1.4 Blast radius, priced before the rename was refused

The brief said to measure before committing, and the number is the reason disposition 1 is refused.

| Rename | Occurrences | Files | of which `cr_scratch/` |
|---|---|---|---|
| `organization-and-production-systems` → shorter | **140** | 43 | **25** |
| `development-and-industrial-policy` → shorter | **358** | 80 | **46** |
| `ieee-2022-paper-sh-tcs-...-update.md` → shorter | **32** | 23 | **18** |
| **total** | **530** | ~123 (some overlap) | **~71** |

```
git grep -o "development-and-industrial-policy" | wc -l          -> 358
git grep -o "organization-and-production-systems" | wc -l        -> 140
git grep -o "ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update" | wc -l  -> 32
git grep -l "<name>" -- cr_scratch | wc -l                        -> 46 / 25 / 18
```

What moves is not a citation list. It is `literature/INDEX.tsv` (39 rows across the two folders),
`literature/FIELDS.tsv`, the `**Folder:**` footer line of **every summary in those folders and of
every summary cross-referencing them**, `oracle/acceptance/labelled_questions.tsv` (14 rows),
`oracle/mechanism_table.md`, `oracle/question_classes.json`, `oracle/tests/corpus_suite.md`,
`tools/merge_identity.js`, `README.md`, and `oracle/NAMING.md` itself.

**And it cannot be completed.** About **71 of those files are `cr_scratch/` deliverables**, which
`PTH-13`'s own reasoning — written by this project, about this exact path — forbids rewriting: *"the
record of what was believed when it was written; rewriting them would falsify the record and is
forbidden."* A rename that must stop at that boundary does not close the row; it converts three
cosmetic breaches into several hundred dangling references, on top of the 7 already standing in
`verify_corpus`'s `danglingSourceFileRefs` baseline.

**The trade: break the project's record in ~71 files, to satisfy an allocation that nothing
measures, protecting a budget that closes with 9 characters to spare. Refused.**

### 1.5 Why not disposition 2, raise the ceiling

Any replacement pair — 36/72, 40/70 — would be chosen to fit today's corpus and would be exactly as
arbitrary as 32/64, with the added defect of having been *fitted*. And the number a future author
actually needs is not a constant at all: it is the leaf budget of the folder the file is landing in.
Raising a constant would preserve the shape of the mistake. **The measurement said the split was the
wrong kind of object, not the wrong value.**

### 1.6 What changed

- `oracle/NAMING.md` §8 — the budget block restated on the **sum** (`96`), with the retirement, the
  measured table, the blast radius, and an explicit *do not reintroduce* clause carrying the reason.
  The two "Cost against..." paragraphs that **prescribed** the renames are replaced by what was
  actually measured. Recorded there too: **loose end E14 was a root-length failure (`A4`), not a leaf
  failure** — the 70-character name never broke the budget, and §8 had been reading the E14 evidence
  as confirmation of a ceiling that was not the thing E14 broke.
- `oracle/NAMING.md` §11 `A3` — two clauses, `relpath <= 108` and depth, plus a *reported, never
  asserted* block for the leaf and the per-folder budget.
- `oracle/tests/corpus_suite.md` §3 — `PTH-3` and `PTH-4` rows struck, declared count `57 -> 55`, the
  retirement recorded in prose above the table with its arithmetic. `PTH-5`'s and `PTH-11`'s cells
  restated against measured figures (`PTH-5`'s mutation cell had been quoting the retired ceiling's
  allocation, "up to 33 characters", as if it were a measurement).
- `oracle/tests/run_suite.js` — both bindings removed, replaced by the proof as a comment so the next
  reader finds the reasoning where the check used to be; `PTH-11` extended.
- `tools/verify_corpus.js` — `CEIL_LEAF` and `CEIL_FOLDER` deleted, `PTH/A3` reduced to the composite
  and the depth, report line extended. **Both instruments in one edit**: two places asserting one
  retired ceiling is two places for it to come back.

---

## 2. `PTH-13` — one live pointer, three incomplete records, and a matcher that could not tell

### 2.1 The brief's premise was right and incomplete

The brief asked whether each of the two hits was a live pointer or historical prose. **Both are
historical**, and both would be *falsified* by repointing:

- `oracle/NAMING.md:3` — the relocation banner, *"This file was `literature/NAMING.md` and is now
  `oracle/NAMING.md`"*. Repointed, it reads *"was `oracle/NAMING.md` and is now `oracle/NAMING.md`"*.
- `oracle/AMENDMENTS.tsv:210` — `AM-153`'s rationale, *"it is thirty-one files in the declared set
  naming `literature/NAMING.md` by path"*. Repointed, the amendment claims a defect that never
  existed. Its **target column already reads `oracle/NAMING.md`** and is correct; the hit is in the
  free-text column.

So the matcher was wrong. But fixing the matcher exposed something the brief did not know about,
because the binding had a second defect underneath the first.

### 2.2 The live set was hand-listed while its own row said it was computed

`corpus_suite.md`'s `PTH-13` cell states: *"The live set is now **COMPUTED**, not listed."* The
binding held a **hard-coded array of eleven paths** plus a walk of `tools/`. The row and the code
disagreed, and the row's own history says why that matters — the Wave 1 live set had already been
wrong once, omitting `oracle/AMENDMENTS.tsv`, *"because I enumerated by memory rather than by
walking."*

The set is now genuinely computed: `git ls-files` minus `cr_scratch/` minus the working copies.
**Computing it immediately found two files the hand-list could not see**, and one of them was a real
live pointer:

```
oracle/tests/corpus_suite.md:64
  **Authorities this suite binds to, BY ADDRESS.** `literature/NAMING.md` §§1-3, 7, 8, 9, 11; ...
```

A suite that names its authorities *by address* and gives a dead address. **Repointed.** That is a
hard failure that stood undetected for a full wave behind a list that could not see the file it was
written in.

### 2.3 The rule, which names no file

> **A RELOCATION RECORD NAMES BOTH ENDPOINTS. A POINTER NAMES ONE.**

**Clause 1.** An occurrence of a relocated path is **historical** if the same *record* also names the
path's current location. A record is **one physical line** in a `.tsv` — register rows are
line-atomic under `register_schema.md` — and **one blank-line-delimited block** elsewhere.

**Clause 2.** In a `.tsv`, an occurrence that is a **field's entire value** is an **address** and is
**live regardless of clause 1**. A path-typed column holds the path as its whole value; a narrative
column embeds it in a sentence.

Clause 2 is what keeps the row able to catch the failure it was written for. Without it, an
`oracle/MANIFEST.tsv` `promoted` row whose *target column* is the dead path would be masked the
moment somebody added an explanatory note naming the new path — the exact `MF-1` breakage the row
exists to detect.

Neither clause names a file, a date, or a wave. Both are decidable from the text of the file.
This is a **stated rule, not a hardcoded exception**, which is what the brief required.

### 2.4 The remedy the rule implies, which is better than an exception

Under this rule, an incomplete historical mention is not excepted — **it is completed.** Three of the
four non-live hits named only the origin, so the rule reported them, and the fix was to make the
record true rather than to add a carve-out:

| File | Was | Now |
|---|---|---|
| `oracle/tests/corpus_suite.md:64` | live pointer, *by address* | **repointed** to `oracle/NAMING.md` |
| `oracle/tests/corpus_suite.md` §item 6 | record naming only the origin | **completed**: the ruling paragraph now names the destination |
| `accumulator.md:498` | *"...which he moved"* | **completed**: *"which he moved to `oracle/NAMING.md`"* |
| `oracle/NAMING.md:3`, `oracle/AMENDMENTS.tsv` `AM-153` | already complete | **excluded, and named in the PASS message** |

The pass message is not silent about what it excluded:

```
PASS  PTH-13  0 live citations of literature/NAMING.md across 260 tracked files outside cr_scratch/
              (5 file(s) carry 14 historical mention(s), excluded by the both-endpoints rule and
              named so they are auditable: accumulator.md:1 oracle/AMENDMENTS.tsv:2
              oracle/NAMING.md:1 oracle/tests/corpus_suite.md:7 oracle/tests/run_suite.js:3)
```

An exclusion that is not counted and named in the report is a silencing. This one is both.

---

## 3. Before and after, in both trees

**Every count carries its command.** The author tree moved under me during this seat — three other
seats were writing `oracle/router/**` and the `RFX` rows concurrently — so **the totals are not
attributable to me and I do not claim them.** The attributable figures are the `PTH` group and
`verify_corpus`, and they are given separately.

### Author tree — `C:\Users\Quinn Morley\onedrive\projects\cc\lunar oracle`

| Instrument | At seat open | At seat close | Attributable to W5-9 |
|---|---|---|---|
| `node oracle/tests/run_suite.js` | 148 rows, 43 hard failures | **146 rows, 139 pass, 3 fail, 4 unrun** | rows `-2` (`PTH-3`, `PTH-4` struck); failures `-3` (`PTH-3`, `PTH-4`, `PTH-13`) |
| `run_suite` `PTH` group | **9 rows, 6 pass, 3 fail** | **7 rows, 7 pass, 0 fail, 0 unrun** | all of it |
| `node tools/verify_corpus.js` | 40 OK, **1 FAIL**, 1 VACUOUS, 5 REPORT | **41 OK, 0 FAIL, 1 VACUOUS, 5 REPORT** | all of it — the 1 FAIL was `PTH/A3` |
| `node tools/check_registers.js` | 0 hard failures | **0 hard failures** | unchanged; 2 rows added |

The remaining 3 author-tree failures are `MRG-4b`, `MRG-9`, `MRG-10` — another seat's, and outside my
write set by the brief.

`verify_corpus` at close, verbatim:

```
OK  PTH/A3  169 files under the ceiling; longest composite relpath 99/108, margin 9;
            longest leaf 70; tightest folder leaf budget 61 in
            organization-and-production-systems (35), all at depth 2
NOTE verdicts: 41 OK, 0 FAIL, 1 VACUOUS, 5 REPORT
NOTE hard failures: 0 @ read-digest 98f8c4b11aeffb3c over 171 files, tool 2.17-1
```

### Fresh clone — `cc/oracletest` at `131f513`

Measured cleanly: `git checkout --` the six files to the committed state, run; then copy the six
files across, run. **Caveat, stated because it changes how the totals read:** the copied
`run_suite.js` and `corpus_suite.md` also carry other W5 seats' concurrent fixes, so the total delta
`44 -> 8` is **not** mine. The `PTH` and `verify_corpus` rows are.

| Instrument | Before (at `131f513`) | After |
|---|---|---|
| `run_suite` `PTH` group | **9 rows, 6 pass, 3 fail** — `PTH-3`, `PTH-4`, `PTH-13` all red | **7 rows, 7 pass, 0 fail, 0 unrun** |
| `run_suite` total | 44 hard failures | 8 hard failures *(mixed authorship)* |
| `verify_corpus` | 40 OK, **1 FAIL** (`PTH/A3`, 3 component breaches), 1 VACUOUS, 5 REPORT | **41 OK, 0 FAIL**, 1 VACUOUS, 5 REPORT |
| `check_registers` | 0 | **0** |

The clone's `PTH-13` before-state differs from the author tree's and the difference is the finding
from §2.2: at `131f513` it reported `oracle/AMENDMENTS.tsv:1 oracle/NAMING.md:1` — the two the brief
named — while the corrected computed live set reports `accumulator.md` and `corpus_suite.md:64` as
well. **The hand-list was hiding a live pointer in the suite file itself.**

The 8 remaining clone failures are `MRG-4b`, `MRG-9`, `MRG-10`, `CON-4`, `VER-2`, `REF-1`, `INV-7`,
`RFX-35`. None is `PTH`. `CON-4` is a clone-local fact (`core.hooksPath` unset in that working copy).

---

## 4. Constraints honoured

- **`literature/**` is untouched.** `git status --porcelain literature/` returns **0 lines**. No file
  in the corpus was renamed, moved or edited, which is the whole point of the disposition.
- Nothing written under `oracle/router/**`; no `MRG`, `RFX`, `REF` or `VER` row touched;
  `oracle/answer_contract.md` not touched by me.
- **No row was silenced to make it green.** Two rows were retired with a proof and a price; one row
  had its artifact fixed *and* its matcher corrected by a stated rule.
- LF only on all six edited files (`grep -c $'\r'` returns 0 on each). Written with the file tool;
  no heredocs.
- Verified by running, in both trees, not by grepping once.

---

## Not mine

- **`MRG-4b`, `MRG-9`, `MRG-10`** — 3 of the author tree's remaining failures. Another seat's.
- **`CON-4`, `VER-2`, `REF-1`, `INV-7`, `RFX-35`** — present in the clone, not in the author tree at
  close; other seats' and/or clone-local.
- **`PTH-9`, `PTH-12`, `PTH-14` status cells still read RED** in `corpus_suite.md` while their
  bindings pass. The relocation they gate is done. Correcting three status cells to green is a
  contract edit I did not make because it is not one of my three rows, and I flag it rather than
  perform it. **Routed to whoever holds `corpus_suite.md` §3 next.**
- **`verify_corpus`'s `danglingSourceFileRefs: 7` standing baseline** — not mine, and named here only
  because §1.4 uses it as the scale against which a folder rename's damage was priced.
- **The 150-character root allowance is chosen, not measured.** §8 now says so. Whether 150 is the
  right split of the measured 259 is a live question I did not open; it is `A4`'s, not `A3`'s.

```
apparatus: check rows +0/-2 | amendment rows +2/-0 | quantity ids +0/-0 | tests +0/-2
```
