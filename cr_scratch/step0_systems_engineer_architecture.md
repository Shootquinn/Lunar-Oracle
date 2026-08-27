# Step 0.2. The Systems Engineer: repository and bootstrap architecture

**Persona:** The Systems Engineer (Frederick P. Brooks Jr.)
**Sub-step:** 0.2, Wave 1, parallel
**Objective covered:** 2 (stand up the repository), plus the mechanism half of 5 (first-run state)
**Date:** 2026-08-26
**Assumptions used:** A1 (public), A2 (ruling, corpus is here), A3 (float, and I overturn its downstream half in part 2), A4 (Claude Code only), A5 (stated per finding)

Six parts as briefed, then the separate position on sole computational authority, then the gameplan
steps and their context recipes.

Everything below rests on facts read off the trees this session. Where I checked something
mechanically I say what I ran, because a claim about what `.gitignore` does is worth nothing without
it.

---

## Part 1. The bootstrap contract

### The starting state is not the one the seed assumed

A clean clone of Lunar Oracle now arrives holding `CLAUDE.md`, `lunar-oracle-gameplan.md`,
`accumulator.md`, `.gitignore`, `cr_scratch/`, the merged `literature/` (summaries only), `oracle/`
once it exists, and `README.md` once it is written. It arrives without `cr-agents/`, without `lsei/`,
without `_intake/`, and without a single PDF.

That inverts the seed's assumption in one consequential way. **The corpus is present before the
bootstrap runs and the app is not.** There is a window, from clone until `lsei/` lands, in which this
system holds 182 sources of literature and no model. That window is exactly the state in which the
inherited rule "the app is the authority" cannot be honoured, and it is also the state in which
honouring it is most tempting to skip, because the corpus is right there and full of numbers.

The bootstrap's job is to make that window visible and to make it end in a refusal rather than in a
plausible answer.

### Order

1. **Locate.** Establish the repository root by finding `lunar-oracle-gameplan.md`, not by trusting
   the working directory. A session opened in a subdirectory must not silently bootstrap a different
   tree.
2. **Preflight.** Record three facts without acting on them: is `git` available, is the network
   reachable, is Node available (the prototype tooling in `lsei/oracle/` is Node, and the Scenario
   Explorer's own README names Node as the one dependency the app itself does not share). Preflight
   does not clone. It establishes which degraded mode applies before anything is attempted.
3. **Acquire.** Clone the two working copies to `cr-agents/` and `lsei/` **at the repository root**.
   Immediately disable push on both (see the hazard below).
4. **Verify.** Assert the load-bearing paths exist rather than assuming a successful `git clone`
   produced them: `cr-agents/method/operational_guide.md`, `cr-agents/prompt0.md`, `lsei/index.html`,
   `lsei/lunar-scenario-explorer-map.md`, `lsei/literature/`. Assert `literature/` at our root is
   present and non-empty; if it is missing, the clone of Lunar Oracle is broken and the bootstrap is
   not the thing that failed.
5. **Record and report.** Write the install state record. Report what was cloned, at what ref,
   whether that ref matches what this repository was last verified against, and what is degraded.
6. **Read sequence.** `cr-agents/method/operational_guide.md`, then `cr-agents/prompt0.md` (first
   session only, skipped on compaction recovery), then `lunar-oracle-gameplan.md`.
7. **First-run sequence**, gated on the flag and on a non-degraded bootstrap.

Phases 1 through 6 are idempotent and run every session. Only phase 7 is once. That distinction is
the whole of part 5, and I state it here because the natural mistake is to gate the bootstrap itself
on the first-run flag, after which a working copy deleted last Tuesday is never noticed again.

### The failure behaviour, which is the actual contract

Six modes. A bootstrap that only describes the happy path is a description, not a contract.

**Missing, recoverable.** Working copy absent, git and network present. Clone it. This is the normal
path and it is the least interesting thing the bootstrap does.

**Offline.** Working copy absent, network unreachable. The system cannot become itself. **Refuse, do
not degrade.** State it plainly: the app is not on disk and cannot be fetched, so no quantitative
question is answerable in this state. A qualitative literature answer remains possible and must carry
the degraded state on its face. This one matters more than the other five together, because the
fallback here is invisible: an answer sourced from a summary that happens to carry a number looks
exactly like an answer computed from the app. The inherited rule already decides it ("a missing input
is a refusal, not a fallback"). The bootstrap's contribution is to make the refusal happen at
bootstrap time rather than at answer time, because a refusal discovered mid question has already cost
the user the question.

**Moved on.** Working copy present, HEAD differs from the ref this repository was last verified
against. Report the difference and its direction. Do not reset, do not bump. This is part 2, and the
bootstrap's only duty is to notice.

**Dirty or locally diverged.** Working copy present with uncommitted modifications, or on a branch
other than the recorded one. The author edits the Scenario Explorer in another window; that is his
repository and this is a working copy of it sitting inside a different project. Report; never
`reset --hard`, never `clean`, never `checkout` across a dirty tree. **A bootstrap that can destroy
uncommitted work in somebody else's repository is a defect no matter how convenient the reset is.**
There is a consequence for authority as well: a working copy with local edits is no longer the
upstream authority, it is a local variant, and an answer computed against it should say so.

**Present but wrong.** The directory exists and is not a git repository, or its `origin` points
somewhere other than the expected upstream. Refuse and report. Do not clone over it and do not delete
it. Something put it there on purpose.

**Partially acquired.** One working copy landed and the other did not. Do not proceed as though the
method is optional because `cr-agents/` failed, and do not proceed as though the model is optional
because `lsei/` failed. Both are preconditions for a full session, and the report names which one is
absent.

### Two live defects found on disk

**The push hazard, and it is real right now.** Both working copies are configured with push URLs to
their upstreams:

```
git -C lsei remote -v
origin  https://github.com/Shootquinn/lsei-lunar-scenario-explorer.git (push)
```

"Cloned and never pushed" is stated as design intent in the gameplan, in the directory map, and in
`.gitignore`'s own comment, and it is enforced by nothing. One line each at bootstrap converts intent
into mechanism:

```
git -C lsei      remote set-url --push origin DISABLED
git -C cr-agents remote set-url --push origin DISABLED
```

This closes the only path by which Lunar Oracle could damage the authority it depends on. It costs
nothing and it is the cheapest guarantee in this document.

**The stale `deps/` path.** The provisional `CLAUDE.md` still clones into `deps/cr-agents` and
`deps/lsei`, and `accumulator.md` still cites `deps/cr-agents/templates/accumulator.md`. Every other
statement in this repository (the directory map, the context recipe table, `.gitignore`'s comment,
all five Wave 1 briefs) names `cr-agents/` and `lsei/` at root. I checked whether this leaks:

```
git check-ignore -v deps/cr-agents/README.md
.gitignore:6:cr-agents/   deps/cr-agents/README.md
```

It does not leak, because the patterns are unanchored and match a directory of that name at any
depth. So this fails as a **silent path split** rather than as a commit of the app: on a clean clone
today the bootstrap populates one location and every reader in the project looks in another.
Correcting it is the first task of the `CLAUDE.md` step. The same unanchored patterns are a separate
hazard, treated in part 3, Break 5.

---

## Part 2. Pinned or floating

### The case for floating

The app is a live artifact that recomputes on every slider move. The entire reason it is not vendored
is that a copy of an authority drifts. Floating is the consistent extension of that position: the
authority is whatever the authority currently says. No bump commit exists to be forgotten, staleness
cannot accumulate by construction, and the author's own edits to the Scenario Explorer appear in the
Oracle the next time the working copy is pulled. This is the posture the author asked for and it is
not a naive one.

### The case for pinning

An upstream change breaks the Oracle silently, and the coupling that would break is tighter than "we
read a file." The prototype resolves addresses against the app's own `PRESETS`, `DETENTS` and
`model()` return keys, and reads a `KNOB_DATA` island out of `index.html`. There is a second coupled
artifact, `lunar-scenario-explorer-map.md`, which is generated and which the gameplan records will
fail if hand edited. Two upstream files therefore carry a schema between them that nothing in this
repository owns. Rename a detent upstream and this Oracle's answers change, or fail, with no local
edit and no local signal.

The costs, stated so they can be compared rather than asserted:

- **Floating costs silent breakage and unreproducible answers.** The second is the one usually
  missed. Trace discipline here is graded and says which grade it is. A recompute-grade scalar
  computed against an unnamed version of the model is a recompute against an unnamed model, which is
  a weaker claim than the grade advertises.
- **Pinning costs one line, occasionally, and staleness with a name on it.** The re-committing the
  author objected to was a 894,127-byte file on every upstream change. A forty-character ref bumped
  when somebody chooses to bump it is a different object, and the objection does not transfer to it
  unmodified.

### The ruling

**I recommend neither as stated. Record the ref, float the checkout, and make the difference
visible.** I am overturning A3 in its downstream half and leaving its drafting half alone.

Concretely: this repository records, in the install state record, the ref each working copy was last
verified against. Bootstrap clones or fetches at `main` and then compares HEAD against that record.
Three outcomes. Equal, and nothing is said. Ahead, and the report says the app has moved N commits
since this Oracle was last verified against it. Unrelated or behind, and the report says so loudly.
Nothing auto-resets and nothing auto-bumps. **The bump is a human act, taken at a moment the system
chose to raise.**

That is pinning's reproducibility with floating's currency, and it costs one field in a file that
part 3 and part 5 both need anyway.

Why not a hard pin: a hard pin makes the app stale by default, and the staleness is invisible in
precisely the same way floating's breakage is invisible. Trading one invisible failure for another is
not a decision.

Why not pure floating: an answer that cannot name the model it was computed against is not traced,
and this project's whole posture is that a trace says which grade it is.

**A3 as stated ("the working copies float on main for drafting purposes") is correct for Step 0 and
must not survive into the answering loop.** Drafting a gameplan does not compute anything. The moment
an answer carries a number out of `index.html`, the ref is part of that answer's provenance. Per A5,
here is what changes under the other assumption: if the author rules for a hard pin, the drift report
becomes a bump prompt, and the only thing lost is that the working copy is stale between bumps by
default rather than current by default. The state record is identical either way, which is why I am
comfortable recommending the middle.

**The stronger form, named and not required.** If each answer's trace record carries the app ref it
was computed against, reproducibility becomes a property of the answer rather than of the repository,
and the pinning question mostly dissolves. That is The Software Engineer's to build. It is mine to
place on his requirements.

---

## Part 3. Where the directory map breaks

The map is the author's ruling and I am not revising it. What follows is stress.

The map is one table with two columns of intent, and it is about to govern four kinds of file: this
project's own writing, somebody else's live artifact, somebody else's published source, and machine
generated state about this particular install. It has rows for the first three and none for the
fourth. Every break below sits at a boundary the table has no row for.

### Break 1. The fork. `lsei/literature/` gains a source after our merge lands

The sharpest, and the one named for me.

After the merge, `literature/` at our root is a fork of an upstream corpus that keeps moving. The map
describes the corpus as "this project's own writing, static." It is our own writing. It is not
static: 63 of the 182 sources came from upstream and upstream can add a 64th tomorrow. The map's
justification for pushing the corpus while refusing to push the app rests on two legs, ownership and
stasis, and the moment stasis fails the argument needs its second leg to hold alone.

It does hold. **The corpus is our writing regardless of whose sources it describes**, and that is
what licences it and what justifies pushing it. But the operational consequence still lands, and here
is what the system does about it.

1. **Provenance records the upstream ref, not just the upstream origin.** The Engineer owns where
   provenance lives and in what format. I own the requirement that it exists and that it names a ref,
   because without a ref there is no way to ask the only question that matters here: what changed
   upstream since we merged.
2. **A corpus drift check runs at bootstrap, not at merge time.** Compare the filename set of
   `lsei/literature/` against the provenance record, and compare the content hash of each
   upstream-sourced file against the hash recorded at merge. A new upstream file is reported as
   unmerged. A changed upstream file is reported as diverged. **Report, never merge.** Merging is a
   step with a persona on it, not something a bootstrap does while nobody is looking.
3. **Direction of authority is asymmetric and stated.** For lunar-side literature, upstream is the
   authority on what exists and we are the authority on what our summary says. We do not push
   corrections upstream (we cannot; push is disabled by part 1) and we do not silently absorb upstream
   changes. A diverged pair is a finding for The Fact-Checker.

This interacts with part 2 exactly as the brief anticipated, and the interaction is the useful part:
**the same ref that answers "which app" answers "which upstream corpus."** One state record, two
consumers, one bootstrap-time comparison covering both. That is an argument for a single mechanism
rather than two, and it is the first piece of evidence in this document that the project is one thing
rather than three.

### Break 2. `_intake/` is gitignored in full, and A2 says the corpus lives there permanently

Checked:

```
git check-ignore -v _intake/japanese-miracle/lit/x.md
.gitignore:15:_intake/   _intake/japanese-miracle/lit/x.md
```

So on disk today the 119 Japanese Miracle summaries do not push. A2 says the corpus is here
permanently and that summaries push. The map says `_intake/` "empties as the merge lands." Three
statements, consistent under exactly one reading: **`_intake/` is a location the summaries pass
through, and permanence attaches to the repository rather than to the path.**

Say that in the map, because the other reading (that the summaries are permanent at `_intake/`) asks
for a directory to be simultaneously permanent and gitignored, and it means that until the merge
lands this repository's headline deliverable is invisible to anyone who clones it.

A corollary the map does not state and should: **the merge is not complete until `_intake/` is
empty.** That is a testable postcondition on The Engineer's step rather than a description of a
tendency.

### Break 3. The PDFs have no row once `_intake/` empties

The map ignores `literature/**/*.pdf` and ignores `_intake/` wholesale, so the PDFs are excluded
throughout. Correct. But the two rows together mean something the map never says: **the author's
`literature/` and a fresh clone's `literature/` are permanently different trees with the same name,**
one with PDFs beside the summaries and one without. Nothing tells a session which one it is sitting
in.

The consequence is small and certain. A session that cannot tell will eventually offer a reader a
source PDF that a clean clone does not have, or decline to read a PDF that is sitting right there.
The bootstrap should state PDF presence as a fact about this install, once, in the state record.

### Break 4. The treaty texts are neither summaries nor PDFs, and `.gitignore` only knows about PDFs

`_intake/japanese-miracle/lit/` holds three `.txt` files: `un-1967-outer-space-treaty.txt`,
`un-1972-liability-convention-space-objects.txt`, and `un-1979-moon-agreement.txt`. They are full
source text, not summaries. Their `.md` summaries sit alongside them and are among the seven `.md`
files in that folder with no paired PDF.

I checked what `.gitignore` does with a non-PDF under `literature/`:

```
literature/foo.pdf     ignored (.gitignore:11)
literature/foo.PDF     ignored, but only because core.ignorecase=true on this machine
literature/foo.docx    NOT IGNORED
literature/treaty.txt  NOT IGNORED
```

So on the day the merge moves those three files into `literature/`, full third-party source text
pushes into a public repository whose licence statement, inherited from the posture in
`lsei/README.md` and `lsei/NOTICE.md`, says that no extracted source text is present.

Whether UN treaty text is copyrightable is a genuine question and it is not this question. The
question is whether the repository's own licence statement remains true, and unaddressed it does not.
**This means the answer to Open Question 8 is already "yes, at least three" before The Engineer reads
a single summary,** discovered from the file listing rather than from summary contents. The rest of
OQ8, whether any summary reproduces source text, remains his.

Note the `foo.PDF` line as well. It is ignored on this machine only because Git for Windows sets
`core.ignorecase=true`. On a case-sensitive clone it is not ignored. The current pattern set is
therefore machine-dependent, which is the worst property an enforcement layer can have.

**The architectural fix, and it generalises past this instance.** The map is an inclusion list and
`.gitignore` is an exclusion list, so the enforcement layer fails open for every file type nobody has
thought of yet. Invert it for `literature/`: deny everything, then re-admit `*.md`.

```
literature/**
!literature/**/
!literature/**/*.md
```

Then a `.docx`, a `.txt`, a page image, or a format nobody has considered fails closed. For a public
repository holding other people's papers, closed is the right direction to fail.

### Break 5. The working-copy patterns are unanchored

`cr-agents/` and `lsei/` without a leading slash match a directory of that name at any depth. Today
that accidentally rescues the stale `deps/` bootstrap described in part 1. Tomorrow it silently
swallows `literature/lsei/` if the merge taxonomy ever produces a folder by that name, and the merge
taxonomy is being designed this session by somebody who has not read this file. Anchor them:
`/cr-agents/`, `/lsei/`.

### Break 6. No row for machine-generated state

Part 2 needs a ref record. Break 1 needs a provenance and drift record. Part 5 needs a first-run
flag. The map has no row for state this install generates about itself, and the default for an
unlisted path is untracked and therefore committed on the next `git add`. For the first-run flag that
default is actively harmful: the author's committed flag suppresses the opening sequence for every
person who clones afterwards.

Give state a row. One file at root, machine-written, ignored, never committed. And state the flip
side, because it is what keeps the row honest: **anything that must survive a clone is not state, it
is content, and it belongs in the gameplan or in the corpus.**

### Break 7. `cr_scratch/` is pushed and is written by an unbounded process

Committing agent handoffs for audit is a good decision and I am not arguing with it. The break is
that `cr_scratch/` is the one pushed directory whose contents are produced by a process with no
natural stopping point. The gameplan itself records that the Japanese Miracle project left 140 files
of `cr_scratch` behind. The map should say whether `cr_scratch/` is a permanently growing record or
is archived per step. This is a small problem now and an irritating one in a year.

### Break 8. The boundary the map does not draw at all

`OneDrive/PROJECTS/CC/CSA_LSEI_Workshops` is 4.1 GB of material outside this repository. It holds 163
PDFs that pair to Scenario Explorer summaries by directory adjacency, and The Engineer is drafting a
step to pull from it. It is a **source of material and it is not a dependency.**

The map needs that stated as a non-row, in one sentence: **no path outside this repository and its
two working copies is read at runtime.** The workshops folder is read once, by a human-supervised
pull step, and never by the answering loop. Without that sentence it becomes a third de facto
dependency that exists on exactly one machine, and an Oracle that works on the author's laptop and
nowhere else is a setup rather than a system. The same sentence covers the original Japanese Miracle
folder, which Open Question 7 may delete.

---

## Part 4. Authority without pushing

### The boundary, in one sentence

**Lunar Oracle owns questions and answers. It does not own the model, and after the merge it owns the
corpus only as writing.**

Three authorities. Each needs a location, an ownership statement and a failure mode. The map supplies
the first for all three and the third for none.

| Authority | Location | Ownership | Failure mode |
|---|---|---|---|
| The model | `lsei/index.html`, plus the generated map | Borrowed, cloned, never copied | Absent, or stale and unnamed |
| The corpus | `literature/` at our root | Ours as writing; the scholarship belongs to 182 publishers | Divergence from upstream (Break 1); licence overreach (Break 4) |
| The method | `cr-agents/` | Borrowed, cloned, never copied | Absent. Less consequential, because a method change does not silently change a number |

The corpus row is the new thing, and it is why the brief asks what "owns" means now. Ownership here
is layered rather than binary. We own the summaries as authored text, which is what licences them and
what justifies pushing them. We own none of the underlying scholarship, which is what forbids pushing
the sources and what makes Break 4 a real problem rather than a pedantic one.

### What "the app" means when the local clone is a week stale

The honest answer is that "the app" is not one thing. It is a pair: the model as published, and the
model on this disk. The Oracle can only compute against the second and can only cite the first.

Exactly one thing bridges them: **the answer names the ref it was computed against.** With the ref, a
week-stale clone is a stated condition rather than a defect, and any reader can check out that ref
and reproduce the number. Without it, staleness is undetectable and the trace grade is systematically
overstated. The ref is therefore not a nicety appended to a trace. It is what converts "the app is
the authority" from a slogan into a checkable claim.

### A concrete trap in the prototype tooling, found this session

`lsei/oracle/answer_question.js` resolves its corpus like this:

```js
const DEFAULT_LIT = firstExisting([
  path.join(__dirname, '..', 'literature'),
  path.join(__dirname, '..', '..', 'lsei-lunar-scenario-explorer', 'literature'),
]);
```

Run in place from our tree, `DEFAULT_APP` resolves correctly to `lsei/index.html`, and `DEFAULT_LIT`
resolves to **`lsei/literature/`**: the upstream corpus of 158 files, not our merged 182. The
prototype tool invoked without `--lit` therefore answers from the child corpus while the adult sits
one directory up, and nothing in its output says which corpus it used.

That is Break 1's failure mode arriving through a code path instead of through a merge, and it is
live the first time anyone runs the prototype tooling in place. Any step that invokes it must pass
`--lit` explicitly at our root corpus, and the acceptance suite must assert which corpus was actually
used. Building that is The Software Engineer's. Naming the boundary is mine.

### The rule, stated for the map

The app is never copied here. After the merge the reverse rule needs stating too, because it did not
exist before: **our corpus is never copied there.** Push is disabled at bootstrap, which enforces the
second mechanically. The first is enforced by `.gitignore` and by nobody being tempted, which is
weaker, and it is another reason to do the deny-by-default inversion in Break 4. An anchored
`/lsei/` plus a denied `literature/**` means a copy of the app landing anywhere under `literature/`
fails closed.

---

## Part 5. First-run state

"Once" decomposes into four questions plus one nobody has asked. The map answers none of them and
nobody else owns them.

### Where the flag lives

At the repository root, in the machine-written install state record, ignored by `.gitignore`.

The alternatives all fail, and each fails in a way worth recording so it is not re-proposed:

- **In the gameplan.** The gameplan pushes. A committed flag suppresses the opening sequence for
  every person who clones after the author's first run, which is the exact opposite of the intent.
- **In `cr_scratch/`.** Also pushed. Same failure.
- **In the OS temp directory.** This is where the prototype correctly puts its run log, because a run
  log is per-run. A first-run flag is per-install, and temp is cleared, so the sequence would replay
  at unpredictable intervals forever.
- **In the user's home directory.** Then a second clone into a different folder believes it has
  already run, and a genuinely fresh install gets no introduction.

Per-install, at root, ignored, is the only location where "once" means what a user means by it.

### Absent, because they cloned fresh

Play the sequence. This is the intended case, not an edge: a fresh clone is a fresh install and the
sequence is that install's introduction. It is also the reason the flag must be uncommittable rather
than merely uncommitted.

### Present, because they re-ran

Do not play the sequence. **Run the whole bootstrap anyway**, in full, including verification, drift
checks and degraded-state reporting, and report tersely. Only phase 7 is gated. The natural mistake
is to gate the whole bootstrap on the flag, reasoning that setup is already done, after which a
working copy deleted last Tuesday is never noticed again.

### A second clone on a second machine

Plays again, and that is correct rather than a bug. The flag is per-install because the sequence
introduces an install, not a person. If the author finds this annoying in practice, the fix is a
documented opt-out that he sets deliberately, not a shared flag that pushes.

### The question nobody has asked: what does the flag record

If the record is `shown: true` and nothing else, a bootstrap that died halfway through the sequence
cannot tell whether to resume or replay, and a half-played whimsical introduction is the specific
failure mode of exactly this kind of flag. Record enough to answer it: a timestamp, the schema
version of the state file, and whether the bootstrap that wrote it completed. Two extra fields buy
recoverability.

### The interaction with degraded bootstrap

**The sequence plays only after a bootstrap that fully succeeded.** A whimsical introduction to a
system that is about to refuse every quantitative question is worse than no introduction, and it
burns the one first impression the project gets. A degraded bootstrap reports the degradation and
leaves the flag unset, so the sequence plays for real the first time the system actually works.

The content of the sequence is The Writer's at 0.4 and I have said nothing about it.

---

## Part 6. Conceptual integrity, as a position

### The position

**This is one project. The single design vision is: one question, one traced answer, computed against
authorities that are borrowed rather than copied. The corpus merge, the bootstrap and the answering
loop are not three projects; they are the three things that sentence requires. But the vision is
currently carried by inheritance rather than by design, and that is the specific thing I expect to
fail at 0.5.**

### Why the three pieces are not independently motivated

"They share a directory" is not integrity, and neither is "they are all good ideas." The test is
whether removing one leaves the others standing. Remove the merge and the answering loop returns
lunar answers wearing general clothes, which is the prototype the author already has. Remove the
bootstrap and the loop computes against a copy, which the inherited rules forbid and which drifts.
Remove the loop and the merge is a library nobody queries. Each is load-bearing for the other two.
They pass the test.

### The strongest evidence, and it is not mine

The inherited rules are five statements of a single posture: the app is the authority; classification
before retrieval; graded trace discipline that says its grade; a missing input is a refusal; a
reference a machine cannot follow is a copy. Read together they say one thing. **Never let an answer
look better than its provenance.**

Every one of my six parts turned out to be an application of that sentence, and I did not go looking
for it. The refusal in offline mode is "a missing input is a refusal." The ref on the trace is
"graded trace discipline." The fork detection in Break 1 is "a copy drifts." The deny-by-default
`.gitignore` in Break 4 is the same rule pointed at licence instead of at numbers. When six
independent architecture questions all resolve against the same five rules, the architecture has a
single vision in the sense that matters. The mind whose vision it is happens to be the Scenario
Explorer's.

### Which is precisely the vulnerability

The five rules were paid for by a project in which one app was the authority over everything
quantitative in the room. Lunar Oracle now holds a corpus larger than its app, containing economics
the app does not model at all. **The merge is the load the inherited vision has not yet carried.** If
the sole-authority question resolves toward two authorities, the inherited posture does not extend
unmodified, and this project needs a rule of its own that the Scenario Explorer never had to write:
one rule, in one voice, covering both. Whether the integrated draft writes one, or writes two rules
that are each locally reasonable, is what I will judge at 0.5.

### Three falsifiers, committed in advance

I return at 0.5 to rule against this position if I should, so here is what would move me. Stated as
tests rather than as sentiments, so that a later disagreement with myself is visible rather than
deniable.

1. **The seam test.** If the integrated draft has a step where the corpus is retrieved and a separate
   step where the app is queried, and no step where one mechanism decides which comes first, then the
   merge and the loop are two projects sharing a repository. Classification-before-retrieval demands
   that a single mechanism decide before either source is touched. If that mechanism has no owner and
   no step in the drafted gameplan, I rule against my own position at 0.5.
2. **The state test.** Part 2's ref record, Break 1's provenance and drift record, and part 5's
   first-run flag are three demands for one thing: a single place where this install records what it
   knows about itself. If the integrated draft produces three separate mechanisms for these three
   needs, that is a committee outcome in the precise sense, three independently reasonable decisions
   that do not cohere, and it is the cheapest available evidence for the trenchcoat. If it produces
   one, it is the cheapest available evidence against it. **This is the test I most expect to fail,
   because the three needs arrive from three different Wave 1 agents and nobody downstream of me is
   obliged to notice they are the same need.**
3. **The register test.** The haiku orchestrator and the no-theater team contract look, on their
   face, like the least integrated thing in the plan: a whimsy layer bolted to a rigour layer. My
   position is that they are one decision rather than two, because both say the presentation must
   never add confidence the provenance did not earn, one by being transparently ornamental and one by
   being transparently plain. If 0.4 returns a register specification that reads as decoration rather
   than as that rule, Objective 4 is a fourth project and my position was wrong.

### What I am not confident about

The merge has not run. If The Engineer reports at 0.2 that the 95 overlapping pairs disagree
substantively and the corpus needs a rewrite pass to reach one house format, then the merge is a
project in its own right on schedule alone, and cohering it with a bootstrap and an answering loop
inside one gameplan will be optimistic in a way that is familiar to anyone who has watched a large
system get planned. That is not the same failure as three projects wearing a trenchcoat. It is one
project attempting three things at once, which fails differently and just as reliably. I flag it now
so that at 0.5 I cannot pretend I did not see it coming.

---

## The separate position: does the app remain the sole computational authority?

Stated separately as instructed, and deliberately not folded into part 6.

### The position

**The app remains the sole authority over anything it computes, and it was never the authority over
anything else. The rule does not need weakening. It needs its scope stated, which the prototype never
had to do because nothing else was in the room.**

### The argument

Read the prototype's rule precisely: "a question the app can answer is answered from the app, never
from a literature summary that happens to carry a number." It has an antecedent. It is a rule about
**arbitration between two sources that both hold a number for the same quantity**, and it settles
that arbitration for the app for a stated reason: the app recomputes, the summary holds a stored
number, and a stored number is a copy, and a copy drifts.

It is not, and never was, a claim that the app is the only permissible source of quantitative
statements. The merged corpus contains growth accounting the app does not model. There is no
arbitration to lose, because there is no competing value.

The restatement, in one sentence: **where the app computes a quantity, the app's value is the answer
and no summary may supply it; where the app does not compute a quantity, the corpus may supply it,
and the answer says which of the two it came from and at what grade.**

### The two conditions that make this a scoping rather than a loosening

**One. The boundary must be enumerable, not judged per question.** "Does the app compute this" cannot
be settled by the answering loop's opinion in the moment, because the loop's opinion is exactly what
the rule exists to overrule. The app publishes `KNOB_DATA`, and the prototype's `address.js` already
resolves candidate keys against the app's own `PRESETS`, `DETENTS` and `model()` return keys before
trusting them. **The app's computable surface is mechanically enumerable, and the prototype already
enumerates it.** That enumeration is the boundary. This is also why classification must run before
retrieval rather than after: the classifier's first act is to ask the app whether the quantity is
inside its surface, and only then to decide where to look. A question routed to the corpus that the
app could have computed is the failure this rule was written to prevent, and it is detectable after
the fact by re-asking the app, which makes it testable.

The evidence I need and do not have is which classes of question the app actually answers. The Space
Resources Engineer is drawing that boundary in parallel. My position is stated so that his answer
populates it rather than changes it.

**Two. The grades are not the same and must never be reported as the same.** An app-computed scalar
is recompute-grade. A corpus-sourced number is, at its very best, a resolution-grade citation to a
value somebody else computed, in another economy, under conditions the Moon may invert. The Growth
Economist arrives with exactly this finding: catch-up requires a technological leader and the Moon has
none; congruence says terrestrial technique was selected under a factor-price vector the Moon
inverts. **A corpus number crossing into a lunar answer is not a fact, it is a transfer, and it
carries the burden of naming why the transfer is legitimate.** That is the one genuinely new
discipline this project needs and the Scenario Explorer never had to write, because it never had an
adult corpus to be tempted by.

### Where I expect to disagree with The Growth Economist

I expect he pushes toward the corpus being co-authoritative in its own domain, on the grounds that
growth accounting is a body of evidence rather than a lesser kind of knowing. I do not disagree with
that as epistemology and I do disagree with it as architecture. Two co-equal authorities means every
question has a place where two answers meet and something must arbitrate, and arbitration after
retrieval is the precise thing that "classification happens before retrieval" was written to forbid.

My formulation gives him everything the epistemology requires: the corpus answers, in full, whatever
the app cannot compute. What it refuses is a second seat at the table for the same quantity. If he
wants more than that, the disagreement is real, and it is about whether a lunar quantity may ever be
sourced from terrestrial evidence in preference to the app's own recomputation. That one goes to the
author, and it should be surfaced rather than resolved.

### Assumption dependence (A5)

Under A4 (Claude Code only) this is cheap. The classifier is a step in a conversation with the app's
own enumeration sitting on disk, not a service to stand up. Under a different runtime the enumeration
would have to be published as a separate artifact with its own currency problem, and the whole
mechanism gets heavier. A4 is doing real work here and it is allowed to.

---

## Gameplan steps

Numbered `SE-1` through `SE-9` because four other agents are numbering in parallel this session.
Ordering within the set is fixed and stated. The integrator renumbers at 0.3; the dependencies are
what must survive renumbering.

**One placement constraint crosses agents: SE-1 must land before The Engineer's merge step executes.**
The merge is what moves files into `literature/`, and SE-1 is what makes `literature/` safe to move
files into. Everything else in my slice can be scheduled after the merge.

| # | Step | Assigned To | Depends on |
|---|---|---|---|
| SE-1 | Correct the enforcement layer, and propose the map rows it lacks | The Systems Engineer (propose), Orchestrator (apply), author (rules the map) | none; **precedes the merge** |
| SE-2 | Write the bootstrap contract as a specification | The Systems Engineer (write), The Software Engineer (review for testability) | SE-1 |
| SE-3 | Define the install state record: one file, one schema, three consumers | The Systems Engineer (write), The Software Engineer (review) | SE-2 |
| SE-4 | Working-copy currency policy: record the ref, float the checkout | The Systems Engineer (write), The Engineer (review) | SE-3 |
| SE-5 | Corpus fork policy and the divergence check | The Systems Engineer (policy), The Engineer (provenance format) | SE-3, the merge |
| SE-6 | TDD stage: acceptance suite for the bootstrap, written before `CLAUDE.md` | The Software Engineer (suite), The Systems Engineer (coverage) | SE-2, SE-3, SE-4, SE-5 |
| SE-7 | TDD stages for `CLAUDE.md` as prose: suite, outline, write, revise | The Writer, then The Editor, then The Designer; The Systems Engineer verifies conformance to SE-2 | SE-6 |
| SE-8 | First-run sequence mechanism | The Systems Engineer (mechanism); The Writer owns the content separately at 0.4 | SE-3, SE-7 |
| SE-9 | `README.md`, with the licence statement the corpus now requires | The Writer (draft), The Systems Engineer (licence boundary), The Editor, The Designer | SE-1, and The Engineer's OQ8 audit |

### SE-1. Correct the enforcement layer, and propose the map rows it lacks

Deliverables: a corrected `.gitignore`; a directory-map revision proposed to the author (the map is
his ruling, so the team proposes and he rules); the stale `deps/` reference in `accumulator.md`
corrected.

Content, all of it from part 3: anchor `/cr-agents/` and `/lsei/`; invert `literature/` to
deny-by-default re-admitting `*.md` only; add a row for machine-generated state; state the `_intake/`
exit criterion; state the non-row for `CSA_LSEI_Workshops` and for any other path outside this
repository and its two working copies; rule on whether `cr_scratch/` grows or is archived per step.

Acceptance: a fixture list of paths run through `git check-ignore` and asserted, covering `.pdf`,
`.PDF`, `.docx`, `.txt`, `.md`, top-level and nested, `literature/lsei/x.md`, `deps/`, and the state
file. The `.PDF` case must pass on a case-sensitive filesystem, not only on this machine.

### SE-2. Write the bootstrap contract as a specification

Deliverable: `oracle/bootstrap_contract.md`. The seven phases, the six degraded modes, the refusal
rule for the offline case, the push-disable, the verification assertions, and the explicit statement
that phases 1 through 6 are idempotent while phase 7 is once.

Why this is separate from writing `CLAUDE.md`: `CLAUDE.md` is prose with a reader and therefore takes
the full TDD stages under A.4, and the acceptance suite at SE-6 has to have something to test before
the prose exists. A specification is the thing a suite tests. Writing the prose first and deriving the
contract from it inverts the method.

### SE-3. Define the install state record

Deliverable: schema and location for one root-level, ignored, machine-written file. Fields at
minimum: schema version; the ref each working copy was last verified against; whether source PDFs are
present in this install; the corpus provenance digest that Break 1's drift check compares against; and
the first-run flag with its timestamp and its bootstrap-completed boolean.

Also specify the three abnormal reads. Absent, which is treated as a first install. Corrupt, which is
reported and rewritten and never crashes the session. Written by a future schema version, which is
reported and refused, because a newer Oracle wrote it and overwriting loses what it knew.

**This step is the object of falsifier 2.** If the integration at 0.3 splits it into three mechanisms,
that is the finding and I will say so at 0.5.

### SE-4. Working-copy currency policy

Deliverable: the record-and-compare policy from part 2, written as a rule the bootstrap executes and
the suite tests. Includes the drift report's content, the prohibition on auto-reset and auto-bump, and
the statement that A3 is scoped to Step 0 drafting and expires when the answering loop computes its
first number. Includes the requirement passed to The Software Engineer that an answer's trace carries
the app ref.

### SE-5. Corpus fork policy and the divergence check

Deliverable: the three-part policy from Break 1. The requirement that provenance names an upstream ref
(the format is The Engineer's); the bootstrap-time comparison of upstream filename set and content
hashes against the provenance record; and the rule that divergence is reported as a finding and never
auto-merged. Also carries the `--lit` requirement from part 4: any invocation of prototype tooling in
place must name our corpus explicitly, and the suite asserts which corpus was used.

### SE-6. TDD stage: acceptance suite for the bootstrap

Deliverable: the suite, written before `CLAUDE.md`. It must assert the degraded modes by construction
rather than by inspection. Rename `lsei/` and assert the session refuses a quantitative question.
Point `origin` at an unreachable URL and assert the offline path reports rather than falls back.
Dirty a working copy and assert nothing resets it. Place a `deps/`-style stale path and assert the
bootstrap does not populate it. Run the prototype tool without `--lit` and assert the suite catches
the wrong corpus.

This is the step that makes "failure behaviour is the part that matters" real rather than
aspirational. The Software Engineer owns suite design under `tdd_method.md`. I own the coverage list.

### SE-7. TDD stages for `CLAUDE.md` as prose

Four ordered stages, not one "write CLAUDE.md" step: test suite (SE-6 covers behaviour, this covers
the document), validated topic-sentence outline, write, revise. `CLAUDE.md` has a reader, in fact two
of them, the next session and a human cloner, so A.4's precondition fires here even though it did not
fire on Step 0.

The Systems Engineer's review question is narrow and stated in advance: does the prose implement
SE-2's contract, or does it describe a friendlier contract that the suite does not test?

### SE-8. First-run sequence mechanism

Deliverable: the gate, the fields, the degraded-bootstrap suppression rule, the second-machine
behaviour, and the documented opt-out. Explicitly not the content, which is The Writer's at 0.4. The
handoff between the two is a single named boundary: the mechanism decides whether the sequence plays,
the content decides what it says, and neither reaches into the other.

### SE-9. `README.md`

Under A1 the repository is public, so the README has an audience of strangers and the licence
statement is load-bearing rather than ceremonial. Break 4 says an unaddressed treaty text makes the
inherited licence statement false, so this step cannot close before The Engineer's OQ8 audit returns.
The `lsei/NOTICE.md` precedent applies directly: a share-alike file and a public-domain dedication
cannot both govern the same tree, and this repository will hold the same problem the moment any
CR-Agents writing guide is vendored here.

Per A5, under the opposite assumption (private repository) this step shrinks to an orientation note
for the author, and the licence question becomes advisory rather than blocking. That is the only
place in my slice where A1 changes an answer.

---

## Context recipes for the proposed steps

| Step | Agent | Files / Excerpts |
|---|---|---|
| SE-1 | The Systems Engineer | `.gitignore` (full). The directory map section of the gameplan. This file, part 3. Directory listings of `_intake/` and of `literature/` if it exists. Not the corpus contents. |
| SE-1 | Orchestrator (apply) | The proposed `.gitignore` and map rows. The author's ruling on the map. |
| SE-2 | The Systems Engineer | This file, parts 1, 2 and 4. `cr-agents/CLAUDE.md` (full, 21 lines, the precedent). The current provisional `CLAUDE.md`. `lsei/README.md` layout section. `cr-agents/README.md` workflow diagram section only. |
| SE-2 | The Software Engineer | The draft `oracle/bootstrap_contract.md`. `cr-agents/method/tdd_method.md` (full). Not the corpus, not the app. |
| SE-3 | The Systems Engineer | This file, part 2, part 3 Break 6, and part 5. The `oracle/bootstrap_contract.md` from SE-2. The Engineer's provenance format from the merge step. |
| SE-3 | The Software Engineer | The draft schema. The three abnormal reads. `tdd_method.md` sections on fixture construction. |
| SE-4 | The Systems Engineer | This file, part 2. `git log --oneline -5` from both working copies. The header of `lsei/lunar-scenario-explorer-map.md`, to confirm it is generated. Open Question 3. |
| SE-4 | The Engineer (review) | The draft policy. His own merge provenance design. |
| SE-5 | The Systems Engineer | This file, part 3 Break 1 and part 4. The Engineer's completed merge report. Filename listings of `lsei/literature/` and of the merged `literature/`. Not the summary contents. |
| SE-5 | The Engineer | The draft policy plus his provenance record. |
| SE-6 | The Software Engineer | `oracle/bootstrap_contract.md`. The install state record schema from SE-3. `cr-agents/method/tdd_method.md` (full). `lsei/oracle/answer_question.js` path-resolution block, lines 76 to 95, for the `--lit` assertion. `lsei/oracle/verify_answers.js` as the precedent for outcome-count reporting. |
| SE-6 | The Systems Engineer (coverage) | The draft suite plus this file's six degraded modes. |
| SE-7 | The Writer | `oracle/bootstrap_contract.md`. `cr-agents/CLAUDE.md` as the register precedent for a bootstrap file. `cr-agents/supplements/writing-guides/style.md` and `structure.md`. The validated outline. |
| SE-7 | The Editor | `cr-agents/supplements/signs_of_ai_writing.md` (full, mandatory). The drafted `CLAUDE.md`. |
| SE-7 | The Designer | The drafted `CLAUDE.md` plus the repository tree as a cloner sees it, meaning the tree with `cr-agents/`, `lsei/` and `_intake/` removed. |
| SE-7 | The Systems Engineer | `oracle/bootstrap_contract.md` beside the drafted `CLAUDE.md`, read as a conformance check and nothing else. |
| SE-8 | The Systems Engineer | This file, part 5. The install state record schema from SE-3. `oracle/bootstrap_contract.md` phase 7 only. Explicitly **not** The Writer's sequence content. |
| SE-9 | The Writer | `lsei/README.md` (full) and `lsei/NOTICE.md` (full) as the precedent. The directory map as corrected by SE-1. The Engineer's OQ8 audit finding. Objectives 1 through 6. |
| SE-9 | The Systems Engineer | The licence section only, plus the OQ8 finding, plus `lsei/NOTICE.md`. |

---

## Findings, ordered by what they cost if ignored

1. **Three treaty texts push full third-party source text into a public repository on merge day.**
   `.gitignore` excludes `*.pdf` and nothing else. Open Question 8's answer is already "yes, at least
   three." Fix: deny-by-default under `literature/`.
2. **Both working copies can push to their upstreams right now.** "Never pushed" is enforced by
   nothing. Fix: two lines at bootstrap.
3. **The prototype tool run in place answers from the upstream corpus, not ours.** `DEFAULT_LIT`
   resolves to `lsei/literature/`. Silent, and it defeats the primary assignment at the point of use.
4. **The bootstrap in `CLAUDE.md` populates `deps/` while everything else reads `cr-agents/` and
   `lsei/` at root.** Not a leak, a silent path split.
5. **`_intake/` is gitignored in full,** so until the merge lands this repository's headline
   deliverable is invisible to a clone. A2 and the map are reconcilable, but only under one stated
   reading.
6. **Nothing owns machine-generated state,** so the default is that a first-run flag gets committed
   and suppresses the opening sequence for every subsequent cloner.
7. **`literature/` differs permanently between the author's disk and a clean clone,** and nothing
   tells a session which one it is in.
8. **The unanchored `lsei/` pattern will swallow `literature/lsei/`** if the merge taxonomy ever
   produces a folder by that name.
