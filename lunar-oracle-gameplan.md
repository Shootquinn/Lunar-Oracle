# Lunar Oracle Gameplan

Lunar Oracle is a question-answering system that runs inside Claude Code. Ask it a question about
lunar in-situ resource use or about the economics of industrial catch-up, and a team of specialist
agents answers it from one merged literature corpus, with the Lunar Scenario Explorer web app as the
authority on every quantity that app models. Every answer names the sources it resolved to and the
grade of trace it carries, and a question the evidence cannot support is refused rather than
answered.

This file is the plan for building it.

**Document(s) under work:** the Lunar Oracle repository itself. The merged corpus at `literature/`, `CLAUDE.md` (bootstrap, dependency clone, first-run sequence), this gameplan, and whatever further artifacts Step 0 specifies.
**Operational guide:** `cr-agents/method/operational_guide.md`
**Accumulator file:** `accumulator.md` (created at Step 0 open, from `cr-agents/templates/accumulator.md`)
**Other reference files:**
- `cr-agents/method/tdd_method.md`
- `cr-agents/prompt0.md`
- `lsei/index.html` (the app; the authority on the model)
- `lsei/lunar-scenario-explorer-map.md` (generated map of the app)
- `lsei/oracle/` (the prototype Oracle tooling, 13 `.js` files plus one JSON fixture)
- `lsei/report-generator-prompt.md` (the prototype document renderer)
- `lsei/literature/` (152 summaries, 8 topic folders; 152-file basis, post-dedup)
- `_intake/japanese-miracle/lit/` (119 summaries, 112 source PDFs, 3 treaty texts)

**Date:** 2026-08-26 (revised same day after author feedback)
**Current step:** 2 (open). **Wave 1 closed 2026-08-28** at `ef7cc20`, all seven seats. **Wave 2 is open and unspawned**; The Manager's roster and prompts are at `cr_scratch/step2_manager_w2_open.md`. The instrument freeze is **ratified by the author, 2026-08-28**.
**lit_review:** yes

---

## Executive abstract

**What this is.** Lunar Oracle answers questions about lunar ISRU and industrial-catch-up economics
from one merged literature corpus, with the Lunar Scenario Explorer app as the authority on every
quantity it models. Built by a Collaborative Reasoning team of specialist agents inside Claude Code.

**Where the project stands, 2026-08-28.**

| | |
|---|---|
| Step | **2 of 7**, open. Wave 1 of 3 closed; Wave 2 open and unspawned. |
| The corpus | **`literature/` holds zero files.** 176 names wait to merge, from two trees of 152 and 119. |
| Ready to move | **117 files** (Block 1 of `cr_scratch/merge_plan.tsv`, verified row by row). |
| Contested | **59 files**, of which 35 cannot be dispositioned from committed data yet. |
| True distinct sources | **168**, invariant to the dedup basis. DOI coverage 89 of 176. |
| Enforcement layer | 37 check rows, 153 amendment rows, 175 suite tests (**173 in contract**), counting rule v4, 111 governed quantities. |
| Hard failures | **15**, at read-digest `ac74373c4556b46c` over 101 files. **10 of the 15 are one fork.** |
| Pushed | Nothing. 40+ commits local by design; the author pushes when the work is done. |

**The problem the project keeps finding, in one sentence.** Container-versus-content: an artifact
that is internally consistent, passes its own checks, and is not the thing it claims to be. Nine
instances so far. Wave 1 produced the sharpest: **the check register agreed with its own `H` row,
passed its own known-answer test, and had never been executed. Its first run returned exit 1,
because `CHK-14` had been blocking every commit since sub-step 1.13.** Consistency was never
evidence of executability.

**The second-order version, named by The Manager at the Wave 1 close.** The enforcement layer has
never been run as a system, and the project has been *adding* to it instead of running it. Every
addition was individually a correct response to a real defect, which is exactly why nothing in the
process could see the aggregate: 37 check rows and 175 tests over an empty tree. Common cause, not
seven special causes.

**The remedy, ratified by the author 2026-08-28.** Wave 2 carries an **instrument freeze**: no seat
adds a net-new check row, amendment row, quantity id, test or contract clause unless it is required
for the merge to execute or discharges something already owed. Every deliverable ends with a
four-number apparatus ledger. The Manager applied it first to his own best proposal and declined it.

**Two standing mechanisms that came out of measured failures.**

- **The read-digest.** Every count carries the file set it was taken over. Today's failure series
  reads 12, 17, 15 over 88 to 101 files; every figure was correct and none was comparable. Disjoint
  write sets are not disjoint read sets.
- **The known-answer test.** Every register declares its own size in an `H` row, so any count can be
  checked against the artifact rather than against memory. Wave 1's `Q-LCC15` diagnosis turned on
  the absence of exactly this field.

**What Wave 2 does.** Six seats, eight spawns, disjoint write sets, a mid-wave staging gate where
nothing is promoted. Its close condition is the first in this project's history to be files in the
corpus: `literature/` holding the promoted tree, with `INDEX.tsv` and `FIELDS.tsv` present and zero
PDFs.

**Owed to the author, not to a wave.** Sub-step 2.9 (The Manager recommends the Denison and Chung
chapter route), sub-step 2.12 (Open Question 8 audits and reports, it does not act), A6's residual
(waits on 2.11's orphan list rather than an estimate), and The Fact-Checker's Part 8 escalation
(four files described as carrying transcribed abstracts measure 0.0% today with plain headings).

---

> **Compacted 2026-08-28 at the Wave 1 close**, 1,024 lines to about 700. Status cells were reduced
> to a verdict plus a pointer; nothing was deleted that does not survive in a `cr_scratch/`
> deliverable or in this file's git history. Steps 1 through 7 were drafted at Step 0 and approved
> by the author at its close gate.

---

## Design intent (from the author, 2026-08-26)

Recorded here because the team drafts the rest of this gameplan against it. This section is the
brief. It is not the team's to revise, only to build to.

**The thing being built.** Lunar Oracle is a grown-up version of the Oracle prototyped inside the
Lunar Scenario Explorer repository (`lsei/oracle/`). Grown up in a specific sense: the Japanese
Miracle literature review is the adult and the Scenario Explorer is the child. The two literature
corpora merge into one corpus that knows economics as deeply as it knows lunar trades. That merge
is the primary assignment. It is what turns big-brained mode on, and nothing else in this project
works without it.

**This folder is the new Japanese Miracle folder.** The lineage is direct rather than metaphorical.
The Japanese Miracle review's corpus moves here, PDFs included, and this repository becomes where
that work continues. What it does not become is a second copy of the Scenario Explorer app.

**How it runs.** In Claude Code, and only in Claude Code. That assumption is allowed to simplify
every design decision that follows from it.

**Dependencies, not copies.** The Scenario Explorer app is an authority and an important one. It
must not be re-committed into this repository every time it changes. It is a working copy on disk,
cloned and never pushed. CR-Agents is a working copy on the same terms. A person who clones Lunar
Oracle and opens Claude Code gets a `CLAUDE.md` that finds and clones both, then sets the folder up.

**The seed.** This gameplan file ships in the repository and becomes the law once the dependencies
are cloned. First conversation: `CLAUDE.md` bootstraps, this gameplan takes over, Step 0 runs, and
then a whimsical opening sequence plays. After that the user asks questions.

**Two registers, strictly separated.**

- *The orchestrator speaks as an oracle, in haiku, without linebreaks.* Its primary job is to run
  the CR-Agents team against the user's question. It answers with a haiku, then offers the
  deliverable. The deliverable is either a file or a text block in the chat.
- *The team does not do whimsy.* Deliverables are just the facts, ma'am. No epistemic theater, no
  performative rigor, no narration of the document's own honesty. This is `signs_of_ai_writing.md`
  Category 8 and it is a hard boundary, not a preference. The prohibition's scope is set by
  `cr_scratch/step0_editor_prohibition.md` §6: it governs team deliverables — the answer block, the
  answer file, the refusal — and exempts specifications, run logs, agent handoffs in `cr_scratch/`
  and the Oracle's own register, which have different readers and are allowed to reason about
  themselves. This gameplan is a specification, which is why the corrections recorded below are in
  it.

**What this project inherits and must not break.** The prototype's standing rules, which the
Scenario Explorer paid for repeatedly and which are load-bearing here:

- The app is the authority. A question the app can answer is answered from the app, never from a
  literature summary that happens to carry a number.
- Classification happens before retrieval, not after. Two sources are never searched and then
  reconciled.
- Trace discipline is graded and says which grade it is. A recomputed scalar is recompute-grade. A
  citation resolving to a real file is resolution-grade and is never dressed up as more.
- A missing input is a refusal, not a fallback.
- A reference a machine cannot follow is a copy, and a copy drifts.

---

## Objectives

1. **Integrate the two corpora into one.** The primary assignment. `lsei/literature/` (152
   summaries in 8 topic folders; 152-file basis, post-dedup) and `_intake/japanese-miracle/lit/`
   (119 summaries, 112 PDFs) become a single `literature/` in this repository, deduplicated, with
   provenance preserved, with the 95 overlapping sources resolved rather than doubled (95 is the `normalize()` overlap on the
   current 152-and-119 basis, re-measured at 2.1 and agreeing with the figure taken on the 158-file
   pre-dedup basis), and with a taxonomy that a retrieval mechanism can actually navigate. **The union
   is 176 names and 168 distinct sources**, both measured at 2.1 with their counting rules; “182
   sources” was a filename count and is superseded. This is what turns big-brained mode on.
2. **Stand up the repository** with a bootstrap architecture: CR-Agents and the Lunar Scenario
   Explorer are cloned at first run into working copies, never pushed, and the bootstrap is
   specified well enough that it works on a clean machine with nothing but Claude Code and git.
3. **Define the answering loop.** A user question enters, the CR-Agents team runs against the app
   plus the merged corpus, and a traced deliverable comes out. Decide what the prototype's
   `oracle/*.js` tooling contributes and what is rebuilt.
4. **Specify the register split:** the haiku orchestrator contract, the plain-prose team contract,
   and the mechanism that keeps the second from leaking into the first or the first into the second.
5. **Specify the first-run experience:** bootstrap, then the whimsical opening sequence, once.
6. **Produce a complete gameplan** (Steps 1 through N, context recipes, echo sites, TDD stages) that
   becomes the operating contract for the rest of the project.

---

## Document structure

Deferred. This project's first deliverables are a corpus and a running system rather than a
document. The team decides in Step 0 which later steps produce prose (`CLAUDE.md`, `README.md` and
the opening sequence at minimum) and records the required structure for those steps in the drafted
gameplan, per A.6.2.

---

## Steps

| # | Step | Assigned To | Status |
|---|------|-------------|--------|
| 0 | Draft, review, and land the operating gameplan. Sub-steps 0.1 through 0.8 below. | The Manager (bookends), Wave 1 (five), register wave (two), Wave 2 (two) | **Complete.** Closed at the author's gate 2026-08-26 |
| 1 | **Rulings, contracts, and the enforcement layer.** Nothing moves until these land. 15 sub-steps, 1.0 through 1.14. | The Systems Engineer, The Software Engineer, The Engineer, The Designer, The Fact-Checker, The Manager (both prompts) | **Complete and approved by the author at the gate, 2026-08-28.** Closed by The Manager 2026-08-27 after two refusals and a revision pass |
| 2 | **Corpus identity, taxonomy, and the merge.** Objective 1. **20 sub-steps, 2.1 to 2.20** — the ratified 18, plus 2.19 and 2.20 added by The Manager at the open and approved by the author the same day. | The Engineer (owner), The Space Resources Engineer, The Manager (economics prompt), The Systems Engineer, The Software Engineer, The Designer, The Fact-Checker | **In progress.** Opened 2026-08-28. Three waves (the six-cycle plan was superseded at the rewave). Wave 1 closed at `ef7cc20`; **Wave 2 Phase 1 running, six seats.** |
| 3 | **The app boundary and retrieval.** Objective 3. 10 sub-steps, 3.1 to 3.10. | The Space Resources Engineer, The Software Engineer, The Manager (economics prompt) | Not started |
| 4 | **Invariants, the transfer gate, and going corpus-live.** 8 sub-steps, 4.1 to 4.8. | The Software Engineer, The Manager (economics prompt), The Space Resources Engineer | Not started |
| 5 | **The register split, enforced.** Objective 4. 3 sub-steps, 5.1 to 5.3. | The Software Engineer | Not started |
| 6 | **Bootstrap, first run, and the public-facing prose.** Objectives 2 and 5. 15 sub-steps, 6.1 to 6.15. | The Systems Engineer, The Writer, The Editor | Not started |
| 7 | **Findings, standing tensions, and the sampling protocol.** 7 sub-steps, 7.1 to 7.7. | The Manager (economics prompt), The Software Engineer | Not started |

**The sub-step detail lives in `cr_scratch/step0_integration_draft.md`** and is not duplicated here.
That file carries the sub-steps with owners, dependencies expressed as `N.M (ORIGIN-ID)`, the
context recipes, the echo site registry, the three-column ID mapping back to the five Wave 1 source
documents, and the unresolved disagreements presented side by side. Duplicating it into this file
would create a second copy of a plan that is going to change, which is the failure this project keeps
naming. This table is the index; that file is the plan.

**Two closing notes on the structure, from the renumbering pass.**

*The count was 72 at the Step 0 close, and is 75 since the Step 1 open added 1.0, 1.12 and 1.13. Counting rule: rows in the sub-step tables of `cr_scratch/step0_integration_draft.md` section 2, Steps 1 through 7, excluding Step 0; measured 2026-08-26. What follows is the Step 0 reasoning that landed on 72.* `GATE-1` dissolved into Step 4's closing statement. It was the last row of
its grouping, nothing followed it, and all five of its assertions were statements about other
sub-steps' deliverables rather than work of its own. That is a boundary gate by definition, and
keeping the row would have put two gates at one boundary. Its assertion list survives verbatim as
what Step 4 delivers.

*`GATE-2` stayed, as sub-step 6.15.* It carries work nothing else carries: sub-step 2.12 says in its
own words "report to the author; do not act on the result," so clearing or marking every flagged file
is assigned nowhere else and would have been deleted along with the row. Public release is also an
irreversible external act rather than an approval to open the next step.

Every dependency was rewritten and validated: zero dangling references, zero forward references,
zero cycles, zero unrewritten IDs.

### Step 0 sub-steps

| # | Sub-step | Assigned To | Status |
|---|---|---|---|
| 0.1 | **Manager opens.** Confirm the drafting variant of Step 0 (A.6.4). Create `accumulator.md`. Fix wave membership. Write the Wave 1 spawn prompts. Name the capability gaps that justify a Recruiter run. | The Manager | **Complete.** `cr_scratch/step0_manager_open.md` |
| 0.1b | **Recruiter.** Persona specification for the gap 0.1 names. | The Recruiter | **Complete.** See below. |
| 0.2 | **Wave 1, parallel.** Five agents, each drafting the slice of the gameplan that falls in their domain. Deliverable specs below. | The Systems Engineer, The Software Engineer, The Engineer, The Space Resources Engineer, The Manager (economics prompt) | **Complete.** Five files in `cr_scratch/` |
| 0.3 | **Integration.** Orchestrator synthesizes Wave 1 output into a single draft gameplan: objectives, steps, context recipes, echo sites, TDD stages. Surface the disagreements rather than resolving them (A.9). | Orchestrator | **Complete.** `cr_scratch/step0_integration_draft.md`. Returned as 73 steps in 7 phases; renumbered under the author's ruling to **72 sub-steps in 7 steps** |
| 0.4 | **Register wave, sequential.** The Writer drafts the register specification (the haiku contract, the deliverable text-block format, the opening sequence). The Editor then audits it and, separately, writes the standing prohibition that keeps team deliverables free of theater. Order is Writer then Editor because the input is composed from scratch (A.3.3, default order). | The Writer, then The Editor | **Complete.** `cr_scratch/step0_writer_register_spec.md`, `cr_scratch/step0_editor_prohibition.md` |
| 0.5 | **Wave 2, sequential. Three, not two (Manager F4).** The Systems Engineer returns to rule on conceptual integrity, held to the position he stated at 0.2, now that an integrated draft exists to judge. The Designer reviews the gameplan as a designed artifact: does a cognizant outsider who clones this repository understand what it is and what happens next. The Fact-Checker verifies every factual claim this gameplan makes about what the repositories and corpora actually contain, against the trees on disk. | The Systems Engineer, then The Designer, then The Fact-Checker | **Complete.** `cr_scratch/step0_5_systems_engineer_integrity.md`, `cr_scratch/step0_5_designer_review.md`, `cr_scratch/step0_5_factchecker_verification.md` |
| 0.6 | **Revision.** Fix everything Wave 2 flagged. Unresolved review findings are not presented to the author (A.4 step 6). | Orchestrator | In progress |
| 0.7 | **Manager closes.** Evaluate the drafted gameplan against the scope contract: all six objectives covered; every open question answered or explicitly escalated; TDD stages scheduled as ordered steps rather than folded into an undifferentiated "build" step; and **every A.6.2 required section present, echo site registry included (Manager F5)**. Write the accumulator entries for every persona that ran. | The Manager | **Complete.** `cr_scratch/step0_manager_close.md`, committed |
| 0.8 | **Gate.** Present to the author: the drafted gameplan, the recruited persona specification, and the open questions below. Step 1 does not open until the author approves. | Orchestrator | **Complete.** Three rulings, recorded above |

### Wave 1 deliverable specifications (sub-step 0.2)

Collapsed at the Step 2 Wave 1 compaction. These specifications were written at 0.2 and have
been superseded by the sub-step tables above and by the artifacts themselves. Full text is in
the git history of this file and in `cr_scratch/step0_engineer_corpus_merge.md`,
`cr_scratch/step0_integration_draft.md` and `cr_scratch/step0_dedup_decisions.md`.

### Step 1 sub-steps

Fifteen sub-steps, 1.0 through 1.14. Counting rule: rows in this table, measured 2026-08-27 after the re-close; the eleven drafted at the Step 0 close, plus 1.0, 1.12 and 1.13 added at the Step 1 open to give register rows E17, E16 and E8 the addresses they lacked, plus 1.14 added by The Manager at the first close as revision item R-5. Deliverable paths are relative to `cr_scratch/`.

**Everything in this step is promoted, at 1.14.** `oracle/` holds twelve files, `literature/` holds `NAMING.md`, and `COUNTING_RULE.md` and `QUANTITIES.md` sit at the root. Before 1.14 these were marked blocks inside the files named in the Deliverable column, and a context recipe naming `oracle/bootstrap_contract.md` named a path with no file behind it. **`oracle/MANIFEST.tsv` is now the join** between a specified path and the file holding its text, and it is the authority on that mapping rather than this column: it holds 20 `D` rows over 18 distinct target paths, 17 of them `state:promoted` (counted 2026-08-27 at the Step 1 final close with `awk -F'	' '$1=="D"' oracle/MANIFEST.tsv`, and the file's own `H` row declares the same 20). A filter written from a remembered subset of those paths, and an extraction written from a guessed column, have each already produced one wrong verdict in this project.

**The promoted files are the authority. The `cr_scratch/` blocks behind them are copies**, several already marked `DIVERGED — DO NOT RE-LIFT` by their authors, and amendments are applied to the promoted file and recorded in `oracle/AMENDMENTS.tsv`.

**Read `cr_scratch/step1_orchestrator_verification.md` first.** It carries every load-bearing empirical claim this step made, re-run, with the command that produced each verdict — including four claims that did not survive and two errors by the orchestrator.

| # | Origin | Sub-step | Assigned To | Deliverable | Status |
|---|---|---|---|---|---|
| 1.0 | E17 | **Cold read of the operating contract.** 121-test audience-comprehension suite, run against the plan by a reader who had not executed it. Closed register row E17. | The Designer | `step1_0_designer_coldread.md` | **Complete.** 22 failures, 8 blocking, each with a fix |
| 1.1 | ARCH-1 | **The enforcement layer, corrected**, plus the map rows it lacked. Acceptance is a `git check-ignore` fixture list. | The Systems Engineer (propose), Orchestrator (apply) | `step1_1_systems_engineer_enforcement.md` | **Complete and applied**, with its acceptance test amended at the close. `.gitignore` is live. The acceptance criterion is 1.1's own 24-row `git check-ignore` fixture list, not the 18 ad-hoc probes the orchestrator ran; **that list failed, exit 1**, because row 14 asserted a rule the author's C4 ruling had deleted and the fixture was never swept. Row 14 now asserts the post-ruling state |
| 1.2 | ECON-12 | **The FA1-FA8 corpus contract.** No work: ruled by the author at the Step 0 gate. Two shelves, two retrieval contracts, two trace grades. | The author (ruled) | `— (Author rulings section above)` | **Complete.** Closed register row D1 |
| 1.3 | LOOP-1 | **The answer contract, frozen.** Six verdicts, three trace grades as a closed set, the deliverable-is-a-file rule, six run-log outcomes, and the shelf-naming requirement the FA ruling created. | The Software Engineer | `step1_3_software_engineer_answer_contract.md` | **Complete. Now at version 2**, amended at 1.8 |
| 1.4 | ARCH-2 | **The bootstrap contract**, as a specification. Seven phases, six degraded modes, the offline refusal, push-disable, `core.hooksPath`, `core.longpaths`, idempotence. | The Systems Engineer (write), The Software Engineer (review) | `step1_4_systems_engineer_bootstrap_contract.md, step1_4_software_engineer_testability_review.md` | **Complete, with 14 review findings, 4 blocking.** Amendments owed |
| 1.5 | ARCH-3 | **The single install state record.** One file, one schema, four consumers, three abnormal reads. The object of falsifier 2. | The Systems Engineer (write), The Software Engineer (review) | `step1_5_systems_engineer_install_state.md, step1_5_13_software_engineer_review.md` | **Complete.** No fifth fact. One blocking review finding |
| 1.6 | ARCH-4 | **The working-copy currency policy.** Record the ref, float the checkout, fetch explicitly, compare, report, automate nothing. Records the C4 ruling. | The Systems Engineer (write), The Engineer (review) | `step1_6_systems_engineer_currency_policy.md` | **Complete.** Closed D4, E6, E10, C4, and E11's ref half |
| 1.7 | MERGE-1 | **The naming and source-identifier rules**, both namespaces, and the path-length ceiling. Overturned register row E14 by measurement. | The Engineer | `step1_7_engineer_naming.md, step1_7_engineer_naming_addendum.md` | **Complete.** 176/176 names pass; one claim withdrawn by its author |
| 1.8 | LOOP-2 | **The contested-claims register schema and its single encoding.** One sidecar, one in-file block; the other two proposals killed. | The Software Engineer (lead), with three briefs | `step1_8_software_engineer_register_schema.md` | **Complete.** Encoding decided by measurement, not preference |
| 1.9 | LUNAR-2 | **Fifteen lunar register axes**, authored against current `lsei/literature/` paths, pre-merge. | The Space Resources Engineer | `step1_9_space_resources_engineer_register_rows.md, ..._addendum.md` | **Complete.** 15 axes, 81 members; strict re-run exit 0 |
| 1.10 | ECON-1 | **Seventeen economics register axes**, same pre-merge basis. | The Manager (economics prompt) | `step1_10_manager_economics_register.md` | **Correction in flight.** ECR-01's verdict contradicted by the Wave 2 gate |
| 1.11 | LOOP-3 | **The answering-loop test suite.** `tdd_method.md` Prompt 1 applied to a loop. Written before any loop code exists. | The Software Engineer | `step1_11_software_engineer_loop_suite.md, ..._v2.md` | **Complete.** 211 tests, 49 generated, 162 hand-authored |
| 1.12 | E16 | **The counting-rule contract.** A count enters the record with its counting rule or it is not quotable. Closed register row E16. | The Designer (author), The Software Engineer (review) | `step1_12_designer_counting_rule.md` | **Complete.** 16 hard failures live against it today, 10 in its own file |
| 1.13 | E8 | **The check register.** Every committed check: what it asserts, what invokes it, when it fires, what a failure does, its authority. Closed register row E8. | The Systems Engineer (write), The Software Engineer (review) | `step1_13_systems_engineer_check_register.md, step1_5_13_software_engineer_review.md` | **Complete.** 24 rows; one specifies a self-invoking loop, owed |
| 1.14 | R-5 | **ADDED at the Step 1 close by The Manager**, as the revision item that turns fifteen frozen specifications into files. Promote the marked blocks to their target paths; build `oracle/MANIFEST.tsv`, which joins a specified path to the file holding its text, and `oracle/AMENDMENTS.tsv`, which holds the amendments owed against frozen documents and computes their collisions; build `tools/quantities.js`. | The Engineer | `step1_14_engineer_promotion_and_registers.md` | **Complete.** `oracle/` and `literature/` exist; every lift verified byte-for-byte. The checker reproduces The Designer's hand measurement clause by clause |

### Step 2 sub-steps

Twenty sub-steps, 2.1 through 2.20. Counting rule: the eighteen ratified at the Step 0 close, whose
detail lives in `cr_scratch/step0_integration_draft.md` section 2 and is not duplicated here, plus
2.19 and 2.20 added by The Manager at the Step 2 open and approved by the author 2026-08-28.
Measured 2026-08-28 at the open.

**Read two files before touching this step.** `cr_scratch/step2_manager_w2_open.md` is the current
operating plan — the Wave 1 close, the three rulings, the instrument freeze, the disposition of all
44 routed items, and the Wave 2 roster with spawn prompts written out to be pasted. (The superseded
six-cycle plan is `step2_manager_open.md`; the three-wave replacement is `step2_manager_rewave.md`.) `cr_scratch/step2_orchestrator_baseline.md` is the
independent measurement taken before any agent ran, and it is the known-answer test for every count
this step emits. It exists because The Manager's Step 1 close found the dominant defect class to be
a seat running an operation with an instrument it wrote and never tested, so the baseline's author
is deliberately not the seat that produces Step 2's numbers.

**Two counting rules are live in this step and they do not agree.** Under raw filenames the union is
185 with 86 overlaps; under `normalize()` as `oracle/NAMING.md` section 1 defines it, the union
is 176 with 95 overlaps. Both are correct and the difference is exactly nine named files. **The
normalized figures are operative**, because `normalize()` is the merge key. A figure quoted without
saying which rule produced it is not quotable here.

| # | Added | Sub-step | Owner | Status |
|---|---|---|---|---|
| 2.1–2.18 | Step 0 | The ratified eighteen. Detail in `step0_integration_draft.md` §2. | The Engineer owns or co-owns twelve; the critical path is 2.1 → 2.2 → 2.4 → 2.5 | In progress |
| **2.19** | **Step 2 open** | **The arm-2 process changes.** Move spawn prompts and verdict sentences into the declared file set so `M15` covers them by construction; give `oracle/MANIFEST.tsv` an accessor so a hand-typed filter has nothing to be typed instead of; rename the `AM-` namespace so checks `AM-1`..`AM-5` and rows `AM-01`..`AM-135` stop sharing a prefix. | The Software Engineer (tool half), The Designer (contract half) | **Approved by the author 2026-08-28.** The Manager's Step 1 close named all three as Step 2 work with an owner; none of the eighteen carried them, and his own falsifier F1 presumes Step 2 does the first two — a falsifier whose antecedent nothing schedules cannot fire |
| **2.20** | **Step 2 open** | **Check-register reconciliation for the three new instruments.** `CHK-13` names `tools/check_no_sources.js` while 2.14 says `oracle/`; `oracle/verify_corpus.js` has no row at all and `oracle/**/*.js` is a declared scan root, so it fails `CL-1` the day it lands; and `CHK-01` and `CHK-04` fire on a `merge-gate` trigger that nothing installs, while `CHK-10` dispatches `pre-commit` only. 2.5 is the merge. | The Systems Engineer, in Cycle F after 2.17 exists | **Approved by the author 2026-08-28 on three defects; it carries four.** The fourth was routed by The Software Engineer at Cycle A: the corpus suite he built is itself wired to the `merge-gate` trigger nothing installs, and a runner placed under `oracle/` fails `CL-1` on landing. Found by measurement, not by reading — the register's own `H` row declares `27 13 12 2` and the parse agrees, so the known-answer test passes and all four defects sit inside a register that is internally consistent |

**The structure. Cycle A ran under the six-cycle plan; the remaining nineteen sub-steps run under a
three-wave plan that replaced it.**

**The author rejected the six-cycle shape after Cycle A closed**, on the grounds that it was split up
and pigeonholed, that a lot of the work plays off other work, and that a synergistic team-based wave
approach would deliver the rest while improving quality rather than trading quality for speed. The
Manager was asked to propose the replacement and told not to defend his own plan out of authorship.
**He conceded the point rather than defending it** — six cycles was three cycles of work and three
cycles of waiting — and found four defects in his own plan that the restructure fixes, the sharpest
being that the Fact-Checker's A.10 source gate was scheduled to fire *after* the suite it gates had
been the contract for the whole step. `cr_scratch/step2_manager_rewave.md` is the replacement.

**The evidence the author was right is Cycle A's own record.** Every high-value finding crossed a
sub-step boundary: The Designer measured a premise in his own brief and found it half wrong, which
is the taxonomy's and the merge's finding; The Engineer at 2.1 found the three re-import hazards,
which are 2.2's; the corpus suite produced findings owned by 2.13, 2.14 and 2.20; the taxonomy spawn
produced the retrieval layer's numbers, which are 3.7's. Four seats each found something belonging
to work they were not assigned. **The restructure makes that the mechanism rather than luck.**

**Where The Manager says the author is wrong, and it shapes the design.** The work plays off other
work in its *findings*, not in its *writes*. All five Cycle A crossings came from a seat **reading**
outside its lane; none required **writing** outside it. So the waves collapse the conversation and
leave the write lock intact.

| Wave | What the wave OWNS | Discharges |
|---|---|---|
| **W1** | **Merge day is safe.** Nothing touches `literature/` | 2.2, 2.3, 2.4, 2.9, 2.13, 2.14, 2.19(b), 2.20, and the Fact-Checker's A.10 source gate |
| **W2** | **The tree lands and is checked while re-running is still cheap** | 2.5, 2.6, 2.17-divergence, 2.18 |
| **W3** | **The corpus says what it is** | 2.7, 2.8, 2.10–2.12, 2.15–2.17 |
| review | The method's own Wave 2, which was always going to run | — |

The wave boundaries are the two points at which the corpus stops being cheap to undo. That is
arithmetic rather than preference, and it is why the count is three.

**Not collapsed, with the cost stated rather than hidden.** The merge stays single-writer, because it
rewrites a whole tree and its failure mode is silent. The `## Provenance` chain stays one seat.
Assertions still precede the operation they gate — the barrier goes, the ordering does not. And
**rewaving does not shorten The Engineer's serial path**; The Manager records that as unfixed and
says the one lever he has moves the *judgement* on 2.7 and 2.8 to other seats without moving the
*write*, which he calls partial rather than dressing it up.

**Two author rulings at the restructure, 2026-08-28.**

| Ruling | Decision |
|---|---|
| **The three assertion slots** | **Reassign all three.** Whoever writes an assertion is not the seat that runs the operation it gates, on 2.4, 2.10 and 2.14. The Manager named the arm-2b split at one slot at the Step 2 open; verified against the suite, it was needed at **three** — `SLOT-B` and `SLOT-C` carry no cross-check of any kind, `SLOT-A` has one only because `SLT-7` specifies it, and `SLOT-D` is the single clean case because 2.15 is The Software Engineer's while 2.16 is The Engineer's. The author took the full change over the narrower option, against owners he had himself ratified |
| **The W1 seam** | **The Manager's call at the wave open, not pre-committed.** In W1 the merge assertions are written while the dedup table they are parameterized on is still being filled, and The Manager offered detection rather than prevention there and said so. The author declined to rule either way on the ground that it depends on information nobody has yet — whether the table actually churns once 2.2 starts — and required the call to be made explicitly, recorded, and resting on the volatility measurement rather than defaulting by inattention |

**Five quality mechanisms the restructure adds**, none of which is a rule anyone must remember: the
slot reassignment above, which makes arm 2b structurally impossible on all four gated operations; a
required `## Not mine` section per deliverable, so a cross-boundary finding is an output rather than
luck, and an empty one is falsifiable where an omitted one is invisible; a required premise check,
which is what caught `M8` returning zero findings over 176 files against a premise the orchestrator
had pasted; **the read-digest** — every instrument stamps what it read, because `COUNTING_RULE.md`
§3 rule 11 requires a failure count to carry its command but not its moment; and three standing brief
clauses. The read-digest replaced the orchestrator's instinct to specify measurement windows, which
The Manager refused on his own standing ground that a rule someone must remember is not a process
fix.

**The tensions are preserved by one uniform guard**, because co-location could smother them by
consensus: paired seats never co-author a file, every wave brief names the pair's disagreement as a
required output, and falsifier `H3` fires if The Software Engineer and The Systems Engineer report
no disagreement in W1.

---

## Context recipes

| Sub-step | Agent | Files / Excerpts |
|---|---|---|
| 0.1 | The Manager | This gameplan (full). `cr-agents/method/operational_guide.md` A.3, A.4, A.6, A.12, A.13. `cr-agents/templates/accumulator.md`. |
| 0.1b | The Recruiter | Complete. |
| 0.2 | The Engineer | This gameplan (full). Directory listings and file counts for `lsei/literature/` and `_intake/japanese-miracle/lit/`. `lsei/oracle/lib/literature_search.js` (full). `lsei/README.md` licence section. At least three summaries from each corpus, including at least one of the 95 that appear in both, read side by side. |
| 0.2 | The Systems Engineer | This gameplan (full). `lsei/README.md`. `cr-agents/CLAUDE.md` and `cr-agents/README.md` as the bootstrap precedent. The repository tree listing (not its contents). |
| 0.2 | The Software Engineer | This gameplan (full). `lsei/oracle/answer_question.js` header comment plus its routing logic. `lsei/oracle/lib/literature_search.js` header comment. `lsei/report-generator-prompt.md`. `cr-agents/method/tdd_method.md` (full). `cr-agents/method/operational_guide.md` A.3.3, A.4, A.10. |
| 0.2 | The Space Resources Engineer | This gameplan (full). `lsei/lunar-scenario-explorer-map.md` (the totals, claims and exclusions tables; not the whole file). The `lsei/literature/` filename listing. |
| 0.2 | The Manager (economics prompt) | This gameplan (full). `cr_scratch/step0_recruiter_persona_spec.md` (his own spec). The `_intake/japanese-miracle/lit/` filename listing plus the 24 corpus-unique summaries named in Design notes, read in full. `lsei/literature/growth-and-industrial-theory/` filename listing. |
| 0.4 | The Writer | The design intent section (full). `cr-agents/supplements/writing-guides/style.md` and `structure.md` (both full). The integrated draft gameplan from 0.3. |
| 0.4 | The Editor | `cr-agents/supplements/signs_of_ai_writing.md` (full, mandatory). The Writer's register specification. The integrated draft gameplan from 0.3. |
| 0.5 | The Systems Engineer | His own 0.2 file, `cr_scratch/step0_systems_engineer_architecture.md` (full), so the falsifiers are read as he stated them. The full draft gameplan after 0.4. `cr_scratch/step0_integration_draft.md` (full). `cr_scratch/step0_writer_register_spec.md` and `cr_scratch/step0_editor_prohibition.md`, for falsifier 3. |
| 0.5 | The Designer | The full draft gameplan after 0.4. `lsei/README.md` as the register precedent for this project's public-facing prose. |
| 0.5 | The Fact-Checker | The full draft gameplan after 0.4. Both corpus trees on disk. `lsei/README.md` and `lunar-scenario-explorer-map.md`. The `cr-agents/` tree. |

---

## Progress log

Reverse-chronological: the newest row is first. Every row is dated 2026-08-26, so the order of the rows is the
only statement of which entry supersedes which.

| Step | Date | Notes |
| --- | --- | --- |
| Setup | 2026-08-26 | Repository initialized. CR-Agents (`f0c976b`) and LSEI (`f788ea2`, since advanced to `7f97983`) cloned as working copies and gitignored. `cr_scratch/` created. |
| Setup rev. 1 | 2026-08-26 | Author feedback. Working copies flattened from `deps/` to `cr-agents/` and `lsei/` at root. |
| Setup rev. 2 | 2026-08-26 | Author identified the Scenario Explorer's origin folder, `CSA_LSEI_Workshops` (4.1 GB), with instructions to survey it shallowly. Surveyed. |
| 0.1b | 2026-08-26 | The Recruiter closed. Recruited The Manager (economics prompt), anchored to Moses Abramovitz. Ruled against a second recruit. Pending author approval at the 0.8 gate. |
| 0.1 rev. 1 | 2026-08-26 | The Manager closed rev. 1 of the open. Five Wave 1 prompts rewritten for the new layout; A2 restated as a ruling rather than an assumption; |
| 0.2 | 2026-08-26 | Wave 1 closed, all five. The Engineer's merge audit corrected two orchestrator claims (PDF pairing rule, pull size) and answered Open Question 8 in the affirmative. |
| Dedup | 2026-08-26 | Author directed the duplicate-summary defect be fixed rather than scheduled. Six tokenization collisions found in `lsei/literature/` (Japanese Miracle corpus clean, zero). |
| Abstracts | 2026-08-26 | Open Question 8 re-measured with `tools/audit_abstract_overlap.js`: four files, not thirteen, and three of the four were already marked as quotation. |
| 0.3 | 2026-08-26 | Integration closed. Returned as 73 steps in 7 phases at `cr_scratch/step0_integration_draft.md`; renumbered the same day to 72 sub-steps in 7 steps (see the `0.3 renumber` row). |
| 0.3 renumber | 2026-08-26 | Author ruled the numbering: phases are steps, steps are sub-steps. Integration draft rewritten in place to Steps 1 to 7 with `N.M` sub-steps and an `Origin ID` column preserving traceability... |
| 0.4, 0.5 | 2026-08-26 | Register wave and Wave 2 closed. The Writer's register specification and The Editor's standing prohibition landed at 0.4. |
| Setup rev. 3 | 2026-08-26 | Author closed Open Questions 2, 6 and 7: public repository; FA1 through FA8 come over (19 files to `_intake/japanese-miracle/fa/`); both corpus copies stay until the merge lands. |
| 0.8 | 2026-08-26 | **Step 0 closed at the author's gate.** Three rulings: the recruited economics seat dissolved into The Manager under a separate economics prompt, |
| 1.0-1.14 | 2026-08-27 | **Step 1 executed. Fifteen sub-steps, five ordered groups, one cycle plus a revision pass.** Counting rule: rows in the Step 1 sub-step table, measured 2026-08-27 after the re-close; fourteen at the open plus 1.14, added by The Manager at the first close as revision item R-5. |
| 1 revision | 2026-08-27 | **The Manager refused to close, twice, and the refusals were correct.** The first refusal returned six revision items, because A.4's revision stage had not run and Wave 2 had returned three blocking defects inside frozen contracts, sixteen live counting-rule failures, |
| 1 close | 2026-08-27 | **Step 1 closed and sent to the author.** Unconditional, nothing deferred. The Manager revised his own common-cause ruling at the close: what he had called one arm is two, |
| 1 gate (errors) | 2026-08-27 | **The orchestrator's own relay errors this step: nine**, recorded because the counting-rule contract requires it and because The Manager's close rules them one common cause. Four of the nine produced a wrong verdict. **Arm 2b -- a seat running an operation with an instrument it wrote and never tested -- accounts for seven of the nine and every wrong verdict.** Instances in `cr_scratch/step1_orchestrator_verification.md`. A tenth landed at 2.1 and an eleventh at W1-4: the `FIELDS.tsv` cell that said the fix had landed for a file that does not exist. |
| 1 gate (findings) | 2026-08-27 | **Three findings that changed work rather than describing it.** `verify_report.js` was not missing: 328 lines of it are a fenced block inside `lsei/report-generator-prompt.md`, and the author ruled the dependency dropped anyway. |
| 1 gate (approved) | 2026-08-28 | **The author approved Step 1 and opened Step 2**, and ruled on the two sub-steps The Manager added at the open. **2.19 approved** — the three arm-2 process changes his Step 1 close named as Step 2 work with an owner, |
| 2 open | 2026-08-28 | **Step 2 opened. Twenty sub-steps, six cycles.** The Manager's open is `cr_scratch/step2_manager_open.md`, 887 lines: the TDD ruling, the wave structure with a declared write set per spawn, the Wave 1 spawn prompts written to be pasted, |
| 2 rewave | 2026-08-28 | **The author rejected the six-cycle structure and The Manager replaced it with three waves.** The ask was for a synergistic team-based wave approach that delivers the rest **while improving quality**, not trading quality for speed. |
| 2 baseline | 2026-08-28 | **The orchestrator measured both corpora before any agent ran**, so Step 2's counts have a known-answer test whose author is not the seat producing them — The Manager's own remedy from the Step 1 close, applied rather than described. `cr_scratch/step2_orchestrator_baseline.md`. |
| 2 Cycle A | 2026-08-28 | **Cycle A closed. Four spawns, four deliverables, every quantitative claim re-run by the orchestrator and zero refuted.** The corpus acceptance suite landed at `oracle/tests/corpus_suite.md` — 148 tests in twelve groups, declaring its own size and holding exactly 148, with four amendment slots declared **empty by id** so a slot that never fills is visible as a slot rather than an absence. |
| 2 W1 | 2026-08-28 | **Wave 1 closed: seven seats in parallel, `ef7cc20`.** Every quantitative claim re-run by the orchestrator; **nothing refuted**, two counts routed back. **The finding: the check register was internally consistent, passed its own known-answer test, and had never been executed. First run returned exit 1 -- `CHK-14` had blocked every commit since 1.13.** Second: four instruments walked this repository within one minute and reported 100/71/17/89 files; no two agree, none is wrong. **Delivered `cr_scratch/merge_plan.tsv`**, 176 rows x 17 columns, verified to the row: **Block 1 is 117 files ready to merge**, Block 2 is 59 contested, churn **8.47%** against a pre-registered 15%. E1 closed. The enforcement layer ran on a real commit for the first time and declared its debts rather than reporting green. `QUANTITIES.md` regenerated at the boundary: 111 blocks, **17 to 15 hard failures** at digest `ac74373c4556b46c` over 101 files, **10 of 15 being one fork**. Open: `MRG-4` is a genuine contract collision, not an error. **`literature/` holds zero files.** |
| 2 W2 open | 2026-08-28 | **The Manager closed Wave 1, ruled three times, and opened Wave 2. Accumulator entries written for all seven seats** (A.4 step 7, overdue since the wave). **He answered the author's question -- are we keeping our eye on the ball -- with No, not on this wave**, and diagnosed the cause as aggregate rather than anybody's: the enforcement layer has never been executed as a system and the project has been adding to it instead of running it. He would strike no individual addition. **Remedy: the instrument freeze, ratified by the author.** He applied it first to his own strongest proposal -- an assertion that every required deliverable exists, which would have caught `FIELDS.tsv` four sub-steps ago -- and declined to take it, on the ground that a freeze that spares its author's favourite item is decoration. **Rulings.** (1) `MRG-4`: the column splits into `byte_source` and `pair_primary` on the `CHK-13` precedent; neither seat was wrong and `pair_primary` reads `unadjudicated` on all 16 pair members because a merge gate cannot read a field that does not exist until 2.16. (2) The fork collapses at the wave open before any other write, executed by the seat that measured each half, predicted **15 to 5 to 2** with both survivors named in advance. (3) Standing clauses 8 and 9 rewritten; **the structural half he took himself -- arm 2a is discharged at the wave open or not at all**, so all eight Wave 2 prompts are written before any seat runs. **He corrected the orchestrator: 10 of the 15 failures are the fork, not 11** -- `Q-DEGRADED-MODES` is the `AM-132` theorem. Confirmed. **Wave 2 reshaped:** 2.17 and 2.18 out to Wave 3 (building half a tool a wave before its other half is the defect that justified collapsing six cycles into three); 2.7, 2.8, `FIELDS.tsv`, the suite runner and the merge-gate dispatcher in; The Designer deliberately not spawned. All 44 routed items carry a disposition with an owner and a wave. **An A.10 negative stands: `PRV-13` and `PRV-15` do not clear, so 173 of 175 tests are the contract**, and both repairs are Wave 2 close conditions. |
| 2 compact | 2026-08-28 | **This file compacted at the author's direction**, 1,024 lines to 720 and 148,363 bytes to 82,877. Register status cells reduced to a verdict plus a pointer into the `cr_scratch/` deliverable holding the evidence; the progress log reordered chronologically and its three rows all labelled `1 gate` disambiguated; design notes and open questions squeezed to one paragraph each, with the author's directory-map table kept verbatim because it is the push policy; the 0.2 deliverable specifications collapsed to a pointer. **Nothing was deleted that does not survive in a `cr_scratch/` deliverable or in this file's git history.** An executive abstract was added at the head. Two stale pointers fixed: the Step 2 read-first still named the superseded six-cycle plan, and the header still carried the Step 0 disclaimer saying this file holds nothing after Step 0. |
| 2 W2 | 2026-08-28 | **Wave 2 Phase 1 spawned, six seats concurrent**, prompts written to `cr_scratch/relay/spawn/` before any spawn (arm 2a). **The author ruled there is no intra-step gate** and that the step runs to completion, and delivered a standing critique of the project's proceduralism that is recorded above as a ruling in its own right; it was relayed into all six briefs ahead of clause 1. Seats: W2-1 the merge and the stage, W2-2 the suite runner and `MRG-4`, W2-3 the dispatcher and the repoint, W2-4 and W2-5 the two halves of the duplicate-id fork, W2-6 the currency patch table. |

## Design notes

**The Manager's rulings at open, 0.1.** Full text at `cr_scratch/step0_manager_open.md`.

The Manager ruled Step 0 a **nine** sub-step contract rather than eight: 0.1b is spawn-bearing and carries its own deliverable, so it counts. It also returned five findings against the seed as the author approved it. F2 through F5 are folded into the sub-step table and the Wave 1 briefs above.

The Manager also fixed five **standing drafting assumptions**, stated verbatim in every Wave 1 prompt, on the grounds that the real integration risk at 0.3 is five agents each guessing differently: the repository is public; the corpus summaries ship and the 112 PDFs do not;

**Two personas disagree about the second recruit, and the disagreement is on the record.** The Recruiter ruled corpus curation "a real problem, not a person-shaped gap" at 182 filename-distinct sources (158-file pre-dedup basis;

**The recruited persona, 0.1b.** The Recruiter returned **The Manager (economics prompt)**, anchored to Moses Abramovitz (1912-2000): NBER from 1938, economic adviser on the Allied Commission on Reparations in 1946, Stanford, AEA President 1980.

The selection argument is the part that matters: Abramovitz is the only candidate whose published apparatus is a *test of transferability* rather than a description of an episode. Jorgenson, Denison, Young and Gerschenkron were considered and rejected on the record.

**New productive tension (A.9), to be added to the roster if the author approves:** *The Growth Economist vs. The Space Resources Engineer.* Necessary conditions from opposite directions. The Space Resources Engineer asks whether anyone has built it and at what TRL.

**No second recruit.** The Recruiter ruled that corpus curation is a real problem but not a person-shaped gap at 182 filename-distinct sources (158-file pre-dedup basis), and assigned the artifact rather than the seat: a contested-claims register produced by the two domain personas,

**Verified inventory, 2026-08-26.** Counted from the trees on disk this session, and **re-verified by The Fact-Checker at 0.5**, whose corrections are applied here: the LSEI ref, the corpus size, the `oracle/` file count, and the standing of the generated map.

*CR-Agents*, `github.com/Shootquinn/CR-Agents`, main at `f0c976b`. Operational guide (750 lines), TDD method, prompt0, twelve standing personas plus The Recruiter, the writing guides, the docx toolkit.

*Lunar Scenario Explorer*, `github.com/Shootquinn/lsei-lunar-scenario-explorer`, main at `7f97983`, which is also what `origin/main` reads.

**The generated map is not current with the app, and the five app figures are correct anyway.** Two facts, and they have to be recorded together because the second is only true because the first was not trusted.

*Japanese Miracle corpus*, now at `_intake/japanese-miracle/lit/`: 119 summaries, 112 source PDFs, 3 treaty texts, 363 MB. Copied rather than moved, so the original folder at `onedrive/projects/CC/Japanese Miracle Lit Review` is intact and still holds that project's finished work.

**What is local-only, and what a fresh LSEI clone actually restores.** The dedup and the abstract rewrites are **not** local-only. `origin/main` reads `7f97983`, the same ref this working copy is on, so a fresh clone of LSEI gets 152 summaries, zero `-2` duplicate files,

- **The `gott-2024` abstract fix.** `gott-2024` is Japanese-Miracle-unique, so it has no LSEI copy; the rewrite lives only in `_intake/`, in a repository that has **no commits at all** (loose end E9). It exists on one disk. - **The `--push DISABLED` settings** on both working copies.

Two consequences for how figures are written down. The app figures and the CR-Agents figures are snapshots of working copies that float on `main`, so every one of them carries the ref it was measured against (`7f97983`, `f0c976b`) rather than a bare number.

**The merge is smaller than it looks, and the part that is new is the important part.** Comparing summary filenames after normalizing case and separators, on the 158-file pre-dedup basis: 95 sources appear in both corpora, 63 are unique to the Scenario Explorer,

``` acemoglu-2020-robots-and-jobs               kiyota-2005-foreign-technology-acquisition aoki-2009-government-tfp-growth             kiyota-2013-import-quota-removal beason-1996-targeting-japan                 may-1977-how-japans-economy-grew-so-fast-review beckley-2018-americas-role-japan-miracle...

Note what is in that list beyond growth accounting: the Toyota Production System, sociotechnical systems design from the Tavistock coal-getting study, and self-determination theory. The adult knows how work is organized, not only how output is measured.

**Where the Scenario Explorer's source PDFs live, and why the pairing is not by filename.** The author identified the origin folder for the Scenario Explorer work: `OneDrive/PROJECTS/CC/CSA_LSEI_Workshops`. It is 4.1 GB and holds a great deal that is not relevant to this project.

**This note was written by the orchestrator on a shallow survey and The Engineer corrected it at 0.2. The corrected version is what governs.** The orchestrator's original claim was that PDFs pair to their summaries by directory co-location, recovering 143 of 158 (pre-dedup) against 92 by filename.

*Co-location is not a rule a machine can follow.* `scenario_undercarriage_sources/` holds 46 PDFs against 44 summaries, which is 2,024 candidate pairings, and adjacency alone has no way to choose among them.

*The pull is smaller than the orchestrator reported.* Not 163 PDFs and 601 MB but **52 PDFs and 224 MB**, because `japanese miracle lunar economy lit/` (111 PDFs, 377 MB) **is** the origin of what is already at `_intake/`, verified by name with zero files in it we do not already hold.

*The quarantine warning was moot.* `_QUARANTINED_prior_art/` holds 26 `.md` files and **zero PDFs**, so a PDF-only pull cannot touch it and the prohibition enforces itself. It still should not be read into the corpus without establishing why it was quarantined.

**Numbering convention, ruled by the author 2026-08-26.** Integration returned its plan as seven "phases" containing 73 "steps." That is one level off from this method's numbering and it breaks the one-step gate, which fires after every step: 73 gates is not a cadence anybody can work at.

**The phases are the steps. The steps are the sub-steps.** The plan is Steps 1 through 7, each holding sub-steps numbered `N.M`, exactly as Step 0 itself ran with 0.1 through 0.8.

Each sub-step keeps its agent-origin tag (`ARCH-n`, `LOOP-n`, `MERGE-n`, `LUNAR-n`, `ECON-n`) in its own column. That tag is the only route back to the Wave 1 file that authored it, and those five files stay on disk and get read again.

Roughly 20 of the 75 sub-steps are not independent work but mandated TDD stages (test suite, outline, write, revise) split into ordered sub-steps rather than folded into one "build" row.

**The 72 is not yet ruled on for granularity.** Integration declined to prune, correctly, on the ground that dropping rows to hit a number belongs to the scope-holder.

**The corpus counts in this section were measured before deduplication and are now provisional.** Every overlap and union figure Wave 1 worked from was measured against a 158-file Scenario Explorer corpus.

**The 86 exact-name matches are not automatically identical files.** Nine more pairs match only after normalization (`GDP.md` against `gdp.md`, `ISNPS_Tech_Report_97.md` against `isnps-tech-report-97.md`, and so on).

**Directory map: what gets pushed and what does not.** This was the author's ruling at seed time and it is recorded here rather than at the front because it is a design note.

The `.gitignore` in this repository enforces this map. If the two ever disagree, this table is the statement of intent and the `.gitignore` is the bug.

| Path | Pushed | What it is |
|---|---|---|
| `CLAUDE.md` | yes | Bootstrap. Clones the working copies, sets the read sequence, runs the first-run sequence. |
| `lunar-oracle-gameplan.md` | yes | This file. The law once the dependencies are on disk. |
| `accumulator.md` | yes | Per-persona contribution history across spawns and sessions. |
| `.gitignore` | yes | This map, enforced. |
| `literature/` (`.md`) | **yes** | **The merged corpus.** This project's own summaries. The deliverable of the primary assignment. |
| `literature/**/*.pdf` | no | Source PDFs, on disk beside their summaries. Published papers this project does not own and cannot redistribute. |
| `literature/FIELDS.tsv` | **yes** | The machine-readable field label per corpus file, which the retrieval layer's field-scoped IDF reads. **Added at the Step 1 gate, 2026-08-27.** It was invisible to the enforcement layer for four sub-steps: `literature/` denies by default and re-admits `*.md` only, a rule written for a shelf of summaries, so every machine-readable file the corpus needs was silently excluded. The failure path is the dangerous one — the `.md` count passes, the shelf reports available, the bootstrap outcome is `CLEAN`, and retrieval then runs field-scoped IDF against no field map. |
| `literature/INDEX.tsv` | **yes** | The corpus index the merge produces. Same history and same reason as `FIELDS.tsv` above. |
| `oracle/REGISTER.tsv` | **yes** | The contested-claims register, ratified at 1.8. It sits under `oracle/` rather than `literature/` **because** of the rule above, which it escaped by moving rather than by being re-admitted. |
| `oracle/` | yes | Lunar Oracle's own tooling, once it exists. |
| `tools/` | yes | Checks that enforce this project's own rules. `check_corpus_collisions.js` fails if two summaries are indistinguishable to the retrieval layer. |
| `cr_scratch/` | yes | Agent handoffs. Committed on purpose (A.3.5): it preserves agent reasoning for audit. |
| `README.md` | yes | Written in a later step. |
| `cr-agents/` | no | Working copy of `github.com/Shootquinn/CR-Agents`. Cloned at bootstrap. |
| `lsei/` | no | Working copy of `github.com/Shootquinn/lsei-lunar-scenario-explorer`. Cloned at bootstrap. The app inside it is an authority, and an authority is never copied into a repository that would then have to keep it current. |
| `_intake/` | no | Staging. Material on its way into `literature/`. Empties as the merge lands. |
Two consequences worth stating plainly, because they are the reason the map looks like this.

*The PDFs stay and the PDFs never ship.* A person who clones Lunar Oracle gets the merged corpus and no PDFs. That corpus is **176 summaries by arithmetic on the 152-file basis and has never been measured**, because the merge has not run; the measurement lands at sub-step 2.1 (MERGE-2).

*The corpus is pushed and the app is not.* These look inconsistent and are not. The corpus is this project's own writing, static, and the thing being built.

**Provisional `CLAUDE.md`.** The `CLAUDE.md` currently in this repository is a session-recovery stub written at seed time. It is not the deliverable. The real one is drafted in a step the team defines at 0.2, and it is the file that carries the bootstrap contract and the first-run sequence.

---

## Author ruling, 2026-08-28 (mid-Step-2)

**There is no intra-step gate.** A step runs to completion without stopping at wave boundaries for
approval. The orchestrator does not hold at a wave close and ask; it closes the wave, opens the next,
and reports at the step close. This overturns the orchestrator's reading of A.4, which had treated
the wave boundary as a place to stop for the author's word.

**And the standing critique that came with it, in the author's words:** *"stop with the
committee-to-reinvent-the-wheel act. You guys are defining your own procedures more than you are
doing anything. Pretty soon you'll be writing your own constitution. Keep your eye on the prize, I
want my fucking oracle."*

This is the same diagnosis The Manager reached independently at the Wave 1 close, arrived at from
outside and stated harder. It converts the instrument freeze from a budget into a prohibition: an
apparatus allowance is a ceiling to undershoot, not a target to spend. It extends the freeze to prose
— a long memorandum about how the work would be done is apparatus too. And it names the deliverable
plainly, which is worth writing down because the project has repeatedly optimized the enforcement
layer over the thing enforced: **the prize is a corpus in `literature/` the Oracle can answer from,
and after that an Oracle that answers.** It was relayed verbatim in substance into all six Wave 2
Phase 1 briefs, ahead of clause 1.

---

## Author rulings at the Step 0 gate, 2026-08-26

Three decisions, all binding on the plan.

**1. The recruited seat is dissolved. The Manager does the economics, prompted separately.**
The Recruiter's candidate is not added to the roster. The economics work stays exactly as scoped and
is authored by The Manager under an economics-focused prompt, because The Manager is already anchored
to W. Edwards Deming: a statistician who spent the relevant years in the relevant country, who is
himself a source in this corpus (`deming-1967-japan-quality-control`), and who is named in the FA1
mechanism table as a causal channel in his own right (M3, the tacit-knowledge and management-method
transfer organized through JUSE from 1950).

The author dismissed the role-conflict question that came with this and the dismissal is the ruling:
spawn him once with a manager prompt and once with an economics prompt. No arbitration ceremony
between the two, no third persona brought in to close steps he authored. Two spawns, two prompts,
one persona, and the accumulator records both hats under one name.

The A.9 tension the recruited seat would have carried is retained on its merits: **The Manager
(economics prompt) against The Space Resources Engineer**, necessary conditions from opposite
directions. One asks whether anybody has built it and at what TRL, the other whether an economy
holding it would compound. It is not resolved and it is presented side by side.

The economics findings themselves stand unchanged, and they are the evidence this seat's work was
worth doing: the corpus reaches the most-quoted growth accounting only through two book reviews of
different periods; four decompositions of one episode yield four residuals because the residual is a
function of how many inputs were measured; Beason and the two Kiyotas are not independent
corroboration; and closure and terrestrial maturity are negatively coupled by selection rather than
separated by an engineering gap.

**2. Step 7 stays in the plan.** The Manager's recommendation, adopted. Its economics half is where
the corpus work gets written down as a first-class artifact while it is fresh, and its other half is
the human spot-check protocol, which is the only mechanism that catches an answer that is wrong in a
way no automated test can see. Deferring rows does not reduce schedule risk, it relocates it; the
lever is gate cadence and that is already seven.

**3. The FA deliverables get their own shelf.** Loose end D1 is closed. `literature/` holds
per-source summaries whose warrant is that every claim traces to one source. A second directory holds
the FA1 through FA8 deliverables, whose warrant is different: they adjudicate across sources and
carry arithmetic present in none of them, and FA2 says so in its own words, that its net-MPK
threshold is "the summarizer's calibration, not a number lifted from the papers."

Two shelves, two retrieval contracts, two trace grades. An answer may quote a paper as evidence and
may quote an FA deliverable as a prior conclusion of this project, and it must say which it did. The
failure this prevents is the Oracle returning one of the author's own past verdicts as though it were
a finding in a paper, which is undetectable once the two file types sit in one folder looking alike.

Retrieval reaches the second shelf rather than ignoring it, which is what makes the Johnson 1982
acquisition specification in `FA1-source-list.md` findable rather than something a person has to
remember exists.

---

## Loose ends register

**This section is the compaction-recovery artifact.** Everything below was found during Step 0. A
finding that lives only in a session's context is lost at the next compaction, which is why each one
is here with its evidence, its owner, its trigger, and the sub-step that closes it. Do not close a
row by agreeing with it. Close it by doing it, and record what was done.

**The register holds 44 rows in five lettered tables — A 8, B 7, C 5, D 7, E 17 — plus the three
falsifiers in F.** A row lost to a bad splice is detectable by counting.

**The `N.M` column** names the sub-step in `cr_scratch/step0_integration_draft.md` that closes the
row, under the author's numbering ruling. The retired Wave 1 tags are not addresses; §7 of that file
is the three-column mapping back to them. A dash means no sub-step closes the row, and the Status
cell says why.

**Status vocabulary.** OPEN; FIXED (done and verified); PENDING-PUSH (the fix belongs in an upstream
repository and has not landed there); DEFERRED (owner and step assigned); AUTHOR (needs a ruling);
POSITION TAKEN (an agent has ruled and nobody has ratified); PARTLY CLOSED (one trigger of two has
fired); ACCEPTED LIMIT (known, not fixable at this layer, documented where it bites).

### A. Defects in inherited artifacts

| # | N.M | Finding | Evidence | Status |
|---|---|---|---|---|
| A1 | 1.1 | `.gitignore` allowed non-`.md` files under `literature/`. Three UN treaty `.txt` files, and any `.docx` or `.PDF`, would have shipped. | `git check-ignore` over seven probe paths: `literature/x.pdf`, `x.PDF`, `x.txt`, | FIXED, verified both directions. 1.1 turns the seven probes into the standing fixture list. |
| A2 | 1.4 | Both working copies could push to their upstreams. "Never pushed" was enforced by nothing. | `git remote -v` shows `origin … DISABLED (push)` on both; | FIXED; the assertion is in `CLAUDE.md`. The `.git/config` half does not survive a re-clone. |
| A3 | 2.2 | Six tokenization collisions in `lsei/literature/`, same source twice in every case. | `tools/check_corpus_collisions.js`; DOI or NTRS match per pair (`csank-2022`: NTRS 2022000... | FIXED, corpus 158 to 152, pushed `f788ea2`. **Self-contradiction struck at 2.1**: the retrieval claim is **8 of 12, not universal**; on the eight, score and full-text fraction tie and directory-walk order decides. See `cr_scratch/step2_orchestrator_baseline.md` |
| A4 | 2.12 | Four summaries reproduced their source's printed abstract: `gott-2024` 79.8%, `schreiner-2016` 44.0%, `romer-1990` 38.4%, `turyshev-2026` 11.9%. | `tools/audit_abstract_overlap.js` over **103** PDF-paired summaries, median 0.0%; | FIXED. Four rewritten as original prose, markers removed, re-audit returns 0. |
| A5 | 6.13 | The LSEI README claimed "No third-party PDF, page image or extracted source text is in this repository." Not true of its own corpus. | The superseded string is the one quoted here, with the "or extracted source text" clause p... | FIXED, pushed `d7889e1`. |
| A6 | 2.12 | **57** Scenario-Explorer-unique summaries have no local PDF and were never tested for A4. | The Engineer, part 8 scope limit. | **OPEN.** Waits on 2.11's orphan list rather than an estimate. To the author. |
| A7 | 2.4 | `GDP.md` and `gdp.md` collide on a case-insensitive filesystem. A naive merge silently drops one file on Windows and not on Linux. | The Engineer. | **ANSWERED at 2.1. The population is NINE, not one.** `GDP.md` is the only case-only member and its pair is byte-identical, so a merge that loses one reports success. **The other eight differ by separator**, coexist on every filesystem, and no case rule catches them. 2.4 asserts normalized-key collision; landed as `CRP-4`/`CRP-5`/`CRP-7`. See `cr_scratch/step2_orchestrator_baseline.md` |
| A8 | — | **Two errors in `lsei/README.md`, found at 0.5 and fixed at the Step 1 open.** Line 12 says `literature/` is "all at one level with no subfolders"; | The Fact-Checker at 0.5, read against the tree: eight directories under `lsei/literature/`... | CLOSED 2026-08-26, pushed `lsei 7f97983`. Another repository's README; no sub-step owns it, hence the dash. |

### B. Defects the merge would create or expose

| # | N.M | Finding | Evidence | Status |
|---|---|---|---|---|
| B1 | Step 4 gate (2.16, 3.7, 3.8, 4.1, 4.2) | **The single most important finding of Step 0.** The merge converts an honest refusal into a confident one-sided answer. | The Engineer, run against a merged probe corpus rather than reasoned about. | OPEN. Owners: The Software Engineer, The Engineer. Step 4 closing state. |
| B2 | 3.7 | The 0.45 confirmation threshold was tuned on a **156-file** single-field corpus and has no standing at the merged size. | The Software Engineer; The Engineer part 7. Both halves re-read at source at 0.5: `literat... | DEFERRED. Owner: The Software Engineer. 3.6 builds the labelled question set the threshold is set against. |
| B3 | 2.3, 3.7 | The IDF table is pooled across two fields with different vocabulary distributions, so "policy", | The Software Engineer. | **SPECIFIED AND UNBUILT, and this cell said landed, which was the orchestrator's error, caught at W1-4.** `FIELDS.tsv` does not exist; owed at 2.5, the three-line retrieval change at 3.7. Pooled IDF's real damage is elsewhere: `moon` errs **2.13 nats**, against this row's worst of 0.97. **Eight folders carry `field: lunar`, not seven**, so a map built from the review split orphans 26 files. See `cr_scratch/step2_orchestrator_verification.md` |
| B4 | 2.1, 2.15 | **The cluster count is contested, and this is the one row where the contest is load-bearing.** A filename-overlap ranker returns whichever member of a... | The Space Resources Engineer (16); The Engineer (17); | **CLOSED at 2.1.** 16 and 17 are both correct and measure different quantities, groups against surplus files. Operative: **9 groups / 11 surplus**, strict rule, 176 basis. `sowers-2019` holds 4 members over 2 sources. See `cr_scratch/step2_orchestrator_baseline.md` |
| B5 | 2.1 | "182 sources" is a filename count. DOI deduplication finds 7 confirmed duplicate pairs plus 2 unconfirmable preprints; | The Engineer; the re-measurement by The Fact-Checker at 0.5. | **CLOSED at 2.1. True distinct sources: 168**, invariant to the dedup basis. **DOI coverage 89 of 176** under a stated definition, with seven candidates tabulated. The 182 figure and 79-of-182 are withdrawn; 91/85 was one definition and its complement. See `cr_scratch/step2_orchestrator_baseline.md` |
| B6 | 1.10 | **The exemplar contested pair is not contested.** `beason-1996-targeting-japan` and `henderson-2008-myth-of-miti` were quoted throughout Step 0 as the... | The Writer found it; orchestrator confirmed from both abstracts; | OPEN. A `false_pair` in the economics taxonomy, which already anticipates it. |
| B7 | 1.10 | **The corpus has no primary pro-targeting source, and that is a systematic bias rather than a gap.** Johnson 1982, *MITI and the Japanese Miracle*, | Orchestrator, from the corpus listings and three abstracts. | **OPEN, re-scoped.** The affirmative position is not absent from the corpus, it is **absent from Japan**; Wade reports Lane 2017 on Korea in his own voice. `ECR-01` three-sided; `ECR-18` minted. Acquisition target: **Johnson 1982**. |

### C. Defects in the prototype Oracle

| # | N.M | Finding | Evidence | Status |
|---|---|---|---|---|
| C1 | 3.2 | `app_model.js` extracts `model()` but not `valueModel()`. The app's entire economic half (`r_prop`, `margin_*`, `Dstar_prop`, | The Space Resources Engineer, verified by grep returning zero across `app_model.js` and `a... | **OPEN, confirmed live with evidence the row lacked.** `valueModel` lives in an island `app_model.js` never opens; the router returns `LITERATURE`/`ANSWERED`, so the Oracle answers from literature a question the app was believed to own. RED at R-3. Owner: The Space Resources Engineer. |
| C2 | 3.2 | `model()` returns 26 keys; `OUTPUT_LEXICON` names 8. `cap`, `Wpower`, `Wthr`, `mPwr`, `Rcap` and `regime` are unreachable, | Same. | OPEN |
| C3 | 2.18 | `answer_question.js` `DEFAULT_LIT` resolves to `lsei/literature/`, not the merged corpus. | The Systems Engineer. | OPEN. Owner: The Systems Engineer; 2.18 carries the `--lit` requirement. |
| C4 | 1.6 | **This row has now been wrong twice, and the second correction reverses the first.** `verify_report.js` is named as an unlisted dependency of three of... | The Software Engineer, disagreement (d), for the dependency. | **RULED by the author 2026-08-26: drop the dependency.** Being able to acquire something is not a reason to depend on it. **Open onward:** the three mechanisms need a replacement post-condition and no sub-step owns that work. |
| C5 | 3.4 | EXCLUDED-BUT-ADJACENT has no mechanism. `propellant-mass-leverage` is excluded while `net-value-identity` is modeled, | The Space Resources Engineer; the forcing case re-verified at 0.5 against the app's own ex... | DEFERRED. Owner: The Space Resources Engineer, 3.4. |

### D. Structural decisions still owed

| # | N.M | Question or finding | Position(s) taken, or evidence | Status |
|---|---|---|---|---|
| D1 | 1.2 | Are the FA1-FA8 deliverables the same kind of object as a summary? | The Manager (economics prompt): **no.** A summary's warrant is that every claim resolves t... | CLOSED by the author 2026-08-26. Separate shelf: two directories, two retrieval contracts. |
| D2 | 1.8, 3.8 | Is the contested-claims register consulted at classification time or after retrieval? | The Software Engineer: **at classification time**, as a third retrieval mode, | POSITION TAKEN, reviewed at 0.5 and upheld. |
| D3 | 3.1 | Does the app remain sole computational authority? | Three personas, three compatible positions, no conflict. | **AUTHOR** ruling wanted, Open Question 5. 3.1 audits the boundary first. |
| D4 | 1.6 | Pinned or floating working copies? | The Systems Engineer: **neither as stated.** Record the ref, float the checkout, | **AUTHOR** ruling wanted, Open Question 3. 1.6 is the policy. |
| D5 | 0.5 | Does the project need a second recruited persona for corpus curation? | The Recruiter: gap dissolved, assign the artifact not the seat. | **NARROWED, NOT CLOSED.** Corrected figure: **87 of 95 byte-identical, 8 differing**, not 89. Byte-identity is a proxy for agreement and differing is not a proxy for disagreement, so the trigger narrows to those eight and stays armed until 2.2 reads them. Neither persona has been shown wrong. |
| D6 | 1.1 | Where do pulled PDFs land? | The Engineer recommends `literature/_pdf/<taxonomy>/` rather than interleaved with summari... | **AUTHOR**, small. 1.1 adds the map row. |
| D7 | 2.2 | The two adjudicated duplicate pairs are a deferred merge, not a resolved tie. | Recorded in `cr_scratch/step0_dedup_decisions.md`. | **CONFIRMED at 2.1, three pairs rather than two.** `azami-2024`, `csank-2022`, `poston-2020` are byte-identical to files the merge re-imports. **`poston-2020` is the pair Step 0 used to refuse size-based selection**, so a size tie-break reverses a recorded decision in the direction the record rejected. **Disarmed at W1 with sha256, not size**; each row carries SIZE MUST NOT BREAK THIS TIE. See `cr_scratch/step2_orchestrator_verification.md` |

### E. Process and mechanism

| # | N.M | Finding | Evidence | Status |
|---|---|---|---|---|
| E1 | 1.4, 2.14 | **A git pre-commit hook is not a mechanism**, because hooks are not cloned. Any check must be a committed script that the bootstrap wires via `core.ho... | The Systems Engineer at 0.2 and 0.5. | **CLOSED at W1 (2.14).** Was live at 2.1: `x.pdf`, `docs/`, `oracle/`, `tools/`, `cr_scratch/` all committed cleanly. All five ignored now, eight carrier extensions covered. **Residual: `xls`, `xlsx`, `zip` are open while `doc`/`docx`/`ppt`/`pptx` are covered**, and `xlsx` and `docx` are the same container format. The 500 KB gate is a backstop, not a gate: populations overlap at 81,677 against 84,767 and it prints its own blindness. See `cr_scratch/step2_orchestrator_verification.md` |
| E2 | — | Step-ID collision. The Software Engineer numbered his steps SE-1 to SE-11 and The Systems Engineer numbered his SE-1 to SE-9. | The three-column mapping table at §7 of the integration draft; | FIXED at 0.3, then renumbered to `N.M` sub-steps. |
| E3 | 1.5, 6.6 | Nothing owns machine-generated state. The first-run flag's default is to be committed, | The Systems Engineer. His rationale, which belongs beside the rule rather than inside it:... | POSITION TAKEN. 1.5 defines the record, 6.6 reads it. |
| E4 | 1.1 before 2.5 | **The enforcement-layer fix must land before the merge executes.** The merge moves files into `literature/`; | The Systems Engineer; carried into the integration draft's ordering constraints at 0.3. | FIXED as an ordering constraint: 1.1 in Step 1, 2.5 in Step 2. |
| E5 | 3.7 | `tools/check_corpus_collisions.js` mirrors the upstream tokenizer. If that tokenizer changes upstream, the check goes stale silently. | Documented in the file, in the comment block above `STOPWORDS`; verified at 0.5. | ACCEPTED LIMIT, but see E13, which turns the risk into a certainty on a date already in this plan. |
| E6 | 1.6 | **Nothing fetches.** The word `fetch` does not occur anywhere in the integrated plan. | The Systems Engineer at 0.5. Bootstrap stub in `CLAUDE.md` **FIXED**; | CLOSED at 1.6. The plan-level fix is a precondition rather than another command. |
| E7 | 1.4, 6.1 | **`CLAUDE.md` disabled push only on the acquire path.** The two `set-url` lines sat inside the "if either is missing, clone it" block, | `CLAUDE.md` now splits Acquire from Verify; the push assertion and the fetch run every ses... | FIXED. 1.4 states it, 6.1 asserts it against an already-present working copy. |
| E8 | 1.13 | **Nothing invokes the checks.** `tools/` appeared nowhere in the 72 sub-steps as drafted. | The Systems Engineer at 0.5; 2.14's `core.hooksPath` installation covers `oracle/check_no_... | **CLOSED at 1.13, and reopened in fact at W1, which is the finding of that wave.** The register was internally consistent, its `H` row agreed with its parse, it passed its own known-answer test, **and it had never been executed.** First run returned exit 1: `CHK-14` had been blocking every commit since 1.13. **Consistency was never evidence of executability.** Now 37 rows with the dispatcher live: 3 of 7 pre-commit rows dispatched, 4 named as debts rather than passes. See `cr_scratch/step2_orchestrator_verification.md` |
| E9 | — | **"Committed" is aspirational throughout this register.** This repository has zero commits. | The Systems Engineer at 0.5; `git log` reports no commits on `main`. | CLOSED at 1.13. Expired by fact: this repository has commits. |
| E10 | 1.6 | **The drift report cannot tell "the authority moved" from "we moved the authority."** This project has pushed **three** commits to the Scenario Explor... | The Systems Engineer at 0.5. | CLOSED at 1.6. The discriminator needs an **equality guard**: `merge-base --is-ancestor` is reflexive, so the unguarded form reports the push-disable defeated on every normal session. |
| E11 | 2.17, 2.18 | **Upstream withdrawal has no verdict.** The plan handles an upstream that gains content. | The Systems Engineer at 0.5. | RULED at 1.6, split along the layer boundary. The ref half closes; **the content half is unownable at this layer** and goes to 2.18 with the measurement attached. |
| E12 | 1.5 | **The verified-against ref is content, and the plan files it as ignored per-install state.** That violates the Systems Engineer's own rule from 0.2. | The Systems Engineer at 0.5, against his own 0.2 text. | CLOSED at 1.5, and the correction went inward: it applies to the corpus provenance digest as well as the ref record. A corrupt state file can make an adjective wrong, never hide a divergence. |
| E13 | 3.7 | **E5 goes stale from our own side.** `check_corpus_collisions.js` mirrors the upstream tokenizer, and sub-step 3.7 rebuilds that tokenizer. | The Systems Engineer at 0.5. | OPEN. 3.7 gains the re-point as a post-condition. |
| E14 | 1.4, 1.7, 2.3 | **The diagnosis in this row was wrong and correcting it changes the fix.** The row said Windows long paths break a fresh clone and cited `literature/p... | Original claim observed on a fresh clone during Step 0, conditions unrecorded. | OPEN, and reopened wider than it was. |
| E15 | 1.4, 6.6 | **The first-run sequence plays against an enumerated list, not against "fully succeeded."** Ruled at 0.5: the sequence plays when every load-bearing p... | The Systems Engineer at 0.5, adopting The Writer's reading with one change: the blocking s... | Half closed at 1.4. Corrected twice: **five blocking modes, not six.** The consuming half is still owed; 6.7 asserts a sequence the degraded modes contradict. |
| E16 | 1.12 | **This project generates counts faster than it records their counting rules.** Three of the Fact-Checker's six UNSUPPORTED findings are numbers stated... | The Manager at 0.7, from the Fact-Checker's UNSUPPORTED class. | CLOSED at 1.12. Twelve required fields, six of which may read `none`, **because an omitted field is invisible while none is falsifiable.** Diagnosis went past the row: the numerals had no referent, hence a mandatory name at every quotation. |
| E17 | 1.0 | **The gameplan becomes a cold session's operating contract when Step 1 opens, | The Manager at 0.7, against his own ruling. | CLOSED at 1.0. A 121-test audience-comprehension suite run cold against the operating contract. |

### F. Conceptual integrity falsifiers

The Systems Engineer stated his 0.2 position and three falsifiers he agreed to be held to at 0.5.
They are recorded here in the words he wrote them in, before the plan they judge existed.

1. **Seam.** If retrieval and app-query end up as separate steps with no owner for the mechanism that
   decides between them, he rules against himself.
2. **State.** If integration produces three separate mechanisms for the ref record, the drift record
   and the first-run flag rather than one, that is the committee outcome and the cheapest evidence
   for the trenchcoat. **He expected this one to fail.**
3. **Register.** If the register wave returns whimsy as decoration rather than as the same provenance
   rule the rest of the system runs on, then Objective 4 is a fourth project.

**Ruled at 0.5, against the integrated plan.**

*Seam: does not fire.* The mechanism has a step and an owner, sub-step 3.8, one classifier with four
modes, and the words "never two modes for one sub-claim; never a second retrieval to repair a first"
are in the sub-step itself. Its routing table ships as data rather than prose. He notes that The
Software Engineer independently refused the post-retrieval exception on the Systems Engineer's
grounds rather than his own.

*State: fired, and was caught.* He verified by exhaustion rather than accepting integration's report:
the install-state tokens occur at seven places in the plan and every one outside sub-step 1.5 is a
read. The drift half genuinely duplicated, and the consolidation is present in the plan rather than
only in the summary. His own words on why this counts in favour rather than against: the prediction
was correct and the catch was structural.

*Register: does not fire, and it is the strongest of the three.* The Writer derives the haiku
prohibitions from provenance rather than taste, and refuses to put a number in the opening sequence
on the grounds of a loose end in this register. The Editor is the same rule pointed at the plain
register. Both land on the same class of mechanism at sub-step 5.1.

**Verdict: one project.** He holds the 0.2 position and reports the ground under it improved. The
plan cannot be cut along merge, bootstrap and loop lines without severing four named sub-steps. What
he explicitly declines to certify: 72 sub-steps, as the plan then stood, is a schedule risk, and he judges it not to be an
integrity defect.

---

## Open questions

Answers are wanted at the 0.8 gate. None of them block Step 0 from running. Each changes what Steps 1 through N look like, so the team drafts against a stated assumption and says which assumption it used.

1. ~~**How does the Japanese Miracle corpus reach a clean clone?**~~ **Closed by the author, 2026-08-26.** The corpus comes here. Summaries are pushed as this repository's own work; the 112 source PDFs stay on the author's disk and are never pushed. See the directory map. 2.

Floating on main means the app is always current and an upstream change can break the Oracle silently. Pinning means a commit to bump, which is the re-committing the author asked to avoid, though it is one line rather than a 900 KB file. The Systems Engineer argues both sides at 0.2. 4.

Running the full roster in three waves for every user question is the method applied literally. (The "nine personas" quoted at 0.2 has no authority anywhere: the CR-Agents roster is twelve standing personas plus The Recruiter, and The Growth Economist makes fourteen.

The prototype's rule is that a question the app can answer is answered from the app. The merged corpus contains economics the app does not model at all. The boundary needs restating for the grown-up version. A Systems Engineer question with The Manager (economics prompt)'s input. 6.

**What is true:** four summaries reproduce verbatim text from their source's printed abstract. Four is the corrected count, and loose end A4 carries the single account of how an earlier count of thirteen was arrived at; it is not restated here.

**The convention is established and already public**, in a repository that has shipped under the Unlicense. How many summaries use it is not settled: the figure given at 0.2 was thirty-nine of the 152, and a grep at 0.5 for the four marker forms this entry itself names — "as printed",

**What survives, and it is small.** The Scenario Explorer README's licence section ended "No third-party PDF, page image or extracted source text is in this repository," and that sentence was not accurate about its own corpus.

**Original wording, 1 of 2. The Engineer's report at 0.2, superseded by the correction above and retained as the record of the error.**

> The Engineer ran `pdftotext` plus 10-gram shingle overlap across all 108 testable PDF-paired > abstracts, using the 9 self-declared transcriptions as a control. The control fired correctly > (Prettyman 100%, Levin 95.6%, McLeod 74%).

(The 108 in that paragraph is a second denominator for the same audit; the tool re-run at 0.5 tests 103. Which population the 108 counted is unreconciled — see loose end A4.)

**The Systems Engineer's earlier partial finding, which stands.** He found three files carrying full third-party source text from the directory listing alone, before anybody opened a summary: `un-1967-outer-space-treaty.txt`,

**Original wording, 2 of 2. The question as first posed, retained as the record.**

> Raised by The Manager, and it is the one question that could stop a public release. The > Scenario Explorer's licence is explicit that a public-domain dedication covers this project's > own summaries and cannot cover the sources those summaries describe.
