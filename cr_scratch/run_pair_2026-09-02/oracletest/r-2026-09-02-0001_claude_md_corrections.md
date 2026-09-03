# `CLAUDE.md` corrections, run `r-2026-09-02-0001`, 2026-09-02

Made under `CLAUDE.md` §5, which rules that a disagreement between a contract under `oracle/` and the
prose in `CLAUDE.md` is resolved by correcting the prose, **in a sub-step that says it did so and
names the clause**. Each correction below names its clause in the edited text itself, not only here.

This file is the run record. It is process narrative and it is therefore barred from the client note
by `oracle/client_note.md` §4 rule 7 and §5 "changelog leakage". It does not enter the note.

---

## C1 — the haiku form. `answer_contract.md` §6b.

**Was:** *"The form: 2 to 5 haiku strung linearly, no line breaks, and questions are in it too."*

**Now:** 2 to 5 haiku, each on three lines 5/7/5, blank line between them.

The contract's §6b was amended 2026-09-01 and reverses the rendering clause of the 2026-08-28
ruling **on that ruling's own evidence** — the two turns the linear form actually produced both read
as run-on mush. `CLAUDE.md` still carried the superseded clause. A session that trusted it would have
emitted the exact form the author had already rejected, which is what this correction prevented in
this run.

The anti-run-on control is untouched and did not live in the line breaks: §1.3's prohibitions, A7's
run-on tell and A2's syllable partition all stand. A legal turn is exactly 34, 51, 68 or 85 syllables.

`oracle/first_run_content.md` §1 already carried the corrected form and was not edited.

## C2 — the BC-19 probe. `bootstrap_contract.md` BC-19, restated at W5-6.

**Was:** `test -d literature/_pdf && [ -n "$(ls -A literature/_pdf 2>/dev/null)" ]`

**Now:** `test -s tools/source_roots.local || [ -n "$LUNAR_ORACLE_SOURCE_ROOTS" ]`

`literature/_pdf/` is a directory sub-step 2.11 would have created and which is retired. The old
probe was therefore **permanently false on every install** and reported as a shortfall on every one
of them. The contract's restatement makes BC-19 a fact about *the machine* — whether it can reach the
source publications that exactly one check, `tools/audit_abstract_overlap.js`, needs — and never a
state of the corpus. The surrounding paragraph was rewritten to say that, and to say that
`pdfs_present: false` is the ordinary case and owes nothing.

This one changed a value in this session's own report. Under the retired probe the record would have
read `pdfs_present: false` for the wrong reason and the report would have carried a phantom shortfall.

## C3 — the third output object. `oracle/client_note.md` §1.

**Was:** `CLAUDE.md` named two output objects — the haiku turn and the five-section file, which it
called *the answer* — and mentioned `oracle/client_note.md` zero times.

**Now:** three. The five-section file is renamed in role to **the annex**; the **client note** is the
only object a client ever sees; the turn is unchanged.

`oracle/client_note.md` was promoted 2026-09-01 on the finding of
`cr_scratch/postmortem_deloitte_run.md`, whose subject is the three first-run answers to **this
question**. A session bootstrapping from `CLAUDE.md` alone would not have learned that the object it
was about to produce had been demoted four days earlier, and would have reproduced the failure the
postmortem exists to record. That is the strongest case for §5 this project has yet produced: the
correction is not tidying, it is the difference between running the current process and running the
one that was already found to fail.

Also carried into the same paragraph: the author's ruling of 2026-09-01 that **the contract is
first-pass prep, not command** — a verdict the annex returns, `REFUSE` included, is evidence the
note's author weighs rather than an order the note's author obeys.

---

## Not corrected, and why

**The Phase 3 clone and `BC-21`.** `CLAUDE.md`'s own header already states this lag, names its owner
(The Systems Engineer, who bumped the contract at 6.1), and records it as routed at 8.4. It is a
declared, owned debt with a named owner rather than a disagreement this session discovered. Repairing
it here would let the header's next sentence — *"bumping the integer here without landing the repairs
would make this sentence false and the acceptance suite green"* — be quietly falsified by a seat that
was passing through. **This run did, however, carry `-c core.longpaths=true` on the Phase 3 clone
invocation itself**, per the contract rather than per the prose, and says so in its report.

**The bootstrap contract version integer.** `CLAUDE.md` quotes it as 3 and
`oracle/bootstrap_contract.md` reads 3. No disagreement.

**`oracle/tests/answering_loop_suite.md` VER-2.** Not touched, for the reason `CLAUDE.md` already
gives: re-pinning a suite asserts it was written against rules it has not been run against, and that
is a different seat's act.

## Verification

`node oracle/tests/run_suite.js` after the edits: **146 rows, 139 pass, 3 fail, 4 unrun.** The three
failures are `MRG-4b`, `MRG-9` and `MRG-10`, all standing corpus findings recorded at commit
`0d2944a` ("43 failures to 3, and the 3 are real corpus findings rather than test debt"), all
unchanged in count and identity by these edits. The four unrun rows are the four standing DEFERRED
rows. `node tools/verify_corpus.js`: 0 hard failures at read-digest `373cdbb5de76a599` over 171 files.
