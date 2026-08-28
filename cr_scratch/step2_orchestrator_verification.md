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
