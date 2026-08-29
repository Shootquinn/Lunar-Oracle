# The model tier

**Contract version: 1.** Sub-step 8.5, Wave 5. The table below is the gameplan's ruled table, carried
into `oracle/` verbatim; where this file and `lunar-oracle-gameplan.md` §"The model tier, ruled at
8.5" disagree, the gameplan is the ruling and this file is the bug.

**Default: inherit the session.** Opened in Opus, everything is Opus. Opened in Sonnet, everything is
Sonnet. The tiers below are a floor when the session does not say otherwise, never a ceiling on a
session the author opened deliberately.

**The constraint that decides this, from the author:** *"We can't always assume everyone has Opus or
can afford to use it. And Sonnet is quite capable except for image analysis."* This repository is
meant to be cloned and run by someone who is not the author, so **a tier the reader may not have is
not a floor, it is a barrier.** Every seat below is specified so the work is correct at Sonnet.

## 1. The table

| Seat | Floor | Why |
|---|---|---|
| Orchestrator, The Manager | Sonnet | Holds scope and sequencing against a written contract. |
| Lit-review fan-out, first-pass retrieval, field tagging, high-volume extraction | Haiku | Mechanical and wide, and the lit review has to be fast. This is where the parallelism is. |
| Reading a source and judging whether a claim is supported | Sonnet | The judgement that catches a claim attached to the wrong paper. It is careful reading, not a model tier, and it is specified as a procedure -- open the cited file, search for the claim's own words, quote what is there -- so that it is reproducible rather than dependent on who is reading. |
| Composing a `CONTESTED` answer, one persona per side | Sonnet | The anti-synthesis rule is a written discipline. A persona briefed on one side's leaves and given no others cannot synthesise what it has not been handed, which is why the rule is enforced by the brief rather than by the reader's restraint. |
| The transfer gate: `legitimate` / `illustration` / `unknown` | Sonnet | The verdict rules are written out with their falsifiers. |
| **Anything involving an image** -- a PDF page image, a figure, a scanned table, a plot read for its values | **Opus** | The author's stated exception, and the one place a tier genuinely changes the outcome rather than the comfort. |

**The escalation rule.** *The Manager may escalate any seat by saying so in the brief and needs no
reason beyond wanting a second quality of attention on something. A seat that hits an image escalates
on its own without asking.* Escalation is always available and never assumed.

## 2. The corollary, which is the part that does the work

**Where correctness currently depends on how carefully someone reads, write the procedure down
instead.** A tier is a hope about attention. A procedure is a thing a reader can run and a checker can
verify ran. Every row in the table above that reads `Sonnet` reads `Sonnet` because the judgement it
names has been converted into steps, and where a judgement has not been converted the honest entry is
not a higher tier — it is an open item.

**Source verification, written out.** This is row 3's procedure. It is also
`oracle/deliverable_shape.md` §3's, stated there in the same words, and the two must not drift.

1. Open the cited file at the path in the trace line.
2. Search it for the claim's own words — the number, with its own units and its own separator as the
   summary spells them.
3. Quote the line that comes back, with its line number.
4. **Decide whether that line is the file's own result or the file citing somebody else's.** A
   citation carries an attribution in the same sentence.

Step 4 is the step that catches a claim attached to the wrong paper, and it is separate from step 3
because a summary that reviews its predecessors contains its predecessors' numbers. A grep does not
know the difference. `luchsinger-2021-lcross-water-modeling.md` carries `5.6 plus or minus 2.9` at
lines 23 and 47, attributed in the same sentence to Colaprete — a live instance of the failure, in
this corpus, on the axis the worked example uses.

**What "read carefully" would have cost.** Four steps at Haiku produce a quotable line and a
yes-or-no on attribution. "Read carefully" at Opus produces a judgement nobody can re-run. The first
is reproducible at any tier; the second is reproducible at none.

## 3. A correction this table owes, kept visible

An earlier draft of 8.5 made Opus the non-negotiable floor for source verification and cited Wave 4 as
the evidence: twelve register claims attached to the wrong paper, every one caught by careful reading.
**That is not evidence for a tier.** Wave 4 ran no Sonnet arm — every seat ran on the session's own
model — so there is no comparison in it, and "the work went well" was written up as "the tier was
necessary." An uncontrolled result presented as a controlled one is the defect this project has spent
four waves finding in other people's artifacts. Recorded here rather than quietly deleted.

**What would settle it.** A Sonnet arm on a task with a known answer: run the twelve Wave 4 register
claims through the four-step procedure at Sonnet and count how many of the twelve mis-attributions it
returns. Twelve of twelve settles the row. Fewer than twelve is the first real evidence this table has
ever had for a tier, and it would be evidence for *this* row and no other.

## 4. The hazard, named now so it is not discovered later

A fast Haiku lit review feeding a slower verification pass produces a corpus whose claims are cheap to
make and expensive to check. That is the right way round **only if the verification pass actually
runs**. Skipped for speed, it yields a large corpus of unsupported claims that looks exactly like a
good one — the container-versus-content pattern at corpus scale. **The lit review does not close until
its verification pass has run.**

**Stated as a close condition rather than as a warning**, because a warning about a pass being skipped
is read by everyone except the person skipping it:

> A lit-review fan-out is **open** until, for every summary it produced, the four-step procedure of §2
> has run against every claim that summary contributes to a register row or to a deliverable. The
> fan-out's own report states the two denominators — summaries produced, summaries verified — and a
> report that states one without the other has not closed.

The two denominators are the whole mechanism. "Verification complete" over a verified population of
zero is byte-identical to verification complete over all of them, which is the defect sub-step 8.9 is
open on elsewhere in this repository.

## 5. What this file does not rule

It does not rule which model a session opens in. That is the reader's, and it is why the default is
inheritance rather than a floor everywhere.

It does not rule cost. The author's constraint is availability — *"can't always assume everyone has
Opus"* — and a table that argued from price would be arguing from a number that changes without anyone
editing this file.

It does not make Haiku work correct by declaring it a floor. Row 2 is `Haiku` because §4's close
condition exists. **Remove the close condition and row 2 becomes indefensible**, and the two must move
together or not at all.
