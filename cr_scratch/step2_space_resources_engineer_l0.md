# Step 2 Wave 2, The Space Resources Engineer: the lunar fork collapsed, and five L0 rows adjudicated

**Persona:** The Space Resources Engineer (W2-4)
**Date:** 2026-08-28
**Write set:** `cr_scratch/step1_9_space_resources_engineer_register_rows.md`,
`cr_scratch/step1_9_space_resources_engineer_register_rows_addendum.md`, this file,
`cr_scratch/relay/`. Not `oracle/REGISTER.lunar.tsv`, not `cr_scratch/merge_plan.tsv`, not
`QUANTITIES.md`, not `lsei/` or `literature/`. None of those was written.
**Relay:** `cr_scratch/relay/w2-4_to_engineer_L0_cells_and_citation_blocks.md` — a REVIEW, not a
BRIEF, and not a discharge of arm 2a. It carries the paste-ready cells and the two citation blocks.

---

## 1. Premise check

**P1 HELD, and I add the two figures it does not state.** `oracle/REGISTER.lunar.tsv` holds 59
distinct member filenames in column 4 of its M rows, and all 59 resolve on disk under
`lsei/literature`, zero missing. It holds 81 M rows and 15 A rows, and its own `H` row pins 15 and 81
on the same line, so the census and the header agree inside one file.
`Q-LCC15-DISTINCT-LEAVES` was declared 58 in the parent and 59 in the addendum, as stated.

**P2 HELD EXACTLY.** At my wave open, `node tools/quantities.js --check` reported three lunar `M2`
duplicate ids — `Q-LCC15-MEMBER-ROWS`, `Q-LCC15-DISTINCT-LEAVES`, `Q-LCC15-LEAVES-READ` — and one
`M3` two-valued quotation, on `Q-LCC15-DISTINCT-LEAVES`. All four named my two Step 1 files and
nothing else.

**P3 IS FALSE, AND THE REFUTATION CHANGED WHAT I DID.** The complete set of rows carrying
`dedup_key = L0|none` is **five**, not four, and all five are `review_owner = space-resources`. The
row my brief omits is `falcon-heavy-wikipedia.md`, and it is the one that differs in kind: the only
one of the five already dispositioned to land, and the only one of the five carrying no citation
block at all — which under `oracle/NAMING.md` section 7 as written is the one condition that stops a
file landing. The brief's four rows are `HOLD-NOID ∩ L0|none`; `HOLD-NOID` is 34 rows and `L0|none`
is 5, and the brief was measuring the intersection while naming the second set.

The orchestrator's mid-sitting correction reaches the same count of five by an independent route and
then **names the wrong missing row**: it says my brief omits `rostami2018-figures.md`. My brief names
that row. A seat acting on the correction as written would re-add a row already present and leave the
real gap open. I found the fifth row before the correction arrived, by measuring the premise; the two
findings agree on the population and disagree on which member was missing, and the disagreement is
resolvable by reading the brief.

**One premise I was not given but had to settle.** My brief's item 2 offers three outcomes, the third
being "DOES NOT LAND". The author ruling relayed mid-sitting withdraws it: no file is withheld from
`literature/` for a metadata reason. That ruling does not change any of my five verdicts — all five
land under my adjudication either way — but it does put `oracle/NAMING.md` section 7 in direct
contradiction with the ruling, and that is routed below rather than fixed here.

---

## 2. The fork collapsed

### 2.1 What I changed

One edit across my two Step 1 files.

In `cr_scratch/step1_9_space_resources_engineer_register_rows.md`, three blocks corrected in place,
each with the old value moved into `superseded` with date, author and what was wrong:

| id | was | now | operation now |
|---|---|---|---|
| `Q-LCC15-MEMBER-ROWS` | 80 | **81** | `awk -F'\t' '$1=="M"' oracle/REGISTER.lunar.tsv \| wc -l` |
| `Q-LCC15-DISTINCT-LEAVES` | 58 | **59** | `awk -F'\t' '$1=="M"{print $4}' oracle/REGISTER.lunar.tsv \| sort -u \| wc -l` |
| `Q-LCC15-LEAVES-READ` | 43 | **44** | `manual:`, 59 items inspected |

**The `operation` and `population` moved with the value, and that was not optional.** The three
blocks measured the parent document's own liftable block, which is the pre-correction draft and
genuinely holds 80 M rows. Editing `value` to 81 and leaving that operation in place would have
produced a block whose own command returns a different number from its own value — a fresh defect
inside the correction. The population is now `oracle/REGISTER.lunar.tsv`, the promoted register of
record, which is where the corrected rows actually live, and both commands reproduce their values as
written. The parent's draft block is named in `population:` as the thing it is not.

Quoting prose updated in the same edit: line 15 ("forty-four of the fifty-nine summaries") and lines
934–935 of section 5.5 ("Fifty-nine distinct files are named… forty-four were opened… fifteen were
not"). 59 − 44 = 15, and the fifteen unopened leaves are named in section 5.5 and are unchanged.

In `cr_scratch/step1_9_space_resources_engineer_register_rows_addendum.md`, the three re-declared
blocks are **deleted**. Section 4 is rewritten to quote the three surviving blocks rather than
re-declare them, carrying `81 [Q-LCC15-MEMBER-ROWS]`, `59 [Q-LCC15-DISTINCT-LEAVES]` and
`44 [Q-LCC15-LEAVES-READ]` as quotation sites of the single surviving block of each id.

I did **not** run `--index`.

### 2.2 The count, with its digests, and why the two figures are not a delta

Exact command, run from the repository root, 55 characters:

```
node tools/quantities.js --check
```

| moment | hard failures | read-digest | files | tool | flags |
|---|---|---|---|---|---|
| my wave open, before any edit of mine | **15** | `980220e52dc19cd7` | 110 | 2.19-1 | `--check` |
| after my edit, first run | 8 | `e1c4e503ecc3b93f` | 117 | 2.19-1 | `--check` |
| after my edit, second run | 8 | `a719ac9fff065b0a` | 119 | 2.19-1 | `--check` |
| my close, with this file in the set | **5** | `73c26e3dca21bd71` | 122 | 2.19-1 | `--check` |

The last row moved for reasons that are not mine: between the second run and the close, The Engineer's
three block repairs landed and cleared the `M1` on `Q-PLAN-CHURN` and both `M11` failures on
`cr_scratch/step2_engineer_dispositions.md`. Nothing of mine changed between those two runs except
the addition of this file, which contributes one consistent `59` site to the residual `M3` and no
failure of its own.

**These are four measurements of four different repositories and 15 → 5 is not a number I own.**
The declared file set moved from 110 to 122 during my sitting and I moved three of those files; other
seats moved the rest. Standing clause 3 forbids differencing them and I am not differencing them. My
brief's own quoted baseline, `5b27609c1744300e` over 101 files, is a fifth moment again.

Note also that the brief's baseline and my wave-open run both report 15 at different digests over
different file sets. Equal counts at different digests are no more comparable than unequal ones.

**What I do own is the FAIL lines, and those compare exactly regardless of digest.** At my wave open
four FAIL lines named my two files:

```
FAIL M2 duplicate id Q-LCC15-MEMBER-ROWS in ...rows.md:497 , ...addendum.md:383
FAIL M2 duplicate id Q-LCC15-DISTINCT-LEAVES in ...rows.md:515 , ...addendum.md:401
FAIL M2 duplicate id Q-LCC15-LEAVES-READ in ...rows.md:790 , ...addendum.md:419
FAIL M3 Q-LCC15-DISTINCT-LEAVES quoted with 2 distinct values:
     58(QUANTITIES.md:61; ...rows.md:794; ...rows.md:796) vs 59(...addendum.md:423; :425)
```

At my close, three of the four are gone and the fourth has one site left:

```
FAIL M3 Q-LCC15-DISTINCT-LEAVES quoted with 2 distinct values:
     58(QUANTITIES.md:61) vs 59(...rows.md:810; ...rows.md:812; ...addendum.md:395;
        ...step2_space_resources_engineer_l0.md:79)
```

The 58 side is now the stale index alone. The three `59` sites in my two files plus the one in this
deliverable all agree.

**That residual is the predicted one and it is not mine to clear.** `QUANTITIES.md` is itself a
quotation site, so with the correction made and the index not regenerated the failure still fires
from the index alone. The new `FAIL M6 QUANTITIES.md differs from the regenerated index` is the same
fact seen from the other side. Both discharge on one `--index --write` at the wave boundary, which is
the orchestrator's half of this correction.

No `M2` line of any kind remains in the output: my three and the economics seat's five are all gone.
**The zero is joint and I claim only my three.** Read the lines, not the count.

### 2.3 An instrument defect found while verifying, now fixed at its cause

`tools/quantities.js` reported every offset in my addendum **two lines higher than the file on disk**
— the `M2` sites at 383/401/419 against `id:` lines at 382/400/418, the `M3` sites at 423/425 against
tags at 421/423. Its own docstring says this cannot happen: *"Every offset this tool reports is a
1-based line number in the file as it sits on disk; CRLF, LF and mixed files all yield the same
numbers."*

The cause is `readLines`, which normalises with `.replace(/\r\n?/g, '\n')`. That maps a **lone** `\r`
to a newline and creates a line that is not on disk. My addendum held exactly two lone `\r`
characters, and the +2 is exactly those two.

They were mine, and they were a typo of a kind worth naming: a paragraph *about* line endings had
five of its escape sequences written as the control characters themselves rather than as the two
characters `\` `r` and `\` `n`, splitting one sentence across six lines. I restored the paragraph in
my own file, which is where the defect was; the offsets now match disk exactly (verified: blocks
reported at 408 and 435 against `id:` lines at 409 and 436, i.e. the fence lines, which is what the
tool documents).

**The tool's claim is still false for any other file that acquires a lone `\r`, and the file that
proves it no longer exists.** The one-character fix is `/\r\n/g` rather than `/\r\n?/g`, plus a
decision about what a lone `\r` should mean. `tools/quantities.js` is not mine; routed in `## Not
mine`.

Line endings: each file was rewritten with its own dominant terminator, CRLF for the parent, LF for
the addendum. That normalised two LF-only breaks in the parent (both inside long `cmd:` lines) and
one stray CRLF in the addendum. No content changed and no other file was touched.

---

## 3. The five `L0|none` rows

Each row gets one outcome with a stated reason. `merge_plan.tsv` is The Engineer's and I have not
touched it; the cells are in the relay.

**All five land. None is withheld.** Under the author ruling of 2026-08-28 a missing identifier is a
fact recorded about a file, never grounds to keep it off the shelf — and on these five that ruling
costs nothing, because none of them needed to be withheld on the evidence either.

| file | outcome | key | why |
|---|---|---|---|
| `dr-michael-nayak-luna-10.md` | **(i) lands** | `L3-PENDING\|nayak\|2024\|program-update-10-year-lunar-architecture-luna-10` | citation block prints the year |
| `rostami2018-figures.md` | **(ii) lands, block written** | `L3-PENDING\|rostami\|2018\|lunar-tunnel-boring-machines` | parent paper's DOI deliberately withheld |
| `falcon-heavy-wikipedia.md` | **(ii) lands, block written** | `L2\|en.wikipedia.org/wiki/Falcon_Heavy` | article URL carries a path |
| `nasa-clps-delivery-timeline.md` | **lands, key stays `L0\|none`** | `L0\|none` | the source is genuinely undated |
| `take-or-make-in-space.md` | **lands, key stays `L0\|none`** | `L0\|none` | no printed year; "circa 2023" is an inference |

### 3.1 `dr-michael-nayak-luna-10.md` — outcome (i)

**The brief's basis line is wrong on this row and section 7 is why.** The plan says "no level-3 key is
derivable, no year token in the name." The second half is true and the first does not follow: section
7 derives level 3 **from the citation block, not the filename**, and this file carries both a
`## Citation` and a `## Metadata` block. The citation prints *Nayak, M. (2024, April 25). Program
update: 10-Year Lunar Architecture (LunA-10) Capability Study*, DARPA Strategic Technology Office.
Identity `nayak`, year `2024`, first six title words `program-update-10-year-lunar-architecture-luna-10`.

Nothing higher is available and the reason is worth recording, because the file *looks* like it has a
level-2 key. It prints `Publisher URL: https://www.darpa.mil`. **That is a bare host and section 7
clause (a) refuses it** — it addresses a publisher, not a document. No DOI. No agency or grant number
either: "Distribution Statement A" is a release marking, not an identifier, and the deck prints no
report number. The `identifier` cell stays empty and the key is a candidate, per section 7.

### 3.2 `rostami2018-figures.md` — outcome (ii), and the DOI must NOT be copied in

No citation, provenance or metadata block. Its own printed header carries everything one needs: paper
title, three authors with affiliations, venue *Earth and Space 2018* (ASCE proceedings), pages
240–252, and its own statement that it is "a figures/tables-only summary produced from visual
analysis of the rendered PDF pages." A citation block written from those lines is sourced, not
inferred. Key `L3-PENDING|rostami|2018|lunar-tunnel-boring-machines`.

**The sibling file `rostami2018.md` carries `L1|10.1061/9780784481899.024`, and copying that DOI into
this file would be the wrong repair.** Section 7 opens on exactly this case: two summaries of one
paper are two filenames and the corpus has no mechanism that notices. A shared level-1 DOI *is* that
mechanism, and it does not notice — it confirms. A level-1 match is a confirmed duplicate and the
merge acts on confirmations; a level-3 match is a candidate and the merge does not act on it. These
two files are one paper's technical summary and one paper's figure appendix, not a duplicate pair, so
the safe key is the weak one. **Withholding an identifier that is available in another file is the
correct engineering here, and it will read as an omission unless the reason travels with the file**,
so the reason is written into the citation block itself.

The same caution applies to the duplicate rule relayed mid-sitting — recorded decision, else
byte-identical, else take the larger. It must not fire on this pair. `rostami2018.md` is 19,130 bytes
and `rostami2018-figures.md` is 12,601, so a size rule applied here drops the figures file and loses
all six figure readings including the paper's only quantitative plot.

### 3.3 `falcon-heavy-wikipedia.md` — outcome (ii), and it is the row that was missing

It carries no `## Citation`, `## Provenance` or `## Metadata` header. What it carries is a bolded
stanza under its H1: source name and URL, retrieval date 2026-07-19, type ("tertiary reference
(encyclopedia), cross-checkable to primary SpaceX and NASA figures"), acquisition note, and a
standing caveat that its prices are commercial list prices rather than SpaceX internal cost. That is
a citation block in everything but its header, and writing it as one is transcription.

Its key is the strongest of the five. `https://en.wikipedia.org/wiki/Falcon_Heavy` strips to
`en.wikipedia.org/wiki/Falcon_Heavy`, **carries a path** so clause (a) is satisfied, is not a
PDF-hosting mirror, not a DOI resolver and not a search result, and no other union key in the plan
holds it, so clause (c) leaves it a confirmation rather than a candidate. `L2|en.wikipedia.org/wiki/Falcon_Heavy`.

**This row is where section 7 and the author ruling now collide.** Section 7 says, in the file: "No
citation block at all. Not a dedup failure, a landing failure. The file does not land until it has
one." The author ruling says no file is withheld from `literature/` for a metadata reason. Under my
adjudication the conflict is moot, because the block gets written and the file lands either way. It
is not moot for the next file that arrives without one, and section 7 as written will refuse it.
Routed.

### 3.4 `nasa-clps-delivery-timeline.md` — lands, `L0|none` is the right key

**This file has a citation block, so section 7's landing condition was never in question; what it
lacks is a key.** Its own citation reads *National Aeronautics and Space Administration. (n.d.).
Timeline of past and future CLPS deliveries [Infographic]*, with `Publisher URL: none in source` and
an explicit note that "the graphic carries no printed publication or version date, so the year is
given as `n.d.`". No DOI, no URL, no agency or grant number. The filename carries no year either, so
the ruling's fallback to a filename-derived key yields nothing this one does not.

**`L0|none` is a measured property of the source and not a gap in our record**, and that is the
difference between this row and a defect. A four-digit year could be manufactured here — the graphic
prints event dates — and manufacturing it would be inventing a publication date from depicted
content. I decline.

**For 2.7, which will want a `stated_as_of` for this file in Wave 3.** The graphic is a programme
snapshot and its currency is boundable from its own printed content without inventing anything: it
prints IM-2 as landed on Mar. 6, 2025, which is the latest event it shows as flown, and it prints
Blue Moon Mark 1 and Griffin Mission One as planned with no dates. **The snapshot is therefore on or
after 2025-03-06 and before Blue Moon Mark 1 flew.** That is a bound, not a date, and it is the
strongest statement the artifact supports. The eleven deliveries span a 2024–2028 axis; four are
printed as flown with launch and landing dates and seven as planned.

### 3.5 `take-or-make-in-space.md` — lands, `L0|none` is the right key

Citation block present, and unusually good: it states in terms that "no DOI, journal name, volume,
conference series number, or explicit publication year is printed anywhere in the extracted text,"
gives the author as Harry W. Jones of NASA Ames, records `Publisher URL: none in source`, and dates
the work to "circa 2023" from internal evidence (2023-dollar costs, references accessed March 2023).
**An inferred year is not a printed four-digit year** and cannot found a level-3 key. The file did
the honest thing and the key should not undo it.

There is a second reason not to manufacture one, and the file supplies it itself. Its citation block
carries a naming note: this author is Harry W. Jones of NASA Ames, **a distinct person from Karen L.
Jones of The Aerospace Corporation**, whose separate super-heavy-lift report is also in this corpus
as `jones-superheavylift-final20260614.md`. A manufactured `L3|jones|2023|…` would enter a namespace
that already holds `jones-2019`, `jones-2020` and that file, and section 7 says in terms that a
level-3 key "cannot distinguish two genuinely distinct documents by the same author in the same
year." Here it cannot distinguish two genuinely distinct *authors*. `L0|none` stands.

---

## 4. Counting rules

Every population counted in this deliverable, with the rule that produced it. All taken from the
repository root, 55 characters.

| population | value | rule |
|---|---|---|
| lunar register axes | 15 | `awk -F'\t' '$1=="A"' oracle/REGISTER.lunar.tsv \| wc -l` |
| lunar register member rows | 81 | `awk -F'\t' '$1=="M"' oracle/REGISTER.lunar.tsv \| wc -l`; the `H` row's fifth and sixth fields read 15 and 81 |
| distinct member leaves | 59 | `awk -F'\t' '$1=="M"{print $4}' … \| sort -u \| wc -l` |
| leaves resolving on disk | 59 of 59 | each name looked for by exact filename under `lsei/literature`; zero missing |
| corpus | 152 `.md` files in 8 folders | `find lsei/literature -name '*.md' -type f \| wc -l` |
| merge plan rows | 176 = 117 + 59 | lines whose first field is `1` or `2`, excluding `#` comments and the header row whose first field is `block` |
| `L0\|none` rows | 5 | column 13 exactly `L0\|none` |
| `HOLD-NOID` rows | 34 | column 5 exactly `HOLD-NOID` |
| `literature/` at my close | 0 files | `find literature -type f \| wc -l` |

**Census self-counting (standing clause 4).** This file is in the declared file set that
`tools/quantities.js` walks — it is a `cr_scratch/*.md` file — and every count in the table above is
over `oracle/`, `lsei/` or `cr_scratch/merge_plan.tsv`, none of which include it. The declared file
set itself moved from 110 files to 122 during my sitting and this file is one of the new ones.

**The "106" I reported last wave does not reproduce, and I withdraw it rather than reconstruct it.**
The correction routed to me is correct. `lsei/literature` holds 152 `.md` files across eight folders:
growth-and-industrial-theory 26, isru-processing 30, logistics-and-delivery 13, lunar-ice-and-geology
20, power-and-thermal 17, programme-primaries 10, space-economy-and-markets 26,
space-law-and-governance 10. The candidate populations are 152 (all eight), 126 (excluding
growth-and-industrial-theory) and 100 (excluding both economics-adjacent folders). **106 is none of
them and no partition of that tree produces it**, so it was not a population, it was a number. The
"11 folders" in my section 4A was the merged placement table, which is a different tree again. Two
populations under one word, and the word was doing the work.

**The rule I will follow from here, stated so it is checkable rather than promised:** every count
names the tree it walks and the command that walked it, on the same line as the number; where the
number is a subset of a tree, the excluded folders are named; and `literature/` is never the corpus
root for a Step 1 figure, because it held zero files when every one of them was taken.

---

## 5. Not mine

| # | finding | sub-step | owner |
|---|---|---|---|
| N-1 | The five `merge_plan.tsv` cell sets for the `L0` rows — dispositions, keys, identifiers, `rev` bumps and basis text. Supplied paste-ready in the relay. | 2.5 | The Engineer |
| N-2 | Two `## Citation` blocks to be written at landing, for `rostami2018-figures.md` and `falcon-heavy-wikipedia.md`. Text supplied in the relay, written by me, sourced from each artifact's own printed content. | 2.5 | The Engineer / the merge executor |
| N-3 | **Content error in a corpus file.** `falcon-heavy-wikipedia.md` line 31 states a maiden flight of 2026-02-06; the correct date is 2018-02-06. The file refutes itself twice within two lines (Arabsat-6A recovery 2019 on the same line, Psyche 2023 on the next). Found by The Fact-Checker, confirmed and dated by me. `lsei/` is read-only and `literature/` is not in my write set. Fix on the landed copy in the same edit as N-2. Not cosmetic: this file is the corpus's launch-price anchor for the $1,520/kg figure `take-or-make-in-space.md` builds its breakeven on. | 2.5 | The Engineer / the merge executor |
| N-4 | **`tools/quantities.js` misreports line offsets in any file containing a lone `\r`.** `readLines` uses `.replace(/\r\n?/g, '\n')`, which turns a lone `\r` into a line break that is not on disk; the tool's docstring asserts the opposite. Measured live at +2 in my addendum. The fix is `/\r\n/g` plus a ruling on what a lone `\r` means. I removed the instance in my own file, so the reproducing case no longer exists in this repository. | tooling | The Engineer |
| N-5 | **`oracle/NAMING.md` section 7 now contradicts the author ruling of 2026-08-28.** Section 7 says a file with no citation block "does not land until it has one"; the ruling says no file is withheld for a metadata reason. Moot on my five, live for the next arrival. Section 7 is under amendment this wave. | 2.20 / section 7 amendment | The Engineer |
| N-6 | The `identifier` column for `dr-michael-nayak-luna-10.md` should stay empty even though the file prints a URL, because `https://www.darpa.mil` is a bare host refused by clause (a). A future pass that harvests printed URLs mechanically will re-add it. | 2.5 | The Engineer |
| N-7 | `Q-LCC15-SIDES` derives from `Q-LCC15-MEMBER-ROWS`, which I corrected today, so it will report STALE. It was re-confirmed unchanged at 37 in the addendum and that paragraph still stands; no action, recorded so the report is not read as an open item. | 1.9 | mine, closed |
| N-8 | `Q-LCC15-DISTINCT-LEAVES` (M3) and the new `M6` both discharge on one `--index --write`, which I was told not to run. Until then both are expected output, not regressions. | wave boundary | The Orchestrator |
| N-9 | The seventh `H` field (`distinct_members`) remains accepted in principle and deferred. Its urgency is now lower, as ruled: with the fork collapsed the value is pinned by supersession rather than by the header. Not dropped. | 2.15 / 2.16 | Wave 3 |

The A.9 tension with The Manager is untouched and is not resolved here.

---

apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0

<!-- Three quantity BLOCKS were deleted (the addendum's re-declarations) and three corrected; no id
was minted, renamed or retired, so the id ledger is zero in both directions. No test, check row,
amendment row or contract clause was added, and none was needed: the collapse is an edit to two
files I already owned, and the adjudication is five readings of five documents. -->
