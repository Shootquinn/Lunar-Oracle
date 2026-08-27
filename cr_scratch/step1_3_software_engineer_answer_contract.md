# Step 1.3, The Software Engineer: the answer contract, frozen

**Persona:** The Software Engineer
**Sub-step:** 1.3 (origin LOOP-1), Group 1, no dependency
**Deliverable:** the block in §2, liftable verbatim to `oracle/answer_contract.md`
**Reasoning:** §1 (what I decided and why), §3 (findings, and requirements this places elsewhere)

---

## 1. Reasoning

### 1.1 The simplicity gate, run on my own fifteen terms first

The brief warns that six verdicts, three grades and six log outcomes is fifteen closed terms in a
one-page contract, and asks whether any of them is idle. I found one idle term, one term that had to
be re-ruled, and one that needed its warrant written down because it is not obvious.

**The idle term was mine and it was not on the list.** The prototype carries `APP_UNBUILDABLE` as a
composed verdict string, and my 0.2 fixture table gave it "its own named outcome." It is not a
verdict. Nothing selects a different wave on it, nothing selects a different deliverable form, and
the prototype itself already composes an all-unbuildable question to `REFUSED`. It is a refusal with
a reason, so it becomes a reason code and the verdict set stays at six.

**Ruling out the seventh verdict forced a decision about a term I had left implicit.** If
`unbuildable` is a reason code then `REFUSE` has reason codes, and they have to be a closed set or
the refusal count collapses six distinct defects into one number. There are six, and the test that
each is real is that each routes to a different owner: `excluded` to the app's own EXCLUSIONS
register and nobody, `not-found` to an acquisition decision, `unbuildable` to `address.js`'s
grammar, `axis-incomplete` to a broken register row, `misclassified` to `match_keys`, `input-missing`
to the bootstrap. Six codes, six owners, no two of which a maintainer would confuse.

**BOTH is the term whose warrant is not obvious, and I am writing it down rather than assuming it.**
BOTH selects the same wave as LITERATURE and the same deliverable form. Its positive work is thin.
Its real work is negative: the inherited authority rule says that where the app and a literature
candidate compete for the same fact the app wins outright and the literature figure is never folded
in as a second BOTH sentence, and without a named BOTH there is no name for the thing that must not
happen. Keep it, and note its falsifier: if 1.11's fixture set cannot produce a natural question that
is genuinely BOTH rather than APP plus an aside, BOTH is the first term to reconsider. That is a
cheaper thing to say now than after nine mechanisms are written against it.

**The counting rule for "fifteen," stated because 1.12 exists.** Fifteen counts the three primary
closed sets: six verdicts, three trace grades, six log outcomes. It does not count the two closed
sub-vocabularies that hang off single terms, six refusal reason codes hanging off the `refused`
grade and four origins hanging off the trace line. Counted the other way the contract holds
twenty-five terms. Both numbers are true and they answer different questions; a reader holds fifteen
and looks a sub-vocabulary up when its parent term fires.

### 1.2 The shelf question, which is the one genuinely open decision

The author's ruling is that an answer must say which shelf it drew from. The candidate mechanisms are
a fourth trace grade, a field on every citation, or something else. **It is a field, and it is
mandatory on every trace line rather than only on citations.** Four arguments, in ascending order of
how much I trust them.

**A fourth grade would put two grades with identical verification semantics into a set whose only job
is to rank verification strength.** A citation into an FA deliverable resolves the way a citation
into a summary resolves: the path exists, the named text is present at it, and neither proves the
file supports the sentence beside it. The check is byte for byte the same check. A grade set is read
as an ordering, and inserting a term that is neither stronger nor weaker than its neighbour makes the
ordering unreadable, at which point the grade discipline is decoration.

**The failure the author named is an identity failure, not a strength failure.** The Oracle returning
a past verdict as though it were a finding in a paper is a reader forming a wrong belief about what
kind of object sits at the end of the pointer. That belongs where the object is named, which is the
locator, not where the strength is named.

**A field composes per claim and a verdict does not.** An answer can legitimately draw one sentence
from a paper and the next from a prior adjudication. As a field that is one verdict with two trace
lines carrying different origins. As a verdict or a grade it is a product set: six verdicts times two
shelves, and a third shelf multiplies again. The field takes a new shelf by adding one token.

**The field is mechanically derivable from the path, which makes it checkable rather than declared.**
The origin token is a function of the resolved locator. A persona cannot get it wrong on purpose or
by accident, and a check reads the locator, computes the origin, and compares it to the one written.
That is the house standard: a control that runs over produced bytes, with a decoy built by mutating
real output. Neither a grade nor a verdict has that property, because both are judgements about the
routing rather than functions of the locator.

Four origins, not two, because writing only `literature` and `findings` leaves the app case
unlabelled, and a hole in a closed set is where the next exception gets parked. The four are `app`,
`literature`, `findings`, `none`.

**The field alone is not sufficient, and the second half of the mechanism is a fixed limit line.** An
origin token tells a machine which shelf was drawn from. It does not tell a reader in a terminal what
a `findings` file is, and the reader is the person the ruling protects. The precedent is in this
project already and it was argued on exactly these grounds: the prototype's LIMIT line exists because
the grade word `resolution-only` means nothing to a reader who does not carry the grade vocabulary,
and The Editor demonstrated rather than asserted that it survives the prohibition. The same argument
applies unchanged one shelf over, so a `findings` trace carries a second fixed limit line, written to
fill The Editor's three slots the way the first one does.

**What this ruling also closes, and this is the part I did not expect.** The Writer found a defect at
0.4 §2.8 and handed it to this sub-step: the corpus states a figure in `g/kWh`, the user asks in
`kWh/kg`, and the converted number has no grade, because `recompute-verified` means recomputed from
the app and the app did not produce it, `resolution-only` proves the file contains the matched topic
words and this number is not in the file, and `refused` is not what happened. He recommended never
converting and flagged that the alternative is a fourth grade.

He is right, and the mechanical reason is stronger than the epistemic one. A trace is a grade and a
locator, and the locator must resolve. `15 to 44 kWh/kg` resolves to nothing: the file does not
contain those bytes, so the resolution check fails against the very file the citation names. A
converted figure is not merely ungraded, it is untraceable by the check that already exists. Grading
it would require a fourth verification mechanism that recomputes the conversion against the summary's
number, which is itself only resolution-grade, so the arithmetic would rest on a foundation the
contract does not treat as computational authority.

And the shelf ruling says where such arithmetic is allowed to live. The FA shelf's entire warrant is
that it carries arithmetic present in no source. That arithmetic is legitimate there because it has a
file, a named author, and a derivation somebody can read and dispute. Inline conversion at answer
time has none of the three. So the rule is one sentence and it unifies both cases: **derived
arithmetic is a deliverable, not a trace.** If the author wants converted units in answers, that is a
request for a shelf entry or an app capability, not a request for a fourth grade.

### 1.3 Orthogonality: they are not orthogonal, and that is better for 1.11

The brief asks whether the six verdicts and the three grades are orthogonal, and says that if they
are, 1.11's fixture matrix is the cross product. They are not, and saying so hands 1.11 more than a
yes would have. Roughly half the cross product is illegal, and an illegal cell is not a gap in the
matrix. It is a decoy, which this project has already ruled is the stronger form of test.

The legality does not fall out of the verdict and the grade directly. It falls out of the origin
field, which is a third reason that field is the right mechanism. Grade legality is a function of
origin. Verdict legality is a function of the multiset of origins present. Two short rules replace an
eighteen-cell table, and the table is then derived rather than stipulated, so 1.11 generates its own
fixture matrix from the two rules instead of copying cells out of a document.

The single most useful consequence: a LITERATURE answer carrying a `recompute-verified` trace is
illegal, and it is illegal for a reason that matters. It means either that a summary's number is
being presented as an app recompute, or that the router answered from a summary a question the app
could have answered. Both are the inherited authority rule being violated, and until now that rule
had no test that was not a hand-written fixture. It is now a two-token check over any produced
answer.

### 1.4 What a refusal costs, moved out of the wave selector

My 0.2 rule was that a refusal must stay cheaper than an answer or the system quietly learns to
answer instead. Stated only in the wave selector it is a cost in one dimension, and a cost that is
cheap in one dimension and expensive in another is arbitrage: a zero-persona refusal that takes two
hundred words of apology to write is not cheap, it is cheap where the timer is and expensive where
the reader is.

So the contract states the cost in all three dimensions the system has: wave, length, retrieval. The
length figure is The Editor's Rc, sixty words excluding trace lines, adopted rather than re-derived,
and it composes with the two-hundred-word answer cap to give the relation The Writer wants without
anything comparing two texts at run time.

### 1.5 The version field earns its place only if three things read it

A version string nobody checks is ceremony, and I would rather cut it than ship a field whose only
function is to look like configuration management. It earns its place here because the failure it
detects is one this project has already paid for. `verify_figure.js` and the thing it verified agreed
in prose for an entire step and disagreed in bytes, because one of them moved and nothing was
watching. This contract is frozen before the corpus exists and nine mechanisms will be written
against it.

So the field ships with three named consumers, one line of work each, and if any of the three is
dropped the field should be dropped with it: the contract carries it, every run log row records the
version it ran under, and 1.11's suite asserts that the version it was written against equals the
version in the contract file. The third is the one that catches the real failure, because it fires on
the next session that edits the contract without touching the suite.

It is a monotone integer rather than a semantic version. Nobody will maintain compatibility semantics
for a one-page contract, and a minor-version bump implying backward compatibility is a promise with
no check behind it, which is the thing this project bans by name.

### 1.6 One correction to my own 0.2

My 0.2 §5.3 said six run log outcomes, all in one column, never collapsed. Two of the six are not
routing outcomes and the column does not hold them.

`REGISTER_FAIL` describes delivery quality, not routing. A run that answered, then failed the
register check twice, then was delivered with its failures listed above it, is not a clean answer,
and counting it `ANSWERED` with a note elsewhere inflates the number that matters most.
`REGISTER_FAIL` therefore takes the column and supersedes `ANSWERED` and `REFUSED`, which makes
`ANSWERED` mean answered clean and makes the clean-delivery rate a division of two counts already in
the log.

`FILLED` is a human judgement about correctness, written onto a row that already carries a machine
outcome. Overwriting loses the denominator the sampling protocol needs. So the log carries two
columns: `outcome`, five values, machine-written, never human-written; and `review`, three values,
human-written, never machine-written. The six named outcomes stand; what changes is that they do not
share a column. The prototype declared in a comment that `FILLED` cannot be self-assigned. A column
no machine writes to makes that structural instead of declared, which is the cheaper and stronger
form of the same rule.

Because the outcome column is single-valued it needs a precedence order, or two implementations will
differ on a run that is both an error and a refusal. It is stated in the contract.

---

## 2. THE DELIVERABLE

Everything between the markers lifts to `oracle/answer_contract.md` unedited.

<!-- BEGIN oracle/answer_contract.md -->

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

<!-- END oracle/answer_contract.md -->

---

## 3. Findings, and requirements this places on other sub-steps

### 3.1 Requirements placed on sub-steps running in parallel or downstream

**On 1.7 (naming, The Engineer), a requirement rather than a preference.** The origin token must be a
total, path-decidable function: every path a trace can name resolves to exactly one of `app`,
`literature`, `findings`, and no path resolves to none or to two. This is the same class of
requirement as the field label placed on the taxonomy at 0.2 §1.2, and for the same reason: the check
that enforces the author's ruling computes the origin from the locator and compares. A naming scheme
where the two shelves can be confused by a path prefix, or where a file can sit in both, disables the
check while every test still passes green. 1.7 states both namespaces; this says what the namespaces
must guarantee. 1.7 runs in parallel with 1.3, so this is a requirement the orchestrator carries, not
a dependency claimed as satisfied.

**On 1.8 (register schema), a constraint frozen here and lived with there.** Register axis members
are `literature` origin only. An FA deliverable may name an axis and may be cited beside one; it may
not be a side of one. If 1.8 finds an axis whose only honest second side is an FA deliverable, that
is a finding for the author about the register, not a licence to relax this.

**On 1.11 (the suite).** The fixture matrix is generated from Rules G and V rather than enumerated by
hand. Rule G is twelve cells with five legal. Rule V is six rows. Every illegal cell is a `--prove`
decoy built by mutating a real produced answer rather than by writing a counterexample, per the house
style Integration established at 0.5. The highest-value single decoy is a real `LITERATURE` answer
with one origin token changed from `literature` to `app`.

**On 1.13 (the check register).** This contract states rules and names no checking mechanism. Six of
its clauses are mechanically checkable over produced bytes and each needs a row: grade-word closure,
origin agreement with the locator, Rule G, Rule V, limit-line presence by origin, and chat-block
substring identity against the deliverable file.

### 3.2 Findings for the author

**F1. Inherited rule 3 survives the FA shelf, and it survives because the shelf is not a grade.** The
rule says a recomputed scalar is recompute-grade and a citation resolving to a real file is
resolution-grade and is never dressed up as more. An FA citation is resolution-grade, exactly like a
summary citation, and the origin field says which object it resolves to without touching the grade
ordering. No revision to the inherited rule is needed or requested.

**F2. Inherited rule 1 has a live edge the plan did not carry, and it is now ruled.** Unit conversion
of a shelf figure produces a number with no resolving locator. Ruled: never convert, quote source
units. Recorded as an accepted limit rather than a defect. If converted units in answers are wanted,
that is a request for an app capability or a shelf entry, and it is the author's to make. It is not a
request for a fourth trace grade and should not be granted as one.

**F3. The prohibition's §9 is a closed list and this contract needs a second fixed limit line.** The
`findings` limit line in §4 is written to P2's form and fills The Editor's three slots, but P2's
content clause reads "unchanged from the prototype" and the prototype has no FA shelf. A closed list
is not a persona's to extend. The Editor or the author ratifies it. If it is refused, the origin field
still ships, and the reader loses the sentence that tells her what a `findings` file is, which is the
half of the mechanism that protects the reader rather than the machine.

**F4. The prototype emits two different trace-line orderings, and one of them is grade-first.**
`Trace (scalar, recompute-verified)` and `Trace (citation, resolution-only)` put kind first;
`Trace (resolution-only, app-stored prose)` puts grade first. A fixed-arity grammar cannot be parsed
across both. §3 freezes kind first, three slots, always. Small, and it is the kind of thing that
becomes expensive once a checker is written against whichever example its author happened to read.

**F5. The run log has no deliverable path, and the sampling protocol cannot run without one.** The
prototype logs timestamp, question, verdict and outcome. SE-11's sampled human read requires reading
answers against their sources, and a row that does not point at the bytes that were delivered cannot
be read. §8 adds the path. This is a defect in an inherited artifact, found at 1.3 rather than at
SE-11 where it would have blocked.

**F6. My own 0.2 §5.3 was wrong about the run log, and §1.6 above says how.** Six outcomes, two
columns, not six outcomes in one.

### 3.3 On C4, since the orchestrator asked whether the correction changes the contract

It does not, and one change was made to be sure it does not.

`verify_report.js` is located, so all four of 1.6's options are live and none of them is blocked by
anything here. What changed is that §7 states the claim-bearing definition in the contract's own words
rather than by reference to that file. The contract is the thing nine mechanisms are written against;
a contract whose central definition lived inside a file whose acquisition is unruled would be silently
unfrozen by option (d), drop it and rewrite the three mechanisms. With the definition written down,
option (d) costs a reimplementation and costs the contract nothing.

The second-order point is 1.6's to rule and is noted rather than ruled. Option (b), extract at
bootstrap, is the only one of the four under which the extracted file and the upstream block cannot
disagree in bytes while agreeing in prose, because it is the only one where the extraction runs every
time and fails loudly when the block moves. That is the failure `verify_figure.js` recorded and paid
for. Options (a) and (c) both need the "what happens when the upstream block changes" clause The
Manager already required; option (b) answers it by construction.

### 3.4 What this contract does not do

It states rules and closes vocabularies. It builds nothing and checks nothing. Six of its clauses are
mechanically checkable and 1.13 carries them. The rest, in particular whether a shelf file supports
the sentence beside it and whether an answer should have been a refusal, are not reachable by any
check, and are what the `review` column and the sampled human read exist for. A contract implying
otherwise would be the epistemic theater Objective 4 bans, inside the document that defines the ban.

---

*The Software Engineer, sub-step 1.3, Group 1.*
