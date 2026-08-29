# Wave 4 standing block — the build wave

**THE AUTHOR, 2026-08-28, verbatim.** *"Stop circle-jerking. You are not the crew of Ark Ship B, this
is not the committee to reinvent the wheel. We are doers with a bias towards action. I gave you two
solid ass lunar project folders and a repo and wanted you to throw it in a blender. It's been two
days. Keep the synergies and cut the committee meetings."*

He also invoked the orchestrator's own charter at me, correctly: the orchestrator is **Frederick
Taylor's scientific management applied to quality** — the complement to The Manager's Deming. The
Manager gives you wide latitude and trusts the specialist closest to the work. That is right and it
stays. **My job is the scope contract: when a step defines N sub-steps, all N get done. There is no
conditional close and no deferral by preference.** Christmas is cancelled until the deliverables match
the plan.

So: **you have latitude on HOW. You have none on WHETHER.** Every sub-step in your brief ships this
wave or comes back with a measured reason that is not "it needed more discussion."

## What this wave is

**Steps 3 through 7. The Oracle stops being a specification and starts answering.** Steps 0 through 2
built the corpus and the enforcement layer; `literature/` holds 169 summaries and none of it answers a
question yet. That is this wave.

**Remember what the Oracle IS.** It is not a program. It is a Claude session reading this repository
under `oracle/answer_contract.md`. That contract — six verdicts `APP`/`FIGURE`/`LITERATURE`/`BOTH`/
`CONTESTED`/`REFUSE`, personas by field, citation traces, the anti-synthesis rule — is the program,
and Claude executes it. **So a JSON register a session reads is worth more than a clever module, and
prose a session must follow is a deliverable, not documentation.** Build accordingly.

## The freeze, still on

No net-new check row, amendment row, quantity id, test or contract clause unless it is required for
your close condition or discharges something owed. **Prose is apparatus.** Do not write a memorandum
about the work; do the work. End your deliverable with:

```
apparatus: check rows +N/-N | amendment rows +N/-N | quantity ids +N/-N | tests +N/-N
```

TDD sub-steps are the explicit exception: where your brief says write the suite first, those tests are
the deliverable and are not freeze spend. Say so in the ledger.

## State at the wave open, `HEAD = 99d3601`

- **`literature/` holds 169 `.md`** + `INDEX.tsv` + `FIELDS.tsv`, eleven folders, zero PDFs, LF pinned.
- `node oracle/tests/run_suite.js` → **405 rows, 33 pass, 4 fail, 368 unrun**, exit 1. Of the 368: **7
  DEFERRED with a named blocker, 0 VACUOUS, 361 with no executable binding at all.** That last number
  is the honest state of the test contract.
- `node tools/verify_corpus.js` → 1 failure (`PTH/A3`, three naming-ceiling breaches), 39 OK, 1
  VACUOUS, 6 REPORT. It carries a known-answer test and has already caught its own parser breaking.
- `node tools/check_registers.js` → 0 FAIL. `node tools/quantities.js --check` → 5 @ `ce27ff5a545de7ec`.
- `tools/quantities.js --index` writes nothing; the in-place write is `--index --write`.
- The four standing suite failures are argued in `af7abec` and are **not yours to silence**.

## Rules

1. **Premise check first.** Measure your brief's claims before trusting them. Every wave so far, most
   seats have refuted a premise in their own brief — including several the orchestrator wrote. Assume
   yours are wrong until you have run something.
2. **Every count carries its command and read-digest.** Figures at different digests are not comparable.
3. **`## Not mine`** is required, even if it says `none`.
4. **Stay in your write set.** Route by relay to `cr_scratch/relay/`; never edit another seat's file.
5. **`lsei/` and `cr-agents/` are READ-ONLY.** The prototype code in `lsei/oracle/` is a pattern to
   read and reimplement under `oracle/`, never a file to edit. Do not push anything, ever.
6. **Namespace scratch files** with your seat id. Two seats have already collided on a bare name.
7. **LF only.** Line endings have caused five distinct failures in this project.
8. **Heredocs fail in this shell.** Use the Write tool.
9. **A test believed wrong is argued, not edited to pass.** `UNRUN IS NOT PASS`; `VACUOUS IS NOT PASS`.
10. **You may sequence your own chain.** Your sub-steps are ordered; do them in order in one sitting
    rather than waiting on a barrier. Where you genuinely need another seat's output, write the
    TDD-first artifact now and relay for the rest.

**Report back in chat SHORT.** Pointer, close-condition status per sub-step, ledger. Detail goes in the
deliverable.
