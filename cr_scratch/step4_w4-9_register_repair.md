# Step 4, seat W4-9 — `oracle/REGISTER.lunar.tsv` source-verification repair

The A.10 step 2 verification sweep named seven defects across the fifteen lunar axes. All seven are
repaired here. Nothing else in the register was touched, no row was added or deleted, and the H row's
declared counts are unchanged because the row population is unchanged.

---

## The convention I picked, and why

Two conventions were offered for an unsourced clause: **strike it**, or **keep it and mark it as this
project's inference rather than the source's.** I picked **strike**, and applied it to every unsourced
clause below.

The reason is the semantics of the field it lives in. Field 5 of an `M` row is what the leaf named in
field 4 states. A consumer following a citation trace under `oracle/answer_contract.md` attributes
everything in that cell to that leaf — that is the whole point of the field. An inline marker such as
"(this project's inference)" would still sit inside a per-leaf cell, and every field-wise parser of
this file reads field 5 as one opaque value; the marker is prose to a human and invisible to the
machine. The marked clause would keep being served as the source's, which is the defect the sweep
found, one layer down and harder to see. Deletion cannot do that.

The convention has one arm, not two, and it is: **strike what the source does not say; correct what
the source says differently.** Defects 1 and 6 are the second kind — the file does assert a fact and
the register asserted a different one — so those two are corrected to the file's own statement rather
than deleted, because deleting there would throw away a fact the file actually carries. Defects 2, 3,
4 and 7 are the first kind and the clause is gone. Defect 5 is an axis statement, not a member cell,
and is narrowed until its own member rows stop contradicting it, using only wording those member rows
already carry.

No replacement claim was invented anywhere. Every new phrase below is either quoted from the file or
a negative statement of absence I measured myself.

---

## Read-digest and commands

Register before edit: `5e011c454ac29f66e5a10eb8d413060c4810f4b1564241d920d0deb8d293dc44`
Register after edit:  `8900cf5f02c685cb91d28ec0a46fc1e7f573b45960bf81def96b31bf9add008b`

The before-digest is byte-identical to the one recorded in `cr_scratch/relay/_filehashes.txt` line 1
and in `cr_scratch/relay/verify_lcc_01_08.md`, so this repair and the sweep that ordered it are
checking the same bytes. Every leaf digest I re-took below also matched `_filehashes.txt`.

```
sha256sum oracle/REGISTER.lunar.tsv
sha256sum literature/isru-processing/sowers-2019-psr-ice-mining.md
sha256sum literature/isru-processing/metzger-2021-aqua-factorem.md
sha256sum literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md
sha256sum literature/isru-processing/nasa-2023-card-carbothermal-reduction.md
sha256sum literature/isru-processing/leger-2025-energy-oxygen-moon.md
sha256sum literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md
sha256sum literature/programme-primaries/nasa-moon-to-mars-doc.md
sha256sum literature/space-economy-and-markets/mckeown-2024-space-resource-hurdle-rate.md

grep -in 'niac' literature/isru-processing/sowers-2019-psr-ice-mining.md
grep -in 'fund\|acknowledg\|Colorado School' literature/isru-processing/sowers-2019-psr-ice-mining.md
grep -in 'supersed\|duplicat\|aqua-factorem-2\|companion' literature/isru-processing/metzger-2021-aqua-factorem.md
grep -n '97.5\|98.3' literature/isru-processing/metzger-2021-aqua-factorem.md
find literature -name '*aqua*'
grep -rn 'aqua-factorem-2' .
grep -ic 'mare' literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md
grep -ic 'basalt\|highland' literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md
grep -Eic 'recycl|silicate' literature/isru-processing/nasa-2023-card-carbothermal-reduction.md
grep -in 'High-Ti\|site map\|mare' literature/isru-processing/leger-2025-energy-oxygen-moon.md
grep -in 'mare\|highland' literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md
sed -n '244,248p;272,278p' literature/programme-primaries/nasa-moon-to-mars-doc.md
grep -on 'not a requirements[^.,;]*\|requirements document' literature/programme-primaries/nasa-moon-to-mars-doc.md
grep -ni 'clos' literature/space-economy-and-markets/mckeown-2024-space-resource-hurdle-rate.md

node <scratchpad>/w4_9_repair.js      # field-wise edit, aborts if any expected substring is absent
tr -dc '\r' < oracle/REGISTER.lunar.tsv | wc -c
tr -dc '\n' < oracle/REGISTER.lunar.tsv | wc -c
awk -F'\t' '{print $1" "NF}' oracle/REGISTER.lunar.tsv | sort | uniq -c
```

Leaf digests re-taken, all matching `_filehashes.txt`:

```
4bb7c0363462f62c4c85ebc58c9a5fb67a36395bbb57f5b1a55cbc157946722e  literature/isru-processing/sowers-2019-psr-ice-mining.md
8fbd86a6ef977e3c6044a42c5c2c7b227b702dd02541fa51dfd3cfe9821c9dc8  literature/isru-processing/metzger-2021-aqua-factorem.md
e74515af7199d9b2219e4077da9a74291a6a14dc0939324f1349ad82e6372825  literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md
dcbc3106e81b63f9b9e6de6945bc507990857c578ee311418a4f222bb9e8b701  literature/isru-processing/nasa-2023-card-carbothermal-reduction.md
665cd81faa81dd872592f6c18a54fcce580401531616cc300eecd0a8dd968442  literature/programme-primaries/nasa-moon-to-mars-doc.md
fc3cfc7a67fae98723007737256638d42f4d72d46396b8cedf88d346d185fc3a  literature/space-economy-and-markets/mckeown-2024-space-resource-hurdle-rate.md
```

**Line-ending verification, at byte level.** `grep -c $'\r'` is the broken instrument here and was not
used. CR bytes were counted directly with `tr -dc '\r' | wc -c`: **0 before the edit and 0 after.** LF
bytes: 84 before, 84 after. The edit script reads and writes `latin1` (byte-transparent), refuses to
run if a CR byte is present on input, and refuses to write if one is present on output. Row widths
after the edit: `H` 6 fields x1, `A` 9 fields x15, `M` 5 fields x68 — unchanged, and the script aborts
on any width change or on a tab inside a replacement value.

---

## Defect 1 — LCC-06 A, `sowers-2019-psr-ice-mining.md` (register line 32)

**Before**

> Solar thermal sublimation under a capture tent at 500 kW for 1,600 t/yr of water at 4 wt%, NIAC and
> Colorado School of Mines concept level, with no dependence on the physical form the ice takes.

**After**

> Solar thermal sublimation under a capture tent at 500 kW for 1,600 t/yr of water at 4 wt%, a
> Colorado School of Mines concept-level study funded in part by the United Launch Alliance, with no
> dependence on the physical form the ice takes.

**Re-read against** `literature/isru-processing/sowers-2019-psr-ice-mining.md`, lines 26, 32, 56, 205.

`grep -in 'niac'` returns exactly one line in the whole file, line 205, and it names NIAC only as the
*other* document:

> "This work stands in a defined relation to the NIAC Phase I final report summarized in this folder
> as sowers-2019-thermal-mining-niac.md, which shares a first author and year but **is a separate
> document**. The journal article ... reports the 2017 ULA-driven architecture study" (L205)

The file's own funding attribution, twice:

> "Colorado School of Mines, Golden, Colorado (both authors) ... **funded in part by the United Launch
> Alliance per the article's funding statement**" (L26)

> "The article's funding statement records that **the United Launch Alliance funded some of the
> research**, the same party that set the price the study evaluates." (L56)

Concept level, retained and independently supported:

> "The paper reports analytical and design results only. It presents no hardware test, and it
> identifies laboratory testing under cryogenic vacuum as the next step." (L32)

This is a *correction*, not a strike: the file does state a funder, and it is not NIAC. The struck word
is replaced by the file's own.

---

## Defect 2 — LCC-06 B, `metzger-2021-aqua-factorem.md` (register line 35)

**Before**

> The companion report carrying the same 98.3 and 97.5 percent figures and the grain-size premise of
> roughly 70 micrometres from M3 or 8 micrometres from LCROSS; the third member of this cluster,
> metzger-2021-aqua-factorem-2.md, is a superseded duplicate held outside the corpus and is named here
> so its absence is recorded rather than silent.

**After**

> The companion report carrying the same 98.3 and 97.5 percent figures and the grain-size premise of
> roughly 70 micrometres from M3 or 8 micrometres from LCROSS.

**Re-read against** `literature/isru-processing/metzger-2021-aqua-factorem.md`, lines 40, 69-70, 242,
254.

Retained content, verbatim in the file:

> "63.4 wt% (mare) and 45.0 wt% (highlands) tailings rejection in single-pass magnetic separation,
> **98.3 percent surface power reduction** against a published thermal-extraction baseline" (L40; the
> derivation is at L242, "divides by 24 hours to give 49.7 kW, reported as 50 kW and as a 98.3 percent
> power reduction")

> "800 kW of thermal extraction, a **97.5 percent power reduction**, with greater than 99 percent" (L254)

> "Grain size estimates cited are **approximately 70 micron from Moon Mineralogy Mapper (M3)**
> near-infrared reflectance of surface frost, and **approximately 8 micron mean from the** [LCROSS
> impact ejecta]" (L69-70)

Struck content, and the measurement that condemns it:

- `grep -in 'supersed\|duplicat\|aqua-factorem-2\|companion\|second report\|outside the corpus'` over
  the whole file returns **no output**. The file says nothing about a duplicate, superseded or
  otherwise.
- `find literature -name '*aqua*'` returns exactly two files: `metzger-2020-aqua-factorem.md` and
  `metzger-2021-aqua-factorem.md`. **`metzger-2021-aqua-factorem-2.md` does not exist on the shelf.**
- `grep -rn 'aqua-factorem-2' .` finds it only in `cr_scratch/` working notes, in
  `tools/probe_register_encoding.js` (a fixture list), and in this register row itself. The row was the
  only load-bearing carrier of a filename that names nothing.

A row that records the absence of a file whose absence is total is not bookkeeping, it is a dangling
reference that the register asserts against a leaf which never mentions it. Struck.

---

## Defect 3 — LCC-08 A, `sargeant-2020-hydrogen-reduction-ilmenite-static.md` (register line 41)

**Before**

> Hydrogen reduction of ilmenite in a static bed; the route needs ilmenite-rich feedstock, which is a
> mare mineralogy.

**After**

> Hydrogen reduction of ilmenite in a static bed; the route needs ilmenite-bearing feedstock.

**Re-read against** `literature/isru-processing/sargeant-2020-hydrogen-reduction-ilmenite-static.md`,
lines 5, 17, 24, 40.

Measured: `grep -ic 'mare'` returns **0**. I also ran `grep -ic 'basalt\|highland'`, which returns
**0**. This file makes no lunar-terrain statement of any kind; it is a ProSPA breadboard study on pure
ilmenite samples. The clause is an external petrological fact — true in the general literature,
absent from this leaf — so under the convention it is struck rather than marked.

The retained half is the file's own, and I tightened "ilmenite-rich" to the file's word:

> "hydrogen reduction of ilmenite performed in **a static reactor**, as opposed to the usual
> flowing-hydrogen configuration, for the ProSPA analytical module" (L17)

> "this could ultimately be a viable technique for producing oxygen from **ilmenite-bearing lunar
> regolith** with ProSPA" (L40)

"ilmenite-rich" appears nowhere in the file; "ilmenite-bearing" is the source's own adjective and is
what the row now carries. That is a tightening toward the source, not a new claim.

**The mare fact is not lost from the axis.** LCC-08 A's other member row, line 42
(`leger-2025-energy-oxygen-moon.md`), carries it and was verified SUPPORTED: "the paper own site map
favours High-Ti mare regions." The mare-terrain content stays on the row whose file actually asserts
it.

---

## Defect 4 — LCC-08 C, `nasa-2023-card-carbothermal-reduction.md` (register line 45)

**Before**

> Carbothermal reduction takes any silicate and needs carbon recycling rather than a particular
> mineral.

**After**

> Defines the carbothermal route by the generic reaction SiO2 + 2C -> Si + 2CO and names no required
> feedstock mineral.

**Re-read against** `literature/isru-processing/nasa-2023-card-carbothermal-reduction.md`, lines 31,
39, 40, 42, 49.

Measured: `grep -Eic 'recycl|silicate'` returns **0**. The word "silica" occurs (L40, terrestrial
silicon production) but "silicate" does not, and "recycl" does not occur at all. `grep -ic 'carbon'`
returns 3, and reading all three shows solid carbon as a *reagent* and methane pyrolysis as a
terrestrial technology under development — not a recycling loop this deck claims for its own process.

What the file does state about feedstock, which is the whole of it:

> "The carbothermal reduction process is defined on the scope slide by the reaction **SiO2 + 2C -> Si
> + 2CO** (p. 1)." (L42)

The new wording quotes that reaction and then makes a negative statement of absence — "names no
required feedstock mineral" — which I verified by reading the file for any feedstock-mineralogy
requirement and finding none. Negative-absence claims are this register's established idiom (line 17,
"the paper states no excavation depth or sampled volume anywhere"; line 37, "the paper states no
specific-energy figure as such"), and unlike "takes any silicate" a negative claim cannot overstate
what the source licenses.

I did **not** carry over the verification record's reading that the bare reaction "loosely supports"
the positive claim "not a particular mineral." A generic reaction formula licenses a statement about
what the source does *not* require; it does not license a positive universal about what the route
*accepts*. That distinction is the difference between the defect and the repair.

**"Any silicate" is not lost from side C.** LCC-08 C's other member, line 46
(`colozza-2010-solar-lunar-oxygen.md`), states it and was verified SUPPORTED: "Carbothermal at 1900 C
on any silicate, with an assumed O2 yield of 15 to 20 wt% independent of ilmenite content." Side C
still carries the claim, now on the row whose file makes it.

---

## Defect 5 — LCC-08 axis statement, OVERSTATED (register line 9, field 6)

**Before**

> Oxygen production routes state their energy per kilogram against different feedstocks, and every
> landing site in this corpus architecture studies is polar highland terrain.

**After**

> Oxygen production routes state their energy per kilogram against different feedstocks, and the
> siting assessments in this corpus split between polar highland regolith and High-Ti mare regions
> rather than converging on one terrain.

**Re-read against** the two member rows of this same axis that contradicted the universal quantifier.

`literature/isru-processing/leger-2025-energy-oxygen-moon.md` L16 — I confirmed the phrase myself:

> "A location-dependent assessment maps favorable production sites (**High-Ti Mare regions**)."

`literature/programme-primaries/sanders-2025-nasa-isru-progress-review.md` L74-75:

> "**TRL 5/6** for polar highland regolith." (L74, MRE and carbothermal)
> "**Hydrogen/CO reduction of mare regolith — advanced to TRL 5**" (L75)

The word that made the statement false was **"every."** One counterexample inside the axis's own
member set falsifies it, and there are two. The narrowed statement asserts only the split that those
two SUPPORTED rows jointly establish, and it uses their own terms — "polar highland regolith" is
Sanders' phrase at L74, "High-Ti Mare regions" is Leger's at L16. No new terrain, source or claim was
introduced.

The axis keeps its `false_pair` tension. Field 5, the axis of disagreement — "the feedstock the route
requires: ilmenite-rich mare regolith, any regolith, or any silicate" — is untouched and still carries
the pairing, and the seed question in field 8 ("Does the ilmenite reduction energy figure apply at a
south polar landing site?") is now a live question rather than one the axis statement had already
answered wrongly.

---

## Defect 6 — LCC-10 A, `nasa-moon-to-mars-doc.md`, CONTRADICTED (register line 55)

**Before**

> The Moon to Mars Architecture Definition Document Revision C (NASA/TP-20250010956) adds a Lunar
> Nuclear Fission System to the element list and states no power rating, no mass allocation and no
> specific mass for that element; **its data-gaps catalog states only a target of scalable multi-kWe
> generation and cites the 2018 KRUSTY ground test as state of the art.** The document says of itself,
> repeatedly, that it is not a budget, requirements, procurement or manifest document.

**After**

> The Moon to Mars Architecture Definition Document Revision C (NASA/TP-20250010956) adds a Lunar
> Nuclear Fission System to the element list and states no power rating, no mass allocation and no
> specific mass for that element; **gap 0901 of its Appendix D technology-gap catalog, not its
> data-gap catalog, states the target of scalable multi-kWe generation and cites the 2018 KRUSTY
> ground test as state of the art, the Appendix E data-gap catalog being a separate Revision C
> category of information needs that the document excludes from downstream capability-area mapping.**
> The document says of itself, repeatedly, that it is not a budget, requirements, procurement or
> manifest document.

**Re-read against** `literature/programme-primaries/nasa-moon-to-mars-doc.md`, lines 246, 274, 276.

Where the content actually sits — L246, under the heading "**Power Systems (09xx)**", which is inside
the technology-gap catalog section:

> "**0901, Scalable Lunar Surface Power Generation** (rank 13, bin 2): SOTA is ISS's roughly 200 kW
> solar-plus-battery system ...; **a single brief 2018 ground test of a kW-scale fission system
> ("KRUSTY") is also cited as SOTA; target is scalable multi-kWe generation** extending crewed
> operation through shadowed periods."

That the two catalogs are distinct, and that the register named the wrong one — L274 (section heading)
and L276:

> "#### J. Architecture-driven data gaps (Section 3.3, **Appendix E**): NOTED FOR COMPLETENESS, OUT OF
> SCOPE FOR CAPABILITY-AREA MAPPING" (L274)

> "the **data-gap catalog** below is documented here for completeness but is **excluded from the
> downstream capability-area (a)-(h) / five-area mapping, which draws exclusively on the Appendix D
> technology-gap catalog** covered in Sections F-I above. **Data gaps are a category new to Revision C
> and express information needs, distinct from technology needs.**" (L276)

This is the second *correction* rather than a strike: the multi-kWe target and the KRUSTY citation are
both genuinely in the file, at L246, and only the catalog they were attributed to was wrong. Striking
would have thrown away two real facts to fix a mislabel.

The unchanged halves were re-verified, not assumed. The element carries no rating in the element table
at L96 and its formal function mapping at L105 lists "only 3 functions (power generation, distribution,
and payload power provision at the South Pole)" with no power or mass figure. The self-disclaimer list
including the word "requirements" is exact: `grep -on 'not a requirements[^.,;]*'` returns L361, "**not
a requirements or budget document**", and L11 and L25 carry the budget/procurement/manifest terms.

---

## Defect 7 — LCC-12 C, `mckeown-2024-space-resource-hurdle-rate.md` (register line 74)

**Before**

> About 25 percent is the appropriate hurdle rate for development-stage space resource projects,
> conditional on a legal regime, with 10 percent proposed for reporting; the choice of rate changes
> what closing means.

**After**

> About 25 percent is the appropriate hurdle rate for development-stage space resource projects,
> conditional on a legal regime, with 10 percent proposed for reporting.

**Re-read against** `literature/space-economy-and-markets/mckeown-2024-space-resource-hurdle-rate.md`,
lines 120-128.

Retained content, verbatim:

> "The article concludes that a hurdle rate "**in the range of 25%**" is an appropriate starting point
> for evaluating commercial space resource development-stage projects, **conditional on a suitable
> legal/regulatory regime being in place** ... The paper **separately proposes a standardised 10%
> discount rate for project valuation/NPV purposes** across a prospective space resources industry,
> explicitly modelled on the US SEC's mandated 10% discount rate for oil & gas reserve reporting (the
> "PV-10" convention)" (L120-128)

Struck clause, and the measurement: `grep -ni 'clos'` over the full file returns eleven hits and **not
one of them is about closing a business case**. They are "closest overall analogue" (L75), "UNCLOS"
(L76), "disclosure"/"disclosed" (L78-80, L135, L139, L269, L276), and "undisclosed" (L156). The source
never says the choice of rate changes what closing means. It is a fair inference from the 8%-to-30%+
spread the paper documents, and it is exactly the kind of inference that, sitting unmarked in a per-leaf
cell, gets served to a reader as McKeown's conclusion. Struck.

---

## Records I refuted

**None of the seven findings.** I re-measured every one against the file before touching its row and
every one held: `grep -ic 'mare'` = 0 in Sargeant, `grep -Eic 'recycl|silicate'` = 0 in the CaRD deck,
`grep -in 'niac'` = one line naming the companion, the mckeown "clos" hits all unrelated, the
moon-to-mars catalog separation stated in the file's own section heading. I additionally confirmed the
coordinator's independent claim that `metzger-2021-aqua-factorem-2.md` does not exist anywhere under
`literature/`.

**One reading in a record I declined to adopt.** `verify_lcc_01_08.md` L208 argues that the bare
reaction `SiO2 + 2C -> Si + 2CO` "loosely supports" the register's positive claim "not a particular
mineral." I disagree and did not carry that phrasing into the repaired row. A generic reaction formula
supports a statement about what the source does *not* require; converting it into a positive universal
about what the route *accepts* is the same move that produced the defect. The row now makes the
negative claim only. This changes nothing about the record's verdict — the row was PARTIAL and is
repaired — only about the wording of the repair.

**One premise in my own brief, measured wrong.** The brief states the `run_suite` baseline as "405
rows, 33 pass, 4 fail, 368 unrun." Measured at this digest, before I edited anything, it is **455 rows,
33 pass, 4 fail, 418 unrun**, of which 7 DEFERRED, 0 VACUOUS, 411 unbound. The pass and fail figures —
the ones that matter for "did my repair move a gate" — are exactly as briefed; the row and unrun counts
are 50 higher because other Wave 4 seats have added suite rows since the brief was written. The brief's
figures are stale, not wrong, and the gate verdict below is unaffected.

---

## Gates, before and after

Baseline taken immediately before the edit, at register digest `5e011c45...`; after-figures at
`8900cf5f...`.

| Gate | Before | After | Moved |
|---|---|---|---|
| `node tools/check_registers.js` | 0 hard failures | 0 hard failures | no |
| `node tools/verify_corpus.js` | 39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT; 1 hard failure | 39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT; 1 hard failure | no |
| `node oracle/tests/run_suite.js` | 455 rows, 33 pass, 4 fail, 418 unrun; 4 hard failures | 455 rows, 33 pass, 4 fail, 418 unrun; 4 hard failures | no |

**Nothing moved.** The four standing suite failures argued in `af7abec` are still four and were not
touched. The single `verify_corpus` FAIL (`PTH/A3`, naming-ceiling breaches) is still one and is not
mine. `check_registers` reports its read-digest as `7cb1087d8cef4160` over 293 files after, against
`8838282c37a34fb9` over 290 before; the digest and file count moved because other seats wrote files
during my sitting and because this deliverable is itself one of the counted files. The verdict — 0 hard
failures — is identical.

Structural invariants re-checked after the edit: 1 `H` row at 6 fields, 15 `A` rows at 9 fields, 68 `M`
rows at 5 fields, CR bytes 0, LF bytes 84. **The H row's field 5 (15 axes) and field 6 (68 members) are
unchanged and were correctly left alone**, because this repair edited seven existing cells and added or
removed no row.

---

## Not mine

- **`verify_corpus` `PTH/A3`**, three naming-ceiling breaches — the standing single FAIL. Pre-existing,
  unrelated to any register cell, owner elsewhere. Untouched.
- **The four standing `run_suite` failures**, argued in `af7abec`. Explicitly not mine to silence, and
  not silenced.
- **`oracle/REGISTER.econ.tsv`** — another seat's this wave. Not opened, not written.
- **`tools/probe_register_encoding.js` line 59** carries `'metzger-2021-aqua-factorem-2.md'` in a
  hardcoded fixture list. It is a probe fixture, not a claim about the shelf, and it is outside my write
  set; I am recording it because the filename it names does not exist and a future reader of that file
  will wonder. Whoever owns `tools/` should decide whether the fixture is deliberate.
- **`AMC-5` WARN rows** in `check_registers` — 8 (target, section) pairs carrying more than one owed
  amendment, including 3 against `oracle/REGISTER.lunar.tsv` "quantity blocks" (AM-78, AM-79, AM-80).
  Pre-existing at the baseline, unchanged by this repair, and belonging to the amendment ledger rather
  than to source verification.

---

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```

---

# Addendum — downstream propagation sweep

Ordered by the orchestrator after the economics seat found that one of its own six register repairs
had already been laundered out of a `position` clause into `oracle/mechanism_table.md` MT-09 and MT-17.
The finding generalises, and nobody had run the sweep for my seven. This is that sweep.

**It was actually run, and it comes back almost empty. Two hits, both real, both routed, neither
repaired by me.** An empty sweep that was run beats a clean assumption, so the negative result is
stated file by file below rather than summarised as "nothing found."

## Method

The search is on **the struck text, not the row ids**, because the whole hazard is that a clause
travels without the id that would let you find it. Three passes: exact struck phrases, then the
subject matter of each defect in case a derived artifact paraphrased rather than copied, then a census
of everything that names the register at all.

```
# pass 1 -- the struck and corrected phrases themselves
for p in "mare mineralogy" "carbon recycling" "aqua-factorem-2" "changes what closing means" \
         "polar highland terrain" "ilmenite-rich" ; do
  grep -rn --exclude-dir=.git --exclude-dir=lsei --exclude-dir=cr-agents "$p" . ; done
grep -rniE --exclude-dir=.git --exclude-dir=lsei --exclude-dir=cr-agents \
  'every landing site|state their energy per kilogram' .

# pass 2 -- subject matter, in case of paraphrase rather than copy
grep -rniE 'niac|sowers|aqua.factorem|supersed|sargeant|krusty|multi-kWe|data.gap|moon.to.mars|mckeown|hurdle|carbothermal|silicate|recycl' \
  oracle lunar-oracle-gameplan.md accumulator.md cr_scratch/step0_integration_draft.md

# pass 3 -- who actually derives from this register at all
grep -rln --exclude-dir=.git --exclude-dir=lsei --exclude-dir=cr-agents 'REGISTER\.lunar' .
```

Pass 3 returned 49 files and is how I extended the orchestrator's candidate list. It added
`oracle/tests/answering_loop_suite.md`, which was not on that list and which is where both hits are.

## Result, file by file

| Artifact | Swept for | Result |
|---|---|---|
| `oracle/mechanism_table.md` | all seven | **CLEAN.** 2 hits on the pattern, both `metzger-2013-bootstrapping-space-industry.md` at lines 570-571 — a different Metzger paper on a different axis. No lunar-register field-5 text reaches this file. |
| `oracle/acceptance/lunar_questions.md` | all seven | **CLEAN.** One hit, SRQ-7 line 62, citing `sanders-2025` for the MRE TRL, untouched by any of my seven. SRQ-6 and SRQ-12 do cite `nasa-2023-card-carbothermal-reduction.md`, but for its landed-cost figure (LCC-11 B) and its four O2 yields (LCC-07 C) — both verified SUPPORTED, neither repaired. |
| `oracle/question_classes.json` | all seven | **CLEAN, and worth saying why it looks like a hit.** Line 377 `bound-oxygen-mare` carries `probe_pos`: "Where on the Moon is the ilmenite-rich mare feedstock...". That mirrors **field 5** of the LCC-08 A row — the axis-of-disagreement label, "the feedstock the route requires: ilmenite-rich mare regolith, any regolith, or any silicate" — which I did **not** touch and which was not a defect. It is a router probe question, not a claim about a source. No change owed. |
| `oracle/thin_patches.json` | all seven | **CLEAN, and one line actively agrees with the repair.** Line 346: "the Aqua Factorem set is **two rather than three**" — an independent statement that the third member does not exist, written before my repair and consistent with it. Line 73 cites `nasa-moon-to-mars-doc.md` for dust mitigation, unrelated to the catalog defect. |
| `oracle/router/excluded_nodes.json` | all seven | **CLEAN, structurally, which is the strongest form of clean.** The generated file carries `axis` / `side` / `stem` / `leaf` / `field` per member and **no `position` text and no `axis_statement`**. Measured: `grep -cE 'mare mineralog\|carbon recycl\|NIAC\|aqua-factorem-2\|closing means\|every landing site\|data-gaps catalog'` = **0**. No struck text can reach it by construction, so there is nothing to report to the router owner and no regeneration owed. |
| `oracle/transfer_gate.md` | all seven | **CLEAN.** Zero hits on either pass. |
| `lunar-oracle-gameplan.md` | all seven | **CLEAN.** One hit, B4 line 629, on cluster *counting*, not on any struck claim. |
| `accumulator.md` | all seven | **CLEAN.** Zero hits. |
| `cr_scratch/step0_integration_draft.md` | all seven | **CLEAN.** One hit, line 578, the same cluster-count contest as B4. |
| **`oracle/tests/answering_loop_suite.md`** | all seven | **TWO HITS — RFX-08 and RFX-10.** Not on the orchestrator's candidate list; found via pass 3. Detailed below. |

## The two hits, and why I did not touch either

Both are a **different shape from the econ seat's MT-09 and MT-17.** MT-09 laundered a wrong
attribution into a derived artifact where it read as truth. These two do the opposite: they **record
the defect correctly**, name its owner, and state its close condition. They are not wrong. They are
*stale in their status cell only*, because the condition they name is now discharged.

**`oracle/tests/answering_loop_suite.md:483`, RFX-08, status `RED`**

> "**A.10 step 2 GATE FAILURE on the `axis_statement`, which §7 ships VERBATIM into the answer:**
> OVERSTATED — the statement says every landing site in the corpus's architecture studies is polar
> highland; `leger-2025` favours High-Ti mare and `sanders-2025` classes mare hydrogen/CO reduction at
> TRL 5. **Owner: The Space Resources Engineer.** Close, and it is an observation not a date: the
> statement is narrowed to what the members support, and this fixture re-runs green."

Discharged by defect 5 above. The statement is narrowed and is no longer contradicted by rows 42 and 47.

**`oracle/tests/answering_loop_suite.md:485`, RFX-10, status `RED`**

> "**A.10 step 2 GATE FAILURE:** side A `nasa-moon-to-mars-doc.md` — the kWe target and the KRUSTY
> citation sit in Appendix D's technology-gap catalog, not the data-gaps catalog the side claim names.
> **Owner: The Space Resources Engineer.** Close, and it is an observation not a date: the side claim
> is repaired against the summary, or the member is moved to the file that carries the figure, and this
> fixture re-runs green."

Discharged by defect 6 above, on the first of the two branches it offers: the side claim is repaired
against the summary, and the member stays where it is.

**Three reasons I report these rather than flip them to `green`, and the third is decisive.**

1. **Owner.** Both cells name The Space Resources Engineer. The orchestrator's widening was explicit
   that my write set does not extend to what another seat is holding.
2. **Freeze, and standing rule 9.** These are suite rows. "A test believed wrong is argued, not edited
   to pass," and flipping `RED` to `green` is the definition of editing a test to pass.
3. **`UNRUN IS NOT PASS`, and this is the one that settles it.** Both close conditions say the fixture
   "re-runs green." I measured whether it can. The `RFX` block is **35 rows, 0 pass, 0 fail, 35 unrun**,
   and the four hard suite failures are `PTH-13`, `MRG-4b`, `MRG-9` and `MRG-10` — no `RFX` row among
   them. These fixtures have **no executable binding**; they are 2 of the 411 unbound rows. Nothing can
   re-run, so writing `green` into the cell would assert a run that never happened and convert an unrun
   row into a claimed pass. That is precisely the failure the suite's own banner exists to prevent, and
   it would be a worse defect than the stale cell it fixed.

**Routed to The Space Resources Engineer:** RFX-08 and RFX-10 in `oracle/tests/answering_loop_suite.md`
lines 483 and 485. Both close conditions are discharged in `oracle/REGISTER.lunar.tsv` at digest
`8900cf5f02c685cb91d28ec0a46fc1e7f573b45960bf81def96b31bf9add008b`. The status cells are the owner's to
move, and moving them honestly means binding the fixture, not editing the cell.

## Deliberate non-edits

`grep` also returns the struck text from earlier waves' scratch deliverables —
`cr_scratch/step0_space_resources_engineer_question_surface.md`,
`cr_scratch/step1_9_space_resources_engineer_register_rows.md` and its addendum,
`cr_scratch/step1_8_software_engineer_register_schema.md`, `cr_scratch/step2_engineer_identity.md`,
`cr_scratch/step2_orchestrator_verification.md` — and from the two verification records
`cr_scratch/relay/verify_lcc_01_08.md` and `verify_lcc_09_15.md`, which quote every defective clause as
the evidence that condemns it.

**None of these is repaired, deliberately.** They are dated records of what was written and what was
found at the time. Editing them would falsify the audit trail that makes this repair checkable, and a
verification record with the defect silently removed from its own quotation is worse than useless.

`cr_scratch/sre_w4/probes.json` is a live Wave 4 file belonging to another seat and carries only the
untouched field-5 probe wording. Not mine, and nothing owed on it.

## `tools/probe_register_encoding.js` — verified handled, not assumed

The orchestrator routed this to the loop seat and asked me to confirm rather than assume. **It is
genuinely handled, and the seat reached it during my sitting.** The bare fixture entry that sat at line
59 when I first swept is now at line 70, under a thirteen-line comment at lines 59-69 that names this
very repair:

> "**DELIBERATE NON-RESOLVER, and it must stay one.** `metzger-2021-aqua-factorem-2.md` resolves to no
> file, in `lsei/literature/` or in `literature/`. It is not an assertion that such a file exists —
> **the lunar register's 'superseded duplicate' clause that once supplied that basis has been struck as
> unsourced, and this comment replaces it.** What the name IS, is the measurement subject of
> `Q-LCC-MEMBER-UNRESOLVED` = 1... Delete it and the instrument stops reproducing a governed figure the
> schema still cites, which is a worse defect than a name that resolves nowhere in a fixture whose whole
> job is to count the names that resolve nowhere."

I ran its known-answer test rather than reading the comment and believing it:

```
node tools/probe_register_encoding.js --selftest
  ok    REFERENCES        expected 67  got 67
  ok    UNRESOLVED        expected 1  got 1
  ok    UNRESOLVED-NAMES  expected "metzger-2021-aqua-factorem-2.md"  got "metzger-2021-aqua-factorem-2.md"
RESULT  PASS
```

The phantom name is a fixture the probe **measures**, not a claim the probe **makes**, and it never was
a field-4 member basename in the register — it lived only inside the prose of field 5, which is exactly
what I struck. The `## Not mine` entry I filed in the main body is therefore closed: no action owed, and
my earlier note that "whoever owns `tools/` should decide whether the fixture is deliberate" is
superseded by the seat having decided, in writing, with a selftest guarding the decision.

## Gates after the sweep

No file was written in this pass. Re-measured anyway, because a sweep that reports gate figures it did
not take is the same defect one layer up.

| Gate | After repair | After sweep | Moved |
|---|---|---|---|
| `node tools/check_registers.js` | 0 hard failures | 0 hard failures | no |
| `node tools/verify_corpus.js` | 39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT | 39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT | no |
| `node oracle/tests/run_suite.js` | 455 rows, 33 pass, 4 fail, 418 unrun | 455 rows, 33 pass, 4 fail, 418 unrun | no |
| `node tools/probe_register_encoding.js --selftest` | not taken | PASS | n/a |

Register digest unchanged at `8900cf5f02c685cb91d28ec0a46fc1e7f573b45960bf81def96b31bf9add008b`.
CR bytes, counted directly with `tr -dc '\r' | wc -c`: **0**.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```
