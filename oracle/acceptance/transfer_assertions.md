# The transfer-gate acceptance assertions

**Sub-step 4.5 (ECON-5). Written before the gate exists.** The gate is built at 4.6 (ECON-4b) by The
Software Engineer against this file; the specification it implements is `oracle/transfer_gate.md` and
the verdict store it reads is `oracle/mechanism_table.md`.

**These assertions are the TDD deliverable of 4.5 and are not freeze spend.** The wave's standing
block makes TDD sub-steps the explicit exception: where the brief says write the suite first, those
tests are the deliverable. Recorded here as well as in the ledger so a later reader does not have to
find the ledger to know it.

**`CONTRACT_VERSION_UNDER_TEST = 2`**, read out of `oracle/answer_contract.md` §9 at authoring time.
**`REGISTER_SCHEMA_VERSION_UNDER_TEST = 2`**, read out of `oracle/register_schema.md`. TG-01 asserts
both still hold; if either moves, this file is re-read before anything here is trusted.

**Counting rule.** Rows in the tables below whose first cell matches `^TG-[0-9]+$`. Counted by
running that rule over this file, not by adding up a delta: **42 assertions**, in eight groups —
VERSION 1, VERDICT 8, CASE 9, DIRECTION 4, REFCLASS 5, REGCLASS 9, TABLE 4, DECOY 2. Ids are assigned
once and never renumbered, so TG-42 sits in group 6 by position rather than by id — it was written
after the rest, and renumbering the file around it would orphan any reference already made to an id.

**Status column.** `green` = passes today, and the observation that shows it is in the row. `RED` =
expected to fail today, for a named reason, with a named owner and a named close condition. `H` = a
human gate, listed because it is part of the contract and marked so nobody counts it as mechanized.
A RED assertion is a defect report with a close condition; it is never quietly relaxed.
**`UNRUN IS NOT PASS`. `VACUOUS IS NOT PASS`.**

**Every assertion names the primary it validates against.** Sub-step 4.5's context recipe requires
`kiyota-2005`, `lewis-1954` and `beckley-2018` read in full, and A.10 step 2 requires source
verification for every fixture that cites a summary. Where the column reads `--`, the assertion is
structural and cites no source; there are nineteen such rows and each says why in its own cell.

**Status tally, counted by the same rule.** 7 green, 1 split (TG-09: green on the table, RED on
emitted lines), 33 RED, 1 human gate. The RED majority is the honest state: the gate does not exist
yet, and an assertion marked green before the mechanism runs is the defect this project has already
shipped twice.

---

## 1. VERSION — the two pinned integers

| ID | What is tested | Pass criterion | Primary | Status |
|---|---|---|---|---|
| TG-01 | The two versions this file was written against still hold | `oracle/answer_contract.md` §9 yields `2` and `oracle/register_schema.md` yields schema version `2`, both read at test time, never from a copy in this file | -- structural | green |

## 2. VERDICT — the closed set and its three tests

`oracle/transfer_gate.md` §3.3 states three verdicts and a test for each. §3.4 states a four-value
basis set and the mechanical rule that maps basis to verdict.

| ID | What is tested | Pass criterion | Primary | Status |
|---|---|---|---|---|
| TG-02 | The verdict set is closed at three | A transfer line carrying any word other than `legitimate`, `illustration`, `unknown` fails the run. `partial`, `transportable`, `absent`, `likely`, `probable` all fail | -- structural, the closed set | RED — owner The Software Engineer, closes at 4.6 |
| TG-03 | `legitimate` names two sources | A `legitimate` verdict whose emitted line names fewer than two sources, one per condition, fails | -- structural | RED — 4.6 |
| TG-04 | `illustration` names its disanalogy | An `illustration` verdict with an empty condition, basis or disanalogy field fails. Falsifier F8 | -- structural | RED — 4.6 |
| TG-05 | `unknown` names the unmeasured quantity and the region searched | An `unknown` verdict emitting neither fails | -- structural | RED — 4.6 |
| TG-06 | `unknown` composes `REFUSE`, not a hedge | A run emitting a transfer line reading `unknown` whose verdict is anything other than `REFUSE` fails. Falsifier F9 | `beckley-2018-americas-role-japan-miracle.md` | RED — 4.6 |
| TG-07 | The refusal is priced as a refusal | On an `unknown`, personas spent is zero and the deliverable is at most sixty words excluding trace lines, per contract §5 | -- structural, contract §5 | RED — 4.6 |
| TG-08 | The basis-to-verdict map is mechanical, not discretionary | Over every row of `oracle/mechanism_table.md`: `unmeasured` on either condition implies `unknown`; `absent` or `inverted` on either with no `unmeasured` implies `illustration`; `holds` on both implies `legitimate`. Zero rows violate | -- structural, over the table | green — 24 of 24 rows conform, checked row by row at authoring |
| TG-09 | `absent` is not a fourth verdict | The token `absent` appears in a `capability` or `congruence` field and never in a `verdict` field, anywhere in `oracle/mechanism_table.md` or in an emitted transfer line. This is the §3.4 premise correction, and it is asserted rather than trusted because the acceptance target for this gate emits `absent` as a verdict word | -- structural, §3.4 | green on the table; RED on emitted lines — 4.6 |

## 3. CASE — the named acceptance cases

The three cases the sub-step names, plus the ones the specification requires alongside them. Each
runs a question through the loop and asserts the emitted transfer line.

| ID | Question class | Asserted transfer line | Primary | Status |
|---|---|---|---|---|
| TG-10 | `kiyota-2005` cited in a **lunar absorption** context — "could a lunar programme license proven terrestrial ISRU technique and run Japan's absorption play?" | `illustration`, `both`; capability `absent`, congruence `inverted`; disanalogy names the missing leader | `kiyota-2005-foreign-technology-acquisition.md` | RED — 4.6 |
| TG-11 | The same question must not return `legitimate` on the strength of Kiyota's own positive figures | An answer quoting the 33.1 percent TFP and 33.9 percent labour-productivity gaps without emitting `illustration` fails. **The figures are real, the citation resolves, and the transfer is still illegitimate** — this is the whole failure mode the gate exists for | `kiyota-2005-foreign-technology-acquisition.md` | RED — 4.6 |
| TG-12 | The same question must carry Kiyota's own qualifier | An answer citing `kiyota-2005` for a productivity claim that does not state that the effect is capital-augmenting and the TFP channel is not confirmed fails. The source says this in its own abstract and conclusions | `kiyota-2005-foreign-technology-acquisition.md` | RED — 4.6 |
| TG-13 | `lewis-1954` cited in a **lunar labour** context — "robots substitute for the workforce the Moon does not have" | `illustration`, `both`; capability `absent`, congruence `holds`; disanalogy names the missing subsistence sector and the missing wage floor. **Not `unknown`**: the condition is measured and known to be missing, and §3.4's map sends a measured-missing condition to `illustration` | `lewis-1954-unlimited-supplies-labour.md` | RED — 4.6 |
| TG-14 | `lewis-1954` cited for the **idle-capital substitution** instead | `unknown`. The two are different questions and the gate must not answer one with the other: Lewis's own summary records the idle-capital candidate as a structural analogy his text does not support or test. MT-17 is the row, and its basis is `unmeasured` on both conditions | `lewis-1954-unlimited-supplies-labour.md`, `acemoglu-2020-robots-and-jobs.md` | RED — 4.6 |
| TG-15 | `beckley-2018` cited **on sponsorship** — "would a large agency commitment start a lunar flywheel?" | `unknown`, and the refusal names **the sponsor** as the missing input, `literature/` plus the app as the region searched, and Beckley as the nearest present object | `beckley-2018-americas-role-japan-miracle.md` | RED — 4.6 |
| TG-16 | `beckley-2018` cited **on the spike** — "a CLPS-scale award starts the flywheel" | `legitimate`, `negative`. The 1951 placebo at rank 26 of 48 is a measured negative and it transfers; the positive does not. MT-08 | `beckley-2018-americas-role-japan-miracle.md`, `dingman-1993-dagger-and-gift-korean-war.md` | RED — 4.6 |
| TG-17 | The app's silence is printed, not paraphrased | An answer touching lunar demand prints the `grade-independent-demand` exclusion sentence verbatim and labels it the app declining, never as an app-sourced value, per `register_schema.md` §3.2 | `lsei/index.html`, the excluded-node table | RED — 4.6 |
| TG-18 | A TFP share with no named decomposition fails | Any answer quoting a productivity share without naming the decomposition, the period, and whether scale and reallocation were itemised fails, whatever its transfer verdict. This is `ECR-07`'s hard invariant reaching the gate, and MT-23 is the row that licenses it | `jorgenson-2005-industry-origins-japan.md`, `denison-1972-classification-of-sources-of-growth.md` | RED — 4.6 |

## 4. DIRECTION — the field that stops a verdict licensing its own negation

| ID | What is tested | Pass criterion | Primary | Status |
|---|---|---|---|---|
| TG-19 | Every `legitimate` carries a direction | A `legitimate` transfer line with no direction fails. Falsifier F10 | -- structural | RED — 4.6 |
| TG-20 | **The highest-value assertion in this file.** `beason-1996` must not license its own converse | A question asking whether a lunar programme office should direct capital at chosen activities returns `legitimate`, **`negative`**. An answer that returns `legitimate` and then supports directing capital fails. Beason measured negative correlations in every period and no robust TFP effect; a direction-free `legitimate` reads as "the mechanism transfers" and a composer will use it the wrong way round | `beason-1996-targeting-japan.md` | RED — 4.6 |
| TG-21 | The R-squared figures are not reported as correlations | An answer quoting 0.137 or 0.183 as a correlation between targeting and output growth or capital accumulation fails. They are the explained variance of two regressions; the significant coefficients are DJDB(-1) 0.00400 and 0.00336 and TAR(-1) 0.00511 and 0.00310. **This mislabel is live in a predecessor of MT-10 and it resolves against a real file** | `beason-1996-targeting-japan.md` | RED — 4.6 |
| TG-22 | The lineage is not returned as corroboration | An answer returning more than one of `beason-1996`, `kiyota-2005`, `kiyota-2013` in support of one conclusion without stating the shared lineage fails. `ECR-10` | `kiyota-2013-import-quota-removal.md`, whose own literature review states the dependence | RED — 4.6 |

## 5. REFCLASS — the reference-class rule

`oracle/transfer_gate.md` §2.

| ID | What is tested | Pass criterion | Primary | Status |
|---|---|---|---|---|
| TG-23 | Both classes are returned | An answer using an empirical base rate for a lunar growth or cost projection cites at least one country-class leaf **and** the megaproject leaf, and states which object the question is about. Falsifier F6 | `pritchett-2000-hills-among-plateaus.md`, `hausmann-2005-growth-accelerations.md`, `flyvbjerg-2014-what-you-should-know-megaprojects.md` | RED — 4.6 |
| TG-24 | DECOY: the single-class answer is caught | Take a produced base-rate answer off disk, delete the `flyvbjerg-2014` trace, assert TG-23 goes red. A green here voids the rule | as TG-23 | RED — 4.6 |
| TG-25 | **Flyvbjerg is not fabricated against** | The strings `47.9`, `8.5` and `0.5` do not appear together as a success cascade attributed to `flyvbjerg-2014` in any answer. The summary records that this cascade was searched for across the full extracted text of both the published and the arXiv version and is absent from both. Falsifier F7 | `flyvbjerg-2014-what-you-should-know-megaprojects.md` | RED — 4.6 |
| TG-26 | Hausmann's persistence figure carries its bar | An answer stating that accelerations are "sustained about half the time" without naming the 2 percent bar fails. The 37 of 69 is measured against 2 percent a year, one full point below the 3.5 percent bar that defined the acceleration | `hausmann-2005-growth-accelerations.md` | RED — 4.6 |
| TG-27 | The rule does not fire on a physical measurement | A question about lunar oxygen specific energy does not attach the two reference classes. The trigger at §2.1 is closed to empirical base rates and a rule that over-fires is a rule composers learn to ignore | -- structural, the §2.1 trigger | RED — 4.6 |

## 6. REGCLASS — the three-class retrieval invariant

`oracle/transfer_gate.md` §1. These are the assertions the falsifier table F1 to F5 demands.

| ID | What is tested | Pass criterion | Primary | Status |
|---|---|---|---|---|
| TG-28 | **`two_sided` returns every side, not two.** The class name is historical; `transfer_gate.md` §1.2 is the authority on what it means | For a delivered `CONTESTED` answer on a `two_sided` axis, the set of side letters its `literature` traces resolve to equals the axis's declared set. Not "at least two". **A three-sided axis returning two sides fails.** Falsifier F1 | `ECR-13` fixture, three sides: `esteban-pretel-2009-postwar-japan-policy.md`, `hoshi-1991-corporate-structure-liquidity-investment.md`, `wade-2018-developmental-state-dead-or-alive.md`. **The exemplar was challenged and held:** the source-verification sweep read `ECR-13` as a mislabeled `false_pair` precisely because it carries three sides, which is the pre-ruling reading of the class name. Refuted in the comment block above the `ECR-13` `A` row of `oracle/REGISTER.econ.tsv` | RED — 4.1/4.6 |
| TG-29 | The population TG-28 has to cover is measured, not assumed | Across both loaded registers: 18 `two_sided` axes, of which **7 declare more than two sides** (`LCC-01`, `-03`, `-04`, `-07`, `-09`, `-12`, `ECR-13`; `LCC-07` declares four). `one_sided` is exactly 1 in all 7 cases. `false_pair` runs 2 to 4 over 8 axes, which is correct for a class that returns all members. If a later count differs, TG-28's fixture set is stale | -- structural, over both registers | green — measured, command in `transfer_gate.md` §1.2 |
| TG-42 | Four sides is the case that makes F1 bite hardest | `ECR-07` and `LCC-07` each declare four member sides. An answer on either carrying three fails. `ECR-07` is `false_pair` so it runs against TG-31's class; `LCC-07` is `two_sided` so it runs against TG-28's. Both are listed because they are the only two axes on either register where "two traces" and "every side" differ by more than one | `may-1977-how-japans-economy-grew-so-fast-review.md`, `simonis-1979-denison-boltho-review.md` for `ECR-07`; `LCC-07`'s own members for the lunar half, owned by The Space Resources Engineer | RED — 4.1/4.6 |
| TG-30 | `false_pair` is not framed as a disagreement | `disagree`, `contradict`, `dispute` and their inflections are absent from a delivered `false_pair` answer, `axis_statement` included. Falsifier F2 | `ECR-05` fixture: `kawagoe-1999-japan-land-reform.md` | RED — 4.1/4.6 |
| TG-31 | **`false_pair` names the separating level or condition.** The assertion the word-list check passes vacuously without | A delivered `false_pair` answer states the axis's `scope_token` noun. Falsifier F3 | `ECR-09` fixture: `kiyota-2005-foreign-technology-acquisition.md` against `aoki-2009-government-tfp-growth.md`, whose apparent contradiction dissolves once the measurement level is named | RED — 4.1/4.6 |
| TG-32 | The F3 test cannot go vacuous unnoticed | Every `false_pair` axis on every loaded register carries a non-`-` `scope_token`. Measured across both loaded registers: 8 of 8, the two lunar ones (`LCC-08`, `LCC-11`) included. A future `false_pair` axis with `-` makes TG-31 untestable on it, silently, and this assertion is what fires instead | -- structural, over the register | green — measured across both registers, 8 of 8 |
| TG-33 | `one_sided` never produces `CONTESTED` | A run on a `one_sided` axis whose verdict is `CONTESTED` fails. Contract §1 makes Rule V unsatisfiable there, which fails as a refusal with no reason code | `ECR-04`, `ECR-08`, `ECR-10`, `ECR-17`, `ECR-18` | RED — 4.1/4.6 |
| TG-34 | `one_sided` carries its disclosure verbatim | The `register_schema.md` §7 fixed text appears once, byte-for-byte, read from that file at test time and never from a copy here. Falsifier F5 | -- structural, fixed text | RED — 4.1/4.6 |
| TG-35 | **`one_sided` is not padded.** The most attractive failure the register can produce, because it reads as balance | A delivered `one_sided` answer contains no claim-bearing sentence attributed to a position with no `M` row on that axis. Falsifier F4. Human gate: the machine can check side arity, it cannot recognise an invented counterposition. Recorded through contract §8's `review` column, where the value a padded answer earns is `FILLED` | `ECR-08`: the other side is a monograph ruled permanently unacquired at 2.9, so any second side in that answer was invented | H — human sampling read, per the sampling protocol at 7.4-7.7 |

## 7. TABLE — the verdict store the gate reads

| ID | What is tested | Pass criterion | Primary | Status |
|---|---|---|---|---|
| TG-36 | Every row's evidence resolves | Every leaf on every `- **leaves:**` line of `oracle/mechanism_table.md` resolves under `literature/`. Zero unresolved | -- structural, over the table | green — 67 references, 42 distinct, 0 unresolved; command and digest at `cr_scratch/step4_manager_econ.md` |
| TG-37 | The extraction is not silently partial | The count of distinct leaves the resolution command returns equals the count of distinct leaves a multiline-aware parse of the same file returns. **This assertion exists because the check under-counted twice, by 18 leaves and then by 5, and reported success both times.** Each failure was the extractor's scope being narrower than the field's definition, which is invisible in the output | -- structural | green — 42 = 42 after the second fix. The first extraction returned 24 and the second 37, both exiting clean |
| TG-38 | Every row carries all nine fields | No row of `oracle/mechanism_table.md` has an empty `verdict`, `direction`, `capability`, `congruence`, `disanalogy`, `leaves` or `axis`. `direction` is `-` exactly when `verdict` is `unknown` | -- structural | green — 24 of 24 |
| TG-39 | A mechanism not on the table defaults to `unknown` | A transfer line for a mechanism with no row in `oracle/mechanism_table.md` reads `unknown` and refuses. Falsifier F11. **The default is chosen**: the alternative licenses every transfer nobody has thought about | -- structural, §3.7 | RED — 4.6 |

## 8. DECOY — the two assertions that test the tests

| ID | What is tested | Pass criterion | Primary | Status |
|---|---|---|---|---|
| TG-40 | The gate cannot be satisfied after the fact | Mutate a produced answer by appending a transfer line to a composed answer rather than emitting it before composition; assert the run fails. Falsifier F12. A gate that passes on a post-hoc line is a review, and a review can only ask the composer to try again, which is a second retrieval repairing a first | -- structural, §0 ordering | RED — 4.6 |
| TG-41 | The decoys apply | Every decoy in this file is built by changing bytes in an answer the loop actually produced and wrote to disk, never by constructing a counterexample string. A decoy that fails to apply is a failure, not a skip | -- structural | RED — no produced answers exist yet; closes when the loop produces its first answer at 4.6 |

---

## 9. What this file does not assert

Stated so that nobody counts it as covered.

1. **That a mechanism-table verdict is correct.** These assertions check that the gate emits the
   verdict the table carries, that the table's basis-to-verdict map is mechanical, and that every
   leaf resolves. Whether `MT-14` should be `legitimate` rather than `illustration` is a judgement
   with an author, and it closes by a person's sampling read or it does not close.
2. **That a summary supports the sentence beside it.** Contract §4's `literature` limit line already
   says this and no assertion here weakens it.
3. **The closure-versus-TRL tension.** `oracle/mechanism_table.md` §3 stores two positions and marks
   neither correct. There is nothing to assert; asserting one side would be the resolution the
   sub-step forbids.
4. **`δ_lunar`'s magnitude.** §4.1 bounds it and names the assumption. An assertion that the bound is
   right would need a lunar measurement, which is the thing that does not exist. What could be
   asserted, and is left to whoever owns the cost path: that no answer quotes a lunar depreciation
   rate without the maintenance clause. That assertion belongs with the cost mechanism, not with the
   transfer gate, and it is relayed rather than parked here.
