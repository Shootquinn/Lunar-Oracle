/* fswalk.js -- ONE directory walker for this repository, and the reason it is one file.
 *
 * ===========================================================================================
 * THE DEFECT FAMILY THIS CLOSES, AND IT IS THIS PROJECT'S OLDEST
 * ===========================================================================================
 *
 * Seven times now the same shape has been found: THE CONTENT IS PRESENT AND CORRECT, THE TRIGGER
 * IS METADATA, AND THE ASSERTION PASSES ON THE MACHINE WHERE IT CANNOT FAIL. The line-ending
 * cases, the hook committed non-executable, the hardlinked stage repaired at W4-5, and now this:
 *
 *   MEASURED (W5-8, in the fresh clone at cc/oracletest at 131f513, under OneDrive):
 *     literature/ holds 169 .md files. Every one of them READS.
 *     fs.statSync(p).isFile()                  -> true   for all 169
 *     fs.readdirSync(d,{withFileTypes:true})   -> Dirent.isFile()         FALSE for all 169
 *                                              -> Dirent.isSymbolicLink()  TRUE for all 169
 *
 * Windows implements a OneDrive Files-On-Demand placeholder -- a dehydrated file, present in the
 * directory but with its data still in the cloud -- as a REPARSE POINT. `readdirSync` with
 * `withFileTypes` reads the directory entry's attribute word, sees FILE_ATTRIBUTE_REPARSE_POINT,
 * and reports UV_DIRENT_LINK. So a walk whose leaf test is `e.isFile()` finds NOTHING on a tree
 * that is entirely readable.
 *
 * This repository lives in the author's OneDrive, and so will most clones of it. The bug did not
 * fire during development only because READING A PLACEHOLDER HYDRATES IT: every tool run repaired
 * the tree it was about to walk. It is latent, not absent. A fresh clone on a machine with
 * Files-On-Demand enabled, opened before sync settles, sees an empty corpus.
 *
 * ===========================================================================================
 * WHY `lstat` IS NOT THE ANSWER, WHICH IS THE CORRECTION TO THE W4-5 REPAIR
 * ===========================================================================================
 *
 * The hardlink repair at W4-5 replaced `Dirent.isFile()` with `fs.lstatSync(p).isFile()` in
 * tools/manifest.js and tools/quantities.js. `lstat` DOES NOT FOLLOW LINKS -- that is its entire
 * definition -- so it is the wrong instrument for a class of failure whose whole content is "this
 * entry is reported as a link and it is really a file". It happened to work on the hardlink case
 * because a hardlink is not a reparse point at all and `lstat` sees straight through the Dirent's
 * mistake. It is NOT guaranteed on a reparse point, and it is exactly backwards as a rule: the
 * instrument that answers "what is at the end of this name" is `stat`, not `lstat`.
 *
 * So the rule here is: ASK THE DIRENT FIRST, BECAUSE IT IS FREE AND USUALLY RIGHT; WHEN IT SAYS
 * ANYTHING OTHER THAN `file` OR `dir`, DO NOT BELIEVE IT -- ASK `stat`, WHICH RESOLVES THE
 * REPARSE POINT AND ANSWERS ABOUT THE THING ITSELF.
 *
 * ===========================================================================================
 * THE MIRROR CASE, WHICH IS THE ONE NOBODY WOULD HAVE CAUGHT
 * ===========================================================================================
 *
 * Most walkers in this repository never call `isFile()`. They ask `e.isDirectory()` and treat
 * everything else as a candidate file, so a dehydrated FILE survives them intact. That is why the
 * blast radius of the W5-8 finding is one walker and not fourteen.
 *
 * But `isDirectory()` is false for a reparse-pointed DIRECTORY -- a junction, a mounted volume, a
 * placeholder folder. Such a walker does not merely misclassify it: it PRUNES THE ENTIRE SUBTREE
 * WITHOUT A WORD and reports a clean, smaller count. There is no error, no exception and nothing
 * in the output that differs from a tree that genuinely holds fewer files. That is the same
 * silent-wrong-answer shape one level up, and it is why every walker is routed through here
 * rather than only the one that was caught.
 *
 * ===========================================================================================
 * WHAT THIS DOES NOT CHANGE
 * ===========================================================================================
 *
 * On a tree containing no links and no reparse points -- which is every tree these tools have
 * ever been run against successfully -- `kindOf()` returns exactly what `Dirent` returns, by the
 * fast path, without a single extra syscall. The walkers' output is byte-identical. This is a
 * FILE-DISCOVERY repair; no tool's semantics move.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL_VERSION = '1.0-1';

/* kindOf(dirent, fullPath) -> 'file' | 'dir' | 'other'
 *
 * `dirent` may be null, in which case the answer comes from `stat` alone. The fast path is the
 * common one and costs nothing; the slow path fires only on an entry the directory entry itself
 * could not classify, which on a normal tree is no entries at all. */
function kindOf(dirent, fullPath) {
  if (dirent) {
    if (dirent.isDirectory()) return 'dir';
    if (dirent.isFile()) return 'file';
    /* The Dirent said link / socket / fifo / unknown. On Windows "link" is what a OneDrive
       placeholder, a junction and a symlink all look like from a directory entry, and only one of
       those three is genuinely not a file. Resolve it. */
  }
  let st;
  try { st = fs.statSync(fullPath); } catch (e) { return 'other'; }
  if (st.isDirectory()) return 'dir';
  if (st.isFile()) return 'file';
  return 'other';
}

/* isRealFile / isRealDir: the same rule addressed by path alone, for call sites that hold a path
 * and no Dirent. These are the names tools/manifest.js and tools/quantities.js already use, kept
 * so the W4-5 repair sites change instrument without changing shape. */
function isRealFile(p) { return kindOf(null, p) === 'file'; }
function isRealDir(p) { return kindOf(null, p) === 'dir'; }

/* walk(dir, pred, out, opts) -> array of absolute paths, in readdir order per directory.
 *
 * pred(absPath, dirent) decides whether a FILE is collected; omitted means every file.
 * opts.skipDir(name, absPath) prunes a directory by name -- `.git`, `node_modules`, `_pdf`.
 * opts.onDir(absPath) is called for each directory actually descended into.
 *
 * A directory that cannot be read yields zero entries here and does not throw. That is the
 * prototype's behaviour and it is deliberate: the CALLER decides whether zero files is an error,
 * because only the caller knows what population it expected. See requireNonEmpty() below -- an
 * empty result must never be allowed to look like a clean one, and that judgement does not belong
 * in the walker.
 *
 * CYCLE SAFETY. Resolving reparse points with `stat` means a junction or symlink that points at
 * an ancestor becomes a real cycle rather than a leaf. `seen` holds the realpath of every
 * directory descended into. Without it this function would be the first walker in the repository
 * that could hang, which would be a poor trade for the bug it fixes. */
function walk(dir, pred, out, opts) {
  out = out || [];
  opts = opts || {};
  const seen = opts._seen || new Set();
  let real;
  try { real = fs.realpathSync(dir); } catch (e) { real = dir; }
  if (seen.has(real)) return out;
  seen.add(real);
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    const k = kindOf(e, p);
    if (k === 'dir') {
      if (opts.skipDir && opts.skipDir(e.name, p)) continue;
      if (opts.onDir) opts.onDir(p);
      walk(p, pred, out, Object.assign({}, opts, { _seen: seen }));
    } else if (k === 'file') {
      if (!pred || pred(p, e)) out.push(p);
    }
    /* k === 'other': a socket, a fifo, or an entry that vanished between readdir and stat.
       Collected by neither branch, and that is correct -- it is not a file and not a directory. */
  }
  return out;
}

/* listDirs(dir) -> the names of the immediate subdirectories, reparse points included. The
 * positive-filter mirror of the walk: `readdirSync(...).filter(e => e.isDirectory())` DROPS a
 * placeholder folder, and a tool that selects its populations that way loses a whole population
 * with no message. */
function listDirs(dir) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return []; }
  return ents.filter(e => kindOf(e, path.join(dir, e.name)) === 'dir').map(e => e.name);
}

/* listRel(root, pred) -> forward-slash relative paths under `root`, sorted. This is the shape
 * literature_search.js's listCorpusFiles() has always returned and the shape the corpus walkers
 * want; keeping it here means the corpus is enumerated by ONE piece of code. */
function listRel(root, pred, opts) {
  const abs = walk(root, pred, [], opts);
  return abs.map(p => path.relative(root, p).split(path.sep).join('/')).sort();
}

/* ============================================================================ THE VACUITY RULE
 *
 * A walk that returns zero files is indistinguishable, BY RETURN VALUE ALONE, from a walk over a
 * population that genuinely holds nothing. That ambiguity is what let a missing corpus resolve to
 * a confident REFUSE, and it is what would have let a dehydrated corpus do the same. Every corpus
 * walker in this repository either throws through here or reports VACUOUS in its own dialect.
 *
 * The message is long on purpose. It fires on a machine the author is not sitting at, in front of
 * somebody who has just cloned this repository and has no idea what Files-On-Demand is, and the
 * one thing they must not conclude is that the corpus is missing. It is not. It is dehydrated,
 * and `attrib -U +P` on the tree, or opening any file in it, fixes it. */
function vacuityDiagnosis(root) {
  let byStat = 0, byDirent = 0, byDirentLink = 0;
  (function w(d) {
    let ents;
    try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
    for (const e of ents) {
      const p = path.join(d, e.name);
      if (kindOf(e, p) === 'dir') { w(p); continue; }
      if (!/\.md$/i.test(e.name)) continue;
      if (e.isFile()) byDirent++;
      if (e.isSymbolicLink()) byDirentLink++;
      try { if (fs.statSync(p).isFile()) byStat++; } catch (err) { /* counted in neither */ }
    }
  })(root);
  return { byStat, byDirent, byDirentLink };
}

function emptyPopulationMessage(root, who) {
  const d = vacuityDiagnosis(root);
  let m = 'EMPTY POPULATION: ' + (who || 'the corpus walk') + ' found zero .md files under ' +
    root + ' (searched recursively). A search against an empty corpus is indistinguishable from a ' +
    'search that found nothing relevant to the question; this throws rather than returning zero ' +
    'candidates so the router cannot silently classify a missing or mispointed corpus as a ' +
    'confident REFUSE.';
  if (d.byStat > 0) {
    m += '\n\nAND THE CORPUS IS NOT MISSING. stat() can see ' + d.byStat + ' .md file(s) under ' +
      'that root, of which the directory entries call ' + d.byDirent + ' file(s) and ' +
      d.byDirentLink + ' link(s). That is the signature of OneDrive Files-On-Demand: the files ' +
      'are dehydrated placeholders, which Windows implements as reparse points, and something is ' +
      'reading the directory entry instead of the file. Every walk in this repository is supposed ' +
      'to go through tools/fswalk.js for exactly this reason; the one that produced this message ' +
      'does not. Rehydrate with:  attrib -U +P /S literature\\*.md';
  }
  return m;
}

/* requireNonEmpty(root, files, who) -- throw rather than return an empty result. */
function requireNonEmpty(root, files, who) {
  if (files.length === 0) throw new Error(emptyPopulationMessage(root, who));
}

/* ====================================================================== THE KNOWN-ANSWER TEST
 *
 * A repair with no test is a repair that regresses the next time somebody finds
 * `readdirSync(dir, {withFileTypes:true})` tidier. tools/verify_corpus.js carries a known-answer
 * test and it caught its own parser breaking; this is the same device on the same class of
 * failure -- an empty population that reads as a clean one.
 *
 * THE HARD PART, AND IT IS WHY THIS TEST IS BUILT THE WAY IT IS: READING A PLACEHOLDER HYDRATES
 * IT. A test that opens a dehydrated file destroys its own subject, so a test that waits for a
 * real dehydrated tree can only ever run on a machine that happens to have one, which is the
 * "passes where it cannot fail" trap this whole family lives in.
 *
 * So the subject is SYNTHESISED. `--selftest` walks the real literature/ tree through a
 * `readdirSync` replaced for the duration by one that returns Dirent-shaped objects reporting
 * isFile()=false and isSymbolicLink()=true for every file -- the exact triple W5-8 measured on the
 * fresh clone -- over files that are really there and really readable. The walker must still find
 * all of them.
 *
 * WHAT THIS ESTABLISHES: that this walker is correct against the SIGNATURE a placeholder presents
 * to it. That is the whole of what the walker consumes, so it is the whole of what it can be
 * wrong about.
 * WHAT IT DOES NOT ESTABLISH: that a real placeholder presents exactly that signature. That is a
 * platform fact, not a code fact, and it is established by measurement -- W5-8's on the fresh
 * clone, and W5-11's, recorded in cr_scratch/step8_w5-11_dehydration.md. If Windows ever reports a
 * placeholder some third way, this test will not notice and the measurement is what has to be
 * redone. */
function fakeDirent(name, kind) {
  return {
    name: name,
    isFile: () => false,          /* the lie a placeholder tells */
    isDirectory: () => kind === 'dir' ? false : false,
    isSymbolicLink: () => true,   /* ...and what it says instead, for files AND for folders */
    isBlockDevice: () => false, isCharacterDevice: () => false,
    isFIFO: () => false, isSocket: () => false,
  };
}

/* withDehydratedTree(fn) runs fn() with fs.readdirSync patched so that EVERY entry -- files and
 * directories alike -- reports as a symbolic link. Directories are included deliberately: the
 * mirror case above is the one no existing walker survives, and a test that only dehydrates files
 * would pass on walkers that are still broken for folders. */
function withDehydratedTree(fn) {
  const realReaddir = fs.readdirSync;
  fs.readdirSync = function (dir, opts) {
    if (!opts || !opts.withFileTypes) return realReaddir.call(fs, dir, opts);
    const ents = realReaddir.call(fs, dir, { withFileTypes: true });
    return ents.map(e => fakeDirent(e.name, e.isDirectory() ? 'dir' : 'file'));
  };
  try { return fn(); } finally { fs.readdirSync = realReaddir; }
}

const KNOWN_CORPUS_COUNT = 169;

function selftest(root) {
  const lit = root || path.join(__dirname, '..', 'literature');
  const md = p => /\.md$/i.test(p);
  const out = [];
  let fails = 0;
  const say = (tag, s) => out.push(tag + '\t' + s);
  const FAIL = s => { fails++; say('FAIL', s); };

  /* KA-1: the real tree, as it is on this machine right now. */
  const plain = listRel(lit, md);
  if (plain.length !== KNOWN_CORPUS_COUNT) {
    FAIL('KA-1 fswalk found ' + plain.length + ' .md file(s) under ' + lit + ', not the declared ' +
      KNOWN_CORPUS_COUNT + '. Either the shelf changed and KNOWN_CORPUS_COUNT is stale, or the ' +
      'walk is losing files. A count of zero here is the dehydration defect; any other wrong ' +
      'count is a shelf change and is argued, not edited to pass');
  } else {
    say('OK', 'KA-1 fswalk finds ' + plain.length + ' .md files under literature/ on the tree as it stands');
  }

  /* KA-2: the same tree with every directory entry lying about its type, exactly as a OneDrive
     Files-On-Demand placeholder does. Same answer, or the repair is not a repair. */
  const dehydrated = withDehydratedTree(() => listRel(lit, md));
  if (dehydrated.length !== plain.length) {
    FAIL('KA-2 under a synthesised dehydrated tree fswalk found ' + dehydrated.length +
      ' file(s) against ' + plain.length + ' on the same tree hydrated. This is the W5-8 defect, ' +
      'live, in tools/fswalk.js itself');
  } else if (dehydrated.join('\n') !== plain.join('\n')) {
    FAIL('KA-2 the dehydrated walk returned the same COUNT but a different SET');
  } else {
    say('OK', 'KA-2 the same ' + dehydrated.length + ' files, byte-identical set, over a tree ' +
      'whose every Dirent reports isFile()=false isSymbolicLink()=true');
  }

  /* KA-3: the instrument that is being replaced, run against the same synthetic tree, so that the
     test PROVES THE DEFECT rather than only proving the fix. If this ever stops returning zero,
     the synthesis has stopped reproducing the failure and KA-2 has stopped meaning anything. */
  const oldWalk = () => {
    const acc = [];
    (function w(d, pre) {
      let ents;
      try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
      for (const e of ents) {
        const rel = pre ? pre + '/' + e.name : e.name;
        if (e.isDirectory()) w(path.join(d, e.name), rel);
        else if (e.isFile() && e.name.endsWith('.md')) acc.push(rel);
      }
    })(lit, '');
    return acc;
  };
  const oldOnDehydrated = withDehydratedTree(oldWalk);
  if (oldOnDehydrated.length !== 0) {
    FAIL('KA-3 the pre-repair walk found ' + oldOnDehydrated.length + ' file(s) on the synthetic ' +
      'dehydrated tree and was supposed to find ZERO. The synthesis is no longer reproducing the ' +
      'W5-8 signature, so KA-2 is now vacuous and is NOT a pass');
  } else {
    say('OK', 'KA-3 the pre-repair `e.isFile()` walk finds 0 of ' + plain.length +
      ' on the same synthetic tree -- the defect is reproduced, so KA-2 has a subject');
  }

  /* KA-4: vacuity is loud. A walk of a directory that does not exist must not return a clean zero
     to a caller who asked for a corpus. */
  let threw = null;
  try { requireNonEmpty(lit + '__does_not_exist__', [], 'fswalk selftest'); }
  catch (e) { threw = e.message; }
  if (!threw || threw.indexOf('EMPTY POPULATION') !== 0) {
    FAIL('KA-4 requireNonEmpty did not throw EMPTY POPULATION on an empty file list');
  } else {
    say('OK', 'KA-4 an empty population throws EMPTY POPULATION rather than returning zero quietly');
  }

  /* KA-5: the mirror case. Directories reported as links must still be descended into. The
     corpus lives in nine taxonomy folders, so a walker that cannot see a linked directory returns
     the root-level files only -- a small, clean, wrong number. */
  const rootOnly = plain.filter(p => p.indexOf('/') === -1).length;
  if (dehydrated.length <= rootOnly) {
    FAIL('KA-5 the dehydrated walk returned ' + dehydrated.length + ' file(s), no more than the ' +
      rootOnly + ' at the root: the taxonomy subtrees were pruned, which is the mirror case');
  } else {
    say('OK', 'KA-5 subtrees survive: ' + (dehydrated.length - rootOnly) + ' of ' +
      dehydrated.length + ' files are below the root and were reached through directories whose ' +
      'Dirent reported them as links');
  }

  say('NOTE', 'tools/fswalk.js ' + TOOL_VERSION + ' selftest: ' + (fails ? fails + ' FAILURE(S)' : 'all clauses OK'));
  return { fails, lines: out };
}

module.exports = {
  TOOL_VERSION, kindOf, isRealFile, isRealDir, walk, listDirs, listRel,
  requireNonEmpty, emptyPopulationMessage, vacuityDiagnosis,
  withDehydratedTree, selftest, KNOWN_CORPUS_COUNT,
};

if (require.main === module) {
  const r = selftest(process.argv[2]);
  console.log(r.lines.join('\n'));
  process.exit(r.fails ? 1 : 0);
}
