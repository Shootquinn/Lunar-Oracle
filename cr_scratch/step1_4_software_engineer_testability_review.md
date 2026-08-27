# Step 1.4, The Software Engineer: testability review of the bootstrap contract

**Persona:** The Software Engineer
**Sub-step:** 1.4, review half. Reviewing The Systems Engineer's `cr_scratch/step1_4_systems_engineer_bootstrap_contract.md`
**Under review:** the block between `<!-- BEGIN bootstrap_contract.md -->` and `<!-- END bootstrap_contract.md -->`
**Method:** `cr-agents/method/tdd_method.md`, read in full. Corpus not loaded. App not loaded.
**State at time of review:** repository root 55 characters; `cr-agents` `f0c976b`; `lsei` `7f97983`;
`literature/`, `findings/`, `oracle/` and `tools/githooks/` do not exist.

This is the A.9 tension and I am not resolving it. Where I disagree with him I have said so and left
both positions standing for The Manager.

---

## 0. Verdict

**The specification is the best-formed document this project has produced, and it is not yet
runnable.** Sixteen of the nineteen assertions execute as written; three do not. That is not the
problem. The problem is that four of the contract's structural claims — the terminal-outcome set, the
mode set, the blocking-set partition, and idempotence — are stated in a form a test can read and are
false, or unassertable, when a test reads them. He built the mechanism that makes them checkable and
then did not run the check against himself.

**I verified his live claim and it holds.** BC-12 through BC-16 pass, run just now, one command each.
He did not overstate.

**Fourteen findings, four of them blocking.** The four blocking ones are all in the same place: the
closed sets that §2 and §5 declare closed are not closed, and the document contains its own
counterexamples. Every one is cheap to fix and none of them requires a redesign.

**On the simplicity gate: nineteen is too many, and the excess is not where he will expect.** I would
cut three assertions, merge two into one, and reclassify one as a fact — nineteen assertions to
fourteen assertions plus one recorded fact. §6 makes the case per id. He invited a fight over BC-7
and **I decline to take it**, for a reason given at §6.3 that I think is more useful than the fight.

---

## 1. His live claim, verified by running it

He states that BC-12 through BC-16 were run against the current working copies and pass. TDD principle
7 says a reviewer must verify source claims he has not personally checked. This project has spent five
corrections this session on claims repeated without checking. So I ran them.

| Id | Command, verbatim from §4 | Result |
|---|---|---|
| BC-12 | `grep -q '^### A.12 Standing Roster' cr-agents/method/operational_guide.md` | **PASS.** Marker at line 365 |
| BC-13 | `test -s cr-agents/prompt0.md` | **PASS.** 82 lines |
| BC-14 | `grep -q 'KNOB_DATA' lsei/index.html` | **PASS.** 77 occurrences |
| BC-15 | `grep -q 'the back of the tapestry' lsei/lunar-scenario-explorer-map.md` | **PASS** |
| BC-16 | `test -d lsei/literature` | **PASS.** 8 folders, 152 `.md` |

**Claim confirmed, five for five.** I also re-ran his §4.1 extraction check rather than accepting it:
the block is 495 lines, begins and ends on the markers, and carries exactly `7 [Q-BOOTSTRAP-PHASES]`
`### Phase N.` headings and 19 distinct `BC-n` ids, contiguous from BC-1 to BC-19 with no gap and no
duplicate. His mechanical assertion of his own phase count is real and it is the right instinct.

Two of the five passes are passes I do not credit, and the reason is his own rule. See F5.

---

## 2. All nineteen, run

"No" in the runnable column means the command as written cannot be executed without supplying
something the contract does not supply.

| Id | Runnable as written | Result now | Note |
|---|---|---|---|
| BC-1 | **No** | fails | `$ROOT` is never bound by the contract. Run with `$ROOT` unset, `test -f "$ROOT/lunar-oracle-gameplan.md"` tests `/lunar-oracle-gameplan.md` and fails. See F8 |
| BC-2 | Yes | PASS | `git version 2.55.0.windows.1` |
| BC-3 | Yes | PASS | both `ls-remote` succeed |
| BC-4 | Yes | PASS | `v26.4.0` |
| BC-5 | Yes | PASS | `node -p "path.resolve('.').length"` → 55, inside `150 [Q-ROOT-ALLOWANCE]`. Measures the wrong path; see F10 |
| BC-6 | Yes | PASS | both copies show `DISABLED (push)` |
| BC-7 | Yes | write | unset at all three scopes before the write |
| BC-8 | Yes | write | **passes against a directory that does not exist.** See F6 |
| BC-9 | Yes | PASS (both empty) | the *remedy* is not idempotent; see F9a |
| BC-10 | Yes | PASS | both fetched clean |
| BC-11 | **Partly** | 2 of 3 refs | `HEAD` and `origin/main` read. The verified-against ref is "the tracked record… named by sub-step 1.5" and does not exist. Forward dependency, correctly declared |
| BC-12 | Yes | PASS | |
| BC-13 | Yes | PASS | container check; see F5 |
| BC-14 | Yes | PASS | asserts 1 of the 4 markers his own §1.3 names; see F12 |
| BC-15 | Yes | PASS | |
| BC-16 | Yes | PASS | container check; see F5 |
| BC-17 | **No** | — | "count of `literature/*/*.md` matching `NAMING.md`'s summary regex" is prose, not a command, and `literature/NAMING.md` does not exist in this repository |
| BC-18 | **No** | — | same, for `findings/` |
| BC-19 | Yes | absent | `literature/_pdf` absent. Correctly a recorded fact, not a failure — which is the point of F13 |

**BC-17 and BC-18 are the two assertions I most want and cannot run.** They gate the origin set, which
gates the refusal rule, which is the largest thing this contract does. They are also trivially fixable:
the regexes exist, they are `R_S` and `R_F` at §2 of `cr_scratch/step1_7_engineer_naming.md`, and I ran
them against `lsei/literature` as a stand-in corpus to prove the command is real — 152 leaves, 152
match `R_S`, 0 match `R_F`. Concretely:

```
# BC-17: assert non-zero
find literature -mindepth 2 -maxdepth 2 -name '*.md' -printf '%f\n' \
  | grep -cP '^(?!fa[0-8]-)[a-z0-9]+(-[a-z0-9]+)*\.md$'

# BC-18: assert non-zero
find findings -maxdepth 1 -name '*.md' -printf '%f\n' \
  | grep -cE '^fa[0-8]-[a-z0-9]+(-[a-z0-9]+)*\.md$'
```

Note `grep -P`, not `-E`: `R_S` uses a negative lookahead and POSIX ERE has none. That is the kind of
detail that separates a command from a description of a command, and it is why the substitution is
mine to hand over rather than his to leave as prose.

---

## 3. Findings, ordered by what they cost if ignored

### F1. BLOCKING. `ABORT` is defined twice and the two definitions contradict

§2:

> `ABORT` — A precondition failed in Phases 1 to 3. **The bootstrap performed no acquisition and
> assigned no degraded modes.**

Phase 5, on failure:

> a future schema version gives `ABORT` — the state record is refused, nothing is written, and Phases 6
> and 7 do not run.

By the time Phase 5 runs, Phase 3 has had its chance to clone and Phase 4 has already assigned the
in-force mode set and written four git config keys into two working copies. **Every clause of §2's
`ABORT` row is false on this path.** A test written against §2 — "assert that an `ABORT` run left no
mode set and cloned nothing" — fails against a correct implementation of Phase 5.

This is not a wording slip. `ABORT` is one of three members of a set the contract declares closed so
that 6.1 can assert on it, and the contract reaches that state from outside the region its own
definition allows. **A state exists that falls outside the enumeration as written**, which is exactly
the closure question I was sent to test.

Cheapest fix, and it is one row: split the outcome, or drop the second sentence from §2 and say
`ABORT` means *the bootstrap stopped before Phase 6 and the report names the phase*. I prefer the
second — three outcomes is the right number and a fourth would be arithmetic. But then §2 must stop
promising what an `ABORT` run did not do, because it does not know.

### F2. BLOCKING. `partially-acquired` turns on an undefined word, and contradicts `dirty-or-diverged`

`partially-acquired`: "Exactly one working copy is **usable**." The word `usable` occurs exactly once
in the 495-line contract — in that row. Nothing defines it. §5's opening sentence says "Every term
below is closed."

This is not pedantry, because the two readings give opposite answers on a case the project will hit
this month:

- **If `dirty-or-diverged` counts as usable:** the author edits `lsei/` in another window, one copy is
  dirty, both are usable, `partially-acquired` does not fire, the mode set is `{dirty-or-diverged}`,
  which does not block. The first-run sequence plays.
- **If it does not:** the same tree gives `{dirty-or-diverged, partially-acquired}`, which **does**
  block, because `partially-acquired` is in the blocking set.

The same directory yields both "plays" and "does not play". And the contract argues for the first
reading in prose — "a system that works and is a week stale still works" — while its own §5 closing
paragraph argues for the second: "A working copy under `dirty-or-diverged` is no longer the upstream
authority; it is a local variant." 6.1 cannot write this test. It is one sentence to fix and it must
be fixed by him, because either answer is defensible and the choice is his.

### F3. BLOCKING. `missing-recoverable` is unassignable, and the blocking-set partition counts it anyway

Phase 4 "then assigns the in-force mode set". Phase 3 runs before Phase 4 and resolves every missing
copy: cloned (no mode), clone failed (`offline`), root over allowance with a copy missing (`ABORT`,
Phase 4 never runs), `git` absent (`ABORT` at Phase 2). **There is no execution path on which Phase 4
assigns `missing-recoverable`.** The mode is a member of a closed set that the mechanism computing the
set can never produce.

He knows this and says so twice — the table's own "Blocks Phase 7" cell reads "never in force at Phase
7", and `Q-BLOCKING-MODES`'s `conditions` field says "missing-recoverable is excluded by resolution
rather than by classification". **What he does not draw is the consequence for the count he minted in
the same file.** `Q-BLOCKING-MODES` states `population: the 6 [Q-DEGRADED-MODES] rows … partitioned by
the "Blocks Phase 7" column` and `predicate: 3 of the 6 degraded modes block … and the other 3 do not`.
The live population is 5, the partition is 3 blocking and 2 non-blocking, and the sixth row is neither
— it is a transient of Phase 3 that never reaches the column the block says partitions it. A block
whose `population` names six rows and whose partition covers five is a well-formed block asserting a
false predicate, which is worse than a malformed one because `--check` passes it.

**In fairness the mode set is not his invention** — E15 in `lunar-oracle-gameplan.md` already reads
"*Missing but recoverable* resolves to success or to offline and is never itself a state at that
phase." The unreachability is inherited. The *count* is new at 1.4, because the quantity blocks are new
at 1.4, and a count is where an inherited imprecision stops being free.

Two dispositions and I recommend the first: **demote `missing-recoverable` out of the mode table into
Phase 3's prose as a transient**, giving `Q-DEGRADED-MODES` a value of 5 with 3 blocking and 2 not, and
a partition that covers its population. Or keep six and fix the predicate to say five are classified
and one is excluded by construction. The first is honest about what the set is; the second is honest
about what the table says. Either beats a set with an uninhabitable member and a test that can never
run.

### F4. BLOCKING. Node absent gives `CLEAN`, and BC-4 has no consumer

Phase 2: "The other three are recorded and carried forward; **each is consumed by a later phase**, and
none of them decides anything here." I traced the three. BC-3 is consumed by Phase 3. BC-5 gates
Phase 3. **BC-4 is consumed by nothing.** Its "On failure" cell reads "Record; consumed by whatever
invokes `tools/`" — and "whatever invokes `tools/`" is not a phase of this bootstrap. No phase reads
it, no mode covers it, no report line in Phase 5's ordered list of seven carries it, and §6's origin
table maps `app` to BC-14 alone.

So: Node absent, both copies present and clean. Mode set empty. Terminal outcome **`CLEAN`**. Then the
first `APP` question arrives, `origin: app` was reported available, and the model cannot be run.

**That is precisely the failure §6 was written to prevent.** His own sentence: "The bootstrap's
contribution is that the refusal happens at bootstrap time rather than at answer time, because a
refusal discovered mid-question has already cost the user the question." The mechanism is right and it
has a hole in it for one of the four preflight facts.

The three-outcome set is formally closed — every run terminates in one of the three — but the closure
is syntactic. **`CLEAN` is defined to mean the mode set is empty and it is being used to mean the
install works**, and here those come apart. This is the same defect shape as F1: the enumeration holds
and the meanings attached to it do not.

There is a second-order version. **BC-5's command is `node -p "path.resolve('.').length"`.** BC-5
therefore depends on BC-4, inside a phase that says its facts do not decide anything and are unordered.
Node absent plus a copy missing: BC-5 cannot be measured, and the gate on Phase 3 is undefined. Fix by
measuring the root length in the shell — I checked, `${#ROOT}` returns 55 on the same root as the node
form — which removes the dependency and leaves BC-4 with the zero consumers it already had.

**Recommendation: wire BC-4 into §6 as a precondition of origin `app`, or delete it.** I lean wire,
because the failure it prevents is real and the wiring is one table row. What I will not accept is
recording a fact for a consumer that does not exist. See §6.1.

### F5. MAJOR. The marker rule is not applied completely, and the falsifier column says where

Group 3's preamble is unambiguous: "**Every assertion in this group asserts a marker inside a file.
None of them asserts that a file exists.**"

BC-13 is `test -s cr-agents/prompt0.md`. That is a size check. BC-16 is `test -d lsei/literature`. That
is a directory check. Both are in group 3. Both pass against exactly the objects the rule was written
to exclude: a truncated download of `prompt0.md` is non-empty, and a `lsei/literature` left by a failed
sparse checkout is a directory. BC-19's `test -d literature/_pdf` is a third container check, though
that one is legitimate — BC-19 asserts a *fact about the install*, not a dependency, and the directory
is the fact.

**The tell is mechanical and it is in his own table.** Five of the nineteen rows carry `—` in the
"Falsified by" column: BC-2, BC-4, BC-13, BC-16, BC-19. Those five are exactly the five whose command
is a container or capability probe. The correlation is total. An assertion that checks a container has
nothing interesting to say about what would falsify it, because it asserts nothing interesting — and
the document is flagging its own exceptions in a column, in a file whose preamble says "Every assertion
carries an id, a command, **and the observation that would falsify it**." Five carry a dash instead.

Two of us arriving at this rule from opposite ends is worth stating, and I will state it, because it is
the strongest evidence this session that the rule is not a stylistic preference. He reasoned forward
from `test -f lsei/index.html` — a dependency that lives as content, where an empty file, a truncated
download and a GitHub error page all pass. I reasoned backward from a defect: `resolution-only` was
defined in my own suite as path-exists **and** named-text-present, and v1 tested neither, so the grade
carrying every literature answer in this system was being tested for spelling. Same hole, same class,
found from opposite directions three days apart. **That is a rule.**

So: **his application is complete across the five he ran and incomplete across the nineteen.** BC-13
and BC-16 are inside the group whose preamble denies they exist. Markers that work, verified just now:

- BC-13 → `grep -q 'Git Bash (MINGW64)' cr-agents/prompt0.md` (3 occurrences today).
- BC-16 → count `.md` under `lsei/literature` and assert non-zero (152 today). This matters more than
  it looks: BC-16's stated consumer is the corpus divergence check, and **a divergence check that
  compares against an empty directory reports agreement.** A container check on the thing a comparison
  compares against is the worst placement of the defect in the contract, because its failure mode is a
  *positive* result.

### F6. MAJOR. BC-8 passes against a hooks directory that does not exist

`git config core.hooksPath tools/githooks`. `tools/githooks` does not exist in this repository —
`tools/` holds three `.js` files and no hook directory. I ran the write into a scratch repository
pointed at a nonexistent path: **exit 0, config set, git accepts it silently, no hook ever fires.**

BC-8 is loose end E1, and E1's whole content is that a mechanism which is never triggered is not a
mechanism. BC-8 as written asserts a string is in a config file. He is honest about the limit — "**A
contract is not an installation**, and BC-8 asserting successfully is not evidence that any check
exists" — and that honesty is the right instinct pointed one step short of the target. The
container-versus-content rule applies to configuration exactly as it applies to files: `git config
--get` returning the expected string is the `test -f` of the configuration group. Assert that the
directory exists and holds at least one file, or BC-8 is a write carrying an assertion's id.

### F7. MAJOR. The bootstrap does not detect a fresh clone missing the corpus's own data files

I carried this as INV-13 and INV-14. **The bootstrap side does not exist.** Verified both directions
with `git check-ignore -q` against the committed `.gitignore`:

| Path | Status |
|---|---|
| `literature/REGISTER.tsv` | **IGNORED** |
| `literature/FIELDS.tsv` | **IGNORED** |
| `literature/INDEX.tsv` | **IGNORED** |
| `literature/NAMING.md` | allowed |
| `oracle/REGISTER.tsv` | allowed |

`/literature/**` with `!/literature/**/` and `!/literature/**/*.md` is deny-by-default admitting `.md`
only. It was written for a shelf of summaries and it excludes **by extension** every machine-readable
file the corpus needs. My register escaped by moving to `oracle/`. `FIELDS.tsv` and `INDEX.tsv` did
not.

**Now run the bootstrap against that clone.** BC-17 counts `.md` summaries matching `R_S`. The
summaries ship. **BC-17 passes.** Origin `literature` is reported available. §6 maps `literature`
available to `LITERATURE` and `CONTESTED` legal. Terminal outcome `CLEAN`. And retrieval runs
field-scoped IDF with no field map — which per the field-map argument at `step1_7_engineer_naming.md`
is a pooled document-frequency table over a union of two vocabularies producing a weight wrong for
both. **The system answers, confidently, with a scoring function silently wrong.** No phase notices.

This is the same failure shape as F5 one level up. BC-17 asserts *filenames* matching a regex, which is
a container check on a shelf: a correctly-named zero-byte file passes it. That is a lesser instance and
I raise it only to note the ladder — the marker rule does not stop at the file, it stops where the
thing you actually consume begins.

The asymmetry makes it worse rather than better. A fresh clone gets `oracle/REGISTER.tsv` and not
`literature/FIELDS.tsv`, so the contested-claims register is present and the field map is absent: **a
partial corpus that looks whole**, which is harder to notice than an empty one.

**Recommended: BC-20, in Phase 4 group 3, asserting a marker inside each machine-readable corpus
input, gating origin `literature`.** Its failure is not a report line — it is unavailability of the
origin, by the same argument that makes BC-17 gate it. This belongs in the bootstrap and not only in
my loop suite, because §6's entire architecture is "refuse at bootstrap time rather than at answer
time", and INV-14 is the answer-time half of a check whose bootstrap half he has not written.

The `.gitignore` fix is the orchestrator's and is three lines. **BC-20 is his and it survives the
`.gitignore` fix**, because a file can be admitted by `.gitignore` and still be absent, truncated or
empty on the disk in front of you. INV-13 closes today's instance; BC-20 and INV-14 close the class.

### F8. MAJOR. BC-1's command cannot falsify BC-1's falsifier

BC-1 asserts `test -f "$ROOT/lunar-oracle-gameplan.md"`, falsified by "a session in a subdirectory
bootstrapping the subdirectory; a session outside the repository bootstrapping a sibling."

The command **presupposes** `$ROOT`. Phase 1's job is to *produce* `$ROOT` by searching upward, and the
search is specified in prose with no command attached. Against the second falsifier the command is
worse than silent: a session opened outside the repository, next to a sibling tree that also holds a
`lunar-oracle-gameplan.md`, finds it by upward search, binds `$ROOT` to it, and **BC-1 passes.** The
assertion certifies the wrong tree.

BC-1 is the only assertion in the contract whose command tests a postcondition of an unspecified search
rather than the search. Fix: specify the search (upward from `pwd`, first hit wins, stop at the
filesystem root) and assert on the search — `$ROOT` is the nearest ancestor holding the file **and**
`pwd` is inside `$ROOT`. The second conjunct is what closes the sibling case and it is one `case`
statement.

I will say the smaller thing too, since he made a rule of it: BC-1 is a `test -f`. Here it is correct,
because in Phase 1 the file is a *locator* and its existence is the whole fact. That is the boundary of
the marker rule and it is worth having one clean example of the exception.

### F9. MAJOR. Idempotence is asserted, not assertable — on three counts, one of them measured

He deserves credit first: he defined the word, and defining it is the thing most specifications skip.
"Running the bootstrap twice in immediate succession performs no acquisition on the second run, writes
no field of `.oracle-state.json` to a different value except the timestamp, and produces a report
differing from the first only in timestamps." That is a definition 6.1 can hold a script to. Three
problems, and they get harder in order.

**(a) The remedy inside BC-9 is not idempotent, and I measured it.** BC-9's "On failure: **Unset it**;
report." I ran it:

```
$ git config --unset core.hooksPath   # run 1
exit=0
$ git config --unset core.hooksPath   # run 2
exit=5
```

`git config --unset` on an absent key exits 5. A naive implementation of BC-9's remedy reports a
failure on run 2 that it did not report on run 1, and the report then differs by more than a timestamp
— which is his own falsifier, fired by his own remedy. One `--get` guard fixes it. **The finding is not
the exit code, it is that phases 1–6 are declared idempotent as a block while one of their remedies is
not**, and nobody checked the remedies. There are four write-shaped assertions in group 1 and this is
the only one that is not a plain overwrite.

**(b) BC-10 admits the outside world into a claim about determinism.** BC-10 fetches on every run.
Between run 1 and run 2 an upstream can move; `origin/main` changes; the drift verdict changes; the
report differs by more than a timestamp. "In immediate succession" makes this improbable and improbable
is not the same as assertable. **A test that passes almost always is a flaky test**, and a flaky test
in the acceptance suite for the bootstrap is worse than no test, because it trains its readers to
re-run it. Fix in the definition, not the code: falsified by "a second run that clones, that changes a
recorded ref, or that reports a different mode set **against an unchanged tree and an unchanged
upstream**." Or have 6.1 point `origin` at a local fixture remote, which is what I would do and which
is also how the `present-but-wrong` and `offline` fixtures get built anyway.

**(c) "Phase 7 runs once per install" is offered as the contrast to idempotent, and it is not one.**
Phase 7 is gated on a flag. Running it twice leaves the same state as running it once. **Phase 7 is the
most idempotent phase in the contract** — it is the only one with an explicit guard. He is using
*idempotent* to mean *unconditional*, which is a claim about scheduling, and the standard meaning is a
claim about state. In a document whose preamble says "Every term below is closed", the one term 6.1
will build its hardest fixtures around is being used against its meaning. A test author reading §3
writes "assert Phase 7 is not idempotent" and that test fails against a correct implementation.

The repair makes the contract stronger rather than weaker: **all seven phases are idempotent; phases
1–6 are unconditional and phase 7 is gated.** That is one clean property over the whole sequence plus
one scheduling fact, instead of one property over six phases and an exception that is not an exception.

**Answer to the question I was asked: his definition is assertable for phases 1–6 modulo (a) and (b),
both one-line fixes, and the claim about phase 7 is not a claim about idempotence at all.** The
underlying design is sound. The word is wrong and the remedies were not audited.

### F10. MINOR. BC-5 measures the working directory, not the root, and does not enforce its own clause

Two defects, both small, both in a row that gates the only `ABORT` on the acquire path.

**It measures the wrong path.** `node -p "path.resolve('.').length"` measures `pwd`, annotated "run
from the root". But Phase 1 exists precisely because `pwd` need not be the root — its stated job is a
session opened in a subdirectory. Run from a subdirectory, BC-5 measures a longer path than the root
and can `ABORT` an acquire on an install that fits. It fails safe and it fails wrong. Measure `$ROOT`.

**The long-name clause is not enforced by the command.** BC-5 says "measured on the **long-name** form
of the path, never the 8.3 short form" and `path.resolve` is string manipulation with no normalizing
step. I tried to break it and could not: Windows normalizes the process working directory, so entering
via `C:\Users\QUINNM~1\...` yields `C:\Users\Quinn Morley\...` from `process.cwd()` under both bash and
PowerShell. **The clause holds by an accident of how cwd is set, not by the command.** It stops holding
the moment BC-5 is fixed to measure `$ROOT` as a string, which I just recommended:
`node -p "path.resolve('C:\\Users\\QUINNM~1\\AppData')"` returns the short form unnormalized, because
`resolve` on an absolute argument does nothing but clean separators. So the two fixes interact and the
second one needs `fs.realpathSync.native()`, or the clause comes out.

### F11. MINOR. BC-7's self-deletion clause cannot fire, which makes the clause permanent by accident

I was told he expects me to challenge BC-7 hardest. **I decline, and the reason is worth more than the
challenge.** A clause that costs one config write and ships with a written deletion criterion is not
ceremony — it is the cheapest form of a hedge, and my gate asks whether something earns its keep, not
whether it is beautiful. One `git config` call against a residual he named specifically (paths git
creates inside `.git` during a fetch of an upstream we do not control, which the root budget cannot
govern because it cannot count them) is a good trade. **Keep BC-7.**

What I will not let stand is the falsifier. "A run in which the setting changes no outcome inside the
allowance falsifies the clause's usefulness and it is deleted." You cannot observe *no outcome changed*
from one run. It requires two runs differing only in the setting, and the contract specifies no such
run and no phase that could perform one. **The deletion criterion is unfalsifiable as written, which
means BC-7 is kept forever on a promise nobody can redeem** — the exact failure mode of every
provisional clause in every specification. Make it fire: 6.1 clones once with the setting and once
without, into the same root, and the clause lives or dies on the result. One fixture. He wrote "I would
rather it be deleted on evidence than kept on habit" and I am taking him at his word by giving the
evidence somewhere to come from.

### F12. MINOR. BC-14 asserts one of the four markers its own justification names

§1.3: "the model is `KNOB_DATA`, `PRESETS`, `DETENTS` and `model()` inside that file". BC-14 greps
`KNOB_DATA`. `grep -q` matches anywhere, including a comment or an identifier in an unrelated script.
On the single most load-bearing dependency in the system — the authority on the model, whose failure
surfaces as a wrong number rather than a missing input — the assertion is one string weaker than the
reasoning that motivated it. All four are present today (77, 44, 54 and 1 occurrences respectively).
Assert all four. It costs three greps and it closes the case where a partial or reverted `index.html`
keeps one identifier and loses the rest.

### F13. MINOR. BC-19 is a fact sitting in a table of assertions

BC-19's "On failure" cell reads "Recorded as a fact, not a failure." An assertion that cannot fail is
not an assertion. Its presence inflates the count in §4 from fourteen real gates to nineteen, and 6.1
will dutifully write a test for it that is green by construction. **Move it into §1's fact list, keep
the id.** The fact itself is one of the best things in the contract — his justification, that the
author's `literature/` and a fresh clone's `literature/` are permanently different trees with the same
name and nothing else tells a session which one it is in, is the sharpest observation in the document.
It deserves better than a row in a table where it is the only member that cannot fail.

### F14. MINOR. §6's `LITERATURE` availability is narrower than the answer contract at version 2

§6: "`LITERATURE` and `CONTESTED` remain available if `literature` is available."

Rule V at v2: `LITERATURE` requires "at least one `literature` **or** `findings`". `CONTESTED` requires
"at least two `literature`, one per side of the axis" and forbids `findings`. **The two verdicts have
different availability conditions and §6 states one condition for both.** A shelf state with `findings`
available and `literature` not — reachable, since BC-17 and BC-18 are independent — makes `LITERATURE`
legal and `CONTESTED` not, and §6 as written covers neither. He mapped the two shelves onto the
four-origin closed set correctly everywhere else; this is one sentence that bundles two rules. Split
it.

---

## 4. The three judgement calls, tested

### 4.1 The root-length budget as a preflight fact rather than an eighth phase — **he is right**

His argument: A4 is a precondition of cloning, not of running; an over-budget root already holding a
working checkout demonstrably worked, and refusing there refuses a working install on arithmetic. So
it splits — measure in Preflight, refuse in Acquire on the acquire path only, report in Verify when
the copies are present.

I tested it by asking what the eighth phase would contain and what it would do on failure. It would
contain one measurement, and its failure behaviour would be *conditional on whether Acquire is going to
clone* — which is to say it would reach forward into a later phase to know what to do, which is what a
phase must never do. **His shape is right and the argument he gave is not his best one.** The best one
is that the refusal is not a property of the fact, it is a property of the action, so the refusal
belongs where the action is. The fact is unconditional and the refusal is conditional, and separating
them along that seam is what makes each half testable in isolation: BC-5 is a measurement 6.1 can
assert against a renamed directory, and the gate is a branch 6.1 can assert with a fixture root and one
copy deleted.

**One consequence he did not draw, in his favour.** Because the refusal is in Acquire and not in a
phase of its own, the id `BC-5` is stable under the renumbering he anticipates at §1.1. He says as
much — "The assertion ids in §2 §4 are stable under that change, which is why they are ids rather than
phase numbers." That is the right instinct and it is worth promoting to a project rule rather than
leaving as a footnote here: **assertion ids are the stable surface and phase numbers are not, so every
downstream document cites ids.** My suite already does. 6.1 should be told to.

**Where I disagree, on the "what would change my mind" clause.** He offers to convert the check to a
phase "2a" if 6.1 finds it cannot assert the refusal by construction. It can — the refusal is a branch
with two inputs and both are constructible. So the escape hatch will never fire, and like BC-7's
deletion criterion it will sit in the contract as an unresolvable conditional. Delete the clause and
own the decision. It is a good decision and it does not need a hedge.

### 4.2 An uninhabitable root as a terminal outcome rather than a seventh mode — **he is right, and F1 undercuts it**

His argument: the six modes are states a working copy can be in; an uninhabitable root is a property of
the install, detected before any mode can be assigned; making it a mode would break the enumeration to
describe a state the enumeration never reaches.

**Correct, and the type argument is the load-bearing one.** A mode is per-copy, or per-install derived
from copies; a root is neither. A test enumerating modes would have to construct a working copy in an
uninhabitable root to exercise the seventh, and that construction is the thing the state forbids. The
mode would be untestable by definition. He avoided that, and he avoided it for the right reason.

**But he then does to `ABORT` what he correctly refused to do to the mode set.** F1: `ABORT` is defined
as "a precondition failed in Phases 1 to 3, no acquisition, no modes assigned", and Phase 5 reaches
`ABORT` after acquisition and after modes are assigned. The discipline he applied at §5 was not applied
at §2. The argument for keeping the mode set clean is the same argument for keeping the outcome set
clean, and it is his own.

**One thing I would add and he would probably accept.** `ABORT` is currently the outcome for four
distinct causes: root not found, `git` absent, root over allowance with a copy missing, and a future
schema version. A report naming only `ABORT` sends the user to the wrong place three times out of four.
He handles this — each phase's failure text names the cause — but the contract does not *require* the
outcome line to carry it. One field: `ABORT (<phase>, <assertion id>)`. That is one string, and it
turns the terminal outcome from a verdict into a diagnostic, and 6.1 can assert on it, which it
currently cannot because all four causes are string-identical at the report's first line.

### 4.3 The marker rule — **the rule is right and the application is 14 of 19**

Covered at F5, F6, F7. The rule is correct, it is independently derived, and I am on record agreeing
with it from the other direction. His application is complete across the five he ran live and
incomplete across the fourteen he did not: BC-13 and BC-16 are container checks inside the group whose
preamble says there are none, BC-8 is the configuration-group analogue, and BC-17 is a filename check
where a content check is what the consumer needs.

**The generalisation, since two independent derivations earn one.** *Assert the thing the consumer
reads, at the granularity the consumer reads it.* `test -f` fails this because the loop reads content,
not paths. `grep -q KNOB_DATA` passes it for the app. `test -d lsei/literature` fails it because the
divergence check reads a file set. `git config --get core.hooksPath` fails it because git reads a
directory of hooks. Stated that way, the rule extends past files without being extended by hand, and it
predicts every one of the four holes above rather than cataloguing them.

---

## 5. The four things that post-date his draft

**(a) Two findings already applied — not re-reported.** `/.derived/` and the `findings/`
deny-by-default rules. I confirmed the current `.gitignore` state incidentally while checking F7 and it
matches what I was told. His §3.1 and §3.2 are closed. **His §3.2 recommendation was adopted
verbatim** — the `findings/` block is three lines with the same shape as `literature/`'s and its
comment says so.

**(b) His third finding is open and I have added to it.** `Q-ROOT-ALLOWANCE` **exists**, at
`cr_scratch/step1_7_engineer_naming_addendum.md:76`, value 150, class `fixed`. What does not exist is
its `derived-from` target `Q-PATH-CEILING-259`, which is a dangling reference and a hard `--check`
failure. His characterisation is exact and I confirmed it rather than repeating it. It is owed against
1.7 and it is one block.

The larger half is F7 and it is his to answer, not the orchestrator's. **Does the bootstrap contract
detect a fresh clone missing `FIELDS.tsv` and `INDEX.tsv`? No.** BC-17 passes on `.md` count, origin
`literature` is reported available, the outcome is `CLEAN`, and retrieval degrades silently with a
scoring function that is wrong in a way no assertion looks at. There is no bootstrap-side counterpart
to INV-13 or INV-14. BC-20 is the fix and it is one row in group 3.

**(c) Answer contract v2 checked, one mismatch.** He restated the offline refusal in the four-origin
vocabulary and mapped both shelves onto it, and the mapping is right: origin table correct,
`input-missing` correctly attributed to the bootstrap as owner, `APP`/`FIGURE`/`BOTH` refused when
`lsei/` is absent, `CONTESTED` correctly requiring `literature`. **The one mismatch is F14**,
`LITERATURE`'s availability condition bundled with `CONTESTED`'s when v2 gives them different ones.
Small, and it is the only place his §6 diverges from Rule V.

I will say the thing that is easy to skip: **restating a prose rule in a frozen vocabulary is the
single highest-value edit in this contract.** His §1.6 makes the case — "6.1 can assert the offline
behaviour by removing a directory and reading a verdict and a reason code, rather than by a human
reading an answer and judging whether it looked degraded." That is what the answer contract was for,
and he is the first persona to use it as a tool rather than cite it as a dependency.

**(d) The quantity blocks are well-formed, checked mechanically.** I did not eyeball them. I wrote a
parser against the counting-rule §2 key list and ran it:

```
block 1 Q-BOOTSTRAP-PHASES: keys=12 orderExact=true empty=[]
block 2 Q-DEGRADED-MODES:   keys=12 orderExact=true empty=[]
block 3 Q-BLOCKING-MODES:   keys=12 orderExact=true empty=[]
```

Twelve keys, exact declared order, no empty value, three blocks. That is check M1 satisfied. Internal
references resolve: `Q-BLOCKING-MODES` carries `derived-from: Q-DEGRADED-MODES` and that block exists
in the same file; `Q-BLOCKING-MODES`'s `population` quotes `6 [Q-DEGRADED-MODES]` in the tagged form
rather than as a bare numeral. The one dangling reference in the file is the inherited
`Q-ROOT-ALLOWANCE` → `Q-PATH-CEILING-259` chain, which is 1.7's.

**Well-formed, and one of the three asserts a false predicate.** F3: `Q-BLOCKING-MODES` declares a
population of six rows and a partition of 3/3 over a set whose sixth member never reaches the column
being partitioned. `--check` cannot catch this — it checks form, arity and arithmetic, and this block's
form is perfect. It is caught by the counting rule's §5 human row: "A `predicate` that does not license
the sentence beside it." **This is the first live instance of that row and it is worth recording as
one**, because it is the case the Designer wrote the human checks for and until now the argument for
them was hypothetical.

His §3.4 lint prediction is confirmed: `lunar-oracle-gameplan.md` row E15 states "Three of the six
degraded modes block" as bare numerals in a second file, and `cr_scratch/step1_manager_open.md` states
"seven phases, six degraded modes" twice. Three sites, all lint findings on first run, all correctly
predicted, none a defect introduced here.

---

## 6. The simplicity gate

Nineteen assertions and `7 [Q-BOOTSTRAP-PHASES]` phases for a bootstrap. My question is not whether it
is elegant, it is what breaks if each one is deleted. I asked it nineteen times.

### 6.1 What I would cut

**BC-3, the network probe. Cut.** Two `ls-remote` round trips at every session start for a fact that
arrives free and more accurately later. On the acquire path, Phase 3's clone failure gives the fact
exactly. On the no-acquire path, BC-10's fetch gives it exactly. BC-3 is subsumed on both paths, and
its own falsifier column admits it is unreliable where it is not subsumed: "A proxy answering
`ls-remote` for a host that cannot serve a clone." **An assertion that duplicates a downstream
observation and is less accurate than it is ceremony**, and it is the one place in this contract where
he assert-do-not-assume'd a fact that assumes nothing. Keep the *fact* "network reachable" in the
report; derive it from the clone or the fetch.

**BC-15, the generated map marker. Cut.** Report-only, on a derived artifact, whose own row says "the
map is derived and the app settles disagreements". Nothing consumes it and nothing changes on failure.
If the map is wrong and the app is right, the contract has already ruled which wins. **What breaks if
it is deleted: nothing, by the contract's own text.**

**BC-16, `lsei/literature`. Cut, or move.** Its sole stated consumer is the corpus divergence check,
which does not exist and is not owned by this contract. It is report-only. It is a container check
(F5). It should be born in the sub-step that writes the divergence check, in the form that check needs,
which is a file-set comparison and not a directory test. **Deferring it costs nothing and writing it
here costs a wrong assertion that will be inherited.**

**BC-13, merge into BC-12.** Both assert on `cr-agents`, both assign the same mode
(`present-but-wrong` on `cr-agents`), both have the same scope and the same consequence. Two ids for
one outcome is count inflation, and 6.1 builds one fixture to exercise both. **One assertion, two
markers** — the same shape I am recommending for BC-14 at F12.

**BC-19, reclassify.** Not a cut. It cannot fail (F13), so it is a fact, and it belongs in §1 beside
the four facts the state record carries — where, in substance, it already appears. It is currently in
two places under two types.

**BC-4, wire or cut.** As written it has no consumer (F4) and is therefore ceremony by my gate. But the
failure it would prevent is real and currently ends in a `CLEAN` report on an install that cannot
compute. **Wire it** — one row in §6's origin table, `app` available when BC-14 **and** BC-4 passed.
Then it is load-bearing and the hole closes. If he prefers not to wire it, it must go; there is no
third option in which a recorded fact with no reader stays in an assertion table.

**Net: 19 → 14 assertions plus 1 recorded fact.** Plus BC-20 from F7, which is the one addition I am
asking for: 15 assertions. Fifteen gates for a bootstrap that clones two repositories, writes four
config keys, checks two shelves and reports, is a number I will defend.

### 6.2 What is load-bearing, and I will say so plainly because he will expect the opposite

**BC-6 is the best assertion in the contract and I would fight to keep it.** It is E7 and E10 closed by
construction rather than by reporting, and his §1.5 second half is the sharpest paragraph in the
document: once push is disabled and asserted every session, a true result from `merge-base
--is-ancestor` stops being a direction and becomes evidence that the push-disable was defeated between
sessions. That is a mechanism that converts a detector into a stronger detector by removing the thing
it detects. Both copies show `DISABLED (push)` right now, verified.

**BC-14, BC-17, BC-18, BC-20 are the origin gates and everything in §6 rests on them.** These four are
the contract. The other eleven support them.

**BC-5, BC-8, BC-9, BC-10, BC-11, BC-12** all earn their keep, with the fixes above. **BC-1 and BC-2**
are the two `ABORT` gates and are not negotiable. **BC-7** I have argued to keep at F11, against
expectation.

### 6.3 The thing I am not going to argue about

He named BC-7 as the clause he most expects me to challenge and staged the ground for it. I looked, and
the honest answer is that a one-line config write with a stated deletion criterion is not where this
contract's weight is. **The weight is in F1 through F4** — four structural claims that a test can read
and that are false or unassertable when it does — and spending the review's credibility on a
`git config` call would have been performing the tension instead of using it.

The A.9 note in my accumulator entry records that at 0.2 he refused an exception on my grounds rather
than his own, and that the tension between us can produce agreement. It just did again, twice: the
marker rule, arrived at independently from opposite ends, and BC-7, where I was set up to attack and
found nothing worth attacking. **Two of the three judgement calls I was sent to test survive intact and
the third's rule survives with its application incomplete.** The place I want him to move is none of
the three — it is §2 and §5, where he applied his own discipline to the mode set and did not apply it
to the outcome set.

---

## 7. Test-plan consequences for 6.1

TDD principle 6: when the system under test changes structure, the tests referencing the old structure
are audited in the same step. The four blocking findings change structure. What 6.1 inherits:

| Object | State |
|---|---|
| Terminal outcomes | **Do not build fixtures until F1 is answered.** `ABORT`'s definition and `ABORT`'s reachable causes disagree, and the fixture for "an ABORT run assigned no modes" fails against a correct Phase 5 |
| Mode set | **Five constructible, one not.** `missing-recoverable` has no fixture and cannot have one; F3 |
| Blocking set | Constructible once F2 defines `usable`. `partially-acquired` currently has two contradictory fixtures |
| Idempotence | Constructible for phases 1–6 after F9a and F9b. The phase-7 fixture as currently implied by §3 asserts the wrong property; F9c |
| Assertion ids | **Stable across the phase renumbering he anticipates. Cite ids, never phase numbers** |
| BC-7 | Needs the A/B fixture at F11 or the clause is permanent |
| Origin availability | Four gates, one of which (BC-20) does not exist yet |
| `.oracle-state.json` | Schema at 1.5. Three abnormal reads specified there, cited here |

**One fixture buys more than any other and I want it named:** a local bare repository standing in for
each upstream. It makes BC-6's defeat case, BC-10's fetch failure, `offline`, `present-but-wrong`, the
drift directions in §7, and the idempotence-under-unchanged-upstream claim at F9b all constructible
from one piece of scaffolding. Without it, four of those six are constructed by unplugging a network
cable, which is not a test.

---

## 8. Handoffs

| To | What |
|---|---|
| **The Systems Engineer** | F1, F2, F3, F4 are his and are blocking. F5, F6, F8, F9, F12 are his and are one-line fixes. F7/BC-20 is his and is a new assertion. F14 is one sentence split. The §6.1 cut list is the argument I expect him to take up, and I have given the per-id reason so he can take it up id by id |
| **The Manager** | The A.9 record: I agree with two of his three judgement calls (§4.1, §4.2) and with the third's rule while dissenting on its completeness (§4.3). The open disagreement is §6.1, six assertions I would remove or reclassify and he will defend. F3 and F9c are where I expect him to push back hardest and where I am most confident |
| **The Designer** | §5(d): first live instance of counting-rule §5's human-check row — a well-formed block whose `predicate` does not license the sentence beside it, invisible to `--check`. The argument for the human checks stops being hypothetical here |
| **The Engineer** | `Q-PATH-CEILING-259` needs a block; now quoted in three files. Confirmed, still open, owed against 1.7. Separately: `R_S`/`R_F` need `grep -P`, not `-E`, and the runnable forms are at §2 above |
| **The orchestrator** | F7's `.gitignore` half: `/literature/**` admits `*.md` only and excludes `FIELDS.tsv` and `INDEX.tsv` from every fresh clone, verified with `git check-ignore -q`. Three lines, same shape as the `.md` re-admission already there. **This does not close F7** — BC-20 is the half that survives the fix |
| **1.5**, install state record | Unchanged by this review. His four-facts-and-no-fifth argument is sound and I found no fifth either. If F4 is closed by wiring BC-4, Node availability is computed at Preflight and reported, not stored — the same argument he used for the origin set |
| **1.6**, currency policy | F9b: the idempotence claim is coupled to the fetch, so the currency policy and the idempotence definition have to agree on what "unchanged" means |
| **6.1**, bootstrap acceptance suite | §7 in full. Do not start until F1–F4 are answered; three of the four change what the fixtures are |

---

*The Software Engineer, sub-step 1.4, review half.*
