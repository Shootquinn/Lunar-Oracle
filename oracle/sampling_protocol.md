# The sampling protocol

**Written against answer contract version 2.**

Three failures survive a fully green test suite, and a sampled human read is the only mechanism that
reaches them. A sample without a stated rate and a stated denominator is a story rather than a
measurement.

## 1. What the suite cannot reach

From `cr_scratch/step0_software_engineer_loop.md` §5.4, in its own words:

1. **Whether a retrieved summary supports the sentence beside it.** The trace proves the file resolves
   and that its body contains the matched topic words. It does not prove the file supports the claim.
2. **Whether the answer should have been a refusal.** No router can observe that it fabricated an
   answer it should have refused, because detecting that requires exactly the independent judgement
   the router is not.
3. **Whether the answer is any good.** Not a test.

The suite makes the mechanical failures impossible and the judgement failures countable. It does not
make the judgement failures impossible, and a suite claiming otherwise would be the epistemic theater
this project bans.

## 2. The rate

**Sample one run in five each week, never fewer than five rows and never more than forty.** Where the
week produced fewer than five runs, review all of them.

Each bound exists because of a specific failure.

**The one-in-five ratio** is the working figure the loop specification used when it stated what an
honest result looks like: forty sampled out of two hundred and ten run. It is a rate a single
reviewer can sustain, in a protocol whose enforcement is somebody's Friday.

**The floor of five** stops a quiet week from producing a proportion that is really an anecdote. One
in five of twelve runs is two rows, and two rows support no statement about a population.

**The ceiling of forty** stops the protocol from lying in the other direction. A reviewer opening an
answer and every locator it names is doing real reading, and a protocol that demands eighty of them
gets a rubber stamp instead of a review. Past two hundred runs in a week the sampled fraction shrinks,
and the report says so on its face.

## 3. The draw

Draw **proportionally by verdict** from the week's rows, so that the sample's composition matches the
population's. Then **add one row for every verdict the week produced that the proportional draw
missed**, and keep the two sets apart for the rest of the procedure.

The top-up exists because volume and risk are not the same thing here. `LITERATURE` dominates by
count, while `CONTESTED` is the verdict where the anti-synthesis rule can fail without anything
mechanical noticing, and a purely proportional draw over a normal week can miss every `CONTESTED` row
there was.

**The two sets are never pooled into one proportion.** The proportional rows estimate a rate; the
top-up rows are read for defects and reported as counts. Folding a deliberately over-sampled class
into the rate would inflate or deflate it by an amount nobody could recover afterwards.

Record the draw so somebody else can reproduce it: the log file, the row range, the seed or the
enumeration rule, and the per-verdict counts of both sets.

## 4. What the reviewer is checking

For each drawn row, open the deliverable at the path the log records, and open every locator the
deliverable names. Then answer four questions, in this order.

**Does each cited file support the sentence beside it?** This is the question the system explicitly
never answered. A `resolution-only` trace claims that the path exists and the named text is present at
it, and nothing more. The reviewer is the first and only reader who checks the step from *the file is
there* to *the file says this*.

**Should this answer have been a refusal?** If yes, the row is `FILLED`. This is the one judgement
that has a column.

**Should this refusal have been an answer?** If yes, it goes in the report as a named finding, with
the row's timestamp. It does **not** go in the log, because there is no value for it — see §7.

**Is the answer any good?** Free text in the report. It is not a test and it is not annotated, and
pretending otherwise would turn a judgement into a statistic.

## 5. The three denominators

**Report the result as a proportion with all three denominators, and never as a count.** Contract §8
makes all three countable from the log's two columns.

```
3 FILLED out of 40 reviewed, of 210 run
```

"Three FILLED" is theater. It is compatible with a system that is working and with one that is
failing, and the reader cannot tell which. The three numbers together say how big the problem is, how
hard anybody looked, and how much of the system nobody looked at.

Print the top-up rows on their own line, with their own counts, immediately under the proportion.

## 6. Writing it down

Seven steps. The order matters: freezing the window before drawing is what keeps the population from
moving under the sample.

1. **Freeze the window.** Name the log file, the date range, the run count, and the contract version
   each row executed under. Rows that ran under two contract versions are two populations, and they
   are sampled and reported separately.
2. **Draw**, per §3, and write the draw down before reading anything.
3. **Read each row** against §4's four questions.
4. **Write the `review` column by hand**, one row at a time, to `confirmed` or `FILLED`. It is never
   machine-written and never batch-set. A batch-set column records that somebody ran a command, not
   that somebody read an answer.
5. **A row whose deliverable is gone stays `unreviewed`** and is counted as undrawable. It reduces the
   reviewed denominator. It is **not** replaced by a fresh draw, because replacing it biases the
   sample toward rows whose files survived, and file survival is not independent of anything.
6. **Everything that does not fit the column goes in the report**: over-refusals, traces that resolve
   to files that do not support the sentence, and the free-text judgement.
7. **Report**, per §5. Report a week with no runs as `0 FILLED out of 0 reviewed, of 0 run` rather
   than skipping it. A skipped week and a clean week are indistinguishable in a series, and the whole
   value of a series is telling them apart.

**A recorded `review` value may be corrected.** A person can be wrong about a row, and pretending
otherwise makes the first mistake permanent. The correction is a line in the next report naming the
row, the old value, the new one and the reason. A silently changed annotation is an annotation nobody
can audit.

## 7. What this protocol never does

Six. Each one turns the measurement back into a story.

1. **Never lets the router assign `FILLED`.** The separation is a column rather than a convention
   because detecting an over-answer requires the independent judgement the router is not.
2. **Never reports a bare count.** Three denominators or nothing.
3. **Never replaces an unreviewable row** with a fresh draw.
4. **Never pools rows from two contract versions**, or from two corpus read-digests. Figures at
   different digests are not comparable, and a pooled proportion hides which half moved.
5. **Never folds the top-up rows into the rate.**
6. **Never records an over-refusal in the log.** The `review` column is closed at `unreviewed`,
   `confirmed` and `FILLED`, and none of the three means *this should have answered*. Marking such a
   row `confirmed` is false and leaving it `unreviewed` is false, so it is reported outside the log
   instead. **That is a workaround for a missing column rather than a design.** Closing it properly
   means a fourth value in `review`, which changes the row schema and is therefore an answer contract
   version bump. Until somebody takes that bump, the finding lives in the report.

## 8. A correction to the loop specification

`cr_scratch/step0_software_engineer_loop.md` §5.4, this protocol's source, states the second
untestable item as *"whether a refusal should have been an answer. FILLED."* That is backwards.
`oracle/answer_contract.md` §8 defines `FILLED` as *the run answered where it should have refused*, and
the inherited prototype at `lsei/oracle/verify_answers.js` agrees with the contract in the same words.
This protocol follows the contract. The correction to §5.4 belongs to its author.
