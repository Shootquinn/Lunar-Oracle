# The corpus acceptance suite — Step 2

**Written before 2.1, 2.2 and 2.3 ran, and that is the point.** Every test below asserts a property
of the **target state** — the corpus as it must be at the Step 2 gate — rather than an output of the
three measurement sub-steps. A suite written against 2.1's numbers would be a transcript of 2.1, and
2.1's author is the seat that executes 2.5. This suite is authored by a seat that owns no merge
output in this step, which is the whole of its value.

**148 tests.** Counting rule: rows in the twelve tables of §§1–12 whose first cell matches
`^[A-Z]{3}-[0-9]+$`, counted over this file. Per group: NRM 9, NAM 16, PTH 11, FLD 12, PRV 17,
DUP 11, CRP 13, PDF 16, REG 18, CNT 11, SLT 8, MUT 6.

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
| PTH-9 | Every file `listCorpusFiles()` returns from `literature/` is at depth 2 | The corpus root holds no top-level `.md`. Asserted on the **walker's output**, not on a directory listing, because the walker is what retrieval sees | Move any summary to `literature/x.md`; A3's depth clause fires | **RED** — `literature/NAMING.md` sits at depth 1 and the walker returns it, so the naming contract is a retrievable literature source. Measured: `check_corpus_collisions.js` reports "1 summaries" and the one is NAMING.md. Owner: the author, at the 2.3 taxonomy ruling. Close: NAMING.md relocated out of the corpus root, or a §10 by-name exception, or retrieval rooted below it |
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

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| FLD-1 | `literature/FIELDS.tsv` exists and is committed | The file is present and tracked; `git check-ignore` reports it not ignored — the `.gitignore` re-admits it by literal name | Remove the `!/literature/FIELDS.tsv` literal; the deny-by-default rule swallows it and retrieval silently loses field scoping | **RED** — measured: `literature/FIELDS.tsv` does not exist. Owner: The Engineer at 2.3. Close: the map lands with the taxonomy |
| FLD-2 | Two columns, `folder` and `field` | Every row has exactly two tab-separated fields; no field contains a tab or newline | Add a third column; the reader takes column 2 as the field and reads a truncated value with no error | green |
| FLD-3 | One row per taxonomy folder, closed and exhaustive | The set of `folder` values equals the set of directories directly under `literature/` — in **both** directions | Add a folder to the taxonomy without adding a row; a file in it then derives no field, and a pooled table is what it silently falls back to | green |
| FLD-4 | Every file derives a field | For every file `listCorpusFiles()` returns, the first path segment is a key of the map. Count of files deriving no field is zero | Delete one map row; the count becomes non-zero and FLD-4 names the files | green |
| FLD-5 | The field is derived from the path, never from file content | The derivation reads `relpath.split('/')[0]` and opens no file. Asserted by grepping the deriver for `readFile`: zero hits within the derivation | Add a front-matter override; the label can then be edited into disagreement with the folder and nothing notices, which is the §9 "not in the file" ruling | green |
| FLD-6 | The field is not in the filename | Zero landed leaves begin with a field word from `FIELDS.tsv`'s `field` column | Rename `sargeant-2020-…` to `lunar-sargeant-2020-…`; §9's measurement shows the lead token becomes `lunar` and scores 4 where it scored 0, converting the strongest filename signal into a constant | green |
| FLD-7 | The field partition is data, not a rule | The number of distinct `field` values is read from the file and is not hard-coded anywhere in the retrieval layer or the checkers. Grep for any literal field name outside `FIELDS.tsv`: zero hits | Hard-code the two field names in the deriver; the taxonomy then cannot change without a code edit, which §9 says explicitly it must be able to do | green |
| FLD-8 | A file cannot carry two fields | The derivation is total and single-valued: exactly one field per path. The `- **Also:**` second-membership line does **not** produce a second field | Make the deriver read `Also:` and emit a second field; the IDF table then double-counts a document and the weights are wrong for both fields | green |
| FLD-9 | The field label and the `Also:` cross-reference are different fields doing different jobs | Assert they are read by different consumers: the field by the IDF scoper, `Also:` by `INDEX.tsv` only. No consumer reads both for one purpose | Point the IDF scoper at `Also:`; FLD-9 goes red and FLD-8 goes red with it | green |
| FLD-10 | `INDEX.tsv` is regenerated, never hand-edited | Regenerate in memory from the `## Provenance` blocks and diff against the committed file; any difference is a failure | Hand-edit one `also` cell in `INDEX.tsv`; the diff fires. This is `COUNTING_RULE.md` M6's shape applied to the corpus index | **RED** — measured: `literature/INDEX.tsv` does not exist. Owner: The Engineer at 2.5. Close: emitted by the merge |
| FLD-11 | `INDEX.tsv` columns are `path`, `primary`, `also` | Header row exact; `primary` equals the file's folder; `also` is empty or a folder name in `FIELDS.tsv` | Write an `also` value naming a folder that does not exist; FLD-11 fires where a walk of every file would not have | green |
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
| PRV-13 | A DOI recorded here is the DOI the source prints **[gate]** | For a sampled set, the `doi:` value equals the DOI printed in the source, `10.` onward, lowercased, no resolver prefix | Alter one digit; the identifier still parses, still looks right, and points at a different paper. Only a source read catches it, which is why this row carries the gate | green **[gate]** |
| PRV-14 | `Licence` is a closed set of two | Value ∈ `{own-summary, contains-transcribed-source-text}` | Write `unknown`; the Open Question 8 audit then has a third state nobody ruled on | green |
| PRV-15 | `Licence: contains-transcribed-source-text` agrees with the measured overlap **[gate]** | Every file so labelled is one `tools/audit_abstract_overlap.js` reports above the Open Question 8 threshold, and no file above the threshold is labelled `own-summary` | Relabel one high-overlap file `own-summary`; the label and the measurement disagree, and the label is what ships | green **[gate]** |
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
| CRP-10 | The five same-name disagreements are adjudicated, not merged | `azami-2024`, `barro-2004`, `csank-2022`, `falcon-heavy-wikipedia`, `poston-2020`: two summaries are never merged into one and neither is deleted; a `DUP-xx` register row is emitted instead | Merge one pair into a single file; content from one summary disappears with no report, and the register row that would have recorded the disagreement never exists | green |
| CRP-11 | Byte-difference is distinguished from line-ending difference | For each of the five, the adjudication states whether the difference survives CRLF normalization. `barro-2004` differs by 6 bytes and `falcon-heavy` by 28 | Skip the normalization step; a whole-file CRLF diff is then read as a content disagreement, which this repository has already produced once | green |
| CRP-12 | No file is dropped by the merge | Every source file appears in the merged tree or in the deliberate-exclusion report with a reason. Sum of landed + excluded == union | Drop one silently; the sum breaks by one and CRP-12 names it. A merge that loses a byte-identical duplicate loses nothing and reports success — this is the test that notices anyway | green |
| CRP-13 | The merge is a copy, not a move | Both source trees are byte-unchanged after the merge, asserted by tree hash | Change `cp` to `mv`; the merge becomes irreversible before the author has approved it, and the baseline's own known answers stop being re-measurable | green |

---

## 8. PDF — containment

**Three gates, and they are not interchangeable.** Extension, size, magic bytes. The measurements in
§0.1 findings 3 to 5 mean the extension gate is open outside `literature/` and the size gate admits
26% of its own target population, so the three are a defence in depth in which exactly one is
currently load-bearing.

| ID | What is tested | Pass criterion | Mutation that makes it red | Status |
|---|---|---|---|---|
| PDF-1 | Zero `.pdf` tracked anywhere in the repository | `git ls-files '*.pdf' '*.PDF'` returns zero lines. Measured in the authoring session: zero | `git add -f` any PDF; PDF-1 returns 1 and names it | green |
| PDF-2 | The ignore rule is repository-wide, not path-scoped | `git check-ignore` reports IGNORED for `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf`, `literature/x.pdf`, `literature/isru/x.pdf`, `_intake/x.pdf` | Remove the repository-wide rule; the four non-corpus paths commit cleanly | **RED** — measured with `git check-ignore` in the authoring session: `x.pdf`, `docs/x.pdf`, `oracle/x.pdf` and `tools/x.pdf` are all **NOT ignored** today. Part 5 hole 1 is open. Owner: The Software Engineer at 2.13/2.14. Close: a repository-wide `*.pdf` rule landed and this test green |
| PDF-3 | The other published-source carriers are covered | Same check for `.djvu`, `.epub`, `.docx`, `.doc`, `.pptx`, `.ps`, `.tif`, `.tiff` at the same seven paths | Drop `.tif` from the list; page scans are the same licence problem as the PDF and are not covered today | green |
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
| PDF-14 | The five 2.13 fixtures all fire | `x.pdf`, `x.PDF`, `x.pdf.bak`, a `%PDF` file named `.md`, a 600 KB `.md` — each exits 1, individually, and the report names which gate caught it | Remove the gate-name from the report; a fixture then passes for the wrong reason and nobody can tell | green |
| PDF-15 | It accepts the real corpus unchanged | Run against the merged tree: exit 0, zero findings | Lower the size threshold below 84,767; the largest legitimate summary is then a finding, and a check that flags real corpus files is a check that gets switched off | green |
| PDF-16 | An empty stage is not a pass it did not earn | Invoked with nothing staged — which is how `git hook run` invokes it — the check exits 0 **and says it scanned nothing**. It never reports a clean stage as a verified stage | Make emptiness print "OK, no source files found"; the hook then reports a pass on every `git hook run`, which is the assertion asserting its own dispatch. See `check_register.md` §5.1 and the CHK-09/CHK-10 recursion: `git hook run` has no reentrancy guard and sets no environment marker, so an assertion suite that installs the hook and then invokes `git hook run` to prove it fires reproduces the cycle | green |

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
| **SLOT-A / 2.4** | Merge assertions | The Engineer (written); The Software Engineer (proves each can fail, before 2.5 runs) | 2.2 and 2.3 have landed — the assertions are parameterized on the dispositions and the folder assignment | Assertions on merge disposition per pair, on the primary/secondary call, on folder placement, and on the refusal behaviour for an unresolved collision | **CRP-4 and CRP-5 may not be narrowed to a case-insensitive rule.** No test may move from RED to green without its named close condition being met. No test may be deleted; a test believed wrong is argued, not removed | **EMPTY** |
| **SLOT-B / 2.10** | PDF-pull assertions | The Engineer | 2.5 has landed and the taxonomy folders exist | Assertions on the T1–T4 tiers, on the hand-queue population, on the pulled byte count against the known answer of 224,042,382 bytes, and on the orphan report | **PDF-11's byte-and-unit clause may not be relaxed to a bare "MB".** T3 and T4 may not acquire a further automatic tier; adjacency produced 2,024 candidate pairings and matched `un-1967-outer-space-treaty` to thirteen PDFs | **EMPTY** |
| **SLOT-C / 2.13** | Containment assertions | The Software Engineer, with The Systems Engineer on the bootstrap half | Immediately — it depends on no merge output | The five fixtures, the bootstrap wiring assertion, and the `git hook run pre-commit` invocation check | **PDF-2 may not be closed by scoping the rule back to `literature/`.** The empty-stage clause of PDF-16 may not be relaxed. No assertion may invoke the event it asserts — CL-8(a) and §5.1, and the CHK-09/CHK-10 recursion is why | **EMPTY** |
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
