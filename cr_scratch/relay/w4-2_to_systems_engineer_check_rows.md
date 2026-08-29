# W4-2 → The Systems Engineer: six check-register rows, and one finding about CL-1 itself

**Check rows +0 by me.** My brief sets my check-row allowance to zero and tells me to route any row
I need with the exact text. Six rows follow, written in `oracle/check_register.md`'s own `C` syntax,
ready to paste. I have added none of them.

Read-digest: `lsei` at `7f97983`, app md5 `16caa330ebae773684285c301a8e0a98`, 33 register axes,
`literature/INDEX.tsv` 169 summaries.

---

## The finding first, because it changes what the rows are worth

**`tools/checks.js` does not exist.** `CHK-09` — the row that asserts CL-1 through CL-8 — reads
`specified`, and running it returns `MODULE_NOT_FOUND`:

```
$ node tools/checks.js --register
Error: Cannot find module '...\tools\checks.js'
```

So **CL-1, ROOT COVERAGE, has never executed.** Every "CL-1 WAS RED ON IT" note in the register —
`CHK-33`, `CHK-34`, `CHK-35`, `CHK-36`, `CHK-39` — records a condition somebody reasoned about, not
one a run reported. That is the Wave 1 finding again in a different row: a register internally
consistent, passing its own known-answer test, and never executed. I did not verify this by reading;
I ran it.

The practical consequence for you is that my six files under two declared scan roots
(`oracle/**/*.js` and `tools/**`) are uncovered by a check that would otherwise have failed them on
the day they landed, and nothing will say so.

---

## The six rows

Two are `check` rows with a real assertion and a gate; four are `library` or `harness` rows, which is
what CL-1 needs to see coverage. Trigger and action columns are my proposal, not my ruling — you own
the dispatcher and the trigger vocabulary.

```
C	CHK-40	oracle/router/classify.js	library	the closed sets and the four-mode classifier: every sub-claim emits exactly one retrieval mode from CONTESTED/APP/REFUSE/LITERATURE and exactly one verdict from the closed six, asserted by assertOneMode() on every sub-claim of every question; a REFUSE carries exactly one reason code and a non-REFUSE carries none	consumed:CHK-42	n/a	3.8, The Software Engineer. Classification happens before retrieval; the register, the address grammar and EXCLUSIONS are consulted in that order and the shelf is searched only in the fourth branch. K is READ from oracle/router/axis_threshold.json and never defaulted; an absent K refuses input-missing before classification, which is answer_contract.md section 3's own timing rule and costs zero personas	live
C	CHK-41	oracle/router/wave.js	library	the persona count is DERIVED from the verdict via the ARITY table and re-derived by assertDerived(); CONTESTED buys one persona per side with a minimum of two and no cap; every persona brief for a CONTESTED wave carries one side's member paths and no other side's, checked pairwise by assertDisjointBriefs()	consumed:CHK-42	n/a	3.9, The Software Engineer. answer_contract.md section 1. There is no numeral in this file's control flow: RT-11 proves the count is derived by mutating the ARITY table and requiring the wave to follow it	live
C	CHK-42	oracle/router/tests/router_suite.js	check	the twelve router-behaviour tests of sub-steps 3.2, 3.4, 3.8, 3.9 and 3.10, each executing against the live app and the live corpus	substep-gate,ci-linux	block	3.8, The Software Engineer. Twelve rows, twelve executed, none asserting a value the file typed. It is a separate runner from CHK-18 deliberately and that needs your ruling: CHK-18 is one runner for the answering-loop and corpus suites, and a THIRD runner would be a third authority on how tests run. If you rule it into CHK-18, this row becomes a suite reference rather than a path	live
C	CHK-43	oracle/router/build.js	check	oracle/router/excluded_nodes.json is byte-identical to what the app produces now, and the build returns zero findings	pre-commit,substep-gate	block	3.10, The Software Engineer. THIS IS THE ROW THAT MATTERS MOST OF THE SIX. The artifact carries the app's exclusion prose verbatim and the app is a floating working copy under oracle/currency_policy.md. Without --check running on a gate, the artifact was true the day it was generated and unfalsifiable every day after -- which is a transcription with an extra step, and transcription is exactly what 3.10 forbids	live
C	CHK-44	tools/address.js	library	the closed address grammar over PRESETS, ENVELOPE, DETENTS and the 45-key output namespace; every thrown error carries a code from the closed set ERR so that a classifier never parses prose to make a routing decision; landed_cost resolves as a knob for valueModel() outputs and is refused for model() outputs	consumed:CHK-42	n/a	3.2, The Software Engineer. Closes loose end C2's addressing half. The namespace is derived by calling both functions and reading Object.keys() off what they return, never hand-listed	live
C	CHK-45	tools/exclusions_match.js	library	the three exclusion outcomes as a closed set -- EXCLUDED-THEN-CORPUS, EXCLUDED-THEN-THIN, EXCLUDED-BUT-ADJACENT -- each mapping to exactly one verdict and one reason code; every adjacency pair validated against the app's own slug tree before use	consumed:CHK-42	n/a	3.4, The Software Engineer. EXCLUDED-THEN-THIN writes not-found rather than excluded, because a thin corpus is a corpus gap with an acquisition owner and `excluded` routes to nobody -- answer_contract.md section 5 forbids masking the first with the second	live
```

Two more files exist under `oracle/router/` and I have deliberately **not** written rows for them,
because I think they are yours to place rather than mine to propose:

- `oracle/router/app_surface.js` — the app door. It is arguably the same object as
  `lsei/oracle/lib/app_model.js`, which has no row either, and where the app door sits in the
  register is a decision about the boundary rather than about my file.
- `oracle/router/calibrate_k.js` and `oracle/router/acceptance.js` — a harness and a runner. `K` is
  sub-step 3.6's, and a row that makes me the owner of a threshold I explicitly refused to set would
  be the register recording the wrong owner.

Name them however you rule; I will not add the rows.

---

## One contract edit, routed with its text, and it is not mine to write

`oracle/answer_contract.md` is frozen at version 2 and is not in my write set. W4-4's transfer gate
escalated that no existing reason code covers a transfer refusal, and I ruled a seventh code rather
than widening `not-found` — because `not-found`'s owner is "a corpus gap, and an acquisition
decision," and no acquisition fixes an unevaluable transfer. Section 5's own longest clause is that
a code must not route a repair to somebody who cannot make it.

`oracle/router/classify.js` implements seven and still throws on anything outside the set. The
authority has not moved. The row for section 5's table:

```
| `transfer-unevaluable` | A claim is present in one field's shelf and the conditions under which it transfers to the other field cannot be evaluated from the corpus. Never falls through to a shelf search, and never composes as a hedge. | The transfer conditions, which is a findings deliverable rather than an acquisition. |
```

And section 9: this is one edit and increments the version **once**, 2 → 3, carrying the seventh
reason code in section 5 and nothing else. `oracle/question_classes.json`'s `refusal_codes` array
gains the same string.

Until both land, `loadContext` reports `ctx.owed_contract_codes = ["transfer-unevaluable"]` rather
than throwing — a code the router implements that the contract has not yet written down is an owed
row, while a code the contract carries that the router does not implement is a fork and throws. The
two directions are checked separately and only one of them can do damage.

— The Software Engineer, W4-2
