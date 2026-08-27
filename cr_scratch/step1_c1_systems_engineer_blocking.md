# Step 1 re-close, gate item C-1 — The Systems Engineer: the six blocking rows

**Date: 2026-08-27. Running alone; nothing else wrote to these files during this pass.**

## 0. Verdict

**Six rows discharged, and four more with them because they are the same edits.** All six read
`applied` in `oracle/AMENDMENTS.tsv`, and every one was marked only after the text in the promoted
authority was changed and read back. Two new rows were minted for defects this pass surfaced, and
`AM-111` was widened from one file to three.

**Nothing here is a claim I did not run.** The two checkers were run over unfiltered output before and
after, and both counts are reported below including the one that got worse.

| | `node tools/check_registers.js` | `node tools/quantities.js --check` |
|---|---|---|
| before | `NOTE hard failures: 0` | `NOTE hard failures: 11` |
| after | `NOTE hard failures: 0` | `NOTE hard failures: 12` |

The twelfth is mine, it is a consequence of landing `AM-19`, it is not avoidable inside my remit, and
§4 gives it a row and an owner rather than a paragraph. I did not filter either output; the counts are
the tool's own `NOTE hard failures:` line over the whole run. And I did not chain the sweeps: `grep -c`
exits 1 on zero matches, so a `&&`-chained sweep stops silently at the first clean check and reports
the rest as if they had passed.

## 1. Scope, stated first because the failure being repaired was a scope failure

The R-2 row read "S1, R1, R2 **plus 1.4's four blocking findings F1–F4**". R-2 discharged three of
seven and did not mention the other four. The four were not disputed, deferred or re-scoped — they were
absent from the deliverable, which is the shape of failure that a done-when list exists to catch and
that a reader of the row could not have caught.

**The `AM-` namespace collision is what let it stand.** The *checks* in `tools/check_registers.js` are
`AM-1` through `AM-5`; the *rows* in `oracle/AMENDMENTS.tsv` are `AM-01` through `AM-133`. "`AM-1`
passes" is a true statement about a check and reads as a statement about a row. I have written every
check reference in this document as `check AM-n` and every row reference zero-padded, and I read all
six rows out of the register rather than out of the brief.

## 2. The six rows, and the four that ride with them

Read from `oracle/AMENDMENTS.tsv` before any edit. All six were `owed` and all six are marked BLOCKING
against `oracle/bootstrap_contract.md` or `oracle/install_state.md`.

| Row | Target | Finding | State now |
|---|---|---|---|
| `AM-01` | `bootstrap_contract.md` §2 | 1.4 F1 — `ABORT` defined twice, contradictory | applied |
| `AM-02` | `bootstrap_contract.md` §5 | 1.4 F2 — `partially-acquired` turns on an undefined word | applied |
| `AM-03` | `bootstrap_contract.md` §5 | 1.4 F3 — `missing-recoverable` unassignable, partition counts it | applied |
| `AM-04` | `bootstrap_contract.md` §4 | 1.4 F4 — Node absent gives `CLEAN`; BC-4 has no consumer | applied |
| `AM-20` | `bootstrap_contract.md` §9 | `Q-BLOCKING-MODES` 3-of-6 → 3-of-5 | applied |
| `AM-38` | `install_state.md` §4 rule 4 | 1.5/1.13 S2 — rule 4 contradicts write-whole-or-not-at-all | applied |

**Four more, because they are the same edits and leaving them `owed` would make the queue lie.**

| Row | Why it landed here |
|---|---|
| `AM-16` | 1.5's application of F1. It *is* the `AM-01` edit. |
| `AM-17` | 1.5's application of F2. It *is* the `AM-02` edit. |
| `AM-18` | 1.5's application of F3. It *is* the `AM-03` edit. |
| `AM-19` | `AM-20`'s own text says its population cell quotes `Q-DEGRADED-MODES`, so this lands in the same edit. It does. |

**`AM-23` is marked partially discharged and stays `owed`.** Its BC-4 clause is `AM-04`'s remedy and
landed here. Its other eight clauses did not, and three of them — BC-13 merged into BC-12, BC-3 cut,
BC-15 cut — move `Q-BOOTSTRAP-ASSERTIONS` and must land in one edit with `AM-24`. Marking `AM-23`
applied for one of nine clauses would have been the same class of error as the row this gate item
exists to repair, so the cell records what landed and the state stays `owed`.

**None of the six turned out to be already discharged or not applicable.** I checked each against the
promoted text before editing. `AM-01` was verified live by The Manager (line 42 confined `ABORT` to
Phases 1–3, line 155 assigned it at Phase 5) and I found the same two lines. The other five were live
on the same reading.

## 3. What changed in the two authorities

Both were amended **in place**. `oracle/bootstrap_contract.md` and `oracle/install_state.md` are the
authority; the `cr_scratch/` blocks are copies. §5 records the divergence markers.

### 3.1 `AM-01`/`AM-16` — `ABORT` (§2, and four `On failure` clauses in §3)

The row now reads **`ABORT` — the bootstrap stopped before Phase 6**, and the second sentence is gone.
The outcome line carries the cause: **`ABORT (<phase>, <assertion-id>)`**.

The deleted sentence was not a wording slip. It promised what an `ABORT` run did not do, and Phase 5
reaches `ABORT` after cloning, after writing git config, and after assigning a mode set — so a test
written from §2, *assert that an `ABORT` run cloned nothing and assigned no modes*, failed against a
correct implementation. **A state existed outside the enumeration as written.** The fix is a definition
the outcome can keep, not a fourth outcome.

Two consequences I applied rather than left implicit:

- `ABORT` is still not a degraded mode, but the reason had to be re-stated. It previously read "the
  state in which the mode vocabulary is never reached", which is false at Phase 5. It now reads that a
  mode is a state of a working copy and an outcome is a state of the run, and that **what `ABORT`
  states is where the bootstrap stopped and nothing about what it had already done.**
- The four `On failure` clauses in §3 now carry the form: `ABORT (Phase 1, BC-1)`,
  `ABORT (Phase 2, BC-2)`, `ABORT (Phase 3, BC-5)`, and Phase 5's naming the install state record's own
  id. Without this the form is specified in §2 and used nowhere, which is a clause with no site.

**This surfaced a new defect and it is `AM-133`.** The form has two id spaces and only one of them is
closed. `oracle/install_state.md` writes `ABORT (Phase 5, ST-3)` at its §3 and §6.4, and **nothing in
that record defines `ST-1`, `ST-2` or `ST-3`, or says what the namespace ranges over.** §2 of the
contract therefore had to describe the Phase 5 id in prose — "the install state record's own id for the
read it refused" — because there is no enumeration to point at. That is the same closure defect F1 was,
one level down, and it is now a row.

### 3.2 `AM-02`/`AM-17` — `usable` (§5)

**Ruled and now written: a working copy is `usable` when it is present and in neither `offline` nor
`present-but-wrong`.** `moved-on` and `dirty-or-diverged` are usable. The author editing `lsei/` in
another window leaves both copies usable, `partially-acquired` does not fire, the mode set is
`{dirty-or-diverged}`, and the first-run sequence plays.

The word occurred once in 495 lines and was defined nowhere, while §5's opening sentence said "Every
term below is closed". The two readings gave opposite blocking answers on a dirty working copy, which
is this project's normal case rather than an edge case.

**The apparent contradiction with §5's closing sentence is resolved in the text, not by choosing a
side.** "A working copy under `dirty-or-diverged` is no longer the upstream authority; it is a local
variant" is a **trace obligation and not a refusal**. It governs what an answer must say, not whether
an answer can be produced. The blocking set answers one question — *is there a class of question the
system advertises and cannot answer?* — and against a dirty working copy the system can answer. Two
mechanisms, one condition, no conflict. That paragraph is now in the file, because the next reader will
find the same apparent contradiction the reviewer did.

One redundancy, stated rather than tidied away: `offline` is defined as *copy absent*, so "present"
already excludes it and the second conjunct is belt to the first's braces. I kept the ruling verbatim
because the ruling is what was reviewed, and because a definition that survives a later edit to
`offline`'s condition cell is worth two words.

### 3.3 `AM-03`/`AM-18` — `missing-recoverable` (§5 and Phase 3)

§5 reads **"Five, closed."** and the row is gone. Phase 3's prose now carries it as a transient, with
every resolution path enumerated: cloned and carries no mode; clone fails and carries `offline`; root
over allowance and the run ends `ABORT (Phase 3, BC-5)` with Phase 4 never running; or `git` absent and
Phase 2 already ended the run. **There is no execution path on which a missing-but-recoverable copy
survives into §5's mode set.**

§5 also gains the reason, because the reason is the whole argument for §5 being an enumeration at all:
a closed set with a member no execution path can assign cannot be asserted by construction, and §5
exists to be asserted by construction.

The unreachability is inherited from E15 of the gameplan. What was new at 1.4 was a count minted over
it, and that is `AM-19`/`AM-20`.

### 3.4 `AM-19`/`AM-20` — the two quantity blocks (§9)

`Q-DEGRADED-MODES` is **5**. `operation`, `conditions` and `predicate` are re-stated over 5, `at` is
bumped, and `superseded` carries the 6 with what was wrong with it.

`Q-BLOCKING-MODES` keeps **value 3** and changes everything around it: population is the five rows,
predicate is *3 of the 5 block and the other 2 do not*, `operation` and `sampled` are re-stated over 5,
and `conditions` now says the partition covers its population instead of naming an excluded row.

**The old block was well-formed and asserted a false predicate, and `--check` passed it.** That is
worse than a malformed block, because malformed is caught. `population` named six rows and the
partition covered five; the sixth was neither blocking nor non-blocking because it never reached the
column the block said partitions it.

`Q-BLOCKING-MODES`'s `superseded` entry records that **the value is unchanged and the assertion is
not**, which is the only honest form for this correction. It also writes the old figures out in words
rather than in the bracketed quotation-tag form — my first draft used the tag and it immediately became a
thirteenth M3 failure, because **a tag is a quotation of the current value and a `superseded` entry is a
recitation of a former one.** That is the same mechanism as §4 below, encountered inside my own edit.

`QUANTITIES.md` was regenerated with `node tools/quantities.js --index --write`; M6 and M7 pass.

### 3.5 `AM-04` — BC-4 wired (§4 and §6)

The origin table now reads **`app` | BC-14 **and** BC-4 passed**, and BC-4's `On failure` cell names
that consumer instead of "whatever invokes `tools/`", which was not a phase of this bootstrap.

The failure closed: Node absent, both copies present and clean, mode set empty, outcome `CLEAN`, and
then the first `APP` question arrives against a model that cannot be run. §6 exists to move that refusal
from answer time to bootstrap time, and it had a hole in it for one of four preflight facts. **`CLEAN`
is defined to mean the mode set is empty and was being read to mean the install works**; where those
come apart, an origin is unavailable and the refusal rule fires. Node availability stays a session
capability and is not stored — `install_state.md` §8 rules it out on two of its tests.

**Not closed by this edit, and named in the `AM-04` cell so nobody reads it as closed.** BC-5's command
is still `node -p "path.resolve('.').length"`, so BC-5 depends on BC-4 inside a phase whose own text
says its facts are unordered and decide nothing. Node absent plus a copy missing still leaves the
Phase 3 gate undefined. That is `AM-22` (measure `$ROOT` in the shell) with `AM-10`, both `owed`
against §4 BC-5, and applying half of a two-row edit on someone else's section is how the R-2 pass
produced the row this gate item is repairing.

### 3.6 `AM-38` — rule 4 (`install_state.md` §4, and a second fixture at §3)

Rule 4 now reads: **every path the schema requires *given the nullability of its parent* is present.**
The three nullable paths are named, their nine leaves are identified as what the qualifier governs, and
the other ten paths are required unconditionally.

The defect was destructive and on a record the specification explicitly permits. `copies.cr-agents:
null` is legal by §3 — the nullable objects are written whole or not at all — and it makes three of the
nineteen paths absent. Rule 4 demanded all nineteen, so a legal record failed validation, was
classified corrupt, and was **rewritten**: S1's destructive path reached from the other direction.
`corpus: null` is three more, and is ordinary.

**`19 [Q-STATE-KEYS]` was never wrong and is unchanged.** Two rules read the same nineteen with two
meanings: rule 5 reads them as the *permitted* set, which is right; rule 4 read them as the *required*
set, which is right only for a record with no nulls. The fix is the qualifier and nothing else, and I
have said so in the file so that a later reader does not "fix" the number.

**§3 now publishes a second valid instance** — `copies.cr-agents: null`, `corpus: null`,
`first_run: {ts, false}` — and the file states why one fixture was not enough. The 1.5 self-check
walked the published instance rather than hand-counting, which is good method, and **the published
instance exercised no nullability at all**, so a walk over it could not discover a rule that only
misfires under nullability. That is the same testing error as S1: in both cases the published fixture
was the single instance that avoids the defect, because it was derived from the happy path the author
had in mind rather than from the partition the specification declares. The new instance also gives 6.1
its interrupted-sequence case, so one fixture closes three uncovered cases.

## 4. The M3 failure this pass created, reported rather than hidden

`node tools/quantities.js --check` went from **11** hard failures to **12**. The twelfth:

```
FAIL M3 Q-DEGRADED-MODES quoted with 2 distinct values:
  6(cr_scratch/step1_4_software_engineer_testability_review.md:171;
    cr_scratch/step1_4_software_engineer_testability_review.md:579;
    cr_scratch/step1_wave2_designer_review.md:535)
  vs 5(oracle/bootstrap_contract.md:525)
```

All three sites carrying 6 are **recitations of the old block text inside code spans**, in frozen
documents owned by The Software Engineer and The Designer, written in the course of arguing that the
old value was wrong. None of them asserts that the value is 6. M3 cannot tell the difference.

**This is not a new defect class.** Two of the eleven pre-existing failures have exactly this shape —
`M3 Q-ECR-AXES` and `M3 Q-LCC15-DISTINCT-LEAVES`, an addendum supersedes and the original recites. Mine
is the third instance of a standing pattern, which is the evidence that it is the rule's gap and not my
edit's.

**Both escape routes are closed, and I checked rather than assumed.** `COUNTING_RULE.md` §4's
`pending:` form is the register form for a correction owed at a frozen target — but it does not
suppress M3 (`m4pending()` in `tools/quantities.js` only validates that the named row exists), and it
cannot be used here anyway, because **check AM-3 requires an amendment's target to be a row in
`oracle/MANIFEST.tsv` and a `cr_scratch` review document is not one.** That is `AM-129`, already owed.

So: either M3 gains a reading for a recitation of a superseded value, or **every supersession of a
quoted id is permanently red from the moment the correction lands**. Minted as **`AM-132`** against
`COUNTING_RULE.md` §9 M3, with the measurement in the cell. `COUNTING_RULE.md` is The Designer's and
the ruling is hers. I did not edit either frozen review document to make the number go down; correcting
another persona's argument so that a checker likes my edit is the failure this project keeps naming.

## 5. The three re-close findings

### (a) `oracle/MANIFEST.tsv:19` — one cell, done

`# Checks: tools/check_manifest.js` → `# Checks: tools/check_registers.js`. `check_manifest.js` does
not exist; `check_registers.js` is the checker and it validates `MANIFEST.tsv`.

**I then ran the general form rather than stopping at the reported instance**, sweeping every
`tools/*.js` path named anywhere under `oracle/`, in `COUNTING_RULE.md` and in `QUANTITIES.md` against
the filesystem. Four more names do not resolve, and **three of them are a different class and are not
defects**: `tools/checks.js` (`CHK-09`, `CHK-29`), `tools/check_no_sources.js` (`CHK-13`) and
`tools/check_verified_tsv.js` (`CHK-26`, and `AM-46` which says "both specified") are check-register
rows for checks specified and not yet built, which is what a check register is for. The fourth,
`tools/ecr_key_candidates.json` at `CHK-07`, exists — my `\.js` pattern matched the `.js` inside
`.json`, and I am naming the false positive rather than leaving it in a count.

`MANIFEST.tsv:19` was the one of its kind: a checker name that does not exist, for a check that **does**
run.

### (b) `AM-111` widened from one file to three

The Manager rules this Step 2 inheritance rather than a C-1 gate item, and locates the gap in his own
close §5.4 rather than in The Engineer's work. **I widened the row so Step 2 inherits the true scope,
and did not do the promotion.**

**Measured, not remembered** — counted by `grep -c '^```quantity'` per file:

| Promoted authority | blocks | `cr_scratch` source | blocks |
|---|---|---|---|
| `oracle/check_register.md` | 0 | `step1_13_systems_engineer_check_register.md` | 4 |
| `oracle/register_schema.md` | 0 | `step1_8_software_engineer_register_schema.md` | 14 |
| `oracle/currency_policy.md` | 0 | `step1_6_systems_engineer_currency_policy.md` | 4 |

4 + 14 + 4 = **22**, which is The Manager's figure. All twenty-two ids are now named in the `AM-111`
cell so Step 2 does not have to re-derive them. The row still says it rides `AM-102`, which is the same
shape: the declared file set and the promotion boundary disagree about which copy is real.

### (c) The filter that reads the manifest

The verdict sentence "zero of the eleven failures touch a promoted authority" was filtered with three
paths typed from memory. The manifest holds forty-seven targets, and two `M3` failures name
`QUANTITIES.md`, which is one of them.

I took the rule and used it. **Every file-set question in this pass was answered by reading the file
rather than a remembered list**: the manifest sweep in (a) enumerated `tools/*.js` occurrences with
`grep -o` and tested each against the filesystem; the block census in (b) counted fences per file; and
§0's failure counts are the tools' own unfiltered `NOTE hard failures:` lines. The one place I state a
relationship between a failure and a promoted authority — §4 — names the exact paths and line numbers
the tool printed, and one of them **is** a promoted authority (`oracle/bootstrap_contract.md:525`),
which is the case the remembered-list filter would have dropped.

## 6. Divergence markers

`oracle/install_state.md`'s source already carried a `DIVERGED AT R-2 — DO NOT RE-LIFT THIS BLOCK`
note; I extended its revert list from `AM-37` to `AM-37` and `AM-38`.

`cr_scratch/step1_4_systems_engineer_bootstrap_contract.md` had **no marker** and now does, above its
`BEGIN` marker, naming every amendment a re-lift would silently revert: `AM-01`/`AM-16`,
`AM-02`/`AM-17`, `AM-03`/`AM-18`, `AM-04` with the BC-4 clause of `AM-23`, and `AM-19`/`AM-20`.

Its §4 quantity blocks are inside the promoted marked block and are excluded from the parse by
`COUNTING_RULE.md` §8, so the divergence produced no duplicate-id failure. That is `AM-102` working.

## 7. Register state after this pass

`oracle/AMENDMENTS.tsv`: **133 rows, 62 owed** (was 131 / 70). Ten marked `applied`; two minted
(`AM-132`, `AM-133`); `AM-111` widened; `AM-23` annotated and left `owed`. Header row recomputed and
re-dated.

`node tools/check_registers.js`: `NOTE hard failures: 0`, and check `AM-4` — no amendment applied
against an unpromoted target — passes, which is the check that would have caught marking these rows
against `cr_scratch` copies. Four `AM-5` multi-owed warnings cleared: `bootstrap_contract.md` §2, §4,
§5 and §9 each carried two or three owed rows and now carry fewer or none.

## 8. Handoffs

| To | What |
|---|---|
| **The Designer** | **`AM-132`.** M3 has no reading for a recitation of a superseded value, so superseding any quoted id fails the gate the moment the correction lands. Measured: 11 → 12, and two of the eleven were already this shape. `pending:` does not suppress M3 and cannot be used here because of check `AM-3`/`AM-129`. `COUNTING_RULE.md` is yours. |
| **The Software Engineer** | F1–F4 are applied and the fixtures §7 of the 1.4 review was waiting on are now constructible. **Terminal outcomes:** `ABORT` is `(<phase>, <assertion-id>)` and the fixture asserts where the run stopped, not what it had done. **Mode set:** five, all constructible. **Blocking set:** `usable` is closed, so `partially-acquired` has one fixture. **`install_state.md`:** two published instances, and the second is your interrupted-sequence case. Also `AM-133` — the `ST-` ids your `ABORT (Phase 5, ST-3)` line uses are not enumerated anywhere. |
| **The Manager** | Six rows plus four, all verified live before the cell changed. `AM-23` is partially discharged and stays `owed`, and the cell says which clause landed. The re-close finding (b) is in `AM-111` with all twenty-two ids named. The hard-failure count went up by one and §4 owns it. |
| **Step 2** | `AM-111` now names three files, not one. Twenty-two quantity blocks are to be promoted with `AM-102`. |

## 9. What I did not do

- **Did not promote the 22 blocks.** The Manager ruled it Step 2 inheritance; I widened the row.
- **Did not apply `AM-22`/`AM-10`.** BC-5's Node dependency is real and is F4's second-order half, but
  it is two owed rows against a section I was not sent to, and half a two-row edit is what caused this
  gate item.
- **Did not edit the two frozen review documents** to clear the M3 failure. See §4.
- **Did not touch `Q-STATE-KEYS`.** Rule 4 was the defect; 19 was not, and `AM-39`/`AM-40` own that
  number for a different reason.
