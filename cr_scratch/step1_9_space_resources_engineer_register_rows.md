# Step 1.9, The Space Resources Engineer: the fifteen lunar contested-claims register rows

**Persona:** The Space Resources Engineer
**Sub-step:** 1.9, Group 2, depends on 1.8 and 1.12
**Deliverable:** the rows in §3, liftable verbatim into `oracle/REGISTER.tsv`
**Reasoning:** §1 and §2. **Quantity blocks:** §4. **Findings placed on other sub-steps:** §5.
**Date:** 2026-08-27

**What I opened.** My own 0.2 §5 in full. The 1.8 spec between its markers, and its §3.5, where The
Software Engineer left the detector's overlap threshold open and named it rather than papering over
it. The counting-rule contract, lines 177 to 423 of 1.12. `lsei/lunar-scenario-explorer-map.md`, the
sections "Every Claim and its sections", "Which coefficients each section governs", "The live
coefficient values", "What each section carries in the ledger tab", and "The nodes ruled excluded".
`lsei/oracle/lib/literature_search.js`, for `tokenize()`, because a key is a token or it is nothing.
The full `lsei/literature/` tree, 152 files. And **forty-three of the fifty-eight summaries these rows
name, opened at the passage where a figure is being encoded** [Q-LCC15-LEAVES-READ], which is where
most of this sub-step's time went and where six of my Step 0 figures turned out to be wrong or
under-described.

I ran the rows through a checker before writing them up. It is committed at
**`tools/check_register_rows.js`** and implements L2 through L5 and B1, B2, B3, B6 and B7 of the 1.8
spec against `lsei/literature/`, using `literature_search.js`'s own `tokenize()` rather than a
reimplementation of it. **All pass on the rows in §3.** The first run did not; §2.4 records what it
caught. It takes a TSV path and works on the economics rows unchanged, which is why it is in `tools/`
rather than in a scratchpad — 1.10 and 1.13 both want it.

---

## 1. What the ratification changed, taken point by point

This sub-step was briefed as needing paths and encoding rather than fresh thought. That was half
right. The encoding was mechanical. The reading was not: the schema forbids the app as a side, and
once the app is not there to be argued with, six axes had to be re-founded on what two *papers*
disagree about, which is a different question from what a paper and a coefficient disagree about. Six
axes changed shape. Two changed class. One changed its whole subject.

### 1.1 (a) The app is not a side. Six axes, and the two that drop to `one_sided` are LCC-05 and LCC-14

Worked out independently and agreeing with [Q-LCC-APP-SIDED]. Removing the app side leaves:

| Axis | Literature sides remaining | Class |
|---|---|---|
| LCC-04 water extraction specific energy | 3 (Sowers, LUWEX, Wang) | `two_sided` |
| **LCC-05 capture efficiency** | **1** | **`one_sided`** |
| LCC-10 fission against solar | 2 | `two_sided` |
| LCC-11 landed cost | 3, merged to 2 (see §1.5) | `false_pair` |
| **LCC-14 sintering specific energy** | **1** | **`one_sided`** |
| LCC-15 excavation rate | 2 | `two_sided` |

**LCC-05 and LCC-14 are `one_sided` and that is the honest description of what they always were.** On
LCC-05 the app assumes `captureEff` = 1 and four sources measure or assume less; there is no source
in this corpus on the other side, because no source reports full capture. On LCC-14 the app carries
`eSinter` = 3 MJ/kg as an ASSUMPTION and one source in this corpus has metered the quantity at all.
Neither is a disagreement between papers. Calling either `two_sided` would have required me to invent
an opposing side, which is the failure the register exists to prevent, performed by the register.

**What each keeps.** Every disclosure my Step 0 rows demanded survives, and survives *better*, because
`app_surface` delivers the app's own status string verbatim rather than my paraphrase of it. LCC-05's
`REFUSE_ONE_SIDE` — "an answer quoting an app water output without the capture-efficiency status
refuses" — is now `app_surface: captureEff,capture-derate,bilinear-water-law`, and the string that
prints is the app's own "ASSUMPTION (optimistic bound, no primary reports 100 percent)". That is
stronger than my rule was, because my rule was a sentence somebody had to remember and this is an
address.

### 1.2 (b) `PREFER_AND_NAME`: the refusal is right, and I am recording one thing it costs

I accept the ruling and I am not re-asserting the ranked form. The reasoning is sound and it is
stronger than The Software Engineer put it: ordering by merit is adjudication done by the router
invisibly, and *my* merit ordering on LCC-06 was a TRL judgement, which is exactly the kind of
judgement that should arrive with an author's name on it rather than as a sort order.

**LCC-06 is re-encoded as a `scope_token`, and reading the two Aqua Factorem reports in full this
week made the co-occurrence requirement bigger than I had drafted it.** My Step 0 rule named two
conditions: the unconfirmed ice-morphology premise, and the ground-plastic analogue. The report
carries a third and it is arithmetically the largest. The 98.3 percent figure is 50 kW against the
Kornuta baseline's 2.8 MW — and by the report's own Table B.1, the architecture drawing that 50 kW
produces 27,900 kg of water a year against the baseline's 2,450,000 kg, which the report itself states
as "1 percent of Kornuta et al." **A 98.3 percent power reduction at 1 percent of the throughput is
not a power reduction, it is a smaller plant**, and the report does not state the figure as a
specific-energy comparison. So the `scope_token` reads:

```
the unconfirmed ice-morphology premise, the ground-plastic analogue that stood in for ice, and the throughput of each architecture being compared
```

Three nouns, every quoted figure carries all three, and no ordering is involved. **This is a better
mechanism than the one I asked for.** `PREFER_AND_NAME` would have led with Sowers and named Metzger;
it would not have stopped anybody quoting 98.3 percent without the throughput ratio, because a
presentation order is not a content requirement. I asked for the wrong instrument and was given the
right one.

**One reservation, recorded rather than argued.** `scope_token` is one string per axis and it is
checked by the answer composer against every quoted figure. On an axis where the requirement is
genuinely conditional — name the throughput ratio *when quoting the 98.3 percent figure*, but not
when quoting Sowers' 500 kW — a single unconditional string over-applies. The cost is an answer that
carries a clause it does not need, which is cheap; the alternative, a per-member scope token, is a
field nobody asked for. I am not requesting it. I am recording that the mechanism is blunter than the
requirement, so that if 3.6 finds answers cluttered with irrelevant scope clauses, the cause is known.

### 1.3 (c) The dead keys, and what running the check before authoring actually caught

`sublimat`, `derate` and `kexc` are gone: `sublimation` replaces the first, and the other two are app
vocabulary and now sit in `app_surface` where they belong. Every multi-word and punctuated key is
gone. I wrote the checker first and ran it against the drafted rows, and it caught **four keys that
pass K1 and fail K2** — keys that tokenize cleanly, that I would have sworn were in the corpus, and
that do not occur in any member of their own axis:

| Axis | Dead key | Why |
|---|---|---|
| LCC-01 | `grade` | **The three Cabeus sources never write "grade."** They write "concentration" and "content". "Grade" is app vocabulary and mining vocabulary; it is not this literature's word. Replaced with `content`. |
| LCC-03 | `patchy` | Two files in 152 use it. Replaced with `deposits`. |
| LCC-15 | `throughput` | Not in Sanders, Just, Rostami or Kokkinis. It is the app's word for the quantity (`throughput-coefficient`). Replaced with `excavating`. |
| LCC-15 | `tonnes` | Sanders writes "metric tons". Replaced with `tons`. |

**Three of those four are the same error and it is worth naming, because it will recur at 1.10.** I
reached for the word the *app* uses for a quantity instead of the word the *corpus* uses for it. K2
is the check that catches it and it catches it in one second. The failure mode The Software Engineer
described as "filed in the wrong column" is not a slip; it is what happens when the person authoring
the keys has been reading the app all week.

`grade` is the one that stings, and it is worth a sentence for The Fact-Checker. **My Step 0 entry is
titled "Ice grade at Cabeus" and not one of its three sources uses the word.** Nothing downstream
breaks — `cabeus`, `content` and `concentration` carry the axis — but a key I was confident about was
dead, and confidence was the only thing standing behind it.

### 1.4 (d) No side resolves to the findings shelf

No lunar axis names an FA deliverable. None needed to. The one place I might have wanted one is
LCC-01's rail-endpoint disclosure, and §2.3 records where that went instead.

### 1.5 (e) Class assignments, run one axis at a time against the discriminating test

The test from the spec: *if a single question can be correctly answered from one side alone, the sides
are a false pair; if every single-side answer to the question the axis names is wrong, they are
two-sided.* Eleven `two_sided`, two `false_pair`, two `one_sided`.

**The two `false_pair` axes are LCC-08 and LCC-11, and both changed from my draft.**

**LCC-08 (oxygen route feedstock).** "What does molten regolith electrolysis need for feedstock" is
correctly answered from side B alone. The routes are not disagreeing; they need different rock. That
is a false pair, and the banned-word list matters here: an answer that frames Leger against Schreiner
as a contradiction has introduced an error that did not exist in either source.

**LCC-11 (landed cost) moved from INCOMMENSURABLE to `false_pair`, and reading the members changed
what the axis is about.** My draft implied a LEO analyst estimate against a *contracted surface price*.
There is no contracted surface price in this corpus. `nasa-clps-procurement-vignette.md` states a
$2.6 billion ceiling across fourteen contract holders and **no per-kilogram figure anywhere**;
`nasa-clps-delivery-timeline.md` is a manifest of eleven deliveries and prints no price at all. The
two surface figures that exist are a NASA slide's $1.2M/kg given as a motivation with no derivation,
and Metzger & Autry's swept parameter running $1M/kg down to $300/kg. So the axis is a LEO price
against a surface price, and the second half of the `scope_token` is not "estimate against contracted"
but "analyst estimate, modelling scenario, or contracted price" — three grades, of which the corpus
holds the first two and not the third.

I collapsed my draft's separate CLPS side into side B rather than giving it its own side. **A side
whose content is "these documents state no price" is an absence wearing a side letter**, and (e) is
explicit that inventing a side is the failure mode. It is a member of the surface side with a
position saying what it does and does not state, which is true and costs nothing.

**LCC-02 was drafted SUPERSEDED and is `two_sided`.** The mapping is not automatic. Li 2026's
detection limit of 20 to 30 wt% is high enough that it does not contradict Li 2018's low-abundance
patchy detections, so an answer from Li 2026 alone ("no surface ice") is wrong, and an answer from Li
2018 alone ("surface ice is there") is wrong about extent. Both single-side answers fail, which is
`two_sided`. Nothing is lost by dropping the ordering, because side letters carry no ranking and the
`scope_token` — the detection limit and the areal extent claimed — is what actually separates them.

**LCC-13 changed subject, and this is the largest single change in the set.** My draft classed it
ASYMMETRIC: a documented supply chain against an absence, side B being nothing. Reading
`gao-2011-neutron-detectors-helium3.md` properly, side B is not nothing. **There is a quantified,
priced helium-3 market in this corpus** — United States neutron detection, a projected government
demand of about 7,000 litres a year plus about 1,500 litres of other applications, against a supply of
8,000 to 10,000 litres a year, at $600 to $1,000 per litre after the 2008 shortage against $40 to $85
before it — and the documented federal response to that shortage was to fund substitute detector
technologies. That is a real second side to "what demand would a lunar helium-3 supply serve," and it
is a measured one facing an asserted one. `two_sided`.

**I want to be precise about what I am *not* claiming**, because this is the axis where I could most
easily manufacture an opposition. GAO does not say lunar helium-3 is worthless. It answers a different
sub-question — what the actual market is — and the fusion market Olson names remains undocumented in
this corpus in exactly the way my Step 0 said. What changed is that the register can now deliver two
sourced positions instead of one source and a hand-wave about an absence, and `two_sided` refuses an
answer carrying only one of them. My Step 0 `REFUSE_ONE_SIDE` survives as a mechanical consequence of
the class rather than as a bespoke rule.

**Seven of fifteen axes carry more than two sides** [Q-LCC15-SIDES-GT2], consistent with
[Q-LCC-SIDES-GT2] once the app sides are removed. Amendment V1 is load-bearing for this row set: a
contract that bought exactly two personas would truncate seven of my fifteen axes, and it would
truncate them silently.

---

## 2. Four things the reading changed that the ratification did not ask about

### 2.1 Six Step 0 figures were wrong or under-described, and the corrections are in the rows

Recorded because a register whose author does not say which of his own figures moved is a register
nobody can audit.

1. **Colaprete's 5.6 wt% is not a regolith concentration.** It is a water-to-dust mass ratio inside
   the spectrometer field of view, the denominator is a radiative-transfer dust mass averaging about
   2,175 kg, and *the paper states no excavation depth or sampled volume anywhere*. My Step 0
   `verdict_basis` said part of the LCROSS–LEND spread is scope "because LCROSS sampled one excavation
   to greater depth." The paper does not support that; it is my inference, and the paper's own caveat
   list is what supports it. Removed from the row.
2. **The CaRD deck states no TRL for CaRD.** My draft implied a NASA TRL for the brassboard. The deck
   describes a qualification sequence targeting "TRL 4 to 6 for the Moon" for an *earlier* unit and
   states no number for CaRD itself. `azami-2024` assigns TRL 6; Sanders 2025 assigns TRL 5 to
   carbothermal. Three sources, three different maturity statements about one programme, and one of
   the three is silent. That is now in LCC-07's positions.
3. **Wang 2025's collection ratio is 24 to 48 percent against an extraction ratio of 76 to 96
   percent**, and the bench runs at *positive pressure*, not vacuum. My Step 0 called it
   "extraction only" and left it there. The gap between what leaves the regolith and what arrives as
   liquid is the same gap LUWEX measures, appearing in a source I had filed as favourable.
4. **Poston 2020 prints no specific power.** My Step 0 put KRUSTY on LCC-10 as evidence about fission
   mass per kilowatt. The paper prints no W/kg figure for the reactor or the system, in any figure,
   plot or table. It constrains no mass-per-kilowatt claim at all, and its position now says so.
5. **Colozza 2020, the corpus's only solar-against-fission mass comparison, is sited at 30 degrees
   north over a 708-hour night** and contains no polar illumination model, no eclipse statistic and no
   permanently shadowed region — measured absences the summary itself reports with live controls. That
   is now LCC-10's `scope_token`: the site latitude and the darkness duration the storage is sized for.
   My Step 0 `scope_token` was "the status pair", which was about the app. This one is about the
   physics, and it is the difference between a 3-to-5-day darkness and a 29-day one.
6. **Just 2020 excludes TRL as a tabulated column** because almost all thirteen reviewed concepts do
   not exceed TRL 3. My Step 0 said its output was "recommendations for experiments not yet
   performed", which is true and misses the sharper fact.

### 2.2 The `app_surface` rule has a defect and I have routed around it in every row

The spec says: "if the app carries no status string at a named address the answer refuses
`axis-incomplete`." Checked against the map, **six modeled sections carry a tier of `-`**
[Q-LCC15-TIERLESS-SECTIONS] — `transmission-coefficient`, `net-value-identity`,
`productive-mass-fraction`, `falling-launch-price`, `power-mass-break` and `signed-offtake-break`.
My Step 0 rows named two of them: `falling-launch-price` on LCC-11 and
`signed-offtake-break` on LCC-12. **Under the ratified rule, naming either turns every `APP` or
`BOTH` verdict touching it into an automatic refusal.** Both are dropped, and `landed_cost` and `ice`
are dropped too, because neither symbol has a row in the app's live-values table; their governing
sections `ladder-range-and-floor` and `ice-grade-evidence` do, and those are named instead.

**All 38 distinct app addresses across the fifteen rows** [Q-LCC15-APP-ADDRESSES] **carry a status
string, a tier string, or an exclusion sentence.** Verified against the map one at a time.

**The excluded nodes need a ruling from The Engineer and I am flagging it rather than assuming it.**
Six of my rows name an excluded slug — `oxygen-extraction-energy`, `helium-procurement-energy`,
`bound-oxygen-mare`, `habitat-water-terrain`. Excluded nodes have tier `-` and the map records
"Excluded nodes with no exclusion prose in the island, 0: none," so every one of them carries an
app-stored sentence of the form "This app does not model oxygen production." **That sentence is the
app's own string at that address and it is what must print.** If the implementation reads only the
tier field, four axes refuse on every question that touches them, and they refuse on the excluded
nodes, which are precisely where the corpus is doing the work.

### 2.3 The rail-endpoint disclosures did not survive, and I am not smuggling them back in

Two of my Step 0 rules were disclosures about where an app rail runs past the evidence:

- **`ice` = 10 or 20 wt% exceeds every measurement in this corpus.** The highest figure any primary
  here reports for Cabeus is Luchsinger's 8.2 wt%, itself conditional on an assumed density; Li 2026's
  detection limit was 20 to 30 wt% and found no widespread surface ice above it. Water output scales
  as `E1/ice`, so the model rewards the end of the rail the evidence does not reach.
- **The `landed_cost` rail's floor is $1,000/kg**, which is below every surface figure in this corpus
  and inside the *low Earth orbit* range — Payload's $500/kg estimate and Jones's $67 to $900/kg sit
  under it.

**Neither is expressible in the ratified schema.** They are not `scope_token`s: a scope token is a
noun every quoted figure must name, and these are conditional assertions that fire at two specific
detent values. They are not `app_surface` disclosures: the app's own status strings do not say this.
They are not sides. They are **assertions about the corpus with an author and a derivation, which is
the definition of an FA deliverable cited at origin `findings`**, and §7 of the spec says so in as many
words.

So I am not encoding them, I am requesting them, in §5.3. Writing either as an `axis_statement` would
put my adjudication into text the schema delivers to the user verbatim as a neutral description of a
disagreement, which is `PREFER_AND_NAME` smuggled through a different field. The refusal I accepted in
§1.2 has to bind here too or it was not a principle.

### 2.4 What the checker caught on the first run, beyond the four dead keys

**One probe_neg was a mislabelled fixture.** LCC-14's first `probe_neg` hit four of seven `match_keys`
including both rare ones. A `probe_neg` that hot is not a negative fixture, it is a positive one with
the wrong label, and handing it to 3.6 would corrupt the threshold tuning it exists to serve. Replaced.
LCC-13's had the same defect at three keys, and LCC-05's `probe_pos` hit *zero* keys of its own axis,
which would have asserted that a question about capture efficiency must classify to the capture-
efficiency axis while containing none of its vocabulary.

**All fifteen `probe_pos` questions now hit at least one key of their own axis; all fifteen
`probe_neg` questions touch at least one member file and hit between one and two keys.** One to two
is deliberate: at zero the fixture tests nothing, and above two it is probably a true positive. The
one-key negatives are the interesting half — LCC-04's touches `luwex`, LCC-10's touches `krusty`,
LCC-11's touches `clps` — because each is a rare, high-IDF key that is *also* a topic token of the
member's own filename. **That is exactly the false-refusal case The Software Engineer recorded as
open in his §3.5**, and it is now in the fixture set three times, by construction, so 3.6 has data on
it rather than an anecdote.

**B7 reports nine axis pairs sharing two or more members**, all legitimate: `sanders-2025-*` sits on
four axes and the four `sowers-2019-*` files on three. That is the container/content point in its
plainest form — one file, many claims — and it is the reason the misclassification detector cannot
key on file membership.

---

## 3. THE DELIVERABLE

Fifteen `A` rows and eighty `M` rows in the ratified TSV encoding of `oracle/register_schema.md` §3,
plus the `H` row for this row set's basis. Everything between the markers lifts into
`oracle/REGISTER.tsv` unedited. Tab-separated; no field contains a tab or a newline.

**The `H` row is this row set's basis and not the file's.** 1.10 authors seventeen `ECR` rows against
`_intake/japanese-miracle/lit/`, which is a different root, so two `H` rows exist until 2.16
reconciles them into one file with one basis after the merge. Until then each set carries the root it
was authored against or its resolution check cannot run.

**Side letters are authoring order and carry no ranking.** On LCC-06, LCC-10 and LCC-15 I hold a view
about which side is better evidenced; it is in §1 and §5 of this document under my name, and it is not
in the sort order.

**Verify the extraction before lifting:**

```
sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' \
  cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' > /tmp/lunar.tsv
awk -F'\t' '{print $1, NF}' /tmp/lunar.tsv | sort | uniq -c
```

Expected: `1 H 6`, `15 A 9`, `80 M 5`. Run in this session, output as stated.

<!-- BEGIN oracle/REGISTER.tsv (lunar rows) -->
H	lsei/literature	2026-08-27	7f97983	15	80
A	LCC-01	two_sided	cabeus,ice,content,concentration,water,lcross,lend,wt	the measurement footprint and the sampled depth	Three measurement methods report the water-ice concentration at Cabeus crater and their central values span about an order of magnitude.	ice-grade-evidence,ice-grade-break,polar-cold-trap-water	What is the water ice concentration in the regolith at Cabeus crater?	How does LEND neutron albedo vary with relief height and average annual temperature?
A	LCC-02	two_sided	surface,exposed,ice,shadowcam,reflectance,detection,frost	the instrument detection limit and the areal extent the claim covers	Two studies by the same lead author, eight years and two instruments apart, report opposite headline results on whether water ice is exposed at the surface inside permanently shadowed regions.	polar-cold-trap-water	Is water ice exposed at the surface inside the lunar permanently shadowed regions?	What surface temperature is measured inside a lunar permanently shadowed region?
A	LCC-03	two_sided	cold,trap,traps,micro,distribution,buried,deposits,gardening,prospecting	the spatial scale the model resolves, from centimetre micro cold traps to a mining-scale deposit	Whether polar water ice is widespread, shallow and areally accessible, or buried, patchy and shuffled by cratering at the scale a mine would work.	polar-cold-trap-water,habitat-water-terrain	Is polar water ice widespread and shallow, or buried in patches at mining scale?	At what temperature is water ice stable in a lunar cold trap?
A	LCC-04	two_sided	extraction,energy,kwh,specific,sublimation,thermal,mining,microwave,luwex,water	the process boundary (extraction only, or extraction through capture and liquefaction) and the scale (bench kilograms per run, or tonnes per year)	Published specific energies for extracting water from icy lunar regolith span more than an order of magnitude and are drawn at different process boundaries and at scales separated by four orders of magnitude.	E1,kP,duty,energy-per-tonne,energy-per-kilogram,bilinear-water-law	How much energy does it take to extract a kilogram of water from lunar regolith?	What simulant did the LUWEX campaign use to stand in for icy regolith?
A	LCC-05	one_sided	capture,capturing,recovery,efficiency,yield,trap	the denominator: recovery measured against initial ice mass, or capture measured against extracted mass	What fraction of the water released from icy regolith is actually recovered, and against which denominator the fraction is reported.	captureEff,capture-derate,bilinear-water-law	What water capture efficiency has actually been demonstrated in a test?	What contaminant inhibited the cold trap during the LUWEX experiments?
A	LCC-06	two_sided	beneficiation,aqua,factorem,magnetic,electrostatic,pneumatic,separation,sublimation,power	the unconfirmed ice-morphology premise, the ground-plastic analogue that stood in for ice, and the throughput of each architecture being compared	Whether mechanical and electrostatic beneficiation of ice grains needs far less surface power than thermal sublimation, and what the power-reduction figure is conditional on.	energy-per-tonne,capture-derate	Does mechanical beneficiation of lunar ice grains need less surface power than thermal sublimation?	What magnetic susceptibility does olivine have at permanently shadowed region temperature?
A	LCC-07	two_sided	oxygen,o2,lox,carbothermal,ilmenite,reduction,kwh,energy,yield,electrolysis	thermal energy against electrical energy, and the boundary (reactor only, or end-to-end through liquefaction and storage)	Published specific energies for lunar oxygen production run from about 24 to about 93 kWh per kilogram, and two NASA sources on the same carbothermal programme two years apart report incompatible yields.	oxygen-extraction-energy	How many kilowatt hours does it take to produce a kilogram of oxygen from lunar regolith?	What temperature does carbothermal reduction of lunar regolith run at?
A	LCC-08	false_pair	ilmenite,mare,highland,feedstock,beneficiation,mre,electrolysis,polar,regolith	the feedstock the route requires: ilmenite-rich mare regolith, any regolith, or any silicate	Oxygen production routes state their energy per kilogram against different feedstocks, and every landing site in this corpus architecture studies is polar highland terrain.	bound-oxygen-mare,oxygen-extraction-energy	Does the ilmenite reduction energy figure apply at a south polar landing site?	At what temperature does molten regolith electrolysis operate?
A	LCC-09	two_sided	illumination,illuminated,sunlight,shackleton,solar,power,shadow,polar	illuminated ground area against extractable electrical power, and the observer height above local topography	How much sunlight the lunar south pole receives is answered by image-derived and by terrain-model methods that disagree at the same points, and how much electrical power that sunlight yields is a different quantity again.	persistently-lit-terrain,solar-mass-allocation,storage-specific-energy	How much solar power is available at the lunar south pole?	How long a shadow does a one metre boulder cast near the lunar pole?
A	LCC-10	two_sided	fission,reactor,solar,kwe,storage,night,battery,krusty,kilopower,power	the site latitude and the darkness duration the storage is sized for	Whether the energy storage needed to carry a lunar night cancels the mass advantage that solar arrays hold over a fission reactor per kilowatt electric.	fFis,fSol,fission-specific-power,solar-mass-allocation,zero-intercept-mass-law,storage-specific-energy	Is fission or solar with storage lighter per kilowatt at the lunar south pole?	What fuel enrichment does the KRUSTY reactor use?
A	LCC-11	false_pair	landed,cost,launch,starship,clps,delivery,price,leo,transportation,kilogram	the destination the price is quoted to, low Earth orbit or the lunar surface, and whether the figure is an analyst estimate, a modelling scenario, or a contracted price	Dollar-per-kilogram figures in this corpus are quoted to two different destinations that differ by roughly three orders of magnitude, and are read as if they were the same quantity.	ladder-range-and-floor,shared-flight-price,clps-small-lander-cost,leo-to-surface-multiplier	What does it cost to land a kilogram on the lunar surface?	How many CLPS task orders have flown and which vendors carried them?
A	LCC-12	two_sided	breakeven,propellant,price,commercial,business,hurdle,revenue,demand	the assumed propellant price, the assumed annual demand, and the discount rate	Whether the lunar propellant business case closes, and under whose assumed price, volume and cost of capital.	industrial-plant-price,break-even-sales-price,offtake-record,product-payback-ranking	Does the lunar propellant business case close?	What annual propellant demand did the Evolvable Mars Campaign assume?
A	LCC-13	two_sided	helium,fusion,deuterium,tritium,detectors,implanted,regolith	the market named, deuterium and helium-3 fusion power or terrestrial neutron detection, and the annual volume that market consumes	What demand a lunar helium-3 supply would serve: the deuterium and helium-3 fusion power market these mining studies name, or the terrestrial neutron-detector market this corpus quantifies.	helium-procurement-energy	Who would buy lunar helium-3?	What isotopic separation technique recovers helium-3 from evolved lunar gases?
A	LCC-14	one_sided	sintering,sintered,microwave,construction,strength,energy,regolith	whether the figure is metered whole-process electrical energy at bench scale, or a modelled sintering energy flux inside a system boundary the source draws	What energy it takes to sinter a kilogram of lunar regolith into a construction product.	eSinter,ySinter,op_const,sintering-specific-energy,sintering-yield	How much energy does it take to sinter a kilogram of lunar regolith?	What compressive strength does a laser-melted regolith paving tile reach?
A	LCC-15	two_sided	excavation,excavator,excavators,excavating,bucket,drum,regolith,tons,rate	the gravity, duration and wear accumulation of the demonstration, against an annualised rate normalised to plant mass	How much regolith a lunar excavator moves, and at what technology readiness the excavation step actually stands.	kExc,throughput-coefficient,productive-plant-mass	How much regolith can a lunar excavator move in a year?	How deep can a low-mass excavator cut in lunar gravity?
M	LCC-01	A	colaprete-2010-lcross-water.md	Mean water concentration 5.6 plus or minus 2.9 percent by mass across three post-impact averaging periods, derived as a water-to-dust mass ratio inside the spectrometer field of view; the paper states no excavation depth or sampled volume anywhere.
M	LCC-01	A	colaprete-2010-lcross-ejecta-water-detection.md	A second summary of the same Colaprete 2010 paper; both leaves are named so that the invariant cannot be satisfied by whichever member tokenizes better. Records that the denominator is a radiative-transfer dust mass of about 2175 kg, not a weighed regolith sample.
M	LCC-01	B	litvak-2024-lend-cabeus-water-ice.md	Subsurface water-ice content averaged over Cabeus-1 is 0.49 plus or minus 0.05 percent by mass, maximum about 0.7 percent at the crater bottom where the LCROSS impact site sits; collimated neutron, 2009 to 2023, model-derived from neutron suppression.
M	LCC-01	C	luchsinger-2021-lcross-water-modeling.md	Re-modelling the same LCROSS plume gives 8.2 wt% at an assumed regolith density of 1.5 g/cm3 or 4.3 wt% at 3.0 g/cm3, so the derived concentration moves by a factor of two on an assumption the observation does not constrain.
M	LCC-02	A	li-2018-surface-exposed-water-ice.md	Reports direct evidence of surface-exposed water ice in the polar regions from Moon Mineralogy Mapper reflectance, at low abundance and in patches.
M	LCC-02	B	li-2026-shadowcam-psr-water-ice.md	ShadowCam finds no evidence of widespread surface water ice above a detection limit of 20 to 30 wt%, identifies a few small locations possibly above 10 wt%, does not rule out widespread ice at lower content, and states that a detection limit below 1 wt% is what would settle it.
M	LCC-03	A	hayne-2020-micro-cold-traps.md	Micro cold traps hold roughly 10 to 20 percent of the Moon permanent water cold-trap area, bringing the total to about 40,000 km2, which implies polar water is more accessible than large-crater estimates alone suggest.
M	LCC-03	B	cannon-2020-lunar-ice-geologic-model.md	A geologic model at mining scales in which ice is buried beneath dry overburden, patchy in lateral extent, and repeatedly shuffled by impact gardening.
M	LCC-03	C	schorghofer-2026-current-theories-lunar-ice.md	The standard cold-trap model is consistent with the major observational constraints, with a few less-established observational claims unaccounted for; names the key measurements still needed.
M	LCC-04	A	sowers-2019-thermal-mining-ice.md	Solar thermal sublimation under a capture tent; the article states no specific-energy figure, and roughly 1.3 to 2.7 kWh/kg is derivable from its own power-versus-concentration figures at 4 wt% and 1,600 t/yr, extraction only, concept level.
M	LCC-04	A	sowers-2019-psr-ice-mining.md	Same author and year cluster, named so the invariant cannot be satisfied by the member that tokenizes best rather than the one carrying the claim.
M	LCC-04	A	sowers-2019-thermal-mining-niac.md	Same author and year cluster, named for the same reason.
M	LCC-04	A	sowers-2019-thermal-mining-niac-report.md	Same author and year cluster, named for the same reason.
M	LCC-04	B	kiewiet-2026-luwex-water-extraction.md	Measured recovery energy efficiency 22.88 to 66.33 g/kWh, equivalently about 15 to 44 kWh/kg, for an integrated extraction, capture and liquefaction chain at up to 13 kg of simulant per run at 5 wt% ice, targeting TRL 4 in hardware the source says approached TRL 5 conditions.
M	LCC-04	C	wang-2025-microwave-water-production.md	Microwave heating of a 70 mm by 70 mm cryogenic simulant cylinder gives an energy cost of 1.9 to 10.0 W.h/g at 800 W, extraction only; collection ratio is 24 to 48 percent against an extraction ratio of 76 to 96 percent, and the bench runs at positive pressure rather than vacuum.
M	LCC-05	A	kiewiet-2026-luwex-water-extraction.md	Water recovery of 50 to 73 percent and capture percentages up to 89 percent across four runs; recovery percentage is recovered mass over initial ice mass while capture percentage is recovered over extracted, and the two are 73 and 89 percent in the same best run.
M	LCC-05	A	sanders-2025-nasa-isru-progress-review.md	PVEx reached TRL 5/6 with 43 to 56 percent water extraction at 4 to 6 wt% for a 5 cm inner-diameter, 0.5 m core; LADI targeted 75 percent extraction efficiency and was cancelled before TRL 5; capture and cleanup by cold trap and freeze distillation stand at TRL 3/4 with data to 0.1 kg/hr vapor flow.
M	LCC-05	A	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same Sanders and Kleinhenz 2025 deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-05	A	linne-2020-lunar-water-pilot-plant.md	A COMPASS conceptual design that assumes 75 percent water extraction and capture efficiency for an auger-dryer reactor; the figure is a design assumption in a point design, not a measurement.
M	LCC-06	A	sowers-2019-thermal-mining-ice.md	Solar thermal sublimation under a capture tent at 500 kW for 1,600 t/yr of water at 4 wt%, NIAC and Colorado School of Mines concept level, with no dependence on the physical form the ice takes.
M	LCC-06	A	sowers-2019-psr-ice-mining.md	Same author and year cluster, named so the axis cannot be satisfied by whichever member tokenizes best.
M	LCC-06	A	sowers-2019-thermal-mining-niac.md	Same author and year cluster, named for the same reason.
M	LCC-06	A	sowers-2019-thermal-mining-niac-report.md	Same author and year cluster, named for the same reason.
M	LCC-06	B	metzger-2020-aqua-factorem.md	States a 98.3 percent surface-segment power reduction, being 50 kW against the 2.8 MW of the Kornuta baseline, at an annual output of 27,900 kg of water which the report itself gives as about 1 percent of that baseline; and a separate 97.5 percent reduction against an 800 kW thermal comparison. Ground plastic sandblasting media stood in for ice in every magnetic, pneumatic and size-sorting test, the analogue electrostatic properties are stated as undetermined, and the basalt entry in the triboelectric series was set by analogy with no quantitative data.
M	LCC-06	B	metzger-2021-aqua-factorem.md	The companion report carrying the same 98.3 and 97.5 percent figures and the grain-size premise of roughly 70 micrometres from M3 or 8 micrometres from LCROSS; the third member of this cluster, metzger-2021-aqua-factorem-2.md, is a superseded duplicate held outside the corpus and is named here so its absence is recorded rather than silent.
M	LCC-07	A	leger-2025-energy-oxygen-moon.md	24.3 plus or minus 5.8 kWh per kg of liquid oxygen by hydrogen reduction of ilmenite at 10 wt% ilmenite, end-to-end from excavation through liquefaction and zero-boil-off storage, with all process heat billed as electricity.
M	LCC-07	B	colozza-2010-solar-lunar-oxygen.md	About 39 kWh per kg O2 derivable from the paper own power and rate figures at a 1,000 kg/yr carbothermal demonstration scale, of which over 82 percent is thermal and the remainder electrical; the paper states no specific-energy figure as such.
M	LCC-07	C	nasa-2023-card-carbothermal-reduction.md	Brassboard yields of 13.42, 11.53, 15.79 and 10.77 g O2 per kWh thermal across four runs, equivalently about 63 to 93 kWh per kg thermal, with no stated measurement uncertainty or replicate count and no formal TRL stated for the unit.
M	LCC-07	C	azami-2024-lunar-manufacturing-review.md	Restates the same four CaRD yields and assigns the project TRL 6, a number the CaRD deck itself does not state.
M	LCC-07	D	sanders-2025-nasa-isru-progress-review.md	Carbothermal reduction at TRL 5, greater than 20 g O2 per kW-hr thermal, equivalently under 50 kWh per kg thermal, with single melts equivalent to 140 kg O2/yr and greater than 99.7 percent carbon recovery.
M	LCC-07	D	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same 2025 deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-08	A	sargeant-2020-hydrogen-reduction-ilmenite-static.md	Hydrogen reduction of ilmenite in a static bed; the route needs ilmenite-rich feedstock, which is a mare mineralogy.
M	LCC-08	A	leger-2025-energy-oxygen-moon.md	The 24.3 kWh/kg figure is computed for 10 wt% ilmenite feedstock with a beneficiation enrichment factor, and the paper own site map favours High-Ti mare regions.
M	LCC-08	B	schreiner-2016-molten-regolith-electrolysis-sizing.md	Molten regolith electrolysis takes any regolith with no added reagents, so feedstock mineralogy sets efficiency rather than admissibility.
M	LCC-08	B	schreiner-2016-mre-sizing-model.md	A second summary of the same Schreiner sizing work, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-08	B	sibille-2012-joule-heated-mre.md	Joule-heated molten regolith electrolysis, same feedstock-agnostic premise.
M	LCC-08	C	nasa-2023-card-carbothermal-reduction.md	Carbothermal reduction takes any silicate and needs carbon recycling rather than a particular mineral.
M	LCC-08	C	colozza-2010-solar-lunar-oxygen.md	Carbothermal at 1900 C on any silicate, with an assumed O2 yield of 15 to 20 wt% independent of ilmenite content.
M	LCC-08	D	sanders-2025-nasa-isru-progress-review.md	Assigns maturity by terrain: MRE and carbothermal at TRL 5/6 for polar highland regolith, hydrogen and CO reduction at TRL 5 for mare.
M	LCC-08	D	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-09	A	speyerer-2013-persistently-illuminated-regions.md	Image-derived from one lunar year of LROC coverage at 100 m/pixel: localized regions illuminated for nearly 94 percent of the year with a longest single eclipse of 43 hours; the image-derived values at the same nominal points are consistently lower than the coarser terrain-model values, and the study found both peaks the simulations missed and shadowed pockets they had marked as lit.
M	LCC-09	A	speyerer-2012-in-search-of-shade.md	At the most-illuminated pixel the terrain-model simulations gave 82 to 89 percent against 71 percent from the higher-resolution image-derived product, and small permanently shadowed craters sit inside the persistently illuminated rim terrain.
M	LCC-09	B	glaser-2014-south-pole-illumination.md	LOLA terrain-model simulation over the 18.6-year precessional cycle: Connecting Ridge at 92.27 percent accumulated light at 2 m above ground and 95.65 percent at 10 m, with longest continuous darkness typically 3 to 5 days.
M	LCC-09	C	ross-2023-lunar-south-pole-solar-power.md	Overshadowing of illuminated ground by sunward panels limits extractable time-averaged power to about 55 to 63 MW at greater than 70 percent illumination for panels up to 20 m, falling to about 6 MW at greater than 90 percent; illuminated area and extractable power are not the same quantity.
M	LCC-10	A	poston-2020-krusty-reactor-design.md	A 1 kWe prototype that achieved nuclear-powered operation in March 2018; the paper prints no specific-power figure in W/kg for the reactor or the system, so it constrains no mass-per-kilowatt claim.
M	LCC-10	A	oleson-2022-deployable-fsp.md	A 40 kWe point design whose three elements total 10,046 kg against a 6,000 kg goal the paper states it exceeded, giving 3.98 W/kg overall or 5.45 W/kg on the reactor element alone; the paper states no system-level specific power itself.
M	LCC-10	A	nasa-2025-fission-surface-power-directive.md	Directs a forthcoming procurement at a minimum 100 kWe with a heavy-class lander allocation of up to 15 metric tons and launch readiness by Q1 FY30; the allocation is a requirement, not a demonstrated mass.
M	LCC-10	B	ross-2023-lunar-south-pole-solar-power.md	Solar power near the pole is available nearly continuously only from vertically deployed panels in restricted high-illumination regions, and if solar is inadequate even in a best case, fission becomes the only option.
M	LCC-10	B	csank-2022-powering-the-moon.md	Sizes an Artemis baseline of about 90 kW with islanded solar and battery sub-grids, and anchors the transition on a 40 kWe fission demonstration; cable mass dominates total microgrid mass.
M	LCC-10	B	colozza-2020-lunar-base-power-comparison.md	For continuous day and night operation the reactor is lowest mass in every case and energy storage dominates every continuous photovoltaic case; every case is sited at 30 degrees north over a 708.33 hour day-night cycle, and the document contains no polar illumination model, no eclipse statistic and no permanently shadowed region.
M	LCC-10	B	pappa-2021-relocatable-solar-array.md	A relocatable vertical solar array concept for the polar high-illumination regions.
M	LCC-10	B	belbin-2024-vsat-grd-demonstrator.md	A vertical solar array technology ground demonstrator.
M	LCC-11	A	payload-research-starship-cost.md	A trade-press analyst estimate of about $500 per kilogram to low Earth orbit for an expendable Starship V1, with Falcon 9 expendable likely above $2,000 per kilogram; the piece labels its own cost figures as Payload estimates rather than stated or audited prices.
M	LCC-11	A	jones-superheavylift-final20260614.md	A fully reusable Starship headline range of $67 to $900 per kilogram to low Earth orbit across three scenarios the authors describe as hypothetical and illustrative.
M	LCC-11	A	adilov-2022-launch-cost-reductions.md	Per-kilogram launch cost to low Earth orbit fell 5.5 percent per year unadjusted over the study period, and the authors state that detailed launch cost data are not publicly available because actual contracts are private.
M	LCC-11	B	nasa-2023-card-carbothermal-reduction.md	States $1.2M per kilogram to land on the lunar surface, given as a motivation on the first slide with no derivation.
M	LCC-11	B	metzger-autry-2023-lunar-landing-pads.md	Uses surface transportation cost as a swept parameter at $1M, $300K, $100K, $10K, $2K and $300 per kilogram, with a stated context of roughly $1M/kg in the next five years falling toward $2K/kg within twenty.
M	LCC-11	B	nasa-clps-delivery-timeline.md	A manifest of eleven CLPS surface deliveries against a 2024 to 2028 axis; it prints no contract value and no per-kilogram price.
M	LCC-11	B	nasa-clps-procurement-vignette.md	States a combined maximum contract value of $2.6 billion through November 2028 across fourteen contract holders, and states no per-kilogram delivery price anywhere.
M	LCC-12	A	kornuta-2019-commercial-lunar-propellant.md	A commercial architecture producing 450 metric tons of propellant from 2,450 metric tons of processed lunar water, generating $2.4 billion of revenue, presented as a closing case.
M	LCC-12	A	kornuta-2019-commercial-lunar-propellant-architecture.md	A second summary of the same collaborative study, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-12	A	sowers-2019-thermal-mining-ice.md	Reaches the same conclusion from the Colorado School of Mines thermal-mining study, at an adopted 4 wt% minimum ice concentration that it states is a requirement the prospecting campaign must still meet.
M	LCC-12	A	sowers-2019-psr-ice-mining.md	Same author and year cluster, named so the axis cannot be satisfied by whichever member tokenizes best.
M	LCC-12	A	sowers-2019-thermal-mining-niac.md	Same author and year cluster, named for the same reason.
M	LCC-12	A	sowers-2019-thermal-mining-niac-report.md	Same author and year cluster, named for the same reason.
M	LCC-12	B	jones-2019-cislunar-isru-breakeven.md	Under assumptions the authors state are favourable toward lunar ISRU, lunar propellant costs 97 percent more than Earth-launched propellant, the cheapest lunar architecture is $78,000/kg against $40,000/kg for commercial Earth delivery, and breakeven arrives at about 34 to 35 years of sustained 59 t/yr demand.
M	LCC-12	B	jones-2020-lunar-propellant-breakeven.md	Breakeven is driven by the magnitude and duration of the lunar campaign, and without ISRU systems lasting more than five years before replacement, cislunar demand for a Mars campaign favours delivery from Earth.
M	LCC-12	C	shishko-2019-lunar-thermal-mining-business-case.md	Supplies a framework and a production-rate model and states that it is not a completed cost or net present value result.
M	LCC-12	C	mckeown-2024-space-resource-hurdle-rate.md	About 25 percent is the appropriate hurdle rate for development-stage space resource projects, conditional on a legal regime, with 10 percent proposed for reporting; the choice of rate changes what closing means.
M	LCC-13	A	olson-2021-lunar-helium3-mining.md	Mining concepts since the 1980s, the Mark series miners, and the 2015 to 2018 implantation and extraction experiments at Wisconsin; the only demand-side content is one unquantified sentence that several commercial fusion companies plan reactors as early as the 2030s, with no company names, power ratings, fuel consumption rates or projected prices. States about 100 kg of helium-3 is presently available on Earth.
M	LCC-13	A	wittenberg-1992-he3-resources-review.md	More than a million tonnes of solar-wind helium-3 in the fine lunar regolith, argued as sufficient to contribute to Earth generating capacity for several centuries in a deuterium and helium-3 reactor that did not then and does not here exist.
M	LCC-13	B	gao-2011-neutron-detectors-helium3.md	The quantified United States helium-3 market is neutron detection at a projected government demand of about 7,000 litres per year plus about 1,500 litres of other applications, against a supply of 8,000 to 10,000 litres per year; the price rose from $40 to $85 per litre before the shortage to $600 to $1,000 per litre after it, and the documented federal response was to fund substitute detector technologies.
M	LCC-14	A	liu-2025-microwave-sintering-lunar-regolith-simulants.md	Metered whole-process energy consumption of 69 MJ/kg for the mare simulant CLRS-1 and 98 MJ/kg for the highland simulant SC-080, on 11 g charges in a 1000 W domestic microwave with a silicon-carbide susceptor kiln; the source reports no separately measured power draw and no loss breakdown.
M	LCC-14	A	azami-2024-lunar-manufacturing-review.md	A technique-by-technique review whose energy-consumption column is qualitative; the review reports no absolute kWh per kilogram sintering-energy value anywhere in its text.
M	LCC-14	A	metzger-autry-2023-lunar-landing-pads.md	Gives sintering energy per pad rather than per kilogram: 19.7 MWh with 4.7 t of Earth-supplied hardware for a 12 m inner pad and 67.8 MWh for a 27 m outer pad, from a physics-based model whose parameters are drawn from terrestrial technologies because no lunar construction technology is mature, and excludes the cost of maturation from TRL 3/4 to TRL 6.
M	LCC-15	A	sanders-2025-nasa-isru-progress-review.md	Loose-regolith excavation at TRL 5 in a simulated mission, with the IPEx bucket-drum excavator moving 10 metric tons in 5 days; hard icy-regolith excavation at TRL 5 via the Break the Ice Challenge, 15 teams over 15 days excavating 12,000 kg total at about 800 kg/day with each delivery over a 500 m traverse.
M	LCC-15	A	sanders-2025-nasa-lunar-isru-progress-review.md	A second summary of the same 2025 deck, named so the invariant cannot be satisfied by the wrong member of the pair.
M	LCC-15	B	just-2020-regolith-excavation-review.md	Reviews thirteen excavation concepts and excludes technology readiness as a tabulated column because almost all reviewed concepts do not exceed TRL 3; reports that test data are inconsistent across studies, and its own output is a set of key performance parameters future experiments should report.
M	LCC-15	B	rostami2018.md	A conceptual paper on adapting terrestrial tunnel boring machines, explicitly carrying no original experimental or design data and no lunar machine design.
M	LCC-15	B	kokkinis-2024-automated-drilling-mining-review.md	A terrestrial mining-automation review whose own conclusion is that infrastructure-less, standardized and safety-mature automation remains an open research target rather than a deployed reality.
<!-- END oracle/REGISTER.tsv (lunar rows) -->

### 3.1 What the rows say at a glance, for a reviewer auditing a `class`

| Axis | Class | Sides | Members | `scope_token` set | Subject |
|---|---|---|---|---|---|
| LCC-01 | two_sided | 3 | 4 | yes | Water-ice concentration at Cabeus |
| LCC-02 | two_sided | 2 | 2 | yes | Surface-exposed ice, detected or not |
| LCC-03 | two_sided | 3 | 3 | yes | Widespread and shallow, or buried and patchy |
| LCC-04 | two_sided | 3 | 6 | yes | Water extraction specific energy |
| LCC-05 | **one_sided** | 1 | 4 | yes | Water capture efficiency |
| LCC-06 | two_sided | 2 | 6 | yes | Thermal sublimation against beneficiation |
| LCC-07 | two_sided | 4 | 6 | yes | Oxygen production specific energy |
| LCC-08 | **false_pair** | 4 | 9 | yes | Which feedstock each oxygen route needs |
| LCC-09 | two_sided | 3 | 4 | yes | Illumination, and lit ground against power |
| LCC-10 | two_sided | 2 | 8 | yes | Fission against solar plus storage |
| LCC-11 | **false_pair** | 2 | 7 | yes | Dollars per kilogram, to LEO or to the surface |
| LCC-12 | two_sided | 3 | 10 | yes | Does the propellant business case close |
| LCC-13 | two_sided | 2 | 3 | yes | What demand lunar helium-3 would serve |
| LCC-14 | **one_sided** | 1 | 3 | yes | Sintering specific energy |
| LCC-15 | two_sided | 2 | 5 | yes | Excavation rate, and its technology readiness |

**Every axis sets a `scope_token`; none reads `-`.** That is not a decision I made about the field, it
is what ISRU literature is like. Every quantitative claim in this corpus is drawn at a system boundary
the reader must be told, and the axes where I most wanted to skip the field — LCC-02, LCC-03 — turned
out to be the ones where the boundary is a detection limit and a spatial scale, which are the two
things a reader is most likely to assume rather than check.

**LCC-12 is the shared axis and it is authored here, once.** 1.10 must not duplicate it under an `ECR`
id. My side is the technical half — production rate, plant mass, energy, capture efficiency. The
Manager under his economics prompt holds the discount rate and the demand side, and where our
verdicts differ both stand.

**Cost, stated plainly.** Thirty-seven sides across fifteen axes [Q-LCC15-SIDES], so a question
touching every axis once would buy thirty-seven personas. LCC-08 alone buys four and LCC-07 buys four.
That is the authoring discipline V1 relies on instead of a cap, and I am the person it is supposed to
discipline, so: I considered collapsing LCC-08's four feedstock classes to two and did not, because
ilmenite-needing, regolith-agnostic and silicate-agnostic are three genuinely different answers to
"what rock does this route need," and Sanders is a fourth position that assigns maturity by terrain.
Merging them would produce a cheaper axis that answers the question wrongly.

---

## 4. Quantity blocks

Born here per the counting rule §2. **The figures inside the `M.position` fields are not governed and
this is deliberate**: each is a number quoted from an external source together with its citation, and
§1's not-governed list rules that "the citation is the rule; class `quoted`." The `M.leaf` column *is*
the citation, in the same row, one field away. A register in which every quoted source figure needed
its own block would carry roughly a hundred and forty blocks that all say "the paper says so," and the
counting rule declines that trade explicitly.

**What is governed here is what this deliverable asserts in its own voice**: the counts over the row
set, and the four figures I derived by arithmetic that no source performs. Each of those four is
labelled in its `predicate` as derived, because a unit conversion I did is not a measurement the
source made.

```quantity
id:            Q-LCC15-AXES
class:         fixed
value:         15
unit:          A rows in the lunar half of the contested-claims register
population:    the A rows of the block between the BEGIN and END markers of section 3 of
               cr_scratch/step1_9_space_resources_engineer_register_rows.md
operation:     cmd: sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' | awk -F'\t' '$1=="A"' | wc -l
conditions:    cwd: repository root, 55 characters. The count is of A rows only; the H row and the
               M rows are counted separately. Economics ECR rows are authored at 1.10 and are not
               in this population.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the lunar half of the contested-claims register carries fifteen axes.
derived-from:  none
sampled:       n/a -- this operation counts rows by their type letter, it applies no classification
superseded:    none
```

```quantity
id:            Q-LCC15-MEMBER-ROWS
class:         fixed
value:         80
unit:          M rows across the fifteen lunar axes, counting a source once per axis it sits on
population:    the M rows of the same liftable block
operation:     cmd: sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' | awk -F'\t' '$1=="M"' | wc -l
conditions:    cwd: repository root, 55 characters. A source appearing on two axes contributes two
               rows; this is a count of memberships, not of distinct files. Compare
               Q-LCC-MEMBER-REFS, which counted 67 references in the Step 0 draft; the authored rows
               carry more because near-duplicate cluster members are now named in full under B6.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the fifteen lunar axes carry eighty member rows.
derived-from:  none
sampled:       n/a -- counts rows by type letter
superseded:    none
```

```quantity
id:            Q-LCC15-DISTINCT-LEAVES
class:         fixed
value:         58
unit:          distinct leaf filenames named across the eighty member rows
population:    column 4 of the M rows of the liftable block, deduplicated
operation:     cmd: sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' | awk -F'\t' '$1=="M"{print $4}' | sort -u | wc -l
conditions:    cwd: repository root, 55 characters. Corpus root lsei/literature, 152 .md files.
               Provisional against the merge only in the sense that the merge renames nine leaves;
               the count itself does not change.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the fifteen lunar axes name 58 distinct corpus files, so 58 of the 152 files in
               lsei/literature would carry a ## Contested block under the lunar rows alone. Every
               one of the 58 resolves in the leaf index built by listCorpusFiles().
derived-from:  Q-LCC15-MEMBER-ROWS
sampled:       n/a -- deduplicates and counts a string column
superseded:    none
```

```quantity
id:            Q-LCC15-SIDES
class:         fixed
value:         37
unit:          distinct side letters summed across the fifteen lunar axes
population:    the (axis_id, side) pairs of the M rows of the liftable block, deduplicated within
               each axis and then summed
operation:     cmd: sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' | grep '^M' | cut -f2,3 | sort -u | wc -l
conditions:    cwd: repository root, 55 characters. Counts distinct (axis_id, side) pairs, so a
               side carrying three member rows contributes one. The same figure is printed by
               tools/check_register_rows.js on its "total sides" line.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the fifteen lunar axes carry thirty-seven sides in total, so under contract version 2
               a question touching every lunar axis once would buy thirty-seven personas. Eleven
               two_sided axes and two false_pair axes buy one persona per side; the two one_sided
               axes buy at most one each.
derived-from:  Q-LCC15-MEMBER-ROWS
sampled:       n/a -- deduplicates a column within a grouping and sums; it applies no rule of its own
superseded:    none
```

```quantity
id:            Q-LCC15-SIDES-GT2
class:         fixed
value:         7
unit:          of the fifteen lunar axes, those carrying more than two sides as authored
population:    the fifteen A rows and their M rows in the liftable block
operation:     cmd: sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' | grep '^M' | cut -f2,3 | sort -u | cut -f1 | uniq -c | awk '$1>2' | wc -l
conditions:    cwd: repository root, 55 characters. Counted after the app sides were
               removed per schema section 5, which is what makes this figure differ from
               Q-LCC-SIDES-GT2's 10 on the Step 0 draft; that block's own predicate anticipated 8
               after removal, and the authored rows give 7 because LCC-11's three drafted price
               groups merged to two and LCC-13 gained a second side rather than a third.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     seven of the fifteen authored lunar axes carry more than two sides: LCC-01, LCC-03,
               LCC-04, LCC-07, LCC-08, LCC-09 and LCC-12. A verdict buying exactly two personas
               would truncate seven of fifteen axes, and would truncate them silently.
derived-from:  Q-LCC15-SIDES
sampled:       15 inspected by hand, 0 found wrong, by The Space Resources Engineer -- the per-axis
               side listing the script prints was read row by row against the authored rows
superseded:    none
```

```quantity
id:            Q-LCC15-CLASS-MIX
class:         fixed
value:         eleven two_sided, two false_pair, two one_sided
unit:          a governed observation; the distribution of class over the fifteen lunar axes
population:    column 3 of the A rows of the liftable block
operation:     cmd: sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' | awk -F'\t' '$1=="A"{print $3}' | sort | uniq -c
conditions:    cwd: repository root, 55 characters. Class is assigned by the discriminating test of
               the 1.8 spec, applied per axis by the author; the operation reads the assignment, it
               does not reproduce the judgement.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     of the fifteen lunar axes, eleven are two_sided, two are false_pair (LCC-08 and
               LCC-11) and two are one_sided (LCC-05 and LCC-14). The two one_sided axes are the two
               that carried the app as side A and dropped to a single literature side when it was
               removed.
derived-from:  none
sampled:       15 inspected by hand, 2 found wrong, by The Space Resources Engineer -- LCC-02 was
               drafted SUPERSEDED and reclassified two_sided, and LCC-11 was drafted INCOMMENSURABLE
               with three price groups and reclassified false_pair with two
superseded:    none
```

```quantity
id:            Q-LCC15-KEYS
class:         fixed
value:         107
unit:          distinct match_key tokens across the fifteen lunar A rows
population:    column 4 of the A rows of the liftable block, comma-split and deduplicated across
               all axes; 127 key slots are filled, of which 107 are distinct strings
operation:     script: tools/check_register_rows.js /tmp/lunar.tsv, "keys total / distinct" line
conditions:    cwd: repository root, 55 characters. Node 26.4.0. /tmp/lunar.tsv is the extraction of
               the liftable block by the sed in section 3. Every key satisfies K1 --
               tokenize(k) deep-equals [k] using literature_search.js's own tokenizer -- and K2 --
               k occurs as a whole token in the leaf name or body of at least one member of its own
               axis. Compare Q-REG-KEYS-AS-WRITTEN's 110 drafted keys, of which 31 were dead.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the fifteen authored lunar axes carry 127 match_key slots naming 107 distinct tokens,
               and all 127 pass K1 and K2 against lsei/literature.
derived-from:  none
sampled:       n/a -- K1 and K2 are mechanical tests run over every key; no sampling is involved and
               every key was tested rather than a subset
superseded:    none
```

```quantity
id:            Q-LCC15-KEYS-DEAD-K2
class:         fixed
value:         4
unit:          drafted keys that passed K1 and failed K2 on the first check run, and were replaced
population:    the keys of the first authored draft of the fifteen A rows, before replacement
operation:     script: tools/check_register_rows.js <pre-replacement TSV>; the four failures were
               LCC-01 grade, LCC-03 patchy, LCC-15 throughput, LCC-15 tonnes
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Corpus root lsei/literature. The
               pre-replacement TSV is not retained; re-running the check requires substituting the
               four keys back, which the table in section 1.3 states.
               K1 had already been satisfied by construction, since the drafted keys were written as
               single lowercase tokens after reading the 1.8 finding; K2 is the check that fired.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     four keys the author wrote with confidence tokenize cleanly and occur nowhere in any
               member of their own axis. Three of the four -- grade, throughput, tonnes -- are the
               app's or the industry's word for a quantity rather than the corpus's word for it,
               which is the same failure mode as the drafted derate and kexc one column over.
derived-from:  none
sampled:       4 inspected by hand, 0 found wrong, by The Space Resources Engineer -- each failing
               key was grepped against its own axis's members individually before replacement
superseded:    none
```

```quantity
id:            Q-LCC15-APP-ADDRESSES
class:         fixed
value:         38
unit:          distinct app addresses named in the app_surface column of the fifteen lunar A rows
population:    column 7 of the A rows of the liftable block, comma-split and deduplicated
operation:     cmd: sed -n '/^<!-- BEGIN oracle\/REGISTER.tsv (lunar rows) -->$/,/^<!-- END oracle\/REGISTER.tsv (lunar rows) -->$/p' cr_scratch/step1_9_space_resources_engineer_register_rows.md | sed '1d;$d' | awk -F'\t' '$1=="A"{print $7}' | tr ',' '\n' | sort -u | wc -l
conditions:    cwd: repository root, 55 characters. Addresses are app coefficient symbols and app
               section slugs. Each was checked by hand against the map's "The live coefficient
               values" table, its per-claim section tables, and its excluded-node table.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the fifteen lunar axes name 38 distinct app addresses, and every one carries an
               app-stored status string, tier string, or exclusion sentence, so none of them
               triggers the axis-incomplete refusal the schema attaches to an address with no such
               string. Four of the 38 are excluded nodes whose app-stored string is the exclusion
               sentence rather than a tier.
derived-from:  none
sampled:       38 inspected by hand, 2 found wrong, by The Space Resources Engineer -- the drafted
               ice and landed_cost symbols have no row in the app's live-values table and were
               replaced by their governing sections ice-grade-evidence and ladder-range-and-floor
superseded:    none
```

```quantity
id:            Q-LCC15-TIERLESS-SECTIONS
class:         fixed
value:         6
unit:          modeled app sections whose tier column in the generated map is the literal "-"
population:    every row of every per-claim section table in
               lsei/lunar-scenario-explorer-map.md whose state column reads "modeled"
operation:     cmd: awk -F'|' '/^\| `[a-z-]+` \|/ {gsub(/^ +| +$/,"",$2); gsub(/^ +| +$/,"",$4); gsub(/^ +| +$/,"",$5); if($4=="modeled" && $5=="-") print $2}' lsei/lunar-scenario-explorer-map.md
conditions:    cwd: repository root, 55 characters. The map is generated from the artifact and the
               artifact is authority; this counts what the map prints. Excluded sections are counted
               separately and are not in this population: all ten of them carry tier "-" and all ten
               carry exclusion prose, which the map asserts explicitly.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     six modeled app sections carry no tier string: transmission-coefficient,
               net-value-identity, productive-mass-fraction, falling-launch-price, power-mass-break
               and signed-offtake-break. Naming any of them in an app_surface column turns every APP
               or BOTH verdict resolving that address into an axis-incomplete refusal, so no lunar
               axis names one; the Step 0 draft named two.
derived-from:  none
sampled:       n/a -- the operation reads a printed column of a generated file and prints the rows
               matching a literal value; it applies no classification rule
superseded:    none
```

```quantity
id:            Q-CARD-KWH-PER-KG
class:         fixed
value:         63 to 93 inclusive
unit:          kWh of thermal energy per kg of oxygen, converted from the CaRD brassboard's own
               g O2 per kWh thermal
population:    the four brassboard oxygen-yield figures on p. 6 of
               nasa-2023-card-carbothermal-reduction.md: 13.42, 11.53, 15.79 and 10.77 g O2/kWh
operation:     cmd: python -c "print(1000/15.79, 1000/10.77)"
conditions:    cwd: repository root, 55 characters. The conversion is the reciprocal times 1000 and
               nothing else; it assumes only that the source's g and kWh are the units it prints.
               The endpoints come from the extreme yields, 15.79 giving the low end and 10.77 the
               high end. The source states no measurement uncertainty and no replicate count beyond
               the four listed runs, so no error bar is derivable and none is stated here.
at:            2026-08-27; lsei 7f97983
predicate:     the CaRD brassboard's four reported yields correspond to 63.3 to 92.9 kWh of thermal
               energy per kilogram of oxygen. This is a unit conversion performed by this project,
               not a figure the source states; the source states grams per kilowatt-hour.
derived-from:  none
sampled:       n/a -- an arithmetic conversion of four printed figures, all four converted
superseded:    none
```

```quantity
id:            Q-LUWEX-KWH-PER-KG
class:         fixed
value:         15 to 44 inclusive
unit:          kWh per kg of water recovered, converted from LUWEX's own recovery energy efficiency
               in g/kWh
population:    the recovery energy efficiency figures for the four LUWEX experiments in
               kiewiet-2026-luwex-water-extraction.md: 44.51, 66.33, 32.80 and 22.88 g/kWh
operation:     cmd: python -c "print(1000/66.33, 1000/22.88)"
conditions:    cwd: repository root, 55 characters. Reciprocal times 1000. The endpoints come from
               the extreme efficiencies, 66.33 giving the low end and 22.88 the high end. The
               boundary is the source's own "recovery energy efficiency", being recovered water mass
               over total energy used, which spans extraction, capture and liquefaction; the
               source's separate "extraction energy efficiency" is a different and more favourable
               ratio and is not converted here.
at:            2026-08-27; lsei 7f97983
predicate:     LUWEX's four measured recovery energy efficiencies correspond to 15.1 to 43.7 kWh per
               kilogram of water recovered, across the integrated extraction, capture and
               liquefaction chain at up to 13 kg of simulant per run. This is a unit conversion
               performed by this project; the source states grams per kilowatt-hour.
derived-from:  none
sampled:       n/a -- an arithmetic conversion of four printed figures, all four converted
superseded:    none
```

```quantity
id:            Q-ESINTER-AGAINST-METERED
class:         fixed
value:         23 to 33 inclusive
unit:          the factor by which the only metered sintering energies in this corpus exceed the
               app's eSinter constant
population:    the app's eSinter = 3 MJ/kg (CONFIG, status ASSUMPTION, per the map's live
               coefficient values) against Liu 2025's metered whole-process figures of 69 MJ/kg for
               the mare simulant CLRS-1 and 98 MJ/kg for the highland simulant SC-080
operation:     cmd: python -c "print(69/3, 98/3)"
conditions:    cwd: repository root, 55 characters. The two figures are not drawn at the same
               boundary and the ratio is reported for that reason rather than in spite of it: Liu's
               is metered whole-process electrical energy at the wall for an 11 g charge in a 1000 W
               domestic microwave with a silicon-carbide susceptor, and eSinter is an app constant
               for product mass with no stated boundary. The comparison is a scale check, not an
               equivalence.
at:            2026-08-27; lsei 7f97983
predicate:     the only metered sintering energies in this corpus are 23 to 33 times the app's
               assumed eSinter of 3 MJ/kg. The ratio is computed by this project and neither source
               states it; the app's own tier string already declares the constant an ASSUMPTION, and
               this figure is the size of what that word is carrying.
derived-from:  none
sampled:       n/a -- an arithmetic ratio of two stated figures
superseded:    none
```

```quantity
id:            Q-FFIS-AGAINST-OLESON
class:         fixed
value:         0.251
unit:          tonnes per kWe, the specific mass of the only fission surface power point design in
               this corpus
population:    oleson-2022-deployable-fsp.md's Master Equipment List total of 10,046 kg for the
               three FSPS elements, at the stated 40 kWe design point
operation:     cmd: python -c "print(10046/1000/40)"
conditions:    cwd: repository root, 55 characters. The source states 3.98 W/kg on the same basis
               and this is its reciprocal in the app's units. The reactor element alone, at 7,334 kg
               final mass, gives 0.183 t/kWe; the NASA 2025 directive's 15 t allocation at a minimum
               100 kWe gives 0.150 t/kWe as a requirement rather than an achieved mass. The app's
               fFis is 0.16693 t/kWe, status SOURCED (fitted, D03 ACCEPT).
at:            2026-08-27; lsei 7f97983
predicate:     the only fission surface power point design in this corpus lands at 0.251 t/kWe for
               the delivered system, 1.50 times the app's fitted fFis of 0.16693 t/kWe, and 0.183
               t/kWe for the reactor element alone. The conversion is performed by this project; the
               source states W/kg and does not state a system-level specific power of its own.
derived-from:  none
sampled:       n/a -- an arithmetic conversion of one stated mass at one stated power
superseded:    none
```

```quantity
id:            Q-LCC15-LEAVES-READ
class:         fixed
value:         43
unit:          of the 58 [Q-LCC15-DISTINCT-LEAVES] named summaries, those opened at the passage
               carrying the encoded figure during sub-step 1.9
population:    the 58 [Q-LCC15-DISTINCT-LEAVES] distinct leaves named in the M rows
operation:     manual: The Space Resources Engineer; each named leaf was either opened at the
               passage carrying the figure its position field encodes, or not opened in this
               session; 58 items inspected, one per named leaf
conditions:    cwd: repository root, 55 characters. "Opened at the passage" means the figure,
               boundary and maturity statement in the position field were read from the summary in
               this session, whether by a full read or by a targeted read of the matching lines. A
               file opened only at its citation block or abstract is counted as not opened at the
               passage; li-2018 and cannon-2020 are counted that way.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     43 of the 58 summaries named by the fifteen lunar axes were opened at the encoded
               passage while authoring the rows; 15 carry positions forward from Step 0 reads and
               are the honest sampling target for a verification pass.
derived-from:  Q-LCC15-DISTINCT-LEAVES
sampled:       58 inspected by hand, 0 found wrong, by The Space Resources Engineer -- this
               operation is itself the hand inspection, and the fifteen unopened leaves are listed
               by name in section 5.5 so the claim is checkable rather than asserted
superseded:    none
```

---

## 5. Findings, and requirements this places on other sub-steps

### 5.1 On 1.10, the seventeen economics rows, running in parallel

Four things, and the first is the one that will cost time if it arrives late.

1. **Run the K2 check before authoring, not after.** K1 is easy to satisfy by hand once you know the
   rule. K2 is not, and it caught four keys of mine that I was sure of
   [Q-LCC15-KEYS-DEAD-K2]. Three of the four were the *app's* word for a quantity rather than the
   corpus's word. The economics equivalent is reaching for a term from the growth-accounting
   apparatus that the Japanese-corpus sources do not actually use.
2. **LCC-12 is authored here and is not to be duplicated.** It carries ten members across three sides:
   the closure case (Kornuta pair plus the four Sowers files), the conditional case (Jones 2019 and
   2020), and the two sources saying the question is not decidable as posed without a hurdle rate and
   a completed cost model (Shishko, McKeown). The technical half is mine; the discount rate and the
   demand side are his. Where our verdicts differ both stand, and neither is written into
   `axis_statement`.
3. **A side whose content is an absence is not a side.** I nearly gave the CLPS procurement documents
   their own side on LCC-11 because they state no per-kilogram price, and that would have been an
   absence wearing a side letter. It is a member of the surface side with a position saying what the
   documents contain. The `one_sided` class is where a real absence goes.
4. **The eighteen abbreviated author-year handles** [Q-ECON-REFS-ABBREV] **must become full normalized
   leaves.** I hit the same class of problem from the other end: `metzger-2021-aqua-factorem-2.md` on
   my LCC-06 resolves to nothing [Q-LCC-MEMBER-UNRESOLVED], and I have handled it by naming the
   omission in the surviving member's `position` per B6 rather than by dropping it silently.

### 5.2 On 3.6, which tunes two numbers

**The fixture set you asked for is here: fifteen `probe_pos` and fifteen `probe_neg` questions,
authored with the phrasing knowledge, not generated.** Three properties of the negative half that were
built in rather than accidental:

- **Every `probe_neg` touches at least one member file of its own axis and overlaps one or two of that
  axis's `match_keys`.** Zero overlap tests nothing; three or more is probably a true positive
  mislabelled as a negative, and I caught two of those in my own draft before the checker did (§2.4).
- **Three of the fifteen are exactly the failure case you recorded as open in 1.8 §3.5** — a key that
  is rare and high-IDF and *also* a topic token of the member's own filename. LCC-04's `probe_neg`
  touches `luwex` against `kiewiet-2026-luwex-water-extraction.md`; LCC-10's touches `krusty` against
  `poston-2020-krusty-reactor-design.md`; LCC-11's touches `clps` against the two CLPS files. If your
  narrow fix — excluding keys already spent on the filename match, reusing `confirmInText`'s
  `candidate.matchedTokens` — is right, all three should stop firing the detector and none of the
  `probe_pos` questions should stop firing the classifier. That is a measurable prediction rather than
  a hope.
- **LCC-03's `probe_neg` is the low-IDF pair case.** "At what temperature is water ice stable in a
  lunar cold trap?" overlaps `cold` and `trap`, two corpus-ubiquitous keys, and it must not fire.
  Your firing rule says mass rather than fraction for exactly this reason; this is the fixture that
  tests whether the constant honours it.

### 5.3 On The Editor, or the author: two rail-endpoint disclosures need a home

Neither is expressible in the ratified schema (§2.3) and both are mechanical, cheap, and about places
where an app rail runs past the evidence in the direction the model rewards. Each is one sentence
conditioned on two detent values.

- **`ice` at 10 or 20 wt%.** No observation in this corpus supports either; the highest figure any
  primary reports for Cabeus is 8.2 wt%, itself conditional on an assumed density, and Li 2026's
  ShadowCam search had a detection limit of 20 to 30 wt% and found no widespread surface ice above it.
  Water output scales as `E1/ice`.
- **`landed_cost` at its $1,000/kg floor.** Below every surface figure in this corpus and inside the
  *low Earth orbit* range, where Payload's $500/kg estimate and Jones's $67 to $900/kg sit.

**The right home is an FA deliverable cited at origin `findings`**, per §7 of the schema: each is an
assertion about the corpus with an author and a derivation. Two axes, one sentence each. I am
requesting them rather than encoding them, because the alternative — writing either into an
`axis_statement`, which the schema delivers verbatim as a neutral description of a disagreement —
would be the adjudication-by-presentation I accepted a ruling against in §1.2.

### 5.4 On The Engineer, at the merge and at 2.16

1. **The excluded-node app string is the exclusion sentence.** Four of my rows name excluded slugs in
   `app_surface`. Excluded nodes carry tier `-` and all ten carry exclusion prose. If the
   status-string reader looks only at the tier field, four axes refuse `axis-incomplete` on every
   question that touches them, and they refuse at the excluded nodes, which are exactly where the
   corpus rather than the app is doing the work. This is a one-line ruling and it should be made
   before 2.15 rather than discovered by a failing acceptance test.
2. **Nine of my eighty member rows exist only to satisfy B6.** Four `sowers-2019-*` files on each of
   LCC-04, LCC-06 and LCC-12; two `sanders-2025-*` files on each of LCC-05, LCC-07, LCC-08 and LCC-15;
   two `colaprete-2010-*` on LCC-01; two `kornuta-2019-*` on LCC-12; two `schreiner-2016-*` on LCC-08.
   Their `position` fields say so in as many words. When the merge collapses a cluster, those rows
   collapse with it and the `member_count` on the `H` row moves.
3. **`speyerer-2012-in-search-of-shade.md` is a member of LCC-09 on its own merits, not as a cluster
   duplicate.** It is a different paper from Speyerer 2013 and it carries the number that makes the
   methods disagreement concrete: 82 to 89 percent from the terrain-model simulations against 71
   percent from the higher-resolution image product, at the same most-illuminated pixel. Do not
   collapse the two.
4. **`nasa-2025-fission-surface-power-directive.md` lives under `programme-primaries/`, not
   `power-and-thermal/`**, which is where a reader would look for it and where my Step 0 draft assumed
   it was. It cost me one lookup and it is the cheapest possible illustration of why the member key is
   the leaf and not the path.

### 5.5 What I did not do, said plainly

Nothing here verifies that a member file supports the sentence beside it, except in the cases where I
read the passage and wrote the sentence from it in this session. **Fifty-eight distinct files are
named** [Q-LCC15-DISTINCT-LEAVES]**; forty-three were opened at the encoded passage and fifteen were
not** [Q-LCC15-LEAVES-READ], and those fifteen carry positions forward from Step 0 reads. They are
`sargeant-2020`, both `schreiner-2016` files, `sibille-2012`, `pappa-2021`, `belbin-2024`,
`shishko-2019`, `mckeown-2024`, the three non-headline `sowers-2019` files,
`kornuta-2019-commercial-lunar-propellant-architecture`,
`sanders-2025-nasa-lunar-isru-progress-review`, `li-2018` and `cannon-2020`. The gap closes by The
Fact-Checker's sampling read or it does not close, and the honest place to sample is those fifteen.

I have also not touched the standing tension, and it is not resolvable here. The Manager under his
economics prompt is authoring seventeen rows in parallel and where his touch mine — LCC-12 above all,
and the demand side of LCC-13 — my side is encoded as I see it. **LCC-13 is where I expect him to be
right and me to be incomplete**: the register now delivers a documented helium-3 market of thousands
of litres a year for neutron detection against an asserted fusion market, and a TRL discipline alone
never catches that, because the Wisconsin implantation and extraction experiments are real hardware.
He would have caught it from the demand side without reading a single TRL. **LCC-14 is where I expect
the reverse**: the app ranks construction ahead of propellant on plant-mass payback, and the only
metered sintering energy in this corpus is 23 to 33 times the constant that ranking rests on
[Q-ESINTER-AGAINST-METERED]. No amount of reasoning about whether an economy would compound on
sintered pads recovers that number.

Both gates are necessary and neither is prior. The register's job is to make an answer fail at
whichever one it fails at, and say which.

---

*The Space Resources Engineer, sub-step 1.9, Group 2.*
