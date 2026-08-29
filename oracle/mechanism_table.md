# The merged mechanism table

**Sub-step 7.1 (ECON-8).** The object `oracle/transfer_gate.md` §3.7 reads. One row per causal
mechanism the literature credits for Japan's 1946-73 growth, or that the merged corpus supplies as a
condition on carrying such a mechanism to the Moon, with a transfer verdict and the basis that
produced it.

**A rebuild, not a port.** Author ruling 1.2 (ECON-12) is closed: the FA1-FA8 deliverables are a
separate shelf at `_intake/japanese-miracle/fa/`, with a separate retrieval contract and a separate
trace grade, and they do not merge into `literature/`. `_intake/japanese-miracle/fa/FA1-mechanism-table.md`
is therefore a **predecessor, not a source**. Each row below names its FA1 predecessor so the two can
be compared; every figure below is quoted from a file under `literature/`, and where this rebuild
changes an FA1 tag it says so and says why.

**Every evidence leaf resolves.** Measured, not assumed:

```
$ grep '^- \*\*leaves:\*\*' oracle/mechanism_table.md | grep -o '`[^`]*\.md`' \
  | tr -d '`' | sort -u \
  | while read f; do [ -n "$(find literature -name "$f")" ] || echo "UNRESOLVED $f"; done
```

**The `leaves:` bullet exists because the first two versions of this check were wrong, in the same
way, twice.** Both under-counted and both exited clean reporting zero unresolved.

1. The leaves were first tagged inline as `evidence: <leaf>` inside prose and extracted by a
   single-line regex. Prose wraps, so wherever the marker fell at the end of a line and the filename
   at the start of the next, the pair was invisible. **24 of 42 distinct leaves returned.**
2. The `leaves:` bullet was then generated, but only over the `evidence` field, while the field's own
   definition is *every leaf this row cites* — and rows cite leaves from the `capability` and
   `congruence` fields too, which is where MT-14's four space-law leaves and MT-09's Acemoglu leaf
   live. **37 of 42 returned**, and the five it dropped were exactly the cross-shelf citations that
   make this a merged table rather than an economics table.

The lesson is the same both times and it is worth stating rather than fixing quietly: **the
extractor's scope was narrower than the field's definition, and nothing in the output said so.** A
check that silently drops part of its input and reports success is worse than no check. The field is
now one unwrapped line per row, generated over the whole row block, and the prose keeps the citation
where a human reader wants it.

The result and the shelf size are recorded at `cr_scratch/step4_manager_econ.md`, with the read
digest, because a count without its command is not comparable to the next one.

---

## 0. How to read a row

Every row carries nine fields, in this order, and none is optional.

| Field | Content |
|---|---|
| `mechanism` | What the literature says did the work |
| `evidence` | The magnitude, in the source's own units, with the leaf it came from named beside it |
| `leaves` | Every leaf this row cites, on one unwrapped line. The machine-readable field |
| `verdict` | `legitimate`, `illustration` or `unknown`. Closed. `transfer_gate.md` §3.3 |
| `direction` | `positive`, `negative` or `both`. Closed. §3.5 |
| `capability` | `holds`, `absent`, `inverted` or `unmeasured`. Closed. §3.4 |
| `congruence` | Same closed set |
| `disanalogy` | What fails, or what is not measured. Empty is a failure (falsifier F8) |
| `axis` | The register axis that governs this row's figures, or `-` |

**The two conditions decide the verdict, mechanically.** `unmeasured` on either condition forces
`unknown`. `absent` or `inverted` on either, with nothing `unmeasured`, forces `illustration`.
`holds` on both forces `legitimate`. There is no fourth path and no discretion, which is what makes a
row auditable by someone who did not write it.

**Where a row is `legitimate/negative`, read §3.5 before quoting it.** It licenses the finding, not
its converse.

---

## 1. The mechanism index

| id | Mechanism | Verdict | Dir. | FA1 predecessor | Changed? |
|---|---|---|---|---|---|
| MT-01 | Non-agricultural TFP catch-up | `illustration` | `both` | M1 partial | sharpened |
| MT-02 | Foreign technology licensing and absorption | `illustration` | `both` | M2 **transportable** | **reversed** |
| MT-03a | Method transfer to a human trainee | `legitimate` | `positive` | M3 transportable | held |
| MT-03b | Method transfer to a machine trainee | `unknown` | `-` | M3 (its open question) | **split out** |
| MT-04 | Labour reallocation out of agriculture | `illustration` | `both` | M4 absent | re-based |
| MT-05 | Domestic saving financing the capex phase | `illustration` | `both` | M5 partial | held |
| MT-06 | Defence-burden shed | `illustration` | `both` | M6 absent | held |
| MT-07 | Durable sovereign demand sponsor | `unknown` | `-` | M7 partial | **reversed** |
| MT-08 | Procurement spike as a starter | `legitimate` | `negative` | M8 cautionary | held |
| MT-09 | Absorptive capacity in the receiving agent | `unknown` | `-` | M9 partial | held |
| MT-10 | Sectoral targeting / directed capital | `legitimate` | `negative` | M10 trap | held |
| MT-11 | Coordination, standards, consortia | `illustration` | `both` | M11 partial | held |
| MT-12 | Land reform | `illustration` | `both` | M12 absent | held |
| MT-13 | The Dodge Line and the 360 yen peg | `illustration` | `both` | M13 absent | held |
| MT-14 | Macro stability as a precondition | `legitimate` | `positive` | M14 "in spirit" | grounded |
| MT-15 | Two-sector structural transformation | `illustration` | `both` | M15 partial | held |
| MT-16 | The reference class a base rate is drawn from | `legitimate` | `both` | none | **new** |
| MT-17 | Reproducible machine capacity as the surplus factor | `unknown` | `-` | none (FA6's question) | **new** |
| MT-18 | Patient relationship capital | `legitimate` | `negative` | none | **new** |
| MT-19 | Plans as coordination and announcement | `illustration` | `both` | none | **new** |
| MT-20 | The big push / coordinated simultaneous investment | `illustration` | `both` | none | **new** |
| MT-21 | Resource-led development | `unknown` | `-` | none | **new** |
| MT-22 | The AK corner, and closure as the condition on it | `unknown` | `-` | none (FA2's verdict) | **new** |
| MT-23 | The growth-accounting residual itself | `legitimate` | `negative` | none | **new** |

**Twenty-four rows, citing 67 leaf references over 42 distinct summaries**, drawn from five of the
eleven shelf folders: 22 from `development-and-industrial-policy`, 8 from `growth-theory`, 4 each
from `organization-and-production-systems`, `self-replication-and-automation` and
`space-law-and-governance`. Sixteen rows carry an FA1
predecessor, drawn from fifteen distinct FA1 rows because M3 splits in two; this rebuild reverses two
of those tags outright. Eight rows are new, and they are the merge earning its keep: six of the eight
(MT-16, MT-18, MT-19, MT-20, MT-21, MT-23) rest on economics summaries that were not in FA1's
nine-source base, and two (MT-17, MT-22) could not exist before the lunar and economics shelves sat
in one tree.

---

## 2. The rows

### MT-01 — Non-agricultural TFP catch-up

- **mechanism:** Technology catch-up against a leader raises total factor productivity, and it, not
  capital, is the engine.
- **evidence:** Aggregate TFP 4.78 percent a year 1956-73, of which non-agricultural TFP is 3.96
  points, the dominant term; Japanese TFP about 43 percent of the US level in 1952 rising to about 80
  percent by the early 1970s. `aoki-2009-government-tfp-growth.md`
- **leaves:** `aoki-2009-government-tfp-growth.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `holds` — Japan's education stock and firm organisation are measured and present.
- **congruence:** `inverted` — the terrestrial technique was selected under terrestrial factor
  prices; the lunar vector inverts several of them and does not converge, because the difference is
  physical rather than developmental.
- **disanalogy:** There is no lunar technological leader and no shelf of proven lunar industrial
  process, so there is no gap in the technical sense and nothing to converge toward. The entire
  catch-up path would have to be the transfer channels, and MT-02 is what happens to those.
- **axis:** `ECR-07` — any figure from this row names the decomposition, the period, and whether
  scale and reallocation were itemised.

### MT-02 — Foreign technology licensing and absorption

- **mechanism:** Licensing a leader's technique raises the follower's productivity.
- **evidence:** Firms with acquired technology had TFP 33.1 percent higher and labour productivity
  33.9 percent higher than non-acquirers by 1970, but the effect is capital-augmenting and **the TFP
  channel is not confirmed**; only 257 of 1,041 sample firms (24.7 percent) ever acquired anything,
  and the pre-1961 gains are attributed partly to first-mover advantage or rents from restricted
  access. `kiyota-2005-foreign-technology-acquisition.md` Quota removal shows no
  contemporaneous productivity effect and a lagged labour-productivity gain of about 8 percent.
  `kiyota-2013-import-quota-removal.md`
- **leaves:** `kiyota-2005-foreign-technology-acquisition.md` `kiyota-2013-import-quota-removal.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — no leader, therefore no licensable shelf.
- **congruence:** `inverted` — as MT-01.
- **disanalogy:** **This row reverses FA1's `transportable` tag, and the reversal is the finding.**
  FA1 read licensing as "exactly the lunar play". The merged corpus says the mechanism is missing
  *and* that, where it existed and a leader existed, it produced capital deepening rather than
  productivity. A lunar programme could import hardware and get no TFP from it — which is the failure
  mode MT-10 describes, arriving by a second route.
- **axis:** `ECR-09` — measurement level. `ECR-01`, `ECR-10` for the lineage.

### MT-03a — Method transfer to a human trainee

- **mechanism:** A productivity method transfers and raises output with little new capital.
- **evidence:** Statistical quality control taught by lecture and eight-day course through JUSE from
  1950; a steel company reduced coal consumption per ton of steel by 28 percent, with gains reported
  inside a year and with little new machinery. `deming-1967-japan-quality-control.md`
  Against this, the Toyota system's rules are unwritten and transfer succeeds only where receiving
  managers replicate the Socratic questioning. `spear-1999-decoding-tps-dna.md`
- **leaves:** `deming-1967-japan-quality-control.md` `spear-1999-decoding-tps-dna.md`
- **verdict:** `legitimate` — **direction:** `positive`
- **capability:** `holds` — the requirement is a trainee who can be taught, and a crewed lunar
  operation has one.
- **congruence:** `holds` — a method is not selected against a factor-price vector the way a machine
  is, so the congruence objection that kills MT-01 and MT-02 does not bite here.
- **disanalogy:** None for the crewed case. The condition that must be stated with the verdict is
  that the corpus's two sources **disagree about the transfer channel** — codified procedure against
  tacit apprenticeship — and that disagreement decides what a receiving agent must be able to do.
- **axis:** `ECR-11` (`two_sided`; both sides are returned or the run refuses).

### MT-03b — Method transfer to a machine trainee

- **mechanism:** The same method transfer, where the trainee is a self-reproducing factory rather
  than a person.
- **evidence:** The two channel sources above are the whole of the corpus on this, and neither
  addresses a non-human trainee. `deming-1967-japan-quality-control.md`
  `spear-1999-decoding-tps-dna.md`
- **leaves:** `deming-1967-japan-quality-control.md` `spear-1999-decoding-tps-dna.md`
- **verdict:** `unknown` — **direction:** `-`
- **capability:** `unmeasured` — no source on disk establishes what "teach a hypothesis-testing
  discipline to a machine" means, still less measures it.
- **congruence:** `holds`
- **disanalogy:** The unmeasured quantity is whether a machine agent can carry the receiving half of
  either transfer channel. This is the one mechanism the predecessor tagged fully transportable, and
  splitting it is this rebuild's second substantive change: FA1 carried the open question in prose
  under a `transportable` tag, which is a tag and a caveat pointing opposite ways.
- **axis:** `ECR-11`

### MT-04 — Labour reallocation out of agriculture

- **mechanism:** Moving labour from a low-productivity sector to a high-productivity one raises
  measured aggregate productivity.
- **evidence:** Reallocation contributes 0.66 of 4.78 aggregate TFP points, 1956-73. `aoki-2009-government-tfp-growth.md` Improved resource allocation 0.95 points of 8.77 percent for
  1953-71, reported through a book review and not from a primary. `may-1977-how-japans-economy-grew-so-fast-review.md` Human-capital-adjusted controls shrink the
  effect toward zero, because what moved was the education embodied in the migrants. `henderson-2008-myth-of-miti.md` A counterfactual floor of 14 million workers held in agriculture
  lowers simulated 1990 output by close to 18 percent, the largest single policy effect measured
  anywhere in this corpus. `esteban-pretel-2009-postwar-japan-policy.md` The mechanism's
  own statement requires a reservoir supplying labour at a roughly constant wage until a turning
  point. `lewis-1954-unlimited-supplies-labour.md`
- **leaves:** `aoki-2009-government-tfp-growth.md` `may-1977-how-japans-economy-grew-so-fast-review.md` `henderson-2008-myth-of-miti.md` `esteban-pretel-2009-postwar-japan-policy.md` `lewis-1954-unlimited-supplies-labour.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — no subsistence sector, no population depth, no "average product of the
  family farm" setting a wage floor.
- **congruence:** `holds` — congruence is not the binding condition here.
- **disanalogy:** The reservoir does not exist. FA1 tagged this `absent` as a verdict; under
  `transfer_gate.md` §3.4 `absent` is the **basis** and `illustration` is the verdict, and the
  re-basing is why this row reads differently from its predecessor while saying the same thing.
- **axis:** `ECR-06` — the band runs from near zero to about one point and any quoted magnitude names
  the accounting that produced it.

### MT-05 — Domestic saving financing the capex phase

- **mechanism:** A high domestic saving rate finances the investment boom internally.
- **evidence:** A subsistence-consumption model reproduces the hump-shaped saving rate as a response
  to war-destroyed capital, and its own limitations section concedes the subsistence parameter was
  chosen to fit the target pattern. `christiano-1989-japan-saving-rate.md` The fix fails
  once labour supply is endogenous; reproducing the postwar path additionally requires a TFP path.
  `otsu-2007-neoclassical-postwar-japan.md`
- **leaves:** `christiano-1989-japan-saving-rate.md` `otsu-2007-neoclassical-postwar-japan.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — there is no lunar household sector to save.
- **congruence:** `holds`
- **disanalogy:** No saver population. The transferable observation is the reframing rather than the
  mechanism: a high saving rate was the shadow of a capital deficit being filled, not a cultural
  constant — and even that reframing rests on a parameter its own author says was fitted.
- **axis:** `ECR-03`

### MT-06 — Defence-burden shed

- **mechanism:** Releasing a defence burden frees capital for civilian investment.
- **evidence:** Japanese defence spending as a share of GDP fell 20 percent between 1958 and 1960,
  the sharpest shift of the postwar era, continuing below 1 percent of GDP by 1970. `beckley-2018-americas-role-japan-miracle.md`
- **leaves:** `beckley-2018-americas-role-japan-miracle.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — no lunar defence budget to shed.
- **congruence:** `holds`
- **disanalogy:** There is no burden. What the source bundles with it is a sponsor, and that is
  MT-07, which is where the transportable content of this row went.
- **axis:** `-`

### MT-07 — Durable sovereign demand sponsor

- **mechanism:** A durable external sponsor supplying capital access, market access, technology
  tolerance and political backing over a decade.
- **evidence:** Per-capita GDP grew 9.3 percent a year 1958-68 against 3.6 percent for synthetic
  Japan, a gap averaging about 1,288 dollars a year or 39.2 percent of the 1958 baseline; the
  in-space placebo puts Japan's post/pre mean-squared-prediction-error ratio first of 49, chance
  probability about 0.020. The economic content named for 1958: US-orchestrated loans doubled foreign
  lending to Japan; American purchases from Japan rose more than 150 percent from 1958 to 1960,
  producing Japan's first trade surplus; the United States then absorbed more than 30 percent of
  Japanese exports for a decade. `beckley-2018-americas-role-japan-miracle.md`
- **leaves:** `beckley-2018-americas-role-japan-miracle.md`
- **verdict:** `unknown` — **direction:** `-`
- **capability:** `unmeasured` — whether a lunar analogue of comparable durability and scale exists
  is established by no source on disk.
- **congruence:** `unmeasured`
- **disanalogy:** The unmeasured quantity is **the sponsor**. This row reverses FA1's `partial` tag,
  which read the sponsor as "obtainable in principle: a space agency or coalition could play the US
  role." Obtainable in principle is not a measurement, and a mechanism whose enabling condition
  nobody has measured is `unknown` under §3.3 whatever its plausibility. It is the most important
  refusal this table produces, and §4 below is where the input is bounded rather than assumed.
- **axis:** `-`

### MT-08 — Procurement spike as a starter

- **mechanism:** A large one-off procurement award starts a growth episode.
- **evidence:** The 1951 in-sample placebo ranks Japan 26th of 48, chance probability about 0.542, so
  the Korean War onset does not mark a comparable structural break; the break is 1958. `beckley-2018-americas-role-japan-miracle.md` The spending was nonetheless large: nearly three
  billion dollars in Japan on war-related goods and services between June 1950 and July 1954,
  described following Johnson as nearly 60 percent of what Washington spent across all of
  non-Communist Europe over a comparable span, with the industrial production index rising from 94 in
  June 1950 to 142 by July 1951; the article treats the boom as accelerating and secondary. `dingman-1993-dagger-and-gift-korean-war.md`
- **leaves:** `beckley-2018-americas-role-japan-miracle.md` `dingman-1993-dagger-and-gift-korean-war.md`
- **verdict:** `legitimate` — **direction:** `negative`
- **capability:** `holds` — the negative does not require a lunar MITI or a lunar Pentagon; it is a
  statement about what a spike does.
- **congruence:** `holds` — a technique unprofitable under the leader's own factor prices does not
  become profitable under an inverted vector, and congruence does not block a negative the way it
  blocks a positive.
- **disanalogy:** None for the negative. **The positive is not licensed**: this row does not say a
  lunar procurement award produces nothing, it says the evidence that a spike starts an episode is
  absent and that the measured break is a durable relationship. A large CLPS-scale or Mars-campaign
  award is a Korean War procurement, and MT-07 is the thing it is not.
- **axis:** `ECR-04` (`one_sided`; the affirmative side exists only as reported speech inside its own
  critic, and the answer says so rather than returning the negative as consensus).

### MT-09 — Absorptive capacity in the receiving agent

- **mechanism:** An educated workforce is what converts imported technique into productivity.
- **evidence:** Compulsory education extended from six years to nine, linked to the improving
  intellectual quality of the labour force. `nakamura-1989-postwar-japanese-economy.md` The net
  technology-import to GNP ratio declined over the same period that the R&D to GNP ratio rose, read
  as a shift from adoption toward domestic innovation. `aoki-2009-government-tfp-growth.md`
  Non-agricultural TFP gains are attributed to adoption, imitation and assimilation of foreign
  technical know-how, **with absorptive capacity linked to human capital accumulation**.
  `esteban-pretel-2009-postwar-japan-policy.md` **Repaired at the source-verification pass:** that
  last clause was previously attributed to `aoki-2009`, which contains neither the word absorptive
  nor the word congruence anywhere in it. The misattribution was inherited from this axis's own
  `ECR-01 C` member row and would have survived every citation check in the project, because the
  file it named resolves and says something adjacent.
- **leaves:** `nakamura-1989-postwar-japanese-economy.md` `aoki-2009-government-tfp-growth.md` `esteban-pretel-2009-postwar-japan-policy.md` `acemoglu-2020-robots-and-jobs.md`
- **verdict:** `unknown` — **direction:** `-`
- **capability:** `unmeasured` — whether machine capital carries absorptive capacity is not
  established by any source on disk. The only measurement of what industrial robots do to output is
  0.13 percent aggregate GDP for each additional robot per thousand workers, with negative employment
  and wage effects, which measures a substitute for labour and not a carrier of absorptive capacity.
  `acemoglu-2020-robots-and-jobs.md`
- **congruence:** `holds`
- **disanalogy:** The unmeasured quantity is whether an autonomous capital stock can absorb and apply
  imported method. Routes to MT-03b and MT-17, and the three must not be answered independently of
  one another: they are one question asked in three vocabularies.
- **axis:** `ECR-16`

### MT-10 — Sectoral targeting and directed capital

- **mechanism:** An authority directs capital at chosen sectors and raises their productivity.
- **evidence:** Targeting correlated **negatively** with sectoral growth in every period: JDB loans
  -0.31 for 1955-90 and -0.48 for 1955-73, tax relief -0.55 over the full period rising to -0.77 in
  1974-90. The TFP regression explains about 7 percent of TFP growth (R-squared 0.068, adjusted
  0.007, N = 310), and virtually all the cross-sectional variation behind the significant JDB
  coefficient comes from **mining**. The output-growth and capital-accumulation regressions on the
  same instruments have R-squared 0.137 and 0.183 respectively, with one-year JDB loans and level
  tariff protection significantly positive in both. `beason-1996-targeting-japan.md`
  Counterfactual removal of subsidies and FILP barely changes aggregate output, and FILP was under
  ten percent of total industrial lending. `esteban-pretel-2009-postwar-japan-policy.md`
- **leaves:** `beason-1996-targeting-japan.md` `esteban-pretel-2009-postwar-japan-policy.md`
- **verdict:** `legitimate` — **direction:** `negative`
- **capability:** `holds` — this is a statement about what happens when an authority allocates
  capital against a criterion other than measured productivity, and a lunar programme office
  allocating against political or programmatic criteria is in the same position.
- **congruence:** `holds` — negatives are not blocked by congruence.
- **disanalogy:** None for the negative. **Read the R-squared figures as R-squared.** 0.137 and 0.183
  are the explained variance of two regressions, not correlations between targeting and those
  outcomes; the significant coefficients are DJDB(-1) at 0.00400 and 0.00336 and TAR(-1) at 0.00511
  and 0.00310. A predecessor of this row printed 0.183 as "positive correlation with capital
  accumulation", and that mislabel resolves against a real file and is still wrong, which is the
  exact defect class citation checking cannot catch.
- **axis:** `ECR-01`, and `ECR-10` for the lineage: Beason 1996, Kiyota 2005 and Kiyota 2013 are one
  lineage rather than three independent confirmations, and returning more than one of them as
  corroboration overstates the evidence by roughly a factor of three.

### MT-11 — Coordination, standards, consortia

- **mechanism:** Non-distortionary coordination — research consortia, standards, not protecting
  losers — raises productivity where picking winners does not.
- **evidence:** The coordination reading of MITI's useful role, with the VLSI consortium reported as
  raising member R&D and patents, and a named dissent that the semiconductor consortium yielded
  neither strong externalities nor excess returns. `aoki-2009-government-tfp-growth.md`
- **leaves:** `aoki-2009-government-tfp-growth.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `holds` — standards-setting is cheap and needs no population.
- **congruence:** `absent` — the coordination object is a set of firms with competing techniques
  converging on an interface. The corpus establishes no lunar counterpart of that population, and
  the space-law shelf's coordination artifacts are treaty and licensing instruments rather than
  technical-standards bodies.
- **disanalogy:** The evidence that consortia moved the needle is contested inside the one source
  that reports it, so the mechanism is weakly established even for Japan. Import the standards
  discipline, not the faith in consortia.
- **axis:** `ECR-01` — capability-building against targeting.

### MT-12 — Land reform

- **mechanism:** Redistributing tenure raises agricultural productivity.
- **evidence:** No clear productivity effect; average farm size fell from 1.09 to 0.99 hectares; a
  peasantry-to-peasantry reform. `kawagoe-1999-japan-land-reform.md` Tenanted land fell
  from 46 percent in 1941 to 9 percent in 1955 and owner-cultivators rose from 31 to 70 percent.
  `nakamura-1989-postwar-japanese-economy.md` Redistribution as a political-settlement
  precondition for the developmental state. `wade-2018-developmental-state-dead-or-alive.md`
- **leaves:** `kawagoe-1999-japan-land-reform.md` `nakamura-1989-postwar-japanese-economy.md` `wade-2018-developmental-state-dead-or-alive.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — no tenure, no peasantry, no distributional politics.
- **congruence:** `holds`
- **disanalogy:** The object of the reform does not exist. The transferable content is methodological
  rather than causal: a celebrated cause of the miracle that, examined, has no measured productivity
  effect and coincided with average farm size falling. It is a warning about folk causes.
- **axis:** `ECR-05` — `false_pair`. The three sources measure three different outcomes and an answer
  presenting them as a disagreement is wrong.

### MT-13 — The Dodge Line and the 360 yen peg

- **mechanism:** A balanced budget and a fixed exchange rate anchor the investment boom.
- **evidence:** Balanced-budget orthodoxy from 1949 and a single fixed rate through the high-growth
  years, with an explicit caution against calling the result a planned economy because final
  investment decisions stayed with firms. `nakamura-1989-postwar-japanese-economy.md`
  `esteban-pretel-2009-postwar-japan-policy.md`
- **leaves:** `nakamura-1989-postwar-japanese-economy.md` `esteban-pretel-2009-postwar-japan-policy.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — no lunar currency, no exchange rate, no independent monetary policy.
- **congruence:** `holds`
- **disanalogy:** The instruments do not exist. Their transportable kernel is MT-14 and nothing else,
  and in particular no quantitative claim survives this row.
- **axis:** `-`

### MT-14 — Macro stability as a precondition

- **mechanism:** A stable unit of account and predictable rules precede capital formation.
- **evidence:** Dodge stabilisation ended the hyperinflation and balanced-budget orthodoxy gave a
  stable planning environment for private investment; final investment decisions stayed with firms.
  `nakamura-1989-postwar-japanese-economy.md` The plans are read as coordination and
  expectation-setting rather than direction. `esri-2016-japan-high-growth-economic-plans.md`
- **leaves:** `nakamura-1989-postwar-japanese-economy.md` `esri-2016-japan-high-growth-economic-plans.md` `un-1967-outer-space-treaty.md` `nasa-2020-artemis-accords.md` `hague-working-group-2019-building-blocks-space-resources.md` `luxembourg-2017-space-resources-law.md`
- **verdict:** `legitimate` — **direction:** `positive`
- **capability:** `holds`, in the weak form only. The lunar delivery vehicle is not fiscal policy but
  a treaty, licensing and property-rights regime, and the merged corpus now carries that shelf:
  `un-1967-outer-space-treaty.md` `nasa-2020-artemis-accords.md` `hague-working-group-2019-building-blocks-space-resources.md` `luxembourg-2017-space-resources-law.md`
- **congruence:** `holds` — a rule-stability claim is not a technique selected against factor prices.
- **disanalogy:** **The verdict is legitimate only for the qualitative claim.** No quantitative
  statement carries: the peg, the fiscal stance and the monetary independence are all absent (MT-13).
  This row is `legitimate` where FA1 said "transportable in spirit", and the upgrade is not
  enthusiasm — it is that the merge supplied a shelf for the delivery mechanism, which FA1 did not
  have and could not name.
- **axis:** `-`

### MT-15 — Two-sector structural transformation

- **mechanism:** Sectoral TFP paths and factor mobility, not policy instruments, are the modelled
  core of the episode.
- **evidence:** A calibrated two-sector model reproduces postwar growth and the agricultural-
  employment decline; removing subsidies and FILP barely changes aggregate output; a 14-million-worker
  mobility floor cuts simulated 1990 output by close to 18 percent. `esteban-pretel-2009-postwar-japan-policy.md`
- **leaves:** `esteban-pretel-2009-postwar-japan-policy.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — the two sectors are agriculture and non-agriculture, and one of them
  does not exist on the Moon.
- **congruence:** `holds`
- **disanalogy:** The model's "factor mobility" is labour migration between sectors. Its lunar
  restatement, capital reallocation among tasks, is a different quantity with no measurement behind
  it, and substituting one for the other is the move this row exists to block.
- **axis:** `ECR-13`

### MT-16 — The reference class a base rate is drawn from

- **mechanism:** A base rate for a projection is drawn from a population of prior cases, and which
  population is a choice that changes the answer.
- **evidence:** The cross-country record is not one process: median single-trend R-squared 0.67 for
  developing countries against 0.95 for industrial ones, below 0.5 for 40 percent of them, and a
  pre-break to post-break growth rank correlation of 0.24. `pritchett-2000-hills-among-plateaus.md` 83 accelerations since the 1950s at a bar of 3.5
  percentage points a year sustained over eight years, with 37 of 69 classifiable episodes staying
  above a 2 percent bar for the following decade and 16 of 69 reverting to negative growth. `hausmann-2005-growth-accelerations.md` Nine in ten megaprojects overrun, with rail posting a 44.7
  percent mean cost overrun alongside a 51.4 percent mean demand shortfall. `flyvbjerg-2014-what-you-should-know-megaprojects.md`
- **leaves:** `pritchett-2000-hills-among-plateaus.md` `hausmann-2005-growth-accelerations.md` `flyvbjerg-2014-what-you-should-know-megaprojects.md`
- **verdict:** `legitimate` — **direction:** `both`
- **capability:** `holds` — a reference class is a property of the estimator, not of the follower.
- **congruence:** `holds`
- **disanalogy:** None, and that is the point: **both classes transfer and they disagree about
  direction rather than only magnitude.** A lunar industrial base is not a country; it is a capital
  programme with a single sponsor. Which class is correct is settled by no source on disk, so both
  are returned. `oracle/transfer_gate.md` §2 is the rule this row licenses.
- **axis:** `ECR-15`

### MT-17 — Reproducible machine capacity as the surplus factor

- **mechanism:** A factor available in large quantity at a roughly constant price lets a growing
  sector expand without bidding that price up, producing a rising reinvested surplus until the factor
  is exhausted.
- **evidence:** The mechanism's original statement, including its own scope limit that it produces no
  growth rate and stops at the turning point. `lewis-1954-unlimited-supplies-labour.md`
  The self-replicating lunar factory as an engineering programme. `freitas-1980-advanced-automation-space-missions.md` `chirikjian-2002-self-replicating-robots-lunar.md` The complexity cost of robotic self-replication,
  which is the constraint on the same claim. `lee-2008-robotic-self-replication-complexity.md`
  Against these, the only measurement: about 0.13 percent aggregate GDP for each additional robot per
  thousand workers, with negative employment and wage effects. `acemoglu-2020-robots-and-jobs.md`
- **leaves:** `lewis-1954-unlimited-supplies-labour.md` `freitas-1980-advanced-automation-space-missions.md` `chirikjian-2002-self-replicating-robots-lunar.md` `lee-2008-robotic-self-replication-complexity.md` `acemoglu-2020-robots-and-jobs.md`
- **verdict:** `unknown` — **direction:** `-`
- **capability:** `unmeasured` — whether idle reproducible capital satisfies Lewis's two conditions
  (large quantity relative to near-term demand, and a supply price that stays roughly constant as it
  is drawn down) is a structural analogy that Lewis's own text does not support or test, and no
  source on disk measures it.
- **congruence:** `unmeasured`
- **disanalogy:** Four theoretical sources and one measurement — and the four supply the *form* of
  the argument rather than the finding. Lewis's own summary records that the idle-capital
  substitution is a structural analogy his text neither supports nor tests, and `lee-2008` states
  the complexity cost as a **constraint** on self-replication rather than an affirmation of it;
  only `chirikjian-2002` and `freitas-1980` state the programme straight. The measurement is of a
  different object again: industrial robots inside an economy that has a workforce. The corpus
  carries both and has never had them put against each other.
- **axis:** `ECR-16` (`two_sided`).

### MT-18 — Patient relationship capital

- **mechanism:** Bank-centred, relationship-based finance relaxes investment financing constraints.
- **evidence:** Group and main-bank ties make investment less sensitive to liquidity. `hoshi-1991-corporate-structure-liquidity-investment.md` Directed credit is central to the
  developmental-state model. `wade-2018-developmental-state-dead-or-alive.md` The same
  institution, later: forbearance and evergreening of loans to insolvent borrowers congested markets
  and depressed entry and restructuring in the 1990s. `caballero-2008-zombie-lending-japan.md` And the roster the first result depends on is itself
  contested: the firm-size result is reported as an artifact of how the group roster was constructed.
  `miwa-2002-fable-of-the-keiretsu.md`
- **leaves:** `hoshi-1991-corporate-structure-liquidity-investment.md` `wade-2018-developmental-state-dead-or-alive.md` `caballero-2008-zombie-lending-japan.md` `miwa-2002-fable-of-the-keiretsu.md`
- **verdict:** `legitimate` — **direction:** `negative`
- **capability:** `holds` — the transferable object is a **condition**, not an institution: patient
  capital shielded from honest loss recognition becomes the mechanism that prolongs stagnation. A
  lunar programme with a single sponsor and no mark-to-market discipline is in that condition by
  construction.
- **congruence:** `holds` — negatives are not blocked.
- **disanalogy:** The positive is not licensed, for two independent reasons: there is no lunar firm
  population for a main-bank tie to relax a constraint at, and the measurement that the tie relaxes a
  constraint rests on a roster construction that a second source re-tests and rejects.
- **axis:** `ECR-14` (`false_pair`: one mechanism under two conditions, never presented as a
  disagreement), `ECR-02`, `ECR-13`.

### MT-19 — Plans as coordination and announcement

- **mechanism:** An official growth forecast changes firm behaviour by setting expectations.
- **evidence:** Actual growth exceeded the target of all six plans, read as showing the plans were
  not causal. `henderson-2008-myth-of-miti.md` The same fact, with real growth
  underestimated in all six years 1955 to 1960, read as an announcement effect: firms treated the
  official forecast as a floor. `esri-2016-japan-high-growth-economic-plans.md` A
  contemporaneous external appraisal of the income-doubling plan. `imf-1963-appraisal-japan-double-income.md`
- **leaves:** `henderson-2008-myth-of-miti.md` `esri-2016-japan-high-growth-economic-plans.md` `imf-1963-appraisal-japan-double-income.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — the mechanism requires a population of firms making independent
  investment decisions against a published national forecast. A lunar programme with one sponsor has
  no such population, and the sponsor's forecast is its own budget.
- **congruence:** `holds`
- **disanalogy:** The audience does not exist. This is the most instructive row in the register for a
  different reason: one fact carries two readings, and an Oracle that retrieves the six-plans-overrun
  fact and returns one reading has taken a side without knowing it.
- **axis:** `ECR-12` (`two_sided`, `scope_token` `-`).

### MT-20 — The big push

- **mechanism:** Simultaneous coordinated investment across complementary sectors is profitable for
  all of them when no single sector could break even alone, because each firm's investment creates
  demand for the others' output.
- **evidence:** The original policy argument, framed around absorbing an agrarian excess population
  and sized against a ten-year capital budget. `rosenstein-rodan-1943-problems-industrialisation.md` Its formalisation as a move between two Nash
  equilibria of a fixed economy, with three distinct mechanisms that generate the multiplicity, and
  no change in endowments, technology or preferences required. `murphy-1989-industrialization-big-push.md`
- **leaves:** `rosenstein-rodan-1943-problems-industrialisation.md` `murphy-1989-industrialization-big-push.md`
- **verdict:** `illustration` — **direction:** `both`
- **capability:** `absent` — both statements of the mechanism run through **aggregate demand
  spillovers inside a domestic market**, and the original runs additionally through an agrarian
  excess population. Neither exists.
- **congruence:** `holds`
- **disanalogy:** The externality that makes the big push work is that one firm's wage bill is
  another firm's market. A lunar base whose only customer is its sponsor has no such loop, so
  coordinated simultaneous investment there is a procurement schedule wearing the name of a
  mechanism. This row is new, and it exists because a lunar "big push" is the most natural thing to
  reach for once MT-10 has been ruled out.
- **axis:** `-`

### MT-21 — Resource-led development

- **mechanism:** Natural resource wealth drives development, or curses it, through Dutch disease,
  lost learning by doing, weak institutions, revenue volatility, rent seeking and conflict.
- **evidence:** The survey of eight candidate explanations against cross-country, panel and
  quasi-experimental evidence, with the heterogeneous country record as its starting point, and a
  section on why resource-rich developing countries so often fail to reinvest rents. `vanderploeg-2011-natural-resources-curse-blessing.md`
- **leaves:** `vanderploeg-2011-natural-resources-curse-blessing.md`
- **verdict:** `unknown` — **direction:** `-`
- **capability:** `unmeasured` — the survey's conditioning variables are institutional quality,
  political system and fiscal rules. No source on disk measures the lunar counterpart of any of them,
  and the space-law shelf describes instruments rather than measuring outcomes.
- **congruence:** `unmeasured`
- **disanalogy:** A lunar industrial base is a resource-extraction economy, which makes this the
  literature that most obviously applies and the one with the least measured lunar counterpart. The
  honest output is a named gap, not a curse verdict and not a blessing verdict.
- **axis:** `-`

### MT-22 — The AK corner, and closure as the condition on it

- **mechanism:** Growth without diminishing returns requires that capital reproduce itself with no
  nonreproducible factor anywhere in its reproduction chain.
- **evidence:** The endogenous-growth condition itself. `rebelo-1991-ak-long-run-growth.md` Closure defined as the fraction of inputs a system no longer
  imports, with the paper's explicit statement that nearly full closure is vastly easier than full
  closure because electronics and chips are the hard fraction, and generation-by-generation targets
  stated as imported-electronics percentages of 90, 95, 99 and 100; total launched mass about 12
  tonnes and an asset-mass plateau near 100 tonnes before full closure. `metzger-2013-bootstrapping-space-industry.md` `freitas-1980-advanced-automation-space-missions.md`
- **leaves:** `rebelo-1991-ak-long-run-growth.md` `metzger-2013-bootstrapping-space-industry.md` `freitas-1980-advanced-automation-space-missions.md`
- **verdict:** `unknown` — **direction:** `-`
- **capability:** `unmeasured`
- **congruence:** `unmeasured` — and this is the row where congruence stops being an objection and
  becomes a mechanism. See §3.
- **disanalogy:** Whether lunar capital can walk through the AK corner is a closure-ratio question
  rather than an economics question, and the closure ratio is not a free parameter. §3 states the
  coupling and does not resolve it.
- **axis:** `-`

### MT-23 — The growth-accounting residual itself

- **mechanism:** A decomposition attributes growth to named sources, and the residual is what is left.
- **evidence:** 3.05 of 9.89 on a Domar-weighted industry aggregation, where the paper's own Table 14
  yields 3.72 or 3.05 from the same data and opposite signs for 1990-95; capital stocks built over
  102 asset types by perpetual inventory with geometric depreciation. `jorgenson-2005-industry-origins-japan.md` 4.78 percent aggregate, 1956-73, with reallocation
  itemised separately. `aoki-2009-government-tfp-growth.md` About 5.6 percent in the 1960s
  from a model with endogenous labour supply. `otsu-2007-neoclassical-postwar-japan.md`
  Reported through reviews at 8.77 percent for 1953-71 with components summing to 8.81, and at 9.56
  percent for 1961-71 with components summing to 8.74. `may-1977-how-japans-economy-grew-so-fast-review.md` `simonis-1979-denison-boltho-review.md` The authority on why two accountings of one work disagree:
  ground rule 3 requires a complete and unduplicated classification's contributions to sum to
  measured growth, or to multiply to it where statistical interaction is handled as a product of
  indexes. `denison-1972-classification-of-sources-of-growth.md`
- **leaves:** `jorgenson-2005-industry-origins-japan.md` `aoki-2009-government-tfp-growth.md` `otsu-2007-neoclassical-postwar-japan.md` `may-1977-how-japans-economy-grew-so-fast-review.md` `simonis-1979-denison-boltho-review.md` `denison-1972-classification-of-sources-of-growth.md` `bea-depreciation-rates.md` `beckley-2018-americas-role-japan-miracle.md` `dingman-1993-dagger-and-gift-korean-war.md`
- **verdict:** `legitimate` — **direction:** `negative`
- **capability:** `holds` — the finding is about decompositions, not about Japan, so it carries to any
  decomposition of any economy including a lunar one.
- **congruence:** `holds`
- **disanalogy:** None for the negative. **The residual is a function of how many inputs the
  decomposition measured**, and the negative that transfers is that no bare productivity share is
  quotable without naming the decomposition, the period, and whether scale and reallocation were
  itemised. Four decompositions of one episode give four residuals; one of them gives two from the
  same data and, in one sub-period, opposite signs. Any lunar growth accounting inherits this
  immediately, because it will have fewer measured inputs than any of them.
- **axis:** `ECR-07`, `ECR-08`.

---

## 3. Standing tension: closure ratio against terrestrial TRL

**Sub-step 7.2 (ECON-9). Both positions stand. Neither is marked correct, and this section resolves
nothing.** It is stored here rather than in a scratch file because it is a condition on MT-22, and a
tension that lives only in a memo is a tension somebody has to remember to consult.

### 3.1 Position A — The Manager, economics

The closure ratio is not only a physical parameter. **It is a choice of technique, and technique is
selected against a factor-price vector.** A process is high-TRL on Earth because it was selected,
refined and de-risked under terrestrial factor prices, and terrestrial factor prices make Earth
inputs cheap: free atmosphere, 1g settling, cheap thermal mass, water as a solvent nobody budgets,
and abundant maintenance labour. A process with high lunar closure is by definition one that avoids
Earth inputs, which means it was selected against a vector no terrestrial engineer has ever faced,
which means nobody has built it, which means it is low TRL.

The two properties a seed factory must have simultaneously are therefore **negatively coupled by
factor-price selection**, and the coupling is a mechanism rather than a coincidence. Raising the
closure ratio is not free progress along one axis: it buys down the nonreproducible-factor problem at
the cost of the TRL the programme was relying on, and raising TRL by adopting a proven terrestrial
process buys back Earth dependence, which is the nonreproducible link that collapses the AK corner to
Solow.

The claim that a targeted development programme dissolves the coupling is the claim MT-10 measures:
an authority directing capital at accumulation, with no measured productivity effect.

### 3.2 Position B — The Space Resources Engineer

TRL is a necessary condition and it binds first. An economy cannot compound on a process nobody has
built, and the corpus's own maturity sheet puts the water chain — which every architecture in the
corpus depends on — at TRL 3/4 at its weakest link, capture and cleanup, with the single integrated
demonstration recovering 50 to 73 percent of the water at 15 to 44 kWh per kilogram. Three of the
app's load-bearing terms are ASSUMPTION by the app's own declaration, so a growth model built on them
is arithmetic on assumptions, and the arithmetic being correct is not evidence about the Moon. The
deliverable to the economics seat is therefore not a veto but a maturity field on every number, and
what will be objected to is a compounding claim whose inputs carry no maturity field at all.

Position B also concedes, in its own words, where Position A is right: a process at TRL 6 that no
economy would buy is not progress, and helium-3 is the cleanest case in this corpus — a documented
supply chain and no demand side at all.

### 3.3 What both positions agree on, and what would settle it

Both hold that a process must be **buildable** and **worth building**, that these are two independent
gates, and that the Oracle should be able to fail a claim at either one and say which. Neither
question is prior.

**What would falsify Position A:** a process on this shelf with simultaneously high lunar closure and
high terrestrial TRL, whose high TRL was not achieved by a terrestrial application that happens to
face a lunar-like factor price. One candidate exists and neither seat has tested it: vacuum and
cryogenic process equipment, where the terrestrial factor prices are already unusual.

**What would falsify Position B:** a compounding path whose binding constraint is demand rather than
maturity, so that raising TRL changes nothing. Position B names two candidates against itself,
helium-3 and construction sintering.

**What settles neither:** any argument that does not measure. This section is stored, not decided.

---

## 4. The two unnamed inputs

**Sub-step 7.3 (ECON-11).** Both are declared here as gaps carried in the corpus rather than defaults
silently adopted, and both are bounded rather than left open, because an unbounded number propagates
into every lunar cost answer the Oracle gives.

### 4.1 `δ_lunar` — the lunar capital depreciation rate

**Premise correction first.** The sub-step text this row was written against states that *"no source
on disk supplies it, and every terrestrial depreciation rate in the corpus embeds a
free-maintenance-labour assumption none of them states."* Measured against the merged shelf, **both
halves are now wrong, in opposite directions**, and the correction is the deliverable.

**Half one: a source landed.** `literature/growth-theory/bea-depreciation-rates.md` landed at Step
2.5 and is the canonical published schedule of terrestrial geometric depreciation rates. It supplies
the terrestrial floor directly, in the asset classes a lunar industrial base is built from:

| Asset class | Geometric rate, per year |
|---|---|
| Mining and oil field machinery | 0.1500 |
| Construction machinery and equipment | 0.1550 (private) to 0.1650 (state and local) |
| General purpose machinery and equipment | 0.1500 |
| Special industry machinery and equipment | 0.1500 |
| Metalworking machinery and equipment | 0.1031 |
| Computer and electronic products | 0.1179 to 0.1834 |
| Semiconductor manufacturing R&D capital | 0.2500 |
| Manufacturing buildings, for contrast | 0.0314 |

Every rate in that table is quoted from `bea-depreciation-rates.md`, which reconciled each of them
against the on-disk PDF page by page and reports an exact match on all eight.

**Half two: one of the two sources states the assumption, and it is the one that landed.** The BEA
file states it twice, in its own Limitations and in its reconciliation: *"every figure describes
terrestrial assets in resale markets on Earth, with maintenance, repair, and benign operating
environments assumed; none of these rates was measured under lunar conditions, so they function
strictly as a lower bound and analog."* The claim that **none** of the corpus's depreciation sources
states the assumption is therefore refuted by the corpus itself.

It is refuted narrowly. `jorgenson-2005-industry-origins-japan.md` builds capital stocks over 102
asset types by perpetual inventory with geometric depreciation, taking rates for motor vehicles and
housing from Box-Cox age-price and age-efficiency profiles estimated in **Japanese second-hand and
rental markets** (16.3 percent for passenger vehicles, 22.4 to 23.8 percent for trucks, 3.1 to 4.8
percent for housing) and the rest from **Japanese tax-life-based declining-balance rates** following
Hulten-Wykoff (`jorgenson-2005-industry-origins-japan.md`). A second-hand price is the price
of an asset that was maintained, and a tax life is an administrative convention about an asset that
was maintained. **Jorgenson does not state the assumption. The measurement method is what embeds
it**, and that is the more interesting half, because it means the assumption is not a footnote
someone forgot but a property of every estimator in the class: you cannot observe the decay of an
unmaintained industrial asset in a resale market, because unmaintained industrial assets do not have
one.

**The bound, with the assumption named.**

> `δ_lunar ≥ 0.10 per year`, and more defensibly `≥ 0.15 per year` for the mining, construction,
> general-purpose and special-industry machinery classes a lunar base is actually built from.
>
> **The floor is a floor and not an estimate**, because every rate behind it is the observed decay of
> capital *under continuous, separately unpriced human maintenance in a benign environment*. On the
> Moon that input is not free and may not exist. The named lunar accelerators — abrasive regolith
> dust, thermal cycling of roughly ±150 °C per lunation, radiation, hard vacuum, and no maintenance
> or repair crew — all push the rate up and none of them pushes it down, so the direction of the
> error is known even though its magnitude is not.
>
> **Provenance depth `via_tertiary`.** `bea-depreciation-rates.md` carries that grade at sub-step
> 2.8: its own citation names Fraumeni 1997 and Hulten-Wykoff 1979/1981 as the primary underlying
> sources and none of them is on disk. An answer quoting this bound says so.

**Why a bound with the assumption named beats a number without it.** A point estimate of `δ_lunar`
would be a measurement of nothing — there is no lunar resale market and no lunar tax life — while the
inequality is a real constraint with a known direction, and the maintenance clause is what tells a
reader which way the number moves when the assumption is relaxed. A number without it silently
imports a maintenance crew into every lunar cost answer.

**Status:** `bounded`. Not `sourced`, because no source measures a lunar rate, and not `open`,
because the floor and the direction are both established. The Space Resources Engineer owns the
lunar accelerators, per the sub-step's own assignment; this seat owns the floor and the assumption.

### 4.2 The demand sponsor

The second input is named in the sub-step text at `cr_scratch/step0_integration_draft.md` line 228:
*"(b) The demand sponsor: named or refused."*

**Refused, and here is the refusal with its three nouns.**

- **The absent object.** An external demand sponsor for a lunar industrial base of durability and
  scale comparable to the one measured for Japan — capital access, market access, technology
  tolerance and political backing, sustained over a decade rather than delivered as a spike.
- **The region searched.** `literature/` at 169 summaries, and the app.
- **The nearest present object.** `beckley-2018-americas-role-japan-miracle.md`, which measures what
  such a sponsor was worth where one existed: 9.3 percent a year against 3.6 percent for synthetic
  Japan, 1958-68, with the United States absorbing more than 30 percent of Japanese exports for a
  decade. And `dingman-1993-dagger-and-gift-korean-war.md`, which establishes that the spike version
  of the same thing — nearly three billion dollars between June 1950 and July 1954 — did not start
  anything, corroborated by the 1951 placebo's rank of 26 of 48.

**The app is silent on precisely this variable, and its silence is citable.** `grade-independent-demand`
is `FORMALLY EXCLUDED` in the Scenario Explorer, with the app's own stated reason *"no cadence
coefficient, no landings knob, no build-out term"*, ruled at its Step 38 reconciliation. Under
`register_schema.md` §3.2 an exclusion sentence is a **resolved address**, so an answer touching this
prints it verbatim and labels it the app declining — never as an app-sourced value. The project's
computational authority is definitively silent on the one variable this refusal is about, which is a
stronger statement than a missing number.

**Bounding what can be bounded.** The corpus does hold a demand anchor, and it is small and
conditional: a held figure of 100 tonnes a year of propellant demand on the lunar surface, built from
two crewed missions at 25 tonnes each plus one large cargo at 50 tonnes, with the app recording that
lunar propellant carries **no signed offtake agreement** and that its market is unproven. That is a
sponsor's *purchase order*, stated as a scenario input, and it is not evidence that a sponsor exists.
The distinction between an assumed offtake and a measured one is exactly what MT-07 refuses on.

**Status:** `refused`, `unknown` at MT-07, and escalated. The sub-step assigns the ruling on whether
to pursue it to the author, and the escalation is recorded at `cr_scratch/step4_manager_econ.md`.
Until then the Oracle refuses rather than assuming a sponsor, and that refusal is the most important
one this table produces: an answer that assumes it is wrong in the direction the whole project is
predisposed to be wrong in.
