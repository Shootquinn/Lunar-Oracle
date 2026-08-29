# The corpus acceptance suite — Step 2

**Written before 2.1, 2.2 and 2.3 ran, and that is the point.** Every test below asserts a property
of the **target state** — the corpus as it must be at the Step 2 gate — rather than an output of the
three measurement sub-steps. A suite written against 2.1's numbers would be a transcript of 2.1, and
2.1's author is the seat that executes 2.5. This suite is authored by a seat that owns no merge
output in this step, which is the whole of its value.

**55 tests.** Counting rule: rows in the **eleven** tables of §§1–12 whose first cell matches
`^[A-Z]{3}-[0-9]+[a-z]?$`, counted over this file. Per group: NAM 3, PTH 9, PRV 1, CRP 5,
**MRG 9**, PDF 7, CON 3, REG 14, **CNT 1**, SLT 3, MUT 2.

**THE SUITE WAS 189 ROWS AND 132 OF THEM ASSERTED NOTHING. Triage at Wave 5, sub-step 8.5, on the
author's ruling.** Every row below is now executed by `oracle/tests/run_suite.js`. The 132 removed
were prose with a status cell beside them: a runner cannot execute a sentence, and a `green` cell on
a row nothing runs is `CHK-03` — a check that cannot fail — repeated 132 times. Sections 1 (NRM),
4 (FLD), 6 (DUP) and 8.2 (PUL) are gone entirely and their numbers are **not reused**, so a citation
of `§4` in an older deliverable resolves to a gap rather than to a different test. The record of what
went and why is `cr_scratch/step8_w5-4_suite_triage.md`.

**The finding that justified the largest single deletion.** §5 PRV declared an eight-key
`## Provenance` schema — `Origin corpus`, `Origin path`, `Merge disposition`, `Source identifier`,
`Licence` and the rest — and asserted sixteen properties of it. **Zero of the 169 landed summaries
carry any of those keys.** All 169 carry a different block: `Landed`, `Source`, `Upstream ref`,
`Merge-time digest`, `Byte source`, `Disposition`, `Dedup key`, `Field`, `Plan row rev`,
`Provenance depth`. PRV-1 — the one row of the seventeen that was bound — asserts only that a block
with the heading exists, and it passed for four waves while the sixteen rows describing the block's
contents described an artifact nobody built. A container assertion passing over content nobody
checked is this project's own recurring defect, found here in its own test suite.

**THE COUNTING RULE GAINED ONE OPTIONAL LOWERCASE SUFFIX AND THAT IS A CHANGE, DECLARED HERE.**
`^[A-Z]{3}-[0-9]+$` does not match `MRG-4b`, and The Manager's 2026-08-28 ruling names that id. The
alternatives were to renumber the ruled id or to let the header declare a number the rows do not
carry; the first edits a ruling to suit a regex and the second is exactly the drift `SLT-5` exists to
catch. The suffix admits `MRG-4b` and nothing else present in this file, and `oracle/tests/run_suite.js`
parses rows with the same pattern, so header, per-group list, rows and runner agree by construction
rather than by four people counting.

**Was 148 in twelve tables at the Cycle A close; +27 at the Wave 1 `SLOT-A`/`SLOT-C` fill; +14 at
the Wave 2 `SLOT-B` fill, 2026-08-28.** The Wave 2 additions are `§8.2` (`PUL`, `SLOT-B`, twelve rows,
inside §8 so no section number moves), `MRG-4b` under The Manager's `MRG-4` ruling, and `CNT-12`, the
assertion that every instrument under `tools/` is text to git — which nothing in this repository had
ever asserted, and two instruments were failing it. That is the whole of the wave-2 allowance, taken
in full and not exceeded: **tests +14**, check rows 0, amendment rows 0, quantity ids 0. The section numbers did not change and no cross-reference moved: the two new tables are
§7.1 (`MRG`, `SLOT-A`) and §8.1 (`CON`, `SLOT-C`), inside §7 and §8. The other five are `PTH-12`
to `PTH-14` under the `PTH-9` ruling, `FLD-13` and `FLD-14` absorbed from The Engineer's `INDEX-1`
and `INDEX-4`, and `SLT-9`. **`SLT-5` holds across the fill**: the header count, the per-group list
and the rows agree, and the command that checks it is

```
awk '/^## 13\./{exit} /^\| *[A-Z]{3}-[0-9]+[a-z]? *\|/{c++} END{print c}' oracle/tests/corpus_suite.md
```

which returns 189, and `node oracle/tests/run_suite.js` independently reports `189 rows, 15 groups`
with a per-group breakdown that equals the list above, term by term. Two instruments, one number. **THE `## 13.` GUARD IS NOT LOAD-BEARING AND THIS SENTENCE PREVIOUSLY SAID IT WAS.**
The old text claimed a count without the guard returns 177. Measured 2026-08-28, against the committed
`HEAD` version as well as this one: **the guarded and unguarded counts are IDENTICAL** — 175 and 175
at `HEAD`, 189 and 189 here. §13's gate rows carry bolded `**PRV-13**` first cells and the anchored
regex `^\| *[A-Z]{3}-[0-9]+[a-z]? *\|` already rejects them, so the section guard excludes nothing.
It is belt-and-braces and is kept as such. The claim that it was load-bearing was a piece of reasoning
I never ran, sitting in the header of a suite whose whole argument is that unrun assertions are not
results — which is the finding, and it is against myself.

**Authorities this suite binds to, by address.** `oracle/NAMING.md` §§1–3, 7, 8, 9, 11;
`oracle/register_schema.md` §§3, 8, 9; `oracle/check_register.md` §§2–4, 8; `COUNTING_RULE.md`
§§2, 3, 8, 9; `cr_scratch/step0_engineer_corpus_merge.md` parts 2, 3, 5, 9; and
`cr_scratch/step2_orchestrator_baseline.md` for every known answer. Where this suite quotes a figure,
the figure is the baseline's or was re-measured in the authoring session and says which.

---

## 0. How to read this suite

**Every test names the mutation that makes it red.** That column is not documentation. It is the
test's warrant: an assertion with no stated mutation is `CHK-03` again — a check that cannot fail,
sitting on a gate, for eleven sub-steps. A test whose mutation has never been applied is not green;
it is unrun, and §12 asserts the difference.

**Mutations are applied to a fixture tree, never to `literature/`.** The harness copies the target
tree to `cr_scratch/fixtures/corpus_mut/`, mutates the copy, runs the named assertion against the
copy, and asserts red. MUT-5 asserts that no mutation ever touched the real corpus.

**Status column.** `green` = expected to pass once the mechanism exists. `RED` = expected to fail
today, for a named reason, with a named owner and a named close condition; a RED test is a defect
report and is never quietly relaxed. `H` = a human gate, not a script, listed because it is part of
the contract and marked so nobody counts it as mechanized. A test additionally subject to the A.10
step 2 source-verification gate carries **[gate]**; §13 lists those separately, and **this suite is
not the contract on a [gate] test until The Fact-Checker has run it.**

**The target state, in one paragraph.** `literature/<folder>/<leaf>.md`, exactly one folder level,
every leaf matching `R_S`, every file carrying a `## Provenance` block with the eight-key minimum, a
field derivable from `literature/FIELDS.tsv`, an `INDEX.tsv` regenerated rather than hand-edited,
source PDFs under `literature/_pdf/<folder>/` and none of them tracked, the contested-claims register
landed as a **set** of sidecar files with one `basis_root` each, and a `## Contested` block in every
member file that round-trips against that set.

### 0.1 Six findings from the authoring session that change what some of these tests assert

They are stated here rather than buried in a row because three of them contradict a landed
specification, and a suite that quietly writes itself to the corrected version leaves the
specification wrong. Each was measured by running something, not by reading it.

1. **The A7 collision class has nine members, not one.** Under `normalize()` as `NAMING.md` §1
   defines it, nine filename pairs collide across the two corpora. Only `GDP.md`/`gdp.md` differs by
   case alone; the other eight differ by **separator** — spaces and underscores against hyphens — and
   therefore coexist on every filesystem, case-sensitive or not. A case-insensitive collision
   assertion catches one of nine and lands eight duplicate pairs with no collision reported anywhere.
   **This suite asserts normalized-key collision under `NAMING.md` §1**, which subsumes the case rule,
   catches all nine, and is cheaper than the case rule because the keys are already computed. All
   nine are named in `cr_scratch/step2_orchestrator_baseline.md`. CRP-4 and CRP-5 are the tests, at
   two scopes: within a target directory, and across the whole target tree.
2. **Zero intra-corpus normalization collisions today.** 152 files map to 152 distinct keys and 119
   to 119. Every collision in the prospective union is cross-corpus. That is a property the merge
   must preserve, and CRP-6 asserts it as a post-condition rather than leaving it as a hope.
3. **There is no repository-wide `*.pdf` rule.** Measured in the authoring session with
   `git check-ignore`: `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf` and a root-level `x.pdf` are all
   **NOT ignored** and commit cleanly. The Engineer's Part 5 named this hole and it is still open.
   PDF-2 is RED on that measurement.
4. **The Part 5 extension hole inside `literature/` is closed, and his table is out of date.** The
   same run: `literature/isru/x.pdf.bak` **is** ignored, because 1.1 rewrote `/literature/**` to
   deny-by-default. Part 5's table says otherwise; it was measured against the pre-1.1 file. The
   extension gate must therefore be tested **outside** `literature/`, where it is open, and not only
   inside, where deny-by-default already covers it. PDF-6 is written to that.
5. **The 500 KB size gate's justification does not hold, and the gate admits 26% of its target.**
   Part 5 justifies the threshold as "the largest summary is 28 KB and the smallest PDF in the tree
   is 180 KB." Measured in the authoring session: the largest summary in the prospective union is
   **84,767 bytes** (`lsei/literature/programme-primaries/nasa-moon-to-mars-doc.md`) and the smallest
   PDF under `_intake/` is **81,677 bytes** (`luxembourg-2017-space-resources-law.pdf`). The two
   populations **overlap**. And **29 of the 112 `_intake/` PDFs are under 500 KB**. The size gate is
   a backstop against an unknown carrier type, not a containment gate, and a passing size test must
   never be read as containment. PDF-9 to PDF-11 are written to that, and PDF-11 asserts the
   threshold is stated **in bytes with its unit named** — the 2.10 unit trap, one level down.
6. **`literature/NAMING.md` fails `NAMING.md`'s own A3, and `listCorpusFiles()` returns it as a
   corpus document.** A3 requires `literature/`: depth == 2, one folder and one leaf. `NAMING.md`
   sits at depth 1. `listCorpusFiles()` walks to any depth and takes every `.md`, so after the merge
   the naming contract is a retrievable literature source and can be cited as one. Measured:
   `tools/check_corpus_collisions.js` reports "1 summaries" today and the one is `NAMING.md`. This is
   a decision for a person — move the contract out of the corpus root, grant it a §10 by-name
   exception, or root retrieval below it — and it is not mine to fold quietly into a neighbour.
   PTH-9 is RED on it with an owner and a close condition.
   **RULED by the author, 2026-08-28: relocation** — executed, and the contract is now at
   `oracle/NAMING.md`. Not the by-name exception, not re-rooting
   it. `PTH-9` stays RED with its close condition rewritten to the ruling, and it gained three
   rows rather than being closed by it — `PTH-12` (moved, not copied), `PTH-13` (live citations
   repointed; 9 of 82 occurrences are live, the other 73 are the `cr_scratch/` record and must NOT be
   rewritten), and `PTH-14` (**still tracked at the new path**). `PTH-14` is the one the ruling
   created: `literature/NAMING.md` ships today only because `!/literature/**/*.md` re-admits it under
   a deny-by-default root, and **that re-admission does not follow the file out of `literature/`.**
   A relocation into any deny-scoped path silently stops the naming contract shipping, and the by-name
   exception the author declined had no such failure mode. The Systems Engineer executes the move;
   these three are what the move has to satisfy.
   One consequence for the tooling, measured: `M13` now excludes `literature/**/*.md` per
   `COUNTING_RULE.md` §9, and today that exclusion covers exactly one file — `NAMING.md`. **After the
   move, `NAMING.md` re-enters `M13`'s population**, because the exclusion is keyed on the path and
   not on the document. That is correct — the naming contract is our own apparatus and should be
   governed — but it is a behaviour change nobody asked for and it arrives with the move.

### 0.2 One thing this suite cannot do, said out loud

`oracle/tests/` is not under a declared `S` root of `oracle/check_register.md` — the roots are
`tools/**` and `oracle/**/*.js`. This file is `.md`, so it needs no `C` row; but **any runner built
for it does**, and a runner landing under `oracle/` fails `CL-1` on the day it lands. That is the
same defect class 2.20 exists to fix for `oracle/verify_corpus.js`, and the runner belongs on the
same list.

Further, and worse: **CHK-01 and CHK-04 name the trigger `merge-gate`, and nothing installs a
merge-gate dispatcher.** CHK-10 dispatches `pre-commit` only. The corpus invariants in §7 and the
register assertions in §9 are wired to a trigger that does not exist. Routed to 2.20 as a fifth item.
A 148-test suite nothing invokes is a 148-line document, and I have said that about somebody else's
row; it applies to mine.

---

## 2. NAM — namespaces, regexes and convention shape, `NAMING.md` §§2–3 and §11 A1/A2/A5

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| NAM-1 | Every landed summary matches `R_S` | For each `f` under `literature/`: `R_S.test(leaf(f))` | Rename one landed leaf to `Csank-2022.md` | green |
| NAM-2 | No landed summary matches `R_F` | For each `f` under `literature/`: `!R_F.test(leaf(f))` | Copy `findings/fa2-growth-model-doubling-verdict-table.md` into `literature/growth-theory/`; the answering loop would then cite one of this project's own verdicts as a source | green |
| NAM-10 | No landed name ends in `-<digit>` | Zero landed leaves match `-\d\.md$` | Land any `-2` name. NAM-10 and NAM-8 fire together, which is the design: the numeric suffix is invisible to the tokenizer and visible here | green |

---

## 3. PTH — the path-length ceiling, `NAMING.md` §8 and §11 A3/A4

**`PTH-3` and `PTH-4` are RETIRED, W5-9, 2026-08-29, and the retirement is a measurement, not a
preference.** They asserted `leaf <= 64` and `folder <= 32`. Under `PTH-5` (`depth == 2`, asserted
separately) every corpus relpath is `len("literature") + 1 + len(folder) + 1 + len(leaf)`, which is
`12 + len(folder) + len(leaf)`, so **`PTH-1`'s `relpath <= 108` IS `len(folder) + len(leaf) <= 96`,
exactly.** `64 + 32` is one arbitrary partition of that 96. A partition implies the sum; the sum does
not imply the partition. The two rows were therefore a strictly tighter restatement of a check that
already runs, and the corpus is the demonstration that the extra tightness rejects names the real
constraint accepts:

```
ieee-2022-paper-sh-tcs-...-update.md   leaf 70 > 64   under power-and-thermal (17)   relpath 99, margin 9
organization-and-production-systems    35 > 32        longest path beneath it        relpath 98, margin 10
development-and-industrial-policy      33 > 32        longest path beneath it        relpath 99, margin 9
```

**Three breaches of the partition, zero breaches of the budget.** Every one of the eleven folders
affords a leaf of at least 61 characters and the longest leaf beneath any of them is 59. The remedy
the two rows demanded was a rename measured at **498 occurrences across ~120 files**, of which **71
are `cr_scratch/` deliverables that `PTH-13`'s own reasoning forbids rewriting** — so the rows asked
for a change that could not be completed, in order to satisfy an allocation that nothing measures.

**Nothing replaces them, because nothing is lost.** `PTH-1` is the constraint, `PTH-5` pins the depth
its arithmetic depends on, `A4` pins the root, and `PTH-11` — extended at the same time — now reports
the tightest per-folder leaf budget, which is the forward-looking signal `PTH-4` was gesturing at and
never actually computed. `tools/verify_corpus.js` `PTH/A3` dropped the same two clauses in the same
edit; two instruments asserting one retired ceiling is two places for it to come back.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| PTH-1 | Repo-relative ceiling, 108 characters, backslash-separated | For every corpus file: `relpath(f).replace(/\//g,'\\').length <= 108` | Land a 64-character leaf under a 33-character folder: `10+1+33+1+64 = 109` | green |
| PTH-5 | Depth is pinned at exactly one level | `literature/`: every corpus file at depth 2. `findings/`: depth 1 | Create `literature/isru-processing/thermal/x.md`; a second level costs a separator plus the new segment against a **measured** worst-case margin of 9 characters (longest landed relpath 99 of 108, `PTH-11`). Before W5-9 this cell read *up to 33 characters*, which was the retired folder ceiling allocation rather than anything measured | green |
| PTH-9 | Every file `listCorpusFiles()` returns from `literature/` is at depth 2 | The corpus root holds no top-level `.md`. Asserted on the **walker's output**, not on a directory listing, because the walker is what retrieval sees | Move any summary to `literature/x.md`; A3's depth clause fires | **RED** — `literature/NAMING.md` sits at depth 1 and the walker returns it, so the naming contract is a retrievable literature source. Measured: `check_corpus_collisions.js` reports "1 summaries" and the one is NAMING.md. **RULED by the author, 2026-08-28: relocation.** Not a §10 by-name exception and not re-rooting retrieval. Owner: The Systems Engineer, W1, the file being in his write set. Close, and it is an observation not a date: `listCorpusFiles()` over `literature/` returns zero paths at depth 1, **and** the relocated contract is reachable at its new path from every document that cites it |
| PTH-12 | The relocation moved the contract, it did not copy it | After PTH-9 closes, exactly one `NAMING.md` exists in the repository, and `literature/` holds none. Asserted by `git ls-files '*NAMING.md'` returning exactly one line | Leave a copy behind "for compatibility"; there are then two naming contracts, the retrievable one is the stale one, and the defect PTH-9 exists to fix is still live with a second authority added. `CLAUDE.md` already states the rule for `lsei/index.html`: a second copy is a second authority and a second authority drifts | **RED** — depends on PTH-9. Owner: The Systems Engineer, W1. Close: the assertion runs and returns one line |
| PTH-13 | Every **live** citation of the old path was repointed | Zero occurrences of the string `literature/NAMING.md` in the LIVE set — landed contracts, tools and the gameplan. Measured before the move so the closing count is checkable, at read-digest `e06bc06118fa6218`: **82 occurrences across 28 files** in total, of which **9 across 6 files are live** — `COUNTING_RULE.md` 1, `lunar-oracle-gameplan.md` 1, `oracle/bootstrap_contract.md` 1, `oracle/MANIFEST.tsv` 1, `tools/merge_identity.js` 1, this file 4. **CORRECTED 2026-08-28: the live set omitted `oracle/AMENDMENTS.tsv`, which carries FOUR rows naming the dead path** — `AM-75`, `AM-76`, `AM-77` (target `section 8`/`section 9`) and `AM-153` (target `path references`). A promoted register whose amendment rows target a path that does not exist is the same defect as `MF-1`'s, one register over, and my live set could not see it because I enumerated by memory rather than by walking. The live set is now COMPUTED, not listed: every tracked file outside `cr_scratch/` and outside the working copies. Run by `run_suite.js`, which reports 5 live files today (`lunar-oracle-gameplan.md`, `oracle/MANIFEST.tsv`, `oracle/AMENDMENTS.tsv`, `oracle/NAMING.md`, `tools/merge_identity.js`). The other 73 are in `cr_scratch/` deliverables and are **the record of what was believed when it was written**; rewriting them would falsify the record and is forbidden | Move the file and leave the live citations; `oracle/MANIFEST.tsv` then carries a `promoted` row whose target-path does not exist, `MF-1` goes red on the next run, and `tools/merge_identity.js` reads a path that is not there. A relocation that breaks `MF-1` is a relocation nobody finished | **RED** — depends on PTH-9. Owner: The Systems Engineer, W1, for `MANIFEST.tsv`'s row, `COUNTING_RULE.md`'s §8 glob and his own files; mine for this file's four. Close: live count is zero |
| PTH-14 | The relocated contract is still tracked at its new path | `git check-ignore -q <new path>` exits non-zero, and `git ls-files` lists it. Today `literature/NAMING.md` ships **only** because `!/literature/**/*.md` re-admits it under a deny-by-default root; that re-admission does not follow the file out | Move it to a path under a deny rule — `literature/_pdf/`, `_intake/`, or any future deny-by-default root. The naming contract then silently stops shipping, and the first symptom is a fresh clone with no naming contract in it. This is the one failure mode a relocation has that a by-name exception did not, and it is why the assertion exists | **RED** — depends on PTH-9. Owner: The Systems Engineer, W1. Close: the check-ignore probe and the `ls-files` probe both pass at the new path |
| PTH-11 | The worst-case landed path is reported with its margin, **and the tightest per-folder leaf budget** | The longest repo-relative corpus path is measured and printed beside the ceiling, together with `108 - 12 - len(folder)` for the longest folder. Measured 2026-08-29: longest relpath **99 of 108, margin 9**; tightest folder budget **61 characters** in `organization-and-production-systems` (35). The budget clause was added at W5-9 when `PTH-4` was retired: with no folder ceiling the number a future author needs is not *is this folder under 32* but *how much leaf does this folder still afford me*, and nothing computed it before | Introduce a 32-character folder and a 64-character leaf: 108, exactly at the ceiling. PTH-11 must report zero margin rather than pass silently, because a ceiling reached is a ceiling about to be broken | green |

---

## 5. PRV — `## Provenance` completeness, Part 5 of the merge specification

The eight-key minimum. Every merged summary carries all eight; a key present with an empty value is
a failure, not a variant — the same posture `register_schema.md` §3 takes on its own fields.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| PRV-1 | Every merged summary has a `## Provenance` block | Count of files under `literature/` with no `^## Provenance$` heading is zero | Delete the block from one file; the count becomes 1 and PRV-1 names it | green |

---

## 7. CRP — corpus-level invariants

**The collision assertion is normalized-key, not case-insensitive.** §0.1 finding 1 is the whole
reason, and it is measured rather than argued: nine members, eight of which a case rule misses.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| CRP-1 | CHK-01: no two summaries under a corpus root tokenize to the same key set | Over the merged tree, zero pairs share a sorted `filenameTokens()` output | Land the eight separator-differing pairs of the nine unresolved; each pair tokenizes identically and CRP-1 names all eight | green |
| CRP-4 | **Normalized-key collision within a target directory** | For each folder under `literature/`, no two files share a `normalize()` key | Place `GDP.md` and `gdp.md` in one folder. On a case-insensitive filesystem one silently overwrites the other and the merge reports success — the defect is invisible in exactly the case that exists, so this test must be run on the **key set**, never on a directory listing | green |
| CRP-5 | **Normalized-key collision across the whole target tree** | Across all folders, no two files share a `normalize()` key. Reported with both paths and the shared key | Place `BEA_depreciation_rates.md` in one folder and `bea-depreciation-rates.md` in another. They coexist on every filesystem, no case rule fires, and the corpus carries two summaries of one source under one key with nothing reporting it | green |
| CRP-7 | A case-insensitive check is **not** sufficient, asserted as a test | Run a case-folded collision check over the merged tree and a normalized-key check over the same tree; assert the normalized check catches a strict superset. On the union the two differ by 8 | Replace the normalized check with the case-folded one; CRP-7 goes red and names the eight pairs the weaker rule misses. This test exists so the substitution cannot be made quietly | green |
| CRP-11 | Byte-difference is distinguished from line-ending difference | For each of the **eight**, the adjudication states whether the difference survives CRLF normalization. Deltas re-measured 2026-08-28, intake minus lsei: `azami` −22,334, `csank-2022` −15,553, `poston-2020` +1,490, `473486main-iss-atcs-overview` **+86**, `bea-depreciation-rates` **+77**, `ieee-2022-paper-sh-tcs` **+42**, `falcon-heavy` +28, `barro-2004` −6. **NONE of the eight is a line-ending difference** — all eight survive CRLF normalization and all are single-line or multi-line content edits | Skip the normalization step; a whole-file CRLF diff is then read as a content disagreement, which this repository has already produced once. **Added:** assume the small deltas are line-ending noise and drop them; +86, +77 and +42 are content edits and dropping them loses three adjudications | green — corrected: five → eight, and the CRLF question is now answered for all eight rather than asserted of five |

---

### 7.1 MRG — `SLOT-A` filled: the merge assertions

**Written 2026-08-28 by the seat that owns no merge output.** `SLOT-A` was The Engineer's while
2.5 is also his; the author reassigned it under `SLT-7`/`SLT-8`, and this table is the fill.

**The brief's premise P1 is FALSE as written and these rows are shaped by that.** P1 says these
assertions can be written against a disposition table that is still being written "because Block 1 is
stable by construction." Measured at read-digest `e06bc06118fa6218`: **`cr_scratch/merge_plan.tsv`
does not exist.** Not "Block 2 is unfinished" — there is no table. His `tools/merge_identity.js`,
`tools/clusters.js` and `tools/doicov.js` are on disk, so D8 has started; the table has not landed.

So these rows assert against the **declared column contract** — `source_path`, `target_path`,
`disposition`, `primary_secondary`, `target_folder`, `field_label`, `also`, `dedup_key`,
`identifier`, `rev`, `basis` — and not against data. **That contract is declared "at minimum",
which is an OPEN set, and an assertion over an open column set cannot fail on a missing column.**
`MRG-1` closes it: the table declares its own columns in an `H` row and the assertion is on that
declaration. This is the `H`-row device again and it is the only thing that makes the rest of this
table checkable before the data exists.

**Every row below names its mutation.** A row with no mutation is `CHK-03` again. Per `SLT-7` none
of these is green until it has been observed RED against a deliberately broken fixture, dated, before
2.5 runs — and per `SLT-8` I am now the proving seat and not the executing one, which is the point of
the reassignment. §11.3 carries the `asserted_against` list and the observation dates.

> **THE STATUS CELLS BELOW ARE THE STATE AT WRITING AND ARE SUPERSEDED BY §11.3.**
> `cr_scratch/merge_plan.tsv` LANDED LATER THE SAME DAY, between read-digest `e06bc06118fa6218` and
> `ef803a7a63cf24a8`, and all twelve rows were then run against it: **3 green, 1 `H`, 8 red on real
> data.** The cells are left as written rather than rewritten, because a status cell that silently
> tracks the world is a cell nobody can date. §11.3 carries the results, the digest and the
> `MRG-4` contract collision. Read it before acting on any cell here.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| MRG-1 | The table declares its own columns and its own size | An `H` row naming every column in order, and the parsed `D`-row count equal to the declared count. Column set asserted against the `H` row, never against a hard-coded list in the checker | Add a twelfth column and leave the `H` row alone; every consumer keyed on an ordinal shifts by one and nothing reports it. This is `oracle/MANIFEST.tsv`'s `H` row applied to the merge plan, and it is what makes an "at minimum" column list checkable | **RED** — `cr_scratch/merge_plan.tsv` does not exist. Owner: The Engineer, W1. Close: the table lands with an `H` row |
| MRG-2 | `disposition` is a closed set, stated in the table | Every `D` row's `disposition` is one of the values the `H` row's own legend names; zero blanks, zero `-` where a decision was required. The closed set is read from the table, not from this row | Add a sixth disposition value in one row. A value outside the set is a decision nobody ruled, and a checker with the set hard-coded here would need editing to notice — which is why it reads the legend | **RED** — no table. Owner: The Engineer, W1. Close: table lands |
| MRG-3 | Every union file has exactly one row, and every row exactly one union file | The join is total and bijective **in both directions** against the 176-key union. Reported as two counts, not one: rows with no source file, and source files with no row | Drop one file's row. A one-directional check passes — every remaining row still resolves — and the file vanishes from the merge with the table reporting success. `CRP-12` catches this after the merge; `MRG-3` catches it before, which is the whole difference between a gate and a post-mortem | **RED** — no table. Owner: The Engineer, W1. Close: table lands |
| MRG-4 | **REWRITTEN 2026-08-28 under The Manager's ruling: the column splits.** `byte_source` says which corpus copy supplies the bytes; `pair_primary` says which member of a same-source pair is the primary. One name carrying two concepts was the defect, and my original row asserted the second meaning against a column that carries the first | For every row whose `pair_role` is `dup-member`: (i) `byte_source` ∈ {`sole-lsei`, `sole-intake`, `both-identical`, `lsei-primary`, `intake-primary`} **and** its `source_path` exists on disk; (ii) `pair_primary` ∈ {`primary`, `secondary`, `unadjudicated`}; (iii) **no pair group is half-adjudicated** — a group with one member `primary` or `secondary` and its partner `unadjudicated` is a failure. Asserted on the GROUP, never on the file. **At 2.5: 16 members, all `unadjudicated`, 8 groups, 0 half-adjudicated.** **At 2.16: 16 members, 0 `unadjudicated`, 8 groups each with exactly one `primary`, and every value equal to the corresponding `DUP-xx` register field** | **Mutation 1:** set one member of `DUP-05` to `primary` and leave `sanders-2025-nasa-lunar-isru-progress-review` `unadjudicated` → red on (iii). A file-wise check sees two well-formed values and passes. **Mutation 2:** set any `byte_source` to a sixth value → red on (i). Both mutations produce a table every ordinal-keyed consumer still reads | **RED, and the reason changed** — the table landed and `MRG-4`'s premise did not. Measured by `run_suite.js` 2026-08-28: 16 members, 8 groups, 0 half-adjudicated, **and the column `pair_primary` DOES NOT EXIST**, so (ii) and (iii) are unasserted. A merge gate cannot read a field added after the merge. Owner: The Engineer, W2-1. Close: the 18th column lands and the runner reports `16 members, 8 groups, 0 half-adjudicated` as a PASS rather than as a shape |
| MRG-4b | **The landed BODY is the `byte_source` body, under the operations the file itself declares and no others.** (Was "with exactly one declared exception", hardcoded to one file name; generalized 2026-08-29 by W5-10 onto the declaration form the corpus has used since 2.6.) **A CONTRACT COLLISION IS RECORDED HERE RATHER THAN RESOLVED BY CONVENIENCE.** The ruling says byte-identity of the whole file. That is UNSATISFIABLE for all 176 rows, not for one: `PRV-1`, `PRV-2` and `PRV-17` require every landed file to carry a `## Provenance` block, the source copies carry none, and the merge appends one. Ruled byte-identity and ruled provenance-completeness cannot both hold. The strict form that survives both is body-identity, and it loses nothing the ruling wanted | **GENERALIZED 2026-08-29 (W5-10): the exception mechanism is no longer a file name.** Locate the appended provenance block by the rule `tools/verify_corpus.js` already uses — prefer the labelled `## Provenance (merge)` heading, fall back to the last plain `## Provenance` — and the remainder is **byte-identical** to the file at `source_path` named by `byte_source`, **under the operations that file's own `- **Body edit …:**` line declares and no others.** An operation is not believed, it is **CONSUMED**: each name in the closed set `{insert-metadata, drop-cts-marker, declare-source-file, normalize-eol-to-lf}` removes from the diff exactly the lines its declaration says it wrote, and what survives is the residual. **A non-empty residual is an undeclared body edit no matter how much prose sits above it.** Line-ending and trailing-whitespace normalization is counted and REPORTED SEPARATELY, never folded into the content comparison — `CRP-11`'s rule, one group over | **M1** insert a stray line into a landed body → red, 44 → 45 undeclared, declared-and-verified 117 → 116. **M2** delete the `## Metadata` block from a file that declares `insert-metadata` → red as `DECLARED-BUT-ABSENT`: a declared operation that did not occur is a rule nobody applied. **M3** write an operation token outside the closed set → red as `OUTSIDE THE CLOSED SET`, because a declaration nobody defined is not a declaration. **M4** make the labelled provenance heading unfindable on a clean file → red, 44 → 45. **M5** fold the CRLF normalization into the content comparison → 12 line-ending normalizations are reported as content edits and the real ones are lost in them. All of M1–M4 run 2026-08-29 against a staged copy under `--tree`, control reproduces 44 | **RED, 44 findings in four named classes, down from 167 — and every one of the 123 that moved did so because the checker learned to read a declaration, not because a condition was loosened.** `node oracle/tests/run_suite.js`, 2026-08-29: **168 landed, 124 bodies reduce to `byte_source`** (117 of them under a declared operation, verified by consumption; 12 carried a line-ending normalization, reported not folded in), **0 operation tokens outside the closed set, 0 declared-but-absent, 0 unverifiable, 44 UNDECLARED**: (**in a fresh clone the same run reads 44 undeclared and 24 UNVERIFIABLE**, because a clone does not carry `_intake/` and 24 rows' `byte_source` is under it. Unverifiable is counted apart from undeclared and is still red: folding it in accuses somebody of an edit they did not make, and dropping it is a vacuous pass.) **31 `undeclared-source-file-line`** (the 8.9 `Source file:` declarations, written into 31 bodies without a `Body edit` line naming them; exactly one file, `lsic-2026-newsletter-august`, declared the identical edit as `declare-source-file`, which is the form the other 31 owe), **8 `licence-and-copyright-pass`** (`Licence:` and `Publisher / copyright line` blocks added by the Step 8 copyright clearance, carrying **no `Body edit` line at all**), **3 `other`** (`azami-2024-lunar-manufacturing-review`, whose DOI repair is described in a `- **Note:** CITATION REPAIR` line and is **not named in its `Body edit` operation clause**; `luchsinger-2021-lcross-water-modeling` +2/−1; `nasa-2025-fission-surface-power-directive` +10/−0), **2 `self-declared-residual`** (`falcon-heavy-wikipedia` and `rostami2018-figures`, whose own provenance says the body "does NOT restore" and routes the Wave 2 citation repair to its author — the file agrees with the checker and the work is still owed). **The hardcoded `azami` exception is retired**; a checker with one file's name in it needs editing every time the corpus does. Owner: the author of each class's edit — 8.9 for the 31, Step 8 part 2 for the 8, the Space Resources Engineer for the 3 `other` and the 2 `self-declared-residual`. **Not W5-10, whose write set excludes `literature/**`.** Close, per class: the edit is named in the file's own `Body edit` operation clause using a token in the closed set (adding a token to the set is a change to this row's condition and is argued here, not assumed), or it is reverted; this row reports 0 undeclared |
| MRG-6 | The landed path is derivable from the row alone | `target_path == 'literature/' + target_folder + '/' + normalize(leaf) + '.md'`, computed from the row and compared to the row's own `target_path`. Both are in the table, so the assertion is a self-consistency check that needs no filesystem | Write a `target_path` that disagrees with `target_folder`. The merge lands the file where `target_path` says and every count keyed on `target_folder` is wrong by one, in both folders, silently | **RED** — no table. Owner: The Engineer, W1. Close: table lands |
| MRG-9 | Dedup-key collision **within a target directory** | **RE-GROUNDED 2026-08-29 (W5-10): the population is the SHELF, not the plan.** For each folder under `literature/`, no two summaries carry one `dedup_key`. The key is read from each file's own `- **Dedup key:**` line, not from a `cr_scratch/merge_plan.tsv` cell. Plan-side collisions among rows the plan says do not land are **counted and reported separately, never folded into the verdict** — `MRG-4b`'s line-ending rule, one row over | Place two files with one `dedup_key` in `logistics-and-delivery`. Two summaries of one source land in one folder under one key and the second is discoverable only by reading both. **The re-grounding is what makes this mutation reachable:** the plan-scoped form could be silenced by editing a TSV cell, and it was blind to `growth-theory/denison-1972-classification-of-sources-of-growth.md`, a shelf file with no plan row at all | **RED, 1 finding, and the object it measures changed.** Was 8 findings against the plan; 7 of those 8 were `pair_primary=secondary` rows the table's own header says never land, and all 7 target paths are absent from disk. Measured on the shelf, 169 files: **1 within-folder collision** — `programme-primaries/lsic-2026-newsletter-august.md` and `programme-primaries/lsic-newsletter-2026-june-final.md` on the level-3 key `lunar-surface-innovation-consortium` / `2026` / `lsic-newsletter-vol`. **Adjudicated: these are not duplicates.** Vol. 7 Issue 4 and Vol. 7 Issue 3 of one serial. The defect is the KEY — the L3 slug truncates at `lsic-newsletter-vol` and drops the issue, so two distinct issues in one year are indistinguishable to anything keyed on `dedup_key`. This is the same pair `verify_corpus` files as a level-3 `REPORT`, and this is its adjudication. Owner: whoever owns `oracle/NAMING.md` §7 and the two files' `Dedup key` lines — **not W5-10, whose write set excludes `literature/**`**. Close: the two newsletters carry distinct `dedup_key`s and this row reports 0 |
| MRG-10 | Dedup-key collision **across the whole target tree** | Across all folders, no two summaries carry one `dedup_key`. Same shelf-grounded population and same separate plan-side report as `MRG-9` | **This is the row that stops `MRG-9` passing vacuously.** Put the two colliding files in DIFFERENT folders: `MRG-9` passes — correctly, per-directory — while the corpus carries one key twice. A7 is general and it is at two scopes for exactly this reason | **RED, 1 finding, the same one.** Both scopes agree at this placement because the pair is same-folder today; that is the two scopes agreeing, not `MRG-10` passing vacuously, and moving either file makes `MRG-9` green while `MRG-10` holds. **What was considered and refused:** `NAMING.md` §7 says a level-3 match is "a candidate duplicate, never a confirmed" one, so demoting L3 collisions to a report would take both rows green today — the surviving collision is L3. Refused. The harm these rows name is that two documents become indistinguishable to anything keyed on `dedup_key`, and that harm does not care whether the two are the same source. Demoting the only finding to a footnote is making a row green by weakening what it asserts. Owner: whoever owns `oracle/NAMING.md` §7 and the two files’ `Dedup key` lines — not W5-10. Close: the two newsletters carry distinct `dedup_key`s and this row reports 0 |
| MRG-11 | `rev` is append-only and a bumped row carries its reason | A row whose `disposition`, `primary_secondary` or `target_folder` changed after first write has `rev > 1` **and** a non-empty `basis` naming why. Asserted by diffing the table against its own committed history, not against a snapshot somebody kept | Bump `rev` without writing `basis`, or change a value without bumping `rev`. The second is the dangerous one: The Manager's seam call and my `asserted_against` list both key on `rev`, so a silent revision defeats the detection rather than tripping it | **RED** — no table. Owner: The Engineer, W1. Close: table lands with `rev` populated |

---

## 8. PDF — containment

**Three gates, and they are not interchangeable.** Extension, size, magic bytes. The measurements in
§0.1 findings 3 to 5 mean the extension gate is open outside `literature/` and the size gate admits
26% of its own target population, so the three are a defence in depth in which exactly one is
currently load-bearing.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| PDF-1 | Zero `.pdf` tracked anywhere in the repository | `git ls-files '*.pdf' '*.PDF'` returns zero lines. Measured in the authoring session: zero | `git add -f` any PDF; PDF-1 returns 1 and names it | green |
| PDF-2 | The ignore rule is repository-wide, not path-scoped | `git check-ignore` reports IGNORED for all eight probe paths: `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf`, `cr_scratch/x.pdf`, `literature/x.pdf`, `literature/isru/x.pdf`, `_intake/x.pdf` | Remove the repository-wide rule; the five non-corpus paths commit cleanly | **green (was RED)** — re-measured 2026-08-28 at read-digest `e06bc06118fa6218`: **five of eight** probe paths committed — `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf` **and `cr_scratch/x.pdf`**. `Q-PDF-IGNORE-OPEN` = 5. **The earlier status on this row said four and named four; it omitted `cr_scratch/x.pdf`, which is my own error and is corrected here rather than argued.** The three `IGNORED` results are all side effects of deny-by-default directory rules, not of any `*.pdf` rule: there is no repository-wide `*.pdf` rule. Part 5 hole 1 is open. Owner: The Systems Engineer at 2.14 (the author's W1 reassignment; `.gitignore` is his write set, not mine). Close: all eight probes report IGNORED and `CON-1` observes it. **CLOSED BY OBSERVATION 2026-08-28, W2-2.** He landed a DELIBERATELY UNANCHORED carrier block at `.gitignore:43`, `*.[pP][dD][fF]` written as character classes rather than as a `*.pdf`/`*.PDF` pair, and stated the exception to the file's own anchoring invariant instead of taking it quietly. `run_suite.js` reports **8 of 8 probe paths IGNORED**; `Q-PDF-IGNORE-OPEN` = 0. Status moves **RED to green** and it is declared here for `SLT-4`, which forbids a silent greening: the close condition this cell already named was met by the named owner, and the runner is the observation. `CON-1` remains the row that keeps it observed rather than remembered |
| PDF-3 | The other published-source carriers are covered | Same check for `.djvu`, `.epub`, `.docx`, `.doc`, `.pptx`, `.ps`, `.tif`, `.tiff` at the same **eight** probe paths — 64 probes, run by `run_suite.js` | Drop `.tif` from the list; page scans are the same licence problem as the PDF | **green, CLOSED BY OBSERVATION 2026-08-28, and the correction routed to me is superseded.** The routed correction said this row was marked green while failing on the measurement that made `PDF-2` fail, and it was right when written. It is no longer true on the data: The Systems Engineer landed the unanchored carrier block at `.gitignore:43–52` at 2.14, and `run_suite.js` now reports **64 of 64 carrier probes IGNORED**. A correction that a repair overtook, recorded rather than deleted |
| PDF-4 | Full-text `.txt` is contained | The three UN treaty texts (18,378 / 23,794 / 27,097 bytes) do not ship. Deny-by-default under `/literature/**` covers them there; assert the containment check covers them **outside** it too | Copy `un-1967-outer-space-treaty.txt` to `docs/`; measured, it is under every size threshold and carries no magic bytes, so only an extension or a content rule catches it | green |
| PDF-5 | `literature/_pdf/` ships nothing, including `.md` | `git check-ignore` reports IGNORED for `literature/_pdf/isru-processing/x.pdf` **and** for `literature/_pdf/isru-processing/x.md` | Move the `/literature/_pdf/` rule above the two `!` re-admissions; the re-admissions then win and a summary misfiled into the PDF store ships | green |
| PDF-8 | It scans the staged set and the tree, and says which | Two modes, two reported scopes. A tree scan that reports as a staged scan is a wrong claim about what was checked | Report the staged scope while scanning the tree; the check passes on a clean stage while the tree carries a PDF | green |
| PDF-16 | An empty stage is not a pass it did not earn | Invoked with nothing staged — which is how `git hook run` invokes it — the check exits 0 **and says it scanned nothing**. It never reports a clean stage as a verified stage | Make emptiness print "OK, no source files found"; the hook then reports a pass on every `git hook run`, which is the assertion asserting its own dispatch. See `check_register.md` §5.1 and the CHK-09/CHK-10 recursion: `git hook run` has no reentrancy guard and sets no environment marker, so an assertion suite that installs the hook and then invokes `git hook run` to prove it fires reproduces the cycle | green |

---

### 8.1 CON — `SLOT-C` filled: the containment assertions

**Written 2026-08-28. Premise P2 HOLDS**: `SLOT-C` depends on no merge output and was writable
immediately. It is the only one of the brief's three premises that held as stated.

**These assert what `PDF-1`…`PDF-16` cannot.** That group asserts that the gates catch things. This
one asserts that the gates are REACHED, that they are reached by the hook rather than only by hand,
and that the harness proving it does not prove it by causing it. None of these nine duplicates a
`PDF` row; where one was close, I asserted the property `PDF` leaves open instead of restating it.

**`PDF-2` may not be closed by scoping the rule back to `literature/`, and `CON-1` is why that is
now mechanical rather than a promise.** There is no repository-wide `*.pdf` rule; the three probe
paths that report IGNORED do so as a side effect of deny-by-default directory rules. A rule scoped to
`literature/` would turn `PDF-2` green while changing nothing about the five paths that commit.

**The empty-stage clause of `PDF-16` may not be relaxed, and `CON-8` fixes its exit code and its
scanned-count in one assertion** so that a check reporting "OK, nothing found" cannot pass as a check
reporting "OK, I scanned and found nothing."

**Relayed to The Systems Engineer at `cr_scratch/relay/spawn/` before he builds
`tools/check_no_sources.js`.** I assert; he builds. `tools/check_no_sources.js` is his write set this
wave and not mine, by the author's ruling, and no row below writes it.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| CON-1 | The eight-path ignore probe is a **fixture that runs**, not a measurement someone once took | A committed fixture runs `git check-ignore -q` over all eight probe paths of `PDF-2` and asserts IGNORED for every one. It reports the probe paths it used, so a shrunken probe set is visible | Drop `cr_scratch/x.pdf` from the probe list. `PDF-2` then goes green over seven paths while the eighth commits — which is not hypothetical: **the earlier `PDF-2` status named four open paths when five were open, and it was I who wrote both the measurement and the row.** A measurement in a status cell decays; a fixture does not | **RED** — 5 of 8 probes commit today, `Q-PDF-IGNORE-OPEN` = 5. Owner: The Systems Engineer, 2.14, `.gitignore` being his. Close: all eight report IGNORED with the fixture committed |
| CON-3 | The containment fixtures never touch the real tree | Tree hash of `literature/`, `_intake/` and `lsei/` before and after the whole fixture run: identical. Fixtures live under `cr_scratch/fixtures/` and nowhere else | Plant `x.pdf` in `oracle/` to test the open path, and forget to remove it. The probe for an ignore hole becomes an actual PDF in the repository, in the one directory where nothing would hide it. This is `MUT-5` applied to containment, and containment fixtures are the ones that plant real carriers | **RED** — no fixtures yet. Owner: The Systems Engineer, 2.14. Close: the fixture tree lands under `cr_scratch/fixtures/` and the hashes match |
| CON-4 | The hook is **wired**, not merely committed | `core.hooksPath` resolves to the committed hook directory, and the file at `<hooksPath>/pre-commit` is the committed `tools/githooks/pre-commit` — compared by content, not by existence | Commit the hook and never set `core.hooksPath`. Hooks are not cloned, so every fresh clone has a committed hook that never runs, and every check wired to `pre-commit` silently never fires. `CHK-10` is the trigger for the whole containment chain; unwired, it is `CHK-03` with a script behind it | **RED** — 2.14 is not built. Owner: The Systems Engineer, 2.14. Close: `CHK-29`'s HK-1/HK-2 observed passing from a fresh clone |

---

## 9. REG — register integrity, `oracle/register_schema.md` §§3, 8, 9

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| REG-1 | The sidecar is a **set** of files | The loader takes a list of register paths and unions them. There is no `oracle/REGISTER.tsv` and the loader refuses to create one | Concatenate the two halves into one file. Measured at R-2: two `H` rows, 143 failure lines under `ecr_verify.js` — 40 `L4` leaves addressed against the wrong root and 101 `B3/K2` keys occurring in no member | green |
| REG-2 | SET-1: one `basis_root` per file, governing every row in it | Exactly one `H` row per file, and it is the first non-comment row | Splice a second `H` row at line 98 of a copy. L0 must report "row 98 is a second H row" and the `L2` lines must report the **first** header's counts. Before R-3 the loader read `if(t==='H') H=f` — last-H-wins — and silently validated the second | green |
| REG-3 | SET-2: axis ids are unique across the loaded set | The loader unions every file's axes and refuses a duplicate id by name, naming both files. Known answer: 2 files, 33 `A` rows, 33 distinct ids | Rename one `ECR-` axis to `LCC-12` in a copy. `LCC-12` is authored once on the lunar side, so every per-file check passes and only the set check fires | green |
| REG-5 | L2: the self-declared size is checked | Parsed `A` rows == `H.axis_count`; parsed `M` rows == `H.member_count`. Known answers: lunar 15/81, econ 18/53 | Delete one `M` row without touching the header; L2 fires. This is the `H`-row known-answer clause, and it is the cheapest test in this step | green |
| REG-7 | L4: every `M.leaf` resolves | Every member leaf resolves in the leaf index built from `listCorpusFiles()`. Known answers pre-merge: lunar 59 of 59 distinct names resolve, econ 30 of 30 | Rename one landed summary without updating the register; L4 fires with `axis-incomplete` for that axis and names `H.basis_root` and `H.basis_ref` | green |
| REG-8 | L4 resolution is **unique**, not merely non-empty | Every `M.leaf` resolves to exactly one file. Member rows carry bare filenames — measured: 0 of 81 lunar and 0 of 53 econ contain a `/` — so resolution is a recursive walk, and after the merge that walk spans eleven folders and 185 files instead of eight and 152 | Land the unresolved `gdp`/`GDP` pair on a case-sensitive filesystem; `gdp.md` then resolves to two files and a bare name resolves to the wrong one outright. A "resolves" check with no uniqueness clause passes | green |
| REG-10 | The `basis_root` rebind is two edits, not 134 | Post-merge, each `H.basis_root` is `literature` and no `M` row was rewritten. Measured: neither register contains the string `lsei/literature/` at all | Rewrite member rows to full paths; 134 edits replace 2, and every subsequent rename breaks a path instead of a name | green |
| REG-11 | `basis_ref` names a ref that resolves in the tree it describes | For each register, `basis_ref` resolves in the repository holding `basis_root`'s files | Measured: `REGISTER.econ.tsv` names `c42a217`, which does **not** resolve in `lsei` or `cr-agents`, resolves in *this* repository as a commit about the answering-loop suite, and tracks **zero** files under `_intake/`. It is a timestamp with a hash on it. REG-11 is the test that says so | **RED** — owner: The Engineer at 2.16. Close: the econ register's `basis_ref` names a ref that tracks the files it describes, or reads `none`, which §3.1 permits and which is a true statement |
| REG-12 | L5: side arity by class | `two_sided` and `false_pair`: ≥2 distinct `M.side`. `one_sided`: exactly 1 | Delete the second side of a `two_sided` axis; the axis then satisfies "every member resolves" and cannot deliver a contested answer | green |
| REG-13 | B4: the in-file block round-trips, in **both** directions | For every summary, the set of `(axis_id, side)` pairs in its `## Contested` block equals the set of `M` rows naming its leaf | Delete one `M` row while leaving the block. Run one way only and the file passes: a member that lost its row is exactly the failure B4 exists to catch | green |
| REG-14 | The in-file block grammar is minimal | Literal `## Contested`, then `- <axis_id> <side>` lines and nothing else — no bold, no backticks, no paths, no prose, no keys | Add `match_keys` to the block. Measured at §8: a rich in-file block costs 7.73% mean IDF loss on live keys and gains 14 spurious confirmations, because it writes the question's own words into member bodies. A rich block is a fabrication vector | green |
| REG-15 | The block is generated, never hand-written | Regenerate every block from the register set and diff against the files; any difference fails | Hand-edit one block; the diff fires. Same posture as FLD-10 and `COUNTING_RULE.md` M6 — the hand-maintained-copy class is removed structurally, not by vigilance | green |
| REG-16 | Retrieval excises the block before tokenizing | `corpusDocFrequency()` and `confirmInText()` both remove the region from `## Contested` to the next `^## ` or end of file. Assert on the tokenizer's output, not on the source text | Excise in one and not the other. Even the minimal block leaks through its heading: `contested` is an English word, and every member summary carries it | green |
| REG-17 | The excision is a requirement on retrieval, not a convention | Grep the retrieval layer for the excision; assert it is present in both call sites and covered by its own test in the Step 3 suite | Remove it from one site. The minimal field set is what makes forgetting the excision survivable rather than catastrophic, so REG-14 and REG-17 must both hold — neither substitutes for the other | green |

---

## 10. CNT — the counting rule, `COUNTING_RULE.md` §§2, 3, 8, 9

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| CNT-12 | **Every instrument under `tools/` is TEXT to git** | For every `.js`, `.sh` and hook under `tools/`: zero NUL bytes inside git's first-8000-byte text/binary window, so `git diff` renders it line by line. Run by `run_suite.js`. **The close condition is `git diff --numstat` showing real add/delete counts and `file(1)` reporting text — NOT the exit code**, which was 0 throughout and proves nothing about this | Use a raw NUL as a key separator inside a string literal instead of the escape `\0`. Identical behaviour, identical key space, and the file becomes binary to git. Measured at this wave's open: `tools/check_registers.js` (NULs at 7926, 7953, 8500) **and `tools/manifest.js`** (3361, 3410, 3426) were both binary, `git diff` printed `Binary files … differ` and `--numstat` printed `-\t-`. **Two of the repository's enforcement instruments had never produced a reviewable diff, and one of them is where the read-digest is computed.** No assertion anywhere said an instrument must be reviewable; the property that failed is not "the script works", it is "a human can review a change to the script" | **green — closed by observation 2026-08-28, W2-2.** Both files repaired by replacing each raw NUL with `\0`; both now `file(1)`-text and both diff line-level. `run_suite.js` reports all instruments under `tools/` text to git |

---

## 11. SLT — the four amendment slots

**A slot that never fills must be visible as an empty slot rather than as an absence.** That is the
whole reason these exist. 2.4, 2.10, 2.13 and 2.15 keep their numbers and their owners; what changes
is that their output amends **one contract** instead of standing as four assertion lists nothing
reconciles.

### 11.1 The slots, declared by id

| Slot id | Sub-step | Owner | Opens when | May add | May **not** weaken | Fill state |
|---|---|---|---|---|---|---|
| **SLOT-A / 2.4** | Merge assertions | **The Software Engineer (written)**; The Engineer executes 2.5. Reassigned by the author 2026-08-28 under `SLT-7`/`SLT-8` | 2.2 and 2.3 have landed — the assertions are parameterized on the dispositions and the folder assignment | Assertions on merge disposition per pair, on the primary/secondary call, on folder placement, and on the refusal behaviour for an unresolved collision | **CRP-4 and CRP-5 may not be narrowed to a case-insensitive rule.** No test may move from RED to green without its named close condition being met. No test may be deleted; a test believed wrong is argued, not removed | **FILLED (12 tests, MRG-1…MRG-12, §7.1, 2026-08-28).** Written against the declared column contract while `cr_scratch/merge_plan.tsv` did not exist, then RUN against it when it landed the same day: **3 green, 1 `H`, 8 RED, on real data.** `SLT-7` discharged for the five rows observed failing and the three observed passing; NOT discharged for the four that assert on the merge command, which does not exist. `CRP-4`/`CRP-5` unchanged and un-narrowed; `MRG-9`/`MRG-10` add the §7 dedup-key scope beside them and found **6 collisions**. `MRG-4` is a **contract collision** awaiting a ruling — see §11.3 |
| **SLOT-B / 2.10** | PDF-pull assertions | **The Software Engineer (written), W2-2; The Engineer executes 2.11.** Same split as `SLOT-A`, for the same `SLT-8` reason | 2.5 has landed and the taxonomy folders exist | Assertions on the T1–T4 tiers, on the hand-queue population, on the pulled byte count against the known answer of 224,042,382 bytes, and on the orphan report | **PDF-11's byte-and-unit clause may not be relaxed to a bare "MB".** T3 and T4 may not acquire a further automatic tier; adjacency produced 2,024 candidate pairings and matched `un-1967-outer-space-treaty` to thirteen PDFs | **DECLINED (sub-step 2.11 retired, W5-6, 2026-08-29).** The twelve `PUL` rows this cell claimed were never in this file and the section it cited, §8.2, does not exist -- a `FILLED` claim naming rows nobody wrote, which is none of `SLT-2`'s three legal states. The slot is now correctly `DECLINED` rather than corrected to a smaller number, because **the artifact these assertions were written against will never exist**: 2.11 is retired and there is no landed PDF store under `literature/_pdf/`. Sources resolve through `tools/source_roots.local` instead, and the copyright audit reaches 160 of 166 that way. The cell's old text also stated `literature/` holds zero files; it holds 169. **`PDF-11`'s byte-and-unit prohibition is not thereby relaxed** -- it binds any future pull, and the known answer of 224,042,382 bytes is retained above as the record of what was once measured |
| **SLOT-C / 2.13** | Containment assertions | **The Software Engineer (written); The Systems Engineer builds 2.14.** Reassigned by the author 2026-08-28: the two were one seat and are now two | Immediately — it depends on no merge output | The five fixtures, the bootstrap wiring assertion, the `git hook run pre-commit` invocation check, and a reentrancy fixture | **PDF-2 may not be closed by scoping the rule back to `literature/`.** The empty-stage clause of PDF-16 may not be relaxed. No assertion may invoke the event it asserts — CL-8(a) and §5.1, and the CHK-09/CHK-10 recursion is why | **FILLED (3 tests, `CON-1`, `CON-3`, `CON-4`, §8.1).** The cell claimed nine; six were deleted in the W5-4 suite triage and the count did not move with them, so it named `CON-1…CON-9` against three surviving rows. Corrected to what is in the file. `CON-1` still makes `PDF-2`'s scoping prohibition mechanical. **The three deleted assertions that carried a prohibition are owed and named rather than dropped**: `PDF-16`'s empty-stage clause, the no-self-invocation rule of `CL-8(a)`, and the reentrancy fixture. The prohibitions themselves stand in §5.1 and are unaffected by the loss of their bindings |
| **SLOT-D / 2.15** | Register assertions | The Software Engineer | 2.5 and 2.16 have landed | Post-merge L0–L5 and B1–B7 runs against the merged corpus root, the CHK-03/CHK-05 consolidation into CHK-04, and the `H`-row known-answer checks | **REG-8's uniqueness clause may not be dropped back to "resolves".** The consolidation may not be deferred again: CHK-03 sat on a gate with `on_failure: none` for eleven sub-steps and was unwired at R-2 rather than fixed | **EMPTY** |

**Live position, not withdrawn.** 2.15 is the wrong date for the CHK-03/CHK-05 consolidation. A check
that cannot fail sitting on a gate is the defect still running, not a debt, and the R-2 unwiring
treated the symptom. SLOT-D is where it lands under the current plan and I am recording the
disagreement rather than relitigating it here.

### 11.2 Standing tests on the slots themselves

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| SLT-1 | All four slots are declared by id in this file | The four ids `SLOT-A` to `SLOT-D` appear in §11.1 with an owner and an opening condition | Delete a slot row; the sub-step's output then has nowhere to land and reconciles with nothing | green |
| SLT-2 | An unfilled slot reads `EMPTY`, not blank | Each slot's fill state is one of `EMPTY`, `FILLED (n tests)`, or `DECLINED (reason, owner)` | Blank the cell; an absence and an empty slot then look identical, which is the failure the slots exist to prevent | green |
| SLT-5 | The suite's declared test count is updated with every fill | The header count equals the counting rule's result over this file | Fill a slot without updating the header; the file stops declaring its own size, which is the `H`-row remedy applied to a suite | green |

---

### 11.2a The `PTH-9` relocation executed mid-wave, and `PTH-13` caught a live hard failure

`literature/NAMING.md` → **`oracle/NAMING.md`**, by The Systems Engineer, between read-digest
`ef803a7a63cf24a8` and `d77ca1899f73b455`. All four rows run against the completed move:

| Row | Result | Status |
|---|---|---|
| **`PTH-9`** | Zero `.md` at depth 1 under `literature/`. The walker no longer returns the naming contract as a corpus document | **green** — closed by observation, not by date |
| **`PTH-12`** | Exactly one `NAMING.md` in the repository. Moved, not copied; no compatibility copy left behind | **green** |
| **`PTH-13`** | **RED, and it caught a real hard failure the same hour it was written.** Three live citations of the old path survive: `oracle/MANIFEST.tsv`, `tools/merge_identity.js`, `lunar-oracle-gameplan.md`. The manifest one is the mutation this row names, verbatim — **`FAIL MF-1 row literature/NAMING.md is promoted but no file exists at that path`**, a hard failure that did not exist before this wave. `COUNTING_RULE.md` and `oracle/bootstrap_contract.md` were repointed correctly | **RED** — 3 live citations. Owner: The Systems Engineer for the manifest row and `merge_identity.js`. Close: live count zero and `MF-1` green |
| **`PTH-14`** | `oracle/NAMING.md` is NOT ignored and is tracked. **The failure mode the ruling created did not occur** — he moved it under `oracle/`, which carries no deny rule, rather than under a deny-scoped path | **green** |

**`PTH-13` is the row that earned its place.** I wrote it on the argument that a relocation which
breaks `MF-1` is a relocation nobody finished; it broke `MF-1` within the hour, and the assertion
names the file, the row and the reason rather than leaving somebody to diff a hard-failure count that
also moved for three unrelated reasons that day.

**And the `M13` consequence predicted in §0.1 arrived with the move.** Measured before: 5 findings
over 87 files, **1 excluded** as `literature/**/*.md` — that one being `NAMING.md`. Measured after:
5 findings over 99 files, **0 excluded**. `NAMING.md` has re-entered `M13`'s population because the
exclusion is keyed on the PATH and not on the document. Correct, and nobody asked for it.

### 11.3 The `asserted_against` list, and the criterion changes this fill made

**The list is the trigger for The Manager's seam call, so it has to exist before there is anything to
put in it.** The rule: every `MRG` row records the `merge_plan.tsv` row ids it was asserted against
and the `rev` those rows carried at the moment of assertion. If any listed row is later revised —
`rev` bumped on `disposition`, `primary_secondary` or `target_folder` — the seam call fires and W1
splits, per The Manager's threshold, regardless of the Block 2 churn figure.

**The table landed mid-deliverable and both moments are recorded, which is the read-digest doing its
job on its own author.** `cr_scratch/merge_plan.tsv` did not exist at read-digest `e06bc06118fa6218`
and did exist at `ef803a7a63cf24a8`. **The twelve rows were written against nothing and then run
against something**, both on 2026-08-28, and the two states are distinguished by digest rather than
by memory. Premise P1 was false when measured and true an hour later; neither statement corrects the
other.

**All 176 rows asserted against, at `rev` as committed.** Block 1 rows 1–117, Block 2 rows 1–59.
Five rows carry `rev > 1` (churn 5/59 = 8.47%, under The Manager's 15%) and all five carry a `basis`.
**The seam call's side condition is now live: any revision to any of these 176 rows fires it.**

| `MRG` row | Result against `merge_plan.tsv` @ `ef803a7a63cf24a8`, 2026-08-28 | Status |
|---|---|---|
| **MRG-1** | 17-column header row present, 176 data rows, **0 rows with a wrong field count**. But **the size declaration is in a COMMENT** — `# rows = 176 block1 = 117 block2 = 59` — and there is no `^H` row. A comment is not parsed by anything. The open-column-set hole IS closed by the header row; the self-declared size is not | **RED** — comment, not `H` row. Owner: The Engineer. Close: an `H` row |
| **MRG-2** | Seven dispositions, every row in the set, zero blanks: `LIFT` 52, `LIFT-IDENTICAL` 65, `LIFT-LSEI-SCRUB` 5, `LIFT-LSEI-STEP0` 3, `HOLD-NOID` 34, `HOLD-PAIR` 16, `HOLD-FALSEMERGE` 1. **The set is declared in a comment, not in a legend a checker reads** | **RED** on the legend only; the data passes |
| **MRG-3** | 176 rows against the 176-key union; 117 + 59 = 176 closes | **green** |
| **MRG-4** | **CONTRACT COLLISION, and it is the finding of this fill.** His `primary_secondary` means *which corpus copy supplies the bytes* — `sole-lsei` 57, `sole-intake` 24, `both-identical` 87, `lsei-primary` 8 — and **not** the pair primary. He defers pair adjudication to the `DUP-xx` register rows, deliberately and correctly. So: **8 `pair_id` groups, and 0 of them have exactly one member marked primary**, because that is not what the column carries. **My row asserts a property of a column that has the name I expected and a different meaning.** Not his defect and not mine: two seats, one column name, two contracts — `CHK-13` again, caught this time | **RED, pending a ruling on which artifact carries the pair call.** See §11.3 note |
| **MRG-5** | Not machine-checkable from the table alone: `basis` is prose. The five differing same-name pairs are `HOLD-PAIR`/`HOLD-FALSEMERGE` and none is dispositioned by size in the text | **H** — a human gate, and it is a reading, not a script |
| **MRG-6** | **0 rows** where `target_path` disagrees with `literature/` + `target_folder` + `key` | **green** |
| **MRG-7** | The table's own header states it: *"THE MERGE GLOB IS `*.md`, NEVER `*`. lit/ holds 115 non-`.md` siblings and a bare `*` sweeps them into retrieval."* Stated; the merge command it governs does not exist yet | **RED** — no command to assert against. Owner: The Engineer, 2.5 |
| **MRG-8** | No merge command exists | **RED** — Owner: The Engineer, 2.5 |
| **MRG-9** | **6 within-folder `dedup_key` collisions** at the Wave 1 fill, `L0` rows excluded; 8 by Wave 2. **Superseded 2026-08-29:** that figure was the merge PLAN, and the merge moved at 2.5. Re-grounded on the shelf, **1 finding across 169 files** — the two LSIC newsletter issues. The other 7 were `pair_primary=secondary` rows that never landed, now counted and reported separately | **RED** — 1 finding, adjudicated in §7.1's `MRG-9` row: not a duplicate pair, a `dedup_key` too coarse to distinguish two issues of one serial. Owner: `NAMING.md` §7 |
| **MRG-10** | **6 whole-tree collisions, the same 6. All six are same-folder, so `MRG-10` finds nothing `MRG-9` missed — TODAY.** That is not the assertion passing vacuously; it is the two scopes agreeing at this placement. **Two reviewers are cutting folder assignments this wave.** Move one member of any of the six to another folder and `MRG-9` goes green while the collision survives. `A7` is general for exactly this, and the window is open right now. **Superseded 2026-08-29 to 1 finding, shelf-grounded**; the sentence above still holds of that one | **RED** — 1 finding. The vacuous-pass risk is live, not theoretical |
| **MRG-11** | **5 rows with `rev > 1`, 0 of them with an empty `basis`.** Append-only discipline held | **green** |
| **MRG-12** | No merge command exists | **RED** — Owner: The Engineer, 2.5 |

**Three green, one human gate, eight red — and `SLT-7` is discharged for the four rows that had
something to run against.** `MRG-3`, `MRG-6` and `MRG-11` were observed passing and `MRG-1`, `MRG-2`,
`MRG-4`, `MRG-9`, `MRG-10` were observed failing on real data, dated 2026-08-28, before 2.5 runs.
**The four that assert on the merge COMMAND — `MRG-7`, `MRG-8`, `MRG-12` and half of `MRG-5` — remain
undischarged**, because the command does not exist, and I am not recording them as proved.

**`MRG-4` needs a ruling and it is not mine to make.** Either the pair primary is a column of this
table, or it is a `DUP-xx` register field and `MRG-4` must assert on the register instead. His design
is defensible — *"this table never adjudicates a pair"* — and my row was written on the brief's
phrase "the primary/secondary call", which turns out to name two different things. Routed to The
Manager in `## Not mine`; **I have not rewritten `MRG-4` to fit whichever answer is convenient**, and
it stays red until somebody rules.

**Criterion changes made by this fill, declared here so `SLT-4` sees them.** `SLT-4` forbids
narrowing a criterion while filling a slot, and it is asserted on the criterion strings, so three
strings changed and every one must be accounted for:

| Row | Change | Weakened? |
|---|---|---|
| `FLD-7` | Grep scoped to executable code; a `FIELDS.tsv` mutation assertion added | **No — strengthened.** The old string would have gone red on a generated cache. Two clauses now hold where one did |
| `FLD-11` | Three columns → four | **No — strengthened.** One more column must hold. My three-column form was wrong against the landed generator specification |
| `PDF-2` | Status corrected: four open probe paths → five | **No — corrected upward.** The pass criterion now names all eight probes. The old cell understated my own measurement |

Nothing was narrowed, nothing moved RED to green, nothing was deleted. `PTH-9` stays RED and gained
`PTH-12`, `PTH-13`, `PTH-14` rather than being closed by the ruling that resolved its question.

---

## 12. MUT — the falsifiability meta-suite

Six tests on the suite itself. This group is why the mutation column is a column and not a comment.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| MUT-1 | Every test states a mutation | Zero rows in §§1–11 have an empty mutation cell | Add a test with no mutation; MUT-1 names it. An assertion with no stated mutation is CHK-03 again | green |
| MUT-6 | Every RED test has an owner and a close condition | Each RED row names both, and the close condition is an observation rather than a date | Write a RED with a date and no observation; a close condition that is a date closes when the date passes, whatever the state of the world. LIM-3 stayed red on purpose with a named owner and a close condition, and that is the pattern | green |

---

## 13. The A.10 step 2 source-verification gate — the tests I cannot run

**Most of this suite cites landed on-disk contracts** — `NAMING.md`, `register_schema.md`,
`check_register.md`, `COUNTING_RULE.md`, `.gitignore`, and measurements I took myself in the
authoring session and stated with their commands. Those I verified at write time and they are mine.

**The tests below make a claim about what a corpus source says**, and I cannot verify them against my
own suite. Under A.10 step 2 they are not part of the contract until **The Fact-Checker** has run the
gate on them, in Wave 2, as she did on the 1.11 suite for the same reason.

| Test | The source claim it makes | What the gate must check |
|---|---|---|
| **PRV-13** | The `doi:` recorded in a `## Provenance` block is the DOI the source prints | Open the source; confirm the DOI, `10.` onward, matches character for character. A single altered digit still parses and points at a different paper |
| **PRV-15** | A file labelled `contains-transcribed-source-text` is one whose measured verbatim overlap with its paired PDF is above the Open Question 8 threshold — and no file above the threshold is labelled `own-summary` | Open a sampled set of both classes; confirm the label and the measurement agree. `audit_abstract_overlap.js` measures overlap and classifies nothing; the classification is a person's, and the label is what ships |
| **SLOT-B, on fill** | The 2.7 `stated_as_of` tests: a programme-state snapshot's as-of date is the date the source states | Open the source; confirm the date. A programme-state summary carrying the summarizer's date rather than the source's is stale on landing day and reads current |
| **SLOT-A/B, on fill** | The 2.12 verbatim-overlap tests: the classification of a passage as transcribed or summarized | Open the source and the summary; confirm the classification. A shingle detector measures overlap, not passing-off, and the difference is visible only by opening the file |

**Four entries, and that is the whole list.** It is short because the suite was written to make it
short: wherever a property could be asserted against a landed on-disk contract instead of against a
source's content, it was. PRV-6 and PRV-8 look like source claims and are not — they assert that a
path resolves, which is a fact about the filesystem.

**Until the gate runs, PRV-13 and PRV-15 are UNVERIFIED and this suite is not the contract on them.**
That is the rule, and I am applying it to my own file. A test that attributes a requirement to a
source without verification is an assumption dressed as a requirement.

### 13.1 The gate ran, returned a NEGATIVE on both rows, and both rows are now repaired

**The Fact-Checker ran the A.10 gate in Wave 1 and it came back against the suite rather than against
the corpus.** Both rows were wrong in the same way and neither claim was: a row that cannot be
satisfied by a correct corpus is a row, not a finding.

| Row | What she found | What was repaired, 2026-08-28, W2-2 |
|---|---|---|
| `PRV-13` | The claim is TRUE and **stronger** than the row stated — a full census of 30 openable sources found **zero altered DOIs and nothing fabricated**. But **16 of 30 sources print no DOI**, and a two-outcome row goes red on sixteen correct values | A **third outcome**, `SOURCE PRINTS NO DOI`, with a **named non-source authority** required on every instance. And the second reason she could not have known to give: where `Publisher URL:` is a DOI resolver URL, **that** is the identifier — 8 of the 176-key union carry one with no `DOI:` line, and `merge_identity.js` already keys all 8 at `L1` from it |
| `PRV-15` | Both label classes are empty, so the row was **vacuously green** and could not be gated at all; and `tools/audit_abstract_overlap.js` returned **zero findings** because its heading regex demanded a bare `## Abstract` | A **non-vacuity pre-condition** (both classes non-empty, else UNRUN) and a **pre-condition on the instrument** (`abstractOf()` non-null on every file with an Abstract heading). The tool is repaired: **194 → 267 abstracts extracted** on the 271-file union, and on `_intake/japanese-miracle/lit` it goes from **0 findings to 8**, topping out at **100.0% verbatim** |

**SHE COULD NOT RELAY EITHER FINDING TO ME. HER WRITE SET FORBADE IT AND NOBODY RELAYED IT FOR HER.**
That is a clause-8/9 defect costing a real finding — the highest-overlap file in the corpus is
100.0% verbatim and the instrument that decides the licence label could not see it — and it is why
those clauses were rewritten for this wave. Recorded here rather than in a process document, because
the place a lost finding should be visible is the row it was lost from.

### 13.2 What The Fact-Checker has to do to re-run the gate

**She is not spawned this wave, so this is written as an instruction rather than as a result.** The
gate is re-runnable and these are the four things it needs.

1. **`PRV-13`, outcome census.** Re-run her 30-source census against the repaired row and report
   **three** numbers, not two: `(a) MATCH`, `(b) MISMATCH`, `(c) SOURCE PRINTS NO DOI`. The row
   passes at `(b) = 0`. Her existing census already contains the data — the 16 she scored as
   failures are `(c)` — so this is a re-scoring of a completed measurement, not a re-read of 30 PDFs.
2. **`PRV-13`, the authority column.** Every `(c)` needs the non-source authority named and its
   response recorded: `api.crossref.org/works/<doi>` → 200 with a matching title, else DataCite, else
   the publisher landing page. **This is the only genuinely new reading work** and it is bounded by
   the size of `(c)`.
3. **`PRV-13`, the resolver-URL population.** Re-score the 8 union rows whose identifier is inside a
   `Publisher URL:` DOI resolver line with no `DOI:` line — `just-2020`, `kiewiet-2026`,
   `kokkinis-2024`, `liu-2025`, `matthews-2026`, `smith-vaniz-2026`, `speyerer-2013`, `poston-2020`.
   A check keyed on `DOI:` scores all 8 as identifier-less.
4. **`PRV-15`, and it CANNOT be run until the merge lands.** The row now refuses to pass vacuously,
   so it needs a non-empty `Licence` population, which does not exist until 2.5 writes `## Provenance`
   blocks. **Until then the correct verdict is UNRUN, and UNRUN is not green.** When it can run, the
   instrument is ready: `node tools/audit_abstract_overlap.js literature/_pdf/<folder> 10`, and the 8
   files it now surfaces on `_intake/` are the first population to adjudicate.

---

## 14. What this suite does not do

It does not assert that the taxonomy is the right taxonomy. Eleven folders against nine is a
navigation judgement, it belongs to 2.3's reviewers, and a test that encoded my preference for it
would be a preference wearing a test's clothes.

It does not assert that a merge disposition is the right disposition. It asserts that the disposition
is in the closed set, that it is recorded, and that it agrees with the evidence in the same block.
Whether `csank-2022`'s 23,190-byte summary should be primary over its 7,637-byte twin is an
adjudication, and adjudications go to people.

It does not assert anything about answer quality. That is the 1.11 suite's, at 216 tests, and this
one does not duplicate a line of it.

It does not run. `oracle/tests/` is outside every declared scan root, no runner exists, and the
`merge-gate` trigger two of its load-bearing rows name has no dispatcher. §0.2 states that and routes
it to 2.20. Until then this is a contract that a person applies, and saying so is cheaper than
discovering it at the gate.

**And after the Wave 1 fill it still does not run, which is now worse rather than the same.** At 148
tests nothing invoked, this was a document. At 175, with `SLOT-A`'s twelve rows standing between the
disposition table and the merge and `SLOT-C`'s nine standing between the hook and the corpus, it is a
document that three sub-steps are relying on as a gate. Two specific holes, both already routed and
neither mine to close:

- `oracle/tests/corpus_suite.md` **has no `oracle/MANIFEST.tsv` row.** `tools/manifest.js --unlisted`
  reports it, along with `tools/check_registers.js` and `tools/manifest.js` itself. `AMC-3` requires
  every amendment target to be a manifest row, so an amendment against this file has nowhere to be
  recorded — which is `AM-129`'s pattern and `AM-144` is its first instance to block a row rather
  than merely be noted. `MANIFEST.tsv` is not my write set; routed.
- **`SLT-7` cannot be discharged for `SLOT-A`.** It requires every assertion observed RED against a
  deliberately broken fixture, dated, before 2.5 runs. There is nothing to break: the artifact does
  not exist. The twelve rows are RED for the honest reason and not for the asserted one, and the
  difference matters — a test red because its subject is missing has never been shown able to go
  green, so it has never been shown to be a test. `SLT-9` is the row that makes this state visible in
  the fill cell rather than only here.

A suite nobody invokes is a document. I have said that about somebody else's row, I said it about
mine at 148, and adding 27 tests did not change it.
