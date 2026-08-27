# Accumulator: Lunar Oracle
## Last updated: 2026-08-26, at the close of Step 0. Entries written by The Manager.

> Created at 0.1 from `cr-agents/templates/accumulator.md`. The template's ten sections, plus The
> Writer and The Fact-Checker, who are on the standing roster (A.12.11, A.12.12) and both ran at
> Step 0 but are absent from the template. Recruited personas are in their own section at the
> bottom. Eleven personas ran this cycle. The three who did not — The Loftsman, The Topologist and
> The Motor Designer — carry no entries, and that is correct rather than an omission: there is no
> geometry in this project.

---

## Standing roster

### The Manager
- **Step 0 (open at 0.1 and 0.1 rev. 1; close at 0.7).** Ruled Step 0 a nine sub-step contract
  rather than eight, on the ground that 0.1b is spawn-bearing and carries its own deliverable.
  Returned five findings against the author-approved seed; all five accepted and folded into the
  gameplan. **F1** (the TDD precondition does not fire on Step 0) — **held at close**, with The
  Designer's cold-restart finding recorded as its cost. **F2** (Objective 4's enforcement is
  architecture, not prose) — discharged at 3.8 and 5.1. **F3** (nobody owned first-run state) —
  discharged at 1.5 and 6.6. **F4** (the conceptual-integrity review was out of order; the Systems
  Engineer states a position at 0.2 and is held to it at 0.5) — **this one paid for itself twice**:
  it caught the state duplication and it produced five plan defects nobody else had flagged. **F5**
  (echo site registry required at close) — the registry exists and **failed its first test**; see
  the live position below.
- **Fixed five standing drafting assumptions verbatim across all five Wave 1 prompts**, on the
  ground that the real integration risk was five agents guessing differently about the open
  questions. No assumption collision appeared at 0.3. Rewrote all five prompts at rev. 1 when the
  repository layout changed and Open Question 1 closed, and rewrote the open document in place
  rather than amending it, so that no superseded prompt survived to be spawned by mistake.
- **Live positions.** (1) The curation gap is deferred, not dissolved, and **was not closed at
  0.7**; the trigger is now narrowed to the eight differing overlap pairs rather than all 95.
  (2) 72 sub-steps is the honest decomposition and no consolidation list is owed; the schedule lever
  is deferral of Step 7, which is a dependency leaf, not compression of the count. (3) This project
  generates counts faster than it records their counting rules — one system problem, not six
  incidents — and the echo site registry is not yet the gate that fixes it.
- **Corrections received.** None to the findings. The scope contract was extended twice by author
  feedback and both times the open document had to be rewritten. The lesson recorded: a Manager open
  written before the author's feedback has landed is a draft, not a contract.

### The Loftsman
- (no entries; no geometry in this project)

### The Software Engineer
- **Step 0.2 (Wave 1), the answering loop and the TDD front end.** Delivered the loop as gameplan
  steps, the answer contract (six verdicts, three trace grades as a closed set), the four-mode
  classifier, the wave selector, and the acceptance suite structure. **Accepted substantially
  intact.** Answered Open Question 4 with a mechanism rather than a menu: the verdict the router
  already computes selects the wave — APP/FIGURE and REFUSE buy zero personas, LITERATURE and BOTH
  buy one, CONTESTED buys exactly two in parallel. That is better than the tiered-loop shapes on
  offer because it reuses a computation the loop performs anyway.
- **Took a position against an exception and won it on someone else's grounds.** Asked whether the
  contested-claims register is consulted at classification time or after retrieval (D2), he ruled
  *at classification time*, declining the exception to the inherited rule because a post-retrieval
  check can only fire on what retrieval already returned. The Systems Engineer noted at 0.5 that he
  had refused it on the Systems Engineer's grounds rather than his own. That is the A.9 tension
  between them producing agreement rather than conflict, and it is worth remembering that it can.
- **Corrections received.** Integration found he had scheduled a transfer-gate specification and a
  suite with no build step between them, and created 4.6 to fix it. On Objective 4's enforcement
  (Manager F2) he delivered two checks with `--prove` decoys built by mutating real produced output
  rather than by writing counterexamples, which is the stronger form and should be the house style.
- **Live position.** The 0.45 confirmation threshold was tuned on a single-field 156-file corpus and
  has no standing at the merged size (B2). He is right, and 3.6 exists to hand him a labelled
  fixture set before 3.7 uses it.

### The Systems Engineer
- **Step 0.2 (Wave 1) and 0.5 (Wave 2). He is the persona whose predictions are worth loading.** At
  0.2 he stated a conceptual-integrity position and three falsifiers he agreed to be held to,
  written before the plan they judge existed. **He predicted falsifier 2 (state) would fail. It
  half-failed.** At 0.5 he verified the catch **by exhaustion rather than by accepting integration's
  report** — checking that install-state tokens occur at seven places in the plan and that every one
  outside sub-step 1.5 is a read. A persona who names his own most likely failure in advance and
  then refuses to take the good news on trust is a persona whose next prediction should be believed.
- **Verdict: one project.** He held the 0.2 position and reported the ground under it improved,
  arguing the plan cannot be cut along merge/bootstrap/loop lines without severing four named
  sub-steps that each have a foot in two of the three. **Explicitly declined to certify** 72
  sub-steps, calling it a schedule risk rather than an integrity defect and referring it to The
  Manager at 0.7 and the author at 0.8. The referral was correct and it was answered.
- **Returned five plan defects nobody else had flagged, four of them originating in his own 0.2
  text**, which he attributed to himself rather than to integration: nothing fetches (E6); the
  verified-against ref is content and the plan files it as per-install state, violating his own rule
  that anything which must survive a clone is content (E12); the drift report cannot distinguish
  "the authority moved" from "we moved the authority," which stopped being hypothetical when this
  project pushed two commits into a borrowed working copy (E10); upstream *withdrawal* has no
  verdict, and six deletions occurred during Step 0 (E11); and E5's accepted limit is invalidated by
  this plan's own sub-step 3.7 (E13). All five accepted.
- **Live positions.** Pinned or floating (D4): **neither as stated** — record the ref, float the
  checkout, compare at bootstrap, report drift, automate nothing, because a hard pin makes staleness
  invisible the same way floating makes breakage invisible and trading one invisible failure for
  another is not a decision. A git pre-commit hook is not a mechanism, because hooks are not cloned
  (E1). "Committed" is aspirational throughout this project until the first commit exists (E9) —
  still true at close.

### The Designer
- **Step 0.5 (Wave 2), the gameplan as a designed artifact.** Two verdicts, both negative and both
  correct: **works as a briefing, fails as a worklist** for a cold-restart reader; and **fails** for
  the stranger who cloned the repository, where the one sentence written for that reader was wrong.
  Returned fourteen items of structural damage and an echo-site catalogue, applied at 0.6. The
  gameplan now opens with a paragraph for the stranger and the progress log is reverse-chronological
  and says so.
- **His cheapest finding was his best: the loose ends register did not state its own size.** It now
  declares 42 rows across five lettered tables, so a row lost to a bad splice is detectable by
  counting. That device is his and it should be reused on every register this project builds. It
  passed at close.
- **Ruled on the document's habit of narrating its own error-catching** — four such passages — as
  **honest record-keeping: keep all four, cut four phrases**, each failing the same test. That is
  the harder call and the right one; the easy call was to cut all four as theater.

### The Engineer
- **Step 0.2 (Wave 1), the corpus merge. Objective 1, the primary assignment, and the one Wave 1
  slice that could not be reasoned about from the design notes.** Ran the counts himself and
  **corrected two of the orchestrator's claims**: the PDF-to-summary pairing rule is a shared
  author-plus-year token across two naming conventions, not directory adjacency (adjacency is a
  symptom, and implemented as a rule it matched the Outer Space Treaty to a Deming paper); and the
  net-new pull is 52 PDFs and 224 MB, not 163 and 601 MB, because one 111-PDF folder *is* the origin
  of what this repository already holds. Both corrections accepted and both are now the governing
  text. This is the clearest vindication in Step 0 of putting an empiricist on the wave.
- Answered the house-format question — the one that decided whether the merge is a step or a project
  — and the taxonomy question (eleven top-level folders, one level deep, none over 32 files and none
  under 5). Found six tokenization collisions in the Scenario Explorer corpus, all the same source
  twice; the author directed the fix rather than the schedule and the corpus went 158 to 152.
- **Corrections received, and one matters.** His Open Question 8 measurement was sound and **his
  classification of it was overstated**: he reported thirteen summaries reproducing printed abstract
  text and made clearing them a precondition of public release. Re-read, the count is four and three
  of the four are explicitly marked as quotation at the point of use. **The measurement was right
  and the verdict was wrong**, and the orchestrator repeated the verdict without checking it. The
  lesson is narrow and worth carrying: a shingle detector measures overlap, not passing-off, and the
  difference is visible only by opening the file.
- **Live positions.** Pulled PDFs land at `literature/_pdf/<taxonomy>/` rather than interleaved with
  summaries, and he flagged this as reading against the directory map's wording rather than taking
  the variance himself (D6) — the right way to raise it. The two adjudicated duplicate pairs are a
  deferred merge rather than a resolved tie, because both losers carry content the winner lacks and
  the pattern is systematic (D7).

### The Editor
- **Step 0.4, second pass.** Audited The Writer's register specification and wrote the standing
  prohibition on epistemic theater. Made sixteen cuts, flagged twenty-four dashes without applying
  them, and **disagreed with The Writer on three points**, one of which is the sharpest thing either
  of them produced: The Writer's checkable form was too strong and his own best example violated it.
  That is the A.9 Writer/Editor tension working as designed — he could articulate the editorial
  principle warranting each cut, which is the standard the guide sets.
- **His load-bearing contribution is the deletion test**: delete the sentence and ask whether a false
  claim now stands. Three slots filled is substance and ships; zero is theater and is cut; **one or
  two is unfinished and goes back to the persona who wrote it.** That third outcome is what makes it
  usable rather than binary, and it is his. He drew the line in one sentence — a permitted
  self-statement names an object, a prohibited one names the answer — and was honest that the
  deletion test itself does not mechanize.
- **Set the prohibition's scope**, which the design intent had left open: it governs team
  deliverables (the answer block, the answer file, the refusal) and exempts specifications, run
  logs, agent handoffs and the Oracle's own register, which have different readers. That exemption
  is why this gameplan may record its own corrections without breaching the rule it states.

### The Writer
- **Step 0.4, first pass.** Composed the register specification: the haiku contract, the deliverable
  text block, the refusal shape, and the first-run sequence content. **Accepted, with The Editor's
  sixteen cuts and three disagreements applied.**
- **His decisive move was to derive the haiku prohibitions from provenance rather than from taste.**
  The haiku reports the disposition of the turn and never asserts the answer; it is composed after
  the deliverable exists and has passed its own check, never before. He then **refused to put a
  number in the opening sequence on the grounds of a loose end in this project's own register**.
  That refusal is why The Systems Engineer's falsifier 3 did not fire, and why he called it the
  strongest of the three: whimsy turned out to run on the same provenance rule as the rest of the
  system, which is exactly what had to be true for Objective 4 not to be a fourth project.
- **Live position.** Six worked haiku, one per verdict, plus a set of haiku that must not ship. The
  worked pairs are fixtures for 5.1's decoys rather than illustrations, and should be treated as
  such when that sub-step opens.

### The Fact-Checker
- **Step 0.5 (Wave 2).** Traced every factual claim in the gameplan to the tree on disk, a git
  object, or a file. **29 supported, 6 unsupported, 11 contradicted.** All eleven corrected at 0.6.
  Most were the orchestrator's own numbers going stale as the artifacts changed underneath them,
  which is one system problem rather than eleven incidents and is recorded as such.
- **One of her own findings was wrong and was caught by re-running her procedure.** That is the
  right failure mode for a verifier: her rulings are reproducible, which is how the error surfaced.
  Her verification is judged **adequate**, and what raises rather than lowers confidence is that she
  states her method per finding, so any of the 46 can be re-run by someone who does not trust it.
- **Her six UNSUPPORTED findings matter more than her eleven contradictions**, and The Manager ruled
  them one systemic defect at close: three of the six are numbers stated without their counting rule.
  She said it herself inside her own C6 — that the trigger a number closes should be re-run against a
  stated basis — and that sentence changed a Manager ruling at close. A verifier whose reasoning
  moves the scope-holder rather than only the text is being used correctly.
- **Ruled on two contested register rows and upheld both, improving the second.** The exemplar
  contested pair is genuinely not contested (Beason and Henderson are on the same side, and the
  decisive evidence was inside Henderson's own file), and the corpus has no primary pro-targeting
  source, which is systematic bias rather than a gap. She improved that row by noting Johnson 1982 is
  not merely absent but *registered* as absent.

### The Space Resources Engineer
- **Step 0.2 (Wave 1), the lunar question surface.** Delivered the ten question classes, the app
  boundary drawn class by class (Manager F1 addendum), the ten thin patches where an answer would be
  a guess wearing a citation, and the fifteen lunar contested-claims register rows. Shipped the
  registers **as data rather than as prose**, which is what made them mechanizable downstream and is
  the reason his slice cost the plan less than its size suggests.
- **His highest-value findings are the two prototype defects nobody else could have found**, because
  they require reading the app and the router together. `app_model.js` extracts `model()` but not
  `valueModel()`, so the app's entire economic half is unreachable by any APP verdict and the router
  **does not refuse** — it answers an app question from a literature summary (C1). And `model()`
  returns 26 keys while `OUTPUT_LEXICON` names 8, so the outputs a resources person actually asks
  for fall through (C2). C1 is the inherited authority rule being violated by the mechanism built to
  enforce it, and it is the most serious single defect found in the prototype.
- Also found EXCLUDED-BUT-ADJACENT (C5): the app resolves an excluded address into a modelled
  neighbour and returns a number. Three adjacency pairs shipped as data.
- **Live position, and it is half of a standing tension.** He flagged the pre-merge register-authoring
  hazard himself and proposed his own mitigation — author the rows against current paths before the
  merge, rebind after — which is why 1.9 sits in Step 1 and 2.16 in Step 2. His A.9 tension with The
  Growth Economist is unresolved by design: he asks whether anyone has built it and at what TRL; the
  economist asks whether an economy holding it would compound.

### The Topologist
- (no entries; no geometry in this project)

### The Motor Designer
- (no entries; no geometry in this project)

---

## Recruited personas

Provisional until approved by the author at the 0.8 gate. A recruited persona serves the current
task by default and does not join the standing roster unless the author decides otherwise (A.13.3).

### The Recruiter
- **Step 0.1b.** Ran against the economics gap named by The Manager at 0.1. **Returned The Growth
  Economist, anchored on Moses Abramovitz.** The selection argument is the contribution, not the
  name: Abramovitz is the only candidate whose published apparatus is a *test of transferability*
  rather than a description of an episode. Jorgenson, Denison, Young and Gerschenkron were
  considered and rejected on the record, and the Denison rejection is the sharpest — a persona built
  on a source the corpus carries twice would defend his own shares rather than referee the fight.
  He met a harder version of the requirement than The Manager specified.
- **Ruled against a second recruit** for corpus curation, on three grounds: 182 sources is below the
  scale at which knowledge organization becomes a discipline; the hard part of the job is domain
  judgment rather than organization, so a specialist would have to ask the economist for the pairing
  and you would have hired a scribe; and the rule that fixes it already exists and is already owned.
  **Assigned the artifact instead of the seat** — the register from the two domain personas, the
  retrieval invariant from The Software Engineer, the merge structure from The Engineer. That
  three-owner assignment was better than anything The Manager proposed, and it is better
  specifically because it lands the register as structure in the corpus rather than as a document
  somebody consults.
- **Live disagreement with The Manager, on the record and not resolved (D5).** He ruled the gap
  dissolved by the artifact; The Manager ruled it deferred by the artifact. **Neither trigger fired
  at close.** His (a Fact-Checker finding of one-sided retrieval on a registered claim at 0.5) did
  not fire. The Manager's fired negative on a proxy and was **narrowed rather than closed**: the
  eight differing overlap pairs have not been read, and 2.2 reads them. He named the future hire's
  shape in advance — Lancaster on indexing and abstracting, or Bates if the failure is on the asking
  side — which makes the next call cheap.

### The Growth Economist
Anchored on Moses Abramovitz (1912–2000). Recruited at 0.1b. **The seat is provisional and the
author rules on it at 0.8, so this entry records what the seat produced that no other seat would
have.**

- **Step 0.2 (Wave 1), the economics question surface.** Delivered the economics question surface,
  the seventeen economics contested-claims register rows with `register_side`, `register_lean` and
  `register_class`, and the transfer gate.
- **What no other seat would have produced.** (1) **The transfer gate itself** (4.4–4.6): any answer
  carrying a mechanism from the Japanese corpus into a lunar context emits `legitimate`,
  `illustration` or `unknown`, and `unknown` composes a refusal rather than a hedge. The Systems
  Engineer named this at 0.5 as new discipline the inherited five rules do not contain. It is the
  Abramovitz apparatus — social capability and technological congruence — turned into a mechanism,
  and it exists only because the seat was filled by someone whose published work is a transferability
  test. (2) **The three-class retrieval invariant** (4.2): a one-line "return both sides" invariant
  would have produced new errors on `false_pair` and `one_sided` claims, and he is the reason the
  invariant has three classes rather than one. (3) **The FA1–FA8 ruling** (D1): an FA deliverable is
  *not* the same kind of object as a summary — a summary's warrant is that every claim resolves to
  one source, while an FA deliverable is a cross-source adjudication with a verdict column and
  arithmetic present in no source, so merging them breaks the resolution-grade guarantee silently for
  files that look identical to their neighbours. That ruling came from one paragraph The Manager
  asked for as a side note and it turned into a corpus-architecture decision. (4) **The reference-class
  rule** (4.3) and the two unnamed inputs, `δ_lunar` and the demand sponsor, named as gaps carried in
  the corpus rather than quietly assumed.
- **The finding that justifies the seat on its own.** He identified that the corpus has no primary
  pro-targeting source, so the affirmative industrial-policy position survives only as reported
  speech inside its critics — and that asked whether industrial policy worked, this corpus would
  return a confident, well-cited, one-sided answer that passes every other check in the plan. The
  Fact-Checker independently upheld it. **No standing persona would have caught that**, because
  catching it requires knowing which side of the Japanese debate each source is on.
- **Live position, and it is half of a standing tension** the Recruiter proposes adding to A.9 for
  the duration of this project: *The Growth Economist vs. The Space Resources Engineer*, necessary
  conditions from opposite directions, do not resolve. A secondary tension runs against The
  Fact-Checker — she catches fabrication, he catches valid and correctly cited sources doing work
  they were never licensed to do — and that second one is this project's actual failure mode.

### [Recruited] Corpus curation and retrieval — NOT RECRUITED
*Gap named by The Manager at 0.1, declined by The Recruiter at 0.1b, and the disagreement stands
(D5). Two triggers, neither fired at close. The Manager's is now narrowed to the eight overlap
pairs that are not byte-identical, which sub-step 2.2 reads. The Recruiter's is a Fact-Checker
finding of one-sided retrieval on a registered claim. Shape of the hire if either fires: Lancaster
on indexing and abstracting, or Bates on query behaviour if the failure is on the asking side.*

- (not spawned)
