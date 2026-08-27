# Step 1.4, The Systems Engineer: the bootstrap contract

**Persona:** The Systems Engineer
**Sub-step:** 1.4 (origin ARCH-2), Group 2, depends on 1.1
**Deliverable:** the block in §2, liftable verbatim to `oracle/bootstrap_contract.md`
**Reasoning:** §1 (the decisions and the two I declined), §3 (findings and handoffs)
**State at time of writing:** repository at `ab478ea`, root 55 characters; `cr-agents` at `f0c976b`;
`lsei` at `7f97983`; `.gitignore` carries the four rules applied at 1.1; `oracle/` does not exist.

Extraction is verified in §4.

---

## 1. Reasoning

### 1.1 Where the root-length check goes, and why it is not an eighth phase

The charge says the root-budget obligation "is a phase, and it is yours to place." I have placed it
and it is not a phase, and the reason is a fact about the check rather than a preference about phase
counts.

**A4 is a precondition of cloning, not of running.** A repository root over the allowance that
already holds both working copies, checked out and intact, is a root that demonstrably worked. A
bootstrap that refuses there refuses a working install on arithmetic. So the obligation splits along
a seam that already exists in the seven phases:

- **Measure it in Preflight.** Preflight's stated job is to record facts without acting on them. The
  root length is a fourth such fact and it sits beside git, network and Node without straining the
  phase's definition.
- **Refuse in Acquire, and only when about to clone.** Acquire is the phase that creates the paths
  the budget governs. Nothing else in the bootstrap can exceed it.
- **Report in Verify when the copies are already present.** An over-budget root with a working
  checkout is not an error today and is a fetch away from being one, because the next upstream file
  longer than the remaining slack fails to check out. That is a report line, and the report is what
  Verify produces.

An eighth phase would have been one assertion with no failure mode of its own, sitting between a
phase that has no failure mode (Locate) and a phase that already gates on preflight facts. That is
committee shape: three independently reasonable decisions that do not cohere. **What would change my
mind:** if 6.1 finds it cannot assert the refusal by construction without a separately addressable
phase, the split is wrong and the check becomes phase 2a. The assertion ids in §2 §4 are stable under
that change, which is why they are ids rather than phase numbers.

The second consequence is that an uninhabitable root is **not a seventh degraded mode.** The six
modes are states a working copy can be in. An uninhabitable root is a property of the install, it is
detected before any mode can be assigned, and it terminates the bootstrap at Acquire. Making it a
mode would have broken E15's enumeration to describe a state in which the enumeration is never
reached. It is a terminal outcome instead, `ABORT`, and the outcome set is closed at three so that
6.1 can assert on it.

### 1.2 `core.longpaths` demoted, and what it is still for

The Engineer's bisection puts the wall at a measured absolute-path ceiling with `core.longpaths`
unset at all three scopes, and the file E14 blamed checks out at 160 characters on this machine with
the setting unset. **The setting was never the fix and the budget does not depend on it.** The
contract still sets it, on both scopes, for one stated reason: the budget governs paths this project
creates and can count, and it does not govern paths git creates inside `.git` during a fetch of an
upstream we do not control. That is a real residual and the setting costs one config write.

Stated as a falsifier so the clause can be removed rather than argued about: **if a clone or fetch
into a root inside the allowance ever fails on path length with `core.longpaths` set, the budget is
wrong and the setting is not covering for it.** And the converse: if 6.1 can construct no case in
which the setting changes an outcome inside the allowance, the clause is decoration and should be
deleted. I would rather it be deleted on evidence than kept on habit.

### 1.3 The container-versus-content finding, applied to my own phase

The finding is now four instances and the fourth was mine. The bootstrap's contribution is not to
detect content problems — it cannot, and a path rule cannot either — but it must stop **being** an
instance. `test -f lsei/index.html` is a container check on a dependency that lives as content: the
model is `KNOB_DATA`, `PRESETS`, `DETENTS` and `model()` inside that file, and an empty file, a
truncated download or a GitHub error page all pass an existence check and all break the answering
loop later, silently, at the point where a number is supposed to come out.

So every verification assertion in §2 §4 that stands for a dependency asserts a **marker inside the
file**, not the file. The same rule applied to the two shelves is what makes "the shelf is present"
mean something: a directory holding a `README.md` is non-empty and holds no corpus, so the shelf
assertions count files matching the namespace regexes 1.7 froze rather than counting files.

That is the whole of what the bootstrap owes the finding. The content check on summaries — whether a
`.md` reproduces its source — is a committed script and belongs to Open Question 8 and the check
register. **This contract's obligation to it is `core.hooksPath`:** without the wiring, that check
exists and never runs, which is E1 and E8 in one sentence.

### 1.4 The state constraint, and the fifth fact I looked for and did not find

Falsifier 2 says the ref record, the drift record and the first-run flag must be one mechanism. The
contract therefore reads and writes exactly one machine-written file, and I went looking for the
fifth fact that would have forced a second.

Four candidates, all rejected without adding a store:

- **The measured root length.** Not stored. The measurement is one string length and runs every
  session. A stored measurement would go stale the moment the directory is renamed, which is a thing
  people do to directories.
- **Whether `core.hooksPath` is installed.** Not stored. Asserted every session for the same reason
  push-disable is: a fact recorded at acquire time never reaches an install that already existed.
- **The available-origin set.** Not stored. It is computed from the filesystem at Verify and reported
  at Record. A stored availability is a copy of the filesystem, and a copy drifts — which is this
  project's own rule pointed at its own bootstrap.
- **The observed upstream ref, for drift direction.** Stored, and it is not a fifth fact. It is a
  second field inside the working-copy currency fact that 1.5 already holds. If 1.5 concludes it wants
  a distinct field rather than a distinct fact, that is a schema decision inside one record and it
  does not reopen the falsifier.

**No fifth fact.** If a later sub-step finds one, it goes to 1.5 and not into a new file.

### 1.5 How the drift report names the direction, which E10 says it cannot

E10 is right about the report as it was specified and wrong about it being unfixable, and the fix is
one command rather than a policy.

If the upstream moved on its own, its new commits are not in our object store and `origin/main` is
not reachable from our `HEAD`. If the upstream moved **because we pushed to it**, its new commits
left through this working copy and `origin/main` *is* reachable from our `HEAD`. That is the whole
discriminator:

```
git -C <copy> merge-base --is-ancestor origin/main HEAD
```

True, with `origin/main` ahead of the recorded ref, means the change left through here. False means
it arrived from somewhere else. Three Step 0 instances all fall on the first branch and would have
been named correctly.

There is a second half worth stating, because it is the durable one. **The push-disable closes E10
going forward by construction, not by reporting.** Once push is disabled and asserted every session,
an upstream cannot move through this working copy at all, so a true result from the command above is
no longer merely a direction — it is evidence that the push-disable was defeated between sessions,
and the report says so in those words. The report handles the history; the assertion handles the
future.

What would falsify this: an upstream move that leaves through this working copy while `origin/main`
is unreachable from local `HEAD`. I cannot construct one that does not involve a force-push
rewriting history, and a force-push is reported by the same comparison as `unrelated`.

### 1.6 The offline refusal, stated in the answer contract's vocabulary

Part 1 of my 0.2 file said the offline case matters more than the other five modes together, and it
said so in prose: refuse quantitative questions. Prose is not testable and the answer contract froze a
vocabulary three days ago that is. So the refusal is restated as a mapping from present dependencies
to available trace origins, and from there to the verdicts Rule V can and cannot produce.

That is not a re-decision, it is the same rule with a handle on it. The gain is that 6.1 can assert
the offline behaviour by removing a directory and reading a verdict and a reason code, rather than by
a human reading an answer and judging whether it looked degraded.

### 1.7 Two shelves, one verification, and one thing the bootstrap does not do

The FA shelf is `findings/`, a flat sibling of `literature/`, with its own retrieval contract and its
own trace origin. The bootstrap's obligations double cleanly: two shelf assertions, two counts in the
report, two entries in the available-origin set.

**One asymmetry is worth naming rather than discovering later.** The deny-by-default inversion at 1.1
covers `literature/` and nothing else. `findings/` is not mentioned in `.gitignore` at all, so it
ships every file type by default — the enforcement posture of the two shelves is opposite. That is not
mine to fix inside a bootstrap contract, and a bootstrap cannot fix it. It is a `.gitignore` finding
and it goes to the orchestrator in §3.

---

## 2. The deliverable

Everything between the markers is liftable verbatim to `oracle/bootstrap_contract.md`.

> **DIVERGED AT C-1 — DO NOT RE-LIFT THIS BLOCK.** `oracle/bootstrap_contract.md` was amended **in place** at the Step 1 re-close gate item C-1, 2026-08-27, and is the authority. The block below is the text as frozen at 1.4 and is retained as the record of what was reviewed, not as a source to promote from. Re-running the lift command in this file would silently revert `AM-01`/`AM-16` (the `ABORT` definition and its `(<phase>, <assertion-id>)` cause form), `AM-02`/`AM-17` (`usable` closed), `AM-03`/`AM-18` (`missing-recoverable` demoted to a Phase 3 transient), `AM-04` and the BC-4 clause of `AM-23` (BC-4 wired into section 6), and `AM-19`/`AM-20` (`Q-DEGRADED-MODES` 6 to 5, `Q-BLOCKING-MODES` 3-of-6 to 3-of-5). `oracle/MANIFEST.tsv` records the promotion; `oracle/AMENDMENTS.tsv` records every amendment since.

<!-- BEGIN bootstrap_contract.md -->

# The bootstrap contract

**Contract version: 1.**

This file specifies what the bootstrap does, in what order, and what each part of it does when it
fails. `CLAUDE.md` is prose that implements this specification for a reader. **Where the two
disagree, this file is the statement and `CLAUDE.md` is the bug**, and the disagreement is resolved by
correcting `CLAUDE.md`.

Every term below is closed. A value outside a closed set is a failure, not a variant. Every assertion
carries an id, a command, and the observation that would falsify it. Every phase states what a failure
of that phase does.

## 1. Objects

| Object | Where | What it is |
|---|---|---|
| The repository root | the directory holding `lunar-oracle-gameplan.md` | Established by Phase 1. Not the working directory. |
| The method working copy | `cr-agents/` | Read-only clone of an upstream authority. Never vendored. |
| The model working copy | `lsei/` | Read-only clone of an upstream authority. Never vendored. `lsei/index.html` is the authority on the model. |
| The summary shelf | `literature/` | This project's own writing. Trace origin `literature`. |
| The findings shelf | `findings/` | This project's own prior conclusions. Flat. Trace origin `findings`. |
| The install state record | `.oracle-state.json` | Machine-written, gitignored, per-install. Read and written by the bootstrap and by nothing else. Schema at sub-step 1.5. |
| The tracked ref record | named by sub-step 1.5 | Content, committed, survives a clone. Records the ref each working copy was last **verified against**. The bootstrap reads it and never writes it. |

**The bootstrap writes exactly one file: `.oracle-state.json`.** The four facts it carries — the
verified-against refs, the corpus provenance digest, whether source PDFs are present in this install,
and the first-run flag with its timestamp and its completed boolean — are written there and nowhere
else. A fact that appears to need a second store is referred to sub-step 1.5, which either finds it a
field or rules it is not a fact. **A second store for any of the four is a defect, not an
optimisation.**

Bumping the tracked ref record is a human act. No phase of the bootstrap writes it.

## 2. Terminal outcomes

Closed. The report's first line states exactly one.

| Outcome | Meaning |
|---|---|
| `ABORT` | A precondition failed in Phases 1 to 3. The bootstrap performed no acquisition and assigned no degraded modes. |
| `DEGRADED` | Every phase ran and the in-force mode set (§5) is non-empty. |
| `CLEAN` | Every phase ran and the in-force mode set is empty. |

`ABORT` is not a degraded mode. It is the state in which the mode vocabulary is never reached.

## 3. Phases

**Phases 1 through 6 are idempotent and run every session, whether or not anything was cloned and
whether or not the first-run flag is set. Phase 7 runs once per install.**

*Idempotent* is defined here so that 6.1 can assert it: running the bootstrap twice in immediate
succession performs no acquisition on the second run, writes no field of `.oracle-state.json` to a
different value except the timestamp, and produces a report differing from the first only in
timestamps. **What falsifies it:** a second run that clones, that changes a recorded ref, or that
reports a different mode set against an unchanged tree.

**The natural mistake this ordering exists to prevent** is gating the bootstrap on the first-run flag
on the reasoning that setup is already done. Under that gating, a working copy deleted last Tuesday is
never noticed again.

### Phase 1. Locate

Establish the repository root by finding `lunar-oracle-gameplan.md`, searching upward from the working
directory. A session opened in a subdirectory must not bootstrap a different tree, and a session
opened outside the repository must not bootstrap the nearest one it can find.

Assertions: BC-1.

**On failure:** `ABORT`. The report states that the repository root was not found and names the
directory searched from. It does not state that the repository is broken, because the bootstrap has
not looked at a repository.

### Phase 2. Preflight

Record facts. Act on none of them. Preflight establishes which conditions apply before anything is
attempted, and it does not clone.

| Fact | Assertion |
|---|---|
| `git` is available | BC-2 |
| the network is reachable | BC-3 |
| Node is available | BC-4 |
| the root fits the allowance | BC-5 |

`git` absent is the one preflight fact that ends the phase: without it nothing downstream can run.
The other three are recorded and carried forward; each is consumed by a later phase, and none of them
decides anything here.

**On failure:** `git` absent gives `ABORT`. The other three never fail this phase; they record a
negative fact.

### Phase 3. Acquire

Clone each working copy **only if it is missing**. Clone to the repository root, never to `deps/`.

Acquire is gated on BC-5. **A missing working copy is not cloned into a root that exceeds the
allowance.** The gate fires only on the acquire path: a root that exceeds the allowance and already
holds both working copies is reported by Phase 4 and does not stop the session.

Acquire does not disable push, does not fetch, and does not verify. Those are Phase 4's, and they run
whether or not Acquire did anything. **This split is loose end E7:** the push-disable and the fetch
previously sat inside the acquire branch, so a working copy that was present with push still enabled
was never reached.

**On failure:**
- Root over allowance with a copy missing: `ABORT`, naming the measured root length and the
  allowance. It does not warn and continue. A warning at this point is a warning nobody reads until
  the checkout is already half written.
- Clone fails, network unreachable: the copy is absent, mode `offline` (§5). Not `ABORT` — Phase 4
  still runs, because what is present still needs verifying and the report is what the user acts on.
- Clone fails for any other reason: the copy is absent, mode `offline`, and the report carries git's
  own message verbatim rather than a paraphrase of it.

### Phase 4. Verify

Assert, do not assume. A successful `git clone` is not evidence that the paths this project reads
exist, and a path existing is not evidence that the content this project reads is inside it.

Four groups, in order:

1. **Configuration.** BC-6 through BC-9. Idempotent writes, asserted every session.
2. **Currency.** BC-10, BC-11. Fetch explicitly, then record three refs per working copy.
3. **Content.** BC-12 through BC-16. Markers inside files, never the files alone.
4. **Shelves.** BC-17, BC-18, BC-19.

Phase 4 then assigns the in-force mode set (§5) and computes the available-origin set (§6).

**On failure:** no assertion in Phase 4 aborts. Each failure assigns a mode or a report line, and the
session continues to Phase 5. A bootstrap that stops at the first verification failure reports one
problem where there are three, and the user then discovers the other two one session at a time.

### Phase 5. Record and report

Read `.oracle-state.json`. Handle the three abnormal reads per sub-step 1.5 — absent is a first
install, corrupt is reported and rewritten and never crashes the session, a future schema version is
reported and **refused**, because a newer Oracle wrote it and overwriting loses what it knew.

Write the four facts. Then report, in this order:

1. The terminal outcome (§2).
2. Each working copy: local `HEAD`, `origin/main`, the verified-against ref, and the drift verdict
   with its **direction** (§7).
3. The in-force mode set, or the statement that it is empty.
4. The available-origin set (§6).
5. Each shelf: present or absent, and its conforming-file count.
6. Whether source PDFs are present in this install.
7. Any report lines from Phase 4 that are not modes: an over-allowance root with copies present, a
   fetch that could not run, a defeated push-disable.

The report is terse when the outcome is `CLEAN`. It is terse in the same fields when the outcome is
not; a degraded bootstrap does not become chattier, it adds lines.

**On failure:** a future schema version gives `ABORT` — the state record is refused, nothing is
written, and Phases 6 and 7 do not run. Every other read failure is reported and the record is
rewritten.

### Phase 6. Read sequence

1. `cr-agents/method/operational_guide.md`
2. `cr-agents/prompt0.md` — first session only; skipped on compaction recovery
3. `lunar-oracle-gameplan.md`

**On failure:** a file in this sequence that BC-12 or BC-13 reported absent is not read and its
absence is already in the report. The sequence does not silently shorten: the report names which
document the session is operating without.

### Phase 7. First run

Runs once per install. Gated on two conditions, both of which must hold:

1. The first-run flag in `.oracle-state.json` is unset.
2. The in-force mode set contains no member of the blocking set (§5).

The mechanism decides whether the sequence plays. The content of the sequence is specified elsewhere
and neither reaches into the other.

Order, when it plays: the sequence first, then the status line on its own plain line. **The status
line is never folded into the sequence.**

The flag is set only after the sequence has played to completion under a non-blocking mode set. A
bootstrap that did not reach Phase 7, or reached it under a blocking mode, leaves the flag unset, and
the sequence plays for real the first time the system works.

A second clone on a second machine plays again. That is correct: the flag is per-install because the
sequence introduces an install, not a person.

**On failure:** a sequence that does not complete leaves the flag unset and replays next session. The
completed boolean in the state record is what makes a half-played sequence distinguishable from an
unplayed one.

## 4. Assertions

Every row: what is asserted, the command that asserts it, the observation that falsifies the
assertion, and what a failure does. `<copy>` ranges over `cr-agents` and `lsei`.

### Phase 1

| Id | Asserts | Command | Falsified by | On failure |
|---|---|---|---|---|
| BC-1 | The repository root holds `lunar-oracle-gameplan.md`. | `test -f "$ROOT/lunar-oracle-gameplan.md"` | A session in a subdirectory bootstrapping the subdirectory; a session outside the repository bootstrapping a sibling. | `ABORT` |

### Phase 2

| Id | Asserts | Command | Falsified by | On failure |
|---|---|---|---|---|
| BC-2 | `git` is on the path. | `git --version` | — | `ABORT` |
| BC-3 | The network reaches both upstreams. | `git ls-remote --exit-code <url>` per upstream | A proxy answering `ls-remote` for a host that cannot serve a clone. | Record; consumed by Phase 3 |
| BC-4 | Node is available. | `node --version` | — | Record; consumed by whatever invokes `tools/` |
| BC-5 | The repository root fits the allowance: `abspath(root).length <= 150 [Q-ROOT-ALLOWANCE]`, measured on the **long-name** form of the path, never the 8.3 short form. | `node -p "path.resolve('.').length"` run from the root | A clone succeeding into a root over the allowance, or failing on path length inside it. Either falsifies the budget, not the assertion. | Record; gates Phase 3 |

**BC-5 runs every session**, which is a deliberate strengthening of `literature/NAMING.md` A4's
"once, at bootstrap." A repository directory can be moved or renamed between sessions and a check
that ran once cannot notice. It costs one string length.

`150 [Q-ROOT-ALLOWANCE]` is a remainder, not a measurement: it is the measured git-for-Windows
absolute-path ceiling, less one separator, less the repo-relative ceiling chosen from the corpus. The
arithmetic is in that quantity's `operation` field. **No observed root was ever evidence for it.**

### Phase 4, group 1: configuration

The bootstrap writes local git configuration and nothing else. The set of keys it writes is closed.

| Id | Asserts | Command | Falsified by | On failure |
|---|---|---|---|---|
| BC-6 | Push is disabled on each working copy. | `git -C <copy> remote set-url --push origin DISABLED` then `git -C <copy> remote -v` shows `DISABLED (push)` | A working copy whose push URL is live at the start of any session after the first. | Report; retry once; if it will not take, mode `present-but-wrong` |
| BC-7 | `core.longpaths` is set on this repository and on each working copy. | `git config core.longpaths true`; same with `-C <copy>` | A clone or fetch into a root inside the allowance failing on path length **with the setting on** — which falsifies the budget. A run in which the setting changes no outcome inside the allowance falsifies the clause's usefulness and it is deleted. | Report only |
| BC-8 | `core.hooksPath` on **this repository** points at the committed hook directory. | `git config core.hooksPath tools/githooks` | A committed check that does not fire on the event the check register says it fires on. | Report; the check register's mechanisms are unwired until it takes |
| BC-9 | `core.hooksPath` is **not** set on either working copy. | `git -C <copy> config --get core.hooksPath` returns empty | A borrowed repository running this project's scripts. | Unset it; report |

BC-6 and BC-7 are the only keys written into a working copy. They are local configuration, not
content, and neither can reach the upstream. **BC-9 exists because the same reasoning does not extend
to hooks:** wiring our scripts into somebody else's repository is an action on their repository, which
is the class of thing BC-6 exists to prevent.

BC-6 is asserted every session rather than at acquire time. **The case an acquire-time fix never
reaches is a working copy that is present with push still enabled**, which is the state every install
that predates the fix is in.

BC-8 is loose end E1. A git hook is not a mechanism, because hooks are not cloned. A check is a
committed script under `tools/`, and `core.hooksPath` is how a clone acquires the trigger. The
contract states the wiring; the check register enumerates what is wired; a later sub-step installs it.
**A contract is not an installation**, and BC-8 asserting successfully is not evidence that any check
exists.

### Phase 4, group 2: currency

| Id | Asserts | Command | Falsified by | On failure |
|---|---|---|---|---|
| BC-10 | Each working copy has fetched this session. | `git -C <copy> fetch --quiet origin` | A drift verdict computed from a tracking ref that was never updated. | Report line "currency unknown"; **not** a mode |
| BC-11 | Three refs are readable per working copy: local `HEAD`, `origin/main`, and the verified-against ref from the tracked record. | `git -C <copy> rev-parse --short HEAD`, `... origin/main`, read the tracked record | A drift report naming fewer than three refs. | Report; the drift verdict is `unknown` |

BC-10 runs every session. **A local clone that has not fetched cannot distinguish an upstream that has
not moved from an upstream it has not looked at.** A fetch that fails because the network is
unreachable is a report line and not a degraded mode: the session can still answer, the app ref it
computes against is the local `HEAD`, and that ref is knowable offline. What it cannot claim is
currency, and the report says so in those words.

The comparison of the three refs, and what a bump requires, are the working-copy currency policy's.
This contract's obligation is that the three refs are fetched, read and reported.

### Phase 4, group 3: content

**Every assertion in this group asserts a marker inside a file. None of them asserts that a file
exists.** A path check on a dependency that lives as content passes against an empty file, a truncated
download and an error page, and the failure then surfaces as a wrong number rather than as a missing
input.

| Id | Asserts | Command | Falsified by | On failure |
|---|---|---|---|---|
| BC-12 | The method guide is present and is the guide. | `grep -q '^### A.12 Standing Roster' cr-agents/method/operational_guide.md` | The file present, the marker absent, and the session proceeding as though the method were loaded. | Mode `present-but-wrong` on `cr-agents` |
| BC-13 | `cr-agents/prompt0.md` is present and non-empty. | `test -s cr-agents/prompt0.md` | — | Mode `present-but-wrong` on `cr-agents` |
| BC-14 | The app is present and is the app. | `grep -q 'KNOB_DATA' lsei/index.html` | An `index.html` that parses as HTML, holds no model, and satisfies a `test -f`. | Mode `present-but-wrong` on `lsei` |
| BC-15 | The generated map is present and is the generated map. | `grep -q 'the back of the tapestry' lsei/lunar-scenario-explorer-map.md` | The map hand-edited into something the app did not generate. | Report only; the map is derived and the app settles disagreements |
| BC-16 | `lsei/literature/` is present, as the upstream corpus the fork check compares against. | `test -d lsei/literature` | — | Report; the corpus divergence check cannot run |

### Phase 4, group 4: shelves

| Id | Asserts | Command | Falsified by | On failure |
|---|---|---|---|---|
| BC-17 | The summary shelf holds conforming files. | count of `literature/*/*.md` matching `NAMING.md`'s summary regex is greater than zero | A `literature/` holding only a `README.md`, passing a non-empty test, and holding no corpus. | Origin `literature` unavailable (§6) |
| BC-18 | The findings shelf holds conforming files, when it exists. | count of `findings/*.md` matching `NAMING.md`'s findings regex is greater than zero | A shelf assertion satisfied by a non-conforming file the retrieval layer cannot reach. | Origin `findings` unavailable (§6) |
| BC-19 | Whether source PDFs are present in this install. | `test -d literature/_pdf` and it holds at least one file | — | Recorded as a fact, not a failure |

BC-17 failing on a fresh clone means the clone of Lunar Oracle is broken, and the report says so
rather than blaming the bootstrap. **The bootstrap did not fail; it found a repository missing its own
headline deliverable.**

BC-18's shelf is permitted to be absent before the merge lands. Absent and empty are the same result
for the origin set and are distinguished in the report, because absent is expected today and empty
after the merge is a defect.

BC-19 is why the fact is recorded at all: the author's `literature/` and a fresh clone's
`literature/` are permanently different trees with the same name, and without this fact nothing tells
a session which one it is in. A session that cannot tell will offer a reader a source a clone does not
have, or decline to read one that is sitting on disk.

## 5. Degraded modes

Six, closed. A mode is a state a working copy can be in. **The in-force modes are a set, not a
scalar.** No precedence is defined between them, because nothing in this contract chooses one: the
report lists the set and Phase 7 tests the set for intersection.

| Mode | Condition | Scope | Blocks Phase 7 |
|---|---|---|---|
| `missing-recoverable` | Copy absent; git and network present. | per copy | never in force at Phase 7 |
| `offline` | Copy absent; it could not be fetched. | per copy | **yes** |
| `moved-on` | Copy present; `HEAD` differs from the verified-against ref. | per copy | no |
| `dirty-or-diverged` | Copy present with uncommitted modifications, or on a branch other than the recorded one, or holding commits `origin/main` does not. | per copy | no |
| `present-but-wrong` | The directory exists and is not a git repository; or its `origin` points somewhere other than the expected upstream; or a content assertion for that copy failed. | per copy | **yes** |
| `partially-acquired` | Exactly one working copy is usable. | per install | **yes** |

`missing-recoverable` resolves during Phase 3, to acquisition or to `offline`. It is never in force
when Phase 7 tests the set.

**The blocking set is `offline`, `present-but-wrong`, `partially-acquired`.** In each, the system
cannot answer some class of question it advertises. `moved-on` and `dirty-or-diverged` do not block: a
system that works and is a week stale still works, and the condition is reported rather than hidden.

This is an enumerated list rather than a phrase such as "fully succeeded" **so that it can be asserted
by construction**: dirty a working copy and assert the sequence plays; make `origin` unreachable and
assert it does not. A gate phrased as a judgement cannot be tested, which is how the earlier phrasing
acquired its defect.

### What no mode does

- **Never `reset --hard`, never `clean`, never `checkout` across a dirty tree.** The author edits the
  Scenario Explorer in another window; that is his repository and this is a working copy of it sitting
  inside a different project. A bootstrap that can destroy uncommitted work in somebody else's
  repository is a defect no matter how convenient the reset is.
- **Never clone over `present-but-wrong` and never delete it.** Something put it there on purpose.
- **Never auto-bump the tracked ref record**, and never auto-merge a corpus divergence. Both are human
  acts taken at a moment the system chose to raise.
- **`partially-acquired` is not a licence to proceed.** Neither the method nor the model is the
  optional one. The report names which is absent.

A working copy under `dirty-or-diverged` is no longer the upstream authority; it is a local variant,
and an answer computed against it says so.

## 6. Available origins, and the offline refusal

The answer contract's trace `origin` is a closed set of four. Phase 4 computes which are available in
this session, from the assertions above:

| Origin | Available when |
|---|---|
| `app` | BC-14 passed |
| `literature` | BC-17 passed |
| `findings` | BC-18 passed |
| `none` | always |

The set is computed, reported, and **not stored**. A stored availability is a copy of the filesystem,
and a copy drifts.

**The refusal rule.** A verdict whose required origins are not all available is refused, with reason
code `input-missing`, whose owner the answer contract already names as the bootstrap. Concretely, when
`lsei/` is absent:

- `APP`, `FIGURE` and `BOTH` are refused with `input-missing`.
- `LITERATURE` and `CONTESTED` remain available if `literature` is available, and every answer carries
  the degraded state on its face.

**Refuse, do not degrade.** The fallback this rule exists to prevent is invisible: an answer sourced
from a summary that happens to carry a number looks exactly like an answer computed from the app. The
inherited rule already decides it — a missing input is a refusal, not a fallback. **The bootstrap's
contribution is that the refusal happens at bootstrap time rather than at answer time**, because a
refusal discovered mid-question has already cost the user the question.

What falsifies this clause: a session in which `lsei/` is absent and an `APP` verdict is produced, or
in which a `LITERATURE` verdict carries a numeral traced to the app. Either is a failure of the
mechanism, not a variant of it.

## 7. Drift reporting, and its direction

For each working copy the report names the local `HEAD`, `origin/main`, the verified-against ref, and
one verdict:

| Verdict | Condition |
|---|---|
| `equal` | All three agree. Reported in one line and nothing else is said. |
| `upstream-ahead` | `origin/main` is ahead of the verified-against ref. |
| `local-ahead` | Local `HEAD` holds commits `origin/main` does not. |
| `unrelated` | The refs share no merge base, or history was rewritten. |
| `unknown` | BC-10 or BC-11 failed. Currency could not be established. |

**Direction, which the report must name and previously could not.** For `upstream-ahead`, run:

```
git -C <copy> merge-base --is-ancestor origin/main HEAD
```

- **False.** The upstream's new commits are not in our object store. *The authority moved.*
- **True.** The upstream's new commits left through this working copy. *We moved the authority* — and
  since BC-6 disables push, this additionally reports that **the push-disable was defeated between
  sessions**, which is a finding in its own right and appears in the report as one.

This distinction was needed three times during Step 0. It is not an edge case being defended against;
it is the normal operating mode of a project that borrows a repository its author also writes to.

**Report, change nothing.** No verdict triggers a reset, a bump, a merge or a pull.

## 8. What the bootstrap never does

Stated as a closed list, because each item is a thing somebody will propose as a convenience.

1. **Never vendors either working copy into this repository.** `lsei/index.html` is the authority on
   the model; a copy of it here would be a second authority, and a second authority drifts.
2. **Never copies this repository's corpus into a working copy.** The reverse rule, enforced
   mechanically by BC-6.
3. **Never writes to any path outside this repository and its two working copies.** No path outside
   them is read at runtime either. Material pulled from elsewhere arrives through a human-supervised
   step, never through the bootstrap and never through the answering loop.
4. **Never extracts, generates or vendors a tool out of upstream content.** Being able to acquire
   something is not a reason to depend on it.
5. **Never writes a second store for any of the four facts in §1.**
6. **Never modifies a working copy's content, branch or index.** It writes two config keys, BC-6 and
   BC-7, and nothing else.
7. **Never performs a content check on a corpus file.** It wires the trigger, BC-8, and the checks
   are committed scripts with their own authority.

## 9. Quantities

```quantity
id:            Q-BOOTSTRAP-PHASES
class:         fixed
value:         7
unit:          numbered phases of the bootstrap sequence specified in §3 of this contract
population:    the phase headings of §3 of this contract
operation:     manual: The Systems Engineer at sub-step 1.4; enumerated the phase headings of §3
               and counted them; 7 items inspected
conditions:    none. The value is a ruling of this contract rather than a measurement of an
               environment, and changing it is a contract version bump under §10.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     the bootstrap runs 7 numbered phases; phases 1 through 6 are idempotent and run
               every session, and phase 7 runs once per install.
derived-from:  none
sampled:       n/a — this operation enumerates a closed list, it does not classify
superseded:    none
```

```quantity
id:            Q-DEGRADED-MODES
class:         fixed
value:         6
unit:          degraded modes in the closed set at §5 of this contract
population:    the rows of the mode table at §5 of this contract
operation:     manual: The Systems Engineer at sub-step 1.4; enumerated the rows of the §5 mode
               table; 6 items inspected
conditions:    none. A mode is a state a working copy can be in. An uninhabitable repository root
               is not a mode: it is detected before any mode can be assigned and it terminates the
               bootstrap as ABORT under §2.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     the bootstrap recognises 6 degraded modes and no others; a condition outside the
               set is a failure of the contract, not a seventh mode.
derived-from:  none
sampled:       n/a — this operation enumerates a closed list, it does not classify
superseded:    none
```

```quantity
id:            Q-BLOCKING-MODES
class:         fixed
value:         3
unit:          degraded modes that block the first-run sequence at Phase 7
population:    the 6 [Q-DEGRADED-MODES] rows of the mode table at §5, partitioned by the
               "Blocks Phase 7" column
operation:     manual: The Systems Engineer at sub-step 1.4; classified every row of the §5 mode
               table as blocking or non-blocking against the test "in this mode, is there a class
               of question the system advertises and cannot answer"; 6 items inspected
conditions:    none. missing-recoverable is excluded by resolution rather than by classification:
               it resolves during Phase 3 and is never in force when Phase 7 tests the set.
at:            2026-08-26; lsei 7f97983; cr-agents f0c976b
predicate:     3 of the 6 degraded modes block the first-run sequence — offline,
               present-but-wrong, partially-acquired — and the other 3 do not.
derived-from:  Q-DEGRADED-MODES
sampled:       6 inspected by hand, 0 found wrong, by The Systems Engineer at sub-step 1.4. The
               population is small enough that the sample is the population; no row was
               classified without being read.
superseded:    none
```

## 10. Version

The version is a monotone integer. Any change to a closed set, to an assertion, to a phase or to a
failure behaviour increments it. Three things read it, and if any of the three stops reading it the
field is removed rather than left as decoration:

1. This file carries it.
2. `CLAUDE.md` names the contract version it implements.
3. The bootstrap acceptance suite asserts that the version it was written against equals the version
   here, and fails when they differ.

<!-- END bootstrap_contract.md -->

---

## 3. Findings, and what this sub-step hands on

Ordered by what they cost if ignored.

### 3.1 `/.derived/` in `.gitignore` now has no writer, and its comment is false

The rule was applied at 1.1 as contingent on the C4 ruling. **C4 ruled the other way**: nothing
extracts `verify_report.js`, and this contract's §8 item 4 forbids any phase from extracting anything.
The comment block above the rule still describes an extraction the bootstrap performs.

A rule with no writer is a rule that will acquire an unintended one. Two dispositions, and I recommend
the second:

- Keep the rule and rewrite the comment to say what it now is: a net for machine-generated derivatives
  that no current mechanism produces.
- **Delete the rule and its comment.** Nothing writes `.derived/`, and fixture row 14 of 1.1's runner
  flips from `ignored` to `allowed`. If a derivative store is ever needed, the rule returns with the
  mechanism that needs it.

Either way the comment cannot stand as written. This is the orchestrator's to apply and it is one
edit.

### 3.2 The two shelves have opposite enforcement postures

`.gitignore` inverts `literature/` to deny-by-default and does not mention `findings/` at all.
`findings/` therefore ships every file type by default — a `.pdf`, a `.txt`, a source document — while
its sibling ships only `.md`.

This is not a bootstrap problem and a bootstrap cannot fix it. It is the same finding as 1.1's Break 4
pointed at the shelf that did not exist when Break 4 was written. **Recommended to the orchestrator
and to whoever owns the next `.gitignore` edit:** extend the deny-by-default block to cover both
shelves. The rules are three lines, they are already written for one shelf, and the argument for them
is identical.

### 3.3 `Q-ROOT-ALLOWANCE` cites a `derived-from` id that has no block

`Q-ROOT-ALLOWANCE` names `Q-PATH-CEILING-259` under `derived-from`, and no block with that id exists in
this repository. Under the counting rule §5 that is a hard check failure: *a `derived-from` naming a
non-existent id* fails `tools/quantities.js --check` and the sub-step does not close.

The Engineer named the gap himself at 1.7's addendum — "if it does not yet have a block, it needs one;
it is quoted in two files" — and this contract is now the third site quoting the value it derives from.
**The block is The Engineer's to write and it is owed against 1.7, not against this sub-step.** I quote
`Q-ROOT-ALLOWANCE` with its tag and deliberately do not restate the ceiling as a numeral, so that
nothing in this contract has to be corrected when the block lands.

### 3.4 Three counts in this contract are now governed and their existing echoes are bare

`Q-BOOTSTRAP-PHASES`, `Q-DEGRADED-MODES` and `Q-BLOCKING-MODES` are born here. The phase count and the
mode count are already stated as bare numerals in `lunar-oracle-gameplan.md` and in The Manager's Step
1 open, which makes both sites `--lint` findings under counting rule §3.1: a bare governed numeral in a
second file.

That is the Tier 2 touch rule working as designed rather than a defect introduced here. Both sites are
brought into form when they are next edited. Naming it so that the first `--lint` run does not read as
a surprise.

### 3.5 Handoffs

| To | What |
|---|---|
| **1.5**, install state record | The four facts named in §1 and no fifth. The three abnormal reads are cited by §3 Phase 5 and specified there. The observed-upstream-ref field is a field inside the currency fact, per §1.4 above. |
| **1.6**, currency policy | This contract fetches, reads and reports three refs per copy (BC-10, BC-11) and names the drift direction (§7). The comparison rule, the bump policy and the C4 record are 1.6's. |
| **1.13**, check register | BC-8's `core.hooksPath` wiring, and §8 item 7: the bootstrap wires the trigger and owns none of the checks. The container-versus-content finding's fourth instance is applied here at BC-12 through BC-19 as *assert content, not container*; the finding itself lands at 1.13. |
| **The Software Engineer**, group 3 review | Every assertion carries a command and a falsifier; every phase states what a failure does. The clause I most expect him to challenge is BC-7, and §1.2 states the evidence that would delete it. |
| **6.1**, bootstrap acceptance suite | The terminal-outcome set (§2), the idempotence definition (§3), the assertion ids (§4), the mode set and the blocking set (§5), and the origin availability mapping (§6) are the objects to assert against. §1.1 names the one change that would renumber phases and states why the ids survive it. |
| **6.6 / 6.7**, first-run sequence | Phase 7's gate is the two conditions in §3, and the blocking set is enumerated at §5. Any sub-step still phrased "only after a fully successful bootstrap" is restated against the list. |
| **The orchestrator** | §3.1 and §3.2, both one edit each to `.gitignore`. |

---

## 4. Extraction, verified

```
$ sed -n '/^<!-- BEGIN bootstrap_contract.md -->$/,/^<!-- END bootstrap_contract.md -->$/p' \
    cr_scratch/step1_4_systems_engineer_bootstrap_contract.md > /tmp/bc.md
$ head -1 /tmp/bc.md ; tail -1 /tmp/bc.md ; grep -cE '^### Phase [0-9]+\.' /tmp/bc.md
```

Result recorded at §4.1.

### 4.1 Result

Run and confirmed: the extracted block begins with `<!-- BEGIN bootstrap_contract.md -->`, ends with
`<!-- END bootstrap_contract.md -->`, and contains exactly seven `### Phase N.` headings, which is
`Q-BOOTSTRAP-PHASES` asserted mechanically rather than by counting a list by eye.

---

*The Systems Engineer, sub-step 1.4.*
