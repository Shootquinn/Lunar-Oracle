# Step 2 Wave 1 — The Manager (economics prompt)

**2.3 review of the four economics folders · the `Q-ECR-AXES` fork · 2.9 (ECON-3) · `register_class`
and 2.16.** 2026-08-28.

---

## 1. The premise check — line one

Four premises. **Two hold, one holds with its operative half and fails its framing half, and one — the
one in the CONTEXT paragraph rather than in the numbered list — was false when I read it and became
true while I worked.**

| | Premise | Verdict |
|---|---|---|
| **P1** | Four of the eleven top-level folders are economics folders | **FALSE as written.** Three carry `field=economics`. Four are my **review** half. |
| **P2** | No primary pro-targeting source, so the affirmative survives only as reported speech inside its critics | **HALF.** Operative half holds. Framing half is false: `wade-2018` is affirmative in its own voice and is not a critic. |
| **P3** | `REGISTER.econ.tsv` holds 18 `A` rows and declares 18 | **HOLDS**, and the `M` half holds too: 53 and 53. |
| **C1** | (CONTEXT) The taxonomy lands as columns of `cr_scratch/merge_plan.tsv` | **FALSE at 13:20, TRUE at 13:54.** The file did not exist when I began. |

### P1 — three, not four, and the difference is the whole point of §2.4

`literature/FIELDS.tsv` as specified at taxonomy §2.1 carries eleven rows, of which **three** read
`economics`: `growth-theory`, `development-and-industrial-policy`,
`organization-and-production-systems`. The fourth folder I review, `space-economy-and-markets`, reads
`field=lunar`, deliberately and on a measurement.

This is not pedantry and it is not the Engineer's error — his §2.4 and his `merge_plan.tsv` header both
say it in terms, twice, and the header of the table says `review_owner is NOT field_label`. **The
premise in my own brief flattened the distinction the Engineer built two columns to preserve.** A seat
who accepted P1 as written would have reviewed `space-economy-and-markets` as an economics-field folder
and objected to a `lunar` cell that is correct. I record it because the flattening is the error the
project keeps making — my ECR-01 verdict dropped the word "Japanese," and this premise dropped the
word "review."

Reproduced from the table itself, independently of the proposal document:

```
awk -F'\t' '$11=="manager-econ"' cr_scratch/merge_plan.tsv | wc -l                     -> 70
awk -F'\t' '$11=="manager-econ"{print $9"\t"$10}' … | sort | uniq -c
  22  development-and-industrial-policy   economics
  13  growth-theory                       economics
   9  organization-and-production-systems economics
  26  space-economy-and-markets           lunar
```

`44 economics + 26 lunar = 70`, four folders, and the four folder sizes reproduce taxonomy §1's table
cell for cell. **The review split is 7/4; the field split is 8/3.**

### P2 — the operative half holds; the framing half is false, and the false half is the dangerous one

**Holds:** there is no primary source in this corpus that makes an original measurement finding a
positive productivity effect from Japanese sectoral targeting. Measured over the 44 economics-field
files: the four instrument measurements (`beason-1996`, `kiyota-2005`, `kiyota-2013`,
`esteban-pretel-2009`) all report a null or negative TFP effect, and `ECR-10` already records that
three of them are one lineage rather than three independent confirmations.

**False:** "survives only as reported speech inside its critics." `wade-2018-developmental-state-dead-
or-alive` is on disk, is a primary text of the affirmative developmental-state position in its own
authorial voice, and is **not a critic**. Read at source: it "conclud[es] in favor of the
developmental-state account" for the catch-up decades. What it is not is *empirical* and not *about
Japan* — its own methods section calls it "a discursive, non-empirical review/debate essay," its cases
are Korea, Taiwan and Singapore, and it concedes that "neither side has produced 'knock-out evidence'."
Its one affirmative measurement, Lane 2017 on Korea's HCI drive, is reported speech **inside Wade** —
Lane is not on disk — and that is exactly why I put it on `ECR-18` rather than folding it onto ECR-01.

**Why the correction matters rather than being a quibble.** The plan's transfer gate and the one-side
disclosure both key on *who is speaking*. Under P2 as written, an answering persona handed the
affirmative position would label every affirmative sentence "reported inside a critic" and would be
wrong about Wade, which is the one file where the affirmative speaks for itself. The precise statement,
and the one I will defend, is:

> **No primary source in this corpus makes an original measurement supporting Japanese sectoral
> targeting. The affirmative position is present in one primary voice — Wade 2018 — which is
> non-empirical and is about Korea, Taiwan and Singapore; every affirmative *measurement* in the corpus
> is reported speech, either inside a critic or inside Wade.**

### C1 — the premise that changed under me

`cr_scratch/merge_plan.tsv` did not exist when I opened. I reviewed taxonomy §4B, then the table
appeared and I re-cut and re-reviewed against the table. **They agree for my half, row for row and
folder count for folder count**, so nothing in §2 below rests on the wrong document. I state it because
a seat who had reviewed only §4B and reported would have reviewed a proposal in a wave whose whole
premise is that a table replaced it.

**The read-digest, and it is four different digests, on purpose.**

| Measurement | Instrument | Files read | Digest |
|---|---|---|---|
| Corpus content (P2, IDF, folders) | `python`, `lsei/literature/*/*.md` ∪ `_intake/japanese-miracle/lit/*.md` | 271 | `d044b77b24768efa` |
| Hard failures, on open | `tools/quantities.js --check` | 88 | `f6464c14b179a476` (**12**) |
| Hard failures, mid-work | `tools/quantities.js --check` | 96 | `a09e66e0a8071021` (**17**) |
| Hard failures, at write | `tools/quantities.js --check` | 97 | `ae90ac87bb6e1eee` (**17**) |
| Registers, mid-work | `tools/check_registers.js` | 67 | `05d81245e59a972a` (**0**) |
| Registers, at write | `tools/check_registers.js` | 70 | `7a349593e1a82157` (**1**) |

**Standing clause 7(b) is stale and I am the one who wrote it.** I told this wave the count was "back to
the standing twelve." It was 12 when I opened and it is **17** now, and the five new ones are not mine:
`cr_scratch/step2_engineer_dispositions.md` landed mid-wave carrying `M1 Q-PLAN-CHURN class
"measured"` (not in the closed set of five), two `M11` blocks whose `conditions` name no `cwd`, and it
staled the index, firing `M6` and `M7`. Routed in §6. **This is standing clause 3 firing on its author:
the 271-file corpus digest is stable, and the 88 → 96 → 97 file digest is not, because in a
three-seat wave the read set moves while you work even when the write sets are disjoint.**

**Census self-counting (clause 4).** This file is `cr_scratch/step2_manager_econ.md`. It is inside
`COUNTING_RULE.md` §8's declared file set. **It is NOT counted in any figure above** — every one was
taken before it existed. The next `--check` reads 98 files, and the delta of one is this file.

---

## 2. The four economics folders — placement and `field_label`, reviewed row by row

Cut on column 11 alone. I did not read the lunar 106 and I did not read
`cr_scratch/step2_space_resources_engineer_review.md`, deliberately: §5 asks the two of us the same
question from opposite sides and an answer I reached after reading his is not an independent answer.

**Verdict: ACCEPT all 70 rows, with three findings, one contested cell recommended for change, and one
retraction of an accusation I nearly made.**

### 2.1 The retraction, first, because it disciplines everything after it

I could not reproduce taxonomy §2.4's cosine of `0.7710`. Four readings of "document-frequency profile
… cosine" over the same partition gave me `0.8227`, `0.8325`, `0.9493` and `0.9517`. On the way to
writing that the decisive number of the most contestable cell in the proposal was unreproducible, I ran
his committed operation instead of my own:

```
sed -n '/^```field-probe$/,/^```$/p' cr_scratch/step2_engineer_taxonomy.md | sed '1d;$d' | node -
  P2 space-economy-and-markets -> lunar      |lunar|=132 |econ|=44  between-field cosine 0.7710
  P1 space-economy-and-markets -> economics  |lunar|=106 |econ|=70  between-field cosine 0.8292
  SEM vs lunar core 0.8389   SEM vs economics core 0.7443
```

**Exact, to four places, all four numbers.** My divergence was mine: `Q-TAX-FIELD-SEPARATION`'s `unit`
says "over terms appearing in at least 2 files of a field, stopwords removed" and I did neither. The
block is governed, `provisional`, scheduled for re-measurement at 3.7, and carries a runnable
`operation`. **A reviewer who reaches a different number and has not run the author's committed
operation is reporting his own instrument, not a defect** — and I was one keystroke from filing it as
one.

### 2.2 `space-economy-and-markets`, 26 rows, `field=lunar` — ACCEPT

Accepted on his measurement, not on my agreement. Both tests point the same way and the folder's own
profile is closer to the lunar core (`0.8389`) than to the economics core (`0.7443`). Assigning it to
`economics` would pool Ehricke with Rosenstein-Rodan, which is B3 committed deliberately. I would not
have reached this by argument and I did not try to.

### 2.3 The one cell I recommend changing, priced with his own instrument

**`gdp.md` and `statistical-review-of-world-energy.md` should move from `space-economy-and-markets` to
`growth-theory`, joining `bea-depreciation-rates`.** He named this option himself and said he was least
confident of these three.

**The reason, in data terms and not in taste.** These three are the corpus's only reference-data series
— a World Bank GDP ranking table, an Energy Institute supply review, a BEA depreciation table. They are
one object class answering one kind of question, "what is the terrestrial baseline number." Today two of
them are scored from a 132-document IDF table and the third from a 44-document table. **Scores computed
against different denominators are not on a common scale**, so an answer needing a GDP denominator
against an energy numerator against a depreciation rate cannot rank its own three sources. That is not a
retrieval-quality argument, it is a commensurability argument, and it is the only one I have.

**The cost, measured on his probe, not asserted:**

```
as landed                        |lunar|=132 |econ|=44  cosine 0.7710
+ gdp, statistical-review moved   |lunar|=130 |econ|=46  cosine 0.7719
```

**It costs 0.0009 of between-field separation and the sign is against me.** `SEM vs lunar core` moves
`0.8389 → 0.8364` and `SEM vs economics core` `0.7443 → 0.7378`; the gap is unchanged and **§2.4's
conclusion is not destabilised** — P2 still wins both tests. So: the move is a judgement call priced at
0.0009, and I am telling you it is a judgement call rather than dressing it as a measurement, because
the measurement is very slightly against it. Two files change folder, `also` swaps direction on both,
zero files leave the union, and `Q-TAX-FIELD-LUNAR-132` and `Q-TAX-FIELD-ECON-44` need correcting. **If
the Engineer declines it, I do not press it.**

### 2.4 `ryan-2000-self-determination-theory` — accepted, and recorded as the falsifier on the two-value set

An *American Psychologist* review of intrinsic motivation, placed in `organization-and-production-
systems` and therefore labelled `field=economics`. As a **folder** placement it is right: SDT is the
motivational theory under the autonomy claims in `spear-1999` and `trist-1951`, and there is nowhere
better. As a **field** label it is false — this is not an economics document, and `FIELDS.tsv`'s value
set is closed at two.

I measured the harm and **it is smaller than I expected and I am reporting that rather than the version
that supported my objection.** Ryan carries 307 terms borne by no other economics-field file, every one
at the field-maximum IDF of 3.40. But the singleton rate is not distinctive: `df==1` is 47.9% of the
economics vocabulary and 41.5% of the lunar, so a 44-file table is noisier than a 132-file table by
about six points and not by an order. `trist-1951` carries 237 sole-carrier terms and `taylor-1911`
carries 122; Ryan is the largest of a family, not a class of one.

**Verdict: leave it.** A third `field` value repartitions every document-frequency table in the system,
and one misfiled paper does not buy that. **But name it now**, because the amendment case is this file
plus the next one, and if it is not written down the next one arrives with no predecessor.

### 2.5 Three L2 identifiers in my half address a listing, not a document

Found by applying the Engineer's own §9 rule — "a level-2 URL that is a program landing page rather than
an article address is not an identifier" — to my 70 rows rather than to his.

| Row | `identifier` | What it addresses |
|---|---|---|
| `kiyota-2013-import-quota-removal.md` | `ier.hit-u.ac.jp/primced/e-index.html` | the PRIMCED discussion-paper **index** |
| `gdp.md` | `data.worldbank.org/data-catalog/world-development-indicators` | the WDI **data catalog** |
| `statistical-review-of-world-energy.md` | `energyinst.org/statistical-review` | the **programme** page |

`henderson-2008`'s `econlib.org/library/enc/japanandthemythofmiti.html` is a genuine document address
and is fine. **No false merge fires today** — one file each — so this is not a defect in the landed
table, it is a trap primed for the class of file the corpus is most likely to add more of. Two WDI
extracts would key identical at level 2 and be declared one source.

**`kiyota-2013` is a one-cell fix and the correct address is already in this corpus's own ledger:**
`_intake/japanese-miracle/fa/FA1-source-list.md` entry 10 gives
`https://www.ier.hit-u.ac.jp/primced/documents/No48_dp_up_Pdf_2013.pdf`. Owner: The Engineer, 2.2.
Routed in §6.

**Two things that came back clean and are worth stating as clean.** `id_in_source` over my 70: 58 `yes`,
12 `n/a`, **0 `NO`** — the `azami-2024` citation-repair defect is lunar-only. And `pair_id` and
`pair_role` are empty on all 70: **not one of the eight same-source pairs is an economics file.** I
measured that twice, from the register side and from the table side, before I noticed the columns
already said it.

### 2.6 Placements I examined and am not contesting

`vanderploeg-2011` (resource curse, a JEL survey, arguably `growth-theory`) — marginal, in
`development-and-industrial-policy`, leave it. `caballero-2008` (the 1990s, not the catch-up decades) —
`ECR-14` already carries `period` as its `scope_token`, which is where that belongs. `lewis-1954`
primary `development-and-industrial-policy` with `also growth-theory` — right way round, since the
corpus reaches Lewis through the catch-up argument. `flyvbjerg-2014` primary
`organization-and-production-systems`, `also programme-primaries` — correct, and it is `ECR-15` side B
with side A in `growth-theory`, both economics, no cross-field.

**`deming-1967-japan-quality-control` — declared interest.** It is a source in this corpus, I am named
in FA1's mechanism table as M3, and it is filed in the folder I own. I reviewed it as I reviewed the
others and it is correctly placed in `organization-and-production-systems` with `also
development-and-industrial-policy`. I am recording the interest rather than recusing, because recusal
would hand the cell to a reviewer who cannot judge it.

### 2.7 The one cross-field axis, and what it does to A.9

**Measured over all 18 ECR axes: exactly one has members on both sides of the field boundary, and it is
`ECR-16` — the axis that carries my unresolved tension with The Space Resources Engineer.**

Side A is `lewis-1954` (economics) plus `freitas-1980`, `chirikjian-2002` and `lee-2008` (lunar,
`self-replication-and-automation`). Side B is `acemoglu-2020` (economics). Under 3.7's scoped IDF, the
same token is worth different amounts to the two halves of side A. On `ECR-16`'s own `match_keys`:

| term | df/IDF, economics | df/IDF, lunar | gap, nats |
|---|---|---|---|
| `robotic` | 1 / **3.40** | 33 / **1.38** | **2.02** |
| `substitution` | 11 / 1.36 | 6 / 3.02 | 1.65 |
| `robots` | 1 / 3.40 | 12 / 2.36 | 1.04 |
| `replicating` | 4 / 2.30 | 5 / **3.19** | 0.88 |
| `automation` | 1 / 3.40 | 10 / 2.54 | 0.86 |

**A `two_sided` axis whose whole purpose is to return both sides would rank them by numbers computed
from different denominators, and the direction depends on which token the question used.** On
`robotic`, Acemoglu is boosted 2.5× over Freitas; on `replicating`, the reverse. The register refuses to
adjudicate `ECR-15`/`ECR-16` and marks neither correct — and the field label would adjudicate them
anyway, by arithmetic, invisibly, in whichever direction the phrasing happened to point.

**This is not a placement objection.** Moving Acemoglu changes nothing; the cross-field members are the
self-replication trio and they belong exactly where they are. It is a requirement on 3.7, it is new, and
it is measured. Routed in §6 — **an axis whose members span both `field` values must be scored from the
pooled table.** One axis today. The check is one `awk` and it is written in §5.

---

## 3. The `Q-ECR-AXES` fork

### 3.1 The briefed remedy makes it worse, and I measured that before doing it

My brief says to supersede the fork "using the `superseded:` form," and the wave open says this is one
of two amendments settling three of the twelve standing failures. **I tested the remedy on a staged copy
of the declared file set before applying it to the repository. It is wrong, and the estimate is wrong.**

Method: `cp` the declared file set to a scratch root, run under `QJS_ROOT`, confirm the baseline
reproduces at 12, then apply each candidate remedy and re-count.

| State | `--check` hard failures |
|---|---|
| baseline (staged copy reproduces the repository) | **12** |
| **the briefed remedy** — `class: superseded` on the original block | **13** |
| fork collapsed, seat's edit only, index not regenerated | **8** |
| fork collapsed **and** index regenerated | **6** |

**The briefed remedy adds a failure.** `class: superseded` clears neither `M2 duplicate id
Q-ECR-AXES` (the block still exists under that id) nor `M3 Q-ECR-AXES` (both sites still quote), and it
stales the index, so `M6` fires. Net **+1**.

**The mechanism, verified in the tool rather than inferred.** `tools/quantities.js` has a flag named
`--include-superseded` whose option is `exclSup` — and at line 309 it suppresses **regions of
`cr_scratch/` files that lie inside a promoted-marker range**. It is a *promotion* exclusion. There is
no code path anywhere in the tool by which `class: superseded` removes a block or its quotation sites
from `M2` or `M3`. The flag is misnamed; its own `--help` line describes the mechanism correctly.

**So the Systems Engineer's `AM-132` is not about his edit. It is a general theorem and I am its second
instance:** *every supersession of a quoted id is permanently red from the moment the correction lands.*
He proved it on `Q-DEGRADED-MODES` after the fact. I have now proved it on `Q-ECR-AXES` **before**
touching anything, which is the only reason this file does not contain an edit that made the count go
up.

### 3.2 What actually clears it, and it clears six not one

Collapse the fork instead of decorating it. An addendum that supersedes must **quote**, never
re-declare:

1. `cr_scratch/step1_10_manager_economics_register.md` — five blocks corrected in place:
   `Q-ECR-AXES` 17→18, `Q-ECR-MEMBER-ROWS` 52→53, `Q-ECR-KEYS-SHIPPED` 176→185, `Q-ECR-SIDES-GT2`,
   `Q-ECR-PROBE-SEPARATION`; old values into each `superseded:` per §4 part 2; the quoting prose at
   `:559 :638 :680 :699 :702` updated in the same edit.
2. `cr_scratch/step1_10_manager_economics_register_addendum.md` — the five re-declared blocks
   **deleted**. Its own quoting prose already carries the correct values and becomes quotation sites of
   the single surviving block.
3. The wave-boundary regeneration of `QUANTITIES.md`.

**Measured result: 12 → 6.** Five `M2` duplicates and one `M3` cleared, and `AM-93` through `AM-97`
close together because they are one defect with five names.

**And the third row of that table is the part that sharpens the orchestrator's own ruling.** With the
edit made but the index not regenerated, `M3 Q-ECR-AXES` **still fires** — because `QUANTITIES.md:34`,
`:37` and `:38` are themselves quotation sites carrying 17. **The index of record is a quoting site, so
the boundary regeneration is not tidying up after the correction; it is half of the correction.** A
seat's edit alone cannot close a forked id, no matter whose file it is in.

### 3.3 What I did, and the ruling I need

**Both files in §3.2 are mine from Step 1 and neither is in my declared write set for this sub-step.**
Standing clause 9 is unambiguous and I did not widen my own write set to reach a number I wanted. So:

- **I minted the successor in this file** (§4), which is legal — `COUNTING_RULE.md` §2, born in the file
  of the agent that measures it — and correct: it measures the *promoted* register, which is a different
  population from either forked block and is the population that actually ships.
- **I did not touch the frozen originals.** `M2 Q-ECR-AXES` and `M3 Q-ECR-AXES` therefore still fire, by
  design and not by omission, and my minting does not move the count: `M6` and `M7` are already red from
  the Engineer's concurrent file, so this file adds no new failure line.
- **The ruling I need is one line:** widen my write set to those two Step 1 files for the fork collapse,
  or assign it. Price: 12 → 6 with the boundary regeneration; 12 → 8 without it. The lunar half
  (`Q-LCC15-*`, three more `M2` and one `M3`) is the identical defect and is The Space Resources
  Engineer's; if both land at one boundary the count goes to **2**.

---

## 4. The minted blocks

```quantity
id:            Q-ECR-AXES-PROMOTED
class:         fixed
value:         18
unit:          A rows in the promoted economics contested-claims register, counted under
               COUNTING_RULE.md section 2 and checked against that file's own H row field 5
population:    every tab-separated row of oracle/REGISTER.econ.tsv whose first field is the
               literal "A", the file being the promoted sidecar ruled at AM-98 and
               register_schema.md section 3.0, NOT the BEGIN/END block of any cr_scratch draft
operation:     cmd: awk -F'\t' '$1=="A"{a++} $1=="H"{h=$5} END{print a, h, (a==h?"AGREE":"DISAGREE")}' oracle/REGISTER.econ.tsv
conditions:    cwd: repository root, 55 characters. No other environment fact affects it; the
               operation reads one committed file and shells no tool.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     the promoted economics register holds 18 axis rows and its own header declares 18,
               and the operation prints "18 18 AGREE"
derived-from:  none
sampled:       n/a -- this operation counts rows by their first field, it does not classify
superseded:    supersedes the FORK at Q-ECR-AXES, which is not one block with a wrong value but two
               blocks with one id: 17 (The Manager, 1.10, 2026-08-27, over the draft's BEGIN/END
               block) and 18 (The Manager, 1.10 addendum, R-6, 2026-08-27, same id re-declared
               rather than superseded, which forked the index instead of updating it). Both are
               correct over the population each names and neither names this one. MEASURED at 2.3
               before this block was written: marking the 1.10 block class "superseded" does NOT
               clear M2 or M3 and adds M6, taking tools/quantities.js --check from 12 to 13.
               Collapsing the fork -- correct the 1.10 blocks in place, DELETE the five re-declared
               addendum blocks, regenerate -- takes it from 12 to 6.
               pending: cr_scratch/step1_10_manager_economics_register.md -- AM-93
```

```quantity
id:            Q-ECR-FORK-DELTA
class:         fixed
value:         6
unit:          hard-failure lines cleared from tools/quantities.js --check by the fork collapse of
               section 3.2, counted as the difference between two full runs of the same command
population:    the FAIL lines of tools/quantities.js --check over COUNTING_RULE.md section 8's
               declared file set, staged into a scratch root and read through QJS_ROOT, before and
               after the section 3.2 edit plus index regeneration
operation:     cmd: cp -r the declared file set to $SP/exp; QJS_ROOT=$SP/exp node tools/quantities.js --check | grep -c '^FAIL'; apply section 3.2; node tools/quantities.js --index > QUANTITIES.md; re-run and subtract
conditions:    cwd: the staged scratch root, 118 characters. Node 26.4.0. Staged copy, because a
               seat may not edit two frozen Step 1 deliverables to find out what an edit would cost.
               Baseline reproduced the repository at 12 before anything was changed.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b; repository read-digest f6464c14b179a476
               over 88 files
predicate:     collapsing the Q-ECR-AXES fork and regenerating the index clears 6 hard-failure lines,
               12 to 6: five M2 duplicate-id lines and one M3 line. Without the regeneration it
               clears 4, 12 to 8, and M3 Q-ECR-AXES survives because QUANTITIES.md is itself a
               quotation site.
derived-from:  none
sampled:       12 FAIL lines inspected by hand before and 6 after, by The Manager; every cleared
               line matched to the edit that cleared it. This operation classifies -- it attributes
               each cleared line to a cause -- and the attribution is stated per line in section 3.2.
superseded:    none
```

```quantity
id:            Q-ECR-AXES-CROSSFIELD
class:         fixed
value:         1
unit:          economics register axes whose member files do not all carry one field_label,
               counted under COUNTING_RULE.md section 2
population:    the 18 A rows of oracle/REGISTER.econ.tsv, each joined on leaf to column 10 of
               cr_scratch/merge_plan.tsv through its M rows
operation:     cmd: awk -F'\t' 'NR==FNR{if($1!="#")f[$2]=$10;next} $1=="M"{s[$2][f[$4]]=1} END{n=0;for(a in s){c=0;for(x in s[a])c++;if(c>1)n++}print n}' cr_scratch/merge_plan.tsv oracle/REGISTER.econ.tsv
conditions:    cwd: repository root, 55 characters. gawk or mawk with true multidimensional arrays.
               Reads merge_plan.tsv as landed at 2026-08-28 13:54; a re-cut of section 2.3's two
               files would not change this value, both being non-members of every axis.
at:            2026-08-28; lsei 7f97983; cr-agents f0c976b
predicate:     exactly one economics axis, ECR-16, has members on both sides of the field boundary:
               side A spans economics and lunar, side B is economics only. Every other axis is
               wholly within field economics.
derived-from:  Q-ECR-AXES-PROMOTED
sampled:       18 axes inspected by hand, 0 found wrong, by The Manager. This operation classifies
               -- it labels each axis crossing or not-crossing -- and all 18 were checked against
               the placement by eye, not only by the command.
superseded:    none
```

---

## 5. `register_class` and 2.16 — what must survive, in data terms, so `SLOT-D` can assert it

Answered without reading The Space Resources Engineer's file.

**The wrong assertion, and it is the one that will get written if nobody says this.** "`class` is
unchanged for every axis id." That is trivially true if nobody edits the `class` column, and it is
true in every scenario where the register is silently destroyed. `class` is a **label on a partition**.
It survives only if the partition survives. Assert the partition, and `class` follows.

**Four assertions. `SLOT-D` needs all four; any one alone passes while the register is broken.**

| | Assertion, in data terms | What it stops |
|---|---|---|
| **D-1** | The set of `axis_id` values is a bijection pre/post, and for each, `class` is byte-identical. | Axes silently dropped or reclassified by a rebind. |
| **D-2** | For each axis, the count of **distinct side letters** is unchanged, and is ≥2 where `class` ∈ {`two_sided`, `false_pair`} and ==1 where `class` = `one_sided`. | A `two_sided` axis losing a side and still being labelled `two_sided`. **This is the flattening.** |
| **D-3** | For each axis, every `M` row's `leaf` resolves to **exactly one** file in the merged corpus, and **no two `M` rows of one axis resolve to the same file**. | The mechanism of D-2: dedup merges two summaries of one source, and if the two sat on opposite sides the axis collapses with its label intact. |
| **D-4** | Each register file's `H` row fields 5 and 6 equal its own `A` and `M` counts, **and the sidecar loads as a SET of files, one `basis_root` each** — never a concatenation. | `register_schema.md` §3.0 and `AM-98`. The 143-failure concatenation The Engineer produced once at 1.14 and refused to ship. |

**Measured, so the assertions arrive with their current values rather than as a wish.** Over both
registers, 33 axes, 33 distinct ids, `check_registers.js` `L1b` census, digest `05d81245e59a972a`:

- **D-3 is the live one, and it is live on the lunar side only.** Twenty-seven `M` rows name a member of
  one of the eight same-source pairs — **27 lunar, 0 economics**. All eight pairs are lunar files;
  `pair_id` and `pair_role` are empty on all 70 rows of my half, confirmed independently from the
  register side and from the table side.
- **No axis loses a side today.** Every one of the 27 is same-side: `LCC-04` side A goes 4 leaves → 2,
  `LCC-12` side A goes 6 → 3, `LCC-01`, `LCC-05`, `LCC-06`, `LCC-07`, `LCC-08` and `LCC-15` each
  shrink by one, and **no side becomes empty**. So **no `class` value needs to change at 2.16** — but
  that is a fact about this dedup, not a property of the schema, and D-3 is what makes it checkable
  the next time rather than lucky twice.
- **D-2 has one thing it must be told, or it fires falsely.** `ECR-12` is `two_sided` with two sides and
  has a **third documented side on disk that is not registered** — see §6.1. If that lands as side C
  before `SLOT-D` runs, side count rises from 2 to 3 with `class` unchanged, which is correct and
  legal (`two_sided` is "two **or more**"). **D-2 asserts a floor, never an equality.** An assertion
  written as `sides_post == sides_pre` would reject a correct enrichment and accept nothing extra.

**The one thing the merge cannot break and everybody keeps worrying about.** The join is the **leaf**,
per `register_schema.md` §6, and 2.16 rebinds leaves. Folder placement cannot break any axis: I checked
all 18 against the placement and **every member leaf resolves, 0 dangling**. Nine axis pairs share
members across folders and none of that matters, because a folder is an address and the join is a name.

---

## 6. Not mine

**6.1 — `ECR-12` has an unregistered third side sitting in the corpus. Owner: me, at 2.16, NOT here.**
`imf-1963-appraisal-japan-double-income` is on disk, in `development-and-industrial-policy`, and is a
member of **no** ECR axis. It is Fujioka writing in 1963, eighteen months into the Income Doubling
Plan, and his reading is neither of `ECR-12`'s two: not Henderson's "the plans were not causal" and not
ESRI's announcement effect, but **"the arithmetic of the target was never really the risk"** — the
binding constraint is the balance of payments. A contemporaneous third reading, and `ECR-12`'s
`match_keys` carry `plan`, `doubling`, `income` and `announcement`, so it **will** be retrieved and will
arrive unclassified beside a two-sided axis.

**I did not add it, and the reason is the point of §3.** Adding an `M` row moves the `H` row's field 6
and therefore `Q-ECR-MEMBER-ROWS` — which is one of the five forked blocks, unreachable from my write
set. Landing a correct enrichment on top of an open fork is adding a divergence to the id I was sent
here to close. It lands at 2.16 with the fork collapsed, in one edit, or not at all.

**6.2 — An axis whose members span both `field` values must be scored from the POOLED table. Owner: The
Software Engineer, 3.7.** §2.7. One axis today, `ECR-16`, measured at up to 2.02 nats of asymmetry on
its own `match_keys`. Without this, the field label adjudicates the one disagreement the project has
deliberately refused to adjudicate, silently, by arithmetic, in whichever direction the question was
phrased. The check is one command and its current value is `1`:
`Q-ECR-AXES-CROSSFIELD`. **`SLOT-D` should assert it stays at whatever 3.7 rules, not that it stays
at 1.**

**6.3 — `kiyota-2013`'s level-2 identifier addresses the PRIMCED index, not the paper. Owner: The
Engineer, 2.2.** §2.5. One cell, and the document address is already in this corpus's own
`FA1-source-list.md` entry 10: `https://www.ier.hit-u.ac.jp/primced/documents/No48_dp_up_Pdf_2013.pdf`.
`gdp.md` and `statistical-review-of-world-energy.md` are the same class, have no better address, and
are better recorded as `n/a` than as a catalog page — his call, not mine.

**6.4 — `cr_scratch/step2_engineer_dispositions.md` carries three new hard failures. Owner: The
Engineer, this wave.** `M1 Q-PLAN-CHURN class "measured"`, not in `COUNTING_RULE.md` §2's closed set of
five; `M11 Q-PLAN-BLOCK1-117` and `M11 Q-PLAN-CHURN`, `cmd:` operations whose `conditions` name no
`cwd`. Cheap, and I am not touching another seat's file to fix them.

**6.5 — `tools/quantities.js`'s `--include-superseded` flag does not do what its name says. Owner: The
Designer, with `AM-132`.** §3.1. The option is `exclSup`; the mechanism at line 309 is a *promotion*
exclusion over `cr_scratch/` marker ranges and has nothing to do with `class: superseded`. Whoever rules
`AM-132` should rule the name at the same time — a reader who trusts the flag name will do exactly what
my brief told me to do and add a failure.

**6.6 — Standing clause 7(b) is stale and it is mine. Owner: the orchestrator, at the boundary.** The
count was 12 at 13:20 and is 17 at 13:54, from a concurrent seat. Any wave brief still quoting twelve
should quote a digest with it or quote nothing.

**6.7 — `literature/NAMING.md` was moved to `oracle/NAMING.md` mid-wave and `oracle/MANIFEST.tsv:24`
still names the old path. Owner: The Systems Engineer, this wave.** `git status` shows the staged
rename; `literature/` is now empty; `check_registers.js` fires `FAIL MF-1 row literature/NAMING.md is
promoted but no file exists at that path`. One cell.

**It reaches my half, and it survives — barely, and by one seat's foresight rather than by anything
structural.** Taxonomy §2.1 binds `field_label` to "`literature/NAMING.md` §9 … the only landed
authority that specifies a field label." That path no longer exists. The binding holds only because the
Engineer wrote, in `step2_engineer_dispositions.md` §6, "`field_label` binds to §9 of the naming
contract **wherever The Systems Engineer moves it**" — he anticipated the move and wrote the reference
to survive it. **The proposal document did not, and a reviewer reading taxonomy §2.1 today is sent to a
deleted file.** Note also that `.gitignore` lines 59–60 still whitelist `literature/FIELDS.tsv` and
`literature/INDEX.tsv`, which is correct and is not affected: the authority moves to `oracle/`, the data
it governs stays in `literature/`. Nothing in my four folders changes.

---

## 7. 2.9 (ECON-3) — the Denison and Chung 1976 recommendation

**You rule. I recommend, and the cost of each branch is below.** Three branches, not two: my brief's
binary omits the one the corpus's own ledger already names.

### 7.1 The measurement that makes this worth your time

`ECR-08` says the corpus reaches the decomposition only through reviews and that the two reviews cover
different periods. **True, and it understates the problem. Read at source, neither review's arithmetic
closes:**

| Route | Period | Stated total | Components sum to | Gap |
|---|---|---|---|---|
| `may-1977` | 1953–1971 | **8.77** | 2.10 + 1.97 + 1.94 + 1.85 + 0.95 = **8.81** | 0.04 |
| `simonis-1979` | 1961–1971 | **9.56** | seven listed items = **8.74** | **0.82** |
| `henderson-2008` | 1953–1971 | 8.77 | four named factors = 7.86, reallocation "most of the remaining" | not itemised at all |

And the May figures are **OCR reconstructions**. Its own Limitations section: *"OCR of the numeric
decomposition (e.g., '2 I 0%', 'I 97%') required interpretation as 2.10%, 1.97%, etc.; figures are
reported here as read, consistent with the sum being close to the stated 8.77% total."* Simonis's own
summary says the 0.82 gap "likely reflects sub-components … not individually itemized" and that this
"is a property of the review's reporting, not necessarily of the original book."

**So: three routes, two periods, two unreconciled residuals, one set of digits reconstructed from a
scan, and no source on disk that can settle any of it.** This is P2's failure mode in its purest form —
a decomposition the corpus will quote confidently, from three sources that agree with each other because
they are all quoting the same book none of them opened for us.

**And it is the number the project most wants.** Simonis relays D&C's split of the 9.56 into
**sustainable 3.24** and **transitional 6.32** — how much of a catch-up boom persists once the
catching-up stops. For a lunar economy that is the question, and it exists in this corpus only inside
the review whose arithmetic does not close.

### 7.2 Two things the brief's binary does not know

**(a) The monograph is located, and controlled digital lending forbids exactly the thing "acquire and
summarise" means.** `FA1-source-list.md` entry 11a: Internet Archive `howjapanseconomy0000deni`,
`ark:/13960/t5fc1jj24`, free account, 14-day borrow, **"in-library/print-disabled restricted, so no bulk
page extraction."** The ledger's own instruction is *"Treat as reference-on-demand: we do not extract
the whole book. When the synthesis needs the specific … figure, look up that table only."* A summary of
the kind every other corpus file is cannot be produced from a borrow that permits a table lookup.

**(b) There is a third route and it is a PRIMARY TEXT BY THE SAME AUTHORS.** Entry 11b: Denison, E. F.,
& Chung, W. K. (1976), *Economic growth and its sources*, in Patrick & Rosovsky (eds.), **Asia's New
Giant**, pp. 63–151 — a separate item the ledger flags "two distinct items, do not conflate." **May
confirms the overlap from the other side**, in his own review: entry 11a and entry 11b are
"substantially overlapping treatments of the same decomposition, with entry 11a adding the appendices
and the Japan–US output-per-worker comparison." An 88-page chapter is an ordinary acquisition and an
ordinary summary. It carries the decomposition. It is Denison and Chung in their own voice.

**`ECR-08` names three reviews and does not name this route.** That is a gap in my own row, found by
reading the ledger this sub-step rather than by being told.

### 7.3 The three branches, priced

| | Branch | What it costs | What it buys | What stays broken |
|---|---|---|---|---|
| **A** | Acquire the monograph (11a) | Borrow, table lookup only. **Cannot produce a standard summary** — CDL forbids it. Needs a new file class, or a rule that a `literature/` file may be a single sourced table. | The itemisation that closes both residuals. | The precedent: one corpus file that is not a summary. |
| **B** | Mark it permanently unavailable and hard-block | **One cell.** See §7.5 — the mechanism already exists and is already landed. | Closure. Nothing further owed. | The 0.82 gap is permanent, and `sustainable 3.24 / transitional 6.32` is quotable only with the review label. |
| **C** | **Acquire the *Asia's New Giant* chapter (11b) instead** | An ordinary chapter acquisition and an ordinary summary. Ledger says "PDF route: library." Not free, not guaranteed. | A **primary** Denison and Chung text on the decomposition, a real corpus file, and P2's structural defect closed on the one axis where it costs most. | The appendices and the Japan–US comparison, which are 11a-only and which nothing in this project has asked for. |

### 7.4 My recommendation

**C, with B as the standing state until C lands, and A declined.**

Not because C is cheaper than A — it may not be — but because **A cannot produce the object this corpus
is made of and C can.** Every other file in `literature/` is a summary whose warrant is that each claim
resolves to one source. A borrowed-table lookup is not that, and admitting one would put a file of a
different kind on the shelf whose uniformity is the answer contract's guarantee. That is the same ruling
I gave at FA1–FA8 and I would be inconsistent to give a different one here because this time the
non-conforming object is one I want.

B is not a defeat. It is the correct standing state under **either** of the other branches, it costs one
cell, and §7.5 shows the machinery is already built. **If C is declined or the chapter cannot be
obtained, B is the answer and nothing further is owed.**

**A note on my own interest, stated because you should discount it.** I want the `sustainable 3.24 /
transitional 6.32` split more than any other number in this corpus, because it is the one figure that
speaks directly to whether a lunar catch-up boom compounds — which is my side of the A.9 tension. That
is a reason to be suspicious of my enthusiasm for acquisition, not a reason to grant it. **If you rule
B, the argument I most want to make gets weaker, and it should.**

### 7.5 Branch B's hard block already exists, and I have landed the half that is true under all three

**The brief asks me to "mark the register row permanently `neither`." `neither` is not a value in this
project.** It is not one of `register_schema.md` §3.2's three `class` values, and it is not one of
`answer_contract.md` §1's six verdicts. It survives from the Step 0 integration draft's ECON-3 wording,
written before either contract existed. The landed equivalents are: `class` stays **`one_sided`** —
literally the schema's own definition, "one documented side; the other side is … a source not on disk"
— and the verdict is `LITERATURE` with §7's one-side disclosure.

**And the hard block the brief asks me to build is `scope_token`, which is already the mechanism.**
§3.2: "an answer quoting any figure from this axis without that noun is a failure." **One edit made,
inside my declared write set, true under all three branches:**

```
ECR-08 scope_token
  was:  reviewed period
  now:  the reviewed period and the review the figure is routed through

ECR-08 axis_statement
  + ", and neither review's component list sums to the total it states"
```

`node tools/ecr_verify.js oracle/REGISTER.econ.tsv _intake/japanese-miracle/lit` → **ALL PASS,
FAILURES 0**, both before and after the edit.

`node tools/check_registers.js` read **0** hard failures at `05d81245e59a972a` and **1** at
`7a349593e1a82157` twenty minutes later. **The one is not mine and not the register's** — it is
`FAIL MF-1 row literature/NAMING.md is promoted but no file exists at that path`, and §6.7 has it. I
am recording both readings rather than the one that flatters the edit, because a deliverable that
quotes the favourable moment of a moving number is the defect this file spends §1 and §3 on.

I made this edit and no other. **Everything branch-dependent is left for your ruling**, because
`axis_statement` is delivered to the user verbatim and editing it twice — once now on a guess and once
after you rule — would put a paraphrase of my own guess in front of a user in between.

---

## 8. What I did not do

- **Did not resolve A.9**, and did not read `cr_scratch/step2_space_resources_engineer_review.md` before
  answering §5. §2.7 sharpens the tension into a measured retrieval requirement and marks neither side
  correct, which is what `ECR-15` and `ECR-16` already do.
- **Did not edit outside the declared write set.** One cell of `oracle/REGISTER.econ.tsv` and this file.
  Everything else is routed in §6, including the fix I most wanted to make and the two Step 1 files that
  are my own.
- **Did not regenerate `QUANTITIES.md`.** Wave-boundary action. My three new blocks stale the index;
  `M6` and `M7` are already firing from a concurrent seat, so they add no new failure line.
- **Did not quote the T4 figure of 22.** It is not settled.

---

*The Manager. The brief told me to supersede a fork, and I measured the remedy before applying it and
found it makes the count go up by one where collapsing the fork takes it down by six — so what I have
handed you is a ruling request and a price, not an edit that would have looked like progress. Two of
three numbered premises did not survive contact, and the one in the prose above them survived only
because the file it named appeared while I was working. On 2.9 the corpus's own ledger already knew a
third branch my brief did not, and it is the branch I recommend, against the one I want. The register
holds at 18 and 53, agreeing with its own header on both counts, and it has one unregistered third side
that I found and deliberately did not add.*
