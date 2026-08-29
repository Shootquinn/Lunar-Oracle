# The public release gate — sub-step 6.15

**This file writes the assertions. It does not open the gate.**

Public release is an irreversible external act. Once the repository is public, a corpus file carrying
a publisher's copyrighted text has been published by this project, and no later commit unpublishes
it. **The author releases. This document decides only whether the preconditions hold**, and today
they do not: **three of fifteen gates are NOT MET**, and a fourth is unmeasurable until one of the
three closes.

**Gate version: 2.** Re-measured 2026-08-29 at W5-6 over the same 169-file corpus. Version 1 had
sixteen gates and eight of them not met; **`RG-1` is retired at this version and eight cells are
re-measured**, and §7 records what changed and why so that a reader of version 1 can follow it.
Nothing was cleared by editing its criterion: every cell that moved names the command that moved
it.

---

## 1. The ordering, which is not negotiable

The Engineer's ordering, adopted here verbatim as the structure of §3:

> **The untested summaries get tested, then the contaminated set is cleared, then the repository goes
> public.**

Each step invalidates the evidence of the one before it if run out of order. Clearing a contaminated
set before the untested summaries are tested clears the set you happen to know about; going public
before either is the act that cannot be undone. **§3 is in that order and the gates are conjunctive.**

## 2. The rule that governs every count in this file

> **An unmeasurable population is unmeasured. It is never clear.**

This is not a general principle borrowed from somewhere. It is the specific failure this gate exists
to catch, and at version 1 it had a live instance that reproduced in one command:

```
$ node tools/audit_abstract_overlap.js literature 10          # 2026-08-28, before 8.9
tested 0 summaries with a paired PDF and an abstract
skipped: 0 with no ## Abstract section, 0 with no readable paired PDF
median overlap n/a%

AT OR ABOVE 10% VERBATIM: 0
```

**Zero findings, and it had opened no file at all** — `readdirSync` did not recurse and the corpus
lives one directory down. The last line and the exit code, the only two things a gate consumes, were
byte-identical to a corpus that had been audited and found clean. Sub-step 8.9 repaired it, and the
same command now prints `tested 160 summaries` and `AT OR ABOVE 10% VERBATIM: 6 of 160 tested`, with a
known-answer test that fails if either number moves. The broken output is kept above because the rule
is easier to hold with the instance in front of you.

**AND THE SECOND HALF OF THE RULE, WHICH VERSION 1 GOT WRONG.** Unmeasurable is not clear, and it is
also **not a shortfall in this repository**. Version 1 read *"56 of 169 have no source PDF"* as a debt
the project owed and made `RG-1` a gate on landing PDFs into the tree to pay it. That was backwards.
**The 169 summaries are the deliverable.** The publications behind them are not this project's to
redistribute, are in no clone by design, and are needed by exactly one instrument — this audit, which
must open a publication in order to measure verbatim overlap against it. A machine that cannot open
them cannot run that one check. It is not holding a deficient corpus.

So the rule has two halves and they are both binding:

1. **A run that measured nothing certifies nothing.** `audit_abstract_overlap.js` exits 3 and prints
   `VACUOUS, NOT CLEAN` rather than a zero. That is not negotiable and is what found three
   all-rights-reserved reproductions.
2. **An unmeasurable file is named, with its reason, and the reason is never "the PDF is not on this
   machine."** A count of unmeasurables is not a finding; a named file whose source nobody can produce
   is. There are six and they are listed in `RG-2`.

---

## 3. The gates

Fifteen at version 2, and the sixteenth is retired below rather than deleted. Each names the command
that decides it, the observation that would falsify it, and its state as measured this session.
**Conjunctive: all fifteen, or the gate is shut.**

### 3.1 First: the untested summaries get tested

| Id | Precondition | Command that decides it | Measured 2026-08-28 |
|---|---|---|---|
| **RG-1** | ~~Source PDFs for the whole shelf are on disk, so the audit has a population~~ | — | **RETIRED at version 2, and not by being met.** This gate demanded that source publications be landed *inside the repository tree* at `literature/_pdf/`, as a proxy for the thing that actually matters — that the audit had something to measure. **`RG-2` measures that directly**, so the proxy asserted nothing `RG-2` does not, and it asserted it wrongly: it made a machine holding a complete corpus read as a machine missing 169 files, and it pointed the remedy at putting publishers' PDFs into a repository whose entire containment mechanism (`RG-9` to `RG-11`) exists to keep them out. Its dependency, **sub-step 2.11's PDF pull, is retired with it**: 447 source PDFs across three configured roots already pair to 160 of the 166 summaries carrying an abstract, and no pull can conjure a PDF for a UN treaty or a Gutenberg ebook. Retiring a gate is a visible act and this row stays here saying so |
| **RG-2** | The abstract-overlap audit has been run over the whole shelf, and **every summary is either measured or named individually with the reason it cannot be** — and that reason is never "the source is not on this machine" | `node tools/audit_abstract_overlap.js literature 10`, read for all three numbers and for its exit code. Falsified by a run that exits 3 (vacuous), by a `tested` count that is not accounted for file by file, or by an unmeasurable file with no stated reason | **MET, re-measured 2026-08-29.** `tested 160`, `findings 6`, **unmeasurable 6**, exit 0, and the tool's own §KA known-answer test passes on the population and on the finding set. **The six are named and each has a reason, and no PDF pull would change any of them: their sources were never PDFs.** `henderson-2008-myth-of-miti` (econlib HTML entry, self-declared secondary in-file), `payload-research-starship-cost` (web article), `taylor-1911-scientific-management` (Gutenberg #6435, public domain), and the three UN treaty texts `un-1967-outer-space-treaty`, `un-1972-liability-convention-space-objects`, `un-1979-moon-agreement`. Three further summaries carry no `## Abstract` heading and are a separate reported skip in the ledger. **This cell is `MET` because the population is accounted for, not because the unmeasurable count is zero** — version 1 required zero, which is unreachable for a summary whose source is a treaty, and a gate that can never open is not a gate |
| **RG-3** | The run reproduces a **declared** finding set, so the instrument is known to still work | The tool's own `§KA` declares the expected set and FAILS on a mismatch in either direction on every run — a shrinking finding set and a growing one are both named failures. Falsified by a run whose finding set differs from the declaration with no re-declaration in the same edit | **MET, re-measured 2026-08-29.** The declared set is six: `mcleod-2017` 74.0, `castillo-rogez-2022` 54.1, `andrews-hanna-2025` 40.9, `lawrence-2003` 11.4, `nasa-2025-fission-surface-power-directive` 11.3, `wilson-2018` 11.2, and the run reproduces it exactly. **It is six and not eight because three were repaired**: `prettyman-2006` (100.0, AGU), `levin-2025` (95.6, AGU) and `hagerty-2011` (39.4) were rewritten at 8.8 and now measure below threshold; `nasa-2025` is a member the earlier list never carried. This is stronger than version 1's criterion, which was a human comparison against a list in a document; it is now a known-answer test the instrument runs on itself |
| **RG-4** | The instrument's own known defect is accounted for | The repaired terminator `(?=^##[ \t]\|$(?![\s\S]))` captures **to the end of the file** where `## Abstract` is followed only by `###` subsections; seven files do this. The error **deflates** — a 150-shingle abstract diluted into a 3,000-shingle body reads near zero — so it cannot manufacture a finding, and on this corpus it hid none: re-run abstract-only, the maximum outside the eight is 8.7% (`ehricke-1984`). Falsified by a `≥1%` tail read as signal | **MET as a known limit, NOT as a fix.** The defect is real, characterised, and routed to The Software Engineer. It is `MET` here because a deflating instrument cannot let contamination through; it would be `NOT MET` if it inflated |

### 3.2 Then: the contaminated set is cleared or marked

| Id | Precondition | Command that decides it | Measured 2026-08-28 |
|---|---|---|---|
| **RG-5** | Every file the audit flags is **cleared or marked**, and the decision is recorded per file | For each of the finding set: either the file no longer reproduces its source above threshold, or it carries an explicit marking and a licence basis **in the file itself**. Falsified by a flagged file that is neither | **MET, re-measured 2026-08-29.** `grep -rli 'licence:' literature/` returns **nine** files and they are exactly the six the audit flags plus the three it used to flag. Each carries a `Licence:` class and a basis: three are open-licensed at source and say so — `mcleod-2017` (MDPI open access), `castillo-rogez-2022` (CC BY 4.0), `andrews-hanna-2025` (Nature Open Access); `nasa-2025` is a US Government work; `lawrence-2003` and `wilson-2018` are project prose with de minimis clause carryover. **The three that marking could not settle were repaired instead** — see RG-6 |
| **RG-6** | The AGU files are rewritten or explicitly excepted, and the decision is the author's | The gate asserts only that one of the two dispositions exists. Falsified by an all-rights-reserved reproduction still measuring above threshold with no notice naming it | **MET, re-measured 2026-08-29.** Both were **rewritten** at 8.8, which was 2.12's own recommendation, and a third the gate never named went with them: `prettyman-2006` (was 100.0), `levin-2025` (was 95.6) and `hagerty-2011` (was 39.4) are all below threshold and absent from the finding set. The citation and the copyright line are kept as attribution. No `NOTICE.md` exception was needed because no exception is outstanding |
| **RG-7** | Every summary carries a licence class, so the claim is per file rather than in aggregate | `grep -rli 'licence:' literature/ \| wc -l` must equal the corpus size, and both `PRV-15` classes — `own-summary` and `contains-transcribed-source-text` — must have members | **NOT MET, re-measured 2026-08-29, and it has moved off zero.** Measured: **9** of 169 — 3 `contains-transcribed-source-text`, 6 `own-summary`. **`PRV-15` is no longer vacuously green**: both classes have members, so the partition it asserts can now fail, which it could not do at any point between Wave 1 and 8.8. The remaining 160 are a bulk pass over files the audit measured and cleared. **The six of `RG-2` must not be included in that pass** — no measurement supports a class for them and a label with nothing behind it is what `RG-8` exists to catch. Version 1's command searched for `^Licence:` at column 0 and would have returned 0 against all nine; the key is written as a provenance bullet |
| **RG-8** | The count of `contains-transcribed-source-text` equals the audit's finding set | Once RG-7 is met: the two sets are compared by filename, not by count. Falsified by a file labelled `own-summary` that the audit flags, or a file labelled `contains-transcribed-source-text` that it does not | **UNMEASURABLE** until RG-7. Named because the two mechanisms are independent — one is a hand-applied label and one is a shingle count — and **agreement between them is the evidence, not either alone** |

### 3.3 The containment mechanism is installed and asserted

| Id | Precondition | Command that decides it | Measured 2026-08-28 |
|---|---|---|---|
| **RG-9** | No source carrier is tracked, over the **whole tree** and not only the index | `node tools/check_no_sources.js --tree` | **MET.** `scope=tree files_scanned=497 findings=0 skipped=0`, exit 0. Independently: `git ls-files \| grep -icE '\.(pdf\|djvu\|epub\|docx\|doc\|pptx\|ppt\|ps\|tif\|tiff)$'` → **0**. Two instruments, one answer. **`--staged` is not sufficient and the tool says so**: run with no scope it reports `files_scanned=0 -- SCANNED NOTHING. this is not a clean result. Nothing was examined, so nothing is asserted` |
| **RG-10** | The `.gitignore` source-carrier rules are asserted over a probe set that declares its own size | `node tools/check_no_sources.js --ignore-probe` | **MET.** `probe set size=25 open=0`, exit 0. Covers the eight-path repository-wide `PDF-2` probe, two case permutations (`x.PDF`, `x.Pdf` — case is handled by character class `*.[pP][dD][fF]`, not by a `*.pdf`/`*.PDF` pair, which covers two of eight permutations and misses `x.Pdf`), and fifteen `PDF-3` carriers. The tool reports its own probe-set size because **a shrinking probe set is the failure it exists to prevent** |
| **RG-11** | The size gate's blindness is declared in its own output and not concealed | The tool prints it on every run | **MET.** `size gate is a BACKSTOP: at 500000 bytes it does not see 29 of the 112 _intake/ PDFs measured 2026-08-28 (25.9%)`. The populations genuinely overlap — smallest `_intake/` PDF 81,677 bytes, largest summary 84,767 — so **no threshold at any value separates them**. A gate that lets a quarter of its target through while printing a success line is the `CHK-03` shape in a different costume, and the cheapest defence is that it reports its own blindness in the same breath as its result |
| **RG-12** | The trigger is wired, is executable on a clone, and survives line-ending translation | `git config --get core.hooksPath`; `git ls-files -s tools/githooks/`; `git check-attr eol -- tools/githooks/*` | **MET.** `core.hooksPath=tools/githooks`. All four hooks at **`100755`** — `dispatch.js`, `merge-gate`, `post-commit`, `pre-commit`. `eol: lf` on all three checked. **All three layers of the family are closed and each was live**: hooks are not cloned (E1, closed by `core.hooksPath`), a hook committed at `100644` is inert on a clone (HK-2 — both hooks *were* staged at 100644 on the first `git add`, because `core.filemode` is `false` here), and a hook committed with CRLF fails on Linux with `bad interpreter` (closed at 2.20 by `.gitattributes`) |
| **RG-13** | No commit in this working copy bypassed the hooks, or every bypass has been reviewed | `test -s .git/hooks-bypassed && wc -l .git/hooks-bypassed` | **MET.** No ledger file; zero bypasses on this install. **The ledger is per install and is never cloned** — it lives under `.git/` — so a bypass is visible only to the install that made it, and only if something reads the file. `BC-20` is what reads it. `--no-verify` is a legitimate operation with an illegitimate failure mode: it skips *every* `pre-commit` row at once, so one deliberate bypass of one inconvenient check silently carries the containment check out with it |

### 3.4 Then: the public-facing prose, and the licence

| Id | Precondition | Command that decides it | Measured 2026-08-28 |
|---|---|---|---|
| **RG-14** | A `LICENSE` file exists at the repository root and is tracked | `git ls-files \| grep -cE '^(LICENSE\|LICENCE)'` | **MET, re-measured 2026-08-29.** Measured: **1**. `LICENSE` is tracked at the root. Version 1 measured 0 and called this the cheapest gate on the list to close; it was closed. `lsei/LICENSE` (the Unlicense, verbatim) and `lsei/NOTICE.md` were the precedent. **This cell asserts existence and tracking only** — which dedication it is remains the author's, and whether any file needs a notice exception is `RG-6`, which is now met with none outstanding |
| **RG-15** | `README.md` has landed, is tracked, and has been through 6.14 | `git ls-files README.md`; `oracle/tests/readme_suite.md` bound and its RED rows closed | **NOT MET, and the half that remains is not the tracking half.** `git ls-files README.md` now returns the file: **it is tracked**, re-measured 2026-08-29. `oracle/tests/readme_suite.md` is still not in `run_suite.js`'s `SUITES`, contributes no rows to the run, and its two RED rows are therefore unobserved rather than closed. **`RDM-14`'s premise has moved and the suite has not been told**: it reads *"the README cannot call the corpus clear while 56 of 169 are unmeasured"* and **the number is six**, each named with a reason in `RG-2`. `RDM-15` reads *"`PRV-15`'s classes are empty"* and both classes now have members — 3 `contains-transcribed-source-text`, 6 `own-summary`. **Neither row may be greened by editing it here**: `oracle/tests/**` belongs to another seat, this cell records the moved premise and routes it, and until the suite is wired and re-argued the gate is shut. The README's own prose still states *112 of 168 tested*, *56 unmeasured* and *"the step that pulls those source PDFs has not run"* — three stale claims and one retired sub-step, routed with it |
| **RG-16** | The three suites written this wave are wired to the runner, and the run is not all-`UNRUN` | `node oracle/tests/run_suite.js` | **NOT MET, re-measured 2026-08-29.** Measured: **148 rows, 101 pass, 43 fail, 4 unrun**, exit 1. All four unrun are DEFERRED with a named reason and **0 rows have no binding at all**, against version 1's 411 — the row count fell because unbound rows were removed, not because tests were. `oracle/tests/bootstrap_suite.md`, `oracle/tests/first_run_suite.md` and `oracle/tests/readme_suite.md` are **still not in `SUITES`** and contribute none of the 148. Of the 43 failures, **34 are `RFX-*`**, the router retirement at 8.1, and four are the standing `af7abec` set. **Neither group is to be silenced to open this gate** — a gate cleared by editing the test that blocked it is not a gate |

---

## 4. What this gate never does

Closed, because each is a thing somebody will propose in order to ship.

1. **Never opens itself.** No command in this file releases anything. The `gh repo edit --visibility
   public` that would is deliberately not printed here, because a document that contains the command
   is a document somebody can run.
2. **Never reads a zero-finding run as a clean run.** §2. A tool that tested nothing found nothing,
   and the two lines look identical.
3. **Never treats a declared marking as a licence.** Seven of the eight findings are marked at the
   point of use. Marking answers *did the project hide it*; it does not answer *may the project
   dedicate it*. `prettyman-2006` is marked, attributed, and still carries a publisher's copyright
   line.
4. **Never accepts an aggregate where a per-file label is owed.** RG-7 and RG-8 exist because "the
   corpus is clean" is a claim no reader can check and "this file is `own-summary`" is one they can.
   The same rule runs the other way and version 1 broke it: **an aggregate count of unmeasurable
   files is not a finding either.** Six named files with six stated reasons is a finding; "56 of 169
   unmeasured" is a number that made a complete corpus read as a deficient one.
4b. **Never treats the absence of a source publication as a defect in this repository.** Added at
   version 2 on the author's ruling. The 169 summaries are the deliverable; the publications behind
   them were never going to be in here, are needed by exactly one instrument, and a machine that
   cannot open them is holding a whole corpus. What the gate still refuses, and refuses absolutely,
   is a *clean* result from a run that opened nothing: §2 rule 1, `exit 3`, `VACUOUS, NOT CLEAN`.
   **Vacuous stays vacuous. Absent stops being a shortfall.** The two are not the same relaxation and
   only the second one was made.
5. **Never silences a failing test to clear a gate.** RG-16. The four standing failures are argued
   on the record and belong to their authors.
6. **Never clears a gate on a file it has not measured.** Every `MET` above carries the command that
   produced it and the digest it was produced at.
7. **Never re-decides `prettyman-2006`.** RG-6 asserts that a disposition exists. Which one is the
   author's.

---

## 5. State of the gate, in one table

| | Gate | State |
|---|---|---|
| — | ~~RG-1 source PDFs on disk~~ | **RETIRED at version 2** — a proxy for RG-2 that RG-2 measures directly, and it read a complete corpus as a deficient one. 2.11 retired with it |
| 2 | RG-2 audit run, every summary measured or named | **MET** — tested 160, findings 6, six unmeasurable named with reasons, exit 0 |
| 3 | RG-3 the declared finding set reproduces | **MET** — six declared in the tool's §KA, checked on every run, both directions |
| 4 | RG-4 instrument defect accounted for | MET as a known deflating limit |
| 5 | RG-5 every flagged file cleared or marked | **MET** — 9 files carry a `Licence:` class and a basis |
| 6 | RG-6 the AGU files dispositioned | **MET** — three rewritten at 8.8, none above threshold |
| 7 | RG-7 `PRV-15` licence classes filled | **NOT MET** — 9 of 169, but both classes non-empty for the first time |
| 8 | RG-8 labels agree with the audit | unmeasurable until RG-7 |
| 9 | RG-9 no tracked source carrier | **MET** — 497 scanned, 0 findings |
| 10 | RG-10 ignore rules asserted over a sized probe | **MET** — 25 probes, 0 open |
| 11 | RG-11 size gate declares its blindness | **MET** — 29 of 112 blind, printed |
| 12 | RG-12 hooks wired, executable, LF | **MET** — 4 at 100755, eol lf |
| 13 | RG-13 bypass ledger clean | **MET** — no ledger on this install |
| 14 | RG-14 `LICENSE` at root, tracked | **MET** — 1, tracked |
| 15 | RG-15 `README.md` tracked and revised | **NOT MET** — tracked now; suite unwired, two RED rows on moved premises |
| 16 | RG-16 suites wired, run not all-UNRUN | **NOT MET** — 43 failures, three suites still unwired |

**Eleven met, three not met, one unmeasurable.** The gate is shut. **The shortest path through it is
no longer a PDF pull** — version 1 said *run 2.11, then re-run the audit unchanged*, and the audit has
since been repaired and run without it. What is left is `RG-7` (label the remaining 160, and do not
label the six), which then makes `RG-8` measurable, and `RG-15` (wire the three suites, re-argue two
rows whose premises have moved, correct three stale figures in the README).

---

## 6. Two figures this gate refuses to reconcile

Named rather than averaged, because reconciling them silently is how a wrong number survives.

**Accumulator row A6 states the unmeasurable population as 57.** The 2.12 audit measured **50**
Scenario-Explorer-origin unmeasurable, or **56** from all origins, at read-digest `899e0ddfb70ed83f`
over a 168-file corpus that did not exist when A6 was written. The shelf holds **169** and the current
figure, at the run recorded in `RG-2`, is **six, each named**. These are different populations at
different digests and **they are still not comparable** — but the reconciliation A6 was waiting for
was *"after 2.11 runs"*, and 2.11 is retired, so waiting is no longer an option that leads anywhere.
A6 needs striking and re-deriving against `RG-2`'s six, and that is The Manager's call or the author's,
not this gate's.

**The `108` / `103` / `112` denominators.** Loose end A4 carries three counts for one audit. The gate
does not choose between them; RG-2 requires a re-run whose `tested` count equals the corpus size,
which makes every historical denominator irrelevant rather than requiring one of them to be right.

---

## 7. What changed at version 2, and what did not

Version 1 was measured on 2026-08-28. Everything below was re-measured on 2026-08-29 with the command
named in the cell. **No gate was cleared by editing its criterion**, and where a criterion did change
it is named here with the reason.

**One gate retired.** `RG-1` demanded source publications be landed inside the repository tree as a
proxy for *the audit has a population*. `RG-2` measures that directly, so the proxy added nothing; and
it added something harmful, because a machine holding the entire deliverable reported as a machine
missing 169 files, and the remedy it pointed at was putting publishers' PDFs into a repository whose
containment gates exist to keep them out. **Sub-step 2.11, the PDF pull it depended on, is retired with
it.** 447 source PDFs across three configured roots already pair to 160 of the 166 summaries that carry
an abstract, and a pull cannot conjure a PDF for a UN treaty or a Gutenberg ebook.

**One criterion restated.** `RG-2` required the unmeasurable count to be **zero**. That is unreachable
for a summary whose source was never a PDF, so as written the gate could never open — and a gate that
can never open stops being read. It now requires every summary to be **either measured or named
individually with the reason it cannot be**, and it forbids that reason being *"the source is not on
this machine."* That is stricter per file and closable in principle, and the six are in the cell.

**Six cells re-measured with no change of criterion**: `RG-3`, `RG-5`, `RG-6`, `RG-7`, `RG-14`, `RG-16`.
Four of them moved to `MET` because the work behind them was done at 8.8 and 8.9 — three
all-rights-reserved reproductions rewritten, the audit repaired from opening zero files to opening 160,
`LICENSE` landed and tracked. `RG-7` moved off zero without meeting. `RG-16` improved and did not meet.

**Nothing was weakened in the copyright direction, and one thing was hardened.** The audit still exits
3 and prints `VACUOUS, NOT CLEAN` rather than a zero when it opened nothing; `RG-3` is now a
known-answer test the instrument runs on itself rather than a list a person compares by eye, so a
finding that quietly disappears is a named failure; and `RG-5` now requires the licence basis to be **in
the file**, not merely recorded somewhere. What changed is that the **absence of a source publication is
no longer reported as a shortfall in this repository**, because it never was one.

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| **`oracle/tests/readme_suite.md` `RDM-14` and `RDM-15` stand on premises that have moved.** `RDM-14` cites *56 of 169 unmeasured*; the number is **six** and each is named in RG-2. `RDM-15` cites *both `PRV-15` classes empty*; both now have members. Neither may be greened without being re-argued, and neither is this seat's to edit. RG-15. | 6.11 / 2.19 | The suite's owner |
| **`oracle/tests/bootstrap_suite.md` `BSH-4` asserts BC-19 in its retired form** — *"`literature/_pdf` does not exist, `pdfs_present=false` … sub-step 2.11's PDF pull has not run, so `false` is the true value today"*. BC-19 no longer probes that path and 2.11 is retired; the row is green against a fact that is no longer the fact. | 2.14 | The suite's owner |
| **`README.md` §"the corpus is clean" block is three figures stale**: *112 of 168 tested*, *56 unmeasured*, *"the step that pulls those source PDFs has not run"*. Current: 160 of 169 tested, six unmeasured and named, and that step is retired. RG-15. | 6.13 / 6.14 | The Writer |
| **`CLAUDE.md` Phase 4 group 4 implements BC-19 as `test -d literature/_pdf`**, which this document's contract no longer says. `CLAUDE.md`'s own rule is that the contract is the statement and it is the bug. | bootstrap | The seat holding `CLAUDE.md` |
| Sub-step 2.11, the PDF pull, is **retired** here and in the gameplan: it was scaffolding for a measurement that is now taken without it. Recorded rather than left as a permanent open debt. | 2.11 | Closed at W5-6, satisfied by other means |
| The three suites written this wave are not in `run_suite.js`'s `SUITES` and contribute none of the 148 rows. RG-16. | 2.19 | The Software Engineer |
| The abstract-overlap terminator captures the whole file body where `## Abstract` is followed only by `###` sections. Seven files. Deflates, hides nothing at threshold 10, makes the `≥1%` tail unreadable. RG-4. | 2.12 instrument | The Software Engineer |
| Accumulator A6's population figure is not comparable to the current measurement. §6. | accumulator | The Manager |

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

**No test rows.** The fifteen `RG-` gates are preconditions on an act, not assertions in a suite: each
is decided by a command whose output is read by a person before an irreversible decision, and none is
a row a runner should report `pass` on. Wiring them into `run_suite.js` would make the release gate
something that can be green, which is exactly what it must never be.
