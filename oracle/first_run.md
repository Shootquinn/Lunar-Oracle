# The first-run sequence mechanism — sub-step 6.6

**Mechanism version: 1.**

**This file specifies whether the sequence plays. It does not specify what the sequence says.** The
content is The Writer's, at sub-steps 6.7 through 6.10. The handoff is a single named boundary:

> The mechanism decides whether the sequence plays. The content decides what it says. Neither reaches
> into the other.

That boundary is asserted rather than promised. `oracle/tests/bootstrap_suite.md` **BFR-4** measures
it: the gate was computed on 24 mutation cases and not one of them read, rendered or referenced a word
of the sequence. **A mechanism that cannot be tested until the prose exists is the ordering this
sub-step exists to prevent**, and if a later change makes the gate depend on the sequence's length, its
beat count, or whether its haiku parses, BFR-4 goes red and this paragraph is the reason.

Where this file and `oracle/bootstrap_contract.md` §3 Phase 7 disagree, **the contract is the
statement and this file is the bug.** This file expands Phase 7; it does not amend it.

---

## 1. The gate

Two conditions. **Both must hold.** The gate is a conjunction of two independently observable facts,
neither of which is a judgement.

| | Condition | Read from | Observable by |
|---|---|---|---|
| **G1** | The first-run flag is unset. | `.oracle-state.json` → `first_run.completed` is `false` | `BFR-2`, `BFR-5` |
| **G2** | The in-force mode set contains no member of the blocking set. | Phase 4's computed mode set, intersected with `{offline, present-but-wrong, partially-acquired}` | `BFR-1`, `BFR-3`, `BMD-11` |

```
plays  ==  (first_run.completed == false)  AND  (modeSet ∩ BLOCKING == ∅)
```

**G2 is an intersection against an enumerated set, never a test for "a successful bootstrap".** That
phrasing is what the enumeration replaced, and the reason is stated at §5 of the contract in its own
words: *a gate phrased as a judgement cannot be tested, which is how the earlier phrasing acquired its
defect.* Two readings of "successful" gave opposite answers on a dirty working copy — the normal case
on this author's machine, not an edge case — and neither reading was written down.

`3 [Q-BLOCKING-MODES]` of `5 [Q-DEGRADED-MODES]` block. **The two figures are different figures and
have been collapsed at least twice on the record**: `lunar-oracle-gameplan.md` L674 reads "five
blocking modes, not six" and `cr_scratch/step0_writer_register_spec.md` §3.6 reads "his six degraded
modes". The correction that was actually made demoted `missing-recoverable` from the degraded set,
six to five, and left the blocking subset at three throughout. `BMD-10` and `BMD-11` assert the two
separately so the conflation cannot survive in a mechanized form.

### 1.1 The blocking set, and why these three

| Mode | Blocks | Because |
|---|---|---|
| `offline` | **yes** | The copy is absent. A class of question the system advertises cannot be answered at all. |
| `present-but-wrong` | **yes** | Something is there and it is not what the contract expects. |
| `partially-acquired` | **yes** | Exactly one of the method and the model is present, and neither is the optional one. |
| `moved-on` | no | A system that works and is a week stale still works. Reported, never hidden. |
| `dirty-or-diverged` | no | The author edits `lsei/` in another window most days. An answer computed against a local variant says so on its face; that is a trace obligation and not a refusal. |

**One measured qualification on the rationale, because it is stated in §5 as a universal and is not
one.** The blocking set's stated test is *"in this mode, is there a class of question the system
advertises and cannot answer?"* `BMD-4` produced `present-but-wrong` by removing `<stage>/lsei/.git`
and leaving the working tree intact: the mode fired, the gate closed, and **origin `app` stayed
available and `refused_verdicts` was empty** — the model file was intact, so every question the system
advertises was still answerable. The gate answer is right for a different reason than the one §5
gives: an install whose provenance cannot be established is not an install to introduce yourself on,
whether or not it can compute. The partition stands; the sentence under it is narrower than it reads.

### 1.2 What the gate is not

- **Not a gate on the bootstrap.** Phases 1 through 6 run every session, whether or not the flag is
  set and whether or not anything was cloned. Only Phase 7 is gated. `BFR-2` measures this: with
  `first_run.completed: true` the sequence did not play and the outcome was still `CLEAN`, both copies
  still verified, both refs still read, the mode set still computed. The natural mistake this
  ordering exists to prevent is gating the whole bootstrap on the flag, reasoning that setup is
  already done — after which a working copy deleted last Tuesday is never noticed again.
- **Not a gate on answering.** A session that does not play the sequence answers exactly as one that
  does. The two mechanisms share the mode set and nothing else.
- **Not a precedence rule.** The in-force modes are a **set**. No precedence is defined between them
  because nothing here chooses one: the report lists the set and this gate tests it for intersection.
  Testing the set for *equality* with a blocking mode is `BMD-11`'s named mutation — a set holding
  both `dirty-or-diverged` and `offline` then passes.

---

## 2. The fields, and the three states

The gate reads `first_run` and nothing else. **`.oracle-state.json` is the only store**, at the
repository root, machine-written, gitignored, per-install.

```
"first_run": {
  "attempted_at": <ISO 8601 UTC "YYYY-MM-DDTHH:MM:SSZ" | null>,
  "completed":    <boolean>
}
```

| State | `attempted_at` | `completed` | Meaning | Plays? |
|---|---|---|---|---|
| **unplayed** | `null` | `false` | No sequence has begun on this install. | yes, if G2 |
| **interrupted** | timestamp | `false` | A sequence began and did not finish. | yes, if G2 |
| **done** | timestamp | `true` | A sequence played to completion. | **no** |

**Three states, two fields, two writes — and the two writes are what make the middle state
expressible.** Phase 7 writes `attempted_at` **before** the sequence and `completed` **after** it. A
single write cannot express *interrupted*, and *interrupted* is the ordinary outcome of a session
somebody closed. `BFR-5` observes all three.

`attempted_at` means **when the last attempt began**, never *when the sequence played*. An interrupted
sequence replays, so the field is overwritten on each attempt.

**The gate is `completed`.** `attempted_at` gates nothing; it exists so that a half-played sequence is
distinguishable from an unplayed one, and `install_state.md` §8 rule 6 would delete it if that reader
went away.

### 2.1 The five abnormal reads, and what each does to the gate

`install_state.md` §6 owns these. What they do **here**:

| Read | §6 | Gate |
|---|---|---|
| Absent | 6.2 — first install | `first_run` is `{null, false}`. Plays if G2. |
| Corrupt | 6.3 — report, rewrite, never crash | The rewrite loses `completed` and the sequence replays. **Accepted, and stated rather than discovered:** replaying costs a minute, suppressing wrongly is the failure that made this file gitignored. |
| Future schema | 6.4 — report and **refuse** | `ABORT (Phase 5, ST-3)`. **Phase 7 does not run at all**, so the gate is not evaluated and no field of `first_run` is read. Reading `completed` out of a version we do not understand is a guess, not caution. `BSR-4` measures zero bytes written on both future fixtures. |
| Older schema | 6.5 — migrate | `first_run` is carried forward when present and treated as `{null, false}` when absent. A record from an older schema without the flag has never played a sequence, because the flag has existed since schema 1. |
| Orphaned `.tmp` | §7 | Reported and deleted. It is evidence that a previous session died mid-write — which Phase 7's two writes make likelier than any other phase — and evidence of nothing else. |

**The unreadable case errs toward playing.** `install_state.md` §10 states it for this consumer in
those words: *absent or unreadable ⇒ the sequence plays*. Erring toward playing is the cheap
direction; the expensive direction is silent suppression, which is `completed`'s worst wrongness and
whose only remedy is deleting the file.

---

## 3. The suppression rule

**A degraded bootstrap leaves the flag unset.**

Not "sets it to a special value", not "sets it and schedules a replay". Unset. Neither field is
written when the gate closes on G2, and `BFR-3` measures this across six independent blocking
conditions — `BMD-1`, `BMD-2`, `BMD-4`, `BCT-1`, `BCT-2`, `BCT-3` — every one of which reported
`flag_unset: true` beside `plays: false` and wrote nothing.

**The reason is not tidiness.** A whimsical introduction to a system that is about to refuse every
quantitative question is worse than no introduction, and it burns the one first impression the project
gets. The sequence is the install's introduction, and an install that does not work has not yet been
introduced.

**What plays instead is not this mechanism's to specify, and one property of it is.** The replacement
is the content author's — 6.7 through 6.10 — and this file names exactly one structural requirement,
because it is a fact about the mechanism rather than a preference about the prose:

> **The flag stays unset, so the introduction is still owed.** Whatever is emitted in a degraded
> bootstrap must not be a shortened, apologetic or partial form of the sequence, because the sequence
> has not played and will play in full later. A user who has seen half of it and then sees all of it
> has been shown a broken system twice.

The ordering when the gate opens is fixed here and only here: **the sequence first, then the status
line on its own plain line.** The status line is never folded into the sequence. A status read after
the convention is established is a status line; read before it, it turns the introduction into a
footnote to a warning.

---

## 4. Per install, not per person

**A second clone on a second machine plays again. That is correct.**

The sequence introduces an **install**, not a person. The flag lives in `.oracle-state.json`, which is
per-install, at the root, and gitignored. Every alternative location fails, and each fails in a way
worth recording so that it is not re-proposed:

| Location | Fails because |
|---|---|
| In the gameplan | The gameplan pushes. A committed flag suppresses the introduction for **everyone who clones after the author's first run** — the exact opposite of the intent. |
| In `cr_scratch/` | Also pushed. Same failure. |
| In the OS temp directory | Where the prototype correctly puts its *run log*, because a run log is per-run. Temp is cleared, so the sequence would replay at unpredictable intervals forever. |
| In the user's home directory | A second clone into a different folder then believes it has already run, and a genuinely fresh install gets no introduction. |

Per-install, at root, gitignored is the only location where *once* means what a user means by it.

**This is also why the flag must be un-committable rather than merely uncommitted.** The `.gitignore`
rule names the path and reads no field; it is not a consumer of this record.

---

## 5. The opt-out

**A documented opt-out exists, it is set deliberately by the author, and it is not a shared flag.**

```
first_run_optout        an empty file at the repository root, named exactly `.oracle-no-intro`
```

**Rules, all four load-bearing.**

1. **It is a file the author creates, and nothing in this project ever creates it.** The bootstrap
   writes exactly one file (§8 rule 5 of the contract) and this is not it. A mechanism that could
   create the opt-out could suppress the introduction without being asked, which is the failure the
   whole per-install design exists to prevent.
2. **It is gitignored**, for the same reason the state record is: a committed opt-out suppresses the
   introduction for every cloner.
3. **It is a third gate condition, not a fourth state of the flag.** `first_run` keeps three states.
   Folding the opt-out into `completed` would make a deliberate human choice indistinguishable from a
   sequence that played, and the two have different remedies — one is undone by deleting a file the
   author made, the other by deleting a file the machine made.
4. **The report says the opt-out is in force**, on the same plain status line, every session. An
   opt-out nobody can see is a setting that outlives the reason it was set.

```
plays  ==  (first_run.completed == false)
       AND (modeSet ∩ BLOCKING == ∅)
       AND (not exists <root>/.oracle-no-intro)
```

**The opt-out does not suppress the status line and it does not suppress a degraded-bootstrap notice.**
It suppresses the introduction, which is the only thing it was asked to suppress. A degraded
bootstrap reports its degradation whether or not the author has read the introduction before, because
the notice is about this session and the introduction is about this install.

---

## 6. What this mechanism never does

Closed, because each item is a thing somebody will propose as a convenience.

1. **Never sets the flag from any phase but Phase 7**, and never before the sequence has played to
   completion under a non-blocking mode set.
2. **Never reads any field of the state record except `first_run`.** `pdfs_present`, `copies` and
   `corpus` have their own readers and this is not one of them.
3. **Never stores the mode set, the blocking-set membership, or the gate result.** All three are
   derived, and `install_state.md` §8 rule 1 forbids storing a derivation beside its inputs. `BSH-5`
   measures the equivalent for the origin set: recomputed on all 24 runs, written nowhere.
4. **Never gates any phase but 7.**
5. **Never makes the gate depend on the sequence's content**, in any form: not its length, not its
   beat count, not whether its haiku parses. `BFR-4` is the assertion and this is the sentence it
   enforces.
6. **Never shortens the sequence.** It plays whole or it does not play.
7. **Never writes a second store for the flag**, in any file, under any name.

---

## 7. Assertions

Every row here is measured in `oracle/tests/bootstrap_suite.md` §7 and §6. This table is the index,
not a second set of claims.

| Id | Asserts | Falsified by | Suite row |
|---|---|---|---|
| FR-1 | G1 and G2 both satisfied ⇒ the sequence plays | A first install with an empty mode set that does not play | `BFR-1` |
| FR-2 | `completed: true` ⇒ does not play, and the rest of the bootstrap still runs in full | A session that skips verification because the flag is set | `BFR-2` |
| FR-3 | Any blocking mode ⇒ does not play **and the flag stays unset** | A degraded run that writes either `first_run` field | `BFR-3` |
| FR-4 | The gate is computable with the content absent | A gate that reads the sequence text | `BFR-4` |
| FR-5 | The three flag states are distinguishable, and Phase 7 writes twice | A half-played sequence indistinguishable from an unplayed one | `BFR-5` |
| FR-6 | A future schema version does not evaluate the gate at all | A future-version read that reports a `first_run` value | `BSR-4` |
| FR-7 | The opt-out is a third condition and never a fourth flag state | An opt-out written into `completed`, or a `first_run` carrying a fourth state | **owed** |

**FR-7 has no suite row.** The opt-out is specified here for the first time and
`oracle/tests/bootstrap_suite.md` was written before it; adding a row to that file is within this
wave's TDD allowance and is not taken, because the mutation — create `.oracle-no-intro`, assert the
gate closes and the flag stays unset — is one line and belongs beside the other four gate rows rather
than as an appendix. **Owed, named, and not counted as covered.**

---

## 8. Version

The version is a monotone integer. Any change to the gate, to the field set it reads, to the
suppression rule, or to the closed list at §6 increments it. Two things read it:

1. This file carries it.
2. `oracle/tests/bootstrap_suite.md` §7 asserts against the mechanism this version describes.

**If either reader stops reading it, the field is removed rather than left as decoration.** That is
`oracle/bootstrap_contract.md` §10's rule applied to itself one level down, and it is stated because
§10 had three readers of which two did not exist for eleven sub-steps.

```
apparatus: check rows +0/-0 | amendment rows +0/-0 | quantity ids +0/-0 | tests +0/-0
```
