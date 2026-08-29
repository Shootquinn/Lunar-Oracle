'use strict';
const fs=require('fs');
let s=fs.readFileSync('oracle/acceptance/lunar_questions.md','utf8');
const a1="verdict is the one the question's *content* warrants. Nine rows are unconditioned; five are marked\n`K` and say which axis they probe and in which direction.";
const a2="verdict is the one the question's *content* warrants. **Re-counted 2026-08-28 against the live\nrouter:** eleven rows are unconditioned, **two** are marked `K` (SRQ-3, SRQ-7) and say which axis\nthey probe and in which direction, and **one is `RED`** (SRQ-13), which was marked `K` and was\nmis-marked: measurement showed its failure is not a threshold at all.";
if(!s.includes(a1)) throw new Error('preamble 1 not found');
s=s.replace(a1,a2);
const b1="has run: five rows are marked `K` because their outcome is a function of a threshold that is not\nset, and calling those green before 3.6 would be assigning a status before the run";
const b2="has run: two rows are marked `K` because their outcome is a function of a threshold that is not\nset, one is `RED` with a named reason, owner and close condition, and calling any of the three green\nbefore the mechanism exists would be assigning a status before the run";
if(!s.includes(b1)) throw new Error('preamble 2 not found');
s=s.replace(b1,b2);
fs.writeFileSync('oracle/acceptance/lunar_questions.md',Buffer.from(s.replace(/\r\n/g,'\n'),'binary'));
const t=fs.readFileSync('oracle/acceptance/lunar_questions.md','utf8');
console.log('rows '+(t.match(/^\| SRQ-\d+ \|/gm)||[]).length+
  ' | K '+(t.match(/\| \*\*K\*\* /g)||[]).length+
  ' | RED '+(t.match(/\| \*\*RED\*\*/g)||[]).length+
  ' | green '+(t.match(/\| (green|\*\*green\*\*)/g)||[]).length);
console.log('CR '+fs.readFileSync('oracle/acceptance/lunar_questions.md').filter(b=>b===13).length);
