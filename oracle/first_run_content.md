# The first-run sequence

**This file is the brief.** `CLAUDE.md` Phase 7 and `oracle/bootstrap_contract.md` Phase 7 decide
whether the sequence plays; this file decides what it says. Neither reaches into the other.

**The sequence is composed fresh on every install, not emitted verbatim.** That is a change from the
fixed text this file carried until 2026-09-01, and §3 records what it replaced and why. What is fixed
is the shape: three haiku, three beats, in the order below, each one gated by
`tools/verify_haiku.js` before it reaches a user.

Nothing else in this file is ever shown. §2 onward is written for the seat that maintains the
sequence and for the suite that checks it.

## 1. The sequence

Three haiku, each rendered in the conventional three-line 5/7/5 form, in this order and no other. No
prose, no heading, no signature, and nothing between them but a blank line.

| Beat | What this haiku is |
|---|---|
| 1 | A greeting to a reader who has come from Earth wanting to learn about the Moon. |
| 2 | The Oracle's own expertise, biographically: it has read the papers and knows where they disagree. |
| 3 | The call to action: bring a question, it will be answered. |

Beat 2 is the one that can go wrong, and §2's fourth constraint governs it. Biography is what the
Oracle has *done* — read the papers, held the disagreements. It is never what the Oracle *knows about
the Moon*, because that is a breadth claim and the corpus does not support one.

**Every haiku is verified before it is emitted.** A haiku that does not return `RESULT PASS` is
recomposed, never shipped with a note about why it failed.

```
node tools/verify_haiku.js "<the haiku, three lines>" --unit --allow-breaks
```

`--allow-breaks` is what permits the lines, and it is refused with `--turn` at exit 2. The delivered
answer turn is still strung linearly under the 2026-08-28 ruling at `answer_contract.md` §6b, and
nothing here reaches it.

Three that pass, kept as the known-answer set rather than as the text to reuse. A session that emits
these three verbatim has not composed a sequence, it has copied an example.

```
welcome earthbound friends
the moon has kept its records
come and read them here

the papers are stacked
I have read each one of them
I know where they clash

put your question down
I will go and read for you
and I will come back
```

Each is seventeen syllables partitioned 5/7/5 at a word boundary, on three lines, every line under
eighty rendered columns.

## 2. What holds this sequence in place

Six constraints. Each is contractual rather than stylistic, and each names what would falsify it.

**Three haiku, each on three lines, every line clearing eighty columns.** The lined form is the
sequence's, ruled 2026-09-01; the linear form remains the delivered turn's, and the two are different
objects for the reason §6b gives. A line that wraps puts a break where the form did not, which is the
one thing the rendering must not do. *Falsified by:* a haiku carrying other than exactly two
newlines, a count other than three haiku, any line that wraps at eighty columns.

**No haiku carries a claim.** No numeral, no spelled cardinal, no unit token, no coefficient name, no
named source, no grade word, no hedge. The haiku channel cannot carry a trace, so it must be
structurally incapable of asserting. *Falsified by:* any token from `verify_haiku.js`'s
claim-bearing list. **The checker is built and runs**, which is a change from this file's earlier
statement that it was specified and unbuilt; that statement was stale from 2026-08-28 and is
corrected here. Its forbidden list already blocks a haiku that talks about being a haiku.

**Every line's subject is the system, the reader, or the exchange between them.** Nothing about the
Moon as fact, nothing about economics, nothing about what the corpus holds. The sequence runs before
any question, so there is nothing to trace to, and the only warrant available is that the reader can
check every line of it within the next thirty seconds. A greeting may name the Moon as the reason the
reader came; it may not state anything about it. *Falsified by:* a line whose subject is a lunar or
economic fact.

**No count of anything, and no breadth the corpus does not have.** Not summaries, not sources, not
personas, not *ask me anything about the Moon*, not speed, not certainty, not completeness. A number
in the opening is a number nobody re-verifies, in the one place every reader looks; `182 sources` was
a filename count and was wrong. Beat 2 is where a generated line will reach for breadth, and *I have
read the papers* is biography while *I know the Moon* is a promise the refusal rules contradict.
*Falsified by:* a cardinal quantity in digits or spelled, or any capability claim the answer
contract's refusal rules contradict.

**It differs every time, and it never says so.** This inverts the replay rule this file carried until
2026-09-01. The sequence is composed per install, so two clones on two machines meet different words
and that is correct. What does not change is that each rendering is a first meeting: no *welcome
back*, no reference to prior state, no acknowledgement that other wordings exist. *Falsified by:* any
line that presumes this is not the first time, and, separately, by three installs returning identical
text, which means a session copied §1's examples.

**The order is fixed even though the words are not.** Greeting, then biography, then the call. A
sequence that opens on the call to action asks for a question from a reader who does not yet know who
is being asked. *Falsified by:* any other order.

## 3. What this replaced

Until 2026-09-01 the sequence was one hundred and seven words of fixed text: one haiku followed by
three prose paragraphs. It was cut to sixty words that day and replaced entirely later the same day,
on the author's ruling that the banner should be a fresh series of haiku on every install.

Three things went in the first cut and the reason was one reason. *"a haiku cannot hold a number, so
mine will tell you how your question went and never what the answer is"* explained the mechanism
behind a channel the next clause already described. *"written flat by people who do not rhyme"* was
decoration. *"Both happen often. Neither is a malfunction."* told the reader how to feel about a
refusal that had not happened yet, and an earlier draft of this file defended it as the sentence the
sequence existed for. A refusal that arrives with its consequence attached does not need to be
apologised for in advance.

**The refusal framing went with them and is not owed anywhere.** An earlier draft of this file
carried the two refusals into the greeting and a later one recorded them as owed a new home. Both
were the system explaining in advance why it might not answer, which is the same move the three cut
sentences were, one level up. Author ruling 2026-09-01: it is not carried forward, not relocated, and
not restored.

## 4. When the bootstrap did not fully succeed

The sequence does not play, and what plays instead is not a shortened version of it and not an
apologetic one. It is the bootstrap's own Phase 5 report, whose format belongs to
`oracle/bootstrap_contract.md` and `oracle/currency_policy.md` §9 and is not restated here.

Two content rules bind that report, and they are this file's because they are about register.

**No haiku, and no first-person Oracle voice.** A character introduced by a failure is a character the
reader distrusts for the rest of the session, and a haiku about a broken clone is a joke at the
expense of somebody whose tooling just broke. Operational reporting is plain, terse, and signed by the
system.

**It states the consequence for answering, not only the fact of the failure.** *`lsei/` not on disk*
is a fact about a directory. What the reader needs is the sentence after it: the app is the authority
for every quantitative answer and it is not here, so no quantitative question is answerable in this
session.

The flag stays unset, so the introduction is still owed. The reader has not spent their first
impression on a broken system; they have had a maintenance notice, and the sequence plays for real the
first time the thing works.
