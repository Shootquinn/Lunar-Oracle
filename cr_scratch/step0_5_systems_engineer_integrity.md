# Step 0.5. The Systems Engineer: the falsifiers, ruled

**Persona:** The Systems Engineer (Frederick P. Brooks Jr.)
**Sub-step:** 0.5, Wave 2
**Date:** 2026-08-26
**Read:** my 0.2 file in full; `lunar-oracle-gameplan.md`; `cr_scratch/step0_integration_draft.md`;
`step0_writer_register_spec.md`; `step0_editor_prohibition.md`. Everything below that says "on disk"
was run this session.

---

## 1. The three falsifiers

### Falsifier 1, the seam. Does not fire.

The test was: retrieval in one step, app-query in another, and no owner for the mechanism that
decides between them.

The mechanism has a step, an owner, and a data contract. **3.8 (LOOP-5)**, The Software Engineer:
one classifier, four modes — register axis to CONTESTED, app address resolves to APP/FIGURE,
exclusions declare it to REFUSE, otherwise LITERATURE — with the two clauses that matter written
into the sub-step itself: *never two modes for one sub-claim; never a second retrieval to repair a
first.* Its routing table is data, not prose: **3.3 (LUNAR-1)** ships `oracle/question_classes.json`
with the app-address test that decides tier membership, and the sub-step states the router consumes
it before retrieval. **3.2 (LUNAR-1b)** closes the two holes that would have let the seam leak
regardless of who owned it — `OUTPUT_LEXICON` naming 8 of 26 return keys, and `valueModel()`
unextracted, which between them route the app's entire economic half to a literature search.

I note that D2 in the loose ends register is the same question asked from The Software Engineer's
side, and he refused the exception on my grounds rather than his: a post-retrieval register check
requires a second search, which is the forbidden shape. Two agents, one rule, neither citing the
other. **Ruled: the falsifier does not fire, and it could have.**

### Falsifier 2, state. Half-fired, caught, and I verified it myself.

I did not take §6's report. What I checked, and what I found.

**The claim that 1.5 (ARCH-3) is the single writer.** Verified by exhaustion. `install state`,
`state record`, `first-run flag` and `provenance digest` occur at seven places in the integrated
plan: 1.1 (a `.gitignore` row for the file), 1.5 (the schema), 2.17 (reads the digest), 6.6 (reads
the flag), §3's ordering constraint 5, §6, and echo row `f0c976b / c8274e6`. Every one outside 1.5
is a **read**. No second file, no second location, no competing owner. The Software Engineer's run
log stays in OS temp, which is a different lifetime and correctly a different file.

**The drift record, which is where it half-failed.** 2.17 (MERGE-11) and 2.18 (ARCH-5) were the same
computation over the same inputs with two owners — The Engineer's `verify_corpus.js` and my
bootstrap-time comparison. That is falsifier 2's exact shape and neither of us could see it alone.
Integration reduced 2.18 to policy that builds nothing and left 2.17 as the single implementation.
The reduction is real in the plan, not only in the summary: 2.18's row says *"The policy is this
step; the check is 2.17 (MERGE-11)"*, and 2.17's row says the comparison is against *"the provenance
digest held in ARCH-3's state record."* One writer, one implementation, one policy.

**Ruled: the falsifier fired, and it was caught by the integration rather than by me.** I record
without softening it that my prediction was correct — three needs did produce a duplicate mechanism
— and that the mechanism which caught it was The Engineer writing down an interface question he
could not act on. That is the committee failure being prevented by exactly the thing Brooks says
prevents it: somebody holding the whole. It counts as evidence for integrity only because the catch
was structural. Had 0.3 been a summary rather than a reconciliation, this would have shipped.

### Falsifier 3, register. Does not fire, and it is the strongest of the three.

The test was whimsy returning as decoration rather than as the provenance rule.

The Writer's §1.1 does not decorate. It derives: *"the haiku must be structurally incapable of
asserting a fact ... a haiku cannot carry a trace grade, there is nowhere in seventeen syllables to
put `[[slug]]`, and an assertion without provenance is the thing this project exists to prevent."*
Every prohibition in §1.3 follows from that and not from taste. Prohibition 5, grade words, is
named as the most dangerous *because* it is "an untraced grade claim sitting in the one channel with
no trace convention." §3.2 forbids the opening sequence stating any count, and the reason given is
loose end B5 — that the obvious number, 182, is a filename count. That is a whimsy specification
refusing a number on provenance grounds before any question has been asked.

The Editor is the same rule pointed at the plain register. §7: *"Rigor is a fact you add. It is never
a qualification you add."* §8's three slots make a caveat prove it carries information. §11 makes six
of them gates and §13 states plainly which four are reads. Both halves are enforced by the same class
of mechanism at 5.1 — `verify_haiku.js` and `verify_register.js`, each with `--prove` decoys built by
mutating real output — and the two registers never share a channel.

**Ruled: not fired. Objective 4 is not a fourth project.** The whimsy layer and the rigour layer are
one decision stated twice, and the register wave produced the argument rather than inheriting mine.

---

## 2. Conceptual integrity: the verdict

**One project. I hold my 0.2 position, and the ground under it has changed in a way worth stating.**

At 0.2 the vision was carried by inheritance — five rules paid for by the Scenario Explorer, and my
worry was that the merge is the load they have not carried. The integrated plan writes rules the
inherited five do not contain, and every one resolves the same way. The transfer gate at 4.4–4.6 is
new discipline: a corpus mechanism entering a lunar answer emits `legitimate`, `illustration` or
`unknown`, and `unknown` composes a refusal rather than a hedge. The three-class retrieval invariant
at 4.2 is new, and it exists because a one-line invariant would have produced new errors on the other
two classes. The Editor's deletion test is new. None of these is in the inherited five, and all four
are the same sentence: never let an answer look better than its provenance.

The seventy-two sub-steps are not seventy-two ideas. They are one sentence and its consequences, and
the dependency graph shows it — the plan cannot be cut into three pieces along the merge/bootstrap/loop
lines without severing 1.5, 2.17, 3.8 and 4.4, each of which has a foot in two of the three.

**What I still will not certify** is §10.5, which is my own worry restated back at me and correctly
left unresolved: seventy-two sub-steps is a schedule risk, not an integrity defect. One project
attempting three things at once fails differently from three projects wearing a trenchcoat, and just
as reliably. That is the Manager's at 0.7 and the author's at 0.8. My verdict is on coherence, and
coherence is not a schedule.

---

## 3. The three post-0.2 changes, checked rather than accepted

**Finding 1, the enforcement hole. Fixed, and correctly.** `.gitignore` on disk is deny-by-default
under `/literature/**` re-admitting `!/literature/**/*.md`, with `/cr-agents/` and `/lsei/` anchored.
That is the inversion I specified and it fails closed on the file type nobody has thought of.

**Finding 2, push. Fixed on disk, and the fix is conditional in the contract.** `git remote -v` shows
`origin DISABLED (push)` on both working copies. But in `CLAUDE.md` the two `set-url` lines sit
inside the code block introduced by *"If either is missing, clone it before doing anything else"* —
so a working copy that is **present** with push enabled never gets disabled. My own 0.2 put the
push-disable in phase 3 (Acquire), which runs only when the copy is absent, so the defect is mine.
**Push-disable belongs in phase 4 (Verify), which runs every session and is idempotent.** 1.4
(ARCH-2) must say so and 6.1 (ARCH-6) must assert it against an already-present working copy.

**Finding 3, `--lit`. Carried, not fixed.** It is loose end C3 and lands at 2.18, which is correct.

**E1 is live and I own it.** `tools/check_corpus_collisions.js` and `tools/audit_abstract_overlap.js`
are on disk and named in the gameplan directory map. The string `tools/` appears **nowhere in the
seventy-two sub-steps.** Nothing runs them, nothing wires them, and 2.14's `core.hooksPath`
installation covers `oracle/check_no_sources.js` only. Two checks that exist and are invoked by
nobody are exactly the thing E1 says is not a mechanism. Separately: this repository has **zero
commits** — `git log` reports no commits on `main` — so "committed" in the loose ends register is
aspirational for every artifact in it.

---

## 4. The upstream change during Step 0. Would the plan have noticed?

The event: six duplicate summaries deleted and three abstracts rewritten in `lsei/`, pushed upstream.

What is true on disk right now, and it is the whole answer:

```
git -C lsei ls-remote origin main   ->  f788ea2      (upstream, today)
git -C lsei rev-parse origin/main   ->  c8274e6      (what this machine believes upstream is)
git -C lsei rev-parse HEAD          ->  f788ea2
```

**The plan would have noticed this instance and would not notice the general case.** It notices this
one only because the change was authored through our own working copy, so local HEAD moved and the
comparison against the recorded seed ref reports "ahead by two." Had the author made the same two
commits in his own LSEI clone and pushed from there — which is the ordinary case, and it is what my
"moved on" degraded mode was written for — local HEAD stays at `c8274e6`, the local tracking ref
stays at `c8274e6`, the corpus digest matches byte for byte, and **every comparison in the plan
returns equal while the authority has moved.** The stale tracking ref above is that failure, sitting
on this disk, right now, in miniature.

The cause: **the word `fetch` does not occur anywhere in the integrated plan.** Grep returns zero.
1.4 (ARCH-2) says clone; 1.6 (ARCH-4) says record the ref and compare; 2.17 (MERGE-11) says compare
hashes. Nothing refreshes the thing all three compare against. A drift check that reads only local
state detects drift that arrived through this machine, which is the drift you already knew about.

---

## 5. Ruling on 6.8 / ARCH-8: the suppression rule

The Writer is right that the rule read strictly suppresses the introduction forever on the author's
machine, and his reading is the correct reading of what I wrote. **I adopt his recommendation with
one change.**

Ruled: **the sequence plays when every load-bearing path verified and no mode is in force that makes
an answer refuse.** Of my six modes, three block — *offline*, *present but wrong*, *partially
acquired* — because in each of them the system cannot answer, and a whimsical introduction to a
system about to refuse everything burns the one first impression. Two do not block — *moved on* and
*dirty or locally diverged* — because a system that works and is a week stale still works, and the
condition is reported rather than hidden. *Missing but recoverable* resolves to success or to
offline and is never itself a state at phase 7.

His ordering is also right and it is not a presentation preference: **sequence first, then the status
line, on its own plain line, never folded into the haiku.** A status read after the convention is
established is a status; read before it, the introduction becomes a footnote to a warning.

**My one change.** The gate is not "did the bootstrap feel fine." The blocking set is a **named,
enumerated list of modes in the contract**, so 6.1 (ARCH-6) can assert it by construction: dirty the
working copy and assert the sequence plays; unreachable `origin` and assert it does not. A gate
phrased as "fully succeeded" cannot be tested, which is how it acquired this defect in the first
place. 1.4 (ARCH-2) carries the enumeration; 6.6 (ARCH-8) consumes it.

---

## 6. Defects in the integrated plan that nobody has flagged

Five. Each is mine to the extent that four of them originate in my own 0.2 text.

**1. Nothing fetches.** §4 above. Fix: 1.6 (ARCH-4) makes the comparison three-way — recorded ref,
local HEAD, `origin/main` after an explicit fetch — and names the offline case, where the remote leg
is unavailable and the report says so rather than reporting agreement. One line in the contract, and
6.1 asserts it by pointing `origin` at a moved fixture repository.

**2. The verified-against ref is content, and 1.5 files it as state.** My own Break 6 rule: *anything
that must survive a clone is not state, it is content.* Which ref of the app this repository's
answers were checked against is a fact about the project, not about the install — it must survive a
clone or a fresh cloner has nothing to compare against and drift detection begins only from that
machine's first bootstrap. 1.5 as written puts it in the gitignored per-install file. Fix: two
fields, not one. A **tracked** `verified-against` ref, and an **ignored** `last-seen` ref per install.
This does not reopen falsifier 2 — one writer for state, one writer for content, and the split is
along the clone boundary rather than along an owner.

**3. The drift report cannot say who moved the authority.** Two commits now sit in `lsei/` that this
project authored. "Ahead by two" is reported identically whether upstream moved or we moved it, and
the two have opposite consequences for who must act. My part 4 rule — the app is never copied here,
our corpus is never copied there — never contemplated this project **writing into** the borrowed
working copy, which is what happened. Fix: 1.6 states the rule (this project does not commit into a
borrowed working copy; if it must, the commit is reported as a local variant and the answer says so)
and the drift report distinguishes the two directions by comparing against `origin/main`, which
requires defect 1 to be fixed first.

**4. Upstream withdrawal has no verdict.** My Break 1 named two outcomes — new file upstream is
*unmerged*, changed file upstream is *diverged*. 2.17 carries both forward verbatim. The event that
actually occurred was **six deletions**, and after the merge an upstream deletion leaves our corpus
holding a summary the authority has retracted, with nothing naming that state and nobody owning the
response. Fix: a third verdict, *withdrawn*, in 2.18's policy and 2.17's report. Reported, never
auto-acted — a withdrawal is a finding for The Fact-Checker exactly as a divergence is.

**5. E5 goes stale from our own side at 3.7.** `check_corpus_collisions.js` mirrors
`literature_search.js`'s tokenizer, and E5 records the risk of the tokenizer changing *upstream*.
3.7 (LOOP-4) rebuilds that retrieval layer — field-scoped IDF, identity anchor gated on field match,
new confirmation threshold — so the mirror is invalidated by this project's own plan, on a date
already in the schedule. E5 is recorded as an accepted limit against a risk that is now a certainty.
Fix: 3.7 gains the re-point as a post-condition, and the check imports the tokenizer rather than
mirroring it, which removes the failure mode instead of documenting it.
