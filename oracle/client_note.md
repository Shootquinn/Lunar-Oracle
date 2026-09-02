# The client note — the third output object

**Contract version: 1.** Written against `oracle/answer_contract.md` version 5 and
`oracle/deliverable_shape.md` version 1, and governed by neither. Occasioned by
`cr_scratch/postmortem_deloitte_run.md`.

This project has two output objects. The turn is two to five haiku and cannot carry a number, by
`answer_contract.md` §6b. The file is the five-section audit record fixed by `deliverable_shape.md`.
Neither is a document a person outside the project reads for an answer.

This document specifies the third. It is a technical note in journal form, built from the
five-section file, and it is the only object a client ever sees.

---

## 1. The three objects, and what each is for

| Object | Governed by | Audience | May adjudicate | Author |
|---|---|---|---|---|
| The turn | `answer_contract.md` §6b | The person at the console | No | The session |
| The annex | `deliverable_shape.md` | The note's writer, and a reviewer auditing the note | No | The loop, unsigned |
| The client note | this document | The client | **Yes** | A named person |

**The contract is prep, not command.** `answer_contract.md` and `deliverable_shape.md` govern the
annex and stop there. They are a first pass that sorts the corpus and records what it found; they do
not instruct the seats that write the note, and a verdict they return — `REFUSE` included — is
evidence the note's author weighs rather than an order the note's author obeys. Author ruling
2026-09-01.

The five-section file is renamed in role from *the deliverable* to *the annex*. Nothing in its
specification changes. It stays complete, contract-governed, non-adjudicating, and full of falsifiers.
It stops being the thing that gets sent.

The annex does not adjudicate because it is unsigned machine output and its own rules keep it
neutral. The note adjudicates because a person's name is on it and that person is accountable for the
reasoning. This is the whole of why the two objects can differ in their conclusions' strength while
resting on the same evidence, and why a neutral annex is not a ceiling on what the note may
conclude.

## 2. What the note is

A technical note submitted to a journal. Not a summary of the annex, not an executive brief, not a
memo with findings as bullets. The standard is that a reviewer familiar with the subject and unaware
of this project could assess it on its evidence.

The note states positions in the declarative. *"This assumption is incorrect."* *"The constraint is
the excavation rate, not the ice concentration."* Numbers appear flat, in prose, with units, once.
Tables carry data and prose carries argument. Limitations appear once, in Methods, in two to four
sentences, with a conditional naming what would have to be true for the conclusions to fail.

The register is set by `cr-agents/supplements/writing-guides/style.md` and the document arc by
`cr-agents/supplements/writing-guides/structure.md`. Both are already the standing composition
reference for the seat that writes this object, and neither is restated here.

## 3. Sections

Seven, in this order. A section with nothing to say is dropped, not written empty — the annex is
where emptiness is recorded, and this is the object where a heading with nothing under it is a defect.

| # | Heading | What it holds |
|---|---|---|
| 1 | Abstract | The findings, stated. No preamble, no scope statement, no method. |
| 2 | Introduction | The claim under examination, and the answer, in the first three paragraphs. |
| 3 | Background | Only what a reader needs to follow section 5. Omitted when nothing is needed. |
| 4 | Methods | Sources, procedure, and the reading limitation. 25–40 lines. |
| 5 | Results | Tables and the observations they carry. |
| 6 | Discussion | What the results mean, and the strongest case against them. |
| 7 | Conclusions | Four to six paragraphs. No new evidence. |

References are numbered and bracketed. Section 4 is the only place a limitation appears outside
section 6.

The Abstract is written last and is not a summary of the sections. It is the findings, in the order a
reader needs them, and it must be readable alone.

### 3.1 Scale

The note is sized to the question, not to a house length. A settled question answered in four hundred
words is a good note; the same answer padded to four thousand is a worse one.

| The question | Words | Sections carried |
|---|---|---|
| Settled, one figure or one fact | 400–800 | 1, 4, 5, 7. Background and Discussion dropped. |
| Turns on one contested input | 1,200–2,000 | 1, 2, 4, 5, 6, 7. Background dropped unless the contest needs it. |
| A review of a document, position or method | 2,500–4,000 | All seven. |

The target is set by The Manager at the open and enters the test plan as a requirement, where it
becomes checkable rather than aspirational.

**The sequence does not scale with the note.** A four-hundred-word note runs the same four prompts,
the same three gates and the same four seats as a four-thousand-word one. Its test plan is smaller
because it makes fewer claims, not because fewer things are checked: the eight mandatory
whole-document tests hold at every length. A short answer is the case where skipping the process is
most tempting and where an unmapped claim is hardest to spot afterward.

## 4. What the note excludes

This list is the operative half of the specification. A note is defined more reliably by what it
refuses to carry than by what it aims at, and before this document no exclusion of any kind existed
in `oracle/`.

The note contains none of the following:

1. A verdict token. `CONTESTED`, `LITERATURE`, `APP`, `BOTH`, `FIGURE` and the refusal codes are
   contract vocabulary and do not appear.
2. A register axis identifier. `LCC-12`, `ECR-15` and every other key are internal addresses. The
   note names the disagreement in words.
3. A header block. No run id, no verdict field, no contract version, no `lsei` ref.
4. Trace blocks and limit lines. The reading limitation is stated once, in Methods.
5. A "what remains unverified" section. Real limitations go in Methods and Discussion, as prose,
   where they bear on a specific conclusion.
6. A falsifier column. Falsifiers are construction scaffolding and are tested before the note is
   written, in the annex.
7. Process narrative of any kind: what was searched, in what order, what the session decided to do
   next, what tool disagreed with what document, what a prior draft said.
8. Sentences whose content is that the author is being careful. See §5.
9. Any statement about the note itself, its shape, its headings, or what it does and does not say.

Rule 9 is the one that catches the most. A sentence beginning "What this section does not say" or
"this is not an adjudication" or "a reader who disagrees with this is disagreeing with" is a
statement about the document rather than about the subject, and it is struck.

## 5. Banned constructions

Drawn from `CC/performative-epistemics.md`. The test for each is that deleting the sentence leaves no
claim unsupported.

| Pattern | Example from the failed run | Disposition |
|---|---|---|
| Self-narrating honesty | "the scope token, which is what makes the answer legible rather than embarrassing" | Strike. State the scope. |
| Throat-clearing before a claim | "What this verdict says." / "Why not `REFUSE`." | Strike the frame, keep the claim. |
| Meta-commentary at the reader | "A reader who thinks that is wrong is disagreeing with a placement" | Strike entirely. |
| Restated conclusion | A figure given, then re-narrated after "which is to say" | Keep the first statement. |
| Table sandwiching | A sentence introducing a table and a sentence summarising it | Reference the table once, before it. |
| Changelog leakage | "`CLAUDE.md` was corrected in this run"; "the suite pin still reads 2" | Strike. It belongs in the annex. |
| Self-congratulation | "which is why the verdict and the finding are the same shape" | Strike. |
| Repeated disclaimer | The same limit sentence twenty times | Once, in Methods. |

A real caveat survives all of this, and takes a fixed form: the condition that would break the
result, then the reason that condition is or is not likely. *"The comparison holds unless the two
figures were measured over different sampled depths, which the sources rule out by stating their own
footprints."* Deleting a sentence of that shape leaves an unsupported conclusion standing, which is
what separates it from everything in the table above.

## 6. The mapping rule

Every claim in the note maps to a row in the annex's §3 table or to a trace in its §4. The map is
built as the note is written, checked before publication, and does not appear in the publication.

A claim with no annex row is not written. If the note needs a claim the annex does not carry, the
annex is short a test and the run goes back a step; the note is never the place a new claim first
appears.

The map is a two-column working file at `cr_scratch/<run-id>_note_map.tsv`: note sentence or table
cell, and the annex row or trace it rests on. It is the Fact-Checker's input and is not delivered.

Cross-source arithmetic is the one exception and is handled as arithmetic, not as citation. The note
may compute a ratio from two stated figures — the 41.7× present-value ratio between a 7 percent and a
25 percent discount rate over 2026–2050 is an example — provided both inputs map to annex rows and
the computation is shown. `answer_contract.md` §2 denies such arithmetic a trace grade in the annex;
it does not forbid a signed author from doing arithmetic in a note.

## 7. Adjudication

The note takes a position. That is the difference between a technical note and a register dump, and
it is why the note needs an author.

Where the corpus holds two live sides, the note states both, states which the evidence favours, and
gives the reason. It does not average them, does not present them as equally weighted when they are
not, and does not decline to rank on the grounds that ranking is forbidden — that prohibition binds
the annex.

Where the corpus genuinely cannot settle a question, the note says so in one sentence and says what
measurement would settle it. It does not enumerate the search.

The annex remains non-adjudicating throughout. A reviewer comparing the two objects should be able to
see exactly where the author's judgement entered, because the annex will carry both sides flat and
the note will carry a conclusion.

## 8. Seats

The note is not written by the session that produced the annex.

| Seat | Act |
|---|---|
| The Manager | Opens: confirms the annex is complete and the question the note answers is the question asked. Closes: judges whether the note ships. |
| The Writer | Builds the outline as topic sentences, submits it for the gate, then drafts to it. |
| The Editor | Passes for §5. Reads with the banned-construction table in hand. |
| The Fact-Checker | Gates the map: every note claim to an annex row, and no claim without one. |

The outline gate is not optional. Every outline entry is written as the claim its section will make,
in a full sentence. *"The model prices a resource pool it never assigns a grade to"* is an outline
entry; *"5.2 Resource Assumptions"* is not. A heading names a location and cannot be tested; a claim
can. The Manager validates the outline against the annex and against the run's test plan before a
word of prose is drafted, because a missing argument costs minutes at outline and hours in a draft.

The prompt sequence that drives all four seats is specified at `oracle/client_note_prompts.md`.

## 9. Worked example

From `cr_scratch/postmortem_deloitte_evidence/lunar-economy-valuation-review.md`, the annex for
`r-2026-08-29-0001`. Five annex rows and the note text they produce.

| Annex location | Note text |
|---|---|
| §3 Group 0 row 1 | The model states no ore grade for any resource it prices. |
| §3 Group 0 row 2 | It states no excavation rate for any machine it assumes. |
| §3 Group 5 row 3 | It uses no reference class. |
| §3 Group 0 rows 3–4 | Its Limitations section concedes the value is end-loaded and does not list the discount rate. |
| §3 Group 0 row 6 | Jones 2019 is cited once; neither of its headline figures appears. |

The abstract those rows support:

> Deloitte's *Building the Lunar Economy* estimates a $343–566B lunar economy over 2026–2050 from a
> bottom-up unit-price model discounted at 7 percent real. The model states no ore grade for any
> resource it prices, states no excavation rate for any machine it assumes, and uses no reference
> class. Its own Limitations section concedes that the value is end-loaded but does not list the
> discount rate among its limitations. The propellant business case is taken from Kornuta 2019 at
> $36,000/kg to the lunar surface. Jones 2019, which finds lunar ISRU propellant 97 percent more
> expensive than Earth-launched propellant with no crossover between 10 and 1,000 t/yr of demand, is
> cited once and neither of its headline figures appears. Substituting McKeown's 25 percent hurdle
> rate for development-stage space resource projects reduces the present value of a 2050 dollar by a
> factor of 41.7. The report's three stated limitations — terrestrial learning-rate proxies,
> unresolved ice concentration, and the separate reporting of indirect benefits — are accurate and
> are not the load-bearing ones.

Four hundred words of the annex's §2 produce none of this. The five rows that produce all of it are
table cells the annex buries at rows 1, 2, 3, 4 and 6 of a thirty-six-row grid.

The Methods section for the same note, carrying the reading limitation once:

> Findings rest on 169 source summaries held in this corpus, each a structured précis of a published
> paper or agency document. The summaries were read; the source PDFs were not. Claims attributed to a
> source were located in that source's summary by string search, quoted with a line reference, and
> checked to distinguish the summary's own reported result from its citation of a third author — a
> step that reassigned two figures during this review. Endnotes in the report under examination were
> resolved to author, title and venue, and the cited works were not independently read. The
> conclusions below therefore hold unless a summary misstates its source on a figure this note
> relies on, which a sampling read against the PDFs would settle.

That paragraph replaces twenty identical limit lines and one nine-item unverified list.

## 10. What this document does not do

It does not make the note correct. A note whose claims all map to annex rows is exactly as sound as
the annex, and the annex's own limits are unchanged by anything here.

It does not shorten the annex. `deliverable_shape.md` §8 defends the annex's length and that defence
stands — the annex is long because it is evidence, and evidence is not improved by compression.

It does not govern the turn. The haiku remains as specified.

## 11. Owed

A `D` row in `oracle/MANIFEST.tsv` and an amendment row in `oracle/AMENDMENTS.tsv`, on promotion.

A machine-checkable suite at `oracle/tests/client_note_suite.md`, if the standing invariants are ever
wanted as executable rows rather than as test-plan content. They are currently carried as the
mandatory whole-document block of §3 in `oracle/client_note_prompts.md`, which every run's generated
test plan must contain, and that is sufficient while the gate is a person.

`answer_contract.md` and `deliverable_shape.md` take no amendment from this document. The note sits
beside them and is governed by neither.
