# Step 1.6, The Systems Engineer: the working-copy currency policy

**Persona:** The Systems Engineer
**Sub-step:** 1.6 (origin ARCH-4), Group 2, depends on 1.5 (ARCH-3). **Last sub-step of Step 1.**
**Deliverable:** the block in §2, liftable verbatim to `oracle/currency_policy.md`
**Reasoning:** §1. **Findings and handoffs:** §3. **Quantity blocks:** §4. **Extraction verified:** §5.

**State at time of writing.** Repository root 55 characters, at `515abba`. `cr-agents` at `f0c976b`,
`lsei` at `7f97983`; both push URLs read `DISABLED`, both fetched and verified at the start of this
session; both trees clean. `git version 2.55.0.windows.1`. `oracle/` does not exist, so
`oracle/VERIFIED.tsv` does not exist and §2 §3 seeds it. `lsei` was cloned single-branch — its fetch
refspec is `+refs/heads/main:refs/remotes/origin/main`, `cr-agents`'s is
`+refs/heads/*:refs/remotes/origin/*` — and §2 §4 depends on the leading `+`.

Every claim below about git's behaviour was run in a scratch repository this session against a real
remote, a real clone and a real force-push. The transcripts are in §1.3, §1.5 and §1.6. Nothing here
is recalled.

---

## 1. Reasoning

### 1.1 The C4 ruling, recorded, and the two things worth carrying out of it

**RULED by the author, 2026-08-26: the `verify_report.js` dependency is dropped.** The three
answering-loop mechanisms are rewritten without it. Not extracted, not vendored, not pinned. Being
able to acquire something is not a reason to depend on it. The Software Engineer had already made the
answer contract independent of it at 1.3, by restating the claim-bearing definition in the contract's
own words rather than by reference, so the ruling costs one reimplementation and costs the contract
nothing. He ruled at 1.11 that the replacement post-condition folds into his suite, and the
implementation row is his to place in Step 3; it stands in the check register today as `CHK-20`,
`oracle/lib/claim_bearing.js`, status `specified`, with author ruling 1 named in its authority cell.

**Register row C4 is closed. I do not reopen it and I frame no options.** Two things it produced are
worth carrying forward rather than closing silently.

**First, the file is real, and its location is now a measured quantity.** The row was wrong twice —
once saying the source lived in a floating working copy, once saying it did not exist at all — and the
correction is a number that should not be allowed to drift a third time. Measured this session:
`lsei/report-generator-prompt.md` line 357 is the opening fence, line 686 is the closing fence, and
the source between them is lines 358 to 685 inclusive, `328 [Q-C4-SOURCE-LINES]` lines. The counting
rule's Tier 2 touch rule fires here — C4 is edited in this sub-step and its Finding cell holds a
governed numeral under test G2 — so §4 mints the block rather than restating the numeral a fourth time.

**Second, the reason the file was invisible is the pattern, and the pattern is mine at 1.13.** A
filename search cannot see a file that exists as content inside another file. At 1.13 that pattern
reached seven instances. It survives the ruling, because it was never about this one file.

### 1.2 Two axes, not one verdict, and it is the pin/float question made mechanical

D4 asked pinned or floating. My 0.2 answer was *neither as stated*, on the grounds that a hard pin
makes staleness invisible the same way floating makes breakage invisible, and trading one invisible
failure for another is not a decision. That is a good sentence and it is not yet a mechanism. Here is
the mechanism, and stating it this way is what earns the sentence.

Three refs per working copy produce **two independent comparisons**, and each answers a different
question:

| Axis | Compares | Asks |
|---|---|---|
| **CURRENCY** | `origin/main` against the verified-against ref | *Has the authority moved since this project last verified it?* |
| **CHECKOUT** | local `HEAD` against `origin/main` | *Is the checkout the authority, or a local variant of it?* |

**A hard pin drives CHECKOUT to a constant and makes CURRENCY unreadable** — the checkout is held at
the pinned ref, so nothing in the working copy ever demonstrates that the upstream moved. **Pure
floating drives CURRENCY to a constant** — there is no recorded ref, so there is nothing for
`origin/main` to be ahead of. Recording the ref and floating the checkout is precisely the
configuration in which **both axes carry information**. That is the whole content of the D4 answer. It
is not a compromise between two positions; it is the only arrangement under which the two questions
are separately answerable.

**Why this is two scalars and not one.** 1.4 §7 froze one verdict per copy over five values. One
scalar has to choose between the two questions whenever they disagree, and they disagree in the
ordinary case: the author edits `lsei/` in another window while the upstream is also ahead. Under one
scalar the report names one of those and hides the other. Two scalars is one more token in the report
line and no more machinery, because the primitives are shared. **The amendment against 1.4 §7 is
stated at §3.1 with the token mapping**, so 6.1 can see exactly what changes.

I ran the simplicity gate on this at §1.9 and it survived. Something else did not.

### 1.3 The direction discriminator: correct as written, and one rung from a false accusation

E10's fix at 1.4 §7 is `git -C <copy> merge-base --is-ancestor origin/main HEAD`, true meaning the
commits left through this working copy. I re-ran it rather than inheriting it, and found two things
the contract does not say.

**`--is-ancestor` is reflexive, and reflexivity puts the accusation on the wrong branch.** Run today
against the real `lsei`, where `origin/main` and `HEAD` are both `7f97983`:

```
$ git -C lsei merge-base --is-ancestor origin/main HEAD ; echo "exit=$?"
exit=0
```

Exit 0 is **true**, and true is the branch whose report line reads *the push-disable was defeated
between sessions*. On an ordinary, entirely correct, nothing-has-happened session. 1.4 §7 is not wrong
— it guards the command with "For `upstream-ahead`, run:" — but the guard is a sentence of prose in
front of a command whose unguarded failure mode is a false accusation of the author, and an
implementer who lifts the command lifts the accusation with it. **So the guard is written into the row
rather than above it:** §2 §7 defines the discriminator as *undefined* outside CURRENCY
`upstream-ahead`, and states the reflexivity as the reason.

**Exit 128 is not false.** Measured:

```
$ git merge-base --is-ancestor origin/main deadbeef ; echo "exit=$?"
fatal: Not a valid object name deadbeef
exit=128
```

A policy that treats non-zero as false reports *the authority moved* when the real event is a typo in
`oracle/VERIFIED.tsv`, or a ref that has left the object store. Zero is true, **one** is false, and
**128 is neither**: it is `unknown`, carrying git's own stderr verbatim. §2 §5 states the three-way
rule once, for every primitive, rather than per row.

**The discriminator itself is sound, and I confirmed both branches on a constructed remote:**

```
authority moved      V=80e62d2 H=80e62d2 U=98ddffb   is-ancestor(U,H) exit=1   FALSE
we moved authority   V=80e62d2 H=83c0626 U=83c0626   is-ancestor(U,H) exit=0   TRUE
```

### 1.4 (a) The three pushes that already happened, and where a past push actually lives

The charge is right that the assertion cannot reach them, and right that the policy owes an answer.
The honest answer has two halves and only the second is a mechanism.

**The report says nothing about them, and that is correct.** This project pushed `lsei` three times,
`c8274e6` → `d7889e1` → `f788ea2` → `7f97983`: `3 [Q-LSEI-PUSHED-COMMITS]` commits, confirmed by
`git -C lsei rev-list --count c8274e6..HEAD`. All three are *inside* the ref this project now verifies
against. There is nothing outstanding to report, and a report that named them would be naming a
resolved condition forever. A drift report is a statement about a difference, and there is no
difference.

**What makes that correct is the bump, so the bump is where a past push has to live.** If the record
of what this project verified against holds only the current ref, the three pushes are unrecorded
anywhere any mechanism can reach, and the answer to (a) really is *nothing, forever*. So the record
becomes **append-only, one row per bump, and every row carries its direction**: `initial`, `ours`, or
`upstream`. 1.5 §3.5 handed `VERIFIED.tsv`'s columns to this sub-step; this uses that grant and also
changes its row semantics, which is more than columns, so §3.1 states the amendment owed against my
own 1.5 §2 §9 explicitly rather than letting it be discovered.

The cost is one clause in `BC-11`: **V is the ref of the *last* row whose copy is `<name>`, not *the*
row.** That cost buys a falsifier worth having, and §2 §3 states it — a reader taking the first row
reads `c8274e6` for `lsei` and reports three of this project's own commits as an upstream move.

The record seeded at §2 §3 is not a placeholder. It is this project's real bump history, reconstructed
from `git log` this session, and the reconstruction is marked in every row it applies to.

### 1.5 (b) E11, upstream withdrawal: two shapes, and only one of them is mine

E11 has no verdict, is not hypothetical — six summaries were deleted from the Scenario Explorer corpus
during Step 0, by us — and is filed against 2.17 and 2.18. My charge hands it here. **It splits along a
layer boundary, and the split is the ruling.** I measured both shapes on a constructed remote.

**Shape one: ref withdrawal. Visible here, and 1.4 §7 misfiles it.** The upstream no longer contains
the ref this project verified against, because history was rewritten or the branch was reset:

```
V=9acb1f1  U=75a8825            (auth reset to V~1, new commit, force-push)
  V still in the local store    cat-file -e V^{commit}     exit=0
  V on the upstream line        is-ancestor(V,U)           exit=1
  merge-base(V,U)               80e62d2                    NON-EMPTY
```

Against a genuinely unrelated repository the same probe reads differently:

```
  merge-base(other,HEAD)        (empty)                    exit=1
```

**So "history was rewritten" and "the refs share no merge base" are mechanically distinguishable, and
1.4 §7 gives them one verdict, `unrelated`.** A non-empty merge-base with V off the upstream line is
`withdrawn`. An empty merge-base is `unrelated`, and `unrelated` means `origin` is pointed at a
different repository, which is a different problem with a different remedy. The amendment is at §3.1.

**Shape two: content withdrawal. Invisible here, and no ref comparison can see it.** Files deleted
upstream on an ordinary fast-forward:

```
V=9acb1f1  U=139cf88            (auth deleted two files and pushed)
  is-ancestor(V,U)   exit=0     an ordinary fast-forward
  CURRENCY verdict   upstream-ahead    clean, correct, and blind
  deleted V..U       f1.txt f2.txt
```

The ref layer reports a perfectly ordinary upstream move. **The six Step 0 deletions are this shape.**
Nothing in a three-ref comparison can distinguish an upstream that added two files from one that
deleted two, because both are one commit ahead on the same line.

**Ruling.** The currency policy owns the ref half and defines `withdrawn` for it. **It cannot own the
content half and does not pretend to.** Content withdrawal is detectable only by comparing the corpus
against a merge-time digest; that digest is content; it is The Engineer's provenance format at 1.7 and
2.5; `oracle/verify_corpus.js` reads it at 2.17 and 2.18's fork policy rules on it. §2 §11 states the
limit in the deliverable, with the measurement, so that 2.18 inherits a demonstrated gap rather than a
suspicion.

**`withdrawn` is a report line and not a seventh degraded mode.** A mode is a state a working copy can
be in. `withdrawn` is a state of the relationship between a record and an upstream, and the copy still
works — `lsei/index.html` still computes. This follows BC-10's precedent, where a failed fetch is a
report line and not a mode, and it avoids reopening `Q-DEGRADED-MODES` a second time in one week when
it is already going six to five under F3.

### 1.6 (c) E6, the plan-level fix, which is a precondition rather than another command

`CLAUDE.md` fixed E6 for a session by adding a fetch loop. The plan-level fix is not another fetch; it
is a statement about what the comparison is *defined over*. **Both axes are defined only over refs read
after this session's successful fetch.** If BC-10 did not succeed, both axes are `unknown` — not
"probably unchanged", not the last known verdict, and not silence. `unknown` prints a fixed line naming
its cause.

Two consequences that are not obvious, and both are in the deliverable.

**`--prune` is required, not forbidden.** I expected the opposite and measured it:

```
upstream deletes branch `side`
  git fetch origin            origin/side STILL RESOLVES to 75a8825
  git fetch --prune origin    rev-parse origin/side  exit=128
```

Without prune, a branch deleted upstream keeps resolving from a stale tracking ref, and the comparison
returns a **clean verdict against a branch that no longer exists** — a false green. With prune it
becomes exit 128, which under §2 §5's three-way rule is `unknown` carrying git's message. Prune moves
this failure from the silent direction to the loud one, and it is one flag.

**`git pull` is forbidden, and the reason is not stylistic.** `pull` is a fetch with a merge attached;
the merge writes to a working copy this project does not own; and the prohibition on automatic change
is the spine of this policy. The fetch is the half we want. `pull` is the fetch with the prohibited
half stapled to it.

**The offline case does not block answering.** A failed fetch costs the *claim of currency*, not the
ability to compute: local `HEAD` is knowable with no network, and local `HEAD` is exactly the ref an
answer's trace must carry under §1.7. So an offline session answers; every answer it produces names the
ref it was computed against; and the report says currency is unknown. Those are three separate facts
and the policy keeps them separate.

### 1.7 (d) and (f): the flow, and A3's expiry given a mechanism instead of a sentence

**The flow, concretely, because "content versus state" dissolves unless the reads and writes are
named.** My 1.5 correction to E12 ruled that the compared-against values are content and the record
holds only what this install last observed. This policy is the mechanism that reads one and writes the
other:

| Read | From | Kind |
|---|---|---|
| V, the verified-against ref | `oracle/VERIFIED.tsv`, last row for that copy | content; survives a clone |
| H, local `HEAD` | the working copy, live | live |
| U, `origin/main` | the working copy, live, after this session's fetch | live |
| H′, U′, `observed_at` | `.oracle-state.json` `copies.<name>` | this install's last observation |

| Written | To | By |
|---|---|---|
| H, U, now | `.oracle-state.json` `copies.<name>`, whole or not at all | bootstrap Phase 5 |
| a new bump row | `oracle/VERIFIED.tsv` | **a person. No phase writes it.** |

U against V gives the CURRENCY verdict. H against U gives the CHECKOUT verdict. **U against U′ gives
only an adjective** — `new`, `standing since <date>`, or `first observation`. That last value matters:
a fresh install has no window, and reporting "the upstream moved" as news on an install that has never
looked before is a claim about a window that does not exist.

**The keystone survives, and I checked it rather than assuming it.** `.oracle-state.json` is safe to
delete. Delete it and both verdicts are unchanged, because both are computed live against content and
against the working copy; the only loss is the adjective, which degrades to `first observation` and is
re-observed next run. **No field of the record is load-bearing for any verdict this policy produces**,
which is the property 1.5 §1.2 bought and this policy is the first mechanism that could have spent it.

**(f) A3's expiry.** Drafting assumption A3 is *the working copies `cr-agents/` and `lsei/` float on
main for drafting purposes*. My 1.13 ruling is that a row names an artifact and a consequence, and the
charge asks for the same treatment here or a plain statement that it cannot have one. **It can have
one.**

- **Artifact:** `oracle/lib/verify_app_ref.js`, entered in the check register as `CHK-25`.
- **Consequence:** `refuse`, on the answering loop, with reason code `input-missing` — a code that
  already exists, already means "a required input is absent, empty, or unparseable", and already names
  the bootstrap as the owner of the fix. No new code, and no change to the closed set of six.
- **The firing event:** A3 expires per answer, at the first trace whose origin is `app`. That is
  exactly "the moment the loop computes its first number", because a number computed against the model
  is precisely what produces an `app`-origin trace.

**The objection, and it is a real one.** A `LITERATURE` answer emits no `app` trace, so `CHK-25` never
fires and A3 survives that answer. It should. A3 is a statement about the model an answer was computed
against, and an answer with no `app` trace was not computed against the model. The scope is right.

**The second objection is the one I will not dress up. `CHK-25` is `specified`, not `live`.** By my own
1.13 §7, a row with status `specified` is a debt and not a mechanism. So the accurate statement is:
*A3's expiry has a named artifact, a named consequence and a named firing event, and it is a debt until
Step 3 implements the row.* That is a different claim from "A3 has expired", and I am making the first
one.

**Where the ref comes from, ruled, because two sources were available and both are wrong alone.** The
loop could read `copies.lsei.head` from the state record, or read the ref live. Reading it from the
record makes a per-install, deletable, gitignored file load-bearing for a claim inside a delivered
document, which breaks the keystone in the one place it matters most — and unlike `pdfs_present`, there
is no safe fallback value for a ref. Reading it live gives the loop a second definition of a fact the
bootstrap already established. **Ruling: read it live, once per run, and compare it against
`copies.lsei.head`.** The number and the ref must come from the same read, or the trace is a guess; and
the comparison turns the second definition from a duplication defect into a detector, because a
mismatch means the working copy moved between the bootstrap and the answer — which is the floating
checkout doing the exact thing A3 assumes away. **1.5's containment sentence survives in a stronger
form: a wrong `copies.lsei.head` cannot produce a wrong app ref; it can only produce a spurious "the
working copy moved mid-session" line.**

### 1.8 F9b: what "unchanged" means, and the adjective that breaks idempotence on purpose

The Software Engineer handed 1.6 F9b: the idempotence claim is coupled to the fetch, so this policy and
the idempotence definition have to agree on what *unchanged* means. Three points, two of them
corrections to my own 1.4.

**One. Unchanged upstream is defined here, once.** `origin/main` reads the same ref on run 2 as on run
1, for every working copy. That is this policy's U, and it is the only object the two files need to
share. Under an unchanged upstream and an unchanged tree, both axis verdicts are identical between
runs.

**Two. 1.4's idempotence definition says "the timestamp", and there are four.** `written_at`,
`copies.cr-agents.observed_at`, `copies.lsei.observed_at` and `corpus.observed_at` all change on every
run by construction. A 6.1 fixture written against the singular reads three violations against a
correct implementation. Amendment at §3.1: *except `written_at` and every `observed_at`*.

**Three, and this is the real one: the drift adjective makes run 2 differ from run 1 by more than a
timestamp, and that is correct.** Run 1 sees U different from the recorded U′ and reports `new`; it
then writes U. Run 2 sees U equal to U′ and reports `standing since <date>`. The report changed, and
neither run is wrong — the second run genuinely knows something the first did not. So the idempotence
property has to be stated over the right pair of runs:

> **Run N+1 is identical to run N in every field but the timestamps, and in every report line, whenever
> run N wrote no new value to `copies`.**

That is testable, it is sharper than "two runs in immediate succession", and it makes the exception
visible instead of leaving it to be discovered by a flaky fixture. A run that changes `copies` is by
construction a run that had something to report.

### 1.9 The simplicity gate, and the one thing it removed

I asked what breaks if each object in §2 is deleted.

**Two axes: kept.** Collapsing to one scalar forces a choice between two questions in the ordinary case
where they disagree, and the three refs exist to ask two questions. What breaks: the report can name an
upstream move or a dirty checkout, not both.

**`withdrawn`: kept.** Deleting it returns a rewritten history to `unrelated`, which is a different
problem with a different remedy, and the two are one `merge-base` apart. What breaks: the report tells
you to check whether `origin` points at the right repository when the real event is that the author
rebased.

**The `direction` column on `VERIFIED.tsv`: kept, narrowly.** Without it, the answer to charge (a) is
"nothing, forever". What breaks: a past push has no home in any mechanism.

**The `note` column: kept.** It is the only place the seed's reconstruction can be marked as a
reconstruction, and an unmarked reconstruction is a fabricated record.

**A blocking session-start check on `VERIFIED.tsv`: CUT.** I drafted `tools/check_verified_tsv.js` with
two consequences — block at `pre-commit`, block at `session-start` — which under my own 1.13 rule is two
rows. The session-start half is wrong: a malformed record at session start is already `unknown` under
§2 §5, which is the loud direction, and a blocking check there would `ABORT` a session over a file the
session is perfectly able to report on. **One row, one consequence, `pre-commit`, `block`**, because the
file is content and a commit is when content changes. The gate produced a smaller answer than the draft.

**A quantity block for the per-copy ref: not minted, deliberately.** `lsei`'s `HEAD` is quoted in this
file, in 1.4, in 1.5 and in 1.13, which makes it governed under test G1 — and it is a `live` value, so
under counting rule §3 it may never be quoted as a bare literal anywhere, including inside its own
block. It needs a block, and the block is not mine to place: it is quoted in more files by other
personas than by me, and minting it here to satisfy my own file would put its birth in the wrong place.
§3.5 hands it over with the argument.

---

## 2. The deliverable

Everything between the markers lifts to `oracle/currency_policy.md` unedited.

<!-- BEGIN oracle/currency_policy.md -->

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

<!-- END oracle/currency_policy.md -->

---

## 3. Findings, and what this sub-step hands on

Ordered by what they cost if ignored.

### 3.1 Amendments owed against 1.4, 1.5 and 1.13 — all three files mine

**Against `oracle/bootstrap_contract.md` (1.4).** These are in addition to the six already owed at 1.5
§3.1 and the review's own list, and they land in the same edit.

| # | Where | Amendment |
|---|---|---|
| 7 | §7 | Replace the five-value verdict table with the two axes of the currency policy §6. Token mapping for 6.1: `equal` becomes CURRENCY `verified` **and** CHECKOUT `at-upstream`; `upstream-ahead` survives on CURRENCY; `local-ahead` becomes CHECKOUT `ahead`; `unrelated` **splits** into `withdrawn` and `unrelated`; `unknown` survives on both. Three new tokens: `withdrawn`, `behind`, `diverged`. |
| 8 | §7 | The direction discriminator is defined **only** where CURRENCY is `upstream-ahead`, and exit 128 is `unknown` rather than false. `--is-ancestor` is reflexive; unguarded, it accuses the author on every equal session. |
| 9 | §4, BC-10 | `git -C <copy> fetch --quiet --prune origin`. Without `--prune`, a branch deleted upstream keeps resolving and the comparison returns a clean verdict against a branch that does not exist. Measured. |
| 10 | §4, BC-11 | V is the ref of the **last** row for that copy in `oracle/VERIFIED.tsv`, which is now append-only. |
| 11 | §3 | The idempotence definition's "the timestamp" becomes "`written_at` and every `observed_at`" — there are four, and a 6.1 fixture written against the singular reads three violations against a correct implementation. |
| 12 | §3 | Idempotence is stated over the right pair of runs: *run N+1 is identical to run N in every field but the timestamps, and in every report line, whenever run N wrote no new value to `copies`.* Closes F9b. |
| 13 | §8 | Add: never `git pull` in a working copy. `pull` is a fetch with a merge attached and the merge is the prohibited half. |

**Against `oracle/install_state.md` (1.5).**

| # | Where | Amendment |
|---|---|---|
| 1 | §9 | `oracle/VERIFIED.tsv` becomes append-only, five columns, `# rows=<n>`. 1.5 §3.5 granted 1.6 the columns; the row semantics is more than columns and is stated here rather than assumed. The seeded content is at currency policy §3. |
| 2 | §5 | `copies.lsei.head`'s reader widens: *the next run's Phase 5; the answering loop, as a comparand.* The wrongness cell widens correspondingly and **does not weaken**: a wrong value cannot produce a wrong app ref, because the loop reads the ref live; it can only produce a spurious "the working copy moved mid-session" line. |
| 3 | §10 | The consumer count is unchanged at `4 [Q-STATE-CONSUMERS]`. The answering loop already appears; it now reads two fields rather than one. No new consumer, no block correction. |

**Against `oracle/check_register.md` (1.13).** Two rows added, `CHK-25` and `CHK-26`, both `specified`;
`CHK-23`'s `asserts` and `authority` cells widened. `Q-CHECK-ROWS` goes 24 to 26 and `specified` 15 to
17, with a `superseded` entry. The `H` row becomes `H 1 <date> 26 7 17 2`. `CL-1` is satisfied:
`tools/check_verified_tsv.js` is under the `tools/**` root and has a row; `oracle/lib/verify_app_ref.js`
is under `oracle/**/*.js` and has a row.

### 3.2 The lift is specified as a copy, and the counting rule requires a move. Seven blocks collide

Found by noticing that I put quantity blocks **inside** the liftable markers at 1.4 and 1.5, and
**outside** them at 1.13, and asking which was right. Measured across `cr_scratch/`, counting
```` ```quantity ```` fences by whether a `<!-- BEGIN -->` marker was open:

```
step1_4_systems_engineer_bootstrap_contract.md     inside=3   outside=0
step1_5_systems_engineer_install_state.md          inside=4   outside=0
step1_12_designer_counting_rule.md                 inside=1   outside=0
step1_8_software_engineer_register_schema.md       inside=0   outside=14
step1_9_space_resources_engineer_register_rows.md  inside=0   outside=15
step1_10_manager_economics_register.md             inside=0   outside=9
step1_13_systems_engineer_check_register.md        inside=0   outside=4
step1_7_engineer_naming_addendum.md                inside=0   outside=2
                                                   -------    --------
                                                   8          44
```

Every extraction in this project is specified as `sed -n '/BEGIN/,/END/p' cr_scratch/x.md > oracle/y.md`
— **a copy, not a move.** The counting rule §8's declared file set scans both `cr_scratch/**/*.md` and
`oracle/**`. So the moment 1.4's and 1.5's deliverables land, `Q-BOOTSTRAP-PHASES`,
`Q-DEGRADED-MODES`, `Q-BLOCKING-MODES`, `Q-STATE-FACTS`, `Q-STATE-ABNORMAL-READS`,
`Q-STATE-CONSUMERS` and `Q-STATE-KEYS` each exist in two files. Counting rule §5 row 1: **two blocks
sharing an id is a hard `--check` failure and the sub-step does not close.**

Counting rule §8 permits a block to move between files and not to exist in two. **The extraction command
is therefore incomplete as written**, and this is not a style point: it is the checker failing on its
first real run, against seven of my own blocks.

Two dispositions, and I recommend the second:

- Extend every extraction to delete the block from `cr_scratch/` after copying, making the lift a move.
  Cost: the reasoning file loses the numbers its reasoning is about.
- **Put quantity blocks outside the liftable markers**, as 1.13 does and as this file does. The block is
  born in the persona's file, the deliverable quotes it as `<value> [<id>]`, and the lift copies prose
  that carries tags rather than definitions. Five of the eight files already do this; three do not.

**The eighth inside-marker block is latent rather than colliding, and it is The Designer's own.**
`Q-PAIR-IDENTICAL` appears as the worked example
inside `COUNTING_RULE.md`'s own liftable block. It is not a duplicate today because the real block has
never been minted — it is a Tier 1 retrofit, the corrected 89/6 to 87/8 value. **The moment somebody
mints it, the counting rule collides with its own illustration.** One line to fix at 1.12 or wherever
that block is born: either the example uses a reserved id that no real block may take, or the parser
skips blocks nested inside a four-backtick fence.

### 3.3 Loose-ends register row E10 states two pushes and there have been three

E10's Finding cell reads "this project pushed two commits to the Scenario Explorer". Measured:
`git -C lsei rev-list --count c8274e6..HEAD` is `3 [Q-LSEI-PUSHED-COMMITS]`. Under counting rule test G2
the Finding cell of a loose-ends register row is governed prose, and under the Tier 2 touch rule E10 is
edited by this sub-step, so the correction lands in the same edit as the closure. §4 mints the block so
that the numeral cannot go stale a fourth time; the quantity is `live`, because it grows every time this
project pushes.

### 3.4 The answer contract's version is stated as 1 in its own deliverable and as 2 everywhere else

`cr_scratch/step1_3_software_engineer_answer_contract.md` line 199 reads **Contract version: 1** inside
the liftable block. 1.8 §9 amended the contract to version 2, 1.11 v2's title says version 2, and 1.5
§1.7's table lists it at 2. The orchestrator's verification file already records this as a live
inconsistency being reconciled.

Naming it here because §12 of this deliverable adds a **third** bump to that contract, and a version
field that three files disagree about is a version field that has stopped being read — which is the
exact condition the contract's own §9 says removes the field. **Whoever reconciles 1 against 2 should
land §12's bump in the same edit** rather than leaving two corrections queued against one integer.

### 3.5 `Q-LSEI-HEAD` and `Q-CR-AGENTS-HEAD` are owed and are not mine to mint

`lsei`'s short `HEAD` is quoted in 1.4, 1.5, 1.13 and this file; `cr-agents`'s in the same four. Under
test G1 both are governed. Both are `live`, and under counting rule §3 rule 2 a `live` value may never
be quoted as a bare literal in any file including its own — every statement carries the value, the
timestamp and the command. **Every one of the eight sites today is a bare literal**, which is the exact
failure §3 rule 2 was written for and which cost four sites a correction when `lsei` moved from
`f788ea2` to `7f97983`.

I have not minted them. Both are quoted in more files by other personas than by me, and minting them in
this file would put their birth in the wrong place and give the `at` field a datum that says more about
my scheduling than about the value. **They are owed at the moment `tools/quantities.js --lint` first
runs, which will find all eight sites, and the eight `at:` lines in the existing deliverables are the
form the fix takes.**

**One `--lint` finding in this deliverable is pre-dispositioned so it does not read as a surprise.**
`Q-VERIFIED-ROWS` is class `live`, and counting rule §3 rule 2 forbids quoting a `live` value as a bare
literal. The seeded `oracle/VERIFIED.tsv` carries a bare `# rows=5`. **That is the file declaring its
own size, not a quotation of it**, and the distinction is the whole point of the device: a
self-declaration inside the file it describes cannot go stale relative to that file — it is what makes
a lost row detectable. The prose beside it carries the tag. **Disposition: not a violation. A
self-declared size header is exempt from rule 2, and if the checker cannot make that distinction the
exemption belongs in the counting rule rather than in a suppression here.**

### 3.6 Handoffs

| To | What |
|---|---|
| **The Engineer**, review of this file | Every measurement in §1 has its command and its exit code; §2 §5's three-way exit rule and §2 §6's rule order are the two places where an implementation goes wrong silently, and both carry falsifiers. The clause I most expect him to attack is the append-only `VERIFIED.tsv` at §2 §3, which is a change to my own 1.5 and which buys exactly one thing — a home for a past push. §1.9 states what the gate cut. |
| **1.4** (mine) | §3.1's seven amendments, in the same edit as 1.5 §3.1's six. F9b closes with amendments 11 and 12. |
| **1.5** (mine) | §3.1's three amendments. The keystone is intact and §2 §2 states the falsifier that proves it. |
| **1.13** (mine) | `CHK-25`, `CHK-26`, the `CHK-23` widening, and `Q-CHECK-ROWS` 24 to 26 with a `superseded` entry. |
| **1.3 / the answer contract** | §2 §12, five clauses, a contract version bump and a run log row schema extension. The trace grammar's **arity does not change**; the ref rides the locator and the origin function strips it before resolving. Reason code `input-missing` is reused and the closed set of six is untouched. |
| **1.11 / Step 3**, The Software Engineer | `CHK-25` is the artifact that expires A3, and it is his suite's to assert. Until it is `live`, A3's expiry is a debt and this file says so. |
| **2.17 / 2.18**, corpus divergence and fork policy | **E11's content half is yours and cannot be produced at the ref layer.** §2 §11 carries the measurement: an upstream that deleted two files produced CURRENCY `upstream-ahead`, clean and blind. Your third verdict is content withdrawal, detected against the merge-time digest, reported and never auto-acted. |
| **1.7 / 2.5**, The Engineer, provenance | Unchanged from 1.5's handoff: the merge-time digest is content. This policy adds one consumer of that fact — §2 §11's statement of what the ref layer cannot see. |
| **6.1**, bootstrap acceptance suite | The two closed verdict sets and their rule order (§2 §6), the three-way exit rule (§2 §5), the direction guard (§2 §7), the three adjective values (§2 §8), the closed direction and cause strings (§2 §9), and the amended idempotence property (§3.1 amendment 12). The highest-value fixture is a local fixture remote: it makes `withdrawn`, `unrelated`, `upstream-ahead` in both directions, and the offline case all constructible, and The Software Engineer proposed the same fixture at F9b for the same reason. |
| **The orchestrator** | §3.2, the extraction-is-a-copy defect, which fails `--check` on seven of my blocks the first time it runs. §3.3, E10's two-versus-three. §3.4, the answer contract's version. §3.5, two `live` quantity blocks owed and eight bare-literal sites. **Loose ends closed here: D4, E6, E10, C4. E11's ref layer closed; its content layer restated against 2.18 with a measurement.** |

---

## 4. Quantity blocks

Outside the liftable markers, deliberately, per §3.2.

```quantity
id:            Q-C4-SOURCE-LINES
class:         fixed
value:         328
unit:          lines of JavaScript between the fences of the verify_report.js block in
               lsei/report-generator-prompt.md, fences excluded
population:    lines 358 to 685 inclusive of lsei/report-generator-prompt.md; the opening fence
               is line 357 and the closing fence is line 686, so the fenced region spans 330
               lines inclusive and the source between the fences is 328
operation:     cmd: sed -n '358,685p' lsei/report-generator-prompt.md | wc -l
conditions:    cwd: repository root, 55 characters. Measured against lsei at 7f97983; the line
               numbers are locators into a file in a floating working copy and move if the
               upstream edits that file, which is why the block carries the ref in at.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the source of verify_report.js embedded in lsei/report-generator-prompt.md is
               328 lines, at lines 358-685 inclusive, between fences at 357 and 686.
derived-from:  none
sampled:       n/a -- this operation counts, it does not classify
superseded:    none. Register row C4 has twice been wrong about this file's existence rather
               than about its size; no prior value of this quantity was ever stated.
```

```quantity
id:            Q-LSEI-PUSHED-COMMITS
class:         live
value:         3
unit:          commits this project pushed to the Scenario Explorer upstream
population:    commits reachable from lsei origin/main and not from c8274e6, the ref at which
               this project first found the model working copy
operation:     cmd: git -C lsei rev-list --count c8274e6..origin/main
conditions:    cwd: repository root, 55 characters. Requires a fetch this session; a stale
               tracking ref undercounts. The three commits are d7889e1, f788ea2 and 7f97983,
               each pushed separately, so the commit count and the push count coincide today
               and are not the same quantity.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     this project has pushed 3 commits into the Scenario Explorer upstream, and
               every one of them is inside the ref this project currently verifies against,
               which is why no live drift comparison can reach them.
derived-from:  none
sampled:       n/a -- this operation counts, it does not classify
superseded:    2 (loose-ends register row E10, The Systems Engineer at 0.5, 2026-08-26) --
               correct when written; a third push landed on 2026-08-26 after the row was
               filed, and the row was not touched.
```

```quantity
id:            Q-VERIFIED-ROWS
class:         live
value:         5
unit:          bump rows in oracle/VERIFIED.tsv, excluding the size header and the column
               header
population:    every line of oracle/VERIFIED.tsv that is neither the # rows= header nor the
               column-header line
operation:     cmd: grep -vc '^#\|^copy\b' oracle/VERIFIED.tsv
conditions:    cwd: repository root, 55 characters. Before oracle/ exists, materialise the
               seeded block first: awk '/^# rows=/{f=1} f{print} f&&/^lsei\t7f97983/{exit}'
               cr_scratch/step1_6_systems_engineer_currency_policy.md > oracle/VERIFIED.tsv,
               then run the operation. The file is append-only, so this value never
               decreases; a decrease is a bad splice and the # rows= header is what detects
               it.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     oracle/VERIFIED.tsv holds 5 bump rows -- 1 for cr-agents and 4 for lsei -- and
               its # rows= header declares the same number, so a row lost to a bad splice is
               detectable by counting.
derived-from:  none
sampled:       n/a -- this operation counts, it does not classify
superseded:    none
```

```quantity
id:            Q-CURRENCY-VERDICTS
class:         fixed
value:         11
unit:          verdict values across the two closed axis vocabularies at section 6 of the
               currency policy, counted with unknown and unrelated once per axis
population:    the rows of the two verdict tables at section 6 of the currency policy: 5 on
               the CURRENCY axis and 6 on the CHECKOUT axis
operation:     manual: The Systems Engineer at sub-step 1.6; enumerated the rows of both
               verdict tables and counted them; 11 items inspected
conditions:    none. The value is a ruling of this contract rather than a measurement of an
               environment. unknown and unrelated appear on both axes and are counted twice,
               because a verdict is a value of an axis and not a word: CHECKOUT unrelated and
               CURRENCY unrelated are produced by different rules from different inputs.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the currency policy recognises 11 verdict values -- 5 on CURRENCY and 6 on
               CHECKOUT -- and a condition outside them is a failure of the contract, not a
               twelfth verdict.
derived-from:  none
sampled:       n/a -- this operation enumerates a closed list, it does not classify
superseded:    5 (oracle/bootstrap_contract.md section 7, The Systems Engineer at sub-step
                  1.4, 2026-08-26) -- one scalar over five values, which cannot report an
                  upstream move and a dirty checkout at once and files a rewritten history
                  as unrelated.
```

---

## 5. Extraction, verified

```
$ sed -n '/^<!-- BEGIN oracle\/currency_policy.md -->$/,/^<!-- END oracle\/currency_policy.md -->$/p' \
      cr_scratch/step1_6_systems_engineer_currency_policy.md > oracle/currency_policy.md
```

Post-conditions, all run against this file:

1. The extracted block begins with `<!-- BEGIN oracle/currency_policy.md -->` and ends with
   `<!-- END oracle/currency_policy.md -->`.
2. It contains **zero** ```` ```quantity ```` blocks, per §3.2. Every numeral it states is either a
   `<value> [<id>]` quotation or a locator.
3. The seeded `oracle/VERIFIED.tsv` block holds one `# rows=` header, one column-header line and
   **5 data rows, each of exactly 5 tab-separated fields**, no field empty; the header's declared count
   equals the parsed count; every `copy` is in `{cr-agents, lsei}` and every `direction` is in
   `{initial, ours, upstream}`; and every `ref` resolves in that copy's object store.
4. Every row of the two verdict tables at §6, of the primitive table at §5, and of the report table at
   §9 carries a non-empty value in every column. **No cell is a dash** — the rule I took from finding
   (c) at 1.5 and applied to my own deliverable.
5. `11 [Q-CURRENCY-VERDICTS]` equals the parsed row count of the two verdict tables.

### 5.1 Result

```
lines: 398
first: <!-- BEGIN oracle/currency_policy.md -->
last:  <!-- END oracle/currency_policy.md -->
quantity blocks inside the markers: 0
VERIFIED.tsv:  declared rows=5   parsed data rows=5   wrong arity=0   empty fields=0
               copy in set 5/5    direction in set 5/5    refs resolve 5/5
verdict rows:  CURRENCY 5   CHECKOUT 6   total 11
primitive rows: 4       report consequence rows: 8
CHK-25, CHK-26: 9 tab-separated fields each
dash check: (no output)
```

Three of the five were worth running rather than eyeballing.

**Post-condition 3.** The seeded record's five refs were resolved against the two real working copies
this session — `git -C <copy> cat-file -e <ref>^{commit}`, five for five — so the record this policy
ships with is not a plausible-looking table. It is this project's actual bump history, and `git
cat-file` says so. The materialised file was also run through `Q-VERIFIED-ROWS`'s own operation,
`grep -vc '^#\|^copy\b'`, which returns `5` and agrees with the `# rows=` header.

**Post-condition 2** is the finding at §3.2 turned into a check on my own deliverable rather than a
lesson noted about somebody else's, and it is the reason the four blocks are in §4 and not in §2.

**Post-condition 4** is finding (c) from 1.5 carried forward: every cell of every table inside the
liftable block carries a value, so no row states a rule without stating what it produces.

---

*The Systems Engineer, sub-step 1.6.*
