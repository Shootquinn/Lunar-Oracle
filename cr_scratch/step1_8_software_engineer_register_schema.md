# Step 1.8, The Software Engineer: the contested-claims register schema and its single encoding

**Persona:** The Software Engineer
**Sub-step:** 1.8 (origin LOOP-2), Group 2, depends on 1.3 and 1.7
**Deliverable:** the block in §2, liftable verbatim to `oracle/register_schema.md`
**Reasoning:** §1. **Quantity blocks:** §3. **Findings and requirements placed elsewhere:** §4.

**What I opened.** The three briefs, my own 0.2 §3 and §8 and my own frozen 1.3 contract, The
Engineer's 1.7 spec and its addendum, the counting-rule spec at lines 177–423 of 1.12, The Systems
Engineer's 1.1 `.gitignore` block, and `lsei/oracle/lib/literature_search.js` in full. **I opened
one corpus summary**, `lsei/literature/lunar-ice-and-geology/colaprete-2010-lcross-water.md`, to
settle one question the schema could not settle structurally: whether summaries carry YAML front
matter that an encoding could extend. They do not — they open with an H1 and a `## Citation` block —
so "front matter" in this project means a new construct, not an existing one. That changed the
argument in §1.3.

I did not load the corpus. I ran measurements **over** it without reading it, which is a different
thing and is the only way the encoding question can be settled at all.

---

## 1. Reasoning

### 1.1 The encoding question is empirical, and it had been argued as a preference

Three drafts proposed three encodings and each argued from a property it valued: The Engineer valued
in-band redundancy, The Space Resources Engineer valued one readable file, the economics side valued
membership travelling with the summary. Nobody measured what any of them does to the retrieval layer
that has to live with it.

The retrieval layer is not neutral about this. `corpusDocFrequency()` builds its document-frequency
table from **file bodies**, and `confirmInText()` decides whether a candidate is confirmed by
testing whether the question's remaining tokens **occur in the body**. Both proposals that put
register content inside summaries write text into exactly the bytes those two functions read.

So I built the three encodings against a copy of `lsei/literature/` and measured them. The harness is
committed at `tools/probe_register_encoding.js` and the three runs reproduce.

| Encoding | mean idf loss on live match_keys | confirmations gained | confirmations lost | best file changed |
|---|---|---|---|---|
| rich in-file block (axis prose + `match_keys` + partner paths) | 7.73% [Q-REG-IDF-LOSS-FULL] | 14 [Q-REG-FLIPS-FULL] | 1 | 6 of 15 |
| minimal in-file block (partner paths, no keys, no prose) | 2.75% | 9 [Q-REG-FLIPS-MIN] | 0 | 3 of 15 |
| id-and-side block (`- LCC-01 A`) | 0.00% | 0 [Q-REG-FLIPS-ID] | 0 | 0 of 15 |

**Read the 14 first.** Fourteen files became confirmed against a question they had failed to confirm
against before, and several went to `frac 1.000` — a perfect full-text confirmation. They did not
become more relevant. The register wrote the question's own words into them. `confirmInText()` exists
to refuse "a plausible filename with nothing in the body to back it," and a register that publishes
`match_keys` into member bodies supplies the backing without supplying the content. It is a
fabrication vector, and it is built by the mechanism whose entire purpose is to stop confident
one-sided answers.

**Then read the 9.** The minimal block carries no keys and no prose — only the partner paths — and it
still flips nine confirmations. Partner paths are filenames, and this corpus's filenames are
author-year-topic by convention, so a path is a bag of topic words. `poston-2020-krusty-reactor-design.md`
injects `krusty`, `reactor`, `design`. **A cross-reference is topic text.** That kills the path-carrying
block on measurement rather than on taste.

**Then read the last line of the run, which is the one that changes the ruling.** Even the
id-and-side block, which measures zero on every axis probe, changes the answer to a question
carrying the word *contested*:

```
heading probe BASE  best = isru-processing/barnett-2025-regolith-consolidation-water-ice.md   idf("contested") = 3.7441
heading probe ID    best = lunar-ice-and-geology/cannon-2020-lunar-ice-geologic-model.md      idf("contested") = 1.0874
```

The block's own **heading** is an English word, 53 of 152 files now carry it, and a user who asks
"what is contested about the ice grade at Cabeus" gets a different file. There is no field set that
makes an in-file block retrieval-safe, because the block has to be findable by a machine and anything
findable by a machine is findable by the tokenizer.

**So the ruling has two halves and the second is the load-bearing one.** The field set is minimized
(id and side, nothing else), *and* the rebuilt retrieval layer excises the block from both
`corpusDocFrequency()` and `confirmInText()` before tokenizing. The excision is the guarantee. The
minimal field set is what makes forgetting the excision survivable rather than catastrophic: without
the excision, the id-and-side block costs three tokens nobody queries plus one heading word, and the
rich block silently rewrites retrieval. Defence in depth, with both layers measured rather than
asserted.

That is also why I am not simply deleting the in-file block. It has one job, §1.5 says what, and it
is small enough to do that job without a second authority forming.

### 1.2 The consolidation, ruled

**One sidecar: `oracle/REGISTER.tsv`.** One file, tab-separated, three row types, hand-maintained,
the single source of truth. It is the classifier's input and it is loaded at startup, before
anything is retrieved.

**One in-file block: `## Contested`, carrying `- <axis_id> <side>` and nothing else.** Generated from
the sidecar, never hand-written, refreshed by `verify_corpus.js`, round-trip asserted at 2.15.

**Two encodings die, and each dies of something specific.**

`literature/_registers/*.yaml` (The Space Resources Engineer's SR-2, the economics side's GE-2) dies
of three things, in ascending order of how much I trust them. It splits one required input into two
files, and §3.6 of my 0.2 made the register a hard-refusal input precisely so it could not be half
loaded — two files reintroduce the half-load. It needs a YAML parser, and Node has none built in, so
it converts a data format into a dependency in a project whose bootstrap contract has no slot for one
and whose author has just ruled a dependency *out* at C4. And, measured this session, **a `.tsv` or
`.yaml` under `literature/` does not commit**: the 1.1 `.gitignore` is deny-by-default under
`literature/` and re-admits `*.md` only, so the register would be absent on every fresh clone, which
under my own §3.6 is a hard refusal at startup. `oracle/REGISTER.tsv` commits. [Q-REG-TSV-IGNORED]

Per-file front matter dies of the 14 flips above, and of a second argument that is not mine: The
Engineer ruled at 1.7 §9 that a front-matter field "can be edited into disagreement with the folder
it sits in and nothing would notice," and refused to put the field label in the file for that reason.
The same reasoning applies unchanged one field over. I am using his own ruling to refuse an encoding
his colleagues asked him for, which is the right kind of consistency.

**Where the sidecar lives, and why it is not under `literature/`.** The Engineer put it at
`literature/REGISTER.tsv`, beside what it describes. It goes to `oracle/` instead. Four reasons: it
does not commit under `literature/` (measured above), and relying on somebody remembering to
re-admit an extension is the class of fix that never reaches a fresh clone; `oracle/` is where the
mechanism that reads it lives and the register is a loop input, not corpus; NAMING.md governs
`literature/` under two namespaces and this file is neither, so putting it there makes it the first
file in that tree governed by no naming rule; and no lever in NAMING.md §6 could ever confuse it
with a summary. The cost is real and I name it: a person browsing `literature/` no longer sees the
register. The `## Contested` blocks are what they see instead, which is the block earning half its
keep.

### 1.3 `match_keys` is the join, and it is content-shaped — but the register's *members* are not

The orchestrator asks whether `match_keys` is a container-shaped join over content-shaped claims,
which is this project's recurring defect. The answer is in two parts and the second part is a real
defect that is mine.

**`match_keys` itself is content-shaped and is the right join.** It matches the words of a claim
against the words of a question. Neither side is a container. This is the one join in the design that
is not looking for a file.

**But the `misclassified` refusal I wrote at 0.2 §3.7 *is* container-shaped, and it is broken.** As
frozen in contract §5 it fires when "a searched retrieval returned a file that appears on the
register." A file is not a claim. `sanders-2025-nasa-isru-progress-review.md` sits on four of the
fifteen lunar axes and carries dozens of claims that sit on none of them. Under the rule as written,
every question that retrieves it — for excavation rates, for TRL levels, for anything — refuses,
because the file is on the register. **Fifty-three of one hundred fifty-two files carry a block**
[Q-REG-BLOCK-CARRIERS], so a third of the corpus becomes radioactive for all of its content. That is
the container/content failure, instance five, and it is in my own text.

**The fix is that the detector uses the same join as the classifier, at its weakest setting.** Not
"is this file on the register" but "is this file on an axis whose `match_keys` this question touched
at all." Classification fires an axis at its stated firing rule; the detector fires on any nonzero
`match_keys` overlap with an axis the returned file belongs to. Between the two thresholds is the
classifier's admitted uncertainty, and that band is the whole content of the check.

This does not reopen classification-before-retrieval, and the argument is the same structural one I
made at 0.2 §3.7. The detector combines three things it already holds — the question, the register,
and a filename retrieval has returned. It issues no second retrieval, fetches no counterpart, and
composes nothing. Its only two outputs remain a refusal and a log row. A mechanism with no ability to
combine cannot become a reconciliation, and that is a property of its outputs rather than a promise
about its use.

**The general statement, since this project keeps meeting the same defect in new clothes:** a
container-shaped *join* is the failure; a container-shaped *address* is exactly right. `match_keys`
is the join and it is content. `members[].leaf` is the address the join resolves to, and an address
space is made of addresses. The rule to carry forward is that the register is never *searched by
file*, in either direction.

### 1.4 The load-bearing field arrived dead, and I can now say by how much

At 0.2 §8.1 I predicted the failure this way: "the registers arrive with excellent `axis_statement`
fields and `match_keys` that never fire, and every register test passes while the invariant does
nothing." I can now put a number on it instead of worrying about it.

Taking the fifteen lunar `trigger` lists exactly as written — punctuation, currency and phrases
included, because cleaning them first would measure the cleaning — **31 of 110 distinct keys can
never fire** [Q-REG-KEYS-DEAD]. Two failure modes, and neither is visible by reading the register:

- **28 keys the tokenizer splits or mangles.** `cold trap` becomes two tokens; `wt%` becomes `wt`;
  `$/kg` becomes `kg`; `helium-3` becomes `helium`; `he-3` becomes `he`; `d-3he` becomes `3he`.
  A multi-word key is not a key, because the classifier compares against a token set.
- **3 keys that tokenize cleanly and occur nowhere.** `sublimat` is a truncated stem and no body or
  filename contains that token — the corpus writes "sublimation". `derate` and `kexc` are app
  coefficient vocabulary; they are live in the app and dead in the literature, which means they were
  filed in the wrong column and belong in `app_surface`.

Both are catchable, cheaply, at authoring time. Two checks, K1 and K2 in the spec, and they are in
the spec rather than in a note because a register that says its keys must be tokens and does not
assert it is a register whose keys are not tokens.

**What no check can catch is the third failure mode**, and this is the irreducible domain judgement I
named at 0.2. A key can tokenize cleanly, occur in the corpus, and still never appear in a question
anybody asks. Nothing mechanical decides that, and pretending otherwise would be the epistemic
theater this project bans.

So the field gets a test instead of a checker. **Every axis carries `probe_pos` and `probe_neg`: one
question the author asserts must classify to this axis, and one question that touches at least one of
its member files and must not.** That is TDD applied to a data structure, written by the person who
has the phrasing knowledge, at the moment they have it. It buys three things, each with a named
consumer: 3.6 gets the labelled fixture set it exists to produce, and can tune the firing threshold
against real data rather than against a constant inherited from a 156-file single-field corpus; 1.11
gets thirty-two positive and thirty-two negative fixtures it would otherwise have to invent; and
`probe_neg` is the container/content defence of §1.3 made non-optional, because writing it forces the
author to state a question about a member file that is *not* about this axis.

`probe_neg` is mandatory with no empty value. Every summary carries more than one claim, so a
question about a member that is not about the axis always exists, and an author who cannot write one
has discovered something about the axis rather than about the field.

### 1.5 The three encodings had three purposes; each keeps exactly one

Ratifying one encoding is not enough if the three purposes silently collapse into it. They do not.

**The sidecar is consumed at classification time and never after.** It is the address space. It is
read once at startup, it is a required input, and missing, unparseable, or parsing to zero rows is a
hard refusal in the posture `requireNonEmptyCorpus` already establishes.

**The in-file block is consumed only after retrieval, and only by the detector.** This is the
correction to The Engineer's argument, and it is the one place where his design and my ruling
genuinely collide, so I am stating both rather than averaging them.

His argument at 0.2 was: "retrieval reaches a file, not a register… If the pairing is only in a
sidecar, the loop has to *decide* to consult it, and a register consulted after retrieval is a
reconciliation." He asked me at 0.3 to confirm that the loop reads the block *before* it composes an
answer rather than after, "since if it reads it after, the in-file block has bought nothing."

**It reads it after, and it has not bought nothing — it has bought something different from what he
designed it for.** Reading a block that arrives with a retrieval hit is by construction post-retrieval,
which is the shape the inherited rule forbids for *answering*. So the block cannot be the consumption
path; the sidecar is, and it is consulted before any retrieval runs. What the block buys is the
detector: the one check that catches the classifier having been wrong, in the file that proves it,
with no I/O and no lookup. His mechanism is right and his placement of it in the loop is not. He also
gets the thing he actually wanted — the pairing surviving as structure, findable from either member —
because the block plus the round-trip assertion at 2.15 means a member that loses its register row
fails a check rather than falling silent.

**And because the block never feeds an answer, it needs none of the fields that made it dangerous.**
The partner path was in his design so retrieval could reach the second member with zero extra I/O.
The detector never reaches the second member; it refuses. So the field goes, and with it nine of the
confirmation flips. The design got safer by having its purpose narrowed, which is usually the sign
that the narrowing was correct.

**The out-of-band grep path he listed third is dead and should be recorded as dead.** His argument
was that `idf("ip")` is near-maximal so the id token is the strongest signal the existing mechanism
can carry. Measured: injecting the ids drops `idf("lcc")` from 5.1304 to 1.1415. The signal is
strong exactly until you use it, because using it is what makes the token common. It does not matter,
because the register is not searched — but it is worth recording that the argument was
self-defeating, since it is the kind of argument that will be made again.

### 1.6 Constraint (a) confirmed, and the app case is new evidence for the same rule

I set the constraint at 1.3 §3.1: register axis members are `literature` origin only, an FA
deliverable may name an axis and be cited beside one but may not be a side of one. I was asked to
confirm or overturn it.

**Confirmed, and the reasoning I gave holds unchanged.** A prior adjudication of this project entered
as a party to the disagreement it adjudicates is the Oracle arguing with itself under two names.
Nothing in the two row sets needs an FA deliverable as a side.

**What I did not anticipate is that the same rule excludes the app, and that this bites six times.**
Six of the fifteen lunar axes carry the app as a labelled side [Q-LCC-APP-SIDED]: LCC-04, LCC-05,
LCC-10, LCC-11, LCC-14, LCC-15. An axis with an app side is not a contested claim in the literature.
It is the app-versus-corpus authority contest, which the inherited rule settles in the app's favour
outright, and my own contract §1 already says so: where the app and a shelf candidate compete for the
same fact, the app wins and the shelf figure is never folded in.

So the ruling generalizes: **an axis side never resolves to the app, and never to the findings shelf.
Sides are `literature`, or they are not sides.**

The cost of that is nothing, because The Space Resources Engineer had already built the mechanism
that replaces it and had not noticed. Nearly every one of his entries carries an `app_surface` list
of slugs and coefficient symbols. The app is not a *side*; it is an `app_surface` entry, and the
disclosure his rows demand is a disclosure attached to an app address rather than a position in a
literature dispute. Six axes lose their side A and keep everything they were for. Two of them
(LCC-05, LCC-14) drop to a single literature side and become class `one_sided`, which is the honest
description of what they always were: a documented body of work against an app constant nothing
measures.

**And the delivered disclosure is the app's own status string, quoted verbatim.** That is not my
invention either — it is LCC-14's own rule, which says to return the section's tier string verbatim
"because the app has already done this work and a paraphrase would be a copy that drifts." Applied
generally it costs nothing: the string is app-stored prose, which Rule G already legalizes at
`resolution-only` with origin `app`. No fourth grade, no fifth origin, no new machinery, and no
persona prose reaching the user through a machine path. `app_surface`'s job shrinks to naming *which*
app addresses must print their status string, which is a list of addresses — the right shape for an
address space.

### 1.7 Constraint (c): the schema survives the merge because the key is the leaf, not the path

The rows are authored at 1.9 and 1.10 against pre-merge paths and the merge will move every one of
them. That was The Space Resources Engineer's own mitigation and it was correct — a register that
waits for the merge means the Oracle can be made to answer before it can be made not to answer
one-sidedly — so the schema has to absorb the change rather than resist it.

**The member key is the normalized leaf filename, not the path.** Three properties make that work,
and two of them are somebody else's assertions rather than new mechanism:

1. **The folder is the volatile half and the leaf is not.** The merge re-taxonomizes; NAMING.md §1
   changes 9 of 185 leaf names and leaves 176 alone. A key that names only the leaf is indifferent
   to the taxonomy, and the nine renames are repaired by running `normalize()` over one column of
   one file rather than by re-authoring rows.
2. **Leaf uniqueness is already asserted, by The Engineer, for a different reason.** NAMING.md
   assertion A1 requires that no two files in a shelf produce the same sorted `filenameTokens()`
   output. Identical leaves produce identical tokens, so A1 entails leaf distinctness. I add no
   check; I reuse his.
3. **The path is derived, not stored.** `listCorpusFiles()` already returns the relative path, so a
   leaf-to-path index costs one walk the loop performs anyway, and a leaf that does not appear in it
   is the `axis-incomplete` refusal the contract already carries.

Measured, and this is why the field matters rather than being tidy: **66 of the 67 member references
in the fifteen lunar axes resolve by leaf against `lsei/literature/` today, and one does not.**
[Q-LCC-MEMBER-REFS, Q-LCC-MEMBER-UNRESOLVED] `metzger-2021-aqua-factorem-2.md` on LCC-06 resolves to
nothing, because it is a superseded duplicate and now sits in `_intake/superseded-duplicates/`. The
register has begun rotting before it has been written. One dead reference in a hand-built fixture is
the whole argument for making resolution a load-time check rather than a review item.

The economics side is worse and it is worse in a way 1.10 has to be told before it authors. **Of 36
distinct source references in the seventeen economics rows, 18 are full leaf names that resolve
exactly and 18 are abbreviated author-year handles that match no filename** [Q-ECON-REFS-ABBREV] —
`aoki-2009`, `henderson-2008`, `wade-2018`, `kiyota-2013`, `may-1977`. They are perfectly clear to a
reader and they are not addresses. Under this schema they must be authored as full normalized leaves.

**One field records the basis rather than pretending there isn't one.** A single header row names the
root the leaves were authored against, the date, and the working-copy ref. Its consumer is the
load-time check's error message: "authored against `lsei/literature/` at `7f97983`; three leaves no
longer resolve" is a repairable report, and "three leaves no longer resolve" is not. This is the same
discipline the counting rule's `at` field imposes, applied to a register instead of to a number.

### 1.8 Consolidating the vocabulary: seventeen closed terms become three and a slot

The three drafts brought three overlapping enumerations for what is, mechanically, one decision about
what the answer must contain.

| Draft | Field | Values |
|---|---|---|
| Space Resources | `kind` | CONTESTED, INCOMMENSURABLE, SUPERSEDED, ASYMMETRIC, UNCONSTRAINED |
| Space Resources | `rule` | RETURN_ALL_SIDES, RETURN_WITH_SCOPE_NOTE, PREFER_AND_NAME, REFUSE_ONE_SIDE |
| economics | `lean` | A, B, neither, not_opposed, dependent |
| economics | `class` | two_sided, false_pair, one_sided |

Seventeen closed terms across four fields, and the simplicity gate says name the consumer of each.

**`class` survives, with the economics side's three values.** Consumer: the verdict, the persona
count, and what the answer must contain. It is the only one of the four that changes what the machine
does in a way no other field determines.

**`rule` is cut.** Three of its four values are entailed by `class`: RETURN_ALL_SIDES is what
`two_sided` means, REFUSE_ONE_SIDE is what `two_sided` and `one_sided` mean at the point of failure.
The fourth, RETURN_WITH_SCOPE_NOTE, is not a value of the same field at all — it is orthogonal, since
an axis can be two-sided *and* require a boundary named (LCC-04, LCC-07, LCC-09, LCC-11). So it
becomes `scope_token`, a string naming the noun every quoted figure must carry, with `-` for the
axes that need none. One field with a natural empty value replaces a four-value enum that half
duplicated another field.

**PREFER_AND_NAME is refused outright, and this is where a domain requirement and my frozen contract
cannot both be satisfied.** The Space Resources Engineer wants LCC-06 delivered with the
better-evidenced side first. My contract §1 says `CONTESTED` delivers "both sides, the axis named, no
adjudication." Ordering by merit *is* adjudication — it is arbitration performed by presentation
order, done by the router, invisibly, which is the operation the register exists to prevent. I rule
against him.

**What it costs, named.** He loses the ability to make the Oracle lead with the stronger side. What
he does not lose is the thing LCC-06 is actually for: the 98.3 percent power-reduction figure never
appearing without the ice-morphology premise and the plastic-analogue disclosure. That is a
co-occurrence requirement, not an ordering, and it is exactly `scope_token`. Sides are delivered in
side-letter order, and side letters are authoring order and carry no ranking — stated in the spec so
that nobody later reads A as "the better one."

**`kind` is cut as a stored field and kept as an authoring instruction.** Its five values do not
change what the machine does; each maps into `class` plus `scope_token`. The mapping is in the spec,
with the discriminating test for the one genuinely ambiguous case, INCOMMENSURABLE: *if a single
question can be correctly answered from one side alone, the sides are a false pair; if every
single-side answer to the question the axis names is wrong, they are two-sided.* That test is
operational, and it is the judgement 1.9 makes per row.

**`lean` is cut, and this one is the cleanest cut of the four.** `CONTESTED` delivers no
adjudication, so nothing reads `FAVOURS_A`, `OPEN`, `A`, `B` or `neither` — a field nobody reads is
ceremony by my own gate. Its two load-bearing values are not leans at all: `not_opposed` is
`class: false_pair`, and `dependent` is a `scope_token` naming the decomposition. The judgement is
not lost — it stays as prose in `axis_statement`, where a person maintaining the register reads it.
And where the project wants its adjudication *delivered*, that is an FA deliverable, cited at origin
`findings`, which is constraint (a) arriving from the other side: findings may name an axis, and may
now be cited beside one, and still may not be a side of one.

Seventeen terms to three plus a slot. That is the consolidation's actual payload, and it is more of
the work than picking a file format was.

### 1.9 Four amendments to my own frozen contract, and the version field earning its keep early

Three of these are defects this sub-step found in `oracle/answer_contract.md` version 1. The fourth
is the §1.3 fix. I am stating them as amendments rather than shipping a schema that quietly
contradicts a frozen artifact.

**V1. `CONTESTED` cannot buy two personas, because most axes have more than two sides.** Measured:
**10 of the 15 lunar axes carry more than two labelled sides** [Q-LCC-SIDES-GT2], and after the app
sides are removed per §1.6, eight still do. The contract says "2, parallel, each briefed on one side
only." Truncating to two would be the router silently choosing which sides the user hears, which is
the one-sidedness the register exists to prevent. **One persona per side, minimum two, no cap.** The
cost control is authoring, not a cap: a domain persona who writes a six-sided axis is buying six
personas on every question that touches it, and will not do it twice.

**V2. A `one_sided` axis cannot produce a `CONTESTED` verdict.** Rule V requires "at least two
`literature`, one per side," and a one-sided axis has one side, so the run would be unsatisfiable
rather than wrong. The verdict condition gains a clause: `CONTESTED` fires on an axis of class
`two_sided` or `false_pair`. A `one_sided` axis produces `LITERATURE` or `BOTH`, carrying its side
and a fixed disclosure that the axis is registered with one side.

**V3. Rule V's `CONTESTED` row moves `findings` from Forbidden to permitted-and-never-counted.** I
wrote the original blanket ban and it is too strong. Forbidding a `findings` trace from appearing at
all on a contested answer means this project's own adjudication can never be shown beside the contest
it adjudicates — which is the place it is most useful and, under the `findings` limit line, the place
it is most clearly labelled as the project's own view rather than a source's. The requirement is
unchanged: at least one `literature` trace per side, and a `findings` trace never satisfies a side.
Constraint (a) is intact; what changes is that naming an axis is now something a findings entry can
do in an answer, not only in a document.

**V4. The `misclassified` reason code's condition is container-shaped and is replaced**, per §1.3.
Its owner is unchanged and is still `match_keys`, which is the point.

**Contract version 1 becomes version 2**, per its own §9: any change to any closed set, rule, or
fixed text increments it.

**And the version field has now earned its keep for the first time, before any code exists.** I
argued at 1.3 that it ships only if three things read it, and the third — the acceptance suite
asserting that the version it was written against equals the version in the contract — is the one
that catches a session editing the contract without touching the suite. 1.11 is running in this same
group, in parallel, writing that suite. If nobody tells it, it asserts 1 against a contract that says
2 and fails on its first run. That is the mechanism working exactly as designed, and the orchestrator
should let it work rather than papering over it: **1.11 must be handed the version-2 amendment list**,
and if it is not, the failure it produces is the correct failure and the right response is to fix the
suite, not the assertion.

### 1.10 The simplicity gate, run field by field

Every field, its consumer, and what happens if the consumer disappears. A field with no row here does
not exist.

| Field | Read by | If that consumer goes |
|---|---|---|
| `axis_id` | the classifier's fired-axis set; the `MISCLASSIFIED` log row; the in-file block; the round-trip check | the log names nothing and the feedback loop dies |
| `class` | the verdict, the persona count, the required contents of the answer | cut |
| `match_keys` | the classifier (firing) and the detector (weakest overlap) | the invariant does nothing |
| `scope_token` | the answer composer, which requires every quoted figure to name it | cut |
| `axis_statement` | delivered verbatim to the user as the named axis | cut |
| `app_surface` | the status-string disclosure on an `APP` or `BOTH` verdict resolving one of these addresses | cut |
| `probe_pos` | 3.6's threshold tuning; 1.11's fixture set | cut with `probe_neg` |
| `probe_neg` | 3.6; 1.11; the false-refusal defence of §1.3 | the container/content defect returns unmeasured |
| `M.side` | the persona brief, one per side; Rule V's side count | cut |
| `M.leaf` | the address resolution; the load-time resolve check | the register points at nothing |
| `M.position` | the reviewer auditing a `class` assignment — The Fact-Checker in Wave 2, and the opposite domain persona | see below |
| `H` row | the load check's error message; the merge's repath step; the self-declared size | cut |

**`M.position` was the close call and I am recording that it was close.** No answering mechanism
reads it, and it is deliberately *not* in the persona brief — a persona briefed on one side must read
the summaries, not a precomputed gloss by the register's author, or the two briefs stop being
independent. Its consumer is the reviewer of a `class` assignment, and specifically the `false_pair`
class, which is unauditable without it: deciding whether two sources answer different questions means
comparing their two positions, and without the field that is 66 file reads instead of one. It stays,
on the same warrant as The Designer's self-declaring register size — cheap redundancy that makes an
error detectable by reading one file.

**Two fields I proposed at 0.2 are cut, and both are mine.** `field` (lunar/japanese) is cut: I
justified it partly by field-scoped IDF, and 1.7 has since ruled that the field label lives in the
path via `literature/FIELDS.tsv`, so a per-axis field column would be derived data sitting in a
hand-maintained file, which is the exact shape that drifts. `evidence_lean` is cut for the reason in
§1.8. A schema author who does not cut his own fields will not cut anyone else's.

### 1.11 What the register does not do, said plainly

It does not make an answer right. It moves a claim from the searched side to the addressed side, so
that a question touching a known disagreement retrieves both sides deterministically instead of
whichever side scored higher that day. It does not know about disagreements nobody has registered,
and the classifier can miss one it does know about — that is what the detector and the
`MISCLASSIFIED` log row are for, and their whole output is a refusal and a defect report. Nothing
here verifies that a member file supports the sentence beside it. That gap is closed by a person's
sampling read or it is not closed, and this schema does not imply otherwise.

---

## 2. THE DELIVERABLE

Everything between the markers lifts to `oracle/register_schema.md` unedited.

<!-- BEGIN oracle/register_schema.md -->

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

<!-- END oracle/register_schema.md -->

---

## 3. The worked example, end to end: LCC-01

Outside the liftable block because it is an illustration of the spec, not part of it. Paths are
`lsei/literature/` pre-merge, which is the basis 1.9 authors against.

### 3.1 The sidecar rows

```
H	lsei/literature	2026-08-26	7f97983	1	4
A	LCC-01	two_sided	cabeus,ice,grade,concentration,lcross,psr,neutron	depth and footprint	Three methods measure water-ice concentration at Cabeus and disagree by about an order of magnitude.	ice,ice-grade-evidence,ice-grade-break,polar-cold-trap-water	What is the ice concentration at Cabeus?	How deep did the LCROSS Centaur impactor excavate?
M	LCC-01	A	colaprete-2010-lcross-water.md	5.6 plus or minus 2.9 wt% in the target regolith, from the impact plume, direct spacecraft measurement.
M	LCC-01	A	colaprete-2010-lcross-ejecta-water-detection.md	The same measurement, summarized twice; both leaves are named so the invariant cannot be satisfied by the wrong one.
M	LCC-01	B	litvak-2024-lend-cabeus-water-ice.md	0.49 plus or minus 0.05 wt% averaged over Cabeus-1, maximum about 0.7 wt% at the crater bottom. Collimated neutron, 2009-2023.
M	LCC-01	C	luchsinger-2021-lcross-water-modeling.md	8.2 wt% or 4.3 wt% from the same LCROSS event depending on assumed regolith density.
```

Note four things about those rows. `wt%` is **not** a key — K1 rejects it, and `concentration` and
`grade` carry that sense instead. `depth and footprint` is the `scope_token`, which is where the
INCOMMENSURABLE half of the axis went. The two Colaprete leaves are both named on side A, which is
assertion B6 doing its job: a near-duplicate cluster with one member registered is an invariant that
can be satisfied by a file that does not carry the claim. And `probe_neg` asks about excavation
depth — a real question about a member file that must not fire this axis.

### 3.2 The in-file blocks, generated

```
literature/.../colaprete-2010-lcross-water.md                  ## Contested / - LCC-01 A
literature/.../colaprete-2010-lcross-ejecta-water-detection.md ## Contested / - LCC-01 A
literature/.../litvak-2024-lend-cabeus-water-ice.md            ## Contested / - LCC-01 B
literature/.../luchsinger-2021-lcross-water-modeling.md        ## Contested / - LCC-01 C
```

### 3.3 The run

Question: *"How much water ice is there at Cabeus?"*

1. **Classification, before any retrieval.** Tokens include `water`, `ice`, `cabeus`. `cabeus` is a
   rare token and carries most of the mass; the axis fires at K.
2. **Address resolution.** Four `M` rows, three sides. Four leaves resolve in the index. No scoring,
   no ranking, no truncation, and `literature_search.js` is not called at all.
3. **Verdict.** `class` is `two_sided`, so `CONTESTED`. Three sides, so **three personas** in
   parallel, each briefed on the leaves of one side and on nothing else. This is amendment V1: the
   contract said two.
4. **Delivery.** The `axis_statement` verbatim; each side's claim in its own persona's words; sides
   in letter order, which carries no ranking; every quoted figure names `depth and footprint`,
   because `scope_token` is set; no adjudication.
5. **Traces.** Three or more, each `resolution-only`, each origin `literature`, each followed by the
   `literature` limit line. Rule G: `literature` × `resolution-only` is legal. Rule V as amended:
   at least one `literature` per side, three sides present, no `app`, no `none`; a `findings` trace
   would be legal and would not count as a side.
6. **The `app_surface` list does not fire here**, because this is not an `APP` verdict. It fires when
   a question resolves the `ice` rail, and then the app's own status string for that address prints
   verbatim, origin `app`, grade `resolution-only`.

### 3.4 The same axis, missed

Question: *"Is there enough water at the south pole to be worth mining?"* No `cabeus`, and `water`
alone does not reach K. The axis does not fire; the question classifies `LITERATURE` and is searched.
Search returns `litvak-2024-lend-cabeus-water-ice.md`. Its block names LCC-01, and the question's
tokens overlap LCC-01's keys on `water` and `ice` — nonzero. **Refuse**, code `misclassified`, and
write a `MISCLASSIFIED` row naming the question and LCC-01. No counterpart is fetched, nothing is
composed, and the fix is a `match_keys` edit at 1.9's file rather than a code change.

### 3.5 The same axis, correctly not fired

Question: *"How deep did the LCROSS Centaur impactor excavate?"* — the `probe_neg`. Search returns
`colaprete-2010-lcross-water.md`, which is on LCC-01. Under the container-shaped rule this refuses,
wrongly. Under the join of §8, the question's overlap with `cabeus,ice,grade,concentration,lcross,psr,neutron`
is `lcross` alone, and `lcross` also appears in the question's own filename match — the detector's
threshold is nonzero overlap, so this **does** fire and refuse, which is a false refusal.

**Recording that, because it is the one place this design is not yet clean.** Nonzero overlap is too
hot when a key is also a topic word of the member's filename. The narrow fix is that the detector's
overlap excludes keys already spent on the filename match, which is exactly what `confirmInText()`
already does with `candidate.matchedTokens` and is therefore a reuse rather than a new rule. I am
recording it as a defect in my own §8 with the fix named rather than editing the spec on a case I
have not measured; it belongs to 3.6 with K, because it is the same tuning problem, and the
`probe_neg` set is the data that decides it. **3.6 must tune two numbers, not one.**

---

## 4. Quantity blocks

Born here per the counting rule §2. Every numeral this deliverable asserts and any other file will
quote has a block; numerals stated once and nowhere else are governed by nothing today and become
governed under Tier 2 the moment a second file states them.

```quantity
id:            Q-REG-KEYS-AS-WRITTEN
class:         fixed
value:         110
unit:          distinct match_key strings across the fifteen lunar register axes, as written
population:    the union of the fifteen `trigger` lists in section 5.4 of
               cr_scratch/step0_space_resources_engineer_question_surface.md, transcribed verbatim
               into the FIXTURE constant of tools/probe_register_encoding.js, deduplicated
operation:     script: tools/probe_register_encoding.js --keys
conditions:    cwd: repository root, 55 characters. Corpus root lsei/literature. Node 26.4.0.
               Transcription is verbatim including punctuation, currency and multi-word phrases;
               cleaning the keys before counting would measure the cleaning.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     the fifteen lunar register axes name 110 distinct match_key strings as first written.
derived-from:  none
sampled:       n/a -- this operation deduplicates and counts, it does not classify
superseded:    none
```

```quantity
id:            Q-REG-KEYS-DEAD
class:         fixed
value:         31
unit:          match_key strings that can never fire, of the 110 [Q-REG-KEYS-AS-WRITTEN] as written
population:    the 110 [Q-REG-KEYS-AS-WRITTEN] distinct keys
operation:     script: tools/probe_register_encoding.js --keys
conditions:    cwd: repository root, 55 characters. Corpus root lsei/literature, 152 .md files.
               K1 is tokenize(k) deep-equals [k] using literature_search.js's own tokenizer;
               K2 is that k occurs as a whole token in at least one member leaf or body.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     31 of the 110 match_key strings written for the fifteen lunar axes fail K1 or K2 and
               can never fire: 28 the tokenizer splits or mangles, and 3 that tokenize cleanly and
               occur as a token nowhere in the corpus. 79 survive both.
derived-from:  Q-REG-KEYS-AS-WRITTEN
sampled:       31 inspected by hand, 0 found wrong, by The Software Engineer -- the tool prints
               every failing key with what tokenize() returned, and all 31 were read against the
               source lists
superseded:    none
```

```quantity
id:            Q-REG-FLIPS-FULL
class:         fixed
value:         14
unit:          candidate files that gained a full-text confirmation they did not have before, when
               a rich register block is written into member summaries
population:    the top-ten candidate set of each of the fifteen axis trigger queries, run against a
               copy of lsei/literature with a block carrying axis prose, match_keys and partner
               paths appended to each of the 53 member files
operation:     script: tools/probe_register_encoding.js --blocks
conditions:    cwd: repository root, 55 characters. Node 26.4.0. Probes are built into a fresh
               os.tmpdir() directory per run; the baseline arm is an unmodified copy of the same
               152 files, so the only difference between arms is the block.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     a register block carrying axis prose, match_keys and partner paths causes 14 files to
               gain a confirmInText() confirmation, 1 to lose one, and changes the best-scoring file
               for 6 of the 15 axis queries.
derived-from:  none
sampled:       n/a -- this operation counts flips in a boolean the retrieval layer computes; it
               applies no classification rule of its own
superseded:    none
```

```quantity
id:            Q-REG-FLIPS-MIN
class:         fixed
value:         9
unit:          candidate files that gained a confirmation, when the register block carries partner
               paths only
population:    as Q-REG-FLIPS-FULL, with the block reduced to axis id, side and partner paths
operation:     script: tools/probe_register_encoding.js --blocks
conditions:    as Q-REG-FLIPS-FULL
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     a register block carrying only partner paths causes 9 files to gain a confirmation
               and changes the best-scoring file for 3 of the 15 axis queries. Partner paths are
               topic text, because this corpus's filenames are author-year-topic by convention.
derived-from:  none
sampled:       n/a -- counts flips in a boolean the retrieval layer computes
superseded:    none
```

```quantity
id:            Q-REG-FLIPS-ID
class:         fixed
value:         0
unit:          candidate files that gained a confirmation, when the register block carries the axis
               id and side letter only
population:    as Q-REG-FLIPS-FULL, with the block reduced to "- <axis_id> <side>"
operation:     script: tools/probe_register_encoding.js --blocks
conditions:    as Q-REG-FLIPS-FULL. Side letters are single characters and are dropped by both the
               tokenizer and the document-frequency filter, so they are free.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     an id-and-side register block causes no confirmation flips and changes no best file
               on any of the 15 axis trigger queries. It is not thereby retrieval-safe; see
               Q-REG-HEADING-LEAK.
derived-from:  none
sampled:       n/a -- counts flips in a boolean the retrieval layer computes
superseded:    none
```

```quantity
id:            Q-REG-IDF-LOSS-FULL
class:         fixed
value:         7.73
unit:          percent, mean relative loss of idf across the 82 match_keys that survive K1
population:    the 82 keys of the 110 [Q-REG-KEYS-AS-WRITTEN] that satisfy tokenize(k)==[k],
               evaluated against the unmodified corpus and against the rich-block arm
operation:     script: tools/probe_register_encoding.js --blocks
conditions:    cwd: repository root, 55 characters. Loss is computed per key as (base-arm)/base and
               averaged over the 82 keys; the corresponding figures are 2.75 percent for the
               partner-paths block and 0.00 percent for the id-and-side block.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     writing match_keys into member bodies costs a mean 7.73 percent of the idf weight of
               those same keys, because a key published into 53 files is a key those 53 files no
               longer discriminate on.
derived-from:  Q-REG-KEYS-AS-WRITTEN
sampled:       n/a -- this operation averages a ratio, it does not classify
superseded:    none
```

```quantity
id:            Q-REG-HEADING-LEAK
class:         fixed
value:         the minimal id-and-side block still changes retrieval, through its own heading
unit:          a governed observation; no numeral
population:    one question, "what is contested about the ice grade at cabeus", run against the
               unmodified corpus and against the id-and-side arm
operation:     script: tools/probe_register_encoding.js --blocks
conditions:    cwd: repository root, 55 characters. 53 of 152 files carry the heading in the
               id-and-side arm.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     the literal heading "## Contested" is an English word a question can carry: with 53
               files carrying it, idf("contested") falls from 3.7441 to 1.0874 and the best-scoring
               file for a question containing the word changes. No in-file block field set is
               retrieval-safe on its own; the retrieval layer must excise the block region.
derived-from:  none
sampled:       n/a -- a single named probe, reported in full rather than sampled
superseded:    none
```

```quantity
id:            Q-REG-BLOCK-CARRIERS
class:         provisional
value:         53
unit:          files of the 152 in lsei/literature that would carry a ## Contested block under the
               fifteen lunar axes alone
population:    lsei/literature, 152 .md files; membership from the fifteen-axis fixture
operation:     script: tools/probe_register_encoding.js --blocks
conditions:    cwd: repository root, 55 characters. Lunar axes only; the seventeen economics axes
               are not counted and their members are not in this corpus. Re-measured at sub-step
               2.15, after the merge and after both row sets are authored.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     53 of 152 files -- about a third of the pre-merge lunar corpus -- would carry a
               register block under the fifteen lunar axes alone, which is the size of the blast
               radius of a file-keyed misclassification rule.
derived-from:  none
sampled:       n/a -- counts distinct member leaves that resolve, it does not classify
superseded:    none
```

```quantity
id:            Q-LCC-MEMBER-REFS
class:         fixed
value:         67
unit:          member references across the fifteen lunar register axes, counting a source once per
               axis it appears on
population:    the sides listed in section 5.4 of
               cr_scratch/step0_space_resources_engineer_question_surface.md, transcribed into the
               FIXTURE constant of tools/probe_register_encoding.js
operation:     script: tools/probe_register_encoding.js --resolve
conditions:    cwd: repository root, 55 characters. Corpus root lsei/literature. A source on two
               axes counts twice; this is a count of references, not of distinct sources.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     the fifteen lunar register axes make 67 member references.
derived-from:  none
sampled:       n/a -- this operation counts, it does not classify
superseded:    none
```

```quantity
id:            Q-LCC-MEMBER-UNRESOLVED
class:         fixed
value:         1
unit:          member references of the 67 [Q-LCC-MEMBER-REFS] that resolve to no leaf in
               lsei/literature
population:    the 67 [Q-LCC-MEMBER-REFS] member references
operation:     script: tools/probe_register_encoding.js --resolve
conditions:    cwd: repository root, 55 characters. Resolution is exact match of the normalized leaf
               name against the leaf index built by listCorpusFiles() over lsei/literature.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     one of the 67 lunar member references resolves to nothing before the merge has run:
               metzger-2021-aqua-factorem-2.md on LCC-06, which is a superseded duplicate and now
               sits in _intake/superseded-duplicates/. 66 resolve.
derived-from:  Q-LCC-MEMBER-REFS
sampled:       n/a -- exact string match against an index; no classification rule is applied
superseded:    none
```

```quantity
id:            Q-LCC-SIDES-GT2
class:         fixed
value:         10
unit:          of the fifteen lunar register axes, those carrying more than two labelled sides
population:    the fifteen LCC entries in section 5.4 of
               cr_scratch/step0_space_resources_engineer_question_surface.md
operation:     cmd: awk '/^\*\*LCC-/{if(id!="")printf "%s %d\n",id,n; id=substr($0,3,6); n=0} /^- [A-Z] \(app\):/{n++} /^- [A-Z]:/{n++} END{printf "%s %d\n",id,n}' cr_scratch/step0_space_resources_engineer_question_surface.md
conditions:    cwd: repository root, 55 characters. A labelled side is a list item whose first token
               is a single uppercase letter followed by a colon, with or without a "(app)" marker.
               LCC-08's "arbiter" line is NOT a labelled side and is excluded.
at:            2026-08-26; cr-agents f0c976b
predicate:     10 of the 15 lunar register axes carry more than two labelled sides; after the app
               sides are removed per section 5 of the schema, 8 still do. A verdict that buys
               exactly two personas cannot serve them without truncating sides.
derived-from:  none
sampled:       15 inspected by hand, 1 found wrong, by The Software Engineer -- LCC-08's arbiter
               line was counted as a side on the first pass and excluded on the second
superseded:    none
```

```quantity
id:            Q-LCC-APP-SIDED
class:         fixed
value:         6
unit:          of the fifteen lunar register axes, those carrying the app as a labelled side
population:    the fifteen LCC entries in section 5.4 of
               cr_scratch/step0_space_resources_engineer_question_surface.md
operation:     cmd: grep -c '^- [A-Z] (app):' cr_scratch/step0_space_resources_engineer_question_surface.md
conditions:    cwd: repository root, 55 characters. One axis carries at most one app side in this
               corpus, so the line count equals the axis count; verified by reading the per-axis
               breakdown rather than assumed.
at:            2026-08-26; cr-agents f0c976b
predicate:     6 of the 15 lunar register axes -- LCC-04, LCC-05, LCC-10, LCC-11, LCC-14, LCC-15 --
               were drafted with the app as a labelled side. Under section 5 of the schema the app
               is never a side; each moves to app_surface, and LCC-05 and LCC-14 drop to one
               literature side and become class one_sided.
derived-from:  none
sampled:       15 inspected by hand, 0 found wrong, by The Software Engineer
superseded:    none
```

```quantity
id:            Q-ECON-REFS-ABBREV
class:         fixed
value:         18
unit:          distinct source references in the seventeen economics register rows that match no
               filename in _intake/japanese-miracle/lit/
population:    the 36 distinct backticked source tokens in the table at section 4.1 of
               cr_scratch/step0_growth_economist_question_surface.md, excluding the three lean
               values (`dependent`, `neither`, `not_opposed`), compared against the 119 .md leaf
               names in _intake/japanese-miracle/lit/
operation:     cmd: sed -n '414,432p' cr_scratch/step0_growth_economist_question_surface.md | grep -o '`[a-z0-9][a-z0-9-]*`' | tr -d '`' | sort -u | grep -vE '^(dependent|neither|not_opposed)$' > /tmp/s; ls _intake/japanese-miracle/lit/*.md | xargs -n1 basename | sed 's/\.md$//' | sort > /tmp/h; comm -23 /tmp/s /tmp/h | wc -l
conditions:    cwd: repository root, 55 characters. Comparison is exact match of the leaf name with
               the .md extension stripped. Economics rows are pre-merge and are authored against
               _intake/, not against lsei/literature.
at:            2026-08-26; cr-agents f0c976b
predicate:     18 of the 36 distinct source references in the seventeen economics register rows are
               abbreviated author-year handles -- aoki-2009, henderson-2008, wade-2018, may-1977 and
               the like -- that match no filename. 18 resolve exactly. An abbreviated handle is
               clear to a reader and is not an address.
derived-from:  none
sampled:       36 inspected by hand, 0 found wrong, by The Software Engineer -- the full list of
               non-matching tokens was read and every one is an author-year prefix, not a typo
superseded:    none
```

```quantity
id:            Q-REG-TSV-IGNORED
class:         fixed
value:         a non-.md register file under literature/ does not commit; under oracle/ it does
unit:          a governed observation; no numeral
population:    six paths tested against the .gitignore frozen at sub-step 1.1
operation:     cmd: git check-ignore -q <path> in a scratch repository initialized with the
               .gitignore block from cr_scratch/step1_1_systems_engineer_enforcement.md
conditions:    cwd: a scratch git repository, git 2.55.0.windows.1, on a case-insensitive
               filesystem. The rules tested are /literature/** with re-admissions
               !/literature/**/ and !/literature/**/*.md.
at:            2026-08-26; cr-agents f0c976b
predicate:     literature/REGISTER.tsv, literature/FIELDS.tsv and literature/INDEX.tsv are all
               ignored by the frozen .gitignore and would be absent on every fresh clone;
               literature/NAMING.md, literature/<topic>/<name>.md and oracle/REGISTER.tsv are not
               ignored. The enforcement layer admits by extension, and three required inputs of
               this project are arriving as non-.md content under a deny rule.
derived-from:  none
sampled:       6 inspected by hand, 0 found wrong, by The Software Engineer -- all six results were
               read individually rather than aggregated
superseded:    none
```

---

## 5. Findings, and requirements this places on other sub-steps

### 5.1 On 1.9 (the fifteen lunar rows, The Space Resources Engineer)

1. **`trigger` is renamed `match_keys`** and must satisfy K1 and K2. **31 of the 110 keys as first
   written fail** [Q-REG-KEYS-DEAD] and the tool prints every one with what the tokenizer actually
   returns: `node tools/probe_register_encoding.js --keys`. Run it before authoring, not after.
2. **`kind`, `rule` and `verdict` are cut**; `class`, `scope_token` and `axis_statement` replace
   them, per §1.8. The mapping and the discriminating test for INCOMMENSURABLE are in the spec.
3. **PREFER_AND_NAME is refused** and LCC-06's requirement becomes a `scope_token`. Stated as a
   ruling against his position, with the cost named, in §1.8.
4. **The app is not a side.** Six axes are affected [Q-LCC-APP-SIDED]; each keeps its purpose through
   `app_surface`, and LCC-05 and LCC-14 become class `one_sided`.
5. **`metzger-2021-aqua-factorem-2.md` on LCC-06 resolves to nothing** [Q-LCC-MEMBER-UNRESOLVED]. It
   is in `_intake/superseded-duplicates/`. Either the axis names the surviving member only, or it
   names the omission in `position` per assertion B6.
6. **`probe_pos` and `probe_neg` are mandatory, one each per axis.** This is the field that turns
   `match_keys` from a hopeful list into a testable one, and it is the reason 3.6 can tune anything.
7. **LCC-12 is the shared axis and 1.9 authors it once.** 1.10 must not duplicate it.

### 5.2 On 1.10 (the seventeen economics rows, The Manager under an economics prompt)

1. **The economics rows carry no `match_keys` field at all.** The Step 0 form is `claim_id`, axis,
   sides, `lean`, `retrieval_rule` — the load-bearing join is absent from seventeen of the
   thirty-two rows. It is authored at 1.10, subject to K1 and K2. This is the specific failure I
   predicted at 0.2 §8.1 and it is worth saying that it arrived exactly as predicted on one side and
   arrived dead on the other.
2. **18 of the 36 distinct source references are abbreviated handles that match no filename**
   [Q-ECON-REFS-ABBREV]. They must be authored as full normalized leaves.
3. **Ids become `ECR-01` … `ECR-17`.** The Step 0 `R01` form has never been used anywhere, so this
   costs a renumber now and nothing later; after 1.10 an axis id is never renamed.
4. **`lean` is cut.** `not_opposed` becomes `class: false_pair`; `dependent` becomes a `scope_token`
   naming the decomposition (R06, R07). The three classes are the economics side's own and they are
   ratified as written.
5. **`class: one_sided` is the right home for R04, R08, R10 and R17** — the class the economics side
   identified as the dangerous one nobody had named. It is in the schema for that reason.
6. **The economics rows are authored against `_intake/japanese-miracle/lit/`, and the `H` row says
   so.** Two row sets on two pre-merge roots means two basis values; the merge reconciles them into
   one file with one `H` row at 2.15, and until then the register carries the root each set was
   written against or its resolution check cannot run.

### 5.3 On 1.11 (the suite, running in parallel with this sub-step)

**The answer contract is at version 2 and 1.11 must be told before it writes the version
assertion.** Four amendments, all in §1.9: `CONTESTED` buys one persona per side with a minimum of
two; `CONTESTED` fires only on `two_sided` and `false_pair`; Rule V's `CONTESTED` row permits a
`findings` trace that never counts as a side; and the `misclassified` condition is the `match_keys`
join rather than register membership.

If 1.11 is not told, it asserts version 1 against a contract that says 2 and fails on its first run.
**That is the version field working exactly as designed** and the right response is to fix the suite,
not to relax the assertion. It is the first time in this project that field has caught anything, and
it caught it before any code existed.

Two further things 1.11 gets from here. The `probe_pos` and `probe_neg` questions are 32 positive and
32 negative fixtures it does not have to invent, arriving from the people with the phrasing knowledge.
And the highest-value decoy for this register, built by mutating real produced output per the house
style, is **a real `CONTESTED` answer with one side's trace deleted** — it must fail Rule V's side
count, and if it passes, the invariant is decorative.

### 5.4 On 1.13 (the check register)

Fourteen assertions in §9 of the spec, five at load time and nine at build time, each needing a row
with what invokes it and what a failure does. Two of them are not obvious and should not be lost:
**B4**, the block round-trip, which must run in both directions or a member that lost its row passes;
and **§8.1's excision requirement**, which is a requirement on the retrieval layer rather than a
standalone check and therefore has no natural home unless 1.13 gives it one.

**And the container/content finding takes its fifth and sixth instances here.** The fifth is mine and
is in §1.3: the `misclassified` refusal I wrote at 0.2 joins on files where the claims are content,
which would have made a third of the corpus unanswerable [Q-REG-BLOCK-CARRIERS]. The sixth is
[Q-REG-TSV-IGNORED]: the enforcement layer admits by **extension**, and three required inputs of this
project — `literature/REGISTER.tsv` as The Engineer designed it, `literature/FIELDS.tsv` from
`NAMING.md` §9, and `literature/INDEX.tsv` from the merge spec — are all arriving as non-`.md`
content under a deny rule, and none of them would exist on a fresh clone. The register escapes by
moving to `oracle/`. **The other two do not, and they are not mine to move.**

### 5.5 For The Engineer, and for The Systems Engineer

**To The Engineer, three things.**

`literature/FIELDS.tsv` (`NAMING.md` §9) and `literature/INDEX.tsv` (the merge spec) do not commit
under the frozen `.gitignore` [Q-REG-TSV-IGNORED]. `FIELDS.tsv` is the field label that field-scoped
IDF depends on, so on a fresh clone the pooled-IDF defect it exists to fix comes back silently. It is
his file and his call; I am reporting the measurement, not proposing the fix.

`literature/NAMING.md` fails his own `R_S` — the regex requires lowercase and assertion A2 walks
`literature/**/*.md` — so A2 exits 1 on the file that defines A2, on the day the shelf is created.
The fix is his own §10 device: whitelist it by name, never by pattern.

His in-file `## Contested` block is ratified and his placement of it in the loop is not, per §1.5. He
asked at 0.2 for confirmation that the loop reads the block before it composes an answer. It reads it
after, and the block therefore serves the detector rather than the answer. The pairing still survives
as structure and is still findable from either member, which is what he was defending; what changes
is that it carries no partner path, because measurement says a partner path is topic text
[Q-REG-FLIPS-MIN].

**To The Systems Engineer.** His 1.1 §4.1 finding — the enforcement layer fails closed on file
*types* and is blind to content inside an admitted type — has a mirror image that his section does
not cover and that is cheaper to fix: it is also blind to **legitimate content in an unadmitted
type**. Deny-by-default under `literature/` is correct and it has now silently excluded three
required inputs. The two halves are the same defect and the same sentence covers both: the
enforcement layer reasons about containers, and this project's dependencies keep arriving as content.

### 5.6 What I owe, and cannot pay here

**3.6 tunes two numbers, not one.** K, the axis firing threshold, and the detector's overlap
threshold, which §3.5 shows is too hot as stated when a `match_key` is also a topic word of a
member's filename. The fix is named there (exclude keys already spent on the filename match, reusing
`confirmInText`'s own `candidate.matchedTokens`) and I have not measured it, so I have recorded it as
a defect in my own spec rather than writing an unmeasured constant into a frozen artifact. The
`probe_neg` set is the data that decides both.

**The three mechanisms orphaned by the C4 ruling still have no post-condition.** The author's Ruling
1 flagged this for the Step 1 close: `verify_haiku.js`'s claim-bearing token definition and two
others were written against `verify_report.js`, which is now dropped. Contract §7 restated the
definition in the contract's own words, so nothing here is blocked, but the three mechanisms need a
replacement post-condition and it is still not a sub-step. Raising it again at 1.8 because this
deliverable is the third artifact in a row that assumes those mechanisms exist.

---

*The Software Engineer, sub-step 1.8, Group 2.*
