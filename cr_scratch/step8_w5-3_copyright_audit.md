# Step 8 · W5-3 · The Engineer — 8.8 copyright reproductions, 8.9 the vacuous audit

Seat W5-3. Sub-steps 8.8 and 8.9, plus the follow-on items the Orchestrator handed back (8.9b).
Tree at spawn `HEAD = cc1b8b8`, working tree carrying other seats' in-flight edits (see §9).

**Headline:** the corpus now measures **160 of 169** summaries against their sources, up from a
tested population of **zero**. **Zero all-rights-reserved reproductions remain.** Six summaries
cannot be measured and all six are named, with the reason, in §6.

---

## 0. Three premise refutations, in the order they happened

Each was found by running something, and each replaced a number that had been relayed as measured.

**0.1 — "2.11 never ran, so 56 of 169 have no source."** Wrong in both halves. 113 PDFs were on
disk in `_intake/` the whole time. And the shipped audit printed `skipped: 0 … 0` — it skipped
nothing *either*, because it opened **no file at all**: `readdirSync` does not recurse and
`literature/` holds no top-level `.md`, so the release gate's own invocation matched `/\.md$/`
against eleven directories and two `.tsv` files and fell out of the loop. Even had it recursed, it
paired `foo.pdf` *beside* `foo.md`, and in this repository summaries and sources are never in the
same directory. `56` was `169 − 113` done in someone's head, and it assumed no PDF was unused.
Twelve were.

**0.2 — my own "109 of 169 measurable, 57 not."** Also too low, and I relayed it. It measured
`_intake/` alone, which is a **partial copy** holding about a quarter of the available sources. The
author was right: *"We have ALL OF THE PDFs."* Across three roots the number is **160 of 169**.

**0.3 — "`luchsinger-2021` carries side A's figure misattributed."** Refuted; §7.

The lesson is the same one three times: **a number nobody re-derived is a number that has drifted.**

---

## 1. 8.8 — the three repairs

All three were all-rights-reserved AGU abstracts. All three kept citation, DOI, publisher URL and
copyright line — that is attribution and it is exactly what should stay. All three kept their
heading position and `## Abstract` shape, with the annotation corrected so it no longer claims a
transcription.

| File | Source licence, read from the PDF | Before | After |
|---|---|---|---|
| `prettyman-2006-lunar-elemental-composition.md` | `Copyright 2006 by the American Geophysical Union; 0148-0227/06/2005JE002656` | **100.0%** (261 shingles) | **0.0%** (472) |
| `levin-2025-lunar-crustal-kreep-distribution.md` | `2025. American Geophysical Union. All Rights Reserved.` | **95.6%** (229) | **0.0%** (507) |
| `hagerty-2011-spa-basalt-pond-thorium.md` | `Copyright 2011 by the American Geophysical Union. 0148-0227/11/2010JE003723` | **39.4%** (218) | **0.0%** (554) |

**Zero, not merely below threshold** — not one 10-word run survives, in replacement text that is
*longer* than what it replaced in every case. A light paraphrase does not produce that. `hagerty-2011`
is the proof: it *was* the light paraphrase, and it measured 39.4%.

### 1.1 `prettyman-2006` — before and after

Before, the AGU abstract in full, opening and closing:

> Gamma ray spectroscopy data acquired by Lunar Prospector are used to determine global maps of the
> elemental composition of the lunar surface. […] Significant results include improved accuracy for
> the abundance of Th and K in the highlands; identification of large regions, including western
> Procellarum, that are not well represented by the sample collection; and the association of
> relatively high concentrations of Mg with KREEP-rich regions on the lunar nearside, which may have
> implications for the concept of an early magma ocean.

After, opening and closing:

> For this project this paper is the reference source for how much thorium, potassium, iron and
> titanium sit on the lunar surface and where, and it is the definitive Lunar Prospector elemental
> product rather than a preliminary one.
>
> […] Two stated limits matter to anyone quoting the numbers. Oxide totals across western Procellarum
> come to about 94% rather than 100%, which the authors take as direct evidence that abundances there
> are underestimated and that the region is poorly represented by the sample collection. And the FeO
> values approaching 30 wt% that show up only in the finest 2° binning are artifacts of thin counting
> statistics, not real compositions.

Not the same sentences reordered. The AGU abstract spends its length on method and closes on results;
this is organised around what the paper is *for* here — the numbers, the calibration choice that
explains their error budget, then the limits that constrain quoting them. The 94% oxide sum and the
30 wt% artifact are in the paper's body and not in its abstract at all.

### 1.2 `levin-2025` — before and after

Before, opening — note the first person, the authors' own voice in a file this project claims to own:

> The distribution of KREEP—potassium (K), rare earth elements (REE), and phosphorus (P)—in the lunar
> crust is an important clue to deciphering the geochemical and thermal evolution of the Moon. […] In
> this study, we compared the overall lateral and vertical distribution of lunar KREEP in the upper
> crust by determining the thorium abundance of material excavated by complex impact craters.

After, opening and the headline result:

> This paper is where the project's numbers for buried lunar KREEP come from, and its interest here
> is that it puts a grade on a resource nobody has sampled.
>
> […] To account for the thorium observed in Imbrium's discontinuous ejecta blanket 1,200 to 3,300 km
> out, the primary ejecta must have carried 25 to 35 ppm; back out the roughly 28 km of low-thorium
> crust the impact had to punch through first, and the sub-crustal material it reached must have held
> 45 to 120 ppm.

**Also added:** the printed AGU copyright line, which was missing from this file's provenance. I read
it off the PDF; it now sits beside the DOI.

### 1.3 `hagerty-2011` — the one RG-5 does not name

RG-5 frames `prettyman-2006` as *"the row where the marking does not settle it"* and `levin-2025` as
*"the same shape one step down"*, which implies the other six are settled by their headings. They are
not. `hagerty-2011` is the same shape **two** steps down: the AGU abstract with its pronouns swapped —
"we use" rewritten to "The authors use" — and nothing else materially changed. Seven contiguous
verbatim runs survived the swap:

```
[39w] also use spatial correlations between local thorium enhancements and nonmare material on top
      of the basalt ponds to support previous assertions that …
[30w] imbrian aged basalt ponds located on the floor of south pole aitken spa basin are used to
      provide constraints on the composition and evolution of the …
[28w] thorium data to suggest that at least five different and distinct portions of the far side
      lunar mantle contain little or no thorium as of the imbrian …
```

A 39-word verbatim run out of an all-rights-reserved AGU abstract is not de minimis. **De-personalising
someone's abstract is not authorship**, and the audit was right to catch it at 39.4%. Replaced with the
project's own prose, opening:

> South Pole–Aitken reads as thorium-enriched from orbit against the feldspathic highlands around it,
> and this paper asks what inside the basin is actually carrying that signal. Its answer is that the
> mare basalts are not.

### 1.4 The measurement is comparable, because it is one instrument

The *before* figures were taken by extracting the pre-edit bytes out of git and running them through
the **new** tool, rather than by trusting the historical numbers:

```bash
git show HEAD:literature/lunar-ice-and-geology/prettyman-2006-lunar-elemental-composition.md > $T/before/…
node tools/audit_abstract_overlap.js $T/before 0     # 100.0%, 95.6%
node tools/audit_abstract_overlap.js literature 0    #   0.0%,  0.0%,  0.0%
```

---

## 2. 8.8 — the other findings, ruled by reading the source's own licence

I was told to verify RG-5's record rather than trust it. **The procedure, written down so it is
reproducible rather than a matter of how carefully someone reads:** open each source PDF, extract its
full text, grep out the licence sentence the publisher actually printed.

```bash
pdftotext "<source>.pdf" - | grep -oiE '.{0,100}(creative commons|CC BY|open access|all rights reserved|copyright ?[©0-9]|licensee).{0,80}'
```

| File | % | Printed licence | Ruling |
|---|---|---|---|
| `mcleod-2017-extraterrestrial-ree` | 74.0 | *"2017 by the authors. Licensee MDPI… distributed under the terms and conditions of the Creative Commons Attribution (CC BY) license"* | **Leave the text. Name the licence.** §2.1 |
| `castillo-rogez-2022-ceres-habitability` | 54.1 | *"Original content from this work may be used under the terms of the Creative Commons Attribution 4.0 licence."* | Same |
| `andrews-hanna-2025-spa-magma-ocean` | 40.9 | *"Open Access This article is licensed under a Creative Commons Attribution 4.0 International License"* | Same |
| `lawrence-2003-small-area-thorium` | 11.4 | AGU all-rights-reserved | **Not a reproduction. Heading fixed.** §2.2 |
| `wilson-2018-lp-thorium-reconstruction` | 11.2 | none — arXiv preprint, no reuse licence printed | **Not a reproduction. Heading fixed.** §2.2 |
| `nasa-2025-fission-surface-power-directive` | 11.3 | US Government work | **New finding, ruled clear.** §2.3 |

**RG-5 is correct on the three open-licence claims and incomplete on the rest.** All three check out
against the publishers' own words, and I did not touch their abstracts: over-repair would destroy real
provenance for no gain.

### 2.1 The three CC BY files now name CC BY

"Open access" is a distribution fact, not a licence. `mcleod-2017` said *"MDPI open-access review
article"*; `andrews-hanna-2025` said *"Nature, Open Access"*. Under a public-domain dedication the
specific grant is what does the work, so each now carries the publisher's licence sentence quoted
verbatim and the class `Licence: contains-transcribed-source-text`, with the reasoning stated in the
file: **this section is not covered by the repository's Unlicense dedication and is not this project's
to dedicate — it travels under the publisher's licence.** The citation and DOI already present are the
attribution CC BY requires.

### 2.2 `lawrence-2003` and `wilson-2018` — the headings lied, the prose did not

Both are already this project's prose: *"the authors derive a new global thorium map"*, *"Presents
improved-resolution maps of…"*, third-person description with the project's own bold markup. What the
audit caught is a few technical clauses carried across intact:

```
lawrence-2003   21 of 184 shingles, 5 runs, longest 16 words
wilson-2018     10 of  89 shingles, 2 runs, longest 20 words
```

The defect was the heading — `## Abstract (transcribed from title page)` over text that was never
transcribed. That is a false provenance claim pointing the *wrong way*: it invites a reader to treat
project prose as the publisher's. Heading corrected, `Licence: own-summary` added, **prose untouched**.
Rewriting it to satisfy a heading would have destroyed real provenance.

### 2.3 `nasa-2025-fission-surface-power-directive` — found by the known-answer test

This one is the §KA block earning its keep. It was **not** in the declared finding set, appeared at
11.3% once the search widened, and the KAT failed the run naming it:

```
FAIL  KA "nasa-2025-fission-surface-power-directive.md" measured at or above 10% and is NOT in the
      declared finding set. A new reproduction has landed, or an existing summary was replaced with
      source text. It needs a licence ruling before release
```

It is an internal NASA directive memorandum — a work of the United States Government, which under
**17 U.S.C. § 105** is not subject to copyright and is in the public domain. Quoted directive language
is freely reproducible and the file, quotations included, is this project's to dedicate. **Ruled clear
on the licence, not on the percentage**, and the ruling is recorded in the file rather than left
implicit.

### 2.4 An RG-8 conflict I am creating deliberately, and why

RG-8 says labels agree with the audit, *"falsified by a file labelled `own-summary` that the audit
flags."* Three files are now exactly that: `lawrence-2003` (11.4), `nasa-2025` (11.3) and
`wilson-2018` (11.2) are labelled `own-summary` and the audit flags all three.

**I am not relabelling them to satisfy the rule, and I am not moving the threshold to hide them.**
Both would be lying about a measurement. The real position is that PRV-15's two-class vocabulary
partitions on *transcription* while RG-5, RG-6 and RG-7 all actually turn on **dedicability** — may
this project dedicate this file? On that question the three are unambiguous: project prose with
de minimis clause carryover, and a public-domain source. The three CC BY files are the genuine
`contains-transcribed-source-text` members.

**Recommendation, routed:** state RG-8 as *labels agree with the audit's licence rulings*, not with
its raw threshold, and keep every ruling recorded in the file it concerns. A percentage is not a
verdict — that sentence is now printed by the tool on every run.

---

## 3. 8.9 — the tool

Rewritten. **Nothing was weakened.** No threshold moved, no tolerance widened, no file excused. Every
change strictly increases what can be caught, or strictly increases the loudness of what cannot.

**R1. Walk the tree, not the directory.** Recursive, so the corpus is reachable from the path RG-2
names. Flat directories behave exactly as before, so the historical `_intake/japanese-miracle/lit`
invocation stays comparable.

**R2. Resolve sources across roots, by four exact mechanisms**, tried in order and each reported by
name so every pairing is auditable: a declared `Source file:` line, exact basename, basename with `_`
folded to `-`, and an **exact and unique DOI** shared between summary and PDF.

*Deliberately not fuzzy, and more important at 447 candidates than at 113.* Eleven summaries were
renamed on landing and their PDFs sit on disk under the old name. A fuzzy matcher would pair most of
them, and would also pair `sowers-2019-thermal-mining-ice.pdf` against whichever of two `sowers-2019-*`
summaries it reached first. **A wrong pairing scores near zero and reads as clean** — it manufactures
the exact false clearance this tool exists to prevent. Unresolved summaries are named instead.

**R3. VACUOUS is not pass, at the interface.** Tested count of zero prints a VACUOUS block, names the
cause, and **exits 3**. Plus the `§KA` known-answer test (§3.2).

**The output shapes `fault_inject.js` I7 parses are preserved verbatim** — `/tested (\d+) summaries/`
and `/^AT OR ABOVE .*$/m`. Changing them would silence the decoy that found this.

### 3.1 Widening the search nearly broke the matcher, and the fix is content identity

The resolver requires **one** candidate. Across three overlapping trees that is not free: the same
paper is genuinely in more than one of them — `_intake/japanese-miracle/lit/` is a partial copy of
`Japanese Miracle Lit Review\lit\`, and `CSA_LSEI_Workshops` holds a third copy of much of it. A
resolver treating "two candidates" as ambiguity would have turned every duplicated paper into an
UNMEASURED file, so **widening the search would have *lowered* the measured population** — and it
would have looked like a finding.

The distinction that matters is **content, not count**. Candidates are SHA-256'd: several paths
holding byte-identical PDFs are one source filed in several places and resolve normally, reported as
`(3 identical copies across roots)`. Candidates that genuinely **differ** under one name are a reported
skip, never a guess. One file hit that — `speyerer-2013-persistently-illuminated-regions`, two distinct
digitisations of the same Icarus paper — and it was closed by a human declaration, not by the matcher.

*(All three Aqua Factorem PDFs are byte-identical, which incidentally confirms that
`metzger-2020-aqua-factorem.md` and `metzger-2021-aqua-factorem.md` summarise one single document.
That is a corpus duplication question for MRG-9/MRG-10's owner, not mine.)*

### 3.2 The known-answer test, which caught me twice and the corpus once

`§KA` declares corpus size, extractable-abstract count, resolved-source count, and **the finding set
by filename**, failing on a mismatch in either direction. The finding set is the part that earns its
keep: without it, a repair that accidentally deleted an abstract and a regression that restored
publisher text would both print a plausible number and pass.

- **Caught its own author.** I declared `withAbstract: 167` from a guess; first real run measured 166
  and failed. Corrected in the same edit, with the wrong guess left visible in the comment.
- **Caught a lie in my own output.** The tool printed `[pdftotext IS NOT ON THE PATH]` directly above
  109 successfully measured PDFs. `pdftotext -v` prints to stderr and **exits 99**; my probe treated
  any non-zero exit as absent. Only `ENOENT` means absent now.
- **Caught the corpus.** `nasa-2025-fission-surface-power-directive` at §2.3.

### 3.3 `--selftest`

```
$ node tools/audit_abstract_overlap.js --selftest
  OK   identical abstract scores 100.0%                                              ->  100.0%
  OK   disjoint abstract scores 0.0%                                                 ->  0.0%
  OK   ANNOTATED heading is extracted (the W2-2 regression)                          ->  100.0%
  OK   Abstract as LAST section is extracted (the terminator regression)             ->  100.0%
  OK   a file with no Abstract heading is a reported skip, not a silent one          ->  1 reported
  OK   the threshold flags the reproductions and only them                           ->  3 flagged
  OK   an EMPTY population is VACUOUS, not clean -- tested 0 must not read as a pass ->  tested 0
  OK   a summary with NO source is skipped and named, never scored 0%                ->  1 unresolved
SELFTEST PASSED: 8 of 8
```

Building a PDF to test a PDF reader is not possible here without a writer, so the text extractor is
injectable and the selftest substitutes a known source text — testing the parts that can actually be
wrong: the shingle engine, the heading extractor, the population ledger and the vacuous verdict. Two
cases are regression locks on defects this repository has already paid for (the W2-2 annotated-heading
blindness; the abstract-as-last-section terminator).

### 3.4 Source roots are configured, not hardcoded

The sources are not in this repository and never will be — `_intake/` is gitignored under RG-9 and
holds a partial copy; the bulk is in the author's own trees. Roots are read from
**`tools/source_roots.local`** (one path per line) and **`$LUNAR_ORACLE_SOURCE_ROOTS`**. Both optional,
neither tracked: absolute paths into someone's OneDrive are machine state, not repository content, and
hardcoding one would ship a dead path to every clone. `/tools/source_roots.local` was added to
`.gitignore` in the same edit. **A clone with neither configured finds no sources and is VACUOUS at
exit 3, which is correct.**

**Those trees are read-only.** The tool opens PDFs for text and hashes them for identity. It writes,
moves and deletes nothing under them, and no PDF entered version control.

---

## 4. The vacuous case, proved rather than asserted

Simulated by copying the tool and the corpus into a bare tree with no configured roots:

```
tested 0 summaries with a paired PDF and an abstract
population: 18 .md walked; 18 carry an extractable Abstract
skipped: 0 …, 18 with no source PDF resolvable on disk, …

AT OR ABOVE 10% VERBATIM: 0 OF 0 TESTED -- VACUOUS, NOT CLEAN

  VACUOUS. THIS RUN ASSERTED NOTHING. …
  CAUSE: no source PDF was found under any of the roots above. … A FRESH CLONE CANNOT RUN
  THIS AUDIT AT ALL. That is BC-19's two-trees fact … but it is a VACUOUS state, never a clearance.
  VACUOUS IS NOT PASS.  exit 3
EXIT=3
```

`18 walked; 0 tested` is not the same sentence as `18 tested; 0 flagged`, and the exit codes now
differ too. That is the whole of 8.9.

---

## 5. The real population, across all three roots

```bash
node tools/audit_abstract_overlap.js literature 10      # exit 0
```

```
source roots searched: literature, _intake, ../Japanese Miracle Lit Review, ../CSA_LSEI_Workshops
source PDFs found on disk: 215 distinct names over 447 paths

tested 160 summaries with a paired PDF and an abstract
population: 169 .md walked; 166 carry an extractable Abstract
skipped: 3 with no ## Abstract section, 6 with no source PDF resolvable on disk,
         0 whose candidates differ in content under one name, 0 unreadable, 0 too short
median overlap 0.0%

AT OR ABOVE 10% VERBATIM: 6 of 160 tested
   74.0%  mcleod-2017-extraterrestrial-ree.md            CC BY 4.0 at source
   54.1%  castillo-rogez-2022-ceres-habitability.md      CC BY 4.0 at source
   40.9%  andrews-hanna-2025-spa-magma-ocean.md          CC BY 4.0 at source
   11.4%  lawrence-2003-small-area-thorium.md            project prose, clause carryover
   11.3%  nasa-2025-fission-surface-power-directive.md   US Govt work, public domain
   11.2%  wilson-2018-lp-thorium-reconstruction.md       project prose, clause carryover

  OK      KA corpus .md files = 169, as declared
  OK      KA files with an extractable Abstract = 166, as declared
  OK      KA summaries paired to a source = 160, as declared
  OK      KA finding set = 6 files, exactly as declared
```

| | |
|---|---|
| corpus summaries | 169 |
| − no `## Abstract` heading at all | 3 |
| = carry an abstract | 166 |
| − no source resolvable under any root | 6 |
| = **tested** | **160** |

**Every remaining finding has a licence ruling and none of them is all-rights-reserved.**

**The three roots**, all read-only:

```
C:\Users\Quinn Morley\OneDrive\PROJECTS\CC\CSA_LSEI_Workshops\           218 pdf
C:\Users\Quinn Morley\OneDrive\PROJECTS\CC\Japanese Miracle Lit Review\  116 pdf
<repo>\_intake\                                                          113 pdf   (partial copy)
                                                                         447 paths, 215 distinct names
```

**34 `Source file:` declarations** were written to close the naming gap, each verified by opening the
candidate PDF and reading its printed title and authors against the summary's citation — never by
name similarity. Examples of what exact matching could never have found: `hayne2020.pdf`,
`linne_pilotplant2020.pdf`, `belbin2024_vsat.pdf`, `Electrical Transmission on the Lunar Surface
20040191588.pdf`, `40 kW Deployable FSP Paper_FINAL.pdf`. **This is the widening the Orchestrator
asked for: the search got wider, the matcher did not.**

---

## 6. The residue: six summaries, named individually, with the reason

Not a count. Each was tried against 447 candidates under four exact mechanisms across three roots, and
each failed for the same reason: **there is no PDF because the source was never a PDF.** All six say so
in their own provenance, and **none was built from an abstract database** — every one names a full-text
source that was actually read.

| Summary | What it was built from | Verdict |
|---|---|---|
| `henderson-2008-myth-of-miti` | econlib.org *Concise Encyclopedia of Economics* HTML entry. Already flagged in-file: *"Retrieved this session as a secondary source; used here for the Denison and Chung decomposition figures it reports, not as an original study"* | Correct as-is. Web source, self-declared secondary |
| `payload-research-starship-cost` | Payload Research web article | Correct as-is. Web-native source |
| `taylor-1911-scientific-management` | Project Gutenberg ebook #6435. In-file: *"No separate original-edition PDF was consulted"* | Correct as-is, and public domain |
| `un-1967-outer-space-treaty` | UN treaty text. *"Publisher URL: none in source"* | Correct as-is. Treaty text, no copyright |
| `un-1972-liability-convention-space-objects` | UN treaty text | Same |
| `un-1979-moon-agreement` | UN treaty text | Same |

**The author's estimate was "fewer than five." The measured answer is six, and all six are legitimate.**
They are not missing files and must not be reported as such. What they are is **permanently
unmeasurable by this instrument**, which compares against a PDF — so the honest close for RG-2 is not
"measure them" but "record that six summaries have no PDF to measure against, and why."

**Three further summaries carry no `## Abstract` heading at all** and are a separate reported skip;
they are counted in the ledger and are not silently clean.

---

## 7. `luchsinger-2021` — the Writer's finding, refuted, with a smaller real defect fixed

The claim: the file *"carries side A's figure `5.6 ± 2.9`, attributed to Colaprete, at lines 23 and 47.
A reader matching on the number alone assigns A's claim to C."*

**Verified against the source, which I now have** (`luchsinger2021.pdf`, found in the widened search).
Luchsinger's own introduction reads: *"these were used to determine a value of 5.6 ± 2.9 wt%."* **The
paper itself cites Colaprete's figure, and the summary reports that faithfully and attributes it
correctly** — line 23 reads *"The original analysis gave … (Colaprete et al. 2010; Heldmann et al.
2015)."*

**This is not a misattribution and must not be repaired as one.** The figure is load-bearing for side C:
LCC-01 side C exists precisely because *re-modelling the same LCROSS plume* yields 8.2 / 4.3 wt%
instead of 5.6. Delete the prior value and side C's argument stops being an argument. The claim's own
wording gives it away — *"a reader matching on the number alone"* is not a reader, it is a scorer, and
the Wave 5 standing block already ruled on that failure mode: **"No reader misses either. Only a scorer
does."**

**The smaller real defect, fixed:** the Topic-mapping line repeated the figure without the citation,
carrying the attribution only in the word "original". It now reads:

> the original 5.6 plus or minus 2.9 wt% plume concentration **reported by Colaprete et al. (2010) —
> that figure is side A of axis LCC-01 and is quoted here as the prior value this paper re-models, not
> as a result of this paper —**

Attribution added, provenance preserved, prose not rewritten.

---

## 8. Licence classes, and the Unlicense

The author's ruling — **the Unlicense, not CC0** — is applied to everything I marked, with the
carve-out stated in each file: *the dedication covers this project's own summaries and code and cannot
cover the sources those summaries describe.*

```bash
$ grep -rlE '^Licence: own-summary' literature/ | wc -l                       # 6
$ grep -rlE '^Licence: contains-transcribed-source-text' literature/ | wc -l  # 3
$ grep -rlE '^Licence:' literature/ | wc -l                                   # 9 of 169
```

`PRV-15` has been **vacuously green since Wave 1** — a partition asserted over a population where
neither class had a member. **Both classes now have members**, so the row can finally be gated, and
`Licence` is already in `corpus_suite` section 5's ruled key set so the key name is not invented.

**RG-7 is not closed and cannot honestly close yet**: 160 of 169 remain unlabelled. More to the point,
labelling the six unmeasurable summaries would be asserting a class no measurement supports. **RG-7's
close is downstream of §6's disposition, not of a bulk edit.**

---

## 9. Baselines

| Instrument | Brief's baseline | Measured now | Verdict |
|---|---|---|---|
| `node tools/verify_corpus.js` | 39 OK / 1 FAIL / 1 VACUOUS / 6 REPORT | **39 / 1 / 1 / 6** | unchanged |
| `node tools/check_registers.js` | 0 hard failures | **0** | unchanged |
| `node oracle/tests/run_suite.js` | 455 rows / 85 / 13 / 357 | **148 rows / 59 / 39 / 50** | **moved, not by me — §9.2** |
| `audit_abstract_overlap --selftest` | (new) | **8 of 8, exit 0** | — |
| `audit_abstract_overlap literature 10` | tested 0 | **tested 160, exit 0** | — |

### 9.1 One divergence I caused, found and declared

Adding `Source file:` lines made 34 landed bodies differ from their `lsei` upstream.
`verify_corpus`'s `DIV` clause went from **0 undeclared to 1**: `lsic-2026-newsletter-august.md`,
which had been byte-identical. Declared in its merge block in the house convention as
`declare-source-file`, and `DIV` is back to **0 of 155 undeclared**.

**A finding that came out of doing it.** The other 33 edits were *invisible* to `DIV`, because that
clause joins on the **presence** of a `Body edit` declaration and not on whether the declaration
**accounts for** the observed diff. 34 of my 40 edited files carry a pre-existing 2.6 declaration
naming `insert-metadata` or `drop-cts-marker` — operations that do not include what I did — and the
check reports them as cleanly declared. Routed at R4.

Also corrected in passing: `lsic-2026-newsletter-august`'s `Stated as of` block asserts *"No paired PDF
on disk."* That was true against `_intake/` alone and is now false. The sentence belongs to sub-step
2.7, so I noted the correction in my declaration rather than editing another seat's basis text.

### 9.2 The run_suite figures are not comparable and I am not reconciling them

The suite changed shape underneath this seat: **455 rows became 148**, so pass counts across the two
are figures at different populations and `COUNTING_RULE.md` says report them as incomparable. Of the
39 failures, **33 are `RFX-01`…`RFX-33`, all throwing the same deliberate message** — *"classifyQuestion()
is RETIRED at sub-step 8.1"* — W5-1's intended retirement, with suite rows still bound to the removed
function. `INV-7` and `RFX-35` are `fault_inject` rows on the same subject. The remaining four are the
standing `af7abec` failures: **`PTH-13`, `MRG-4b`, `MRG-9`, `MRG-10`. Not silenced, not edited.**

*(`MRG-4b` now reports 1 body identical to `byte_source` where it reported 2. That is my
`lsic-2026-newsletter-august` edit, and it is declared.)*

### 9.3 Line endings

`literature/**`, `tools/**` and `cr_scratch/**` are pinned LF. **CR bytes counted directly** — `tr -dc
'\r' | wc -c`, never `grep -c $'\r'`, which counts lines and has already misled a seat here:

```bash
$ find literature -name '*.md' -exec cat {} + | tr -dc '\r' | wc -c    # 0
```

**0 CR bytes across every file I wrote.** A tree-wide sweep does show CR bytes in 27 pre-existing files
under `cr_scratch/relay/spawn/`, `cr_scratch/step0*`, `cr_scratch/step1*` and `cr_scratch/_stage/` —
**none of them mine, none of them touched.** Reported at R5 because `cr_scratch/**` is pinned LF and
these are against the pin.

---

## 10. Does 2.11 still need to run?

**No, and it should not be run.** 2.11 is a PDF *pull* — a fetch of sources from outside. Its purpose
was to give the audit something to measure against, and **447 PDFs across three roots already do
that**, covering 160 of the 166 summaries that carry an abstract. The six that remain (§6) have no PDF
because their sources were never PDFs, and no pull will conjure one for a UN treaty or a Gutenberg
ebook.

Running it now would fetch material this project already holds, into a tree that RG-9 forbids tracking,
to close a gap that measurement shows is already closed. **What 2.11's absence actually left behind was
not missing files but missing `Source file:` metadata, and that is now written for all 34.** The
sub-step's gate should be closed as satisfied-by-other-means, with §6 recorded as the permanent
residue — that is its owner's call and the Manager's, not mine.

---

## 11. Routed — not my write set

| # | To | What |
|---|---|---|
| R1 | `release_gate.md` owner | **RG-2 has a real number for the first time: 160 of 169 tested, exit 0.** RG-5's finding set is now six, all ruled, none all-rights-reserved. RG-6's two AGU files are repaired and a third RG-5 never named (`hagerty-2011`) is repaired with them. **RG-15's `RDM-14` cites "56 of 169 unmeasured" — the number is 6**, and §6 of the gate refuses to reconcile A6's `57` with `50`/`56`; there is now a current figure at a current digest |
| R2 | RG-8's owner | State RG-8 as **labels agree with the audit's licence rulings**, not with its raw threshold. Three files at 11–12% are correctly `own-summary`; §2.4 |
| R3 | RG-7's owner | `Licence:` on **9 of 169**, both PRV-15 classes non-empty for the first time since Wave 1. The remaining 160 are a bulk pass, but **the six in §6 must not be labelled** — no measurement supports a class for them |
| R4 | `verify_corpus` owner | **`DIV` joins on the presence of a `Body edit` declaration, not on whether it accounts for the diff.** 34 of my 40 edits are reported as cleanly declared under 2.6 declarations naming operations I did not perform. A check that cannot go red for the right reason; §9.1 |
| R5 | Whoever owns `cr_scratch/**` | 27 pre-existing files carry CR bytes against the LF pin; §9.3 |
| R6 | MRG-9 / MRG-10's owner | **All three Aqua Factorem PDFs are byte-identical**, so `metzger-2020-aqua-factorem.md` and `metzger-2021-aqua-factorem.md` summarise one document under two names |
| R7 | Sub-step 2.7's owner | `lsic-2026-newsletter-august`'s `Stated as of` basis says *"No paired PDF on disk"*; now false |
| R8 | 2.11's owner / The Manager | Recommend closing as satisfied-by-other-means; §10 |

---

## Not mine

- **2.11, the PDF pull.** Not run, and §10 argues it should not be.
- **`oracle/router/**`, `oracle/answer_contract.md`, `CLAUDE.md`, `oracle/release_gate.md`,
  `oracle/tests/**`.** Read, never written. The `RFX-*` retirement failures are W5-1's and are reported,
  not touched.
- **The registers.** `oracle/CHECKS.tsv`, `oracle/AMENDMENTS.tsv`, `oracle/QUANTITIES.tsv` untouched.
- **The four `af7abec` standing failures.** `PTH-13`, `MRG-4b`, `MRG-9`, `MRG-10`. Left red.
- **The three CC BY abstracts.** Text left exactly as it was; only the licence naming was added.
  Repairing them would destroy real provenance.
- **The two outside source roots.** Read-only throughout: opened for text, hashed for identity,
  nothing written, moved or deleted, and no PDF entered version control.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

Tests unchanged: `§KA` and `--selftest` live inside `tools/audit_abstract_overlap.js` and bind no suite
row. `corpus_suite`'s `PRV-15` and `PUL-10` now both have a working instrument and a non-empty
population to bind against, and neither binding is mine to write.
