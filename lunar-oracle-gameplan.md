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
**Current step:** 1
**lit_review:** yes

> **This gameplan is deliberately incomplete.** It carries Step 0 and nothing after it. Steps 1
> through N are the deliverable of Step 0, drafted by the team and approved by the author at the
> Step 0 close gate (A.4 step 8, A.6.4). Do not invent Step 1 before Step 0 closes.

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
   provenance preserved, with the 95 overlapping sources resolved rather than doubled (95 measured
   on the 158-file pre-dedup basis and unchanged by the six deletions), and with a taxonomy that a
   retrieval mechanism can actually navigate. This is what turns big-brained mode on.
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
| 1 | **Rulings, contracts, and the enforcement layer.** Nothing moves until these land. 14 sub-steps, 1.0 through 1.13. | The Systems Engineer, The Software Engineer, The Engineer, The Designer, The Manager (economics prompt) | In progress |
| 2 | **Corpus identity, taxonomy, and the merge.** Objective 1. 18 sub-steps, 2.1 to 2.18. | The Engineer (owner), The Space Resources Engineer, The Manager (economics prompt), The Systems Engineer | Not started |
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

Each agent writes to `cr_scratch/step0_{persona}_{purpose}.md` and returns a verdict of under 50
lines to the orchestrator (A.3.5). Each drafts *gameplan steps*, not implementations: numbered,
ordered, specific enough to execute without clarification, with the persona assignments named.

**The Engineer, the corpus merge. This is the primary assignment and it is his to specify.**
Empirical, and he runs the counts himself rather than trusting the inventory in the design notes
below. The merge layout: the taxonomy (the Scenario Explorer's 8 topic folders are a candidate but
they have no home for Japanese economic history or organizational theory), where provenance is
recorded, and whether the merge is a build step that re-runs or a one-time landing. How a source
present in both corpora is resolved when the two summaries disagree, which is a real risk given
that they were written at different times by different passes of the same method. What happens to
the PDFs: they land on disk beside their summaries and never push, per the directory map, and he
specifies the mechanism that keeps a stray PDF from being committed. **The Scenario Explorer's own
source PDFs are recoverable and the pull is his to specify:** they are at
`OneDrive/PROJECTS/CC/CSA_LSEI_Workshops/context/reference/lit/`, and they pair to their summaries
by directory adjacency rather than by filename, which recovers 143 of 158 (pre-dedup) against 92 by name match.
See the design note below. He writes the adjacency rule as a step someone else could execute, and
he stays out of `_QUARANTINED_prior_art/`. What breaks in
`lsei/oracle/lib/literature_search.js` when the corpus grows past 180 files and a meaningful share
of the new filenames are Japanese economic history rather than author-year lunar papers. And the
question that decides whether this is a step or a project: does the merge need a summary rewrite
pass to bring both corpora into one house format, or do the two formats already agree?

**The Systems Engineer, repository and bootstrap architecture.** The bootstrap contract: what
`CLAUDE.md` does on a clean clone, in what order, and what it does when a working copy is missing,
offline, or has moved on. Whether the working copies are pinned to a commit or float on main, and
what the tradeoff costs in each direction. How the app stays the authority without being pushed,
and what "the app" means when the local clone is a week stale. The directory map above is the
author's ruling on what ships; his job is to find where it breaks, particularly the case where
`lsei/literature/` gains a source after our merge has landed and the two corpora silently diverge.
**First-run state is his (Manager F3):** "the opening sequence plays once" is a state question
before it is a copy question, and nobody owned it. Where does the flag live, what happens when it is
absent, and what does a second clone on a second machine do. **He states his conceptual-integrity
position at 0.2 and is held to it at 0.5 (Manager F4):** whether this repository is one thing or
three projects wearing a trenchcoat cannot honestly be judged before the integrated draft exists,
so the judgment moves to Wave 2 and only the position is taken here.

**The Software Engineer, the answering loop and the TDD front end.** The loop from question to
delivered answer, expressed as gameplan steps. What the prototype's `oracle/*.js` (the router, the
five verdicts, the address resolver, the manifest and figure verifiers, the literature search)
contributes, what it costs to extend, and what should be rebuilt rather than extended. Where the
CR-Agents team fits inside a loop that must return an answer in a conversation rather than over a
multi-day session; a full-roster wave per question is not obviously the right shape and the
alternative is his to name. (The "nine personas" quoted at 0.2 and in Open Question 4 has no
authority anywhere: the CR-Agents roster is twelve standing personas plus The Recruiter, and the
author's ruling at the gate added no fourteenth: the economics work is The Manager under a second
prompt, so the roster is unchanged. Nine is neither the roster nor a defined wave size, and whether
there is a default wave size at all is part of what he is being asked.) Then the TDD front end: what an acceptance suite for a Lunar Oracle
*answer* asserts, per `tdd_method.md`, and which gameplan step builds it. The `lit_review: yes` flag
is set, so tests asserting quantitative or technical facts must name the primary source they
validate against. **One invariant is assigned to him by The Recruiter's finding:** a claim on the
contested-claims register cannot be answered from one side of the pair. The suite returns both or
refuses. **And Objective 4's enforcement is his (Manager F2):** The Writer and The Editor can say
what the register prohibition says, but neither can say where it is enforced. A rule that lives
only in a prompt is a preference. He specifies the mechanism that makes the haiku boundary and the
no-theater boundary testable.

**The Space Resources Engineer, the lunar question surface.** What classes of question a lunar
Oracle must answer, drawn from what the app models and what the Scenario Explorer corpus covers.
**Say explicitly which classes the app already answers (Manager F1 addendum):** that boundary is
what Open Question 5 turns on, and it cannot be drawn by someone who has not read the app's claim
structure. Where the corpus is thin and an answer would be a guess wearing a citation. Which of the
app's 10 excluded nodes are the ones users will ask about first. How TRL and evidence-gate
discipline enter an answer that a user reads in a chat window rather than in a reviewed document.
Plus the lunar-side **contested-claims register**, the counterpart to the economist's.

**The Manager (economics prompt), the economics question surface.** The counterpart deliverable. What the
Japanese Miracle corpus makes answerable that the Scenario Explorer corpus alone does not: growth
accounting, capital deepening, technology absorption, industrial policy and its debunkings, quality
and process control, the developmental state literature and its critics. How an economics question
binds to a lunar question, and where the transfer is legitimate rather than analogy. What a
grown-up answer contains that the prototype's answer does not. Plus the **contested-claims
register** for the economics side: the pairs this corpus deliberately carries on both sides
(Miwa against the received keiretsu account, Wade against the myth-of-MITI literature, Otsu
against the developmental-state reading; **not** Beason against Henderson, see loose end B6), which is the mechanism that stops the
Oracle from returning a confident one-sided answer that passes every other check in the plan.

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
|---|---|---|
| 0.4, 0.5 | 2026-08-26 | Register wave and Wave 2 closed. The Writer's register specification and The Editor's standing prohibition landed at 0.4. All three Wave 2 reviewers returned: The Systems Engineer ruled the three falsifiers (one fired, caught at 0.3) and added five plan defects; The Designer returned the echo-site catalogue and the structural damage list; The Fact-Checker returned 29 supported, 6 unsupported and 11 contradicted claims. Applied at 0.6. |
| Setup rev. 3 | 2026-08-26 | Author closed Open Questions 2, 6 and 7: public repository; FA1 through FA8 come over (19 files to `_intake/japanese-miracle/fa/`); both corpus copies stay until the merge lands. Three live defects found by The Systems Engineer at 0.2 fixed immediately rather than scheduled, being safety rather than project work: `.gitignore` inverted to deny-by-default under `literature/` and verified against seven cases including `.txt`, `.PDF` and `.docx`; push URLs disabled on both working copies; `CLAUDE.md` path split from `deps/` repaired. |
| 0.8 | 2026-08-26 | **Step 0 closed at the author's gate.** Three rulings: the recruited economics seat dissolved into The Manager under a separate economics prompt, with the role-conflict question dismissed and two spawns being the whole mechanism; Step 7 kept; the FA deliverables given their own shelf, closing D1 and unblocking the merge taxonomy at 2.1. |
| 0.3 renumber | 2026-08-26 | Author ruled the numbering: phases are steps, steps are sub-steps. Integration draft rewritten in place to Steps 1 to 7 with `N.M` sub-steps and an `Origin ID` column preserving traceability to the five Wave 1 files. Count 73 to 72: `GATE-1` dissolved into Step 4's closing statement as a boundary gate carrying no work of its own; `GATE-2` kept as 6.15 because it carries the clearing work that sub-step 2.12 explicitly declines to do. Dependency validator: zero dangling, zero forward, zero cycles, zero unrewritten IDs. |
| 0.3 | 2026-08-26 | Integration closed. Returned as 73 steps in 7 phases at `cr_scratch/step0_integration_draft.md`; renumbered the same day to 72 sub-steps in 7 steps (see the `0.3 renumber` row). Step-ID collision resolved onto ARCH/LOOP/MERGE/LUNAR/ECON prefixes with an old-to-new mapping table. Twelve ordering constraints found. New gate added (GATE-1): the loop is not pointed at `literature/` until the register, retrieval rebuild, classifier and three-class invariant land, because the corpus existing and the corpus being safe to answer from are two different dates and no Wave 1 draft named the second one. The Systems Engineer's falsifier 2 **half-failed and was caught**: the ref record and first-run flag were already consolidated by him, but the drift record was specified twice (ARCH-5 and MERGE-11) as the same computation with two owners; consolidated. The same failure shape was found outside the falsifier's scope, three encodings of the contested-claims register from three agents, also consolidated. |
| Abstracts | 2026-08-26 | Open Question 8 re-measured with `tools/audit_abstract_overlap.js`: four files, not thirteen, and three of the four were already marked as quotation. All four rewritten as original prose; re-audit returns zero at or above the 10 percent threshold, down from four. Markers removed. The three with LSEI copies are byte-identical across both corpora. |
| Dedup | 2026-08-26 | Author directed the duplicate-summary defect be fixed rather than scheduled. Six tokenization collisions found in `lsei/literature/` (Japanese Miracle corpus clean, zero). All six the same source twice, confirmed by DOI or NTRS ID; none referenced by filename in `index.html`. Four decided on a size gap: 4.6x, 5.1x, 3.0x and 1.67x. The fourth is Speyerer 2013 (26,400 against 15,836), and 1.67x sits 0.17 above the 1.5x line the same decisions file sets as the point below which a gap is not evidence; it is a size call made close to its own threshold and it is recorded that way rather than banded with the other three. The two closest (1.08x, 1.37x) were adjudicated by a separate reviewer reading all four files, which reversed the size call on Poston 2020. Corpus 158 to 152. Superseded files retained at `_intake/superseded-duplicates/`. Decisions recorded at `cr_scratch/step0_dedup_decisions.md`; enforced by `tools/check_corpus_collisions.js`, tested in both directions. |
| 0.2 | 2026-08-26 | Wave 1 closed, all five. The Engineer's merge audit corrected two orchestrator claims (PDF pairing rule, pull size) and answered Open Question 8 in the affirmative. His classification of that answer was overstated and was corrected the same day: Open Question 8 **does not gate the public release** (see the `Abstracts` row and loose end A4). Step-ID collision noted for integration: The Software Engineer and The Systems Engineer both numbered their steps SE-1 onward. |
| 0.1 rev. 1 | 2026-08-26 | The Manager closed rev. 1 of the open. Five Wave 1 prompts rewritten for the new layout; A2 restated as a ruling rather than an assumption; The Engineer promoted to first of five with an eight-part brief. Wave 1 spawned. |
| 0.1b | 2026-08-26 | The Recruiter closed. Recruited The Manager (economics prompt), anchored to Moses Abramovitz. Ruled against a second recruit. Pending author approval at the 0.8 gate. |
| Setup rev. 2 | 2026-08-26 | Author identified the Scenario Explorer's origin folder, `CSA_LSEI_Workshops` (4.1 GB), with instructions to survey it shallowly. Surveyed. 163 unique PDFs at `context/reference/lit/`, paired to summaries by directory adjacency rather than filename: 143 of 158 (pre-dedup) recoverable that way against 92 by name. **Both the rule and the pull size were corrected by The Engineer at 0.2; see Design notes.** Recorded in Design notes; the pull assigned to The Engineer at 0.2. |
| Setup rev. 1 | 2026-08-26 | Author feedback. Working copies flattened from `deps/` to `cr-agents/` and `lsei/` at root. Japanese Miracle corpus copied to `_intake/japanese-miracle/lit/` (119 summaries, 112 PDFs, 3 treaty texts, 363 MB). Directory map added. Corpus integration promoted to Objective 1. Open Question 1 closed by the author's ruling. |
| Setup | 2026-08-26 | Repository initialized. CR-Agents (`f0c976b`) and LSEI (`f788ea2`, since advanced to `7f97983`) cloned as working copies and gitignored. `cr_scratch/` created. Gameplan seeded with Step 0 only. The LSEI ref was `c8274e6` at seed and is `f788ea2` now: two commits were authored through this working copy during Step 0 (the abstract rewrites at `d7889e1`, the dedup at `f788ea2`) and both are on `origin/main`. `f788ea2` is the ref every LSEI figure in this document was measured against. |

---

## Design notes

**The Manager's rulings at open, 0.1.** Full text at `cr_scratch/step0_manager_open.md`.

The Manager ruled Step 0 a **nine** sub-step contract rather than eight: 0.1b is spawn-bearing and
carries its own deliverable, so it counts. It also returned five findings against the seed as the
author approved it. F2 through F5 are folded into the sub-step table and the Wave 1 briefs above.
F1 is recorded here so nobody re-litigates it: **the TDD precondition (A.4) does not fire on Step
0.** Step 0's deliverable is an operating contract, not a document with a reader. The condition
still stands downstream, and the drafted gameplan must schedule TDD stages as explicit ordered
steps for every later step that produces prose.

The Manager also fixed five **standing drafting assumptions**, stated verbatim in every Wave 1
prompt, on the grounds that the real integration risk at 0.3 is five agents each guessing
differently: the repository is public; the corpus summaries ship and the 112 PDFs do not; the
working copies float on main for drafting purposes; Claude Code only; and each agent says which
assumption it used wherever the answer depends on one.

**Two personas disagree about the second recruit, and the disagreement is on the record.** The
Recruiter ruled corpus curation "a real problem, not a person-shaped gap" at 182 filename-distinct
sources (158-file pre-dedup basis; 176 on the 152-file basis) and
assigned the artifact instead of the seat. The Manager ruled it "a real gap, wrong time," which
concedes the timing but not the principle, and named a trigger: recruit when the merge step opens,
or immediately if The Engineer reports at 0.2 that the 95 overlapping pairs disagree substantively.
Not resolved here. The trigger is the operative part either way.

**The recruited persona, 0.1b.** The Recruiter returned **The Manager (economics prompt)**, anchored to Moses
Abramovitz (1912-2000): NBER from 1938, economic adviser on the Allied Commission on Reparations in
1946, Stanford, AEA President 1980. The anchor publications are "Resource and Output Trends in the
United States since 1870" (1956), where he produced the growth residual and called it "a measure of
our ignorance," and "Catching Up, Forging Ahead, and Falling Behind" (1986), which gives the team
**social capability** and **technological congruence**. Full specification at
`cr_scratch/step0_recruiter_persona_spec.md`.

The selection argument is the part that matters: Abramovitz is the only candidate whose published
apparatus is a *test of transferability* rather than a description of an episode. Jorgenson,
Denison, Young and Gerschenkron were considered and rejected on the record. He arrives with hard
findings rather than a method: catch-up requires a technological leader and the Moon has none, so
Kiyota's technology-absorption mechanism has no lunar counterpart; congruence says terrestrial
technique was selected under a factor-price vector the Moon inverts; Lewis needs a subsistence
labour reserve that does not exist.

**New productive tension (A.9), to be added to the roster if the author approves:** *The Growth
Economist vs. The Space Resources Engineer.* Necessary conditions from opposite directions. The
Space Resources Engineer asks whether anyone has built it and at what TRL. The Manager (economics prompt)
asks whether an economy holding it would compound. A process can be TRL 6 and economically inert; a
growth mechanism can be well-evidenced and have no hardware. Do not resolve. A secondary tension
runs against The Fact-Checker: she catches fabrication, he catches valid and correctly cited
sources doing work they were never licensed to do. That second one is this project's actual failure
mode.

**No second recruit.** The Recruiter ruled that corpus curation is a real problem but not a
person-shaped gap at 182 filename-distinct sources (158-file pre-dedup basis), and assigned the
artifact rather than the seat: a
contested-claims register produced by the two domain personas, turned into a retrieval invariant by
The Software Engineer and into merge structure by The Engineer. The named trigger to revisit is a
Fact-Checker finding of one-sided retrieval on a registered claim at 0.5.

**Verified inventory, 2026-08-26.** Counted from the trees on disk this session, and **re-verified
by The Fact-Checker at 0.5**, whose corrections are applied here: the LSEI ref, the corpus size, the
`oracle/` file count, and the standing of the generated map. Stated here so a wrong number is caught
rather than inherited.

*CR-Agents*, `github.com/Shootquinn/CR-Agents`, main at `f0c976b`. Operational guide (750 lines),
TDD method, prompt0, twelve standing personas plus The Recruiter, the writing guides, the docx
toolkit.

*Lunar Scenario Explorer*, `github.com/Shootquinn/lsei-lunar-scenario-explorer`, main at `7f97983`,
which is also what `origin/main` reads. The app is `index.html`, one self-contained page of 894,127
bytes, holding 20 Claims across 66 sections, 86 slugs, 76 modeled nodes and 10 excluded ones, with a
data island publishing `KNOB_DATA`. Alongside it: `literature/` (152 summaries in 8 topic folders;
152-file basis, post-dedup, 158 pre-dedup), `oracle/` (13 `.js` files plus one JSON fixture, 3,002
lines, the prototype this project grows up from), `lunar-scenario-explorer-map.md`,
`report-generator-prompt.md`, and five vendored writing guides.

**The generated map is not current with the app, and the five app figures are correct anyway.** Two
facts, and they have to be recorded together because the second is only true because the first was
not trusted. The map's own provenance table records 895,544 bytes, md5 `a1acb7c4…` and data-island
pin `ca689ef3`; `lsei/index.html` on disk is 894,127 bytes, md5 `16caa330…`, pin `e2989bf6`.
`index.html` has been byte-identical since `c8274e6`, so the drift is the map's and it was committed
already drifted. The map names `tools/build_map.js` as its generator and `--check` as its proof, and
`lsei/tools/` does not exist, so the check that would have caught this cannot be run. The five
figures above — 20 Claims, 66 sections, 86 slugs, 76 modeled, 10 excluded — were **re-derived at 0.5
by evaluating the data island out of `index.html` directly** rather than read off the map, and all
five verify against the artifact. The map is what must not be cited for them. Sub-step 3.1
(LUNAR-7) re-derives them again against whatever the app is on that date.

*Japanese Miracle corpus*, now at `_intake/japanese-miracle/lit/`: 119 summaries, 112 source PDFs,
3 treaty texts, 363 MB. Copied rather than moved, so the original folder at
`onedrive/projects/CC/Japanese Miracle Lit Review` is intact and still holds that project's
finished work.

**What is local-only, and what a fresh LSEI clone actually restores.** The dedup and the abstract
rewrites are **not** local-only. `origin/main` reads `7f97983`, the same ref this working copy is on,
so a fresh clone of LSEI gets 152 summaries, zero `-2` duplicate files, zero transcription markers in
the four rewritten summaries, and the corrected licence sentence in `README.md`. Checked at 0.6 with
`git -C lsei ls-remote origin main` against `git -C lsei rev-parse HEAD`. Three things are genuinely
local-only and each rots without warning:

- **The `gott-2024` abstract fix.** `gott-2024` is Japanese-Miracle-unique, so it has no LSEI copy;
  the rewrite lives only in `_intake/`, in a repository that has **no commits at all** (loose end E9).
  It exists on one disk.
- **The `--push DISABLED` settings** on both working copies. They live in each copy's `.git/config`
  and do not survive a re-clone. `CLAUDE.md`'s idempotent `set-url --push` assertion is the only
  durable half of loose end A2, which is why loose end E7 (the assertion sitting on the acquire path
  rather than the verify path) mattered.
- **The `CSA_LSEI_Workshops` survey** — 4.1 GB, 163 PDFs, the 111/46/5/1 split, the 26 quarantined
  `.md` files. No repository tracks that folder, it syncs, and it belongs to a different project.
  Nothing will ever tell this project when the survey stops being true.

Two consequences for how figures are written down. The app figures and the CR-Agents figures are
snapshots of working copies that float on `main`, so every one of them carries the ref it was
measured against (`7f97983`, `f0c976b`) rather than a bare number. And "FIXED" in the loose ends
register below means fixed and verified; where the fix lives outside this repository's history the
row says where.

**The merge is smaller than it looks, and the part that is new is the important part.** Comparing
summary filenames after normalizing case and separators, on the 158-file pre-dedup basis: 95 sources
appear in both corpora, 63 are unique to the Scenario Explorer, and 24 are unique to the Japanese
Miracle review. The union is 182 distinct **filenames**, which is not a source count — see loose end
B5. On the 152-file post-dedup basis the same arithmetic gives 176 and 57, both provisional until
sub-step 2.1 (MERGE-2) measures them. The Scenario Explorer corpus already absorbed most of the Japanese Miracle
corpus, which is expected given the shared lineage. What it did not absorb is the Japan-specific
economic and organizational spine, and that is exactly the adult this project is asking for:

```
acemoglu-2020-robots-and-jobs               kiyota-2005-foreign-technology-acquisition
aoki-2009-government-tfp-growth             kiyota-2013-import-quota-removal
beason-1996-targeting-japan                 may-1977-how-japans-economy-grew-so-fast-review
beckley-2018-americas-role-japan-miracle    miwa-2002-fable-of-the-keiretsu
christiano-1989-japan-saving-rate           nakamura-1989-postwar-japanese-economy
dingman-1993-dagger-and-gift-korean-war     otsu-2007-neoclassical-postwar-japan
esri-2016-japan-high-growth-economic-plans  pritchett-2000-hills-among-plateaus
esteban-pretel-2009-postwar-japan-policy    ryan-2000-self-determination-theory
gott-2024-card-gas-analysis-subsystem       simonis-1979-denison-boltho-review
hoshi-1991-corporate-structure-liquidity-investment  spear-1999-decoding-tps-dna
jorgenson-2005-industry-origins-japan       trist-1951-longwall-coal-getting
kawagoe-1999-japan-land-reform              wade-2018-developmental-state-dead-or-alive
```

Note what is in that list beyond growth accounting: the Toyota Production System, sociotechnical
systems design from the Tavistock coal-getting study, and self-determination theory. The adult
knows how work is organized, not only how output is measured.

**Where the Scenario Explorer's source PDFs live, and why the pairing is not by filename.** The
author identified the origin folder for the Scenario Explorer work:
`OneDrive/PROJECTS/CC/CSA_LSEI_Workshops`. It is 4.1 GB and holds a great deal that is not relevant
to this project. Surveyed shallowly, by the author's instruction, and the relevant part is
`context/reference/lit/`, which holds 163 unique PDFs across a few subfolders.

**This note was written by the orchestrator on a shallow survey and The Engineer corrected it at
0.2. The corrected version is what governs.** The orchestrator's original claim was that PDFs pair
to their summaries by directory co-location, recovering 143 of 158 (pre-dedup) against 92 by filename. The
observation was right and the rule was wrong.

*Co-location is not a rule a machine can follow.* `scenario_undercarriage_sources/` holds 46 PDFs
against 44 summaries, which is 2,024 candidate pairings, and adjacency alone has no way to choose
among them. The Engineer implemented it as a tier and it matched `un-1967-outer-space-treaty` to
`deming-1967-japan-quality-control.pdf`. The real pattern is a shared **author-plus-year token
across two naming conventions**, of which co-location is a symptom rather than the mechanism. His
tiered rule is exact filename (92), then unique author-year (44), then a hand queue (22) resolved
by reading the PDF's first page against the summary's own citation title: **148 of 182
(158-file pre-dedup basis) deterministic, 81%.**

*The pull is smaller than the orchestrator reported.* Not 163 PDFs and 601 MB but **52 PDFs and 224
MB**, because `japanese miracle lunar economy lit/` (111 PDFs, 377 MB) **is** the origin of what is
already at `_intake/`, verified by name with zero files in it we do not already hold. The net-new
comes from `scenario_undercarriage_sources/` (46), the `lit/` root (5), and
`fission_program_primaries/` (1).

*The quarantine warning was moot.* `_QUARANTINED_prior_art/` holds 26 `.md` files and **zero PDFs**,
so a PDF-only pull cannot touch it and the prohibition enforces itself. It still should not be read
into the corpus without establishing why it was quarantined.

**Numbering convention, ruled by the author 2026-08-26.** Integration returned its plan as seven
"phases" containing 73 "steps." That is one level off from this method's numbering and it breaks the
one-step gate, which fires after every step: 73 gates is not a cadence anybody can work at.

**The phases are the steps. The steps are the sub-steps.** The plan is Steps 1 through 7, each
holding sub-steps numbered `N.M`, exactly as Step 0 itself ran with 0.1 through 0.8. The one-step
gate (A.4 step 8) then fires seven times, at boundaries where the decision is genuinely the author's:
after the rulings land, after the corpus merges, after retrieval is rebuilt, and so on. Sub-steps
inside a step run as continuous working-loop cycles without stopping.

Each sub-step keeps its agent-origin tag (`ARCH-n`, `LOOP-n`, `MERGE-n`, `LUNAR-n`, `ECON-n`) in its
own column. That tag is the only route back to the Wave 1 file that authored it, and those five files
stay on disk and get read again. The mapping table in the integration draft is three-column:
original agent ID, integration prefix ID, final `N.M`.

Roughly 20 of the 75 sub-steps are not independent work but mandated TDD stages (test suite, outline,
write, revise) split into ordered sub-steps rather than folded into one "build" row. Those are the
last thing to cut if the count is reduced: the Japanese Miracle project's Phase 7 deliverable failed
audience acceptance because exactly those stages were skipped, and that project's own gameplan says
so in its own words.

**The 72 is not yet ruled on for granularity.** Integration declined to prune, correctly, on the
ground that dropping rows to hit a number belongs to the scope-holder. The Manager gets it as an
explicit question at 0.7: is this the honest decomposition, or five specialists each writing at their
own preferred resolution with nobody normalizing? Step 2 at 18 sub-steps against Step 5 at 3 suggests
at least some of the latter. Anything The Manager wants to cut arrives at the author's gate as a
list, per the guide's rule that an unnecessary sub-step is removed with author approval rather than
quietly dropped.

**The corpus counts in this section were measured before deduplication and are now provisional.**
Every overlap and union figure Wave 1 worked from was measured against a 158-file Scenario Explorer
corpus. The six duplicate removals executed on 2026-08-26 left 152, so the union by filename is
152 + 119 - 95 = **176, not 182**. Both figures stay, each with its basis: 182 is a measurement over
the 158-file listing and 176 is arithmetic over a changed input. Both are marked PROVISIONAL in the
echo site registry, and sub-step 2.1 (MERGE-2) produces the measured replacement. A second count is
contested: the number of author-year clusters holding more than one summary is 16 by The Space
Resources Engineer and 17 by The Engineer, and neither stated the clustering rule, so the contest is
not adjudicable as posed — a strict rule (leading author token, optional single hyphenated surname,
then a 19xx/20xx year) returns 9 over the 176 union. This matters because the retrieval invariant in
loose end B4 is built on that list; what B4 actually rests on, `sowers-2019` holding four members, is
verified.

**The 86 exact-name matches are not automatically identical files.** Nine more pairs match only
after normalization (`GDP.md` against `gdp.md`, `ISNPS_Tech_Report_97.md` against
`isnps-tech-report-97.md`, and so on). Two summaries of the same source, written at different times
by different passes of the same method, can disagree. Resolving that is a merge decision, assigned
to The Engineer at 0.2 and not settled here.

**Directory map: what gets pushed and what does not.** This was the author's ruling at seed time and
it is recorded here rather than at the front because it is a design note.

The `.gitignore` in this repository enforces this map. If the two ever disagree, this table is the
statement of intent and the `.gitignore` is the bug.

| Path | Pushed | What it is |
|---|---|---|
| `CLAUDE.md` | yes | Bootstrap. Clones the working copies, sets the read sequence, runs the first-run sequence. |
| `lunar-oracle-gameplan.md` | yes | This file. The law once the dependencies are on disk. |
| `accumulator.md` | yes | Per-persona contribution history across spawns and sessions. |
| `.gitignore` | yes | This map, enforced. |
| `literature/` (`.md`) | **yes** | **The merged corpus.** This project's own summaries. The deliverable of the primary assignment. |
| `literature/**/*.pdf` | no | Source PDFs, on disk beside their summaries. Published papers this project does not own and cannot redistribute. |
| `oracle/` | yes | Lunar Oracle's own tooling, once it exists. |
| `tools/` | yes | Checks that enforce this project's own rules. `check_corpus_collisions.js` fails if two summaries are indistinguishable to the retrieval layer. |
| `cr_scratch/` | yes | Agent handoffs. Committed on purpose (A.3.5): it preserves agent reasoning for audit. |
| `README.md` | yes | Written in a later step. |
| `cr-agents/` | no | Working copy of `github.com/Shootquinn/CR-Agents`. Cloned at bootstrap. |
| `lsei/` | no | Working copy of `github.com/Shootquinn/lsei-lunar-scenario-explorer`. Cloned at bootstrap. The app inside it is an authority, and an authority is never copied into a repository that would then have to keep it current. |
| `_intake/` | no | Staging. Material on its way into `literature/`. Empties as the merge lands. |

Two consequences worth stating plainly, because they are the reason the map looks like this.

*The PDFs stay and the PDFs never ship.* A person who clones Lunar Oracle gets the merged corpus and
no PDFs. That corpus is **176 summaries by arithmetic on the 152-file basis and has never been
measured**, because the merge has not run; the measurement lands at sub-step 2.1 (MERGE-2). It is not
119: 119 is the intake half. The no-PDF posture is the one the Scenario Explorer takes and for the
same reason: each summary identifies its source by citation and DOI, so a reader reaches the original
through its publisher. The author's local disk keeps the PDFs because the team reads them when a summary is
not enough.

*The corpus is pushed and the app is not.* These look inconsistent and are not. The corpus is this
project's own writing, static, and the thing being built. The app is somebody else's live artifact
that recomputes on every slider move, and the moment a copy of it sits in this repository there are
two answers to every quantitative question.

**Provisional `CLAUDE.md`.** The `CLAUDE.md` currently in this repository is a session-recovery stub
written at seed time. It is not the deliverable. The real one is drafted in a step the team defines
at 0.2, and it is the file that carries the bootstrap contract and the first-run sequence.

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
| A1 | 1.1 | `.gitignore` allowed non-`.md` files under `literature/`. Three UN treaty `.txt` files, and any `.docx` or `.PDF`, would have shipped. | `git check-ignore` over seven probe paths: `literature/x.pdf`, `x.PDF`, `x.txt`, `x.docx` and `sub/y.pdf` are ignored; `literature/x.md` and `literature/sub/y.md` are not. | **FIXED**, verified both directions. 1.1 turns the seven probes into the standing fixture list |
| A2 | 1.4 | Both working copies could push to their upstreams. "Never pushed" was enforced by nothing. | `git remote -v` shows `origin … DISABLED (push)` on both; `CLAUDE.md` carries the idempotent `git remote set-url --push origin DISABLED` assertion with its rationale. | **FIXED**, and the assertion is in `CLAUDE.md`. The `.git/config` half does not survive a re-clone, so the `CLAUDE.md` assertion is the only durable half — see Design notes, what is local-only, and E7 |
| A3 | 2.2 | Six tokenization collisions in `lsei/literature/`, same source twice in every case. **One sentence of this row is unverified:** that `csank-2022` resolved to the 7,637-byte summary every time and the 23,190-byte one never. That is the tool's own comment rather than a measurement anyone could repeat — the pre-dedup corpus no longer exists in the working tree. The collision, both byte sizes and the same-source identity all verify. | `tools/check_corpus_collisions.js`; DOI or NTRS match per pair (`csank-2022`: NTRS 20220004165); none of the six dropped basenames is referenced in `index.html`. | **FIXED**, corpus 158 to 152, and **pushed**: `origin/main` reads `f788ea2`. Superseded members retained at `_intake/superseded-duplicates/` |
| A4 | 2.12 | Four summaries reproduced their source's printed abstract: `gott-2024` 79.8%, `schreiner-2016` 44.0%, `romer-1990` 38.4%, `turyshev-2026` 11.9%. **Four is the corrected count.** The earlier count of thirteen included transcription markers in citation fields, which are a different thing. This row is the single account of that error; Open Question 8 points here rather than restating it. **The four percentages are no longer reproducible**: the files were rewritten at `d7889e1` and in `_intake/`, so the measured inputs are gone. Flagged rather than deleted. | `tools/audit_abstract_overlap.js` over **103** PDF-paired summaries, median 0.0%; re-run at 0.5 against the same population with the same result. The **108** quoted inside Open Question 8's retained original wording is a second denominator for the same audit; nobody could rule which population it counted, and it is unreconciled. | **FIXED.** All four rewritten as original prose, markers removed, re-audit returns 0 at threshold. The three with LSEI copies are pushed at `d7889e1`; the `gott-2024` fix lives only in `_intake/`, in a repository with no commits (E9) |
| A5 | 6.13 | The LSEI README claimed "No third-party PDF, page image or extracted source text is in this repository." Not true of its own corpus. | The superseded string is the one quoted here, with the "or extracted source text" clause present. `lsei/README.md` now reads "No third-party PDF or page image is in this repository," committed at `d7889e1`. Cite the string, not a line number: the line has moved once already. | **FIXED** and pushed at `d7889e1`. Lunar Oracle's own corpus licence statement at 6.13 must not copy the original sentence |
| A6 | 2.12 | **57** Scenario-Explorer-unique summaries have no local PDF and were never tested for A4. (63 was the 158-file pre-dedup figure; 57 is the 152-file basis and is provisional until 2.1 measures it.) | The Engineer, part 8 scope limit. | OPEN. The 52-PDF pull at 2.11 supplies PDFs for some of them; 2.12 re-runs the audit over the rest and is the only thing that closes this row. Owner: The Engineer |
| A7 | 2.4 | `GDP.md` and `gdp.md` collide on a case-insensitive filesystem. A naive merge silently drops one file on Windows and not on Linux. | The Engineer. | DEFERRED. Owner: The Engineer. 2.4 (MERGE-5t) writes the case-insensitive collision assertion, and it runs before 2.5 executes the merge |
| A8 | — | **Two errors in `lsei/README.md`, found at 0.5 and fixed at the Step 1 open.** Line 12 says `literature/` is "all at one level with no subfolders"; it has eight topic folders. Line 46 says `oracle/` "holds three command-line tools" and then describes four. | The Fact-Checker at 0.5, read against the tree: eight directories under `lsei/literature/`; four top-level scripts in `lsei/oracle/` (`answer_question.js`, `render_figure.js`, `verify_answers.js`, `verify_figure.js`). | **CLOSED, 2026-08-26.** Fixed and pushed as `lsei` `7f97983`. Three corrections: the eight topic folders are named; "three command-line tools" reads four; and the usage block gained `verify_answers.js` while `answer_question.js` gained the `--log` flag that writes the file it reads, so the block runs end to end. No sub-step in this plan owns another repository's README, which is why the address column is a dash. |

### B. Defects the merge would create or expose

| # | N.M | Finding | Evidence | Status |
|---|---|---|---|---|
| B1 | Step 4 gate (2.16, 3.7, 3.8, 4.1, 4.2) | **The single most important finding of Step 0.** The merge converts an honest refusal into a confident one-sided answer. "Did MITI targeting raise TFP, and does it transfer to lunar capital deepening?" returns `REFUSE` against the 158-file (pre-dedup) corpus and `beason-1996` against the merged one, with Henderson absent from the candidate list entirely. It fires before any register exists. **The defect is real and the illustration is weaker than it reads:** see B6. Beason and Henderson agree, so this is a refusal becoming a confident single-source answer rather than a refusal becoming a one-sided answer on a contested claim. The threshold and IDF causes in B2 and B3 are unaffected. A genuinely contested pair is needed to re-run the probe. | The Engineer, run against a merged probe corpus rather than reasoned about. | OPEN. Owners: The Software Engineer and The Engineer. The containment is the Step 4 closing statement, which absorbed the dissolved corpus-live gate |
| B2 | 3.7 | The 0.45 confirmation threshold was tuned on a **156-file** single-field corpus and has no standing at the merged size. Set it from a fixture set, not by feel. 156 is a third corpus basis alongside 158 and 152, and it is the tool's own: it counts what had shipped when the tool was written, not either of this project's trees. | The Software Engineer; The Engineer part 7. Both halves re-read at source at 0.5: `literature_search.js` line 214 is `frac >= 0.45`, and line 128 says in the tool's own words "run against the shipped 156-file corpus rather than the original 57." | DEFERRED. Owner: The Software Engineer. 3.6 (LOOP-4t) builds the labelled question set the new threshold is set against |
| B3 | 2.3, 3.7 | The IDF table is pooled across two fields with different vocabulary distributions, so "policy", "capital" and "targeting" get a weight wrong for both halves. The fix needs field-scoped IDF, which makes **a machine-readable field label per file a hard requirement on the taxonomy**, not a preference. | The Software Engineer. | DEFERRED. Owners: The Engineer (taxonomy, 2.3) and The Software Engineer (retrieval, 3.7) |
| B4 | 2.1, 2.15 | **The cluster count is contested, and this is the one row where the contest is load-bearing.** A filename-overlap ranker returns whichever member of an author-year cluster tokenizes best, not the one carrying the claim, so the register's `sources` field must name every cluster member or the invariant is satisfiable by returning the wrong file. The count is **16 (The Space Resources Engineer) against 17 (The Engineer)**, and it **cannot be settled as posed, because neither states the counting rule**: under a strict rule — leading author token, optional single hyphenated surname, then a 19xx/20xx year — the same trees return 9. What the invariant actually rests on is verified independently of the count: **`sowers-2019` holds four members** (`-psr-ice-mining`, `-thermal-mining-ice`, `-thermal-mining-niac-report`, `-thermal-mining-niac`). | The Space Resources Engineer (16); The Engineer (17); The Fact-Checker at 0.5 for the missing rule and for `sowers-2019`. | DEFERRED. Owner: The Engineer. 2.1 (MERGE-2) reconciles the count **and states the counting rule when it does**, since a number without its rule cannot be reconciled at all; 2.15 asserts that every cluster member named by a register row resolves |
| B5 | 2.1 | "182 sources" is a filename count. DOI deduplication finds 7 confirmed duplicate pairs plus 2 unconfirmable preprints; true distinct sources is about 162 to 173. **The DOI coverage figure needs restating with its basis and cannot be reproduced as written.** "Only 79 of 182 carry a DOI at all" was measured on the 182 population under a definition the register never stated — a confirmed DOI field rather than any DOI string. A regex for a resolvable DOI anywhere in the file, over the 176-file union, returns **91 with and 85 without**. **Echo site.** | The Engineer; the re-measurement by The Fact-Checker at 0.5. | DEFERRED. Owner: The Engineer. 2.1 (MERGE-2) emits an identifier and an identifier kind per file and replaces every figure in this row; whichever definition it uses, it states it |
| B6 | 1.10 | **The exemplar contested pair is not contested.** `beason-1996-targeting-japan` and `henderson-2008-myth-of-miti` were quoted throughout Step 0 as the model two-sided pair. Read on disk they are on the same side: Beason tests the conventional targeting narrative across 13 sectors and finds against it; Henderson argues MITI's causal role "has been greatly exaggerated" and is carried mainly for its Denison and Chung decomposition. Returning Beason without Henderson is returning one of two agreeing sources, not one side of a dispute. **The corpus already says so about itself:** Henderson's own Topic mapping section reads "Also relevant to the **MITI-skeptic thread alongside Beason 1996** and Kiyota 2013." The two sources are filed as co-belligerents by the summaries themselves. | The Writer found it; orchestrator confirmed from both abstracts; The Fact-Checker upheld it at 0.5 by reading both files in full and quoting the Topic mapping line. | OPEN. It is a `false_pair` in The Manager (economics prompt)'s own taxonomy, which already anticipated the category. Reclassify at 1.10. **Every downstream use of this pair as an illustration needs re-checking, including loose end B1's worked example.** |
| B7 | 1.10 | **The corpus has no primary pro-targeting source, and that is a systematic bias rather than a gap.** Johnson 1982, *MITI and the Japanese Miracle*, is in neither corpus. Beason's abstract names it as the narrative he is testing, so the affirmative industrial-policy position survives in this corpus only as reported speech inside its critics. Asked whether industrial policy worked, this Oracle can currently only answer no, and it will sound well-sourced doing it. **Two corrections from 0.5.** Wade 2018 **is** affirmative on the developmental state — his abstract argues it better explains the catch-up decades, and rebuts the conversion claim — and is merely silent on *sectoral targeting*; "neither makes the targeting claim" is right, "nearest affirmative source" undersells him, and that distinction is the one a retrieval layer will blur. And Johnson 1982 is not merely absent, it is **already registered**: `_intake/japanese-miracle/fa/FA1-source-list.md` entry 14 carries the slug `johnson-1982-miti-japanese-miracle`, a full citation, "PDF route: library or Internet Archive", and the note "Read against Beason and Weinstein." | Orchestrator, from the corpus listings and three abstracts. Upheld at 0.5 by four independent searches for the absence: filename, full-text author name, exact title, and the abstracts of the four plausible affirmative sources. | OPEN. **Acquisition target: Johnson 1982 — a fetch against a written specification rather than a research task**, since the slug, the pairing and the PDF route already exist. Owner: The Manager (economics prompt), 1.10 |

### C. Defects in the prototype Oracle

| # | N.M | Finding | Evidence | Status |
|---|---|---|---|---|
| C1 | 3.2 | `app_model.js` extracts `model()` but not `valueModel()`. The app's entire economic half (`r_prop`, `margin_*`, `Dstar_prop`, `ranking`) is unreachable by any APP verdict. It fails silently: the router does not refuse, it answers an app question from a literature summary. That is the inherited authority rule being violated by the mechanism built to enforce it. | The Space Resources Engineer, verified by grep returning zero across `app_model.js` and `address.js`. | OPEN. Owner: The Space Resources Engineer |
| C2 | 3.2 | `model()` returns 26 keys; `OUTPUT_LEXICON` names 8. `cap`, `Wpower`, `Wthr`, `mPwr`, `Rcap` and `regime` are unreachable, and they are the outputs a resources person actually asks for. | Same. | OPEN |
| C3 | 2.18 | `answer_question.js` `DEFAULT_LIT` resolves to `lsei/literature/`, not the merged corpus. Run in place it silently answers from the wrong corpus, defeating Objective 1 at the point of use. Every invocation must pass `--lit` and the suite must assert which corpus was used. | The Systems Engineer. | OPEN. Owner: The Systems Engineer; 2.18 carries the `--lit` requirement |
| C4 | 1.6 | **This row has now been wrong twice, and the second correction reverses the first.** `verify_report.js` is named as an unlisted dependency of three of The Software Engineer's mechanisms. The 0.5 finding said it is in neither working copy and concluded there is nothing to vendor and nothing to pin. **The file is not missing.** Its complete 328-line source is embedded as a fenced `javascript` block in `lsei/report-generator-prompt.md`. Counting rule: the opening fence is line 357 and the closing fence is line 686, so the block spans 330 lines inclusive and the source between the fences is 328 lines. The heading `## The verifier` is at line 352, introduced by the instruction "Write this out as `verify_report.js` and run it. It is the same file the proofs in step 5 were run against." The Fact-Checker's `find` is correct as run and the conclusion drawn from it is not: a filename search cannot see a file that exists as content inside another file. Both options C4 declared unavailable are available again, and a third has appeared — extract it at bootstrap from the pinned prompt document, which is the upstream's own instruction. **The Manager's common cause at the Step 1 open: this project's searches look for containers and its dependencies live as content** — summaries inside files, the model inside `index.html`, source inside a prompt document, a mirrored tokenizer instead of an import. That reasoning is passed to 1.13. Seven lines above the opening fence, at line 349, the upstream file states that its register property "rests on a vendored copy read at generation time and a human eye, and if that step is skipped nothing downstream will notice" — which is E8's sentence, written upstream, about this dependency. | The Software Engineer, disagreement (d), for the dependency. The Fact-Checker at 0.5 for the `find` result, which stands; her conclusion from it does not. The Manager at the Step 1 open for the location, verified by the orchestrator: one fenced block, 357–686, 328 lines. | **RULED by the author, 2026-08-26: drop the dependency.** The three mechanisms are rewritten without `verify_report.js`. Not extracted, not vendored. Being able to acquire something is not a reason to depend on it. The cost is one reimplementation and nothing else: The Software Engineer had already made the answer contract independent of it at 1.3, restating the claim-bearing definition in the contract's own words rather than by reference. 1.6 records the ruling; its charge shrinks back to the currency policy. **Open onward:** the three mechanisms need a replacement post-condition and no sub-step owns that work. Flag at the Step 1 close. The container-versus-content finding survives the ruling and goes to 1.13 as scheduled. |
| C5 | 3.4 | EXCLUDED-BUT-ADJACENT has no mechanism. `propellant-mass-leverage` is excluded while `net-value-identity` is modeled, so the app resolves an address into the wrong one and returns a number. Three adjacency pairs identified and shipped as data. | The Space Resources Engineer; the forcing case re-verified at 0.5 against the app's own exclusion set. | DEFERRED. Owner: The Space Resources Engineer. 3.4 (LUNAR-4) extends the exclusions matcher to three outcomes |

### D. Structural decisions still owed

| # | N.M | Question or finding | Position(s) taken, or evidence | Status |
|---|---|---|---|---|
| D1 | 1.2 | Are the FA1-FA8 deliverables the same kind of object as a summary? | The Manager (economics prompt): **no.** A summary's warrant is that every claim resolves to one source; an FA deliverable is a cross-source adjudication with a verdict column and arithmetic present in no source (FA2 says outright that its net-MPK threshold is "the summarizer's calibration"). Merging them breaks the resolution-grade guarantee silently, for files that look identical to their neighbours, and the Oracle will cite a verdict as a finding. Recommendation: two corpora, two contracts. | **CLOSED by the author, 2026-08-26. Separate shelf.** Two directories, two retrieval contracts, two trace grades; an answer says which shelf it drew from. See Author rulings above. Sub-step 2.1 writes the taxonomy against this ruling. |
| D2 | 1.8, 3.8 | Is the contested-claims register consulted at classification time or after retrieval? | The Software Engineer: **at classification time**, as a third retrieval mode, the register being an address space rather than a filter. He declined the exception to the inherited rule, on the ground that a post-retrieval check can only fire on what retrieval already returned, so implementing it requires issuing a second search and combining, which is the forbidden shape. Residual hole named: `match_keys` matching is heuristic and can miss. His fallback can only emit REFUSE plus a `MISCLASSIFIED` log row and is structurally incapable of reconciling. | POSITION TAKEN, reviewed at 0.5 and upheld. The Systems Engineer records that the same rule was reached from the other side, with neither agent citing the other |
| D3 | 3.1 | Does the app remain sole computational authority? | Three personas, three compatible positions, no conflict. The Systems Engineer: yes, and the boundary must be **mechanically enumerable**; a corpus number crossing into a lunar answer is a **transfer**, not a fact, and carries the burden of naming why the transfer is legitimate. The Space Resources Engineer: yes, and **a coefficient's status field is part of what the app computes**, so an APP verdict carries the status of every coefficient on the path (forcing case: `captureEff` = 1 against LUWEX at 50-73%). The Manager (economics prompt): yes, and the app's authority should get *smaller and sharper*; he opposes promoting the corpus to a second calculator and wants the ten excluded nodes promoted to first-class answers. | **AUTHOR** ruling wanted, Open Question 5. 3.1 audits the boundary against the artifact before it becomes a routing contract |
| D4 | 1.6 | Pinned or floating working copies? | The Systems Engineer: **neither as stated.** Record the ref, float the checkout, compare at bootstrap, report drift, automate nothing. A hard pin makes staleness invisible the same way floating makes breakage invisible, and trading one invisible failure for another is not a decision. He adds that drafting assumption A3 must not survive into the answering loop: an answer that cannot name the model it was computed against is not traced. | **AUTHOR** ruling wanted, Open Question 3. 1.6 is the policy |
| D5 | 0.5 | Does the project need a second recruited persona for corpus curation? | The Recruiter: gap dissolved, assign the artifact not the seat. The Manager: gap deferred, not dissolved. Two live triggers were set. **The Engineer's has now fired negative:** the overlap is cosmetic. The figure is **87 of 95 byte-identical, 8 differing** — corrected from 89 of 95 at 0.5 by pairing the two corpora on the retrieval tokenizer's key and comparing bytes. Three of the eight differ because of this session's own dedup. **The correction does not reopen the trigger:** the differences are still cosmetic, so the closure survives it. | **NARROWED, NOT CLOSED** (The Manager at 0.7). His trigger fired negative on a number stated three ways, and the corrected figure is **87 of 95 byte-identical, 8 differing**, not 89 of 95. The verdict survives the correction; the reasoning does not. Byte-identical is a proxy for agreement, and differing is not a proxy for substantive disagreement. Three of the eight differ because of this project's own deduplication; five differ for reasons nobody has read. The trigger narrows to those eight and stays armed until sub-step 2.2 reads them, which 2.2 does anyway, so it costs nothing and buys an answer instead of a proxy. **Neither The Recruiter nor The Manager has been shown wrong.** |
| D6 | 1.1 | Where do pulled PDFs land? | The Engineer recommends `literature/_pdf/<taxonomy>/` rather than interleaved with summaries, and flagged that this reads against the directory map's wording rather than taking the variance himself. | **AUTHOR**, small. 1.1 adds the map row that resolves it |
| D7 | 2.2 | The two adjudicated duplicate pairs are a deferred merge, not a resolved tie. Both losers carry content the winner lacks, and the pattern is systematic: files with the richer `## Metadata` format carry the verifiability apparatus, files without it carry more raw quantity. | Recorded in `cr_scratch/step0_dedup_decisions.md`. All six superseded files retained at `_intake/superseded-duplicates/` so the union stays possible without re-fetching. | DEFERRED. Owner: The Engineer. 2.2 (MERGE-3) makes the primary and secondary call for every collision group, and is where the deferred merge is either done or declined on the record |

### E. Process and mechanism

| # | N.M | Finding | Evidence | Status |
|---|---|---|---|---|
| E1 | 1.4, 2.14 | **A git pre-commit hook is not a mechanism**, because hooks are not cloned. Any check must be a committed script that the bootstrap wires via `core.hooksPath`. This is a dependency of A1 and A3 staying fixed. | The Systems Engineer at 0.2 and 0.5. | OPEN. Owner: The Systems Engineer. 1.4 puts `core.hooksPath` in the bootstrap contract; 2.14 installs it |
| E2 | — | Step-ID collision. The Software Engineer numbered his steps SE-1 to SE-11 and The Systems Engineer numbered his SE-1 to SE-9. | The three-column mapping table at §7 of the integration draft; the origin tag is retained in its own column on every sub-step row; both gate rows resolve as this gameplan says. Re-verified at 0.5. | **FIXED** at 0.3 onto ARCH/LOOP/MERGE/LUNAR/ECON prefixes, then renumbered again to `N.M` sub-steps under the author's numbering ruling |
| E3 | 1.5, 6.6 | Nothing owns machine-generated state. The first-run flag's default is to be committed, which would suppress the opening sequence for every subsequent cloner. Per-install, at root, gitignored, recording timestamp, schema version and bootstrap-completed. **A degraded bootstrap leaves it unset.** | The Systems Engineer. His rationale, which belongs beside the rule rather than inside it: whimsy in front of a system about to refuse every question burns the one first impression. | POSITION TAKEN. 1.5 defines the record, 6.6 reads it |
| E4 | 1.1 before 2.5 | **The enforcement-layer fix must land before the merge executes.** The merge moves files into `literature/`; the `.gitignore` and hook work is what makes `literature/` safe to move files into. | The Systems Engineer; carried into the integration draft's ordering constraints at 0.3. | **FIXED** as an ordering constraint: 1.1 sits in Step 1 and 2.5 in Step 2, and the one-step gate fires between them. The row is kept because the constraint is the thing a re-plan would silently drop |
| E5 | 3.7 | `tools/check_corpus_collisions.js` mirrors the upstream tokenizer. If that tokenizer changes upstream, the check goes stale silently. This is the one failure mode it cannot catch about itself. | Documented in the file, in the comment block above `STOPWORDS`; verified at 0.5. | ACCEPTED LIMIT — but see E13, which turns the risk into a certainty on a date already in this plan |
| E6 | 1.6 | **Nothing fetches.** The word `fetch` does not occur anywhere in the integrated plan. A local clone that has not fetched cannot distinguish an upstream that has not moved from an upstream it has not looked at. Demonstrated live: `ls-remote` read `f788ea2` while the local tracking ref still read `c8274e6`. The plan would have noticed this session's upstream change only because those commits went through our own working copy; had the author pushed from his own clone, HEAD, the tracking ref and the corpus digest would all read equal while the authority had moved. | The Systems Engineer at 0.5. Bootstrap stub in `CLAUDE.md` **FIXED**; the plan-level fix is still owed. | OPEN. 1.6 makes the comparison three-way — recorded ref, local HEAD, `origin/main` after an explicit fetch — and names the offline case |
| E7 | 1.4, 6.1 | **`CLAUDE.md` disabled push only on the acquire path.** The two `set-url` lines sat inside the "if either is missing, clone it" block, so a working copy present with push still enabled never got disabled. The Systems Engineer attributed the error to his own 0.2 text, which put it under Acquire when it belongs under Verify. | `CLAUDE.md` now splits Acquire from Verify; the push assertion and the fetch run every session, idempotently. | **FIXED.** 1.4 states it and 6.1 asserts it against an already-present working copy |
| E8 | 1.13 | **Nothing invokes the checks.** `tools/` appeared nowhere in the 72 sub-steps as drafted. `check_corpus_collisions.js` and `audit_abstract_overlap.js` exist and nothing runs them. This is E1 restated with evidence: a check nothing wires up is not a mechanism. | The Systems Engineer at 0.5; 2.14's `core.hooksPath` installation covers `oracle/check_no_sources.js` only. | **ADDRESSED at the Step 1 open. Now sub-step 1.13**, the check register: every committed check, what it asserts, what invokes it, when it fires, what a failure does, what its authority is. A closed list, handing a post-condition to 2.14. The Manager considered folding it into 1.4 and rejected that: answering "a check nothing wires up is not a mechanism" with a clause inside a seven-phase specification is the same error at one remove. Open until 1.13 lands |
| E9 | — | **"Committed" is aspirational throughout this register.** This repository has zero commits. Every row describing something as committed describes an intention. | The Systems Engineer at 0.5; `git log` reports no commits on `main`. | OPEN until the first commit. No sub-step owns it |
| E10 | 1.6 | **The drift report cannot tell "the authority moved" from "we moved the authority."** During Step 0 this project pushed two commits to the Scenario Explorer, so the distinction is not hypothetical. A drift report that cannot name the direction of a change invites the wrong response to it. | The Systems Engineer at 0.5. | OPEN. 1.6 states the rule and distinguishes the directions by comparing against `origin/main`, which needs E6 fixed first |
| E11 | 2.17, 2.18 | **Upstream withdrawal has no verdict.** The plan handles an upstream that gains content. Six summaries were deleted from the Scenario Explorer corpus during Step 0, which is exactly the case with no defined behaviour. | The Systems Engineer at 0.5. | OPEN. A third verdict, *withdrawn*, in 2.18's policy and 2.17's report. Reported, never auto-acted |
| E12 | 1.5 | **The verified-against ref is content, and the plan files it as ignored per-install state.** That violates the Systems Engineer's own rule from 0.2. His fix is a tracked ref plus an ignored one, which he confirms does not reopen falsifier 2. | The Systems Engineer at 0.5, against his own 0.2 text. | OPEN |
| E13 | 3.7 | **E5 goes stale from our own side.** `check_corpus_collisions.js` mirrors the upstream tokenizer, and sub-step 3.7 rebuilds that tokenizer. The documented staleness risk was written as an upstream hazard and is in fact scheduled work in this plan. | The Systems Engineer at 0.5. | OPEN. 3.7 gains the re-point as a post-condition, and the check imports the tokenizer rather than mirroring it |
| E14 | 1.4, 1.7, 2.3 | **The diagnosis in this row was wrong and correcting it changes the fix.** The row said Windows long paths break a fresh clone and cited `literature/power-and-thermal/ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md` failing to check out. **That file is not the problem and it checks out fine.** It is on disk in this working copy now at 160 absolute characters with `core.longpaths` unset. The Step 0 clone that failed was made into the session scratchpad, whose root is 147 characters in its 8.3 form; the repository root here is 55. **The observation was recorded without the conditions under which it was observed**, and a successor reading the original row would have shortened the leaf and left the cause. The real constraint is a two-ended path budget, not a filename-length rule, and it does not depend on `core.longpaths`. The Engineer bisected the limit at 1.7: 259 absolute characters pass, 260 fails. **Still unpinned:** three different figures are on record for the scratchpad root (158 from The Engineer, ~147 from The Manager, 147 measured by The Designer and again by the orchestrator) and none states which path form it measured. The orchestrator measures 147 for the 8.3 form and 151 for the long-username form, neither of which is 158. Against 147 the budget holds with slack; against 158 it is over before a filename is written. **Back to 1.7 to pin the root figure and restate the budget against it.** | Original claim observed on a fresh clone during Step 0, conditions unrecorded. Corrected by The Engineer at 1.7 by bisection and re-clone; the residual conflict found by The Designer at 1.12; both re-verified by the orchestrator. | OPEN, **and reopened wider than it was.** 1.7 pins the root figure and the budget; 1.4 still sets `core.longpaths` in the bootstrap, now as belt-and-braces rather than as the fix. **Instance 9 of the E16 class**, extended from counts to measurements |
| E15 | 1.4, 6.6 | **The first-run sequence plays against an enumerated list, not against "fully succeeded."** Ruled at 0.5: the sequence plays when every load-bearing path verified and no mode is in force that makes an answer refuse. Three of the six degraded modes block — *offline*, *present but wrong*, *partially acquired* — because in each of them the system cannot answer. Two do not block — *moved on* and *dirty or locally diverged* — because a system that works and is a week stale still works, and the condition is reported rather than hidden. *Missing but recoverable* resolves to success or to offline and is never itself a state at that phase. Order: sequence first, then the status line on its own plain line, never folded into the haiku. | The Systems Engineer at 0.5, adopting The Writer's reading with one change: the blocking set is a **named, enumerated list of modes in the bootstrap contract**, so 6.1 can assert it by construction — dirty the working copy and assert the sequence plays; make `origin` unreachable and assert it does not. A gate phrased "fully succeeded" cannot be tested, which is how it acquired the defect. | OPEN. 1.4 carries the enumeration and 6.6 consumes it. 6.7 currently asserts that the sequence plays "only after a fully successful bootstrap" and must be restated against the list. (His file heads this ruling 6.8; ARCH-8 maps to sub-step **6.6**, and 6.8 is the beat outline, so the ruling lands at 6.6.) |
| E16 | 1.12 | **This project generates counts faster than it records their counting rules.** Three of the Fact-Checker's six UNSUPPORTED findings are numbers stated without the rule that produced them, and a fourth is a denominator nobody can reconcile. The Manager ruled at 0.7 that this is one common cause rather than four incidents. The echo site registry has a "what exactly is counted" column; it is not where counts are born, so a number reaches the prose before it reaches the registry. Demonstrated by the registry itself: it still read `89 / 6` after the gameplan had been corrected to 87 of 95. | The Manager at 0.7, from the Fact-Checker's UNSUPPORTED class. | **ADDRESSED at the Step 1 open. Now sub-step 1.12**, the counting-rule contract, authored by The Designer and reviewed by The Software Engineer for mechanizability. Open until 1.12 lands |
| E17 | 1.0 | **The gameplan becomes a cold session's operating contract when Step 1 opens, and nothing schedules a re-read against that reader.** The Manager holds his F1 ruling that the TDD precondition did not fire on Step 0, and names what it cost: the Designer's "works as a briefing, fails as a worklist" is exactly the defect an audience-comprehension test would have caught before the document reached 806 lines. He declines to reopen F1 as retroactive ceremony. | The Manager at 0.7, against his own ruling. | **ADDRESSED at the Step 1 open. Now sub-step 1.0**, numbered ahead of 1.1 rather than appended, because a worklist whose numbering disagrees with its execution order commits E17's own defect. It discharges the TDD precondition for Step 1. Open until 1.0 lands |

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

Answers are wanted at the 0.8 gate. None of them block Step 0 from running. Each changes what Steps
1 through N look like, so the team drafts against a stated assumption and says which assumption it
used.

1. ~~**How does the Japanese Miracle corpus reach a clean clone?**~~ **Closed by the author,
   2026-08-26.** The corpus comes here. Summaries are pushed as this repository's own work; the 112
   source PDFs stay on the author's disk and are never pushed. See the directory map.
2. ~~**Is Lunar Oracle public?**~~ **Closed by the author, 2026-08-26. Yes, public.** The directory
   map already assumed it and does not change. Three consequences now fixed rather than assumed:
   the README is written for a stranger who cloned the repository, not for the author; the merged
   corpus needs a licence statement of the kind `lsei/NOTICE.md` carries, stating that the
   dedication covers this project own summaries and cannot cover the sources they describe; and
   Open Question 8 (extracted source text in any summary) was expected to become load-bearing here.
   It did not: the answer was measured and then corrected, and **it does not gate the public
   release** — see Open Question 8 and loose end A4. One inherited constraint
   dissolves: `signs_of_ai_writing.md` is CC BY-SA 4.0 and cannot sit under a public-domain
   dedication, but it lives in `cr-agents/`, which is a working copy and is never pushed, so this
   repository does not inherit the problem the Scenario Explorer NOTICE file exists to solve.
3. **Are the working copies pinned or floating? ANSWERED IN THE PLAN at sub-step 1.6; the author
   ratifies rather than decides from scratch.** The Systems Engineer ruled "neither as stated":
   record the ref, float the checkout, compare at bootstrap, report drift, automate nothing. What
   follows is the reasoning he ruled on.

    Floating on main means the app is always current
   and an upstream change can break the Oracle silently. Pinning means a commit to bump, which is
   the re-committing the author asked to avoid, though it is one line rather than a 900 KB file.
   The Systems Engineer argues both sides at 0.2.
4. **How much team does one question buy? ANSWERED IN THE PLAN at sub-step 3.9.** The Software
   Engineer's rule is that the verdict selects the wave: an app-computed answer or a refusal buys
   zero personas, because a refusal must stay cheaper than an answer or the system learns to answer;
   a literature answer buys one, chosen by field label; a contested claim buys exactly two, briefed
   on one side each, because a single agent handed both sides will synthesize and synthesis is the
   arbitration the register exists to prevent. What follows is the question as originally posed.

    Running the full roster in three waves for every user
   question is the method applied literally. (The "nine personas" quoted at 0.2 has no authority
   anywhere: the CR-Agents roster is twelve standing personas plus The Recruiter, and The Growth
   Economist makes fourteen. Nine is neither the roster nor a defined wave size, and whether there
   is a default wave size at all is part of what is being asked here.) It is probably wrong for a
   question typed into a chat window. The Software Engineer proposes the shape at 0.2: a tiered loop, a default wave, or
   something else.
5. **Does the app remain the sole computational authority once the corpus is larger than it?
   ANSWERED IN THE PLAN at sub-step 3.1, and three personas agree.** Yes, and the boundary must be
   mechanically enumerable rather than asserted; a coefficient's status field is part of what the app
   computes; and the app's authority should get smaller and sharper rather than larger. See loose end
   D3, where all three positions are recorded. What follows is the question as originally posed.

    The
   prototype's rule is that a question the app can answer is answered from the app. The merged
   corpus contains economics the app does not model at all. The boundary needs restating for the
   grown-up version. A Systems Engineer question with The Manager (economics prompt)'s input.
6. ~~**Does the rest of the Japanese Miracle folder follow the corpus here?**~~ **Closed by the
   author, 2026-08-26.** The FA1 through FA8 deliverables and their source lists come over; they are
   now at `_intake/japanese-miracle/fa/` (19 files, including `FA1-mechanism-table.md`, which The Manager
(economics prompt) reports is the existing draft of the transfer test this project was about to
   rebuild from scratch). The rest stays: the New Space article, the model versions, the old
   `cr_scratch`. **The 19 files verify; "the rest stays" does not, from here.** What remains in the
   Japanese Miracle folder cannot be checked from this repository, and two files that did come over
   — `_intake/japanese-miracle/JM-gameplan.md` and `JM-accumulator.md` — appear in neither list
   above. The inventory of what came and what stayed is owed. **What remains open is not whether but how.** The Manager (economics prompt) ruled at 0.2
   that an FA deliverable is not the same kind of object as a summary: a summary's warrant is that
   every claim resolves to one source, while an FA deliverable is a cross-source adjudication with a
   verdict column and arithmetic present in no source. Merging them into `literature/` breaks the
   resolution-grade guarantee silently, for files that look identical to their neighbours. His
   recommendation is two corpora with two contracts. That is a taxonomy decision and it belongs to
   The Engineer at integration.
7. ~~**Copy or move?**~~ **Closed by the author, 2026-08-26.** Both copies stay until the merge
   lands and `literature/` is verified. Revisit then. The known-good original is worth 363 MB of
   sync while the merge is still being designed.
8. **Do any corpus summaries contain extracted source text? ANSWERED, AND THE FIRST ANSWER WAS
   OVERSTATED. It does not gate the public release.** The Engineer's measurement is sound and his
   classification of it was not, and the orchestrator repeated the classification without checking
   it. Corrected on 2026-08-26 by reading the flagged files.

   **What is true:** four summaries reproduce verbatim text from their source's printed abstract.
   Four is the corrected count, and loose end A4 carries the single account of how an earlier count
   of thirteen was arrived at; it is not restated here. **What is false:** that those four pass the
   text off as the project's own writing. Three of the four are explicitly marked as quotation at
   the point of use. `gott-2024` carries the passage in quotation marks and closes it "(abridged, as
   printed on p.1)". `schreiner-2016` opens "(Transcribed from the paper.)". `romer-1990` opens
   "Author's own abstract (as printed):". Only `turyshev-2026` carries no marker, and at 12 percent
   overlap that is within what shared technical vocabulary produces without copying.

   **The convention is established and already public**, in a repository that has shipped under the
   Unlicense. How many summaries use it is not settled: the figure given at 0.2 was thirty-nine of
   the 152, and a grep at 0.5 for the four marker forms this entry itself names — "as printed",
   "transcribed from", "author's own abstract", "abridged, as printed" — returns **46**. Neither
   number is checkable, because neither was stated with its counting rule. What is not in doubt is
   that the convention is in use and public. A short attributed quotation of an abstract is ordinary
   scholarly practice, and the dedication does not reach it: the Scenario Explorer's own licence
   section already says the dedication "does not extend to the sources those summaries describe, and
   cannot."

   **What survives, and it is small.** The Scenario Explorer README's licence section ended "No
   third-party PDF, page image or extracted source text is in this repository," and that sentence was
   not accurate about its own corpus. It has since been corrected upstream (loose end A5), and Lunar
   Oracle must not copy the original. The corpus licence statement this project writes should say
   what is actually true: the summaries are this project's own work, they quote their sources where
   they say they do, and the dedication covers the former and not the latter. `turyshev-2026` gets a
   marker or a rewrite. **The Engineer's untested-summaries scope limit still stands** — 57 on the
   152-file basis, 63 on the 158-file pre-dedup basis, loose end A6 — as ordinary diligence rather
   than as a gate. It closes at 2.12.

   **Original wording, 1 of 2. The Engineer's report at 0.2, superseded by the correction above and
   retained as the record of the error.**

   > The Engineer ran `pdftotext` plus 10-gram shingle overlap across all 108 testable PDF-paired
   > abstracts, using the 9 self-declared transcriptions as a control. The control fired correctly
   > (Prettyman 100%, Levin 95.6%, McLeod 74%). Census: median 0.0%, twelve files at or above 10%,
   > of which **four are not self-labelled** (`gott-2024` at **79.8%**, `schreiner-2016` at 44%,
   > `romer-1990` at 38%, `turyshev-2026` at 12%). **Thirteen files reproduce a third-party printed
   > abstract.** Key-findings sections top out at 1.9%, so the body prose is this project's own; the
   > contamination is in the abstracts. Scope limit: **the 63 Scenario-Explorer-unique summaries
   > have no local PDF and were not tested.** The Engineer's recommendation is to rewrite the
   > thirteen rather than grow a NOTICE file, and his ordering is non-negotiable: the untested 63
   > get tested, then the contaminated set is cleared, **then** the repository goes public.
   > Escalated to the author.

   (The 108 in that paragraph is a second denominator for the same audit; the tool re-run at 0.5
   tests 103. Which population the 108 counted is unreconciled — see loose end A4.)

   **The Systems Engineer's earlier partial finding, which stands.** He found three files carrying
   full third-party source text from the directory listing alone, before anybody opened a summary:
   `un-1967-outer-space-treaty.txt`, `un-1972-liability-convention-space-objects.txt` and
   `un-1979-moon-agreement.txt`. The enforcement hole is closed (see the progress log and loose end
   A1), so they cannot ship. Treaty texts are a benign instance, since UN treaty text is not under
   copyright, but the finding stands: the corpus carries non-summary source material and the
   allow-list did not know about it. His finding's own closing line — that The Engineer's sample of
   the summaries was still outstanding — was superseded by the audit above and is not carried
   forward.

   **Original wording, 2 of 2. The question as first posed, retained as the record.**

   > Raised by The Manager, and it is the one question that could stop a public release. The
   > Scenario Explorer's licence is explicit that a public-domain dedication covers this project's
   > own summaries and cannot cover the sources those summaries describe. If any summary reproduces
   > source text rather than summarizing it, that file is not ours to dedicate. Assigned to The
   > Engineer at 0.2 as part of the merge audit; escalates to the author at 0.8 if the answer is yes.
