'use strict';
const fs=require('fs');
const pr=JSON.parse(fs.readFileSync('cr_scratch/sre_w4/tp_probes.json','utf8'));
let src=fs.readFileSync('oracle/thin_patches.json','utf8');

const rule={
  name:"trigger mass, IDF-weighted, lunar-scoped",
  why:"A COUNT RULE OVER TRIGGER TOKENS DOES NOT WORK AND A MASS RULE DOES. Under any-token-fires, T1 fires on SRQ-7 on the single token 'regolith' (idf 0.662) and T2 fires on SRQ-13 on 'bearing' (1.411). Both are correct vocabulary and wrong triggers on their own. Measured by The Engineer at W4-3 and re-measured here on a wider control set.",
  score:"mass = sum over the patch's trigger_tokens present in the question's tokens of idfFor('literature','lunar',token). tokenize() and idfFor() are both exported from oracle/retrieval/literature_search.js; this needs no new mechanism.",
  two_tiers:"FIRING IS NOT GOVERNING, and conflating them is what makes a single threshold fail. A patch that FIRES attaches its `substitution` to the answer as content. A patch that GOVERNS makes its `refusal_code` the verdict. T3 fires on SRQ-10 at 5.961 and SRQ-10 is BOTH -- the acceptance row says so in its own Must-carry cell. A one-tier rule has to choose between silencing that legitimate fire and turning a BOTH into a REFUSE.",
  fire_threshold:{value:1.7,status:"PROVISIONAL",band:[1.478,1.858],
    evidence:"below the band: T1 on SRQ-7 and on SRQ-5, both 0.662 on 'regolith' alone, the false fire this rule exists to stop; and T2's own probe_neg at 1.478. Above it: T10 on SRQ-7 at 1.858, which is a CORRECT fire -- SRQ-7's Must-carry cell already requires the May 2025 date T10 supplies."},
  govern_threshold:{value:6.175,status:"PROVISIONAL",band:[5.961,6.389],
    evidence:"must govern: SRQ-13/T1 8.540, SRQ-14/T5 6.389, and all ten probe_pos rows at 10.238 or above. Must not govern: SRQ-10/T3 5.961 (verdict BOTH), LCC-14 probe_pos/T6 5.601 (verdict CONTESTED), and the ten probe_neg rows at 5.550 or below. Separates all 49 labelled questions.",
    margin_warning:"The band is 0.428 wide, about 7 percent. It is real and it separates every row measured, but it is tight, and the row constraining it from below (T3 on SRQ-10) is a LEGITIMATE fire rather than a false one. That is the single-threshold design at its limit and it is the argument for the two tiers above."},
  owner:"The threshold values are PROVISIONAL and are the router seat's to set, on the same footing as K in oracle/router/axis_threshold.json. What is authored here is the rule, the labelled fixture set (probe_pos/probe_neg per patch), and the measured bands. Re-measure with cr_scratch/sre_w4/tp_band2.js and tp_probemass.js.",
  refuted:"The Engineer's W4-3 proposal of any threshold in (1.86, 3.78] is REFUTED by the wider control set. That band was measured on five rows and contained neither SRQ-10 nor the LCC-14 probe_pos. A threshold of 2.5 or 3.0 makes T3 govern SRQ-10 and T6 govern LCC-14, flipping a BOTH and a CONTESTED into REFUSE. The shape of the finding stands; the number does not.",
  precondition_refuted:"An obvious-looking precondition -- let a patch govern only where no competing route answered -- is REFUTED by measurement. SRQ-13 returns LITERATURE confirmed 9 of 9 at frac 0.85, so that precondition would block T1 on exactly the row it must govern. A confirmed retrieval is not evidence the question was answered; that is the whole content of the third failure mode The Engineer identified.",
  token_form:"Every trigger token satisfies tokenize(t) deep-equals [t]. Nine did not before this repair and could never match: 'boil-off' (T5), 'MTBF' (T3), 'he-3' 'helium-3' 'REE' 'KREEP' 'PGM' (T7), 'TRL' and 'as of' (T10). The defect class is wider than the hyphen: uppercase and multi-word forms fail identically, and 'as of' tokenizes to nothing at all because both halves are stopwords. Check with cr_scratch/sre_w4/fix_triggers.js.",
  no_corpus_floor:"The corpus-presence floor asserted on excluded-node match_keys DOES NOT APPLY HERE, and applying it would be backwards. A thin patch exists because a measurement is absent, so a trigger naming that measurement is expected to be absent from the corpus: 'shear' (T1), 'tribology' and 'ingress' (T2) occur in no summary on this shelf. Their absence is evidence the patch is real, not evidence the trigger is wrong.",
  kept_deliberately:"T1 keeps 'regolith' and T2 keeps 'bearing'. Both are correct vocabulary for their patch and both contribute to a true positive: 'regolith' is 0.662 of T1's 8.540 on SRQ-13 and 'bearing' is 1.411 of it. The mass rule is what makes them safe, and removing them would lower the true-positive signal to fix a problem the rule already fixes."
};

// insert firing_rule after the "rule" block's closing brace, before "patches"
const anchor='  "patches": [';
if(!src.includes(anchor)) throw new Error('anchor missing');
const lines=JSON.stringify({firing_rule:rule},null,2).split('\n').slice(1,-1);
src=src.replace(anchor, lines.join('\n')+',\n\n'+anchor);

// add probe_pos / probe_neg to each patch, after its trigger_tokens line
const tpTmp=JSON.parse(src);
for(const p of tpTmp.patches){
  const [pos,neg]=pr[p.id];
  const line='      "trigger_tokens": '+JSON.stringify(p.trigger_tokens).replace(/","/g,'", "')+',';
  if(!src.includes(line)) throw new Error('no trigger line for '+p.id);
  src=src.replace(line, line+'\n      "probe_pos": '+JSON.stringify(pos)+',\n      "probe_neg": '+JSON.stringify(neg)+',');
}
fs.writeFileSync('oracle/thin_patches.json',Buffer.from(src.replace(/\r\n/g,'\n'),'binary'));
const out=JSON.parse(fs.readFileSync('oracle/thin_patches.json','utf8'));
console.log('parses OK | patches '+out.patches.length+' | firing_rule '+(out.firing_rule?'present':'MISSING'));
console.log('probes: '+out.patches.filter(p=>p.probe_pos&&p.probe_neg).length+'/10');
console.log('CR bytes '+fs.readFileSync('oracle/thin_patches.json').filter(b=>b===13).length);
