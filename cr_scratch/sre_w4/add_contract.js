'use strict';
const fs=require('fs');
const contract={
  why:"The exclusions matcher scores a question against the app's own boundary prose (EXCLUSIONS[slug].does + .reason). That prose is the APP'S vocabulary about what the app does not model; a question is the USER'S vocabulary about the world. On cadence-cryogenic-break the two share zero tokens, so the node never fired and the Oracle answered from an off-topic shelf hit. This is oracle/register_schema.md section 4's argument arriving at a second object: match_keys cannot be derived from the app or from the summaries, because it requires knowing how a user phrases a question. Authored by The Space Resources Engineer, 2026-08-28, on the router seat's measured finding.",
  sourced_from:"this file, exclusion_outcomes.assignments[].match_keys. oracle/router/excluded_nodes.js already reads the field and carries it into oracle/router/excluded_nodes.json at build time, and tools/exclusions_match.js already adds the hits to the overlap. Nothing is hand-edited in the generated artifact: a key edit here plus 'node oracle/router/build.js' is the whole change.",
  K1_token_form:"tokenize(k) deep-equals [k], against the retrieval layer's own tokenizer in oracle/retrieval/literature_search.js. All keys pass. This is why the keys read 'he3' and not 'helium-3' (which tokenizes to ['helium'], the trailing 3 falling to the length filter), and 'boil' plus 'boiloff' rather than 'boil-off'.",
  K2_presence:"THE REGISTER'S K2 DOES NOT TRANSFER, and that is a finding rather than an omission. An axis IS its members, so testing a key against the axis's own primaries is sound. An excluded node is not its members: it is a boundary in the app, and four of the ten nodes resolve zero primaries -- both EXCLUDED-THEN-THIN nodes by definition, and two of the three EXCLUDED-BUT-ADJACENT ones. K2-against-primaries is therefore unsatisfiable for exactly the nodes that need keys most. The floor asserted instead is the corpus: every key occurs as a whole token in at least one file under literature/. All keys pass. A key naming a word no summary in this corpus contains is a key about nothing a reader could be asking this Oracle.",
  checked_by:"cr_scratch/sre_w4/keycheck.js, run against this file. K1 failures 0, corpus-floor misses 0.",
  probe_pos:"One user-phrased question per node, the same fixture form the register carries on its A rows, so the key set is testable by calibration machinery that already exists rather than by inspection. Measured 2026-08-28: with match_keys empty, four of the ten probes routed to their node's declared outcome; with them, ten of ten do.",
  deliberate_duplicates:"'ilmenite' is a key on both bound-oxygen-mare and oxygen-extraction-energy, and 'titanium' on both bound-oxygen-mare and iron-production-energy. Not a collision to repair: an ilmenite question genuinely touches two boundaries the app declares, and tools/exclusions_match.js topBand() returns the tied band precisely so that the router does not choose which boundary the user hears."
};
let src=fs.readFileSync('oracle/question_classes.json','utf8');
const anchor='    "assignments": [';
if(!src.includes(anchor)) throw new Error('anchor missing');
const lines=JSON.stringify({match_keys_contract:contract},null,2).split('\n').slice(1,-1);
const block=lines.map(l=>'  '+l).join('\n')+',\n';
src=src.replace(anchor, block+anchor);
fs.writeFileSync('oracle/question_classes.json',Buffer.from(src.replace(/\r\n/g,'\n'),'binary'));
const qc=JSON.parse(fs.readFileSync('oracle/question_classes.json','utf8'));
console.log('contract block added; parses OK');
console.log('total match_keys', qc.exclusion_outcomes.assignments.reduce((n,a)=>n+a.match_keys.length,0));
console.log('contract keys', Object.keys(qc.exclusion_outcomes.match_keys_contract).join(', '));
console.log('CR bytes', fs.readFileSync('oracle/question_classes.json').filter(b=>b===13).length);
