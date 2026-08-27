
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

**A second valid instance, covering the nullable partition**, which a test constructs verbatim. The
first instance above exercises no null, and the two together are the fixture set §4 rule 4 needs:

```
{
  "schema": 1,
  "written_at": "2026-08-27T09:14:03Z",
  "copies": {
    "cr-agents": null,
    "lsei": { "head": "7f97983", "upstream": "7f97983", "observed_at": "2026-08-27T09:14:03Z" }
  },
  "corpus": null,
  "pdfs_present": false,
  "first_run": { "attempted_at": "2026-08-27T09:14:03Z", "completed": false }
}
```

This is a first install on which `cr-agents` could not be cloned and on which the corpus digest could
not be computed, and on which the first-run sequence was attempted and did not complete. The three
nullable paths are independent of each other, which is why this instance nulls one copy and the corpus
rather than nulling everything: a fixture that nulls all three cannot show that rule 4 reads them one
at a time. **It is valid**, and a validator that classifies it corrupt is running the pre-C-1 rule 4. It is also the instance 6.1 needs for the
interrupted-sequence case, so one fixture closes three uncovered cases: a null copy, a null `corpus`,
and `first_run` in its third state.

**A corrupt instance:** `{"schema":1,"written_at":"2026-08-27T09:14:03Z","copies":{"cr-agents"` —
truncated mid-write. Six further corrupt instances are enumerated at §6.3 with the rule each violates;
a validator that accepts any of the seven is wrong.

**Two future-version instances, and the second is the one that matters.**

```
F1  the valid instance above with "schema": 2                 -- same path set
F2  the valid instance above with "schema": 2 AND one added key, "hooks_installed": true
```

**F2 is the realistic one.** A schema bump is a change to the path set (§12); a future version that
adds nothing is a version nobody would have minted. F1 is the only future record whose paths this
version already knows, so a test written on F1 alone exercises the one future record that cannot
reach the ordering defect. Both assert **zero bytes written** and terminal outcome
`ABORT (Phase 5, ST-3)`.

F2 is byte-for-byte §6.3's corrupt instance 7 except for the value of `schema`, and it must be
classified the other way. **That is the whole of the assertion:** the discriminator between corrupt
and refuse is `schema` and nothing else, so `schema` is read first and the shape rules are applied
after the branch. See §4 and §6.1.

## 4. Validity

Six rules, in **two gates**, and the split is load-bearing rather than tidy. Anything failing either
gate is a corrupt read (§6.3) — but the gates are applied at two different points in §6.1, with the
schema-version branch between them.

**§4a — the parse gate.** These three are true of every record this project will ever write, at
every schema version. They may be applied before the version is known.

1. The bytes parse as JSON.
2. The parsed value is an object: `typeof v === "object" && v !== null && !Array.isArray(v)`.
   **All three conjuncts are required.** `JSON.parse("null")` returns `null` and `typeof null` is
   `"object"`; `JSON.parse("[]")` returns an array and `typeof []` is `"object"`. Both were run.
3. `schema` is present and is an integer greater than zero. A string `"1"`, a float `1.5` and a zero
   are each corrupt.

**§4b — the shape gate.** These three are true of a record **written at this schema version**, and
they are meaningless against any other. They are applied only after §6.1 has established that the
version is this one.

4. Every path the schema requires **given the nullability of its parent** is present, with a value of
   the declared type or the declared `null`. A nullable object that is `null` requires none of its
   leaves; a nullable object that is present requires all of them. The nullable paths are the three
   §3 declares under its two nullable types: `copies.cr-agents`, `copies.lsei` and `corpus`. Their
   nine leaves, three each, are what this qualifier governs; the other ten paths are required
   unconditionally.
5. No path outside the `19 [Q-STATE-KEYS]` is present.
6. Every non-null timestamp matches `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$`.

**Rule 4's qualifier is load-bearing and its absence was blocking.** §3 rules that a nullable object
is written whole or not at all, so `{"copies": {"cr-agents": null, "lsei": {…}}}` is a legal
record in which `copies.cr-agents.head`, `.upstream` and `.observed_at` are absent. Rule 4 as written
demanded all nineteen paths unconditionally, so that legal record failed validation, was classified
corrupt, and was **rewritten** — the same destructive path as S1, reached from the other direction and
on a record this specification explicitly permits. `corpus: null` is three more paths and is the
ordinary state of an install whose `lsei` copy is offline.

`19 [Q-STATE-KEYS]` was never wrong and is unchanged. What was wrong is that two rules read the same
nineteen with two meanings: rule 5 reads them as the **permitted** set, which is right, and rule 4 read
them as the **required** set, which is right only for a record with no nulls. The fix is the qualifier
and nothing else.

**Why the self-check missed it, which is the part worth carrying.** The walk at sub-step 1.5 §4.1
reported `paths=19 leaves=14` over the valid instance published at §3 rather than over a hand count —
good method, and the published instance had both copies populated and `corpus` populated. **A walk
over the one instance that exercises no nullability cannot discover a rule that only misfires under
nullability.** That is the same testing error as S1: in both cases the fixture the deliverable
published was the single instance that avoids the defect, because it was derived from the happy path
the author had in mind rather than from the partition the specification declares. §3 now publishes a
second instance covering the nullable partition, and 6.1 asserts against both. (1.5/1.13 review S2;
`AM-38`.)

Rule 5 is doing unusual work and it is deliberate. **An unknown key at a known schema version means
something other than the bootstrap wrote this file.** The record is the single-writer property's own
detector, and it reports that finding in those words rather than ignoring the key.

**And rule 5 is exactly why the gates are two.** *At a known schema version* is a precondition of the
rule, not a decoration on it, and until R-2 nothing enforced the precondition: §6.1 ran all six rules
before it read the version, so a schema-2 record that added a key — which is what a schema bump
**is**, per §12 — failed rule 5, was classified corrupt, and was **rewritten** by §6.3. The clause
that exists to refuse rather than overwrite was unreachable for every realistic future version. The
finding is the reviewer's, at the 1.5/1.13 review S1. Rule 3 already isolates `schema` and already
belongs in the parse gate, so the ordering is the whole of the fix and it costs nothing else.

**What each gate costs if it is applied at the wrong point.** §4b applied too early destroys a newer
Oracle's record, which is S1. §4a applied too late reads a `schema` out of bytes that are not JSON, or
out of an array, and branches on it.

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
2. **§4a, the parse gate.** Fails ⇒ §6.3 corrupt.
3. `schema` greater than this schema version ⇒ §6.4. **Read no other field first**, and by step 3
   none has been read: the parse gate touches the bytes, the type of the root value, and `schema`.
4. `schema` less than this schema version ⇒ §6.5.
5. **§4b, the shape gate.** Fails ⇒ §6.3 corrupt. Reached only when `schema` equals this version, so
   rules 4, 5 and 6 are applied to a record they describe.
6. Otherwise the read is ordinary.

**Steps 3 and 5 may not be exchanged.** Step 5 before step 3 is the S1 defect: it classifies every
future record that adds a key as corrupt and hands it to §6.3, which rewrites it. Fixture F2 at §3 is
the test, and it asserts zero bytes written.

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

Instances 1 to 6 fail **§4a** and are classified before the version branch. **Instance 7 fails §4b**
and is reached only when `schema` equals this version. That is the entire discrimination between
instance 7 and §3's fixture F2, which carries the same unknown key at `schema: 2` and must be refused
rather than rewritten. A validator that returns the same verdict for both is the S1 defect, and it is
a pair a test asserts on together rather than separately.

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
field value out of the file; a future-version read that reaches Phase 6; **and a future-version read
carrying a path this version does not know that is reported as corrupt** — fixture F2, which is the
falsifier this clause did not have until R-2, and whose absence at §3 is why the one fixture that was
written could not catch S1.

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

