# Corpus deduplication decisions

**Date:** 2026-08-26
**Status:** executed against the `lsei/` working copy, and binding on the merge.
**Enforced by:** `tools/check_corpus_collisions.js`
**Superseded files:** `_intake/superseded-duplicates/` (kept, not destroyed)

## Why this file exists

The six decisions below were executed by deleting files from `lsei/literature/`. That directory is a
gitignored working copy of another repository, so the deletions are local and a fresh clone
reinstates every one of them. This file is the durable half of the fix: the merge step reads it and
reproduces these six choices on a clean machine. `tools/check_corpus_collisions.js` is the other
half, and it fails the build if any pair like these reappears under any name.

## The defect

`literature_search.js` ranks candidates by token overlap between the question and each filename.
Its tokenizer drops single-character tokens (line 63, `t.length > 1`). A `-2` suffix is therefore
invisible to it. Six pairs in the Scenario Explorer corpus tokenized identically, scored
identically, and resolved by directory-walk order. For `csank-2022` that meant the Oracle cited the
7,637-byte summary every time and the 23,190-byte summary never.

All six pairs turned out to be the same source summarized twice, confirmed by matching DOI or NTRS
accession. None is referenced by filename anywhere in `lsei/index.html`, so no app citation breaks.

## The decisions

Sizes in bytes. "Ratio" is larger over smaller.

| Source | Kept | Dropped | Ratio | Decided by |
|---|---|---|---|---|
| Metzger 2013, bootstrapping the space industry | 24,076 | 5,269 | 4.6x | size |
| Azami 2024, lunar manufacturing review | 27,771 | 5,437 | 5.1x | size |
| Csank 2022, powering the Moon | 23,190 | 7,637 | 3.0x | size |
| Speyerer 2013, persistently illuminated regions | 26,400 | 15,836 | 1.67x | size |
| Metzger 2021, Aqua Factorem | 25,331 | 18,445 | 1.37x | **adjudicated** |
| Poston 2020, KRUSTY reactor design | **17,740** | 19,230 | 1.08x | **adjudicated** |

**Azami is the reason suffix-based deletion was refused.** The `-2` file was five times the size of
the canonical one. Deleting by suffix would have kept a 5 KB stub and discarded the real summary.
The kept content is the former `-2`, renamed to the canonical filename.

**Poston is the reason size-based selection was refused for close pairs.** The rule applied was that
a gap under about 1.5x is not evidence, and the two closest pairs went to a separate reviewer that
read all four files against stated criteria: quantitative retrievability first, then provenance,
verifiability, stated limits, and reproduced source text counted as a defect. It reversed the size
call on Poston and confirmed it on Metzger 2021. **The kept Poston summary is the smaller file.**

Its reasoning, recorded because the losing content is real: the kept Poston file cites a page,
section, table or figure for nearly every claim, where the larger one cites none anywhere in the
body. It also carries component-level detail the larger lacks, including the sodium-pool redesign
from 25 g to 15 g that cuts pool-driven reactivity worth by roughly a factor of four, which is a
safety-relevant design change with no trace in the file that was dropped.

## What is lost, and what to do about it

In both adjudicated pairs the loser carried material the winner does not. This is not a tie that was
broken; it is a merge that was deferred.

**Poston, lost by dropping the 19,230-byte file:** the shield-material trade rationale (polyethylene
ruled out at about 100 C, LiH rejected on cost and schedule, borated steel on cost); the Table I
breakdown by stacking geometry crossed with immersion state, which the kept file collapses to the
extremes 0.4577 to 0.9806; the platen-travel figures (88 cm total, reactivity rising only in the
last 20 cm).

**Metzger 2021, lost by dropping the 18,445-byte file:** page and section citations throughout; the
clean "DOI not printed in source" handling, where the kept file leaves an unresolved placeholder
reading "[not stated in the document; confirmation needed before this line is filled]"; a caught
internal inconsistency in the source itself, a stated 0.75 mass-removal factor against a printed
160,425 kg figure implying about 71.2 percent, which the source never reconciles; Appendix A
particle-size fitting parameters; the solar-array specific power (50 We/kg, about 3 kW/wing); the
RASSOR battery spec; the twelve-missions-per-year scaled architecture; and the flash-evaporation
measurement conditions (19 K, 100 mbar) attached to a value the kept file reports without them.

**Carry-forward, for the merge step.** The pattern is systematic rather than incidental. The files
carrying `## Comprehensive Technical Summary` and `## Metadata` also carry the verifiability
apparatus (page and section citations, honest empty-field handling), while the files without it
carry more raw quantitative content. That is the same format split The Engineer measured across the
whole corpus at 0.2, showing up inside individual pairs. For these two sources the right artifact is
a union of both members, not either one. The six superseded files are retained at
`_intake/superseded-duplicates/` so that union remains possible without re-fetching anything.

## Verbatim-abstract check on these four

Clean. All four abstracts are independently worded paraphrases, and the two members of each pair
differ from each other structurally and lexically, which would not be true if either were a copy of
one printed abstract. None of these four is among the thirteen contaminated files found at 0.2.

## Rule established

A numeric suffix is not disambiguation. Where two summaries genuinely describe different sources,
their filenames must differ in a word that both a reader and the tokenizer can see (`-phase-i`
against `-phase-ii`, `-icarus` against `-grl`), never in a digit.
