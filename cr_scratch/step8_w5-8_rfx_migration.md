# W5-8 — the RFX migration, the seventh reason code, and the version re-pin

**Seat: The Software Engineer, W5-8. Sub-step 8.8.** Write set: `oracle/tests/**`,
`oracle/answer_contract.md`, this file. Read-digest of the register census:
`2e521de8d6df9626` over 483 files (`node tools/check_registers.js`, 0 hard failures — baseline held).
All figures below carry the command that produced them.

---

## 0. The premise check, and the one place the brief was wrong

The brief said 34 RFX rows fail on one cause. **Measured, and it holds**: `RFX-01` through `RFX-33`
each threw `classifyQuestion() is RETIRED at sub-step 8.1`, and `RFX-35` threw the same message from
inside `oracle/tests/fault_inject.js`. That is 34.

The brief did **not** say that `RFX-34` was green for the wrong reason, and it was. `I4d`'s
`expect()` reads `if (r.threw) return { pass: true, ... }` and credited the retirement message as
"the unresolved member reached the top as a throw". The same false green sat on `INV-6` (`I4a`) and
`INV-8` (`I4c`). **A green for the wrong reason and a red for the wrong reason are one defect**, and
migrating the harness had to fix both directions or it would have left three controls unexercised.

---

## 1. What is no longer assertable, declined once rather than thirty-five times

Every RFX row's `Expected` cell names a verdict — `CONTESTED` for `two_sided`/`false_pair`,
`LITERATURE` or `BOTH` for `one_sided`. **That half is DECLINED.** The router returns an evidence
report and the composing session rules the verdict; a fixture that picks a verdict and then checks it
is measuring the fixture. It is declined **once**, in the binding's own header comment and in the new
`§15.0` of the suite, and not restated in thirty-three failure messages.

Also declined, and **not newly missing** — no binding ever asserted them, they are `Expected`-cell
prose and they stay prose: the `axis_statement` shipped verbatim, the §3.2 banned-word list on
`false_pair` rows, and the retrieved member count.

**Nothing was deleted.** Every one of the 33 axis rows has an honest successor, so the W5-4 principle
(a row that cannot be re-pointed honestly is deleted, not made vacuous) applies to none of them.

---

## 2. What each row asserts now

Three facts about one axis, all read out of `oracle/REGISTER.*.tsv` and `literature/INDEX.tsv` at run
time. Each is a lookup or a set membership. **None is a score, a threshold or a ranking.**

| # | Assertion | Why it is honest under 8.1 |
|---|---|---|
| 1 | **Shape.** `one_sided` declares exactly one side (contract §1 L5); `two_sided`/`false_pair` at least two; every declared member resolves to a path in `literature/INDEX.tsv`; the declared and accounted side counts agree | `resolveSides()` is a lookup and survived 8.1 unchanged in substance. The brief named this explicitly: "lookup, not scoring, and it is a real assertion" |
| 2 | **Reachability.** The axis appears in the register channel's findings for its own `probe_pos` — at least one declared `match_key` survives tokenization of the question its own author wrote to trigger it | The closest honest successor to the retired verdict assertion, and weaker in exactly the way the architecture is now weaker on purpose. **Nothing about mass, margin or rank is asserted**; the mass is printed as context and the message says so |
| 3 | **Arity, as a conditional.** *If* a session rules `CONTESTED` on this axis, the wave spends one persona per declared side, never the literal two, and covers every declared side once. On a `one_sided` axis the same call must **throw** | `selectWave()` takes the verdict as an argument since 8.1, so naming `CONTESTED` is the **antecedent of an implication** and the row fails on the consequent. The suite rules nothing. The throw is what survives of "never `CONTESTED`": contract §1 makes it unsatisfiable and `wave.assertDerived()` is where that is now enforced |

### Why this is not one weak assertion mass-applied

The brief's trap was thirty-five rows asserting the same trivially-true thing. Three defences, and
the third is the one that matters:

1. **The values differ per row.** Side counts run 1 to 4, member counts 1 to 9, and assertion 3
   derives a different number for each — 7 rows at 1 (a throw), 15 at 2, 7 at 3, 3 at 4.
2. **The rows split by class into two different assertions**, not one: `one_sided` rows assert a
   *throw* where the others assert a *count*.
3. **Every one of the three was proved to go RED under mutation**, which is what separates an
   assertion from a decoration.

### The mutation proof

`cr_scratch`-local script, run 2026-08-29 against staged copies of the real register (the repository
is never mutated):

| Mutation | Result |
|---|---|
| **M1** uppercase `LCC-02`'s `match_keys` (the K1 token-form defect) | the axis vanishes from the findings for its own `probe_pos` — **RED as required** |
| **M2** rename one `LCC-02` member leaf so it resolves nowhere | `unresolved: [A:li-2018-surface-exposed-water-ice-GONE.md]` — **RED as required** |
| **M3** drop `LCC-01` side C | declared 2, wave spends 2. A literal `3` anywhere would be **RED** |
| **M4** give `one_sided` `LCC-05` a second side | class-vs-sides check fires — **RED as required** |

---

## 3. Per-row disposition

All 33 axis rows take the same three assertions, valued from their own register row. The table is the
record of what each one now measures, at read-digest `2e521de8d6df9626`. **`old`** is what the row
asserted before 8.1; it is identical in kind for every row and is stated once at the head.

**Old assertion, all 33 rows:** `classifyQuestion(ctx, probe_pos).verdict` against the class
(`CONTESTED`, or `LITERATURE`/`BOTH` for `one_sided`), plus `selectWave(q, ctx).personaCount ===
axis.sides.size`, plus `sides === 1` for `one_sided`.
**New assertion, all 33 rows:** shape + reachability + conditional arity, as §2.
**Declined, all 33 rows:** the verdict.

| Row | Axis | Class | Sides | Members | Reachable on | Mass (context only) | Conditional arity |
|---|---|---|---|---|---|---|---|
| RFX-01 | LCC-01 | two_sided | 3 (A/B/C) | 3 | cabeus, ice, concentration, water | 5.177 | 3 personas |
| RFX-02 | LCC-02 | two_sided | 2 (A/B) | 2 | surface, exposed, ice | 3.676 | 2 personas |
| RFX-03 | LCC-03 | two_sided | 3 (A/B/C) | 3 | buried | 2.577 | 3 personas |
| RFX-04 | LCC-04 | two_sided | 3 (A/B/C) | 4 | energy, water | 1.174 | 3 personas |
| RFX-05 | LCC-05 | one_sided | 1 (A) | 3 | capture, efficiency | 2.818 | CONTESTED unsatisfiable — must throw |
| RFX-06 | LCC-06 | two_sided | 2 (A/B) | 4 | beneficiation, sublimation, power | 4.901 | 2 personas |
| RFX-07 | LCC-07 | two_sided | 4 (A/B/C/D) | 5 | oxygen | 0.968 | 4 personas |
| RFX-08 | LCC-08 | false_pair | 4 (A/B/C/D) | 7 | ilmenite, polar | 3.236 | 4 personas |
| RFX-09 | LCC-09 | two_sided | 3 (A/B/C) | 4 | solar, power | 0.919 | 3 personas |
| RFX-10 | LCC-10 | two_sided | 2 (A/B) | 9 | fission, solar, storage | 3.451 | 2 personas |
| RFX-11 | LCC-11 | false_pair | 2 (A/B) | 7 | cost, kilogram | 2.551 | 2 personas |
| RFX-12 | LCC-12 | two_sided | 3 (A/B/C) | 7 | propellant, business | 2.946 | 3 personas |
| RFX-13 | LCC-13 | two_sided | 2 (A/B) | 3 | helium | 2.087 | 2 personas |
| RFX-14 | LCC-14 | one_sided | 1 (A) | 3 | energy, regolith | 1.234 | CONTESTED unsatisfiable — must throw |
| RFX-15 | LCC-15 | two_sided | 2 (A/B) | 4 | excavator, regolith | 2.964 | 2 personas |
| RFX-16 | ECR-01 | false_pair | 3 (A/B/C) | 6 | targeting, miti, industrial | 3.447 | 3 personas |
| RFX-17 | ECR-02 | two_sided | 2 (A/B) | 2 | keiretsu, bank, liquidity, affiliation | 7.093 | 2 personas |
| RFX-18 | ECR-03 | two_sided | 2 (A/B) | 2 | savings, subsistence, consumption, reconstruction, destroyed | 8.870 | 2 personas |
| RFX-19 | ECR-04 | one_sided | 1 (A) | 2 | korean, war, procurement, boom | 7.393 | CONTESTED unsatisfiable — must throw |
| RFX-20 | ECR-05 | false_pair | 3 (A/B/C) | 3 | land, reform | 2.839 | 3 personas |
| RFX-21 | ECR-06 | false_pair | 3 (A/B/C) | 3 | reallocation, agriculture | 2.864 | 3 personas |
| RFX-22 | ECR-07 | false_pair | 4 (A/B/C/D) | 5 | tfp, residual, decomposition | 4.552 | 4 personas |
| RFX-23 | ECR-08 | one_sided | 1 (A) | 3 | denison, chung | 3.377 | CONTESTED unsatisfiable — must throw |
| RFX-24 | ECR-09 | false_pair | 2 (A/B) | 3 | technology, licensing, acquisition, foreign | 5.190 | 2 personas |
| RFX-25 | ECR-10 | one_sided | 1 (A) | 3 | beason, kiyota | 4.281 | CONTESTED unsatisfiable — must throw |
| RFX-26 | ECR-11 | two_sided | 2 (A/B) | 2 | tacit, toyota, transfer | 7.134 | 2 personas |
| RFX-27 | ECR-12 | two_sided | 2 (A/B) | 2 | plan, forecast, doubling, income | 3.437 | 2 personas |
| RFX-28 | ECR-13 | two_sided | 3 (A/B/C) | 3 | filp, credit, directed | 5.188 | 3 personas |
| RFX-29 | ECR-14 | false_pair | 2 (A/B) | 3 | zombie, patient, relationship | 8.072 | 2 personas |
| RFX-30 | ECR-15 | two_sided | 2 (A/B) | 3 | megaproject, overruns | 6.846 | 2 personas |
| RFX-31 | ECR-16 | two_sided | 2 (A/B) | 5 | robots, substitute, workforce | 7.576 | 2 personas |
| RFX-32 | ECR-17 | one_sided | 1 (A) | 2 | sustained, acceleration | 2.544 | CONTESTED unsatisfiable — must throw |
| RFX-33 | ECR-18 | one_sided | 1 (A) | 1 | targeting, korea, heavy, chemical | 6.906 | CONTESTED unsatisfiable — must throw |

**Mass is reported, never asserted.** Four axes sit below the retired mark of 2.431 — `LCC-04`
(1.174), `LCC-07` (0.968), `LCC-09` (0.919), `LCC-13` (2.087) — and all four are **green**, because
nothing filters by that number since 8.1. Those four are exactly `RFX-04/07/09/13`, the four
MECHANISM reds of §15.1. **Their red closed as a consequence of the architecture, not of a repair to
the register**, and the `match_keys` observation stands unrepaired and re-routed to its owner.

### The two decoy rows

| Row | Decoy | Old assertion | New assertion |
|---|---|---|---|
| **RFX-34** | `I4d`, INV-9 | `REFUSE`/`axis-incomplete` on an axis whose member path does not resolve, never a fall-through to search | **The report NAMES the member that does not resolve.** `side_resolution` reads `INCOMPLETE`, `unresolved_members` carries the decoy leaf, and `sides_resolved < sides_declared`. This is `classify.js`'s own stated replacement: "an unresolved member used to become REFUSE/axis-incomplete, which is a decision. Now it is a reported defect WITH THE MEMBER NAMED." Measured: `B:litvak-2024-lend-cabeus-water-ice-DECOY.md`, 2 of 3 sides resolve |
| **RFX-35** | `I5-dropped-side` | On a 3-sided axis with one side removed, `wave.personaCount` must fall to 2 | **Unchanged in property, migrated in call.** The decoy supplies `CONTESTED` as the antecedent and calls `selectWave('CONTESTED', {axes:[axisView(ax)]}, ctx)` against the **mutated** context. Measured: declared 2, wave spends 2 |

---

## 4. Three defects found while migrating, all in `oracle/tests/fault_inject.js`

None was in the brief. All three were invisible while `classifyQuestion()` threw first.

1. **`fakeRoot()` staged four files and `loadContext()` reads six.** `oracle/thin_patches.json` and
   `oracle/router/thin_threshold.json` became inputs after `fakeRoot` was written, so **every**
   fake-root decoy refused `input-missing` on the thin-patch register before building a single axis.
   Fixed by adding both to the staged list. This is the file's own lesson landing on the file: *a
   decoy that fires a neighbouring assertion has not tested its own.*
2. **The `registerPaths` workaround outlived the defect it worked around.** The decoys injected
   through `root` because `loadContext` ignored `registerPaths`; **8.1 repaired that**, and `BASE`
   passes absolute paths to the *real* registers — so the loader read past every staged mutation.
   `reached(ctx)` caught it and reported NOT APPLIED, which is the second half of the 5.3 fix doing
   its job three waves later. The three fake-root decoys now pass `registerPaths: stagedRegisters(d)`.
3. **Three false greens**, `I4a`/`I4c`/`I4d`, crediting the retirement throw. `I4c` (INV-8) is now
   stricter about *where*: a startup refusal must throw at **load**, which is the whole content of
   INV-8 and was not being observed. `I4a`'s pass condition is unchanged and is now reached on the
   `EMPTY POPULATION` throw it injects.

`I6-value-output` (bound to no row in either suite) was migrated with the harness: the assertion is
now that the **app channel is non-empty** — a resolved address or a grammar that refused to build one
— rather than a verdict of `APP`/`FIGURE`, because the channels are not exclusive since 8.1.

**`I4b-missing` (INV-7) was NOT touched**, per the brief. It was migrated concurrently by another
seat during this sitting and is green in both trees as I close.

---

## 5. A real portability defect, found in the fresh clone and routed

Running in `cc/oracletest` at `131f513`, **every RFX row failed with `EMPTY POPULATION:
literature_search.js found zero .md files under .../literature`** — against a `literature/` holding
**169 `.md` files that all read**. Measured directly:

```
statSync(p).isFile()            -> true    size 34058, readFileSync returns 34058 bytes
lstatSync(p).isSymbolicLink()   -> false
Dirent.isFile()                 -> false
Dirent.isSymbolicLink()         -> TRUE
```

OneDrive Files-On-Demand placeholders are reparse points, and
`fs.readdirSync(dir, {withFileTypes:true})` reports them as symbolic links.
`oracle/retrieval/literature_search.js` walks with `withFileTypes` and keeps entries on `e.isFile()`,
so **on a dehydrated tree it sees a corpus of zero and the router throws on every question.** The
throw is correct and loud — it is the one that exists to stop a missing corpus reading as a confident
`REFUSE` — and the corpus is not missing.

**This is not mine to fix.** Owner: the retrieval seat, the walk in
`oracle/retrieval/literature_search.js`. Close, an observation not a date: the `Dirent` count and the
`statSync` count agree on a clone under OneDrive — reached by keeping `!e.isDirectory()` entries, or
by falling back to `statSync()` when `isFile()` is false. **This will recur for any reader who clones
under OneDrive**, which is the distribution path the project is written for.

**What I did do:** `rfxGuard` now probes the shelf both ways and returns **VACUOUS** — counted UNRUN,
never PASS — when the retrieval layer can read zero of the files present, naming both counts, the
cause and the owner. `RFX-34`/`RFX-35` carry the same guard. A population of zero is reported as
empty, per the runner's own rule; it is not thirty-five identical reds and it is not a pass.

**The guard did not fire in either tree at close.** Reading the files hydrated them, and both trees
now measure `{byDirent:169, byStat:169}`. The divergence is still live elsewhere on this machine —
`%TEMP%` measures `{byDirent:4680, byStat:4849}` — so the two probes demonstrably differ. **Recorded
as an unfired guard rather than claimed as a fix.**

---

## 6. `REF-1` — the seventh reason code

**The router was right and the contract was behind**, exactly as briefed.
`oracle/router/classify.js` declares seven `REASON_CODES`; `answer_contract.md` §5 tabled six and its
prose said "closed set of six". The seventh, `transfer-unevaluable`, was ruled in at W4-2 on W4-4's
escalation, and `oracle/transfer_gate.md` §3.3 is that escalation verbatim: the refusal was being
written under `not-found` while *"shelf files were confirmed, and what is missing is a measurement of
a condition rather than a source for a claim"*, and that seat named the choice — *"either a widened
condition or a seventh code"* — rather than making it, because a closed set in two files is a fork.

Landed in `oracle/answer_contract.md`:

- **§5 table row** for `transfer-unevaluable`, with its condition and its owner (*whoever can measure
  the condition — a research question, not an acquisition*).
- **The ruling paragraph**: it is a seventh code and not a widening, because `not-found`'s owner is an
  acquisition decision and **no acquisition fixes a transfer nobody has measured** — the object is
  already on the shelf. Widening would put two owners behind one code, which is the failure §5's
  `excluded` clause spends its longest sentence preventing.
- **Its absence from the precedence order, stated rather than omitted.** The order says which code
  wins when several apply; this one is raised by the transfer gate, after classification, and no
  question has yet produced it alongside another. The first that does is owed a ruling on where it
  sits.
- **Arity words** in §1's `REFUSE` row ("one of seven reasons") and §5's `excluded` clause ("weakest
  of the seven").

### The version bump, and §9's growth rule followed rather than dodged

**Version 4 → 5.** §9's rule: an edit that changes any closed set increments by one, once. §9's own
fold-in exception applies only where the integer has **zero** consumers, and its closing sentence
fixes the test: *"it closes at the moment of publication, which is a fact about the repository rather
than a judgement about how related two changes feel."* **Version 4 is committed** (`git show
HEAD:oracle/answer_contract.md` reads `**Contract version: 4.**`, working tree clean) and was read by
other seats across Step 8. Published. So this mints 5 rather than folding into 4, and §9 carries the
version-5 record with that argument written out.

### Owed, and routed rather than absorbed

- **`oracle/AMENDMENTS.tsv` takes a row for this edit**, in the shape `AM-113` took for the last §5
  edit (`A | AM-nnn | oracle/answer_contract.md | section 5 | ... | applied`). **Not my write set.**
  The answer to the brief's question is therefore: **yes, the bump is owed an `AMENDMENTS.tsv` row.**
- **`oracle/question_classes.json` still lists six `refusal_codes`.** Not my write set. The router
  already handles the two directions asymmetrically and correctly — an unknown code *arriving* throws
  as a fork; a code the router implements that the artifact has not written down is reported on
  `ctx.owed_contract_codes` — so the gap is visible and safe until its owner closes it.
- `oracle/answer_contract.md`'s version is **not** a governed quantity in `QUANTITIES.md`
  (`Q-COUNTING-RULE-VERSION` governs `COUNTING_RULE.md`), so `AM-151`'s regeneration coupling does
  not bind this bump. Checked, not assumed.

---

## 7. `VER-2` — the re-pin, with the reconciliation §9 demands

The pin read 2 and the contract read 4 (5 after §6). §9 requires a **read**, not a one-character
edit, so here it is, and it is now in the suite's own header:

| Version | What moved | Does any row in this suite assert against it? |
|---|---|---|
| 3 (8.4) | §6 deliverable shape, §6a, §6b haiku form, §10 evidence pass | **No.** Every `§6` in this suite names The Space Resources Engineer's ISRU specification, not this contract. Nothing reads §6a, §6b or §10 |
| 4 (8.7) | §11 appended | **No.** Nothing reads §11 |
| 5 (8.8) | §5's seventh reason code | **Yes — `REF-1`**, which reads the §5 table at run time rather than carrying a copy, and which was red *because* the code had no row |

Re-pinned to **5**. `VER-2` green because the pin and the contract agree; `REF-1` green because the
contract and the router agree. Neither is green because a number was edited to match.

---

## 8. Suite documentation, `oracle/tests/answering_loop_suite.md`

- New **§15.0**, stating what the rows assert after 8.1, what is declined and why, and that naming
  `CONTESTED` in assertion 3 is an antecedent rather than a ruling.
- **§15.1** updated: fourteen RED / twenty-one green becomes **ten RED / twenty-five green**, with the
  reason — the four MECHANISM reds closed at 8.1, the ten SOURCE reds did not.
- `RFX-04`, `RFX-07`, `RFX-09`, `RFX-13`: status `**RED**` → `green`, each cell keeping its original
  RED text as evidence and gaining a closing note with **its own measured mass and margin**, a
  statement that **the old close condition is superseded and cannot be met** (no tool returns
  `CONTESTED` any more), and the `match_keys` repair still routed to The Space Resources Engineer.
- Header re-pinned to version 5 with the reconciliation table above.

The ten SOURCE-gate reds are untouched. They are content defects in register side claims and
`axis_statement`s, no binding ever asserted them, and repairing the artifact my own tests failed
would destroy the evidence that the test worked.

---

## 9. Counts, both trees, and a caveat about the tree moving under me

**Command:** `node oracle/tests/run_suite.js`. **Time:** 2026-08-29T18:37:53Z, both trees, same file
set, back to back.

| | Rows | Pass | Fail | Unrun | Hard failures |
|---|---|---|---|---|---|
| **Author tree, before** (session open) | 148 | 101 | 43 | 4 | 43 |
| **Author tree, after** | 146 | 138 | 4 | 4 | 6 |
| **Fresh clone, before** (`131f513`, untouched) | 148 | 100 | 44 | 4 | 44 |
| **Fresh clone, after** (apparatus copied in) | 146 | 137 | 5 | 4 | 7 |

**The clone was restored to a clean `131f513` after measuring** (`git checkout -- .`, 0 modified). To
reproduce: copy `oracle/tests/run_suite.js`, `oracle/tests/fault_inject.js`,
`oracle/tests/answering_loop_suite.md`, `oracle/tests/corpus_suite.md`, `oracle/answer_contract.md`,
`tools/verify_corpus.js` and `accumulator.md` into it and run.

### My groups, which are the attributable part

| Group | Before | After (author) | After (clone) |
|---|---|---|---|
| **RFX** | 1 pass, 34 fail | **35 pass, 0 fail** | **35 pass, 0 fail** |
| **REF** | 0 pass, 1 fail | **1 pass** | **1 pass** |
| **VER** | 2 pass, 1 fail | **3 pass** | **3 pass** |
| **INV** | 6 pass, 1 fail | **7 pass** | **7 pass** |

**36 of the 43 author-tree failures were mine to close and all 36 are closed.** `INV-7`'s green is
another seat's, landed concurrently.

### The caveat, and it is not a hedge

**The row count fell from 148 to 146 and three corpus groups moved while I was working**, because
W5-10 was editing `oracle/tests/corpus_suite.md`, `tools/verify_corpus.js` and the `MRG` bindings in
`run_suite.js` in the same tree at the same time. `PTH-3`/`PTH-4` were retired by them; `MRG-4b`,
`MRG-9` and `MRG-10` were rewritten by them. **Figures at different digests are not comparable** —
the before/after totals above therefore bracket two seats' work, and only the four groups in the
table above are attributable to this seat.

### What the remaining failures now are — six distinct things, not forty-four

| # | Row | What it is | Mine? |
|---|---|---|---|
| 1 | `MRG-4b` | 44 undeclared body edits in four named classes, owner named per class | No — argued, W5-10's, explicitly out of scope |
| 2 | `MRG-9` | 1 within-folder `dedup_key` collision | No — same |
| 3 | `MRG-10` | 1 tree-wide `dedup_key` collision | No — same |
| 4 | `[structural] MUT-6` | `MRG-10`'s RED cell lacks an owner/close clause | No — W5-10's cell, mid-edit at my close |
| 5 | `[structural] status vocabulary` | `MRG-9`'s status cell is outside `{green, RED, H}` | No — same |
| 6 | `CON-4` | **clone only.** `core.hooksPath` unset in an un-bootstrapped clone | No — correct behaviour, out of scope |

Plus **4 UNRUN**, all DEFERRED with named owners and close conditions, unchanged by this seat:
`REG-16`, `REG-17` (the retrieval excision does not exist), `ISR-13`, `ISR-14` (both `H`, permanent).

Items 4 and 5 appeared *during* this sitting as W5-10 edited their cells. **They settled before I
closed**: a re-run of the author tree minutes after the timestamped pair above reads **146 rows, 139
pass, 3 fail, 4 unrun, hard failures 3** — items 4 and 5 gone, items 1–3 standing. The clone figure is
not re-measured against that later digest, so **the pair in the table above is the comparable one**
and this line is the later reading of one of them, stated rather than substituted.

**Every remaining failure is a distinct real thing with a named owner**, which was the target.

---

## Not mine

- `PTH-3`, `PTH-4`, `PTH-13` — retired or closed by W5-10 during this sitting; untouched by me.
- `MRG-4b`, `MRG-9`, `MRG-10` and the two structural checks firing on their cells — W5-10's, argued,
  not silenced.
- `CON-4` — correct behaviour in an un-bootstrapped clone.
- `INV-7` / `I4b-missing` — explicitly out of scope; migrated by another seat, not by me.
- `oracle/retrieval/literature_search.js` — the `withFileTypes` walk that cannot see a dehydrated
  OneDrive corpus. Routed at §5 with owner and close condition.
- `oracle/question_classes.json` — six `refusal_codes` where the router and the contract now say
  seven. Routed at §6.
- `oracle/AMENDMENTS.tsv` — owed a row for the version-5 edit. Routed at §6.
- `literature/**`, `answers/`, `oracle/REGISTER.*.tsv` — never opened for writing. The ten SOURCE-gate
  RED rows are register content defects and stay red.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 (1 OWED, routed) | quantity ids +0/-0 | tests +0/-0 (35 RFX rows re-pointed, 0 deleted, 0 added)
```
