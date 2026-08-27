# Accumulator: Lunar Oracle
## Last updated: 2026-08-27, at the close of Step 1. Entries written by The Manager.

> Created at 0.1 from `cr-agents/templates/accumulator.md`. The template's ten sections, plus The
> Writer and The Fact-Checker, who are on the standing roster (A.12.11, A.12.12) and both ran at
> Step 0 but are absent from the template. Recruited personas are in their own section at the
> bottom. Eleven personas ran at Step 0. The three who did not — The Loftsman, The Topologist and
> The Motor Designer — carry no entries, and that is correct rather than an omission: there is no
> geometry in this project.
>
> **Step 1 entries added 2026-08-27.** Seven seats ran, across **26** spawns. Counting rule:
> `ls cr_scratch/step1_*.md` minus the two orchestrator files (`step1_author_rulings.md`,
> `step1_orchestrator_verification.md`) = **23 seat-attributable files**, counted 2026-08-27,
> **plus the three 1.8 ratification briefs, which were spawned and whose files were not preserved** —
> that gap is Exception C of the Step 1 close. Per seat: The Software Engineer 6, The Systems Engineer
> 5, The Designer 3, The Engineer 2 + 1 brief, The Space Resources Engineer 2 + 1 brief, The Manager
> (economics prompt) 2 + 1 brief, The Fact-Checker 1, The Manager 2. The Writer and The Editor did not
> run: A.3.3 permits skipping the writing wave for a step that produces specifications and data, and
> The Manager ruled it skipped at the open.

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

- **Step 1 (open at the Step 1 open; close at this file's date).** Scoped fourteen sub-steps —
  the eleven drafted at Step 0 plus 1.0, 1.12 and 1.13, added to give register rows E17, E16 and E8
  the addresses they lacked. All fourteen delivered. Ruled the TDD precondition fires on one artifact
  only, ruled 1.2 closed with its operative consequence relocated into the answer contract at 1.3,
  and rewrote 1.6's C4 charge after finding `verify_report.js` unmaterialized rather than missing —
  a 328-line source block inside a prose file, which turned a two-option question into four and then
  into an author ruling. **Accepted.**
- **Four falsifiers stated at the open. Two fired.** The 1.12 placement was wrong: a count without
  its rule appeared in group 1, before the contract existed. The TDD subset was too narrow: four of
  the counting-rule contract's ten defects are authors needing a form the contract did not provide
  and inventing one. Corrected rule recorded at the close — **a specification whose form other agents
  must write against is reader-facing, and the precondition fires on it.** The concurrency ruling on
  1.0 and the one-cycle sizing both held.
- **Verdict at close: not ready for the author.** Six bounded revision items, one of which closed
  while the close was being written; one new sub-step (1.14,
  the manifest and amendment register), and promotion of the fifteen frozen specifications before
  amendments are applied rather than after.
- **The common-cause ruling, and it is the one that matters.** Seven relay errors in one step plus
  sixteen live counting failures is one system problem with two arms. Arm 1, counts inside
  deliverables, is addressed by 1.12 and closes when `tools/quantities.js` lands with a
  check-register row — not with more contract text. Arm 2, counts crossing a boundary into a prompt,
  a ruling or a summary, is addressed by nothing that landed, and the standing rule written at close
  is that **a number does not cross a boundary unless the seat relaying it ran the operation that
  produces it, and the relay carries the operation.** Underneath both: every agent output is verified
  and nothing verifies the verifier. One unchecked node, the highest-traffic one.
- **Corrections received.** Two of the step's counting errors are mine rather than the
  orchestrator's: the 42-against-44 accumulator figure carried from Step 0, and "thirteen amendments"
  written into a Wave 2 brief when the figure is seven, because 13 was the highest row label. The
  lesson recorded: a label is not a count, and continuing another table's numbering makes the two
  indistinguishable to a reader who did not write either.
- **Errors of scoping, both structural rather than factual.** 1.0's row named a reviewer and no wave,
  so the suite that discharged the TDD precondition became the contract unreviewed. And the open said
  the orchestrator reads 1.0's defect list before group 2, and never said who applies the fixes, so
  nobody did until the Wave 2 review re-found the same defect.

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

- **Step 1: six spawns, the most of any seat.** 1.3 the answer contract, 1.8 the register schema,
  1.11 the answering-loop suite and its v2 reconciliation, and the testability reviews of 1.4 and of
  1.5/1.13. **All accepted.**
- **He settled by measurement a question that had been argued as a preference for two steps.** Three
  personas proposed three register encodings and each argued from a property it valued. He built all
  three against a copy of the corpus, ran them through the real retrieval layer, and measured what
  each does to it: the rich in-file block writes the question's own words into member bodies — 7.73%
  mean IDF loss and 14 spurious confirmations — which is the shape `confirmInText()` exists to
  refuse. **A rich in-file register block is a fabrication vector**, and it would have given 14 files
  a full-text confirmation they had not earned. The harness is committed and re-runnable, which is
  why the finding survives the argument.
- **Both reviews found their blocking defects by running things rather than by reading them**, and
  this is the property to load next time. `CHK-09` is in the set `CHK-10` dispatches and asserts
  `git hook run pre-commit` — he built it and watched it recurse without bound. The install state
  record validates before it branches on schema version, so a future record is classified corrupt and
  overwritten, destroying exactly what the version field was written to protect. And the artifact the
  consolidation ruling names as survivor cannot lift a marked block from a CRLF file — measured, exit
  2 — while advertising that capability in its own register row.
- **He found his own frozen contract wrong and left the test red rather than writing it to the rule
  he believed was wrong.** The answer contract's limit-line arity repeats a forty-word paragraph once
  per trace; a limit line a reader skips protects nobody. LIM-3 is red on purpose with a named owner
  and a close condition. His simplicity gate fired on his own text, which is what it is for.
- **Corrections received.** His 1.11 ledger advised a verifier that if she opened one file it should
  be `app_model.js`. Exactly one of the five claims concerns that file, and following the advice
  would have missed the only contradiction in the set. Recorded as a general finding rather than a
  slip: **guidance about where to look is not neutral.** Separately, his 1.8 amendments moved the
  answer contract to version 2 while his own 1.11 suite was asserting version 1; he flagged it
  himself and the version field caught it before any code existed, which is what it was added for.
- **Live positions.** Nineteen bootstrap assertions is too many — cut three, merge two, reclassify
  one, giving fourteen plus a recorded fact. Unanswered by The Systems Engineer and standing for the
  author. The two weak checkers consolidate, and **2.15 is the wrong date**: a check that cannot fail
  sitting on a gate for eleven sub-steps is the defect still running, not a debt. `claim_bearing.js`
  needs its own row before 3.9; ruled in and numbered 3.8b at the Step 1 close.

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

- **Step 1: five spawns, four of the seven contracts.** 1.1 the enforcement layer, 1.4 the bootstrap
  contract, 1.5 the install state record, 1.13 the check register, 1.6 the currency policy. **All
  accepted, three with blocking review findings owed back.**
- **He now runs his own assertions against his own deliverable before handing it over**, which is the
  change from Step 0 and it is the one worth loading. The clearest instance in this project so far:
  at 1.13 he wrote an assertion, implemented it, ran it, found it inert, and reported the inertness
  against himself. His reviewer said he would not have caught it faster.
- **His E1 remedy had E1's own defect, and he found it.** `core.hooksPath` can be set to a
  nonexistent directory, or to an empty one, and git exits 0 and fires nothing either way. So
  asserting that `core.hooksPath` is set proves nothing about whether a hook will ever run. Register
  row E1 said a pre-commit hook is not a mechanism because hooks are not cloned; the fix it proposed
  was silently inert for a different reason.
- **Seventh instance of this repository's container-versus-content pattern, and it inverts.** All
  eight files in `tools/` are committed at `100644`, so a hook committed there is inert on a Linux
  clone and passes on the author's machine: the content is committed and the trigger is metadata.
  He also established that the POSIX exec bit is not the gate on git-for-Windows and that a
  shebang-less hook fails closed, which is the safe direction.
- **Corrections received, and the pattern in them is one pattern.** His 1.5 membership rule was not
  upheld: M1 refuses `corpus.digest` by its own terms, M3 has two readings, and he admits admitting a
  field "in a weaker form" of a clause — which is what a rule that can be applied two ways looks like
  from the inside. Repaired rather than rejected; the count stayed three and every ruling survived
  except `pdfs_present`. His `CHK-09` specifies a self-invoking pre-commit loop. His 1.5 and 1.13
  produced two mutually exclusive BC-8 amendments on the same day, from one author, findable only by
  reading both files in one pass. **The common thread is that he cannot see the collisions between
  his own sittings**, which is why the amendment reconciliation at 1.14 is not his.
- **Live positions.** Record the ref, float the checkout, compare at bootstrap after an explicit
  fetch, report drift, automate nothing — unchanged, and now the frozen currency policy. The root
  length budget is a preflight fact rather than an eighth phase, and an uninhabitable root is a
  terminal outcome rather than a seventh mode; his reviewer tested both and found for him on both,
  supplying a better argument for the first than he had used. He staged a fight over BC-7 and the
  reviewer declined it. The nineteen-assertion count is contested and he has not answered.

### The Designer
- **Step 0.5 (Wave 2), the gameplan as a designed artifact.** Two verdicts, both negative and both
  correct: **works as a briefing, fails as a worklist** for a cold-restart reader; and **fails** for
  the stranger who cloned the repository, where the one sentence written for that reader was wrong.
  Returned fourteen items of structural damage and an echo-site catalogue, applied at 0.6. The
  gameplan now opens with a paragraph for the stranger and the progress log is reverse-chronological
  and says so.
- **His cheapest finding was his best: the loose ends register did not state its own size.** It now
  declares 44 rows across five lettered tables (counting rule: rows matching `^| [A-E]<n> |` in the register, counted 2026-08-26; A 8, B 7, C 5, D 7, E 17. Section F is prose, not a table), so a row lost to a bad splice is detectable by
  counting. That device is his and it should be reused on every register this project builds. It
  passed at close.
- **Ruled on the document's habit of narrating its own error-catching** — four such passages — as
  **honest record-keeping: keep all four, cut four phrases**, each failing the same test. That is
  the harder call and the right one; the easy call was to cut all four as theater.

- **Step 1: three spawns.** 1.0 the cold-read suite for the operating contract, 1.12 the
  counting-rule contract, and the Wave 2 echo-site and worklist review. **All accepted.**
- **1.0 discharged the TDD precondition and it shipped unreviewed**, which is The Manager's error and
  not his. 121 tests weighted toward audience comprehension per A.10 step 7, run cold, returning 22
  failures with 8 blocking and a fix for each. The blocking ones were all against the operating
  contract and none forced rework of a Wave 1 deliverable, which is the falsifier that did not fire.
  His finding that the plan file does not contain Step 1's sub-step list went unrepaired for the
  whole step and he re-found it in Wave 2 as the highest-value single edit available.
- **1.12's contract is sound in design and its first run failed hardest against its own author.**
  Sixteen hard failures live across the declared file set; ten are in his own file, and every
  unresolved-tag failure in the project is his. He reported this himself and refused to treat it as
  mitigation. It is also the strongest single piece of evidence for the common-cause ruling: the
  author of the countermeasure produced the defect at the highest rate while writing it.
- **His Wave 2 review found the amendment queue has four collisions, not one.** Three are
  cross-document and none had been reported; one is a single integer, `Q-CHECK-ROWS`, carrying three
  competing successor values from three documents, with one of them writing a literal header row that
  is wrong the moment either of the other two lands. Nobody found any of these by reading. The
  ruling at close accepted his instrument over a document, on his own ground: **amendments collide on
  quantities and the collision is computable.**
- **`oracle/MANIFEST.tsv` and `oracle/AMENDMENTS.tsv` accepted as specified**, and both are 1.14's.
  MF-3 — every `BEGIN` marker under `cr_scratch/` has a row — is the clause that earns the manifest.
  His `### Step 1 sub-steps` gameplan edit was accepted and applied before this close.
- **The size-declaration device is his and it keeps paying.** It is now on the loose-ends register,
  the check register, `VERIFIED.tsv`, both new registers, and both register row sets, where a
  self-reported count matching a parsed count is what catches a splice error rather than an
  arithmetic one.
- **Corrections received.** One from Step 0 was The Manager's rather than his: his accumulator entry
  recorded the loose ends register as declaring 42 rows when it declares 44. Carried into 1.12 as
  live evidence, and it is now stated with its counting rule above.
- **Live position.** The worklist and the index have come apart and Step 1 widened the gap by roughly
  a factor of ten. Fifteen specified target paths, zero of which existed at his review, with nothing
  joining a target path to the file holding its text. The promotion ruling at close is the response.

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

- **Step 1: 1.7, the naming and source-identifier contract, plus an addendum, plus one of the three
  briefs into 1.8's schema ratification. Accepted.** `NAMING.md` states both namespaces because the
  author's FA ruling created a second shelf, and the discriminator between them is mechanical rather
  than visual. 176 of 176 names pass the frozen rule.
- **He overturned register row E14 by going and looking.** The row said a long filename broke a
  clone. The file it cites is on disk in this working copy at 160 absolute characters with
  `core.longpaths` unset, and it checked out without incident. The Step 0 clone that failed was made
  into a session scratchpad whose root is ~147 characters. **Root length broke it, not the filename**,
  and the observation had been recorded without the conditions under which it was observed. So
  `core.longpaths` in the bootstrap is not sufficient and may not be necessary; the fix is a path
  budget split between root and repo-relative. This is the highest-value single correction of the
  step and it changed a bootstrap requirement.
- **He withdrew one of his own claims after measuring it**, and flagged a gap in his own quantity
  block — `Q-ROOT-ALLOWANCE` names a parent block that does not exist — rather than letting the
  checker find it. That is the right direction and it is the same discipline three other seats showed
  this step.
- **Correction received, and it is instance 10 of E16.** He stated "ten of the nineteen" FA files
  needed renaming. The true figure is 14, counted against the rule
  `^fa[0-9]+-(deliverable|source-list)\.md$` over the 19-file shelf. The wrong number was relayed
  into the option the author ruled on and re-run only afterwards. It was produced in group 1, before
  the counting-rule contract existed, and it is what fired The Manager's falsifier 2.
- **Owed to him and outstanding at close.** `literature/FIELDS.tsv` and `INDEX.tsv` are his and were
  silently excluded by the frozen `.gitignore` for four sub-steps; they are re-admitted now and must
  land in the same commit as the corpus. He must also rule, before 2.15, that an excluded app node's
  `app_surface` string is its exclusion sentence, or four register axes refuse on every question
  touching the excluded nodes.
- **He owns 1.14 at the Step 1 close** — the promotion manifest and the amendment register — chosen
  as the least conflicted seat: he authored one of the eight amendment targets where two other seats
  authored three and four.

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

- **Step 1, Wave 2: the A.10 step 2 source-verification gate on the 1.11 suite, plus four Step 1
  source claims. Accepted, and it changed work in three places.** She ran the gate because The
  Software Engineer cannot run it against his own suite. Five of seven UNVERIFIED rows cleared, one
  CONTRADICTED, one contradicted from her Part 2, three source claims contradicted or qualified.
- **The consequential verification made the claim stronger than its author had.** FIX-10 pinned
  register row C1. `valueModel` is not merely absent from a return list — it lives in the `VALUE-CORE`
  island of `lsei/index.html` and the Oracle's one door never opens that island; `margin_prop` is not
  among `model()`'s 26 output keys. She then ran the router and got `LITERATURE`/`ANSWERED` with a
  resolving trace on a question the contract requires be refused. **C1 is live and the fixture marked
  green fails its own stated invariant.**
- **She caught the orchestrator's fourth relay error.** A helium-3 total of ~8,500 litres per year had
  been reported to the author as coming from the corpus. Grep of the whole corpus returns three
  occurrences of that figure and none is a helium-3 volume; it is three category figures summed, and
  one of the three is a detector category rather than government demand. The six components verify.
  **The total exists in no source.** Kept the verdict category distinct: UNSUPPORTED is not a softer
  CONTRADICTED.
- **She verified a negative by running it, which is the harder direction.** `verify_report.js` was
  checked by executing it: `node --check` clean, loads the real app, exits 0 on a clean document,
  fires two independent defect classes separately, and self-proves by planting seven decoys. It is a
  real verifier, not a fragment, so the author's ruling to drop the dependency rests on accurate
  grounds rather than on a belief about what the file was.
- **One methodological finding worth keeping, against the suite's own advice.** The ledger told her
  that if she opened one file it should be `app_model.js`. Exactly one of the five claims concerns
  that file, and following the advice would have missed the only contradiction in the set. **Guidance
  about where to look is not neutral.**
- **Live position, and it is the second half of the tension the recruited seat named.** She catches
  fabrication; the failure mode she keeps finding here is different — valid, correctly cited sources
  doing work they were never licensed to do. ECR-01 was the instance: the correction underneath it
  verified and was stronger than claimed, and the verdict built on it dropped a word and inverted what
  the axis reported. It was re-scoped and re-verified before the Step 1 close finished, and her gate
  is the only reason it was found.

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
  merge, rebind after — which is why 1.9 sits in Step 1 and 2.16 in Step 2. His A.9 tension with The Manager
(economics prompt) is unresolved by design: he asks whether anyone has built it and at what TRL; the
  economist asks whether an economy holding it would compound.

- **Step 1: 1.9, the fifteen lunar register axes, plus a correction addendum, plus one of the three
  briefs into 1.8. Accepted.** 15 axes, 81 members, 127 key slots, 107 distinct, zero failing, and it
  re-verifies strictly today under the strict tool: exit 0, zero FAIL lines, ALL PASS.
- **He wrote the checker before the rows, and it caught what his reading missed.** Four keys passed
  the first check and failed the second; three are the same error and he names it plainly — **he
  reached for the app's word for a quantity rather than the corpus's.** The sharpest instance is that
  the three Cabeus sources never use the word "grade," which was the title of his own Step 0 entry.
  Checks before rows catches what checks after rows cannot, and that is now demonstrated twice this
  step by two seats independently.
- **Correction received, and his response to it is the part worth loading.** A live cluster failure
  shipped in the ratified rows because the checker he used prints failures and exits 0, and an
  orchestrator filter deleted the failure line before the verdict was read. Sent back to fix one
  cluster, he started at the option that would have dismissed it — the two files are different NASA
  offices four months apart, no shared content, and on the stated hazard the unregistered one scores
  0.00 and ranks #112 to #125 of 152, so the hazard genuinely does not exist. **Then he measured a
  question nobody had asked**, on which the unregistered file ranks #1 and the registered one #2,
  0.70 apart, with only one of the two carrying a register block — so which file retrieval happened
  to return decided whether the register engaged at all. He registered it, with a position stating the
  document baselines a fission element and states no mass allocation. His own words: he would not
  have added it unprompted, and a check he wrote and then defeated found what his reading missed.
- **Six Step 0 figures were wrong or under-described and are corrected in the rows**, including a
  water-to-dust ratio with no stated excavation depth anywhere in its source, a deck that states no
  TRL, and a source that prints no specific power at all. All six had been quoted in Step 0 prose.
- **He declined to propose a numeric cluster cut-off** on nine samples with a nine-point gap and one
  non-duplicate sitting closer to a non-duplicate than to its own duplicate. Over-inclusive is the
  right direction and saying so beats fitting a threshold to nine points.
- **Owed.** Three duplicate ids in the addendum against the parent file. One requirement open on
  LCC-12, the axis shared with the economics side and deliberately not duplicated.
- **Live position, unchanged and now carried as data rather than as argument.** His A.9 tension with
  The Manager (economics prompt) is intact through 1.8, 1.9 and 1.10, and `register_class` is what
  carries it. It must survive 2.16's merge without being collapsed.

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

### The Manager (economics prompt)

*The recruited seat was dissolved by the author at the Step 0 gate. The work below was authored under that seat and is retained in full; it is now The Manager's, under a separate economics-focused prompt. Two spawns, two prompts, one persona.*
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
  the duration of this project: *The Manager (economics prompt) vs. The Space Resources Engineer*, necessary
  conditions from opposite directions, do not resolve. A secondary tension runs against The
  Fact-Checker — she catches fabrication, he catches valid and correctly cited sources doing work
  they were never licensed to do — and that second one is this project's actual failure mode.

- **Step 1: three spawns under the economics prompt.** 1.10, the economics register axes; its ECR-01
  addendum; and one of the three briefs into 1.8's schema ratification. **Accepted, with one axis
  routed back and corrected before the close finished.** This is the first cycle run under the
  author's dissolution ruling: two prompts, one persona, no arbitration between the hats, and the
  manager hat did not adjudicate the economics hat's output at close.
- **He built the two key checks before authoring rather than after**, which is why 51 of 340 candidate
  keys were rejected at authoring time instead of shipping dead. Ratified at 17 axes and 176
  `match_keys`; after the ECR-01 correction, **18 axes, 53 members, 185 `match_keys`, 0 K1 and 0 K2
  failures**, classes 6 `false_pair` / 7 `two_sided` / 5 `one_sided` — re-verified by The Manager at
  the close, exit 0, zero FAIL lines over the whole unfiltered output, ALL PASS.
- **The finding that generalizes past this sub-step.** A probe scored 0.00 on its own axis because the
  key was `relationship` and the corpus says `relationships`. That is the third `match_keys` failure
  mode — a key nobody would actually say — and 1.8 established it is unreachable by any build check.
  It was caught only because probes are measured rather than authored. It would otherwise have shipped
  as a 1.11 fixture and failed there, one step later and further from its cause.
- **Correction received, and the response to it is the part worth loading.** ECR-01's verdict was
  contradicted by the Wave 2 gate: the B7 correction underneath it verifies and is stronger than
  claimed, but the verdict dropped the word "Japanese," and the source reports an affirmative Korean
  finding with no row anywhere. He re-scoped ECR-01 to `false_pair` with three sides, put Lane 2017 on
  a new axis rather than folding it onto ECR-01, and withdrew three statements in his original file.
  **He then found a third defect the gate had not asked about**, by applying its third warning to his
  own rows: `kiyota-2013`'s own summary of its lineage says Japanese industrial policy contributed to
  labour-productivity growth but not to TFP, which contradicts an `axis_statement` asserting
  six-of-six no effect. And he verified every one at source before changing anything, on the stated
  ground that **a correction made against a report rather than against the source is the defect it is
  correcting** — which is the Step 1 close's boundary rule, stated by the seat that had just been
  caught by it.
- **Live position, and the tension is intact.** ECR-15 and ECR-16 state both positions and mark
  neither correct. The A.9 tension with The Space Resources Engineer — which necessary condition binds
  first — was never asked to resolve at 1.8 and the two row sets were not merged at 1.9/1.10. The
  Step 0 finding that justified the seat still holds and is now encoded: the corpus has no primary
  pro-targeting source, so the affirmative position survives only as reported speech inside its
  critics.
- **Structural item owed at the merge.** The two row sets carry two pre-merge `basis_root` values and
  the header has one field. The two headers cannot be spliced unchanged; nothing breaks at answer time
  because the join key is the leaf.

### [Recruited] Corpus curation and retrieval — NOT RECRUITED
*Gap named by The Manager at 0.1, declined by The Recruiter at 0.1b, and the disagreement stands
(D5). Two triggers, neither fired at close. The Manager's is now narrowed to the eight overlap
pairs that are not byte-identical, which sub-step 2.2 reads. The Recruiter's is a Fact-Checker
finding of one-sided retrieval on a registered claim. Shape of the hire if either fires: Lancaster
on indexing and abstracting, or Bates on query behaviour if the failure is on the asking side.*

- (not spawned)
