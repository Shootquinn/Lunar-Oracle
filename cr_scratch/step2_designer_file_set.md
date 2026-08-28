# Step 2, sub-step 2.19 — the contract half

**The Designer, Cycle A, 2026-08-28.** Three deliverables: the declared file set ruled before the
merge lands, the boundary artifacts given declared paths, and the `AM-` namespace renamed.

**This file declares its own size.** 13 quantity blocks in §7; 10 amendment rows minted in §6, ids
`AM-136` through `AM-145`, of which 6 are `applied` in this pass and 4 are `owed` to two other
seats; 4 falsifiers in §9. Counting rule for each is stated where it appears. A section lost to a bad
splice is detectable by counting.

**What the checker says about this deliverable, run after it was written rather than assumed.**
`node tools/quantities.js --check` reports **14** hard failures against a Step 2 open baseline of 12.
**The two it gained are `M6` and `M7`** — `QUANTITIES.md` is stale, because 33 blocks were minted this
cycle by three seats and the index has not been regenerated. That is a cycle-boundary action and
`QUANTITIES.md` is not in my write set, so I am handing back the two ids rather than regenerating an
index while two other seats hold writes. **No FAIL line names a file I wrote**, and the FAIL set is
otherwise line-for-line the Step 2 open's 12. `node tools/check_registers.js` exits 0.

**Every empirical statement below was produced by a command run in this session, and the command is
written beside it.** Nothing here is quoted from the spawn prompt that briefed me. Two of the spawn
prompt's figures are wrong and §2.6 says which.

---

## 1. Verdict, in one screen

| # | Ruling |
|---|---|
| **1** | **`literature/**/*.md` stays in the CHECK population, unconditionally. It stays in LINT for M5, M8, M9, M14 and M15. It leaves M13's population, unconditionally.** The corpus costs `--check` exactly nothing — the FAIL set and the check-mode LINT set are line-for-line identical before and after the staged merge. It costs `--lint` 43 findings, all M13, all one id, and **0 of 43 are true positives**. |
| **2** | **Spawn prompts and verdict sentences get declared paths under `cr_scratch/relay/`, and M15's population becomes a computed path rule rather than a two-element list in the tool's source.** Measured: with the four Wave 1 spawn prompts staged at those paths, M15 catches a live relay error in spawn A4 that the version-2 population cannot see. |
| **3** | **The checks are renamed `AMC-1`…`AMC-5`, forward-effective from 2026-08-28, with a mechanical discriminator rather than a convention.** The rows keep `AM-nn`. 159 sites carry the retired names and they partition **4 changed / 26 owed forward / 129 left as dated record**. The 4 are the live specification — the check list in `oracle/AMENDMENTS.tsv`'s header, which is the one place a reader is sent for a check's definition. **It is not done until `tools/check_registers.js` prints the new names**, and I am saying so rather than calling item 24 discharged. |

**One finding that is not a ruling, and it is the one I would keep if I could keep only one.** The
premise this sub-step was written on — *"corpus summaries are dense with exactly the tokens M8 and
M13 key on"* — is **true of M13 and false of M8**. M8 returned **zero** findings over 176 corpus
files, because its pattern requires the literal form "N lines above". Had I ruled from the premise
instead of measuring it, I would have pulled four clauses out of a population that produces nothing
from three of them, in the files Step 2 is about to fill with provenance records. **The estimate and
the measurement disagreed in a direction that would have made the contract worse.**

---

## 2. Ruling 1 — the declared file set

### 2.1 What was staged, and the sampling rule

**Sampling rule: there is no sample.** The whole prospective population was staged. A script copied
the declared file set's skeleton into a scratch root and populated `literature/` with the normalized
union of `lsei/literature/**/*.md` and `_intake/japanese-miracle/lit/*.md`, keyed by `normalize()`
implemented verbatim from `literature/NAMING.md` §1 — strip one trailing `.md` case-insensitively,
lowercase, collapse runs of underscore-or-space to one hyphen, collapse runs of two-or-more hyphens,
trim leading and trailing hyphens. The checker was pointed at that root through its `QJS_ROOT`
environment variable, so no file in this repository was touched by the measurement.

**The staging reproduced the orchestrator's baseline to the file, before anything was measured
against it:**

```
A(lsei) 152  B(intake) 119  normalized-collisions 95  B-only 24  union 176  winner lsei
```

That is `cr_scratch/step2_orchestrator_baseline.md`'s normalized figures — 95, 57, 24, 176 — matched
by an independent implementation of the same function. **The staging is not trusted because it was
written carefully; it is trusted because it reproduces a figure a different seat measured first.**
This is the arm 2b known-answer test applied to a fixture rather than to a register.

**Content tie-break, and its sensitivity, measured rather than assumed.** 95 normalized keys are
claimed by both corpora and the two copies are not always byte-identical. The primary staging gives
the `lsei` copy the key. A second staging gave the `_intake` copy every one of the 95. **Both
stagings return the same totals** — 107 lint findings, 56 M13, 25 M8, 18 M9, 6 M15, 2 M14 — so the
tie-break is not load-bearing at this resolution and the ruling does not rest on it.

### 2.2 The measurement

| | before the merge | after the merge | delta |
|---|---|---|---|
| declared file set | **76 [Q-D219-FILESET-PRE]** | **252 [Q-D219-FILESET-POST]** | +176 |
| `--check` FAIL lines | **12 [Q-D219-CHECK-FAILURES]** | **12 [Q-D219-CHECK-FAILURES]** | **0** |
| `--check` LINT lines | 39 | 39 | **0** |
| blocks parsed / distinct tag sites | 72 / 132 | 72 / 132 | **0** |
| `--lint` findings | **64 [Q-D219-LINT-PRE]** | **107 [Q-D219-LINT-POST]** | **+43 [Q-D219-M13-CORPUS]** |
| the delta, by clause | — | M13, all of it | — |
| the delta, by id | — | `Q-REG-IDF-LOSS-FULL`, all of it | — |
| the delta, true positives | — | **0** | — |

Commands, per §3 rule 11 of the contract:

```
node tools/quantities.js --files-only | wc -l
node tools/quantities.js --check | grep -c '^FAIL '
node tools/quantities.js --lint  | grep -c '^LINT '
QJS_ROOT=<stage> node tools/quantities.js --check | grep -c '^FAIL '
QJS_ROOT=<stage> node tools/quantities.js --lint  | grep -c '^LINT '
diff <(pre FAIL lines) <(post FAIL lines)     -> empty
diff <(pre check-mode LINT) <(post check-mode LINT) -> empty
```

The two `diff` results are the load-bearing ones and they are why the CHECK ruling is not a judgment
call. The FAIL set is not merely the same size after the merge; it is the same lines.

### 2.3 The ruling, and why it is M13 rather than `literature/`

**CHECK: in, unconditionally.** A corpus summary carries no quantity block and no quotation tag, so
it contributes nothing to M1, M2, M3, M4, M6, M7, M10, M11 or M12 today. Excluding the tree would
buy zero findings and would exempt, in advance, every block and tag Step 2 is about to write into
those files — the `## Provenance` records of 2.2, the machine-readable field labels of 2.3, and any
count a summary states about the corpus itself. **A merged corpus that silently leaves the declared
set is the same defect as one that silently enters it**, and leaving is the direction nobody was
watching for.

**LINT: in for M5, M8, M9, M14 and M15; out for M13.** Each of those four returned **zero** findings
over the 176 staged files. My own stated rule is to *demote or delete the check that produces
findings no author was working around* — the check, not the files. The finding-producing clause is
M13 and only M13, and cutting the tree instead of the clause would remove four clauses from a
population that generates nothing from them, in exactly the files Step 2 is about to turn into
carriers of registers and provenance blocks.

**Why the corpus is not `lsei/`, which is the precedent I was told to test rather than assume.** The
`lsei/` exclusion turns on files this project does not own. These files are ours. The distinction
this contract did not have is that **a corpus summary is our file holding somebody else's prose.**
The apparatus we write into it is governed; the transcribed body is not, because its numerals were
written before this project's quantities existed and cannot be quotations of them. The precedent is
about ownership of files; this case is a file we own whose sentences we did not write, and it needed
its own ruling.

**And the split needs no new machinery, which is the part worth stating.** M13 is the only clause
that reads free prose *and* fires. M8 and M9 read prose and measure zero. Every other clause reads
blocks and tags, which exist only where we put them. So the body/apparatus distinction is
implemented today by scoping one clause, and a future clause that reads free prose inherits the
question rather than the answer.

### 2.4 What the 43 findings actually are

All 43 name one id, `Q-REG-IDF-LOSS-FULL`, whose block reads `value: 7.73` and
`unit: percent, mean relative loss of idf across the 82 match_keys that survive K1`.

- **36 [Q-D219-M13-DECIMAL]** of the **43 [Q-D219-M13-CORPUS]** match a numeral whose preceding
  character is a decimal point:
  `44.7 percent`, `7.5 percent`, `3.7 percent`. A word boundary sits between `.` and `7`.
- **7 of 43** are a genuine standalone "7 percent" — German industrial output rising 7 percent in
  the IMF's 1963 appraisal of Japan's income-doubling plan, a 7-percentage-point rise in incumbent
  re-election in van der Ploeg's resource-curse review, and five like them.
- **0 of 43** relay any quantity this project asserts.

Two independent implementation defects produce the 36, and neither is in the contract:
`parseInt("7.73")` returns `7`, so a non-integer block enters a clause that keys on integers; and the
generated pattern `\b(seven|7)\s+percent` matches the tail of any decimal ending in `.7`. That is a
row for The Software Engineer, `AM-138`, not a reason to change the contract.

### 2.5 The residual, and why 43 is a floor

M13 false-positives when a block's `unit` field, **cut at its first comma, semicolon or
parenthesis**, is a short common noun. That truncation is why the clause is normally quiet: the noun
is usually a three-word project-specific phrase like "degraded modes that" or "distinct source
references", which never appears in a lunar-geology summary.

Of the **30 [Q-D219-M13-TRIGGER-BLOCKS]** blocks that meet M13's value trigger today — class
`fixed`, integer value 0 to 20 — exactly one has the common-noun property, and it has it because a
comma truncates its unit to the bare word `percent`.

Measured forecast, not asserted: a probe block carrying `unit: years, the span the taxonomy covers`
and `value: 8` added **5** corpus findings on its own, taking the total from 107 to 122. A second
probe truncating to `files` added zero, because "5 files" happens not to appear.

**Step 2 mints corpus-population blocks whose natural nouns are `files`, `summaries`, `sources` and
`folders`.** The exposure is linear in the number of blocks whose unit truncates to a common noun,
and this is the step that mints them. 43 is a floor. That is why the exclusion is a population clause
in §8 rather than a decision deferred until somebody complains about the noise.

### 2.5a The clause fired 14 more times on the document explaining why it misfires

I ran `--lint` after writing §2.4 and §2.5. M13 rose from 13 findings to 26 — 13 of them mine. I then
wrote this paragraph and re-ran it, and **it rose again, to 28, because describing the false positive
produces one.** The figure is now 14. **All 14 are mine, all are `Q-REG-IDF-LOSS-FULL`, and all are
the string that the clause mistakes for a governed numeral, written in the course of explaining that
the clause mistakes it** — in this file, in `COUNTING_RULE.md` §8, and in
`oracle/AMENDMENTS.tsv` row `AM-137`.

This is not an embarrassment to be managed. **It is the strongest available evidence for the ruling,
and it is the pattern this project has now seen four times: the author of a countermeasure produces
the defect at the highest rate while writing it.** A clause a document cannot describe without
tripping is a clause whose false positives are not a tuning problem. It also means `AM-138` has a
regression corpus already written: fixing M13's integer parse and its decimal-boundary match must
take these 14 to zero without touching the seven genuine standalone matches in the corpus.

**And I did not find it by reading the lint output for my own name. I found it by running the tool
after editing, which is the only reason it is in this report rather than in the next one.**

### 2.5b The declared file set moved under the measurement, and that is a Step 2 hazard

`--files-only` returned 76 when I began and **82** when I finished. The six new files are this
deliverable plus five Wave 1 deliverables from three other seats, landed concurrently:
`step2_engineer_identity.md`, `step2_engineer_taxonomy.md`, `step2_orchestrator_verification.md`,
`step2_software_engineer_corpus_suite.md` and `oracle/tests/corpus_suite.md`.

**Every file-set figure in this report is stated on the 76-file basis and every block says so in
`conditions`.** The post-merge 252 is 76 + 176 on that same basis. **A file-set census taken during a
concurrent cycle is a measurement of a moving population**, and The Manager's close item 27 —
concurrency declared before any wave ran — is the clause that makes this reportable rather than
merely true.

### 2.6 Two figures in my own spawn prompt are wrong, and one of them is instructive

**"the declared file set is 75 files".** Measured today: 76. The gap is not an error in anybody's
arithmetic. **The declared file set contains the file that states its size**, so the number moves
when the report is written. It will be 77 once this deliverable is saved, and 253 rather than 252
after the merge. My blocks state the pre-deliverable figures and say so in `conditions`.

That reflexivity is worth naming for a step this count-heavy: **a census of the declared file set is
stale the moment it is written into a file inside it.** Any Step 2 deliverable stating a file-set
size must state whether its own file is counted.

**"Corpus summaries are dense with exactly the tokens M8 and M13 key on".** True of M13. False of M8,
which returned zero. §1 says what would have followed from believing it.

---

## 3. Ruling 2 — the boundary artifacts, the contract half

### 3.1 The declared paths

```
cr_scratch/relay/spawn/<step>_<cycle>_<seat>.md     a spawn prompt, written BEFORE the agent runs
cr_scratch/relay/verdict/<step>_<seat>_<date>.md    a verdict sentence, written BEFORE it is spoken
```

**The ordering words are the clause, not decoration.** A spawn prompt written after the agent ran is
a transcript; a verdict sentence written after it was spoken is a minute. Neither is a boundary
artifact, and neither is what arm 2a moves.

**These paths add nothing to §8's five globs, and I am not claiming they do.** `cr_scratch/**/*.md`
already covers them. Naming them in §8 is an affordance for a reader who could not otherwise tell
that a spawn prompt is governed at all. **The mechanism change is M15's population**, and pretending
otherwise would be exactly the kind of claim this project keeps having to unwind.

### 3.2 M15's population becomes computed

At version 2, `tools/quantities.js` holds `const RELAY_FILES = ['accumulator.md',
'lunar-oracle-gameplan.md'];`. **A hard-coded list is a thing somebody must remember to extend** —
the defect class arm 2a exists to remove — and a longer hard-coded list repeats it at a larger size.
So the contract now specifies the population as a path rule and forbids the enumeration:

```
accumulator.md
lunar-oracle-gameplan.md
cr_scratch/relay/**/*.md
oracle/VERIFIED.tsv
```

`oracle/VERIFIED.tsv` is in because The Manager's remedy names the verification record explicitly:
*"a verdict sentence written into the verification record before it is spoken is in it too."*

### 3.3 The measurement — the remedy works, and the test isolates what it depends on

The four Wave 1 spawn prompts of `cr_scratch/step2_manager_open.md` §4.1–4.4 were extracted verbatim
to `cr_scratch/relay/spawn/step2_cycleA_A{1,2,3,4}.md` in a staged root. M15 was then run over that
root under three conditions, with the population change made in a scratchpad copy of the tool and not
in the repository.

| Condition | relay files scanned | M15 findings |
|---|---|---|
| version-2 population, two files | 2 | 6 |
| computed population | **7 [Q-D219-M15-WIDE-FILES]** | 6 |
| computed population, with the relayed number minted as a block | 7 | **8** |

The third row is the result. With a block minted for the corpus union, M15 reports:

```
LINT M15 cr_scratch/relay/spawn/step2_cycleA_A4.md:29 relays 176 summaries without a tag;
         the id is Q-PROBE-CORPUS-UNION (section 3 rule 12)
```

**A live arm-2a relay error, in a Wave 1 spawn prompt written this session, caught by the existing
tool with no change beyond the population.** Under the version-2 population, on the same tree, with
the same block, that finding does not appear at all. The Manager's remedy is correct and it is cheap:
it costs a directory and one predicate.

### 3.4 Two limits, and what they do to falsifier F1

I found both while testing the remedy, and neither is in his close.

**Limit 1 — M15 fires only on a numeral that is already a governed quantity.** It compares a relayed
value against the `value` of an existing block. **Every numeral in the four Wave 1 spawn prompts is
ungoverned**: no block exists for the declared file set's size, for the corpus union, or for the lint
volume. `QUANTITIES.md` has 64 blocks and none of them is any of those. The widened M15 found nothing
in the four prompts until a block was minted by hand — which is the second row of the table above,
7 files scanned and 6 findings, unchanged. **Moving the artifact into the population is necessary and
it is not sufficient.**

**Limit 2 — a relayed number that is WRONG is invisible to M15.** A probe block minted at 76 for the
declared file set did **not** fire on spawn A4's sentence "the declared file set is 75 files",
because 75 is not 76. M15 detects an untagged relay of a *correct* value and is silent on an
incorrect one. This is uncomfortable to state about the only mechanism arm 2 has, which is why it is
stated. The theory under the tag requirement survives it: writing the tag forces the lookup, and the
lookup is where a wrong number is caught. But that is a forcing function on a person, not an
assertion by a script, and it belongs in H7 with the rest of them.

**What follows for F1.** F1 asks whether errors of this family persist once the artifacts sit in a
declared file set. The measurement supports moving them. It does not support the stronger reading in
which the move closes arm 2a — six of arm 2a's errors were *wrong* numbers, and Limit 2 says M15 is
silent on those. **F1 should be read as testing the channel only**, and its antecedent is satisfied by
the move regardless of how it fires. Both limits are now written into H7 so the next reader inherits
them rather than rediscovering them.

### 3.5 The test The Manager set, and whether it will pass

His close item 19: *"if `M15`'s file list at the Step 2 close is still the two files it was at Step
1's, arm 2a's remedy was never applied."* The contract now says the list is not a list. The tool half
is `AM-141`, owned by The Software Engineer, and item 19 is dischargeable the moment
`node tools/quantities.js --lint` reports `NOTE M15 <n> untagged relays across <k> relay files` with
`k > 2`. That is one grep and it needs no judgment.

---

## 4. Ruling 3 — the `AM-` rename

### 4.1 The census

**159 [Q-D219-AMC-SITES] occurrences of an unpadded single-digit `AM-` token, across 17 files.**
Counting rule: `grep -aoE '\bAM-[1-5]\b'` over every path returned by
`node tools/quantities.js --files-only`, counting occurrences and not lines. The partition closes:
`AM-1` 88, `AM-2` 14, `AM-3` 17, `AM-4` 22, `AM-5` 18, summing to 159. A widened sweep for
`\bAM-[0-9]\b` returns the same 159 — **there is no unpadded `AM-0`, `AM-6`, `AM-7`, `AM-8` or
`AM-9` anywhere**, which is what makes the discriminator in §4.3 available.

| Where | occurrences | may I edit it |
|---|---|---|
| `oracle/AMENDMENTS.tsv` | 15 | yes — my write set |
| `COUNTING_RULE.md` | 1 | yes — my write set |
| `tools/check_registers.js` | 22 | no — The Software Engineer's |
| `oracle/check_register.md` | 4 | no — The Systems Engineer's |
| `accumulator.md` | 8 | no — the historical record |
| `lunar-oracle-gameplan.md` | 2 | no — the index of record |
| nine frozen `cr_scratch/step1_*` deliverables | 107 | no — four other seats' frozen arguments |

**16 [Q-D219-AMC-SITES-MINE] in my write set. 143 outside it. 26 [Q-D219-AMC-SITES-OWED] owed
forward to two other seats.** 16 + 143 = 159; 26 of the 143 are live and the other 117 are history.

**What I actually changed is 4, not 16, and the difference is a ruling rather than a shortfall.** Of
the 16 in my write set, **4** are the live specification — the check list in
`oracle/AMENDMENTS.tsv`'s header, the one place a reader is sent for what a check asserts — and those
are renamed. The other **12** are dated record: the finding text of rows `AM-15`, `AM-74`, `AM-109`,
`AM-112`, `AM-129` and `AM-132`, filed between R-2 and C-1, and `COUNTING_RULE.md` §11's
version-2 change table. Rewriting those would contradict §4.2 one paragraph after I argue it, and a
rule its author exempts himself from is not a rule. **4 changed + 26 owed + 129 record = 159.**

**A fifth line was added, not renamed.** The header listed four checks from 1.14 until today, and
there have been five since R-3, when `AM-112` was implemented as the fifth. The list was wrong by one
and had been for two revision passes. `oracle/check_register.md`'s `CHK-28` cell carries the identical
understatement and that is `AM-145`. **Neither was found by reading; both were found by counting the
checks the tool actually runs against the list that claims to name them.**

### 4.2 A full rename is impossible for one seat and would be wrong for any

A rename executed inside my declared write set reaches **16 of 159 sites — 10%**. That is not a
rename; it is a second convention, and The Manager's item 24 correctly refuses those.

But the 143 I cannot reach are not an obstacle to route around. **They are the historical record, and
rewriting them would be falsifying it.** `AM-1 returns four collisions at 1.14` is a true statement
about a check that was called `AM-1` when it ran. Changing it to `AMC-1` would make a 2026-08-27
report describe a name that did not exist until 2026-08-28. The Manager's own falsifier F3 names
editing another persona's frozen argument as the thing this project does not do, and nine of those
files belong to four other seats.

**So the rename cannot be a search-and-replace, and it should not be. It has to be a dated
boundary.**

### 4.3 The rename, as ruled

**1. The checks are `AMC-1` … `AMC-5`, from 2026-08-28.** Authority: the header of
`oracle/AMENDMENTS.tsv`, which is both the file the checks read and the file that documents them.
Renaming the checks rather than the rows is forced by size — 5 names against 135 — and by citation
traffic: every row reference in the project would break the other way.

**2. `AM-1` … `AM-5` are retired names, and the retirement carries its date.** A document whose
content predates 2026-08-28 and says `AM-1` names the check. That reading is fixed by the date, needs
no edit, and the 143 historical sites are correct exactly as they stand.

**3. The discriminator is mechanical, not a convention.** A row id is `AM-` followed by **two or more
digits** — the register already writes `AM-01`, so the row side needs no edits and no author needs to
remember to pad. A check id is `AMC-` followed by one digit. Therefore:

> `AM-` followed by exactly one digit at a word boundary is a defect token. **Scope: rows of
> `oracle/AMENDMENTS.tsv` whose `source-substep` is 2.19 or later, and the output of
> `tools/check_registers.js`.** The test is
> `grep -aE '\bAM-[0-9]\b' | grep -v 'AMC-'`, and it must return nothing.

That is a check. It is the difference between this and gate item C-1's zero-padding, which made one
seat's writing unambiguous without making anyone else's *detectably* ambiguous. C-1 was right as far
as it went and its limit is exactly that it could not be checked.

**I wrote that test unscoped first, ran it, and it failed against me — which is the third time on
this project that running an amendment rather than reading it produced the finding.** Unscoped, it
flags 15 lines of this deliverable and 8 lines of the register, and **every one of them is a document
explaining the rename.** A rule that fires hardest on the documents most obliged to name the old name
is a rule producing findings no author was working around, and my own stated practice is to demote
it. So it is scoped, on two grounds that are measurements rather than convenience:

- **The `AMC-` allowance is not a loophole; it is the observed shape of a legitimate mention.** After
  the boundary, the only reason to write a retired name is to say what it became, and a line doing
  that carries both names. Measured over the ten rows filed at 2.19: eight contain no unpadded token
  at all, and the two that do — `AM-143` and `AM-144`, which *are* the rename — carry `AMC-` on the
  same line. The scoped test passes today with nothing suppressed by hand.
- **A register accumulates dated rows, so a file-level date test cannot work on it.** `AMENDMENTS.tsv`
  postdates the boundary as a file and holds rows filed at R-2, R-3, R-4 and C-1 whose content does
  not. The `source-substep` column is the per-row date and the scope uses it. For prose files there
  is no per-line date, which is why prose is out of the test's scope and in the boundary rule's.

**And the substance of the rename does not depend on the test at all.** `AM-` is not a substring of
`AMC-1`. The two namespaces are separable by grep now and were not before, and that is a property of
the identifiers rather than a rule anybody follows. The scoped test is enforcement on top of a fix
that already holds without it.

**4. `AMC-` cannot be confused with `AM-` by any tool.** `AM-` is not a substring of `AMC-1`, so a
grep for row references cannot pick up a check reference and vice versa. That was not true of the old
pair and it is the whole point.

### 4.4 Does this satisfy close item 24?

Item 24: *"No sentence saying `AM-2` is green can be read as covering row `AM-02`."*

- After the boundary, no sentence says `AM-2`. It says `AMC-2`, or it is a defect token a grep finds.
- Before the boundary, `AM-2` has exactly one reading, fixed by the date, and §4.1's sweep confirms
  every one of the 159 historical occurrences is in fact a check reference — I read them.

Either way the sentence has one reading, which is what item 24 asks for. **If The Manager wants the
143 rewritten anyway, that is his ruling to make and it costs nine other seats' frozen files; I am
recording that I declined it deliberately rather than missed it.**

### 4.5 What is not done, stated plainly

**The rename is real only when `tools/check_registers.js` prints `OK AMC-2`.** Until then the
register header says one thing and the tool says another, and the printed name is the one a reader
greps for. That is `AM-144`, and `oracle/check_register.md`'s `CHK-28` cell is `AM-145`.

**So: my half is complete and item 24 is not dischargeable at the Step 2 close until those two rows
land.** I am not offering "renamed, pending the tool." I am naming the two rows, their owners, and
the two commands that test them:

```
node tools/check_registers.js --amendments | grep -aE '\bAM-[0-9]\b' | grep -v AMC-
awk -F'\t' '$1=="A" && $5 ~ /^2\./' oracle/AMENDMENTS.tsv |
  grep -aE '\bAM-[0-9]\b' | grep -v AMC-
```

Both must return nothing. The second passes today, measured; the first cannot pass until `AM-144`
lands, because the tool still prints the retired names.

**A defect found while doing the census, and it is not mine.** `oracle/check_register.md`'s `CHK-28`
What cell reads *"--amendments: AM-1 to AM-4 over oracle/AMENDMENTS.tsv"*. There are five checks —
`AM-5` was added at R-3 as the implementation of `AM-112`. The cell understates the check set by one
and has done since R-3. `AM-145` carries both the rename and the correction, because a seat editing
that cell should not have to find the second defect after fixing the first.

---

## 5. Register censuses, each against the register's own `H` row

Arm 2b's known-answer test, applied on the same line as every census I state.

| Register | my count | its `H` row | agree |
|---|---|---|---|
| `oracle/AMENDMENTS.tsv`, `A` rows before this deliverable | 135 | `H 1 2026-08-27 135 64` declares 135 | **yes** |
| `oracle/AMENDMENTS.tsv`, `owed` rows before this deliverable | 64 | the same row declares 64 | **yes** |
| `oracle/AMENDMENTS.tsv`, distinct ids before this deliverable | 135 | 135 rows, so ids are unique | **yes** |
| `oracle/MANIFEST.tsv`, `D` rows | 20 | `H 1 2026-08-27 20` declares 20 | **yes** |
| `QUANTITIES.md`, blocks | 64 | the header declares 64 | **yes** |

Counting rules: `awk -F'\t' '$1=="A"' | wc -l`; `awk -F'\t' '$1=="A" && $7=="owed"' | wc -l`;
`awk -F'\t' '$1=="A"{print $2}' | sort -u | wc -l`; `awk -F'\t' '$1=="D"' | wc -l`;
the `**N blocks.**` line of `QUANTITIES.md`, checked by M7.

**After this deliverable**: 145 `A` rows, of which 68 `owed`. The `H` row is updated in the same edit
that adds the rows, which is the only way the declaration stays a known answer instead of becoming a
second thing to remember.

---

## 6. Amendment rows minted — 10 rows, `AM-136` to `AM-145`

| id | target | state | what |
|---|---|---|---|
| `AM-136` | `COUNTING_RULE.md` §8 | applied | `literature/**/*.md` ruled into CHECK unconditionally; the measurement is in the section |
| `AM-137` | `COUNTING_RULE.md` §9 M13 | applied | M13's population excludes `literature/**/*.md`, unconditionally, not behind a flag |
| `AM-138` | `tools/quantities.js` | **owed** | M13's two implementation defects: `parseInt` admits a non-integer `value`, and `\b` matches the tail of a decimal. 36 of 43. **The Software Engineer** |
| `AM-139` | `COUNTING_RULE.md` §8 | applied | the relay paths named, with the ordering words, and with the explicit statement that they widen nothing |
| `AM-140` | `COUNTING_RULE.md` §9 M15 | applied | M15's population is a computed path rule and is never enumerated in the tool's source |
| `AM-141` | `tools/quantities.js` | **owed** | implement M15's computed population. Measured to catch a live relay error in spawn A4. Close item 19. **The Software Engineer** |
| `AM-142` | `COUNTING_RULE.md` §10 H7 | applied | H7 gains M15's two measured limits, and F1 is scoped to the channel |
| `AM-143` | `oracle/AMENDMENTS.tsv` | applied | the `AMC-` rename, its dated boundary, and its mechanical discriminator |
| `AM-144` | `oracle/check_register.md` `CHK-28` | **owed** | `tools/check_registers.js` prints `AMC-n`. **The Software Engineer** |
| `AM-145` | `oracle/check_register.md` `CHK-28` | **owed** | the `CHK-28` What cell: rename, and correct "AM-1 to AM-4" to five checks. **The Systems Engineer** |

**`AM-144` targets `oracle/check_register.md` and not the tool it is about, and that is a defect in
the register rather than a choice.** Check `AMC-3` requires every amendment target to be a row in
`oracle/MANIFEST.tsv`, and **`tools/check_registers.js` has no manifest row** — the manifest holds 20
`D` rows and that path is not among them. So a correction to it has nowhere to be recorded. **This is
`AM-129`'s third live instance**, the first two being The Designer's own at R-4, and it is now
blocking a row rather than merely being noted. `AM-138` and `AM-141` escape it only because
`tools/quantities.js` *does* have a manifest row.

---

## 7. Quantity blocks — 13

```quantity
id:            Q-D219-FILESET-PRE
class:         fixed
value:         76
unit:          files in the declared file set of COUNTING_RULE.md section 8
population:    the five globs of section 8, resolved against this repository
operation:     cmd: node tools/quantities.js --files-only | wc -l
conditions:    cwd: repository root, 55 characters. Measured BEFORE this deliverable was written;
               the declared set contains this file, so the figure is 77 once it is saved.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the declared file set held 76 files at the Step 2 open, before sub-step 2.19's
               deliverable existed
derived-from:  none
sampled:       no — every file in the set was enumerated
superseded:    none. The spawn prompt for this sub-step states 75; that figure predates a file
               that has since entered the set, and is not corrected here because it is not a block.
```

```quantity
id:            Q-D219-FILESET-POST
class:         fixed
value:         252
unit:          files in the declared file set after the staged corpus merge
population:    the five globs of section 8, resolved against the staged merge root
operation:     cmd: QJS_ROOT=<stage> node tools/quantities.js --files-only | wc -l
conditions:    cwd: repository root, 55 characters. Same pre-deliverable basis as
               Q-D219-FILESET-PRE; 76 + 176 = 252.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the merge takes the declared file set from 76 files to 252
derived-from:  Q-D219-FILESET-PRE, Q-D219-STAGED-CORPUS
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-STAGED-CORPUS
class:         provisional
value:         176
unit:          summaries in the normalized union staged for this measurement
population:    lsei/literature/**/*.md and _intake/japanese-miracle/lit/*.md, keyed by normalize()
               as literature/NAMING.md section 1 states it
operation:     script: a staging script in the session scratchpad, reported as
               "A(lsei) 152 B(intake) 119 normalized-collisions 95 B-only 24 union 176"
conditions:    cwd: repository root, 55 characters. This is a FILENAME-KEYED union, not an
               identity-keyed one.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the population staged for the file-set measurement was 176 summaries, reproducing
               cr_scratch/step2_orchestrator_baseline.md's normalized figures exactly
derived-from:  none
sampled:       no — the whole population was staged
superseded:    none. PROVISIONAL: sub-step 2.1 (MERGE-2) emits the identity-based count and
               supersedes every filename-based figure, per loose end B5. Quote this with 2.1 named.
```

```quantity
id:            Q-D219-CHECK-FAILURES
class:         fixed
value:         12
unit:          hard failure lines reported by the counting-rule checker
population:    FAIL lines at column 0 of node tools/quantities.js --check
operation:     cmd: node tools/quantities.js --check | grep -c '^FAIL '
conditions:    cwd: repository root, 55 characters. The pattern is anchored at column 0 and
               carries the trailing space, per section 3 rule 11.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the checker exits 1 with 12 hard failures, and the staged corpus merge changes
               neither the count nor the lines
derived-from:  none
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-LINT-PRE
class:         fixed
value:         64
unit:          soft findings reported by the counting-rule linter before the merge
population:    LINT lines at column 0 of node tools/quantities.js --lint
operation:     cmd: node tools/quantities.js --lint | grep -c '^LINT '
conditions:    cwd: repository root, 55 characters. Distribution 25 M8, 18 M9, 13 M13, 6 M15,
               2 M14, summing to 64.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the linter reports 64 findings over the pre-merge declared file set
derived-from:  none
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-LINT-POST
class:         fixed
value:         107
unit:          soft findings reported by the counting-rule linter after the staged merge
population:    LINT lines at column 0 of the linter run against the staged merge root
operation:     cmd: QJS_ROOT=<stage> node tools/quantities.js --lint | grep -c '^LINT '
conditions:    cwd: repository root, 55 characters. Identical under both content tie-breaks for
               the 95 normalized collisions, so the figure does not depend on the tie-break.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the merge takes the linter from 64 findings to 107, and the whole rise is M13
derived-from:  Q-D219-LINT-PRE, Q-D219-M13-CORPUS
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-M13-CORPUS
class:         fixed
value:         43
unit:          M13 findings landing inside the staged literature tree
population:    LINT M13 lines whose path begins literature/, over the staged merge root
operation:     cmd: QJS_ROOT=<stage> node tools/quantities.js --lint | grep '^LINT M13'
               | grep -c ' literature/'
conditions:    cwd: repository root, 55 characters. All 43 name one id, Q-REG-IDF-LOSS-FULL,
               across 21 distinct corpus files.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the corpus contributes 43 M13 findings and none of them is a true positive
derived-from:  none
sampled:       no — every finding was read
superseded:    none
```

```quantity
id:            Q-D219-M13-DECIMAL
class:         fixed
value:         36
unit:          of the corpus M13 findings whose matched numeral follows a decimal point
population:    the 43 source lines of Q-D219-M13-CORPUS
operation:     script: extract each cited line from the staged root, then
               grep -cE '[0-9]\.7 percent'
conditions:    cwd: repository root, 55 characters. The complement, 7, is a genuine standalone
               "7 percent" in a source document about an unrelated subject.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     36 of the 43 corpus M13 findings are produced by a word boundary between a decimal
               point and the digit 7, and are an implementation defect rather than a finding
derived-from:  Q-D219-M13-CORPUS
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-M13-TRIGGER-BLOCKS
class:         fixed
value:         30
unit:          blocks that meet M13's value trigger in the current index
population:    rows of QUANTITIES.md with class fixed whose value parses to an integer 0 to 20
operation:     script: parse QUANTITIES.md rows and apply M13's own admission test
conditions:    cwd: repository root, 55 characters. Exactly one of the 30 has a unit that
               truncates, at its first comma, to a short common noun.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     30 of the 64 indexed blocks are admitted by M13 today, and the corpus false-positive
               exposure is linear in how many of them carry a common-noun unit
derived-from:  none
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-M15-WIDE-FILES
class:         fixed
value:         7
unit:          relay files scanned by M15 under the computed population
population:    accumulator.md, lunar-oracle-gameplan.md, oracle/VERIFIED.tsv, and the four Wave 1
               spawn prompts staged under cr_scratch/relay/spawn/
operation:     cmd: QJS_ROOT=<stage> node <patched tool> --lint | grep '^NOTE M15'
conditions:    cwd: repository root, 55 characters. The tool patch lives in the session scratchpad;
               no file in this repository was modified to take this measurement.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the computed population takes M15 from 2 relay files to 7, which is the comparison
               The Manager's close item 19 tests
derived-from:  none
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-AMC-SITES
class:         fixed
value:         159
unit:          occurrences of an unpadded single-digit AM- check reference
population:    every path returned by node tools/quantities.js --files-only, 76 files
operation:     cmd: per file, grep -aoE '\bAM-[1-5]\b' and sum the occurrence counts
conditions:    cwd: repository root, 55 characters. Occurrences, not lines. -a because
               tools/check_registers.js is detected as binary. Partition: AM-1 88, AM-2 14,
               AM-3 17, AM-4 22, AM-5 18.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     159 sites across 17 files carry the retired check names, and a sweep for
               \bAM-[0-9]\b returns the same 159, so no other single-digit form exists
derived-from:  none
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-AMC-SITES-MINE
class:         fixed
value:         16
unit:          occurrences inside this sub-step's declared write set
population:    the 159 occurrences of Q-D219-AMC-SITES, restricted to oracle/AMENDMENTS.tsv and
               COUNTING_RULE.md
operation:     cmd: for f in oracle/AMENDMENTS.tsv COUNTING_RULE.md; do
               grep -aoE '\bAM-[1-5]\b' "$f"; done | wc -l
conditions:    cwd: repository root, 55 characters. 15 in oracle/AMENDMENTS.tsv, 1 in
               COUNTING_RULE.md, both measured before this sub-step edited either file.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     a rename executed inside one seat's write set reaches 16 of 159 sites, which is why
               the rename is a dated boundary rather than a search and replace; of the 16, four are
               the live specification and were renamed, and twelve are dated record and were not
derived-from:  Q-D219-AMC-SITES
sampled:       no
superseded:    none
```

```quantity
id:            Q-D219-AMC-SITES-OWED
class:         fixed
value:         26
unit:          occurrences owed forward to another seat after this sub-step
population:    the 159 occurrences of Q-D219-AMC-SITES, restricted to tools/check_registers.js and
               oracle/check_register.md
operation:     cmd: for f in tools/check_registers.js oracle/check_register.md; do
               grep -aoE '\bAM-[1-5]\b' "$f"; done | wc -l
conditions:    cwd: repository root, 55 characters. 22 and 4. The other 117 occurrences are
               historical record and are deliberately not edited.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     26 live sites remain, in two files owned by two other seats, and they are AM-144
               and AM-145
derived-from:  Q-D219-AMC-SITES
sampled:       no
superseded:    none
```

---

## 8. Checklist for the cycles that follow

For The Software Engineer, Cycle B:

1. `AM-138`. M13 admits only an integer `value`, and its generated pattern does not match a numeral
   preceded by `.`. Regression fixture: `Q-REG-IDF-LOSS-FULL` at 7.73 against the line
   `an average cost overrun of 44.7 percent` must produce nothing.
2. `AM-141`. M15's population from a path rule. **Do not add three strings to `RELAY_FILES`.** The
   contract forbids the enumeration, and a longer list is the same defect at a larger size.
3. `AM-137`. M13 skips `literature/**/*.md`. Unconditional. Not a flag — the same ruling §8 already
   made about `--exclude-superseded`.
4. `AM-144`. `tools/check_registers.js` prints `AMC-1` … `AMC-5`. Test:
   `node tools/check_registers.js --amendments | grep -aoE '\bAM-[0-9]\b'` returns nothing.
5. The tool header still reads "contract version 2". It implements 2 until items 1–3 land, at which
   point it implements 3, and the header says which.

For The Systems Engineer:

6. `AM-145`. `CHK-28`'s What cell: `AMC-1` to `AMC-5`, and correct the count from four to five.

For every seat writing a count in Step 2:

7. A file-set census states whether its own file is counted. §2.6.
8. A block's `unit` field is written so that the text before its first comma is not a bare common
   noun. That one field is the whole of M13's false-positive surface, and Step 2 is the step that
   mints blocks about `files`, `summaries` and `sources`.
9. Spawn prompts go to `cr_scratch/relay/spawn/`, written before the agent runs. A prompt written
   afterwards is a transcript and does not discharge arm 2a.

---

## 9. Falsifiers on my own rulings

**D1 — the M13 exclusion.** *If a Step 2 corpus summary is found stating one of this project's
governed numerals bare, and M13 would have caught it had `literature/` been in its population*, then
the body/apparatus distinction does not survive contact, the corpus is not "somebody else's prose"
in the way §8 now claims, and the remedy is to scope M13 to the apparatus of a summary — its
`## Provenance` block and field label — rather than to exclude the file.

**D2 — the CHECK inclusion.** *If the merged corpus produces a hard `--check` failure that no seat
can disposition in the cycle it appears*, then keeping 176 files in the CHECK population cost more
than the coverage it bought, and the honest fix is to admit `literature/` to CHECK only for the
clauses that read blocks and tags, which is all of them but stated as a whitelist.

**D3 — the relay paths.** *If Step 2's spawn prompts are written to `cr_scratch/relay/spawn/` and
M15 reports zero findings across the whole step while a relay error is found by hand*, then Limit 1
is the dominant term, moving the artifacts was necessary and nowhere near sufficient, and the next
move is to require that any number entering a spawn prompt already be a block — which is a rule
someone must remember, and therefore not a process fix, which is why I did not write it now.

**D4 — the dated boundary.** *If a seat in Step 2 or later writes `AM-3` meaning the check, or reads
a pre-boundary `AM-3` as a row*, then the dated boundary is not self-enforcing, a discriminator that
depends on knowing a file's date is a convention after all, and the remedy is the expensive one: a
mechanical rewrite of all 143 historical sites, with the author's approval, accepting that it edits
nine frozen deliverables belonging to four other seats.

---

## 10. Reproduction

Every figure above is reproduced by these commands. The staging script and the patched tool live in
the session scratchpad; neither wrote to this repository.

```
node tools/quantities.js --files-only | wc -l                       # 76
node tools/quantities.js --check | grep -c '^FAIL '                 # 12
node tools/quantities.js --lint  | grep -c '^LINT '                 # 64
node <stage.js> <repo> <stageroot> lsei                             # union 176
QJS_ROOT=<stageroot> node tools/quantities.js --files-only | wc -l  # 252
QJS_ROOT=<stageroot> node tools/quantities.js --check | grep -c '^FAIL '  # 12
QJS_ROOT=<stageroot> node tools/quantities.js --lint  | grep -c '^LINT '  # 107
diff <(pre FAIL) <(post FAIL)                                       # empty
node tools/quantities.js --files-only | while read f; do
  grep -aoE '\bAM-[1-5]\b' "$f"; done | wc -l                       # 159
```

---

*The Designer, sub-step 2.19, contract half. `literature/` ruled into CHECK and out of M13, measured
over the whole prospective population rather than a sample. The relay paths declared and M15's
population made computed, with the remedy demonstrated catching a live error in a Wave 1 spawn prompt
and its two limits stated against the falsifier that presumes it. The `AM-` namespace renamed at a
dated boundary with a mechanical discriminator, 16 of 159 sites applied and the other 143 declined
deliberately with the reason. Ten amendment rows. `COUNTING_RULE.md` at version 3.*
