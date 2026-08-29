# W4-4 — The Manager, economics. Chain 4.2 → 4.3 → 4.4 → 4.5 → 7.1 → 7.2 → 7.3

One sitting, in order. This file is the seat record: what landed where, what I measured, which
premises in my own brief did not survive measurement, what I owe other seats, and the ledger. The
deliverables are the four files under `oracle/`; this is not one of them.

## Pointer

| Sub-step | Deliverable | Where |
|---|---|---|
| 4.2 | Three-class retrieval invariant, one falsifier per class | `oracle/transfer_gate.md` §1; header block on `oracle/REGISTER.econ.tsv` |
| 4.3 | The reference-class rule | `oracle/transfer_gate.md` §2 |
| 4.4 | The transfer gate as an answering-loop stage | `oracle/transfer_gate.md` §3, §4 |
| 4.5 | Acceptance assertions, written before the gate | `oracle/acceptance/transfer_assertions.md`, 42 assertions |
| 7.1 | The merged mechanism table | `oracle/mechanism_table.md` §§0-2, 24 rows |
| 7.2 | Closure versus TRL, stored as a standing tension | `oracle/mechanism_table.md` §3 |
| 7.3 | `δ_lunar` bounded; the demand sponsor refused | `oracle/mechanism_table.md` §4 |

---

## 1. Premise checks

Rule 1 of the standing block. Nine premises measured; **six did not survive**, two of them in the
sub-step text of my own brief.

### P1. "`δ_lunar`: no source on disk supplies it." — **REFUTED**

`literature/growth-theory/bea-depreciation-rates.md` landed at Step 2.5 and is the canonical
published schedule of terrestrial geometric depreciation rates, asset class by asset class, with the
mining, construction, general-purpose and special-industry machinery cluster at 0.1031 to 0.1650 per
year. It states its own reconciliation against the on-disk PDF page by page. The input is not
sourceless; it is **bounded from disk**, and `oracle/mechanism_table.md` §4.1 carries the bound.

### P2. "Every terrestrial depreciation rate in the corpus embeds a free-maintenance-labour assumption **none of them states**." — **REFUTED, and the correction is more useful than the claim**

The BEA file states it twice — in its Limitations and again in its `δ_lunar` reconciliation:
*"every figure describes terrestrial assets in resale markets on Earth, with maintenance, repair, and
benign operating environments assumed."* One of the corpus's two depreciation sources states the
assumption explicitly.

`jorgenson-2005-industry-origins-japan.md` does not. And the reason it does not is the finding: its
rates come from Box-Cox age-price profiles estimated in **Japanese second-hand and rental markets**
and from **Japanese tax-life declining-balance** conventions. A second-hand price is the price of an
asset that was maintained; a tax life is an administrative convention about an asset that was
maintained. **The assumption is embedded by the measurement method, not omitted by oversight** —
you cannot observe the decay of an unmaintained industrial asset in a resale market, because
unmaintained industrial assets do not have one. That is a property of every estimator in the class,
which is a stronger statement than "none of them states it" and survives the counterexample.

### P3. "`two_sided` returns **both** sides or refuses." — **REFUTED** (raised in parallel by the orchestrator; measured here independently)

Measured over both loaded registers with `awk` on the `A`/`M` rows, and confirmed independently by
`node tools/ecr_verify.js oracle/REGISTER.econ.tsv literature`, which prints its own
`sides per axis` line:

```
      3 false_pair 2      7 one_sided 1      11 two_sided 2
      3 false_pair 3                          6 two_sided 3
      2 false_pair 4                          1 two_sided 4
```

**18 `two_sided` axes, of which 7 declare more than two sides**: `LCC-01`, `-03`, `-04`, `-07`,
`-09`, `-12`, `ECR-13`, with `LCC-07` at four. Implemented literally, an answer on `LCC-01` returns
two of three Cabeus measurement methods and the router has chosen which one the reader hears.

Two figures in the message that raised this do not hold and are corrected here: the `two_sided`
population is **18, not 22**, and `ECR-07` also declares four sides — it is `false_pair`, so it is
governed by that class's rule, but it is the second four-sided axis, not the first. The list of seven
over-two axes is exactly right.

**Ruling taken: option (a).** The invariant is restated as *every side*, the class name is declared
historical, and `transfer_gate.md` §1.2 is now the authority on what the label means. The class is
not renamed: the defect is that the invariant counts, not that the word is ugly, and renaming is
freeze spend with no measurement behind it. The falsifier is stated so that a three-sided axis
returning two sides **fails** (F1), and `TG-28` asserts it against `ECR-13` as its fixture.

### P4. "The three verdicts are `legitimate`, `illustration`, `unknown`" against an acceptance target that emits four. — **CONFLICT, resolved in the specification's favour**

The worked example at `step0_growth_economist_question_surface.md` §5.2 is 4.4's stated acceptance
target and it emits five verdict words across five mechanisms, including **`absent`** and
**`legitimate as a negative only`**. The closed set has three values. Resolved without losing
anything the example said:

- **`absent` is a basis, not a verdict.** The gate's own test reads *failing either condition, the
  resemblance is analogy*. A condition measured and known to be missing has failed, so the verdict is
  `illustration` and `absent` is why. A condition that cannot be evaluated is `unknown`. `absent` as a
  fourth verdict would split `illustration` on a distinction the test does not draw.
- **"Legitimate as a negative only" is a `direction` field.** Added, closed at three values, and it is
  not decoration: **a bare `legitimate` on `beason-1996` licenses the negation of what Beason
  measured.** A composer reading "the directed-capital mechanism transfers" will direct capital.
  `TG-20` is the assertion and it is the highest-value row in that file.

### P5. FA1's `transportable` on technology licensing (M2). — **REVERSED at MT-02**

FA1 read licensing as "exactly the lunar play". The merged corpus says the mechanism is missing
(no leader, no licensable shelf) *and* that where it existed with a leader it produced capital
deepening rather than productivity — `kiyota-2005`'s own conclusion. A lunar programme could import
hardware and get no TFP from it, which is MT-10's failure mode arriving by a second route.

### P6. FA1's `partial` on the sovereign patron (M7). — **REVERSED at MT-07**

FA1 read the sponsor as "obtainable in principle: a space agency or coalition could play the US
role." Obtainable in principle is not a measurement. A mechanism whose enabling condition nobody has
measured is `unknown`, whatever its plausibility, and `unknown` composes a refusal.

### P7. "The shelf now holds 169 files." — **CONFIRMED**

`find literature -name '*.md' -type f | wc -l` → **169**.

### P8. A defect in my own file, found while rebuilding: `ECR-01`'s `position` clause misreports an R-squared as a correlation. — **CORRECTED**

The clause read *"positive correlation with capital accumulation at 0.183."* Source Table 7 gives
0.137 and 0.183 as the **R-squared of the output-growth and capital-accumulation regressions**; the
significant coefficients are DJDB(-1) at 0.00400 and 0.00336 and TAR(-1) at 0.00511 and 0.00310. The
wording was inherited from the FA1 mechanism table. It is the exact defect class the Fact-Checker's
apparatus cannot catch: it resolves against a real file, quotes a real number, and is wrong about
what the number is. `position` is not delivered to the user, so the blast radius was limited to a
reviewer auditing the class assignment — which is precisely who would have been misled. Corrected in
place, with the correction and its date recorded in the clause. `TG-21` asserts it forward.

### P9. Two of my own checks under-counted and reported success. — **CORRECTED, and recorded rather than tidied**

The mechanism table's resolution check is the close condition for 7.1, so I ran it, and it lied twice.

| Version | Extraction | Distinct leaves returned | Exit |
|---|---|---|---|
| 1 | single-line regex over `evidence: <leaf>` in prose | 24 of 42 | clean, 0 unresolved |
| 2 | `leaves:` bullet generated over the `evidence` field only | 37 of 42 | clean, 0 unresolved |
| 3 | `leaves:` bullet generated over the whole row block | **42 of 42** | clean, 0 unresolved |

Version 1 missed every reference where prose wrapped between the marker and the filename. Version 2
missed the five cross-shelf citations that live in the `capability` field — MT-14's four space-law
leaves and MT-09's Acemoglu leaf — which are exactly the citations that make this a *merged* table.
**Both failures are the same failure: the extractor's scope was narrower than the field's definition,
and nothing in the output said so.** `TG-37` exists to make the third version falsifiable.

---

## 2. Close-condition status

**Read digests, both of them, because my own writes moved one.** `HEAD = 99d3601`.

| When | `check_registers.js` digest | Files | Hard failures |
|---|---|---|---|
| Before my writes | `f92acf6936b5417d` | 289 | 0 |
| After, and this is the state a reader finds | `785b46c4b9ec09de` | **292** | 0 |

The three-file difference is exactly this chain's three new files under `oracle/`:
`transfer_gate.md`, `mechanism_table.md`, `acceptance/transfer_assertions.md`. Stating one digest
would have made every count below incomparable with the tree it describes, which is the trap rule 2
of the standing block names. Tool `2.19-1`, flags `(none)`, both runs.

`node tools/verify_corpus.js` re-run after my writes as a regression check: **39 OK, 1 FAIL, 1
VACUOUS, 6 REPORT, 1 hard failure @ `8d477d179fe421d3` over 171 files, tool 2.17-1** — byte-for-byte
the wave-open baseline, so nothing I wrote moved it. The one failure is the standing `PTH/A3` naming-
ceiling breach and is not mine.

| Close condition | Status | Observation |
|---|---|---|
| Every mechanism-table row's evidence resolves to a file that exists under `literature/`, with the count and the command | **MET** | **66 leaf references, 42 distinct, 0 unresolved**, over 24 rows. Command in `oracle/mechanism_table.md` §head, reproduced below |
| The three register classes each have a stated invariant with a falsifier | **MET** | `transfer_gate.md` §1.2, §1.3, §1.4; falsifiers F1-F5 collected in §4 and each carries an assertion (`TG-28`, `TG-30`, `TG-31`, `TG-33`, `TG-34`, `TG-35`, `TG-42`) |
| The transfer gate's three verdicts are closed terms with a test each | **MET** | `transfer_gate.md` §3.3 table: one test per verdict. `TG-02` closes the set, `TG-03`/`TG-04`/`TG-05` test the three individually |
| `δ_lunar` sourced or bounded **with the free-maintenance-labour assumption named explicitly** | **MET, as bounded** | `mechanism_table.md` §4.1. `δ_lunar ≥ 0.10/yr`, and ≥ 0.15/yr for the machinery classes a lunar base is built from. The assumption is named in the bound itself, not in a footnote, and the direction of the error is stated |

The resolution command, run at close:

```
$ grep '^- \*\*leaves:\*\*' oracle/mechanism_table.md | grep -o '`[^`]*\.md`' \
  | tr -d '`' | sort -u \
  | while read f; do [ -n "$(find literature -name "$f")" ] || echo "UNRESOLVED $f"; done
(no output)
$ grep '^- **leaves:**' oracle/mechanism_table.md | grep -o '`[^`]*\.md`' | wc -l
66
$ ... | tr -d '`' | sort -u | wc -l
42
```

Folder spread of the 42, which is the merge showing up in the table rather than being asserted about
it: 22 `development-and-industrial-policy`, 8 `growth-theory`, 4 `organization-and-production-systems`,
4 `self-replication-and-automation`, 4 `space-law-and-governance`.

**Two further checks run at close, both clean and neither claimed without running:**

```
$ node tools/ecr_verify.js oracle/REGISTER.econ.tsv literature
axes 18  members 53  distinct leaves 30
match_keys total 185  K1 failures 0  K2 failures 0
classes {"false_pair":6,"two_sided":7,"one_sided":5}
ALL PASS
FAILURES 0                                              exit 0

$ node tools/check_registers.js
NOTE hard failures: 0 @ read-digest f92acf6936b5417d over 289 files, tool 2.19-1, flags (none)
```

And a structural audit of the table's own closed sets, written for this close and reported rather than
trusted: over 24 rows, zero have an empty `verdict`, `direction`, `capability`, `congruence`,
`disanalogy`, `leaves` or `axis`; zero violate the basis-to-verdict map; zero carry a `direction`
other than `-` on an `unknown` or `-` on anything else. That is `TG-08`, `TG-09` (table half) and
`TG-38` green, on an observation rather than on an intention.

---

## 3. Sub-step notes

**4.2.** The invariant is stated at `transfer_gate.md` §1 and pointed at from a header comment block
on `oracle/REGISTER.econ.tsv`, so that a session reading the file with the `class` column also reads
what the column obliges. The comment block is `#`-prefixed, changes no `A` or `M` row, and the file
still parses at 18/53 against its own `H` row. `one_sided`'s third clause — **no padding** — is the
clause this sub-step adds that `L5` cannot: `L5` stops a second side reaching disk and nothing stopped
one being invented at composition, and a padded one-sided answer is the most attractive failure the
register can produce because it reads as balance. It is a human gate (`TG-35`), and saying so is
better than pretending a script can recognise an invented counterposition.

**4.3.** The rule returns both classes and states the object. Three scope disciplines are carried
with it, each read out of the source it constrains rather than added by me: Pritchett's cutoffs are
his own stated intuition; Hausmann's "sustained about half the time" is measured against a 2 percent
bar, one point below the 3.5 percent bar that defined the acceleration; and **the 47.9/8.5/0.5
success cascade is not in Flyvbjerg 2014 in any form** — his summary records it was searched for
across the full extracted text of both versions and is absent from both. `TG-25` is the guard, and it
guards against a fabrication that would otherwise resolve.

**4.4.** The gate is specified as a stage that runs **before** composition, with `unknown` composing a
refusal at zero personas. One misfit is reported rather than papered over: contract §5 states
`not-found`'s condition as *"no address resolved and no shelf file confirmed"*, and a transfer refusal
is not that — shelf files were confirmed and what is missing is a measurement of a *condition*.
`not-found` is the closest of the six and its owner is right. The wording is not. Relayed at §4 below
rather than fixed here, because `answer_contract.md` is not my file and inventing a seventh code in a
document that is not the contract would put a closed set in two places.

**4.5.** 42 assertions, written before the specification was finished, which is the point. 7 green, 1
split, 33 RED with a named owner and close condition, 1 human gate. The RED majority is the honest
state and it is stated as such: an assertion marked green before its mechanism runs is the defect
this project has already shipped twice.

**7.1.** A full rebuild, per author ruling 1.2 (ECON-12), which put the FA1-FA8 deliverables on a
separate shelf. FA1 is named as a predecessor per row so the two can be compared, and two of its tags
are reversed (P5, P6). Eight rows are new; six of the eight rest on economics summaries that were not
in FA1's nine-source base, and two could not exist before the lunar and economics shelves sat in one
tree. The mechanism-table `verdict` vocabulary is deliberately the **gate's** vocabulary rather than
FA1's `transportable`/`partial`/`absent`, because the gate reads this object and two vocabularies
plus a mapping between them is a drift this project has already paid for once.

**7.2.** Both positions stored side by side, neither marked correct, nothing resolved. Position B is
The Space Resources Engineer's and is drawn from his own §10 — he should confirm I have represented
it rather than improved it. What I added beyond storage is a falsifier for each position, because a
tension with no falsifier on either side is a disagreement that cannot end.

**7.3.** (a) bounded, with the assumption named in the bound; the deeper finding is P2. (b) refused,
with three nouns, and escalated. The app's silence on demand is citable and is quoted verbatim as the
app declining: `grade-independent-demand` is `FORMALLY EXCLUDED` with the app's own reason, *"no
cadence coefficient, no landings knob, no build-out term"*, ruled at its Step 38 reconciliation. The
corpus's 100 t/yr propellant anchor is a scenario input and not evidence a sponsor exists, and that
distinction is what MT-07 refuses on.

---

## 4. Relays

**To The Software Engineer (4.6, ECON-4b).** `oracle/acceptance/transfer_assertions.md` is your
acceptance set; `oracle/transfer_gate.md` is the specification; `oracle/mechanism_table.md` is the
verdict store. Three things to read before you build: §3.3's per-verdict tests, §3.5's `direction`
field (without it a `legitimate` verdict licenses the negation of the finding it rests on), and
§3.7's default — a mechanism with no table row is `unknown`, chosen so that the failure mode is a
refusal rather than a licensed transfer. `TG-41` cannot close until the loop produces its first
answer, because every decoy in that file must be a mutation of real produced output.

**To the answer-contract owner, via the orchestrator.** `not-found`'s stated condition does not cover
a transfer refusal. Either widen it to *"no address resolved, and no shelf file confirmed **that
measures the condition the answer turns on**"*, or mint a seventh code. I have used `not-found` in the
specification and named the misfit at §3.3 rather than choosing for you. This is a contract edit and
freeze spend, so it needs a ruling, not a patch.

**To The Space Resources Engineer.** Three things. (1) 7.1 assigns you review of every row tagged
transportable; the equivalent tag here is `legitimate`, and the rows are **MT-03a, MT-08, MT-10,
MT-14, MT-16, MT-18, MT-23**. Per A.9, disagreements are presented and not resolved. (2) 7.3(a)
assigns you the lunar accelerators on `δ_lunar`; I own the floor and the maintenance assumption, and
§4.1 names your half explicitly. (3) `mechanism_table.md` §3.2 is your position, drawn from your own
§10 — confirm it is yours rather than my improvement of it, and note that I added a falsifier to each
side, including mine.

**To W4-5 / whoever owns the register fixtures.** `TG-28` and `TG-42` need lunar-side fixtures I
cannot write: `LCC-01` (three sides, the Cabeus case that makes the every-side invariant bite) and
`LCC-07` (four sides, `two_sided`). My econ fixture for `TG-28` is `ECR-13`.

**To the author, escalated.** 7.3(b) assigns the ruling on whether to pursue the demand sponsor to
you. My answer is that it is **refused** on the evidence, and that the refusal is the most important
one this table produces: an answer that assumes a sponsor is wrong in the direction this whole
project is predisposed to be wrong in. Whether to go and acquire evidence about lunar demand is your
call, not mine.

---

## 5. Source-verification repair pass

Ordered after the close, on the orchestrator's relay, against two records:
`cr_scratch/relay/verify_ecr_14_18.md` (14/14 M-rows SUPPORTED; axis statements FAIR for ECR-14, 15
and 18, OVERSTATED for ECR-16 and 17) and `cr_scratch/relay/verify_ecr_01_13_resweep.md` (33 M-rows:
27 SUPPORTED, 3 PARTIAL, 2 CONTRADICTED). **Repair, not new scope: the ledger zeros hold.** The
records are evidence and not authority, so every cited file was re-opened and every defect
re-measured before the row that cites it was touched. **Six of six repaired. One record finding
refuted. One defect found in the records themselves.**

### 5.1 The six, each re-measured first-hand

| # | Row | Defect | The check I ran | Repair |
|---|---|---|---|---|
| R1 | `ECR-01 A` `beason-1996` | 0.183 called a correlation; **and** the quoted ranges excluded a third of each series | Source Table 2 read with its header: JDB `-0.31, -0.48, -0.07`; tax relief `-0.55, -0.47, -0.77` | **Restated.** All twelve coefficients now printed. I had already fixed the 0.183 half independently at 7.1; I had not fixed the range half, so **my fix did not cover what the record describes** |
| R2 | `ECR-01 C` `aoki-2009` | "absorptive capacity" and "improving congruence" attributed to a file containing neither | `grep -i "absorptive\|congruence\|technology gap"` on the file returns **one** hit, `technology gap`. Both other terms occur in `esteban-pretel-2009`, side A of the same axis | **Struck.** Not re-pointed: a member row states what its own leaf says, and a row borrowing a neighbour's finding cannot be audited against the leaf it names |
| R3 | `ECR-05 B` `nakamura-1989` | the land-reform percentages belong to `kawagoe-1999` | Nakamura: "45.9 percent ... tenanted", "fell to only 10 percent"; zero hits for any owner-cultivator figure. Kawagoe line 184: "46% ... in 1941 to 13% in 1949 to 9% in 1955", "Owner-cultivator farms rose from 31% ... to 70%" | **Restated to Nakamura's own figures** (45.9 to 10 percent; 1.916 Mha, 37.5 percent of acreage, changing hands). The qualitative reading is unchanged; it was always his |
| R4 | `ECR-07 D` `may-1977` | the row asserted the **negation** of its source | May line 43: "noting it is a residual that absorbs unmeasured effects and measurement error". `denison-1972` line 112: "advances in knowledge are always in that residual, because no one has found a way to estimate them" | **Restated.** The knowledge term *is* the residual. What the itemisation establishes is the narrower thing `ECR-06 B` already carries: improved resource allocation at 0.95 is a printed named category. Ring-fenced from ECR-08 in the row text -- see 5.3 |
| R5 | five axis statements | ECR-07 UNDERSTATED; ECR-09, ECR-16, ECR-17 OVERSTATED; ECR-12 conflated | ECR-09: `kiyota-2013`'s own title is "The Case of Import Quota Removal", a trade instrument. ECR-12: Henderson = six National Economic Plans **Dec 1955 to Feb 1973**; ESRI Table 12-1 = "Short-Term Economic Outlook and Actual Figures in **1955-60**" -- two instruments, two windows. ECR-16: `lewis-1954`'s own file says the substitution "is not something Lewis's own text supports or tests". ECR-17: 37/69 is a narrow majority **sustained**, at a 2 percent bar one point below the 3.5 that defined the acceleration | **All five restated.** ECR-17 now reads "neither source finds that it reliably does", which the data support, rather than "usually does not", which reverses Hausmann's own reading |

Rule followed throughout: **strike or restate what the source does not support; never invent a
replacement claim; never delete a row.** No `M` row was removed and none was added.

### 5.2 The finding I refute: ECR-13 is not a mislabeled `false_pair`

The sweep's two grounds both fail on measurement, and the first is the premise this wave already
overturned.

1. **"`two_sided` means exactly two."** It does not. The class name is historical and the invariant
   is *every side* -- ruled at 4.2, `oracle/transfer_gate.md` §1.2, and already carried to the router
   seat.
2. **"ECR-13 is the sole exception."** True within this file, false across the loaded set: **18
   `two_sided` axes, 7 declaring more than two sides** -- `LCC-01`, `-03`, `-04`, `-07`, `-09`,
   `-12`, `ECR-13`, with `LCC-07` at four. The sweep counted one register.

There is also a substantive reason, and it is the stronger one. `false_pair` **bans** the words
disagree, contradict and dispute anywhere in the answer. Side A measures the aggregate effect of
directed credit and finds it small; side C holds directed credit central to the model. Those two are
opposed on one question, and a class that forbids naming the opposition would misdescribe it -- which
is the error `false_pair` itself introduces, run in reverse. The level-naming `false_pair` would have
bought is carried instead by this axis's `scope_token` and by its `axis_statement`, which names all
three levels and is delivered verbatim. The sweep's own verdict on that prose was FAIR.

**Recorded in the file itself**, as a comment block above the `ECR-13` `A` row, so a future reader
meets the challenge and its refutation together rather than re-litigating it. `TG-28` therefore keeps
`ECR-13` as its exemplar and now records that the exemplar was challenged and held. No relay to W4-9
was needed and `oracle/REGISTER.lunar.tsv` is untouched.

### 5.3 Two defects kept apart, and one I had to chase into my own new file

**Kept apart, as briefed.** R4 is about *which term is the residual*. `ECR-08` is about *two reviews
failing to sum*, for two different reasons -- May +0.04, inside ground rule 3's
statistical-interaction allowance; Simonis -0.82, an incomplete component list. R4's restatement says
so in the row text. The sweep independently graded `ECR-08` FAIR on every number and confirmed the
two defects are correctly held apart.

**The R2 misattribution had already propagated into `oracle/mechanism_table.md`.** MT-09's evidence
carried "absorptive capacity is what turned licensing into productivity" against `aoki-2009` --
laundered out of `ECR-01 C` into an artifact hours old. Repaired: the schooling claim now cites
`nakamura-1989` (line 129, its actual home), the import/R&D ratio claim cites `aoki-2009` (line 106),
and the absorptive-capacity claim cites `esteban-pretel-2009` (line 158), where it lives. MT-17's
`disanalogy` carried ECR-16's overstatement, "four theoretical accounts", and is restated to match.

**This is the argument for sweeping derived artifacts and not only the register.** A defect in a
`position` clause is invisible to the user by design, but it reaches the user through whatever the
register feeds -- and within one wave it had.

### 5.4 A defect in the records themselves

`verify_ecr_14_18.md` states a read-digest for `oracle/REGISTER.econ.tsv` of
`8d84a33a844ac0e2daf2382792a2095fdc520a8622f23e1146bd6666dd1037d2`. That hash is the file **after**
my 7.1 repair to `ECR-01 A` -- while the resweep record quotes the **pre-repair** text of that same
row verbatim as the claim it graded PARTIAL. A digest cannot certify a read of bytes it does not
cover, so **the records' stated digest was stamped at a different moment from the reads it appears to
certify.**

This changes none of the six findings -- I re-measured all six against the sources, which is exactly
why the rule is that the records are evidence and not authority. But the digest should not be relied
on as certifying its own reads, and a later reader comparing hashes will otherwise conclude the sweep
saw text that was not on disk when it was hashed.

### 5.5 Tool state, before and after

| | `ecr_verify` (econ register) | `check_registers` | `verify_corpus` |
|---|---|---|---|
| Before | ALL PASS, FAILURES 0, exit 0 | 0 hard failures @ `b5d61160eb3da288` / 297 files | -- |
| After | ALL PASS, FAILURES 0, exit 0 | 0 hard failures @ `7f77487b3a27543d` / 299 files | 39 OK, 1 FAIL, 1 VACUOUS, 6 REPORT @ `8d477d179fe421d3` / 171 files |

`oracle/REGISTER.econ.tsv` sha256 `8d84a33a…` before, `6ca9d12f7965474c169d323252faeb03f27cadff833a940a0a1c1dcfef45f8f3` after. Parse intact: **18 `A` rows, 53 `M` rows**, matching its own `H` row; LF only; no row added or deleted. `verify_corpus` is byte-identical to the wave-open baseline, so nothing I changed moved the corpus.

**One honest caveat on those digests: the tree is live.** Two consecutive runs of
`check_registers.js` seconds apart, with no write of mine between them, returned
`62057fffaf43e4a4` then `7f77487b3a27543d`, both over 299 files -- other seats are writing
`cr_scratch/relay/` concurrently. The register file's own sha256 is the stable identifier for what I
changed; the tool digest is a timestamp on a moving tree and should be read as one.

### 5.6 Mechanism table after the repair

**67 leaf references, 42 distinct, 0 unresolved**, over 24 rows and 24 `leaves:` bullets. The
reference count rose by one because `esteban-pretel-2009` joined MT-09; the distinct count did not
move, because that file was already cited elsewhere in the table. Structural audit re-run: **24 of 24
rows conform** to the basis-to-verdict map with no empty field. Folder spread unchanged.

---

## Not mine

- **`oracle/answer_contract.md` §5's reason-code list.** The `not-found` misfit is reported, not
  fixed. No seventh code invented.
- **`oracle/register_schema.md`.** `L5` is quoted, not amended. The class names are unchanged; §1.2
  declares `two_sided` historical and does not rename it.
- **The lunar register's rows and fixtures.** `LCC-01` and `LCC-07` are cited as measurements and as
  fixture requirements; I wrote no lunar row and no lunar fixture.
- **The four standing suite failures** argued in `af7abec`. Not touched, not silenced.
- **The five owed amendments on `REGISTER.econ.tsv`'s quantity blocks** (AM-93 to AM-97, reported by
  `check_registers.js` as `WARN AMC-5`). Pre-existing, not mine this wave, and my allowance is zero
  amendment rows.
- **Position B of the closure-versus-TRL tension.** Quoted from The Space Resources Engineer's §10.
  Stored, not adjudicated, not improved.
- **The Denison and Chung primary text.** Ruled permanently unacquired at 2.9. Not re-opened.
- **4.6, the build.** Specified and asserted here; built by The Software Engineer.
- **The two source-verification records.** Read, re-measured against their own cited files, and one
  finding refuted. Not edited: they are another seat's evidence and the defect at §5.4 is reported to
  their author, not patched by me.
- **`ECR-09`'s `match_keys`.** The sweep correctly notes the key list carries no quota or import
  term, which is why `kiyota-2013` sits outside its own axis's keyword net. Editing `match_keys`
  changes live routing and would risk `B3/K2`; it is not required by any close condition of mine.
  Relayed, not done.

---

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +42/-0
```

**The 42 tests are 4.5's TDD deliverable and are not freeze spend.** The wave's standing block makes
TDD sub-steps the explicit exception — where the brief says write the suite first, those tests are
the deliverable — and 4.5's brief says exactly that, with 4.6 as the build step deliberately
separated at integration. No check row, amendment row or quantity id was minted; the one register
edit is a `#` comment block plus a correction to an existing `position` clause, and the file still
parses at 18 `A` rows and 53 `M` rows against its own header, `ecr_verify` ALL PASS, exit 0.
