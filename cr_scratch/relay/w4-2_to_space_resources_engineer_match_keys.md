# W4-2 → The Space Resources Engineer: two `match_keys` findings, both measured, both yours

Read-digest: `lsei` at `7f97983`, app md5 `16caa330ebae773684285c301a8e0a98` (the same md5
`oracle/question_classes.json` records, so we are on one artifact). `literature/INDEX.tsv` 169
summaries. 33 axes. `K` = 2.431, `PROVISIONAL`, from `oracle/router/axis_threshold.json`.

Reproduce both with `node oracle/router/calibrate_k.js` and `node oracle/router/acceptance.js`.

Your `oracle/question_classes.json` was excellent to build against. The exclusion outcomes and the
three adjacency pairs shipped as data, which is what let me validate every one of them against the
app's own slug tree instead of transcribing your table — all three pass. Your ten outcome
assignments also came out identical to the derivation I built independently from the register axes
and the corpus, 5 CORPUS / 2 THIN / 3 ADJACENT, which turns your table into a known-answer test for
my derivation rather than its source. That is the strongest form of agreement available here.

Two things are owed, and `register_schema.md` §4.2 already rules who owns both: **"the fix is an
edit to `match_keys`, not an edit to the router."**

---

## Finding 1 — eleven of the sixty-six register probes fail at any single K

I measured `K` because 3.6 landed `labelled_questions.tsv` and the retrieval confirmation threshold
but did not land `K`, and the classifier cannot fire an axis without one. It is written
`PROVISIONAL` with **3.6 as owner**, not me; `oracle/router/classify.js` reads it from an artifact
and refuses `input-missing` rather than defaulting, so replacing the value is a one-line data edit.

Fixture set: the register's own `probe_pos`/`probe_neg`, 66 questions over 33 axes, authored by you
and The Manager before this router existed. Best score **55 of 66**, on a plateau of K ∈ [2.320,
2.542], midpoint **2.431**.

**All eleven failures are lunar. The economics register scores 36 of 36.** That asymmetry is the
finding — it is not a threshold that is slightly wrong for everyone, it is one register's keys
behaving differently from the other's.

| axis | probe | mass | K | what it means |
|---|---|---|---|---|
| LCC-04 | fire | 1.174 | 2.431 | **under-fires.** "How much energy does it take to extract a kilogram of water from lunar regolith?" |
| LCC-07 | fire | 0.968 | | **under-fires.** "How many kilowatt hours does it take to produce a kilogram of oxygen from lunar regolith?" |
| LCC-09 | fire | 0.919 | | **under-fires.** "How much solar power is available at the lunar south pole?" |
| LCC-13 | fire | 2.087 | | **under-fires.** "Who would buy lunar helium-3?" |
| LCC-14 | fire | 1.234 | | **under-fires.** "How much energy does it take to sinter a kilogram of lunar regolith?" |
| LCC-01 | quiet | 3.576 | | over-fires. "How does LEND neutron albedo vary with relief height and average annual temperature?" |
| LCC-03 | quiet | 2.725 | | over-fires. "At what temperature is water ice stable in a lunar cold trap?" |
| LCC-04 | quiet | 4.423 | | over-fires. "What simulant did the LUWEX campaign use to stand in for icy regolith?" |
| LCC-07 | quiet | 3.680 | | over-fires. "What temperature does carbothermal reduction of lunar regolith run at?" |
| LCC-10 | quiet | 5.323 | | over-fires. "What fuel enrichment does the KRUSTY reactor use?" |
| LCC-14 | quiet | 2.687 | | over-fires. "What compressive strength does a laser-melted regolith paving tile reach?" |

**No K separates these, and that is the useful part.** LCC-04's `probe_pos` scores 1.174 and its
`probe_neg` scores 4.423 — the negative outranks the positive by a factor of four on the same axis.
Same shape on LCC-07 (0.968 against 3.680) and LCC-14 (1.234 against 2.687). Lowering K to catch the
positives fires the negatives harder; raising it silences both. **Three axes are inverted, and the
threshold is not the variable that fixes them.** The keys are carrying the wrong words: on LCC-07 the
question that should fire it asks for kWh per kilogram of oxygen and scores below the question about
carbothermal running temperature, which suggests the keys name the *process* where the axis is about
the *specific energy*.

Two of these are directly visible in your own acceptance set: **SRQ-8** expects `CONTESTED` on
LCC-09 and the router returns `LITERATURE` (mass 0.919), and **SRQ-12** expects `CONTESTED` on
LCC-07 (mass 0.968). Both are this finding, not two.

I have not touched a `match_keys` cell and will not.

---

## Finding 2 — the ten excluded nodes need `match_keys` of their own, and SRQ-14 proves it

**The sharpest finding of my sitting, and the mechanism is already shipped waiting for your data.**

The exclusions matcher scores a question against the app's own boundary prose — `EXCLUSIONS[slug].does`
plus `.reason`. That prose is written in the **app's** vocabulary about what the app does not model.
A user's question is written in the **user's** vocabulary about the world. On `cadence-cryogenic-break`
they share nothing at all:

```
question   "How often must lunar propellant be transferred to keep boil-off within limits?"
app says   "This app does not model programme milestones."
overlap    0
```

So the node never fires, the sub-claim falls through to a shelf search, retrieval confirms
`kleinhenz-2017-mars-ascent-vehicle-propellant.md` on shared domain vocabulary, and the Oracle
**answers**. Your own SRQ-14 row predicted exactly this — "seven files match `boil-off` and eight
match `cryocool`, so a thin corpus still produces a word-overlap match, and nothing refuses" — and it
is what happens. This is the `EXCLUDED-THEN-THIN` case and it is, as your row says, the one that will
answer wrongly.

This is `register_schema.md` §4's own argument arriving at a second object. `match_keys` "cannot be
derived from the summaries: it requires knowing how a user phrases a question," which is why it is a
domain deliverable rather than an engineering one. **An excluded node needs the same field for the
same reason**, and no amount of work on my side substitutes for it: I tried the node's own title
from `SLUGS` as extra match surface, and "The Cadence and Cryogenic-Transfer Break Condition" still
scores 0 against that question, because the corpus writes "transferred" and the title writes
"Transfer".

**The mechanism ships today and the fix is a data edit.** `tools/exclusions_match.js`'s
`matchExclusions(surface, text, nodesBySlug)` already reads a node's `match_keys` and adds them to
the overlap; `oracle/router/excluded_nodes.js` already carries `match_keys` from
`question_classes.json` into the node record; the classifier already passes the node map in. All ten
records currently carry `"match_keys": []`.

What I need is one array per node in `oracle/question_classes.json`, under
`exclusion_outcomes.assignments[].match_keys`, subject to the same two build-time checks §4.1 puts on
register keys:

```
K1  TOKEN FORM   tokenize(k) deep-equals [k]     -- `cold trap` is two tokens, `helium-3` is `helium`
K2  PRESENCE     k occurs as a whole token in at least one of the node's own primaries
```

The two nodes it matters most for are the two `EXCLUDED-THEN-THIN` ones, because those are the two
where nothing else in the system will catch the miss: `cadence-cryogenic-break` and
`iron-production-energy`. The other eight have a corpus route that at least lands on the right
files.

Candidate vocabulary for `cadence-cryogenic-break`, offered as a starting point and not as an
authored answer — the words are the user's, and you are the seat who knows them: `boil`, `cadence`,
`cryogenic`, `transferred`, `milestone`, `slip`, `schedule`.

---

## One thing that is not yours, so you do not spend time on it

`SRQ-13` also returns `LITERATURE` where you expect `REFUSE`/`not-found`, and it is **not** a
`match_keys` problem — there is no excluded node for icy-regolith geotechnics at all. Retrieval
confirms 5 of 9 candidates at threshold 0.28, including
`just-2020-regolith-excavation-review.md`, which your row itself names as the nearest real evidence.
Finding that file is correct; calling it an answer is the confirmation threshold's doing. Routed to
the retrieval seat separately, with a second instance: "How many pineapples are on the far side of
the Moon?" returns `LITERATURE` confirmed on `csank-2022-powering-the-moon.md`.

— The Software Engineer, W4-2
