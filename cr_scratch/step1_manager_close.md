# Step 1 — The Manager Closes

**Project:** Lunar Oracle
**Date:** 2026-08-27
**Sub-step:** Step 1 close (A.4 step 7)
**Author:** The Manager
**Duty:** evaluate what was produced against what I scoped, rule my own falsifiers, write the
accumulator entries, return a verdict.

---

## 0. For the reader who has not seen Step 1

Lunar Oracle answers questions about lunar in-situ resource use and about the economics of
industrial catch-up, from one merged literature corpus, with the Lunar Scenario Explorer web app
(`lsei/index.html`) as the authority on every quantity that app models. Every answer names its
sources and the grade of trace it carries. A question the evidence cannot support is refused.

Step 1 was the contracts step. It wrote the law before anything is built: seven frozen written
contracts, one test suite, two register row sets, one corrected enforcement layer, two author
rulings. No merge, no loop code, no hook installation, no public-facing prose. Fourteen sub-steps,
five internal waves, one gate.

The shortest path to what actually happened is `cr_scratch/step1_orchestrator_verification.md`. It
carries every load-bearing empirical claim of the step, re-run, with the command that produced each
verdict. This close does not repeat it.

---

## 1. Verdict

**Not ready for the author. Step 1 needs one bounded revision pass, and that pass is a stage of
this cycle rather than a second cycle.**

I am not recommending a conditional close and I am not deferring anything into Step 2. A.4's loop is
open, execution, integration, optional writing wave, Wave 2 review, **revision**, close, gate. Wave 2
returned and the revision stage has not run. Three blocking defects sit inside frozen contracts,
sixteen hard counting-rule failures are live, roughly forty-five amendments against eight targets
have no holder, and fifteen specified target paths have no files behind them. Putting that in front
of the author is asking him to approve text that is already known to be changing. That is not a gate,
it is a draft review.

**The finding that decided it, measured at this close and not reported by any agent.** Sub-step 1.1's
acceptance criterion is its `git check-ignore` fixture list. I ran it:

```
$ ... 24 assertions, core.ignorecase=false, --no-index
FAIL  .derived/verify_report.js    expected ignored  got allowed
EXIT=1
```

Twenty-three of twenty-four pass. Row 14 fails because the `/.derived/` rule was deleted from
`.gitignore` at 1.4 — correctly, since the author dropped the C4 dependency and nothing writes there
any more — and the fixture list that is the acceptance criterion was never swept. **The acceptance
test of the first sub-step of the contracts step fails today.** The gameplan's Step 1 sub-step table,
written this morning at 09:17, records that row as *"`.gitignore` live, 18 probes pass."* The list
holds 24 probes and one of them fails. Both halves of that cell are wrong.

That is a one-line fix and it is not why the verdict is what it is. It matters because of *when* it
was written: after the counting-rule contract landed, after Wave 2 reported this exact defect class,
by the seat whose job is to check every other seat. See §4.

### What closes it

Six items. Five are open; the sixth closed while this close was being written. All are bounded, all
have owners, and none is new work in the sense of new thinking.

| # | What | Owner | Done when |
|---|---|---|---|
| R-1 | Sweep 1.1's fixture list: delete the `.derived/` row, re-run, exit 0. Correct the gameplan cell to the true probe count and the true verdict. | Orchestrator | The harness exits 0 and the cell matches it |
| R-2 | Apply the three blocking review findings to their own authors' frozen text: **S1** (1.5 validates before it branches on schema version, so a future record is classified corrupt and overwritten), **R1** (1.13's `CHK-09` is a self-invoking pre-commit loop), **R2** (the consolidation survivor `ecr_verify.js` could not lift a marked block from a CRLF file — the CRLF-tolerant lifter is now committed and I verified it here; the remaining halves are its absolute `require` path and the check that cannot fail). Plus 1.4's four blocking findings F1–F4. | The Systems Engineer | Each finding has an amendment row marked `applied` |
| R-3 | Land the answer contract at version 2 in its own deliverable. It reads 1 there and 2 in nine other files, with a third bump queued from 1.6 §12. All three in one edit, or the field is deleted. | The Software Engineer | One integer, one value, everywhere |
| R-4 | Amend the counting-rule contract for W2-1 to W2-10, four of which are missing forms authors needed and invented anyway: arithmetic over other quantities, inherited conditions, quoted ranges, and corrections owed against a frozen document. Fix the three duplicate ids (W2-11). | The Designer, and The Space Resources Engineer for W2-11 | `M1–M4`, `M11`, `M12` run clean over the declared file set |
| R-5 | **Sub-step 1.14, new.** Build `oracle/MANIFEST.tsv` and `oracle/AMENDMENTS.tsv`, load them from the eleven sources, run MF-1 to MF-3 and AM-1 to AM-4, return the collision list for disposition. Promote the fifteen specifications per §5.4. | The Engineer (build and load), The Software Engineer (review for mechanizability), The Manager (rule collisions), the author (gate) | AM-1 returns no collision that has not been ruled |
| R-6 | ~~Re-scope ECR-01, contradicted by the Wave 2 gate.~~ **Landed while this close was being written. Verified here: `ecr_verify.js` on the addendum returns exit 0, zero FAIL lines, ALL PASS, 18 axes, 185 `match_keys`.** | The Manager (economics prompt) | **Done** |

R-5 is a fifteenth sub-step and adding it is within my latitude, as I stated at the open. It is not a
deferral: it is the reconciliation the Wave 2 review identified as real work with a deliverable and no
row, and the Designer named the constraint on its owner — it must not be the author of most of the
amendments. The Systems Engineer wrote four of the eight targets. The Software Engineer wrote three
and both reviews. The Engineer wrote one, is closest to corpus structure, and is the least conflicted
seat that ran.

**One thing I will not do**, because it would be the wrong lesson: I am not sending the step back
through another Wave 1. The technical execution was good. Fourteen of fourteen produced deliverables,
three personas built their checks before their content, and every blocking defect in this step was
found by this step's own reviews. What failed is the stage between review and gate, and the fix is to
run it rather than to redo the work that fed it.

---

## 2. The four falsifiers, ruled

I named these at the open so I could not reinterpret them. Two fire.

### Falsifier 1 — the concurrency ruling on 1.0. **DOES NOT FIRE.**

I ruled that 1.0 runs concurrently with group 1 rather than blocking it, and named the falsifier
precisely: not that 1.0 finds defects, but that a defect it finds forces a group 1 deliverable to be
rewritten.

It returned 22 failures, 8 blocking. Every blocking one is against the operating contract itself —
the plan file not containing Step 1's sub-step list, the sub-step total stated as 72 against the
table's own arithmetic of 75, the document contradicting itself about whether Step 0 is finished, the
Steps table's owner column disagreeing with the plan on five of seven steps. **None of them touched
1.1, 1.3 or 1.7.** No group 1 deliverable was rewritten on 1.0's account. The ruling holds.

I record what it cost anyway, because a falsifier that does not fire is not the same as a decision
with no price. 1.0's finding F-1 — the plan file does not contain Step 1's sub-step list — went
unrepaired for the whole step and was re-found by the Wave 2 review as the highest-value single edit
available. The concurrency was right; the *application* of 1.0's defect list is the part I
under-specified. My open said the orchestrator reads the defect list before spawning group 2 and
corrects any later prompt that points at a defective passage. It did not say who applies the fixes to
the artifact, or when. Nobody did, until this morning.

### Falsifier 2 — 1.12's placement in group 3. **FIRES.**

I said I would check this by reading group 1 and group 2 outputs for numbers rather than by asking
agents whether they complied.

The Engineer, at 1.7, in group 1, stated *"ten of the nineteen"* FA files needed renaming. The true
figure is 14. The count was relayed into an author ruling and re-run only afterwards. That is a count
stated without its rule, produced in group 1, inside the deliverable whose subject was naming. The
author's own ruling file records it as *"instance 10 of E16 and it is the freshest one."*

It is not the only one. The Systems Engineer's three quantity blocks at 1.4, in group 2, turned the
bare "seven phases" and "six degraded modes" already sitting in the gameplan and in my own open into
lint findings on the contract's first run. Those bare counts were in group 1 and group 2 text.

**The placement was wrong. 1.12 belonged in group 1.** The argument I used — that 1.12 should consume
1.0's findings — was true and was not worth what it cost. The dependency ran the wrong way: 1.0's
cold read would have been improved by a counting rule more than 1.12 was improved by the cold read.
The orchestrator partly repaired this in flight, pulling 1.12 ahead of the group I scheduled it in on
the Designer's argument, and holding gameplan corrections until it landed. That was a repair of my
error, not an execution of my plan.

### Falsifier 3 — the TDD precondition subset. **FIRES.**

I ruled the precondition fires on the operating contract and not on the ten specifications, on the
ground that specifications have machines and later sub-steps as readers rather than an audience. The
falsifier: if any frozen contract has an audience-comprehension defect that had to be fixed after
freezing — a term used before it is defined, or a later sub-step that cannot execute the contract as
written because it cannot follow it.

**Four of the counting-rule contract's ten defects are exactly the second form.** W2-4: `operation`
admits three forms and none is arithmetic over other quantities, so an author with a derived count
has no form and invents one. W2-6: there is no form for a correction whose sites are in a frozen
document — which is the root of the entire amendment-queue problem. W2-8: no form for quoting a
range, so M3 cannot read one, and `Q-C4-FENCE-SPAN` was written anyway. W2-14: two blocks write
`conditions: as Q-REG-FLIPS-FULL`, an inherited condition the schema does not have. In every case an
author needed a form the contract did not provide, invented one, and the invention does not check.

The second form appears again in the install state record: The Software Engineer found M1 refuses
`corpus.digest` by its own terms, and M3 has two readings, one of which admits what the other
refuses. The Systems Engineer's own text admits admitting a field *"in a weaker form"* of a clause. A
rule that can be applied two ways by its own author is a comprehension defect in a specification.

**My subset was too narrow.** The correct rule is not "specifications are exempt" but: **a
specification whose form other agents must write against is reader-facing, and the precondition fires
on it.** The distinguishing property is not the audience's species; it is whether the artifact
constrains how somebody else writes. 1.12 and 1.5 do. 1.9 and 1.10 do not — they are data written to
a schema somebody else already tested. 1.1 does not — it is code with a fixture list.

The cheap discharge is not a full Prompt 1 suite per contract. It is one test, run by the author
before freezing: **take the three hardest instances the contract will have to express, write them in
the contract's own forms, and see whether the forms exist.** The Designer's own file failed that test
eight times and he found it himself in Wave 2, one step too late. Applied at 1.12 it would have cost
one page.

### Falsifier 4 — the sizing. **DOES NOT FIRE.**

One Manager open, one Manager close, one gate. No second open was required, and the revision pass in
§1 is a stage of this cycle rather than a new one. The five-group serialization held; the internal
seam after group 3 was never needed.

The sizing ruling was right and the reason is worth keeping: five ordered spawn groups are not five
cycles, and treating them as cycles would have fired five author gates against the author's own
numbering ruling of seven.

---

## 3. Scope accounting: fourteen of fourteen, with four exceptions named, one of them closed during this close

Every one of the fourteen produced a deliverable. Nothing was quietly dropped. Nothing was removed,
which is correct, because removal is the author's and no request to remove reached him.

| # | Scoped | Deliverable | State |
|---|---|---|---|
| 1.0 | Cold-read suite for the operating contract | `step1_0_designer_coldread.md` | 121 tests, run, 22 failures with fixes. **Exception A** |
| 1.1 | Corrected enforcement layer + fixture list | `step1_1_systems_engineer_enforcement.md`, `.gitignore` | Applied and live. **Fixture list fails today, exit 1. Exception B** |
| 1.2 | FA corpus contract | Author ruling, recorded | Closed. Bookkeeping done. Its operative consequence reached 1.3 |
| 1.3 | Answer contract frozen | `step1_3_software_engineer_answer_contract.md` | Frozen. Carries the shelf-naming requirement. **Version integer says 1; nine files say 2** |
| 1.4 | Bootstrap contract | draft + testability review | 495-line block, 19 assertions, 14 review findings, 4 blocking |
| 1.5 | Install state record | draft + review | One record, no fifth fact. 8 findings, 2 blocking |
| 1.6 | Currency policy + C4 | `step1_6_systems_engineer_currency_policy.md` | Written against the author's ruling, not an assumption. Closed D4, E6, E10, C4, E11's ref half |
| 1.7 | `NAMING.md`, both namespaces, path ceiling | draft + addendum | 176/176 names pass. **Overturned register row E14 by measurement.** One count relayed wrong; see §4 |
| 1.8 | Register schema, one encoding | `step1_8_software_engineer_register_schema.md` | Encoding decided by measurement, not preference. **Exception C** |
| 1.9 | Fifteen lunar register axes | draft + addendum | 15 axes, 81 members. **Re-verified by me at this close: exit 0, zero FAIL lines, ALL PASS** |
| 1.10 | Seventeen economics register axes | `step1_10_manager_economics_register.md` + addendum | Ratified at 17 axes, 176 `match_keys`. **ECR-01 re-scoped and ECR-18 added during this close; re-verified by me at 18 axes, 185 `match_keys`, exit 0, zero FAIL lines, ALL PASS.** **Exception D, closed** |
| 1.11 | Answering-loop test suite | v1 + v2 | 211 tests, 49 generated, 162 hand-authored. A.10 step 2 gate run by The Fact-Checker |
| 1.12 | Counting-rule contract | `step1_12_designer_counting_rule.md` | Frozen. **Sixteen hard failures live against it, ten in its own file** |
| 1.13 | Check register | draft + review | 24 rows, closed list, both `tools/` scripts have rows. **One row specifies a self-invoking loop** |

**Exception A. 1.0 shipped without the review its own row specifies.** The row reads "The Designer
(author), The Software Engineer (reviews the suite before it is the contract)." No such review exists
on disk and no other file contains it. The suite became the contract unreviewed. This is my error at
the open: I placed the reviewer in the row and did not place the review in a wave. It is also the
weakest link in the falsifier 3 story, because the reviewer whose standing question is "is this
earning its keep" never saw the suite that discharged the precondition.

**Exception B. 1.1's acceptance criterion fails.** Detailed in §1. One stale fixture row. The
underlying `.gitignore` is correct and passes 23 of 24. The map ruling the author owes — whether
`cr_scratch/` grows or is archived per step — is framed and still open; The Systems Engineer stated
correctly that it has no `.gitignore` consequence under any option and does not block. It is the only
outstanding item from my open's check 10.

**Exception C. 1.8's three briefs were consumed and not preserved.** The Software Engineer's own
header records that he opened them, so they were produced, and the schema shows the marks of three
distinct positions being weighed. But they are not files in `cr_scratch/`, and A.3.5 says agent
handoffs ship. The consequence is specific and it is mine to name: **the A.9 tension at 1.8 cannot be
audited.** My open's check 11 was to read the review outputs rather than the integration, to see
whether a tension had been smoothed. At 1.8 there is nothing to read. I do not believe it was smoothed
— his §1.1 names the three positions and whose they were, and the measurement that settled the
question is committed at `tools/probe_register_encoding.js` and re-runnable — but belief is not the
instrument I said I would use.

**Exception D. ECR-01 was in flight when I began this close and landed before I finished it. It is
closed.** The Fact-Checker contradicted the verdict: the B7 correction underneath it verifies and is
stronger than claimed — Wade records that no comparable Japanese study exists — but the verdict
dropped the word "Japanese," and Wade reports Lane 2017 finding Korean HCI-targeted industries grew
faster in output and productivity, an affirmative finding with no row anywhere.

`cr_scratch/step1_10_manager_economics_register_addendum.md` re-scopes ECR-01 to `false_pair` with
three sides, adds ECR-18 for the Korean finding rather than folding it onto ECR-01, corrects a member
position, and withdraws three statements in the original file. **I verified it here rather than
reading its report:** `node tools/ecr_verify.js <addendum> _intake/japanese-miracle/lit` returns exit
0, zero FAIL lines over the whole unfiltered output, `ALL PASS`, **18 axes, 53 members, 185
`match_keys`, 0 K1 and 0 K2 failures**, classes 6 `false_pair` / 7 `two_sided` / 5 `one_sided`.

Two things about the correction are worth keeping past this step. **It found a third defect the gate
had not asked about**, by applying the gate's third warning to his own rows rather than only to the
row it named — `kiyota-2013` states in its own summary of its lineage that Japanese industrial policy
contributed to labour-productivity growth but not to TFP, which contradicts an `axis_statement`
asserting six-of-six no effect. And **it verified at source before changing anything**, on the stated
ground that a correction made against a report rather than against the source is the defect it is
correcting. That is arm 2 of §4 stated by the seat that had just been caught by it.

The economics register was 17 axes at ratification and is 18 now. Every figure in this paragraph was
produced by the command above, run at this close.

**What I checked from the open, item by item, that is not an exception.** The seven contracts exist as
marked blocks a later sub-step could be written against — I tested this by taking sub-steps 2.14, 2.17
and 3.2 and asking whether their descriptions execute against the frozen text, and they do, subject to
the promotion problem in §5.4. 1.7 states both namespaces and the discriminator is mechanical. 1.3
carries the shelf-naming requirement; the FA ruling did not evaporate when 1.2 closed. The 1.11 suite
exists and no loop code was written. E17, E16 and E8 have addresses rather than dashes. The two
register row sets are **not** merged: 32 axes, two namespaces, `register_class` carrying the
disagreement as data. A.10 step 2 ran on 1.11 by somebody other than its author, with five of seven
UNVERIFIED rows cleared, one CONTRADICTED and one contradicted from Part 2 — and the contradicted ones
are marked rather than dropped.

---

## 4. Common cause or special cause

This is the question my own anchor puts to me and I am not going to answer it rhetorically.

**The evidence.** Five confirmed orchestrator errors, plus a fifth in the Designer's return, and two
more I found at this close:

1. "Ten of nineteen" FA files relayed into an author ruling. True figure 14.
2. The lunar register reported as passing when a strict re-run returns FAIL, exit 1.
3. A third push to an upstream without sweeping the register row about not being able to tell who
   moved the authority.
4. A helium-3 total of ~8,500 litres per year relayed as coming from the corpus. It exists in no
   source; it is 7,000 + 1,000 + 500 summed, and the 7,000 is a detector category rather than
   government demand.
5. "Thirteen amendments" written into a review brief when the figure is seven, because 13 was the
   highest row label and 1.6 continued 1.5's numbering.
6. **New, found here.** `step1_orchestrator_verification.md` states `oracle/REGISTER.tsv` is
   *"verified tracked."* `git ls-files oracle/` returns nothing and `oracle/` does not exist. The
   operation actually run was `git check-ignore`, which proves *admitted*, not tracked.
7. **New, found here.** The gameplan's Step 1 table, written at 09:17 today, records 1.1 as "18 probes
   pass." The list holds 24 and one of them fails.

On the agent side: E14's diagnosis wrong and its path budget stated backwards; sixteen hard counting
failures with ten in the counting-rule contract's own file; three duplicate ids; a missing `population`
key; a dangling `derived-from`; one integer, `Q-CHECK-ROWS`, carrying three competing successor values
from three documents; the answer contract's version integer reading 1 in its own file and 2 in nine
others; the loose-ends register violating its own closed status vocabulary on twelve of forty-four
rows.

### The ruling: common cause, with exactly one special-cause instance inside it

**Common cause.** The test for special cause is whether something distinguishes the instances. Nothing
does. The defect appears across six personas, both hats of a seventh, and the orchestrator; across
counts, dates, refs, versions and identifiers; in files written before the contract and in files
written after it; and — decisively — **eight of the sixteen live failures are inside the deliverable
that specifies the rule against them, produced by the persona who wrote it.** When the author of a
countermeasure produces the defect at the highest rate in the project while writing the
countermeasure, the defect is a property of the system he is working inside, not of him.

The second test is whether the rate falls after the instances are corrected. At 0.7 I ruled E16 one
common cause, and 0.6 corrected the numbers. The corrections did not reach the echo site registry.
Five of the nine known instances were then produced *this* session, three of them the orchestrator's
own corrections, and two more were produced this morning after the contract landed. A rate that does
not fall after correction is common cause by construction. Correcting numbers has never once worked on
this project and I should stop expecting it to.

**The single special-cause instance.** The `grep -viE` that removed the B6 failure line before the
verdict was read is not the same defect. It required two coincident conditions — a checker that could
not exit nonzero, and a filter written for readability applied before the verdict was read — and both
are now closed: `ecr_verify.js` exits 1, and the rule was written the same day (*a verdict is the
strict tool's exit status, plus a count of failure lines over the whole unfiltered output, plus the
summary line; the filter may not run before the verdict is read*). It happened once, it has a
mechanism, and the mechanism is fixed. Classifying it with the other six would hide the fact that it is
the only one anybody could design a fix for on the spot.

### Is the contract that landed this step the fix, or is it insufficient?

**Neither, as stated. It is the right fix for one of the two arms of the problem, and it is unbuilt.**

The problem has two arms and I did not see the second one when I scoped 1.12.

**Arm 1 — counts inside deliverables.** 1.12 addresses this and its design is sound. The proof is that
it produced a number about itself: sixteen hard failures exist as a measurement because M1–M4, M11 and
M12 were implemented and run. The echo site registry, which I diagnosed at 0.7 as "a document that gets
consulted rather than a gate that gets passed," never produced a number about itself in its entire
life. That is a real difference and 1.12 is on the right side of it.

But it is **not yet a gate either.** `tools/quantities.js` does not exist. M5 through M10 are not
runnable. M6 and M7 require `QUANTITIES.md`, which does not exist. Sixteen failures are live and
nothing fires on them. Today the counting-rule contract stands to counts exactly as the echo site
registry stood to counts at 0.7. **Arm 1 closes when `tools/quantities.js` lands with a check-register
row and an invocation point — not when more contract text is written.** That is 2.14's, and it is the
single highest-value thing Step 2 can do about this defect.

**Arm 2 — counts crossing a boundary.** All seven orchestrator errors are here, and **nothing that
landed this step touches them.** Six of the seven were relays: a number produced by an agent's
operation, repeated into an author ruling, a spawn prompt, a summary table or a gameplan cell without
running the operation that produces it. A quantity block inside a deliverable cannot fire on a sentence
in a prompt or on a figure quoted to the author. The contract governs documents; these errors happen in
the space between documents.

**The rule that closes arm 2, and I am writing it here as standing:**

> **A number does not cross a boundary unless the seat relaying it ran the operation that produces it,
> and the relay carries the operation.** A boundary is: into a spawn prompt, into a message to the
> author, into a summary table, into the gameplan, into the accumulator. Where the number is derived
> from other numbers, the relay names them — which is the counting rule's `derived-from` applied to a
> relay rather than to a block.

This is not new machinery. It is the counting rule's own `operation:` and `derived-from:` fields
pointed at the one traffic the contract does not cover. It costs one command per relayed figure.

**And the structural finding underneath both arms, which is the Deming answer rather than the
procedural one.** Every agent output this step was verified by the orchestrator and written into
`step1_orchestrator_verification.md`. **Nothing verifies the verifier.** The system has one unchecked
node, and it is the node with the highest traffic — every figure in the project passes through it on
its way to the author. Seven errors in one step at that node is not a personnel finding. It is the
predictable output of a system with no check on its highest-throughput seat, and it will recur in Step
2 at the same rate unless something checks it.

The check register caught it once, by accident, and the orchestrator recorded that plainly: *"This is
the check register catching the orchestrator on its first run, which is the argument for the register
that no amount of specification would have made."* **Making that deliberate is Step 2's work**, and the
cheapest form is already in the building: `oracle/VERIFIED.tsv` gains a column for who ran the
operation and when, and the Step 2 close reads it. I am not specifying it further here; The Software
Engineer's simplicity gate should decide the form.

**One consequence I accept for myself.** Two of the instances above are mine as Manager rather than the
orchestrator's: the accumulator entry recording the loose ends register as declaring 42 rows when it
declares 44, and the "thirteen amendments" brief. Every count in this document was produced by an
operation I ran in this session. Where I quote an agent's figure I say whose it is.

---

## 5. The five decisions

### 5.1 The `verify_report.js` replacement post-condition — **it gets its own row: `oracle/lib/claim_bearing.js`, as sub-step 3.8b, before 3.9**

The author dropped the dependency, and The Software Engineer had already made the answer contract
independent of it at 1.3 by restating the claim-bearing definition in the contract's own words. So the
ruling costs a reimplementation and costs the contract nothing. What it left behind is a post-condition
with no builder.

Folding the post-condition into 1.11's suite is correct and is done — CLM-1 to CLM-12, with FIL-10
consuming it. **Folding the implementation into 1.11 is not available**, because 1.11 is a test suite
and a suite does not build a library. Folding it into 3.9 is worse: 3.9 would depend on an artifact it
also produces, and one of the consumers sits earlier in the loop than 3.9 does. A mechanism that is a
post-condition of the step consuming it is not scheduled, it is assumed.

This is E8's own complaint applied to a library rather than a check: a thing that exists as a
requirement in one file and as a consumer in another, with nothing between them, is not a mechanism.
1.13 already gave it `CHK-20` with status `specified` and a note that the implementation row is Step
3's. **The row is the missing half of that note.**

**Ruling.** New sub-step **3.8b**, fractional insertion per A.6.2, using the letter-suffix form this
project established at 0.1b. Owner The Software Engineer. Depends on 3.8. Deliverable
`oracle/lib/claim_bearing.js`, the single implementation of answer contract §7. Consumers named in the
row so they are not re-derived: `verify_haiku.js`, `CHK-18`, `CHK-21`, `CHK-22`, and FIL-10's fixture.
Its post-condition is CLM-1 to CLM-12 of the 1.11 suite, which remains the suite's. `CHK-20`'s status
moves from `specified` to live when it lands.

### 5.2 The amendment queue — **`oracle/AMENDMENTS.tsv` accepted as specified, with `oracle/MANIFEST.tsv`. Both are 1.14's**

The Designer's argument is right and I accept it on the ground he chose rather than on size. Size alone
would justify a document. What justifies a register is that **amendments collide on quantities and the
collision is computable**: `cut -f5 | sort | uniq -d` finds collisions 2 and 3, and no human found
either, in a step where a reviewer was looking for exactly that class and found one. X1 was found
because one reviewer happened to hold two files at once. Collisions 2 and 3 span documents nobody was
given together. A person reading all eleven lists will find them once; a register finds them every time
nobody reads anything.

The second reason is the one I would have missed: **a ruled-out amendment must stay visible and stay
marked.** X1 was ruled — 1.13's assertion wins, 1.5's marker clause relocates to the register as a CL
clause — and the ruling has not reached the text. `step1_5_systems_engineer_install_state.md` §3.1 row
5 still reads as an owed amendment with nothing on it saying it was overruled. A reader applying that
list today applies a rejected amendment. Prose cannot carry a supersession pointer without becoming a
table, and this is the live proof.

**Accepted as specified**: `H`/`A` rows, self-declared size header, states `owed` | `applied` |
`superseded` | `declined`, checks AM-1 to AM-4. AM-4 is what makes the two files one mechanism rather
than two lists, and it is what settles §5.4 below.

**`oracle/MANIFEST.tsv` accepted for the same class of reason**, and MF-3 is why: *every `BEGIN` marker
anywhere under `cr_scratch/` has a row.* That is CL-1's closure join applied to deliverables. Without
it the twelfth specification is invisible the way the eleventh currently is — and "invisible" is not a
figure of speech. I ran the marker census at this close: it returns marker strings that differ from the
target path they name, and `sed` regex fragments that read as markers to a naive scan. A join that is a
file is checkable; a join that is a `sed` command inside somebody's §5 is not.

Both get check-register rows, because 1.13's landing rule is that a new check is not landed until its
register row exists, and I am not going to break that rule with the two artifacts whose purpose is to
keep this kind of promise.

**One correction to the brief I wrote**, since it is the same class the contract exists to catch: I
wrote "thirteen further amendments owed against 1.4 from 1.6 alone." 1.6's table against 1.4 holds
seven rows, numbered 7 through 13 because they continue 1.5's numbering. **13 is the highest row label,
not a count.** The numbering is the right choice by its author and it is exactly the shape that
produces a misread downstream. It is my error and it is instance 5 in §4.

### 5.3 The gameplan's missing Step 1 sub-step table — **accepted, and already applied**

The Designer called it the highest-value single edit available and he is right, for the reason he gave
rather than for the information: the reader has already learned the form from the `### Step 0
sub-steps` table and will look for its sibling. A pattern that exists for one step and not the next
teaches the reader the information is not there, and they stop looking. That is a design failure in the
strict sense — the signifier is present and the affordance it advertises is absent.

The orchestrator applied it at 09:17 this morning: fourteen rows at gameplan line 254 with origin,
description, owner, deliverable and status, plus the sentence that nothing has been promoted and the
sentence naming the verification log as the first read. That is the correct edit and it discharges
1.0's F-1 and F-4.

**Two things about it are wrong and go into R-1.** The 1.1 cell reports "18 probes pass" against a
24-probe list that fails, per §1. And the table is now the fifteenth place a Step 1 fact is stated,
which is an argument for the manifest rather than against the table: **the table is the index and
`oracle/MANIFEST.tsv` is the join.** Neither replaces the other.

### 5.4 Promotion of the fifteen frozen specifications — **promote now, inside 1.14. Not Step 2**

Nothing has been promoted. `oracle/` does not exist. Fifteen specified target paths have zero files
behind them, and Step 2's context recipes name several of them directly — 2.14 is told to read
`oracle/bootstrap_contract.md`, 2.17 names 1.5's schema, 2.1 names `NAMING.md`. A cold Step 2 session
runs `cat` on each and gets nothing.

**The argument that decides it is the lift-is-a-copy collision, not the convenience.** Every extraction
in this project is `sed -n '/BEGIN/,/END/p' | sed '1d;$d' > target`. A copy. The source block stays in
`cr_scratch/`, and the counting-rule contract's declared file set scans both roots, so the moment
anything is lifted, seven quantity blocks exist in two files and M2 fails on duplicate ids. That is
confirmed to the block by two personas independently.

There are only two stable end states. Either the text lives in `cr_scratch/` and is never promoted, or
it lives at the target path and `cr_scratch/` becomes historical record. **Applying forty-five
amendments to `cr_scratch/` text and promoting afterwards is the worst of the three**, because the
drift window is the whole of Step 2 and every amendment is applied to a document about to be copied.
The Designer's own AM-4 says the same thing from the other side: an amendment cannot land in a document
that has not been promoted.

**Ruling.** 1.14 promotes, and promotion precedes amendment application. Concretely:

- The fifteen targets are created. `oracle/` comes into existence.
- Each promoted file is the **single authority** for its text. The `cr_scratch/` block gets a marker
  line saying it is superseded by the target path, and is retained as the historical record of what was
  reviewed. It is not deleted: A.3.5 ships agent handoffs, and the review findings are written against
  line numbers in those files.
- `oracle/MANIFEST.tsv` rows move `specified` → `promoted` as each lands. AM-4 then permits the
  amendments.
- The counting-rule contract's §8 declared file set is amended in the same pass to exclude superseded
  `cr_scratch/` blocks, or the duplicate-id failure is the promotion's own first defect.

**One path collision must be closed before the promotion runs, and I rule it here.** `NAMING.md`'s
marker names the bare root path; its own lift command and my open name `literature/NAMING.md`. Both
strings are in live use — 28 mentions of the `literature/` form, 24 of the bare form. **Ruling:
`literature/NAMING.md`.** It matches the file's own lift command, it matches the Step 2 context recipe
for 2.1, and it is the form with the incumbent. Choosing a third string for consistency with `oracle/`
would sweep 52 mentions to fix a reachability concern with no live instance, and creating 52 edit
opportunities is not how you reduce the defect rate diagnosed in §4.

**The residual risk, named rather than mechanized.** The naming rule now governs two shelves and will
live inside one of them, so a contributor to `findings/` has no path to it. The 14 broken FA filenames
are what that looks like when it happens. I hand this to Step 2 as an owed item on the merge rather
than inventing a mechanism for it at close: **when `findings/` is created, the sub-step that creates it
states where its naming authority is.** One sentence, at the point the shelf exists.

### 5.5 The A.9 tensions

Reported in §6. Not resolved.

---

## 6. Where the tensions stand

Both are live. Neither is resolved and neither should be.

### 6.1 The Manager (economics prompt) against The Space Resources Engineer — which necessary condition binds first

**Live, unresolved, and this step converted it from argument into data**, which is the best available
outcome for a tension that is not supposed to close.

Where it appeared and what happened. At 1.8 both briefed the same schema separately and neither was
asked to reconcile with the other; the schema was then decided by measurement rather than by
adjudicating between them, which is why the disagreement survived intact. At 1.9 and 1.10 the two row
sets were authored from opposite sides and **were not merged**: 15 lunar axes and 18 economics axes,
two namespaces, `register_class` (`two_sided` / `false_pair` / `one_sided`) carrying the disagreement as
a typed field. ECR-15 and ECR-16 state both positions and mark neither correct. The shared axis LCC-12
was written once under the lunar prefix rather than duplicated, with one requirement left open on it for
The Space Resources Engineer.

**Where it goes next, and the mechanical form it will take.** 2.16 merges the two sets. Two things must
survive that merge and both are at risk in a splice: `register_class` must not be collapsed into a
single "return both sides" rule, and the `H` header carries one `basis_root` field against two pre-merge
roots — `lsei/literature` for the lunar rows, `_intake/japanese-miracle/lit` for the economics rows. The
two headers cannot be spliced unchanged. The cheapest repair named is that one field holding both,
space-separated. **Nothing breaks at answer time because the join key is the leaf**, which is why this
is a schema chore rather than a finding.

**One thing I cannot report on and will not pretend to.** Per Exception C, the three 1.8 briefs were not
preserved, so I cannot audit whether this tension was presented side by side inside that ratification or
smoothed in the summarizing. The evidence available says it was not smoothed. The instrument I promised
to use is not available.

### 6.2 The Software Engineer against The Systems Engineer — pragmatic simplicity against architectural coherence

**Ran three times, not the four I predicted**, because 1.0's review never happened (Exception A). It is
the load-bearing tension of this step and it did the work it exists to do. I checked the review outputs
rather than the integration, per my own check 11, and it was **not** smoothed: both review files state
disagreement explicitly and neither was averaged into agreement.

**1.4.** Fourteen findings, four blocking. The Software Engineer tested both of The Systems Engineer's
contested judgement calls — the root-length budget as a preflight fact rather than an eighth phase, and
an uninhabitable root as a terminal outcome rather than a seventh mode — and **found for The Systems
Engineer on both**, supplying a better argument for the first than its author had used. He declined the
fight The Systems Engineer staged over BC-7, which is the tension working rather than failing: neither
persona is obliged to take every offered disagreement. **Unresolved and standing side by side: the
assertion count.** He would cut three, merge two and reclassify one, taking nineteen to fourteen plus a
recorded fact. The Systems Engineer has not answered. Both positions go to the author.

**1.5.** The install record's three-clause membership rule was **not** upheld: M1 refuses `corpus.digest`
by its own terms, M3 has two readings. Repaired rather than rejected — a corrected three-clause rule that
decides all ten candidates and needs no fourth clause, with the count staying three and every ruling
surviving except `pdfs_present`. That is the tension producing a better artifact than either seat would
have produced alone, which is the case for keeping it.

**1.13.** The register's artifact-not-assertion boundary was **upheld**, and the reviewer proved it by
adding an unregistered file and watching CL-1 fail. **One disagreement is unresolved and it is live work
rather than a position:** The Systems Engineer ruled that the two weak checkers consolidate at 2.15; The
Software Engineer agrees the ruling is right and says 2.15 is the wrong date, because two of 1.9's
quantity blocks name `check_register_rows.js` as their `operation:` and `CHK-03` wires it to
`substep-gate` today. **A check that cannot fail, sitting on a gate, for the eleven sub-steps between
here and 2.15, is not a debt — it is the defect still running.** The fix is one cell. I side with the
reviewer on the date and record that I am doing so: this is not the tension's substance, it is a schedule
consequence of it, and schedule is mine.

**What both seats did that I want on the record.** The Systems Engineer wrote an inert assertion,
implemented it, ran it, and reported the inertness against himself (1.13 §3.4). The Software Engineer
found his own frozen contract's limit-line arity wrong and left the test red on purpose rather than
writing it to a rule he believed was wrong. Both are the behaviour that makes a tension productive
instead of adversarial.

---

## 7. What Step 2 inherits

Step 2 is the merge: `literature/` is built, the corpus lands, and the counts get measured for the first
time with their rules attached.

**Contracts, promoted.** Fifteen files at their target paths after 1.14, with `oracle/MANIFEST.tsv`
joining each to the `cr_scratch/` file holding its review history, and `oracle/AMENDMENTS.tsv` holding
roughly forty-five edit obligations against eight targets from eleven sources, with four known
collisions.

**Named work with an address.**

| Inherits | What |
|---|---|
| **2.1** | `literature/NAMING.md`, 176/176 names passing. Register row E14 is rewritten: the long filename never broke a clone, root length did, and the fix is a path budget split between root and repo-relative rather than `core.longpaths`. The 14 FA renames plus one prefix fix plus two case fixes land when `findings/` is created; state that shelf's naming authority when it does. |
| **2.14** | The check register's **full list**, not one check. `CHK-09` **must be split** into `--register` and `--wiring` before anything is wired, or the pre-commit hook recurses without bound on every commit — `core.hooksPath` has no reentrancy guard. Add `CL-8`: no row naming `pre-commit` may contain the literal `git hook run pre-commit`. Commit `.gitattributes` with `tools/githooks/* text eol=lf` **before** installing hooks, or the hook is checked out with `#!/bin/sh\r` and blocks every commit on Linux. `git update-index --chmod=+x` on the hook: all eight files in `tools/` are committed `100644` and `core.filemode=false` here, so a hook committed as-is is inert on a Linux clone and passes on the author's machine. And **`tools/quantities.js` lands here** — that is what closes E16's first arm. |
| **2.15** | Consolidate `check_register_rows.js` and `ecr_keycheck.js` into `ecr_verify.js`; `tools/` goes eight to six. The survivor needs three things and the ruling names one: the upstream tokenizer `require()`, **the CRLF-tolerant block lifter** (now committed in `ecr_verify.js` and `ecr_probes.js`), and a `require` path that is not absolute — `check_register_rows.js` hard-codes `C:/Users/Quinn Morley/...` at line 3 and cannot run on any other install. **`CHK-03.invoked_by` moves today, not here.** |
| **2.16** | The merge of 32 axes across two `basis_root`s. `register_class` must not collapse. All nine near-duplicate clusters are now fully registered or wholly unregistered, zero partial; **two same-author pairs are wholly unregistered and silent, and B6 fires as a false positive the moment either gains one member.** The 1.9 addendum carries the test to apply. |
| **2.17** | 1.5's state-record schema, with S1 and S2 applied. |
| **3.2** | C1 is live and verified by running the router: an app question about the economic half returns `LITERATURE`/`ANSWERED` from a literature summary with a resolving trace. `valueModel` is not a missing name in a return list — it lives in the `VALUE-CORE` island at `lsei/index.html` 7797–8448 and `app_model.js` never opens that island. `margin_prop` is not among `model()`'s 26 output keys. FIX-10's fixture is **red on purpose** with C1 as its close condition, not green; and its question text names "Commercial Led" where the preset label is "The Commercial Break". |
| **3.8b** | `oracle/lib/claim_bearing.js`, per §5.1. |
| **The Engineer, before 2.15** | Rule that an excluded app node's `app_surface` string is its exclusion sentence. Six modeled app sections carry a tier of `-`; without the ruling, four axes refuse on every question touching the excluded nodes, which is exactly where the corpus is supposed to do the work. |

**Repairs owed to the record, none optional and all cheap.** The loose-ends register violates its own
closed status vocabulary on twelve of forty-four rows across three undeclared values, and disagrees with
1.6's handoff table on two more. The progress log states an ordering invariant about itself that is
false. `accumulator.md`'s header said "at the close of Step 0" and is corrected at this close.
`CLAUDE.md`'s read sequence does not name `step1_orchestrator_verification.md`, even though the gameplan
tells the reader it is the first thing to read. `step1_author_rulings.md` says "fold in at that point"
about 1.12, which landed, and the fold-in has not happened; it also carries two explicit "flag at the
Step 1 close" items, both ruled at §5.1 and §5.2.

**Three verified negatives worth carrying forward, so nobody re-litigates them.** `verify_report.js` is a
real verifier — checked by running it: `node --check` clean, loads the real app, exits 0 on a clean
document, fires two independent defect classes separately, self-proves against seven planted decoys — so
the author's ruling to drop it rests on accurate grounds rather than on a belief that it was a fragment.
The three treaty `.txt`/`.md` pairs are a **prospective** hazard with no live instance: verbatim 10-gram
overlap of 7.4%, 7.6% and 8.0%, all below the 10% bar this project set at Step 0. And
`literature/FIELDS.tsv` and `INDEX.tsv` are now admitted by `.gitignore` — I re-ran the probes at this
close — but they must land in the same commit as the corpus.

**And the standing rule from §4**, which is the process change this step's own defects earn: a number
does not cross a boundary unless the seat relaying it ran the operation that produces it, and the relay
carries the operation.

---

## 8. What I will check at the Step 2 close

Stated now so it is a test rather than a retrospective judgement.

1. **`literature/` exists, the corpus is in it, and `_intake/` is empty.** That is Objective 1 and it is
   binary.
2. **Every count produced by the merge arrived with its counting rule at the moment it was measured**,
   not corrected afterwards. This is the actual test of 1.12, and Step 2 is the first step where the
   answer can be anything but "not yet."
3. **`tools/quantities.js` exists, has a check-register row, has an invocation point, and can exit
   nonzero.** If it does not, E16 is not closed, and I will say so rather than counting the contract as
   the closure.
4. **The sixteen live counting failures are zero, and the number was produced by running the checker
   rather than by reading a table.**
5. **`oracle/AMENDMENTS.tsv` has no `owed` row naming a quantity id that another `owed` row also names**,
   and every collision that existed was ruled rather than absorbed.
6. **"Nothing verifies the verifier" is no longer true.** Some mechanism records who ran which operation
   before a figure reached the author. If Step 2 produces zero relay errors with no such mechanism, I
   will treat that as luck rather than as a fix.
7. **`CHK-09` is split before any hook is wired**, and a commit on a fresh clone does not recurse.
8. **The two register sets merged without collapsing `register_class`**, and the tension between the
   economics prompt and The Space Resources Engineer is still legible in the merged file as data.
9. **The Software Engineer's 1.4 assertion-count position was answered**, by The Systems Engineer or by
   the author, rather than lapsing.
10. **Every Wave 2 review input is on disk.** Exception C does not repeat.

### The falsifiers for Step 2

**Falsifier 1, on the promotion ruling (§5.4).** I ruled promote-then-amend. **If any promoted file and
its `cr_scratch/` source block are both edited during Step 2**, the ruling was wrong and the
`cr_scratch/` blocks should have been deleted at promotion rather than retained as record.

**Falsifier 2, on the reconciliation owner (§1, R-5).** I gave 1.14 to The Engineer on the ground that he
is the least conflicted seat. **If the collision list he returns misses a collision a later reader finds
by hand**, the constraint I applied was the wrong one and the job needed the persona with the most
context rather than the least conflict.

**Falsifier 3, on the common-cause ruling (§4).** I ruled that the defect rate does not fall by
correcting instances, and that the two fixes are `tools/quantities.js` and the boundary rule. **If Step 2
lands both and the relay-error count is not zero**, my diagnosis was incomplete and there is a third arm
I have not found.

**Falsifier 4, on the verdict (§1).** I ruled that Step 1 needs a revision pass rather than another
cycle. **If the revision pass produces a new blocking finding against a contract Wave 2 already
reviewed**, then Wave 2 was not the right review and the step needed a second technical wave, not a
revision.

### One thing I am watching that is not yet a finding

`oracle/` is about to acquire fifteen files, two new registers, a manifest and a library, and nothing
states what belongs in it. It began as the answering machinery's directory and has become the contracts
directory by accretion. That is how a directory map gets decided by accident, which is the failure mode
1.1's own preamble was written against. If a sixteenth artifact lands in `oracle/` during Step 2 without
a map row, the person to tell is The Systems Engineer, who owns the map and predicted this class of
drift once already.

---

## 9. The accumulator

Written at this close per A.5.2, in `accumulator.md`. Entries for every persona that ran: The Designer,
The Systems Engineer, The Software Engineer, The Engineer, The Space Resources Engineer, The
Fact-Checker, and The Manager under both prompts. The header no longer says "at the close of Step 0."

---

*The Manager, Step 1 close. Fourteen of fourteen delivered, four exceptions named and one of them closed here, five revision items
owed, one gate still ahead.*
