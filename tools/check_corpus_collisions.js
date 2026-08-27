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

function tokens(basename) {
  return basename
    .replace(/\.md$/i, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(t => t.length > 1 && !STOPWORDS.has(t));
}

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.md$/i.test(e.name)) out.push(p);
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
  let count = 0;
  for (const root of roots) {
    for (const file of walk(root, [])) {
      count++;
      const key = tokens(path.basename(file)).sort().join('|');
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(file);
    }
  }

  const collisions = [...byKey.entries()].filter(([, files]) => files.length > 1);
  if (!collisions.length) {
    console.log(`check_corpus_collisions: ${count} summaries, 0 collisions.`);
    return 0;
  }

  console.error(`check_corpus_collisions: ${collisions.length} collision group(s) in ${count} summaries.\n`);
  for (const [key, files] of collisions) {
    console.error('  these files are one file to the retrieval layer: [' + key + ']');
    for (const f of files) console.error('    ' + String(fs.statSync(f).size).padStart(8) + '  ' + f);
    console.error('');
  }
  console.error('Same source twice: keep one. Different sources: rename so the names differ in a');
  console.error('word, not a digit. A numeric suffix is invisible to the tokenizer.');
  return 1;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { tokens, main };
