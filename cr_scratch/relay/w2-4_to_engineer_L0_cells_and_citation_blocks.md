REVIEW — The Space Resources Engineer (W2-4) to The Engineer, and to whoever executes the merge into
`literature/`. Written mid-wave to a seat already building; this is NOT a BRIEF and does not
discharge arm 2a.

`cr_scratch/merge_plan.tsv` is yours and I have not touched it. Below are the cells for the five
`L0|none` rows, the two `## Citation` blocks those rows need written at landing, and one content
error in a corpus file that is outside my write set.

Reasoning, evidence and counting rules are in `cr_scratch/step2_space_resources_engineer_l0.md`.
This file is the paste-ready half.

---

## 1. The population is five rows, and the orchestrator's correction names the wrong missing one

My brief listed four rows. The complete `L0|none` set is five, all `review_owner = space-resources`:

```
awk -F'\t' 'NF==17 && $13 ~ /^L0/{print $2"\t"$5}' cr_scratch/merge_plan.tsv
dr-michael-nayak-luna-10.md      HOLD-NOID
falcon-heavy-wikipedia.md        LIFT-LSEI-SCRUB
nasa-clps-delivery-timeline.md   HOLD-NOID
rostami2018-figures.md           HOLD-NOID
take-or-make-in-space.md         HOLD-NOID
```

The orchestrator's mid-sitting correction says the row my brief omits is `rostami2018-figures.md`.
It is not: my brief names that row. **The omitted row is `falcon-heavy-wikipedia.md`**, and it is the
one that differs in kind — it is the only one of the five already dispositioned to land
(`LIFT-LSEI-SCRUB`), and it is the only one of the five that carries no citation block at all. A seat
acting on the correction as written would add a row that is already there and leave the real gap
open.

The four `HOLD-NOID` rows are the intersection of `HOLD-NOID` (34 rows) with `L0|none` (5 rows). The
brief's "complete set of rows with no derivable key" was measuring `HOLD-NOID ∩ L0|none`, not
`L0|none`.

## 2. Cells

`rev` is append-only, so each row bumps and the reason leads the basis. Columns are numbered as in
the header row: 5 `disposition`, 13 `dedup_key`, 14 `identifier`, 15 `id_in_source`, 16 `rev`,
17 `basis`.

### dr-michael-nayak-luna-10.md — LANDS with a level-3 key

```
disposition    LIFT
dedup_key      L3-PENDING|nayak|2024|program-update-10-year-lunar-architecture-luna-10
identifier     (empty)
id_in_source   yes
rev            2
basis          rev2: the file carries ## Citation and ## Metadata; NAMING.md section 7 derives the
               key from the citation block, not the filename, and the citation prints
               "Nayak, M. (2024, April 25). Program update: 10-Year Lunar Architecture (LunA-10)
               Capability Study". Year token absent from the FILENAME only. The printed
               "Publisher URL: https://www.darpa.mil" is a bare host and section 7 clause (a)
               refuses it at level 2A, so no identifier is recorded. Level 3 is a candidate, not a
               confirmation. Adjudicated by The Space Resources Engineer, Step 2 Wave 2.
```

### rostami2018-figures.md — LANDS with a level-3 key, and the DOI is DELIBERATELY WITHHELD

```
disposition    LIFT
dedup_key      L3-PENDING|rostami|2018|lunar-tunnel-boring-machines
identifier     (empty)
id_in_source   yes
rev            2
basis          rev2: no citation block; one is written at landing from the file's own printed
               header (title, three authors, venue "Earth and Space 2018", pages 240-252), all
               sourced from the document. THE DOI OF THE PARENT PAPER IS NOT COPIED IN. This file
               and rostami2018.md are two summaries of one paper, not a duplicate pair: one is the
               full technical summary, the other a figures-and-tables companion. rostami2018.md
               carries L1|10.1061/9780784481899.024. Writing that DOI here would make the two
               files a LEVEL-1 CONFIRMED duplicate, and the merge acts on level-1 confirmations,
               which would delete a distinct artifact. Left to collide at level 3, where section 7
               makes it a candidate for a person. Adjudicated by The Space Resources Engineer.
```

**This is the one cell in this relay that will look wrong to a checker and is not.** A file whose
sibling has a DOI, landing without it, is exactly the shape of an omission. The reason it is not one
is written into the citation block itself so a successor reading only the file can see it.

Also note for the duplicate rule ("take the larger file"): these two are **not** a duplicate pair and
that rule must not be applied to them. `rostami2018.md` is 19,130 bytes and
`rostami2018-figures.md` is 12,601 bytes, so a size rule applied here would drop the figures file and
lose all six figure readings.

### falcon-heavy-wikipedia.md — LANDS with a level-2A key

```
disposition    LIFT-LSEI-SCRUB   (unchanged)
dedup_key      L2|en.wikipedia.org/wiki/Falcon_Heavy
identifier     en.wikipedia.org/wiki/Falcon_Heavy
id_in_source   yes
rev            3
basis          rev3: no citation block; one is written at landing from the file's own Source /
               Retrieved / Type / Standing-caveat stanza. The article URL carries a path, so
               section 7 clause (a) is satisfied, it is not a mirror, not a resolver URL and not a
               search result, and no other union key holds it, so clause (c) leaves it a
               confirmation. This is the only one of the five that reaches level 2.
               Adjudicated by The Space Resources Engineer.
```

### nasa-clps-delivery-timeline.md — LANDS, key stays L0|none

```
disposition    LIFT-IDENTICAL
dedup_key      L0|none           (unchanged, and correct)
identifier     none
id_in_source   n/a
rev            2
basis          rev2: the file DOES carry a ## Citation block, so section 7's landing condition is
               met; what is absent is a key, not a block. The source is an undated NASA
               infographic and its own citation prints "(n.d.)" with the note that the graphic
               carries no publication or version date. No DOI, "Publisher URL: none in source",
               no agency or grant number. The filename carries no year either, so no key is
               derivable from the name any more than from the block. L0|none is a measured
               property of the source, not a gap in our record, and under the author ruling of
               2026-08-28 it is not grounds to withhold the file. Adjudicated by The Space
               Resources Engineer.
```

### take-or-make-in-space.md — LANDS, key stays L0|none

```
disposition    LIFT-IDENTICAL
dedup_key      L0|none           (unchanged, and correct)
identifier     none
id_in_source   n/a
rev            2
basis          rev2: the file carries a ## Citation block which states in terms that no DOI,
               journal, volume, conference series number or explicit publication year is printed
               anywhere in the source; the author is Harry W. Jones, NASA Ames, and the year is
               given as "circa 2023" from internal evidence. An inferred year is not a printed
               four-digit year and cannot found a level-3 key. Manufacturing L3|jones|2023 would
               also collide by candidate with jones-2019, jones-2020 and
               jones-superheavylift-final20260614.md, and this file's own citation block records
               that the last of those is a DIFFERENT PERSON, Karen L. Jones of The Aerospace
               Corporation. Adjudicated by The Space Resources Engineer.
```

## 3. The two citation blocks, to be written at landing

Written by The Space Resources Engineer, 2026-08-28. Every field is lifted from the target file's own
printed content; the one word not literally printed is flagged in place. Insert immediately after the
H1 title line of the landed copy in `literature/`, not in `lsei/` — `lsei/` is read-only for this
project.

### literature/isru-processing/rostami2018-figures.md

```markdown
## Citation

Rostami, J., Dreyer, C., & Blair, B. (2018). Lunar tunnel boring machines. *Earth and Space 2018*
(ASCE conference proceedings), pp. 240-252.

Publisher URL: none in this artifact.

*Note: this is a figures-and-tables-only companion summary, produced from visual analysis of the
rendered PDF pages of the paper summarized at `rostami2018.md`. No DOI is printed in this artifact.
The DOI carried by `rostami2018.md` is deliberately not copied here: the two files are two summaries
of one paper rather than a duplicate pair, and a shared level-1 DOI would resolve them as one
document, which the merge acts on. The pair is left to meet at level 3, where NAMING.md section 7
makes it a candidate for a person. Citation block written by The Space Resources Engineer,
2026-08-28, from the artifact's own printed header.*
```

Source lines in the artifact, for checking: line 1 (title, authors, year), line 3 (paper title),
line 4 (three authors and affiliations), line 5 (venue and pages), line 7 (the figures-only note).

### literature/logistics-and-delivery/falcon-heavy-wikipedia.md

```markdown
## Citation

Wikipedia. (n.d.). *Falcon Heavy*. Retrieved 2026-07-19, from
https://en.wikipedia.org/wiki/Falcon_Heavy

Publisher URL: https://en.wikipedia.org/wiki/Falcon_Heavy

*Note: tertiary reference (encyclopedia), cross-checkable to primary SpaceX and NASA figures. No
publication year is printed; the retrieval date is the only date the artifact carries. The list
prices in this summary are commercial sticker prices, not SpaceX internal cost, and the
marginal-cost analysis they feed is tracked separately. Citation block written by The Space
Resources Engineer, 2026-08-28, from the artifact's own Source / Retrieved / Type / Standing-caveat
stanza. "Wikipedia" is used as the issuer; the artifact prints the publication name, not a byline.*
```

Source lines in the artifact, for checking: lines 3 to 7, the bolded stanza under the H1.

## 4. A content error in a corpus file, outside my write set

`falcon-heavy-wikipedia.md` line 31 reads:

```
- Maiden flight 2026-02-06 (Tesla Roadster). Booster landings: 16 of 16 successful; center-core
  recovery succeeded once (Arabsat-6A, 2019).
```

**The maiden flight date is wrong. It is 2018-02-06, not 2026-02-06.** The file refutes itself two
ways inside two lines: a maiden flight cannot postdate the Arabsat-6A recovery it names as 2019 on
the same line, nor the Psyche launch it names as 2023 on the next. The Fact-Checker found the
inconsistency; I confirm the correct date is 2018-02-06, the Falcon Heavy demonstration flight
carrying the Tesla Roadster.

The error matters beyond tidiness: this file is the corpus's launch-price anchor, it is cited for the
$1,520/kg figure that `take-or-make-in-space.md` builds its whole breakeven argument on, and a 2026
maiden flight would make that price a 2026 datum rather than a 2018-generation one.

`lsei/` is read-only and `literature/` is not in my write set, so I am routing rather than fixing.
**Fix it on the landed copy, in the same edit that writes the citation block above** — both touch the
same file and neither is a dedup decision.
