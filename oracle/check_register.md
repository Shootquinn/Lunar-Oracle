
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

**A trigger token may carry an invocation payload: `<trigger>:<argv>`.** Added at 2.20. The
`token:payload` grammar is not new — `consumed:CHK-05` has been in this column since 1.13 — and
reading every token that way costs a bare token nothing.

*Why it was needed, and it was found by running rather than by reading.* `CHK-04` names
`merge-gate` and `tools/ecr_verify.js` takes **two positional arguments**, a sidecar path and a
corpus root. The first dispatch of the new merge-gate hook invoked it bare; `readFileSync(undefined)`
threw an uncaught `TypeError` and node exited **1**, which the row above says a dispatcher must read
as *a finding about the content*. **A dispatcher that accuses the corpus because an instrument was
called wrongly is worse than one that does not run**: it sends a person to the wrong place with
confidence. The mode-prefix convention below covers a *mode*; it cannot express *data*.

Three places the argv could have come from, and two are rejected in writing so the rejection is
checkable: a tenth column (a schema change to a promoted contract, during a freeze, for one row);
a table inside the dispatcher keyed on row id (**the second-authority defect the shared engine
exists to prevent**, and it is the convenient answer, which is why it is named); or the cell that
already says how the row is reached. The third is taken.

A row may name one trigger **twice, with two payloads**, and is then dispatched twice in order.
That is how `CHK-04` covers both `REGISTER.*.tsv` sidecars without becoming two rows. The payload
is split on spaces, so **a path containing a space cannot be expressed**; none exists in this
repository and `oracle/NAMING.md` forbids one in the corpus. If one ever must be, that is a change
to this clause and not a quiet escape convention in a dispatcher.

**`on_failure`** — five.

| Value | Meaning |
|---|---|
| `block` | Exits non-zero; the commit, merge or sub-step does not proceed. **Exit 1 is a finding. Any other non-zero exit is a harness failure, not a finding, and is reported as such** — `tools/ecr_verify.js` exits 2 on a usage error, and a dispatcher that reads 2 as a check failure reports the wrong thing about the wrong file. |
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

**One artifact, several modes.** `path` is the closure key: CL-1 joins on it and CL-2 resolves it, so
it is a path and nothing else. A script with more than one mode gets one row per consequence, **all
sharing the identical `path`**, and the mode is carried as a literal prefix on `asserts` —
`--check: <claim>` — on the same reasoning that makes `marker: <literal>` a literal: the cell
is grepped, and a description of a flag is not a flag. `tools/quantities.js` and
`tools/check_registers.js` are the two artifacts this applies to today. It costs no tenth column, and
`CHK-10` reads this file to dispatch, so it already has the argv.

**An assertion that counts a tool's output names the pattern, not the tool.** One tool, one pattern,
wrong in both directions inside one day, and that is why the clause exists:

| When | `tools/ecr_verify.js` prints | `grep -c '^FAIL'` | True count |
|---|---|---|---|
| Before R-3 | failure lines indented two spaces | **0** | 143 |
| After R-3 | failure lines at column 0, plus a `FAILURES <n>` summary | **145** | 144 |

The fix that un-indented the lines added a summary line beginning `FAILURES`, which the same pattern
counts as a failure. `grep -c '^FAIL '` — with the trailing space — returns 144 and agrees with the
tool's own total. A cell reading “no failures from `ecr_verify.js`” was satisfied by the first
column and is now falsified by a clean run in the second. **The cell names the anchoring it depends
on, or it names an exit code**, which does not move when someone reindents a print statement.

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
      path contains no whitespace -- an invocation is not a path, and CL-1 and CL-2
      both join on it;
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

CL-8  NO ASSERTION OF ITS OWN DISPATCH
   a. no row whose invoked_by names pre-commit contains the literal
      "git hook run pre-commit"
      -- an assertion may not invoke the event it asserts; see 5.1              block
   b. every row whose path is under tools/githooks/ contains the literal CHK- id
      of its own row, inside the file at that path
      -- makes CHK-10's dispatch join bidirectional: the register names the hook
         and the hook names its row                                             block

CL-9  EVERY TRIGGER NAMES ITS DISPATCHER
   a. every invoked_by token used by any C row, other than consumed:<ids>, has exactly
      one T row in the trigger table of section 5.2, and that T row names either a
      dispatcher id that is a C row of kind `trigger`, or an operator string beginning
      `hand:` naming who runs it and when                                       block
   b. every token of the section 2 invoked_by vocabulary that no C row uses is
      reported as reserved-and-unused                                           report
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
is the expiry** and the `H` row's `retiring` count is where it is visible.

**And the exemption has been narrowed, at R-2, because it was doing more than exempting.** `CHK-03`
carried `invoked_by: substep-gate` with `on_failure: none`: a check that cannot fail, sitting on a
gate, for the eleven sub-steps between here and 2.15. `status: retiring` excused it from CL-5(a) and
nothing excused it from the gate. **`CHK-03.invoked_by` is now `manual`.** The consolidation itself
stays at 2.15 — deleting the two files, taking `tools/` from ten artifacts to eight, making
`on_failure: none` unreachable — but a silent check does not get to hold a gate while it waits for
its own removal. Two quantity blocks at 1.9 name `tools/check_register_rows.js` as their
`operation:`; they re-point to `tools/ecr_verify.js` at their next touch, which is 1.9's edit and not
this file's, and their values may move, because `ecr_verify.js` covers B1-B7 where
`check_register_rows.js` covers B1-B3, B6 and B7.

**Two rows are RED as R-2 lands, and they are named here on the CL-6 precedent.** `CHK-27` and
`CHK-28` are `live` and `block`, and `tools/check_registers.js` exits 1 today: `AM-1` reports one
collision, on `Q-ANSWER-CONTRACT-VERSION`, named by `AM-66` and `AM-73`. **Owner: The Software
Engineer. Close condition: R-3 of the Step 1 close** — the answer contract landing at one version
in every file. The other three `AM-1` collisions and the one `MF-2` failure were mine and are closed
in the same edit as this paragraph. A blocking row that is red for a reason with a name and a date is
a finding; a blocking row wired to `manual` so that it cannot be red is `CHK-03` again.

**What CL-1 cannot see.** A check written outside every declared root is invisible to it. The defence
is that a root is one `S` row in this file. That is a shorter distance to visibility, not a proof.

## 5. What "invoked by `pre-commit`" is allowed to mean

**Setting `core.hooksPath` is not evidence that any hook exists.** Verified: `git config
core.hooksPath tools/githooks` against a nonexistent directory exits 0, reads back correctly, and the
next commit succeeds with no hook firing. Asserting the configuration value is the `test -f` of
configuration.

Three assertions replace it. `CHK-29` runs HK-1 and HK-2; `CHK-11` implements HK-3. `CHK-09` runs
neither, and §5.1 is why.

```
HK-1  THE RESOLVER FIRES
      git hook run pre-commit  exits 0
      -- exercises hooksPath resolution, directory existence, filename, executability and the
         hook's exit code, through the code path git uses at commit time
      falsified by: any of those five being wrong, each of which gives exit 1
      falsified ALSO by a SIXTH cause, added at 2.14 because it is the one that actually
         fired the first time this was run: a DISPATCHED ROW failing on accepted repository
         state. HK-1 was written as a question about wiring, and the wiring was fine; what
         was wrong was that a live blocking row asserted a whole-file-set property that has
         twelve accepted failures. The five listed causes are all properties of the hook.
         The sixth is a property of the LIST the hook dispatches, and no assertion about
         installation can see it. See the CHK-14 authority cell.
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

**HK-2's companion landed at 2.20 and it is `.gitattributes`, discharging `AM-57`.** That row asked for `tools/githooks/** text eol=lf` **before installing hooks**, and the ordering was not kept: the hooks went in at 2.14 and the attributes file at 2.20, so for one day both dispatchers were LF in the index only because `core.autocrlf` happened to be `true` on one machine. **No new assertion was added for it and that is deliberate.** HK-2 asks whether the trigger is committed rather than merely present; a CRLF shebang is the same question with a different byte, and the answer now lives in the tree where `git check-attr eol` can be asked it directly. A fourth HK row would be a second place to look for one property, during a freeze, for a rule git already enforces on checkout.

### 5.1 HK-1 may not be asserted from inside the thing it asserts

`CHK-09` originally asserted CL-1 to CL-7 **and** HK-1 and HK-2, on
`invoked_by: pre-commit,session-start`. `CHK-10` dispatches every row whose `invoked_by` names
`pre-commit`. So `CHK-10` ran `CHK-09`, `CHK-09` ran `git hook run pre-commit`, and that ran
`CHK-10`. **Unbounded, on every commit.** Built and measured at the 1.5/1.13 review: the depth
counter that stopped it was the reviewer's own. `git hook run` has no reentrancy guard and sets no
environment marker a hook can test, so nothing in git stops this.

The reasoning that missed it was right about the wrong trigger. The chain — `CHK-09` checks the
register, invoked by `CHK-10`, which fires only if HK-1, which is asserted by `CHK-09` — is sound
**at session-start**, where nothing invoked the hook. One row wired both triggers, and the diagram
described one of them.

**HK-1 is a wiring assertion.** It answers *would a hook fire*, which is a question about
installation and not about this commit. It belongs at session-start and at 2.14's post-condition, and
nowhere on the hook itself. So the row is split: `CHK-09` is `--register`, blocking, on both
triggers; **`CHK-29` is `--wiring`, reporting, at session-start only.** The split also closes the
second defect in the same row, which was that one row carried two consequences: 1.13 §3.2 says the
bootstrap **reports** an unwired hook and the session proceeds, while `on_failure` said `block`, and
a fresh clone has no hooks because hooks are not cloned.

The sentinel alternative — have the hook export an environment marker and have HK-1 skip when it is
set — is cheaper and worse: it makes the assertion's meaning depend on who called it, which is
exactly the ambiguity the split removes. **CL-8(a) is the closure**, because this class will recur
and it is one grep.

`git hook run` invokes the hook with nothing staged, so **every hook this register wires must be safe
and meaningful with an empty index.** A hook whose checks require staged content reports that as a
skip, not as a pass.

### 5.2 Every trigger names its dispatcher, or names the person who is the dispatcher

2.20 was opened on the finding that `CHK-01` and `CHK-04` name `merge-gate` and **nothing installs a
merge-gate dispatcher**. That is true. It is also not the defect, because the same sentence is true of
`substep-gate`, of `session-start` and of `ci-linux`, and none of those was noticed. **The defect is
that this register had no place to say which triggers have a dispatcher and which are a person**, so
"nothing installs it" was a fact you could only reach by reading, and reading found one of four.

The table below is that place, and `CL-9` computes its completeness in both directions. Building it
immediately found a trigger nobody had flagged (`ci-linux`, named by `CHK-12` for its case-sensitivity
half, with no CI in existence) and a token in the closed vocabulary that **no row uses at all**
(`post-commit` — `CHK-11` is the post-commit hook and is invoked by `git`, exactly as `CHK-10` is).

**The ruling on `merge-gate`: it is KEPT, and declared hand-operated.** The alternative was to
reclassify it to `substep-gate`, and that is the wrong trade even though it is fewer tokens. The
specificity is load-bearing: `CHK-01` asserts a whole-corpus property, and at every sub-step boundary
that is twenty runs of a check whose input changed once. At the merge it is the point. Collapsing the
two would move a check away from the moment it exists for in order to retire a word.

**AMENDED AT 2.20: `merge-gate` now has a dispatcher AND an operator, and the two were being
conflated.** `tools/githooks/merge-gate` is `CHK-38`. The 2.20 brief read "nothing installs a
dispatcher" as "the trigger is unwired"; those are different failures with different fixes. *Who
pulls the trigger* is unchanged and is still the agent executing 2.5 — the row above still says so.
*What the trigger does* did not exist until today. An operator with no mechanism and a mechanism
with no operator are both broken, and until 2.20 this trigger was the first.

**Three facts about that dispatcher, each measured rather than assumed, because each was a surprise:**

1. **`merge-gate` is not a native git event.** `git hook run merge-gate` exits 1 with `unknown hook
   event 'merge-gate'`. The working invocation carries `--allow-unknown-hook-name`, and it is
   written into the `T` row above rather than into a deliverable, because a dispatcher reachable
   only by a flag nobody recorded is a dispatcher nobody runs.
2. **One engine, two triggers.** `tools/githooks/dispatch.js` holds the membership test, the status
   rule, the argv rule and the exit classification; `pre-commit` and `merge-gate` are thin. Two
   copies of one rule about one file is the second-authority defect, and it drifts silently because
   each copy is green against itself.
3. **The reentrancy guard is now ONE marker across all triggers, and generalising it was forced by
   this addition rather than deferred to a later one.** The reentrancy marker in
   `tools/githooks/dispatch.js` bounds the recursion `git hook run` does not; a per-trigger marker
   bounds `pre-commit` inside `pre-commit` and leaves
   `pre-commit → merge-gate → pre-commit` unbounded. The chain is printed on refusal, because a
   guard that hides a recursion removes the symptom and leaves the row that caused it looking fine.

**MERGE-GATE IS RED TODAY, AND THAT IS THE INSTRUMENT WORKING.** First execution, 2026-08-28:
`CHK-01` exits 0 over an empty `literature/`; `CHK-04` reports **359 failures across the two
sidecars — 134 `L4 leaf does not resolve` and 225 `B3/K2 key occurs in no member`.** The 134 are the
corpus not being merged yet and clear when 2.5 lands. **The 225 do not**: they are register content,
owed under `AM-78`/`AM-79`/`AM-80` (lunar) and `AM-93`…`AM-97` (econ), and they belong to two other
seats. A blocking row that is red because the content is bad is the row doing its job, and the
correct response is to discharge the amendments, not to soften the gate. This register does not
carry a waiver flag and 2.20 deliberately did not add one: a gate with a bypass is a gate nobody
runs in gate mode.

```
# BEGIN TRIGGERS
T	pre-commit	CHK-10	the committed dispatcher, reached through core.hooksPath, which BC-8 sets
T	git	CHK-10,CHK-11	git itself, at its own events. The two trigger rows sit directly on it
T	substep-gate	hand:the agent executing the sub-step, against the gameplan step table
T	merge-gate	CHK-38, the committed dispatcher, pulled by hand by the agent executing 2.5. INVOCATION: git hook run --allow-unknown-hook-name merge-gate -- the flag is NOT optional, measured on git 2.55.0.windows.1, which exits 1 with "unknown hook event" without it
T	session-start	hand:the agent reading CLAUDE.md at session open. Section 9's unverified base case
T	answer-loop	hand:the answering loop of oracle/answer_contract.md, from 3.x
T	ci-linux	hand:NOBODY. No CI exists. CHK-12 row 10 is complete only on a case-sensitive filesystem, so this is a REAL GAP and not a naming question, and it was found by building this table rather than by reading the register
T	manual	hand:a person, deliberately and by design. Section 6 bars CHK-17 from every automatic trigger because it executes shell strings harvested from markdown
# END TRIGGERS
```

`hand:` is not a euphemism for unwired. A hand-operated trigger has an operator, and naming the
operator is what makes "nobody" visible when that is the true answer — which is exactly what happened
to `ci-linux` on the line above. What `CL-9` forbids is a trigger with neither a dispatcher nor a
person: a row that fires on nothing while reading as though it fires on something.

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

Correspondingly: **a row with `status: specified` is a debt, not a mechanism.** The `H` row's
`specified` count is how many there are today, and it is a count of this file rather than a claim
about it. The register states the debt plainly rather than reporting coverage it does not have.

**Amending this file is amending a contract.** Adding a row, adding an `S` root, or moving a row from
`specified` to `live` is a change reviewed at the sub-step that makes it, and it bumps the `H` row's
counts.

## 8. The register

```
# BEGIN CHECKS
H	4	2026-08-29	39	25	12	2
S	tools/**
S	oracle/**/*.js
C	CHK-01	tools/check_corpus_collisions.js	check	no two files under a corpus root tokenize to the same extension-blind key set: a COLLISION when they share an extension, a NEAR-TWIN when they do not, with the declared literature/_pdf/ store exempted by path segment	pre-commit,merge-gate	block	E5; E13; gameplan A3 -- the retrieval layer cannot distinguish colliding names and silently returns one of them every time. WIDENED AT 2.20, no new row: the walk admitted .md ONLY, so three UN treaty full texts and 112 source PDFs sitting in the same directories as their own summaries were never walked and the check reported 146 summaries, 0 collisions. Key semantics for .md are byte-identical -- stripping one trailing extension and stripping .md are the same operation on a .md leaf -- so A1's meaning is untouched and the three known collisions still reproduce exactly	live
C	CHK-02	tools/audit_abstract_overlap.js	harness	measures verbatim 10-gram overlap between a summary's Abstract and its paired PDF; classifies nothing	manual	report	Open Question 8. A shingle detector measures overlap, not passing-off; the difference is visible only by opening the file	live
C	CHK-03	tools/check_register_rows.js	check	1.8 section 9 L2-L5, B1-B3, B6, B7 over a TSV path	manual	none	superseded by CHK-04, removed at 2.15; hard-codes an absolute corpus path containing the author's username and cannot run on any other install. UNWIRED from substep-gate at R-2 per the 1.5/1.13 review R2(b): a check that cannot fail must not sit on a gate for eleven sub-steps	retiring
C	CHK-04	tools/ecr_verify.js	check	1.8 section 9 L2-L5 and B1-B7 over a TSV path or a deliverable's marked block, against a given corpus root	substep-gate,merge-gate:oracle/REGISTER.lunar.tsv literature,merge-gate:oracle/REGISTER.econ.tsv literature	block	1.8 section 9. The only implementation of the schema assertions that exits non-zero; CHK-03 and CHK-05 consolidate into it at 2.15. INVOCATION PAYLOAD ADDED AT 2.20, and it was found by RUNNING the new merge-gate dispatcher rather than by reading the row: this artifact takes two POSITIONAL arguments and the register had no way to say so, so a bare dispatch threw an uncaught TypeError out of readFileSync and exited 1, which a dispatcher reads as a FINDING ABOUT THE CONTENT. One row, two sidecars, two payloads; see section 3	live
C	CHK-05	tools/ecr_keycheck.js	check	1.8 section 4.1 K1 and K2 over a JSON axis fixture	manual	none	superseded by CHK-04, removed at 2.15; K1 and K2 are CHK-04's B3 and this adds nothing CHK-04 lacks	retiring
C	CHK-06	tools/ecr_probes.js	harness	reports per-axis IDF-weighted separation between probe_pos, probe_neg and every other axis's match_keys	manual	report	1.8 section 4.3. The labelled data 3.6 sets the firing threshold K against; K is deliberately unset until then	live
C	CHK-07	tools/ecr_key_candidates.json	fixture	the ECR axis, member and candidate-key set CHK-05 reads	consumed:CHK-05	n/a	1.10's Q-ECR-KEYS measurement. Retires with CHK-05 at 2.15	live
C	CHK-08	tools/probe_register_encoding.js	harness	measures what each of three register encodings does to retrieval IDF and to full-text confirmation; self-declared not a mechanism	manual	report	1.8 section 1.1. The numbers the encoding ruling rests on, so a successor can re-run them rather than trust them	live
C	CHK-09	tools/checks.js	check	--register: CL-1 to CL-8 of this register	pre-commit,session-start	block	1.13. The register is a closed list only while this runs; without it the list is complete on the day it was written. The HK assertions are CHK-29's, not this row's -- see section 5.1	specified
C	CHK-10	tools/githooks/pre-commit	trigger	dispatches every row whose invoked_by names pre-commit, in row order; the first non-zero exit wins and is reported by row id	git	block	E1; INSTALLED at 2.14. Hooks are not cloned, so this is a committed script reached through core.hooksPath	live
C	CHK-11	tools/githooks/post-commit	trigger	consumes .git/hook-canary; when it is absent, appends HEAD to .git/hooks-bypassed	git	report	HK-3. Detects a --no-verify bypass of every pre-commit row; cannot prevent one	live
C	CHK-12	tools/check_gitignore_map.sh	check	the 24 rows of the 1.1 directory map agree with .gitignore, asserted at core.ignorecase=false	pre-commit,ci-linux	block	1.1 sections 3.1-3.2; loose end A1. Row 10 is complete only on a case-sensitive filesystem, so the ci-linux trigger is not optional	specified
C	CHK-13	tools/check_no_sources.js	check	no published-source carrier enters the repository: an extension gate over EVERY dot-separated segment, a %PDF/%!PS/AT&TFORM magic-byte gate read as binary, and a 500000-byte size backstop that reports its own coverage	pre-commit	block	1.1 section 4.1, whose NAME half is .gitignore; loose end E1; corpus_suite.md PDF-1 to PDF-16. Built at 2.14. THE CONTENT-REPRODUCTION HALF THIS ROW USED TO DESCRIBE IS NOW CHK-30 -- one row named one file and described two different mechanisms, and the split is why	live
C	CHK-14	tools/quantities.js	check	--check: counting rule section 5 rows 1 and 2: block resolution, mandatory keys, derived-from existence and acyclicity, cross-site numeral agreement, index equality	substep-gate	block	1.12 section 5; E16. Makes the echo-site list a command rather than an act of recall. UNWIRED FROM pre-commit AT 2.14, and this was found by RUNNING the dispatcher rather than by reading it: --check asserts a property of the WHOLE declared file set and carries the standing twelve hard failures, every one of them in a Step 1 deliverable with an owed amendment. On a per-commit trigger it blocks a commit on a condition the committer did not touch and cannot fix, and the predictable outcome is routine --no-verify, which disables every OTHER pre-commit row at the same time. A check that provokes habitual bypass takes the rest of the suite down with it. Same move as CHK-03 at R-2, in the opposite direction	live
C	CHK-15	tools/quantities.js	check	--lint: counting rule section 5 row 3: bare governed numerals, live values quoted as literals, offsets stated against no datum	substep-gate	report	1.12 section 5. Carries false positives by design and must never block on a script's judgment	live
C	CHK-16	tools/quantities.js	generator	--index: regenerates QUANTITIES.md from the blocks in the declared file set	substep-gate,manual	n/a	1.12 section 7. Shares one generator with CHK-14 so that the checker and the indexer cannot disagree	live
C	CHK-17	tools/quantities.js	harness	--live: re-runs the cmd: operation of every live quantity and reports drift	manual	report	1.11 F9. Executes shell strings harvested from markdown, so section 6 bars it from every automatic trigger; manual is the whole ruling	live
C	CHK-18	oracle/tests/run_suite.js	check	the 91 tests of the answering-loop suite, the six mechanically checkable clauses of the 1.3 answer contract, AND the 57 tests of oracle/tests/corpus_suite.md -- 148 rows, every one of them bound to a binding this runner executes	substep-gate,ci-linux	block	1.11; 1.3 section 3.1. A suite nothing invokes is a document. COUNT CORRECTED AT 8.5, and the correction is the sub-step: this cell read 211 against a file holding 266, and both figures counted rows rather than bindings. The suite was triaged from 455 rows to 148 on the author's ruling, 307 of them removed for carrying no executable binding at all; the runner had been printing that fact on every run since Wave 2 and nobody had acted on it. The figure in this cell is now the number of rows the runner executes, which is the only number that was ever worth putting here. EXTENDED at 2.20 to the corpus suite, which had no runner and no row; a SECOND runner would be a second authority on how tests run, so it is one runner, one row, two suites. CORRECTION TO THE 2.20 BRIEF, measured: a runner at oracle/tests/run_suite.js does NOT fail CL-1. oracle/**/*.js is a declared S root and this row has existed since 1.13. What was true is narrower -- the CORPUS SUITE was uncovered, not the runner. STATUS CORRECTED AT 2.18, and CL-2 was RED on it: oracle/tests/run_suite.js landed at 2.20 and this cell still read specified, which is the one CL-2 failure in the register -- measured, every specified row tested against the filesystem. A specified row is a debt (section 7) and the dispatcher SKIPS it by id, so a landed runner left at specified is a live check that no gate runs while the register reports it as owed	live
C	CHK-20	oracle/lib/claim_bearing.js	library	marker: -	consumed:CHK-18,CHK-21,CHK-22	n/a	1.11 CLM-3, CLM-4, CLM-5, CLM-9 and CLM-14; author ruling 1, which dropped verify_report.js. Implementation row is Step 3's. POINTER REPAIRED AT 8.5: this cell read "CLM-1 to CLM-12" and eight of those twelve rows were deleted in the suite triage for carrying no binding. The five named here are the CLM rows that survive, and all five are bound -- four to tools/verify_register.js --prove, and CLM-14 to the absence of verify_report.js from the tree, which is this row's own post-condition	specified
C	CHK-21	oracle/lib/verify_haiku.js	check	the haiku carries no numeral, unit token, coefficient name or named source	answer-loop	refuse	1.3 section 7; 1.11 FIL-10. A claim in the haiku is a claim outside the trace grammar	specified
C	CHK-22	oracle/lib/verify_register.js	check	1.8 section 9 L1-L5 at load, and B4 the block round-trip asserted in both directions	answer-loop	refuse	1.8 section 9. B4 run one way passes a member that lost its row, which is the failure it exists to catch	specified
C	CHK-23	oracle/bootstrap_check.js	check	the BC assertions of oracle/bootstrap_contract.md, and the terminal outcome and mode set they produce	session-start	block	1.4; oracle/bootstrap_contract.md is the authority, this row is the artifact. Executed today by an agent reading CLAUDE.md; nothing verifies that it ran, and 6.1 is where it acquires an executor a test can drive	specified
C	CHK-24	lsei/oracle/lib/literature_search.js	library	marker: and/or	consumed:CHK-01,CHK-03,CHK-04,CHK-05,CHK-06,CHK-08	n/a	E5; E13. Upstream and outside the scan roots, declared here because six rows depend on it and four of them hold a copy rather than a reference	live
C	CHK-27	tools/check_registers.js	check	--manifest: MF-1 to MF-3 over oracle/MANIFEST.tsv, and the H row's declared size	substep-gate	block	Designer, Wave 2 review 2.4(a); 1.14. Without it the promotion manifest is a list nothing joins against the filesystem	live
C	CHK-28	tools/check_registers.js	check	--amendments: AMC-1 to AMC-5 over oracle/AMENDMENTS.tsv, and the H row declared size	substep-gate	block	Designer, Wave 2 review 3.3; 1.14. Without it a ruled amendment and its rejected competitor sit in the queue with nothing distinguishing them. AM-145 DISCHARGED at 2.20. Two defects in one cell: the AM-/AMC- rename of AM-143, and an UNDERSTATEMENT BY ONE independent of it -- there are five checks, not four, because AM-112 was implemented as the fifth at R-3 and this cell had said four ever since	live
C	CHK-29	tools/checks.js	check	--wiring: HK-1 and HK-2 of section 5	session-start	report	1.13 section 3.8; 2.14's post-condition. Split from CHK-09 at R-2: HK-1 asks whether a hook would fire, which the hook itself must never ask -- see section 5.1	specified
C	CHK-25	oracle/lib/verify_app_ref.js	check	every trace whose origin is app carries the lsei ref the value was computed against, equal to the ref read at the start of the run	answer-loop	refuse	1.6 section 12; drafting assumption A3. Without it an answer cannot name the model it was computed against. AM-46 DISCHARGED at 2.20: this row and CHK-26 were written into oracle/currency_policy.md section 8 in register syntax and never copied here, so a POLICY DOCUMENT HELD TWO ROWS OF THE CHECK REGISTER and CL-1 could see neither. A register row living outside the register is a fork of the register	specified
C	CHK-26	tools/check_verified_tsv.js	check	oracle/VERIFIED.tsv: declared size equals row count, five fields per row, copy and direction in their closed sets, every ref resolving in that copy object store when the copy is present	pre-commit	block	1.6 section 3. VERIFIED.tsv is the compared-against value and is the one input to section 6 with no live cross-check. AM-46 DISCHARGED at 2.20; see CHK-25 for what the amendment was	specified
C	CHK-30	tools/check_no_reproduction.js	check	no shelf file reproduces a run of its source above the threshold Open Question 8 sets	pre-commit	block	1.1 section 4.1. SPLIT OUT OF CHK-13 AT 2.14. Containment asks whether a source FILE is in the tree; this asks whether a source TEXT is inside an admitted file, and a path rule and a magic-byte gate are both structurally blind to the second. The two shared one row because one plausible filename covered both. Open Question 8 sets the threshold and The Engineer owns it. CHK-02 already MEASURES the overlap and deliberately classifies nothing, so this row is the consequence CHK-02 does not carry	specified
C	CHK-31	tools/verify_corpus.js	check	the merged corpus is the corpus of record: every MANIFEST-declared root present, every summary reachable by the retrieval walk, and the recorded provenance digest equal to the recomputed one	substep-gate	block	2.17 corpus half, The Engineer. ROW MINTED BEFORE THE ARTIFACT, which is the whole of 2.20 defect 3: 2.17 named it oracle/verify_corpus.js, oracle/**/*.js is a declared S root, and CL-1 would have failed it on the day it landed. Ruled to tools/ at 2.20 alongside CHK-13 -- ONE PATH DECISION, MADE ONCE, by one seat holding both the register and the file. LANDED 2026-08-28 AT THE RULED PATH and moved to live at 2.18: the file exists, so CL-2 was red between its landing and this cell. The ruling held under test -- the seat that wrote the artifact wrote the reason into the file header rather than choosing the path again, which is what a path decision made once is for	live
C	CHK-32	tools/corpus_divergence.js	check	--gate: the upstream corpus and this one differ only in ways the currency policy admits, and a WITHDRAWAL upstream is reported as its own verdict rather than folded into upstream-ahead	substep-gate	block	2.17 divergence half, The Systems Engineer; loose end E11. Minted here for the same reason as CHK-31 and in the same edit: 2.17 is two artifacts held by two seats, and registering one while the other lands unregistered would reproduce the defect one file over. MODE PREFIX ADDED AT 2.18 under section 3 one-artifact-several-modes: the fork policy gives this artifact a SECOND consequence at session-start, which is CHK-40	specified
C	CHK-33	tools/merge_identity.js	harness	extracts a source identifier per corpus file at the NAMING.md section 7 precedence levels and emits file, corpus, identifier, identifier_kind, confidence as TSV; classifies nothing	manual	report	2.12, The Engineer. One of the three new instruments 2.20 is named for. CL-1 WAS RED ON IT: a file under tools/** with no row is a blocking failure, and it had none	live
C	CHK-34	tools/clusters.js	harness	author-year clustering under two stated rules, one strict and one permissive, and the level-3 fallback grouping over the rows merge_identity left without an identifier	manual	report	2.12, The Engineer. CL-1 was RED on it. It reports both rules rather than one because the permissive rule is the one actually used, and a harness that hides its alternative is an argument rather than a measurement	live
C	CHK-35	tools/doicov.js	harness	DOI coverage over a pair of corpus roots under several stated definitions of what counts as a DOI, reporting the count under each rather than one number	manual	report	2.12, The Engineer. CL-1 was RED on it. The several-definitions form is the point: a single DOI-coverage number is a number whose definition is invisible	live
C	CHK-36	tools/manifest.js	harness	reads oracle/MANIFEST.tsv and answers queries over its D rows; deliberately checks nothing, because CHK-27 does	manual	report	2.19(b), The Software Engineer; Step 1 final close item 20. CL-1 was RED on it. It does not validate, and that separation is its own header argument: an accessor that also validates is two contracts on one artifact	live
C	CHK-37	tools/check_no_sources.js	check	--ignore-probe: the .gitignore published-source-carrier rules hold over a probe set the run prints, covering the eight PDF-2 paths, two case permutations and nine other carriers	pre-commit	block	corpus_suite.md CON-1, The Software Engineer, Wave 1. HIS ARGUMENT AND IT IS RIGHT: a measurement in a status cell decays and had already decayed once, PDF-2 naming four open paths when five were open. Same path as CHK-13 under section 3 one-artifact-several-modes, mode carried as a literal prefix. It prints its own probe set size because the failure it guards is not a probe that fails, it is a probe set that quietly shrinks until the survivors all pass	live
C	CHK-38	tools/githooks/merge-gate	trigger	dispatches every job whose invoked_by names merge-gate, in row order, through the shared engine tools/githooks/dispatch.js; the first non-zero exit wins and is reported by row id	manual	block	2.20. CHK-01 and CHK-04 have named this trigger since 1.13 and NOTHING INSTALLED A DISPATCHER, so two blocking rows fired on nothing on the one day they matter -- 2.5, the merge. invoked_by is manual and not git: merge-gate is NOT a native git event, and git hook run refuses it without --allow-unknown-hook-name (measured, git 2.55.0.windows.1). Section 6's manual bar does not apply -- that bars a check that EXECUTES A STRING harvested from markdown from an AUTOMATIC trigger, and this is a dispatcher with a hand operator, which is the T row's ruling unchanged. Hooks are not cloned, so this is a committed script reached through core.hooksPath	live
C	CHK-39	tools/githooks/dispatch.js	library	marker: LUNAR_ORACLE_HOOK_DEPTH	consumed:CHK-10,CHK-38	n/a	2.18, The Systems Engineer. CL-1 WAS RED ON IT and this was measured, not read: tools/** is a declared S root, the shared engine landed at 2.20, and it was the ONE uncovered file in either scan root -- 20 tracked files, 19 with a row. The marker is the reentrancy guard environment key rather than a phrase, because that key is precisely the thing a hook must never hold its own copy of: a per-trigger guard bounds pre-commit inside pre-commit and leaves pre-commit -> merge-gate -> pre-commit unbounded, so a mirrored guard is not a slower guard, it is no guard. CL-6 is the assertion and it is GREEN today, checked: the key occurs in this file and in neither consumer	live
C	CHK-40	tools/corpus_divergence.js	check	--report: the six corpus-fork verdicts of oracle/bootstrap_contract.md section 7.2, four of them findings -- unmerged, declined, diverged, withdrawn -- beside equal and unknown, computed against the provenance record and printed in the Phase 5 report	session-start	report	2.18, The Systems Engineer; oracle/bootstrap_contract.md section 7.2; Break 1 point 2 of the 0.2 architecture, which rules that the drift check runs AT BOOTSTRAP and not at merge time. ONE ARTIFACT, TWO CONSEQUENCES, on the CHK-13/CHK-37 and CHK-14/CHK-15 precedent. CHK-32 blocks at a sub-step gate; this one must never stop a session, because the entire content of the fork policy is that divergence is a FINDING and not a fault. A single row would have to pick one consequence, and picking block wires a corpus finding to a session refusal -- which is CHK-14 at 2.14 in the opposite direction, a blocking check on a condition the operator did not cause and cannot fix. Without this row the bootstrap contract says the bootstrap reports divergence and no trigger names the reporter, which is a mechanism that exists and is not wired	specified
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

