# Postmortem: the first-run Deloitte answers

**Runs examined:** `r-2026-08-29-0001` (`answers/lunar-economy-valuation-review.md`, run in the
`oracletest` clone at `lsei@7f97983`) and `r-2026-08-29-deloitte-02`
(`answers/who-would-buy-lunar-helium.md`, run in this repository). Both against
`answer_contract.md` version 5 and `deliverable_shape.md` version 1.

**Evidence preserved at** `cr_scratch/postmortem_deloitte_evidence/`: both answer files and the
author's console transcript. The transcript and the first answer lived only in the `oracletest`
clone, which is scheduled for deletion and re-clone; they were copied here before that happens.

The transcript, `Quinns console output.txt`, is held in the working tree and is **not committed**.
CHK-13 blocks `.txt` at the pre-commit gate as a published-source carrier, and the gate is right to
be extension-based rather than to reason about provenance. Nothing in this postmortem depends on the
transcript being in git; it needed to survive the `oracletest` deletion, and it does.

---

## Executive abstract

Two first-run answers were produced against the Deloitte lunar economy report. Both are sound
evidence records. Neither answers the question asked.

The cause is not session error. Both complied exactly with `deliverable_shape.md`, and that
specification mandates six of the tics catalogued in `CC/performative-epistemics.md`: rigor narrated
as permanent headings, a required unverified-items section, one disclaimer sentence repeated verbatim
twenty times, version state above the title. The verdict token `CONTESTED` means the corpus disagrees
with itself; a reader hears that we dispute Deloitte, and the file spends four paragraphs disowning
its own headline. The five findings that do answer the question sit as cells in a thirty-six-row
grid. The team never ran — one seat wrote everything in seventeen minutes, with no Writer, Editor or
Fact-Checker pass.

The root cause is that the project has two output objects and neither is a document a person reads: a
haiku that cannot carry a number by design, and an audit record that is evidence for an answer nobody
was asked to write.

The remedy is a third object. The five-section file keeps its specification and is renamed in role to
the annex. A signed technical note is built from it, adjudicating where the unsigned annex may not,
with every claim mapped to an annex row and the map never shown. Specifications at
`oracle/client_note.md` and `oracle/client_note_prompts.md`.

---

## 1. Finding

Neither run deviated from specification. Both complied with it exactly, and the specification is the
defect.

The author asked a plain question — *did Deloitte get it right, what did they miss* — and received a
334-line audit record organised by internal register keys, headed by a verdict token whose meaning is
the opposite of its plain reading, carrying twenty identical disclaimer sentences and closing with
two paragraphs about the tooling disagreeing with itself. The evidence work underneath is sound. No
document in the delivery answers the question.

This is not a quality problem in the run. It is the shape doing what it says it does.

## 2. The shape mandates the pathology it was written to prevent

`deliverable_shape.md` was written to stop assertions shipping without falsifiers. It succeeded at
that and imported a different failure. Measured against the author's own taxonomy in
`CC/performative-epistemics.md`, the mandated structure is a generator of the listed tics.

| `deliverable_shape.md` requires | Tic produced | Taxonomy entry |
|---|---|---|
| §1 heading 3, "What was tested, and how it could have failed" | Rigor narrated as a permanent structural element | Self-narrating honesty |
| §1 heading 5, "What remains unverified", with population denominators, never deleted | A mandatory paragraph whose content is that the author is being careful | Self-narrating honesty |
| §4 rationale: "Naming an unverified thing is not a weakness in the answer, it is the part of the answer nothing else in the system produces" | The specification argues for its own virtue | Self-narrating honesty |
| `answer_contract.md` §4 limit lines, one per trace | The same 43-word sentence repeated verbatim twenty times in one file | Table sandwiching, at scale |
| §2 header block carrying verdict and contract version | Version state above the title of a client-facing document | Changelog leakage |
| §6 template: "Not `<adjacent verdict>`, because…" | A defensive comparison against an outcome that did not happen | Throat-clearing |

The delivered file then compounds it. Section 2 of `lunar-economy-valuation-review.md` opens five
consecutive framing blocks — *What this verdict says*, *What this verdict does not say*, *Why
`CONTESTED` and not `LITERATURE`*, *Why not `APP`, `FIGURE` or `BOTH`*, *Why not `REFUSE`* — before
stating a single finding about Deloitte. Line 34 reads "The scope token, which is what makes the
answer legible rather than embarrassing." Line 87 addresses the reader about a disagreement the
reader has not had: "A reader who thinks that is wrong is disagreeing with a placement, not with the
line." Line 61 congratulates the run on a symmetry: "which is why the verdict and the finding are
the same shape."

The second run reproduces the pattern independently, which establishes it as systemic rather than
one session's habit. `who-would-buy-lunar-helium.md` carries "The scope token, verbatim, and it is
what makes the two sides comprehensible rather than contradictory" and "**No side is adjudicated
here and this section names no side as better**" before reaching its own strongest observation.

Every sentence quoted above can be deleted without leaving a claim unsupported. That is the
author's stated discriminator between load-bearing and decorative, and these fail it.

## 3. The verdict token is unreadable by its audience

`CONTESTED` means, in `answer_contract.md` §1, that register axes fired at classification and the
loop is forbidden to adjudicate them. A reader outside the project reads it as *we contest Deloitte's
report*. Those are opposite claims.

The file knows this. It spends lines 41 through 72 — four paragraphs — explaining what the verdict
does not say. A headline requiring four paragraphs of disownership is the wrong headline for the
audience receiving it.

`LCC-12`, `LCC-11`, `LCC-13`, `LCC-15`, `ECR-15` and `ECR-16` head the verdict table and every group
in §3. The verdict table needs a dedicated column, "What the axis is about", to translate its own row
labels. Internal keys reached the top level of a document intended for someone who has never seen the
register.

## 4. The findings are real and are buried

The run produced five observations that answer the question as asked. All five are table cells inside
a seven-group, thirty-six-row grid.

| Finding | Location in the delivered file |
|---|---|
| The report prices a $114.5B "New Resources & Materials" pool and states no ore grade anywhere in 60 pages | §3 Group 0, row 1 |
| The report states no excavation rate for any machine, in any unit | §3 Group 0, row 2 |
| The report uses no reference class of any kind; its method is bottom-up unit price × quantity | §3 Group 5, row 3 |
| Its own Limitations section concedes the value is end-loaded and does not list the discount rate | §3 Group 0, rows 3 and 4 |
| It cites Jones 2019 once and quotes neither the 97-percent result nor the 34-to-35-year breakeven | §3 Group 0, row 6 |

The four-step source procedure worked and caught two attribution errors that a grep would have made:
Kornuta's price triple is that summary's transcription of the source's own Table 11 rather than
Kornuta citing another author, and the Mark-III miner design point is Wisconsin's reported by Olson
rather than Olson's own result. The three credits to Deloitte are tested to the same standard as the
criticisms. No byte of the source PDF entered the repository.

That is a good evidence file. It is not a deliverable, and the run had no instruction to produce one.

## 5. The team did not run

The console transcript records `Bash`, `Update` and `Write` calls only, across seventeen minutes and
forty-one seconds. No sub-agent was spawned. The Manager did not open or close, The Writer did not
compose, The Editor did not pass, The Fact-Checker did not gate.

`deliverable_shape.md` §5 already specifies the division of labour for a `CONTESTED` run — §3 and §4
composed per side by that side's persona over that side's leaves only, §1, §2 and the header by an
assembler briefed on the axis row and no side's content. That division did not happen. One seat wrote
everything, which is also why the anti-synthesis latitude §5 grants was never used: nothing above the
trace list tells the reader what to do with six contested axes.

The seats that exist to catch a document with the wrong addressee were not in the loop.

## 6. Root cause

The project has two output objects and neither is a document a person reads.

`answer_contract.md` §6b fixes the user-facing turn at two to five haiku and states, correctly, that
a haiku cannot carry a number. `deliverable_shape.md` §8 fixes the file as complete and explicitly
refuses to shorten it: *"the turn is short because it must not sound like an answer, and the file is
complete because it is the answer."*

The file is not the answer. The file is the evidence for an answer nobody was asked to write.

The comparison that settles this is the author's own `CC/Nimitz Hull Speed Technical Note Journal
Article Claude.docx`, produced from two prompts, and the method recorded in
`CC/Nimitz_TDD_writing_case_study.md`. Both used test-driven documentation. They differ in where the
tests end up.

In the Nimitz method the tests are scaffolding. Research findings become validation criteria,
criteria become topic sentences, the outline is validated against them, and the tests then leave the
artifact. The reader receives "The turbines were the same. The speeds were the same." The reader never
sees the fifteen tests that sentence passed. Section 3 is Methods: it states the formula, the sources
and the limitation, in thirty lines. Section 5.5 is Limitations: three short paragraphs, no
denominators, no bullets.

In this project the tests are the artifact. The falsifier column is load-bearing during construction
and is noise at delivery, and nothing in the specification distinguishes those two moments.

The case study also records the exclusion that made Nimitz work, in the first of its two prompts:
*"Be sure to not include 'how the sausage is made' stuff like my false-premise question or all of the
'unclear' things etc. Instead, write a methods section."* No equivalent exclusion exists anywhere in
`oracle/`. The nearest thing to it is `deliverable_shape.md` §8, which argues the opposite.

## 7. Recommendation

Add a third output object and demote the second. The specification is at `oracle/client_note.md`.

The five-section file remains exactly as it is, renamed in role to the annex: contract-governed,
non-adjudicating, complete, and read by the writer rather than by the client. Nothing in
`answer_contract.md` or `deliverable_shape.md` needs to change for the annex to keep doing its job.

The client note is a technical note in the Nimitz form, built from the annex, adjudicating, and
carrying no verdict token, no axis identifier, no trace block, no unverified-items section and no
header block. It is signed work product with a named author, which is what licenses it to reason
where the annex may not.

The constraint that keeps it honest is the one Nimitz used: every claim in the note maps to a tested
row in the annex, the map is checked before publication, and the map does not appear in the
publication.

## 8. Owed on promotion

Promoting `oracle/client_note.md` requires a `D` row in `oracle/MANIFEST.tsv` and an amendment row in
`oracle/AMENDMENTS.tsv`. Neither was written here, because both files are tracked and this postmortem
was produced under an instruction to leave the working tree with untracked additions only. The
manifest row and the amendment are the promoter's act.

`oracle/tests/answering_loop_suite.md` gains no rows from this change. The client note is not
governed by the answer contract and its checks belong to a suite of its own, which is also owed.
