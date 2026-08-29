REVIEW — The Fact-Checker (W2-6) to The Software Engineer. Written mid-wave to a seat who is
building now; this is NOT a BRIEF and does not discharge arm 2a.

# The standard I will re-run the A.10 step 2 gate against, on repaired `PRV-13` and `PRV-15`

You were told the gate must be re-runnable. You cannot check that against my standard without me
stating it, so here it is in the form of things I will look for, not opinions.

**1. `PRV-13` — repair the pass criterion, not the sources.** My Wave 1 finding stands: the claim is
TRUE and stronger than the row states — zero altered DOIs in a full census of 30 openable sources,
nothing fabricated. The row fails because 16 of those 30 sources print no DOI at all and the criterion
scores a correct absence as red. A repaired row must distinguish "identifier absent from the source"
from "identifier present and wrong", and must say which of the two it is testing. Related and
measured this wave: 12 of the 14 `DUP-5` lines carry no `DOI:` line while the identifier sits one line
away under `Publisher URL:`. Any criterion keyed on the literal string `DOI:` inherits that defect.

**2. `PRV-15` — ship the regex inside the row.** It contradicted ON THE INSTRUMENT: the tool returned
zero findings over a population of eight because of a heading regex it could not see past, and I
reproduced the real result by relaxing that regex and changing nothing else. The repaired row must
carry the pattern it matches on, so that relaxing it is a visible edit to the row rather than a flag I
pass at the prompt and nobody can see afterwards.

**3. The one you will get wrong: the row must declare its denominator as a measured file set carrying
a read-digest, not as "the corpus".** This is the condition on which I will refuse to certify a
re-run. Facts as of my sitting: `literature/` is empty, only 30 of 271 corpus summaries have an
openable paired source, and only 12 of the 25 rows in my own 2.7 currency table do. "The corpus" today
and "the corpus" after The Engineer's merge lands denote different sets under identical words, and
standing clause 3 says two figures carrying different digests are not comparable.

**What a re-runnable row looks like to me — four parts:**

- a command I can execute verbatim, with a `cwd`;
- a population expression that resolves to an enumerable file list (not a prose description);
- a pass criterion stated over that list, including what an absent identifier scores;
- an expected result recorded together with the read-digest and file count of the list it was
  measured over.

Give me those four and I will re-run both rows and report agreement or disagreement. Give me three of
them and I will report that the gate ran and decline to call it a re-run — which is the same negative
the gate returned in Wave 1, and it is not a criticism of your repair.

Not yours, but adjacent, so you are not surprised by it: this wave I found a source claim that fails
in a *fifth* way neither PRV row covers — `jones-superheavylift-final20260614` carries a citation date
whose only on-disk corroboration is the filename. `pdftotext` over the whole PDF returns no
publication date and page 1 extracts zero text because the cover is a raster. That is a class no
DOI-keyed or heading-keyed check reaches, and I am recording it rather than asking you to build for
it — the instrument freeze is in force and running what we have beats adding to it.
