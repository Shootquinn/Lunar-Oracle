# Accumulator: Lunar Oracle
## Last updated: 2026-08-28, at the Step 2 Wave 1 close. Entries written by The Manager.

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
>
> **Step 1 revision-pass entries added 2026-08-27 at the re-close.** Four seats ran in the revision:
> The Engineer (1.14), The Systems Engineer (R-2), The Software Engineer (R-3), The Designer (R-4).
> R-1 was the orchestrator's and R-6 was The Manager's, and neither carries a persona entry. **Two
> personas withdrew their own mechanisms in favour of a colleague's, and both withdrawals are
> recorded as withdrawals rather than absorbed into agreement.**
>
> **Step 1 final-close entry added 2026-08-27.** One seat ran: The Systems Engineer, at gate item C-1.
> **The 23 above is stale and is deliberately left standing beside the per-seat breakdown it agrees
> with.** The counting rule it states — `ls cr_scratch/step1_*.md` less the two orchestrator files —
> now returns **29**, measured at the final close, because the re-close, C-1 and this close each wrote
> a file. Re-deriving 23 would require re-attributing six files per seat and re-deriving the 26 spawns
> beside it, which is work and not a cell. **The defect is that the number is a literal in prose whose
> population grows with ordinary work**: it is the `M15` class inside the accumulator, and the fix is a
> computed tag rather than a habit of remembering to update it. Recorded rather than patched, so that
> the fix is made once at the right level.

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
- **The common-cause ruling revised at the final close, and arm 2's remedy withdrawn as a remedy.**
  Orchestrator relay error 8 is the controlled experiment: the rule *a filter over a file set reads the
  manifest, not a remembered list* was authored by the seat that had just committed error 7, and that
  seat broke it **one measurement later** — while obeying its letter, because the rule specified the
  input and said nothing about the instrument. Error 9 then put a fabricated manifest census into the
  gameplan sentence written as part of the same repair. **Common cause, and the freshness of the rule is
  what proves it**: it removes the only special cause anyone could plead, which is not knowing the rule.
  **Arm 2 was one label over two classes.** Arm 2a, six instances, is a seat repeating a number somebody
  else produced, and *run the operation yourself* is the right remedy. Arm 2b — errors 7, 8 and 9 plus
  the four verdict-reading harness errors, **seven of the nine, and every wrong verdict this step** — is
  a seat running an instrument it wrote and never tested, once, and using the first output as a result.
  Telling somebody who ran the operation to run the operation is not advice. **By my own standard, a rule
  a person must remember is not a process fix**, so both standing rules are kept as definitions of
  conformance and measuring instruments, and neither is a control. The two remedies that are process
  changes: **move the boundary artifacts into the declared file set** so the existing `M15` covers spawn
  prompts by construction rather than reaching out to them, and **use the `H` row every register already
  writes about itself as a known-answer test** on any ad-hoc extraction — the manifest declares 20, and
  an extraction returning seven single letters or a census of 47 is refuted in one line by the file it
  read. Instances are in `cr_scratch/step1_orchestrator_verification.md`; the ruling is at the final
  close §3, with its own falsifier.
- **A defect in how I write gate rows, found in my own C-2.** Its What column listed four things and its
  done-when tested three, and the untested clause is the one that did not land — the same shape as the
  R-2 remit of seven executed as three, one level up and authored by me. **A done-when that does not test
  every clause of its own What is an invitation to discharge the tested part.**
- **Ruled at the final close that a found defect in a shared factual index is corrected by its finder,
  not routed.** Every refusal cycle adds two crossings of the boundary where nine of this step's errors
  happen, so routing three verified one-line corrections through it to reduce errors made at it is a
  control action that increases the variable it targets. The line, taken from The Systems Engineer's C-1
  refusal: **you correct a false measurement in a shared factual index; you never touch another
  persona's argument.** Its falsifier is F3 at the final close §6.
- **Corrections received.** Two of the step's counting errors are mine rather than the
  orchestrator's: the 42-against-44 accumulator figure carried from Step 0, and "thirteen amendments"
  written into a Wave 2 brief when the figure is seven, because 13 was the highest row label. The
  lesson recorded: a label is not a count, and continuing another table's numbering makes the two
  indistinguishable to a reader who did not write either.
- **Errors of scoping, both structural rather than factual.** 1.0's row named a reviewer and no wave,
  so the suite that discharged the TDD precondition became the contract unreviewed. And the open said
  the orchestrator reads 1.0's defect list before group 2, and never said who applies the fixes, so
  nobody did until the Wave 2 review re-found the same defect.

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 open (2026-08-27).** Ruled the TDD precondition FIRES, against his own Step 0 exemption,
  on the corrected rule his own falsifier produced: a specification whose form other agents must
  write against is reader-facing. Added 2.19 and 2.20 — obligations his Step 1 close had named with
  an owner and no address — and the author approved both the same day. Refused conditional-close
  language in advance, by name, in five forms.
- **The author rejected the six-cycle shape after Cycle A. He conceded it without defending it**,
  which was the instruction, and then found four defects in his own plan that the restructure fixes.
  The sharpest was his: he had scheduled The Fact-Checker's A.10 step 2 source gate in Wave 2, after
  the suite it gates had been the contract for the entire step — the gate firing after the thing it
  gates. He also found that his own arm-2b split had been placed on every pairing except the one
  that most needed it, and that three of the four assertion slots were owned by the seat running the
  operation they gate.
- **The rewave.** Three waves, with the boundaries at the two points where the corpus stops being
  cheap to un-do rather than where the schedule runs out. The staged merge — build into
  `cr_scratch/_stage/`, promote in one move on another seat's stated exit code — is the read-set
  problem solved rather than managed. He adopted The Software Engineer's read-digest remedy
  **verbatim** rather than inventing a Manager's version of it, and said why.
- **The seam call was pre-registered before the datum existed**, with the statistic, the checkpoint,
  the threshold, the reason for the threshold, and the resolution if the measurement cannot be taken
  (split, automatically). Measured at the wave: churn 5/59 = 8.47%, side condition live and clean.
  W1 stayed whole on measurement rather than on preference.
- **Two rulings he took rather than carried**, both routed to him from Cycle A: the 143-site `AM-`
  rewrite declined permanently, because 107 of the 143 sites are frozen deliverables of four other
  seats and rewriting them would make the record say something it did not say on the day it was
  written; and `QUANTITIES.md` regeneration made a wave-boundary action of the orchestrator's, never
  a seat's.
- **A correction he made against himself at the Wave 2 open.** His own brief stated that 11 of the
  15 standing hard failures were one fork. Re-run at the boundary: **10.** `M3 Q-DEGRADED-MODES` is
  a different id in a different pair of files and is the `AM-132` supersession theorem, not the
  ECR/LCC15 fork. The wrong figure was his and it was plausible.
- **Wave 2 open — the instrument freeze, and the honest answer to the author's question.** Wave 1
  was correct and it did not move the ball. `literature/` held zero files at the Step 2 open and
  holds zero files now, while the apparatus governing it grew this wave by 27 tests, 10 check rows,
  8 amendment rows, one contract version and six quantity ids. He declined to state that as "too
  much enforcement" — every addition answered a real defect — and stated it as ratio and sequencing:
  **the enforcement layer has never been executed as a system, and we have been adding to it instead
  of running it.** Two Wave 1 findings prove it and both were accidents. Wave 2 therefore carries a
  four-number apparatus ledger per seat with a stated allowance, and falsifier `H6`: if Wave 2 ends
  with `literature/` still empty, the freeze was not the binding constraint and the Provenance chain
  splits by force in Wave 3.
- **Three rulings, each stated in a form someone can execute.** `MRG-4` — the column splits into
  `byte_source` and `pair_primary`, on the `CHK-13` precedent from this same wave, with `MRG-4b`
  added to cover the one row where the merge writes bytes present in neither corpus copy. The fork
  collapse — executed by the seat that measured each half, with that seat's write set widened to its
  own Step 1 files, because the alternative is a third seat editing two deliverables it did not
  write against values it did not measure, which is arm 2b in its pure form. Clauses 8 and 9 —
  rewritten, and **the structural half taken on himself**: arm 2a is discharged at the wave open or
  not at all, so from Wave 2 every spawn prompt lands on disk before any seat runs.

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

- **Step 1 revision pass: R-3, the answer contract at version 2. Accepted.** One edit, eleven
  amendments, one increment. **The three queued bumps were never three**: the rule said the version
  increments on any change, which reads either as counting changes or as naming states, and only one
  reading is usable. All three consumers — the run log, the acceptance suite, the file itself — need
  the integer to identify a state, and a version that counts amendments is a version nobody can land
  without knowing what everyone else landed first. Ruled: **the version names a state of the file.**
- **He kept the version field on evidence rather than on attachment to it.** His own 1.3 rule was that
  the field goes if any consumer stops reading it. All three still read it, and it caught two real
  disagreements in one step before any code existed. A field that has caught two defects is not
  decoration.
- **He withdrew his own mechanism.** He had drafted `L6` for the register-merge problem and withdrew it
  in favour of The Systems Engineer's `SET-2`, reached independently from the schema side, and recorded
  the withdrawal as `AM-121` `declined` **with the reason**, on the ground that a withdrawn amendment
  leaving no trace is the defect the register exists to prevent.
- **He implemented what a colleague had specified without implementing.** `L0` and `L1b` were specified
  at R-2 with no code; he built both and proved both able to fail, and fixed `ecr_verify.js` taking the
  last `H` row in a file rather than the paired one.
- **He turned two green fixtures red.** `FIX-9` and `FIX-10` were both green and both wrong, and both
  fail on one mechanism nobody had named. They are RED with close conditions that are their own runs.
- **He declined a fix with the file open in front of him.** The limit-line arity defect (F7) is routed
  to The Editor by `LIM-9`. His stated reason was never "no window"; it was "not mine." Having the file
  open is not a reason to widen your own authority, and `LIM-3` stays RED. Recorded because the
  opposite instinct is the common one.
- **Owed to him, and it is the Step 1 gate item.** His four blocking 1.4-review findings, F1 to F4,
  were written at Wave 1, entered the amendment register as `AM-01` to `AM-04`, were placed in R-2's
  remit by The Manager, and **were never applied.** All four are `owed` at the re-close and `AM-01` is
  verified live in the promoted text. **The review was right and the system lost it**, which is a
  finding about the boundary between seats rather than about either seat.

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 Wave 1 (W1-2): `SLOT-A`, `SLOT-C`, 2.19(b), the read-digest.** All accepted. The suite
  went 148 to 175 tests and `SLT-5` held — header, per-group list and rows agree, verified by the
  command printed in the header. He applied his own simplicity gate to his own additions and refused
  to give each of `PDF-14`'s five fixtures its own row when one assertion covers the property they
  leave open: nine `CON` rows instead of fourteen.
- **`MRG-10` is the load-bearing half of his own pair and he said so.** `MRG-9` is dedup-key
  collision within a folder; put the two colliding rows in different folders and it passes correctly
  while the corpus carries one source twice under one key. He wrote the general assertion rather
  than a test of the one known pair, in the wave where two reviewers were moving folders.
- **He reported `SLT-7` PARTLY discharged and named which part.** Eight `SLOT-A` rows were observed
  able to fail or pass against real data; four assert on a merge command that does not exist and are
  recorded as not proved. A test that has never been shown able to go green has never been shown to
  be a test.
- **He raised an alarm against his own deliverable rather than letting an empty list read as a clean
  one.** The Manager's seam statistic carries a side condition on rows he has asserted against;
  while his `asserted_against` list was empty that condition was vacuously true and could not fire,
  which is half the detection the Manager specified. He said so, then populated it — all 176 rows at
  their committed `rev` — and reported the two inputs without making the call.
- **`MRG-4`: he found a contract collision and refused to resolve it by rewriting his own test.**
  `primary_secondary` means *which corpus copy supplies the bytes* to The Engineer and *which member
  of the pair is primary* to him; 8 pair groups, 0 with one primary — correct under his reading,
  vacuous under The Engineer's. He declined to fit the test to either answer and routed the ruling.
  **That was right, and the Manager ruled it a split.** It is `CHK-13`'s defect class caught before
  the merge rather than after.
- **THE PROCESS FINDING OF CYCLE A RECURRED TO HIM, INSIDE THE DELIVERABLE THAT FIXES IT, and he
  reported it against himself.** The hard-failure count went 12 to 15 while he worked; all three new
  failures are in a file he does not write. A count-difference would have assigned three defects to
  him. Third independent instance in the project.
- **He measured arm 2a against himself on mtimes and found it undischarged.**
  `tools/check_no_sources.js` at 13:49:44; his `SLOT-C` relay to its builder at 13:52:46. The
  receiving seat built three minutes before the brief existed, and the same holds for his relay to
  The Engineer. His conclusion is the structural one and the Manager adopted it: **standing clause 8
  is unsatisfiable as written between same-wave peers**, and no care inside one seat can fix an
  ordering requirement placed on a structure that has no ordering.
- **Corrections routed to him and carried into Wave 2**, none of them refutations of a verdict:
  `CRP-10` and `CRP-11` name five same-name disagreements where there are eight, and one of the
  three missing is `CRP-5`'s own worked example sitting in `_intake/` right now; `PDF-3` was marked
  green and was red; `PDF-14`'s five fixtures are four on a case-insensitive filesystem; `PTH-13`'s
  live set omits `oracle/AMENDMENTS.tsv`; and `PRV-13` needs a third outcome for "the source prints
  no DOI", which The Fact-Checker measured at 16 of 30 openable sources.
- **Live position, unchanged, and now the argument for Wave 2's shape:** a suite nothing invokes is
  a document. At 148 tests that was a remark; at 175, with three sub-steps relying on it as a gate,
  it is why the runner is his first Wave 2 item rather than his last.

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

- **Step 1 revision pass: R-2, the blocking findings applied to the promoted text. Accepted in part;
  see the correction below.** S1 is the one that mattered: `oracle/install_state.md` ran all six
  validity rules before it branched on schema version, so a future record that **adds a key** — which
  is what a schema bump is — was classified corrupt and overwritten by the very clause written to
  prevent that. He split §4 into a **parse gate** (true of every record at every version) and a
  **shape gate** (true only at this version), interleaved the branch between them, and wrote "steps 3
  and 5 may not be exchanged" with the reason underneath, because an ordering with no stated reason is
  an ordering somebody tidies.
- **He recorded that his own fixture could not have caught it.** His 1.5 future-version instance was
  "the valid record with schema 2" — schema-1's exact path set, the only future record that dodges the
  defect. He replaced it with a pair whose second member is byte-for-byte the corrupt instance except
  for the version number, and must be classified the other way.
- **Two rulings rather than repairs, both his and both accepted.** `oracle/REGISTER.tsv` will not
  exist: the sidecar is a **set** of files, one `basis_root` each, joined at load (`AM-98`).
  And `Q-CHECK-ROWS` moves `fixed` to `live`, which closes a four-way amendment collision **by
  reclassifying the quantity rather than by picking a winner** — a self-declared size row is a checksum,
  not a quotation, and a checksum forbidden to restate the number it checks is not a checksum.
- **He filed a defect against a colleague's specification without editing it.** `AM-1` is a forecast
  rather than a check and was reporting three false positives out of four; he wrote the finding, left
  the spec alone because it is The Designer's, and said so. The Designer then agreed and demoted it.
- **He closed two failures in his own file that were out of scope**, on the stated ground that writing
  a report about counting discipline over a red file of your own is the defect the report is about.
- **Two mitigations he applied unprompted, both now standing rules.** Every `cr_scratch` source whose
  promoted file he amended in place carries a `DIVERGED AT R-2 — DO NOT RE-LIFT` note above its `BEGIN`
  marker; and he stated that his failure count "is a reading of a moving file, not a score" and that
  whoever closes last must regenerate the index. Both are adopted at the re-close: the divergence marker
  as standing practice, and "no count taken while another seat holds a write is a verdict" as a clause
  of `COUNTING_RULE.md` §3 rule 11.
- **Correction received, and it is the Step 1 gate item.** His remit carried **seven** blocking items —
  S1, R1, R2, and 1.4's F1 to F4. He executed three. `AM-01` to `AM-04` and `AM-38` are `owed` against
  two promoted authorities, and `AM-01` is live: `oracle/bootstrap_contract.md` defines `ABORT` at line
  42 as confined to Phases 1 to 3 and assigns it at line 155, in Phase 5. **The list arrived short and
  the loss is at the boundary rather than in his work** — but his verdict line asserts completeness
  against a remit whose size he did not check, which is the receiving half of the obligation-count rule
  written at the re-close. Aggravated by a namespace collision he could not reasonably have seen:
  `AM-2`/`AM-3`/`AM-4` are amendment-register *checks* and `AM-02`/`AM-03`/`AM-04` are amendment
  *rows*, and his true statement about the first reads as a statement about the second.

- **Gate item C-1, and this is the entry that answers the correction above.** Sent the six `BLOCKING`
  rows his R-2 pass had not reached, he discharged all six and **four more that were the same edits**,
  and marked no cell `applied` until the promoted text was changed and read back. He verified each row
  was live in the authority before editing rather than taking the register's word for it. `oracle/`'s
  bootstrap contract now defines `ABORT` as *the bootstrap stopped before Phase 6*, with the cause form
  `ABORT (<phase>, <assertion-id>)` carried into all four §3 `On failure` clauses; `usable` is closed;
  `missing-recoverable` is a Phase 3 transient with every resolution path enumerated; both mode
  quantities are corrected with `superseded` entries; BC-4's consumer is named. `install_state.md`
  rule 4 is qualified by parent nullability and publishes a second fixture.
- **He left one row `owed` and put the reason in the cell.** `AM-23`'s BC-4 clause landed and its other
  eight did not, three of them moving a quantity that must land in one edit with `AM-24`. **Marking it
  `applied` for one clause of nine would have been the exact defect this gate item existed to repair**,
  and he said so in those terms. A seat who declines to bank a partial discharge, one pass after being
  corrected for banking one, is a seat whose next `applied` can be believed.
- **He made the number go up and reported it before anyone asked.** Landing the mode correction took
  `tools/quantities.js --check` from eleven hard failures to twelve, because `M3` has no reading for a
  recitation of a superseded value and three sites still carry the old figure — **all of them code-span
  recitations inside two frozen review documents written by two other personas while arguing the old
  value was wrong.** He checked both escape routes rather than assuming: the `pending:` form does not
  suppress `M3`, and check `AM-3` forbids it here anyway because a `cr_scratch` review document is not
  a manifest row. He minted `AM-132` against the counting rule and **declined to edit another persona's
  argument to make a checker like his edit.** Two of the eleven pre-existing failures have the same
  shape, which is the evidence that it is the rule's gap and not his.
- **He ran the general form rather than the reported instance, and named his own false positive.** Sent
  one bad checker name in `MANIFEST.tsv`, he swept every `tools/*.js` path named anywhere under
  `oracle/`, in `COUNTING_RULE.md` and in `QUANTITIES.md` against the filesystem. Four more do not
  resolve; **three are check-register rows for checks specified and not yet built, which is what a check
  register is for**, and the fourth was his own `\.js` pattern matching the `.js` inside `.json`. He
  reported the false positive instead of leaving it in a count.
- **He found the defect his own fix created and rowed it.** The `ABORT` cause form has two id spaces and
  only one is closed: `install_state.md` writes `ABORT (Phase 5, ST-3)` and nothing enumerates `ST-1`
  to `ST-3`. That is F1's closure defect one level down, and it is `AM-133`.
- **His `superseded` entry taught him something inside his own edit.** His first draft wrote the old
  figure in the bracketed quotation-tag form and it immediately became a thirteenth `M3` failure,
  because **a tag is a quotation of the current value and a `superseded` entry is a recitation of a
  former one.** He rewrote it in words. That is the same mechanism as `AM-132`, met from the inside.
- **The correction above still stands and is not softened by this entry.** Both are true of the same
  seat: the remit of seven executed as three, and the six-plus-four discharged with a partial left
  visibly partial. The second is the answer to the first, and the obligation-count rule is what makes
  the difference cheap to detect next time.

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 Wave 1 (W1-3): 2.14 containment, 2.20 register reconciliation, `NAMING.md` §7, `AM-145`.**
  All accepted. **The enforcement layer executed on a real commit for the first time in this
  project's history**, and it declared its debts rather than reporting green: 3 of 7 pre-commit rows
  dispatched, four named as missing artifacts.
- **The finding of the wave, and it was found by running rather than by reading.** The check
  register was internally consistent, its `H` row agreed with its parse, and it passed its own
  known-answer test — and it had never been executed. The first execution returned exit 1, because
  `CHK-14` had been blocking every commit since 1.13. A register that passes every check available
  to a reader and fails on first contact is the argument for executing an instrument rather than
  inspecting it, stated better than anyone has stated it in prose here.
- **`CHK-13` was two checks under one id — the ninth instance of this repository's
  container-versus-content pattern.** He found it from the mechanisms side; The Software Engineer
  found it independently from the paths side, in the same wave, by a different route. Neither saw
  the whole of it alone, and that is the strongest evidence the project has produced that the A.9
  seam is where it should be.
- **He wrote that his three quantity blocks "were verified to add zero hard failures," then ran the
  verification, and the sentence was false. He corrected it in place rather than deleting it.** The
  blocks are clean; minting them staled the index, which is two hard failures he caused, and he
  reported the count going 15 to 17 on his own action. He then **declined to regenerate the index**
  with the one command in front of him, because `QUANTITIES.md` is not in his write set and he had
  just spent three paragraphs holding other seats to that line.
- **`.gitignore` E1 is closed on eight carrier extensions** and the five paths that committed a PDF
  cleanly at 2.1 are all ignored. Residual, routed by the orchestrator and not hidden: `xls`, `xlsx`
  and `zip` still commit while `docx` and `pptx` do not, and `xlsx` and `docx` are the same
  container format.
- **`NAMING.md` §7 gained level 2B — an agency or grant number — inserted between the old levels 2
  and 3 rather than renumbered**, and his reason is the part worth keeping: "level 3" is cited
  across this corpus and five deliverables meaning *the weak key whose match is a candidate*, and
  renumbering would leave every one of those sentences syntactically intact and semantically
  inverted. A silent inversion of an existing citation is worse than an inelegant number. All four
  clauses were The Engineer's, supplied rather than debated, and they unblock 35 rows of the merge
  plan.
- **His A.9 disagreements with The Software Engineer are on the record and unsmoothed** — `PDF-3`'s
  stale status cell, `PDF-14`'s unrunnable fixture set, §0.2's false `CL-1` claim, `PTH-13`'s
  omission of `oracle/AMENDMENTS.tsv` — and so is what he agreed with, by name: `PDF-16`'s
  empty-stage clause is the single most valuable assertion in the set and he built the check around
  it.
- **His highest-priority routed item is a coupling, and the Manager ruled it his to execute in one
  edit.** `oracle/MANIFEST.tsv:24` and four `oracle/AMENDMENTS.tsv` rows all name
  `literature/NAMING.md`, which he moved to `oracle/NAMING.md`; `AM-3` joins them and **fails if
  either is fixed alone**.
  Verified at the Wave 2 open: `MF-1` red, four amendment rows on the old path, `AMC-3` green only
  because both halves are wrong together.
- **The conceptual-integrity finding carried to Wave 3 by ruling, not by drift.** Four instruments
  walked this repository within one minute and reported 100 / 71 / 17 / 89 files; no two agree and
  none is wrong, because each derives the declared file set privately. He asked for one owner and
  one declaration. The Manager deferred it to Wave 3 on his own logic: Wave 2 moves the set from 101
  files to roughly 280 by landing the corpus, and changing the definition in the same wave gives one
  movement two independent causes and makes the digest unreadable.

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

- **Step 1 revision pass: R-4, the counting rule at version 2. Accepted, and it is the strongest
  deliverable of the revision.** `COUNTING_RULE.md` 245 lines to 494. Seventeen amendments: the ten
  Wave 2 items, five this pass produced, and the two that R-2 and R-3 filed against the contract while
  it was open. **Six of the seventeen are forms that did not exist, and four of those an author had
  already invented in the wrong slot** — arithmetic under `script:`, an inherited condition under
  `conditions:`, a range under `value:`, a correction owed against frozen text under `superseded:`.
  His own sentence is the finding: a closed set with a missing member does not stop authors, it routes
  them into the wrong member silently, and `259 - 1 - 108` under `script:` looks like a filled field.
- **He found E16's own shape inside the contract written to close E16.** The mechanized clause list
  lived in a scratch file while §5, eleven amendment rows and the checker's header all cited its clause
  numbers, so a reader of `COUNTING_RULE.md` could not resolve `M11`. Moved into the contract as §9
  and §10.
- **Hard failures 32 to 11**, measured with the pattern and the anchoring stated beside the number, and
  every one of the eleven attributed to another seat with an amendment row.
- **He ruled arm 2 in and gave it a form**, and then said honestly what the form does not reach: rule 12,
  `M15` over the two boundaries that are files, and `H7` for the three that are not. **He states in the
  contract that all seven of Step 1's relay errors happened at the three `H7` covers and no script can
  reach them.** That honesty is why the re-close treats `M15` as a beginning rather than as a closure.
- **He withdrew his own mechanism twice.** `AM-1` was his specified check; he ruled it **a report and
  not a check**, agreeing with The Systems Engineer against his own specification, and pointed the
  property at `M3`, which asserts it better and mechanically. And `--exclude-superseded` — his own
  escape hatch — is ruled **not a flag**: it is an unconditional clause of §8, with the hatch inverted
  and renamed.
- **Three defects found by running his own amendments rather than by reading them.** The nested-fence
  rule, implemented literally, opened a fence on an **inline code span** and **silently deleted four
  quantity blocks**, with the checker reporting cleanly on the survivors. The corpus census does not
  reproduce because an upstream commit removed six duplicate summaries and no block existed to mark
  anything stale. And `grep -c` exits 1 on zero matches, so `check-A && grep -c FAIL && check-B` stops
  silently after the first clean check. **He found the first in ten minutes because he ran it; W2-2's
  missing lint went unfound for two days because nobody had.**
- **Correction received, accepted, and made by him.** His "fifteen target paths" is thirteen. The
  Engineer measured it; The Designer corrected it in his own file rather than arguing the count.
- **A rule of his own practice that he applied twice and never stated, now stated by The Manager.**
  When the hard-instance test finds a missing form: **supply the form when somebody was already writing
  in the empty slot, because the invention is the evidence of demand; demote or delete when the check
  produces findings no author was working around.** W2-2 was the first case and `AM-1` was the second,
  and he got both right without a rule.

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 Wave 1 (W1-7): `COUNTING_RULE.md` §3 rule 11 amended to require the moment as well as the
  command. Version 3 to version 4.** Accepted, and **the mechanism is live and self-demonstrating**:
  `--check` now emits `NOTE hard failures: N @ read-digest H over K files, tool 2.19-1`, a line that
  did not exist that morning.
- **The wave proved the amendment's premise while the amendment was being written.** Today's
  hard-failure series is 12 → 17 → 15 over 88 → 90 → 95 → 97 → 99 → 101 files. Every figure was
  correct and no two were comparable until his digest landed mid-wave. Before it, the only available
  reading of the series was that a seat's amendments broke five checks, which is false. Three seats
  and the orchestrator all published correct, non-comparable counts on one day.
- **He made his own document unable to move the count, by force.** Version 4 mints no quantity block
  and changes no value, because any block edit stales the regenerated index and moves the number —
  written by the seat whose whole deliverable is that the number keeps moving. Every numeral the
  document introduces is stated in exactly one file.
- **He audited the four amendments owed to him against their recorded states and found one stale in
  his own favour, then declined to change it.** `AM-141` reads `owed` and the work is done — `M15`'s
  computed population is implemented and running — so the state should read `applied`. It is another
  seat's row, so he flagged it and left it. `AM-138` and `AM-144` are genuinely still owed and he
  said so rather than accepting the appearance of completion from a tool that prints the right
  strings.
- **He overturned his own prior ruling on the strength of one measurement**, which is the entry
  worth loading: the relocation of the naming contract leaves thirty-one hard-coded paths rather
  than a broken glob, and the glob he had been defending is fine. He fixed the one reference inside
  his own write set and recorded the rest as frozen record with a count and a test in `AM-153`.
- **The clause collision he escalated to the Manager by name, and how he resolved it in the
  meantime.** Standing clause 8 requires a relay artifact at `cr_scratch/relay/spawn/`; clause 9
  forbids writing outside a declared write set that does not include it. He resolved **toward clause
  9** — the explicit constraint — and relayed through an amendment row instead, which is in his
  write set, is in the declared file set, is what the implementer acts on, and is what `M15` can
  see. Two other seats resolved the same collision the other way. **The Manager has now ruled both
  clauses rewritten**, and the fact that three competent seats resolved one collision three ways is
  the evidence that it was a defect in the clauses rather than in any of them.
- **Live position, unchanged and now carried into the Wave 2 close condition:** an omitted section
  is invisible and an empty one is falsifiable. That argument, his, is why `## Not mine` is a
  required section, why `none` is mandatory in a quantity field, and why the Wave 2 apparatus ledger
  is four numbers on every deliverable rather than a note when something changed.
- **Wave 2 note, decided at the open:** he is deliberately **not spawned in Wave 2.** His remit
  there was echo-site replacement over a repository whose corpus is about to change wholesale, which
  means doing it twice. He spawns at the Wave 3 open, after the tree lands, when 176 files are a
  real population rather than a projected one.

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

- **Step 1.14 (R-5 of the close): promotion, the two registers, and the counting-rule checker.
  Accepted, and it is the largest single delivery of the step.** `oracle/` and `literature/` came into
  existence: 11 marked blocks, 1 fenced seed and 2 generated files, **every lift verified byte-for-byte
  against an independently computed source slice.** `oracle/MANIFEST.tsv` and `oracle/AMENDMENTS.tsv`
  built and run.
- **`tools/quantities.js` reproduces The Designer's hand measurement exactly, clause by clause**, with
  the delta since his run fully attributed to two events that post-date it. A hand measurement and an
  independent implementation agreeing to the clause is the only evidence available that either is right.
  This is the strongest single result of Step 1.
- **He refused the job he was not qualified for and said why.** `oracle/REGISTER.tsv` cannot be
  assembled without a schema ruling he does not own; both halves carry one `H` row each and the
  concatenation produces 143 failure lines. He routed it rather than deciding it. **That is The
  Manager's falsifier 2 not firing: the least-conflicted seat behaved as the constraint predicted.**
- **He corrected the brief's premise before trusting any of it, and the premise was the orchestrator's.**
  "Every file in `cr_scratch/` is CRLF" is false — 35 of 41 are pure LF, and the file an agent called
  "CRLF on all 767 lines" has zero CRLF pairs. He also recorded that **his own first probe reproduced
  the wrong answer** and that a `grep -c $'\r$'` loop was an instrument fault, not a measurement.
- **He found by hand the one amendment collision `AM-1` structurally could not see** —
  `Q-ANSWER-CONTRACT-VERSION`, two amendments to one integer with no minted id — and typed a provisional
  id for it so the check could report it.
- **He corrected a colleague's count in his own deliverable**: "fifteen target paths" is thirteen, and
  The Designer accepted it.
- **Correction received, and it is a Step 2 inheritance rather than a defect in his work.** Promotion
  lifted **marked blocks, not files.** Measured at the re-close: `oracle/check_register.md`,
  `oracle/register_schema.md` and `oracle/currency_policy.md` hold **zero** quantity blocks between them
  while their `cr_scratch` sources hold **twenty-two**, so three promoted contracts have their governed
  quantities outside the authority that describes them. Two other contracts got theirs only because
  their authors happened to place the fence inside the marker range. **Which copy is the authority was
  decided by where somebody put a marker**, which is the accident The Manager's §5.4 was ruled to
  prevent. R-2 filed it as `AM-111` naming one file; it is three, and it rides `AM-102`. The
  specification said "promote the file" and defined the lift as a marker range, and said nothing about a
  block outside it — that gap is The Manager's, not his.

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 Wave 1 (W1-1): the merge disposition table, 2.2 and the 2.3 landing.** Accepted, and the
  orchestrator re-ran every figure in it: 176 rows by 17 columns, Block 1 = 117, Block 2 = 59, the
  five-way composition, the churn, the `id_in_source` census, the four `cr_scratch/`-bearing intake
  files, the 115 non-`.md` intake entries. **Exact, all of them.** This table is the wave's product
  and it is what 2.5 executes.
- **He refuted both of his brief's premises with arithmetic and named the unit error in one.** P1
  counted its first term in pairs and its other two in keys; restated in keys and deduplicated the
  contested population is **59 rows, not 52**. P2 was false on both halves.
- **The load-bearing correction: there are eight differing same-key pairs, not five.** The other
  three match their twins only after `normalize()`, and one of them —
  `BEA_depreciation_rates.md` against `bea-depreciation-rates.md` — is the corpus suite's own
  *hypothetical* failure mode for `CRP-5`, sitting in `_intake/` right now. An instrument comparing
  raw filenames reports five; the merge writes to the normalized key, so eight governs.
- **He opened all five non-Step-0 differing pairs rather than reasoning from byte deltas**, and they
  are one edit class: in every case the lsei copy is the intake copy with a cross-repository
  `cr_scratch/` reference stripped. Measured tree-wide: 4 of 119 intake files carry it, all four
  have a scrubbed lsei twin, 0 of 152 lsei files and 0 of the 24 intake-only files do. The
  disposition rests on that evidence rather than on size.
- **`poston-2020` disarmed with a hash instead of a promise.** He read `step0_dedup_decisions.md`
  before adjudicating, found that the kept summary is the *smaller* file chosen on content, and
  built the disposition on a sha256 match against the superseded set so the byte count never enters
  it. Each of the three rows carries `SIZE MUST NOT BREAK THIS TIE` in the data, where the merge
  will read it.
- **He published a defect his own instrument produced rather than the corrected number.** A first
  probe of citation-repair exposure returned 27 rows; twenty-six were his own case-sensitivity
  fault. The corrected figure is 1 — `azami-2024`, which records a DOI printed only in the copy the
  merge does not import — and he recorded that the wrong figure was his and was plausible.
- **He read The Software Engineer's file before writing his own, which is what neither of them did
  in Cycle A, and withdrew his own contract.** `INDEX-1`…`INDEX-5` is absorbed into the `FLD` group;
  two of his rows survive under new names because there was no `FLD` equivalent. The technical call
  was made on evidence inside the other seat's file, not on seniority, and the surviving contract is
  the one written by the seat that does not run the merge.
- **Corrections routed to him and carried into Wave 2:** three malformed quantity blocks in his own
  deliverable — `class: measured` outside the closed set of five, and two `cmd:` operations naming
  no `cwd` — flagged independently by four seats and unrepaired at the wave close; `kiyota-2013`'s
  level-2 identifier addresses an index rather than the paper; `metzger-autry-2023`'s `also` cell;
  and the measured IDF cost of retaining near-duplicates, which bears on his `HOLD-PAIR`
  disposition.
- **Two of his own routings were ruled at the Wave 2 open.** `tools/merge_plan.js` as a fourth
  instrument: **declined** — `--plan` shares `normalize()` and `identify()` with the identity table
  and splitting them creates two authorities on what a key is, which is the defect the whole step
  exists to prevent. And `literature/FIELDS.tsv`, a required deliverable missing since the Step 1
  gate with no check naming it: **pulled forward to 2.5** rather than left owed at 3.7.
- **Live position, in one line to the assertion author, and it is the merge's sharpest constraint:**
  the merge glob is `*.md`, never `*`. `_intake/japanese-miracle/lit/` holds 234 entries of which
  115 are not summaries, and three of those are UN treaty texts that would out-score the summaries
  of the same documents in a layer scoring on filename tokens.

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

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 Wave 1 (W1-6): the A.10 step 2 source-verification gate on `PRV-13` and `PRV-15`.**
  Accepted, and **both rows DO NOT CLEAR.** Two of the suite's 175 rows are therefore outside the
  contract until they are repaired — the gate returning a negative, which is the first time in this
  project it has.
- **She refuted her brief's third premise and the refutation is a fact about the whole step.** 112
  PDFs, all in `_intake/`; `lsei/` holds zero; `literature/_pdf/` does not exist. Of 271 corpus
  summaries only **30** have an openable paired source. The gate is runnable on a minority of the
  corpus, and she stated that as a fact about today rather than as a defect in the suite.
- **`PRV-13`: the claim is true and the pass criterion is contradicted.** Zero altered DOIs in a
  full census of 30 openable sources — nothing is fabricated, and the corpus is cleaner than the row
  assumes. But **16 of the 30 sources print no DOI at all**, so the row goes red on sixteen correct
  values. It needs a third outcome and a named non-source authority for it.
- **`PRV-15`: contradicted on the instrument.** Both label classes are empty, so the row is
  vacuously green and cannot be gated as written; and the tool the row names returns zero findings
  on a population of eight because of a heading regex it cannot see past. She re-ran with the regex
  relaxed and nothing else changed, which is what makes the underlying measurement sound rather than
  merely different.
- **The escalation that goes to the author, not into a wave.** Four files that Step 0 Part 8
  described as carrying transcribed abstracts measure **0.0% today** with plain headings, and Part
  8's description of one file's markup does not match the file. Either the four were rewritten or
  the original measurement was of something else. She flagged it and did not resolve it, which is
  the correct disposal of a question about a frozen record.
- **A count corrected against her, and the finding under it got worse rather than better.** Her
  `DUP-5` line count of 14 is exact; "across 8 sources" does not reproduce — 14 paths, 11 distinct
  basenames, 11 distinct DOI targets. The stronger measured statement is that **twelve of the
  fourteen carry no `DOI:` line at all**, so the two populations are complementary rather than
  overlapping: for twelve files the DOI exists in the corpus and is filed under a field named
  `Publisher URL:`. Any check keyed on `DOI:` scores those twelve as having no identifier while the
  identifier sits one line away — which lands directly on `PRV-13` and makes it fail for one more
  reason than she gave.
- **She obeyed the narrower of two conflicting standing clauses and flagged the conflict rather than
  resolving it privately.** Her write set forbade the relay path; clause 8 required it. She wrote no
  relay file and said who must. **The Manager has now ruled the clauses and the relay path is in
  every seat's write set by construction.**
- **Live position, sharpened by this wave and stated in her own words:** every DOI in this corpus is
  correctly cited, and the failure she found is not a fabricated source but **two contracts asking
  sources to say things sources do not say**. Internal agreement would not have found either. Only
  opening the PDF did.

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

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 Wave 1 (W1-4): review of the lunar half of the disposition table.** Accepted. Placement
  **ACCEPTED** with one `also` refused, and the arithmetic verified mechanically rather than read:
  11 of 11 folder counts exact, 176 placed, 176 distinct, zero missing, zero unplaced, 176 of 176
  origin tags correct.
- **He refuted his brief's first premise and the refutation reframed the review split.**
  `space-economy-and-markets` is a lunar-corpus folder of 26 files; `lsei/literature` has eight
  folders totalling 152 and all eight are the lunar corpus. "Seven" was the *review* split, not the
  field label — which is exactly the distinction The Engineer put in two separate columns, and it
  held under an independent reader.
- **The mechanical explanation of the forked quantity id, and it is the sharpest thing in the
  wave.** `REGISTER.lunar.tsv`'s `H` row pins axes and member rows and has **no distinct-leaves
  field**. So `Q-LCC15-MEMBER-ROWS` could not drift and `Q-LCC15-DISTINCT-LEAVES` had nothing
  holding it. One id forked in value and one only in id, and the cause is a missing header field
  rather than anyone's carelessness.
- **He confirmed The Engineer's treaty-text disposition and refuted the stated reason for it.** The
  glob is harmless; the actual mechanism is that `normalize()` strips only a trailing `.md` and then
  appends `.md` unconditionally, so `un-1967-outer-space-treaty.txt` becomes
  `un-1967-outer-space-treaty.txt.md` — a property of the naming contract, not of any glob. And both
  declared enforcement points pass clean on the poisoned corpus.
- **He measured the cost of retaining near-duplicates rather than arguing it.** Adding three
  duplicates to 152 moved `un-1967` from 4.60 to 4.35 IDF and `un-1972` from 11.40 to 10.99 while
  unrelated files rose. The finding is general across all nine known near-duplicate pairs — a
  measured argument about `HOLD-PAIR`, supplied to the seat who adjudicates it, with the explicit
  statement that he holds no position on which member wins.
- **He refused to make a schema change inside his own register, with the file in his write set**,
  because a schema change written by one register's owner into one register is exactly the fork this
  project keeps producing. He proposed the seventh `H` field and routed it.
- **He declined to execute the supersession he was sent to execute, and was right.** Executing it in
  his write set would have made `M2` worse; he settled the value at 59, verified it three ways —
  register measurement, the addendum's own operation re-run, and all 59 resolving on disk — and
  routed the parent-file edit with the exact line numbers. **The Manager has now ruled that edit
  his, with his write set widened to his own Step 1 files.**
- **`register_class` handed to `SLOT-D` as four assertable properties rather than as prose**, and
  `D-4` names the single `match_keys` collision in the entire 33-axis data: `distribution`, carried
  by `LCC-03` and `ECR-15`, both `two_sided`. The one possible key collision between the two
  registers lands on the axis written to hold the A.9 tension, and a class-equality guard cannot see
  it *because the classes are equal*.
- **A correction routed to him and unreconciled:** he reported measuring "all 106 of my files."
  The seven non-econ lunar folders sum to 126 and the eight sum to 152; 106 reproduces under neither
  population the orchestrator could construct, and his §4A also speaks of 11 folders, which is the
  merged placement table rather than the lunar tree. Two populations under one word. It touches no
  verdict of his.

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

**Step 2, Wave 1 (2026-08-28). Written by The Manager at the Wave 2 open, per A.4 step 7.**

- **Step 2 Wave 1 (W1-5): review of the four economics folders, the `Q-ECR-AXES` fork, and the 2.9
  recommendation.** Accepted. The register's known-answer test passes exactly both ways: the `H` row
  reads `18 53` and the file holds 18 `A` rows and 53 `M` rows.
- **The finding that should govern how this project handles briefed remedies.** His brief told him
  to supersede the fork with `class: superseded`. He staged a copy of the declared file set,
  reproduced the baseline at 12, applied each candidate remedy and re-counted **before touching the
  repository**. The briefed remedy makes it **worse — 12 to 13** — because `class: superseded`
  removes neither the duplicate id nor the quotation sites and stales the index on top. Collapsing
  the fork instead is **12 to 6**. He verified the mechanism inside the tool rather than inferring
  it: `--include-superseded` is a *promotion* exclusion over `cr_scratch/` marker ranges and has
  nothing to do with `class: superseded`. The flag is misnamed.
- **He generalized a colleague's finding into a theorem and supplied the second instance,
  prospectively.** The Systems Engineer's `AM-132` proved after the fact that a supersession of a
  quoted id is permanently red from the moment the correction lands; he proved it on `Q-ECR-AXES`
  **before** touching anything, which is the only reason his deliverable does not contain an edit
  that raised the count.
- **The sharpest consequence, and it sharpens the Manager's own boundary ruling.** With the edit
  made and the index not regenerated, the failure still fires — because `QUANTITIES.md` is itself a
  quotation site. **The index of record is a quoting site, so the boundary regeneration is not
  tidying up after the correction; it is half of the correction.** A seat's edit alone cannot close
  a forked id, whoever owns the file.
- **He declined to widen his own write set to reach a number he wanted**, minted the successor in
  his own file where the counting rule permits it, left the two failures firing by design rather
  than by omission, and asked for one line of ruling with the price attached both ways. **The
  Manager has ruled: widen, execute, both halves at one boundary.**
- **A retraction he made before it could do damage**, and it disciplines the rest of his review: he
  withdrew a placement recommendation whose basis he could not reproduce. He also recorded
  `ryan-2000-self-determination-theory` as the live falsifier on the two-value field set rather than
  as an awkward case to be argued past.
- **`ECR-12` has an unregistered third side sitting in the corpus** —
  `imf-1963-appraisal-japan-double-income`, Fujioka writing eighteen months into the Income Doubling
  Plan, whose reading is neither of the axis's two: the binding constraint was the balance of
  payments, not the arithmetic of the target. Its `match_keys` guarantee it will be retrieved, and
  it will arrive unclassified beside a two-sided axis. **He did not add it**, because adding an `M`
  row moves the `H` row's field 6 and therefore one of the five forked ids — landing a correct
  enrichment on top of an open fork adds a divergence to the id he was sent to close.
- **One axis spans both `field` values and must be scored from the pooled table**, measured at up to
  2.02 nats of asymmetry on its own keys. Without that, the field label silently adjudicates by
  arithmetic the one disagreement this project has deliberately refused to adjudicate — and his
  instruction to `SLOT-D` was to assert the value 3.7 rules, not the value it holds today.
- **2.9 (Denison and Chung): branch C recommended, B standing, A declined — and it goes to the
  author, not into a wave.** He landed the half of branch B's hard block that is true under all
  three branches, which is the right shape for a recommendation whose ruling is not his.
- **Live position, unchanged:** the A.9 tension with The Space Resources Engineer is carried in
  `register_class` and in `ECR-15`/`ECR-16`, which state both positions and mark neither correct.
  2.16 can flatten it without anyone noticing.

### [Recruited] Corpus curation and retrieval — NOT RECRUITED
*Gap named by The Manager at 0.1, declined by The Recruiter at 0.1b, and the disagreement stands
(D5). Two triggers, neither fired at close. The Manager's is now narrowed to the eight overlap
pairs that are not byte-identical, which sub-step 2.2 reads. The Recruiter's is a Fact-Checker
finding of one-sided retrieval on a registered claim. Shape of the hire if either fires: Lancaster
on indexing and abstracting, or Bates on query behaviour if the failure is on the asking side.*

- (not spawned)
