# Revision item R-3 — The Software Engineer: the answer contract at version 2

**Project:** Lunar Oracle
**Date:** 2026-08-27
**Item:** R-3 of the Step 1 close
**Author:** The Software Engineer
**Charge:** land the answer contract at version 2 in its own deliverable — all three queued bumps in
one edit, or the version field is deleted. Plus: the register-merge ruling, the two fixtures the
Wave 2 gate broke, and my own close conditions against my own rule.

Every number below was produced by a command run in this session. Where a figure I was handed did
not survive the run, the run is reported and the figure is named as the thing that moved.

---

## 0. Verdict

| | |
|---|---|
| **The version field** | **Kept, and the rule that broke it is rewritten.** `oracle/answer_contract.md` reads **version 2**. One edit, eleven amendments, one increment. |
| **The three bumps** | **There were never three.** Two are real changes and one is an artefact of a rule that counted changes instead of naming states. §2. |
| **1.6 §12** | **A real change and not a real bump.** It lands in full, with one clause pinned that its author left unpinned: *when* the missing-ref refusal fires. §2.3. |
| **The register merge** | **Concur with The Systems Engineer's R-2 ruling — two files — reached independently from the schema side.** His `SET-2` is better than the `L6` I drafted, and I withdrew mine. §5. |
| **The thing with teeth** | `L0` and `L1b` were **specified at R-2 with no implementation**. Both are implemented and both are proved able to fail. `ecr_verify.js` no longer takes the last `H` row. §5.3. |
| **FIX-9, FIX-10** | Both were **green and both were wrong**. Both are RED with close conditions that are their own runs, and both fail on **one mechanism** nobody had named. §4. |
| **AM-1** | **No collisions.** All four ruled. And AM-1's blindness is closed by a grouping that needs no minted id — measured against the pre-edit register, where it catches the collision AM-1 could not see. §6. |
| **Registers** | `node tools/check_registers.js` exits 0. `node tools/quantities.js --check` is at **11** hard failures at close, from 32 at 1.14; none is in a file I own except one I left failing on purpose, with its reason written into the block. §7. |

**One thing I did not do, and the reason is not squeamishness.** I did not take the limit-line arity
fix (F7), although the contract was open in front of me and the window I said I had missed was open
again. The reason was never "no window" — it was "not mine", and `LIM-9` routes fixed-line changes to
The Editor. Having the file open is not a reason to widen my own authority. `LIM-3` stays RED. §4.3.

---

## 1. What was actually broken

The Manager's R-3 states it exactly: the contract read **1** in its own text and **2** in nine other
files, with a third bump queued. That is not a typo; it is a rule failing in the field, and the field
it failed in is the one I built it for.

I added the version field at 1.3 with three named consumers and my own rule that it goes if any
consumer stops reading it. **All three consumers still read it**, and the field has now caught two
real disagreements before any code exists — 1.8 amending the contract inside the group that was
writing tests against it, and the contract landing at 2 while the suite still pinned 1. **A field
that has caught two defects in one step is not decoration.** It stays. What has to change is the
sentence that told two authors to compute two different integers.

---

## 2. The three bumps, ruled

### 2.1 There were two changes and one artefact

`AM-66` takes the contract 1 → 2 for the four amendments at 1.8 §1.9. `AM-73` takes it 2 → 3 for the
run-log schema extension queued at 1.6 §12. Both authors were reading the same sentence:

> *The version is a monotone integer. Any change to any closed set, any rule, or any fixed text
> increments it.*

**That sentence has two readings and only one of them is usable.** Read as *counting changes*, this
edit produces version 12, because it carries eleven amendments. Read as *naming states*, it produces
version 2. The three consumers settle it and they settle it unanimously: a run log row says which
rules a run executed under; the acceptance suite says which rules it was written against; the file
says which rules it holds. **Every one of the three needs the integer to identify a state. None of
them can use a count of edits.**

There is a second argument and it is the practical one. A version that counts amendments is a version
**nobody can land**, because every author landing one has to know what every other author landed
first — which is the coordination the integer exists to remove. `AM-66` and `AM-73` are that failure
in miniature: two authors, one integer, neither aware of the other's arithmetic.

**Ruled: the version names a state of the file. One edit, one increment, however many changes the
edit carries.** §9 now says that in the rule rather than in a note, because the ambiguity was in the
rule. `AM-73` is `superseded` by `AM-66` — as a *bump*. Its *substance* landed as `AM-70` inside the
same edit.

### 2.2 The 1.6 §12 content is real and all of it lands

Five clauses, all applied, all inside the one edit:

| Row | Clause | Landed as |
|---|---|---|
| `AM-67` | An `app` trace names the `lsei` ref it was computed against | §3. Arity unchanged; the ref rides the locator; the origin function strips it before resolving. Suite `TRC-12`. |
| `AM-68` | The ref is read live, once, at run start; never from `.oracle-state.json` | §3. |
| `AM-69` | The live ref is compared against `copies.lsei.head` | §3, **as a report line and not a refusal.** The working copy moving mid-session is drafting assumption A3 doing exactly what it assumes, and refusing there refuses a working install. |
| `AM-70` | Every run log row records the ref, or `-` | §8. **Nine fields**, closed. Suite `LOG-12` amended, `LOG-25` added. |
| `AM-71` | An `app` trace with no ref is a refusal, `input-missing` | §3, **with its timing pinned.** §2.3. |

**On `AM-70`, because a ninth field in a closed schema deserves the gate.** What breaks if the column
is deleted? *"`lsei` moved; which delivered answers were computed against the model before it moved"*
becomes a parse of every deliverable file still on disk, instead of one grep over the log. And a run
that emitted **no** `app` trace still records the ref, which the traces cannot supply at all. The
column earns its place. It is also the clause that made this edit a bump it would have carried
anyway, which is why the third bump is an artefact rather than a disagreement.

### 2.3 The one clause I pinned that its author left unpinned

`AM-71` says an `app` trace with no ref is a refusal, code `input-missing`. As written it does not say
**when**, and the timing is the whole content.

§1 says the verdict is computed before any retrieval runs. §5 says a refusal buys **zero personas,
unconditionally, for every code**, and that a refusal is cheaper than an answer in every dimension the
system has. A refusal detected on a trace *after* the wave has run breaks both: the personas are
already spent, and the refusal costs **more** than the answer it replaces. That inverts the cost
control — harmlessly in incentive terms, since nobody games toward expensive refusals, but it makes
§5's "unconditional" false.

The fix is free, because `AM-68` already puts the read at the start of the run. **Landed:** if the ref
cannot be read at all, the run refuses `input-missing` **before classification**, where every other
missing input fires. An `app` trace emitted with no ref *after* a successful read is an emitter defect
rather than a refusal — it fails §3's own check and the deliverable does not ship. Suite `REF-20`
asserts the timing, not the code: spawn count 0 and retrieval call count 0.

### 2.4 The four amendments from 1.8 §1.9, and one correction to my own warrant

All four applied. Two carry a note.

**`AM-62`, the `CONTESTED` arity.** Applied as *one per side, minimum two, no cap*. The amendment row
named `Q-LCC-SIDES-GT2` as its warrant — 10 of 15, measured over the **Step 0 draft** axes. The
warrant that survives is `Q-LCC15-SIDES-GT2`, 7 of 15, measured over the **authored** rows, whose own
`conditions` field reconciles the two (the draft block predicted 8 after the app sides were removed;
the authored rows give 7 because one axis's three price groups merged to two and another gained a
second side rather than a third). **The amendment I queued cited the superseded measurement.** The
ruling is unaffected — the argument was never about the size of the number — but the row now names the
right id.

**And no numeral goes into the contract.** The contract states the rule; the measurement stays in its
birth file. A frozen contract carrying a copy of a moving measurement is a second authority, and a
second authority drifts — which is `LIM-7`'s rule applied to myself. The contract's sentence is *"a
register axis may carry any number of sides"*, which is a fact about the schema and needs no count at
all.

**`AM-64`, Rule V's third state, and the thing I got wrong at 1.11 and fixed at 1.11 v2.** Moving
`findings` from Forbidden to permitted-and-never-counted introduces a state that is in **neither**
column of a two-column table. A generator parsing that table finds `findings` in neither column,
emits the version-1 cell list against the version-2 rules, and **returns green**. So Rule V gains a
**fourth column**, `Permitted, not counted`, and the suite gains `RV-37`, which asserts 35 cells and
10 legal where the retired `RV-34` asserted 33 and 9. The narrow lesson, which is the useful one: **a
generator is safe against changes in its table's rows and unsafe against changes in its table's
shape**, and only the second kind needs a test.

---

## 3. The one thing I found while landing it, and it has consequences

**The six reason codes had no precedence, and §5 requires exactly one.**

This surfaced from below, from two fixtures rather than from reading the contract. `excluded` is the
only code in §5's table whose *Who owns the fix* cell reads **"Nobody. The app's declared boundary,
working."** It is therefore the cheapest refusal to reach and the only one that generates no work when
it is wrong. Both properties are visible in my own table and neither of us noticed what they imply
together.

**Ruled, as `AM-113`: `excluded` is the weakest of the six and is written only when no other code
applies. A code that routes to nobody must never mask a code that routes to someone.**

Where an EXCLUSIONS entry matched and another code also applies, the other code is written and the
exclusion sentence is printed as the refusal's **nearest present object** — the third of the three
nouns §5 already requires. No new machinery, no threshold, no seventh code, and no total order over
six: one clause derived from a column the table already prints.

**What it cost to state and what it buys.** One paragraph. It closes both RED fixtures below, it
needs no number, and it explains the failure rather than patching it: `excluded` silently absorbed the
questions two other owners needed to see, precisely because nobody was on the receiving end of it.

---

## 4. The two fixtures, and the five things that post-date my last pass

### 4.1 FIX-10 — VERIFIED, understated, and green while failing its own invariant

The Fact-Checker's gate is right and it is worse than I wrote it. Three corrections, all applied:

1. **It is not a missing name in a return list, it is a missing island.** `valueModel()` lives in
   `VALUE-CORE` at `lsei/index.html` 7797–8448; `app_model.js` reads `DATA-ISLAND`, `MODEL-CORE` and
   `DERIVATION-CORE` and never opens that one. Adding the name to the return tail would not work.
   `margin_prop` is not among `model()`'s 26 output keys by any route.
2. **She ran the router.** The question returns `LITERATURE`/`ANSWERED` from a literature summary
   with a resolving trace. C1 is confirmed live, not suspected.
3. **The question text named "Commercial Led"; the preset label is "The Commercial Break."** With the
   wrong label the run returns `LITERATURE`; with the right one it returns `REFUSE`/`excluded`. **A
   fixture whose expected outcome flips on a scenario name is testing the typo.** Label corrected.

**Which refusal does the contract want?** `unbuildable`, and `excluded` is wrong. `unbuildable` is
*"an app address was named in intent and the address grammar cannot build it"*, owner the address
grammar — which is exactly the situation. `excluded` would assert that the app declares margin out of
scope, and it does not: it **computes** margin, in an island the Oracle never opens. Under `AM-113`
the `excluded` variant she observed cannot arise, because `unbuildable` applies and wins.

**Status RED. Close condition: the run's verdict is not `LITERATURE`.** Its own detector, `CL-6`'s
shape — it goes green at exactly the moment the condition is true and it cannot go green any other
way.

### 4.2 FIX-9 — CONTRADICTED, and it needed no contract change at all

No app exclusion covers law; a grep of `index.html` for treaty, ownership and property returns zero.
The ledger row compressed The Space Resources Engineer's Step 0 L9 — *"three exclusions sit here **and
there is no app surface for law at all**"* — into *"three cover demand, market, programme and law"*,
which inverts it. He had it right at Step 0.

The live run refuses on the **geology** exclusion `bound-oxygen-mare`, matched on the single shared
token "resources": right by accident, on the wrong entry, and it flips to `LITERATURE` the moment one
law summary enters the corpus.

**She asks for `refuse-weak` or a new class. I am not adding one, and the simplicity gate is what
says so.** The correct code is `not-found`: *"no address resolved and no shelf file confirmed"*, owner
*"a corpus gap, and an acquisition decision"* — which is precisely what a treaty question over this
corpus is. And the one-token exclusion match is not discarded: under §5's existing three-noun rule it
becomes the refusal's **nearest present object**, which is the slot it belongs in. **The contract as
written was already right** — "the app's EXCLUSIONS register *declares the topic*" is not satisfied by
one shared token — and the fixture asserted what the defect produced.

**Status RED. Close condition: the run's reason code is not `excluded`.**

### 4.3 What the two fixtures share, which is the finding

FIX-9 and FIX-10 fail on **one mechanism**: a single shared token reaching `excluded` ahead of
`not-found` and ahead of `unbuildable`. **Neither fixture could find it, because both asserted the
code the defect produces.** Two fixtures, one root cause, both carried green, and the only reason the
project knows is that somebody ran them.

The suite's answer is `REF-19`, which asserts the precedence **directly** rather than through a
fixture that happens to agree with the bug. Two runs: one where the intent names an unbuildable app
address and also shares a token with an EXCLUSIONS entry; one where nothing covers the question and it
also shares a token. In both, the code is the one with an owner and the exclusion sentence is the
third noun.

**A fixture marked green is a claim that the suite has looked.** These two had not been run. The
suite's own §0 says a RED test is a defect report with a close condition and is never quietly relaxed
— and says nothing about how a `green` is earned. It says it now.

### 4.4 My own ruling, applied to my own close conditions

The rule is mine from 1.11 and The Manager adopted it: **a close condition is a condition when you can
name the observation that makes it fire. A sub-step number, or a version bump, is a date.** My review
of 1.5/1.13 found one of six had a mechanism. Run against my own suite:

| Where | Was | Now |
|---|---|---|
| `LIM-3` | *"contract amended to version 2"* — **a date**, and it was satisfied in full at 1.8 while the finding it guards went untouched. I wrote it, and it failed against the first amendment that came along. | The sentence in `answer_contract.md` §4 no longer contains the words *"one per trace"*, read from that file at test time. **LIM-3 is its own detector.** |
| `LIM-9` | *"until The Editor or the author ratifies"* — a **condition with no observer.** Nobody was looking. | A row in `oracle/AMENDMENTS.tsv` targeting `answer_contract.md` §4 carries state `applied` or `declined`. One grep, over a register that now exists. |
| `LIM-11` | new, same shape | same, against `register_schema.md` §7. |
| `FIX-9`, `FIX-10` | `green`, no close condition | RED, each with its own run as the close condition. |

**The general result, and it is worth more than the four rows.** `oracle/AMENDMENTS.tsv` is the
missing observer for **every** "until a person rules" close condition in this project. Before 1.14
there was nowhere for a human gate to be observed and every one of them was unfalsifiable by
construction. That is a property the amendment register acquired by existing, and nobody has claimed
it. It generalises the 1.5/1.13 review's one-of-six finding with a mechanism that did not exist when
the review ran.

**And LIM-3 stays RED.** The contract was open in front of me. The reason I declined F7 at 1.11 v2 was
never that the window was shut — it was that re-arity-ing a fixed line is The Editor's, on the same
footing as extending the prohibition's closed list. Having the file open is not a reason to widen my
own authority, and a persona who amends a frozen fixed text because it was convenient has done the
thing the gate exists to prevent.

### 4.5 The measurement that matters for counting failures

`ecr_verify.js` indented its `FAIL` lines two spaces, so `grep -c '^FAIL'` returned **0** against a
real count of **143**. Everywhere below, a failure count names its pattern. And the tool is fixed: it
prints `FAIL` at column 0 and ends with a `FAILURES <n>` line, so both readings agree, and the header
says why the change was made.

---

## 5. The register merge — the item with teeth

### 5.1 Concurrence, reached independently

I drafted this ruling from the schema side, tabulating the three forms, and found on applying it that
**The Systems Engineer had ruled it at R-2 forty minutes earlier**, from the header columns, and
reached the same answer: **the sidecar is a set of files, `oracle/REGISTER.<corpus>.tsv`, one
`basis_root` each, joined at load.** I discarded my draft rather than restate it.

The two arguments are different and both hold, which is worth recording because they fail differently.
His is from the columns: `basis_root`, `basis_date` and `basis_ref` bind the whole file, and a merged
file could carry two corpora only by relocating `basis_root` onto every `A` row, at which point `L4`
has no root to name in its failure message. Mine is from the consumers: **the classifier reads axes
and has never read the header**, the header's only two consumers are the size declaration and the
resolution-failure report, and both are per-root facts strictly better served by staying in the file
whose root they describe. His shows the merged file is worse; mine shows the merge buys nothing.

### 5.2 Where he is right and I was wrong, on the one point we differed

I had drafted **`L6`, a prefix partition** — every `A` row's axis prefix is the one its filename
declares — as the mechanism answering *"which file does a new axis go in."* His `SET-2` explicitly
declines the prefix as a mechanism: *"`LCC-*` and `ECR-*` are disjoint today and that is not a
mechanism."*

**He is right and I withdrew `L6` before it landed.** Two reasons, and the second is the one I should
have seen first:

1. `L6` is **container-shaped** — the file name governs the id. `SET-2` is content-shaped: ids are
   unique, whatever file they sit in. This project has now met the container/content defect six times
   and I have written two of them.
2. **`L6` is redundant against a check that already exists.** An `ECR-` axis misfiled in the lunar
   file has its leaves resolved against `lsei/literature` and fails `L4`. The misplacement is already
   caught, on content, by an assertion written for another purpose.

Recorded as `AM-121`, `declined`, with the reason, because a withdrawn amendment that leaves no trace
teaches nobody. The A.9 tension produced a better answer than either of us had alone, which is what it
is for; it is not resolved and is not being resolved here.

### 5.3 What was still owed: two assertions with no mechanism

**`L0` and `L1b` were specified at R-2 and implemented nowhere.** `tools/ecr_verify.js` was untouched.
A rule with no mechanism is the defect this project keeps finding, and both are mine to close because
I own the schema they implement.

**`L0` — header cardinality and position.** The loader read the header as `if(t==='H') H=f`: **last
`H` wins, no count, no position check.** Implemented. Measured on the same concatenation of the two
promoted halves:

```
before:  FAIL L2 axis_count 18 != parsed 33      (the SECOND header, describing the other corpus)
         FAIL L2 member_count 53 != parsed 134
         143 failure lines, countable only as grep -c '^  FAIL'

after:   FAIL L0 row 98 is a second H row; schema 3.1 admits exactly one
         FAIL L2 axis_count 15 != parsed 33      (the FIRST header, which is the schema's rule)
         FAIL L2 member_count 81 != parsed 134
         FAILURES 144    and    grep -c '^FAIL ' == 144
```

**The one new line is `L0` itself, and the two `L2` lines changed which header they were reading.**
That is the defect and its fix on one file. Both promoted registers still exit 0 with `ALL PASS`.

**`L1b` — no axis id occurs in two files of the loaded set.** `B1` enforces uniqueness *within* a
file and cannot see the failure `SET-2` is written for: `LCC-12` is the axis shared between the two
halves, authored once on the lunar side, and a duplicate under the other prefix is invisible to every
per-file check. Implemented as `tools/check_registers.js --registers`:

```
NOTE L1b census: 2 register files, 33 A rows, 33 distinct axis ids
OK   L1b no axis id occurs in two files of the loaded set
```

**Proved able to fail**, because a check that cannot fail is not a check. Renaming one economics axis
to `LCC-12` in a copy:

```
NOTE L1b census: 2 register files, 33 A rows, 32 distinct axis ids
FAIL L1b axis id LCC-12 occurs in 2 files: oracle/REGISTER.lunar.tsv, oracle/REGISTER.econ.tsv
```

It reports the id and both files, which is `SET-2`'s stated requirement. It needs a check-register
row and does not have one: `CHK-29`, filed as `AM-120`, and filed **under the real `Q-CHECK-ROWS` id**
rather than a distinct one, so that the collision is visible — on 1.14's principle that a register
whose ids are chosen so the check passes is worse than no register.

### 5.4 The schema's own version, and the case §9 was written for

`oracle/register_schema.md` changed materially at R-2 and its version integer did not move. It now
reads **2**, once, covering both authors' changes.

**This file is the first case the new §9 rule was written for**, and it is a cleaner instance than the
one that produced the rule: two authors, one window, one file, and under the old reading two competing
increments — his for §3.0/`L0`/`L1b`, mine for §3.2 and the two implementations. One edit, one
increment, and the header says which change belongs to whom.

I also landed 1.14 §7's ruling into §3.2, where it belongs: the `app_surface` resolution order is a
status string, then a tier string, then **an exclusion sentence**, with `axis-incomplete` firing only
when all three are absent. It had been ruled by The Engineer and written into no schema. It carries
one clause that is not optional and pairs with `AM-113`: **an exclusion sentence is a resolved address
in the register schema and a last-resort refusal in the answer contract, and it is never both in one
answer.**

---

## 6. AM-1, and the collision check that needed no minted id

### 6.1 The four collisions are ruled and AM-1 is clean

```
OK AMENDMENTS declares its own size correctly (122 total, 79 owed)
OK AM-1 no two owed amendments name the same quantity id
OK AM-2 every superseded-by resolves to a row that is not itself superseded
OK AM-3 every amendment target is a row in oracle/MANIFEST.tsv
OK AM-4 no amendment is applied against an unpromoted target
NOTE hard failures: 0
```

Mine was `Q-ANSWER-CONTRACT-VERSION`, `AM-66` against `AM-73`, closed by superseding the second bump
rather than by renaming anything.

### 6.2 `AM-74` is declined, and declining it is the finding

`AM-74` asks me to mint a quantity id for the contract version integer, on the ground that it is
stated in eleven files and is therefore governed by `G1`. **Declined**, and the reason is a property
of the quantity rather than of the effort:

**The version integer is not one value across time.** Class `fixed` asserts one current value and
requires every site to agree; class `live` means a value that moves on its own. The version is
neither: **each file legitimately states the version it was written against**, so a Step 0 document
reading 1 is *correct*, and a tag asserting agreement would make it wrong. Neither class fits, and
inventing a sixth class for one integer is the definition of ceremony.

The two consumers that matter already have a **stronger** mechanism than the counting rule. `VER-1`,
`VER-2`, `VER-3` and `LOG-20` assert agreement at run time and go red when it breaks — which is how
this collision was found at all. The counting rule would add prose policing of historical drafts and
would catch nothing the suite does not already catch.

### 6.3 What actually closes AM-1's blind spot — `AM-112`, implemented and measured

AM-1 groups owed rows on `quantity-id` and is blind to every collision over a quantity with **no id**.
1.14 could only see `AM-66` against `AM-73` after typing a provisional id by hand, and said so:
*"AM-1's coverage over this project's most-echoed integer rests on my having typed a string."*

**The two rows already shared something AM-1 was not looking at: they targeted the same file and the
same section.** `AM-5` reports every pair of owed rows sharing `(target, section)`. It needs no id, it
catches the class rather than the instance, and it is a **`WARN` and not a `FAIL`** — rows legitimately
share a section, and only a person can tell a collision from a queue.

Implemented in `tools/check_registers.js --amendments` and measured both ways. Against today's
register: 56 distinct pairs, **14** carrying more than one owed row. Against the register **as it
stood before this edit**:

```
WARN AM-5 oracle/answer_contract.md section "section 9" carries 3 owed amendments: AM-66, AM-73, AM-74
```

**It catches the collision AM-1 could not see, and it catches `AM-74` with it.** That is the check
earning its row against the case that motivated it, run on the data that motivated it.

---

## 7. Every run, and the state of the checks

All commands from the repository root, 55 characters.

| Command | Result |
|---|---|
| `node tools/check_registers.js` | **exit 0**, `hard failures: 0`. MF-1..MF-3, AM-1..AM-5, L1b. |
| `node tools/check_registers.js --registers` | `2 register files, 33 A rows, 33 distinct axis ids`; `OK L1b`. |
| `node tools/ecr_verify.js oracle/REGISTER.lunar.tsv lsei/literature` | **exit 0**, `ALL PASS`, `FAILURES 0`. |
| `node tools/ecr_verify.js oracle/REGISTER.econ.tsv _intake/japanese-miracle/lit` | **exit 0**, `ALL PASS`, `FAILURES 0`. |
| `node tools/ecr_verify.js <the two concatenated> lsei/literature` | **exit 1**, `FAILURES 144`, `grep -c '^FAIL '` = 144, first line `FAIL L0 row 98 is a second H row`. |
| `node tools/quantities.js --check`, `grep -c '^FAIL '` | **11** at the close of this sub-step. The figure moved three times while this file was being written — 32, then 21, then 19, then 11 — because other revision items were landing in the same window. **It is a live number and it is quoted with its pattern and its moment, not as a property of the project.** |
| The suite's own counting rule, run over the suite | **216 tests**; 49 generated (RG 13 + RV 36), 167 hand-authored; **4 RED** (LIM-3, REF-19, FIX-9, FIX-10), **2 human gates** (LIM-9, LIM-11), **16 naming a 4.1 attachment point**. |

**The 11 counting-rule failures, and which are mine.** Eight are duplicate ids across the 1.9 and
1.10 addenda and two are the values those duplicates disagree on; none of the ten is mine. **No
failure is in `oracle/answer_contract.md`, `oracle/tests/answering_loop_suite.md` or
`oracle/register_schema.md`.** The suite and the contract carry no lint findings either;
`oracle/register_schema.md` carries six `LINT M3-unreadable` quotation sites, all of them lifted
with the 1.8 text and none introduced by this edit — reported rather than passed over, because "my
files are clean" is exactly the claim that should be checked rather than asserted.

Three failures were in my 1.8 source file when this pass began. Two are closed and the eleventh, the
last `M11` failure in the project, is left failing on purpose: 

- `Q-REG-FLIPS-MIN` and `Q-REG-FLIPS-ID` wrote `conditions: as Q-REG-FLIPS-FULL`. **The counting rule
  has no inheritance form for `conditions`**, so `M11` cannot see through the reference and reads a
  block with no `cwd`. The reference was the right instinct and the missing form is W2-4 / `AM-81`.
  Written out in full; no value moved, so no `superseded` entry is owed.
- `Q-REG-TSV-IGNORED`'s `conditions` field now says why it cannot pass. `M11`
  requires every `cmd:` operation to name its working directory *and its character length*. The rule
  exists because of loose end E14, where a clone failed on the length of its root. It over-applies
  here: `git check-ignore` matches a pattern against a repository-**relative** path and reads no file,
  so no ceiling is reachable by the operation, and the scratch repository's absolute length was not
  recorded and cannot be recovered. **Inventing a plausible number to make a check green is the exact
  failure this contract exists to remove.** Filed as `AM-122`: `M11` accepts a length, or a stated
  reason why length cannot affect the value. Population is one, and it is the last `M11` failure in
  the project.

---

## 8. What is on disk that was not

| File | Change |
|---|---|
| `oracle/answer_contract.md` | **Version 2.** §1 (arity, `one_sided`), §3 (Rule V fourth column, per-side requirement, app-ref clause), §5 (`misclassified` condition, `excluded` precedence), §8 (ninth field), §9 (the increment rule, and the record of what version 2 carried). |
| `oracle/tests/answering_loop_suite.md` | The 1.11 v2 delta promoted, plus five tests it predates. **216 tests.** FIX-9 and FIX-10 RED. Every close condition re-aimed. |
| `oracle/register_schema.md` | **Version 2.** §3.2 `app_surface` resolution order; `L0` and `L1b` marked implemented with their measurements; `L6` withdrawn before landing. |
| `tools/ecr_verify.js` | `L0` implemented. `FAIL` at column 0 plus a `FAILURES <n>` line. |
| `tools/check_registers.js` | `--registers` implementing `L1b`; `AM-5` implementing `AM-112`. |
| `oracle/AMENDMENTS.tsv` | **122 rows, 79 owed.** 14 rows updated to `applied`, `superseded` or `declined`; 11 new (`AM-112`–`AM-122`). |
| `cr_scratch/step1_8_...md` | Two `conditions` fields written out rather than inherited. |

---

## 9. Handoffs

| To | What |
|---|---|
| **The Editor** | `LIM-3` and `LIM-9` and `LIM-11` are three fixed-line rulings on one desk. `LIM-3` is the substantive one: limit-line arity, one per origin present rather than one per trace. All three now have an observable close condition — a row in `oracle/AMENDMENTS.tsv`. If `LIM-3` is upheld as written, delete `LIM-3` rather than rewrite it to a rule I believe is wrong, and F7 stands as a recorded disagreement. |
| **The Systems Engineer** | Concurrence on the merge, and `SET-2` beat my `L6` — reason at §5.2, recorded as `AM-121`. `L0` and `L1b` are implemented; `AM-99`'s code half is closed. `CHK-29` is owed (`AM-120`) and is a further competitor for `Q-CHECK-ROWS`. |
| **The Designer** | `AM-122`: `M11` over-applies to an operation for which path length is provably irrelevant, population one, measured. `AM-81`'s inherited-`conditions` form has two more instances, both in my 1.8 file, both worked around by writing the parent out. |
| **The Manager** | R-3 is closed: one integer, one value, everywhere. AM-1 returns no collision. **The 1.6 §12 bump was an artefact**, ruled at §2.1, and the rule that produced it is rewritten rather than noted. `AM-5` is `WARN`-shaped by design and its 14 findings need a person, not a script. |
| **The Fact-Checker** | Both gate findings applied in full. FIX-10's understatement is in the fixture text; FIX-9's ledger row is rewritten to the SRE's Step 0 original. Neither needed a new reason code, and §4.3 says what they actually shared. |
| **Whoever runs 3.9** | `REF-19` and `REF-20` are the two tests written against version-2 rules that no prototype behaviour supports yet. `REF-19` is RED on purpose. **Sixteen of the 216 name a 4.1 attachment point**, and the list is in the suite rather than in a search: RV-27, RV-35, RV-36, LIM-10, VRD-7, VRD-9, VRD-13, REF-6, REF-7, REF-10, REF-11, REF-18, LOG-5, INV-8, INV-9, FIX-19. Nearly all of them are tests the version-2 amendments touched, which is the expected shape — the amendments are about the register — and it means **the reconciliation is mostly a promise 4.1 has to keep.** |

---

*The Software Engineer, revision item R-3, Step 1 close.*
