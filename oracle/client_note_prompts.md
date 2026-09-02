# The client note prompt sequence

**Contract version: 1.** Written against `oracle/client_note.md` version 1. Drives the four seats
that document names in its §8.

`cr-agents/method/tdd_method.md` already specifies a three-prompt sequence — test suite, outline,
document — plus an editing pass. That sequence is the machinery here. This document does not replace
it. It specifies what fills its slots when the document being built is a client note and the source
material is an annex.

The sequence has one property that matters more than any of its content: **the deliverable of the
first prompt is not the note.** It is a test plan. The deliverable of the second is an outline. A
human approves each before the next runs. A session that produces prose at prompt 1 has failed the
sequence regardless of how good the prose is.

---

## 1. Preconditions

The sequence does not open until all four hold.

| Condition | Checked how |
|---|---|
| The annex exists and is complete under `deliverable_shape.md` | Five headings present, §3 populated, §5 carries denominators |
| The question the note answers is the question that was asked | The Manager reads the annex §1 against the console transcript |
| `cr-agents/` is present at a known ref | `git -C cr-agents rev-parse --short HEAD` against `VERIFIED.tsv` |
| The audience and the length are fixed | Both are inputs to prompt 1; §2 gives the audience default and the length tiers |

An annex that refused, under any reason code, produces no note. A refusal is a statement that the
corpus cannot answer, and the client-facing form of that is a two-paragraph letter, not a technical
note. The letter is out of scope here and is owed.

## 2. The six slots

Every prompt in the sequence is built from the same six fills. They are written once, by The
Manager, at the open, and are reused verbatim in prompts 1 through 4. Rewording a slot between
prompts is how a sequence drifts.

| Slot | What it holds | Source |
|---|---|---|
| `OBJECT` | The genre, stated as a noun phrase | Fixed: "a technical note for publication" |
| `SUBJECT` | What the note is about, in one clause | The annex §1 |
| `PURPOSE` | The specific misconception, gap or question the note settles | The annex §2, translated out of verdict vocabulary |
| `AUDIENCE` | Who reads it and what they already know | Default below; overridden by the requester |
| `LENGTH` | The word target and the sections carried | `client_note.md` §3.1, chosen against the question |
| `EXCLUSIONS` | What must not appear, named concretely | §4 below, plus anything run-specific |

`AUDIENCE` defaults to *a cognizant reader in a space-adjacent role — CSA, LSEI or equivalent — who
follows the domain and is not a specialist in it, and who has not read the sources.* Cognizant is the
operative word and it is not the same as technical. The reader knows what ISRU is and will not be
told; the reader does not know what a hurdle rate does to a twenty-five-year projection and will be
shown. Override the default when the reader is an executive, a regulator, or a specialist in the
exact subject.

`LENGTH` is chosen from the three tiers in `client_note.md` §3.1 before prompt 1 opens. It is a
requirement in the test plan, not a suggestion in the drafting prompt, because a length nobody
committed to is a length the draft sets by itself.

`PURPOSE` is the slot that carries the most weight and is the easiest to fill badly. It is not the
topic. It is the thing a reader believed, or did not know, that will be different after reading. A
`PURPOSE` that reads "examine the report's assumptions" produces a survey. One that reads "the
report's valuation rests on three inputs it never states" produces a note.

## 3. Prompt 1 — the test plan

Run against the annex. The seat is The Software Engineer under
`cr-agents/method/operational_guide.md` A.3.1, whose roster role is test suite design and TDD.

```
I need to write [OBJECT] about [SUBJECT].

Requirements:
- Audience: [AUDIENCE]
- Purpose: [PURPOSE]
- Length: [LENGTH], per oracle/client_note.md section 3.1
- Every claim must map to a row in the attached annex

Exclusions, and these are not stylistic preferences:
[EXCLUSIONS]

Create a test suite this note must pass. Organize by scope.

WHOLE-DOCUMENT TESTS
Include, mandatorily, the block in section 3.1 below, verbatim.
Add tests for terminology consistency, for the abstract standing alone,
and for the absence of contradiction between sections.

SECTION-LEVEL TESTS
One block per section the LENGTH tier carries. Derive them from the annex:
every row of the annex section 3 table is a candidate claim, and a test
names which section will carry it. A shorter tier makes fewer claims and
therefore has fewer section tests; it does not have laxer ones.

For each test: what is tested, pass/fail criteria, and the annex row or
trace it rests on. A test with no annex row is a test for a claim this note
may not make; drop it and say you dropped it.

Do not draft any prose. The deliverable of this prompt is the test plan.

[Attach: the annex]
[Attach: oracle/client_note.md]
```

### 3.1 The mandatory whole-document block

Every generated test plan carries these eight, verbatim. They are the invariants of the object rather
than of the run, and a plan that omits one is returned rather than corrected.

| # | Test | Pass criteria |
|---|---|---|
| W1 | No verdict token appears | `CONTESTED`, `LITERATURE`, `APP`, `BOTH`, `FIGURE` and every refusal code return zero on a case-insensitive grep of the delivered bytes |
| W2 | No register axis identifier appears | `LCC-`, `ECR-` and any other register key prefix return zero |
| W3 | No header block appears | No line matching `^(run|asked|verdict|reason code|contract version|lsei ref):` |
| W4 | No trace or limit line appears | `Trace (` and `LIMIT:` return zero |
| W5 | Limitations appear in at most two places | Methods, and one Discussion subsection; nowhere else, and no section titled for unverified items |
| W6 | Every claim maps | Every row of the map file resolves to an annex row or trace, and every empirical claim in the note appears in the map |
| W7 | No sentence is about the note | No sentence whose subject is the document, its sections, its scope, or what it does or does not say |
| W8 | The banned constructions return zero | The eight patterns of `oracle/client_note.md` §5, checked by reading, not by grep |

W7 and W8 are the two a machine cannot fully check and are The Editor's at prompt 4. They are stated
here so the plan carries them from the start rather than acquiring them at the end.

## 4. The exclusion block

Pasted into `EXCLUSIONS` at every prompt. Concrete instances beat categories, so this names the
failure it prevents rather than describing a style.

```
- No process narrative. Nothing about what was searched, in what order, what
  was decided, what tool disagreed with what document, or what a prior draft
  said. If the reader would learn something about how the work was done
  rather than about the subject, cut it.
- No internal vocabulary. Verdict tokens, axis identifiers, contract section
  numbers, reason codes, run ids and file paths from this repository do not
  appear.
- No trace blocks and no repeated disclaimers. The reading limitation is
  stated once, in Methods, as prose.
- No section for unverified items. A limitation that bears on a conclusion
  goes next to that conclusion. A limitation that bears on nothing is cut.
- No sentence whose content is that the author is being careful. Delete any
  sentence that can be removed without leaving a claim unsupported.
- No sentence about the note itself, its shape, or what it does not say.
- Write a Methods section instead of any of the above.
```

The last line is doing real work. Every excluded item is an attempt to establish credibility, and
removing them all without a substitute produces a note that reads as unsourced. Methods is the
substitute, and it is where the reading limitation, the procedure and the source basis go.

## 5. Prompt 2 — the outline

Run after a human approves the test plan. The seat is The Writer, whose context recipe at
`cr-agents/method/operational_guide.md` A.3.2 already loads
`cr-agents/supplements/writing-guides/structure.md` and `style.md`.

```
Generate a paragraph-level outline which, if followed, produces a note that
passes every test in the attached plan.

Each paragraph is represented by its topic sentence — the claim that
paragraph makes, written as a full sentence in the declarative. Not a
heading, not a bullet, not a label. "The model prices a resource pool it
never assigns a grade to" is an outline entry. "Resource assumptions" is
not.

Order the claims for a reader who has not read the annex and will not read
it. The strongest finding is in the abstract and in the first three
paragraphs of the introduction, not held back for the discussion.

State which annex row each topic sentence rests on, in brackets after it.
These brackets are the map. They are removed at prompt 3 and do not appear
in the note.

[Attach: the test plan]
[Attach: the annex]
```

The Manager validates the outline against the test plan before approving: every test maps to at least
one outline entry, every outline entry supports at least one test, no two topic sentences contradict,
and every table the plan requires is specified with its columns.

## 6. Prompt 3 — the draft

Run after a human approves the outline.

```
Write the note from the attached outline. Each topic sentence is developed
into a complete paragraph. Do not add claims the outline does not carry.

Strip the bracketed annex references from the prose and collect them into
cr_scratch/<run-id>_note_map.tsv, two columns: the sentence, and the annex
row it rests on.

The exclusions from the test plan apply to every sentence you write.

[Attach: the outline]
[Attach: the annex, for figures and quotations only]
```

## 7. Prompt 4 — the editing pass

The seat is The Editor, whose context recipe loads
`cr-agents/supplements/signs_of_ai_writing.md` as a non-negotiable full file.

```
Audit the attached note against signs_of_ai_writing.md and against the
banned constructions in oracle/client_note.md section 5.

For each finding: quote the sentence, name the pattern, and give the
replacement. Apply the test that separates a real caveat from a decorative
one — delete the sentence and ask whether a claim is now unsupported. If
nothing is unsupported, the sentence goes.

Edits may not introduce a test failure. Re-run the whole-document tests
after revision.

[Attach: the note]
[Attach: the test plan]
```

## 8. The gates

Three human approvals, and they are the point of the sequence.

| Gate | Approves | Failure it catches |
|---|---|---|
| After prompt 1 | The test plan | The note would have answered a different question |
| After prompt 2 | The outline | A missing argument, at ten minutes' cost instead of two hours' |
| After prompt 4 | The note | Everything else |

A session that runs prompts 1 through 4 without stopping has produced a draft nobody specified, which
is the failure the sequence exists to prevent and is indistinguishable from not using it.

## 9. Worked fill

For `r-2026-08-29-0001`, whose annex is at
`cr_scratch/postmortem_deloitte_evidence/lunar-economy-valuation-review.md`.

| Slot | Fill |
|---|---|
| `OBJECT` | a technical note for publication |
| `SUBJECT` | the valuation method in a consultancy estimate of the 2026–2050 lunar economy |
| `PURPOSE` | The estimate's headline range rests on three inputs it never states — an ore grade, an excavation rate, and a reference class — and on a discount rate its own limitations section omits. Establish which of its conclusions survive that. |
| `AUDIENCE` | Default: a cognizant reader in a space-adjacent role who has read the estimate and not its sources |
| `LENGTH` | 2,500–4,000, all seven sections — a review of a document, under `client_note.md` §3.1 |
| `EXCLUSIONS` | §4 verbatim, plus: do not name the six register axes; the disagreements they hold are described in words or not at all |

The `PURPOSE` fill is the transformation the whole sequence turns on. The annex says
`CONTESTED, on six register axes, twelve sides, no adjudication`. The fill says what a reader will
know afterward. Neither sentence could substitute for the other, and only one of them can be written
against.

## 10. Owed

A refusal letter form, for annexes that refused. Named in §1 and not specified.

A `D` row in `oracle/MANIFEST.tsv` and an amendment row in `oracle/AMENDMENTS.tsv` for this file and
for `oracle/client_note.md`, on promotion.
