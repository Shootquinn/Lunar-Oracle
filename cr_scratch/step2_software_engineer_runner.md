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
