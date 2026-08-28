# Step 2, Wave 1 — The Space Resources Engineer, review of the lunar half of the disposition table

**Author:** The Space Resources Engineer. **Date:** 2026-08-28. **Write set:** `oracle/REGISTER.lunar.tsv`,
this file. Nothing else was written. `merge_plan.tsv` does not exist on disk; the table I reviewed is
§4A of `cr_scratch/step2_engineer_taxonomy.md`, which is where the columns currently live.

---

## 0. Premise check — first line, standing clause 1

**Two of three premises hold as stated. P1 is false in the half that decides who reviews what.**

| | Premise | Verdict | Measurement |
|---|---|---|---|
| P1a | Eleven top-level folders, one level deep | **HOLDS** | 11 `####` folder headings in §4, 11 rows in `FIELDS.tsv`, 11 in the §1 table |
| P1b | **seven of them lunar** | **FALSE** | **Eight** folders carry `field: lunar`. `space-economy-and-markets` is `field: lunar` (§2.4, decided by measurement; §8 variance 3 says so explicitly) and is placed in **§4B, assigned to The Manager** |
| P2a | The union is 176 | **HOLDS** | 95 both + 57 S-only + 24 J-only = 176, measured under `NAMING.md` §1 `normalize()` |
| P2b | Folder sizes on the 152 basis: none over 31, none under 5 | **HOLDS** | max `isru-processing` 31, min `self-replication-and-automation` 5 |
| P3 | `sowers-2019` holds four members | **HOLDS** | four distinct normalized leaves, and I did not count a cluster to get it |

**P1b is not a wording slip and it is the finding of this section.** "Seven lunar folders" is true of the
review *split* and false of the *field label*. The eighth `lunar`-field folder — 26 files, the largest
after `isru-processing` — is being reviewed by the economics reviewer. **`space-economy-and-markets` is
the folder my A.9 tension with The Manager (economics prompt) physically lives in**, and it is the one
folder in the lunar field neither of us reviews as a lunar folder: he reviews it as his section, I am
told it is not mine. Three of my 59 register leaves land in it (§2). I am not asking for it to be moved
into my half — the split by section is workable — but the brief must stop calling the lunar field seven
folders, because the count that matters downstream (`FIELDS.tsv`, the classifier's scope) is eight.

**P3, extended past what was asked.** The four `sowers-2019` members are **two sources, not four**:
`-psr-ice-mining` and `-thermal-mining-ice` are both *Ice Mining in Lunar Permanently Shadowed Regions*,
New Space 7(4), DOI `10.1089/space.2019.0002`; `-thermal-mining-niac` and `-thermal-mining-niac-report`
are both the NIAC Phase I final report, grant 80NSSC19K0964, no DOI. Two DOI/grant-confirmed pairs. All
four are placed in `isru-processing` with `Also: lunar-ice-and-geology`, which is correct on both counts
— the process is the subject, the deposit is the cross-reference — and it is the disposition I would
have chosen. I checked whether the NIAC report's cost chapter earns an `Also: space-economy-and-markets`
and **measured that it does not**: 14 econ tokens against 24 physics tokens, the least econ-weighted of
the four. I would have argued for it from memory. The summary does not support it. Dropped.

---

## 1. Read-digests — standing clause 3

| Instrument | Files read | Digest over (path, size, mtime) | Self-counted? |
|---|---|---|---|
| corpus walk: `lsei/literature` + `_intake/japanese-miracle/lit`, all files | **386** (152 + 234) | `sha256 8da76fd7f4eb9d52` | **No.** This file is in neither root and cannot be |
| `tools/quantities.js --check`, tool 2.19-1, flags `--check` | **88** | `e06bc06118fa6218` | **No, and this is a live defect in my own figure.** `cr_scratch/*.md` *is* in that declared set. The moment this file lands the set is 89 and the digest changes. Every figure below taken at 88 is pre-my-own-file and is not comparable to any figure taken after |

**Hard failures at `e06bc06118fa6218`: 12.** Consistent with standing clause 7(b). I did not take a
second measurement, so I have nothing to reconcile against the 12-13-14-12 sequence and I am not adding
a fifth number to it.

---

## 2. Task 1 — the seven lunar folders of §4A. **ACCEPTED**, with one `also` refused.

**The arithmetic is sound and I checked it rather than reading it.** Reconstructing §4's placement lists
mechanically and joining them against the 176-name union:

| Check | Result |
|---|---|
| Claimed folder size vs. counted list length, all 11 folders | **11/11 exact** |
| Files named in §4 that are not in the union | **0** |
| Files in the union not placed | **0** |
| Distinct files placed | **176** — one file, one folder, no double-count |
| Origin tags `[S]/[J]/[B]` vs. measured membership | **176/176 correct**; totals 57 / 24 / 95, reproducing `Q-OVERLAP-95` exactly |

That is a better result than I expected and I am recording it as a pass rather than hunting for a
tenth-of-a-percent. The Engineer's table is internally closed.

**Placement, judged on retrieval rather than on tidiness.** I measured every one of my 106 files for
economics-signal versus physics-signal token density in its own body, which is the only mechanical proxy
I have for "would a lunar question or an economics question retrieve this." Nine files in my half are
strongly economics-dominant. **Eight of the nine already carry `Also: space-economy-and-markets`.** The
`also` discipline in §4A is not decorative; it is tracking the real boundary.

**The one refusal.** `metzger-autry-2023-lunar-landing-pads.md`, primary `logistics-and-delivery`,
`Also: isru-processing`. It measures **100 econ / 14 physics** — the highest economics dominance in my
entire half — and it is the *only* file above 50 econ tokens in my half with no economics cross-reference.
Landing pads are the canonical case where the ISRU argument *is* the cost argument: you sinter in place
because delivering pad mass costs more than the plant. §5's `Also` cardinality rule ("zero or one, never
two") means this file cannot have both `isru-processing` and `space-economy-and-markets`, and the
Engineer's own §5 says a source genuinely needing three homes is evidence the taxonomy is wrong. **This
is that evidence, and it is the first instance of it.** I am not asking for the cardinality rule to be
widened on one file. My disposition: **change this row's `also` from `isru-processing` to
`space-economy-and-markets`.** The ISRU reading is recoverable from the body tokens and from
`isru-processing`'s own neighbours; the economics reading is not recoverable from anywhere else, because
`logistics-and-delivery` is where it currently hides. Routed in `## Not mine` — the cell is the
Engineer's.

**`field_label` matches what a lunar question needs, for all seven.** I ran the ranker against the real
152-file corpus with five lunar questions spanning ice, law and process. Every retrieval that resolved
resolved inside the lunar field. No lunar question in my probe set needed an `economics`-field file to
answer, and the six cross-half `Also` rows of §5 are navigation, as §5 says. I have no objection to
`FIELDS.tsv` as specified.

**One thing I checked and will not contest.** `space-economy-and-markets` at `field: lunar` is right, and
§2.4 decided it by measurement rather than by intuition. My independent reason: three of the 59 leaves
my own lunar register axes cite live in that folder — `gao-2011-neutron-detectors-helium3`,
`mckeown-2024-space-resource-hurdle-rate`, `shishko-2019-lunar-thermal-mining-business-case`. A lunar
contested-claims axis citing a file the classifier had scoped to `economics` would be unreachable. The
label is load-bearing and it is set correctly.

**A distribution result worth carrying.** My 59 register leaves fall across the taxonomy as:
`isru-processing` 23, `logistics-and-delivery` 10, `power-and-thermal` 10, `lunar-ice-and-geology` 9,
`programme-primaries` 4, `space-economy-and-markets` 3, **`space-law-and-governance` 0**. Zero. Fifteen
lunar contested-claims axes and not one of them cites a legal source. That is a real property of the
register, not a gap I am apologising for — the lunar contested claims are physical and economic, and the
law is settled-or-absent rather than contested-in-two-directions. It also bears directly on Task 2.

---

## 3. Task 2 — the three UN treaty texts. **DISPOSITION CONFIRMED. STATED REASON REFUTED.**

`literature/_pdf/space-law-and-governance/` is the right home and the summaries stay. I reached it by a
different route than §7 did, and **§7's stated reason is false as written, which matters because a
disposition resting on a refutable reason gets reopened by the next person who reads the code.**

**§7 says:** "a merge that globs `lit/*` rather than `lit/*.md` lands three full treaty texts into a
retrieval corpus that will then return treaty articles as if they were summaries."

**Measured, on three fixtures built from the real 152-file corpus and the three real `.txt` files:**

| Fixture | What it models | Corpus size seen by the walker | Result |
|---|---|---|---|
| `base` | today | 152 | baseline |
| `glob_txt` | naive `lit/*`, extension preserved | **152** | **ranking byte-identical to `base` on all five probe questions** |
| `glob_norm` | `lit/*` **then `normalize()`**, which is what the merge step actually applies | **155** | the treaty texts are in, as `.txt.md` |

**The glob alone is harmless.** `literature_search.js:86` filters `e.isFile() && e.name.endsWith('.md')`.
A `.txt` file copied into the corpus tree is never returned by `listCorpusFiles()` and never scored.
`glob_txt` and `base` produce identical candidate lists, identical scores, identical `best`. The
Engineer's mechanism does not exist.

**The real mechanism is `normalize()`, not the glob.** `NAMING.md` §1 step 2 strips a trailing `.md` only;
step 7 appends `.md` unconditionally. So `normalize("un-1967-outer-space-treaty.txt")` =
**`un-1967-outer-space-treaty.txt.md`** — a `.md` file, walked, scored, and sitting one directory entry
away from `un-1967-outer-space-treaty.md`. The merge does not need a careless glob to cause this. It
needs the glob *and* the normalizer it is contractually required to run.

**And the harm is not the one §7 names.** The raw texts are not obviously longer than the summaries
(18.4k vs 18.5k, 23.8k vs 19.2k, 27.1k vs 21.0k bytes), so "the raw text outranks the summary" does not
follow. What I measured is worse than a rank inversion:

1. **Exact tie, broken by the filesystem.** On all three treaty questions the pair ties on `score` *and*
   on `frac` to three decimals (`4.35/0.708`, `2.54/0.770`, `10.99/1.000`). `searchLiterature`'s
   comparator is `(b.score - a.score) || (b.frac - a.frac)` — it returns **0**. The winner is whatever
   `readdirSync` returned first. Here `.md` sorts before `.txt.md` and the summary wins **by luck of
   lexical order, not by any property of the ranker**. Rename the raw file and the summary loses.
2. **The duplicate poisons the IDF table for the exact terms it is the authority on.** `N` goes 152→155
   and `df` rises for every treaty term. `un-1967` drops **4.60 → 4.35**; `un-1972` drops
   **11.40 → 10.99**. Meanwhile every unrelated file's score *rises* (`cannon-2020` 1.36 → 1.40,
   `mckeown-2024` 0.71 → 0.73). **Duplicating a document depresses the discriminating power of the
   vocabulary that document owns and inflates everything else.** This is the general form and it is not
   about treaties.
3. **Neither enforcement point catches it.** `normalize()` gives the two files *distinct* keys, so the
   merge dedup passes. And `tools/check_corpus_collisions.js` keys on sorted filename tokens, so the
   extra `txt` token makes a different key: run against the poisoned fixture it prints
   **`155 summaries, 0 collisions`, exit 0**. A corpus carrying three treaty texts beside their own
   summaries under near-identical names is clean to every check this project has.

**Independent support from my own register.** Zero of my 59 lunar register leaves are in
`space-law-and-governance` (§2). No lunar contested-claims axis will ever need a treaty *article*; the
ten legal summaries already serve every legal question the lunar side asks. There is no retrieval loss
from moving the raw texts out, and a measured, silent, filesystem-order-dependent cost to leaving them in.

**Confirmed: `literature/_pdf/space-law-and-governance/`.** With the reason replaced.

---

## 4. Task 3 — the forked `Q-LCC15-DISTINCT-LEAVES`

**The value is settled at 59. The supersede cannot be executed inside my write set, and executing it
inside my write set makes the failure worse.**

**Measured first.**

| | Figure |
|---|---|
| Distinct member filenames in `oracle/REGISTER.lunar.tsv` col 4, M rows, deduplicated | **59** |
| The addendum's own `operation:` re-run against its marker range | **59** — reproduces |
| Of those 59, resolving to a real file under `lsei/literature` | **59. Zero missing.** |
| A rows / M rows in `REGISTER.lunar.tsv` | 15 / 81, matching the `H` row's fields 5 and 6 exactly |

**The brief's premise "declaring 59 in its own `H` row" is FALSE, and the falsehood is the diagnosis.**
The `H` row is `H⇥lsei/literature⇥2026-08-27⇥7f97983⇥15⇥81`. It declares **15 axes and 81 member rows**.
**It has no distinct-leaves field at all.** Standing clause 6 requires every register census to be checked
against that register's own `H` row on the same line — and for this census **there is no `H` field to
check against**. That is exactly why this id forked and its sibling did not: `Q-LCC15-MEMBER-ROWS` is also
a duplicate-id failure, but it carries **no M3**, because 81 is pinned by `H` field 6 and could not drift.
`Q-LCC15-DISTINCT-LEAVES` is the one lunar census with no `H` counterpart, and it is the one that forked
in value for two cycles. **The fork is a symptom; the missing `H` field is the cause.**

**The addendum is not the defect.** `cr_scratch/step1_9_..._addendum.md:401` already carries the correct
`superseded:` form, correct successor value 59, author, date and clause. It did everything §4 asks of a
correction *in the block's own file*. **What was never done is §4 part 1 at the parent**:
`cr_scratch/step1_9_..._register_rows.md:516` still says `value: 58`, and lines 794 and 796 still quote 58
inside `Q-LCC15-LEAVES-READ`'s `unit:` and `population:`. `tools/quantities.js` builds `byId` first-wins
(line 333), so the index takes the parent's 58 and `QUANTITIES.md:52` and `:55` echo it. **This id alone
generates 2 of the 12 hard failures** — `M2 duplicate id` and
`M3 quoted with 2 distinct values: 58 vs 59`. The three `Q-LCC15-*` ids together generate **4 of 12**.

**Why I did not write it.** The four-part correction of `COUNTING_RULE.md` §4 must happen *in the block's
own file*, and that file is not in my write set. §5's move clause ("a block may be moved between files;
its id does not change") requires deleting from the parent, which I also cannot do. **Writing a third
copy of the block into this file would take `M2` from two sites to three and make the count worse.** I
declined. The `pending:` form of §4 is the correct instrument and it too must be written at the parent
and joined against `oracle/AMENDMENTS.tsv`, neither of which is mine. Routed as **N-6**, with the exact
edit specified.

**`oracle/REGISTER.lunar.tsv` is in my declared write set and I wrote nothing to it.** It holds 59, it
reproduces, all 59 resolve, and its `H` row is consistent. **It is correct and needed no edit.** A
declared write set left unwritten is a result, not an omission, and I am stating it rather than
manufacturing a change to justify the permission.

---

## 5. Task 4 — what `register_class` must survive at 2.16, as a property SLOT-D can assert

`register_class` is A-row field 3, closed set of three, per `register_schema.md` §127/§135. Measured now,
so 2.16 has a pre-image:

| basis_root | axes | `two_sided` | `false_pair` | `one_sided` |
|---|---|---|---|---|
| `lunar` | 15 | 11 | 2 | 2 |
| `econ` | 18 | 7 | 6 | 5 |
| **total** | **33** | 18 | 8 | 7 |

**Value-preservation is necessary and it is nowhere near sufficient.** Four things must survive, and only
the first is what people mean by "don't collapse `register_class`":

- **D-1. Per-axis identity.** For all 33 axis_ids, post-merge `class` equals pre-merge `class`. Byte
  equality on field 3, joined on field 2.
- **D-2. The partition survives, not just the labels.** The `(basis_root, class)` contingency table above
  must be reproducible from the merged artifact. **This is the one that flattens silently**: drop
  `basis_root` and all 33 class values survive individually while the split that gives them meaning
  becomes unrecoverable. A merged register that is class-correct row by row and cannot answer "how many
  `false_pair` axes are lunar" has collapsed my tension and passed D-1.
- **D-3. Axis count is invariant at 33, and at 15/18 per root.** A rebinding that *fuses* two axes
  preserves every surviving class value and destroys the tension by subtraction. **Value assertions
  cannot see a deletion.** Count first, then compare.
- **D-4. The fusion is not hypothetical and I found where it would happen.** I measured `match_keys`
  overlap across the two registers: 107 lunar keys, 179 econ keys, and **exactly one shared token in the
  whole 33-axis corpus** — `distribution` — shared by **`LCC-03` and `ECR-15`**. ECR-15 is one of the two
  axes The Manager wrote *specifically to state both positions of the A.9 tension and mark neither
  correct* (`step2_manager_open.md` R13). **The single point in the entire data where a key-based dedup
  could fuse my half with his is precisely the A.9 axis pair.** It is a homonym — LCC-03's `distribution`
  is the spatial distribution of polar ice, ECR-15's is a statistical reference-class distribution — and
  **both axes are `two_sided`, so a class-equality merge guard would not catch the fusion.** Any merge
  that keys, dedups, or clusters on `match_keys` must treat `distribution` as scoped by `basis_root`.

**For The Software Engineer, SLOT-D, in one line each, all four decidable by a script with no judgment:**

```
D-3  assert |axes| == 33 and |axes where basis_root=lunar| == 15 and |...=econ| == 18   # run FIRST
D-1  join pre/post on axis_id; assert 33/33 field-3 byte-equal
D-2  assert the (basis_root, class) 2x3 table post == {lunar:[11,2,2], econ:[7,6,5]}
     # basis_root must therefore still exist post-merge; this is the assertion that forces it
D-4  assert LCC-03 and ECR-15 are two distinct rows post-merge, and that no two rows from
     different basis_roots were merged on any shared match_key token
```

**I am not resolving the tension and I have not.** ECR-15 and LCC-03 both remain, both `two_sided`,
neither marked correct. D-1 through D-4 are the conditions under which that statement is still true after
2.16, and they are properties of the file rather than positions in an argument.

---

## Not mine — REQUIRED SECTION (standing clause 2)

Six items. Not empty.

| # | Finding | Sub-step | Owner |
|---|---|---|---|
| **N-1** | **`normalize()` converts a non-`.md` file into a `.md` file.** `NAMING.md` §1 step 2 strips only a trailing `.md`; step 7 appends `.md` unconditionally. `un-1967-outer-space-treaty.txt` → `un-1967-outer-space-treaty.txt.md`. This is the actual mechanism by which non-summary files enter the retrieval corpus, and it is a property of the naming contract, not of any glob. Suggested remedy: `normalize()` rejects, rather than renames, a leaf whose extension is not `.md`. **The naming contract is moving out of `literature/` this wave, so this edit and that move touch the same file.** | 2.5 / the naming contract | The Engineer (naming, 1.7); The Systems Engineer executes the move |
| **N-2** | **`tools/check_corpus_collisions.js` passes clean on a corpus containing a document beside its own near-twin.** Measured: 155 summaries, 0 collisions, exit 0, with three treaty texts sitting next to three treaty summaries. The token key gains `txt` and becomes a different key. The checker is the declared enforcement point for `NAMING.md` §11 and it does not see this shape. | 2.5 | The Systems Engineer (enforcement) |
| **N-3** | **Duplicating a document depresses the IDF of the terms it is the authority on and inflates every other file's score.** Measured on the real corpus: adding 3 duplicates to 152 moved `un-1967` 4.60→4.35 and `un-1972` 11.40→10.99, while unrelated files rose. **This is general and it applies to all nine known near-duplicate pairs, not to the treaties.** It is a direct, measured argument for resolving duplicates rather than retaining both — including `poston-2020`, whose byte-identical loser is queued for re-import. I hold no position on which member wins; I am supplying the cost of keeping both. | 2.2 (dedup disposition) | The Engineer |
| **N-4** | **`metzger-autry-2023-lunar-landing-pads.md`: change `also` from `isru-processing` to `space-economy-and-markets`.** 100 econ / 14 physics tokens — the highest economics dominance in the lunar half — and the only file in my half above 50 econ tokens with no economics cross-reference. Also: this is the first real instance of §5's own "a source needing three homes is evidence the taxonomy is wrong," and it should be recorded as such rather than absorbed. The cell is in the Engineer's table; I may not touch it. | 2.3 | The Engineer |
| **N-5** | **`REGISTER.*.tsv`'s `H` row has no distinct-leaves field, and that absence is why `Q-LCC15-DISTINCT-LEAVES` forked while `Q-LCC15-MEMBER-ROWS` did not.** `H` pins axes (15) and member rows (81); both are checkable on the same line per standing clause 6. Distinct leaves — 59 — is pinned by nothing. Proposed: a seventh `H` field, `distinct_members`. **This is a schema change and I did not make it, even though `REGISTER.lunar.tsv` is in my write set**, because a schema change written by one register's owner into one register is exactly the fork this project keeps producing. | 1.8 / 2.15 | The Software Engineer (register schema) |
| **N-6** | **The parent-file edit that closes `Q-LCC15-DISTINCT-LEAVES`.** In `cr_scratch/step1_9_space_resources_engineer_register_rows.md`: in the block at line 515, set `value: 58` → `value: 59`; append `superseded: 58 (The Space Resources Engineer, 2026-08-27) — one leaf short, per the B6 failure recorded at Q-LCC15-MEMBER-ROWS`; and update the two quotations of 58 at lines 794 and 796. Then `--index` and `--check`. **The successor value 59 is verified by me three ways** (register measurement, the addendum's own operation re-run, and all 59 resolving on disk). Closes 2 of the 12 hard failures. If the parent is frozen against me this wave, the `COUNTING_RULE.md` §4 `pending:` form plus an `oracle/AMENDMENTS.tsv` row is the correct instrument, and both files are outside my write set. | 2.x quantity hygiene | The Orchestrator / The Systems Engineer (amendments) |

---

## Verdict

1. **§4A lunar placement — ACCEPTED.** Arithmetic verified mechanically: 11/11 folder counts exact, 176
   placed, 176 distinct, 0 missing, 0 unplaced, 176/176 origin tags correct. One `also` refused (N-4).
2. **UN treaty texts — DISPOSITION CONFIRMED, REASON REFUTED.** `literature/_pdf/space-law-and-governance/`
   is right. The glob is harmless; `normalize()` is the mechanism; the harm is a filesystem-order tie and
   IDF poisoning, not a rank inversion; and both enforcement points pass clean on the poisoned corpus.
3. **`Q-LCC15-DISTINCT-LEAVES` — value settled at 59, supersede NOT executed and routed instead (N-6).**
   Executing it in my write set would have made `M2` worse. `REGISTER.lunar.tsv` verified correct and
   deliberately unedited.
4. **`register_class` — four assertable properties, D-1 to D-4, handed to SLOT-D.** D-4 names the single
   `match_keys` collision in the entire 33-axis data, and it is on the A.9 axis pair.
