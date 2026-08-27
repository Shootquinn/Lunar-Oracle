# Step 0.4: the standing prohibition on epistemic theater, and an audit of the register specification

**Persona:** The Editor
**Objective covered:** the hard boundary in the design intent ("no epistemic theater, no performative
rigor, no narration of the document's own honesty")
**Feeds:** SE-8 (`verify_register.js` B2's closed list), LOOP-6 (composition), SR-6 (the
three-named-facts assertion), and the persona context recipes for every team spawn.
**Reviewed:** `cr_scratch/step0_writer_register_spec.md` (The Writer, 0.4), against
`cr-agents/supplements/signs_of_ai_writing.md` and the design intent.

Two parts. Part I audits The Writer's specification. Part II is the prohibition, which is the
deliverable that matters.

---

# PART I: audit of the register specification

## 1. Verdict

The cleanest document I have audited in this project. Categories 1, 2, 3, 5, 6 and 7 are effectively
empty. Zero AI vocabulary in the author's own voice; the three raw hits (`It is worth noting`,
`Importantly`, `robust`) are two quoted prohibition examples and one econometric term of art. Zero
title-case headings across 33 headings. Zero curly quotes, zero emoji, zero dangling participle tails
of the "ensuring optimal performance" kind, zero rhetorical questions, zero vague attributions. The
copula test runs the right way: 305 instances of `is`/`are` in 7,668 words is 4.0 percent, well above
the human baseline rather than the documented decrease.

The document has one real problem and it is Category 8, which is the category it was written to
prevent. Sixteen instances, all of one species: the author certifying his own work rather than doing
it. `The cost is real and I am stating it rather than carving an exception`. `This is the best one in
the set`. `Syllable counts are stated so they are checkable rather than asserted`. `and the fixed
version is more honest anyway`. `A defect found while writing §2.6, and it is not small`.

That last one is the diagnostic. A defect stated with its consequence does not need a heading telling
the reader it is not small. The pattern is 8.1 throughout, with two instances of 8.2 and three of 8.3.
None is a joke and none is puffery. Each is the author standing next to his own sentence and vouching
for it.

The second finding is a density number rather than a marker: 24 em dashes in 7,539 words, about 1.6
per 500-word page. That sits inside the human range in the reference (0 to 2 per page), so as a
detection signal it is clean. Rule 12 is not a detection rule; it is unconditional, and every one of
the 24 is clause-joining or appositive. None is a compound word or a number range.

## 2. Marker count by category

| Category | Count | Severity | Note |
|---|---|---|---|
| 8 Performative epistemics | **16** | BLOCKING | 11 x 8.1, 2 x 8.2, 3 x 8.3. All cut, listed in §3. |
| 4.1 Dash as punctuation | **24** | IMPORTANT | Density is human-normal. Rule 12 is not a density rule. Flagged in §4, not applied. |
| 3.3 Inline-header vertical lists | 71 | NOTE | `**Bold claim.** Explanation` at high density. Defensible in a specification; worth knowing it is the ChatGPT default shape. |
| 2.4 Rule of three | 0 | none | Every announced count checked against its list. All correct, including the "three, plus one separate constraint" in §1.2 and "five, plus one open question" in §5. |
| 2.1 AI vocabulary | 0 | none | Three raw hits, all legitimate. |
| 2.2 Copula avoidance | 0 | none | Runs the opposite way. |
| 2.5 Elegant variation | 0 | none | `deliverable`, `haiku`, `trace`, `verdict` hold their terms throughout. |
| 1.1 / 1.2 / 1.3 Inflation, puffery, superficial analysis | 0 | none | |
| 2.3 Negative parallelism | 0 | none | The `not X but Y` constructions present are definitional contrasts, each carrying two named objects. |
| 2.6 False ranges | 0 | none | |
| 3.1 Title case headings | 0 | none | |
| 3.4 Challenges sandwich | 0 | none | §5 lists five defects and ends on a sixth. No closing optimism. |
| 3.5 Unnecessary tables | 0 | none | Six tables, each carrying data prose could not hold. |
| 4.2 Curly quotes | 0 | none | |
| 4.3 Emoji | 0 | none | |
| 5.1 Vague attribution | 0 | none | Every attribution names a persona, a step ID, or a file on disk. |
| 6.x ChatGPT artifacts | 0 | none | |
| 7.x Composite patterns | 0 | none | |

## 3. The sixteen cuts, made

Applied to `cr_scratch/step0_writer_register_spec.md`. 129 words removed, no claim removed. Every one
is a subtraction; nothing was rewritten. Listed so nothing is silent.

| § | Cut | Class |
|---|---|---|
| 1.2 | `worth stating because it is` (in "One practical constraint worth stating because...") | 8.3 |
| 1.3.1 | `The cost is real and I am stating it rather than carving an exception:` becomes `The cost:` | 8.1 |
| 1.4 | heading `, which is the one that matters` | 8.4 |
| 1.5 | `Syllable counts are stated so they are checkable rather than asserted.` | 8.1 |
| 1.5 | `This is the best one in the set, and it is the one whose posture to copy.` becomes `This is the posture to copy.` | 8.1 |
| 1.5 | `which is better poetry and` | 8.1 |
| 1.5 | `and the fixed version is more honest anyway, because` (sentence split) | 8.1 |
| 2.1 | `That last clause matters more than it looks, and` | 8.3 |
| 2.5 | `, and the fourth is the one that keeps the system honest` | 8.4 |
| 2.6 | `It is not a disclaimer and` | 8.1 |
| 2.6 | `and it earns its place` (sentence split) | 8.1 |
| 2.8 | heading `, and it is not small` | 8.3 |
| 2.8 | `and the case is not exotic` becomes `and` | 8.1 |
| 2.8 | `My recommendation is the conservative one:` becomes `My recommendation:` | 8.1 |
| 3.4 | `rather than decorative` | 8.1 |
| 3.5.3 | `This is the point of the whole rule.` | 8.4 |
| 5 | `Four were found by writing the examples rather than by reasoning about the plan.` | 8.2, duplicate of the same claim at §0 |

The §0 statement of that last claim stands. Stated once it is provenance for the findings. Stated
twice it is a method boasting.

## 4. Flagged, not applied: the 24 dashes

Rule 12 says eliminate rather than flag, but every one of these fixes is a substitution rather than a
subtraction, and my brief here confines me to subtractions. The classification and the prescribed
replacement, by line, so the pass is one edit session:

| Class | Lines | Count | Replacement |
|---|---|---|---|
| Paired parenthetical | 10, 34/35, 203, 227, 439/440, 450/451, 561, 606, 626/627, 749/750 | 9 pairs | Parentheses, or a period plus new sentence where the aside is a full clause. Rule 12(d) then 12(a). |
| Single, appositive | 113, 286, 332, 334, 400, 496, 728 | 7 | Colon where it introduces an explanation (12e); comma where it is doing a comma's job (12c). |
| Single, clause-joining | 265 | 1 | Colon. |
| Title separator | 1 | 1 | Colon, or a plain space. |

## 5. Where I disagree with The Writer

Three disagreements and one recommendation. None of them undoes him; two of them tighten a rule he
was right to write.

**D1. His §4.3 checkable form is too strong, and his own best example violates it.** He writes: *every
sentence in a deliverable carries a fact, a trace, or a refusal. A sentence carrying none of those is
whimsy however plain it sounds.* But his §2.6 contested deliverable ends on `This corpus carries both
sides of this axis and does not adjudicate between them`, which carries no fact about the world, no
trace, and no refusal. He knows this, and he defends it in the paragraph below the example as a
sentence that earns its place. So the rule as written fails his best case and gets patched by author's
judgement, which is exactly what the rule was written to remove.

The repair is one clause: **every deliverable sentence carries a fact the reader cannot get from any
other line of the deliverable.** That admits the register invariant, the LIMIT line, the scope
statement and the refusal reason on the same principle rather than by exception. It still excludes
`A cautious answer, then`. Part II builds on the repaired form.

**D2. His §1.4 image-family test is a judgement dressed as a lookup.** He says the check is *that the
haiku's governing noun is drawn from the family its verdict selected. That is a word-list membership
test, not a judgement about tone.* It is not. Identifying which noun governs a line of English is a
parse, and a wrong parse fails a correct haiku, which is how a check gets switched off. The honest
mechanized form is weaker and is still worth having: **the haiku contains at least one token from its
verdict's family and zero tokens from that verdict's forbidden column.** Both halves are set
membership over the whole line. The forbidden column is the half with teeth, because the failure he is
chasing (a refusal that reads like an arrival) is caught by the presence of `search`, `complete`,
`answer` or `found` in a REFUSE turn, and that needs no parse at all.

**D3. His §4.5 question 5 is a counterfactual, not a check.** *Is every refusal shorter than the
answer it replaced would have been?* compares against a document that was never written. Nobody can
run that, by eye or otherwise. Replace it with an absolute cap: **a refusal is at most sixty words
excluding trace lines.** His two worked refusals are 42 and 54 words, so the cap is calibrated to his
own examples with roughly ten percent headroom. The number is the author's to set. The form is the
point, because an absolute cap is a check and a counterfactual is a wish.

**A recommendation, not a disagreement.** He ships `LIMIT:` and `Trace (grade):` as prefixed lines,
which is why both are trivially countable. The scope statement and the register invariant are the same
class of thing and sit unmarked in his prose. Giving them prefixes (`SCOPE:` and `AXIS:`) makes them
countable too, and drops the answer prose to zero sentences whose subject is the document. The cost is
real and he should weigh it: his §2.6 defence of the invariant rests on it reading as part of the
answer rather than as apparatus, and a prefix moves it into the apparatus. His call. What I need from
the decision is stated at M6 below.

**Credit where it is owed.** The paragraph under his contested example is the sharpest statement of the
theater/substance distinction anywhere in this project: *It says what the corpus holds. It does not say
that the Oracle is being careful.* Part II generalizes that sentence. His ad-hoc exception becomes P5,
a named member of a closed list, which is the same ruling with a mechanism under it.

---

# PART II: the standing prohibition

## 6. Scope

This governs **team deliverables**: the answer block, the answer file, and the refusal. Every byte the
user reads that the team wrote.

It does not govern specifications, run logs, agent handoffs in `cr_scratch/`, or the Oracle's own
register, which have different readers and are allowed to reason about themselves. A specification
that states the limits of its own checks is doing its job. A deliverable that states the limits of its
own care is not.

## 7. The prohibition

> **A deliverable sentence must survive its own deletion.**
>
> Delete it. If the deliverable now asserts something false, unsupported, or wider than its evidence,
> put it back: it was a caveat. If the only loss is word count, leave it out: it was theater.
>
> **A deliverable may speak about itself only in the five forms named in §9, each of which names an
> object rather than a virtue.**
>
> **Rigor is a fact you add. It is never a qualification you add.**

Four sentences. The first is the test, the second is how to run it, the third is the closed list that
keeps the test from eating the honest parts, and the fourth is the principle a persona can hold in
working memory while writing.

## 8. The test that separates theater from substance

The deletion test in §7 decides the clear cases. The hard case is the sentence that limits a claim,
because `this estimate is uncertain` can be either. Run three slots against it.

Any sentence that limits, qualifies, or hedges a claim must fill all three:

1. **Which.** The named input, figure, source, or boundary that is in doubt. A named thing, not a
   category. `the recovery fraction`, not `some of the assumptions`.
2. **How much.** A magnitude, a bound, a range, or the named reason no bound exists.
3. **So what.** What the doubt does to the conclusion. Which number it moves, in which direction, or
   which conclusion it flips.

**Three slots filled: substance. Ship it.**
**Zero slots filled: theater. Cut it.**
**One or two filled: unfinished. Return it to the persona who wrote it.**

The third state is what keeps this rule honest, and it is why the prohibition is not a
delete-everything-that-hedges rule. A half-named limit is a real limit that has not been written yet.
Cutting it deletes a genuine constraint. Shipping it hands the reader reassurance in place of
information. Neither is acceptable, so it goes back.

**Worked on one sentence, four times:**

| Version | Slots | Verdict |
|---|---|---|
| `The energy figure is uncertain.` | 0 | Theater. Cut. |
| `The energy figure is uncertain because the recovery fraction varies.` | 1 (which) | Unfinished. Return. |
| `The energy figure varies with the 50 to 73 percent recovery fraction.` | 2 (which, how much) | Unfinished. Return. |
| `Recovery ran 50 to 73 percent across LUWEX campaigns, which spans nearly the whole 22.88 to 66.33 g/kWh range; the low end is a bad-recovery run rather than a different process.` | 3 | Substance. Ship. |

**The confirmation test on the finished version: it no longer reads as a caveat.** It reads as a second
finding. That is what filling the slots does, and it is the fastest way to check your own work. If a
qualification still reads like an apology after you have filled all three slots, you did not fill them;
you decorated them.

**Relation to R5.** The Space Resources Engineer's rule (any quantitative ISRU figure names system
boundary, scale, and maturity) is this test's instance for a figure. His three facts are not the same
three as mine and I am not going to force the mapping. What both rules share is the shape: **name three
things about the object, rather than attach three qualifiers to the sentence.** R5 fixes the three for
an ISRU figure and is therefore mechanizable at SR-6. §8 fixes them for a caveat and is not, for the
reason at N2.

## 9. The five permitted self-statements

A deliverable sentence whose grammatical subject is the deliverable, the corpus, the search, the
Oracle, or the team is theater unless it is one of these five. This list is closed. Adding to it is an
author's decision, not a persona's.

| ID | Form | Content | Frequency |
|---|---|---|---|
| **P1** | `Trace (kind, grade): locator` | Exactly one grade from `recompute-verified`, `resolution-only`, `refused`. A locator that resolves. | One per claim |
| **P2** | `LIMIT: ...` | Fixed text, verbatim, unchanged from the prototype. | One per literature trace |
| **P3** | Scope statement | Names an object the answer excludes, in the terms of the question. Only where the exclusion is not visible from the answer itself. | At most one |
| **P4** | Refusal reason | Names the absent object, the region searched, and the nearest present object. | One per refusal |
| **P5** | Register invariant | Names a contested axis and states that the corpus carries both sides without adjudicating. | At most one |

**The line, in one sentence: a permitted self-statement names an object; a prohibited one names a
virtue.**

Objects: a file, a slug, a grade, a boundary, an axis, a search path, an absent measurement, an
excluded quantity. You can go and look at every one of them, and somebody who looks can prove you
wrong.

Virtues: care, caution, honesty, rigor, transparency, humility, balance, restraint, thoroughness. You
cannot look at any of them, nobody can prove you wrong, and asserting one is not evidence of having it.
That last clause is the whole of Category 8 in eleven words.

**Why the LIMIT line survives the prohibition, demonstrated rather than asserted.** Run the deletion
test on it. Above it sits `Trace (citation, resolution-only)`. Delete the LIMIT line and a reader who
does not carry the grade vocabulary reads that citation as support for the sentence beside it. A false
belief now stands. Restore it. Then run §8: which (this trace), how much (it proves the file resolves
and contains the matched topic words, and nothing beyond that), so what (only a person's sampling read
closes the gap). Three slots. The LIMIT line is the model case for this prohibition, not an exception
carved out of it.

**Why `A cautious answer, then` does not survive.** Delete it. Nothing changes. Its subject is the
answer's posture and its object is a virtue. It contains no metaphor, no joke and no adjective, and it
is theater in its purest available form. The Writer caught this one and he is right about it.

## 10. How a refusal stays clean

A refusal is mostly a statement about what is not known, which is structurally the thing this
prohibition targets. It stays clean because **a refusal is a finding about the world, not a report on
the system**, and the grammar shows which one you wrote.

FAIL: `The corpus is limited on the geotechnical properties of icy regolith.`
Subject: the corpus. Predicate: a property of the document's own coverage. Nobody can falsify it and
nobody can act on it.

PASS: `No measurement of icy-regolith shear strength or cone penetration resistance at permanently
shadowed region temperature exists in this corpus.`
Subject: a measurement. Predicate: the non-existence of a named object in a named place. Falsifiable by
anybody who produces the measurement, and actionable by anybody who wants to go and look.

Three rules, and the first is why the prohibition does not endanger refusals at all:

**Ra. A refusal names three nouns: the absent object, the region searched, and the nearest present
object.** Same shape as §8 and same shape as R5. A refusal that names all three is substance by
construction. There is nothing left over for the prohibition to bite.

**Rb. A refusal carries no hedge.** It has no claim to qualify. A modal hedge inside a refusal attaches
to nothing, so it can only be regret. `We may not have complete coverage here` is theater with no host
claim, which makes it the cleanest possible case.

**Rc. A refusal is at most sixty words excluding trace lines.** The Writer's §2.5.4 and The Software
Engineer both require a refusal to stay cheaper than an answer, and the cheapest thing to pad a refusal
with is apology. A word cap is the only form of that rule anybody can run. See D3.

## 11. What mechanizes

Gates. A FAIL blocks delivery and routes through The Software Engineer's §4.4 procedure (return once
with the failing lines quoted; second failure delivers with the failures listed above it and writes
`REGISTER_FAIL`). The orchestrator never repairs.

| # | Assertion | Form | Owner |
|---|---|---|---|
| **M1** | Trace grades are the closed set of three; `verified`, `confirmed`, `validated`, `proven`, `established`, `supported` on a trace line are FAIL. | Set membership plus blacklist | Ratified unchanged from The Software Engineer's B3. I add nothing to it. |
| **M2** | Virtue-word blacklist in deliverable prose. FAIL, not counted. | Closed word list | `verify_register.js`, new. List at §12. |
| **M3** | A sentence carrying a maturity token (`measured`, `demonstrated`, `modelled`, `modeled`, `assumed`, `bench`, `simulant`, `TRL`) and a modal hedge token (`may`, `might`, `could`, `possibly`, `perhaps`, `arguably`, `it seems`) is FAIL. | Two-list co-occurrence, per sentence | `verify_register.js`, new. Mechanizes The Writer's §2.4 bullet 5 and R1 together. |
| **M4** | Any modal hedge token in a `refused`-graded deliverable is FAIL. | Blacklist scoped by grade | `verify_register.js`, new. Rb. |
| **M5** | A `refused`-graded deliverable is at most sixty words excluding trace lines. | Word count | `verify_register.js`, new. Rc, replaces The Writer's §4.5 question 5. |
| **M6** | At most one P3 and at most one P5 per deliverable. | Prefix count, **conditional on the D3 recommendation being adopted** | If `SCOPE:` and `AXIS:` prefixes ship, this is a two-line check. If they do not, M6 does not exist and both members fall to N3. |

Counted, reported with a denominator, read by a human, never a gate:

| # | Measure | Why it is not a gate |
|---|---|---|
| **M7** | Count of deliverable sentences whose grammatical subject is on B2's closed list and which are not P1 through P5. | The Software Engineer is right that a gate here is tuned into uselessness within a month. |
| **M8** | Ratio (not count) of deliverable sentences carrying no numeral, no path, no slug, no grade token and no proper noun, over total deliverable sentences. | The Writer's §4.3 mechanism 6, sharpened. A raw count hides that a two-sentence refusal and a five-sentence answer have different denominators. |

**Why M2 can be a gate where B2 can only be a counter.** B2's list (`this analysis`, `this answer`)
contains phrases with legitimate uses in a deliverable. M2's list does not: every entry is an adverb or
a metadiscourse frame with no technical meaning in this corpus. The one collision I can construct is a
manner adverb inside a quoted method (`the sample was carefully sieved`), and that is answered by the
same `<!-- not app-derived -->` style exemption comment B1 already carries. One escape hatch, already
built, already proved.

## 12. The M2 list

Hard FAIL in deliverable prose. Closed. `rigorously`, `carefully`, `thoroughly`, `honestly`,
`candidly`, `frankly`, `transparently`, `admittedly`, `importantly`, `notably`, `crucially`,
`it is worth noting`, `it should be noted`, `it should be emphasised`, `it should be emphasized`,
`to be clear`, `we acknowledge`, `we recognise`, `we recognize`, `in the interest of`,
`out of an abundance of caution`, `for the sake of completeness`, `in fairness`, `needless to say`.

This is the list SE-8 asks The Editor for. It is deliberately short and deliberately absolute. A long
list with exceptions becomes B2. A short list with none stays a gate.

## 13. What does not mechanize

Stated plainly, because a judgement presented as a check is the same failure this document exists to
prevent.

**N1. The deletion test itself.** Deciding whether removing a sentence lets a false claim stand
requires knowing whether the claim is false. No checker knows that. This is a read.

**N2. Slot filling.** A checker can assert that a maturity token is present (that is SR-6, and it
works). It cannot assert that the token describes the figure under discussion rather than some other
figure in the paragraph. `at bench scale` sitting three sentences from the number it qualifies passes
every mechanical form of R5 and fails §8.

**N3. Membership in P3, P4 and P5 as prose.** P1 and P2 have fixed forms and are checkable. P4 is
checkable for its grade and its length but not for whether the three nouns it names are the right three.
P3 and P5 are prose, and only their frequency mechanizes, and only if the D3 prefixes ship.

**N4. Whether the fact added is the right fact.** A deliverable can name three facts, pass M1 through
M6, and name three irrelevant ones. Rigor-is-adding-facts is a rule about form. It does not make the
facts true or germane.

Everything at §11 is a gate. Everything at §13 is a read. The gates make the cheap failures impossible
and make the expensive one visible. Only The Editor's pass, or the author's, closes N1 through N4, and
no version of this prohibition removes that.

## 14. Failure gallery

Sentences that would appear in this project's deliverables. The "caught by" column names the gate, or
says `read only`, which is the point of §13.

### 14a. Theater. Cut.

| Sentence | Class | Caught by | Correction |
|---|---|---|---|
| `This answer is necessarily uncertain given the state of the literature.` | 8.1 | M7 (counted), then read | Cut. Zero slots. If a real limit exists, write it per §8. |
| `We have been careful to distinguish demonstrated from modelled figures here.` | 8.1 | **M2** (`careful`) | Cut. The distinction is visible in the sentence that makes it. |
| `It is worth noting that LUWEX is a bench-scale campaign.` | 8.3 | **M2** | Cut the frame. `bench scale` belongs inside the figure, per R1. |
| `A cautious answer, then.` | 8.1 | read only | Cut. Mood as a sentence. |
| `The corpus is silent here, as corpora sometimes are.` | 8.1 | read only | Cut. Replace with the P4 form at 14b row 2. |
| `The trace above proves only that the file resolves.` (written below a LIMIT line) | 8.2 | read only | Cut. The LIMIT line said it. |
| `Which is to say the demonstrated figure and the modelled figure are far apart.` (after both are given) | 8.2 | read only | Cut. The two numbers are already on the page. |
| `Rigorously speaking, no TRL for this process resolves to Sanders & Kleinhenz 2025.` | virtue adverb | **M2** | Cut the adverb only. The remainder is a finding and R4 wants it. |
| `We flag this openly rather than leaving it in the trace.` | 8.1 | read only | Cut. BLOCKING. The reference's model case. |
| `The reader should weigh the capture-seal result heavily.` | 8.4 | read only | Cut. State the result and its magnitude and let it weigh itself. |
| `Water extraction on the Moon is a story of two numbers.` | 8.3 | read only | Cut. Deliverables have no openings. (The Writer's catch.) |
| `Thermal mining could achieve roughly 1.3 to 2.7 kWh per kg, though the technology readiness level remains low.` | hedge on a maturity-carrying figure | **M3** | Rewrite per R1: `Architecture studies model 1.3 to 2.7 kWh per kg for extraction alone. The only integrated demonstration measured a different quantity at bench scale.` |
| `We may not have complete coverage of this topic.` (in a refusal) | hedge with no host claim | **M4** | Cut. Replace with the P4 form. |

### 14b. Substance a blunt rule would delete. Keep.

| Sentence | Member | Why it survives |
|---|---|---|
| `LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.` | P2 | Delete it and `resolution-only` reads as support. Three slots filled. §9. |
| `No measurement of icy-regolith shear strength or cone penetration resistance at permanently shadowed region temperature exists in this corpus. The nearest evidence is Barnett 2025 on regolith consolidation during thaw, which is the opposite process.` | P4 | Three nouns: absent object, region searched, nearest present object. Ra. |
| `Trace (refused): thin patch psr-geotechnical. Searched literature/isru-processing and literature/lunar-ice-and-geology.` | P1 and P4 | The searched region is an object. Somebody can go and look at it and find the measurement I said was not there. |
| `The app prices a delivered kilogram against a demand curve it does not carry, so no demand-side question has an address in it.` | P3 | Names the excluded object in the terms of the question. Delete it and the refusal has no reason. |
| `This corpus carries both sides of this axis and does not adjudicate between them.` | P5 | Delete it and the reader takes the one quoted side for the corpus's position. It says what the corpus holds; it does not say the Oracle is being careful. |
| `LUWEX reports 22.88 to 66.33 grams of water per kWh at bench scale, up to 13 kg of simulant per run, at 50 to 73 percent recovery.` | not self-referential at all | Three facts inside the figure and not one hedge anywhere in it. This is what the fourth line of §7 looks like when it is obeyed. |
| `Dust mobilisation degraded the capture seal in every LUWEX campaign.` | a limit written as a finding | The most important limit on the figure above it, and its subject is a physical process rather than the author's confidence. Zero hedges. |

### 14c. Unfinished. Return to the persona. Do not cut and do not ship.

The four-row progression at §8 is the gallery for this class. One sentence, four states, and only the
last one ships.

## 15. What this hands to whom

| Recipient | What they get |
|---|---|
| The Software Engineer, SE-8 | M1 ratified. M2 through M6 as new assertions, with the §12 list. M7 and M8 as counters. D2's weaker haiku form. D3's word cap replacing a counterfactual. |
| The Writer, if he revises | Sixteen cuts made, listed at §3. Twenty-four dashes classified at §4 and not applied. D1's one-clause repair to his §4.3. |
| Every team persona's context recipe | §7 and §9. Four sentences and a five-row table. Nothing else from this file needs to be in a spawn prompt. |
| The Space Resources Engineer | §8's relation to R5, stated as a shared shape rather than a forced mapping. |
| The Growth Economist, ECON-1 | Nothing from me. The Writer's §5 item 5 on the Beason/Henderson pair stands as he wrote it and is his finding, not mine. |
| The author | §13. Four classes of failure no check in this project catches, and the reason each one is a read. |
