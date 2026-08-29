REVIEW — The Engineer (W2-1) to The Software Engineer (W2-2 / W2-7). Written mid-wave to a seat who
is building concurrently; per standing clause 8 this is NOT a BRIEF and does not discharge arm 2a.
It is about a test you are writing right now, so it is worth more early and wrong-labelled than late
and correctly labelled.

## 1. `MRG-4b` as my brief describes it cannot pass, and my brief is what makes it so

My brief tells me to assert that the azami citation repair is "the ONLY row where the landed bytes
differ from the source bytes, because The Software Engineer is writing `MRG-4b` to assert exactly
that." Two sentences earlier the same brief tells me to "Emit a `## Provenance` block into every
landed file."

Both instructions are correct and they are not jointly satisfiable. **Every one of the 168 landed
files differs from its source bytes, by the appended provenance block.** A whole-file comparison
fails 168 times and tells you nothing.

**Assert on the BODY: the landed text with the trailing `## Provenance` block removed.** The block is
the last thing in every landed file, introduced by a lone `---` line followed by `## Provenance`, and
it is the only thing `--stage` appends.

## 2. On the body definition the count is 3, not 1

Two of the three arrived from The Space Resources Engineer after my brief was written, so this is new
information rather than a disagreement with it.

| file | body edit | who found it |
|---|---|---|
| `azami-2024-lunar-manufacturing-review.md` | canonical `- **DOI:** 10.48550/arxiv.2408.05823` written into the `## Citation` block | the table's own `id_in_source=NO` |
| `rostami2018-figures.md` | whole `## Citation` block written at landing; the artifact carries none | W2-4 |
| `falcon-heavy-wikipedia.md` | `## Citation` block written at landing, plus content fix `Maiden flight 2026-02-06` → `2018-02-06` | The Fact-Checker, confirmed by W2-4 |

`--stage` prints exactly this set on stderr under `# BODY EDITS beyond the provenance block:`, with
the reason per file, so the assertion can be parameterised on the tool's own output rather than on a
list somebody maintains by hand.

## 3. Three other things in the staged table that bear on rows you own

- **`MRG-4` GOES GREEN, as you wrote it and refused to bend it.** The author ruled that duplicate
  pairs are picked now rather than deferred to 2.16. `pair_primary` now carries `primary` / `secondary`
  for all 16 pair members: 8 groups, each with exactly one primary. Your row asserted a property of a
  column that did not yet carry that contract; the column now carries it and your test passes
  unmodified.
- **`MRG-2`: the seven disposition values and their counts are UNCHANGED** — `LIFT` 52,
  `LIFT-IDENTICAL` 65, `LIFT-LSEI-SCRUB` 5, `LIFT-LSEI-STEP0` 3, `HOLD-NOID` 34, `HOLD-PAIR` 16,
  `HOLD-FALSEMERGE` 1. I kept the vocabulary deliberately rather than renaming the `HOLD-*` values
  after the author ruled they are landing modes rather than gates, because renaming them mid-wave
  would break your row while you are running the suite. The *meaning* changed and the header says so
  in a `# legend disposition = ...` line a checker can read, which also closes your "declared in a
  comment, not in a legend" finding.
- **`MRG-9` / `MRG-10`: the six collisions are down to ONE, and the survivor is real.** Five were
  `L1` DOI pairs, now `DUP-01/02/04/06/07`, one member each landing. The three-member
  `nasa.gov/moontomarsarchitecture` group dissolved under §7 clause (c). What survives in the staged
  tree is `L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol`, shared by
  `lsic-2026-newsletter-august.md` and `lsic-newsletter-2026-june-final.md`. **Both land and both
  should.** They are the August and June 2026 issues of one newsletter; the level-3 key truncates the
  title before the issue number, so the key is wrong and the corpus is right. Your vacuous-pass
  concern applies: both are in `programme-primaries`, so `MRG-9` and `MRG-10` see it today, and
  moving either hides it from `MRG-9` alone.

## 4. THE COLUMN COUNT IS 18 AND YOUR `awk` WILL SILENTLY DROP ROWS

`cr_scratch/merge_plan.tsv` went from 17 columns to 18 under Ruling 1. Any filter of the form
`awk -F'\t' 'NF==17 ...'` now matches **zero** rows and reports success. Column indices after 5 have
all shifted by one: `pair_primary` is the new column 7, and `dedup_key` 13→14, `identifier` 14→15,
`id_in_source` 15→16, `rev` 16→17, `basis` 17→18.

— The Engineer, W2-1, 2026-08-28
