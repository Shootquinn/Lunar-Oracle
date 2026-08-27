# R-2 — The Systems Engineer: the three blocking findings, applied to the promoted text

**Revision item R-2 of The Manager's Step 1 close.** Owner: The Systems Engineer. Done when each
finding has an amendment row marked `applied`.

Everything below is applied to the **promoted files** under `oracle/`, which are the authority as of
sub-step 1.14. The `cr_scratch/` blocks are copies and are marked as such where they diverge. Every
amendment is recorded against its row in `oracle/AMENDMENTS.tsv` and the register checks were re-run
after.

---

## 0. Verdict, and what to read if you read nothing else

**All three blocking findings are applied. Three of the four items found since land on my files; all
three are applied or ruled. The fourth I relay.**

Two things in here are rulings rather than repairs, and a reader should know which is which:

1. **The register merge is refused.** `oracle/REGISTER.tsv` will not exist. The sidecar is a **set**
   of files, one `basis_root` each, joined at load. `oracle/register_schema.md` gains §3.0 and two
   assertions. (Item b.)
2. **`Q-CHECK-ROWS` is reclassified `fixed` → `live`**, and that is what closes the four-way
   amendment collision on it, rather than any one of the four winning. A self-declared size row is a
   checksum, not a quotation. (Consequence of R1 and of item c.)

**Where I disagree with the reviewer I say so and amend anyway**, per A.9. There are two such places
and they are at §2.3 and §4.1. Neither is a refusal.

### The measurements, with the tool's own prefix over unfiltered output

| What | Command | Result |
|---|---|---|
| The register's own closure, CL-1 to CL-8 | re-implementation of §4, over the amended block | **0 failures**, exit 0 |
| `CHK-27` / `CHK-28` | `node tools/check_registers.js` | `NOTE hard failures: 0`, exit 0 |
| `CHK-14` | `node tools/quantities.js --check` | `NOTE hard failures: 21`, exit 1; `grep -c '^FAIL '` = **21**, agreeing |
| `Q-CHECK-ROWS`'s own operation | `sed -n '/^# BEGIN CHECKS$/,/^# END CHECKS$/p' oracle/check_register.md \| awk -F'\t' '$1=="C"' \| wc -l` | **27** |
| Each register half against its own root | `node tools/ecr_verify.js oracle/REGISTER.{lunar,econ}.tsv <root>` | `ALL PASS`, `FAILURES 0`, exit 0, both |
| The concatenation, i.e. the merge | `node tools/ecr_verify.js <concat> lsei/literature` | `FAILURES 144`, exit 1 |

**`AM-1` reported four collisions at 1.14 and reports none now.** Three were mine and are closed at
§5. The fourth, `Q-ANSWER-CONTRACT-VERSION` named by `AM-66` and `AM-73`, closed under R-3 while this
pass was running — it was still red when I wrote §4.3, and the two rows CHK-27 and CHK-28 landed
`block` on the strength of a red I expected to name with an owner. **They are green as I hand this
over, and I am recording that they were not green when I wired them**, because a blocking row is a
commitment made before you know the answer and I would have wired them the same way either way.

**The `quantities.js` figure is not comparable to 1.14's 32**, and I will not present it as progress.
`COUNTING_RULE.md` is being amended concurrently under R-4 and its §8 declared file set moved twice
while I worked — the block census went 60 → 62 → 56 → 60 across four runs minutes apart. Two of the
six failures that left are mine (§6). The rest belong to R-4 and to the 1.9/1.10 duplicate ids.
**Whoever closes last must re-run `--index --write`.**

---

## 1. S1 — the install state record validated before it branched

`oracle/install_state.md`. Amendment **`AM-37`, applied.**

### 1.1 The defect, in one sentence

§6.1 step 2 ran all six validity rules before step 3 read `schema`, and rule 5 refuses any path
outside the nineteen — so a schema-2 record that **adds a key**, which is what a schema bump *is* per
§12, failed rule 5, was classified corrupt, and was **rewritten** by §6.3. §6.4 exists in its own
words to prevent that: *"overwriting destroys what the newer Oracle knew."* The mechanism was
unreachable for every realistic future version.

**And my own fixture could not have caught it**, which is the part I want on the record. §3 defined
the future-version instance as "the valid instance above with `"schema": 2`" — schema-1's exact path
set. That is the **only** future record that passes §4 and reaches step 3. I wrote the one test that
dodges the defect, and I wrote it in the same file as the §6.3 corrupt instance 7 that is the same
bytes with a different version number.

### 1.2 What is now in the text

**§4 is two gates**, and the split is load-bearing rather than tidy:

```
§4a  PARSE GATE   rules 1-3   true of every record this project will ever write, at every
                              schema version; may be applied before the version is known
§4b  SHAPE GATE   rules 4-6   true of a record written AT THIS schema version, and
                              meaningless against any other
```

**§6.1 interleaves the branch:**

```
1. Open. Absent            -> §6.2
2. §4a, the parse gate     -> §6.3 corrupt
3. schema >  this version  -> §6.4 refuse    <- "read no other field first" is now true:
                                                the parse gate touched the bytes, the type
                                                of the root value, and `schema`
4. schema <  this version  -> §6.5 migrate
5. §4b, the shape gate     -> §6.3 corrupt   <- reached only when schema equals this version
6. Ordinary
```

with the sentence **"Steps 3 and 5 may not be exchanged"** and the reason under it, because the
ordering is the whole of the fix and an ordering with no stated reason is an ordering someone tidies.

**The fixture set is two, and the second is the one that matters:**

```
F1  the valid instance with "schema": 2                            -- same path set
F2  the valid instance with "schema": 2 AND one added key           -- "hooks_installed": true
```

F2 is byte-for-byte §6.3's corrupt instance 7 except for the value of `schema`, **and must be
classified the other way.** That pairing is the assertion: the discriminator between corrupt and
refuse is `schema` and nothing else. §6.3 now says which gate each of its seven instances fails —
instances 1 to 6 fail §4a and are classified before the branch, instance 7 fails §4b and is reached
only at this version. §6.4's falsifier list gains F2 explicitly, named as *the falsifier this clause
did not have.*

**What I added beyond the reviewer's fix**, and why: a two-line statement of what each gate costs at
the wrong point. §4b too early is S1. §4a too late reads a `schema` out of bytes that are not JSON,
or out of an array, and branches on it. A reader who knows only that the order matters will restore
the wrong order the next time the section is edited for length.

### 1.3 Quantities

`Q-STATE-ABNORMAL-READS` is unchanged at 3. The gate split adds no read case: absent, corrupt, and
future-version are still the three, and older-version is still the specified fourth that is not
abnormal. `Q-STATE-KEYS` and `Q-STATE-FACTS` are untouched here — `AM-39`/`AM-40` still own those and
are still owed. Checked rather than assumed: `quantities.js --check` reports nothing against
`oracle/install_state.md`.

---

## 2. R1 — `CHK-09` asserted the event that invoked it

`oracle/check_register.md`. Amendments **`AM-49`, `AM-54`, `AM-59`, applied.**

### 2.1 The defect

`CHK-09.invoked_by` named `pre-commit`. `CHK-10` dispatches every row naming `pre-commit`. `CHK-09`
asserted `HK-1`, which is `git hook run pre-commit`. So `CHK-10` ran `CHK-09`, which ran the hook,
which ran `CHK-10`. **Unbounded, on every commit.** The reviewer built it; the depth counter that
stopped his probe was his own. `git hook run` has no reentrancy guard and sets no environment marker
a hook can test.

**My §1.5 chain diagram drew the loop and read it as a virtue.** Line 4 reads *"asserted by `CHK-09`,
at session-start, from the bootstrap"* — and *at session-start* is doing all the work, correctly,
because at session-start nothing invoked the hook. The row wired **both** triggers and the diagram
described one of them. The reasoning was right and the row was wrong, and the gap between them was
the direction of one arrow.

### 2.2 What is now in the text

**Two rows.** `CHK-09` is `--register`: CL-1 to CL-8, `pre-commit,session-start`, `block`.
**`CHK-29`** is `--wiring`: HK-1 and HK-2, **`session-start` only**, `report`. That closes R5 in the
same edit — one row was carrying two consequences, blocking at pre-commit where §3.2 says the
bootstrap *reports* an unwired hook and proceeds, and a fresh clone has no hooks because hooks are
not cloned.

**`CL-8`, in two clauses**, because this class will recur and both halves are one grep:

```
CL-8  NO ASSERTION OF ITS OWN DISPATCH
   a. no row whose invoked_by names pre-commit contains the literal
      "git hook run pre-commit"                                                block
   b. every row whose path is under tools/githooks/ contains the literal CHK- id
      of its own row, inside the file at that path                             block
```

(b) is the marker clause relocated from the overruled `AM-21`; see §4.1. It makes `CHK-10`'s dispatch
join bidirectional — the register names the hook and the hook names its row.

**§5.1 is new** and carries the loop, the measurement, and the refusal of the alternative. §1.5 of the
1.13 reasoning now carries both diagrams, the wrong one labelled and kept.

### 2.3 Where I disagree with the reviewer, and amend anyway

He offered the environment-sentinel guard as option 2 and called it "cheaper, and worse." I think it
is worse for a reason he understates and I want it in the text rather than in a review nobody reads
at 3.7: **a sentinel makes an assertion's meaning depend on who called it.** `HK-1` under a sentinel
means "a hook would fire" when the bootstrap asks and "not applicable" when the hook asks, which is
two assertions in one id, which is the same defect R5 is about one level down. I took his option 1
and I am recording the stronger reason for it.

I also decline his implicit numbering: he wrote `CHK-09a`/`CHK-09b`, and `CL-3` requires
`^CHK-[0-9]{2}$`. The suffix form fails the register's own id rule. `CHK-29` is the next free id —
25 and 26 are reserved to `AM-46`, 27 and 28 to `AM-104`.

---

## 3. R2 — the consolidation is right and 2.15 was the wrong date

`oracle/check_register.md`. Amendment **`AM-107`, applied.** `AM-51` remains owed, narrowed.

### 3.1 What moved

**`CHK-03.invoked_by` becomes `manual`.** One cell. It was `substep-gate` with `on_failure: none`: a
check that **cannot fail**, holding a gate, for the eleven sub-steps between here and its own removal.
`status: retiring` excused it from `CL-5(a)` and nothing excused it from the gate.

The reviewer is right and The Manager sided with him, on the ground that it is schedule rather than
substance. I agree, and I will state the substance anyway because a schedule with no reason behind it
slips: **an exemption from an assertion is not an exemption from a trigger.** `CL-5(b)` gives
`retiring` an expiry, and an expiry is a promise about a date, not a licence to keep gating in the
meantime. §4 of the register now says that in those words.

### 3.2 What stays at 2.15

Deleting the two files, taking `tools/` from ten artifacts to eight, and making `on_failure: none`
unreachable. `AM-51` is narrowed to the one remaining half that is genuinely 2.15's: **`ecr_verify.js`
resolves its `require()` of the upstream tokenizer through a hard-coded absolute `ROOT`, so the
consolidation must re-derive that require rather than lift it**, or it lifts the portability defect
into the survivor.

### 3.3 What I name and do not rule

Two 1.9 quantity blocks — `Q-LCC15-KEYS` and `Q-LCC15-KEYS-DEAD-K2` — carry
`operation: script: tools/check_register_rows.js`. They re-point to `ecr_verify.js` at their next
touch under the Tier 2 rule, **and their values may move**, because `ecr_verify.js` covers B1–B7 where
`check_register_rows.js` covers B1–B3, B6 and B7. That is 1.9's edit. It is named in `AM-107` and in
the register's §4 so that it is not discovered by someone re-running a number.

### 3.4 The `block` vocabulary gained a sentence

`ecr_verify.js` exits **2** on a usage error, which is not in the `on_failure` vocabulary. §2 now
says: **exit 1 is a finding; any other non-zero exit is a harness failure, not a finding, and is
reported as such.** A dispatcher reading `block` and seeing 2 otherwise reports the wrong thing about
the wrong file.

---

## 4. The four items found since

### 4.1 (a) — the ruling that had not reached the text

**`AM-21`, marked. Marker placed in the deliverable.**

Two mutually exclusive amendments to `BC-8`, both mine, written the same day, neither aware of the
other. 1.5 §3.1 row 5: assert the hook file exists, is non-empty, carries a shebang. 1.13 §3.1: delete
that and run `HK-1`/`HK-2`, arguing explicitly against 1.5's form. **1.13's wins**, and it was ruled at
the review, and `AM-21` in the register said so — but **1.5 §3.1 row 5 was still live and unmarked**,
so a reader working that list would have applied a rejected amendment.

Row 5 now carries an inline **OVERRULED — DO NOT APPLY** marker naming `AM-33`, with the text struck,
the reason kept, and a pointer to what survives. §3.1's introduction carries a block note saying the
queue is the authority on state and this table is a copy.

**Where I disagree, and it is small:** the reviewer characterised 1.5's form as "one rung better than
F6's and still a container check." That is right. What I want recorded is *why I wrote it* — the
marker clause was the good half, and it is the only part of my form that survives, because its
consumer was never git. It is `CHK-10`'s dispatcher. It is now `CL-8(b)`, in the file whose reader
actually needs it, which is a better outcome than either of the two amendments proposed.

### 4.2 (b) — `oracle/REGISTER.tsv` cannot exist as one file. **Ruled: it will not.**

**`AM-98`, applied.** `AM-99`'s schema half ruled; its code half re-targeted and still owed.

The Engineer declined this correctly at 1.14 as a schema question rather than a promotion question. I
rule it, and the ruling is settled by §3.1's own columns rather than by preference.

**`basis_root`, `basis_date` and `basis_ref` bind the whole file** to one working copy at one ref. Two
corpora have two roots and two refs that move independently. A merged file could carry that only by
relocating `basis_root` from the `H` row onto every `A` row — at which point the file no longer
declares a basis, `L4` no longer has a root to name in its failure message, and `L2`'s self-declared
size is the only thing the header still does. **That is a worse file, and the argument for it was that
one path is tidier than two.**

Measured before ruling. The concatenation exits 1 with **144 failure lines**: 40 `L4` leaves that do
not resolve because they are addressed against the other corpus root, 101 `B3/K2` keys that occur in
no member for the same reason, two `L2` counts, and one `L0`. Each half against its own root:
`ALL PASS`, `FAILURES 0`, exit 0.

`oracle/register_schema.md` gains **§3.0** with three clauses:

```
SET-1  one root per file. H is one row, the first row, and its basis_root governs every
       A and M row in that file. Zero or two H rows is a hard refusal -- see L0.
SET-2  axis ids are unique across the loaded set. LCC-* and ECR-* are disjoint today and
       that is not a mechanism.
SET-3  the join is at load, not on disk. Each file is validated in full against its own
       basis_root, independently; the loader's output is the union.
```

and §9 gains **`L0` HEADER CARDINALITY** and **`L1b` SET UNIQUENESS`**. §3's heading, the artifact
table and the `## Contested` generation clause are swept to match.

**What it costs, stated:** a reader who wants every contested claim opens two files.
**What would falsify it:** a third corpus whose axes must be interleaved with an existing corpus's
*inside one axis*, which SET-2 would then be refusing rather than protecting.

`oracle/MANIFEST.tsv`'s row for `oracle/REGISTER.tsv` is `superseded` rather than deleted, so that a
Step 2 session grepping the path it will find in eleven deliverables lands on the ruling rather than
on nothing. The state vocabulary gained a **definition**, not a fourth value; the file's own note said
*"do not make this row green by inventing a state"* and I did not. Its pointer to "AM-40" was a typo
for AM-98 and is corrected. `MF-2` is now green: **0 hard failures.**

**On `AM-99`.** Its `section` cell read `CHK-15`, which is `quantities.js --lint`; `ecr_verify.js` is
`CHK-04`. Corrected. The schema half is ruled above — `L0` says exactly one `H` row and it is the
first non-comment row. **The code half landed while I was writing this**, from another seat: the
loader's `if(t==='H') H=f` is now a cardinality-and-position check and the concatenation reports
`FAIL L0 row 98 is a second H row`. `AM-99` stays `owed` until whoever owns `tools/` records it as
applied; I am not marking another seat's work applied on my say-so.

### 4.3 (c) — `CHK-14` to `CHK-17` move to `live`. Done, with a precondition and one refusal.

**`AM-103`, `AM-104`, `AM-105`, `AM-53`, applied.**

**They could not move as they stood**, and this is why R4 had to land in the same edit. Their `path`
cells read `tools/quantities.js --check`, `--lint`, `--index`, `--live`. Those are not paths, `CL-1`
and `CL-2` both join on `path`, and moving them to `live` would have landed four rows whose path does
not exist. So:

- **`path` becomes `tools/quantities.js` on all four**, and the mode moves to a literal prefix on
  `asserts` — `--check: <claim>` — on the `marker: <literal>` precedent, which §3 already justifies
  by saying the cell is grepped. **Zero new columns.** I checked the tenth-`args`-column alternative
  against my own gate and it buys nothing the prefix does not; I cut `fires` and `owner` for that
  reason and a tenth column here would be the third.
- **`CL-3` gains `path contains no whitespace`** — the clause that would have caught this on day one.
- **All four are `live`.**

**`CHK-27` and `CHK-28` are added and are `live` and `block`.** `tools/check_registers.js` was under
`tools/**` with no row, so `CL-1` failed the day 1.14 built it. `block` is the honest value, measured:
the script exits 1 on any FAIL line. `report` would have been false, and a `check` that exits 1 while
its row says `report` is `CHK-03` wearing the other mask.

**`AM-46` stays owed, deliberately.** It adds `CHK-25` and `CHK-26` for artifacts nobody has built.
Two `specified` rows are debt, not mechanism, and belong to the sub-step that builds them. Ids 27, 28
and 29 leave 25 and 26 free for it.

**`CHK-23` is ruled the other way and does NOT move to `live`.** `CL-2` said it must, because its path
`oracle/bootstrap_contract.md` now exists. **The row was wrong, not the status.** §1 of the register:
*the register enumerates things that run.* A contract does not run. The `path` cell named the
**authority**, not the artifact. So `path` becomes `oracle/bootstrap_check.js` — the executor 6.1
acquires, which its own `authority` cell already anticipated — the contract moves into `authority`
where it belongs, and the row stays `specified` because nothing runs it yet. `oracle/**/*.js` is a
declared scan root, so `CL-1` will require the file the day it lands.

**The register after all of it, verified by re-implementing CL-1 to CL-8 over the amended block:**

```
rows=27  live=13  specified=12  retiring=2  scan-root files=10
hard failures: 0
```

CL-1 covers all ten files in the two scan roots with none uncovered. CL-2 is green in both directions.
CL-8(a) finds no row naming `pre-commit` that contains the literal.

### 4.4 (d) — the marker rule, which the measurement made stronger than I expected

The clause is in §3 of the register: **an assertion that counts a tool's output names the pattern, not
the tool.** What earned it is that the same tool and the same pattern were wrong in **both**
directions inside one day:

| When | `tools/ecr_verify.js` prints | `grep -c '^FAIL'` | True count |
|---|---|---|---|
| Before R-3 | failure lines indented two spaces | **0** | 143 |
| After R-3 | failure lines at column 0, plus a `FAILURES <n>` summary | **145** | 144 |

The fix that un-indented the lines added a summary line beginning `FAILURES`, which the same pattern
counts as a failure. `grep -c '^FAIL '` — with the trailing space — returns 144 and agrees with the
tool. **A cell reading "no failures from `ecr_verify.js`" was satisfied by the first column and is
falsified by a clean run in the second.** No row in this register counts failures today, so the clause
is prophylactic; it is written now because the artifact that would have carried it is `CHK-09`, and
`CHK-09` is being edited in this same pass.

---

## 5. `Q-CHECK-ROWS`, and the three `AM-1` collisions that were mine

`AM-1` reported four collisions at 1.14. Three were mine. **All three are closed, and none of them
was closed by picking a winner**, because in each case the collision was `AM-1` describing a real
shape it cannot represent.

### 5.1 `Q-CHECK-ROWS` — four successors, one integer. **Reclassified `fixed` → `live`.** `AM-108`.

`AM-48`, `AM-60`, `AM-61` and `AM-106` each forecast this integer arithmetically, from four documents,
by four hands, none aware of the others. The Manager's close records it as "one integer carrying three
competing successor values"; 1.14 found the fourth.

**The counting rule already names this signal**: *"A block carrying many `superseded` entries is a
signal that the quantity should be `live` rather than `fixed`."* Four competing successors **before**
the first correction lands is the same signal, one stage earlier. And the block's `operation` was
already a `cmd:` that **counts the rows**. Nothing about the measurement changes — only the class, and
with it the rule that **no amendment may state the value**.

New value **27** (13 live, 12 specified, 2 retiring), measured after this edit by the block's own
command; 24 moved to `superseded` with its reason. `AM-48` is `superseded` by `AM-108`; `AM-60`,
`AM-61` and `AM-106` are `applied`, their row changes having landed here. `AM-46`'s rows can now land
without anyone forecasting a checksum.

**The one exemption, stated rather than assumed.** `live` means "never quoted as a bare literal, in
any file including its own" — and the `H` row is a bare literal in its own file. It is not a
quotation. **It is the second, independently derived operand of `CL-3`, and its whole purpose is that
it CAN disagree with the parsed count.** A checksum forbidden to restate the number it checks is not a
checksum. Filed against `COUNTING_RULE.md` §3 as **`AM-109`**, owed to The Designer; until it lands,
`--lint` reports the `H` row and `AM-108` is the standing disposition, in writing, where a
dispositioned lint finding is supposed to be. §7 of the register no longer states the integer at all —
it points at the `H` row's `specified` count, which is better writing regardless.

### 5.2 `Q-BOOTSTRAP-ASSERTIONS` — `AM-15` and `AM-24` were one edit in two rows

`AM-15` moves the count 19 → 15. `AM-24` mints the block *at the value `AM-15` leaves*. Neither can
land without the other. `AM-1` reported a collision because it cannot see that two rows are one edit.
`AM-15` is `superseded` into `AM-24`, which now carries both halves. **Nothing about the content is
withdrawn.**

### 5.3 `Q-STATE-FACTS` — `AM-25` was never a separate amendment

`AM-39` cuts `pdfs_present`, taking the value 4 → 3, inside 1.5. `AM-25` brings 1.4's bare phrase "the
four facts" into `<value> [<id>]` form, inside 1.4. **Counting rule §4 step 4 already requires that
every site the checker lists is updated in the SAME edit as the value.** Filed as two, it produced
exactly the failure 1.14 predicted: land them apart and the bootstrap contract
ships `4 [Q-STATE-FACTS]` against a block reading 3. `AM-25` is `superseded` into `AM-39`, which now carries
the site and names `AM-40` as riding the same edit.

### 5.4 The ruling under all three, filed as `AM-109(b)`

**`AM-1` as specified is a forecast, not a check.** It fails on two owed rows naming one quantity even
when they are one edit, by one author, at one value — which it cannot see — and it was reporting three
such false positives out of four. The property that actually matters, *no quantity is left quoted at
two values*, is already asserted mechanically and better by `quantities.js --check` **M3**, after the
edits land. `AM-1`'s honest kind is a **report that names a coordination risk**. I have not changed
the check, because it is The Designer's spec and `CHK-28` is `block` today on the strength of it; I
have filed it and said so.

---

## 6. Two failures in my own file, closed because they were mine

Not in scope, closed anyway, because writing a report about counting discipline over a red file of my
own is the defect the Manager's §4 names.

- **`M1`: `Q-TOOLS-MODE-644` had no `population` key.** Added. And the block is `class: live` at value
  **8**, which is now **10** — 1.14 added `quantities.js` and `check_registers.js`, both at 100644.
  Re-measured, 8 moved to `superseded` with the reason that *a live value is expected to move, and
  this entry records the move rather than an error*, which is the field's second use.
  This also confirms `HK-2` is a live finding: all ten tracked files under `tools/` are at mode
  100644, and `AM-57`'s `.gitattributes` is still owed.
- **`M11`: `Q-HOOKSPATH-INERT` named a `cwd` with no character length.** Fixed, citing
  `Q-SCRATCHPAD-ROOT` with its class and date rather than pasting its number as a literal, and saying
  plainly that the length is recorded to satisfy M11's locator requirement rather than because it
  affects the value.

`quantities.js --check` now reports **no failure in any file of mine.**

---

## 7. Amendment rows — what changed in `oracle/AMENDMENTS.tsv`

**111 rows, 90 owed** (was 106 / 102). Five new rows, fifteen state changes.

| Row | Was | Now | What |
|---|---|---|---|
| `AM-37` | owed | **applied** | S1, the gate split |
| `AM-49` | owed | **applied** | R1, the `CHK-09` split |
| `AM-54` | owed | **applied** | R5, landed with `AM-49` |
| `AM-59` | owed | **applied** | `CL-8`, both clauses |
| `AM-53` | owed | **applied** | R4, `path` cells |
| `AM-103` | owed | **applied** | `CHK-14`–`CHK-17` live; `CHK-23` ruled |
| `AM-104` | owed | **applied** | `CHK-27`, `CHK-28` |
| `AM-105` | owed | **applied** | `CL-1` closed |
| `AM-98` | owed | **applied** | the merge refused; schema §3.0 |
| `AM-48` | owed | **superseded** by `AM-108` | pure arithmetic on the `H` row |
| `AM-60`, `AM-61`, `AM-106` | owed | **applied** | rows landed; collision closed by `AM-108` |
| `AM-15` | owed | **superseded** by `AM-24` | one edit, two rows |
| `AM-25` | owed | **superseded** by `AM-39` | a quotation site, not a rival |
| `AM-21` | superseded | *(text)* | the marker has now reached the deliverable |
| `AM-51` | owed | *(narrowed)* | only the absolute `require` path remains, at 2.15 |
| `AM-99` | owed | *(re-targeted)* | `CHK-15` → `CHK-04`; schema half ruled |
| **`AM-107`** | — | **applied** | `CHK-03.invoked_by` → `manual` |
| **`AM-108`** | — | **applied** | `Q-CHECK-ROWS` `fixed` → `live` |
| **`AM-109`** | — | owed | `COUNTING_RULE.md` §3: the checksum exemption, and `AM-1` as a report |
| **`AM-110`** | — | owed | the `invoked_by` comma grammar (§8 below) |
| **`AM-111`** | — | owed | the register's quantity blocks were not promoted (§8 below) |

`AM-2`, `AM-3` and `AM-4` are green after all of it, checked and not assumed.

---

## 8. Two defects found while doing this, filed rather than fixed

**`AM-110` — the `invoked_by` grammar is ambiguous with itself.** §2 says a comma-separated set, and
one admitted token is `consumed:<id>[,<id>...]`, which contains commas. A naive split on comma turns
`CHK-24`'s cell into five bogus tokens. **I hit this building the closure verifier for this
amendment** and had to special-case it. Either the inner separator is not a comma, or §2 states the
tokenizer. One sentence, and it is the difference between a closed vocabulary and a vocabulary that
parses by luck.

**`AM-111` — the register's own quantity blocks were not promoted.** 1.14 lifted only the marked
`CHECKS` block, so `oracle/check_register.md` — now the authority — carries **no quantity blocks**,
while `cr_scratch/step1_13` §4 still holds `Q-CHECK-ROWS`, `Q-TOOLS-TOKENIZER-MIRRORS`,
`Q-HOOKSPATH-INERT` and `Q-TOOLS-MODE-644`. A quantity about the register lives outside the register.
I edited the blocks where they are, because they are the only copies and therefore the authority
regardless of where they sit — but the split is a defect of the same shape as `AM-102`: the declared
file set and the promotion boundary disagree about which copy is real. **Whoever lands `AM-102` should
land this with it.**

Related and handled rather than filed: `oracle/check_register.md` and `oracle/install_state.md` were
amended **in place** and have diverged from their `cr_scratch` source blocks. Both source files now
carry a **DIVERGED AT R-2 — DO NOT RE-LIFT THIS BLOCK** note immediately above the `BEGIN` marker,
naming the promoted file and the amendments a re-lift would silently revert. `MF-3` still passes.

---

## 9. Handoffs

| To | What |
|---|---|
| **The Manager** | `AM-108` is a reclassification I made on my own file's checksum, and `AM-109` asks The Designer to bless the exemption it needs. Both are reversible by you in one cell. Three of the four `AM-1` collisions are closed; the fourth is R-3's. |
| **The Software Engineer** | The `AM-1` failure that remains is yours: `Q-ANSWER-CONTRACT-VERSION`, `AM-66` and `AM-73`, and `oracle/answer_contract.md:4` still reads version 1. Also: you implemented `L0` and un-indented `ecr_verify.js` while I was writing §4.4 — the new `FAILURES <n>` line makes `grep -c '^FAIL'` over-count by exactly one, so the pattern is `^FAIL ` with the space. `AM-99` is left `owed` for you to mark. |
| **The Designer** | `AM-109`, two clauses: (a) a self-declared size row is not a quotation site, or every TSV register must choose between a `live` class and a working checksum; (b) `AM-1` is a forecast whose blocking half is already M3. `AM-111` rides `AM-102`. |
| **The Space Resources Engineer** | `Q-LCC15-KEYS` and `Q-LCC15-KEYS-DEAD-K2` name `tools/check_register_rows.js` as their `operation:`, and it is now `manual` and dies at 2.15. Re-point to `ecr_verify.js` at your next touch; **the values may move**, B1–B7 against B1–B3, B6, B7. |
| **2.14** | `CHK-29` (`tools/checks.js --wiring`) is your post-condition, and it is `report`, not `block`, and `session-start` only. `CL-8(b)` requires the hook file to contain its own `CHK-` id. `AM-57`'s `.gitattributes` lands **before** you install hooks: all ten tracked files under `tools/` are at 100644 today. |
| **2.15** | `AM-51`: re-derive `ecr_verify.js`'s `require()` of the upstream tokenizer, do not lift it. The rest of the consolidation is unchanged and `CHK-03` is no longer on a gate while it waits. |
| **6.1** | `CHK-23`'s artifact is now named: `oracle/bootstrap_check.js`, under the `oracle/**/*.js` scan root, so `CL-1` will require it the day it lands. |
| **Whoever closes Step 1** | `node tools/quantities.js --index --write` must be re-run. `COUNTING_RULE.md` §8 moved three times while I worked and the block census went 60 → 62 → 56 → 60. The 21 I report is a reading of a moving file, not a score. |
