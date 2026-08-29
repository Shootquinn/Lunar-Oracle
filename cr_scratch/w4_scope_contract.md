# Wave 4 scope contract — the forty-three

Generated from the sub-step tables of `cr_scratch/step0_integration_draft.md`, never typed.
Regenerate rather than edit. The orchestrator briefed this wave as forty; the table holds
**forty-three**, and 6.7 and 6.11 were unowned until the count was run. That is why this file
exists: a scope contract held in the orchestrator's head is one that loses two sub-steps and
does not notice.

`shipped` means the close condition is met and independently verified, not that a seat said so.

| Sub-step | Origin | Seat | Status | What it does (first clause) |
|---|---|---|---|---|
| 3.1 | LUNAR-7 | W4-1 Space Resources | shipped | Audit the app boundary against the artifact |
| 3.2 | LUNAR-1b | W4-2 Software (router) | shipped | Close the two reachability gaps, which are loose ends C1 and C2 |
| 3.3 | LUNAR-1 | W4-1 Space Resources | shipped | Ship the question-class register, `oracle/question_classes.json`: the ten question classes with routing t |
| 3.4 | LUNAR-4 | W4-2 Software (router) | shipped | Extend the exclusions matcher to three outcomes: EXCLUDED-THEN-CORPUS, EXCLUDED-THEN-THIN, EXCLUDED-BUT-A |
| 3.5 | LUNAR-5 | W4-1 Space Resources | shipped | Ship the thin-patch register, `oracle/thin_patches.json`: ten entries, each with trigger tokens, what is  |
| 3.6 | LOOP-4t | W4-3 Engineer (retrieval) | shipped | Build the labelled question set that LOOP-4 tunes against: lunar, economics and cross-field questions wit |
| 3.7 | LOOP-4 | W4-3 Engineer (retrieval) | shipped | Rebuild retrieval. Field-scoped IDF (B3); confirmation threshold set from LOOP-4t's fixture set rather th |
| 3.8 | LOOP-5 | W4-2 Software (router) | shipped | Build the classifier with three retrieval modes: register axis → CONTESTED, app address resolves → APP/FI |
| 3.9 | LOOP-6 | W4-2 Software (router) | shipped | Wire the wave selector: the verdict the router already computes selects the wave |
| 3.10 | ECON-7 | W4-2 Software (router) | shipped | Promote the app's ten excluded nodes to first-class retrieval objects, each with its own refusal record c |
| 4.1 | LOOP-7 | W4-5 Software (loop) | shipped | TEST SUITE AMENDMENT: register fixtures. One fixture per register axis plus the deletion decoy |
| 4.2 | ECON-6 | W4-4 Manager (economics) | shipped | Extend the retrieval invariant to three register classes |
| 4.3 | ECON-10 | W4-4 Manager (economics) | shipped | Add the reference-class rule to base-rate answers: any answer using an empirical base rate for a lunar gr |
| 4.4 | ECON-4 | W4-4 Manager (economics) | shipped | Specify the transfer gate as an answering-loop stage |
| 4.5 | ECON-5 | W4-4 Manager (economics) | shipped | Write the transfer-gate acceptance assertions, before the gate is built |
| 4.6 | ECON-4b | W4-5 Software (loop) | shipped | Implement the transfer gate in the composition path |
| 4.7 | LUNAR-6 | W4-5 Software (loop) | shipped | Add the three-named-facts assertion to the acceptance suite: any answer carrying a quantitative ISRU figu |
| 4.8 | LUNAR-9 | W4-1 Space Resources | shipped | Build the lunar acceptance question set: fourteen questions with expected verdicts — one per question cla |
| 5.1 | LOOP-8 | W4-5 Software (loop) | shipped | Build the register enforcement checks: `verify_haiku.js` on the orchestrator's turn and `verify_register. |
| 5.2 | LOOP-9 | W4-5 Software (loop) | shipped | Extend `verify_answers.js` to six outcomes |
| 5.3 | LOOP-10 | W4-5 Software (loop) | shipped | Fault-injection pass: four decoys run against the assembled loop rather than against unit stand-ins |
| 6.1 | ARCH-6 | W4-6 Systems | shipped | TDD stage: acceptance suite for the bootstrap, written before `CLAUDE.md` exists. It asserts the degraded |
| 6.2 | ARCH-7a | W4-7 Writer | shipped | `CLAUDE.md`, stage 1: the document test suite |
| 6.3 | ARCH-7b | W4-7 Writer | shipped | `CLAUDE.md`, stage 2: topic-sentence outline, validated against ARCH-7a. |
| 6.4 | ARCH-7c | W4-7 Writer | shipped | `CLAUDE.md`, stage 3: write |
| 6.5 | ARCH-7d | W4-8 Editor + Designer | shipped | `CLAUDE.md`, stage 4: revise |
| 6.6 | ARCH-8 | W4-6 Systems | shipped | First-run sequence mechanism: the gate, the fields read from ARCH-3's state record, the degraded-bootstra |
| 6.7 | WRITE-1a | W4-6 Systems | shipped | First-run sequence content, stage 1: the suite |
| 6.8 | WRITE-1b | W4-7 Writer | shipped | First-run sequence content, stage 2: the beat outline, validated against WRITE-1a and against the 0.4 reg |
| 6.9 | WRITE-1c | W4-7 Writer | shipped | First-run sequence content, stage 3: write. |
| 6.10 | WRITE-1d | W4-8 Editor + Designer | shipped | First-run sequence content, stage 4: revise, against `signs_of_ai_writing.md` and the no-theater prohibit |
| 6.11 | ARCH-9a | W4-6 Systems | shipped | `README.md`, stage 1: the document test suite |
| 6.12 | ARCH-9b | W4-7 Writer | shipped | `README.md`, stage 2: topic-sentence outline, validated against ARCH-9a. |
| 6.13 | ARCH-9c | W4-7 Writer | shipped | `README.md`, stage 3: write, including the corpus licence statement |
| 6.14 | ARCH-9d | W4-8 Editor + Designer | shipped | `README.md`, stage 4: revise. |
| 6.15 | GATE-2 | W4-6 Systems | shipped | Public release gate. The repository does not go public until MERGE-8 has returned, every file it flagged  |
| 7.1 | ECON-8 | W4-4 Manager (economics) | shipped | Build the merged mechanism table as a first-class corpus artifact: the transportability table rebuilt ove |
| 7.2 | ECON-9 | W4-4 Manager (economics) | shipped | Write the closure-versus-TRL coupling into the corpus as a standing tension: closure ratio is a choice of |
| 7.3 | ECON-11 | W4-4 Manager (economics) | shipped | Source or bound the two unnamed inputs |
| 7.4 | LOOP-11a | W4-5 Software (loop) | shipped | Sampling protocol, stage 1: the test suite |
| 7.5 | LOOP-11b | W4-7 Writer | shipped | Sampling protocol, stage 2: topic-sentence outline validated against LOOP-11a. |
| 7.6 | LOOP-11c | W4-7 Writer | shipped | Sampling protocol, stage 3: write |
| 7.7 | LOOP-11d | W4-8 Editor + Designer | shipped | Sampling protocol, stage 4: revise. |

**Totals.** 43 sub-steps, 43 owned, 0 unowned, 0 duplicated.

Per seat: W4-1 Space Resources 4 | W4-2 Software (router) 5 | W4-3 Engineer (retrieval) 2 | W4-4 Manager (economics) 7 | W4-5 Software (loop) 7 | W4-6 Systems 5 | W4-7 Writer 9 | W4-8 Editor + Designer 4
