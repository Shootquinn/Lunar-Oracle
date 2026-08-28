# Step 2.1 (MERGE-2) — The Engineer: the source-identity table

**Deliverables:** `cr_scratch/merge_identity.tsv` (176 rows plus header) and this file.
**Instruments:** four scripts, carried in section 8. See variance D8.
**Run:** 2026-08-28, cwd `~/onedrive/projects/cc/lunar oracle`, 55 characters. Node on Windows 11.
**Refs:** this repository `2b06d68`; `lsei` `7f97983`; `cr-agents` `f0c976b`.

Every count below carries its counting rule in a twelve-field quantity block. Where a figure
disagrees with `cr_scratch/step2_orchestrator_baseline.md`, the disagreement is named and resolved
rather than replaced.

---

## 0. Known-answer test against the baseline, run first

The baseline was written before I ran and it is the falsifier for this instrument.
`merge_identity.js` implements `normalize()` from `literature/NAMING.md` §1 verbatim, in seven
steps, and reports its own inputs on stderr before it emits a row.

| Baseline figure, `normalize()` rule | Baseline | This run | |
|---|---|---|---|
| `lsei/literature` files, distinct keys | 152 / 152 | 152 / 152 | agrees |
| `_intake/japanese-miracle/lit` files, distinct keys | 119 / 119 | 119 / 119 | agrees |
| normalized overlap | 95 | 95 | agrees |
| `lsei`-only | 57 | 57 | agrees |
| `_intake`-only | 24 | 24 | agrees |
| union | 176 | 176 | agrees |
| intra-corpus normalization collisions | 0 | 0 | agrees |

Seven for seven, to the file. The tool prints `COLLISION A/B <key>` on any intra-corpus collision
and printed none.

**Second known-answer test, on the reconstructed pre-dedup basis.** I rebuilt the 158-file corpus
(§7) and re-ran. It returns union 182, both 95, `lsei`-only 63, `_intake`-only 24 — which is my own
Step 0.2 Part 1 table, `95 / 63 / 24 / 182`, reproduced to the file by a different implementation
written two days later. The two bases also agree on the number of distinct sources, and that is not
an accident: dedup removed same-source duplicates and nothing else.

**Register self-declarations checked, per the constraint.** `oracle/MANIFEST.tsv` declares 20 in its
`H` row and holds 20 `D` rows. `oracle/check_register.md` declares 27 in its `H` row and holds 27
`C` rows. Both agree with themselves. I state no register census in this file, so F2 has nothing to
fire on, but the check was run rather than assumed.

---

## 1. The union by filename, recomputed

```quantity
id:            Q-MERGE-UNION-176
class:         fixed
value:         176
unit:          distinct normalized filenames across the two source corpora
population:    every `*.md` file under `lsei/literature/` (recursive, 152 files) and under
               `_intake/japanese-miracle/lit/` (flat, 119 files), 271 files in total, each
               reduced to one key
operation:     cmd: node tools/merge_identity.js lsei/literature _intake/japanese-miracle/lit
               — normalization is `normalize()` of literature/NAMING.md §1 verbatim: leaf name
               only; strip exactly one trailing `.md` case-insensitively; lowercase; replace each
               run of one-or-more underscore-or-space with a single hyphen; collapse runs of
               two-or-more hyphens to one; trim leading and trailing hyphens; append `.md`
conditions:    cwd: repository root, 55 characters. `lsei/literature` is a gitignored working copy
               at ref 7f97983; `_intake/` is gitignored and has no upstream. No dependence on
               filesystem case sensitivity: the key is lowercased before comparison, which is the
               point of the rule
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     176 distinct normalized filenames exist across the two source corpora, partitioned
               95 in both, 57 in `lsei` only, 24 in `_intake` only, with zero intra-corpus
               collisions in either tree.
derived-from:  none
sampled:       n/a — this operation counts, it does not classify
superseded:    none
```

**This is not a source count and it is not offered as one.** 185 and 184 remain correct under the
raw and case-folded rules; they are the before-picture, exactly as the baseline says.

---

## 2. The true distinct-source count

`182 sources` and the `162 to 173` range are both replaced. They are replaced by **168**, and 168
is reproducible from either basis.

```quantity
id:            Q-MERGE-SAMESOURCE-8
class:         fixed
value:         8
unit:          same-source merges among the 176 [Q-MERGE-UNION-176] union keys
population:    the 6 identifier groups holding more than one union key that
               `cr_scratch/merge_identity.tsv` reports (7 surplus rows), plus the 2 candidate
               groups the level-3 fallback finds among the 39 [Q-MERGE-NOID-39] rows carrying no
               identifier
operation:     manual: The Engineer; opened both members of all 6 identifier groups and both
               members of both level-3 candidate groups and compared title, authors, report or
               grant number and venue in the `## Citation` block; 17 files inspected
conditions:    inherits: Q-MERGE-UNION-176
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     8 pairs of union keys are two summaries of one source: 5 confirmed by equal DOI, 1
               confirmed by equal publisher URL plus matching report number, and 2 confirmed at
               level 3 by matching venue, date and grant number. One further identifier group is a
               false merge and is not counted.
derived-from:  Q-MERGE-UNION-176, Q-MERGE-NOID-39
sampled:       17 inspected by hand, 1 found wrong, by The Engineer — the URL group
               `nasa.gov/moontomarsarchitecture` holds 3 keys and is 2 sources, not 1
superseded:    none
```

```quantity
id:            Q-MERGE-SOURCES-168
class:         fixed
value:         168
unit:          distinct sources in the prospective merged corpus
population:    the 176 [Q-MERGE-UNION-176] union keys
operation:     derived: Q-MERGE-UNION-176 - Q-MERGE-SAMESOURCE-8
conditions:    inherits: Q-MERGE-UNION-176
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     176 summary files in the prospective merged corpus describe 168 distinct sources.
               8 sources are summarized twice.
derived-from:  Q-MERGE-UNION-176, Q-MERGE-SAMESOURCE-8
sampled:       n/a — the classification is carried by Q-MERGE-SAMESOURCE-8
superseded:    182 (the published inventory: a filename count mislabelled as a source count);
               162–173 inclusive (The Engineer, Step 0.2 Part 4, 2026-08-26) — a range offered
               because the files without a DOI were called unresolvable. They were resolvable;
               levels 2 and 3 resolve them and the answer is a number, not a range.
```

**Cross-check on the pre-dedup basis.** 182 union keys; 11 identifier groups with 12 surplus rows,
of which 1 surplus is the same false merge, leaving 11 identifier merges; the level-3 fallback adds
`sanders-2025`, `sowers-2019`-NIAC and `metzger-2021`, which is 3. `182 − 11 − 3 = 168`. **The two
bases agree.** The distinct-source count is invariant to the dedup, which is the strongest evidence
available that both the dedup and this count are right.

### The eight same-source pairs

| Level | Identifier | Members |
|---|---|---|
| 1 | `10.1126/science.1186986` | `colaprete-2010-lcross-ejecta-water-detection` / `colaprete-2010-lcross-water` |
| 1 | `10.1016/j.reach.2019.100026` | `kornuta-2019-commercial-lunar-propellant-architecture` / `kornuta-2019-commercial-lunar-propellant` |
| 1 | `10.1126/science.1187726` | `paige-2010-diviner-cold-trap-temperatures` / `paige-2010-diviner-psr-cold-traps` |
| 1 | `10.1016/j.asr.2016.01.006` | `schreiner-2016-molten-regolith-electrolysis-sizing` / `schreiner-2016-mre-sizing-model` |
| 1 | `10.1089/space.2019.0002` | `sowers-2019-psr-ice-mining` / `sowers-2019-thermal-mining-ice` |
| 2 | `nasa.gov/moontomarsarchitecture` + `NASA/TP-20250010956`, `ESDMD-001` Rev C | `nasa-moon-to-mars-doc` / `nasa-2025-moon-to-mars-architecture-add-revc` |
| 3 | Luxembourg Space Resources Week, 2025-05-19, Sanders and Kleinhenz | `sanders-2025-nasa-isru-progress-review` / `sanders-2025-nasa-lunar-isru-progress-review` |
| 3 | NIAC Phase I final report, grant `80NSSC19K0964` | `sowers-2019-thermal-mining-niac` / `sowers-2019-thermal-mining-niac-report` |

**Five of these eight are new.** The Step 0.2 list of seven confirmed pairs was measured on the
pre-dedup basis, and five of its seven have since been executed by the dedup; they are not in the
176-key union at all. `colaprete`, `schreiner` and `sowers`-New-Space survive from that list.
`kornuta`, `paige`, the Moon-to-Mars pair, `sanders-2025` and `sowers`-NIAC are found here for the
first time.

**The Moon-to-Mars pair is the one no filename rule could have caught.** `nasa-moon-to-mars-doc.md`
and `nasa-2025-moon-to-mars-architecture-add-revc.md` share no author-year prefix, no title token
order, and no filename similarity a tokenizer would see. Both are NASA/TP-20250010956, ESDMD-001,
Revision C — the same document, transcribed into both files. This is the case that justifies the
sub-step: identity is not recoverable from the filename, and it took the citation block to find it.

**The false merge, named so nobody re-derives it.** `nasa-data-gaps-acr25-wp-data-gaps-v3.md` prints
the same program landing page and is a different document, a four-page ACR25 white paper. A level-2
URL that is a program landing page rather than an article address is not an identifier, and the
instrument cannot tell the two apart. §6 carries the recommendation.

---

## 3. DOI coverage, restated with its basis

**Both prior figures are addressed. One reproduces exactly once its rule is stated; the other does
not reproduce under any rule I tried.**

Seven candidate definitions, all run over the same 176-key union, 2026-08-28:

| Definition | 176 basis | 182 basis |
|---|---|---|
| a DOI accepted as this source's own identifier by `merge_identity.js` | **89** | 93 |
| any `10.NNNN/…` string anywhere in the citation block, either copy | 90 | 94 |
| any `10.NNNN/…` string anywhere in the citation block, `lsei` copy where both hold the key | 89 | 93 |
| any `10.NNNN/…` string anywhere in the **whole file**, either copy | 92 | 96 |
| any `10.NNNN/…` string anywhere in the **whole file**, `lsei` copy preferred | **91** | 95 |
| a `doi.org` resolver URL anywhere in the whole file, either copy | 72 | 75 |
| a DOI on a `DOI:`-labelled line | 32 | 33 |

**"91 with and 85 without" reproduces exactly, and it is one definition and its complement rather
than two definitions.** The rule is: any string matching `10\.\d{4,9}/` with a suffix of three or
more characters, anywhere in the file body, reading the `lsei` copy where both corpora hold the key.
91 match; `176 − 91 = 85` do not. That figure was never wrong. It was only unstated, and B5's first
half closes by writing the rule down rather than by changing the number.

**"79 of 182" does not reproduce.** On the 182 basis the same seven definitions return 93, 94, 93,
96, 95, 75 and 33. Nothing returns 79. It is my own figure from Step 0.2 Part 4 and I withdraw it:
the operation was never written down, and a number whose operation was not recorded cannot be
defended two days later by the person who produced it.

```quantity
id:            Q-MERGE-DOI-89
class:         fixed
value:         89
unit:          union keys whose source identifier is a DOI
population:    the 176 [Q-MERGE-UNION-176] union keys
operation:     cmd: node tools/merge_identity.js lsei/literature _intake/japanese-miracle/lit
               | awk -F'\t' 'NR>1 && $4=="doi"' | wc -l
               — a key counts when the `## Citation` block (falling to `## Provenance` then
               `## Metadata` where absent) yields a string matching `10\.\d{4,9}/` with a
               three-or-more-character suffix, after stripping any `doi.org` resolver prefix,
               percent-decoding and lowercasing, and excluding the mirror registrant prefix
               `10.13140/`; a DOI on a `DOI:`-labelled line beats one found in prose
conditions:    inherits: Q-MERGE-UNION-176
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     89 of the 176 union keys resolve at level 1 of the NAMING.md §7 dedup precedence, a
               further 48 resolve at level 2, and 39 resolve at neither.
derived-from:  Q-MERGE-UNION-176
sampled:       26 inspected by hand, 1 found wrong, by The Engineer — `colozza-2020` took a
               ResearchGate-minted DOI over an uploaded copy, which the file's own citation block
               says "is not a publisher-registered identifier and is not used as a locator here".
               The file was right and the first run of the instrument was wrong; the mirror
               registrant prefix is now excluded and the value above is the corrected run
superseded:    none — this id is new. It does not supersede "79 of 182", which is withdrawn rather
               than corrected, because that figure's operation was never recorded
```

```quantity
id:            Q-MERGE-DOI-ANYWHERE-91
class:         fixed
value:         91
unit:          union keys whose file body contains a DOI-shaped string anywhere
population:    the 176 [Q-MERGE-UNION-176] union keys
operation:     cmd: node tools/doicov.js lsei/literature _intake/japanese-miracle/lit
               — regex `10\.\d{4,9}/` followed by three or more characters that are not
               whitespace, quote, backtick, angle bracket, closing brace, closing square bracket or
               pipe, tested against the whole file body, reading the `lsei` copy where both corpora
               hold the key. The tool prints all seven definitions of §3, each on its own labelled
               line; this value is the line labelled `anywhere-in-file, lsei copy preferred`
conditions:    inherits: Q-MERGE-UNION-176
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     91 of the 176 union keys mention a DOI-shaped string somewhere in the file and 85 do
               not. Mentioning a DOI is not the same as having one.
derived-from:  Q-MERGE-UNION-176
sampled:       3 inspected by hand, 0 found wrong, by The Engineer — the three keys where this
               figure and Q-MERGE-DOI-89 disagree
superseded:    none — this block records a prior unattributed measurement, reproduced
```

**The three keys where the two figures disagree, opened.** `hayne-2020-micro-cold-traps` and
`metzger-autry-2023-lunar-landing-pads` each print a DOI that their own citation block labels
"external metadata, not printed on the preprint"; neither is the identifier of the artifact on disk.
`azami-2024-lunar-manufacturing-review` runs the other way — the `_intake` copy prints
`10.48550/arXiv.2408.05823` on a labelled `DOI:` line and the `lsei` copy says "DOI: not printed in
source (preprint)", so the whole-file rule reading the `lsei` copy misses a DOI that exists. All
three are correct behaviour for their respective rules, which is the point: the rule is the number.

```quantity
id:            Q-MERGE-NOID-39
class:         fixed
value:         39
unit:          union keys carrying no source identifier at any precedence level
population:    the 176 [Q-MERGE-UNION-176] union keys
operation:     cmd: node tools/merge_identity.js lsei/literature _intake/japanese-miracle/lit
               | awk -F'\t' 'NR>1 && $4=="none"' | wc -l
conditions:    inherits: Q-MERGE-UNION-176
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     39 of the 176 union keys carry neither a DOI nor a publisher article URL: 2 carry no
               citation block at all, 8 print only a bare host with no path, and 29 carry a block
               that states no identifier, usually explicitly ("not printed in source").
derived-from:  Q-MERGE-UNION-176
sampled:       n/a — this operation counts the complement of a classification already sampled at
               Q-MERGE-DOI-89
superseded:    none
```

### The 39, flagged for 2.2 (MERGE-3)

Nothing here is a landing failure yet. `NAMING.md` §7 says a file does not land without a citation
block; 37 of the 39 have one and it honestly says no identifier exists. Two do not.

**No citation block at all — 2 keys, and these are the landing failures.**
`falcon-heavy-wikipedia.md` (both corpora), `rostami2018-figures.md` (`lsei`).

**Bare host, no path — 8 keys.** A site root is not an article address.
`benaroya-2001-commercial-lunar-base` (`resonance-pub.com`); `colozza-2010-solar-lunar-oxygen` and
`kerslake-2007-lunar-surface-power-transfer` (both `gltrs.grc.nasa.gov`);
`dr-michael-nayak-luna-10` (`darpa.mil`); `lsic-2026-newsletter-august` and
`lsic-newsletter-2026-june-final` (both `lsic.jhuapl.edu`); `otsu-2007-neoclassical-postwar-japan`
(`imes.boj.or.jp`); `spear-1999-decoding-tps-dna` (`hbrreprints.org`). The two host collisions in
this set are false pairs and were checked: the two GLTRS reports are different papers and the two
LSIC newsletters are different issues.

**Block present, no identifier stated — 29 keys.** `christiano-1989-japan-saving-rate`,
`deming-1967-japan-quality-control`, `esri-2016-japan-high-growth-economic-plans`,
`hague-working-group-2019-building-blocks-space-resources`,
`highfill-2024-us-space-economy-statistics`, `jones-2020-lunar-propellant-breakeven`,
`kleinhenz-2020-polar-water-case-studies`, `linne-2020-lunar-water-pilot-plant`,
`luxembourg-2017-space-resources-law`, `metzger-2021-aqua-factorem`,
`metzger-autry-2023-lunar-landing-pads`, `miwa-2002-fable-of-the-keiretsu`,
`nasa-2020-artemis-accords`, `nasa-2023-card-carbothermal-reduction`,
`nasa-2025-fission-surface-power-directive`, `nasa-clps-delivery-timeline`,
`nexgen-2015-evolvable-lunar-architecture`, `sanders-2025-nasa-isru-progress-review`,
`sanders-2025-nasa-lunar-isru-progress-review`, `shewhart-1931-economic-control-quality`,
`shewhart-1939-statistical-method-quality-control`,
`shishko-2019-lunar-thermal-mining-business-case`, `sowers-2019-thermal-mining-niac`,
`sowers-2019-thermal-mining-niac-report`, `take-or-make-in-space`, `un-1967-outer-space-treaty`,
`un-1972-liability-convention-space-objects`, `un-1979-moon-agreement`,
`us-congress-2015-commercial-space-launch-act`.

**One correction owed to my own Step 0.2 Part 4.** I wrote there that `azami-2024` and
`metzger-2021` "are the same shape but their sources are preprints with no DOI printed, so the
identifier check cannot confirm them and a human must." That is false for `azami-2024`. The
`_intake` copy prints `10.48550/arXiv.2408.05823` on a labelled `DOI:` line; the pair resolves at
level 1 and no human is needed. `metzger-2021` stands: both members print no DOI and no publisher
URL, and it resolves at level 3, as `NAMING.md` §7 already says.

**A defect the merge inherits, found while checking that.**
`_intake/superseded-duplicates/azami-2024-lunar-manufacturing-review.md` and
`_intake/japanese-miracle/lit/azami-2024-lunar-manufacturing-review.md` are byte-identical, md5
`c4f06184c69348b9341d9a10b11e63ff`. The dedup deleted a file from `lsei/literature/`, and an
identical copy of that same file sits in the population the merge is about to import. Deleting it
again is correct; it should be a named case in 2.4's assertions rather than a coincidence the
collision check happens to catch. Routed to 2.2.

---

## 4. The author-year cluster reconciliation

**I am not picking 16 or 17, and neither figure is wrong.** They count different things under
different rules on a basis that is no longer the corpus. Both are reproduced by construction below.

Five rules, each stated, each run over both bases:

| Rule | Definition | 176: groups / surplus | 182: groups / surplus |
|---|---|---|---|
| A, strict | `^([a-z]+(-[a-z]+)?)-((19\|20)\d{2})-` — leading author token, optional one hyphenated surname, then the year, anchored | **9** / 11 | 15 / **17** |
| B, permissive | every hyphen-token before the first `19xx`/`20xx` token anywhere in the name | 9 / 11 | 15 / **17** |
| C, lead token only | the first hyphen-token, plus the first `19xx`/`20xx` token anywhere in the name | 10 / 13 | **16** / 19 |
| D, positional | the first token, and the second token only if it is a year | 9 / 11 | 15 / **17** |
| E, prefix-before-year | all tokens before the year, year found anywhere | 9 / 11 | 15 / **17** |

**Both contested figures are reproduced, and the contest dissolves.**

- **16 is Rule C's group count on the 182 basis.** The Space Resources Engineer's figure reproduces
  exactly. Rule C differs from the strict rule in one respect: it takes only the *first* token as
  the identity, so `lsic-2026-newsletter-august` and `lsic-newsletter-2026-june-final` land in one
  group, and so do the three `nasa`/`2025` files. Those two extra groupings are what makes it 16.
- **17 is the surplus-file count on the 182 basis, under four of the five rules.** It is not a group
  count under any rule I could construct. My own Step 0.2 Part 4 reported "17 groups holding more
  than one file and 20 surplus files." The 17 is real and it is the *surplus*; I labelled it as
  groups. The 20 does not reproduce under any of the five rules and I withdraw it.
- **9 is the strict rule on the 176 basis**, which is the figure the Step 2 brief names, reproduced
  exactly.

So 16 and 17 are not two answers to one question. They are the group count and the surplus count of
substantially the same clustering, and the reason nobody could settle it is that neither figure said
which noun it was counting. Neither seat measured wrong.

**The operative figure is 9 groups and 11 surplus files, under the strict rule on the 176-key
union**, because that is the population the merge produces and the strict rule is the one written
down. Rule C's two extra groups are both false pairs, verified by opening them.

```quantity
id:            Q-MERGE-AY-STRICT-9
class:         fixed
value:         9
unit:          author-year clusters holding more than one union key
population:    the 176 [Q-MERGE-UNION-176] union keys; 155 match the rule and 21 do not
operation:     cmd: node tools/clusters.js cr_scratch/merge_identity.tsv
               — the tool prints all five rules of §4 in one run; this value is the
               "keys with more than one member" figure on the RULE A block. The RULE A cluster key
               is the match of `^([a-z]+(?:-[a-z]+)?)-((?:19|20)\d{2})-` against the normalized
               filename: leading author token, optionally one hyphenated surname, then a
               four-digit year beginning 19 or 20, then a hyphen. Names that do not match are
               unkeyed and form no cluster
conditions:    inherits: Q-MERGE-UNION-176
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     9 author-year clusters on the 176-key union hold more than one member, covering 20
               files, 11 of them surplus. 4 of the 9 are true same-source duplicates, 1 holds two
               sources across four files, and 4 are distinct documents by the same author in the
               same year.
derived-from:  Q-MERGE-UNION-176
sampled:       20 inspected by hand, 0 found wrong, by The Engineer — every member of all 9
               clusters, classified against the identifier column of merge_identity.tsv
superseded:    none
```

```quantity
id:            Q-MERGE-AY-LEADTOKEN-16
class:         superseded
value:         16
unit:          author-year clusters holding more than one filename, on the pre-dedup 182-name union
population:    the 182 normalized filenames of the pre-dedup union (158 `lsei` + 119 `_intake`)
operation:     cmd: node tools/merge_identity.js <reconstructed-158-tree>
               _intake/japanese-miracle/lit /tmp/merge_identity_158.tsv
               && node tools/clusters.js /tmp/merge_identity_158.tsv
               — the reconstructed tree is built by the six `cp`s tabulated in §7 and is not
               committed; the intermediate TSV is not a deliverable and is not committed either.
               The tool prints all five rules; this value is the "keys with more than one member"
               figure on the RULE C block, whose cluster key is the first hyphen-token of the
               normalized filename plus the first `19xx`/`20xx` token appearing anywhere in it
conditions:    inherits: Q-MERGE-UNION-176, except that the `lsei` side is the reconstructed
               158-file pre-dedup tree described in §7 rather than the 152 on disk, and the input
               TSV is the 182-row run rather than the 176-row deliverable
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     16 clusters on the pre-dedup 182-name union hold more than one filename under the
               lead-token rule. This reproduces The Space Resources Engineer's figure exactly and
               names the rule that produces it.
derived-from:  none
sampled:       19 inspected by hand, 0 found wrong, by The Engineer
superseded:    Superseded by Q-MERGE-AY-STRICT-9 on the operative basis. The value is retained and
               is not an error: it is the right answer to a question about a corpus the dedup has
               since changed. Recorded so the 16-against-17 dispute resolves to a measurement
               rather than to a preference.
```

### `sowers-2019` holds four members, verified independently of any count

Not read off a cluster table. Enumerated by literal prefix match against the union, then each
member's citation block opened:

| Member | Identifier | Source |
|---|---|---|
| `sowers-2019-psr-ice-mining.md` | `10.1089/space.2019.0002` | Sowers and Dreyer, *New Space* 7(4), 235–244 |
| `sowers-2019-thermal-mining-ice.md` | `10.1089/space.2019.0002` | the same *New Space* paper |
| `sowers-2019-thermal-mining-niac.md` | none | NIAC Phase I Final Report, grant `80NSSC19K0964` |
| `sowers-2019-thermal-mining-niac-report.md` | none | the same NIAC final report |

**Four members, two sources, and the invariant holds under every one of the five rules.** All five
put all four in one cluster, so the invariant is not rule-dependent — which is exactly why it was
worth verifying separately from the count.

**It also shows what the precedence is missing.** The two NIAC files are the same document and the
precedence cannot say so: no DOI, no publisher URL, and a level-3 match is explicitly "a candidate
duplicate, never a confirmed one." What confirms it is the grant number `80NSSC19K0964`, printed in
both. §6 carries this as a recommendation, not a change: I do not own `NAMING.md` §7.

---

## 5. Loose end A3, dispositioned — I re-ran it

I did not strike the clause and leave it there. I reconstructed the population the clause says does
not exist and ran the claim against it, because the fixture cost four minutes and a struck clause
proves nothing about the retrieval behaviour.

**The reconstruction.** `lsei/literature/` (152 files) plus the 6 files at
`_intake/superseded-duplicates/`, restored to their pre-dedup filenames using the byte sizes in
`cr_scratch/step0_dedup_decisions.md` to pair each retained file back to its counterpart. Two of the
six carry renamed leaves and both are recoverable that way: `csank-2022-powering-the-moon-2.md` keeps
its `-2`, and `poston-2020-krusty-reactor-design-CANONICAL-superseded.md` is the 19,230-byte member,
which the dedup table shows held the canonical name before the smaller kept file was renamed onto
it. Result: **158 files**, and `listCorpusFiles()` counts 158.

**The clause is false, and it is now demonstrably false.** "The pre-dedup corpus no longer exists in
the working tree" — it does, in two directories, and I built it and ran against it. That clause is
struck. The Status cell four sentences later was the correct one all along.

**The claim, re-run.** `searchLiterature()` from `lsei/oracle/lib/literature_search.js`, unmodified,
against the reconstructed 158-file corpus, over 12 questions constructed from the tokens the two
`csank` filenames share so that both members score above zero:

```
RANKED           winner csank-2022-powering-the-moon.md     fracs 1/0        What are the options for powering the Moon?
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs 1/1        powering the Moon
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs 1/1        Csank 2022 powering the Moon
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs 0/0        How is the Moon powered?
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs .442/.442  powering the Moon with fission reactors
RANKED           winner csank-2022-powering-the-moon.md     fracs 1/.773     powering the Moon solar arrays regolith
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs 1/1        csank powering moon 2022 study
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs 1/1        What did Csank find about powering the Moon?
RANKED           winner csank-2022-powering-the-moon.md     fracs 1/.359     powering the Moon energy storage
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs .358/.358  powering the Moon surface power system trades
TIE->walk-order  winner csank-2022-powering-the-moon-2.md   fracs 1/1        Moon powering architecture 2022 csank
RANKED           winner csank-2022-powering-the-moon.md     fracs .424/0     powering the Moon night survival

tally: csank-2022-powering-the-moon-2.md 8, csank-2022-powering-the-moon.md 4
exact ties broken by walk order: 8 of 12
```

```quantity
id:            Q-MERGE-A3-CSANK-8OF12
class:         fixed
value:         8
unit:          questions of 12 on which the two `csank-2022` summaries tie exactly and the shorter
               one wins by directory-walk order
population:    12 questions, each constructed from tokens the two `csank-2022` filenames share so
               that both members score above zero, run against the reconstructed 158-file pre-dedup
               corpus described in §7
operation:     script: a3sweep.js, carried at §8; invoked as `node a3sweep.js <absolute path to
               lsei/oracle/lib/literature_search.js> <absolute path to the reconstructed 158-file
               tree>`. A question counts as an exact tie when the two members' `score` are equal
               and their `frac` from `confirmInText()` are equal
conditions:    cwd: repository root, 55 characters. `lsei` working copy at 7f97983,
               `literature_search.js` unmodified. The reconstructed tree is built outside the
               repository, in the session scratchpad, and is not committed
at:            2026-08-28; this repo 2b06d68; lsei 7f97983; cr-agents f0c976b
predicate:     On 8 of 12 questions the two `csank-2022` summaries score identically and confirm
               identically, and the 7,637-byte member wins by sort order alone; on the other 4 the
               full-text confirmation fraction differs and the 23,190-byte member wins.
derived-from:  none
sampled:       12 inspected by hand, 0 found wrong, by The Engineer — every question's candidate
               list read and each tie classified from the returned score and frac
superseded:    none
```

**What this settles, in three parts.**

1. **The substantive defect is real, and the direction is the bad one.** The `-2` suffix is invisible
   to the tokenizer, exactly as recorded, so the two members score identically on every question.
   `listCorpusFiles()` sorts, and `-` (0x2D) sorts before `.` (0x2E), so `…-moon-2.md` precedes
   `…-moon.md`; JavaScript's sort is stable, so on a full tie **the shorter summary wins by
   default**. The dedup was right to fire.
2. **`step0_dedup_decisions.md`'s mechanism is confirmed, for the majority case.** "Resolved by
   directory-walk order" is what happens on 8 of 12. A3's attribution to the ranker preferring one
   summary is confirmed on the other 4, where `confirmInText()` returns different fractions and
   breaks the tie on body text. Both mechanisms are live. Neither statement needs withdrawing, and
   the baseline's correction — that an order-dependent result is not a ranking result — is right for
   the 8 and does not cover the 4.
3. **The word "every" does not survive.** `step0_dedup_decisions.md` says "the Oracle cited the
   7,637-byte summary every time and the 23,190-byte summary never." The 23,190-byte summary wins on
   4 of 12 questions. The claim is a strong majority, not a universal, and the sentence should say
   so. That is a one-word correction to a file whose substance is otherwise verified, and I do not
   own that file; routed rather than edited.

**A3's row.** The Finding cell's "no longer exists in the working tree" clause is struck as false,
on the evidence of a run that used the population it says is gone. The retrieval claim itself is
re-run and is 8-of-12 rather than universal. The row now says one thing.

---

## 6. Recommendations, owned by seats that are not me

1. **A level-2 URL must have a path.** `merge_identity.js` already rejects a bare host, which
   removed 4 of 9 false identifier collisions in the first run. This belongs in `NAMING.md` §7
   beside "not a PDF-hosting mirror" — a site root fails for the same reason.
2. **A mirror-minted DOI is not a level-1 identifier.** ResearchGate's `10.13140/` prefix mints a
   DOI over somebody else's uploaded copy. One live instance, `colozza-2020`, and the file itself
   says so. Same clause, same reason.
3. **A landing page shared by two documents is still not an identifier.** The instrument cannot
   distinguish `nasa.gov/moontomarsarchitecture` used as an article address from the same string
   used as a program page, and it over-merged once out of six. Any level-2 identifier held by more
   than one union key should be a candidate, never a confirmation — the rule level 3 already carries.
4. **The precedence is missing a level between 2 and 3.** An agency report or grant number —
   `NASA/TP-20250010956`, `ESDMD-001`, `80NSSC19K0964`, `NP-2026-04-6806-HQ`, NTRS `20220004165` —
   is printed in the artifact, is unique to the document, and confirms rather than suggests. Two of
   the eight same-source pairs were confirmed by one, and both had to be hand-adjudicated because
   the precedence has no slot for it. `NAMING.md` §7 is The Systems Engineer's.
5. **`literature/REGISTER.tsv` and any further `.tsv` this step emits are gitignored.** The baseline
   found it; I hit it from the other side. `cr_scratch/merge_identity.tsv` is tracked — checked with
   `git check-ignore`, exit 1 — but the same table under `literature/` would not be.

---

## 7. Variances, and how this was built

**D8. The instruments are not in `tools/`.** My declared write set for this spawn is
`cr_scratch/step2_engineer_identity.md` and `cr_scratch/merge_identity.tsv`. `tools/merge_identity.js`
is outside it. The four scripts are therefore carried as fenced blocks in §8, which is the promotion
pattern this project already uses, and they must be lifted to `tools/merge_identity.js`,
`tools/clusters.js` and `tools/doicov.js` by whoever owns that write set at 2.2. The `operation:`
fields above are written against the promoted paths deliberately, so they become runnable as written
the moment the lift happens; until then they run from wherever the block is extracted to. **This is
the Step 2 inheritance I already carry a note on** — promotion lifted marked blocks rather than files
at 1.14, and I am adding four more blocks whose authority is a marker rather than a path. Flagged
rather than worked around.

**The reconstructed 158-file tree is not committed.** It is built in the session scratchpad from
`lsei/literature/` plus `_intake/superseded-duplicates/`. The six restorations:

| Retained file | Restored to |
|---|---|
| `metzger-2013-bootstrapping-space-industry-2.md` | `growth-and-industrial-theory/`, name unchanged |
| `azami-2024-lunar-manufacturing-review.md` (5,437 B) | `isru-processing/azami-2024-lunar-manufacturing-review-2.md` |
| `metzger-2021-aqua-factorem-2.md` | `isru-processing/`, name unchanged |
| `csank-2022-powering-the-moon-2.md` | `power-and-thermal/`, name unchanged |
| `poston-2020-krusty-reactor-design-CANONICAL-superseded.md` (19,230 B) | `power-and-thermal/poston-2020-krusty-reactor-design-2.md` |
| `speyerer-2013-persistently-illuminated-regions-2.md` | `power-and-thermal/`, name unchanged |

The two restorations that change a name are the two the dedup file records as renamed, and the byte
sizes in its table pair each one back without depending on the leaf that was rewritten. Anyone can
rebuild it: six `cp`s, and the result is 158 files.

**One instrument fault I produced and corrected, recorded because the pattern is the one this
project keeps hitting.** The first run took the deepest URL path in a citation block as the article
address, on the reasoning that more specific is more likely to be the document itself. It is not:
`nasa-data-gaps-acr25` cites two *other* documents' PDF URLs, both deeper than its own landing page,
and the heuristic picked one of them. The fix is not a better heuristic — it is to read the labelled
line first, because both corpora write the source's own identifier on a `DOI:` or `Publisher URL:`
line and write other documents' identifiers in prose. That one change also fixed `belbin-2024`,
`gott-2024`, `nasa-lunar-power-strategy-2025`, `hausmann-2005` and `wilson-2018`.

**And one I did not catch until the hand sample.** `colozza-2020` is the single classification error
in 26 files read by hand, and the file itself told me: its citation block says in as many words that
the ResearchGate DOI "is not a publisher-registered identifier and is not used as a locator here."
A shingle detector measures overlap and not passing-off; a DOI regex measures a string shape and not
authority, and the difference is visible only by opening the file. Recorded under `sampled:` at
Q-MERGE-DOI-89 rather than quietly fixed.

---

## 8. The instruments

Four scripts. All read-only against the corpus, all report their inputs, all re-runnable. The
Software Engineer runs these against the baseline independently in the next cycle; nothing here
depends on state this session created except the reconstructed tree, whose construction is the six
`cp`s in §7.

### `tools/merge_identity.js` — the source-identity extractor

Emits the deliverable TSV. Reports its inputs, its partition, its identifier-kind histogram, every identifier held by more than one union key, and the full no-identifier list, all on stderr so that stdout stays a clean TSV.

```javascript
#!/usr/bin/env node
// merge_identity.js -- Step 2.1 (MERGE-2) source-identity extractor. The Engineer, 2026-08-28.
// Usage: node merge_identity.js <lseiLitDir> <intakeLitDir> [outTsv]
// Emits TSV: file, corpus, identifier, identifier_kind, confidence
// Reports its own inputs on stderr before it emits anything.

const fs = require('fs');
const path = require('path');

const A_DIR = process.argv[2];
const B_DIR = process.argv[3];
const OUT   = process.argv[4] || null;
if (!A_DIR || !B_DIR) { console.error('usage: node merge_identity.js <lseiLitDir> <intakeLitDir> [outTsv]'); process.exit(2); }

// ---- normalize(), literature/NAMING.md section 1, verbatim, 7 steps ----
function normalize(name) {
  let s = path.basename(name);                 // 1 leaf only
  s = s.replace(/\.md$/i, '');                 // 2 strip exactly one trailing .md
  s = s.toLowerCase();                         // 3
  s = s.replace(/[_ ]+/g, '-');                // 4 runs of _ or space -> one -
  s = s.replace(/-{2,}/g, '-');                // 5 runs of 2+ - -> one -
  s = s.replace(/^-+|-+$/g, '');               // 6 trim leading/trailing -
  return s + '.md';                            // 7
}

function walk(dir) {
  const out = [];
  (function rec(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (/\.md$/i.test(e.name)) out.push(p);
    }
  })(dir);
  return out.sort();
}

// ---- citation block extraction ----
// Header precedence: Citation, then Provenance, then Metadata. NAMING.md section 7:
// "Read from the file's ## Citation block ... where a file carries ## Provenance or ## Metadata
//  instead, read that."
// Block runs from the header line to the next line matching ^#{1,3}\s or a lone ^---$.
const HDR = /^(#{2,3})\s*(Citation|Provenance|Metadata)\s*$/i;
function citationBlock(text) {
  const lines = text.split(/\r?\n/);
  const found = {};
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(HDR);
    if (!m) continue;
    const kind = m[2].toLowerCase();
    if (found[kind] !== undefined) continue;   // first occurrence only
    const body = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (/^#{1,3}\s/.test(lines[j])) break;
      if (/^-{3,}\s*$/.test(lines[j])) break;
      body.push(lines[j]);
    }
    found[kind] = body.join('\n');
  }
  for (const k of ['citation', 'provenance', 'metadata']) {
    if (found[k] !== undefined && found[k].trim() !== '') return { block: found[k], header: k };
  }
  return { block: null, header: null };
}

// ---- identifier parse ----
// LABELLED LINES FIRST. Both corpora write the source's own identifier on a labelled line
// ("DOI:", "- **DOI:**", "Publisher URL:"), and write OTHER documents' identifiers in prose --
// a preprint's arXiv DOI, a working-paper DOI, a cited companion report's URL, a template
// placeholder. Taking the first token found anywhere in the block picks those up. So: search the
// labelled lines first, and fall back to the whole block only when no labelled line carries one.
const DOI_LABEL = /^[\s>*|-]*\**\s*doi\b[^:]{0,20}:/i;
const URL_LABEL = /^[\s>*|-]*\**\s*(publisher\s*url|publisher|url|source\s*url|available\s*at|link)\b[^:]{0,20}:/i;

// Level 1: DOI. 10.NNNN/suffix, resolver prefix stripped, percent-decoded, lowercased.
const DOI_RE = /\b10\.\d{4,9}\/[^\s"'`<>\]}|]+/g;
// Registrant prefixes that mint a DOI over somebody else's uploaded copy. NAMING.md section 7
// rejects a PDF-hosting mirror at level 2 for the reason that it does not identify the publication;
// a mirror-minted DOI is the same object at level 1. 10.13140 is ResearchGate. Live instance:
// colozza-2020, whose own citation block says the ResearchGate DOI "is not a publisher-registered
// identifier and is not used as a locator here" -- the file was right and the first run of this
// tool was wrong.
const MIRROR_DOI = /^10\.13140\//;
function cleanDoi(raw) {
  let s = raw.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  try { s = decodeURIComponent(s); } catch (e) { /* leave as written */ }
  s = s.toLowerCase();
  s = s.replace(/[.,;:*]+$/, '');
  while (s.endsWith(')') && (s.split('(').length - 1) < (s.split(')').length - 1)) s = s.slice(0, -1);
  // a suffix that ends mid-token on an unclosed "(" is a truncation, not a DOI
  if ((s.split('(').length - 1) > (s.split(')').length - 1)) return '';
  // suffix of 1-2 characters is a truncated match or a template placeholder, not a DOI.
  // Live instance: "10.2514/6.<paper-number>" in downing-2005 truncates at "<" to "10.2514/6".
  if (!/^10\.\d{4,9}\/.{3,}/.test(s)) return '';
  if (MIRROR_DOI.test(s)) return '';
  return s;
}
// Level 2: publisher article URL. Scheme and www. stripped, query and fragment removed.
// Excluded: DOI resolvers (level 1 wearing a hat, NAMING.md section 7) and search-result links.
const URL_RE = /https?:\/\/[^\s"'`<>)\]}|,]+/g;
const RESOLVER = /^(dx\.)?doi\.org\//i;
const SEARCH = /(^|\.)google\.[a-z.]+\/(search|scholar)|^scholar\.google\.|[?&]q=/i;
function cleanUrl(raw) {
  let s = raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  s = s.split('#')[0].split('?')[0];
  s = s.replace(/[.,;:*]+$/, '').replace(/\/+$/, '');
  return s.toLowerCase();
}

function scan(lines, labelRe, tokenRe, clean) {
  const labelled = [], anywhere = [];
  for (const ln of lines) {
    const hits = (ln.match(tokenRe) || []).map(clean).filter(Boolean);
    if (!hits.length) continue;
    (labelRe.test(ln) ? labelled : anywhere).push(...hits);
  }
  return { labelled: [...new Set(labelled)], anywhere: [...new Set(anywhere)] };
}

function identify(block) {
  if (block === null) return { id: '', kind: 'none', conf: 'none', note: 'no-citation-block' };
  const lines = block.split('\n');

  // ---- level 1 ----
  const d = scan(lines, DOI_LABEL, DOI_RE, cleanDoi);
  if (d.labelled.length) {
    return { id: d.labelled[0], kind: 'doi', conf: d.labelled.length === 1 ? 'high' : 'medium',
             note: d.labelled.length === 1 ? '' : 'multiple-labelled-dois:' + d.labelled.length };
  }
  if (d.anywhere.length) {
    // unlabelled: the DOI is in the citation prose. Sound when there is exactly one; a block
    // holding several unlabelled DOIs is citing other documents and needs a person.
    return { id: d.anywhere[0], kind: 'doi', conf: d.anywhere.length === 1 ? 'medium' : 'low',
             note: d.anywhere.length === 1 ? 'doi-unlabelled' : 'unlabelled-dois:' + d.anywhere.length };
  }

  // ---- level 2 ----
  // A publisher ARTICLE url. A bare host with no path segment addresses a site, not a document,
  // so it is rejected rather than recorded -- NAMING.md section 7 rejects mirrors and
  // search-result links for the same reason, that they do not name the document.
  const isArticle = u => u.includes('/') && u.split('/').slice(1).some(seg => seg.length);
  const u = scan(lines, URL_LABEL, URL_RE, cleanUrl);
  const keep = a => a.filter(x => !RESOLVER.test(x) && !SEARCH.test(x));
  const uLab = keep(u.labelled), uAny = keep(u.anywhere);
  const artLab = uLab.filter(isArticle), artAny = uAny.filter(isArticle);
  if (artLab.length) {
    return { id: artLab[0], kind: 'url', conf: artLab.length === 1 ? 'medium' : 'low',
             note: artLab.length === 1 ? '' : 'multiple-labelled-urls:' + artLab.length };
  }
  if (artAny.length) {
    return { id: artAny[0], kind: 'url', conf: 'low',
             note: artAny.length === 1 ? 'url-unlabelled' : 'unlabelled-urls:' + artAny.length };
  }
  if (uLab.length || uAny.length) {
    return { id: '', kind: 'none', conf: 'none',
             note: 'host-only-url:' + [...new Set([...uLab, ...uAny])].join(',') };
  }
  return { id: '', kind: 'none', conf: 'none', note: 'block-present-no-identifier' };
}

// ---- run ----
const aFiles = walk(A_DIR), bFiles = walk(B_DIR);
const aMap = new Map(), bMap = new Map();
for (const f of aFiles) { const k = normalize(f); if (aMap.has(k)) console.error('COLLISION A ' + k); aMap.set(k, f); }
for (const f of bFiles) { const k = normalize(f); if (bMap.has(k)) console.error('COLLISION B ' + k); bMap.set(k, f); }
const keys = [...new Set([...aMap.keys(), ...bMap.keys()])].sort();

console.error('# merge_identity.js inputs');
console.error('# A ' + A_DIR + '  files ' + aFiles.length + '  distinct keys ' + aMap.size);
console.error('# B ' + B_DIR + '  files ' + bFiles.length + '  distinct keys ' + bMap.size);
console.error('# union keys ' + keys.length + '  both ' + keys.filter(k => aMap.has(k) && bMap.has(k)).length
  + '  A-only ' + keys.filter(k => aMap.has(k) && !bMap.has(k)).length
  + '  B-only ' + keys.filter(k => !aMap.has(k) && bMap.has(k)).length);

const rows = [['file', 'corpus', 'identifier', 'identifier_kind', 'confidence'].join('\t')];
const recs = [];
for (const k of keys) {
  const inA = aMap.has(k), inB = bMap.has(k);
  const corpus = inA && inB ? 'both' : inA ? 'lsei' : 'intake';
  // Where both corpora hold the key, the identifier is taken from whichever copy resolves at the
  // higher precedence level (NAMING.md section 7: DOI, then article URL, then nothing). Taking
  // the lsei copy by convention loses identifiers: the _intake copy of azami-2024 prints the
  // arXiv DOI and the lsei copy says "DOI: not printed in source".
  const RANK = { doi: 2, url: 1, none: 0 };
  const rA = inA ? identify(citationBlock(fs.readFileSync(aMap.get(k), 'utf8')).block) : null;
  const rB = inB ? identify(citationBlock(fs.readFileSync(bMap.get(k), 'utf8')).block) : null;
  let r, from;
  if (rA && rB) { if (RANK[rB.kind] > RANK[rA.kind]) { r = rB; from = 'intake'; } else { r = rA; from = 'lsei'; } }
  else if (rA) { r = rA; from = 'lsei'; } else { r = rB; from = 'intake'; }
  let conf = r.conf, note = r.note;
  if (rA && rB && rA.id !== rB.id) {
    note = (note ? note + ';' : '') + 'copies-disagree(from:' + from + ')';
    if (conf === 'high') conf = 'medium';
  }
  const confField = note ? conf + ':' + note : conf;
  rows.push([k, corpus, r.id, r.kind, confField].join('\t'));
  recs.push({ key: k, corpus, id: r.id, kind: r.kind, conf: confField });
}
if (OUT) fs.writeFileSync(OUT, rows.join('\n') + '\n');
else process.stdout.write(rows.join('\n') + '\n');

// ---- summary to stderr ----
const byKind = {}; for (const r of recs) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
console.error('# identifier_kind ' + JSON.stringify(byKind));
const withId = recs.filter(r => r.kind !== 'none');
const distinct = new Set(withId.map(r => r.kind + '|' + r.id));
console.error('# rows ' + recs.length + '  with identifier ' + withId.length + '  distinct identifiers ' + distinct.size);
const dupGroups = {};
for (const r of withId) { const kk = r.kind + '|' + r.id; (dupGroups[kk] = dupGroups[kk] || []).push(r.key); }
const shared = Object.entries(dupGroups).filter(([, v]) => v.length > 1);
console.error('# identifiers held by more than one union key: ' + shared.length
  + '  surplus rows ' + shared.reduce((a, [, v]) => a + v.length - 1, 0));
for (const [kk, v] of shared) console.error('#   ' + kk + '  ->  ' + v.join(' | '));
const noId = recs.filter(r => r.kind === 'none');
console.error('# NO IDENTIFIER (' + noId.length + ') -- flagged for 2.2 (MERGE-3):');
for (const r of noId) console.error('#   ' + r.key + '  [' + r.corpus + ']  ' + r.conf);
```
### `tools/clusters.js` — the author-year cluster reconciliation

All five rules of §4 in one run, plus the `sowers-2019` enumeration and the level-3 fallback over the rows with no identifier. Every figure in the §4 table comes from two invocations of this file, one per basis.

```javascript
#!/usr/bin/env node
// clusters.js -- Step 2.1 companion. Author-year clustering under two stated rules, and the
// level-3 fallback grouping over the rows merge_identity.tsv left without an identifier.
// Usage: node clusters.js <merge_identity.tsv>
const fs = require('fs');
const TSV = process.argv[2];
const rows = fs.readFileSync(TSV, 'utf8').trim().split(/\r?\n/).slice(1)
  .map(l => { const c = l.split('\t'); return { file: c[0], corpus: c[1], id: c[2], kind: c[3], conf: c[4] }; });

// RULE A -- STRICT. Leading author token, optional single hyphenated surname, then a 19xx/20xx
// year. Anchored at the start of the name. This is the rule the Step 2 brief describes.
const RULE_A = /^([a-z]+(?:-[a-z]+)?)-((?:19|20)\d{2})-/;
// RULE B -- PERMISSIVE, and the rule actually used below. Take every hyphen-separated token before
// the FIRST 19xx/20xx year token anywhere in the name, and use that whole prefix as the identity.
// It admits multi-token issuers (us-congress-2015, hague-working-group-2019), year-last names
// (lsic-newsletter-2026-june-final), and names where the year is not in position 2.
function ruleB(name) {
  const base = name.replace(/\.md$/, '');
  const toks = base.split('-');
  const i = toks.findIndex(t => /^(19|20)\d{2}$/.test(t));
  if (i <= 0) return null;
  return { author: toks.slice(0, i).join('-'), year: toks[i] };
}

function report(label, keyOf) {
  const g = {};
  let unkeyed = 0;
  for (const r of rows) { const k = keyOf(r.file); if (!k) { unkeyed++; continue; } (g[k] = g[k] || []).push(r.file); }
  const multi = Object.entries(g).filter(([, v]) => v.length > 1).sort();
  const surplus = multi.reduce((a, [, v]) => a + v.length - 1, 0);
  console.log('\n== ' + label);
  console.log('   keyed rows ' + (rows.length - unkeyed) + ' of ' + rows.length + '; unkeyed ' + unkeyed);
  console.log('   distinct author-year keys ' + Object.keys(g).length);
  console.log('   keys with more than one member: ' + multi.length + '; surplus files ' + surplus);
  for (const [k, v] of multi) console.log('   ' + k + '  (' + v.length + ')  ' + v.join(' | '));
}

// RULE C -- LEAD TOKEN ONLY. The first hyphen-token, plus the first 19xx/20xx token anywhere in
// the name. This is the rule that reproduces the figure 16 on the pre-dedup 182-name union: it
// groups lsic-2026-newsletter-august with lsic-newsletter-2026-june-final, and the three
// nasa/2025 files together, where every other rule keeps them apart.
function ruleC(name) {
  const t = name.replace(/\.md$/, '').split('-');
  const i = t.findIndex(x => /^(19|20)\d{2}$/.test(x));
  return i > 0 ? t[0] + '-' + t[i] : null;
}
// RULE D -- POSITIONAL. First token, and the second token only if it is a year.
function ruleD(name) {
  const t = name.replace(/\.md$/, '').split('-');
  return (t.length > 2 && /^(19|20)\d{2}$/.test(t[1])) ? t[0] + '-' + t[1] : null;
}
// RULE E -- PREFIX BEFORE YEAR, year found anywhere, prefix never empty.
function ruleE(name) {
  const t = name.replace(/\.md$/, '').split('-');
  const i = t.findIndex(x => /^(19|20)\d{2}$/.test(x));
  return i >= 0 ? t.slice(0, Math.max(i, 1)).join('-') + '-' + t[i] : null;
}

report('RULE A (strict): /^([a-z]+(-[a-z]+)?)-((19|20)\\d{2})-/',
  n => { const m = n.match(RULE_A); return m ? m[1] + '-' + m[2] : null; });
report('RULE B (permissive): all tokens before the first 19xx/20xx token',
  n => { const b = ruleB(n); return b ? b.author + '-' + b.year : null; });
report('RULE C (lead token only): first token + first 19xx/20xx token anywhere', ruleC);
report('RULE D (positional): first token + second token only if it is a year', ruleD);
report('RULE E (prefix before year, year anywhere)', ruleE);

// sowers-2019, verified independently of any count
console.log('\n== sowers-2019 membership, by literal prefix match');
const sow = rows.filter(r => /^sowers-2019-/.test(r.file));
for (const r of sow) console.log('   ' + r.file + '\t' + (r.id || '(none)') + '\t' + r.kind);
console.log('   members: ' + sow.length);

// level-3 fallback over the rows with no identifier
console.log('\n== level-3 grouping over rows with identifier_kind=none');
const none = rows.filter(r => r.kind === 'none');
const g3 = {};
for (const r of none) {
  const b = ruleB(r.file);
  const k = b ? b.author + '|' + b.year : 'NOYEAR|' + r.file.replace(/\.md$/, '');
  (g3[k] = g3[k] || []).push(r.file);
}
const m3 = Object.entries(g3).filter(([, v]) => v.length > 1);
console.log('   rows ' + none.length + '; distinct level-3 author-year keys ' + Object.keys(g3).length);
for (const [k, v] of m3) console.log('   CANDIDATE ' + k + '  ' + v.join(' | '));
console.log('   candidate groups ' + m3.length + '; surplus ' + m3.reduce((a, [, v]) => a + v.length - 1, 0));
```
### `tools/doicov.js` — the seven DOI-coverage definitions

Prints all seven rows of the §3 table in one run, so that no definition can be quoted without the six it was chosen over.

```javascript
const fs=require('fs'),path=require('path');
function normalize(n){let s=path.basename(n).replace(/\.md$/i,'').toLowerCase().replace(/[_ ]+/g,'-').replace(/-{2,}/g,'-').replace(/^-+|-+$/g,'');return s+'.md';}
function walk(d,o=[]){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p,o);else if(/\.md$/i.test(e.name))o.push(p);}return o;}
const A=walk(process.argv[2]),B=walk(process.argv[3]);
const am=new Map(),bm=new Map();for(const f of A)am.set(normalize(f),f);for(const f of B)bm.set(normalize(f),f);
const keys=[...new Set([...am.keys(),...bm.keys()])].sort();
const BARE=/\b10\.\d{4,9}\/[^\s"'`<>\]}|]{3,}/;
const RESOLVER=/https?:\/\/(dx\.)?doi\.org\/10\.\d{4,9}\//i;
const LABEL=/^[\s>*|-]*\**\s*doi\b[^:]{0,20}:.*\b10\.\d{4,9}\/[^\s"'`<>\]}|]{3,}/im;
function blk(t){const L=t.split(/\r?\n/);const f={};for(let i=0;i<L.length;i++){const m=L[i].match(/^(#{2,3})\s*(Citation|Provenance|Metadata)\s*$/i);if(!m)continue;const k=m[2].toLowerCase();if(f[k]!==undefined)continue;const b=[];for(let j=i+1;j<L.length;j++){if(/^#{1,3}\s/.test(L[j])||/^-{3,}\s*$/.test(L[j]))break;b.push(L[j]);}f[k]=b.join('\n');}
for(const k of ['citation','provenance','metadata'])if(f[k]&&f[k].trim())return f[k];return '';}
const defs={
 'anywhere-in-file, either copy':(a,b)=>[a,b].filter(Boolean).some(f=>BARE.test(fs.readFileSync(f,'utf8'))),
 'anywhere-in-file, lsei copy preferred':(a,b)=>BARE.test(fs.readFileSync(a||b,'utf8')),
 'anywhere-in-file, resolver-URL form only, either':(a,b)=>[a,b].filter(Boolean).some(f=>RESOLVER.test(fs.readFileSync(f,'utf8'))),
 'in citation block, either copy':(a,b)=>[a,b].filter(Boolean).some(f=>BARE.test(blk(fs.readFileSync(f,'utf8')))),
 'in citation block, lsei copy preferred':(a,b)=>BARE.test(blk(fs.readFileSync(a||b,'utf8'))),
 'on a DOI-labelled line anywhere in file, either':(a,b)=>[a,b].filter(Boolean).some(f=>LABEL.test(fs.readFileSync(f,'utf8'))),
 'on a DOI-labelled line in citation block, either':(a,b)=>[a,b].filter(Boolean).some(f=>LABEL.test(blk(fs.readFileSync(f,'utf8')))),
};
for(const [name,fn] of Object.entries(defs)){let c=0;for(const k of keys){if(fn(am.get(k),bm.get(k)))c++;}console.log(String(c).padStart(4)+'  '+name);}
console.log('   n union keys '+keys.length);
```
### `a3sweep.js` — the A3 re-run

Takes the absolute path to `lsei/oracle/lib/literature_search.js` and the absolute path to the reconstructed 158-file tree. Not a `tools/` candidate: it exercises another repository’s library against a fixture that is not committed.

```javascript
const L=require(process.argv[2]);const dir=process.argv[3];
// Question set: every question in which BOTH csank members score > 0, built from the tokens the
// two filenames share. 12 forms, varying only the surrounding topic words.
const qs=['What are the options for powering the Moon?','powering the Moon',
'Csank 2022 powering the Moon','How is the Moon powered?','powering the Moon with fission reactors',
'powering the Moon solar arrays regolith','csank powering moon 2022 study',
'What did Csank find about powering the Moon?','powering the Moon energy storage',
'powering the Moon surface power system trades','Moon powering architecture 2022 csank',
'powering the Moon night survival'];
let win={},ties=0;
for(const q of qs){const r=L.searchLiterature(dir,q,{limit:10});
 const cs=r.candidates.filter(c=>/csank/.test(c.filename));
 if(cs.length<2){console.log('SKIP (fewer than 2 csank candidates): '+q);continue;}
 const w=cs[0].filename.replace(/^.*\//,'');win[w]=(win[w]||0)+1;
 const tie=cs[0].score===cs[1].score&&(cs[0].frac||0)===(cs[1].frac||0);if(tie)ties++;
 console.log((tie?'TIE->walk-order ':'RANKED         ')+' winner '+w.padEnd(34)+' score '+cs[0].score.toFixed(3)+'  fracs '+cs.map(c=>c.frac).join('/')+'   Q: '+q);}
console.log('\nwinner tally '+JSON.stringify(win)+'   exact ties broken by walk order: '+ties+' of '+qs.length);
```

---

## 9. Output

`cr_scratch/merge_identity.tsv`, 177 lines: one header and 176 [Q-MERGE-UNION-176] rows, one per
union key, columns `file`, `corpus`, `identifier`, `identifier_kind`, `confidence`. Every row has
five tab-separated fields; LF line endings; ASCII. `corpus` is `both`, `lsei` or `intake`.
`identifier_kind` is `doi`, `url` or `none`. `confidence` is `high`, `medium`, `low` or `none`,
optionally followed by a colon and a machine-readable note naming why.

| `identifier_kind` | `confidence` | rows |
|---|---|---|
| `doi` | `high` — a single DOI on a labelled `DOI:` line | 30 |
| `doi` | `medium` — a single DOI in citation prose, or the two copies disagreeing | 59 |
| `url` | `medium` — a single labelled publisher article URL | 36 |
| `url` | `low` — unlabelled, or more than one labelled | 12 |
| `none` | `none` — flagged for 2.2 | 39 |

30 + 59 + 36 + 12 + 39 = 176. DOI 89, URL 48, none 39.
