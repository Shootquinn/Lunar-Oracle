# W3-2 — `verify_corpus.js`, and the first run of a corpus tool against a corpus

The Software Engineer, Wave 3, sub-step 2.17 + the tool half of 2.19 + the REG lift routed mid-wave.
Every count carries the command that produced it and the read-digest of the set walked. **The tree
moved twice while I worked** — The Engineer reformatted 168 files and The Systems Engineer edited the
check register — so figures below are stamped and are not comparable across stamps.

---

## 0. What landed

| Path | What |
|---|---|
| `tools/verify_corpus.js` | 2.17 (MERGE-11). New. 8 check groups + known-answer block + 19-case self-test |
| `oracle/tests/run_suite.js` | **+18 REG bindings** (lifted) **+4 naming/provenance bindings**, and a new `DEFER` verdict. 0 suite rows added |
| `COUNTING_RULE.md` | §4 part 3 and §7: `--index` → `--index --write` |
| `cr_scratch/relay/w3-2_to_systems_engineer_chk31_status.md` | routed findings |
| `tools/manifest.js` | **Unchanged. Already complete** — §5 |

Not written, deliberately: `oracle/verify_corpus.js`. §1.

**The headline number.** `node oracle/tests/run_suite.js`:

```
wave open   405 rows:  18 pass, 4 fail, 383 unrun
now         405 rows:  33 pass, 4 fail, 368 unrun
              of those 368: 7 DEFERRED (bound, subject not built, reason named),
                            0 VACUOUS, 361 with no binding at all.
```

**+15 executing rows, 0 suite rows added, the same 4 standing failures, none silenced.**

---

## 1. The ruled path was refused, and the register was right

My brief said build `oracle/verify_corpus.js` and warned of `CL-1` exposure "unless the register
knows about it". **The register already knew, at the other path.** `CHK-31`'s `path` field reads
`tools/verify_corpus.js`, and its authority cell records the 2.20 ruling verbatim:

> ROW MINTED BEFORE THE ARTIFACT … 2.17 named it `oracle/verify_corpus.js`, `oracle/**/*.js` is a
> declared S root, and `CL-1` would have failed it on the day it landed. **Ruled to `tools/` at 2.20
> alongside `CHK-13` — ONE PATH DECISION, MADE ONCE.**

Building at `oracle/` would have reproduced 2.20 defect 3 inside the sub-step that closes it, spent a
zero-row `C` allowance, and left `CHK-31` naming a file that does not run. Building at both is two
authorities on one mechanism — `CHK-13` by name. **Confirmed independently mid-wave by the
coordinator and by The Systems Engineer**, who has since flipped `CHK-31` to `live`.

Measured, so the exposure is stated rather than assumed: **`CL-1` is not implemented.** Its
implementer `CHK-09` names `tools/checks.js`, which does not exist. `CL-1` is `specified` and unrun —
which is a reason to follow the ruling, not a licence to ignore it. The Systems Engineer found the
same hole from the other side (`CL-1` red on `tools/githooks/dispatch.js`). Neither of us landed a
fix: a new unregistered file under `tools/` is the defect being closed. Routed.

---

## 2. `tools/verify_corpus.js`

**`read-digest af7a719683f8c607` over 170 files under `literature/`. 39 OK, 1 FAIL, 1 VACUOUS,
6 REPORT. Exit 1.**

### The two structural requirements

**VACUOUS IS NOT PASS.** Four verdicts, not two. Every check declares the size of the population it
walked and returns `VACUOUS` — never `OK` — over an empty or missing one. Three self-test cases
assert it: a missing tree, an empty tree, and the KA block all yield `VACUOUS` and never `OK`.

**KNOWN-ANSWER TEST.** `§KA` declares 10 expected counts and checks each against the artifact,
failing in either direction. All 10 pass at the current digest. **It fired for real, mid-session, and
that is the best evidence in this deliverable** — see below.

### It caught its own author

Mid-session The Engineer relabelled the merge block `## Provenance (merge)` on the 14 files that
carried two. My parser matched `^## Provenance$` only, so on those 14 it silently fell back to the
*inherited* block. The tool went from 2 FAIL to 8 FAIL — and **5 of the 8 were `KA` lines**:

```
FAIL  KA field "lunar":       declares 124, measured 110
FAIL  KA Source: under lsei/: declares 144, measured 131
FAIL  KA dedup keys parsed:   declares 168, measured 154
```

**The shelf had not moved. My parser had broken.** Without `§KA` the tool would have reported
`PRV-2: 14 files missing every landed key` — a corpus defect that did not exist — and someone would
have gone looking for it in the corpus. The known-answer test is the thing that said *the instrument
is wrong, not the specimen*. That is the entire argument for declaring your own expected counts, and
I did not have to construct the case: the wave produced it.

Fixed by keying on the label rather than on position (`blocks.find(b => b.labelled)`), which is
strictly better than the "last block" heuristic it replaces. All 10 KA lines green again.

### The one hard failure, and it is real

**`PTH/A3` — 3 component breaches of `NAMING.md` §8's budget**, none whitelisted in §10:

| Breach | Measured | Ceiling |
|---|---|---|
| leaf `ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md` | 70 | 64 |
| folder `development-and-industrial-policy` | 33 | 32 |
| folder `organization-and-production-systems` | 35 | 32 |

The **composite** still closes — longest relative path 99/108 — and the tool prints that next to the
breaches so a reader can tell a broken corpus from one that has spent its headroom. The components
are what *guarantee* the composite. `corpus_suite.md` §0.1 already calls
`organization-and-production-systems` "a folder name that was shortened at §8"; it was not.

### What VACUOUS bought — twice, and the second time against me

**First:** `REG` reported VACUOUS on the grounds that the registers named 0 `literature/` paths, and I
drew the conclusion that 2.16's rebinding had not landed. **That conclusion was wrong.** 2.16 *has*
landed. `register_schema.md` binds by **leaf + a `basis_root` declared once in the H row** — the
rebind is two edits, not 134, which is `REG-10`'s whole point. A checker grepping for `literature/`
in a file whose design is not to contain it finds nothing forever, and *found nothing* is not *there
is nothing to find*.

**Only the VACUOUS verdict stopped that from printing as a green pass.** Had I written the obvious
`OK — every register path resolves`, the run would have certified a rebinding it had not looked at.
Corrected on The Space Resources Engineer's W3-4 measurement; `REG` now resolves member leaves and
reports `all 121 member rows … 83 distinct leaves` and `every member leaf resolves to exactly one
file`. Recorded rather than quietly fixed.

**Second:** `.oracle-state.json` does not exist, so `DIV` cannot call a divergence NEW or STANDING.
The divergence itself is computed from provenance content and is unaffected — 1.5's own ruling
working as written.

### `DIV`: the declaration set and the divergence set are exactly equal

2.6 wrote a **machine-readable** key — `- **Body edit (2.6):**` — naming the operations applied
(`insert-metadata` 99, `drop-cts-marker` 51):

```
declares Body edit: 152   diverged from upstream: 152   both: 152
diverged with NO declaration: 0        declares but does NOT diverge: 0
```

A perfect join. So `DIV` joins on the declaration and reports the **undeclared** count — 0 — instead
of a 152-line wall, which is `COUNTING_RULE.md` §8's own argument applied to my own check.

**This bears on `MRG-4b`, which I have not touched.** It prints `0 declared exception; 152
UNDECLARED`. A general mechanism now exists and joins exactly. My brief's standing block also calls
this failure "**2** declared-in-prose body edits" — it is 152, in a key, not prose. Both halves of
that premise have moved. Standing failure, **not mine to silence**; routed with the measurement.

### Reported, not failed

- `PRV-2 DIVERGENCE` — `corpus_suite.md` §5 rules an eight-key minimum; **0 of 168** merge blocks
  carry any of them. The merge writes a different, uniform eight. The shelf is uniform, §5 is stale.
  Checking §5 as ruled produces 168 failures against complete provenance — the wall that gets a
  checker switched off. Routed to The Engineer; the tool checks the landed set (168/168 OK) and
  prints the divergence every run.
- `PRV-8` — 7 dangling `Source file:` refs, **all in inherited blocks**, all naming PDFs `CHK-13`
  forbids on disk. Unresolvable by construction; failing here would double-count the block ruling.
- `DUP-4` — 1 level-3 group with no primary/secondary call (the two LSIC newsletters). `DUP-4` rules
  level-3 a candidate and **never** a confirmation, so failing the build would be this tool
  overruling the contract. Level-1/level-2 collisions do fail; there are 0.
- `PRV-1b` — now **OK**. 14 files still carry an inherited block, disambiguated by the `(merge)`
  label. The Engineer's remedy was to *label* rather than delete, which is right: the inherited block
  is the transcriber's record, and `SRC` still reads it.

### Self-test: 19 cases, and it proves the tool can go RED

`node tools/verify_corpus.js --selftest` → **PASS (19/19)**. The `--prove` pattern of
`lsei/oracle/lib/literature_search.js`, turned on a checker: that file proves a search, this one
proves a checker, and what a checker must prove is that it **fails**. Every case builds a fixture,
mutates one thing, runs the real check, asserts the verdict. Nothing is stubbed.

- **A. Anti-vacuous (3)** — missing tree, empty tree, KA block: `VACUOUS`, never `OK`.
- **B. Planted defects (11)** — `R_S` violation, `R_F` leaf on the summary shelf, `-<digit>` suffix,
  stopword identity, token-set collision, missing block, duplicate unlabelled block, dropped key,
  out-of-set `Byte source`, dangling `Source:`, uncalled level-1 duplicate. Each turns **the check
  that owns it** red. Plus: a shared **level-3** key reports and does not fail, per `DUP-4`.
- **C. Clean tree (3)** — 0 FAIL, >0 OK, and KA red against a shelf that is not the declared one.

### A defect I found by running my own documented mode

`--tree <staged>` is documented so a gate can run **before** promotion. Against a clean fixture it
returned exit 1 with no `FAIL` above the KA block: **the known-answer test fired against a population
it was never declared for**, failing 10 counts that were never about the staged tree. Two figures at
different digests are not comparable — §2 rule 2 says report that, not reconcile it. Fixed: KA
compares only over canonical `literature/`, else returns `VACUOUS` naming what it did **not**
certify. `IDX` gained the same `--tree` rebase `MRG-4b` already uses. A documented mode never run is
an unrun claim.

Also caught on first contact with real data: `A5` split the leaf **before** stripping `.md`, so every
unhyphenated name (`gdp.md`, `rostami2018.md`) reported a dead identity anchor that is not dead.
`NAMING.md` §3 spells the order out and I had it backwards. **Neither false positive would have
appeared against the empty tree every prior corpus tool was authored against.**

### Close conditions

| Condition | Result |
|---|---|
| exists, runs against the 168-file shelf | ✅ `39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT` |
| exits **non-zero** on a planted defect | ✅ `PLANTED-DEFECT EXIT=1` |
| exits **zero** on a clean tree | ✅ `CLEAN-TREE EXIT=0` |
| VACUOUS reported separately from PASS | ✅ own verdict, own count, own summary line |
| prints its read-digest | ✅ printed **before** any check runs |
| `run_suite.js` loses no passing row | ✅ 18 → **33** pass, same 4 failures |

Exit 1 on the real shelf, because the real shelf is not clean: `PTH/A3` is true. That is the tool
working.

---

## 3. The REG lift — 18 rows, routed mid-wave

`run_suite.js` contained **no `REG-` string at all**: `18 rows 0 pass 0 fail 18 unrun`. 2.15 wrote
the assertions and nobody had ever run them. The Space Resources Engineer executed them outside my
file rather than editing another seat's artifact, and routed them. **Lifted, not re-derived**, one
function per row, his deferral reasons kept verbatim.

```
REG  18 rows  11 pass  0 fail  7 unrun  ok
```

Identical to his run. **His falsifiers are not enough on their own** — his `--mutate` arm exercised
`tools/ecr_verify.js`, not his own functions — so I falsified **my** bindings directly, mutating the
real register and restoring byte-exactly (`md5sum -c` OK both times, `.gitattributes` LF pin intact):

| Falsifier | Fired |
|---|---|
| rename a member leaf | `FAIL REG-7 1 unresolved: … litvak-2024-RENAMED.md`, `FAIL REG-13` |
| delete one M row, keep the header | `FAIL REG-5 header says 15/68, parsed 15/67`, `FAIL REG-13`, `FAIL REG-15` |

**`REG-11` is a genuine RED-to-green and I am not glossing it:** it was red at `c42a217`, which
tracked 0 files under `_intake/`. Both registers now name `af7abec`, which tracks 170 under
`literature/`. **It passes because the corpus landed, not because anything was relaxed.**

**The seven deferrals, and why `DEFER` is a new verdict.** They count as UNRUN — they are not
results — but they print their reason, because *no binding*, *empty population* and *subject not
built until 3.8* are three different facts and collapsing them loses the only one with a named owner
and a date. The summary now decomposes the unrun count:

```
of those 368: 7 DEFERRED (bound, subject not built yet, reason named),
              0 VACUOUS, 361 with no binding at all.
```

`REG-15` defers rather than passes if its generator is absent, because "the generator is missing" is
not evidence that the blocks are generated.

---

## 4. `COUNTING_RULE.md` — the one-liner, landed at both sites

Measured: `node tools/quantities.js --index` → **exit 0, 16994 bytes to stdout, `QUANTITIES.md`
unchanged on disk.** The command the contract gave the reader writes nothing.

§4 part 3 **and §7** both named it. My brief named only §4 part 3; §7 carries the identical dead
command, and fixing one of two leaves the reader who lands on §7 told the wrong half. Both now read
`--index --write` — which `tools/quantities.js` stamps into its generated header (line 724) and names
in its usage block (line 21). **The tool has been contradicting the contract in writing since
Wave 2.** The contract was wrong, not the tool.

---

## 5. 2.19, tool half — both items were already landed. Premise refuted.

**(a) `M15` covers spawn prompts by construction.** `COUNTING_RULE.md` §8 already declares both relay
paths, and `tools/quantities.js` line 958 computes `M15`'s population from the path rule
`/^cr_scratch\/relay\/.*\.md$/` — **not** an enumerated list. Verified by running it: `--lint` reports
`M15` findings against `cr_scratch/relay/spawn/w2-1_engineer.md` and others. `verdict/` does not exist
yet and is covered the moment it does, which is what "by construction" means.

**(b) `tools/manifest.js` exists**, landed in `62555a2`, registered as `CHK-36`. Exercised `--header`
(declares 23, parses 23), `--state`, `--missing` (0, exit 0), `--unlisted`, `--col`, `--json`. It
reports its own read-digest and deliberately validates nothing, because `CHK-27` does.

**(c) The `AM-`/`AMC-` rename is also already done** — The Systems Engineer's W3-3 relay, confirmed by
me: `grep -acE '\bAM-[0-9]\b' tools/check_registers.js` → **0**, and the tool's `--amendments` output
contains **0** old-name hits. All 22 sites converted at 2.19/2.20.

**I wrote none of these this wave.** Reporting them as built would have been the defect the freeze
exists to stop.

---

## Not mine

| # | Finding | Sub-step | Owner |
|---|---|---|---|
| 1 | **`AM-144`'s state cell still reads `owed`** though its TEST clause returns 0 on both halves (re-run and quoted in my relay). I did **not** flip it: `oracle/AMENDMENTS.tsv` is outside my write set and he edited its `H` owed count this session; flipping the row needs `H` 68→67 in the same edit, and two seats editing one self-sizing TSV is how an `H` row desyncs | 2.19 | The Systems Engineer |
| 2 | **`MRG-4b`'s "152 UNDECLARED" is measurably wrong.** `- **Body edit (2.6):**` is machine-readable and joins exactly: 152/152/152, 0 either side. Not silenced, not edited | 2.4 | The Engineer |
| 3 | **`corpus_suite.md` §5's eight-key minimum is carried by 0 of 168 files.** The merge writes a different, uniform eight; `PRV-5`'s closed set of five is unused vocabulary | 2.4 | The Engineer |
| 4 | **3 breaches of `NAMING.md` §8's component budget**, none whitelisted in §10: one 70-char leaf, two folders at 33 and 35 against a 32 ceiling. Composite still closes at 99/108 | 2.3 / §10 | The Engineer |
| 5 | **`CHK-31` is now `live` but its `asserts` cell names three things and the tool implements one.** "Every MANIFEST-declared root present" has no D row to join on; "reachable by the retrieval walk" is 3.7. A `block` row true of a third of its own cell | 2.20 | The Systems Engineer |
| 6 | **`.oracle-state.json` does not exist**, so no divergence can be called NEW or STANDING | 1.5 (ARCH-3) | The Systems Engineer |
| 7 | **`CL-1`..`CL-8` are unimplemented** — `CHK-09` names `tools/checks.js`, absent. The register's closure property is a claim with nothing behind it. He has a working implementation in scratch and offered it; neither of us can land it on a zero-`C`-row allowance | 1.13 | The Systems Engineer |
| 8 | **`QUANTITIES.md` line 1 still reads `--index`** while `quantities.js` now emits `--index --write`. One of the 5 standing `M6` failures. It is generated — the fix is a regeneration run, not an edit | §7 | next `--index --write` run |
| 9 | **`--lit` trap:** `lsei/oracle/answer_question.js` resolves `DEFAULT_LIT` to `lsei/literature/`, 152 files against our 168. The suite row that fails when `--lit` is omitted is **mine at 3.7** and does not exist | 2.18 → 3.7 | me, later |
| 10 | **`REG-15` depends on `cr_scratch/sre_w34_blocks.js`**, a scratch file. It defers if absent rather than passing, but the generator should land somewhere stable or the row degrades silently | 2.16 | The Space Resources Engineer |

---

## Commands, with their read-digests

```
node tools/verify_corpus.js            39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT; exit 1
                                       read-digest af7a719683f8c607 over 170 files
node tools/verify_corpus.js --selftest SELF-TEST: PASS (19/19); exit 0
node oracle/tests/run_suite.js         405 rows: 33 pass, 4 fail, 368 unrun; exit 1
node oracle/tests/run_suite.js --group REG    18 rows: 11 pass, 0 fail, 7 unrun (all DEFERRED)
node tools/check_registers.js          0 FAIL
node tools/quantities.js --check       5 hard failures — unchanged from the wave-open baseline
node tools/quantities.js --index       exit 0, 16994 bytes to stdout, wrote nothing
```

`check_registers.js` and `quantities.js` walk different sets; their digests are not comparable and
each is reported against its own. The `verify_corpus` digest moved three times this session as other
seats wrote; only same-digest figures are compared above.

---

apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0

22 suite rows gained bindings; **none was added**. The 19 self-test cases are `verify_corpus.js`'s own
`--selftest`, not suite rows. `DEFER` is a verdict, not a row.
