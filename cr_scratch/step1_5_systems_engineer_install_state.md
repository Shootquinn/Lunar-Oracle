# Step 1.5, The Systems Engineer: the install state record

**Persona:** The Systems Engineer
**Sub-step:** 1.5 (origin ARCH-3), Group 2, depends on 1.4 (ARCH-2)
**Deliverable:** the block in §2, liftable verbatim to `oracle/install_state.md`
**Reasoning:** §1 (the membership rule and the six items that post-date my charge), §3 (findings, and
the amendments owed against 1.4)
**State at time of writing:** repository root 55 characters; `cr-agents` `f0c976b`; `lsei` `7f97983`;
`oracle/`, `literature/`, `findings/` and `tools/githooks/` do not exist. Every empirical claim below
was run on this machine today and the command is given.

Extraction is verified at §4.

---

## 1. Reasoning

### 1.1 One rule, three clauses, and the sentence the whole record hangs from

Falsifier 2 says three needs will produce three mechanisms. The defence at 1.4 was a count — four
facts, one file, no fifth. A count is not a design. A count tells you how many fields there are today
and says nothing about the next field, and the next field is where the falsifier actually fires:
nobody proposes a second file, somebody proposes a harmless-looking key and the record becomes the
place where facts go when nothing else will take them.

So the record needs an admission rule that can refuse a field, and the rule has to be applicable by
someone who is not me. Here it is, and §2 §2 states it as the deliverable's own text.

> **M1. An observation, not a derivation.** A derived value stored beside its inputs stores the
> derivation rule as well as the value, and the rule then has two homes and drifts between them.
> **M2. About this install** — not about the project, and not about where the install sits. A fact
> that must survive a clone is content (loose end E12). A fact about the record's own location cannot
> be recorded by a file that lives at that location.
> **M3. At least one named reader** that cannot get the value another way at the moment it needs it.

The keystone, and the sentence I would keep if I could keep only one:

> **`.oracle-state.json` is safe to delete.**

Every field except `first_run` is re-observed by the next run of the bootstrap. `first_run`'s loss
replays an opening sequence, which costs a minute. That property is not a convenience — it is what
stops the record from becoming an authority. A state file that cannot be deleted is a second
authority, and this project's whole posture is that a second authority drifts. The design constraint
falls straight out of it: **no field may be admitted that cannot be re-observed, unless losing it is
cheap.** That single test refuses the merge-time provenance digest, which is exactly the field my
charge told me to put here. See §1.2.

### 1.2 The four facts, re-derived rather than inherited

The count is unchanged and two of the four have changed their **subject**. I would rather state that
plainly than let an unchanged count carry a claim it does not support.

| # | Fact | Subject |
|---|---|---|
| 1 | Working-copy currency | the refs **this install last observed**, per copy |
| 2 | Corpus observation | the upstream-corpus digest **this install last observed** |
| 3 | Source-PDF presence | whether `literature/_pdf` held a file when the bootstrap last ran |
| 4 | First run | when the sequence was last attempted, and whether it completed |

Facts 1 and 2 were both written down at 0.3 as *the value the check compares against*. Both are now
*the value this install last saw*, and the value compared against is content. That is loose end E12
applied twice. E12 was raised against fact 1 by me at 0.5, filed against this sub-step, and left
OPEN. **It applies to fact 2 by exactly the same argument and nobody had noticed**, so I am closing
both here rather than closing one and inheriting the other.

The argument, once, since it is one argument:

*A fresh clone must be able to detect divergence.* If the digest the divergence check compares against
lives in a gitignored per-install file, a fresh clone has nothing to compare against and the check
reports agreement — the same failure shape as a divergence check pointed at an empty directory, which
is the Software Engineer's F5 on `lsei/literature`, and its failure mode is a **positive** result. The
merge-time digest is a property of the merge, the merge is committed, and therefore the digest is
content and belongs in The Engineer's provenance format. Identically for the ref: what the project
verified against survives a clone; what this install last looked at does not.

**This adds no store.** The provenance format already exists and is The Engineer's (1.7 / 2.5). The
tracked ref record already exists as an object in 1.4 §1 and this sub-step was told to name it; it is
`oracle/VERIFIED.tsv` and §2 §9 gives it. Neither is a second home for a fact this record holds,
because after the correction this record does not hold those facts — it holds this install's
observations of them, which is a different subject with a different writer and a different lifetime.

**What earns facts 1 and 2 their keep after the correction**, since it is fair to ask whether anything
is left. One word: **new**. The absolute report line — "upstream is ahead of the verified-against
ref" — is computable live and needs no record. The incremental line — "and it moved since this install
last looked, on 2026-08-24" — is constructible only from the record. That window is not cosmetic in
this project: 1.4 §7 establishes that `origin/main` ahead of the verified-against ref **and** reachable
from local `HEAD` means the push-disable was defeated between sessions. When that fires, *which
sessions* is the first question anybody asks, and the record is the only thing that can answer it.

Note what the correction bought in containment, because it is the reason these two fields are safe to
hold at all. **A wrong currency field cannot produce a wrong drift verdict, and a wrong corpus field
cannot hide a divergence.** Both verdicts are computed live against content. The record can only make
the adjective wrong — "new" for a standing condition, or "standing" for a new one. Before the
correction, a corrupt state file could suppress a divergence outright.

### 1.3 Holding the line: the four rejections of 1.4, retested, and two new candidates

I was asked to hold the line and to say plainly if I now think one of the four rejections was wrong.
**None of them was wrong.** They are retested against M1–M3 rather than against the ad-hoc reason each
was given at 1.4, and the retest is the useful part: three of the four now fail on a *different* clause
than the one I originally argued, which means the original arguments were right more by luck than I
would like.

| Candidate | 1.4's reason | Fails | Now |
|---|---|---|---|
| Measured root length | "goes stale when the directory is renamed" | **M2** | The old reason was weak — every field goes stale, which is why every field is rewritten each run. The real reason is that a file cannot record where it is. Rejected, better. |
| `core.hooksPath` installed | "asserted every session, as push-disable is" | **M3** | Its reader is git, and git reads `.git/config`, never this file. A field would be a copy with no reader. Rejected; see §1.4. |
| Available-origin set | "a copy of the filesystem drifts" | **M1** | It is derived from four assertions. Storing it stores the derivation. Same verdict, sharper clause. |
| Observed upstream ref | "a field inside the currency fact, not a fifth fact" | — | Admitted, as ruled. It is `copies.<name>.upstream`. |

Two candidates arrived after 1.4 and both are refused:

- **Hooks-path installation state**, raised by (a). Refused on M3; §1.4.
- **Whether the corpus's machine-readable inputs were present at bootstrap**, raised by (e). Refused
  on M1 and M3; §1.6.

**The weakest of the four kept fields is `pdfs_present`, and I am not going to pretend otherwise.** It
is the one field a live probe could answer at the moment its reader needs it, so M3 is satisfied only
in a weaker form: *the answering loop must not carry a filesystem probe, because a probe in the loop is
how the loop acquires a second definition of the install's shape.* That is a real argument and it is
also the argument somebody will use for the fifth field. So it ships with a deletion criterion, in the
deliverable: **if the answering loop is ever found probing the filesystem for any other fact about
install shape, this field failed to prevent the thing it exists to prevent, and it is deleted along
with that probe.** I would rather it be deleted on evidence than kept on symmetry.

### 1.4 (a) BC-8 is inert. The assertion is wrong; the record is not the fix

I reproduced the probe I was handed and then went one rung further than it.

```
$ git init -q .; git config core.hooksPath tools/githooks   # tools/ does not exist
$ git commit -q -m t && echo "commit SUCCEEDED, no hook fired"
commit SUCCEEDED, no hook fired
$ mkdir -p tools/githooks                                   # directory now exists, EMPTY
$ test -d tools/githooks && echo PASS
PASS
$ git commit -q -m t && echo "commit SUCCEEDED, no hook fired"
commit SUCCEEDED, no hook fired
```

**So `test -d` is not the fix either.** The ladder has one more rung than the finding states: the
config value proves nothing, and the directory proves nothing. What git reads is a *file named for the
event*, and that is where the assertion has to land. Two further measurements, because both surprised
me:

```
$ printf '#!/bin/sh\necho "HOOK FIRED" >&2\nexit 1\n' > tools/githooks/pre-commit
$ git commit -m t; echo "exit=$?"
HOOK FIRED
exit=1                                    # fires without chmod +x on git-for-Windows

$ printf 'echo NOSHEBANG >&2\nexit 1\n' > tools/githooks/pre-commit    # no shebang
$ git commit -m t; echo "exit=$?"
error: cannot spawn tools/githooks/pre-commit: No such file or directory
exit=1                                    # a malformed hook FAILS CLOSED
```

Two things worth carrying. **The POSIX execute bit is not the gate on this platform** — asserting it
would be a Unix habit asserting nothing here, which is the same class of error as asserting the config
value. And **a malformed hook blocks the commit rather than passing it**, which is the one piece of
good news: a broken hook fails loudly. A *missing* one fails silently, and that is the case BC-8 must
now catch.

**Ruling: hooks-path installation does not become a fact in this record.** It fails M3 — its reader is
git, git reads `.git/config` and `tools/githooks/`, and git will never read `.oracle-state.json`. A
field would be a copy whose only consumer is a report line about the field, and a stored
`hooks_installed: true` written last Tuesday, read by a session in which somebody has since deleted
`tools/`, is a lie with a timestamp on it. The push-disable precedent that (a) invokes cuts the other
way: BC-6 is asserted every session **precisely because** a recorded fact never reaches an install
that already existed. Recording hooks-path installation is the acquire-time fix I rejected for push,
wearing a different hat.

**BC-8 is amended instead, and the amendment is owed against 1.4** (§3.1). New text, at the granularity
git reads it: for each event the check register names, `tools/githooks/<event>` exists, is non-empty,
begins with a `#!` shebang, and contains the marker naming the register row it implements. That is my
own marker rule applied to configuration — which is the Software Engineer's F6 generalisation, and he
is right that I stopped one step short. His statement of the rule is better than mine and I adopt it:
**assert the thing the consumer reads, at the granularity the consumer reads it.**

### 1.5 (b) The four blocking findings, and what each leaves the record able to hold

The framing in my charge — "a record cannot store a mode that cannot be assigned" — has a shorter
answer than it expects. **The record stores no mode.** A mode set is derived from assertions, so M1
refuses it; it is consumed inside the run that computes it, so M3 refuses it too. F2 and F3 therefore
do not reach the schema at all. That is the correct outcome and not a dodge: it means both findings can
be settled on their merits at 1.4 with no risk of a schema change chasing them.

They still need settling, and three of the four are mine to settle.

**F1, `ABORT` defined twice.** Accepted, with the reviewer's preferred fix and his §4.2 refinement.
`ABORT` means *the bootstrap stopped before Phase 6*, and the outcome line carries its cause:
`ABORT (<phase>, <assertion-id>)`. §2's second sentence — "performed no acquisition and assigned no
degraded modes" — is deleted, because it is a promise the outcome cannot keep and, worse, one a test
can be written against.

The consequence for this record is a clean single-writer statement worth having: **the record is
written only by a run that reaches Phase 5 and does not refuse there.** A run that aborts in Phases 1
through 3 never reaches the writer; a run that refuses a future schema at Phase 5 writes nothing by
construction. So the record can never hold the residue of an aborted run, and 6.1 can assert exactly
that — abort at Phase 2 and `written_at` is unchanged.

**F2, `usable` undefined.** Mine to rule, and the only one of the four that changes what the system
does this month. **Ruled: a working copy is `usable` when it is present and in neither `offline` nor
`present-but-wrong`.** `dirty-or-diverged` and `moved-on` count as usable, so the author editing
`lsei/` in another window does not block the first-run sequence.

The apparent contradiction the review names is not one, and the distinction is worth stating because it
will recur. My §5 closing sentence — "a working copy under `dirty-or-diverged` is no longer the
upstream authority; it is a local variant" — governs **what an answer must say**, not **whether an
answer can be produced**. It is a trace obligation, not a refusal. The blocking set exists to answer
one question: *is there a class of question the system advertises and cannot answer?* Against a dirty
working copy the system can answer, and the answer names a local variant. Two mechanisms, one
condition, no conflict.

**F3, `missing-recoverable` unassignable.** Accepted, disposition 1: **demoted out of the mode table
into Phase 3's prose as a transient.** The reviewer is right that the inherited imprecision stopped
being free at the moment I minted a count over it, and right about which of his two dispositions is the
honest one. A set with an uninhabitable member is a set whose enumeration cannot be asserted.
`Q-DEGRADED-MODES` becomes 5 and `Q-BLOCKING-MODES` becomes 3 of 5, with a partition that covers its
population. Both corrections are owed against 1.4 as one edit; §3.1 states them and §3.2 states why I
have deliberately **not** written the corrected blocks into this file.

**F4, Node absent yields `CLEAN`.** Accepted: wire BC-4 into §6's origin table, `app` available when
BC-14 **and** BC-4 pass. **No consequence for this record**, and the reviewer pre-agreed the reasoning
in his own handoff — Node availability is a session capability, not an install fact; computed at
Preflight, reported, not stored. It fails M1 and M2 both.

One interaction the review left half-resolved, which I am closing because it lands on the same
assertion. F4 recommends measuring the root length in the shell to remove BC-5's dependency on Node;
F10 recommends `fs.realpathSync.native()` to enforce the long-name clause, which puts the dependency
straight back. **Resolution: measure in the shell, and move the long-name clause off BC-5 entirely.**
It becomes a property of how `$ROOT` is bound in Phase 1 — an upward search from `pwd`, and `pwd` is
already long-name normalised on this platform, which the reviewer measured. The clause moves to where
the value is produced instead of where it is measured, and BC-5 goes back to being one string length
with no dependencies. That is a better home for it than either proposal.

### 1.6 (e) Instance six: BC-20 yes, field no

`literature/FIELDS.tsv` and `literature/INDEX.tsv` are excluded from every fresh clone by a
deny-by-default rule admitting `*.md` only; the `.md` count passes, origin `literature` reports
available, the outcome is `CLEAN`, and retrieval then runs field-scoped IDF against no field map.

**The field is refused and BC-20 is accepted.** The reasoning is short and it is the whole point of
this sub-step. The defect in (e) is that **no assertion exists**. Recording "the data files were
present at bootstrap" would give a fact that already has a mechanism — an assertion, gating an origin,
computed and reported every session — a *second* mechanism, because the first one was written late.
**That is falsifier 2 firing a second time inside the file built to answer it**, and in exactly the
shape the falsifier predicted: not a second file, a harmless-looking key.

It fails the rule on its own terms too: origin availability is derived (M1), and its reader is the
refusal rule in the same run that computes it (M3).

One thing (e) invites that I checked and rejected: whether fact 2's population should widen to cover
these files. It should not. Divergence compares **upstream** `lsei/literature/` against **our**
provenance. `FIELDS.tsv` and `INDEX.tsv` are ours and not upstream's, so widening the digest would put
two different questions under one hash and make a change in either indistinguishable from a change in
the other.

The `.gitignore` half is the orchestrator's and is three lines. **It does not close (e)**, for the
reason the reviewer gives: a file can be admitted by `.gitignore` and still be absent, truncated or
empty on the disk in front of you.

### 1.7 (f) Four contract versions, and why the record carries exactly one

This system now carries four monotone-integer contract versions, in four files, read by four disjoint
sets of readers.

| Version | Lives in | Its three readers |
|---|---|---|
| The answer contract, at **2** | `oracle/answer_contract.md` | the file; every run-log row; the loop acceptance suite |
| The bootstrap contract, at **1** | `oracle/bootstrap_contract.md` | the file; `CLAUDE.md`; the bootstrap acceptance suite |
| The counting rule, at **1** | `oracle/COUNTING_RULE.md` | the file; `tools/quantities.js`; the index it generates |
| The state schema, at **1** | this record's own `schema` field | every reader, before any other field; the bootstrap contract; the schema validator |

**They are independent, and the record carries only its own.** The argument is the one the answer
contract makes for itself at its §1.5 and it generalises exactly. A version field earns its place by
firing when something specific changed. Couple them, and an edit to the answer contract's fixed texts
bumps the version stamped in every install's state file: the field fires on a change no reader of it
cares about, and a detector that fires on everything is noise. Coupling also imposes an absurdity —
that editing a sentence in a prose contract invalidates a JSON file on somebody's disk.

**The one real coupling, stated so it is not discovered later.** The state schema and the bootstrap
contract are adjacent, because Phase 5 of the bootstrap is this record's only writer. The coupling is
**one-directional**: the bootstrap contract names the schema version it writes; the record does not
name the contract version that wrote it. A `contract` field was drafted and cut, on M3 — nothing would
act on it, and the schema version already answers the only question a reader has, which is *can I parse
and trust this file*.

**What would falsify the independence claim:** any change to one of the four that *requires* a change
to another. I could not construct one.

### 1.8 (c) and (d), the two mechanical findings, applied to myself

**(c) The em-dash pattern.** I verified it rather than repeating it:

```
$ grep -n '^| BC-' cr_scratch/step1_4_systems_engineer_bootstrap_contract.md \
  | awk -F'|' '{n=$2;f=$5; gsub(/^ +| +$/,"",n); gsub(/^ +| +$/,"",f); if (f=="—") print n}'
BC-2   BC-4   BC-13   BC-16   BC-19        # 5 of 19, exactly the container and capability probes
```

The correlation is total, and it means the falsifier column is a working defect detector nobody was
reading as one. **A dash in a falsifier column is a container check announcing itself.** The rule I
have taken from it, and applied to this deliverable: **every field in §2 §5 states what happens when it
is wrong, and no cell in that column is a dash.** §4 checks it mechanically rather than by eye, in the
same spirit as 1.4's phase-heading count.

**(d) The reclassified assertion.** BC-19 becomes a fact rather than an assertion, and my charge says
that makes it a candidate field here. **It is already fact 3 and the reclassification adds nothing.**
That is worth saying precisely rather than as good news: BC-19 and fact 3 were **one object appearing
twice under two types** — a probe in the assertion table and a fact in §1 — and F13 collapses them. The
record gains no field. It gains a stated relationship: **BC-19 is the probe that produces fact 3; the
fact is the field; there is one object.**

I will note the shape, since this file is about exactly this shape. An assertion that cannot fail, plus
a field that stores its result, is the beginning of the duplication falsifier 2 describes, arrived at
from the harmless end. Nobody proposed a second mechanism. One object simply got written down twice by
two conventions, and it took an outside reader running the table to see it.

---

## 2. The deliverable

Everything between the markers is liftable verbatim to `oracle/install_state.md`.

<!-- BEGIN install_state.md -->

# The install state record

**Schema version: 1.**

This file specifies `/.oracle-state.json`: what it holds, who writes each field, who reads it, what
happens when it is wrong, and how the record is read when it is absent, corrupt, or newer than this
schema.

`oracle/bootstrap_contract.md` §3 Phase 5 is the only writer. Where that file and this one disagree
about **when** the record is written, the bootstrap contract is the statement. Where they disagree
about **what is in it**, this file is the statement.

Every term below is closed. A value outside a closed set is a failure, not a variant.

## 1. The keystone

**This file is safe to delete.**

Every field except `first_run` is re-observed by the next run of the bootstrap. `first_run`'s loss
replays an opening sequence. Nothing else is lost, and nothing anywhere depends on this file having
existed.

That is a design constraint and not a convenience. A state file that cannot be deleted is a second
authority, and a second authority drifts away from the first while continuing to answer questions.
**No field may be admitted to this record that cannot be re-observed, unless losing it is cheap.**

## 2. What is in the record, and what is not

A fact is a field of this record when all three clauses hold.

| | Clause | What it refuses |
|---|---|---|
| **M1** | It is an **observation**, not a derivation. | Mode sets, blocking-set membership, the available-origin set, the terminal outcome. A derived value stored beside its inputs stores the derivation rule as well, and the rule then has two homes. |
| **M2** | It is about **this install** — not about the project, and not about where the install sits. | The verified-against refs and the merge-time provenance digest, which must survive a clone and are therefore content. The measured root length, which a file cannot record about its own location and stay true across a rename. |
| **M3** | It has a **named reader** that cannot get the value another way at the moment it needs it. | Whether `core.hooksPath` is installed: its reader is git, and git reads `.git/config` and a directory of hooks, never this file. Node availability: its reader is the run that measured it. |

**The rule that keeps M2 honest, restated from the directory map:** anything that must survive a clone
is not state, it is content, and it belongs in the corpus, in `oracle/`, or in the gameplan.

**The subject test, which is how M2 is applied in practice.** For every candidate, ask *whose fact is
this*. "The ref the project verified against" is the project's, and it is content. "The ref this
install last saw" is this install's, and it is here. The two are not derivable from each other and
neither is a copy of the other.

## 3. The schema

One JSON object. UTF-8, no BOM, LF endings, two-space indent, trailing newline.
`19 [Q-STATE-KEYS]` JSON paths, containers and leaves alike, and **no others**: an unknown key at a
known schema version is a corrupt read (§6.3), reported as evidence that a second writer exists.

```
{
  "schema": <integer >= 1>,
  "written_at": <ISO 8601 UTC, "YYYY-MM-DDTHH:MM:SSZ">,
  "copies": {
    "cr-agents": <copy | null>,
    "lsei":      <copy | null>
  },
  "corpus": <corpus | null>,
  "pdfs_present": <boolean>,
  "first_run": {
    "attempted_at": <ISO 8601 UTC | null>,
    "completed": <boolean>
  }
}

copy   = { "head": <short ref>, "upstream": <short ref>, "observed_at": <ISO 8601 UTC> }
corpus = { "digest": "<algo>:<hex>", "at_ref": <short ref>, "observed_at": <ISO 8601 UTC> }
```

**The two nullable objects are written whole or not at all.** If a copy's `HEAD` and `origin/main`
cannot both be read this run, that copy's object is left at its previous value, or is `null` when there
is no previous value. A mixed pair — this run's `HEAD` beside last run's `upstream` — describes no
moment, and the drift window computed from it would be a fiction. The same rule governs `corpus`.

`digest` carries its algorithm as a prefix so that a comparison against a differently-computed value
fails loudly instead of matching nothing quietly. Changing the algorithm is a schema version bump.

**A valid instance**, which a test constructs verbatim:

```
{
  "schema": 1,
  "written_at": "2026-08-27T09:14:03Z",
  "copies": {
    "cr-agents": { "head": "f0c976b", "upstream": "f0c976b", "observed_at": "2026-08-27T09:14:03Z" },
    "lsei": { "head": "7f97983", "upstream": "7f97983", "observed_at": "2026-08-27T09:14:03Z" }
  },
  "corpus": { "digest": "sha256:3f1c", "at_ref": "7f97983", "observed_at": "2026-08-27T09:14:03Z" },
  "pdfs_present": false,
  "first_run": { "attempted_at": null, "completed": false }
}
```

**A corrupt instance:** `{"schema":1,"written_at":"2026-08-27T09:14:03Z","copies":{"cr-agents"` —
truncated mid-write. Six further corrupt instances are enumerated at §6.3 with the rule each violates;
a validator that accepts any of the seven is wrong.

**A future-version instance:** the valid instance above with `"schema": 2`.

## 4. Validity

A read is valid when all six hold. Anything else is a corrupt read (§6.3).

1. The bytes parse as JSON.
2. The parsed value is an object: `typeof v === "object" && v !== null && !Array.isArray(v)`.
   **All three conjuncts are required.** `JSON.parse("null")` returns `null` and `typeof null` is
   `"object"`; `JSON.parse("[]")` returns an array and `typeof []` is `"object"`. Both were run.
3. `schema` is present and is an integer greater than zero. A string `"1"`, a float `1.5` and a zero
   are each corrupt.
4. Every path the schema requires at this version is present, with a value of the declared type or the
   declared `null`.
5. No path outside the `19 [Q-STATE-KEYS]` is present.
6. Every non-null timestamp matches `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$`.

Rule 5 is doing unusual work and it is deliberate. **An unknown key at a known schema version means
something other than the bootstrap wrote this file.** The record is the single-writer property's own
detector, and it reports that finding in those words rather than ignoring the key.

## 5. Every field: who writes it, who reads it, what happens when it is wrong

No cell in the last column is a dash. A field whose wrongness costs nothing has no reason to be here.

| Field | Written by | Read by | Wrong ⇒ |
|---|---|---|---|
| `schema` | Phase 5 | **every reader, before any other field** | Too high: the record is refused and nothing is written (§6.4). Too low: migrated (§6.5). Absent or not a positive integer: corrupt (§6.3). The only field whose wrongness is unrecoverable by inspection, which is why it is read first and alone. |
| `written_at` | Phase 5 | the bootstrap report; the idempotence assertion at 6.1 | The report names a wrong time. No mechanism branches on it. It is here because idempotence is defined as *no field changes except the timestamp*, and that definition needs a field permitted to change. |
| `copies.<name>.head` | Phase 5 | the next run's Phase 5 | The incremental drift line names a wrong window. **The drift verdict is unaffected**, because it is computed live against `oracle/VERIFIED.tsv`. |
| `copies.<name>.upstream` | Phase 5 | the next run's Phase 5 | A move is reported as new when it is standing, or standing when it is new. Same containment: the verdict is live and only the adjective comes from here. This is the field that dates a defeated push-disable. |
| `copies.<name>.observed_at` | Phase 5 | the next run's Phase 5 | The window is named wrongly. Absent while its two sibling fields are present, the copy object is malformed and the read is corrupt (§4 rule 4). |
| `corpus.digest` | Phase 5 | `oracle/verify_corpus.js` (2.17) | A standing divergence is called new, or a new one standing. **A divergence is never missed**, because the comparison is against the provenance content and not against this field. |
| `corpus.at_ref` | Phase 5 | `oracle/verify_corpus.js` (2.17) | The divergence report names the wrong upstream ref for the observation. Detectable: it is compared against `copies.lsei.head` for the same run, and a mismatch is a report line. |
| `corpus.observed_at` | Phase 5 | `oracle/verify_corpus.js` (2.17) | As `copies.<name>.observed_at`. |
| `pdfs_present` | Phase 5, from the `literature/_pdf` probe | the answering loop | Wrongly `true`: the loop offers a source that is not there, the offer fails, and the failure is a report line rather than a refusal — **loud**. Wrongly `false`: the loop declines to read a PDF sitting on disk — **silent, and the worse direction**. The asymmetry is stated so that whoever implements the probe knows which way to fail. |
| `first_run.attempted_at` | Phase 7, **before** the sequence plays | the next run's Phase 7 | With `completed` false, a wrong value dates a half-played sequence wrongly. Nothing gates on it; the gate is `completed`. |
| `first_run.completed` | Phase 7, **after** the sequence plays to completion | the next run's Phase 7 | Wrongly `true`: **the sequence never plays, silently, forever.** The worst wrongness this record can hold, and its remedy is §1 — delete the file. Wrongly `false`: the sequence replays once. |

**Phase 7 writes this record twice, and it must.** `attempted_at` is written before the sequence and
`completed` after it, and the two writes are what make a half-played sequence distinguishable from an
unplayed one. Three states, two fields: `{null, false}` unplayed, `{ts, false}` interrupted,
`{ts, true}` done. A single write cannot express the middle state, and the middle state is the normal
outcome of a session somebody interrupted.

An interrupted sequence replays, so `attempted_at` means *when the last attempt began*, never *when the
sequence played*.

## 6. Reading the record

Read once, at Phase 5, in the order below. The three abnormal reads are §6.2, §6.3 and §6.4.

### 6.1 Order

1. Open the file. Absent ⇒ §6.2.
2. Parse and validate per §4. Invalid ⇒ §6.3.
3. `schema` greater than this schema version ⇒ §6.4. **Read no other field first.**
4. `schema` less than this schema version ⇒ §6.5.
5. Otherwise the read is ordinary.

### 6.2 Absent — treat as first install

No file, no error, no report line beyond `first install`. The record is **not created at read time**;
Phase 5 creates it when it writes. `first_run` is `{null, false}` and the sequence plays if the mode
set permits it.

**Falsified by:** a run that reports `first install` and finds a record; a run that creates the file
during the read and then reports the install as first.

### 6.3 Corrupt — report, rewrite, never crash

**Corrupt is any failure of §4.** Seven instances, each of which a validator must reject:

| # | Instance | Failing rule |
|---|---|---|
| 1 | truncated mid-write | 1 |
| 2 | empty file | 1 |
| 3 | `null` | 2 — `typeof null === "object"` |
| 4 | `[]` | 2 — `typeof [] === "object"` |
| 5 | `{}` | 3 — no `schema` |
| 6 | `{"schema":"1", ...}` | 3 — string, not integer |
| 7 | a valid instance plus `"hooks_installed": true` | 5 — unknown key at a known version |

Instances 3 and 4 are listed because they are the two a naive `typeof` check admits. Instance 7 is
listed because it is the one a permissive parser admits, and because it is the shape this record exists
to detect.

**Action.** Report; rewrite from this session's observations; never end the session. The report carries
the first 200 bytes of the file verbatim, and for instance 7 it names the unknown key and says in those
words that a second writer exists.

**No quarantine copy is written.** A `.oracle-state.json.corrupt` beside the record would be a file
nothing reads — M3 — and §8 of the bootstrap contract says the bootstrap writes exactly one file. The
evidence goes to the reader in the same session, where it can be acted on, rather than to the disk
where it accumulates.

**The accepted cost, stated rather than discovered:** a rewrite loses `first_run.completed` and the
opening sequence replays. That is the right trade. Replaying an opening sequence costs a minute;
suppressing it wrongly is the failure that made this file gitignored in the first place.

**Falsified by:** a corrupt record that ends the session; a corrupt record rewritten with no report; a
rewrite that preserves `first_run.completed` out of a file that failed validation.

### 6.4 Written by a future schema version — report and refuse

`schema` greater than this schema version. **Refuse.**

- Write nothing. Not the record, not a backup, not a temporary file.
- **Read no other field.** A future schema may reuse a name this schema knows, with a different
  meaning. Reading `first_run.completed` out of a version we do not understand is not caution, it is a
  guess. This clause is what distinguishes refusing from declining to write.
- Terminal outcome `ABORT (Phase 5, ST-3)`. Phases 6 and 7 do not run.
- The report names the file's `schema`, this schema version, and the remedy in one sentence: a newer
  Oracle wrote this record, and either that Oracle runs here or the file is deleted.

The reason to refuse rather than overwrite is that overwriting destroys what the newer Oracle knew, and
the one field in this record that cannot be re-observed is the field a newer Oracle is most likely to
have set.

**Falsified by:** a future-version read that writes any byte; a future-version read that reports a
field value out of the file; a future-version read that reaches Phase 6.

### 6.5 Written by an older schema version — migrate; not abnormal

Named here because it is the read that will actually happen, and because leaving it unspecified is how
it becomes a fourth abnormal read by accident.

Read what is present. Fill every missing field from this session's observations. Write at the current
schema version. **`first_run` is the one field that cannot be re-observed: carry it forward when
present, and treat it as `{null, false}` when it is not.** A record from an older schema that does not
carry the flag has never played a sequence, because the flag has existed since schema 1.

**Falsified by:** a migration that reports `first install` against a record carrying
`first_run.completed: true`.

## 7. Writing the record

Phase 5 writes once. Phase 7 writes twice more, per §5.

**Write to `.oracle-state.json.tmp` in the repository root, then rename over the target.** Verified on
this platform: `fs.renameSync` replaces an existing file and leaves no temporary behind. The temporary
is not a store — nothing reads it and it exists for the duration of one rename — and it is what keeps
an interrupted session from turning a normal Ctrl-C into a corrupt read. That matters because Phase 7
writes twice during the one sequence a person is most likely to interrupt.

An orphaned `.oracle-state.json.tmp` found at read time is **reported and deleted.** It is evidence
that a previous session died mid-write, which is worth one line, and it is evidence of nothing else.

## 8. What this record never holds

Closed, because each item is a thing somebody will propose as a convenience.

1. **Never a derived value.** No mode set, no blocking-set membership, no available-origin set, no
   terminal outcome. These are computed every session from live assertions, and reported.
2. **Never a fact that must survive a clone.** The verified-against refs are `oracle/VERIFIED.tsv`
   (§9). The merge-time provenance digest is the corpus's provenance. Both are content, both committed.
3. **Never a fact about where the install sits.** No absolute paths, no measured root length.
4. **Never a fact whose reader reads it somewhere else.** `core.hooksPath` installation state is not
   here, because git reads `.git/config` and a directory of hooks and will never read this file.
5. **Never a cache of an assertion's result.** Every assertion in the bootstrap contract runs every
   session. A stored pass is the acquire-time fix that never reaches an install which already existed.
6. **Never a field with no reader.** A field whose only consumer is a report line describing the field
   is deleted.
7. **Never a second copy of any field in this record**, in any file, under any name.

## 9. The tracked ref record

Sub-step 1.4 §1 names a tracked ref record and leaves it to be named here. It is
**`oracle/VERIFIED.tsv`**: content, committed, hand-edited, read by `BC-11` and by nothing that writes.

```
# copies=2
copy	ref	bumped_at
cr-agents	f0c976b	2026-08-27
lsei	7f97983	2026-08-27
```

Tab-separated. One header comment declaring its own size, one column-header line, one row per working
copy. The size declaration is there so that a row lost to a bad splice is detectable by counting.

**Bumping it is a human act. No phase of the bootstrap writes it.**

**Why this is not a second store, since it looks like one.** The two records have different subjects,
different writers and different lifetimes. `oracle/VERIFIED.tsv` says *what the project verified
against*: it survives a clone and it changes when a person decides it does. `.oracle-state.json`
`copies` says *what this install last saw*: it does not survive a clone and it changes every session.
Neither is derivable from the other, and a fresh clone that has never run the bootstrap has the first
and not the second — which is the case that proves they are two facts rather than one fact in two
places.

**Not folded into `oracle/REGISTER.tsv`.** Different subject, different owner, different check, and a
sidecar holding two unrelated kinds of row is a file that two mechanisms both have to parse past.

## 10. The four consumers

`4 [Q-STATE-CONSUMERS]`, closed. A component not on this list does not read this file.

| Consumer | Reads | On a bad read |
|---|---|---|
| The bootstrap, Phases 5 and 7 | all fields | §6. It is also the writer; every field it reads was written by an **earlier run**, never by this one. |
| `oracle/verify_corpus.js` (2.17) | `corpus` | Reports the divergence without the new-or-standing adjective. **It does not refuse:** the divergence itself comes from the provenance content and is computable without this file. |
| The first-run sequence (6.6) | `first_run` | Absent or unreadable ⇒ the sequence plays. Erring toward playing is the cheap direction. |
| The answering loop (Step 3) | `pdfs_present` | Treats it as `false` and says so in its report line, rather than probing the filesystem. A probe here is the second definition of install shape that this field exists to prevent. |

**Not consumers, and named so that the list stays closed.** The bootstrap acceptance suite (6.1)
asserts *on* this record and consumes none of its facts; it is a test of the record, not a reader of
the install. The `.gitignore` rule names the path and reads no field.

**`pdfs_present` ships with a deletion criterion.** It is the only field a live probe could answer at
the moment its reader needs it, and its justification is that the answering loop must not carry
filesystem probes. **If the loop is ever found probing the filesystem for any other fact about install
shape, this field failed to prevent what it exists to prevent, and it is deleted along with that
probe.**

## 11. Quantities

```quantity
id:            Q-STATE-FACTS
class:         fixed
value:         4
unit:          facts about this install held in /.oracle-state.json, as listed at §5 of this file
population:    the candidate facts considered for admission to this record: the four admitted
               (working-copy currency, corpus observation, source-PDF presence, first run), the
               four rejected at sub-step 1.4 (measured root length, core.hooksPath installation,
               the available-origin set, the observed upstream ref), and the two raised after 1.4
               (hooks-path installation state, corpus data-file presence at bootstrap)
operation:     manual: The Systems Engineer at sub-step 1.5; classified each candidate against the
               three membership clauses M1, M2 and M3 at §2 of this file, recording which clause
               refuses each rejection; 10 items inspected
conditions:    none. The value is a ruling of this file rather than a measurement of an
               environment. schema is not a fact about the install and is not counted: it is the
               field by which the record describes itself.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     /.oracle-state.json holds 4 facts about this install and no others; a fact outside
               the set is a failure of this contract, not a fifth field.
derived-from:  none
sampled:       10 inspected by hand, 0 found wrong, by The Systems Engineer at sub-step 1.5. The
               population is small enough that the sample is the population. The observed upstream
               ref was inspected twice, as a candidate fact and again as a field inside an
               admitted fact, and is counted once.
superseded:    none
```

```quantity
id:            Q-STATE-ABNORMAL-READS
class:         fixed
value:         3
unit:          abnormal reads of /.oracle-state.json specified at §6 of this file
population:    the read cases enumerated at §6 of this file: absent, corrupt, written by a future
               schema version, written by an older schema version, and ordinary
operation:     manual: The Systems Engineer at sub-step 1.5; enumerated the read cases at §6 and
               classified each as abnormal or ordinary against the test "does this read require
               behaviour the ordinary read does not specify"; 5 items inspected
conditions:    none. An older schema version is a specified read and not an abnormal one: it
               requires migration, it cannot end the session, and it is the read that will happen
               most often. It is specified at §6.5 so that it does not become a fourth abnormal
               read by accident.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the record has 3 abnormal reads — absent, corrupt, and written by a future schema
               version — of which exactly 1, the future schema version, terminates the bootstrap.
derived-from:  none
sampled:       5 inspected by hand, 0 found wrong, by The Systems Engineer at sub-step 1.5. Every
               read case at §6 was read individually rather than counted from the headings.
superseded:    none
```

```quantity
id:            Q-STATE-CONSUMERS
class:         fixed
value:         4
unit:          components that read at least one field of /.oracle-state.json, as listed at §10
population:    the components named anywhere in the integrated plan as reading install state: the
               bootstrap (Phases 5 and 7), oracle/verify_corpus.js at 2.17, the first-run sequence
               at 6.6, the answering loop at Step 3, the bootstrap acceptance suite at 6.1, and
               the .gitignore rule applied at 1.1
operation:     manual: The Systems Engineer at sub-step 1.5; classified each of the six against
               the test "does it read a field of this record in order to act on the install", and
               excluded 2; 6 items inspected
conditions:    none. The bootstrap is counted as a consumer as well as the writer, because Phases
               5 and 7 read fields written by an earlier run. The acceptance suite is excluded: it
               asserts on the record and consumes none of its facts. The .gitignore rule is
               excluded: it names the path and reads no field.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     4 components read /.oracle-state.json — the bootstrap, oracle/verify_corpus.js, the
               first-run sequence, and the answering loop — and no other component reads it.
derived-from:  none
sampled:       6 inspected by hand, 0 found wrong, by The Systems Engineer at sub-step 1.5. The
               two exclusions were the whole of the judgment and both are stated in conditions.
superseded:    none
```

```quantity
id:            Q-STATE-KEYS
class:         fixed
value:         19
unit:          distinct JSON paths in the schema at §3 of this file, container paths and leaf
               paths alike, with the two members of copies enumerated by name
population:    every path reachable in the schema at §3: 6 at the top level, 2 members of copies,
               3 fields under each of those 2 members, 3 under corpus, 2 under first_run
operation:     manual: The Systems Engineer at sub-step 1.5; enumerated the paths of the schema at
               §3 by writing each one out in full and counting the list; 19 items inspected
conditions:    none. The count includes container paths because §4 rule 5 refuses unknown keys at
               every level, so the rule needs the full path set and not only the leaves.
at:            2026-08-27; lsei 7f97983; cr-agents f0c976b
predicate:     the schema declares 19 JSON paths; a path outside the 19 is an unknown key, which
               is a corrupt read reported as evidence that a second writer exists.
derived-from:  none
sampled:       n/a — this operation enumerates a closed list, it does not classify
superseded:    none
```

## 12. Version

The schema version is a monotone integer. Any change to the path set, to a field's type, to a validity
rule, or to a read behaviour increments it. Three things read it, and if any of the three stops reading
it the field is removed rather than left as decoration:

1. Every reader, before any other field.
2. `oracle/bootstrap_contract.md`, which names the schema version Phase 5 writes.
3. The schema validator, which asserts that the version it was written against equals this one, and
   fails when they differ.

**This version is independent of the answer contract's, the bootstrap contract's and the counting
rule's.** Four monotone integers, in four files, with four disjoint sets of readers. The one coupling
is one-directional: the bootstrap contract names the schema version it writes, and this record does not
name the contract version that wrote it, because nothing would act on it. **What would falsify the
independence:** a change to any one of the four that requires a change to another.

<!-- END install_state.md -->

---

## 3. Findings, and what this sub-step hands on

Ordered by what they cost if ignored.

### 3.1 Amendments owed against 1.4, as one edit

Six, all mine, all arising from the review or from §1.4's probe. They are listed here rather than
applied because 1.4's deliverable is under a review whose disposition is The Manager's, and applying
them piecemeal would leave the reviewed text and the amended text both in circulation.

| # | Where | Amendment |
|---|---|---|
| 1 | §2 | Delete `ABORT`'s second sentence. `ABORT` means the bootstrap stopped before Phase 6, and the outcome line carries `ABORT (<phase>, <assertion-id>)`. (F1) |
| 2 | §5 | Define `usable`: present, and in neither `offline` nor `present-but-wrong`. `dirty-or-diverged` and `moved-on` are usable. (F2) |
| 3 | §5, Phase 3 | Demote `missing-recoverable` to a Phase 3 transient. It leaves the mode table. (F3) |
| 4 | §9 | `Q-DEGRADED-MODES` 6 → 5; `Q-BLOCKING-MODES` predicate 3-of-6 → 3-of-5, population 5 rows. Both with `superseded` entries. (F3) |
| 5 | §4, BC-8 | Assert the hook file, not the config value and not the directory: `tools/githooks/<event>` exists, is non-empty, begins with `#!`, and contains the marker naming its check register row. Both weaker forms were measured passing against a repository where no hook fires. (§1.4) |
| 6 | §4, BC-5 | Measure `$ROOT` in the shell, not `pwd` in Node. The long-name clause moves to Phase 1's binding of `$ROOT`. (F4, F10) |

Plus the review's own list, which I accept without restating: BC-4 wired into §6's origin table; BC-20
added; BC-13 merged into BC-12 with two markers; BC-14 asserting all four markers; BC-16 deferred to
the sub-step that writes the divergence check; BC-3 and BC-15 cut; BC-19 reclassified as fact 3 of this
record; §6's `LITERATURE` and `CONTESTED` availability conditions split; BC-9's remedy guarded with a
`--get`; the idempotence definition qualified with "and an unchanged upstream"; and *idempotent*
replaced by *unconditional* for Phases 1–6, all seven phases being idempotent. **Where I take a
position against the reviewer I have said so in §1, and nowhere silently.**

One I do not accept: his §4.1 recommendation to delete BC-5's "what would change my mind" clause. A
stated condition that a reviewer can *show* will never fire is a clause that has been tested, which is
more than most hedges get, and his demonstration is the useful artifact. Deleting the clause deletes
the record of the test. **Both positions stand.**

### 3.2 Why the two corrected quantity blocks are not written in this file

The counting rule §5 makes *two blocks sharing an id* a hard `--check` failure. Writing corrected
`Q-DEGRADED-MODES` and `Q-BLOCKING-MODES` blocks here, while the originals stand in 1.4, would create
exactly that. §8 permits a block to move between files; it does not permit one to exist in two.

So they are described at §3.1 row 4 in a table, deliberately not in a fenced `quantity` block, and the
correction is one edit inside 1.4's own file. **This is the counting rule catching its author** — the
second live instance after the Software Engineer's §5(d), and the first in which the rule stopped an
edit rather than diagnosing one.

Three sites in this file — §1.5, §3.1 row 4, and the paragraph above — name `Q-DEGRADED-MODES` and
`Q-BLOCKING-MODES` beside a numeral. Those are **proposed successor values, not quotations of the
current ones**, and they come into `<value> [<id>]` form at the moment the correction lands and the
value is real. Stating them any other way would mean writing "the value should become" without saying
what it should become, which is the shape of a recommendation nobody can act on.

The counting rule's §4 also requires the index regenerated and `--check` run as parts 3 and 4 of a
correction. `tools/quantities.js` does not exist yet; it is 1.12's. **Parts 3 and 4 of both corrections
are owed at the moment the checker lands**, and they should be the checker's first run rather than a
backlog item, because a correction whose verification is deferred is a correction whose echo sites were
never enumerated.

### 3.3 Two blocks owed against 1.4 that nobody has minted

The bootstrap's assertion count is stated in 1.4 (nineteen rows) and again in the review (nineteen,
run). Two files, so it is governed by test G1, and it has no block. I have not minted it, deliberately:
the value moves to fifteen under the review's simplicity gate, and minting a number in the same week it
is superseded produces a `superseded` entry that records nothing but my own timing.
**`Q-BOOTSTRAP-ASSERTIONS` is owed against 1.4, at the value the amendment leaves, in the same edit as
§3.1.**

Separately, 1.4 §1 states "the four facts" as a bare numeral, which is now the second site for
`Q-STATE-FACTS`. Under the Tier 2 touch rule it is brought into form in the same edit. That is one more
line on §3.1's list, and it is the touch rule working rather than a defect.

### 3.4 `/.oracle-state.json.tmp` is ignored, and it is ignored by accident

Measured:

```
$ git check-ignore -v .oracle-state.json.tmp
.gitignore:90:*.tmp	.oracle-state.json.tmp
```

It is covered, and it is covered by the **litter rule at the bottom of the file** — the one rule
`.gitignore`'s own preamble calls "the only deliberately unanchored rule." That is precisely the
situation the `/deps/` block was written to end: coverage existing as a side effect of a rule written
for something else. The preamble states the standard in its own words — the safety net is stated
deliberately or it does not exist.

**Recommended to the orchestrator: one line, `/.oracle-state.json.tmp`, immediately below
`/.oracle-state.json`, as a second literal and not a wildcard.** The existing comment already explains
why a wildcard is refused there, and a `/*state*` or `/*.lock` convenience would eventually swallow
`oracle/VERIFIED.tsv` — the failure presenting as "the ref we verified against is missing on a fresh
clone." Two literals is the price of that rule, and it is the right price.

### 3.5 Handoffs

| To | What |
|---|---|
| **The Software Engineer**, review of this file | Every field carries a writer, a reader and a wrongness, and §4 checks the last column mechanically. The clause I most expect him to attack is `pdfs_present` (§1.3, §2 §10); it ships with a deletion criterion so the attack has somewhere to land. The second is §4 rule 5, refusing unknown keys, which is stricter than a parser needs to be and is justified only by what an unknown key *means* here. |
| **1.4** (mine) | §3.1's six amendments plus the review's list, as one edit. §3.3's two owed blocks. |
| **1.6**, currency policy | This record holds *what this install last saw*; `oracle/VERIFIED.tsv` holds *what the project verified against*, named at §2 §9. The comparison rule and the bump policy are 1.6's, and 1.6 owns `VERIFIED.tsv`'s columns if it wants more. The idempotence coupling at F9b is 1.6's and mine jointly: "unchanged" must mean the same thing in both files. |
| **1.7 / 2.5**, The Engineer, provenance format | **The merge-time corpus provenance digest is content, not install state.** It moves into the provenance format. §1.2 gives the argument; the short form is that a fresh clone must be able to detect divergence and cannot when the baseline is gitignored. This is a widening of his format, not a new store. |
| **2.17**, `verify_corpus.js` | It compares live against the provenance content, and reads `corpus` from this record only to say **new** or **standing**. It does not refuse on a bad read. §2 §10. |
| **2.18**, corpus fork policy (mine) | The policy now names two locations rather than one: provenance names the upstream ref and carries the merge-time digest; the state record carries this install's last observation. Divergence is still reported and never auto-merged. |
| **6.6**, first-run sequence | Three states, two fields, at §2 §5. Phase 7 writes twice, before and after. An interrupted sequence replays, and `attempted_at` means the last attempt rather than the last playing. |
| **6.1**, bootstrap acceptance suite | §2 §3 gives a valid instance, a corrupt one and a future one verbatim; §6.3 gives seven corrupt instances with the rule each violates. Four assertions worth naming: an aborted run leaves `written_at` unchanged; a future-version read writes zero bytes; a corrupt read never ends the session; and deleting the file restores first-install behaviour and loses nothing else. |
| **The orchestrator** | §3.4, one `.gitignore` line. And loose end **E12 is closed** by §1.2 — for the ref *and* for the digest, which is wider than E12 as filed. |

---

## 4. Extraction and self-check, verified

```
$ sed -n '/^<!-- BEGIN install_state.md -->$/,/^<!-- END install_state.md -->$/p' \
    cr_scratch/step1_5_systems_engineer_install_state.md > /tmp/is.md
$ head -1 /tmp/is.md; tail -1 /tmp/is.md
$ grep -c '^```quantity' /tmp/is.md
$ awk '/^\| Field \| Written by/,/^$/' /tmp/is.md | grep -c '^| `'
$ awk '/^\| Field \| Written by/,/^$/' /tmp/is.md | grep '^| `' \
    | awk -F'|' '{v=$5; gsub(/^ +| +$/,"",v); if (v=="—" || v=="") print "DASH: " $2}'
```

Three further checks were run against the extracted block and are not eyeballed:

- **Quantity block form**, against the counting rule §2 key list: twelve keys, exact declared order, no
  empty value, per block.
- **Id uniqueness**, across every `cr_scratch/*.md`, because §5 of the counting rule makes two blocks
  sharing an id a hard failure and §3.2 above is entirely about avoiding one.
- **`Q-STATE-KEYS`**, by walking the valid instance at §3 of the deliverable rather than by counting
  the schema by hand. A count of a path set is exactly the operation a hand count gets wrong.

### 4.1 Result

```
lines: 429
first: <!-- BEGIN install_state.md -->
last:  <!-- END install_state.md -->
quantity blocks: 4
field rows: 11
dash check:  (no output)
block 1 keys=12 orderExact=true          block 3 keys=12 orderExact=true
block 2 keys=12 orderExact=true          block 4 keys=12 orderExact=true
empty values: (no output)      duplicate ids across cr_scratch: (no output)
paths=19   leaves=14
```

The extracted block begins and ends on its markers and carries four well-formed quantity blocks.
**No row of the §5 field table carries a dash in its wrongness column** — which is finding (c) turned
into a check on my own deliverable rather than a lesson noted about somebody else's. And
`19 [Q-STATE-KEYS]` is the walked path count of the instance the deliverable publishes, so the schema
and the number that governs it cannot disagree without one of them being edited.

The `derived-from` graph is trivially acyclic: all four blocks carry `none`. None of the four rests on
another, which is itself worth noticing — these are rulings of this file, not measurements over
something else, and a ruling that derives from a measurement would be a different kind of block.

---

*The Systems Engineer, sub-step 1.5.*
