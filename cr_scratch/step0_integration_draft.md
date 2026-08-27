# Step 0.3 — Integration: the drafted gameplan, Steps 1 through 7

**Date:** 2026-08-26
**Sub-step:** 0.3, orchestrator
**Inputs:** the five Wave 1 files in `cr_scratch/`, `step0_manager_open.md` (§1, 3, 5, 8, 9),
`step0_dedup_decisions.md`, and `lunar-oracle-gameplan.md` (design intent, directory map,
objectives, loose ends register).
**Status of this file:** draft for the register wave (0.4) and Wave 2 (0.5). Not the gameplan.

This is a reconciliation, not a sixth opinion. Where two agents proposed the same mechanism from two
directions, the mechanisms are consolidated and the consolidation is recorded in the ID mapping
table. Where two agents took opposing positions, both positions stand and neither is picked.

---

## 1. How this plan is numbered

**Read this section first; the rest of the file assumes it.**

**The plan is seven steps, and each step contains sub-steps numbered `N.M`.** Step 1 holds 1.1
through 1.11, Step 2 holds 2.1 through 2.18, and so on to Step 7. The seven groupings *are* the
steps; the seventy-two items inside them *are* the sub-steps. This is the shape Step 0 itself ran
in, with sub-steps 0.1, 0.1b, and 0.2 through 0.8. An earlier draft of this file called the
groupings "phases" and the items "steps," which sat one level off from this project's method
numbers. That numbering is gone from this file; §7 is the record of what changed.

**The one-step gate fires at step boundaries, and only there — seven times.** It does not fire
between sub-steps. A sub-step boundary is an ordering fact; a step boundary is a decision that is
genuinely the author's to make. Every step below therefore carries a **closing statement** naming
concretely what exists when that step is done, because that statement is what the author is
approving at that gate.

**Origin IDs are kept, in their own column, and they are load-bearing.** Every sub-step carries an
`ARCH-` / `LOOP-` / `MERGE-` / `LUNAR-` / `ECON-` / `WRITE-` / `GATE-` tag. That tag is what maps
the sub-step back to the Wave 1 file that authored it, and those files are on disk and will be read
again; without it the five source documents are unnavigable. Two Wave 1 agents both numbered their
steps `SE-`, and the collision (loose end E2) is fixed by prefixing each agent's original number:

| Agent | Agent-authored ID | Origin prefix |
|---|---|---|
| The Systems Engineer | `SE-1` .. `SE-9` | `ARCH-` |
| The Software Engineer | `SE-1` .. `SE-11` | `LOOP-` |
| The Engineer | `M1` .. `M12` | `MERGE-` |
| The Space Resources Engineer | `SR-1`, `SR-1b`, `SR-2` .. `SR-9` | `LUNAR-` |
| The Growth Economist | `GE-1` .. `GE-12` | `ECON-` |

Sub-steps created at integration carry a letter suffix on the origin ID they belong to (`ARCH-7a`,
`MERGE-5t` for a test stage) or a new prefix (`WRITE-`, `GATE-`).

**Dependencies are stated as `N.M (ORIGIN-ID)`**, so the execution position and the source trace are
both readable without a lookup. Where a sub-step's own description names another sub-step it does so
by origin ID alone, and §7's mapping table resolves any origin ID to its `N.M`. No agent-authored ID
(`SE-`, `M`, `SR-`, `GE-`) survives anywhere in this file outside §7.

---

## 2. The sub-step table

Status of every row is **Not started**. The step headings are the gate boundaries; within a step and
across steps, the dependency column is the contract.

### Step 1 — Rulings, contracts, and the enforcement layer. Nothing moves until these land.

**Closing this step delivers** a corrected `.gitignore` whose `git check-ignore` fixture list
passes; the author's two rulings — the FA1–FA8 corpus contract, and C4 on `verify_report.js`; and
six frozen written contracts: the answer contract, `oracle/bootstrap_contract.md`, the install-state
record schema, the working-copy currency policy, `literature/NAMING.md`, and the contested-claims
register schema in one ratified encoding — plus both register row sets authored against current
paths and the answering-loop test suite. Nothing has moved on disk. At this gate the author is
approving the contracts every later sub-step is written against.

| Sub-step | Origin ID | What it does | Assigned To | Depends on |
|---|---|---|---|---|
| 1.1 | ARCH-1 | Correct the enforcement layer and propose the map rows it lacks. Anchor `/cr-agents/` and `/lsei/`; keep `literature/` deny-by-default admitting `*.md` only; add a row for the machine-written install state file; add the `literature/_pdf/<taxonomy>/` row that resolves D6; state the `_intake/` exit criterion; state the non-row for `CSA_LSEI_Workshops`; rule whether `cr_scratch/` grows or is archived per step. Acceptance is a `git check-ignore` fixture list covering `.pdf`, `.PDF`, `.docx`, `.txt`, `.md`, nested, `literature/lsei/x.md`, `deps/`, and the state file, asserted on a case-sensitive filesystem. Correct the stale `deps/` reference in `accumulator.md`. | The Systems Engineer (propose), Orchestrator (apply), the author (rules the map) | — |
| 1.2 | ECON-12 | **Rule on the FA1–FA8 corpus contract: one corpus or two.** The Growth Economist's Part 6 verdict is that an FA deliverable is a cross-source adjudication carrying a verdict column and arithmetic present in no source, and that merging it into `literature/` breaks the resolution-grade guarantee silently for files that look identical to their neighbours. If the author rules them in, the taxonomy gains a derivation grade **before** MERGE-4 freezes. If out, this repository holds two corpora with two retrieval contracts and ECON-8 is a rebuild rather than a port. Exhibits: `FA1-mechanism-table.md` and `FA2-verdict-table.md` headers. | The author (rules), Orchestrator (escalates at the 0.8 gate with exhibits) | — |
| 1.3 | LOOP-1 | Freeze the answer contract. One page naming the six verdicts, the three trace grades as a closed set, the deliverable-is-a-file rule, and the run log's six outcomes. Every later suite and every later mechanism is written against this artifact. | The Software Engineer | — |
| 1.4 | ARCH-2 | Write the bootstrap contract as a specification, `oracle/bootstrap_contract.md`: seven phases, six degraded modes, the refusal rule for the offline case, the push-disable, the verification assertions, `core.hooksPath` installation, and the statement that phases 1–6 are idempotent while phase 7 runs once. A specification, not prose with a reader — it is the thing ARCH-6's suite tests. | The Systems Engineer (write), The Software Engineer (review for testability) | 1.1 (ARCH-1) |
| 1.5 | ARCH-3 | **Define the single install state record: one file, one schema, four consumers.** Root-level, machine-written, gitignored. Fields at minimum: schema version; the ref each working copy was last verified against (ARCH-4); the corpus provenance digest the divergence check compares against (ARCH-5, MERGE-11); whether source PDFs are present in this install; the first-run flag with timestamp and bootstrap-completed boolean (ARCH-8). Specify the three abnormal reads: absent (treat as first install), corrupt (report, rewrite, never crash), written by a future schema version (report and refuse). **This step is the object of falsifier 2 and it is the only place any of these four facts is written.** | The Systems Engineer (write), The Software Engineer (review) | 1.4 (ARCH-2) |
| 1.6 | ARCH-4 | Working-copy currency policy: record the ref, float the checkout, compare at bootstrap, report drift, automate nothing. Includes the drift report's content, the prohibition on auto-reset and auto-bump, the statement that drafting assumption A3 expires the moment the loop computes its first number, and the requirement passed to LOOP-1 that an answer's trace carries the app ref. **Also carries the C4 ruling:** `verify_report.js` is an unlisted dependency of three LOOP mechanisms living in a floating working copy — vendor it into `oracle/` with a recorded sha, or pin that one file. | The Systems Engineer (write), The Engineer (review), the author (rules C4 with Open Question 3) | 1.5 (ARCH-3) |
| 1.7 | MERGE-1 | Freeze the naming rule and the source-identifier rule. Write `literature/NAMING.md`: the normalization rule (lowercase; each run of `_` or space to a single `-`; collapse repeats; strip `.md`), the `^[a-z0-9]+(-[a-z0-9]+)*\.md$` regex, the author-year-topic convention, the semantic-disambiguation rule (a numeric suffix is not disambiguation), and the dedup-key precedence DOI → article URL → author/year/title. If ECON-12 rules two corpora, this file states both namespaces. Nothing lands before it exists. | The Engineer | 1.2 (ECON-12) |
| 1.8 | LOOP-2 | Ratify the contested-claims register schema **and its single encoding**. Columns/fields, `match_keys` as the load-bearing join, the three register classes, and one worked example axis. **Integration consolidation:** three Wave 1 drafts proposed three encodings for one register (a sidecar TSV, a YAML under `literature/_registers/`, and per-file front matter). This step picks one sidecar format plus one in-file block format and nothing else; the domain personas own contents, The Engineer owns survival as corpus structure, The Software Engineer owns the assertion that consumes it. | The Software Engineer, with The Growth Economist, The Space Resources Engineer, The Engineer | 1.3 (LOOP-1), 1.7 (MERGE-1) |
| 1.9 | LUNAR-2 | Author the fifteen lunar register rows **against current `lsei/literature/` paths**, before the merge. This is The Space Resources Engineer's own mitigation for the hazard he flagged: the register is a prerequisite for the retrieval invariant, and if it waits for the merge the Oracle can be made to answer before it can be made not to answer one-sidedly. The content is already drafted in his §5.4; this step needs paths, not thought. | The Space Resources Engineer | 1.8 (LOOP-2) |
| 1.10 | ECON-1 | Author the seventeen economics register rows against current paths, each with `register_side`, `register_lean` and `register_class` (`two_sided` / `false_pair` / `one_sided`). Same pre-merge mitigation as LUNAR-2. | The Growth Economist | 1.8 (LOOP-2) |
| 1.11 | LOOP-3 | **TEST SUITE, the answering loop.** `tdd_method.md` Prompt 1 applied to a loop rather than a document. Levels 1 and 2 — fixture questions asserting verdicts and grades, plus invariants over any question — minus the register fixtures, which do not exist yet. Every quantitative test names the primary source it validates against, per `lit_review: yes` and A.10 step 2. Reviewed and made the contract before any loop code is written. | The Software Engineer | 1.3 (LOOP-1) |

### Step 2 — Corpus identity, taxonomy, and the merge (Objective 1)

**Closing this step delivers** `literature/`: every union file present with a `## Provenance` block,
a machine-readable field label and a taxonomy placement; zero PDFs tracked; the Scenario Explorer
source PDFs landed under `literature/_pdf/<taxonomy>/`; the contested-claims register landed in the
single ratified encoding; the Open Question 8 contamination audit reported to the author; the PDF
containment mechanism installed; and `oracle/verify_corpus.js` reporting corpus state, upstream
divergence included. At this gate the author is approving that the merged corpus is now the corpus.

| Sub-step | Origin ID | What it does | Assigned To | Depends on |
|---|---|---|---|---|
| 2.1 | MERGE-2 | Build the source-identity table. For every union file, extract the `## Citation` / `## Provenance` block, parse DOI or publisher URL, emit `cr_scratch/merge_identity.tsv` with `file, corpus, identifier, identifier_kind, confidence`. Flag every file with no identifier for MERGE-3. **Deliverable: the recomputed union-by-filename count and the true distinct-source count, replacing every provisional number in §8.** | The Engineer | 1.7 (MERGE-1) |
| 2.2 | MERGE-3 | Resolve the duplicate set. For every author-year collision group and every identifier collision from MERGE-2, decide same-source or different-source; for same-source assign primary/secondary and a semantic filename. Two summaries are never merged into one and neither is deleted. Where they disagree on a number, emit a `DUP-xx` register row instead of adjudicating. Consumes `cr_scratch/step0_dedup_decisions.md` and `_intake/superseded-duplicates/`, which carry D7: the two adjudicated pairs are a deferred union, not a resolved tie. | The Engineer, escalating substantive numeric conflicts to The Space Resources Engineer or The Growth Economist | 2.1 (MERGE-2) |
| 2.3 | MERGE-4 | Land the taxonomy: eleven top-level folders, one level deep, per The Engineer's Part 2. Assign every file. Record second memberships as `- **Also:**` and emit `literature/INDEX.tsv` (`path`, `primary`, `also`). **A machine-readable field label per file is a hard requirement of this step, not a preference** — B3's pooled-IDF break cannot be fixed without it. If ECON-12 ruled the FA deliverables in, the taxonomy carries a derivation grade. Reviewed before anything moves; a taxonomy revised after placement is a second migration. | The Engineer, reviewed by The Space Resources Engineer (the seven lunar folders) and The Growth Economist (the four economics folders) | 1.7 (MERGE-1), 1.2 (ECON-12) |
| 2.4 | MERGE-5t | Write the merge assertions before the merge runs: union count in, at least that many out, zero `.pdf` under `literature/`, zero filename collisions under case-insensitive comparison (this is what catches A7, `GDP.md` against `gdp.md`), every output file carrying a `## Provenance` block and a field label. | The Engineer | 2.2 (MERGE-3), 2.3 (MERGE-4) |
| 2.5 | MERGE-5 | **Execute the merge.** Copy, do not move. Case-insensitive collision detection, mandatory. Apply MERGE-3's dispositions. Emit a `## Provenance` block into every file. `_intake/japanese-miracle/lit/` empties. Output: `literature/`, zero PDFs. | The Engineer | 2.4 (MERGE-5t), **1.1 (ARCH-1)** |
| 2.6 | MERGE-6 | Normalize the house format. Insert `## Metadata` into the files lacking it, populated from their own `## Citation` paragraph; drop the `## Comprehensive Technical Summary` marker from the files carrying it; leave the `## Provenance`-form files alone. Half a step — The Engineer measured the two formats and they already agree, so there is no rewrite pass. | The Engineer | 2.5 (MERGE-5) |
| 2.7 | LUNAR-8 | Stamp programme-state currency. Every source whose content is a programme-state snapshot rather than a measurement carries a `stated_as_of` field, and the Oracle prints it. `programme-primaries/` in full, the CLPS timeline, the LSIC newsletters, the M2M architecture document. | The Engineer at merge, The Fact-Checker at review | 2.6 (MERGE-6) |
| 2.8 | ECON-2 | Add a `provenance_depth` field to every economics summary: `primary`, `via_review`, `via_tertiary`. At minimum `may-1977`, `simonis-1979` and `henderson-2008` are not primary, and between them they are the corpus's only route to the Denison and Chung decomposition. | The Engineer (write), The Growth Economist (assign values for the corpus-unique files) | 2.6 (MERGE-6) |
| 2.9 | ECON-3 | Rule on whether the Denison and Chung 1976 monograph is acquired. Either acquire and summarise it, or mark the register row permanently `neither` and hard-block any answer stating a Denison figure without the review label. | The Growth Economist (recommends), the author (rules at a gate) | 2.8 (ECON-2) |
| 2.10 | MERGE-7t | Write the PDF-pull assertions first: every landed PDF has a summary; zero files land from `_QUARANTINED_prior_art/`; byte count at or under 250 MB, because a pull materially larger than the estimate means the rule over-fired and pulled orphans. | The Engineer | 2.5 (MERGE-5) |
| 2.11 | MERGE-7 | Pull the Scenario Explorer source PDFs. Execute the tiered rule against `CSA_LSEI_Workshops/context/reference/lit/`, excluding `_QUARANTINED_prior_art/`: exact filename, then unique author-year token, then a hand queue resolved against each summary's own citation block via `pdftotext -l 1`. Land them in `literature/_pdf/<taxonomy>/` per ARCH-1's map row. Record every pairing in `## Provenance`. Emit the orphan list. Read no content from that tree beyond first pages in the hand queue. | The Engineer | 2.10 (MERGE-7t), 1.1 (ARCH-1) |
| 2.12 | MERGE-8 | Complete the Open Question 8 audit. Re-run the shingle detector over the Scenario-Explorer-unique summaries that had no local PDF before MERGE-7 — this is loose end A6, and it is the only thing that closes it. Flag every file at or above 10% verbatim with `- **Licence:** contains-transcribed-source-text`. **Report to the author; do not act on the result.** | The Engineer | 2.11 (MERGE-7) |
| 2.13 | MERGE-9t | Write the containment assertions first: the check rejects `x.pdf`, `x.PDF`, `x.pdf.bak`, a `%PDF` file named `.md`, and a 600 KB `.md`; it accepts the real corpus unchanged. | The Software Engineer | 2.5 (MERGE-5) |
| 2.14 | MERGE-9 | Build the PDF containment mechanism. Repository-wide `*.pdf` plus the other source-carrying extensions in `.gitignore`; `oracle/check_no_sources.js` with extension, size and `%PDF` magic-byte gates, committed; installed via `core.hooksPath` by the bootstrap. **A git hook is not a mechanism, because hooks are not cloned** (loose end E1) — the committed script plus the bootstrap wiring is the mechanism. | The Software Engineer, with The Systems Engineer for the bootstrap half | 2.13 (MERGE-9t), 1.4 (ARCH-2) |
| 2.15 | MERGE-10t | Write the register assertions first: every register path resolves; every id has at least two rows; every in-file block round-trips against the sidecar; every member of a near-duplicate filename cluster named by a row is present (B4). | The Software Engineer | 2.5 (MERGE-5), 1.8 (LOOP-2) |
| 2.16 | MERGE-10 | **Land the contested-claims register into the merged corpus, in the single encoding LOOP-2 ratified.** Rebind LUNAR-2's and ECON-1's rows from `lsei/literature/` paths to `literature/` paths; add MERGE-3's `DUP-xx` rows; generate the in-file block into every member file; expand every author-year cluster so a row names every member rather than the one that tokenizes best. **Integration consolidation:** this single step replaces three Wave 1 landing steps that would otherwise have produced three register artifacts. | The Engineer, contents from The Space Resources Engineer and The Growth Economist, encoding from The Software Engineer | 2.15 (MERGE-10t), 2.2 (MERGE-3), 1.9 (LUNAR-2), 1.10 (ECON-1) |
| 2.17 | MERGE-11 | Build `oracle/verify_corpus.js`, **the single tool that reports corpus state**: naming conformance, provenance completeness, duplicate identifiers with no primary/secondary call, register integrity, dangling source-file paths, and **the upstream divergence check** — the comparison of upstream filename set and content hashes against the provenance digest held in ARCH-3's state record. Reports; never writes; re-runnable. **Integration consolidation:** The Engineer and The Systems Engineer each proposed a drift check; this is one tool, not two, and The Engineer's own interface note asked for exactly that. | The Engineer, with The Systems Engineer on the divergence half | 2.5 (MERGE-5), 2.16 (MERGE-10), 1.5 (ARCH-3) |
| 2.18 | ARCH-5 | Corpus fork policy: the rule that provenance names an upstream ref, that the bootstrap runs MERGE-11's divergence check, and that divergence is **reported as a finding and never auto-merged**. Carries the `--lit` requirement (loose end C3): any invocation of prototype tooling in place must name our corpus explicitly, and the suite asserts which corpus was used. The policy is this step; the check is MERGE-11. | The Systems Engineer (policy), The Engineer (provenance format) | 1.5 (ARCH-3), 2.17 (MERGE-11) |

### Step 3 — The app boundary and retrieval (Objectives 3, 5)

**Closing this step delivers** an app boundary derived from the artifact with both reachability gaps
closed — `OUTPUT_LEXICON` complete, `valueModel()` extracted; `oracle/question_classes.json`, the
three-outcome exclusions matcher and `oracle/thin_patches.json` shipped as data rather than prose;
retrieval rebuilt field-scoped with its confirmation threshold reset from a labelled question set;
and the classifier and wave selector routing every question class. At this gate the author is
approving how the Oracle decides what a question is and where its answer may come from.

| Sub-step | Origin ID | What it does | Assigned To | Depends on |
|---|---|---|---|---|
| 3.1 | LUNAR-7 | Audit the app boundary against the artifact. Before the boundary table becomes a routing contract, read `lsei/index.html`'s data island and confirm the reachable outputs, the 24 coefficient rows and their status strings, and the three preset labels. The boundary table is derived at build time rather than typed into a file, because the working copy floats. | The Space Resources Engineer, verified by The Fact-Checker | 1.4 (ARCH-2) |
| 3.2 | LUNAR-1b | Close the two reachability gaps, which are loose ends C1 and C2. (a) `OUTPUT_LEXICON` names eight of the twenty-six keys `model()` returns, so `cap`, `Wpower`, `Wthr`, `mPwr`, `Rcap` and `regime` fall through to a literature search instead of resolving to the app; extend it and add a test that fails when the app gains a return key the lexicon does not name. (b) `app_model.js` extracts `model()` and not `valueModel()`, so the app's entire economic half — `r_prop`, `r_const`, `margin_*`, `value_*`, `Dstar_prop`, `ranking` — is unreachable by any APP verdict; extract it the same way. Until this lands, every economics question the app can compute is answered from a literature summary, which is the inherited authority rule being violated by the mechanism built to enforce it. | The Software Engineer, output keys confirmed by The Space Resources Engineer | 3.1 (LUNAR-7) |
| 3.3 | LUNAR-1 | Ship the question-class register, `oracle/question_classes.json`: the ten question classes with routing tier, the app-address test that decides tier membership, and each class's fallback. The router consumes it before retrieval, per classification-before-retrieval. | The Space Resources Engineer (content), The Software Engineer (mechanism) | 1.3 (LOOP-1), 3.1 (LUNAR-7) |
| 3.4 | LUNAR-4 | Extend the exclusions matcher to three outcomes: EXCLUDED-THEN-CORPUS, EXCLUDED-THEN-THIN, EXCLUDED-BUT-ADJACENT, with the three adjacency pairs (`propellant-mass-leverage`/`net-value-identity`, `mars-campaign-conditional`/`avoided-cost`, `grade-independent-demand`/`offtake-record`) shipped as data rather than prose. Closes loose end C5. | The Software Engineer, content from The Space Resources Engineer | 3.3 (LUNAR-1) |
| 3.5 | LUNAR-5 | Ship the thin-patch register, `oracle/thin_patches.json`: ten entries, each with trigger tokens, what is absent, and the nearest real evidence. A question landing in a thin patch refuses by substitution rather than answering from an adjacent file. | The Space Resources Engineer (content), The Software Engineer (mechanism) | 3.3 (LUNAR-1) |
| 3.6 | LOOP-4t | Build the labelled question set that LOOP-4 tunes against: lunar, economics and cross-field questions with expected outcomes. Re-tuning a threshold without one is guessing. This set is a test artifact and it is built before the thing it tests. | The Software Engineer | 1.11 (LOOP-3), 2.16 (MERGE-10) |
| 3.7 | LOOP-4 | **Rebuild retrieval.** Field-scoped IDF (B3); confirmation threshold set from LOOP-4t's fixture set rather than by hand, because 0.45 was tuned on a single-field 156-file corpus and has no standing at the merged size (B2); no silent truncation; identity anchor gated on field match; `citationForFile`'s false corpus-size string removed; return contract extended to a `bestSet` covering all members of a matched register id. `listCorpusFiles` and `requireNonEmptyCorpus` carried over verbatim. **Integration consolidation:** The Engineer's re-tuning step and The Software Engineer's rebuild step are the same work approached from two sides; they are one step with two owners. | The Engineer and The Software Engineer jointly | 3.6 (LOOP-4t), 2.6 (MERGE-6), 2.16 (MERGE-10) |
| 3.8 | LOOP-5 | Build the classifier with three retrieval modes: register axis → CONTESTED, app address resolves → APP/FIGURE, exclusions declare it → REFUSE, otherwise LITERATURE. Never two modes for one sub-claim; never a second retrieval to repair a first. Delete the prototype's lexicons and `decomposeSubClaims` — their entire justification was that no model was in the loop, and A4 removed it. The static call-graph assertion is this step's own post-condition, not a deferred check. | The Software Engineer | 1.8 (LOOP-2), 3.7 (LOOP-4), 3.3 (LUNAR-1), 3.2 (LUNAR-1b) |
| 3.9 | LOOP-6 | Wire the wave selector: the verdict the router already computes selects the wave. APP/FIGURE and REFUSE buy zero personas; LITERATURE and BOTH buy one, selected by field label; CONTESTED buys exactly two in parallel, one per side, each briefed on one side only and neither seeing the other; a cross-field question buys the two domain personas; a request for a document buys the full A.4 loop. The composition step has no licence to pick a side. | The Software Engineer | 3.8 (LOOP-5) |
| 3.10 | ECON-7 | Promote the app's ten excluded nodes to first-class retrieval objects, each with its own refusal record carrying the app's own exclusion prose, **regenerated from the app at build rather than transcribed**, because a transcription of a floating working copy is a copy that drifts. `grade-independent-demand` is the load-bearing one. | The Systems Engineer (owns, it is the app-authority boundary), The Software Engineer (retrieval), The Growth Economist (states why demand matters most) | 3.4 (LUNAR-4), 3.8 (LOOP-5) |

### Step 4 — Invariants, the transfer gate, and going corpus-live

**Closing this step delivers** the register fixtures, the three-class retrieval invariant, the
reference-class rule, the transfer gate specified, tested and implemented, and the fourteen-question
lunar acceptance set passing — and, as this step's gate itself, the corpus-live decision previously
carried as GATE-1: the register has landed, retrieval is field-scoped and re-tuned, the classifier
reads the register before retrieval, the register fixtures pass, and the three-class invariant
holds, so the answering loop may be pointed at `literature/` instead of running against
`lsei/literature/` with `--lit` named explicitly. At this gate the author is approving the
containment of B1, the single most important finding of Step 0.

| Sub-step | Origin ID | What it does | Assigned To | Depends on |
|---|---|---|---|---|
| 4.1 | LOOP-7 | **TEST SUITE AMENDMENT: register fixtures.** One fixture per register axis plus the deletion decoy. Goes through A.10 step 5's revision gate because it modifies a suite that is already the contract, and through step 2's source-verification gate because each fixture cites a summary. Kept separate from LOOP-3 deliberately: the register does not exist at LOOP-3 time, and fixtures written against an imagined schema are the exact defect `verify_figure.js` recorded. | The Software Engineer | 1.11 (LOOP-3), 2.16 (MERGE-10), 1.8 (LOOP-2) |
| 4.2 | ECON-6 | Extend the retrieval invariant to three register classes. `two_sided` returns both sides or refuses; `false_pair` returns all members with a level-naming or condition-naming note and must not be presented as a dispute; `one_sided` returns the single side plus an explicit statement that the corpus carries no counter-source. The Recruiter's one-line invariant is correct for the first class and produces new errors on the other two. | The Software Engineer (specify and test), The Growth Economist (classify) | 4.1 (LOOP-7), 1.10 (ECON-1) |
| 4.3 | ECON-10 | Add the reference-class rule to base-rate answers: any answer using an empirical base rate for a lunar growth or cost projection returns both the country class (`pritchett-2000`, `hausmann-2005`) and the megaproject class (`flyvbjerg-2014`) and states which object the question is about. | The Software Engineer (invariant), The Growth Economist (rule) | 4.2 (ECON-6) |
| 4.4 | ECON-4 | Specify the transfer gate as an answering-loop stage. Any answer carrying a mechanism from the Japanese corpus into a lunar context emits a transfer verdict: `legitimate`, `illustration`, or `unknown`, naming the failing or unevaluable condition. `unknown` composes a refusal, not a hedge. The gate runs before answer composition, not as a post-hoc review. Specification only. | The Software Engineer (specify), The Growth Economist (supplies the verdict rules) | 1.10 (ECON-1), 3.9 (LOOP-6) |
| 4.5 | ECON-5 | Write the transfer-gate acceptance assertions, before the gate is built. At minimum: an answer citing `kiyota-2005` in a lunar-absorption context asserts `illustration`; `lewis-1954` in a lunar-labour context asserts `illustration`; `beckley-2018` on sponsorship asserts `unknown` and names the sponsor as the missing input; an answer quoting a TFP share without a named decomposition fails. Each assertion names the primary source it validates against. | The Software Engineer (write), The Growth Economist (supplies the cases) | 4.4 (ECON-4) |
| 4.6 | ECON-4b | Implement the transfer gate in the composition path. Created at integration: The Growth Economist scheduled a specification and a suite and no build step, and a spec plus a suite with nothing between them is not executable. | The Software Engineer | 4.5 (ECON-5) |
| 4.7 | LUNAR-6 | Add the three-named-facts assertion to the acceptance suite: any answer carrying a quantitative ISRU figure names system boundary, scale, and maturity. Under `lit_review: yes` each such test names the primary it validates against. | The Software Engineer, reviewed by The Space Resources Engineer | 1.11 (LOOP-3) |
| 4.8 | LUNAR-9 | Build the lunar acceptance question set: fourteen questions with expected verdicts — one per question class, three register traps (Cabeus, capture efficiency, oxygen energy), two thin-patch traps (excavation forces, cryogenic cadence). Extends `lsei/oracle/fixtures/` rather than replacing it. | The Space Resources Engineer (questions and expected verdicts), The Software Engineer (harness) | 3.3 (LUNAR-1), 3.5 (LUNAR-5), 2.16 (MERGE-10) |

### Step 5 — The register split, enforced (Objective 4)

**Closing this step delivers** `verify_haiku.js` and `verify_register.js` installed, each with
`--prove` decoys built by mutating real produced output; `verify_answers.js` counting all six
run-log outcomes; and a fault-injection pass in which all four decoys apply against the assembled
loop rather than against unit stand-ins. At this gate the author is approving that Objective 4 is a
mechanism rather than a prompt preference.

| Sub-step | Origin ID | What it does | Assigned To | Depends on |
|---|---|---|---|---|
| 5.1 | LOOP-8 | Build the register enforcement checks: `verify_haiku.js` on the orchestrator's turn and `verify_register.js` on the team deliverable, each with `--prove` decoys built by mutating real produced output rather than constructed strings. The two registers never share a channel: the team writes a file, the orchestrator reads it, and each side is checked on its own bytes. This is what turns Objective 4 from a prompt preference into a mechanism. | The Software Engineer | 1.3 (LOOP-1), and The Editor's prohibition text from 0.4 for the closed list |
| 5.2 | LOOP-9 | Extend `verify_answers.js` to six outcomes. Small, and last among the mechanism steps because the outcomes it counts must all exist first. | The Software Engineer | 3.8 (LOOP-5), 3.9 (LOOP-6), 5.1 (LOOP-8) |
| 5.3 | LOOP-10 | Fault-injection pass: four decoys run against the assembled loop rather than against unit stand-ins. A decoy that fails to apply is a failure, not a skip. | The Software Engineer | 5.2 (LOOP-9) |

### Step 6 — Bootstrap, first run, and the public-facing prose (Objectives 2, 5)

**Closing this step delivers** the bootstrap acceptance suite asserting all six degraded modes by
construction; `CLAUDE.md` and `README.md` each taken through all four TDD stages; the first-run
sequence built as mechanism and as content; and 6.15's release evidence assembled — every file the
contamination audit flagged cleared or marked, containment installed and asserted, the README landed
with its licence statement. At this gate the author releases the repository publicly, which is
irreversible and is why the gate is the author's.

Every prose deliverable below is staged: suite, outline, write, revise. A.4's precondition did not
fire on Step 0 and fires on all of these, per Manager finding F1.

| Sub-step | Origin ID | What it does | Assigned To | Depends on |
|---|---|---|---|---|
| 6.1 | ARCH-6 | **TDD stage: acceptance suite for the bootstrap, written before `CLAUDE.md` exists.** It asserts the degraded modes by construction rather than by inspection: rename `lsei/` and assert the session refuses a quantitative question; point `origin` at an unreachable URL and assert the offline path reports rather than falls back; dirty a working copy and assert nothing resets it; place a `deps/`-style stale path and assert the bootstrap does not populate it; run the prototype tool without `--lit` and assert the suite catches the wrong corpus. | The Software Engineer (suite design), The Systems Engineer (coverage list) | 1.4 (ARCH-2), 1.5 (ARCH-3), 1.6 (ARCH-4), 2.18 (ARCH-5), 2.14 (MERGE-9) |
| 6.2 | ARCH-7a | `CLAUDE.md`, stage 1: the document test suite. ARCH-6 covers behaviour; this covers the document. | The Software Engineer, with The Writer | 6.1 (ARCH-6) |
| 6.3 | ARCH-7b | `CLAUDE.md`, stage 2: topic-sentence outline, validated against ARCH-7a. | The Writer | 6.2 (ARCH-7a) |
| 6.4 | ARCH-7c | `CLAUDE.md`, stage 3: write. The bootstrap contract, the dependency clone, the read sequence, the first-run sequence. | The Writer | 6.3 (ARCH-7b) |
| 6.5 | ARCH-7d | `CLAUDE.md`, stage 4: revise. The Editor against `signs_of_ai_writing.md`; The Designer on the tree a cloner actually sees; The Systems Engineer on one narrow question stated in advance — does the prose implement ARCH-2's contract, or a friendlier contract the suite does not test. | The Editor, then The Designer, then The Systems Engineer | 6.4 (ARCH-7c) |
| 6.6 | ARCH-8 | First-run sequence **mechanism**: the gate, the fields read from ARCH-3's state record, the degraded-bootstrap suppression rule (a degraded bootstrap leaves the flag unset, because whimsy in front of a system about to refuse every question burns the one first impression), the second-machine behaviour (plays again, and that is correct), and the documented opt-out. Explicitly not the content. The mechanism decides whether the sequence plays; the content decides what it says; neither reaches into the other. | The Systems Engineer | 1.5 (ARCH-3), 6.5 (ARCH-7d) |
| 6.7 | WRITE-1a | First-run sequence **content**, stage 1: the suite. Asserts the haiku contract holds (no linebreaks), that the sequence plays once and only after a fully successful bootstrap, and that no team-register prose leaks into it. Created at integration: the sequence is shipped prose with a reader and Wave 1 scheduled only its mechanism. | The Software Engineer, with The Writer | 6.6 (ARCH-8), the 0.4 register specification |
| 6.8 | WRITE-1b | First-run sequence content, stage 2: the beat outline, validated against WRITE-1a and against the 0.4 register specification. | The Writer | 6.7 (WRITE-1a) |
| 6.9 | WRITE-1c | First-run sequence content, stage 3: write. | The Writer | 6.8 (WRITE-1b) |
| 6.10 | WRITE-1d | First-run sequence content, stage 4: revise, against `signs_of_ai_writing.md` and the no-theater prohibition. | The Editor | 6.9 (WRITE-1c) |
| 6.11 | ARCH-9a | `README.md`, stage 1: the document test suite. The README's reader is a stranger who cloned the repository, so the suite asserts orientation claims rather than style. Includes the licence assertions: the dedication covers this project's own summaries and cannot cover the sources they describe, and the Scenario Explorer's sentence "No third-party PDF, page image or extracted source text is in this repository" is not copied, because it is not true of its own corpus (loose end A5). | The Software Engineer, with The Writer | 2.12 (MERGE-8), 2.16 (MERGE-10), 1.1 (ARCH-1) |
| 6.12 | ARCH-9b | `README.md`, stage 2: topic-sentence outline, validated against ARCH-9a. | The Writer | 6.11 (ARCH-9a) |
| 6.13 | ARCH-9c | `README.md`, stage 3: write, including the corpus licence statement. The `lsei/NOTICE.md` precedent applies: a share-alike file and a public-domain dedication cannot both govern the same tree. The licence section carries MERGE-8's finding. | The Writer (draft), The Systems Engineer (licence boundary) | 6.12 (ARCH-9b) |
| 6.14 | ARCH-9d | `README.md`, stage 4: revise. | The Editor, then The Designer | 6.13 (ARCH-9c) |
| 6.15 | GATE-2 | **Public release gate.** The repository does not go public until MERGE-8 has returned, every file it flagged has been cleared or marked, MERGE-9's containment mechanism is installed and asserted, and ARCH-9d has landed. The Engineer's ordering is non-negotiable: the untested summaries get tested, then the contaminated set is cleared, then the repository goes public. | Orchestrator, evidence from The Engineer; the author releases | 2.12 (MERGE-8), 2.14 (MERGE-9), 6.14 (ARCH-9d) |

### Step 7 — Findings, standing tensions, and the sampling protocol

**Closing this step delivers** the merged mechanism table as a first-class corpus artifact with
every row's evidence resolving to a summary in `literature/`; the closure-versus-TRL coupling stored
as a standing tension with both positions and neither marked correct; the two unnamed inputs
(`δ_lunar` and the demand sponsor) sourced, bounded, or declared as gaps carried in the corpus; and
the sampling protocol written through all four stages. At this gate the author is approving that
what this plan could not resolve is stored as an artifact rather than lost.

| Sub-step | Origin ID | What it does | Assigned To | Depends on |
|---|---|---|---|---|
| 7.1 | ECON-8 | Build the merged mechanism table as a first-class corpus artifact: the transportability table rebuilt over the merged corpus, every row's evidence resolving to a summary in `literature/`, every tag carrying the capability or congruence condition that produced it. This is the object ECON-4b's gate reads. A port from `FA1-mechanism-table.md` if ECON-12 ruled the FA deliverables in, a full rebuild if it ruled them out. | The Growth Economist (write), The Space Resources Engineer (reviews every row tagged `transportable`; disagreements presented, not resolved, per A.9) | 1.2 (ECON-12), 2.16 (MERGE-10), 3.7 (LOOP-4) |
| 7.2 | ECON-9 | Write the closure-versus-TRL coupling into the corpus as a standing tension: closure ratio is a choice of technique, technique is selected against a factor-price vector, and high lunar closure and high terrestrial TRL are therefore negatively coupled. Stored with both positions side by side and **neither marked correct**. | The Growth Economist (position A), The Space Resources Engineer (position B), Orchestrator (records both) | 7.1 (ECON-8) |
| 7.3 | ECON-11 | Source or bound the two unnamed inputs. (a) `δ_lunar`: no source on disk supplies it, and every terrestrial depreciation rate in the corpus embeds a free-maintenance-labour assumption none of them states. (b) The demand sponsor: named or refused. Until sourced, both are declared gaps carried in the corpus rather than defaults silently adopted. | The Growth Economist (declare and bound), The Space Resources Engineer (a), the author (b: rules whether to pursue) | 7.1 (ECON-8) |
| 7.4 | LOOP-11a | Sampling protocol, stage 1: the test suite. What Level 3 cannot assert automatically, and what a human read of a sampled answer is checking. | The Software Engineer | 5.3 (LOOP-10) |
| 7.5 | LOOP-11b | Sampling protocol, stage 2: topic-sentence outline validated against LOOP-11a. | The Writer | 7.4 (LOOP-11a) |
| 7.6 | LOOP-11c | Sampling protocol, stage 3: write. Rate, denominator, annotation procedure. | The Writer | 7.5 (LOOP-11b) |
| 7.7 | LOOP-11d | Sampling protocol, stage 4: revise. | The Editor | 7.6 (LOOP-11c) |

---
## 3. Ordering constraints, and where each came from

Stated separately from the table because a dependency column shows *that* two sub-steps are ordered
and not *why*, and the why is what survives a renumbering.

1. **1.1 (ARCH-1) before 2.5 (MERGE-5).** Stated by The Systems Engineer and recorded as loose end
   E4. The merge is what moves files into `literature/`; 1.1 (ARCH-1) is what makes `literature/`
   safe to move files into. If the merge runs first, three UN treaty `.txt` files and any `.docx` or
   `.PDF` become shippable in a public repository on merge day.
2. **1.2 (ECON-12) before 1.7 (MERGE-1) and 2.3 (MERGE-4).** Requirement 5 of this integration, and
   see §5.
3. **1.9 (LUNAR-2) and 1.10 (ECON-1) before 2.5 (MERGE-5), not after.** The Space Resources Engineer
   flagged that his register-binding step depends on the merge, which means the Oracle can be made
   to answer before it can be made not to answer one-sidedly. His mitigation is carried literally:
   the register *content* is authored early against current `lsei/literature/` paths (sub-steps 1.9
   and 1.10), and the merge-time step 2.16 (MERGE-10) becomes a pure rebinding. The content is
   drafted already; it needs paths, not thought.
4. **The Step 4 closing gate (formerly GATE-1) after 2.16 (MERGE-10), 3.7 (LOOP-4), 3.8 (LOOP-5),
   4.1 (LOOP-7) and 4.2 (ECON-6).** The corollary of constraint 3 and the containment of B1. The
   corpus existing and the corpus being safe to answer from are two different dates, and nothing in
   the five drafts named the second one.
5. **1.5 (ARCH-3) before 2.18 (ARCH-5), 6.6 (ARCH-8) and 2.17 (MERGE-11).** All three consume
   install state. See §6.
6. **1.4 (ARCH-2) before 2.14 (MERGE-9).** The Engineer's containment mechanism has teeth only if
   the bootstrap sets `core.hooksPath`, which is his own interface question 3 to The Systems
   Engineer.
7. **2.3 (MERGE-4) carries a machine-readable field label, and 3.7 (LOOP-4) depends on it.** The
   Software Engineer's B3: the pooled IDF table is a hard requirement on the taxonomy, not a
   preference. The taxonomy is otherwise a human-navigation decision — The Engineer measured that
   folder segments are never scored by retrieval — so this is the one retrieval constraint the
   taxonomy must satisfy.
8. **2.11 (MERGE-7) before 2.12 (MERGE-8) before 6.15 (GATE-2).** The Engineer's ordering, stated as
   non-negotiable: the untested summaries get their PDFs, then they get tested, then the
   contaminated set is cleared, then the repository goes public. 2.12 (MERGE-8) is also the only
   step that closes loose end A6.
9. **3.1 (LUNAR-7) before 3.2 (LUNAR-1b) and 3.3 (LUNAR-1).** The boundary table is derived from a
   generated map, which is derived from the app; it becomes a routing contract only after someone
   reads the artifact. Under a floating working copy it must be derived at build time rather than
   typed.
10. **1.3 (LOOP-1) before 1.11 (LOOP-3) before every mechanism.** And 1.11 (LOOP-3) does **not**
    depend on the merge: the suite is written against the contract, not against the corpus, which is
    the point of writing it first. If the merge slips, 1.11 (LOOP-3) still runs. 4.1 (LOOP-7) is the
    only suite sub-step that genuinely cannot start early, because the register does not exist yet.
11. **6.1 (ARCH-6) before 6.2 (ARCH-7a).** A specification is the thing a suite tests, and a suite
    is the thing prose is written against. Writing `CLAUDE.md` first and deriving the contract from
    it inverts the method.
12. **The 0.4 register specification feeds 5.1 (LOOP-8) and 6.8 (WRITE-1b).** The Editor's
    prohibition text is the closed list `verify_register.js` checks against, and the sequence beats
    come from The Writer's 0.4 deliverable.

---

## 4. Context recipes

Format: sub-step, agent, files and excerpts. Sub-steps that are author rulings, orchestrator gates,
or pure applications of an already-produced artifact are not listed.

| Sub-step | Agent | Files / Excerpts |
|---|---|---|
| 1.1 (ARCH-1) | The Systems Engineer | `.gitignore` (full). The gameplan's directory map section. `step0_systems_engineer_architecture.md` part 3. Directory listings of `_intake/` and of `literature/` if it exists. Not the corpus contents. |
| 1.1 (ARCH-1) | Orchestrator (apply) | The proposed `.gitignore` and map rows. The author's ruling on the map. |
| 1.2 (ECON-12) | Orchestrator (escalate) | `step0_growth_economist_question_surface.md` Part 6. `FA1-mechanism-table.md` and `FA2-verdict-table.md` headers only, as the exhibits. Open Question 6 in the gameplan. |
| 1.3 (LOOP-1) | The Software Engineer | `step0_software_engineer_loop.md` (full). `lsei/oracle/answer_question.js` header comment. `lsei/report-generator-prompt.md` steps 4 and 5. The gameplan's design intent section. |
| 1.4 (ARCH-2) | The Systems Engineer | `step0_systems_engineer_architecture.md` parts 1, 2 and 4. `cr-agents/CLAUDE.md` (full, the precedent). The current provisional `CLAUDE.md`. `lsei/README.md` layout section. `cr-agents/README.md` workflow diagram section only. |
| 1.4 (ARCH-2) | The Software Engineer (review) | The draft `oracle/bootstrap_contract.md`. `cr-agents/method/tdd_method.md` (full). Not the corpus, not the app. |
| 1.5 (ARCH-3) | The Systems Engineer | `step0_systems_engineer_architecture.md` part 2, part 3 break 6, and part 5. `oracle/bootstrap_contract.md` from 1.4 (ARCH-2). The Engineer's provenance format from 1.7 (MERGE-1). **Plus §6 of this file**, so the four consumers are visible in one place. |
| 1.5 (ARCH-3) | The Software Engineer (review) | The draft schema. The three abnormal reads. `tdd_method.md` sections on fixture construction. |
| 1.6 (ARCH-4) | The Systems Engineer | `step0_systems_engineer_architecture.md` part 2. `git log --oneline -5` from both working copies. The header of `lsei/lunar-scenario-explorer-map.md`, to confirm it is generated. Open Question 3. `step0_software_engineer_loop.md` §8.4 for the C4 dependency. |
| 1.6 (ARCH-4) | The Engineer (review) | The draft policy. His own merge provenance design. |
| 1.7 (MERGE-1) | The Engineer | `step0_engineer_corpus_merge.md` parts 1 and 4. `lsei/oracle/lib/literature_search.js`, the `baseName` / `filenameTokens` / `scoreFile` block. `step0_dedup_decisions.md` (full, short) for the suffix rule. 1.2 (ECON-12)'s ruling. |
| 1.8 (LOOP-2) | The Software Engineer, The Growth Economist, The Space Resources Engineer, The Engineer | `step0_software_engineer_loop.md` §3.6. `step0_space_resources_engineer_question_surface.md` §5.1–5.3. `step0_growth_economist_question_surface.md` Part 4. The Engineer's merge taxonomy. **Do not load the corpus.** |
| 1.9 (LUNAR-2) | The Space Resources Engineer | `step0_space_resources_engineer_question_surface.md` §5 (full). The `lsei/literature/` tree listing. The summaries named in §5.4, read in full where a figure is being encoded. `lunar-scenario-explorer-map.md`, "The live coefficient values" and "Which coefficients each section governs". |
| 1.10 (ECON-1) | The Growth Economist | `step0_growth_economist_question_surface.md` Part 4 (full). 1.8 (LOOP-2)'s ratified schema. The `lsei/literature/` and `_intake/japanese-miracle/lit/` tree listings. Any summary flagged ambiguous, in full. |
| 1.11 (LOOP-3) | The Software Engineer | 1.3 (LOOP-1)'s contract. `cr-agents/method/tdd_method.md` (full). `operational_guide.md` A.10 (full). `lsei/oracle/verify_answers.js` and `verify_figure.js` header, as the `--prove` precedent. Ten to fifteen sample questions drawn from the two domain question surfaces. |
| 2.1 (MERGE-2) | The Engineer | The union file list. `## Citation` and `## Provenance` blocks only — not full bodies. `literature/NAMING.md`. |
| 2.2 (MERGE-3) | The Engineer | `cr_scratch/merge_identity.tsv`. The collision groups' files, read in full. `step0_engineer_corpus_merge.md` part 4. `step0_dedup_decisions.md` (full) and the `_intake/superseded-duplicates/` listing. |
| 2.3 (MERGE-4) | The Engineer | Filename listings only, both corpora. `step0_engineer_corpus_merge.md` part 2. The 24 corpus-unique names. `step0_software_engineer_loop.md` §8.2, for the field-label requirement. |
| 2.3 (MERGE-4) | The Space Resources Engineer / The Growth Economist (review) | The proposed folder table and the assignment list for their own folders. No file bodies. |
| 2.5 (MERGE-5) | The Engineer | `cr_scratch/merge_identity.tsv`, 2.2 (MERGE-3)'s dispositions, 2.3 (MERGE-4)'s assignment table, `literature/NAMING.md`, the corrected `.gitignore`, the gameplan's directory map. |
| 2.6 (MERGE-6) | The Engineer | One example of each format family: a `Comprehensive`-marked file, a canonical file, a `## Provenance`-form file. Not the whole corpus in context. |
| 2.7 (LUNAR-8) | The Engineer | `literature/programme-primaries/` (all, full). The CLPS delivery timeline summary. His own merge front-matter specification. |
| 2.8 (ECON-2) | The Growth Economist | `may-1977-…-review`, `simonis-1979-denison-boltho-review`, `henderson-2008-myth-of-miti` in full. Citation blocks only for the other corpus-unique files. |
| 2.9 (ECON-3) | The Growth Economist | The two review summaries in full. The mechanism-table source ledger entry if 1.2 (ECON-12) ruled the FA deliverables in. |
| 2.11 (MERGE-7) | The Engineer | Directory listing of `CSA_LSEI_Workshops/context/reference/lit/` — **names and sizes, never contents**. `step0_engineer_corpus_merge.md` part 9. The union filename list. First pages only, for the hand queue. |
| 2.12 (MERGE-8) | The Engineer | `step0_engineer_corpus_merge.md` part 8, including the method and the control results. The previously-untested summaries and their newly-landed PDFs. |
| 2.14 (MERGE-9) | The Software Engineer, The Systems Engineer | `.gitignore`. `step0_engineer_corpus_merge.md` part 5's `git check-ignore` output. `oracle/bootstrap_contract.md`. |
| 2.16 (MERGE-10) | The Engineer | 1.8 (LOOP-2)'s ratified encoding. 1.9 (LUNAR-2)'s and 1.10 (ECON-1)'s row sets. 2.2 (MERGE-3)'s `DUP-xx` rows. The merged `literature/` tree listing. The near-duplicate cluster list. |
| 2.17 (MERGE-11) | The Engineer, The Systems Engineer | `step0_engineer_corpus_merge.md` parts 5 and 6. `lsei/oracle/lib/literature_search.js` — the self-test at the foot is the pattern. 1.5 (ARCH-3)'s state-record schema. `step0_systems_engineer_architecture.md` part 3 break 1. |
| 2.18 (ARCH-5) | The Systems Engineer | `step0_systems_engineer_architecture.md` part 3 break 1 and part 4. The Engineer's completed merge report. Filename listings of `lsei/literature/` and of the merged `literature/`. Not the summary contents. |
| 3.1 (LUNAR-7) | The Space Resources Engineer | `lsei/index.html` — the data island only: `CONFIG`, `VALUE`, `LANDED_COST`, `PRESETS`, `DETENTS`, `model()`. Not the whole 894 KB file. `step0_space_resources_engineer_question_surface.md` §2. |
| 3.1 (LUNAR-7) | The Fact-Checker | The same data-island excerpt. `step0_space_resources_engineer_question_surface.md` §2. `lunar-scenario-explorer-map.md`, the totals and coefficient tables. |
| 3.2 (LUNAR-1b) | The Software Engineer | `lsei/oracle/answer_question.js`, `OUTPUT_LEXICON` and `KNOB_LEXICON`. `lsei/oracle/lib/address.js` (full). `lsei/oracle/lib/app_model.js` (full). `lunar-scenario-explorer-map.md`, "Where each rendered value comes from". 3.1 (LUNAR-7)'s confirmed output-key list. |
| 3.3 (LUNAR-1) | The Space Resources Engineer | `step0_space_resources_engineer_question_surface.md` §1 and §2. `lsei/oracle/answer_question.js` (header comment and `OUTPUT_LEXICON`). `lsei/oracle/lib/address.js` (full — it is small and it is the boundary's operational definition). |
| 3.3 (LUNAR-1) | The Software Engineer | `step0_space_resources_engineer_question_surface.md` §1. 1.3 (LOOP-1)'s answer contract. `lsei/oracle/answer_question.js` (full). |
| 3.4 (LUNAR-4) | The Software Engineer | `step0_space_resources_engineer_question_surface.md` §4 in full. `lsei/oracle/lib/exclusions_match.js` (full). `lunar-scenario-explorer-map.md`, "The nodes ruled excluded". |
| 3.5 (LUNAR-5) | The Space Resources Engineer | `step0_space_resources_engineer_question_surface.md` §3. The merged `literature/` tree listing. |
| 3.6 (LOOP-4t) | The Software Engineer | 1.11 (LOOP-3)'s suite. `step0_engineer_corpus_merge.md` part 7, including the four measured query results. The two domain question surfaces, §1 of each. |
| 3.7 (LOOP-4) | The Engineer and The Software Engineer | `lsei/oracle/lib/literature_search.js` (full). `step0_software_engineer_loop.md` §1.2. `step0_engineer_corpus_merge.md` part 7. 3.6 (LOOP-4t)'s labelled set. The merged tree listing with field labels. Six summaries, three per field, read in full. |
| 3.8 (LOOP-5) | The Software Engineer | `lsei/oracle/answer_question.js` (full). `lib/address.js` (full). `lib/exclusions_match.js`. 1.8 (LOOP-2)'s schema. 3.7 (LOOP-4)'s rebuilt module signature only, not its body. |
| 3.9 (LOOP-6) | The Software Engineer | `step0_software_engineer_loop.md` §2. `operational_guide.md` A.3.3 and A.4. The A.12 roster entries for the two domain personas only. |
| 3.10 (ECON-7) | The Systems Engineer | `lsei/lunar-scenario-explorer-map.md`, the excluded-nodes table and the totals table only. `step0_growth_economist_question_surface.md` §5.3. `step0_space_resources_engineer_question_surface.md` §4. |
| 4.1 (LOOP-7) | The Software Engineer | 1.11 (LOOP-3)'s suite. The landed register. The named member summaries, read in full — A.10 step 2 requires it and there is no way around opening the files. |
| 4.2 (ECON-6) | The Software Engineer, The Growth Economist | `step0_growth_economist_question_surface.md` parts 3, 4 and 5. The landed register with its class column. `cr-agents/method/tdd_method.md` (full). **Not** the corpus; the invariants are structural. |
| 4.3 (ECON-10) | The Software Engineer, The Growth Economist | `pritchett-2000`, `hausmann-2005`, `flyvbjerg-2014` summaries in full. 4.2 (ECON-6)'s invariant. |
| 4.4 (ECON-4) | The Software Engineer | `step0_growth_economist_question_surface.md` parts 2 and 3. 1.3 (LOOP-1)'s contract. The prototype's five verdicts. |
| 4.4 (ECON-4) | The Growth Economist | Parts 2 and 3 of his own file. The worked example in §5.2 as the acceptance target. |
| 4.5 (ECON-5) | The Software Engineer, The Growth Economist | `kiyota-2005`, `lewis-1954`, `beckley-2018` summaries in full. `cr-agents/method/tdd_method.md`. `operational_guide.md` A.10. |
| 4.6 (ECON-4b) | The Software Engineer | 4.4 (ECON-4)'s specification, 4.5 (ECON-5)'s assertions, 3.9 (LOOP-6)'s composition path. |
| 4.7 (LUNAR-6) | The Software Engineer | `step0_space_resources_engineer_question_surface.md` §6. `cr-agents/method/tdd_method.md` (full). `operational_guide.md` A.10. |
| 4.8 (LUNAR-9) | The Space Resources Engineer | `step0_space_resources_engineer_question_surface.md` §1 through §5. `lsei/oracle/fixtures/` (listing plus one example fixture). The landed register. |
| 5.1 (LOOP-8) | The Software Engineer | `step0_software_engineer_loop.md` §4. The Writer's register specification and The Editor's prohibition from 0.4. `lsei/report-generator-prompt.md` step 5 and the verifier at the end of that file. |
| 5.2 (LOOP-9) | The Software Engineer | `lsei/oracle/verify_answers.js` (full). `step0_software_engineer_loop.md` §5.3. |
| 5.3 (LOOP-10) | The Software Engineer | The assembled loop. `step0_software_engineer_loop.md` §5.2. `verify_figure.js`'s `--prove` implementation as the pattern. |
| 6.1 (ARCH-6) | The Software Engineer | `oracle/bootstrap_contract.md`. 1.5 (ARCH-3)'s state-record schema. `cr-agents/method/tdd_method.md` (full). `lsei/oracle/answer_question.js` path-resolution block, lines 76–95, for the `--lit` assertion. `lsei/oracle/verify_answers.js` as the precedent for outcome-count reporting. |
| 6.1 (ARCH-6) | The Systems Engineer (coverage) | The draft suite plus his six degraded modes. |
| 6.2 (ARCH-7a) | The Software Engineer, The Writer | `oracle/bootstrap_contract.md`. `cr-agents/method/tdd_method.md` Prompt 1. 6.1 (ARCH-6)'s behavioural suite, to avoid duplicating it. |
| 6.3–6.4 (ARCH-7b–c) | The Writer | `oracle/bootstrap_contract.md`. `cr-agents/CLAUDE.md` as the register precedent for a bootstrap file. `cr-agents/supplements/writing-guides/style.md` and `structure.md`. The validated outline. |
| 6.5 (ARCH-7d) | The Editor | `cr-agents/supplements/signs_of_ai_writing.md` (full, mandatory). The drafted `CLAUDE.md`. |
| 6.5 (ARCH-7d) | The Designer | The drafted `CLAUDE.md` plus the repository tree as a cloner sees it — the tree with `cr-agents/`, `lsei/` and `_intake/` removed. |
| 6.5 (ARCH-7d) | The Systems Engineer | `oracle/bootstrap_contract.md` beside the drafted `CLAUDE.md`, read as a conformance check and nothing else. |
| 6.6 (ARCH-8) | The Systems Engineer | `step0_systems_engineer_architecture.md` part 5. 1.5 (ARCH-3)'s state-record schema. `oracle/bootstrap_contract.md` phase 7 only. Explicitly **not** The Writer's sequence content. |
| 6.7 (WRITE-1a) | The Software Engineer, The Writer | The 0.4 register specification. 6.6 (ARCH-8)'s gate. 5.1 (LOOP-8)'s `verify_haiku.js` contract. |
| 6.8–6.9 (WRITE-1b–c) | The Writer | The 0.4 register specification (full). The design intent section. `style.md` and `structure.md`. 6.7 (WRITE-1a)'s suite. |
| 6.10 (WRITE-1d) | The Editor | `signs_of_ai_writing.md` (full). The drafted sequence. The Editor's own 0.4 prohibition. |
| 6.11 (ARCH-9a) | The Software Engineer, The Writer | `lsei/README.md` (full) and `lsei/NOTICE.md` (full). 2.12 (MERGE-8)'s finding. Loose end A5. |
| 6.12–6.13 (ARCH-9b–c) | The Writer | `lsei/README.md` and `lsei/NOTICE.md` as precedent. The directory map as corrected by 1.1 (ARCH-1). 2.12 (MERGE-8)'s audit finding. Objectives 1 through 6. |
| 6.13 (ARCH-9c) | The Systems Engineer | The licence section only, plus 2.12 (MERGE-8)'s finding, plus `lsei/NOTICE.md`. |
| 6.14 (ARCH-9d) | The Editor, then The Designer | `signs_of_ai_writing.md` (full). The drafted README. The repository tree as a cloner sees it. |
| 7.1 (ECON-8) | The Growth Economist | All corpus-unique economics summaries. `lewis-1954`, `hausmann-2005`, `caballero-2008`, `flyvbjerg-2014`, `henderson-2008`. `FA1-mechanism-table.md` if 1.2 (ECON-12) ruled it in. |
| 7.1 (ECON-8) | The Space Resources Engineer | The merged mechanism table draft, rows tagged `transportable` only. His own 0.2 deliverable. |
| 7.2 (ECON-9) | Both domain personas | `step0_growth_economist_question_surface.md` §2.4 and `step0_space_resources_engineer_question_surface.md` §10. Nothing else; the tension is stated, not researched. |
| 7.3 (ECON-11) | The Growth Economist | `jorgenson-2005` (the asset table and depreciation methodology), `beckley-2018`, `dingman-1993`. The app's `grade-independent-demand` exclusion prose. |
| 7.4 (LOOP-11a) | The Software Engineer | `step0_software_engineer_loop.md` §5.4. `tdd_method.md` Prompt 4. |
| 7.5–7.6 (LOOP-11b–c) | The Writer | `step0_software_engineer_loop.md` §5.4. `style.md` and `structure.md`. 7.4 (LOOP-11a)'s suite. |

---

## 5. Requirement 5: the FA1–FA8 decision is scheduled, not buried

**It is sub-step 1.2 (ECON-12), and it gates 1.7 (MERGE-1) and 2.3 (MERGE-4).**

The Growth Economist's ruling is that an FA deliverable is not the same kind of object as a summary.
A summary's warrant is that every claim in it resolves to one source. An FA deliverable is a
cross-source adjudication carrying a verdict column, a transportability tag, and derived arithmetic
present in no source — `FA2-verdict-table.md` states outright that its own net-MPK threshold is "the
summarizer's calibration, not a number lifted from the papers." Merging them into `literature/` puts
unattributable derived numbers into a corpus whose whole contract is that a citation resolves, and
the Oracle will then cite a verdict as though it were a finding. The files look identical to their
neighbours, so nothing downstream catches it. His recommendation is two corpora with two contracts.

It is scheduled rather than assumed for three reasons.

- The taxonomy cannot be revised after the files are placed without a second migration, which The
  Engineer states as a design rule of 2.3 (MERGE-4).
- If the FA deliverables come in, the taxonomy needs a derivation grade **and** the trace-grade
  vocabulary in 1.3 (LOOP-1) needs a fourth member, which changes an artifact eight later steps are
  written against.
- If they stay out, 7.1 (ECON-8) is a rebuild rather than a port, which is real work with a real
  schedule cost, and `FA1-mechanism-table.md` is the existing draft of exactly the transfer test
  this project was about to construct from scratch.

The cost is symmetric and the shape is clear either way, which is what makes it a decision rather
than a research task. The author rules; the orchestrator escalates it at the 0.8 gate with the two
table headers as exhibits. **If no ruling arrives at 0.8, Step 1 does not open, because 1.7
(MERGE-1) sits inside Step 1 and cannot be written without the answer.**

---

## 6. Requirement 6: the state-mechanism trap. What I found.

**The Systems Engineer's falsifier 2 did not fail in the way he predicted, and it did fail in a way
he did not predict. Both halves are stated because he is entitled to test his own falsifier at 0.5
against what actually happened rather than against a reassurance.**

**What he predicted:** that integration would produce three separate mechanisms for the working-copy
ref record, the corpus drift record, and the first-run flag.

**What I found on the ref record and the first-run flag: consolidated, and he consolidated them
himself.** Both are fields of one root-level, gitignored, machine-written file specified in 1.5
(ARCH-3). No other Wave 1 agent proposed a competing location for either. The Software Engineer's
run log is per-run and lives in the OS temp directory, which is a different lifetime and correctly a
different file; it is not a fourth mechanism and I am not folding it in.

**What I found on the drift record: two mechanisms for one need, from two agents.** The Systems
Engineer's 2.18 (ARCH-5) specifies a bootstrap-time comparison of upstream filename set and content
hashes against a provenance record. The Engineer's 2.17 (MERGE-11) specifies
`oracle/verify_corpus.js` with drift as its first named check. These are the same computation over
the same inputs with two owners and two invocation points. The Engineer saw it from his side and
wrote it down as interface question 4 to The Systems Engineer: *"2.17 (MERGE-11)'s drift check is
his divergence problem and mine. One tool, not two."* Neither agent could act on it alone, which is
exactly the shape falsifier 2 describes.

**Consolidated as follows, and this is the integration decision:**

- 1.5 (ARCH-3) is the **single writer** of install state. The corpus provenance digest is a field in
  that record, alongside the working-copy refs and the first-run flag.
- 2.17 (MERGE-11) is the **single implementation** of the comparison. `oracle/verify_corpus.js`
  reads the digest from 1.5 (ARCH-3)'s record and reports.
- 2.18 (ARCH-5) is reduced to **policy**: what provenance must name, that the bootstrap invokes 2.17
  (MERGE-11), and that divergence is reported and never auto-merged. It builds nothing.
- 1.5 (ARCH-3)'s dependency list therefore names four consumers rather than three, and 1.5
  (ARCH-3)'s context recipe carries this section so the consolidation is visible to the agent
  writing the schema.

**One further consolidation, in the same shape, that falsifier 2 does not cover but should have.**
Three Wave 1 agents specified the contested-claims register landing as three artifacts: a sidecar
TSV with an in-file `## Contested` block, a YAML under `literature/_registers/`, and
machine-readable front matter on each member summary. Three encodings of one object, arriving from
three directions, with The Software Engineer's own note that nobody owned the join. 1.8 (LOOP-2) now
owns it — it ratifies one sidecar format and one in-file block format — and 2.16 (MERGE-10) is the
single landing step. The Manager's close checklist item 6 requires the register to exist in three
*forms* (contents, retrieval invariant, merge structure), not three *files*, and three files is how
that requirement gets satisfied on paper and defeated in practice.

**What I did not consolidate, deliberately.** `oracle/question_classes.json`,
`oracle/thin_patches.json` and the exclusion records are content registers, not install state and
not the contested-claims register. They have different owners, different lifetimes and different
consumers. Folding them together would be the mirror-image error.

---

## 7. ID mapping table: agent-authored ID, integration prefix ID, final sub-step

Three columns of identity, because three numbering schemes have existed and all three are needed to
read the record: what the Wave 1 agent called it, the integration prefix ID it carries in §2's own
column, and its final `N.M`. Source files are unchanged and remain readable line by line against
this table.

| Agent-authored ID | Source file | Integration prefix ID | Final | Note |
|---|---|---|---|---|
| SE-1 | `step0_systems_engineer_architecture.md` | ARCH-1 | 1.1 | |
| SE-2 | same | ARCH-2 | 1.4 | |
| SE-3 | same | ARCH-3 | 1.5 | Scope widened: four consumers, not three. See §6. |
| SE-4 | same | ARCH-4 | 1.6 | Absorbs the C4 `verify_report.js` ruling from The Software Engineer §8.4. |
| SE-5 | same | ARCH-5 | 2.18 | Reduced to policy; the check is 2.17 (MERGE-11). See §6. |
| SE-6 | same | ARCH-6 | 6.1 | |
| SE-7 | same | ARCH-7a, ARCH-7b, ARCH-7c, ARCH-7d | 6.2, 6.3, 6.4, 6.5 | His four stages given four IDs. |
| SE-8 | same | ARCH-8 | 6.6 | Mechanism only, as he specified. Content is WRITE-1a–d, sub-steps 6.7–6.10. |
| SE-9 | same | ARCH-9a, ARCH-9b, ARCH-9c, ARCH-9d | 6.11, 6.12, 6.13, 6.14 | Split into TDD stages at integration; he scheduled it as one step and it is prose with a reader. |
| SE-1 | `step0_software_engineer_loop.md` | LOOP-1 | 1.3 | |
| SE-2 | same | LOOP-2 | 1.8 | Scope widened to ratify a single encoding. See §6. |
| SE-3 | same | LOOP-3 | 1.11 | |
| SE-4 | same | LOOP-4 | 3.7 | Absorbs M12, which was never given a `MERGE-` number of its own. Two owners. |
| SE-5 | same | LOOP-5 | 3.8 | |
| SE-6 | same | LOOP-6 | 3.9 | |
| SE-7 | same | LOOP-7 | 4.1 | |
| SE-8 | same | LOOP-8 | 5.1 | |
| SE-9 | same | LOOP-9 | 5.2 | |
| SE-10 | same | LOOP-10 | 5.3 | |
| SE-11 / SE-11a–d | same | LOOP-11a, LOOP-11b, LOOP-11c, LOOP-11d | 7.4, 7.5, 7.6, 7.7 | His four stages given four IDs. |
| M1 | `step0_engineer_corpus_merge.md` | MERGE-1 | 1.7 | |
| M2 | same | MERGE-2 | 2.1 | |
| M3 | same | MERGE-3 | 2.2 | |
| M4 | same | MERGE-4 | 2.3 | Field label per file promoted from preference to requirement (B3). |
| M5 | same | MERGE-5t, MERGE-5 | 2.4, 2.5 | His "before M5" assertions given their own ID, and they run first. |
| M6 | same | MERGE-6 | 2.6 | |
| M7 | same | MERGE-7t, MERGE-7 | 2.10, 2.11 | |
| M8 | same | MERGE-8 | 2.12 | |
| M9 | same | MERGE-9t, MERGE-9 | 2.13, 2.14 | |
| M10 | same | MERGE-10t, MERGE-10 | 2.15, 2.16 | Absorbs SR-3's rebinding and 1.10 (ECON-1)'s landing half. |
| M11 | same | MERGE-11 | 2.17 | Now the single drift/divergence implementation. See §6. |
| M12 | same | folded into LOOP-4 | 3.7 | Same work as 3.7 from the other side; his labelled question set becomes 3.6 (LOOP-4t). |
| SR-1 | `step0_space_resources_engineer_question_surface.md` | LUNAR-1 | 3.3 | |
| SR-1b | same | LUNAR-1b | 3.2 | Now depends on 3.1 (LUNAR-7), as he specified. |
| SR-2 | same | LUNAR-2 (content), MERGE-10 (landing) | 1.9, 2.16 | Split to carry his own pre-merge mitigation. |
| SR-3 | same | folded into MERGE-10 (rebinding) and MERGE-11 (the failing build check) | 2.16, 2.17 | |
| SR-4 | same | LUNAR-4 | 3.4 | |
| SR-5 | same | LUNAR-5 | 3.5 | |
| SR-6 | same | LUNAR-6 | 4.7 | |
| SR-7 | same | LUNAR-7 | 3.1 | Moved ahead of 3.3 (LUNAR-1) and 3.2 (LUNAR-1b), which both consume it. |
| SR-8 | same | LUNAR-8 | 2.7 | |
| SR-9 | same | LUNAR-9 | 4.8 | |
| GE-1 | `step0_growth_economist_question_surface.md` | ECON-1 (content), MERGE-10 (landing) | 1.10, 2.16 | Split, same reason as SR-2. |
| GE-2 | same | ECON-2 | 2.8 | |
| GE-3 | same | ECON-3 | 2.9 | |
| GE-4 | same | ECON-4 | 4.4 | Specification only. |
| GE-5 | same | ECON-5 | 4.5 | Now precedes the build, per TDD ordering. |
| GE-6 | same | ECON-6 | 4.2 | |
| GE-7 | same | ECON-7 | 3.10 | |
| GE-8 | same | ECON-8 | 7.1 | |
| GE-9 | same | ECON-9 | 7.2 | |
| GE-10 | same | ECON-10 | 4.3 | |
| GE-11 | same | ECON-11 | 7.3 | |
| GE-12 | same | ECON-12 | 1.2 | Moved to the second sub-step of Step 1, gating 1.7 (MERGE-1) and 2.3 (MERGE-4). See §5. |
| — | created at integration | ECON-4b | 4.6 | The transfer gate's build step. GE-4 and GE-5 gave a spec and a suite with nothing between them. |
| — | created at integration | WRITE-1a, WRITE-1b, WRITE-1c, WRITE-1d | 6.7, 6.8, 6.9, 6.10 | First-run sequence content. Wave 1 scheduled the mechanism only; the content is shipped prose with a reader. |
| — | created at integration | GATE-1 | **dissolved into the Step 4 gate** | Corpus-live gate, containment of B1. See the reconciliation note below. |
| — | created at integration | GATE-2 | 6.15 | Public release gate, kept as a sub-step. See the reconciliation note below. |
| — | created at integration | MERGE-5t, MERGE-7t, MERGE-9t, MERGE-10t, LOOP-4t | 2.4, 2.10, 2.13, 2.15, 3.6 | The Engineer's five "before Mx" assertion sets, given IDs so they are ordered sub-steps rather than notes. |

### 7.1 The two gates, reconciled against the step-and-sub-step scheme

The renumbering carries one substantive consequence, and it is the only place the item count moved:
**73 items became 72.** Nothing was merged, split, added or dropped for any other reason.

**GATE-1 is dissolved, and its content is now Step 4's closing statement.** It was the last row of
the old Phase 4, nothing followed it inside that grouping, and every one of its five assertions is a
statement about another sub-step's deliverable — the register landed (2.16), retrieval field-scoped
and re-tuned (3.7), the classifier reading the register before retrieval (3.8), the register
fixtures passing (4.1), the three-class invariant holding (4.2). It carries no work of its own. That
is the exact definition of a boundary gate under this scheme, and the one-step gate already fires
there. Keeping it as a row would have meant two gates at one boundary. Its assertion list is
reproduced verbatim in Step 4's closing statement, so nothing is lost, and no sub-step depended on
it, so nothing dangles.

**GATE-2 stays, as sub-step 6.15, and it is not a duplicate of the Step 6 boundary gate.** Two
reasons, both about work rather than approval. First, it carries work no other sub-step carries:
2.12 (MERGE-8) ends with *"Report to the author; do not act on the result,"* so clearing or marking
every file the contamination audit flagged is assigned nowhere else in the plan, and dissolving 6.15
would delete it. Second, its evidence set is not Step 6's — it reaches back to 2.12 (MERGE-8) and
2.14 (MERGE-9) in Step 2 — and going public is an irreversible external act rather than a decision
to open Step 7. So 6.15 is the evidence assembly and the clearing pass; the author then releases at
the Step 6 boundary gate, on 6.15's evidence.

---

## 8. Echo site registry

The values this project carries in more than one place. A number without its definition is not a
value, it is a rumour, so each row states what it counts. **The corpus counts are contested and the
contest is arithmetic, not opinion** — see the three rows marked PROVISIONAL and the note beneath.

| Value | Definition — what exactly is counted | Authoritative source | Status |
|---|---|---|---|
| **158** | `.md` files under `lsei/literature/` **before** the six deduplication deletions. | The Engineer, part 1, `find lsei/literature -name '*.md' \| wc -l` | Superseded on disk; still the base of the 95/63/24 split |
| **152** | `.md` files under `lsei/literature/` **after** the six deduplication deletions of 2026-08-26. Local to the working copy; a fresh clone reinstates all six. | `cr_scratch/step0_dedup_decisions.md`; gameplan progress log, "Dedup" row | Verified |
| **119** | `.md` summaries under `_intake/japanese-miracle/lit/`. | The Engineer, part 1; Manager §3 paths table | Verified |
| **112** | Source `.pdf` files under `_intake/japanese-miracle/lit/`. Never pushed. | The Engineer, part 1 | Verified |
| **3** | UN treaty `.txt` files in the Japanese Miracle corpus (`un-1967`, `un-1972`, `un-1979`). Neither summaries nor PDFs; the reason `.gitignore` had to become deny-by-default. | The Systems Engineer, break 4; The Engineer, part 1 | Verified |
| **95** | Filenames appearing in **both** corpora under the stated normalization: lowercase, each run of `_` or space to a single `-`, collapse repeats, strip `.md`. Computed against the 158-file listing. Under case-and-underscore only the figure is 92; under exact filename it is 86. | The Engineer, part 1, three-rule table | Verified, **pre-dedup basis** |
| **63** | Filenames unique to the Scenario Explorer corpus, same normalization, same 158-file basis. | The Engineer, part 1 | Verified, **pre-dedup basis** |
| **24** | Filenames unique to the Japanese Miracle corpus. Reproduces the gameplan's list exactly, all 24. | The Engineer, part 1 | Verified |
| **182** | Union **by filename**, same normalization: 158 + 119 − 95. Not a source count. | The Engineer, part 1; gameplan design notes | Verified, **pre-dedup basis** |
| **176** | Union by filename **after** the six dedup deletions, if none of the six was among the 95. | Arithmetic on the two rows above | **PROVISIONAL — recomputed at 2.1 (MERGE-2)** |
| **57** | Scenario-Explorer-unique filenames after the six dedup deletions. | Same | **PROVISIONAL — recomputed at 2.1 (MERGE-2)** |
| **162 to 173** | Distinct **sources** by DOI deduplication over the 182 filename union: 7 confirmed duplicate pairs plus 2 unconfirmable preprints. Only 79 of 182 carry a DOI at all, so the range is a bound rather than a count. | The Engineer, loose end B5 | **PROVISIONAL — replaced by 2.1 (MERGE-2)'s true count** |
| **87 / 8** | Of the 95 overlapping pairs, 87 are byte-identical and 8 differ. Counting rule: byte comparison after CRLF normalization, over basenames matched across the two corpora. **Corrected at 0.5 from 89 / 6**, which was The Engineer's part 4 figure and reached the gameplan before it reached this registry. The Manager's curation-recruit trigger fires on this number and still fires negative, but see the narrowing below. | The Fact-Checker at 0.5, superseding The Engineer part 4 | Verified, corrected |
| **60** | Summaries carrying the `## Comprehensive Technical Summary` marker; the header transform 2.6 (MERGE-6) removes. | The Engineer, part 3 | Verified |
| **13** | Summaries reproducing verbatim text from their source's printed abstract; 12 measured, all marked as quotation except one. **Bounded and does not gate the release** — see Open Question 8's correction. | The Engineer, part 8; gameplan Open Question 8 as corrected | Verified, and **incomplete until 2.12 (MERGE-8)** covers the untested set |
| **4** | Of those 13, the count originally classified as unmarked. Corrected: three of the four are explicitly marked as quotation at the point of use, leaving one (`turyshev-2026`, at 12%). | Gameplan progress log, "Abstracts"; loose end A4 | Verified |
| **52 / 224 MB** | Net-new PDFs recoverable from `CSA_LSEI_Workshops/context/reference/lit/`, and their size. **Not** 163 and 601 MB — the orchestrator's shallow survey was wrong and The Engineer corrected it. | The Engineer, part 9 | Verified |
| **148 / 182, 81%** | PDF-to-summary pairings the tiered rule resolves deterministically: 92 by exact filename, 44 by unique author-year, 22 to a hand queue. Directory adjacency is **not** the rule; it is a symptom. | The Engineer, part 9 | Verified |
| **11** | Top-level folders in the proposed merged taxonomy, one level deep, none over 32 files and none under 5. | The Engineer, part 2 | Proposed, lands at 2.3 (MERGE-4) |
| **16 or 17** | Author-year clusters holding more than one summary. **Contested:** The Space Resources Engineer's B4 says sixteen; The Engineer's 2.2 (MERGE-3) brief says seventeen collision groups. `sowers-2019` holds four. | The Space Resources Engineer (16); The Engineer (17) | **CONTESTED — reconciled at 2.1 (MERGE-2)** |
| **0.45** | The retrieval confirmation threshold, tuned on a single-field 156-file corpus. Has no standing at the merged size and is reset from a fixture set at 3.7 (LOOP-4). | The Software Engineer, B2; The Engineer, part 7 | To be replaced at 3.7 (LOOP-4) |
| **26 / 8** | Keys returned by the app's `model()`, against keys named in `OUTPUT_LEXICON`. The gap is loose end C2 and the unreachable ones are what a resources person asks for. | The Space Resources Engineer, verified by grep | Verified, fixed at 3.2 (LUNAR-1b) |
| **20 / 66 / 86 / 76 / 10** | The app's Claims, sections, slugs, modeled nodes, and excluded nodes. | `lsei/lunar-scenario-explorer-map.md`; re-derived at 3.1 (LUNAR-7) | Verified, re-derived at 3.1 (LUNAR-7) |
| **24** | Coefficient rows in the app's data island, each carrying a status string. Three of the load-bearing terms are ASSUMPTION by the app's own declaration (`kExc`, `captureEff`, `eSinter`). | The Space Resources Engineer, §10; re-derived at 3.1 (LUNAR-7) | Verified, re-derived at 3.1 (LUNAR-7) |
| **15 / 17** | Lunar register rows and economics register rows drafted at 0.2. One row (the shared axis) is written once and appears in both namespaces. | The Space Resources Engineer §5.4; The Growth Economist part 4 | Drafted, lands at 2.16 (MERGE-10) |
| **19** | Files at `_intake/japanese-miracle/fa/` (the FA1–FA8 deliverables and their source lists). | Gameplan progress log, "Setup rev. 3" | Verified |
| **f0c976b / c8274e6** | CR-Agents and Scenario Explorer working-copy refs at seed time. These become fields in 1.5 (ARCH-3)'s install state record and stop being prose. | Gameplan progress log, "Setup" | Verified, mechanized at 1.5 (ARCH-3) |

**The arithmetic note, stated rather than smoothed.** `152 + 119 − 95 = 176`, not 182. The two
figures are not in conflict; they have different bases. Every overlap and union figure The Engineer
verified was computed against the 158-file listing, and the six deduplication deletions executed
after he ran. The six dropped files were `-2`-suffixed variants of Scenario-Explorer sources, so the
expected effect is that the union falls to 176 and the Scenario-Explorer-unique count falls to 57
while the 95 overlap is unchanged — but that is arithmetic, not measurement. **2.1 (MERGE-2)
recomputes all of it and its output replaces every provisional row above.** Until then, any document
quoting a corpus count must also quote its basis: 158-file or 152-file.

---

## 9. Unresolved disagreements, presented side by side

Per A.9. Neither is resolved here, and neither is resolved by this integration.

### 9.1 The Growth Economist against The Space Resources Engineer: which necessary condition binds first

| | **The Space Resources Engineer** | **The Growth Economist** |
|---|---|---|
| Position | TRL is a necessary condition and it binds first. An economy cannot compound on a process nobody has built. | Economic selection binds first, and it is a selection effect rather than an engineering gap. |
| Evidence offered | The corpus's own maturity sheet puts the water chain at TRL 3/4 at its weakest link — capture and cleanup — with the single integrated demonstration recovering 50–73% of the water at 15–44 kWh/kg. | Closure ratio is a choice of technique; technique is chosen against a factor-price vector; a high-lunar-closure process avoids Earth inputs and was therefore selected against a vector no terrestrial engineer has faced, which is why nobody has built it. High closure and high TRL are **negatively coupled by selection**. |
| What each concedes | A TRL-6 process no economy would buy is not progress. Helium-3 is the clean case: documented supply chain, real implantation experiments, and no demand side at all. Construction sintering may be a second. His discipline catches neither; the economist's does. | The economist cannot reason about compounding from a production function whose coefficients are assumptions — three of the app's load-bearing terms are ASSUMPTION by the app's own declaration. |
| What each will not move on | A compounding claim whose inputs carry no maturity field at all. That is the failure The Fact-Checker cannot catch: correctly cited, internally consistent sources doing work they were never licensed to do. | That a targeted development programme dissolves the coupling. A targeted development programme is precisely what Beason measured: an authority directing capital at accumulation, with no measured productivity effect. |
| Where it lands in the plan | 7.1 (ECON-8), where he reviews every row tagged `transportable`. 7.2 (ECON-9), which stores both positions with neither marked correct. | The same two sub-steps, from the other side. |

**Unresolved by design.** Both hold that a process must be buildable and must be worth building, and
that these are two independent gates. The disagreement is about which is prior, and The Space
Resources Engineer's own statement of it is the one to keep: the honest answer is that neither is,
and the Oracle should be able to fail a claim at either gate and say which. 7.2 (ECON-9) is the
sub-step that makes that a stored artifact rather than a conversation.

*Adjacent and separate:* Open Question 5 (does the app remain sole computational authority) produced
three positions from three personas that the gameplan already records as compatible. The Systems
Engineer wants the boundary mechanically enumerable; The Space Resources Engineer wants a
coefficient's status field to be part of what the app computes; The Growth Economist wants the app's
authority *smaller and sharper* and the ten exclusions promoted to first-class answers. The Systems
Engineer expected to disagree with The Growth Economist about the corpus becoming co-authoritative;
The Growth Economist's stated position is that he opposes exactly that. **They agree, and each wrote
their agreement as an anticipated disagreement.** Recorded so that 0.5 does not re-open a fight
nobody is having. What remains genuinely open is the author's ruling, which is Open Question 5.

### 9.2 The Recruiter against The Manager: the second recruit

| | **The Recruiter** | **The Manager** |
|---|---|---|
| Position | Corpus curation is a real problem, not a person-shaped gap, at this corpus size. Assign the artifact, not the seat. | A real gap, wrong time. Concedes the timing, not the principle. |
| Remedy | The contested-claims register, produced by the two domain personas, turned into a retrieval invariant by The Software Engineer and into merge structure by The Engineer. Three owners, one artifact. | Agrees the three-owner assignment is better than anything he proposed, and better *specifically* because it lands the register as structure in the corpus rather than as a document somebody consults. |
| Where they actually differ | The gap is **dissolved** by the artifact. | The gap is **deferred** by the artifact. Visible only at the trigger. |
| Trigger | The Fact-Checker at 0.5, or the author at a later gate, finds one-sided retrieval on a registered claim despite the register existing. | The Engineer reports at 0.2 that the 95 overlapping pairs disagree substantively. |
| Trigger state | **Armed.** Fires at 0.5. | **Fired negative. Narrowed, not closed** (The Manager at 0.7). 87 of 95 pairs are byte-identical and the verdict survives the correction, but the reasoning does not: byte-identical is a proxy for agreement, and differing is not a proxy for substantive disagreement. Three of the eight differ because of this project's own deduplication; five differ for reasons nobody has read. The trigger narrows to those eight and stays armed until sub-step 2.2 reads them, which 2.2 does anyway. |
| Shape of the recruit if either fires | Lancaster on indexing and abstracting, or Bates on query behaviour if the failure is on the asking side. | Same; he does not contest the shape. |

**Unresolved by design.** The trigger is the operative part either way, and one of the two has now
fired negative without settling the principle. Both triggers stay in the drafted gameplan per the
Manager's close checklist item 7.

---

## 10. What I could not reconcile

Five things. Stated rather than smoothed.

**1. The corpus counts have two bases and no single number is right yet.** §8 carries the full
arithmetic. Every overlap, union and distinct-source figure in Wave 1 was computed against a
158-file Scenario Explorer corpus that is now 152 files on disk. I did not silently republish 182,
and I did not silently replace it with 176, because 176 is arithmetic and 182 is measurement, and
this project's own rule is that a trace says which grade it is. 2.1 (MERGE-2) is the sub-step
that produces a measured number. Until it runs, both figures travel with their basis attached.

**2. The author-year cluster count is 16 or 17 and I cannot tell which.** The Space Resources
Engineer counted sixteen clusters holding more than one summary; The Engineer's 2.2 (MERGE-3) brief
names seventeen collision groups. They may be counting different things — clusters against groups,
one corpus against the union — and neither states its denominator. It matters because B4's invariant
is "the register's sources field must name every cluster member," and a register built against the
wrong cluster list is satisfiable by returning the wrong file. 2.1 (MERGE-2) reconciles it.

**3. Open Question 5 is an author ruling and no arrangement of steps substitutes for it.** Three
personas converged on a compatible restatement — the app is sole authority over what it computes and
was never authority over anything else — but the restatement changes the inherited rule's wording,
and the inherited rules are the author's. 3.10 (ECON-7), 3.2 (LUNAR-1b) and 3.8 (LOOP-5) are all
written against the converged restatement. If the author rules differently, those three sub-steps
change shape.

**4. The Software Engineer's deletion of the prototype parser is a call nobody reviewed.** He
proposes deleting 120 lines of working, commented regex on the ground that its entire justification
— no model in the loop — was removed by assumption A4, and he expects this to be the contested call.
No other Wave 1 agent saw it. It is inside 3.8 (LOOP-5) and it is the one place in this plan where a
sub-step's description carries a decision that has had exactly one reader. Flagged for Wave 2 rather
than resolved.

**5. The Systems Engineer's own stated worry is not addressed by this plan, because it cannot be.**
He wrote that if the merge turns out to be a project in its own right, then cohering a merge, a
bootstrap and an answering loop inside one gameplan is optimistic in a familiar way — one project
attempting three things at once, which fails differently from three projects wearing a trenchcoat
and just as reliably. The Engineer's return removes the specific trigger he named: the overlap is
cosmetic, no rewrite pass is needed, and the merge is a step rather than a project. But seventy-two
sub-steps across seven steps is what the five drafts add up to — seventy-three before the two gates
were reconciled at 0.3 — and I have not shortened it. That is a schedule judgment for the Manager at
0.7 and the author at 0.8, and it is not mine to make by quietly dropping rows.
