# Relay — W5-2 The Writer, four routed items

Raised at sub-steps 8.4 and 8.5, 2026-08-28. None of these is in The Writer's write set. Each names a
measurement, an owner and a close condition. R5 was added after the author's licence ruling.

---

## R1 — To The Software Engineer. Three FIL rows are stale at contract version 3.

`oracle/answer_contract.md` §6 no longer admits a chat text block under any condition. Version 2's two
conditions are removed and the ruling is at §6a.

`oracle/tests/answering_loop_suite.md` §10 FIL asserts them:

- **FIL-5** — "Block appears when the deliverable is under 200 words and unasked."
- **FIL-7** — "Block appears when over 200 words and the user asked."
- **FIL-8** — "Block appears when under 200 words and the user asked."

**Argued, not edited.** A test believed wrong is argued. The proposed replacement is not deletion: all
three become decoys asserting that a chat block is emitted **never**, which is a stronger assertion
than the one they carry now and tests a rule rather than a threshold. **FIL-6** ("Haiku plus path when
over 200 words and unasked") generalizes to "haiku plus path, always" and gains the path line's form.

**FIL-9** ("a `FIGURE` deliverable has no chat form") is now redundant with the general rule. It should
survive as a regression test, not be deleted: it is the one row that would go red first if the
carve-outs crept back.

**The reprieve is the problem.** All fourteen FIL rows carry no executable binding today
(`node oracle/tests/run_suite.js` → `FIL 14 rows 0 pass 0 fail 14 unrun`), so this contract change
broke no test. A suite that cannot break when the contract under it changes is not measuring the
contract.

**New row wanted, and it is the one 8.4 owes:** the path line is subject to §7's claim-bearing
predicate. `verify_haiku.js` already consumes that predicate for the haiku. Feeding it the path line
is the same call on a different string, and it is the only executable binding this sub-step's change
admits.

**Extended by the author's ruling of 2026-08-28** (`answer_contract.md` §6b). FIL now also owes rows
for the turn form: a turn carries 2 to 5 haiku strung linearly; one haiku is a valid unit and is not a
valid turn; a prohibition planted in the second unit fires; a question the Oracle asks the user is in
the form like everything else. **Seventeen proofs for exactly these now exist and pass inside
`node tools/verify_haiku.js --prove` (54 of 54).** The instrument is ahead of the suite: the assertions
are made and green, and the suite rows that would bind them do not exist. That is the reverse of the
usual gap on this project and it is still a gap.

---

## R2 — To The Software Engineer. The version pin reads 2 against a contract reading 3.

`oracle/answer_contract.md` is at **version 3**. Three files pin 2:

| File | What it says |
|---|---|
| `oracle/acceptance/transfer_assertions.md:12` | `**CONTRACT_VERSION_UNDER_TEST = 2**`, read out of §9 at authoring time |
| `oracle/register_schema.md:4` | "Schema version: 2. Written against `oracle/answer_contract.md` **version 2**" |
| `oracle/tests/answering_loop_suite.md:66` | VER-2, `CONTRACT_VERSION_UNDER_TEST = 2` |

**The suite is green over exactly the mismatch it exists to catch.** VER has no executable binding in
`run_suite.js` — `grep -n 'VER-1\|CONTRACT_VERSION' oracle/tests/run_suite.js` returns nothing. This is
the same shape as VER-2's own recorded history, where the pin read 1 against a contract reading 2 for
the whole of Wave 2.

**Nothing in `register_schema.md` was changed by version 3** — §1 through §5, §7 and §8 of the answer
contract did not move — so that file's pin is a pin, not a substantive lag. `transfer_assertions.md`
likewise. The repair is three integers plus, ideally, the binding that makes the fourth unnecessary.

---

## R3 — To The Systems Engineer. `CLAUDE.md` implements bootstrap contract version 2.

`oracle/bootstrap_contract.md` reads **version 3**, bumped at sub-step 6.1 on seven repairs.
`CLAUDE.md` §1's phases are still version 2's. Confirmed, not assumed:

```
$ grep -c BC-21 oracle/bootstrap_contract.md CLAUDE.md
oracle/bootstrap_contract.md:6
CLAUDE.md:0

$ grep -n 'core.longpaths=true' oracle/bootstrap_contract.md CLAUDE.md
oracle/bootstrap_contract.md:131:**The clone carries `-c core.longpaths=true` on its own invocation**
oracle/bootstrap_contract.md:134:git -c core.longpaths=true clone <url> <copy>
   (no hit in CLAUDE.md Phase 3)
```

Also unlanded: Phase 4 group 3 is not gated on the copy being present, so a content assertion still
evaluates against an absent copy.

**What The Writer did and did not do.** `CLAUDE.md` is in this seat's write set, and its own head says
a disagreement with the contract is a bug in `CLAUDE.md` to be corrected in a sub-step that says so.
**The lag is now stated in `CLAUDE.md` itself, at the head, naming the three specific gaps and the
owner.** The integer was deliberately **not** bumped: bumping it makes `CLAUDE.md`'s claim true, makes
the acceptance check green, and leaves three repairs unlanded — which is the exact failure the
"correct this file" instruction exists to prevent. Re-implementing the phases is bootstrap work and is
not The Writer's.

**Close condition:** land the three repairs in `CLAUDE.md` §1, then bump the head to version 3 and
delete the lag paragraph in the same edit. Bumping without the repairs is worse than the lag.

---

## R4 — To The Engineer, or whoever holds the registers this wave.

**`oracle/MANIFEST.tsv` — two rows owed.** Both files are promoted deliverables of Wave 5 and neither
has a manifest row. Following the shape of rows 31 and 34:

```
D	oracle/deliverable_shape.md	cr_scratch/step8_w5-2_deliverable.md	oracle/deliverable_shape.md	8.4	-	promoted
D	oracle/model_tier.md	cr_scratch/step8_w5-2_deliverable.md	oracle/model_tier.md	8.5	-	promoted
```

**`oracle/AMENDMENTS.tsv` — rows owed for the version-3 edit.** Three changes, one bump: §6's required
shape and removed conditions; §6a; §10. Target `oracle/answer_contract.md`, sections `section 6`,
`section 6a`, `section 10`, source sub-step 8.4, state `applied`.

**Measured, so the next reader knows the digest did not move for a reason.**
`node tools/check_registers.js` returned `0 hard failures @ read-digest 622cf37e33141773 over 305
files` both before and after The Writer's four files landed. That is correct: `READ_SET`
(`tools/check_registers.js:98`) is the four register files plus `cr_scratch/**/*.md`, and none of the
four written files is in it. The digest moves once the deliverable lands in `cr_scratch/`, and any
count compared across those two digests is two measurements of two sets.

---

## R5 — To the author. The `LICENSE` file, and only the author can write it.

The licence is now **ruled and worded**. `README.md` carries the Unlicense, the author's reason for it
over CC0 (GitHub's picker surfaces the Unlicense and does not surface CC0), and the carve-out that
matters: the dedication covers this project's own summaries, contracts, checks and handoffs and
**cannot cover the published works those summaries describe**.

**What is missing is the file.** `oracle/release_gate.md` RG-14 is **NOT MET**, measured:

```
$ git ls-files | grep -cE '^(LICENSE|LICENCE)'
0
```

`lsei/LICENSE` (the Unlicense, verbatim) and `lsei/NOTICE.md` are the precedent and they are in
another repository.

**Not taken, deliberately.** Writing that file **executes the dedication**. `README.md`'s own last
line says that until it lands the licence paragraphs are the project's stated position rather than an
executed dedication and this repository is not public; the gameplan says at 8.8 that *release itself
stays the author's act*. A seat that writes `LICENSE` has released the repository on the author's
behalf. The wording is done and the act is his.
