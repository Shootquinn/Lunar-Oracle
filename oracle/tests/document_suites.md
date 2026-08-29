# The document test suites

**Written against bootstrap contract version 2** and answer contract version 2.

This file holds suites that test **documents**. `oracle/tests/corpus_suite.md` tests a tree of files,
`oracle/tests/answering_loop_suite.md` tests a loop, and 6.1's acceptance suite tests the bootstrap's
**behaviour**. Nothing here asserts behaviour. A row in this file is falsified by reading a document
and finding a sentence, or by reading it and not finding one.

**The runner does not read this file yet.** `oracle/tests/run_suite.js` names two suites in its
`SUITES` constant and this is a third. Until that constant grows a member, every row below is UNRUN
by the runner's own rule, and UNRUN is not PASS. The `Status` column states what the author of each
row expects; it is a claim, not a result. Adding the member is The Software Engineer's, and it is
relayed at `cr_scratch/relay/w4-7_to_software_engineer_suite_wiring.md`.

**Group prefixes.** `CMD` is `CLAUDE.md`, sub-step 6.2. `RDM` is reserved for the README suite at
6.11 and is deliberately left empty here rather than guessed at: 6.11 belongs to The Software
Engineer with The Writer, and a prefix squatted on by the wrong seat is worse than an absent one.

**Counting rule.** Rows in the tables below whose first cell matches `^[A-Z]{2,3}-[0-9]+$`. Per
group: CMD 24. Counted by running the rule over this file.

## 0. How to read this suite

**It tests the document, not the bootstrap.** 6.1's suite renames `lsei/` and asserts the session
refuses a quantitative question; that is behaviour and no row here repeats it. These rows ask a
narrower question: *does the prose implement `oracle/bootstrap_contract.md`, or a friendlier
contract nobody tested?* Every row is a `grep`, a count, or a hand read of one named passage.

**Where a row and the contract disagree, the contract is the statement.** That is the contract's own
preamble and it governs this suite too. A row believed wrong is argued in a relay, never edited to
pass.

**Status column.** `green` = expected to pass against `CLAUDE.md` as written at 6.4. `RED` = expected
to fail today, with a named reason, owner and close condition. `H` = a human read, listed because it
is part of the contract and marked so nobody counts it as mechanized.

## 1. CMD — the `CLAUDE.md` document

`CLAUDE.md` is the first thing a session reads and the only thing a fresh clone has that explains
itself. Every row below is about that document. Paths are repository-relative.

### 1.1 Conformance to the contract

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| CMD-1 | The document names the bootstrap contract version it implements | `CLAUDE.md` yields a bare integer against `contract version`, and that integer equals the integer at `oracle/bootstrap_contract.md` §10. Contract §10 clause 2 requires this reader to exist; if it stops existing the field is deleted from the contract rather than left as decoration | green |
| CMD-2 | DECOY: the version tripwire fires | Increment the integer in `oracle/bootstrap_contract.md` without touching `CLAUDE.md`. CMD-1 must go red. A green CMD-1 after the mutation means the document quotes a number it never compares, and CMD-1 and CMD-2 are both deleted | green |
| CMD-3 | All seven phases appear, in the contract's order | The document names Locate, Preflight, Acquire, Verify, Record and report, Read sequence, First run, and the order of first mention equals §3's order. `7 [Q-BOOTSTRAP-PHASES]` | green |
| CMD-4 | The three terminal outcomes appear and no fourth | `ABORT`, `DEGRADED`, `CLEAN` each appear; no other all-caps outcome token appears in an outcome position. §2 is closed and a document that invents a fourth has invented a state the report cannot produce | green |
| CMD-5 | An `ABORT` is documented as naming its cause | The document states the `ABORT (<phase>, <assertion-id>)` form and gives at least one instance. §2 requires the cause; a document that says only "it stops" describes a different contract | green |
| CMD-6 | The blocking set is stated as three named modes, not as a judgement | The document names `offline`, `present-but-wrong` and `partially-acquired` as what suppresses the first run, and nowhere phrases the gate as "fully succeeded" or any synonym. `3 [Q-BLOCKING-MODES]`. §5 says why: a gate phrased as a judgement cannot be tested | green |
| CMD-7 | The document defers to the contract on disagreement | The document states in its own words that `oracle/bootstrap_contract.md` is the statement and `CLAUDE.md` is the bug. A document that claims final authority over its own specification cannot be corrected by the specification | green |

### 1.2 The two working copies

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| CMD-8 | Acquire and Verify are separated, and the separation is visible in the commands | No command block that clones also disables push or fetches. This is loose end E7: the two `set-url` lines sat inside the acquire branch, so a working copy present with push still enabled was never reached. A single block doing both reintroduces it | green |
| CMD-9 | The push-disable and the fetch are stated as running every session | Both appear under a heading or sentence that says every session, and neither appears under a condition on anything having been cloned | green |
| CMD-10 | The fetch carries `--prune` and a forced refspec | The fetch command matches `fetch .*--prune`. `oracle/currency_policy.md` §4 requires prune, and without it a branch deleted upstream keeps resolving from a stale tracking ref and returns a clean verdict against a branch that does not exist. **`oracle/bootstrap_contract.md` BC-10's command cell omits it and is the bug**; see `cr_scratch/step6_writer.md` finding F1 | green |
| CMD-11 | No destructive git verb is **invoked** anywhere in the document | No line of `CLAUDE.md` matches the destructive-invocation pattern below this table, which tests for the verb in git **subcommand position** rather than for the word anywhere. §5 *What no mode does* and currency policy §10. A working copy is somebody else's repository | green |
| CMD-12 | The vendoring prohibition is stated with its reason | The document states that neither working copy is ever copied into this repository, and gives the reason — a second authority drifts. §8 rule 1. A prohibition with no reason is a rule the next session negotiates with | green |
| CMD-13 | The tracked ref record is named and is read-only to the bootstrap | The document names `oracle/VERIFIED.tsv`, states that the current verified ref for a copy is the **last** row for that copy, and states that bumping it is a human act. Currency policy §3: a reader taking the first row reports three of this project's own commits as an upstream move | green |
| CMD-14 | The document does not restate the drift verdict sets | Neither the five CURRENCY values nor the six CHECKOUT values are enumerated in `CLAUDE.md`. They are `oracle/currency_policy.md` §6's closed sets, and a second copy of a closed set is a set that drifts | green |

**CMD-11's pattern**, and the repair it records. The row first read *`reset`, `clean`, `checkout`,
`pull`, `merge`, `rebase`, `push` appear in no command block and in no instruction*. The Editor ran it
at 6.5 rather than accepting my account of it, and it went **red against a correct `CLAUDE.md`**: the
only occurrences of `push` in the command blocks are the push-disable and the assertion that it took,
which is BC-6 and which CMD-9 separately requires to run every session.

**A check row whose only green path is to stop disabling push is a check row that pressures a future
session into removing a safety control.** That is the same shape as the defect the contract records at
§5 about `fully succeeded` — a criterion the correct artifact cannot satisfy. The row was wrong and the
document was right.

```
(^|[^[:alnum:]_-])git( +-C +[^ ]+)? +(reset|clean|checkout|pull|merge|rebase|push)([ ]|$)
```

The verb must follow `git`, with at most a `-C <path>`, and must be followed by a space or end of
line. Four non-destructive forms therefore pass, and each is the document forbidding the act rather
than performing it: a flag (`--push`), git's own output (`DISABLED (push)`), a hyphenated subcommand
(`merge-base`), and the verb as the object of a prohibition (*never `reset --hard` a working copy*).

**Proved in both directions before landing, because a widened condition that no longer fails is not a
repair.** Against twelve constructed destructive invocations — `git reset --hard origin/main`,
`git -C "$d" push --force`, `cd lsei && git reset --hard`, `git clean -fdx`, `foo; git checkout -- .`
and seven more — the pattern matches **12 of 12**. Against seven lines drawn from `CLAUDE.md`'s
push-disable, its `merge-base` call and its prohibition list, it matches **0 of 7**. The old pattern
scored 2 of 7 on that same safe set, and both hits were the push-disable.

### 1.3 The read sequence and the first run

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| CMD-15 | The read sequence is exactly Phase 6's three entries, in order | `cr-agents/method/operational_guide.md`, then `cr-agents/prompt0.md`, then `lunar-oracle-gameplan.md`. No fourth entry, none dropped, none reordered | green |
| CMD-16 | The compaction exception is stated on the one entry that carries it | `cr-agents/prompt0.md` is marked first-session-only. Applying it to the whole sequence loses the method guide after every compaction | green |
| CMD-17 | A missing read-sequence document is reported rather than skipped silently | The document states that the sequence does not shorten quietly and that the report names which document the session is operating without. Phase 6 on failure | green |
| CMD-18 | The first-run **content** is not inlined | `CLAUDE.md` contains no haiku and no line of the opening sequence; it names `oracle/first_run_content.md` as where the text lives. Contract Phase 7: the mechanism decides whether the sequence plays, the content decides what it says, and neither reaches into the other | green |
| CMD-19 | The status line is documented as separate from the sequence | The document states the order — sequence first, then the status line on its own plain line — and states that the line is never folded in. Phase 7 | green |
| CMD-20 | The flag is documented as per-install, and replay as correct | The document states that a second clone on a second machine plays the sequence again and that this is correct, and that a sequence which does not complete replays. Phase 7 | green |

### 1.4 The document as a document

| ID | What is tested | Pass criterion | Status |
|---|---|---|---|
| CMD-21 | Every command block names the shell it runs in | Each fenced command block carries an info string of `bash` or `powershell`, and no block mixes the two syntaxes. **The seed stub failed this**: a `[ -d cr-agents ]` short-circuit clone and a `for … done` loop, unlabelled, in a project whose primary shell is PowerShell and whose standing rules record that heredocs fail in it | green |
| CMD-22 | The document states no count of anything the corpus holds | No cardinal quantity, in digits or spelled, appears as a count of summaries, sources, folders, personas or tests. A number in the file every session reads first is a number nobody re-verifies. Register specification §3.2 established the same rule for the opening sequence and B5 established the cost: `182 sources` was a filename count | green |
| CMD-23 | Every repository-relative path named in the document resolves, or is marked as created at runtime | For each path token: it exists in the tree, or it is a working-copy path the document has already said Phase 3 clones, or it is `.oracle-state.json` and the document has said the bootstrap writes it | green |
| CMD-24 | A session can act on the document in one reading | H. A person who has not seen this repository reads `CLAUDE.md` once and can state, without re-reading: what to run, in what order, what to do when each step fails, and what to read next. This is Trimble's one-reading test and it is the only row here that cannot be a `grep` | H |

**Not asserted here, on purpose.** Whether the prose carries AI-writing markers is 6.5 and belongs to
The Editor. Whether the tree a cloner sees matches what the document describes is 6.5 and belongs to
The Designer. Whether the bootstrap *does* what the document says is 6.1. Three seats, three suites,
no overlap.

## 2. RDM — the `README.md` document

Reserved for sub-step 6.11. Empty by design; see the note on group prefixes above.
