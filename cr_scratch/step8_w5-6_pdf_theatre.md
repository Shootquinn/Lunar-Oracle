# Step 8.10 — W5-6, The Engineer. The PDF lab coat comes off.

**The author's ruling, 2026-08-29, verbatim, and it is the whole brief:**

> *"Remove that check, change the wording, and double check for extra instances of this fake lab coat
> behavior related to PDFs. It should just pretend. Like imagine pretending it has all of those
> carefully curated summaries. Almost like I planned it."*

**The one sentence everything below follows from.** The 169 summaries are the deliverable. A clone
that holds them is **complete**, not degraded — it answers every question the Oracle exists to answer.
The publications behind them were never going to be in this repository and are needed by exactly one
instrument, the copyright-hygiene audit. **The defect was never the state. It was the reporting.**

---

## 1. Baselines, taken before anything was edited

| Tree | Command | Before |
|---|---|---|
| author | `node tools/verify_corpus.js` | 39 OK / 1 FAIL / 1 VACUOUS / **6 REPORT** |
| `cc/oracleclone` (unconfigured) | same | 39 OK / 1 FAIL / 1 VACUOUS / **8 REPORT** |
| `cc/oracletest_cfg` (configured) | same | 39 OK / 1 FAIL / 1 VACUOUS / **6 REPORT** |
| author | `node tools/audit_abstract_overlap.js literature 10` | tested 160, findings 6, exit 0 |
| `oracleclone` | same | tested 0, VACUOUS, exit 3 |
| `oracletest_cfg` | same | tested 113, findings 5, exit 0 |
| author | `node tools/check_registers.js` | 0 hard failures |
| author | `node oracle/tests/run_suite.js` | 148 rows, 101 pass, **43 fail**, 4 unrun |

The one `FAIL` is `PTH/A3`, three component ceiling breaches — a pre-existing corpus defect, not mine,
and it reproduces identically in all three trees.

**The two extra REPORT lines in the unconfigured clone are the entire defect.** A stranger cloning
this repository ran one command and was told, in the verdict column, about 25 files of his own and 25
more he could not compare. Nothing was wrong with any of them.

---

## 2. After

| Tree | Command | After | Delta |
|---|---|---|---|
| author | `verify_corpus` | **40 OK / 1 FAIL / 1 VACUOUS / 5 REPORT** | +1 OK, −1 REPORT |
| `oracleclone` | `verify_corpus` | **40 OK / 1 FAIL / 1 VACUOUS / 5 REPORT** | +1 OK, **−3 REPORT** |
| `oracletest_cfg` | `verify_corpus` | **40 OK / 1 FAIL / 1 VACUOUS / 5 REPORT** | +1 OK, −1 REPORT |
| all three | `verify_corpus --selftest` | **PASS (23/23)** | was 22/22; 7 resolution cases out, 5 declaration cases in |
| author | `audit_abstract_overlap` | tested 160, findings 6, exit 0 | unchanged |
| `oracleclone` | `audit_abstract_overlap` | tested 0, **VACUOUS, exit 3** | unchanged; wording rewritten |
| `oracletest_cfg` | `audit_abstract_overlap` | tested 113, findings 5, exit 0 | unchanged |
| author | `check_registers` | **0 hard failures** | unchanged |
| author | `run_suite` | **148 rows, 101 pass, 43 fail, 4 unrun** | unchanged |

**The three trees now print the same verdict counts.** That is the target and it is also the
strongest statement of what was wrong: a corpus checker whose verdict column moved with the machine
was reporting the machine and calling it the corpus.

---

## 3. Every instance found, and its disposition

### 3.1 REMOVED — 3 instances

| # | Where | Before | After |
|---|---|---|---|
| R1 | `tools/verify_corpus.js` `CHECKS.SRC` — **`SRC-1`, resolution form** | `FAIL SRC-1 25 of 169 Source: declarations are BROKEN…` / `VACUOUS SRC-1 0 of 169 … were resolvable on this machine, so this run VERIFIED NOTHING` / `OK SRC-1 144 of 169 … resolve on this machine and 0 are broken` | The three-state form is gone. `SRC-1` now reads `OK SRC-1 all 169 Source: declarations are well formed as text (japanese-miracle 25, lsei 144). This is a statement about the declarations and not about this machine, so it is the same verdict in every clone` |
| R2 | `tools/verify_corpus.js` `CHECKS.SRC` — **`SRC-3`** | `REPORT SRC-3 25 of 169 Source: declarations are UNRESOLVABLE ON THIS MACHINE. This is a fact about the machine and NOT a corpus defect — it is the normal state of a fresh clone… To resolve them, copy tools/source_roots.local.example to…` | **Deleted.** No replacement line. The count is available under `--sources` for the one job that needs it and appears in no verdict column |
| R3 | `oracle/release_gate.md` **`RG-1`** | `RG-1 \| Source PDFs for the whole shelf are on disk, so the audit has a population \| test -d literature/_pdf && find … \| **NOT MET.** literature/_pdf does not exist. **Sub-step 2.11's pull has not run.**` | **RETIRED, struck through and kept in place with the reason.** It was a proxy for *the audit has a population*, which `RG-2` measures directly, and it pointed the remedy at putting publishers' PDFs *into* a repository whose containment gates exist to keep them out |

`SRC-3` is the line the ruling names. It was written carefully, it stated in terms that it was not a
corpus defect, and it did not matter: it is a numbered finding in a checker's output, over a count of
the reader's own files, and that reads as a shortfall no matter what the sentence says.

### 3.2 KEPT AS A REAL CHECK — 2 rows, one of them new

Absence is not a defect. **Malformation is**, and it is a defect in every clone identically.

| Row | Asserts | Why it is real |
|---|---|---|
| `SRC-1` (rewritten) | Every `Source:` cell is well formed **as text**: no backslash, no drive letter, not absolute, no `..` segment, and a directory or an alias. | These shapes cannot travel. A backslash in a `Source:` cell is the original defect the whole alias mechanism was built to remove, and nothing else in the repository would catch it coming back |
| `SRC-2` (new row, no new register row) | Every `<alias>:<path>` names an alias declared in **`tools/source_roots.local.example`**, which is tracked and therefore identical in every clone | An alias the shipped vocabulary does not declare is one **no machine can ever be configured for**. That is a corpus defect and it is invisible to a resolution test, which would just call it unconfigured |

Both are statements about declaration text, so both give the same answer on the author's disk and in a
fresh clone. The self-test asserts that equality directly (§4, case 4).

### 3.3 REWORDED — 8 instances

| # | Where | Before | After |
|---|---|---|---|
| W1 | `verify_corpus.js` `PRV-8` | `REPORT PRV-8 7 Source file: references do not resolve … All of them sit in inherited blocks and name PDFs that CHK-13 forbids on disk; the remedy is the PRV-1b ruling, not a path edit` | `NOTE PRV-8 7 Source file: cells name a PDF by basename that is not inside this repository, which is by construction: no PDF is ever in here (CHK-13). They are the pairing hints tools/audit_abstract_overlap.js uses against configured source roots, and they resolve there. Not a defect and not a shortfall` |
| W2 | `verify_corpus.js` `DIV` | `REPORT DIV not comparable here: 25 landed file(s) name a source tree this machine does not hold … see SRC-3 for how to configure the roots` | `NOTE DIV scope: 144 of 169 landed files were compared against upstream. The other 25 name a source tree that is not on this machine, so this run says nothing about them either way — not a withdrawal, not drift, nothing owed` |
| W3 | `verify_corpus.js` `--sources` labels | `RESOLVED` / `UNRESOLVABLE-HERE` / `BROKEN` | `CAN OPEN` / `NOT ON THIS MACHINE` / `ROOT SET, NOT FOUND`, under a header that says *THIS IS FOR THE COPYRIGHT AUDIT, WHICH NEEDS THE AUTHOR'S SOURCE FOLDERS. It is not a corpus check. A machine that can open none of these still holds the whole corpus* |
| W4 | `verify_corpus.js` `--sources` roots line | `roots from tools/source_roots.local (ABSENT)` | `roots from tools/source_roots.local (not present here)` |
| W5 | `audit_abstract_overlap.js` VACUOUS cause | `CAUSE: no source PDF was found under any of the roots above. _intake/ is gitignored (RG-9…), so A FRESH CLONE CANNOT RUN THIS AUDIT AT ALL. That is BC-19's two-trees fact … Point --sources at a shelf of PDFs, or run sub-step 2.11 (the PDF pull), then re-run.` | `CAUSE: this machine has not been told where any shelf of source publications is … THAT IS THE EXPECTED STATE ON ANY MACHINE BUT THE AUTHOR'S, and it is not a defect in anything. This check is simply not runnable here, and it is the only check in this repository that needs anything from outside it.` — followed by how to configure it **and** by *"Otherwise there is nothing for you to do here."* The `2.11` instruction is gone |
| W6 | `audit_abstract_overlap.js` VACUOUS block | (the four-line VACUOUS paragraph alone) | A paragraph added above the cause: *NOTHING IS WRONG WITH THE CORPUS AND NOTHING IS MISSING FROM IT … The summaries are the deliverable and this working copy has all of them.* |
| W7 | `audit_abstract_overlap.js` population ledger | `skipped: 3 with no ## Abstract section, 166 with no source PDF resolvable on disk` | `skipped: 3 with no ## Abstract section, 166 whose source publication is not reachable from this machine` |
| W8 | `tools/source_roots.local.example` | `YOU DO NOT NEED THIS FILE. A clone without it is correct and complete. It will report every external source as 'unresolvable here'…` plus a three-state legend ending `SRC-1 fails only on BROKEN. It reports VACUOUS, never OK, if nothing at all resolved` | `YOU ALMOST CERTAINLY DO NOT NEED THIS FILE, AND NOT MAKING IT COSTS YOU NOTHING.` … `node tools/verify_corpus.js reports the same corpus verdicts whether or not this file exists, and it will not print a finding, a warning or a shortfall because you did not make one.` Legend rewritten to the three new labels, closing `THIS LISTING IS A WORKSHEET FOR THE AUDIT AND DECIDES NOTHING` |

**W8 is a declared write-set extension and I want it seen.** `tools/source_roots.local.example` is not
in my write set. It is **tracked**, it is the first thing a stranger reads when he wonders about
sources, and after R1/R2 it documented a three-state contract the tool no longer implements — the
exact lab-coat wording the ruling names, shipping in a tracked file. Leaving it wrong seemed worse
than the extension. It is one file, inside `tools/`, which this seat owns the rest of, and the diff is
above in full for reversal.

### 3.4 CONTRACT CELLS RESTATED — 9

| # | Where | Disposition |
|---|---|---|
| C1 | `oracle/bootstrap_contract.md` **`BC-19`** | **Re-pointed, not deleted.** It probed `test -d literature/_pdf` — a directory sub-step 2.11 would have created, that 2.11 is now retired without creating, and that exists on no machine anywhere. **Every install reported `false`.** Its supporting prose argued the author's `literature/` and a clone's are *"permanently different trees with the same name"*; **that is not true** — they are the same 169 files. What genuinely differs is whether the machine can reach the *source publications*, which is what the audit needs and what BC-19 now records: `test -s tools/source_roots.local`, reported as *this machine is not configured for the copyright audit, which is expected and is not a shortfall in this repository* |
| C2 | `bootstrap_contract.md` §1 four-facts sentence, §3 Phase 5 item 7 | `whether source PDFs are present in this install` → `whether this machine can reach the source publications the copyright audit needs` / `stated as a capability of the machine, never as a state of the corpus, and never as something the reader owes` |
| C3 | `oracle/release_gate.md` §2 | The rule now has **two** halves. Half 1 unchanged and absolute: a run that measured nothing certifies nothing, `exit 3`, `VACUOUS, NOT CLEAN`. Half 2 added: **an unmeasurable file is named with its reason, and the reason is never "the PDF is not on this machine."** Version 1's *"56 of 169 unmeasured"* is exactly the aggregate the new half forbids. The broken `tested 0` transcript is kept as the worked example, labelled as history |
| C4 | `release_gate.md` **`RG-2`** | Criterion restated: required `unmeasurable == 0`, **which is unreachable for a summary whose source is a UN treaty**, so as written the gate could never open. Now: every summary measured **or named with a reason that is not "not on this machine."** **MET** — tested 160, findings 6, exit 0, and the six named in the cell |
| C5 | `release_gate.md` **`RG-3`** | Was `UNMEASURABLE until RG-1` against a list of eight compared by eye. Now **MET** against a set of six the tool's own `§KA` declares and checks in both directions on every run. Three of the eight were repaired at 8.8, one member is new. This is stricter than what it replaced |
| C6 | `release_gate.md` **`RG-5`, `RG-6`** | Re-measured, both **MET**. Nine files carry a `Licence:` class and a basis (`grep -rli 'licence:' literature/`); the three AGU-shaped reproductions were rewritten at 8.8 and are absent from the finding set. `RG-5` additionally now requires the basis to be **in the file** |
| C7 | `release_gate.md` **`RG-7`, `RG-14`, `RG-15`, `RG-16`** | Re-measured. `RG-7` 0 → **9 of 169**, still NOT MET, but `PRV-15` can now go red for the first time since Wave 1. `RG-14` **MET**, `LICENSE` is tracked. `RG-15` still NOT MET — README is tracked now, the suite is still unwired, and `RDM-14`'s *56 of 169* is **six**. `RG-16` re-measured 455/33/4/418 → **148/101/43/4** |
| C8 | `release_gate.md` §4, §5, §6, new §7 | §4 gains a closed clause **4b**: never treat the absence of a source publication as a defect in this repository — *"Vacuous stays vacuous. Absent stops being a shortfall. The two are not the same relaxation and only the second one was made."* §5 retabulated to fifteen gates (**eleven met, three not met, one unmeasurable**, was eight/six/two). §6's A6 reconciliation no longer waits on 2.11. §7 is new and records every version-2 change with its reason |
| C9 | `lunar-oracle-gameplan.md` directory map consequence | `A person who clones Lunar Oracle gets the merged corpus and no PDFs. That corpus is **176 summaries by arithmetic … and has never been measured**` → `A person who clones Lunar Oracle gets **169 summaries** — every one this project wrote … **That is the deliverable, not a subset of it** … no instrument here may report the absence of one as a defect, a warning or a debt` |

### 3.5 LEFT ALONE, WITH THE REASON — 7

Each of these looked like a candidate and each is doing real work.

| Where | Why it stays |
|---|---|
| `audit_abstract_overlap.js` **`exit 3` and the `VACUOUS, NOT CLEAN` line** | **The line I was told not to cross.** Three all-rights-reserved reproductions were found and repaired by this instrument. An audit that prints a clean line over files it never opened is worse than no audit. Only the *wording around* the vacuous state changed; the state, the exit code and the refusal to certify are byte-identical |
| `audit_abstract_overlap.js` `UNMEASURED: n summaries … These are NOT clean; nothing was compared against them` | Real, and now **six named files** rather than a count. Naming them is what half 2 of §2 requires |
| `audit_abstract_overlap.js` `literature/_pdf` in the root list | Retired directory, but searching one that is absent costs one `existsSync` and **adds coverage if anyone ever puts a shelf there**. Removing it would narrow the audit's population, which is the wrong direction. Commented in place |
| `oracle/check_register.md` — **no edit at all** | Swept row by row. `CHK-02` (measures overlap, classifies nothing), `CHK-13` (containment), `CHK-30` (reproduction), `CHK-37` (ignore probe) are all real and none reports an absent PDF as a finding. `CHK-01`'s `literature/_pdf/` path-segment exemption is inert and costs nothing. **Zero check rows added or removed** — `SRC-2` lives under `CHK-31`, which already names the whole tool |
| `verify_corpus.js` `resolveSource()`, the alias mechanism, `tools/source_roots.local`, the `.example` | Kept in full, as the brief requires. The copyright audit legitimately needs them and the author's machine resolves through them |
| `unconfigured` vs `broken` inside the resolver | Kept, and the comment now says why: **`DIV` must not call an absent tree an upstream withdrawal.** Before the distinction existed a clone reported 25 files as `withdrawn`, which is an upstream event that had not happened. It survives for `DIV`, not because a reader is owed a number |
| `PTH/A3`, `PRV-2` divergence, `DUP-4`, `DIV` unstrippable, `NAM-13`, the `DIV` state-record `VACUOUS` | The five surviving REPORTs and the one FAIL. None is about a PDF. Not mine and not touched |

---

## 4. The self-test, which is where a ruling like this survives or does not

Seven cases asserted the old three-state contract by name. They are replaced by five, and one of them
is written as a **prohibition** rather than an expectation, because the failure mode here is somebody
re-adding the count in six months because it seems useful to know.

| Case | Asserts |
|---|---|
| 1 | A Windows path in a `Source:` cell is MALFORMED and turns `SRC-1` red |
| 2 | A bare leaf with no directory is MALFORMED and turns `SRC-1` red |
| 3 | An alias the shipped `.example` does not declare turns `SRC-2` red |
| 4 | **`SRC` returns the SAME verdicts with every root configured and with none.** The regression that matters: a check whose answer moves with the machine is a check that reports the machine and calls it the corpus |
| 5 | **A machine that can open NO source produces no `FAIL` and no `REPORT` in `SRC`.** The prohibition, stated so that re-adding the count breaks a named test |

`SELF-TEST: PASS (23/23)` on the author tree and in the unconfigured clone.

One thing the new cases required and it is worth recording: `japanese-miracle:aoki.md` — an alias with
no directory after it — is **well formed**, because in `<alias>:<path>` the alias *is* the tree. The
no-bare-leaf rule applies to the in-repository form only. The first draft failed two of its own cases
on that and the fixture caught it rather than the shelf.

---

## 5. Sub-step 2.11, the PDF pull — **retired**

**It is dead, and it had become worse than dead: it was a permanent open debt that three documents
pointed at as the next thing to do.**

Its stated purpose was to give the abstract-overlap audit a population to measure. **The audit has
one.** 447 source PDFs across three configured roots pair to **160 of the 166** summaries carrying an
abstract, and it runs to a known-answer test on both the population and the finding set. W5-3 reached
the same conclusion at §10 from the measurement side and routed the recommendation; this seat lands it.

Running it now would fetch material this project already reaches, into a directory `RG-9` forbids
tracking, to close a gap that measurement shows is closed. **And the six summaries it could not close
are not files it could ever have found**: three UN treaty texts, a Gutenberg ebook, an econlib HTML
entry and a web article. Their sources were never PDFs.

**Landed as a retirement, not as a silence:**

- `lunar-oracle-gameplan.md` §Step 2 sub-steps — a struck-through `~~2.11~~` row with the full reason,
  naming what it was blocking and why each blocker is now closed by other means.
- `lunar-oracle-gameplan.md` loose end **A6** — moved from `OPEN. Waits on 2.11's orphan list` to
  `CLOSED at W5-6`, stating that its own close condition could never have closed it.
- `oracle/release_gate.md` `RG-1` — retired with it, struck through and kept in place.
- The gameplan's *"Owed to the author"* paragraph — `(waits on 2.11's orphan list)` → `(closed at
  W5-6: 2.11 is retired and the residue is six named summaries, RG-2)`.

## 6. `BC-19` — does the fact still earn its place?

**Yes, but not the fact it was recording.** Its probe was `test -d literature/_pdf`, a directory that
2.11 would have created and never did, so **BC-19 returned `false` on every machine that has ever run
it** — including the author's. A bootstrap fact with one possible value is not a fact.

Its justification was that the author's `literature/` and a clone's are *"permanently different trees
with the same name"*, and that a session that cannot tell which it is in *"will offer a reader a source
a clone does not have."* **The premise is false.** `literature/` is the same 169 summaries in both. The
thing that genuinely differs sits entirely outside `literature/`.

So the fact is kept and re-pointed at what actually varies — whether this machine can reach the source
publications — because one real thing turns on it: the audit must know, before it runs, whether it is
about to measure or about to report `VACUOUS`. It is reported in that language and never in the
language of absence.

---

## Not mine

| # | To | What |
|---|---|---|
| N1 | `CLAUDE.md`'s holder | **Phase 4 group 4 implements BC-19 as `test -d literature/_pdf && … echo "BC-19: source PDFs present" \|\| echo "BC-19: source PDFs absent"`.** `oracle/bootstrap_contract.md` no longer says that. `CLAUDE.md`'s own rule is that the contract is the statement and this file is the bug. Replacement: probe `tools/source_roots.local` and report *this machine is/is not configured for the copyright audit*, never *source PDFs absent* |
| N2 | `README.md`'s holder (The Writer) | Lines ~112–135 are **three stale figures and one retired sub-step**: *"112 of 168 summaries had a source PDF to test against"*, *"56 of the 168 could not be measured at all"*, *"The step that pulls those source PDFs has not run."* Current: **160 of 169 tested, 6 unmeasured and named, 2.11 retired.** The framing needs the ruling applied too — *"A clone does not get the source PDFs"* is true and reads as a deficiency |
| N3 | `oracle/tests/readme_suite.md`'s owner | `RDM-14` cites *56 of 169 unmeasured* (it is **six**) and its close condition is *"2.11 has run"* (**2.11 is retired**). `RDM-15` cites *both `PRV-15` classes empty* (**3 + 6 members now**). Both RED rows stand on premises that have moved. **Neither may be greened by editing it** — they need re-arguing, and the suite is not in `run_suite.js`'s `SUITES` so nothing observes them |
| N4 | `oracle/tests/bootstrap_suite.md`'s owner | `BSH-4` is **green** against BC-19's retired form: *"`literature/_pdf` does not exist, `pdfs_present=false` … sub-step 2.11's PDF pull has not run, so `false` is the true value today."* Green against a fact that is no longer the fact |
| N5 | `oracle/tests/corpus_suite.md`'s owner | Two things. (a) **`SLOT-B / 2.10` should be retired with 2.11** — twelve assertions against a landed PDF store that will now never exist. (b) **Its cell claims `PUL-1` to `PUL-12` are "FILLED … §8.2" and `grep -n 'PUL-' corpus_suite.md` returns exactly that one cell.** The twelve rows are not in the file. A suite claiming rows it does not hold is its own defect and I did not want to touch it from outside |
| N6 | `oracle/install_state.md` / `oracle/first_run.md` owner | The `pdfs_present` field is fed *"from the `literature/_pdf` probe"* and its named consumer is **the answering loop**, which *"treats it as `false` and says so in its report line."* Under this ruling the answering loop has no business mentioning PDFs at all — **it never needs one to answer.** `install_state.md` §10 already ships this field with a deletion criterion; re-point it at `tools/source_roots.local` for the audit's benefit, or delete it and drop the answering loop's report line. Q-STATE-FACTS = 4 moves if it is deleted |
| N7 | The orchestrator | **`tools/source_roots.local.example` was edited and is not in my write set** (W8, §3.3). Declared, diffed above, one file inside `tools/`, revertible. My judgement was that shipping a tracked file documenting a contract the tool no longer implements — in the exact wording the ruling names — was the worse failure |
| N8 | — | The four `af7abec` standing failures (`PTH-13`, `MRG-4b`, `MRG-9`, `MRG-10`) and the 34 `RFX-*` router-retirement failures are untouched and still red. `PTH/A3` in `verify_corpus` is likewise not mine |

---

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

**No register rows.** `SRC-2` is a new assertion **inside** `tools/verify_corpus.js`, which
`CHK-31` already names as one artifact; a second row for one clause of one tool is the `CHK-13` defect
by name. Self-test cases moved 22 → 23 and are not suite rows; `run_suite.js` is unchanged at 148 rows
and 43 hard failures.
