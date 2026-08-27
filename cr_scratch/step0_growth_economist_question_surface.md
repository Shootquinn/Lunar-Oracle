# Step 0.2 — The Growth Economist: the economics question surface

**Produced by:** The Growth Economist (provisional seat, recruited 0.1b)
**Date:** 2026-08-26
**Deliverable:** the economics slice of the drafted gameplan, plus the economics-side
contested-claims register.
**Drafting assumptions used:** A1 through A5 as fixed by The Manager. Where an answer turns on one
of them I say so at the point it turns.

**What I read.** The gameplan in full. My own specification. The `_intake/japanese-miracle/lit/`
listing (234 entries, 119 summaries). All 24 corpus-unique summaries in full. The
`lsei/literature/growth-and-industrial-theory/` listing (27 files) and four of those summaries in
full. `_intake/japanese-miracle/JM-gameplan.md`, and the original project's FA1 mechanism table,
FA2 verdict table, FA8 disconfirmation ledger, and synthesis header. The app's totals table and its
excluded-node register.

Two things I found before I started drafting, because they change what the rest of this document
has to be.

First, **the Japanese Miracle project was not a literature review about Japan.** It was a
literature review testing a specific lunar thesis: that the Moon can be the third-largest economy
by 2046, which its own Step 0 turned into a falsifiable specification of **41 percent per year for
twenty years, ten doublings, one every 24 months.** Every summary in `_intake/` carries a topic
mapping written against that specification. This corpus is not neutral economics that happens to be
about Japan. It is a prosecution file, and the thing on trial is the claim this Oracle will be
asked about most.

Second, **the transfer test I was hired to perform already exists in draft, and it did not come
here.** `FA1-mechanism-table.md`, left behind in the original folder, tags fifteen Japanese growth
mechanisms transportable, partial, or absent on the Moon. It is a better first pass than a cold
start would produce. That fact is the whole of Part 6, and it changes my answer to Open Question 6.

---

## Part 1. What the Japanese Miracle corpus makes answerable that the Scenario Explorer corpus does not

The Scenario Explorer corpus already carries 27 files under `growth-and-industrial-theory`,
including Solow, Romer, Lucas, Rebelo, Aghion, Jones, Lewis, Murphy, Rosenstein-Rodan, Hausmann,
Henderson, Caballero, Deming, Shewhart, Taylor, Flyvbjerg, and van der Ploeg. That is a theory
shelf. What it does not carry is a **measured episode**. Theory tells you what a growth path can
look like. It cannot tell you what one was made of. The 24 corpus-unique summaries supply the
measurement, and they open six classes of question that were previously unanswerable.

### 1.1 Growth accounting: what a growth rate is made of

Newly answerable: *decompose an observed growth episode into capital, labour, and residual, and say
what the residual is made of.*

| Source | What it supports |
|---|---|
| `jorgenson-2005-industry-origins-japan` | The only full modern KLEMS decomposition on disk. 47 industries, 1960-2000, Domar weights, quality-adjusted capital and labour. Headline: 1960-73 growth 9.89%/yr = capital 5.16 + labour 1.69 + TFP 3.05. Supports any question of the form "how much of growth was accumulation and how much was productivity." |
| `otsu-2007-neoclassical-postwar-japan` | A calibrated one-sector general-equilibrium alternative. Decade decomposition (1960s: output 7.7, capital 9.0, labour -1.6, TFP 5.6). Supports counterfactual questions: what happens if you remove capital destruction, or TFP, or the labour wedge. |
| `aoki-2009-government-tfp-growth` | Aggregate TFP split into agricultural, non-agricultural, and reallocation terms. 1956-73: aggregate 4.78 = agriculture 0.11 + non-agriculture 3.96 + capital reallocation 0.05 + labour reallocation 0.66. Supports "which sector produced the productivity." |
| `may-1977-...-review`, `simonis-1979-denison-boltho-review` | The Denison and Chung sources-of-growth accounts, at second hand. Supports questions about the *named-sources* style of accounting, in which scale economies and reallocation are line items rather than residual. |
| `christiano-1989-japan-saving-rate` | Saving and investment as an endogenous response to a capital deficit, quantified. Supports "why was the saving rate high" without a cultural answer. |
| `esteban-pretel-2009-postwar-japan-policy` | Two-sector calibrated model with explicit policy instruments and running counterfactuals. Supports "what would have happened without policy X." |

The Scenario Explorer corpus cannot answer any of these. It has Solow and Barro, which give the
*form* of a decomposition, and no decomposition.

### 1.2 Capital deepening versus productivity, and the arithmetic of a doubling

Newly answerable: *how fast has a real economy ever deepened capital, and what did it buy.*

Japan's investment share went from 26.1% of GNP in the 1950s to a 35% plateau in the 1960s and
1970s (`otsu-2007`, Table 2). Capital stock grew 9.0%/yr in the 1960s (`otsu-2007`, Table 1) and
capital input contributed 5.16 points of a 9.89-point growth rate (`jorgenson-2005`). Those are the
outer edges of what a national capital-deepening episode has actually achieved. The lunar thesis
requires a value doubling every 24 months, which is 41%/yr. Japan's real GNP doubling time over the
whole miracle was about 7.6 years. The corpus now permits that comparison with measured numbers on
both sides rather than by assertion.

`esri-2016-japan-high-growth-economic-plans` adds the capital-coefficient series (Ohkita, via ESRI):
2.8 (1951-56) rising to 3.4 (1961-66), then to 6.5 (1971-76). The doubling of the capital
coefficient in the final interval is the measured signature of an accumulation episode running out.
That is the closest thing in the corpus to an empirical statement of what capital deepening looks
like when it stops working, and it is the series a lunar projection has to explain away.

### 1.3 Technology absorption

Newly answerable: *how does an economy acquire technology it did not invent, and what does it get.*

- `kiyota-2005-foreign-technology-acquisition`. Firm-level, 1957-70, 9,415 firm-years. Licensing
  raised labour productivity (+2.868 one-year growth coefficient), value added, and the
  capital-labour ratio. **It did not raise TFP.** No significant TFP effect was confirmed, and the
  gains vanished after deregulation, which the authors read as first-mover rent rather than
  technology content.
- `aoki-2009`. The regime and its dismantling: Type A contracts about 100/yr through 1959, rising to
  about 2,000/yr by the late 1960s; approval controls relaxed in 1961, effectively abolished in
  1968. Plus the Nakamura-Ohashi plant-level finding that basic-oxygen-furnace adoption raised steel
  TFP growth from a counterfactual 7% to an actual 17%, with a **learning penalty**: TFP fell 9%
  immediately after adoption and took about two years to beat the technology it replaced.
- `kiyota-2013-import-quota-removal`. 100 four-digit industries, 1960-69. Quota removal had no
  contemporaneous effect on anything; a lagged effect of about +8% on labour productivity. No
  rationalization effect (no shift to fewer, larger plants), unlike Canada.
- `nakamura-1989-postwar-japanese-economy`. Technology imports 1,141 items and $69M (1949-55) rising
  to 10,789 items and $3.205B (1971-75), acquired by licensing rather than inbound FDI, which Japan
  did not encourage.

### 1.4 Industrial policy and its debunkings

Newly answerable: *did directed capital work, and what is the evidentiary standard for saying so.*

`beason-1996-targeting-japan` is the core. Thirteen sectors, 1955-90, four instruments. Every
correlation between sectoral growth and targeting is negative in every period (growth-JDB -0.31,
growth-tax-relief -0.55 full period, -0.77 in 1974-90). Mining ranked first on JDB loans, subsidies,
and tax relief and grew at 3.83%/yr; electrical machinery grew at 12.17%/yr on below-median support.
No robust positive TFP effect anywhere: R-squared 0.068, adjusted R-squared 0.007. But the output
growth and capital accumulation regressions *do* show significant positive coefficients on JDB loans
and level tariffs. **Policy moved capital, not productivity.** That distinction is the single most
useful thing this corpus contains for the lunar case, and I return to it in Part 2.

`wade-2018-developmental-state-dead-or-alive` is the other side, and it is a different argument
rather than a contradiction: Wade's claim is about capability-building institutions and the political
settlement (land reform, embedded autonomy, performance-conditioned protection withdrawn on parity),
not about picking winners. He concedes the targeting evidence directly, quoting the World Bank's
finding that strategic interventions "generally did not work."

`esri-2016` supplies the plans themselves, from the Japanese government's own research institute:
six plans, targets against outcomes, and the fact that **five of the six were overrun by actual
growth and abandoned before their end dates.**

### 1.5 Quality and process control, and how a plant raises its own productivity

The organizational half. This is not decoration; it is the content of social capability at the level
of the firm, and it is the only place in the corpus where a productivity mechanism is described at a
resolution a machine could be asked to execute.

- `spear-1999-decoding-tps-dna`. Four rules. Every activity, connection, and pathway is a standing
  hypothesis with a defined refutation signal and a prescribed response. The rules were never written
  down inside Toyota and transfer only by Socratic questioning. Toyota deliberately holds three
  separately-owned inventories and refuses to pool them, because pooling would hide which problem and
  which owner each buffer belongs to.
- `trist-1951-longwall-coal-getting`. The negative case, and it is the better one for this project. A
  technologically superior production method (mechanized longwall, 200 tons per cycle) delivered a
  settled "norm of low productivity" because the 40-man cycle group existed technologically and did
  not exist socially. Trist is the source that says a production system cannot be evaluated on
  technological grounds alone. That is the exact claim this project needs against a TRL-only reading
  of the lunar case, and it is a 1951 field study rather than a slogan.
- `ryan-2000-self-determination-theory`. Competence, autonomy, relatedness. Load-bearing only if the
  answering loop is asked about human crews; **inert if the lunar workforce is machines**, and saying
  so is my job rather than leaving it as an implication.
- `acemoglu-2020-robots-and-jobs`. The measured effect of substituting robots for labour in a real
  economy: one robot per thousand workers lowers the employment-to-population ratio by 0.37 points
  and wages by 0.73%, with an implied aggregate GDP gain of **0.13 percent** per robot per thousand
  workers. This source is filed under labour economics and nobody has used it on the lunar side. It
  is the only measured estimate on disk of what robotic capital does to output, and it is small.

### 1.6 Contingency: the enabling conditions a growth episode rode on

Newly answerable: *which conditions were supplied by the country and which by the period.*

`beckley-2018-americas-role-japan-miracle` is a synthetic-control estimate: actual 9.3%/yr against a
synthetic Japan's 3.6%/yr, 1958-68, with the in-space placebo ranking Japan 1 of 49 (p about 0.02).
The mechanisms are named and dated: foreign loans doubled in 1958; defence spending fell 20% as a
share of GDP between 1958 and 1960; American purchases rose over 150% from 1958 to 1960; the US
absorbed over 30% of Japanese exports for the following decade.

`dingman-1993-dagger-and-gift-korean-war` is the control on the obvious rival story. Nearly $3B of
American procurement spending 1950-54 and, by Dingman's reading, no new trajectory: the Korean War
accelerated and made permanent what the Pacific War and the Dodge Line had already set in motion.
Beckley's 1951 placebo test agrees from the quantitative side, ranking 26 of 48, a coin flip.

Together these two are the corpus's statement that **a spike is not a sponsor.** I file that as an
enabling condition, not a debunking, and Part 2 explains why the distinction is load-bearing.

---

## Part 2. How an economics question binds to a lunar question, and where the transfer is legitimate

This is the part my seat exists for, so I will state the test before applying it.

**The test.** A mechanism observed in Japan carries to the lunar case only if two conditions hold.
*Social capability:* the follower already possesses the education stock, the financial institutions,
the firm organization, and the political settlement that let the gap become an opportunity rather
than a fact. *Technological congruence:* the leader's technique was selected under the leader's
factor prices and market scale, and stays unprofitable to a follower whose factor prices differ until
they converge. Failing either condition, the resemblance is analogy. Where the condition cannot be
evaluated because nobody has measured it, the answer is a refusal, not a hedge.

Postwar Japan and a lunar industrial base share a real structural story: capital deepening under a
technology gap, with a state deciding where the capital goes. That resemblance is exactly the kind
that produces confident nonsense, because it is true at the level of shape and false at the level of
every condition that made the shape work.

### 2.1 The transfers that survive the test

**T1. Method transfer, on the human side only, and conditionally.** Deming's SQC results and Spear's
four rules both describe productivity gained without new capital. Congruence does not bite, because
method is not selected against a factor-price vector the way a machine is. Capability does bite:
both sources require a trainee who can be taught. Spear is explicit that the rules were never
written down and transfer only through Socratic questioning by a teacher; Trist's whole finding is
that a work system's social structure determines whether a technology delivers. **Legitimate for a
crewed lunar operation. Unknown, and therefore a refusal, for an uncrewed one**, because no source
on disk establishes what "teach a hypothesis-testing discipline to a machine" means. Note that this
is the one mechanism the prior project tagged fully transportable, and its two sources disagree
about the transfer mechanism (register entry R11).

**T2. Macro stability as a precondition, in the weak form only.** Nakamura and ESRI both establish
that the Dodge Line's balanced-budget orthodoxy and the fixed peg preceded the investment boom, and
Nakamura explicitly cautions against calling it a planned economy because final investment decisions
stayed with firms. The transportable kernel is that a stable unit of account and predictable rules
precede capital formation. The peg, the fiscal policy, and the monetary independence are all absent.
Legitimate as a statement about contract and treaty stability. Illegitimate as anything quantitative.

**T3. The negative findings.** This is the largest class of legitimate transfer and the one most
likely to be overlooked. Beason's finding that directed capital raised accumulation without raising
productivity does not require a lunar counterpart of MITI in order to carry. It is a statement about
what happens when an authority allocates capital against a criterion other than measured
productivity, and a lunar programme office allocating against political or programmatic criteria is
in the same position. Congruence does not block a negative result the way it blocks a positive one:
a technique unprofitable under the leader's own factor prices does not become profitable under an
inverted vector. **Negatives transfer more readily than positives, and the corpus is richer in
negatives than the lunar side realises.**

### 2.2 The transfers that are illustration only

**A1. Catch-up requires a leader, and there is none.** Kiyota's licensing mechanism, Aoki's Type A
contract series, Otsu's treatment of TFP as an adoption process for existing foreign technology, and
Nakamura's technology-import counts all presuppose a shelf of proven technique somebody else already
de-risked. Japan's TFP went from 43% of the US level in 1952 to 80% by the early 1970s (`aoki-2009`).
There is no lunar leader and no shelf of proven lunar industrial process, so there is no gap in the
technical sense and nothing to converge toward. Any answer resting on absorption is analogy wearing
a citation.

The corpus makes this worse than the simple version. **Even with a leader, the mechanism did not
deliver TFP.** Kiyota 2005 finds licensing raised capital intensity and labour productivity with no
confirmed TFP effect, and attributes part of the gain to restricted-access rent. Kiyota 2013 finds
no contemporaneous effect from quota removal at all. So the lunar case is missing a mechanism that,
where it existed, produced capital deepening rather than productivity. That is a double negative and
nobody in the merged corpus has stated it.

**A2. Congruence cuts against imported terrestrial technique, hard.** Terrestrial extraction and
process technology was selected against terrestrial factor prices: free atmosphere, 1g settling,
cheap thermal mass, water as a solvent nobody budgets, and abundant maintenance labour. The lunar
vector inverts several of those and does not converge, because the difference is physical rather
than developmental. Abramovitz's own argument says imported technique stays unprofitable under that
condition. That is a stronger and better-sourced statement of ISRU scepticism than an appeal to TRL,
and it is the statement my counterpart cannot make.

**A3. Lewis has no lunar subsistence sector.** `lewis-1954-unlimited-supplies-labour` requires a
low-productivity reserve supplying labour elastically at a roughly constant wage until the turning
point. Japan had agriculture and self-employment; Aoki measures the labour-reallocation term at 0.66
of 4.78 points, and Nakamura records agricultural employment falling by 4 million in 1955-65 and 4.2
million in 1965-75. Esteban-Pretel's mobility-barrier counterfactual (a 14-million-worker floor in
agriculture) costs 18% of 1990 output, the largest single policy effect measured anywhere in this
corpus. A lunar settlement has neither the population depth nor a low-productivity sector. The
mechanism is absent, and it was not small.

**A4. Land reform, the keiretsu, the peg, the defence-burden shed.** No tenure, no peasantry, no
distributional politics, no currency, no exchange rate, no defence budget. Kawagoe's finding is
independently useful as method: a celebrated cause of the miracle that, examined, has no measured
productivity effect and coincided with average farm size *falling* from 1.09 to 0.99 hectares. It is
a warning about folk causes, not a mechanism.

### 2.3 The transfers that are unknown, and therefore refusals

**U1. The demand sponsor.** Beckley's synthetic control attributes a 5.7-point annual growth gap to
an alliance whose economic content was capital access, market access, technology tolerance, and a
decade of the US absorbing over 30% of Japanese exports. Dingman establishes that the spike version
of the same thing did not start anything. My reading, and it is a finding rather than a debunking:
**the lunar analogue needs an external demand sponsor of comparable durability and scale, and the
Oracle must name it and say whether it exists rather than assert the growth and hope.** Whether such
a sponsor exists for the Moon is not established by any source on disk. That is a refusal, not a
hedge, and it is the most important refusal in this document.

It is made worse by a fact from the app rather than the corpus: `grade-independent-demand` is one of
the ten nodes the Scenario Explorer explicitly rules excluded, with the app's own words being "This
app does not model demand." The project's computational authority is silent on precisely the
variable Abramovitz's account makes decisive. See Part 5.

**U2. Lunar depreciation, and the input nobody has named.** The prior project's FA2 reconciliation
already found that the AK growth condition must be compared gross-on-gross, that δ_lunar is
unsourced, and that it is plausibly at or above 10%/yr. I add the reason it is unsourced, and it is
an Abramovitz reason. **Every growth accounting in this corpus embeds a maintenance-labour
assumption that none of them states**, because in Japan the workforce that operated the capital
stock also maintained it at no separately priced cost. Jorgenson's 102 asset types carry
depreciation rates estimated from second-hand and rental markets and from tax lives; those rates are
the observed decay of capital *under continuous free human maintenance*. On the Moon that input is
not free and may not exist. The terrestrial δ is therefore not transportable either, and the honest
statement is that the corpus's depreciation numbers are conditional on an unnamed input. When a
decomposition leaves a term unexplained, the right instinct is that an input is mismeasured or a
condition is unnamed. Here it is both.

**U3. The reference class.** The prior project's red team uses Pritchett's steep hills as the
rebuttal to Pritchett's base rate. Both sides of that exchange are using a sample of **111 countries
with populations, elections, and terms of trade.** A lunar industrial base is not a country. It is a
capital programme with a single sponsor, which puts it in Flyvbjerg's megaproject reference class,
where nine in ten overrun and rail projects post a 44.7% mean cost overrun *simultaneously* with a
51.4% mean demand shortfall. The corpus already holds Flyvbjerg. **Using country base rates at all
is a category error, and it happens to be the generous one.** Which reference class is correct is
not settled by any source on disk, so both must be returned. This refusal changes the answer,
because the two classes disagree about direction rather than only magnitude.

### 2.4 The finding that only this seat produces

The prior project's FA2 verdict is that standard growth theory admits a 24-month doubling in exactly
one place, the AK corner, and only if no nonreproducible factor sits anywhere in capital's
reproduction chain. That is correct, and it is where the analysis stopped. It stopped one step short.

**The closure ratio is not only a physical parameter. It is a choice of technique, and technique is
chosen against a factor-price vector.** A process is high-TRL on Earth because it was selected,
refined, and de-risked under terrestrial factor prices, and terrestrial factor prices make Earth
inputs cheap. A process with high lunar closure is one that avoids Earth inputs, which means it was
selected against a vector no terrestrial engineer has ever faced, which means nobody has built it,
which means it is low TRL. The two properties the seed factory must have simultaneously are
**negatively coupled by factor-price selection**, and the coupling is a mechanism rather than a
coincidence.

The practical consequence: raising the closure ratio is not free progress along one axis. It buys
down the nonreproducible-factor problem at the cost of the TRL the programme was relying on, and
raising TRL by adopting a proven terrestrial process buys back Earth dependence, which is the
nonreproducible link that collapses AK to Solow. This is the point where my necessary condition and
The Space Resources Engineer's necessary condition are not merely both required but actively in
tension, and I state it firmly because it is worth disagreeing with. He will say the coupling is an
engineering problem that a targeted development programme dissolves. My position is that it is a
selection effect rather than an engineering gap, and that a targeted development programme is
precisely what Beason measured: an authority directing capital at accumulation, with no measured
productivity effect. Per A.9 this is presented rather than resolved.

---

## Part 3. The failure mode this project is exposed to

### 3.1 The first-order version

A lunar claim propped up by an economic analogy the economics literature itself does not support.
The claims most at risk, in order of how attractive they are and how badly the corpus fails to
support them:

| # | The claim a user will get, or ask for | Why it fails | The sources that kill it |
|---|---|---|---|
| C1 | "A lunar industrial base can compound like postwar Japan." | Japan compounded at 9.6%/yr with a 7.6-year doubling. The thesis needs 41%/yr and a 24-month doubling. The gap is a factor of four in rate and an order of magnitude in the base-rate distribution. | `nakamura-1989`, `hausmann-2005`, `pritchett-2000` |
| C2 | "Import proven terrestrial ISRU technique and run Japan's absorption play." | Congruence. Technique was selected under an inverted factor-price vector that does not converge. And Kiyota shows absorption produced capital deepening, not TFP, even where a leader existed. | `kiyota-2005`, `kiyota-2013`, `aoki-2009` |
| C3 | "Robots substitute for the missing labour force, so the absence of population is not a problem." | Lucas's population term does cancel, but the input that matters is absorptive capacity, and no source establishes that machine capital carries it. Meanwhile the only measured estimate of what robots do to output is 0.13% GDP per robot per thousand workers. | `lewis-1954`, `acemoglu-2020`, `ryan-2000` (inert) |
| C4 | "A state or agency directing capital at the lunar industrial base is the MITI play." | The MITI play, measured, moved capital and not productivity, and flowed to mining and textiles rather than the fast sectors. For an economy where the doubling time *is* the growth rate, subsidising capital that accumulates without getting more productive is the failure mode itself. | `beason-1996`, `esteban-pretel-2009`, `henderson-2008` |
| C5 | "A large anchor procurement (a CLPS-scale award, a Mars campaign) starts the flywheel." | A spike is not a sponsor. Beckley's 1951 placebo puts the Korean War at rank 26 of 48. The break is the durable 1958 alliance. | `beckley-2018`, `dingman-1993` |
| C6 | "Japan's high saving rate shows a developing economy can finance its own capex." | Christiano's own conclusion is that the subsistence-consumption parameter was chosen to fit the observed hump and is therefore not independent evidence, and Otsu shows the fix fails once labour supply is endogenous. Also there is no lunar household sector to save. | `christiano-1989`, `otsu-2007` |
| C7 | "Land reform / keiretsu / the peg shows institutions can be engineered into place." | Each is either measured to have no productivity effect (Kawagoe), argued not to exist as a coherent object at all (Miwa), or has no lunar counterpart (the peg). | `kawagoe-1999`, `miwa-2002`, `nakamura-1989` |

**What the answering loop must do.** For each of C1 through C7, retrieval must be forced through a
transfer gate before an answer is composed, not after. Concretely: any answer that carries a Japanese
mechanism into a lunar context must emit a **transfer verdict** (legitimate / illustration /
unknown) alongside its citation, and an answer whose verdict is "unknown" is a refusal with the
missing condition named. This is a structural requirement on the loop, and it is drafted as steps
GE-4, GE-5 and GE-8 below.

### 3.2 The second-order version, which is this project's actual failure mode

Everything above can be caught by someone who reads carefully. The version that cannot is this.

**A sentence can pass resolution-grade citation checking and still be an illegitimate transfer.**
The citation resolves. The summary genuinely says what is quoted. The trace grade is honest. The
Fact-Checker's whole apparatus returns green. And the answer is wrong, because a source established
a finding under conditions the answer has silently dropped.

Three worked instances already latent in the corpus, each of which would pass every check currently
in the plan:

**S1. The Denison decomposition, which has no primary source on disk.** Denison and Chung (1976) is
the founding growth accounting of Japan and the number most likely to be quoted. It is present in
this corpus **only** as two book reviews and one encyclopedia relay. `may-1977` reports 1953-71
national income growth of 8.77%/yr with capital 2.10, knowledge 1.97, scale 1.94, labour 1.85, and
resource reallocation 0.95. `simonis-1979` reports 1961-71 growth of 9.56%/yr with a different and
finer breakdown whose own listed components sum to 8.74, roughly 0.8 points short of the stated
total, unreconciled in the review itself. `henderson-2008` relays the May figures with an explicit
free-market editorial stance. An Oracle answer reading "Denison found that capital contributed 2.10
points of Japan's 8.77% growth" is resolution-grade, accurate as a quotation, and **third-hand**.
Worse, an answer that mixes May's and Simonis's numbers is quoting two different periods as though
they were one, and every citation in it resolves.

**S2. Four decompositions, four residuals, one episode.** Jorgenson-Nomura, Denison-Chung (relayed),
Otsu, and Aoki all decompose the same growth episode and produce different TFP shares. Jorgenson
gives TFP 3.05 of 9.89 for 1960-73; Aoki gives aggregate TFP of 4.78 for 1956-73; Otsu gives 5.6 for
the 1960s; Denison gives "advances in knowledge" 1.97 of 8.77, but only because he names scale
economies and reallocation as separate line items rather than leaving them in the residual. The
residual is a function of how many inputs you measured, not a property of Japan. Jorgenson makes the
point against himself in his own Table 14: the same data, same period, gives aggregate-production-
function TFP of 3.72 against Domar-weighted TFP of 3.05, and in 1990-95 the two measures **disagree
about the sign**. Any Oracle answer of the form "Japan's TFP contribution was X" is wrong unless it
names the decomposition, and every version of it cites correctly.

**S3. Three studies that look like independent corroboration and are not.** Beason 1996, Kiyota 2005
and Kiyota 2013 all conclude that Japanese industrial policy moved labour productivity and capital
but not TFP. Returned together, they read as three independent confirmations. Kiyota 2013 states in
its own literature review that this *is* the received finding of the prior two and positions itself
as extending them, and both Kiyota papers share an author, a data lineage, and a methodological
frame. Presenting them as corroboration overstates the evidence by roughly a factor of three, and
every citation resolves.

**The check that catches this.** The Fact-Checker asks whether the source says what the deliverable
claims. The question that has to be asked alongside it is **whether the conditions under which the
source established its finding are present in the case the answer is about.** Those are different
questions and neither subsumes the other. This is the seat's second duty and, on the evidence of S1
through S3, it has work to do on day one against claims already in the corpus rather than against
hypothetical future ones.

---

## Part 4. The economics-side contested-claims register

**Form.** This is written to be consumed by a machine, per the assignment. Each row has a stable
`claim_id`, the axis of disagreement, the source slugs on each side, a `lean` field, and a
`retrieval_rule` stating what the loop must do. `lean` takes one of: `A`, `B`, `neither`,
`not_opposed`, `dependent`. The `not_opposed` value is deliberate and is explained after the table.

**Encoding request to The Engineer (GE-2):** these rows land as front-matter keys on the summaries
themselves, so that retrieving a summary retrieves its register membership. A register that lives
only in this file is a document somebody has to remember to consult, and a reference a machine
cannot follow is a copy.

### 4.1 The register

| id | Claim in dispute | Side A | Side B | Axis | lean | retrieval_rule |
|---|---|---|---|---|---|---|
| R01 | Did sectoral targeting raise Japanese productivity? | `beason-1996-targeting-japan`, `henderson-2008-myth-of-miti`, `kiyota-2013-import-quota-removal` | `wade-2018-developmental-state-dead-or-alive`, `esri-2016-japan-high-growth-economic-plans` | Whether "industrial policy" means picking sectors (A tests this and rejects it) or building capability and coordinating (B claims this and does not test it) | `A` on targeting; `neither` on capability-building | Return both sides. An answer citing Beason alone must state that it addresses targeting instruments only and not institutional capability. |
| R02 | Do bank-centred corporate groups explain Japanese firm behaviour? | `hoshi-1991-corporate-structure-liquidity-investment` | `miwa-2002-fable-of-the-keiretsu` | B attacks A by name and attacks the roster construction A depends on | `B` on roster validity; `neither` on whether main-bank ties mattered, since B's own main-bank test is separate from its roster critique | Never return Hoshi without Miwa. Miwa specifically re-tests Hoshi's classification and finds the firm-size result is an artifact of roster construction. |
| R03 | Was Japan's high saving rate reconstruction of destroyed capital? | `christiano-1989-japan-saving-rate` | `otsu-2007-neoclassical-postwar-japan` | Whether subsistence-consumption preferences are sufficient to delay accumulation. B shows the fix fails once labour supply is endogenous and that TFP is additionally required. | `B` | Return both. A's own limitations section concedes the c* = 0.76 parameter was chosen to fit the target pattern and is not independent evidence. |
| R04 | Was the Korean War procurement boom decisive? | `dingman-1993-dagger-and-gift-korean-war` (secondary, accelerating), `beckley-2018-americas-role-japan-miracle` (1951 placebo, rank 26/48) | The Johnson/Borden line, present only *inside* Dingman's own reporting | Whether a procurement spike starts an episode | `A`, strongly | This is the corpus's clearest case of a **one-sided register entry**: the affirmative side is present only as reported speech. The loop must say so rather than returning A as an uncontested consensus. |
| R05 | Did land reform cause postwar agricultural growth? | `kawagoe-1999-japan-land-reform` (no measured productivity effect; farm size fell) | `nakamura-1989-postwar-japanese-economy` (reports it as a successful structural reform), `wade-2018` (political-settlement precondition) | Political success against measured economic effect. These are answering different questions. | `not_opposed` | Return all three with a note that A measures productivity, B reports distribution, and C claims a political precondition. An answer that treats these as a disagreement is wrong. |
| R06 | How large was labour reallocation out of agriculture as a growth source? | `aoki-2009` (0.66 of 4.78 TFP points), `may-1977` relaying Denison (0.95 of 8.77) | `henderson-2008` carrying the caveat that human-capital-adjusted controls shrink it toward zero | Whether the reallocation gain is bodies moving or education moving with them | `dependent` on the control set | Any answer quoting a reallocation magnitude must state which accounting produced it. The band runs from near-zero to about one point, never "large". |
| R07 | What share of Japanese growth was TFP? | `jorgenson-2005` (3.05 of 9.89, Domar-weighted), `aoki-2009` (4.78 aggregate), `otsu-2007` (5.6 in the 1960s) | `may-1977`/`simonis-1979` relaying Denison (knowledge 1.97 of 8.77, with scale and reallocation itemised separately) | **The residual is a function of how many inputs were measured.** Not a disagreement about Japan. | `dependent` | **Hard invariant.** No answer may state a TFP share without naming the decomposition, the period, and whether scale and reallocation were itemised. Jorgenson's own Table 14 shows the same data giving 3.72 or 3.05 and, in 1990-95, opposite signs. |
| R08 | Is the Denison and Chung decomposition itself citable from this corpus? | `may-1977`, `simonis-1979`, `henderson-2008` | (no primary source on disk) | Provenance depth, not substance | `neither` | **Hard invariant.** Any answer touching Denison must be labelled as reported through a review. The two reviews cover different periods (1953-71 at 8.77; 1961-71 at 9.56) and Simonis's own component list does not sum to his stated total. Never mix them. |
| R09 | Did technology acquisition raise productivity? | `kiyota-2005` (capital and labour productivity yes, TFP not confirmed), `kiyota-2013` (no contemporaneous effect, +8% lagged labour productivity) | `aoki-2009` relaying Nakamura-Ohashi (BOF adoption raised steel TFP from 7% to 17% counterfactual) | Firm-level and aggregate against a single plant-level technology case | `neither`, and the gap is a measurement level | Return both levels. The apparent contradiction dissolves once the level is named: one technology in one industry can raise TFP while the policy in aggregate does not. |
| R10 | Are Beason, Kiyota 2005 and Kiyota 2013 independent evidence for the same conclusion? | (the naive reading) | `kiyota-2013`'s own literature review, which positions itself as extending the prior two | Correlated evidence presented as independent | `B` | **Hard invariant.** Never return more than one of these three as corroboration without stating the shared lineage. |
| R11 | How does a productivity method transfer? | `spear-1999-decoding-tps-dna` (unwritten rules, Socratic teaching, transfer succeeds only where receiving managers replicate the questioning) | `deming-1967-japan-quality-control` (SQC transferred by lecture and course, named gains inside a year, little new machinery) | Tacit against codified transfer | `neither` | **This is the pair the lunar case turns on**, because method transfer is the one mechanism tagged fully transportable. If Spear is right the mechanism needs a teachable agent; if Deming is right it needs a codified procedure. Return both whenever the loop is asked whether method transfers to machines. |
| R12 | Did economic plans cause growth or merely accompany it? | `henderson-2008` (six plans, actual growth exceeded target every time, therefore not causal) | `esri-2016` (same fact, read as an "announcement effect" after Sato 1990: firms treated the official forecast as a floor and set more ambitious internal targets) | **Same fact, opposite readings.** ESRI's Table 12-1 shows real growth underestimated in all six years 1955-60. | `neither` | The single most instructive row in the register. An Oracle that retrieves the six-plans-overrun fact and returns one reading has taken a side without knowing it. Return both readings whenever that fact appears. |
| R13 | Did directed credit (FILP, JDB) matter? | `esteban-pretel-2009` (counterfactual removal of subsidies and FILP barely changes aggregate output) | `hoshi-1991` (main-bank ties materially relax investment financing constraints), `wade-2018` (directed credit central to the model) | Aggregate counterfactual against firm-level channel | `A` at the aggregate level, `neither` at the firm level | Return both and name the level. Esteban-Pretel also reports FILP was under ten percent of total industrial lending, citing Hayami and Godo. |
| R14 | Is patient, relationship-based capital an advantage? | `hoshi-1991`, `wade-2018` | `caballero-2008-zombie-lending-japan` | The same institution, at two points in its life. B shows it becoming the mechanism that prolonged stagnation once shielded from mark-to-market discipline. | `not_opposed` | Return both. This is a condition-dependent mechanism, not a disputed fact, and the condition (forbearance, absent honest loss absorption) is the transferable part. |
| R15 | What is the right reference class for a lunar growth projection? | `pritchett-2000`, `hausmann-2005` (cross-country growth distribution; steep hills exist) | `flyvbjerg-2014-what-you-should-know-megaprojects` (megaproject distribution; nine in ten overrun, with simultaneous demand shortfall) | Whether the object is a country or a capital programme | `neither`, and I lean B on the merits | **New.** Not currently framed as a dispute anywhere in either corpus. Both classes must be returned for any base-rate question about the lunar economy. |
| R16 | Do robots substitute for a missing workforce as a growth engine? | `lewis-1954` (the analogue argument: idle reproducible capacity as a surplus factor), `chirikjian`/`freitas`/`lee` self-replication papers | `acemoglu-2020-robots-and-jobs` (measured: 0.13% aggregate GDP per robot per thousand workers, negative employment and wage effects) | Theoretical substitution against measured output effect | `neither` | **New.** Acemoglu sits in this corpus and has never been used against the lunar substitution claim. Return it whenever the loop is asked whether robotic capital substitutes for the missing labour force. |
| R17 | Is a growth acceleration persistent? | `hausmann-2005` (83 accelerations, bar 3.5%/yr, sustained about half the time), `pritchett-2000` (pre/post-break growth rank correlation 0.24) | (no side on disk claims persistence) | — | `A`, uncontested | Return with an explicit note that no source in the corpus argues the other way. An uncontested claim is different from a claim with no register entry. |

### 4.2 Three classes of register entry, and why the distinction matters

The assignment asked for claims the corpus carries in more than one direction. Working through it, I
found that the naive form of that instruction produces a register that is wrong in two ways, and the
loop needs to know which class it is looking at.

1. **Genuine two-sided claims** (R01, R02, R03, R06, R12, R13, R15, R16). Two sources, same
   question, opposite answers. Return both or refuse. This is the class The Recruiter anticipated.
2. **False pairs** (R05, R09, R14, and partly R01). Sources that look opposed and are answering
   different questions, or describing the same mechanism under different conditions. Returning both
   is still correct, but returning them *as a dispute* is a new error the register itself would
   introduce. Each of these rows carries `not_opposed` or a level-naming rule for that reason.
3. **One-sided and pseudo-independent claims** (R04, R08, R10, R17). The dangerous class, and the
   one nobody has named. R08 is a claim with no primary source on disk. R10 is three sources that
   look like corroboration and share a lineage. R04's affirmative side exists only as reported
   speech inside its own critic. R17 is genuinely uncontested and should be flagged as such rather
   than left indistinguishable from a claim nobody registered. **A register that only records
   disagreements cannot express any of these**, and each is a way for a well-cited answer to be
   wrong.

### 4.3 My MITI adjudication, which is the ruling the corpus cannot produce on its own

The corpus carries Beason, Henderson, Kiyota, and Aoki against Wade and ESRI, and it has no referee.
Left alone, a retrieval mechanism hands the user whichever side it found first. The ruling:

**Japan's growth is explained by gap plus capability plus improving congruence, and industrial
targeting is not required to do any of the explanatory work.** The gap is measured (TFP at 43% of
the US level in 1952, 80% by the early 1970s, `aoki-2009`). The capability is measured (compulsory
schooling extended six years to nine, the Godo-Hayami finding that GDP catch-up outran schooling
catch-up on a lagged vocational-training effect, and the absorptive capacity that turned licensing
into productivity, `aoki-2009`, `nakamura-1989`). The congruence improvement is measured (the whole
technology-licensing series, and the shift from adoption toward domestic innovation visible in the
falling technology-import/GNP ratio against the rising R&D/GNP ratio, `aoki-2009`).

That account is **consistent with Beason and with Henderson**, because it does not need targeting.
It **leaves Wade standing exactly where his claim is about capability-building** rather than about
picking winners: land reform as a political settlement, performance-conditioned protection withdrawn
on parity, embedded autonomy, and the education stock. And it **assigns ESRI's plans their actual
role**, which is coordination and expectation-setting, consistent with ESRI's own announcement-effect
reading and with Nakamura's warning against calling it a planned economy.

Consequence for the lunar case, and it is unflattering: of the three terms in the ruling, the gap
does not exist (no leader), the congruence term runs the wrong way (an inverted factor-price vector
that does not converge), and capability is the only one obtainable, and it is obtainable only in the
form the corpus is least sure about (method transfer to a non-human agent, R11). **The mechanism the
lunar programme is most likely to reach for, directed capital, is the one my ruling says was not
doing the work.**

---

## Part 5. What a grown-up answer contains that the prototype's does not

### 5.1 The five additions

1. **A transfer verdict, stated separately from the citation.** Legitimate, illustration, or
   unknown, with the condition named. The prototype's five verdicts are about whether a claim can be
   supported. This is a sixth axis: whether the support licenses the use.
2. **A named decomposition wherever a share is quoted.** No bare "TFP contributed X". The
   decomposition, the period, and whether scale and reallocation were itemised. (R07.)
3. **Both sides of a registered claim, or a refusal.** The retrieval invariant, extended with the
   three classes in 4.2 so that a false pair is not reported as a dispute and a one-sided claim is
   not reported as a consensus.
4. **Provenance depth.** Primary, reported through a review, or relayed by a tertiary source. S1
   shows the corpus's most-quoted number is at third hand, and no grade in the prototype expresses
   that.
5. **The reference class the base rate came from**, whenever a base rate is used. (R15.)

### 5.2 A worked example

**Question.** "Japan grew at nearly 10 percent a year for two decades. Could a lunar industrial
base do the same?"

**Prototype-grade answer.** Japan's real GNP grew 9.6%/yr from 1946 to 1973 (`nakamura-1989`),
driven by capital deepening (investment share rising from 26% to 35% of GNP, `otsu-2007`) and TFP
catch-up (`jorgenson-2005`). A lunar base with high ISRU closure and a directed-capital programme
could pursue a similar trajectory. Every citation resolves. Every quote is accurate. The answer is
wrong.

**Grown-up answer.**

> The number is right and the question it answers is not the one asked.
>
> **The measured episode.** Japan's real GNP grew 9.6%/yr, 1946-73 (`nakamura-1989`, primary). Under
> Jorgenson and Nomura's Domar-weighted accounting, 1960-73 growth of 9.89%/yr was capital 5.16,
> labour 1.69, TFP 3.05 (`jorgenson-2005`, primary). Under Aoki's sectoral accounting aggregate TFP
> was 4.78 for 1956-73 (`aoki-2009`, primary). Under Denison and Chung's named-sources accounting,
> 1953-71 growth of 8.77% was capital 2.10, knowledge 1.97, scale 1.94, labour 1.85, reallocation
> 0.95 (`may-1977`, **reported through a book review; no primary on disk**). These differ because
> they measured different numbers of inputs, not because they disagree about Japan (R07, R08).
>
> **What the question is really asking.** A 9.6%/yr rate is a 7.6-year doubling. The lunar thesis
> under test requires a 24-month doubling, which is 41%/yr. So "the same as Japan" is roughly a
> quarter of the required rate, and the difference is not a margin, it is the entire question.
>
> **Transfer verdicts on the mechanisms that produced Japan's number.**
> - Capital deepening: *illustration*. The mechanism exists but the magnitude does not carry.
>   Japan's 35% investment share is the historical ceiling for a national economy; the lunar path
>   needs reproduction rates an order of magnitude above it, which is the AK corner rather than the
>   Japanese case.
> - TFP catch-up: *illustration*. Requires a leader and a proven shelf. There is none
>   (`aoki-2009`, `kiyota-2005`). And where a leader existed, absorption raised capital intensity
>   and labour productivity with no confirmed TFP effect (`kiyota-2005`).
> - Labour reallocation out of agriculture: *absent*. No subsistence sector (`lewis-1954`,
>   `aoki-2009`, `esteban-pretel-2009`).
> - Directed capital: *legitimate as a negative only*. Targeting correlated negatively with growth
>   in every period Beason measured, with no TFP effect (`beason-1996`). Registered against Wade and
>   ESRI, whose claim is about capability-building rather than targeting (R01, R12).
> - The sponsor: *unknown, refusal*. Japan's growth acceleration dates to 1958 and the durable
>   alliance, not to the 1950-53 procurement spike (`beckley-2018` synthetic control, 9.3% against
>   3.6%; 1951 placebo rank 26/48; `dingman-1993`). Whether the Moon has a demand sponsor of
>   comparable durability is not established by any source on disk, and the app does not model
>   demand (`grade-independent-demand`, excluded). **This is the missing input, and the answer stops
>   here rather than assuming it.**
>
> **Base rate, both reference classes (R15).** As a country: the observed miracle bar is 3.5%/yr
> sustained about half the time (`hausmann-2005`), and pre/post-break growth correlates at 0.24
> (`pritchett-2000`). As a capital programme: nine in ten megaprojects overrun, with rail posting a
> 44.7% mean cost overrun alongside a 51.4% mean demand shortfall (`flyvbjerg-2014`). The second
> class is the better fit and it is the harsher one.
>
> **Answer.** No mechanism in the Japanese record supports a 41%/yr lunar path, and the three that
> produced Japan's own 9.6% are respectively absent, leaderless, or measured to have moved capital
> rather than productivity. The one door standard growth theory leaves open is the AK corner, and
> whether lunar capital can walk through it is a closure-ratio question, not an economics question.
> The single unresolved condition that would change this answer is the sponsor, and it is unnamed.

That is the difference. Same sources, same citations, and a different answer.

### 5.3 My position on Open Question 5, stated separately

**Does the app remain the sole computational authority once the merged corpus is larger than it?**

**Yes, and the correct move is to make the app's authority smaller and sharper rather than larger.**
I disagree in advance with any answer that promotes the corpus to a second calculator.

Three reasons.

**First, the app's domain is narrower than the rule's current wording implies.** The Scenario
Explorer models a lunar water plant: mass, energy, capture efficiency, ice grade, delivered cost,
plant-mass payback. It carries 20 Claims, 66 sections, 76 modelled nodes. It also carries **10 nodes
it explicitly rules excluded**, and the exclusions are the interesting half: it does not model
demand, does not model delivery capacity, does not model oxygen, iron, or helium-3 production, and
does not model programme milestones. So the app is not a general lunar authority whose scope is
being outgrown. It is a narrow, well-governed model whose boundary is already documented in its own
prose.

**Second, the economics the corpus contains is not the kind of thing an authority computes.** There
is no competing calculation here. The corpus does not carry an alternative water-plant model. It
carries growth accounting of a different economy in a different century, which cannot compute a
lunar quantity and must never be allowed to look as though it could. **The prototype's rule already
handles this correctly and needs no revision: a question the app can answer is answered from the app,
never from a summary that happens to carry a number.** The corpus's job is the complement, and it is
not computation. It is saying what a number does not license.

**Third, the thing that must change is retrieval, not authority.** The single most valuable object
in the app for this Oracle is the excluded-node register, and it is currently the least reachable
thing in the repository. "This app does not model demand" is the correct, complete, and final answer
to a large class of questions users will ask, and right now it is a table cell in a generated map.
**Promote the ten exclusions to first-class retrieval objects with their own refusal text**, so the
loop can return "the authority declines to model this, here is its own statement of why" instead of
silently reaching into the corpus for a plausible-looking number. A missing input is a refusal, not
a fallback, and this is the largest set of known-missing inputs in the project.

**Where I would disagree with The Systems Engineer.** If his position is that the corpus should hold
computational authority in domains the app excludes, I am against it, and firmly. That would convert
the corpus's exclusion boundary into a soft edge and give the Oracle two answers to every
quantitative question, which is the exact failure the directory map exists to prevent. If his
position is that the app's authority needs a stated *scope* rather than being sole authority full
stop, we agree and the disagreement is about wording. Per A.9 this is recorded rather than resolved.

This answer does not change under A1 through A4. It does change under a future assumption nobody has
stated: if Lunar Oracle ever ships its own model in `oracle/`, then there are two authorities and
the rule needs a precedence order. That should be written now, before it is needed.

---

## Part 6. The open question the author has not ruled on (Open Question 6)

**One paragraph, as instructed, and I do not take ownership of it.**

The FA1 through FA8 deliverables are **not the same kind of object as a summary, and the difference
is a retrieval contract rather than a taxonomy slot.** A summary is a faithful, single-source,
non-adjudicating description whose entire warrant is that every claim in it resolves to one PDF. An
FA deliverable is a cross-source adjudication carrying a verdict column, a transportability tag, and
derived arithmetic that appears in no source: `FA1-mechanism-table.md` tags fifteen mechanisms
transportable, partial, or absent on the Moon; `FA2-verdict-table.md` returns a model-by-model
verdict against a 24-month doubling and states plainly that its own net-MPK threshold is "the
summarizer's calibration, not a number lifted from the papers"; `FA8-deliverable.md` is a
disconfirmation ledger of objection-and-rebuttal pairs. Merging these into `literature/` puts
derived, unattributable numbers into a corpus whose whole contract is that a citation resolves, and
the Oracle will then cite a verdict as though it were a finding, which is the second-order failure
mode of Part 3 arriving by the front door. Keeping them out costs more than it looks like it costs:
the FA1 mechanism table is the best existing statement of the transfer test this seat exists to
apply, and rebuilding it from scratch is real work that is already done. So the cost is symmetric
and the shape is clear either way. If they merge, the taxonomy must gain a derivation grade and the
resolution-grade guarantee is quietly broken for a subset of files that look exactly like the
others. If they do not merge, this repository holds **two corpora with two contracts**: a source
corpus where every claim resolves to a paper, and a findings corpus where every claim resolves to a
named adjudication over the source corpus, retrievable only with its grade attached. That second
shape is structural, it is more work, and it is the one I would build.

---

## Gameplan steps

Numbered `GE-n` for integration at 0.3. Each carries a proposed placement rather than an absolute
step number, since four other agents are numbering in parallel. Ordering within the list is
execution order.

| # | Step | Assigned To | Placement | Depends on |
|---|---|---|---|---|
| **GE-1** | **Land the economics-side contested-claims register as corpus structure.** Take the 17 rows in Part 4 and encode each as machine-readable front matter on every summary named in the row: `register_ids`, `register_side` (A/B), `register_lean`, `register_class` (two_sided / false_pair / one_sided). A summary can belong to several rows. Emit `literature/_registers/economics.yaml` as the join table. Fail the merge build if a row names a slug that is not on disk. | The Engineer (write), The Growth Economist (adjudicate any row The Engineer finds ambiguous) | Inside the corpus merge, not after it | The merge taxonomy being fixed |
| **GE-2** | **Add a `provenance_depth` field to every economics summary.** Values: `primary`, `via_review`, `via_tertiary`. Populate it. At minimum `may-1977`, `simonis-1979` and `henderson-2008` are not primary, and between them they are the corpus's only route to the Denison and Chung decomposition. | The Engineer (write), The Growth Economist (assign values for the 24 corpus-unique files) | Same step as GE-1 | GE-1 |
| **GE-3** | **Rule on whether the Denison and Chung monograph is acquired.** The most-quoted growth accounting in the corpus has no primary source on disk and its two reviews cover different periods with unreconciled component sums. Either acquire the 1976 Brookings monograph and summarise it, or mark R08 permanently `neither` and hard-block any answer that states a Denison figure without the review label. | The Growth Economist (recommend), the author (rule at a gate) | A named decision, not a build step | GE-2 |
| **GE-4** | **Specify the transfer gate as an answering-loop stage.** Any answer that carries a mechanism from the Japanese corpus into a lunar context must emit a transfer verdict: `legitimate`, `illustration`, or `unknown`, with the failing or unevaluable condition named. `unknown` composes a refusal, not a hedge. The gate runs before answer composition, not as a post-hoc review. | The Software Engineer (specify), The Growth Economist (supply the verdict rules) | Answering-loop definition (Objective 3) | GE-1 |
| **GE-5** | **Write the transfer-gate acceptance assertions.** At minimum: an answer citing `kiyota-2005` in a lunar-absorption context asserts `illustration`; an answer citing `lewis-1954` in a lunar-labour context asserts `illustration`; an answer citing `beckley-2018` on sponsorship asserts `unknown` and names the sponsor as the missing input; an answer quoting a TFP share without a named decomposition fails. Per `lit_review: yes`, each assertion names the primary source it validates against. | The Software Engineer (write), The Growth Economist (supply the cases) | TDD front end, same step as the retrieval-invariant suite | GE-4 |
| **GE-6** | **Extend the retrieval invariant to three register classes.** The Recruiter's invariant ("both sides or refuse") is correct for `two_sided` and produces new errors on the other two. Specify: `two_sided` returns both or refuses; `false_pair` returns all members with a level-naming or condition-naming note and must not be presented as a dispute; `one_sided` returns the single side plus an explicit statement that the corpus carries no counter-source. | The Software Engineer (specify and test), The Growth Economist (classify) | TDD front end | GE-1, GE-5 |
| **GE-7** | **Promote the app's ten excluded nodes to first-class retrieval objects.** Each gets its own refusal record carrying the app's own exclusion prose. `grade-independent-demand` is the load-bearing one, because demand is the variable the sponsor question turns on. Retrieval must be able to reach an exclusion directly and return it as an answer. | The Systems Engineer (own, since it is the app-authority boundary), The Software Engineer (retrieval), The Growth Economist (state why demand matters most) | Immediately after the answering loop is defined | Objective 3 |
| **GE-8** | **Build the merged mechanism table as a first-class corpus artifact.** Rebuild the FA1 transportability table over the merged corpus, with every row's evidence resolving to a summary in `literature/` and every tag carrying the capability or congruence condition that produced it. This is the object the transfer gate at GE-4 reads. Recover from `FA1-mechanism-table.md` rather than starting cold, subject to GE-12. | The Growth Economist (write), The Space Resources Engineer (review every row tagged `transportable`, per A.9, disagreements presented rather than resolved) | After the merge lands, before the loop goes live | GE-1, GE-12 |
| **GE-9** | **Write the closure-TRL coupling finding into the corpus as a standing tension.** The claim: closure ratio is a choice of technique, technique is selected against a factor-price vector, and high lunar closure and high terrestrial TRL are therefore negatively coupled. Stored with both positions side by side and neither marked correct. | The Growth Economist (position A), The Space Resources Engineer (position B), the orchestrator (records both) | 0.3 integration, then carried forward | Both Wave 1 lunar and economics slices |
| **GE-10** | **Add the reference-class rule to base-rate answers.** Any answer using an empirical base rate for a lunar growth or cost projection returns both the country class (`pritchett-2000`, `hausmann-2005`) and the megaproject class (`flyvbjerg-2014`), and states which object the question is about. | The Software Engineer (invariant), The Growth Economist (rule) | With GE-6 | GE-6 |
| **GE-11** | **Source or bound the two unnamed inputs.** (a) `δ_lunar`: no source on disk supplies it, and every terrestrial depreciation rate in the corpus embeds a free-maintenance-labour assumption none of them states. (b) The demand sponsor: named or refused. Until sourced, both are declared gaps carried in the corpus rather than defaults silently adopted. | The Growth Economist (declare and bound), The Space Resources Engineer (a: hardware failure and maintenance evidence), the author (b: rule on whether to pursue) | After GE-8 | GE-8 |
| **GE-12** | **Decide the FA1-FA8 question before the taxonomy freezes.** Part 6 is my one-paragraph verdict: different kind of object, different retrieval contract. If the author rules them in, the taxonomy needs a derivation grade before the merge lands, not after. If out, GE-8 is a full rebuild rather than a port. **This blocks GE-8 and it is cheap now and expensive later.** | The author (rules), the orchestrator (escalates at 0.8) | Before the merge taxonomy freezes | Part 6 |

---

## Context recipes for the steps above

| Step | Agent | Files / Excerpts |
|---|---|---|
| GE-1 | The Engineer | Part 4 of this file (the register table and the three classes). The merged-corpus taxonomy as fixed by his own 0.2 deliverable. Filename listing of `literature/`. Not the summaries themselves; the row identifies its slugs. |
| GE-1 | The Growth Economist | Part 4 of this file. Any summary The Engineer flags as ambiguous, in full. |
| GE-2 | The Growth Economist | `may-1977-...-review`, `simonis-1979-denison-boltho-review`, `henderson-2008-myth-of-miti` in full (the three non-primary routes). Citation blocks only for the other 21 corpus-unique files. |
| GE-3 | The Growth Economist | The two review summaries in full. The FA1 source ledger entry 11a if it follows per GE-12. |
| GE-4, GE-5, GE-6, GE-10 | The Software Engineer | Parts 3, 4 and 5 of this file. `cr-agents/method/tdd_method.md` (full). The prototype's five verdicts from `lsei/oracle/answer_question.js`. **Not** the corpus; the invariants are structural. |
| GE-4, GE-5 | The Growth Economist | Parts 2 and 3 of this file. The worked example in 5.2 as the acceptance target. |
| GE-7 | The Systems Engineer | `lsei/lunar-scenario-explorer-map.md`, the excluded-nodes table and the totals table only. Part 5.3 of this file. |
| GE-8 | The Growth Economist | All 24 corpus-unique summaries. `lewis-1954`, `hausmann-2005`, `caballero-2008`, `flyvbjerg-2014`, `henderson-2008` from `growth-and-industrial-theory`. `FA1-mechanism-table.md` if GE-12 rules it in. |
| GE-8 | The Space Resources Engineer | The merged mechanism table draft, rows tagged `transportable` only. His own 0.2 deliverable. |
| GE-9 | Both | Part 2.4 of this file and the corresponding section of the lunar question surface. Nothing else; the tension is stated, not researched. |
| GE-11 | The Growth Economist | `jorgenson-2005` (the asset table and depreciation methodology), `beckley-2018`, `dingman-1993`. The app's `grade-independent-demand` exclusion prose. |
| GE-12 | The orchestrator, for the 0.8 gate | Part 6 of this file. `FA1-mechanism-table.md` and `FA2-verdict-table.md` headers only, as the exhibits. |

---

## Where my answers depend on a drafting assumption (A5)

- **A1 (public repository).** Changes nothing in Parts 1 through 5. It does bear on GE-1 and GE-2:
  a public corpus carrying `register_lean` fields is publishing adjudications under this project's
  name, which is a stronger claim than publishing summaries. If the repository were private I would
  still want the field. Public, I want it stated in the README that a lean is this project's
  judgment and not the sources' consensus.
- **A2 (the corpus is here permanently; summaries push, PDFs do not).** Load-bearing for GE-3. If
  the Denison and Chung monograph is acquired, its PDF stays on disk and its summary pushes, which
  is the normal case and creates no new problem.
- **A3 (working copies float on main).** Load-bearing for GE-7. If `lsei/` floats, the ten
  exclusions can change upstream without notice, and a promoted exclusion object would then be a
  copy that drifts. The exclusion register must be regenerated from the app at build rather than
  transcribed. Under a pinned working copy the transcription would be safe and I would still prefer
  regeneration.
- **A4 (Claude Code only).** Simplifies GE-4 through GE-6: the transfer gate can be an instruction
  in the loop rather than a service, and the acceptance suite can run against files on disk.
