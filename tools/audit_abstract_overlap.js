#!/usr/bin/env node
/* audit_abstract_overlap.js -- measure verbatim 10-gram overlap between a summary's ## Abstract
 * section and the first pages of its paired source PDF.
 *
 * The corpus is going into a public repository under a public-domain dedication. The dedication
 * covers this project's own summaries and cannot cover the sources they describe. A summary whose
 * abstract is the publisher's abstract retyped is therefore not this project's to dedicate,
 * whether or not it says so.
 *
 * Method: normalize both texts to lowercase word sequences, build the set of 10-word shingles from
 * the summary's abstract, and report the fraction of them that appear in the PDF's own first-page
 * text. Ten words is long enough that shared technical vocabulary does not trigger it and short
 * enough to survive line-break and hyphenation noise from PDF extraction.
 *
 *   node tools/audit_abstract_overlap.js <dir-with-paired-md-and-pdf> [threshold]
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');

const N = 10;
const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
function shingles(words, n) {
  const out = new Set();
  for (let i = 0; i + n <= words.length; i++) out.add(words.slice(i, i + n).join(' '));
  return out;
}
function pdfText(file, pages) {
  try {
    return cp.execFileSync('pdftotext', ['-f', '1', '-l', String(pages), file, '-'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch { return null; }
}
function abstractOf(md) {
  /* REPAIRED 2026-08-28 (W2-2), against PRV-15. The shipped pattern was
   *     /^##+\s*Abstract\s*$([\s\S]*?)(?=^##\s)/mi
   * and it returned null on 73 of the 267 union files that carry an Abstract heading, for TWO
   * independent reasons, both of them a regex asserting a document shape the corpus does not have:
   *
   *   HEADING SHAPE (18 files, tree-wide). `\s*$` after `Abstract` demands a BARE heading. Every
   *   annotated one was skipped -- `## Abstract (transcribed from title page)`, `## Abstract
   *   (transcribed)`, `## Abstract (as transcribed / paraphrased from the paper)`. All 18 carry the
   *   word "transcribed" IN THE HEADING, which is exactly the population PRV-15 exists to measure.
   *   The instrument was blind to its own target set and returned zero findings on it.
   *
   *   TERMINATOR (55 more files, and nobody had named this one). `(?=^##\s)` demands a FOLLOWING
   *   `##` heading. In most summaries the Abstract is the LAST section, so there is nothing to look
   *   ahead to and the match fails on a perfectly well-formed bare heading. Three times the size of
   *   the defect I was sent to fix, same class, found by measuring instead of by reading the line.
   *
   * Measured on the 271-file union: 194 extracted before, 267 after. The 4 remaining files carry
   * no Abstract heading at all and correctly return null. */
  const m = md.match(/^##+[ \t]*Abstract\b[^\n]*$([\s\S]*?)(?=^##[ \t]|$(?![\s\S]))/mi);
  return m ? m[1].trim() : null;
}

const dir = process.argv[2];
const thresh = Number(process.argv[3] || 10);
if (!dir || !fs.existsSync(dir)) { console.error('usage: audit_abstract_overlap.js <dir> [threshold%]'); process.exit(2); }

const rows = [];
let noAbstract = 0, noPdf = 0;
for (const f of fs.readdirSync(dir).filter(f => /\.md$/i.test(f))) {
  const md = fs.readFileSync(path.join(dir, f), 'utf8');
  const abs = abstractOf(md);
  if (!abs) { noAbstract++; continue; }
  const pdf = path.join(dir, f.replace(/\.md$/i, '.pdf'));
  if (!fs.existsSync(pdf)) { noPdf++; continue; }
  const txt = pdfText(pdf, 3);
  if (!txt) { noPdf++; continue; }
  const a = shingles(norm(abs), N);
  if (!a.size) continue;
  const src = new Set(shingles(norm(txt), N));
  let hit = 0; for (const g of a) if (src.has(g)) hit++;
  rows.push({ f, pct: (100 * hit / a.size), grams: a.size });
}
rows.sort((x, y) => y.pct - x.pct);
const flagged = rows.filter(r => r.pct >= thresh);
console.log(`tested ${rows.length} summaries with a paired PDF and an abstract`);
console.log(`skipped: ${noAbstract} with no ## Abstract section, ${noPdf} with no readable paired PDF`);
console.log(`median overlap ${rows.length ? rows[Math.floor(rows.length / 2)].pct.toFixed(1) : 'n/a'}%\n`);
console.log(`AT OR ABOVE ${thresh}% VERBATIM: ${flagged.length}`);
for (const r of flagged) console.log('  ' + r.pct.toFixed(1).padStart(5) + '%  ' + r.f + '  (' + r.grams + ' shingles)');
