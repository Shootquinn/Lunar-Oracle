# Step 2 Wave 1 — The Software Engineer: `SLOT-A`, `SLOT-C`, 2.19(b), the read-digest

**Written 2026-08-28.** Deliverable for W1-2. Declared write set: `oracle/tests/corpus_suite.md`,
`tools/quantities.js`, `tools/check_registers.js`, `tools/manifest.js`, this file. Plus
`cr_scratch/relay/spawn/` under standing clause 8 and `QUANTITIES.md` under the regeneration this
brief assigns me — both flagged in §7, because neither is in the list of five and I would rather name
the stretch than take it quietly.

---

## 1. PREMISE CHECK — first line, standing clause 1

**P1 is FALSE. P2 holds. P3 holds, at a digest that is not the digest the earlier 12 was taken over.**

| # | The brief's claim | Verdict | What I measured |
|---|---|---|---|
| **P1** | `SLOT-A` can be written against a disposition table that is still being written, because Block 1 is stable by construction | **FALSE, and not for the reason the wave was hedging against** | **`cr_scratch/merge_plan.tsv` DOES NOT EXIST.** Not "Block 2 is unfinished" — there is no table, no `H` row, no Block 1. `tools/merge_identity.js`, `tools/clusters.js` and `tools/doicov.js` ARE on disk, so The Engineer's D8 has started and the table has not landed. The whole seam apparatus — Block 1 stable, Block 2 churning, a midpoint checkpoint — presupposes an artifact that does not yet exist |
| **P2** | `SLOT-C` depends on no merge output and can be written immediately | **TRUE** | Written immediately, nine tests, and it is the only one of the three premises that held as stated |
| **P3** | The standing hard-failure count is 12 after the Cycle A boundary regeneration | **TRUE as a number, and the number is the least interesting thing about it** | `NOTE hard failures: 12 @ read-digest e06bc06118fa6218 over 88 files, tool 2.19-1, flags --check`. **This is a different declared file set from the one the Cycle A "12" was taken over** — `tools/manifest.js` did not exist then. The two twelves agree by arithmetic, not by measurement, and I am not claiming they reconcile. That is the entire point of the remedy I was asked to build, applied to the premise that told me to build it |

### P1 became true while I was working, and BOTH measurements stand

**`cr_scratch/merge_plan.tsv` landed at 13:50:26, after I had written `SLOT-A` against nothing.** It
did not exist at read-digest `e06bc06118fa6218` and does exist at `ef803a7a63cf24a8`. I then ran all
twelve `MRG` rows against it.

**This is the remedy I was asked to build, demonstrating itself on its own author's premise check,
within one deliverable.** "P1 is false" and "P1 is true" are both correct statements about this wave
and neither corrects the other; they are distinguished by digest rather than by whose memory is
better. Without the stamp I would have had to choose which one to write down, and either choice would
have been a true sentence about a moment nobody could identify.

**Results, `SLOT-A` against the real table — 3 green, 1 `H`, 8 red.** Full table at §11.3 of the
suite. `SLT-7` is discharged for the eight rows that had something to run against and **is NOT
discharged for the four that assert on the merge command**, which does not exist; I am not recording
those as proved.

**`MRG-4` is the finding of this fill, and it is a contract collision rather than a defect.** His
`primary_secondary` column means *which corpus copy supplies the bytes* — `sole-lsei`,
`sole-intake`, `both-identical`, `lsei-primary` — and **not** the pair primary; he defers pair
adjudication to the `DUP-xx` register rows, deliberately, and says so in the table's own header.
**8 `pair_id` groups, 0 with exactly one member marked primary**, because that is not what the column
carries. My row asserts a property of a column with the name I expected and a different meaning.
**Two seats, one column name, two contracts — `CHK-13` again, caught before the merge instead of
after.** I have NOT rewritten `MRG-4` to fit whichever answer is convenient; it stays red until
somebody rules whether the pair call is a column of this table or a `DUP-xx` field.

**`MRG-9`/`MRG-10` found 6 `dedup_key` collisions** — three `L1` DOIs shared by two rows each, one
`L2` landing page shared by **three** (`nasa.gov/moontomarsarchitecture`). **All six are same-folder
today, so `MRG-10` finds nothing `MRG-9` missed.** That is the two scopes agreeing at this placement,
not the assertion passing vacuously — and **two reviewers are cutting folder assignments in this same
wave.** Move one member of any of the six and `MRG-9` goes green while the collision survives. The
window `A7` exists for is open right now, which is a better argument for the two-scope form than the
one I wrote when I had no data.

**Green on real data:** `MRG-3` (176 rows, 117 + 59 closes), `MRG-6` (0 rows where `target_path`
disagrees with `target_folder` + `key`), `MRG-11` (5 rows at `rev > 1`, all with a `basis`; churn
8.47%, under The Manager's 15%). **He adopted the read-digest into the table's own header** — 278
files read, sha256 stated — which is the contract and the instrument meeting in a third seat's file
without either of us asking.

**What P1 being false at writing time changed, and it was worth it.** `SLOT-A` was written against
the declared column contract rather than against data, which is what produced `MRG-1`: the column
list is declared "at minimum", an OPEN set, and **an assertion over an open column set cannot fail on
a missing column.** His table closes that hole with a 17-column header row — but its **size
declaration is in a COMMENT**, `# rows = 176 block1 = 117 block2 = 59`, and there is no `^H` row. A
comment is not parsed by anything. Had the table existed when I started, I would have asserted
against the header row I found and never asked what declares its size.

**`MRG-1` exists because of a second thing the premise hid.** The column contract is declared "at
minimum" — an OPEN set. **An assertion over an open column set cannot fail on a missing column.**
`MRG-1` requires the table to declare its own columns in an `H` row and asserts on that declaration.
It is the only row that makes the other eleven checkable before the data lands, and it is The
Designer's `H`-row device, which The Engineer himself built into `oracle/MANIFEST.tsv`.

---

## 2. `SLOT-A` — FILLED, `MRG-1` to `MRG-12`, §7.1 of the suite

Twelve tests. Every one names its mutation; a row with no mutation is `CHK-03` again.

**Coverage against the slot's own "may add" list:** disposition per pair `MRG-2`, `MRG-4`, `MRG-5`;
the primary/secondary call `MRG-4`; folder placement `MRG-6`; refusal on unresolved collision
`MRG-8`, with `MRG-9`/`MRG-10` supplying the collision definition it refuses on.

**`A7` carried forward, general and at two scopes, and `MRG-10` is the load-bearing half.** `MRG-9` is
dedup-key collision within a `target_folder`; `MRG-10` is across the whole tree. **Put the two
colliding rows in DIFFERENT folders and `MRG-9` passes — correctly, per-directory — while the corpus
carries one source twice under one key.** A fixture built from the one known pair never shows it.
That is the instrument-that-was-never-tested pattern, and it is why the assertion is general rather
than a test of `gdp`/`GDP`.

**Nothing was narrowed.** `CRP-4` and `CRP-5` are untouched and still normalized-key, not
case-insensitive: nine members, eight of which differ by separator and coexist on every filesystem.
`MRG-9`/`MRG-10` sit beside them on the §7 dedup key, which is a different key and a second scope,
not a replacement.

**`SLT-7` IS PARTLY DISCHARGED AND I AM NAMING WHICH PART.** It requires every `SLOT-A` assertion
observed able to fail, dated, before 2.5 runs. **Eight rows had something to run against and were
run**: `MRG-1`, `MRG-2`, `MRG-4`, `MRG-9`, `MRG-10` observed failing on real data; `MRG-3`, `MRG-6`,
`MRG-11` observed passing. **Four were not, and are not recorded as proved** — `MRG-7`, `MRG-8`,
`MRG-12` and the machine half of `MRG-5` all assert on the merge COMMAND, which does not exist. A
test that has never been shown able to go green has never been shown to be a test, and that is still
true of those four. `SLT-9` exists so the fill cell says which is which rather than leaving it to a
paragraph.

### The `asserted_against` list — empty at writing, populated by the wave's end

The list is at §11.3 of the suite. **It was empty and that was a finding; it is now populated and the
finding is resolved rather than dropped.**

The Manager's seam statistic is `churn = (Block 2 rows with rev > 1) / (Block 2 rows)` with the side
condition **"zero revisions among rows The Software Engineer has already asserted against."** While
no table existed my list was empty, **so that side condition was vacuously true and could not fire**,
and the seam call collapsed onto the 15% threshold alone — half the detection he specified. I raised
it rather than letting an empty list read as a clean one.

**It is now live. I have asserted against all 176 rows at their committed `rev`**, Block 1 rows 1–117
and Block 2 rows 1–59. Any revision to any of the 176 fires the seam call. **Measured churn is
5/59 = 8.47%**, under his 15% threshold, and all five revised rows carry a `basis`. On his stated
rule, **W1 stays whole** — but that is his call to make and I am reporting the two inputs, not making
it.

---

## 3. `SLOT-C` — FILLED, `CON-1` to `CON-9`, §8.1 of the suite

Nine tests. **None duplicates a `PDF` row.** `PDF-1`…`PDF-16` assert that the gates catch things;
`CON` asserts that the gates are REACHED, that they are reached by the hook rather than only by hand,
and that the harness proving it does not prove it by causing it.

**`PDF-2` may not be closed by scoping the rule back to `literature/`, and `CON-1` makes that
mechanical.** Re-measured 2026-08-28: **five of eight probe paths commit** — `x.pdf`, `docs/x.pdf`,
`oracle/x.pdf`, `tools/x.pdf` and **`cr_scratch/x.pdf`**. The three that report IGNORED do so as a
side effect of deny-by-default DIRECTORY rules and not because any `*.pdf` rule exists.

**And I corrected my own row while I was there.** `PDF-2`'s status cell said four open paths and
named four; five are open. **I wrote both the measurement and the row, and the row lost one path.**
`CON-1` makes the probe a committed fixture that reports the paths it used, so the next person cannot
take a fresh measurement into a status cell and get it wrong the way I did.

**`CON-6`, the reentrancy fixture, is the one I most want built rather than reasoned about.**
`CHK-10` dispatches every row naming `pre-commit`; `CHK-09` asserts `git hook run pre-commit`; that
re-enters `CHK-10`. Unbounded, on every commit — built and watched at the 1.5/1.13 review. R-2 split
the row so the cycle is not live today, **but `git hook run` still has no reentrancy guard and sets no
environment marker**, so the next row anyone adds that names `pre-commit` and shells out re-creates
it. The assertion is that depth is bounded AND reported.

**`CON-7` is the structural no-self-invocation rule**: for every containment assertion, the process
that triggers and the process that observes are different, asserted by grepping each assertion for an
invocation of its own trigger. **`CON-8` is `PDF-16`'s empty-stage clause in runnable form** — exit 0
AND the scanned count of 0, on the same line, so neither can be read without the other. Not relaxed.

**`CON-5` and `CON-9` are deliberately two assertions.** `CON-5` observes `git hook run pre-commit`
reaching `CHK-10`; `CON-9` observes a real `git commit` refused in a scratch clone. Neither
substitutes for the other, because a check nobody's commit reaches protects nothing.

**Relayed to The Systems Engineer BEFORE he builds**, at
`cr_scratch/relay/spawn/w1_software_engineer_to_systems_engineer_slotc.md`. I assert; he builds.
**I did not write `tools/check_no_sources.js`, `.gitignore`, `tools/hooks/`, `literature/NAMING.md`
or `oracle/check_register.md`** — every remedy above is routed, not applied.

---

## 4. `PTH-9` — the ruling matched, and the ruling created a new failure mode

I did not write the three options; the author ruled relocation. My job was to make the suite match.

**`PTH-9` stays RED, with its close condition rewritten to the ruling**, owner The Systems Engineer.
It gained three rows rather than being closed by it:

- **`PTH-12`** — moved, not copied. Exactly one `NAMING.md` in the repository afterwards. A
  compatibility copy would leave two naming contracts with the retrievable one stale; `CLAUDE.md`
  already states the rule for `lsei/index.html`, that a second copy is a second authority and a
  second authority drifts.
- **`PTH-13`** — live citations repointed. **82 occurrences across 28 files, of which 9 across 6
  files are LIVE.** The other 73 are `cr_scratch/` deliverables and are the record of what was
  believed when it was written; rewriting them would falsify the record and the assertion is scoped
  to exclude them. `oracle/MANIFEST.tsv`'s row is the one that bites: leave it and `MF-1` goes red
  against a `promoted` row whose target does not exist.
- **`PTH-14`** — **still tracked at the new path, and this is the one the ruling created.**
  `literature/NAMING.md` ships today ONLY because `!/literature/**/*.md` re-admits it under a
  deny-by-default root, and **that re-admission does not follow the file out of `literature/`.** Move
  it under any deny-scoped path and the naming contract silently stops shipping; the first symptom is
  a fresh clone with no naming contract in it. **The by-name exception the author declined had no
  such failure mode.** That is not an argument to reopen the ruling — relocation is right, and
  `PTH-14` is the cost of it stated so it gets paid rather than discovered.

**Nothing in the suite still asserts the old path as correct.** The four surviving occurrences in
this file are `PTH-9`/`PTH-13`'s own subject and §0.1 finding 6's record, and they are mine to
repoint when the move lands.

---

## 5. 2.19(b), the read-digest, and the four owed rows

### 5.1 `tools/manifest.js` — the accessor, new

Nine modes. `--state`, `--path`, `--source`, `--marker`, `--gated`, `--missing`, `--unlisted`,
`--col`, `--json`, `--header`; filters compose. Module export `rows()`.

**It deliberately does not CHECK the manifest.** `tools/check_registers.js` does that (`MF-1`…`MF-3`,
`CHK-27`). An accessor that also validates is two contracts on one artifact, which is how `CHK-13`
came to have two paths — and I settled a two-contracts problem for The Engineer this same wave.

**`--unlisted` is the mode that earned its place**, and it reports its own census honestly: **20 `D`
rows against 88 declared-set paths; 72 carry no manifest row**, and the output says in its own voice
that it counts its own file and that `tools/manifest.js` is one of the 72. Standing clause 4: a
census inside the set it counts is stale when written, so the tool prints it and this file does not
quote it as durable.

**Three of the 72 are load-bearing** and I am not filtering the list to make that point, because
which paths need a row is not my ruling: `tools/check_registers.js`, `oracle/tests/corpus_suite.md`
and `tools/manifest.js` itself. `AMC-3` requires every amendment target to be a manifest row, so an
amendment against any of the three has nowhere to be recorded. `AM-144` already names this for
`tools/check_registers.js` and calls it `AM-129`'s third live instance and the first to block a row.
**It is now at least a fifth instance and one of them is a file I created this wave.**

### 5.2 The read-digest — my finding, my remedy

Implemented in `tools/quantities.js` and `tools/check_registers.js`, both at `TOOL_VERSION 2.19-1`.
Three output changes per tool, plus `--compare`:

```
NOTE tools/quantities.js version 2.19-1 flags --check
NOTE read-digest e06bc06118fa6218 over 88 files (path,size,mtime); ...
NOTE hard failures: 12 @ read-digest e06bc06118fa6218 over 88 files, tool 2.19-1, flags --check
```

**The count carries its command AND its moment on the same line.** Rule 11 required the first. The
12-13-14-12 sequence is what the second exists to prevent.

**`--compare <digest>` is the half that makes the TOOL say it, not a person:**

```
NOTE NOT COMPARABLE: --compare deadbeefdeadbeef is a different declared file set from
2c263491636e0a1c. Two counts across these two digests are two correct measurements of two
different moments and must not be reconciled, differenced, or quoted as one figure.
```

**Four implementation decisions, relayed to The Designer** at
`cr_scratch/relay/spawn/w1_software_engineer_to_designer_readdigest.md` so his §3 rule 11 amendment
can bind or overrule them:

1. **`mtime` is in the digest.** Without it, a half-written file later completed to the same byte
   length digests identically — **which is exactly how the 12-13-14-12 sequence was produced.** The
   cost is a false NOT-COMPARABLE after a bare `touch`. That is the right way round: a false
   NOT-COMPARABLE costs a re-run, a false COMPARABLE costs the defect.
2. **The two tools digest DIFFERENT SETS and each says so.** 88 files against 60. If the clause says
   "the digest", singular, it will be read as one number across the toolchain and it is not one.
3. **I did not share the function.** Fifteen duplicated lines beat a hidden coupling between two
   checkers that must be able to disagree about what they read.
4. **A missing path hashes as the literal `MISSING`** rather than being skipped, so a set that lost a
   file digests differently from one that never had it.

**One thing rule 11 should say that I cannot make the tool enforce, and it is his and not mine:** a
figure quoted in prose carries the digest or it is not a figure. `M15` cannot see this — a relayed
number that is simply wrong is invisible to it, and a relayed number that was RIGHT AT A DIFFERENT
MOMENT is invisible to everything currently in the contract.

### 5.3 The four owed rows

| Row | State | What was done, and the test that proves it |
|---|---|---|
| **`AM-137`** | **discharged (tool half)** | The contract half was already applied by The Designer at `COUNTING_RULE.md` §9 M13. The tool now excludes `literature/**/*.md` from `M13`'s scan, unconditionally, not behind a flag. Selftest case **S4** proves the exclusion fires; the clause still fires outside it |
| **`AM-138`** | **discharged** | Both implementation defects fixed. **(1)** `parseInt("7.73")` returned 7, admitting a non-integer to an integer-keyed comparison — now `/^-?\d+$/` on the value AS WRITTEN. **(2)** `\b` sits between `.` and `7`, so `\b(seven\|7)\s+percent` matched the tail of any decimal ending in `.7` — now a numeral whose preceding character is a decimal point is refused. **The filed regression fixture runs**: `node tools/quantities.js --selftest`, five cases, all pass |
| **`AM-141`** | **discharged** | `const RELAY_FILES` is gone. **I did not add three strings to it** — the contract forbids the enumeration and a longer list is the same defect at a larger size. `m15Population()` is a path predicate: `accumulator.md`, `lunar-oracle-gameplan.md`, `oracle/VERIFIED.tsv`, `cr_scratch/relay/**/*.md`. **The Manager's close item 19 test PASSES: `NOTE M15 9 untagged relays across 3 relay files`** — three, not two, and 9 findings against the old population's 6. It will be 5 files once these relay documents are counted, and a `LINT` fires if the population ever falls back to two |
| **`AM-144`** | **discharged** | 22 occurrences renamed `AM-1`…`AM-5` → `AMC-1`…`AMC-5`, **exactly the 22 the row predicted**. Row references such as `AM-100` are untouched — the pattern was anchored to a single digit. **His stated test passes: `node tools/check_registers.js --amendments \| grep -aoE '\bAM-[0-9]\b'` returns nothing** |
| **tool version header** | **discharged** | `TOOL_VERSION` in all three tools, printed on the first `NOTE` line and repeated on the failure-count line. Bumped when a clause's PATTERN or POPULATION changes — which `AM-137`/`138`/`141` all did, and which is why a pre-rename figure and a post-rename figure are not even addressable by the same string |

### 5.4 Measured effects of the tool changes — TWO MOMENTS, and this is the point

**At read-digest `e06bc06118fa6218`, 88 files** — my changes landed, no peer's yet:

- **Hard failures: 12.** Unchanged, and that is the intended result: every change was to `--lint`
  clauses, so `--check` was not touched. The twelve are the two index forks (`Q-ECR-AXES` 17/18,
  `Q-LCC15-DISTINCT-LEAVES` 58/59), `Q-DEGRADED-MODES` 6/5, the `M11` cwd row, and eight `M2`
  duplicate ids from the two addendum pairs. **None is mine.**
- **`M13`: 5 findings over 87 files, 1 excluded** as `literature/**/*.md` — that one being
  `NAMING.md` — **40 blocks** meeting the integer-as-written trigger. Down from 43 findings with zero
  precision on the staged corpus.
- **`M15`: 9 untagged relays across 3 relay files** under the computed population, against 6 across 2
  under the enumerated one. **The Manager's close item 19 test passes**: the population is no longer
  two.

**At read-digest `546be9aeaf2f4c21`, 99 files** — the wave's final state, four peers having written:

- **Hard failures: 15.** Twelve standing, **three new — all three in
  `cr_scratch/step2_engineer_dispositions.md`**: `Q-PLAN-CHURN` with `class: measured`, outside the
  closed set of five, and two `M11` rows whose `cmd:` operations name no `cwd`. **Zero are mine, and
  I know that because I read the failure lines rather than differencing the counts.** Had I
  differenced — 12 to 15 — I would have assigned three defects to myself. **This is the same finding
  I filed against §3 rule 11 in Cycle A, happening again, to me, inside the deliverable that
  implements its remedy.** Disjoint write sets are not disjoint read sets. Routed as `N9b`.
- **`M13`: 5 findings over 99 files, 0 excluded.** The exclusion covered one file and that file moved
  to `oracle/NAMING.md` during the wave, so `NAMING.md` has re-entered `M13`'s population exactly as
  predicted at `N4`. The prediction and its confirmation are three hours apart.
- **`M15`: 14 untagged relays across 7 relay files.** Seven, because `cr_scratch/relay/spawn/` now
  has contents from four seats. **Any `M15` figure from this morning and any from tonight are over
  different populations and must not be differenced** — which is what the tool now prints on the
  same line as the count.
- `tools/check_registers.js`: **0 hard failures this morning, 1 tonight** —
  `FAIL MF-1 row literature/NAMING.md is promoted but no file exists at that path`. That is `PTH-13`'s
  named mutation, live, and it is `N2b`.

**Two figures, both correct, five hours apart, and every one of them carries the set it was taken
over.** That is the whole remedy, and this section is the first place in the project where two
measurements of the same quantity sit beside each other and can be told apart.

---

## 6. The `FLD` × `INDEX-1`…`INDEX-5` reconciliation — **`FLD` survives**

Settled on the rows. It is not a clean win: **two of his five are absorbed, and two of mine were
wrong.** Full table at §4 of the suite. In short:

- **`INDEX-1` → `FLD-13`** and **`INDEX-4` → `FLD-14`**, both genuinely new. `INDEX-4` in particular
  had no `FLD` equivalent — `FLD-8` guarantees one *field* per file and is blind to `also == primary`,
  which is a membership defect one level up.
- `INDEX-2` was already `FLD-11`; `INDEX-3` already `FLD-3` + `FLD-11`; `INDEX-5` dissolves into
  `CRP-5` (the collision half, already at two scopes) and `FLD-10` (the row-count half, subsumed by
  regenerate-and-diff). His own row says the collision half is 2.4's, and 2.4 is now `SLOT-A`.
- **`FLD-11` said THREE columns. He specified four. He is right and I was wrong** — corrected, and a
  strengthening rather than a narrowing.
- **`FLD-7`'s criterion would have gone red on his generated `field` column, for the wrong reason.**
  "Grep for any literal field name outside `FIELDS.tsv`: zero hits" fires on a 176-row generated
  cache. **A generated artifact with exactly one writer is a cache, not an authority**, and a grep
  that cannot tell a cache from a rule is the wrong instrument. `FLD-7` now carries two clauses, the
  second being *mutate `FIELDS.tsv` and assert every consumer's output changes with no code edit* —
  which is the actual §9 requirement and is strictly stronger than the grep it replaces.

**Why `FLD` survives, and it is not because it is bigger.** His five are assertions inside a
specification document, where a reader who does not open that document never meets them. The suite is
the artifact the merge gate reads. Where he was right, I took the row. Relayed to him at
`cr_scratch/relay/spawn/w1_software_engineer_to_engineer_fld_index.md`.

---

## 7. The suite's own size, and the write-set stretches

**175 tests in fourteen tables of §§1–12**, from 148 in twelve. `+27`: `MRG` 12, `CON` 9, `PTH-12`
to `PTH-14`, `FLD-13`, `FLD-14`, `SLT-9`. **`SLT-5` holds**: header count, per-group list and rows
agree, checked by the command printed in the header, which returns 175. **No section number changed
and no cross-reference moved** — the two new tables are §7.1 and §8.1, inside the sections they
extend.

**Simplicity gate, applied to my own additions.** 27 rows on a 148-row suite is +18%, not a doubling.
`CON` is nine and not fourteen because I refused to give each of the five fixtures its own row when
`PDF-14` already asserts the set fires — `CON-2` asserts the property `PDF-14` leaves open, which is
isolation, and that is one row instead of five. `MRG` is twelve because the merge is the operation
the whole step exists to make safe, and `MRG-12` — the table is the only adjudication input — is what
makes the other eleven load-bearing rather than advisory.

**Two write-set stretches, named rather than taken quietly:**

1. **`cr_scratch/relay/spawn/`** — three files. Standing clause 8 requires a brief for another agent
   to be there BEFORE that agent runs, and clause 9 forbids writing outside the declared five. The
   clauses conflict and I resolved for clause 8, because `SLOT-C` was explicitly ordered to reach The
   Systems Engineer "via the relay path before he builds" and a prompt written afterwards is a
   transcript. **The Manager should rule whether the relay path is implicitly in every seat's write
   set**; if it is not, three seats will hit this in Wave 2.

   **AND ARM 2a WAS NOT DISCHARGED, on the mtimes, and I am reporting it against myself.**
   `tools/check_no_sources.js` was written at **13:49:44**. My `SLOT-C` relay to The Systems Engineer
   was written at **13:52:46**. **He built before my brief reached him**, by three minutes. My relay
   to The Engineer at 13:53:49 likewise postdates `merge_plan.tsv` at 13:50:26. Both are therefore
   reviews wearing a brief's clothes, which is precisely the failure clause 8 names, and writing them
   in the correct directory did not make them arrive in time. **Parallel spawns cannot discharge a
   clause that requires ordering**, and no amount of care inside one seat fixes it — that is a wave
   structure finding and it belongs to The Manager. The content still stands and should be read as
   review; `CON-1` through `CON-9` were not available to him while he built and the gap between what
   he built and what they assert is now a real review item for Wave 2, not a formality.
2. **`QUANTITIES.md`** — regenerated, because the brief assigns the minting "in the same edit as the
   index regeneration" and the index is a generated artifact of a tool that is in my set. It is not
   in the list of five.

---

## 8. The six minted quantity ids

Minted here, in the same edit as the regeneration, which is why leaving them unminted at the Cycle A
close was correct rather than lazy: minting without regenerating stales the index and gains a hard
failure my own `CNT-8` forbids.

**Standing clause 5 applied to every block below:** no `unit:` field's text before its first comma is
a bare common noun. `M13` keys on the first three words of that text, and Step 2's natural nouns are
`files`, `summaries`, `sources`, `folders`. Two of the six carry values in `M13`'s 0–20 trigger range
(`Q-QCHECK-FAILURES-BASE` at 12, `Q-PDF-IGNORE-OPEN` at 5) and those two are the ones the rule exists
for. Measured after minting: `M13` reports 5 findings and none of them is from these blocks.

```quantity
id:            Q-MAX-SUMMARY-BYTES
class:         fixed
value:         84767
unit:          bytes on disk of the largest single corpus summary in the prospective union
population:    every *.md under lsei/literature/ and under _intake/ that is a corpus summary;
               _intake/japanese-miracle/JM-gameplan.md at 158,635 bytes is EXCLUDED because it is a
               gameplan on the separate shelf ruled at 1.2, not a summary, and is outside the 176
operation:     cmd: find lsei/literature _intake -name '*.md' -type f -printf '%s\t%p\n' | sort -rn | head -3
conditions:    cwd: repository root, 55 characters. The command prints three rows so the excluded
               gameplan is visible in the output rather than silently filtered by the operation.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the largest summary the merge will land is 84,767 bytes, which is 3x the 28 KB
               figure Part 5 uses to justify the 500 KB size gate
derived-from:  none
sampled:       no - every file in both trees was enumerated
superseded:    none
```

```quantity
id:            Q-MIN-INTAKE-PDF-BYTES
class:         fixed
value:         81677
unit:          bytes on disk of the smallest PDF anywhere under _intake/
population:    every file under _intake/ matching *.pdf case-insensitively; 112 files
operation:     cmd: find _intake -iname '*.pdf' -type f -printf '%s\t%p\n' | sort -n | head -1
conditions:    cwd: repository root, 55 characters. -iname, not -name: the extension gate is
               case-insensitive and a case-sensitive census would measure a different population
               from the one the gate defends.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the smallest intake PDF, luxembourg-2017-space-resources-law.pdf, is SMALLER than the
               largest summary, so the two populations overlap and NO size threshold separates them
               at any value
derived-from:  none
sampled:       no - all 112 were enumerated
superseded:    none
```

```quantity
id:            Q-PDF-UNDER-500K
class:         fixed
value:         29
unit:          intake PDFs whose size on disk is below the 500 KB containment threshold
population:    the same 112 files as Q-MIN-INTAKE-PDF-BYTES
operation:     cmd: find _intake -iname '*.pdf' -type f -printf '%s\n' | awk '$1<500000' | wc -l
conditions:    cwd: repository root, 55 characters. Measured at BOTH readings of "500 KB": 500,000
               SI and 512,000 binary. The count is 29 at both, so this figure is the one number in
               the group that the 2.10 unit trap does not move - which is worth knowing precisely
               because PDF-11 exists on the assumption that it usually does.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the 500 KB gate admits 29 of 112, so it lets 26 percent of its own target population
               through; it is a backstop against an unknown carrier type and never a containment gate
derived-from:  none
sampled:       no
superseded:    none
```

```quantity
id:            Q-QCHECK-FAILURES-BASE
class:         live
value:         12
unit:          hard failures reported by the checker on the declared file set of section 8
population:    lines matching ^FAIL in the unfiltered output of tools/quantities.js --check
operation:     cmd: node tools/quantities.js --check | grep -c '^FAIL '
conditions:    cwd: repository root, 55 characters. class is LIVE and not fixed: the value moves
               whenever any file in the declared set moves, which is why it must never be quoted
               bare. Read-digest e06bc06118fa6218 over 88 files, tool 2.19-1, flags --check. A
               figure carrying a different digest is a correct measurement of a different moment
               and does not reconcile with this one.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     twelve hard failures stand at this moment: eight M2 duplicate ids from the two
               addendum pairs, the two index forks Q-ECR-AXES and Q-LCC15-DISTINCT-LEAVES,
               Q-DEGRADED-MODES, and the M11 cwd row. None is owned by this seat
derived-from:  none
sampled:       no
superseded:    none. The Cycle A figure of 12 was taken over a set that did not contain
               tools/manifest.js and is NOT this measurement; the two agree by arithmetic only.
```

```quantity
id:            Q-CORPUS-SUITE-TESTS
class:         live
value:         175
unit:          test rows in the fourteen tables of sections 1 to 12 of the corpus acceptance suite
population:    rows of oracle/tests/corpus_suite.md before the "## 13." heading whose first cell
               matches ^[A-Z]{3}-[0-9]+$
operation:     cmd: awk '/^## 13\./{exit} /^\| *[A-Z]{3}-[0-9]+ *\|/{c++} END{print c}' oracle/tests/corpus_suite.md
conditions:    cwd: repository root, 55 characters. The "## 13." guard is part of the value: section
               13's gate table carries bolded **PRV-13** and **PRV-15** first cells, which the
               declared rule excludes by section AND by the anchoring of the pattern. Without the
               guard the command returns 177, which is a correct count of a different population.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the suite declares 175 tests and 175 rows are present, so SLT-5 holds across the
               SLOT-A and SLOT-C fill
derived-from:  none
sampled:       no
superseded:    none. The Cycle A value was 148 in twelve tables; +27 at this fill.
```

```quantity
id:            Q-PDF-IGNORE-OPEN
class:         live
value:         5
unit:          probe paths that git check-ignore reports as NOT ignored, of eight probed
population:    the eight probe paths of PDF-2: x.pdf, docs/x.pdf, oracle/x.pdf, tools/x.pdf,
               cr_scratch/x.pdf, literature/x.pdf, literature/isru/x.pdf, _intake/x.pdf
operation:     cmd: c=0; for p in x.pdf docs/x.pdf oracle/x.pdf tools/x.pdf cr_scratch/x.pdf literature/x.pdf literature/isru/x.pdf _intake/x.pdf; do git check-ignore -q "$p" || c=$((c+1)); done; echo $c
conditions:    cwd: repository root, 55 characters. git 2.55.0.windows.1. The probe paths need not
               exist; check-ignore rules on the path string. class is LIVE because .gitignore is
               The Systems Engineer's write set this wave and the value is expected to reach 0.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     five of eight probe paths commit cleanly, so there is NO repository-wide *.pdf rule;
               the three that report IGNORED do so as a side effect of deny-by-default directory
               rules under /literature/ and _intake/, not because of any extension rule
derived-from:  none
sampled:       no - all eight were probed
superseded:    none. PDF-2's earlier status cell said four and named four, omitting cr_scratch/x.pdf;
               that cell was mine and it is corrected in the suite rather than argued.
```

---

## Not mine

Findings that belong to a sub-step I am not working. Written even where I am unsure, per the standing
clause: an omitted section is invisible and an empty one is falsifiable. This one is not empty.

| # | Finding | Sub-step | Owner |
|---|---|---|---|
| **N1** | **RESOLVED DURING THE WAVE, and the resolution is recorded rather than the alarm quietly dropped.** I reported that the seam side condition could not fire while my `asserted_against` list was empty. The table then landed and **I have asserted against all 176 rows at their committed `rev`.** The side condition is now LIVE: any revision to any of the 176 fires the seam call. Churn is **5/59 = 8.47%**, under the 15% threshold, and all five revised rows carry a `basis` | the W1 seam call | **The Manager** — no action needed, reported because the alarm was raised |
| **N1b** | **`MRG-4`: two seats, one column name, two contracts.** His `primary_secondary` is *which corpus copy supplies the bytes*; my row asserts the *pair* primary. He defers pair adjudication to `DUP-xx` register rows, deliberately. **Somebody must rule whether the pair primary is a column of `merge_plan.tsv` or a `DUP-xx` field**, and `MRG-4` must then assert on whichever it is. I have not rewritten it to fit either answer. This is `CHK-13`'s defect class caught before the merge rather than after | 2.4 / 2.5 | **The Manager** to rule; **The Engineer** to implement |
| **N1c** | **6 `dedup_key` collisions in the landed table**, three `L1` DOIs on two rows each and one `L2` landing page on **three** (`nasa.gov/moontomarsarchitecture`). All six are same-folder TODAY, so `MRG-9` catches them all. **Two reviewers are cutting folder assignments in this same wave**; move one member of any of the six and `MRG-9` goes green while the collision survives, which is the vacuous pass `MRG-10` exists to catch. Adjudication is his, and the L2-landing-page case is his own "a landing page shared by two documents is a candidate and not a confirmation" finding arriving with data | 2.2 / 2.3 | **The Engineer**, with the two folder reviewers |
| **N2** | **`tools/check_registers.js`, `oracle/tests/corpus_suite.md` and `tools/manifest.js` have NO `oracle/MANIFEST.tsv` row.** `AMC-3` requires every amendment target to be a manifest row, so an amendment against any of the three has nowhere to be recorded. `AM-144` names this for the first and calls it `AM-129`'s third live instance; **it is now at least a fifth, and one of them is a file I created this wave.** `MANIFEST.tsv` is not my write set and I did not add rows to it | 2.19 / 1.14 | **The Engineer** (manifest owner) or **The Manager** to assign |
| **N2b** | **A HARD FAILURE LANDED THIS WAVE AND IT IS THE ONE `PTH-13` NAMES.** `literature/NAMING.md` moved to `oracle/NAMING.md` mid-wave; `oracle/MANIFEST.tsv` still carries a `promoted` row at the old path, so `tools/check_registers.js` now reports **`FAIL MF-1 row literature/NAMING.md is promoted but no file exists at that path`** where it reported zero failures this morning. Two more live citations survive: `tools/merge_identity.js` and `lunar-oracle-gameplan.md`. `MANIFEST.tsv` is not my write set and I did not edit it | 2.14 | **The Systems Engineer** |
| **N3** | **`PTH-14`: the relocation ruling created a failure mode the declined option did not have.** `literature/NAMING.md` ships ONLY because `!/literature/**/*.md` re-admits it under a deny-by-default root, and that re-admission does not follow the file out. A move under any deny-scoped path silently stops the naming contract shipping. Not an argument to reopen the ruling — a cost to be paid rather than discovered | 2.14 | **The Systems Engineer** |
| **N4** | **`M13` behaviour change arrives with that move.** The `literature/**/*.md` exclusion is keyed on the PATH, not on the document, and today covers exactly one file: `NAMING.md`. After the move it re-enters `M13`'s population. Correct — our apparatus should be governed — but nobody asked for it and the finding count will change on that day. Do not read the change as a regression | 2.14 / 2.19 | **The Systems Engineer**, with **The Designer** on whether §9 wants it |
| **N5** | **`M15`'s population will grow by 2 the moment these relay files are counted**, from 3 to 5, because `cr_scratch/relay/**/*.md` now has contents. Any `M15` figure taken before this deliverable and any taken after are over different populations. The `LINT` I added fires if it ever falls back to 2 | 2.19 | **The Designer** (contract), me (tool) — flagged so nobody differences the two |
| **N6** | **Standing clauses 8 and 9 conflict and three seats will hit it in Wave 2.** Clause 8 requires briefs at `cr_scratch/relay/spawn/` before the receiving agent runs; clause 9 forbids writing outside the declared write set, and no seat's declared set includes the relay path. I resolved for clause 8 and named the stretch. **Rule whether the relay path is implicitly in every seat's write set** | process | **The Manager** |
| **N6b** | **ARM 2a CANNOT BE DISCHARGED BY A PARALLEL SEAT, and I failed it — measured on mtimes, against myself.** `tools/check_no_sources.js` 13:49:44; my `SLOT-C` relay to its builder 13:52:46. **He built three minutes before my brief existed.** Same shape for The Engineer: `merge_plan.tsv` 13:50:26, my relay 13:53:49. Writing to the right directory did not make them arrive in time, and no care inside one seat can fix it, because the seats run concurrently. **Clause 8 is unsatisfiable as written for same-wave peers**; it works only seat-to-next-wave. Either the briefs are written by the wave opener before any seat runs, or the clause should say "review" for same-wave peers and stop claiming otherwise. Three relays this wave, three transcripts | process / wave structure | **The Manager** |
| **N7** | **`git hook run` has no reentrancy guard and sets no environment marker.** R-2 split `CHK-09` so the `CHK-09`/`CHK-10` cycle is not live, but the enabling condition is untouched: the next row anyone adds that names `pre-commit` and shells out re-creates an unbounded recursion on every commit. `CON-6` asserts the bound; something has to build it | 2.14 | **The Systems Engineer** |
| **N8** | **The `merge-gate` trigger still has no dispatcher, and the suite still has no runner.** `CHK-01` and `CHK-04` name `merge-gate`; `CHK-10` dispatches `pre-commit` only. `oracle/tests/` is outside every declared scan root. **At 148 tests nothing invoked, this was a document; at 175 it is a document that three sub-steps are relying on as a gate.** Routed to 2.20 in Cycle A as a fifth item and still open | 2.20 | **The Systems Engineer** |
| **N9b** | **THE CYCLE A PROCESS FINDING RECURRED, TO ME, INSIDE THE DELIVERABLE THAT FIXES IT.** `--check` went 12 to 15 while I worked. All three new failures are in `cr_scratch/step2_engineer_dispositions.md`, a file I do not write: `Q-PLAN-CHURN` carries `class: measured`, outside the closed set of five, and two `M11` rows have `cmd:` operations naming no `cwd`. **A count-difference would have assigned three defects to me.** Reported here rather than in his file, and reported as a live confirmation that the remedy was needed rather than as a criticism of him — the blocks are otherwise well formed and `class: measured` is the closed-set-with-a-missing-member failure The Designer already documented | 2.2 / 2.3 | **The Engineer** |
| **N9** | Uncertain, and in anyway: **`tools/ecr_verify.js` indents its `FAIL` lines two spaces**, so `grep -c '^FAIL'` over its output returns 0 against a real count of 143. This is recorded in `tools/quantities.js`'s own header as a known violation of the column-0 rule and I did not fix it — it is not my file and `--check` does not read it. But it means at least one instrument in `tools/` reports a count that any rule-11-conformant reader will measure as zero | unassigned | **The Manager** to assign |
