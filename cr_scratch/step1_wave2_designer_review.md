# Step 1, Wave 2 — The Designer: echo-site consistency, the worklist, and the amendment queue

**Project:** Lunar Oracle
**Date:** 2026-08-27
**Sub-step:** Wave 2 of Step 1, before The Manager closes it.
**Scope:** the three things only this seat does. Not a re-review of any deliverable's content.
**Instrument:** the counting-rule contract of 1.12, applied to the step that produced it.
**Read first:** `cr_scratch/step1_orchestrator_verification.md`. It is the shortest path to what
happened this step and I have not repeated it.

---

## 0. Verdict

**Echo-site consistency: FAIL.** `tools/quantities.js` does not exist, so I implemented M1, M2, M3,
M4, M11 and M12 as one-off scripts and ran them over the declared file set as it stands. **Sixteen
hard `--check` failures are live today, before a single deliverable is lifted.** Eight of the sixteen
are in the contract's own file. The instrument works; it fails first against its author, which is the
correct direction and is not a mitigation.

**The worklist: FAIL, and worse than at 1.0.** Fifteen specified target paths were named across Step
1. **Zero of them exist.** There is no `oracle/` directory. A cold Step 2 session following the
context recipe for sub-step 2.14 is told to read `oracle/bootstrap_contract.md`, and nothing in this
repository connects that path to the file that holds its text. The gameplan carries a
`### Step 0 sub-steps` table with a status and a deliverable path per row and **carries no equivalent
table for Step 1**. The pattern exists in the document and was not extended.

**The amendment queue: nothing holds it, and the collisions are already worse than the one that was
found.** X1 found two mutually exclusive amendments. There are at least three more collisions nobody
has named, one of them a single integer with three competing successor values from three documents.

**Specified below:** three artifacts, one of them a gameplan edit that costs one pass. Two of the
three are `.tsv` registers with self-declared size headers and check-register rows, because that is
the form this step converged on and inventing a fourth form for the same problem is the defect this
report is about. I have not built them.

---

## 1. Echo-site consistency: the counting rule applied to the step that produced it

### 1.1 What ran

Sixty-one `quantity` blocks parsed across ten files. The declared file set is the contract's §8:
root `*.md`, `cr_scratch/**/*.md`, `tools/**/*.js`, `oracle/**` when it exists. `lsei/` and
`cr-agents/` excluded, per the same section.

| Check | Result |
|---|---|
| **M1** block well-formedness (twelve keys, exact set, declared order) | **1 failure** |
| **M2** every quotation tag resolves; ids unique | **9 failures** — 6 unresolved tag ids over 8 sites, 3 duplicate ids |
| **M3** one distinct numeral per id | **1 numeral conflict**, and the check is unusable as specified — see W2-8 |
| **M4** `derived-from` resolves; acyclic; staleness | **2 dangling parents.** No cycles. |
| **M11** `cmd:`/`script:` operations declare a `cwd` | **2 failures** |
| **M12** ids are not markdown link targets | **1 failure** |
| M5, M6, M7, M8, M9, M10 | Not runnable. M6 and M7 require `QUANTITIES.md`, which does not exist. |

Sixteen hard failures. Eight of them are in `cr_scratch/step1_12_designer_counting_rule.md`.

### 1.2 The lift-is-a-copy collision. The Systems Engineer's 1.6 §3.2 finding is CONFIRMED, and his count is exact

Measured independently, not read from his file: every extraction in this project is
`sed -n '/BEGIN/,/END/p' <source> | sed '1d;$d' > <target>`. A copy. The source block stays in
`cr_scratch/`, and §8 of the contract scans both roots.

| Source file | Target | Blocks inside the markers |
|---|---|---|
| `step1_4_systems_engineer_bootstrap_contract.md` | `bootstrap_contract.md` | 3 — `Q-BOOTSTRAP-PHASES`, `Q-DEGRADED-MODES`, `Q-BLOCKING-MODES` |
| `step1_5_systems_engineer_install_state.md` | `install_state.md` | 4 — `Q-STATE-FACTS`, `Q-STATE-ABNORMAL-READS`, `Q-STATE-CONSUMERS`, `Q-STATE-KEYS` |
| `step1_12_designer_counting_rule.md` | `COUNTING_RULE.md` | 1 — `Q-PAIR-IDENTICAL` |
| The other eight lifting files | — | 0 inside, 44 outside |

Seven collide on the first lift, plus the eighth, mine. His arithmetic matches mine to the block.

**His preferred disposition — put blocks outside the markers — is right for 1.4 and 1.5 and cannot
work for 1.12.** `COUNTING_RULE.md` §2 *is* the specification of the block form; the worked example is
the only thing in it that shows the shape, and moving it outside the markers ships a contract that
specifies a form it never displays. The fix for my file is different and is W2-1.

### 1.3 W2-1 to W2-10. Defects in the counting-rule contract. Mine

**W2-1. HARD. The worked example cannot be lifted without failing four of its own checks.**
`COUNTING_RULE.md`, as delimited by the marker pair at lines 177–423, carries:

| Line | Content | Fails |
|---|---|---|
| 223 | `id: Q-PAIR-IDENTICAL` | M2 on lift — the id then exists in two files in the declared set |
| 227 | `population: the 95 [Q-OVERLAP-95] ...` | M2 — no block with that id exists anywhere |
| 234 | `derived-from: Q-OVERLAP-95` | M4 — dangling parent |
| 245 | ``writing `Q-X(...)` is a failure`` | M12 — (id de-bracketed at R-4 under the mention form; the site now reads Q-EG-X) — the clause illustrating the violation is an instance of it |
| 307 | `87 [Q-PAIR-IDENTICAL] of the 95 [Q-OVERLAP-95] ...` | M2 |
| 312 | `7f97983 (...) [Q-LSEI-HEAD]` | M2 — no such block |

Six sites, four distinct check failures, all inside the deliverable. Three further dangling tag ids
— `Q-ABSTRACT-OVERLAP`, `Q-C4-FENCE-SPAN`, `Q-C4-SOURCE-LEN` — sit in §6 outside the markers and fail
M2 in the scratch file.

**Every M2 tag failure in this project is in my file.** Six unresolved ids across eight sites, and no
other persona produced one.

**This file reproduces the defect and cannot avoid it.** Quoting the six sites above puts four
unresolvable tag ids and one M12 hit into `cr_scratch/step1_wave2_designer_review.md`, which is in the
declared set. There is no way to report a dangling tag under the contract as written without minting
one, which is the demonstration that the missing clause is a missing clause rather than a slip.

**The fix is not a reserved id.** It is an example namespace, and it needs two clauses because the
defect has two shapes. Amend the contract: **an id beginning `Q-EG-` is an example, may not be minted
as a real block, and is skipped by M2, M3 and M4; and a `quantity` fence nested inside a
four-backtick fence is not a block.** The first covers tags in prose, the second covers the block
itself. Rewrite the example as `Q-EG-PAIR-IDENTICAL` / `Q-EG-OVERLAP-95` / `Q-EG-LSEI-HEAD`, and
write the M12 illustration as `Q-EG-X`.

**W2-2. HARD. §5 promises a lint that §7 never mechanizes.** §5's third row makes "a bare governed
numeral in a second file" a `--lint` finding. **There is no M-item implementing it.** M1–M12 contain
nothing that can find one; M8 covers only the `N lines above` form.

The live population is not hypothetical. The orchestrator flagged "seven phases" and "six degraded
modes" as first-run lint findings. Measured across the declared set: **20 sites in 8 files.** Both are
spelled-out numerals, so no digit-based regex reaches any of them.

Counting rule for that figure: case-insensitive occurrences of `(seven|six) (phases|degraded modes)`
over `cr_scratch/*.md` and root `*.md`, this file excluded, 2026-08-27. The same probe turned up a
21st site of a different kind — `step1_4_software_engineer_testability_review.md:383`, "one property
over six phases" — which is the *unconditional* subset of `Q-BOOTSTRAP-PHASES` and is a bare numeral
for a quantity that has no id at all. It is a G1 candidate the moment a second file states it, and it
sits one line from the amendment that creates it (1.5 §3.1's *idempotent* → *unconditional* for Phases
1–6).

The rule exists, the consequence is stated, nothing implements it, and the Tier 2 touch rule leans on
it. Either specify M13 — a spelled-number alternation keyed on the `unit` noun of each `fixed` block —
or delete the row from §5. A stated consequence with no mechanism and no owner is the shape of E1's
remedy, which was inert for the same reason.

**W2-3. HARD. M11 is weaker than the rule it implements, and it fails on exactly the two blocks that
needed it.** §2's field rule reads: for any `cmd:` or `script:` operation, `conditions` **always names
the working directory and its character length.** M11 asserts only that the string `cwd:` appears.
Two blocks name a directory and omit its length:

```
Q-HOOKSPATH-INERT   conditions: cwd: the session scratchpad. ...
Q-REG-TSV-IGNORED   conditions: cwd: a scratch git repository, git 2.55.0.windows.1, ...
```

Both are scratch roots. The character length of a scratch root is the precise variable my own §9
instance B says two sessions measured differently, and it is the variable The Engineer's path budget
turns on. **The two blocks that most needed the length are the two that omit it, and the check I
specified cannot see it.** M11 becomes: `conditions` matches `cwd:` followed, before the next
sentence break, by `\d+ characters`.

**W2-4. HARD. `operation` admits three forms and none of them is arithmetic over other quantities,
which `derived-from` presupposes.** `Q-ROOT-ALLOWANCE` writes:

```
operation:     script: 259 - 1 - 108, where 259 is the measured git-for-Windows ceiling and 108 is
               the repo-relative ceiling chosen from the corpus
```

`259 - 1 - 108` is not a committed path and the `script:` form requires one. This is instance 4 in a
new costume: the author had a real operation, the closed set had no slot for it, and he used the
nearest slot. **The contract needs a fourth form, `derived: <expression over ids>`, and M4 should
evaluate it.** That makes the arithmetic checkable, which is more than M10's range rule buys.

**W2-5. MAJOR. A chosen parameter with no id is invisible to the staleness graph.**
`Q-ROOT-ALLOWANCE` records `derived-from: Q-PATH-CEILING-259` and rests on two parents, not one. The
second is 108, which the addendum states plainly is *chosen* rather than measured — `10 + 1 + 32 + 1
+ 64` — and which has no id. If 108 moves, M4 marks nothing. **The graph is only as complete as the
ids that exist, and the parameter most likely to be revisited is the one with no id.** §2's
`derived-from` rule should read: every input to the value, measured or chosen, carries an id.

**W2-6. MAJOR. §4's four-part correction has no form for a correction whose sites are in a document
another persona has frozen.** This is the root of §3 of this report and it is a defect in my contract,
not in anyone's queue discipline.

The live instance: `Q-CURRENCY-VERDICTS` in 1.6 carries
`superseded: 5 (oracle/bootstrap_contract.md section 7, The Systems Engineer at sub-step 1.4, ...)`.
The supersession is recorded. Part 1 of §4 — edit the value at its site — is in a different document
that is under review and therefore frozen. So the block asserts a correction that has not happened,
and §4 says a correction is not complete until all four parts are done. **The contract can express
"this value is superseded" and cannot express "and the edit that supersedes it is owed against a
frozen document."**

Amend §4: a correction whose site is in a frozen document is written with the successor value and a
`pending:` entry naming the target document and the amendment id. That entry is what the amendment
register of §3.3 joins against.

**W2-7. MAJOR. Two ids for one quantity, and nothing detects it.** My 1.12 §6 instance 5 mints
`Q-C4-SOURCE-LEN` for the 328-line `verify_report.js` source. 1.6 §4 mints `Q-C4-SOURCE-LINES` for
the same quantity, with a real block, the same value, and a better `population`. M2 flags mine as an
unresolved tag. **Nothing says they are the same number.** The contract's `id` rules forbid rename and
reuse and say nothing about two ids for one quantity, which is the failure mode parallel agents
produce. Either make a new block whose `unit` and `population` match an existing block a `--check`
failure, or accept that this one is human-only and put it in §7's H list. Concretely: delete
`Q-C4-SOURCE-LEN` from §6 and quote `Q-C4-SOURCE-LINES`.

**W2-8. MAJOR. No form for quoting a range, so M3 cannot read one.** `Q-C4-FENCE-SPAN` is quoted as
`357–686 inclusive [Q-C4-FENCE-SPAN]`. M3 captures the token before the bracket and gets the word
`inclusive`. §3 states how a range is *written in `value`* and never how it is *quoted*, so the one
check that sweeps quotations cannot read the one value form the contract went out of its way to
specify.

**W2-9. MAJOR. 1.6 §3.5 asked for a clause and it is not in the contract.** He pre-dispositioned a
`--lint` finding: `oracle/VERIFIED.tsv` carries a bare `# rows=5` for a `live` quantity, which §3
rule 2 forbids. His ruling is right — a file declaring its own size is not a quotation of it — and his
sentence is explicit: *"the exemption belongs in the counting rule rather than in a suppression
here."* It is owed against 1.12 and nobody is holding it. The same clause covers the loose-ends
register's own `44 rows` declaration and the check register's `H` row.

**W2-10. MINOR, and it is instance 3's shape.** The contract states "the nine instances" at five sites
and scores itself against nine. `cr_scratch/step1_author_rulings.md`, written three minutes before it,
records a tenth — the 10-versus-14 FA rename count — with the explicit instruction *"Hand it to The
Designer at 1.12 if his contract has not already closed."* It was not handed over. **The population
count in the contract about population counts was measured against a basis that had already moved.**
Instance 10 needs running against the contract like the other nine. On inspection it is a `sampled`
and `predicate` case and I expect PARTIAL, but that is a claim to test, not to assert here.

### 1.4 W2-11 to W2-19. Defects elsewhere

**W2-11. HARD. Three duplicate ids exist today, with no lift required.** 1.9's addendum re-mints three
ids rather than correcting the blocks in place:

| id | 1.9 | 1.9 addendum |
|---|---|---|
| `Q-LCC15-MEMBER-ROWS` | 80 | 81 |
| `Q-LCC15-DISTINCT-LEAVES` | 58 | 59 |
| `Q-LCC15-LEAVES-READ` | 43 | 44 |

Both files are in the declared set. §5 row 1: two blocks sharing an id is a hard failure. §4 is
explicit — edit `value`, do not edit `id`, move the old value into `superseded`. Three blocks, three
`superseded` entries, one edit inside `step1_9_..._register_rows.md`.

**The brief for this review named two of these three.** The third, 43 to 44, has not been named
anywhere.

`Q-LCC15-DISTINCT-LEAVES` is additionally the project's only live **M3** failure: 58 and 59 are both
stated beside the same tag.

**W2-12. HARD. `Q-TOOLS-MODE-644` is missing `population`.** Eleven keys, not twelve.
`cr_scratch/step1_13_systems_engineer_check_register.md:765`. §5 row 1: a block missing a key is a
hard failure and the sub-step does not close. Not reported by 1.13, by the 1.5/1.13 review, or by the
verification log.

**W2-13. HARD. `Q-ROOT-ALLOWANCE` names `Q-PATH-CEILING-259` and no such block exists.** Confirmed;
already logged by the orchestrator as owed against 1.7. The addendum itself says *"If it does not yet
have a block, it needs one; it is quoted in two files."* One block — and per W2-5 it needs a second
parent as well, so the amendment is two ids, not one.

**W2-14. HARD. `Q-REG-FLIPS-MIN` and `Q-REG-FLIPS-ID` write `conditions: as Q-REG-FLIPS-FULL`.** An
inheritance form the contract does not admit, invented because the author correctly declined to keep a
third hand-copy of the same conditions. Both fail M11. The dependency it creates is also not recorded
under `derived-from`, so M4 cannot see it either. **This is a form the contract should have and does
not**, and the amendment is `conditions: inherits Q-<id>` with M11 following the edge. Group with W2-4
and W2-5 as one edit against 1.12.

**W2-15. HARD. The answer contract's version integer is 1 in its own deliverable and 2 in nine files.**
`cr_scratch/step1_3_software_engineer_answer_contract.md:199` reads `**Contract version: 1.**` inside
the liftable block and has not been edited. Against it: 1.8 §1.9 ("version 1 becomes version 2"),
1.8's schema header ("written against `oracle/answer_contract.md` **version 2**"), 1.9's
`Q-LCC15-SIDES` predicate ("under contract version 2"), 1.10, 1.11 v2's title, the 1.4 testability
review's F14, 1.5 §1.7's table, and the verification log. **And 1.6 §12 adds a third bump on top.**

The version field was added so that a downstream file could tell which contract it was written
against. It is now the single stalest integer in the step, and 1.6 §3.4 states the consequence
exactly: a version field that three files disagree about has stopped being read. Land 1 to 2 and
§12's bump in one edit, or delete the field. Do not land them separately.

**W2-16. HARD. The loose-ends register uses a status vocabulary it declares closed, and violates it on
twelve of forty-four rows.** The register declares eight values: OPEN; FIXED; PENDING-PUSH; DEFERRED;
AUTHOR; POSITION TAKEN; PARTLY CLOSED; ACCEPTED LIMIT. Measured over all 44 rows, taking the leading
vocabulary word of each Status cell — the counts sum to 44:

| | |
|---|---|
| Declared and used (32 rows) | OPEN 11, FIXED 8, DEFERRED 7, AUTHOR 3, POSITION TAKEN 2, ACCEPTED LIMIT 1 |
| **Undeclared and used (12 rows)** | **CLOSED — 9** (A8, D1, E1, E6, E8, E9, E12, E16, E17); **RULED — 2** (C4, E11); **NARROWED, NOT CLOSED — 1** (D5) |
| Declared and dead | PENDING-PUSH 0, PARTLY CLOSED 0 |

This is the closed-set failure that 1.4's own `Q-DEGRADED-MODES` block names in its predicate: *a
condition outside the set is a failure of the contract, not a seventh mode.* The Status cell is the
field a cold session reads to decide what is still owed, and more than a quarter of the rows carry a
value its own legend does not define.

**It matters which repair is chosen**, because CLOSED and FIXED are being used as different things —
FIXED reads as "done and verified", CLOSED as "the finding no longer applies" — and the distinction is
real and undocumented. Either add CLOSED, RULED and NARROWED to the legend with their definitions and
retire the two dead values, or map the twelve rows onto the eight.

**W2-17. MAJOR. 1.6's handoff claims four loose ends closed; the register agrees on two.**

| Row | 1.6 §3.6 | Register Status |
|---|---|---|
| C4 | closed | **RULED by the author** — undeclared value, but a closure |
| E6 | closed | CLOSED — agrees |
| D4 | closed | **AUTHOR ruling wanted, Open Question 3. 1.6 is the policy** |
| E10 | closed | **OPEN. 1.6 states the rule ... which needs E6 fixed first** |

The register may be right and the handoff overstated — E10's cell gives a reason it stays open, and
somebody swept that row after 1.6, correcting its Finding cell from two pushes to three while leaving
the Status. Two documents disagree about the state of two rows and neither is marked. **A handoff
table saying "closed here" beside a register saying OPEN is the 1.0 A8 defect relocated**: a finding
and a status asserting different states, across two files instead of one.

**W2-18. MAJOR. The progress log states an ordering invariant about itself that is false.** Its
preamble reads: *"Reverse-chronological: the newest row is first. Every row is dated 2026-08-26, so
the order of the rows is the only statement of which entry supersedes which."*

Measured. Three rows are dated 2026-08-27, and they sit at positions 3, 4 and 5, below two rows dated
2026-08-26. **The three newest rows are not first, in a table whose only stated supersession signal is
position.** They were inserted mid-table. Two edits: move them to the top, and correct the preamble,
which is now false in both of its sentences.

This is the row that contains the only description of Step 1's output anywhere in the gameplan. See
§2.

**W2-19. MINOR.** `accumulator.md` line 2 reads *"Last updated: 2026-08-26, at the close of Step 0."*
The file was edited during Step 1 — my 1.0 finding on the 42-versus-44 row count was applied to line
103 and is now correct — so the header is false about its own file. The file also has no Step 1
content of any kind; see §2.3.

### 1.5 What I checked and found intact

- **No cycles** in the `derived-from` graph across all 61 blocks.
- **`class` is clean.** All 61 blocks carry a value from the closed set of five. Zero variants.
- **The register's self-declared size holds.** 44 rows; A 8, B 7, C 5, D 7, E 17; parsed count matches
  the declaration exactly. The device works.
- **`tools/` is consistent with `Q-TOOLS-MODE-644`.** Eight files, and the progress log's "six checks
  and harnesses under `tools/`" reconciles: two of the eight are Step 0's.
- **The 72-to-75 sub-step correction swept.** Both live sites read 75; the three remaining `72` sites
  are past-tense records of what was true when a judgement was made, which is the correct form.
- **My 1.12 §9 instance B is closed, and correctly.** The 147-versus-158 scratchpad root is reconciled
  at `Q-SCRATCHPAD-ROOT` = 151 long-name / 147 short-form, with a `superseded` entry naming the exact
  defect: two probe subdirectories of a bisection harness recorded as the root, path form unstated.
  The addendum then does the thing the finding was for — it observes that 151 fails the 150 budget by
  one character and rules that this is the budget working rather than a false positive.
- **1.5 §3.2 is the contract stopping an edit before it happened.** He declined to write corrected
  `Q-DEGRADED-MODES` and `Q-BLOCKING-MODES` blocks in his own file, citing §5's duplicate-id rule, and
  used a plain table instead. W2-11 is the counter-example: same rule, same situation, two personas,
  opposite outcomes, and nothing mechanical distinguished them because the checker does not exist.

---

## 2. Does Step 1's output work as a worklist for the session that has to execute Step 2?

**No.** At 1.0 I found the plan was a good briefing and a poor worklist, and that the worklist and the
index had come apart. Step 1 added eighteen sub-step artifacts and did not close the gap; it widened
it by roughly a factor of ten, because Step 0 produced one plan document and Step 1 produced eleven
specifications with no state.

### 2.1 The single measurement that settles it

Fifteen target paths were specified across Step 1's deliverables and its two register files. **Zero
exist.**

```
ABSENT  oracle/answer_contract.md            ABSENT  oracle/register_schema.md
ABSENT  bootstrap_contract.md                ABSENT  oracle/REGISTER.tsv
ABSENT  install_state.md                     ABSENT  oracle/check_register.md
ABSENT  oracle/currency_policy.md            ABSENT  oracle/VERIFIED.tsv
ABSENT  NAMING.md / literature/NAMING.md     ABSENT  oracle/tests/answering_loop_suite.md
ABSENT  COUNTING_RULE.md                     ABSENT  QUANTITIES.md
ABSENT  tools/quantities.js                  (there is no oracle/ directory at all)
```

Every one of them is named as an input by some other document. The context recipe for sub-step 2.14 in
`cr_scratch/step0_integration_draft.md` tells the executing session to read
`oracle/bootstrap_contract.md`. The recipe for 2.17 names `1.5 (ARCH-3)'s state-record schema`. The
recipe for 2.1 names `literature/NAMING.md`. **A cold session runs `cat` on each and gets nothing, and
there is no pointer anywhere from a target path back to the `cr_scratch/` file and marker pair that
holds its text.** The mapping exists only inside the eighteen files themselves, one `sed` command
each, in a §5 or a header.

This is not a scheduling complaint. Promotion is correctly gated — 1.7's `NAMING.md` waits on 1.1's
`.gitignore`, and the Manager's open says so. **The defect is that the gate is recorded in prose in one
file, the dependency on the promoted artifact is recorded in prose in another, and nothing joins
them.** The check register's own CL-1 is exactly this join for checks. Deliverables got no such join.

A collision the absence conceals: `NAMING.md`'s marker names the root path; its own lift command and
the Manager's open name `literature/NAMING.md`. Both strings are in live use — 28 mentions of the bare
form, 24 of the `literature/` form. Nothing will notice until somebody lifts it, and then it depends
which sentence they read.

### 2.2 The affordance that should tell a reader where to start, and does not

The gameplan carries `### Step 0 sub-steps`: nine rows, each with an owner, a status, and the path of
the file it produced. That table is the affordance. A reader who has seen it knows the form and will
look for its sibling.

**There is no `### Step 1 sub-steps` table.** Step 1's row in the Steps table reads `In progress` and
names the sub-steps only as a range, "1.0 through 1.13". The gameplan then says: *"The sub-step detail
lives in `cr_scratch/step0_integration_draft.md` and is not duplicated here. ... This table is the
index; that file is the plan."*

So the index points to a plan, and the plan is a Step-0-era file. It carries the Step 1 *rows* — 1.0,
1.12 and 1.13 were added there at the open, correctly — and it cannot carry what Step 1 *returned*,
because it was written before Step 1 ran. **The index resolves, the plan resolves, and neither holds
the eighteen deliverables.** The only route to those is `ls cr_scratch/`.

The one place the gameplan describes Step 1's output is a single progress-log row, and it is good: it
names the fourteen sub-steps, the four addenda, the three reviews, what landed on disk, what is
frozen, and it says *"`cr_scratch/step1_orchestrator_verification.md`, which is the file a cold session
should read first."* That sentence is the correct affordance. Three things defeat it:

1. **It is at position 3 of a reverse-chronological log whose stated rule puts it first** (W2-18).
2. **`CLAUDE.md`'s read sequence does not name it.** The sequence is CLAUDE.md, the operational guide,
   `prompt0.md`, the gameplan. A session that reads exactly what it is told to read reaches the
   verification log only by reading the whole progress log and noticing one sentence in one cell.
3. **It points at a verification log, not at a decision record.** The log is the right first read for
   *what happened*. It is not, and does not claim to be, a statement of what Step 1 decided.

### 2.3 Is there a single place that says what Step 1 decided?

No. There are four partial places and each is wrong about its own scope.

| File | What it holds | Why it does not answer the question |
|---|---|---|
| Gameplan progress log | One row, 2026-08-27 | Narrative. Names no artifact by target path. Mis-sorted. |
| `step1_orchestrator_verification.md` | Verdicts on empirical claims | Scoped to claims that were re-run. A decision nobody measured does not appear. |
| `step1_author_rulings.md` | Two author rulings | Its own header: *"Recorded here rather than in the gameplan because gameplan corrections are held until sub-step 1.12's counting-rule contract lands. **Fold in at that point.**"* **1.12 landed. The fold-in has not happened and nothing tracks it.** It also carries two explicit *"flag at the Step 1 close"* items. |
| `accumulator.md` | Persona roster | **Zero Step 1 entries.** Header says "at the close of Step 0". Not in `CLAUDE.md`'s read sequence at all, despite 0.7's specification assigning the Manager to write entries for every persona that ran. |

The loose-ends register is the one instrument that *has* been swept for Step 1 — Status cells carry
Step 1 outcomes, E10's Finding was corrected from two pushes to three — and it is scoped to defects,
which is a different question from decisions. It also fails its own vocabulary on twelve rows (W2-16)
and disagrees with a Step 1 handoff on two more (W2-17).

**A reader has to assemble it from eighteen files.** That is the answer to the question as asked.

### 2.4 What I specify. A promotion manifest, and one gameplan edit

**(a) `oracle/MANIFEST.tsv` — the promotion manifest. New artifact. Specify at the Step 1 close.**

One row per specified deliverable. Tab-separated, `# rows=<n>` header, the size-declaration device
this project already uses on the loose-ends register, the check register and `VERIFIED.tsv`.

```
H  1  <date>  <n>
D  <target-path>  <source-file>  <marker-name>  <promoter-substep>  <gate>  <state>
```

`state` is a closed set of three: `specified` | `promoted` | `superseded`. `gate` names what must land
first, or `-`.

Three checks, one command each, and the third is the one that earns the file:

- **MF-1.** Every row with `state: promoted` has a file at `target-path`.
- **MF-2.** Every row with `state: specified` has a live `<!-- BEGIN <marker> -->` / `<!-- END -->`
  pair in `source-file`.
- **MF-3.** **Every `<!-- BEGIN -->` marker anywhere under `cr_scratch/` has a row.** This is CL-1's
  join applied to deliverables instead of checks, and it is what stops the twelfth specification from
  being invisible the way the eleventh currently is.

It goes under `oracle/` because it describes the contents of `oracle/`, and it gets a row in the check
register like everything else this step produced. **It answers "where is `oracle/bootstrap_contract.md`"
in one grep**, which is the question a Step 2 session actually asks.

**(b) A `### Step 1 sub-steps` table in the gameplan. One edit, no new artifact, and it is the
highest-value item in this report.**

Fourteen rows in the exact form of `### Step 0 sub-steps`: number, description, owner, status,
deliverable path. Plus the four addenda, the three reviews, and the two files that are neither.

The value is not the information — a determined reader can reconstruct all of it. The value is that
**the reader has already learned this form from the Step 0 table and will look for its sibling.** A
pattern that exists for one step and not the next teaches the reader that the document does not carry
that information, and they stop looking. That is a design failure in the strict sense: the signifier is
present, the affordance it advertises is absent, and the reader's correct inference from the document's
own structure is wrong.

**(c) Two one-line corrections, both free and both load-bearing.** `CLAUDE.md`'s read sequence gains
`cr_scratch/step1_orchestrator_verification.md`, since the gameplan already tells the reader it is the
first thing to read. And `accumulator.md`'s header stops saying "at the close of Step 0" — which
requires the Step 1 entries that 0.7's own specification says the Manager writes.

---

## 3. The amendment queue

### 3.1 What is actually in it

Measured across the step. Eight frozen targets, amendments owed from at least eleven documents.

| Target | Sources | Count |
|---|---|---|
| **1.4** `bootstrap_contract.md` | 1.4 testability review (~12 items in unnumbered prose, plus F14 and a simplicity gate taking assertions 19→15); 1.5 §3.1 (six, numbered 1–6) plus §3.3 (two owed blocks) plus one unresolved standoff on BC-5; 1.6 §3.1 (seven, numbered **7–13**); 1.13 §3.1 (one); 1.5/1.13 review X1 (a ruling and a relocation) | **five sources** |
| **1.5** `install_state.md` | 1.6 §3.1 (three); review S1–S8 (eight, two blocking) | two |
| **1.13** `check_register.md` | 1.6 §3.1 (four items); review R1–R8 plus CL-7(b) and CL-8 | two |
| **1.3** `answer_contract.md` | 1.8 §1.9 (V1–V4, version 1→2); 1.6 §12 (five clauses, a version bump, a run-log schema extension) | two |
| **1.7** `NAMING.md` | `Q-PATH-CEILING-259` block (and W2-5's second parent); `FIELDS.tsv` / `INDEX.tsv` re-admission | two |
| **1.9** register rows | three duplicate-id corrections (W2-11) | this file |
| **1.12** `COUNTING_RULE.md` | W2-1 through W2-10 | this file |
| **1.1** `.gitignore` + directory map | review X2: two map rows first, then the `.tsv` re-admission, in that order | one |

**Nothing holds any of it.** The 1.5/1.13 review recommends reconciliation *before* application and
names no artifact to reconcile into. 1.5 §3.1 says the six are listed rather than applied because
"applying them piecemeal would leave the reviewed text and the amended text both in circulation,"
which was the right call and has no other half.

**One arithmetic note on the brief for this review**, since it is the same class of error the contract
exists to catch. The brief states "thirteen further amendments owed against 1.4 from 1.6 alone." 1.6's
table against 1.4 holds seven rows, numbered 7 through 13 because they continue 1.5's numbering. 13 is
the highest row label, not a count. The numbering is the right choice by its author and it is exactly
the shape that produces a misread downstream.

### 3.2 The collisions. X1 is one of at least four, and the other three are unreported

**Collision 1 — X1, found and ruled.** 1.5 §3.1 row 5 (assert the hook file exists, is non-empty,
carries a shebang) against 1.13 §3.1 (delete that assertion; run `git hook run` and read the index
mode). Mutually exclusive. 1.13's wins; 1.5's marker clause relocates to the register as a CL clause.

**And the ruling has not reached the text.** `step1_5_systems_engineer_install_state.md` §3.1 row 5
still reads as an owed amendment with no marker on it. Its file is dated 00:33; the review that
overruled it is dated 00:56. **A reader applying 1.5 §3.1 as written today applies a rejected
amendment**, and there is no field in any document for saying so — which is precisely the missing
`superseded_by` that §3.3 turns on.

**Collision 2 — `Q-CHECK-ROWS`. Three competing successors, from three documents, no two agreeing.**

| Source | Value | Basis |
|---|---|---|
| The block, `step1_13_...:712` | **24** | 7 live, 15 specified, 2 retiring |
| 1.6 §3.1 | **26**, and it specifies the header row verbatim: `H 1 <date> 26 7 17 2` | adds `CHK-25`, `CHK-26` |
| Review R1 + R5 | **+1** | splits `CHK-09` into `--register` and `--wiring` — two rows where there was one |
| Review R4 | **+1 more** | `tools/quantities.js` fails CL-1 the day it lands, so it needs a row |

1.6 wrote a literal header row that will be wrong the moment either review finding is applied. Two
amendments to one integer from two authors, neither aware of the other's arithmetic. **This is E16 at
the level of the amendment queue rather than the document**, and no human found it.

**Collision 3 — `Q-STATE-FACTS`, across two documents.** Review S3 cuts `pdfs_present`, taking
`Q-STATE-FACTS` 4→3 and `Q-STATE-KEYS` 19→18, as an edit **inside 1.5**. Separately, 1.5 §3.3 notes
that 1.4 §1's bare phrase "the four facts" is a second site for `Q-STATE-FACTS` and comes into
`<value> [<id>]` form under the Tier 2 touch rule — an edit **inside 1.4**. If they land separately,
1.4 ships `4 [Q-STATE-FACTS]` against a block reading 3, and M3 exits 1. **Two queues, two documents,
one integer, no holder.**

**Collision 4 — `Q-DEGRADED-MODES`.** 1.5 §3.1 row 4 moves it 6→5 and moves `Q-BLOCKING-MODES`'s
predicate from 3-of-6 to 3-of-5. `Q-BLOCKING-MODES`'s `population` cell reads `the 6 [Q-DEGRADED-MODES]
rows`, so the tagged site is inside the derived block itself. Both corrections are inside 1.4 and are
correctly grouped as one edit — this one is handled. It is listed because it is the only one of the
four that is, and the reason it is handled is that both halves happened to fall in one document.

**Three of the four collisions are cross-document. All three are unreported.**

### 3.3 What should hold it. A register, not a document, and the reason is collision 2

The brief asks whether the queue wants a document, a row in an existing register, or something else.
Three properties decide it:

1. **Size.** Roughly forty-five amendments against eight targets from eleven sources. Past where prose
   holds.
2. **A ruled-out amendment must stay visible and stay marked.** 1.5 §3.1 row 5 is the live proof. Prose
   cannot carry a supersession pointer without becoming a table.
3. **Amendments collide on quantities, and the collision is computable.** Collision 2 is three rows
   naming `Q-CHECK-ROWS`. Collision 3 is two rows naming `Q-STATE-FACTS`. Both are found by
   `cut -f5 | sort | uniq -d`.

Property 3 is the ruling. **A prose list of amendments cannot be checked. A register with a `quantity`
column can, and the check is one line.**

It is **not** a row in the loose-ends register: that register's unit is a defect found during Step 0
and it is the compaction-recovery artifact; forty-five Step 1 edit-obligations would swamp forty-four
findings and change what the file is for. It is **not** a row in the check register either — 1.13's own
boundary rule is that a row is one `(artifact, consequence)` pair for a *check*, and an amendment is
neither.

**`oracle/AMENDMENTS.tsv`.** Same form as everything else this step built.

```
H  1  <date>  <n-total>  <n-owed>
A  <id>  <target>  <section>  <source-substep>  <quantity-id|->  <state>  <superseded-by|->  <text>
```

`state`: `owed` | `applied` | `superseded` | `declined`. Four checks:

- **AM-1.** No two rows with `state: owed` name the same non-`-` quantity id. **Catches collisions 2
  and 3.**
- **AM-2.** Every `superseded-by` resolves to a row that is not itself superseded.
- **AM-3.** Every `target` is a row in `oracle/MANIFEST.tsv` (§2.4a).
- **AM-4.** No row is `applied` while its target's manifest row reads `specified` — an amendment
  cannot land in a document that has not been promoted.

AM-4 is what makes the two files one mechanism rather than two lists, and it is what makes W2-6's
frozen-document problem expressible: a `pending:` entry in a quantity block names an amendment id, the
amendment row names the target, and the manifest row says whether the target exists.

### 3.4 Who reconciles, and the distinction that made X1's siblings invisible

The review's recommendation — *"one person reading all three lists against each other"* — is right and
under-specified, and the under-specification is why I am splitting it. **Two different jobs are being
asked for in one sentence.**

- **Finding which amendments touch one object.** Mechanical once the register exists (AM-1); echo-site
  work before it does. That is this seat's, and it is what produced collisions 2, 3 and 4 above.
- **Ruling which of two colliding amendments survives.** Requires judging whether `git hook run` beats
  a shebang assertion. That is the reviewing persona's, at the gate, and it is what X1 did.

X1 was found by a reviewer reading two files in one pass, which produced the conflict and the ruling
together because they happened to be the two files he was given. **Collisions 2 and 3 span documents
nobody was given together**, which is why they survived a review that was looking for exactly this
class. A person reading all eleven lists will find them; a register finds them without anyone reading
anything, and that is the difference worth paying for.

**Recommendation to The Manager.** The reconciliation is real work with a deliverable and it has no
row. It is one sub-step: build the manifest and the amendment register, load them from the eleven
sources, run AM-1 through AM-4, and return the collision list for disposition. Whoever owns it must not
be the author of most of the amendments — The Systems Engineer wrote four of the eight targets and is
the persona who cannot see the collisions between his own sittings, which is X1's own diagnosis applied
to its own remedy. The Manager rules; the author rules at the gate.

---

## 4. Summary of what this review asserts

- **Sixteen hard `--check` failures are live today**, before any deliverable is lifted. Eight are in
  the counting-rule contract's own file, and every M2 tag failure in the project is mine.
- **The lift-is-a-copy collision is confirmed exactly as The Systems Engineer measured it**: seven of
  his blocks, plus the eighth in my own worked example. His fix works for his two files and cannot work
  for mine; the contract needs an example namespace and a nested-fence rule, not a reserved id.
- **The contract has ten defects (W2-1 to W2-10)**, four of which are missing forms that authors needed
  and invented anyway: arithmetic operations, inherited conditions, quoted ranges, and corrections owed
  against a frozen document. The last is the root of the amendment-queue problem.
- **Three duplicate ids exist now**, in 1.9 against its addendum. Two were named in the brief; the
  third, 43 to 44, has not been named anywhere.
- **The answer contract reads version 1 against nine files reading 2, with a third bump queued.** Land
  all three in one edit or delete the field.
- **The loose-ends register violates its own closed status vocabulary on twelve of forty-four rows**,
  across three undeclared values, and disagrees with 1.6's handoff table about two more.
- **Fifteen specified target paths, zero of which exist**, with no artifact anywhere joining a target
  path to the file that holds its text.
- **The gameplan has a Step 0 sub-step table and no Step 1 sub-step table.** The affordance exists and
  was not extended, which teaches the reader the information is not there.
- **The one gameplan row describing Step 1 sits third in a log that declares its newest row first**,
  and points at a verification log that `CLAUDE.md`'s read sequence does not name.
- **The amendment queue has four collisions, not one.** Three are cross-document and unreported, one of
  them a single integer with three competing successor values. The ruled-out amendment from X1 is still
  live text with no marker on it.
- **Specified, not built:** `oracle/MANIFEST.tsv` with three checks, `oracle/AMENDMENTS.tsv` with four,
  and a `### Step 1 sub-steps` table in the gameplan. The first two are `.tsv` registers with
  self-declared size headers and check-register rows, because that is the form this step converged on.
