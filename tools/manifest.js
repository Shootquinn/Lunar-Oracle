#!/usr/bin/env node
/*
 * tools/manifest.js - the accessor for oracle/MANIFEST.tsv.
 *
 * Sub-step 2.19(b). The Manager's Step 1 final close, close item 20: give the manifest an
 * accessor, so the hand-typed filter has nothing to be typed instead of. The defect this
 * removes is not that hand-typed filters are ugly. It is that at the Step 1 reclose two of
 * eleven promoted paths were missed because a hand-typed filter keyed on the wrong column,
 * and nothing recorded which filter had been typed. An accessor is greppable, re-runnable,
 * and reports its own read.
 *
 * This file deliberately does NOT check the manifest. tools/check_registers.js does that
 * (MF-1..MF-3, CHK-27). An accessor that also validates is two contracts on one artifact,
 * which is how CHK-13 came to have two paths.
 *
 * Usage:
 *   node tools/manifest.js                       all D rows, tab-separated
 *   node tools/manifest.js --state promoted      filter on state
 *   node tools/manifest.js --path oracle/x.md    the row for one target path
 *   node tools/manifest.js --source cr_scratch/y.md
 *   node tools/manifest.js --marker NAMING.md
 *   node tools/manifest.js --gated               rows whose gate is not "-"
 *   node tools/manifest.js --missing             promoted rows with no file on disk
 *   node tools/manifest.js --unlisted            declared-set paths with NO manifest row
 *   node tools/manifest.js --col target|source|marker|substep|gate|state
 *   node tools/manifest.js --json
 *   node tools/manifest.js --header              the H row's declared size
 *
 * Filters compose (AND). --col projects one column after filtering, which is the shape the
 * hand-typed pipelines were reaching for.
 *
 * As a module:  require('./manifest.js').rows()  ->  [{target,source,marker,substep,gate,state}]
 *
 * Output prefixes are at column 0 and nothing else is, per COUNTING_RULE.md section 3
 * rule 11, so a count over unfiltered output is exact. Data rows are printed with a
 * leading "D" and a tab for the same reason: they can never be confused with a NOTE.
 *   D     a manifest row        NOTE  an observation about the run
 * Exit 0 always except --missing, which exits 1 if it finds one: it is the only mode that
 * makes a claim about the world rather than about the file.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOOL_VERSION = '2.19b-1';
const ROOT = process.env.QJS_ROOT ? path.resolve(process.env.QJS_ROOT) : process.cwd();
const MANIFEST = 'oracle/MANIFEST.tsv';
const COLS = ['target', 'source', 'marker', 'substep', 'gate', 'state'];

/* -------------------------------------------------------------- read-digest
 * Every instrument stamps what it read: the count of files, and a digest over
 * (path, size, mtime) of the set the run walked. Two figures carrying different digests
 * are not comparable, and this is the half that makes the tool say so rather than a person.
 * Here the set is one file, which is the point: a manifest figure and a quantities figure
 * are digests of different sets and are never reconcilable by eye. */
function readDigest(relPaths) {
  const h = crypto.createHash('sha256');
  let n = 0;
  for (const r of relPaths.slice().sort()) {
    let st;
    try { st = fs.statSync(path.join(ROOT, r)); }
    catch (e) { h.update(r + '\0MISSING\n'); n++; continue; }
    h.update(r + '\0' + st.size + '\0' + st.mtimeMs + '\n');
    n++;
  }
  return { n: n, digest: h.digest('hex').slice(0, 16) };
}

function parse() {
  const raw = fs.readFileSync(path.join(ROOT, MANIFEST), 'utf8').replace(/\r\n?/g, '\n');
  const rows = [];
  let header = null;
  raw.split('\n').forEach((line, i) => {
    if (line === '' || line.charAt(0) === '#') return;
    const f = line.split('\t');
    if (f[0] === 'H') { header = f; return; }
    if (f[0] !== 'D') return;
    rows.push({
      line: i + 1, target: f[1], source: f[2], marker: f[3],
      substep: f[4], gate: f[5], state: f[6], fields: f.length - 1
    });
  });
  return { header: header, rows: rows };
}
function rows() { return parse().rows; }

/* the declared file set of COUNTING_RULE.md section 8, for --unlisted only. Kept here
 * rather than imported so this accessor has no dependency on the checker: they must be
 * able to disagree visibly, and a shared walker would hide it. */
/* HARDLINK SAFETY, and it is the sixth member of the line-ending family.
 *
 * `Dirent.isFile()` returns FALSE for a hardlink on this platform -- `isSymbolicLink()` reports
 * true while `lstat` reports a file correctly. A hardlinked working copy therefore reads as a set
 * this scan cannot see, and the shape is the one this repository keeps finding: the content is
 * present and correct, the trigger is METADATA, and the assertion passes on the machine where it
 * cannot fail.
 *
 * MEASURED SCOPE, because the first report of this said `literature/` reads as empty and that is
 * not what these two call sites do. `walk()` below never calls `isFile()`: it asks `isDirectory()`
 * and treats everything else as a candidate, so a hardlinked summary under `literature/` is still
 * collected. What `isFile()` gates is the ROOT-LEVEL `.md` scan -- `CLAUDE.md`, `COUNTING_RULE.md`,
 * `QUANTITIES.md`, `accumulator.md`, `lunar-oracle-gameplan.md` -- which would silently drop out of
 * the declared set on a hardlinked stage. That is a smaller blast radius than reported and it is
 * still a silent wrong answer, so both sites are repaired and both are given a known-answer test.
 *
 * `walk()` gets the same treatment for the mirror case: `isDirectory()` is false for a hardlinked
 * or junction-mounted directory, which would prune a whole subtree without a word.
 *
 * W5-11 AMENDMENT, AND IT IS A CORRECTION TO THE ABOVE, NOT A RESTATEMENT OF IT.
 *
 * The repair reached for `fs.lstatSync`. `lstat` DOES NOT FOLLOW LINKS -- that is its definition --
 * so it is the wrong instrument for a family whose whole content is "this entry is reported as a
 * link and it is really a file". It worked on the hardlink case only because a hardlink is not a
 * reparse point at all, so `lstat` saw straight through the Dirent's mistake. MEASURED at W5-11 on
 * a real reparse point -- a directory junction on this machine -- `lstat` gets it wrong too:
 * `lstat(junc).isDirectory()` is FALSE and `isSymbolicLink()` is true, and only the `|| statSync`
 * arm of `isRealDir` saved the subtree. `isRealFile` had no such arm.
 *
 * Both now delegate to tools/fswalk.js, which asks the Dirent first and falls back to `stat`. The
 * rule lives in ONE file with its own known-answer test rather than pasted into six. */
const FSW = require('./fswalk.js');
const isRealFile = FSW.isRealFile;
const isRealDir = FSW.isRealDir;
const walk = (dir, pred, out) => FSW.walk(dir, pred, out);
const rel = p => path.relative(ROOT, p).split(path.sep).join('/');
function declaredFileSet() {
  const f = [];
  for (const e of fs.readdirSync(ROOT, { withFileTypes: true }))
    if (FSW.kindOf(e, path.join(ROOT, e.name)) === 'file' && /\.md$/.test(e.name)) f.push(path.join(ROOT, e.name));
  walk(path.join(ROOT, 'cr_scratch'), p => /\.md$/.test(p), f);
  walk(path.join(ROOT, 'tools'), p => /\.js$/.test(p), f);
  walk(path.join(ROOT, 'oracle'), () => true, f);
  walk(path.join(ROOT, 'literature'), p => /\.md$/.test(p), f);
  return Array.from(new Set(f.map(rel))).sort();
}

if (require.main !== module) {
  module.exports = { rows: rows, parse: parse, readDigest: readDigest, TOOL_VERSION: TOOL_VERSION };
} else {
  const argv = process.argv.slice(2);
  const val = f => { const i = argv.indexOf(f); return i === -1 ? null : argv[i + 1]; };
  const has = f => argv.indexOf(f) !== -1;
  const m = parse();
  const out = [];
  const NOTE = s => out.push('NOTE ' + s);

  NOTE('tools/manifest.js version ' + TOOL_VERSION + ' reading ' + MANIFEST);
  const rd = readDigest([MANIFEST]);
  NOTE('read-digest ' + rd.digest + ' over ' + rd.n + ' file(s) (path,size,mtime)');

  if (has('--header')) {
    NOTE('H row declares ' + (m.header ? m.header[3] : 'NO H ROW') + ' D rows; ' + m.rows.length + ' parsed');
    console.log(out.join('\n'));
    process.exit(0);
  }
  if (has('--unlisted')) {
    const declared = declaredFileSet();
    const listed = new Set(m.rows.map(r => r.target));
    const un = declared.filter(p => !listed.has(p));
    NOTE('census: ' + m.rows.length + ' D rows against ' + declared.length +
      ' declared-set paths; ' + un.length + ' paths carry no manifest row');
    NOTE('this census counts its own file. tools/manifest.js is in the declared set and is ' +
      'one of the unlisted paths below. A census written into a file inside the set it ' +
      'counts is stale the moment it is written; take it by running this, not by quoting it.');
    for (const p of un) out.push('D\t' + p + '\t-\t-\t-\t-\tUNLISTED');
    console.log(out.join('\n'));
    process.exit(0);
  }

  let sel = m.rows;
  const st = val('--state'); if (st) sel = sel.filter(r => r.state === st);
  const tp = val('--path'); if (tp) sel = sel.filter(r => r.target === tp);
  const sf = val('--source'); if (sf) sel = sel.filter(r => r.source === sf);
  const mk = val('--marker'); if (mk) sel = sel.filter(r => r.marker === mk);
  if (has('--gated')) sel = sel.filter(r => r.gate !== '-');
  if (has('--missing')) sel = sel.filter(r => r.state === 'promoted' && !fs.existsSync(path.join(ROOT, r.target)));

  NOTE('selected ' + sel.length + ' of ' + m.rows.length + ' D rows');
  if (has('--json')) out.push(JSON.stringify(sel, null, 2));
  else {
    const col = val('--col');
    if (col && COLS.indexOf(col) === -1) {
      NOTE('unknown column "' + col + '"; known: ' + COLS.join(' '));
      console.log(out.join('\n'));
      process.exit(2);
    }
    for (const r of sel) out.push('D\t' + (col ? r[col] : COLS.map(c => r[c]).join('\t')));
  }
  console.log(out.join('\n'));
  process.exit(has('--missing') && sel.length ? 1 : 0);
}
