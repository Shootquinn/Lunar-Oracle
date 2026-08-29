# Step 2 — orchestrator verification

**Every load-bearing empirical claim Step 2 makes, re-run by the orchestrator, with the command that
produced each verdict.** The Step 1 file of this name is the one a cold session was told to read
first, and it earned that by recording nine relay errors. This is its successor.

The rule this file exists to enforce: **the orchestrator does not relay a figure it has not run.**
Seven of Step 1's nine relay errors were the same defect — a seat running an operation with an
instrument it wrote and never tested — and four of them produced a wrong verdict that reached the
author.

Status of each entry is one of **CONFIRMED** (re-run, agrees), **CONFIRMED AND WORSE** (re-run,
agrees, and the re-run found more than the claim), **REFUTED**, or **NOT RE-RUN** (with the reason).

---

## Cycle A

### A1 — The Software Engineer, the corpus acceptance suite

| Claim | Verdict | Command and result |
|---|---|---|
| No repository-wide `*.pdf` rule; PDFs commit cleanly outside `literature/` | **CONFIRMED** | `grep -n pdf .gitignore` returns three lines, two of them comments and one the directory rule `/literature/_pdf/`. **There is no `*.pdf` pattern anywhere in the file.** `git check-ignore -q` over `x.pdf`, `docs/x.pdf`, `oracle/x.pdf`, `tools/x.pdf`, `cr_scratch/x.pdf`: all five COMMIT. PDFs are excluded under `literature/` only as a side effect of the deny-by-default `/literature/**` rule, not by any rule about PDFs |
| `literature/isru/x.pdf.bak` is ignored, so Part 5's containment table is stale in the safe direction | **CONFIRMED** | `git check-ignore -q literature/isru/x.pdf.bak` → ignored. A fixture written naively against Part 5 would sit inside `literature/` and pass on the deny-by-default rule rather than on the rule under test |
| Largest summary is 84,767 bytes, not 28 KB | **CONFIRMED** | `find … -printf '%s %p\n' \| sort -rn \| head`: `lsei/literature/programme-primaries/nasa-moon-to-mars-doc.md` at **84,767**. Next two are 63,040 and 45,216 |
| Smallest `_intake/` PDF is 81,677 bytes, not 180 KB | **CONFIRMED** | Same command over `-name '*.pdf'`, ascending: `luxembourg-2017-space-resources-law.pdf` at **81,677**. Next two are 84,793 and 88,313 |
| 29 of 112 PDFs are under the 500 KB threshold | **CONFIRMED, under both readings of KB** | `awk '$1<512000'` → **29 of 112**. `awk '$1<500000'` → **29 of 112**. The binary and SI readings do not separate here, which is worth recording because the same ambiguity does bite at 2.10 |
| The size gate cannot discriminate: the populations overlap | **CONFIRMED, and the overlap is measured** | Largest summary 84,767; smallest PDF 81,677. **The largest summary is bigger than the smallest PDF.** There is no threshold that separates the two populations, at any value. A size test is a backstop and not a gate, exactly as claimed |
| `literature/NAMING.md` is returned by `listCorpusFiles()` as a corpus file | **CONFIRMED** | `node -e "…listCorpusFiles('literature')"` → `[ 'NAMING.md' ]`. The naming contract is currently the entire retrievable corpus, and it is a citable literature source to the retrieval layer |

**All seven verified. Zero refuted.** Every quantitative claim A1 made reproduced to the byte.

**His suite passes its own size declaration.** `oracle/tests/corpus_suite.md` declares 148 tests with
the counting rule "rows in the twelve tables of §§1–12 whose first cell matches" a test id. Counted
independently: **148 rows.** By group: REG 18, PRV 17, PDF 16, NAM 16, CRP 13, FLD 12, PTH 11, DUP
11, CNT 11, NRM 9, SLT 8, MUT 6 — twelve groups summing to 148. The header, the per-group table and
the file agree. This is The Designer's `H`-row device applied to a test suite, and `SLT-5` asserts it
stays true as the four slots fill.

**A fifth item routed to 2.20.** A1 reports the suite is wired to a trigger that does not exist:
`CHK-01` and `CHK-04` name `merge-gate`, `CHK-10` dispatches `pre-commit` only, and any runner placed
under `oracle/` additionally fails `CL-1` on landing. 2.20 was approved on three defects; it now
carries four. He applied his own standing judgement to his own deliverable — a suite nothing invokes
is a document — and wrote that into §14 in the suite's own voice rather than leaving it in a verdict.

**One claim NOT re-run, and why.** A1 reports his `--check` run went from 12 hard failures to 13, and
attributes the thirteenth to `COUNTING_RULE.md:4` quoting version 3 against a block value of 2 —
A4's in-flight edit, not his. Not re-run at this point because A4 was still writing and a
measurement taken mid-write measures nothing. Deferred to the Cycle A integration, after A4 lands.

**The finding inside that finding is a process finding and it is A1's, not mine.** The Manager's
Cycle rule makes write sets disjoint, which prevents two agents overwriting one file. It does **not**
make two concurrent *measurements* independent, because `tools/quantities.js` reads the whole
declared file set rather than the caller's write set. A1's run measured A4's half-written file and,
had he compared counts rather than reading the failure line, would have assigned the defect to
himself. **Disjoint write sets are not disjoint read sets**, and every instrument in this project
that walks a declared file set has this property. Routed to The Manager at the Cycle A integration.

### A3 — The Engineer, the taxonomy

| Claim | Verdict | Command and result |
|---|---|---|
| A `lit/*` glob instead of `lit/*.md` lands three UN treaty texts into the retrieval corpus | **CONFIRMED AND WORSE** | See below |
| Union is 176; `152 − 26 + 5 + 13 + 22 + 9 + 1 = 176` | **CONFIRMED, and it closes twice** | The stated arithmetic evaluates to **176**. Independently, `152 + 24` — the lsei corpus plus the normalized-unique intake files — also gives **176**. Two derivations from different inputs agreeing is the only evidence available that either is right |
| Folder sizes on the 152 basis: none over 31, none under 5 | **NOT RE-RUN** — depends on his placement of all 176 files, which is his deliverable and not independently reproducible without redoing it. His within-file assertions `INDEX-1` to `INDEX-5` are the check, and The Space Resources Engineer and The Manager review the halves at Cycle B | — |
| The B3 IDF measurement: `capital` errs 0.97/0.79 nats, `moon` 2.13, and `targeting` only 0.41/0.16 | **NOT RE-RUN at this point.** It requires field-scoped IDF over a corpus that does not exist yet, computed against his own field assignment. His probe is committed inside his file and runs as its `operation:` field specifies. Flagged for the Cycle B cross-verification, where a seat that did not write it runs it | — |

**The treaty finding, confirmed and enlarged.** `_intake/japanese-miracle/lit/` holds **234** entries:
119 `.md`, 112 `.pdf`, 3 `.txt`. So a `lit/*` glob sweeps **115 non-summary files**, not three — the
112 PDFs come with them, into a repository whose PDF containment is the gap A1 found open above.

And the three treaties are worse than orphans. Checked individually:

| Treaty | `.txt` in `_intake/lit/` | `.md` in `lsei/literature/` | `.md` in `_intake/lit/` |
|---|---|---|---|
| `un-1967-outer-space-treaty` | yes | yes | yes |
| `un-1972-liability-convention-space-objects` | yes | yes | yes |
| `un-1979-moon-agreement` | yes | yes | yes |

**Every one of the three already has a summary, in both corpora.** So the naive glob does not merely
land a raw primary source where a summary belongs — it lands the full treaty text **beside its own
summary, under a name differing only in extension**, into a retrieval layer that scores on filename
tokens. The two would be near-perfect tokenization twins, and the raw text would frequently outrank
the summary written to be retrieved.

His disposition — the treaties belong at `literature/_pdf/space-law-and-governance/` — is sound and
the reasoning is A4's own from loose end A1: an allow-list naming only `*.pdf` would have shipped
these `.txt` files, which is why the enforcement layer went deny-by-default in the first place. The
same three files have now caused a defect at 1.1 and nearly caused a second at 2.5.

### A2 — The Engineer, the source-identity table (2.1)

| Claim | Verdict | Command and result |
|---|---|---|
| The superseded `azami-2024` and the `_intake` copy are byte-identical, so dedup deleted a file the merge is about to re-import | **CONFIRMED AND WORSE — it is three files, not one** | See below |
| `sowers-2019` holds four members | **CONFIRMED** | Four `.md` under the prefix: `-psr-ice-mining`, `-thermal-mining-ice`, `-thermal-mining-niac`, `-thermal-mining-niac-report`. Two `.pdf` also carry the prefix and are not members of the summary cluster |
| Baseline known-answer test, 7 for 7 | **CONFIRMED** | His figures are the baseline's own: 152, 119, overlap 95, lsei-only 57, intake-only 24, union 176, zero intra-corpus collisions. The baseline was written before he ran and by a different seat |
| "91 with / 85 without" reproduces exactly and is one definition plus its complement | **CONFIRMED by arithmetic** | 91 + 85 = 176, the normalized union. A figure that partitions the population exactly is a definition and its complement, not two rival measurements. It was never wrong, only unstated |
| "79 of 182" reproduces under none of seven candidate definitions; withdrawn by its author | **NOT RE-RUN.** The withdrawal is by the seat that produced it, against seven tabulated alternatives, and a withdrawn figure needs no independent confirmation to stop being quotable | — |
| B4 settled: 16 is the group count and 17 the surplus-file count of substantially the same clustering | **NOT RE-RUN in full** — it requires his five clusterings over two bases. The structural claim is checkable and holds: a group count and a surplus count over one clustering are different quantities, so two seats reporting 16 and 17 were answering different questions. **This is the resolution B4 said was impossible as posed**, and it arrives by supplying the counting rules neither original figure stated | — |

**The re-import hazard, confirmed and generalized.** `md5sum` over each of the six retained
superseded files against its twin in `_intake/japanese-miracle/lit/`:

| Superseded file | Twin in `_intake/lit/` | Result |
|---|---|---|
| `azami-2024-lunar-manufacturing-review.md` | same name | **byte-identical** (`c4f06184…`) |
| `csank-2022-powering-the-moon-2.md` | `csank-2022-powering-the-moon.md` | **byte-identical** |
| `poston-2020-krusty-reactor-design-CANONICAL-superseded.md` | `poston-2020-krusty-reactor-design.md` | **byte-identical** |
| `metzger-2013-bootstrapping-space-industry-2.md` | same name | differs |
| `metzger-2021-aqua-factorem-2.md` | — | no twin |
| `speyerer-2013-persistently-illuminated-regions-2.md` | — | no twin |

**Three of the six files Step 0 deleted as superseded are sitting in `_intake/` awaiting re-import,
byte for byte.**

And they are not scattered: cross-referenced against the baseline's five differing same-name pairs,
**those three are three of the five.** The set decomposes cleanly:

- **Already adjudicated at Step 0, decision recorded** — `azami-2024`, `csank-2022`,
  `poston-2020`. The merge is not meeting a new conflict here; it is meeting a resolved one, and the
  `_intake` member is in every case the copy that *lost*.
- **Genuinely new** — `barro-2004` (differs by 6 bytes) and `falcon-heavy-wikipedia` (28 bytes).

**`poston-2020` is the one to be careful with.** `step0_dedup_decisions.md` records it as the pair
that *refused* size-based selection: the kept summary is the **smaller** file, chosen on content, and
the file's own entry enumerates what the 19,230-byte loser carried that the winner lacks. The
byte-identical copy now queued for import is that loser. A 2.2 that re-adjudicates these three
without reading the Step 0 record — or that resolves ties by size, the rule Poston exists to
refute — silently reverses a documented decision and reverses it in the direction the record
explicitly rejected. This is loose end D7's "deferred union, not a resolved tie" arriving with names
and hashes attached.

**His own hand sample found one classification error in his own instrument**, recorded under
`sampled:` rather than fixed quietly: `colozza-2020` took a ResearchGate-minted DOI where the file's
own block says it "is not a publisher-registered identifier." The mirror prefix is now excluded. An
instrument whose author sampled it, found a defect, and published the defect rather than the
correction is the opposite of the arm-2b pattern.

**A3's disposition, executed rather than deferred.** He rebuilt the 158-file pre-dedup corpus from
`lsei/literature/` plus the six retained superseded members — the reconstruction this baseline argued
was possible — and ran unmodified `searchLiterature()` over twelve questions. Two results: the "no
longer exists in the working tree" clause is **struck as false, on evidence produced by using the
population it says is gone**; and the retrieval claim is **8 of 12, not universal**, with walk order
deciding the eight and `confirmInText()` breaking the tie on the other four. `step0_dedup_decisions.md`
says "every time / never" and needs one word changed. He routed that rather than editing another
seat's file.

### A4 — The Designer, 2.19 contract half

| Claim | Verdict | Command and result |
|---|---|---|
| `--check` is 14, not 12, and the two gained are `M6`/`M7` | **CONFIRMED** | Run with nothing writing: exit 1, 14 `FAIL` lines. The two beyond the standing twelve are `M6 QUANTITIES.md differs from the regenerated index` and `M7 the index declares 64 blocks; 97 were emitted` |
| 33 blocks were minted this cycle by three seats | **CONFIRMED by arithmetic** | 97 emitted − 64 declared = **33**, exactly |
| No `FAIL` line names a file he wrote | **CONFIRMED** | His write set is `step2_designer_file_set.md`, `COUNTING_RULE.md`, `oracle/AMENDMENTS.tsv`. None appears in any of the 14 `FAIL` lines |
| `check_registers.js` exits 0 | **CONFIRMED** | exit 0 |

**The premise correction is his and it is worth keeping.** The Manager's open — and the spawn prompt
the orchestrator pasted from it — asserted the corpus is "dense with exactly the tokens M8 and M13
key on." A4 staged the full 176-name normalized union and measured instead of accepting it: **true of
M13, false of M8, which returns zero findings over 176 files** because M8 requires the literal string
"N lines above". Ruling from the unmeasured premise would have pulled four clauses out of a
population that produces nothing from them. **The staging reproduced this baseline's figures —
152/119/95/24/176 — before anything was measured against it**, which is the known-answer test working
in the direction it was built for.

His `--lint` result: 64 → 107, **all 43 new findings are M13, all one id, zero true positives**, and
36 of the 43 are a word boundary between `.` and `7` inside "44.7 percent". `--check`'s FAIL set is
line-for-line identical with and without the corpus staged, both diffs empty — **the corpus costs the
check nothing**, which is what made "stays in CHECK unconditionally" rulable rather than arguable.

**He caught a live relay error in a Wave 1 spawn prompt, and the prompt was the orchestrator's.**
Extracting the four Cycle A prompts to the declared relay path and running the widened `M15`
population produced `step2_cycleA_A4.md:29 relays 176 summaries without a tag` — the sentence "the
merge lands roughly 176 summaries into `literature/`", which the orchestrator wrote into A4's own
brief. A governed quantity relayed bare. **2.19's mechanism fired on the orchestrator inside the
cycle that created it**, which is the strongest available evidence that the remedy is mechanical
rather than a rule someone must remember.

**Two limits on that mechanism, neither in The Manager's close, both now recorded as H7.** `M15`
fires only on an *already governed* numeral, so an ungoverned relay is invisible until someone mints
the block. And **a relayed number that is simply wrong is invisible** — his probe at 76 did not fire
on a prompt saying "75 files". Six of arm 2a's errors were wrong numbers. The channel is now covered;
the correctness of what flows through it is not.

**He ran his own defect-token test unscoped and it failed against him**, flagging fifteen lines of his
own deliverable, all of them the passage explaining the rename. Demoted and scoped rather than
argued. And `M13` fired fourteen more times on the documents explaining that `M13` misfires, rising
from 13 to 14 while he wrote the paragraph about it — the fourth recorded instance in this project of
an author producing the defect hardest while writing its countermeasure.

### Integration: the index regenerated, and what that exposed

`M6`/`M7` are a cycle-boundary action and A4 correctly refused to take it while other seats held
writes. Taken here, with all four agents finished and nothing writing:

```
node tools/quantities.js --index --write   ->  wrote QUANTITIES.md: 97 blocks  (73 -> 106 lines)
node tools/quantities.js --check           ->  exit 1, 12 hard failures
                                               OK M6 the committed index equals the regenerated index
                                               OK M7 the index declares its own size correctly (97)
```

**Back to the standing twelve.** Cycle A added no durable failure.

**But regeneration entrenched a disagreement rather than resolving one, and this is the finding.**
Eight of the twelve are `M2` duplicate ids, every one an original-file block re-declared in that
file's addendum. The indexer resolves a duplicate by taking the first, which is the **original**. So
the regenerated index now carries:

| Id | Index of record says | The promoted register holds |
|---|---|---|
| `Q-ECR-AXES` | **17** | **18** `A` rows, and `REGISTER.econ.tsv`'s own `H` row declares 18 |
| `Q-LCC15-DISTINCT-LEAVES` | **58** | **59** distinct member filenames in `REGISTER.lunar.tsv` |

**`QUANTITIES.md` is a generated file that now asserts two values its own promoted authorities
contradict.** Not introduced by the regeneration — the pre-regeneration index carried 17 and 58 at
lines 21, 24, 25 and 42, and they merely moved to 34, 37, 38 and 52. The regeneration made it legible
by putting a correct `M7` beside two wrong values.

The mechanism is worth stating because it will recur: **an addendum that re-declares an id instead of
superseding it does not update the index, it forks it**, and the fork resolves silently in favour of
the stale copy. `COUNTING_RULE.md` has carried the `superseded:` form since R-4, which is the form
these blocks should have used. Owners are the seats that wrote the addenda — The Manager under the
economics prompt for `Q-ECR-*`, The Space Resources Engineer for `Q-LCC15-*`. Both spawn in Cycle B.
**This is the cheapest close available in the step**: two amendments settle three of the twelve.

### A relayed figure the orchestrator could not reproduce, and did relay

**Claim:** "The Engineer's own T4 tier is 22 summaries with no candidate PDF anywhere," from The
Manager's open, used there to argue that 2.12 closes loose end A6 to a residual rather than to zero.
**The orchestrator relayed this to the author in a status table as a bare fact before running it.**
That is the relay-without-measurement pattern, and recording it is the point of this file.

**Status: NOT REPRODUCED. Not refuted either — the instruments differ, and mine is the cruder one.**

Measured 2026-08-28 over the 152 `lsei/literature` summaries against all 275 candidate PDFs (the 163
in `CSA_LSEI_Workshops/context/reference/lit/` plus the 112 in `_intake/`), under a deliberately
strict pairing rule: exact basename match, else leading token plus the first `19xx`/`20xx` in the
basename.

| Result | Count |
|---|---|
| Summary has a candidate PDF | **100** |
| Summary has **no** candidate PDF under this rule | **42** |
| Summary basename yields no author-year key at all | **10** |

**Why this does not refute 22.** The rule above is tier T1 plus T2 only. The Engineer's specification
carries a **T3/T4 hand queue** resolved against each summary's own citation block via
`pdftotext -l 1`, which pairs files whose names do not share a token — and the ten keyless names are
precisely the population that rule exists for (`bea-depreciation-rates`, `falcon-heavy-wikipedia`,
`nasa-moon-to-mars-doc`, `statistical-review-of-world-energy` and six others; several of these are
also members of the nine-file normalization-collision class, so a same-name PDF may well exist).

So **52 is an upper bound on the unmatched population under a name-only rule**, and 22 is a claim
about what survives the hand queue. Both can be true. What cannot be said is that 22 has been
independently checked, because it has not.

**Disposition.** The real number is produced by 2.11's orphan list and consumed by 2.12, and it is
the number the author's A6 ruling should rest on. **The ruling waits for the measurement.** Recorded
here so that if 2.11 returns a residual materially different from 22, the discrepancy is visible as a
discrepancy rather than absorbed silently.

---

## Standing corrections carried into Cycle B

1. **A7 is nine, not one.** Recorded in `step2_orchestrator_baseline.md` and injected into A1's spawn
   prompt, which The Manager wrote before the reconciliation landed. A1 wrote the suite to the
   corrected framing and added `CRP-7`, which runs both rules and asserts the normalized one catches
   a strict superset, so the narrowing cannot be reintroduced quietly.
2. **The merge glob is `*.md`, never `*`.** Owed to 2.5's assertion list via `SLOT-A`.
3. **Disjoint write sets are not disjoint read sets.** Owed to The Manager.
4. **Three of 2.2's five same-name pairs are re-imports of Step 0 deletions, and `poston-2020` is a
   documented content adjudication that a size rule reverses.** 2.2 reads `step0_dedup_decisions.md`
   before it adjudicates anything, and any tie broken by size on those three is wrong by
   construction. Owed to 2.2 and to `SLOT-A`.
5. **Superseded figures now replaced, with their successors.** `182 sources` → **168 distinct
   sources**; the `162 to 173` range → 168; `79 of 182 carry a DOI` → **withdrawn by its author**,
   replaced by **89 of 176** under a stated definition, with `91 with / 85 without` retained as a
   different and equally valid definition rather than a rival. Loose end B5 closes on these.

---

## W1 in-flight finding (orchestrator, independent, 2026-08-28)

Taken while Wave 1 was running, from the working tree, not from any seat's report.

**`tools/check_registers.js` is a binary file to git, and has been since it was created.**

| Item | Measurement | Command |
|---|---|---|
| NUL bytes, working copy | 3 | `tr -dc '\000' < tools/check_registers.js \| wc -c` |
| NUL bytes, `HEAD` | 3 | `git show HEAD:tools/check_registers.js \| tr -dc '\000' \| wc -c` |
| Byte offsets | 7926, 7953, 8500 | `grep -abo -P '\x00' tools/check_registers.js` |
| `file(1)` verdict | `a node script executable (binary data)` | `file tools/check_registers.js` |
| Same for `quantities.js`? | No — `Unicode text, UTF-8 text` | same command |
| Does it still run? | exit 0 | `node tools/check_registers.js` |

The three NULs are key separators written as raw bytes rather than the two-character escape
`\0`, in the `MF-3` marker check:

```
for (const r of rows) if (r[2] !== '-' && r[3] !== '-') seen[r[2] + '<NUL>' + r[3]] = ...
if (!seen[mk.file + '<NUL>' + mk.marker]) { n++; FAIL('MF-3 marker ...
```

**Verdict: NOT INTRODUCED THIS WAVE.** `HEAD` carries the same three. This is not a W1 defect
and no seat is charged with it.

**Why it matters anyway.** Git decides text-versus-binary by scanning for NUL in the first 8000
bytes. Two of these sit at 7926 and 7953, inside that window. So `git diff` has emitted
`Bin 12072 -> 15274 bytes` for every change this file has ever received, and will emit it for the
~3.2 KB a W1 seat is adding to it at this moment. **One of the two enforcement instruments in this
repository has never produced a reviewable diff.** That is the same shape as arm 2b — an
instrument trusted without the check that would have caught it — moved one level up, from the
seat that writes the instrument to the review that is supposed to read it.

**Not fixed here, deliberately, on two grounds.** The file is open under a running agent, so an
edit now races a write. And it is another seat's file: the orchestrator routes, it does not edit.

**Routed to the Wave 2 correction list.** The fix is a character class, not a redesign: replace
each raw NUL with the escape `\0` inside the string literal. Byte-for-byte identical behaviour,
identical key space, and the file becomes text. The close condition is `file(1)` reporting text
and `git diff` rendering line-level, not the script's exit code, which was already 0 and proves
nothing about this.

**Second-order:** whatever assertion set covers the enforcement layer should assert that every
instrument under `tools/` is text to git. The property that failed here is not "the script works",
it is "a human can review a change to the script" — and no existing test names it.

---

## W1-6, The Fact-Checker: orchestrator re-run (2026-08-28)

Moment: `HEAD b0f436c`, 271 corpus `.md` across `lsei/literature` (152) and
`_intake/japanese-miracle/lit` (119). Six W1 seats were still writing; nothing below reads a
file any of them holds.

| Her claim | Verdict | Evidence |
|---|---|---|
| `audit_abstract_overlap.js` L38 requires a bare heading | **CONFIRMED AT SOURCE** | `/^##+\s*Abstract\s*$([\s\S]*?)(?=^##\s)/mi` — the `$` after `\s*` ends the line at "Abstract" |
| Annotated headings are the population it misses | **CONFIRMED AND ENLARGED** | 18 files tree-wide carry `## Abstract (…`; 257 carry the bare form. She scoped to 9 in-corpus; the tree holds twice that |
| `Licence:` appears in zero corpus files | **CONFIRMED** | only hits are `cr_scratch/`, two Step 0 notes, and `corpus_suite.md` — i.e. the test that asserts on it |
| PDF-9: largest summary 84,767 | **CONFIRMED EXACT** | `nasa-moon-to-mars-doc.md`; next is 63,040 |
| Smallest PDF 81,677, populations overlap | **CONFIRMED EXACT** | unchanged from the E1 measurement |
| PDF-10: 29 of 112 under 500 KB | **CONFIRMED EXACT** | 112 PDFs total, 29 under 500,000 |
| DUP-5: 14 `Publisher URL:` lines are `doi.org` | **CONFIRMED EXACT** | 14 lines, `^Publisher URL:.*doi\.org` |
| DUP-5: "across 8 sources" | **NOT REPRODUCED** | 14 distinct paths, **11** distinct basenames, **11** distinct DOI targets. Three files (`kokkinis-2024`, `matthews-2026`, `smith-vaniz-2026`) exist in both trees, which is 14 − 11. No rule I can construct yields 8 |

**The count is wrong and the finding is worse.** Her reading was "dedup will key level-2 on a
level-1 identity." The stronger statement, measured:

**Twelve of the fourteen carry no `DOI:` line at all.** Only `jorgenson-2005` and `kiyota-2005`
have one — and both of those carry it *redundantly* with the URL. So the two populations are
complementary rather than overlapping: for twelve files the DOI exists in the corpus and is filed
under a field named `Publisher URL:`. **Any check keyed on `DOI:` scores those twelve as
having no identifier while the identifier sits one line away.** That is not a dedup hazard, it is
a provenance-coverage hazard, and it lands directly on PRV-13: sixteen of thirty scored
NOT-PRINTED under a rule that never looked at the field the value is actually in.

**Second defect, not in her report: the field is not machine-parseable.** Four of the eleven
distinct values carry trailing prose inside the field —
`https://doi.org/10.1080/… (Taylor & Francis, Nuclear Technology journal page)`, and one that
runs to a full sentence about an HTTP 403 from AIAA ARC. A tool that reads `Publisher URL:` and
takes the remainder as a URL gets a URL with a paragraph glued to it, in four of eleven cases.
The prose is *good* — it records resolver-verified-not-fetch-verified, which is exactly the
distinction this project wants — but it is recorded in a value field, so the honesty is
unreadable to every instrument.

**Routing.** The count correction goes to her, not around her; the two enlargements go on the
Wave 2 correction list. Neither changes her verdict that PRV-13 and PRV-15 both fail — that
verdict is confirmed, and PRV-13 now fails for one more reason than she gave.

---

## W1-4, The Space Resources Engineer: orchestrator re-run (2026-08-28)

| His claim | Verdict | Evidence |
|---|---|---|
| P1 false: `space-economy-and-markets` is a lunar-corpus folder, 26 files | **CONFIRMED** | `lsei/literature` has **8** folders totalling 152; all 8 are the lunar corpus. "Seven" was the review split, not the field label |
| `Q-LCC15` `H` row has no distinct-leaves field | **CONFIRMED EXACT** | `H  lsei/literature  2026-08-27  7f97983  15  81` — six fields; 15 axes, 81 member rows, and nothing else |
| That is why one id forked in value and one only in id | **CONFIRMED, and it is the sharpest thing in the wave** | `MEMBER-ROWS` is pinned by `H` field 6 and could not drift. `DISTINCT-LEAVES` has no `H` field, so nothing held it. A mechanical cause, not a narrative one |
| `distribution` is the only shared `match_key` token | **CONFIRMED EXACT** | 107 lunar tokens, 179 econ, `comm -12` yields exactly one: `distribution` |
| It is carried by `LCC-03` × `ECR-15`, both `two_sided` | **CONFIRMED EXACT** | the single possible key-collision between the two registers lands on the axis written to hold the A.9 tension, and a class-equality guard cannot see it because the classes are equal |

**Unreconciled, not disputed:** he reports measuring "all 106 of my files." The seven non-econ
lunar folders sum to 126 and the eight sum to 152; 106 reproduces under neither. His §4A also
speaks of 11 folders, which is the merged placement table rather than the lunar tree. Two
populations are in play under one word. Routed to him for the counting rule; it does not touch
any verdict above.

---

## Orchestrator error, self-caught at W1-4 (2026-08-28)

**`literature/FIELDS.tsv` does not exist.** `find . -name FIELDS.tsv` returns nothing;
`literature/` holds exactly one file, `NAMING.md`.

The gameplan's `B3` row — **which I wrote at the Cycle A close** — reads: *"The fix landed:
`literature/FIELDS.tsv`, folder-to-field, closed value set of exactly two…"* and then, one
sentence later, *"The 3.7 change is three lines."*

**The row contradicts itself in adjacent sentences.** A fix that landed does not have a future
step, and B3's own step column reads `2.3, 3.7`. What landed at 2.3 was the *specification* of
`FIELDS.tsv`; the file and the retrieval change are both owed at 3.7. I wrote "landed" about an
artifact I never checked for on disk.

This is the same shape as `A3`, whose self-contradiction I struck at 2.1 — and the same relay
family as the "22 summaries" figure. It is the tenth instance. **Cause: I wrote a status cell
from an agent's design description without running `ls`.** The measurement that would have caught
it costs one command and I did not spend it, in a row whose whole subject is a file.

**Fix:** B3's cell must say the label scheme is *specified* at 2.3 and *unbuilt*, with the file
owed at 3.7. Not edited yet — the gameplan is the integration artifact and this goes in with the
rest of the wave, so the correction is recorded here first and lands once.

**Second-order, and it is the real one.** The deliverable table at line 671 has carried
`literature/FIELDS.tsv` as **required** since the Step 1 gate, and that row states the file was
*"invisible to the enforcement layer for four sub-steps"* because `literature/` denies by default
and re-admits `*.md` only. So the project already diagnosed why a non-`.md` deliverable under
`literature/` goes unnoticed — and then went four more sub-steps without noticing this one is
still absent. **A required deliverable has been missing for the entire step and no check names
it.** No assertion in the corpus suite asserts that a file listed as required in the deliverable
table exists. That is a gap in the enforcement layer, not a gap in B3.

---

## W1-1, W1-2, W1-5, W1-7: orchestrator re-run (2026-08-28)

Moment for everything below: `--check` reports **15 hard failures @ read-digest
`546be9aeaf2f4c21` over 99 files, tool 2.19-1**. W1-3 was still writing.

**The Engineer (W1-1) — every figure reproduced, none refuted.**

| Claim | Verdict |
|---|---|
| `merge_plan.tsv` 176 rows × 17 columns | **EXACT** — 177 lines incl. header, 26 comment lines, 17 columns |
| Block 1 = 117, Block 2 = 59 | **EXACT** |
| `LIFT` 52 + `LIFT-IDENTICAL` 65 = 117 | **EXACT** |
| `HOLD-NOID` 34 + `HOLD-PAIR` 16 + `SCRUB` 5 + `STEP0` 3 + `FALSEMERGE` 1 = 59 | **EXACT** |
| Churn 5/59 = 8.47%, under the 15% threshold | **EXACT** |
| `azami-2024` is 1 of 137 with `id_in_source` NO | **EXACT** — 136 `yes`, 1 `NO`, 39 `n/a` |
| Exactly 4 of 119 intake files contain `cr_scratch/`; 0 of 152 lsei | **EXACT** |
| 115 non-`.md` in intake: 112 PDF + 3 `.txt` | **EXACT**, and the three `.txt` are the UN treaties |

**The scrub evidence is stronger than he claimed and he did not notice why.** The four intake
files carrying `cr_scratch/` references are `473486main_iss_atcs_overview.md`,
`BEA_depreciation_rates.md`, `IEEE 2022 Paper SH TCS Architecture….md`, `falcon-heavy-wikipedia.md`.
**Three of those four are the underscore-and-space files** — i.e. three of the nine `A7`
normalization-collision members. The population that only matches after `normalize()` and the
population carrying cross-repository references are the *same files*. An exact-name instrument
misses both facts at once, for the same reason.

**The Software Engineer (W1-2).** Suite at **175 tests declaring 175** — verified by id count.
His `MRG-4` contract collision is the wave's most consequential finding and I did not re-run it:
it asserts on a semantic disagreement, not a count. `primary_secondary` means *which corpus copy
supplies the bytes* to The Engineer and *which member of the pair is primary* to him. **8 pair
groups, 0 with one primary** — correct under his reading, vacuous under The Engineer's. He
declined to rewrite the test to fit either. **This needs a ruling and it is a genuine A.9
instance, not an error by either seat.**

**The Manager, econ (W1-5).** Econ `H` row reads `18  53`; register holds 18 `A` rows and 53 `M`
rows. **EXACT both ways** — the known-answer test passes. His remedy comparison (12→13 for the
briefed fix, 12→6 for the collapse) is **NOT RE-RUN**: reproducing it requires mutating governed
files while a seat is still writing. Accepted as reported, with the fix unexecuted.

**The Designer (W1-7).** The mechanism is **LIVE and self-demonstrating**. `--check` now emits
`NOTE hard failures: N @ read-digest H over K files, tool 2.19-1, flags --check`. That line did
not exist this morning. Today's series — 12 → 17 → 15, over 88 → 90 → 95 → 97 → 99 files — is
now distinguishable for the first time; before it, the only available reading was that a seat's
amendments broke five checks, which is false. Three seats and I have all published counts today
that were correct and non-comparable.

**Live relocation state at this moment.** `literature/` is **empty**. `oracle/NAMING.md` exists
at 33,803 bytes and is still being written (mtime 14:01:58). The Software Engineer measured 82
occurrences across 28 files before the move, of which 9 across 6 were live; **3 live citations
remain** — `oracle/MANIFEST.tsv`'s promoted row, `tools/merge_identity.js`, and the gameplan.
`PTH-13` caught `FAIL MF-1 row literature/NAMING.md is promoted but no file exists at that path`
within the hour of the move — **a test written this wave catching a mutation made this wave, by
another seat.** Not currently firing; W1-3 is mid-edit.

**The finding that recurred to a third seat.** The Software Engineer: "`--check` went 12 → 15.
**All three new failures are in The Engineer's file; zero are mine.** Had I differenced counts I
would have assigned myself three defects." That is Cycle A's near-miss, in the deliverable
implementing its remedy, to the seat who filed it. Three independent instances now.

---

## W1-3's file-set divergence: orchestrator re-run at a later moment (2026-08-28)

He reported four instruments walking this repository within one minute and returning
**100 / 71 / 17 / 89**. Re-run at `HEAD 7cd5eb3`, after the boundary regeneration and two commits:

| Instrument | Count |
|---|---|
| `quantities.js` declared file set | **101** |
| `git ls-files` | **107** |
| `find`, excluding `.git/`, `lsei/`, `cr-agents/`, `_intake/` | **107** |
| `manifest.js` `D` rows | **20** |

**His numbers did not reproduce, and that is not a refutation — it is the finding restated.**
The set moved between his run and mine. Had either of us published a bare count, the only
available reading would be that the other measured wrong. Both are correct at their own digest.
This is the second independent vindication of the read-digest today, on evidence neither he nor
The Designer had to construct.

**What reproduces exactly is the structure.** No two instruments agree; none is wrong; every
disagreement is definitional. `git` and the filesystem agree at 107, which is worth stating
because it means nothing is untracked and nothing ignored-but-present in that scope — the
divergence is entirely among the *project's own* instruments, not between the project and git.

Six tracked files sit outside the quantity-governed set, and twenty of 107 carry a manifest row.
Nothing in the repository reconciles 101 against 107 against 20, because **no artifact defines
"the set of files this repository considers its own."** His ruling — build it at `tools/`, forbid
it from deriving its own file set, and make the declared set content with one owner — is the
right shape, and it is Wave 2's to execute. Verdict: **CONFIRMED AS A STRUCTURE, NUMBERS MOVED.**
