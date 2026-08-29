/* prove.js -- the standing self-test for oracle/retrieval/. Sub-step 3.7.
 *
 * Ten tests. Three are carried over from the prototype's own self-test because the failure they
 * prove against has not gone away; three pin the field partition, which is new and is the thing most
 * likely to be got wrong; four pin behaviour that was measured to be broken during this rebuild.
 *
 * Tests 1 to 5 run against scratch fixtures, so they do not depend on today's corpus shape or
 * content to keep passing tomorrow. Tests 6 to 10 run against the real 169-file shelf on purpose:
 * the close condition for 3.7 is that retrieval runs against THAT shelf, and a suite that only ever
 * sees planted fixtures cannot say whether it does.
 *
 * Run: node oracle/retrieval/prove.js
 * Exit 0 and "SELF-TEST: PASS" on success; exit 1 and "SELF-TEST: FAIL" otherwise.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const S = require('./literature_search.js');
const { buildFieldMap } = require('./field_map.js');

const LIT = path.join(__dirname, '..', '..', 'literature');

let pass = true;
const report = (label, ok, detail) => {
  console.log('  ' + (ok ? 'PASS' : 'FAIL') + '  ' + label + (detail ? '\n          ' + detail : ''));
  if (!ok) pass = false;
};

function mkScratch(prefix) { return fs.mkdtempSync(path.join(os.tmpdir(), prefix)); }

/* Plant a two-field fixture corpus with the maps a real shelf carries. `swapField` writes the
   WRONG field for the economics folder, to prove the cross-check fires. */
function plantCorpus(root, opts) {
  opts = opts || {};
  const files = [
    ['isru-processing', 'wittenberg-1992-he3-resources-review.md', 'lunar',
     'Wittenberg 1992 reviews lunar regolith helium-3 concentration and extraction feasibility ' +
     'across the lunar regolith, estimating over one million tonnes of helium-3.'],
    ['space-law-and-governance', 'un-1967-outer-space-treaty.md', 'lunar',
     'The Outer Space Treaty of 1967 establishes non-appropriation of celestial bodies and ' +
     'governs the ownership of lunar resources.'],
    ['growth-theory', 'solow-1956-contribution-growth-theory.md', 'economics',
     'Solow 1956 decomposes output growth into capital accumulation and a productivity residual, ' +
     'the canonical growth accounting identity.'],
  ];
  for (const [folder, name, , body] of files) {
    fs.mkdirSync(path.join(root, folder), { recursive: true });
    fs.writeFileSync(path.join(root, folder, name), body, 'utf8');
  }
  const lunarFolders = 'isru-processing;space-law-and-governance';
  const econFolders = 'growth-theory';
  fs.writeFileSync(path.join(root, 'FIELDS.tsv'),
    'field\tlabel\treview_owner\tfolders\tfiles\n' +
    'lunar\tLunar\tspace-resources\t' + lunarFolders + '\t2\n' +
    'economics\tEconomics\tmanager-econ\t' + econFolders + '\t1\n', 'utf8');
  const dirName = path.basename(root);
  const idxRows = files.map(([folder, name, field]) => {
    const f = opts.swapField && field === 'economics' ? 'lunar' : field;
    return dirName + '/' + folder + '/' + name + '\t' + folder + '\tnone\t' + f;
  });
  const kept = opts.orphan ? idxRows.slice(0, idxRows.length - 1) : idxRows;
  fs.writeFileSync(path.join(root, 'INDEX.tsv'),
    'path\tprimary\talso\tfield\n' + kept.join('\n') + '\n', 'utf8');
  return files;
}

/* 1 & 2. NESTED AND FLAT WALK. Carried from the prototype. The failure proved against: a corpus
   that moved to a nested layout resolved to a confident REFUSE because the walk read one level. */
function testWalks() {
  const root = mkScratch('ret-nested-');
  try {
    plantCorpus(root);
    const files = S.listCorpusFiles(root);
    report('1. nested walk finds every planted file two folders deep',
      files.length === 3 && files.indexOf('isru-processing/wittenberg-1992-he3-resources-review.md') !== -1,
      files.length + ' file(s): ' + files.join(', '));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }

  const flat = mkScratch('ret-flat-');
  try {
    fs.writeFileSync(path.join(flat, 'a.md'), 'x', 'utf8');
    fs.mkdirSync(path.join(flat, 'deep', 'deeper'), { recursive: true });
    fs.writeFileSync(path.join(flat, 'deep', 'deeper', 'b.md'), 'y', 'utf8');
    fs.writeFileSync(path.join(flat, 'c.txt'), 'not markdown', 'utf8');
    const files = S.listCorpusFiles(flat);
    report('2. the walk is shape-agnostic: flat, three-deep, and non-.md ignored',
      files.length === 2 && files[0] === 'a.md' && files[1] === 'deep/deeper/b.md',
      files.join(', '));
  } finally { fs.rmSync(flat, { recursive: true, force: true }); }
}

/* 3. EMPTY CORPUS. Carried from the prototype verbatim in intent. A real, existing, empty directory
   must fail loudly rather than return {best: null}, which a caller cannot distinguish from an honest
   "nothing relevant" and which is what let a mispointed corpus resolve to a confident REFUSE. */
function testEmpty() {
  const root = mkScratch('ret-empty-');
  try {
    let threw = false, msg = '';
    try { S.searchLiterature(root, 'any question at all, the corpus itself is the point'); }
    catch (e) { threw = true; msg = e.message; }
    report('3. a real, existing, EMPTY directory throws rather than returning an empty result',
      threw && /EMPTY POPULATION/.test(msg), threw ? msg.slice(0, 72) + '...' : 'DID NOT THROW');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

/* 4. ORPHAN. A file on disk with no INDEX.tsv row cannot be scored, because it has no field, and a
   file scored against a guessed field is the B3 error committed by the fix for B3. */
function testOrphan() {
  const root = mkScratch('ret-orphan-');
  try {
    plantCorpus(root, { orphan: true });
    let threw = false, msg = '';
    try { buildFieldMap(root, S.listCorpusFiles(root)); }
    catch (e) { threw = true; msg = e.message; }
    report('4. a corpus file with no INDEX.tsv row throws UNPARTITIONED rather than defaulting',
      threw && /UNPARTITIONED CORPUS/.test(msg) && /no INDEX.tsv row/.test(msg),
      threw ? msg.slice(0, 100) + '...' : 'DID NOT THROW');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

/* 5. THE 26-FILE TRAP, and this is the test that matters most in this file.
 *
 * There are two partitions of the same folders in this project: the REVIEW split (7 lunar / 4
 * economics, by who is competent to judge a placement) and the FIELD split (8 lunar / 3 economics,
 * by vocabulary distribution). They differ on exactly one folder, space-economy-and-markets, which
 * holds 26 files. A field map built from the review split mis-scores 15% of the shelf silently: no
 * error, no missing file, full apparent compliance, and answers that are merely slightly worse.
 *
 * This plants a corpus whose INDEX.tsv and FIELDS.tsv disagree about one folder and requires the
 * build to throw. It is the only mechanism standing between that mistake and a silent regression.
 */
function testFieldSplitTrap() {
  const root = mkScratch('ret-trap-');
  try {
    plantCorpus(root, { swapField: true });
    let threw = false, msg = '';
    try { buildFieldMap(root, S.listCorpusFiles(root)); }
    catch (e) { threw = true; msg = e.message; }
    report('5. INDEX.tsv and FIELDS.tsv disagreeing about a folder throws (the 26-file trap)',
      threw && /UNPARTITIONED CORPUS/.test(msg) && /disagree/.test(msg),
      threw ? msg.slice(0, 130) + '...' : 'DID NOT THROW -- a review-split field map would ship silently');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

/* 6. THE REAL SHELF. 169 files, partitioned 124/45 with zero orphans, and the one folder the two
   partitions disagree about resolves to `lunar`. Close condition: retrieval runs against the
   169-file shelf. */
function testRealShelf() {
  const files = S.listCorpusFiles(LIT);
  const map = buildFieldMap(LIT, files);
  const lunar = map.counts.get('lunar'), econ = map.counts.get('economics');
  const disputed = map.folderField.get('space-economy-and-markets');
  report('6. the real shelf partitions cleanly, 169 = 124 + 45, and the disputed folder is `lunar`',
    files.length === 169 && lunar === 124 && econ === 45 && map.fieldOf.size === 169 &&
      disputed === 'lunar',
    files.length + ' files; lunar ' + lunar + ', economics ' + econ + '; mapped ' + map.fieldOf.size +
    '; space-economy-and-markets -> "' + disputed + '" (the 8/3 field split, not the 7/4 review split)');
}

/* 7. FIELD-SCOPED IDF, DEMONSTRATED ON `moon` SPECIFICALLY -- the token whose error was measured.
   The claim is that pooling errs by more than 2 nats on it, and by less than 1 on `capital`, the
   row loose end B3 originally flagged. Both numbers are asserted, so a change in either direction
   fails here rather than passing quietly. */
function testMoonIdf() {
  const moon = S.idfError(LIT, 'moon', 'economics');
  const cap = S.idfError(LIT, 'capital', 'economics');
  report('7. pooled IDF errs on `moon` by more than 2 nats, and by less than 1 on `capital`',
    moon.error > 2.0 && cap.error < 1.0 && moon.error > cap.error * 2,
    'moon: pooled ' + moon.pooled.toFixed(2) + ' vs economics-scoped ' + moon.scoped.toFixed(2) +
    ' = ' + moon.error.toFixed(2) + ' nats (df ' + moon.df + '/' + moon.n + ' scoped, ' +
    moon.pooledDf + '/' + moon.pooledN + ' pooled);  capital: ' + cap.error.toFixed(2) + ' nats');
}

/* 8. THE CONFIRM DENOMINATOR. The regression this pins was live and measured during the rebuild:
   the prototype removed every matched topic token from the confirm, so the residue it judged a file
   on was the question's LEAST topical words, and the best filename match in the corpus scored
   frac 0.00 while a file scoring 0.00 confirmed. Only identity tokens may be excluded. */
function testConfirmDenominator() {
  const q = S.tokenize('What is the breakeven condition for lunar propellant against launched propellant?');
  const target = 'logistics-and-delivery/jones-2020-lunar-propellant-breakeven.md';
  const c = S.scoreFile(q, target, LIT, {});
  const r = S.confirmInText(LIT, c, q, S.CONFIRM_THRESHOLD);
  const keptTopic = r.checked.filter(t => c.matchedTokens.indexOf(t) !== -1);
  report('8. the confirm denominator excludes identity tokens but KEEPS matched topic tokens',
    r.frac > 0.5 && r.confirmed && keptTopic.length >= 2 &&
      r.checked.indexOf('2020') === -1 && r.checked.indexOf('jones') === -1,
    'top-ranked file scores frac ' + r.frac.toFixed(2) + ', confirmed=' + r.confirmed +
    '; denominator keeps [' + keptTopic.join(', ') + '] and drops the byline');
}

/* 9. NO SILENT TRUNCATION. The prototype sliced to opts.limit and discarded the rest without
   saying so, which is directly dangerous once a contested pair can be split by the cut. */
function testNoSilentTruncation() {
  const r = S.searchLiterature(LIT, 'What is the cost of lunar water ice extraction?', { limit: 3 });
  report('9. truncation is reported, not silent: scoredCount = returned + truncated',
    r.returned === 3 && r.truncated > 0 && r.scoredCount === r.returned + r.truncated,
    r.scoredCount + ' scored, ' + r.returned + ' returned, ' + r.truncated + ' truncated');
}

/* 10. confirmedSet IS A SET. The prototype returned one winner, which structurally cannot express
   a contested pair or a duplicated source. Proved on a real two-file cluster on this shelf. */
function testConfirmedSet() {
  const r = S.searchLiterature(LIT,
    'What does the Aqua Factorem approach propose for extracting lunar ice?', { limit: 10 });
  const names = r.confirmedSet.map(c => c.filename);
  const both = names.indexOf('isru-processing/metzger-2020-aqua-factorem.md') !== -1 &&
               names.indexOf('isru-processing/metzger-2021-aqua-factorem.md') !== -1;
  report('10. confirmedSet returns BOTH members of a real duplicate cluster, not one winner',
    both && r.confirmedSet.length >= 2 && r.best !== null,
    'confirmedSet has ' + r.confirmedSet.length + '; best = ' + (r.best && r.best.filename));
}

function main() {
  console.log('oracle/retrieval self-test');
  console.log('  scratch fixtures (1-5), then the real ' + S.listCorpusFiles(LIT).length +
    '-file shelf (6-10)');
  console.log('');
  testWalks();
  testEmpty();
  testOrphan();
  testFieldSplitTrap();
  testRealShelf();
  testMoonIdf();
  testConfirmDenominator();
  testNoSilentTruncation();
  testConfirmedSet();
  console.log('');
  console.log(pass ? 'SELF-TEST: PASS' : 'SELF-TEST: FAIL');
  return pass;
}

if (require.main === module) process.exit(main() ? 0 : 1);
module.exports = { main };
