# Sub-step 2.12 — Open Question 8, completed audit

The Fact-Checker, W3-5, 2026-08-28, `HEAD = af7abec`. **Report only. Nothing was cleared, marked,
rewritten or moved.** The keyed table is `cr_scratch/step2_factchecker_oq8.tsv`, 23 rows.

## 1. What was run, and over what

The corpus is `literature/`, 168 summaries in eleven folders, **and it holds no PDFs**. The detector
pairs `x.md` with a sibling `x.pdf`, so pointed at `literature/` it tests nothing. The PDFs are 112
files in `_intake/japanese-miracle/lit/`. I built a measurement stage outside the repository that
hardlinks each summary next to its source PDF and ran the **unmodified** tool on it.

```
node <scratch>/w3-5_stage.js <root> <scratch>/w3-5_stage     # hardlinks only; no repo write
node tools/audit_abstract_overlap.js <scratch>/w3-5_stage 10
```

```
summaries 168 | paired with a PDF 112 | unpaired 56
  pairing basis: exact filename 99 | filename normalisation 9 | merge_plan DUP-nn 4
  PDFs on disk 112, all 112 used, none left over
read-digest literature/**/*.md   626cdba6a908919f  (run 1)  → 899e0ddfb70ed83f (run 2), 168 file(s)
read-digest paired PDFs          e65e4d256e005532 over 112 file(s) (path,size,mtime)  [unchanged]
tools/audit_abstract_overlap.js  sha256 c517c18fb9e9192e…   cr_scratch/merge_plan.tsv df976ac74c8dee8b…
```

**Two digests, because `literature/` moved under this audit while it was running.** A concurrent
sub-step 2.6 is inserting a `## Metadata` block into the corpus in this same working tree; 154 of
168 files now carry one and all 168 show as modified against `af7abec`. I re-ran the entire audit at
the later digest before writing anything down. **Every figure in this document is reproduced at both
digests, and the per-file probe output is byte-identical between the two runs** — the inserted block
sits between `## Citation` and `## Abstract` in all 154 files and in none of them after the abstract,
so it cannot reach the measured section. That is a checked result, not an assumption: I verified that
zero files place `## Metadata` after `## Abstract`. Figures below carry `899e0ddfb70ed83f`.

Twelve summaries pair with a PDF whose filename is not theirs. Eight are pure case/separator
normalisation applied at the merge (`BEA_depreciation_rates.pdf` → `bea-depreciation-rates.md`, and
so on; `GDP.pdf` → `gdp.md` is the case-only member of accumulator A7). The other four are
`merge_plan.tsv` `HOLD-PAIR` rows: DUP-01, -02, -04, -07 are one source with two summaries, the
primary landed under its own name, and the local PDF sits under the **secondary** member's filename.
Without that mapping four Comprehensive-Technical-Summary files would have been counted as
untestable when their source is on disk.

**Tool result, threshold 10, at the digests above:**

```
tested 112 summaries with a paired PDF and an abstract
skipped: 3 with no ## Abstract section, 53 with no readable paired PDF
median overlap 0.0%

AT OR ABOVE 10% VERBATIM: 8
  100.0% prettyman-2006      54.1% castillo-rogez-2022    11.4% lawrence-2003
   95.6% levin-2025          40.9% andrews-hanna-2025     11.2% wilson-2018
   74.0% mcleod-2017         39.4% hagerty-2011
```

Eight findings, topping out at 100.0%, over 112 paired summaries. **The brief's premise is
confirmed exactly, to the decimal place**, and the eight are the same eight I measured at Wave 1 on
a heading-relaxed build and The Engineer measured at Step 0 — three independent runs, one figure
set. The filenames are longer now because the corpus was renamed at the merge; the files are the
same files.

## 2. The finding the instrument still carries, reported because it changes what the number means

The repair swapped the terminator to `(?=^##[ \t]|$(?![\s\S]))`. Where `## Abstract` is followed
only by `###` subsections, that captures **to the end of the file** — the whole summary body is
measured as if it were the abstract. Seven files do this today:

| file | as-run shingles | as-run % | abstract-only shingles | abstract-only % |
|---|---|---|---|---|
| `colaprete-2010-lcross-ejecta-water-detection` | 5320 | 1.0 | 145 | 0.0 |
| `kornuta-2019-commercial-lunar-propellant-architecture` | 5688 | 0.0 | 149 | 0.0 |
| `azami-2024-lunar-manufacturing-review` | 4424 | 0.0 | 94 | 0.0 |
| `sowers-2019-psr-ice-mining` | 4248 | 0.6 | 147 | 0.0 |
| `paige-2010-diviner-cold-trap-temperatures` | 3707 | 0.5 | 158 | 0.0 |
| `csank-2022-powering-the-moon` | 3601 | 1.4 | 151 | 0.0 |
| `poston-2020-krusty-reactor-design` | 2600 | 0.2 | 121 | **3.3** |

The error **deflates**: a 150-shingle abstract diluted into a 3,000-shingle body reads near zero
whatever it contains. It cannot manufacture a finding, and on this corpus it hides none — I re-ran
the whole 112 with an abstract-only terminator and **the maximum outside the eight is 8.7%**
(`ehricke-1984`), so the eight-file finding set at threshold 10 is stable under both readings. But
`csank-2022` at "1.4%" and `colaprete-2010` at "1.0%" are artifacts of body text, not signal, and
anyone reading the ≥1% tail should know that. The 168-file merge incidentally suppressed most of
this by appending a `## Provenance` block to every file, which now terminates the match; the seven
above are the residue where `###` sections still sit between the abstract and that block.

## 3. Classification — overlap and passing-off are two different columns

Full rows in the TSV. In summary:

- **All 8 findings declare the reproduction in their own section heading**, in five distinct forms:
  `## Abstract (transcribed from title page)`, `(transcribed)`, `(transcribed / lightly
  de-hyphenated from page 1)`, `(transcribed from title page, paragraph [1])`. The corpus carries
  **nine** annotated headings; the ninth, `crawford-2015 (as transcribed / paraphrased from the
  paper)`, measures 0.0% — it declares transcription it did not commit. Error in the safe direction,
  and the reason a heading census is not an audit either.
- **No file uses quotation marks, a blockquote, or an ellipsis.** The marking is the heading and
  nothing else. `zero` files carry a `Licence:` line; the `own-summary` /
  `contains-transcribed-source-text` labels of PRV-15 still exist in no corpus file.
- **Three of the eight are open-licensed at the source and their files say so**: `mcleod-2017`
  (MDPI open access), `castillo-rogez-2022` (CC BY 4.0), `andrews-hanna-2025` (Nature Open Access).
  Reproduction with attribution is permitted; the heading supplies the attribution.
- **`prettyman-2006` is the one row where the marking does not settle the question.** It is a
  full-length, 100.0% verbatim AGU abstract, and the file's own provenance block prints the
  publisher's line, "Copyright 2006 by the American Geophysical Union". Marked, attributed, and
  still not the project's to dedicate. `levin-2025` (95.6%, AGU) is the same shape one step down.
- **`lawrence-2003` and `wilson-2018` at ~11% are floors, not measurements.** I opened
  `lawrence-2003` against its PDF: the source abstract is truncated mid-sentence in the text layer
  (two-column interleave), and the summary additionally rewrites "we have derived" to "the authors
  derive". Both effects push the number down. Structurally the text is near-verbatim. Step 0
  attributed the low reading to extraction defect alone; that is half of it.
- **Zero undeclared files cross the threshold.** The highest bare-`## Abstract` file in the corpus
  is `ehricke-1984` at 8.7%; I opened it, and it is the project's own compression of a Pergamon
  paper, opening "Third installment of the series." The Step 0.5 precedent holds on this corpus:
  the overlap that exists is declared where it exists.

## 4. The residual — what this audit cannot see

**56 of 168 summaries could not be measured at all.** 53 have an `## Abstract` and no local PDF;
3 have no `## Abstract` heading (`falcon-heavy-wikipedia`, `moon-base-architecture-users-guide`,
`rostami2018-figures`). Keyed to `merge_plan.tsv` `byte_source`:

| origin | measured | unmeasurable |
|---|---|---|
| `sole-lsei` (Scenario-Explorer-unique) | 4 | **49** |
| `lsei-primary` | 7 | 1 |
| `both-identical` | 77 | 6 |
| `sole-intake` | 24 | 0 |

**50 of the 56 are Scenario-Explorer-origin**, and the 4 `sole-lsei` files that *were* measured are
measurable only because of the DUP-nn filename mapping in §1. **Sub-step 2.11, the PDF pull, has not
run.** Until it does, the honest statement of Open Question 8 is: *the audit is complete over the
112 summaries whose source is on disk, and it has never been attempted on the other 56.* These are
also disproportionately the long "Comprehensive Technical Summary" format, which has more room for
transcription, not less. **I do not know whether they are clean, and the eight-file finding is a
finding about two thirds of the shelf.**

Accumulator row A6 states this population as **57**. I measure **50** Scenario-Explorer-origin
unmeasurable, or **56** unmeasurable from all origins, at read-digest `899e0ddfb70ed83f` over a
168-file corpus that did not exist when A6 was written. Different populations at different digests.
**I am not reconciling them; A6 needs restating against this digest, and that is the author's or the
Manager's call, not mine.**

## 5. My Wave 1 Part 8 escalation — CLOSED

At Wave 1 I escalated that `gott-2024` 79.8%, `schreiner-2016` 44.0%, `romer-1990` 38.4% and
`turyshev-2026` 11.9% do not reproduce (0.0% each, plain headings, no regex explains it), and that
Step 0 Part 8's description of `gott-2024` as carrying quotation marks, an ellipsis and
`(abridged, as printed on p.1)` does not describe the file. I said I would not guess between "the
four were rewritten" and "Part 8's description is wrong." **The answer is the first, and it was
already written down where I had not looked:**

> Accumulator row **A4**, `lunar-oracle-gameplan.md` L616: *"FIXED. Four rewritten as original
> prose, markers removed, re-audit returns 0."*

Three independent confirmations, so this closes on evidence rather than on a citation:

1. **Measurement.** All four are 0.0% on both the as-run and abstract-only terminators, against
   PDFs with healthy text layers (8.4k–14.9k characters extracted from pages 1–3). Not an
   extraction artifact.
2. **File-system record.** Exactly four `.md` files in the 119-file intake directory were modified
   after the bulk corpus landing, in a **32-second window on 2026-08-26 between 19:53:25 and
   19:53:57**, roughly 84 minutes before the Step 0 commit `63d4ded`. Every other summary carries
   the bulk `18:45` timestamp. The four are `gott-2024`, `schreiner-2016`, `romer-1990`,
   `turyshev-2026` — the escalation's population exactly, and nothing else.
3. **Reading.** I opened all four against page 1 of their PDFs. Each is a faithful, wholly reworded
   restatement. `gott-2024`'s "CaRD is building a subscale carbothermal-reduction demonstration and
   needs a way to measure how much molar-equivalent oxygen the CO and CO₂ byproducts represent"
   against the source's "The Carbothermal Reduction Demonstration (CaRD) project is currently
   developing a subscale system to demonstrate the operation and performance of the carbothermal
   reduction process and quantify the production of molar equivalent oxygen".

`literature/` versions differ from their intake originals by an appended `## Provenance` block and
nothing else, so the fix predates the merge and the merge did not disturb it. **The defect that
remains is documentary, not textual**: `cr_scratch/step0_engineer_corpus_merge.md` Part 8 still
reads as a live finding describing markup that no longer exists, and it is the document a reader
reaches first. That is a correction to someone else's artifact and I have not made it.

## 6. Recommendation to the author

Seven of the eight findings are marked at the point of use and licensed or short enough that the
marking carries them, and the four undeclared files of the old finding were remediated a week ago,
so **there is one file to decide about, not thirteen and not eight: `prettyman-2006`, a full-length
verbatim AGU abstract, with `levin-2025` a step behind it.** Rewriting those two costs an hour and
removes the question instead of managing it, which is cheaper than any notice file that grows a line
each time this recurs. **The audit is not finishable at this wave** — 56 of 168 summaries, 50 of
them Scenario-Explorer-origin, have no PDF to measure against, and sub-step 2.11's pull has not run,
so any statement that Open Question 8 is closed today would be an unmeasurable population reported
as measured. Accumulator A6 should be restated as 50-of-168 at read-digest `899e0ddfb70ed83f`, or
struck and re-derived after 2.11. If you want one thing done first: **run 2.11, then re-run this
audit unchanged** — the command, the stage builder and both digests are in §1.

## Not mine

| Finding | Sub-step | Owner |
|---|---|---|
| The repaired terminator captures the whole file body when `## Abstract` is followed only by `###` sections. 7 files affected today; it deflates and hides nothing at threshold 10, so it is not urgent, but the ≥1% tail is unreadable without it. An abstract-only terminator (`(?=^##[ \t]\|^###\|^---[ \t]*$\|$(?![\s\S]))`) reproduces all eight findings and reads `poston-2020` as 3.3% rather than 0.2%. | 2.12 instrument, but the file is the Software Engineer's | The Software Engineer |
| **14 of 168 `literature/` files carry two `## Provenance` headings** — a native one from the summariser and one appended by `tools/merge_identity.js --stage`. Duplicate H2 in a public corpus, and a parser keyed on the heading gets the wrong block. | 2.5 merge | The Engineer |
| `cr_scratch/step0_engineer_corpus_merge.md` Part 8 still presents the four A4 files as a live finding and describes markup removed on 2026-08-26. Accumulator A4 says FIXED; the source document does not. | Step 0 artifact | The Manager |
| Accumulator A6's population figure (57) predates the 168-file corpus and is not comparable to today's 50/56 at digest `899e0ddfb70ed83f`. | 2.12 / accumulator | The Manager → the author |
| `PRV-15`'s `Licence: own-summary` / `contains-transcribed-source-text` classes are still empty in all 168 files. The row remains vacuously green, as at Wave 1. | 1.8 schema / 2.7 | The Systems Engineer |

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```
