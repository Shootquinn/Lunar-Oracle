# Finding: the run log is per-machine, and its `deliverable` field is per-install

Run `r-2026-09-02-0001`, 2026-09-02. Found while reading the log before opening this run, not
looked for.

## What was observed

`tools/verify_answers.js` line 47: `const DEFAULT_LOG = path.join(os.tmpdir(), 'lunar-oracle',
'run_log.jsonl')`. The log lives in the **operating system's temp directory**, which is per-machine
and per-user. It is not inside any install.

At 2026-09-02T17:03Z this session read that file and it held **one** row. At 17:10Z it held **two**.
The added row is timestamped `2026-09-02T16:58:58Z` — *before* this session bootstrapped — and its
`deliverable` is `answers/deloitte-lunar-economy-second-review.md`, which does not exist in this
install, in its git history, or anywhere under this repository.

It exists in a **second install on the same machine**:
`.../CC/oracletest2/answers/deloitte-lunar-economy-second-review.md`, 233 lines. That install holds
its own 169-file `literature/`, its own `cr-agents/`, and **no `lsei/`** — which is why its row
correctly writes `lsei_ref: "-"`, the value `answer_contract.md` §8 reserves for a run where `lsei`
was absent. That field is not the defect.

Both installs append to one log. Neither knows the other is there.

## Why it is a defect and not a coincidence

`answer_contract.md` §8 closes on the sentence that names the failure exactly:

> *A log row that cannot retrieve the bytes that were delivered cannot be sampled.*

The `deliverable` field is a **repository-relative path**, and the log it is written into is
**machine-scoped**. A relative path is only a locator against a root, and the row carries no root.
So a sampling read under `oracle/sampling_protocol.md`, run from this install, resolves
`answers/deloitte-lunar-economy-second-review.md` against *this* tree, finds nothing, and has no way
to distinguish three cases it must distinguish: a deliverable that was deleted, a deliverable that
was never written, and a deliverable that is present in a different install. All three read as the
same absence.

This is the `install_state.md` §2 M2 test applied to an object that never took it. That file rules
that anything which must survive a clone is content, and anything about *this install* is state, and
it applies the subject test — *whose fact is this?* — to every candidate field. The run log was never
put through it. Its rows are the project's facts, its path is a machine's fact, and its
`deliverable` field is an install's fact. Three subjects, one file.

**It is also the container-versus-content failure this project keeps naming**, in the one artifact
whose whole job is to be sampled: `node tools/verify_answers.js` returns `RESULT PASS (log
well-formed)` over both rows. The integrity check reads the row's *shape* and never asks whether the
path resolves. A log that is internally consistent, passes its own checks, and cannot retrieve half
its own deliverables is the ninth instance of the pattern, and it passed.

## A second, smaller deviation in the same row

The added row writes `"reason_code": null`. Row 1 of the same log, and the header block specified at
`deliverable_shape.md` §2, write `"-"` where the verdict is not `REFUSE`. `verify_answers.js` accepts
both. The closed-set check on that field does not fire on `null`.

`null` and `"-"` are the same fact written two ways, which is the condition under which a consumer
that filters on one silently drops the other. It is cheap to close and it is not this run's file.

## What is owed, and to whom

Not fixed here. This run is answering a question, and the fix touches `tools/verify_answers.js`,
`answer_contract.md` §8's row schema, and whatever writes the row — three files belonging to two
other seats, and a schema change to §8 is a contract version bump under §9.

The shape of the fix, stated so the owning seat does not have to re-derive it: **the row needs a
root.** Either the log moves inside the install — which makes it per-install state and hands it to
`install_state.md`'s rules, at the cost that a machine-wide sampling read then has to walk installs —
or the row gains a tenth field naming the install root, which keeps one log and makes `deliverable`
resolvable. The second is the smaller change and the first is the more honest one, and choosing
between them is a ruling, not an implementation detail.

**Owner:** the seat that owns `answer_contract.md` §8 — The Software Engineer, who wrote the
two-column outcome schema and the ninth field.

**Not escalated as a blocker.** Nothing about this run's answer depends on it. It is reported because
a sampling protocol that cannot retrieve its own deliverables is a protocol that will return a clean
proportion over a population it never read, and this project has shipped that exact output shape once
already — `audit_abstract_overlap.js` reporting *"AT OR ABOVE 10%: 0"* over a tested population of
zero, recorded at `deliverable_shape.md` §4.
