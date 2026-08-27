
# The answer contract

**Contract version: 1.**

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
| `CONTESTED` | A sub-claim matched a contested-claims register axis at classification time. | Both sides, the axis named, no adjudication. | 2, parallel, each briefed on one side only |
| `REFUSE` | Nothing available answers, and one of six reasons in §5 says which. | The refusal, per §5. | 0 |

Where the app and a shelf candidate compete for the same fact, the app wins outright and the shelf
figure is never folded in as a second `BOTH` sentence. `BOTH` requires two distinct questions.

`FIGURE` is not a variant of `APP`. It carries a different verification, forward and recompute over a
manifest rather than a scalar recompute, and it is a file unconditionally.

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

**Rule G, grade by origin.** Twelve cells, five legal.

| Origin | `recompute-verified` | `resolution-only` | `refused` |
|---|---|---|---|
| `app` | legal | legal (app-stored prose, slugs resolving against the app's own slug table) | illegal |
| `literature` | illegal | legal | illegal |
| `findings` | illegal | legal | illegal |
| `none` | illegal | illegal | legal |

**Rule V, verdict by the multiset of origins present.**

| Verdict | Required | Forbidden |
|---|---|---|
| `APP` | at least one `app` | every other origin |
| `FIGURE` | at least one `app` | every other origin |
| `LITERATURE` | at least one `literature` or `findings` | `app`, `none` |
| `BOTH` | at least one `app`, and at least one `literature` or `findings` | `none` |
| `CONTESTED` | at least two `literature`, one per side of the axis | `app`, `findings`, `none` |
| `REFUSE` | exactly one `none` | every other origin |

`CONTESTED` forbids `findings`. A register axis has sides drawn from `literature` only. A `findings`
entry may name an axis; it may not be a side of one, because a prior adjudication of a disagreement
entered as a party to that disagreement is the Oracle arguing with itself under two names.

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
| `misclassified` | A searched retrieval returned a file that appears on the register. | The axis's `match_keys`. |
| `input-missing` | A required input is absent, empty, or unparseable. | The bootstrap. |

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

**Every row records:** timestamp, question text, verdict, `outcome`, `review`, the refusal reason
code where the verdict is `REFUSE`, the deliverable file path, and the contract version the run
executed under. The row schema is closed. Extending it is a version bump.

## 9. Version

The version is a monotone integer. Any change to any closed set, any rule, or any fixed text
increments it. Three things read it, and if any of the three stops reading it the field is removed
rather than left as decoration:

1. This file carries it.
2. Every run log row records the version the run executed under.
3. The acceptance suite asserts that the version it was written against equals the version here, and
   fails when they differ.

