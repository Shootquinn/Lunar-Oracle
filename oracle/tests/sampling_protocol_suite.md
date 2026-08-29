# The sampling-protocol test suite

**Sub-step 7.4. Stage 1 of four**, per `tdd_method.md`: this file is the suite, The Writer produces
the topic-sentence outline (7.5) and the manuscript (7.6) against it, and The Editor runs the
revision pass (7.7). **Tests before content. Always.** The document does not exist yet, and that is
the point — a suite written after the draft is a description of the draft.

**Written against `oracle/answer_contract.md` version 2**, read out of §9 at authoring time.
The document under test is the **sampling protocol**, specified at
`cr_scratch/step0_software_engineer_loop.md` §5.4 as *"rate, denominator, annotation procedure."*

**53 tests.** Counting rule: rows in the six tables below whose first cell matches `^SMP-[0-9]+$`.
Counted by running that rule over this file, not by adding up a delta. Per group: WD 10, SC 8,
RT 9, RD 12, AN 8, TH 6.

**The id sequence has gaps at 19, 20 and 30, and they are deliberate.** Ids were allocated per group
block so a row can be added to a group without renumbering the file, and the counting rule counts
ROWS rather than the id range. A later reader closing the gaps would orphan every reference already
made to an id, which is the rule `transfer_assertions.md` states for its own TG-42.

**Status column.** `green` = expected to pass once the manuscript exists. `RED` = a defect already
known, with a named owner and a close condition. `H` = a human gate, marked so nobody counts it as
mechanized. **`UNRUN IS NOT PASS`. `VACUOUS IS NOT PASS`.**

**Why this suite is not in `run_suite.js`.** The runner executes two loop suites whose subject is a
mechanism on disk. This suite's subject is a manuscript that does not exist, so every row would
report UNRUN and the runner would carry 53 more unbound rows against 348 it already carries, for no
gain. **Six rows here are mechanizable the moment the manuscript lands** — SMP-05, SMP-06, SMP-21,
SMP-22, SMP-41 and SMP-53 are all byte-level assertions over the file — and wiring them is owed at
7.7, named here so it is a scheduled edit rather than a thing nobody does. Owner: The Software
Engineer. Close, and it is an observation not a date: `run_suite.js` reports a non-zero row count
for this file.

---

## 0. What the document is, and the trap it has to avoid

**The protocol is the honest close on the TDD front end.** §5.4's own words: *"The suite makes the
mechanical failures impossible and the judgment failures countable. It does not make them
impossible, and a suite claiming otherwise would be the exact epistemic theater Objective 4 exists
to ban."*

So this document has a failure mode that is worse than being wrong: **being reassuring.** A sampling
protocol that reads as a guarantee has converted an admission of a limit into a claim of coverage,
which is precisely what the limit was about. Group TH exists for that failure and nothing else.

---

## 1. WD — whole-document tests

Validated once, against the finished draft.

| ID | What is tested | Pass criterion | Primary source | Status |
|---|---|---|---|---|
| SMP-01 | The document is a file, and the protocol it describes produces files | It states that every sampled artifact is retrieved from disk by the path in its own log row, never reconstructed from memory or from a chat transcript | contract §6; §8's "a log row that cannot retrieve the bytes that were delivered cannot be sampled" | green |
| SMP-02 | Three things are specified, and exactly three | **Rate. Denominator. Annotation procedure.** A fourth section that is not one of those three is scope creep on a document whose whole virtue is that it is short | `step0_software_engineer_loop.md` §5.4 | green |
| SMP-03 | It names what it does not do, in its own body | The three Level 3 items appear as a list the reader can count, not as a caveat in a closing paragraph. A limit stated at the end is a limit the reader has already stopped reading | §5.4 | green |
| SMP-04 | Terminology matches the contract exactly | `FILLED`, `confirmed`, `unreviewed`, `outcome`, `review` are used with contract §8's meanings and no synonyms. `flagged`, `audited`, `spot-checked` are not introduced as near-synonyms for any of them | contract §8 | green |
| SMP-05 | The contract version is pinned and asserted | The document states the contract version it was written against, and that integer equals `oracle/answer_contract.md` §9 read at test time. The version field has three declared consumers and this is not one of them, so the pin is a citation rather than a fourth consumer | contract §9 | green |
| SMP-06 | No number appears without its denominator | Every proportion, rate or count in the document is written with what it is out of. This is the document's own subject applied to its own prose, and a protocol that violates its own rule in its own body is not worth reading | §8; §5.4's "Three FILLED is theater" | green |
| SMP-07 | A cognizant outsider can execute it cold | Someone who has read the contract and no other project file can perform one sampling round from this document alone: select rows, retrieve artifacts, read, annotate, report | A.10 step 7's audience-comprehension requirement | H |
| SMP-08 | Every procedural step names who performs it | No step in the passive voice with no actor. "The rows are selected" hides whether the router, the orchestrator or a person selects them, and the whole protocol turns on that distinction | `step0_editor_prohibition.md` §10 on grammar showing which one you wrote | green |
| SMP-09 | It does not restate the contract | Where a rule already lives in `answer_contract.md`, the document cites it and does not copy it. A copy drifts, and this project has found that defect at least four times | LIM-7's rule against a second authority | green |
| SMP-10 | Length | Short enough that a person will actually read it before a sampling round. A protocol nobody reads is a protocol nobody follows, and the failure is silent | A.10 step 7 | H |

---

## 2. SC — scope: what Level 3 is, stated plainly

**§5.4 names three things and says no amount of suite design reaches them.** The document must carry
all three, and must not quietly reduce them to two by folding the third into a sentence about
quality.

| ID | What is tested | Pass criterion | Primary source | Status |
|---|---|---|---|---|
| SMP-11 | Item 1 is stated: whether a retrieved summary supports the sentence beside it | Present, and stated as the LIMIT line already states it: the trace proves the file resolves and that its body contains the matched topic words, and nothing beyond that | contract §4's `literature` limit line, quoted from that file and not from a copy | green |
| SMP-12 | Item 2 is stated: whether a refusal should have been an answer | Present, and named as `FILLED`. With the reason: a router cannot observe that it fabricated an answer it should have refused, because detecting that requires exactly the independent judgement the router is not | §5.4 item 2; contract §8 | green |
| SMP-13 | Item 3 is stated: whether the answer is any good | Present, and stated as *not a test*. The document must not smuggle a rubric in here. A quality rubric is a fourth mechanism and §5.4 explicitly declines to build one | §5.4 item 3 | green |
| SMP-14 | The three are not collapsed | Three distinct items with three distinct reasons. A document that merges items 1 and 2 has lost the one that has a column in the run log | §5.4 | green |
| SMP-15 | The inverse is stated too: what the mechanism DOES cover | So the reader can tell what the sampling read is *adding*. Without this the reader cannot size the residual risk and the protocol reads as the only control | A.10 step 7 | green |
| SMP-16 | `FILLED` is identified as the only Level 3 item with a machine-readable home | It has a column; the other two do not. That asymmetry is the reason `FILLED` is the one that gets counted, and a document that treats the three symmetrically will produce a protocol that tries to count the uncountable | contract §8 | green |
| SMP-17 | It does not claim the sampling closes the gap | The verb is *measures*, never *closes*, *ensures*, *guarantees* or *validates*. **This is the highest-value row in the group.** A sampling protocol that claims closure has converted a stated limit into a claim of coverage, which is the exact epistemic theater it exists to avoid | `step0_editor_prohibition.md` §9's virtue/object distinction | green |
| SMP-18 | The residual is named as residual | After the protocol runs, some fraction of wrong answers remains undetected, and the document says so without estimating it. An estimate would need the very measurement that does not exist | §5.4's closing paragraph | green |

---

## 3. RT — the rate and the three denominators

| ID | What is tested | Pass criterion | Primary source | Status |
|---|---|---|---|---|
| SMP-21 | A rate is stated as a number | Not "regularly", not "periodically". `N` answers per week, or `N` per hundred runs, with `N` written | §5.4's "a stated rate and a stated denominator" | green |
| SMP-22 | The rate names its period | Per week, per wave, per hundred runs — one of them, chosen. A rate with no period is not a rate | §5.4 | green |
| SMP-23 | All three denominators are named and defined | `FILLED` count, reviewed count, run count. All three are countable from contract §8's two columns and the document says which column each comes from | contract §8 | green |
| SMP-24 | The reporting form is fixed and shown | The document contains the sentence shape the result is reported in, so there is nothing to invent at reporting time. §5.4 supplies it: *"Three FILLED out of forty sampled, of two hundred ten run"* | §5.4 | green |
| SMP-25 | The theater form is shown as a counterexample | *"Three FILLED"* appears, marked as what not to write. A rule with no counterexample is a rule people follow differently | §5.4; `tdd_method.md` principle 4 | green |
| SMP-26 | The selection is stated and is not "interesting rows" | How the N are drawn from the log. If it is random, the document says what the randomisation is over; if it is stratified, it says the strata. **A sampler who picks the rows that look wrong measures their own intuition** | contract §8's precedence columns | green |
| SMP-27 | Refusals are in the sampling frame | `REFUSED` rows are sampled, not only `ANSWERED` ones. `FILLED` is defined as a run that answered where it should have refused, which is a defect visible from the answered side — but the converse (refused where it should have answered) is invisible if refusals are never read | contract §5; §8 | green |
| SMP-28 | The frame is the log, and the log is complete | Sampling from anything other than the run log samples from a set nobody can reproduce. The document states that the frame is the log and that a run missing from the log is a defect in the writer, not a row to skip | contract §8 | green |
| SMP-29 | What happens when the rate is not met | Named. A week with zero reviews is reported as zero reviewed out of N run, never omitted. **A missing sampling round that leaves no trace is indistinguishable from a clean one**, which is this project's standing failure shape | the runner's own `UNRUN IS NOT PASS` | green |

---

## 4. RD — what a human read of a sampled answer is checking

**This is the group the sub-step exists for**, and it is where a vague document does the most damage.
"Read it and see if it is right" is not a procedure. Each row below is a question the reader answers
with a mark, and every one of them is a thing no check in this repository can make.

| ID | What is tested | Pass criterion | Primary source | Status |
|---|---|---|---|---|
| SMP-31 | The read is against the SOURCES, not against the answer | The reader opens the files the traces name. An answer read on its own reads as coherent, which is the property fabrication has | contract §4's limit line | green |
| SMP-32 | Check: does the cited file support the sentence beside it | The document states this as the first question, because it is Level 3 item 1 and it is the one the trace explicitly does not prove | contract §4 | green |
| SMP-33 | Check: is the figure in the source's own units | Contract §2 forbids derived arithmetic as a trace. A converted figure has no locator that resolves, so it is untraceable rather than merely ungraded — and the reader is the only one who can see a conversion that looks like a quotation | contract §2; FIX-16 | green |
| SMP-34 | Check: did the answer refuse where it should have answered | The converse of `FILLED`, and it has no column. The document says how it is recorded — a note against the row, not a fourth `review` value, because `review` is closed at three and extending it is a version bump | contract §8; §9 | green |
| SMP-35 | Check: on a `CONTESTED` answer, is every side actually present | **Measured, and this is why the row is specific rather than "check the sides":** 18 axes are class `two_sided` and **seven of them declare three or four sides**. A reader checking for "both sides" passes a three-sided answer that returned two | `oracle/REGISTER.lunar.tsv`, `oracle/REGISTER.econ.tsv`; `oracle/transfer_gate.md` §1.2 | green |
| SMP-36 | Check: on a `one_sided` answer, was a second side invented | The most attractive failure the register can produce, because it reads as balance. The reader looks for a claim-bearing sentence attributed to a position with no `M` row on that axis | `transfer_gate.md` §1.4 clause 3; `transfer_assertions.md` TG-35 | green |
| SMP-37 | Check: does a quantitative ISRU figure name its three facts CORRECTLY | The checker at `oracle/tests/isru_three_facts.js` asserts that three facts are *named*; it cannot see that they are the wrong three. `1.3 kWh/kg, integrated, tonnes per year, measured` names three and misdescribes an extraction-only concept-level modelled figure. This is ISR-14 arriving where it can actually be caught | `step0_space_resources_engineer_question_surface.md` §6 R5; ISR-14 | green |
| SMP-38 | Check: was the demonstrated figure preferred to the modelled one | §6 R2. Which of two figures is demonstrated is a judgement about the sources, and ISR-13 defers it here by name | §6 R2; ISR-13 | green |
| SMP-39 | Check: is a transfer verdict the right verdict | `transfer_assertions.md` §9.1 states plainly that whether `MT-14` should read `legitimate` rather than `illustration` is a judgement with an author. The gate checks that the emitted verdict matches the table; only a reader checks the table | `oracle/mechanism_table.md`; `transfer_assertions.md` §9.1 | green |
| SMP-40 | Check: does the haiku's disposition read correctly with the deliverable hidden | §1.4's own test, and it needs a person who has seen neither the question nor the file. `tools/verify_haiku.js` mechanizes image-family membership and says in its own LIMIT block that membership is the bindable half and not the whole | `step0_writer_register_spec.md` §1.4 | green |
| SMP-41 | Every check is a question with a recordable answer | No check phrased so that "it seems fine" is a valid response. Each yields a mark the annotation procedure can carry | `tdd_method.md` principle 1 | green |
| SMP-42 | The read has a stated stopping point | How long one sampled answer takes, or how many checks constitute a complete read. Without it the first reader sets a precedent nobody else knows about, and the denominators stop being comparable across rounds | A.10 step 7 | green |

---

## 5. AN — the annotation procedure

| ID | What is tested | Pass criterion | Primary source | Status |
|---|---|---|---|---|
| SMP-43 | Annotation writes to the `review` column and nowhere else | The reader edits one field of one row. `outcome` is machine-written and a human hand in it destroys the separation that makes `FILLED` meaningful | contract §8 | green |
| SMP-44 | The three `review` values are used as defined | `unreviewed` is the default and is a claim: *no person has read this row against its sources*. `confirmed` means a person read it and the answer holds. `FILLED` means a person read it and the run answered where it should have refused | contract §8 | green |
| SMP-45 | `FILLED` is never written by a machine | Stated in the procedure, not only in the contract, because the procedure is what a person follows. `tools/verify_answers.js` asserts the same thing statically over its own source | contract §8; LOG-11 | green |
| SMP-46 | An annotation names its annotator and its date | Otherwise a `confirmed` row cannot be re-examined and a disagreement between two readers cannot be found. **`review` is closed at three values, so this goes beside the row rather than into the column** — and the document says which, because inventing a tenth log field is a contract version bump | contract §8's "the row schema is closed" | green |
| SMP-47 | A `FILLED` row produces a named next action | A defect report that routes to nobody is a defect nobody fixes. `FILLED` on a register axis routes to `match_keys`; on a refusal it routes to the reason-code precedence; on a citation it routes to retrieval | `register_schema.md` §4.2; contract §5 | green |
| SMP-48 | Disagreement between two readers is handled | What happens when a second reader marks `confirmed` what a first marked `FILLED`. Not adjudicated by the router, and the document says who does adjudicate | A.9 | green |
| SMP-49 | A read that cannot be completed is recorded, not abandoned | A sampled row whose deliverable file is gone is a §6 violation and is reported as one, never silently replaced with the next row. **Silently redrawing the sample is how a denominator stops being a denominator** | contract §6; §8 | green |
| SMP-50 | The annotation is idempotent and the history survives | Re-reading a row does not erase what the last reader wrote. Otherwise the disagreement in SMP-48 cannot be observed to have happened | contract §8 | green |

---

## 6. TH — the theater tests

**Six rows aimed at one failure: a protocol that reassures.** This group exists because the document
is about the limits of automated checking, and a document about limits is the easiest place in the
project to write a sentence that asserts a virtue.

| ID | What is tested | Pass criterion | Primary source | Status |
|---|---|---|---|---|
| SMP-51 | No self-referential subject from the closed list | `tools/verify_register.js` B2 run over the manuscript, counted with its denominator. Not a gate — a number a person reads, exactly as B2 is everywhere else | `step0_software_engineer_loop.md` §4.3 B2 | green |
| SMP-52 | No virtue nouns | *care*, *caution*, *honesty*, *rigor*, *transparency*, *humility*, *thoroughness*. You cannot look at any of them, nobody can prove you wrong, and asserting one is not evidence of having it | `step0_editor_prohibition.md` §9 | green |
| SMP-53 | Every claim of fact carries a source | The document's quantitative claims — the rate, the register side counts, the outcome enum — each name where they were read from. B1 applied to a prose deliverable | `tdd_method.md` principle 8; §4.3 B1 | green |
| SMP-54 | The document does not describe the mechanism instead of the procedure | §4.4's failure case B, one register over: *the haiku states a disposition; it never describes the machinery that produced it*. A protocol section that explains how the run log is written, rather than how to read it, has done the same thing | `step0_writer_register_spec.md` §4.4 | green |
| SMP-55 | No hedged commitment | *should ideally*, *where possible*, *as a general rule*. A rate that applies where possible is not a rate. **This is the row The Editor's subtractive pass is most likely to reach and it is listed so the cut is a finding rather than a preference** | `tdd_method.md` prompt 4 | green |
| SMP-56 | The revision pass introduces no new test failure | `tdd_method.md`'s own constraint on prompt 4: edits subtract or replace, never add, and the suite is re-run after revision. **The suite remains the contract** | `tdd_method.md` prompt 4 | green |

---

## 7. What this suite does not assert

Stated so nobody counts it as covered.

1. **That the rate is the right rate.** N per week is a resourcing decision with an author. This
   suite asserts that a number is stated and that its denominators are reportable, never that the
   number is large enough. Sizing it would need the measurement the protocol exists to start
   producing.
2. **That a reader read carefully.** SMP-07, SMP-10 and every row in RD describe what a read
   checks; none of them observes that it happened. The protocol's own output — a proportion with
   three denominators — is the only evidence, and it is evidence of counting rather than of care.
3. **That `FILLED` is assigned correctly.** A reader can mark `FILLED` wrongly in both directions.
   SMP-48 handles the disagreement; nothing here adjudicates it, and adjudicating it from a suite
   would be the same error as a router assigning `FILLED` to itself.
