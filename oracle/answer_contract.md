
# The answer contract

**Contract version: 2.**

Version 2 is **one edit**, landed at the Step 1 close as revision item R-3. It carries eleven
amendments — `AM-62` to `AM-65` from 1.8 §1.9, `AM-67` to `AM-71` from 1.6 §12, and two found
while landing them — and increments the integer **once**. It is not two bumps and it is not three.
§9 says why, and says it in the rule rather than in a note, because the ambiguity that produced
three queued bumps was in the rule.

Every mechanism, suite and check in this project is written against this file. Every term below is
closed. A value outside a closed set is a failure, not a variant.

## 1. Verdicts

Six, closed. The verdict is computed before any retrieval runs, from the sub-claim classification,
and it selects the wave.

| Verdict | Condition that produces it | What the user receives | Personas |
|---|---|---|---|
| `APP` | Every sub-claim resolved to an app address. | The value or values, in the app's own units, with a recompute trace per value. | 0 |
| `FIGURE` | An app address resolved with one dimension unbound, so more than one call into the model. | A figure file and its manifest, plus the caption. Always a file; there is no chat form. | 0 |
| `LITERATURE` | No app address resolved; retrieval confirmed at least one shelf file. | The answer, with a citation trace per claim, each naming its origin. | 1, by field |
| `BOTH` | An app-sourced fact and a shelf-sourced fact answer two distinct questions. | Both, app fact first. | 1, by field |
| `CONTESTED` | A sub-claim matched a contested-claims register axis of class `two_sided` or `false_pair` at classification time. | Every side, the axis named, no adjudication. | One per side, minimum two, no cap. Parallel, each briefed on one side only |
| `REFUSE` | Nothing available answers, and one of six reasons in §5 says which. | The refusal, per §5. | 0 |

Where the app and a shelf candidate compete for the same fact, the app wins outright and the shelf
figure is never folded in as a second `BOTH` sentence. `BOTH` requires two distinct questions.

`FIGURE` is not a variant of `APP`. It carries a different verification, forward and recompute over a
manifest rather than a scalar recompute, and it is a file unconditionally.

**`CONTESTED` buys one persona per side, minimum two, no cap.** The rule was exactly two. A register
axis may carry any number of sides, and truncating to two makes the router the thing that chooses
which sides the user hears — the one-sidedness the register exists to prevent. The cost control is
authoring rather than a cap: a domain persona who writes a six-sided axis buys six personas on every
question that touches it, and will not do it twice. The anti-synthesis rule is untouched, because it
was always about isolation rather than about the number two: no brief contains any other side's
member path, over every brief, pairwise.

**A `one_sided` axis never produces `CONTESTED`.** It has one side, and Rule V requires one
`literature` trace per side over at least two sides, so such a run is *unsatisfiable* rather than
wrong — and an unsatisfiable requirement fails as a refusal carrying no reason code, which is the
worst failure this contract can produce. A `one_sided` axis produces `LITERATURE` or `BOTH`,
carrying its documented side and the one-side disclosure fixed at `oracle/register_schema.md` §7.

## 2. Trace grades

Three, closed. A trace line carries exactly one.

| Grade | What qualifies | What does not |
|---|---|---|
| `recompute-verified` | A scalar the app recomputed fresh at answer time and found equal to the value printed. | A value read from a stored field. A value carried by a summary. A value the Oracle derived by arithmetic. |
| `resolution-only` | A locator that resolves: the path exists and the named text is present at it. | Any claim that the target supports the sentence beside it. |
| `refused` | Nothing is asserted. The refusal's stated reason stands in place of a trace. | Anything asserted anywhere in the same block. |

A grade word outside these three is a failure. `verified`, `confirmed`, `validated`, `proven`,
`established` and `supported` are failures, not warnings.

**Derived arithmetic is a deliverable, not a trace.** A figure the Oracle computes from a shelf
figure, a unit conversion included, has no locator that resolves and therefore no legal grade. Shelf
figures are quoted in the source's own units. Cross-source arithmetic belongs in a `findings` shelf
entry, where it has a file, an author, and a derivation somebody can dispute.

## 3. Trace lines

Fixed grammar, fixed arity, in every deliverable:

```
Trace (<kind>, <grade>, <origin>): <locator>
```

`origin` is a closed set of four and is a function of the locator rather than a judgement: `app`,
`literature`, `findings`, `none`. A written origin that disagrees with the one computed from the
locator is a failure. **An answer says which shelf it drew from, on every trace line it emits.**

**An `app` locator names the model ref its value was computed against.** The grammar's arity does not
change: the ref rides the locator, and the origin function strips it before resolving. The ref is
read live, once, at the start of the run — `git -C lsei rev-parse --short HEAD` — and never from
`.oracle-state.json`, because a per-install, deletable, gitignored file must not be load-bearing for
a claim inside a delivered document. The live ref is compared against `copies.lsei.head`; a mismatch
means the working copy moved between the bootstrap and the answer, and it is a **report line on the
answer**, not a refusal.

**If the ref cannot be read at all, the run refuses `input-missing` before classification**, with
zero personas spent. That timing is not a detail. A refusal reached after the wave has run costs more
than the answer it replaces and breaks §5's unconditional zero-persona rule, so a missing input fires
where every other missing input fires — at the start. An `app` trace emitted with no ref *after* a
successful read is an emitter defect rather than a refusal: it fails this section's check and the
deliverable does not ship.

**Rule G, grade by origin.** Twelve cells, five legal.

| Origin | `recompute-verified` | `resolution-only` | `refused` |
|---|---|---|---|
| `app` | legal | legal (app-stored prose, slugs resolving against the app's own slug table) | illegal |
| `literature` | illegal | legal | illegal |
| `findings` | illegal | legal | illegal |
| `none` | illegal | illegal | legal |

**Rule V, verdict by the multiset of origins present.**

| Verdict | Required | Forbidden | Permitted, not counted |
|---|---|---|---|
| `APP` | at least one `app` | every other origin | — |
| `FIGURE` | at least one `app` | every other origin | — |
| `LITERATURE` | at least one `literature` or `findings` | `app`, `none` | — |
| `BOTH` | at least one `app`, and at least one `literature` or `findings` | `none` | — |
| `CONTESTED` | one `literature` per side of the axis, over at least two sides | `app`, `none` | `findings` |
| `REFUSE` | exactly one `none` | every other origin | — |

**`CONTESTED` permits `findings` and never counts it as a side.** A register axis has its sides drawn
from `literature` only: a `findings` entry may name an axis and may not *be* a side of one, because a
prior adjudication of a disagreement entered as a party to that disagreement is the Oracle arguing
with itself under two names. The blanket ban that stood at version 1 was too strong. It meant this
project's own adjudication could never be shown beside the contest it adjudicates — which is where it
is most useful and, under the `findings` limit line, where it is most clearly labelled as the
project's own view rather than a source's.

**The requirement is one `literature` trace per side, not two traces.** On a three-sided axis, two
traces is one-sidedness with an extra source.

**The fourth column is not decoration.** Permitted-and-never-counted is a third state, and a
generator that parses this table as two columns finds `findings` in neither, emits the version-1 cell
list against the version-2 rules, and returns green. A table a checker reads has to carry every state
it has, in its shape and not only in the prose beneath it.

A `LITERATURE` verdict carrying a `recompute-verified` trace means either that a summary's number is
being presented as an app recompute, or that the router answered from a summary a question the app
could have answered. Both violate the authority rule. It is a failure.

## 4. Limit lines

Fixed text, verbatim, one per trace of the stated origin. Not style, and not optional.

**Origin `literature`:**

```
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.
```

**Origin `findings`:**

```
LIMIT: this trace resolves to a prior conclusion of this project, not to a source. Its verdict and its arithmetic are the project's own; the sources it adjudicates are named inside it and carry their own traces there.
```

## 5. Refusals

A refusal carries exactly one reason code, closed set of six. Each routes to a different owner, which
is why they are not one code.

| Code | Condition | Who owns the fix |
|---|---|---|
| `excluded` | The app's EXCLUSIONS register declares the topic. | Nobody. The app's declared boundary, working. |
| `not-found` | No address resolved and no shelf file confirmed. | A corpus gap, and an acquisition decision. |
| `unbuildable` | An app address was named in intent and the address grammar cannot build it. Never falls through to a shelf search. | The address grammar. |
| `axis-incomplete` | A register axis matched and a member path does not resolve on disk. Never falls through to search. | A broken register row. |
| `misclassified` | A searched retrieval returned a file belonging to an axis whose `match_keys` this question touched at any nonzero overlap, while classification did not fire that axis at its stated firing rule. | The axis's `match_keys`. |
| `input-missing` | A required input is absent, empty, or unparseable. | The bootstrap. |

**`misclassified` is a claim test, not a file test.** Its condition at version 1 was *"a searched
retrieval returned a file that appears on the register"*, and a file is not a claim. A summary sitting
on one axis carries many claims that sit on none, so under that condition every question that
retrieved it refused — for excavation rates, for TRL levels, for anything — and a large fraction of
the corpus became radioactive for all of its content. That is the container-shaped join this project
keeps meeting, in its own contract.

The detector now uses the **same join as the classifier, at its weakest setting**: any nonzero
`match_keys` overlap with an axis the returned file belongs to. Classification fires an axis at its
stated firing rule; the detector fires below it, and the band between the two thresholds is the
classifier's admitted uncertainty, which is the whole content of the check. This does not reopen
classification-before-retrieval: the detector combines three things it already holds — the question,
the register, and a filename retrieval has returned. It issues no second retrieval, fetches no
counterpart, composes nothing, and its only two outputs remain a refusal and a log row. A mechanism
with no ability to combine cannot become a reconciliation, and that is a property of its outputs
rather than a promise about its use.

**`excluded` is the weakest of the six and is written only when no other code applies.** It is the
one code in this table whose owner is *nobody*, and **a code that routes to nobody must never mask a
code that routes to someone.** Where an EXCLUSIONS entry matched and another code also applies, the
other code is written and the exclusion sentence is printed as the refusal's *nearest present
object* — which is the slot it belongs in, and which the three-noun rule below already provides.

That clause is not hypothetical tidying. Two fixtures in `oracle/tests/answering_loop_suite.md` were
carried green against the prototype while a single shared token between a question and an exclusion
entry reached `excluded` ahead of `unbuildable` and ahead of `not-found`. Neither fixture could see
it, because both asserted the code the defect produced. The contract needed no new reason code and
gets none; it needed to say which of six wins.

**What a refusal costs.** Cheaper than an answer in every dimension the system has, because a cost
that is cheap in one dimension and expensive in another is arbitrage, and the system learns to answer
instead.

- **Wave: zero personas.** Unconditional, for every code.
- **Length: sixty words, excluding trace lines.** An answer's cap is two hundred, so a refusal is
  shorter than an answer without anything comparing two texts at run time.
- **Retrieval: a refusal never issues a second retrieval.** A refusal that repairs a retrieval is a
  reconciliation, which classification-before-retrieval forbids.

A refusal names three nouns: the absent object, the region searched, and the nearest present object.

## 6. The deliverable is a file

**Every deliverable is a file, without exception, short answers and refusals included.** The team
writes to the file. The orchestrator reads the file. There is no path by which team prose reaches the
user except through a file that exists on disk first.

The chat text block is never an alternative to the file. It is a verbatim, byte-identical, contiguous
excerpt of a file that already exists, which is what makes it checkable that the orchestrator did not
edit on the way out. A paraphrase, a summary, or a reflowed excerpt is a failure.

A chat block appears when either condition holds, and otherwise the user receives a haiku and the
file's path:

1. The deliverable is under two hundred words and fits one screen.
2. The user asked for a block.

A `FIGURE` deliverable has no chat form.

The haiku is the orchestrator's own turn and is not a deliverable. It carries no numeral, no unit
token, no coefficient name, and no named source.

The deliverable file persists after the turn, and its path is recorded in the run log row for that
run. A log row that cannot retrieve the bytes that were delivered cannot be sampled.

## 7. Claim-bearing, defined here

A unit is claim-bearing if it holds a numeral, a unit token, a coefficient name, or a named source.
The last three lists are read out of the app rather than typed into a checker. The definition
over-selects deliberately: a unit wrongly called claim-bearing costs one trace, and a unit wrongly
excused costs the whole control.

Every claim-bearing unit in a deliverable carries at least one trace. The definition is written here
rather than referenced, so that it survives whatever is ruled about how the reference implementation
is acquired.

## 8. The run log

Two columns carry outcome, and neither is written by the other's author.

**`outcome`, five values, machine-written, single-valued, in precedence order.** The first that
applies is the one written.

| Value | Meaning |
|---|---|
| `ERROR` | A thrown, uncaught failure. A stack trace never stands in for a verdict. |
| `MISCLASSIFIED` | A searched retrieval returned a register member. The run refuses; the row names the question and the axis. |
| `REGISTER_FAIL` | A deliverable failed the register check twice and was delivered with its failures listed above it. |
| `REFUSED` | The run refused, and named a reason code from §5. |
| `ANSWERED` | The run answered and passed every check. |

**`review`, three values, human-written, never machine-written.**

| Value | Meaning |
|---|---|
| `unreviewed` | No person has read this row against its sources. The default. |
| `confirmed` | A person read it and the answer holds. |
| `FILLED` | A person read it and the run answered where it should have refused. |

`FILLED` is not machine-assignable. Detecting it requires the independent judgement the router is
not, and the separation is a column rather than a convention.

A sampling result is reported as a proportion with its denominators, all three countable from these
two columns: `FILLED` count, reviewed count, run count.

**Every row records, in nine fields:** timestamp, question text, verdict, `outcome`, `review`, the
refusal reason code where the verdict is `REFUSE`, the deliverable file path, the contract version the
run executed under, and the `lsei` ref the run read at its start — or `-` where `lsei` was absent.
The row schema is closed. Extending it is a version bump.

**The ref is a column and not a fact left to be recovered from the traces.** The difference is one
grep. *"`lsei` moved; which delivered answers were computed against the model before it moved"* is a
scan of this log when the ref is a column, and a parse of every deliverable file still on disk when it
is not. A run that emitted no `app` trace records the ref anyway, which the traces cannot supply at
all.

## 9. Version

The version is a monotone integer **naming a state of this file, not a count of the amendments that
produced it.** An edit that changes any closed set, any rule, or any fixed text increments it **by
one, once, however many such changes that edit carries.** Three things read it, and if any of the
three stops reading it the field is removed rather than left as decoration:

1. This file carries it.
2. Every run log row records the version the run executed under.
3. The acceptance suite asserts that the version it was written against equals the version here, and
   fails when they differ.

**Why the increment rule is now stated per edit.** Version 1 read *"any change ... increments it"*,
and two authors read that as counting changes rather than naming states: one queued 1 → 2 for four
amendments, another queued 2 → 3 for a fifth, and this file still read 1 while nine other files read
2. All three consumers need the integer to **identify** a state — a log row says which rules a run
executed under, the suite says which rules it was written against — and none of them can use a count
of edits. A version that counts amendments is also a version nobody can land, because every author
landing one would have to know what every other author landed first, which is the coordination the
integer exists to remove.

**Version 2 is the single edit recorded at the Step 1 close, revision item R-3.** It carries: the
`CONTESTED` persona arity and the `one_sided` exclusion (§1); Rule V's fourth column, the
one-`literature`-per-side requirement and the app-ref clause on `app` locators (§3); the replaced
`misclassified` condition and `excluded`'s precedence (§5); and the run log's ninth field (§8).
Nothing in §2, §4, §6 or §7 moved.

