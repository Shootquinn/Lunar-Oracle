# A.10 Step 2 Source Verification — ECR-14 through ECR-18

Orchestrator sub-pass. Read-only. Verifies every M-row of ECR-14..18 against the literature
summary file the row cites, plus three named-source transfer-gate checks against
`cr_scratch/step0_growth_economist_question_surface.md` §§2.1-2.3.

## Method

Commands run (from repo root):

```
awk -F'\t' '$2 ~ /^ECR-1[4-8]$/' oracle/REGISTER.econ.tsv
find literature -iname "<leaf.md>"        # once per leaf named in the M rows
grep -n "^### A.12\|0.183\|capital accumulation" <file>   # targeted checks, as needed
sha256sum <all files below>
```

Every cited file was opened and read in full via the Read tool (not just grepped) before its
verdict was recorded. Line numbers below refer to that full read.

## Read-digest of the file set walked

```
8d84a33a844ac0e2daf2382792a2095fdc520a8622f23e1146bd6666dd1037d2  oracle/REGISTER.econ.tsv
69f366721786c9733b41502b78e0cac1b565ce5ffe7853776ad4debcd616c736  cr_scratch/step0_growth_economist_question_surface.md
8457a9a341978ebf86c0d4f6133640fc624cd8d99fac511f7d2815d29caaa948  literature/development-and-industrial-policy/kiyota-2005-foreign-technology-acquisition.md
a550ead429cb7ac443ede03895c7b9a561a5af264a8ba9eb82030483dd76dd68  literature/development-and-industrial-policy/lewis-1954-unlimited-supplies-labour.md
82686e64fbace7e9b32b4b1ddf34a32ab1c7eba40e291dc42092063db0e66104  literature/development-and-industrial-policy/beckley-2018-americas-role-japan-miracle.md
6b55a22498d9af55ca507c5fd5bc8f385ba456c036913864e0805cd8a58a5ee2  literature/development-and-industrial-policy/hoshi-1991-corporate-structure-liquidity-investment.md
ca306dbfe516f12dde3b501f94b6c591327f0edbc0abf9f8ec1e98f5c5b2e010  literature/development-and-industrial-policy/wade-2018-developmental-state-dead-or-alive.md
b6fbc5c1260447ef0bf9521d1dfd8dd4bcca75aac6651d73fb3b1127fbeeeb5c  literature/development-and-industrial-policy/caballero-2008-zombie-lending-japan.md
28875468dcfc085bea4de3167d47108eaa0ff75228aa41c8f71a6790bfb42a7d  literature/growth-theory/pritchett-2000-hills-among-plateaus.md
c21baec0bc2a508c2f2725cd2ccd04a4c6e90d7ca66e30bebc5d8abc666a5646  literature/growth-theory/hausmann-2005-growth-accelerations.md
3dcd59fceac6afc8c52f6e52a620ad207c8625f6144a601eec840e6dd29f21c8  literature/organization-and-production-systems/flyvbjerg-2014-what-you-should-know-megaprojects.md
4bffc66d93e9f2fcea4147719a0a7f32268f9846fdc40c54bf4ee4d48f3b3eb9  literature/self-replication-and-automation/chirikjian-2002-self-replicating-robots-lunar.md
a88569ea67fa44006a333a879185beb40bd9c09413529cd92912972c5782662d  literature/self-replication-and-automation/freitas-1980-advanced-automation-space-missions.md
235d0d14f0e6b9aa03f32e08ae7177154ed19b01fe7f91e45e0504ea7ff88d0b  literature/self-replication-and-automation/lee-2008-robotic-self-replication-complexity.md
2f13f5177f0057bec5024dc3303a75e7423ad4920c58ffcb229eb63d847b8254  literature/organization-and-production-systems/acemoglu-2020-robots-and-jobs.md
```

(sha256sum output as printed by this environment's coreutils; hash strings are copied verbatim.)

## M-row verdicts

**ECR-14 A hoshi-1991-corporate-structure-liquidity-investment.md** — SUPPORTED — block: present (`## Contested` lists `ECR-14 A`, line ~325).
Claim: "Group and main-bank ties relax financing constraints during the high-growth decades."
Evidence (file lines ~139-144, ~228-232): "both liquidity coefficients are roughly eight to twelve times larger for independent firms than for group firms" and "close bank relationships — the keiretsu main-bank arrangement — mitigate these problems by concentrating debt and equity claims in an informed monitor, reducing free-rider and conflict-of-interest costs." Sample period is fiscal 1977-1982, which is after the classic 1955-73 high-growth window; treated as within the claim's "high-growth decades" only loosely.

**ECR-14 A wade-2018-developmental-state-dead-or-alive.md** — SUPPORTED — block: present (`ECR-14 A`, among lines 276-280).
Claim: "Treats relationship-based directed finance as a working component of the developmental-state model."
Evidence (lines ~83-86, ~101-102): "MOF objecting to the Bank's dismissal of directed credit — which MOF viewed as central to the postwar 'Japanese miracle'" and "Policy instruments included directed credit, fiscal incentives... and hard bargaining with inbound multinationals."

**ECR-14 B caballero-2008-zombie-lending-japan.md** — SUPPORTED — block: present (`ECR-14 B`, line 305).
Claim: "Forbearance and evergreening of loans to insolvent borrowers congested markets and depressed entry and restructuring in the 1990s."
Evidence (Abstract; lines ~28-34): "undercapitalized banks engaged in sham loan restructurings to keep credit flowing to insolvent borrowers ('zombies')... zombie survival congests markets, depressing profits, entry, and investment for healthy competitors."

**ECR-15 A pritchett-2000-hills-among-plateaus.md** — SUPPORTED — block: present (`ECR-15 A`, line 286).
Claim: "The cross-country growth record is not one process; steep hills exist among plateaus, so a country's own history is a weak guide to its next episode."
Evidence (lines ~136-158, ~170-177): the six-category taxonomy (steep hills, hills, plateaus, mountains, plains, accelerators) and "the cross-national rank correlation of countries' growth rates before and after their structural break is only 0.24."

**ECR-15 A hausmann-2005-growth-accelerations.md** — SUPPORTED — block: present (`ECR-15 A`, line 334).
Claim: "83 growth accelerations since the 1950s; the bar is 3.5 percent per year, and the episode is sustained about half the time."
Evidence (lines ~127-130, ~158-168, ~239-251): "83 growth accelerations worldwide" and "g(t,t+n) >= 3.5 percentage points a year" and "37 of 69 (53.6%) kept growing above 2%/year... 32 of 69 (46.4%) fell back below it."

**ECR-15 B flyvbjerg-2014-what-you-should-know-megaprojects.md** — SUPPORTED — block: present (`ECR-15 B`, line 307).
Claim: "Nine in ten megaprojects overrun, with cost overrun and demand shortfall occurring together, so the capital-programme distribution is the alternative reference class."
Evidence (line 82, lines 89-91): "'Nine out of ten such projects have cost overruns.'" and "For rail projects, an average cost overrun of 44.7 percent combines with an average demand shortfall of 51.4 percent."

**ECR-16 A lewis-1954-unlimited-supplies-labour.md** — SUPPORTED — block: present (`ECR-16 A`, line 357).
Claim: "An unlimited supply of one factor at constant price drives accumulation until a turning point; this is the surplus-factor argument the machine claim is an analogue of."
Evidence (lines ~154-163, ~247-273): "The key to the process is the use which is made of the capitalist surplus...", and the file's own "Explicit negation for the Moon (FA2 framing)" section, which explicitly frames the machine-capacity claim as an unresolved analogue, not something Lewis's text itself supports.

**ECR-16 A chirikjian-2002-self-replicating-robots-lunar.md** — SUPPORTED — block: present (`ECR-16 A`, line 226).
Claim: "A self-replicating robotic system on the Moon stated as an engineering programme."
Evidence (lines ~49-52): "The stated objective of the present paper is to move past that conceptual level: to propose a specific, buildable subsystem architecture, to build and test small physical prototypes of the mechanical replication step, and to analyze, mathematically, how such factories would spread."

**ECR-16 A freitas-1980-advanced-automation-space-missions.md** — SUPPORTED — block: present (`ECR-16 A`, line 413).
Claim: "The NASA self-replicating lunar factory study, the founding statement of machine capacity as a reproducible factor."
Evidence (Topic mapping, lines ~379-382): "The source addresses the canonical 1980 self-replicating lunar factory design."

**ECR-16 A lee-2008-robotic-self-replication-complexity.md** — SUPPORTED — block: present (`ECR-16 A`, line 257).
Claim: "States the complexity cost of robotic self-replication, which is the constraint on the same claim."
Evidence (lines ~158-166, ~213-220): D_s values of 1.56x10^-6 to 2.99x10^-2 (far below 1, i.e. far from full self-replication) and "delta_H_E is nonzero for all three... meaning none of the three prototypes is demonstrated with the environment doing zero uncertainty-reducing work."

**ECR-16 B acemoglu-2020-robots-and-jobs.md** — SUPPORTED — block: present (`ECR-16 B`, line 339).
Claim: "Measured: about 0.13 percent aggregate output per robot per thousand workers, with negative employment and wage effects."
Evidence (lines ~204-207): "a modest 0.13 percent increase in GDP for each additional robot per thousand workers" alongside "one more robot per thousand workers reduces the aggregate employment-to-population ratio by about 0.34 percentage points... and aggregate wages by about 0.5 percent."

**ECR-17 A hausmann-2005-growth-accelerations.md** — SUPPORTED — block: present (`ECR-17 A`, line 335).
Claim: "83 accelerations, sustained about half the time."
Same evidence as ECR-15 A above.

**ECR-17 A pritchett-2000-hills-among-plateaus.md** — SUPPORTED — block: present (`ECR-17 A`, line 287).
Claim: "Pre-break and post-break growth rank correlation of 0.24."
Evidence (line ~171): "the cross-national rank correlation of countries' growth rates before and after their structural break is only 0.24."

**ECR-18 A wade-2018-developmental-state-dead-or-alive.md** — SUPPORTED — block: present (`ECR-18 A`, line 280).
Claim: "Reports Lane 2017's input-output analysis of Korea's HCI drive... Wade records that comparable studies for Japan and Taiwan have not been conducted. Lane 2017 is not on disk; this is reported speech inside Wade."
Evidence (lines ~154-161, ~234-235): matches almost verbatim, plus "the author notes comparable studies for Japan and Taiwan have not been conducted" in Limitations.

## Axis-statement verdicts

- **ECR-14**: FAIR. Caballero's own mechanism is explicitly tied to loss-recognition avoidance under Basle capital standards ("writing off a non-performing loan would force banks toward that minimum, so banks instead extended continued credit"), which matches the axis's "under different conditions of loss recognition" precisely.
- **ECR-15**: FAIR. Pritchett/Hausmann supply the cross-country-episode class; Flyvbjerg supplies the capital-programme class with cost-overrun/demand-shortfall co-occurrence, exactly as stated.
- **ECR-16**: OVERSTATED. The statement says "four theoretical accounts hold that a self-replicating capital stock can [serve as the surplus factor]." But lewis-1954's own file states the substitution "is not something Lewis's own text supports or tests; it is a structural analogy proposed for the lunar case, flagged here as unresolved" — Lewis does not hold this. lee-2008 is framed by its own M-row side_claim as stating "the complexity cost... the constraint on the same claim" — a caution, not an affirmation. Only chirikjian and freitas straightforwardly present the claim as an engineering programme.
- **ECR-17**: OVERSTATED. "Usually does not" persist overstates Hausmann's own characterization: 37/69 (53.6%) accelerations were "sustained" above the (weaker, 2%/year) bar versus 32/69 (46.4%) that were not — a narrow majority sustained, which the source itself calls "close to a coin flip," not "usually does not."
- **ECR-18**: FAIR. Matches Wade's reported-speech content on Lane 2017 almost verbatim, including the note that comparable Japan/Taiwan studies were not conducted.

## Transfer-gate findings (step0 §§2.1-2.3 vs. the three named literature summaries)

All three files exist in `literature/`.

**(a) kiyota-2005, "illustration" via absent "human absorptive workforce"** — NOT SUPPORTED as phrased, by either document.
kiyota-2005-foreign-technology-acquisition.md never mentions the Moon or lunar workforce; its only related term is firm-level "absorptive capacity" used as a MITI screening criterion (line ~91: "exceeded the acquiring firm's absorptive capacity") and as an R&D-expenditure proxy limitation (line ~218) — neither is a lunar-transfer statement. step0 §2.2 (A1) does classify Kiyota as illustration-only, but gives a different reason: "There is no lunar leader and no shelf of proven lunar industrial process, so there is no gap in the technical sense and nothing to converge toward" (step0 line ~222) — a missing leader/technology shelf, not a missing "human absorptive workforce."

**(b) lewis-1954, "illustration" via no lunar analogue for surplus agricultural labour** — SUPPORTED, directly, in the primary literature file itself.
Quote (lewis-1954, lines ~247-254): "The dual-economy mechanism has no direct lunar analogue... A lunar industrial base has no agrarian hinterland and no population reservoir of this kind to draw on — there is no subsistence sector, no peasant labour supply, and no 'average product of the family farm' setting a wage floor."

**(c) beckley-2018, "unknown" with missing input = sponsor identity** — SUPPORTED only in the step0 synthesis; NOT-FOUND in the beckley-2018 literature summary itself.
beckley-2018-americas-role-japan-miracle.md contains no mention of the Moon, lunar analogues, or a sponsorship transfer-gate — it is a terrestrial US-Japan alliance study end to end. step0 §2.3 (U1, lines ~258-265) states: "the lunar analogue needs an external demand sponsor of comparable durability and scale, and the Oracle must name it and say whether it exists rather than assert the growth and hope... Whether such a sponsor exists for the Moon is not established by any source on disk."

## Tally

- M rows: 14/14 SUPPORTED, 0 PARTIAL, 0 CONTRADICTED, 0 NOT-FOUND.
- Contested blocks: 14/14 present and correctly keyed.
- Axis-statement verdicts: ECR-14 FAIR, ECR-15 FAIR, ECR-16 OVERSTATED, ECR-17 OVERSTATED, ECR-18 FAIR.
- Transfer-gate findings: (a) NOT SUPPORTED as phrased, (b) SUPPORTED in-file, (c) SUPPORTED only at the step0-synthesis level, NOT-FOUND in the cited primary summary.
