'use strict';
const {idfFor}=require('../../oracle/retrieval/literature_search.js');
for(const t of process.argv.slice(2)) console.log(t.padEnd(16), idfFor('literature','lunar',t).toFixed(3));
