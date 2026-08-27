# Sub-step 1.14 — The Engineer: promotion, the two registers, and the counting-rule checker

**Project:** Lunar Oracle
**Date:** 2026-08-27
**Sub-step:** 1.14 (R-5 of the Step 1 close)
**Author:** The Engineer
**Duty:** promote the frozen specifications, build `oracle/MANIFEST.tsv` and `oracle/AMENDMENTS.tsv`,
build `tools/quantities.js`, run everything, report what the runs say.

Every number in this file was produced by a command run in this session. Where a number I was given
did not survive the run, the run is reported and the number I was given is named as the thing that
moved.

---

## 0. Verdict, in the order the reader will want it

| | |
|---|---|
| **Promoted** | **11 marked blocks + 1 fenced seed + 2 generated files.** `oracle/` exists. `literature/` exists. Every lift verified byte-for-byte against an independently computed source slice. |
| **`oracle/MANIFEST.tsv`** | Built. 20 rows. MF-1 passes on 17 promoted rows. MF-3 passes: **13** BEGIN markers under `cr_scratch/`, 13 rows. **MF-2 fails on exactly one row and the failure is the point.** |
| **`oracle/AMENDMENTS.tsv`** | Built. **106 rows, 102 owed** — against the brief's "roughly forty-five". AM-1 returns **four collisions**, AM-2/3/4 pass. |
| **`tools/quantities.js`** | Built. Reproduces the Designer's Wave 2 measurement **exactly**, and the seven-failure delta since his run is fully attributed to two events that post-date it. |
| **The tier ruling** | **Ruled yes**, on measurement, with the boundary stated so it narrows nothing away. §7. |
| **`Q-ROOT-ALLOWANCE`** | Closed. Both missing parents minted in this file. Every M4 dangling-parent failure left in the project is the Designer's W2-1. §6. |

**Four things I could not do, named rather than papered over.** `oracle/REGISTER.tsv` cannot be
assembled without a ruling I do not own (§3.4). The four deliverables whose own lift command retains
its markers now have false post-conditions (§2.3). The counting rule's §8 file set has to be amended
or promotion's first act is eight duplicate ids (§5.3). And the Designer's own "fifteen target paths"
is thirteen (§2.1).

---

## 1. What I checked before I trusted anything

**The brief says every file in `cr_scratch/` is CRLF and warns that a tool has already exited 2 on
one. That is false, and it matters, because the wrong belief produces the wrong defensive code.**

Measured with `node`, counting `\r\n` pairs against total `\n`:

| Class | Files | Notable |
|---|---|---|
| Pure LF | 35 of 40 | including every one of the eleven files I lifted from |
| Pure CRLF | 3 | `step0_integration_draft.md`, `step1_1_systems_engineer_enforcement.md`, `step1_manager_close.md` |
| Mixed | 2 | `step1_9_..._register_rows.md` 935 CRLF / 937 lines; `step1_9_..._addendum.md` **1 CRLF / 547 lines**; `step1_orchestrator_verification.md` 200/349 |

The one that matters is the 1.9 addendum: a single CR-terminated line among 547, inside the register
block. Its author saw it and wrote `sed 's/\r$//'` into his own lift command. Nobody else's command
carries that guard, and nobody else needs it today. **A rule that "everything is CRLF" would have had
me strip carriage returns from ten files that have none and would have taught the next session a fact
that is not true.**

My own first probe was wrong and I am recording it because it is the same class of error: a
`grep -c $'\r$'` loop reported every line of every file as CR-terminated. `od -c` and a byte count in
`node` both say otherwise. **The `node` byte count is the measurement; the `grep` was an instrument
fault.**

**The specified extraction commands work as written.** Test A ran 1.12's command verbatim, `$`-anchors
and all, and returned 245 lines. Test B, the same command with the anchors removed, returned 245.
There was nothing to tolerate.

---

## 2. Part 1 — Promotion

### 2.1 The census, and the count that did not survive

I enumerated the marker blocks rather than trusting a list, with `grep "^<!-- \(BEGIN\|END\)"` over
every file in `cr_scratch/`. **Thirteen BEGIN/END pairs. Not fifteen.**

The brief and the Manager's close both say fifteen specifications frozen as marked blocks. The
Designer's §2.1, which is where the figure comes from, prints its evidence — and the printed list
holds **thirteen `ABSENT` entries**, not fifteen:

```
oracle/answer_contract.md   oracle/register_schema.md   bootstrap_contract.md
oracle/REGISTER.tsv         install_state.md            oracle/check_register.md
oracle/currency_policy.md   oracle/VERIFIED.tsv         NAMING.md / literature/NAMING.md
oracle/tests/answering_loop_suite.md                    COUNTING_RULE.md
QUANTITIES.md               tools/quantities.js
```

Thirteen target paths, of which **ten** have a marked block behind them (the thirteen blocks collapse
to ten targets: four blocks feed `oracle/REGISTER.tsv`, two of them superseded by addenda). Three —
`oracle/VERIFIED.tsv`, `QUANTITIES.md`, `tools/quantities.js` — have no block and were never going to
be promoted by a `sed`.

**This is E16's own shape**: a count asserted in three places, measured from a list of thirteen, in the
document that argues counts must carry their counting rule. It is minor and it is reported because the
alternative is that a Step 2 session goes looking for two blocks that do not exist.

### 2.2 The eleven lifts, and how each was verified

Canonical form, from the Manager's close §5.4: `sed -n '/BEGIN/,/END/p' <src> | sed '1d;$d' > <tgt>`.

Verification was not "the command exited 0". For each target I recomputed the source slice
independently in `node` — split on `\n` after CR normalisation, index the two marker lines, take the
interior — and compared it byte for byte to what landed on disk.

```
MATCH oracle/answer_contract.md            srcLines= 207 tgtBytes= 10896  # The answer contract
MATCH oracle/bootstrap_contract.md         srcLines= 493 tgtBytes= 29180  # The bootstrap contract
MATCH oracle/install_state.md              srcLines= 427 tgtBytes= 26171  # The install state record
MATCH oracle/currency_policy.md            srcLines= 396 tgtBytes= 22718  # The working-copy currency policy
MATCH literature/NAMING.md                 srcLines= 517 tgtBytes= 27613  # NAMING.md — the filename and source-identifier contract
MATCH oracle/register_schema.md            srcLines= 370 tgtBytes= 20634  # The contested-claims register: schema and encoding
MATCH oracle/tests/answering_loop_suite.md srcLines= 339 tgtBytes= 37502  # The answering-loop test suite
MATCH COUNTING_RULE.md                     srcLines= 245 tgtBytes= 14501  # The counting rule
MATCH oracle/check_register.md             srcLines= 251 tgtBytes= 18127  # The check register
MATCH oracle/REGISTER.lunar.tsv            srcLines=  97 tgtBytes= 28765  H lsei/literature 2026-08-27 7f97983 15 81
MATCH oracle/REGISTER.econ.tsv             srcLines=  72 tgtBytes= 19580  H _intake/japanese-miracle/lit 2026-08-27 c42a217 18 53
mismatches: 0
```

Stray `\r` bytes in the promoted files: **0**, in all eleven.

**One extraction failed on the first attempt and it was my own escaping, not the file's.** My `lift`
shell function escaped `(` and `)` before handing the marker name to `sed`. In BRE `\(` opens a group,
so the two `oracle/REGISTER.tsv (...)` markers matched nothing and both files came out empty. The
function caught it — `!! EMPTY EXTRACTION`, and the run exited 1 — because it asserts a non-zero line
count rather than trusting the exit status of a pipeline whose last stage is `sed`. **A promotion
script that only checked `$?` would have shipped two empty registers silently.**

Independent confirmation on the two registers, using each addendum's own stated post-condition:

```
lunar: 1 H 6, 15 A 9, 81 M 5     econ: 1 H 6, 18 A 9, 53 M 5
node tools/ecr_verify.js oracle/REGISTER.lunar.tsv lsei/literature            EXIT=0  0 failures  ALL PASS
node tools/ecr_verify.js oracle/REGISTER.econ.tsv  _intake/japanese-miracle/lit EXIT=0  0 failures  ALL PASS
```

The lunar field census matches the addendum's stated expectation to the row.

### 2.3 The lift form: four deliverables now carry a false post-condition

Seven deliverables state a lift command. **Three strip the markers** (`| sed '1d;$d'`): 1.7, 1.12,
1.9-addendum. **Four do not**: 1.4, 1.5, 1.6, 1.13 — and 1.6 and 1.13 write explicit post-conditions
asserting that the extracted block *begins with* its own `<!-- BEGIN ... -->` line.

I promoted all eleven with the stripping form, because the Manager's close §5.4 states the canonical
form with `sed '1d;$d'` and states it as the form every extraction in this project takes. Following
four authors instead would have shipped a set in which four promoted contracts open with an HTML
comment naming their own path and seven do not, on day one.

**The consequence is real and it is filed as AM-101:** four post-conditions are now false against the
promoted files. They are amended, or the ruling is reversed and seven files are re-lifted. Not mine to
choose; visible either way.

### 2.4 `git check-ignore`, run on every target

`literature/` is deny-by-default and re-admits `*.md` plus two named `.tsv` literals. Probed before the
directories existed, so the answer is the rule's and not an artefact of what is on disk:

```
tracked   oracle/answer_contract.md      tracked   oracle/MANIFEST.tsv
tracked   oracle/bootstrap_contract.md   tracked   oracle/AMENDMENTS.tsv
tracked   oracle/install_state.md        tracked   oracle/tests/answering_loop_suite.md
tracked   oracle/currency_policy.md      tracked   literature/NAMING.md
tracked   oracle/register_schema.md      tracked   literature/FIELDS.tsv
tracked   oracle/check_register.md       tracked   literature/INDEX.tsv
tracked   oracle/REGISTER.tsv            tracked   COUNTING_RULE.md
tracked   oracle/VERIFIED.tsv            tracked   QUANTITIES.md
IGNORED   literature/NAMING.tsv          tracked   tools/quantities.js
```

`literature/NAMING.tsv` is a control probe, not a target. It is ignored, which is the deny-by-default
rule doing its job: a `.tsv` nobody named is excluded. **The re-admission is exact rather than
permissive**, and that is X2's applied half (AM-92).

### 2.5 The path collision, and the two seeds

`literature/NAMING.md`, per the Manager's ruling. It matches the file's own lift command.

`oracle/VERIFIED.tsv` has no marked block; 1.6 §3 seeds it inside a plain fence. Lifted from the
promoted `oracle/currency_policy.md` and checked against its own rules:

```
declared=5  actual_data_rows=5      field count: 6 rows x 5 fields
```

And CHK-26's assertion, which nobody had run, run here — every ref resolving in that copy's object
store:

```
RESOLVES cr-agents f0c976b   RESOLVES lsei c8274e6   RESOLVES lsei d7889e1
RESOLVES lsei f788ea2        RESOLVES lsei 7f97983
```

`QUANTITIES.md` is generated: `node tools/quantities.js --index --write` → **58 blocks; fixed 53, live
4, provisional 1.**

---

## 3. Part 2 — `oracle/MANIFEST.tsv`

Built to the Designer's schema, 20 `D` rows, self-declared size, checked by
`tools/check_registers.js --manifest`.

```
NOTE MANIFEST.tsv: 20 D rows
OK   MANIFEST declares its own size correctly (20)
OK   MANIFEST every row has seven fields and a state in the closed set of three
OK   MF-1 every promoted row has a file at target-path (18 rows)
FAIL MF-2 row oracle/REGISTER.tsv is specified with no source-file and no marker.
NOTE MF-3 census: 13 BEGIN markers under cr_scratch/
OK   MF-3 every BEGIN marker under cr_scratch/ has a manifest row
WARN MF-3 marker name "oracle/REGISTER.tsv (ECR rows)" is used in 2 files
```

### 3.1 MF-3 passes, and it is the check that earned the file

Thirteen markers, thirteen rows, both directions. The Manager was right that a naive census returns
noise: an unanchored `grep "<!-- BEGIN"` over `cr_scratch/` returns `sed` regex fragments and prose
about markers. Anchoring the pattern at column 0 and requiring the full comment form returns exactly
the thirteen real ones.

### 3.2 The marker-name collision nobody named

`oracle/REGISTER.tsv (ECR rows)` is the marker in **both** `step1_10_manager_economics_register.md`
and its addendum. 1.9's author named his addendum's marker distinctly and said why: *"Markers are
named distinctly so a `sed` cannot pick up both."* 1.10's author did not, and the addendum's own §5
command uses the truncated pattern `/^<!-- BEGIN oracle\/REGISTER.tsv/`, which matches either file's
marker and, run against a concatenation of both, would span from the first BEGIN to the first END.

**MF-3's join is therefore keyed on `(source-file, marker)` rather than on marker alone.** A join on
the name would have silently accepted one row for two markers, which is the failure the check exists
to prevent. Filed as AM-100.

### 3.3 MF-2's one failure, which I am not making green

`oracle/REGISTER.tsv` is `specified` with no source file and no marker. The Designer's state set is
closed at three, and it has no value for *"a path a contract names, with no block behind it and a
ruling in front of it."* I could have written `superseded`, or given the row a marker that does not
exist, and the register would be green and wrong.

**That is the same defect the amendment register exists to fix**, one level up: a fact with no field to
live in gets written into a field that means something else. The failure stays, it names its gate, and
the manifest carries a comment saying not to fix it by inventing a state.

### 3.4 Why `oracle/REGISTER.tsv` does not exist — measured, not argued

`oracle/register_schema.md` §3.1: *"`H` — one row, the first row"*, and `axis_count` is *"the number of
`A` rows in this file."* The lunar half declares `H lsei/literature … 15 81`. The economics half
declares `H _intake/japanese-miracle/lit … 18 53`. Two roots, two headers, one specified file.

Concatenated and run through the project's own loader:

```
concat H rows: 2      concat A rows: 33      concat M rows: 134
node tools/ecr_verify.js <concat> lsei/literature    EXIT=1    143 failure lines
  FAIL L2 axis_count 18 != parsed 33
  FAIL L2 member_count 53 != parsed 134
  FAIL L4 leaf does not resolve: beason-1996-targeting-japan.md (ECR-01)      ... x40
  FAIL B3/K2 ECR-01 key "subsidies" occurs in no member                       ... x101
```

So: promoted as `oracle/REGISTER.lunar.tsv` and `oracle/REGISTER.econ.tsv`, each verified clean against
its own corpus root, with `oracle/REGISTER.tsv` held at `specified` behind AM-98. **These two paths are
mine and they are provisional. They are not a schema ruling and must not be read as one.**

**A second defect fell out of that run.** `ecr_verify.js` reads the header as `if(t==='H') H=f` —
**last H wins, no cardinality check.** Against the two-header file it silently validated the second
header and reported `axis_count 18 != parsed 33`. The schema says *one* row and *first* row; the loader
honours neither, and against a file with two headers it would report a clean load if the second header
happened to describe the whole file. Filed as AM-99.

**And one counting trap, since the brief warns about it twice.** `ecr_verify.js` prints its failures
**indented two spaces**. `grep -c '^FAIL'` over that output returns **0** while the true count is
**143**. My own tool prints every prefix at column 0 for exactly this reason, and its header says so.

---

## 4. Part 3 — `oracle/AMENDMENTS.tsv`

Built to the Designer's schema. **106 rows, 102 owed**, loaded from the eleven sources plus five rows
this sub-step produced. `state` is the closed set of four; `quantity-id` is written **bare, without
brackets**, so that `tools/quantities.js` does not read this column as a quotation tag — `oracle/**` is
inside the counting rule's declared file set and a bracketed id here would mint 22 unresolved tags.

**106 against "roughly forty-five."** The difference is not padding. The Designer's table counts
*sources* per target and estimates rows; enumerating one row per applicable edit gives 106, of which
the largest single block is the fourteen `F1`–`F14` findings of the 1.4 testability review, which his
table records as "~12 items in unnumbered prose."

### 4.1 AM-1 through AM-4, run

```
OK   AMENDMENTS declares its own size correctly (106 total, 102 owed)
OK   AMENDMENTS every row has nine fields and a state in the closed set of four
FAIL AM-1 quantity Q-ANSWER-CONTRACT-VERSION is named by 2 owed amendments: AM-66, AM-73
FAIL AM-1 quantity Q-BOOTSTRAP-ASSERTIONS  is named by 2 owed amendments: AM-15, AM-24
FAIL AM-1 quantity Q-CHECK-ROWS            is named by 4 owed amendments: AM-48, AM-60, AM-61, AM-106
FAIL AM-1 quantity Q-STATE-FACTS           is named by 2 owed amendments: AM-25, AM-39
NOTE AM-1 scanned 22 distinct quantity ids across 102 owed rows
OK   AM-2 every superseded-by resolves to a row that is not itself superseded
OK   AM-3 every amendment target is a row in oracle/MANIFEST.tsv
OK   AM-4 no amendment is applied against an unpromoted target
```

**One note on the check's own definition.** The Designer specifies AM-1 as `cut -f5 | sort | uniq -d`.
In the row layout he gives — `A id target section source-substep quantity-id state superseded-by text`
— the quantity id is **field 6**, not 5; field 5 is `source-substep`. `cut -f5` would find collisions
in the wrong column. The check is implemented on the column by name. Not a defect in the design, and
worth saying once because the shell form is what a reader will copy.

### 4.2 The four collisions, and what each one is

**Collision 1 — X1, and it now has a marker.** `AM-21` (1.5 §3.1 row 5: assert the hook file exists,
is non-empty, carries a shebang) is `superseded`, `superseded-by: AM-33` (1.13 §3.1: delete it, run
`git hook run` and read the index mode). AM-33's own text argues explicitly against AM-21's form.
`AM-06` (F6, the review's directory-existence remedy) is `declined` against the same successor, with
1.13's reason: *a directory holding `pre-commit.sh`, or `pre-commit` at mode 100644, satisfies that
form and fires nothing.* **This does not appear under AM-1 because AM-1 only reads `owed` rows, which
is correct: a ruled amendment has stopped competing.** The ruling has now reached a text.

**Collision 2 — `Q-CHECK-ROWS`, and it has four successors, not three.** 1.6 §3.1 writes the header row
as a literal, `H 1 <date> 26 7 17 2`. R1+R5's split of `CHK-09` adds a row. R4's `quantities.js` row
adds another. **And this sub-step adds a fourth**: `tools/check_registers.js` needs `CHK-27` and
`CHK-28`, which is +2 more (AM-104, AM-106). Four amendments, one integer, four authors, none aware of
the others' arithmetic.

I built this register with the three competitors under distinct provisional ids so they would not
collide, looked at the green result, and reversed it. **A register whose ids are chosen so the check
passes is worse than no register.** All four now carry the real id.

**Collision 3 — `Q-STATE-FACTS`, cross-document, confirmed exactly as predicted.** `AM-39` cuts
`pdfs_present` *inside 1.5*, taking the value 4 → 3. `AM-25` brings 1.4's bare phrase "the four facts"
into `<value> [<id>]` form under the Tier 2 touch rule, *inside 1.4*. Land separately and 1.4 ships
`4 [Q-STATE-FACTS]` against a block reading 3. `AM-40` carries the paired `Q-STATE-KEYS` 19 → 18 and
does not collide, because only one document states it.

**Collision 4 — the version integer, which had no id at all.** `AM-66` (1.8 §1.9) takes the answer
contract 1 → 2. `AM-73` (1.6 §12's run-log schema extension, a closed schema) takes it 2 → 3. The
promoted `oracle/answer_contract.md` line 4 reads **`**Contract version: 1.**`** today.

**AM-1 could not have seen this collision.** The version integer is stated in at least eleven files and
has no quantity block, so there was no id to group on. I gave the two rows a provisional
`Q-ANSWER-CONTRACT-VERSION` by hand and the check fired immediately — which is a demonstration of the
Designer's own W2-5 finding at the level of the amendment register: *the graph is only as complete as
the ids that exist.* `AM-74` mints the id properly. **Until it is minted, AM-1's coverage over this
project's most-echoed integer rests on my having typed a string.**

### 4.3 A fifth collision, and nobody has named it

`Q-ECR-AXES`, `Q-ECR-MEMBER-ROWS`, `Q-ECR-KEYS-SHIPPED`, `Q-ECR-SIDES-GT2`, `Q-ECR-PROBE-SEPARATION` —
**five duplicate ids** across `step1_10_manager_economics_register.md` and its addendum, and
`Q-ECR-AXES` disagrees with itself: **17 in the original, 18 in the addendum**, quoted at five sites
each.

This is W2-11's shape — *"three duplicate ids exist now, in 1.9 against its addendum"* — repeated
exactly in 1.10 against its addendum. It is unreported everywhere because **R-6 landed at 09:21 and the
Wave 2 review ran at 09:15.** The correction that closed one arm of the close opened five instances of
the defect the same review had just named. Filed as AM-93 through AM-97.

That is instance six of the Manager's §4 common cause, and it is the cleanest one: a fix applied
correctly, verified by its own tool, that nobody re-ran the *other* checks against.

---

## 5. Part 4 — `tools/quantities.js`, built and run

**It can be built and it is built.** The contract specifies M1–M12 in enough detail to implement
directly; the twelve keys are a closed set, the file set is five globs, and the two clauses that need
a judgment call (M5's command execution, M6's index) are separable.

**It implements the contract as written.** The ten Wave 2 defects are not pre-applied. An instrument
that silently corrects the specification it measures cannot report on it — so `--w2-1` (the `Q-EG-`
example namespace and the nested-fence rule) and `--w2-3` (the stronger M11) are flags, off by default,
so the amendments can be *measured* before they are ruled.

**Check-register rows.** `tools/quantities.js` already has four: CHK-14 `--check`, CHK-15 `--lint`,
CHK-16 `--index`, CHK-17 `--live`, all written at 1.13 with status `specified`. It did not need a new
row; it needed the file. Under CL-2 — *"a `specified` row whose path exists must be moved to `live`"* —
all four move now. `tools/check_registers.js` is genuinely new and takes CHK-27 and CHK-28, leaving 25
and 26 to AM-46.

### 5.1 The run, and the reconciliation against the Designer's measurement

The tool's own failure prefix is `FAIL ` at column 0, stated in its header, and the count below is
`grep -c '^FAIL '` over the **whole unfiltered output**.

Pre-promotion, over the same file set the Designer scanned:

```
node tools/quantities.js --check      EXIT=1   78 output lines   FAIL count 23
NOTE declared file set: 51 files
NOTE quantity blocks parsed: 66 across 11 files
NOTE quotation tag sites: 115; distinct ids referenced: 45
NOTE M2 detail: 6 unresolved ids over 13 sites; 8 duplicate ids
```

| Clause | The Designer, 09:15 | This run | Delta and its cause |
|---|---|---|---|
| M1 | 1 | 1 | — |
| M2 | 9 (6 unresolved ids / 8 sites, 3 duplicate ids) | 14 (6 unresolved ids / 13 sites, 8 duplicate ids) | **+5**: the five 1.10-addendum duplicates, landed at 09:21 |
| M3 | 1 | 2 | **+1**: `Q-ECR-AXES` 17 vs 18, same cause |
| M4 | 2 | 2 | — |
| M11 | 2 | 2 | — |
| M12 | 1 | 2 | **+1**: the Wave 2 review file's own `Q-X` link, which its author predicted he would mint |
| **Total** | **16** | **23** | **+7, all of it after his run** |

The three duplicate ids he reports are `Q-LCC15-MEMBER-ROWS`, `Q-LCC15-DISTINCT-LEAVES`,
`Q-LCC15-LEAVES-READ` — his W2-11, to the id. **The instrument reproduces his measurement exactly and
the entire delta is attributable.** That is the strongest evidence available that both measurements are
right.

### 5.2 The lift-is-a-copy collision, measured on the promotion that caused it

```
node tools/quantities.js --check      EXIT=1   99 output lines   FAIL count 33
NOTE declared file set: 67 files
NOTE quantity blocks parsed: 74 across 14 files
NOTE M2 detail: 6 unresolved ids over 18 sites; 16 duplicate ids
```

**23 → 33**, measured at the moment of promotion. (The figure is **32** as this file closes,
because §6 mints a block that resolves one of the two M4 dangling parents; the eight duplicates
below are unaffected.) The eight new duplicates:

```
Q-PAIR-IDENTICAL        COUNTING_RULE.md:45          <-> step1_12:222
Q-BOOTSTRAP-PHASES      oracle/bootstrap_contract.md:424 <-> step1_4:590
Q-DEGRADED-MODES        oracle/bootstrap_contract.md:442 <-> step1_4:608
Q-BLOCKING-MODES        oracle/bootstrap_contract.md:461 <-> step1_4:627
Q-STATE-FACTS           oracle/install_state.md:316  <-> step1_5:642
Q-STATE-ABNORMAL-READS  oracle/install_state.md:343  <-> step1_5:669
Q-STATE-CONSUMERS       oracle/install_state.md:366  <-> step1_5:692
Q-STATE-KEYS            oracle/install_state.md:391  <-> step1_5:717
```

**Exactly the eight blocks The Systems Engineer and The Designer each predicted, independently, to the
id** — his seven plus the Designer's one. Two personas forecast a number and a set; the promotion
produced the set.

### 5.3 The §8 amendment, implemented and measured rather than asserted

`--exclude-superseded` reads `oracle/MANIFEST.tsv`, finds every `cr_scratch` marker pair whose target
is `promoted`, and drops blocks and tags inside it.

```
node tools/quantities.js --check --exclude-superseded    EXIT=1  79 lines  FAIL count 23
NOTE quantity blocks parsed: 67 across 12 files
NOTE M2 detail: 6 unresolved ids over 14 sites; 8 duplicate ids
```

**32 → 23**, and **33 → 24** on the run taken before §6's block landed. All eight
promotion-caused duplicates gone; the one residual `FAIL M6` is the index, which was generated from the
unamended parse and correctly reports that it disagrees. So the amendment works,
and the ordering is: land AM-102, then regenerate. Filed with the measurement in it.

### 5.4 The lint pass

```
node tools/quantities.js --lint       EXIT=0   61 lines   LINT count 53
M8  24 relative-offset findings           M9  14 undated relative-time findings
M13 15 bare-governed-numeral findings     M5  4 live blocks; not re-run
```

**M13 does not exist in the contract.** It is W2-2's missing lint, implemented rather than argued, so
that the choice between "specify it" and "delete the row from §5" can be made against a measured
population instead of an estimate. It keys a spelled-out or digit numeral to the `unit` noun of each
`fixed` block and skips any site already carrying the tag. Fifteen findings, the first of which is
`oracle/install_state.md:333` — *"4 facts about this"* for `Q-STATE-FACTS`, in the file that is about to
have that value corrected to 3 by AM-39.

**M5 is not run by default and that is deliberate.** M5 executes command strings harvested out of
markdown. Four blocks are `class: live`. Running arbitrary text from a document as a side effect of a
check is exactly the property CL-4 and X3's `exec-reviewed:` token exist to guard, so it sits behind
`--live` and behind CHK-17, which 1.13 already kinds `harness` and invokes `manual`.

### 5.5 W2-8, quantified

M3 as specified captures the token before the bracket and requires a numeral. **48 sites hand it
something that is not one**, measured before promotion (59 after, because the lift duplicates them) — `` `87 ``, `**19`, `rows=<n>`, `inclusive`, `sides**`, `nothing`. Every
one is reported as `LINT M3-unreadable` rather than silently skipped, because a check that quietly
ignores a site it cannot read is a check that reports clean on the sites that matter. The Designer
found this on one instance; the population is 48.

### 5.6 CL-1 and CL-2, run, and R4 confirmed

The check register's scan roots are `tools/**` and `oracle/**/*.js`. Ten files sit in them today.

```
CL-1 strict (path cell must EQUAL the file path):
  FAIL tools/check_registers.js     - genuinely unregistered, AM-104
  FAIL tools/quantities.js          - registered four times, but every path cell reads
                                      "tools/quantities.js --check" and so on: an invocation,
                                      not a path
CL-2 (a specified row whose path exists must move to live):
  FAIL tools/quantities.js --check / --lint / --index / --live
  FAIL oracle/bootstrap_contract.md   (CHK-23; promoted by this sub-step)
```

**R4 is confirmed by measurement: `tools/quantities.js` fails CL-1 the day it lands**, and it fails for
the reason R4 gave — four rows carry an invocation in the `path` cell. Filed as AM-105. And promotion
itself moved CHK-23, which nobody had listed.

---

## 6. The owed item — `Q-ROOT-ALLOWANCE`'s parents, closed

I flagged the first half in my own 1.7 addendum: `derived-from: Q-PATH-CEILING-259` names a block that
does not exist, and M4 reports it as a dangling parent. The Designer found the second half at W2-5: the
108 that the value also rests on is a **chosen** parameter with no id, so the staleness graph cannot see
the input most likely to be revisited.

Both parents are minted here. `COUNTING_RULE.md` §8 permits a block to live in any file in the declared
set, and this is my file rather than a frozen or promoted one. `Q-ROOT-ALLOWANCE`'s `derived-from` in
`cr_scratch/step1_7_engineer_naming_addendum.md` is widened to name both; its `value` is untouched, so
this is not a §4 correction and mints no `superseded` entry.

```quantity
id:            Q-PATH-CEILING-259
class:         fixed
value:         259
unit:          characters of absolute working-tree path that git for Windows will create
population:    n/a — a property of the tool, found by bisection rather than drawn from a set
operation:     manual: The Engineer; created a working-tree file by checkout at successive absolute
               path lengths and recorded the first failure; 7 lengths inspected, 256 through 262
conditions:    cwd: repository root, 55 characters. git 2.55.0.windows.1; core.longpaths unset at
               all three scopes; OS LongPathsEnabled 0. The ceiling does not depend on
               core.longpaths and that is the point: a ceiling that holds only when a per-clone
               config is set does not bind a zip extraction, PowerShell, or a clone made outside
               the bootstrap. Node's fs writes past 300 because libuv prefixes \\?\, which is why
               this defect is created by one tool and discovered by another.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     git for Windows without core.longpaths creates a working-tree file at an absolute
               path of 259 characters and fails at 260 with "unable to create file <path>:
               Filename too long". 256 OK, 257 OK, 258 OK, 259 OK, 260 FAIL, 261 FAIL, 262 FAIL.
derived-from:  none
sampled:       n/a — the operation records the length at which an observed error first appears; it
               assigns nothing to a category
superseded:    none
```

```quantity
id:            Q-PATH-BUDGET-108
class:         fixed
value:         108
unit:          characters of repository-relative path allowed for a corpus leaf by NAMING.md §8
population:    the 176 corpus filenames the naming rules were authored against, plus the taxonomy
               folder names surviving the merge
operation:     manual: The Engineer; chose 10 + 1 + 32 + 1 + 64, where 10 is "literature", 32
               covers the longest surviving taxonomy folder at 31, and 64 covers every one of the
               176 names but one; 176 names inspected
conditions:    cwd: repository root, 55 characters. Machine-independent by construction: no
               absolute path enters this number, which is what lets it be asserted in CI on any
               machine while Q-ROOT-ALLOWANCE can only be asserted at bootstrap on the machine
               that will do the work. Depth is exactly one taxonomy level; a second level breaks
               the arithmetic rather than shrinking the leaf.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     108 characters is the chosen repository-relative ceiling for a corpus leaf, not a
               measured limit. It is the term that, subtracted with one separator from
               Q-PATH-CEILING-259, leaves the 150-character root allowance of Q-ROOT-ALLOWANCE. It
               is the parameter most likely to be revisited, because it is the only one anybody
               can change by deciding to.
derived-from:  none
sampled:       176 inspected by hand, 1 found wrong, by The Engineer — the ieee filename exceeds
               the 64-character leaf ceiling and is the single known exception, unchanged by this
               block
superseded:    none
```

**Measured effect.** `Q-PATH-CEILING-259` resolves and `Q-ROOT-ALLOWANCE` has no dangling parent; the
derivation graph gains two edges and stays acyclic. **M4 drops from three dangling-parent failures to
two, and the two are the same one** — `Q-OVERLAP-95` of `Q-PAIR-IDENTICAL`, reported once in
`COUNTING_RULE.md:45` and once in `cr_scratch/step1_12...:222`, which is the lift-is-a-copy collision
double-counting the Designer's W2-1. Under `--exclude-superseded` M4 reports one failure. **Every M4
failure left in this project is W2-1's and is the Designer's to close.**

**What this does not do.** `Q-ROOT-ALLOWANCE`'s `operation` still reads `script: 259 - 1 - 108`, which
is not a committed path and is not a legal `script:` form. That is W2-4/AM-84 and it needs a fourth
`operation` form — `derived:` — which is a change to the contract and is the Designer's, not mine. The
graph is now complete; the arithmetic is still unmechanized.

---

## 7. The ruling — an excluded node's app string IS its exclusion sentence

Routed to me by The Space Resources Engineer with a deadline of 2.15. **Ruled: yes.** Verified against
`lsei/lunar-scenario-explorer-map.md` at ref `7f97983` before ruling, not after.

### 7.1 What is actually there

```
modeled sections with tier "-"  : 6
  transmission-coefficient, net-value-identity, productive-mass-fraction,
  falling-launch-price, power-mass-break, signed-offtake-break
excluded sections with tier "-" : 10
all 10 excluded slugs present in the exclusion table with a sentence: 10 of 10
```

The exclusion table's own column header is **"what the app says it does not do"**, and the map asserts
the closure explicitly: *"Excluded nodes with no exclusion prose in the island, 0: none."* The four
slugs 1.9's rows name — `oxygen-extraction-energy`, `helium-procurement-energy`, `bound-oxygen-mare`,
`habitat-water-terrain` — each carry one, e.g. *"This app does not model oxygen production."*

### 7.2 The ruling, and the distinction it turns on

**`axis-incomplete` is about the presence of a string, not about the presence of a tier.** It exists for
an address the app cannot speak to at all. An excluded node is an address the app speaks to
*definitively* — "I do not model this" — which is a stronger and more citable answer than a tier, and
one the app's authors stored deliberately. The map says why in its own words: *"An excluded node sits
in the register carrying its exclusion rather than being absent from it. A node that is simply missing
cannot say why it is missing, and a reader meeting a gap has no way to tell a ruling from an
oversight."* Refusing on that string discards the one thing the exclusion was built to provide.

**Resolution order for an `app_surface` address.** The reader tries, in order:

1. a status string in the live-values table;
2. a tier string in the section table;
3. **an exclusion sentence in the excluded-node table.**

`axis-incomplete` fires **only when all three are absent.**

**A ruling that narrows nothing away.** The six *modeled* sections with tier `-` have no string at any
of the three sites, and they **still** fire `axis-incomplete`. The two populations share a `-` in one
column and differ on whether any string exists at all, which is the only distinction that matters. The
ruling separates them; it does not weaken the refusal.

**One clause that is not optional.** When the exclusion sentence is what resolved the address, the
answer prints it verbatim and labels it as **the app declining**, not as an app-sourced value. An
`APP` or `BOTH` verdict resting on "This app does not model oxygen production." is the app saying it
has nothing, and an answer that renders that as a modelled result is worse than the refusal this ruling
removes.

### 7.3 What it costs and what it buys

Without it, four of the fifteen lunar axes refuse on every question touching an excluded node — at
`resource-geography` and `non-water-routes`, which are exactly where the corpus does the work the app
cannot. With it, those questions return the app's own exclusion beside the literature that covers the
gap, which is the answer the register was designed to produce.

The Space Resources Engineer's `Q-LCC15-APP-ADDRESSES` block already states the ruled behaviour in its
`predicate` — *"Four of the 38 are excluded nodes whose app-stored string is the exclusion sentence
rather than a tier."* **This ruling makes that predicate true rather than assumed**, and the block
needs no correction.

---

## 8. What is now on disk

```
COUNTING_RULE.md   QUANTITIES.md
literature/NAMING.md
oracle/answer_contract.md   oracle/bootstrap_contract.md   oracle/check_register.md
oracle/currency_policy.md   oracle/install_state.md        oracle/register_schema.md
oracle/REGISTER.lunar.tsv   oracle/REGISTER.econ.tsv       oracle/VERIFIED.tsv
oracle/MANIFEST.tsv         oracle/AMENDMENTS.tsv          oracle/tests/answering_loop_suite.md
tools/quantities.js         tools/check_registers.js
```

`oracle/` exists. `literature/` exists. A context recipe naming `oracle/bootstrap_contract.md` now
names a path with a file behind it, and `grep bootstrap oracle/MANIFEST.tsv` says which
`cr_scratch/` block it came from.

## 9. Handoffs

| To | What |
|---|---|
| **The Manager** | Four AM-1 collisions to rule (§4.2), and a fifth reported at §4.3 that is a duplicate-id defect rather than a competing-successor one. `oracle/REGISTER.tsv`'s two-H-row problem (AM-98) needs a schema ruling before the file can exist. |
| **The Designer** | AM-102: §8's declared file set, with the measurement — 33 failures, back to 24 with the amendment applied. M13 implemented and measured at 13 findings, so W2-2's choice can be made against a population. W2-8's population is 48, not 1. |
| **The Systems Engineer** | AM-99: `ecr_verify.js` takes the *last* H row and enforces no cardinality. AM-101: 1.4, 1.5, 1.6 and 1.13's lift post-conditions are false against the promoted files. AM-103/104/105: CL-1 and CL-2 both fail today, measured. |
| **The Software Engineer** | The promoted `oracle/answer_contract.md:4` reads `**Contract version: 1.**`. AM-66 and AM-73 both target it, from two authors. AM-74 mints the id AM-1 needed and did not have. |
| **The Space Resources Engineer** | §7. Ruled yes, with the resolution order and the not-an-app-value clause. `Q-LCC15-APP-ADDRESSES` needs no correction. |
| **The Manager (economics prompt)** | AM-93 to AM-97: five duplicate ids and one 17-vs-18 disagreement between `step1_10` and its addendum, created when R-6 landed six minutes after the review that would have caught them. |
| **Whoever runs the Step 2 open** | `node tools/quantities.js --check` exits 1 with **32** failures today. Nine of them are the promotion's own, and AM-102 removes them, leaving 23. Run it before treating any of the remaining 23 as new. |
