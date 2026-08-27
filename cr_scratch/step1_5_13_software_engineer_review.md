# Step 1.5 and 1.13, The Software Engineer: testability review of two Systems Engineer specifications

**Persona:** The Software Engineer
**Sub-step:** review of 1.5 (the install state record) and 1.13 (the check register), one pass
**Under review:** the block between `<!-- BEGIN install_state.md -->` and `<!-- END install_state.md -->`
in `cr_scratch/step1_5_systems_engineer_install_state.md`, and the block between
`<!-- BEGIN oracle/check_register.md -->` and `<!-- END oracle/check_register.md -->` in
`cr_scratch/step1_13_systems_engineer_check_register.md`. Reasoning sections read for argument;
findings written against the deliverables.
**Corpus not loaded. App not loaded.** Nothing here required either.
**State:** repository working tree of 2026-08-27; `lsei` `7f97983`; `cr-agents` `f0c976b`; `tools/`
eight files, all `100644`; `oracle/`, `literature/`, `tools/githooks/` do not exist;
`git version 2.55.0.windows.1`; Node `v26.4.0`.

---

## 0. Verdict

Sixteen findings. **Three are blocking**, and all three were found by running something rather than by
reading it.

Both specifications are better than the bootstrap contract I reviewed at 1.4, and the improvement is
the same in both: he now runs his own assertions against his own deliverable before handing it over.
1.13 §3.4 is the clearest instance of that discipline in this project so far — he wrote an inert
assertion, implemented it, ran it, and reported the inertness against himself. I would not have caught
CL-5(a) faster than he did.

**What the running found that the reading did not.**

- **The check register specifies a self-invoking loop.** `CHK-09` is in the set `CHK-10` dispatches,
  and `CHK-09` asserts `HK-1`, which is `git hook run pre-commit`. I built it. It recurses without
  bound and git provides no reentrancy guard. (R1)
- **The artifact his consolidation ruling names as the survivor is itself broken on this repository's
  own file format.** `ecr_verify.js` cannot lift a marked block from a CRLF markdown file — measured,
  exit 2 — and its register row advertises that capability. (R2)
- **The silent check has already produced a wrong verification, not merely a worthless one.** Run the
  ratified 1.9 lunar rows through `ecr_verify.js` and it exits 1 on a real `B6` failure.
  `check_register_rows.js` prints the same finding and exits 0. The Step 1 verification record says
  "0 failing, all assertions pass". (R2)
- **The install state record validates before it branches on schema version**, so a future record that
  adds a key is classified corrupt and overwritten — destroying precisely what §6.4 was written to
  protect. The future-version fixture the deliverable specifies is the one fixture that cannot catch
  it. (S1)

**On the two contested judgement calls I was sent to test:** the register's artifact-not-assertion
boundary is **right**, and CL-1 genuinely fails on an unregistered file — I added one and watched it
fail. The install record's three-clause membership rule is **not right**: M1 refuses `corpus.digest` by
its own terms and M3 has two readings, and he admits admitting a field "in a weaker form" of a clause,
which is what a rule that can be applied two ways looks like from the inside. I give a corrected
three-clause rule that decides all ten candidates and needs no fourth clause. That is a repair, not a
rejection — the rule is the right idea and the count is right.

**On the finding he made against himself, which I was told to press hardest:** his ruling is correct
that the two scripts consolidate, and **wrong that 2.15 is the place**. Something depends on them
before then — two of 1.9's quantity blocks name `check_register_rows.js` as their `operation:`, and
`CHK-03`'s own row wires it to `substep-gate` today. A check that cannot fail, sitting on a gate, for
the eleven sub-steps between here and 2.15, is not a debt. It is the defect still running. The fix is
one cell, available today, and it is R3.

**On close conditions, my own rule from 1.11 applied to every one in both files:** six exist, four are
conditions rather than dates, and **exactly one has a mechanism that can fire.** That one is CL-6, and
it is the model the other five should copy.

---

## 1. What I ran

Everything below was executed this session. Where the Orchestrator has already verified something —
`core.hooksPath` against a nonexistent directory, `test -d` on an empty hooks directory, the POSIX exec
bit not being the gate on git-for-Windows, `git ls-files -s tools/` reporting `100644` for all eight —
I have not re-run it and have built on it instead.

| # | Probe | Result |
|---|---|---|
| 1 | `process.exit` inventory across `tools/*.js` | `check_register_rows.js`: one, a missing-import guard. `ecr_keycheck.js`: none. `ecr_verify.js`: `process.exit(fail.length?1:0)`. Confirms 1.13 §3.3. |
| 2 | `check_register_rows.js` on the 1.9 deliverable | Prints `B6 CLUSTER` and ten `B7 SHARED` lines. **exit 0.** |
| 3 | `ecr_verify.js` on the same deliverable `.md` | `no BEGIN/END oracle/REGISTER.tsv block`, **exit 2** — the marker line is CRLF-terminated and its regex requires `-->\n`. |
| 4 | `ecr_verify.js` on the extracted TSV | `FAIL B6 cluster nasa-2025 partly registered`, **exit 1.** |
| 5 | `ecr_keycheck.js lsei/literature tools/ecr_key_candidates.json` | `TOTAL keys 340  dead 340  live 0`, **exit 0.** |
| 6 | `git hook run pre-commit`, three states | hook present exiting 0 → `exit=0`; hook absent → `error: cannot find a hook named pre-commit`, `exit=1`; `hooksPath` unset with sample hooks present → `exit=1`. **HK-1 verified exactly as written.** |
| 7 | `CHK-10` dispatching `CHK-09` which runs `HK-1` | Unbounded recursion. Instrumented with a depth counter because nothing else stops it: `depth=0..6`, then my own cap. |
| 8 | `git update-index --chmod=+x` durability | Survives edit + `git add` under `core.filemode=false`: `100755` → edit → `100755`. **HK-2's fix is stable.** |
| 9 | Index mode `100644` vs `git hook run` on Windows | Fires anyway, `exit=0`. **HK-1 passes while HK-2 fails**, which is why both are needed. |
| 10 | CR bytes in committed blobs; `.gitattributes` | `ecr_verify.js` blob: 182 CR bytes in 6996. 1.9 deliverable blob: 4386 CR bytes. **No `.gitattributes`. `core.autocrlf=true`.** |
| 11 | CL-1 to CL-2 reimplemented over the register block | 24 C rows, 2 S roots. CL-1: 8 files, 0 uncovered. CL-2: 0 missing. Reproduces his §5.1. |
| 12 | CL-1 against a new unregistered file in `tools/` | `9 files, 1 uncovered -> tools/_cl1_probe.js`. **The closure mechanism works.** File removed; `git status tools/` clean. |
| 13 | CL-1 against `tools/quantities.js` landing | `9 files, 1 uncovered -> tools/quantities.js` — **fails despite four rows naming it.** |
| 14 | CL-6 marker census | `and/or`: 1 upstream, 1 each in `check_corpus_collisions.js`, `ecr_keycheck.js`, `ecr_probes.js`, `ecr_verify.js`; 0 in the other three. **Four true positives, three true negatives. His measurement is exact.** |
| 15 | `fs.renameSync` over an existing target | Replaces, no temporary left — as he states. **Over a target held open by one reader: throws `EPERM`.** |
| 16 | `literature/FIELDS.tsv` / `INDEX.tsv` | `git check-ignore`: both ignored by `.gitignore:51 /literature/**`. **`literature/` does not exist and nothing under it is tracked.** |

---

## 2. Sub-step 1.5, the install state record

### S1. BLOCKING. §6.1 validates before it branches, so a future record is destroyed by the corrupt path

§6.1 orders the read: **(2)** parse and validate per §4, invalid ⇒ §6.3; **(3)** `schema` greater than
this version ⇒ §6.4, "**Read no other field first.**"

Step 2 has already read every field. That is not a stylistic quibble — it inverts the outcome.

§4 rule 5 refuses any path outside the nineteen. A schema-2 record that adds a field — which is what a
schema bump *is*, per §12 — fails rule 5. So the read is classified **corrupt**, and §6.3's action is
"**rewrite from this session's observations**". The bootstrap therefore **overwrites the newer Oracle's
record**, reports "a second writer exists", and proceeds to Phase 6.

§6.4 exists to prevent exactly this, in its own words: *"the reason to refuse rather than overwrite is
that overwriting destroys what the newer Oracle knew."* The mechanism that would carry out that
intention is unreachable for every realistic future version.

**And the fixture the deliverable specifies cannot catch it.** §3 defines the future-version instance as
"the valid instance above with `"schema": 2`" — a schema-2 record with schema-1's exact path set. That
is the *only* future record that passes §4 and reaches step 3. The one test he wrote is the one test
that dodges the defect. Meanwhile §6.3's corrupt instance 7 — "a valid instance plus
`hooks_installed: true`" — is the same file with a different version number, and it is classified
correctly. The classification depends on a field the reader is told to consult only after it has
already decided.

**Fix, one edit.** Split §4 into two gates and interleave the version branch:

```
§4a  PARSE GATE   rules 1-3   bytes parse; value is a non-null non-array object;
                              schema is a positive integer
§4b  SHAPE GATE   rules 4-6   required paths present; no unknown paths;
                              timestamps well-formed

§6.1  1. Open. Absent -> §6.2.
      2. §4a. Fails -> §6.3 corrupt.
      3. schema > this version -> §6.4 refuse.   <- now genuinely before any other field is read
      4. schema < this version -> §6.5 migrate.
      5. §4b. Fails -> §6.3 corrupt.
      6. Ordinary.
```

Rule 3 already isolates `schema` and already sits in the parse gate's natural place, so this costs
nothing but the ordering. **And 6.1's fixture must change with it:** the future-version instance must be
*the valid instance with `"schema": 2` **and one added key***, asserting zero bytes written. The
existing fixture stays as a second case. TDD principle 6 — when the structure under test changes, the
test that referenced the old structure is the first thing to fix, not the last.

### S2. BLOCKING. Rule 4 contradicts the write-whole-or-not-at-all rule, and the self-check fixture cannot see it

§3: "**The two nullable objects are written whole or not at all.** If a copy's `HEAD` and `origin/main`
cannot both be read this run, that copy's object is left at its previous value, or is `null` when there
is no previous value."

§4 rule 4: "**Every path the schema requires at this version is present**, with a value of the declared
type or the declared `null`."

Take the legal instance where `cr-agents` was never cloned:

```
"copies": { "cr-agents": null, "lsei": { ... } }
```

`copies.cr-agents.head`, `.upstream` and `.observed_at` are **absent**. They are three of the nineteen
paths. Rule 4 says every required path is present. So a legal record fails validation, is classified
corrupt, and is rewritten — the same destructive path as S1, reached from the other direction and on a
record the specification explicitly permits.

The same applies to `corpus: null`, which is three more paths, and `corpus: null` is the ordinary state
of an install whose `lsei` copy is offline.

**`19 [Q-STATE-KEYS]` inherits the defect.** Its unit is "distinct JSON paths in the schema, container
paths and leaf paths alike"; its predicate is "a path outside the 19 is an unknown key". Both are fine.
But rule 4 reads the same nineteen as *required*, and six of them are conditionally absent by design.
The number is right; two rules read it with two meanings.

**Why his own check missed it, and this is the part worth carrying.** §4.1 reports `paths=19 leaves=14`,
"walked ... the valid instance at §3 of the deliverable rather than counting the schema by hand". Good
method. But **the valid instance has no nulls** — both copies populated, `corpus` populated. A walk over
the one instance that exercises no nullability cannot discover a rule that only misfires under
nullability.

That is the same testing error as S1: in both cases the fixture the deliverable publishes is the single
instance that avoids the defect. Two instances of it in one file is a pattern, and the pattern has a
name — **the fixture was derived from the happy path the author had in mind, not from the partition the
specification declares.** The specification declares two nullable objects and a three-state `first_run`;
the fixture set must cover them.

**Fix.** Rule 4 becomes: *every path required **given the nullability of its parent** is present.* And §3
gains a second published instance — `copies.cr-agents: null`, `corpus: null`,
`first_run: {ts, false}` — which is also the instance 6.1 needs for the interrupted-sequence case. One
fixture, three uncovered cases closed.

### S3. MAJOR. `pdfs_present` manufactures the failure it is meant to avoid. Delete it

He names this his weakest field and ships it with a deletion criterion so the attack has somewhere to
land. Here it is, and it is not the attack he staged for.

His §5 states the asymmetry himself: *"Wrongly `false`: the loop declines to read a PDF sitting on
disk — **silent, and the worse direction**."*

**That case exists only because the field exists.** The field records "whether `literature/_pdf` held a
file when the bootstrap last ran". The author drops a PDF into `_pdf` at 14:00; the session started at
09:00; the loop declines to read it, silently, for the rest of the session and until the next
bootstrap. With a probe, that state is unreachable — the probe answers at the moment the reader needs
it, which is the definition of correct here.

So the field's only defence is his §1.3 argument: *"the answering loop must not carry a filesystem
probe, because a probe in the loop is how the loop acquires a second definition of the install's
shape."*

**One `existsSync` of one declared path is not a definition of install shape.** It is one boolean about
one directory the corpus contract already names. The loop must already read the filesystem — it reads
the corpus. The claim that reading one more declared path constitutes a second authority is doing
rhetorical work that the rest of this document does not need it to do, and it is the only place in
either specification where a stated principle costs more than it buys.

And the containment he wants is available at lower cost **in his own other deliverable**: the probe
lives in `oracle/lib/`, it gets one row in the check register, one artifact, one consequence, and CL-1
keeps it from multiplying. That is the mechanism. The field is a cache of it.

**What breaks if `pdfs_present` is deleted:** nothing. The loop probes. The record drops from four facts
to three and from nineteen paths to eighteen.

**What it costs to say so:** `Q-STATE-FACTS` 4 → 3 and `Q-STATE-KEYS` 19 → 18, with `superseded`
entries, and §11's population and `sampled` lines change. Per his own §3.2, both corrections are one
edit inside 1.5's file, and neither block has left this file, so there is no two-homes problem. He has
already built the machinery for exactly this.

**On the deletion criterion itself**, since it is the BC-7 question asked again. It is a *condition* and
not a date, which is more than BC-7's was, and I said at F11 that a clause shipping with a written
deletion criterion is the cheapest form of hedge. Two things are wrong with it anyway. **It has no
observer** — "if the answering loop is ever found probing" names no sub-step, no persona and no
mechanism. And **its polarity is inverted**: it can only fire *after* the loop has already broken a
different rule, so if the loop behaves, the field is kept forever on a promise that by construction
cannot be redeemed. That is F11's failure mode with the sign flipped, and it is why I am arguing the
field on its own merits instead of resting on the criterion.

If he keeps the field against this, the criterion needs the F11 treatment: give it a mechanism. A
CL-6-shaped grep over `oracle/lib/**` and the loop's sources for
`existsSync`/`statSync`/`readdirSync`, as one register row, reported at the sub-step gate. Then it has
an owner and it can fire.

### S4. MAJOR. §7's rename guarantee is false under a concurrent reader, and §7 has no wrongness column

§7: "Verified on this platform: `fs.renameSync` replaces an existing file and leaves no temporary
behind."

Both halves are true — I reproduced them. **The guarantee does not hold when anything holds the target
open:**

```
fs.writeFileSync('t.json.tmp','NEWER');
const fd = fs.openSync('t.json','r');
fs.renameSync('t.json.tmp','t.json');    ->  EPERM
```

This is Windows semantics, not a Node bug, and it is not hypothetical here. **This repository lives
inside a OneDrive folder** — the root path contains `onedrive` — and a sync client, an indexer or an
antivirus scanner holding a transient read handle on a small JSON file at the moment it changes is the
normal case, not the pathological one. Phase 7 writes twice during the one sequence a person is most
likely to interrupt, which is when handles are most likely to be open.

**As specified, an `EPERM` here is an unhandled throw in Phase 5 or Phase 7.** §7 states no failure
behaviour. This is the one section of the deliverable that escaped his own §5 discipline: every field
states what happens when it is wrong; **the write path states what happens when it works.**

**Fix, and it falls straight out of his keystone.** The record is safe to delete, therefore a failed
write is a report line and never an abort:

> The rename is attempted up to three times. If it still fails, the temporary is removed, the failure is
> reported with its error code, and the session proceeds. A record that could not be written is
> indistinguishable from a record that was deleted, and §1 says that is survivable.

That is three sentences and it converts a crash into the behaviour the keystone already promises.

**A second-order consequence worth one line in §7:** an orphaned `.oracle-state.json.tmp` is currently
described as "evidence that a previous session died mid-write, which is worth one line, and it is
evidence of nothing else." After this fix it is also evidence of a failed rename, which is a different
diagnosis. Say both.

### S5. MAJOR. M1 is not decidable as written: it refuses `corpus.digest`

The rule has to be applicable by someone who is not him. Apply M1 as written to a field he ships.

> **M1.** It is an **observation**, not a derivation. ... A derived value stored beside its inputs
> stores the derivation rule as well, and the rule then has two homes.

`corpus.digest` is a hash over `lsei/literature/`. The inputs are on disk beside it. The stored value
carries the derivation rule — which files are in scope, what normalisation, what algorithm — and the
deliverable **admits it does**, in the next paragraph: *"`digest` carries its algorithm as a prefix ...
Changing the algorithm is a schema version bump."*

A field whose correctness requires a schema version bump when the derivation rule changes is a field
that stores part of the derivation rule. That is M1's own sentence, and M1 refuses it.

He would say the digest is an *observation of* a derivation. So is the available-origin set, which M1
refuses; so is the mode set, which M1 refuses. **Observation-versus-derivation does not separate the ten
candidates**, and a reasonable person applying it to the digest gets "refuse" while the author got
"admit". That is the definition of a rule that can be applied two ways.

**The property that actually separates them is already in the file, in the keystone.** The keystone says
every field except `first_run` is re-observed next run. Invert it and it becomes the admission rule:

> **M1 (corrected). The record holds only a past observation — a value that cannot be recomputed at read
> time.**

Run it over all ten candidates:

| Candidate | Recomputable at read time? | M1-corrected |
|---|---|---|
| `copies.<name>.head` / `.upstream` — **last run's** | No. This run's HEAD is a different value. | admit |
| `corpus.digest` / `.at_ref` — **last run's** | No. The corpus may have changed since. | admit |
| `first_run.*` | No. A past event. | admit |
| `written_at` | No. A past moment. | admit |
| `pdfs_present` | **Yes** — `existsSync`, now. | **refuse** |
| Measured root length | Yes. | refuse |
| `core.hooksPath` installed | Yes. | refuse |
| Available-origin set | Yes. | refuse |
| Node availability | Yes. | refuse |
| Corpus data-file presence at bootstrap | Yes. | refuse |

Ten candidates, ten decisions, no "weaker form", and **it agrees with every ruling he made except
`pdfs_present`** — which is S3, and which the corrected rule refuses openly instead of admitting under a
clause bent to fit. It also refuses mode sets and the terminal outcome for the reason M1 was reaching
for: they are computed every session, so a stored copy is by definition recomputable.

This is a repair of his rule with his own keystone, not a replacement of it. The count stays three.

### S6. MAJOR. M3 has two readings, and the second one admits what the first refuses

> **M3.** It has a **named reader** that cannot get the value another way at the moment it needs it.

"Cannot get the value another way" reads as physical impossibility. Under that reading, `pdfs_present`
fails — the loop *can* probe — and §1.3 concedes it: *"M3 is satisfied only in a weaker form."*

The weaker form is a second reading: *must not* get it another way, as policy. Under **that** reading M3
admits anything for which a policy argument can be constructed, which is every field anyone will ever
propose. Two readings, opposite verdicts, in the author's own text about his own field. **A membership
rule with a documented weaker form is a rule with two settings.**

The work M3 actually does, and does well, is the `core.hooksPath` refusal, and that argument has nothing
to do with impossibility. It is about **where the reader looks**: git reads `.git/config` and a
directory of hooks, and will never read this file. So:

> **M3 (corrected). Its named reader reads *this file*. A fact whose consumer consults another authority
> is recorded in that authority or nowhere.**

Decidable, no gradations, and it keeps every rejection: `hooks_installed` refused (git reads
`.git/config`), Node availability refused (its reader is the run that measured it, which is not a reader
of this file), available-origin set refused (same). Under corrected M1 and M3 together, `pdfs_present`
is refused by M1 and never reaches M3 — which is the honest outcome.

M2 needs no change. **The subject test at §2 is the best paragraph in the deliverable** and I would not
touch it: "whose fact is this" separates `oracle/VERIFIED.tsv` from `copies` cleanly, and it is the one
clause a successor can apply cold.

### S7. MINOR. `written_at`'s stated reason is false on the file's own text

> "It is here because idempotence is defined as *no field changes except the timestamp*, and that
> definition needs a field permitted to change."

**There are four timestamps that change every run**, not one: `written_at`,
`copies.cr-agents.observed_at`, `copies.lsei.observed_at`, `corpus.observed_at`. So the definition as
quoted is already false of the record it defines, and `written_at` is not the field that makes it
expressible.

This matters because 6.1 has to write the assertion. "No field changes except the timestamp" is
unwritable against a record with four of them, and a test author reading §5 will write the wrong
assertion.

**Keep the field.** Its real justification is better than the stated one: it is the only unconditional
timestamp — `observed_at` is absent whenever its parent is `null`, which is the offline case — so it is
the only field that dates the record when everything else is null, and it is the anchor of the
corrupt-read forensics at §6.3.

**Fix.** Replace the reason with that, and give 6.1 the assertion in the form it can actually be
written: *run twice with no upstream movement; every field is byte-identical except the four timestamps,
which are non-decreasing.* Non-decreasing rather than changed, because a second run inside the same
second legitimately produces the same string.

### S8. MINOR. The keystone holds only on a run that reaches both upstreams, and §6.2 misreports a deletion

> **This file is safe to delete.** Every field except `first_run` is re-observed by the next run.

Checked against every field. It holds for `schema`, `written_at`, `first_run` (declared exception), and
`pdfs_present`. It holds for `copies` and `corpus` **only on a run that can read both upstreams and find
the corpus.** §3's own rule says so: "left at its previous value, or is `null` when there is no previous
value." Delete the record, run offline, and `copies` and `corpus` are `null` — not re-observed, and
there is now no previous value to fall back to. The drift baseline is gone until an online run.

That is survivable and it is the right design. It is not what "every field is re-observed by the next
run" says, and a successor reading the keystone as an unconditional guarantee will delete the file
before an offline session and lose the window that dates a defeated push-disable — the one thing §1.2
argues these fields exist for.

**Second half.** §6.2 says absent ⇒ "no file, no error, no report line beyond `first install`". After a
deliberate deletion the bootstrap therefore **reports a fact it did not observe**: this is not a first
install. §6.2's falsifier tests only the other direction — "a run that reports `first install` and finds
a record".

Both are one sentence each:

> Deleting the record is safe. On a run that cannot reach an upstream or find the corpus, `copies` and
> `corpus` are `null` for that run and the drift window is unavailable until the next online run;
> nothing else is lost.

> A deleted record and a first install are indistinguishable, deliberately. The report line says
> `first install (no record present)` so that the claim is about the file rather than about the install.

**What I am not asking for.** No flag, no marker, no quarantine copy. Making the two distinguishable
would require a second file, and a second file is the thing this record exists to avoid. State the
indistinguishability; do not engineer around it.

---

## 3. Sub-step 1.13, the check register

### R1. BLOCKING. `CHK-09` asserting `HK-1` under `CHK-10` dispatch is unbounded recursion

Read the three rows together:

```
CHK-09  tools/checks.js            check    CL-1..CL-7 and HK-1, HK-2   pre-commit,session-start  block
CHK-10  tools/githooks/pre-commit  trigger  dispatches every row whose invoked_by names pre-commit
                                                                        git                       block
HK-1                                        git hook run pre-commit  exits 0
```

`CHK-09`'s `invoked_by` names `pre-commit`. `CHK-10` dispatches every row whose `invoked_by` names
`pre-commit`. So `CHK-10` runs `CHK-09`, `CHK-09` runs `git hook run pre-commit`, which runs `CHK-10`.

I built it exactly as specified — a dispatcher hook, a `checks.js` that shells
`git hook run pre-commit`, one commit:

```
pre-commit dispatch depth=0
pre-commit dispatch depth=1
pre-commit dispatch depth=2
...
RUNAWAY: depth cap hit
commit exit=1
```

The depth counter is **mine**, added so the probe would terminate. Nothing in git stops this: `git hook
run` has no reentrancy guard and sets no environment marker a hook can test. Without the counter it
recurses until the process or the OS stops it, and it fires on **every commit**.

He did not see it because §1.5's chain diagram draws the loop and reads it as a virtue:

```
CHK-09 checks the register
  invoked by  CHK-10
  which fires only if  HK-1
  which is asserted by CHK-09, at session-start, from the bootstrap
```

"at session-start" is the escape, and it is correct — **at session-start there is no recursion, because
nothing invoked the hook.** The diagram is describing the session-start path and the register row wires
both. The reasoning is right and the row is wrong.

**Fix, and it is one cell.** `HK-1` is a *wiring* assertion: it answers "would a hook fire", which is a
question about installation, not about this commit. It belongs at session-start and at 2.14's
post-condition, and nowhere on the hook itself. Two options, and I prefer the first:

1. **Split `CHK-09` into two rows** — which his own boundary requires anyway, see R5.
   `CHK-09a tools/checks.js` (`--register`) runs CL-1..CL-7, `invoked_by: pre-commit,session-start`,
   `block`. `CHK-09b tools/checks.js` (`--wiring`) runs HK-1 and HK-2, `invoked_by: session-start`,
   `report`. The `--wiring` mode is the one 1.13 §3.8 already hands to 2.14 as its post-condition, so
   this row is already named in the handoff; it simply must not be in the pre-commit dispatch set.
2. Guard `HK-1` with an environment sentinel the hook exports. Cheaper to write, and worse: it makes the
   assertion's meaning depend on who called it, which is the ambiguity R5 is about.

**And a closure rule the register should carry, because this class will recur.** No row whose
`invoked_by` names an event may assert a property *of that event's own dispatch*. That is one sentence
under §5 and it is mechanically checkable for the `pre-commit` case: **`CL-8` — no row naming
`pre-commit` may contain the literal `git hook run pre-commit`.** One grep, blocking, and it is the same
shape as CL-6.

### R2. BLOCKING. The consolidation target is broken on this repository's own file format, and the silent check has already produced a wrong verification

This is the finding he made against himself, tested as instructed. **His diagnosis is right and
understated, his ruling is right in substance, and 2.15 is the wrong date.** Three parts.

**(a) The silent check did not merely fail to prove something. It concealed a real failure.**

The Orchestrator's Step 1 verification records, for 1.9's lunar rows: *"15 axes, 80 members, 127 key
slots (107 distinct), 0 failing, all assertions pass — CONFIRMED by re-run ... exit 0."*

Run the same rows through `ecr_verify.js`:

```
$ node tools/ecr_verify.js <extracted lunar rows> lsei/literature
--- ASSERTIONS ---
  FAIL B6 cluster nasa-2025 partly registered:
       in=nasa-2025-fission-surface-power-directive.md
       missing=nasa-2025-moon-to-mars-architecture-add-revc.md
exit=1
```

`check_register_rows.js` **prints the same finding** — `B6 CLUSTER LCC-10 has ... | cluster also holds
...` — and exits 0. The failure was on screen and the exit code said pass, and the exit code is what was
recorded.

So the answer to "was half the verification worthless" is: **no, it was wrong.** There is a live `B6`
failure in the ratified lunar register rows right now. That belongs to 1.9 and to the Orchestrator, not
to 1.13, but it is the evidence that this is not a hygiene finding.

**(b) Something depends on the two scripts before 2.15, in three places.**

| Dependency | Where | What it means |
|---|---|---|
| `CHK-03`'s own row | `invoked_by: substep-gate`, `on_failure: none` | A check that cannot fail is **wired to a gate today**, for every sub-step between here and 2.15. |
| `Q-LCC15-KEYS` | 1.9, `operation: script: tools/check_register_rows.js /tmp/lunar.tsv` | A quantity whose operation is a script that hard-codes `C:/Users/Quinn Morley/...` at line 3. The counting rule requires `script:` operations to be committed; it does not require them to be **runnable**, and this one is not runnable by anyone else. |
| `Q-LCC15-KEYS-DEAD-K2` | 1.9, same script | Same, plus its input "is not retained". |
| Step 1 verification | Orchestrator | Cites its exit status as evidence. (a). |

**(c) `ecr_verify.js`, the survivor, cannot read a deliverable.**

Its `asserts` cell reads: *"1.8 section 9 L2-L5 and B1-B7 over a TSV path **or a deliverable's marked
block**, against a given corpus root"*, and its `status` is `live`.

```
$ node tools/ecr_verify.js cr_scratch/step1_9_..._register_rows.md lsei/literature
no BEGIN/END oracle/REGISTER.tsv block in cr_scratch/step1_9_..._register_rows.md
exit=2
```

The marker is present at line 325. The regex is
`/^<!-- BEGIN oracle\/REGISTER\.tsv[^\n]*-->\n([\s\S]*?)\n<!-- END .../m` and the file's marker line
ends `-->\r\n`. **`[^\n]*` consumes the `\r`, then `-->` has nothing to match.** Every deliverable in
`cr_scratch/` is CRLF or mixed — the 1.9 blob carries 4386 CR bytes.

`check_register_rows.js` reads the same file successfully, because it splits on `/\r?\n/`.

Three consequences, in order of cost:

1. **A `live` row advertises a capability the artifact does not have.** No CL assertion catches this;
   `CL-2` checks that the path exists, not that the `asserts` cell is true. That is the honest limit of a
   register — §9 says so — but it means the `status: live` on `CHK-04` is carrying more weight than it
   can bear while `CHK-04` is also the consolidation target.
2. **`exit 2` is not in the `on_failure` vocabulary.** `block`, `refuse`, `report`, `none`, `n/a` — and
   `CHK-04` is `block`. A dispatcher reading `block` and seeing 2 will treat a *usage error* as a *check
   failure*. That direction is safe, and it is the reason I am not calling this blocking on its own. But
   the register should say it: **a non-zero exit other than 1 is a harness failure, not a finding, and
   is reported as such.** One sentence in §2 under `block`.
3. **`check_register_rows.js` has two virtues, not one.** §3.3 credits it with `require()`ing the
   upstream tokenizer. It also has the only block-lifter that works on this repository's files. The
   consolidation must carry both, and the `require()` must be **re-derived, not lifted** — it currently
   resolves through the same hard-coded absolute `ROOT`, so lifting it lifts the portability defect into
   the survivor.

**Ruling on his ruling.** Consolidation is the right fix and `ecr_verify.js` is the right survivor — it
is the only one of the three that exits non-zero on a finding, and it caught a real failure the other
one masked. **2.15 is the wrong place for the part that matters.** Two things move to now:

- **`CHK-03.invoked_by` becomes `manual`.** One cell. The gate stops running a check that cannot fail,
  eleven sub-steps early, and the register stops describing a wired silent check as acceptable. This is
  also what makes CL-5(b) into a real expiry — see R3.
- **The two 1.9 quantity blocks re-point to `ecr_verify.js`** at the moment their values are next
  touched, per the Tier 2 touch rule. Their numbers may move: `ecr_verify.js` covers B1-B7 where
  `check_register_rows.js` covers B1-B3, B6, B7. That is a matter for 1.9 and I am naming it, not ruling
  it.

The rest — deleting the files, taking `tools/` from eight to six, making `on_failure: none` unreachable
— is correctly 2.15's.

### R3. MAJOR. CL-5(b) is not an expiry. It is a permanent exemption with a name on it

He asked me directly to check "whether CL-5(b) is a real expiry or a second exemption wearing a report".
It is the second.

```
CL-5  b. every row with status `retiring` names a removing sub-step in authority,
         and the H row's retiring count is non-zero only while (b) holds
```

Test it the way I test every close condition, from 1.11: **name the observation that makes it fire.**

- Clause one requires a `retiring` row to *name* a sub-step. `CHK-03` names 2.15. It will still name
  2.15 in 2027. Nothing checks whether 2.15 happened, or exists, or ever will.
- Clause two — "the `H` row's retiring count is non-zero only while (b) holds" — is circular. It permits
  a non-zero count whenever clause one holds, and clause one holds by construction as long as the string
  is present. It constrains nothing.

**A date written into a cell is still a date.** That is my rule from 1.11 and this is the first place it
has been tested against someone else's work, and it fails. The mechanism is *strictly better* than a
paragraph — it is visible in the `H` row and a reader can count it — but visibility is a report, not an
expiry, and he named the distinction himself: "an exemption with no expiry is a permanent exemption,
which is the defect one level down."

**Replacement, and it is a condition, it is mechanical, and it fires today:**

```
CL-5  b. no row with status `retiring` names any invoker other than `manual`
         -- a check that cannot fail may not stand on a gate; retiring is permission
            to still exist, not permission to still be trusted            block
      c. every row with status `retiring` names, in authority, the id of the row that
         supersedes it, and that row's status is `live`                   block
```

Run against the register as it stands: **(b) fails on `CHK-03`** (`invoked_by: substep-gate`) and passes
on `CHK-05` (`manual`). (c) passes on both — `CHK-04` is `live`.

That is what an expiry looks like: it is red on landing day, it names one cell as the fix, the fix is
available today, and after the fix the exemption is bounded — a `retiring` row can persist, but it
cannot be *believed*, because nothing invokes it automatically and its successor must already work.

**And it makes CL-5(a) honest.** (a) currently passes because both offenders are `retiring`, which he
correctly identified as the assertion dodging its own motivating instances. With (b) as above, the pair
CL-5(a)+(b) **does** fire on the instances that motivated it — (b) does the firing, and (a) keeps
covering the case that matters after 2.15, which is a *new* silent check appearing as `live`. Two
clauses, one covering the present and one the future, and neither inert.

### R4. MAJOR. Four rows carry an invocation in the `path` cell, and CL-1 fails on `quantities.js` the day it lands

`CHK-14` through `CHK-17` have `path` values of `tools/quantities.js --check`, `--lint`, `--index`,
`--live`. Those are not paths.

§1 of the deliverable: *"An artifact with two consequences — a script with a blocking mode and a
reporting mode — has **two rows sharing one path**."* §1.1 of the reasoning: *"The closure key is the
path."* The four rows do not share a path; they hold four distinct strings, none of which is a path.

Measured, by reimplementing CL-1 and creating the file:

```
--- quantities.js lands, four rows already exist for it ---
CL-1 tools/**: 9 files, 1 uncovered -> tools/quantities.js
```

**CL-1 fails on the day 1.12's deliverable is built**, on an artifact that has four rows. `CL-2` follows
the moment those rows go `live`, because `tools/quantities.js --check` does not exist on disk. The
closure key is broken for the one artifact in the register with more than one consequence — which is the
case §1's rule was written for.

**Fix, using a convention already in this file.** `asserts` already carries a structured literal for one
kind: `marker: <literal>` on `library` rows, and §3 says it is a literal *because CL-6 greps it*. Do the
same for modes:

```
path:     tools/quantities.js
asserts:  --check: counting rule section 5 rows 1 and 2: block resolution, mandatory keys, ...
```

Zero new columns. `path` goes back to being a join key. The dispatcher (`CHK-10`) still has the argv it
needs, because it is reading the register anyway. And `CL-3` gains one clause that would have caught
this on day one: **`path` contains no whitespace.**

I checked the alternative — a tenth `args` column — against my gate. What breaks if it is deleted:
nothing that the `asserts` prefix does not cover. He cut `fires` and `owner` for exactly this reason and
he was right both times; a tenth column here would be the third.

### R5. MAJOR. `CHK-09` has two invokers wanting two consequences, which his own boundary forbids

`on_failure` is one value per row. `CHK-09` is `invoked_by: pre-commit,session-start`,
`on_failure: block`.

At session-start, §3.2 of the reasoning says the opposite: *"Neither is a mode. Both are Phase 5 report
lines. ... **the bootstrap reports it and the session proceeds**; nothing about answering a question
depends on a commit hook."* And §3.1's replacement BC-8 gives `On failure: **Report**`.

So the same artifact, failing the same assertion, must block at pre-commit and report at session-start,
and the register can only say one of them. It says `block`, which means a fresh clone with no hooks
installed — the normal state of a fresh clone, since hooks are not cloned — has a **blocking**
session-start check, and the bootstrap that §3.2 says should proceed does not.

I checked every other multi-invoker row and this is the only one:

| Row | Invokers | `on_failure` | Consistent? |
|---|---|---|---|
| CHK-01 | pre-commit, merge-gate | block | yes |
| CHK-04 | substep-gate, merge-gate | block | yes |
| **CHK-09** | **pre-commit, session-start** | **block** | **no — §3.2 says report at session-start** |
| CHK-12 | pre-commit, ci-linux | block | yes |
| CHK-14 | pre-commit, substep-gate | block | yes |
| CHK-16 | substep-gate, manual | n/a | yes |
| CHK-18 | substep-gate, ci-linux | block | yes |

**This is his own rule catching him**, and it is worth saying in his terms because the rule is good: *"a
row is one (artifact, consequence) pair ... a mode boundary drawn on consequence is the only one a
caller can act on."* Two consequences, one row. The split in R1 fixes both defects with one edit —
`--register` blocking at pre-commit and session-start, `--wiring` reporting at session-start only —
which is why I prefer it to the sentinel.

### R6. MINOR. CL-6's marker is an English phrase, and `CHK-20` is where to set the precedent

CL-6 is the best mechanism in either document and its marker is chosen badly.

`and/or` is a natural-language phrase. It appears in ordinary prose across this repository — five files,
including a corpus summary and three writing guides. Today CL-6 is exact: four true positives, three
true negatives, confirmed. It is exact because no consumer happens to contain the phrase in a comment,
and that is luck, not design. The day someone writes "the axis and/or its members" in a comment in
`ecr_probes.js`, **CL-6 blocks every commit** on a false positive, and the register's most valuable
assertion becomes the one people work around.

A reuse marker should be **impossible in prose**: `LSEI_TOKENIZER_V1`, a constant declared at the top of
the upstream module and exported. Then the marker is also a version handle, and 3.7 bumping it to `V2`
makes every stale consumer visible instead of merely un-imported.

**`CHK-20`'s marker is `-`, unset**, and §3 already forbids a `library` row going `live` with an
unresolved marker. That is the free opportunity: set the convention on `claim_bearing.js` before it
exists, and re-point `CHK-24`'s at 3.7 when the tokenizer is rebuilt and the file is being edited
anyway. Neither costs a separate edit.

### R7. MINOR. CL-6's remedy makes four checks depend on a gitignored working copy, and one of them is on `pre-commit`

`lsei/` is a working copy, gitignored (`.gitignore:18 /lsei/`), never vendored — correctly, per
`CLAUDE.md`. Nothing under it is tracked.

Today, `check_corpus_collisions.js` mirrors the tokenizer and therefore **runs without `lsei/`
present**. `CHK-01` is `invoked_by: pre-commit`. CL-6's remedy is to convert the mirror to an import.
After 3.7, `CHK-01` `require()`s a file inside a gitignored directory that the bootstrap may have failed
to acquire — and it will not fail gracefully, it will throw `MODULE_NOT_FOUND` on **every commit**, on a
machine where the clone did not happen.

The mirror is not only a defect. It is also what makes four checks independent of an untracked
dependency, and CL-6 does not say so. That does not change the ruling — a silently stale tokenizer in
`check_corpus_collisions.js`, whose failure mode is *passing on a colliding pair*, is much worse than a
loud missing module — but it is a consequence 3.7 must be handed, not discover.

**One sentence in CL-6, and one line in the 3.7 handoff:** an imported consumer must fail with a named
diagnostic when the upstream module is absent — "`lsei/` not acquired; run the bootstrap" — and must not
be dispatched by `CHK-10` when the bootstrap reported origin `app` unavailable. The bootstrap already
computes that; `CHK-10` reading it is one condition.

### R8. MINOR. HK-2 asserts the mode bit; nothing asserts the line endings, and the repository commits CR bytes

HK-2 is right and I verified its fix is durable: `git update-index --chmod=+x` records `100755`, and the
mode **survives** a subsequent edit and `git add` under `core.filemode=false` (`100755` → edit →
`100755`). I also confirmed the separation of concerns HK-2 rests on: with index mode forced back to
`100644`, `git hook run pre-commit` still exits 0 on Windows. **HK-1 passes while HK-2 fails, which is
exactly why both exist.** That is a good pair and I would not change it.

There is a second attribute in the same family, and it is not asserted:

```
core.autocrlf = true
.gitattributes: absent
ecr_verify.js blob:   182 CR bytes in 6996
1.9 deliverable blob: 4386 CR bytes
git add tools/githooks/pre-commit
  -> warning: in the working copy of 'tools/githooks/pre-commit', LF will be replaced by CRLF
```

A hook committed from this machine carries `#!/bin/sh\r`. On a Linux clone the kernel reads the
interpreter as `/bin/sh\r`, which does not exist. It fails **loudly** — the commit is blocked, per the
Orchestrator's shebang measurement — so this is minor, not blocking. But `CHK-12`'s `ci-linux` trigger,
which §3.6 says "is not optional", is the first place it lands, and it lands as *every commit in CI
blocked by a hook that cannot start*.

**This is his own instance seven, one layer over, and it is worth counting as instance nine** because it
inverts differently: instance seven is *the bytes are committed and the container's attribute is not*;
this is *the bytes are committed and the container rewrites them in transit*. Same family, third end.

Two lines close it, and both are cheaper than the assertion would be:

```
# .gitattributes
tools/githooks/* text eol=lf
*.tsv           text eol=lf
```

The second line is not decoration: `oracle/REGISTER.tsv` and `oracle/VERIFIED.tsv` are tab-separated
files parsed by `awk -F'\t'` in three published `operation:` strings, and a trailing `\r` lands in the
last field of every row. `Q-CHECK-ROWS`'s own `cmd:` is one of them.

Then HK-2 gains one clause — `tools/githooks/*` is checked out with LF — or, better and free, the
`.gitattributes` makes the assertion unnecessary and 2.14 verifies it once by running the hook.

---

## 4. The two items that cross both files

### X1. Two mutually exclusive BC-8 amendments are owed against 1.4, from one author, written the same day

This is the most important thing in this review that neither file contains.

| Source | The replacement for BC-8 | On failure |
|---|---|---|
| **1.5 §3.1 row 5** | `tools/githooks/<event>` exists, is non-empty, begins with `#!`, and contains the marker naming its check register row | (unstated) |
| **1.13 §3.1** | **Delete BC-8 as written.** `git config core.hooksPath tools/githooks` then `node tools/checks.js --wiring`, running HK-1 and HK-2 | Report; every row naming `pre-commit` reported UNWIRED by id |

Both are filed as amendments to the same assertion in the same contract. Neither mentions the other. 1.5
was written first and 1.13's §1.2 argues explicitly against exactly the form 1.5 proposes:

> "F6's own remedy — 'assert that the directory exists and holds at least one file' — is *still* a
> container check and I decline it. A directory holding a file named `precommit`, or `pre-commit.sh`, or
> `pre-commit` at mode `100644`, satisfies it and fires nothing."

1.5's form is one rung better than F6's — it names the file and checks the shebang — and it is **still**
a container check by 1.13's own ladder: a `pre-commit` file that exists, is non-empty and starts with
`#!` proves nothing about whether `core.hooksPath` resolves to that directory, whether git finds it
under that name, or whether it exits 0. `git hook run` proves all of it in one command.

**Ruling: 1.13's replacement wins**, with two carry-overs from 1.5's:

- **Keep 1.5's marker clause**, moved. "Contains the marker naming its check register row" is a good
  assertion — it is his own generalisation of my F6, *assert the thing the consumer reads at the
  granularity the consumer reads it* — but its consumer is not git, it is `CHK-10`'s dispatcher. It
  belongs in the register as a CL clause, not in BC-8: **every row whose `path` is under
  `tools/githooks/` contains the literal `CHK-` id of its own row.** That makes `CL-1`'s join
  bidirectional for hooks and costs one grep.
- **1.13's `Report`, not block** — consistent with §3.2, and see R5 for why the register row must be
  split to say it.

**Why this matters beyond BC-8.** 1.5's §1.1 is entirely about falsifier 2: *"nobody proposes a second
file, somebody proposes a harmless-looking key and the record becomes the place where facts go when
nothing else will take them."* This is the same failure in the amendment queue. Two mechanisms for one
need, both authored to be the single mechanism, neither aware of the other, because they were written in
adjacent sittings against a contract that is under review and therefore frozen.

**Recommendation to The Manager, and it is process, not content.** The 1.4 amendment set now has three
sources — my review, 1.5 §3.1 (six), and 1.13 §3.1 — and 1.5 §3.1 says explicitly that they are held
back because "applying them piecemeal would leave the reviewed text and the amended text both in
circulation." That was right. It now needs the other half: **the amendment queue is reconciled before it
is applied, and the reconciliation is one person reading all three lists against each other.** This
collision was findable only by reading both files in one pass, which is what this review was.

### X2. `literature/FIELDS.tsv` and `INDEX.tsv`: what closes it, and who owns it

**First, the fact that changes the framing.** `literature/` does not exist. Nothing under it is tracked.
The files are ignored — `git check-ignore -v` gives `.gitignore:51 /literature/**` for both — but there
is nothing there to ignore.

So "nothing has fixed this in four sub-steps of noticing it" is true and it is not urgent in the way it
sounds. **Nothing is broken today. What is owed is that the fix must land in the same edit as the
directory**, because the first person to create `literature/` and commit the corpus creates the defect
in that commit, and it will present exactly as 1.5 §1.6 predicts: the `.md` count passes, origin
`literature` reports available, the outcome is `CLEAN`, and retrieval runs field-scoped IDF against no
field map.

**What closes it: one edit, not three.** The three candidate fixes are not independent —

- `.gitignore` re-admission of the two `.tsv` files
- rows 25 and 26 of the 1.1 directory map
- BC-20, asserting a marker inside each machine-readable input and gating origin `literature`

`CHK-12` asserts that the 1.1 directory map agrees with `.gitignore`, and 1.13 §3.5 correctly notes that
**`CHK-12` passes on the defect because the map does not list the two files.** Invert that. The moment
rows 25 and 26 exist in the map, `CHK-12` **fails** until `.gitignore` re-admits them. The map is the
single point of closure; the `.gitignore` line becomes forced rather than remembered.

**So: add the map rows first.** That is the whole recommendation, and it is one edit by the person who
owns the map.

**Ownership, stated so it stops moving.**

| Half | Owner | When |
|---|---|---|
| Rows 25 and 26 of the 1.1 directory map | **The Orchestrator** (1.1 is applied, not persona-owned) | Now. It is two rows and it makes `CHK-12` do the rest. |
| The `.gitignore` re-admission | Forced by `CHK-12` once the rows exist; the Orchestrator applies it | Same edit or the next |
| **BC-20** — a marker inside each file, gating origin `literature` | **The Systems Engineer**, against 1.4, in the §3.1 edit | Owed since my F7; still owed; named as owed in both 1.5 §1.6 and 1.13 §3.5 |

**And the reason BC-20 does not drop out once the `.gitignore` is fixed**, which both files state and
which I confirm: a file can be admitted by `.gitignore` and still be absent, truncated or empty on the
disk in front of you. `.gitignore` governs what ships; BC-20 governs what is there. Two facts, two
mechanisms, and this is the case where that is correct rather than duplicative — different subject,
different failure, different session.

**One thing I will not let pass.** BC-20 has now been "owed" across four sub-steps and is listed in two
separate handoff tables as owed to the same person against the same contract. That is what an
unfalsifiable close condition looks like before anyone notices. Its close condition is a *date* in
exactly the sense R3 is about: "in the §3.1 edit". Make it a condition: **the Step 1 gate does not close
while `oracle/bootstrap_contract.md` lacks an assertion naming `literature/FIELDS.tsv`.** That is one
grep and The Manager can run it.

### X3. The `--live` cell is strong enough, with one gap that is keyed on the wrong property

I moved `--live` behind a flag at 1.11 F9 and he turned it into a register cell. Asked whether the cell
is strong enough, since a later sub-step wires triggers.

**It is stronger than the paragraph, and the reason is precise.** Four things now guard it:

| Guard | What it stops |
|---|---|
| `kind: harness` + §2's "Never on an automatic trigger" | states the rule where the row is |
| **CL-4**, blocking: no `harness` row names an automatic trigger | **a one-cell edit** — changing `invoked_by` to `pre-commit` fails CL-4 |
| CL-3, blocking: `invoked_by` tokens are in the closed set | a made-up trigger |
| CL-7, reporting: greps `child_process`/`execSync`/`eval(`/`new Function` | names the file a reviewer must open |

So breaking the ruling costs **two coordinated cell edits** — `kind: harness` → `check` *and*
`invoked_by: manual` → `pre-commit` — and the second one is reported by CL-7 rather than blocked. A
future agent wiring triggers at 2.14 cannot do it by accident, which was the whole point of moving it
out of prose. **This is the ruling surviving as a mechanism. I am satisfied.**

**The gap, and it is one sentence to close.** CL-4's guard is keyed on `kind: harness`. The property
that actually motivates the rule is stated only in §6 prose: *a check that executes a string sourced
from a repository file is not a function of the content.* A **new** row that executes harvested strings
and is honestly kinded `check` gets no blocking guard at all — CL-4 does not apply to it, and CL-7 only
reports. `CHK-17` is protected; the rule is not.

**Fix, using his own CL-5(b) device rather than a new column:**

```
CL-7  a. for every row naming an automatic trigger: report any occurrence of
         child_process, execSync, eval( or new Function in that row's file      report
      b. a row naming an automatic trigger whose file matches (a) must carry the
         literal token `exec-reviewed:<substep>` in authority                   block
```

(a) stays a worklist, which is right — it cannot distinguish `execFileSync('pdftotext', [file])` from an
executed string, and he is right not to write a sandbox for a project with ten commits. (b) turns the
reviewer's ruling into a cell, so the person who wired it had to write down that she looked, and the
sub-step is on the row. Same shape as CL-5(c). One clause, no column, and it generalises the ruling from
one row to the rule.

---

## 5. Every close condition in both files, against the 1.11 rule

The rule is mine from 1.11 and he invokes it twice, so it should be applied to all of them. **A close
condition is a condition when you can name the observation that makes it fire. A sub-step number is a
date.**

| # | Close condition | Where | Condition or date | Has a mechanism? |
|---|---|---|---|---|
| 1 | **CL-6 red until "3.7, where the mirrors become imports"** | 1.13 §4 | **Condition.** "3.7" is the schedule; the substance is *the marker no longer occurs in any consumer*. | **Yes — CL-6 itself.** It is its own detector: it goes green at exactly the moment the condition is true and cannot go green any other way. **This is the model.** |
| 2 | **CL-5(b), the `retiring` expiry** | 1.13 §4 | **Date.** Requires a sub-step to be *named*, never to have *happened*. Circular second clause. | No. See R3 for a replacement that fires today. |
| 3 | **`pdfs_present`'s deletion criterion** | 1.5 §10 | **Condition** — better than BC-7's, which I called unfalsifiable at F11. | **No observer, and inverted polarity**: it can only fire after a different rule has already been broken. See S3. |
| 4 | **§12: "if any of the three stops reading it the field is removed"** | 1.5 §12 | **Condition.** | No. Nobody is looking. Cheap to fix: it is CL-6's shape — the schema version literal must occur in `bootstrap_contract.md` and in the validator. |
| 5 | **BC-7's deletion criterion**, F11's remedy | my 1.4 review | **Condition**, once F11 gave it two runs to be observed in. | **No owner.** 1.5 §3.5's handoff to 6.1 names four assertions and this is not among them. Still unowned. |
| 6 | **BC-20** | F7, restated 1.5 §1.6, restated 1.13 §3.5 | **Date** — "in the §3.1 edit". | No. X2 gives it the Step 1 gate grep. |

**One out of six has a mechanism.** That is the finding, and CL-6 is the pattern the other five should
copy: *an assertion that is red today, whose greenness is the close condition itself.* It costs nothing
extra, because the assertion has to exist either way — the only choice is whether it is written to the
rule or written to today's state of the world. He gets this exactly right once and does not generalise
it.

---

## 6. The simplicity gate, run on both

For every field and every row: what breaks if it is deleted.

### 6.1 The install state record

Eleven field rows, four facts. I asked it eleven times.

| Field | Deleted → | Verdict |
|---|---|---|
| `schema` | Every abnormal read becomes unreachable; §6.4 cannot exist. | **Keep.** Load-bearing, and correctly read first. |
| `written_at` | The record has no unconditional timestamp; `observed_at` is absent whenever its parent is null, which is the offline case. | **Keep, fix the reason.** S7. |
| `copies.<name>.head` | The incremental drift line becomes an absolute one. | **Keep.** §1.2's "new versus standing" argument is correct and is the strongest reasoning in the file. |
| `copies.<name>.upstream` | Nothing can date a defeated push-disable. | **Keep.** This is the best field in the record. |
| `copies.<name>.observed_at` | The window has no start. | **Keep.** |
| `corpus.digest` | A standing divergence reports as new, every session, forever. | **Keep.** |
| `corpus.at_ref` | The only cross-check in the record disappears — it is compared against `copies.lsei.head` and a mismatch is a report line. | **Keep**, and it is the only field with a *detector*, which is worth noticing. |
| `corpus.observed_at` | As `copies.<name>.observed_at`. | **Keep.** |
| **`pdfs_present`** | **Nothing.** The loop probes, and the probe is more correct than the field. | **Cut.** S3. |
| `first_run.attempted_at` | The interrupted state collapses into unplayed; a half-played sequence becomes indistinguishable from none. | **Keep.** Three states, two fields is right. |
| `first_run.completed` | The sequence replays every session. | **Keep.** |

**Net: 4 facts → 3, 19 paths → 18.** One cut out of eleven. That is a tight document and I will say so:
compare the bootstrap contract, where I cut five of nineteen. The difference is that he applied a
membership rule here, and the rule mostly worked even where I think it is stated wrong.

**On §8, "What this record never holds" — seven items.** I checked whether it is closed by construction
or by enumeration, since a list of seven things somebody might propose is exactly the shape that grows
to eleven. It is closed by construction: items 1, 2, 4 and 5 are M1, M2, M3 and M3 again, restated as
prohibitions; 3 is M2; 6 is M3; 7 is the falsifier. **It is one rule stated seven ways for a reader who
arrives with a proposal**, which is a legitimate use of repetition in a contract, and it costs nothing
because every item is derivable. Keep it. But say that at the top of §8 — "each of these follows from
§2; they are enumerated because each is a thing somebody will propose" — so a successor does not add an
eighth that follows from nothing.

**On §4 rule 5, refusing unknown keys**, which he expected me to attack. **I decline, and the reason is
that the rule earns its place by what it *means* rather than by what it prevents.** A permissive parser
would ignore an unknown key harmlessly. Rule 5 exists because in a single-writer record an unknown key
is *evidence about the writer*, and the record is the only thing positioned to notice. That is a real
detector and it costs one set membership per path. My only change is S1's ordering, which is about when
it runs, not whether.

### 6.2 The check register

Eight columns, twenty-four rows. He ran the gate on the columns himself, column by column, and I agree
with all eight — including the two he cut, `fires` and `owner`, both correctly.

On the rows, the closure rule does the gate's work for me: every file under a scan root must have a row,
so "what breaks if this row is deleted" is answered by CL-1 for eight of the twenty-four. For the rest:

- **`CHK-20` and `CHK-24`, the two `library` rows he expects me to attack.** **Keep both**, and the
  defence is measured rather than argued: CL-6 over `CHK-24` gives four true positives and three true
  negatives with one grep, and the four positives include `check_corpus_collisions.js`, whose failure
  mode is *passing on a colliding pair*. A row whose only job is to be a grep target is still a mechanism
  if the grep blocks, and it does. `CHK-20` is the same rule installed **before** the second opportunity
  to make the mistake rather than after, which is the single best decision in either document. My only
  change is R6's marker convention.
- **`CHK-02`, `CHK-06`, `CHK-08`, three `harness` rows, `manual`, `report`.** These settle arguments and
  stand no guard. Deleting them loses the numbers behind three rulings and the ability to re-run them.
  **Keep**, and the `harness` kind is what stops a future reader mistaking them for guarantees — which is
  E1's defect, and this is the column that closes it.
- **`CHK-07`, a `fixture` row for a JSON data file.** **Keep**, and for the reason §1.3 gives: it exists
  so that the population rule stays a directory listing with no judgment in it. A rule with judgment in
  it is re-litigated by every future author. That is the same argument as `.gitignore`'s deny-by-default
  and it is correct in both places.
- **`CHK-03` and `CHK-05`, the two he would rather delete than defend.** R2. Delete at 2.15; **change
  `CHK-03`'s `invoked_by` to `manual` today.**

**Rows that are missing, and one is under a scan root.** 1.5 §10 names `oracle/verify_corpus.js` (2.17)
as a consumer of the state record. `oracle/**/*.js` is a declared scan root. **There is no row for it**,
and 1.13 contains no occurrence of `verify_corpus`, `install_state` or `oracle-state`. Same for the
state schema validator that 1.5 §12 names as one of three readers of the schema version, and for
whatever reads `oracle/VERIFIED.tsv` for BC-11.

By §7's landing rule this is not yet a defect — "a check is not landed until its row exists" — and CL-1
will catch them the day they land, which is the mechanism working. But the register carries fifteen
`specified` rows precisely to enumerate debts in advance, and these three are specified in a deliverable
written the same day. **Rows 25, 26 and 27 are owed**, and the fact that neither file mentions the other
is the same coordination gap as X1.

---

## 7. Where he is right, said plainly

I said at 1.4 that spending a review's credibility on the wrong target is performing the tension rather
than using it. The same applies to withholding agreement.

**The artifact-not-assertion boundary is right, and I own the thing that would otherwise be the index.**
§1.1's argument is correct: roughly 260 claims are specified across Step 1, and a 260-row register would
be a second copy of my suite with a column nobody maintains. E8's complaint — "nothing invokes the
checks" — is a sentence about a file. The unit is the invocation. **And the refinement is mine, correctly
applied**: he took my `quantities.js` three-mode ruling and generalised it to (artifact, consequence),
which is the right generalisation and it is why `CHK-17` can be a cell rather than a paragraph. R4 and R5
are that rule being applied incorrectly in two places, not the rule being wrong.

**CL-1 works. I tried to break it and it broke correctly.** Adding an unregistered file to `tools/`
produces `9 files, 1 uncovered -> tools/_cl1_probe.js`. The complement is genuinely computed and the list
is genuinely closed rather than merely complete, which is the distinction §1.3 draws and it is a good
one. He also states its limit — a check outside every declared root is invisible — without dressing it
up, and the defence (a root is one `S` row in the file being reviewed) is honest about being a shorter
distance to visibility rather than a proof.

**The three-layer hook analysis is better than my F6 and he is right to decline my remedy.** I
recommended asserting that the directory exists and holds a file. A directory holding `pre-commit.sh`, or
`pre-commit` at `100644`, satisfies my form and fires nothing. `git hook run` tests resolution,
existence, filename, executability and exit code through git's own code path, in one line. **He took the
finding and rejected the fix, which is the correct response to a reviewer who identified the right defect
and the wrong repair**, and it is the third time in this project the two of us have arrived at the same
rule — assert the thing the consumer reads, at the granularity the consumer reads it — from opposite
ends.

**HK-3, the canary, is the best three lines in either document.** `--no-verify` skips `pre-commit` and
does not skip `post-commit`; consumption makes the detection exactly-once and correct for root commits,
merges and amends with no parent arithmetic. It cannot prevent a bypass and he says so. The committer
here is frequently an agent in a shell and `--no-verify` is exactly the shortcut a blocked agent takes.
**I would have missed this.**

**§3.4 is the standard.** He wrote CL-5, implemented it, ran it against his own register, found that the
assertion whose entire subject was two silent checks had been scoped so neither could trip it, and
reported it against himself before handing over — and then rewrote the deliverable's claim to match the
run rather than the intention. R3 says his fix is not an expiry. It does not touch the finding, which he
made and I did not.

**§1.6's measurement is exact and its restraint is correct.** He separated "a new instance" from "a
measurement of an existing one" and refused to inflate E5's mirror from one to four by calling it new.
Four mirrors, four true positives, three true negatives, one grep, sorted-set sha1 agreement across all
five — I reproduced the census and it is right to the file.

**And on 1.5: §1.2 is the strongest reasoning in either document.** Noticing that loose end E12 applies
to the corpus digest by exactly the same argument as the ref, when it was filed against the ref alone and
nobody had seen the second half, and then closing both rather than closing one and inheriting the other
— that is the discipline this method is for. The containment paragraph that follows it is the best
sentence in the file: *a wrong currency field cannot produce a wrong drift verdict, and a wrong corpus
field cannot hide a divergence.* That is what makes these two fields safe to hold at all, and it is why
S5's repair of M1 leaves both of them admitted.

**The keystone is right and it should survive every edit in this review.** "This file is safe to delete"
is the single sentence that keeps the record from becoming a second authority, and every finding I have
made against 1.5 is either an application of it (S4's retry-then-report) or a place where it is stated
more strongly than it holds (S8). None of them is an argument against it.

---

## 8. Handoffs

| To | What |
|---|---|
| **The Systems Engineer**, 1.5 | **S1 and S2 are blocking and both are ordering, not design** — split §4 into a parse gate and a shape gate, interleave the version branch, and make rule 4 conditional on parent nullability. **S3 cuts `pdfs_present`**; `Q-STATE-FACTS` 4→3 and `Q-STATE-KEYS` 19→18, one edit inside your own file, no two-homes problem. **S4** is measured `EPERM` and your keystone already dictates the fix. **S5 and S6** repair M1 and M3 with your own keystone; the count stays three and every ruling you made survives except `pdfs_present`. S7 and S8 are one sentence each. |
| **The Systems Engineer**, 1.13 | **R1 is blocking and I built it** — `CHK-09` split into `--register` (pre-commit, session-start, block) and `--wiring` (session-start, report) fixes R1 and R5 together, and `--wiring` is already the name in your own 2.14 handoff. **R2**: the ruling is right, `ecr_verify.js` is the right survivor, **2.15 is the wrong date for `CHK-03.invoked_by`** — one cell, today. Its markdown lifter is broken on CRLF and its `require()` path is not portable; the consolidation must carry `check_register_rows.js`'s block-lifter as well as its import, and re-derive the path. **R3**: CL-5(b) is not an expiry; the replacement fires today on `CHK-03`. **R4** is measured — CL-1 fails on `quantities.js` the day it lands. |
| **The Manager** | **X1: two mutually exclusive BC-8 amendments are owed against 1.4 by the same author.** 1.13's wins; 1.5's marker clause moves into the register as a CL clause. More generally the 1.4 amendment queue now has three sources and needs reconciling before it is applied, by one person reading all three lists against each other — this collision was findable only by reading both files in one pass. **X2**: BC-20's close condition is a date; make it the Step 1 gate grep. |
| **The Orchestrator** | **X2, and it is one edit, not three: add rows 25 and 26 to the 1.1 directory map first.** `CHK-12` then fails until `.gitignore` re-admits the two `.tsv` files, which forces the second half instead of relying on memory. `literature/` does not exist yet, so nothing is broken today and the fix must land in the same commit as the corpus. **Separately: the ratified 1.9 lunar rows carry a live `B6` failure** — `ecr_verify.js` exits 1 on them — and the Step 1 verification records "0 failing, all assertions pass" on `check_register_rows.js`'s exit 0. That line needs correcting and 1.9 needs the finding. |
| **The Space Resources Engineer**, 1.9 | Your rows fail `B6` under `ecr_verify.js`: `LCC-10` holds `nasa-2025-fission-surface-power-directive.md` and the cluster also holds `nasa-2025-moon-to-mars-architecture-add-revc.md`. `check_register_rows.js` printed it and exited 0. Also, `Q-LCC15-KEYS` and `Q-LCC15-KEYS-DEAD-K2` name a `script:` operation that hard-codes an absolute path and cannot be re-run on any other install; they re-point to `ecr_verify.js` at the next touch, and the covered assertion set differs (B1-B7 versus B1-B3, B6, B7), so the values may move. |
| **The Designer**, 1.12 | **X3: the `--live` cell is strong enough** — breaking it costs two coordinated cell edits, one of which CL-4 blocks. The gap is that CL-4 is keyed on `kind: harness` rather than on the property that motivates it, so a *new* row that executes harvested strings and is honestly kinded `check` has no blocking guard. `CL-7(b)` in X3 closes it with an `exec-reviewed:<substep>` token in `authority` — his own CL-5 device, no new column. |
| **2.14** | `CHK-09` must be split before you wire anything, or the pre-commit hook recurses on every commit (R1). Add `CL-8`: no row naming `pre-commit` may contain the literal `git hook run pre-commit`. Commit `.gitattributes` with `tools/githooks/* text eol=lf` before installing the hooks, or the hook is checked out with `#!/bin/sh\r` and blocks every commit on Linux (R8). `git update-index --chmod=+x` is durable across edit and re-add — verified. |
| **2.15** | Delete `check_register_rows.js` and `ecr_keycheck.js`; `tools/` goes eight to six. The survivor needs three things from the deleted files and the ruling names only one: the `require()` of the upstream tokenizer, **the CRLF-tolerant block lifter**, and a `require` path that is not absolute. |
| **3.7** | CL-6's close condition is the model close condition in this project and I want that on the record. Two things it does not say: the marker should become a sentinel constant rather than the English phrase `and/or` (R6), and converting four mirrors to imports makes four checks depend on a **gitignored** working copy, one of them (`CHK-01`) on `pre-commit` (R7). An imported consumer must fail with a named diagnostic when `lsei/` is absent. |
| **6.1**, bootstrap acceptance suite | Four fixtures, and two of them replace fixtures the deliverable currently specifies. **(1)** Future-version instance = valid instance, `"schema": 2`, **plus one added key**; assert zero bytes written. The published fixture cannot catch S1. **(2)** Null instance — `copies.cr-agents: null`, `corpus: null`, `first_run: {ts, false}` — must validate; the published fixture has no nulls and cannot catch S2. **(3)** Idempotence: two runs, no upstream movement, every field byte-identical except the **four** timestamps, non-decreasing (S7). **(4)** Rename under a held read handle: `EPERM` produces a report line and the session proceeds (S4). Plus F11's still-unowned BC-7 fixture: clone twice into the same root, once with the setting and once without. |
| **1.6**, currency policy | `copies` enumerates its two members **by name** in the path set, so a third working copy is a schema version bump, not a configuration change. If 1.6 wants `VERIFIED.tsv` to carry more columns, note that its `cmd:`-style consumers parse it with `awk -F'\t'` and there is no `.gitattributes` — see R8's second line. |

---

## 9. What I did not find

Stated because a review that reports only defects is not measuring anything.

I looked for a fourth blocking finding in 1.5's §6 read behaviours and there is none: §6.2, §6.3 and
§6.5 are each correct in isolation and the only defect is the ordering that binds them (S1). I looked
for an inflated count in the register — twenty-four rows for a repository with eight tracked scripts —
and found none: eight are files that exist, fifteen are debts the register labels as debts rather than
reporting as coverage, one is upstream, and §7's landing rule states the ratio plainly. I looked for a
fixture the register claims and does not have, and the `H` row's `24 / 7 / 15 / 2` parses correctly. I
looked for `Q-STATE-KEYS` to be wrong and it is right — nineteen paths, walked, and I walked it again.

And I looked hard at whether `oracle/VERIFIED.tsv` at 1.5 §9 is a second store, because that is the
falsifier the whole document is defending against. **It is not**, and the proof he gives is the right
one: a fresh clone that has never run the bootstrap has the first and not the second, which is the case
that distinguishes two facts from one fact in two places. That is the correct test and I would not have
constructed a better one.

---

*The Software Engineer, review of sub-steps 1.5 and 1.13.*
