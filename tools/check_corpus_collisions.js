#!/usr/bin/env node
/* check_corpus_collisions.js -- fail if two summaries in a corpus are indistinguishable to the
 * retrieval layer.
 *
 * WHY THIS EXISTS. literature_search.js ranks candidates by overlap between the question's tokens
 * and each filename's tokens. Its tokenizer drops tokens of one character (literature_search.js
 * line 63, `t.length > 1`). So `csank-2022-powering-the-moon-2.md` and
 * `csank-2022-powering-the-moon.md` tokenize to the same four tokens, score identically, and the
 * winner falls out of whatever order the directory walk returned. In the Scenario Explorer corpus
 * that resolved to the 7,637-byte summary every time and the 23,190-byte summary never. Not
 * sometimes. Every time, deterministically, invisibly.
 *
 * Six such pairs existed in that corpus. All six were the same source summarized twice.
 *
 * THE RULE THIS ENFORCES: no two summaries in the corpus may tokenize identically. A numeric
 * suffix is not disambiguation, because the tokenizer cannot see it. If two files genuinely
 * describe different sources, their names must differ in a word a reader and a tokenizer can both
 * read: `-phase-i` and `-phase-ii`, `-icarus` and `-grl`, not `-2`.
 *
 * This is a check rather than a note in a document because the corpus is built from a working copy
 * this repository does not control. A fresh clone of the upstream corpus reintroduces every
 * duplicate that was ever removed by hand. A rule nothing enforces is a rule that lasted until the
 * next clone.
 *
 *   node tools/check_corpus_collisions.js [dir ...]     default: literature/
 *
 * Exit 0 clean, exit 1 on any collision, exit 2 on a usage or IO error.
 *
 * ---- EXTENDED AT 2.20 (The Systems Engineer): A DOCUMENT BESIDE ITS OWN NEAR-TWIN ----------
 *
 * MEASURED DEFECT. This file walked `.md` ONLY and keyed on the basename with `.md` stripped, so
 * `un-1967-outer-space-treaty.txt` sitting beside `un-1967-outer-space-treaty.md` was not merely
 * a different key -- IT WAS NEVER WALKED AT ALL. Run against the staged corpus at 2.20 this file
 * reported `146 summaries, 3 collisions` while three UN treaty full texts and 112 source PDFs sat
 * in the same directories as their own summaries, invisible. It is the declared enforcement point
 * for oracle/NAMING.md section 11 and it could not see the shape.
 *
 * WHY THAT SHAPE MATTERS AND IS NOT A FILING NICETY. A published treaty text beside a summary of
 * that treaty is (a) source material this project does not own, which is CHK-13's subject, and
 * (b) two documents the retrieval layer would rank against each other if the walk ever widened.
 * The two failures have one signature and one place to be caught.
 *
 * THE KEY IS NOW EXTENSION-BLIND, AND FOR .md FILES NOTHING CHANGES. Stripping "one trailing
 * extension" and stripping ".md" are the same operation on a `.md` leaf, so every key this file
 * has ever computed over the shelf is byte-identical and A1's meaning is untouched. What changed
 * is only which files are in the walk.
 *
 * TWO CLASSES, REPORTED SEPARATELY, because they send a person to two different places:
 *   COLLISION -- two members of one group share an extension. The original defect: one file to
 *                the retrieval layer. Remedy is a rename or a deletion.
 *   NEAR-TWIN -- the members differ in extension. Remedy is usually to move the non-.md member
 *                out of the shelf entirely, and it is frequently also a CHK-13 finding.
 *
 * ONE EXCEPTION, TAKEN DELIBERATELY AND NAMED RATHER THAN INFERRED. `.gitignore` declares
 * `/literature/_pdf/` as the source-PDF store, "filed under the same taxonomy names as the
 * summaries but not interleaved with them." A pair separated by that boundary is the SANCTIONED
 * filing convention and is reported as a NOTE. A pair with both members on the same side of it is
 * interleaved, and that is the finding. The exception is a PATH SEGMENT test against one declared
 * literal, not a heuristic: if the store ever moves, this line fails to fire and the count goes
 * up, which is the direction an exception should fail in.
 */
'use strict';
const fs = require('fs');
const path = require('path');

/* Mirrors literature_search.js filenameTokens(). If that tokenizer changes upstream, this check
   goes stale silently, which is the one failure mode it cannot catch about itself. The stopword
   list is deliberately the search's own list rather than a shorter convenience copy: a token this
   check keeps and the search drops would make the check pass on a pair the search cannot tell
   apart, which is the exact defect being guarded. */
const STOPWORDS = new Set([
  'the','a','an','and','or','but','of','in','on','at','to','for','with','by','from','as','is',
  'are','was','were','be','been','being','it','its','this','that','these','those','what','which',
  'who','how','why','when','where','did','does','do','not','no','so','than','then','if','into',
  'about','across','over','under','out','up','down','per','via','vs','and/or','their',"it's",
  'would','could','should','will','shall','can','may','might','also','only','one','two','three',
  'app','apps','model','models','modeled','modelled','modeling','modelling','assumes','assumed',
]);

/* One trailing extension, whatever it is. On a `.md` leaf this is exactly the old `.replace(/\.md$/i,'')`
   and every historical key is preserved; on any other leaf it is what makes a near-twin comparable
   to its twin instead of differing by one token nobody would ever type into a question. Bounded to
   1-8 alphanumerics so that `csank-2022` does not lose its year to a greedy dot rule. */
function stripExt(basename) {
  return basename.replace(/\.[A-Za-z0-9]{1,8}$/, '');
}

function tokens(basename) {
  return stripExt(basename)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(t => t.length > 1 && !STOPWORDS.has(t));
}

function extOf(basename) {
  const m = /\.([A-Za-z0-9]{1,8})$/.exec(basename);
  return m ? m[1].toLowerCase() : '(none)';
}

/* THE DECLARED SOURCE STORE. One literal, matched as a PATH SEGMENT, mirroring `.gitignore`'s
   `/literature/_pdf/`. Not a substring test: a folder legitimately named `pre_pdf-workflow` is not
   the store. */
const STORE_SEGMENT = '_pdf';
function inStore(p) {
  return p.split(/[\\/]/).indexOf(STORE_SEGMENT) !== -1;
}

/* The walk admits EVERY file, which is the whole change. `.git` and `node_modules` are refused by
   name so that passing `.` as a root is a slow answer rather than a wrong one. */
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function main(argv) {
  const roots = argv.length ? argv : ['literature'];
  const missing = roots.filter(r => !fs.existsSync(r));
  if (missing.length) {
    console.error('check_corpus_collisions: no such directory: ' + missing.join(', '));
    return 2;
  }

  const byKey = new Map();
  const byExt = new Map();
  let count = 0;
  for (const root of roots) {
    for (const file of walk(root, [])) {
      count++;
      const base = path.basename(file);
      const e = extOf(base);
      byExt.set(e, (byExt.get(e) || 0) + 1);
      const key = tokens(base).sort().join('|');
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(file);
    }
  }

  /* THE WALK REPORTS ITS OWN COMPOSITION ON EVERY RUN. The defect this file carried for four
     sub-steps was not a wrong answer, it was a SCOPE nobody could see from the output: "146
     summaries, 0 collisions" and "146 summaries out of 261 files, 0 collisions" are the same
     verdict and only one of them is checkable. Same discipline as CHK-37 printing its probe set. */
  const extLine = [...byExt.entries()].sort((a, b) => b[1] - a[1])
    .map(([e, n]) => '.' + e + '=' + n).join(' ');
  console.log('check_corpus_collisions: walked ' + count + ' files under ' + roots.join(' ') +
              ' -- ' + (extLine || '(empty)'));

  const groups = [...byKey.entries()].filter(([, files]) => files.length > 1);

  const collisions = [];   // >= 2 members sharing an extension
  const nearTwins = [];    // members differing in extension, interleaved
  const stored = [];       // members differing in extension, separated by the declared PDF store

  for (const [key, files] of groups) {
    const exts = new Set(files.map(f => extOf(path.basename(f))));
    if (exts.size === 1) { collisions.push([key, files]); continue; }
    /* Both classes can hold in one group -- three files, two of them .md. Report each on its own
       terms rather than letting the first test win, because "one file to the retrieval layer" and
       "a document beside its source" are different remedies. */
    const byE = new Map();
    for (const f of files) {
      const e = extOf(path.basename(f));
      if (!byE.has(e)) byE.set(e, []);
      byE.get(e).push(f);
    }
    for (const [, sameExt] of byE) if (sameExt.length > 1) collisions.push([key, sameExt]);

    const sides = new Set(files.map(f => inStore(f)));
    if (sides.size === 2 && files.every(f => inStore(f) === (extOf(path.basename(f)) !== 'md'))) {
      stored.push([key, files]);
    } else {
      nearTwins.push([key, files]);
    }
  }

  function dump(label, list) {
    for (const [key, files] of list) {
      console.error('  ' + label + ' [' + key + ']');
      for (const f of files) console.error('    ' + String(fs.statSync(f).size).padStart(9) + '  ' + f);
      console.error('');
    }
  }

  if (stored.length) {
    console.log('check_corpus_collisions: ' + stored.length + ' group(s) separated by the declared ' +
      '_pdf store. NOT a finding -- .gitignore files source PDFs under the same taxonomy names by design.');
  }

  if (!collisions.length && !nearTwins.length) {
    console.log('check_corpus_collisions: 0 collisions, 0 near-twins.');
    return 0;
  }

  console.error('');
  console.error('check_corpus_collisions: ' + collisions.length + ' collision group(s) and ' +
                nearTwins.length + ' near-twin group(s) in ' + count + ' files.\n');

  dump('COLLISION -- these files are one file to the retrieval layer:', collisions);
  dump('NEAR-TWIN -- a document sitting beside its own twin under another extension:', nearTwins);

  if (collisions.length) {
    console.error('COLLISION. Same source twice: keep one. Different sources: rename so the names differ');
    console.error('in a word, not a digit. A numeric suffix is invisible to the tokenizer.');
  }
  if (nearTwins.length) {
    console.error('NEAR-TWIN. A non-.md member of a corpus shelf is almost always published source material');
    console.error('this project does not own -- three UN treaty full texts sat beside their own summaries');
    console.error('for four sub-steps and this check reported 0. Move it to the ignored store or out of the');
    console.error('repository; it is frequently also a CHK-13 finding. oracle/NAMING.md section 11.');
  }
  return 1;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { tokens, stripExt, extOf, inStore, main };
