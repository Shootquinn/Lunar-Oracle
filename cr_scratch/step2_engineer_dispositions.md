# Step 2, Wave 1 — The Engineer: the merge disposition table

**Deliverable:** `cr_scratch/merge_plan.tsv`, 176 rows, 17 columns, Block 1 then Block 2.
**Instruments:** `tools/merge_identity.js` (two modes), `tools/clusters.js`, `tools/doicov.js`.
**Read-digest of the plan run:** `3cb8cc59509e77c39cd87fb45c2905c5ea9ca7d0754a640ebd62ccc8517a85c1`
over 278 files. Every figure in this file carries that digest unless it says otherwise.

---

## 1. The premise check — line one

**P1 is false as arithmetic. P2 is false on both halves. P3 holds and closes twice.**

**P3, first, because everything else is measured against it. HOLDS.** 176 distinct normalized keys,
partitioned 95 both / 57 lsei-only / 24 intake-only. Both derivations close: `95 + 57 + 24 = 176`
and `152 + 24 = 176`, and the folder derivation `152 − 26 + 5 + 13 + 22 + 9 + 1 = 176` closes a
third time against the taxonomy's own eleven-folder census, which `merge_plan.tsv` reproduces
folder by folder. The raw-filename union is 185 and the case-folded union is 184; those are the
before-picture and are not in dispute.

**P1 is false, and it is false in a way worth naming: it mixes units.** `8 same-source pairs, 5
differing same-name pairs, 39 keys carrying no identifier` counts the first term in **pairs** and
the last two in **keys**. Restated in keys and deduplicated: 16 + 8 + 39 + 1 = 64 naive,
**59 distinct**, because four keys are simultaneously same-source members and no-identifier rows
(`sanders-2025` ×2, `sowers-2019`-NIAC ×2), one key is both differing-name and no-identifier
(`falcon-heavy-wikipedia`), and the false-merge third member (`nasa-data-gaps-acr25-wp-data-gaps-v3`)
is contested and appears in none of the three terms. **The contested population is 59 rows, not 52.**

**P2 is false on both halves.**

*First half — "three of the five differing same-name pairs are Step-0-adjudicated re-imports."* The
three are right and now carry hashes: `azami-2024`, `csank-2022` and `poston-2020` are byte-identical
by sha256 to `_intake/superseded-duplicates/azami-2024-lunar-manufacturing-review.md`,
`csank-2022-powering-the-moon-2.md` and
`poston-2020-krusty-reactor-design-CANONICAL-superseded.md` respectively. But **there are eight
differing same-key pairs, not five.** The other three are `473486main-iss-atcs-overview` (+86 bytes),
`bea-depreciation-rates` (+77) and `ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update`
(+42).

**Why five and not eight, and this is the load-bearing part.** Those three are exactly the keys whose
intake filenames are `473486main_iss_atcs_overview.md`, `BEA_depreciation_rates.md` and
`IEEE 2022 Paper SH TCS Architecture and Technical Challenges Update.md`. They match their lsei twins
only **after** `normalize()`. An instrument comparing raw filenames sees no twin and reports five;
an instrument comparing normalized keys sees eight. The merge writes to the normalized key, so eight
is the number that governs. This is not a subtle case: `CRP-5` in the corpus suite uses
`BEA_depreciation_rates.md` against `bea-depreciation-rates.md` as its *hypothetical* failure mode.
It is not hypothetical; it is sitting in `_intake/` right now.

*Second half — "`barro-2004` (6 bytes) and `falcon-heavy-wikipedia` (28 bytes) are genuinely new."*
**No.** All five non-Step-0 differing pairs are one edit class, and I opened every one:

| Key | Δ | The whole difference |
|---|---|---|
| `473486main-iss-atcs-overview` | +86 | 2 lines; intake cites `cr_scratch/step7_3RR_space_resources.md`, lsei does not |
| `bea-depreciation-rates` | +77 | 3 lines; intake cites `cr_scratch/step7_3_gap_register.md`, lsei does not |
| `ieee-2022-paper-sh-tcs-…` | +42 | 1 line; intake cites `cr_scratch/step7_3RR_space_resources.md`, lsei does not |
| `falcon-heavy-wikipedia` | +28 | 1 line; intake cites `cr_scratch/step7_3_launch_cost_notes.md`, lsei does not |
| `barro-2004-economic-growth-textbook` | −6 | 1 line; intake says "Opus/pdftoppm escalation was required", lsei says "additional page-rendering pass was required" |

**In every case the lsei copy is the intake copy with a cross-repository reference stripped.** The
intake member is the ancestor, not new content. Measured across the whole intake corpus: exactly
**4 of 119** intake files contain the string `cr_scratch/`, all four have an lsei twin that is the
scrubbed version, **0 of 152** lsei files contain it, and **0 of the 24 intake-only files** contain it.
Importing an intake copy over its lsei twin reintroduces a dangling path into a public literature
corpus and buys nothing. All five take `LIFT-LSEI-SCRUB`, and the disposition is on evidence rather
than on size.

---

## 2. BLOCK 1 IS DELIVERED — 117 rows, and it is stable by construction

**`cr_scratch/merge_plan.tsv` rows where `block == 1`. To The Software Engineer: assert against this
now.** Cut it with `awk -F'\t' '$1==1' cr_scratch/merge_plan.tsv`.

`LIFT` 52 + `LIFT-IDENTICAL` 65 = 117. Membership rule, stated so it is falsifiable: a row is Block 1
iff it carries an identifier at §7 level 1 or level 2, is not a member of a same-source pair, is not
the false-merge third member, and — where both corpora hold the key — **the two copies are equal by
sha256**. A byte-identical twin is a twin with nothing to adjudicate, so it is in Block 1; a differing
twin is in Block 2. There are no other Block 1 members.

Every Block 1 row is a straight file copy from `source_path` to `target_path` and nothing else.

```quantity
id:            Q-PLAN-BLOCK1-117
class:         fixed
value:         117
unit:          rows of cr_scratch/merge_plan.tsv, counted where column 1 (block) equals 1
population:    the 176 [Q-MERGE-UNION-176] union keys of lsei/literature and
               _intake/japanese-miracle/lit under normalize()
operation:     cmd: node tools/merge_identity.js --plan lsei/literature _intake/japanese-miracle/lit
               cr_scratch/step2_engineer_taxonomy.md _intake/superseded-duplicates
               cr_scratch/merge_plan.tsv ; awk -F'\t' '$1==1' cr_scratch/merge_plan.tsv | wc -l
conditions:    read-digest 3cb8cc59509e77c39cd87fb45c2905c5ea9ca7d0754a640ebd62ccc8517a85c1 over
               278 files read (271 corpus .md, 6 superseded, 1 taxonomy). This file is NOT in the
               declared file set the digest covers and does not count itself
at:            2026-08-28; lsei 7f97983
predicate:     117 of 176 union keys carry an identifier at NAMING.md section 7 level 1 or 2, belong
               to no same-source pair, and where both corpora hold the key are byte-equal. They are
               uncontested and the merge executes them without further adjudication.
derived-from:  Q-MERGE-UNION-176, Q-MERGE-SAMESOURCE-8, Q-MERGE-NOID-39
sampled:       n/a — the sha256 comparison is total over all 95 both-keys, not sampled
superseded:    none
```

---

## 3. BLOCK 2 — 59 rows, and the churn figure

**Churn = 5 / 59 = 8.47%.** Under the Manager's 15%. I did not tune to it and I say below exactly
what it does and does not measure.

```quantity
id:            Q-PLAN-CHURN
class:         measured
value:         8.47
unit:          percent of block-2 rows carrying rev > 1, where a rev bump is a change to
               disposition, primary_secondary or target_folder after first write
population:    the 59 rows of cr_scratch/merge_plan.tsv where column 1 (block) equals 2
operation:     cmd: awk -F'\t' '$1==2' cr_scratch/merge_plan.tsv | awk -F'\t' '$16>1' | wc -l
               — 5, over 59 block-2 rows. First write is the partition this brief states as
               premises P1 and P2; second write is the partition measured in section 1
conditions:    read-digest 3cb8cc59509e77c39cd87fb45c2905c5ea9ca7d0754a640ebd62ccc8517a85c1 over
               278 files. Same run as Q-PLAN-BLOCK1-117 and directly comparable to it
at:            2026-08-28; lsei 7f97983
predicate:     5 of 59 contested rows changed disposition or block between the brief's stated
               partition and the measured one. The five are 473486main-iss-atcs-overview,
               bea-depreciation-rates, ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-
               update, barro-2004-economic-growth-textbook and falcon-heavy-wikipedia.
derived-from:  Q-PLAN-BLOCK1-117
sampled:       n/a — total over the block
superseded:    none
```

**What this number is, stated plainly, because the seam call turns on it.** It is a count of one
revision event: the brief's premise partition versus the measured partition. Block 2 has been written
once since. A churn figure over a block written once in one pass is 0 by construction and carries no
information about seam stability; 8.47% is what it is because I counted the premise as a real first
write, which it is — P1 and P2 are committed claims about these rows' disposition. **If the Manager
wants a stability signal rather than a revision count, the honest one is the block's blocked
fraction: 35 of 59 block-2 rows (59.3%) cannot be dispositioned from committed data today** — 34
`HOLD-NOID` plus 1 `HOLD-FALSEMERGE`, all waiting on the §7 amendment. That is the number that
predicts movement, and I report it beside the one that was asked for rather than instead of it.

**Block 2 composition, 59 rows:**

| Disposition | n | What Wave 2 does |
|---|---|---|
| `HOLD-NOID` | 34 | nothing until §7 lands |
| `HOLD-PAIR` | 16 | both members land, neither merged, neither deleted; `DUP-01`…`DUP-08` |
| `LIFT-LSEI-SCRUB` | 5 | copy the lsei bytes; do not import the intake copy |
| `LIFT-LSEI-STEP0` | 3 | copy the lsei bytes; the intake copy is a resolved loser |
| `HOLD-FALSEMERGE` | 1 | `nasa-data-gaps-acr25-wp-data-gaps-v3`, waiting on §7 |

By dedup-key level: 12 at L1, 8 at L2, 34 at `L3-PENDING`, 5 at `L0` (no year token, no key derivable).
By reviewer: 45 `space-resources`, 14 `manager-econ`.

---

## 4. `poston-2020` — the trap, disarmed with a hash instead of a promise

I read `step0_dedup_decisions.md` before adjudicating anything. Its Poston row is the pair that
refused size-based selection: **the kept summary is the smaller file, 17,740 bytes against 19,230,
chosen on content by a separate reviewer.** The intake copy now queued for import is 19,230 bytes.

**The three re-imports, verified by sha256 rather than by size:**

| Key | lsei | intake | intake sha256 equals |
|---|---|---|---|
| `azami-2024-lunar-manufacturing-review` | 27,771 | 5,437 | `_intake/superseded-duplicates/azami-2024-lunar-manufacturing-review.md` |
| `csank-2022-powering-the-moon` | 23,190 | 7,637 | `_intake/superseded-duplicates/csank-2022-powering-the-moon-2.md` |
| `poston-2020-krusty-reactor-design` | **17,740** | **19,230** | `_intake/superseded-duplicates/poston-2020-krusty-reactor-design-CANONICAL-superseded.md` |

**Poston is the only one of the three where the intake copy is larger, and it is the one where size
selects the wrong file.** A size rule keeps lsei on azami and csank by accident and reverses Poston
on purpose — exactly the direction `step0_dedup_decisions.md` explicitly rejected, and it would do so
silently. The disposition is not derived from size at all: `LIFT-LSEI-STEP0` fires on a hash match
against the superseded set, so the rule is *"the intake copy is the copy Step 0 already dropped"* and
the byte count never enters it. Each of the three rows carries `SIZE MUST NOT BREAK THIS TIE` in its
`basis` field, in the table, where the merge will read it.

**These three are not merged and neither member is deleted.** D7's deferred union stands: both Poston
summaries and both Metzger-2021 summaries carry material the other lacks, and `step0_dedup_decisions.md`
enumerates it. Where the two disagree on a number, a `DUP-xx` register row is emitted and this table
does not adjudicate it.

---

## 5. The 39 no-identifier keys — held, not adjudicated

34 sit as `HOLD-NOID`; the other 5 are absorbed elsewhere (4 into `HOLD-PAIR` as `sanders-2025` and
`sowers-2019`-NIAC, 1 into `LIFT-LSEI-SCRUB` as `falcon-heavy-wikipedia`). `34 + 4 + 1 = 39`.

**I did not adjudicate them and I did not amend §7.** Every `HOLD-NOID` row's `basis` names the block:
*"Adjudication is blocked on the section 7 amendment this wave."* The four findings from Cycle A that
the amendment must answer are unchanged and are routed in `## Not mine`.

**One variance I am declaring loudly rather than burying.** `dedup_key` carries `L3-PENDING|…` for 34
rows, and the level-3 key is derived **from the normalized filename**, not from the citation block.
§7 says level 3 is `(identity, year, first six title words)` read from `## Citation`. The filename
rule is `clusters.js` RULE E and it is the rule that actually found both level-3 pairs. It is a
variance, it is stamped `L3-PENDING` in the data so nothing can mistake it for a settled key, and the
§7 amendment decides which derivation stands. **Four `HOLD-NOID` rows have no year token at all and
so no level-3 key under either derivation** — `dr-michael-nayak-luna-10`, `nasa-clps-delivery-timeline`,
`rostami2018-figures` and `take-or-make-in-space`. They carry `L0|none` and are the hardest four in
the block. The fifth `L0` row in Block 2 is `falcon-heavy-wikipedia`, which is dispositioned on its
byte diff rather than on an identifier and so is not blocked on §7 at all.

---

## 6. The taxonomy landed in the table, not in a second document

`target_folder`, `field_label`, `also` and `review_owner` are columns 9, 10, 12 and 11 of
`merge_plan.tsv`. The taxonomy proposal is now an **input** to a generator, not a document a reviewer
has to read: `--plan` mode parses the `index-tsv` fenced block of `step2_engineer_taxonomy.md` and
would abort on a key it cannot place. It placed all 176 and the folder census reproduces the
proposal's §1 table for all eleven folders, on the same line, from the table itself.

**`field_label` binds to §9 of the naming contract wherever The Systems Engineer moves it.** §9 is the
only landed authority specifying a field label; my own Step 0 Part 2 specifies none, which is why a
file satisfying Part 2 can still fail this step.

**Each reviewer cuts their own half on column 11 alone and reads nothing of the other's:**

```
The Space Resources Engineer   awk -F'\t' '$11=="space-resources"' cr_scratch/merge_plan.tsv   106 rows, 7 folders
The Manager (economics)        awk -F'\t' '$11=="manager-econ"'    cr_scratch/merge_plan.tsv    70 rows, 4 folders
```

**`review_owner` is not `field_label` and the two disagree on purpose.** The field partition is
8 lunar / 3 economics, decided by between-field cosine in taxonomy §2.4. The review split is 7 / 4,
decided by who can judge a placement. `space-economy-and-markets` is `field=lunar` and
`review=manager-econ`. Conflating them is the same class of error as conflating the folder with the
field, so they are two columns and the file header says so. `44 economics + 26 lunar = 70` is the
Manager's half; the 26 are `space-economy-and-markets`.

---

## 7. `INDEX-1`…`INDEX-5` against the suite's `FLD` group — reconciled, and he got there first

**I read his file before writing mine, which is what neither of us did in Cycle A. One set survives
and it is his.** `INDEX-1`…`INDEX-5` is **withdrawn as a separate contract.** It is fully absorbed:

| Mine | Survives as | Note |
|---|---|---|
| `INDEX-1` field == FIELDS[primary].field | **`FLD-13`** | he absorbed it by name and calls it "the condition that makes his fourth column safe" |
| `INDEX-2` primary == path segment 2 | `FLD-11` | duplicate; his is the same assertion |
| `INDEX-3` closed and exhaustive both directions | `FLD-3` + `FLD-11` | duplicate |
| `INDEX-4` also != primary | **`FLD-14`** | absorbed by name; he records "there was no FLD equivalent and I did not have it" |
| `INDEX-5` row count, normalized-key distinctness | `CRP-4`, `CRP-5`, `CRP-6`, `CRP-12`, `FLD-10` | his coverage is **stronger** than mine: CRP-4 is per-directory, CRP-5 tree-wide, CRP-7 asserts the normalized check is a strict superset of the case-folded one |

**The technical call, and it is technical and not seniority.** `FLD-11` originally said `INDEX.tsv` has
three columns and my §6 specified four. That is the real contradiction — the rest was duplication. He
corrected `FLD-11` to four at the SLOT-A/C fill, and the evidence that the correction is right is
inside his own file: `FLD-7`'s green note already accommodates "`INDEX.tsv`'s generated `field`
column", so the three-column `FLD-11` contradicted his own `FLD-7`. Four columns, `FLD-11` and
`FLD-13` together. **Two contracts became one, and the one that survived is the one written by the
seat that does not run the merge.** That is arm 2b handled the right way round.

---

## 8. D8 — the three instruments are out of the fence and re-runnable

| Instrument | Lines | Verification |
|---|---|---|
| `tools/merge_identity.js` | 482 | default mode reproduces `cr_scratch/merge_identity.tsv` **byte for byte, diff empty**; `--plan` mode is new and deterministic across two runs |
| `tools/clusters.js` | 98 | reproduces all five clustering rules and both level-3 candidate groups |
| `tools/doicov.js` | 33 | reproduces all seven DOI-coverage definitions: 92 / 91 / 72 / 90 / 89 / 32 / 32 |

All three now report their inputs and a read-digest — sha256 over sorted `path\tsize\tmtimeMs` of
every file opened — before they report a count. **The digest is itself cross-checked:**
`merge_identity.js` default mode and `doicov.js` walk the same 271 files by different code paths and
emit the same digest `bee39598e996508cedad1b1a067cfde16934f3828582a4097e2f142a8b1635b5`. Two
instruments agreeing on a digest is the only evidence available that the digest measures the corpus
and not the instrument.

`--plan` is a second mode of `merge_identity.js` rather than a fourth file because my write set does
not admit a fourth, and because the plan and the identity table must not be able to disagree about
what a key or an identifier is. They now share `normalize()`, `walk()`, `citationBlock()` and
`identify()` verbatim. **The default mode is regression-guarded by the byte-for-byte diff above; run
it before trusting any plan output.**

---

## 9. One defect the table found that nothing else was looking for

**`azami-2024-lunar-manufacturing-review` records a DOI its byte source does not contain.**
`identify()` takes the identifier from whichever copy resolves at the higher §7 level; the bytes
always come from lsei where both corpora hold the key. For azami those are different copies: the
arXiv DOI `10.48550/arxiv.2408.05823` is printed only in the intake copy, and the intake copy is the
Step-0 loser that `LIFT-LSEI-STEP0` does not import. Left alone, the merge lands a file with no DOI
while `merge_plan.tsv` and every downstream count say it has one.

Measured over all 137 rows carrying an identifier: **exactly one row is affected.** The column
`id_in_source` (`yes` / `NO` / `n/a`) is in the table so the assertion is one `awk`, and azami's
`basis` carries `CITATION REPAIR OWED` with the instruction: lift the lsei bytes, write the canonical
`- **DOI:** 10.48550/arxiv.2408.05823` line into the landed file, do not import the other copy.

**My first probe of this said 27 rows and it was wrong.** The probe compared the identifier to the
file body case-sensitively; `identify()` lowercases DOIs per §7. Twenty-six of the twenty-seven were
my instrument's case fault, not a defect. The corrected figure is 1. Recorded because the wrong
figure was mine and it was plausible.

---

## 10. Owed to `SLOT-A`, in one line so it reaches him

**The merge glob is `*.md`, never `*`.** It is printed in the header of `merge_plan.tsv` itself.
`_intake/japanese-miracle/lit/` holds 234 entries of which **115 are not `.md`**: 112 PDFs and three
UN treaty **texts** — `un-1967-outer-space-treaty.txt`, `un-1972-liability-convention-space-objects.txt`,
`un-1979-moon-agreement.txt` — which sit beside their own `.md` summaries under names differing only
in extension, feeding a retrieval layer that scores on filename tokens. A `*` glob lands 115 files
that are not summaries and three that would out-score the summaries of the same documents.

---

## 11. Not mine

**11.1 — `literature/NAMING.md` §7 needs a level between 2 and 3. Owner: The Systems Engineer, this
wave.** Four findings, unchanged from Cycle A, now with a consumer waiting on each:
(a) a level-2 URL needs a path — a bare host addresses a site, not a document, and 8 of the 39 fail
here; (b) a mirror-minted `10.13140/` ResearchGate DOI is not level 1; (c) a landing page shared by
two documents is a candidate, not a confirmation — this is `nasa-data-gaps-acr25-wp-data-gaps-v3`,
one row of my table, `HOLD-FALSEMERGE`; (d) **there is no level between 2 and 3 for an agency report
or grant number**, and `DUP-05` (`sanders-2025`) and `DUP-08` (`sowers-2019`-NIAC) are confirmable
only that way. 35 rows of Block 2 are blocked on this. **Add a fifth:** §7's level-3 key is specified
as read from `## Citation`; my `L3-PENDING` keys are derived from the filename because the citation
prose does not yield a reliable `(identity, year, title)` for these 34. The amendment should say
which derivation is normative.

**11.2 — `oracle/tests/corpus_suite.md` `CRP-10` and `CRP-11` name five same-name disagreements and
there are eight. Owner: The Software Engineer, `SLOT-A`, this wave.** `CRP-10` lists `azami-2024`,
`barro-2004`, `csank-2022`, `falcon-heavy-wikipedia`, `poston-2020`. Missing:
`473486main-iss-atcs-overview`, `bea-depreciation-rates`,
`ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update`. The three are visible only
under `normalize()`, which is exactly the distinction `CRP-7` exists to defend — and `CRP-5`'s own
worked example is `BEA_depreciation_rates.md` against `bea-depreciation-rates.md`, which is one of
the three. `CRP-11` inherits the same "for each of the five" and its byte-delta figures (6 and 28) are
correct but incomplete; the other three are +86, +77 and +42, and none of the five is a line-ending
difference — all are single-line content edits. His file, not mine; I did not touch it.

**11.3 — `oracle/tests/corpus_suite.md` census disagrees with its own header. Owner: The Software
Engineer.** The header declares **148 tests**, per group `NRM 9, NAM 16, PTH 11, FLD 12, PRV 17,
DUP 11, CRP 13, PDF 16, REG 18, CNT 11, SLT 8, MUT 6`. Counting rows whose first cell matches
`^[A-Z]{3}-[0-9]+$` over the file today: **155**, with `FLD 14` (not 12), `PRV 19` (not 17),
`PTH 14` (not 11). Three groups drifted at the SLOT-A/C fill and the header did not follow. This is
standing clause 6's exact failure — a census disagreeing with its own `H` row — and it is his to fix,
not mine. Note that two of the extra `FLD` rows are `FLD-13` and `FLD-14`, absorbed from my
`INDEX-1` and `INDEX-4`, so the drift is partly my doing.

**11.4 — `cr_scratch/relay/spawn/` does not exist.** Standing clause 8 requires a prompt, brief or
verdict sentence for another agent to land there before that agent runs. My write set does not
include it and I did not create it. 11.1, 11.2 and 11.3 are verdict sentences for concurrent seats
and they are here instead. Owner: the orchestrator, to create the path or to rule that `## Not mine`
discharges clause 8 for concurrent (not spawned) seats.

**11.5 — `tools/` has no home for the plan generator as a separate instrument.** D8's argument — an
instrument nobody can run is not an instrument — applies to a generator that exists only as a mode of
another tool about as well as it applies to one in a markdown fence, which is to say adequately but
not comfortably. I put `--plan` inside `merge_identity.js` because my write set names three tool files
and not a fourth. If a later step wants `tools/merge_plan.js`, the code lifts out cleanly. Owner: the
orchestrator, on write-set scope.

**11.6 — `literature/FIELDS.tsv` and `literature/INDEX.tsv` still do not exist**, which is why
`FLD-1`, `FLD-10`, `FLD-13` and `FLD-14` are all RED. They are 2.5's, emitted by the merge, and the
content is specified in `step2_engineer_taxonomy.md` §2.1 and §6. Not this wave's and not mine to
land. Owner: The Engineer at 2.5, Wave 2.

---

## 12. Variances, and what I did not do

- **I did not quote the T4 figure of 22.** It appears nowhere in this file or in `merge_plan.tsv`.
  The PDF pull is `SLOT-B`, Wave 3, and it is not mine.
- **I did not write outside my declared write set.** `literature/NAMING.md`, `literature/INDEX.tsv`,
  `literature/FIELDS.tsv`, `oracle/tests/corpus_suite.md` and `cr_scratch/step0_dedup_decisions.md`
  are all untouched. Three of them I had open and wanted to edit.
- **I did not adjudicate a single same-source pair.** All 16 members carry `pair_role=dup-member` and
  the primary designation is deferred to the `DUP-xx` register row. `HOLD-PAIR` means both land.
- **`primary_secondary` names which corpus copy supplies the bytes** — `sole-lsei`, `sole-intake`,
  `both-identical`, `lsei-primary` — and not a folder role or a pair role. The column name is the
  brief's; the reading is mine and it is stated in the file header because The Software Engineer is
  asserting against it. If he wants the other reading, it is a rename and a regeneration, not a
  re-adjudication.
- **The taxonomy is an input, not a decision I re-took.** `rev` is 1 for all 176 rows on
  `target_folder`. The 26 files moving out of the dissolved `growth-and-industrial-theory` move on
  the Cycle A proposal's authority, and the two reviewers can still move any of them.
- **Structural self-check, run against the emitted file rather than against my intent:** 17 columns
  on all 176 rows; `key`, `target_path` and `source_path` each unique; every `target_folder` one of
  the eleven; every `field_label` in `{lunar, economics}` and consistent with its folder; every
  `review_owner` consistent with the 7/4 split; every `also` a valid folder and never equal to its
  own `target_folder`; every `source_path` present on disk; every `dedup_key` prefixed `L1|`, `L2|`,
  `L3-PENDING|` or `L0|none`; no Block 1 row contested and no Block 2 row uncontested; all 8 pairs
  exactly 2 members; folder census equal to the taxonomy's declared count for all eleven folders.
  **Zero failures.**
- **Longest `target_path` is 99 characters repo-relative.** §8's ceiling is 259 **absolute**, and
  E14's lesson is that root length is what breaks a clone, not leaf length. At this repository's
  55-character root the worst case is 155 and the headroom is 104 characters of root.
