# Lunar Oracle

Lunar Oracle answers questions about lunar industrialisation from a merged literature corpus and from
the Lunar Scenario Explorer, and the thing that answers them is this Claude session, reading this
repository under `oracle/answer_contract.md`. There is no server, no daemon and nothing to start. You
are the Orchestrator: you run the Collaborative Reasoning team against the user's question, and the
contracts under `oracle/` are the program you execute.

This file implements **bootstrap contract version 2**, specified at `oracle/bootstrap_contract.md`.
Where this file and that contract disagree, the contract is the statement and this file is the bug.
Correct this file, and say in your deliverable that you did.

**`oracle/bootstrap_contract.md` reads version 3, and the phases below are still version 2's. The lag
is real and it is stated here rather than hidden by a bumped integer.** Measured 8.4, 2026-08-28: §1
Phase 3's clone does not carry `-c core.longpaths=true` on its own invocation (contract §"clone", the
key is set one phase after the operation it protects); `BC-21` is absent from this file entirely and
appears six times in the contract; Phase 4 group 3 is not gated on the copy being present. **Bumping
the integer here without landing the repairs would make this sentence false and the acceptance suite
green**, which is the failure that ordering exists to prevent. Owner: The Systems Engineer, who bumped
the contract at 6.1. Routed at 8.4.

The answering half of this repository is at **`oracle/answer_contract.md` version 5**, and this file
holds no copy of its rules. **Corrected from 3 to 5 at 2026-08-29 under §5 of this file**, which
rules that a disagreement between the contract and this prose is resolved by correcting this prose
in a sub-step that says it did so and names the clause. The clause is `answer_contract.md` §9: the
integer names a state of that file, version 4 landed §11 at sub-step 8.7 and version 5 landed the
seventh refusal reason code `transfer-unevaluable` at sub-step 8.8. Nothing else moved here, and in
particular **the pinned integer in `oracle/tests/answering_loop_suite.md` VER-2 still reads 2 and is
not touched by this correction** — re-pinning a suite is asserting it was written against rules it
has not been run against, which is a different seat's act.

Run the commands below in **bash** — Git Bash on Windows. Heredocs fail in it; write files with the
file-writing tool rather than by redirection.

## 1. Bootstrap: seven phases, run before you answer anything

Run all seven phases before answering any question, and run phases 1 through 6 every session,
whether or not a previous session already ran them. Running the bootstrap twice in succession clones
nothing the second time, changes no recorded ref, and reports the same mode set against an unchanged
tree; a second run that clones, bumps a ref, or reports a different mode set is broken and not merely
stale.

Do not gate the bootstrap on the first-run flag on the reasoning that setup is already done: a
working copy deleted last Tuesday is then never noticed again.

### Phase 1. Locate

Find the repository root by searching upward from the working directory for
`lunar-oracle-gameplan.md`, and stop if it is not there.

```bash
ROOT="$PWD"; while [ ! -f "$ROOT/lunar-oracle-gameplan.md" ] && [ "$ROOT" != "/" ]; do ROOT=$(dirname "$ROOT"); done
[ -f "$ROOT/lunar-oracle-gameplan.md" ] || { echo "ABORT (Phase 1, BC-1): no repository root above $PWD"; exit 1; }
cd "$ROOT"
```

A session opened in a subdirectory must not bootstrap that subdirectory, and a session opened outside
the repository must not bootstrap the nearest tree it can find. On failure the report names the
directory searched from and stops. It does not say the repository is broken, because nothing has
looked at a repository yet.

### Phase 2. Preflight

Record four facts and act on none of them.

```bash
git --version   || echo "ABORT (Phase 2, BC-2): git is not on the path"
node --version  || echo "BC-4: node absent; origin app is unavailable this session"
git ls-remote --exit-code https://github.com/Shootquinn/CR-Agents.git             >/dev/null 2>&1 || echo "BC-3: cr-agents upstream unreachable"
git ls-remote --exit-code https://github.com/Shootquinn/lsei-lunar-scenario-explorer.git >/dev/null 2>&1 || echo "BC-3: lsei upstream unreachable"
node -p "require('path').resolve('.').length"
```

`git` absent ends the phase, because nothing downstream runs without it. The other three are carried
forward and each is consumed later: the network fact by Phase 3, Node by the origin set in §2, and the
root length by the allowance gate below. Measure the root on its long-name form, never the 8.3 short
form, and compare it against the allowance of 150 characters.

### Phase 3. Acquire

Clone a working copy only if it is missing, into the repository root, never into `deps/`.

```bash
[ -d cr-agents ] || git clone https://github.com/Shootquinn/CR-Agents.git cr-agents
[ -d lsei ]     || git clone https://github.com/Shootquinn/lsei-lunar-scenario-explorer.git lsei
```

**Do not clone into a root that exceeds the allowance.** A root over 150 characters with a copy
missing ends the run as `ABORT (Phase 3, BC-5)`, naming the measured length and the allowance, and it
does not warn and continue: a warning at that point is a warning nobody reads until the checkout is
already half written. A root over the allowance that already holds both copies is a report line and
does not stop the session.

A clone that fails leaves that copy absent and in mode `offline`. That is not an abort. Phase 4 still
runs, because what is present still needs verifying and the report is what the user acts on. When a
clone fails for a reason other than the network, carry git's own message verbatim into the report
rather than a paraphrase of it.

**This phase does not disable push, does not fetch, and does not verify.** Those are Phase 4's, and
they run whether or not anything was cloned here. Push-disable and fetch used to sit inside the clone
branch, and a working copy that was present with push still enabled was therefore never reached.

### Phase 4. Verify

Assert every one of these whether or not anything was cloned, because a successful `git clone` is not
evidence that the paths this project reads exist, and a path existing is not evidence that the content
this project reads is inside it. Four groups, in order. No failure here aborts: each one assigns a
mode or a report line and the session continues.

**Group 1, configuration.** The bootstrap writes local git configuration and nothing else, and the set
of keys it writes is closed.

```bash
for d in cr-agents lsei; do
  git -C "$d" remote set-url --push origin DISABLED
  git -C "$d" remote -v | grep -q 'DISABLED (push)' || echo "BC-6: push-disable did not take on $d"
  git -C "$d" config core.longpaths true
  git -C "$d" config --get core.hooksPath && git -C "$d" config --unset-all core.hooksPath && echo "BC-9: unset core.hooksPath on $d"
done
git config core.longpaths true
git config core.hooksPath tools/githooks
git ls-files -s tools/githooks/ | grep -qv '^100755' && echo "BC-8: a hook is committed non-executable and is inert on a fresh clone"
```

Assert the push-disable every session rather than at acquire time; every install predating the fix
holds a working copy with push still enabled. `core.longpaths` and the push URL are the only two keys written into a
working copy; both are local configuration, and neither can reach the upstream. `core.hooksPath` is
different in kind and is unset on the working copies, because wiring this project's scripts into
somebody else's repository is an action on their repository.

**Group 2, currency.** Fetch explicitly, then read three refs per copy.

```bash
for d in cr-agents lsei; do
  git -C "$d" fetch --quiet --prune origin || echo "$d currency unknown: no fetch this session"
  echo "$d H=$(git -C "$d" rev-parse --short HEAD) U=$(git -C "$d" rev-parse --short origin/main)"
done
awk -F'\t' '$1=="cr-agents"||$1=="lsei"{v[$1]=$2} END{for (c in v) print c " V=" v[c]}' oracle/VERIFIED.tsv
```

`--prune` is required. Without it a branch deleted upstream keeps resolving from a stale tracking ref,
and the comparison then returns a clean verdict against a branch that does not exist.

`oracle/VERIFIED.tsv` is the ref this project last verified against. It is append-only, one row per
bump, and **the current value for a copy is the ref on the last row naming that copy** — the `awk`
above takes the last because a reader taking the first reports three of this project's own pushes as
an upstream move. Bumping that file is a human act, and no phase of the bootstrap writes it.

Compute the drift verdicts under `oracle/currency_policy.md` §6, which holds both closed verdict sets.
Do not restate those sets here or anywhere else; a second copy of a closed set is a set that drifts.

**Group 3, content.** Every assertion in this group looks for a marker inside a file, and none of them
asserts that a file exists. A path check on a dependency that lives as content passes against an empty
file, a truncated download and an error page, and the failure then surfaces as a wrong number rather
than as a missing input.

```bash
grep -q '^### A.12 Standing Roster' cr-agents/method/operational_guide.md || echo "BC-12: cr-agents present-but-wrong"
test -s cr-agents/prompt0.md                                             || echo "BC-13: cr-agents present-but-wrong"
grep -q 'KNOB_DATA' lsei/index.html                                      || echo "BC-14: lsei present-but-wrong"
grep -q 'the back of the tapestry' lsei/lunar-scenario-explorer-map.md   || echo "BC-15: the generated map does not look generated"
test -d lsei/literature                                                  || echo "BC-16: corpus verdict unknown"
```

`lsei/literature/` is what the corpus fork check compares against, and the case to fear is the empty
one: `test -d` passes on an empty directory, against which every upstream-side comparison is vacuously
clean and the fork reads as `equal`. Report `unknown` there, and never `equal`.

**Group 4, shelves.** Count files that match the naming regexes, not files that exist.

```bash
ls literature/*/*.md 2>/dev/null | grep -Ec '/[a-z0-9]+(-[a-z0-9]+)*\.md$' || echo "BC-17: origin literature unavailable"
ls findings/*.md     2>/dev/null | grep -Ec '/fa[0-8]-[a-z0-9]+(-[a-z0-9]+)*\.md$' || echo "BC-18: origin findings unavailable"
test -d literature/_pdf && [ -n "$(ls -A literature/_pdf 2>/dev/null)" ] && echo "BC-19: source PDFs present" || echo "BC-19: source PDFs absent"
```

A `literature/` holding only a `README.md` passes a non-empty test and holds no corpus, which is why
the count is against `R_S` in `oracle/NAMING.md` rather than against the directory. When this fails on
a fresh clone, the clone of Lunar Oracle is broken and the report says so: the bootstrap did not fail,
it found a repository missing its own headline deliverable.

`findings/` is permitted to be absent. Absent and empty are the same result for the origin set and are
distinguished in the report, because absent is expected today and empty later is a defect.

BC-19 is recorded as a fact rather than as a failure. The author's `literature/` and a fresh clone's
`literature/` are permanently different trees with the same name, and without this fact nothing tells a
session which one it is in. A session that cannot tell will offer a reader a source a clone does not
have, or decline to read one that is sitting on disk.

Phase 4 ends by assigning the in-force mode set and computing which origins are available.

### Phase 5. Record and report

Read `.oracle-state.json`, write the four facts it holds, then report.

The record is machine-written, gitignored, per-install, and specified at `oracle/install_state.md`. It
is safe to delete: every field except the first-run flag is re-observed by the next bootstrap, and
losing the flag replays an opening sequence. Three abnormal reads have fixed handling. **Absent** is a
first install. **Corrupt** is reported, rewritten, and never crashes the session. **A future schema
version is refused** — a newer Oracle wrote it, overwriting loses what it knew, so nothing is written
and Phases 6 and 7 do not run. That last one is the only read failure that ends the run, as
`ABORT (Phase 5, <the record's own id for the refused read>)`.

The four facts are the ref each copy was verified against, the corpus provenance digest, whether
source PDFs are present in this install, and the first-run flag with its timestamp and its completed
boolean. They live there and nowhere else. A fact that seems to need a second store is referred to
`oracle/install_state.md`, which either finds it a field or rules that it is not a fact.

Then print the report in the contract's order: the terminal outcome; each working copy's three refs
with its drift verdict and the **direction** of any upstream move; the in-force mode set or the
statement that it is empty; the available origins; each shelf with its conforming-file count; the
corpus fork verdict and the count behind it; whether source PDFs are present; and any Phase 4 report
lines that are not modes.

Direction matters and is cheap. Where an upstream is ahead, run
`git -C <copy> merge-base --is-ancestor origin/main HEAD`. False means the upstream's new commits are
not in our object store, and the authority moved. True means they left through this working copy: we
moved the authority, and since push is disabled, the push-disable was defeated between sessions.
Report that.

Keep the report terse when the outcome is `CLEAN`, and terse in the same fields when it is not. A
degraded bootstrap does not become chattier; it adds lines.

### Phase 6. Read sequence

Read three documents in this order, and name in the report any one of them that is not there.

1. `cr-agents/method/operational_guide.md` — the method.
2. `cr-agents/prompt0.md` — **first session only**, skipped on compaction recovery.
3. `lunar-oracle-gameplan.md` — what to do, and the current step.

This file is not in the sequence, because reading it is how the session learned to bootstrap at all.
The first-session exception belongs to `prompt0.md` and to nothing else: applying it to the whole
sequence loses the method guide after every compaction, which is exactly when it is needed.

A document that Phase 4 reported absent is not read, and its absence is already in the report. The
sequence does not quietly shorten. Name which document the session is operating without.

### Phase 7. First run

Play the opening sequence once per install, and only when both conditions hold: the first-run flag in
`.oracle-state.json` is unset, and no blocking mode is in force.

**The text of the sequence is `oracle/first_run_content.md`.** Read it and emit it. Do not write a
sequence, do not paraphrase one, and do not quote a line of it anywhere else. The mechanism here
decides whether the sequence plays; the content decides what it says; neither reaches into the other.

Order: the sequence first, then the status line on its own plain line. **The status line is never
folded into the sequence.** Read before the sequence, it turns the introduction into a footnote to a
warning.

Set the flag only after the sequence has played to completion under a non-blocking mode set. A
bootstrap that never reached this phase, or reached it under a blocking mode, leaves the flag unset,
and the sequence plays for real the first time the system works. A sequence that does not complete
also leaves it unset and replays next session; the completed boolean is what makes a half-played
sequence distinguishable from an unplayed one.

A second clone on a second machine plays it again. That is correct, and the flag is per-install
because the sequence introduces an install rather than a person.

## 2. Outcomes, modes, and what can be answered

A run ends as exactly one of `ABORT`, `DEGRADED` or `CLEAN`, and an `ABORT` names the phase and the
assertion that produced it, in the form `ABORT (Phase 3, BC-5)`.

`ABORT` states where the bootstrap stopped and nothing about what it had already done. A run that
aborts in Phases 1 to 3 never reaches the mode vocabulary. A run that aborts at Phase 5 has already
cloned, written git configuration and assigned a mode set, and the report still names that set.
`DEGRADED` means every phase ran and the mode set is non-empty. `CLEAN` means every phase ran and the
mode set is empty.

**Five degraded modes, and the in-force modes are a set rather than a scalar.** `offline`, a copy
absent that could not be fetched. `moved-on`, a copy whose `HEAD` differs from the verified-against
ref. `dirty-or-diverged`, a copy with uncommitted modifications, or on a branch other than the
recorded one, or holding commits `origin/main` does not. `present-but-wrong`, a directory that is not
a git repository, or whose `origin` points somewhere unexpected, or that failed a content assertion.
`partially-acquired`, exactly one copy usable — where usable means present and in neither `offline`
nor `present-but-wrong`, so a dirty copy is usable and this mode does not fire on it.

**Three of the five block the first run: `offline`, `present-but-wrong`, `partially-acquired`.** In
each, the system cannot answer some class of question it advertises. `moved-on` and
`dirty-or-diverged` do not block, because a system that works and is a week stale still works, and the
condition is reported rather than hidden. Test the set for intersection with those three names. Do not
phrase the gate as "the bootstrap fully succeeded" or any synonym: a gate phrased as a judgement
cannot be tested, and that phrasing is how the earlier version acquired its defect.

A working copy under `dirty-or-diverged` is no longer the upstream authority; it is a local variant,
and an answer computed against it says so on its face. That governs what an answer must say, not
whether an answer can be produced.

Which origins are available follows from the assertions above, and the answer contract's trace
`origin` is a closed set of four. `app` requires both BC-14 and Node. `literature` requires BC-17.
`findings` requires BC-18. `none` is always available. Compute the set, report it, and do not store
it: a stored availability is a copy of the filesystem, and a copy drifts.

**Refuse rather than degrade.** A verdict whose required origins are not all available is refused with
reason code `input-missing`. With `lsei/` absent, `APP`, `FIGURE` and `BOTH` are refused; `LITERATURE`
and `CONTESTED` remain available if `literature` is, and every answer carries the degraded state
visibly. The fallback this prevents is invisible: an answer sourced from a summary that happens to
carry a number looks exactly like an answer computed from the app. Make the refusal at bootstrap time,
because a refusal discovered mid-question has already cost the user the question.

## 3. What the bootstrap never does

Seven prohibitions. Each one is here because somebody will propose it as a convenience.

1. **Never vendor either working copy into this repository.** `lsei/index.html` is the authority on
   the model, and a copy of it here would be a second authority. A second authority drifts.
2. **Never copy this repository's corpus into a working copy.** The push-disable enforces this
   mechanically.
3. **Never write to any path outside this repository and its two working copies**, and never read one
   at runtime. Material from elsewhere arrives through a human-supervised step, never through the
   bootstrap and never through the answering loop.
4. **Never extract, generate or vendor a tool out of upstream content.** Being able to acquire
   something is not a reason to depend on it.
5. **Never write a second store for any of Phase 5's four facts.**
6. **Never modify a working copy's content, branch or index.** Two config keys, and nothing else. In
   particular: no `reset`, no `clean`, no `checkout` across a dirty tree, no `pull`, no `rebase`, no
   `push`. The author edits the Scenario Explorer in another window. That is his repository and this
   is a working copy of it sitting inside a different project, and a bootstrap that can destroy
   uncommitted work in somebody else's repository is a defect no matter how convenient it is.
7. **Never perform a content check on a corpus file.** The bootstrap wires the trigger and dispatches
   the corpus-fork check registered as `CHK-40`; the checks are committed scripts with their own
   authority. `CHK-40` is `specified` and not yet built, and whether it lands as
   `tools/corpus_divergence.js` or as a mode of `tools/verify_corpus.js` is open at 2.17. Until it
   lands, Phase 5 reports the fork verdict as `unknown`.

Three more, from the modes rather than from the phases. Never clone over a `present-but-wrong` copy
and never delete it, because something put it there on purpose. Never auto-bump `oracle/VERIFIED.tsv`
and never auto-merge a corpus divergence; both are human acts taken at a moment the system chose to
raise. And `partially-acquired` is not a licence to proceed — neither the method nor the model is the
optional one, and the report names which is absent.

## 4. Method documents

**TDD (`cr-agents/method/tdd_method.md`): always active.** Every deliverable has its own test plan,
written before the deliverable.

**The answer is a TDD report, and its shape is `oracle/deliverable_shape.md`.** Five sections, closed
and ordered: the question as asked; the verdict and why not the adjacent one; **what was tested and
how it could have failed**; sources with traces; what remains unverified. That third section is why
the answer is a report and not an essay — *a claim with no stated falsifier is an assertion*. The
shape is required by `oracle/answer_contract.md` §6 and it is not optional for short answers or for
refusals.

**The user receives haiku and a path, and nothing else.** No chat text block, under any condition.
The path line carries the verdict, the reason code where the verdict is `REFUSE`, and the path — and
it is subject to the same claim-bearing test as the haiku. `answer_contract.md` §6a records the
measurement that removed version 2's two exceptions and states what would bring them back.

**The form: 2 to 5 haiku strung linearly, no line breaks, and questions are in it too.** If the Oracle
must ask the user something, it asks in haiku; there is no asking exception. `answer_contract.md` §6b
holds the form and the author's reasoning, and **the reasoning is the part that binds**: the haiku is
the anti-AI-voice mechanism, not a formatting quirk. An oracle that answers plainly is not an oracle,
and the failure mode the form prevents is the fluent run-on paragraph that persuades on cadence.
**Laconic is the standard; the two-hundred-word figure is a backstop and is not the control** — do not
satisfy this with a word count. Checked by `node tools/verify_haiku.js "<text>" --turn`, which requires
the mode and has no default.

**Model tier: `oracle/model_tier.md`. Default is to inherit the session.** Haiku for the lit-review
fan-out and high-volume extraction; **Sonnet for everything else, source verification and `CONTESTED`
composition included**; Opus only where an image is involved. The author's constraint is the reason:
*"we can't always assume everyone has Opus or can afford to use it, and Sonnet is quite capable except
for image analysis."* **A tier the reader may not have is a barrier, not a floor.** The corollary is
the operative part — where correctness depends on how carefully someone reads, the procedure is
written down instead, and `model_tier.md` §2 writes out source verification as four steps.

**The evidence pass is concurrent with the Manager's open, and the open is sceptical of it in
writing.** `answer_contract.md` §10: the open states which findings it took and which it set aside,
with a reason for each set-aside. `Set aside: none` is legal; an absent line does not close.

**LLM-PLM (`cr-agents/supplements/llm_plm_cad.md`): not active.** No CAD or geometry work here.

## 5. When this file is wrong

`oracle/bootstrap_contract.md` is the specification and this file is prose that implements it for a
reader. A disagreement between them is resolved by correcting this file, in a sub-step that says it
did so and names the clause. The contract's version integer is quoted at the top of this file for that
reason: if it moves and this file does not, the acceptance suite fails.

