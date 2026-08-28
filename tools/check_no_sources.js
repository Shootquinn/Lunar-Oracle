#!/usr/bin/env node
/*
 * tools/check_no_sources.js -- the containment check. Check-register row CHK-13.
 * Built at sub-step 2.14 by The Systems Engineer, 2026-08-28, to the assertions of
 * oracle/tests/corpus_suite.md rows PDF-1 through PDF-16 (The Software Engineer).
 *
 * WHAT THIS IS FOR. This repository ships summaries the project wrote. It does not ship the
 * publications it summarises. Wave 3 pulls 224,042,382 bytes of PDF into literature/_pdf/,
 * and this check is the thing that stops one of them being committed from anywhere else.
 *
 * WHY IT EXISTS WHEN .gitignore ALREADY HAS A RULE. A path rule matches a NAME. It cannot see
 * source-1.pdf.bak, whose extension is .bak. It cannot see a PDF renamed to x.md. 1.1 section
 * 4.1 states the general form: the enforcement layer fails closed on unknown file TYPES and is
 * blind to unknown CONTENT inside an admitted type. .gitignore is the name half. This is the
 * content half. NEITHER SUBSTITUTES FOR THE OTHER, and the failure mode of believing otherwise
 * is that the half you kept reports success.
 *
 * WHY A COMMITTED SCRIPT AND NOT A HOOK. Git hooks are not cloned (loose end E1). A hook alone
 * is not a mechanism. The mechanism is this committed file, plus the core.hooksPath wiring that
 * oracle/bootstrap_contract.md BC-8 installs, plus tools/githooks/pre-commit (CHK-10) which
 * dispatches it. Any one of the three missing and nothing fires.
 *
 * ---------------------------------------------------------------------------------------
 * THE SIZE GATE IS A BACKSTOP AND NOT CONTAINMENT. Read this before tuning it.
 *
 * Measured on this tree, 2026-08-28:
 *     smallest _intake/ source PDF     81,677 bytes   (n = 112 PDFs)
 *     largest corpus summary .md       84,767 bytes
 *
 * The populations OVERLAP. There is NO size threshold, at any value, that separates a source
 * PDF from a legitimate summary. A threshold low enough to catch the smallest PDF flags the
 * largest summary, and a check that flags real corpus files is a check somebody switches off.
 * So the size gate is not sized to catch PDFs. It is sized to catch the ABSURD case -- a
 * multi-megabyte blob nobody meant to add -- while provably never firing on real corpus
 * content, and its coverage is REPORTED rather than assumed. See reportCoverage() below.
 * The gates that actually do containment are EXTENSION and MAGIC.
 * ---------------------------------------------------------------------------------------
 *
 * Modes, and the check always says which it ran (PDF-8):
 *   --staged   the git index. The default, and how CHK-10 invokes it.
 *   --tree     every tracked file. Slower; the merge-gate scope.
 *   --ignore-probe  CON-1: assert the .gitignore carrier rules over a printed probe set (CHK-37).
 *
 * Exit 0 clean, 1 findings, 2 usage/internal error. on_failure: block (CL-5(a)).
 *
 * CL-7 note for the reviewing persona: this file uses child_process.execFileSync to ask git
 * for its own file lists. Fixed argv, no shell, and no file content is ever interpolated into
 * a command. That is the whole of its use.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

/* ---- gate 1: extension -------------------------------------------------------------- */

/* Repository-wide carriers. Mirrors the .gitignore section added at 2.14, so that a file which
 * slips past the ignore rule -- because it was force-added, or because its true extension is
 * hidden behind another one -- is still caught here. */
const CARRIER_EXT = new Set([
  'pdf', 'djvu', 'epub', 'doc', 'docx', 'ppt', 'pptx', 'ps', 'tif', 'tiff',

  /* .txt is IN THE CHECK AND DELIBERATELY NOT IN .gitignore, and the asymmetry is the point.
   * The three UN treaty full texts (18,378 / 23,794 / 27,097 bytes) are source material: they
   * sit under every size threshold and carry no magic bytes, so only an extension rule reaches
   * them (corpus_suite.md PDF-4). But .txt has legitimate non-source uses -- requirements.txt,
   * LICENSE.txt -- and IGNORING it would hide those SILENTLY, whereas BLOCKING names the file
   * and a person rules on it in one line. Measured 2026-08-28: zero .txt tracked, so the rule
   * costs nothing today. For an extension with honest other uses you want the loud instrument,
   * not the quiet one. */
  'txt',
]);

/* PDF-6. Every dot-separated segment is tested, not just the last, so source-1.pdf.bak is
 * caught -- its final extension is .bak and a last-segment test passes it. This is the gate
 * .gitignore structurally cannot have. */
function extensionHit(relPath) {
  const segs = path.basename(relPath).toLowerCase().split('.');
  for (let i = 1; i < segs.length; i++) {
    if (CARRIER_EXT.has(segs[i])) return segs[i];
  }
  return null;
}

/* ---- gate 2: magic bytes ------------------------------------------------------------- */

/* PDF-13. Read as BINARY. A UTF-8 decode of a real PDF can throw or mangle, and a check that
 * exits non-zero because it threw is indistinguishable, under on_failure: block, from a check
 * that exited non-zero because it found something. Reads at most 8 bytes; an empty file yields
 * a zero-length buffer and is simply not a match. */
const MAGIC = [
  { sig: Buffer.from([0x25, 0x50, 0x44, 0x46]), name: '%PDF' },
  { sig: Buffer.from([0x25, 0x21, 0x50, 0x53]), name: '%!PS' },
  { sig: Buffer.from([0x41, 0x54, 0x26, 0x54, 0x46, 0x4f, 0x52, 0x4d]), name: 'AT&TFORM (DjVu)' },
];

function magicHit(absPath) {
  let fd;
  try {
    fd = fs.openSync(absPath, 'r');
    const buf = Buffer.alloc(8);
    const n = fs.readSync(fd, buf, 0, 8, 0);
    const head = buf.slice(0, n);
    for (const m of MAGIC) {
      if (head.length >= m.sig.length && head.slice(0, m.sig.length).equals(m.sig)) return m.name;
    }
    return null;
  } catch (e) {
    /* Unreadable is NOT a finding and is NOT a pass. It is reported separately, in skipped[],
     * so that it cannot be mistaken for a file that was examined and cleared. */
    return undefined;
  } finally {
    if (fd !== undefined) { try { fs.closeSync(fd); } catch (e) { /* closing a bad fd */ } }
  }
}

/* ---- gate 3: size (backstop) ---------------------------------------------------------- */

/* PDF-11: an integer number of BYTES, with the unit named, because "500 KB" means two things
 * 12,000 bytes apart and the assertion then passes under whichever the reader assumed.
 * 500000 bytes = 500 kB SI = 488.28 KiB binary. SI is intended. */
const SIZE_LIMIT_BYTES = 500000;

/* PDF-10. The gate reports what it does NOT cover. Measured against the 112 PDFs in _intake/
 * on 2026-08-28: 29 of them -- 25.9% -- sit under SIZE_LIMIT_BYTES, and this gate would not see
 * a single one of them. A gate that lets a quarter of its target through while printing a
 * success line is the shape of a check that is an inventory entry rather than a mechanism. */
function reportCoverage() {
  return 'size gate is a BACKSTOP: at ' + SIZE_LIMIT_BYTES + ' bytes it does not see 29 of ' +
         'the 112 _intake/ PDFs measured 2026-08-28 (25.9%). Containment is the extension and ' +
         'magic gates; this catches the absurd case only.';
}

/* ---- file lists ----------------------------------------------------------------------- */

function gitList(args) {
  const out = execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return out.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
}

function stagedFiles() {
  /* Added, Copied, Modified, Renamed only. A deletion carries no bytes to inspect. */
  return gitList(['diff', '--cached', '--name-only', '--diff-filter=ACMR']);
}

function treeFiles() {
  return gitList(['ls-files']);
}

/* ---- --ignore-probe: the NAME half, made runnable (CON-1) -------------------------------- */

/* corpus_suite.md CON-1: the eight-path ignore probe must be a FIXTURE THAT RUNS, not a
 * measurement someone once took. The argument is his and it is right: a status cell holding a
 * measurement decays silently, and it had already decayed once -- PDF-2's cell named four open
 * paths when five were open.
 *
 * So the probe is a mode of this file rather than a number in a document. It PRINTS THE PROBE
 * SET IT USED on every run, because the failure this guards against is not a probe that fails,
 * it is a probe set that quietly shrinks until the remaining paths all pass. */
const PROBE_PATHS = [
  'x.pdf', 'docs/x.pdf', 'oracle/x.pdf', 'tools/x.pdf', 'cr_scratch/x.pdf',
  'literature/x.pdf', 'literature/isru/x.pdf', '_intake/x.pdf',
];
const PROBE_CASES = ['x.PDF', 'x.Pdf'];
const PROBE_CARRIERS = ['x.djvu', 'x.epub', 'x.docx', 'x.doc', 'x.pptx', 'x.ppt', 'x.ps', 'x.tif', 'x.tiff'];

function isIgnored(root, rel) {
  const r = require('child_process').spawnSync('git', ['check-ignore', '-q', '--', rel], { cwd: root });
  return r.status === 0;
}

function ignoreProbe(root) {
  const groups = [
    ['PDF-2 eight-path repository-wide probe', PROBE_PATHS],
    ['case permutations', PROBE_CASES],
    ['PDF-3 other published-source carriers', PROBE_CARRIERS],
  ];
  let open = 0, total = 0;
  console.log('CHK-37 ignore-probe: asserting git check-ignore over the probe set below.');
  for (const [label, paths] of groups) {
    console.log('CHK-37 [' + label + '] ' + paths.length + ' probe paths: ' + paths.join(' '));
    for (const rel of paths) {
      total++;
      if (!isIgnored(root, rel)) { open++; console.error('CHK-37 OPEN ' + rel + ' -- commits cleanly; the repository-wide rule does not reach it'); }
    }
  }
  console.log('CHK-37 probe set size=' + total + ' open=' + open +
              ' (a SHRINKING probe set is the failure this reports its own size to prevent)');
  if (open) {
    console.error('CHK-37 ' + open + ' of ' + total + ' probe paths are not ignored. See .gitignore, published-source carriers.');
    return 1;
  }
  return 0;
}

/* ---- main ------------------------------------------------------------------------------ */

function main(argv) {
  let mode = 'staged';
  for (const a of argv) {
    if (a === '--staged') mode = 'staged';
    else if (a === '--tree') mode = 'tree';
    else if (a === '--ignore-probe') mode = 'ignore-probe';
    else if (a === '--help' || a === '-h') { usage(); return 0; }
    else { console.error('check_no_sources: unknown argument ' + a); usage(); return 2; }
  }

  if (mode === 'ignore-probe') {
    return ignoreProbe(gitList(['rev-parse', '--show-toplevel'])[0]);
  }

  const root = gitList(['rev-parse', '--show-toplevel'])[0];
  const files = mode === 'staged' ? stagedFiles() : treeFiles();

  /* PDF-16. THE EMPTY-SET CASE, and it is the one that matters most, because it is how this
   * check is invoked when a hook fires with nothing staged. AN EMPTY SCAN IS NOT A PASS. It is
   * reported as what it is -- a scan of nothing -- and the wording never says "no source files
   * found", because that sentence is a claim about a set that was never examined. */
  if (files.length === 0) {
    console.log('CHK-13 check_no_sources: scope=' + mode + ' files_scanned=0 -- SCANNED NOTHING.');
    console.log('CHK-13 this is not a clean result. Nothing was examined, so nothing is asserted.');
    return 0;
  }

  const findings = [];
  const skipped = [];

  for (const rel of files) {
    const abs = path.join(root, rel);

    const ext = extensionHit(rel);
    if (ext !== null) {
      findings.push({ rel: rel, gate: 'EXTENSION', detail: '.' + ext + ' is a published-source carrier' });
      continue;
    }

    let st;
    try { st = fs.statSync(abs); }
    catch (e) { skipped.push({ rel: rel, why: 'not present in the working tree' }); continue; }
    if (!st.isFile()) continue;

    const mg = magicHit(abs);
    if (mg === undefined) { skipped.push({ rel: rel, why: 'unreadable' }); continue; }
    if (mg !== null) {
      findings.push({ rel: rel, gate: 'MAGIC', detail: 'first bytes are ' + mg + ', whatever the extension says' });
      continue;
    }

    if (st.size > SIZE_LIMIT_BYTES) {
      findings.push({ rel: rel, gate: 'SIZE', detail: st.size + ' bytes exceeds the ' + SIZE_LIMIT_BYTES + '-byte backstop' });
    }
  }

  /* PDF-8: the reported scope is the scope actually walked. PDF-14: the report names the gate,
   * so a fixture that passes cannot pass for the wrong reason without that being visible. */
  console.log('CHK-13 check_no_sources: scope=' + mode + ' files_scanned=' + files.length +
              ' findings=' + findings.length + ' skipped=' + skipped.length);
  console.log('CHK-13 ' + reportCoverage());

  for (const s of skipped) {
    console.log('CHK-13 SKIPPED ' + s.rel + ' -- ' + s.why + ' (not examined, not cleared)');
  }

  if (findings.length === 0) return 0;

  for (const f of findings) {
    console.error('CHK-13 FINDING [' + f.gate + '] ' + f.rel + ' -- ' + f.detail);
  }
  console.error('CHK-13 ' + findings.length + ' finding(s). This repository does not ship the publications it summarises.');
  console.error('CHK-13 Source PDFs belong in literature/_pdf/, which is ignored. See oracle/check_register.md CHK-13.');
  return 1;
}

function usage() {
  console.error('usage: node tools/check_no_sources.js [--staged|--tree]');
  console.error('  --staged  scan the git index (default)');
  console.error('  --tree    scan every tracked file');
  console.error('  --ignore-probe  assert the .gitignore source-carrier rules over a printed probe set');
}

if (require.main === module) {
  try { process.exit(main(process.argv.slice(2))); }
  catch (e) { console.error('CHK-13 INTERNAL ERROR: ' + (e && e.message)); process.exit(2); }
}

module.exports = {
  extensionHit: extensionHit,
  magicHit: magicHit,
  SIZE_LIMIT_BYTES: SIZE_LIMIT_BYTES,
  CARRIER_EXT: CARRIER_EXT,
};
