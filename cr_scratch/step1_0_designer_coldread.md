# Sub-step 1.0 — The Designer: cold-read test suite, and its first run

**Project:** Lunar Oracle
**Date:** 2026-08-26
**Sub-step:** 1.0. Discharges the TDD precondition (A.4) for Step 1 on the one artifact it fires on.
**Closes:** loose end E17.
**Artifact under test:** two files read as one operating contract —
`lunar-oracle-gameplan.md` (879 lines) and `cr_scratch/step0_integration_draft.md` (674 lines).
**Method:** `tdd_method.md` Prompt 1; `operational_guide.md` A.10, step 7 for the coverage weighting.
**Status:** the suite in Part One is proposed as the contract. Part Two is its first run. This file
does not modify either artifact.

---

## 0. Scope, sizing, and what "the artifact" means

The two files are tested as one document because that is how a cold session must read them. The
gameplan's Steps table is an index that resolves into the integration draft; neither file is an
operating contract on its own. A test that passes in one file and fails at the seam has not passed.

**Sizing.** `tdd_method.md` sets 150 tests as the starting point and scales by complexity. This is
1,553 lines of specification with a machine-and-human dual audience, five internal code systems, a
44-row register and a 72-row worklist. I have written **121 tests**. The count is below 150 because
the defect-absence surface was covered at sub-step 0.5 and is not re-litigated here; per A.10 step 7
this suite is weighted toward audience comprehension and communication architecture, which is the
test that was never written.

**The two readers, stated as the acceptance condition.**

- **Reader (a), the cold session.** A Claude Code session that has just started or just been
  compacted. It has read `CLAUDE.md` and the operational guide. It opens the gameplan and must know,
  within one read: what step it is on, what that step's sub-steps are, who owns each, which are
  already done, what has already been ruled, and what it must not do. It cannot ask anybody.
- **Reader (b), the stranger.** A person who cloned the public repository. Sub-step 0.5 found that
  the one sentence written for this reader was wrong; a paragraph was added at 0.6. This suite tests
  whether the paragraph now works.

**Severity tags** used in Part Two: **BLOCKING** (reader (a) cannot execute Step 1), **COSTS TIME**
(reader (a) executes, but reaches a wrong belief or a dead end first), **COSMETIC**.

**Test ID scheme.** `W-x-n` for whole-document, `S-n` for section-level. `G:` prefixes a line number
in the gameplan, `D:` in the integration draft.

---

# PART ONE — THE TEST SUITE

## W-A. Orientation: can reader (a) start work?

| ID | What is tested | Pass criterion | Evidence required |
|---|---|---|---|
| W-A-1 | The current step is stated as a fact, not inferred | A single line names the current step and no other line contradicts it | The line, plus a grep for every other statement of project state |
| W-A-2 | The current step's sub-step list is reachable | Reader (a) reaches a complete, numbered list of the current step's sub-steps by following at most one named pointer | The pointer, and the list it resolves to, counted against the claimed count |
| W-A-3 | The pointer names a section, not only a file | If a third file must be opened, the pointer names the file *and* the section inside it | The pointer text |
| W-A-4 | Every sub-step of the current step has a stated owner | Each row names a persona, or "the author", or "Orchestrator" | The owner column |
| W-A-5 | Every sub-step of the current step has a stated dependency or an explicit `—` | No blank dependency cells | The dependency column |
| W-A-6 | Per-sub-step completion state is readable | For any sub-step in the current step, reader (a) can tell whether it is done without reading its deliverable file | A status column, or an equivalent |
| W-A-7 | The step's exit condition is stated | The current step carries a closing statement naming concretely what exists when it is done | The closing statement |
| W-A-8 | The step's prohibitions are stated | What must not happen during the current step is stated in the artifact, not left to inference | The sentence |
| W-A-9 | The document's own state is internally consistent | The header, the Steps table, the sub-step tables and the progress log agree on which steps and sub-steps are complete | All four read together |
| W-A-10 | No instruction in the document forbids what the document now does | No surviving instruction tells the reader that later content does not exist or must not be acted on | Grep for scope-limiting blockquotes and notes |
| W-A-11 | The artifact names its own file set | Reader (a) can enumerate every file that is part of the operating contract from the contract itself | The list |
| W-A-12 | Every file the contract depends on is obtainable by a fresh clone | Each named file is tracked in this repository or in a named upstream | `git ls-files` against the named set |

## W-B. Internal codes: introduced on first use, or removed (A.10 step 7)

| ID | What is tested | Pass criterion | Evidence required |
|---|---|---|---|
| W-B-1 | The `N.M` sub-step notation is defined | The notation is explained at or before its first use | Line of first use; line of definition |
| W-B-2 | The `N.M` definition is actionable | It states that N is the step, M the sub-step, and that gates fire between steps and not between sub-steps | The definition text |
| W-B-3 | The origin-ID prefix set is complete | Every prefix the artifact actually uses is named where the prefix system is introduced | The introduction, against a grep of all prefixes in use |
| W-B-4 | The origin-ID suffix conventions are defined | The `t` suffix (test stage) and the letter suffixes (`a`–`d`) are explained before a reader meets one | First use of each; the definition |
| W-B-5 | Origin IDs are declared non-addresses | The artifact states that an origin ID is a trace, not an execution address, and names what resolves it | The sentence |
| W-B-6 | The status vocabulary is a closed list | Every status term used in the register appears in the declared vocabulary | Declared list against a grep of every status cell |
| W-B-7 | The status vocabulary has no dead terms | Every declared term is used at least once, or is marked reserved | Same evidence |
| W-B-8 | Status terms are distinguishable | Two terms a reader could confuse (FIXED against CLOSED) are separated by a stated rule | The rule |
| W-B-9 | The register's lettered-table scheme is introduced | A, B, C, D, E and F are each given a stated meaning before their tables appear | The section preamble |
| W-B-10 | The `N.M` column contract in the register is stated | The register says what the column means and what a dash means | The contract sentence |
| W-B-11 | Persona names are used consistently | One persona is named one way throughout; no alias appears without its canonical name | Grep for each persona name and its variants |
| W-B-12 | The trace-grade vocabulary is introduced | "recompute-grade", "resolution-grade" and any third grade are defined at first use | First use; definition |
| W-B-13 | Corpus-basis vocabulary is introduced | "158-file basis", "152-file basis", "pre-dedup", "post-dedup" are defined before a number carries one | First use; definition |
| W-B-14 | Every abbreviation used in a table cell resolves | TRL, IDF, DOI, FA1–FA8, TFP, MPK each resolve in the artifact or are ordinary domain vocabulary for the stated reader | The expansions |

## W-C. Navigational promises resolve

| ID | What is tested | Pass criterion | Evidence required |
|---|---|---|---|
| W-C-1 | Every `see loose end Xn` names a row that exists | Each cited row ID is present in the register | Grep of citations against the row IDs |
| W-C-2 | Every `§n` reference resolves to a section that exists in the named file | The section is present and carries the content the citation claims | Section headings of both files, plus the cited file |
| W-C-3 | Every "see the ..." reference names a locatable section | The target is a heading in one of the two files, or a named file | The reference text and the heading |
| W-C-4 | "See below" / "see above" references are bounded | Each names its target, or the target is within one screen | Each instance and its distance to target |
| W-C-5 | Every reference to a `cr_scratch/` file names a file on disk | The path exists | `ls` |
| W-C-6 | Every reference to a file inside a working copy names a file that exists there | The path exists in the working copy at the recorded ref | `ls` inside `lsei/` and `cr-agents/` |
| W-C-7 | Every quoted string attributed to an external file is present in that file | Exact-string search succeeds | The search |
| W-C-8 | Every cited line range in an external file matches the content claimed | The range holds the claimed content, and the stated line count matches the range | The range, and the arithmetic |
| W-C-9 | The claim "§7 resolves any origin ID" holds | Every origin ID in the sub-step table has a row in the mapping table | Mechanical join of the two tables |
| W-C-10 | Every sub-step address cited from the register exists in the plan | Each `N.M` in the register's address column is a row in the sub-step table | Mechanical join |
| W-C-11 | Every dependency address in the plan exists | Every `N.M (ORIGIN-ID)` in a dependency cell resolves to a row | Mechanical join |
| W-C-12 | No pointer routes the reader to a file the contract has not named | A cited file appears in the artifact's own file list | The file list |

## W-D. Two-file coherence: one fact, one value

| ID | What is tested | Pass criterion | Evidence required |
|---|---|---|---|
| W-D-1 | Sub-step total agrees across both files | Every stated total is the same number, or each carries its basis | Grep for every total in both files |
| W-D-2 | The Steps table's per-step counts sum to the stated total | Arithmetic holds | The seven counts and the total |
| W-D-3 | Per-step counts agree with the plan file's row counts | Each step's claimed count equals its row count in the sub-step table | Row count per step |
| W-D-4 | Per-step ranges agree | "1.0 through 1.13" and equivalent statements match the first and last rows present | First and last row per step |
| W-D-5 | The Steps table's owner column agrees with the plan | Every persona owning a sub-step in step N appears in step N's owner cell, and no persona appears who owns nothing | Set comparison per step |
| W-D-6 | Objective tags agree across both files | Each step's objective tag is identical in both, or absent in both | The two heading sets |
| W-D-7 | Each file's statement of the other file's role agrees | The gameplan's description of the draft and the draft's self-description are compatible | Both statements |
| W-D-8 | Row status claims agree | No sub-step is "Not started" in one file and in progress or complete in the other | Both status statements |
| W-D-9 | The echo site registry agrees with the gameplan on every registered value | For each registry row, the gameplan's value matches, or the registry row records the correction | Row-by-row comparison |
| W-D-10 | Corrected values reached every site | For each value corrected during Step 0 or the Step 1 open, every occurrence carries the corrected figure or its basis | Grep per corrected value |
| W-D-11 | Working-copy refs agree with the working copies | Every stated ref matches `rev-parse HEAD` and, where claimed, `ls-remote` | Both commands |
| W-D-12 | The register's rows do not contradict themselves | No row's Finding cell asserts a state its Status cell denies | Row-by-row read |
| W-D-13 | The artifact's policy statements do not contradict its record | A rule stated as enforced is not contradicted by a recorded act that broke it | The rule and the record |
| W-D-14 | Both files agree on what a gate is and when it fires | One statement of gate cadence, in both files | Both statements |

## W-E. The register as an instrument

| ID | What is tested | Pass criterion | Evidence required |
|---|---|---|---|
| W-E-1 | The register declares its own size | A stated row count, with the per-table breakdown | The declaration |
| W-E-2 | The declared size is correct | Counted rows equal the declaration, per table and in total | Row count per lettered table |
| W-E-3 | The `N.M` column resolves for every row | Every cell is either a sub-step that exists or a dash whose Status cell says why | Every cell |
| W-E-4 | A dash is a declared gap, not an unfilled cell | Each dashed row's Status states why no sub-step closes it | Each dashed row |
| W-E-5 | Address cells hold addresses | No cell holds prose where an address belongs, unless the artifact declares that form admissible | Every cell |
| W-E-6 | Every row states its evidence | The Evidence column is non-empty and names something checkable | Every row |
| W-E-7 | Every OPEN row names an owner or says none exists | Owner stated or explicitly absent | Every OPEN row |
| W-E-8 | Every FIXED row states where the fix lives | The fix's location, and whether it survives a re-clone | Every FIXED row |
| W-E-9 | Every AUTHOR row names the question it is tied to | An Open Question number or equivalent | Every AUTHOR row |
| W-E-10 | The register's factual claims are current | No row asserts a state of the world that has since changed | Each row's claim checked against disk |
| W-E-11 | The register is reachable from the current step | Reader (a) working on sub-step X can find every register row addressed to X | A per-step index, or a searchable convention |
| W-E-12 | The falsifier section states its own disposition | Each falsifier says whether it fired and what followed | The three rulings |

## W-F. Reader (b), the stranger

| ID | What is tested | Pass criterion | Evidence required |
|---|---|---|---|
| W-F-1 | The opening paragraph says what the project is | A stranger can state, after the first paragraph, what Lunar Oracle does | The paragraph |
| W-F-2 | The opening does not describe an unbuilt system in the present tense as though it runs | Either the tense marks it as intent, or a following sentence states build state | The paragraph and its successor |
| W-F-3 | The opening promises a breadth the document delivers | Every capability the paragraph names is covered by a step in the plan | Claim-to-step mapping |
| W-F-4 | The stranger learns what to do next | The artifact names the bootstrap file and what running it does | The sentence |
| W-F-5 | The stranger learns what is not in the repository | PDFs, working copies, and anything else absent by design are stated | The directory map |
| W-F-6 | The directory map is complete against the repository | Every path a fresh clone produces has a map row | Clone contents against the map |
| W-F-7 | The licence position is stated | What the dedication covers and what it cannot is stated | The statement |
| W-F-8 | The document a stranger can obtain is the document tested | The published artifact matches the artifact under test | `git ls-tree origin/main` |
| W-F-9 | Nothing addressed to the stranger requires an untracked file | No reader-(b)-facing pointer resolves only on the author's disk | Pointer set against `git ls-files` |

## W-G. Register discipline (the prohibition's plain half)

| ID | What is tested | Pass criterion | Evidence required |
|---|---|---|---|
| W-G-1 | Register rows are declarative | No row narrates the document's own honesty or its own care | Row-by-row read |
| W-G-2 | Self-correction passages record what changed | Each surviving passage states the old value, the new value, and the reason | Each passage |
| W-G-3 | No passage substitutes rigour-signalling for a number | Where a value is unknown the row says so and names what would settle it | Each such passage |
| W-G-4 | Emphasis is load-bearing | Bolded phrases mark the row's operative claim rather than decorating it | Sample of twenty rows |

---

## Section-level tests

### S-1. Gameplan front matter (G:1–33)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-1-1 | The first paragraph is written for reader (b) | It names the product, the inputs and the refusal discipline without assuming project context |
| S-1-2 | The reference-file list is current | Every listed path exists, or is marked as not yet built |
| S-1-3 | `Current step` is present and correct | Matches the Steps table |
| S-1-4 | The `lit_review` flag is present and its consequence stated | The flag and the rule it triggers |
| S-1-5 | Any scope-limiting note is current | No note restricts the document to content it has since outgrown |
| S-1-6 | The front matter names the companion file | The plan file is named in the front matter, not only 100 lines later |

### S-2. Gameplan Steps table (G:122–157)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-2-1 | Seven steps, numbered 1–7, plus Step 0 | Present |
| S-2-2 | Each row states its sub-step count and range | Present and correct against the plan |
| S-2-3 | Each row states its status | Present and consistent with the rest of the document |
| S-2-4 | The owner cell is the union of that step's sub-step owners | Set equality |
| S-2-5 | The index-vs-plan relationship is stated | The sentence naming which file is which |
| S-2-6 | The rationale for not duplicating the plan is stated | Present |
| S-2-7 | The closing notes on the count are consistent with the counts above them | The 72/73 note against the table's own arithmetic |

### S-3. Gameplan Step 0 sub-step table (G:158–171)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-3-1 | Every Step 0 sub-step row states a status | Present |
| S-3-2 | Each complete row names its deliverable file | Present, and the file exists |
| S-3-3 | The table's statuses agree with the deliverables on disk | No row is "Not started" whose deliverable exists |

### S-4. Gameplan Wave 1 deliverable specs (G:172–249)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-4-1 | The section is marked as historical | A cold reader is told these are the 0.2 briefs and not live instructions |
| S-4-2 | Superseded claims inside the briefs are marked at the point of use | Each carries an inline correction or an immediate pointer |

### S-5. Gameplan Context recipes (G:253–268)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-5-1 | The section states its scope | The reader is told these are Step 0's recipes only |
| S-5-2 | The section points forward to the recipes for later steps | A named pointer to the plan file's recipe section |
| S-5-3 | Every recipe names files that exist | Path check |

### S-6. Gameplan Progress log (G:272–291)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-6-1 | The ordering is announced | A sentence states the order |
| S-6-2 | The announcement precedes the table | Placement |
| S-6-3 | The announcement explains why order carries meaning | The same-date rationale |
| S-6-4 | The rows are in the announced order | Newest first, verified against the events |
| S-6-5 | The newest row is the newest event | Nothing has happened since the top row |

### S-7. Gameplan Design notes (G:295–556)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-7-1 | Each note carries a heading that states its claim | Topic-sentence headings, not category labels |
| S-7-2 | The verified inventory states its measurement date and refs | Present |
| S-7-3 | The stated refs match the working copies | `rev-parse` and `ls-remote` |
| S-7-4 | The local-only list is correct | Each item checked |
| S-7-5 | The numbering-convention note is placed where a reader needs it | Before or at first use of `N.M` |
| S-7-6 | The directory map is a complete statement of intent | Every path a clone produces has a row |
| S-7-7 | The map's stated relationship to `.gitignore` is stated | Which is the intent and which is the bug |

### S-8. Gameplan Author rulings (G:560–608)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-8-1 | Each ruling is stated as binding and dated | Present |
| S-8-2 | Each ruling names the register rows and sub-steps it closes or changes | Present |

### S-9. Gameplan Loose ends register (G:612–736)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-9-1 | The section states its own purpose as a compaction artifact | Present |
| S-9-2 | The size declaration is present and correct | Counted |
| S-9-3 | The column contract is stated before the first table | Present |
| S-9-4 | The status vocabulary is stated before the first table | Present |
| S-9-5 | Table letters are given meanings | Each heading states what class of finding it holds |
| S-9-6 | Section F states what a falsifier is and who is bound by it | Present |

### S-10. Gameplan Open questions (G:740–879)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-10-1 | Closed questions are visibly closed and dated | Strikethrough plus a closure sentence |
| S-10-2 | Questions answered in the plan name the sub-step that answers them | Present |
| S-10-3 | Retained original wording is marked as superseded record | Present |
| S-10-4 | No open question is contradicted by a ruling recorded elsewhere in the artifact | Cross-check against the rulings section and the register |

### S-11. Draft §1, how the plan is numbered (D:16–53)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-11-1 | The section instructs the reader to read it first | Present |
| S-11-2 | The per-step ranges it states match §2 | Range check |
| S-11-3 | The item total it states matches §2 | Count check |
| S-11-4 | The prefix table is complete | Every prefix in use appears |
| S-11-5 | The dependency notation is defined | Present |

### S-12. Draft §2, the sub-step table (D:57–222)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-12-1 | Every step carries a closing statement | Seven present |
| S-12-2 | Each closing statement names concrete artifacts | No closing statement is a restatement of the step title |
| S-12-3 | Every row carries origin ID, description, owner and dependency | No empty cells |
| S-12-4 | Per-sub-step status is readable | A status column, or an equivalent that is current |
| S-12-5 | The blanket status sentence, if present, is true | Checked against the rest of the artifact |
| S-12-6 | Every sub-step named in a register row exists as a row here | Join |

### S-13. Draft §3, ordering constraints (D:224–272)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-13-1 | Each constraint states its reason, not only its order | Present |
| S-13-2 | Every constraint's addresses exist in §2 | Join |

### S-14. Draft §4, context recipes (D:276–360)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-14-1 | The section states which sub-steps are deliberately unlisted | Present |
| S-14-2 | Every sub-step that spawns an agent has a recipe or falls in the stated exclusion | Join against §2 |
| S-14-3 | Every recipe names paths that exist | Path check |

### S-15. Draft §7, the ID mapping table (D:445–536)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-15-1 | Three columns of identity are present for every mapped item | Present |
| S-15-2 | Every origin ID in §2 appears here | Join |
| S-15-3 | Every final address here appears in §2 | Reverse join |
| S-15-4 | The gate reconciliation states what moved and why | Present, and its arithmetic matches §1 |

### S-16. Draft §8, the echo site registry (D:540–583)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-16-1 | Every row states what exactly is counted | Non-empty definition column |
| S-16-2 | Every row names an authoritative source | Present |
| S-16-3 | Every row's status is one of a stated set | Present |
| S-16-4 | Every value the artifact repeats in more than one place has a row | Grep for repeated numerals against the row set |
| S-16-5 | Every row's value matches the gameplan's | Row-by-row |

### S-17. Draft §9 and §10 (D:587–674)

| ID | What is tested | Pass criterion |
|---|---|---|
| S-17-1 | Each disagreement is presented side by side with neither marked correct | Present, per A.9 |
| S-17-2 | Each disagreement names where it lands in the plan | Present |
| S-17-3 | Each unreconciled item names what would reconcile it | Present |

---

# PART TWO — THE RUN

Twenty-two failures. Eight blocking, eleven costing time, three cosmetic. Three tests are
UNVERIFIABLE and are listed with what would be needed.

## Blocking failures

Each of these stops reader (a) from executing Step 1, or causes it to execute the wrong Step 1.

### F-1. The plan file does not contain Step 1's sub-step list. (W-A-2, W-A-3, W-C-10, S-11-2, S-12-6)

`lunar-oracle-gameplan.md` G:127 states Step 1 has "14 sub-steps, 1.0 through 1.13" and G:135 directs
the reader to `cr_scratch/step0_integration_draft.md` for the detail. That file states at D:20–21
"Step 1 holds 1.1 through 1.11" and its Step 1 table at D:74–84 holds eleven rows. Sub-steps 1.0,
1.12 and 1.13 do not exist in it.

They exist in `cr_scratch/step1_manager_open.md` — a third file, named nowhere in either artifact,
and untracked in git (`git status` reports it as `??`). Reader (a) following the artifact's own
pointer reaches a plan missing three of the fourteen sub-steps of the step it is standing in,
including the one it is standing in.

This is the primary failure. It is also a defect introduced by a correction: three register rows had
their address column moved from a dash to `1.0`, `1.12`, `1.13`, and an address that resolves to
nothing is worse than the dash it replaced, because the dash was honest about the gap.

**Fix.** Three edits, in this order.

1. In `cr_scratch/step0_integration_draft.md` §2, add three rows to the Step 1 table: `1.0` (owner
   The Designer; depends `—`), `1.12` (owner The Designer, reviewed by The Software Engineer; depends
   `1.0`), `1.13` (owner The Systems Engineer, reviewed by The Software Engineer; depends
   `1.4 (ARCH-2)`). Take the descriptions verbatim from the table at `step1_manager_open.md` lines
   494–495, so no fourth wording enters circulation.
2. Rule and assign origin IDs for the three. They were created at the Step 1 open, not at
   integration, so the existing suffix convention (`ARCH-7a`) does not cover them. Recommended:
   `STEP1-0`, `STEP1-1`, `STEP1-2`, with a row in §1's prefix table reading "created at the Step 1
   open". Add the three to §7's mapping table with `—` in the agent-authored column, matching the
   treatment already given to `WRITE-` and `GATE-`.
3. Amend D:20–21 to read "Step 1 holds 1.0 through 1.13".

### F-2. The sub-step total is stated as 72 in seven places and as 75 by the table's own arithmetic. (W-D-1, W-D-2, S-2-7, S-11-3)

The Steps table's own counts are 14 + 18 + 10 + 8 + 3 + 15 + 7 = **75**. The prose says 72 at G:144,
G:490, G:690 and G:735, and at D:22, D:517 and D:671–672. G:484 says "Roughly 20 of the **75**
sub-steps" — which now matches the arithmetic by accident, since it was wrong when 72 was right and
nothing corrected it.

The count is the single most repeated number in the artifact and it has no row in the echo site
registry, which is the instrument that exists to prevent exactly this. That is E16's defect appearing
inside E16's own instrument.

**Fix.** State the arithmetic once, in the Steps table's closing notes at G:142–156: "72 sub-steps
were drafted at 0.3 and ruled by the author at 0.8. Three were added at the Step 1 open — 1.0, 1.12
and 1.13, closing the addresses of loose ends E17, E16 and E8 — so the plan now holds 75." Then change
G:490 to "The 72 ruled at 0.7"; leave G:690 and G:735 alone, since both quote what was true when
written and both name their moment; change D:22 and D:671 to 75 with the same basis; and give G:484's
20-of-75 a stated basis or delete the fraction. Add an echo-site row: value **75**, definition "rows
in `step0_integration_draft.md` §2 across seven step tables", source "§2, counted", status Verified.

### F-3. The document contradicts itself about whether Step 0 is finished. (W-A-1, W-A-9, S-3-3)

- G:26 `**Current step:** 1`
- G:126 Step 0 status: `In progress`
- G:168 sub-step 0.6: `In progress`
- G:169 sub-step 0.7: `Not started` — while `cr_scratch/step0_manager_close.md` exists, is committed,
  and heads itself "**Sub-step:** 0.7 (A.4 step 7)"
- G:170 sub-step 0.8: `Not started` — while G:281 records "**Step 0 closed at the author's gate.**"

Reader (a) cannot resolve this. The Steps table says the project is in Step 0; the header says Step 1;
the progress log says Step 0 closed.

**Fix.** G:126 Step 0 status to `Complete`. G:168 0.6 to `**Complete.** Applied at 0.6.` G:169 0.7 to
`**Complete.** cr_scratch/step0_manager_close.md`. G:170 0.8 to `**Complete.** Three rulings; see
Author rulings.`

### F-4. Steps 1 through 7 have no per-sub-step status at all. (W-A-6, S-12-4, S-12-5)

`step0_integration_draft.md` D:59 reads "Status of every row is **Not started**." Step 1 is in
progress and sub-step 1.0 is being executed as this is written. There is no status column in any of
the seven sub-step tables.

The artifact gave Step 0 a sub-step table with a Status column (G:160–171) and taught reader (a) to
expect one. It withdrew the affordance at exactly the point where the reader needs it: a session
compacted mid-Step-1 cannot tell which of fourteen sub-steps are done without opening fourteen
deliverable paths that are not listed either.

**Fix.** Add a `Status` column to each of the seven tables in §2, carrying the deliverable path when a
row is complete, matching the Step 0 table's convention. Delete D:59's blanket sentence; a per-row
column replaces it.

### F-5. The Steps table's owner column disagrees with the plan for five of seven steps. (W-A-4, W-D-5, S-2-4)

Set comparison, gameplan Steps table cell against the plan file's owner cells:

| Step | Owns sub-steps but is not named in the Steps table |
|---|---|
| 1 | The Space Resources Engineer (1.9, and 1.8 jointly); the author (1.2, 1.6); Orchestrator (1.1, 1.2) |
| 2 | The Software Engineer (2.13, 2.14, 2.15); The Fact-Checker (2.7); the author (2.9) |
| 3 | The Systems Engineer (3.10); The Engineer (3.7); The Fact-Checker (3.1) |
| 4 | — |
| 5 | — |
| 6 | The Software Engineer (6.1, 6.2, 6.7, 6.11); The Designer (6.5, 6.14); The Engineer (6.15); Orchestrator; the author |
| 7 | The Space Resources Engineer (7.1, 7.2, 7.3); The Writer (7.5, 7.6); The Editor (7.7); Orchestrator; the author |

No persona is named who owns nothing. The failure is one-directional: the column under-reports.

This is the column a cold session reads to decide who to spawn. For Step 1 it omits the sole owner of
a sub-step (1.9) and both author rulings.

**Fix.** Regenerate all seven owner cells as the union of the owners in the plan file's tables. Where
the union is long, state the owner and the count: "The Software Engineer (4), The Writer (6), The
Editor (2), The Systems Engineer (2), The Designer (2), The Engineer (1), Orchestrator, the author."

### F-6. "The Step 1 open" is an unbound reference in four register rows. (W-C-3, W-C-12, W-A-11, W-A-12, W-F-9)

G:664 (C4), G:690 (E8), G:698 (E16) and G:699 (E17) route the reader to "the Step 1 open" and to "The
Manager at the Step 1 open" for the reasoning that produced three sub-steps and one reversed ruling.
The phrase is never bound to a filename anywhere in either artifact. The file is
`cr_scratch/step1_manager_open.md`; it is untracked, so it is not in the repository the directory map
at G:533 says ships `cr_scratch/` on purpose.

**Fix.** Name the file at each of the four sites, on the pattern the Step 0 rows already use ("Full
text at `cr_scratch/step0_manager_open.md`"). Add a progress-log row for the Step 1 open naming the
file. Commit the file.

### F-7. The third thing reader (a) and reader (b) read tells them the plan does not exist. (W-A-10, S-1-5)

G:29–31: "**This gameplan is deliberately incomplete.** It carries Step 0 and nothing after it. Steps
1 through N are the deliverable of Step 0 ... **Do not invent Step 1 before Step 0 closes.**"

It is a blockquote, at the top, in bold, and it is false: the Steps table ninety lines later carries
Steps 1 through 7, and the current step is 1. A cold session that obeys the loudest instruction in the
front matter will refuse to open Step 1.

**Fix.** Replace with a statement of what the file now is: "This file is the index and the record. The
worklist — 75 sub-steps across seven steps, with owners, dependencies and context recipes — is
`cr_scratch/step0_integration_draft.md` §2. This file carries the current step, the rulings, the loose
ends register and the progress log."

### F-8. The plan file's header denies that it is the plan. (W-D-7, S-1-6)

D:8: "**Status of this file:** draft for the register wave (0.4) and Wave 2 (0.5). Not the gameplan."
G:135–140: "**The sub-step detail lives in `cr_scratch/step0_integration_draft.md`** ... This table is
the index; that file is the plan."

Reader (a), sent to the plan, is told on line 8 that it is a draft for a review that closed two
sub-steps ago and that it is not the plan.

**Fix.** D:8 to read: "**Status of this file:** the plan. Ratified at the 0.8 gate. The gameplan's
Steps table is the index; this file is the worklist every later sub-step is executed against.
Authored at 0.3; amended at the Step 1 open." Keep D:1's title, which is accurate as provenance.

## Failures that cost time

### F-9. The `N.M` notation is used 343 lines before it is defined. (W-B-1, S-7-5, S-1-6)

First use is G:126, the Steps table. The convention is explained at G:469–482 under "Numbering
convention, ruled by the author"; the register's column contract is at G:622.

**Fix.** One sentence above the Steps table: "Sub-steps are numbered `N.M`, N the step and M the
sub-step. The one-step gate fires at step boundaries only — seven times. The convention was ruled by
the author; see Design notes."

### F-10. The origin-prefix vocabulary is introduced incompletely, and its suffixes not at all. (W-B-3, W-B-4, S-11-4)

G:479 names five prefixes: `ARCH-`, `LOOP-`, `MERGE-`, `LUNAR-`, `ECON-`. The plan uses seven —
`WRITE-` and `GATE-` are both in service (D:34, and sub-steps 6.7–6.10 and 6.15). The gameplan also
uses suffixed forms it never explains: `MERGE-5t` at G:642, `LOOP-4t` at G:650, `LUNAR-4` at G:665.
D:47–48 explains the suffixes; the gameplan does not, and the gameplan is where reader (a) meets them
first.

**Fix.** G:479 to name all seven, and add: "A `t` suffix marks a test-stage sub-step written before
the work it asserts. A letter suffix (`ARCH-7a`) marks one of several sub-steps split out of a single
Wave 1 item."

### F-11. The status vocabulary is not the vocabulary in use. (W-B-6, W-B-7, W-B-8, S-9-4)

Declared at G:627–630, eight terms: OPEN, FIXED, PENDING-PUSH, DEFERRED, AUTHOR, POSITION TAKEN,
PARTLY CLOSED, ACCEPTED LIMIT.

Used but not declared: **CLOSED** (A8, D1), **NARROWED, NOT CLOSED** (D5), **ADDRESSED** (E8, E16,
E17). Six rows of forty-four carry a status the closed list does not contain.

Declared but never used: **PENDING-PUSH**, **PARTLY CLOSED**.

Reader (a) cannot act on ADDRESSED, and cannot tell CLOSED from FIXED — a distinction that matters,
because A8 is CLOSED and A1 is FIXED and both describe a landed, verified fix.

**Fix.** Extend the list to: "OPEN; FIXED (done and verified in this repository); CLOSED (done and
verified in an upstream repository, or ruled shut by the author); PENDING-PUSH (the fix belongs
upstream and has not landed there); DEFERRED (owner and sub-step assigned); ADDRESSED (a sub-step has
been created for it and has not yet run); AUTHOR (needs a ruling); POSITION TAKEN (an agent has ruled
and nobody has ratified); NARROWED (the finding survives, its scope is reduced, and the row says to
what); PARTLY CLOSED (one trigger of two has fired); ACCEPTED LIMIT (known, not fixable at this layer,
documented where it bites)." Then set D5's status token to NARROWED.

### F-12. Row D5's address is a sub-step that has already run and does not close it. (W-E-3, W-E-5)

The column's contract at G:622–625: the `N.M` column "names the sub-step ... that closes the row."
D5's cell reads `0.5`. Sub-step 0.5 is complete, and D5's own Status says the trigger "stays armed
until sub-step 2.2 reads them."

**Fix.** G:675, address column: `2.2`.

### F-13. The echo site registry contradicts the gameplan on the abstract count. (W-D-9, S-16-5)

D:562 carries **13** — "Summaries reproducing verbatim text from their source's printed abstract; 12
measured, all marked as quotation except one" — with status "Verified". D:563 describes 4 as a subset
"Of those 13".

G:639 (A4) says: "**Four is the corrected count.** The earlier count of thirteen included
transcription markers in citation fields, which are a different thing." G:811–818 says the same at
length. The gameplan's position is that 13 is a discredited count arrived at by conflating two
categories; the registry's position is that 13 is Verified and 4 is a subset of it. Both cannot be
right, and the registry is the instrument whose entire purpose is to stop this. A third figure sits
inside the same row — "12 measured" — which matches neither.

**Fix.** Rewrite D:562 as: value **4**; definition "summaries reproducing verbatim text from their
source's printed abstract, measured by 10-gram shingle overlap at or above 10% over the 103
PDF-paired summaries"; source "loose end A4; gameplan Open Question 8 as corrected"; status "Verified;
incomplete until 2.12 (MERGE-8) covers the 57 untested". Move 13 to its own row marked
**SUPERSEDED**, with its definition stated as what it actually counted, so the number stays traceable
where a reader meets it. Delete "12 measured", or give it its own row and its own rule.

### F-14. The registry still carries B5's uncorrected DOI figure. (W-D-10, S-16-5)

D:559: "Only 79 of 182 carry a DOI at all." G:653 (B5) says that figure "cannot be reproduced as
written", that it was measured "under a definition the register never stated", and that a regex for a
resolvable DOI over the 176-file union returns **91 with and 85 without**. The row's PROVISIONAL
status softens the number but does not carry the correction, and 79 is the figure a reader will copy.

**Fix.** D:559 to carry both, each with its rule: "79 of 182 under a confirmed-DOI-field rule,
superseded; 91 with and 85 without under a resolvable-DOI-anywhere-in-file regex over the 176-file
union. 2.1 (MERGE-2) replaces both and states its rule."

### F-15. Every statement about the Lunar Scenario Explorer's ref is now false. (W-D-11, S-7-3)

`lsei` HEAD is `7f97983` and `origin/main` reads `7f97983`. The artifact says:

- G:362: "main at `f788ea2`, which is also what `origin/main` reads." False.
- G:388: "`origin/main` reads `f788ea2`, the same ref this working copy is on." False.
- G:638 (A3): "**pushed**: `origin/main` reads `f788ea2`." False as evidence; the dedup commit is
  still an ancestor, so the claim it supports survives.
- G:407: figures "carry the ref [they were] measured against (`f788ea2`, `f0c976b`)" — true as a
  measurement basis, and it now sits next to two false statements.
- D:574: "`f0c976b / c8274e6` ... working-copy refs at seed time" — correct, and correctly labelled.

The ref moved because A8's fix was authored and pushed this session. The correction updated the row
and did not sweep the echo sites, which is E16's failure mode in the same session that assigned E16 a
sub-step. `f0c976b` and the 750-line operational guide both verify.

**Fix.** G:362 and G:388 to `7f97983`, with a clause naming what moved it ("the README corrections of
loose end A8"). G:638 to "`origin/main` reads `7f97983`; the dedup commit `f788ea2` is an ancestor."
G:407 to state that `f788ea2` remains the measurement basis for the app figures and that the working
copy has since moved to `7f97983`. Add an echo-site row for the live lsei ref, distinct from the
seed-time row.

### F-16. Row A8's Finding cell denies its own Status cell. (W-D-12, W-E-10)

G:643 opens: "**Two more errors in `lsei/README.md`, and neither is fixed anywhere yet.**" Its Status
cell reads "**CLOSED, 2026-08-26.** Fixed and pushed as `lsei` `7f97983`." I verified the commit: it
exists, it is on `origin/main`, and it makes all three corrections the status claims.

**Fix.** G:643 Finding cell to open "**Two errors in `lsei/README.md`, found at 0.5.**" The finding is
the record of what was found; the status is the record of what was done. The word "yet" belongs to
neither.

### F-17. The artifact asserts a push prohibition it records itself breaking three times. (W-D-13)

G:56 states the working copies are "cloned and never pushed". G:637 (A2) records the push URLs
disabled and the assertion carried in `CLAUDE.md`. Both verify on disk: `lsei` and `cr-agents` each
read `origin  DISABLED (push)`.

Against that: G:291 records two commits "authored through this working copy" and on `origin/main`;
G:638 and G:640 record pushes at `d7889e1` and `f788ea2`; G:643 records a push at `7f97983`. Three
pushes to an upstream this project says it never pushes to, through a working copy whose push URL it
says is disabled.

The pushes may be entirely legitimate — the author owns both repositories and can push from any
clone. The defect is that nothing in the artifact says so, so reader (a) meets a rule and its
apparent violations with no way to tell which governs, and A2's stated fix does not survive contact
with the record three rows later.

**Fix.** Add a sentence to A2's Status: "The prohibition is on unattended pushes from a session. The
author pushed `d7889e1`, `f788ea2` and `7f97983` from his own clone as the owner of that repository;
those are recorded in the progress log and in A3, A5 and A8. A session that finds it needs to push an
upstream escalates rather than re-enabling the URL." If that is not what happened, the register needs
the true account, and it needs it more.

### F-18. Loose end E9 is false. (W-E-10, S-9-2)

G:691: "**'Committed' is aspirational throughout this register.** This repository has zero commits."

`git log` returns two: `63d4ded` "Step 0: the operating gameplan, team-reviewed" and `27bdeb7` "Step 0
gate: dissolve the recruited seat, keep Step 7, shelve the FA files". Twenty-one files are tracked,
including both artifacts under test and both scripts in `tools/`.

The row is not merely stale. It governs how every other row's word "committed" is read, so reader (a)
discounts forty-three rows' worth of evidence on a false premise.

**Fix.** G:691 Finding to: "'Committed' was aspirational when this row was written. The repository now
holds two commits (`63d4ded`, `27bdeb7`) and twenty-one tracked files. Nothing is pushed: `origin/main`
is `42c9403`, an unrelated initial commit holding only `LICENSE`, and the local branch is two ahead
and one behind on a divergent history." Status to `PARTLY CLOSED` — committed, not pushed — which is
the first use that declared term has had.

### F-19. The progress log is not in the order it announces, and its newest row is not the newest event. (W-D-14, S-6-4, S-6-5)

G:274: "Reverse-chronological: the newest row is first ... the order of the rows is the only statement
of which entry supersedes which." The placement passes S-6-2 and S-6-3 cleanly; the device works.

The content does not obey it. Row 1 is `0.4, 0.5`; row 2 is `Setup rev. 3`; row 3 is `0.8`, which
records the Step 0 close — the latest event in Step 0. Under the log's own rule, row 1 supersedes row
3, which inverts the record.

Separately, there is no row for the Step 1 open, so the newest row predates the current state by a
whole sub-step and four register changes.

**Fix.** Move the `0.8` row to the top. Add a new top row: "`Step 1 open` | 2026-08-26 | The Manager
opened Step 1 at `cr_scratch/step1_manager_open.md`. Three sub-steps added — 1.0, 1.12, 1.13 — closing
the addresses of loose ends E17, E16 and E8; the plan moves from 72 to 75. C4 corrected a second time.
A8 fixed and pushed upstream as `lsei` `7f97983`."

### F-20. The gameplan's Context recipes section has no forward pointer. (S-5-1, S-5-2)

G:253–268 is headed "Context recipes" and holds recipes for sub-steps 0.1 through 0.5 only. Reader (a)
executing sub-step 1.4 reads the heading, finds no row for it, and has no statement that the recipes
for Steps 1–7 are at §4 of the plan file. The pointer at G:135 mentions "the context recipes" among a
list of six things, 120 lines earlier and in a different section.

**Fix.** A line under the heading: "Step 0's recipes only. The recipes for sub-steps 1.1 onward are at
§4 of `cr_scratch/step0_integration_draft.md`."

### F-21. Three sub-steps have no context recipe. (S-14-2)

§4 of the plan file covers 1.1 through 1.11 for Step 1. Sub-steps 1.0, 1.12 and 1.13 each spawn an
agent, and none has a recipe. The exclusion stated at D:278–279 covers author rulings, orchestrator
gates and pure applications of an already-produced artifact; none of the three is any of those. The
recipes exist at `cr_scratch/step1_manager_open.md` lines 562–575.

**Fix.** Add the three rows to §4, copied from that file, when F-1's rows are added to §2.

## Cosmetic failures

### F-22. Three small ones, grouped.

- **E2's dash does not say why.** (W-E-4) G:684's Status explains the fix but not the empty address.
  The contract at G:624 requires "the Status cell says why". Add: "no sub-step closes it; it was
  closed at 0.3." A8 and E9 both satisfy the contract; E2 is the only one that does not.
- **Two address cells hold prose.** (W-E-5) B1's reads "Step 4 gate (2.16, 3.7, 3.8, 4.1, 4.2)" and
  E4's reads "1.1 before 2.5". Both are meaningful and neither is an address. Either declare the two
  admissible forms in the column contract at G:622, or normalize them to `4.2` and `1.1`.
- **"See below" at G:163 is 158 lines from its target.** (W-C-4) The Recruiter row's "See below."
  resolves at G:321, "The recruited persona, 0.1b". Name the section.

## The three corrections written this session

I was asked to say whether the corrections that post-date The Manager's prompt are themselves
defective. Two are, and the third is clean.

**Row C4 (G:664) is right about the file and loose with two numbers.** Verified against
`lsei/report-generator-prompt.md`. The heading `## The verifier` is at line 352; the instruction
"Write this out as `verify_report.js` and run it. It is the same file the proofs in step 5 were run
against." is at 354–355, verbatim as quoted; the fence markers are at 357 and 686. Two defects:

1. "Its complete 328-line source is embedded ... lines 357 to 686" states a span of 330 lines and a
   length of 328 in one sentence. Both are true of different things — the fenced block is 330 lines,
   the JavaScript inside it is 328 — and the row does not say so. This is the counting-rule defect
   E16 names, in the row that has now been wrong twice. **Fix:** "lines 357–686, of which 358–685 are
   the 328 lines of source."
2. "**Twelve lines above the block** the upstream file states ..." The quoted sentence is at
   `report-generator-prompt.md` lines 349–350. That is seven lines above the fence and two above the
   heading, not twelve. **Fix:** "Two lines above the heading".

The substance of C4 is sound and the reversal is correct. The Manager's common cause — "this project's
searches look for containers and its dependencies live as content" — is the right diagnosis and is
worth the sub-step it was given.

**Row A8's closure introduced three false statements and one intra-row contradiction.** F-15 and F-16.
The commit is real and does what the row says; the ref echo sites were not swept.

**The "Objective 5" removal from Step 3 is clean.** G:129 reads "Objective 3" and D:116 reads
"(Objective 3)". No surviving occurrence of Objective 5 attaches to Step 3 in either file; Step 6
carries Objectives 2 and 5 in both. No defect found.

**The three address assignments (E8 to 1.13, E16 to 1.12, E17 to 1.0) are correct as decisions and
defective as executed.** F-1. The addresses are right; the sub-steps they name were never written into
the plan file, and the total was never re-derived. Both are consequences of the same omission and both
are fixed by the same three edits.

**One stale premise in the brief I was given.** The Manager's prompt says "Three rows currently carry
a dash; The Manager has assigned all three, so a dash is now a defect rather than a declared gap." The
three rows he assigned were E8, E16 and E17, and all three now carry addresses. The three rows that
carry a dash *now* are A8, E2 and E9, and none of them is one of his. A dash is therefore still a
declared gap, and the test as posed would have produced three false positives. The test I ran instead
is W-E-4: a dash passes if the Status cell says why. A8 and E9 pass; E2 fails (F-22).

## Tests that could not be run

**UNVERIFIABLE-1. Every reader (b) test, against the artifact a stranger can actually obtain.**
(W-F-8, and by dependency W-F-1 through W-F-7)

`git ls-tree -r --name-only origin/main` on this repository returns one file: `LICENSE`. `origin/main`
is `42c9403`, "Initial commit". The local branch is two commits ahead and one behind on a divergent
history. The paragraph written at 0.6 for the stranger who cloned this public repository cannot be
read by that stranger, because cloning this public repository yields a licence and nothing else.

I ran the reader (b) tests against the working tree, which is the only artifact that exists, and they
pass on their own terms: the opening paragraph at G:3–8 names the product, the two corpora, the app's
authority and the refusal discipline; the directory map at G:523–537 states what does not ship and
why; the licence position is stated at G:749–759. Two findings survive that reading.

- **W-F-2 fails.** G:3–8 describes an unbuilt system in the present indicative — "a team of specialist
  agents answers it", "Every answer names the sources it resolved to". `literature/`, `oracle/` and
  `README.md` do not exist. G:10, "This file is the plan for building it," arrives one paragraph later
  and is the only correction. **Fix:** move the build state into the paragraph — "None of it is built
  yet; this file is the plan for building it, and the plan is the deliverable so far."
- **W-F-6 fails.** The directory map has no row for `LICENSE`, which is the only file on `origin/main`
  and which a merge or pull will introduce. **Fix:** add the row.

**What would be needed:** push `63d4ded` and `27bdeb7`, then re-run W-F-1 through W-F-9 against a
fresh clone of `origin/main`. Until then every claim this artifact makes about what a stranger sees is
untested, including the one the register records as fixed.

**UNVERIFIABLE-2. Whether the 44 register rows are complete against what Step 0 actually found.**
W-E-2 tests the declaration against the tables and passes; completeness against the source findings is
a different test. It would need the five Wave 1 files and the three Wave 2 files read in full against
the register, which is outside this sub-step's context recipe. Assign it to 1.12 if the counting-rule
contract wants a worked example, or leave it: the row-count device catches splice loss, which is what
it was built for.

**UNVERIFIABLE-3. Whether the plan's 72 drafted rows are each still correct after the Step 1 open.**
Reading `cr_scratch/step1_manager_open.md` in full is what that requires, and it is a third file
outside the artifact under test. The three additions are the part that reaches the artifact and they
are covered by F-1.

## Passes worth recording

Three of these are load-bearing enough that a later revision should not undo them.

- **W-E-1, W-E-2.** The register declares "44 rows in five lettered tables — A 8, B 7, C 5, D 7, E 17"
  and holds exactly that: 8, 7, 5, 7, 17. The declaration is correct and the device works. The
  accumulator's copy of it does not — `accumulator.md` line 103 says the register "declares 42 rows".
  It declares 44. The accumulator is not under test here, and the error is worth naming anyway,
  because it is the cleanest available instance of what 1.12 is being written to prevent: the count
  moved and the record of it did not.
- **S-6-1, S-6-2, S-6-3.** The progress log announces its order, the announcement is above the table,
  and it states why the order carries meaning. The reader meets the rule before the data. Only the
  content fails (F-19).
- **W-C-9, W-C-11.** All 72 origin IDs in §2 resolve in §7, and every dependency address resolves to a
  row that exists. Zero dangling, as claimed at G:155–156. The mapping table earns its three columns.
- **W-C-7.** Every external quotation checked is present verbatim in its source: the
  `report-generator-prompt.md` instruction and register sentence; `step0_editor_prohibition.md` §6,
  whose scope the gameplan restates at G:70–75 accurately.
- **W-D-11, in part.** `cr-agents` is at `f0c976b` locally and on `origin/main`, exactly as stated; the
  operational guide is 750 lines, exactly as stated; both push URLs read `DISABLED`. The lsei half is
  F-15.

## Verdict

The document is a good briefing and it is still not a worklist, and the reason has changed. At 0.5 the
failure was structural: a reader could not find the shape of the work. That was fixed. The failure now
is that **the worklist and the index have come apart.** The index says fourteen and the worklist holds
eleven. The index sums to 75 and both files say 72 in prose. The index says who owns a step and the
worklist disagrees for five of seven. Three sub-steps live in a third file that neither names and git
does not track.

Every one of these is a correction that reached one site and not its echoes. That is not a coincidence
and it is not a criticism of the corrections, which were individually right. It is E16, and the fact
that E16 was assigned a sub-step in the same session that produced four fresh instances of it is the
strongest argument available that 1.12 should be written before any further correction is applied to
this artifact.

**The length is not what defeats reader (a).** Seventy-five sub-steps across 1,553 lines is navigable;
the plan file's per-step tables with closing statements are a good structure, and the origin-ID column
does the work it was kept for. What defeats reader (a) is that the two files disagree about the
current state of the project in seven places. Fix the seven and the length is a non-issue. I make no
recommendation about cutting rows.

**Recommended order of application.** F-1 first, because F-2, F-5, F-20 and F-21 are all consequences
of it, and applying them in any other order means applying some of them twice. Then F-3, F-4, F-7 and
F-8 — the four state contradictions — as one pass. Then F-15 and F-16 as one pass, since both are the
A8 sweep. Then the rest in any order.

**One process finding, for The Manager rather than for the orchestrator.** No sub-step in this plan
re-runs 1.0's suite. A cold-read suite that runs once tests the document on the day it was least
likely to be wrong. Sub-step 1.12 is authored by me and consumes this file; the natural place for the
re-run is a post-condition on each step's closing gate — "the 1.0 suite passes against the gameplan
and the plan file as they now stand" — costing one spawn per gate, seven times. I am not writing a
sub-step for it. I am naming it as a decision The Manager owns.
