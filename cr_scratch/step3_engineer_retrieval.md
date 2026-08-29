# Step 3, sub-steps 3.6 and 3.7 — The Engineer: the labelled question set, and the retrieval rebuild

**Agent:** The Engineer (W4-3)
**Sub-steps:** 3.6 (the labelled question set), then 3.7 (rebuild retrieval). In that order, one sitting.
**Date:** 2026-08-28
**Read-digest:** repo `99d3601` plus this wave's uncommitted work; `node tools/quantities.js --check`
reports `8a68896e3858e6bd over 508 files, tool 2.19-1`. `literature/` 169 `.md`, `INDEX.tsv` 170
lines, `FIELDS.tsv` 2 field rows. `lsei` `7f97983`, `cr-agents` `f0c976b`. node v26.4.0.
**cwd:** repository root, 55 characters.

**Deliverables:** `oracle/acceptance/labelled_questions.tsv` (44 rows), `oracle/retrieval/field_map.js`,
`oracle/retrieval/literature_search.js`, `oracle/retrieval/tune_threshold.js`,
`oracle/retrieval/prove.js` (10 tests, all pass).
**Relay:** `cr_scratch/relay/w4-3_engineer_to_software_engineer_retrieval_signature.md`, sent before
this document was finished.

---

## 0. The headline, before the detail

Three things, in descending order of how much they should change what other seats do.

1. **Retrieval runs against the 169-file shelf and returns ranked, scored results.** The threshold
   is **0.28**, derived by sweep against a 28-row tuning split. On the 16-row **holdout, scored once
   after the threshold was fixed: 13/16 against the incumbent 0.45's 11/16.** Part 7's finding 4 —
   both sides of the MITI contested pair gated out — is closed: both now confirm.

2. **The premise in my brief about *why* 0.45 failed is wrong, and I can show it.** Part 7 attributed
   the contested-pair failure to two vocabularies diluting the confirm. The measurement says the
   mechanism is a broken denominator: the prototype judged a file on the question's *residue after
   the filename match*, which is by construction its least topical words, so **the best-matching file
   in the corpus scored `frac 0.00` while a file scoring `0.00` confirmed.** No value of the
   threshold could have fixed that.

3. **Field-scoped IDF's weight error is real and large; its effect on outcomes is real and small,
   and I could not make my own fixture set see it.** `moon` errs by **2.11 nats** under pooling,
   confirming the brief. But scoped and pooled score **identically** on pass/fail — 37/44, holdout
   13/16, both arms. What scoping buys is precision at equal recall, concentrated in cross-field
   questions. Saying so is the point; the brief called this damage "measured", and only half of it was.

---

## 1. Premise check, run first (standing rule 1)

| brief's claim | measured | verdict |
|---|---|---|
| `FIELDS.tsv` exists and is real data | 2 field rows, 8 lunar folders / 124 files, 3 economics / 45 | **holds** |
| eight folders carry `field: lunar`, not seven | `awk` over `FIELDS.tsv`: 8 and 3 | **holds** |
| a map from the review split orphans 26 files | `space-economy-and-markets` holds 26 `.md` | **holds** |
| `moon` errs by 2.13 nats under pooling | **2.11** at 169 files | **holds, moved** |
| worst case 0.97 for the flagged rows (`capital`) | **0.92** at 169 files | **holds, moved** |
| corpus is 169 | 169 `.md`, 170 `INDEX.tsv` lines, 124 + 45 = 169 | **holds** |
| `oracle/thin_patches.json` lands early this wave | absent at my first check, present at my second | **holds** |

Both IDF figures moved because the earlier measurement (2.3) was over **176** files at 132/44 and the
shelf is now **169** at 124/45. Figures at different digests are not comparable; these are re-measured.

**Change (a) is therefore correctly aimed and I built it.** The re-measurement is in
`node oracle/retrieval/literature_search.js --demo` and asserted in `prove.js` test 7.

---

## 2. Sub-step 3.6 — the labelled question set

`oracle/acceptance/labelled_questions.tsv`. **44 rows.** It is a fixture, not documentation, and
every outcome was decided before the threshold was.

| | lunar | economics | cross | negative | total |
|---|---|---|---|---|---|
| **tune** | 8 | 8 | 5 | 7 | **28** |
| **holdout** | 4 | 4 | 3 | 5 | **16** |
| **total** | 12 | 12 | 8 | 12 | **44** |

Five outcome kinds: `top` (must be `best`), `confirmed` (must be in `confirmedSet`), `both` (all
named paths in `confirmedSet`), `none` (`confirmedSet` must be **empty**), `absent` (named path must
**not** be in `confirmedSet`).

**Provenance matters more than count.** 20 of the 32 positive rows are inherited from another seat's
document rather than invented against a filename listing I had just read: 1.11's FIX-7/8/9/11/13/14/15,
part 7's four measured queries, and §1 of both question surfaces. The 12 negatives are the rows I
authored, and each one's absence was **grepped and verified at 169** before it went in.

### 2.1 The negatives are the load-bearing half

A fixture set of positives only has its optimum at threshold 0, where everything confirms and the
instrument is worthless. **The first sweep did exactly that** — reported 0.05 at the bottom edge of
the range — and that is recorded in §4.1 rather than quietly fixed.

`N-01` (icy-regolith shear strength, bearing capacity, cone penetration) was written from the Step 0
lunar question surface, where The Space Resources Engineer measured zero matching files. I re-ran the
grep at 169: still zero. **`oracle/thin_patches.json` then landed and independently ranked the same
gap `T1`, rank 1.** That is corroboration rather than agreement by construction, and it is the
strongest single row in the set.

`N-11` is the hardest negative and it was designed to be: *"What is the electron mobility of gallium
nitride power transistors at high temperature?"* — `power`, `temperature` and `high` are near-stopwords
in the lunar half and `transistor` genuinely occurs in 4 files. Everything but the subject is present.

---

## 3. Sub-step 3.7(a) — field-scoped IDF

### 3.1 The mechanism, and the trap it is built around

`oracle/retrieval/field_map.js` reads `literature/FIELDS.tsv` and `literature/INDEX.tsv` and
**cross-checks them against each other**, per-file field against per-folder field. It never infers.

This is not defensive decoration. There are two partitions of the same eleven folders in this project:

- **review split**, 7 lunar / 4 economics — who is competent to judge a placement;
- **FIELD split**, 8 lunar / 3 economics — which vocabulary distribution a file's words come from.

They differ on exactly one folder, `space-economy-and-markets`, holding **26 files, 15% of the shelf**.
A field map built from the review split mis-scores all 26 **silently**: no error, no missing file,
full apparent compliance, answers merely slightly worse. `prove.js` test 5 plants a corpus whose two
maps disagree and requires the build to **throw**. It is the only mechanism between that mistake and
a silent regression, and it is the test in this deliverable I would keep if I could keep one.

### 3.2 `moon`, demonstrated specifically

Okapi-form IDF, `ln(1 + (N − df + 0.5)/(df + 0.5))` — the same form the partition was measured in at
2.3, so the claim and the scoring instrument are the same instrument.

```
term          field      df/N       pooled  scoped   error(nats)
  moon        economics  2/45         0.80    2.91      2.11     <- the measured row
  moon        lunar      74/124       0.80    0.52      0.28
  capital     economics  35/45        1.17    0.26      0.92     <- B3's own flagged row
  capital     lunar      17/124       1.17    1.97      0.79
  regolith    economics  1/45         0.95    3.42      2.47
  productivity lunar     5/124        1.57    3.12      1.56
  water       economics  3/45         0.87    2.58      1.71
```

`moon` appears in 2 of 45 economics files and 74 of 124 lunar ones. Pooled, those 74 make it look
common in a half where it is rare — **2.11 nats, more than twice B3's own worst example.** Asserted in
`prove.js` test 7 in both directions, so a change either way fails rather than passes quietly.

### 3.3 What it buys, measured — and this is smaller than the weight error implies

I ran the whole fixture set through a **pooled counterfactual arm** (`--pooled`, B3 intact):

| | field-scoped | pooled | 
|---|---|---|
| tune split at its own optimum | 24/28 | 24/28 |
| **holdout, scored once** | **13/16** | **13/16** |
| full set | 37/44 | 37/44 |
| chosen threshold | 0.28 | 0.31 |

**Identical on pass/fail.** Where it does move:

- candidate **ranking** differs on **15 of 44** fixtures;
- **confirmed set** differs on **8 of 44** — `L-06`, `L-07`, `E-05`, `E-07`, `X-01`, `X-04`, `X-05`, `X-08`;
- and on every cross-field fixture where it moves, **scoped returns fewer files**.

Mean `|confirmedSet|` at threshold 0.28, recall held identical:

| rows | scoped | pooled |
|---|---|---|
| 8 cross-field | **5.25** | 6.50 |
| 32 positive | **4.13** | 4.45 |
| all 44 | **3.16** | 3.45 |
| 12 negative | 0.42 | 0.42 |

**Field scoping is a precision gain at equal recall — 19% tighter on cross-field questions — and it
is concentrated exactly where B3 predicted.** It is not a recall gain and it does not flip a verdict
on any row I labelled. My brief called its damage "measured"; the damage to the *weights* was
measured, the damage to *outcomes* was not, and the honest statement is the one above.

**Why my fixture set can barely see it:** my labels ask *"is the right file present"* and never *"how
much wrong file came with it."* A precision improvement is invisible to a recall label by
construction. That is a defect in 3.6's design, it is mine, and §6 records it.

---

## 4. Sub-step 3.7(b) — the confirmation threshold

### 4.1 The first sweep was wrong, and how

The first run maximised **raw pass count** over a set holding 32 positives and 4 negatives. It
reported **0.05**, at the bottom edge of the swept range, with a plateau one value wide. A raw count
over a set that lopsided does not measure an instrument; it measures how many positives are in the
fixture set, and its optimum is the degenerate one where everything confirms.

Two corrections, and I distinguish them because one is legitimate and one would not have been:

- **Objective changed** to the unweighted mean of the find-something pass rate and the find-nothing
  pass rate. Driving the threshold to zero now costs the whole second term. This is tuner design.
- **Negatives extended from 4 to 12**, and the holdout — which had **zero** negatives, so it could
  only ever measure recall — given 5. This is fixture *sizing*, done because n was too small for a
  balanced objective, **not** because of which direction the answer moved. Every added negative was
  grepped and verified absent before it went in.

**I did not touch a single expected outcome to make a number come out.** That distinction is the one
that matters and I am stating it explicitly rather than leaving it to be inferred.

### 4.2 The sweep

```
  thr    obj    find/20  none/8   pass          (tune split, 28 rows)
  0.05  0.613   0.85     0.38     20/28
  0.13  0.800   0.85     0.75     23/28
  0.25  0.863   0.85     0.88     24/28   <- plateau opens
  0.31  0.838   0.80     0.88     23/28   <- plateau closes at 0.30
  0.47  0.787   0.70     0.88     21/28
  0.59  0.825   0.65     1.00     21/28
  0.67  0.750   0.50     1.00     18/28

  maximum objective 0.863 over [0.25, 0.30], 6 swept values wide
  CHOSEN THRESHOLD = 0.28  (plateau midpoint)
```

**The midpoint of the widest plateau, not the first value to reach the maximum.** A threshold on a
knife edge between two fixtures is overfitted by construction. There is a second, narrower local
maximum at 0.59–0.62 that buys the last negative at the cost of a fifth of recall; it is rejected as
a 4-value plateau against a 6-value one, and because an Oracle that refuses a third of its answerable
questions to avoid one false positive is the wrong instrument.

### 4.3 The number, its fixture set, and what 0.45 scores on the same set

**This is the close condition, stated so it is falsifiable rather than asserted.**

| | tune (28) | **holdout (16)** | full (44) |
|---|---|---|---|
| **0.28**, chosen | **24/28** (obj 0.863) | **13/16** (obj 0.864) | **37/44** (obj 0.865) |
| **0.45**, incumbent | 22/28 (obj 0.813) | **11/16** (obj 0.773) | 33/44 (obj 0.800) |

**The holdout is the row that counts.** 16 questions never looked at while tuning, scored once,
against a threshold fixed beforehand: 13/16 against 11/16. The tune-split margin (24 against 22)
could be my fixture set flattering my own number; the holdout margin cannot be, and it is larger in
objective terms (0.864 against 0.773) than the tune-split margin is.

### 4.4 Part 7's finding 4, closed

```
query: Is the evidence that MITI targeting worked, or is the myth-of-MITI critique right?
threshold 0.28; 2 scored, 2 returned, 0 truncated
  OK development-and-industrial-policy/henderson-2008-myth-of-miti.md  [economics] score=4.49 frac=0.45
  OK development-and-industrial-policy/beason-1996-targeting-japan.md  [economics] score=1.81 frac=0.35
best: henderson-2008-myth-of-miti.md   confirmedSet: 2
```

Both members confirm. At 0.45 Beason (0.35) is gated out and Henderson sits exactly on the line. The
merged corpus is no longer mute on its best question.

### 4.5 The denominator, which is the finding part 7 did not have

Setting a threshold on a broken instrument is what 3.6 exists to prevent, so I measured the
instrument before tuning it. Measured, at threshold 0.28, before repair:

```
query   "What is the breakeven condition for lunar propellant against launched propellant?"
file    logistics-and-delivery/jones-2020-lunar-propellant-breakeven.md   score 4.36, RANK 1 of 35
prototype denominator, after removing every matched topic token:  condition, against, launched
  body contains condition = false
  body contains against   = true      (idf ~0.004; a near-stopword in the lunar half)
  body contains launched  = false
frac 0.00  ->  GATED OUT at any threshold above zero
meanwhile isru-processing/linne-2020-lunar-water-pilot-plant.md  score 0.00  frac 0.36  -> CONFIRMED
```

The residue left after a good filename match is, **by construction**, the question's least topical
words. So the better a file matches, the more purely junk the evidence it is judged on becomes, and
the top-ranked file is punished for ranking top. It fires hardest on cross-field questions because
those carry the most connective tissue between their two halves.

Part 7 read the same symptom and wrote: *"a two-field question spreads its tokens across two
vocabularies and no single summary can carry 45% of them."* Plausible, and not the mechanism.
**Raising or lowering 0.45 could never have fixed it.** The repair excludes only matched **identity**
tokens (leading author, four-digit year), preserving the rule the prototype actually needed — a file
cannot confirm itself by restating its own byline — while judging the body on the question's real
subject. `prove.js` test 8 pins it: the same file now scores `frac 0.55`, denominator
`[breakeven, lunar, propellant]`, byline dropped.

`L-09` ("Who owns lunar resources under the Outer Space Treaty?") is the visible consequence: the
treaty ranked **1 of 49** and was gated out at `frac 0.00` before the repair. It passes now.

---

## 5. What else changed, and what did not

**Carried over verbatim, comments included:** `listCorpusFiles()` and `requireNonEmptyCorpus()`. §1.2
called these the twelve most valuable lines in the prototype and it is right.

**Contract unchanged:** filename match, then full-text confirm, no semantic layer.

**Also repaired, all diagnosed before I started, none of them new ideas:**

- **No silent truncation.** `scoredCount`, `returned`, `truncated` on every result. Reporting only;
  no ranking change. `prove.js` test 9.
- **`confirmedSet`.** One winner structurally cannot express a contested pair. `prove.js` test 10
  proves it on `metzger-2020/2021-aqua-factorem`, a real duplicate cluster on this shelf.
- **`citationForFile()` NOT carried over.** It emitted the hard-coded string *"the 57-file corpus"*
  into answers — a false number printed as fact — and it is the router's concern anyway.
- **Identity-anchor field gate: built, measured, left OFF.** `--gate-anchor` scores **identically on
  all 44 rows**, every threshold. Unproven, not disproven. Reported so 3.8 can turn it on with
  evidence rather than by argument.

---

## 6. How my fixture set could be wrong

The brief asked for this plainly, and my own history is the reason: at Wave 2 my first working run
confirmed a level-3 group of two and merged two issues of one newsletter, and I caught it in my own
instrument. A threshold that scores well on a fixture set I also authored proves nothing. Six ways
this one is wrong, worst first.

**1. It measures recall and is nearly blind to precision.** Every positive label asks *"is the target
in `confirmedSet`"* and none asks *"how much else came with it."* So the set cannot see the main
benefit of field-scoped IDF (§3.3) and it under-penalises a loose threshold: a row passes just as
hard with 10 confirmed files as with 1. **The mean-set-size table in §3.3 is a proxy I computed after
the fact, not a label anybody can hold me to.** The fix is a `precision` outcome kind naming a
maximum set size, and I did not build it.

**2. I authored the negatives, and they carry 50% of the objective on 27% of the rows.** With 12
negatives against 32 positives under a balanced objective, each negative is worth ~2.7× each
positive. A negative I chose badly moves the threshold much further than a positive I chose badly.
Mitigated by grepping every one for absence, and by `N-01` being independently corroborated by
`thin_patches.json` T1 — but only `N-01` has an outside witness.

**3. The holdout is 16 rows and was split by me, before I ran anything, but by hand.** I assigned
roughly every third row within each kind. That is not randomisation. A holdout drawn by the same
judgement that wrote the questions is weaker than one drawn by a coin.

**4. Six of 37 targets are unreachable at any threshold, so the ceiling is not 44/44 and I did not
know that when I wrote the labels.** `L-02`, `L-04`, `E-05`, `E-07`, `X-01`(Henderson), `X-03`. Those
rows are, as written, unpassable — they measure the architecture, not the threshold. Three of them
are the three holdout failures at 0.28. **This makes the holdout look worse than the threshold
deserves, which is the safe direction, but it means 13/16 understates and 11/16 also understates,
and the comparison is fairer than either absolute number.**

**5. `top` appears once.** `L-03` is the only row asserting *which* file wins. Ranking quality is
almost untested; the set tests membership.

**6. Nothing here tests a question the corpus answers *wrongly* — a plausible file confirming for a
question its body does not address.** `X-08` is the only false-positive guard and it names a specific
file. That is the failure class most likely to embarrass this Oracle in front of the author, and my
set has one row of it.

**What I held back and what it bought:** the 16 holdout rows were never scored, printed, or looked at
until the threshold was fixed at 0.28 by the tune split alone. That is the one claim in this
deliverable that does not rest on my judgement, and it is why §4.3 leads with 13/16 against 11/16
rather than with the tune-split figure.

---

## 7. The finding I could not fix, and which is bigger than both my changes

**16% of the labelled targets cannot be retrieved at any threshold.** Measured over all 37 target
files, threshold-independent, by asking whether each target enters the scored pool at all:

```
  31/37 target files are in the scored pool at all
   6/37 cannot be retrieved at ANY threshold
  31/37 rank in the top 10
```

The filename gate scores only files sharing a token with the question, and the full-text confirm
never runs on a file the gate rejected. So a question saying "molten regolith electrolysis" cannot
reach `sibille-2012-joule-heated-mre.md` — the filename says `mre`. Likewise
`spear-1999-decoding-tps-dna.md` from a question about the Toyota production system, and
`wittenberg-1992-he3-resources-review.md` from "helium-3" (which tokenises to `helium` + `3`, and
`3` is dropped as a single character).

**And on part 7's own cross-field query, `henderson-2008-myth-of-miti.md` is unreachable.** Part 7's
headline — the merge converts an honest refusal into a confident, well-cited, **one-sided** answer —
was diagnosed as a threshold problem and scheduled to me as one. **It is only half a threshold
problem.** The other half is the filename gate, and no value of the threshold touches it.

I have not changed the inherited contract to fix this. §1.2 states "filename match, then full-text
confirm" survives the rebuild, and replacing it with a body-first pass over 169 files is a different
sub-step with a different owner and a different cost. **It is relayed, not silently absorbed.** The
recommendation in the relay is that 3.8's `CONTESTED` branch resolve register member leaves by path
against `INDEX.tsv` directly, rather than asking retrieval for a file retrieval is structurally
incapable of returning.

---

## 8. Verification

```
node oracle/retrieval/prove.js                  -> SELF-TEST: PASS, exit 0, 10/10
node oracle/retrieval/tune_threshold.js         -> chosen 0.28; tune 24/28; holdout 13/16; full 37/44
node oracle/retrieval/tune_threshold.js --pooled     -> chosen 0.31; holdout 13/16; full 37/44
node oracle/retrieval/tune_threshold.js --gate-anchor -> identical to the default arm on all 44 rows
node oracle/retrieval/literature_search.js --demo     -> the IDF error table, moon 2.11 nats
node oracle/retrieval/literature_search.js --query "..." -> a ranked, scored, field-labelled search
```

Ten tests, all passing: 1–2 walk shape-agnosticism, 3 empty-corpus throw, 4 orphan throw, 5 **the
26-file field-split trap**, 6 the real 169-file shelf partitions 124/45 with the disputed folder
resolving `lunar`, 7 **`moon` at 2.11 nats against `capital` at 0.92**, 8 the confirm denominator,
9 truncation reported, 10 `confirmedSet` returns both members of a real cluster.

Tests 1–5 run against scratch fixtures so they do not depend on today's corpus. **Tests 6–10 run
against the real shelf on purpose:** 3.7's close condition is that retrieval runs against *that*
shelf, and a suite that only ever sees planted fixtures cannot say whether it does.

```quantity
id:            Q-RET-CONFIRM-THRESHOLD
class:         fixed
value:         0.28
unit:          minimum IDF-weighted fraction of a question's topic tokens that must occur in a
               candidate summary's body for that candidate to be returned as confirmed
population:    the 28 tune-split rows of oracle/acceptance/labelled_questions.tsv, swept over
               thresholds 0.05 to 0.80 in steps of 0.01, against the 169-file literature/ shelf
operation:     cmd: node oracle/retrieval/tune_threshold.js
conditions:    cwd: repository root, 55 characters. node v26.4.0. Okapi-form IDF, field-scoped by
               literature/FIELDS.tsv and literature/INDEX.tsv. Objective is the unweighted mean of
               the find-something and find-nothing pass rates, NOT a raw pass count: a raw count
               over 32 positives and 12 negatives has its optimum at threshold 0. Reported value is
               the midpoint of the widest plateau at the maximum, [0.25, 0.30], 6 swept values wide.
               A different objective or a different IDF form gives a different number.
at:            2026-08-28; repo 99d3601 + wave 4 working tree; lsei 7f97983; cr-agents f0c976b;
               read-digest 8a68896e3858e6bd over 508 files
predicate:     0.28 scores 24/28 on the tune split against the incumbent 0.45's 22/28, and 13/16 on
               the 16-row holdout against 0.45's 11/16. The holdout was not scored, printed or read
               until after the threshold was fixed by the tune split alone, so the holdout margin
               does not rest on the fixture author's judgement. Superseding this value requires
               extending the fixture set and re-running the sweep, never a hand edit of
               CONFIRM_THRESHOLD in oracle/retrieval/literature_search.js.
derived-from:  Q-RET-FIXTURE-ROWS
sampled:       3 arms computed and all 3 reported -- field-scoped (shipping), pooled IDF
               (counterfactual, loose end B3 intact) and field-scoped with the identity-anchor gate
               on. The pooled arm scores IDENTICALLY on pass/fail (37/44 full, 13/16 holdout) and
               chooses 0.31; the gated arm is identical to the shipping arm on all 44 rows. This
               operation is tuned by the same seat that authored its fixture set, which is the
               defect class this seat published against itself at Wave 2; the holdout split and the
               12 verified-absent negative rows are the mitigations, and section 6 states six ways
               the fixture set could still be wrong.
superseded:    supersedes the prototype's hand-tuned 0.45 (lsei/oracle/lib/literature_search.js
               confirmInText), which was set against a single-field 156-file corpus
```

```quantity
id:            Q-RET-FIXTURE-ROWS
class:         fixed
value:         44
unit:          labelled question rows in oracle/acceptance/labelled_questions.tsv, excluding the
               comment block and the header row
population:    oracle/acceptance/labelled_questions.tsv, all non-comment non-header lines
operation:     cmd: grep -v '^#' oracle/acceptance/labelled_questions.tsv | tail -n +2 | wc -l
conditions:    cwd: repository root, 55 characters. LF line endings. The file is tab-separated and
               its comment block is prefixed '#' plus a tab, so a naive column count on the comment
               lines will not match the data rows.
at:            2026-08-28; repo 99d3601 + wave 4 working tree; read-digest 8a68896e3858e6bd
predicate:     44 rows = 12 lunar + 12 economics + 8 cross-field + 12 negative, split 28 tune / 16
               holdout with negatives present on both sides of the split. This is the denominator
               Q-RET-CONFIRM-THRESHOLD is measured over: the threshold has no meaning apart from
               it, which is the entire reason 3.6 precedes 3.7. 20 of the 32 positive rows are
               inherited from another seat's document (1.11 FIX-7/8/9/11/13/14/15, part 7's four
               measured queries, section 1 of both question surfaces) rather than authored here;
               all 12 negatives were authored here and each was grep-verified absent from the
               169-file shelf before inclusion.
derived-from:  none
sampled:       n/a -- this operation counts lines in one file. Recorded separately from the
               threshold because a threshold quoted without its denominator is the thing this
               sub-step exists to prevent, and because the set grew from 36 rows to 44 DURING
               tuning: the negative rows were extended from 4 to 12 after the first sweep returned
               a degenerate optimum at the edge of the swept range. That extension is fixture
               sizing, not result-chasing -- no expected outcome on any row was ever changed -- and
               section 4.1 records it rather than presenting 44 as the original design.
superseded:    none
```

---

## Not mine

- **The filename-gate reachability ceiling (§7).** Replacing "filename match, then full-text confirm"
  with a body-first pass is a change to a contract §1.2 says survives the rebuild. Relayed to The
  Software Engineer with a concrete recommendation for the `CONTESTED` branch. Not absorbed silently.
- **`bestSet` keyed by a register `## Contested` id.** Part 7 named it and §1.2 costed it. I return
  `confirmedSet`, the full confirmed population; selecting the subset that matches a register axis
  needs the register and is 3.8's.
- **`citationForFile()` and its false "57-file corpus" string.** Not carried over. Whatever replaces
  it belongs with the router, which is the only thing that has the app's `REFERENCES`.
- **The four standing suite failures** argued in `af7abec`. Untouched, per the standing block.
- **The 5 hard `--check` failures** at read-digest `8a68896e3858e6bd`. Pre-existing (`Q-ECR-AXES`,
  `Q-LCC15-DISTINCT-LEAVES`, `Q-DEGRADED-MODES`, `Q-REG-TSV-IGNORED`, `QUANTITIES.md` regeneration).
  None is mine and none is touched. `QUANTITIES.md` needs `--index --write` to pick up my two new
  ids; that is the index owner's run, not mine.
- **`oracle/tests/run_suite.js` bindings.** My 10 tests live in `oracle/retrieval/prove.js` with
  their own runner and exit code. Binding them into the 405-row suite is the suite owner's.

---

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +2/-0 | tests +10/-0
```

`tests +10` is the TDD exception the standing block names: 3.6 is an assertions-first sub-step and
`oracle/acceptance/labelled_questions.tsv` plus `oracle/retrieval/prove.js` are its deliverable, not
freeze spend. All 10 are retrieval behaviour; none touches a check row, an amendment row, or the
existing suite. Quantity ids are the two the brief allows: the threshold and its denominator, both
twelve-field, both carrying `cwd:`.

---

## 9. Addendum, 2026-08-28: two acceptance failures routed back, and the index

Three items landed on this work after the close. **Nothing in my write set changed as a result: `K`
stays 2.431 and `CONFIRM_THRESHOLD` stays 0.28.** Both were routed to me as numbers to move and
measurement says neither is the defect. Full working in
`cr_scratch/relay/w4-3_engineer_to_sre_and_swe_K_and_srq13.md`; probes in `cr_scratch/eng_w43_*.js`.

### 9.1 `K` — the acceptance set's constraints are mutually unsatisfiable

Measured with the exact question text from `oracle/acceptance/lunar_questions.md`:

| row | axis | wants | mass |
|---|---|---|---|
| SRQ-3 | LCC-01 | quiet | 1.361 |
| SRQ-7 | LCC-07 | quiet | 1.590 |
| SRQ-7 | LCC-08 | quiet | **2.251** |
| SRQ-8 | LCC-09 | **fire** | **0.428** |
| SRQ-12 | LCC-07 | **fire** | 1.540 |
| SRQ-13 | LCC-15 | quiet | 2.040 |

Firing every `fire` row needs `K <= 0.428`; quieting every `quiet` row needs `K > 2.251`. **The
window is empty by a factor of five.** `K = 2.431` already scores the maximum on both sets —
register probes 55/66 and acceptance constraints 4/6, each the best any `K` achieves. Lowering it
makes the acceptance set *worse*: at 1.540 it is 2/6 and at 0.428 it is 1/6, with 14 of 33 register
`probe_neg` rows wrongly firing at both.

**A premise correction:** the brief said five acceptance rows are `K`-marked. Three are — SRQ-3,
SRQ-7, SRQ-13 — and **all three are negative probes**. That asymmetry is why the trade is one-sided:
there is no `K`-marked row that wants an axis to fire, so every reduction in `K` is pure cost.

**`K` should not move at all, and both acceptance failures are vocabulary rather than threshold.**

The orchestrator's 0.919 and 0.968 are the register's own **`probe_pos`** rows for LCC-09 and
LCC-07, not the SRQ questions. Re-measured after the Space Resources seat found the `kwh` /
"kilowatt hours" gap, the two axes are **one defect, not two**:

| axis | question in the axis's OWN key vocabulary | the probe that fails | the gap |
|---|---|---|---|
| LCC-07 | `kwh` + `lox` + `carbothermal` + `reduction` → **7.786 FIRES** | "kilowatt hours ... oxygen" → **0.968** quiet | key `kwh`, question says "kilowatt hours" |
| LCC-09 | `illumination` + `sunlight` + `Shackleton` + `solar power` → **6.727 FIRES** | "solar power ... lunar south pole" → **0.919** quiet | key `polar`, question says "pole" |

**Both fire far above `K` on their own vocabulary**, and LCC-09's two heaviest keys sum to 4.451,
well over `K = 2.431` — neither axis is intrinsically low-mass. Both probes fail by hitting only the
axis's *lightest* keys. That the two failing masses are 0.968 and 0.919 — nearly equal — is the
signature of a single shared defect.

**A `K` low enough to catch either would be a `K` set to compensate for a vocabulary gap, and it
would loosen all 33 axes to do it.** That is the fix that makes a named question pass and degrades
the instrument everywhere else, and my own §6 says why I would not see the cost: my fixture labels
ask whether the right file is present and never how much wrong file came with it.

**I initially wrote that LCC-09 was "not repairable by addition". That was wrong and this corrects
it** — the axis repairs fine; it is the probe phrasing and the key weighting that fail. One wrinkle
LCC-07 does not have: `pole` also occurs in LCC-09's `probe_neg`, so inserting it raises both sides
(probe_pos 0.919 → 1.930, still short; probe_neg 2.226 → **3.237, fires and regresses**). And LCC-09
carries `solar` (idf 0.491) and `power` (idf 0.428) as keys, which are near-stopwords on a 124-file
lunar shelf — an axis whose subject-bearing keys are its lightest keys is not fixed by one variant.
Both cells are the register seat's to re-cut; **I have not touched `REGISTER.lunar.tsv`.**

### 9.2 SRQ-13 — a third failure mode, and the threshold does not touch it

At the shipped 0.28, SRQ-13 confirms **9 of 9 candidates at `frac 0.85`**. The threshold would have
to exceed 0.85 to silence it, and §4.2's sweep has recall at 0.50 by 0.67. It is neither of my two
known modes: not under-threshold, and not the unreachable-target case of §7 — there is no target,
the expected verdict is `REFUSE`. It is **a question whose vocabulary is fully present in the corpus
while its measurement is absent**, and no scalar bar over token overlap can separate that, because
the instrument only measures vocabulary.

**The Software Engineer's mass-bar proposal, measured and refuted.** A mass floor on top of the
unchanged `frac >= 0.28` is monotonically harmful on my 44-row set: tune 24/28 and holdout 13/16 at
M=0, falling to 21/28 and 12/16 by M=4 — the first value that silences the adversarial pineapple
case — and it never moves SRQ-13 at any value up to 9. The pineapple mechanism is real; it costs
more than it buys and does not address the row that failed.

**I did not move the threshold, so the holdout was not rescored.** It stands at 13/16 against the
incumbent's 11/16, measured once, before any of this.

**What SRQ-13 needs already exists.** It *is* thin patch `T1` and SRQ-14 *is* `T5` — the acceptance
file names them in its own second column — and `oracle/thin_patches.json` carries `trigger_tokens`
and `refusal_code: not-found`. The router is not consulting it. A **count** rule will not work
(T1 fires on SRQ-7 on `regolith` alone, and SRQ-7 passes today); a **mass** rule separates cleanly —
T1 on SRQ-13 is 8.54 and T5 on SRQ-14 is 3.78, against a maximum of 1.86 on the three `LITERATURE`
controls, so any threshold in (1.86, 3.78] works. Two mechanical defects relayed to the SRE:
`boil-off` is hyphenated and can never match `tokenize()`'s output, so T5 does not fire on SRQ-14 as
the artifact stands; and T1's `regolith` and T2's `bearing` are single-token false-fire generators.

SRQ-14 stopped disagreeing between my first and second acceptance runs, by another seat's change and
not by mine; the run went 9 agree / 5 disagree to 10 / 4.

### 9.3 `QUANTITIES.md` — regenerated, and two "pre-existing" failures were phantoms

`node tools/quantities.js --index --write` (the bare `--index` writes nothing). 111 declared blocks
against 113 emitted; my two ids were the whole of the difference.

```
before   FAIL M6 differs from the regenerated index; FAIL M7 declares 111, 113 emitted
         hard failures: 6 @ read-digest 432a7f7b5ae60e63
after    OK M6 the committed index equals the regenerated index
         OK M7 the index declares its own size correctly (113)
         hard failures: 2 @ read-digest c00778498a995796
```

LF verified at byte level: 0 CR, 122 LF, before and after.

**The count went 6 → 2, not 6 → 5, and that is a finding, reported with both values rather than
reconciled.** Two of the five so-called pre-existing failures were artifacts of the stale index
itself, which was the only site still quoting the superseded value:

| id | stale `QUANTITIES.md` | source blocks | after regeneration |
|---|---|---|---|
| `Q-ECR-AXES` | 17 | 18 | agrees at 18, `FAIL M3` cleared |
| `Q-LCC15-DISTINCT-LEAVES` | 58 | 59 | agrees at 59, `FAIL M3` cleared |

Neither was a disagreement between seats; both were the index disagreeing with the documents it
indexes. The two genuinely remaining are `Q-DEGRADED-MODES` (6 against 5, and it now also cites
`oracle/first_run.md:42`, a file that landed this wave) and `Q-REG-TSV-IGNORED` (a `cwd:` with no
character length). **Neither is mine, and I did not touch either.**

```
apparatus, this addendum: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```
