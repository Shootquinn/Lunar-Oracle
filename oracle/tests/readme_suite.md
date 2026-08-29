# The `README.md` document test suite — sub-step 6.11

**Written against the contracts, not against the draft.** 6.11 is stage 1 of the four-stage sequence
6.11 → 6.12 → 6.13 → 6.14, and it belongs before the document. It was assigned to this seat mid-wave,
after `README.md` had landed. **This suite was written without opening that file**, for the same
reason the Editor put its 6.5 question in writing before the `CLAUDE.md` draft existed: a suite
written against a draft asserts that the draft is what it is. The deviation is recorded rather than
smoothed — *the document existed before its stage-1 suite, and the suite was written blind to it.*

**The reader is a stranger who cloned the repository.** Every row below asserts an orientation claim
or a licence claim. **None asserts style**, which is The Editor's at 6.14 and The Designer's on the
tree a cloner actually sees.

**26 tests.** Counting rule: rows in the four tables of §§1–4 whose first cell matches
`^[A-Z]{3}-[0-9]+[a-z]?$`, counted over this file. One group: RDM 26.

```
awk '/^\| *[A-Z]{3}-[0-9]+[a-z]? *\|/{c++} END{print c}' oracle/tests/readme_suite.md
```

**Authorities.** `lunar-oracle-gameplan.md` loose end **A5** and its A1 assumption (the repository is
public); `cr_scratch/step2_factchecker_oq8_audit.md` (sub-step 2.12, MERGE-8); the containment
mechanism at 2.14 (MERGE-9); `.gitignore` and the map at 1.1 (ARCH-1); `lsei/README.md` §License and
`lsei/NOTICE.md` as the precedent; `oracle/bootstrap_contract.md` §§1, 3, 5, 6.

---

## 0. How to read this suite

**Status.** `green` = expected to pass once the document exists and the check is bound. `RED` = the
claim the row governs is unsupported by anything on disk today, with an owner and a close condition.
`H` = a human gate. `oracle/tests/run_suite.js` reports every unbound row `UNRUN`, and **`UNRUN IS
NOT PASS`**.

**Every measurement in this file was taken this session and carries its command.** Read-digest and
conditions:

```
HEAD                     99d3601
literature/**/*.md       169 files, eleven folders, plus INDEX.tsv and FIELDS.tsv
tracked source carriers  0        git ls-files | grep -icE '\.(pdf|djvu|epub|docx|doc|pptx|ppt|ps|tif|tiff)$'
tracked non-.md under literature/   2   literature/FIELDS.tsv, literature/INDEX.tsv
files carrying a `Licence:` line    0   grep -rl '^Licence:' literature/
literature/_pdf/         does not exist; ignored by an anchored rule, .gitignore L138
measured                 2026-08-28
```

**The single most important thing this suite does** is refuse to let one sentence be copied. The
Scenario Explorer's licence section once ended *"No third-party PDF, page image or extracted source
text is in this repository."* It was not true of its own corpus, it is loose end **A5**, it was fixed
upstream at `lsei d7889e1`, and **it is not true of this corpus either.** RDM-12 and RDM-13 are that
sentence taken apart into the half this project can assert and the half it cannot.

---

## 1. RDM-1 to RDM-7 — orientation: what a stranger needs in the first screen

Seven tests. The reader has just run `git clone` and is looking at a directory.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| RDM-1 | The README says what the thing **is**, and that there is nothing to start | It states that the Oracle is a Claude session reading this repository under `oracle/answer_contract.md`, and that there is no server, no daemon and nothing to run. A stranger's first hypothesis on seeing `tools/*.js` is that something needs installing, and every minute spent on that hypothesis is spent before the first question | Describe it as a tool or a system without saying what executes it; the reader looks for an entry point that does not exist | green |
| RDM-2 | The README names the two working copies as **clones of upstream authorities**, not as vendored code | `cr-agents/` and `lsei/` are read-only working copies acquired by the bootstrap, never vendored, and `lsei/index.html` is the authority on the model. §8 rule 1 of the contract gives the reason a stranger would otherwise have to guess: *a copy of it here would be a second authority, and a second authority drifts* | List them as project directories; the reader edits one, and the next fetch reports a local-ahead divergence in somebody else's repository | green |
| RDM-3 | The README states that the clone is **not complete** until the bootstrap has run | A fresh clone has no `cr-agents/`, no `lsei/`, and no `.oracle-state.json`. Measured: `.oracle-state.json` is ignored (`git check-ignore` → IGNORED) and neither working copy is tracked. A stranger who counts the top-level directories and finds two missing has been given no way to know that is expected | Say the repository is self-contained; the first session then reports two offline copies and reads as broken | green |
| RDM-4 | The README does not duplicate the bootstrap contract | It points at `oracle/bootstrap_contract.md` and `CLAUDE.md` rather than restating phases, assertions or modes. **Two statements of one contract drift, and the README is the copy nobody re-checks.** The contract itself already rules this shape for `CLAUDE.md`: *where the two disagree, this file is the statement and `CLAUDE.md` is the bug* — and a third statement makes that rule ambiguous | Restate the five degraded modes in the README; the next contract version bump leaves a stale enumeration in the one document a stranger reads first | green |
| RDM-5 | The README states the corpus **size** only with its date and its counting rule, or not at all | Any count is a filename count until somebody says otherwise. Loose end **B5** already established that the obvious candidate is wrong — `182 sources` was a filename count against a true distinct count near 162 to 173 — and the shelf holds **169** `.md` files today at `99d3601`, up from 168 at `af7abec` four commits earlier. A figure that moves between commits, printed without a digest, is a figure that will be wrong and unfalsifiable at the same time | Write `169 summaries` bare; it is a filename count, it is stale within a wave, and nobody re-derives it | green |
| RDM-6 | The README describes the refusal behaviour as normal | The system refuses questions it cannot ground, and a stranger who meets that behaviour without warning reads it as a failure. Same argument as the opening sequence's beat two, in a different register: the README is prose for a reader who has not started a session, so it explains rather than demonstrates | Describe only what the system answers; the first refusal is then a bug report | green |
| RDM-7 | The README's own claims about the tree are true of the tree | Every path it names resolves, and every count it prints is reproducible by a command printed beside it. This is `tdd_method.md` principle 8 applied to a document whose reader cannot check anything else. Note that this is a class of claim `lsei/README.md` got wrong twice — loose end **A8**: line 12 said `literature/` was "all at one level with no subfolders" against a tree holding eight directories | Print a directory listing from memory; A8 is what that produces, and it survived to a public repository | green |

---

## 2. RDM-8 to RDM-15 — the licence pair

Eight tests. **Under A1 the repository is public, so the licence statement has an audience of
strangers and is load-bearing rather than ceremonial.**

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| RDM-8 | The dedication covers **this project's own work**, named item by item | The summaries in `literature/`, the registers under `oracle/`, the instruments under `tools/`, and the gameplan. `lsei/README.md` L24 is the precedent and it enumerates rather than gesturing: *the app, its evidence ledger and coefficients, the summaries in `literature/`, `lunar-scenario-explorer-map.md`, and `report-generator-prompt.md`*. An enumeration can be checked against a tree; "this project's work" cannot | Write "everything here is public domain"; the enumeration is then the reader's job and `cr-agents/` and `lsei/` are inside the sentence | green |
| RDM-9 | The dedication **does not extend to the sources the summaries describe, and cannot** | Stated in those words or equivalent. Each file in `literature/` is this project's own summary of a published work it does not own. This is the sentence the whole licence section exists for, and it is the one The Manager raised as *the one question that could stop a public release* | Omit it; the repository then appears to dedicate to the public domain a set of published papers it has no interest in | green |
| RDM-10 | The dedication's **one named exception** is named, or its absence is stated | `lsei/NOTICE.md` is the precedent: a share-alike file and a public-domain dedication cannot both govern the same tree, so the exception is named in a file of its own and pointed at from the README. **This repository has no such file today and needs one the moment any CR-Agents writing guide is vendored here** — and `cr-agents/` is a working copy, not vendored, so today the correct statement is that there is no exception | Copy `lsei/NOTICE.md`'s exception across; this repository then declares an exception for a file it does not contain | green |
| RDM-11 | The two working copies are **excluded from the dedication** | `cr-agents/` and `lsei/` are other people's repositories under other licences, sitting inside this tree at runtime and tracked by neither. Measured: neither is tracked (`git ls-files cr-agents lsei` returns nothing) and both are gitignored. A dedication that does not say so covers, on its face, two directories a cloner will find on disk | Say "every file in this repository"; on any install that has bootstrapped, that sentence covers two clones this project does not own | green |
| RDM-12 | The claim **"no third-party PDF or page image is in this repository"** is asserted about the *tracked* tree, not about the disk | Measured: `git ls-files \| grep -icE '\.(pdf\|djvu\|epub\|docx\|doc\|pptx\|ppt\|ps\|tif\|tiff)$'` → **0**, and `literature/` tracks exactly two non-`.md` files, `FIELDS.tsv` and `INDEX.tsv`. The distinction is not pedantry: **sub-step 2.11 will pull 112 source PDFs onto disk under `literature/_pdf/`**, which is ignored by an anchored rule at `.gitignore` L138 and verified here (`git check-ignore literature/_pdf/isru/a.pdf` → IGNORED). The day 2.11 runs, "in this repository" read as "on disk" becomes false on every install that has run it, and read as "tracked" stays true. **The README must say which it means** | Write the sentence without the distinction; it is true today, false after 2.11 on the author's machine, and true again on a fresh clone, which is three answers to one sentence | green |
| RDM-13 | The clause **"or extracted source text"** is **not** copied | It is loose end **A5**. The Scenario Explorer's licence section carried it, it was not accurate about that corpus, and it was struck upstream at `lsei d7889e1`; `lsei/README.md` L26 now reads *"No third-party PDF or page image is in this repository."* **It is not true of this corpus either, and the measurement is 2.12's:** `prettyman-2006` reproduces a full AGU abstract at **100.0%** verbatim with the publisher's own line *"Copyright 2006 by the American Geophysical Union"* printed in the file, and `levin-2025` is at **95.6%**. Copying the struck clause would restate a known-false sentence about a corpus in which it is measurably false | Copy `lsei/README.md`'s licence paragraph wholesale; the struck clause is absent upstream today, so the copy would be correct by accident — and the *next* person to sync it from an older commit reintroduces A5 | green |
| RDM-14 | The README does not claim the corpus is clear of transcribed source text | **It cannot, and this row is why 6.11 cannot close before 6.15.** 2.12 returned with one file to decide about, not thirteen: seven of eight findings declare the reproduction in their own section heading and three of those are open-licensed at source and say so; `prettyman-2006` is the row where the marking does not settle the question. **And 56 of 169 summaries could not be measured at all** because their source PDFs are not on disk — 50 of them Scenario-Explorer-origin — so the honest statement is *the audit is complete over the summaries whose source is on disk and has never been attempted on the rest*. A README that says the corpus is clean would be reporting an unmeasurable population as measured | Owner: **The Fact-Checker** (re-run after 2.11), **the author** (the `prettyman-2006` decision). Close condition: 2.11 has run, 2.12 has been re-run unchanged over 169, and the two flagged files are rewritten or marked | RED |
| RDM-15 | Every summary carries a licence class, so the README's claim is checkable per file rather than in aggregate | **`PRV-15`'s `own-summary` / `contains-transcribed-source-text` classes are empty in all 169 files.** Measured at `99d3601`: `grep -rl '^Licence:' literature/` → **0**. The register row is vacuously green — it asserts a partition over a population in which neither class has a member — and it has been in that state since Wave 1. Until the classes are filled, the README's licence section is a claim about the corpus that nothing in the corpus carries, and the only instrument is a 10-gram overlap tool that cannot see 56 of 169 files | Owner: **The Systems Engineer**, routed here at Wave 3. Close condition: every file in `literature/` carries one of the two classes, `PRV-15` is re-run over a non-empty population of both, and this row asserts the count of `contains-transcribed-source-text` against 2.12's finding set | RED |

---

## 3. RDM-16 to RDM-21 — claims measured, never inherited

Six tests. `tdd_method.md` principle 7: *a test that cites a source document must be verified against
that source before the test suite is accepted as the contract*, and the verification burden is on the
author of the test. Every row here names the command.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| RDM-16 | The containment mechanism is described as **four parts, and no one of them is it** | `tools/check_no_sources.js` (`CHK-13`), `tools/githooks/pre-commit` (`CHK-10`), `tools/githooks/post-commit` (`CHK-11`), and the repository-wide source-carrier section of `.gitignore`. All four are the mechanism. A README naming only `.gitignore` describes a rule a `--no-verify` commit walks past, and one naming only the hook describes a trigger that is not cloned | Describe it as "PDFs are gitignored"; the reader concludes the tree is safe and the extension, magic-byte and size gates go unmentioned | green |
| RDM-17 | The size gate's blindness is not concealed by the README | `29 [Q-CONTAIN-BACKSTOP-BLIND]` of the 112 source PDFs under `_intake/` are smaller than the 500,000-byte backstop and pass it untouched — **25.9%** — because the populations genuinely overlap: the smallest `_intake/` PDF is 81,677 bytes and the largest summary is 84,767, so no threshold at any value separates them. The tool prints its own coverage on every run. **A gate that lets a quarter of its target through while printing a success line is the `CHK-03` shape wearing a different costume**, and a README that reports the gate without the blindness re-dresses it | Describe the size gate as containment rather than as a backstop; the reader trusts a number the tool's own output contradicts | green |
| RDM-18 | The `git check-ignore` fixture list is the acceptance evidence, and it is reproducible | 1.1's acceptance is a fixture list covering `.pdf`, `.PDF`, `.docx`, `.txt`, `.md`, nested paths, `literature/lsei/x.md`, `deps/` and the state file, asserted on a **case-sensitive** filesystem. Measured here at seven of those: `x.pdf` IGNORED, `docs/x.PDF` IGNORED, `oracle/x.Pdf` IGNORED, `literature/isru/a.md` tracked-able, `findings/x.md` tracked-able, `literature/_pdf/isru/a.pdf` IGNORED, `.oracle-state.json` IGNORED. Case is handled by character class (`*.[pP][dD][fF]`), not by a `*.pdf`/`*.PDF` pair, which covers two of eight permutations and misses `x.Pdf` | Run the fixture list on this filesystem only; `x.pdf` and `x.PDF` are **one file** here, so the set silently tests one case fewer than it reports — which is `HK-2`'s trap in a different layer and was measured happening | green |
| RDM-19 | Any claim about how the corpus was built points at the merge record rather than restating it | `cr_scratch/merge_plan.tsv`, the per-file `## Provenance` blocks, and `literature/INDEX.tsv`. A README that narrates the merge acquires a second account of it, and the two disagree the first time a file is re-landed. There is a live instance: `cr_scratch/step0_engineer_corpus_merge.md` Part 8 still presents four files as a live finding describing markup removed on 2026-08-26, while accumulator A4 records the fix | Summarise the merge in the README; that summary is the third account and the one a stranger reads | green |
| RDM-20 | The README states that source PDFs are **not** in a fresh clone, and that the author's tree differs | `BC-19` records `pdfs_present` as a fact for exactly this reason: *the author's `literature/` and a fresh clone's `literature/` are permanently different trees with the same name*. Measured today: `literature/_pdf` does not exist here either, because 2.11 has not run. A stranger reading a README written on a machine where it had would be told about files their clone will never have | Write the README against the author's tree; every path under `_pdf/` is then a promise a clone cannot keep | green |
| RDM-21 | Every number in the README carries the command that reproduces it and the commit it was taken at | This suite's own §0 is the form. Figures at different digests are not comparable, and this repository already has two: 2.12 measured 168 summaries at `af7abec` and the shelf holds 169 at `99d3601`. Accumulator row A6 states a population of 57 against a measured 50-of-169, at a digest that did not exist when A6 was written, and **is explicitly not reconciled** | Print a number bare; A6 is what that becomes — a figure nobody can compare to anything, which its own author declined to reconcile because the populations differ | green |

---

## 4. RDM-22 to RDM-26 — what the README must not do

Five tests.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| RDM-22 | The README is not written in the Oracle's voice | No haiku, no first person singular attributable to the Oracle, no whimsy. §1.7 of the register specification draws the boundary: the Oracle speaks in haiku for the disposition of a question and nowhere else, and operational and public-facing prose is plain and signed by the system. The README is read before any session exists and therefore before the Oracle does | Open with the opening sequence's haiku; the introduction is then spent on a reader who has not run anything, and the sequence still plays later | green |
| RDM-23 | The README makes no promise about breadth or certainty | Same five clauses as the opening sequence's §3.3, applied to a document a stranger reads first: not that it knows anything in particular, not breadth it does not have, not speed or completeness, not that refusals are rare, and not the team's capabilities in anyone's voice | Write "answers any question about lunar industrialisation"; a declared exclusion register and ten thin patches contradict it | green |
| RDM-24 | The README does not instruct a reader to push to either working copy | `BC-6` disables push on both, every session, and §8 rule 2 makes the reverse rule mechanical. A README that suggests contributing upstream through this tree is instructing a reader to defeat an assertion the bootstrap re-applies every session — and `oracle/currency_policy.md` §7 treats a defeated push-disable as a finding reported in its own right | Add a "contributing" section that names `lsei/`; the next session reports the push-disable was defeated between sessions | green |
| RDM-25 | The README does not tell a reader to delete or reset a working copy to fix a problem | §5 "What no mode does": never `reset --hard`, never `clean`, never `checkout` across a dirty tree, never clone over `present-but-wrong` and never delete it. **The author edits the Scenario Explorer in another window.** A troubleshooting section that says "delete `lsei/` and re-run" is a documented instruction to destroy uncommitted work in somebody else's repository, and it is the single most likely sentence to appear in a README's troubleshooting section | Add `rm -rf lsei && re-run`; the bootstrap is forbidden from doing this and the README has just told a person to do it by hand | green |
| RDM-26 | A cognizant stranger can, from the README alone, say what happens when they open a session | A human gate. The Designer runs it at 6.14 on the tree a cloner actually sees; it is listed here because it is the acceptance criterion the whole document is for, and marked `H` so nobody counts it as mechanized | Not applicable — a human gate has no mutation | H |

---

## 5. What this suite does not cover

1. **Style, register and prose quality.** The Editor's at 6.14, against `signs_of_ai_writing.md`.
2. **The tree a cloner sees.** The Designer's at 6.14. This suite asserts what the README *says*
   about the tree, not whether the tree is well arranged.
3. **The licence decision itself.** Whether `prettyman-2006` and `levin-2025` are rewritten or marked
   is the author's, and `oracle/release_gate.md` carries it as a gate precondition. This suite
   asserts only that the README does not claim the question is settled while it is open.
4. **Whether the Unlicense is the right licence.** A ruling, not a test.

---

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| `PRV-15`'s two licence classes are empty in all 169 files; measured 0 at `99d3601`. The row is vacuously green and the README's licence claim has no per-file support. RDM-15. | 1.8 schema / 2.7 | The Systems Engineer — held by this seat, close condition stated at RDM-15 |
| 56 of 169 summaries have never been measured for abstract overlap because 2.11 has not run. The README cannot call the corpus clear. RDM-14. | 2.11, then 2.12 re-run | The Fact-Checker |
| `prettyman-2006` (100.0%, AGU, publisher copyright line in the file) and `levin-2025` (95.6%) are the two files to decide about. Rewriting costs an hour and removes the question instead of managing it. | 2.12 recommendation | The author |
| Accumulator A6's population figure of 57 is not comparable to the measured 50-of-169 at `899e0ddfb70ed83f`. Unreconciled by its own author, deliberately. RDM-21. | accumulator | The Manager |
| This suite is not in `run_suite.js`'s `SUITES` array and carries no executable bindings. Every `green` is a claim. | 6.11 / 2.19 | The Software Engineer |

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +26/-0
```

**TDD spend, not freeze spend.** 6.11 is stage 1 of a four-stage TDD sequence and the suite is its
deliverable.
