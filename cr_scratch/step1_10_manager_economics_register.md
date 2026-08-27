# Step 1.10, The Manager (economics prompt): the seventeen economics contested-claims register rows

**Persona:** The Manager, economics prompt
**Sub-step:** 1.10, Group 3, depends on 1.8 (ratified schema), 1.7 (naming), 1.12 (counting rule)
**Deliverable:** the rows in §3, liftable verbatim into `oracle/REGISTER.tsv`
**Reasoning:** §1 and §2. **Quantity blocks:** §4. **Handoffs:** §5.

**What I opened.** My own 0.2 Part 4 in full, which is the drafted content this sub-step binds to
paths. The ratified schema at `cr_scratch/step1_8_software_engineer_register_schema.md`, §1 and the
whole liftable block. The counting rule at lines 177 to 423 of
`cr_scratch/step1_12_designer_counting_rule.md`. `normalize()` and the naming rules at §1 of
`cr_scratch/step1_7_engineer_naming.md`. The tokenizer in `lsei/oracle/lib/literature_search.js`,
lines 42 to 65, because `match_keys` is defined against it and cannot be authored without it.
Filename listings of `_intake/japanese-miracle/lit/` and `lsei/literature/`, listings only. The
headers of `_intake/japanese-miracle/fa/FA1-mechanism-table.md` and `FA2-verdict-table.md`. Entry 14
of `FA1-source-list.md`, for the Johnson 1982 acquisition specification. Row B7 of the gameplan's
loose-ends register. The app's coefficient ledger in `lsei/index.html`, by grep over its coefficient
names and status strings, to settle whether any economics axis has an app side.

I opened **no corpus summary in full**. Everything I needed from the corpus this session was
measured over it by script rather than read: token presence, document frequency, leaf resolution.
That is deliberate. The one thing a register author must not do is re-derive positions from a
skim, because a gloss written from a skim is exactly the thing `M.position` must not be. The
positions below come from my 0.2 reading, when I had the files open for that purpose.

**Disclosure, stated once and not repeated.** `deming-1967-japan-quality-control.md` is a member of
ECR-11 and I am its author. I am also mechanism M3 in `FA1-mechanism-table.md`. ECR-11 is written
`two_sided` with Spear as side A and Deming as side B, in authoring order, which under the ratified
schema carries no ranking. I have not written a `lean`, because the field is cut, and I have not
ordered the sides to put mine second as a gesture; A before B is alphabetical by nothing and means
nothing. What I have done is state Spear's position in Spear's terms. Whether the corpus supports
the JUSE channel as a causal mechanism is a question about the corpus, and ECR-11 is written so
that a user asking about method transfer gets both answers and no adjudication from me.

---

## 1. Reasoning: what changed from my 0.2 draft, and why

The content of the seventeen rows is my 0.2 Part 4. Six things about their form changed, and none
of them was mine to decide.

### 1.1 Five encodings died between 0.2 and now, and one of them was mine

My 0.2 carried encoding request GE-2: that the register rows land as front-matter keys on the
summaries themselves. It is refused, and the refusal is measured rather than argued. The Software
Engineer's §1.1 shows that writing register content into member bodies causes fourteen files to
gain a full-text confirmation they did not have before, because the register writes the question's
own words into the files the question is scored against. My proposal was a fabrication vector. I
accept the ruling without reservation, and I record that the argument against it is one I could not
have made, because it required running the retrieval layer rather than reasoning about it.

Also dead: `lean`, which was my field and which I used on every row of the 0.2 draft. Its
load-bearing values are preserved elsewhere exactly as §1.8 of the schema says — `not_opposed` is
`class: false_pair`, and `dependent` is a `scope_token` naming the decomposition. The judgement
survives in `axis_statement` and `position`. Nothing was lost that a reader of the register needs.

`PREFER_AND_NAME` is refused, and it never appeared in my draft, but the operation it names did:
row R15 of my 0.2 carried the clause "and I lean B on the merits." That clause is adjudication
performed through presentation order, and it is out. ECR-15 states the two reference classes and
ranks neither. My view on which is right is not in the register; if this project wants it delivered
it is an FA deliverable cited at origin `findings`, which is where V3 now permits it to sit beside
the contest it adjudicates.

### 1.2 No economics axis has an app side, and this is a fact about the app rather than a virtue

Six lunar axes had to change because they were drafted with the app as side A. I checked whether
the same defect is in my rows, and it is not, for a reason worth stating rather than claiming
credit for: **the app models a lunar production system and computes no growth path.** Its
coefficient ledger holds `kExc`, `captureEff`, `fFis`, `fSol`, `eSinter`, `E1`, `duty`, `phiC0`,
`decayRate` and their neighbours. It holds no discount rate, no growth rate, no doubling time, no
labour term, and no productivity term. There is nothing in it for an economics axis to be set
against, so `app_surface` is `-` on all seventeen rows.

That is not a clean bill of health. It is the observation that the app's economics surface is
`payback`, `ranking`, `demand` and `Dstar`, all of which belong to the shared axis LCC-12, which I
do not author. **The one place where the app and the economics literature compete for a fact is the
one row that is not mine**, and it already carries its `app_surface` list.

### 1.3 The rows are authored against `_intake/japanese-miracle/lit`, and every leaf resolves there

The Software Engineer measured that of 36 distinct source references in my 0.2 rows, 18 were
abbreviated author-year handles that match no filename [Q-ECON-REFS-ABBREV]: `aoki-2009`,
`henderson-2008`, `wade-2018`, `kiyota-2013`, `may-1977`. He is right that they are clear to a
reader and are not addresses. Every member below is a full normalized leaf.

One good piece of news, measured rather than assumed: **all 30 [Q-ECR-LEAVES] distinct member
leaves resolve under one pre-merge root**, `_intake/japanese-miracle/lit/`. Not one economics
member is reachable only through `lsei/literature/`. Six of the thirty appear under both roots
(`caballero`, `deming`, `flyvbjerg`, `hausmann`, `henderson`, `lewis`, and the three
self-replication papers), which is a merge question and not a register question, because the member
key is the leaf and the two copies share it. So my `H` row names one `basis_root`, and it is not
the one the lunar rows will name.

All 30 leaves are already fixed points of `normalize()`: lowercase, hyphen-separated, no internal
dots, no uppercase extension. None is among the nine names the merge renames. So the `normalize()`
sweep over the `leaf` column that §6.4 of the schema provides for is a no-op on these rows, and I
have verified that rather than assuming it.

### 1.4 A defect in the ratified schema that the economics rows expose, with the minimal fix named

**The `H` row carries one `basis_root`, and this register is authored pre-merge against two.** The
lunar rows are authored against `lsei/literature`; mine are authored against
`_intake/japanese-miracle/lit`. There is one `oracle/REGISTER.tsv`, and §3.1 says the `H` row is
one row and the first row. Two authors, two roots, one header field.

This does not break anything at answer time, because the member key is the leaf and the path is
derived at load time from the index `listCorpusFiles()` already produces. `basis_root` is consumed
by exactly one thing: the error message on an L4 resolution failure. So the minimal fix is to let
that one field name more than one root, space-separated, since a space is a legal TSV field
character and the schema forbids only tabs and newlines. No new column, no second header row, no
change to any assertion except that L4's message prints both roots.

I am not amending the schema; I am reporting the collision and naming the cheapest repair. **My `H`
row below is written for the economics rows in isolation and must not be spliced into the merged
file unchanged.** Whoever integrates 1.9 and 1.10 owns one header row, and if they take mine
verbatim the lunar leaves get an error message pointing at the wrong tree. This is stated here
because it is precisely the kind of thing that survives a splice and fails a year later.

### 1.5 One row is shared, it is LCC-12, and I do not write it

The shared axis is **LCC-12, whether the propellant business case closes**. The Space Resources
Engineer declared it shared in his own 0.2 §5.4 with the note that it "overlaps The Growth
Economist's register and should not be duplicated at integration," and his SR-2 says it is written
once. Schema §3.2 settles the form: an axis shared between the two sides is written once, under the
prefix of the persona who authors it, and is never duplicated under the other. So there is no
`ECR` row for it, and the seventeen below are seventeen distinct axes with no overlap into the
lunar namespace.

What I owe that row is the economics half of its content, and it is already there in his draft: the
hurdle rate from `mckeown-2024-space-resource-hurdle-rate.md` as side D, which is the field that
decides what "closes" means. I add one requirement to it rather than a member. **LCC-12's
`scope_token` must name the discount rate as well as the price and volume**, because a business
case that closes at one hurdle rate and fails at another is not a case that closes; and his own
`verdict_basis` already turns on a price nobody has agreed to pay, which is the same observation
from the demand side. Where our two verdicts differ, both stand. That is A.9 and it is not resolved
here.

### 1.6 The tension with The Space Resources Engineer, and the rows that touch it

Loose end A.9 is unresolved and is not resolved by these rows. He holds that TRL binds first. I
hold that economic selection binds first and that closure and terrestrial maturity are negatively
coupled by selection rather than separated by an engineering gap. Two rows sit near it and neither
presupposes my side.

**ECR-16** is the row where it would be easiest to cheat. It asks whether reproducible machine
capacity can serve as the surplus factor a missing workforce would otherwise supply. Side A is the
theoretical case, four sources, Lewis plus the three self-replication papers. Side B is
`acemoglu-2020-robots-and-jobs.md`, the one measurement in either corpus of what industrial robots
actually did to output, employment and wages. Writing it as `one_sided` in either direction would
have been an adjudication. It is `two_sided`, the `scope_token` is *measured against theorised*, and
an answer must carry both.

**ECR-15** is the base-rate row and it is written the same way. Neither the country reference class
nor the capital-programme reference class is marked correct.

Neither row states that closure is a selection effect, and neither states that TRL binds first.
Both propositions are ours, not the literature's, and the register is not where a persona's
position enters.

---

## 2. Reasoning: the four things specific to this seat

### 2.1 `false_pair`, and the discriminating test applied row by row

Five rows are `false_pair`: ECR-05, ECR-06, ECR-07, ECR-09, ECR-14. The schema gives the test at
§1.8 and I applied it literally: *if a single question can be correctly answered from one side
alone, the sides are a false pair; if every single-side answer to the question the axis names is
wrong, they are two-sided.*

The two calls that were close, and the discriminator that separated them:

**ECR-09 is `false_pair` and ECR-13 is `two_sided`, and they look alike.** Both have sources
speaking at different levels of aggregation. The difference is that ECR-13 has two sources speaking
at the *same* level and giving opposite answers: Esteban-Pretel removes FILP and subsidies in an
aggregate counterfactual and output barely moves; Wade holds directed credit central to the model
that explains the catch-up decades, which is a claim at the same aggregate level. That is a
disagreement. ECR-09 has nothing of the kind: the firm-level and aggregate measurements find no
confirmed TFP channel, and the single plant-level case that finds a large one is a different object
measured at a different level, so naming the level dissolves the appearance of conflict rather than
resolving a conflict. `scope_token` carries the level on both rows; only ECR-09 carries the
`false_pair` banned-word list with it.

**The banned-word list is checked, not trusted.** The schema says the words `disagree`,
`contradict`, `dispute` and their inflections are failures in a `false_pair` answer,
`axis_statement` included. I ran that check over every field of every `false_pair` row and every
`position` beneath one. Zero hits. It is in the verification run in §3.2 so that a later edit
cannot reintroduce one silently.

**Where the dependence relation is stated.** Every row where two members are not independent says
so in `position`, which is the field the schema keeps for exactly this and which no answering
mechanism reads. ECR-10 is the whole axis for the Beason and Kiyota lineage. ECR-06's side B and
ECR-07's side D both record that the figure is relayed rather than reported. ECR-09's side B records
that the basic-oxygen-furnace result reaches this corpus through Aoki reporting Nakamura and Ohashi.
ECR-08 records that all three of its members are reports of one absent work.

### 2.2 The `one_sided` rows are the finding

Five rows are `one_sided`: ECR-01, ECR-04, ECR-08, ECR-10, ECR-17. Each states an absence as a fact
about this corpus and, where an acquisition target exists, names it.

**ECR-01 changed shape from my 0.2 draft, and this is the substantive editorial decision in this
deliverable.** R01 as drafted put Beason, Henderson and Kiyota on side A and Wade and ESRI on side
B, with the axis described as whether "industrial policy" means picking sectors or building
capability. Loose end B7's 0.5 correction says that is exactly the blur a retrieval layer will
introduce: **Wade is affirmative on the developmental state and is silent on sectoral targeting**,
so putting him opposite Beason makes him say something he does not say, and makes the targeting
axis look two-sided when it is not.

So ECR-01 is now strictly the targeting axis, and it is `one_sided`. Six members, all on side A,
all reporting no productivity effect from targeting instruments. The affirmative position — Johnson
1982 — **is in neither corpus, and survives here only as reported speech inside Beason's own
statement of what he is testing.** That is recorded in ECR-10's position for Beason and in the
acquisition requirement at §5.

Nothing of Wade or ESRI is lost, and I checked this rather than asserting it. Every affirmative
claim either of them makes about a specific instrument has a row: ESRI's announcement effect is
ECR-12's side B, Wade's directed credit is ECR-13's side C, his land reform as political settlement
is ECR-05's side C, and his relationship finance is ECR-14's side A. What has gone is the row that
made them the answer to a question they do not answer.

**ECR-17 is genuinely uncontested and is registered so that it is distinguishable from a claim
nobody registered.** That distinction was the point of my 0.2 class 3 and the schema preserves it:
a `one_sided` axis produces `LITERATURE` or `BOTH` with a fixed one-side disclosure, and cannot
produce `CONTESTED` at all, per amendment V2.

**All five `one_sided` rows depend on a disclosure that is not yet ratified.** The schema's §7 text
is written as a request to The Editor or the author, on the same footing as the `findings` limit
line. If it is refused, these rows still function: the axis is named, the documented side is
delivered, no second side is fabricated, and the reader loses the sentence explaining why only one
side appeared. Five of seventeen rows is the size of that loss, stated so that whoever rules on the
request knows what they are ruling on.

### 2.3 The residual rows, encoded as axes rather than as caveats

ECR-07 is the row this seat exists for. Four decompositions of one growth episode, four residuals,
four sides — Jorgenson at 3.05 of 9.89 on a Domar-weighted industry aggregation, Aoki at 4.78
aggregate, Otsu at about 5.6 for the 1960s, and Denison and Chung relayed at 8.77 with knowledge at
1.97 and scale and reallocation itemised separately. Under amendment V1 that is four personas on
any question that fires this axis, one per side, which is the honest price of the finding.

The residual is not a disagreement about Japan. It is a function of how many inputs the
decomposition measured, which is why the class is `false_pair` and why the `scope_token` is
*decomposition, period and itemisation*. A user asking "what was Japanese TFP growth" now cannot
receive one number: `scope_token` makes an answer that quotes any figure from this axis without
naming its decomposition and period a failure. That is the hard invariant of my 0.2 R07, expressed
in the ratified machinery rather than as an instruction in prose.

Jorgenson's own Table 14 is recorded in his `position` because it is the cleanest single piece of
evidence for the whole row: the same data, the same author, 3.72 or 3.05 depending on the
aggregation, and opposite signs in 1990 to 1995.

ECR-06 is the same shape at smaller scale, and carries the finding that the reallocation band runs
from near zero to about one percentage point and never to "large."

### 2.4 The two-book-reviews finding, and what resolution grade does not tell you

ECR-08 exists because a citation that resolves to a real file says nothing about whether that file
is the source of the claim. This corpus reaches Denison and Chung 1976 through
`may-1977-how-japans-economy-grew-so-fast-review.md` and
`simonis-1979-denison-boltho-review.md`, both of which are reviews, **and the two reviews cover
different periods**: 1953 to 1971 at 8.77 percent and 1961 to 1971 at 9.56 percent. Simonis's own
component list does not sum to his stated total. Henderson reports the same factor shares at third
hand.

Every trace to any of those three resolves cleanly and every one of them is a report of a work that
is not on disk. `scope_token` is *reviewed period*, so an answer quoting a Denison figure must name
which review and which period it came from, which is the mechanism that stops the two being mixed.

### 2.5 `match_keys` measured, not asserted

The Software Engineer measured that 31 [Q-REG-KEYS-DEAD] of 110 [Q-REG-KEYS-AS-WRITTEN] lunar keys as first written can never
fire, 28 mangled by the tokenizer and 3 tokenizing cleanly and occurring nowhere. I
did not want to hand him the same file back, so I built the two checks first and authored against
them.

**I tested 340 [Q-ECR-KEYS-TESTED] candidate keys across two passes and shipped 176
[Q-ECR-KEYS-SHIPPED]. Zero of the 176 fail K1 and zero fail K2** [Q-ECR-KEYS-DEAD]. Fifty-one
candidates failed K2 and none failed K1; a further 113 passed both checks and were dropped for
low discriminating mass or redundancy, which is an editorial choice and not a check result — I never wrote a key with
a space, a percent sign, a slash or an internal hyphen, because the tokenizer was open beside me.

Three things the measurement found that reading could not:

**A British spelling is a dead key in an American-spelled corpus.** `labour` occurs in no member of
ECR-03 and in no member of ECR-06, because those files write `labor`. It survives on ECR-16 only
because `lewis-1954-unlimited-supplies-labour.md` carries it in the leaf name. There is no rule
here, only the observation that spelling variance is invisible until it is tested, and that a
register author who writes in one dialect and reads a corpus written in another will produce keys
that never fire.

**The vocabulary of dependence does not exist in this corpus.** Nine of my fourteen first-pass
candidates for ECR-10 died on K2: `corroboration`, `corroborate`, `replicate`, `replication`,
`lineage`, `extends`, `consensus`, `confirm`, `confirms`. That is not a drafting error, it is a
property of the object. A corpus contains sources; it does not contain commentary on whether its
sources are independent of one another. So ECR-10 fires on what a *questioner* would say — the
author names — rather than on what the corpus says: `beason`, `kiyota`, `weinstein`. I record this
as a limit of the row in §2.7 rather than hiding it behind keys that pass a check and never fire.

**The stem is not the word.** `persist` is not `persistence`, `benchmarked` is not `benchmark`,
`relationships` is not `relationship`. The tokenizer does no stemming, and I caught one probe of my
own that scored zero on its own axis because of it (§2.6).

I have not tried to make the keys mutually exclusive. Nine axis pairs share two or more members and
several share keys, and that is correct: a question about the strength of the evidence that
Japanese industrial policy failed *should* fire both ECR-01 and ECR-10, because the lineage
disclosure is the thing that makes the first answer honest.

### 2.6 `probe_pos` and `probe_neg`, and the one that failed

Every axis carries both. They become 1.11's fixtures and 3.6's labelled set, so I measured them
rather than writing them and hoping.

For each axis I computed the IDF-weighted `match_keys` mass its own `probe_pos` and `probe_neg` put
on it, and the highest mass its `probe_pos` puts on any *other* axis. K is unset and belongs to 3.6;
what this measures is separation, which is the input K is chosen against. The full table is in §3.3.

**Every `probe_pos` scores above zero on its own axis and above every other axis. Every `probe_neg`
scores exactly zero on its own axis.** Seventeen of seventeen on both counts, and it took two
passes to get there.

**Six probes failed the first pass and one of them failed completely.** ECR-14's first `probe_pos`
was "Did Japan's main-bank relationships help or harm the economy?" and it scored **0.00** on
ECR-14, because the key is `relationship` and the question says `relationships`. A probe that
cannot fire the axis it is a positive fixture for would have been shipped as a fixture, failed in
1.11, and been debugged by somebody who did not write it. Five more scored on a single key and were
rewritten to hit the vocabulary the row is actually about. This is the third failure mode the
schema says no check can reach, caught by measurement of the probes rather than by judgement about
them, which is a cheaper instrument than it looks.

Every `probe_neg` names a real claim in a real member file that is not this axis's claim: the
excavation-depth question of the worked example, done seventeen times. ECR-11's is the coal saving
per ton of steel — a number in my own summary, on an axis about how method transfers, which is the
clearest case I have of a member carrying a claim the axis is not about.

### 2.7 What these rows do not do

**ECR-10 fires reliably only when the questioner names the authors.** Its keys are the strongest
they can be under K2, and the words a user would actually reach for — "independent", "corroborate",
"replicate" — are either absent from the corpus or too common to carry mass. A user who asks "how
strong is the evidence that industrial policy failed in Japan" fires ECR-01 and probably not
ECR-10, and gets six sources on one side with no statement that three of them are one lineage. The
partial defence is that ECR-01 and ECR-10 share three members, so the misclassification detector of
§8 sees an ECR-10 block on a returned file; whether it refuses depends on the overlap threshold 3.6
sets. **This is the weakest row in the set and I am not going to describe it as anything else.**
The durable fix is not a key: it is that ECR-01's own `position` fields state the lineage, which
they do.

**Nothing here verifies that a member supports the sentence beside it.** The positions are mine,
written from my 0.2 reading. They are auditable — that is what `M.position` is for — and they are
not verified. A sampling read closes that or it does not close.

**The class assignments are judgements and the reviewer needs the positions to check them.** The
five `false_pair` calls are the ones most worth re-reading, and ECR-09 against ECR-13 is the pair I
would check first, because they are the two that could most plausibly have gone the other way.

---

## 3. THE DELIVERABLE

Everything between the markers appends to `oracle/REGISTER.tsv` unedited, **except the `H` row**,
which is written for these rows in isolation and must be reconciled with the lunar rows' header at
integration per §1.4. Fields are tab-separated. No field contains a tab or a newline.

<!-- BEGIN oracle/REGISTER.tsv (ECR rows) -->
H	_intake/japanese-miracle/lit	2026-08-27	c42a217	17	52
A	ECR-01	one_sided	targeting,miti,industrial,policy,subsidies,jdb,sectoral,tariff,instruments,relief,favored	policy instrument	Every source in this corpus that measures Japanese sectoral targeting reports no productivity effect, and this corpus holds no source that measures targeting and reports one.	-	Did MITI's industrial targeting raise productivity in Japan?	How many foreign technology licensing contracts did Japanese firms sign in the late 1960s?
A	ECR-02	two_sided	keiretsu,bank,liquidity,roster,affiliation,affiliated,fable,shareholding,artifact,sample	group roster construction	Whether bank-centred corporate groups explain Japanese firm investment behaviour turns on how group membership was constructed, and the two sources build that roster differently.	-	Do keiretsu bank affiliation and liquidity explain Japanese firms' investment?	How did Japanese firms finance investment during the 1970s oil shocks?
A	ECR-03	two_sided	saving,savings,subsistence,consumption,reconstruction,destroyed,household,neoclassical,hump,wartime,endogenous,calibration	model closure	Whether Japan's postwar saving rate is explained by reconstruction of war-destroyed capital under subsistence-consumption preferences, or additionally requires a productivity path once labour supply is endogenous.	-	Was Japan's postwar savings rate driven by reconstruction of destroyed capital or by subsistence consumption?	What was Japan's investment-to-output ratio in the 1960s?
A	ECR-04	one_sided	korean,war,procurement,placebo,synthetic,boom,1950	procurement scope definition	Both sources in this corpus that examine Korean War procurement report it as secondary or find no break at its onset; the position that procurement started the growth episode appears here only inside the reporting of its critics.	-	Did the Korean War procurement boom start the Japanese miracle?	When did Japan's alliance with the United States become durable?
A	ECR-05	false_pair	land,reform,tenancy,tenanted,landlord,cultivators,scap,agrarian,peasantry,redistribution	outcome measured	Three sources treat the 1946 to 1950 land reform under three different measured outcomes: farm productivity, distributional change, and political settlement.	-	Did Japan's postwar land reform cause agricultural growth?	How large was Japan's agricultural employment share in 1950?
A	ECR-06	false_pair	reallocation,agriculture,agricultural,migration,denison,shift,schooling,human,adjusted,controls	decomposition, period and control set	Three accountings size the movement of labour out of agriculture over different periods and under different control sets, and the magnitudes run from near zero to about one percentage point.	-	How much did labour reallocation out of agriculture contribute to Japanese growth?	What did Aoki find about Japan's technology import ratio?
A	ECR-07	false_pair	tfp,residual,decomposition,accounting,productivity,factor,domar,aggregation,sources,knowledge,scale	decomposition, period and itemisation	Four decompositions of one growth episode report four different residuals, because a residual is a function of how many inputs the decomposition measured.	-	What was the TFP residual in the standard decomposition of Japanese growth?	Which Japanese industries grew fastest between 1960 and 1973?
A	ECR-08	one_sided	denison,chung,boltho,review,monograph,secondary,citing,1976,brookings	reviewed period	This corpus reaches the Denison and Chung decomposition only through reviews of it; no primary text of that work is on disk, and the two reviews cover different periods.	-	What did Denison and Chung find about Japanese growth?	How fast did Japanese national income grow between 1953 and 1971?
A	ECR-09	false_pair	technology,licensing,acquisition,foreign,bof,furnace,acquirers,absorptive,diffusion,lagged	measurement level	Firm-level and aggregate measurements of technology acquisition report no confirmed TFP effect, while a single plant-level technology case reports a large one; the two are measured at different levels.	-	Did foreign technology licensing and acquisition raise Japanese TFP?	When was Japan's capital account liberalised?
A	ECR-10	one_sided	beason,kiyota,weinstein,independent,robust,confirmed,earlier,prior,citing,studies	shared lineage	Beason and Weinstein 1996, Kiyota 2005 and Kiyota 2013 report the same negative finding about Japanese industrial policy, and Kiyota 2013 positions itself as extending the earlier work, so the three are one lineage rather than three independent confirmations.	-	Do Beason and Kiyota independently confirm that industrial targeting failed?	What happened to Japanese labour productivity after import quotas were removed?
A	ECR-11	two_sided	tacit,unwritten,socratic,juse,sqc,tps,toyota,quality,teaching,lectures,transfer,method	transfer channel	Whether a productivity method transfers as a codified procedure or only through tacit apprenticeship, which decides what a receiving agent must be able to do.	-	Does the Toyota Production System transfer as a written procedure or as tacit knowledge?	What coal saving per ton of steel did Japanese plants report after 1950?
A	ECR-12	two_sided	plan,plans,planning,forecast,doubling,income,announcement,expectations,exceeded,indicative,underestimated,sato	-	One fact, that actual growth exceeded the target of every Japanese economic plan from 1955 to 1960, carries two readings: that the plans were not causal, and that firms treated the official forecast as a floor.	-	Did Japan's income-doubling plan cause the growth it forecast?	What was Japan's actual GDP growth rate in 1958?
A	ECR-13	two_sided	filp,credit,directed,loans,lending,financing,counterfactual,banking,allocation	level of aggregation	Whether directed credit and FILP mattered to Japanese growth: an aggregate counterfactual removes them with little effect on output, a firm-level test finds they relaxed financing constraints, and an institutional account holds them central to the model.	-	Did FILP and directed credit drive Japanese industrial investment?	How did Japan's two-sector model treat labour mobility?
A	ECR-14	false_pair	zombie,forbearance,evergreening,congestion,insolvent,restructuring,stagnation,patient,relationship,unprofitable	period	Relationship banking is described as a financing advantage in the high-growth decades and as the channel that prolonged the 1990s stagnation, under different conditions of loss recognition.	-	Was Japan's patient relationship banking an advantage, or the source of its zombie lending?	How much of Japanese bank lending went to manufacturing in the 1980s?
A	ECR-15	two_sided	megaproject,megaprojects,overrun,overruns,forecasting,optimism,benchmark,escalation,shortfall,reference,distribution	unit of the reference class	Whether the base rate for a lunar growth projection should be drawn from the cross-country distribution of growth episodes or from the distribution of capital-programme outcomes.	-	Should a lunar programme be judged against megaproject overruns or against growth accelerations?	How many growth accelerations have there been since 1950?
A	ECR-16	two_sided	robots,robotic,automation,replication,replicating,substitute,substitution,surplus,wages,workforce,displacement	measured against theorised	Whether reproducible machine capacity can serve as the surplus factor a missing workforce would otherwise supply: four theoretical accounts hold that a self-replicating capital stock can, and one measurement of industrial robots reports a small output effect with negative employment and wage effects.	-	Can robots substitute for the workforce the Moon does not have?	What did Lewis mean by the turning point?
A	ECR-17	one_sided	persistence,persistent,sustained,acceleration,accelerations,decelerations,instability,volatility,plateaus,hills,transitions	-	Both sources in this corpus that measure whether a growth acceleration persists find that it usually does not, and this corpus holds no source that argues accelerations are persistent.	-	Is a growth acceleration usually sustained?	How many countries did Hausmann and Pritchett study?
M	ECR-01	A	beason-1996-targeting-japan.md	Four targeting instruments correlate negatively with sectoral growth in every period (JDB loans -0.31 to -0.48, tax relief -0.55 to -0.77); no robust positive TFP effect, R-squared 0.068; positive correlation with capital accumulation, 0.183.
M	ECR-01	A	henderson-2008-myth-of-miti.md	Reads the targeting record as folk history and reports no measured productivity gain from it.
M	ECR-01	A	kiyota-2005-foreign-technology-acquisition.md	Acquisition under the Foreign Capital Law raised capital and labour productivity; the TFP channel is not confirmed and the effect is capital-augmenting.
M	ECR-01	A	kiyota-2013-import-quota-removal.md	Import quota removal shows no contemporaneous productivity effect, and a lagged labour-productivity gain of about 8 percent.
M	ECR-01	A	esteban-pretel-2009-postwar-japan-policy.md	Counterfactual removal of subsidies and FILP barely changes aggregate output; growth is driven by sectoral TFP paths, not by the modelled policy instruments.
M	ECR-01	A	aoki-2009-government-tfp-growth.md	Explains the episode by the technology gap, absorptive capacity and improving congruence, and does not require targeting to do explanatory work.
M	ECR-02	A	hoshi-1991-corporate-structure-liquidity-investment.md	Firms with group and main-bank ties show investment less sensitive to liquidity, so the tie relaxes a financing constraint.
M	ECR-02	B	miwa-2002-fable-of-the-keiretsu.md	Re-tests that classification and finds the firm-size result an artifact of how the group roster was constructed; treats the keiretsu as a coherent entity as a construct of the roster.
M	ECR-03	A	christiano-1989-japan-saving-rate.md	A subsistence-consumption model reproduces the hump-shaped saving rate as a response to war-destroyed capital; its own limitations section concedes the subsistence parameter was chosen to fit the target pattern.
M	ECR-03	B	otsu-2007-neoclassical-postwar-japan.md	The subsistence fix fails once labour supply is endogenous; reproducing the postwar path additionally requires a TFP path.
M	ECR-04	A	dingman-1993-dagger-and-gift-korean-war.md	Treats the procurement boom as accelerating and secondary, and reports the affirmative Johnson and Borden line as the reading it argues against.
M	ECR-04	A	beckley-2018-americas-role-japan-miracle.md	A 1951 placebo test finds no divergence from synthetic Japan at the Korean War onset, MSPE rank 26 of 48; the break is 1958.
M	ECR-05	A	kawagoe-1999-japan-land-reform.md	No clear productivity effect; average farm size fell from 1.09 to 0.99 hectares; a peasantry-to-peasantry reform.
M	ECR-05	B	nakamura-1989-postwar-japanese-economy.md	Reports the reform as a successful structural change: tenanted land from 46 percent in 1941 to 9 percent in 1955, owner-cultivators from 31 to 70 percent.
M	ECR-05	C	wade-2018-developmental-state-dead-or-alive.md	Treats redistribution as a political-settlement precondition for the developmental state rather than as a productivity instrument.
M	ECR-06	A	aoki-2009-government-tfp-growth.md	Reallocation contributes 0.66 of 4.78 aggregate TFP points, 1956 to 1973.
M	ECR-06	B	may-1977-how-japans-economy-grew-so-fast-review.md	Relays Denison and Chung: about 0.9 points of 8.77 percent national-income growth, 1953 to 1971, obtained as a residual after four named factors.
M	ECR-06	C	henderson-2008-myth-of-miti.md	Carries the caveat that human-capital-adjusted controls shrink the reallocation effect toward zero, because what moved was the education embodied in the migrants.
M	ECR-07	A	jorgenson-2005-industry-origins-japan.md	3.05 of 9.89 on a Domar-weighted industry aggregation; its own Table 14 yields 3.72 or 3.05 from the same data, and opposite signs for 1990 to 1995.
M	ECR-07	B	aoki-2009-government-tfp-growth.md	4.78 percent aggregate TFP, 1956 to 1973, with reallocation itemised separately at 0.66.
M	ECR-07	C	otsu-2007-neoclassical-postwar-japan.md	About 5.6 percent in the 1960s, from a neoclassical model with endogenous labour supply.
M	ECR-07	D	may-1977-how-japans-economy-grew-so-fast-review.md	Relays Denison and Chung for 1953 to 1971 at 8.77 percent, where advance of knowledge is 1.97 and scale and reallocation are itemised as separate factors, so the knowledge term is not an aggregate residual.
M	ECR-07	D	simonis-1979-denison-boltho-review.md	Relays the same work for 1961 to 1971 at 9.56 percent; its own component list does not sum to its stated total. Both leaves are named so the invariant cannot be satisfied by the wrong review.
M	ECR-08	A	may-1977-how-japans-economy-grew-so-fast-review.md	Reviews the Denison and Chung accounting for 1953 to 1971 at 8.77 percent.
M	ECR-08	A	simonis-1979-denison-boltho-review.md	Reviews a Denison and Chung accounting for 1961 to 1971 at 9.56 percent, reviewed jointly with Boltho.
M	ECR-08	A	henderson-2008-myth-of-miti.md	Reports the Denison and Chung factor shares at second hand.
M	ECR-09	A	kiyota-2005-foreign-technology-acquisition.md	Acquirers had 33.1 percent higher TFP and 33.9 percent higher labour productivity by 1970; the effect is capital-augmenting and the TFP channel is not confirmed. Firm level.
M	ECR-09	A	kiyota-2013-import-quota-removal.md	No contemporaneous effect; about 8 percent lagged labour productivity. Aggregate policy level.
M	ECR-09	B	aoki-2009-government-tfp-growth.md	Relays Nakamura and Ohashi: basic oxygen furnace adoption raised steel-industry TFP against a counterfactual, 7 percent to 17 percent. One technology in one industry, reported at second hand.
M	ECR-10	A	beason-1996-targeting-japan.md	The original measurement of four targeting instruments against sectoral growth and TFP; names the Johnson narrative as the account it is testing.
M	ECR-10	A	kiyota-2005-foreign-technology-acquisition.md	Measures a different instrument on the same question and rests on the same prior literature.
M	ECR-10	A	kiyota-2013-import-quota-removal.md	Its own literature review positions the paper as extending the prior two, which is the dependence relation stated by the source itself.
M	ECR-11	A	spear-1999-decoding-tps-dna.md	The Toyota system's rules are unwritten and transfer succeeds only where receiving managers replicate the Socratic questioning.
M	ECR-11	B	deming-1967-japan-quality-control.md	Statistical quality control transferred by lecture and course through JUSE from 1950, with named gains inside a year and little new machinery.
M	ECR-12	A	henderson-2008-myth-of-miti.md	Actual growth exceeded the target of all six plans, and reads that record as showing the plans were not causal.
M	ECR-12	B	esri-2016-japan-high-growth-economic-plans.md	Table 12-1 shows real growth underestimated in all six years 1955 to 1960, read as an announcement effect after Sato 1990: firms treated the official forecast as a floor.
M	ECR-13	A	esteban-pretel-2009-postwar-japan-policy.md	Counterfactual removal of subsidies and FILP barely changes aggregate output; reports FILP at under ten percent of total industrial lending, citing Hayami and Godo.
M	ECR-13	B	hoshi-1991-corporate-structure-liquidity-investment.md	Main-bank ties materially relax investment financing constraints at the firm.
M	ECR-13	C	wade-2018-developmental-state-dead-or-alive.md	Holds directed credit central to the developmental-state model, and is affirmative on that model explaining the catch-up decades.
M	ECR-14	A	hoshi-1991-corporate-structure-liquidity-investment.md	Group and main-bank ties relax financing constraints during the high-growth decades.
M	ECR-14	A	wade-2018-developmental-state-dead-or-alive.md	Treats relationship-based directed finance as a working component of the developmental-state model.
M	ECR-14	B	caballero-2008-zombie-lending-japan.md	Forbearance and evergreening of loans to insolvent borrowers congested markets and depressed entry and restructuring in the 1990s.
M	ECR-15	A	pritchett-2000-hills-among-plateaus.md	The cross-country growth record is not one process; steep hills exist among plateaus, so a country's own history is a weak guide to its next episode.
M	ECR-15	A	hausmann-2005-growth-accelerations.md	83 growth accelerations since the 1950s; the bar is 3.5 percent per year, and the episode is sustained about half the time.
M	ECR-15	B	flyvbjerg-2014-what-you-should-know-megaprojects.md	Nine in ten megaprojects overrun, with cost overrun and demand shortfall occurring together, so the capital-programme distribution is the alternative reference class.
M	ECR-16	A	lewis-1954-unlimited-supplies-labour.md	An unlimited supply of one factor at constant price drives accumulation until a turning point; this is the surplus-factor argument the machine claim is an analogue of.
M	ECR-16	A	chirikjian-2002-self-replicating-robots-lunar.md	A self-replicating robotic system on the Moon stated as an engineering programme.
M	ECR-16	A	freitas-1980-advanced-automation-space-missions.md	The NASA self-replicating lunar factory study, the founding statement of machine capacity as a reproducible factor.
M	ECR-16	A	lee-2008-robotic-self-replication-complexity.md	States the complexity cost of robotic self-replication, which is the constraint on the same claim.
M	ECR-16	B	acemoglu-2020-robots-and-jobs.md	Measured: about 0.13 percent aggregate output per robot per thousand workers, with negative employment and wage effects.
M	ECR-17	A	hausmann-2005-growth-accelerations.md	83 accelerations, sustained about half the time.
M	ECR-17	A	pritchett-2000-hills-among-plateaus.md	Pre-break and post-break growth rank correlation of 0.24.
<!-- END oracle/REGISTER.tsv (ECR rows) -->

### 3.1 Extraction check

The rows above are extracted by line range and verified by re-running the schema's assertions over
the extracted text, not over the authoring source:

```
sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv/,/^<!-- END oracle\/REGISTER.tsv/p' \
  cr_scratch/step1_10_manager_economics_register.md | sed '1d;$d' > /tmp/ECR.tsv
```

### 3.2 The assertion run

L2, L3, L4, L5, B1, B2, B3 (K1 and K2), B5, B6 and B7 of the ratified schema, run over the
extracted rows against `_intake/japanese-miracle/lit`:

```
axes 17  members 52  distinct leaves 30
match_keys total 176  K1 failures 0  K2 failures 0
classes {"one_sided":5,"two_sided":7,"false_pair":5}
sides per axis: ECR-01=1 ECR-02=2 ECR-03=2 ECR-04=1 ECR-05=3 ECR-06=3 ECR-07=4 ECR-08=1
                ECR-09=2 ECR-10=1 ECR-11=2 ECR-12=2 ECR-13=3 ECR-14=2 ECR-15=2 ECR-16=2 ECR-17=1
false_pair banned-word scan (disagree/contradict/dispute and inflections): 0 hits
--- B7 SHARED-MEMBER REPORT (reports; does not fail) ---
  ECR-01 & ECR-06 share 2: aoki-2009-government-tfp-growth.md, henderson-2008-myth-of-miti.md
  ECR-01 & ECR-09 share 3: kiyota-2005-..., kiyota-2013-..., aoki-2009-...
  ECR-01 & ECR-10 share 3: beason-1996-..., kiyota-2005-..., kiyota-2013-...
  ECR-06 & ECR-07 share 2: aoki-2009-..., may-1977-...
  ECR-06 & ECR-08 share 2: may-1977-..., henderson-2008-...
  ECR-07 & ECR-08 share 2: may-1977-..., simonis-1979-...
  ECR-09 & ECR-10 share 2: kiyota-2005-..., kiyota-2013-...
  ECR-13 & ECR-14 share 2: hoshi-1991-..., wade-2018-...
  ECR-15 & ECR-17 share 2: hausmann-2005-..., pritchett-2000-...
--- ASSERTIONS ---
  ALL PASS
```

**The B7 report is nine pairs and none of them is an accidental duplicate axis.** B7 exists because
only a person can tell, so here is the person telling, pair by pair. ECR-01/ECR-10 is the targeting
finding against the independence of the sources that produce it. ECR-01/ECR-09 is the policy
question against the measurement level. ECR-06/ECR-07 and ECR-06/ECR-08 and ECR-07/ECR-08 are the
reallocation magnitude, the residual, and the provenance of the accounting all three run through the
same two decomposition sources, which is the finding rather than a defect. ECR-09/ECR-10 shares the
two Kiyota papers because the lineage row is about them. ECR-13/ECR-14 is the same institution
asked about at two different times, which is the point of ECR-14. ECR-15/ECR-17 shares both of its
non-megaproject members because Hausmann and Pritchett answer two different questions about the
same 83 episodes: which reference class, and whether an episode persists. Nine pairs, nine reasons,
zero merges.

**B6 is clean.** No member leaf of these seventeen rows belongs to a near-duplicate filename cluster
with an unregistered sibling. The six adjudicated duplicate pairs of `cr_scratch/step0_dedup_decisions.md`
are all lunar files and none is a member here. The one cluster inside the rows, `may-1977` and
`simonis-1979` on ECR-07 side D and ECR-08, is registered in full on both axes deliberately, so the
invariant cannot be satisfied by whichever review tokenizes better.

### 3.3 Probe separation, handed to 3.6

IDF over `_intake/japanese-miracle/lit`, 119 files. `pos` is the IDF-weighted `match_keys` mass the
axis's own `probe_pos` puts on it; `neg` the same for `probe_neg`; `other` the highest mass the
`probe_pos` puts on any other axis. K is unset and is 3.6's to set.

```
axis     pos    keys hit by probe_pos              neg    highest other axis
ECR-01   5.68   targeting,miti,industrial          0.00   1.28 ECR-07
ECR-02  10.09   keiretsu,bank,liquidity,affiliation 0.00   0.00 -
ECR-03  12.94   savings,subsistence,consumption,reconstruction,destroyed  0.00  0.00 -
ECR-04  10.15   korean,war,procurement,boom        0.00   0.00 -
ECR-05   4.57   land,reform                        0.00   2.07 ECR-06
ECR-06   4.59   reallocation,agriculture           0.00   0.00 -
ECR-07   6.77   tfp,residual,decomposition         0.00   0.00 -
ECR-08   5.82   denison,chung                      0.00   2.83 ECR-06
ECR-09   6.73   technology,licensing,acquisition,foreign  0.00  2.38 ECR-07
ECR-10   6.38   beason,kiyota                      0.00   3.20 ECR-01
ECR-11   9.69   tacit,toyota,transfer              0.00   1.64 ECR-07
ECR-12   6.92   plan,forecast,doubling,income      0.00   0.00 -
ECR-13   7.46   filp,credit,directed               0.00   0.91 ECR-01
ECR-14   9.82   zombie,patient,relationship        0.00   6.38 ECR-13
ECR-15   8.87   megaproject,overruns               0.00   3.68 ECR-17
ECR-16   7.88   robots,substitute,workforce        0.00   0.00 -
ECR-17   4.12   sustained,acceleration             0.00   0.00 -
```

Two rows for 3.6's attention. **ECR-14's margin over ECR-13 is 9.82 against 6.38**, the narrowest
in the set, because a question about relationship banking legitimately touches directed credit;
both firing is the right outcome and only the ordering of the two matters. And **ECR-05 and ECR-08
both put more mass on ECR-06 than any other cross-pair**, which is the reallocation vocabulary
being genuinely shared. None of these is a defect to fix by editing keys; they are the shape of the
data K is chosen against.

---

## 4. Quantity blocks

Born here per the counting rule §2. Numerals stated once in this file and nowhere else are governed
by nothing today and become governed under Tier 2 the moment a second file states them; the blocks
below are for the values I expect other files to quote.

```quantity
id:            Q-ECR-AXES
class:         fixed
value:         17
unit:          A rows in the economics namespace of the contested-claims register
population:    the rows between the BEGIN and END markers of section 3 of
               cr_scratch/step1_10_manager_economics_register.md whose first tab-separated field
               is the literal "A"
operation:     script: tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. The script lifts the rows from the BEGIN/END
               block of the deliverable and also accepts oracle/REGISTER.tsv once that file exists.
               The count is of A rows in the
               economics namespace only; the shared axis LCC-12 is authored under the lunar prefix
               at 1.9 and is not counted here, per schema section 3.2.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     the economics side of the contested-claims register carries 17 axes.
derived-from:  none
sampled:       n/a -- this operation counts rows by their type field, it does not classify
superseded:    none
```

```quantity
id:            Q-ECR-MEMBER-ROWS
class:         fixed
value:         52
unit:          M rows across the 17 [Q-ECR-AXES] economics axes
population:    the rows between the BEGIN and END markers of section 3 whose first tab-separated
               field is the literal "M"
operation:     script: tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. A source appearing on three axes
               produces three M rows and is counted three times; the distinct-source count is
               Q-ECR-LEAVES.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     the 17 economics axes carry 52 member rows in total.
derived-from:  Q-ECR-AXES
sampled:       n/a -- counts rows by type field
superseded:    none
```

```quantity
id:            Q-ECR-LEAVES
class:         fixed
value:         30
unit:          distinct normalized leaf filenames named by the 52 [Q-ECR-MEMBER-ROWS] member rows
population:    the leaf column of the 52 M rows, deduplicated
operation:     script: tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Leaves are compared as written;
               all 30 are already fixed points of normalize() per NAMING.md section 1, verified in
               the same run, so no normalization is applied before deduplication.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     the economics register axes name 30 distinct source files.
derived-from:  Q-ECR-MEMBER-ROWS
sampled:       n/a -- deduplicates and counts
superseded:    none
```

```quantity
id:            Q-ECR-ROOT-COVERAGE
class:         fixed
value:         30
unit:          of the 30 [Q-ECR-LEAVES] distinct member leaves that resolve under one pre-merge
               corpus root
population:    the 30 [Q-ECR-LEAVES] distinct member leaves
operation:     script: tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. The root tested is
               _intake/japanese-miracle/lit, walked recursively; resolution is exact leaf-name
               match against the index listCorpusFiles() builds. Six of the thirty also appear
               under lsei/literature under the same leaf name, which does not affect this count
               because the member key is the leaf.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     all 30 distinct member leaves of the economics register axes resolve under
               _intake/japanese-miracle/lit, so the economics rows are authored against one
               pre-merge root and the lunar rows against another.
derived-from:  Q-ECR-LEAVES
sampled:       n/a -- this operation tests membership in a filename index, it does not classify
superseded:    none
```

```quantity
id:            Q-ECR-KEYS-TESTED
class:         fixed
value:         340
unit:          candidate match_key strings tested against K1 and K2 during authoring
population:    the union of the two candidate key lists submitted to the checker across two
               authoring passes: 234 in the first pass and 106 in the second, with no key appearing
               in both lists
operation:     script: tools/ecr_keycheck.js _intake/japanese-miracle/lit tools/ecr_key_candidates.json
conditions:    cwd: repository root, 55 characters. Node 26.4.0. K1 is tokenize(k) deep-equals [k]
               using the tokenizer of lsei/oracle/lib/literature_search.js lines 62 to 65; K2 is
               that k occurs as a whole token in the leaf name or body of at least one member of
               that axis. Candidates were tested per axis against that axis's own members.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     340 candidate match_key strings were tested against K1 and K2 before the economics
               register rows were written.
derived-from:  none
sampled:       n/a -- this operation applies two stated predicates and counts, it assigns no
               category of its own
superseded:    none
```

```quantity
id:            Q-ECR-KEYS-SHIPPED
class:         fixed
value:         176
unit:          match_key strings on the 17 [Q-ECR-AXES] economics A rows
population:    the comma-separated match_keys fields of the 17 A rows, split on commas, counted
               with multiplicity across axes -- a key appearing on two axes is counted twice
operation:     script: tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Counted with multiplicity because
               K1 and K2 are per-axis predicates: the same string can pass on one axis and fail on
               another, so the distinct-string count would not be the population the checks run on.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     the 17 economics axes carry 176 match_key strings counted with multiplicity across
               axes.
derived-from:  Q-ECR-AXES
sampled:       n/a -- splits a field and counts
superseded:    none
```

```quantity
id:            Q-ECR-KEYS-DEAD
class:         fixed
value:         0
unit:          shipped match_key strings that can never fire, of the 176 [Q-ECR-KEYS-SHIPPED]
population:    the 176 [Q-ECR-KEYS-SHIPPED] shipped keys
operation:     script: tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Same K1 and K2 definitions as
               Q-ECR-KEYS-TESTED. Measured against _intake/japanese-miracle/lit pre-merge; the
               merge changes no leaf name among these 30 members and no file body, so the result
               is expected to survive it, and 2.16 re-runs the check rather than assuming so.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     zero of the 176 match_key strings shipped on the economics register axes fail K1 or
               K2. Of the 340 candidates, 51 failed K2 and none failed K1; the remaining 113 live
               candidates were dropped during authoring for low discriminating mass or redundancy
               with a key already on the row, which is an editorial choice and not a check result.
derived-from:  Q-ECR-KEYS-SHIPPED, Q-ECR-KEYS-TESTED
sampled:       n/a -- applies two stated predicates and counts
superseded:    none
```

```quantity
id:            Q-ECR-SIDES-GT2
class:         fixed
value:         4
unit:          economics axes of class two_sided or false_pair carrying more than two distinct
               M.side values
population:    the 12 economics axes of class two_sided or false_pair, of the 17 [Q-ECR-AXES]
operation:     script: tools/ecr_verify.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Sides are counted as distinct
               M.side letters per axis, not as member rows; ECR-07 side D carries two members and
               counts as one side.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     4 of the 12 economics axes that can produce a CONTESTED verdict carry more than two
               sides (ECR-05, ECR-06 and ECR-13 at three; ECR-07 at four), so amendment V1's
               one-persona-per-side rule buys at most four personas on any economics question, and
               29 across all twelve.
derived-from:  Q-ECR-AXES
sampled:       n/a -- counts distinct field values per axis
superseded:    none
```

```quantity
id:            Q-ECR-PROBE-SEPARATION
class:         fixed
value:         17
unit:          of the 17 [Q-ECR-AXES] economics axes whose probe_pos scores above zero on their own
               axis and above every other axis, and whose probe_neg scores exactly zero on their own
               axis
population:    the 17 [Q-ECR-AXES] economics A rows, each with its probe_pos and probe_neg
operation:     script: tools/ecr_probes.js cr_scratch/step1_10_manager_economics_register.md _intake/japanese-miracle/lit
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Score is the IDF-weighted sum of
               an axis's match_keys present in the tokenized probe question; IDF is log(N/df) over
               the 119 .md files of _intake/japanese-miracle/lit, document frequency taken over leaf
               name and body together. No firing threshold K is applied: K is unset and belongs to
               sub-step 3.6, so this measures separation and not classification.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b; this repository c42a217
predicate:     all 17 economics axes separate their own probe_pos from their own probe_neg, with
               every probe_pos scoring above every other axis and every probe_neg scoring exactly
               zero; six probes were rewritten to reach this, one of which scored zero on its own
               axis as first written.
derived-from:  Q-ECR-AXES
sampled:       n/a -- this operation computes a stated weighted sum and compares it, it applies no
               classification rule
superseded:    none
```

---

## 5. Findings and requirements placed elsewhere

**A1. Acquisition target: Johnson 1982, and it is a fetch against a written specification.** Loose
end B7 names me as its owner at this sub-step. The specification already exists at
`_intake/japanese-miracle/fa/FA1-source-list.md` entry 14: slug
`johnson-1982-miti-japanese-miracle`, full citation, "No DOI", "PDF route: library or Internet
Archive", "Sub-Q: 4. Also feeds FA4. Read against Beason and Weinstein." Nothing about it is a
research task. **When it lands, ECR-01 changes class from `one_sided` to `two_sided`, Johnson
becomes side B, and the six current members stay on side A.** That is the whole edit, and recording
it now is what makes it a one-line change rather than a re-reading. Until then ECR-01 states the
absence, which is the honest description of a corpus that can answer "did industrial policy work"
only in the negative and will sound well-sourced doing it.

**A2. To The Editor or the author: the one-side disclosure of schema §7 is load-bearing for five of
my seventeen rows.** ECR-01, ECR-04, ECR-08, ECR-10 and ECR-17 are `one_sided`. The schema's §7
text is a request against the prohibition's closed list of fixed lines and is not a persona's to
ratify. If it is refused, all five still function and the reader loses the sentence saying why one
side appeared.

**A3. To whoever integrates 1.9 and 1.10 into one `oracle/REGISTER.tsv`: the `H` row collides.**
§1.4 above. One `basis_root` field, two pre-merge roots, and the cheapest repair is to let that one
field name both space-separated. Do not splice my `H` row in unchanged. Sub-step 2.16 rewrites it
anyway once the merge lands and there is one root, so the collision has a natural end date; what it
must not do is silently survive until then.

**A4. To The Space Resources Engineer, on LCC-12, which is his row.** `scope_token` should name the
discount rate alongside price and volume. A case that closes at one hurdle rate and fails at
another has not closed, and `mckeown-2024-space-resource-hurdle-rate.md` is already his side D. Our
verdicts on that axis differ and both stand.

**A5. To sub-step 3.6: two numbers, and here is data for both.** §3.3 is the labelled fixture set
for K on the economics side, and the seventeen `probe_neg` questions are the false-refusal set for
the detector's overlap threshold. The narrowest positive margin is ECR-14 over ECR-13.

**A6. To sub-step 1.11: seventeen positive and seventeen negative fixtures**, in the `probe_pos` and
`probe_neg` columns of the rows in §3, with the measured separation in §3.3. If the suite asserts
answer-contract version 1, it will fail against version 2, and per the schema's §1.9 that is the
correct failure.

**A7. A finding, offered and not encoded.** The dependence vocabulary of this literature does not
appear in this literature. Nine of fourteen candidate keys for the lineage axis occur nowhere in
its members, because a corpus holds sources and not commentary on whether its sources are
independent. Any future register axis whose subject is the *relationship between* sources rather
than a claim in them will meet the same wall, and the workaround is to key on the questioner's
vocabulary, which for this class means author surnames. It is a weak instrument and ECR-10 is the
weakest row in the set because of it.
