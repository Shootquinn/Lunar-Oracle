# Step 2 Wave 2 — The Fact-Checker — the 2.7 `stated_as_of` patch table

**PREMISE CHECK (first line, standing clause 1). P1 HELD, P2 HELD, P3 REFUTED.** P1: `merge_plan.tsv`
has exactly 176 data rows, column 2 is `key`, and all 176 `source_path` values exist on disk —
measured, 0 missing. P2: `programme-primaries` is a `target_folder` value with 10 rows, one command.
P3 is false in its second clause. "You can tell which by opening it" holds only where the source
itself is openable, and **13 of my 25 selected rows have no paired PDF on disk**. For those 13 I can
read where the date sits *in the summary*; I cannot see whether the source prints it. That is why
`derived_from_citation` is a flag in this table and not a pass. One further correction to the brief's
context, not to a numbered premise: `dedup_key = L0|none` has **FIVE** rows, not four —
`dr-michael-nayak-luna-10`, `falcon-heavy-wikipedia`, `nasa-clps-delivery-timeline`,
`rostami2018-figures`, `take-or-make-in-space`.

**Read-digest (clause 3):** `3714f11f69043da3` over **189 files** — the 176 `source_path` values,
`merge_plan.tsv`, and the 12 openable paired PDFs. **Census self-count (clause 4): my own two
deliverable files are NOT in the 189.** The set was fixed at the start of my sitting, before the
merge lands; a census taken after the stage exists is a different measurement.

## 1. Selection rule — stated before it was applied

A source is a **programme-state snapshot** when its load-bearing content is an assertion about the
state of an institution, programme, contract, market or statistical series *at a moment*, such that
later events falsify it without anything in it having been wrong when written. Three questions, all
three must be yes:

- (a) does it assert a time-indexed state — a schedule, manifest, roster, budget, contract, price,
  development status, or a periodic statistical vintage?
- (b) would a reader in 2028 be misled by it without knowing when it was written?
- (c) is that state its principal content, and does the title or abstract say so?

Explicitly **out**: measurements, experiments, models, derivations, reviews of a scientific
literature, historical analysis, and cost/breakeven *analyses* whose inputs happen to be time-indexed
prices. Test (c) is what excludes them: `take-or-make-in-space`, `jones-2019-cislunar-isru-breakeven`,
`nexgen-2015-evolvable-lunar-architecture`, `metzger-autry-2023-lunar-landing-pads`,
`csank-2022-powering-the-moon` and the ISNPS state-of-the-art reports all go stale, but their
principal content is method and result. Selecting them makes the rule mean "everything", and a rule
that selects everything is not a rule. Also out: fixed-text legal instruments — a treaty's text does
not change. `nasa-2020-artemis-accords` is the one exception and it is **in**, because the summary
asserts a **roster** ("the signature pages, as printed, list eight Signatory states") and a roster is
a programme state.

**Applied: 176 examined, 25 selected, 151 rejected.** Ten are `programme-primaries` (the whole
folder). The other **fifteen the gameplan did not name**: `nasa-clps-delivery-timeline`,
`nasa-clps-procurement-vignette`, `nasa-lunar-power-strategy-2025`,
`nasa-2023-card-carbothermal-reduction`, `payload-research-starship-cost`, `falcon-heavy-wikipedia`,
`jones-superheavylift-final20260614`, `gao-2011-neutron-detectors-helium3`,
`oecd-2023-space-economy-in-figures`, `highfill-2024-us-space-economy-statistics`,
`statistical-review-of-world-energy`, `usgs-2025-platinum-group-metals-mcs`, `gdp`,
`bea-depreciation-rates`, `nasa-2020-artemis-accords`. Six of those fifteen are periodic statistical
publications, which the gameplan's population misses entirely and which are the most dangerous class
in the corpus: they are revised annually under an unchanged title.

## 2. Where the dates came from

`printed_in_source` **14** · `derived_from_citation` **7** · `unknown` **4**. Twelve of the 25 have an
openable PDF and I opened all twelve; for those, `printed_in_source` means I read the date off the
page and named the line. For the other 13, `printed_in_source` is granted only where the summary
**names the printed feature** the date sits on — signature block, title-slide banner, revision table,
byline. That discriminator is the whole method and it is re-runnable by anyone.

Four findings that only opening the source produced:

1. **`jones-superheavylift-final20260614` — the claimed date does not verify.** The citation asserts
   June 14, 2026. `pdftotext` over the whole PDF returns no publication date; **page 1 extracts zero
   text** because the cover is a raster. The only corroboration on disk is the filename token
   `FINAL20260614`. A filename-derived date is precisely what this table forbids, so the row is
   `unknown`. UNSUPPORTED, not CONTRADICTED — the body's latest printed date (June 8, 2026) is
   consistent with the claim. One 200-dpi render of page 1 settles it, and the summariser
   demonstrably rendered pages 6/14/15 of this same file and did not record the cover.
2. **`oecd-2023-space-economy-in-figures` — the bytes on disk are the September 2024 revision.** The
   imprint page prints "Revised version, September 2024" directly under the suggested citation
   "OECD (2023)". The summary records only 2023. Stamping 2023 prints a currency the artifact does
   not have. `stated_as_of` is 2024-09; the key does not move.
3. **`nasa-clps-procurement-vignette` — a live programme state with no date at all.** "There are
   currently a total of fourteen CLPS contract holders", "$2.6 billion through November 2028", and
   nothing on either page says when. `unknown`. The inferential floor (Peregrine in future tense →
   before 2024-01-08) is a floor and I do not stamp it.
4. **`bea-depreciation-rates` — no date anywhere in 14 pages.** Every year in it belongs to a cited
   underlying study. The summary's citation gives no year, which is the right behaviour, and it
   leaves the file with zero currency. `unknown`.

Two conflicts to carry into `## Provenance` rather than resolve: `nasa-moon-to-mars-doc`'s own
revision table prints **two** dates (2025-12-11 and 12/12/2025), and it must be stamped identically
to its HOLD-PAIR partner `nasa-2025-moon-to-mars-architecture-add-revc` (2025-12-12);
`nasa-2023-card-carbothermal-reduction` prints "CaRD Project Status 2023" on the title slide and
"GCD FY18 Mid Year Review" on every slide footer.

One correlation worth naming: **four of the five `L0|none` rows are programme-state artifacts** and
three of those are in this table. No-identifier and no-currency-date are not two problems. They are
the same document class — undated agency and grey artifacts — and a check keyed on either finds
mostly the same files.

`nasa-clps-delivery-timeline` is written as instructed even though it may not land: `unknown`, HOLD-NOID.

## 3. What I would need to re-run the A.10 step 2 gate on repaired `PRV-13` and `PRV-15`

Three things, and the third is the one he will get wrong. **First**, each repaired row must name a
runnable command and a population, so that the row states what it walks — `PRV-13` currently goes red
on sixteen correct values because 16 of 30 openable sources print no DOI, and the repair has to be to
the pass criterion, not to the sources. **Second**, `PRV-15` failed *on the instrument*: its tool
returned zero findings over a population of eight because of a heading regex it could not see past,
and the repair must ship the regex as part of the row, so that relaxing it is a visible change to the
row rather than an undocumented flag I pass at the prompt. **Third and non-negotiable: the row must
declare its denominator as a measured file set with a read-digest, not as "the corpus."** Today
`literature/` is empty, only 12 of my own 25 rows have an openable source, and of 271 corpus
summaries only 30 do. A gate whose population is "the corpus" is not re-runnable, because the two
runs are not comparable by clause 3 — and after the merge lands, the same words denote a different
set. Give me a command, a population expression that resolves to a file list, a pass criterion stated
over that list, and an expected result recorded with its digest, and I will re-run both rows and
report agreement or not. Without the digest I will report that the gate ran and refuse to call it a
re-run.

## Not mine

1. **`falcon-heavy-wikipedia` states an impossible maiden flight.** "Maiden flight 2026-02-06 (Tesla
   Roadster)" sits in the same file as "Flew Psyche (2023) and Europa Clipper (2024)" and "center-core
   recovery succeeded once (Arabsat-6A, 2019)". A 2026 maiden flight cannot precede 2019 recoveries;
   the true date is 2018-02-06. CONTRADICTED, internal to the file, no source needed. Sub-step: the
   corpus content repair that owns lifted-file body text. Owner: The Engineer (he holds the write on
   `cr_scratch/_stage/literature/`). Relay written.
2. **`falcon-heavy-wikipedia` has no `## Citation` heading** — the only file in my 25 without one, and
   an `oracle/NAMING.md` section 7 exposure alongside the four `L0|none` rows already in play.
   Sub-step: 2.x citation-block repair. Owner: The Engineer.
3. **`dedup_key = L0|none` has five rows, not four.** `rostami2018-figures` is the fifth and is not in
   the brief's list. Sub-step: the L0 adjudication. Owner: The Space Resources Engineer. Relay written.
4. **`nasa-data-gaps-acr25-wp-data-gaps-v3` is an excerpt of ADD Rev C Appendix E** and its true
   `stated_as_of` is almost certainly 2025-12-12, but the file carries only "2025". I stamped 2025 and
   did not upgrade it. Sub-step: 2.7 execution. Owner: The Engineer, at stamp time, if he opens the
   white paper.
5. **`gdp.md` extraction hazard, not a currency finding.** `pdftotext -layout` on `GDP.pdf` returns the
   ranking column and the value column offset by one row (United States shows blank, China shows the
   US figure). The summary says it re-verified the load-bearing figures by rendering to PNG, so this
   is probably contained — but any *future* re-extraction of this table with a text-only tool will
   silently shift every value up one economy. Sub-step: 2.11 / the Wave 3 PDF pull. Owner: whoever
   owns the PDF pull.

## Apparatus

I added nothing. No new test, check row, amendment row, quantity id or governed clause was needed:
the table is 25 rows of judgement over files that already exist, and the counting rule it needs is
stated in its own header. Per the author's ruling, the ceiling was undershot to zero and I am saying
so here.

apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
