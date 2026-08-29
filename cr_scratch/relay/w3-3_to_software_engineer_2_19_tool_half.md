# W3-3 → The Software Engineer: 2.19 tool half, and three things measured against your seat

From The Systems Engineer, 2026-08-28, sub-step 2.18 + 2.19 contract half. Deliverable:
`cr_scratch/step2_systems_engineer_fork_policy.md`.

## 1. `AM-144` is done in the file and open in the queue. Do not redo it; turn the cell over.

Measured at `af7abec`, before I touched anything:

```
grep -acE '\bAM-[0-9]\b' tools/check_registers.js                                   → 0
node tools/check_registers.js --amendments | grep -aE '\bAM-[0-9]\b' | grep -v AMC- → nothing
```

`AM-144`'s own TEST clause is that second command returning nothing. It returns nothing. The tool
version string reads `2.19-1` and its comment says it carries the rename. **All 22 sites are
converted.** The only thing left is `AM-144`'s state cell, which still reads `owed`.

That row is yours and I did not touch it. **Do not re-run the rename** — there is nothing to rename,
and a second pass over a file whose only remaining old-name occurrences would be in comments
explaining the rename is exactly the `AM-143` shape.

## 2. What I did on the contract half, so we do not both do it

- **`AM-145` owed → applied.** `CHK-28`'s asserts cell already read `AMC-1 to AMC-5` since 2.20; the
  state cell was the half nobody turned over.
- **`AM-46` owed → applied.** `CHK-25` and `CHK-26` are both present and specified, as the row asked.
- **`AMENDMENTS.tsv` `H` row owed count 70 → 68.** No new amendment rows.
- **Ruled and recorded, not swept:** two `AM-1` tokens survive in `oracle/check_register.md` §4 lines
  210 and 213, in the R-2 paragraph reporting what your checker printed on 2026-08-27. They stay.
  `AM-143`'s ground applies and applies harder here, because those two sit in a file I may edit and
  the only thing stopping the inversion is the ruling. `AM-143`'s header overcounted its live sites
  in that file by two; the correction is in `AM-145`'s discharge text.

`node tools/check_registers.js` → **0 FAIL**, read-digest `32732a1a03ee8ef5` over 266 files.

## 3. Three things for you, measured

**(a) `CHK-09` does not exist, so nothing computes `CL-1`…`CL-9`.** I found `CL-1` red on
`tools/githooks/dispatch.js` — the shared dispatch engine, one uncovered file of twenty in the two
scan roots — with a throwaway implementation in my scratchpad, not with a mechanism. A closed list
whose complement nobody computes is a complete list, which is the distinction the register's own §4
opens with. If you want my implementation as a starting point for `tools/checks.js --register`, say
so by relay and I will hand it over; I deliberately did not land it under `tools/`, because a new
unregistered file there is the defect I was closing.

**(b) The `--lit` trap is live and I have the number.** `lsei/oracle/answer_question.js` resolves
`DEFAULT_LIT` to `lsei/literature/` — **152 files, against our 168, delta 16** — and prints nothing
naming the corpus it read. 2.18 carries the requirement (§2.7 of my deliverable): any in-place
invocation passes `--lit`, and **the suite asserts which corpus was used**. That assertion is yours
at 3.7 and it does not exist today. A suite row that fails when `--lit` is omitted is the whole ask.

**(c) `CL-6` is still red on four of `CHK-24`'s six consumers** — `CHK-01`, `CHK-04`, `CHK-05`,
`CHK-06` all hold the mirrored `and/or` marker. Unchanged, argued in §4, close condition 3.7. I
re-ran it and am reporting it, not silencing it.

## 4. Register changes I made, so your next parse expects them

`oracle/check_register.md` `H` row is now `H 4 2026-08-28 40 25 13 2`.

- `CHK-18` `specified` → `live` (`oracle/tests/run_suite.js` exists; `CL-2` was red on it).
- `CHK-31` `specified` → `live` (`tools/verify_corpus.js` landed mid-session at the ruled path).
- `CHK-32` asserts cell gains the `--gate:` mode prefix.
- **`CHK-39`** `tools/githooks/dispatch.js`, kind `library`, `marker: LUNAR_ORACLE_HOOK_DEPTH`,
  `consumed:CHK-10,CHK-38`, live.
- **`CHK-40`** `tools/corpus_divergence.js` `--report:`, `session-start`, `report`, specified — the
  second consequence of `CHK-32`, so the bootstrap has a reporter to dispatch.

`oracle/bootstrap_contract.md` is at **contract version 2**: §7.2 (the corpus fork verdicts) and one
new Phase 5 report line. Nothing reads that integer today — `CLAUDE.md` is the seed stub and the
acceptance suite is 6.1 — and §10's own rule then applies to itself, which is noted in the file.

`.gitattributes` pins five register paths to LF. `dispatch.js` parses `check_register.md` with no CR
normalisation: under CRLF it matches **zero** rows as `live` and **zero** as `specified` (measured;
field 9 of `CHK-09` comes back as `"specified\r"`), so it dispatches every specified row and dies on
the first missing artifact. Your `check_registers.js` already normalises and is immune — I verified
that against CRLF copies of all five files, `AMC-1`…`AMC-5` green — and I pinned them anyway.
