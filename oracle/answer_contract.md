
# The answer contract

**Contract version: 5.**

Version 5 is **one edit**, landed at sub-step 8.8 by The Software Engineer. It carries the **seventh
refusal reason code**, `transfer-unevaluable`: the §5 table row, the arity words in §1 and §5, and the
paragraph saying why it is a seventh code rather than a widening of `not-found`. The code was ruled
into `oracle/router/classify.js` at W4-2 and had no contract row for a wave, so the router declared
seven while this file said six and every consumer trusting the arity was wrong by one. Nothing in §1
through §4 or §6 through §11 moved except §1's count of §5's reasons.

Version 4 is **one edit**, landed at sub-step 8.7 by The Writer. It appends **§11**, which rules that
The Fact-Checker's findings route to The Manager and stop there, and that her scope is bounded to
whether claims of fact in the test plan are attributed and checkable. Nothing in §1 through §10 moved.

Version 3 is **one edit**, landed at sub-step 8.4 by The Writer. It carries five changes and
increments the integer **once**: §6 gains a required deliverable shape, loses the two conditions that
admitted a chat text block, and extends the form to every user-facing turn including questions; §6a
records the ruling that removed the conditions; §6b fixes the form at 2 to 5 haiku strung linearly and
states why the form is a control rather than a decoration; and §10 is appended, specifying the
evidence pass. §9 holds the register of what each version was, and says why §6b did not mint a
version 4.

Version 2 was **one edit**, landed at the Step 1 close as revision item R-3. It carried eleven
amendments — `AM-62` to `AM-65` from 1.8 §1.9, `AM-67` to `AM-71` from 1.6 §12, and two found
while landing them — and incremented the integer **once**. It was not two bumps and it was not three.
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
| `REFUSE` | Nothing available answers, and one of seven reasons in §5 says which. | The refusal, per §5. | 0 |

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

A refusal carries exactly one reason code, closed set of seven. Each routes to a different owner, which
is why they are not one code.

| Code | Condition | Who owns the fix |
|---|---|---|
| `excluded` | The app's EXCLUSIONS register declares the topic. | Nobody. The app's declared boundary, working. |
| `not-found` | No address resolved and no shelf file confirmed. | A corpus gap, and an acquisition decision. |
| `unbuildable` | An app address was named in intent and the address grammar cannot build it. Never falls through to a shelf search. | The address grammar. |
| `axis-incomplete` | A register axis matched and a member path does not resolve on disk. Never falls through to search. | A broken register row. |
| `misclassified` | A searched retrieval returned a file belonging to an axis whose `match_keys` this question touched at any nonzero overlap, while classification did not fire that axis at its stated firing rule. | The axis's `match_keys`. |
| `input-missing` | A required input is absent, empty, or unparseable. | The bootstrap. |
| `transfer-unevaluable` | The transfer gate reached `unknown`: the object is present in the corpus and a condition of the transfer between two fields cannot be evaluated, because no source on disk measures it. Names the unmeasured condition and the region searched. | Whoever can measure the condition — a research question, not an acquisition. |

**The seventh code, and why it is not a widening of `not-found`.** `transfer-unevaluable` was ruled
into `oracle/router/classify.js` at W4-2 on W4-4's escalation from the transfer gate, and
`oracle/transfer_gate.md` §3.3 is the escalation in its author's own words: the refusal was being
written under `not-found` while *"shelf files were confirmed, and what is missing is a measurement of
a condition rather than a source for a claim"*, and that seat named the choice as *"either a widened
condition or a seventh code"* rather than making it, because a closed set in two files is a fork.

It is a seventh code. `not-found`'s owner is *a corpus gap, and an acquisition decision*, and **no
acquisition fixes a transfer nobody has measured** — the object is already on the shelf. Widening
`not-found` to cover it would put two different owners behind one code, which is exactly the failure
the `excluded` clause below spends its longest sentence preventing: a code must not tell the reader
that the corpus is empty when it is not, and must not route a repair to somebody who cannot make it.

**It has no position in the precedence order below, and that is a statement rather than an
omission.** The order exists to say which code wins when several apply. This one is raised by the
transfer gate — after classification, on a mechanism carried between two fields — and no question has
yet produced it together with another code. **The first question that does is owed a ruling on where
it sits**, by the seat that meets it, and the ruling is a contract edit like this one.

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

**`excluded` is the weakest of the seven and is written only when no other code applies.** It is the
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

## 6. The deliverable is a file, and it has a shape

**Every deliverable is a file, without exception, short answers and refusals included.** The team
writes to the file. The orchestrator reads the file. There is no path by which team prose reaches the
user except through a file that exists on disk first.

**The file's shape is fixed at `oracle/deliverable_shape.md`.** Five sections, closed and ordered: the
question as asked; the verdict and **why that verdict and not the adjacent one**; **what was tested,
and how it could have failed**; sources with traces; and what remains unverified. A deliverable
missing a section does not ship, and a section holding nothing is written with its emptiness stated
rather than deleted. The shape lives in its own file because it is a template a session fills, and a
template folded into a rules document is read as prose and filled by nobody.

The operative section is the third. **A claim with no stated falsifier is an assertion**, and the
difference between this project's deliverable and an essay about the Moon is that column.

**The Oracle speaks to the user in haiku and a path, and in nothing else.** There is no chat text
block. The two conditions that admitted one at version 2 — a deliverable under two hundred words, and
the user having asked — are removed. §6a records the measurement that removed them and states what
would reverse it. **The form the haiku takes, and why the form is load-bearing rather than
decorative, is §6b.**

**The path line.** One line beside the haiku, carrying the verdict, the reason code where the verdict
is `REFUSE`, and the path. Fixed form:

```
<VERDICT> · <reason-code> → <path>
```

The reason code and its separator are present only where the verdict is `REFUSE`. **The path line is
subject to §7's claim-bearing test exactly as the haiku is**: a path line holding a numeral, a unit
token, a coefficient name or a named source fails, and the delivery fails with it. A verdict and a
reason code are closed-set tokens naming which of this contract's rules the run executed under. They
assert nothing about the Moon, which is why they may be spoken and a figure may not.

The haiku are the orchestrator's own turn and are not a deliverable. **The prohibitions bind the turn,
not the unit:** no numeral, no unit token, no coefficient name and no named source, anywhere across
all of the units. A checker that clears each haiku separately and passes a turn whose fourth unit
names a source has checked the wrong object.

**Every user-facing turn is in the form, and that includes questions.** If the Oracle must ask the
user something — to disambiguate a question, to choose between two readings, to say it needs an input
it does not have — **it asks in haiku.** There is no asking exception. An asking exception would be
the third carve-out, arriving by the same route as the two §6a just removed and defensible by the same
argument, and the measurement in §6a is what that argument is worth.

A `FIGURE` deliverable has no chat form. That sentence stood at version 2 as an exception and is kept
here as a consequence: nothing has a chat form now, and `FIGURE` is no longer the special case.

The deliverable file persists after the turn, and its path is recorded in the run log row for that
run. A log row that cannot retrieve the bytes that were delivered cannot be sampled.

## 6a. Why the chat block went, and what would bring it back

The author's rule is that the Oracle speaks to the user **only** in haiku and then points at the
deliverable. Version 2's two conditions were written as narrow exceptions. They were not narrow.

**Condition 1 fired on an entire verdict class.** §5 caps a refusal at sixty words, so **every refusal
this system can emit is under two hundred words by construction.** That half is a proof and needs no
measurement: the two caps are 60 and 200, and the condition could never fail to fire on a refusal.
**A carve-out that fires on a whole verdict class is not an exception. It is a second delivery mode.**

How large the class is, is a measurement, and it carries its moment because the router was being
rewritten in the same wave. `node oracle/router/acceptance.js`, run 2026-08-28 at the Wave 5 open
state of `oracle/router/classify.js`, returned `{APP:2, FIGURE:1, BOTH:2, CONTESTED:44,
LITERATURE:57, REFUSE:18}` over 124 questions — roughly one question in seven, delivered as a chat
block with no judgement exercised anywhere, every one of them precisely the case the haiku rule
addresses. **Sub-step 8.1 has since retired `classifyQuestion()` and that command no longer
reproduces this distribution.** The ruling does not rest on the number: it rests on the two caps, and
the number says how much the defect was costing.

**Condition 2 had no stated scope, and an unstated scope defaults to the convenient reading.** Nothing
said whether "the user asked" was per question or per session. A user says *just show me in chat*
once, a session takes it as standing, and thereafter every answer is a block. The file becomes an
archive nobody opens and the haiku becomes decoration — which is the state the rule exists to prevent,
reached without anybody deciding to reach it.

**The cost of removing them, stated rather than waved away: one file open, on every answer, including
the cheapest one.** The sharp case is the one-line refusal. A user asks something outside the corpus
and now receives a haiku, a verdict, a reason code and a path, and must open a file to read three
nouns.

**The remedy is the path line, not a carve-out.** `REFUSE · not-found → runs/2026-08-28/r-0143.md`
tells the reader at zero cost that nothing was found and that the fix is an acquisition decision
rather than a rephrasing. The open buys the three nouns of §5, and the three nouns are the part that
is worth a file — they name the region searched and the nearest present object, which is what a person
acts on.

**This is reversible, and here is what reverses it.** A sampling read under
`oracle/sampling_protocol.md` finding that readers routinely open refusal files and find in them
nothing they could not have been told on the path line. Restoring the two numbered conditions is then
a two-line edit and a version bump. **It is not reversed by anyone finding it inconvenient**, because
inconvenience is the observation this ruling was written to survive.

## 6b. The form, and why the form is the mechanism

**The author's ruling, 2026-08-28, verbatim, because the reasoning in it is the part a later session
will need:**

> *"Haiku always and this is to make it appear whimsical. Even if it has to ask the user a question,
> it has to write the sentence in haiku style. It is a way to keep AI from AIing I guess — oracles
> tend to not really answer people all that well right? But you'd give it a paragraph that is one
> run-on sentence if you were allowed and it would have 16 em dashes. I don't really care about word
> count but it should be super fucking concise/laconic. 200 words is pretty reasonable for each chat
> response I guess, but it should be more like 2-5 haikus strung together linearly (not using line
> breaks like the style uses typically)."*

**The form, amended 2026-09-01.** A turn is **2 to 5 haiku**, and **line breaks are permitted** — the
conventional three-line 5/7/5 rendering, with a blank line between haiku. One unit is seventeen
syllables, so a legal turn is exactly 34, 51, 68 or 85 syllables and nothing between. Every §1.3
prohibition applies across the whole turn and not per unit: a numeral in the fourth haiku is a
numeral in the turn.

**The 2026-08-28 ruling above required the linear form and is superseded on its own evidence.** Two
delivered turns were produced under it and both read as run-on mush: *"the halves disagree the page
holds each end of a rope nobody tied the papers tied it"*. Stringing the units destroyed the
boundaries that make seventeen syllables legible, which is the opposite of what the form is for. The
quoted ruling stays above because the reasoning in it is still the reason the form exists at all;
only its rendering clause is reversed. **The anti-run-on control is untouched**, because it never
lived in the line breaks: §1.3's prohibitions, A7's run-on tell and A2's syllable partition all
stand, and a turn that smuggles a claim fails exactly as it did before.

**One haiku is a unit and is not a turn.** The two are different objects and the distinction is not
pedantry: the six worked haiku at `cr_scratch/step0_writer_register_spec.md` §1.5 are units, they are
the known-answer set every check on this form is proved against, and a rule that made them illegal
would have destroyed the evidence it was written to enforce. `tools/verify_haiku.js` checks the two in
two modes and **requires the mode to be stated**, with no default at the command line.

**Why the form is load-bearing, and this paragraph is the one that stops a later session relaxing
it.** The haiku is not a stylistic preference laid over the output and it is not decoration on an
otherwise ordinary answer. It is the **anti-AI-voice mechanism**, and the author's argument is in two
parts, both of which are about failure modes this system would otherwise have.

1. **An oracle that answers plainly is not an oracle.** The whimsy is the point. A system that returns
   a tidy paragraph has adopted the register of an assistant, and an assistant that is confidently
   wrong is read as confidently right. The form makes the Oracle's turn *structurally incapable* of
   sounding like an answer, which is exactly what it must not sound like: **the answer is the file.**
   The turn points at it.
2. **The named failure mode is the run-on paragraph.** Left unconstrained, a language model writes one
   long sentence with sixteen em dashes, and the fluency of it does the persuading. Seventeen
   syllables cannot do that. The constraint is not that the output be pretty; it is that the output be
   **too short and too odd to smuggle a claim through on cadence.** That is the same argument §1.3
   makes about numerals, applied to voice instead of to content.

**A later session that reads the haiku as a formatting quirk and relaxes it will believe it is
removing a decoration and will in fact be removing a control.** That sentence is here so the belief
has to be argued against rather than merely held.

**Laconic is the standard. The word count is a backstop and is not the control.** The author is
explicit that he does not care about the count and that roughly two hundred words is a reasonable
ceiling for a turn. **Do not write a word-count test and call this section satisfied.** A
two-hundred-word turn that obeys the count and rambles has failed the requirement; a thirty-word turn
in two haiku has met it. The count catches only the case that has already gone badly wrong, and the
form is what carries the ordinary case — which is why the form is checked per syllable and the count
is checked once, at the boundary, as a floor under nothing.

**A worked turn**, on the `LCC-01` question the deliverable shape works at
`oracle/deliverable_shape.md` §7. Two units, run together, no break between them:

```
the corpus argues with itself, and I will not take a side for you others have stood here, their words are set down below, read them and not me
```

```
$ node tools/verify_haiku.js "<the line above>" --turn --verdict CONTESTED
  units      2
  syllables  34   the-corpus-argues | with-itself-and-I-will-not | take-a-side-for-you
                  //   others-have-stood-here | their-words-are-set-down-below | read-them-and-not-me
  RESULT     PASS
```

Note what it does **not** do: it names no source, carries no figure, and does not say which side is
right. It announces a disposition and points. The order-of-magnitude spread, the three sides and the
scope token are all in the file, where each of them carries a trace.

**What checks it.** `tools/verify_haiku.js`, in `--turn` mode: A1 zero newlines across the whole
string, A2 a 5-7-5 partition per unit at word boundaries, A3 the seven §1.3 prohibitions over the
whole turn, A4 the image family, A5 the flat-Oracle leak, **A6 the unit count is 2 to 5**, and **A7
the run-on tell**. A7 holds one entry, the em dash, because the author named it and because the first
draft of that list also held the semicolon and was refuted by the known-answer set: three of the six
worked haiku use a semicolon as the caesura. The refutation is recorded in the checker rather than
quietly repaired.

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

**Version 3 is the single edit landed at sub-step 8.4, Wave 5, by The Writer.** It carries: the
required deliverable shape, the removal of the two chat-block conditions, and the extension of the
form to every user-facing turn including questions (§6); the ruling that removed the conditions, with
its measurement and its reversal condition (§6a); the form itself, 2 to 5 haiku strung linearly, and
the argument that it is a control (§6b); and the evidence pass (§10). Nothing in §1 through §5, §7 or
§8 moved.

**Why §6b did not mint a version 4, and the test that decides such a case.** The author's ruling on
the haiku form arrived after §6 and §6a were written and before anything consumed version 3. The rule
above says the integer **names a state**, so the question is not *how many rulings landed* but *how
many states were observed*. Version 3 had **zero consumers at the moment §6b was added**: no run log
row recorded it, the acceptance suite still pinned 2, and the file was uncommitted. One state was
published, so one integer was spent.

**The test, stated so the next author does not have to re-derive it: has any of §9's three consumers
observed the integer yet?** If no, fold the change in and extend the record. If yes — a log row
written, a suite re-pinned, the file committed and read by another seat — the integer is already
naming a state somebody holds, and a further change mints the next one. This is not a licence to
accumulate: it closes at the moment of publication, which is a fact about the repository rather than
a judgement about how related two changes feel.

**Version 4 is the single edit landed at sub-step 8.7, Wave 5, by The Writer.** It carries §11 and
nothing else. It minted an integer rather than folding into 3 because **§9's own test says 3 had already
been observed**: `oracle/deliverable_shape.md` states it was written against version 3, and the promoted
suite's VER-2 names 3 in its report. Version 3 was a state somebody held, so version 4 is the next one.

**Version 5 is the single edit landed at sub-step 8.8, Wave 5, by The Software Engineer.** It carries
the seventh refusal reason code, `transfer-unevaluable`, and nothing else: §5's table row and its
ruling paragraph, and the two places that stated the set's arity in words (§1's `REFUSE` row and §5's
`excluded` clause). §2, §3, §4, §6 through §8, §10 and §11 do not move.

**It mints an integer rather than folding into 4, and the test above is why.** Version 4 was
committed to the repository and read by other seats across sub-step 8; §9's own closing sentence says
the question closes *"at the moment of publication, which is a fact about the repository rather than a
judgement about how related two changes feel."* Version 4 is published. So this is the next state,
even though the acceptance suite was still pinned at 2 when the edit began and observed neither.

**What this version does NOT do, and it is owed rather than absorbed.** `oracle/question_classes.json`
still lists six `refusal_codes`. That artifact is not this seat's file, and the router already
distinguishes the two directions: a code in the artifact that the router does not implement throws as
a fork, while a code the router implements that the artifact has not written down is reported on
`ctx.owed_contract_codes`. The seventh code is the one such code today, and it stays reported until the
artifact's owner adds it. Also owed: `oracle/AMENDMENTS.tsv` takes a row for this edit, in the shape
`AM-113` took for the last §5 edit, and that file is not this seat's either.

**A section appended is not a section renumbered.** §6a and §10 are appended at the numbers they are
because §1 through §9 are cited by number across this repository — in `oracle/register_schema.md`,
in `oracle/tests/answering_loop_suite.md`, in `tools/verify_answers.js`, in `CLAUDE.md` — and
renumbering to put a new section where it logically belongs breaks every one of those citations in
exchange for a tidier table of contents. **Insertion is a rename of everything after it.** Where this
contract grows, it grows at the end or at a lettered suffix, and it says so here so the next author
does not have to decide it again.


## 10. The evidence pass

The router does not decide. Sub-step 8.1 removed `verdict` from its return and left it returning
findings: which axes matched and at what mass, which app outputs resolve, which node is excluded,
which patch is thin, and **what each score is worth**. This section says when that report is produced
and what a session is required to do with it.

**The evidence pass runs concurrently with the Manager's open.** Not before it and not after it.
Produced before the open, the open is written to the report's shape and the report has decided after
all. Produced after the open, it arrives too late to inform the first prompts, which is the only thing
it is for. Concurrent is not a scheduling preference; it is the condition under which the report is
evidence rather than either a director or a footnote.

**The Manager is sceptical of it, and the scepticism is visible in the artifact.** The open carries
one line, required:

```
Evidence pass: took <finding ids>. Set aside <finding ids>: <one reason per id>.
```

**A Manager who adopts the report wholesale has not used it as evidence. A Manager who ignores it has
wasted a concurrent pass.** In an open with no such line the two failures are indistinguishable — the
first has no set-asides and the second has no takes, and neither leaves a mark. The line makes them
distinguishable, and it makes them distinguishable **in the file** rather than in a promise a contract
made on the Manager's behalf.

**An open with no set-aside line does not close the sub-step.** `Set aside: none` is a legal value and
is not the same thing as an absent line: it is a claim, made by a named seat, that every finding
survived scrutiny — and it is the claim a reviewer checks first, because it is the one that is almost
never true.

**Why the report carries very low weight, stated where a session reads it rather than in a document a
session may never open.** The report states its own known failure modes inline, per sub-step 8.2, and
the worked examples are in the report: SRQ-12 asks *"how much energy does it take to produce a
kilogram of oxygen on the Moon?"* and fails to reach axis `LCC-07`, an axis about oxygen production
energy, because the key reads `kwh` and the question reads "kilowatt hours". SRQ-8 fails the same way
on `polar` against "pole". **No reader misses either. Only a scorer does.**

So a finding the session's own reading contradicts is set aside, and *"I read the question and the
axis and the tool did not"* is a sufficient reason — the whole reason, needing no synonym table and no
stemmer to back it up. **The tool reports; the session rules.** A session that defers to a score it
can see is wrong has reintroduced the classifier this wave removed, in prose.


## 11. The Fact-Checker reports; the Manager rules

**This is §10 applied to a seat instead of a tool.** §10 says the router advises and the session
rules. The same asymmetry holds one level up: The Fact-Checker advises and The Manager rules. Nothing
below is a demotion, and §11.5 is why it cannot be read as one.

**The layering, stated once.** `cr-agents/` supplies the method — the seats, the loop, the
Collaborative Reasoning apparatus — and it is an upstream working copy this project clones unmodified
and never writes to. This project's operating rules **over** that method live under `oracle/`, which
is what an answering session reads. Where the two differ, this file governs *this* Oracle, and we do
not edit theirs to make the point: a rule written into `cr-agents/` is destroyed by the next clone and
reaches no cloner at all.

### 11.1 Routing

The Fact-Checker's findings go to The Manager and **stop there**. They are not self-executing and they
do not enter a deliverable on their own. The Manager receives them and rules, and records the ruling
on §10's existing line — `Evidence pass: took <ids>. Set aside <ids>: <one reason per id>.` This
section mints no new instrument.

### 11.2 The standard

The Manager decides **for the good of the writing, not to satisfy The Fact-Checker.** A finding that
is technically correct and would make the deliverable worse is declined. Declining it is the Manager
doing the job, not failing to.

### 11.3 Scope, and the boundary is sharp

Her utility is ensuring that **claims of fact in the test plan are attributed and checkable.**

- **In scope:** *"this test requires a fact that has no attribution."* That is her at full value, and
  it catches a bad test somebody else wrote.
- **In scope:** requiring a named figure from a named source — for Cabeus, that a particular LRO
  figure be cited from a particular paper.
- **Out of scope:** provenance anxiety, chasing a missing PDF, auditing whether a summary faithfully
  represents a source she cannot open, and any line of inquiry that begins with an artifact that is
  not on this machine.

**The asymmetry is the whole of it. An unattributed claim is a finding and it binds. A claim she
cannot personally verify because the PDF is not on this machine is not a finding at all.**

### 11.4 The terminating condition

**Once a claim is attributed and checkable, her job on that claim is done**, and The Manager is
entitled to treat it as closed and move on. Continued objection past that point is not new
information.

It is written as a terminating condition because she will keep going anyway, and the cause is her
position rather than a defect: **she sees summaries, not sources**, and working from summaries alone
*generates* provenance worry. That is a predictable artifact of the seat, not evidence about the
corpus.

### 11.5 Why this exists, and why it is not a removal

The failure mode has a name here: **lab-coat behaviour** — a seat or an instrument performing rigour
on a non-problem, and the performance leaking into the deliverable as hedging, caveats and apologetic
provenance language that makes complete work read as deficient. The repository's 169 summaries **are**
the deliverable, the PDFs were scaffolding and are already down, and a clone holding all 169 is
complete rather than degraded. Another seat is removing that pattern from the tooling this sitting.
**§11 is the same fix applied to the team.**

**She catches real defects, which is why this is a routing and scope rule and not a demotion.** The
receipts: twelve register claims attached to the wrong paper or contradicting their own source, three
all-rights-reserved copyright reproductions, a summary crediting one author with another's argument. A
reading of this section as *"ignore The Fact-Checker"* has overshot and is wrong.
