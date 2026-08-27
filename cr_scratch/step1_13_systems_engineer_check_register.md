# Step 1.13, The Systems Engineer: the check register

**Persona:** The Systems Engineer
**Sub-step:** 1.13 (origin E8), Group 4, depends on 1.4
**Deliverable:** the block in §2, liftable verbatim to `oracle/check_register.md`
**Reasoning:** §1 (the rulings, and the two I declined). **Findings and handoffs:** §3. **Quantity
blocks:** §4. **Extraction verified:** §5.

**State at time of writing.** Repository at `de1fef0`, root 55 characters, **ten commits** (E9's
premise has expired — §3.7). `lsei` at `7f97983`; `cr-agents` at `f0c976b`. `tools/` holds eight
files, all tracked, **all at mode `100644`**. `tools/githooks/` does not exist. `oracle/` does not
exist. `git version 2.55.0.windows.1`.

Everything asserted below about git's behaviour was run in a scratch repository this session, not
recalled. The transcripts are in §1.2 and §3.

---

## 1. Reasoning

### 1.1 The unit of the register is the artifact, not the assertion

This is the first ruling and every other one depends on it.

There are, right now, specified in Step 1's deliverables: fifteen bootstrap assertions (1.4, after
The Software Engineer's gate), fourteen register-schema assertions (1.8 §9), two `match_keys` build
checks (1.8 §4.1, which are 1.8 §9's `B3` and not a third thing), twelve counting-rule mechanisms
(1.12, via 1.11's M1–M12), six checkable answer-contract clauses (1.3 §3.1), and 211 tests (1.11 v2).
That is roughly 260 claims. A register with 260 rows is an index of claims. This project already has
one of those: it is called the test suite, and it is 1.11's.

**E8's complaint has a unit and the unit is the invocation.** "Nothing invokes the checks" is a
sentence about `tools/check_corpus_collisions.js`, a file, not about the rule it enforces. A register
keyed on assertions cannot answer *what invokes it* without writing one answer down fourteen times,
and a column whose value is copied fourteen times is a column nobody maintains.

**So: a row is an artifact that runs.** An assertion is a claim an artifact makes, and it belongs in
the contract that states it. The register's `authority` column is the pointer from the artifact back
to the claims, and it is a citation, not a copy.

**The one refinement, and it comes from The Software Engineer's own criterion.** At 1.11 he ruled
that `quantities.js` is one script with three modes "because there are exactly three consequences a
caller has to branch on — `--check` exits 1 and blocks, `--lint` exits 0 and reports, `--index`
writes — and a mode boundary drawn on consequence is the only one a caller can act on." I take that
rule and apply it here: **a row is one (artifact, consequence) pair.** `quantities.js` is one file
and four rows, because it has four consequences. The closure key is the path, and CL-1 asks for *at
least* one row per file, not exactly one.

This is what makes the 1.11 `--live` ruling survive as a mechanism rather than as a paragraph. See
§1.4.

### 1.2 What proves a hook fires. Three layers, all probed

The charge is right and it is worse than stated. Here is the probe, run this session:

```
$ git init -q hookprobe && cd hookprobe
$ git config core.hooksPath tools/githooks     # tools/ does not exist
$ echo $?
0
$ git config --get core.hooksPath
tools/githooks
$ echo x > a.txt && git add a.txt && git commit -qm one && echo $?
0                                               # no hook fired; nothing said so
```

**BC-8 as I wrote it asserts that a string is in a config file.** F6 is upheld in full, and F6's own
remedy — "assert that the directory exists and holds at least one file" — is *still* a container
check and I decline it. A directory holding a file named `precommit`, or `pre-commit.sh`, or
`pre-commit` at mode `100644`, satisfies it and fires nothing.

**Layer 1. Assert through git's own resolver.** Git 2.36 and later expose the resolver:

```
$ git hook run pre-commit ; echo "exit=$?"       # hooksPath -> nonexistent dir
error: cannot find a hook named pre-commit
exit=1
$ mkdir -p tools/githooks && printf '#!/bin/sh\nexit 3\n' > tools/githooks/pre-commit
$ git hook run pre-commit ; echo "exit=$?"
exit=3                                            # the hook's own code, propagated
$ rm tools/githooks/pre-commit ; git hook run pre-commit ; echo "exit=$?"
error: cannot find a hook named pre-commit
exit=1
```

One command tests `core.hooksPath` resolution, directory existence, filename correctness, the
executable bit, and the hook's exit code — **through the same code path that runs the hook at commit
time.** That is the difference between asserting a configuration value and asserting a mechanism, and
it is one line. Verified also from a subdirectory: a relative `hooksPath` resolves against the
repository root, not the working directory, so the bootstrap may run it from anywhere.

**Layer 2. The trigger lives in a mode bit, and this repository does not commit mode bits.**

```
$ git config --get core.filemode
false
$ git ls-files -s tools/
100644 ... tools/audit_abstract_overlap.js
100644 ... tools/check_corpus_collisions.js
100644 ... tools/check_register_rows.js
100644 ... tools/ecr_key_candidates.json
100644 ... tools/ecr_keycheck.js
100644 ... tools/ecr_probes.js
100644 ... tools/ecr_verify.js
100644 ... tools/probe_register_encoding.js
```

**Eight of eight, mode `100644`**, including the two carrying `#!/usr/bin/env node`, which `ls -l`
reports as `-rwxr-xr-x` because the filesystem lies about this on Windows. For the `.js` files it is
cosmetic: they are invoked as `node tools/x.js`. **For a hook it is fatal**, because git invokes the
hook directly and skips a non-executable one. A hook authored here, committed here, checked out on
Linux, is inert — and `git hook run` on the author's machine passes, because Windows reports every
file executable. This is the container/content rule at its sharpest: **the file's bytes are
committed and its trigger is not, because the trigger is not in the bytes.** `git update-index
--chmod=+x` records `100755` and is the fix; asserting `100755` in the index is the check.

**Layer 3. `git hook run` proves the hook *would* fire. It does not prove one *did*.**

```
$ git commit -qm normal            ; cat .git/canary   ->  PRE POST
$ git commit -q --no-verify -m x   ; cat .git/canary   ->  POST
```

Verified: **`--no-verify` skips `pre-commit` and does not skip `post-commit`.** That asymmetry is a
free bypass detector. `pre-commit` writes a nonce to `.git/hook-canary`; `post-commit` consumes it,
and if it is absent appends `HEAD` to `.git/hooks-bypassed`. Consumption makes it exactly-once and it
is correct for root commits, merges and amends without any parent arithmetic. The bootstrap reports a
non-empty `hooks-bypassed`.

It detects; it does not prevent, and nothing can prevent it — `--no-verify` is git's, not ours. I
keep it because the committer here is frequently an agent in a shell, `--no-verify` is exactly the
shortcut a blocked agent takes, and without this nothing in the system would ever notice. Three lines
in a hook that turn a silent defeat into a report line is the best ratio in this document.

**These three become HK-1, HK-2 and HK-3 in §5 of the deliverable, and BC-8 is replaced.** The
amendment to my own 1.4 contract is in §3.1.

### 1.3 What makes the list closed rather than complete on the day it was written

A list is complete when someone finished writing it. **A list is closed when its complement is
computed.**

So the register declares its own scan roots, in the register file, as `S` rows; and CL-1 asserts that
every file under every scan root has at least one row. Add a file to `tools/` without a row and the
check fails. That is the whole mechanism and it is a directory walk.

**Two roots: `tools/**` and `oracle/**/*.js`.** Not "checks in `tools/`" — *every file* in `tools/`,
which is why `ecr_key_candidates.json` gets a row with `kind: fixture` rather than an argument about
whether a data file counts. A population rule that is a directory listing has no judgment in it, and
a population rule with judgment in it is re-litigated by every future author. This is the
deny-by-default posture from 1.1's `.gitignore` applied to a second surface: **the same rule twice,
not two rules.**

Rows are permitted outside the roots — `oracle/bootstrap_contract.md`, and the upstream tokenizer at
`lsei/oracle/lib/literature_search.js`. CL-1 is one-directional (roots ⊆ rows); CL-2 is the other
direction (every row's path resolves).

**And I will state the limit rather than let it be found.** A check written into a directory that is
not a declared root is invisible to CL-1. The defence is that adding a root is one `S` row and that
the roots are in the file being reviewed. It is not a proof; it is a place where the failure is one
line from being visible instead of zero lines from being invisible.

### 1.4 The shell-executing check, ruled

The charge is right that this is a live hazard and not bookkeeping. `quantities.js --check` as
specified at 1.12 §5 would re-run `cmd:` strings harvested from markdown. The Software Engineer moved
that behind `--live` at 1.11 F9. A register that then wrote `pre-commit` into its row would undo the
ruling by filing it.

**The rule, and it is general rather than about one script:** a row may name an automatic trigger
(`pre-commit`, `post-commit`, `merge-gate`, `answer-loop`, `session-start`, `ci-linux`) only if the
check's behaviour is a pure function of the repository's tracked bytes. **A check that executes a
string sourced from a repository file is not a function of the content; it is a function of what the
content instructs.** Such a row's `invoked_by` is `manual` and nothing else.

That is why `--live` is its own row rather than a clause. `CHK-17` reads `manual`, alone, in the
column a future sub-step will scan when it wires things up. **The ruling is now a cell, and 2.14 has
to overwrite a cell to break it rather than merely fail to read a paragraph.**

**The mechanical half is partial and I will not dress it up.** CL-7 greps any script whose row names
an automatic trigger for `child_process`, `execSync`, `eval(` and `new Function`, and **reports**. It
cannot distinguish `execFileSync('pdftotext', [file])` — a fixed command with a data argument, which
is fine — from executing a harvested string, which is not; and it is defeated by
`require('ch'+'ild_process')`. So the blocking half is a person, at the gate, per 1.12 §5's fourth
row. The report exists because it names the exact file the reviewer must open, and a worklist is not
theater. The adversary here is a hurried agent, not an attacker, and I am not going to write a
sandbox for a project with ten commits.

### 1.5 Where the regress grounds, said plainly

A register nobody checks is E8 one level up; a checker nobody invokes is E8 two levels up. The chain
as built:

```
CHK-09 (tools/checks.js) checks the register
  invoked by  CHK-10 (tools/githooks/pre-commit)
  which fires only if                     HK-1  (git hook run pre-commit exits 0)
  which is asserted by                    CHK-09, at session-start, from the bootstrap
  and whose bypass is reported by         HK-3  (the post-commit canary)
  and the bootstrap is                    CHK-23 (oracle/bootstrap_contract.md)
  which is executed by                    an agent reading CLAUDE.md
  and nothing verifies that it ran.
```

**The base case of this project's entire enforcement chain is an agent's compliance with a document,
and no mechanism verifies it.** That is not a defect I can close at 1.13 and I am not going to pretend
otherwise by adding a row that asserts it. It is a fact about a system whose bootstrap is prose, and
it makes 6.1 — the bootstrap acceptance suite — the highest-value unbuilt item in the plan, because
6.1 is where the bootstrap acquires an executor that a test can drive.

What the chain does buy: every link above the base case is machine-checked, and each one's failure is
*reported by the link below it* rather than silently. That is strictly better than what exists today,
where none of it is checked and nothing reports anything.

### 1.6 The pattern, at instances seven and eight, both found in this sub-step

The charge lists six. **I am adding one instance and one measurement, and I want the difference
between those two words to hold**, because the accumulator records that this project's last
overstated finding was a correct measurement wearing a wrong verdict.

**Seven: the executable bit.** §1.2, layer 2. The hook is committed as content and its trigger is a
mode bit, which is metadata. Every previous instance was *the container was searched and the content
was the dependency*. This one inverts: **the content is committed and the container's attribute is
the dependency.** Same family, opposite end. It is worth naming because a "check the file is there"
reflex and a "check the marker is inside" reflex both pass it.

**Instance three, measured rather than restated: the tokenizer mirror is four mirrors.** This is
not a new instance — the charge already lists "the retrieval tokenizer is mirrored by hand rather
than imported" as instance three. What is new is its size, and the size is what decides whether it
gets a mechanism:

| File | stopwords | sorted-set sha1 |
|---|---|---|
| `lsei/oracle/lib/literature_search.js` | 82 | `3db950305166` |
| `tools/check_corpus_collisions.js` | 82 | `3db950305166` |
| `tools/ecr_keycheck.js` | 82 | `3db950305166` |
| `tools/ecr_probes.js` | 82 | `3db950305166` |
| `tools/ecr_verify.js` | 82 | `3db950305166` |

All five agree today. Two files — `check_register_rows.js` and `probe_register_encoding.js` —
`require()` the upstream module instead. So of six consumers, **four hold a copy and two hold a
reference.**

Loose end E5 records the mirror as a single accepted limit and E13 records that sub-step 3.7 will
rebuild the upstream tokenizer, converting the risk to a certainty. **E5's limit is understated by a
factor of four.** When 3.7 lands, four committed checks go stale silently, and the one that fails
worst is `check_corpus_collisions.js`, whose entire failure mode is *passing on a pair the search
cannot tell apart*.

**And instance three is detectable by one grep**, which is the reason it is worth measuring
rather than restating. The upstream stopword list contains the literal `and/or`, which
is distinctive enough to be a marker and appears in no other role. Run over `tools/`:

```
tools/audit_abstract_overlap.js          0     (does not use the tokenizer)
tools/check_corpus_collisions.js         1     MIRROR
tools/check_register_rows.js             0     imports
tools/ecr_keycheck.js                    1     MIRROR
tools/ecr_probes.js                      1     MIRROR
tools/ecr_verify.js                      1     MIRROR
tools/probe_register_encoding.js         0     imports
```

Four true positives, three true negatives, no false anything. **This is the container/content rule
applied to code reuse: assert a marker that exists inside the shared implementation and must exist
nowhere else.** It is CL-6, and it is the reason the register has a `library` kind at all.

CL-6 is **RED on the day it is written**, with four named failures and a close condition at 3.7. I am
leaving it red on purpose, following the precedent The Software Engineer set with LIM-3 at 1.11: a
test that is red with a named owner and a named close condition is a stronger finding than a
paragraph, and writing it to the state of the world would bake the defect in.

### 1.7 The simplicity gate, run on myself first

Eight columns. For each: what breaks if it is deleted.

| Column | Deleted → |
|---|---|
| `id` | Rows cannot be cited. The counting rule requires an id for anything governed, and a check's disposition is governed. |
| `path` | **CL-1 has nothing to join on and the list stops being closed.** This is the closure key. |
| `kind` | The charge's central requirement dies: a harness filed as a check is a claim nobody made, and a fixture filed as a check is a claim nothing can make. |
| `asserts` | E1's own defect: a row saying a thing is wired without saying what it wires. Also carries the marker for `library` rows, so CL-6 goes with it. |
| `invoked_by` | The register becomes the inventory it was written to replace. **This is the column E8 is about.** |
| `on_failure` | The only thing a caller branches on. Also the home of the `none` value, which is how a silent check becomes countable (§3.3). |
| `authority` | Nothing records what breaks if the check is deleted — the gate, applied to the register itself. |
| `status` | A specified-but-unwritten check is indistinguishable from a live one, and the register reports full coverage on day one with almost nothing built. |

Two columns I considered and cut. **`fires`**, the event: folded into `invoked_by`, because an
invoker without an event is not an invoker, and every token in that closed set names both. **`owner`**,
a persona: the `authority` cell already names the sub-step, and a sub-step has an owner. Two columns
for one fact is the defect this project keeps finding in its own registers.

Twenty-four rows. Eight are the files that exist; fifteen are specified in Step 1's deliverables and
not yet written; one is an upstream library six rows depend on. **I have not padded it**: every row
is a distinct path or a distinct consequence, and §3.3 records the two rows I would rather delete
than defend, together with the reason they cannot be deleted yet.

### 1.8 Two things I declined

**I declined to give the fifteen bootstrap assertions, the fourteen schema assertions and the 211
tests rows of their own.** §1.1. They are claims; the register enumerates things that run. They are
represented by CHK-23, CHK-04/CHK-22 and CHK-18 respectively, and by the `authority` column that
points at the contracts stating them.

**I declined to specify a `verify_report.js` extraction check.** Author ruling 1 dropped the
dependency. `oracle/lib/claim_bearing.js` is its replacement and it has a row (CHK-20) as a
`library`, with the implementation row placed in Step 3 as The Software Engineer ruled at 1.11 §5.1
F8. What CHK-20 buys today is CL-6 applied to it before it exists: three consumers are named in its
row, and the day one of them restates the answer contract §7 clause instead of importing it, CL-6
fails. **The rule that would have caught the tokenizer mirror is installed before the second
opportunity to make the same mistake, rather than after it.**

---

## 2. The deliverable

Everything between the markers lifts to `oracle/check_register.md` unedited.

<!-- BEGIN oracle/check_register.md -->

# The check register

**Contract version: 1.** Closes loose end E8; replaces BC-8 of the bootstrap contract.

A check that nothing invokes is not a mechanism. This file is the closed list of everything in this
repository that runs against the repository, and for each one: what it asserts, what invokes it, what
a failure does, and what breaks if it is deleted.

## 1. What a row is

**A row is one artifact and one consequence.** An artifact with two consequences — a script with a
blocking mode and a reporting mode — has two rows sharing one path. An assertion is not a row: an
assertion is a claim, it lives in the contract that states it, and the `authority` column points
there.

The register enumerates things that run. It does not enumerate what they prove.

## 2. Closed vocabularies

Every one of these is closed. A value outside a set is a failure, not a variant.

**`kind`** — six.

| Value | Meaning | Legal `on_failure` |
|---|---|---|
| `check` | Asserts something and has a consequence when it is false. | `block`, `refuse`, `report`, `none` |
| `trigger` | Invokes other rows. Asserts nothing itself. | `block`, `report` |
| `generator` | Writes a committed artifact. Its output's correctness is asserted by some *other* row, never by itself. | `n/a` |
| `library` | A shared implementation consumed by other rows. Not invoked. | `n/a` |
| `harness` | Measures and reports. Settles an argument; does not stand guard. **Never on an automatic trigger.** | `report`, `n/a` |
| `fixture` | Data read by another row. | `n/a` |

**`invoked_by`** — a comma-separated, non-empty set from: `pre-commit`, `post-commit`, `merge-gate`,
`substep-gate`, `answer-loop`, `session-start`, `ci-linux`, `git`, `manual`, and
`consumed:<id>[,<id>...]` for `library` and `fixture` rows. Each token names an invoker *and* the
event it fires on; that is why there is no separate `fires` column.

**`on_failure`** — five.

| Value | Meaning |
|---|---|
| `block` | Exits non-zero; the commit, merge or sub-step does not proceed. |
| `refuse` | The answering loop emits a refusal code instead of an answer. |
| `report` | Exits zero, prints, and a person dispositions the findings. |
| `none` | **The artifact cannot fail: it exits zero whatever it finds.** A defect value, not a design value. See CL-5. |
| `n/a` | Not a check. |

**`status`** — three: `live` (committed and runnable), `specified` (a contract states it; the
artifact does not exist), `retiring` (committed, superseded, with the successor row and the removing
sub-step named in `authority`).

## 3. Columns

Nine fields, tab-separated, in this order, on every `C` row. None may be empty; none may contain a
tab or a newline.

```
C  id  path  kind  asserts  invoked_by  on_failure  authority  status
```

**`asserts`** — for `kind: check`, the falsifiable claim in one clause. For every kind except
`library`, what the artifact does.

For `kind: library` the cell is **exactly** `marker: <literal>` and nothing else — the **reuse
marker**, a string that occurs inside the shared implementation and must occur in no consumer. It is
a literal because CL-6 greps it; a description of the marker is not a marker. `marker: -` is
permitted only while `status` is `specified`, and CL-6 requires a resolved marker before a `library`
row may become `live`.

**`authority`** — what breaks if this row is deleted, as an address: a register row, a sub-step, or a
contract section. Prose only where no address exists.

Two other row types. **`H`**, one row, first row, seven fields: `H version at rows live specified
retiring`, declaring the register's own size so a row lost to a bad splice is detectable by counting.
**`S`**, one row per scan root, two fields: `S <glob>`.

## 4. Closure

The list is closed, not merely complete, because **its complement is computed.**

```
CL-1  ROOT COVERAGE
      every file under every S root has at least one C row whose path is that file
      a new file in a scan root with no row fails this                          block

CL-2  PATH RESOLUTION
      every C row whose status is not `specified` names a path that exists on disk
      a `specified` row whose path exists must be moved to `live`                block

CL-3  CLOSED SETS AND SELF-DECLARED SIZE
      id matches ^CHK-[0-9]{2}$ and is unique; kind, on_failure and status are in their sets;
      every invoked_by token is in its set or is consumed:<ids> naming existing ids;
      the H row's four counts equal the parsed counts                           block

CL-4  CONSEQUENCE LEGALITY
      the (kind, on_failure) pair is legal per the table in section 2;
      no row whose kind is `harness` names an automatic trigger                 block

CL-5  NO SILENT CHECK
   a. no row with kind `check` and status `live` has on_failure `none`
      -- a check that exits zero on its own findings is an inventory entry      block
   b. every row with status `retiring` names a removing sub-step in authority,
      and the H row's retiring count is non-zero only while (b) holds
      -- `retiring` is the exemption (a) grants; (b) is what gives it an expiry report

CL-6  NO MIRRORED LIBRARY
      for every row with kind `library` whose path exists: the marker in `asserts` occurs in
      that row's file, and occurs in no file named by a consumed:<id> in that row's invoked_by
      -- a consumer holding the marker holds a copy, not a reference
      a consumer whose own path does not exist yet is skipped, not passed;
      a `library` row may not be `live` while its marker is `-`                 block

CL-7  TRUST BOUNDARY                                            (reports; does not block)
      for every row naming an automatic trigger: report any occurrence of child_process,
      execSync, eval( or new Function in that row's file
      -- section 6 is enforced by a reviewer; this names the file she must open report
```

**CL-6 is RED as this register lands**, on four of `CHK-24`'s six consumers, and its close
condition is 3.7 where the upstream tokenizer is rebuilt and the mirrors must become imports. It is
written to the rule rather than to the state of the world, deliberately: a red assertion with a named
owner and a named close condition is a finding, and one written to match today is a defect made
permanent.

**CL-5(a) is GREEN, and that is the thing to look at rather than past.** Its only two candidate
failures, `CHK-03` and `CHK-05`, carry `status: retiring`, and (a) is scoped to `live`. So the
assertion whose whole subject is the two silent checks in this repository does not fire on either of
them. That is deliberate — a blocking check red on landing day blocks every commit until 2.15 — but
an exemption with no expiry is a permanent exemption, which is the defect one level down. **CL-5(b)
is the expiry** and the `H` row's `retiring` count is where it is visible. See the reasoning at
§3.4.

**What CL-1 cannot see.** A check written outside every declared root is invisible to it. The defence
is that a root is one `S` row in this file. That is a shorter distance to visibility, not a proof.

## 5. What "invoked by `pre-commit`" is allowed to mean

**Setting `core.hooksPath` is not evidence that any hook exists.** Verified: `git config
core.hooksPath tools/githooks` against a nonexistent directory exits 0, reads back correctly, and the
next commit succeeds with no hook firing. Asserting the configuration value is the `test -f` of
configuration.

Three assertions replace it. `CHK-09` runs HK-1 and HK-2; `CHK-11` implements HK-3.

```
HK-1  THE RESOLVER FIRES
      git hook run pre-commit  exits 0
      -- exercises hooksPath resolution, directory existence, filename, executability and the
         hook's exit code, through the code path git uses at commit time
      falsified by: any of those five being wrong, each of which gives exit 1
      on failure: every row naming pre-commit is UNWIRED and is reported by id       block

HK-2  THE TRIGGER IS COMMITTED, NOT JUST THE BYTES
      git ls-files -s tools/githooks/  reports mode 100755 for every file
      -- core.filemode is false on the authoring machine and every file in tools/ is
         committed at 100644 today. A hook at 100644 is inert on a Linux clone and passes
         every check on the machine that wrote it.
      fix: git update-index --chmod=+x                                               block

HK-3  IT ACTUALLY FIRED                                          (reports; does not block)
      pre-commit writes a nonce to .git/hook-canary; post-commit consumes it, and when it is
      absent appends HEAD to .git/hooks-bypassed; the bootstrap reports a non-empty file
      -- verified: --no-verify skips pre-commit and does NOT skip post-commit
      -- detects a bypass; cannot prevent one. Consumption makes it exactly-once and correct
         for root commits, merges and amends without parent arithmetic.             report
```

**HK-1 proves a hook would fire. HK-3 proves one did.** Neither substitutes for the other.

`git hook run` invokes the hook with nothing staged, so **every hook this register wires must be safe
and meaningful with an empty index.** A hook whose checks require staged content reports that as a
skip, not as a pass.

## 6. The trust boundary

**A row may name an automatic trigger only if the check's behaviour is a pure function of the
repository's tracked bytes.** A check that executes a string sourced from a repository file is not a
function of the content; it is a function of what the content instructs. Its `invoked_by` is `manual`
and nothing else.

This is why `CHK-17` exists as its own row. Re-running a `live` quantity's `cmd:` operation was never
a blocking failure — it is a report — and a report a person asks for is a report a person reads.
Wiring it to a commit hook would run arbitrary shell harvested from markdown on every commit, under
whatever a future agent wrote into an `operation:` field.

CL-7 is the mechanical half and it is partial: it cannot distinguish a fixed command with a data
argument from an executed string, and it is defeated by a computed module name. **The blocking half is
the reviewing persona at the gate**, per the counting rule's section 5. CL-7's value is that it names
the file she has to open.

## 7. Landing rule

**A check is not landed until its row exists.** Not "should have"; the row is what makes it a
mechanism, and CL-1 makes the omission fail rather than pass.

Correspondingly: **a row with `status: specified` is a debt, not a mechanism.** Fifteen of the
twenty-four rows below are debts today. The register states that plainly rather than reporting
coverage it does not have.

**Amending this file is amending a contract.** Adding a row, adding an `S` root, or moving a row from
`specified` to `live` is a change reviewed at the sub-step that makes it, and it bumps the `H` row's
counts.

## 8. The register

```
# BEGIN CHECKS
H	1	2026-08-27	24	7	15	2
S	tools/**
S	oracle/**/*.js
C	CHK-01	tools/check_corpus_collisions.js	check	no two summaries under a corpus root tokenize to the same key set	pre-commit,merge-gate	block	E5; E13; gameplan A3 -- the retrieval layer cannot distinguish colliding names and silently returns one of them every time	live
C	CHK-02	tools/audit_abstract_overlap.js	harness	measures verbatim 10-gram overlap between a summary's Abstract and its paired PDF; classifies nothing	manual	report	Open Question 8. A shingle detector measures overlap, not passing-off; the difference is visible only by opening the file	live
C	CHK-03	tools/check_register_rows.js	check	1.8 section 9 L2-L5, B1-B3, B6, B7 over a TSV path	substep-gate	none	superseded by CHK-04, removed at 2.15; hard-codes an absolute corpus path containing the author's username and cannot run on any other install	retiring
C	CHK-04	tools/ecr_verify.js	check	1.8 section 9 L2-L5 and B1-B7 over a TSV path or a deliverable's marked block, against a given corpus root	substep-gate,merge-gate	block	1.8 section 9. The only implementation of the schema assertions that exits non-zero; CHK-03 and CHK-05 consolidate into it at 2.15	live
C	CHK-05	tools/ecr_keycheck.js	check	1.8 section 4.1 K1 and K2 over a JSON axis fixture	manual	none	superseded by CHK-04, removed at 2.15; K1 and K2 are CHK-04's B3 and this adds nothing CHK-04 lacks	retiring
C	CHK-06	tools/ecr_probes.js	harness	reports per-axis IDF-weighted separation between probe_pos, probe_neg and every other axis's match_keys	manual	report	1.8 section 4.3. The labelled data 3.6 sets the firing threshold K against; K is deliberately unset until then	live
C	CHK-07	tools/ecr_key_candidates.json	fixture	the ECR axis, member and candidate-key set CHK-05 reads	consumed:CHK-05	n/a	1.10's Q-ECR-KEYS measurement. Retires with CHK-05 at 2.15	live
C	CHK-08	tools/probe_register_encoding.js	harness	measures what each of three register encodings does to retrieval IDF and to full-text confirmation; self-declared not a mechanism	manual	report	1.8 section 1.1. The numbers the encoding ruling rests on, so a successor can re-run them rather than trust them	live
C	CHK-09	tools/checks.js	check	CL-1 to CL-7 of this register, and HK-1 and HK-2 of section 5	pre-commit,session-start	block	1.13. The register is a closed list only while this runs; without it the list is complete on the day it was written	specified
C	CHK-10	tools/githooks/pre-commit	trigger	dispatches every row whose invoked_by names pre-commit, in row order; the first non-zero exit wins and is reported by row id	git	block	E1; installed at 2.14. Hooks are not cloned, so this is a committed script reached through core.hooksPath	specified
C	CHK-11	tools/githooks/post-commit	trigger	consumes .git/hook-canary; when it is absent, appends HEAD to .git/hooks-bypassed	git	report	HK-3. Detects a --no-verify bypass of every pre-commit row; cannot prevent one	specified
C	CHK-12	tools/check_gitignore_map.sh	check	the 24 rows of the 1.1 directory map agree with .gitignore, asserted at core.ignorecase=false	pre-commit,ci-linux	block	1.1 sections 3.1-3.2; loose end A1. Row 10 is complete only on a case-sensitive filesystem, so the ci-linux trigger is not optional	specified
C	CHK-13	tools/check_no_sources.js	check	no shelf file reproduces a run of its source above the threshold Open Question 8 sets	pre-commit	block	1.1 section 4.1. The enforcement layer fails closed on unknown file types and is blind to unknown content inside an admitted type; this is the missing half	specified
C	CHK-14	tools/quantities.js --check	check	counting rule section 5 rows 1 and 2: block resolution, mandatory keys, derived-from existence and acyclicity, cross-site numeral agreement, index equality	pre-commit,substep-gate	block	1.12 section 5; E16. Makes the echo-site list a command rather than an act of recall	specified
C	CHK-15	tools/quantities.js --lint	check	counting rule section 5 row 3: bare governed numerals, live values quoted as literals, offsets stated against no datum	substep-gate	report	1.12 section 5. Carries false positives by design and must never block on a script's judgment	specified
C	CHK-16	tools/quantities.js --index	generator	regenerates QUANTITIES.md from the blocks in the declared file set	substep-gate,manual	n/a	1.12 section 7. Shares one generator with CHK-14 so that the checker and the indexer cannot disagree	specified
C	CHK-17	tools/quantities.js --live	harness	re-runs the cmd: operation of every live quantity and reports drift	manual	report	1.11 F9. Executes shell strings harvested from markdown, so section 6 bars it from every automatic trigger; manual is the whole ruling	specified
C	CHK-18	oracle/tests/run_suite.js	check	the 211 tests of the 1.11 v2 answering-loop suite, and the six mechanically checkable clauses of the 1.3 answer contract	substep-gate,ci-linux	block	1.11; 1.3 section 3.1. A 211-test suite nothing invokes is a 211-line document	specified
C	CHK-19	oracle/tests/gen_matrix.js	generator	emits the Rule G and Rule V cell matrices by parsing the answer contract itself, never a copy of it	consumed:CHK-18	n/a	1.11 RG-13 and RV-37. A contract edit changes the matrix and trips those two tests	specified
C	CHK-20	oracle/lib/claim_bearing.js	library	marker: -	consumed:CHK-18,CHK-21,CHK-22	n/a	1.11 CLM-1 to CLM-12; author ruling 1, which dropped verify_report.js. Implementation row is Step 3's	specified
C	CHK-21	oracle/lib/verify_haiku.js	check	the haiku carries no numeral, unit token, coefficient name or named source	answer-loop	refuse	1.3 section 7; 1.11 FIL-10. A claim in the haiku is a claim outside the trace grammar	specified
C	CHK-22	oracle/lib/verify_register.js	check	1.8 section 9 L1-L5 at load, and B4 the block round-trip asserted in both directions	answer-loop	refuse	1.8 section 9. B4 run one way passes a member that lost its row, which is the failure it exists to catch	specified
C	CHK-23	oracle/bootstrap_contract.md	check	the fifteen BC assertions of the bootstrap contract, and the terminal outcome and mode set they produce	session-start	block	1.4. Executed by an agent reading CLAUDE.md; nothing verifies that it ran, and 6.1 is where it acquires an executor a test can drive	specified
C	CHK-24	lsei/oracle/lib/literature_search.js	library	marker: and/or	consumed:CHK-01,CHK-03,CHK-04,CHK-05,CHK-06,CHK-08	n/a	E5; E13. Upstream and outside the scan roots, declared here because six rows depend on it and four of them hold a copy rather than a reference	live
# END CHECKS
```

## 9. What this register does not do

It does not run anything. It states what runs, and `CHK-09` asserts that the statement is true of the
repository it sits in.

It does not make a check correct. `CHK-01` can pass on a corpus whose names collide in a way its
mirrored tokenizer does not model, which is exactly loose end E5 and exactly what CL-6 exists to make
visible rather than to fix.

**It does not verify its own base case.** The chain grounds in an agent reading a document at session
start, and no mechanism verifies that reading. Every link above that is checked, and each link's
failure is reported by the link below it. The bottom link is reported by nothing.

<!-- END oracle/check_register.md -->

---

## 3. Findings, and what this sub-step hands on

### 3.1 BC-8 is replaced, and the amendment is to my own contract

**Delete BC-8 as written.** Replace, in Phase 4 group 1:

| Id | Asserts | Command | Falsified by | On failure |
|---|---|---|---|---|
| BC-8 | The committed hooks fire. | `git config core.hooksPath tools/githooks` then `node tools/checks.js --wiring`, which runs HK-1 and HK-2 of the check register | A committed check that does not fire on the event the register says it fires on — now detected rather than assumed, because HK-1 asks git's resolver and HK-2 reads the index mode | Report; **every register row naming `pre-commit` is reported UNWIRED by id** |

The prose under it also changes. The sentence "**A contract is not an installation**, and BC-8
asserting successfully is not evidence that any check exists" was correct about the old BC-8 and is
false about the new one: HK-1 exits non-zero when no hook exists. Replace it with the reason: *the
container/content rule applies to configuration exactly as it applies to files, and `git config
--get` returning the expected string is configuration's `test -f`.*

This also answers The Software Engineer's F6, which recommended asserting the directory exists and
holds a file. **I decline that remedy and take the finding**: a directory holding `pre-commit.sh`, or
`pre-commit` at mode 100644, satisfies his form and fires nothing.

### 3.2 A new bootstrap report line, and one new mode question I am not answering

Two report lines the bootstrap owes, both cheap:

1. **`hooks: N rows wired, M unwired`** from HK-1 and CL-1.
2. **`hooks bypassed: <n> commit(s)`** from HK-3's `.git/hooks-bypassed`, or the line is absent.

Neither is a mode. Both are Phase 5 report lines. **I am not adding a seventh degraded mode for
"checks unwired"**, and the reason is the one that closed the mode set at 1.4: a mode is a state a
working copy can be in, and an unwired hook is a state of *this* repository. The bootstrap reports it
and the session proceeds; nothing about answering a question depends on a commit hook.

### 3.3 Two committed checks named `check` cannot fail, and one cannot run at all

`tools/check_register_rows.js` and `tools/ecr_keycheck.js` both `console.log` their failures and both
exit 0. Grepped: neither contains a `process.exit(1)` path. `check_register_rows.js` additionally
opens with

```js
const ROOT='C:/Users/Quinn Morley/onedrive/projects/cc/lunar oracle';
```

— **a committed check that cannot run on any other install**, which is E8's defect with the
invocation missing *and* the portability missing. It was written to settle 1.9's rows and it did that
well; it was then committed with a `check_` prefix, which is a promise the file does not keep.

`tools/ecr_verify.js` does the same job over a superset of the assertions, takes both its inputs as
arguments, and `process.exit(fail.length?1:0)`. **Ruling: CHK-03 and CHK-05 consolidate into CHK-04
at 2.15.** The consolidated artifact takes `ecr_verify.js`'s structure and `check_register_rows.js`'s
one virtue — it `require()`s the upstream tokenizer instead of mirroring it — which removes one of
the four mirrors as a side effect. Net: eight files in `tools/` become six, and `on_failure: none`
becomes unreachable.

That is the answer to "what breaks if it is deleted", asked of two rows: nothing breaks, and one of
them is broken already.

### 3.4 I wrote an inert assertion into this register and found it by running it

CL-5 as first drafted read: *no row with kind `check` and status `live` has `on_failure: none`.* I
wrote it to catch `CHK-03` and `CHK-05`, the two committed scripts named `check` that exit zero on
their own findings. Then I implemented CL-1 through CL-7 as a throwaway script and ran them over the
register.

```
--- CL-5 (expected RED on 2 rows) ---
  live checks with on_failure none: 0
  rows carrying on_failure none at all: CHK-03(retiring), CHK-05(retiring)
```

**Both offenders are `retiring`, and `retiring` is not `live`.** The assertion whose entire subject is
the two silent checks in this repository was scoped so that neither of them could trip it, and the
scoping was mine, in the same file, four paragraphs from the rows it exempts. Had I shipped the
prose I had written beside it — "CL-5 and CL-6 are RED as this register lands" — the register would
have carried a *claim of a failing assertion that passes*, which is worse than a missing check,
because it reads as evidence.

The narrow fix is CL-5(b): a `retiring` row must name the sub-step that removes it, and the `H` row
publishes the retiring count, so the exemption is visible and expires. The general lesson is the one
this sub-step exists to enforce, and it is not new to this project: **an assertion
whose scope excludes its own motivating instances is a container check on itself.** The only reason
it was caught is that the register's assertions were *run* against the register before the register
was handed over, which is the post-condition I am asking 2.14 to inherit.

**Nothing in the deliverable claims a red it does not have.** §4's paragraph was rewritten against
the run, not against the intention.

### 3.5 `literature/FIELDS.tsv` and `INDEX.tsv` are still ignored, and no row here can save them

F7's `.gitignore` half is **not applied**. Re-verified this session against the committed file:
`/literature/**` with `!/literature/**/` and `!/literature/**/*.md` admits `.md` only, and there is no
re-admission for `.tsv`. `oracle/REGISTER.tsv` is allowed because nothing under `oracle/` is denied.

I want to be exact about what this register can and cannot do for it. **CHK-12 asserts `.gitignore`
against the 1.1 directory map — and the map does not list those two files**, so CHK-12 passes on the
defect. The check that catches it is BC-20 in the bootstrap (F7's recommendation, which is mine and
is owed), asserting a marker inside each machine-readable corpus input and gating origin `literature`.
Adding rows 25 and 26 to the 1.1 fixture is the other half and is the orchestrator's three lines.

**This is the sixth instance of the pattern and the register does not close it.** Recording that
plainly is better than filing a row that would report green.

### 3.6 The `tools/` mode bits are wrong today, and it is one command

Every file in `tools/` is committed at `100644`. For the `.js` files this is inert — they are run as
`node tools/x.js`. For `tools/githooks/*` it will be fatal on any non-Windows clone, and the failure
is silent in the direction that matters: the author's machine passes.

`git update-index --chmod=+x tools/githooks/*` at 2.14, and HK-2 asserts it thereafter. I am **not**
asking for the eight existing files to be chmodded: none of them is invoked as an executable, and
changing eight modes to make a `ls -l` look tidier is the kind of edit that teaches a successor the
mode bit is cosmetic. HK-2 is scoped to `tools/githooks/` for exactly that reason.

### 3.7 E9 has expired

E9 reads "**'Committed' is aspirational throughout this register.** This repository has zero commits."
It is mine, from 0.5. `git rev-list --count --all` reports **10**, and `tools/` is tracked. The row
should close, and it should close on this measurement rather than on the register's say-so. No
sub-step owns it; the orchestrator can close it at the Step 1 gate.

### 3.8 Handoffs

| To | What |
|---|---|
| **1.4** (mine) | BC-8 replaced per §3.1, and its prose paragraph rewritten. Two new Phase 5 report lines per §3.2. **BC-20 is still owed** and §3.5 says why no row here substitutes for it. |
| **2.14** | The post-condition: install `tools/githooks/pre-commit` and `post-commit`; `git update-index --chmod=+x` both; wire via `core.hooksPath`; then **`node tools/checks.js --wiring` must exit 0**, which is HK-1 and HK-2. Installing the hook and not running that command is 2.14 closing on the assumption BC-8 made. The set to dispatch is every row whose `invoked_by` names `pre-commit`, read from the register, not enumerated in the hook. |
| **2.15** | CHK-03 and CHK-05 consolidate into CHK-04 (§3.3). The consolidated artifact imports the upstream tokenizer rather than mirroring it. This is what takes the `H` row’s `retiring` count to zero and makes `on_failure: none` unreachable; CL-5(a) is green before and after, which is exactly why CL-5(b) exists (§3.4). |
| **3.7** | CL-6's close condition. E5's accepted limit is **four mirrors, not one** (§1.6, measured). When the tokenizer is rebuilt, `check_corpus_collisions.js`, `ecr_verify.js`, `ecr_keycheck.js` and `ecr_probes.js` all go stale silently, and the first of those fails by *passing*. The re-point is import, not re-copy, and CL-6 asserts it. |
| **6.1** | §1.5: the enforcement chain grounds in an agent reading a document, and 6.1 is where the bootstrap acquires an executor a test can drive. This is the highest-value unbuilt item in the plan and I am saying so as a finding, not as a request for a sub-step. |
| **The Software Engineer** | §1.7 is the gate run on myself, column by column and row by row. The two rows I expect you to attack are CHK-20 and CHK-24 — a `library` kind for artifacts that are not checks. My defence is CL-6 and it is measured: four true positives, three true negatives, one grep. The boundary you were sent to test is §1.1, and §1.8 says what I declined and why. §3.4 is an inert assertion of mine that the register caught before you did — I would rather you check whether CL-5(b) is a real expiry or a second exemption wearing a report. |
| **The Designer** | CL-7 and §6 are the second live instance of the counting rule's human-check row: a mechanical report that names a file and a person who rules on it. The first was F5(d) at 1.4. |
| **The orchestrator** | E9 has expired (§3.7). F7's `.gitignore` three lines are still unapplied (§3.5) and rows 25 and 26 of the 1.1 fixture go with them. |

---

## 4. Quantity blocks

```quantity
id:            Q-CHECK-ROWS
class:         fixed
value:         24
unit:          C rows in oracle/check_register.md's marked CHECKS block
population:    every file under the two declared scan roots, plus two declared rows outside them
operation:     cmd: sed -n '/^# BEGIN CHECKS$/,/^# END CHECKS$/p' oracle/check_register.md | awk -F'\t' '$1=="C"' | wc -l
conditions:    cwd: repository root, 55 characters. Before oracle/ exists, run the same command
               against cr_scratch/step1_13_systems_engineer_check_register.md.
at:            2026-08-27; self de1fef0; lsei 7f97983; cr-agents f0c976b
predicate:     the check register holds 24 rows: 7 live, 15 specified, 2 retiring.
derived-from:  none
sampled:       n/a -- this operation counts, it does not classify
superseded:    none
```

```quantity
id:            Q-TOOLS-TOKENIZER-MIRRORS
class:         fixed
value:         4
unit:          files under tools/ holding a hand-copy of literature_search.js's stopword list
population:    the 6 files under tools/ that consume the upstream tokenizer, of the 8 files there
operation:     script: the marker grep of CL-6 -- count files under tools/ containing the literal
               and/or; cross-checked by extracting each STOPWORDS set, sorting, and sha1-ing it
conditions:    cwd: repository root, 55 characters. lsei/ present at the ref below.
at:            2026-08-27; self de1fef0; lsei 7f97983
predicate:     4 of the 6 tools/ files that consume the upstream tokenizer hold a copy of its
               82-token stopword list rather than importing it; all 5 copies including the
               upstream original agree today at sorted-set sha1 3db950305166.
derived-from:  none
sampled:       6 inspected by hand, 0 found wrong, by The Systems Engineer -- the marker grep
               classifies, so its 4 positives and 2 negatives were each confirmed by reading the file
superseded:    none
```

```quantity
id:            Q-HOOKSPATH-INERT
class:         fixed
value:         0
unit:          hooks fired by a commit in a repository whose core.hooksPath names a nonexistent
               directory
population:    one scratch repository, git 2.55.0.windows.1
operation:     cmd: git init -q p && cd p && git config core.hooksPath tools/githooks && echo x > a && git add a && git commit -qm one
conditions:    cwd: the session scratchpad. tools/ absent from the scratch repository. The result
               is a property of git, not of this path.
at:            2026-08-27
predicate:     setting core.hooksPath to a directory that does not exist exits 0, reads back
               correctly, and the next commit succeeds with no hook firing; git hook run pre-commit
               exits 1 in the same repository.
derived-from:  none
sampled:       n/a -- this operation observes, it does not classify
superseded:    none
```

```quantity
id:            Q-TOOLS-MODE-644
class:         live
value:         8
unit:          files under tools/ committed at index mode 100644
operation:     cmd: git ls-files -s tools/ | awk '$1=="100644"' | wc -l
conditions:    cwd: repository root, 55 characters. core.filemode is false on the authoring machine.
at:            2026-08-27; self de1fef0
predicate:     8 of the 8 tracked files under tools/ are committed at mode 100644, including the
               two carrying a #!/usr/bin/env node shebang that the filesystem reports as executable.
derived-from:  none
sampled:       n/a -- this operation counts, it does not classify
superseded:    none
```

---

## 5. Extraction, verified

```
$ sed -n '/^<!-- BEGIN oracle\/check_register.md -->$/,/^<!-- END oracle\/check_register.md -->$/p' \
      cr_scratch/step1_13_systems_engineer_check_register.md > oracle/check_register.md
```

Post-conditions, all four run against this file:

1. The extracted block begins with `<!-- BEGIN oracle/check_register.md -->` and ends with
   `<!-- END oracle/check_register.md -->`.
2. It contains exactly one `# BEGIN CHECKS` line and exactly one `# END CHECKS` line.
3. Between them: exactly one `H` row, two `S` rows, and **24 `C` rows**, each `C` row having
   **exactly 9 tab-separated fields**, no field empty, no field containing a tab or a newline.
4. The `H` row's four counts (24, 7, 15, 2) equal the parsed `C`-row totals by `status`.

Result and the commands are in §5.1.

### 5.1 Result

All four post-conditions run and passing, this session:

```
$ sed -n '/^# BEGIN CHECKS$/,/^# END CHECKS$/p' cr_scratch/step1_13_systems_engineer_check_register.md \
    | awk -F'\t' '$1=="C"{n++; if(NF!=9)bad++} $1=="H"{h++} $1=="S"{r++}
                   END{print "C",n,"wrong arity",bad+0,"| H",h,"| S",r}'
C 24 wrong arity 0 | H 1 | S 2

$ ... | awk -F'\t' '$1=="C"{print $9}' | sort | uniq -c
      7 live
      2 retiring
     15 specified
```

24 rows, 9 fields each, no empty field, no duplicate id, every id matching `^CHK-[0-9]{2}$`; the `H`
row's `24 / 7 / 15 / 2` equal the parsed totals.

**CL-1 through CL-7 were also implemented and run against this register**, which is how §3.4 was
found. Results: CL-1 through CL-4 all pass — the eight files in `tools/` all have rows, every closed
set holds, and no `(kind, on_failure)` pair is illegal. CL-5(a) passes and §3.4 says why that is a
finding rather than a result. **CL-6 fails on four rows** — `CHK-01`, `CHK-04`, `CHK-05`, `CHK-06` —
which is the measurement in §1.6 reproduced by the register's own assertion rather than by a
one-off grep.

**CL-3 asserts post-conditions 3 and 4 permanently**, which is the point: the extraction check is not
a one-time observation by the author, it is the register's own `H` row plus `tools/checks.js`, and it
re-runs on every commit once 2.14 lands.

*The Systems Engineer, sub-step 1.13.*
