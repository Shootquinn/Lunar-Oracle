# Step 1, Wave 2: The Fact-Checker's A.10 step 2 source verification gate

Scope: the seven UNVERIFIED rows in The Software Engineer's `lit_review` ledger at 1.11 §4, and the
four Step 1 source claims routed to me because they are claims about what a source says.

Method, stated once so any finding here can be re-run by someone who does not trust it. Every
verdict below comes from opening the named primary — the file, the app, the summary — and where the
claim is about behaviour, from running the code. No verdict is taken from another document's
description of a file. Commands and line numbers are given per finding. Where I ran the prototype,
the run is reproducible with `node lsei/oracle/answer_question.js "<question>"` from `lsei/`.

Three verdicts, kept distinct. **VERIFIED**: the primary says what the claim says. **CONTRADICTED**:
the primary says something incompatible. **UNSUPPORTED**: the primary neither says it nor denies it,
and nothing else on disk does either. UNSUPPORTED is not a softer CONTRADICTED.

---

## Part 1 — the gate on the 1.11 suite

### Summary of verdicts

| Ledger row | Claim, in short | Verdict |
|---|---|---|
| FIX-4 | `landed_cost` is a DETENTS rail `model()` does not take, and `address.js` says so in its error text | **VERIFIED** (verbatim) |
| FIX-6 | The app carries a 37,000 kWh/t coefficient with a status field and a governing section | **VERIFIED** |
| FIX-7 | `ice` is an app input on a DETENTS rail of [1,2,5,10,20] wt% with no computation behind it | **VERIFIED**, and the trap it names fires live |
| FIX-9 | Three of the app's ten exclusions cover demand, market, programme and **law** | **CONTRADICTED** on law |
| FIX-10 | `app_model.js` extracts `model` and not `valueModel`; zero hits for `valueModel`/`margin`/`value_prop` | **VERIFIED**, and stronger than claimed |
| FIX-11, FIX-13 | The two named summaries exist under the stated slugs and cover the stated topic | **VERIFIED** |
| FIX-12 | The industrial-policy axis is a live disagreement in the corpus | **CONTRADICTED as written** (see 2(b)) |

**One correction to the ledger's own advice before the findings.** §4 closes with "five of the six are
shape claims about one file, `lsei/oracle/lib/app_model.js`. If The Fact-Checker opens one file, that
is the file." That is wrong, and following it would have missed the only CONTRADICTED row. Exactly one
of the five is about `app_model.js` (FIX-10). FIX-4 is about `lsei/oracle/lib/address.js`, FIX-6 and
FIX-7 are about `lsei/index.html`'s `CONFIG` and `DETENTS`, and FIX-9 is about the `EXCLUSIONS`
register in `lsei/index.html` — which is where the contradiction is. Clearing the gate took four
files plus four live router runs.

---

### FIX-10 — VERIFIED, and the claim understates its own case

The consequential one, correctly identified as such.

`lsei/oracle/lib/app_model.js` builds its MODEL-CORE API with one hard-coded tail string:

```js
const tail = '\nreturn {model, CONFIG, DETENTS, ENVELOPE, PRESETS: KNOB_DATA.PRESETS};';
```

`valueModel` is not in it. The grep half also holds: `grep -rn "valueModel\|value_prop" lsei/oracle/`
returns **zero hits across the whole tree**, and every `margin` hit in `lsei/oracle/` is a figure
drawing margin in `raster_figure.js` and `svg.js`, none economic.

**Three things make it worse than the ledger says, and all three matter to the fixture.**

1. **It is not a missing name in a return list, it is a missing island.** `valueModel()` is defined at
   `lsei/index.html:7828`, inside `VALUE-CORE` (7797–8448). `app_model.js` calls `readIsland` on
   `DATA-ISLAND`, `MODEL-CORE` and `DERIVATION-CORE` and never on `VALUE-CORE`. Adding `valueModel`
   to the tail string would not work; the island holding it is never read. The app carries 44
   occurrences of `valueModel` and the Oracle's one door opens on none of them.
2. **`margin_prop` and `margin_const` are not in `model()`'s output at all.** I loaded the live API
   and called `model()` on a real preset: 26 output keys, `margin_prop` absent. So the FIX-10
   question has no reachable address by any route, not merely no extracted function.
3. **The router does not refuse, and I have the run.** `tryAppPath` returns `null` when
   `findScenario` finds no preset label or `findOutputs` matches no `OUTPUT_LEXICON` entry
   (`answer_question.js:265-268`). Both fail here. Run:

   ```
   $ node oracle/answer_question.js "What is the propellant margin under Commercial Led in 2055?"
   ROUTING VERDICT  LITERATURE
   RUN OUTCOME      ANSWERED
   ```

   It answers from `logistics-and-delivery/kornuta-2019-commercial-lunar-propellant-architecture.md`
   with a `Trace (citation, resolution-only)` and outcome ANSWERED. **C1 is confirmed live**: an app
   question about the economic half is answered from a literature summary, with a trace that resolves,
   and nothing anywhere refuses.

**Consequence for the fixture, which is where the gate earns its keep.** FIX-10's Expected column says
`REFUSE`/`unbuildable`. Against the prototype the fixture as written produces `LITERATURE`/`ANSWERED`
— it fails, and it fails on the invariant the fixture calls the assertion ("Never `LITERATURE`"). That
is the right outcome for a red fixture pinning a known defect, and it should be recorded as red on
purpose with C1 as its close condition, not carried as green. **The `green` status in the table is
wrong.**

There is also a fixture-text defect underneath it: the question says "Commercial Led" and the app's
preset label is "The Commercial Break" (`lsei/index.html:6330`). Run with the real label the verdict
changes to `REFUSE` — but `REFUSE`/`excluded`, naming `oxygen-extraction-energy` and
`propellant-mass-leverage`, not `unbuildable`. So the fixture's stated mechanism is wrong in both
variants, and the two variants disagree with each other. Fix the label, then decide which refusal the
contract wants; do not leave a fixture whose expected outcome flips on a scenario name.

---

### FIX-4 — VERIFIED, verbatim, with one thing the fixture should know

Both halves hold.

`lsei/index.html:6657-6663`: `DETENTS` carries five keys and `landed_cost: KNOB_DATA.LANDED_COST.rail`
is one of them. `model(a)` is defined at 6672 and never reads `a.landed_cost`; the only
`landed_cost` read in the file is `inp.landed_cost` at 7836, inside `valueModel()`.

`lsei/oracle/lib/address.js`, `resolveKnob`, throws with this text, quoted from the run rather than
the file:

> `(landed_cost is a DETENTS rail that model() does not accept as an input, so it is not a sweepable knob under this rule.)`

That is word for word the ledger's claim. VERIFIED.

**But the throw never fires on FIX-4's question.** "How does water output vary across the landed-cost
rail?" names no scenario, so `findScenario` returns null, `tryAppPath` returns null before reaching
`knobSweep`, and the sub-claim goes to the non-app path. The live run:

```
ROUTING VERDICT  REFUSE
REFUSED. The app's own EXCLUSIONS register names this boundary directly:
  [delivered-cargo-record] This app does not model delivery capacity. ...
```

`REFUSE` holds, so the fixture's stated invariant survives, but the outcome is `excluded` and not
`unbuildable`, and the reason given to the user is about lander cargo records rather than about the
rail. The source claim is verified; the fixture asserts a mechanism the question cannot reach. Either
name a scenario in the question or assert `excluded`.

---

### FIX-6 — VERIFIED, all three parts

`lsei/index.html:1078-1084`:

```json
"E1": { "value": 37000, "unit": "kWh / t H2O @ 1 wt%", "basis": "wall-plug",
        "source": "Derived from Table 4 + H*duty; ...", "status": "SOURCED (derived)", ... }
```

Coefficient present, **status field present**. The governing section is `energy-per-tonne`, a section
node in `SLUGS` at 672 titled "Energy per Tonne on Installed Power", and `SECTION_REFS` (5966-5973)
gives it six primaries: `kiewiet-2026`, `kleinhenz-paz-2020`, `kornuta-2019`, `sowers-dreyer-2019`,
`kornuta-2018`, `kleinhenz-paz-2017`. So the fixture's `BOTH` — app fact plus one literature trace to
the primary the governing section cites — has a real basis on both sides.

**Two notes.** The unit is *per tonne of water at 1 wt% ice*, not per tonne unqualified; a fixture
question phrased "37,000 kWh per tonne" is under-described and a converted or re-based restatement of
it is exactly what FIX-16 exists to catch. And `E1`'s own `source` field names no primary — it reads
"Derived from Table 4 + H*duty". The primaries hang off the *section*, not off the coefficient. The
fixture is right that a literature trace exists; it should trace through `energy-per-tonne`, not
through `E1`.

Against the prototype this question currently returns `REFUSE`/`refuse-weak`, since no scenario is
named and no corpus file confirms. Another green-flagged fixture that is red today.

---

### FIX-7 — VERIFIED, and I confirmed the trap fires

`DETENTS.ice` is `[1,2,5,10,20]` (`lsei/index.html:6658`), unit `wt%` (`10643`:
`ice: {label:'Ice grade', unit:'wt%', ...}`). `ice` is in `model()`'s derived `inputKeys` — I read
them off the live API: `fFisOvr, fSolOvr, fission, funding, ice, mass, mix, phase, phi_c, phi_c0,
power, transDistKm`. So `ice` is an input on a detent rail. VERIFIED.

The trap is real and I ran it rather than reasoning about it. `model()` echoes its inputs into its
return object, so `ice` is *also* one of the 26 output keys, and `OUTPUT_LEXICON` maps "ice content"
to it:

```
$ node oracle/answer_question.js "What is the ice content under Agency Led Baseline in 2040?"
ROUTING VERDICT  APP
At Agency Led Baseline, phase 2040, the model returns ice = 5.
Trace (scalar, recompute-verified): model:artemis|2040|ice = 5, recomputed fresh from the app and found equal.
```

A preset **input** comes back as an APP answer carrying `recompute-verified`, the strongest grade the
system has. The fixture's "An `APP` verdict here is a failure" is correct and the failure is live.
This is a second instance of C2 and it should be cited as one.

---

### FIX-9 — CONTRADICTED

The claim: "Three of the app's ten exclusions cover demand, market, programme and law."

**Ten exclusions: VERIFIED.** `EXCLUSIONS` at `lsei/index.html:6327`, ten keys, confirmed by loading
the live API and counting.

**Law: CONTRADICTED.** `grep -ni "outer space treaty|property right|ownership|legal regime"
lsei/index.html` returns **zero**. No exclusion, and nothing else in the app, covers law, ownership
or treaty. The three exclusions that do sit in this neighbourhood are `grade-independent-demand`
(demand), `delivered-cargo-record` (delivery record) and `cadence-cryogenic-break` (programme
milestones). Law is not a fourth; it is absent.

**The origin of the error is a dropped clause, and the dropped clause was the load-bearing one.** The
Space Resources Engineer's Step 0 L9 (`step0_space_resources_engineer_question_surface.md:131-133`)
reads: "Demand, market, programme and law. Offtake, delivery record, programme milestones, treaty and
property regime. Three of the app's ten exclusions sit here **and there is no app surface for law at
all.**" He got it right. The ledger row compressed "three sit here, and law has none" into "three
cover demand, market, programme and law", which inverts it.

**The fixture built on the compressed version is wrong, and I ran it.**

```
$ node oracle/answer_question.js "Who owns lunar resources under the Outer Space Treaty?"
ROUTING VERDICT  REFUSE
REFUSED. The app's own EXCLUSIONS register names this boundary directly:
  [bound-oxygen-mare] This app does not model where the non-water resources sit. ...
```

It refuses, so a fixture asserting only `REFUSE`/`excluded` passes. But the entry it names is the
*geology* exclusion, matched on a **single token, "resources"** — I ran `matchExclusions` directly and
it returns exactly one candidate, `bound-oxygen-mare`, overlap 1. Under
`classifyNonAppSubClaim` (`answer_question.js:344-352`) a one-token exclusion loses to any
full-text-confirmed literature hit and only survives here because nothing in the corpus confirmed. So
FIX-9 as written asserts a refusal that is right by accident, on a wrong entry, on one shared word,
and one new law summary in the corpus flips it to `LITERATURE`.

**Ruling: FIX-9 does not clear the gate.** The correct expectation for a treaty question is a refusal
the app cannot source from `EXCLUSIONS` at all — `refuse-weak`, or a new class. Whatever it becomes,
the fixture must not assert `excluded`, and the ledger row must be rewritten to the SRE's original.

---

### FIX-11 and FIX-13 — VERIFIED

The Software Engineer recommended deferring these to after 2.16 rebinds paths. The slugs are checkable
now and I checked them; the recommendation to re-run after the rebind is still right, but the topic
claim need not wait.

Both files exist at the stated slugs in `_intake/japanese-miracle/lit/`, with PDFs beside them.

**FIX-11** — `jorgenson-2005-industry-origins-japan.md`. The fixture asks about the capital-versus-
productivity split of Japan's 1960–73 growth. The summary carries the decomposition as a table with
1960-1973 as its own subperiod: growth 9.89, capital 5.16, labour 1.69, TFP 3.05. The fixture asserts
retrieval and grade only and asserts no number, which is correct and is what keeps it inside the
inherited authority rule.

**FIX-13** — `kiyota-2005-foreign-technology-acquisition.md`. Firm-level panel on Japan's foreign
technology licensing regime 1957–1970. The summary's abstract answers the fixture's question directly
and answers it **negatively**: technology acquisition "raised capital accumulation and labor
productivity, without a confirmed effect on total factor productivity (TFP)." Topic verified. Flagging
the polarity because a retrieval-only fixture will happily return this file for a question it answers
"no" to, and the register position for this file (ECR-01, side A) is the one I take issue with in
2(b).

---

## Part 2 — the source claims this step made

I read `cr_scratch/step1_orchestrator_verification.md` first and treated it as a starting point. I
re-ran the corrected 1.9 verification myself, unfiltered, per the rule that file adopted after the
`grep -v` incident:

```
$ sed -n '187,283p' <1.9 addendum> > lunar2.tsv     ->  1 H, 15 A, 81 M
$ node tools/ecr_verify.js lunar2.tsv lsei/literature ; echo $?   ->  0
$ grep -icE "fail" out.txt   ->  2, both the strings "failures 0" and "does not fail"; no FAIL lines
$ tail -1 out.txt            ->  ALL PASS
```

Same procedure on the ECR block against `_intake/japanese-miracle/lit`: exit 0, no FAIL lines, ALL
PASS. Both blocks verify clean. The orchestrator's corrected 1.9 row stands on my own re-run.

---

### (a) The six Step 0 figures — five VERIFIED, one carries an error in its own correction

Verified against the summaries in `lsei/literature/`, which are the corpus's primary of record.

**1. Colaprete 5.6 wt% is a water-to-dust ratio, not a regolith concentration, and no excavation depth
is stated — VERIFIED, and the correction is more exact than it needed to be.**
`lunar-ice-and-geology/colaprete-2010-lcross-ejecta-water-detection.md:118` states it flatly: "No
excavation depth, depth interval, or excavated volume is given anywhere in this article." Line 85
confirms the ratio's construction — water vapour plus ice over the DISORT dust mass, "not measured
against a sampled volume of regolith" — and the Table 1 Average row gives dust mass 2175 +/- 544 kg,
which is his "about 2,175 kg". His further point, that the paper's own caveat list is what supports a
scope reading, also checks out: line 108 carries "The LCROSS sample depth was possibly deeper than
neutron spectroscopy can effectively sample, which the paper puts at deeper than about 0.7 m." That is
a statement about *neutron spectroscopy's* sampling depth, not a stated LCROSS excavation depth, so
removing the depth claim from `verdict_basis` while keeping the caveat is exactly right.

**2. The CaRD deck states no TRL for CaRD — VERIFIED, including the three-way disagreement.**
`isru-processing/nasa-2023-card-carbothermal-reduction.md:53`: "The deck does not state a formal TRL
number reached by the CaRD prototype itself; p. 3 describes the qualification test sequence used to
target 'TRL 4 to 6 for the Moon' for the earlier OVEN unit without a corresponding statement for the
CaRD brassboard or prototype." His "an *earlier* unit" is the OVEN unit. `azami-2024-lunar-
manufacturing-review.md:50` says CaRD "raised technology readiness to TRL 6";
`programme-primaries/sanders-2025-nasa-lunar-isru-progress-review.md:34` says carbothermal was
"advanced to TRL 5". Three sources, three maturity statements, one silent. All four checks pass.

**3. Wang 2025's collection ratio is 24–48 % against extraction 76–96 %, at positive pressure —
VERIFIED, near-verbatim.** `isru-processing/wang-2025-microwave-water-production.md:83`: "collection
ratios (about 24% to 48%) are far below extraction ratios (about 76% to 96%)". Table 1 gives per-sample
collection 24.3–48.3 % and extraction 75.7–95.7 %. Positive pressure is stated twice (39, 83), and the
summary adds that "the experimental system description gives no indication the tests were run under
vacuum." "Extraction only" was indeed the wrong filing.

**4. Poston 2020 prints no specific power — VERIFIED, verbatim.**
`power-and-thermal/poston-2020-krusty-reactor-design.md:64`: "This paper prints no specific-power
(W/kg) value for the KRUSTY reactor or system, and no numeric Stirling-conversion-efficiency value, in
any figure, plot, or table." The register row (LCC-10 side A, `poston-2020`) carries that as its
position, which is the right place for it.

**5. Colozza 2020's siting and darkness — the REGISTER ROW IS CORRECT; the §2.1 prose describing it is
CONTRADICTED.** This is the one that needs splitting.

*The row is right.* Addendum line 253: "every case is sited at 30 degrees north over a **708.33 hour
day-night cycle**, and the document contains no polar illumination model, no eclipse statistic and no
permanently shadowed region." Every clause checks.
`power-and-thermal/colozza-2020-lunar-base-power-comparison.md:38` — 30 degrees north stated as a
power-system input in Table 14 and restated at Section 4.0. Line 32 — day length 708.33 h. Line 44 —
measured absences with live controls declared on the same instrument in the same run (Kilopower 39,
storage 69, night 130, latitude 20, crater 14, pole 7 against zero for polar, eclipse, permanently
shadowed, continuous illumination), concluding "no polar illumination model, no eclipse-duration
statistic, and no treatment of a permanently shadowed region." The `scope_token` he wrote — "the site
latitude and the darkness duration the storage is sized for" — is the right token for this axis.

*The prose in §2.1 item 5 is not.* It says Colozza is "sited at 30 degrees north **over a 708-hour
night**" and that the correction "is the difference between a 3-to-5-day darkness and **a 29-day
one**." 708.33 h is the full day-and-night cycle. The source states the split once and never revises
it: "approximately 354 h of daytime and approximately 354 h of nighttime out of the 708.33 h cycle"
(line 40). **The darkness the storage is sized for is about 354 h, roughly 14.75 days, not 29.** The
29-day figure is the synodic cycle mis-read as darkness, and it overstates the contrast by a factor of
two. The register is unaffected; the narrative that explains the register to a reader is wrong, and it
is the narrative a downstream persona is likelier to quote.

**6. Just 2020 excludes TRL as a column because nothing exceeds TRL 3 — VERIFIED, verbatim.**
`isru-processing/just-2020-regolith-excavation-review.md:37`: "TRL is explicitly excluded as a
tabulated column because almost all reviewed concepts do not exceed TRL 3, 'Proof-of-Concept
Demonstrated, Analytically and/or Experimentally' (p. 4)." Thirteen concepts confirmed at lines 21 and
37. His Step 0 characterisation ("recommendations for experiments not yet performed") is also true —
line 29 has the paper promising exactly that in Section 5 — so "true and misses the sharper fact" is
the correct self-assessment.

**Verdict on (a): five VERIFIED as corrected. One (Colozza) is VERIFIED in the register row and
CONTRADICTED in the prose that describes it.** The corrections were needed and they were made
competently; the single error introduced by the correction is in the explanation, not the artifact.

---

### (b) Register row B7 and ECR-01 — the Wade half VERIFIED, the axis verdict CONTRADICTED

**"Wade is silent on sectoral targeting" — VERIFIED for Japan, and in a stronger form than claimed.**
`_intake/japanese-miracle/lit/wade-2018-developmental-state-dead-or-alive.md:229-231`: the summary's
Limitations record that Wade's empirical base for economic effects is "a single input-output study
(Lane, 2017) covering only Korea's Heavy and Chemical Industries episode; **the author notes comparable
studies for Japan and Taiwan have not been conducted.**" Wade does not merely fail to speak on
Japanese targeting — he registers the Japanese measurement as absent. Putting him opposite Beason
would have made him say something he explicitly says nobody has established. **The B7 correction is
right and the reclassification to `one_sided` is correct.**

**But two claims made alongside it do not hold.**

**(i) "This corpus holds no source that measures targeting and reports one" — CONTRADICTED.** That is
ECR-01's `verdict_basis`, second clause, at line 367 of the 1.10 register. It drops the word
"Japanese" that the first clause carries, and as written it is false about this corpus. Wade at line
153 reports Nathan Lane's 2017 input-output analysis of Korea's HCI drive: "targeted industries grew
faster in output and productivity than non-targeted industries relative to the pre-1973 period; these
differences persisted after the policy's major elements ended in 1979; and downstream sectors with
strong input-output linkages to targeted sectors grew faster than weakly linked sectors." That is a
measurement of sectoral targeting against a control group reporting a positive productivity effect,
carried in this corpus, on side C of a different axis. The first clause of the verdict is sound; the
second is an unscoped universal that its own corpus falsifies. **Fix: restore the scope word.**

**(ii) "Every affirmative claim either of them makes about a specific instrument has a row, and I
checked this rather than asserting it" — CONTRADICTED.** Wade has exactly three rows: ECR-05 C
(redistribution as political settlement), ECR-13 C (directed credit), ECR-14 A (relationship finance).
`grep -i "lane\|heavy and chemical\|hci"` over the whole 1.10 register returns nothing. **Wade's single
most quantitative affirmative claim about a targeting instrument is unrostered.** Given that ECR-01 is
`one_sided` specifically on the ground that no affirmative measurement exists, the one affirmative
measurement in the corpus being the unrostered one is the material omission, not an incidental gap. It
is also within a hair of the Recruiter's D5 trigger — a Fact-Checker finding of one-sided retrieval on
a registered claim — and I am naming it as such so The Manager can rule rather than having it noticed
later.

**"Six members all reporting no effect" — CONTRADICTED for two, UNSUPPORTED for two.** ECR-01 has six
side-A members and no side B; that structure is confirmed (lines 384-389, and `ecr_verify.js` ALL PASS
on my re-run). What the six actually report, from their own register positions and their summaries:

| Member | What the row itself says | Does it report no effect? |
|---|---|---|
| `beason-1996-targeting-japan` | negative correlations, no robust positive TFP effect | **Yes** |
| `esteban-pretel-2009-postwar-japan-policy` | counterfactual removal barely changes output | **Yes** |
| `kiyota-2005-foreign-technology-acquisition` | "raised capital and labour productivity; the TFP channel is not confirmed" | **No — a positive labour-productivity effect** |
| `kiyota-2013-import-quota-removal` | "no contemporaneous productivity effect, and a lagged labour-productivity gain of about 8 percent" | **No — a positive lagged effect** |
| `henderson-2008-myth-of-miti` | "reads the targeting record as folk history and reports no measured productivity gain" | **Measures nothing.** Its own summary's Limitations: "No original estimation… the anti-MITI framing is argued, not tested, within the piece" |
| `aoki-2009-government-tfp-growth` | "does not require targeting to do explanatory work" | **Measures nothing about targeting.** Absence of a claim, not a null result |

So the verdict sentence says "measures… reports no productivity effect", and of the six members two
measure and report no effect, two measure and report a *positive* labour-productivity effect, and two
measure nothing at all. **The member rows are honest** — they print the 8 percent gain and the capital
and labour productivity rise in plain text — which is why no checker catches this. The defect is in the
one sentence that summarises them, and it is the sentence a retrieval layer will hand a reader as the
axis's answer.

**Verdict on (b): the B7 correction VERIFIED and correctly applied. ECR-01's `verdict_basis` sentence
CONTRADICTED on two counts, and the "every affirmative claim has a row" assurance CONTRADICTED.** The
axis classification is right; the prose that states what the axis found is not, and it overstates in
the direction of the very one-sidedness The Manager's own Step 0 finding warned about.

---

### (c) The helium-3 market on LCC-13 — mixed, and the total is UNSUPPORTED

Verified against `lsei/literature/space-economy-and-markets/gao-2011-neutron-detectors-helium3.md`.
Figure by figure.

| Figure as claimed | Verdict | Evidence |
|---|---|---|
| The quantified, priced market is **neutron detection** | **VERIFIED** | The report's entire demand accounting is detectors, MRI and cryogenics; line 104: "Fusion energy is not mentioned anywhere in this document as a use, market, or driver of helium-3 demand." |
| Supply **8,000 to 10,000 L/yr** | **VERIFIED** | Line 114, NNSA's estimate of what it will make available for distribution |
| **$600 to $1,000 per litre** after the shortage | **VERIFIED, with an attribution caveat** | Line 136. It is a **2011** price in a **footnote citing a companion report, GAO-11-472** — not a figure this report produced |
| **$40 to $85** before | **VERIFIED** | Line 133, the Isotope Program's minimum sale price set to recover extraction and administrative costs |
| the **2008** shortage | **VERIFIED** | Lines 19 and 41: the government "abruptly learned it faced a severe helium-3 shortage" in 2008 |
| federal response was **to fund substitute detector technologies** | **VERIFIED, strongly** | Lines 155-161: four agencies coordinating more than 30 R&D projects, about $16 M in FY2009 and about $20 M in FY2010; the committee eliminated helium-3 allocations for domestic RPMs from FY2010 |
| "a projected **government demand of about 7,000 litres a year**" | **CONTRADICTED as scoped** | Line 94: the 7,000 L is the projected annual demand for **smaller handheld and backpack security detectors**, 2011–2015. It is one bullet of five. RPMs (about 2,000 deployed overseas, about 2,900 more planned) and the SNS ("thousands of liters") are separate bullets and are **not** inside it |
| "plus about **1,500 litres** of other applications" | **VERIFIED as arithmetic, not as a quoted figure** | 1,000 L oil-and-gas well logging + 500 L industrial moisture gauges. The sum is not stated in the source |
| **roughly 8,500 L/yr** as the market | **UNSUPPORTED** | The number appears nowhere in the summary. It is 7,000 + 1,000 + 500, performed by the register author over three of five-plus categories |

**Why the 8,500 matters and is not a rounding quibble.** The summary states at line 116 that the
underlying numeric values of the total-demand curves "did not extract cleanly from the source PDF" —
so **no total demand figure is recoverable from this source at all**. And the source states the
opposite of what 8,500 implies: the 8,000-10,000 L supply is "less than the demand created by neutron
detectors and other applications" (line 114), with projected demand "still exceeding production even
after the 2011 reduction" (line 116). A sum of 8,500 sits *inside* the 8,000-10,000 supply band and
reads as a market in rough balance. **The derived total points the opposite way from the source's own
statement.** It is precisely the FA1-FA8 hazard The Manager identified at Step 0 — arithmetic present
in no source, wearing a resolution grade.

**Credit where it is due, and it is the reason this is not worse.** The register row itself (1.9 line
413) does **not** print 8,500. It prints the two components separately and separately labelled. The
sum exists only in the reading of the row, including in the framing of this task. The repair is small:
re-scope the 7,000 to the handheld and backpack detector category, and state explicitly that the
source gives no total demand figure. Do not let the row be summarised as a market size.

**Verdict on (c): six figures VERIFIED, one CONTRADICTED as scoped, one UNSUPPORTED.** The
reclassification of LCC-13 from ASYMMETRIC to `two_sided` is nonetheless sound. It does not depend on
the total: the priced, sourced, demand-side market exists and faces an undocumented fusion market,
which is what `two_sided` needs. The Space Resources Engineer's own caution — "I want to be precise
about what I am *not* claiming, because this is the axis where I could most easily manufacture an
opposition" — was the right instinct, and it held for the classification even where the arithmetic
slipped.

---

### (d) `verify_report.js` is real, and I proved it by running it

The orchestrator verified the line numbers. I verified the thing the line numbers point at.

**Extraction.** Fences at 357 and 686 (`grep -n '^```'`), one `javascript` block, opened at 353 by
"Write this out as `verify_report.js` and run it. It is the same file the proofs in step 5 were run
against." `sed -n '358,685p'` yields **328 lines**. Both stated numbers are correct and are different
quantities: 328 lines of source between the fences, 330 inclusive of them.

**It is a complete program, not a fragment.** `node --check` passes. It has `require('fs')`,
`require('vm')`, `loadApp`, `unitsOf`, `check`, `report`, `prove`, a CLI entry block parsing
`process.argv`, a `--scope` option, a `--prove` mode, and three distinct exit codes (0 pass, 1
findings, 2 usage or refusal).

**It runs against the real app.** `loadApp` locates the data island sentinels in `lsei/index.html`,
evaluates it in a `vm`, and builds `SLUGS`, `COEFFS`, `SOURCES` and `UNITS` from `KNOB_DATA`. No
refusal fired.

**It passes and it fails, and both are demonstrated.** On a document whose one claim-bearing sentence
carries a resolving trace: `RESULT PASS`, exit 0. On the same document with the trace removed:
BACKWARD fires, one untraced, exit 1. With the trace pointed at `[[not-a-real-slug]]`: FORWARD fires
as well, two findings, exit 1. It distinguishes forward from backward failures and names the line for
each.

**Most of all, it self-proves.** `--prove` plants mutations in the document and confirms the check
catches each one:

```
PASS  CONTROL / DECOY-TRACE-REMOVED / DECOY-TRACE-DANGLING / DECOY-FABRICATED-SENTENCE
PASS  DECOY-SCOPE-UNUSED / DECOY-EMPTY-POPULATION / DECOY-ALL-EXEMPT
FAIL  DECOY-OUT-OF-SCOPE  ->  INCONCLUSIVE, the document traces one slug only
N/A   DECOY-EXEMPT-TRACE-INSERTED, DECOY-MARKER-STRIPPED (my test document declares no exemption)
7 of 8 applicable proofs pass, 2 not applicable to this document and named above
```

The single non-pass is inconclusive because my throwaway test document traces one slug, so the
out-of-scope mutation has nothing to work with. That is a property of my fixture, not of the verifier.

**Verdict on (d): VERIFIED.** It is a working verifier with its own mutation harness, it exits nonzero
on failure, and it reports its own limit unprompted ("this checks that a trace RESOLVES. It does not
check that the target SUPPORTS the sentence"). Given the two prior register errors about this file and
that the author has now ruled the dependency dropped partly on the strength of it being real: **it is
real.** The ruling stands on solid ground.

**One thing worth carrying forward.** Lines 349-350 of the same prompt file — the passage the
orchestrator confirmed — say the register property "rests on a vendored copy read at generation time
and a human eye, and if that step is skipped nothing downstream will notice." The extracted verifier
confirms that assessment from the inside: its LIMIT block says the same thing in its own output. Two
of the three properties are mechanical and hold; the third does not, and the file says so. Do not let
"verify_report.js is real" become "verify_report.js checks the claims." It checks that traces resolve.

---

## What this gate changes

**Does not clear:**
- **FIX-9.** CONTRADICTED. No exclusion covers law, the SRE said so at Step 0, the ledger row lost the
  clause, and the live refusal names a geology exclusion on one shared word. Row and fixture both
  need rewriting.
- **ECR-01's `verdict_basis`.** CONTRADICTED on two counts: an unscoped universal its own corpus
  falsifies, and a "reports no effect" summary two of its six members contradict in their own text.
- **LCC-13's demand figure.** The 7,000 L is mis-scoped and no total exists in the source.
- **The §2.1 Colozza prose.** A 354-hour night described as a 708-hour one.
- **Wade's Lane 2017 finding.** Unrostered, against an explicit assurance that it was checked.

**Clears:** FIX-4, FIX-6, FIX-7, FIX-10, FIX-11, FIX-13; five of the six Step 0 corrections in full and
the sixth in its register row; the B7 reclassification; six of eight helium-3 figures; the whole of
`verify_report.js`.

**Status corrections to the 1.11 table.** FIX-4, FIX-6, FIX-9 and FIX-10 are marked `green` and are
red against the prototype today. FIX-10's is the important one: it produces `LITERATURE`/`ANSWERED`,
which is the verdict its own Expected column forbids. Mark them red with named close conditions rather
than carrying four fixtures that will fail on the first run of the suite with nobody having predicted
which four.

**A note on my own record, since it cuts both ways.** At 0.5 I returned eleven CONTRADICTED findings
and one of them was wrong — I claimed a fresh LSEI clone would reinstate duplicates and transcribed
abstracts, and it would not. That error came from asserting a property of a remote from a property of
a local. Every verdict above is from a file opened or a command run in this session, and the ones that
turn on behaviour are from running the prototype rather than from reading its description. The FIX-10
and FIX-9 findings in particular exist only because I ran the router; reading `app_model.js` alone
would have cleared FIX-10 and left the fixture's expected verdict unexamined.
