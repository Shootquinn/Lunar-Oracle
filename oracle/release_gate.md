# The public release gate — sub-step 6.15

**This file writes the assertions. It does not open the gate.**

Public release is an irreversible external act. Once the repository is public, a corpus file carrying
a publisher's copyrighted text has been published by this project, and no later commit unpublishes
it. **The author releases. This document decides only whether the preconditions hold**, and today
they do not: **eight of sixteen gates are NOT MET**, and one of those eight is the licence file.

**Gate version: 1.** Measured at `HEAD = 99d3601`, 2026-08-28, over a 169-file corpus.

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
to catch, and it has a live instance that reproduces in one command:

```
$ node tools/audit_abstract_overlap.js literature 10
tested 0 summaries with a paired PDF and an abstract
skipped: 0 with no ## Abstract section, 0 with no readable paired PDF
median overlap n/a%

AT OR ABOVE 10% VERBATIM: 0
```

**Zero findings.** The corpus holds 169 summaries and the tool pairs each `x.md` with a sibling
`x.pdf`; `literature/` holds no PDFs, so the tool tests nothing and reports nothing, and the last line
reads exactly as it would over a corpus that had been audited and found clean. A gate that reads that
output as a pass has passed on a measurement that was never taken.

The same shape, one layer up, is the honest statement of Open Question 8 as its own auditor wrote it:
*the audit is complete over the 112 summaries whose source is on disk, and it has never been attempted
on the other 56.* **Fifty-six of one hundred and sixty-nine.** Fifty of those fifty-six are
Scenario-Explorer-origin and are disproportionately the long Comprehensive Technical Summary format,
which has more room for transcription, not less.

Every gate below that reports a count therefore reports **three** numbers — measured, findings, and
**unmeasurable** — and a gate whose unmeasurable count is greater than zero is `NOT MET` regardless of
its findings count.

---

## 3. The gates

Sixteen. Each names the command that decides it, the observation that would falsify it, and its state
as measured this session. **Conjunctive: all sixteen, or the gate is shut.**

### 3.1 First: the untested summaries get tested

| Id | Precondition | Command that decides it | Measured 2026-08-28 |
|---|---|---|---|
| **RG-1** | Source PDFs for the whole shelf are on disk, so the audit has a population | `test -d literature/_pdf && find literature/_pdf -iname '*.pdf' \| wc -l` — must equal or exceed the count of summaries claiming a PDF source in `cr_scratch/merge_plan.tsv` | **NOT MET.** `literature/_pdf` does not exist. **Sub-step 2.11's pull has not run.** The 112 PDFs that do exist are under `_intake/japanese-miracle/lit/`, which is a staging area and not the shelf |
| **RG-2** | The abstract-overlap audit has been re-run over the whole shelf, and the unmeasurable count is **zero** | `node tools/audit_abstract_overlap.js literature 10`, read for all three numbers. Falsified by a run whose `tested` count is less than the corpus size | **NOT MET.** `tested 0`, `findings 0`, **unmeasurable 169**. The 2.12 audit measured `tested 112, findings 8, unmeasurable 56` at `899e0ddfb70ed83f` over 168 files, using a hardlinked stage built outside the repository. That stage is how the audit was possible at all, and rebuilding it is the auditor's instruction: *run 2.11, then re-run this audit unchanged* |
| **RG-3** | The re-run reproduces the eight known findings, so the instrument is known to still work | The eight are `prettyman-2006` 100.0, `levin-2025` 95.6, `mcleod-2017` 74.0, `castillo-rogez-2022` 54.1, `andrews-hanna-2025` 40.9, `hagerty-2011` 39.4, `lawrence-2003` 11.4, `wilson-2018` 11.2. Falsified by a re-run returning a different set over the same 112 | **UNMEASURABLE** until RG-1. The figure set has reproduced across three independent runs — The Engineer at Step 0, The Fact-Checker at Wave 1 on a heading-relaxed build, and 2.12 at two digests — and a fourth run that did not reproduce it would mean the instrument changed, not the corpus |
| **RG-4** | The instrument's own known defect is accounted for | The repaired terminator `(?=^##[ \t]\|$(?![\s\S]))` captures **to the end of the file** where `## Abstract` is followed only by `###` subsections; seven files do this. The error **deflates** — a 150-shingle abstract diluted into a 3,000-shingle body reads near zero — so it cannot manufacture a finding, and on this corpus it hid none: re-run abstract-only, the maximum outside the eight is 8.7% (`ehricke-1984`). Falsified by a `≥1%` tail read as signal | **MET as a known limit, NOT as a fix.** The defect is real, characterised, and routed to The Software Engineer. It is `MET` here because a deflating instrument cannot let contamination through; it would be `NOT MET` if it inflated |

### 3.2 Then: the contaminated set is cleared or marked

| Id | Precondition | Command that decides it | Measured 2026-08-28 |
|---|---|---|---|
| **RG-5** | Every file the audit flags is **cleared or marked**, and the decision is recorded per file | For each of the finding set: either the file no longer reproduces its source above threshold, or it carries an explicit marking and a licence basis. Falsified by a file that is neither | **NOT MET, and it is one file, not thirteen and not eight.** Seven of the eight declare the reproduction in their own section heading, in five distinct forms, and three of those seven are open-licensed at source and say so — `mcleod-2017` (MDPI open access), `castillo-rogez-2022` (CC BY 4.0), `andrews-hanna-2025` (Nature Open Access). **`prettyman-2006` is the row where the marking does not settle it**: a full-length 100.0% verbatim AGU abstract whose own provenance block prints *"Copyright 2006 by the American Geophysical Union"*. Marked, attributed, and still not this project's to dedicate. **`levin-2025` at 95.6%, also AGU, is the same shape one step down** |
| **RG-6** | The two AGU files are rewritten or explicitly excepted, and the decision is the author's | Rewriting is 2.12's own recommendation and its stated cost is an hour: *rewriting those two removes the question instead of managing it, which is cheaper than any notice file that grows a line each time this recurs*. The alternative is a `NOTICE.md` exception naming both, which is the `lsei/NOTICE.md` precedent and which this gate accepts | **NOT MET.** Neither has been rewritten and no notice names them. **This is the author's decision and not this gate's** — the gate asserts only that one of the two dispositions exists |
| **RG-7** | Every summary carries a licence class, so the claim is per file rather than in aggregate | `grep -rlE '^Licence:' literature/ \| wc -l` must equal the corpus size, and both `PRV-15` classes — `own-summary` and `contains-transcribed-source-text` — must have members | **NOT MET.** Measured: **0** of 169. `PRV-15` is **vacuously green**: it asserts a partition over a population in which neither class has a single member, and it has been in that state since Wave 1. A register row that cannot go red is `CHK-03`, and this one sits on the licence question |
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
| **RG-14** | A `LICENSE` file exists at the repository root and is tracked | `git ls-files \| grep -cE '^(LICENSE\|LICENCE)'` | **NOT MET.** Measured: **0**. There is no `LICENSE` and no `NOTICE.md` at this repository's root. **Under A1 the repository is public, and a public repository with no licence file is all-rights-reserved by default** — which is not what a project that intends a public-domain dedication means, and is the single cheapest gate on this list to close. `lsei/LICENSE` (the Unlicense, verbatim) and `lsei/NOTICE.md` (one named exception, described in full) are the precedent and they are in another repository |
| **RG-15** | `README.md` has landed, is tracked, and has been through 6.14 | `git ls-files README.md`; `oracle/tests/readme_suite.md` bound and its RED rows closed | **NOT MET.** `README.md` exists on disk at 12,063 bytes and **`git ls-files README.md` returns nothing — it is untracked.** `oracle/tests/readme_suite.md` was written at 6.11 this session and carries two RED rows, `RDM-14` (the README cannot call the corpus clear while 56 of 169 are unmeasured) and `RDM-15` (`PRV-15`'s classes are empty), both of which close only when RG-2 and RG-7 close |
| **RG-16** | The three suites written this wave are wired to the runner, and the run is not all-`UNRUN` | `node oracle/tests/run_suite.js` | **NOT MET.** Measured: **455 rows, 33 pass, 4 fail, 418 unrun**, exit 1. Of the 418: 7 DEFERRED with a named blocker, 0 VACUOUS, **411 with no executable binding at all.** `oracle/tests/bootstrap_suite.md` (61), `oracle/tests/first_run_suite.md` (28) and `oracle/tests/readme_suite.md` (26) are **not in `SUITES`** and contribute none of the 455. **The four standing failures are argued in `af7abec` and are not to be silenced to open this gate** — a gate cleared by editing the test that blocked it is not a gate |

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
| 1 | RG-1 source PDFs on disk | **NOT MET** — 2.11 has not run |
| 2 | RG-2 audit re-run, unmeasurable zero | **NOT MET** — 169 unmeasurable today, 56 at the last real run |
| 3 | RG-3 eight findings reproduce | unmeasurable until RG-1 |
| 4 | RG-4 instrument defect accounted for | MET as a known deflating limit |
| 5 | RG-5 every flagged file cleared or marked | **NOT MET** — one file to decide, `prettyman-2006` |
| 6 | RG-6 the two AGU files dispositioned | **NOT MET** — author's decision |
| 7 | RG-7 `PRV-15` licence classes filled | **NOT MET** — 0 of 169 |
| 8 | RG-8 labels agree with the audit | unmeasurable until RG-7 |
| 9 | RG-9 no tracked source carrier | **MET** — 497 scanned, 0 findings |
| 10 | RG-10 ignore rules asserted over a sized probe | **MET** — 25 probes, 0 open |
| 11 | RG-11 size gate declares its blindness | **MET** — 29 of 112 blind, printed |
| 12 | RG-12 hooks wired, executable, LF | **MET** — 4 at 100755, eol lf |
| 13 | RG-13 bypass ledger clean | **MET** — no ledger on this install |
| 14 | RG-14 `LICENSE` at root, tracked | **NOT MET** — no licence file exists |
| 15 | RG-15 `README.md` tracked and revised | **NOT MET** — untracked; two RED suite rows |
| 16 | RG-16 suites wired, run not all-UNRUN | **NOT MET** — 411 rows with no binding; three new suites unwired |

**Eight met, six not met, two unmeasurable.** The gate is shut, and the shortest path through it is
the one 2.12 already named: **run 2.11, then re-run the audit unchanged.** RG-14 is independent of all
of that and is one file.

---

## 6. Two figures this gate refuses to reconcile

Named rather than averaged, because reconciling them silently is how a wrong number survives.

**Accumulator row A6 states the unmeasurable population as 57.** The 2.12 audit measures **50**
Scenario-Explorer-origin unmeasurable, or **56** unmeasurable from all origins, at read-digest
`899e0ddfb70ed83f` over a 168-file corpus that did not exist when A6 was written. The shelf now holds
**169**. These are different populations at different digests and **they are not comparable.** A6
needs restating against a current digest or striking and re-deriving after 2.11, and that is The
Manager's call or the author's, not this gate's. The gate's own figure is whatever
`audit_abstract_overlap.js` reports on the day RG-2 is run, with its command and digest beside it.

**The `108` / `103` / `112` denominators.** Loose end A4 carries three counts for one audit. The gate
does not choose between them; RG-2 requires a re-run whose `tested` count equals the corpus size,
which makes every historical denominator irrelevant rather than requiring one of them to be right.

---

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| Sub-step 2.11 has not run. It is the blocking dependency for RG-1, RG-2, RG-3, RG-8 and both RED rows of `oracle/tests/readme_suite.md`. | 2.11 | The Engineer |
| `prettyman-2006` and `levin-2025`: rewrite or except. 2.12 recommends rewriting and costs it at an hour. | 2.12 | The author |
| There is no `LICENSE` file at this repository's root. Under A1 the repository is public and this is the cheapest gate on the list. RG-14. | 6.13 | The Writer, with this seat on the licence boundary |
| `README.md` is on disk and untracked. RG-15. | 6.13 / 6.14 | The Writer, then The Editor and The Designer |
| The three suites written this wave are not in `run_suite.js`'s `SUITES`. 115 rows contribute nothing to the 455. RG-16. | 2.19 | The Software Engineer |
| The abstract-overlap terminator captures the whole file body where `## Abstract` is followed only by `###` sections. Seven files. Deflates, hides nothing at threshold 10, makes the `≥1%` tail unreadable. RG-4. | 2.12 instrument | The Software Engineer |
| Accumulator A6's population figure is not comparable to the current measurement. §6. | accumulator | The Manager |

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

**No test rows.** The sixteen `RG-` gates are preconditions on an act, not assertions in a suite: each
is decided by a command whose output is read by a person before an irreversible decision, and none is
a row a runner should report `pass` on. Wiring them into `run_suite.js` would make the release gate
something that can be green, which is exactly what it must never be.
