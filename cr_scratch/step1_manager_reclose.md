# Step 1 — The Manager Re-Closes

**Project:** Lunar Oracle
**Date:** 2026-08-27
**Sub-step:** Step 1 re-close (A.4 step 7, second pass)
**Author:** The Manager
**Duty:** rule whether the revision pass discharged the six items I returned, re-rule my two fired
falsifiers and my common-cause finding, rule the concurrency defect, restate what Step 2 inherits,
and append the revision pass to the accumulator.

Every number in this file was produced by a command I ran in this session. Where I quote a figure
somebody else produced, I say whose it is.

---

## 1. Verdict

**Not ready for the author. Two items remain. Both are halves of items I already returned, both are
one seat and a few hours, and both are the same defect: a correction that reached one site and not
its echoes.**

I am not deferring either into Step 2 and I am not accepting a conditional close.

The state has changed enormously and that belongs on the record before the refusal. At my first close
nothing was promoted, fifteen target paths were empty, thirty-two counting failures were live with no
checker, roughly forty-five amendments had no holder, and three blocking findings sat inside frozen
text. Today `oracle/` and `literature/` exist and hold seventeen files that a manifest joins to their
review history; two register halves, a manifest checker and an amendment checker run clean; the
counting-rule checker exists, runs, exits nonzero, and holds the failures at eleven, none of which is
in a promoted contract's own text. Four seats did real work and three of them found defects in their
own files while doing it. **The revision pass was the right instrument and it worked.** It did not
finish.

### The measurements, re-taken by me, with nothing else writing

| Command | Exit | `grep -cE '^ *FAIL '` | Summary line |
|---|---|---|---|
| `node tools/quantities.js --check` | 1 | **11** | `NOTE hard failures: 11` |
| `node tools/check_registers.js` | 0 | **0** | `NOTE hard failures: 0` |
| `node tools/ecr_verify.js oracle/REGISTER.lunar.tsv lsei/literature` | 0 | **0** | `ALL PASS` / `FAILURES 0` |
| `node tools/ecr_verify.js oracle/REGISTER.econ.tsv _intake/japanese-miracle/lit` | 0 | **0** | `ALL PASS` / `FAILURES 0` |
| `node tools/quantities.js --lint` | 0 | — | `M13` 13, `M14` 2, **`M15` 5 untagged relays across 2 relay files** |

All four reproduce the clean re-measurement the orchestrator reported. I re-derived the manifest and
amendment censuses rather than reading them. `oracle/MANIFEST.tsv` holds 20 `D` rows, 17 `promoted`
and 3 `superseded`, and **all seventeen promoted target paths exist on disk** — I tested each one
individually. `oracle/AMENDMENTS.tsv` holds 131 `A` rows: **70 owed, 52 applied, 5 superseded, 4
declined.**

### Gate item 1 — R-2 discharged three of seven blocking findings, and four are still owed

My R-2 row read: *"Apply the three blocking review findings to their own authors' frozen text: **S1**
…, **R1** …, **R2** …. **Plus 1.4's four blocking findings F1–F4.**"* Its done-when read: *"Each
finding has an amendment row marked `applied`."*

Measured:

```
$ awk -F'\t' '$1=="A" && $7=="owed"' oracle/AMENDMENTS.tsv | grep BLOCKING
AM-01  oracle/bootstrap_contract.md  §2  1.4-review F1   owed  ABORT is defined twice and the two definitions contradict. BLOCKING.
AM-02  oracle/bootstrap_contract.md  §5  1.4-review F2   owed  partially-acquired turns on an undefined word and contradicts dirty-or-diverged. BLOCKING.
AM-03  oracle/bootstrap_contract.md  §5  1.4-review F3   owed  missing-recoverable is unassignable and the blocking-set partition counts it anyway. BLOCKING.
AM-04  oracle/bootstrap_contract.md  §4  1.4-review F4   owed  Node absent gives CLEAN and BC-4 has no consumer. BLOCKING.
AM-20  oracle/bootstrap_contract.md  §9  1.5 §3.1 row 4b owed  Q-BLOCKING-MODES predicate 3-of-6 to 3-of-5.
AM-38  oracle/install_state.md       §4  1.5/1.13 S2     owed  Rule 4 contradicts the write-whole-or-not-at-all rule. BLOCKING.
```

`AM-01` to `AM-04` are 1.4-review F1 to F4 by their own source column. They are the four I named. They
are `owed`. R-2's own title is *"the three blocking findings"* and his verdict line reads *"All three
blocking findings are applied."* A `grep` over his deliverable for `AM-01`, `AM-02`, `AM-03`, `AM-04`,
`F1-F4` or `1.4-review` returns nothing. **Four of the seven items in R-2's remit were never seen.**

**I verified the first one is live rather than taking the row's word for it.** In the promoted
authority, `oracle/bootstrap_contract.md`:

```
line  42   | `ABORT` | A precondition failed in Phases 1 to 3. …
line 155   **On failure:** a future schema version gives `ABORT` …
```

Line 155 is Phase 5, the state record. The definition at line 42 confines `ABORT` to Phases 1 to 3.
**The contract assigns its terminal state outside the range in which it defines it.** 2.14 and 6.1 are
told to execute against this file, and thirty-four of the 131 amendment rows target it, more than any
other file in the project.

My own stated test at the first close was whether 2.14, 2.17 and 3.2 execute against the frozen text.
On this file the answer is no, in four named places, and those four places were in the revision remit.

### Gate item 2 — the index of record does not contain the fifteenth sub-step

The scope contract is fifteen sub-steps and all fifteen have deliverables. The gameplan does not know
that.

```
$ grep -c "1\.14" lunar-oracle-gameplan.md
0
$ grep -n "^| 1\." lunar-oracle-gameplan.md
264: 1.0  …  through  277: 1.13          14 rows
```

**`1.14` appears nowhere in the gameplan.** The sub-step table I accepted at §5.3 of my close as *the
index* holds fourteen rows, and the sub-step that created `oracle/`, `literature/`,
`oracle/MANIFEST.tsv` and `oracle/AMENDMENTS.tsv` is not one of them.

The progress-log row at line 307 is worse, because it is the paragraph a cold session reads to learn
what Step 1 produced. It is titled `1.0-1.13` and still says:

- *"**Fourteen sub-steps**, five ordered groups, one cycle"* — fifteen;
- *"the corrected `.gitignore` with **18 passing probes**"* — the exact claim R-1 was raised to correct,
  corrected in the table cell at line 265 and left standing here;
- *"**Frozen as specifications and not yet promoted to final paths**"* followed by the list of eleven,
  every one of which is promoted and whose files I listed above.

R-1 corrected one site of a fact stated twice in one file. That is E16 committed inside the repair of
E16, in the document the author reads to know what he is approving. **An author who ratifies against
this map ratifies a step that has no 1.14 and promoted nothing.**

### What closes it

Two items. No third.

| # | What | Owner | Done when |
|---|---|---|---|
| **C-1** | Apply `AM-01`, `AM-02`, `AM-03`, `AM-04`, `AM-20`, `AM-38` to `oracle/bootstrap_contract.md` and `oracle/install_state.md`. They are the 1.4-review and 1.5-review blocking findings, already written and already specific. Rename one of the two `AM-` namespaces while in there (see §3). | The Systems Engineer | `awk -F'\t' '$1=="A" && $7=="owed"' oracle/AMENDMENTS.tsv \| grep -c BLOCKING` returns 0, and both checkers are re-run after |
| **C-2** | Give 1.14 a row in the gameplan's Step 1 sub-step table. Rewrite the line-307 progress entry: fifteen sub-steps, the true probe verdict, promoted rather than not-promoted. Re-title it `1.0-1.14`. | Orchestrator | The table has fifteen rows, `grep -c "1\.14"` is nonzero, and no sentence in the gameplan says Step 1 promoted nothing |

Neither is new thinking. C-1 is four review findings written at 1.4 by The Software Engineer and never
applied, plus two more of the same class. C-2 is three cells.

### What the author is being asked to approve, once C-1 and C-2 land

**He is approving a body of law and the machinery that enforces it, with its edit queue visible and
counted. He is not approving finished text.**

He approves:

1. **Seventeen promoted artifacts at their target paths**, joined by `oracle/MANIFEST.tsv` to the
   `cr_scratch/` files holding their review history. Eight are contracts, two are register halves, and
   the rest are the manifest, the amendment register, the currency record, the counting rule, the
   generated quantity index, the enforcement layer and the checker.
2. **Thirty-three register axes across two namespaces, unmerged**, with `register_class` carrying the
   A.9 disagreement as a typed field rather than as an averaged position. `L1b` confirms no axis id
   occurs in both files.
3. **The four decisions that are rulings rather than repairs**, which he can overturn in one cell each
   and should be told so:
   - `oracle/REGISTER.tsv` will never exist; the sidecar is a **set** of files, one `basis_root` each,
     joined at load (`AM-98`, The Systems Engineer, concurred independently from the schema side by The
     Software Engineer);
   - `Q-CHECK-ROWS` reclassified `fixed` to `live`, so a self-declared size row is a checksum rather
     than a quotation (`AM-108`);
   - the answer-contract version names a **state of the file** rather than a count of changes, so one
     edit is one increment however many changes it carries (`AM-66`);
   - `AM-1` is a **report and not a check** (`AM-109(b)`, The Designer ruling against his own
     specification).
4. **An amendment register with 70 rows still owed**, which is the design working rather than a
   backlog. The register exists so that an owed edit is data instead of a memory. Approving the
   contract set is not approving that no line of it will change.

He is **not** being asked to approve:

- the merge of the two register namespaces, which is 2.16's;
- any loop code, of which none exists;
- the corpus, which Step 2 builds;
- any figure in `QUANTITIES.md` as final — it is a generated index and two of its values are stale by
  construction (below);
- the disposition of the eleven held counting failures, which sit in the review record behind the
  authorities and every one of which carries an amendment row.

### One correction to the attribution of the eleven, and it is the same class as everything else

The orchestrator reports *"zero of the eleven touch a promoted authority,"* on a `grep` of the failure
lines for `oracle/`, `literature/` and `COUNTING_RULE.md`. The promoted set is **seventeen** paths and
`oracle/MANIFEST.tsv` holds the list. Two of the eleven name a promoted path the hand-typed filter did
not include:

```
FAIL M3 Q-ECR-AXES quoted with 2 distinct values:
  17(QUANTITIES.md:21;QUANTITIES.md:24;QUANTITIES.md:25;…) vs 18(…addendum…)
FAIL M3 Q-LCC15-DISTINCT-LEAVES quoted with 2 distinct values:
  58(QUANTITIES.md:42;…) vs 59(…addendum…)
```

`QUANTITIES.md` is `state: promoted` in the manifest. A Step 2 session grepping the quantity index for
the economics axis count gets **17** against a ratified **18**.

**Ruling on the substance: symptom, not defect.** `M6` asserts the committed index equals the
regenerated index and it passes. The index is a faithful projection of a duplicated block set and it
corrects itself when the eight duplicate ids close. No separate work.

**Ruling on the sentence: it must not reach the author as written**, and the reason it is wrong is the
finding. The filter was three paths typed from memory where a file holds the true list of seventeen.
That is a set crossing a boundary without the operation that produces it — arm 2, committed inside the
paragraph certifying arm 2's population.

---

## 2. The two fired falsifiers, re-ruled

### Falsifier 2 — 1.12 belonged in group 1. **Still fires, and the remedy I named was wrong.**

R-4 makes the diagnosis stronger and the prescription untenable, and I would rather change the
prescription than pretend the original was right.

**Stronger.** I ruled on the evidence that authors in groups 1 and 2 stated counts without their rules.
R-4 shows the deeper failure: four of the ten Wave 2 findings are cases where *the form did not exist
and the author used the nearest slot anyway* — arithmetic under `script:`, an inherited condition under
`conditions:`, a range under `value:`, a correction owed against frozen text under `superseded:`. In
The Designer's words, a closed set with a missing member does not stop authors, it routes them into the
wrong member silently, and `259 - 1 - 108` sitting under `script:` looks like a filled field. A
contract that governs how others write, arriving after they have written, does not merely fail to catch
errors. It fails to prevent inventions that then look valid.

**Untenable.** 1.12 at group 1 could not have been version 2. R-4 found six missing forms by running
the amendments over real blocks from 1.4, 1.5, 1.8, 1.9, 1.10 and 1.13, and none of those blocks exists
at group 1. It also found a seventh defect **in its own amendment** only by implementing it: the
nested-fence rule, written literally, opened a fence on an inline code span at
`cr_scratch/step1_6_systems_engineer_currency_policy.md:810` and **silently deleted four quantity
blocks**, with the checker reporting cleanly on the survivors. That was found in ten minutes because it
was run. W2-2's missing lint went unfound for two days because it was not.

**Re-ruled.** The falsifier fires. The correct remedy is not *move 1.12 to group 1*. It is: **a contract
that constrains how other seats write exists in a first version before they write, and is re-run
against their hardest real instances after they have.** Two touches, cheap, and the second is where the
forms are found. My single-placement question had no right answer, which is why I got it wrong in a way
the orchestrator's in-flight repair only partly fixed.

### Falsifier 3 — the TDD precondition subset. **Still fires, and R-4 supplies the discriminator it lacked.**

The corrected rule stands: **a specification whose form other agents must write against is
reader-facing, and the precondition fires on it.** Nothing in the revision weakens it. R-4 is the
strongest evidence for it the project has produced, because the cheap discharge I prescribed — take the
three hardest instances the contract will have to express, write them in the contract's own forms, and
see whether the forms exist — is exactly the procedure that produced version 2, one step late, and it
found six.

**What R-4 adds is the branch I did not specify.** When the hard-instance test finds a missing form
there are two honest responses and I gave no rule for choosing. R-4 answers it twice, in opposite
directions, and both are right:

- **W2-2**: the contract promised a lint nothing implemented. Deleting the row was available and
  cheaper. He specified `M13` and kept the row. Correct, because authors were already writing bare
  governed numerals — thirteen of them today — so the requirement had demand.
- **`AM-1`**: his own specified check, reporting three false positives out of four. He did not
  strengthen it. He ruled it *a report and not a check*, agreeing with The Systems Engineer against his
  own specification, and pointed the property at `M3`, which asserts it better and mechanically.

**The discriminator, and it is measurable rather than a matter of taste: supply the missing form when
somebody was already writing in the empty slot, because the invention is the evidence of demand; demote
or delete when the check produces findings no author was working around.** The Designer applied that
rule twice without stating it. I am stating it.

**Also settled by the same pass, and it is Exception A's cost paid a second time.** 1.0 shipped without
the review its own row specified, and the reviewer whose standing question is *is this earning its keep*
never saw the suite. `AM-1` is what that review would have caught. It reached the check register as a
`block` row on the strength of a specification nobody had run.

---

## 3. The common cause, re-ruled

**Arm 1 closes.** `tools/quantities.js` exists, runs, exits nonzero, has a manifest row and a
check-register row, and reproduces The Designer's hand measurement clause by clause. A hand measurement
and an independent implementation agreeing to the clause is the only evidence available that either is
right. Thirty-two to eleven, and the eleven are held rows in the review record rather than defects in
the authorities.

I am closing arm 1, and recording that the closure is provisional in exactly one respect: **the checker
has never run over a step's worth of new counts.** Step 2 is its first real test.

**Arm 2 is not closed. It has a mechanism, and the mechanism covers the two boundaries where the defect
does not happen.**

My standing rule named five boundaries: a spawn prompt, a message to the author, a summary table, the
gameplan, the accumulator. R-4 mechanised the two that are files.

```
$ node tools/quantities.js --lint
LINT M15 accumulator.md:529            relays 340 candidate   ; the id is Q-ECR-KEYS-TESTED
LINT M15 accumulator.md:417            relays 107 distinct    ; the id is Q-LCC15-KEYS
LINT M15 lunar-oracle-gameplan.md:728  relays 259 characters  ; the id is Q-PATH-CEILING-259
LINT M15 lunar-oracle-gameplan.md:308  relays 328 lines       ; the id is Q-C4-SOURCE-LINES
LINT M15 lunar-oracle-gameplan.md:696  relays 328 lines       ; the id is Q-C4-SOURCE-LINES
NOTE M15 5 untagged relays across 2 relay files
```

**Five findings, two files. All eight known relay errors happened at the other three boundaries.** The
mechanised population and the defect population do not intersect at a single instance. The Designer
says so himself at `H7`, which is why I am not treating this as over-claiming: *"All seven of Step 1's
relay errors happened here and no script can reach them, because the artifact the number lands in is
not a file in any declared set."*

**So a check that fires on 5 relays is a beginning, and it stands exactly where arm 1 stood at my first
close: a rule with a partial mechanism, where the mechanised part is not the failing part.** I will not
let the word "mechanised" do work the measurement does not support. That is the mistake the echo site
registry made for an entire step.

**The rate has not fallen, which is the second test and the decisive one.** Relay error 6 — an agent's
wrong CRLF self-diagnosis repeated into a brief without measuring it, when 35 of 41 files are pure LF —
was committed *after* my ruling naming the class. Two more were committed during the revision pass:

- **Relay error 7.** My R-2 row carried seven blocking items and reached R-2 as three. §1, gate item 1.
- **Relay error 8.** The brief written to me for this re-close states *"R-2: all three blocking findings
  applied in place."* The same loss, relayed a second time, through the same seat, into the document
  asking me to certify it. I found it by reading my own close rather than by reading the brief.

**This is the extension of arm 2 I now rule in, because it is what those two instances teach.** My
standing rule governs *numbers* crossing a boundary. Relay errors 7 and 8 are not numbers. They are an
**obligation list** crossing a boundary and arriving shorter.

> **Rule 12 extends to obligations. A list of items crossing a boundary between seats carries its own
> count, and the receiving seat states the count it received before it starts work.**

"Seven findings" against "the three blocking findings" is one integer, and it would have caught this
twice. It needs no tool: one integer in a brief, one integer in a verdict line.

**One aggravating condition, and it is a defect in Step 1's own new artifact.** The amendment register
runs five checks named `AM-1` to `AM-5` and holds 131 amendment rows named `AM-01` to `AM-127`. Two
closed sets, one prefix, no discriminator. R-2's §7 states *"`AM-2`, `AM-3` and `AM-4` are green after
all of it, checked and not assumed"* — true of the checks, and it reads as covering the amendment rows
`AM-02`, `AM-03` and `AM-04`, which are `owed` and `BLOCKING`. **That is a namespace collision doing
exactly what 1.7 was written to prevent, inside the register built at 1.14, in a project that produced a
mechanical discriminator for two filename namespaces the week before.** One rename closes it. The check
names are The Designer's; the row ids are The Engineer's. It rides C-1.

**The structural finding underneath both arms is unchanged and unaddressed.** Nothing verifies the
verifier. `oracle/VERIFIED.tsv` exists with five rows and no column for who ran which operation before a
figure reached the author. I am not specifying the form. I am naming the falsifier at §7.

---

## 4. The concurrency defect — common cause, and the fix is not enforcing my own plan

**The evidence.** My wave structure kept reviews sequential. R-2, R-3 and R-4 ran concurrently over the
same promoted files and the same shared tools. R-2 reports `COUNTING_RULE.md` §8's block census reading
60, 62, 56, 60 across four runs minutes apart, and The Software Engineer changing `ecr_verify.js` minutes
after he had ruled on it. R-4 reports the same file set moving under him mid-measurement. Both say
plainly that their failure counts are readings of a moving file rather than scores.

**Common cause.** The test is whether anything distinguishes the instances, and nothing does. This is
the second time the schedule yielded — 1.12 was pulled out of the group I placed it in, and that one was
right. The pressure is constant: the orchestrator optimises for throughput inside a session budget, and
the ordering is the only variable that gives. And there is no mechanism. **My wave structure lives in
prose in my open and as a field in nothing.** No file states which sub-steps may run concurrently. No
check compares a spawn set against a shared file set. A rule that exists only in a paragraph one seat
wrote is the echo site registry again, and I have now written two of them.

**Special cause requires the instance be distinguishable, and the honest reading is that this one is
distinguishable in the other direction: the deviation produced information my plan would not have.** R-2
discovered the moving-file problem, invented the `DIVERGED AT R-2 — DO NOT RE-LIFT` marker above the
source block, and stated that the index must be regenerated by whoever closes last. R-4 found that his
own amendment silently deleted four blocks, and found the `grep -c` zero-match exit trap, both while
working under contention. Under strict sequencing none of that surfaces. **A fix amounting to "obey the
wave structure" drives out the improvement the deviation produced, and driving out that behaviour is a
worse outcome than the defect it prevents.**

**The process fix, three parts, all cheap.**

1. **Concurrency becomes a declared property rather than an inference.** The gameplan sub-step table
   gains a column stating which sub-steps may run concurrently. Default: sub-steps writing to a shared
   declared file set run sequentially. The shared file set is already computable —
   `COUNTING_RULE.md` §8 is that shape and `tools/quantities.js --files-only` prints it.
2. **No count taken while another seat holds a write on the same file is a verdict.** R-2 wrote this
   himself, unprompted, and it belongs in the contract beside the failure-count rule it qualifies. Filed
   against `COUNTING_RULE.md` §3 rule 11: a failure count carries its pattern, its anchoring, its corpus
   root, **and the statement that nothing else was writing.**
3. **R-2's divergence marker becomes standing.** A promoted file amended in place carries a `DIVERGED`
   note above its `cr_scratch` source block, naming the target and the amendments a re-lift would
   silently revert. It is already applied on two files and it is the cheapest defence the project has
   against the promotion ruling's own failure mode.

**The instruction that was disobeyed was mine, and its enforcement is not the fix.** The fix is that
concurrency stops being a silent default and becomes a decision with a stated cost, and that counts
taken under it are labelled rather than trusted. That is what the seats closest to the work already did
on their own.

---

## 5. My own Step 1 falsifiers, ruled where the revision made them determinable

**Falsifier 1, promote-then-amend. Early evidence against; the ruling survives with a correction to its
unit.** I said the ruling is wrong if a promoted file and its `cr_scratch` source block are both edited
during Step 2. It happened inside the revision, and the cause is not the ruling. It is that promotion
lifted *marked blocks*, not files. Measured:

```
quantity blocks       promoted file                     cr_scratch source
    0 vs  4           oracle/check_register.md          step1_13_…_check_register.md
    0 vs 14           oracle/register_schema.md         step1_8_…_register_schema.md
    0 vs  4           oracle/currency_policy.md         step1_6_…_currency_policy.md
    3 vs  3           oracle/bootstrap_contract.md      step1_4_…_bootstrap_contract.md
    4 vs  4           oracle/install_state.md           step1_5_…_install_state.md
```

**Twenty-two governed quantity blocks describing three promoted contracts live only in the
`cr_scratch/` file the contract was lifted out of.** R-2 hit this on `oracle/check_register.md` and filed
it as `AM-111`, naming one file. **It is three, and I measured it.** Two other contracts got their
blocks because their authors happened to put the fence inside the marker range. Which copy is the
authority is therefore decided by where an author placed a marker, which is the accident §5.4 was ruled
to prevent.

**This does not gate the close.** It makes no contract unexecutable and changes nothing the author
ratifies. It changes where a later editor edits, which is Step 2's problem and now has an address:
`AM-111` rides `AM-102`, at a scope of three files and twenty-two blocks rather than one file.

**Falsifier 2, the reconciliation owner. Does not fire, and the constraint was right.** I gave 1.14 to
The Engineer as the least conflicted seat, and said the falsifier is a collision his list misses that a
later reader finds by hand. The opposite happened: `AM-1` over-reported, and R-2 showed three of its four
were one edit filed as two rows. The one collision `AM-1` structurally could not see —
`Q-ANSWER-CONTRACT-VERSION`, two amendments to one integer with no minted id — **The Engineer found by
hand and typed a provisional id for.** He also refused the register merge as a schema ruling he did not
own, which is precisely what the low-conflict seat is for.

**Falsifier 4, on the verdict. Does not fire.** I said the step needed a second technical wave rather
than a revision if the revision produced a new blocking finding against a contract Wave 2 had already
reviewed. It did not. `AM-01` to `AM-04` are not new; they are Wave 1's 1.4-review findings, written by
The Software Engineer, never applied. R-4's nested-fence defect is new, but it is a defect *in an
amendment*, created and caught inside the same pass, which is the revision working rather than the review
failing. **The revision pass was the right instrument. It was under-run, not mis-chosen.**

---

## 6. What Step 2 inherits, restated against the current state

Step 2 is the merge: eighteen sub-steps, `literature/` is built, the corpus lands, and the counts get
measured for the first time with their rules attached. It is this project's primary assignment.

**The law, promoted and joined.** Seventeen files at their target paths:
`oracle/{answer_contract, bootstrap_contract, check_register, currency_policy, install_state,
register_schema}.md`, `oracle/tests/answering_loop_suite.md`, `literature/NAMING.md`,
`COUNTING_RULE.md`, `QUANTITIES.md`, `oracle/REGISTER.{lunar,econ}.tsv`,
`oracle/{MANIFEST,AMENDMENTS,VERIFIED}.tsv`, `.gitignore`, `tools/quantities.js`.
`oracle/MANIFEST.tsv` answers *where is this contract's review history* in one `grep`.
`oracle/AMENDMENTS.tsv` holds **70 owed edits** against fourteen targets, checked by `AM-1` to `AM-5`.

**The tools.** `tools/` holds ten files. `quantities.js` and `check_registers.js` are new and both can
exit nonzero. `ecr_verify.js` is the survivor of the 2.15 consolidation and runs clean over both
register halves separately.

| Inherits | What, restated |
|---|---|
| **2.1** | `literature/NAMING.md` is promoted and live, 176/176 names passing. E14 is rewritten: root length broke the clone, not the filename, and the fix is a path budget split between root and repo-relative. The 14 FA renames plus one prefix and two case fixes land when `findings/` is created, and that sub-step states where `findings/`'s naming authority is — the rule now lives inside one of the two shelves it governs. |
| **2.14** | `tools/quantities.js` already exists, so 2.14's job here is the **invocation point**, not the tool. The check register is promoted with `CHK-09` split into `--register` and `--wiring` and `CL-8` added. `AM-57`'s `.gitattributes` lands **before** any hook is installed: all ten tracked files under `tools/` are at `100644` and `core.filemode=false` here, so a hook committed as-is is inert on a Linux clone and green on the author's machine. `CHK-29` is `report` and `session-start` only. |
| **2.15** | Narrowed to one item: `ecr_verify.js` must **re-derive** its `require()` of the upstream tokenizer rather than lift it, and `check_register_rows.js` hard-codes `C:/Users/Quinn Morley/…` at line 3. `CHK-03` came off the gate at R-2, so nothing inert is sitting on a gate while this waits. Two lunar axes name `check_register_rows.js` as their `operation:`; re-pointing them may move their values. |
| **2.16** | 33 axes across two `basis_root`s. **The merge is ruled and it is not a concatenation:** `oracle/REGISTER.tsv` will not exist; the sidecar is a set of files, one `basis_root` each, joined at load, per `register_schema.md` §3.0 and `AM-98`. Both halves run clean separately; their concatenation produces 144 failure lines, which is the ruling's evidence. `register_class` must not collapse. Two same-author near-duplicate pairs are wholly unregistered and silent, and `B6` fires as a false positive the moment either gains a member; the 1.9 addendum carries the test. |
| **2.17** | `oracle/install_state.md` with `S1` applied — the parse gate and the shape gate split, with the branch interleaved so a future-version record is refused rather than overwritten, and the two-fixture pairing that makes `schema` the only discriminator. **`S2` (`AM-38`) must land first; it is C-1.** |
| **3.2** | `C1` is live and verified by running the router. `valueModel` lives in the `VALUE-CORE` island at `lsei/index.html` 7797–8448 and `app_model.js` never opens it; `margin_prop` is not among `model()`'s 26 output keys. `FIX-9` and `FIX-10` are **RED on purpose**, both failing on one mechanism, with their close conditions being their own runs. |
| **3.8b** | `oracle/lib/claim_bearing.js`, the single implementation of answer contract §7. |
| **The Engineer, before 2.15** | The `app_surface` tier ruling. **Ruled yes at 1.14, on measurement, with the boundary stated.** Carried here so it is not re-litigated. |

**Owed to the record, all cheap, none optional.**

- Six `BLOCKING` amendments (C-1) and the gameplan's 1.14 row and progress entry (C-2).
- `AM-111` at its true scope: three files, twenty-two blocks.
- **`oracle/MANIFEST.tsv` line 19 names `tools/check_manifest.js`, which does not exist.** The checker is
  `tools/check_registers.js`. A promoted authority pointing at a file nobody wrote is E8's own complaint
  inside the artifact built to close it. One cell.
- `CLAUDE.md`'s read sequence still does not name `cr_scratch/step1_orchestrator_verification.md`;
  `grep -c` returns 0, and the gameplan tells the reader it is the first thing to read.
- The loose-ends register still violates its own closed status vocabulary.
- **`COUNTING_RULE.md` and `QUANTITIES.md` now live at the repository root with no directory-map row.**
  That is the drift I said I was watching for inside `oracle/`, arriving one level up instead. The person
  to tell is The Systems Engineer, who owns the map.

**And the standing rules this step earned**, which are process changes rather than corrections: a number
does not cross a boundary unless the relaying seat ran the operation that produces it; **a list of
obligations crossing a boundary carries its count**; and concurrency is declared, with counts taken under
it labelled rather than trusted.

---

## 7. What I will check at the Step 2 close that I would not have listed before

The first close's ten checks stand. These eight are new, and each exists because something in the
revision pass showed me a hole rather than because it sounded prudent.

11. **`H7`'s population is a number somebody produced.** Arm 2's three unmechanised boundaries — spawn
    prompts, messages to the author, spoken summaries — have a hand check and no count. If the Step 2
    close cannot state how many relays crossed them and who ran the operation for each, **`H7` is the
    echo site registry and I will say so.** `M15`'s 5 is not that number and must not be reported as it.
12. **The obligation-count rule ran.** Every brief that assigned a list stated its count, and every return
    stated the count it received. If Step 2 spawns twenty briefs and none carries an integer, relay errors
    7 and 8 have no defence.
13. **Concurrency was declared before any wave ran**, and no failure count reported as a verdict was taken
    while another seat held a write on the same file.
14. **The `AM-` namespace collision is closed**, and no report saying `AM-2` is green can be read as
    covering amendment row `AM-02`.
15. **Every promoted authority's named checker exists.** The `check_manifest.js` class: a specification
    that names its own enforcement is checked by running the name.
16. **`QUANTITIES.md` was regenerated at the close** and its values agree with the ratified addenda —
    specifically `Q-ECR-AXES` at 18 and `Q-LCC15-DISTINCT-LEAVES` at 59.
17. **The eleven held failures went to zero or were ruled, and no promoted authority acquired a new one.**
    If Step 2 adds to them, arm 1's closure was premature.
18. **The gameplan's sub-step table and its own progress entry agree with each other.** They disagreed at
    this close, in the index of record, about how many sub-steps the step had and whether anything was
    promoted. A table and its own summary disagreeing is E16 inside the index.

### Falsifiers for Step 2, replacing those the revision settled

**F1.** Arm 2 is closed by the obligation rule and `H7`. **If Step 2 produces a relay error at a non-file
boundary and the Step 2 close finds it rather than the seat that committed it**, then a human check on the
highest-traffic node is not a mechanism, and the verifier-of-the-verifier has to be built rather than
described.

**F2.** Concurrency declared as data prevents the contention defect. **If two Step 2 sub-steps write to
one file and neither declared it**, the column is decoration and the fix has to be a check comparing a
spawn set against `--files-only`.

**F3.** Arm 1 is closed. **If Step 2's merge produces counts corrected after the fact rather than measured
with their rule attached**, the checker was necessary and not sufficient, and the missing half is the
invocation point rather than the tool.

**F4.** Promote-then-amend was right. **If a promoted authority and its `cr_scratch` source are both
edited again after `AM-111` lands**, the marked block was the wrong unit of promotion and whole files
should have moved.

---

## 8. The accumulator

Appended to `accumulator.md` at this re-close, under the four personas that ran in the revision pass: The
Engineer, The Systems Engineer, The Software Engineer, The Designer. Positions taken and corrections
received, with the two withdrawals recorded as withdrawals: **The Software Engineer withdrew `L6` in
favour of The Systems Engineer's `SET-2`**, and **The Designer withdrew his own `AM-1` as a check in
favour of `M3`.**

---

*The Manager, Step 1 re-close. Fifteen of fifteen delivered and seventeen promoted. Two gate items, both
halves of items already returned. Arm 1 closed, arm 2 begun and named as begun. The author's gate is two
seats and a few hours away.*
