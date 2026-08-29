# Step 6, W4-6 — The Systems Engineer

**Chain: 6.1, 6.6, 6.7, 6.11, 6.15, the 6.5 conformance verdict, and three routed repairs. All
reached.** 6.7 and 6.11 were added mid-wave by the orchestrator's scope correction; the three repairs
were routed after that.

**Deliverables:** `oracle/tests/bootstrap_suite.md` (61), `oracle/first_run.md`,
`oracle/tests/first_run_suite.md` (28), `oracle/tests/readme_suite.md` (26),
`oracle/release_gate.md`, and `oracle/bootstrap_contract.md` at version **3**.

---

## 0. Premise check — five claims in my own brief, measured before use

**1. "There are five blocking modes, not six" is a conflation, and it is on the record twice.**
`Q-DEGRADED-MODES` is **5** and `Q-BLOCKING-MODES` is **3**. The correction actually made at gate item
C-1 demoted `missing-recoverable` from the degraded set, six to five; the blocking subset was three
before and after. `Q-BLOCKING-MODES`'s own `superseded` cell records that its *value* never changed
and its *predicate* did — "3 of the 6" over a live population of five, a well-formed block asserting
a false predicate that `--check` passed. **The phrase travelled from `lunar-oracle-gameplan.md` L674's
`E15` cell into my brief**, and it is also in `cr_scratch/step0_writer_register_spec.md` §3.6 as "his
six degraded modes". `BMD-10` and `BMD-11` assert the two figures separately so it cannot survive.

**2. The corpus is 169, not 168.** 2.12 measured 168 at `af7abec`; `ls literature/*/*.md | wc -l`
returns **169** at `99d3601`.

**3. `oracle/VERIFIED.tsv` has two published shapes.** `install_state.md` §9 prints `# copies=2`,
three columns, two rows. The file and `currency_policy.md` §3 carry `# rows=5`, five columns, and
**three `lsei` rows**. BC-11 does not say which one is the verified-against ref. `BSR-8`, RED.

**4. `tools/verify_haiku.js` exists.** My first draft of the 6.7 suite asserted it did not, on the
strength of the 0.4 specification saying it was "named, not designed". It is 398 lines and implements
four of the things I was about to route as missing. Found by `ls tools/`. Corrected in place, and the
correction is printed in that suite's §0 rather than quietly absorbed.

**5. The 6.1 stage could not be built where I first put it.** The session scratchpad is **153**
characters and cloning `cr-agents` into it failed with `Filename too long`. That accident became
`BAB-7` and the first empirical evidence `Q-ROOT-ALLOWANCE` has ever had.

---

## 1. What was actually run

A real stage — `git clone --no-hardlinks` from the local working copies, `origin` repointed at the
true upstreams, **push deliberately left live** — rebuilt from scratch for each of **24 mutation
cases**, so no case inherited another's damage. Every git-level assertion was answered by git. The
repository and both working copies were untouched: `git status` at `99d3601` shows nothing
attributable to this suite, and both copies are still at `f0c976b` / `7f97983` with push `DISABLED`.

The five degraded modes were produced by removing a directory, pointing an upstream at
`https://127.0.0.1:1/nope.git`, deleting a `.git`, overwriting a marker, truncating a file to zero
bytes, detaching onto `HEAD~1`, and appending a byte to a tracked file. **No row in the suite passes
by reading a document and concluding.**

The strongest single assertion, because it crosses the layer boundary: the question *"What is the
water output for Agency Led Baseline in 2040?"* returned verdict `APP`, outcome `ANSWERED`,
`water = 13.358`, exit 0. The app file was then **renamed away** and the identical invocation exited
**1**. A hollow `<!doctype html>` page in its place exited 1 with *"island DATA-ISLAND not found or
malformed ... refusing rather than returning a partial model."* Answer-time and bootstrap-time refuse
the same condition, and the bootstrap's contribution is that it refuses before the question is asked.

---

## 2. Nine defects found by running the suite. Six were repaired here.

| | Finding | Row | Disposition |
|---|---|---|---|
| 1 | **A repointed `origin` reports `CLEAN`.** `present-but-wrong`'s middle disjunct — *"its `origin` points somewhere other than the expected upstream"* — had **no instrument**. BC-6 writes the push URL; BC-9 reads `hooksPath`; nothing read the fetch URL. Measured: `origin` set to `example.invalid`, `modeSet=[]`, `phase7.plays=true`, all origins available. A closed set holding a **clause** no execution path could produce — `Q-DEGRADED-MODES`'s lesson one level down | `BMD-5` | **Repaired.** `BC-21` added |
| 2 | **A content assertion evaluated against an absent copy assigns `present-but-wrong` to it.** `grep KNOB_DATA lsei/index.html` fails on a file that is not there, so a missing `lsei/` was assigned `{offline, present-but-wrong, partially-acquired}` — and §5 attaches to `present-but-wrong` the rule *never clone over it and never delete it*, on the one copy that must be cloned. Invisible to any test that reads only the gate, because blocking is by intersection. **`VACUOUS IS NOT PASS`'s mirror: vacuous is not fail** | `BCT-6` | **Repaired.** Group 3 gated on presence |
| 3 | **`core.longpaths` is set one phase after the operation it protects.** BC-7 is Phase 4; the clone is Phase 3. Measured: clone into a 151-char root exits **128**; with `-c core.longpaths=true` it exits **0** at 151, 152, 153 and 156. E7's shape from a different direction — the mechanism is right and is wired to the wrong moment | `BCF-6` | **Repaired.** Phase 3's clone carries the key |
| 4 | **An install whose corpus is unreachable reports `CLEAN`.** BC-17 red, origin `literature` unavailable, mode set empty, outcome `CLEAN`. §6 already recorded this exact come-apart for Node and fixed it by making BC-4 a condition of origin `app`; **the fix was never generalised**. `AM-04` from its second direction | `BSH-2` | **Repaired.** The outcome line carries the origin set when it is not the full four |
| 5 | **BC-8 has no failure branch for a root that is not a git repository.** On a tree with a `lunar-oracle-gameplan.md` and no `.git`, `config --get` returns empty and exits 1 and `ls-files` exits 128 — both of which read as "hooksPath is unset", so a download-as-zip install reports a configuration problem | `BCF-5` | **Repaired.** Third failure mode named; its own report line |
| 6 | **BC-5's over-allowance-with-copies-present case emits no report line from its own row.** The line exists only in Phase 5's ordered list, item 8. Measured at a 153-char root with both copies present: `outcome=CLEAN`, `lines=[]` | `BAB-6` | **Repaired.** BC-5's failure cell names the report line |
| 7 | **`oracle/install_state.md` §9's `VERIFIED.tsv` fence is stale**, and teaches the misreading `currency_policy.md` §3 names as its own falsifier — take the first `lsei` row and you read `c8274e6` and report three of this project's own pushes as an upstream move | `BSR-8` | **Routed.** Outside this write set |
| 8 | **`Dirent.isFile()` returns false for a hardlink on this platform**, so a corpus walk guarded by it finds **zero** files in a hardlinked stage. See §3 | `BXT-1`, `BXT-2` | **Routed** to The Software Engineer |
| 9 | **`Q-ROOT-ALLOWANCE`'s `sampled:` cell says no observed root was ever evidence for it.** That is now false; §4 below | `BAB-7` | **Routed.** The block is The Engineer's file |

---

## 3. The sixth member of the family, and it is mine

E1 (hooks are not cloned), HK-2 (a hook at `100644` is inert on a clone), `.gitattributes` (a hook
with CRLF is inert on a clone), and the two found since. **The sixth was found by this suite's own
harness failing:**

```
listCorpusFiles(<hardlinked stage>/literature)   →   0
listCorpusFiles(literature)                      → 169
```

Isolated to one line. On this platform `fs.readdirSync(dir, {withFileTypes:true})` reports a hardlink
to a OneDrive-backed file as **`isFile()=false, isSymbolicLink()=true`**, while `fs.lstatSync` on the
same path reports `isFile()=true, isSymbolicLink()=false, nlink=3`. A plain **copy** of the same file
in the same directory reports `isFile()=true`. Confirmed side by side in one directory.

**`Dirent` and `lstat` disagree about the type of one file, and the directory entry is the one that
is wrong.** The content is present; the trigger is metadata — the directory entry's type bits — and
the assertion passes on the machine where it cannot fail, which is the unstaged tree.

**It has two live instances in this repository**: `tools/manifest.js:105` and
`tools/quantities.js:120` both walk with `e.isFile() && /\.md$/`. Hardlink staging is standard
practice here — the 2.12 audit stage hardlinks each summary beside its PDF, and `run_suite.js --tree`
exists to run assertions against a staged tree — so both return an empty population over any stage
built that way, and an empty population is exactly what `VACUOUS IS NOT PASS` was written for.

**The defence held, and that is worth as much as the finding.** `requireNonEmptyCorpus` threw loudly:
*"a search against an empty corpus is indistinguishable from a search that found nothing relevant."*
The discovery broke; the guard against reporting the breakage as a clean result did not.

---

## 4. `Q-ROOT-ALLOWANCE = 150` is now observed

Bisected by cloning `cr-agents` — the deeper copy — into roots of increasing length, `core.longpaths`
unset:

```
150  git clone exit 0
151  git clone exit 128   "Filename too long"   "fatal: unable to checkout working tree"
152, 153, 156            exit 128
```

**The remainder and the observation agree exactly.** Two carrying conditions: the result is
conditional on `core.longpaths` being unset — with it on, the clone succeeds at 156 — and the ceiling
is a property of the deepest path inside `cr-agents`, so an upstream commit that deepens that tree
moves the wall without moving the arithmetic. The block lives at
`cr_scratch/step1_7_engineer_naming_addendum.md` and the `sampled:` correction is routed, not taken.

---

## 5. The 6.5 conformance verdict

**The question, as the Editor put it in advance: does the prose of `CLAUDE.md` implement
`oracle/bootstrap_contract.md`, or a friendlier contract the suite does not test?**

**Verdict: it implements the contract. Seven seams, six clean, one stale — and the stale one is a
sentence that was true when it was written and had gone false in my file, not in hers.** I found no
place where the prose softened, generalised or omitted an assertable clause into a judgement.

| Seam | Verdict |
|---|---|
| **1. Phase 6 membership** | **Clean, and better than clean.** Three entries in the contract's order, and `CLAUDE.md` is **not** in its own sequence — *"reading it is how the session learned to bootstrap at all."* The seed stub's four-item sequence opened with itself. The draft additionally quarantines the first-session exception to `prompt0.md` and says why: applying it to the whole sequence loses the method guide after every compaction, which is exactly when it is needed. The contract does not say that. It is not a friendlier contract; it is the same contract with a reason attached |
| **2. Phase 7's gate** | **Clean, and it refuses the softer phrasing by name.** *"only when both conditions hold: the first-run flag ... is unset, and no blocking mode is in force"*, the three blocking modes enumerated, and then: *"Test the set for intersection with those three names. Do not phrase the gate as 'the bootstrap fully succeeded' or any synonym: a gate phrased as a judgement cannot be tested."* The draft states the failure mode the seam was watching for and forbids it. `moved-on` and `dirty-or-diverged` are correctly non-blocking, with `usable` closed inline |
| **3. The status line** | **Clean.** *"the sequence first, then the status line on its own plain line. The status line is never folded into the sequence."* Verbatim in force, with the reason |
| **4. Acquire versus Verify (E7)** | **Clean.** Phase 3 closes with *"This phase does not disable push, does not fetch, and does not verify"*, and then names the case: *"a working copy that was present with push still enabled was therefore never reached."* Phase 4 group 1 performs it, in a loop over both copies. E7 is not reintroduced |
| **5. Terminal outcome vocabulary** | **Clean.** `ABORT` / `DEGRADED` / `CLEAN`, the `ABORT (Phase 3, BC-5)` form, **and §2's own correction to itself carried across**: *"`ABORT` states where the bootstrap stopped and nothing about what it had already done"*, with the Phase 5 case spelled out. That paragraph is the one a friendlier draft would have dropped as a technicality |
| **6. §8's seven-item list** | **Clean, seven for seven, plus the three from the mode table.** No convenience offered. Rule 6 goes further than the contract and enumerates the forbidden verbs — *"no `reset`, no `clean`, no `checkout` across a dirty tree, no `pull`, no `rebase`, no `push`"* — which is a tightening, not a loosening |
| **7. §8 rule 2, "enforced mechanically by BC-6"** | **The Editor is right and the defect is mine.** BC-6 disables the **push** URL. It prevents propagation upstream; it does not prevent `cp -r literature/ lsei/literature/`, which produces a working copy that then compares `equal` against content this project put there. **The prose was correctly implementing a claim that was too strong.** Repaired in the contract at version 3: the rule is a prohibition on the bootstrap with a *partial* mechanical backstop, which is what the other six are |

**The one conformance finding, and it is stale rather than friendly.** `CLAUDE.md` §3 prohibition 7
reads *"whether it lands as `tools/corpus_divergence.js` or as a mode of `tools/verify_corpus.js` is
open at 2.17."* **It is closed.** The Engineer ruled it at W3-1 — a mode of `verify_corpus.js`, one
tool, on four reasons — and `tools/verify_corpus.js` already carries a `DIV` section.
`bootstrap_contract.md` §7.2 was the document still naming the non-existent file, and the draft was
faithfully implementing my staleness. **§7.2 is repaired at version 3; the `CLAUDE.md` sentence is
routed to The Writer**, and the fix is one clause.

**A note on method, because it is the reason this verdict is worth anything.** The Editor put the
question in writing before the draft existed, and I answered the six seams from the contract before
opening the draft — 6.7 and 6.11 were written first, blind, for the same reason. Seam 7 is the one
neither of us could have stated in advance, and it is the only one that found a defect.

**And one thing the prose implements faithfully that the contract could not deliver.** `CLAUDE.md` §2
lists `present-but-wrong` as firing on *"whose `origin` points somewhere unexpected."* Until `BC-21`
landed an hour ago, nothing in the contract could produce that. **The prose was right about a contract
that was under-instrumented**, which is the second time in this pass that the direction of the defect
ran from specification to prose rather than the other way, and it is why §5's *"correct `CLAUDE.md`"*
rule is a default and not an absolute.

---

## 6. The three routed repairs, verified before acting

| | The Writer's finding | Verified | Done |
|---|---|---|---|
| F1 | BC-10 omits `--prune` | **Confirmed.** `currency_policy.md` §4 requires it since 1.6 with the measurement, and requires a forced refspec without which §7.2's `withdrawn` is unreachable. The contract cell read `git -C <copy> fetch --quiet origin` | **Repaired.** Cell, falsifier, and a paragraph naming the direction: the prose was right, the contract was the bug |
| F2 | `install_state.md` §9's fence is stale | **Confirmed independently at `BSR-8`** before the routing arrived. Three columns and `# copies=2` against a five-column, five-row, three-`lsei` file | **Routed.** `oracle/install_state.md` is outside this wave's write set. Close condition at `BSR-8` |
| F3 | `tools/corpus_divergence.js` does not exist | **Confirmed.** Nineteen files under `tools/`, not one of them. **Ruling: the contract is the defect, not the missing tool** — The Engineer ruled the consolidation at W3-1 and `verify_corpus.js` carries the `DIV` section | **Repaired** in §7.2, with the four reasons adopted whole and the register rows routed |

---

## 7. State of the release gate

**Eight of sixteen met, six not met, two unmeasurable.** `oracle/release_gate.md` carries all sixteen
with the command that decides each. The gate is shut and this file did not open it.

**Met:** the whole containment mechanism. `check_no_sources.js --tree` scans 497 tracked files with 0
findings; `--ignore-probe` asserts 25 probe paths with 0 open; the size gate prints its own blindness
(29 of 112, 25.9%); all four hooks at `100755` with `eol: lf`; no bypass ledger.

**Not met, and the two cheapest are not about the corpus at all:** there is **no `LICENSE` file** at
this repository's root, and under A1 the repository is public — which makes it all-rights-reserved by
default, the opposite of what a public-domain dedication means. And **`README.md` is untracked**:
12,063 bytes on disk, `git ls-files README.md` returns nothing.

**The rule the gate is built on**, because it has a live instance that reproduces in one command:

```
$ node tools/audit_abstract_overlap.js literature 10
tested 0 summaries ...
AT OR ABOVE 10% VERBATIM: 0
```

Zero findings over zero tested, and the last line is byte-identical to what a clean corpus produces.
**An unmeasurable population is unmeasured; it is never clear.** 56 of 169 summaries have never been
measured, 50 of them Scenario-Explorer-origin and disproportionately the long format that has more
room for transcription, not less. Every gate reporting a count reports three numbers, and any gate
whose unmeasurable count exceeds zero is `NOT MET` regardless of its findings.

`PRV-15`, routed to me at Wave 3: **0 of 169** files carry a `Licence:` line. The row is vacuously
green — a partition asserted over a population in which neither class has a member — and it sits on
the licence question. `RG-7` and `RDM-15` are its close conditions and both need 2.11 first.

---

## 8. Close conditions

| Sub-step | Condition | Status |
|---|---|---|
| **6.1** | Every degraded mode has an assertion that renames or removes something and observes the refusal | **Met.** Five modes, eleven `BMD` rows, 24 mutation cases. Every one applied a change to disk. `BMD-5` is the one mode-clause that could not be observed and it is now `BC-21` |
| **6.1** | Written before the real `CLAUDE.md` | **Met in fact for the suite's content**, and the ordering was broken by the wave: the draft landed while I was writing §5. No row was written after opening it — the conformance pass at §5 above is the first read |
| **6.6** | The first-run mechanism is separable from its content, demonstrated with the content stubbed | **Met.** `BFR-4`: the gate was computed on all 24 cases and no case read, rendered or referenced a word of the sequence. `oracle/first_run.md` contains no sequence text |
| **6.7** | The suite precedes the content | **Not met, and it is a wave-sequencing fact rather than a choice.** `oracle/first_run_content.md` landed before 6.7 was assigned to me. **The suite was written without opening it**, against the 0.4 specification. Declared in that file's header |
| **6.11** | Same | **Same.** `README.md` landed first; the suite was written blind to it, against A5, 2.12 and the `lsei/NOTICE.md` precedent |
| **6.15** | Every precondition named with a command that decides it | **Met.** Sixteen gates, sixteen commands, each with its measured verdict at `99d3601` |
| **6.15** | Do not open the gate | **Met.** No command in `oracle/release_gate.md` releases anything, and the `gh repo edit --visibility public` that would is deliberately not printed |
| **6.5** | A verdict per seam | **Met.** Seven seams, §5 |

---

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| `tools/manifest.js:105` and `tools/quantities.js:120` walk with a `Dirent.isFile()` guard that returns false for a hardlink on this platform. Both report an empty population over any hardlinked stage. `lsei/oracle/lib/literature_search.js` carries it too — upstream and read-only, so the finding is for the `oracle/` reimplementation. | 1.11 / 2.19 / Step 3 | The Software Engineer |
| The three suites written this wave — 61 + 28 + 26 = **115 rows** — are not in `run_suite.js`'s `SUITES`, and the three harness files are in a scratch directory. `node oracle/tests/run_suite.js` reports 455 rows, 33 pass, 4 fail, 418 unrun; my 115 contribute none of it. | 2.19 | The Software Engineer |
| `oracle/install_state.md` §9's `VERIFIED.tsv` fence is stale and teaches the first-row misreading `currency_policy.md` §3 names as its falsifier. BC-11 does not say which of three `lsei` rows is the verified-against ref. | 1.5 / 1.6 | The Systems Engineer, outside this wave's write set |
| `Q-ROOT-ALLOWANCE`'s `sampled:` cell reads "No observed root was ever evidence for it." Now false: 150 passes, 151 exits 128. Conditional on `core.longpaths` unset. | 1.7 addendum | The Engineer |
| `CLAUDE.md` §3 prohibition 7 calls the divergence-tool question *"open at 2.17"*. The Engineer closed it at W3-1. One clause. | 6.4 | The Writer |
| `cr_scratch/step0_writer_register_spec.md` §1.4 has no image-family row for a haiku emitted before any verdict — which the opening haiku is. `verify_haiku.js` reports `not checked: no verdict supplied` and returns PASS. `FRC-5`. | 0.4 | The Writer |
| §1.8 mechanism 2 names a rendered character-length cap; no document supplies a number and `verify_haiku.js` implements none. `FRC-6`. | 5.1 | The Software Engineer |
| `lunar-oracle-gameplan.md` L674's `E15` cell reads "five blocking modes, not six". Five degraded, three blocking. It has propagated into at least one spawn brief. | gameplan | The Manager |
| Accumulator A6's population figure of 57 is not comparable to the measured 50-of-169. Its own author declined to reconcile it, deliberately. | accumulator | The Manager |
| Sub-step **2.11** has not run. It blocks `RG-1`, `RG-2`, `RG-3`, `RG-8`, `RDM-14` and `RDM-15` — six gate rows across two documents. | 2.11 | The Engineer |
| No `LICENSE` and no `NOTICE.md` at the repository root; `README.md` untracked. `RG-14`, `RG-15`. | 6.13 / 6.14 | The Writer; the licence file is the author's to sign |
| `prettyman-2006` (100.0% verbatim AGU abstract, publisher copyright line printed in the file) and `levin-2025` (95.6%): rewrite or except. 2.12 costs rewriting at an hour. | 2.12 | The author |
| `CHK-32` and `CHK-40`'s `artifact` cells name `tools/corpus_divergence.js`. Under The Engineer's W3-1 ruling they are two invocations of `tools/verify_corpus.js`. | 2.19 register | The Software Engineer |
| **`.gitattributes` pins `eol=lf` for `tools/githooks/**`, `*.js`, `*.sh`, `literature/**` and five named `oracle/` files — and for nothing else under `oracle/`.** `git check-attr text eol` returns `unspecified` for `oracle/bootstrap_contract.md`, `oracle/first_run.md`, `oracle/release_gate.md` and all three suites I wrote this wave. They hash to LF blobs — verified, 0 CR bytes — **only because `core.autocrlf=true` on this machine**, which is the same one-contributor's-local-setting condition the contract's own BC-8 discussion names and which `.gitattributes` was created at 2.20 to close for the hooks. The seventh instance of the family, and it is on my own deliverables. Fix is a `oracle/**.md text eol=lf` line. | 2.20 / 1.1 | The Systems Engineer — `.gitattributes` is outside this wave's write set |

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +115/-0
```

**All 115 tests are TDD deliverables** — 6.1, 6.7 and 6.11 are stage-1 suites and the wave standing
block names them as the explicit exception to the freeze. **No check row, amendment row or quantity id
was minted.** `BC-21` is a contract assertion and not a `CHK-` row, and it was required by 6.1's close
condition: without it the suite cannot assert `present-but-wrong` across its stated conditions. The
contract version bump from 2 to 3 is a repair of seven measured defects and is not freeze spend.
`oracle/release_gate.md` mints no test rows, deliberately: **wiring the sixteen `RG-` gates into a
runner would make the release gate something that can be green.**
