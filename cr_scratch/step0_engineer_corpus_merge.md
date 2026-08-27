# Step 0.2 — The Engineer: the corpus merge (Objective 1)

**Persona:** The Engineer. **Sub-step:** 0.2, Wave 1. **Date:** 2026-08-26.
**Assumptions used:** A1, A2 (ruling), A3, A4. Deviations flagged inline per A5.
**Scope discipline:** no merge was performed. `{ROOT}/literature/` does not exist and this spawn did
not create it. One throwaway probe corpus was built in the session scratchpad to run
`literature_search.js` against a merged shape (Part 7) and was deleted; it never touched the
repository.

---

## Summary of findings

| # | Question | Answer |
|---|---|---|
| 1 | Inventory | All seven published numbers reproduce exactly. But 182 is filenames, not sources. |
| 2 | Taxonomy | 8 folders will not hold it. `growth-and-industrial-theory` is already a residue at 27 files. Propose 11 folders. |
| 3 | House format | Already agree. No rewrite pass. A header transform on 60 files. |
| 4 | Disagreement | **Cosmetic.** 89 of 95 pairs byte-identical. Manager trigger does not fire. |
| 5 | Provenance | Absent. A `## Provenance` precedent exists in 15 files and is the format to generalize. |
| 6 | Register encoding | Sidecar `REGISTER.tsv` + a `## Contested` block in each member. Both, not either. |
| 7 | `literature_search.js` | Walk survives. Scoring degrades. `best` cannot express the invariant. One live bug. |
| 8 | Extracted source text | **Yes.** Bounded at 13 files, 12 measured, all marked. Escalates. |
| 9 | PDF pull | 52 net-new PDFs, 224 MB. Deterministic rule covers 148/182; 12 hand-resolved; 22 have no PDF. |

---

## Part 1. Inventory, verified

Every number in the gameplan reproduces. Commands and results:

```
find lsei/literature -name '*.md' | wc -l                        -> 158
find lsei/literature -type f ! -name '*.md' | wc -l              ->   0
find _intake/japanese-miracle/lit -name '*.md' | wc -l           -> 119
find _intake/japanese-miracle/lit -iname '*.pdf' | wc -l         -> 112
find _intake/japanese-miracle/lit -type f ! -name '*.md' \
     ! -iname '*.pdf' | wc -l                                    ->   3  (un-1967, un-1972, un-1979 .txt)
per-folder: growth-and-industrial-theory 27, isru-processing 32, logistics-and-delivery 13,
lunar-ice-and-geology 20, power-and-thermal 20, programme-primaries 10,
space-economy-and-markets 26, space-law-and-governance 10                -> sums to 158
```

Overlap under three normalization rules, computed by `comm` on sorted, normalized basename lists:

| Rule | Both | LSEI only | JM only | Union |
|---|---|---|---|---|
| None (exact filename) | **86** | 72 | 33 | 191 |
| Case + underscore→hyphen | **92** | 66 | 27 | 185 |
| Case + underscore + **space**→hyphen, collapse repeats | **95** | **63** | **24** | **182** |

**Stated normalization rule (recommended, and the one that reproduces the published figures):**
lowercase; replace each run of `_` or space with a single `-`; collapse repeated `-`; strip `.md`.
Nothing else. No stemming, no token reordering, no year extraction. It is reversible enough to
audit and short enough to state in one line, which is the property a merge key needs.

The 24 JM-unique files reproduce the gameplan's list exactly, all 24, no substitutions. The 9 pairs
that match only after normalization are: `473486main_iss_atcs_overview`, `BEA_depreciation_rates`,
`GDP`, `IEEE 2022 Paper SH TCS Architecture and Technical Challenges Update`,
`ISNPS_Tech_Report_103`, `ISNPS_Tech_Report_97`, `Jones_SuperHeavyLift_FINAL20260614`,
`Statistical Review of World Energy`, `Take or Make in space`. The last three are the three the
space rule recovers.

### What filename hygiene actually costs, measured

The brief asks what the three-file space difference implies. It implies more than it looks like,
and the cost is measurable rather than aesthetic. Three findings.

**(a) The tokenizer is fine. The scorer is not.** `filenameTokens()` splits on `[a-z0-9]+`, so
underscores and spaces are already invisible to it: `ISNPS_Tech_Report_97.md` tokenizes to
`["isnps","tech","report","97"]`, correctly. But `scoreFile()` computes the lead-author bonus as
`baseName(filename).split('-')[0]` and the year bonus as `/-(\d{4})-/`. Both require hyphens.
Measured, with a question that names the file directly:

```
scoreFile(tokenize("What did Beason 1996 find about Japanese industrial targeting?"),
          "beason-1996-targeting-japan.md")
  -> {overlap: 3, bonus: 6, score: 9}
scoreFile(tokenize("ISNPS tech report 97 findings"), "ISNPS_Tech_Report_97.md")
  -> {overlap: 4, bonus: 0, score: 4}
```

A hyphenated filename earns +6 that a non-hyphenated one cannot earn at all. Winning scores in this
corpus are single digits. A six-point handicap on nine files is decisive, and it is silent.

**(b) On Windows the merge loses a file.** `GDP.md` and `gdp.md` are the same path on a
case-insensitive filesystem. Building the probe corpus by naive copy produced 190 files where
158 + 119 − 86 = 191 were expected; the missing one is `GDP.md`, overwritten without a warning.
A merge script that runs correctly on Linux and silently drops a file on Windows is not a merge
step, it is a bug with a schedule. Under A4 this still bites: Claude Code runs on both.

**(c) The filename is not a unique address, so it cannot be the dedup key.** See Part 4.

**Consequence for the merged corpus:** every landed filename conforms to
`^[a-z0-9]+(-[a-z0-9]+)*\.md$` and carries `author-year-topic` where an author and year exist.
Enforced by a test, not by a convention. A convention is a preference.

---

## Part 2. The taxonomy

**The 8 folders do not survive, and the reason is not the Japanese material.** They are already
failing. `growth-and-industrial-theory`, 27 files, currently holds:

- growth theory: Solow, Romer, Lucas, Aghion, Barro, Rebelo, Jones
- development economics: Lewis, Murphy, Rosenstein-Rodan, Hausmann, van der Ploeg
- quality and scientific management: Shewhart ×2, Deming, Taylor
- **self-replicating robotics:** Chirikjian ×2, Lee, Freitas, Metzger ×2
- Japan: Caballero, Henderson, IMF 1963
- project delivery: Flyvbjerg
- a statistical series: BEA depreciation rates

Seven subjects, one of which is not economics at all. That folder is not a category; it is what was
left over. Adding Trist on longwall coal-getting, Spear on TPS, Ryan on self-determination theory,
Beason, Miwa, Wade, Otsu, Kiyota ×2, Jorgenson, Aoki, Christiano, Nakamura, Esteban-Pretel, ESRI,
Kawagoe, Hoshi, Pritchett, May, Simonis, Acemoglu, Beckley and Dingman takes it past 50 files
across nine subjects. It stops being findable, which is the failure the brief names.

**Retrieval does not care, and that is the point.** `listCorpusFiles()` walks to any depth and
`filenameTokens()` reads only the leaf name; folder segments are never scored. Confirmed by running
identical queries against the flat probe corpus and the foldered LSEI corpus: the paths differ, the
ranks are identical. **The taxonomy is therefore a decision about human navigation only, and it
should be made on that basis without pretending it buys retrieval quality.**

### Proposal: foldered, eleven top-level categories, one level deep

Flat at 182 files is a directory listing nobody reads. Two levels is a decision per file that will
be made inconsistently. One level, eleven folders, is the shape that fits on a screen.

| Folder | From | Approx. |
|---|---|---|
| `lunar-ice-and-geology` | LSEI, unchanged | 20 |
| `isru-processing` | LSEI, unchanged | 32 |
| `power-and-thermal` | LSEI, unchanged | 20 |
| `logistics-and-delivery` | LSEI, unchanged | 13 |
| `space-law-and-governance` | LSEI, unchanged | 10 |
| `programme-primaries` | LSEI, unchanged | 10 |
| `space-economy-and-markets` | LSEI, minus the Japan-adjacent strays | ~26 |
| `growth-theory` | Solow, Romer, Lucas, Aghion, Barro, Rebelo, Jones, Hausmann, Pritchett | ~11 |
| `development-and-industrial-policy` | Lewis, Murphy, Rosenstein-Rodan, van der Ploeg, Beason, Henderson, Wade, Otsu, Kiyota ×2, Aoki, Kawagoe, ESRI, Esteban-Pretel, Christiano, Miwa, Hoshi, Jorgenson, Nakamura, Caballero, IMF 1963, May, Simonis, Beckley, Dingman | ~25 |
| `organization-and-production-systems` | Taylor, Shewhart ×2, Deming, Trist, Spear, Ryan, Flyvbjerg, Acemoglu | ~9 |
| `self-replication-and-automation` | Freitas, Chirikjian ×2, Lee, Metzger 2013 | ~5 |

Eleven folders, none over 32, none under 5. `growth-and-industrial-theory` is dissolved rather than
extended; it is the folder that proved the 8-folder scheme was already at its limit.

**A source that belongs in two folders.** One file, one path. No symlinks, no duplication — a
duplicated file is two files that will diverge, which is the failure Part 4 documents empirically.
The second membership is recorded in the file's own `## Provenance` block as
`- **Also:** development-and-industrial-policy`, one line, machine-readable, and the merge step
emits `literature/INDEX.tsv` listing `path`, `primary`, `also`, so the cross-listing is queryable
without walking every file. The folder is the address; the index is the cross-reference. Caballero
(Japan + finance), Acemoglu (organization + growth) and Metzger 2013 (self-replication + space
economy) are the live cases.

---

## Part 3. House format — no rewrite pass. This is a step, not a project.

Answered empirically across all 277 files, not by inspecting two.

**Level-2 section-name signatures, whole corpus:**

```
LSEI (158 files, 15 distinct signatures)
   81  Citation | Abstract | Summary
   56  Comprehensive Technical Summary | Citation | Metadata | Abstract
   11  Provenance | Abstract (...) | Summary | [Limitations] | Topic mapping (neutral)
    2  Newsletter Summary | Citation | Metadata | Abstract
    8  one-off shapes (figure-only files, a wiki extract, a numbered-section NASA document)

JM (119 files, 10 distinct signatures)
  102  Citation | Abstract | Summary
   15  Provenance | Abstract (...) | Summary | [Limitations] | Topic mapping (neutral)
    2  one-off shapes
```

**The five-section body spine is common to both and is where the content lives:**

```
### Background and objective / ### Methods and scope / ### Key findings
### Limitations / ### Topic mapping
LSEI:  137 of 158 carry all five        JM: 103 of 119 carry all five
```

The files that do not carry all five are **the same files in both corpora** — they are the shared
identical files (Azami, Colozza, Leger, Schreiner, Sibille, the thorium/KREEP set, the newsletters).
The exceptions are inherited, not divergent.

**Where the two corpora actually differ, cross-tabulated against the overlap:**

```
LSEI files carrying the Comprehensive/Newsletter header block : 60
   of which also present in JM : 1   (csank-2022-powering-the-moon)
   LSEI-unique                 : 59
LSEI files without it: 94 overlapping, 4 unique
```

That is as clean a result as this question can give. **The format split maps almost exactly onto
the overlap boundary.** All 95 shared files but one are in the canonical format both corpora use.
The second format is the Scenario Explorer's own later work — 59 of its 63 unique files.

**Answer: the two corpora already agree on house format.** There is no rewrite pass and the merge
is not a project. What exists is one additive header block on 59 LSEI-unique files: a
`## Comprehensive Technical Summary` marker line and a `## Metadata` one-paragraph block, sitting
above a `## Citation` and `## Abstract` that both formats already share, over a `###` spine that is
identical.

**Cost, stated so it can be scheduled:** normalize by *adopting* the richer format as house, not by
stripping it. `## Metadata` carries study type, institutions, publication date and open-access
status — that is provenance the thin format lacks and Part 5 needs. The transform is: for the ~120
files without it, insert a `## Metadata` block populated from the fields already present in the
`## Citation` paragraph, and drop the redundant `## Comprehensive Technical Summary` marker line
from the 60 that carry it. Mechanical for the drop, extraction for the insert. Not free, but a
half-step, not a project. **The 11 `## Provenance`-form files are already richer than either and
are left alone.**

---

## Part 4. Disagreement resolution — COSMETIC. The trigger does not fire.

Run rather than reasoned about, per the brief. All 95 overlapping pairs hashed after CRLF
normalization (Node, md5 over `\r`-stripped content):

```
IDENTICAL  89
DIFFERENT   6

csank-2022-powering-the-moon        lsei 23190  jm  7619   delta -15571
473486main-iss-atcs-overview        lsei 17300  jm 17386   delta    +86
bea-depreciation-rates              lsei 13103  jm 13180   delta    +77
ieee-2022-paper-sh-tcs-...-update   lsei 16498  jm 16540   delta    +42
falcon-heavy-wikipedia              lsei  2532  jm  2560   delta    +28
barro-2004-economic-growth-textbook lsei 19759  jm 19753   delta     -6
```

**Ninety-four percent of the overlap is byte-identical. Report to The Manager: substantive
disagreement was not found. The standing trigger for an immediate specialist recruit does not
fire.**

Five of the six differences are one edit made five times. Diffed in full:

```
473486main: jm   "...the register (`cr_scratch/step7_3RR_space_resources.md`) pins the"
            lsei "...the register pins the"
bea:        jm   "...values recorded in `cr_scratch/step7_3_gap_register.md`."
            lsei "...values recorded in the gap register."
falcon:     jm   "See `cr_scratch/step7_3_launch_cost_notes.md` for the marginal-cost analysis..."
            lsei "The marginal-cost analysis this source feeds is tracked separately."
barro:      jm   "Opus/pdftoppm escalation was required."
            lsei "additional page-rendering pass was required."
```

The Scenario Explorer copy is the Japanese Miracle copy with **dangling cross-references to the
Japanese Miracle project's own `cr_scratch/` removed** when it was ported. That is not two passes
disagreeing. That is a publication-hygiene edit, made for exactly the reason this project inherits:
those paths do not resolve outside the Japanese Miracle repository, and a reference a machine cannot
follow is a copy. **The LSEI version is the dereferenced version and it is the correct one to keep**
— those `cr_scratch/` files are not in `_intake/` and will not be in `literature/`.

The barro difference is a tooling note reworded to drop a model name. Same category.

### The sixth case is not a disagreement either, and it is the important one

`csank-2022` differs because **LSEI already carries both summaries**:

```
lsei/literature/power-and-thermal/csank-2022-powering-the-moon.md     23190   (LSEI's own)
lsei/literature/power-and-thermal/csank-2022-powering-the-moon-2.md    7637
_intake/japanese-miracle/lit/csank-2022-powering-the-moon.md           7619
diff csank-2022-powering-the-moon-2.md  <->  JM copy   ->   IDENTICAL
```

The Scenario Explorer hit this exact collision already and resolved it by appending `-2`. Six such
files exist in LSEI and none in JM:

```
metzger-2013-bootstrapping-space-industry-2       azami-2024-lunar-manufacturing-review-2
metzger-2021-aqua-factorem-2                      csank-2022-powering-the-moon-2
poston-2020-krusty-reactor-design-2               speyerer-2013-persistently-illuminated-regions-2
```

Checked pairwise: every one is a second summary of a source whose first summary is already in LSEI.
None is a variant of a different paper. **`-2` is not a provenance record, it is a filename
collision handled by suffix, and it is invisible to retrieval** (see Part 7).

### The union is 182 filenames and it is not 182 sources

Deduplicating on the `## Citation` / `## Provenance` block's DOI or article URL rather than on the
filename, across the 182-file union:

```
citation block carries a DOI : 79    URL only : 55    neither : 48    no citation block : 3

confirmed duplicate summaries of one source, by exact DOI or article URL:
  10.1016/j.asr.2016.01.006      schreiner-2016-molten-regolith-electrolysis-sizing | schreiner-2016-mre-sizing-model
  10.1089/space.2019.0002        sowers-2019-psr-ice-mining | sowers-2019-thermal-mining-ice
  10.1126/science.1186986        colaprete-2010-lcross-ejecta-water-detection | colaprete-2010-lcross-water
  10.1080/00295450.2020.1725382  poston-2020-krusty-reactor-design-2 | poston-2020-krusty-reactor-design
  10.1016/j.icarus.2012.10.010   speyerer-2013-persistently-illuminated-regions-2 | speyerer-...-regions
  ntrs/20220004165               csank-2022-powering-the-moon-2 | csank-2022-powering-the-moon
  10.1061/(ASCE)AS...0000236     metzger-2013-bootstrapping-space-industry-2 | metzger-2013-...-industry
```

Seven confirmed by identifier; `azami-2024` and `metzger-2021` are the same shape but their sources
are preprints with no DOI printed, so the identifier check cannot confirm them and a human must.
Grouping the union by `(leading-author-token, year)` finds 17 groups holding more than one file and
20 surplus files; most are true duplicates, some (barnett-2025, ehricke-1981, nasa-2025) are
genuinely distinct documents by the same author in the same year. **Nine or more of the 182 are
second summaries of a source already counted.** The corpus has no mechanism that notices, because
the key everyone has been using is the filename and the filename is not the source's identity.

**Correction to the published inventory:** 182 is the count of distinct summary filenames. The count
of distinct *sources* is lower, in the 162–173 range, and is not knowable without resolving the
103 files whose citation blocks carry no DOI. That number is an echo site and should be registered
as one.

### The policy

1. **Dedup key is the source identifier, not the filename.** DOI where printed; else publisher
   article URL; else `(normalized first author, year, first six title words)` from the citation
   block. Filename is never the key.
2. **A source with two summaries keeps both.** Deleting one destroys work and neither is wrong —
   `csank` short and `csank` long are a brief summary and a comprehensive one, written to different
   briefs, and Part 4's evidence is that they do not contradict. The long one is `PRIMARY`, the
   short one is `SECONDARY`, recorded in the `## Provenance` block as
   `- **Role:** primary | secondary of <identifier>`. Primary is the more complete unless the
   shorter one carries figures or numbers the longer lacks.
3. **Filename disambiguation is semantic, never numeric.** `csank-2022-powering-the-moon` and
   `csank-2022-powering-the-moon-brief`. Never `-2`. Retrieval can see a word; it cannot see a
   digit (Part 7 proves this).
4. **Which wins when they genuinely conflict:** nothing wins automatically. A numeric conflict
   between two summaries of one source is a `CONTESTED` entry in the register (Part 6) pointing at
   both, and the answering loop returns both. That is the same machinery the Beason/Henderson pair
   needs, applied to an intra-corpus case. Cost of reusing it: zero.
5. **Who decides:** nobody, at merge time. The merge records; it does not adjudicate. Adjudication
   is a domain call and belongs to The Growth Economist or The Space Resources Engineer at the step
   that touches the claim.
6. **Where the losing version goes:** nowhere. There is no losing version. The five dereferencing
   edits are the one exception — the dereferenced LSEI text is taken and the JM text discarded,
   because the discarded text contains paths that do not resolve.

---

## Part 5. Provenance and mechanism

### Where provenance is recorded

**It is not recorded today.** Three files out of 277 mention which project produced them. The
`## Provenance` block already present in 15 files is the precedent to generalize, and it is a good
one — structured, key-value, already machine-readable:

```
## Provenance
- **Source file:** `prettyman-2006-lunar-elemental-composition.pdf` (on disk, project root; 41 pp, ...)
- **Document type:** Peer-reviewed research article
- **Authors:** ...
- **Venue:** ...            - **Year:** ...
- **DOI:** `10.1029/2005JE002656`
- **Publisher URL:** https://doi.org/10.1029/2005JE002656
- **Publisher / copyright line (as printed):** Copyright 2006 by the American Geophysical Union
```

Note the first line: it points at a PDF path that does not resolve. That is the inherited rule
failing inside the corpus itself, and Part 9's pull is what fixes it.

**Every merged summary gets a `## Provenance` block carrying, at minimum:**

```
- **Origin corpus:** scenario-explorer | japanese-miracle | both
- **Origin path:** lsei/literature/power-and-thermal/csank-2022-powering-the-moon.md
- **Merge disposition:** identical | dereferenced | primary | secondary | net-new
- **Reconciled against:** <identifier of the other copy, or "n/a">
- **Source identifier:** doi:... | url:... | authoryear:...
- **Source file:** literature/_pdf/<taxonomy>/<name>.pdf | not held
- **Also:** <second taxonomy folder, or omitted>
- **Licence:** own-summary | contains-transcribed-source-text     <- Part 8
```

In the file, not in a sidecar manifest. A manifest is a second place for the truth to live and it
drifts from the file it describes the first time someone edits one and not the other. The merge step
*also* emits `literature/INDEX.tsv` as a derived artifact, regenerated from the blocks and never
hand-edited, so the whole corpus is queryable without 182 file reads.

### Build step or one-time landing

**One-time landing, with a re-runnable verifier.** Not a re-running build.

Under A3 the working copies float on `main`. A merge that re-runs fires against a moving upstream
corpus, and every re-run would overwrite hand-made decisions — the taxonomy placement of a
cross-listed source, the primary/secondary call on a duplicate pair, the register pairings — with
whatever the script computes from filenames that day. Those decisions are the merge's actual value.
A build step destroys them on a schedule.

**Under A2 the Japanese Miracle side is settled: `_intake/` empties and never refills.** Only the
Scenario Explorer side moves. So the mechanism is: land once; then a checked-in
`oracle/verify_corpus.js` that re-runs on demand, reads `lsei/literature/` and `literature/`, and
reports **drift** — sources upstream that are not here, sources here whose upstream copy has changed
hash, provenance blocks missing required fields, filenames failing the naming regex, duplicate
identifiers with no primary/secondary call, register entries pointing at files that do not exist. It
reports; it does not write. Landing an upstream addition is a human decision that takes ten seconds
and preserves the ninety that came before it.

*Under the alternative to A3 (pinned working copies, The Systems Engineer's call at 0.2), drift is
bounded to the moments the pin is bumped, and `verify_corpus.js` becomes a pre-bump check rather
than a standing one. It is still needed. Pinning changes when it runs, not whether.*

### The PDF mechanism

The existing rule works at depth and is case-insensitive here, verified with `git check-ignore`:

```
literature/x.pdf            IGNORED       literature/x.PDF        IGNORED
literature/isru/x.pdf       IGNORED       literature/a/b/c/x.pdf  IGNORED
literature/x.pdf.bak    NOT ignored       oracle/x.pdf        NOT ignored
docs/x.pdf              NOT ignored       x.pdf               NOT ignored
```

It is necessary and it is not sufficient. Three holes, and the third is the one that matters.

1. **Path-scoped.** A PDF anywhere but `literature/` or `_intake/` commits cleanly. Fix: replace the
   two scoped rules with a repository-wide `*.pdf` and add the other carriers of published source
   text and page images — `*.djvu`, `*.epub`, `*.docx`, `*.doc`, `*.pptx`, `*.ps`, `*.tif`,
   `*.tiff`. Page scans are the same licence problem as the PDF and are not covered today.
2. **Extension-scoped.** `x.pdf.bak`, `x.pdf.txt`, an extracted `.txt` of a full paper — all commit.
   Fix: a size-and-content gate, not a name gate.
3. **A git hook is not a mechanism, because hooks are not cloned.** This is the one that would have
   been missed. `.git/hooks/` does not travel with a clone, so a `pre-commit` hook written today
   protects this machine and nobody else's, and the rule "has drifted out of memory" is exactly the
   case where the person committing is on a fresh clone. The mechanism has to be something a clean
   clone gets. Two parts, both checked in:
   - `oracle/check_no_sources.js`, committed, which scans the staged set (or the tree) and **exits
     non-zero** on any file matching the extension list, any file over a threshold (500 KB, chosen
     because the largest summary is 28 KB and the smallest PDF in the tree is 180 KB), and any file
     whose first bytes are `%PDF`. Magic-byte checking is what catches the renamed file.
   - `CLAUDE.md`'s bootstrap installs it as `core.hooksPath` on first run. That is The Systems
     Engineer's file and this is a dependency on his Objective 2 work; **flagged for 0.3.** If he
     declines to have the bootstrap write git config, the fallback is that the check is a step in
     the commit procedure and the CI job on the public repository, which is weaker but survives.

---

## Part 6. The contested-claims register, as merge structure

The requirement is that the pairing survive as structure, findable from either member, and that
retrieval reach the second given the first. Assigned to me by The Recruiter; contents come from The
Growth Economist and The Space Resources Engineer in parallel; the retrieval assertion is The
Software Engineer's.

**Both a sidecar and an in-file block. Not either.** They fail differently, and the point is that
they cannot fail at the same time.

### 1. `literature/REGISTER.tsv` — the register itself, hand-maintained, committed

One row per member. Tab-separated because it is diffable, greppable, sortable and has no parser.

```
id      claim                        axis                     side     file                                       verdict
IP-01   MITI targeting raised        did selective credit      for      development-and-industrial-policy/wade-2018-...      contested
IP-01   productivity growth in Japan and targeting work        against  development-and-industrial-policy/beason-1996-...    contested
IP-01                                                          against  development-and-industrial-policy/henderson-2008-... contested
KR-01   keiretsu main-bank groups    is the received account   for      development-and-industrial-policy/hoshi-1991-...     contested
KR-01                                evidenced                 against  development-and-industrial-policy/miwa-2002-...      contested
ICE-01  PSR ice grade at Cabeus      instrument disagreement   for      lunar-ice-and-geology/colaprete-2010-...             open
ICE-01                                                         against  lunar-ice-and-geology/litvak-2024-...                open
DUP-01  Csank 2022 microgrid AC/DC   two summaries, one source n/a      power-and-thermal/csank-2022-powering-the-moon.md    n/a
DUP-01                                                         n/a      power-and-thermal/csank-2022-powering-the-moon-brief.md n/a
```

`id` groups. Two or more rows share an id and *that* is the pairing; a set of three is expressed by
three rows, so the schema handles n-way disagreement without a "pair" assumption that will break the
first time a claim has three positions. `verdict` is `contested` / `open` / `settled-for` /
`settled-against` and is the domain personas' to set, not mine. Part 4's duplicate-summary case
reuses the same rows for free.

**Why it is the source of truth:** it is one file, so The Growth Economist and The Space Resources
Engineer can each write their own rows without touching 40 summaries, and a human can read the whole
register in one screen. That is the property The Recruiter's argument turns on.

### 2. `## Contested` block in every member file — the redundancy that makes it structure

```
## Contested
- **IP-01** against — paired with `development-and-industrial-policy/beason-1996-targeting-japan.md`,
  `development-and-industrial-policy/wade-2018-developmental-state-dead-or-alive.md`
```

Generated from `REGISTER.tsv`, never hand-written. Emitted by the merge and refreshed by
`verify_corpus.js`. It exists for one reason, and it is the reason the sidecar alone is not enough:
**retrieval reaches a file, not a register.** `searchLiterature()` returns a filename. Whatever
consumes that filename opens the file. If the pairing is only in a sidecar, the loop has to *decide*
to consult it, and a register consulted after retrieval is a reconciliation — which is precisely
what "classification happens before retrieval, not after" forbids. With the block in the file, the
pairing arrives with the hit and the second member's path is already in hand. No decision, no
lookup, no rule anyone can forget.

### 3. How retrieval finds the second member given the first

Three ways, deliberately redundant:

- **In-band:** the winning file carries its partner's path in its own `## Contested` block. Zero
  extra I/O. This is the one that works when everything else has been forgotten.
- **Token-level, no code change:** the block's `IP-01` string is in the file body, so
  `confirmInText()` sees it, and a grep for `IP-01` across `literature/` returns every member of the
  set. `idf("ip")` is near-maximal — the token appears in two or three files out of 182 — so it is
  the strongest signal the existing mechanism can carry. This works *today*, against unmodified
  `literature_search.js`, which is worth something given Part 7.
- **Out-of-band:** `REGISTER.tsv` is one grep for the whole set, for a caller that wants it up front.

**The invariant is The Software Engineer's to assert** — a question touching a registered claim
returns every member of the set or refuses. I am handing him three ways to satisfy it and a schema
that does not assume pairs. **What I need from him at 0.3:** confirmation that the loop reads the
`## Contested` block before it composes an answer rather than after, since if it reads it after, the
in-file block has bought nothing and we are back to reconciliation.

**Drift protection:** `verify_corpus.js` fails if any `REGISTER.tsv` path does not exist, if any
`## Contested` block disagrees with the register, or if any id has fewer than two rows. A register
that can silently point at a deleted file is a document somebody consults.

---

## Part 7. What breaks in `literature_search.js`

Read in full, then run against a 190-file probe corpus assembled in the scratchpad from both corpora
and deleted afterward. Results are from execution, not inspection.

### Still works

- **`listCorpusFiles()`** — unchanged. Walks to any depth, hard-codes no folder names, sorts. The
  header comment claims shape-agnosticism and the claim holds: identical queries against the flat
  190-file probe and the 8-folder LSEI corpus returned identical rankings, only the paths differing.
  **Any taxonomy in Part 2 is free.**
- **`requireNonEmptyCorpus()`** — unaffected by size.
- **`tokenize()`, `filenameTokens()`** — underscores and spaces already fall out of `[a-z0-9]+`.
- **`corpusDocFrequency()` / `idf()`** — 182 files instead of 158 shifts scores about 4% and changed
  no rank observed. Cache is per-directory and correct.

### Degrades

- **`scoreFile()` bonuses** (Part 1a). +3 author and +3 year require hyphen delimiters. Nine files
  fail both. Fixed by the naming rule, not by touching this file.
- **`citationForFile()`** — matches a filename against the app's `REFERENCES` register. **None of
  the 24 Japanese Miracle sources are in the app's `REFERENCES`,** so it returns `null` for all of
  them. Documented as the "direct filename citation" branch, so it degrades by design rather than
  breaking. But it now returns `null` for a much larger share of hits than the prototype ever saw,
  and whatever `answer_question.js` does on the `null` branch is now the common path rather than the
  rare one. **The Software Engineer should check that branch.** Not mine to change.

### Fails

**1. Two summaries of one source score identically and the tiebreak is alphabetical.** Measured:

```
query: "What does Csank 2022 say about AC versus DC lunar microgrid transmission?"
  OK  csank-2022-powering-the-moon-2.md   score=12.02  frac=0.70   <- returned as best
  OK  csank-2022-powering-the-moon.md     score=12.02  frac=0.70

filenameTokens("csank-2022-powering-the-moon-2.md") -> ["csank","2022","powering","moon"]
filenameTokens("csank-2022-powering-the-moon.md")   -> ["csank","2022","powering","moon"]
```

Identical. The `-2` is filtered by `t.length > 1`. Scores tie, `frac` ties, and `best` falls to
`listCorpusFiles()`'s sort order — which puts `-2` first. **The Oracle deterministically cites the
7 KB imported summary and never the 23 KB one, for a reason that has nothing to do with the
question, and this is live in the Scenario Explorer today.** Same shape for the other five `-2`
files and for `colaprete-2010-lcross-water` / `colaprete-2010-lcross-ejecta-water-detection`,
`paige-2010-diviner-psr-cold-traps` / `paige-2010-diviner-cold-trap-temperatures`, and
`sanders-2025-nasa-isru-progress-review` / `sanders-2025-nasa-lunar-isru-progress-review`. Fixed by
Part 4's semantic-disambiguation rule, in the merge, without touching this file.

**2. `best` is a single file and structurally cannot express the invariant.**
`searchLiterature()` returns `best = candidates.find(c => c.confirmed) || null`. One winner. The
contested-claims invariant requires all members of a set or a refusal. **This is a rebuild of the
return contract, not an extension** — and it is the one thing in this file I would rebuild. The
minimum change is a `bestSet` that returns every confirmed candidate whose `## Contested` id matches
the winner's. Naming it here so The Software Engineer can cost it.

**3. The merge makes cross-field questions answerable and one-sided at the same time.** The sharpest
result, and it is not what I expected going in:

```
"Did Japanese industrial policy targeting raise total factor productivity, and does that
 mechanism transfer to lunar ISRU capital deepening?"
   LSEI-only (158): best = NULL   -> REFUSE
   MERGED  (190):   best = beason-1996-targeting-japan.md  (frac 0.66)
                    candidates: nakamura, sanders-2025, kerslake — henderson NOT RETURNED AT ALL
```

The merge does not break the search. It converts an honest refusal into a **confident, well-cited,
one-sided answer** on precisely the class of question the merge was performed to enable. Beason is
returned; Henderson, the counter-source, is not in the candidate list. That is The Recruiter's
failure mode, reproduced on the first cross-field query I tried, before any register exists.

**4. And the question that names both sides refuses.**

```
"Is the evidence that MITI targeting worked, or is the myth-of-MITI critique right?"
   MERGED: best = NULL -> REFUSE
      henderson-2008-myth-of-miti.md  score=7.21  frac=0.10   <- gated out
      beason-1996-targeting-japan.md  score=2.36  frac=0.27   <- gated out
```

Both members rank at the top and both fail the `frac >= 0.45` confirm gate. That threshold was tuned
against a 156-file single-field lunar corpus where a question's remaining tokens all came from one
vocabulary. A two-field question spreads its tokens across two vocabularies and no single summary
can carry 45% of them. **The gate that made the prototype trustworthy makes the merged corpus mute
on its best questions.** It needs re-tuning against the merged corpus, and re-tuning it is a
measurement, not a guess: it is The Software Engineer's, it needs a labelled question set, and the
gameplan has to schedule building that set.

---

## Part 8. Open Question 8 — the merge audit. **Yes. Bounded. Escalates.**

### Method

`pdftotext` is available. `_intake/` holds 112 PDFs paired by filename to their summaries, so this
is a measurement rather than a reading exercise. For each summary I normalized both the summary
section and the extracted PDF text (lowercase, alphanumeric, whitespace-collapsed), formed 10-gram
shingle sets, and computed the fraction of the summary's shingles occurring verbatim in the source.
Ten grams is long enough that incidental overlap is near zero and short enough to survive
de-hyphenation.

**Controls run first, because a detector with no control is an opinion.** Nine files carry a section
heading that *declares* transcription (`## Abstract (transcribed from title page)` and variants). If
the detector works it should light up on those and stay dark elsewhere.

```
prettyman-2006-lunar-elemental-composition     100.0%      andrews-hanna-2025-spa-magma-ocean    40.9%
levin-2025-lunar-crustal-kreep-distribution     95.6%      hagerty-2011-spa-basalt-pond-thorium  39.4%
mcleod-2017-extraterrestrial-ree                74.0%      lawrence-2003-small-area-thorium      11.4%
castillo-rogez-2022-ceres-habitability          54.1%      wilson-2018-lp-thorium-reconstruction 11.2%
crawford-2015-lunar-resources-review             0.0%   ("transcribed / paraphrased" — genuinely paraphrased)
```

Detector confirmed. The two 11% readings are text-layer defects (column interleaving), not evidence
of paraphrase; the sources are two-column JGR papers whose extraction is known-bad in this corpus.

### Census

Then run over **all 112 PDF-paired summaries** rather than a sample — the whole population on the
side where PDFs exist. 108 abstracts testable; 4 skipped for missing or image-only text layers.

```
median verbatim 10-gram overlap                       :  0.0%
abstracts at >= 10% verbatim                          :   12
   of which SELF-LABELLED as transcribed              :    8
   of which NOT self-labelled                         :    4
```

The four unlabelled ones:

```
gott-2024-card-gas-analysis-subsystem       79.8%    schreiner-2016-mre-sizing-model      44.0%
romer-1990-endogenous-technological-change  38.4%    turyshev-2026-orbital-data-centers   11.9%
```

Inspected `gott-2024` against page 1 of its PDF: the summary's `## Abstract` reproduces the source's
printed abstract, **inside quotation marks, with an ellipsis and the trailing note
`(abridged, as printed on p.1)`.** It is a marked, attributed quotation, not an unmarked lift. That
distinction matters for what kind of problem this is, and not at all for whether it is one.

A separate sample of 40 files tested the `### Key findings` sections — the corpus's longest prose.
**Maximum 1.9%, median 0.0%.** The body of these summaries is the project's own writing. That is
worth saying plainly, because the finding below is narrow and should not be read as broader than it
is.

**A false positive worth recording so nobody re-raises it:** 43 files contain the phrase "extracted
text" or "source text extraction." Every instance inspected refers to *how the summarizer read the
PDF* — text-layer defects, column interleaving, page rasters at 200 dpi. It does not indicate
reproduction. Grepping for that phrase is not an audit.

### Finding

**Thirteen files carry a section that reproduces the source's own printed abstract, verbatim or
near-verbatim.** Nine declare it in their heading; four do not, and one of those four marks it with
quotation marks instead. Every one is a third-party copyrighted abstract (AGU, Elsevier, Springer,
AAS, ICES). All nine declared files exist **identically in both corpora**, so the merge inherits
them either way and neither corpus is the source of the problem.

**Confidence: high for the files tested, and the tested set is the whole population on one side.**
The precise scope limit, stated rather than papered over: **this audit could only run where a PDF
sits on disk.** That is 112 of 182. The 63 Scenario-Explorer-unique summaries have no local PDF and
**were not tested.** They are also the 59 written in the richer "Comprehensive Technical Summary"
format (Part 3), which is a format with more room for transcription, not less. **I do not know
whether they are clean and I will not guess.** Part 9's pull is what makes finishing this audit
possible, which is why the pull is a prerequisite for closing Question 8 rather than an
optimization.

**Consequence: not mine to decide, per the brief. It escalates to the author at 0.8.** What I will
say is what the options cost, since the author should not have to derive that:

- Under A1 (public), the Scenario Explorer's own licence language is already explicit that a
  public-domain dedication covers this project's summaries and cannot cover the sources they
  describe. Thirteen files contain text that is not ours to dedicate.
- Rewriting 13 abstracts in the project's own words: half a step. It is the cheapest option and it
  removes the question rather than managing it.
- A `NOTICE.md` naming the 13 files as excepted, on the `lsei/NOTICE.md` precedent, which already
  exists in this lineage for `signs_of_ai_writing.md`: cheaper still, but it leaves third-party text
  in a repository dedicated to the public domain and grows by one line every time it happens again.
- Doing nothing is only available under a private repository, and Open Question 2 is open.

**Recommendation, offered not decided: rewrite the 13.** The `## Provenance` field
`- **Licence:** contains-transcribed-source-text` exists so the set is enumerable at any later date
rather than rediscovered, and `verify_corpus.js` fails the build if a file carries that flag and the
repository is configured public.

---

## Part 9. The Scenario Explorer PDF pull

Surveyed shallowly, by directory and by count. No file in that tree was read for content.

### Verification of the orchestrator's survey, by count

```
context/reference/lit/                   5 pdf   26 md
  scenario_undercarriage_sources/       46 pdf   44 md
  japanese miracle lunar economy lit/  111 pdf  118 md
  fission_program_primaries/             1 pdf    0 md
  _extracted/ (+ 8 render subdirs)       0 pdf    1 md
  _QUARANTINED_prior_art/                0 pdf   26 md
                             TOTAL:    163 pdf  215 md      601 MB of PDF
```

163 unique PDFs: **confirmed**, and 163 unique basenames, so no cross-directory name collisions.

**Three corrections to the survey as handed to me.**

**(a) `_QUARANTINED_prior_art/` holds no PDFs at all.** Twenty-six entries, all `.md`. A PDF-only
pull cannot touch it, so the prohibition is self-enforcing rather than a rule someone must remember.
The reason for the quarantine remains unestablished and remains a prerequisite for anyone wanting
those 26 summaries; it is not a prerequisite for this pull.

**(b) The tree is not 163 PDFs of new material. It is 52.** `japanese miracle lunar economy lit/`
is the origin of `_intake/`, verified by name:

```
origin JM dir 111 pdf / 377 MB      _intake 112 pdf / 378 MB
in origin but not in _intake : none
in _intake but not in origin : gott-2024-card-gas-analysis-subsystem.pdf  (came from elsewhere)
PDFs in the tree not already in _intake : 52   (224 MB)
```

So 111 of the 163 are already on disk here. **The pull is 52 files and 224 MB**, concentrated in
`scenario_undercarriage_sources/` (46 PDFs, 197 MB), plus 5 at the `lit/` root (27 MB) and 1 in
`fission_program_primaries/` (0.3 MB).

**(c) "Directory adjacency" is not a rule a machine can follow, and stating it as one would be a
copy.** The observed pattern is real but it is not bare co-location — it is a shared author-year
token across two naming conventions: `azami2024_review.pdf` ↔
`azami-2024-lunar-manufacturing-review.md`, `belbin2024_vsat.pdf` ↔
`belbin-2024-vsat-grd-demonstrator.md`, `colaprete2010.pdf` ↔
`colaprete-2010-lcross-ejecta-water-detection.md`. Co-location alone is not sufficient because
`scenario_undercarriage_sources/` holds 46 PDFs against 44 summaries: adjacency says every PDF in
that folder is adjacent to every summary in it, which is 2,024 candidate pairings. I implemented
adjacency as a tier and it produced garbage — `un-1967-outer-space-treaty` matched thirteen PDFs
including `deming-1967-japan-quality-control.pdf`, because 1967 is a year both share. **A garbage
match is worse than a miss**: a miss is visible, and a wrong PDF silently attached to a summary is
the exact "plausible source rather than the right source" failure this project exists to refuse.

### The rule, stated so someone else can execute it

Normalize any basename as in Part 1. Define `author(b)` = the leading run of `[a-z]`,
`year(b)` = the first four-digit `19xx|20xx` anywhere in the name.

```
For each summary S in the merged corpus:
  T1  a PDF whose normalized basename == normalized basename of S    -> pair, deterministic
  T2  else, exactly one PDF in the tree with author(P)==author(S)
      and year(P)==year(S)                                           -> pair, deterministic
  T3  else, more than one such PDF                                   -> HAND QUEUE (ambiguous)
  T4  else, none                                                     -> HAND QUEUE (unmatched)
No further automatic tier. T3 and T4 are resolved by a person, never by a heuristic.
```

Measured against all 158 Scenario Explorer summaries:

```
T1  exact/normalized filename        92
T2  unique author+year               34
T3  ambiguous (>1 candidate)         10
T4  unmatched                        22
    deterministic                   126 of 158;  136 reachable once the 10 are resolved
```

Measured against the full 182-file union with `_intake/` included:

```
T1 116   T2 32   T3 12   T4 22      deterministic coverage 148 of 182 (81%)
```

**Hand-queue resolution rule, and it is cheap because the corpus already carries the answer.** Every
summary's `## Citation` or `## Provenance` block prints title, authors, venue and usually a DOI.
Every PDF prints its title and byline on page 1. `pdftotext -l 1` on a candidate and a string
comparison against the summary's citation title settles it in seconds. Thirty-four of these, once.
The result is recorded in `## Provenance` as `- **Source file:**`, so it is never re-derived.

### The four edge cases the addendum asks about

**A PDF matching no summary.** Do not pull it. Twenty-five such orphans exist. A PDF with no summary
is a source this project has not read, and pulling it puts an unread, unsummarized, non-shipping
binary into a tree whose entire discipline is that every PDF sits beside its summary. Record the
orphan list in the merge report as *candidate future sources* and stop. Four are named in the design
notes as net-new by filename: `dr-michael-nayak-luna-10`, `lsic-newsletter-2026-june-final`,
`moon-base-architecture-users-guide`, `nasa-data-gaps-acr25-wp-data-gaps-v3` — and three of those
four **do** have summaries, so they are T1 pairs, not orphans. The distinction is worth keeping
straight: net-new-by-name and orphan are different sets.

**A summary matching no PDF.** Keep the summary, record `- **Source file:** not held`, and move on.
This is normal and it is 22 files. Inspected: the treaties (`un-1967`, `un-1972`, `un-1979`) are
`.txt` already in `_intake` and have no PDF because they never had one; `falcon-heavy-wikipedia` and
`payload-research-starship-cost` are web sources; `rostami2018-figures` is a figure-extraction file
whose parent PDF is elsewhere; the rest are NASA documents whose PDFs live outside this tree. **No
summary is deleted for want of a PDF.** The summary is this project's work and it ships; the PDF is
a convenience for the team and it does not.

**Two PDFs, one summary.** Both are pulled, both are recorded, neither is discarded. Verified that
this is the right call rather than the safe one: `cannon2020_britt_icarus.pdf` and
`cannon2020_et_al_GRL.pdf` sit against one `cannon-2020-lunar-ice-geologic-model.md`, and they are
two genuinely different papers that one summary covers — an *Icarus* paper and a *GRL* paper.
Discarding one would destroy a source. `## Provenance` takes a list:

```
- **Source file:** literature/_pdf/lunar-ice-and-geology/cannon-2020-britt-icarus.pdf
- **Source file:** literature/_pdf/lunar-ice-and-geology/cannon-2020-et-al-grl.pdf
```

If a person determines the two PDFs *are* the same document, keep one and note the discard. That is
a decision, not a default. The ten ambiguous cases are: metzger-2013, azami-2024, schreiner-2016,
sowers-2019 (four candidates against two summaries), kornuta-2019, cannon-2020, colaprete-2010,
paige-2010, sanders-2025.

**One PDF, two summaries.** Falls out of Part 4: the primary/secondary pair both point at the same
`- **Source file:**`. One file on disk, two references to it.

### Where the pulled PDFs land

The directory map says PDFs sit "on disk beside their summaries." Two readings, and the map does not
distinguish them. **Recommendation: `literature/_pdf/<taxonomy-folder>/<name>.pdf`, mirroring the
summary tree, rather than literally interleaved.**

Reasons, in order of weight:

1. `listCorpusFiles()` walks `literature/` recursively and takes every `.md`. It ignores `.pdf`
   entirely, so either layout is safe for retrieval. Neither reading is forced by the code.
2. Interleaved, `ls literature/lunar-ice-and-geology/` shows 40 entries where 20 are the corpus. The
   corpus becomes half as readable at exactly the moment it doubles in size.
3. A separable subtree makes the ignore rule and the pre-commit check trivially auditable — one path
   holds every binary in the repository — and it means a person can delete 600 MB with one `rm -rf`
   without touching a summary.
4. It keeps "beside" true in the sense the map cares about, which is that the pairing is on disk and
   discoverable, and the `- **Source file:**` line in each `## Provenance` block makes it a
   reference a machine can follow.

**This is a variance from the directory map's literal wording and I am flagging it as one.** The map
is the author's ruling and it is not mine to revise. If the author reads "beside" literally,
interleaved works and costs only readability; nothing else in this plan changes.

### Disk cost, for the verdict

```
pull as specified (52 net-new PDFs)                    224 MB
already held in _intake/                               378 MB
merged corpus total once landed                        602 MB   (of which 0 bytes push)
whole origin tree if pulled indiscriminately           601 MB PDF (+ a 4.1 GB folder — do not)
```

**224 MB is the cost of this step.** It interacts with Open Question 7 (copy or move): if the
Japanese Miracle original is deleted after the merge lands, the net change on the OneDrive-synced
tree is +224 MB and −378 MB, which is a *saving* of 154 MB. Worth putting in front of the author,
since Question 7 currently reads as a pure hygiene question with nothing turning on it.

---

## Proposed gameplan steps

Ordered. The orchestrator renumbers at 0.3. Dependencies are on step ids here, not on numbers.

| # | Step | Assigned To | Depends on |
|---|---|---|---|
| **M1** | **Freeze the naming rule and the source-identifier rule.** Write `literature/NAMING.md`: the normalization rule from Part 1, the `^[a-z0-9]+(-[a-z0-9]+)*\.md$` regex, the author-year-topic convention, the semantic-disambiguation rule from Part 4.3, and the dedup-key precedence (DOI → article URL → author/year/title). One page. Nothing lands before this exists. | The Engineer | — |
| **M2** | **Build the source-identity table.** For all 182 union files, extract the `## Citation` / `## Provenance` block, parse DOI or publisher URL, emit `cr_scratch/merge_identity.tsv` with `file, corpus, identifier, identifier_kind, confidence`. Flag every file with no identifier (≈103) for M3. **Deliverable: the true distinct-source count, replacing 182.** | The Engineer | M1 |
| **M3** | **Resolve the duplicate set.** For the 17 author-year collision groups and every identifier collision from M2, decide same-source or different-source, and for same-source assign primary/secondary and a semantic filename. Two summaries are never merged into one and neither is deleted. Where they disagree on a number, emit a `DUP-xx` register row instead of adjudicating. | The Engineer, escalating substantive numeric conflicts to The Space Resources Engineer or The Growth Economist | M2 |
| **M4** | **Land the taxonomy.** Create the 11 folders from Part 2. Assign every file. Record second memberships as `- **Also:**`. Reviewed before anything moves — a taxonomy revised after the files are placed is a second migration. | The Engineer, reviewed by The Space Resources Engineer (the 7 lunar folders) and The Growth Economist (the 4 economics folders) | M1 |
| **M5** | **Execute the merge.** Copy, do not move. Case-insensitive collision detection, mandatory — Part 1b. Apply M3's dispositions. Emit a `## Provenance` block per Part 5 into every file. Take the LSEI text for the five dereferenced pairs. `_intake/` empties. **Output: `literature/`, ~182 files, zero PDFs.** | The Engineer | M3, M4 |
| **M6** | **Normalize the house format.** Insert `## Metadata` into the ~120 files lacking it, populated from their own `## Citation` paragraph. Drop the `## Comprehensive Technical Summary` marker from the 60 carrying it. Leave the 11 `## Provenance`-form files alone. Half a step, not a project — Part 3. | The Engineer | M5 |
| **M7** | **Pull the Scenario Explorer PDFs.** Execute Part 9's T1/T2 rule against `CSA_LSEI_Workshops/context/reference/lit/`, excluding `_QUARANTINED_prior_art/`. Land 52 net-new into `literature/_pdf/<taxonomy>/`. Resolve the T3/T4 hand queue (≈34 cases) against each summary's own citation block via `pdftotext -l 1`. Record every pairing in `## Provenance`. Emit the orphan list. **224 MB.** Read no content from that tree. | The Engineer | M5 |
| **M8** | **Complete the Open Question 8 audit.** Re-run Part 8's shingle detector over the 63 files that had no local PDF before M7. Flag every file at ≥10% verbatim with `- **Licence:** contains-transcribed-source-text`. **Report to the author; do not act on the result.** | The Engineer | M7 |
| **M9** | **Build the PDF containment mechanism.** Repository-wide `*.pdf` plus the other source-carrying extensions in `.gitignore`; `oracle/check_no_sources.js` with extension, size and `%PDF` magic-byte gates, committed; installed via `core.hooksPath` by the bootstrap. **Git hooks are not cloned — a hook alone is not a mechanism.** | The Software Engineer, with The Systems Engineer for the bootstrap half | M5 |
| **M10** | **Land the contested-claims register.** Create `literature/REGISTER.tsv` from The Growth Economist's and The Space Resources Engineer's 0.2 rows plus M3's `DUP-xx` rows. Generate the `## Contested` block into every member file. Part 6. | The Engineer, contents from The Growth Economist and The Space Resources Engineer | M5, and both 0.2 registers |
| **M11** | **Build `oracle/verify_corpus.js`.** Drift, naming, provenance completeness, duplicate identifiers with no primary/secondary call, register integrity, dangling `- **Source file:**` paths. Reports; never writes. Re-runnable. Part 5. | The Engineer | M5, M10 |
| **M12** | **Re-tune the retrieval confirm threshold and extend the return contract.** `frac >= 0.45` was tuned on a single-field 156-file corpus and mutes cross-field questions (Part 7.4). Build a labelled question set spanning lunar, economics and cross-field; re-tune against it; extend `searchLiterature()` to return a `bestSet` covering all members of a matched `## Contested` id. Not a merge step — a retrieval step the merge makes necessary. | The Software Engineer | M10 |

### TDD staging

M5, M6, M7, M9, M10 and M11 produce artifacts rather than prose, so A.4's document-shaped
precondition does not apply as written. What each does need is an assertion written before it runs.
Scheduled explicitly rather than folded into the step:

- **before M5:** assert 182 union files in, ≥182 out, zero `.pdf` under `literature/`, zero filename
  collisions under case-insensitive comparison, every output file carrying a `## Provenance` block.
- **before M7:** assert every landed PDF has a summary; assert zero files land from
  `_QUARANTINED_prior_art/`; assert byte count ≤ 250 MB (a pull materially larger than 224 MB means
  the rule over-fired and pulled orphans).
- **before M9:** assert `check_no_sources.js` rejects `x.pdf`, `x.PDF`, `x.pdf.bak`, a `%PDF` file
  named `.md`, and a 600 KB `.md`; assert it accepts the real corpus unchanged.
- **before M10:** assert every `REGISTER.tsv` path resolves; assert every id has ≥2 rows; assert
  every `## Contested` block round-trips against the register.
- **before M12:** the labelled question set *is* the test suite and it is built first. Re-tuning a
  threshold without one is guessing.

M8 produces a finding the author acts on, so it carries a written method and a stated confidence
before it runs, not after.

### Context recipes for the proposed steps

| Step | Files / excerpts |
|---|---|
| M1 | This file, Parts 1 and 4. `lsei/oracle/lib/literature_search.js`, the `baseName` / `filenameTokens` / `scoreFile` block. |
| M2 | The 182-file union. `## Citation` and `## Provenance` blocks only — not full bodies. |
| M3 | `cr_scratch/merge_identity.tsv`. The 17 collision groups' files, read in full. This file, Part 4. |
| M4 | Filename listings only, both corpora. This file, Part 2. The 24 JM-unique names. |
| M5 | `cr_scratch/merge_identity.tsv`, M3's dispositions, M4's assignment table, `literature/NAMING.md`, `.gitignore`, the gameplan's directory map. |
| M6 | One example of each format family: `metzger-2013-bootstrapping-space-industry-2.md` (Comprehensive), `beason-1996-targeting-japan.md` (canonical), `prettyman-2006-lunar-elemental-composition.md` (Provenance). Not 182 files in context. |
| M7 | Directory listing of `CSA_LSEI_Workshops/context/reference/lit/` only — **names and sizes, never contents**. This file, Part 9. The union filename list. |
| M8 | This file, Part 8, including the method and the control results. The 63 previously-untested summaries and their newly-landed PDFs. |
| M9 | `.gitignore`. The `git check-ignore` output in Part 5. The Systems Engineer's bootstrap contract from 0.2. |
| M10 | The two 0.2 contested-claims registers. This file, Part 6. M3's `DUP-xx` rows. |
| M11 | This file, Parts 5 and 6. `lsei/oracle/lib/literature_search.js` — the self-test at the foot is the pattern to copy. |
| M12 | `lsei/oracle/lib/literature_search.js` (full). This file, Part 7, including the four measured query results. `lsei/oracle/answer_question.js` routing logic. |

---

## Interfaces I need at 0.3

1. **The Software Engineer:** does the loop read the `## Contested` block before composing an
   answer, or after? After makes it a reconciliation and the in-file block buys nothing.
2. **The Software Engineer:** `citationForFile()` returns `null` for all 24 Japanese Miracle
   sources. What does `answer_question.js` do on that branch when it becomes the common path?
3. **The Systems Engineer:** will the bootstrap set `core.hooksPath`? M9's teeth depend on it, and
   git hooks are not cloned.
4. **The Systems Engineer:** M11's drift check is his divergence problem and mine. One tool, not two.
5. **The Growth Economist and The Space Resources Engineer:** `REGISTER.tsv` columns are
   `id, claim, axis, side, file, verdict`. Sets may exceed two. Rows, not prose.

## Echo sites this slice creates or touches

`158`, `119`, `112`, `95`, `63`, `24`, `182` (all verified), plus new ones this slice introduces:
`89` identical pairs, `6` differing pairs, `60` Comprehensive-format files, `13` transcribed-abstract
files, `52` net-new PDFs, `224 MB`, `11` taxonomy folders, `148 / 182` PDF coverage. The
distinct-*source* count is deliberately left unstated pending M2 rather than guessed.

## Problems, stated plainly

- **182 is wrong as a source count and it is in the gameplan, the design notes and this file.** It is
  a filename count. Echo site. Register it.
- **The confirm-threshold finding is the biggest thing I found and it is not mine.** The merge
  converts a refusal into a confident one-sided answer on cross-field questions. It fires before any
  register exists and it fires today.
- **Part 8 is answered yes and I cannot close it.** Thirteen files confirmed; 63 files untested
  because their PDFs are not here yet. M7 before M8, and M8 before the repository goes public.
- **The `-2` bug is live in the Scenario Explorer right now**, not just in the merged corpus. Its
  Oracle cites the wrong Csank summary today, deterministically, for six sources.
- **I am recommending a variance from the author's directory map** on where PDFs land
  (`literature/_pdf/` rather than interleaved). Flagged, not taken.
