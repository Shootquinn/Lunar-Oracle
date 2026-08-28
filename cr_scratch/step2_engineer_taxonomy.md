# Step 2.3 (MERGE-4) — the taxonomy, landed as a proposal

**The Engineer, sub-step 2.3, 2026-08-28. Nothing moves in this cycle.** This file is the placement,
not the migration. `literature/INDEX.tsv` is specified here and written at 2.5.

**How to review only your half.** §4 is split into the seven lunar folders and the four economics
folders and the two halves share no file. §1, §2 and §3 are common and are short. §5 lists the 73
second memberships; six of them cross the halves and are called out by name, and those six are the
only rows either reviewer needs from the other's section. Everything else in §4 is yours alone.

**What changed from my Step 0 Part 2, stated up front so nobody reviews the wrong document.**

| | Part 2 (0.2) | Here (2.3) |
|---|---|---|
| Basis | 158 LSEI files, pre-dedup | 152 LSEI + 24 corpus-unique = **176**, post-dedup |
| Field label | **absent** | `literature/FIELDS.tsv`, §2, bound to `NAMING.md` §9 |
| `self-replication-and-automation` field | unstated | `lunar` |
| `space-economy-and-markets` field | unstated | `lunar`, on a measurement, §2.4 |
| FA derivation grade | unstated | third column of `FIELDS.tsv`, §3 |
| `INDEX.tsv` columns | `path`, `primary`, `also` | those three plus `field`, §6 |
| `gott-2024-card-gas-analysis-subsystem` | not in Part 2's population | `isru-processing` |

Part 2's substantive taxonomy call is unchanged and unrecanted: eleven folders, one level deep,
`growth-and-industrial-theory` dissolved rather than extended. What was wrong with Part 2 is that it
was incomplete, and §2 is the hole.

---

## 1. The eleven folders, and their sizes on the basis I am actually placing against

Part 2 said "none over 32, none under 5" and that was a claim about 158 files that no longer exist as
a population. Restated.

**Counting rule, and it is attached to every figure in this section.** A file's folder is the second
path segment of its `path` field in the index block at §6. One file, one folder. `also` is a
cross-reference and is never counted as membership. The population is the 176-name union of
`lsei/literature` and `_intake/japanese-miracle/lit` under the `normalize()` rule of
`literature/NAMING.md` §1, which is `Q-OVERLAP-95`'s population and gives 95 + 57 + 24 = 176.

| # | Folder | Field | Inherited from LSEI (of 152) | Placed here (of 176) | Delta |
|---|---|---|---|---|---|
| 1 | `lunar-ice-and-geology` | `lunar` | 20 | **20** | — |
| 2 | `isru-processing` | `lunar` | 30 | **31** | +1 |
| 3 | `power-and-thermal` | `lunar` | 17 | **17** | — |
| 4 | `logistics-and-delivery` | `lunar` | 13 | **13** | — |
| 5 | `programme-primaries` | `lunar` | 10 | **10** | — |
| 6 | `space-law-and-governance` | `lunar` | 10 | **10** | — |
| 7 | `self-replication-and-automation` | `lunar` | (new) | **5** | +5 |
| 8 | `space-economy-and-markets` | `lunar` | 26 | **26** | — |
| 9 | `growth-theory` | `economics` | (new) | **13** | +13 |
| 10 | `development-and-industrial-policy` | `economics` | (new) | **22** | +22 |
| 11 | `organization-and-production-systems` | `economics` | (new) | **9** | +9 |
| | `growth-and-industrial-theory` | — | 26 | **dissolved** | −26 |
| | **Total** | | **152** | **176** | **+24** |

`152 − 26 + 5 + 13 + 22 + 9 + 1 = 176.` The dissolved folder's 26 files go 5 to
`self-replication-and-automation`, 8 to `growth-theory`, 8 to `development-and-industrial-policy` and
5 to `organization-and-production-systems`. The +1 on `isru-processing` is
`gott-2024-card-gas-analysis-subsystem`, the one corpus-unique Japanese Miracle file that is not
economics; the other 23 go to the three new economics folders.

**The size claim, restated: none over 31 and none under 5.** The maximum is `isru-processing` at 31
and the minimum is `self-replication-and-automation` at 5. Part 2's "none over 32" was the same claim
against `isru-processing` at its pre-dedup size of 32, and the A3 deletions plus `gott-2024` net it to
31. The floor is unchanged and is the same folder.

**Where the 152 and the 158 reconcile.** They already do, in
`cr_scratch/step2_orchestrator_baseline.md`: the six-file gap is 2 in `isru-processing`, 3 in
`power-and-thermal`, 1 in `growth-and-industrial-theory`, and those six are exactly the A3 deletions
now retained at `_intake/superseded-duplicates/`. Both figure sets are correct on their own basis and
neither needs amending. **This file uses the 152 basis and only the 152 basis.** Any figure here that
appears to disagree with my Part 2 disagrees because Part 2 counted a different population, and the
delta is six files plus the 24.

**The floor at 5 is a real constraint and it is the one I would defend last.** A five-file folder is
defensible only because those five are a genuine subject with no home — Freitas 1980, Chirikjian
×2, Lee 2008 and Metzger 2013 are self-replicating machinery, not ISRU and not economics, and Part 2's
whole argument for dissolving `growth-and-industrial-theory` was that it had become the folder those
five were dumped in. Folding them back into `isru-processing` would restore the defect in a different
folder. If a reviewer wants that folder gone, the honest alternative is ten folders, not eleven, and
`isru-processing` at 36.

---

## 2. The machine-readable field label

This is the section my Part 2 did not have, and it is why 2.3 exists as a hard requirement rather
than as Part 2 re-executed.

### 2.1 Where it lives, what its values are, what reads it

**Authority: `literature/NAMING.md` §9.** It is landed, it is the only landed authority that specifies
a field label, and this section binds to it rather than restating it.

**Where.** In the path. Specifically, in a committed map at **`literature/FIELDS.tsv`**, one row per
taxonomy folder, closed and exhaustive over the eleven. The retrieval layer derives a file's field
from the first segment of the relative path `listCorpusFiles()` already returns. Not in the filename
(§9 measured the cost: a field tag in the leading position becomes `leadAuthor` and fires the +3
identity bonus for every file in the field, converting the strongest signal a filename offers into a
constant). Not in the file (§9: a front-matter field can be edited into disagreement with the folder
it sits in and nothing notices; a file has exactly one path, so a path-borne label cannot drift).

**The file, in full. Three columns, tab-separated, eleven rows and a header.**

```fields-tsv
folder	field	grade
lunar-ice-and-geology	lunar	summary
isru-processing	lunar	summary
power-and-thermal	lunar	summary
logistics-and-delivery	lunar	summary
programme-primaries	lunar	summary
space-law-and-governance	lunar	summary
self-replication-and-automation	lunar	summary
space-economy-and-markets	lunar	summary
growth-theory	economics	summary
development-and-industrial-policy	economics	summary
organization-and-production-systems	economics	summary
```

**Closed value set for `field`: exactly two, `lunar` and `economics`.** Closed means a folder whose
name is not in column 1, or a `field` value that is not one of those two, is a check failure and not a
new field. Adding a third field is an amendment, not an edit, because a third field repartitions every
document-frequency table in the system. The third column `grade` is §3.

**Eleven folders are not two fields**, which is §9's own sentence and is why this is data and not a
rule. The taxonomy will change again and the partition may not change with it. Concretely: moving a
folder between fields is a one-line edit here and moves zero files; renaming a folder moves 176 paths
and edits one line here.

**What reads it.** Verified at source this session against `lsei/oracle/lib/literature_search.js`:

- `listCorpusFiles(literatureDir)` (line 73) walks to any depth and returns paths relative to
  `literatureDir`. The first segment of that relative path is the folder. This function already
  returns everything the label needs and needs no change.
- `corpusDocFrequency(literatureDir)` (line 168) builds **one** document-frequency table over the
  whole corpus directory with no field scoping, cached in `_dfCache` keyed by `literatureDir` alone.
- `idf(literatureDir, t)` (called at line 139–147 from `scoreFile`) reads that single table.

The change 3.7 makes is exactly three things: `corpusDocFrequency(literatureDir, field)`, `_dfCache`
keyed by `literatureDir + "\0" + field`, and `idf(literatureDir, field, t)`. `scoreFile` learns the
field from the candidate's own path, which it already has. `filenameTokens()` is not touched and must
not be: it reads `baseName()` only, by design and with a comment saying so, and that is precisely the
property that makes the folder segment the one machine-readable and deliberately unscored place in the
codebase — which is what a field label needs.

**The folder is not the field and neither is the address.** Three fields doing three jobs, and
conflating any two of them is the failure this section exists to prevent:

| Field | Job | Cardinality | Read by |
|---|---|---|---|
| folder (path segment 2) | navigation, and the address | 11 | a human, and `FIELDS.tsv` as its key |
| `also` | cross-reference | 0 or 1 per file | `INDEX.tsv` consumers |
| field (`FIELDS.tsv` lookup) | IDF scoping | 2 | `corpusDocFrequency`, `idf` |

### 2.2 How a file satisfies my Part 2 and still fails this step

This is the gap, stated so it cannot be executed past.

A file lands at `literature/development-and-industrial-policy/beason-1996-targeting-japan.md`. Its
`## Provenance` block carries a correct `- **Also:** growth-theory`. It appears in `INDEX.tsv` with a
correct `path`, a correct `primary` and a correct `also`. **Every assertion my Part 2 specifies
passes.** The corpus lands, the folder structure is right, the cross-reference is queryable, the
directory listing fits on a screen.

And `corpusDocFrequency()` still builds one pooled table over 176 files, `idf()` still reads it, and
B3 is untouched. Nothing in Part 2 is wrong; Part 2 simply has no artifact that a retrieval layer can
read to know that this file and `sowers-2019-psr-ice-mining.md` belong to different vocabulary
distributions. The `primary` column is a **folder**, and eleven folders are not two fields — you
cannot derive the field from the folder without the map, and the map is the artifact Part 2 does not
specify. So the field partition would exist nowhere: not in the filename, not in the file, not in the
path semantics, not in any committed file.

**The failure is silent and it is passing-in-appearance.** There is no error, no missing file, no
failed check. A reviewer diffing the landed corpus against Part 2 finds full compliance. The only
symptom is that answers are slightly worse than they should be, on questions whose terms straddle the
two fields — and "slightly worse retrieval" is not something any assertion in Part 2 can see.

Three further things point at the same hole and each is independent of the other two:

1. `cr_scratch/step0_software_engineer_loop.md` §8.2 states the requirement from the retrieval side,
   in its own words: "**a retrieval requirement, not a taxonomy preference**", and adds that "eight
   topic folders plus some new ones" does not satisfy it unless the top-level split is by field. Mine
   is eleven folders plus a map, which satisfies it by the map rather than by the split.
2. `.gitignore` has whitelisted `literature/FIELDS.tsv` **by name** since sub-step 1.1 — line 59, with
   `literature/INDEX.tsv` at line 60 — and nothing has written it since. A whitelisted path with no
   writer is a contract with one side missing. This section is the writer.
3. B3 is the loose end that cannot close without it.

My Part 2 is the only one of the four Step 0 designs that does not mention a field label. That is a
defect in my document and this section is the correction.

### 2.3 B3, measured rather than asserted

B3 says the pooled IDF table gives "policy", "capital" and "targeting" a weight wrong for both halves.
I ran it against this taxonomy. Document frequency over full file bodies, Okapi-form
`idf = ln(1 + (N − df + 0.5)/(df + 0.5))`, pooled over 176 against scoped over 132 and 44:

| term | field | scoped df | pooled IDF | scoped IDF | error (nats) |
|---|---|---|---|---|---|
| `capital` | economics | 34 / 44 | 1.23 | **0.27** | 0.97 |
| `capital` | lunar | 17 / 132 | 1.23 | **2.03** | 0.79 |
| `policy` | economics | 27 / 44 | 1.11 | **0.49** | 0.61 |
| `policy` | lunar | 31 / 132 | 1.11 | **1.44** | 0.33 |
| `targeting` | economics | 7 / 44 | 2.21 | **1.79** | 0.41 |
| `targeting` | lunar | 12 / 132 | 2.21 | **2.36** | 0.16 |

**B3 is real and it is understated on `capital` and overstated on `targeting`.** `capital` is the
worst of the three by a factor of two: pooled it looks moderately informative at 1.23, when in the
economics half it is nearly a stopword at 0.27 and in the lunar half it is a strong discriminator at
2.03. The pooled figure is wrong for both halves in opposite directions, which is exactly B3's claim
and the first time it has carried a number. `targeting` is the weakest case — 0.16 nats on the lunar
side is noise — and B3 should stop leading with it.

The larger errors are not on B3's three terms at all. Sorted by error over every term with pooled
df ≥ 4, the top of the list is domain vocabulary leaking across the boundary:

| term | field where it is rare | scoped df | pooled IDF | scoped IDF | error |
|---|---|---|---|---|---|
| `moon` | economics | 2 / 44 | 0.76 | 2.89 | 2.13 |
| `income` | lunar | 3 / 132 | 1.73 | 3.64 | 1.91 |
| `mission` | economics | 2 / 44 | 1.01 | 2.89 | 1.88 |
| `political` | lunar | 2 / 132 | 2.11 | 3.97 | 1.87 |
| `launch` | economics | 2 / 44 | 1.03 | 2.89 | 1.87 |
| `terrestrial` | economics | 2 / 44 | 1.12 | 2.89 | 1.77 |
| `water` | economics | 3 / 44 | 0.84 | 2.55 | 1.72 |

Just outside that seven, `japanese` errs by 1.66 on the lunar side at 4 / 132.

These are up to 2.1 nats, against B3's worst of 0.97. **The pooled table's real damage is that a
lunar term appearing in two economics files is scored as if it were common, and vice versa.** That is
the argument for scoping, and it is stronger than the one B3 makes.

### 2.4 Which field `space-economy-and-markets` belongs to, decided by measurement

This is the one cell in `FIELDS.tsv` that is not obvious, and I did not want to decide it by argument.

The folder straddles: Ehricke on selenospheric economics and Colvin on cislunar demand use space
vocabulary; `gdp.md`, `statistical-review-of-world-energy.md` and Highfill use macro vocabulary. So I
built the document-frequency profile of each candidate partition and measured how separated the two
fields are. Lower cosine between the two field profiles means the two fields have more distinct
vocabulary, which is the whole reason to scope.

```
P1: space-economy-and-markets -> economics   |lunar|=106  |econ|=70   between-field cosine 0.8292
P2: space-economy-and-markets -> lunar       |lunar|=132  |econ|=44   between-field cosine 0.7710

space-economy-and-markets own profile vs the lunar core (7 folders, 106 files)     0.8389
space-economy-and-markets own profile vs the economics core (3 folders, 44 files)  0.7443
```

**P2 wins on both tests and it is what `FIELDS.tsv` above encodes.** The folder's vocabulary is closer
to the lunar core than to the economics core (0.839 against 0.744), and assigning it to `lunar`
separates the two fields better (0.771 against 0.829). Assigning it to `economics` would pool Ehricke
with Rosenstein-Rodan, which is the B3 error committed deliberately.

**This makes the field split 8 / 3 while the review split is 7 / 4, and that is not an inconsistency.**
They are different partitions answering different questions:

- **Review routing** is by who can judge whether a file is in the right folder. Seven folders to The
  Space Resources Engineer; four to The Manager, and `space-economy-and-markets` is one of his because
  it is a folder of economics papers about space, and he is the one who can tell whether Ehricke 1981
  and McKeown 2024 belong together.
- **Field partition** is by vocabulary distribution, and is a retrieval parameter.

Conflating the two would be the same class of error as conflating the folder with the field. If a
reviewer disagrees with the `space-economy-and-markets` field cell, say so — it is a one-line edit to
`FIELDS.tsv`, it moves zero files, and §9 explicitly anticipates the partition changing without the
taxonomy changing. It is the cheapest thing in this proposal to reverse and the only cell I would call
genuinely contestable.

---

## 3. The FA derivation grade

Author ruling 1.2 (ECON-12) is closed: `_intake/japanese-miracle/fa/`, 19 files, is a **separate
shelf** with a separate retrieval contract and a separate trace grade. An FA deliverable is a
cross-source adjudication carrying a verdict column and arithmetic present in no source; a summary's
warrant is that every claim resolves to one source. The FA shelf does not merge into `literature/` and
none of its 19 files appears anywhere in §4 or §6.

**Does the taxonomy carry a derivation grade as a result? Yes, and it is one column with one value.**

**What it is.** A third column `grade` on `literature/FIELDS.tsv`, closed value set of two —
`summary` and `adjudication` — and all eleven rows read `summary`. See the file in §2.1.

**Where it is written.** `literature/FIELDS.tsv`, column 3. Not per file, and not in the
`## Provenance` block. The grade is a property of the shelf, and under 1.2 the shelf is the path root:
everything under `literature/` is grade `summary` by construction, because the one population that
would have been `adjudication` was ruled out of `literature/` before placement.

**Why a column that is constant is worth the three characters.** Three reasons, and the first is the
only one that matters.

1. **The constant is the invariant, and an invariant nobody can read is a rule someone must
   remember.** "Everything in `literature/` is a summary" is true today *because* 1.2 held the FA shelf
   out, not because it is a law of the corpus. Writing it as data means a checker asserts it — and the
   assertion that fires is `every grade in FIELDS.tsv is "summary"`, whose failure means somebody has
   landed an adjudication in the corpus. Without the column, that landing is invisible until an
   answer's trace grade is wrong.
2. **Pooling a `summary` with an `adjudication` is the B3 failure one level up.** B3 is two
   populations with different vocabulary distributions sharing an IDF table. This is two populations
   with different *warrants* sharing a retrieval contract: a summary's claim resolves to one source, an
   FA verdict resolves to an adjudication over several plus arithmetic in neither. An answering loop
   that cannot distinguish them cannot state the right trace grade, and the trace grade is the thing
   1.2 was about.
3. **The FA shelf will want retrieval eventually, and when it does it needs a field that is not one
   of these two.** The map already has the column to say so, and `grade` and `field` are independent:
   the FA shelf is `economics` by vocabulary and `adjudication` by warrant, and neither implies the
   other.

**What I am not proposing.** No FA file moves, no FA file is graded here, and no retrieval contract
for the FA shelf is designed here. All three are outside 2.3. What 2.3 owes is the statement that the
corpus taxonomy is homogeneous in derivation grade and the artifact that says so, and that is the
column.

---

## 4. Placement

Second-membership lines are shown inline as `- **Also:**`. Origin tag after each name:
**[S]** scenario-explorer only (57 files), **[J]** japanese-miracle only (24), **[B]** both (95).
Those three figures are `Q-OVERLAP-95`'s and they reproduce exactly over this placement.

**Duplicate pairs are 2.2's business, not mine.** Where two files summarize one source — the seven
DOI-confirmed pairs plus `azami-2024` and `metzger-2021` — **both members are placed in the same
folder** and both appear below. Placement does not adjudicate primary against secondary and does not
rename; 2.2 does both, and every rename it makes edits one `path` cell in §6 and moves nothing.

### 4A. The seven lunar folders — The Space Resources Engineer

#### `lunar-ice-and-geology` — 20 files, field `lunar`

- `andrews-hanna-2025-spa-magma-ocean.md` [B]
- `cannon-2020-lunar-ice-geologic-model.md` [S]  - **Also:** `isru-processing`
- `colaprete-2010-lcross-ejecta-water-detection.md` [S]
- `colaprete-2010-lcross-water.md` [B]
- `crawford-2015-lunar-resources-review.md` [B]  - **Also:** `isru-processing`
- `hagerty-2011-spa-basalt-pond-thorium.md` [B]
- `hayne-2020-micro-cold-traps.md` [S]
- `horvath-2022-lunar-pits-caves-thermal.md` [S]  - **Also:** `power-and-thermal`
- `lawrence-2003-small-area-thorium.md` [B]
- `levin-2025-lunar-crustal-kreep-distribution.md` [B]
- `li-2018-surface-exposed-water-ice.md` [S]
- `li-2026-shadowcam-psr-water-ice.md` [S]
- `litvak-2024-lend-cabeus-water-ice.md` [S]
- `luchsinger-2021-lcross-water-modeling.md` [S]
- `mcleod-2017-extraterrestrial-ree.md` [B]  - **Also:** `space-economy-and-markets`
- `paige-2010-diviner-cold-trap-temperatures.md` [S]
- `paige-2010-diviner-psr-cold-traps.md` [B]
- `prettyman-2006-lunar-elemental-composition.md` [B]
- `schorghofer-2026-current-theories-lunar-ice.md` [S]
- `wilson-2018-lp-thorium-reconstruction.md` [B]

#### `isru-processing` — 31 files, field `lunar`

- `azami-2024-lunar-manufacturing-review.md` [B]
- `barnett-2025-regolith-consolidation-water-ice.md` [S]  - **Also:** `lunar-ice-and-geology`
- `barnett-2025-volatile-exposure-limits.md` [S]  - **Also:** `lunar-ice-and-geology`
- `colozza-2010-solar-lunar-oxygen.md` [B]
- `gott-2024-card-gas-analysis-subsystem.md` [J]
- `just-2020-regolith-excavation-review.md` [S]
- `kiewiet-2026-luwex-water-extraction.md` [S]
- `kleinhenz-2017-mars-ascent-vehicle-propellant.md` [S]
- `kleinhenz-2020-polar-water-case-studies.md` [S]
- `kokkinis-2024-automated-drilling-mining-review.md` [B]  - **Also:** `self-replication-and-automation`
- `leger-2025-energy-oxygen-moon.md` [B]
- `linne-2020-lunar-water-pilot-plant.md` [S]
- `liu-2025-microwave-sintering-lunar-regolith-simulants.md` [S]
- `metzger-2020-aqua-factorem.md` [S]
- `metzger-2021-aqua-factorem.md` [S]
- `nasa-2023-card-carbothermal-reduction.md` [S]
- `olson-2021-lunar-helium3-mining.md` [B]  - **Also:** `space-economy-and-markets`
- `pino-2022-lunar-waste-management.md` [B]
- `rahimdel-2024-mining-truck-reliability-bayesian.md` [B]  - **Also:** `organization-and-production-systems`
- `rostami2018.md` [S]
- `rostami2018-figures.md` [S]
- `sargeant-2020-hydrogen-reduction-ilmenite-static.md` [S]
- `schreiner-2016-molten-regolith-electrolysis-sizing.md` [S]
- `schreiner-2016-mre-sizing-model.md` [B]
- `sibille-2012-joule-heated-mre.md` [B]
- `sowers-2019-psr-ice-mining.md` [S]  - **Also:** `lunar-ice-and-geology`
- `sowers-2019-thermal-mining-ice.md` [B]  - **Also:** `lunar-ice-and-geology`
- `sowers-2019-thermal-mining-niac.md` [S]  - **Also:** `lunar-ice-and-geology`
- `sowers-2019-thermal-mining-niac-report.md` [B]  - **Also:** `lunar-ice-and-geology`
- `wang-2025-microwave-water-production.md` [S]
- `wittenberg-1992-he3-resources-review.md` [S]  - **Also:** `space-economy-and-markets`

#### `power-and-thermal` — 17 files, field `lunar`

- `473486main-iss-atcs-overview.md` [B]
- `belbin-2024-vsat-grd-demonstrator.md` [S]
- `colozza-2020-lunar-base-power-comparison.md` [S]
- `csank-2022-powering-the-moon.md` [B]
- `glaser-2014-south-pole-illumination.md` [S]  - **Also:** `lunar-ice-and-geology`
- `gordon-2001-lunar-dc-transmission.md` [S]
- `ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md` [B]
- `isnps-tech-report-103.md` [B]
- `isnps-tech-report-97.md` [B]
- `kerslake-2007-lunar-surface-power-transfer.md` [S]
- `nasa-lunar-power-strategy-2025.md` [S]
- `oleson-2022-deployable-fsp.md` [S]
- `pappa-2021-relocatable-solar-array.md` [S]
- `poston-2020-krusty-reactor-design.md` [B]
- `ross-2023-lunar-south-pole-solar-power.md` [S]  - **Also:** `lunar-ice-and-geology`
- `speyerer-2012-in-search-of-shade.md` [S]  - **Also:** `lunar-ice-and-geology`
- `speyerer-2013-persistently-illuminated-regions.md` [S]  - **Also:** `lunar-ice-and-geology`

#### `logistics-and-delivery` — 13 files, field `lunar`

- `adilov-2022-launch-cost-reductions.md` [B]  - **Also:** `space-economy-and-markets`
- `falcon-heavy-wikipedia.md` [B]
- `ishimatsu-2016-multicommodity-logistics-network.md` [S]
- `jones-2019-cislunar-isru-breakeven.md` [S]  - **Also:** `space-economy-and-markets`
- `jones-2020-lunar-propellant-breakeven.md` [S]  - **Also:** `space-economy-and-markets`
- `jones-superheavylift-final20260614.md` [B]  - **Also:** `space-economy-and-markets`
- `kornuta-2019-commercial-lunar-propellant.md` [B]  - **Also:** `space-economy-and-markets`
- `kornuta-2019-commercial-lunar-propellant-architecture.md` [S]  - **Also:** `space-economy-and-markets`
- `metzger-autry-2023-lunar-landing-pads.md` [S]  - **Also:** `isru-processing`
- `nasa-clps-delivery-timeline.md` [B]  - **Also:** `programme-primaries`
- `nasa-clps-procurement-vignette.md` [B]  - **Also:** `programme-primaries`
- `payload-research-starship-cost.md` [B]  - **Also:** `space-economy-and-markets`
- `take-or-make-in-space.md` [B]  - **Also:** `space-economy-and-markets`

#### `programme-primaries` — 10 files, field `lunar`

- `dr-michael-nayak-luna-10.md` [S]
- `lsic-2026-newsletter-august.md` [S]
- `lsic-newsletter-2026-june-final.md` [S]
- `moon-base-architecture-users-guide.md` [S]
- `nasa-2025-fission-surface-power-directive.md` [S]  - **Also:** `power-and-thermal`
- `nasa-2025-moon-to-mars-architecture-add-revc.md` [S]
- `nasa-data-gaps-acr25-wp-data-gaps-v3.md` [S]
- `nasa-moon-to-mars-doc.md` [S]
- `sanders-2025-nasa-isru-progress-review.md` [B]  - **Also:** `isru-processing`
- `sanders-2025-nasa-lunar-isru-progress-review.md` [S]  - **Also:** `isru-processing`

#### `space-law-and-governance` — 10 files, field `lunar`

- `blount-2016-us-commercial-space-launch-act.md` [B]  - **Also:** `space-economy-and-markets`
- `elvis-2016-peaks-eternal-light.md` [S]  - **Also:** `power-and-thermal`
- `hague-working-group-2019-building-blocks-space-resources.md` [B]  - **Also:** `space-economy-and-markets`
- `luxembourg-2017-space-resources-law.md` [B]  - **Also:** `space-economy-and-markets`
- `nasa-2020-artemis-accords.md` [B]
- `un-1967-outer-space-treaty.md` [B]
- `un-1972-liability-convention-space-objects.md` [B]
- `un-1979-moon-agreement.md` [B]
- `us-congress-2015-commercial-space-launch-act.md` [B]  - **Also:** `space-economy-and-markets`
- `von-der-dunk-2015-us-space-launch-competitiveness-act.md` [B]  - **Also:** `space-economy-and-markets`

#### `self-replication-and-automation` — 5 files, field `lunar`

- `chirikjian-2002-self-replicating-robots-lunar.md` [B]
- `chirikjian-2022-entropy-symmetry-self-replication.md` [B]
- `freitas-1980-advanced-automation-space-missions.md` [B]  - **Also:** `isru-processing`
- `lee-2008-robotic-self-replication-complexity.md` [B]
- `metzger-2013-bootstrapping-space-industry.md` [B]  - **Also:** `space-economy-and-markets`

### 4B. The four economics folders — The Manager

#### `space-economy-and-markets` — 26 files, field `lunar`

- `benaroya-1998-lunar-development-issues.md` [B]  - **Also:** `programme-primaries`
- `benaroya-2001-commercial-lunar-base.md` [B]  - **Also:** `programme-primaries`
- `castillo-rogez-2022-ceres-habitability.md` [B]  - **Also:** `lunar-ice-and-geology`
- `colvin-2020-lunar-cislunar-demand.md` [B]  - **Also:** `logistics-and-delivery`
- `downing-2005-sustainable-lunar-economy.md` [B]
- `ehricke-1974-lunar-industries.md` [B]
- `ehricke-1981-selenosphere-energy.md` [B]
- `ehricke-1981-socioeconomic-lunar-evaluation.md` [B]
- `ehricke-1984-selenospheric-economics.md` [B]
- `gao-2011-neutron-detectors-helium3.md` [B]  - **Also:** `isru-processing`
- `gdp.md` [B]  - **Also:** `growth-theory`
- `giachino-2021-space-tourism-frontier.md` [B]
- `hein-2018-asteroid-mining-technoeconomic.md` [B]  - **Also:** `isru-processing`
- `highfill-2024-us-space-economy-statistics.md` [B]
- `marcy-2026-orbiting-data-centres-impact.md` [B]  - **Also:** `power-and-thermal`
- `matthews-2026-lunar-data-economy.md` [B]
- `mckeown-2024-space-resource-hurdle-rate.md` [B]  - **Also:** `growth-theory`
- `nayak-2024-six-hypotheses-lunar-economy.md` [B]
- `nexgen-2015-evolvable-lunar-architecture.md` [S]  - **Also:** `programme-primaries`
- `oecd-2023-space-economy-in-figures.md` [B]
- `shishko-2019-lunar-thermal-mining-business-case.md` [S]  - **Also:** `isru-processing`
- `smith-vaniz-2026-lunar-mining-economic-framework.md` [B]  - **Also:** `isru-processing`
- `statistical-review-of-world-energy.md` [B]  - **Also:** `growth-theory`
- `turyshev-2026-orbital-data-centers.md` [B]  - **Also:** `power-and-thermal`
- `usgs-2025-platinum-group-metals-mcs.md` [B]
- `zuniga-2017-lunar-cots-infrastructure.md` [B]  - **Also:** `programme-primaries`

#### `growth-theory` — 13 files, field `economics`

- `aghion-1992-model-growth-creative-destruction.md` [B]
- `barro-2004-economic-growth-textbook.md` [B]
- `bea-depreciation-rates.md` [B]  - **Also:** `space-economy-and-markets`
- `christiano-1989-japan-saving-rate.md` [J]  - **Also:** `development-and-industrial-policy`
- `hausmann-2005-growth-accelerations.md` [B]  - **Also:** `development-and-industrial-policy`
- `jones-1995-rd-based-growth.md` [B]
- `jorgenson-2005-industry-origins-japan.md` [J]  - **Also:** `development-and-industrial-policy`
- `lucas-1988-mechanics-economic-development.md` [B]
- `otsu-2007-neoclassical-postwar-japan.md` [J]  - **Also:** `development-and-industrial-policy`
- `pritchett-2000-hills-among-plateaus.md` [J]  - **Also:** `development-and-industrial-policy`
- `rebelo-1991-ak-long-run-growth.md` [B]
- `romer-1990-endogenous-technological-change.md` [B]
- `solow-1956-contribution-growth-theory.md` [B]

#### `development-and-industrial-policy` — 22 files, field `economics`

- `aoki-2009-government-tfp-growth.md` [J]  - **Also:** `growth-theory`
- `beason-1996-targeting-japan.md` [J]
- `beckley-2018-americas-role-japan-miracle.md` [J]
- `caballero-2008-zombie-lending-japan.md` [B]  - **Also:** `growth-theory`
- `dingman-1993-dagger-and-gift-korean-war.md` [J]
- `esri-2016-japan-high-growth-economic-plans.md` [J]
- `esteban-pretel-2009-postwar-japan-policy.md` [J]  - **Also:** `growth-theory`
- `henderson-2008-myth-of-miti.md` [B]
- `hoshi-1991-corporate-structure-liquidity-investment.md` [J]  - **Also:** `growth-theory`
- `imf-1963-appraisal-japan-double-income.md` [B]  - **Also:** `growth-theory`
- `kawagoe-1999-japan-land-reform.md` [J]
- `kiyota-2005-foreign-technology-acquisition.md` [J]
- `kiyota-2013-import-quota-removal.md` [J]
- `lewis-1954-unlimited-supplies-labour.md` [B]  - **Also:** `growth-theory`
- `may-1977-how-japans-economy-grew-so-fast-review.md` [J]
- `miwa-2002-fable-of-the-keiretsu.md` [J]
- `murphy-1989-industrialization-big-push.md` [B]  - **Also:** `growth-theory`
- `nakamura-1989-postwar-japanese-economy.md` [J]
- `rosenstein-rodan-1943-problems-industrialisation.md` [B]  - **Also:** `growth-theory`
- `simonis-1979-denison-boltho-review.md` [J]
- `vanderploeg-2011-natural-resources-curse-blessing.md` [B]  - **Also:** `growth-theory`
- `wade-2018-developmental-state-dead-or-alive.md` [J]

#### `organization-and-production-systems` — 9 files, field `economics`

- `acemoglu-2020-robots-and-jobs.md` [J]  - **Also:** `growth-theory`
- `deming-1967-japan-quality-control.md` [B]  - **Also:** `development-and-industrial-policy`
- `flyvbjerg-2014-what-you-should-know-megaprojects.md` [B]  - **Also:** `programme-primaries`
- `ryan-2000-self-determination-theory.md` [J]
- `shewhart-1931-economic-control-quality.md` [B]
- `shewhart-1939-statistical-method-quality-control.md` [B]
- `spear-1999-decoding-tps-dna.md` [J]
- `taylor-1911-scientific-management.md` [B]
- `trist-1951-longwall-coal-getting.md` [J]

---

## 5. Second memberships

**One file, one path. No symlinks and no duplication** — a duplicated file is two files that will
diverge, which is the failure my Part 4 documented empirically. The second membership is recorded in
the file's own `## Provenance` block as one line, `- **Also:** <folder>`, and is mirrored into
`INDEX.tsv` column 3 so the cross-listing is queryable without 176 file reads.

**`Also` holds at most one folder.** Zero or one, never two. A source that genuinely needs three homes
is evidence the taxonomy is wrong, not a reason to widen the field, and a variable-cardinality column
is a parser nobody has written. 73 of 176 files carry one; 103 carry none.

**An `Also` never changes a file's field.** A file has exactly one path and therefore exactly one
field, per §2. Six `Also` lines cross the field boundary and every one of them is navigation only —
`literature/organization-and-production-systems/flyvbjerg-2014-what-you-should-know-megaprojects.md`
is field `economics` and stays field `economics` no matter that a lunar reader will find it from
`programme-primaries`. If a future checker ever derives a field from `also`, it is wrong.

**The six that cross the two review halves.** These are the only rows either reviewer needs from the
other's section, and they are the ones most likely to be contested:

| File | Primary (field) | Also (field) |
|---|---|---|
| `flyvbjerg-2014-what-you-should-know-megaprojects` | `organization-and-production-systems` (econ) | `programme-primaries` (lunar) |
| `deming-1967-japan-quality-control` | `organization-and-production-systems` (econ) | `development-and-industrial-policy` (econ) — *not crossing; listed for the lunar reader who expects Deming in a quality folder* |
| `bea-depreciation-rates` | `growth-theory` (econ) | `space-economy-and-markets` (lunar) |
| `gdp` | `space-economy-and-markets` (lunar) | `growth-theory` (econ) |
| `statistical-review-of-world-energy` | `space-economy-and-markets` (lunar) | `growth-theory` (econ) |
| `mckeown-2024-space-resource-hurdle-rate` | `space-economy-and-markets` (lunar) | `growth-theory` (econ) |
| `rahimdel-2024-mining-truck-reliability-bayesian` | `isru-processing` (lunar) | `organization-and-production-systems` (econ) |

`gdp`, `statistical-review-of-world-energy` and `bea-depreciation-rates` are the three terrestrial
macro series in the corpus and they are the files whose placement I am least confident of. They sit in
`space-economy-and-markets` and `growth-theory` respectively because that is where the summaries that
cite them live; if The Manager wants all three in `growth-theory`, the field count moves 2 and nothing
else does.

---

## 6. `literature/INDEX.tsv` — specification

**Emitted at 2.5, not here.** This section is the spec and the content; the file is written by the
merge step and never by hand.

**Form.** Tab-separated, one header row, one row per corpus file, sorted by the `normalize()` key of
the basename. **Four columns, not three.**

| # | Column | Source of truth | Rule |
|---|---|---|---|
| 1 | `path` | the filesystem | `literature/<folder>/<normalize(basename)>.md`. Exactly one row per file and exactly one file per row |
| 2 | `primary` | the path | path segment 2. Redundant with `path` by construction and present so the file is usable with `cut` |
| 3 | `also` | the file's `## Provenance` block | the `- **Also:**` value, or empty. Never equal to `primary` |
| 4 | `field` | `literature/FIELDS.tsv` | `FIELDS[primary].field`. **Derived, never authored** |

**Why the fourth column, when §2 says the label lives in `FIELDS.tsv`.** `FIELDS.tsv` remains the
authority. Column 4 exists so that `INDEX.tsv` is self-contained for a reader doing arithmetic over the
corpus, and it is safe only because `INDEX.tsv` is a generated artifact with exactly one writer. This
is a variance from my Part 2's three columns and it is stated as a variance rather than taken. The
condition that makes it safe is an assertion, and the assertion is mandatory:

- **INDEX-1.** For every row, `field == FIELDS[primary].field`. A disagreement is a generator bug, not
  a datum.
- **INDEX-2.** `primary` equals path segment 2, for every row.
- **INDEX-3.** Every `primary` and every non-empty `also` is one of the eleven folder names in
  `FIELDS.tsv` column 1. `FIELDS.tsv` is closed and exhaustive in both directions: no folder without a
  row, no row without a folder.
- **INDEX-4.** `also != primary`, for every row.
- **INDEX-5.** Row count equals the file count under `literature/`, and the `normalize()` keys of the
  basenames are pairwise distinct. This is 2.4's assertion and it is the normalized-key collision test,
  not the case-insensitive one — the baseline established the defect class has nine members and only
  `gdp`/`GDP` differs by case alone.

`.gitignore` already whitelists `literature/INDEX.tsv` at line 60 and `literature/FIELDS.tsv` at line
59. Both land in the same commit as the corpus.

**Content.** 176 rows. This block is the authority for every count in §1 and §9 and the commands in the
quantity blocks read it directly.

```index-tsv
path	primary	also	field
literature/power-and-thermal/473486main-iss-atcs-overview.md	power-and-thermal		lunar
literature/organization-and-production-systems/acemoglu-2020-robots-and-jobs.md	organization-and-production-systems	growth-theory	economics
literature/logistics-and-delivery/adilov-2022-launch-cost-reductions.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/growth-theory/aghion-1992-model-growth-creative-destruction.md	growth-theory		economics
literature/lunar-ice-and-geology/andrews-hanna-2025-spa-magma-ocean.md	lunar-ice-and-geology		lunar
literature/development-and-industrial-policy/aoki-2009-government-tfp-growth.md	development-and-industrial-policy	growth-theory	economics
literature/isru-processing/azami-2024-lunar-manufacturing-review.md	isru-processing		lunar
literature/isru-processing/barnett-2025-regolith-consolidation-water-ice.md	isru-processing	lunar-ice-and-geology	lunar
literature/isru-processing/barnett-2025-volatile-exposure-limits.md	isru-processing	lunar-ice-and-geology	lunar
literature/growth-theory/barro-2004-economic-growth-textbook.md	growth-theory		economics
literature/growth-theory/bea-depreciation-rates.md	growth-theory	space-economy-and-markets	economics
literature/development-and-industrial-policy/beason-1996-targeting-japan.md	development-and-industrial-policy		economics
literature/development-and-industrial-policy/beckley-2018-americas-role-japan-miracle.md	development-and-industrial-policy		economics
literature/power-and-thermal/belbin-2024-vsat-grd-demonstrator.md	power-and-thermal		lunar
literature/space-economy-and-markets/benaroya-1998-lunar-development-issues.md	space-economy-and-markets	programme-primaries	lunar
literature/space-economy-and-markets/benaroya-2001-commercial-lunar-base.md	space-economy-and-markets	programme-primaries	lunar
literature/space-law-and-governance/blount-2016-us-commercial-space-launch-act.md	space-law-and-governance	space-economy-and-markets	lunar
literature/development-and-industrial-policy/caballero-2008-zombie-lending-japan.md	development-and-industrial-policy	growth-theory	economics
literature/lunar-ice-and-geology/cannon-2020-lunar-ice-geologic-model.md	lunar-ice-and-geology	isru-processing	lunar
literature/space-economy-and-markets/castillo-rogez-2022-ceres-habitability.md	space-economy-and-markets	lunar-ice-and-geology	lunar
literature/self-replication-and-automation/chirikjian-2002-self-replicating-robots-lunar.md	self-replication-and-automation		lunar
literature/self-replication-and-automation/chirikjian-2022-entropy-symmetry-self-replication.md	self-replication-and-automation		lunar
literature/growth-theory/christiano-1989-japan-saving-rate.md	growth-theory	development-and-industrial-policy	economics
literature/lunar-ice-and-geology/colaprete-2010-lcross-ejecta-water-detection.md	lunar-ice-and-geology		lunar
literature/lunar-ice-and-geology/colaprete-2010-lcross-water.md	lunar-ice-and-geology		lunar
literature/isru-processing/colozza-2010-solar-lunar-oxygen.md	isru-processing		lunar
literature/power-and-thermal/colozza-2020-lunar-base-power-comparison.md	power-and-thermal		lunar
literature/space-economy-and-markets/colvin-2020-lunar-cislunar-demand.md	space-economy-and-markets	logistics-and-delivery	lunar
literature/lunar-ice-and-geology/crawford-2015-lunar-resources-review.md	lunar-ice-and-geology	isru-processing	lunar
literature/power-and-thermal/csank-2022-powering-the-moon.md	power-and-thermal		lunar
literature/organization-and-production-systems/deming-1967-japan-quality-control.md	organization-and-production-systems	development-and-industrial-policy	economics
literature/development-and-industrial-policy/dingman-1993-dagger-and-gift-korean-war.md	development-and-industrial-policy		economics
literature/space-economy-and-markets/downing-2005-sustainable-lunar-economy.md	space-economy-and-markets		lunar
literature/programme-primaries/dr-michael-nayak-luna-10.md	programme-primaries		lunar
literature/space-economy-and-markets/ehricke-1974-lunar-industries.md	space-economy-and-markets		lunar
literature/space-economy-and-markets/ehricke-1981-selenosphere-energy.md	space-economy-and-markets		lunar
literature/space-economy-and-markets/ehricke-1981-socioeconomic-lunar-evaluation.md	space-economy-and-markets		lunar
literature/space-economy-and-markets/ehricke-1984-selenospheric-economics.md	space-economy-and-markets		lunar
literature/space-law-and-governance/elvis-2016-peaks-eternal-light.md	space-law-and-governance	power-and-thermal	lunar
literature/development-and-industrial-policy/esri-2016-japan-high-growth-economic-plans.md	development-and-industrial-policy		economics
literature/development-and-industrial-policy/esteban-pretel-2009-postwar-japan-policy.md	development-and-industrial-policy	growth-theory	economics
literature/logistics-and-delivery/falcon-heavy-wikipedia.md	logistics-and-delivery		lunar
literature/organization-and-production-systems/flyvbjerg-2014-what-you-should-know-megaprojects.md	organization-and-production-systems	programme-primaries	economics
literature/self-replication-and-automation/freitas-1980-advanced-automation-space-missions.md	self-replication-and-automation	isru-processing	lunar
literature/space-economy-and-markets/gao-2011-neutron-detectors-helium3.md	space-economy-and-markets	isru-processing	lunar
literature/space-economy-and-markets/gdp.md	space-economy-and-markets	growth-theory	lunar
literature/space-economy-and-markets/giachino-2021-space-tourism-frontier.md	space-economy-and-markets		lunar
literature/power-and-thermal/glaser-2014-south-pole-illumination.md	power-and-thermal	lunar-ice-and-geology	lunar
literature/power-and-thermal/gordon-2001-lunar-dc-transmission.md	power-and-thermal		lunar
literature/isru-processing/gott-2024-card-gas-analysis-subsystem.md	isru-processing		lunar
literature/lunar-ice-and-geology/hagerty-2011-spa-basalt-pond-thorium.md	lunar-ice-and-geology		lunar
literature/space-law-and-governance/hague-working-group-2019-building-blocks-space-resources.md	space-law-and-governance	space-economy-and-markets	lunar
literature/growth-theory/hausmann-2005-growth-accelerations.md	growth-theory	development-and-industrial-policy	economics
literature/lunar-ice-and-geology/hayne-2020-micro-cold-traps.md	lunar-ice-and-geology		lunar
literature/space-economy-and-markets/hein-2018-asteroid-mining-technoeconomic.md	space-economy-and-markets	isru-processing	lunar
literature/development-and-industrial-policy/henderson-2008-myth-of-miti.md	development-and-industrial-policy		economics
literature/space-economy-and-markets/highfill-2024-us-space-economy-statistics.md	space-economy-and-markets		lunar
literature/lunar-ice-and-geology/horvath-2022-lunar-pits-caves-thermal.md	lunar-ice-and-geology	power-and-thermal	lunar
literature/development-and-industrial-policy/hoshi-1991-corporate-structure-liquidity-investment.md	development-and-industrial-policy	growth-theory	economics
literature/power-and-thermal/ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md	power-and-thermal		lunar
literature/development-and-industrial-policy/imf-1963-appraisal-japan-double-income.md	development-and-industrial-policy	growth-theory	economics
literature/logistics-and-delivery/ishimatsu-2016-multicommodity-logistics-network.md	logistics-and-delivery		lunar
literature/power-and-thermal/isnps-tech-report-103.md	power-and-thermal		lunar
literature/power-and-thermal/isnps-tech-report-97.md	power-and-thermal		lunar
literature/growth-theory/jones-1995-rd-based-growth.md	growth-theory		economics
literature/logistics-and-delivery/jones-2019-cislunar-isru-breakeven.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/logistics-and-delivery/jones-2020-lunar-propellant-breakeven.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/logistics-and-delivery/jones-superheavylift-final20260614.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/growth-theory/jorgenson-2005-industry-origins-japan.md	growth-theory	development-and-industrial-policy	economics
literature/isru-processing/just-2020-regolith-excavation-review.md	isru-processing		lunar
literature/development-and-industrial-policy/kawagoe-1999-japan-land-reform.md	development-and-industrial-policy		economics
literature/power-and-thermal/kerslake-2007-lunar-surface-power-transfer.md	power-and-thermal		lunar
literature/isru-processing/kiewiet-2026-luwex-water-extraction.md	isru-processing		lunar
literature/development-and-industrial-policy/kiyota-2005-foreign-technology-acquisition.md	development-and-industrial-policy		economics
literature/development-and-industrial-policy/kiyota-2013-import-quota-removal.md	development-and-industrial-policy		economics
literature/isru-processing/kleinhenz-2017-mars-ascent-vehicle-propellant.md	isru-processing		lunar
literature/isru-processing/kleinhenz-2020-polar-water-case-studies.md	isru-processing		lunar
literature/isru-processing/kokkinis-2024-automated-drilling-mining-review.md	isru-processing	self-replication-and-automation	lunar
literature/logistics-and-delivery/kornuta-2019-commercial-lunar-propellant.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/logistics-and-delivery/kornuta-2019-commercial-lunar-propellant-architecture.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/lunar-ice-and-geology/lawrence-2003-small-area-thorium.md	lunar-ice-and-geology		lunar
literature/self-replication-and-automation/lee-2008-robotic-self-replication-complexity.md	self-replication-and-automation		lunar
literature/isru-processing/leger-2025-energy-oxygen-moon.md	isru-processing		lunar
literature/lunar-ice-and-geology/levin-2025-lunar-crustal-kreep-distribution.md	lunar-ice-and-geology		lunar
literature/development-and-industrial-policy/lewis-1954-unlimited-supplies-labour.md	development-and-industrial-policy	growth-theory	economics
literature/lunar-ice-and-geology/li-2018-surface-exposed-water-ice.md	lunar-ice-and-geology		lunar
literature/lunar-ice-and-geology/li-2026-shadowcam-psr-water-ice.md	lunar-ice-and-geology		lunar
literature/isru-processing/linne-2020-lunar-water-pilot-plant.md	isru-processing		lunar
literature/lunar-ice-and-geology/litvak-2024-lend-cabeus-water-ice.md	lunar-ice-and-geology		lunar
literature/isru-processing/liu-2025-microwave-sintering-lunar-regolith-simulants.md	isru-processing		lunar
literature/programme-primaries/lsic-2026-newsletter-august.md	programme-primaries		lunar
literature/programme-primaries/lsic-newsletter-2026-june-final.md	programme-primaries		lunar
literature/growth-theory/lucas-1988-mechanics-economic-development.md	growth-theory		economics
literature/lunar-ice-and-geology/luchsinger-2021-lcross-water-modeling.md	lunar-ice-and-geology		lunar
literature/space-law-and-governance/luxembourg-2017-space-resources-law.md	space-law-and-governance	space-economy-and-markets	lunar
literature/space-economy-and-markets/marcy-2026-orbiting-data-centres-impact.md	space-economy-and-markets	power-and-thermal	lunar
literature/space-economy-and-markets/matthews-2026-lunar-data-economy.md	space-economy-and-markets		lunar
literature/development-and-industrial-policy/may-1977-how-japans-economy-grew-so-fast-review.md	development-and-industrial-policy		economics
literature/space-economy-and-markets/mckeown-2024-space-resource-hurdle-rate.md	space-economy-and-markets	growth-theory	lunar
literature/lunar-ice-and-geology/mcleod-2017-extraterrestrial-ree.md	lunar-ice-and-geology	space-economy-and-markets	lunar
literature/self-replication-and-automation/metzger-2013-bootstrapping-space-industry.md	self-replication-and-automation	space-economy-and-markets	lunar
literature/isru-processing/metzger-2020-aqua-factorem.md	isru-processing		lunar
literature/isru-processing/metzger-2021-aqua-factorem.md	isru-processing		lunar
literature/logistics-and-delivery/metzger-autry-2023-lunar-landing-pads.md	logistics-and-delivery	isru-processing	lunar
literature/development-and-industrial-policy/miwa-2002-fable-of-the-keiretsu.md	development-and-industrial-policy		economics
literature/programme-primaries/moon-base-architecture-users-guide.md	programme-primaries		lunar
literature/development-and-industrial-policy/murphy-1989-industrialization-big-push.md	development-and-industrial-policy	growth-theory	economics
literature/development-and-industrial-policy/nakamura-1989-postwar-japanese-economy.md	development-and-industrial-policy		economics
literature/space-law-and-governance/nasa-2020-artemis-accords.md	space-law-and-governance		lunar
literature/isru-processing/nasa-2023-card-carbothermal-reduction.md	isru-processing		lunar
literature/programme-primaries/nasa-2025-fission-surface-power-directive.md	programme-primaries	power-and-thermal	lunar
literature/programme-primaries/nasa-2025-moon-to-mars-architecture-add-revc.md	programme-primaries		lunar
literature/logistics-and-delivery/nasa-clps-delivery-timeline.md	logistics-and-delivery	programme-primaries	lunar
literature/logistics-and-delivery/nasa-clps-procurement-vignette.md	logistics-and-delivery	programme-primaries	lunar
literature/programme-primaries/nasa-data-gaps-acr25-wp-data-gaps-v3.md	programme-primaries		lunar
literature/power-and-thermal/nasa-lunar-power-strategy-2025.md	power-and-thermal		lunar
literature/programme-primaries/nasa-moon-to-mars-doc.md	programme-primaries		lunar
literature/space-economy-and-markets/nayak-2024-six-hypotheses-lunar-economy.md	space-economy-and-markets		lunar
literature/space-economy-and-markets/nexgen-2015-evolvable-lunar-architecture.md	space-economy-and-markets	programme-primaries	lunar
literature/space-economy-and-markets/oecd-2023-space-economy-in-figures.md	space-economy-and-markets		lunar
literature/power-and-thermal/oleson-2022-deployable-fsp.md	power-and-thermal		lunar
literature/isru-processing/olson-2021-lunar-helium3-mining.md	isru-processing	space-economy-and-markets	lunar
literature/growth-theory/otsu-2007-neoclassical-postwar-japan.md	growth-theory	development-and-industrial-policy	economics
literature/lunar-ice-and-geology/paige-2010-diviner-cold-trap-temperatures.md	lunar-ice-and-geology		lunar
literature/lunar-ice-and-geology/paige-2010-diviner-psr-cold-traps.md	lunar-ice-and-geology		lunar
literature/power-and-thermal/pappa-2021-relocatable-solar-array.md	power-and-thermal		lunar
literature/logistics-and-delivery/payload-research-starship-cost.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/isru-processing/pino-2022-lunar-waste-management.md	isru-processing		lunar
literature/power-and-thermal/poston-2020-krusty-reactor-design.md	power-and-thermal		lunar
literature/lunar-ice-and-geology/prettyman-2006-lunar-elemental-composition.md	lunar-ice-and-geology		lunar
literature/growth-theory/pritchett-2000-hills-among-plateaus.md	growth-theory	development-and-industrial-policy	economics
literature/isru-processing/rahimdel-2024-mining-truck-reliability-bayesian.md	isru-processing	organization-and-production-systems	lunar
literature/growth-theory/rebelo-1991-ak-long-run-growth.md	growth-theory		economics
literature/growth-theory/romer-1990-endogenous-technological-change.md	growth-theory		economics
literature/development-and-industrial-policy/rosenstein-rodan-1943-problems-industrialisation.md	development-and-industrial-policy	growth-theory	economics
literature/power-and-thermal/ross-2023-lunar-south-pole-solar-power.md	power-and-thermal	lunar-ice-and-geology	lunar
literature/isru-processing/rostami2018.md	isru-processing		lunar
literature/isru-processing/rostami2018-figures.md	isru-processing		lunar
literature/organization-and-production-systems/ryan-2000-self-determination-theory.md	organization-and-production-systems		economics
literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md	programme-primaries	isru-processing	lunar
literature/programme-primaries/sanders-2025-nasa-lunar-isru-progress-review.md	programme-primaries	isru-processing	lunar
literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md	isru-processing		lunar
literature/lunar-ice-and-geology/schorghofer-2026-current-theories-lunar-ice.md	lunar-ice-and-geology		lunar
literature/isru-processing/schreiner-2016-molten-regolith-electrolysis-sizing.md	isru-processing		lunar
literature/isru-processing/schreiner-2016-mre-sizing-model.md	isru-processing		lunar
literature/organization-and-production-systems/shewhart-1931-economic-control-quality.md	organization-and-production-systems		economics
literature/organization-and-production-systems/shewhart-1939-statistical-method-quality-control.md	organization-and-production-systems		economics
literature/space-economy-and-markets/shishko-2019-lunar-thermal-mining-business-case.md	space-economy-and-markets	isru-processing	lunar
literature/isru-processing/sibille-2012-joule-heated-mre.md	isru-processing		lunar
literature/development-and-industrial-policy/simonis-1979-denison-boltho-review.md	development-and-industrial-policy		economics
literature/space-economy-and-markets/smith-vaniz-2026-lunar-mining-economic-framework.md	space-economy-and-markets	isru-processing	lunar
literature/growth-theory/solow-1956-contribution-growth-theory.md	growth-theory		economics
literature/isru-processing/sowers-2019-psr-ice-mining.md	isru-processing	lunar-ice-and-geology	lunar
literature/isru-processing/sowers-2019-thermal-mining-ice.md	isru-processing	lunar-ice-and-geology	lunar
literature/isru-processing/sowers-2019-thermal-mining-niac.md	isru-processing	lunar-ice-and-geology	lunar
literature/isru-processing/sowers-2019-thermal-mining-niac-report.md	isru-processing	lunar-ice-and-geology	lunar
literature/organization-and-production-systems/spear-1999-decoding-tps-dna.md	organization-and-production-systems		economics
literature/power-and-thermal/speyerer-2012-in-search-of-shade.md	power-and-thermal	lunar-ice-and-geology	lunar
literature/power-and-thermal/speyerer-2013-persistently-illuminated-regions.md	power-and-thermal	lunar-ice-and-geology	lunar
literature/space-economy-and-markets/statistical-review-of-world-energy.md	space-economy-and-markets	growth-theory	lunar
literature/logistics-and-delivery/take-or-make-in-space.md	logistics-and-delivery	space-economy-and-markets	lunar
literature/organization-and-production-systems/taylor-1911-scientific-management.md	organization-and-production-systems		economics
literature/organization-and-production-systems/trist-1951-longwall-coal-getting.md	organization-and-production-systems		economics
literature/space-economy-and-markets/turyshev-2026-orbital-data-centers.md	space-economy-and-markets	power-and-thermal	lunar
literature/space-law-and-governance/un-1967-outer-space-treaty.md	space-law-and-governance		lunar
literature/space-law-and-governance/un-1972-liability-convention-space-objects.md	space-law-and-governance		lunar
literature/space-law-and-governance/un-1979-moon-agreement.md	space-law-and-governance		lunar
literature/space-law-and-governance/us-congress-2015-commercial-space-launch-act.md	space-law-and-governance	space-economy-and-markets	lunar
literature/space-economy-and-markets/usgs-2025-platinum-group-metals-mcs.md	space-economy-and-markets		lunar
literature/development-and-industrial-policy/vanderploeg-2011-natural-resources-curse-blessing.md	development-and-industrial-policy	growth-theory	economics
literature/space-law-and-governance/von-der-dunk-2015-us-space-launch-competitiveness-act.md	space-law-and-governance	space-economy-and-markets	lunar
literature/development-and-industrial-policy/wade-2018-developmental-state-dead-or-alive.md	development-and-industrial-policy		economics
literature/isru-processing/wang-2025-microwave-water-production.md	isru-processing		lunar
literature/lunar-ice-and-geology/wilson-2018-lp-thorium-reconstruction.md	lunar-ice-and-geology		lunar
literature/isru-processing/wittenberg-1992-he3-resources-review.md	isru-processing	space-economy-and-markets	lunar
literature/space-economy-and-markets/zuniga-2017-lunar-cots-infrastructure.md	space-economy-and-markets	programme-primaries	lunar
```

---

## 7. What is in the union and what is not

Stated because a taxonomy that is silent about a population is a taxonomy someone will place it into.

| Population | Count | Disposition |
|---|---|---|
| `lsei/literature` summaries | 152 | placed, §4 |
| `_intake/japanese-miracle/lit` summaries | 119 | 95 merge with an LSEI twin, 24 are net-new; all placed, §4 |
| **the taxonomy's population** | **176** | §6 |
| `_intake/japanese-miracle/fa` | 19 | **separate shelf**, ruled at 1.2. Not placed, not graded, not in `INDEX.tsv`. §3 |
| `_intake/superseded-duplicates` | 6 | the A3 deletions, retained. Not placed. They are the difference between the 158 and the 152 bases, §1 |
| `_intake/**` PDFs | 112 | `literature/_pdf/<folder>/`, per D6. **Foldered by the same eleven**, mirroring the summary's `primary` |
| net-new PDF pull | 52 | same, at 2.11 |
| `_intake/japanese-miracle/lit/*.txt` | 3 | **flagged, and this is not in my Part 2** |

**The three `.txt` files.** `un-1967-outer-space-treaty.txt`, `un-1972-liability-convention-space-objects.txt`
and `un-1979-moon-agreement.txt` sit inside `lit/` alongside the summaries, and the union counting rule
is `*.md`, so they are outside the 176 and outside `INDEX.tsv`. They are transcribed source text, not
summaries: their warrant is the opposite of a summary's. **They belong with the PDFs at
`literature/_pdf/space-law-and-governance/`, not in the corpus**, and a merge that globs `lit/*` rather
than `lit/*.md` lands three full treaty texts into a retrieval corpus that will then return treaty
articles as if they were summaries. Raised here because 2.5 is where that glob gets written.

**`literature/_pdf/` and D6.** My Part 2 landing zone was `literature/_pdf/<taxonomy>/` and I flagged it
as reading against the directory map's wording rather than taking the variance myself. That flag stands
and this file does not resolve it. What this file adds is that `<taxonomy>` now means these eleven and
means the summary's `primary`, not its `also` — one PDF, one folder, mirroring one summary.

---

## 8. Variances from my Step 0 Part 2, named

Four, and each is a place where executing Part 2 faithfully would produce something different.

1. **`FIELDS.tsv` did not exist in Part 2.** §2. This is the load-bearing one and it is a defect in
   Part 2, not a refinement of it.
2. **`INDEX.tsv` gains a fourth column.** §6, with the assertion that makes it safe.
3. **`self-replication-and-automation` is field `lunar`, and `space-economy-and-markets` is field
   `lunar`.** Part 2's table listed both among the eleven without saying anything about fields, and a
   reader taking the table's ordering as a field split would have put self-replication robotics in the
   economics field. §2.4 decides the contested one by measurement.
4. **The size claim is 31 and 5, not 32 and 5.** §1.

And one place where Part 2 was right and I re-verified it rather than assuming: **folder segments are
never scored by the ranker.** `filenameTokens()` (line 118) reads a candidate's own leaf name only,
with a comment at line 109 saying so, and the header comment at line 16 says the directory shape "is
hard-coded here and never scored." The taxonomy remains a decision about human navigation. That is not
in tension with §2 — the field label does not work by being scored, it works by scoping the table the
scorer reads.

---

## 9. Quantities

```quantity
id:            Q-TAX-FOLDERS-11
class:         fixed
value:         11
unit:          top-level folders in literature/, one level deep
population:    the distinct values of the primary column over the 176 rows of the index-tsv block
               in section 6 of this file
operation:     cmd: sed -n '/^```index-tsv$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | tail -n +2 | cut -f2 | sort -u | wc -l
conditions:    cwd: repository root, 55 characters. Reads only this file; no working copy is
               consulted, so no lsei or cr-agents ref affects it.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the taxonomy proposed at 2.3 has 11 top-level folders, one level deep, and every
               corpus file is placed in exactly one of them.
derived-from:  none
sampled:       n/a -- this operation counts distinct values, it does not classify
superseded:    none
```

```quantity
id:            Q-TAX-PLACED-176
class:         fixed
value:         176
unit:          corpus summary files assigned a primary folder
population:    the 176-name union of lsei/literature and _intake/japanese-miracle/lit under the
               normalize() rule of literature/NAMING.md section 1, which is the population of
               Q-OVERLAP-95 and equals 95 overlapping plus 57 lsei-only plus 24 japanese-miracle-only
operation:     cmd: sed -n '/^```index-tsv$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | tail -n +2 | wc -l
conditions:    cwd: repository root, 55 characters. The union is fixed by Q-OVERLAP-95's ref; a
               change to either working copy changes the population and invalidates this value.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     all 176 files of the merged corpus are assigned to exactly one of the 11 folders;
               none is unplaced and no row names a file outside the union.
derived-from:  Q-OVERLAP-95
sampled:       176 inspected by hand, 0 found unplaced, by The Engineer. The count is a count, but
               the assignment underneath it is a hand classification and every one of the 176 was
               assigned individually rather than by rule; the classification is what section 4 is
               sent to two reviewers to check.
superseded:    none
```

```quantity
id:            Q-TAX-SIZE-MAX-31
class:         fixed
value:         31
unit:          files in the largest folder, which is isru-processing
population:    as Q-TAX-PLACED-176
operation:     cmd: sed -n '/^```index-tsv$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | tail -n +2 | cut -f2 | sort | uniq -c | sort -rn | head -1
conditions:    inherits: Q-TAX-PLACED-176
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     no folder in the proposed taxonomy holds more than 31 files, and the largest is
               isru-processing at 31.
derived-from:  Q-TAX-PLACED-176
sampled:       n/a -- this operation counts group sizes, it does not classify
superseded:    32 (The Engineer, step 0.2 Part 2, 2026-08-26) -- same operation on the 158-file
               pre-dedup basis; the A3 deletions removed 2 from isru-processing and the
               gott-2024 placement added 1
```

```quantity
id:            Q-TAX-SIZE-MIN-5
class:         fixed
value:         5
unit:          files in the smallest folder, which is self-replication-and-automation
population:    as Q-TAX-PLACED-176
operation:     cmd: sed -n '/^```index-tsv$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | tail -n +2 | cut -f2 | sort | uniq -c | sort -n | head -1
conditions:    inherits: Q-TAX-PLACED-176
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     no folder in the proposed taxonomy holds fewer than 5 files, and the smallest is
               self-replication-and-automation at 5.
derived-from:  Q-TAX-PLACED-176
sampled:       n/a -- this operation counts group sizes, it does not classify
superseded:    none. The floor was 5 on the 158 basis and is 5 here, and it is the same folder
```

```quantity
id:            Q-TAX-FIELD-LUNAR-132
class:         fixed
value:         132
unit:          corpus files whose folder maps to field lunar in literature/FIELDS.tsv
population:    as Q-TAX-PLACED-176, partitioned by the fields-tsv block in section 2.1 of this file
operation:     cmd: sed -n '/^```index-tsv$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | tail -n +2 | cut -f4 | grep -c '^lunar$'
conditions:    inherits: Q-TAX-PLACED-176, plus the field partition chosen at section 2.4. Moving
               space-economy-and-markets to field economics changes this value to 106 and moves
               no file; the partition is a one-line edit to FIELDS.tsv.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     132 of the 176 corpus files are in field lunar under the partition proposed at 2.3.
derived-from:  Q-TAX-PLACED-176
sampled:       n/a -- this operation counts rows matching a literal, it does not classify. The
               partition it counts under is classified and is measured at Q-TAX-FIELD-SEPARATION
superseded:    none
```

```quantity
id:            Q-TAX-FIELD-ECON-44
class:         fixed
value:         44
unit:          corpus files whose folder maps to field economics in literature/FIELDS.tsv
population:    as Q-TAX-FIELD-LUNAR-132
operation:     derived: Q-TAX-PLACED-176 - Q-TAX-FIELD-LUNAR-132
conditions:    inherits: Q-TAX-FIELD-LUNAR-132. The field set is closed at two, so the two field
               counts partition the corpus with no residue; that is what makes the subtraction valid.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     44 of the 176 corpus files are in field economics under the partition proposed at
               2.3, and the two fields partition the corpus exactly.
derived-from:  Q-TAX-PLACED-176, Q-TAX-FIELD-LUNAR-132
sampled:       n/a -- this operation is arithmetic over two counted quantities
superseded:    none
```

```quantity
id:            Q-TAX-ALSO-73
class:         fixed
value:         73
unit:          corpus files carrying a non-empty second-membership value
population:    as Q-TAX-PLACED-176
operation:     cmd: sed -n '/^```index-tsv$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | tail -n +2 | cut -f3 | grep -c .
conditions:    inherits: Q-TAX-PLACED-176
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     73 of the 176 corpus files carry exactly one second membership and 103 carry none;
               no file carries two, because the column holds at most one value by section 5.
derived-from:  Q-TAX-PLACED-176
sampled:       73 inspected by hand, 0 found equal to their own primary, by The Engineer. This
               operation classifies: every one of the 73 is a judgement that a source has a second
               home, and the reviewers are being asked to check exactly that judgement.
superseded:    none
```

```quantity
id:            Q-TAX-ALSO-CROSSFIELD-6
class:         fixed
value:         6
unit:          second-membership lines whose target folder is in the other field
population:    the 73 second memberships of Q-TAX-ALSO-73
operation:     cmd: sed -n '/^```index-tsv$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | tail -n +2 | awk -F'\t' -v E="growth-theory development-and-industrial-policy organization-and-production-systems" '$3!=""{g=(index(E,$3)?"economics":"lunar"); if(g!=$4)c++} END{print c+0}'
conditions:    inherits: Q-TAX-ALSO-73, plus the field partition of section 2.1. The awk substring
               test is safe only because no economics folder name is a substring of another folder
               name; checked over all eleven names.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     6 of the 73 second memberships point at a folder in the other field. A cross-field
               Also is navigation and never changes the file's field, which is fixed by its path.
derived-from:  Q-TAX-ALSO-73, Q-TAX-FIELD-LUNAR-132
sampled:       6 inspected by hand, 0 found to imply a field change, by The Engineer
superseded:    none
```

```quantity
id:            Q-TAX-FIELD-SEPARATION
class:         provisional
value:         0.7710
unit:          cosine similarity between the two fields' document-frequency profiles, over terms
               appearing in at least 2 files of a field, stopwords removed
population:    the full text of all 176 corpus files, read from lsei/literature where present and
               from _intake/japanese-miracle/lit otherwise, partitioned by the fields-tsv block
               of section 2.1
operation:     cmd: sed -n '/^```field-probe$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | node -
conditions:    cwd: repository root, 55 characters. Reads both working copies, so both refs matter.
               Re-measured at 3.7, when the scoped IDF table is implemented and the partition
               becomes load-bearing rather than proposed.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     placing space-economy-and-markets in field lunar separates the two fields' vocabulary
               better than placing it in field economics: 0.7710 against 0.8292, lower being more
               separated. The folder's own profile is closer to the lunar core than to the economics
               core, 0.8389 against 0.7443.
derived-from:  Q-TAX-FIELD-LUNAR-132
sampled:       2 partitions computed, both reported, by The Engineer. This operation classifies --
               it assigns one folder to one of two fields -- and the classification it makes is the
               single most contestable cell in this proposal. It is stated as a measurement of two
               named alternatives rather than as a verdict, so a reviewer who disagrees is
               disagreeing with a comparison and not with a preference.
superseded:    none
```

```quantity
id:            Q-TAX-IDF-CAPITAL-ERROR
class:         fixed
value:         0.97
unit:          natural-log units of IDF error on the term "capital" in the economics field, pooled
               against field-scoped
population:    as Q-TAX-FIELD-SEPARATION
operation:     cmd: sed -n '/^```field-probe$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | node -
conditions:    inherits: Q-TAX-FIELD-SEPARATION. IDF form is ln(1 + (N - df + 0.5)/(df + 0.5)),
               which is the Okapi form; a different IDF form gives different numbers and the same
               sign.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the pooled IDF table gives "capital" a weight of 1.23 where the economics-scoped
               value is 0.27 and the lunar-scoped value is 2.03, an error of 0.97 and 0.79 nats in
               opposite directions. This is loose end B3's claim, measured. "policy" errs by 0.61
               and 0.33; "targeting", B3's third term, errs by 0.41 and 0.16 and is the weakest of
               the three.
derived-from:  Q-TAX-FIELD-SEPARATION
sampled:       n/a -- this operation computes a ratio of two counted document frequencies
superseded:    none
```

```quantity
id:            Q-TAX-FA-SHELF-19
class:         fixed
value:         19
unit:          markdown files on the FA shelf, none of which is placed by this taxonomy
population:    _intake/japanese-miracle/fa, recursive, .md only
operation:     cmd: find _intake/japanese-miracle/fa -type f -name '*.md' | wc -l
conditions:    cwd: repository root, 55 characters. _intake is excluded from git at .gitignore
               line 26, so this counts the working tree and not a tracked set.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the FA shelf holds 19 files, ruled a separate shelf with a separate retrieval
               contract and a separate trace grade at author ruling 1.2 (ECON-12). None of the 19
               appears in literature/INDEX.tsv, and all eleven rows of literature/FIELDS.tsv
               therefore read grade summary.
derived-from:  none
sampled:       n/a -- this operation counts files matching a glob
superseded:    none
```

### The field probe, committed so its quantity blocks are runnable

`operation` for `Q-TAX-FIELD-SEPARATION` and `Q-TAX-IDF-CAPITAL-ERROR` extracts this block and pipes
it to `node -`. My declared write set for this sub-step is this one file, so the script lives in it
rather than in `tools/`; if 3.7 needs it again it should be lifted to `tools/field_probe.js` at that
point and the two blocks re-pointed.

```field-probe
const fs=require("fs"),path=require("path");
function walk(d){let o=[];for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
  if(e.isDirectory())o=o.concat(walk(p));else if(e.name.toLowerCase().endsWith(".md"))o.push(p);}return o;}
function norm(n){return n.replace(/\.md$/i,"").toLowerCase().replace(/[_ ]+/g,"-").replace(/-{2,}/g,"-").replace(/^-+|-+$/g,"");}
const src=new Map();
for(const p of walk("lsei/literature")) src.set(norm(path.basename(p)),p);
for(const p of walk("_intake/japanese-miracle/lit")) if(!src.has(norm(path.basename(p)))) src.set(norm(path.basename(p)),p);
const B=fs.readFileSync("cr_scratch/step2_engineer_taxonomy.md","utf8").split(/\r?\n/);
const gi=B.indexOf("```index-tsv"), ge=B.indexOf("```",gi+1);
const rows=B.slice(gi+2,ge).map(l=>l.split("\t"));
const fi=B.indexOf("```fields-tsv"), fe=B.indexOf("```",fi+1);
const FIELD={},GRADE={};
for(const l of B.slice(fi+2,fe)){const c=l.split("\t");FIELD[c[0]]=c[1];GRADE[c[0]]=c[2];}
const stop=new Set(("the a an and or of to in for on with by is are was were be been this that these those it its as at from we our their "+
 "he she which not no can may will would could should do does did has have had than then so such more most other into over under between "+
 "about also using use used based results result study paper article summary citation abstract topic mapping key findings background "+
 "objective methods scope limitations doi url http https www").split(/\s+/));
const tok=t=>(t.toLowerCase().match(/[a-z][a-z-]{2,}/g)||[]).filter(x=>!stop.has(x));
const docs={};for(const r of rows){const k=path.basename(r[0]).replace(/\.md$/,"");docs[k]=new Set(tok(fs.readFileSync(src.get(k),"utf8")));}
const prim={};for(const r of rows)prim[path.basename(r[0]).replace(/\.md$/,"")]=r[1];
const keys=Object.keys(docs);
const dfc=ks=>{const d={};for(const k of ks)for(const t of docs[k])d[t]=(d[t]||0)+1;return d;};
const prof=ks=>{const d=dfc(ks),v={};for(const t in d)if(d[t]>=2)v[t]=d[t]/ks.length;return v;};
const cos=(a,b)=>{let n=0,x=0,y=0;for(const k of new Set([...Object.keys(a),...Object.keys(b)])){const u=a[k]||0,w=b[k]||0;n+=u*w;x+=u*u;y+=w*w;}return n/Math.sqrt(x*y);};
const ECON=Object.keys(FIELD).filter(f=>FIELD[f]==="economics");
const SEM="space-economy-and-markets";
const part=semTo=>{const L=[],E=[];for(const k of keys){const f=prim[k]===SEM?semTo:FIELD[prim[k]];(f==="economics"?E:L).push(k);}return[L,E];};
for(const [lbl,to] of [["P2 space-economy-and-markets -> lunar    ","lunar"],["P1 space-economy-and-markets -> economics","economics"]]){
  const [L,E]=part(to);console.log(lbl+"  |lunar|="+L.length+" |econ|="+E.length+"  between-field cosine "+cos(prof(L),prof(E)).toFixed(4));}
{const [L,E]=part("lunar");
 const S=keys.filter(k=>prim[k]===SEM), LC=L.filter(k=>prim[k]!==SEM);
 console.log("SEM vs lunar core "+cos(prof(S),prof(LC)).toFixed(4)+"   SEM vs economics core "+cos(prof(S),prof(E)).toFixed(4));
 const N=keys.length,dP=dfc(keys),dL=dfc(L),dE=dfc(E);
 const idf=(df,n)=>Math.log(1+(n-df+0.5)/(df+0.5));
 const out=[];
 for(const t in dP){if(dP[t]<4)continue;const iP=idf(dP[t],N);
   if(dL[t]>=2)out.push([t,"lunar",dL[t]+"/"+L.length,iP,idf(dL[t],L.length)]);
   if(dE[t]>=2)out.push([t,"econ ",dE[t]+"/"+E.length,iP,idf(dE[t],E.length)]);}
 out.sort((a,b)=>Math.abs(b[3]-b[4])-Math.abs(a[3]-a[4]));
 const show=r=>console.log(r[0].padEnd(14)+r[1]+"  "+r[2].padEnd(10)+"pooled "+r[3].toFixed(2)+"  scoped "+r[4].toFixed(2)+"  error "+Math.abs(r[3]-r[4]).toFixed(2));
 console.log("-- largest IDF errors --");out.slice(0,7).forEach(show);
 console.log("-- B3 terms --");for(const t of ["capital","policy","targeting"])out.filter(r=>r[0]===t).forEach(show);}
console.log("-- grades --  distinct grade values in FIELDS.tsv: "+[...new Set(Object.values(GRADE))].join(","));
```

---

## 10. To the two reviewers

**The Space Resources Engineer, §4A, seven folders, 106 files.** Three things I would look at first.
`isru-processing` at 31 is the largest folder and carries four Sowers files and two Metzger
`aqua-factorem` files, all six of which 2.2 may rename; if you think it should split, say so now,
because a taxonomy revised after placement is a second migration. `self-replication-and-automation` at
5 is the floor and I have argued for it in §1 — it is the folder most likely to be voted out.
`space-law-and-governance` at 10 carries three treaty summaries whose full source texts are the `.txt`
files flagged in §7, and that flag is yours to route.

**The Manager, §4B, four folders, 70 files.** `development-and-industrial-policy` at 22 is where 22 of
the 24 corpus-unique Japanese Miracle files land, and it is the folder whose internal coherence I am
least able to judge — I placed Beckley and Dingman there because they are about the political economy
of the occupation and I could not defend a better home, not because I am confident. The three
terrestrial macro series in §5 are the second thing. Third: `organization-and-production-systems` at 9
is the folder that exists because Taylor, Shewhart, Deming, Trist and Spear were living in a growth
theory folder; if you disagree that they form a subject, the alternative is that they go back into
`development-and-industrial-policy` at 31 and the taxonomy is ten folders.

**Both of you, §2.4.** The field cell for `space-economy-and-markets` is a measurement, not a
preference, and it is the cheapest thing here to reverse — one line, zero files moved.

**What I am not asking either of you to review.** §2 and §3 are contracts with the retrieval layer and
with author ruling 1.2, not domain calls. If they are wrong they are wrong on their own terms, and the
seats that own them are The Software Engineer and the author.

*The Engineer, sub-step 2.3, 2026-08-28.*
