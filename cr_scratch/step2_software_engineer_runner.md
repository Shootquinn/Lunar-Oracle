# W2-2 — The Software Engineer: the runner, `MRG-4`, the gate repairs, `SLOT-B`

## 1. Premise check — first line, standing clause 1

Four premises. **Two held as stated, one held with a corrected address, one held and UNDERSTATED
the defect by a factor of two.**

| # | Premise as briefed | Measured | Verdict |
|---|---|---|---|
| P1 | `oracle/tests/run_suite.js` does not exist; `CHK-18` has named that path since 1.13 | `ls` → no such file. `oracle/check_register.md:360` carries `CHK-18` with target `oracle/tests/run_suite.js`, `on_failure: block`, and the 2.20 correction text in its own notes cell | **HELD** |
| P2 | `oracle/tests/corpus_suite.md` is at 175 tests declaring 175 | Header declares 175; `awk '/^## 13\./{exit} /^\| *[A-Z]{3}-[0-9]+ *\|/{c++} END{print c}'` returns 175. `SLT-5` holds at the wave open | **HELD** |
| P3 | `tools/audit_abstract_overlap.js` **line 38** carries the bare-heading regex | The regex is on **line 34**, not 38. Line 38 is `const dir = process.argv[2];`. The regex is `/^##+\s*Abstract\s*$([\s\S]*?)(?=^##\s)/mi` and the defect is exactly as described | **HELD, WRONG ADDRESS.** A brief that names a line number is making a checkable claim and this one was wrong; the defect is real |
| P4 | `tools/check_registers.js` carries exactly three NUL bytes and `file(1)` calls it binary | Three NULs at 7926, 7953, 8500 — the briefed offsets, to the byte. `file(1)`: `a node script executable (binary data)`. Two of the three are inside git's 8000-byte window | **HELD** |

**P4 IS TRUE AND THE STATEMENT AROUND IT IS FALSE.** The brief says *"one of the two enforcement
instruments in this repository has never produced a reviewable diff."* I scanned every file under
`tools/` for NUL bytes rather than checking the one I was told about:

```
tools/check_registers.js  len 15274  NULs 3  [7926, 7953, 8500]   in first 8000: 2
tools/manifest.js         len  7787  NULs 3  [3361, 3410, 3426]   in first 8000: 3
```

`file(1)` reports **both** as binary data. `tools/manifest.js` is in my write set this wave and
nobody said it was affected. Its three NULs are worse placed than the ones I was sent to fix — all
three sit inside the window, so it is not a marginal call for git, it is unambiguous. And
`manifest.js` is where the **read-digest itself** is computed: the NULs are the field separators in
`h.update(r + '\0' + st.size + '\0' + st.mtimeMs + '\n')`. The instrument that stamps every
measurement in this project with a reviewable digest was itself not reviewable. Both are repaired
below.

**Proof git treats it as binary, which is the close condition rather than the exit code.** Appended
one newline to `tools/check_registers.js` and diffed:

```
git diff --numstat  ->  -	-	tools/check_registers.js
git diff            ->  Binary files a/tools/check_registers.js and b/tools/check_registers.js differ
```

`-\t-` in `--numstat` is git's binary marker. Reverted immediately; md5 restored to
`7a60e3329bc029140f3a2da75500dbc5`.

## 2. Live state, measured at my wave open, with digests — standing clause 7

| Instrument | Result | Read-digest | Files | Comparable to the brief? |
|---|---|---|---|---|
| `node tools/quantities.js --check` | **15 hard failures**, exit 0 | `4f017a7cfd297995` | **110** | **NO.** The brief quotes 15 @ `5b27609c1744300e` over **101** files. Same count, different digest, and a different file **set** — nine more files. Two figures carrying different digests are not comparable and I am not reconciling them |
| `node tools/check_registers.js` | **1 hard failure**, exit 0 — `FAIL MF-1 row literature/NAMING.md is promoted but no file exists at that path` | `bbaa4be015d4edd0` | **81** | **NO.** The brief quotes the same failure @ `dc72ed90c39cf720` over **72** files |
| `literature/` | **0 files**, directory exists and is empty | n/a | 0 | held |
| `cr_scratch/merge_plan.tsv` | exists, **17 columns**, **176 data rows**, `pair_role: dup-member` on **16 rows** in **8** `DUP-xx` groups | n/a | n/a | The Engineer has not yet landed the 18th column |

The census counts nine files that did not exist when The Manager measured: the eight
`cr_scratch/relay/spawn/w2-*.md` briefs and one more. **My own deliverable file is inside the
declared set** (`cr_scratch/**/*.md` is a scan root), so every figure in this document that carries a
digest was taken with my own file present at whatever length it had reached — which is standing
clause 4 operating on me, and it is why I re-ran at the close and report both.

The 15 failures decompose, by failure line rather than by count: **1 × `M1`** (malformed block,
`step2_engineer_dispositions.md`), **8 × `M2` duplicate id** — the ten-way fork, all in
`step1_10_manager_economics_register.md` and `step1_9_space_resources_engineer_register_rows.md` —
**3 × `M3`** two-valued quantities, **3 × `M11`** cwd omissions. **I read the failure lines rather
than the count**, which is my own finding three times over. **None of the 15 is in a file I write**,
and the eight `M2` plus the coupled `M3` rows are the fork two other seats are collapsing during my
sitting. If this number moves under me it is not mine.

## 3. The runner — `oracle/tests/run_suite.js`

**It exists, it runs, and it exits non-zero on a planted failure in both directions.** That last
clause matters: a runner that always exits 1 also "exits non-zero on a planted failure". Proved by
moving the exit code twice, in a scope with no standing failures:

```
node oracle/tests/run_suite.js --group CNT            ->  0 fail, hard failures: 0, EXIT 0
  plant a raw NUL into a tools/ instrument
node oracle/tests/run_suite.js --group CNT            ->  1 fail, hard failures: 1, EXIT 1
  remove the plant
node oracle/tests/run_suite.js --group CNT            ->  0 fail, hard failures: 0, EXIT 0
```

A second plant, on the suite's own header, in a fixture COPY under the scratchpad and never in the
repository: change `**189 tests.**` to `**188 tests.**` and `SLT-5` fires by name —
`FAIL [structural] SLT-5 w2-2_mut_suite.md declares 188 tests, counted 189`, hard failures 5 to 6.

### 3.1 The one design decision, and it is the whole runner

**UNRUN IS NOT PASS, and a suite's status cell is a claim rather than a result.** 189 corpus rows and
216 answering-loop rows are prose criteria a person applies. A runner that printed the `Status`
column back at you would be `CHK-03` at a scale of 405 rows — a check that cannot fail, sitting on a
gate. So the runner reports three verdicts per row and prints all three on every group line:

```
  MRG    13 rows    4 pass    5 fail    4 unrun  FAIL
```

and a fourth state folded into `unrun` and always printed with its reason:

```
  UNRUN CRP-4  VACUOUS: literature/ holds 0 .md files; a per-folder collision check over
                        an empty tree is vacuously true
```

**VACUOUS is the state I raised an alarm about against my own deliverable in Wave 1**, and it is now
a mechanism rather than a memory: a binding whose population is empty returns `VACUOUS` and is
counted as UNRUN, never as PASS. `literature/` holds zero files; every collision assertion over it is
vacuously true today; an empty list must never read as a clean one.

### 3.2 The simplicity gate, applied to my own tool

This is a runner for two markdown suites. It is not a test framework and it must not become one. No
assertion DSL, no fixture lifecycle, no reporter plugins, no config file, no dependencies, one file.
Four flags, each of which earned its place by being needed during this sitting:

| Flag | Why it exists |
|---|---|
| `--suite <path>` | Run a mutated fixture COPY. This is the mutation harness `MUT-2`/`MUT-3` ask for, and it is one flag rather than a harness, because the runner never writes and so cannot damage what it reads (`MUT-5`, `CON-3`) |
| `--tree <path>` | Run the corpus assertions against a **staged** tree before promotion. Added when The Engineer's stage landed mid-sitting. **A gate that can only read the promoted tree can only report after the promotion it was supposed to gate** — and this flag is what let `MRG-4b` find two undeclared edits before anything was promoted |
| `--group`, `--verbose` | Narrowing and full output. `--verbose` prints passes, which are otherwise silent |

**The runner does not import the code it checks.** `normalize()` is reimplemented locally in one
line. An instrument that imports its subject agrees with it by construction.

### 3.3 What the runner found, first run, that reading had not

`## 8. PDF —` and `### 8.1 CON —` are two heading shapes; my heading parser matched one and not the
other, so **sixteen `PDF` rows were reported under `MRG`** — and the group totals still summed to
175. **A total that closes is not evidence that its parts are right.** Fixed by deriving the group
from the id prefix and deleting the heading parser. That is my own defect, found by running the
thing, and it is recorded in a comment at the site so the next person does not reintroduce it.

## 4. `MRG-4` rewritten, `MRG-4b` added — and `MRG-4b` caught two undeclared edits on its first run

`MRG-4` is rewritten to The Manager's ruling verbatim in substance: three clauses over the
`dup-member` rows, asserted on the **group** and not on the file. Measured against the table as The
Engineer landed it during my sitting — **18 columns now, `byte_source` and `pair_primary` both
present** — the runner reports `16 members, 8 groups, 0 half-adjudicated`, which is the ruled pass
criterion at 2.5, and `MRG-4` goes **green**.

**A population correction that matters, because two different sets have both been called "the
contested pairs" and they do not intersect.** The 16 `dup-member` rows in 8 `DUP-xx` groups are
**different-name** duplicates. The 8 same-name disagreements of `CRP-10`/`CRP-11` are the 8
`lsei-primary` rows, one row each, because a shared key collapses them into one plan row. `MRG-4`
asserts over the first set; `CRP-10` over the second.

### 4.1 `MRG-4b`: I did not take the ruling as written, and here is why

**The ruling says the landed file is byte-identical to the file named by `byte_source`. That is
unsatisfiable for all 176 rows, not for one.** `PRV-1`, `PRV-2` and `PRV-17` require every landed
file to carry a `## Provenance` block; the source copies carry none; the merge appends one. Ruled
byte-identity and ruled provenance-completeness cannot both hold, and the collision is between the
ruling and rows that were already in the suite.

I did not resolve it by weakening the assertion for all 176 to accommodate the block — that is the
move `MRG-4b` exists to prevent. **The satisfiable strict form is BODY-identity**: strip the appended
`## Provenance` block and the remainder must equal the source exactly. It loses nothing the ruling
wanted and it costs the merge nothing. **Routed to The Manager in `## Not mine` for ratification,
because the text I changed is his.**

### 4.2 What it found, run against the staged tree The Engineer produced mid-sitting

```
node oracle/tests/run_suite.js --tree cr_scratch/_stage/literature --group MRG

FAIL MRG-4b  168 landed; 166 bodies identical to byte_source (162 of them after line-ending
             normalization only, reported not folded in); 1 declared exception;
             2 UNDECLARED:
               falcon-heavy-wikipedia.md  +11/-1  e.g. "## Citation"
                 / removed "- Maiden flight 2026-02-06 (Tesla Roadster). Booster landing..."
               rostami2018-figures.md     +11/-0  e.g. "## Citation"
```

Three findings in one line, and none was visible by reading:

1. **The declared exception occurred and is correct.** `azami-2024-lunar-manufacturing-review`
   differs by exactly one added line, zero removed, and the line is the canonical
   `- **DOI:** 10.48550/arxiv.2408.05823`. Its `basis` carries `CITATION REPAIR OWED`. The one row
   in the plan where the merge writes bytes present in neither corpus copy, named in advance,
   behaving exactly as named.
2. **162 of 168 landings normalize line endings and trailing whitespace**, which nothing declares.
   Reported as its own figure and **never folded into the content comparison** — `CRP-11`'s rule,
   one group over. Fold them in and the two real findings vanish into 162 false ones.
3. **TWO UNDECLARED BODY EDITS.** `falcon-heavy-wikipedia` gains a `## Citation` block **and the
   maiden-flight date changes from 2026-02-06 to 2018-02-06**. `rostami2018-figures` gains a
   `## Citation` block. Both are Space Resources Engineer citation-repair edits and both are
   probably right — 2018-02-06 is the correct Falcon Heavy maiden flight. **Neither is declared**,
   and a factual edit to a corpus body that no assertion authorised is the exact shape `MRG-4b` was
   written for. Either declare them with a `basis` or revert them; do not leave them undeclared
   because they happen to be correct.

## 5. `PRV-13` and `PRV-15` repaired, and the instrument underneath repaired with them

### 5.1 `PRV-13` — the claim was right and the row was wrong

The A.10 gate returned a negative and the negative was against my row. The Fact-Checker's census of
30 openable sources found **zero altered DOIs and nothing fabricated** — the claim is true and
stronger than the row stated — while **16 of 30 print no DOI**, so a two-outcome row goes red on
sixteen correct values. The repaired row has **three outcomes**, and `(c) SOURCE PRINTS NO DOI`
requires a **named non-source authority** with its response recorded, because an absence with no
second opinion is not a verification.

**And a second reason she could not have known to give, measured over the 176-key union:**

| | |
|---|---|
| files carrying a `DOI:` line | **50** |
| files carrying a `Publisher URL:` line | **169** |
| of those, a `doi.org` / `dx.doi.org` resolver URL | **16** |
| **of those, carrying NO `DOI:` line at all** | **8** |

For those 8 the identifier exists in the corpus, filed under a field named `Publisher URL:`, and a
check keyed on `DOI:` scores them as identifier-less. **`tools/merge_identity.js` already keys all
8 at `L1` from that very line** — the plan's `L1` population is 89 while a naive `DOI:` count is 50.
The merge and the verification gate were reading two different definitions of "has an identifier".

The eight: `just-2020`, `kiewiet-2026`, `kokkinis-2024`, `liu-2025`, `matthews-2026`,
`smith-vaniz-2026`, `speyerer-2013`, `poston-2020`.

**Her "twelve of fourteen" and my "eight of sixteen" are not in conflict and I am not reconciling
them.** Hers is over 30 openable sources; mine is over the 176-key union. Different populations,
different numbers, and the rule says say so rather than pick one.

### 5.2 `PRV-15` — vacuously green, which is worse than red

Both label classes are empty, so the row asserted nothing and could not be gated at all. The repair
is a **non-vacuity pre-condition** — both classes non-empty or the verdict is UNRUN — plus a second
pre-condition **on the instrument**, that `abstractOf()` returns non-null for every file carrying an
Abstract heading. An instrument that silently skips its own target population reports zero findings,
and zero findings reads as a clean result.

### 5.3 The regex, and the defect was three times the size of the one I was sent to fix

P3 named line 38; the regex is on line 34. The shipped pattern
`/^##+\s*Abstract\s*$([\s\S]*?)(?=^##\s)/mi` returned null on **73 of the 267** union files carrying
an Abstract heading, for **two independent reasons**:

| Reason | Files | Named by |
|---|---|---|
| `\s*$` demands a **bare** heading, so every annotated one is skipped — `## Abstract (transcribed from title page)`, `## Abstract (transcribed)`, `## Abstract (as transcribed / paraphrased from the paper)` | **18** | The Fact-Checker, correctly |
| `(?=^##\s)` demands a **following** `##` heading, and in most summaries the Abstract is the LAST section, so a perfectly well-formed bare heading fails to match | **55** | **nobody** |

Both are the same class of bug: a regex asserting a document shape the corpus does not always have.
Both are fixed. **194 → 267 abstracts extracted** on the 271-file union; the remaining 4 carry no
Abstract heading and correctly return null.

**The measurement that makes this the finding of my sitting.** On `_intake/japanese-miracle/lit`,
112 paired summaries, threshold 10%:

```
BEFORE the repair:  tested 103,  AT OR ABOVE 10% VERBATIM: 0
AFTER  the repair:  tested 112,  AT OR ABOVE 10% VERBATIM: 8
  100.0%  prettyman-2006-lunar-elemental-composition.md   (261 shingles)
   95.6%  levin-2025-lunar-crustal-kreep-distribution.md  (229 shingles)
   74.0%  mcleod-2017-extraterrestrial-ree.md             (334 shingles)
   54.1%  castillo-rogez-2022-ceres-habitability.md       (218 shingles)
   40.9%  andrews-hanna-2025-spa-magma-ocean.md           (115 shingles)
   39.4%  hagerty-2011-spa-basalt-pond-thorium.md         (218 shingles)
   11.4%  lawrence-2003-small-area-thorium.md             (184 shingles)
   11.2%  wilson-2018-lp-thorium-reconstruction.md         (89 shingles)
```

**All eight carry the word "transcribed" in the heading that made them invisible.** A file whose
abstract is **100.0% verbatim** was skipped by the instrument that decides whether it is verbatim.
This corpus is going into a public repository under a public-domain dedication that cannot cover the
sources it describes, and the tool that measures the exposure returned zero on its own target set.

**She could not relay this to me: her write set forbade it and nobody relayed it for her.** That is
the clause 8/9 defect costing a real finding, and it cost the largest one available.

### 5.4 What The Fact-Checker has to do to re-run the gate

Written into the suite at **§13.2**, so it lives with the rows rather than in a deliverable nobody
opens. Four items, and the reading work is bounded:

1. **Re-score, do not re-read.** Her 30-source census already contains the data: the 16 she scored
   as failures are outcome `(c)`. Report three numbers; the row passes at `(b) = 0`.
2. **The authority column** — `api.crossref.org/works/<doi>` returning 200 with a matching title,
   else DataCite, else the publisher landing page, recorded per instance. **This is the only
   genuinely new work** and it is bounded by the size of `(c)`.
3. **Re-score the 8 resolver-URL rows** listed in §5.1 above.
4. **`PRV-15` cannot run until 2.5 lands**, because the repaired row refuses to pass vacuously and
   the `Licence` population does not exist until the merge writes `## Provenance` blocks. **Until
   then the correct verdict is UNRUN, and UNRUN is not green.** The instrument is ready:
   `node tools/audit_abstract_overlap.js literature/_pdf/<folder> 10`.

## 6. The four routed suite corrections — three applied, one superseded by a repair

| # | Correction as routed | Measured | Applied |
|---|---|---|---|
| 1 | `CRP-10`/`CRP-11` name **five** same-name disagreements; there are **eight** | **CONFIRMED to the byte.** Over the two source trees: **95 same-normalized-key pairs, 87 byte-identical, 8 differing** — and 87 + 8 is exactly the plan's `both-identical` 87 + `lsei-primary` 8. Deltas, intake minus lsei: `azami` −22,334, `csank-2022` −15,553, `poston-2020` +1,490, `473486main-iss-atcs-overview` **+86**, `bea-depreciation-rates` **+77**, `ieee-2022-paper-sh-tcs` **+42**, `falcon-heavy` +28, `barro-2004` −6. The three routed additions match to the byte. **None of the eight is a line-ending difference** — all survive CRLF normalization | **YES.** Both rows corrected to eight, the CRLF question answered for all eight rather than asserted of five, and a mutation added: run the census case-folded instead of under `normalize()` and it returns five, which is the number the row carried for two steps |
| 2 | `PDF-3` is marked `green` and was red on the measurement that made `PDF-2` red | **SUPERSEDED, and this is the one I will not apply as routed.** The correction was right when written. The Systems Engineer landed a **deliberately unanchored** carrier block at `.gitignore:43–52`, written as character classes (`*.[pP][dD][fF]`) rather than a `*.pdf`/`*.PDF` pair, because a pair covers two of the eight case permutations. `run_suite.js` now reports **8 of 8 `PDF-2` probes ignored** and **64 of 64 `PDF-3` carrier probes ignored** | **NO — and `PDF-2` moves RED to green instead.** `Q-PDF-IGNORE-OPEN` = 0. Declared explicitly for `SLT-4`, which forbids a silent greening: the close condition the cell already named was met by the named owner and the runner is the observation. The routed correction is recorded in the row rather than deleted, because a correction a repair overtook is still a correct reading of an earlier state |
| 3 | `PDF-14` cannot be run as written on a case-insensitive filesystem | **CONFIRMED by running it.** `echo a > x.pdf; echo b > x.PDF` leaves **one** file whose contents are `b`. `git config core.ignorecase` = `true`. A five-fixture tree holds four fixtures, the harness reports five, and the missing one is the case fixture — the exact case the character-class rule exists to cover | **YES.** The row now requires **one repository per fixture** and the harness to print the fixture count it actually created. `CON-2` already required isolation and `PDF-14` did not; they now agree |
| 4 | `PTH-13`'s live set omits `oracle/AMENDMENTS.tsv`, which carries four rows naming the dead path | **CONFIRMED: four rows** — `AM-75`, `AM-76`, `AM-77` and `AM-153`. A promoted register whose amendment rows target a path that does not exist is `MF-1`'s defect, one register over | **YES, and the fix is structural rather than a longer list.** My live set was enumerated by memory, which is why it could not see this. It is now **COMPUTED** — every tracked file outside `cr_scratch/` and the working copies — and run by `run_suite.js`. It reported **5** live files at my open and **3** at my close as The Systems Engineer worked: `lunar-oracle-gameplan.md`, `oracle/AMENDMENTS.tsv`, `oracle/NAMING.md` |

**`oracle/NAMING.md` cites the dead path in its own relocation banner** — *"This file was
`literature/NAMING.md`"* — and that is a judgement, not a defect: a relocated contract that does not
say where it came from is harder to follow, and `PTH-13` as written counts it. Routed to The Systems
Engineer, whose row it is, rather than decided by me.

## 7. `SLOT-B` filled — twelve `PUL` rows, written before the pull

§8.2, `PUL-1` to `PUL-12`, inside §8 so no section number moves and no cross-reference breaks. Same
split as `SLOT-A` for the same `SLT-8` reason: I write, The Engineer executes 2.11. This is `SLT-9`'s
case and the fill state says so — the artifact they assert against does not exist, all twelve are RED
with an owner and a close condition, and the runner reports them UNRUN rather than green.

Three rows carry the brief's named requirements: `PUL-1` every landed PDF has a summary; `PUL-2`
zero files from `_QUARANTINED_prior_art/`; `PUL-4` the byte ceiling. The other nine exist because
each closes a way the first three could pass without meaning anything:

- **`PUL-2` reports TWO figures on one line**: files landed from the quarantine (0) **and files the
  exclusion actually removed (0, reported as a no-op)**. The baseline measured that directory as 26
  files, all `.md`, zero PDFs — so a quarantine filter over a PDF pull removes nothing. A filter
  pointed at the wrong tree also lands zero quarantined files and also reports success. **A filter
  that silently does nothing is the Step 1 failure that produced a wrong verdict.**
- **`PUL-4` states the threshold in BYTES with its reading named** — `≤ 250,000,000 bytes (SI)`,
  against a known answer of **224,042,382 bytes** = 224.0 MB SI = **213.7 MiB**. The gap between the
  two readings of one number is 10 MB. `PDF-11`'s clause, which `SLOT-B` may not relax.
- **`PUL-5` is the row the brief's reasoning actually implies.** "Under the ceiling" is not the
  assertion. 249,000,000 bytes is under 250 MB and is **+11% over the estimate** — 25 MB of files
  nobody enumerated, landing green. The row compares to 224,042,382 and reports a signed delta,
  failing above +15%, because the estimate came from an enumerated 52-file set and the only way that
  set grows is the selection rule matching files nobody adjudicated.
- **`PUL-9` refuses a hard-coded T4.** Standing clause 7d, mechanized: the checker must contain no
  numeric T4 literal, asserted by grepping the pull script for a bare `22` or `52` adjacent to `T4`.
  **22 is not settled and 52 is an upper bound under a name-only rule.** Hard-code 22 and the check
  passes when the world disagrees with it, and the number acquires an authority nobody granted it by
  being asserted in a test.
- **`PUL-10`** — an empty orphan report says `orphans: 0` **with the population it searched**, never
  nothing. Same defect as `CON-8`'s empty stage and `PRV-15`'s empty label class: three rows, one
  shape, an empty list reading as a clean one.
- `PUL-3` set-not-count, `PUL-6` path shape, `PUL-7` zero tracked **after** the pull (`PDF-1`
  asserts it on an empty tree, where it cannot fail; `PUL-7` asserts it on the only day it can),
  `PUL-8` closed tier set, `PUL-11` hand queue enumerated by id, `PUL-12` re-runnable.

## 8. `CON-1`…`CON-9` reviewed against what he actually built — by running it

**I checked it rather than accepting his audit, and I ran every row I could rather than reading the
source.** The mechanism is good. Five rows are satisfied and observed, one exceeds its assertion,
one is partly satisfied, and two cannot be satisfied because the harness they name does not exist.

| Row | Verdict | Evidence |
|---|---|---|
| `CON-1` | **SATISFIED AND EXCEEDED** | Not a remembered measurement but a live probe: `CHK-37 ignore-probe` runs **25 probe paths** in four labelled classes and **reports its own set size** — `probe set size=25 open=0 (a SHRINKING probe set is the failure this reports its own size to prevent)`. He added case permutations (`x.PDF`, `x.Pdf`) I had not asked for, and separated `.txt`/`.zip` as extension-gate findings rather than ignore rules, which is the right call and is stated as a ruling |
| `CON-2` | **NOT SATISFIED** | `cr_scratch/fixtures/` **does not exist**. The five fixtures have never been run one at a time from a clean tree. This is the row `PDF-14`'s correction now depends on |
| `CON-3` | **NOT SATISFIED** | Depends on `CON-2`. No before/after tree hash exists because there is no fixture run to bracket |
| `CON-4` | **SATISFIED, degenerately, and the degeneracy is the right design** | `core.hooksPath` = `tools/githooks`, resolving to the tracked directory itself. The content comparison the row demands is then a tautology — there is no copy to drift. Worth saying out loud: the row was written against a design that copies hooks into `.git/hooks`, and he did not build that design |
| `CON-5` | **SATISFIED AND OBSERVED** | `git hook run pre-commit` prints `CHK-10 pre-commit dispatcher: dispatching CHK-01 …`, then `CHK-13`, then `CHK-37`, in row order, then `dispatched 3 of 7 jobs, all exit 0` **and names the four it did not dispatch as debts rather than passes**. That last line is not in my row and should be |
| `CON-6` | **SATISFIED AND OBSERVED** | Run for real, not read: `LUNAR_ORACLE_HOOK_DEPTH=1 node tools/githooks/pre-commit` → `REENTRANCY REFUSED at depth 2. Chain: pre-commit -> merge-gate -> pre-commit`, exit **1**. The depth and the chain are reported rather than absorbed. This is the `CHK-09` unbounded recursion I built and watched in Wave 1, and it is now bounded in the engine and shared with `merge-gate` |
| `CON-7` | **SATISFIED, structurally** | The guard lives in `dispatch.js` and is inherited by every trigger through the environment, so a check that shells out to any trigger re-enters at depth 1 and is refused. The assertion and its trigger are different processes by construction |
| `CON-8` | **PARTLY SATISFIED, and the missing half is the half I wrote the row for** | The empty-stage branch exists and is written exactly right — `files_scanned=0 -- SCANNED NOTHING.` followed by `this is not a clean result. Nothing was examined, so nothing is asserted.` **But the EXIT CODE is not on that line.** `CON-8` asks for both together *"so neither can be read without the other"*, and the exit code is still out of band. **And I could not observe the branch at all**: this working tree never has an empty stage — `files_scanned=3` on every invocation — so the path is unexercised here, which is precisely `CON-2`'s isolated-fixture problem showing up in a second row |
| `CON-9` | **SATISFIED — AND I RAN IT, BECAUSE NOBODY HAD** | A scratch clone at `$TEMP/w2-2_con9`, `core.hooksPath` set, a `%PDF` file named `x.md` staged, and a **real `git commit`**: `CHK-13 FINDING [MAGIC] x.md -- first bytes are %PDF, whatever the extension says`, `BLOCKED by CHK-13 … on_failure=block`, and `git log` reports **no commits**. End to end, from `git commit`, not from `node tools/check_no_sources.js`. The row that says the commit path is the only path that matters, run on the commit path |

**A live bootstrap defect found while running `CON-9`, and it is not in anyone's write set.** On the
first attempt the commit was blocked, but **for the wrong reason**: `CHK-01`
(`check_corpus_collisions.js`) exits **2** when `literature/` does not exist, and the dispatcher
correctly classifies exit 2 as `HARNESS FAILURE in CHK-01 … Fix the tool, not the commit`. `literature/`
is empty, so **git does not track it, so no fresh clone has it, so the first commit in any fresh
clone is blocked by a harness failure rather than by a finding.** The dispatcher's diagnosis is
exactly right and the tool is exactly wrong: an empty corpus root is a legitimate state and
`CHK-01` should report `walked 0 files` and exit 0, as it does the moment the directory exists.
Routed below.

## 9. The instruments made text, and the `--index` contract bug

### 9.1 Two instruments were binary to git, not one

Repaired by replacing each raw NUL with the escape `\0` inside the string literal. Identical
behaviour, identical key space, three bytes longer each.

```
BEFORE  tools/check_registers.js  a node script executable (binary data)   NULs at 7926 7953 8500
        tools/manifest.js         a node script executable (binary data)   NULs at 3361 3410 3426
AFTER   tools/check_registers.js  Node.js script executable, ASCII text
        tools/manifest.js         Node.js script executable, ASCII text
```

**Behaviour verified unchanged, not assumed.** `check_registers.js` still parses its `MF-3` marker
keys — `NOTE MF-3 census: 13 BEGIN markers under cr_scratch/`, `OK MF-3 every BEGIN marker … has a
manifest row` — and `manifest.js` still emits its rows and computes read-digests.

**The close condition is `git diff` rendering line-level, and here is the subtlety.** A diff of *this
very change* still prints `Binary files … differ`, because git compares against a pre-image that is
binary. That is not a failure; it is the last binary diff either file will ever produce. Proved with
`git diff --no-index` against a copy carrying a one-line addition:

```
2  1  tools/check_registers.js => a.js      @@ -332,3 +332,4 @@ … +// probe line
1  0  tools/manifest.js        => b.js      @@ -165,3 +165,4 @@ … +// probe line
```

Real add/delete counts, hunk headers, `+` lines. **Not the exit code, which was 0 throughout and
proves nothing about this.** The property that had failed is not "the script works"; it is "a human
can review a change to the script", and no assertion anywhere said so — which is `CNT-12`.

### 9.2 `--index` reported success and changed nothing

Confirmed: `node tools/quantities.js --index` prints the regenerated index to stdout, exits 0, and
`QUANTITIES.md`'s md5 is unchanged before and after. `COUNTING_RULE.md` §4 part 3 says to run exactly
that command "to regenerate `QUANTITIES.md`".

**Which side is wrong: the contract.** A flag that reads as *show me the index* must not mutate the
tree, and `--index`/`--index --write` is the right shape — a dry run and a write. Making `--index`
write by default would fix the sentence by breaking the tool.

**What I fixed inside my write set**, since the contract is not mine:

1. `--index` without `--write` now **says what it did**, on stderr, every time:
   `NOTE --index is the DRY RUN: 111 blocks printed to stdout, QUANTITIES.md UNCHANGED. The in-place
   regeneration is 'node tools/quantities.js --index --write'.` A command that changes nothing must
   say it changed nothing; following the contract verbatim now looks like what it is.
2. The banner the generator writes **into `QUANTITIES.md` itself** said
   `GENERATED by tools/quantities.js --index` — the wrong command, propagating into the artifact on
   every regeneration. Now `` `node tools/quantities.js --index --write` ``.
3. The usage header records the finding and the measurement.

This is a repair, not an addition: no new check row, quantity id or test. The one-line contract
correction is routed below, ready to paste.

## 10. Not mine

| # | Finding | Sub-step | Owner |
|---|---|---|---|
| 1 | **`COUNTING_RULE.md` §4 part 3 names a command that regenerates nothing.** Paste-ready: `3. Re-run `tools/quantities.js --index --write` to regenerate `QUANTITIES.md`. The bare `--index` is the DRY RUN: it prints to stdout, exits 0, and changes nothing.` Measured: `--index` leaves the md5 identical; another seat measured 11 failures → `--index` → 11 → `--index --write` → 9 | 2.19 / counting contract | **The Designer** (`COUNTING_RULE.md`) |
| 2 | **`MRG-4b`'s ruled form is unsatisfiable and I implemented the satisfiable one.** Byte-identity of the whole landed file contradicts `PRV-1`/`PRV-2`/`PRV-17`, which require an appended `## Provenance` block the sources do not carry — false for all 176 rows, not for one. I changed it to **body**-identity, which loses nothing the ruling wanted. **The text I changed is his and this needs ratification** | 2.4 | **The Manager** |
| 3 | **`MRG-4b` found two UNDECLARED body edits in the staged tree.** `falcon-heavy-wikipedia` +11/−1 — a `## Citation` block added **and the maiden-flight date changed 2026-02-06 → 2018-02-06** — and `rostami2018-figures` +11/−0. Both are probably correct; neither is declared. Declare them with a `basis` or revert them | 2.5 | **The Engineer**, with **The Space Resources Engineer** for the edits |
| 4 | **162 of 168 staged landings normalize line endings and trailing whitespace**, which nothing in the merge specification declares. It is almost certainly benign and it is undeclared, and `CRP-11` exists because this repository has already read a CRLF diff as a content disagreement once | 2.5 | **The Engineer** |
| 5 | **`MRG-1` and `MRG-2` still fail for the same reason as in Wave 1**: `merge_plan.tsv` declares its size and its disposition legend **in a comment**, and a comment is parsed by nothing. The 18-column split landed; the `^H` row did not | 2.5 | **The Engineer** |
| 6 | **`MRG-9`/`MRG-10`: 8 dedup-key collisions, up from 6 at my open.** Two new ones arrived with the column split: `L3\|lunar-surface-innovation-consortium\|2026\|lsic-newsletter-vol` and `L2B\|NASA/TP-20250010956`. All 8 are same-folder today, so `MRG-10` finds nothing `MRG-9` missed — **which is the two scopes agreeing at this placement, not `MRG-10` passing vacuously.** Two reviewers are cutting folder assignments; move one member of any of the 8 and `MRG-9` goes green while the corpus carries one source twice under one key | 2.5 / 2.16 | **The Engineer** |
| 7 | **`CON-2` and `CON-3` are undischarged: `cr_scratch/fixtures/` does not exist.** The five containment fixtures have never been run one at a time from a clean tree. `PDF-14`'s correction now depends on this, because on a case-insensitive filesystem a five-fixture tree holds four | 2.13 / 2.14 | **The Systems Engineer** |
| 8 | **`CON-8` is half-built.** The empty-stage branch is written exactly right but **the exit code is not on the line with the scanned count**, and `CON-8` asks for both together. Also unexercised here: this tree never has an empty stage (`files_scanned=3` always) | 2.14 | **The Systems Engineer** |
| 9 | **A FRESH CLONE CANNOT COMMIT.** `CHK-01` (`check_corpus_collisions.js`) exits **2** when `literature/` does not exist; `literature/` is empty so git does not track it; so no fresh clone has it, and the dispatcher blocks the first commit with `HARNESS FAILURE in CHK-01`. The dispatcher's classification is right; the tool is wrong. An empty corpus root is a legitimate state and `CHK-01` should report `walked 0 files` and exit 0. Found by running `CON-9` in a scratch clone | 2.14 / bootstrap | **The Systems Engineer** |
| 10 | **`oracle/NAMING.md` cites the dead path in its own relocation banner** and `PTH-13` counts it. A relocated contract that does not say where it came from is harder to follow. This is a judgement, not a defect, and it is his row | 2.20 | **The Systems Engineer** |
| 11 | **`oracle/AMENDMENTS.tsv` carries four rows targeting `literature/NAMING.md`** — `AM-75`, `AM-76`, `AM-77`, `AM-153`. A promoted register whose amendment rows target a path that does not exist is `MF-1`'s defect, one register over | 2.20 | **The Systems Engineer** |
| 12 | **The answering-loop suite has four RED rows with no owner or close condition in the cell** — `LIM-3`, `REF-19`, `FIX-9`, `FIX-10` — and a fourth status value `[4.1]` on 14 rows. `LIM-3`'s owner and close are in prose near the row, not in it. My runner scopes `MUT-6` to the corpus suite rather than inventing a contract for a file it only reads; the divergence is real and should be closed one way or the other | 1.11 | **mine, but not in this wave's write set** — routed rather than taken |
| 13 | **`CHK-18` NOW HAS ITS ARTIFACT AND STILL HAS NO DISPATCHER, AND THIS IS THE ONE THAT MATTERS.** `oracle/tests/run_suite.js` exists at the address `CHK-18` has reserved since 1.13. `CHK-18`'s triggers are `substep-gate,ci-linux`, and **there is no `substep-gate` dispatcher** — `tools/githooks/` holds `pre-commit`, `post-commit` and `merge-gate` and nothing else. So the runner is invoked by nobody. **A runner nothing invokes is one step better than a suite nothing invokes, and it is not the finish line.** `oracle/check_register.md` is his and I did not write a row; relay written | 1.13 / 2.14 | **The Systems Engineer** |
| 14 | **`CHK-18`'s row carries a stale figure.** It says "the 211 tests of the 1.11 v2 answering-loop suite"; the suite has declared **216** since the R-3 reconciliation, and `run_suite.js` counts 216. A check row that names a population by a number nobody re-counted is the `H`-row problem in the register itself | 1.13 | **The Systems Engineer** |

**Relays written this wave** (`cr_scratch/relay/`), both **REVIEW**, neither a BRIEF, and neither a
discharge of arm 2a — every seat named is already building:
`w2-2_review_to_systems_engineer.md` (items 7, 8, 9, 10, 11, 13) and
`w2-2_review_to_engineer.md` (items 3, 4, 5, 6).

## 11. Close state, re-measured with digests — and it moved under me for reasons that are not mine

| Instrument | At my open | At my close | Comparable? |
|---|---|---|---|
| `quantities.js --check` | 15 hard @ `4f017a7cfd297995` / 110 files | **5 hard** @ `0276a441b65b656e` / **293** files | **NO — different digest, and the file set nearly tripled.** The staged corpus landed under `cr_scratch/_stage/` during my sitting. 15 → 5 is **the fork collapse landing**, per standing clause 7a, not a regression and not mine. Read the failure lines: the 8 `M2` duplicate ids are gone, one new `M6` (`QUANTITIES.md` differs from the regenerated index) appeared, and that one is the collapse mid-flight |
| `check_registers.js` | 1 hard @ `bbaa4be015d4edd0` / 81 files — `FAIL MF-1 row literature/NAMING.md …` | **0 hard** @ `49c7474ac748b155` / **262** files | **NO.** `MF-1` was repaired by The Systems Engineer during my sitting, as clause 7b said it would be. **Exit code was 0 in both states**, which is why the exit code is not the close condition for anything |
| `run_suite.js` | did not exist | **405 rows: 14 pass, 5 fail, 386 unrun**, exit 1 | n/a |
| `literature/` | 0 files | **0 files** — staged at `cr_scratch/_stage/literature/` (168 `.md`), not promoted | held |
| suite row count | 175 | **189**, and the header, the per-group list, the `awk` command and the runner all agree | — |

**Standing clause 4, on myself: this deliverable is inside the declared file set.** Every digest
above was taken with this file present at whatever length it had reached, and the open and close
censuses are two different measurements of two different sets. I am reporting both rather than
picking one.

**And the Cycle A process finding did not recur to me this time.** It did not need to: the runner
reports per-row failures with the row id, so a count that moves is decomposed automatically rather
than by discipline. That is the remedy applied to the tool instead of to the person, which is where
it belongs.

## 12. The five standing failures the runner reports, and why none is closed here

`PTH-13` (3 live citations, his), `MRG-1` and `MRG-2` (declaration in a comment, his), `MRG-9` and
`MRG-10` (8 dedup-key collisions, his). **All five are in artifacts I do not write**, all five are
routed in §10, and none is silenced. A runner whose first act was to turn its own failures green
would be the thing this wave exists to stop.


## 13. THE CORPUS LANDED DURING MY FINAL VERIFICATION PASS, AND THE RUNNER GATED IT

Between the close measurement in §11 and the last command of this sitting, The Engineer promoted the
stage. **`literature/` holds 168 `.md` files.** It was empty at my open and it has been empty for
the whole of Step 2. That is the prize, and it is not mine — but three things about it are, and they
are the reason the runner exists.

**1. Two assertions stopped being vacuous, and the runner said so on its own.** `CRP-4` and `CRP-5`
went from `UNRUN — VACUOUS: literature/ holds 0 .md files` to **PASS over 168 files**: zero
within-folder and zero tree-wide normalized-key collisions on the real corpus. Nobody edited the
runner to make that happen. The verdict changed because the population did, which is the whole
argument for reporting VACUOUS instead of green: had those two rows read green while the tree was
empty, today's real result would have been indistinguishable from six weeks of nothing.

**2. `MRG-4b` re-fired against the promoted tree with the identical finding.**

```
FAIL MRG-4b  168 landed under literature/; 166 bodies identical to byte_source
             (162 of them after line-ending normalization only); 1 declared exception;
             2 UNDECLARED: falcon-heavy-wikipedia.md, rostami2018-figures.md
```

Same two rows, same counts, now in the promoted corpus rather than in a stage. **`falcon-heavy-wikipedia`
in `literature/` carries a maiden-flight date that no assertion authorised anyone to change.** It is
the right date. It is still undeclared, and it is now shipped rather than staged. `## Not mine` item 3
is now a live corpus defect rather than a staging one.

**3. Six standing failures, none of them mine, all named by row id, and the exit code is 1.** That
is the runner doing the job the wave gave it: `literature/` is no longer empty, and the first thing
that happened when it filled was that an instrument read it and reported what is wrong with it, by
name, in one command. A suite nothing invokes could not have done that, and for eleven sub-steps
that is what we had.

**The close-state figures in §11 are therefore superseded by one measurement and I am leaving both.**
`literature/` = 0 files at §11 and 168 files here, an hour apart, and the two are not the same
repository. Standing clause 4 says a census written at the start of a sitting and quoted at the end
is two different measurements; this is that, at the largest scale it will occur in this project.

apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +14/-0
