
# The working-copy currency policy

**Contract version: 1.** Closes loose ends D4, E6 and E10. Closes E11's ref layer and states, with the
measurement, why E11's content layer belongs to 2.18. Records the author's C4 ruling.

Governs the two working copies, `cr-agents/` and `lsei/`. Where this file and
`oracle/bootstrap_contract.md` disagree about **when** a comparison runs, the bootstrap contract is the
statement. Where they disagree about **what is compared and what is printed**, this file is the
statement.

Every term below is closed. A value outside a closed set is a failure, not a variant.

## 1. The posture

**Record the ref. Float the checkout. Fetch explicitly. Compare. Report drift. Automate nothing.**

Neither pinned nor floating, and not as a compromise between them. A hard pin holds the checkout at a
fixed ref, so nothing in the working copy ever demonstrates that the upstream moved: staleness becomes
invisible. Pure floating records no ref, so there is nothing for the upstream to be ahead of: breakage
becomes invisible. **Recording the ref while floating the checkout is the only arrangement in which
both questions in §6 are separately answerable.**

## 2. The three refs and the one record

| Symbol | Is | Where it lives | Who writes it |
|---|---|---|---|
| **V** | the ref this project last **verified against** | `oracle/VERIFIED.tsv`, §3 | a person, by hand |
| **H** | the working copy's local `HEAD` | the working copy | whoever checked it out |
| **U** | `origin/main`, after this session's fetch | the working copy's tracking ref | `git fetch`, §4 |
| **U′, H′** | the values **this install last observed** | `.oracle-state.json` `copies.<name>` | bootstrap Phase 5 |

**V is content. U′ and H′ are install state.** Anything that must survive a clone is content: a fresh
clone that has never run the bootstrap holds V and holds no U′, which is the case that proves they are
two facts rather than one fact in two places.

**Nothing in this policy is load-bearing on `.oracle-state.json`.** Both verdicts in §6 are computed
from V, H and U alone. Delete the record and both verdicts are unchanged; the only loss is §8's
adjective, which degrades to `first observation`. **Falsified by:** any verdict in §6 that changes when
`.oracle-state.json` is deleted.

## 3. The tracked ref record: `oracle/VERIFIED.tsv`

Content. Committed. Hand-edited. Read by `BC-11` and by nothing that writes. Tab-separated.

**Append-only: one row per bump, never an edit in place.** The current V for a copy is the ref of the
**last** row whose `copy` is that name.

```
# rows=5
copy	ref	bumped_at	direction	note
cr-agents	f0c976b	2026-08-27	initial	seeded; committed upstream 2026-08-20; never pushed to by this project
lsei	c8274e6	2026-08-27	initial	seeded; the model working copy as this project first found it
lsei	d7889e1	2026-08-27	ours	seeded, reconstructed from git log; pushed by this project 2026-08-26
lsei	f788ea2	2026-08-27	ours	seeded, reconstructed from git log; pushed by this project 2026-08-26
lsei	7f97983	2026-08-27	ours	seeded, reconstructed from git log; pushed by this project 2026-08-26
```

**Columns.** Five, in this order, none empty, none containing a tab or a newline.

| Column | Rule |
|---|---|
| `copy` | `cr-agents` or `lsei`. Closed. |
| `ref` | the short ref adopted. Resolves in that copy's object store whenever the copy is present. |
| `bumped_at` | the date **this row was added to this file**. One meaning only. A row reconstructing an earlier event carries that event's date in `note`, never here. |
| `direction` | `initial`, `ours`, or `upstream`. Closed. `ours` means the adopted ref contains commits this project pushed. |
| `note` | one clause. Marks a reconstruction as a reconstruction. |

**The header declares its own size**, `# rows=<n> [Q-VERIFIED-ROWS]`, so a row lost to a bad splice is
detectable by counting. The device is The Designer's and it is used here for his reason.

**Why append-only, since one row per copy is smaller.** The three pushes this project made into the
Scenario Explorer are inside the current V and produce no drift; §7's discriminator cannot reach them
and no live comparison can. **The bump is the only place a past push can be recorded**, and a record
holding only the current ref records none of them. Under this form they are three rows carrying
`direction: ours`.

**Bumping is a human act. No phase of any contract writes this file.** Adopting a new ref means a
person looked at what changed and decided this project verifies against it.

**Falsified by:** a reader taking the **first** row for a copy — which reads `c8274e6` for `lsei` and
reports three of this project's own commits as an upstream move; a phase that writes this file; a row
whose `bumped_at` is the date of the event rather than the date of the row.

## 4. The fetch

`BC-10`, every session, before any comparison:

```
git -C <copy> fetch --quiet --prune origin
```

**`--prune` is required.** Without it, a branch deleted upstream keeps resolving from a stale tracking
ref and the comparison returns a clean verdict against a branch that does not exist. Measured: after
the upstream deletes a branch, a plain `fetch` leaves the tracking ref resolving to its old value; with
`--prune`, `rev-parse` on it exits 128, which §5 turns into `unknown`. Prune moves the failure from the
silent direction to the loud one.

**The fetch refspec must be forced.** Both working copies carry a leading `+`, so a rewritten upstream
updates the tracking ref rather than being refused. Without it, §6's `withdrawn` is unreachable.

**`git pull` is forbidden.** It is a fetch with a merge attached; the merge writes to a working copy
this project does not own. See §10.

**A failed fetch is a report line, not a degraded mode.** The session can still answer: local `HEAD` is
knowable offline and is the ref an answer's trace carries under §12. What the session cannot claim is
currency, and §9 says so in fixed words.

**Falsified by:** a comparison in §6 computed from a tracking ref that this session did not fetch; a
session that treats a failed fetch as a blocking mode; any invocation of `git pull` in any contract.

## 5. The primitives, and the three-way exit rule

Four commands. `<copy>` ranges over `cr-agents` and `lsei`.

| Id | Command | Exit 0 means |
|---|---|---|
| `P-EXIST(a)` | `git -C <copy> cat-file -e <a>^{commit}` | `a` is in this copy's object store |
| `P-ANC(a,b)` | `git -C <copy> merge-base --is-ancestor <a> <b>` | `a` is an ancestor of `b` |
| `P-BASE(a,b)` | `git -C <copy> merge-base <a> <b>` | `a` and `b` share history; stdout is the base |
| `P-COUNT(a,b)` | `git -C <copy> rev-list --count <a>..<b>` | stdout is the count of commits in `b` not in `a` |

**The exit rule, stated once and applying to every primitive.** `0` is **true**. `1` is **false**.
**`128` is neither** — it is an error, it yields `unknown`, and the report carries git's stderr
verbatim. Measured: `merge-base --is-ancestor origin/main deadbeef` exits **128**, not 1.

**A policy that treats non-zero as false reports `the authority moved` when the real event is a typo in
`oracle/VERIFIED.tsv`.** That is why the rule is stated here rather than per row.

**`P-ANC` is reflexive: `P-ANC(x,x)` is true.** This is load-bearing in §6's rule order and in §7's
guard, and it is stated rather than assumed.

**Falsified by:** any implementation branching on `exit != 0`; any verdict in §6 produced from a
primitive that exited 128.

## 6. The two axes

Two scalar verdicts per working copy, each a total function. **Rules are evaluated in order and the
first match wins.** The order matters: `P-ANC` is reflexive, so the equality rule must precede the
ancestry rule or every equal pair reports as a move.

### 6.1 CURRENCY — has the authority moved since this project last verified it?

Compares **U against V**. Five values, closed.

| # | Verdict | Rule |
|---|---|---|
| 1 | `unknown` | the fetch failed this session, **or** no row for this copy exists in `oracle/VERIFIED.tsv`, **or** any primitive exited 128, **or** `P-EXIST(V)` is false |
| 2 | `verified` | `U == V` |
| 3 | `upstream-ahead` | `P-ANC(V,U)` is true |
| 4 | `withdrawn` | `P-BASE(V,U)` is non-empty |
| 5 | `unrelated` | otherwise |

**Total:** rules 2 to 5 partition the non-error space. `withdrawn` also covers the upstream rolling
*back* to an ancestor of V, which is correct: the authority no longer contains what this project
verified.

### 6.2 CHECKOUT — is the checkout the authority, or a local variant of it?

Compares **H against U**. Six values, closed.

| # | Verdict | Rule |
|---|---|---|
| 1 | `unknown` | the fetch failed this session, **or** any primitive exited 128 |
| 2 | `at-upstream` | `H == U` |
| 3 | `behind` | `P-ANC(H,U)` is true |
| 4 | `ahead` | `P-ANC(U,H)` is true |
| 5 | `diverged` | `P-BASE(H,U)` is non-empty |
| 6 | `unrelated` | otherwise |

**Uncommitted modifications are not on this axis.** They are `git status --porcelain`, they are the
bootstrap's mode `dirty-or-diverged`, and they are reported there. This axis is about commits.

**Falsified by:** a rule order in which 3 precedes 2 — under which every equal pair reports as a move,
because `P-ANC` is reflexive; a pair of inputs producing no verdict on either axis; a verdict from
either closed set appearing on the other axis.

### 6.3 The third comparison, and why it is not a third axis

Three refs admit three pairwise comparisons. **H against V is the bootstrap's degraded mode
`moved-on`, and it stays there.**

It is not derivable from the two axes: `H == U` with `U` ahead of `V` gives CHECKOUT `at-upstream` and
CURRENCY `upstream-ahead`, and `H` has moved off `V`; `H` behind `U` with `H == V` gives the same two
verdicts, and `H` has not. So the bootstrap computes it directly, `H != V`, from the same three refs.

**It is a mode and not an axis because it is a state of the working copy** — this checkout is not the
one the project verified — whereas both axes above are statements about a *relationship between two
records*. That is the same boundary that keeps `withdrawn` out of the mode table, applied in the
other direction, and drawing it once in both directions is what keeps the two vocabularies from
growing into each other.

**Falsified by:** a third axis appearing in this file; `moved-on` computed from an axis verdict rather
than from `H` and `V`.

## 7. The direction of an upstream move

**Defined only where CURRENCY is `upstream-ahead`. Outside that case it is undefined, and running it
anyway is a defect.**

```
git -C <copy> merge-base --is-ancestor origin/main HEAD
```

| Exit | Reading |
|---|---|
| `1` | The upstream's new commits are not in this object store. **The authority moved.** |
| `0` | The upstream's new commits left through this working copy. **We moved the authority** — and because `BC-6` disables push, this additionally reports that **the push-disable was defeated between sessions**, which is a finding in its own right. |
| `128` | Direction `unknown`. The report carries git's stderr verbatim and makes no claim. |

**The guard is part of the command, not a sentence above it.** `--is-ancestor` is reflexive, so on an
equal working copy — the ordinary case, and the case of both copies today — the command exits 0 and the
0 branch accuses the author of defeating the push-disable. Measured today against `lsei` at `7f97983`:
`is-ancestor(origin/main, HEAD)` exits **0** with nothing whatever having happened. The guard
`CURRENCY == upstream-ahead` is what makes exit 0 mean what the table says.

**This is E10's forward half.** The backward half is `oracle/VERIFIED.tsv`'s `direction` column, §3: a
push that is already inside V produces no drift and no report line, and its record is the bump row that
adopted it.

**Falsified by:** a session reporting a defeated push-disable while CURRENCY is `verified`; a
discriminator run outside `upstream-ahead`; a non-zero exit reported as `the authority moved` without
separating 1 from 128.

## 8. New or standing

The verdicts in §6 are absolute and need no history. The **adjective** is the only thing the install
record contributes, and it has three values.

| Value | Condition | Meaning |
|---|---|---|
| `first observation` | `.oracle-state.json` holds no `copies.<name>` | This install has never looked. **Not `new`:** `new` is a claim about a window, and there is no window. |
| `new` | `U != U′` | The upstream moved since this install last looked, on `observed_at`. |
| `standing since <observed_at>` | `U == U′` | The condition was already true when this install last looked. |

**Why the adjective is worth an install-state read at all.** The absolute line — *the upstream is ahead
of the verified ref* — is computable live. The incremental line — *and it moved since this install last
looked, on 2026-08-24* — is constructible only from the record. When §7 reports a defeated push-disable,
*which sessions* is the first question anybody asks, and the record is the only thing that can answer.

**Containment.** A wrong `copies.<name>` field can make the adjective wrong. **It cannot make a verdict
wrong**, because every verdict in §6 is computed live against content.

**Falsified by:** a first install reporting `new`; an adjective changing a verdict; a session that
refuses because `.oracle-state.json` is absent.

## 9. The report

One block per working copy, in the bootstrap's Phase 5 report, position 2. Fixed grammar.

```
<copy>  V=<v>  H=<h>  U=<u>  currency:<verdict>  checkout:<verdict>
```

Zero or more consequence lines follow, indented two spaces, in this order. **A `verified` /
`at-upstream` copy emits the header line and nothing else.**

| When | Line |
|---|---|
| currency `upstream-ahead` | `upstream is <n> commits ahead of the verified ref <v>; <adjective>; <direction>` |
| currency `withdrawn` | `the upstream no longer contains the verified ref <v>. merge-base <b>. History was rewritten or the branch was reset. Nothing is reset here; the remedy is a bump or a conversation.` |
| currency `unrelated` | `origin and the verified ref share no history. origin=<url>. This is not the repository this project verified against.` |
| currency `unknown` | `currency unknown: <cause>` |
| checkout `behind` | `checkout is <n> commits behind origin/main. Not updated; updating is a human act.` |
| checkout `ahead` | `checkout holds <n> commits origin/main does not.` |
| checkout `diverged` | `checkout and origin/main diverged at <b>: <n> local, <m> upstream.` |
| checkout `unknown` | `checkout state unknown: <cause>` |

`<direction>` is one of exactly three strings: `the authority moved`, `these commits left through this
working copy — THE PUSH-DISABLE WAS DEFEATED`, or `direction unknown: <git stderr>`.

`<cause>` is one of exactly four strings: `no fetch this session`, `no row for <copy> in
oracle/VERIFIED.tsv`, `the verified ref <v> is not in this copy's object store`, or `git error: <git
stderr>`.

**The report is terse when everything is `verified` and `at-upstream`: two lines, one per copy. A
degraded report does not become chattier — it adds lines.**

**Falsified by:** a consequence line under a `verified` / `at-upstream` copy; a direction or cause
string outside its closed set; a report that names a verdict and not the three refs that produced it.

## 10. What this policy never does

Closed, because each item is a thing somebody will propose as a convenience.

1. **Never `reset --hard`, `clean`, `checkout`, `restore` or `stash` in a working copy.** The author
   edits these repositories in another window. A policy that can destroy uncommitted work in somebody
   else's repository is a defect no matter how convenient the reset is.
2. **Never `pull`, `merge`, `rebase` or `switch`.** `pull` is a fetch with a merge attached, and the
   merge is the prohibited half. `git fetch` is not automation. `git reset --hard` is.
3. **Never auto-bump `oracle/VERIFIED.tsv`.** No verdict, however clean, adds a row. Adopting a ref
   means a person looked at what changed.
4. **Never auto-merge, auto-adopt or auto-revert a corpus divergence.** That prohibition is 2.18's and
   is restated here because this policy is where the temptation arrives.
5. **Never re-clone or delete a working copy on any verdict.** Something put it there on purpose.
6. **Never write to a working copy's object store, index, branch or content.** The bootstrap writes two
   local config keys, `BC-6` and `BC-7`, and nothing else.
7. **Never suppress a verdict because the previous session reported it.** `standing` is an adjective,
   not a mute.

## 11. What this policy cannot see

Stated rather than left to be discovered.

**Content withdrawal.** Files deleted upstream on an ordinary fast-forward are invisible to every
comparison in this file. Measured: an upstream that deleted two files and pushed produced
`P-ANC(V,U)` true and CURRENCY `upstream-ahead` — clean, correct, and blind. The six summaries deleted
from the Scenario Explorer corpus during Step 0 are this shape. **The ref layer cannot distinguish an
upstream that added two files from one that deleted two, because both are one commit ahead on the same
line.** Detecting it requires comparing the corpus against a merge-time digest, which is content, which
is the provenance format's (1.7, 2.5), read by `oracle/verify_corpus.js` (2.17) and ruled on by the
fork policy (2.18). **E11's third verdict, `withdrawn` for content, belongs there and cannot be
produced here.**

**A verified ref garbage-collected out of the object store.** After an upstream force-push, V can become
unreachable and git's own automatic `gc` may eventually drop it. This policy cannot prevent that. It
detects it: `P-EXIST(V)` false gives CURRENCY `unknown` with the cause `the verified ref <v> is not in
this copy's object store`, which is the loud direction.

**Uncommitted work.** This policy compares commits. Modifications in the tree are the bootstrap's mode
`dirty-or-diverged`.

**Whether anybody ran the bootstrap.** The comparison is executed by an agent following
`oracle/bootstrap_contract.md`, and no mechanism verifies that it ran. That is the base case named at
`CHK-23` and it is not closable here.

## 12. The app ref requirement

**Passed to `oracle/answer_contract.md` as a requirement, not a preference. It is a contract version
bump there.**

Drafting assumption A3 — *the working copies float on main for drafting purposes* — expires the moment
the answering loop computes its first number. An answer that cannot name the model it was computed
against is not traced.

1. **Every trace line whose origin is `app` names the `lsei` ref the value was computed against.** The
   trace grammar's arity does not change; the ref rides the locator. The origin function, which
   computes `origin` from the locator, strips the ref before resolving.
2. **The ref is read live, once per run**, `git -C lsei rev-parse --short HEAD`, at the start of the
   run. It is not read from `.oracle-state.json`: a per-install, deletable, gitignored file must not be
   load-bearing for a claim inside a delivered document, and unlike `pdfs_present` there is no safe
   fallback value for a ref.
3. **The live ref is compared against `copies.lsei.head`.** A mismatch means the working copy moved
   between the bootstrap and the answer — the floating checkout doing exactly what A3 assumes away — and
   it is a report line on the answer. This is why reading live is not a second definition: the two
   readings are a detector.
4. **Every run log row records the app ref**, or `-` where `lsei` was absent. The run log row schema is
   closed; this extends it, and extending it is a version bump.
5. **An `app` trace with no ref is a refusal**, reason code `input-missing`, whose owner the answer
   contract already names as the bootstrap. No new reason code.

**The expiry has a mechanism and the mechanism is a debt.** `CHK-25`, `oracle/lib/verify_app_ref.js`,
`answer-loop`, `refuse`, status `specified`. A row with status `specified` is a debt and not a
mechanism, so the accurate statement is that A3's expiry has a named artifact, a named consequence and a
named firing event, and it fires when Step 3 implements the row.

**Falsified by:** a delivered answer carrying an `app` trace and no ref; a run log row with an empty app
ref field where an `app` trace was emitted; an implementation reading the app ref from
`.oracle-state.json`.

## 13. Checks

This file is a contract. It runs nothing. It is executed by the bootstrap, which is `CHK-23`.

Two rows are added to `oracle/check_register.md` by this policy:

```
C	CHK-25	oracle/lib/verify_app_ref.js	check	every trace whose origin is app carries the lsei ref the value was computed against, equal to the ref read at the start of the run	answer-loop	refuse	1.6 section 12; drafting assumption A3. Without it an answer cannot name the model it was computed against	specified
C	CHK-26	tools/check_verified_tsv.js	check	oracle/VERIFIED.tsv: declared size equals row count, five fields per row, copy and direction in their closed sets, every ref resolving in that copy's object store when the copy is present	pre-commit	block	1.6 section 3. VERIFIED.tsv is the compared-against value and is the one input to section 6 with no live cross-check	specified
```

`CHK-23`'s `asserts` cell widens to name this policy's two axes, and its `authority` cell cites 1.6
beside 1.4.

**No row for this file.** A row is an artifact that runs; an assertion is a claim, and it lives in the
contract that states it.

**Not a session-start check on `oracle/VERIFIED.tsv`.** A malformed record at session start is already
`unknown` under §6 rule 1, which is the loud direction, and a blocking check there would `ABORT` a
session over a file the session can report on perfectly well.

## 14. Version

The version is a monotone integer. Any change to a closed set, to a primitive, to a rule order, or to a
report string increments it. Three things read it, and if any of the three stops reading it the field is
removed rather than left as decoration:

1. This file carries it.
2. `oracle/bootstrap_contract.md` names the currency policy version its Phase 4 group 2 executes.
3. The bootstrap acceptance suite asserts that the version it was written against equals this one, and
   fails when they differ.

**Independent of the answer contract's, the bootstrap contract's, the counting rule's, the check
register's and the state schema's.** Six monotone integers, six files, six disjoint reader sets. **What
would falsify the independence:** a change to any one that requires a change to another.

