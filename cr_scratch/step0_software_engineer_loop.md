# Step 0.2, The Software Engineer: the answering loop and the TDD front end

**Persona:** The Software Engineer
**Sub-step:** 0.2, Wave 1
**Objectives covered:** 3 (the answering loop), 4 (register enforcement mechanism), plus the TDD
front end for both
**Drafting assumptions used:** A2 and A4 throughout, A5 stated at each point where the answer moves.
**Deliverable:** gameplan steps SE-1 through SE-11, with context recipes. Global numbering is the
orchestrator's at 0.3; I number locally so that five agents drafting in parallel do not collide.

---

## 0. What I read, and the one thing I found before I started

I read the gameplan, `answer_question.js`, `literature_search.js`, `verify_answers.js`,
`address.js`, the report generator, `tdd_method.md`, and A.3.3 / A.4 / A.10. I also read
`verify_figure.js`'s header, which was not on my list and which turned out to be the most useful
thing in the tree.

That header records a defect worth quoting, because it is the failure mode this entire brief is
about:

> "This file was written before sub-steps 1 and 2 existed, and its own header said so: it stated a
> manifest schema it assumed rather than one it had seen... the two halves were built to agree in
> prose and were never run against each other."

A verifier and the thing it verifies agreed in prose for an entire step and disagreed in bytes.
Nobody caught it until somebody ran `--prove` against a real artifact instead of a hand-built
stand-in. Hold that against what this project now proposes to build, a retrieval invariant, a
register boundary, a trace-grade discipline, and the lesson is not "write more rules." It is that
a rule not executed against a real artifact is a preference with better formatting. Every mechanism
below is executed over bytes that were actually produced, and every one has a decoy.

---

## 1. The loop, question to delivered answer

### 1.1 The simplicity gate, applied to me first

The brief warns me that the temptation is to rebuild everything because it is more interesting than
reading somebody else's router. It is worse than that. The temptation is to rebuild the
*interesting* parts and keep the *boring* parts, and in this codebase that is exactly backwards.

The prototype's router is a hand-built regex parser for English. It is the interesting part and it
is the part to delete. The prototype's verifiers are dull, defensive, and they say out loud what
they cannot check. They are the part to keep, unchanged, including the comments.

| Component | Size | Ruling | Why |
|---|---|---|---|
| `lib/address.js` | 224 lines | **Keep verbatim** | The app-side addressed grammar. Tightly coupled to the LSEI app, which is exactly what it should be coupled to, because the app is still the authority. One change: the app path becomes `lsei/index.html` under the bootstrap, and a missing clone throws rather than falling through `firstExisting`. |
| `lib/manifest.js` + `verify_figure.js` `check()` | ~600 lines | **Keep verbatim** | The only recompute-grade mechanism in the system. Rebuilding buys nothing and discards a `--prove` history that already caught one schema drift. |
| `verify_answers.js` | 163 lines | **Keep, extend the outcome set** | The best file in the prototype. Four outcomes never collapsed to one bit, and FILLED explicitly declared un-self-assignable. A check that says what it cannot check. Extend to six outcomes (§5.3); do not restructure. |
| `lib/exclusions_match.js` | ~80 lines | **Keep** | The app's EXCLUSIONS register still declares boundaries, and an EXCLUSIONS hit is still the strongest refusal available. |
| The five verdicts and the composition rule | in `answer_question.js` | **Keep the frame, add one verdict** | APP / LITERATURE / BOTH / FIGURE / REFUSE is a good spine. It gains CONTESTED (§3) and nothing else. |
| `render_figure.js`, `svg.js`, `raster_figure.js`, `bitmap_font.js`, `png_encode.js` | ~85 KB | **Keep, do not extend, do not call from the chat loop** | Hand-rolled SVG and PNG with a bitmap font. Under A4 a figure delivered to a chat is a file path the user opens; the SVG-plus-manifest path survives and the raster path is document-pipeline infrastructure with no consumer here. Deleting working code to feel tidy is ceremony. Porting it into a new build is worse. Leave it and stop calling it. |
| `lib/literature_search.js` | 379 lines | **Rebuild, keeping the contract and two functions verbatim** | §1.2. |
| The lexicons and `decomposeSubClaims` in `answer_question.js` | ~120 lines | **Delete** | §1.3. This is what A4 buys. |

### 1.2 Why `literature_search.js` is the one thing that genuinely breaks

The Engineer was asked what breaks when the corpus grows past 180 files and a meaningful share of
the new filenames are Japanese economic history rather than author-year lunar papers. My answer to
him, from the retrieval side: it is not the directory walk and it is not the file count. The walk
is recursive to any depth and correct; the file count is trivial. Five things break, in descending
order of severity.

**1. The pooled IDF table is the real break.** `corpusDocFrequency()` builds one document-frequency
table over every `.md` file under one root and caches it per directory. At 182 files the cost is
fine. The correctness is not. IDF measures a token's rarity *within a population*, and after the
merge the population is a union of two fields that do not share a vocabulary distribution.
"Policy," "capital," "growth," "cost," "targeting" and "constraint" are ubiquitous in the Japanese
half and comparatively rare in the lunar half. A pooled table averages the two distributions and
produces a weight wrong for both: it understates a term that genuinely discriminates within one
field, and overstates a term ubiquitous in one field only. This degrades both the filename score
(which is IDF-weighted, per the comment recording why raw counts failed at 156 files) and the
full-text confirmation. The fix is field-scoped IDF: one table per top-level field, with a token's
weight taken from the field of the file being scored. The taxonomy is The Engineer's to design;
this is a requirement I place on it. **The merged taxonomy must carry a machine-readable field
label per file, because retrieval needs one, not because a shelf looks tidier with one.**

**2. `confirmInText`'s threshold is a hand-tuned constant with no claim on the new corpus.**
`frac >= 0.45 && hits.length >= 1`, tuned against 57 lunar files. It has no evidential standing at
182 across two fields. The rebuild must not re-tune it by feel. It is set from the acceptance
suite's own labelled fixture set (§5.1), so the number is evidence-backed, and the fixture set is
what gets extended when it drifts, not the constant.

**3. Silent truncation.** `searchLiterature` slices candidates to `opts.limit || 5`. A hard
truncation that discards without saying so. Directly dangerous once contested pairs exist, and an
independent reason the register cannot be a filter over search output (§3.4).

**4. The author bonus becomes a false-confidence generator across two fields.** `+3` for a matching
leading-author token and `+3` for a matching year, against filenames like
`beason-1996-targeting-japan`. In a single-field corpus that bonus is the strongest signal a
legible filename offers. In a union corpus a question about "targeting" has a lunar reading and an
industrial-policy reading, and the bonus fires on identity tokens a cross-field question supplies by
accident. Keep the bonus, but require it to co-occur with a field match: an identity anchor naming
an author outside the sub-claim's own classified field is not an anchor, it is a collision.

**5. `citationForFile` is now the minority path and it prints a false sentence.** It matches a
filename against the app's `REFERENCES` keys. The Japanese corpus has no `REFERENCES` entries at
all, so the 24 unique sources and most of the 95 overlapping ones fall to the direct-filename
branch, which is fine, except that branch emits the hard-coded string "a direct filename citation
into the 57-file corpus." That is a false number printed into an answer. Small, but it is exactly
the class of thing a reader takes as fact.

**What survives the rebuild verbatim:** `listCorpusFiles()` and `requireNonEmptyCorpus()`. Those
twelve lines are the most valuable in the file. An empty corpus returning zero candidates is
indistinguishable by return value from a corpus that found nothing relevant, and that ambiguity is
what lets a mispointed directory resolve to a confident REFUSE. It throws instead. Keep it, keep
the comment, and extend the same posture to the register file (§3.6).

**What survives as contract:** filename match, then full-text confirm, no semantic layer. Nobody
asked for embeddings, and 182 legibly-named files is not a corpus that needs them.

**Assumption dependency (A5).** Under A2 the corpus is on disk at question time, so retrieval is a
local read and latency is not a design constraint. Under the alternative, a fetched corpus,
everything in this section changes, because a network round trip per question makes the two-stage
filename-then-body read unaffordable and forces a prebuilt index. A2 is a ruling, so I build to it,
but the dependency is worth recording: **the cheapest-mechanism-that-works retrieval design is
downstream of the corpus being present on disk.**

### 1.3 What A4 buys, spent in exactly one place

`OUTPUT_LEXICON`, `KNOB_LEXICON`, `SWEEP_LANGUAGE`, `PRONOUN_CONTINUATION` and
`decomposeSubClaims` are roughly 120 lines of regular expressions that parse English into
sub-claims and propose candidate model keys. In the prototype this was correct engineering: a Node
CLI with no model in the loop, and a phrase-to-key table was genuinely the cheapest mechanism that
could work.

Under A4 there is a model in the loop. This is the single largest simplification A4 buys, and it
should be spent here and nowhere else.

The prototype's own header already draws the line and gets it right:

> "What IS mechanical is the resolution test after a candidate key is proposed: every lexicon hit
> is verified against the app's own PRESETS/DETENTS/model()-return-keys before it is trusted... so
> a wrong or stale lexicon entry fails loudly rather than silently producing a wrong number."

The guarantee was never in the regex. It is in `address.js`'s resolve functions, which throw on
anything they do not carry. So: **Claude decomposes the question and proposes candidate keys; the
Node files resolve them or throw.** Delete 120 lines of parser, keep 100% of the guarantee, and
gain the ability to handle a question phrased in a way no lexicon anticipated, which, with a
corpus spanning two fields, is now most questions.

This is the only place I spend A4. I am not proposing Claude replace the verifiers, the recompute
check, the trace grading, or the register enforcement. Those stay as executed code over produced
bytes, for the reason the report generator states plainly: a behavioural request is not a control.

### 1.4 The loop, stated

```
question
  |
  +-- (a) decompose into sub-claims                        [model]
  |
  +-- (b) CLASSIFY each sub-claim, before anything is searched
  |         1. does the contested-claims register carry an axis
  |            this sub-claim touches?       -> CONTESTED   [register, ADDRESSED]
  |         2. does an app address resolve?  -> APP/FIGURE  [address.js, ADDRESSED]
  |         3. does EXCLUSIONS declare it?   -> REFUSE      [exclusions_match.js]
  |         4. otherwise                     -> LITERATURE  [corpus, SEARCHED]
  |
  +-- (c) RETRIEVE, by the mode classification chose. Never two modes for
  |       one sub-claim; never a second retrieval to repair a first.
  |
  +-- (d) select the wave                                  [see section 2]
  |
  +-- (e) compose the deliverable to a FILE                [see section 4.1]
  |
  +-- (f) run the post-conditions over the file's bytes    [4.3, 5.2]
  |
  +-- (g) orchestrator reads the file, emits a haiku + pointer, and that
          turn is itself checked before it is delivered.   [see section 4.2]
```

Step (b) now has three retrieval modes rather than two, and that is the whole of §3.

---

## 2. How much team does one question buy: Open Question 4 answered

The method is built for a multi-day step producing a reviewed document. Running nine personas in
three waves for a question typed into a chat window is the method applied literally, and applying a
method literally is the definition of ceremony. But answering directly throws away the thing that
makes this an Oracle rather than a search box.

**My proposal: the classification decides the wave, and it decides it before retrieval, using
machinery that already exists.** No new tier system, no menu, no user-facing knob. The verdict the
router already computes *is* the wave selector.

| Verdict | Personas | Rationale |
|---|---|---|
| APP, FIGURE | **zero** | The address resolved and the manifest recompute-verified. There is nothing a persona adds to a number the app recomputed thirty milliseconds ago. Nine opinions about an arithmetic result is ceremony in its purest form. |
| REFUSE | **zero** | A refusal must stay cheaper than an answer, or refusing becomes expensive and the system quietly learns to answer instead. This is the most important zero in the table. |
| LITERATURE, BOTH | **one**, selected by field | The Space Resources Engineer for the lunar branch, The Growth Economist for the Japanese branch, chosen by the field label on the confirmed candidates. One spawn, one context recipe: the retrieved summaries plus any app facts. |
| CONTESTED | **exactly two, in parallel, one per side, each briefed on one side only** | §2.1. |
| Cross-field (a lunar mechanism bound to an economic one) | **two**, the two domain personas | The A.9 tension between them goes live by construction rather than by scheduling. Same shape as CONTESTED, different reason. |
| User asks for a document | **the full A.4 loop** | §2.2. |

### 2.1 Why CONTESTED buys two agents, and why they must not see each other

This is the only row where the wave shape is load-bearing rather than decorative, and it is
load-bearing for a reason I can state mechanically.

A single agent handed both sides of Beason and Henderson will synthesize them. That is what a
competent reader does with two conflicting papers, and it is precisely the arbitration the register
exists to prevent. Two agents that cannot see each other's brief cannot synthesize, because neither
knows there is a second side. Composition happens afterward, in the orchestrator's own composition
step, which presents both and names the axis and has no licence to pick, because picking is not in
its contract.

So: **the register invariant is enforced by the wave shape as well as by retrieval.** Retrieval
guarantees both files are in hand. The wave shape guarantees no single reasoner is in a position to
quietly drop one. Two independent controls on the same failure, and I want both, because the
failure is silent and passes every other check in the plan.

That is my answer to "how much team does one question buy": **the team is bought where disagreement
lives, and nowhere else.**

### 2.2 The escalation, and the free answer to where the boundary sits

One escalation exists and it is user-invoked, never automatic. The author already decided where the
line falls, and I do not think anyone noticed it answers this question. The design intent says the
deliverable is "either a file or a text block in the chat."

- **Text block in chat → the tiered loop above.**
- **File → the full A.4 loop, TDD precondition and all, producing a document through the report
  generator's descendant.**

That mapping is free. It costs no new concept, it is already in the brief, and it puts the decision
in the user's hands at the moment they ask, the only moment anyone can judge whether the question
is worth a document.

### 2.3 The cost of being wrong in each direction

Too few personas returns a well-cited answer with no adversarial read. That is the register's
failure mode, and on registered claims the register catches it. Off the register it is not caught,
and I say so rather than pretend the tiering is free; §5.4 makes it a sampled human check.

Too many personas returns a forty-second latency on "what is the water output at Early Shift to
Mars," a question the app answers exactly and instantly. That trains the user to stop asking, and a
system nobody queries has no failure modes at all, because it has no runs.

The second failure kills the product. The first is bounded by the register on the claims where
being wrong matters most. That asymmetry is why I default low, and it is the argument the author
should be given at the gate rather than a menu.

---

## 3. The contested-claims retrieval invariant, and its collision with the inherited rule

This is the sharpest thing in my brief and I am putting it third rather than last, where it belongs
by importance.

### 3.1 The invariant

A question touching a claim on the contested-claims register cannot be answered from one side of
the pair. Retrieval returns both members, or the Oracle refuses.

Why it needs its own mechanism, from the Recruiter's finding: the citation resolves, the summary
genuinely says what is quoted, the trace grade is honest, and the answer is still wrong. Every
other check in the plan passes. There is no check in the plan that fails.

### 3.2 The collision, stated precisely

The project inherits: *classification happens before retrieval, not after; two sources are never
searched and then reconciled.* A register consulted after retrieval is a reconciliation. So either
the register moves to classification time, or the inherited rule needs a stated exception, and it
is a rule the Scenario Explorer paid for three times.

**I am not taking the exception. The register is consulted at classification time. The inherited
rule stands unamended.** Three arguments, in ascending order of how much I trust them.

### 3.3 Argument one: co-presentation is not the shape the rule forbids

The rule forbids one thing and it says what it is. From the prototype's own header:

> "reconciling after the fact is exactly the shape that lets a summary's number argue with the
> app's own number, which is the defect this whole step exists to prevent."

The "two sources" in the rule are *the app and the corpus*. The rule settles an authority contest.
And the operation it forbids is **arbitration**: two candidate answers to one question, pick one,
discard the other, silently, by whatever ran last.

The register mandates the opposite operation. **Co-presentation**: two candidate answers to one
question, return both, refuse to pick. Arbitration destroys information and hides the destruction.
Co-presentation preserves it, and is the only way the picking gets done by the user rather than by
the router.

So on the rule's own terms, the register invariant is not the forbidden shape. It is its inverse.

I do not think that argument suffices on its own, and I want to say so rather than bank it. It is a
reading of intent, and readings of intent erode: the next person with a locally cheaper
implementation reads it as a general licence to search-then-sort-out. If this were my only
argument, I would take the exception route, write it down, and accept the cost. It is not my only
argument.

### 3.4 Argument two: a post-retrieval register check does not work, mechanically

This is the argument I actually trust, and it has nothing to do with doctrine.

**A post-retrieval check can only fire on what retrieval returned.** Consider a question about
industrial-policy targeting. `searchLiterature` scores filenames, confirms bodies, sorts, and slices
to five. Suppose Beason confirms and Henderson does not, because Henderson's body shares fewer of
the question's remaining topic tokens, or Henderson ranked sixth and was sliced off, or the
question's phrasing shares no filename token with Henderson at all. All three are ordinary outcomes
of the mechanism as written.

Now run the register check over the result set. It sees Beason. It looks Beason up on the register.
It learns Henderson is missing. And then what? Its only remedy is to **issue a second retrieval** for
the named counterpart.

A second retrieval issued to repair the first retrieval's output, whose results are then combined
with the first's, *is* the search-then-reconcile shape. Not by analogy. That is the shape. The
post-hoc register check does not merely resemble the thing the rule forbids; implementing it
requires doing the thing the rule forbids.

And it is worse than forbidden, it is unsound. The check fires only when at least one member of the
pair surfaces. The dangerous case is the question where *neither* member surfaces prominently and a
third, uncontested, adjacent file confirms instead: a confident, well-cited, one-sided answer on a
contested axis, with the register never firing at all because nothing it knows about is in the
result set. **A filter over search output cannot catch what search did not output.**

### 3.5 Argument three: the register is an address space, not a filter

This is the constructive half, and it is why the answer is not merely "consult it earlier" but
"consult it as a different kind of thing."

`address.js` is an **addressed** retrieval. You name a scenario, a phase, an output; it resolves or
it throws. It cannot miss, cannot rank, cannot truncate. `literature_search.js` is a **searched**
retrieval. It scores, ranks, thresholds, and truncates, and it can miss.

The inherited rule exists *because* those two modes cannot be mixed after the fact. The whole
architecture is: decide which mode owns the sub-claim, use that mode, and never let a searched
result argue with an addressed one.

The register's real function is to **move a claim from the searched side to the addressed side.** A
register axis names its member files by path. Retrieving them is a read of two named paths: no
scoring, no threshold, no ranking, no truncation. Deterministic and unmissable, exactly like
resolving a scenario label against PRESETS.

So the register does not need an exception to the inherited rule. It needs the classifier to
recognize a third mode. Classification's job is unchanged, to decide which retrieval mode owns this
sub-claim, and it now chooses among three rather than two:

1. **app-addressed**: `address.js`, resolves or throws
2. **register-addressed**: the register, both members resolve or the sub-claim refuses
3. **corpus-searched**: everything else

That is the whole move. The rule was never about *when in wall-clock time* a source is consulted. It
was about never letting an addressed source and a searched source contest the same fact after both
have been consulted. Adding a second addressed source is entirely inside the rule's grain.

### 3.6 What this costs, named as a dependency rather than hidden

The register must be **machine-addressable before anything is searched**, which makes it a data
structure with a specific shape, produced at merge time, not a document somebody consults. The
shape it must have, as a requirement I place on The Growth Economist, The Space Resources Engineer,
and The Engineer:

```
axis_id            stable identifier, e.g. "industrial-policy-targeting-returns"
field              lunar | japanese   (also feeds field-scoped IDF, section 1.2)
match_keys         the terms a classifier tests sub-claim text against, BEFORE any
                   retrieval runs. This is the load-bearing field, and it is the one
                   the domain personas must write, because it requires knowing how a
                   user would phrase the question.
members[]          two or more, each: relative path into literature/, the position that
                   source holds, and the grade of support
axis_statement     one sentence naming what the disagreement is about
evidence_lean      which side the evidence currently favours, or "neither"
```

`match_keys` is where the whole invariant lives, and it cannot be derived mechanically from the
summaries. It requires domain judgment about how a question gets phrased. That is a real cost, it
falls on the two domain personas rather than on me, and I am naming it rather than assuming it.

Two consequences, both non-negotiable:

- **The register file is a required input.** Missing, unparseable, or parsing to zero rows is a hard
  refusal at startup, the same posture as `requireNonEmptyCorpus`. A missing input is a refusal,
  not a fallback, and a register that silently parses to zero would disable the invariant while
  every test still passed green.
- **A member path that does not resolve on disk is a refusal for that axis**, never a fall-through
  to search. A reference a machine cannot follow is a copy.

### 3.7 The residual hole, and why the patch for it cannot become a reconciliation

The classifier's `match_keys` test is a heuristic front end. It can miss. A sub-claim that touches a
contested axis in words `match_keys` does not carry gets classified LITERATURE, gets searched, and
one-sided retrieval happens anyway. I am not papering over that.

There is a post-retrieval check, and it is deliberately built so that it *cannot* grow into a
reconciliation:

> If a searched retrieval returns any file appearing anywhere on the register, that is a
> **classification miss**. The response is to **REFUSE**, and to write a `MISCLASSIFIED` row to the
> run log naming the question text and the axis the classifier should have caught.

Note what it does not do. It does not fetch the counterpart. It does not compose. It has no power to
produce an answer of any kind. Its only two outputs are a refusal and a defect report. It therefore
cannot become a search-then-reconcile path, because reconciliation requires the ability to combine
and this check has none. That is a structural argument rather than a promise, which is the standard
this project holds itself to.

Refusing here is the honest move on the project's own terms: the router has just discovered that its
own classifier was wrong about this question, and answering from a classifier known to be wrong is
the fabrication path.

The defect report is the growth mechanism. A `MISCLASSIFIED` row names a question and an axis, so
the fix is **an edit to `match_keys`, not an edit to the router.** The register improves from use,
the code does not churn, and the improvement is owned by the domain personas who own the register.
That is the cheapest feedback loop available and it costs one JSONL row.

### 3.8 The ruling

The inherited rule stands unamended, no exception is taken, and the register is consulted at
classification time as a third retrieval mode, an address space, not a filter. The
post-classification check that catches classifier misses exists, but is structurally incapable of
producing an answer, so it is a defect detector rather than a reconciliation.

If the author disagrees and prefers the exception route, the cost is not the words in the rule. It
is that "search both and sort it out" is *always* the locally cheaper implementation, so any
exception at all reopens the rule as a general escape hatch, and it will be paid for a fourth time.

---

## 4. Objective 4: where the register split is enforced

The Writer and The Editor specify *what* the prohibition says at 0.4. I specify *where* it is
enforced, what makes a leak structurally impossible rather than discouraged, and what happens when a
deliverable comes back carrying theater.

The governing principle is the report generator's, and it is already this project's law:

> "An instruction telling a model to flag what it cannot source is a behavioural request, and this
> project's record says a behavioural request is not a control. So the control is a check that runs
> after generation, over the bytes that were produced."

### 4.1 The structural device: the two registers never share a channel

The boundary is a filesystem boundary, not a stylistic one.

**The team never emits into the chat. Ever.** Team output is written to a file, without exception,
including short answers. The orchestrator reads the file and emits a haiku plus a pointer to it.

Under A4 this is already how the harness works: a subagent's report returns to its parent, not to
the user. A subagent has no channel to the user even if it wants one. What I specify is that this
property of the runtime be **named as the mechanism** and depended on deliberately, and that the
orchestrator's composition step never inline a team deliverable into its own turn; it emits a haiku
and a path, and the user opens the path or asks for the block.

That makes the leak structurally impossible in one direction: team prose cannot leak into the haiku
register, because team prose is never in the haiku register's channel.

The other direction, whimsy leaking into a deliverable or a claim leaking into a haiku, is not
solved by the channel split and needs the two checks below.

**Assumption dependency (A5).** This mechanism is downstream of A4. Outside Claude Code there is no
subagent boundary to lean on, and the channel split would have to be built rather than named.

### 4.2 Check A, on the orchestrator's turn: `verify_haiku.js`

Runs over the bytes the orchestrator is about to emit. Three assertions.

1. **5-7-5**, by a stated syllable-counting rule that is itself proved with `--prove`.
2. **Zero newline characters.** Trivial, exact, and half the stated contract.
3. **No claim-bearing token**, using the report generator's own definition, reused verbatim: a
   numeral, a unit token, a coefficient name, or a named source. The last three lists are read out
   of the app rather than typed into the verifier, exactly as `verify_report.js` does it.

The third is the one that matters. A haiku carrying a number is a leak in the dangerous direction:
an untraced quantitative claim sitting in a register that has no trace convention and cannot acquire
one, because you cannot put `[[slug]]` in a haiku. The haiku must be structurally incapable of
asserting. Decorative by construction.

**Honest limit, stated in the file rather than glossed:** English syllable counting is not decidable
by algorithm. The check is a dictionary lookup plus a heuristic with an explicit unknown-word
bucket, and **an unknown word is a refusal to certify, not a pass.** A missing input is a refusal,
not a fallback, and that inherited rule binds the checker as much as it binds the router. Failing
closed means no certified haiku, no delivery; the orchestrator rewrites.

### 4.3 Check B, on the team deliverable: `verify_register.js`

Here I have to be careful not to build ceremony. A stylistic linter for AI-isms is a known losing
game. You cannot regex "performative rigor," and a checker that tries produces false positives at a
rate that gets it switched off within a week. A check that gets switched off is worse than no check,
because the plan still lists it.

So do not check for theater. Check the **structural signatures** of theater, which are mechanical
and countable. Three assertions, ascending in value.

**B1. Every claim-bearing sentence carries a trace.** `verify_report.js`'s backward half, reused
verbatim, including the `<!-- not app-derived -->` exemption and the all-exempt failure case. The
highest-yield check in the project, and it already exists and is already proved. Its own reasoning
is worth restating: a fabricated sentence does not arrive with a broken reference, it arrives with
no reference at all, and a forward-only check passes it.

**B2. Self-referential subjects, counted against a closed list.** "This analysis," "this answer,"
"it is worth noting," "importantly," "rigorously," "carefully," plus whatever The Editor adds at
0.4. A closed list, **counted and reported with its denominator**, not a judgement. I am
deliberately keeping this weak. It is a smoke detector whose output is a number a human reads, not a
gate. A gate here would be tuned into uselessness within a month.

**B3. Trace grades are drawn from a closed set of three, and nothing else is a grade.** This one has
real teeth and it is new.

Every trace line must carry exactly one of:

```
recompute-verified   the value was recomputed fresh from the app and found equal
resolution-only      the reference resolves to a real file or slug, and that is all it proves
refused              nothing is asserted; the refusal's stated reason stands in its place
```

A trace line carrying a grade word outside that set, "verified," "confirmed," "validated,"
"proven," "established," "supported," is a **FAIL**, not a warning.

That mechanizes "a citation resolving to a real file is resolution-grade and is never dressed up as
more" as a byte-level check rather than a hope. It is the best teeth-bearing device I can hand the
author, because the failure it catches is exactly the one where the answer is confident, well-formed
and wrong. It is also cheap: a closed set of three strings and a blacklist of six.

The prototype already writes these strings: "Trace (scalar, recompute-verified)", "Trace (citation,
resolution-only)". B3 turns an existing convention into an enforced one, which is the cheapest
possible way to acquire a real control.

### 4.4 What happens when a deliverable comes back carrying theater

Named explicitly, because "the check fails" is not a procedure.

1. **First failure: return it to the persona that wrote it, with the failing lines quoted, once.**
   Not a re-spawn with fresh context, but the same agent, the specific lines, and the specific
   assertion each violated.
2. **Second failure: deliver it anyway, with the failures listed above it,** and write a
   `REGISTER_FAIL` row to the run log naming the persona and the assertion. Delivering with the
   failures visible beats an infinite repair loop, and it makes the defect countable across runs,
   which is how a persona prompt gets fixed rather than nagged.
3. **The orchestrator never edits the deliverable.** This is the important one. An orchestrator that
   quietly rewrites a persona's prose to pass a register check has merged the two registers in the
   worst possible way: the team's words now come out of the oracle's mouth and nobody can tell which
   sentences are whose. The channel split in §4.1 exists precisely to prevent that, and an
   orchestrator repair pass defeats it from the inside.

### 4.5 What a green result does not mean

Mirroring the report generator's own closing section, because the posture is right and this project
should keep it.

`verify_register.js` catches the structural signature of theater. It does not catch theater. A
deliverable can pass all three assertions and still narrate its own honesty in prose carrying no
numerals, no self-referential subject from the closed list, and no trace lines at all. Only The
Editor's read, or the author's, closes that gap. The check makes the cheap failures impossible and
the expensive one visible; it does not make it impossible. Saying so in the file is not epistemic
theater; it is the difference between a control and a claim.

---

## 5. The TDD front end

### 5.0 The hard part, stated before it is solved

The deliverable under test is not a document. It is a response generated fresh, each time, from a
question that did not exist when the suite was written. `tdd_method.md` assumes a fixed artifact you
can assert against, as in "Section 6 includes the calculation showing 78%." There is no Section 6. There
is no fixed text at all.

The temptation is a suite that asserts prose. Every such test goes red the first time the model
phrases something differently, at which point the suite gets deleted, and the project has paid for a
test suite and owns nothing.

**The move: the suite does not test answers. It tests the loop.** The loop *is* a fixed artifact,
and it admits an ordinary test suite.

The insight that makes it work: the answer *text* is nondeterministic, but almost everything that
matters about an answer is deterministic. The classification, the resolved address, the recomputed
scalar, the set of files retrieved, the outcome, and the grade attached to each trace are all
deterministic functions of the question and the corpus. Assert those. Never assert wording.

Three levels.

### 5.1 Level 1: fixture questions asserting verdicts and grades, fully testable

A golden set committed to `oracle/fixtures/questions/`. Each fixture carries the question text and
its expected **verdict, resolved address, retrieved file set, outcome, and trace grades**. It never
carries expected prose.

```yaml
id: APP-water-early-shift
question: "What water output does the app give for Early Shift to Mars in phase 1?"
expect_verdict: APP
expect_address: "model:earlyShift|1|water"
expect_traces: [recompute-verified]
expect_outcome: ANSWERED
primary_source: lsei/index.html   # model(), recomputed at test time
```

Coverage, one fixture minimum per row, the count a floor rather than a target:

| Class | What it pins |
|---|---|
| APP scalar | address resolves, value recomputes, exactly one recompute-verified trace |
| APP figure | knob sweep resolves, manifest verifies forward and recompute |
| APP unbuildable | an `fFis`-style sweep intent that `resolveKnob` rejects returns its own named outcome, never a fall-through to literature |
| LITERATURE, lunar branch | named file retrieved, exactly one resolution-only trace |
| LITERATURE, Japanese branch | same, and the field label routed the right persona |
| BOTH | one app fact and one literature fact answering *distinct* questions |
| App-vs-literature contest | a question where a summary carries a number the app also carries: **the app wins outright and the literature figure is never folded in as a second sentence.** A direct test of an inherited rule that has no other test. |
| EXCLUSIONS refusal | strong refusal, names the register entry |
| Weak refusal | no address, no confirmed match, and the refusal states which it was |
| CONTESTED, one per register axis | §5.2 I5 |

**The `lit_review: yes` requirement lands here**, per A.10 step 2 and TDD Principle 7. Every fixture
asserting a quantitative fact names the primary source it validates against. That requirement
produces a clean structural ruling:

> **There are no quantitative LITERATURE fixtures.** A fixture asserting a number lifted from a
> summary rather than recomputed from the app is precisely the shape the inherited authority rule
> forbids: a summary's number arguing with the app's. Literature fixtures assert *retrieval and
> grade*, never values.

For APP fixtures the primary source is the app's own `model()`, and validation is a recompute, the
strongest grade the system has. For LITERATURE fixtures the primary source is the named summary, and
per A.10 step 2 whoever writes the fixture must have opened that summary and confirmed it says what
the fixture claims. The verification burden is on the fixture author at write time; catching
unverified source claims at review is mine.

### 5.2 Level 2: invariants over any question, testable without a known answer

No golden answer needed. These are properties the loop holds on every run.

**I1. Classification precedes retrieval, proved statically, not asserted at run time.** The
retrieval modules are not imported by the classifier module. A call-graph assertion over the source
tree. Cheap, exact, and it upgrades the inherited rule from a convention somebody remembers into an
architectural fact a build step enforces. Highest leverage per line in the suite, and the one I
would keep if I could keep only one.

**I2. Every claim-bearing sentence carries a trace.** `verify_report.js`'s backward half, run over
every generated answer, every time.

**I3. Every trace carries exactly one of the three legal grades.** §4.3 B3.

**I4. A missing input is a refusal, by fault injection.** Four decoys, each a real mutation, in the
project's own `--prove` style:

- an empty literature directory → the empty-population throw, never a confident REFUSE
- a missing `lsei/index.html` → refusal naming the missing clone, never a literature-only answer to
  a question that needed the app
- a register file that does not parse → startup refusal, not a run with the invariant silently
  disabled
- a register axis whose member path does not exist on disk → refusal for that axis, never a
  fall-through to search

The third is the one people forget and it matters most: a register that silently parses to zero rows
disables the entire §3 invariant while every other test in the suite still passes green.

**I5. The register invariant, with the decoy that actually discriminates.** One fixture per register
axis, asserting CONTESTED classification and both member files retrieved. Then the test that gives
it teeth:

> **Delete one member of a pair from the corpus and assert the answer flips to REFUSE**, with a
> named reason, and not to a one-sided answer.

Without the deletion decoy the invariant test passes trivially, because both files happen to be
present and an ordinary search would likely have found them anyway. The decoy is what proves the
invariant is doing work. Same lesson `verify_figure.js` learned expensively: a proof run against a
hand-built stand-in returns a false green, and only a mutation of the real artifact discriminates.

**I6. Classification misses are counted, not hidden.** A `MISCLASSIFIED` row (§3.7) is a finding in
`verify_answers.js`, reported with its denominator. A rising count is a register defect, and the
register is the thing that gets edited.

### 5.3 `verify_answers.js` extended, not restructured

Six outcomes, all named on every run, never collapsed:

```
ANSWERED   REFUSED   ERROR      self-reported by the router
MISCLASSIFIED                   self-reported: a register hit surfaced from a searched retrieval
REGISTER_FAIL                   self-reported: a deliverable failed section 4.3 twice
FILLED                          NEVER self-reported. Hand annotation, after human review, only.
```

The file's existing paragraph on why FILLED cannot be self-assigned is the best in the prototype and
survives verbatim. `MISCLASSIFIED` and `REGISTER_FAIL` are self-reportable because they are
observations about mechanism, not judgements about correctness. FILLED remains a judgement about
correctness, and remains a human's.

### 5.4 Level 3: what is not testable, said plainly

Three things, and no amount of suite design reaches them.

1. **Whether a retrieved summary supports the sentence beside it.** The trace proves the file
   resolves and that its body contains the matched topic words. It does not prove the file supports
   the claim. The prototype already prints this limit in every literature answer, and that line
   ships unchanged.
2. **Whether a refusal should have been an answer.** FILLED. A router cannot observe that it
   fabricated an answer it should have refused, because detecting that requires exactly the
   independent judgment the router is not.
3. **Whether the answer is any good.** Not a test.

The mechanism for all three is a **sampled human read with a stated rate and a stated denominator.**
N answers per week drawn from the run log, read against their sources by the author, annotated
FILLED where wrong. The run log already carries the column; what I add is the rate and one
requirement:

> **The sampling result is reported as a proportion with its denominator.** "Three FILLED" is
> theater. "Three FILLED out of forty sampled, of two hundred ten run" is a measurement.

That is the honest close on the TDD front end. The suite makes the mechanical failures impossible
and the judgment failures countable. It does not make them impossible, and a suite claiming
otherwise would be the exact epistemic theater Objective 4 exists to ban.

---

## 6. Gameplan steps

Numbered SE-n locally; the orchestrator assigns global numbers at 0.3. Dependencies on other Wave 1
agents' steps are named rather than assumed. TDD stages are separate ordered steps, per the brief
and per A.4's precondition, never folded into a build step.

| # | Step | Assigned To | Depends on |
|---|---|---|---|
| **SE-1** | **Freeze the answer contract.** One page naming: the six verdicts, the three trace grades as a closed set, the deliverable-is-a-file rule, and the run log's six outcomes. The artifact every later step is written against. Exists before any suite and any code. | The Software Engineer | none |
| **SE-2** | **Register schema, ratified.** Ratify the §3.6 schema with the two domain personas and The Engineer. `match_keys` is load-bearing; the domain personas own its contents, The Engineer owns its survival as structure in the merged corpus, I own the assertion that consumes it. Output is a schema plus one worked example axis, not the full register. | The Software Engineer, with The Growth Economist, The Space Resources Engineer, The Engineer | SE-1 |
| **SE-3** | **TEST SUITE, the answering loop.** `tdd_method.md` Prompt 1 applied to the loop rather than to a document. Levels 1 and 2 (§5.1, §5.2), minus the register fixtures, which do not exist yet. Every quantitative test names its primary source per A.10 step 2. Reviewed and made the contract before any loop code is written. | The Software Engineer | SE-1 |
| **SE-4** | **Rebuild retrieval.** `literature_search.js` per §1.2: field-scoped IDF, threshold set from SE-3's fixture set rather than by hand, no silent truncation, identity anchor gated on field match, `citationForFile`'s false corpus-size string removed. `listCorpusFiles` and `requireNonEmptyCorpus` carried over verbatim. | The Engineer, reviewed by The Software Engineer | SE-3, and The Engineer's merge landing with a field label per file |
| **SE-5** | **Build the classifier with three retrieval modes.** §1.4 step (b) and §3.5. Delete the lexicons and `decomposeSubClaims` (§1.3). The static call-graph assertion I1 is part of this step, not deferred; it is the step's own post-condition. | The Software Engineer | SE-2, SE-4 |
| **SE-6** | **Wire the wave selector.** §2. Verdict selects the wave; the file-versus-text-block choice selects tiered loop versus full A.4 loop. CONTESTED spawns two one-sided briefs in parallel, and the composition step has no licence to pick. | The Software Engineer | SE-5 |
| **SE-7** | **TEST SUITE AMENDMENT, register fixtures.** One fixture per register axis plus the I5 deletion decoy. Goes through A.10 step 5's revision gate, because it modifies a suite that is already the contract, and through step 2's source-verification gate, because each fixture cites a summary. Separate from SE-3 for a reason: the register does not exist at SE-3 time, and pretending otherwise produces fixtures written against an imagined schema, the exact defect `verify_figure.js` recorded. | The Software Engineer | SE-2, the two domain personas' registers, SE-3 |
| **SE-8** | **Build the register enforcement checks.** `verify_haiku.js` and `verify_register.js` (§4.2, §4.3), each with `--prove` decoys built by mutating real produced output rather than constructed strings. | The Software Engineer | SE-1, and The Editor's prohibition text from 0.4 for B2's closed list |
| **SE-9** | **Extend `verify_answers.js` to six outcomes.** §5.3. Small, and last among the mechanism steps because the outcomes it counts must all exist first. | The Software Engineer | SE-5, SE-6, SE-8 |
| **SE-10** | **Fault-injection pass.** I4's four decoys, run against the assembled loop rather than against unit stand-ins. A decoy that fails to apply is a failure, not a skip. | The Software Engineer | SE-9 |
| **SE-11** | **Sampling protocol, and it is a document.** §5.4. Rate, denominator, annotation procedure. Prose-producing, so it takes the full TDD stages: **SE-11a test suite; SE-11b topic-sentence outline validated against it; SE-11c write; SE-11d revise** per `tdd_method.md` Prompt 4. | The Writer, with The Software Engineer on the suite | SE-9 |

**Note for 0.3.** SE-4 and SE-5 sit downstream of The Engineer's merge. If the merge slips, SE-3
still runs, since the suite is written against the contract, not against the corpus, which is the whole
point of writing the suite first. SE-7 is the only step that genuinely cannot start early.

---

## 7. Context recipes

| Step | Agent | Files / Excerpts |
|---|---|---|
| SE-1 | The Software Engineer | This analysis. `lsei/oracle/answer_question.js` header comment. `lsei/report-generator-prompt.md` steps 4 and 5, plus "What a green result does not mean." The gameplan's design intent section. |
| SE-2 | The Software Engineer + 3 | §3.6 of this file. The two domain personas' 0.2 registers. The Engineer's merge taxonomy. Do not load the corpus. |
| SE-3 | The Software Engineer | SE-1's contract. `cr-agents/method/tdd_method.md` (full). `operational_guide.md` A.10 (full). `lsei/oracle/verify_answers.js` and `verify_figure.js` header, as the `--prove` precedent. Ten to fifteen sample questions drawn from the two domain personas' question surfaces. |
| SE-4 | The Engineer | `lsei/oracle/lib/literature_search.js` (full). SE-3's suite. The merged `literature/` tree listing with field labels. Six summaries, three per field, read in full. |
| SE-5 | The Software Engineer | `lsei/oracle/answer_question.js` (full). `lib/address.js` (full). `lib/exclusions_match.js`. SE-2's schema. SE-4's rebuilt module signature only, not its body. |
| SE-6 | The Software Engineer | §2 of this file. `operational_guide.md` A.3.3 and A.4. The A.12 roster entries for the two domain personas only. |
| SE-7 | The Software Engineer | SE-3's suite. The completed registers. The named member summaries, read in full, since A.10 step 2 requires it and there is no way around opening the files. |
| SE-8 | The Software Engineer | §4 of this file. The Writer's register spec and The Editor's prohibition from 0.4. `lsei/report-generator-prompt.md` step 5 and the verifier at the end of that file. |
| SE-9 | The Software Engineer | `lsei/oracle/verify_answers.js` (full). §5.3 of this file. |
| SE-10 | The Software Engineer | The assembled loop. §5.2 I4. `verify_figure.js`'s `--prove` implementation as the pattern. |
| SE-11 | The Writer, The Software Engineer | §5.4. `cr-agents/supplements/writing-guides/style.md` and `structure.md`. SE-11a's suite. |

---

## 8. Where I disagree with the plan as written

Four things, stated because the brief asks me to be direct.

**8.1 The register cannot be written by the domain personas alone, and the gameplan assumes it
can.** The register's hard field is `match_keys`, the terms a classifier tests a sub-claim against
before retrieval. That requires knowing how a *user phrases a question*, which is neither pure
domain knowledge nor pure retrieval engineering. The gameplan hands the register to the domain
personas and the assertion to me, and nobody owns the join. SE-2 exists to own it. If SE-2 is
dropped, the registers arrive with excellent `axis_statement` fields and `match_keys` that never
fire, and every register test passes while the invariant does nothing.

**8.2 The corpus needs a machine-readable field label per file, and this is a retrieval requirement,
not a taxonomy preference.** §1.2 item 1. The pooled IDF table is the concrete break at merge and
the fix needs a field label. The Engineer is designing the taxonomy for navigability; he should know
retrieval has a hard requirement on it, and that "eight topic folders plus some new ones" does not
satisfy it unless the top-level split is by field.

**8.3 The prototype's parser should be deleted, and I expect this to be the contested call.** It is
120 lines of working, commented, thoughtfully built regex, and deleting working code feels wrong.
But it is the only component whose entire justification, no model in the loop, A4 has removed.
Keeping it means maintaining an English parser alongside a language model already in the process.
**Under the alternative to A4**, where the Oracle must run outside Claude Code, this ruling inverts
completely: the lexicons become load-bearing again and must be extended to cover two fields, which
is substantial work nobody has scoped. A4 is doing real work here and should not be quietly relaxed
later without reopening this.

**8.4 `verify_report.js` is a dependency the gameplan does not list.** Three of my mechanisms reuse
it: B1's backward half, `verify_haiku.js`'s claim-bearing token definition, and I2. It lives in
`lsei/`, a floating working copy under A3 that is never pushed. So a check this project's law
depends on can change upstream between sessions, and under A3 it can change silently. Either it is
vendored into `oracle/` with a recorded sha, the report generator's own "recorded observation,
vendored at generation" posture, which exists for exactly this reason, or Open Question 3 is
answered "pinned" for at least this file. **This is a Systems Engineer question my design has just
made urgent, and I flag it to him rather than deciding it.** Under A3 as stated I proceed, noting
that A3 is described as a drafting convenience rather than a ruling.

---

*The Software Engineer, sub-step 0.2, Wave 1.*
