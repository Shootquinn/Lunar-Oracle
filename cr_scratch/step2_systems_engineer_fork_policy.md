# Step 2.18. The Systems Engineer: the corpus fork policy

**Also carries the contract half of 2.19 and the `CL-1` reconciliation routed at Wave 2.**
Written 2026-08-28, W3-3. `HEAD = af7abec` at open.

Everything below was measured before it was written. Commands and read-digests are in §6.

---

## 1. Premise check

Four premises in the brief. Two hold, two do not, and the two that do not are the useful ones.

| Premise | Verdict |
|---|---|
| The fork is real, not hypothetical | **Holds.** 144 of 168 shelf files name a byte source under `lsei/`; upstream holds 152. |
| Give `oracle/tests/run_suite.js` and `oracle/verify_corpus.js` a register row so they are governed | **Refuted, in both halves.** `run_suite.js` has had a row since 1.13 — `CHK-18` — and `verify_corpus.js` has had one since 2.20 — `CHK-31`, at `tools/`, not `oracle/`. Neither needed a row. What both needed was a **status flip**, and both were `specified` with the artifact on disk, which is a `CL-2` failure, not a `CL-1` one. |
| A runner under `oracle/` fails `CL-1` on landing | **Refuted, and `CHK-18`'s own cell already said so at 2.20.** `oracle/**/*.js` is a declared scan root and `CHK-18`'s path cell *is* `oracle/tests/run_suite.js`. |
| The `AM-`/`AMC-` rename is 2.19 work still to do | **Refuted.** It was ruled and applied at 2.19 (the `AMENDMENTS.tsv` header) and at 2.20 (`CHK-28`'s cell and all 22 sites in `tools/check_registers.js`). Both of `AM-143`'s defect-token tests return nothing at `af7abec`. What was left was two **state cells** nobody turned over. |

**What was actually red, and nothing in the brief named it:** `CL-1` had exactly one uncovered file,
`tools/githooks/dispatch.js` — the shared dispatch engine, landed at 2.20, the thing that decides
what every trigger runs. 20 tracked files in the two scan roots, 19 with a row. That is the register
failing on the one file whose absence from the register makes the register unenforceable.

---

## 2. The policy

Closed terms, in the style of `oracle/bootstrap_contract.md`. Landed there as **§7.2**, which is the
statement; this section is the argument for it. Contract version bumped 1 → 2.

### 2.1 The subject

`literature/` is a fork of `lsei/literature/`. Both moved on 2026-08-28. The ref layer cannot see
the fork: `oracle/currency_policy.md` §11 already records the measurement — an upstream that deleted
two files and one that added two are both one commit ahead on the same line, and both return
`CURRENCY upstream-ahead`, clean and blind. **The corpus verdict is a second subject with a second
verdict set, computed against content.** This is `E11`'s content half arriving where 1.6 routed it.

### 2.2 The verdicts, six, closed

| Verdict | Condition | Falsifier | Finding |
|---|---|---|---|
| `equal` | Every merged file's upstream source resolves and its content digest equals the merge-time digest its provenance records. | An `equal` over an absent or **empty** `lsei/literature/`. `test -d` passes on empty and every upstream-side comparison is then vacuously clean. `BC-16` is the guard. | no |
| `unmerged` | An upstream file named by no provenance `Source:` cell **and** dispositioned by no merge-plan row. | A file called `unmerged` that a merge-plan row rules out. **Measured today: 8 of 8.** See §2.3. | yes |
| `declined` | An upstream file named by no `Source:` cell but dispositioned by a merge-plan row that does not land it. | A `declined` naming no row. Without the citation, "we decided not to" and "we never looked" are the same shape at the filename layer and opposite facts. | no |
| `diverged` | An upstream file's content digest differs from the merge-time digest its provenance records. | Any `diverged` **or** `equal` computed where no merge-time digest exists. Today that is all 168 files. See §2.4. | yes |
| `withdrawn` | A `Source:` cell naming an upstream path that no longer resolves. | A withdrawal folded into `upstream-ahead`, which is what the ref layer does with it. `E11`'s third verdict. Measured: 0 of 144. | yes |
| `unknown` | `BC-16` failed, or the merge-time digest is absent, or `lsei/` is degraded. | An `unknown` printed as `equal`. They are not the same claim. | gap |

### 2.3 `declined` is the load-bearing addition, and it is forced by measurement

Break 1 of the 0.2 architecture says "a new upstream file is reported as unmerged." Run as written,
that rule is **wrong 8 times out of 8 on landing day.**

Eight upstream files have no counterpart on the shelf. Every one of them is a `DUP-01`…`DUP-08`
secondary, ruled by the author on 2026-08-28 — *"one member is picked and the secondary does not
land"* — and recorded in `cr_scratch/merge_plan.tsv` with `disposition: secondary` and the sentence
"This row is the SECONDARY and it does not land." A filename-set comparison alone would open eight
findings against a decision the author personally made, on the first session after the merge, every
session thereafter. **A verdict set with no way to say "ruled out" reports rulings as defects**, and
a report that is 100% false positives on day one is a report nobody reads on day thirty.

The remedy is not a suppression list. `declined` **must cite the merge-plan row that dispositions
it**, so the difference between a decision and an oversight stays visible instead of being absorbed.

### 2.4 `diverged` is `unknown` today, and the report says so in those words

Break 1 point 1 requires provenance to name an **upstream ref**. `oracle/install_state.md` §8 rule 2
requires the **merge-time digest** to be content, so it cannot be parked in `.oracle-state.json` to
close this faster. Measured over all 168 shelf files: **0 carry an upstream ref field and 0 carry a
merge-time content digest.** The landed block records `Landed`, `Source`, `Byte source`,
`Disposition`, `Dedup key`, field, folder, plan-row revision — a path, not a ref, and no hash.

So the content-layer verdict cannot be computed, and the honest report is `unknown`. A check that
printed `equal` here would be reporting a comparison it did not make. **This is `unrun is not pass`
one layer down**, and the Wave 2 finding is the reason it is written as a verdict rather than left
out of the table.

**`tools/verify_corpus.js`, which landed today, does compare content — and it is exact only until
upstream's next commit.** Its `DIV` section compares each shelf body against the **live** upstream
file and joins the difference against the 2.6 declared body edit: 152 declared, 152 differing, 0
declared-but-identical, 0 differing-but-undeclared. That join closes today for one reason only:
`lsei HEAD = origin/main = 7f97983 =` the last row of `oracle/VERIFIED.tsv`, so *live upstream* and
*upstream as merged* are the same bytes. **The first time the author commits to `lsei`, "differs
from upstream" stops distinguishing our edit from theirs, and the check goes from exact to
conflated with no test turning red.** That is this seat's family in its purest form — the assertion
passes on the machine where it cannot fail — except that here the machine is a DATE rather than a
filesystem or a config key, which is why no clone reproduces it and no test catches it.

**The merge-time ref is recoverable today and will not be recoverable later.** It is one value for
all 144 lsei-derived files: **`7f97983`**, measured this session with `HEAD == origin/main ==` the
sole verified ref. Six weeks from now it is not reconstructible from the tree. Recording it is The
Engineer's — the format is hers by Break 1 point 1 — and it is routed in §7 with the value attached
so the route does not depend on someone re-deriving it.

### 2.5 Report, never resolve

No verdict merges, adopts, reverts, deletes, renames or re-lands anything. A `diverged` pair is a
finding for The Fact-Checker; an `unmerged` file is a finding for The Engineer; neither is an
instruction to a script. This restates `oracle/currency_policy.md` §10 rule 4, which points here.

### 2.6 Where it runs, and why it is two rows

**The bootstrap does not compute this.** `oracle/bootstrap_contract.md` §8 rule 7 — the bootstrap
performs no content check on a corpus file — is not waived; §7.2 is an **instance** of it. The
bootstrap dispatches a committed script and prints what comes back, exactly as `BC-8` wires
pre-commit without asserting anything itself.

Two register rows, one artifact, two consequences, on the `CHK-13`/`CHK-37` and `CHK-14`/`CHK-15`
precedent:

- **`CHK-32`** `tools/corpus_divergence.js` `--gate:` · `substep-gate` · **block**
- **`CHK-40`** `tools/corpus_divergence.js` `--report:` · `session-start` · **report**

A single row would have to pick one consequence. Picking `block` wires a corpus finding to a session
refusal, which is `CHK-14` at 2.14 in the opposite direction — a blocking check on a condition the
operator did not cause and cannot fix, whose predictable outcome is habitual bypass. Picking
`report` leaves the merge gate with nothing that stops it. **Without `CHK-40` the contract would say
the bootstrap reports divergence and no trigger would name the reporter**, which is a mechanism that
exists and is not wired — the defect this seat exists to catch.

### 2.7 The `--lit` requirement (loose end C3)

**Any invocation of prototype tooling in place must pass `--lit` naming our corpus root, and any
suite that invokes it must assert which corpus was used.**

Still live, measured today. `lsei/oracle/answer_question.js` resolves `DEFAULT_LIT` by
`firstExisting([__dirname/../literature, …])`, which from our tree is **`lsei/literature/`: 152
files, not our 168.** Delta 16. Nothing in its output names the corpus it read. Run bare from our
root, the prototype answers from the child corpus while the adult sits one directory up.

**Falsifier:** a run of the prototype tooling from this root whose output names a corpus, or a suite
row that fails when `--lit` is omitted. Neither exists today; the assertion is The Software
Engineer's at 3.7 and it is named in §5, not claimed here.

---

## 3. 2.19, the contract half

### 3.1 What was left, measured

`AM-143` ruled the checks renamed `AMC-1`…`AMC-5` forward-effective 2026-08-28 and declined the
143-site historical sweep. Its two defect-token tests both return nothing at `af7abec`. The
`AMENDMENTS.tsv` header named 26 remaining live sites: 22 in `tools/check_registers.js` (`AM-144`)
and 4 in `oracle/check_register.md` (`AM-145`).

- `tools/check_registers.js`: **0 occurrences.** The rename landed; the tool version string carries
  it. `AM-144`'s state cell still reads `owed`. **That row is The Software Engineer's and this seat
  did not touch it.** Relayed.
- `oracle/check_register.md`: `CHK-28`'s cell reads `AMC-1 to AMC-5` and has since 2.20. Two of the
  four sites survive, at §4 lines 210 and 213.

### 3.2 The ruling on the two survivors, and it is the one the brief asked for

**They stay, unchanged.** `AM-143`'s ground — a silent inversion of an existing citation is a worse
defect than an inelegant name — **applies, and it applies harder here rather than more weakly.**

Those two lines are the R-2 paragraph reporting what the checker printed on 2026-08-27:
"`tools/check_registers.js` exits 1 today: `AM-1` reports one collision." That is a true statement
about a check that was called `AM-1` when it ran. Rewriting it makes a dated report describe a name
that did not exist on its date. The 143 declined sites were protected by being in files 2.19 could
not edit; these two are in a file **this seat may edit**, so the only thing standing between them
and the inversion is the ruling. That is why the ground is stronger here, not weaker.

**`AM-143`'s header overcounted its own live sites by two.** It listed 4 in `check_register.md` when
2 were the specification cell and 2 were dated prose its own dating rule governs the other way. The
correction is recorded in `AM-145`'s discharge text rather than by editing the header count, because
the header is a dated record too and the count it took was of a real reading.

**The live-site test was always the specification cell and the tool output.** Both green:

```
awk -F\t '$1=="A" && $5 ~ /^2\./' oracle/AMENDMENTS.tsv | grep -aE '\bAM-[0-9]\b' | grep -v AMC-   → nothing
node tools/check_registers.js --amendments   | grep -aE '\bAM-[0-9]\b' | grep -v AMC-             → nothing
```

### 3.3 Two discharges, no new row

- **`AM-46`** owed → applied. Remedy was "add `CHK-25` and `CHK-26`, both specified"; both rows are
  present and specified, read back out of the register rather than out of the cell claiming to have
  written them. `CHK-25`'s authority cell has read "AM-46 DISCHARGED at 2.20" since that sub-step
  while the queue read `owed`. **Two registers disagreed about one fact for two waves and nothing
  computed the disagreement:** `AMC-1`…`AMC-5` assert the queue's internal shape and none of them
  joins a state cell against its target file. That gap is the finding, not the edit.
- **`AM-145`** owed → applied. Both defects closed in `CHK-28`'s cell at 2.20 — the rename and the
  understatement by one — verified by reading the cell.

`H` row owed count 70 → 68. `node tools/check_registers.js` → **0 FAIL**.

---

## 4. The `CL-1` reconciliation

Implemented `CL-1` through `CL-9` from `oracle/check_register.md` §4 and ran them over the register,
because `CHK-09` (`tools/checks.js`) does not exist and nothing computes the complement today. The
implementation is a scratchpad script, deliberately not under `tools/`, since a new file there would
be the very thing `CL-1` is red about.

| Was | Now |
|---|---|
| `CL-1` **RED**: `tools/githooks/dispatch.js`, 1 uncovered file of 20 | Green. **`CHK-39`**, kind `library`, `marker: LUNAR_ORACLE_HOOK_DEPTH`, `consumed:CHK-10,CHK-38`, live. |
| `CL-2` **RED**: `CHK-18`, `specified` with `oracle/tests/run_suite.js` on disk | Green. `CHK-18` → `live`. |
| `CL-2` **RED** mid-session: `CHK-31`, `specified` with `tools/verify_corpus.js` landing under me | Green. `CHK-31` → `live`. The 2.20 path ruling held under test — the seat that wrote the artifact wrote the reason into the file header instead of choosing the path again. |
| `CL-3`…`CL-5`, `CL-8`, `CL-9` | Green, re-run after every edit. |
| `CL-6` | **4 standing failures on `CHK-24`**, argued in §4 as RED with owner and close condition 3.7. Not mine, unchanged, not silenced. |

**Why the marker is an environment key and not a phrase.** `CL-6` asserts a library's marker occurs
in the library and in no consumer. `LUNAR_ORACLE_HOOK_DEPTH` is the reentrancy guard's key, which is
exactly the thing a hook must never hold its own copy of: a per-trigger guard bounds `pre-commit`
inside `pre-commit` and leaves `pre-commit → merge-gate → pre-commit` unbounded. A mirrored guard is
not a weaker guard, it is no guard. If the key ever appears in either hook, `CL-6` goes red and it is
right to. `CL-8(b)` is satisfied: `dispatch.js` names `CHK-39` inside itself.

A `specified` row is skipped **by id** by the dispatcher. A landed runner left at `specified` is
therefore a live check that no gate runs while the register reports it as owed — which is why the
status flip is the reconciliation and a new row would have been a second authority on one file.

---

## 5. The fifth member of the family

`.gitattributes` already names three: `E1` (hooks are not cloned), `HK-2` (mode is metadata), CRLF on
the hooks. The orchestrator added a fourth at the Wave 2 close (`literature/**`). **Here is the
fifth, and it was measured twice rather than reasoned about.**

**Measurement 1.** `tools/githooks/dispatch.js` reads the register with `text.split('\n')` and no CR
normalisation, so the ninth and last field of every `C` row carries a trailing `\r`. Materialised
`check_register.md` with CRLF in a sandbox and parsed it exactly as the engine does:

```
rows parsed: 38
status==='specified': 0   status==='live': 0
raw field 9 of CHK-09: "specified\r"
```

Status is obeyed by string equality, so under CRLF the engine skips **nothing**, dispatches every
`specified` row, and `fail()`s on the first missing artifact. Loud — it blocks every commit rather
than passing quietly — and still a total stop of the pre-commit trigger on any clone whose
`core.autocrlf` differs. Loud is the better direction and it is not a defence.

**Measurement 2, not hypothetical at all.** Writing `oracle/AMENDMENTS.tsv` during this sub-step,
git answered: `warning: in the working copy of 'oracle/AMENDMENTS.tsv', LF will be replaced by CRLF
the next time Git touches it`. This repository will convert these files on the next checkout that
touches them, exactly as it did to two corpus files at the Wave 2 close.

Five paths pinned: `oracle/check_register.md`, `AMENDMENTS.tsv`, `MANIFEST.tsv`, `VERIFIED.tsv`,
`REGISTER.*.tsv` — the set a program parses **field-wise**, where a carriage return lands inside a
value and is compared against a closed set. Not `* text=auto`; the narrowness argument at the top of
that file still holds. `tools/check_registers.js` normalises and is immune — verified by running it
against CRLF copies of all five, where `AMC-1`…`AMC-5` and both size declarations passed unchanged —
and it is pinned anyway, because **immunity that lives in one consumer is per-consumer
configuration, which is the same mistake one layer up.** `CHK-26` and `CHK-32` are specified rows
for parsers nobody has written yet.

---

## 6. Measurements

All from a scratchpad script (`se_w33_fork.js`, deliberately not landed under `tools/` — a new
unregistered file there is the defect this sub-step closed), 2026-08-28, after the concurrent
Wave 3 corpus edits landed. Figures at two different digests are not comparable and are not
reconciled here.

```
POPULATION ours=168 files            read-digest 18cbc824db55ccf2
POPULATION upstream=152 files        read-digest e6f95bfcaffc7d26
REFS  lsei HEAD=7f97983  origin/main=7f97983  VERIFIED.tsv lsei=[c8274e6,d7889e1,f788ea2,7f97983]
REFS  merge-time ref recoverable today = true
PROVENANCE upstream-ref field: 0 of 168    merge-time content digest field: 0 of 168
PROVENANCE Source: lsei=144  _intake=24  other=0   distinct lsei paths=144
UPSTREAM-SIDE orphans=8  declined-by-a-merge-plan-row=8  genuinely unmerged=0
LIT-TRAP  DEFAULT_LIT → lsei/literature (152); ours literature/ (168); delta 16
```

Register and gate state after every edit:

```
node tools/check_registers.js            → 0 FAIL   read-digest 32732a1a03ee8ef5 over 266 files, tool 2.19-1
CL-1..CL-9 (scratchpad implementation)   → CL-1..CL-5, CL-8, CL-9 green; CL-6 4 standing on CHK-24
git hook run pre-commit                  → exit 0
git hook run pre-commit, planted .pdf    → exit 1, CHK-13 FINDING [EXTENSION]
node oracle/tests/run_suite.js           → 405 rows, 22 pass, 4 fail, 379 unrun (open: 18 pass; +4, none lost)
node tools/quantities.js --check         → 5 hard failures, read-digest a311a130dfec0fb8 over 466 files.
                                           IDENTICAL AT HEAD in a detached worktree: 5. Not mine; I added
                                           zero [Q- tags, verified by grep over my own diff.
node tools/verify_corpus.js              → 2 hard failures (PTH/A3, PRV-1b), both The Engineer's
```

**The suite gained four passing rows during this sub-step and I did not write them.** Three other
seats edited `literature/`, `oracle/REGISTER.*.tsv` and landed `tools/verify_corpus.js` while this
ran. The 22/4/379 figure is a reading of a moving tree and is comparable only with its digest.

---

## 7. Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| **The provenance block records no upstream ref and no merge-time content digest** — 0 of 168 — so §7.2's `diverged` is `unknown` for the whole shelf. Break 1 point 1 requires the ref; `install_state.md` §8 rule 2 requires the digest to be content. **The value is `7f97983` and it is recoverable today only because `lsei HEAD == origin/main ==` the sole verified ref. It is not reconstructible from the tree once upstream moves.** Record it now. | 2.5 / 2.6, provenance format | **The Engineer** |
| `tools/verify_corpus.js`'s `DIV` section compares shelf bodies against **live** upstream. Exact today for the same reason; conflates our declared 2.6 edit with a future upstream edit the moment `lsei` commits, with no test turning red. Needs the merge-time digest above, not a code change. | 2.17 | **The Engineer**, with the format from 2.5 |
| `tools/verify_corpus.js` implements `withdrawn` and the declaration join but **not the upstream-side direction**: no `unmerged`, no `declined`. §2.2 and §2.3 specify both; `CHK-32`/`CHK-40` are the rows. | 2.17 / 2.18 | mine to build, The Engineer's tool to extend — one artifact, decided by relay |
| `AM-144` state cell reads `owed` and its own test passes at `af7abec`. The tool half of 2.19 is done in the file and open in the queue. | 2.19(b) | **The Software Engineer** |
| The `--lit` assertion — a suite row that fails when the prototype is invoked without `--lit` — does not exist. The trap is live and measured: 152 vs 168. | 3.7 | **The Software Engineer** |
| `CL-6` red on four of `CHK-24`'s consumers; the mirrored upstream tokenizer. Standing, argued, unchanged. | 3.7 | **The Software Engineer** |
| `CHK-09` (`tools/checks.js`) does not exist, so **nothing in this repository computes `CL-1`…`CL-9`.** The one uncovered file this wave was found by a scratchpad implementation, not by a mechanism. A closed list whose complement nobody computes is a complete list. | 1.13, artifact owed | **The Software Engineer** |
| `oracle/AMENDMENTS.tsv` can only hold an amendment whose target is a row in `oracle/MANIFEST.tsv`, and `literature/**` has no manifest row — so the provenance-format finding above has **nowhere in the queue to be recorded** and is carried here in prose instead. This is `AM-129`'s fourth live instance. | 1.14 / `AM-129` | **The Designer** (row author), **The Engineer** (manifest) |
| `ci-linux` still names no operator. `CHK-12` row 10 is complete only on a case-sensitive filesystem. Unchanged from 2.20 and still a real gap. | open | unassigned |

---

```
apparatus: check rows +2/-0 | amendment rows +0/-2 | quantity ids +0/-0 | tests +0/-0
```

Check rows spent on the two files that were actually failing closure, not on the two named in the
brief, which already had rows. Contract clauses: `bootstrap_contract.md` §7.2 and one Phase 5 report
line, required because the policy's own sentence is that the bootstrap runs the check, and a policy
whose mechanism no trigger names is a memorandum.
