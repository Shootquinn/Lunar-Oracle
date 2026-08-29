# A.10 Step 2 Source Verification — Resweep, ECR-01 through ECR-13

Orchestrator sub-pass. Read-only. This is a fresh, first-hand resweep, not a transcription of a
prior pass: the two sibling verifications for ECR-01..07 and ECR-08..13 reported results only in
chat and those results were never captured to a file, so nothing from them is reused here. Every
verdict below was produced by opening the cited file and reading it end to end.

## Method

Commands run (from repo root):

```
awk -F'\t' '$2 ~ /^ECR-(0[1-9]|1[0-3])$/' oracle/REGISTER.econ.tsv
find literature -iname "<leaf.md>"                     # once per unique leaf named in the M rows
grep -n -i "absorptive\|congruence\|technology gap" literature/.../aoki-2009-government-tfp-growth.md
grep -n "0.183\|capital accumulation" literature/.../beason-1996-targeting-japan.md
grep -n "31 percent\|70 percent\|46 percent\|9 percent\|45.9\|owner-cultivat" literature/.../nakamura-1989-postwar-japanese-economy.md
sha256sum <all files below>
```

Every file below was read in full via the Read tool; grep was used only as a targeted follow-up
check after a discrepancy was already suspected from the full read (never as a substitute for
reading the file).

## Read-digest of the file set walked (new to this pass; the ECR-14..18 pass's four reused files —
kiyota-2005, hoshi-1991, beckley-2018, wade-2018 — are hashed in `verify_ecr_14_18.md` and not
repeated here)

```
7edfe7f99638a61f17758039c891c85659fc7e43841203006c29d1b8ed73ea6c  literature/development-and-industrial-policy/beason-1996-targeting-japan.md
5ea540dca13a094c740207aa28bed5daca95b470a105ccd2d9fd867c47789764  literature/development-and-industrial-policy/esteban-pretel-2009-postwar-japan-policy.md
638567d7ab4919ef4c9109ed88d1bccd4d0a9af5a2110adf7c7c77e7284aec3b  literature/development-and-industrial-policy/kiyota-2013-import-quota-removal.md
d135aa0ed2e773a4dd45022e0117cfa6565b558a569f5d42bf7f72847e6d63a1  literature/development-and-industrial-policy/henderson-2008-myth-of-miti.md
91b1f8c9089c84a82130215d67795a9698c2dc7222ce1db0b2d71307a5d093c0  literature/development-and-industrial-policy/aoki-2009-government-tfp-growth.md
437d3d43f1cbe828b0299a656e7a6256ff62b74df66c7586cf595c0faf8fbb95  literature/development-and-industrial-policy/miwa-2002-fable-of-the-keiretsu.md
a72a4c6995dc659e8c6968a401912b22a441a48b6f9ea000eb5e669f48322acd  literature/growth-theory/christiano-1989-japan-saving-rate.md
47358435ee703f32cdef98f0a6c9b6c80563c741a9a280397167125167f94931  literature/growth-theory/otsu-2007-neoclassical-postwar-japan.md
c79eabdd34215bba12916224c426d94c12ddfe816af42ce5fae95a34f7f311fb  literature/development-and-industrial-policy/dingman-1993-dagger-and-gift-korean-war.md
2e5477e1c79a8367fd875230f3ae514443d407af526f1db25396621398c01f36  literature/development-and-industrial-policy/kawagoe-1999-japan-land-reform.md
b1368619f91a321ec7ef21ce419ff519e3b853ff960cf7d20f4bd87354c6c8c0  literature/development-and-industrial-policy/nakamura-1989-postwar-japanese-economy.md
e0ba845436fe0013e283d7e60d94f30b16963cea56d0a7faaf051669da29a313  literature/development-and-industrial-policy/may-1977-how-japans-economy-grew-so-fast-review.md
ba41f56ef76f4503171a42fbc355d8f641969f19299cb2c1f73d1e78ce023709  literature/growth-theory/jorgenson-2005-industry-origins-japan.md
b8ae2179a9da650f913bc74ada3fd3d2913ee69a94f227bc5bb3f0efa719c1f3  literature/development-and-industrial-policy/simonis-1979-denison-boltho-review.md
a0120c89c03eb4029f2db59f7d7e16f3232972c6d20df2d33139f6a1341675bb  literature/growth-theory/denison-1972-classification-of-sources-of-growth.md
9f6b41f8dcd1a0d1dcec7b44f967b57c9708ac2b1398781931a589e6fd4fb432  literature/organization-and-production-systems/spear-1999-decoding-tps-dna.md
37a85b296fedca130295662f4e64587b3ad028369f3b63aa00a19ec14261c318  literature/organization-and-production-systems/deming-1967-japan-quality-control.md
71507fa1c499d7d034b76decf3273170a44b7c2c1dacc912690d02afb2c4c70f  literature/development-and-industrial-policy/esri-2016-japan-high-growth-economic-plans.md
```

## M-row verdicts

**ECR-01 A beason-1996-targeting-japan.md** — PARTIAL — block: present (`ECR-01 A`, line 413).
Claim: "Measures four targeting instruments: negative correlation with sectoral growth in every period (JDB loans -0.31 to -0.48, tax relief -0.55 to -0.77), no robust positive TFP effect at R-squared 0.068, positive correlation with capital accumulation at 0.183."
- "negative...in every period" and "no robust positive TFP effect at R-squared 0.068": SUPPORTED. Table 2 gives Growth-JDB = -0.31, -0.48, -0.07 and Growth-Tax relief = -0.55, -0.47, -0.77 across the three periods (all negative); Table 5 gives "R-squared = 0.068, adjusted R-squared = 0.007."
- "JDB loans -0.31 to -0.48" and "tax relief -0.55 to -0.77" as *ranges*: the cited pair in each case is (full-period, worst-subperiod); the third value in each series (-0.07 for JDB in 1974-90; -0.47 for tax relief in 1955-73) falls outside the quoted "range," so as literally read ("ranges from X to Y") this is a narrower band than the data actually show.
- **"positive correlation with capital accumulation at 0.183" — this is a mischaracterization.** 0.183 is not a correlation coefficient anywhere in the file. It is the R-squared of the Table 7 fixed-effects panel regression of capital accumulation on all four policy instruments jointly (line: "R-squared | 0.137 | 0.183"), i.e. a multi-variable regression fit statistic, not a bivariate "positive correlation." The qualitative direction (some instruments — one-year JDB and level tariff protection — do show significant positive coefficients on capital accumulation in Table 7) is real, but the number quoted and the statistic it is called are not the same thing.

**ECR-01 A esteban-pretel-2009-postwar-japan-policy.md** — SUPPORTED — block: present (`ECR-01 A`, line 311).
Claim: "Measures subsidies and FILP in a calibrated counterfactual: removing them barely changes aggregate output, and growth is carried by sectoral TFP paths rather than by the modelled instruments."
Evidence: "Removing subsidies... produces... no material change to aggregate output" and "the mechanism should be understood as operating through TFP rather than through the specific channels modeled."

**ECR-01 B kiyota-2005-foreign-technology-acquisition.md** — SUPPORTED (verified in the ECR-14..18 pass; re-confirmed here).
Claim matches: capital-augmenting effect, no confirmed TFP effect, pre-deregulation screening favored larger/more-experienced not more-productive firms.

**ECR-01 B kiyota-2013-import-quota-removal.md** — SUPPORTED — block: present (`ECR-01 B`, line 373).
Claim: "Measures import quota removal: no contemporaneous productivity effect and a lagged labour-productivity gain of about 8 percent. States the lineage's own summary of itself, that Japanese industrial policy contributed to labour-productivity growth but not to TFP growth."
Evidence: "None of the six performance measures is significantly related to the contemporaneous quota-removal dummy" and "roughly an 8% average increase in industry labor productivity following quota removal... one-year lag" and "the authors state, the general finding has been that Japanese industrial policy contributed to labor-productivity growth but not to growth in total factor productivity (TFP)."

**ECR-01 C henderson-2008-myth-of-miti.md** — SUPPORTED — block: present (`ECR-01 C`, line 77).
Claim: "Reads the targeting record and reports no measured productivity gain from it. Makes no original measurement of any instrument."
Evidence: "Narrative synthesis of secondary sources. No original estimation" and the entry "reads Johnson's MITI and the Japanese Miracle as containing little evidence that MITI's interventions actually helped."

**ECR-01 C aoki-2009-government-tfp-growth.md** — PARTIAL — block: present (`ECR-01 C`, line 315).
Claim: "Explains the episode by the technology gap, absorptive capacity and improving congruence, and does not require targeting to do explanatory work. Makes no original measurement of any instrument."
- "technology gap": SUPPORTED — quote: "a technology gap with advanced countries that had been 'preserved' and 'further expanded' by wartime isolation."
- **"absorptive capacity" and "improving congruence": NOT-FOUND.** `grep -n -i "absorptive\|congruence\|technology gap"` against this file returns only the one "technology gap" hit; neither "absorptive" nor "congruence" appears anywhere in aoki-2009-government-tfp-growth.md. "Absorptive capacity" instead appears in the *neighboring* file, esteban-pretel-2009-postwar-japan-policy.md ("non-agricultural TFP gains are attributed to adoption, imitation, and assimilation of foreign technical know-how, with absorptive capacity linked to human capital accumulation"), which this M-row does not cite. This looks like cross-file conflation between the two Esteban-Pretel/Aoki companion papers.
- "does not require targeting to do explanatory work" / "makes no original measurement": SUPPORTED — "No new econometric estimation is performed."

**ECR-02 A hoshi-1991-corporate-structure-liquidity-investment.md** — SUPPORTED (per ECR-14 A verification above; same file, consistent claim).

**ECR-02 B miwa-2002-fable-of-the-keiretsu.md** — SUPPORTED — block: present (`ECR-02 B`, line 348).
Claim: "Re-tests that classification and finds the firm-size result an artifact of how the group roster was constructed; treats the keiretsu as a coherent entity as a construct of the roster."
Evidence: "the size effect is an artifact of how the ROK and lunch-club rosters are constructed, not a property of 'true' main-bank groupings."

**ECR-03 A christiano-1989-japan-saving-rate.md** — SUPPORTED — block: present (`ECR-03 A`, line 263).
Claim: "A subsistence-consumption model reproduces the hump-shaped saving rate as a response to war-destroyed capital; its own limitations section concedes the subsistence parameter was chosen to fit the target pattern."
Evidence: the c*=0.76 "slow convergence" model "reproduces the hump-shaped saving-rate pattern closely," and Limitations: "chosen specifically to match the observed Japanese saving pattern, so its good fit is not independent evidence for the reconstruction hypothesis."

**ECR-03 B otsu-2007-neoclassical-postwar-japan.md** — SUPPORTED — block: present (`ECR-03 B`, line 405).
Claim: "The subsistence fix fails once labour supply is endogenous; reproducing the postwar path additionally requires a TFP path."
Evidence: "their claim that Stone-Geary subsistence preferences alone can delay capital accumulation does not hold once labor supply is endogenous" and "Capital destruction plus TFP. Both preference specifications now reproduce the postwar paths."

**ECR-04 A dingman-1993-dagger-and-gift-korean-war.md** — SUPPORTED — block: present (`ECR-04 A`, line 334).
Claim: "Treats the procurement boom as accelerating and secondary, and reports the affirmative Johnson and Borden line as the reading it argues against."
Evidence: "a secondary, not a primary, event" and "'accelerated and rendered permanent' economic changes already forced on Japan by the Pacific War," against Borden's "the decisive event" framing, which Dingman is shown qualifying rather than adopting.

**ECR-04 A beckley-2018-americas-role-japan-miracle.md** — SUPPORTED (per ECR-14..18 pass, same file).
Claim: "A 1951 placebo test finds no divergence from synthetic Japan at the Korean War onset, MSPE rank 26 of 48; the break is 1958." Matches file text exactly.

**ECR-05 A kawagoe-1999-japan-land-reform.md** — SUPPORTED — block: present (`ECR-05 A`, line 280).
Claim: "No clear productivity effect; average farm size fell from 1.09 to 0.99 hectares; a peasantry-to-peasantry reform."
Evidence: "average operational farm size did not rise, and in fact declined slightly, from 1.09 hectares (1941) to 0.99 hectares (1955)" and classification as "Mp to Mp" (peasantry-to-peasantry).

**ECR-05 B nakamura-1989-postwar-japanese-economy.md** — CONTRADICTED (on the specific figures) — block: present (`ECR-05 B`, line 268).
Claim: "Reports the reform as a successful structural change: tenanted land from 46 percent in 1941 to 9 percent in 1955, owner-cultivators from 31 to 70 percent."
The nakamura file's own figures are different: "before reform, 45.9 percent of Japan's agricultural land was tenanted" and "tenanted land fell to only 10 percent of agricultural land" — 45.9%→10%, not 46%→9%. The file contains **no** owner-cultivator percentage at all (`grep -n "31 percent\|70 percent\|owner-cultivat"` returns zero hits in this file). The cited 46%→9% and 31%→70% figures instead belong, verbatim, to kawagoe-1999-japan-land-reform.md's Table 6-1/6-2 ("tenanted land share fell from 46% of cultivated area in 1941 to 13% in 1949 to 9% in 1955" / "Owner-cultivator farms rose from 31% of households in 1941 to 70% in 1955") — the ECR-05 A source, not this one. The qualitative reading ("successful structural change") is a fair characterization of nakamura's own 45.9%→10% figure, but the specific numbers in the M-row are misattributed from a sibling file.

**ECR-05 C wade-2018-developmental-state-dead-or-alive.md** — SUPPORTED (consistent with the wade file already read in full for ECR-14/18).
Claim: "Treats redistribution as a political-settlement precondition for the developmental state rather than as a productivity instrument." Matches: land reform listed among the "political settlement and 'luck'" conditions, not among quantified productivity findings.

**ECR-06 A aoki-2009-government-tfp-growth.md** — SUPPORTED — block: present (`ECR-06 A`, line 316).
Claim: "Reallocation contributes 0.66 of 4.78 aggregate TFP points, 1956 to 1973."
Evidence: Table 1, row "1956-73 | 4.78% | ... | Labor realloc. 0.66."

**ECR-06 B may-1977-how-japans-economy-grew-so-fast-review.md** — SUPPORTED — block: present (`ECR-06 B`, line 73).
Claim: "Relays Denison and Chung for 1953 to 1971: improved resource allocation 0.95 points of 8.77 percent, reported by May as an explicit named category in the book's own accounting and not as a residual. The 0.9-point figure that circulates in this project is 8.77 minus the four other named factors and is a subtraction, not a printed figure."
Evidence: "May reports this last figure — 'improved resource allocation,' 0.95 percentage points — as an explicit named category in the book's own accounting, not merely a residual." The "0.9-point... subtraction" half of the claim is corroborated by cross-reading henderson-2008 (which lists only four factors summing to 7.86 of 8.77 and calls the remainder "roughly 0.9 points" — an arithmetic leftover, not a printed line).

**ECR-06 C henderson-2008-myth-of-miti.md** — PARTIAL — block: present (`ECR-06 C`, line 78).
Claim: "Carries the caveat that human-capital-adjusted controls shrink the reallocation effect toward zero, because what moved was the education embodied in the migrants."
- "human-capital-adjusted controls... shrink toward zero": SUPPORTED — quote: "under human-capital-adjusted controls (Ye and Robertson; Cao et al., in a China context...), the reallocation effect can shrink toward zero."
- "because what moved was the education embodied in the migrants": NOT-FOUND. Henderson's file states the shrinkage as a bare empirical fact and does not give this (or any) causal mechanism for it.

**ECR-07 A jorgenson-2005-industry-origins-japan.md** — SUPPORTED — block: present (`ECR-07 A`, line 365).
Claim: "3.05 of 9.89 on a Domar-weighted industry aggregation; its own Table 14 yields 3.72 or 3.05 from the same data, and opposite signs for 1990 to 1995."
Evidence: Table 2, "1960-1973 | 9.89 | 5.16 | 1.69 | 3.05"; Table 14, "1960-1973 | 3.72 | 3.05" and "1990-1995 | 0.51 | -0.48" — 0.51 (positive) vs -0.48 (negative), opposite signs, exactly as claimed.

**ECR-07 B aoki-2009-government-tfp-growth.md** — SUPPORTED (same table cited under ECR-06 A above): "4.78 percent aggregate TFP, 1956 to 1973, with reallocation itemised separately at 0.66."

**ECR-07 C otsu-2007-neoclassical-postwar-japan.md** — SUPPORTED — block: present (`ECR-07 C`, line 406).
Claim: "About 5.6 percent in the 1960s, from a neoclassical model with endogenous labour supply."
Evidence: Table 1, "1960-69 | 7.7 | 9.0 | -1.6 | 5.6" (TFP column).

**ECR-07 D may-1977-how-japans-economy-grew-so-fast-review.md** — CONTRADICTED — block: present (`ECR-07 D`, line 74).
Claim: "Relays Denison and Chung for 1953 to 1971 at 8.77 percent, where advance of knowledge is 1.97 and scale and reallocation are itemised as separate factors, **so the knowledge term is not an aggregate residual**."
The 8.77%/1.97-points figures are correct, but the inference is directly contradicted by the same file, one paragraph later: "He is more critical of the 'advances in knowledge' category, **noting it is a residual** that absorbs unmeasured effects and measurement error and cannot capture quality improvements in final products." It is also contradicted by the primary methodological source on the shelf, denison-1972-classification-of-sources-of-growth.md: "Advances in knowledge are always in that residual, because no one has found a way to estimate them directly" — i.e. in Denison's own framework, "advances in knowledge" is by construction the catch-all residual regardless of whether scale and reallocation happen to be itemized separately elsewhere in the same table. The M-row's logical move (itemized-elsewhere implies not-a-residual-here) does not hold.

**ECR-07 D simonis-1979-denison-boltho-review.md** — SUPPORTED — block: present (`ECR-07 D`, line 88).
Claim: "Relays the same work for 1961 to 1971 at 9.56 percent; its own component list does not sum to its stated total. Both leaves are named so the invariant cannot be satisfied by the wrong review."
Evidence: "the standardized growth rate of national income over 1961–1971 of 9.56 percentage points per year" and "these seven listed components sum to 8.74 percentage points, roughly 0.8 points short of the stated 9.56 total."

**ECR-08 A may-1977-how-japans-economy-grew-so-fast-review.md** — SUPPORTED — block: present (`ECR-08 A`, line 75).
Claim: five components (2.10, 1.97, 1.94, 1.85, 0.95) "sum to 8.81 rather than 8.77, and the review reports them as read without reconciling the gap."
Arithmetic check: 2.10+1.97+1.94+1.85+0.95 = 8.81 (confirmed by hand); the file nowhere flags or reconciles this 0.04 gap against its own stated 8.77 total.

**ECR-08 A simonis-1979-denison-boltho-review.md** — SUPPORTED — block: present (`ECR-08 A`, line 89).
Claim: seven components sum to 8.74, "roughly 0.8 points short," "review states that it does not reconcile the gap."
Evidence: "these seven listed components sum to 8.74 percentage points, roughly 0.8 points short of the stated 9.56 total; the review does not reconcile this gap."

**ECR-08 A henderson-2008-myth-of-miti.md** — SUPPORTED — block: present (`ECR-08 A`, line 79).
Claim: "third hand" via a Concise Encyclopedia of Economics entry, "not as an original study."
Evidence: file's own Provenance line states "Provenance depth: via_tertiary," and the note "Retrieved this session as a secondary source; used here for the Denison and Chung decomposition figures it reports, not as an original study."

**Cross-check against denison-1972-classification-of-sources-of-growth.md (no M-row; correctly so).** The register's ECR-08 axis text asserts, verbatim, that May's +0.04 overshoot is licensed by Denison's own "statistical interaction terms" allowance (ground rule 3) while Simonis's -0.82 shortfall is not (an incomplete component list). This is confirmed directly by the primary source's own §Topic mapping: "Ground rule 3's parenthetical — 'or the product of indexes, depending on the treatment of statistical interaction terms' — is the only place... a complete component list is not required to add to the total," and the file's own closing section explicitly names both numbers: "May's five components sum to 8.81 against a stated 8.77, Simonis's seven sum to 8.74 against a stated 9.56... It adds no side to ECR-08 and no Japanese quantity." These are correctly treated in the register as two distinct defects, not merged into one finding, consistent with the coordinator's brief.

**ECR-09 A kiyota-2005-foreign-technology-acquisition.md** — SUPPORTED (per ECR-01 B verification above; same underlying facts, different framing).

**ECR-09 A kiyota-2013-import-quota-removal.md** — SUPPORTED (per ECR-01 B verification above).

**ECR-09 B aoki-2009-government-tfp-growth.md** — SUPPORTED — block: present (`ECR-09 B`, line 318).
Claim: "Relays Nakamura and Ohashi: basic oxygen furnace adoption raised steel-industry TFP against a counterfactual, 7 percent to 17 percent. One technology in one industry, reported at second hand."
Evidence: "Nakamura and Ohashi (2008), using 1957-1968 plant-level steel-industry data, find BOF adoption raised the industry's annual TFP growth rate from a counterfactual 7% to an actual 17%."

**ECR-10 A beason-1996-targeting-japan.md** — SUPPORTED — block: present (`ECR-10 A`, line 414).
Claim: "The original measurement of four targeting instruments against sectoral growth and TFP; names the Johnson narrative as the account it is testing."
Evidence: "the conventional targeting narrative (associated with Johnson, 1982)."

**ECR-10 A kiyota-2005-foreign-technology-acquisition.md** — SUPPORTED — block: present (`ECR-10 A`, line 263).
Claim: "Measures a different instrument on the same question and rests on the same prior literature."
Evidence: "subsidies and JDB loans (industry-level policy variables, following Beason & Weinstein, 1996)" appears directly in the kiyota-2005 methods section.

**ECR-10 A kiyota-2013-import-quota-removal.md** — SUPPORTED — block: present (`ECR-10 A`, line 375).
Claim: "Its own literature review positions the paper as extending the prior two, which is the dependence relation stated by the source itself."
Evidence: "The paper positions itself against a small existing literature... Beason and Weinstein (1996), and the authors' own earlier work, Kiyota and Okazaki (2005, 2010)... The authors identify specific limitations in each predecessor."

**ECR-11 A spear-1999-decoding-tps-dna.md** — SUPPORTED — block: present (`ECR-11 A`, line 280).
Claim: "The Toyota system's rules are unwritten and transfer succeeds only where receiving managers replicate the Socratic questioning."
Evidence: "the rules are described as never having been formally written down inside Toyota; they are transmitted through a Socratic, iterative process" and "successful transfer of TPS outside Toyota has so far occurred only when receiving managers engage in this same questioning process themselves."

**ECR-11 B deming-1967-japan-quality-control.md** — SUPPORTED — block: present (`ECR-11 B`, line 259).
Claim: "Statistical quality control transferred by lecture and course through JUSE from 1950, with named gains inside a year and little new machinery."
Evidence: "financial and moral support for statistical education channeled mainly through the Union of Japanese Scientists and Engineers (JUSE)" and results "reported as achieved after only about one year" "with little new machinery."

**ECR-12 A henderson-2008-myth-of-miti.md** — SUPPORTED (per ECR-01 C/ECR-06 C verification; same file).
Claim: "Actual growth exceeded the target of all six plans, and reads that record as showing the plans were not causal." Matches: "Six National Economic Plans ran between December 1955 and February 1973; in every case actual growth exceeded the plan targets, which the author reads as evidence the plans were not the cause."

**ECR-12 B esri-2016-japan-high-growth-economic-plans.md** — SUPPORTED (as an M-row) — block: present (`ECR-12 B`, line 346).
Claim: "Table 12-1 shows real growth underestimated in all six years 1955 to 1960, read as an announcement effect after Sato 1990: firms treated the official forecast as a floor."
Evidence: "Real growth was underestimated in every one of the six years shown... the note connects the growth-underestimation pattern to an 'announcement effect' argument it attributes to Sato (1990): private firms treated the government's official growth forecast as a floor rather than a ceiling."

**ECR-13 A esteban-pretel-2009-postwar-japan-policy.md** — SUPPORTED — block: present (`ECR-13 A`, line 311).
Claim: "Counterfactual removal of subsidies and FILP barely changes aggregate output; reports FILP at under ten percent of total industrial lending, citing Hayami and Godo."
Evidence: "Zeroing agricultural price subsidies and both sectors' capital-rental subsidies... produces... no material change to aggregate output or the capital-output ratio" and "cites Hayami and Godo (2005) for the claim that government-directed FILP credit amounted to less than ten percent of total loans to industry."

**ECR-13 B hoshi-1991-corporate-structure-liquidity-investment.md** — SUPPORTED (same file as ECR-02/14 A). Claim: "Main-bank ties materially relax investment financing constraints at the firm." Consistent with the eight-to-twelvefold liquidity-sensitivity gap.

**ECR-13 C wade-2018-developmental-state-dead-or-alive.md** — SUPPORTED (same file as ECR-05/14/18). Claim: "Holds directed credit central to the developmental-state model, and is affirmative on that model explaining the catch-up decades." Matches: "concluding in favor of the developmental-state account for that period" and directed credit listed among the model's instruments.

## Axis-statement verdicts (FAIR / OVERSTATED / UNDERSTATED)

- **ECR-01**: FAIR. The three-way split (no TFP effect anywhere / two labour-productivity findings / two non-measuring sources) matches the six member files.
- **ECR-02**: FAIR. Matches hoshi's roster (Nakatani/Keiretsu no Kenkyu) vs. miwa's roster critique (ROK/Dodwell disagreement) exactly.
- **ECR-03**: FAIR. Matches christiano (subsistence reproduces the hump) vs. otsu (fails once labour is endogenous, needs TFP too) precisely.
- **ECR-04**: FAIR.
- **ECR-05**: FAIR (three outcomes: productivity / distributional / political-settlement, matching kawagoe / nakamura / wade respectively).
- **ECR-06**: FAIR. Magnitudes cited (0.66, 0.95, "near zero" under human-capital controls) are all independently confirmed in the member files.
- **ECR-07**: UNDERSTATED. The axis's own condition column names three sources of divergence — "decomposition, period **and** itemisation" — but the axis_statement's prose collapses this to one: "because a residual is a function of how many inputs the decomposition measured." It silently drops that the four decompositions also cover different, only partly overlapping windows (1960-73 Jorgenson vs. 1956-73 Aoki vs. 1960s-decade Otsu vs. 1953-71/1961-71 May/Simonis) and different methodologies (Domar-weighted translog index numbers vs. classic Denison-style accounting vs. a calibrated neoclassical model) — either of which would produce different residuals even holding itemisation fixed.
- **ECR-08**: FAIR. Every specific number in this unusually detailed axis_statement (8.81 vs 8.77, 8.74 vs 9.56, the ground-rule-3 interaction-term allowance, the via_tertiary depth of Henderson) checks out against the four cited files, including the primary Denison 1972 methods paper.
- **ECR-09**: OVERSTATED. The axis_statement calls both A-side members ("firm-level and aggregate measurements of technology acquisition") a matched pair differing only by level of aggregation. But kiyota-2013 is not a measurement of *technology acquisition* at all — its own title and abstract are "Effects of Industrial Policy on Productivity: The Case of Import Quota Removal," a trade-policy (import-quota) instrument, not foreign-technology licensing. Only kiyota-2005 measures technology acquisition proper; kiyota-2013 is grouped in by analogy to its similar (labour-productivity-yes/TFP-no) result pattern, not by subject match. The axis's own match_keys list ("licensing,acquisition,foreign,bof,furnace,acquirers,absorptive,diffusion,lagged") likewise contains no quota/tariff/import term, reinforcing that kiyota-2013's actual subject sits outside the axis's own keyword net.
- **ECR-10**: FAIR.
- **ECR-11**: FAIR.
- **ECR-12**: OVERSTATED / conflated. The axis_statement treats "actual growth exceeded the target of every Japanese economic plan from 1955 to 1960" as "one fact" with "two readings," but the two M-row sources are not reporting the same fact. Henderson's claim concerns the six multi-year **National Economic Plans**, 1955-1973 ("Six National Economic Plans ran between December 1955 and February 1973; in every case actual growth exceeded the plan targets"). Esri's claim concerns a *different* government instrument — the annual **short-term economic outlook** — for a narrower and non-overlapping-in-scope window, Table 12-1's six fiscal years 1955-1960 ("Real growth was underestimated in every one of the six years shown"). These are two distinct forecasting exercises (multi-year Plans vs. annual Outlooks) that happen to share the "always beaten by actual growth" pattern; the axis_statement's stated date range, "1955 to 1960," matches only the esri side and not the 1955-1973 span Henderson's own six plans actually cover.
- **ECR-13**: Prose is FAIR (accurately distinguishes the aggregate-counterfactual / firm-level / institutional-account positions). **But the class label is a finding in its own right — see below.**

## Register-class-invariant finding: ECR-13 is labeled `two_sided` but carries three distinct side letters

ECR-13's M rows are `A` (esteban-pretel-2009), `B` (hoshi-1991), and `C` (wade-2018) — three distinct
side letters, differentiated explicitly by "level of aggregation" (aggregate counterfactual / firm-level
test / institutional account), per the axis's own condition column. Per the coordinator's own stated
rule, `two_sided` "returns both sides or refuses" (i.e. exactly two), while `false_pair` is the class
that "returns all members with a level-naming or condition-naming note" — and false_pair axes elsewhere
in this same register comfortably carry three or four side letters (ECR-05: A/B/C; ECR-06: A/B/C; ECR-07:
A/B/C/D). ECR-13's own condition-column text, "level of aggregation," is structurally identical in kind
to ECR-02's "group roster construction," ECR-05's "outcome measured," and ECR-09's "measurement level" —
all of which are false_pair axes. Every other `two_sided` axis in ECR-01..18 (ECR-02, ECR-03, ECR-11,
ECR-12, ECR-15, ECR-16) has exactly two distinct side letters. ECR-13 is the sole exception: it is
either mislabeled (should be `false_pair`, matching its own "level of aggregation" condition-naming
column and its three-letter member list) or its member list is wrong for a genuine two-sided dispute
(one of the three members does not belong). This is a class-invariant violation, not a wording quibble:
if `two_sided` truly means "exactly two sides, return both or refuse," a reader who trusts the class tag
alone would wrongly expect to find only two positions here.

## Tally

- M rows checked: 33 total across ECR-01..13 (including 4 rows shared with / re-confirmed against the
  ECR-14..18 pass: kiyota-2005 x2, hoshi-1991 x2, beckley-2018, wade-2018 x3).
  - SUPPORTED: 27
  - PARTIAL: 3 (ECR-01 A beason-1996; ECR-01 C aoki-2009; ECR-06 C henderson-2008)
  - CONTRADICTED: 2 (ECR-05 B nakamura-1989, on the specific percentages only; ECR-07 D may-1977, on the "not a residual" inference)
  - NOT-FOUND: 0 (as standalone rows — the NOT-FOUND findings above are sub-components of PARTIAL rows)
- Contested blocks: 33/33 present and correctly keyed to the axis/side named in each M row.
- Axis-statement verdicts: FAIR — ECR-01, 02, 03, 04, 05, 06, 08, 10, 11; OVERSTATED — ECR-09, ECR-12;
  UNDERSTATED — ECR-07; FAIR-prose-but-class-flagged — ECR-13.
- Register-class-invariant violations found: 1 (ECR-13, `two_sided` carrying three side letters;
  structurally resembles a mislabeled `false_pair`).
