# The transfer gate, and the two retrieval invariants that run beside it

**Written against `oracle/answer_contract.md` version 2 and `oracle/register_schema.md` schema
version 2.** Both integers were read out of those files at authoring time, not remembered.

**What this file is.** Three stages the economics side adds to the answering loop, in the order they
run. A Claude session executing `oracle/answer_contract.md` follows this file the way it follows that
one: it is apparatus, not documentation. Sub-steps 4.2 (ECON-6), 4.3 (ECON-10) and 4.4 (ECON-4).

**What this file is not.** It builds nothing. The gate at §3 is implemented at 4.6 (ECON-4b) by The
Software Engineer, against the assertions at `oracle/acceptance/transfer_assertions.md`, which were
written before this specification was finished and are the acceptance target for it. The split is
deliberate: a specification and a suite with no build step between them is not a mechanism.

Every term below marked *closed* is closed. A value outside a closed set is a failure, not a variant.

---

## 0. Where these three stages sit in the loop

```
classify sub-claims                     (answer_contract.md section 1)
  |
  +-- section 1  register-class invariant     -- fires when an axis fired
  +-- section 2  reference-class rule          -- fires when a base rate is used
  +-- section 3  transfer gate                 -- fires when a mechanism is carried
  |
compose the answer
```

**All three run before composition, not after.** A gate that runs after composition is a review, and
a review can only ask the composer to try again — which is a second retrieval to repair a first, and
`register_schema.md` §1 forbids it. The three stages are also independent: a question can fire all
three, and each emits its own output. Nothing here reaches into another stage's decision.

---

## 1. The retrieval invariant, extended to three register classes

### 1.1 What the register already fixes, and what it does not

`register_schema.md` §9 assertion `L5` fixes the **side arity** of each class, at load time:

```
L5  SIDE ARITY BY CLASS
    class two_sided or false_pair: at least two distinct M.side values
    class one_sided:               exactly one distinct M.side value
```

`L5` is a check on the file. It says nothing about what a delivered answer carries, and an answer can
satisfy every load-time assertion and still be one-sided, mis-framed, or padded. The three invariants
below are the answer-time half. Each is stated with **a falsifier** — the observation that would show
the invariant is not being enforced — because an invariant with no falsifier is a sentence, not a
control.

**Measured before writing.** All eighteen `ECR` axes already carry a class, and every class value is
one of the three:

```
$ awk -F'\t' '$1=="A"{print $3}' oracle/REGISTER.econ.tsv | sort | uniq -c
      6 false_pair
      5 one_sided
      7 two_sided
```

### 1.2 `two_sided`

**Ruling: the class name is historical, and the invariant is EVERY side.** Sub-step 4.2 as the plan
words it says `two_sided` "returns **both** sides or refuses", and that wording is wrong about the
registers as they stand. The class is not renamed — renaming touches every register row and every
fixture, and the defect is that the invariant counts, not that the word is ugly. The name is
therefore read as an identifier, and this section is the authority on what it means.

**Measured across both loaded registers, before the ruling:**

```
$ for f in oracle/REGISTER.lunar.tsv oracle/REGISTER.econ.tsv; do
    awk -F'\t' '$1=="A"{c[$2]=$3} $1=="M"{s[$2"\t"$3]=1}
      END{for(k in s){split(k,a,"\t"); n[a[1]]++} for(x in n) print c[x], n[x]}' "$f"; done \
  | sort | uniq -c
      3 false_pair 2
      3 false_pair 3
      2 false_pair 4
      7 one_sided 1
     11 two_sided 2
      6 two_sided 3
      1 two_sided 4
```

**Seven of the eighteen `two_sided` axes carry more than two sides** — `LCC-01`, `-03`, `-04`, `-07`,
`-09`, `-12` and `ECR-13`, of which `LCC-07` declares four. The other two classes are consistent with
their own rules: `one_sided` is exactly 1 in all seven cases, satisfying `L5`; `false_pair` runs 2 to
4, which is correct because that class returns all members by definition.

**Invariant.** The answer carries at least one `literature` trace resolving to a member of **every**
side letter the axis declares, or the run refuses `axis-incomplete`. Not two traces — every side.
On a three-sided axis, two traces is one-sidedness with an extra source.

**Why this is not cosmetic.** Implemented literally against `LCC-01`, an answer about water ice at
Cabeus returns two of three measurement methods and drops the third silently — and the router has
then chosen which measurement the reader hears. That is the same hazard the `CONTESTED` persona cap
was removed for, and `LCC-01`'s own `axis_statement` says it out loud: *"Three measurement methods
report the water-ice concentration at Cabeus crater and their central values span about an order of
magnitude."* Three. The class label says two. The composition path is already right — its wave
selection takes the side count with a minimum of two and no cap — so **the router is correct and the
invariant prose was wrong**, which is the direction of defect a specification is supposed to catch
before the code, and did not.

**Falsifier.** Take a delivered `CONTESTED` answer on a `two_sided` axis. Compute the set of side
letters its `literature` traces resolve to, from the `M` rows of that axis. If that set is a proper
subset of the axis's declared side letters and the run did not refuse, the invariant is not enforced.
**A three-sided axis returning two sides must fail**, and before this ruling nothing caught it.
Seven econ axes are live for this test — `ECR-02`, `-03`, `-11`, `-12`, `-13`, `-15`, `-16` — and
`ECR-13` is the one among them that makes the difference bite, because it declares three.

**Why refusal rather than a partial answer.** A side that does not resolve is a broken register row,
which routes to a named owner. Delivering the sides that did resolve converts a repairable defect
into a delivered one-sided answer, and nothing downstream can tell the difference.

### 1.3 `false_pair`

**Invariant, two halves.** The answer carries every side, **and** it names the level or the condition
that separates the members. The second half is not decoration: the whole content of the class is that
these sources are not opposed, and an answer that returns them without saying why they are not
opposed has presented an unexplained pair, which a reader resolves as a dispute.

The banned-word half is already fixed by `register_schema.md` §3.2 — `disagree`, `contradict`,
`dispute` and their inflections are failures anywhere in a `false_pair` answer, `axis_statement`
included. The `scope_token` column supplies the separating noun on the four axes that carry one:
`ECR-01` *productivity measure and instrument*, `ECR-05` *outcome measured*, `ECR-06` *decomposition,
period and control set*, `ECR-07` *decomposition, period and itemisation*, `ECR-09` *measurement
level*, `ECR-14` *period*.

**Falsifier, also two.**

1. *Framing.* A banned inflection present in a delivered `false_pair` answer. This one is mechanical
   and The Software Engineer already owns it.
2. *Silence.* A delivered `false_pair` answer that carries every side, carries no banned word, and
   never states the axis's `scope_token` noun. **This is the falsifier that matters**, because the
   word-list check passes vacuously on it. Measured before relying on it: **all eight `false_pair`
   axes across both loaded registers carry a non-`-` `scope_token`** — the six econ axes above plus
   `LCC-08` and `LCC-11` — so the test is total over the class today and needs no prose fallback.
   The two econ axes carrying `-` are `ECR-12` and `ECR-17`, neither of which is a `false_pair`.
   If a future `false_pair` axis lands with `-`, this test goes vacuous on it silently, which is why
   the guard is an assertion at `oracle/acceptance/transfer_assertions.md` rather than this sentence.

### 1.4 `one_sided`

**Invariant, three clauses.**

1. **Verdict.** `LITERATURE` or `BOTH`. Never `CONTESTED` — contract §1 rules that a `one_sided`
   axis makes Rule V *unsatisfiable* rather than merely wrong, and an unsatisfiable requirement fails
   as a refusal carrying no reason code.
2. **Disclosure.** The fixed text at `register_schema.md` §7 appears verbatim, once, and is quoted
   from that file at answer time rather than from a copy.
3. **No padding.** No second side is constructed at answer time. Specifically: not from a member of
   another axis, not from a `findings` entry, not from the app, and not from a sentence of the form
   "others hold that ..." with no `M` row behind it.

**Clause 3 is the one this file exists to add.** `L5` prevents a second side from being written *onto
disk*; nothing prevented one from being invented *at composition*, and a padded one-sided answer is
the most attractive failure the register can produce, because it reads as balance. `ECR-04`, `-08`,
`-10`, `-17` and `-18` are the five live cases, and each is padded in a different direction if the
clause is missing: `ECR-04`'s affirmative side exists only as reported speech inside its own critic;
`ECR-08`'s other side is a book ruled permanently unacquired at sub-step 2.9; `ECR-10`'s single side
is three sources that share a lineage, so padding it means presenting that lineage as three
independent confirmations; `ECR-17` has no counter-source in this corpus at all; `ECR-18`'s single
measurement reaches the corpus only inside a source reporting it.

**Falsifier.** A delivered answer on a `one_sided` axis whose `literature` traces resolve to two or
more distinct side letters — impossible under `L5`, so this half tests the loader — **or** which
contains a claim-bearing sentence attributed to a position with no `M` row on that axis. The second
half is the live one and it is a human sampling read, not a script: contract §8's `review` column is
where its result is recorded, and `FILLED` is exactly the value a padded one-sided answer earns.

---

## 2. The reference-class rule

### 2.1 Trigger, closed

The rule fires when an answer uses an **empirical base rate** for a lunar growth or cost projection.
*Empirical base rate*: a frequency, rate, proportion or distribution drawn from an observed
population of prior cases and applied to the lunar case as a prior. It is **not** a physical
constant, an engineering measurement at a stated system boundary, or an app recompute — those are
`APP`, `FIGURE` or `LITERATURE` answers with their own scope tokens, and routing them through this
rule would attach two irrelevant reference classes to a specific-energy number.

### 2.2 The rule

**Both classes are returned, named as classes, and the answer states which object the question is
about.** Register axis `ECR-15` carries this and its `lean` is `neither`: the corpus does not settle
which class is correct, so returning one is an adjudication performed by selection.

**The country class — `pritchett-2000-hills-among-plateaus.md`, `hausmann-2005-growth-accelerations.md`.**
What it licenses: growth in developing countries is not one process. A single trend explains a median
0.67 of the variance for developing countries against 0.95 for industrial ones, and is below 0.5 for
40 percent of them; the rank correlation of a country's own growth before and after its structural
break is 0.24; the qualifying bar for an acceleration is 3.5 percentage points a year sustained over
eight years, 83 episodes clear it since the 1950s, and 37 of the 69 classifiable episodes stay above
a 2 percent bar for the following decade.

**The megaproject class — `flyvbjerg-2014-what-you-should-know-megaprojects.md`.**
What it licenses: nine in ten megaprojects overrun; for rail, a 44.7 percent mean cost overrun occurs
*alongside* a 51.4 percent mean demand shortfall, which is the pair, not two independent figures.

**The statement of the object.** A lunar industrial base is a capital programme with a single sponsor.
The country class is sampled from 111 and 110 countries respectively, all of which have populations,
elections and terms of trade. That is a fact about the sample and it is stated, not adjudicated.

### 2.3 Three scope disciplines the sources impose on their own figures

These are not caveats added by this file. Each is stated inside the summary of the source it
constrains, and quoting the figure without it is a misuse the citation check cannot catch.

1. **Pritchett's taxonomy cutoffs are the author's own intuition.** The 1.5 and 3 percent boundaries
   are described in his footnote 9 as "somewhat arbitrary and ... rigged according to the outcomes
   that corresponded to my intuitive feel, particularly to retain the United States as a hill not a
   plateau." A count of steep hills is therefore a count under those cutoffs. The 0.24 is a rank
   correlation, not a probability of persistence.
2. **Hausmann's 83 is one point in a filter-dependent range.** The authors call the three thresholds
   "defensible, but admittedly arbitrary" and report 37 episodes at a ten-year horizon and 125 at a
   five-year horizon. And "sustained about half the time" is 37 of 69 measured against a **2 percent**
   bar, one full point below the 3.5 percent bar that defined the acceleration. Reporting the ratio
   without the bar overstates what persisted.
3. **Flyvbjerg's one-in-a-thousand is his own illustrative deduction, not a measurement.** The paper
   states it as arithmetic on three separate one-in-ten claims and immediately runs a factor-of-two
   robustness check on itself. Separately and more sharply: **the widely circulated "47.9 percent on
   budget, 8.5 percent on budget and on time, 0.5 percent on all three" cascade is not in this paper
   in any form**, exact or approximate; the summary records that it was searched for across the full
   extracted text including notes and references and is absent from both the published and the arXiv
   version. Attributing it to `flyvbjerg-2014` is a fabrication that resolves.

### 2.4 Falsifier

A delivered answer that uses an empirical base rate for a lunar growth or cost projection and cites
exactly one of the three leaves in that role. Also: any answer attributing the 47.9/8.5/0.5 cascade
to `flyvbjerg-2014`.

**Note on provenance.** Flyvbjerg's own proposed remedy is reference-class forecasting. This rule is
that remedy applied to this corpus, and returning one class is the failure the remedy names.

---

## 3. The transfer gate

### 3.1 Trigger, closed

The gate fires when an answer **carries a mechanism** into a lunar context: it asserts, about the
lunar case, a causal relation whose evidence is a source about Japan or about a terrestrial economy.

**Quoting a Japanese figure as a Japanese figure is not a transfer.** "Japan's aggregate TFP grew
4.78 percent a year, 1956 to 1973" is a `LITERATURE` answer with a scope token. "A lunar base can
run the same catch-up process" is a transfer. The distinction is the subject of the sentence, and
it is testable.

### 3.2 The test

Two conditions, both from the same account of why catch-up works:

- **Social capability.** The follower already possesses the education stock, the financial
  institutions, the firm organisation and the political settlement that let a gap become an
  opportunity rather than a fact.
- **Technological congruence.** The leader's technique was selected under the leader's factor prices
  and market scale, and stays unprofitable to a follower whose factor prices differ until they
  converge.

### 3.3 The three verdicts, closed, with a test each

| Verdict | Condition | Test |
|---|---|---|
| `legitimate` | Both conditions were evaluated against a named source and both hold **for the direction claimed**; or the claim is a negative and congruence does not block it (§3.5). | Name the source that establishes each condition. Two names, or the verdict is not `legitimate`. |
| `illustration` | At least one condition was evaluated and **found to fail**, and the answer names which one and what the disanalogy is. | Name the failing condition and the disanalogy. A verdict of `illustration` with no named disanalogy is a hedge wearing a label. |
| `unknown` | At least one condition **cannot be evaluated** because no source on disk measures it, and no condition has been found to fail. | Name the unmeasured quantity, and name the region searched. |

**`unknown` composes a refusal, not a hedge.** Zero personas, sixty words excluding trace lines, three
nouns: the absent object (the unmeasured condition), the region searched (`literature/` and the app),
and the nearest present object (the source that established the finding for Japan).

**Reason code, and a misfit this file reports rather than hides.** The refusal is written under
`not-found`. Contract §5 states `not-found`'s condition as *"No address resolved and no shelf file
confirmed"*, and that is not what happened here: shelf files were confirmed, and what is missing is a
measurement of a *condition* rather than a source for a *claim*. `not-found` is the closest of the
six and its owner — a corpus gap, and an acquisition decision — is the correct owner. **The wording
of §5's condition does not cover this case**, and the fix is either a widened condition or a seventh
code. Both are contract edits, `answer_contract.md` is not this seat's file, and inventing a code
here would put a closed set in two places. Relayed at `cr_scratch/step4_manager_econ.md` §Relays.

### 3.4 `absent` is not a fourth verdict

The worked example this gate is accepted against emits five verdict words across five mechanisms:
`illustration`, `illustration`, **`absent`**, **`legitimate as a negative only`**, `unknown`. The
closed set has three values. That is a real conflict between the specification and its own acceptance
target, and it resolves in the specification's favour, twice, without losing anything the example
said.

**`absent` is a basis, not a verdict.** §3.2's test reads: *failing either condition, the resemblance
is analogy.* A mechanism whose enabling condition is measured and known to be missing has failed a
condition, so its verdict is `illustration` and its basis is `absent`. A mechanism whose condition
cannot be evaluated is `unknown`. Collapsing those two into one word would be the error; keeping
`absent` as a fourth verdict would split `illustration` on a distinction the test does not draw.

**The basis field, closed set of four.** `absent` (condition measured, missing), `inverted`
(condition measured, present and running the wrong way), `holds` (condition measured, present),
`unmeasured` (condition not evaluable from disk). Every verdict names one basis per condition, and
the basis is what makes the verdict auditable. `unmeasured` on either condition forces `unknown`.

### 3.5 The `direction` field, closed set of three

`positive`, `negative`, `both`.

**Why it is not optional.** The largest class of legitimate transfer in this corpus is the negative
findings, and a bare `legitimate` on `beason-1996-targeting-japan.md` licenses the *negation* of what
Beason measured. Beason found that directed capital correlated negatively with sectoral growth in
every period and produced no robust TFP effect. Marked `legitimate` with no direction, that verdict
reads as "the directed-capital mechanism transfers", which a composer will use to support a lunar
programme office directing capital. Marked `legitimate/negative`, it says what it means: what carries
is that an authority allocating capital against a criterion other than measured productivity gets
accumulation without productivity.

The asymmetry has a reason and it is congruence: a technique that is unprofitable under the leader's
own factor prices does not become profitable under an inverted vector, so congruence blocks a
positive transfer and does not block the corresponding negative.

### 3.6 What the gate emits

One line per mechanism carried, fixed grammar, fixed arity:

```
Transfer (<verdict>, <direction>): <mechanism> -- <condition>/<basis>: <the disanalogy, or the unmeasured quantity>
```

It sits beside the citation and is not a trace line. A trace asserts that a locator resolves; this
line asserts something about the **use** of what resolved, which is a different axis and the reason
the six verdicts and three grades could not express it. It carries no grade and no origin.

**Claim-bearing status.** Contract §7: a unit is claim-bearing if it holds a numeral, a unit token, a
coefficient name, or a named source. A transfer line naming a mechanism and a disanalogy holds none
of those, so it is not automatically claim-bearing. If its author puts a figure or a source name in
it, it becomes claim-bearing like any other unit and carries a trace. The line does not get an
exemption for being structured.

### 3.7 Where the gate reads its verdicts from

`oracle/mechanism_table.md`. Every row of that table carries a verdict, a direction, a basis per
condition, and evidence resolving to a file under `literature/`.

**A mechanism not on that table is `unknown`.** This default is chosen and not inherited. The
alternative default — treat an unlisted mechanism as `legitimate` until someone objects — licenses
every transfer nobody has thought about yet, which is the whole failure mode. `unknown` composes a
refusal, so the cost of the safe default is a refusal that a table row converts into an answer, and
the owner of that refusal is whoever should have written the row.

### 3.8 What the gate does not do

It does not adjudicate the register, it does not fetch a counterpart, it does not compose, and it
issues no retrieval of its own. Its outputs are one line per mechanism and, on `unknown`, a refusal.
A mechanism with no ability to combine cannot become a reconciliation.

---

## 4. Falsifiers, collected

Every invariant in this file, with the observation that shows it is not being enforced. This table is
the contract between this file and `oracle/acceptance/transfer_assertions.md`; a row here with no
assertion there is an invariant nobody tests.

| # | Invariant | Falsifier |
|---|---|---|
| F1 | `two_sided` returns every side | A delivered `CONTESTED` answer whose `literature` traces cover a proper subset of the axis's side letters, with no refusal |
| F2 | `false_pair` is not framed as a disagreement | A banned inflection in a delivered `false_pair` answer |
| F3 | `false_pair` names the separating level or condition | A delivered `false_pair` answer carrying every side, no banned word, and no statement of the axis's `scope_token` noun |
| F4 | `one_sided` is not padded | A claim-bearing sentence on a `one_sided` answer attributed to a position with no `M` row on that axis |
| F5 | `one_sided` carries its disclosure | The §7 fixed text absent, paraphrased, or quoted from a copy rather than from `register_schema.md` |
| F6 | Both reference classes are returned | A base-rate answer citing exactly one of the three leaves in a base-rate role |
| F7 | Flyvbjerg is not fabricated against | The 47.9/8.5/0.5 cascade attributed to `flyvbjerg-2014` |
| F8 | `illustration` names its disanalogy | A transfer line reading `illustration` whose condition/basis or disanalogy field is empty |
| F9 | `unknown` refuses | A transfer line reading `unknown` in an answer whose verdict is not `REFUSE` |
| F10 | `legitimate` carries a direction | A transfer line reading `legitimate` with no direction, or with `positive` where the underlying finding is a negative |
| F11 | The default is `unknown` | A transfer line for a mechanism with no row in `oracle/mechanism_table.md` reading anything other than `unknown` |
| F12 | The gate runs before composition | A run whose log shows an answer composed and then a transfer line appended |
