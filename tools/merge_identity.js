#!/usr/bin/env node
// merge_identity.js -- Step 2.1 (MERGE-2) source-identity extractor. The Engineer, 2026-08-28.
// Usage: node merge_identity.js <lseiLitDir> <intakeLitDir> [outTsv]
// Emits TSV: file, corpus, identifier, identifier_kind, confidence
// Reports its own inputs on stderr before it emits anything.

const fs = require('fs');
const path = require('path');

// Two modes. Default: the source-identity table (Step 2.1), byte-for-byte as first run.
// --plan: the Wave-1 disposition table cr_scratch/merge_plan.tsv (Step 2, Wave 1).
const PLAN  = process.argv[2] === '--plan';
const STAGE_MODE = process.argv[2] === '--stage';
const A_DIR = PLAN ? process.argv[3] : process.argv[2];
const B_DIR = PLAN ? process.argv[4] : process.argv[3];
const OUT   = PLAN ? null : (process.argv[4] || null);
if (!STAGE_MODE && (!A_DIR || !B_DIR)) {
  console.error('usage: node merge_identity.js <lseiLitDir> <intakeLitDir> [outTsv]');
  console.error('   or: node merge_identity.js --plan <lseiLitDir> <intakeLitDir> <taxonomyMd> <supersededDir> <outTsv>');
  process.exit(2);
}

// ---- normalize(), oracle/NAMING.md section 1, verbatim, 7 steps ----
function normalize(name) {
  let s = path.basename(name);                 // 1 leaf only
  s = s.replace(/\.md$/i, '');                 // 2 strip exactly one trailing .md
  s = s.toLowerCase();                         // 3
  s = s.replace(/[_ ]+/g, '-');                // 4 runs of _ or space -> one -
  s = s.replace(/-{2,}/g, '-');                // 5 runs of 2+ - -> one -
  s = s.replace(/^-+|-+$/g, '');               // 6 trim leading/trailing -
  return s + '.md';                            // 7
}

function walk(dir) {
  const out = [];
  (function rec(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (/\.md$/i.test(e.name)) out.push(p);
    }
  })(dir);
  return out.sort();
}

// ---- citation block extraction ----
// Header precedence: Citation, then Provenance, then Metadata. NAMING.md section 7:
// "Read from the file's ## Citation block ... where a file carries ## Provenance or ## Metadata
//  instead, read that."
// Block runs from the header line to the next line matching ^#{1,3}\s or a lone ^---$.
const HDR = /^(#{2,3})\s*(Citation|Provenance|Metadata)\s*$/i;
function citationBlock(text) {
  const lines = text.split(/\r?\n/);
  const found = {};
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(HDR);
    if (!m) continue;
    const kind = m[2].toLowerCase();
    if (found[kind] !== undefined) continue;   // first occurrence only
    const body = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (/^#{1,3}\s/.test(lines[j])) break;
      if (/^-{3,}\s*$/.test(lines[j])) break;
      body.push(lines[j]);
    }
    found[kind] = body.join('\n');
  }
  for (const k of ['citation', 'provenance', 'metadata']) {
    if (found[k] !== undefined && found[k].trim() !== '') return { block: found[k], header: k };
  }
  return { block: null, header: null };
}

// ---- identifier parse ----
// LABELLED LINES FIRST. Both corpora write the source's own identifier on a labelled line
// ("DOI:", "- **DOI:**", "Publisher URL:"), and write OTHER documents' identifiers in prose --
// a preprint's arXiv DOI, a working-paper DOI, a cited companion report's URL, a template
// placeholder. Taking the first token found anywhere in the block picks those up. So: search the
// labelled lines first, and fall back to the whole block only when no labelled line carries one.
const DOI_LABEL = /^[\s>*|-]*\**\s*doi\b[^:]{0,20}:/i;
const URL_LABEL = /^[\s>*|-]*\**\s*(publisher\s*url|publisher|url|source\s*url|available\s*at|link)\b[^:]{0,20}:/i;

// Level 1: DOI. 10.NNNN/suffix, resolver prefix stripped, percent-decoded, lowercased.
const DOI_RE = /\b10\.\d{4,9}\/[^\s"'`<>\]}|]+/g;
// Registrant prefixes that mint a DOI over somebody else's uploaded copy. NAMING.md section 7
// rejects a PDF-hosting mirror at level 2 for the reason that it does not identify the publication;
// a mirror-minted DOI is the same object at level 1. 10.13140 is ResearchGate. Live instance:
// colozza-2020, whose own citation block says the ResearchGate DOI "is not a publisher-registered
// identifier and is not used as a locator here" -- the file was right and the first run of this
// tool was wrong.
const MIRROR_DOI = /^10\.13140\//;
function cleanDoi(raw) {
  let s = raw.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  try { s = decodeURIComponent(s); } catch (e) { /* leave as written */ }
  s = s.toLowerCase();
  s = s.replace(/[.,;:*]+$/, '');
  while (s.endsWith(')') && (s.split('(').length - 1) < (s.split(')').length - 1)) s = s.slice(0, -1);
  // a suffix that ends mid-token on an unclosed "(" is a truncation, not a DOI
  if ((s.split('(').length - 1) > (s.split(')').length - 1)) return '';
  // suffix of 1-2 characters is a truncated match or a template placeholder, not a DOI.
  // Live instance: "10.2514/6.<paper-number>" in downing-2005 truncates at "<" to "10.2514/6".
  if (!/^10\.\d{4,9}\/.{3,}/.test(s)) return '';
  if (MIRROR_DOI.test(s)) return '';
  return s;
}
// Level 2: publisher article URL. Scheme and www. stripped, query and fragment removed.
// Excluded: DOI resolvers (level 1 wearing a hat, NAMING.md section 7) and search-result links.
const URL_RE = /https?:\/\/[^\s"'`<>)\]}|,]+/g;
const RESOLVER = /^(dx\.)?doi\.org\//i;
const SEARCH = /(^|\.)google\.[a-z.]+\/(search|scholar)|^scholar\.google\.|[?&]q=/i;
function cleanUrl(raw) {
  let s = raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  s = s.split('#')[0].split('?')[0];
  s = s.replace(/[.,;:*]+$/, '').replace(/\/+$/, '');
  return s.toLowerCase();
}

function scan(lines, labelRe, tokenRe, clean) {
  const labelled = [], anywhere = [];
  for (const ln of lines) {
    const hits = (ln.match(tokenRe) || []).map(clean).filter(Boolean);
    if (!hits.length) continue;
    (labelRe.test(ln) ? labelled : anywhere).push(...hits);
  }
  return { labelled: [...new Set(labelled)], anywhere: [...new Set(anywhere)] };
}

function identify(block) {
  if (block === null) return { id: '', kind: 'none', conf: 'none', note: 'no-citation-block' };
  const lines = block.split('\n');

  // ---- level 1 ----
  const d = scan(lines, DOI_LABEL, DOI_RE, cleanDoi);
  if (d.labelled.length) {
    return { id: d.labelled[0], kind: 'doi', conf: d.labelled.length === 1 ? 'high' : 'medium',
             note: d.labelled.length === 1 ? '' : 'multiple-labelled-dois:' + d.labelled.length };
  }
  if (d.anywhere.length) {
    // unlabelled: the DOI is in the citation prose. Sound when there is exactly one; a block
    // holding several unlabelled DOIs is citing other documents and needs a person.
    return { id: d.anywhere[0], kind: 'doi', conf: d.anywhere.length === 1 ? 'medium' : 'low',
             note: d.anywhere.length === 1 ? 'doi-unlabelled' : 'unlabelled-dois:' + d.anywhere.length };
  }

  // ---- level 2 ----
  // A publisher ARTICLE url. A bare host with no path segment addresses a site, not a document,
  // so it is rejected rather than recorded -- NAMING.md section 7 rejects mirrors and
  // search-result links for the same reason, that they do not name the document.
  const isArticle = u => u.includes('/') && u.split('/').slice(1).some(seg => seg.length);
  const u = scan(lines, URL_LABEL, URL_RE, cleanUrl);
  const keep = a => a.filter(x => !RESOLVER.test(x) && !SEARCH.test(x));
  const uLab = keep(u.labelled), uAny = keep(u.anywhere);
  const artLab = uLab.filter(isArticle), artAny = uAny.filter(isArticle);
  if (artLab.length) {
    return { id: artLab[0], kind: 'url', conf: artLab.length === 1 ? 'medium' : 'low',
             note: artLab.length === 1 ? '' : 'multiple-labelled-urls:' + artLab.length };
  }
  if (artAny.length) {
    return { id: artAny[0], kind: 'url', conf: 'low',
             note: artAny.length === 1 ? 'url-unlabelled' : 'unlabelled-urls:' + artAny.length };
  }
  if (uLab.length || uAny.length) {
    return { id: '', kind: 'none', conf: 'none',
             note: 'host-only-url:' + [...new Set([...uLab, ...uAny])].join(',') };
  }
  return { id: '', kind: 'none', conf: 'none', note: 'block-present-no-identifier' };
}


// ============================================================================
// PLAN MODE -- Step 2 Wave 1. Emits cr_scratch/merge_plan.tsv, the committed
// disposition table the Wave 2 merge executes from. One row per union key.
//   node merge_identity.js --plan <lseiLit> <intakeLit> <taxonomyMd> <supersededDir> <outTsv>
// Reuses normalize(), walk(), citationBlock() and identify() above, unchanged, so the
// plan and the identity table cannot disagree about what a key or an identifier is.
// ============================================================================
if (PLAN) {
  const crypto = require('crypto');
  const TAXO = process.argv[5], SUPDIR = process.argv[6], POUT = process.argv[7];
  if (!TAXO || !SUPDIR || !POUT) {
    console.error('usage: node merge_identity.js --plan <lseiLit> <intakeLit> <taxonomyMd> <supersededDir> <outTsv>');
    process.exit(2);
  }

  // ---- read-digest: every file this run opens, stamped (path, size, mtimeMs) ----
  const READ = [];
  function slurp(p) { const st = fs.statSync(p); READ.push(p.replace(/\\/g, '/') + '\t' + st.size + '\t' + st.mtimeMs); return fs.readFileSync(p, 'utf8'); }
  function slurpBin(p) { const st = fs.statSync(p); READ.push(p.replace(/\\/g, '/') + '\t' + st.size + '\t' + st.mtimeMs); return fs.readFileSync(p); }
  const sha = b => crypto.createHash('sha256').update(b).digest('hex');

  // ---- HAND-ADJUDICATED INPUTS. Declared as data so they are auditable, never inferred. ----
  // Step 2.1 section 2: the level-2 URL group nasa.gov/moontomarsarchitecture holds three keys and
  // is two sources. This key is the third member and is NOT a duplicate of the other two.
  const FALSE_MERGE = new Set(['nasa-data-gaps-acr25-wp-data-gaps-v3.md']);
  // Step 2.1 section 2: two pairs confirmed at level 3 by hand (venue+date+grant number), because
  // NAMING.md section 7 has no level between 2 and 3 for an agency report or grant number.
  const LEVEL3_PAIRS = [
    ['sanders-2025-nasa-isru-progress-review.md', 'sanders-2025-nasa-lunar-isru-progress-review.md',
      'Luxembourg Space Resources Week 2025-05-19, Sanders and Kleinhenz'],
    ['sowers-2019-thermal-mining-niac.md', 'sowers-2019-thermal-mining-niac-report.md',
      'NIAC Phase I final report, grant 80NSSC19K0964'],
  ];
  // Rows whose disposition or block the brief premises P1/P2 placed differently at first write.
  // rev 2, reason leads the basis. See "The premise check" in step2_engineer_dispositions.md.
  const REV2 = new Map([
    ['473486main-iss-atcs-overview.md', 'rev2: P1/P2 placed this uncontested; the exact-name rule sees no twin, the normalized-key twin exists and differs'],
    ['bea-depreciation-rates.md', 'rev2: P1/P2 placed this uncontested; the exact-name rule sees no twin, the normalized-key twin exists and differs'],
    ['ieee-2022-paper-sh-tcs-architecture-and-technical-challenges-update.md', 'rev2: P1/P2 placed this uncontested; the exact-name rule sees no twin, the normalized-key twin exists and differs'],
    ['barro-2004-economic-growth-textbook.md', 'rev2: P2 called this genuinely new; measured a de-referencing descendant and lsei wins'],
    ['falcon-heavy-wikipedia.md', 'rev2: P2 called this genuinely new; measured a de-referencing descendant and lsei wins'],
  ]);

  // ---- LEVEL 2B, oracle/NAMING.md section 7. HAND-ADJUDICATED, declared as data. ----
  // An agency or grant number printed in the artifact and issued by the body that published or
  // funded it. Clause (d). These are read off the file's own citation block by eye and recorded
  // here rather than regexed, because deciding that a printed string IS the issuing body's
  // identifier for THIS document is a judgement, and a regex that guesses it wrong mints a
  // confirmation. Every entry below is quoted from the block it came from; see
  // step2_engineer_merge.md section 3 for the evidence line per row.
  // Uppercased and internal whitespace removed, per section 7.
  const L2B = new Map([
    ['colozza-2010-solar-lunar-oxygen.md',            'NASA/TM-2010-216219'],
    ['kerslake-2007-lunar-surface-power-transfer.md',  'NASA/TM-2007-215041'],
    ['metzger-2021-aqua-factorem.md',                  '80NSSC20K1022'],
    ['esri-2016-japan-high-growth-economic-plans.md',  'ESRI-RESEARCH-NOTE-27'],
    ['otsu-2007-neoclassical-postwar-japan.md',        'IMES-DP-2007-E-1'],
    ['luxembourg-2017-space-resources-law.md',         'MEMORIAL-A-674-2017'],
    ['un-1967-outer-space-treaty.md',                  'UNGA-RES-2222-XXI'],
    ['un-1972-liability-convention-space-objects.md',  'UNGA-RES-2777-XXVI'],
    ['un-1979-moon-agreement.md',                      'UNGA-RES-34-68'],
    ['us-congress-2015-commercial-space-launch-act.md', 'PUB-L-114-90'],
    ['spear-1999-decoding-tps-dna.md',                 'HBR-REPRINT-99509'],
    ['nasa-2025-moon-to-mars-architecture-add-revc.md', 'NASA/TP-20250010956'],
    ['nasa-moon-to-mars-doc.md',                        'NASA/TP-20250010956'],
    ['kiyota-2013-import-quota-removal.md',            'RIETI-DP-13-E-093'],
  ]);

  // ---- LEVEL 2A CORRECTION, routed to me this wave and confirmed against the source. ----
  // kiyota-2013's recorded level-2A key `ier.hit-u.ac.jp/primced/e-index.html` is the PRIMCED
  // research PROJECT index page, not an address of this paper. It carries a path, so clause (a)
  // passes it, and only one union key holds it, so clause (c) never fires -- the bad key survived
  // both guards. The document's own address is in this corpus's own ledger,
  // _intake/japanese-miracle/fa/FA1-source-list.md entry 10.
  const L2A_FIX = new Map([
    ['kiyota-2013-import-quota-removal.md', 'rieti.go.jp/en/publications/summary/13110004.html'],
  ]);

  // ---- L0 ADJUDICATION, consumed from The Space Resources Engineer (W2-4). ----
  // He owns the five L0|none rows. Three keep L0 or resolve by rule from their own citation
  // block. TWO carry no citation block at all, and he WROTE one for each, to be inserted at
  // landing. Their keys are therefore properties of the LANDED file, not of the source bytes,
  // and this instrument cannot derive them from the source. Recorded as data, sourced to
  // cr_scratch/step2_space_resources_engineer_l0.md and his relay of 2026-08-28.
  const L0_ADJ = new Map([
    ['falcon-heavy-wikipedia.md', ['L2A|en.wikipedia.org/wiki/Falcon_Heavy', 'en.wikipedia.org/wiki/Falcon_Heavy']],
    ['rostami2018-figures.md',    ['L3|rostami|2018|lunar-tunnel-boring-machines', '']],
  ]);

  // ---- `also` CORRECTION, routed to me this wave. ----
  // metzger-autry-2023 is a landing-pad cost paper with a construction-methods trade study: it is
  // logistics (primary), ISRU (already recorded), and space economics. It is the first real
  // instance of step2_engineer_taxonomy.md section 5's own warning -- "a source needing three
  // homes is evidence the taxonomy is wrong" -- and it is recorded as one. The taxonomy file
  // itself is not in my write set this wave; this override is the auditable equivalent and the
  // taxonomy edit is routed in `## Not mine`.
  const ALSO_FIX = new Map([
    ['metzger-autry-2023-lunar-landing-pads.md', 'isru-processing;space-economy-and-markets'],
  ]);

  // ---- taxonomy: the index-tsv fenced block of step2_engineer_taxonomy.md ----
  const taxoText = slurp(TAXO);
  const fence = taxoText.match(/[`]{3}index-tsv\r?\n([\s\S]*?)\r?\n[`]{3}/);
  if (!fence) { console.error('FATAL: no index-tsv fence in ' + TAXO); process.exit(3); }
  const taxo = new Map();
  const tlines = fence[1].split(/\r?\n/).filter(l => l.length);
  const thdr = tlines.shift().split('\t');
  if (thdr.join(',') !== 'path,primary,also,field') { console.error('FATAL: taxonomy header ' + thdr.join(',')); process.exit(3); }
  for (const l of tlines) {
    const c = l.split('\t');
    taxo.set(c[0].split('/').pop(), { folder: c[1], also: c[2] || '', field: c[3] });
  }

  // ---- superseded-duplicates: the six files Step 0 dropped, by content hash ----
  const supByHash = new Map();
  for (const f of fs.readdirSync(SUPDIR).sort()) supByHash.set(sha(slurpBin(path.join(SUPDIR, f))), f);

  // ---- corpora ----
  const aF = walk(A_DIR), bF = walk(B_DIR);
  const aM = new Map(), bM = new Map();
  for (const f of aF) aM.set(normalize(f), f);
  for (const f of bF) bM.set(normalize(f), f);
  const keys = [...new Set([...aM.keys(), ...bM.keys()])].sort();

  // ---- per-key identity, bytes, pair detection ----
  const RANK = { doi: 2, url: 1, none: 0 };
  const rec = new Map();
  for (const k of keys) {
    const ap = aM.get(k), bp = bM.get(k);
    const aBuf = ap ? slurpBin(ap) : null, bBuf = bp ? slurpBin(bp) : null;
    const aTxt = aBuf ? aBuf.toString('utf8') : null, bTxt = bBuf ? bBuf.toString('utf8') : null;
    const rA = aTxt !== null ? identify(citationBlock(aTxt).block) : null;
    const rB = bTxt !== null ? identify(citationBlock(bTxt).block) : null;
    let r, from;
    if (rA && rB) { if (RANK[rB.kind] > RANK[rA.kind]) { r = rB; from = 'intake'; } else { r = rA; from = 'lsei'; } }
    else if (rA) { r = rA; from = 'lsei'; } else { r = rB; from = 'intake'; }
    // The BYTE SOURCE is the copy whose text lands. lsei wins where both hold the key.
    const srcTxt = aTxt !== null ? aTxt : bTxt;
    rec.set(k, {
      k, ap, bp, aTxt, bTxt,
      aH: aBuf ? sha(aBuf) : null, bH: bBuf ? sha(bBuf) : null,
      corpus: ap && bp ? 'both' : ap ? 'lsei' : 'intake',
      id: r.id, kind: r.kind, from,
      srcBlock: citationBlock(srcTxt).block, srcHeader: citationBlock(srcTxt).header
    });
  }

  // ---- level-3 dedup key. THE VARIANCE IS CLOSED. oracle/NAMING.md section 7 now states
  // "Read from the file's ## Citation block", so the filename derivation below is no longer the
  // rule; it is the fallback for a file that has no block to read. clusters.js RULE E was the
  // variance and section 7 decided against it.
  function l3name(k) {
    const t = k.replace(/\.md$/, '').split('-');
    const i = t.findIndex(x => /^(19|20)\d{2}$/.test(x));
    if (i < 1) return null;
    return t.slice(0, i).join('-') + '|' + t[i] + '|' + t.slice(i + 1, i + 7).join('-');
  }

  // Section 7 level 3: "normalized lead-author or issuer surname; four-digit year; first six
  // words of the title, lowercased, stopwords removed." Read from the citation block.
  const STOP = new Set(['a', 'an', 'the', 'of', 'for', 'and', 'on', 'in', 'to', 'at', 'by',
    'from', 'with', 'into', 'its', 'as', 'is', 'that', 'this']);
  function l3cite(block, k) {
    if (block === null) return null;
    const flat = block.replace(/\s+/g, ' ').trim();
    // year: the first four-digit year in the block, which is the citation's date position
    const ym = flat.match(/\((\d{4})[a-z]?[,)]/) || flat.match(/\b(19|20)(\d{2})\b/);
    const year = ym ? (ym[1].length === 4 ? ym[1] : ym[1] + ym[2]) : null;
    // identity: the text before the first "(" -- APA puts author or issuer there. Take the
    // leading surname (first comma-delimited token of the first author), normalized.
    let head = flat.split('(')[0].replace(/^[*_\s]+/, '').trim();
    if (!head) return null;
    let ident = head.split(',')[0].trim();
    // an issuer written as a full body name keeps its words; a personal surname is one token
    ident = ident.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (!ident) return null;
    // title: the italicised or post-date sentence. Take the text after the first ")." or ") "
    const after = flat.slice(flat.indexOf(')') + 1).replace(/^[.\s]+/, '');
    const title = after.split(/[.[]/)[0].toLowerCase()
      .replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/)
      .filter(w => w && !STOP.has(w)).slice(0, 6).join('-');
    if (!year || !title) return null;
    return ident + '|' + year + '|' + title;
  }

  // ---- CLAUSE (c), PASS 1: which level-2A strings are disqualified as keys.
  // Section 7 clause (c): "any level-2A or level-2B identifier held by more than one union key
  // drops to candidate and goes to a person." Read literally, no 2A or 2B key could ever confirm
  // anything, because confirming a pair REQUIRES two keys to hold one string -- every
  // confirmation would refute itself. Section 7's own worked example settles the reading:
  // sowers-2019's NIAC pair "is confirmable ONLY this way ... grant 80NSSC19K0964 printed in both
  // members", a group of exactly two. So: a group of 2 confirms; a group of 3 or more is a
  // candidate and goes to a person. That is also the case section 7 narrates -- it "over-merged
  // once in six on exactly that" -- and that group has three members.
  // A disqualified string is not a key for ANY of its holders; each falls to the next level.
  const url2a = new Map();
  for (const r of rec.values()) {
    const u = L2A_FIX.has(r.k) ? L2A_FIX.get(r.k) : (r.kind === 'url' ? r.id : null);
    if (!u) continue;
    if (!url2a.has(u)) url2a.set(u, []); url2a.get(u).push(r.k);
  }
  const DISQ_2A = new Set([...url2a].filter(([, v]) => v.length >= 3).map(([u]) => u));

  // ---- PASS 2: the dedup key per union key, at the highest level section 7 gives it.
  const dkOf = new Map(), lvlOf = new Map();
  for (const r of rec.values()) {
    const fix2a = L2A_FIX.get(r.k);
    if (r.kind === 'doi' && !fix2a) { dkOf.set(r.k, 'L1|' + r.id); lvlOf.set(r.k, '1'); continue; }
    const u = fix2a || (r.kind === 'url' ? r.id : null);
    if (u && !DISQ_2A.has(u)) { dkOf.set(r.k, 'L2A|' + u); lvlOf.set(r.k, '2A'); continue; }
    if (L2B.has(r.k)) { dkOf.set(r.k, 'L2B|' + L2B.get(r.k)); lvlOf.set(r.k, '2B'); continue; }
    const c3 = l3cite(r.srcBlock, r.k);
    if (c3) { dkOf.set(r.k, 'L3|' + c3); lvlOf.set(r.k, '3'); continue; }
    const n3 = l3name(r.k);
    if (n3) { dkOf.set(r.k, 'L3-NAME|' + n3); lvlOf.set(r.k, '3-name'); continue; }
    dkOf.set(r.k, 'L0|none'); lvlOf.set(r.k, '0');
  }

  // ---- same-source pairs: dedup-key groups of exactly 2, plus the two hand-confirmed level-3
  // pairs. A group of 3+ was disqualified above and never reaches here, which is why the
  // FALSE_MERGE hand input that used to sit in this file is gone: clause (c) now does that work
  // by rule. Its removal is verified in step2_engineer_merge.md section 4 by running with and
  // without it and diffing the table.
  const groups = new Map();
  for (const r of rec.values()) {
    const g = dkOf.get(r.k);
    if (/^L0\|/.test(g)) continue;
    if (!groups.has(g)) groups.set(g, []); groups.get(g).push(r.k);
  }
  // A LEVEL-3 GROUP NEVER CONFIRMS A PAIR. Section 7: "A level-3 match is a candidate duplicate,
  // never a confirmed one. It is reported for a person to resolve and the merge does not act on
  // it." Only L1, L2A and L2B confirm, and only at group size exactly 2.
  //
  // THIS RULE WAS NOT DEFENSIVE. The first run of this code did confirm level-3 groups, and it
  // immediately produced a FALSE MERGE: lsic-2026-newsletter-august.md and
  // lsic-newsletter-2026-june-final.md, the August and June 2026 issues of one serial (Vol 7
  // Issue 4 and Vol 7 Issue 3), grouped on the truncated title key `lsic-newsletter-vol` because
  // "first six words of the title" cuts before the issue number. Two different documents, one
  // key, and the larger would have deleted the smaller. Measured, not hypothesised -- it is in
  // step2_engineer_merge.md section 4 with the run that produced it.
  const CONFIRMS = /^(L1|L2A|L2B)\|/;
  const pairs = [];
  const seenPair = new Set();
  const l3Candidates = [];
  for (const [g, mem] of groups) {
    if (mem.length !== 2) continue;
    if (!CONFIRMS.test(g)) { l3Candidates.push({ key: g, members: mem.slice().sort() }); continue; }
    pairs.push({ level: g.split('|')[0].slice(1), id: g.split('|').slice(1).join('|'), members: mem.slice().sort() });
    seenPair.add(mem.slice().sort().join('~'));
  }
  // The two level-3 pairs a person DID confirm, by venue+date+grant number, at 2.12. They are
  // hand inputs precisely because section 7 forbids the instrument from making this call.
  for (const [x, y, ev] of LEVEL3_PAIRS) {
    if (seenPair.has([x, y].sort().join('~'))) continue;
    pairs.push({ level: '3-hand', id: ev, members: [x, y].sort() });
    seenPair.add([x, y].sort().join('~'));
  }
  const l3Open = l3Candidates.filter(c => !seenPair.has(c.members.join('~')));
  pairs.sort((p, q) => p.members[0] < q.members[0] ? -1 : 1);
  const pairOf = new Map();
  pairs.forEach((p, i) => { p.tag = 'DUP-' + String(i + 1).padStart(2, '0'); for (const m of p.members) pairOf.set(m, p); });

  // ---- PAIR PRIMARY. The author's rule, relayed 2026-08-28, in order:
  //   1. a decision recorded in cr_scratch/step0_dedup_decisions.md wins (content, not size);
  //   2. else if the two members are byte-identical, take either;
  //   3. else take the larger file.
  // Step 0's six decisions were executed by DELETING the loser from lsei/literature, so none of
  // those six survives as two union keys and rule 1 reaches none of the pairs below. Measured,
  // not assumed. Rule 3 decides all of them; the rule that fired is recorded per row.
  const STEP0_KEEP = new Map();   // rule 1 lookup, empty by measurement, kept so the rule is live
  for (const p of pairs) {
    const info = p.members.map(k => {
      const r = rec.get(k);
      const buf = fs.readFileSync(r.ap || r.bp);
      return { k, size: buf.length, h: sha(buf) };
    });
    const kept = info.find(i => STEP0_KEEP.has(i.k));
    if (kept) { p.primary = kept.k; p.rule = '1 step0_dedup_decisions.md'; }
    else if (info[0].h === info[1].h) { p.primary = info[0].k; p.rule = '2 byte-identical'; }
    else { info.sort((a, b) => b.size - a.size); p.primary = info[0].k; p.rule = '3 larger file'; }
    p.sizes = Object.fromEntries(info.map(i => [i.k, i.size]));
    p.secondary = p.members.find(k => k !== p.primary);
  }

  // ---- review routing. NOT the field partition, and the two disagree deliberately.
  // step2_engineer_taxonomy.md section 2.4: the FIELD split is 8 lunar / 3 economics, decided by
  // between-field cosine; the REVIEW split is 7 / 4, decided by who can judge a placement.
  // space-economy-and-markets is field=lunar and review=manager-econ. Conflating them is the same
  // class of error as conflating the folder with the field. This column exists so each reviewer can
  // cut their own half of the table without reading the other's.
  const REVIEW_ECON = new Set(['growth-theory', 'development-and-industrial-policy',
    'organization-and-production-systems', 'space-economy-and-markets']);

  // COLUMN SPLIT, Wave 2 ruling 1. Column 6 `primary_secondary` carried two contracts under one
  // name and is split into two columns, which takes the count 17 -> 18. STATE IT SO NOBODY
  // DIFFERENCES IT.
  //   byte_source   -- WHICH CORPUS COPY SUPPLIES THE BYTES.
  //   pair_primary  -- WHICH MEMBER OF A SAME-SOURCE PAIR IS THE ONE THAT LANDS.
  const HDRS = ['block', 'key', 'source_path', 'target_path', 'disposition', 'byte_source',
    'pair_primary', 'pair_id', 'pair_role', 'target_folder', 'field_label', 'review_owner',
    'also', 'dedup_key', 'identifier', 'id_in_source', 'rev', 'basis'];
  const out = [];
  const tally = {};
  for (const k of keys) {
    const r = rec.get(k);
    const tx = taxo.get(k);
    if (!tx) { console.error('FATAL: no taxonomy row for ' + k); process.exit(4); }

    let disp, ps, basis, block;
    const differs = r.corpus === 'both' && r.aH !== r.bH;
    if (r.corpus === 'lsei') ps = 'sole-lsei';
    else if (r.corpus === 'intake') ps = 'sole-intake';
    else if (!differs) ps = 'both-identical';
    else ps = 'lsei-primary';

    if (differs && supByHash.has(r.bH)) {
      disp = 'LIFT-LSEI-STEP0';
      basis = 'intake copy is byte-identical (sha256) to _intake/superseded-duplicates/' + supByHash.get(r.bH)
        + ', the copy Step 0 adjudicated and dropped; step0_dedup_decisions.md. This is a resolved conflict re-arriving, not a new one. SIZE MUST NOT BREAK THIS TIE.';
    } else if (differs) {
      const aL = new Set(r.aTxt.split(/\r?\n/)), bL = new Set(r.bTxt.split(/\r?\n/));
      const bOnly = [...bL].filter(x => !aL.has(x)), aOnly = [...aL].filter(x => !bL.has(x));
      const refs = bOnly.filter(x => /cr_scratch\//.test(x)).length;
      disp = 'LIFT-LSEI-SCRUB';
      basis = 'both copies differ; ' + aOnly.length + ' lines only in lsei, ' + bOnly.length + ' only in intake, of which '
        + refs + ' cite cr_scratch/ paths absent from this repository. The lsei copy is the de-referenced descendant; importing the intake copy reintroduces dangling references.';
    } else if (pairOf.has(k)) {
      const p = pairOf.get(k);
      disp = 'HOLD-PAIR';
      const win = p.primary === k;
      basis = 'same-source pair ' + p.tag + ' confirmed at oracle/NAMING.md section 7 level ' + p.level
        + ' on [' + p.id + ']. ONE MEMBER LANDS, per the author 2026-08-28: a recorded step-0 decision wins, '
        + 'else byte-identical takes either, else the larger file. Decided by rule ' + p.rule + ': '
        + p.primary + ' (' + p.sizes[p.primary] + ' bytes) over ' + p.secondary + ' ('
        + p.sizes[p.secondary] + ' bytes). This row is the ' + (win ? 'PRIMARY and it lands.' : 'SECONDARY and it does not land.');
    } else if (FALSE_MERGE.has(k)) {
      disp = 'HOLD-FALSEMERGE';
      basis = 'holds the programme landing page nasa.gov/moontomarsarchitecture, which THREE union keys hold; '
        + 'section 7 clause (c) disqualifies it as a key for all three, so this row falls to its own level-3 key '
        + 'and no longer collides with anything. It is a four-page ACR25 white paper, a different document from the '
        + 'two Architecture Definition Document summaries, which fall to their shared level-2B NASA/TP-20250010956. '
        + 'The label is retained; the pair suppression it used to perform is now done by rule and not by exception. IT LANDS.';
    } else if (r.kind === 'none') {
      disp = 'HOLD-NOID';
      basis = 'no identifier at oracle/NAMING.md section 7 level 1 or level 2A; key recorded at ' + lvlOf.get(k)
        + '. THIS IS NOT A REASON TO WITHHOLD THE FILE (author, 2026-08-28): a summary with no DOI is still a summary. '
        + 'The absent identifier is recorded as an open field, not omitted. IT LANDS.';
    } else {
      disp = 'LIFT';
      basis = 'identifier confirmed at level ' + (r.kind === 'doi' ? 1 : 2) + '.';
    }
    if (disp === 'LIFT') {
      if (r.corpus === 'both') { disp = 'LIFT-IDENTICAL'; basis = 'both corpora hold this key and the bytes are equal (sha256); ' + basis + ' Nothing to adjudicate.'; }
      else basis = r.corpus + '-only key, ' + basis;
    }

    block = /HOLD|SCRUB|STEP0/.test(disp) ? 2 : 1;

    const p = pairOf.get(k);
    // W2-4's adjudicated keys for the two rows whose citation block is written AT LANDING.
    const dk = L0_ADJ.has(k) ? L0_ADJ.get(k)[0] : dkOf.get(k);
    const idOverride = L0_ADJ.has(k) ? L0_ADJ.get(k)[1] : null;
    // rev is append-only. The 16 pair members bump because their OUTCOME changed after first
    // write: Wave 1 landed both members and deferred the primary to a DUP-xx row; the author
    // ruled on 2026-08-28 that one member is picked and the other does not land. The disposition
    // string is unchanged, which is exactly the silent revision MRG-11 exists to catch, so the
    // bump is recorded rather than skipped on the technicality that the cell still reads
    // HOLD-PAIR. This RAISES the churn figure and I am not adjusting the definition to keep it
    // under a threshold -- see step2_engineer_merge.md section 5.
    const rev = (REV2.has(k) || pairOf.has(k)) ? 2 : 1;
    if (REV2.has(k)) basis = REV2.get(k) + '. ' + basis;
    else if (pairOf.has(k)) basis = 'rev2: Wave 1 landed both pair members and deferred the primary to 2.16; '
      + 'the author ruled 2026-08-28 that one member is picked and the secondary does not land. ' + basis;

    // The byte source and the identifier source are not always the same copy: identify() takes the
    // identifier from whichever copy resolves higher, and the bytes always come from lsei where both
    // hold the key. Where they part, the LANDED file will not contain the identifier this row
    // records, and the merge owes a citation repair. Measured, not assumed.
    const srcPath = (r.ap || r.bp);
    const idInSrc = !r.id ? 'n/a'
      : (r.corpus === 'both' ? r.aTxt : (r.aTxt || r.bTxt)).toLowerCase().includes(r.id.toLowerCase()) ? 'yes' : 'NO';
    if (idInSrc === 'NO') {
      const other = r.corpus === 'both' ? (r.bTxt || '') : '';
      basis += ' CITATION REPAIR OWED: the identifier above is absent from the byte source and present only in the '
        + (other.toLowerCase().includes(r.id.toLowerCase()) ? 'intake' : 'other') + ' copy, which this disposition does not import.'
        + ' Wave 2 lifts the bytes and writes the canonical DOI line into the landed file. Do not drop the identifier and do not import the other copy.';
    }
    const targetPath = 'literature/' + tx.folder + '/' + k;
    if (targetPath.length > 120) console.error('# LONG TARGET (' + targetPath.length + ') ' + targetPath);

    // pair_primary: `primary` / `secondary` for the 16 pair members, `n/a` for the other 160.
    // The closed set retains `unadjudicated` although it has zero members today, because a closed
    // set with a missing member routes an author into the wrong member silently -- the same
    // reasoning that admitted `intake-primary` to byte_source with zero members.
    const pairPrimary = !p ? 'n/a' : (p.primary === k ? 'primary' : 'secondary');
    const alsoVal = ALSO_FIX.has(k) ? ALSO_FIX.get(k) : tx.also;

    out.push([block, k, srcPath.split(path.sep).join('/'),
      targetPath, disp, ps, pairPrimary,
      p ? p.tag : '', p ? 'dup-member' : '', tx.folder, tx.field,
      REVIEW_ECON.has(tx.folder) ? 'manager-econ' : 'space-resources',
      alsoVal, dk, idOverride !== null ? idOverride : (r.id || ''), idInSrc, rev, basis].join('\t'));
    tally[disp] = (tally[disp] || 0) + 1;
  }

  out.sort((x, y) => { const a = x.split('\t'), b = y.split('\t'); return a[0] !== b[0] ? a[0] - b[0] : (a[1] < b[1] ? -1 : 1); });
  const digest = sha(Buffer.from(READ.slice().sort().join('\n'), 'utf8'));
  const b2 = out.filter(l => l[0] === '2');
  const churn = b2.filter(l => l.split('\t')[HDRS.indexOf('rev')] === '2').length;
  const repairs = out.filter(l => l.split('\t')[HDRS.indexOf('id_in_source')] === 'NO');
  const maxPath = Math.max(...out.map(l => l.split('\t')[3].length));
  const hdr = [
    '# merge_plan.tsv -- Step 2 Wave 1. The Engineer. The disposition table the Wave 2 merge executes from.',
    '# One row per union key. Block 1 first (uncontested, stable by construction), then Block 2 (contested).',
    '# Generated: node tools/merge_identity.js --plan lsei/literature _intake/japanese-miracle/lit \\',
    '#              cr_scratch/step2_engineer_taxonomy.md _intake/superseded-duplicates cr_scratch/merge_plan.tsv',
    '# THE MERGE GLOB IS *.md, NEVER *. lit/ holds 115 non-.md siblings and a bare * sweeps them into retrieval.',
    '# COLUMN COUNT IS 18. It was 17 in Wave 1; column 6 split in two. Do not difference the counts.',
    '# byte_source names WHICH CORPUS COPY SUPPLIES THE BYTES, and nothing else.',
    '#   sole-lsei | sole-intake | both-identical | lsei-primary | intake-primary',
    '#   intake-primary is admitted with zero members today: a closed set missing a member routes an',
    '#   author into the wrong member silently.',
    '# pair_primary names WHICH MEMBER OF A SAME-SOURCE PAIR IS THE ONE THAT LANDS.',
    '#   primary | secondary | unadjudicated | n/a   -- n/a for the 160 rows in no pair.',
    '#   THE SECONDARY DOES NOT LAND. The author ruled 2026-08-28: when two summaries are the same',
    '#   source, pick one. In order: a decision recorded in step0_dedup_decisions.md wins; else if the',
    '#   two are byte-identical take either; else take the larger file. The rule that fired is in basis.',
    '# EVERY VALUE IN disposition IS A LANDING MODE, NOT A GATE. No file is withheld from the corpus',
    '#   for a metadata reason (author, 2026-08-28). A HOLD-* label says HOW a row lands. The only rows',
    '#   that do not land are the 8 pair secondaries, and they are named by pair_primary=secondary.',
    '# legend disposition = LIFT LIFT-IDENTICAL LIFT-LSEI-SCRUB LIFT-LSEI-STEP0 HOLD-NOID HOLD-PAIR HOLD-FALSEMERGE',
    '# legend byte_source = sole-lsei sole-intake both-identical lsei-primary intake-primary',
    '# legend pair_primary = primary secondary unadjudicated n/a',
    '# review_owner routes the two reviewers and is NOT the field partition. The FIELD split is 8 lunar /',
    '#   3 economics, decided by between-field cosine; the REVIEW split is 7 / 4, decided by who can judge',
    '#   a placement. space-economy-and-markets is field=lunar and review=manager-econ, deliberately; see',
    '#   step2_engineer_taxonomy.md section 2.4. Each reviewer cuts their own half on column 11 alone.',
    '# pair_role is the same-source-pair role: dup-member, or empty. Primary designation inside a pair is',
    '#   deferred to the DUP-xx register row. This table never adjudicates a pair.',
    '# dedup_key levels, oracle/NAMING.md section 7 as amended at 2.20:',
    '#   L1      DOI, not a 10.13140/ mirror mint (clause b)',
    '#   L2A     publisher article URL, must carry a path (clause a)',
    '#   L2B     agency or grant number printed in the artifact (clause d), hand-read, declared in this file',
    '#   L3      (identity, year, first six title words) READ FROM THE ## Citation BLOCK -- section 7 normative',
    '#   L3-NAME same tuple derived from the filename. Fallback ONLY where there is no block to read.',
    '#   L0      no key derivable at any level.',
    '#   THE WAVE-1 VARIANCE IS CLOSED. L3 was filename-derived (clusters.js RULE E); section 7 now says',
    '#   read the citation block, and it does. L3-PENDING no longer appears.',
    '#   CLAUSE (c): a level-2A or 2B string held by 3+ union keys is disqualified as a key for ALL of',
    '#   its holders and each falls to the next level. A group of exactly 2 confirms a pair. Read',
    '#   literally, "more than one" would make every 2A/2B confirmation self-refuting; section 7 own',
    '#   worked example (sowers-2019, grant printed in BOTH members) forces the group-of-2 reading.',
    '# rev is append-only. A row whose disposition, byte_source, target_folder or LANDING OUTCOME changes',
    '#   write bumps rev and the reason leads its basis.',
    '# read-digest sha256 over sorted path\\tsize\\tmtimeMs = ' + digest,
    '# files read = ' + READ.length,
    '# inputs = ' + [A_DIR, B_DIR, TAXO, SUPDIR].join('  '),
    '# rows = ' + out.length + '  block1 = ' + out.filter(l => l[0] === '1').length + '  block2 = ' + b2.length,
    '# disposition tally = ' + JSON.stringify(tally),
    '# churn = block2 rows with rev>1 / block2 rows = ' + churn + ' / ' + b2.length + ' = ' + (100 * churn / b2.length).toFixed(2) + '%',
    '# id_in_source=NO (citation repair owed at Wave 2) = ' + repairs.length
      + (repairs.length ? ': ' + repairs.map(l => l.split('\t')[1]).join(' ') : ''),
    '# longest target_path = ' + maxPath + ' chars, repo-relative; NAMING.md section 8 ceiling is 259 ABSOLUTE',
  ];
  fs.writeFileSync(POUT, hdr.join('\n') + '\n' + HDRS.join('\t') + '\n' + out.join('\n') + '\n');

  console.error('# PLAN inputs       ' + [A_DIR, B_DIR, TAXO, SUPDIR].join('  '));
  console.error('# files read        ' + READ.length);
  console.error('# read-digest       ' + digest);
  console.error('# union keys        ' + keys.length);
  console.error('# block 1           ' + out.filter(l => l[0] === '1').length);
  console.error('# block 2           ' + b2.length);
  console.error('# dispositions      ' + JSON.stringify(tally));
  console.error('# same-source pairs ' + pairs.length + '  ' + pairs.map(p => p.tag + ':L' + p.level).join(' '));
  console.error('# L3 candidate groups (never confirmed by rule, section 7): ' + l3Open.length);
  for (const c of l3Open) console.error('#   CANDIDATE ' + c.key + '  ->  ' + c.members.join('  '));
  console.error('# churn             ' + churn + ' / ' + b2.length + ' = ' + (100 * churn / b2.length).toFixed(2) + '%');
  process.exit(0);
}

// w2-1 The Engineer -- stage mode fragment for tools/merge_identity.js
// ============================================================================
// STAGE MODE -- Step 2.5. Builds the merge into a staging tree from the COMMITTED
// cr_scratch/merge_plan.tsv, so the stage provably executes the table and nothing else.
//   node merge_identity.js --stage <planTsv> <stageDir>
// Copies, never moves. Reads only source_path values named in the table.
// ============================================================================
if (process.argv[2] === '--stage') {
  const crypto = require('crypto');
  const PLAN_TSV = process.argv[3], STAGE = process.argv[4];
  if (!PLAN_TSV || !STAGE) {
    console.error('usage: node merge_identity.js --stage <planTsv> <stageDir>');
    process.exit(2);
  }
  const READ = [];
  const sha = b => crypto.createHash('sha256').update(b).digest('hex');
  function slurpBin(p) {
    const st = fs.statSync(p);
    READ.push(p.replace(/\\/g, '/') + '\t' + st.size + '\t' + st.mtimeMs);
    return fs.readFileSync(p);
  }

  // ---- HAND INPUTS CONSUMED FROM OTHER SEATS. Declared as data, sourced by file. ----
  // The Space Resources Engineer (W2-4) adjudicated the five L0|none rows and wrote two citation
  // blocks for the two files that carry none. cr_scratch/step2_space_resources_engineer_l0.md and
  // cr_scratch/relay/w2-4_to_engineer_L0_cells_and_citation_blocks.md. His text, not mine.
  const CITE_INJECT = new Map([
    ['rostami2018-figures.md',
`## Citation

Rostami, J., Dreyer, C., & Blair, B. (2018). Lunar tunnel boring machines. *Earth and Space 2018*
(ASCE conference proceedings), pp. 240-252.

Publisher URL: none in this artifact.

*Note: this is a figures-and-tables-only companion summary, produced from visual analysis of the
rendered PDF pages of the paper summarized at \`rostami2018.md\`. No DOI is printed in this artifact.
The DOI carried by \`rostami2018.md\` is deliberately not copied here: the two files are two summaries
of one paper rather than a duplicate pair, and a shared level-1 DOI would resolve them as one
document, which the merge acts on. The pair is left to meet at level 3, where NAMING.md section 7
makes it a candidate for a person. Citation block written by The Space Resources Engineer,
2026-08-28, from the artifact's own printed header.*
`],
    ['falcon-heavy-wikipedia.md',
`## Citation

Wikipedia. (n.d.). *Falcon Heavy*. Retrieved 2026-07-19, from
https://en.wikipedia.org/wiki/Falcon_Heavy

Publisher URL: https://en.wikipedia.org/wiki/Falcon_Heavy

*Note: tertiary reference (encyclopedia), cross-checkable to primary SpaceX and NASA figures. No
publication year is printed; the retrieval date is the only date the artifact carries. The list
prices in this summary are commercial sticker prices, not SpaceX internal cost, and the
marginal-cost analysis they feed is tracked separately. Citation block written by The Space
Resources Engineer, 2026-08-28, from the artifact's own Source / Retrieved / Type / Standing-caveat
stanza. "Wikipedia" is used as the issuer; the artifact prints the publication name, not a byline.*
`],
  ]);

  // Content error found by The Fact-Checker, confirmed and dated by The Space Resources Engineer
  // (his N-3). The file refutes itself twice within two lines. Fixed on the LANDED copy only;
  // lsei/ is read-only for this project.
  const CONTENT_FIX = new Map([
    ['falcon-heavy-wikipedia.md', [['Maiden flight 2026-02-06', 'Maiden flight 2018-02-06']]],
  ]);

  // The one citation repair the table itself declares, id_in_source=NO. The identifier is printed
  // only in the intake copy, which this disposition does not import; the bytes come from lsei and
  // the canonical DOI line is written in. Do not import the other copy.
  const DOI_REPAIR = new Map([
    ['azami-2024-lunar-manufacturing-review.md', '10.48550/arxiv.2408.05823'],
  ]);

  // ---- read the table ----
  const planBuf = slurpBin(PLAN_TSV);
  const planLines = planBuf.toString('utf8').split('\n').filter(l => l.length && !l.startsWith('#'));
  const H = planLines.shift().split('\t');
  const col = n => { const i = H.indexOf(n); if (i < 0) { console.error('FATAL: no column ' + n); process.exit(3); } return i; };
  const C = { key: col('key'), src: col('source_path'), tgt: col('target_path'), disp: col('disposition'),
    bs: col('byte_source'), pp: col('pair_primary'), pid: col('pair_id'), folder: col('target_folder'),
    field: col('field_label'), also: col('also'), dk: col('dedup_key'), id: col('identifier'),
    ids: col('id_in_source'), rev: col('rev') };
  const rows = planLines.map(l => l.split('\t'));
  if (H.length !== 18) { console.error('FATAL: expected 18 columns, got ' + H.length); process.exit(3); }

  // ---- what lands ----
  const landing = rows.filter(r => r[C.pp] !== 'secondary');
  const dropped = rows.filter(r => r[C.pp] === 'secondary');
  const primaryOf = new Map();
  for (const r of rows) if (r[C.pid]) {
    if (!primaryOf.has(r[C.pid])) primaryOf.set(r[C.pid], {});
    primaryOf.get(r[C.pid])[r[C.pp]] = r[C.key];
  }

  // ---- build ----
  fs.rmSync(STAGE, { recursive: true, force: true });
  const stageLit = path.join(STAGE, 'literature');
  let byteChanged = [];
  const indexRows = [];
  for (const r of landing) {
    const key = r[C.key];
    const rel = r[C.tgt].replace(/^literature\//, '');
    const dest = path.join(stageLit, rel.split('/').join(path.sep));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const srcBuf = slurpBin(r[C.src]);
    let text = srcBuf.toString('utf8');
    const before = text;
    const notes = [];

    // 1. inject a citation block where the artifact carries none (W2-4's text)
    if (CITE_INJECT.has(key)) {
      const lines = text.split(/\r?\n/);
      let h1 = lines.findIndex(l => /^#\s/.test(l));
      if (h1 < 0) h1 = 0;
      lines.splice(h1 + 1, 0, '', CITE_INJECT.get(key).trimEnd());
      text = lines.join('\n');
      notes.push('citation block written at landing by The Space Resources Engineer (W2-4); the source artifact carries none');
    }
    // 2. content fix
    if (CONTENT_FIX.has(key)) {
      for (const [from, to] of CONTENT_FIX.get(key)) {
        if (!text.includes(from)) { console.error('FATAL: content fix target absent in ' + key + ': ' + from); process.exit(4); }
        text = text.split(from).join(to);
        notes.push('content correction at landing: "' + from + '" -> "' + to + '" (The Fact-Checker; confirmed by W2-4)');
      }
    }
    // 3. canonical DOI line for the one row the table marks id_in_source=NO
    if (DOI_REPAIR.has(key)) {
      const doi = DOI_REPAIR.get(key);
      const line = '- **DOI:** ' + doi;
      const lines = text.split(/\r?\n/);
      const pu = lines.findIndex(l => /^Publisher URL:/i.test(l));
      if (pu < 0) { console.error('FATAL: no Publisher URL line to anchor the DOI repair in ' + key); process.exit(4); }
      lines.splice(pu, 0, line, '');
      text = lines.join('\n');
      notes.push('CITATION REPAIR: the canonical DOI line was written in. ' + doi + ' is printed only in the '
        + 'intake copy, which this disposition does not import; the bytes are the lsei copy. Do not import the other copy.');
    }

    // 4. provenance block, appended to every landed file
    const pid = r[C.pid];
    const prov = ['', '---', '', '## Provenance', '',
      '- **Landed:** Step 2.5, 2026-08-28, by `tools/merge_identity.js --stage`.',
      '- **Source:** `' + r[C.src] + '`',
      '- **Byte source:** ' + r[C.bs],
      '- **Disposition:** ' + r[C.disp] + ' (a landing mode, not a gate)',
      '- **Dedup key:** ' + r[C.dk] + (r[C.id] ? '' : ' — no identifier is recorded for this file; the field is open, not omitted'),
      '- **Field:** ' + r[C.field] + ' · **Folder:** ' + r[C.folder] + (r[C.also] ? ' · **Also:** ' + r[C.also] : ''),
      '- **Plan row rev:** ' + r[C.rev],
    ];
    if (pid) {
      const g = primaryOf.get(pid);
      prov.push('- **Duplicate pair ' + pid + ':** this file is the PRIMARY and it landed. The secondary, `'
        + g.secondary + '`, did not land. Picked under the author rule of 2026-08-28 (a recorded step-0 '
        + 'decision wins, else byte-identical takes either, else the larger file).');
    }
    for (const n of notes) prov.push('- **Note:** ' + n);
    prov.push('');
    text = text.replace(/\s*$/, '\n') + prov.join('\n');

    // Every landed file differs from its source by the appended ## Provenance block, so a
    // whole-file byte comparison is not the assertion anyone wants. What matters is the BODY:
    // the landed text with the provenance block removed must equal the source, except where a
    // repair is recorded. That set is reported separately and it is what MRG-4b should assert on.
    if (notes.length) byteChanged.push({ key: key, notes: notes.slice() });
    fs.writeFileSync(dest, text, 'utf8');
    indexRows.push([r[C.tgt], r[C.folder], r[C.also] || 'none', r[C.field]]);
  }

  // ---- INDEX.tsv, per 2.3: four columns, path / primary / also / field ----
  const idx = ['path\tprimary\talso\tfield'].concat(indexRows.map(x => x.join('\t')));
  fs.writeFileSync(path.join(stageLit, 'INDEX.tsv'), idx.join('\n') + '\n', 'utf8');

  // ---- FIELDS.tsv, pulled forward from 3.7 to 2.5. Two rows of closed values. ----
  const fieldCount = {};
  for (const x of indexRows) fieldCount[x[3]] = (fieldCount[x[3]] || 0) + 1;
  const folders = {};
  for (const x of indexRows) (folders[x[3]] = folders[x[3]] || new Set()).add(x[1]);
  const fld = ['field\tlabel\treview_owner\tfolders\tfiles',
    'lunar\tLunar science, engineering and operations\tspace-resources\t'
      + [...folders.lunar].sort().join(';') + '\t' + fieldCount.lunar,
    'economics\tEconomic growth, industrial policy and market structure\tmanager-econ\t'
      + [...folders.economics].sort().join(';') + '\t' + fieldCount.economics];
  fs.writeFileSync(path.join(stageLit, 'FIELDS.tsv'), fld.join('\n') + '\n', 'utf8');

  // ---- report ----
  const staged = [];
  (function rec(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name); if (e.isDirectory()) rec(p); else staged.push(p); } })(stageLit);
  const mdStaged = staged.filter(p => /\.md$/.test(p));
  const nonMd = staged.filter(p => !/\.md$/.test(p));
  const digest = sha(Buffer.from(READ.slice().sort().join('\n'), 'utf8'));
  console.error('# STAGE            ' + STAGE);
  console.error('# plan rows        ' + rows.length);
  console.error('# landed           ' + landing.length);
  console.error('# not landed       ' + dropped.length + '  (pair secondaries: ' + dropped.map(r => r[C.key]).join(' ') + ')');
  console.error('# .md staged       ' + mdStaged.length);
  console.error('# non-.md staged   ' + nonMd.length + '  ' + nonMd.map(p => path.basename(p)).join(' '));
  console.error('# files read       ' + READ.length);
  console.error('# read-digest      ' + digest);
  console.error('# provenance block appended to all ' + landing.length + ' landed files (every landed file differs from source by that block alone)');
  console.error('# BODY EDITS beyond the provenance block: ' + byteChanged.length + ' landed files');
  for (const b of byteChanged) console.error('#   ' + b.key + ' :: ' + b.notes.join(' | '));
  process.exit(0);
}


// ---- run ----
const CRYPTO = require('crypto');
const RD = [];
const TAB = String.fromCharCode(9);
function stamp(p) { const st = fs.statSync(p); RD.push(p.split(path.sep).join('/') + TAB + st.size + TAB + st.mtimeMs); return p; }
const aFiles = walk(A_DIR), bFiles = walk(B_DIR);
const aMap = new Map(), bMap = new Map();
for (const f of aFiles) { const k = normalize(f); if (aMap.has(k)) console.error('COLLISION A ' + k); aMap.set(k, f); }
for (const f of bFiles) { const k = normalize(f); if (bMap.has(k)) console.error('COLLISION B ' + k); bMap.set(k, f); }
const keys = [...new Set([...aMap.keys(), ...bMap.keys()])].sort();

console.error('# merge_identity.js inputs');
console.error('# A ' + A_DIR + '  files ' + aFiles.length + '  distinct keys ' + aMap.size);
console.error('# B ' + B_DIR + '  files ' + bFiles.length + '  distinct keys ' + bMap.size);
console.error('# union keys ' + keys.length + '  both ' + keys.filter(k => aMap.has(k) && bMap.has(k)).length
  + '  A-only ' + keys.filter(k => aMap.has(k) && !bMap.has(k)).length
  + '  B-only ' + keys.filter(k => !aMap.has(k) && bMap.has(k)).length);

const rows = [['file', 'corpus', 'identifier', 'identifier_kind', 'confidence'].join('\t')];
const recs = [];
for (const k of keys) {
  const inA = aMap.has(k), inB = bMap.has(k);
  const corpus = inA && inB ? 'both' : inA ? 'lsei' : 'intake';
  // Where both corpora hold the key, the identifier is taken from whichever copy resolves at the
  // higher precedence level (NAMING.md section 7: DOI, then article URL, then nothing). Taking
  // the lsei copy by convention loses identifiers: the _intake copy of azami-2024 prints the
  // arXiv DOI and the lsei copy says "DOI: not printed in source".
  const RANK = { doi: 2, url: 1, none: 0 };
  const rA = inA ? identify(citationBlock(fs.readFileSync(stamp(aMap.get(k)), 'utf8')).block) : null;
  const rB = inB ? identify(citationBlock(fs.readFileSync(stamp(bMap.get(k)), 'utf8')).block) : null;
  let r, from;
  if (rA && rB) { if (RANK[rB.kind] > RANK[rA.kind]) { r = rB; from = 'intake'; } else { r = rA; from = 'lsei'; } }
  else if (rA) { r = rA; from = 'lsei'; } else { r = rB; from = 'intake'; }
  let conf = r.conf, note = r.note;
  if (rA && rB && rA.id !== rB.id) {
    note = (note ? note + ';' : '') + 'copies-disagree(from:' + from + ')';
    if (conf === 'high') conf = 'medium';
  }
  const confField = note ? conf + ':' + note : conf;
  rows.push([k, corpus, r.id, r.kind, confField].join('\t'));
  recs.push({ key: k, corpus, id: r.id, kind: r.kind, conf: confField });
}
if (OUT) fs.writeFileSync(OUT, rows.join('\n') + '\n');
else process.stdout.write(rows.join('\n') + '\n');

// ---- summary to stderr ----
const byKind = {}; for (const r of recs) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
console.error('# identifier_kind ' + JSON.stringify(byKind));
const withId = recs.filter(r => r.kind !== 'none');
const distinct = new Set(withId.map(r => r.kind + '|' + r.id));
console.error('# rows ' + recs.length + '  with identifier ' + withId.length + '  distinct identifiers ' + distinct.size);
const dupGroups = {};
for (const r of withId) { const kk = r.kind + '|' + r.id; (dupGroups[kk] = dupGroups[kk] || []).push(r.key); }
const shared = Object.entries(dupGroups).filter(([, v]) => v.length > 1);
console.error('# identifiers held by more than one union key: ' + shared.length
  + '  surplus rows ' + shared.reduce((a, [, v]) => a + v.length - 1, 0));
for (const [kk, v] of shared) console.error('#   ' + kk + '  ->  ' + v.join(' | '));
const noId = recs.filter(r => r.kind === 'none');
console.error('# NO IDENTIFIER (' + noId.length + ') -- flagged for 2.2 (MERGE-3):');
for (const r of noId) console.error('#   ' + r.key + '  [' + r.corpus + ']  ' + r.conf);
console.error('# files read ' + RD.length + '  read-digest sha256 over sorted path/size/mtimeMs = '
  + CRYPTO.createHash('sha256').update(Buffer.from(RD.slice().sort().join(String.fromCharCode(10)), 'utf8')).digest('hex'));
