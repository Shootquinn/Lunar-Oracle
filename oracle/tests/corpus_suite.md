# The corpus acceptance suite — Step 2

**Written before 2.1, 2.2 and 2.3 ran, and that is the point.** Every test below asserts a property
of the **target state** — the corpus as it must be at the Step 2 gate — rather than an output of the
three measurement sub-steps. A suite written against 2.1's numbers would be a transcript of 2.1, and
2.1's author is the seat that executes 2.5. This suite is authored by a seat that owns no merge
output in this step, which is the whole of its value.

**189 tests.** Counting rule: rows in the **fifteen** tables of §§1–12 whose first cell matches
`^[A-Z]{3}-[0-9]+[a-z]?$`, counted over this file. Per group: NRM 9, NAM 16, PTH 14, FLD 14, PRV 17,
DUP 11, CRP 13, **MRG 13**, PDF 16, **PUL 12**, CON 9, REG 18, **CNT 12**, SLT 9, MUT 6.

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

**Authorities this suite binds to, by address.** `literature/NAMING.md` §§1–3, 7, 8, 9, 11;
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
   **RULED by the author, 2026-08-28: relocation.** Not the by-name exception, not re-rooting
   retrieval. `PTH-9` stays RED with its close condition rewritten to the ruling, and it gained three
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

## 1. NRM — `normalize()`, `NAMING.md` §1

The merge key. Nine tests, because a seven-line function that decides which files survive a merge
earns nine and not thirty.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| NRM-1 | The landed implementation is the seven steps, in order | The merge tool's `normalize` produces, for all 185 raw leaf names of the union, exactly the output of the §1 pseudocode implemented independently in the harness. Set equality on pairs, not on counts | Swap steps 2 and 3, so `.MD` lowercases into the name instead of being stripped; `ISNPS_Tech_Report_97.MD` then keys as `isnps-tech-report-97-md.md` | green |
| NRM-2 | Steps 4 and 5 are separate | `a_ _b.md` normalizes to `a-b.md`, **and** an authored double hyphen collapses while an authored single hyphen survives: `a--b.md` → `a-b.md`, `phase-i.md` → `phase-i.md` | Merge steps 4 and 5 into one class `[-_ ]+`. The distinguishing case is a name mixing an authored hyphen with an underscore run; if no case in the union distinguishes them, NRM-2 is **deleted** rather than carried green | green |
| NRM-3 | Exactly one trailing `.md` is removed | `x.md.md` → `x.md.md`, not `x-md.md`. Asserted against the literal §1 wording "exactly that one trailing occurrence" | Change the strip to global | green |
| NRM-4 | Idempotence | `normalize(normalize(x)) == normalize(x)` for all 185 union names and for 500 generated adversarial names (leading and trailing hyphens, runs, mixed case, `.MD`) | Remove step 6, the trim; `-x-.md` then oscillates | green |
| NRM-5 | Totality over the union | Every one of the 185 raw names normalizes without exception and without an empty result; zero names produce `.md` alone | Feed `___.md`; assert the implementation refuses rather than emitting a bare `.md` key that every other empty name would then collide with | green |
| NRM-6 | The nine changed names are exactly the nine | The set of union names for which `normalize(x) != x` has cardinality 9 and equals the baseline's named nine | Rename any one of the nine in a source tree copy to its normalized form; the count drops to 8 and the set no longer matches | green |
| NRM-7 | No stemming, no reordering, no year extraction | `normalize` is a pure function of the string with no dictionary, no token sort and no `\d{4}` regex. Asserted as a property: a shuffled-token name preserves its shuffle | Add a token sort; `take-or-make-in-space.md` becomes `in-make-or-space-take.md` and two distinct sources key alike | green |
| NRM-8 | Normalization runs **before** the regex test | The merge calls `normalize()` then tests `R_S`. Asserted on `Take or Make in space.md`, which fails `R_S` raw and passes normalized | Reverse the order; 9 of 185 legal names then fail to land and the merge exits non-zero on files that are correct | green |
| NRM-9 | The merge records; it does not rename | A name failing its namespace regex after normalization is not written under a repaired name. The merge exits non-zero naming the file, and leaves no partial corpus — asserted by tree hash before and after | Add an auto-repair branch that strips illegal characters; the run then exits 0 with a file on disk under a name nobody chose | green |

---

## 2. NAM — namespaces, regexes and convention shape, `NAMING.md` §§2–3 and §11 A1/A2/A5

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| NAM-1 | Every landed summary matches `R_S` | For each `f` under `literature/`: `R_S.test(leaf(f))` | Rename one landed leaf to `Csank-2022.md` | green |
| NAM-2 | No landed summary matches `R_F` | For each `f` under `literature/`: `!R_F.test(leaf(f))` | Copy `findings/fa2-growth-model-doubling-verdict-table.md` into `literature/growth-theory/`; the answering loop would then cite one of this project's own verdicts as a source | green |
| NAM-3 | Every findings file matches `R_F` and not `R_S` | For each `f` under `findings/` | Rename an `fa0-` file to `fa-0-`; the digit is eaten by the length filter and the name matches neither namespace | green |
| NAM-4 | The regexes are disjoint, asserted rather than assumed | Over all 185 union leaf names plus the 19 renamed FA names, zero strings match both | Relax `R_S`'s negative lookahead `(?!fa[0-8]-)`; the 19 FA names then match both and classification stops being total | green |
| NAM-5 | A name failing its regex does not land | The merge exits non-zero, names the file, and `literature/` is byte-unchanged — asserted by tree hash before and after | Make the merge `continue` past a failing name; the tree hash differs and the run exits 0 | green |
| NAM-6 | The failure is at merge time and never at query time | The retrieval layer performs no filename validation. Asserted by grepping it for `R_S`, `R_F` and any leaf-shaped regex: zero hits | Add a soft filename check to retrieval; the corpus acquires a state one component tolerates and another rejects, which is the §2 clause 3 failure | green |
| NAM-7 | CI enforces both namespaces on every run | `tools/check_corpus_collisions.js` walks both shelves and exits 1 on any A2 violation, naming the file and the clause | Plant an `R_S` violation; assert exit 1 and the file named on stdout | **RED** — measured: the checker implements A1 only and exits 0. A2–A5 are §11 additions to that file and do not exist. Owner: The Software Engineer, at 2.13's neighbour. Close: A2–A5 landed in `check_corpus_collisions.js` and each proved able to fail |
| NAM-8 | A1 tokenizer distinctness, per shelf | No two files on one shelf produce the same sorted `filenameTokens()` output | Land `csank-2022-powering-the-moon-2.md` beside `csank-2022-powering-the-moon.md`; both tokenize to `[csank,2022,powering,moon]` | green |
| NAM-9 | A1 runs **per shelf**, not over the union | The check runs twice, with two roots. A cross-shelf token collision is not a failure and is not reported as one | Run A1 over a union root; a legitimate cross-shelf pair then reports a defect that is not one, and the check gets switched off | green |
| NAM-10 | No landed name ends in `-<digit>` | Zero landed leaves match `-\d\.md$` | Land any `-2` name. NAM-10 and NAM-8 fire together, which is the design: the numeric suffix is invisible to the tokenizer and visible here | green |
| NAM-11 | A5: the identity segment survives the tokenizer | For every summary, `tokenize(leaf.split('-')[0]).length == 1` | Rename a file to `the-2020-x.md`; `the` is a stopword and tokenizes to length 0, so the +3 identity anchor is permanently dead | green |
| NAM-12 | The §10 exceptions are whitelisted by name, never by pattern | The whitelist is a literal list of leaf names; assert it equals the §10 set and that no entry contains a regex metacharacter | Replace the `may-1977-…` entry with `^may-`; a second stopword-led file then passes silently and the exception stops being a decision | green |
| NAM-13 | Where a four-digit year token is present, it is the second segment | `/-(\d{4})-/` matches the leaf | Rename `nasa-2025-lunar-power-strategy.md` to `nasa-lunar-power-strategy-2025.md` — legible to a person, invisible to `scoreFile()` | green |
| NAM-14 | The no-year branch is a branch, not a failure | The 18 no-year names land unflagged; the count of landed leaves with no year match equals the no-year set; none carries a guessed or fetch-dated year | Fill `gdp.md` with a retrieval-date year; the set shrinks by one, and every prior citation to the old name breaks on the next re-fetch | green |
| NAM-15 | A5 namespace F shape | Every FA leaf yields ≥3 tokens under `filenameTokens()`, of which ≥2 are outside the `<kind>` vocabulary | Restore `fa6-deliverable.md`; measured at §5, it scores 0 against a paraphrase of its own title | green |
| NAM-16 | `<kind>` is a closed list of six | Every FA leaf's trailing segment is one of `verdict`, `table`, `ledger`, `sheet`, `source-list`, `note` | Land `fa3-x-summary.md`; a seventh kind is then extended in a filename rather than in `NAMING.md` §5, which is where §5 says to extend it | green |

---

## 3. PTH — the path-length ceiling, `NAMING.md` §8 and §11 A3/A4

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| PTH-1 | Repo-relative ceiling, 108 characters, backslash-separated | For every corpus file: `relpath(f).replace(/\//g,'\\').length <= 108` | Land a 64-character leaf under a 33-character folder: `10+1+33+1+64 = 109` | green |
| PTH-2 | The ceiling is asserted on the repo-relative path, not the absolute one | The assertion's input carries no drive letter and no user directory. Assert the check returns identical verdicts run from two different roots | Change it to `path.resolve(f).length <= 108`; the check then passes or fails according to whose machine ran it, which is what A3 exists to avoid | green |
| PTH-3 | Leaf ceiling, 64 characters | `leaf(f).length <= 64` for every corpus file | Land `ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md`, 70 characters — the name that broke the clone at loose end E14 | green |
| PTH-4 | Folder ceiling, 32 characters | Every taxonomy folder segment is ≤ 32 characters | Restore `organization-and-production-systems` (35) or `development-and-industrial-policy` (33) | green |
| PTH-5 | Depth is pinned at exactly one level | `literature/`: every corpus file at depth 2. `findings/`: depth 1 | Create `literature/isru-processing/thermal/x.md`; a second level costs up to 33 characters the budget does not have | green |
| PTH-6 | The budget arithmetic closes on the measured limit | `150 + 1 + 108 == 259`, and 259 is the bisected git-for-Windows limit rather than a quoted one | Change the root allowance to 151 without changing 108; the sum no longer equals the measured ceiling, and PTH-6 reports the arithmetic rather than the ceiling | green |
| PTH-7 | A4 runs before cloning and fails loudly | `abspath(repoRoot).length <= 150`, checked at bootstrap; on failure the bootstrap exits non-zero stating the measured length and the budget, and does not warn and continue | Change the failure branch to a warning; the checkout proceeds half-written, which is loose end E14 in full | green |
| PTH-8 | A4 is the only machine-dependent check | Every other length assertion here is machine-independent. Asserted by running the whole PTH group from a second working directory and comparing verdicts row by row | Move any A3 clause onto an absolute path; the two runs then disagree and PTH-8 names the row | green |
| PTH-9 | Every file `listCorpusFiles()` returns from `literature/` is at depth 2 | The corpus root holds no top-level `.md`. Asserted on the **walker's output**, not on a directory listing, because the walker is what retrieval sees | Move any summary to `literature/x.md`; A3's depth clause fires | **RED** — `literature/NAMING.md` sits at depth 1 and the walker returns it, so the naming contract is a retrievable literature source. Measured: `check_corpus_collisions.js` reports "1 summaries" and the one is NAMING.md. **RULED by the author, 2026-08-28: relocation.** Not a §10 by-name exception and not re-rooting retrieval. Owner: The Systems Engineer, W1, the file being in his write set. Close, and it is an observation not a date: `listCorpusFiles()` over `literature/` returns zero paths at depth 1, **and** the relocated contract is reachable at its new path from every document that cites it |
| PTH-12 | The relocation moved the contract, it did not copy it | After PTH-9 closes, exactly one `NAMING.md` exists in the repository, and `literature/` holds none. Asserted by `git ls-files '*NAMING.md'` returning exactly one line | Leave a copy behind "for compatibility"; there are then two naming contracts, the retrievable one is the stale one, and the defect PTH-9 exists to fix is still live with a second authority added. `CLAUDE.md` already states the rule for `lsei/index.html`: a second copy is a second authority and a second authority drifts | **RED** — depends on PTH-9. Owner: The Systems Engineer, W1. Close: the assertion runs and returns one line |
| PTH-13 | Every **live** citation of the old path was repointed | Zero occurrences of the string `literature/NAMING.md` in the LIVE set — landed contracts, tools and the gameplan. Measured before the move so the closing count is checkable, at read-digest `e06bc06118fa6218`: **82 occurrences across 28 files** in total, of which **9 across 6 files are live** — `COUNTING_RULE.md` 1, `lunar-oracle-gameplan.md` 1, `oracle/bootstrap_contract.md` 1, `oracle/MANIFEST.tsv` 1, `tools/merge_identity.js` 1, this file 4. **CORRECTED 2026-08-28: the live set omitted `oracle/AMENDMENTS.tsv`, which carries FOUR rows naming the dead path** — `AM-75`, `AM-76`, `AM-77` (target `section 8`/`section 9`) and `AM-153` (target `path references`). A promoted register whose amendment rows target a path that does not exist is the same defect as `MF-1`'s, one register over, and my live set could not see it because I enumerated by memory rather than by walking. The live set is now COMPUTED, not listed: every tracked file outside `cr_scratch/` and outside the working copies. Run by `run_suite.js`, which reports 5 live files today (`lunar-oracle-gameplan.md`, `oracle/MANIFEST.tsv`, `oracle/AMENDMENTS.tsv`, `oracle/NAMING.md`, `tools/merge_identity.js`). The other 73 are in `cr_scratch/` deliverables and are **the record of what was believed when it was written**; rewriting them would falsify the record and is forbidden | Move the file and leave the live citations; `oracle/MANIFEST.tsv` then carries a `promoted` row whose target-path does not exist, `MF-1` goes red on the next run, and `tools/merge_identity.js` reads a path that is not there. A relocation that breaks `MF-1` is a relocation nobody finished | **RED** — depends on PTH-9. Owner: The Systems Engineer, W1, for `MANIFEST.tsv`'s row, `COUNTING_RULE.md`'s §8 glob and his own files; mine for this file's four. Close: live count is zero |
| PTH-14 | The relocated contract is still tracked at its new path | `git check-ignore -q <new path>` exits non-zero, and `git ls-files` lists it. Today `literature/NAMING.md` ships **only** because `!/literature/**/*.md` re-admits it under a deny-by-default root; that re-admission does not follow the file out | Move it to a path under a deny rule — `literature/_pdf/`, `_intake/`, or any future deny-by-default root. The naming contract then silently stops shipping, and the first symptom is a fresh clone with no naming contract in it. This is the one failure mode a relocation has that a by-name exception did not, and it is why the assertion exists | **RED** — depends on PTH-9. Owner: The Systems Engineer, W1. Close: the check-ignore probe and the `ls-files` probe both pass at the new path |
| PTH-10 | A name exceeding the ceiling is not truncated | The merge exits non-zero naming the file **and its measured length**; nothing lands under a shortened name | Add auto-truncation; a rename then happens without a decision and every citation to the intended name breaks silently | green |
| PTH-11 | The worst-case landed path is reported with its margin | The longest repo-relative corpus path is measured and printed beside the ceiling. Landed-taxonomy arithmetic: `10+1+31+1+64 = 107`, one under | Introduce a 32-character folder and a 64-character leaf: 108, exactly at the ceiling. PTH-11 must report zero margin rather than pass silently, because a ceiling reached is a ceiling about to be broken | green |

---

## 4. FLD — the machine-readable field label, `NAMING.md` §9

**Stated explicitly, because it is the gap this group exists to close: Part 2 of The Engineer's merge
specification does not carry a field label.** Its machine-readable outputs are the `- **Also:**`
second-membership line and `literature/INDEX.tsv`, and neither is a field. A file that satisfies Part
2 in full can still fail every test in this group. An agent executing Part 2 faithfully ships no
field label, satisfies 2.3 in appearance, and leaves B3's pooled-IDF break exactly where it was. The
authority on the field label is `NAMING.md` §9 and nothing else.

**Reconciled with The Engineer's `INDEX-1`…`INDEX-5`, W1. This group is the surviving contract.**
Two seats wrote two assertion sets over the same two artifacts in Cycle A without reading each other,
and two contracts on one artifact is how `CHK-13` came to have two paths. The settlement is
technical, row by row, and it is not a clean win for either side:

| His | Disposition | Ground |
|---|---|---|
| `INDEX-1` | **Absorbed as `FLD-13`** | Genuinely new. It is the condition that makes his fourth column safe and this group did not have it |
| `INDEX-2` | **Already `FLD-11`** | `primary` equals path segment 2. Same assertion, same artifact |
| `INDEX-3` | **Already `FLD-3` + `FLD-11`** | `FLD-3` is closed-and-exhaustive in both directions over `FIELDS.tsv`; `FLD-11` covers the `also` half. His row states both as one; splitting them is why `FLD-3` can go red naming the folder |
| `INDEX-4` | **Absorbed as `FLD-14`** | Genuinely new, and I did not have it. `FLD-8` guarantees one *field* per file and is blind to `also == primary`, which is a membership defect one level up |
| `INDEX-5` | **Dissolved into `CRP-5` and `FLD-10`** | Two assertions in one row. The collision half is `CRP-5`, already written at two scopes on the normalized key; the row-count half is `FLD-10`'s regenerate-and-diff, which subsumes it — a diff that matches proves the count without asserting it separately. His own row says it is 2.4's, and 2.4 is now this file's `SLOT-A` |

**Two of his five survive and two of mine changed.** `FLD-11` was WRONG — I specified three columns
against a landed four-column generator specification — and `FLD-7`'s criterion would have gone red on
his generated `field` column for the wrong reason. Both are corrected above with the reason in the
row. **The reason FLD survives as the contract is not that it is bigger.** It is that his five are
assertions inside a specification document, where a reader who does not open that document never
meets them, and this file is the artifact the merge gate reads. Where he was right, I took the row.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| FLD-1 | `literature/FIELDS.tsv` exists and is committed | The file is present and tracked; `git check-ignore` reports it not ignored — the `.gitignore` re-admits it by literal name | Remove the `!/literature/FIELDS.tsv` literal; the deny-by-default rule swallows it and retrieval silently loses field scoping | **RED** — measured: `literature/FIELDS.tsv` does not exist. Owner: The Engineer at 2.3. Close: the map lands with the taxonomy |
| FLD-2 | Two columns, `folder` and `field` | Every row has exactly two tab-separated fields; no field contains a tab or newline | Add a third column; the reader takes column 2 as the field and reads a truncated value with no error | green |
| FLD-3 | One row per taxonomy folder, closed and exhaustive | The set of `folder` values equals the set of directories directly under `literature/` — in **both** directions | Add a folder to the taxonomy without adding a row; a file in it then derives no field, and a pooled table is what it silently falls back to | green |
| FLD-4 | Every file derives a field | For every file `listCorpusFiles()` returns, the first path segment is a key of the map. Count of files deriving no field is zero | Delete one map row; the count becomes non-zero and FLD-4 names the files | green |
| FLD-5 | The field is derived from the path, never from file content | The derivation reads `relpath.split('/')[0]` and opens no file. Asserted by grepping the deriver for `readFile`: zero hits within the derivation | Add a front-matter override; the label can then be edited into disagreement with the folder and nothing notices, which is the §9 "not in the file" ruling | green |
| FLD-6 | The field is not in the filename | Zero landed leaves begin with a field word from `FIELDS.tsv`'s `field` column | Rename `sargeant-2020-…` to `lunar-sargeant-2020-…`; §9's measurement shows the lead token becomes `lunar` and scores 4 where it scored 0, converting the strongest filename signal into a constant | green |
| FLD-7 | The field partition is data, not a rule | **Two clauses, and the second is the one that matters.** (a) Zero literal field names in EXECUTABLE CODE — the retrieval layer and every checker, `tools/**/*.js` and `oracle/**/*.js`. (b) **Mutate `FIELDS.tsv`'s `field` column to two novel strings and assert every consumer's output changes accordingly, with no code edit.** (b) is the actual §9 requirement; (a) is a cheap proxy for it | Hard-code the two field names in the deriver; the taxonomy then cannot change without a code edit, which §9 says explicitly it must be able to do. (b) catches this even if the literal is spelled or assembled in a way (a)'s grep misses | green — **criterion strengthened at the SLOT-A/C fill, not narrowed; see §11.3.** The old criterion said "grep for any literal field name outside `FIELDS.tsv`: zero hits", which would have gone red on `INDEX.tsv`'s generated `field` column and on this very row. A generated artifact with one writer is a cache, not an authority; a grep that cannot tell a cache from a rule is the wrong instrument, and the mutation is the right one |
| FLD-8 | A file cannot carry two fields | The derivation is total and single-valued: exactly one field per path. The `- **Also:**` second-membership line does **not** produce a second field | Make the deriver read `Also:` and emit a second field; the IDF table then double-counts a document and the weights are wrong for both fields | green |
| FLD-9 | The field label and the `Also:` cross-reference are different fields doing different jobs | Assert they are read by different consumers: the field by the IDF scoper, `Also:` by `INDEX.tsv` only. No consumer reads both for one purpose | Point the IDF scoper at `Also:`; FLD-9 goes red and FLD-8 goes red with it | green |
| FLD-10 | `INDEX.tsv` is regenerated, never hand-edited | Regenerate in memory from the `## Provenance` blocks and diff against the committed file; any difference is a failure | Hand-edit one `also` cell in `INDEX.tsv`; the diff fires. This is `COUNTING_RULE.md` M6's shape applied to the corpus index | **RED** — measured: `literature/INDEX.tsv` does not exist. Owner: The Engineer at 2.5. Close: emitted by the merge |
| FLD-11 | `INDEX.tsv` columns are `path`, `primary`, `also`, `field` — **four, not three** | Header row exact and in that order; `primary` equals path segment 2; `also` is empty or a folder name in `FIELDS.tsv`; `field` equals `FIELDS[primary].field` | Write an `also` value naming a folder that does not exist; FLD-11 fires where a walk of every file would not have. Drop the fourth column; every consumer doing arithmetic over the corpus falls back to a join it has to write itself | green — **corrected at the SLOT-A/C fill from three columns to four; see §11.3.** The three-column form was mine and it was wrong against the landed generator specification. This is a strengthening — one more column must hold — and `FLD-13` is the assertion that makes the fourth column safe |
| FLD-13 | The `field` column of `INDEX.tsv` agrees with `FIELDS.tsv`, row by row | For every row, `field == FIELDS[primary].field`. A disagreement is a generator bug and never a datum, because `INDEX.tsv` has exactly one writer and `FIELDS.tsv` is the authority | Hand-edit one `field` cell. Nothing else in the suite notices: `FLD-10`'s regenerate-and-diff would catch it only if the generator is re-run, and this is the assertion that holds while it is not. **Absorbed from The Engineer's `INDEX-1`; it is the condition that makes his fourth column safe and it was not in this group** | **RED** — `literature/INDEX.tsv` and `literature/FIELDS.tsv` do not exist. Owner: The Engineer at 2.5. Close: both files land and the assertion runs |
| FLD-14 | `also` is never equal to `primary` | For every row of `INDEX.tsv`, `also == '' or also != primary` | Emit `also` equal to `primary` for a file with no genuine second membership. The file is then double-counted by any consumer that unions the two columns, and `FLD-8`'s single-field guarantee is untouched because the *field* is still single — the defect is one level up, in membership. **Absorbed from The Engineer's `INDEX-4`; there was no `FLD` equivalent and I did not have it** | **RED** — depends on `INDEX.tsv`. Owner: The Engineer at 2.5. Close: the file lands and the assertion runs |
| FLD-12 | Field scoping is actually consumed | The Step 3 retrieval layer builds one document-frequency table **per field**, not one over the corpus root. Asserted on the table count returned by the builder | Restore the single pooled table; measured at the baseline, `corpusDocFrequency(literatureDir)` today builds exactly one table with no field scoping, so this test is the one that detects the merge having changed nothing | **RED** — the rebuild is 3.7's. Owner: The Engineer at 3.7. Close: field-scoped IDF landed. Carried red here deliberately: the field label's whole warrant is a consumer that does not exist yet, and a green FLD-12 today would be a green light for a mechanism nobody built |

---

## 5. PRV — `## Provenance` completeness, Part 5 of the merge specification

The eight-key minimum. Every merged summary carries all eight; a key present with an empty value is
a failure, not a variant — the same posture `register_schema.md` §3 takes on its own fields.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| PRV-1 | Every merged summary has a `## Provenance` block | Count of files under `literature/` with no `^## Provenance$` heading is zero | Delete the block from one file; the count becomes 1 and PRV-1 names it | green |
| PRV-2 | All eight keys present on every file | The key set of each block ⊇ `{Origin corpus, Origin path, Merge disposition, Reconciled against, Source identifier, Source file, Licence}` plus `Also` where a second membership exists. Set comparison on strings, not a substring search | Remove `- **Licence:**` from one file; PRV-2 fires. A substring search for "Licence" would still pass on the word appearing in prose, which is why the comparison is on the parsed key set | green |
| PRV-3 | No key carries an empty value | For every key on every block, the value after `:**` is non-empty after trimming | Set `- **Reconciled against:**` to nothing; the file then reads as complete and asserts nothing | green |
| PRV-4 | `Origin corpus` is a closed set of three | Value ∈ `{scenario-explorer, japanese-miracle, both}` | Write `lsei`; a fourth value is a vocabulary extended in a file rather than in Part 5 | green |
| PRV-5 | `Merge disposition` is a closed set of five | Value ∈ `{identical, dereferenced, primary, secondary, net-new}` | Write `merged`; the closed set is what makes 2.2's adjudication auditable, and a sixth value routes an author into the wrong member silently — the counting-rule defect, one level over | green |
| PRV-6 | `Origin path` resolves in its named source tree | For each file, the path resolves under `lsei/` or `_intake/` as its `Origin corpus` implies | Point one `Origin path` at a file that does not exist; PRV-6 fires where a form check would not | green |
| PRV-7 | `Origin corpus: both` implies two origin paths, and only then | A file declaring `both` carries two `Origin path` lines; a file declaring one corpus carries one | Set one 86-name overlap file to `scenario-explorer` while keeping both paths; the disposition and the evidence then disagree | green |
| PRV-8 | `Source file` resolves on disk **or** reads exactly `not held` | For each `- **Source file:**` value: it is the literal `not held`, or it resolves under `literature/_pdf/` | Point one at a PDF that was not pulled; PRV-8 fires. This is the inherited defect Part 5 names — the 15 pre-existing blocks point at PDF paths that do not resolve | green |
| PRV-9 | `not held` is exact | The literal string `not held`, lowercase, no punctuation, no parenthetical | Write `not held (see PDF store)`; a tolerant reader would accept it and the next author writes something else again. A closed value is closed or it is prose | green |
| PRV-10 | A summary is never deleted for want of a PDF | The count of files carrying `not held` is ≥ the baseline's 22 and no file was dropped: assert the landed file count against the union | Drop an unmatched summary; the union count falls and PRV-10 names the missing leaf | green |
| PRV-11 | Multiple `Source file` lines are permitted and both resolve | The `cannon-2020` case: two `- **Source file:**` lines, both resolving. Assert the parser returns a list, not a last-wins string | Make the parser last-wins; one of the two PDFs then silently detaches from the only summary that references it | green |
| PRV-12 | `Source identifier` carries a typed prefix | Value matches `^(doi:|url:|authoryear:)` | Write a bare DOI with no prefix; the dedup precedence of `NAMING.md` §7 cannot then tell level 1 from level 3, and a weak key is read as a strong one | green |
| PRV-13 | A DOI recorded here is the DOI the source prints **[gate]** — **REPAIRED 2026-08-28 after the A.10 gate returned a negative on this row** | **THREE outcomes, not two.** Per sampled file: **(a) MATCH** — the source prints a DOI and the recorded value equals it, `10.` onward, lowercased, resolver prefix stripped. **(b) MISMATCH** → fail. **(c) `SOURCE PRINTS NO DOI`** — a legitimate third outcome, not a failure. Under (c) the recorded identifier is checked against a **named non-source authority** — `https://api.crossref.org/works/<doi>` returning 200 with a title matching the summary's, else DataCite, else the publisher's landing page — and **the finding records which authority was used**. An (c) with no authority named is an absence dressed as a verification. **The identifier is not always under a field named `DOI:`**: where `Publisher URL:` holds a `doi.org` or `dx.doi.org` resolver URL, the DOI inside that URL **is** the recorded identifier and is verified as one | **Mutation 1:** alter one digit → (b). The identifier still parses, still looks right, points at a different paper. **Mutation 2:** key the check on `DOI:` alone → the **8** resolver-only rows score as identifier-less while the identifier sits one line away, and `merge_identity.js` has already keyed all 8 at `L1` from that very line. **Mutation 3:** record (c) with no authority named → red | **RED — the gate returned a NEGATIVE and the ROW was wrong, not the claim.** The Fact-Checker's census of 30 openable sources found **zero altered DOIs and nothing fabricated** — the claim is TRUE and stronger than the row stated — but **16 of 30 print no DOI**, so a two-outcome row goes red on sixteen correct values. Owner: mine for the row; **The Fact-Checker for the re-run**. Close: the gate re-run reports (a)/(b)/(c) counts with 0 in (b) and an authority named on every (c) |
| PRV-14 | `Licence` is a closed set of two | Value ∈ `{own-summary, contains-transcribed-source-text}` | Write `unknown`; the Open Question 8 audit then has a third state nobody ruled on | green |
| PRV-15 | `Licence: contains-transcribed-source-text` agrees with the measured overlap **[gate]** — **REPAIRED 2026-08-28; it could not pass honestly as written** | **A PRE-CONDITION, because the repair is that this row may not pass vacuously.** Both label classes must be non-empty — at least one `contains-transcribed-source-text` and at least one `own-summary` — and a run over two empty classes reports **UNRUN**, never green. **A SECOND PRE-CONDITION on the instrument:** `abstractOf()` must return non-null for every file carrying an `Abstract` heading; an instrument that silently skips its own target population reports zero findings and reads as a clean result. Then, and only then: every file labelled `contains-transcribed-source-text` measures at or above the Open Question 8 threshold, and no file at or above it is labelled `own-summary` | **Mutation 1:** relabel one high-overlap file `own-summary`; label and measurement disagree and the label is what ships. **Mutation 2:** restore the bare-heading regex to `audit_abstract_overlap.js`. Measured on `_intake/japanese-miracle/lit`, 112 paired summaries: **0 findings before the repair, 8 after** — 100.0%, 95.6%, 74.0%, 54.1%, 40.9%, 39.4%, 11.4%, 11.2% — and **all 8 carry the word "transcribed" in the heading that made them invisible**. A file whose abstract is 100.0% verbatim was skipped by the instrument that decides whether it is verbatim. **Mutation 3:** run with both classes empty and let it print green | **RED — vacuously green, which is worse than red.** Both label classes are empty, so the row asserted nothing and could not be gated as §13 asks; and the instrument it names returned **0** findings on a population of 18 annotated files tree-wide because of a heading regex. Owner: mine for the row and for `tools/audit_abstract_overlap.js` (repaired this wave, 194 → 267 abstracts extracted on the 271-file union); **The Fact-Checker for the re-run**. Close: both classes non-empty, `abstractOf()` non-null on 267 of 267, and the gate re-run reports 0 disagreements |
| PRV-16 | `Also` names an existing taxonomy folder and is absent otherwise | Where present, the value is a folder in `FIELDS.tsv`; where absent, the file has one membership | Write a folder name that was shortened at §8 — `organization-and-production-systems` — and the cross-reference dangles while the file still reads complete | green |
| PRV-17 | The block is in the file, not in a sidecar | No manifest is the authority on any of the eight keys. `INDEX.tsv` is derived and is asserted equal to a regeneration from the blocks (FLD-10), so a disagreement is a failure of the index, never of the file | Make the merge write a key to `INDEX.tsv` and not to the block; the two then drift on the first hand edit, which is the failure Part 5 states as its reason | green |

---

## 6. DUP — dedup key precedence, `NAMING.md` §7

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| DUP-1 | The filename is never the dedup key | The dedup implementation reads `## Citation` (or `## Provenance` / `## Metadata`) and never `leaf(f)`. Asserted by grepping the deduper's key function for `basename`: zero hits | Key on the filename; two summaries of one paper are then two keys and the corpus has no mechanism that notices | green |
| DUP-2 | Precedence order is DOI, then publisher URL, then `(identity, year, title)` | The key function returns level 1 where a DOI exists, level 2 only where none does, level 3 only where neither does | Reorder to try URL first; a file with both then keys on the weaker of two available keys | green |
| DUP-3 | Precedence is per-pair, not per-file | Two files are compared at the highest level where **both** carry a key. A file with a DOI and a file without compare at level 3 | Make precedence per-file: the DOI-bearing file keys at level 1, the other at level 3, and the pair never compares at all — a true duplicate passes as two sources | green |
| DUP-4 | A level-3 match is a candidate, never a confirmation | Every level-3 match is emitted to a report for a person; the merge takes no action on it. Assert zero level-3-driven writes | Make the merge dedup on level 3; the baseline's 17 groups and 20 surplus files include barnett-2025, ehricke-1981 and nasa-2025, which are **not** duplicates, and three distinct sources are lost | green |
| DUP-5 | A resolver URL is not a level-2 key | A `url:` value whose host is a DOI resolver is rejected and routed to level 1 | Record `https://doi.org/10.xxxx/yyyy` as the article URL; a DOI that was there all along is then hidden behind a level-2 key | green |
| DUP-6 | A PDF-hosting mirror or search-result link is not a level-2 key | The URL is a publisher article URL; mirrors and search results are refused | Record a repository mirror; two summaries of one paper hosted on two mirrors then key differently and never compare | green |
| DUP-7 | Level-2 normalization is applied | Scheme and `www.` stripped, query string and fragment removed | Keep the query string; one URL with a tracking parameter and one without key differently for the same article | green |
| DUP-8 | The four inherited DOI spellings are all read | `DOI:`, `- DOI:`, `- **DOI:`, `**DOI:` all parse | Support only the canonical form; roughly half the corpus that carries a DOI at all falls to level 3, and the level-3 candidate list floods | green |
| DUP-9 | Every landed file writes exactly one canonical DOI form | Landed files carry `- **DOI:** 10.xxxx/yyyy` and nothing else. The tolerant reader is for **inputs**; the strict writer is for **outputs** | Write an inherited spelling on landing; the tolerance then has to be carried forever by every future consumer | green |
| DUP-10 | No citation block is a landing failure, not a dedup failure | A file with no `## Citation`, `## Provenance` or `## Metadata` does not land; the merge exits non-zero naming it | Let it land with an empty key; it then compares equal to every other keyless file and a whole class collapses into one | green |
| DUP-11 | A deferred merge takes the canonical name and records the union in `## Provenance` | The surviving member keeps its name; no `-merged` suffix exists anywhere; the superseded member is under `_intake/superseded-duplicates/`. Verified on Poston 2020 (level 1) and Metzger 2021 (level 3) | Land a `-merged` suffix; the filename becomes a changelog, every citation to the old name breaks, and NAM-8's token distinctness has a new way to fail | green |

---

## 7. CRP — corpus-level invariants

**The collision assertion is normalized-key, not case-insensitive.** §0.1 finding 1 is the whole
reason, and it is measured rather than argued: nine members, eight of which a case rule misses.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| CRP-1 | CHK-01: no two summaries under a corpus root tokenize to the same key set | Over the merged tree, zero pairs share a sorted `filenameTokens()` output | Land the eight separator-differing pairs of the nine unresolved; each pair tokenizes identically and CRP-1 names all eight | green |
| CRP-2 | CHK-01 is asserted over the **merged** tree, not the source trees | The check's root is `literature/`, and it runs after the merge as well as before | Run it only pre-merge; the baseline shows both source trees are clean, so a pre-merge-only check passes on exactly the day it is needed | green |
| CRP-3 | The token-set comparison is on the sorted set, not the string | Assert two names differing only in token order collide | Compare joined strings; `a-b.md` and `b-a.md` then pass as distinct while the retrieval layer treats them as one | green |
| CRP-4 | **Normalized-key collision within a target directory** | For each folder under `literature/`, no two files share a `normalize()` key | Place `GDP.md` and `gdp.md` in one folder. On a case-insensitive filesystem one silently overwrites the other and the merge reports success — the defect is invisible in exactly the case that exists, so this test must be run on the **key set**, never on a directory listing | green |
| CRP-5 | **Normalized-key collision across the whole target tree** | Across all folders, no two files share a `normalize()` key. Reported with both paths and the shared key | Place `BEA_depreciation_rates.md` in one folder and `bea-depreciation-rates.md` in another. They coexist on every filesystem, no case rule fires, and the corpus carries two summaries of one source under one key with nothing reporting it | green |
| CRP-6 | The merge preserves zero intra-corpus collisions | Post-merge, the count of distinct `normalize()` keys equals the count of landed files. Known answer: the baseline measured 152→152 and 119→119, so every collision in the union is cross-corpus and the merge is the only place one can be created | Land any two of the nine without resolving them; the two counts diverge by exactly the number of unresolved pairs, which is also the report | green |
| CRP-7 | A case-insensitive check is **not** sufficient, asserted as a test | Run a case-folded collision check over the merged tree and a normalized-key check over the same tree; assert the normalized check catches a strict superset. On the union the two differ by 8 | Replace the normalized check with the case-folded one; CRP-7 goes red and names the eight pairs the weaker rule misses. This test exists so the substitution cannot be made quietly | green |
| CRP-8 | The landed file count reconciles with the union under a stated rule | The count is reported with its counting rule and agrees with one of the baseline's two figures — 176 normalized or 185 raw — and says which | Report a bare count; 185 and 176 are both true statements about one population under two rules, and a contractual count with no rule is the 2.10 unit trap again | green |
| CRP-9 | The corpus size does not depend on the filesystem | Assert the landed count is identical on a case-sensitive and a case-insensitive run of the merge over the same source trees | Leave the `gdp` pair unresolved; the union is 185 on Linux and 184 on Windows, and no contractual count survives that | green |
| CRP-10 | **The EIGHT same-name disagreements are adjudicated, not merged. CORRECTED 2026-08-28: this row said five and there are eight** | `azami-2024`, `barro-2004`, `csank-2022`, `falcon-heavy-wikipedia`, `poston-2020`, **and `473486main-iss-atcs-overview`, `bea-depreciation-rates`, `ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update`**: two summaries are never merged into one and neither is deleted; a `DUP-xx` register row is emitted instead. **The three additions are visible only under `normalize()`**, which is what `CRP-7` exists to defend — and `CRP-5`'s own worked example, `BEA_depreciation_rates.md` against `bea-depreciation-rates.md`, IS one of the three. Re-measured over the two source trees 2026-08-28: **95 same-normalized-key pairs, 87 byte-identical, 8 differing**, matching the plan's 87 `both-identical` + 8 `lsei-primary` exactly | Merge one pair into a single file; content from one summary disappears with no report. **And the mutation this correction adds:** run the same-name census under a case-fold rule instead of `normalize()`; it returns five, the number this row carried for two steps, and the three it drops are three real disagreements | green — corrected upward, and the population is the 8 `lsei-primary` rows of the plan, **not** the 16 `dup-member` rows of the 8 `DUP-xx` groups. Two different populations have been called "the contested pairs" and they do not intersect |
| CRP-11 | Byte-difference is distinguished from line-ending difference | For each of the **eight**, the adjudication states whether the difference survives CRLF normalization. Deltas re-measured 2026-08-28, intake minus lsei: `azami` −22,334, `csank-2022` −15,553, `poston-2020` +1,490, `473486main-iss-atcs-overview` **+86**, `bea-depreciation-rates` **+77**, `ieee-2022-paper-sh-tcs` **+42**, `falcon-heavy` +28, `barro-2004` −6. **NONE of the eight is a line-ending difference** — all eight survive CRLF normalization and all are single-line or multi-line content edits | Skip the normalization step; a whole-file CRLF diff is then read as a content disagreement, which this repository has already produced once. **Added:** assume the small deltas are line-ending noise and drop them; +86, +77 and +42 are content edits and dropping them loses three adjudications | green — corrected: five → eight, and the CRLF question is now answered for all eight rather than asserted of five |
| CRP-12 | No file is dropped by the merge | Every source file appears in the merged tree or in the deliberate-exclusion report with a reason. Sum of landed + excluded == union | Drop one silently; the sum breaks by one and CRP-12 names it. A merge that loses a byte-identical duplicate loses nothing and reports success — this is the test that notices anyway | green |
| CRP-13 | The merge is a copy, not a move | Both source trees are byte-unchanged after the merge, asserted by tree hash | Change `cp` to `mv`; the merge becomes irreversible before the author has approved it, and the baseline's own known answers stop being re-measurable | green |

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
| MRG-4b | **The landed BODY is the `byte_source` body, with exactly one declared exception.** **A CONTRACT COLLISION IS RECORDED HERE RATHER THAN RESOLVED BY CONVENIENCE.** The ruling says byte-identity of the whole file. That is UNSATISFIABLE for all 176 rows, not for one: `PRV-1`, `PRV-2` and `PRV-17` require every landed file to carry a `## Provenance` block, the source copies carry none, and the merge appends one. Ruled byte-identity and ruled provenance-completeness cannot both hold. The strict form that survives both is body-identity, and it loses nothing the ruling wanted | Strip the trailing `## Provenance` block (the last horizontal rule followed by the `## Provenance` heading) from `target_path`; the remainder is **byte-identical** to the file at `source_path` named by `byte_source`. **Line-ending and trailing-whitespace normalization is counted and REPORTED SEPARATELY, never folded into the content comparison** — `CRP-11`'s rule, one group over. **One exception, named:** `azami-2024-lunar-manufacturing-review`, whose `basis` carries `CITATION REPAIR OWED`, differs by exactly one added line and zero removed, and that line is the canonical `- **DOI:** 10.48550/arxiv.2408.05823`. A second exception is a failure whether or not it is defensible | **Mutation 1:** land any other row with a one-byte body edit → red, naming the row and the line. **Mutation 2:** land `azami` unrepaired → red, because a declared exception that did not occur is a rule nobody applied. **Mutation 3:** fold the CRLF normalization into the content comparison → 162 line-ending normalizations are reported as content edits and the two real ones are lost in them | **RED — AND IT CAUGHT TWO UNDECLARED EDITS ON ITS FIRST REAL RUN.** `node oracle/tests/run_suite.js --tree cr_scratch/_stage/literature`, 2026-08-28, against the staged 168: **166 bodies identical** (162 of them after line-ending normalization only), **1 declared exception** (`azami`, correct), and **2 UNDECLARED** — `falcon-heavy-wikipedia` (+11/−1: a `## Citation` block added **and the maiden-flight date changed from 2026-02-06 to 2018-02-06**) and `rostami2018-figures` (+11/−0: a `## Citation` block added). Both are Space Resources Engineer citation-repair edits and both are probably right; **neither is declared**, and the date change is a factual edit to a corpus body that no assertion authorised. Owner: The Engineer for 2.5 and The Manager for the ruling. Close: the two are either declared as exceptions with a `basis`, or reverted, and the runner reports 0 undeclared |
| MRG-5 | **No disposition was decided by file size** | For the five differing same-name pairs, the recorded `basis` is a content reason and never a size comparison. Known answer, and it is the trap: `step0_dedup_decisions.md` records `poston-2020` as the pair that REFUSED size-based selection — the kept summary is the **smaller** file, and the entry enumerates what the 19,230-byte loser carried that the winner lacks. The byte-identical copy now queued for import IS that loser | Break the tie on `poston-2020`, `azami-2024` or `csank-2022` by size. It silently reverses a documented Step-0 decision in the direction the record explicitly rejected, and it reverses it in a direction that looks like diligence | **RED** — no table. Owner: The Engineer, W1. Close: table lands with `basis` populated for all five |
| MRG-6 | The landed path is derivable from the row alone | `target_path == 'literature/' + target_folder + '/' + normalize(leaf) + '.md'`, computed from the row and compared to the row's own `target_path`. Both are in the table, so the assertion is a self-consistency check that needs no filesystem | Write a `target_path` that disagrees with `target_folder`. The merge lands the file where `target_path` says and every count keyed on `target_folder` is wrong by one, in both folders, silently | **RED** — no table. Owner: The Engineer, W1. Close: table lands |
| MRG-7 | **The merge glob is `*.md`, never `*`** | The executing command's source pattern is asserted, literally, as `*.md`. Owed to this slot by The Manager's W1 brief and recorded here so it has somewhere to be checked | Use `*`. `_intake/` carries 112 PDFs and three UN treaty `.txt` files; a bare `*` lands all of them under `literature/`, where deny-by-default hides the PDFs from `git status` and the `.txt` files ship. The merge reports success and `PDF-1` still passes, because nothing was *tracked* — the corpus is simply wrong | **RED** — no merge command exists to assert against. Owner: The Engineer, 2.5. Close: the command lands and carries the glob |
| MRG-8 | An unresolved collision REFUSES, and lands nothing | On any unresolved collision the merge exits non-zero, names both paths and the shared key, and the target tree is byte-identical to its pre-run state. **All-or-nothing, asserted by tree hash before and after**, not by counting what landed | Make it warn and continue, or make it land the rows it can. A partial merge is the worst state available: the tree is neither the old one nor the new one, `CRP-12`'s landed+excluded sum closes against the wrong union, and there is no recorded moment to re-run from | **RED** — no merge command. Owner: The Engineer, 2.5. Close: the refusal branch lands and is observed |
| MRG-9 | Dedup-key collision **within a target directory** | For each `target_folder`, no two rows share a `dedup_key` under `NAMING.md` §7. On the table, before anything moves | Place two rows with one `dedup_key` in `logistics-and-delivery`. Two summaries of one source land in one folder under one key and the second is discoverable only by reading both | **RED** — no table. Owner: The Engineer, W1. Close: table lands |
| MRG-10 | Dedup-key collision **across the whole target tree** | Across all `target_folder` values, no two rows share a `dedup_key`. Reported with both target paths and the shared key | **This is the row that stops `MRG-9` passing vacuously.** Put the two colliding rows in DIFFERENT folders: `MRG-9` passes — correctly, per-directory — while the corpus carries one source twice under one key. A7 is general and it is at two scopes for exactly this reason, and a fixture built from the one known pair would never have shown it | **RED** — no table. Owner: The Engineer, W1. Close: table lands |
| MRG-11 | `rev` is append-only and a bumped row carries its reason | A row whose `disposition`, `primary_secondary` or `target_folder` changed after first write has `rev > 1` **and** a non-empty `basis` naming why. Asserted by diffing the table against its own committed history, not against a snapshot somebody kept | Bump `rev` without writing `basis`, or change a value without bumping `rev`. The second is the dangerous one: The Manager's seam call and my `asserted_against` list both key on `rev`, so a silent revision defeats the detection rather than tripping it | **RED** — no table. Owner: The Engineer, W1. Close: table lands with `rev` populated |
| MRG-12 | The table is the **only** adjudication input the merge reads | The executing command reads `cr_scratch/merge_plan.tsv` and no other decision source. Asserted by grepping the merge for any other adjudication path: zero hits | Let the merge re-derive a disposition it could not find in the table. Every row this suite asserts is then advisory, the committed table stops being the record of what executed, and `SLOT-A` gates nothing. **This is the assertion that makes the other eleven load-bearing** | **RED** — no merge command. Owner: The Engineer, 2.5. Close: the command lands and reads one source |

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
| PDF-6 | The extension gate is tested where it is open | The gate is asserted on `docs/x.pdf.bak`, `tools/x.pdf.txt` and a root-level `x.pdf.bak` — **outside** `literature/`. Inside it, deny-by-default already covers the case | Test only `literature/x.pdf.bak`, which is IGNORED today; the test then passes on a rule that is not the one under test, and Part 5's own table is what would mislead you into writing it that way | green |
| PDF-7 | `check_no_sources.js` exits non-zero on an extension match | Plant `x.pdf` in the staged set; the check exits 1 naming the file | Change the exit to 0 with a printed warning; `on_failure: none` is a defect value, not a design value — CL-5 | green |
| PDF-8 | It scans the staged set and the tree, and says which | Two modes, two reported scopes. A tree scan that reports as a staged scan is a wrong claim about what was checked | Report the staged scope while scanning the tree; the check passes on a clean stage while the tree carries a PDF | green |
| PDF-9 | The size gate fires, and its threshold is measured against the real corpus | A file over the threshold outside `literature/_pdf/` exits 1. The threshold's justification names the **measured** largest summary | Plant an 84,768-byte `.md`. Measured: the largest summary in the prospective union is 84,767 bytes, not the 28 KB Part 5 assumes, so any threshold justified by the 28 KB figure is justified by a number that is wrong by 3× | green |
| PDF-10 | The size gate is documented as a backstop, not as containment | The check's own output states its coverage. Known answer: at 500 KB it admits **29 of the 112** `_intake/` PDFs | Report the size gate as passing without its coverage; a gate that lets 26% of its target through while reporting success is the CHK-03 shape wearing a different costume | green |
| PDF-11 | The threshold is stated in bytes with its unit named | The constant is an integer number of bytes and the comment names SI or binary. The 2.10 threshold likewise: the pull is **224,042,382 bytes**, which is 224.0 MB SI and 213.7 MiB, a 10 MB gap between two readings of one number | Write `500 KB` as a bare string; the check then means two things and the assertion passes under whichever the reader assumed | green |
| PDF-12 | The magic-byte gate fires on a renamed file | A file whose first four bytes are `%PDF` exits 1 whatever its extension. Fixture: a real PDF renamed to `x.md` | Read the extension first and skip the byte check when it is `.md`; the renamed file then passes all three gates | green |
| PDF-13 | The magic-byte gate reads bytes, not text | The check reads the first four bytes as binary; assert it fires on a PDF whose first bytes are `%PDF` and does not throw on a UTF-8 summary or on an empty file | Read with a UTF-8 decode; a binary file can throw and the check exits non-zero for the wrong reason, which `on_failure: block` cannot distinguish from a finding | green |
| PDF-14 | The five 2.13 fixtures all fire — **CORRECTED 2026-08-28: this row cannot be run as written on this filesystem** | `x.pdf`, `x.PDF`, `x.pdf.bak`, a `%PDF` file named `.md`, a 600 KB `.md` — each exits 1 and the report names which gate caught it. **EACH FIXTURE IN ITS OWN REPOSITORY**, not five files in one tree and not five files in one directory. Measured here 2026-08-28: `echo a > x.pdf; echo b > x.PDF` leaves **one** file, whose contents are `b`, and `git config core.ignorecase` is `true`. On any case-insensitive filesystem `x.pdf` and `x.PDF` are the same file, so a five-fixture tree holds four fixtures, the harness reports five, and the missing one is the case fixture — the exact case the character-class rule at `.gitignore:43` exists to cover | Remove the gate-name from the report; a fixture passes for the wrong reason. **And the mutation this correction adds:** plant all five in one tree. The count reported is five, the count present is four, and the run is green — a test reporting on a fixture that does not exist. `CON-2` already required isolation and this row did not; they now agree | **RED** — as written it silently tests four fixtures and reports five on this platform. Owner: mine for the row (corrected here); The Systems Engineer for the harness under `CON-2`. Close: the harness creates one repository per fixture and prints the fixture count it actually created |
| PDF-15 | It accepts the real corpus unchanged | Run against the merged tree: exit 0, zero findings | Lower the size threshold below 84,767; the largest legitimate summary is then a finding, and a check that flags real corpus files is a check that gets switched off | green |
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
| CON-2 | Each of the five fixtures fires **in isolation** | The harness runs `x.pdf`, `x.PDF`, `x.pdf.bak`, a `%PDF` file named `.md`, and a 600 KB `.md` **one at a time, from a clean fixture tree each time**, and each exits 1 naming which gate caught it | Run all five in one tree. `PDF-14` passes on the set; it cannot tell that the extension gate caught four of them and the magic-byte gate was never exercised, because the first non-zero exit wins. A fixture that fires for another fixture's reason proves nothing about its own gate | **RED** — `tools/check_no_sources.js` does not exist. Owner: The Systems Engineer, 2.14. Close: the check lands and the five runs are observed individually |
| CON-3 | The containment fixtures never touch the real tree | Tree hash of `literature/`, `_intake/` and `lsei/` before and after the whole fixture run: identical. Fixtures live under `cr_scratch/fixtures/` and nowhere else | Plant `x.pdf` in `oracle/` to test the open path, and forget to remove it. The probe for an ignore hole becomes an actual PDF in the repository, in the one directory where nothing would hide it. This is `MUT-5` applied to containment, and containment fixtures are the ones that plant real carriers | **RED** — no fixtures yet. Owner: The Systems Engineer, 2.14. Close: the fixture tree lands under `cr_scratch/fixtures/` and the hashes match |
| CON-4 | The hook is **wired**, not merely committed | `core.hooksPath` resolves to the committed hook directory, and the file at `<hooksPath>/pre-commit` is the committed `tools/githooks/pre-commit` — compared by content, not by existence | Commit the hook and never set `core.hooksPath`. Hooks are not cloned, so every fresh clone has a committed hook that never runs, and every check wired to `pre-commit` silently never fires. `CHK-10` is the trigger for the whole containment chain; unwired, it is `CHK-03` with a script behind it | **RED** — 2.14 is not built. Owner: The Systems Engineer, 2.14. Close: `CHK-29`'s HK-1/HK-2 observed passing from a fresh clone |
| CON-5 | `git hook run pre-commit` reaches `CHK-10`, observed | The invocation is run once and `CHK-10`'s dispatch line appears in its output, naming the rows it dispatched in row order | Assert the wiring by reading `check_register.md` instead of running the hook. The register would then be asserting itself — it is the document that claims what runs — and `CHK-09` exists precisely because a closed list is only closed while something checks it | **RED** — depends on `CON-4`. Owner: The Systems Engineer, 2.14. Close: the invocation is run and the dispatch observed |
| CON-6 | **The reentrancy fixture.** `git hook run pre-commit` from inside a dispatched check terminates | Run `CHK-10` with a row that invokes `git hook run pre-commit`, and assert the recursion depth is **bounded and reported**. Either a reentrancy guard fires and the inner invocation is refused, or the run is refused outright — but the depth is never left to the operating system | **This is the live one and it has been built and watched.** `CHK-10` dispatches every row naming `pre-commit`; `CHK-09` asserts `git hook run pre-commit`; that re-enters `CHK-10`. **Unbounded, on every commit** — measured at the 1.5/1.13 review. R-2 split the row so the cycle does not exist today, but `git hook run` still has no reentrancy guard and sets no environment marker, so the NEXT row anyone adds that names `pre-commit` and shells out re-creates it. The mutation is: add one such row | **RED** — no guard and no marker exist. Owner: The Systems Engineer, 2.14. Close: `git hook run` from inside a dispatched check is refused or bounded, and the bound is printed |
| CON-7 | **No assertion invokes the event it asserts** | For every containment assertion: the thing that triggers the check and the thing that observes it are different processes. Asserted structurally on the assertion set, by grepping each assertion for an invocation of its own trigger: zero hits | Prove the hook fires by having the assertion run the hook. It then passes on every run including the runs where the hook is unwired, because the assertion supplied the invocation the hook was supposed to supply. `check_register.md` §5.1 and `CL-8(a)`; the `CHK-09`/`CHK-10` recursion is what this looks like when it also loops | **RED** — the assertion set does not exist to grep. Owner: The Systems Engineer, 2.14, with me as the proving seat. Close: the set lands and the grep returns zero |
| CON-8 | An empty stage reports its scope **and** its exit code, together | Invoked with nothing staged — which is how `git hook run` invokes it — the check exits **0** AND prints the count of files it scanned, which is **0**. Both, on the same line, so neither can be read without the other | Print `OK, no source files found` and exit 0. Every `git hook run` then reports a pass it did not earn, and the assertion suite that installs the hook and invokes it to prove it fires reads that pass as proof. `PDF-16`'s clause may not be relaxed and this is the runnable form of it | **RED** — the check does not exist. Owner: The Systems Engineer, 2.14. Close: the empty-stage run is observed with both figures |
| CON-9 | The check is reached **through the hook**, not only by hand | Stage a `%PDF` file named `x.md` and attempt a real commit in a scratch clone. The commit is REFUSED. Asserted end to end, from `git commit`, not from `node tools/check_no_sources.js` | Test only by invoking the script directly. Every `PDF` row passes and the commit path is untested — which is the only path that matters, because a check nobody's commit reaches is a check that protects nothing. `oracle/tests/` is outside every declared scan root and this suite has no runner, so "we ran it by hand" is the default state, not the exception | **RED** — depends on `CON-4`. Owner: The Systems Engineer, 2.14. Close: a scratch-clone commit is observed refused |

---

### 8.2 PUL — `SLOT-B` filled: the PDF-pull assertions

**Written 2026-08-28, BEFORE the pull, by the seat that does not execute it.** 2.10 opens when 2.5
has landed and the taxonomy folders exist; 2.11 runs the pull in Wave 3. These twelve rows are
written now so that the seat who executes the pull is executing against assertions he did not write,
which is `SLT-8` and is the whole reason the slot mechanism exists.

**These do not duplicate `PDF-1`…`PDF-16` or `CON-1`…`CON-9`.** Those two groups assert that the
containment gates catch things and that they are reached. This group asserts properties of **what the
pull put on disk** — a population, a byte count, a tier assignment and an orphan list — and every
one of them is a property no containment gate can see.

**THE T4 FIGURE OF 22 IS NOT SETTLED AND IS NOT QUOTED HERE AS IF IT WERE.** 52 is an upper bound
under a name-only rule; the real number comes from 2.11's orphan list, which is Wave 3 work.
`PUL-9` is written specifically to refuse a hard-coded T4.

**The byte figure is stated in bytes with its reading named**, per `PDF-11`. The baseline's known
answer is **224,042,382 bytes**, which is **224.0 MB SI** and **213.7 MiB** — a 10 MB gap between two
readings of one number, and the reason the threshold below is written as an integer.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| PUL-1 | **Every landed PDF has a summary** | For each file under `literature/_pdf/<folder>/`, a summary exists under `literature/<folder>/` whose `## Provenance` block names it in a `Source file` line. Reported as a count of unpaired PDFs, which must be **0** | Land a PDF whose summary was never written. The corpus then holds a publication it does not summarise, which is the one thing the licence posture of this repository cannot survive; a count of landed files would not notice | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the count is observed at 0 |
| PUL-2 | **Zero files land from `_QUARANTINED_prior_art/`, and the exclusion is observed to be a no-op** | Two figures on one line: files landed whose source path is under `_QUARANTINED_prior_art/` = **0**, AND files the exclusion actually removed = **0, reported as a no-op**. Both, together. The baseline measured that directory as **26 files, all `.md`, zero PDFs**, so a quarantine filter over a PDF pull removes nothing and a filter that silently does nothing is the Step 1 failure that produced a wrong verdict | Report only the first figure. A filter pointed at the wrong tree, or at a path that does not exist, also lands zero quarantined files and also reports success — and the next person reads "0 quarantined" as evidence the exclusion works | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: both figures printed on one line |
| PUL-3 | The pull population is a **set**, enumerated, not a count | The pull emits the list of source paths it intends to fetch before it fetches, and the landed set equals it. The baseline's population is **52** — `46 + 1 + 5`, from `scenario_undercarriage_sources`, `fission_program_primaries` and the five loose at top level, excluding the 111 Japanese Miracle PDFs already in `_intake/` | Assert the count only. 52 landed and 52 intended is satisfied by any 52, and the whole value of a pre-declared set is that a substitution is visible | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the two sets are compared by path |
| PUL-4 | **The byte ceiling is asserted in BYTES with its reading named** | Total bytes under `literature/_pdf/` after the pull is **≤ 250,000,000 bytes (SI)**. The constant is an integer; the comment names SI. Known answer: **224,042,382 bytes** = 224.0 MB SI = 213.7 MiB | Write the threshold as the bare string `250 MB`. The gap between the SI and binary readings of the known answer alone is 10 MB, and a contractual threshold whose unit is unstated is what `COUNTING_RULE.md` exists to prevent. This is `PDF-11`'s clause and `SLOT-B` may not relax it | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the constant is read out of the pull script as an integer |
| PUL-5 | **A pull materially larger than the estimate means the rule OVER-FIRED and pulled orphans** | The landed byte total is compared to **224,042,382** and the delta is reported as a signed percentage. A delta above **+15%** fails the pull rather than passing it as a bonus. The reasoning is not a budget: the estimate was derived from an enumerated 52-file set, so a materially larger pull is a different, larger set, and the only way the set grows is the selection rule matching files nobody adjudicated | Treat "under the ceiling" as the whole assertion. 249,000,000 bytes is under 250 MB and is **+11% over the estimate**, which is 25 MB of files nobody enumerated, landing green | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the signed delta is printed |
| PUL-6 | Landed PDFs go to `literature/_pdf/<folder>/` and nowhere else | Every landed file's path matches `^literature/_pdf/[^/]+/[^/]+$` — exactly one folder level, matching the taxonomy folder of its summary. Zero landed files elsewhere in the tree | Land into `literature/<folder>/` beside the summaries. `PDF-5`'s rule is anchored at `/literature/_pdf/` and stops at its anchor, so a PDF one directory up is covered only by the carrier block, and the two-authority arrangement stops being defence in depth the moment either is assumed | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the path regex is run over the landed set |
| PUL-7 | **Zero landed PDFs are tracked, asserted AFTER the pull** | `git ls-files '*.pdf' '*.PDF'` returns zero lines with 224 MB of PDF on disk. `PDF-1` asserts this on an empty tree, where it cannot fail; this row asserts it on the only day it can | Run `PDF-1` before the pull and not after. It passes on a repository holding no PDFs, which is every day except the one that matters | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: `git ls-files` is observed returning zero with the store populated |
| PUL-8 | The tier assignment is a **closed set** and every landed file carries one | Every landed PDF is recorded with a tier in `{T1, T2, T3, T4}` and the report gives the population of each. Zero blanks, zero files with two tiers | Leave the tier blank for the files that were hard to classify. Those are precisely the files the orphan report exists to surface, and a blank is a classification of "not looked at" that reads as "no issue" | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the four populations are printed and sum to the landed count |
| PUL-9 | **T4's population is DERIVED, and a hard-coded T4 is a failure** | The T4 count is computed from 2.11's orphan list at run time. The checker contains no numeric T4 literal — asserted by grepping the pull script for a bare `22` or `52` adjacent to `T4`: zero hits. **22 IS NOT SETTLED AND 52 IS AN UPPER BOUND UNDER A NAME-ONLY RULE.** Whatever the run produces is reported with the rule that produced it | Hard-code 22, from the figure that has been circulating since 2.7. The check then passes when the world disagrees with it, and the number acquires an authority nobody granted it by being asserted in a test | **RED** — the pull has not run. Owner: The Engineer, 2.11, jointly with 2.11's orphan list. Close: the grep returns zero and the printed T4 carries its derivation |
| PUL-10 | **An empty orphan report says "zero", it does not say nothing** | The orphan report is emitted on every run. Where there are no orphans it prints `orphans: 0` together with the population it searched. A report that prints only when non-empty is indistinguishable from a report that did not run | Emit the report only when it has content. The clean run and the crashed run then produce the same output, which is the shape `CON-8` fixes for the empty stage and `PRV-15` fixes for the empty label class. Three rows, one defect: an empty list reading as a clean one | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: a zero-orphan run is observed printing both figures |
| PUL-11 | The hand-queue is enumerated **by id, with a reason each** | Every file routed to the hand queue is listed by its union key with a named reason from a closed set. A hand queue with a count and no members is a number nobody can act on | Report the hand-queue size only. The queue is worked by a person, and a person cannot work a cardinality | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the enumerated queue is emitted |
| PUL-12 | The pull is **re-runnable**, and a second run lands nothing | Run the pull twice. The second run fetches zero bytes, writes zero files, and reports both as zero rather than as success. Tree hash of `literature/_pdf/` identical across the second run | Make the pull unconditional. 224 MB re-fetched on every invocation is not merely slow: a re-fetch that partially fails leaves a store that is neither the old one nor the new one, and `PUL-1`'s pairing then fails for a reason that has nothing to do with the corpus | **RED** — the pull has not run. Owner: The Engineer, 2.11. Close: the second run's two zeros are observed |

---

## 9. REG — register integrity, `oracle/register_schema.md` §§3, 8, 9

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| REG-1 | The sidecar is a **set** of files | The loader takes a list of register paths and unions them. There is no `oracle/REGISTER.tsv` and the loader refuses to create one | Concatenate the two halves into one file. Measured at R-2: two `H` rows, 143 failure lines under `ecr_verify.js` — 40 `L4` leaves addressed against the wrong root and 101 `B3/K2` keys occurring in no member | green |
| REG-2 | SET-1: one `basis_root` per file, governing every row in it | Exactly one `H` row per file, and it is the first non-comment row | Splice a second `H` row at line 98 of a copy. L0 must report "row 98 is a second H row" and the `L2` lines must report the **first** header's counts. Before R-3 the loader read `if(t==='H') H=f` — last-H-wins — and silently validated the second | green |
| REG-3 | SET-2: axis ids are unique across the loaded set | The loader unions every file's axes and refuses a duplicate id by name, naming both files. Known answer: 2 files, 33 `A` rows, 33 distinct ids | Rename one `ECR-` axis to `LCC-12` in a copy. `LCC-12` is authored once on the lunar side, so every per-file check passes and only the set check fires | green |
| REG-4 | SET-3: the join is at load, and no assertion crosses a file boundary except SET-2 | Each file is validated in full against its own `basis_root`, independently. Assert by running the loader on each file alone and on both, and comparing the per-file failure sets: identical | Validate file A's leaves against file B's root; 40 leaves stop resolving and the failure is reported as a corpus defect rather than as a loader defect | green |
| REG-5 | L2: the self-declared size is checked | Parsed `A` rows == `H.axis_count`; parsed `M` rows == `H.member_count`. Known answers: lunar 15/81, econ 18/53 | Delete one `M` row without touching the header; L2 fires. This is the `H`-row known-answer clause, and it is the cheapest test in this step | green |
| REG-6 | An ad-hoc census is checked against the `H` row before use | Every Step 2 deliverable stating a register census states, on the same line, the `H` row it agrees with | State a census with no `H`-row reconciliation; that is arm 2b live, and it is falsifier F2 of the Step 1 close. Known answers it must reproduce: `Q-ECR-AXES` is 18 (the file's own header says 18; `QUANTITIES.md` says 17) and `Q-LCC15-DISTINCT-LEAVES` is 59 (the addendum is right) | green |
| REG-7 | L4: every `M.leaf` resolves | Every member leaf resolves in the leaf index built from `listCorpusFiles()`. Known answers pre-merge: lunar 59 of 59 distinct names resolve, econ 30 of 30 | Rename one landed summary without updating the register; L4 fires with `axis-incomplete` for that axis and names `H.basis_root` and `H.basis_ref` | green |
| REG-8 | L4 resolution is **unique**, not merely non-empty | Every `M.leaf` resolves to exactly one file. Member rows carry bare filenames — measured: 0 of 81 lunar and 0 of 53 econ contain a `/` — so resolution is a recursive walk, and after the merge that walk spans eleven folders and 185 files instead of eight and 152 | Land the unresolved `gdp`/`GDP` pair on a case-sensitive filesystem; `gdp.md` then resolves to two files and a bare name resolves to the wrong one outright. A "resolves" check with no uniqueness clause passes | green |
| REG-9 | A resolution failure is a refusal, never a fall-through to search | `L4` failure emits refusal code `axis-incomplete`. Assert zero search calls on the failure path | Fall through to search; the loop then answers from a file the register did not name, which is the whole failure the register exists to prevent | green |
| REG-10 | The `basis_root` rebind is two edits, not 134 | Post-merge, each `H.basis_root` is `literature` and no `M` row was rewritten. Measured: neither register contains the string `lsei/literature/` at all | Rewrite member rows to full paths; 134 edits replace 2, and every subsequent rename breaks a path instead of a name | green |
| REG-11 | `basis_ref` names a ref that resolves in the tree it describes | For each register, `basis_ref` resolves in the repository holding `basis_root`'s files | Measured: `REGISTER.econ.tsv` names `c42a217`, which does **not** resolve in `lsei` or `cr-agents`, resolves in *this* repository as a commit about the answering-loop suite, and tracks **zero** files under `_intake/`. It is a timestamp with a hash on it. REG-11 is the test that says so | **RED** — owner: The Engineer at 2.16. Close: the econ register's `basis_ref` names a ref that tracks the files it describes, or reads `none`, which §3.1 permits and which is a true statement |
| REG-12 | L5: side arity by class | `two_sided` and `false_pair`: ≥2 distinct `M.side`. `one_sided`: exactly 1 | Delete the second side of a `two_sided` axis; the axis then satisfies "every member resolves" and cannot deliver a contested answer | green |
| REG-13 | B4: the in-file block round-trips, in **both** directions | For every summary, the set of `(axis_id, side)` pairs in its `## Contested` block equals the set of `M` rows naming its leaf | Delete one `M` row while leaving the block. Run one way only and the file passes: a member that lost its row is exactly the failure B4 exists to catch | green |
| REG-14 | The in-file block grammar is minimal | Literal `## Contested`, then `- <axis_id> <side>` lines and nothing else — no bold, no backticks, no paths, no prose, no keys | Add `match_keys` to the block. Measured at §8: a rich in-file block costs 7.73% mean IDF loss on live keys and gains 14 spurious confirmations, because it writes the question's own words into member bodies. A rich block is a fabrication vector | green |
| REG-15 | The block is generated, never hand-written | Regenerate every block from the register set and diff against the files; any difference fails | Hand-edit one block; the diff fires. Same posture as FLD-10 and `COUNTING_RULE.md` M6 — the hand-maintained-copy class is removed structurally, not by vigilance | green |
| REG-16 | Retrieval excises the block before tokenizing | `corpusDocFrequency()` and `confirmInText()` both remove the region from `## Contested` to the next `^## ` or end of file. Assert on the tokenizer's output, not on the source text | Excise in one and not the other. Even the minimal block leaks through its heading: `contested` is an English word, and every member summary carries it | green |
| REG-17 | The excision is a requirement on retrieval, not a convention | Grep the retrieval layer for the excision; assert it is present in both call sites and covered by its own test in the Step 3 suite | Remove it from one site. The minimal field set is what makes forgetting the excision survivable rather than catastrophic, so REG-14 and REG-17 must both hold — neither substitutes for the other | green |
| REG-18 | The block's only consumer is the misclassification detector | The detector has exactly two outputs, a refusal and a `MISCLASSIFIED` run-log row; it fetches no counterpart and composes nothing. Assert on its return type | Give it a fetch path; a mechanism with no ability to combine cannot become a reconciliation, and one with a fetch path can | green |

---

## 10. CNT — the counting rule, `COUNTING_RULE.md` §§2, 3, 8, 9

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| CNT-1 | Every count Step 2 emits carries a quantity block | For each numeral this step states as a count, a `quantity` block exists with that `id` | State a landed file count with no block; M2 finds the tag has no id, or nothing finds it at all because there is no tag | green |
| CNT-2 | Every block carries all twelve keys | Key set equality against the twelve, exactly. Six may read `none` or `n/a`; **none may be absent** | Drop `sampled:` from one block; M1 exits 1. A missing key is not an empty key | green |
| CNT-3 | `operation` is one of the four forms | `cmd:`, `script:`, `derived:` or `manual:`. Prose is not an operation | Write the merge's arithmetic as prose; version 1 admitted three forms and the author of `Q-ROOT-ALLOWANCE` wrote `259 - 1 - 108` under `script:` because that was the nearest slot | green |
| CNT-4 | Every `cmd:` operation names its `cwd` and its length | `conditions` contains `cwd:` followed by a character count, or `length-independent:`, or `inherits: Q-<id>`. Measured: this repository's root is 55 characters | Omit the length; M11 exits 1. The clone that failed failed on the length of its root and the row recorded the leaf | green |
| CNT-5 | `sampled` is non-`n/a` wherever the operation classifies | The merge disposition call, the T1–T4 PDF pairing and the `Licence` label all classify. Each block states `N inspected by hand, M found wrong, by <who>` | Write `sampled: n/a` on the T2 pairing; a counting operation is verified by re-running it and a classifying one is not, because a wrong rule computes a clean number | green |
| CNT-6 | Every count crossing a boundary carries its operation | §3 rule 12: into a spawn prompt, a message to the author, a summary table, the gameplan or the accumulator. M15 covers the two that are files | Relay the landed file count into a spawn prompt with no operation; the receiving seat cannot tell 176 from 185 and both are true | green |
| CNT-7 | A failure count carries the command that produced it, with its pattern and anchoring | §3 rule 11. Known answer from the authoring session: `node tools/quantities.js --check` exits **1**, prints `NOTE hard failures: 12`, and `grep -c '^FAIL '` over its output returns **12** — the two agree | State a failure count with no command. `ecr_verify.js` returned 0 against a real count of 143 under `grep -c '^FAIL'`, and 145 against a real 144 after the fix that un-indented the lines added a `FAILURES` summary the same pattern counts | green |
| CNT-8 | `--check` acquires no **new** hard failure against a promoted authority | Run before and after each Step 2 promotion; the hard-failure set after ⊆ the set before, compared **by id**, not by count | Promote a file carrying a duplicate id; the set grows and CNT-8 names the id. Baseline measured in the authoring session: **12** hard failures — 3 × M3 (`Q-ECR-AXES`, `Q-LCC15-DISTINCT-LEAVES`, `Q-DEGRADED-MODES`) and M11 on `Q-REG-TSV-IGNORED`, plus the rest | green |
| CNT-9 | The baseline is a **set**, not a number | The comparison is on failure identity. A count comparison passes when one failure closes and another opens | Compare counts only; two changes that cancel are then invisible, and 12 stays 12 while the corpus acquired a defect | green |
| CNT-10 | The promoted-marker exclusion is computed from the manifest on every run | Blocks inside a `cr_scratch/` marker range whose target `MANIFEST.tsv` records as `promoted` are outside the declared file set. Not a flag; computed unconditionally | Make it a flag. Measured at 1.14, promotion took hard failures from 23 to 33 and the eight new ones were eight duplicate ids two personas had predicted to the id. A checker whose default run reports eight failures the reader must know to discount is a checker that gets switched off | green |
| CNT-12 | **Every instrument under `tools/` is TEXT to git** | For every `.js`, `.sh` and hook under `tools/`: zero NUL bytes inside git's first-8000-byte text/binary window, so `git diff` renders it line by line. Run by `run_suite.js`. **The close condition is `git diff --numstat` showing real add/delete counts and `file(1)` reporting text — NOT the exit code**, which was 0 throughout and proves nothing about this | Use a raw NUL as a key separator inside a string literal instead of the escape `\0`. Identical behaviour, identical key space, and the file becomes binary to git. Measured at this wave's open: `tools/check_registers.js` (NULs at 7926, 7953, 8500) **and `tools/manifest.js`** (3361, 3410, 3426) were both binary, `git diff` printed `Binary files … differ` and `--numstat` printed `-\t-`. **Two of the repository's enforcement instruments had never produced a reviewable diff, and one of them is where the read-digest is computed.** No assertion anywhere said an instrument must be reviewable; the property that failed is not "the script works", it is "a human can review a change to the script" | **green — closed by observation 2026-08-28, W2-2.** Both files repaired by replacing each raw NUL with `\0`; both now `file(1)`-text and both diff line-level. `run_suite.js` reports all instruments under `tools/` text to git |
| CNT-11 | The checkers do not walk `lsei/` or `cr-agents/` | M1–M15 run over §8's five globs only. Assert by instrumenting the walker and checking the visited-root set | Add `lsei/` to the set; 152 files of somebody else's documents produce a wall of findings on the first run and the tool is switched off on the second | green |

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
| **SLOT-B / 2.10** | PDF-pull assertions | **The Software Engineer (written), W2-2; The Engineer executes 2.11.** Same split as `SLOT-A`, for the same `SLT-8` reason | 2.5 has landed and the taxonomy folders exist | Assertions on the T1–T4 tiers, on the hand-queue population, on the pulled byte count against the known answer of 224,042,382 bytes, and on the orphan report | **PDF-11's byte-and-unit clause may not be relaxed to a bare "MB".** T3 and T4 may not acquire a further automatic tier; adjacency produced 2,024 candidate pairings and matched `un-1967-outer-space-treaty` to thirteen PDFs | **FILLED (12 tests): `PUL-1` to `PUL-12`, §8.2, 2026-08-28.** And it is `SLT-9`'s case, stated: the artifact these twelve assert against — the landed PDF store under `literature/_pdf/` — **does not exist**, `literature/` holds zero files, and all twelve are RED with an owner and a close condition. Not `DECLINED`: the tests exist, they are checkable the moment the pull lands, and `run_suite.js` reports them UNRUN rather than green so nobody reads an empty store as a clean one |
| **SLOT-C / 2.13** | Containment assertions | **The Software Engineer (written); The Systems Engineer builds 2.14.** Reassigned by the author 2026-08-28: the two were one seat and are now two | Immediately — it depends on no merge output | The five fixtures, the bootstrap wiring assertion, the `git hook run pre-commit` invocation check, and a reentrancy fixture | **PDF-2 may not be closed by scoping the rule back to `literature/`.** The empty-stage clause of PDF-16 may not be relaxed. No assertion may invoke the event it asserts — CL-8(a) and §5.1, and the CHK-09/CHK-10 recursion is why | **FILLED (9 tests, CON-1…CON-9, §8.1, 2026-08-28).** All nine RED: `tools/check_no_sources.js` and the hook wiring do not exist. `CON-1` makes `PDF-2`'s scoping prohibition mechanical; `CON-8` is `PDF-16`'s empty-stage clause in runnable form; `CON-7` asserts the no-self-invocation rule structurally and `CON-6` is the reentrancy fixture |
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
| SLT-3 | A filled slot names the tests it added, by id | The fill state names the id range and the count, and those ids exist in this file | Write `FILLED` with no ids; the count is then a claim nobody can check | green |
| SLT-4 | A slot cannot weaken an existing test | Diff this file across the fill: no existing pass criterion narrowed, no RED silently greened, no test deleted. Asserted mechanically on the test id set and the criterion strings | Narrow CRP-5 to case-folding while filling SLOT-A; SLT-4 fires on the changed criterion string even though the test id set is unchanged | green |
| SLT-5 | The suite's declared test count is updated with every fill | The header count equals the counting rule's result over this file | Fill a slot without updating the header; the file stops declaring its own size, which is the `H`-row remedy applied to a suite | green |
| SLT-6 | A declined slot names a reason and an owner | `DECLINED` carries both, in the cell | Write `DECLINED` bare; a declined amendment and a forgotten one are then indistinguishable, which is AM-121's shape | green |
| SLT-7 | 2.4's assertions are proved able to fail **before** 2.5 runs | The gate: every SLOT-A assertion is run against a deliberately broken fixture and observed red, and the observation is recorded with its date, before the merge executes | Run 2.5 first. 2.4's assertions are written by the seat that executes 2.5 — arm 2b by construction, which accounted for seven of Step 1's nine relay errors and every wrong verdict the step produced | green |
| SLT-8 | The proving seat is not the writing seat | For each slot, the seat that proves the assertions can fail is not the seat that wrote them. Asserted on the recorded owner pair | Let one seat do both; the instrument is then verified by the hand that built it, once, and the first output is used as a result | green |
| SLT-9 | A slot filled against an artifact that does not exist says so, in the fill state | A `FILLED` state whose assertions have no artifact to run against names that fact and names what is missing. It is not `DECLINED` — the tests exist and are checkable the moment the artifact lands — and it is not a silent green | Write `FILLED (12 tests)` for `SLOT-A` with no note. A reader then believes twelve merge assertions guard 2.5, when what exists is twelve assertions guarding a file nobody has written. **This row exists because filling `SLOT-A` before its opening condition was met is exactly what the wave asked for, and the honest form of that is a state that admits it** | green |

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
| **MRG-9** | **6 within-folder `dedup_key` collisions**, `L0` rows excluded. Three are `L1` DOIs shared by two rows, one is an `L2` landing page shared by **three** — `nasa.gov/moontomarsarchitecture` | **RED** — 6 findings, and each needs adjudication. Owner: The Engineer |
| **MRG-10** | **6 whole-tree collisions, the same 6. All six are same-folder, so `MRG-10` finds nothing `MRG-9` missed — TODAY.** That is not the assertion passing vacuously; it is the two scopes agreeing at this placement. **Two reviewers are cutting folder assignments this wave.** Move one member of any of the six to another folder and `MRG-9` goes green while the collision survives. `A7` is general for exactly this, and the window is open right now | **RED** — 6 findings. The vacuous-pass risk is live, not theoretical |
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
| MUT-2 | Every stated mutation has been applied and observed red | For each test, the harness applies the named mutation to the fixture tree and records the observed verdict. Zero tests carry an unrun mutation | Mark a test green without running its mutation. FIX-9 and FIX-10 of the 1.11 suite were both carried green against a prototype that fails them; status is an assertion, not a hope | green |
| MUT-3 | A mutation that fails to apply is a failure, not a skip | If the harness cannot apply a mutation — the file moved, the string is gone — the run fails naming the test | Make a failed application a skip; a whole group then reports green because its fixture was renamed | green |
| MUT-4 | Each mutation flips **its own** test and is checked against the others | Applying mutation *m* for test *t* turns *t* red. The harness also records which other tests went red, and a mutation that turns nothing red fails | Write a mutation that breaks the fixture wholesale; every test goes red and the mutation proves nothing about *t*. MUT-4 is what makes the column an assertion rather than a gesture | green |
| MUT-5 | No mutation ever touches the real corpus | Tree hash of `literature/`, `findings/`, `lsei/` and `_intake/` before and after the whole mutation run: identical | Point the harness at `literature/`; MUT-5 fires. A test suite that can damage the corpus it tests is a worse instrument than no suite | green |
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
