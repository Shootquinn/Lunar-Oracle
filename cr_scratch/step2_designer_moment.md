# Step 2 Wave 1 — The Designer — the moment

Sub-step 2.20. `COUNTING_RULE.md` §3 rule 11 required a failure count to carry its command and not
its moment. That is amended. Version 4 of the contract is applied in the file; the version integer
still reads 3 and §13 says why, at AM-151.

Every count in this document carries its own read-digest, because a document arguing that counts
carry their moment and not doing it would be the sixth instance of the pattern it is about.

---

## 1. Premise check — the first deliverable line

| # | Premise as stated in the brief | Held? | What was measured |
|---|---|---|---|
| P1 | §3 rule 11 requires the command and not the moment | **HELD** | Rule 11 as written required the pattern and its anchoring and named no moment of any kind. Read at `COUNTING_RULE.md` lines 279–287 before amendment. |
| P2 | `--check` is at the standing twelve after the Cycle A boundary regeneration | **HELD AT THE MOMENT IT WAS WRITTEN, AND NO LONGER** | 12 hard failures at read-digest `183e6319ddb1345d` over 90 files. **17** at `8db4418033b2bdb5` over 95 files, forty minutes later. Both correct. §3 below. |
| P3 | `QUANTITIES.md` carries a correct `M7` beside two values its promoted authorities contradict | **HELD, AND UNDERSTATES ITSELF BY ONE AND BY EIGHT** | `OK M7 the index declares its own size correctly (97)` while `--check` reports 105 blocks parsed. §4 below. |

**P2 is the premise that refuted itself inside the sub-step, and it did so unprompted.** It was true
when the orchestrator wrote it and it was true when I measured it. It stopped being true while I was
amending the rule that exists because it stops being true. I did not stage that; The Engineer landed
`cr_scratch/step2_engineer_dispositions.md` in the same wave, it carries two blocks with a `class`
outside the closed five and no `cwd:`, and the index went stale behind it. Five new hard failures,
none of them mine, at a digest I can name.

**Without the digest, the only reading available to a reader of this document is that my amendments
broke five checks.** With it, the two figures are declared incomparable and the cause is visible in
the stamp. That is the whole argument for the mechanism and I did not have to construct the case.

---

## 2. The measurements, each with its moment

| Figure | Value | read-digest | files | tool / flags |
|---|---|---|---|---|
| `--check` FAIL, before my edits | 12 | `7a99743a12a7de48` | 88 | 2.19-1 `--check` |
| `--check` FAIL, after my edits, before the dispositions file | 12 | `183e6319ddb1345d` | 90 | 2.19-1 `--check` |
| `--check` FAIL, after the dispositions file | 17 | `8db4418033b2bdb5` | 95 | 2.19-1 `--check` |
| `--check` FAIL, same tree, one flag added | 22 | `e06bc06118fa6218` | 88 | 2.19-1 `--check --include-superseded` |
| `--lint` findings | 64 | `8db4418033b2bdb5` | 95 | 2.19-1 `--lint` |
| `--amendments` hard failures | 0 | `bfc293a21d0a4b6a` | 64 | `check_registers.js` 2.19-1 |

Three of these are the number 12 or the number 17 for `--check` and none may be differenced against
another. The first two carry different digests and I moved the set myself between them, so under §2's
exception that pair is an experiment and its delta is a result: **my amendments cost the check
nothing.** The second and third carry different digests and somebody else moved the set, so that pair
is not a delta at all. **The discriminator is who moved the set, not the size of the difference**, and
that clause is the thing that keeps the rule from forbidding every before/after experiment this
project runs — including §8's own corpus table, which is a controlled before/after and is now
explicitly licensed rather than accidentally illegal.

The `--amendments` digest is over 64 files and is **not** comparable with any figure above; the two
instruments walk two different sets. The Software Engineer's implementation already prints that
warning on its own stamp line, unasked, which is the right instinct.

---

## 3. Task 2 — the ruling on the form

**It is not a thirteenth key. The block still carries twelve.** The read-digest is a required
extension of `at:`, plus a clause of §3 rule 11 for counts that will never have a block.

R-4's finding was that *a closed set with a missing member does not stop authors, it routes them into
the wrong member silently* — six of seventeen amendments were forms that did not exist and four had
already been invented in the wrong slot. **This is the complementary case and it takes the
complementary answer.** `at:` is already defined as the moment field: "ISO date, then the short ref of
every repository the measurement depended on." A thirteenth key named `moment`, sitting beside that,
is a closed set with a **duplicate** member. A missing member routes every author to one wrong slot,
which is at least a consistent defect a grep can find; a duplicate member routes authors to either
slot on a coin flip and nothing finds that at all. The twelve stay twelve, standing clause 6 stays
true across the project, and no 143-site rewrite is proposed.

**The evidence that `at:` is the slot is that `at:` was already the invention in the wrong shape.**
Every `at:` field in this project names refs for `lsei/` and `cr-agents/` — two trees §8 says this
contract does not walk — and names nothing whatever for the working tree that all fifteen mechanized
clauses do walk. No author chose that. The field reached for a state token and found only the tokens
that exist. **The read-digest is a ref for the one tree that has none.**

**The killer measurement for "the date is enough".** `Q-D219-FILESET-PRE` states 76 files, `at:
2026-08-28`, under the operation `node tools/quantities.js --files-only | wc -l`. That command
returned 88 on 2026-08-28, and 96 by the time this file was written. Same id, same command, same ISO
date, twenty files apart. `at:` has a resolution of one day; the set moves in minutes.

---

## 4. Task 3 — supply or demote, in one paragraph

**This is SUPPLY, and the test is not close.** My rule is: supply when somebody was already writing in
the empty slot, because the invention is the evidence of demand; demote or delete when the check
produces findings no author was working around. Two independent authors were already writing here.
The Systems Engineer wrote the rule in prose — *"a count taken while another seat holds a write is not
a verdict"* — which is correct, unenforceable, and a thing a person must remember, the exact signature
of a form that does not exist. And every `at:` field in the project is the second invention, reaching
for a state token and settling for refs to trees this contract does not govern. Against that, four
seats produced 12, 13, 14 and 12 in one cycle, each working around the gap in a different direction,
and a fifth pair — 12 and 17 — was produced inside this sub-step without anyone trying. Demote is the
disposition for a check whose findings nobody was working around; here the check did not exist and
four seats were working around its absence. Supply the form.

**A second and separate ruling: M16 is a LINT, not a FAIL.** M16 fires today on eight blocks and
**every one of the eight is mine**, in `cr_scratch/step2_designer_file_set.md`, a frozen deliverable
outside this sub-step's write set. Eight of eight. That is the fifth recorded instance on this project
of an author producing the defect at the highest rate while writing its countermeasure, and I am
reporting it rather than letting a reviewer find it. If M16 were a FAIL the hard-failure count would
move from 12 to 20 in the deliverable whose subject is that the hard-failure count keeps moving, and
by §8's own argument a checker whose first run reports a wall the reader must discount is a checker
that gets switched off. The eight are AM-150. M16 graduates to FAIL when that row closes; the
graduation is not scheduled, because a check that promotes itself on a date is a check nobody
re-measured.

**What the form does not do, stated here rather than discovered later.** M16 asserts that a digest is
*present*, never that it is the *right* one. An author who pastes a stale digest passes it. That is
the same limit H7's Limit 2 records for M15 — a relayed number that is simply wrong is invisible — and
the theory under both is identical: writing the token forces the run, and the run is where the stale
figure is caught. A forcing function on a person, not an assertion by a script.

---

## 5. Task 4 — the one measurement that overturns my own `literature/` ruling

My Cycle A ruling was that `literature/**/*.md` stays in the CHECK population unconditionally, on the
measurement that the corpus costs the check nothing. **It stated no overturning condition, and it was
taken against a staged copy at a read-digest that no longer exists.** Both are now in §8.

**The measurement: the count of `--check` FAIL lines whose path lies under `literature/`, at the
post-Wave-3 read-digest.** It is 0 today and 0 on the staged merge, necessarily — there was nothing
there to fail. Wave 3 writes `## Provenance` blocks into all of it and makes the claim falsifiable for
the first time.

**A non-zero count is not by itself the overturn.** A provenance block missing a required key *should*
fail M1; that is the ruling working exactly as argued. **The ruling is overturned by any FAIL line
under `literature/` not traceable to a block or a tag a seat of this project wrote** — a hard failure
produced by transcribed prose somebody else wrote. One such line is one too many, because §8's whole
standing argument is that a checker reporting failures the reader must know to discount is a checker
that gets switched off. On that measurement `literature/**/*.md` leaves CHECK and §8 is reversed in
place.

**Who takes it: the seat that lands the provenance blocks, in the edit that lands them.** Not a
reviewer afterwards, not a gate, and not me — I cannot take it. That is Tier 2's touch rule turned on
a ruling instead of on a quantity, and for the same reason: the only cheap moment is the one where
somebody already has the context loaded. Taken twice, before and after, both runs reporting their
digest; the measurer moves the set himself and says so, so the pair is an experiment under §2's
exception rather than two unreconcilable figures. Recorded against **AM-149**.

---

## 6. What changed, and what I checked

**`COUNTING_RULE.md`** — §2 `at:` rewritten; §3 rule 11 extended with the moment and with the absence
of a count; §8 given the overturning condition and its owner; §9 given M16 and the note on why the
stamp is not a clause; §10 given H9; §13 added; the head paragraph pointed at §13; one
`literature/NAMING.md` path dereferenced to name the document instead.

**`oracle/AMENDMENTS.tsv`** — AM-146 through AM-153 appended. H row 145/68 → **153/73**, and
`check_registers.js` confirms `OK AMENDMENTS declares its own size correctly (153 total, 73 owed)`.
AMC-1 through AMC-4 pass; no new AMC-5 collision (the two `QUANTITIES.md` rows carry different
sections). The scoped `AM-[0-9]` defect-token test returns nothing over my rows — it caught one in my
own draft first, at AM-148, and it was corrected before this file was written.

**Version 4 mints no quantity block and changes no value, by force.** Any block edit changes the
regenerated index, M6 then fails, and the count moves — done by the seat whose deliverable is that the
count keeps moving. Every numeral this document introduces is stated in exactly one file. The version
integer is AM-151.

### The four amendments owed to me

| Row | Target | State today | My check |
|---|---|---|---|
| AM-137 | `COUNTING_RULE.md` §9 M13 | `applied` | Correct. Contract half was mine at 2.19; M13's population excludes `literature/`. |
| AM-138 | `tools/quantities.js` M13 | `owed` | Still owed. `--lint` is at 64 findings; the `parseInt("7.73")` and word-boundary defects are unfixed. Not discharged. |
| AM-141 | `tools/quantities.js` M15 | `owed` | **The row is stale.** M15's computed population is implemented and running — `--lint` reports M15 findings across `accumulator.md` and `lunar-oracle-gameplan.md`, which the two-element `RELAY_FILES` list could not reach. The state should be `applied`. Flagged, not changed: it is his row. |
| AM-144 | `oracle/check_register.md` CHK-28 | `owed` | Still owed. `check_registers.js` prints `AMC-1`…`AMC-5` at run time, so the tool half appears done; the `check_register.md` cell is not. |

---

## 7. Not mine

- **The relocation of the corpus naming contract leaves thirty-one hard-coded paths, not a broken
  glob.** My §8 interest was the glob and the glob is fine — `literature/**/*.md` must survive for the
  merge and a glob matching nothing is not an error. The exposure is path references across the
  declared set; I fixed the one in `COUNTING_RULE.md` and the rest are frozen record. **The Systems
  Engineer**, this wave's relocation. Count and test are in **AM-153**.
- **`cr_scratch/step2_engineer_dispositions.md` carries two malformed blocks** — `Q-PLAN-CHURN` has
  `class: measured`, outside the closed five, and both it and `Q-PLAN-BLOCK1-117` name no `cwd:`.
  Four of the five new hard failures. **The Engineer**, whose file it is.
- **`QUANTITIES.md` is stale and M6/M7 fail**, because that file added two blocks. Fifth new failure.
  **The orchestrator**, at the wave boundary, with the read-digest recorded — that is The Manager's
  ruling and I am not taking it mid-cycle.
- **`tools/check_registers.js` still has no `oracle/MANIFEST.tsv` row**, so an amendment against it
  has nowhere to be recorded. AM-129's fourth live instance. **The Systems Engineer**, who owns the
  manifest.
- **Standing clauses 8 and 9 collide, and they collide in every Wave 1 brief this session.** Clause 8
  requires the relay artifact in `cr_scratch/relay/spawn/`; clause 9 forbids writing outside a
  declared write set that does not include it. I resolved it toward clause 9 — the explicit
  constraint — and relayed the M16 form through **AM-152** instead, which is in my write set, is in
  the declared file set, is what the implementer acts on, and is what `M15` can see. That resolution
  should be ruled rather than left to each seat. **The Manager.**

---

## 8. Census of this file

This file is one file. It is in the declared file set under `cr_scratch/**/*.md` and **is counted** in
every figure in §2 taken at digest `8db4418033b2bdb5` or later; it did not exist at
`7a99743a12a7de48` or `183e6319ddb1345d`, which is itself why those two are not comparable with a run
taken after it. It states seven measured figures, every one in §2's table with its digest, and it
mints no quantity block.

**Closing verification, with this file on disk:** `17 @ read-digest 98c92e856d44b573 over 97 files,
tool 2.19-1, flags --check`. The FAIL set is line-for-line identical with the run taken before this
file existed, so this deliverable costs the check nothing — and the two runs are comparable because I
moved the set myself and have just said what I moved.
