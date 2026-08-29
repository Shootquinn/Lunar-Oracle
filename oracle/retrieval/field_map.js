/* field_map.js -- the corpus's field partition, read from the two committed maps rather than
 * reconstructed from folder names, a review roster, or memory.
 *
 * WHY THIS FILE EXISTS AT ALL. literature_search.js needs to know which vocabulary distribution a
 * file belongs to, because IDF measures a token's rarity within a population and the merged corpus
 * is a union of two populations that do not share one. Loose end B3. The field label is the artifact
 * that makes the scoping possible, and it landed with the corpus at Wave 2 as literature/FIELDS.tsv
 * plus a `field` column in literature/INDEX.tsv.
 *
 * THE TRAP THIS FILE IS BUILT AROUND. There are two different partitions of the same eleven folders
 * in this project and they are not the same partition:
 *
 *   review split   7 lunar folders / 4 economics folders.  Who is competent to judge whether a file
 *                  sits in the right folder.  space-economy-and-markets goes to The Manager.
 *   FIELD split    8 lunar folders / 3 economics folders.  Which vocabulary distribution a file's
 *                  words are drawn from.  space-economy-and-markets is `lunar`, decided by measuring
 *                  between-field cosine on both partitions (0.7710 lunar against 0.8292 economics)
 *                  rather than by argument.
 *
 * A field map built from the review split puts space-economy-and-markets in `economics` and gets 26
 * files -- 15% of the shelf -- scored against the wrong vocabulary, silently, with no error and no
 * missing file. That is the exact failure shape B3 describes, committed by the fix for B3.
 *
 * So this file never infers. It reads both maps and it CROSS-CHECKS THEM AGAINST EACH OTHER: the
 * per-file `field` column of INDEX.tsv against the per-folder `folders` column of FIELDS.tsv. If the
 * two disagree about any file, that is the trap firing and it throws. If a file on disk has no row
 * in INDEX.tsv, that is an orphan and it throws. An unpartitioned file cannot be scored, and a file
 * scored against a guessed field is worse than one that fails loudly.
 */
'use strict';
const fs = require('fs');
const path = require('path');

function readTsv(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n').filter(l => l.length > 0 && l !== '\r');
  const head = lines[0].replace(/\r$/, '').split('\t');
  return lines.slice(1).map(l => {
    const cells = l.replace(/\r$/, '').split('\t');
    const row = {};
    head.forEach((h, i) => { row[h] = cells[i] === undefined ? '' : cells[i]; });
    return row;
  });
}

/* Strip the `literature/` prefix INDEX.tsv carries, so keys match listCorpusFiles()'s
   literatureDir-relative, forward-slash paths. */
function relKey(indexPath, literatureDirName) {
  const p = String(indexPath).replace(/\\/g, '/');
  const pref = literatureDirName + '/';
  return p.indexOf(pref) === 0 ? p.slice(pref.length) : p;
}

/* buildFieldMap(literatureDir, corpusFiles) -> { fieldOf, fields, folderField, counts }
 *
 *   fieldOf      Map: literatureDir-relative path -> field name
 *   fields       sorted array of the field names FIELDS.tsv declares
 *   folderField  Map: top-level folder name -> field name, from FIELDS.tsv's own `folders` column
 *   counts       Map: field -> number of corpus files in it
 *
 * corpusFiles is the caller's own listCorpusFiles() result, so the map is checked against the files
 * that will actually be scored rather than against whatever INDEX.tsv happens to claim.
 */
function buildFieldMap(literatureDir, corpusFiles) {
  const dirName = path.basename(path.resolve(literatureDir));
  const fieldsFile = path.join(literatureDir, 'FIELDS.tsv');
  const indexFile = path.join(literatureDir, 'INDEX.tsv');

  for (const f of [fieldsFile, indexFile]) {
    if (!fs.existsSync(f)) {
      throw new Error('MISSING FIELD MAP: ' + f + ' does not exist. Field-scoped IDF cannot be ' +
        'computed without the committed field partition, and falling back to a pooled table would ' +
        'reintroduce loose end B3 silently. Refusing to score.');
    }
  }

  const fieldRows = readTsv(fieldsFile);
  const fields = fieldRows.map(r => r.field).sort();
  const folderField = new Map();
  for (const r of fieldRows) {
    for (const folder of String(r.folders).split(';').map(s => s.trim()).filter(Boolean)) {
      if (folderField.has(folder)) {
        throw new Error('AMBIGUOUS FIELD MAP: folder "' + folder + '" is claimed by both field "' +
          folderField.get(folder) + '" and field "' + r.field + '" in FIELDS.tsv.');
      }
      folderField.set(folder, r.field);
    }
  }

  const indexField = new Map();
  for (const r of readTsv(indexFile)) {
    if (!r.path) continue;
    indexField.set(relKey(r.path, dirName), r.field);
  }

  const fieldOf = new Map();
  const orphans = [];
  const disagreements = [];
  const unknownField = [];

  for (const rel of corpusFiles) {
    const folder = rel.indexOf('/') === -1 ? '' : rel.slice(0, rel.indexOf('/'));
    const fromIndex = indexField.get(rel);
    const fromFolder = folderField.get(folder);

    if (!fromIndex) { orphans.push(rel); continue; }
    if (fields.indexOf(fromIndex) === -1) { unknownField.push(rel + ' -> "' + fromIndex + '"'); continue; }
    /* The cross-check. A field map that agrees with itself is the only one worth having: this is
       where a map built from the 7/4 review split rather than the 8/3 field split announces itself
       instead of quietly mis-scoring 26 files. */
    if (fromFolder && fromFolder !== fromIndex) {
      disagreements.push(rel + ': INDEX.tsv says "' + fromIndex + '", FIELDS.tsv folder "' + folder +
        '" says "' + fromFolder + '"');
      continue;
    }
    if (!fromFolder) {
      disagreements.push(rel + ': folder "' + folder + '" is named by no field in FIELDS.tsv');
      continue;
    }
    fieldOf.set(rel, fromIndex);
  }

  if (orphans.length || disagreements.length || unknownField.length) {
    const parts = [];
    if (orphans.length) parts.push(orphans.length + ' file(s) on disk with no INDEX.tsv row: ' +
      orphans.slice(0, 5).join(', ') + (orphans.length > 5 ? ', ...' : ''));
    if (disagreements.length) parts.push(disagreements.length + ' file(s) where INDEX.tsv and ' +
      'FIELDS.tsv disagree about the field: ' + disagreements.slice(0, 5).join(' | ') +
      (disagreements.length > 5 ? ' | ...' : ''));
    if (unknownField.length) parts.push(unknownField.length + ' file(s) labelled with a field ' +
      'FIELDS.tsv does not declare: ' + unknownField.slice(0, 5).join(', '));
    throw new Error('UNPARTITIONED CORPUS: ' + parts.join('; ') + '. Field-scoped IDF requires ' +
      'every scored file to carry exactly one agreed field. A file scored against a guessed field ' +
      'is the B3 error committed by the fix for B3, so this throws rather than defaulting.');
  }

  const counts = new Map();
  for (const f of fields) counts.set(f, 0);
  for (const v of fieldOf.values()) counts.set(v, counts.get(v) + 1);

  return { fieldOf, fields, folderField, counts };
}

module.exports = { buildFieldMap, readTsv, relKey };
