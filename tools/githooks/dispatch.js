#!/usr/bin/env node
/*
 * tools/githooks/dispatch.js -- THE DISPATCH ENGINE. Not a hook, and git never invokes it.
 * Written at 2.20 by The Systems Engineer, 2026-08-28.
 *
 * WHY THIS FILE EXISTS, AND IT IS THE ONLY REASON. 2.20 adds a SECOND trigger (merge-gate)
 * beside the one installed at 2.14 (pre-commit). Two dispatchers with two copies of the
 * membership test, the status rule, the argv rule and the exit-code classification are TWO
 * AUTHORITIES ON HOW A CHECK IS INVOKED, and they drift -- silently, because each is green
 * against its own copy. The register is one list; there is one engine that reads it.
 *
 * This is deliberately the opposite of the ruling in tools/check_registers.js, where fifteen
 * duplicated lines were held cheaper than a hidden coupling. The distinction is not taste. There
 * the duplicated thing was a PARSE OF TWO DIFFERENT FILES with two different schemas that merely
 * looked alike. Here the duplicated thing would be ONE RULE ABOUT ONE FILE, and a rule about one
 * file that exists in two places is a defect waiting for the day the two disagree.
 *
 * The hooks that require this file are thin by design: a trigger is a NAME plus whatever is
 * peculiar to that event (the HK-3 canary is peculiar to pre-commit and lives there). Everything
 * that is a property of the REGISTER lives here.
 *
 * CL-8(b): each caller names its own row id and passes it in; this file prints it. The join
 * stays bidirectional -- the register names the hook, the hook names its row.
 *
 * THE 100644 TRAP (HK-2). core.filemode is false on the authoring machine, so a file committed
 * here at mode 100644 is executable in this working tree and INERT on a Linux clone. This file
 * is require()d rather than executed, so its own mode does not matter -- but the hooks that
 * require it do. `git ls-files -s tools/githooks/` must report 100755 for pre-commit and
 * merge-gate. Fix: git update-index --chmod=+x. And see .gitattributes, added at 2.20: without
 * `text eol=lf` these shebangs are CRLF on a Linux clone and every one of them is `bad
 * interpreter`. That is the same family as the mode trap -- a mechanism that works on the
 * author's machine and is inert on a clone -- and core.autocrlf=true was the only thing
 * preventing it.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
const REGISTER = path.join(ROOT, 'oracle', 'check_register.md');

/* ---- CON-6: THE REENTRANCY GUARD, SHARED BY EVERY TRIGGER --------------------------------
 *
 * `git hook run` has NO reentrancy guard and sets NO environment marker a hook can test, so
 * nothing in git bounds this. The cycle measured at the 1.5/1.13 review was CHK-10 dispatching
 * CHK-09, CHK-09 invoking the hook-run subcommand, and that re-entering CHK-10 -- unbounded, on
 * every commit. R-2 split the row, so the cycle does not exist today. THAT IS NOT A FIX, IT IS
 * THE ABSENCE OF ONE INSTANCE: the next row anyone adds that names a trigger and shells out
 * re-creates it, and the failure mode is a machine that stops responding rather than a red test.
 *
 * THE MARKER IS ONE MARKER ACROSS ALL TRIGGERS, and that is the whole reason the guard moved
 * here. A per-trigger marker bounds pre-commit inside pre-commit and merge-gate inside
 * merge-gate, and leaves pre-commit -> merge-gate -> pre-commit unbounded. Adding the second
 * trigger is exactly what would have created that hole, so the guard is generalised in the same
 * edit that creates the hazard rather than in a later one.
 *
 * The guard lives in a DISPATCHER and never in an assertion. check_register.md section 5.1
 * rejected the sentinel alternative for HK-1 on the ground that it makes an ASSERTION'S MEANING
 * depend on who called it. That objection is correct and it does not reach this code: nothing
 * here asserts anything. A dispatcher declining to dispatch itself changes no assertion's
 * meaning; it bounds a recursion.
 *
 * The depth and the trigger chain are REPORTED rather than silently absorbed, because a guard
 * that hides the recursion leaves the defect in place and removes the symptom -- after which the
 * row that caused it looks fine forever.
 */
const DEPTH_KEY = 'LUNAR_ORACLE_HOOK_DEPTH';
const CHAIN_KEY = 'LUNAR_ORACLE_HOOK_CHAIN';

/* ---- the register parse ------------------------------------------------------------------ */

function loadRows(fail) {
  if (!fs.existsSync(REGISTER)) {
    /* The register is the dispatch list. Missing, a dispatcher does not know what to run, and a
     * dispatcher that runs nothing while exiting 0 reports a pass it did not earn. */
    fail('oracle/check_register.md not found. Nothing dispatched, and that is a failure, not a pass.');
  }
  const text = fs.readFileSync(REGISTER, 'utf8');
  const parts = text.split('# BEGIN CHECKS');
  if (parts.length !== 2) fail('register has no single # BEGIN CHECKS block.');
  const block = parts[1].split('# END CHECKS')[0];

  return block.split('\n')
    .filter(function (l) { return l.indexOf('C\t') === 0; })
    .map(function (l) { return l.split('\t'); })
    .filter(function (c) { return c.length === 9; })
    .map(function (c) {
      return { id: c[1], p: c[2], kind: c[3], asserts: c[4], invoked: c[5], onFail: c[6], status: c[8] };
    });
}

/* ---- membership, and the argv a row carries ----------------------------------------------
 *
 * `invoked_by` is a comma-separated set from a closed vocabulary, and the register ALREADY
 * writes one token in a `token:payload` form -- `consumed:CHK-05` on CHK-07. This function reads
 * every token that way, which costs nothing for a bare token and buys the one thing 2.20 needed
 * and did not have.
 *
 * WHAT IT BUYS, and it was found by RUNNING rather than by reading. CHK-04 (tools/ecr_verify.js)
 * names merge-gate and takes TWO POSITIONAL ARGUMENTS -- a TSV path and a corpus root. Invoked
 * bare it throws an uncaught TypeError out of readFileSync and node exits 1, which this engine's
 * own classification below would read as A FINDING ABOUT THE STAGED CONTENT. A dispatcher that
 * accuses the corpus because an instrument was called wrongly is worse than one that does not
 * run: it sends a person to the wrong place with confidence. So the argv has to come from
 * somewhere, and there are only three candidates:
 *
 *   - a tenth register column. A schema change to a promoted contract, during a freeze, for one
 *     row. Rejected.
 *   - a table inside this file, keyed on row id. That is the second authority the whole file
 *     exists to prevent, and it drifts the first time the row changes. Rejected, and it is the
 *     one this file must be most careful about, because it is the convenient answer.
 *   - THE CELL THAT ALREADY SAYS HOW THE ROW IS REACHED. Taken.
 *
 * So `merge-gate:oracle/REGISTER.lunar.tsv literature` means "this trigger invokes this row with
 * that argv", and a row may name the same trigger twice with two payloads, which is how one row
 * covers the two REGISTER sidecars without becoming two rows. Bare `merge-gate` means no argv,
 * which is every other row and is why nothing else changes.
 *
 * The payload is split on spaces. A path containing a space cannot be expressed and the register
 * says so at section 3 rather than this file failing obscurely; no path in this repository has
 * one, and NAMING.md forbids one in the corpus.
 */
function tokensOf(row) {
  return row.invoked.split(',').map(function (s) {
    const t = s.trim();
    const i = t.indexOf(':');
    if (i === -1) return { token: t, payload: null };
    return { token: t.slice(0, i), payload: t.slice(i + 1) };
  });
}

/* section 3: a multi-mode artifact carries its mode as a literal prefix on `asserts`. The mode
 * is read from the register rather than hard-coded, because a dispatcher holding its own copy of
 * a check's invocation is the second authority again, one level down. */
function modeArgv(row) {
  const m = /^(--[a-z-]+):/.exec(row.asserts);
  return m ? [m[1]] : [];
}

/* ---- the engine --------------------------------------------------------------------------- */

/*
 * dispatch({ trigger, rowId, before })
 *   trigger  the invoked_by token this run answers to
 *   rowId    the check-register row of the CALLING HOOK, printed on every line (CL-8(b))
 *   before   optional; run after the guard and the parse, before anything is dispatched
 * Returns an exit code. Never calls process.exit itself except through fail().
 */
function dispatch(opts) {
  const trigger = opts.trigger;
  const rowId = opts.rowId;

  function say(s) { console.log(rowId + ' ' + s); }
  function err(s) { console.error(rowId + ' ' + s); }
  function fail(msg) { err(trigger + ' dispatcher: ' + msg); process.exit(1); }

  const depth = parseInt(process.env[DEPTH_KEY] || '0', 10) || 0;
  const chain = process.env[CHAIN_KEY] || '';

  if (depth > 0) {
    err('REENTRANCY REFUSED at depth ' + (depth + 1) + '. Chain: ' + chain + ' -> ' + trigger);
    err('A dispatcher was re-entered from inside a check another dispatcher had already');
    err('dispatched. That is the CHK-09/CHK-10 cycle of check_register.md section 5.1, which is');
    err('unbounded because git hook run has no guard of its own. It is refused here rather than');
    err('left to the operating system.');
    err('THE DEFECT IS THE ROW, NOT THIS REFUSAL: some row in the chain above shells out to a');
    err('trigger. CL-8(a) is the grep that names it.');
    process.exit(1);
  }

  const rows = loadRows(fail);

  /* One row may name one trigger more than once, with a different payload each time. The unit of
   * dispatch is therefore (row, payload) and not row, and the counts below say so. */
  const jobs = [];
  for (const r of rows) {
    for (const t of tokensOf(r)) {
      if (t.token === trigger) jobs.push({ row: r, payload: t.payload });
    }
  }

  if (jobs.length === 0) {
    fail('no row names ' + trigger + '. A dispatcher with an empty list is not a clean run.');
  }

  /* Children inherit the incremented depth and the chain, so a check that invokes ANY trigger
   * re-enters the engine at depth 1 and is refused above. Set after the parse, so that a
   * register failure does not leave a poisoned environment behind in an interactive shell. */
  process.env[DEPTH_KEY] = String(depth + 1);
  process.env[CHAIN_KEY] = chain ? chain + ' -> ' + trigger : trigger;

  if (opts.before) opts.before({ say: say, err: err, root: ROOT });

  const skipped = [];
  let ran = 0;

  for (const job of jobs) {
    const r = job.row;

    /* STATUS IS OBEYED, AND SKIPS ARE LOUD. A row with status `specified` is a debt, not a
     * mechanism (section 7), and its artifact does not exist yet. Not attempted -- but PRINTED,
     * by id, on every run. A debt invisible at the moment it would have mattered is a debt
     * nobody pays. CL-2 keeps status honest: a `specified` row whose path exists is a blocking
     * register failure, so status cannot quietly lie about an artifact that has since landed. */
    if (r.status === 'specified') { skipped.push(r.id + ' (' + r.p + ' -- specified, artifact does not exist yet)'); continue; }
    if (r.status === 'retiring') { skipped.push(r.id + ' (' + r.p + ' -- retiring)'); continue; }

    const abs = path.join(ROOT, r.p);
    if (!fs.existsSync(abs)) {
      /* status says live, the file is gone. CL-2 makes this a blocking register failure; here it
       * is a blocking dispatch failure, because the alternative is skipping a live check
       * quietly. */
      fail(r.id + ' is status ' + r.status + ' but ' + r.p + ' does not exist. A live check that cannot run is not a pass.');
    }

    const argv = modeArgv(r).concat(job.payload ? job.payload.split(/\s+/).filter(Boolean) : []);

    let cmd, args;
    if (/\.js$/.test(r.p)) { cmd = process.execPath; args = [abs].concat(argv); }
    else if (/\.sh$/.test(r.p)) { cmd = 'sh'; args = [abs].concat(argv); }
    else { cmd = abs; args = argv; }

    say('dispatching ' + r.id + ' ' + r.p + (argv.length ? ' ' + argv.join(' ') : ''));
    const res = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit' });
    ran++;

    if (res.error) fail(r.id + ' could not be executed: ' + res.error.message);

    /* SECTION 2, on_failure: block -- "Exit 1 is a finding. Any other non-zero exit is a harness
     * failure, not a finding, and is reported as such." tools/ecr_verify.js exits 2 on a usage
     * error. A dispatcher that reads 2 as a check failure reports the wrong thing about the wrong
     * file: it tells the committer their content is bad when in fact the instrument is broken, and
     * the committer then goes looking in the corpus for a defect that is in the tooling. Both
     * still stop the run -- an instrument that cannot run is not a pass either -- but they are
     * NAMED DIFFERENTLY, because the two send a person to two different places. */
    if (res.status === 1) {
      console.error('');
      err('BLOCKED by ' + r.id + ' (' + r.p + ') -- exit 1, a FINDING. on_failure=' + r.onFail);
      err('dispatched ' + ran + ' of ' + jobs.length + ' jobs naming ' + trigger + '; first non-zero exit wins.');
      return 1;
    }
    if (res.status !== 0) {
      console.error('');
      err('HARNESS FAILURE in ' + r.id + ' (' + r.p + ') -- exit ' + res.status + ', which is not 1.');
      err('This is NOT a finding about the content. The instrument itself did not run correctly');
      err('(usage error, missing input, internal error). Fix the tool, not the commit.');
      return res.status;
    }
  }

  say(trigger + ': dispatched ' + ran + ' of ' + jobs.length + ' jobs, all exit 0.');
  if (skipped.length) {
    say('NOT DISPATCHED, and these are debts rather than passes:');
    for (const s of skipped) say('  skipped ' + s);
  }
  return 0;
}

module.exports = { dispatch: dispatch, tokensOf: tokensOf, modeArgv: modeArgv, ROOT: ROOT, REGISTER: REGISTER };
