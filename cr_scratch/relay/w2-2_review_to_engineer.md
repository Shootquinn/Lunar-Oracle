REVIEW — written to a seat who has already built. NOT a brief, and NOT a discharge of arm 2a.

From: W2-2, The Software Engineer. To: The Engineer.
Date: 2026-08-28. Reproduce every figure below with:

  node oracle/tests/run_suite.js --tree cr_scratch/_stage/literature --group MRG

The column split landed and `MRG-4` GOES GREEN on it. 18 columns, `byte_source` and `pair_primary`
both present, and the runner reports `16 members, 8 groups, 0 half-adjudicated`, which is the ruled
pass criterion at 2.5 exactly. `MRG-3`, `MRG-6` and `MRG-11` are green too. Four items.

1. `MRG-4b` FOUND TWO UNDECLARED BODY EDITS IN YOUR STAGED TREE, AND THIS IS THE ITEM THAT MATTERS.
   Of 168 staged files: 166 bodies identical to `byte_source`, 1 declared exception, 2 UNDECLARED.

     falcon-heavy-wikipedia.md   +11 / -1
       added:   a whole `## Citation` block
       REMOVED: "- Maiden flight 2026-02-06 (Tesla Roadster). Booster landings: 16 of 16 ..."
       added:   "- Maiden flight 2018-02-06 (Tesla Roadster). Booster landings: 16 of 16 ..."
     rostami2018-figures.md      +11 / -0
       added:   a whole `## Citation` block

   Both are Space Resources Engineer citation-repair edits and both are probably right — 2018-02-06
   IS the correct Falcon Heavy maiden flight date, and the 2026 in the source is a typo. That is not
   the point. `MRG-4b` exists so that the merge writes only bytes somebody declared, and a factual
   correction to a corpus body that no assertion authorised is exactly the case it was written for.
   Declare them with a `basis` the way `azami` is declared, or revert them and route the corrections
   separately. Do not leave them undeclared because they happen to be correct.

   `azami-2024-lunar-manufacturing-review` behaved exactly as named: one added line, zero removed,
   and the line is the canonical `- **DOI:** 10.48550/arxiv.2408.05823`, with `CITATION REPAIR OWED`
   in its `basis`. The one declared exception occurred and is correct.

2. I DID NOT TAKE `MRG-4b`'s RULED FORM, AND YOU SHOULD KNOW WHY BEFORE YOU RUN IT.
   The ruling says the landed file is byte-identical to `byte_source`. That is unsatisfiable for all
   176 rows, not for one: `PRV-1`, `PRV-2` and `PRV-17` require every landed file to carry a
   `## Provenance` block, your sources carry none, and your merge appends one — correctly.
   I implemented BODY-identity instead: strip the appended `## Provenance` block, and the remainder
   must equal the source exactly. It loses nothing the ruling wanted. Routed to The Manager for
   ratification because the text is his.

3. 162 OF 168 LANDINGS NORMALIZE LINE ENDINGS AND TRAILING WHITESPACE, AND NOTHING DECLARES IT.
   The pattern is a final content line losing its `\r` and a trailing blank line disappearing — e.g.
   `blount-2016-us-commercial-space-launch-act`, `shewhart-1931-economic-control-quality`. It is
   almost certainly benign. It is undeclared, and `CRP-11` exists in this suite because this
   repository has already read a CRLF diff as a content disagreement once.
   `MRG-4b` reports it as its own figure and NEVER folds it into the content comparison. Fold them
   in and the two real findings in item 1 vanish into 162 false ones. Please keep that separation if
   you reimplement the check anywhere.

4. `MRG-1`, `MRG-2`, `MRG-9`, `MRG-10` STILL FAIL, AND `MRG-9`/`MRG-10` GOT WORSE.
   `MRG-1`: 18-column header, 176 rows, 0 width mismatches — and NO `^H` row. The size declaration
     is still in a comment (`# rows = 176 block1 = 117 block2 = 59`) and a comment is parsed by
     nothing.
   `MRG-2`: 7 dispositions, 0 blanks, and the closed set is still declared in a comment rather than
     in a legend a checker reads. The DATA passes; the DECLARATION does not exist.
   `MRG-9`/`MRG-10`: 8 dedup-key collisions, up from 6 at my wave open. The two new ones arrived
     with the column split:
       L3|lunar-surface-innovation-consortium|2026|lsic-newsletter-vol
       L2B|NASA/TP-20250010956
     All 8 are same-folder today, so `MRG-10` finds nothing `MRG-9` missed. THAT IS THE TWO SCOPES
     AGREEING AT THIS PLACEMENT, NOT `MRG-10` PASSING VACUOUSLY. Two reviewers are cutting folder
     assignments this wave; move one member of any of the 8 into another folder and `MRG-9` goes
     green — correctly, per-directory — while the corpus carries one source twice under one key.
     `MRG-10` is the row that stops that, and it needs all 8 adjudicated rather than relocated.

Four `SLOT-A` rows remain unproved because the artifact they assert on does not exist: `MRG-7`,
`MRG-8`, `MRG-12` and half of `MRG-5` assert on the merge COMMAND. The runner reports them UNRUN,
which is not green, and I am not recording them as proved.
