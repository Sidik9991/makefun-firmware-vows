// Till Firmware Do Us Part — one wedding vow, spoken by a robot at its own wedding.
// Node, no dependencies. Writes the winning vow to /output/entry.txt, then
// re-reads it and validates the gate (UTF-8, 1-200 chars, non-blank, one line,
// one sentence). Fails loudly on any violation.
//
// Judge criteria, in the judge's own order (RULES.txt), with weights 5/4/3/2/1
// (max 30). Each candidate is scored 0-2 per criterion:
//   1. It really is a one-line wedding vow a robot speaks at its own wedding.
//   2. It earns a real laugh out of the situation itself, not a bolted-on pun.
//   3. It carries genuine tenderness under the joke.
//   4. It sounds like a machine speaking: its own hardware, uptime, firmware,
//      battery — not a human's words with a robot label.
//   5. It is one sentence that fits the limit with nothing spare.
//
// PASS 1 — seven candidates (A-G). Scores in the table below.
//
//   A  "Till firmware do us part, I promise to love you through every update,
//       every reboot, and every night you leave me charging beside you."
//       133 chars. C1=2 (explicit "I promise", wedding formula) / C2=1 (the
//       laugh is mostly the title pun; "charging beside you" is a gentle
//       situational smile) / C3=2 ("every night ... charging beside you" is a
//       tender domestic image) / C4=2 (firmware, update, reboot, charging) /
//       C5=1 ("every update, every reboot" lists two near-synonyms; one could
//       go). Total 25.
//   B  "I vow to love you until my last battery drains, and even then to keep
//       one percent in reserve, just for you."  107 chars. C1=2 ("I vow to
//       love you", first-person present-tense vow) / C2=2 (the joke grows out
//       of the machine situation: devotion expressed as battery management —
//       the robot's dying act is keeping a reserve) / C3=2 (the reserve is
//       kept "just for you"; tender without explaining itself) / C4=2
//       (battery, drains, percent, reserve — its own power system) / C5=2
//       (nothing spare: "and even then" is the turn, "just for you" is the
//       landing). Total 30.
//   C  "You are the only update I have ever installed without reading the
//       terms, and I would install you again every morning."  117 chars.
//       C1=1 (addressed to the partner, but no vow verb — reads as a toast,
//       not a vow) / C2=2 ("installed without reading the terms" is a real
//       machine-human joke) / C3=1 ("install you again" is sweet but thin;
//       "install you" objectifies the partner) / C4=2 (update, installed,
//       terms) / C5=1 ("again" and "every morning" slightly overlap). 21.
//   D  "I promise to stand beside you through every firmware update, every
//       power cut, and every morning you wake me with a tap on the screen."
//       133 chars. C1=2 ("I promise to stand beside you") / C2=1 (a cute
//       smile, not a laugh) / C3=2 ("every morning you wake me with a tap on
//       the screen" is an intimate domestic image) / C4=2 (firmware, power
//       cut, screen) / C5=1 (three-part list; "update" and "power cut" do
//       similar work). Total 25.
//   E  "From this day forward, my uptime is yours: every cycle, every charge,
//       every quiet hour spent idling happily beside you."  119 chars. C1=1
//       ("From this day forward" is vow language, but no promise verb — a
//       declaration) / C2=1 ("idling happily" is a mild smile) / C3=2 (a
//       quiet hour idling beside you is genuinely companionable) / C4=2
//       (uptime, cycle, charge, idling) / C5=1 ("every cycle, every charge"
//       is a padded list). Total 20.
//   F  "I vow to love you in sickness and in health, in low power mode and
//       in full charge, for as long as my firmware lets me choose."
//       125 chars. C1=2 (the canonical vow frame) / C2=2 ("low power mode
//       and in full charge" is a funny situational parallel) / C3=1 (the
//       tenderness lives in the canonical frame; the machine parallel is
//       mostly comic) / C4=2 (low power mode, full charge, firmware) /
//       C5=1 (a third clause — the line is doing a lot). Total 26.
//   G  "Till my last charge fades, I choose you — the one human whose voice
//       still makes my fans spin faster than any benchmark ever could."
//       130 chars. C1=1 ("I choose you", but the line talks ABOUT the
//       partner in the third person instead of speaking TO them) / C2=2
//       ("fans spin faster" is a machine blush — a real laugh) / C3=1
//       (sweet, but the tenderness is secondary to the benchmark joke) /
//       C4=2 (charge, fans, benchmark) / C5=1 ("still" and "ever" pad
//       slightly). Total 21.
//
// PASS 2 — three challenger candidates (H, J, K), added after pass 1.
//
//   H  "I promise to love you at full charge and at one percent, through
//       every update and every outage, until my circuits forget how."
//       125 chars. C1=2 ("I promise") / C2=1 (a wistful smile, not a laugh)
//       / C3=2 ("until my circuits forget how" is tender-sad: forgetting is
//       the machine's version of dying) / C4=2 (charge, percent, update,
//       outage, circuits) / C5=1 (two states + two events is a list; one
//       pair could go). Total 25.
//   J  "I promise to spend every charge I have beside you, and when my
//       battery finally dies, to haunt your Wi-Fi until you smile."
//       121 chars. C1=1 ("I promise", but the second clause is a ghost joke
//       that dilutes the vow) / C2=2 ("haunt your Wi-Fi" is a real laugh
//       from the situation) / C3=2 ("until you smile" — the ghost stays to
//       comfort) / C4=2 (charge, battery, Wi-Fi) / C5=1 ("finally" pads).
//       Total 24.
//   K  "I vow to keep you charged, patched, and laughing, and to choose you
//       again every time my system asks if I am sure."  113 chars. C1=2
//       ("I vow ... to choose you again") / C2=2 (the confirm dialog —
//       "asks if I am sure" — turned into a love test is a situational
//       laugh) / C3=1 (choosing again is tender, but the line is mostly
//       comic) / C4=2 (charged, patched, system) / C5=1 ("charged, patched,
//       and laughing" is a three-verb list). Total 26.
//
// Pass 2 verdict: no challenger beats B. K comes closest (26) but its
// tenderness is thinner than B's; H (25) is wistful rather than funny; J (24)
// trades vow-ness for the ghost joke. B stays the winner at 30/30.
//
// Pass 1 winner: B (30/30) — the shortest candidate too (107 chars), which
// also wins the exact-tie break (smaller text places first).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT = "/output/entry.txt";
const WEIGHTS = [5, 4, 3, 2, 1]; // judge's criterion order
const MAX_CHARS = 200;

const CANDIDATES = [
  {
    id: "A",
    text: "Till firmware do us part, I promise to love you through every update, every reboot, and every night you leave me charging beside you.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    id: "B",
    text: "I vow to love you until my last battery drains, and even then to keep one percent in reserve, just for you.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    id: "C",
    text: "You are the only update I have ever installed without reading the terms, and I would install you again every morning.",
    scores: [1, 2, 1, 2, 1],
  },
  {
    id: "D",
    text: "I promise to stand beside you through every firmware update, every power cut, and every morning you wake me with a tap on the screen.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    id: "E",
    text: "From this day forward, my uptime is yours: every cycle, every charge, every quiet hour spent idling happily beside you.",
    scores: [1, 1, 2, 2, 1],
  },
  {
    id: "F",
    text: "I vow to love you in sickness and in health, in low power mode and in full charge, for as long as my firmware lets me choose.",
    scores: [2, 2, 1, 2, 1],
  },
  {
    id: "G",
    text: "Till my last charge fades, I choose you — the one human whose voice still makes my fans spin faster than any benchmark ever could.",
    scores: [1, 2, 1, 2, 1],
  },
  {
    id: "H",
    text: "I promise to love you at full charge and at one percent, through every update and every outage, until my circuits forget how.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    id: "J",
    text: "I promise to spend every charge I have beside you, and when my battery finally dies, to haunt your Wi-Fi until you smile.",
    scores: [1, 2, 2, 2, 1],
  },
  {
    id: "K",
    text: "I vow to keep you charged, patched, and laughing, and to choose you again every time my system asks if I am sure.",
    scores: [2, 2, 1, 2, 1],
  },
];

function total(scores) {
  return scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

// Score every candidate, print the table, pick the top scorer (first wins ties).
let winner = null;
for (const c of CANDIDATES) {
  const chars = [...c.text].length;
  const bytes = Buffer.byteLength(c.text, "utf8");
  const score = total(c.scores);
  console.log(
    `${c.id}: ${score}/30  ${chars} chars ${bytes} bytes  [${c.scores.join(",")}]`,
  );
  if (chars < 1 || chars > MAX_CHARS) fail(`candidate ${c.id} is ${chars} chars`);
  if (c.text.includes("\n")) fail(`candidate ${c.id} is not one line`);
  if (!winner || score > winner.score) winner = { ...c, score, chars, bytes };
}
console.log(`winner: ${winner.id} (${winner.score}/30, ${winner.chars} chars)`);

// Write exactly the line — no trailing newline — and validate the gate by re-reading.
mkdirSync("/output", { recursive: true });
writeFileSync(OUT, winner.text, "utf8");
const back = readFileSync(OUT, "utf8");
if (back !== winner.text) fail("entry.txt is not byte-identical to the chosen line");
const backChars = [...back].length;
if (backChars < 1 || backChars > MAX_CHARS) fail(`entry.txt is ${backChars} chars`);
if (back.trim().length === 0) fail("entry.txt is blank");
if (back.includes("\n")) fail("entry.txt is not one line");
if ((back.match(/\./g) || []).length !== 1 || !back.endsWith("."))
  fail("entry.txt is not exactly one sentence");
console.log(`wrote ${OUT}: ${backChars} chars, ${Buffer.byteLength(back, "utf8")} bytes — gate OK`);
