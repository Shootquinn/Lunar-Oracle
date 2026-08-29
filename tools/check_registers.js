#!/usr/bin/env node
/*
 * tools/check_registers.js - MF-1..MF-3 over oracle/MANIFEST.tsv and AMC-1..AMC-4 over
 * oracle/AMENDMENTS.tsv.
 *
 * Authority: The Designer, Step 1 Wave 2 review sections 2.4(a) and 3.3, accepted by
 * The Manager at the Step 1 close, decision 5.2. Built at sub-step 1.14.
 *
 * Check-register rows: CHK-27 (manifest) and CHK-28 (amendments). Two rows, one script,
 * on the CHK-14/CHK-16 precedent: the two registers are one mechanism, joined by AMC-3
 * and AMC-4, and splitting the script lets the halves disagree about what a target is.
 *
 * Usage: node tools/check_registers.js [--manifest] [--amendments]   (default: both)
 * Exit 1 on any FAIL line.
 *
 * Output prefixes, at column 0, so a count over the whole unfiltered output is exact:
 *   FAIL  a hard failure          NOTE  an observation
 *   OK    a clause that passed    WARN  a finding that does not fail the check
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = process.env.QJS_ROOT ? path.resolve(process.env.QJS_ROOT) : process.cwd();

/* Bumped whenever a check's NAME, pattern or population changes. 2.19-1 carries AM-144's
 * rename of the five amendment checks from AM-n to AMC-n: the name a tool PRINTS is the
 * name a reader greps for, so a figure from a pre-rename run and a figure from this one are
 * not even addressable by the same string. */
const TOOL_VERSION = '2.19-1';

/* -------------------------------------------------------------- read-digest
 * Identical in intent to tools/quantities.js and deliberately NOT shared with it. Two
 * instruments that must be able to disagree about what they read do not get to share the
 * function that decides it; fifteen duplicated lines are cheaper than a hidden coupling
 * between two checkers, and a common module would also have to live at a path neither
 * tool's manifest row names.
 *
 * This tool's read set is NOT the declared file set. It is MANIFEST.tsv, AMENDMENTS.tsv,
 * the two register files, and every .md under cr_scratch/ that MF-3 walks for markers. A
 * digest from this tool and a digest from tools/quantities.js are digests of different sets
 * and were never comparable; printing both makes that visible instead of assumed. */
function readDigest(relPaths) {
  const h = crypto.createHash('sha256');
  for (const r of relPaths.slice().sort()) {
    let st;
    try { st = fs.statSync(path.join(ROOT, r)); }
    catch (e) { h.update(r + ' MISSING\n'); continue; }
    h.update(r + ' ' + st.size + ' ' + st.mtimeMs + '\n');
  }
  return h.digest('hex').slice(0, 16);
}

const argv = process.argv.slice(2);
const sel = argv.filter(a => a === '--manifest' || a === '--amendments' || a === '--registers');
const doM = sel.length === 0 || sel.includes('--manifest');
const doA = sel.length === 0 || sel.includes('--amendments');
const doR = sel.length === 0 || sel.includes('--registers');

const out = [];
let fails = 0;
const FAIL = m => { fails++; out.push('FAIL ' + m); };
const OK = m => out.push('OK ' + m);
const NOTE = m => out.push('NOTE ' + m);
const WARN = m => out.push('WARN ' + m);

function tsv(p) {
  const raw = fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/\r\n?/g, '\n');
  const rows = [];
  let header = null;
  for (const line of raw.split('\n')) {
    if (line === '' || line.charAt(0) === '#') continue;
    const f = line.split('\t');
    if (f[0] === 'H') { header = f; continue; }
    rows.push(f);
  }
  return { header: header, rows: rows };
}

/* W5-11: routed through tools/fswalk.js. `e.isDirectory()` is false for a reparse-pointed
   directory, which prunes a whole subtree silently and reports a clean smaller count. */
const FSW = require('./fswalk.js');
function walk(dir, out) { return FSW.walk(dir, null, out); }
const relp = p => path.relative(ROOT, p).split(path.sep).join('/');

/* ------------------------------------------------------ the moment of this run
 * Computed before any check runs, so the stamp exists even if a check throws. The read set
 * is enumerated here rather than inferred, because a digest over a set the tool did not
 * actually read is worse than no digest: it certifies the wrong moment. */
const READ_SET = ['oracle/MANIFEST.tsv', 'oracle/AMENDMENTS.tsv',
  'oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv']
  .concat(walk(path.join(ROOT, 'cr_scratch')).map(relp).filter(p => /\.md$/.test(p)))
  .sort();
const READ_DIGEST = readDigest(READ_SET);
const FLAGSTR = argv.filter(a => /^--/.test(a) && a !== '--compare').sort().join(' ') || '(none)';
NOTE('tools/check_registers.js version ' + TOOL_VERSION + ' flags ' + FLAGSTR);
NOTE('read-digest ' + READ_DIGEST + ' over ' + READ_SET.length +
  ' files (path,size,mtime). This is NOT the declared file set of COUNTING_RULE.md ' +
  'section 8 and this digest is not comparable with tools/quantities.js\'s.');
{
  const i = argv.indexOf('--compare');
  const prior = i === -1 ? null : argv[i + 1];
  if (prior) {
    if (prior === READ_DIGEST) NOTE('COMPARABLE: --compare ' + prior + ' equals this run\'s read-digest');
    else NOTE('NOT COMPARABLE: --compare ' + prior + ' is a different read set from ' + READ_DIGEST +
      '. Two counts across these two digests are two correct measurements of two different ' +
      'moments and must not be reconciled, differenced, or quoted as one figure.');
  }
}

/* ------------------------------------------------------------- MANIFEST */
let manifest = null;
if (doM || doA) manifest = tsv('oracle/MANIFEST.tsv');

if (doM) {
  const rows = manifest.rows;
  NOTE('MANIFEST.tsv: ' + rows.length + ' D rows');

  /* size header */
  if (!manifest.header) FAIL('MANIFEST H row missing');
  else if (+manifest.header[3] !== rows.length) {
    FAIL('MANIFEST H row declares ' + manifest.header[3] + ' rows; ' + rows.length + ' parsed');
  } else OK('MANIFEST declares its own size correctly (' + rows.length + ')');

  /* shape */
  let shape = 0;
  const STATES = { specified: 1, promoted: 1, superseded: 1 };
  for (const r of rows) {
    if (r.length !== 7) { shape++; FAIL('MANIFEST row ' + r[1] + ' has ' + r.length + ' fields, expected 7'); }
    else if (!STATES[r[6]]) { shape++; FAIL('MANIFEST row ' + r[1] + ' state "' + r[6] + '" outside the closed set'); }
  }
  if (!shape) OK('MANIFEST every row has seven fields and a state in the closed set of three');

  /* MF-1 */
  let n = 0;
  for (const r of rows) {
    if (r[6] !== 'promoted') continue;
    if (!fs.existsSync(path.join(ROOT, r[1]))) { n++; FAIL('MF-1 row ' + r[1] + ' is promoted but no file exists at that path'); }
  }
  if (!n) OK('MF-1 every promoted row has a file at target-path (' +
    rows.filter(r => r[6] === 'promoted').length + ' rows)');

  /* MF-2 */
  n = 0;
  for (const r of rows) {
    if (r[6] !== 'specified') continue;
    if (r[2] === '-' || r[3] === '-') {
      n++;
      FAIL('MF-2 row ' + r[1] + ' is specified with no source-file and no marker. There is nothing ' +
        'to promote and the three-state vocabulary has no value for it. Gate: ' + r[5]);
      continue;
    }
    let txt;
    try { txt = fs.readFileSync(path.join(ROOT, r[2]), 'utf8').replace(/\r\n?/g, '\n'); }
    catch (e) { n++; FAIL('MF-2 row ' + r[1] + ' source-file ' + r[2] + ' unreadable'); continue; }
    const L = txt.split('\n');
    if (L.indexOf('<!-- BEGIN ' + r[3] + ' -->') < 0 || L.indexOf('<!-- END ' + r[3] + ' -->') < 0) {
      n++; FAIL('MF-2 row ' + r[1] + ' has no live marker pair "' + r[3] + '" in ' + r[2]);
    }
  }
  if (!n) OK('MF-2 every specified row has a live marker pair in its source file');

  /* MF-3: every BEGIN marker anywhere under cr_scratch/ has a row.
     Joined on (source-file, marker) rather than marker alone, because two files carry the
     same marker name - see AM-100. */
  const seen = {};
  for (const r of rows) if (r[2] !== '-' && r[3] !== '-') seen[r[2] + '\0' + r[3]] = (seen[r[2] + '\0' + r[3]] || 0) + 1;
  const markers = [];
  for (const f of walk(path.join(ROOT, 'cr_scratch'))) {
    if (!/\.md$/.test(f)) continue;
    const rf = relp(f);
    const L = fs.readFileSync(f, 'utf8').replace(/\r\n?/g, '\n').split('\n');
    L.forEach((l, i) => {
      const m = /^<!--\s*BEGIN\s+(.+?)\s*-->\s*$/.exec(l);
      if (m) markers.push({ file: rf, marker: m[1], line: i + 1 });
    });
  }
  NOTE('MF-3 census: ' + markers.length + ' BEGIN markers under cr_scratch/');
  n = 0;
  for (const mk of markers) {
    if (!seen[mk.file + '\0' + mk.marker]) {
      n++; FAIL('MF-3 marker "' + mk.marker + '" at ' + mk.file + ':' + mk.line + ' has no manifest row');
    }
  }
  if (!n) OK('MF-3 every BEGIN marker under cr_scratch/ has a manifest row');
  /* the reverse direction, reported not failed */
  const nameCount = {};
  for (const mk of markers) nameCount[mk.marker] = (nameCount[mk.marker] || 0) + 1;
  for (const k of Object.keys(nameCount)) if (nameCount[k] > 1) {
    WARN('MF-3 marker name "' + k + '" is used in ' + nameCount[k] + ' files; the join is keyed on (source-file, marker). See AM-100.');
  }
}

/* ------------------------------------------------------------- AMENDMENTS */
if (doA) {
  const am = tsv('oracle/AMENDMENTS.tsv');
  const rows = am.rows;
  NOTE('AMENDMENTS.tsv: ' + rows.length + ' A rows');
  const STATES = { owed: 1, applied: 1, superseded: 1, declined: 1 };

  const owed = rows.filter(r => r[6] === 'owed');
  if (!am.header) FAIL('AMENDMENTS H row missing');
  else {
    if (+am.header[3] !== rows.length) FAIL('AMENDMENTS H row declares ' + am.header[3] + ' total; ' + rows.length + ' parsed');
    else if (+am.header[4] !== owed.length) FAIL('AMENDMENTS H row declares ' + am.header[4] + ' owed; ' + owed.length + ' parsed');
    else OK('AMENDMENTS declares its own size correctly (' + rows.length + ' total, ' + owed.length + ' owed)');
  }

  let shape = 0;
  for (const r of rows) {
    if (r.length !== 9) { shape++; FAIL('AMENDMENTS row ' + r[1] + ' has ' + r.length + ' fields, expected 9'); }
    else if (!STATES[r[6]]) { shape++; FAIL('AMENDMENTS row ' + r[1] + ' state "' + r[6] + '" outside the closed set'); }
  }
  if (!shape) OK('AMENDMENTS every row has nine fields and a state in the closed set of four');

  /* AMC-1: no two rows with state owed name the same non-"-" quantity id.
     This is the Designer's `cut -f5 | sort | uniq -d`, keyed on the column by name.
     Note his cut index: the quantity id is field 6 of the row including the A type
     column, or field 5 counting from the id. Both readings are recorded; the check is
     on the column, not on an ordinal. */
  const q = {};
  for (const r of owed) {
    const id = r[5];
    if (!id || id === '-') continue;
    if (!q[id]) q[id] = [];
    q[id].push(r[1]);
  }
  let n = 0;
  for (const k of Object.keys(q).sort()) if (q[k].length > 1) {
    n++; FAIL('AMC-1 quantity ' + k + ' is named by ' + q[k].length + ' owed amendments: ' + q[k].join(', '));
  }
  if (!n) OK('AMC-1 no two owed amendments name the same quantity id');
  NOTE('AMC-1 scanned ' + Object.keys(q).length + ' distinct quantity ids across ' + owed.length + ' owed rows');

  /* AMC-2 */
  const byId = {};
  for (const r of rows) byId[r[1]] = r;
  n = 0;
  for (const r of rows) {
    const s = r[7];
    if (!s || s === '-') continue;
    if (!byId[s]) { n++; FAIL('AMC-2 row ' + r[1] + ' superseded-by ' + s + ' which is not a row'); continue; }
    if (byId[s][6] === 'superseded') { n++; FAIL('AMC-2 row ' + r[1] + ' superseded-by ' + s + ', which is itself superseded'); }
  }
  if (!n) OK('AMC-2 every superseded-by resolves to a row that is not itself superseded');

  /* AMC-3 */
  const targets = {};
  for (const r of manifest.rows) targets[r[1]] = r;
  n = 0;
  const missing = {};
  for (const r of rows) if (!targets[r[2]]) missing[r[2]] = (missing[r[2]] || 0) + 1;
  for (const k of Object.keys(missing).sort()) {
    n++; FAIL('AMC-3 target "' + k + '" is named by ' + missing[k] + ' amendment row(s) and has no manifest row');
  }
  if (!n) OK('AMC-3 every amendment target is a row in oracle/MANIFEST.tsv');

  /* AMC-4 */
  n = 0;
  for (const r of rows) {
    if (r[6] !== 'applied') continue;
    const t = targets[r[2]];
    if (t && t[6] === 'specified') {
      n++; FAIL('AMC-4 row ' + r[1] + ' is applied but its target ' + r[2] + ' is only specified');
    }
  }
  if (!n) OK('AMC-4 no amendment is applied against an unpromoted target');

  /* AMC-5 -- collisions with no quantity id.
   * AMC-1 groups on quantity-id and is blind to every collision over a quantity that has
   * no id. It could not see AM-66 against AM-73 -- two amendments to one integer, from two
   * authors, both targeting oracle/answer_contract.md section 9 -- until 1.14 typed a
   * provisional id by hand. (target, section) needs no id and catches the class.
   * WARN, not FAIL: rows legitimately share a section, and only a person can tell a
   * collision from a queue. Filed as AM-112.
   */
  const bySec = new Map();
  for (const r of rows) if (r[6] === 'owed') {
    const k = r[2] + '\u0000' + r[3];
    if (!bySec.has(k)) bySec.set(k, []);
    bySec.get(k).push(r[1]);
  }
  n = 0;
  for (const [k, v] of [...bySec.entries()].sort()) if (v.length > 1) {
    n++; WARN('AMC-5 ' + k.split('\u0000').join(' section "') + '" carries ' + v.length + ' owed amendments: ' + v.join(', '));
  }
  NOTE('AMC-5 scanned ' + bySec.size + ' distinct (target, section) pairs across the owed rows; ' + n + ' carry more than one');
}

/* ------------------------------------------------------------------ L1b
 * L1b SET UNIQUENESS -- oracle/register_schema.md section 9 L1b, section 3.0 SET-2.
 * The register is a set of files. B1 enforces axis-id uniqueness WITHIN a file and
 * cannot see an axis authored once and duplicated in the other file. Ruled at R-2 by
 * The Systems Engineer and at R-3 by The Software Engineer, independently and the same
 * way; specified in the schema with no implementation until here. Check-register row
 * CHK-29.
 */
if (doR) {
  const files = ['oracle/REGISTER.lunar.tsv', 'oracle/REGISTER.econ.tsv'];
  const where = new Map();
  let files_read = 0, arows = 0;
  for (const f of files) {
    let raw;
    try { raw = fs.readFileSync(path.join(ROOT, f), 'utf8'); }
    catch (e) { FAIL('L1 register file ' + f + ' of the declared set does not exist'); continue; }
    files_read++;
    for (const line of raw.replace(/\r\n?/g, '\n').split('\n')) {
      if (!line || line[0] === '#') continue;
      const c = line.split('\t');
      if (c[0] !== 'A') continue;
      arows++;
      if (!where.has(c[1])) where.set(c[1], []);
      where.get(c[1]).push(f);
    }
  }
  NOTE('L1b census: ' + files_read + ' register files, ' + arows + ' A rows, ' + where.size + ' distinct axis ids');
  let dup = 0;
  for (const [id, fs_] of [...where.entries()].sort()) {
    if (fs_.length > 1) { dup++; FAIL('L1b axis id ' + id + ' occurs in ' + fs_.length + ' files: ' + fs_.join(', ')); }
  }
  if (!dup) OK('L1b no axis id occurs in two files of the loaded set');
}

NOTE('hard failures: ' + fails + ' @ read-digest ' + READ_DIGEST + ' over ' + READ_SET.length +
  ' files, tool ' + TOOL_VERSION + ', flags ' + FLAGSTR);
console.log(out.join('\n'));
process.exit(fails > 0 ? 1 : 0);
