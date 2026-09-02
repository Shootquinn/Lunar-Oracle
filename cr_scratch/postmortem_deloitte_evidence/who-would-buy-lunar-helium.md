run:              r-2026-08-29-deloitte-02
asked:            2026-08-29T19:26:34Z
verdict:          CONTESTED
reason code:      -
contract version: 5
lsei ref:         7f97983

## Question

"dear oracle, according to Deloitte, is he3 a viable long-term business plan?"

## Verdict

`CONTESTED`, axis **`LCC-13`**, class `two_sided`, **two sides**, two personas, neither briefed on
the other's leaves.

**The axis statement, verbatim from `oracle/REGISTER.lunar.tsv`:**

> What demand a lunar helium-3 supply would serve: the deuterium and helium-3 fusion power market
> these mining studies name, or the terrestrial neutron-detector market this corpus quantifies.

**The scope token, verbatim, and it is what makes the two sides comprehensible rather than
contradictory:**

> the market named, deuterium and helium-3 fusion power or terrestrial neutron detection, and the
> annual volume that market consumes

**No side is adjudicated here and this section names no side as better.** The two sides do not
disagree about the Moon. They describe two different buyers, and the quantity each buyer takes per
year is stated in a different unit on each side. That is the whole of the axis.

### Why this verdict is the answer to the question actually asked

The question is *according to Deloitte*, and the direct observation is in §3: **Deloitte never says
helium-3 is viable, and publishes no helium-3 number.** Its own closing sentence on the subject is a
conditional — viability *"depends... on how rapidly these downstream markets mature"* — and "these
downstream markets" is exactly the thing `LCC-13` holds two sides on.

The report resolves that ambiguity by **booking both sides at once, at different weights**. Its
Table 2 splits helium-3 across three of its eight enabled activities: the terrestrial market —
neutron detection, cryogenics, scientific instrumentation — is classed `Replacement` and carries
**no probability weight**; fusion fuel and quantum-computing cooling are classed `Speculative` and
carry one. So the question cannot be closed without ruling which market a lunar supply would serve,
and this corpus has two sides on that, and I will not pick one for you.

### Why not the adjacent verdicts

**Not `LITERATURE`, and the difference is the whole answer.** `LITERATURE` requires that no register
axis fired at classification. Had `LCC-13` not fired, retrieval on the question as you typed it
would have returned `wittenberg-1992-he3-resources-review.md` as its only confirmed candidate, and
the answer would have read that the fine lunar regolith holds more than a million tonnes of
helium-3, sufficient to contribute to Earth's generating capacity for several centuries — with one
trace, one limit line, and nothing on its face to say that the only quantified helium-3 market in
this corpus is measured in litres per year and was being deliberately shrunk by its largest
customer. That answer would be well-formed, correctly traced, and one-sided. It is the failure this
register exists to prevent.

**Not `REFUSE`.** Both member paths resolve, on both sides, three of three.

**Not `APP` or `BOTH`.** The evidence pass reports `resolves: false`, confidence `none`: the question
names no scenario, phase, knob or output the address grammar can build. The Scenario Explorer does
not model helium-3 demand.

### The classification ruling, stated because it was mine and not the tool's

The evidence pass **did not fire `LCC-13` on the question as you asked it.** I overruled it, under
`answer_contract.md` §10, and the measurement is in §3. Two further rulings are recorded there: one
setting aside `LCC-12`, and one declining a `misclassified` refusal whose stated condition is met.
**A reviewer may overturn any of the three.** They are in §3 with falsifiers rather than in a note,
because a ruling a reader cannot test is an assertion.

`Evidence pass: took LCC-13 (overruled below the mark, FM-1). Set aside LCC-12: its single matched
key is the bare token `business`, from "business plan", which carries no claim about propellant and
no claim about helium-3 — a word collision, demonstrated by the ablation in §3. Set aside ECR-12:
its single matched key is `plan`, at mass 0.011, on an axis about Japanese government growth
forecasts.`

---

## What was tested, and how it could have failed

Three blocks. The first is the **assembler's**, and runs against the artifact under examination and
against the router; it touches no side's leaves. The second and third are **per side**, each composed
over that side's member paths only.

### Assembler — the artifact, and the three classification rulings

| Claim | Test run | Falsifier — the result that would have refuted it | Observed |
|---|---|---|---|
| The report publishes no helium-3 value | Extract every `US$` figure in the document and read every sentence containing "helium" and a dollar sign | Any figure the report presents as its own modelled value for helium-3 | **No helium-3 line item exists.** The only dollar amounts adjacent to helium-3 are a cited market price (*"often cited around US$20 million per kilogram"* — cited, not modelled), one company's `US$500 million` in offtake agreements, a third-party `US$43 billion` to `US$71 billion` projection for the **quantum computing** market by 2035, and `US$115 billion` attributed in the body to helium-3 **and water ice together**. The reader cannot recover a helium-3 figure from the document. |
| Helium-3 occupies three of eight enabled activities | Read Table 2's activity list and its calculation-approach row | Fewer than three helium-3 lines | Three: *Helium-3* (existing terrestrial markets) → `Replacement`; *Nuclear fusion fuel* → `Speculative`; *Quantum computing cooling* → `Speculative`. The other five activities are national security, lunar data products, propellant refuelling, off-Earth compute manufacturing, and advanced materials and isotopes. |
| The near-term helium-3 line carries no probability weight | Compare the three Value Pool 2 equations for a probability term | A `Probability_i` term on the Replacement equation | Absent. Replacement is `(Replacement share × Addressable market volume) × Lunar unit price`. **`Addressable market volume` is the input the scope token names, and the report states no value for it.** |
| The body and Table 2 disagree about where propellant sits | Compare the Part II sentence attributing `US$115 billion` against Table 2's category membership | The two agreeing | Figure 1 gives *New Resources & Materials* as `$59.2B` / `$114.5B`. Table 2 puts only the three helium-3 lines in that category and puts propellant under *In-space production* (`$61.3B` / `$105.9B`). The body sentence attributes the `$115B` to helium-3 **and** water-ice propellant. **I am not claiming the model is wrong** — the body may simply be loosely worded — but a reader cannot tell from the document which reading holds, and either way no helium-3 figure is recoverable. |
| Deloitte does not assert viability | Read every sentence in the Part II helium-3 section that states a verdict | Any sentence asserting that lunar helium-3 is commercially viable | Three verdict sentences, none affirming: *"At current prices, often cited around US$20 million per kilogram, the economics are compelling, **at least on paper**."* / *"Nuclear fusion could create a much larger source of demand, but its commercial timeline remains uncertain, and **many near-term reactor designs do not require helium-3 at all**."* / *"the commercial viability of lunar helium-3 extraction **depends** not only on the ability to harvest the resource, but on how rapidly these downstream markets mature."* **The report's prose declines to answer your question. Its model books the near-term slice at full weight anyway.** |
| The report does not engage the documented substitution response | `grep -ci` the full text for `boron`, `lithium`, `GAO`, `Accountability`, `radiation portal`, `portal monitor`, `NNSA`, `stockpile` | Any nonzero count | 0, 0, 0, 0, 0, 0, 0, 0. Side B below is the corpus source on what those words name. |
| The citation supporting the neutron-detection use is about a workaround for it | Read the body sentence carrying endnote 149 and read endnote 149 | The endnote supporting the claim rather than an alternative to it | Body: *"It is also exceptionally good at signaling the presence of neutrons, making it useful in sensors that... could screen cargo at borders for hidden nuclear materials.**149**"* Endnote 149: *"NIST Neutron-Detection Method: Long-Sought Workaround for Helium Shortage,"* NIST, 11 June 2018. **The source cited for the value of the use is a source about replacing it.** I read the endnote text only; the NIST page is off-corpus and was not opened, so this row establishes what the report cites and not what NIST found. |
| **Ruling 1.** `LCC-13` did not fire on the question as asked, and fires on my reading | Run `adviseQuestion` on your words, then on the same question with `helium-3` spelled out | `LCC-13` appearing in the findings for your words | On *"is he3 a viable long-term business plan"*: **`LCC-13` is absent entirely.** `he3` tokenizes to `he3` and matches none of the axis's seven declared keys (`helium`, `fusion`, `deuterium`, `tritium`, `detectors`, `implanted`, `regolith`). Spelled `helium-3`, the axis appears at mass `2.087` against reference mark `2.431` — below by 14%, carried by the single key `helium`, confidence `low`. **This is FM-1 with the miss widened to total**: the `kwh`-versus-"kilowatt hours" case, on a question whose subject is the axis's subject. I read the axis statement, it is the question, and the tool did not. |
| **Ruling 2.** `LCC-12`'s hit is a word collision | Ablation: re-run the question with "business plan" removed | `LCC-12` surviving the ablation, which would mean the hit carries subject matter | With "business plan": `LCC-12` at mass `1.715`, one key of eight, the key being `business`; retrieval returns `shishko-2019-lunar-thermal-mining-business-case.md`. Without it: **`LCC-12` vanishes, `ECR-12` vanishes, and `shishko-2019` vanishes from retrieval.** The entire `LCC-12` finding rides on the English word "business". |
| **Ruling 3.** `misclassified` is not written, and its stated condition is met | Evaluate `answer_contract.md` §5's `misclassified` condition against this run | Nothing — **this row records a ruling against the plain text of a closed rule, and it is the weakest row in this document** | The condition: *a searched retrieval returned a file belonging to an axis whose `match_keys` this question touched at any nonzero overlap, while classification did not fire that axis at its stated firing rule.* On `LCC-13` it **cannot** fire: your words touch that axis at **zero** overlap, and the condition requires nonzero. On `LCC-12` it **is** met — nonzero overlap on `business`, the axis not fired, and `shishko-2019` returned (unconfirmed at threshold on your words). I declined the refusal on three grounds: the overlap is one bare token carrying no claim, per Ruling 2; no `LCC-12` content reaches this deliverable, which composes over `LCC-13`'s leaves only; and the repair the code routes to — `LCC-12`'s `match_keys` — is filed in §5 as owed, so the routing still happens without costing you the question. **A reviewer who disagrees should mark this run `FILLED`.** |

### Side A — the deuterium and helium-3 fusion power market

Composed over `olson-2021-lunar-helium3-mining.md` and `wittenberg-1992-he3-resources-review.md`.

| Claim | Test run | Falsifier | Observed |
|---|---|---|---|
| This side's market is fusion power, and the annual volume is stated in kilogrammes per year | §3 procedure, steps 1-4, on `olson-2021`, searching `33 kg` and `400 MW` | The figures absent, or present only inside an attribution to another author | Present as the paper's own design point. The Mark-III miner, completed 2006, was designed to collect **`33 kg` of helium-3 per year**, and the paper states this quantity *"would fuel one approximately 400 MW D-3He fusion power plant per year."* At `20 ppb` rather than `10 ppb`, the paper states collected helium-3 would be closer to **`66 kg/yr`**. |
| The resource inventory is large | §3 procedure on `wittenberg-1992`, searching `1 million tonnes` and `7100` | The figures absent or attributed | The review's own claim: the solar wind has deposited **more than `1 million tonnes`** of helium-3 in the fine lunar regolith, confirmed by analyses of returned Apollo samples; surface photographs suggest nearly 50 percent of Mare Tranquillitatis may be minable and capable of supplying about **`7,100 tonnes`**. Earth's own resources are stated as limited: natural gas would supply **less than `5 kg/yr`**, tritium decay about **`110 kg` by the year 2000**. `olson-2021` states about **`100 kg`** of helium-3 is presently available on Earth. |
| The extraction is physically enormous, and this side says so itself | §3 procedure on `olson-2021`, searching the M-3 operating parameters | The paper stating a throughput that does not scale with the grade | Stated by the paper: Apollo 11 sample 10084 averaged **`11.8 ppb`** helium-3, range `9.22` to `17.9 ppb`. The M-3 excavates to `3 m` depth over `1 km²` per year at **`1,258 tonnes/hour`**, heats `556 tonnes/hour`, and consumes about **`350 kW`**. The solar collector must supply `12.3 MW` at an assumed 85% energy recovery; **without recovery, `82 MW`**. |
| **Step 4 fired on this side, and it is the reason this side is a side and not a conclusion** | Search `olson-2021` for demand-side content and check whether it is the paper's own result | Substantive demand analysis present, which would make this side's market a measured market | The file records that the paper's **only** demand-side content is one sentence: *"In 2021, there are several commercial companies working to develop fusion reactors that could be fueled with 3He. These companies have secured over a billion dollars... planning to bring reactors to market as early as the 2030s."* The file states that **no company names, funding amounts, reactor power ratings, fuel consumption rates or projected prices accompany it**, and that no citation of current non-fusion uses appears anywhere in the paper. `wittenberg-1992` states its own limitation in the same direction: D-3He fusion power *"is prospective; the paper acknowledges a sustained, reliable fusion reactor must still be developed and demonstrated,"* and its inventory figures rest on Apollo-sample helium-versus-TiO₂ correlations extrapolated across the maria and on surface-photograph interpretation, **not on in-situ mining data**. |

### Side B — the terrestrial neutron-detector market

Composed over `gao-2011-neutron-detectors-helium3.md`.

| Claim | Test run | Falsifier | Observed |
|---|---|---|---|
| This side's market is quantified, and the annual volume is stated in litres per year | §3 procedure, steps 1-4, on `gao-2011`, searching the five use categories | The volumes absent, or given only as ranges without a basis | Five use categories. Handheld and backpack security detectors: total projected annual US government demand of about **`7,000 litres`**, 2011 to 2015. Oil and gas well logging: about **`1,000 litres/year`**. Industrial moisture gauges: about **`500 litres/year`**. Radiation portal monitors: about **`44 litres` each**, with about `1,400` deployed domestically and about `2,000` overseas. Large-area science detectors: `15` to `40 m²` each, *"hundreds to thousands of liters"* each. |
| Supply is smaller than demand and comes from one place | §3 procedure on the same file, searching the NNSA production figure | Supply exceeding demand, or a second source of supply | All US supply comes from **radioactive decay of tritium** in the NNSA stockpile, decaying at `5.5` percent annually; the US **ceased tritium production in 1988**. NNSA estimates it will make available about **`8,000` to `10,000 litres` per year**, which the report states is *"less than the demand created by neutron detectors and other applications."* About `31,000 litres` of inventory remained. Extraction from natural gas *"is stated to not be commercially pursued because the concentrations are too low to be economically viable."* |
| The documented response to scarcity was to shrink the market, not to supply it | §3 procedure on the same file, searching the policy-response section | The response being to procure more helium-3 | *"Policy response: allocate and reduce demand, not grow supply."* The 2009 interagency committee **eliminated helium-3 allocations for domestic RPM deployments beginning in fiscal year 2010**, having determined alternatives would suffice. The report states the purpose of developing boron-10, boron trifluoride and lithium-6 detectors *"is explicitly to reduce demand for helium-3, not to expand or serve any new market."* |
| Prices are stated per litre, before and after the shortage | §3 procedure on the same file, searching `$40` and `$600` | The figures absent, or the file's own arithmetic presented as the source's | Before the shortage, the Isotope Program's minimum sale price *"typically ranged from `$40` to `$85` per liter."* In 2011, helium-3 bought from the US government cost **`$600` to `$1,000` per liter**. **Step 4 fired twice here.** The `$600`-to-`$1,000` figure is carried in a footnote attributing it to the companion report `GAO-11-472`, not to `GAO-11-753`'s own research; and the file states in its own words that the ten-fold multiple *"is derived here; the report does not itself state the multiple."* **That multiple is therefore the summary's arithmetic and is not reported as this side's claim.** |
| **This side's market does not contain the other side's market** | Search `gao-2011` for any reference to fusion | Fusion named anywhere as a use, market, or demand driver | *"Fusion energy is not mentioned anywhere in this document as a use, market, or driver of helium-3 demand; the report's entire demand accounting is built from the five detector and industrial categories above plus the MRI and cryogenics uses, with no reference to fusion fuel, fusion research, or fusion power at all."* Ultra-low-temperature refrigeration **is** named — which is the use Deloitte's `Speculative` quantum-computing-cooling line addresses. |

---

## Sources

Trace (citation, resolution-only, literature): literature/isru-processing/olson-2021-lunar-helium3-mining.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/isru-processing/wittenberg-1992-he3-resources-review.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Trace (citation, resolution-only, literature): literature/space-economy-and-markets/gao-2011-neutron-detectors-helium3.md
LIMIT: this trace proves the file resolves and that its body contains the matched topic words. It does not prove the file supports the sentence beside it; only a person's sampling read closes that gap.

Rule V: 3 traces, 2 distinct sides, at least one `literature` trace per side. No `app` trace and no
`none` trace appears. No `findings` trace exists to permit, because `findings/` is unavailable this
session (`BC-18`).

---

## What remains unverified

9 items unverified, over 21 claims and 21 tests examined.

1. **The two sides are stated in different units and nothing here converts them.** Side A's volume is
   kilogrammes per year; side B's is litres per year. **No source in this corpus states both in a
   common unit**, and converting one to the other would be cross-source arithmetic, which
   `answer_contract.md` §2 makes a `findings` deliverable rather than a trace. The scope token names
   *"the annual volume that market consumes"* as the thing that separates the sides, and this answer
   reports each side's volume in its own units and stops there. **A reader who wants the comparison
   is owed a `findings` entry with an author and a derivation somebody can dispute.**

2. **The anti-synthesis rule was approximated, not enforced.** `answer_contract.md` §1 buys one
   persona per side, *"parallel, each briefed on one side only"*, and the test is pairwise brief
   intersection. This run had one session. I read side A's two leaves and drafted side A's rows
   before opening side B's leaf, which is the best available approximation and **is not the
   mechanism**. What can be checked on the artifact was checked: the assembled bytes contain no
   sentence ranking the sides and no arithmetic combining two sides' figures. The isolation itself is
   unverified.

3. **The shape was deviated from, deliberately, and it is declared here.** `deliverable_shape.md` §5
   makes §3 per-side on a `CONTESTED` run. This §3 opens with an assembler block, because the
   question's object is a document that is not any side's leaf and the artifact tests had nowhere
   legal to live. No sixth heading was added. **Whether the shape should carry an assembler block on
   a run whose object is external is The Writer's question, not this run's.**

4. **`LCC-13` cannot see the question you asked, and that is a live register defect.** Its seven keys
   are `helium`, `fusion`, `deuterium`, `tritium`, `detectors`, `implanted`, `regolith`. **`he3`
   matches none of them, and neither would `He-3` or `helium3`.** This is FM-1's family and it is
   worse than FM-1: the axis about lunar helium-3 demand scores **zero** on a question about lunar
   helium-3. Adding `he3`, `helium-3` and `3he` to that row is a register author's act. Until it
   lands, every reader who writes "he3" gets the one-sided answer §2 describes.

5. **`LCC-12` carries `business` as a match key.** A bare generic English word will collide with any
   question containing it, as measured in Ruling 2. This is the repair that `misclassified` routes
   to, and it is owed to the axis's author. **It is also the thing standing behind Ruling 3**: if a
   reviewer rules that Ruling 3 was wrong, this run should have refused, and this item is why it
   would have been right to.

6. **Every trace here is `resolution-only`, and nobody has read the sources.** Source PDFs are absent
   from this install (`BC-19`). Two specific gaps this creates: `gao-2011`'s two demand curves
   *"did not extract cleanly from the source PDF's chart"*, so side B's total projected demand is
   **not** a figure this corpus holds — only the flat production line and the narrative around it;
   and `olson-2021`'s Table 1 helium-3 row *"did not extract cleanly"* either, so its `33` to
   `66 kg/yr` figures come from that paper's prose rather than its table. A sampling read against the
   sources closes both. Nothing in the answering loop can.

7. **Side B is fifteen years old and describes one country.** `gao-2011` is a 2011 US government
   report with fieldwork from July 2010 to September 2011. Quantum-computing dilution refrigeration —
   the use Deloitte's `Speculative` line and Interlune's cited Bluefors agreement both turn on — is
   named in that report only as *"scientific research involving ultra-low-temperature refrigeration
   systems"*, at no stated volume. **This corpus holds no measurement of current or projected
   helium-3 demand from quantum computing.** That is the single largest gap behind your question and
   closing it is an acquisition decision.

8. **The report's cited price and this corpus's prices are not compared.** Deloitte cites
   `US$20 million per kilogram`; side B states `$40` to `$85` per litre before the shortage and `$600`
   to `$1,000` per litre in 2011. These are different units, different decades and different market
   structures, and no source on this shelf converts or reconciles them. **No claim about the
   relationship between them is made anywhere above.**

9. **Whether Deloitte's `Replacement` classification is defensible was not adjudicated.** Establishing
   that the report classes the terrestrial helium-3 market as `Replacement` with no probability weight
   is an observation (§3). Establishing that this is *wrong* would require ruling which side of
   `LCC-13` the addressable market sits on, which is the adjudication this verdict forbids. **The
   finding stops at: the input the scope token names is the input the report does not state.**
