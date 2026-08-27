# Step 0.5 — The Designer: the gameplan as a designed artifact

**Reviewed:** `lunar-oracle-gameplan.md` (668 lines) against `cr_scratch/step0_integration_draft.md`
(the plan it indexes), `lsei/README.md` (the register precedent), `cr_scratch/step0_editor_prohibition.md`
(§6 scope, §9 permitted self-statements), and operational guide A.6.2 and A.16.

Document design only. Technical correctness is The Systems Engineer's; factual truth is The
Fact-Checker's. Three items below are flagged to them rather than ruled on here.

---

## 1. Verdict: the cold-restart reader

**Works as a briefing, fails as a worklist.**

The register is the right idea and it is the best-designed thing in the file. Every row carries a
finding, evidence and a status, and the header sentence — "Do not close a row by agreeing with it.
Close it by doing it" — is the correct instruction. A fresh session reading top to bottom will
understand the project.

It fails at the point of action. **Twelve of thirty-one rows name no sub-step a reader could open.**
The plan they belong to is addressed in `N.M` under the author's numbering ruling; the register is
addressed in retired Wave 1 tags and in prose. Rows carrying no `N.M`: A6 ("merge step"), A7 ("the
merge step"), B1, B2, B3, B4, B5, C1, C5, D1, D7, E4. Two of those name IDs that no longer exist:

- **C1 says "OPEN, step SR-1b."** Integration retired `SR-1b` to `LUNAR-1b` and then to **3.2**
  (`step0_integration_draft.md:487`). A reader searching the plan for `SR-1b` finds nothing.
- **E4 says "The Systems Engineer's SE-1 must land before The Engineer's merge executes."** `SE-1`
  is the exact collision that **E2, the row directly above it**, records as retired. E4 also carries
  status "ordering constraint for integration," and integration closed at 0.3.

The fix is one column: an `N.M` address per row, taken from the integration draft's own mapping
table. Without it, closing this register requires the mapping file plus a reading of three
documents — which is the condition the register exists to prevent.

**Second failure: the register does not state its own size.** Thirty-one rows across five lettered
tables, plus three falsifiers in F. Nothing in the document says so. A row lost to a bad splice —
and this file has been spliced eight times today — is undetectable by inspection.

## 2. Verdict: the stranger who cloned the repository

**Fails, and the one sentence written for that reader is wrong.**

The first thing a stranger reads is `**Document(s) under work:** the Lunar Oracle repository itself.`
Process metadata addressed to an orchestrator. What Lunar Oracle *is* arrives at line 30, after
fifteen lines of file paths, and even there it is defined relationally — "a grown-up version of the
Oracle prototyped inside the Lunar Scenario Explorer" — which requires already knowing what the
Scenario Explorer is. Set against the author's own precedent: `lsei/README.md` line 5 tells a
stranger what the thing is, what it models, and what happens when you move a slider, in one
sentence, before any path appears. The same author's register is available and this file does not
use it.

The document is standing in for a `README.md` the directory map marks "Written in a later step."
That is a defensible schedule. What is not defensible is that the one sentence in the file aimed
squarely at the cloning stranger states the wrong quantity and the wrong object:

> *line 100:* "A person who clones Lunar Oracle gets 119 summaries and no PDFs"

119 is the **intake** corpus. What a cloner gets is the merged corpus — 176 provisional, per the
document's own registry. This sentence describes a repository that will never exist.

**Structural recommendation, and it is the only ordering change I would make.** Design intent before
Objectives is right; Objectives derive from the brief. **Directory map before Objectives is not.** It
is a design note holding position three, and it pushes Objectives to fourth against A.6.2, which
opens with them. Move the map down into Design notes and a cold reader meets the six objectives on
page one. A.6.2's "Document structure" is answered "Deferred" — permitted under Manager F1, but note
that the loose ends register is prose with a defined reader and a defined failure mode, and it is
the section the deferral leaves unshaped.

---

## 3. Echo site catalogue

Per A.16 every echo site needs one designated authority, and cross-location agreement is not the
test. **The authority for corpus counts is the echo site registry at
`cr_scratch/step0_integration_draft.md` §8** — the gameplan itself delegates there (line 157).
Agreement with the registry is the test below.

| # | Value | Authority | What the authority says | Locations that disagree |
|---|---|---|---|---|
| **E1** | LSEI corpus size | reg §8 rows `158` / `152` | 152 on disk after the six dedup deletions; 158 is the pre-dedup base, and **"any document quoting a corpus count must also quote its basis: 158-file or 152-file"** | **Six sites state 158 with no basis:** L13 (header), L115 (Objective 1), L210 (Engineer brief), L372 (Verified inventory), L416 (PDF note), L515 (B1). L630 correctly uses 152. The header is the worst of these — first number a reader meets, and stale. |
| **E2** | Union of the two corpora | reg §8 row `182` | Union **by filename**. The row says in bold: **"Not a source count."** | **L385: "The union is 182 distinct sources."** Contradicts its authority directly, and contradicts **B5 in the same document** ("'182 sources' is a filename count... true distinct sources is about 162 to 173"). Same error at L325 and L357 ("at 182 sources"). |
| **E3** | Post-dedup union | reg §8 row `176` PROVISIONAL | Arithmetic, not measurement; recomputed at 2.1 (MERGE-2) | L470 states it correctly with its basis. **No disagreement.** The deliberate 182/176 double is doing what the registry asks and should be left as it is. |
| **E4** | LSEI-unique count | reg §8 rows `63` / `57` | 63 is pre-dedup basis; 57 is the PROVISIONAL post-dedup figure | L384, L508 (A6) and L650 all state **63** with no basis. **57 appears nowhere in the gameplan**, so the provisional figure the registry publishes has no echo here at all. |
| **E5** | Author-year clusters | reg §8 row `16 or 17` | **CONTESTED**, reconciled at 2.1 (MERGE-2) | L474 states the contest correctly. **L518 (B4) states "Sixteen author-year clusters" as settled fact.** B4 is the row the retrieval invariant is built on — the one place the contest is load-bearing is the one place it is concealed. |
| **E6** | Sub-step count | gameplan L165, confirmed by the step table (11+18+10+8+3+15+7 = **72**) | 72 | **L186** (sub-step 0.3 status) and **L296** (progress log) both say "73 steps in 7 phases." **L453** ("20 of the 73 sub-steps") and **L459** ("The 73 is not yet ruled on") are stale rather than historical. L439–440 use 73 as history and are correct. |
| **E7** | Abstract audit | reg §8 rows `13` / `4` | 13 carry verbatim abstract text; 4 was the original unmarked classification, corrected to 1 (`turyshev-2026`) | **L297 progress log reads as a retraction of the wrong number:** "four files, not thirteen." **L622** says "thirteen summaries carry verbatim text." Both are true of different objects; the document never disentangles them in the same place. The registry does. Point one at the other. |
| **E8** | Audit denominator | **none — uncatalogued** | — | **L506 (A4): "over 103 PDF-paired summaries." L644: "all 108 testable PDF-paired abstracts."** Two denominators for one audit, neither in the registry. Flagged to The Fact-Checker: one is wrong and I cannot rule which. |
| **E9** | Does OQ8 gate the public release? | **L618: "It does not gate the public release"** | does not gate | **L299 (progress log): "answered Open Question 8 in the affirmative, which now gates the public release." L585 (OQ2): "now load-bearing rather than precautionary, because a public release is the thing it would stop."** Two live sites assert the opposite of the corrected answer. L651's "then the repository goes public" sits inside the marked original wording and is correctly quarantined. |
| **E10** | Threshold tuning basis | **none — uncatalogued** | — | **L516 (B2): "tuned on a 156-file single-field corpus."** 156 is neither 158 nor 152, and the registry's `0.45` row repeats it without explaining the third basis. Flagged to The Fact-Checker. |
| **E11** | Personas per question | **none — uncatalogued** | — | **L237 and L594 say "nine personas."** L366 says "twelve standing personas plus The Recruiter," and The Growth Economist makes fourteen. Nine has no authority anywhere. Flagged to The Systems Engineer. |
| **E12** | Quarantine size | **none — uncatalogued** | — | L434: "26 `.md` files and zero PDFs." Single site; add a registry row or leave it. |

**Net:** three uncatalogued echo sites (E8, E10, E11), one authority-contradiction the document also
contradicts itself on (E2), one concealed contest at the exact row where it matters (E5), one
correction two live sites still deny (E9), and six stale instances of the corpus size including the
header (E1). The deliberate 182/176 double (E3) is the one that needs no work.

---

## 4. Structural damage

Locations, in document order.

**S1 — L13 header.** `lsei/literature/` (158 summaries, 8 topic folders). First number in the file,
stale by six, no basis marker. L14 likewise reads as if 119 were a deliverable.

**S2 — L16 header, version identity.** `**Date:** 2026-08-26 (revised same day after author
feedback)` is the whole of it. The progress log records eleven separate revision events, all dated
2026-08-26. A reader cannot tell which version of this file they hold, and the reason it matters is
that this file is the seed that ships in the repository.

**S3 — L210, superseded instruction left standing.** The Engineer's Wave 1 brief still reads "they
pair to their summaries by directory adjacency rather than by filename, which recovers 143 of 158
against 92 by name match. See the design note below. He writes the adjacency rule as a step someone
else could execute." The design note below (L414–425) rules adjacency **"not a rule a machine can
follow"** and records that implementing it matched `un-1967-outer-space-treaty` to
`deming-1967-japan-quality-control.pdf`. The forward pointer promises an elaboration and delivers a
refutation. Mark the brief as historical or it reads as live instruction.

**S4 — L186, stale status.** Sub-step 0.3 status reads "**Complete.** ...73 steps in 7 phases" beside
L157's "all 72 sub-steps" and L165's "The count is 72, not 73."

**S5 — L187, a row that contradicts its own status column.** Sub-step 0.4's description begins
"**Register wave, sequential.** IN PROGRESS." and the Status column reads "Not started." Both
deliverables exist on disk (`step0_writer_register_spec.md`, `step0_editor_prohibition.md`), so the
description is stale and the column is doubly stale.

**S6 — L188, sub-step 0.5.** Status "Not started" while all three reviewers are running. The row also
specifies "sequential... The Systems Engineer, then The Designer, then The Fact-Checker," and the
three are in fact running in parallel. One of the two is wrong; flagged to The Systems Engineer as a
conceptual-integrity question rather than ruled here.

**S7 — L273–286, Context recipes, a missing row.** Sub-step 0.5 names three agents. The recipe table
has rows for The Designer and The Fact-Checker and **none for The Systems Engineer**, whom 0.5 names
first. Sub-step 0.7 (The Manager closes) also has no recipe. A.6.2 requires a recipe for each step
that spawns agents.

**S8 — L292–302, progress log with no ordering.** Rows run: Setup, 0.1b, Setup rev.3, 0.3 renumber,
0.3, Abstracts, Dedup, 0.2, 0.1 rev.1, Setup rev.2, Setup rev.1. Rows three through eleven are
reverse-chronological; rows one and two break that pattern. Every row carries the same date, so
there is no second key to sort on. A cold reader cannot determine which statement supersedes which —
which is exactly the question they have, since **L299 in this table is the site that still says OQ8
gates the release** (E9 above).

**S9 — L490–556, the register's status vocabulary breaks its own declaration.** The declared set is
OPEN, FIXED, PENDING-PUSH, DEFERRED, AUTHOR. **Four undeclared values are in use:** `POSITION TAKEN`
(D2, E3), `PARTLY CLOSED` (D5), `ACCEPTED LIMIT` (E5). Separately, DEFERRED is *defined* as "owner
and step assigned," and **A7, B4, C5 and D7 are DEFERRED with neither.** Either extend the
declaration or retag the rows; both are cheap, and the current state teaches a reader that the
vocabulary is decorative.

**S10 — Group E's table has three columns where A, B and C have four.** A/B/C are
`# | Finding | Evidence | Status`. **E is `# | Finding | Status`** — the Evidence column is gone.
E2 is marked **FIXED with no evidence column to name evidence in.** The test "every FIXED row names
evidence a reader could check" cannot be satisfied by E2 as the table is shaped.

**S11 — Group D's column header does not match D7.** Header is `# | Question | Position(s) taken |
Status`. **D7 is not a question** ("The two adjudicated duplicate pairs are a deferred merge, not a
resolved tie"), and its middle cell holds evidence and file locations, not a position. It is a
finding filed in the decisions table.

**S12 — A5's evidence points at the pre-fix state with no pre-fix locator.** A5 is marked "**FIXED**
locally" and its evidence is `lsei/README.md` line 26. A reader who opens line 26 today finds the
corrected sentence and cannot confirm the finding ever existed. Record the superseded string or a
commit. Same shape, less severe, on A1: seven probe paths are named, and neither the paths nor the
output is recorded.

**S13 — L638–668, Open Question 8, the worst splice in the file.** Two "original wording" markers,
one nested inside the other's payload:

- L644 opens `Original wording, retained as the record of the error:` and runs to L654.
- L656 begins `The Systems Engineer's earlier partial finding stands alongside it: The Systems
  Engineer found three files carrying full third-party source text...` — **the subject is written
  twice**, a bare splice artifact.
- That paragraph ends at L662 with `The Engineer's sample of the summaries themselves is still
  outstanding.` — **superseded by the paragraph two above it**, which reports that The Engineer ran
  the sample across every testable abstract. Two contradictory statements standing side by side,
  neither marked.
- L663 then reads `Original wording follows.` **mid-paragraph, with no break**, and the second
  original wording runs to the end of the file.

A reader arriving here cannot tell which layer is current. The section states the corrected answer
well at L618–642 and then buries it under two unlabelled strata of superseded text.

**S14 — L555 (D7) is a note to self in a findings table.** No owner, no sub-step, no trigger beyond
"the merge." Its content is a real observation about the dedup losers, and it belongs either as a
DEFERRED row with a `2.x` address on it or in the dedup decisions file it already cites. E3's closing
clause ("because whimsy in front of a system about to refuse every question burns the one first
impression") is rationale sitting in a Finding column — keep the sentence, move it out of the cell.

---

## 5. The self-correction question

**Ruling: honest record-keeping. Keep all four. Cut four phrases.**

The Editor's §6 settles the scope question before the aesthetic one arises. The prohibition governs
"**team deliverables**: the answer block, the answer file, and the refusal," and explicitly exempts
"specifications, run logs, agent handoffs in `cr_scratch/`, or the Oracle's own register, which have
different readers and are allowed to reason about themselves." His own line: *"A specification that
states the limits of its own checks is doing its job."* **The gameplan is a specification.** The
prohibition does not reach it, and the four corrections are not in tension with it.

They also pass the §9 test on their own merits, which is the stronger result. §9's rule is *"a
permitted self-statement names an object; a prohibited one names a virtue."* Each correction names
objects a reader can go and check:

- **L414–416** names the note, the surveyor, the corrector, the sub-step, and states which version
  governs. Object throughout.
- **L428** names two numbers against two numbers, and the folder that explains the gap.
- **L468–470** names the arithmetic, both bases, and the sub-step that replaces them.
- **L618–620** names the measurement, the classification, who made each, and the four files.

None of them asks the reader to admire anything. All four make the document falsifiable where it
previously was not, and **the record of the error is load-bearing for the cold reader** — without
L414's marker, a fresh session reading the Engineer brief at L210 would execute a rule the project
has already proved broken. That is the argument that decides it: the corrections are not there to be
seen being honest, they are there because a reader who does not see them will do the wrong thing.

**Four phrases cross the line, and they are the same construction each time.** Each fails the
Editor's deletion test — delete it and nothing false is asserted, because the fact is always in the
adjacent clause.

| Location | Phrase | Why it fails |
|---|---|---|
| L470–471 | "Integration **declined to republish** 182 as if current and **declined to silently substitute** 176" | Names restraint, not an object. The next clause already carries the whole fact: "182 is a measurement and 176 is arithmetic over a changed input." |
| L508 (A6) | "stated rather than papered over" | The scope limit is the fact and it survives deletion. The phrase asserts candor. |
| L650 | "Scope limit **stated rather than papered over**" | Same phrase, second instance. A tic at this point. |
| L558 | "Recorded here so that the 0.5 review is **a test rather than a restatement**" | Names an object (the 0.5 review), but the payload is a claim about the document's own seriousness. |

Cutting these costs nothing and removes the only reading on which the corrections look like display.

**One thing the document should add.** L59–60 tells the team "no epistemic theater, no performative
rigor, **no narration of the document's own honesty**. This is `signs_of_ai_writing.md` Category 8
and it is a hard boundary, not a preference." Sixty lines later the document reasons about itself at
length. It is entitled to — §6 says so — but **§6 lives in a `cr_scratch/` file the gameplan does not
cite**, so the exemption is invisible from inside this document. A stranger reading L60 and then L470
sees a rule broken by the file that states it. One clause at L60 naming the scope split fixes it: the
prohibition governs deliverables, and this specification is not one.

---

## 6. Flagged to the other Wave 2 reviewers

- **To The Fact-Checker:** E8 (103 against 108 as the abstract-audit denominator — one is wrong),
  E10 (156 as a third corpus basis alongside 158 and 152), E11 ("nine personas" against "twelve
  standing personas plus The Recruiter").
- **To The Systems Engineer:** S6 (0.5 declared sequential, executed in parallel — whether the plan
  describes what the project does), and E11 if nine is meant to be a default wave size rather than a
  slip.

## 7. Priority

Blocking for a public seed: **S13** (the OQ8 splice — a stranger cannot tell what is current),
**E9** (two live sites deny the corrected release gate), **E2** (182 called a source count against
its own authority and against B5), the **line-100 sentence** (wrong number, wrong object, aimed at
the stranger), and **S1** (stale count in the header).

Blocking for cold restart: the **`N.M` column on the register**, **C1's dead `SR-1b`**, **E4's dead
`SE-1`**, **S9** (undeclared statuses), and **E5** (B4 states a contested count as settled at the one
row where the contest is load-bearing).

Everything else is cleanup.
