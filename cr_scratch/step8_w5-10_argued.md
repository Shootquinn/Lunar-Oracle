# W5-10 — the four argued rows, resolved

**Seat:** The Fact-Checker, W5-10. **Date:** 2026-08-29.
**Ruling executed, verbatim:** *"Fix the tests or fix the deliverables, something is wrong."*

Four rows had carried the protection *"argued in commit `af7abec`, not yours to silence"* for four
waves. That protection was right when written and had become a permanent exemption, which is a
different thing. None of the four is still argued. Two were **measuring the wrong object and are
re-grounded onto the live one**; one had a **broken checker and now has a general mechanism**; one
**asserted a behaviour that the 8.1 router retirement deleted and now asserts the live property**.

**Zero rows were retired. Zero rows were made green by weakening what they assert.** Three of the
four are still RED, each with a named owner and a close condition, and the fourth is green on a
strictly harder assertion than the one it replaced.

---

## 0. Counts, with their commands, and a warning about comparing them

**Three other seats are live in this tree and landing work while I measure.** Rule 2 of the standing
block applies with force: the figures below are at different tree states and the totals are NOT
differences I produced. My rows are.

| | command | rows | pass | fail | unrun |
|---|---|---|---|---|---|
| Author tree, my wave open | `node oracle/tests/run_suite.js` | 148 | 101 | **43** | 4 |
| Author tree, mid-wave (other seats landing) | same | 148 | 130 | 12 | 6 |
| **Author tree, after my changes** | same | **146** | **139** | **3** | 4 |
| Fresh clone `cc/oracletest` @ `131f513`, before | same, in the clone | 148 | 100 | **44** | 4 |
| **Fresh clone, with the three changed test files copied in** | same | **146** | **135** | **7** | 4 |

**The clone "after" figure is not mine alone.** I copied the author tree's current *working copies*
of `run_suite.js`, `fault_inject.js` and `corpus_suite.md` into the clone, and those carry W5-8's
uncommitted work as well as mine. The clone was restored to `131f513` with `git checkout` afterwards
and is clean. What is attributable to me, and only to me, is the per-row column:

| row | author before | author after | clone before | clone after |
|---|---|---|---|---|
| `MRG-4b` | FAIL, 167 undeclared | **FAIL, 44 undeclared in 4 named classes** | FAIL, 167 | **FAIL, 44 undeclared + 24 unverifiable** |
| `MRG-9` | FAIL, 8 collisions | **FAIL, 1 collision, named files** | FAIL, 8 | **FAIL, 1** |
| `MRG-10` | FAIL, 8 collisions | **FAIL, 1 collision, named files** | FAIL, 8 | **FAIL, 1** |
| `INV-7` | FAIL | **PASS**, on 6 proved mutations | FAIL | **PASS** |

Instruments, author tree, after: `node tools/check_registers.js` → **0 hard failures @ read-digest
`8e1cbd687cda1ac1` over 315 files, tool 2.19-1**. `node tools/verify_corpus.js` → **41 OK, 0 FAIL,
1 VACUOUS, 5 REPORT, 0 hard failures @ read-digest `98f8c4b11aeffb3c` over 171 files, tool 2.17-1**.
Neither moved on my account; I did not write to `tools/`.

`node oracle/tests/fault_inject.js` → **8 decoys written, 8 applied, 8 pass, 0 fail.**

---

## 1. `MRG-9` and `MRG-10` — the rows measured a spent gate on a dead artifact

### What they actually measured

Both read `cr_scratch/merge_plan.tsv` and asserted that no two **rows** share a `dedup_key`. The
condition cell says so in its own words: *"On the table, before anything moves."* They were written
in Wave 1 as a **merge gate**. The merge moved at 2.5. A gate that runs after the thing it gates is
a post-mortem, and this one was a post-mortem on the wrong body.

### Is that object still live? No, and it is worse than stale

I verified the premise in my brief rather than accepting it, and **the brief was half wrong**. The
standing argument said the rows measure the plan and *"there are no duplicates in `literature/`"*.
The first half is right. **The second half is false.**

Of the 8 plan-side collisions:

- **7 are pair secondaries that never landed.** Each is a `pair_id=DUP-0x` group where one member
  carries `pair_primary=primary` and the other `pair_primary=secondary`. The table's own header
  states *"THE SECONDARY DOES NOT LAND. … The only rows that do not land are the 8 pair secondaries."*
  I checked all 7 secondary `target_path`s against disk: **all 7 absent.** A collision between a file
  and a file that does not exist is not a collision in the corpus.
- **1 is real on the shelf.** `L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol`,
  carried by two files that are both on disk.

And the plan-scoped form had a hole in the other direction:
`literature/growth-theory/denison-1972-classification-of-sources-of-growth.md` **has no plan row at
all** — its own provenance says so: *"This file did not pass through `tools/merge_identity.js` and
has no row in `cr_scratch/merge_plan.tsv`; it is the first `literature/` file to land outside the
Step 2.5 merge."* The plan-scoped check was blind to it and to every file that lands the same way.

### Disposition: RE-GROUNDED onto the shelf, still RED

The population is now `literature/` walked from disk, and the key is read from **each file's own
`- **Dedup key:**` line**, not from a TSV cell. This is strictly harder to evade and strictly wider:
169 files against the plan's 168, and it cannot be silenced by editing a planning record that nobody
writes to any more. Plan-side collisions among non-landing rows are **counted and reported
separately, never folded into the verdict** — `MRG-4b`'s line-ending rule, one row over.

I checked the shelf-side and plan-side keys against each other before trusting either: **0 files
with no `Dedup key` line, 0 disagreements between a file's key and its plan row's key.**

### The finding, adjudicated

```
MRG-9  FAIL  1 within-folder dedup_key collision across 169 shelf files; 0 files carry no
             Dedup key line; 7 plan-only collisions among rows the plan says do not land,
             reported not folded in:
             programme-primaries::L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol
             => programme-primaries/lsic-2026-newsletter-august.md ,
                programme-primaries/lsic-newsletter-2026-june-final.md
MRG-10 FAIL  the same one, tree-wide.
```

**Reconciled against `verify_corpus`, as the brief required.** This is exactly the pair
`verify_corpus.js` files as a level-3 duplicate group under `REPORT`, and its own baseline agrees:
`KA baseline level3DuplicateGroupsUncalled: declared 1, measured 1 (standing)`. `REPORT` means
*needs a human adjudication*. Here is the adjudication.

**They are not duplicates.** `lsic-2026-newsletter-august.md` is *Vol. 7, Issue 4*;
`lsic-newsletter-2026-june-final.md` is *Vol. 7, Issue 3*. Two different issues of one serial, with
different content. **The defect is the key, not the corpus.** The L3 slug truncates at
`lsic-newsletter-vol` and drops the issue number, so two distinct issues published in one year are
indistinguishable to anything keyed on `dedup_key`.

- **Owner:** whoever owns `oracle/NAMING.md` §7 and the two files' `Dedup key` lines. **Not me** —
  `literature/**` and `oracle/NAMING.md` are outside my write set. Routed, see §5.
- **Close:** the two newsletters carry distinct `dedup_key`s and both rows report 0.

### The move I considered and refused, recorded because refusing it is the whole point

`NAMING.md` §7 says, in terms: *"A level-3 match is a candidate duplicate, never a confirmed"* one,
and *"a level-3 match remains a candidate and the merge still does not act on it."* `MRG-9`'s own
condition cell cites §7 as its authority. So there is a clean-looking argument that an L3 collision
should be demoted from a failure to a report — **and that would have taken both rows green today,
because the only surviving collision is L3.**

**Refused.** The harm these rows name is that two documents become indistinguishable to anything
keyed on `dedup_key`, and that harm does not care whether the two are the same source — this pair
demonstrates it, since the key conflates two documents that are *definitely* different. Demoting the
only finding to a footnote would be keeping the row and loosening its condition until the object
passes. That is the defect, not the fix.

The test that the re-grounding is *not* the same move: it did not make the rows green. It moved them
from 8 findings against a dead artifact to 1 finding against the live one, over a larger population,
by a rule that reads the corpus instead of a plan cell.

---

## 2. `MRG-4b` — the checker could not read its own project's declaration form

### What it actually measured

For each landed row: strip the appended `## Provenance` block from the file, and the remainder must
be byte-identical to the `byte_source` copy, with **one hardcoded exception keyed on the file name
`azami-2024-lunar-manufacturing-review`**.

### The brief's premise was wrong, and I checked before acting

My brief said *"the count has since moved to 1."* It had not. `1` was the count of bodies that were
**identical**; the undeclared count at my wave open was **167 of 168**. The standing argument —
*"declared body edits are not recognised by any general mechanism"* — was true of the checker and
**false of the project**.

### The declaration form exists, and 154 files use it

The corpus has carried a machine-readable body-edit declaration since sub-step 2.6. It is a
`- **Body edit (…):**` line inside the file's own provenance block, and it ends in a closed clause:

> *"It equals that copy under exactly the operations named here and no others — `insert-metadata`,
> `normalize-eol-to-lf`."*

Across `literature/`: **154 files carry a `Body edit` line**, naming a closed set of four operation
tokens — `insert-metadata` (101), `drop-cts-marker` (51), `normalize-eol-to-lf` (24),
`declare-source-file` (1). **A checker that cannot recognise the declaration form its own project
uses is a broken checker.** So the gap is closed with a general mechanism, not another special case.

Two defects were closed:

1. **The provenance block was located by `lastIndexOf('\n\n---\n\n## Provenance\n')`**, which cannot
   see the labelled `## Provenance (merge)` heading. 14 files carry that heading, and all 14 were
   reported as *"no appended `## Provenance` block — PRV-1"*. They carry one; the checker could not
   see it. `tools/verify_corpus.js` has had the general rule since Wave 3 —
   `/^## Provenance( \(merge\))?\s*$/`, prefer the labelled block, fall back to the last plain one —
   and `MRG-4b` now uses the same rule. **Two instruments reading one artifact by two different
   rules is `CHK-13` again.**
2. **Declared operations were unreadable.** Now they are read, and **consumed**.

### The mechanism is not a rubber stamp, and that is the design

A declaration is never believed. Each operation in the closed set is a **consumer**: it removes from
the diff exactly the lines its own declaration says it wrote, and returns false when that shape is
not present. What survives every consumer is the **residual**, and **a non-empty residual is an
undeclared body edit no matter how much prose sits above it**. Three ways to stay red follow, and
none can be talked past:

- an edit with no operation naming it → `UNDECLARED`;
- an operation named that did not happen → `DECLARED-BUT-ABSENT`;
- an operation token outside the closed set → `OUTSIDE THE CLOSED SET`.

The line diff was also replaced. The old form used `added = B.filter(l => !A.includes(l))`, which
reports a line that merely *moved* as both an addition and a removal and cannot see a duplicated line
at all. It is now an LCS diff.

**The hardcoded `azami` exception is retired, not widened.** A checker with one file's name in it
needs editing every time the corpus does.

### Mutation evidence, run 2026-08-29 against a staged copy under `--tree`

Staged to `cr_scratch/_w5-10_mut/`, mutated, measured, and **removed** (`stage removed: true`; the
directory is not in the tree).

| | mutation | result |
|---|---|---|
| **control** | unmutated staged copy | FAIL, 44 undeclared, 117 declared-and-verified |
| **M1** | insert one stray line into a landed body | **FAIL, 45 undeclared**, verified 117 → 116 |
| **M2** | delete the `## Metadata` block from a file that declares `insert-metadata` | **FAIL, `1 DECLARED-BUT-ABSENT`** |
| **M3** | rewrite an operation token to `` `tidy-up` `` | **FAIL, `1 operation token OUTSIDE THE CLOSED SET`** |
| **M4** | make the labelled provenance heading unfindable on a clean file | **FAIL, 45 undeclared** |

M2 and M3 are the ones that matter: they are the difference between recognising a declaration and
accepting one. A seat cannot make this row green by writing a `Body edit` line.

### Disposition: GENERALIZED, still RED, 167 → 44 in four named classes

```
MRG-4b FAIL  168 landed under literature/; 124 bodies reduce to byte_source (117 of them under a
             DECLARED operation, verified by consuming it, not by believing it; 12 carried a
             line-ending normalization, reported not folded in; 0 UNVERIFIABLE);
             0 outside the closed set, 0 declared-but-absent,
             44 UNDECLARED in 4 classes
             [31 undeclared-source-file-line, 8 licence-and-copyright-pass,
              3 other, 2 self-declared-residual]
```

**Every one of the 123 findings that moved did so because the checker learned to read a declaration
whose named operations account for the entire diff with zero residual — not because a condition was
loosened.** The proof is M1–M3: the loosened forms of all three still fail.

The four classes, each a piece of work with an owner and a close condition:

| class | n | what it is | owner | close |
|---|---|---|---|---|
| `undeclared-source-file-line` | **31** | the sub-step 8.9 `Source file:` declaration written into 31 bodies with no `Body edit` line naming it. **Exactly one file — `lsic-2026-newsletter-august` — declared the identical edit as `declare-source-file`**, which is the form the other 31 owe | the author of 8.9 / W5-3 | each names `declare-source-file` in its `Body edit` clause, or is reverted |
| `licence-and-copyright-pass` | **8** | `Licence:` and `- **Publisher / copyright line (as printed):**` blocks added by the Step 8 copyright clearance, carrying **no `Body edit` line at all**. `andrews-hanna-2025-spa-magma-ocean`, `castillo-rogez-2022-ceres-habitability`, `hagerty-2011-spa-basalt-pond-thorium`, `lawrence-2003-small-area-thorium`, `levin-2025-lunar-crustal-kreep-distribution`, `mcleod-2017-extraterrestrial-ree`, `prettyman-2006-lunar-elemental-composition`, `wilson-2018-lp-thorium-reconstruction` | the author of Step 8 part 2 | a `Body edit` line naming the operation in the closed set, or reverted |
| `other` | **3** | `azami-2024-lunar-manufacturing-review` (+1: the DOI repair, described in a `- **Note:** CITATION REPAIR` line and **not named in its `Body edit` operation clause** — this is the *former hardcoded exception*, now measured like everything else and red under it); `luchsinger-2021-lcross-water-modeling` (+2/−1, a `Source file:` line **and a removed summary line**); `nasa-2025-fission-surface-power-directive` (+10/−0) | the Space Resources Engineer / the 2.6 author | as above |
| `self-declared-residual` | **2** | `falcon-heavy-wikipedia` and `rostami2018-figures`. **Their own provenance says the body "does NOT restore" and routes the Wave 2 citation repair to its author.** The file agrees with the checker; the work is still owed. `falcon-heavy` still carries the factual date change (`- Maiden flight 2026-02-06`) that no assertion authorised | the Space Resources Engineer | declared with a `basis`, or reverted |

**None of these is mine to fix:** `literature/**` is outside my write set and three seats are live.
Routed, see §5.

### One accuracy fix the clone forced, and it is not a loosening

In a fresh clone, 24 rows' `source_path` is under `_intake/`, which is **not distributed**. The old
code pushed those into the same list as undeclared body edits, so a clone read *"68 UNDECLARED"* when
44 edits existed and 24 inputs were absent. `UNVERIFIABLE` is now its own count and **is still a
failure**: folding it into `UNDECLARED` accuses somebody of an edit they did not make, and dropping it
is a vacuous pass. Author tree: **0 unverifiable**. Fresh clone: **24**.

---

## 3. `INV-7` — the decoy asserted a behaviour 8.1 deleted

### What it actually measured

`I4b-missing` stages a non-existent `index.html`, runs the assembled loop, and required
`r.verdict === 'REFUSE' && r.reason_code === 'input-missing'` — **the router deciding.** The author
retired that at 8.1: *"Let it use your little tool to help inform itself but don't have it be how it
chooses a verdict."*

### Is the property still live? Yes. Was the assertion? No

The property `I4b` names — *a missing app is reported as a missing app, and the shelf never silently
substitutes for it* — is live and observable. The **assertion** was not: at my wave open the decoy
failed on the migration throw (`classifyQuestion() is RETIRED at sub-step 8.1`), and by mid-wave, once
W5-8 migrated `runLoop` to `adviseQuestion`, it failed as `returned undefined/undefined` — reading
`r.verdict` off a report that has no verdict field, by design.

**A red for the wrong reason is the same defect class as a green for the wrong reason.** In both, the
control that was written was never exercised. This one had been red for the wrong reason since 8.1.

### Disposition: MIGRATED, and the assertion got STRICTER

The old form asserted that *some throw mentioned the word "app"*. The new form asserts four things,
all of them observable on the advice report and all of them failing independently:

1. `inputs_unavailable` **names** the missing path — a reader told "an input is missing" cannot go and
   fix it; a reader told which one can;
2. `sub_claims` is **empty** and `findings_count` is 0, so a literature-only answer is not merely
   discouraged but **impossible** — there are no sub-claims to carry one;
3. the report carries **no decision field**, which is 8.1's own rule and is what stops this decoy from
   quietly re-acquiring a verdict to read;
4. `ctx.refuse` records `input-missing`, so `answer_contract.md` §3's zero-persona timing still holds.

`runLoop` was **not** touched — W5-8 had already migrated it, and it is shared with `RFX-34`/`RFX-35`.
Only `I4b-missing`'s `expect()` changed.

### Mutation evidence, 2026-08-29 — six mutations, six reds, one control green

| | mutation | result |
|---|---|---|
| M1 | app absent, `inputs_unavailable` empty, 2 sub-claims and 7 findings offered from the shelf | **fail** — *"A LITERATURE-ONLY ANSWER TO A QUESTION THAT NEEDED THE APP"* |
| M2 | flagged but not named (`["an input"]`) | **fail** |
| M3 | named, but a shelf answer served beside it | **fail** — *"a named refusal beside a shelf answer is still a shelf answer"* |
| M4 | the report re-acquires a `verdict` field | **fail** — 8.1 |
| M5 | `ctx.refuse` unset — the wave already spent | **fail** — contract §3 |
| M6 | a throw that does not name the app | **fail** |
| control | the live shape | **PASS** |

`node oracle/tests/run_suite.js` → `INV-7` **PASS**.
`node oracle/tests/fault_inject.js --only I4b-missing` → `decoys written 1, applied 1, pass 1, fail 0`.

**This row is green on a strictly stronger assertion than the one it replaced.** That is the only
form of green this seat was authorised to produce.

---

## 4. What I did not do, and why

- **I did not retire a single row.** Every one of the four still exists and still asserts its own
  property. Two changed the object they read; one changed how it recognises a declaration; one
  changed the interface it reads. None changed what it forbids.
- **I did not touch `literature/**`.** Three seats are live and it is outside my write set. Every
  corpus defect I found is routed with an owner and a close condition instead.
- **I did not touch `oracle/router/**`, `oracle/answer_contract.md`, or the `RFX`/`REF`/`VER`/`PTH`
  rows.**
- **I did not rewrite `I4c`/`I4d`.** At my wave open both were **false greens** — their `expect()`
  accepted any throw at classify and the throw they were reading was the 8.1 migration message, not
  their own mutation. `I4d` is shared with `RFX-34`, which is W5-8's. **W5-8 fixed both during my
  sitting**; all 8 decoys now pass and name their own mutations. Nothing to route.
- **I did not add a plan row for `denison-1972`.** `cr_scratch/merge_plan.tsv` is in my write set, but
  it is an append-only record of a merge that happened at 2.5, and `denison` deliberately did not pass
  through it. Writing a row would falsify the record to satisfy a check. The shelf-grounded form of
  `MRG-9`/`MRG-10` covers the file instead, which is the right fix.

---

## 5. Routed

**To the corpus owners — 44 undeclared body edits in `literature/`, in four classes.** §2's table
names each class, its files, its owner and its close condition. The declaration form to use is the
one 154 files already use: a `- **Body edit (…):**` line in the provenance block ending
*"…and no others — `op`."*, with `op` in the closed set
`{insert-metadata, drop-cts-marker, declare-source-file, normalize-eol-to-lf}`. **Adding a token to
that set is a change to `MRG-4b`'s condition and must be argued in `corpus_suite.md`, not assumed.**
The one that should be looked at first is `falcon-heavy-wikipedia`: it carries a factual edit to a
corpus body (`- Maiden flight 2026-02-06`) that no assertion authorised.

**To the owner of `oracle/NAMING.md` §7 — the level-3 key is too coarse for a serial.**
`lsic-2026-newsletter-august.md` (Vol. 7, Iss. 4) and `lsic-newsletter-2026-june-final.md`
(Vol. 7, Iss. 3) share `L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol` because the
title slug truncates before the issue number. They are not duplicates. Either §7's L3 rule carries
the issue, or the two files' `Dedup key` lines are made distinct. Close: `MRG-9` and `MRG-10` report 0.

**Observation, no owner claimed:** `MRG-4b` cannot verify 24 rows in a fresh clone because their
`byte_source` is under `_intake/`, which is not distributed. It reports them as `UNVERIFIABLE` rather
than skipping them, so this is visible rather than silent — but a clone can never take this row green.
That is the same class of problem W5-5 worked on for `Source:` declarations.

---

## Not mine

- `RFX`, `REF`, `VER` rows and `oracle/router/**` — W5-8.
- `PTH` rows — W5-9.
- `literature/**` and `oracle/NAMING.md` — routed above.
- `tools/verify_corpus.js` — in my write set as a contingency for `MRG-4b`'s declaration mechanism,
  **not needed and not written to.** `verify_corpus` already had the general provenance-block rule;
  it was `MRG-4b` that was behind. The instrument's own numbers are unchanged on my account.

---

## Ledger

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

Zero rows added, zero deleted, zero retired. Four rewritten in place: `MRG-4b`, `MRG-9`, `MRG-10`
(condition, mutation and status cells in `oracle/tests/corpus_suite.md`; bindings in
`oracle/tests/run_suite.js`) and `INV-7` (the `I4b-missing` `expect()` in
`oracle/tests/fault_inject.js`). `cr_scratch/merge_plan.tsv` unchanged. LF throughout; verified
`0` CR bytes in all three edited files.
