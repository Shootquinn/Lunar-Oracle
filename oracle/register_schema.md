
# The contested-claims register: schema and encoding

**Schema version: 1.** Written against `oracle/answer_contract.md` **version 2**.

Every term below is closed. A value outside a closed set is a failure, not a variant.

## 1. What the register is

**An address space, not a filter.** A register axis names its members by name, so retrieving them is
a read of named leaves: no scoring, no ranking, no threshold, no truncation. It cannot miss and it
cannot truncate, exactly like resolving a scenario label.

The classifier therefore chooses among three retrieval modes rather than two:

1. **app-addressed** — `address.js` resolves or throws.
2. **register-addressed** — an axis fires on `match_keys`; every side resolves or the sub-claim
   refuses.
3. **corpus-searched** — everything else.

The inherited rule stands unamended. It forbids letting an addressed source and a searched source
contest one fact after both have been consulted; adding a second addressed source is inside its
grain. **An encoding that can only be consumed after retrieval has failed this test.**

## 2. One encoding

| | Artifact | Authored | Read by | Consumed |
|---|---|---|---|---|
| Sidecar | `oracle/REGISTER.tsv` | by hand | the classifier | before any retrieval |
| In-file | `## Contested` block in each member summary | generated, never by hand | the misclassification detector | after retrieval, and it can produce no answer |

Nothing else encodes this register. In particular: **no YAML under `literature/_registers/`** — it
splits one required input in two, it needs a parser this project has no dependency slot for, and a
non-`.md` file under `literature/` does not commit under the deny-by-default rule. **No front matter
and no register keys on summaries** — measured, they rewrite retrieval; and a field inside a file can
be edited into disagreement with what it describes and nothing notices (`NAMING.md` §9).

## 3. The sidecar: `oracle/REGISTER.tsv`

Tab-separated. Three row types, distinguished by column 1. Blank lines and lines beginning `#` are
comments. No quoting, no escaping: a field containing a tab or a newline is a failure, not a variant.

**The file is a required input.** Absent, unparseable, or parsing to zero `A` rows is a hard refusal
at startup — the posture `requireNonEmptyCorpus` already establishes. A register that silently parses
to zero disables the invariant while every test passes green.

### 3.1 `H` — one row, the first row

```
H <TAB> basis_root <TAB> basis_date <TAB> basis_ref <TAB> axis_count <TAB> member_count
```

| Column | Content |
|---|---|
| `basis_root` | the corpus root the leaves were authored against, e.g. `lsei/literature` |
| `basis_date` | ISO date |
| `basis_ref` | short ref of that working copy, or `none` |
| `axis_count` | the number of `A` rows in this file |
| `member_count` | the number of `M` rows in this file |

The two counts are the file declaring its own size, so a row lost to a bad splice is detectable by
counting rather than by noticing. The load check compares them to what it parsed and refuses on
disagreement.

`basis_root` and `basis_ref` exist so that a resolution failure is repairable: "authored against
`lsei/literature` at `7f97983`; three leaves no longer resolve" is a report somebody can act on, and
"three leaves no longer resolve" is not.

### 3.2 `A` — one row per axis

```
A <TAB> axis_id <TAB> class <TAB> match_keys <TAB> scope_token <TAB> axis_statement <TAB> app_surface <TAB> probe_pos <TAB> probe_neg
```

**`axis_id`** — matches `^(LCC|ECR)-[0-9]{2}$`. `LCC` is the lunar side, `ECR` the economics side.
**Assigned once, never renamed, never reused.** Run-log `MISCLASSIFIED` rows name axes; a rename
orphans them and a reuse silently rebinds them. An axis shared between the two sides is written once,
under the prefix of the persona who authors it, and is never duplicated under the other.

**`class`** — closed set of three. It determines the verdict, the persona count, and what the answer
must contain.

| Class | What it is | Verdict | Personas | The answer must |
|---|---|---|---|---|
| `two_sided` | two or more sides, same question, incompatible answers | `CONTESTED` | one per side | carry at least one `literature` trace from every side, or refuse |
| `false_pair` | sources that look opposed and are answering different questions, or describing one mechanism under different conditions | `CONTESTED` | one per side | carry every side **and not frame them as a disagreement**: the words `disagree`, `contradict`, `dispute` and their inflections are failures in a `false_pair` answer, `axis_statement` included |
| `one_sided` | one documented side; the other side is an absence, a lineage, or a source not on disk | `LITERATURE` or `BOTH` | 0 or 1, by field | carry the documented side and the one-side disclosure of §7 |

`false_pair` carries its own banned-word list because the register can introduce an error that did
not exist before it: returning two sources *as a dispute* when they answer different questions. A
class that creates a new failure mode states the check for it.

**`match_keys`** — comma-separated tokens, no spaces around the commas. The load-bearing join. §4.

**`scope_token`** — the noun every figure quoted from this axis must name, or `-`. Examples: the
system boundary and scale for a specific-energy axis; the feedstock for a route-transfer axis; the
decomposition and period for a growth-accounting residual; LEO against surface for a landed cost.
When it is not `-`, an answer quoting any figure from this axis without that noun is a failure.

**`axis_statement`** — one sentence naming what the disagreement is about. **Delivered to the user
verbatim.** Never paraphrased at answer time: a paraphrase is a copy, and a copy drifts.

**`app_surface`** — comma-separated app slugs and coefficient symbols, or `-`. The app is never a
side (§5). This column names the app addresses that must print the app's own status or tier string
whenever an `APP` or `BOTH` verdict resolves them. That string is app-stored prose: grade
`resolution-only`, origin `app`, legal under Rule G as it already stands. It is quoted verbatim, not
paraphrased, and if the app carries no status string at a named address the answer refuses
`axis-incomplete`.

**`probe_pos`** — one question, written by the axis's author, that must classify to this axis.

**`probe_neg`** — one question, written by the axis's author, that touches at least one member file
of this axis and must **not** classify to it. Mandatory; there is no empty value. Every summary
carries more than one claim, so such a question always exists, and an author who cannot write one has
found something about the axis rather than about the field.

### 3.3 `M` — one row per member

```
M <TAB> axis_id <TAB> side <TAB> leaf <TAB> position
```

**`side`** — a single uppercase letter, `A` onward. **Side letters are authoring order and carry no
ranking.** Sides are delivered in letter order. Ordering sides by merit is adjudication performed by
presentation order and is forbidden; where the project has an adjudication to deliver, it is an FA
deliverable cited at origin `findings`, not a sort order.

**`leaf`** — the normalized leaf filename, `.md` included. **Not a path.** §6.

**`position`** — one clause: what this source says on this axis. Read by the reviewer auditing the
`class` assignment; a `false_pair` classification cannot be audited without it. **Not delivered to
the user, and not placed in a persona brief** — a persona briefed on one side reads the summaries,
not the register author's gloss, or the briefs stop being independent.

## 4. `match_keys`, the load-bearing join

`match_keys` is the field a classifier tests a sub-claim against **before any retrieval runs**. It
cannot be derived from the summaries: it requires knowing how a user phrases a question. It is
written by the domain persona and it is the reason the register is a domain deliverable rather than
an engineering one.

### 4.1 Two checks, at build time

```
K1  TOKEN FORM
    for each key k on every A row:  tokenize(k) deep-equals [k]
    exit 1 naming the axis, the key, and what tokenize(k) actually returned

K2  PRESENCE
    for each key k on every A row:  k occurs as a whole token in the leaf name or the body
                                    of at least one member of that axis
    exit 1 naming the axis and the key
```

K1 catches multi-word phrases, punctuation and currency: `cold trap` is two tokens, `wt%` is `wt`,
`$/kg` is `kg`, `helium-3` is `helium`, `he-3` is `he`. A multi-word key is not a key, because the
classifier compares against a token set.

K2 catches truncated stems and misfiled vocabulary: a stem like `sublimat` occurs nowhere because
the corpus writes "sublimation"; a coefficient symbol like `kexc` or `derate` is live in the app and
dead in the literature, which means it belongs in `app_surface`.

**Measured on the lunar trigger lists as first written: 31 [Q-REG-KEYS-DEAD] of 110
[Q-REG-KEYS-AS-WRITTEN] distinct keys fail one of these two checks.** A register whose keys are not tokens is a register whose
invariant does nothing while every test passes green.

### 4.2 The third failure mode, which no check reaches

A key can tokenize cleanly, occur in the corpus, and still never appear in a question anybody asks.
No mechanism decides that. `probe_pos` and `probe_neg` are the test that replaces the checker, and
the run log's `MISCLASSIFIED` rows are the feedback loop: a row names a question and an axis, and the
fix is **an edit to `match_keys`, not an edit to the router.**

### 4.3 The firing rule, and the constant that is deliberately not set here

An axis fires when the IDF-weighted mass of its `match_keys` present in the question's tokens meets a
threshold **K**, where IDF is the corpus's own document-frequency table. Mass, not fraction: one rare
key should fire alone and two corpus-ubiquitous keys should not fire together.

**K is not set in this file.** It is set at sub-step 3.6, against the merged corpus, using the
`probe_pos` and `probe_neg` questions as the labelled fixture set. A threshold tuned on a
single-field 156-file corpus has no standing at the merged size, and stating a number here would
repeat that error inside the document correcting it. Until 3.6 sets it, K is an unset parameter with
a named owner and a named sub-step, which is a different thing from a missing decision.

### 4.4 The join is content-shaped and the members are addresses

**The register is never searched by file, in either direction.** `match_keys` matches the words of a
claim against the words of a question; neither side is a container. `leaf` is the address the join
resolves to. A join keyed on "is this file on the register" is a container-shaped join over
content-shaped claims: a summary carries many claims and sits on the register for one of them, so
such a join makes every claim in that file unanswerable. **Fifty-three files [Q-REG-BLOCK-CARRIERS] —
about a third of the pre-merge lunar corpus — carry a block**, which is the blast radius of a
file-keyed rule.

## 5. Sides are `literature` only

**A side resolves into `literature/`. Never into `findings/`, and never into the app.**

**Not `findings/`.** A prior adjudication of this project entered as a party to the disagreement it
adjudicates is the Oracle arguing with itself under two names. A findings entry may name an axis, and
may be cited beside one in the same answer; it may not be a side of one and never satisfies a side.

**Not the app.** Where the app and a shelf candidate compete for one fact the app wins outright, so
an app-versus-corpus axis is not a contested claim in the literature. Six lunar axes
[Q-LCC-APP-SIDED] were drafted with the app as side A; each keeps everything it was for by moving the
app into `app_surface`, and two of them (a documented body of work against an app constant nothing
measures) become class `one_sided`, which is what they always were.

## 6. Surviving the merge: the key is the leaf

Rows are authored against pre-merge paths, deliberately, so that the Oracle can be made not to answer
one-sidedly before it can be made to answer. The schema absorbs the move.

1. **The member key is the normalized leaf, never a path.** The taxonomy is the volatile half. A leaf
   key is indifferent to it.
2. **Leaf uniqueness is already asserted.** `NAMING.md` assertion A1 requires that no two files in a
   shelf tokenize identically; identical leaves tokenize identically, so A1 entails leaf distinctness.
   This schema adds no check and reuses that one.
3. **The path is derived at load time** from the index `listCorpusFiles()` already produces. A leaf
   absent from the index is the `axis-incomplete` refusal, never a fall-through to search.
4. **`normalize()` renames are repaired by running `normalize()` over the `leaf` column**, one
   command over one file, not by re-authoring rows.
5. **`basis_root` and `basis_ref` on the `H` row** make a stale reference a repairable report rather
   than an anonymous failure.

Measured before the merge has run: **one [Q-LCC-MEMBER-UNRESOLVED] of the 67 [Q-LCC-MEMBER-REFS]
lunar member references resolves to no leaf** — a superseded duplicate that has already left the
namespace. The rest resolve. The
register rots before it is written, which is why resolution is a load check and not a review item.

## 7. What the answer carries

Against `oracle/answer_contract.md` version 2.

- **`two_sided`** — verdict `CONTESTED`; one persona per side, parallel, each briefed on one side
  only and on no other; at least one `literature` trace from every side, or the answer refuses; the
  `axis_statement` verbatim; no adjudication. A `findings` trace may appear and never counts as a
  side.
- **`false_pair`** — as `two_sided`, and the banned-word list of §3.2 applies to the whole answer.
- **`one_sided`** — verdict `LITERATURE` or `BOTH`; the documented side; and the disclosure below.

**The one-side disclosure.** Fixed text, verbatim, once per answer on a `one_sided` axis. It names no
source and asserts nothing about the world, so it is not claim-bearing and carries no trace:

```
LIMIT: this axis is registered with one side. The register records no source in this corpus on the other side. An absence in a corpus is a property of the corpus, not a finding about the world; only an acquisition decision closes it.
```

**This text is a request, not a ratification.** The prohibition's §9 is a closed list of fixed lines
and extending it is not a persona's to do; The Editor or the author ratifies it, on the same footing
as the `findings` limit line requested at 1.3 F3. If it is refused, `one_sided` still functions — the
axis is named, the single side is delivered, and no second side is fabricated — and the reader loses
the sentence explaining why only one side appeared.

Where an axis's absence needs to be stated *specifically* rather than generically, that is an
assertion about the corpus with an author and a derivation, which is an FA deliverable cited at
origin `findings`. That is the honest price of asserting an absence, and it is per axis and optional.

## 8. The in-file block

```
## Contested
- LCC-01 A
- LCC-04 B
```

**Grammar:** the literal heading `## Contested`, then one line per membership, `- <axis_id> <side>`.
Nothing else on the line: no bold, no backticks, no paths, no prose, no keys. Generated from
`oracle/REGISTER.tsv`, refreshed by `verify_corpus.js`, never hand-written.

**Its only consumer is the misclassification detector**, which runs after retrieval and can produce
no answer. It does not fetch a counterpart, does not compose, and has exactly two outputs: a refusal,
and a `MISCLASSIFIED` run-log row naming the question and the axis. A mechanism with no ability to
combine cannot become a reconciliation, which is a property of its outputs rather than a promise
about its use.

**The detector's condition** is the `match_keys` join at its weakest setting: a returned file whose
block names an axis, **and** a nonzero `match_keys` overlap between the question and that axis. Not
"the file is on the register." The band between this and the classifier's threshold K is the
classifier's admitted uncertainty, and it is the whole content of the check.

### 8.1 The retrieval layer excises the block

**The rebuilt retrieval layer removes the region from the line `## Contested` to the next `^## ` or
end of file before tokenizing, in both `corpusDocFrequency()` and `confirmInText()`.** This is a
requirement on the retrieval layer, not a convention.

Measured, against `lsei/literature/` with blocks injected:

| Block contents | mean idf loss on live keys | confirmations gained | best file changed |
|---|---|---|---|
| axis prose + `match_keys` + partner paths | 7.73% [Q-REG-IDF-LOSS-FULL] | 14 [Q-REG-FLIPS-FULL] | 6 of 15 |
| partner paths only | lower, and not zero — same measurement, see [Q-REG-IDF-LOSS-FULL] | 9 [Q-REG-FLIPS-MIN] | 3 of 15 |
| id and side only | none | 0 [Q-REG-FLIPS-ID] | 0 of 15 |

A register that publishes `match_keys` into member bodies makes those files confirm against the
question by supplying the question's own words — the exact shape `confirmInText()` exists to refuse.
Partner paths do it too, because a filename in this corpus is a bag of topic words. And even the
minimal block leaks through its heading: `contested` is an English word, and a question carrying it
resolves to a different best file once every member summary [Q-REG-BLOCK-CARRIERS] contains the
heading [Q-REG-HEADING-LEAK].

The excision is the guarantee. The minimal field set is what makes forgetting the excision survivable
instead of catastrophic.

## 9. Assertions

`L` runs at load time, in the loop. `B` runs at build time, in CI and at the merge. A failing `L`
assertion is a startup refusal; a failing `B` assertion exits non-zero and the merge leaves no
partial corpus.

```
L1  PRESENT AND NON-EMPTY
    oracle/REGISTER.tsv exists, parses, and yields at least one A row
    refuse at startup, naming the file

L2  SELF-DECLARED SIZE
    parsed A rows == H.axis_count  and  parsed M rows == H.member_count

L3  ARITY
    every row has the column count its type requires; no field contains a tab or a newline

L4  RESOLUTION
    every M.leaf resolves in the leaf index built from listCorpusFiles()
    a failure is refusal code axis-incomplete for that axis; never a fall-through to search
    the message names H.basis_root and H.basis_ref

L5  SIDE ARITY BY CLASS
    class two_sided or false_pair: at least two distinct M.side values
    class one_sided:               exactly one distinct M.side value

B1  ID FORM AND UNIQUENESS
    axis_id matches ^(LCC|ECR)-[0-9]{2}$ ; no two A rows share one; every M.axis_id has an A row

B2  CLOSED SETS
    class is one of three; M.side is one uppercase letter

B3  KEY FORM AND PRESENCE
    K1 and K2 of section 4.1, for every key on every A row

B4  BLOCK ROUND-TRIP
    for every summary: the set of (axis_id, side) pairs in its ## Contested block equals the set
    of M rows naming its leaf -- in both directions, so a member that lost its row fails too

B5  MANDATORY FIELDS
    axis_statement, probe_pos and probe_neg are non-empty on every A row
    position is non-empty on every M row
    scope_token and app_surface are non-empty or the literal "-"

B6  CLUSTER COMPLETENESS
    where a member leaf belongs to a near-duplicate filename cluster, every member of that cluster
    appears on the axis, or the axis names the omission in position
    -- otherwise the invariant is satisfiable by returning a file that does not carry the claim

B7  SHARED-MEMBER REPORT                                    (reports; does not fail)
    list every pair of axes sharing two or more member leaves
    sharing members is legitimate; an accidental duplicate axis is not, and only a person can tell
```

## 10. What this schema does not do

It states a shape and closes vocabularies. It builds nothing. It does not make an answer right: it
moves a claim from the searched side to the addressed side so that a question touching a known
disagreement retrieves every side deterministically. It knows nothing of disagreements nobody has
registered, and its classifier can miss one it does know about — which is what §8's detector and the
`MISCLASSIFIED` row exist for, and their entire output is a refusal and a defect report. Nothing here
verifies that a member file supports the sentence beside it. That gap closes by a person's sampling
read or it does not close.

