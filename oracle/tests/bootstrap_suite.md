# The bootstrap acceptance suite — sub-step 6.1

**Written before the real `CLAUDE.md` existed, and that is the point.** The file at the repository
root when this suite was authored declared itself in its own header a *provisional session-recovery
stub written at seed time*. The real `CLAUDE.md` carries the dependency bootstrap contract and the
first-run opening sequence, and it is written this wave, against this suite. If these assertions are
weak, that prose will be prose that passes nothing.

**61 tests.** Counting rule: rows in the nine tables of §§1–9 whose first cell matches
`^[A-Z]{3}-[0-9]+[a-z]?$`, counted over this file. Per group: BAB 9, BCF 6, BCT 6, BSH 7, BMD 11,
BSR 8, BFR 5, BID 5, BXT 4. `oracle/tests/run_suite.js` parses rows with the same pattern and
computes the group from the id prefix, so header, per-group list, rows and runner agree by
construction rather than by four people counting. The command:

```
awk '/^\| *[A-Z]{3}-[0-9]+[a-z]? *\|/{c++} END{print c}' oracle/tests/bootstrap_suite.md
```

**Authorities this suite binds to, by address.** `oracle/bootstrap_contract.md` §§1–10 (contract
version **3**, which BXT-4 asserts); `oracle/install_state.md` §§3, 4, 6, 9; `oracle/currency_policy.md`
§3; `cr-agents/method/tdd_method.md` in full, principles 1, 4, 6, 7 and 8;
`cr_scratch/step0_systems_engineer_architecture.md` Part 5; and `lsei/oracle/answer_question.js`
L76–95 for the path-resolution pattern, which is `firstExisting(candidates)` — an ordered candidate
list, first hit wins, explicit override by flag — and which BAB-1 and BSH-5 reimplement rather than
call.

---

## 0. How to read this suite

### 0.1 The rule that makes this suite worth writing

**Every mutation renames, removes, truncates, repoints or rewrites something on disk, and then
observes what changed.** No row in this file passes by reading a document and concluding that the
document says the right thing.

That rule is this seat's own finding turned on this seat's own work. The family — E1 (hooks are not
cloned), HK-2 (a hook committed at `100644` is inert on a clone), `.gitattributes` (a hook committed
with CRLF is inert on a clone) — is one shape: **the content is committed, the trigger is metadata,
and the assertion that the mechanism exists passes on the machine where it cannot fail.** A suite
that asserted the degraded modes by reading §5 of the contract would be the same shape a fourth time.
BXT-1 is the sixth member, found by running this suite's own harness.

### 0.2 Mutations are applied to a stage, never to `lsei/` or `cr-agents/`

Those two are read-only working copies of somebody else's repositories, and §5 of the contract
forbids outright the resets, cleans and checkouts a naive harness would use to restore them. **A
suite that broke that rule in order to test it would be its own falsifier.**

The stage is a **real** tree with **real** clones — `git clone --no-hardlinks` from the local working
copies, `origin` repointed at the true upstream, **push deliberately left live** so that BC-6 has
something to disable. Every git-level assertion is answered by git, not by a model of git.

```
node <harness>/w4_6_stage.js  <repo-root> <stage>     # build; rebuilt per case, so no case inherits damage
node <harness>/w4_6_probe.js  --root <stage>          # run the contract's own Sec.4 commands, print the verdict
node <harness>/w4_6_mutate.js <repo-root> <stage-parent> [caseId ...]
```

**The stage root must fit `150 [Q-ROOT-ALLOWANCE]`.** This is not a formality and it cost this suite
its first run: the session scratchpad is **153** characters, and building the stage there failed with
`Filename too long` on `cr-agents`. See BAB-7, which turned that accident into a measurement.

### 0.3 The harness is scratch, and its promotion is owed

`w4_6_stage.js`, `w4_6_probe.js` and `w4_6_mutate.js` were written and run in the authoring session's
scratch directory. `oracle/tests/run_suite.js` is The Software Engineer's file and its `SUITES` array
names two suites, not three. **This suite is therefore not yet wired to the runner**, and saying so
here is the point: a suite whose runner cannot see it is `UNRUN`, and `UNRUN IS NOT PASS`. Two things
are owed and both are routed, not assumed:

1. `oracle/tests/bootstrap_suite.md` added to `SUITES` in `oracle/tests/run_suite.js`.
2. The three harness files promoted to `oracle/tests/`, under whatever names their owner chooses.

Until then every `green` in the Status column is **a measured result from the authoring session with
its command and its observation printed in the row**, and not a claim about what a future run will do.
The distinction is the corpus suite's and it is kept here.

### 0.4 The status vocabulary

`green` = the mutation was applied in the authoring session, the observation was made, and the
observation is the one the contract requires. `RED` = the mutation was applied and the observation
**contradicts** the contract or reveals that no mechanism produces the required observation; a RED row
names its owner and its close condition and is never quietly relaxed. `H` = a human gate, listed
because it is part of the contract and marked so nobody counts it as mechanized.

**Every RED in this file is a defect found by running the suite, not a test waiting on somebody
else's build.** There are nine.

### 0.5 Read-digest and conditions for every measurement below

```
HEAD                     99d3601
literature/**/*.md       169 files
cr-agents                f0c976b     lsei    7f97983
oracle/VERIFIED.tsv      # rows=5, five columns, three lsei rows
node v26.4.0   git 2.55.0.windows.1   core.filemode=false   core.autocrlf=true
repository root          55 characters
stage root               C:\Users\...\Temp\lo6\stage, 46 characters
network                  reachable; `git ls-remote` against both upstreams exits 0
measured                 2026-08-28
```

### 0.6 Two premises in the authoring brief, corrected before use

**"There are five blocking modes, not six" is a conflation, and it is on the record twice.** The
correction that was actually made is that there are **five degraded modes**, down from six:
`missing-recoverable` was demoted to a Phase 3 transient at gate item C-1 because no execution path
could assign it. The blocking subset was **three** before that correction and is three after it —
`offline`, `present-but-wrong`, `partially-acquired`. `Q-DEGRADED-MODES` is 5, `Q-BLOCKING-MODES` is
3, and `Q-BLOCKING-MODES`'s own `superseded` cell records that its value never changed and its
*predicate* did. The phrase travelled from `lunar-oracle-gameplan.md` L674, whose `E15` cell reads
"five blocking modes, not six", into the brief. **BMD-10 and BMD-11 assert the two figures
separately so that the conflation cannot survive in this file.**

**The corpus is 169 summaries, not 168.** The 2.12 audit measured 168 at `af7abec`; the shelf holds
169 at `99d3601`. Every figure below is at 169 and says so.

### 0.7 Six of the nine RED rows were repaired in the contract in this same sub-step, and they stay RED

`oracle/bootstrap_contract.md` went from version **2** to version **3** on seven repairs. Six of the
seven are RED rows below: `BAB-6` (BC-5's report line), `BCF-5` (BC-8's non-repository branch),
`BCF-6` (`core.longpaths` moved onto Phase 3's clone), `BCT-6` (Phase 4 group 3 gated on presence),
`BMD-5` (**BC-21** added, asserting the `origin` fetch URL), and `BSH-2` (the outcome line carries the
origin set when it is not the full four). The seventh is BC-10's missing `--prune`, which was The
Writer's finding rather than this suite's.

**They stay RED, and the reason is the rule this whole file is built on.** A repair in a contract is
a repair in a document. Every one of the six was found by applying a mutation and observing what
happened; **not one of them has been re-measured against the repaired contract**, because the harness
implements version 2. A row whose defect has been written out of a specification and not re-observed
in a run is exactly the assertion that passes on the machine where it cannot fail — and turning six
of them green on the strength of an edit would be this suite committing the defect it was written to
catch, in its own first sub-step.

**Their close condition is therefore uniform and is stated once here:** re-run the named mutation
against a harness built to contract version 3, observe the required verdict, and turn the row green
in the sub-step that ran it. `BSR-8` and `BXT-2` are the two RED rows that a contract bump does not
touch, because both name files outside this sub-step's write set.

---

## 1. BAB — Phase 1, Phase 2, Phase 3, and the terminal-outcome vocabulary

Nine tests. The three `ABORT` paths, the two that look like `ABORT` and are not, and the budget.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BAB-1 | Phase 1 resolves the root by searching upward, and a session in a subdirectory bootstraps the tree, not the subdirectory | Started with cwd `<stage>/literature/isru-processing`, Phase 1 returns `<stage>`. Measured: `outcome=CLEAN`, root `<stage>`, `modeSet=[]`, both copies `equal`. This is `answer_question.js` L76–95's `firstExisting` pattern inverted — an ordered walk outward, first hit wins — and it is reimplemented here rather than imported, because the prototype resolves *files* against a fixed candidate list and Phase 1 resolves a *root* against an unbounded ancestor chain | Anchor the search at cwd instead of walking up; the run then bootstraps `isru-processing/` and reports a repository with no working copies and no shelves | green |
| BAB-2 | A session opened outside any repository aborts rather than bootstrapping the nearest tree it can find | cwd `<parent>/outside`, which holds no `lunar-oracle-gameplan.md` at any ancestor. Measured: `outcome=ABORT`, `abort="ABORT (Phase 1, BC-1)"`, report line `repository root not found`, and the failed assertion names the directory searched from | Let the walk terminate on the first directory containing a `.git`; a session in a sibling checkout then bootstraps that sibling | green |
| BAB-3 | An `ABORT` names its cause in the closed form `ABORT (<phase>, <assertion-id>)` | Three abort paths were produced by construction and each printed the form: `ABORT (Phase 1, BC-1)` (BAB-2), `ABORT (Phase 2, BC-2)` (BAB-4), `ABORT (Phase 3, BC-5)` (BAB-5), `ABORT (Phase 5, ST-3)` (BSR-4). Four of four | Emit a bare `ABORT`; the report then states that the session stopped and not where, and §2's own remedy — a definition the outcome can keep — is lost | green |
| BAB-4 | `git` absent ends Phase 2, and it is the only preflight fact that does | Run with `git` scrubbed from `PATH` (`env PATH="/c/Windows/System32:/c/Program Files/nodejs"`). Measured: `outcome=ABORT`, `abort="ABORT (Phase 2, BC-2)"`, `modeSet=[]`, no copy touched. BC-3, BC-4 and BC-5 each recorded a fact and none ended the phase | Make BC-3 or BC-4 abort; an install behind a proxy then cannot run offline, which §6 exists to permit | green |
| BAB-5 | A root over the allowance **with a copy missing** aborts in Phase 3 and does not warn-and-continue | Stage root padded to **153** characters, both copies removed. Measured: `outcome=ABORT`, `abort="ABORT (Phase 3, BC-5)"`, report line `root 153 chars exceeds allowance 150; cr-agents, lsei missing and not cloned`, and **no clone was attempted** | Downgrade to a warning; the checkout is then half written before anybody reads it | green |
| BAB-6 | A root over the allowance **with both copies present** does not abort, and the over-allowance root reaches the report | Root at **153** characters, both copies cloned in place. Measured: `outcome=CLEAN`, no abort, `modeSet=[]` — correct, per Phase 3's "the gate fires only on the acquire path". **But `lines=[]`.** BC-5's `On failure` cell reads `Record; gates Phase 3` and says nothing about emitting anything; the report line for this case is named only in Phase 5's ordered list, item 8. Two documents, one obligation, and the assertion table does not carry it | Owner: **The Systems Engineer**. Close condition: BC-5's `On failure` cell names the Phase 5 report line, or Phase 5 item 8 names BC-5 as its source | RED |
| BAB-7 | `150 [Q-ROOT-ALLOWANCE]` is the observed ceiling and not only a remainder | Bisected by cloning `cr-agents` — the deeper of the two copies — into roots of increasing length. **150 → exit 0. 151 → exit 128, `Filename too long`, `fatal: unable to checkout working tree`.** 152, 153 and 156 also exit 128. The quantity block's `sampled:` cell reads *"No observed root was ever evidence for it"*; that sentence is now false and the block is this seat's to correct | Move the constant to 160 and re-run the bisect; the clone fails inside the allowance, which BC-5's own falsifier cell says falsifies the budget | green |
| BAB-8 | Phase 3 clones to the repository root and never populates a `deps/` tree | Planted `<stage>/deps/lsei/STALE`, removed `<stage>/lsei`, ran with the network live. Measured: `lsei` cloned to the root and is a git repository; `deps/lsei` still holds exactly `["STALE"]` and nothing else; `outcome=CLEAN` | Resolve the clone target through a candidate list that includes `deps/`; the stale tree is then adopted and the fresh clone lands where nothing reads it | green |
| BAB-9 | The terminal outcome is exactly one of `ABORT`, `DEGRADED`, `CLEAN`, and `ABORT` is not a mode | Across all 24 mutation cases, every run printed exactly one outcome from the closed set. The four `ABORT` runs printed a mode set as well — empty for BAB-2/4/5, and for BSR-4 the set computed at Phase 4 before Phase 5 refused — which is §2's own correction to itself: `ABORT` states where the bootstrap stopped and nothing about what it had already done | Assert that an `ABORT` run cloned nothing and assigned no modes; that test fails against a correct implementation of Phase 5, which is the defect §2 records as `AM-01`/`AM-16` | green |

---

## 2. BCF — Phase 4 group 1, configuration

Six tests. This group exists because of loose end E7: the push-disable and the fetch sat inside the
acquire branch, so **a working copy present with push still enabled was never reached.**

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BCF-1 | BC-6 disables push on a copy that starts the session with push live | The stage builder leaves push live on purpose. Measured before: `origin  https://github.com/Shootquinn/lsei-lunar-scenario-explorer.git (push)`. After one run: `origin  DISABLED (push)`. **This is the whole of E7**, and it is asserted against the state every install that predates the fix is in | Move the `set-url --push` back inside the acquire branch; the before/after strings then match and the assertion still reads green on a fresh clone | green |
| BCF-2 | BC-6 is idempotent and asserts rather than assumes | Second run in immediate succession: push URL still `DISABLED (push)`, no report line added, mode set unchanged and empty | Guard the write on a stored "already disabled" flag; §8 rule 5 of `install_state.md` — never cache an assertion's result — is then broken, and the install that already exists is the one the cache never reaches | green |
| BCF-3 | BC-9 unsets `core.hooksPath` on a working copy and reports having done so | Set `core.hooksPath=../../tools/githooks` on `<stage>/lsei`. Measured: before `../../tools/githooks`, after `(unset)`, report line `lsei: core.hooksPath was set and has been unset`. Wiring our scripts into somebody else's repository is an action on their repository, which is the class BC-6 exists to prevent | Unset without reporting; the next person to wonder why their hook stopped firing has nothing to read | green |
| BCF-4 | BC-8: `core.hooksPath` points at the committed hook directory **and that directory holds executable hooks** | Against the repository, not the stage: `git config --get core.hooksPath` → `tools/githooks`; `git ls-files -s tools/githooks/` → four entries, `dispatch.js`, `merge-gate`, `post-commit`, `pre-commit`, and the mode column is what decides it. This is E1 plus HK-2 plus the `.gitattributes` layer, and all three are closed at 2.14 and 2.20 | `git update-index --chmod=-x tools/githooks/pre-commit`; the hooks then run in this working tree, where `core.filemode` is `false`, and are inert on a Linux clone with every assertion *about* the wiring still green | green |
| BCF-5 | BC-8 has a failure branch for a repository root that is not a git repository at all | **It does not.** Measured on the stage, which is a real tree with a real `lunar-oracle-gameplan.md` and no `.git`: `git -C <stage> config --get core.hooksPath` returns empty and exits 1, `git -C <stage> ls-files` exits 128 with `fatal: not a git repository`. BC-8's row has one failure behaviour — *"the check register's mechanisms are unwired until it takes"* — and it describes a repository whose config is wrong, not a tree that was downloaded as a zip. Left as written, the failure reads as a configuration problem when it is an install problem | Owner: **The Systems Engineer**. Close condition: BC-8's row distinguishes *not a git repository* from *hooksPath unset* and Phase 4 emits the first as its own report line | RED |
| BCF-6 | BC-7's `core.longpaths` is set where it can act on the operation that needs it | **It is set one phase too late.** BC-7 is Phase 4 group 1; the clone is Phase 3. Measured: `git clone` into a 153-character root exits **128**; `git -c core.longpaths=true clone` into the same root exits **0**, and into 156 as well. The setting that raises git's path ceiling is written *after* the acquisition it would have protected, so on the one path where it decides an outcome it does not exist yet. Same family as E1 read from the other end — the mechanism is present and the trigger is not wired to it. BC-5 stays regardless: `core.longpaths` governs git's own file operations and not Node's `fs`, the shell, or any other tool in this project's chain, so it raises one wall of several | Owner: **The Systems Engineer**. Close condition: Phase 3's clone invocation carries `-c core.longpaths=true`, and BC-7's row says that BC-5 and BC-7 measure the same wall from opposite sides | RED |

---

## 3. BCT — Phase 4 group 3, content markers

Six tests. **Every assertion in this group asserts a marker inside a file and none asserts that a file
exists**, because a path check passes against an empty file, a truncated download and an error page.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BCT-1 | BC-12: the method guide is present **and is the guide** | Renamed the `### A.12 Standing Roster` heading in `<stage>/cr-agents/method/operational_guide.md` and changed nothing else. Measured: BC-12 red, `cr-agents` carries `present-but-wrong`, `modeSet=["dirty-or-diverged","partially-acquired","present-but-wrong"]`, `phase7.plays=false`. The file is still 100% present and still parses | Swap the marker for `test -f`; the file passes with the roster gone and the session proceeds as though the method were loaded | green |
| BCT-2 | BC-13: `prompt0.md` is present **and non-empty** | Truncated `<stage>/cr-agents/prompt0.md` to zero bytes. Measured: BC-13 red, `present-but-wrong` on `cr-agents`, `phase7.plays=false` | Use `test -f`; a zero-byte file then satisfies the assertion, which is the truncated-download case exactly | green |
| BCT-3 | BC-14: the app is present **and is the app**, and the answering layer agrees | Wrote a valid `<!doctype html>` page with no `KNOB_DATA` over `<stage>/lsei/index.html`. Measured at bootstrap: BC-14 red, `present-but-wrong` on `lsei`, origin `app` unavailable, `refused_verdicts=["APP","FIGURE","BOTH"]`. Measured at answer time against the same file: exit **1**, `ERROR: oracle/app_model: island DATA-ISLAND not found or malformed ... refusing rather than returning a partial model`. Two layers, one condition, and neither returns a number | Use `test -f`; the hollow page satisfies it, the mode set is empty, §2 gives `CLEAN`, and the first `APP` question arrives against a model that is not there | green |
| BCT-4 | BC-16: an **empty** `lsei/literature/` gives corpus `unknown` and never `equal` | Emptied `<stage>/lsei/literature/` and left the directory. Measured: corpus verdict `unknown`, report line `lsei/literature absent or empty: corpus verdict unknown, never equal`. This is BC-16's named fear — `test -d` passes on an empty directory, against which every upstream-side comparison is vacuously clean — and it is closed by construction rather than by a promise | Report the verdict from the directory's existence; the fork then reads `equal` over a comparison nobody made | green |
| BCT-5 | BC-16: an **absent** `lsei/literature/` gives corpus `unknown`, and absent is distinguished from empty | Removed the directory. Measured: BC-16 red, same verdict `unknown`, same report line. Two conditions, one verdict, and the report distinguishes them in its assertion log while refusing to distinguish them in the verdict — which is right, because `unknown` is a claim about what was measured | Collapse `unknown` into `equal` for the absent case on the reasoning that there is nothing to differ from | green |
| BCT-6 | A content assertion is **not evaluated against an absent copy** | **It is, and the consequence is a mode that must not be assigned.** Measured on BAB-style mutation M1: `lsei/` removed and its upstream unreachable. `grep -q 'KNOB_DATA' <stage>/lsei/index.html` fails on a file that is not there, BC-14 goes red, and §5's `present-but-wrong` clause *"or a content assertion for that copy failed"* fires. Observed mode set: `["offline","partially-acquired","present-but-wrong"]` — **three modes for one condition, and one of them is wrong.** §5 "What no mode does" attaches to `present-but-wrong` the rule *never clone over it and never delete it — something put it there on purpose*, and the run has just attached that rule to a directory that is not there and must be cloned. The gate answer is unaffected because blocking is by intersection, so this is invisible to any test that only reads the gate. The corpus suite already carries the general form: `VACUOUS IS NOT PASS`. This is its mirror — **vacuous is not fail** | Owner: **The Systems Engineer**. Close condition: Phase 4 group 3 is gated on the copy being present; an absent copy is carried by `offline` alone, and §5's `present-but-wrong` clause reads *"a content assertion for that copy was evaluated and failed"* | RED |

---

## 4. BSH — Phase 4 group 4, the shelves, the origins, and the refusal rule

Seven tests.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BSH-1 | BC-17: a `literature/` holding no conforming files makes origin `literature` unavailable | Emptied `<stage>/literature/` and left a single `README.md`. Measured: BC-17 red at `0 conforming summaries`, `origins=["app","none"]`. Baseline for comparison: `169 conforming summaries`, `origins=["app","literature","none"]` | Count files instead of conforming files; the `README.md` then satisfies a non-empty test over a shelf holding no corpus | green |
| BSH-2 | An install whose corpus is unreachable does not report `CLEAN` | **It does.** Same mutation as BSH-1. Measured: `outcome=CLEAN`, `modeSet=[]`, and origin `literature` unavailable in the same breath. §2 defines `CLEAN` as *the mode set is empty*, and §6 already recorded the identical defect for Node — *"`CLEAN` is defined to mean the mode set is empty and it was being read to mean the install works; where those come apart, an origin is unavailable"* — and fixed it by making BC-4 a condition of origin `app`. **The fix was not generalised.** `literature` unavailable produces the same come-apart and no mode, so a session reports `CLEAN` and refuses `LITERATURE` and `CONTESTED`. This is `AM-04` reached from the second of its two directions | Owner: **The Systems Engineer**. Close condition: either the outcome line carries the available-origin set when it is not the full four, or §2's `CLEAN` row says in its own words that it is a claim about modes and never about capability | RED |
| BSH-3 | BC-18 distinguishes an absent findings shelf from an empty one | Measured with no `findings/` at all: `{present: false, conforming: 0}`, origin `findings` unavailable, **no mode**. The shelf is permitted to be absent before the merge lands; absent is expected today and empty after the merge is a defect, and the two are reported apart | Report both as "unavailable" with no shelf-present field; the defect and the expected state then look identical | green |
| BSH-4 | BC-19 records whether source PDFs are in this install, as a fact and not a failure | Measured: `literature/_pdf` does not exist, `pdfs_present=false`, no mode, no failure. The asymmetry `install_state.md` §5 states is the reason the field exists — wrongly `true` is loud, wrongly `false` is silent and worse — and **sub-step 2.11's PDF pull has not run**, so `false` is the true value today and not a defect | Probe the filesystem in the answering loop instead; a second definition of install shape then exists, which is what this field is for | green |
| BSH-5 | Origin `app` requires BC-14 **and** BC-4, and the set is computed rather than stored | Baseline: BC-14 green, BC-4 green, `app` available. BCT-3's hollow page: BC-14 red, `app` unavailable. BAB-4: BC-4 red at Phase 2 and the run aborts before origins are computed at all. The set was recomputed on every one of the 24 runs and appears in no written record | Store the set in `.oracle-state.json`; §8 rule 1 of `install_state.md` forbids it, and a stored availability is a copy of the filesystem that drifts | green |
| BSH-6 | The refusal rule fires at bootstrap time: `APP`, `FIGURE` and `BOTH` are refused with `input-missing` when `lsei/` is absent | Removed `<stage>/lsei` with the upstream unreachable. Measured: `origins=["literature","none"]`, `refused_verdicts=["APP","FIGURE","BOTH"]`, `LITERATURE` still available. Then the same condition at answer time, on the same tree: the question *"What is the water output for Agency Led Baseline in 2040?"* returned verdict `APP`, outcome `ANSWERED`, `water = 13.358` with the app in place; **the file was renamed away and the identical invocation exited 1** with `ERROR: ENOENT`. The bootstrap's contribution is that the refusal arrives before the question, not after it | Let a missing app fall through to a literature search; an answer sourced from a summary that happens to carry a number then looks exactly like an answer computed from the app | green |
| BSH-7 | No `LITERATURE` verdict carries a numeral traced to the app | A person reads the trace lines of a session's answers and confirms that every numeral in a `LITERATURE` verdict resolves to a summary and none to `model:`. Not mechanized here and marked so nobody counts it as mechanized; §6's own falsifier names this and no instrument in this repository decides it today | Not applicable — a human gate has no mutation. Its owner is the answer contract's | H |

---

## 5. BMD — the five degraded modes, by construction

Eleven tests. **This is the group the sub-step exists for.** §5 is an enumerated list rather than a
phrase such as "fully succeeded" *so that it can be asserted by construction*, and this group is the
construction.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BMD-1 | `offline` is assignable: a copy absent that could not be fetched | Removed `<stage>/lsei`, ran with `--upstream-lsei https://127.0.0.1:1/nope.git`. Measured: clone attempted and failed, report line carries **git's own message verbatim** — `fatal: unable to access 'https://127.0.0.1:1/nope.git/': Failed to connect to 127.0.0.1:1 after 2113 ms: Could not connect to server` — mode `offline` on `lsei`, `outcome=DEGRADED`, `phase7.plays=false`, `blocked_by` includes `offline` | Paraphrase git's message; the user then debugs a summary of an error instead of the error | green |
| BMD-2 | `partially-acquired` is assignable, and it is per-install rather than per-copy | Removed `<stage>/cr-agents` with its upstream unreachable, left `lsei` intact. Measured: `modes={"cr-agents":["offline","present-but-wrong"],"__install":["partially-acquired"]}`, exactly one copy usable, `phase7.plays=false`. Note that origin `app` stayed available and `refused_verdicts=[]` — the method is gone and the model is not, and the report says which | Make `partially-acquired` per-copy; it then fires twice or not at all and stops meaning "exactly one" | green |
| BMD-3 | `partially-acquired` does **not** fire when *zero* copies are usable | Removed both copies with both upstreams unreachable. Measured: `modeSet=["offline","present-but-wrong"]` — `partially-acquired` correctly absent, because the row says *exactly one* usable. Blocking is unaffected: `offline` blocks. **The report for a totally failed install therefore says less than the report for a half-failed one**, which is a report defect and not a gate defect, and it is noted here rather than fixed by widening a mode | Redefine the row as "at most one usable"; the mode then fires on a total failure and the word `partially` becomes false | green |
| BMD-4 | `present-but-wrong` is assignable by "the directory exists and is not a git repository" | Removed `<stage>/lsei/.git` and left the working tree. Measured: BC-6 red at `not a git repository`, mode `present-but-wrong` on `lsei`, `partially-acquired` in force, `phase7.plays=false`, and the three refs all `null` with drift verdict `unknown` | Detect it by the absence of the directory instead; a tree somebody unpacked by hand then reads as offline and is cloned over, which §5 forbids | green |
| BMD-5 | `present-but-wrong` is assignable by "its `origin` points somewhere other than the expected upstream" | **No assertion produces it.** Repointed `<stage>/lsei` at `https://example.invalid/someone-elses.git` and changed nothing else. Measured: **`outcome=CLEAN`, `modeSet=[]`, `phase7.plays=true`, origins `["app","literature","none"]`.** The only symptom was `BC-10/lsei: fetch origin` failing, which the contract downgrades to the report line `currency unknown` and explicitly says is **not** a mode. Reading §4 row by row: BC-6 writes the push URL and reads back `DISABLED (push)`; BC-9 reads `core.hooksPath`; **nothing compares the fetch URL to the expected upstream.** §5 gives `present-but-wrong` three disjuncts and one of them has no instrument, which is the `Q-DEGRADED-MODES` lesson repeating one level down — a closed set with a *clause* no execution path can produce. Until it is closed, this suite cannot claim to assert `present-but-wrong` across its stated conditions, which is this sub-step's close condition | Owner: **The Systems Engineer**. Close condition: a new `BC-21` asserts `git -C <copy> remote get-url origin` equals the expected upstream, failing to mode `present-but-wrong`, and this row goes green on the same mutation | RED |
| BMD-6 | `moved-on` is assignable and does **not** block | Detached `<stage>/lsei` onto `HEAD~1`, so local `HEAD` differs from the verified-against ref. Measured: `modeSet=["dirty-or-diverged","moved-on"]`, `phase7.mode_set_permits=true`, **`phase7.plays=true`**. A system that works and is a week stale still works | Move `moved-on` into the blocking set; the author, who is a week ahead of `VERIFIED.tsv` most days, then never sees the introduction | green |
| BMD-7 | `dirty-or-diverged` is assignable by uncommitted modification and does **not** block | Appended one comment line to `<stage>/lsei/index.html`. Measured: `modeSet=["dirty-or-diverged"]`, `outcome=DEGRADED`, `phase7.plays=true`, `git status --porcelain` → `M index.html`. This is the `usable` ruling asserted: `moved-on` and `dirty-or-diverged` are usable, so `partially-acquired` does not fire, and the sequence plays. It was ruled because the word occurred once in the contract and was defined nowhere while the two readings gave opposite answers on the normal case here | Define `usable` as "in no mode"; the author editing `lsei/` in another window then blocks his own first-run sequence, which is the reading `AM-02`/`AM-17` rejected | green |
| BMD-8 | `dirty-or-diverged` is assignable by holding commits `origin/main` does not | Committed one line to `<stage>/lsei` on `main`. Measured: `modeSet=["dirty-or-diverged","moved-on"]`, `phase7.plays=true`, local `HEAD` `e9afe78` against `origin/main` `7f97983`. Both disjuncts of the row produce the mode and the row does not need to choose | Compute the mode from `status --porcelain` alone; a clean tree one commit ahead then reports nothing | green |
| BMD-9 | **Nothing resets, cleans or checks out across a dirty tree** | Dirtied `<stage>/lsei/index.html` and ran the full bootstrap over it. Measured: file size `894182` before, `894182` after, `git status --porcelain` still `M index.html`, still dirty. Asserted on bytes and on git's own answer, not on the absence of a `reset` call in a script | Add a `git checkout -- .` to the `dirty-or-diverged` branch as a convenience; the author's uncommitted work in his own repository is then destroyed by a project that merely borrows it | green |
| BMD-10 | The mode set has exactly **five** members and there is no sixth | Across 24 mutation cases the union of every mode assigned is `{offline, moved-on, dirty-or-diverged, present-but-wrong, partially-acquired}` — five, matching `Q-DEGRADED-MODES`. `missing-recoverable` was never produced, because Phase 3 resolves a missing copy to acquisition, to `offline`, or to an abort before Phase 4 assigns the set. That is `E15` and the demotion is confirmed by construction rather than by reading the table | Restore `missing-recoverable`; a closed set then holds a member the mechanism that computes the set cannot produce, which is what `AM-19` removed | green |
| BMD-11 | The blocking subset is exactly **three**, and blocking is by set intersection | Partitioned by observation, not by reading the column. Blocking, `phase7.plays=false`: `offline` (BMD-1), `present-but-wrong` (BMD-4, BCT-1, BCT-2, BCT-3), `partially-acquired` (BMD-2). Non-blocking, `phase7.plays=true`: `moved-on` (BMD-6), `dirty-or-diverged` (BMD-7, BMD-8). **Three of five block, two do not** — `Q-BLOCKING-MODES` is 3 and `Q-DEGRADED-MODES` is 5. The brief's "five blocking modes, not six" is the two figures collapsed into one, and §0.6 traces where it came from | Test the set for equality with a blocking mode rather than intersection; a set holding both `dirty-or-diverged` and `offline` then passes the gate | green |

---

## 6. BSR — Phase 5, the install state record

Eight tests. Thirteen fixtures, each written to disk as bytes and read by the same reader, because
the discrimination this group exists for is between two files that differ in one integer.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BSR-1 | Absent is a first install, and the record is not created at read time | No `.oracle-state.json` on the stage. Measured on every baseline run: `state.read="absent"`, `phase7.plays=true`, and **the file still did not exist afterwards** — Phase 5 creates it when it writes, and this probe does not write | Create the file during the read; the run then reports `first install` about a record it just made | green |
| BSR-2 | Both published valid instances read as ordinary, including the one that exercises nullability | `valid-1` (both copies populated, `corpus` populated) and `valid-2-nullable` (`copies.cr-agents: null`, `corpus: null`, `first_run` in its interrupted state) both returned `read=ok`. The second is the fixture `AM-38` added: a walk over the one instance that exercises no nullability cannot discover a rule that only misfires under nullability, and rule 4's qualifier is what that instance exists to hold in place | Drop rule 4's *"given the nullability of its parent"* qualifier; `valid-2-nullable` is then classified corrupt and **rewritten**, which is the S1 destructive path reached from the other direction | green |
| BSR-3 | All seven enumerated corrupt instances are rejected, each by the rule §6.3 names | Seven for seven, with the failing rule reported: truncated → rule 1; empty → rule 1; `null` → rule 2; `[]` → rule 2; `{}` → rule 3; `{"schema":"1"}` → rule 3; valid-plus-`hooks_installed` → rule 5, key named. **All seven wrote zero bytes** | Use a bare `typeof v === "object"` check; `null` and `[]` are then both admitted, which is why §4a rule 2 spells out all three conjuncts | green |
| BSR-4 | A future schema version is refused, writes nothing, and aborts | `F1` (schema 2, same path set) and `F2` (schema 2 plus `hooks_installed`) both returned `read=refuse`, `outcome=ABORT`, `abort="ABORT (Phase 5, ST-3)"`, `phase7=null`, `bytes_unchanged=true`. Phases 6 and 7 did not run. **Zero bytes on both** | Overwrite instead of refusing; the one field in the record that cannot be re-observed is the field a newer Oracle is most likely to have set | green |
| BSR-5 | `corrupt-7` and `F2` are byte-for-byte identical except for `schema`, and are classified opposite ways | The two fixtures were constructed from one string. `corrupt-7-unknown-key` → `corrupt`, rule 5 at `hooks_installed`, rewritten. `F2-future-extra-key` → `refuse`, `ABORT (Phase 5, ST-3)`, zero bytes. **The discriminator is `schema` and nothing else**, which is only true because §6.1 step 3 runs before step 5. Asserted as a pair in one case, not as two cases, because a validator that returns the same verdict for both is the S1 defect and two separate green rows would not see it | Exchange §6.1 steps 3 and 5; `F2` then fails rule 5, is classified corrupt, and is **rewritten** — and every realistic future version takes that path, since a schema bump *is* a change to the path set | green |
| BSR-6 | Rule 6 rejects a malformed timestamp | `written_at` set to `2026-08-27 09:14:03`, a space for the `T` and no `Z`. Measured: `corrupt`, rule 6 at `written_at`, zero bytes. A fourteenth fixture beyond §6.3's seven, added because rules 4 and 5 had fixtures and rule 6 had none | Loosen the pattern to a `Date.parse`; a locale string then validates and the record stops being comparable across installs | green |
| BSR-7 | The record holds `19 [Q-STATE-KEYS]` paths and no others, and rule 5 is the single-writer detector | Walked the parsed object of both valid fixtures and compared the path set against the declared nineteen: equal for `valid-1`; for `valid-2-nullable` the six leaves under the two null parents are absent and the remaining thirteen are present, which rule 4's qualifier permits and rule 5 does not forbid. An unknown key at a known schema version is reported in those words as evidence that a second writer exists | Read rule 5 as the required set rather than the permitted set; that is exactly the confusion `AM-38` names, where two rules read the same nineteen with two meanings | green |
| BSR-8 | The tracked ref record has one shape | **It has two published shapes and they disagree.** `oracle/install_state.md` §9 prints `# copies=2`, three columns `copy ref bumped_at`, one row per working copy — two rows. `oracle/currency_policy.md` §3 and the file on disk carry `# rows=5`, **five** columns `copy ref bumped_at direction note`, and **five rows of which three are `lsei`**. BC-11 says *"read the verified-against ref from the tracked record"* and does not say which of three `lsei` rows that is; this probe took the last, which is a choice the contract does not make. `CHK-26` checks the five-column form, so the instrument follows the currency policy and the state record's §9 is the stale one | Owner: **The Systems Engineer**, at `oracle/install_state.md` §9, which is outside this wave's write set and is therefore routed rather than edited. Close condition: §9's printed example matches `oracle/currency_policy.md` §3, and BC-11 names the rule that selects one row per copy | RED |

---

## 7. BFR — Phase 7, the gate

Five tests. **The gate and the content are separable, and BFR-4 is the demonstration.** The mechanism
is specified at `oracle/first_run.md`; the content is The Writer's.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BFR-1 | Both gate conditions satisfied: the sequence plays | Flag `{attempted_at: null, completed: false}`, mode set empty. Measured: `phase7 = {flag_unset: true, mode_set_permits: true, plays: true, blocked_by: []}` | Gate on the flag alone; a first install whose model is missing then gets a whimsical introduction to a system about to refuse every quantitative question | green |
| BFR-2 | The flag alone closes the gate | Fixture `completed-true`: `first_run.completed` set to `true`, mode set empty, everything else identical. Measured: `phase7.plays=false` while `outcome=CLEAN` and every other field unchanged. **Only Phase 7 is gated**, and the whole bootstrap ran: both copies verified, both refs read, the mode set computed | Gate the whole bootstrap on the flag, reasoning that setup is already done; a working copy deleted last Tuesday is then never noticed again | green |
| BFR-3 | A blocking mode closes the gate and **leaves the flag unset** | Every blocking mutation — BMD-1, BMD-2, BMD-4, BCT-1, BCT-2, BCT-3 — reported `flag_unset: true` beside `plays: false`, and none of them wrote the record. The sequence is still owed and plays for real the first time the system works. This is the suppression rule and it is asserted on six independent conditions rather than argued once | Set the flag when the gate closes; the introduction is then spent on a session that never played it, and §1 of `install_state.md` — delete the file — becomes the only remedy | green |
| BFR-4 | The gate is separable from the content, demonstrated with the content stubbed | The probe carries **no sequence text of any kind**. It computes `{flag_unset, mode_set_permits, plays, blocked_by}` and stops. All 24 cases produced a gate decision and not one of them read, rendered or referenced a word of the sequence. The handoff is a single named boundary: the mechanism decides whether the sequence plays, the content decides what it says, and neither reaches into the other | Make the gate depend on the sequence's length, its beat count, or whether its haiku parses; the mechanism then cannot be tested until the prose exists, which is the ordering this sub-step exists to prevent | green |
| BFR-5 | The three flag states are distinguishable, and two writes are what make them so | `{null, false}` unplayed → plays; `{ts, false}` interrupted → plays, and `valid-2-nullable` is that fixture; `{ts, true}` done → does not play. Three states, two fields, both observed. A single write cannot express the middle state, and the middle state is the normal outcome of a session somebody interrupted | Write `completed` alone; a half-played sequence is then indistinguishable from an unplayed one and `attempted_at` has no reader, which §8 rule 6 would then delete | green |

---

## 8. BID — idempotence, and what no mode does

Five tests. *Idempotent* is defined at §3 **so that this suite can assert it**, and this is that
assertion.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BID-1 | Two runs in immediate succession produce the same outcome, mode set, ref set and origin set | Ran twice against an unchanged stage and compared the four structures by value. Measured `identical: true`: `CLEAN`/`CLEAN`, `[]`/`[]`, both copies `f0c976b`/`7f97983` `equal` in both, `["app","literature","none"]` in both | Recompute the drift verdict from a tracking ref the second run did not fetch; the verdict then changes against an unchanged tree | green |
| BID-2 | The second run performs no acquisition | Both copies present at the second run, no clone attempted, no report line about acquisition, and both `.git` directories unchanged. §3's falsifier is *a second run that clones*; it did not | Move the clone outside the missing-copy guard; every session then re-clones and the author's local edits are the first casualty | green |
| BID-3 | No verdict triggers a reset, a bump, a merge or a pull | Across 24 cases: no `reset`, no `clean`, no `checkout` of a working copy's content, no `pull`, no `merge`. BMD-9 asserts the dirty case on bytes. **`oracle/VERIFIED.tsv` was byte-identical after every run**, which is the auto-bump prohibition asserted rather than promised | Add an auto-bump on a clean `equal` verdict; adopting a ref becomes something that happens while nobody is looking, and the record stops recording a decision | green |
| BID-4 | Nothing is written outside the repository root and its two working copies | Every mutation ran against a stage in a temporary directory and the repository was untouched: `git status` at `99d3601` shows no modification attributable to this suite. The one path the suite writes inside a stage is `.oracle-state.json`, and only in BSR | Point a fixture at `literature/` in the real tree "just to test against real data"; the suite then edits the deliverable it is testing | green |
| BID-5 | The bootstrap writes exactly one file | `.oracle-state.json`, and nothing else. Asserted negatively as well: no `.oracle-state.json.corrupt` quarantine copy was written for any of the seven corrupt fixtures, and no `.oracle-state.json.tmp` survived any run. The four facts of §1 live there and nowhere else | Write a quarantine copy beside the record; §8 rule 5 is then broken and the copy is a file nothing reads, which is M3 | green |

---

## 9. BXT — the instrument, and the sixth member of the family

Four tests. A suite that cannot say what its own instrument is blind to is the `CHK-03` shape wearing
a different costume.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| BXT-1 | A corpus walk guarded by `Dirent.isFile()` finds every file in a hardlinked stage | **It finds zero.** The stage hardlinks all 169 summaries, and `lsei/oracle/lib/literature_search.js`'s `listCorpusFiles` — a plain recursive walk whose leaf test is `e.isFile() && e.name.endsWith('.md')` — returned **0** over the stage and **169** over the real shelf. Isolated to one line: on this platform `fs.readdirSync(dir, {withFileTypes:true})` reports a hardlink to a OneDrive-backed file as `isFile()=false, isSymbolicLink()=true`, while `fs.lstatSync` on the same path reports `isFile()=true, isSymbolicLink()=false, nlink=3`. A plain copy of the same file in the same directory reports `isFile()=true`. **`Dirent` and `lstat` disagree about the type of one file**, and the directory entry is the one that is wrong. This is the sixth member of the family: the content is present, the trigger is metadata — the directory entry's type bits — and the assertion passes on the machine where it cannot fail, which is the unstaged tree. The defence held and is worth saying: `requireNonEmptyCorpus` threw loudly rather than letting an empty corpus resolve to a confident `REFUSE` | Replace the `lstat` cross-check with the `Dirent` guard; hardlink staging then reports an empty corpus and every collision, coverage and overlap assertion over it is vacuously clean | green |
| BXT-2 | This repository's own instruments do not carry that guard | **Two do.** `tools/manifest.js:105` and `tools/quantities.js:120` both walk with `e.isFile() && /\.md$/.test(e.name)`. Hardlink staging is standard practice here — the 2.12 audit stage hardlinks each summary beside its PDF, and `run_suite.js --tree` exists to run assertions against a staged tree — so both instruments return an empty population over any stage built that way, and an empty population is exactly what `VACUOUS IS NOT PASS` was written for. Not measured against a staged run of either tool, because neither was pointed at a hardlinked tree this session; the guard is read from the source and the platform behaviour is measured | Owner: **The Software Engineer**, who owns `tools/manifest.js`, `tools/quantities.js` and the `oracle/` reimplementation of `literature_search.js`. Close condition: the leaf test is `fs.lstatSync(p).isFile()` or `!e.isDirectory()`, and one fixture walks a hardlinked tree | RED |
| BXT-3 | The suite's mutations never reach the repository or the working copies | `git status` at `99d3601` after all 24 cases: no file modified by this suite. `<repo>/lsei` and `<repo>/cr-agents` at `7f97983` and `f0c976b`, push still `DISABLED`, working trees as found. Every clone in this suite is `--no-hardlinks` from the local copy, so no stage shares an object store with a working copy | Stage by symlink or by hardlinking `.git`; a mutation in a stage then reaches the working copy's object store, and the one rule §5 states absolutely is broken by the suite that tests it | green |
| BXT-4 | The suite asserts the contract version it was written against | **This suite was written against contract version 2 and the contract is now at 3, bumped in this same sub-step on seven repairs, six of which are RED rows in this file.** The re-point is made here rather than left as a follow-up, and the sequence is the assertion working: BXT-4 was written, the suite found six defects, the defects required a bump, and the bump broke BXT-4 until this cell moved. **The suite is written against version 3.** §10 says three things read the integer and that the field is removed rather than left as decoration if any of the three stops; all three now exist — the contract carries it, `CLAUDE.md` quotes it, and this row asserts it | Bump the contract again without touching this line; the suite then asserts against a contract that no longer exists, which is the whole point of the field, and is what this row just did to itself | green |

---

## 10. What this suite does not cover, stated rather than discovered

1. **The session's own behaviour.** The bootstrap is a Claude session reading `CLAUDE.md`, and no
   script in this repository can assert that a session read a document and obeyed it. What this suite
   asserts is the **decidable half**: every `BC-` command, the mode set they compute, the origin set
   that follows, and the gate. The other half is sub-step 6.5's conformance pass, which asks the one
   question a suite cannot — does the prose implement this contract, or a friendlier one.
2. **The drift verdicts of §7.1.** The probe computes a crude three-way comparison and it is **not**
   the currency policy's verdict set; on BMD-6 it printed `local-ahead` for a copy that is behind. No
   row in this suite claims a verdict, and `oracle/currency_policy.md` §§5–8 owns the instrument.
   Named here because a wrong verdict printed by a test harness is worse than none.
3. **The corpus fork verdicts of §7.2.** `diverged` is `unknown` for all files today because no
   provenance block carries a merge-time digest, and `CHK-40`/`CHK-32` are the instruments. BCT-4 and
   BCT-5 assert only that the verdict is never `equal` where nothing was compared.
4. **`Q-CONTAIN-BACKSTOP-BLIND`.** The containment size gate is blind to 29 of 112 source PDFs and
   says so in its own output. That is `oracle/release_gate.md`'s, not this suite's.

---

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| `oracle/tests/bootstrap_suite.md` is not in `run_suite.js`'s `SUITES` array, and the three harness files are in a scratch directory. Until both land, every row here is a recorded measurement and not a repeatable run. | 6.1 / 2.19 | The Software Engineer |
| `tools/manifest.js:105` and `tools/quantities.js:120` walk with a `Dirent.isFile()` guard that returns false for a hardlink on this platform. Both report an empty population over any hardlinked stage. BXT-1 and BXT-2. | 1.11 / 2.19 | The Software Engineer |
| `lsei/oracle/lib/literature_search.js`'s `listCorpusFiles` carries the same guard. Upstream and read-only; the finding is for the `oracle/` reimplementation, not for a patch to `lsei/`. | Step 3 | The Software Engineer |
| `oracle/install_state.md` §9 prints a three-column, two-row `oracle/VERIFIED.tsv`. The file on disk and `oracle/currency_policy.md` §3 carry five columns and five rows, three of them `lsei`. BC-11 does not say which `lsei` row is the verified-against ref. BSR-8. | 1.5 / 1.6 | The Systems Engineer, outside this wave's write set |
| `lunar-oracle-gameplan.md` L674's `E15` cell reads "five blocking modes, not six". The measured figures are five degraded modes and three blocking. The phrasing has already propagated into one spawn brief. | accumulator / gameplan | The Manager |
| `cr_scratch/step0_writer_register_spec.md` §3.6 refers to "his six degraded modes". Same conflation, and it is the document 6.7 through 6.10 are written against. | 0.4 artifact | The Writer |

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +61/-0
```

**The 61 tests are the TDD deliverable of sub-step 6.1 and are not freeze spend**, per the wave
standing block's explicit exception. No check row, amendment row or quantity id was minted. `BC-21`
is *proposed* by BMD-5 and is not written; minting it is a contract change and it is named as owed
rather than taken.
