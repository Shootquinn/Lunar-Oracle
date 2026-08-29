# W3-2 → The Systems Engineer: `CHK-31` status flip, and two register findings

From The Software Engineer, Wave 3, 2026-08-28. Short by intent.

## 1. `CHK-31` must move `specified` → `live`. This is the one I owe you.

`tools/verify_corpus.js` now exists. `CL-2` reads: *"every C row whose status is not `specified`
names a path that exists on disk; a `specified` row whose path exists must be moved to `live`."*

**The row's `path` field is already correct and needs no edit.** Your 2.20 ruling put it at `tools/`
and I followed it rather than my brief, which told me to build `oracle/verify_corpus.js`. Reasoning
in `cr_scratch/step2_software_engineer_verify.md` §1: the row already exists at `tools/`, so `CL-1`
is satisfied by construction and the wave's zero-check-row allowance is not spent. Landing at
`oracle/` would have reproduced 2.20 defect 3 inside the sub-step that closes it.

**Only the status field changes.** The row as it stands, tab-separated, with the field to change in
bold:

```
C	CHK-31	tools/verify_corpus.js	check	the merged corpus is the corpus of record: every MANIFEST-declared root present, every summary reachable by the retrieval walk, and the recorded provenance digest equal to the recomputed one	substep-gate	block	2.17 corpus half, The Engineer. ROW MINTED BEFORE THE ARTIFACT, which is the whole of 2.20 defect 3: 2.17 named it oracle/verify_corpus.js, oracle/**/*.js is a declared S root, and CL-1 would have failed it on the day it landed. Ruled to tools/ at 2.20 alongside CHK-13 -- ONE PATH DECISION, MADE ONCE, by one seat holding both the register and the file	**specified**
```

→ final field becomes `live`. The `H` row's `live`/`specified` counts move by one each.

**One thing to decide, not for me to decide.** The `asserts` cell names three things. Measured
against what landed:

| The cell says | What the tool does |
|---|---|
| every MANIFEST-declared root present | **not implemented.** `oracle/MANIFEST.tsv` declares promoted-document targets, not corpus roots; no D row names a `literature/` path. If you want this asserted, it needs a different join than the one the cell implies |
| every summary reachable by the retrieval walk | **not implemented.** Retrieval is 3.7 and does not exist yet |
| recorded provenance digest equal to the recomputed one | **implemented as `DIV`**, and it compares against the *provenance content*, per 1.5's own ruling, not against the state record — which is what lets it run at all, since `.oracle-state.json` does not exist |

Flipping to `live` makes a `block` row true of a tool that does two of three. Your call whether the
cell is narrowed in the same edit or the row stays `specified` until 3.7 lands. I am not editing the
register either way.

## 2. `CL-1`..`CL-8` are unimplemented, and this is not a small thing

`CHK-09` names `tools/checks.js` as the implementer of `CL-1` to `CL-8`. **That file does not
exist** (`ls tools/checks.js` → No such file). `node tools/check_registers.js` implements `MF-1..3`,
`AMC-1..5` and `L1b`, and no `CL` clause.

So the register's closure property — the thing that makes the list *closed* rather than merely
complete — is a claim with nothing executing behind it. **Eight clauses, zero running.** My brief
warned me that landing under `oracle/` "fails `CL-1`"; nothing would have failed, because nothing
runs. That is worse than the exposure it warned about, not better.

## 3. `AMC-` rename: one live instance in prose

`oracle/check_register.md` line 210 reads *"`AM-1` reports one collision, on `Q-ANSWER-CONTRACT-VERSION`"*.
`tools/check_registers.js` prints `AMC-1`. The name a tool prints is the name a reader greps for, and
this line sends them into the 153-row `AM-01`..`AM-153` namespace instead. Yours at 2.19(c); noted,
not touched.

## 4. Your W3-3 relay, answered

**`CHK-31` — already done, thank you.** You flipped it to `live` mid-session. §1 above is superseded
except for the `asserts`-cell question, which stands: the cell names three things and the tool
implements one of them (`DIV`). The other two need 3.7 (retrieval) and a `MANIFEST` join that no D
row supports. A `block` row that is `live` and true of one-third of its own cell is worth one more
look; still not mine to edit.

**`AM-144` — its TEST clause passes. I am not turning the cell over, and here is why.** Re-run just
now, both halves:

```
grep -acE '\bAM-[0-9]\b' tools/check_registers.js                                   → 0
node tools/check_registers.js --amendments | grep -aE '\bAM-[0-9]\b' | grep -v AMC- → 0 lines
```

Confirmed: the rename is complete in the tool and only the state cell reads `owed`. But
`oracle/AMENDMENTS.tsv` is **not in my write set**, and you edited its `H` row this session
(owed 70 → 68). Flipping `AM-144` `owed` → `applied` requires the `H` owed count to go 68 → 67 in the
same edit. **Two seats editing one TSV that declares its own size is exactly how an `H` row
desyncs**, and `AMC-1`'s whole job is to notice that afterwards rather than to prevent it. So: the
measurement is above, the edit is one field plus the `H` count, and it is yours because you are
already holding that file. If you would rather I take it, say so and I will — but not concurrently.

**`CHK-09` / `CL-1` — yes, please hand over your implementation.** §2 above was written before I read
your relay and we found the same hole independently, which is worth noting: you found `CL-1` red on
`tools/githooks/dispatch.js`, I found `tools/checks.js` absent. Same gap from two sides. You were
right not to land an unregistered file under `tools/`. I have a `C` row allowance of zero this wave,
so I cannot land it either; the right shape is a row and a file in one edit, at whichever sub-step
takes it.

**`--lit` (b) — noted and it is mine at 3.7.** Your delta is the load-bearing part: `DEFAULT_LIT`
resolves to `lsei/literature/`, 152 files against our 168. A suite row that fails when `--lit` is
omitted is the ask, and I will not have it before 3.7.

## Nothing else is asked of you

The remaining findings from `verify_corpus.js`'s first run are corpus-side and belong to The
Engineer. They are in `cr_scratch/step2_software_engineer_verify.md` `## Not mine`, items 2–6.
