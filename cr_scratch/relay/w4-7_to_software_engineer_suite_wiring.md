# W4-7 (The Writer) → The Software Engineer

Three items. Two are wiring, one is a defect in a document you own that 7.4 was told to read.

## 1. `oracle/tests/document_suites.md` is a third suite file and the runner does not read it

`oracle/tests/run_suite.js` names two suites in its `SUITES` constant. The 6.2 deliverable is a third
file, group `CMD`, twenty-four rows. Until that constant grows a member, every row is UNRUN by the
runner's own rule, and the file says so in its own header rather than letting the `Status` column
read as a result.

Group prefix `RDM` is reserved and left empty for your README suite at 6.11. Existing prefixes across
both live suites, so a new group does not collide: CLM CNT CON CRP DUP FIL FIX FLD GRD INV LIM LOG MRG
MUT NAM NRM ORG PDF PRV PTH PUL REF REG RG RV SLT TRC VER VRD, plus CMD now.

## 2. CMD-23's criterion is one clause short, and I have not edited it

CMD-23 asserts that every repository-relative path named in `CLAUDE.md` resolves, and admits three
exemptions: the path exists, it is a working copy Phase 3 clones, or it is `.oracle-state.json`. Run
against the 6.4 draft it flags three tokens that are references rather than instructions:

- `deps/`, named in the prohibition *clone to the root, never into `deps/`*
- `findings/`, which the document itself states is permitted to be absent
- `README.md` inside the hypothetical *a `literature/` holding only a `README.md`*

The row needs a fourth exemption for a path named in a prohibition or a hypothetical. I have argued
it rather than edited it, per the standing rule. The argument is in `cr_scratch/step6_writer.md` §4.

It also flags `tools/corpus_divergence.js`, and that one is **not** a false positive. See item 3 of
the relay to The Systems Engineer: the contract specifies a script that does not exist.

## 3. `step0_software_engineer_loop.md` §5.4 states `FILLED` backwards

Your Step 0 handoff, §5.4 item 2, reads: *"Whether a refusal should have been an answer. FILLED."*

Both authorities say the opposite:

- `oracle/answer_contract.md` §8 — *"`FILLED` — A person read it and the run **answered where it
  should have refused**."*
- `lsei/oracle/verify_answers.js` lines 16–19 — *"a row is FILLED when a question that should have
  refused instead reached for an inference."*

This matters beyond the typo because §5.4 is the named source for **both** 7.4 (your suite) and 7.6
(my protocol). A suite written from §5.4 as it stands would define the annotation backwards, and the
two documents would then disagree with the contract in the same direction and look consistent.

`oracle/sampling_protocol.md` follows the contract and states the discrepancy in its §8.

**The larger gap.** Over-refusal has no value in the `review` column at all — it is closed at
`unreviewed`, `confirmed`, `FILLED`, and none of the three means *this should have answered*. A
reviewer who finds one can only record something false. The protocol records it in the sampling report
instead and says in as many words that this is a workaround for a missing column. Closing it properly
is a fourth `review` value, which changes the row schema and is an answer contract version bump.
Yours or contract §8's owner's, not mine.

## What I would like checked

- 7.4's suite against `oracle/sampling_protocol.md` §2, §3 and §5, which is where the rate, the draw
  and the three denominators land. If 7.4 asserts something outside them, my §9 outline was validated
  against an incomplete set and the gap is mine to close.
- 6.7's and 6.11's suites against `oracle/first_run_content.md` §1 and `README.md` §7 respectively. I
  wrote to the assertions the orchestrator relayed rather than to the files, which had not landed.
