
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

