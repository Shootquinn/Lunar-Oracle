# The deliverable's shape — the TDD-method report

**Contract version: 1.** Written against `oracle/answer_contract.md` **version 3**, whose §6 requires
this shape by name. Sub-step 8.4, The Writer, Wave 5.

`answer_contract.md` §6 said every deliverable is a file and said nothing about what shape the file
has. That gap is why answers have been prose that happens to live in a file. **This document is the
shape.** It is a template a composing session fills, not advice about writing well.

**Why a TDD report and not an essay.** The author asked for the deliverable to be *"basically a TDD
method article/report."* The operative half is §3 below. An essay states what is true; a TDD report
states what was tested and what result would have refuted it. **A claim with no stated falsifier is
an assertion**, and this project has already shipped four waves' worth of evidence that assertions
survive review and refuted claims do not.

---

## 1. Five sections, closed, ordered

Every deliverable carries all five, in this order, under these exact headings. A missing section is a
failure and not an omission; a section with nothing in it is written with its emptiness stated, never
deleted.

| # | Heading | What it holds |
|---|---|---|
| 1 | `## Question` | The question as asked, verbatim. |
| 2 | `## Verdict` | The verdict, **and why that verdict and not the adjacent one.** |
| 3 | `## What was tested, and how it could have failed` | One row per claim: the test, its falsifier, the observed result. |
| 4 | `## Sources` | Trace lines under `answer_contract.md` §3, with §4's limit lines. |
| 5 | `## What remains unverified` | Named, with the population it was searched over. |

The set is closed. A sixth heading is a failure — an answer that needs a section this shape does not
have is a report about the shape, and it goes to The Editor rather than into the file.

**Refusals carry the same five.** A refusal's §3 is *"what was searched for, and what would have made
it findable"*; its §4 is the single `refused` trace; its §5 is the corpus gap. A refusal is the case
where §5 is the whole content, and it is exactly the case where a shorter form would have dropped it.

## 2. The header block

Six fields, above §1, so that the file and its run log row reconcile without reading either one's
prose. Every one of the six is already recorded in the run log under `answer_contract.md` §8; this
block is where the *file* carries them.

```
run:              <run id>
asked:            <ISO 8601 timestamp>
verdict:          <one of the six>
reason code:      <one of the six, or - where the verdict is not REFUSE>
contract version: <the integer from answer_contract.md §9>
lsei ref:         <the ref read live at the start of the run, or - where lsei was absent>
```

A block whose `verdict` disagrees with §2's, or whose `contract version` disagrees with the contract
on disk, fails the file. These are two fields in two places on purpose: the row is machine-written and
the block is written by the composing session, and a disagreement between them is the one signal that
says the two halves of the run came apart.

## 3. Section 3, which is the section this shape exists for

One row per claim the deliverable makes. Four columns, fixed:

| Claim | Test run | Falsifier — the result that would have refuted it | Observed |
|---|---|---|---|

**The falsifier column is not optional and is not fillable with a hedge.** `"could be wrong"`,
`"further work needed"`, and `"depends on assumptions"` are not falsifiers. A falsifier names a
**result** — a specific string absent from a specific file, a path that does not resolve, a count that
comes back different — such that a reader running the test could observe it and know the claim is
dead.

**The test plan is written before retrieval, not after composition.** `CLAUDE.md` §4 already binds
this project to TDD: *every deliverable has its own test plan, written before the deliverable.* The
classification runs before retrieval, so the claims a run intends to make and the tests that would
refute them are both knowable before a single file is opened. A §3 written afterwards records what
happened to pass, which is the shape of every result this project has had to retract.

**The source-verification procedure, written out because "read carefully" is not reproducible.** Every
row whose test is *"the source says this"* runs these four steps and records step 4's output:

1. Open the cited file at the path in the trace line.
2. Search it for the claim's own words — the number, with its own units and its own separator as the
   summary spells them.
3. Quote the line that comes back, with its line number.
4. **Decide whether that line is the file's own result or the file citing somebody else's.** A
   citation carries an attribution in the same sentence. This step is the one that catches a claim
   attached to the wrong paper, and it fires in the worked example below.

Step 4 is separate from step 3 because a summary that reviews its predecessors contains its
predecessors' numbers, and a grep does not know the difference. Twelve register claims attached to the
wrong paper were found in Wave 4 by people doing steps 1 to 4 in their heads. Written down, the steps
run at any model tier; held in the head, they run at whatever tier the reader happens to be.

## 4. Section 5, and the empty-section trap

`## What remains unverified` states **the population it searched over**, always:

```
N items unverified, over M claims and K tests examined.
```

`N = 0` with no `M` is byte-identical to a section nobody wrote. This project has already shipped that
exact defect once — `audit_abstract_overlap.js` reported *"AT OR ABOVE 10%: 0"* over a tested
population of zero, output indistinguishable from a clean corpus (sub-step 8.9). The denominators are
what make an empty section a measurement rather than a silence.

**What belongs here.** Anything the run relied on and did not test: a source whose summary was read
and whose PDF was not; two sides of an axis that turn out to share one observation; a scope token
inferred rather than quoted. **Naming an unverified thing is not a weakness in the answer, it is the
part of the answer nothing else in the system produces.**

## 5. Who writes which section, on a `CONTESTED` run

The anti-synthesis rule is defined in `answer_contract.md` §1 as a property of **briefs**: *no brief
contains any other side's member path, over every brief, pairwise.* It is not a property of the file.
That distinction is what lets a `CONTESTED` answer have a §2 and a §5 at all.

- **§3 and §4 are per side**, composed by that side's persona over that side's leaves only. A side
  persona never sees another side's rows.
- **§1, §2 and the header are the assembler's**, and the assembler is briefed on the **register axis
  row and the classification** — both of which are pre-retrieval, public, and name every side by
  design — and on **no side's leaves**. The assembler holds no member path's content.
- **§5 is the assembler's**, over the sides' §5 rows as submitted. The assembler may add an item and
  may never delete one.

An assembler that reads a side's leaves to write §2 has become a synthesist, and the test for it is
the same pairwise brief-intersection test VRD-9 already runs.

---

## 6. The template

```
run:              <id>
asked:            <ISO 8601>
verdict:          <VERDICT>
reason code:      <code or ->
contract version: <n>
lsei ref:         <ref or ->

## Question

<the question as asked, verbatim>

## Verdict

<VERDICT>.

Not <the adjacent verdict>, because <the condition in §1 of answer_contract.md that separates them,
and what the answer would have looked like under the adjacent verdict>.

## What was tested, and how it could have failed

| Claim | Test run | Falsifier | Observed |
|---|---|---|---|
| <claim> | <command or procedure> | <the result that would have killed it> | <what came back> |

## Sources

Trace (<kind>, <grade>, <origin>): <locator>
LIMIT: <the fixed text for that origin, verbatim from answer_contract.md §4>

## What remains unverified

N items unverified, over M claims and K tests examined.

1. <named item> — <what would close it, and whose act that is>
```

---

## 7. The worked example

The question is the `LCC-01` probe question, verbatim from `oracle/REGISTER.lunar.tsv`. It is the
sharpest case in the corpus: three sources, an order of magnitude between them, and the whole answer
turns on a scope token rather than on which source is right.

**This example is illustrative of the shape.** It is not a delivered run: it has no run id and no
timestamp, and the trace locators are real paths measured on disk at read-digest `622cf37e33141773`,
2026-08-28.

```
run:              -- (illustrative, not a delivered run)
asked:            --
verdict:          CONTESTED
reason code:      -
contract version: 3
lsei ref:         7f97983

## Question

What is the water ice concentration in the regolith at Cabeus crater?

## Verdict

CONTESTED, axis LCC-01, class two_sided, three sides.

Not LITERATURE, and the difference is the whole answer. LITERATURE requires that no register axis
fired at classification time. Had LCC-01 not fired, retrieval would have returned the most-cited of
the three files on its own and the answer would have read "5.6 plus or minus 2.9 percent by mass"
with one trace, one limit line, and nothing on its face to say that two other measurements in this
same corpus differ from it by an order of magnitude. That is the one-sidedness the register exists to
prevent, and it is a *silent* failure: the one-sided answer is well-formed, correctly traced, and
passes every check in the contract except this one.

Not APP: no app address resolves. The Scenario Explorer models a scenario; it does not hold a
measurement of Cabeus. Not BOTH: BOTH requires an app-sourced fact and there is none. Not REFUSE:
all three member paths resolve.

**The scope token is `the measurement footprint and the sampled depth`**, verbatim from the axis row.
It is what makes the spread comprehensible rather than embarrassing. LCROSS sampled an ejecta plume
lofted by a kinetic impactor and divided water mass by a modelled dust mass; LEND averages a
collimated neutron footprint over a region, from orbit, over fourteen years. **These are not three
answers to one question.** No side is adjudicated here, and this section names no side as better.

## What was tested, and how it could have failed

| Claim | Test run | Falsifier | Observed |
|---|---|---|---|
| The axis fired before retrieval | Compare the classification and retrieval timestamps in the run log row | Retrieval timestamp earlier than classification. A second retrieval never repairs a first, so an axis that fires after retrieval has fired too late to change anything | Classification fired LCC-01 on match_keys; retrieval issued after |
| Every member path resolves | `find literature -name <file>` for each of the three member paths in REGISTER.lunar.tsv rows 17-19 | Any path not found. That is refusal `axis-incomplete`, not a two-sided answer | 3 of 3 resolve under `literature/lunar-ice-and-geology/` |
| Side A's figure is side A's own result | §3 procedure, steps 1-4, on `colaprete-2010-lcross-ejecta-water-detection.md`, searching `5.6 plus or minus 2.9` | The string absent; or present only inside an attribution to another author | Present at lines 23, 80 and 84 as the file's own reported mean. Line 84: "the mean water concentration is 5.6 plus or minus 2.9 percent by mass" |
| Side B's figure is side B's own result | §3 procedure on `litvak-2024-lend-cabeus-water-ice.md`, searching `0.49 plus or minus 0.05` | As above | Present at lines 17, 34 and 47. Line 34: "The average subsurface water ice content over the entire Cabeus-1 region is 0.49 plus or minus 0.05 percent by mass" |
| Side C's figure is side C's own result | §3 procedure on `luchsinger-2021-lcross-water-modeling.md`, searching `8.2` and `4.3` | As above | Present at lines 17, 35 and 41 as the file's own modelling result. **Step 4 fired here:** the same file also carries `5.6 plus or minus 2.9` at lines 23 and 47, attributed in the same sentence to "(Colaprete et al. 2010; Heldmann et al. 2015)". That is side A's number inside side C's file, and a grep on the number alone would have assigned it to the wrong side |
| The scope token is quoted, not inferred | Search each file for a statement of what volume or footprint it measured | No source states its own footprint or depth. The axis statement would then be attributing the spread to a cause no source supports | Side A, line 84: the denominator "is the radiative transfer dust mass of about 2175 kg on average, and the ratio is not measured against a sampled volume of regolith." Side A, line 107: the LCROSS sample depth was "possibly deeper than neutron spectroscopy can effectively sample, which the paper puts at deeper than about 0.7 m." Side B, line 17: collimated neutron, area-average over Cabeus-1, model-derived from neutron suppression |
| No adjudication | Search the **assembled** bytes for any sentence ranking the sides, and for arithmetic combining two sides' figures | Any of them present. Cross-source arithmetic is separately illegal under §2 of the answer contract: it has no locator that resolves and therefore no legal grade | None present. Run on the final file after assembly, never on a side's draft — the drafts cannot produce this failure and testing them for it is testing where it cannot fire |
| Rule V is satisfied | Count `literature` traces and distinct sides | Two traces on a three-sided axis. That is one-sidedness with an extra source, and it passes a "more than one trace" test | 3 traces, 3 distinct sides |

## Sources

Trace (citation, resolution-only, literature): literature/lunar-ice-and-geology/colaprete-2010-lcross-ejecta-water-detection.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/lunar-ice-and-geology/litvak-2024-lend-cabeus-water-ice.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/lunar-ice-and-geology/luchsinger-2021-lcross-water-modeling.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

## What remains unverified

3 items unverified, over 4 claims and 8 tests examined.

1. **Sides A and C are not independent.** Side C re-models the same 2009 LCROSS observation side A
   reported, and cites side A's figure in its own introduction. Two of the three sides rest on one
   event. Whether an axis whose sides share an observation is properly three-sided is a register
   question, not an answering question, and it is the register author's act.
2. **Every trace here is `resolution-only`.** Nobody has confirmed that these three summaries say what
   their source PDFs say. Whether the PDFs are even on this install is per-install state
   (`CLAUDE.md` Phase 4, BC-19) and is not a property of the corpus. A sampling read against the
   sources closes it; nothing in the answering loop can.
3. **Whether footprint and depth explain the spread in full.** No source in this corpus compares the
   two methods over a common volume, so the scope token is the best available account of the spread
   and is not a measurement of it.
```

---

## 8. What this shape does not do

It does not make an answer correct. Every test in §3 is a test the composing session chose, and a §3
full of easy tests is a §3 that passes. **The check on that is §5's denominators** — a run with eight
tests and zero unverified items is claiming a completeness no run in this project has ever had, and
that pattern is what a sampling read looks for first.

It does not shorten anything. A refusal under this shape is longer than a refusal was, because §3 and
§5 exist. `answer_contract.md` §5's sixty-word cap governs the refusal's **prose**; the table rows and
trace lines sit outside it, exactly as the cap already excludes trace lines.

**And it is not the turn.** `answer_contract.md` §6b fixes the user-facing turn at 2 to 5 haiku strung
linearly and states that laconic is the standard there. **That brevity is a property of the turn and
is not inherited by the file.** The two objects pull in opposite directions on purpose: the turn is
short because it must not sound like an answer, and the file is complete because it *is* the answer.
A session that reads "super concise" and produces a thin §3 has satisfied the wrong document — the
haiku's job is to be too small to smuggle a claim, and the deliverable's job is to carry every claim
with the test that could have killed it.
