# Step 0 — The Manager Closes

**Project:** Lunar Oracle
**Date:** 2026-08-26
**Sub-step:** 0.7 (A.4 step 7)
**Contract set at 0.1:** nine sub-steps — 0.1, 0.1b, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8

---

## 1. Verdict

**Ready for the author, with three items escalated rather than resolved and one condition on the
gate itself.** Another cycle is not warranted. Nothing that remains open would be closed by running
the same personas again — the open items are an author ruling, a first commit, and a defect whose
fix is a one-line correction to a companion file.

The condition: **the deliverable does not yet exist in the sense the plan assumes.** See §6.

---

## 2. Scope ruling

### The nine sub-steps

All nine ran. 0.7 is this document; 0.8 is the orchestrator's. Nothing scoped was quietly dropped,
and the one row that was removed — `GATE-1` — was removed for a stated structural reason with its
assertion list surviving verbatim, which is removal done correctly rather than a quiet drop.

### The six objectives

**All six covered.** Checked by tracing each objective to the sub-steps that deliver it, not by
reading the step titles.

| Obj | What it asks | Where it lands | Ruling |
|---|---|---|---|
| 1 | Integrate the two corpora | Step 2, all 18 sub-steps; identity at 2.1–2.2, taxonomy 2.3, merge 2.4–2.5, house format 2.6 | **Covered.** The primary assignment has the largest step, which is the right shape |
| 2 | Stand up the repository, bootstrap | 1.1, 1.4, 1.5, 1.6; Step 6 (6.1–6.5) | **Covered** |
| 3 | Define the answering loop | 1.3, 1.11; Step 3 entire; Step 4 entire; 5.2 | **Covered** |
| 4 | The register split and its enforcement | Step 5 (5.1–5.3), specified at 0.4 | **Covered.** F2 discharged: enforcement is a mechanism with decoys, not a prompt |
| 5 | First-run experience, once | 1.5 (state record), 6.6 (mechanism), 6.7–6.10 (content) | **Covered.** F3 discharged: the state question has an owner |
| 6 | A complete gameplan | Step 0 itself | **Covered**, subject to §3 below |

**One label is wrong and it is not a coverage gap.** The Steps table tags Step 3 as "Objectives 3
and 5." Step 3 is the app boundary and retrieval; not one of its ten sub-steps touches the first-run
experience, which is Objective 5. The tag is spurious in both the gameplan and the integration
draft. Objective 5 is genuinely covered by Step 6, so nothing is missing — but a reader auditing
coverage from the step titles would be misled, and the correction is two words in two files.

### The open questions

**Eight questions. Four closed by the author, one answered and corrected, three answered by the
draft but not marked as answered.** That last group is a real defect in the deliverable, and it is
the kind that costs an author time at exactly the wrong moment.

Questions 3, 4 and 5 are each answered inside the plan — 3 by loose end D4 and sub-step 1.6, 4 by
The Software Engineer's wave selector at 3.9, 5 by D3 and sub-step 3.1, where three personas took
three compatible positions. But the Open Questions section still presents all three in their
original interrogative form, with no pointer to the answer. An author reading that section at the
gate sees three unanswered questions and has no way to know that two of them have been settled by a
mechanism and the third by three concurring specialists.

**Ruling: the criterion is met in substance and failed in presentation.** Each of the three needs one
sentence naming where it was answered and by whom. That is a 0.6 correction, not another cycle.

### TDD stages as ordered sub-steps

**Met, and it is the strongest part of the plan's structure.** Roughly 20 of 72 rows are TDD stages
split out rather than folded into a build row: 6.2–6.5 (`CLAUDE.md`), 6.7–6.10 (first-run content),
6.11–6.14 (`README.md`), 7.4–7.7 (sampling protocol), plus 1.11, 3.6, 4.1 and 4.5. Another seven are
assertions written before the thing they assert (2.4, 2.10, 2.13, 2.15). No step encodes document
production as an undifferentiated "draft" or "edit" row, which A.6.2 forbids.

Step 6 states the rule in its own heading — every prose deliverable is staged suite, outline, write,
revise — and cites my F1 for why the precondition did not fire on Step 0 and does fire on all of
these. That is the right disposition of my own ruling and I did not have to ask for it.

### A.6.2 required sections, including the echo site registry (my F5)

Objectives, Document structure, Steps, Context recipes, Progress log, Design notes, Open questions:
**all present.** Document structure is deferred with a stated reason and a named later owner, which
A.6.2 permits for a project whose first deliverable is a corpus rather than a document.

**The echo site registry exists and failed its first test. This is the one finding at close that is
mine alone.**

The registry lives at §8 of `cr_scratch/step0_integration_draft.md`, not in the gameplan. I accept
the location: the gameplan argues, correctly and in this project's own inherited words, that
duplicating a plan that is going to change creates a second copy and a copy drifts. A pointer is
sufficient if the pointer is unambiguous, and it is.

What is not acceptable is what the registry now contains. The Fact-Checker found at 0.5 that "89 of
95 byte-identical" is 87 of 95, with eight differing files named. **That correction was applied to
the gameplan and not to the registry.** The registry still reads `89 / 6` in its value column, and
§9.2 of the same file still reads "89 of 95 pairs are byte-identical." The single artifact whose
entire purpose is to stop a value drifting across locations is now the location the corrected value
did not reach.

I am not calling this an integration failure. It is a process failure and it is mine to name: **0.6
revised the gameplan and did not revise the companion file the gameplan makes authoritative.** The
registry is a document that gets consulted rather than a gate that gets passed, and that is exactly
the failure mode The Recruiter identified for the contested-claims register and solved by making it
structure. The same solution applies here and is not yet scheduled.

**This connects to the deeper finding below and is the same defect.**

### The systemic defect behind six of the Fact-Checker's findings

Her eleven contradictions are the visible number and her **six unsupported findings are the
important one**. Three of the six — the DOI coverage figure, the author-year cluster count, the
marker-convention count — are numbers stated without their counting rule, and a fourth is a
denominator that cannot be reconciled with its own re-run. That is not four incidents. It is one
common cause: **this project generates counts faster than it records their counting rules.**

The evidence that it is systemic rather than local is that the corpus counts which *do* carry their
basis behave well. The 158-versus-152 pair caused no confusion once each was written with its basis
attached, and the registry's "Definition — what exactly is counted" column is precisely the right
instrument. The column exists. It is simply not where counts are born; they are born in agent output
and only some of them reach the registry.

**The process fix, which belongs in the plan rather than in this document:** no count enters a
document without its counting rule, and the registry is the gate a count passes rather than a place a
count is later copied to. That is a sub-step, it is small, and nothing currently owns it.

---

## 3. The granularity ruling

**72 is the honest decomposition. I am not producing a consolidation list, and I decline to
manufacture one to look decisive.**

The question was fair and nobody had answered it. I answered it by measurement rather than by
feel, because "does this look like too many rows" is not a question anybody can answer by looking.

**Test 1: does row size track the author or the work?** If five specialists each wrote at their own
preferred resolution, the row counts per author would scatter. Counted by origin prefix across the
72: ARCH 15, LOOP 15, MERGE 15, ECON 13, LUNAR 9. Three of five landed on exactly fifteen. The
spread across five agents who never coordinated is six rows, and the low outlier is The Space
Resources Engineer, whose deliverable was largely registers shipped as data rather than build steps
— which is a property of his work, not of his resolution. **This is common-cause variation. Nobody
needs normalizing.**

**Test 2: is the step-size spread evidence of anything?** Step 2 holds 18 and Step 5 holds 3, and
that was the stated reason for suspecting a problem. It is not evidence. Step size is downstream of
where each author's rows land in the dependency order, not of how finely anyone chose to write. Step
2 is eighteen because it is Objective 1 and the design intent says nothing else in this project works
without it. Step 5 is three because it is one objective, implemented by one persona, with three
tools. Eighteen against three is a merge being harder than a register check.

**Test 3: what is actually available to cut?** About 20 rows are TDD stages that A.6.2 forbids
folding into a build row, and the plan's own design note records that the Japanese Miracle project's
Phase 7 failed audience acceptance because exactly those stages were skipped. Seven more are
assertions-before-execution, same category. That leaves roughly 45 discretionary rows across seven
steps — about six per step, which is not padding.

**I considered one cut and rejected it, and the reasoning is worth recording.** Sub-steps 7.4–7.7
take the sampling protocol through all four TDD stages. Its reader is the team, not a user, so the
case for collapsing it to one or two rows is real: four stages on an internal process document is
close to the ceremony The Software Engineer's own gate exists to catch. I rejected it because A.6.2's
prohibition carves out no exception for internal documents, and because the one time this lineage
skipped those stages it paid for it. Cutting three rows to buy a rule violation is a bad trade.

**What I want the author to hear instead: the count is not the risk, and cutting rows does not
reduce it.** The Systems Engineer declined to certify 72 as a schedule and called it a schedule risk
rather than an integrity defect. He is right on both halves. But seventy-two rows compressed into
forty is the same work with fewer gates — the risk is unchanged and the visibility is worse. The
lever that actually moves a schedule is the **gate cadence**, and the cadence is already fixed at
seven by the author's own numbering ruling.

**The one schedule lever I do offer, and it is a deferral rather than a cut.** Step 7 — findings,
standing tensions, the sampling protocol, seven sub-steps — is a **dependency leaf.** I checked:
every dependency into Step 7 originates inside Step 7 (7.2 and 7.3 on 7.1; 7.5, 7.6, 7.7 in
sequence), and nothing outside it depends on any of its rows. It can be deferred whole, after first
light, without blocking anything. Every row in it stores something the plan could not resolve, so
deferring it costs the project its memory of its own unresolved problems and costs it nothing else.

That is the honest trade to put to the author: seven rows of institutional memory against schedule.
I recommend keeping it, and I note that Step 7 currently runs *after* the public release gate at
6.15, which is worth a moment's thought but is not wrong.

**One thing the author should know about the number itself.** Seventy-two sub-steps is not
seventy-two ideas — that phrasing is The Systems Engineer's and it is right. It is also not
seventy-two gates. It is seven gates, and the author is asked to rule seven times.

---

## 4. Rulings on the four items I was asked to weigh rather than take on faith

### 4.1 Was the Fact-Checker's verification adequate, given that one of her own findings was wrong?

**Adequate. The error raises my confidence rather than lowering it, and I want to be precise about
why.**

She returned 46 rulings and one was wrong, and it was caught by re-running her own procedure. The
failure mode that would actually worry me is a verifier whose findings cannot be reproduced —
because then a wrong one is undetectable and every right one is unfalsifiable. Hers state their
method per finding, which is why the error surfaced at all. A verifier who is occasionally wrong and
always reproducible is worth more than one who is never caught.

What she should be credited with beyond the tally: inside her own C6 she wrote that the trigger this
number closes should be re-run against a stated basis. **That sentence changed a Manager ruling at
close** (§4.3). A reviewer whose reasoning moves the scope-holder rather than only the text is being
used correctly.

### 4.2 Does my F1 ruling still hold, now that Step 0 has produced an 806-line document a cold session must operate from?

**I hold it, and I record what it cost.**

The ruling was that the TDD precondition does not fire on Step 0 because Step 0's deliverable is an
operating contract rather than a document with a reader. That was right about what Step 0 *was*.
What has changed is that the artifact grew a reader — the cold session, and the stranger who cloned
the repository — and A.10 step 7 requires audience-comprehension acceptance tests for reader-facing
deliverables.

**The Designer's finding is the price of my ruling, and I will name it as such rather than let it sit
unattributed.** "Works as a briefing, fails as a worklist" is exactly the defect an
audience-comprehension test would have caught before the document existed, instead of after it was
806 lines long. Most of his fourteen structural items landed at 0.6, so the cost was paid rather than
avoided, but it was paid at the expensive end.

I do not reopen the ruling, because imposing a test suite retroactively on a finished gameplan is
ceremony — it would validate a document nobody would then change. What I do instead is note that the
mitigation is already in the plan and is stronger than the thing it replaces: every prose deliverable
downstream is staged, and Step 6 says so in its own heading. **One addition is warranted**: the
gameplan itself becomes the operating contract for a cold session at the moment Step 1 opens, and
nothing schedules a re-read of it against that reader. That is one row, and it should sit early in
Step 1.

### 4.3 The second-gap disagreement (D5). Do I close it?

**No. I narrow it, and I want to be exact about why, because the easy move here is to close it and
look agreeable.**

My trigger was: recruit immediately if The Engineer reports that the 95 overlapping pairs disagree
substantively rather than cosmetically. It fired negative. But the number it fired on has now been
stated three ways — 89, then 87, then a pre-dedup reconstruction of 90 — and the Fact-Checker herself
wrote that it should be re-run against a stated basis.

**The verdict survives the discrepancy and the reasoning does not.** Whether it is 87 or 89 of 95,
the overlap is overwhelmingly identical and "cosmetic" is the right word for it. So the trigger fires
negative on any of the three numbers, and I do not need the basis settled to accept that.

What I do need, and do not have, is the eight differing files. **Byte-identical is a proxy for
"agree." Differing is not a proxy for "disagrees substantively."** Three of the eight differ because
of this session's own deduplication. The other five differ for reasons nobody has read. My trigger
was written about substantive disagreement and it fired on a byte comparison, which is a weaker
instrument than the question deserved.

**Ruling: the trigger is narrowed from all 95 pairs to the eight that are not byte-identical, and it
stays armed until sub-step 2.2 reads them.** 2.2 resolves the duplicate set and reads those files
anyway, so this costs nothing and buys an honest answer instead of a proxy one. The Recruiter's own
trigger did not fire either and stays armed on its own terms.

The disagreement therefore stands, unresolved, exactly as the gameplan records it — and it is worth
saying that this is the method working. The Recruiter's three-owner artifact assignment was better
than my proposal and I said so at rev. 1. Neither of us has been shown wrong. The triggers are the
operative part either way, and both are now sharper than they were.

### 4.4 Loose end E9: zero commits

**This is the most serious open item at close and it is not a documentation defect.** I verified it
directly rather than accepting the row: `git log` reports no commits on `main`, and `git ls-files`
returns zero tracked files. `.gitignore`, `CLAUDE.md`, `accumulator.md`, `cr_scratch/`, `tools/` and
the gameplan itself are all untracked.

Three consequences the author should see stated plainly.

*The directory map is currently fiction.* It says `cr_scratch/` is "committed on purpose (A.3.5): it
preserves agent reasoning for audit." Nothing is committed. The entire reasoning record of Step 0 —
fourteen files, 8,400 lines — exists on one disk with no history and no second copy.

*Every row in the loose ends register marked FIXED is weaker than it reads.* The register says so
itself, which is to its credit. But "fixed and verified" against an untracked working tree means
fixed until somebody edits the file, with nothing to diff against and nothing to revert to.

*The `gott-2024` abstract rewrite exists in exactly one place in the world.* It is
Japanese-Miracle-unique, so it has no upstream copy, and `_intake/` is in a repository with no
commits.

**This does not block the gate and it should be fixed before the gate rather than after.** The first
commit is not project work; it is the act that makes Step 0's deliverable exist in the sense the plan
assumes. I would not open Step 1 against an untracked tree.

---

## 5. Accumulator

**Written.** `accumulator.md`, all eleven personas that ran this cycle: The Manager, The Software
Engineer, The Systems Engineer, The Designer, The Engineer, The Editor, The Writer, The Fact-Checker,
The Space Resources Engineer, The Recruiter, The Growth Economist. The three standing personas who
did not run — The Loftsman, The Topologist, The Motor Designer — carry a one-line note that there is
no geometry in this project, so a future session does not read their silence as an omission.

Each entry carries what A.5.3 asks for: contribution, disposition (accepted, modified, corrected),
corrections received, and positions that remain live. Two entries were written with a specific future
reader in mind, as instructed and because both judgments are mine to make:

**The Systems Engineer** is recorded as *the persona whose predictions are worth loading*. He named
his own most likely failure in advance, in writing, before the plan existed. It half-occurred. He
then verified the catch by exhaustion rather than accepting integration's report that it had been
fixed. A persona who does both of those things has earned a different prior on his next prediction,
and a future Manager building his spawn prompt should know that before deciding how much weight to
put on his falsifiers.

**The Growth Economist's** entry is written as the evidence the author is ruling on at 0.8, because
the seat is provisional. It records four things the seat produced that no standing persona would
have: the transfer gate, the three-class retrieval invariant, the FA1–FA8 corpus ruling, and the
finding that the corpus carries no primary pro-targeting source and would therefore return a
confident one-sided answer on industrial policy that passes every other check in the plan. That last
one requires knowing which side of the Japanese debate each source is on. It is not a gap a
generalist finds. If the author declines to confirm the seat, that is the capability being declined.

---

## 6. What I hand to 0.8

**Three items for the author's decision, ranked.**

**1. Confirm The Growth Economist, and the A.9 tension that comes with him.** This is the only one of
the three where a "no" changes the plan rather than a date. The evidence is in his accumulator entry
and in the Recruiter's specification. The tension The Recruiter proposes adding — Growth Economist
against Space Resources Engineer, necessary conditions from opposite directions, do not resolve — is
part of the same ruling, and the secondary tension against The Fact-Checker is the one I would
actually keep: she catches fabrication, he catches correctly cited sources doing work they were never
licensed to do, and the second is this project's real failure mode.

**2. Rule on Step 7, which is the only schedule lever that does not destroy work.** It is a
dependency leaf and can be deferred whole. I recommend keeping it and I am content to be overruled,
because the cost of deferring it is institutional memory rather than capability. This is where the
72-versus-fewer conversation should actually happen, and it is a better conversation than a
consolidation list would have been.

**3. Decide whether the repository is committed before Step 1 opens.** My recommendation is yes, and
before the gate rather than after. Until then the directory map describes an intention, the register's
FIXED rows are weaker than they read, and Step 0's entire reasoning record sits on one disk.

**Three corrections owed at 0.6 before the gate, none of which needs a persona.** (a) The `89 / 6`
row and the §9.2 trigger line in the integration draft's echo site registry, which the Fact-Checker's
correction never reached. (b) The three answered-but-unmarked open questions — 3, 4 and 5 — each
needing one sentence naming where it was answered. (c) The spurious "Objective 5" tag on Step 3, in
two files.

**One thing nothing owns, and it should become a sub-step in Step 1.** No count enters a document
without its counting rule, and the echo site registry is the gate a count passes rather than a place
a count is later copied to. Six of the Fact-Checker's findings are that one defect, and it will
recur at every step of this plan that produces a number — which is most of them.
