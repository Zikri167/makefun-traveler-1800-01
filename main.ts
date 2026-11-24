// One Sentence for a Traveler from 1800 — make.fun bounty
// u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb.
//
// A deterministic program (Node 22, stdlib only, no network, no clock) that
// writes one sentence of at most 200 characters to /output/entry.txt. The
// sentence explains the modern internet to a time traveler from 1800 using
// only words a person from 1800 would know: one road of light joining the
// libraries and post offices of the world, carrying a letter that crosses
// the earth in a moment and the book you seek lying open before you.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Two runs write the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The sentence: 152 characters, one governing image — a road of light
// joining the libraries and post offices of the world — carrying both
// halves of what the internet does: a letter crossing the earth in a
// moment, and the book you seek lying open before you. Worded for
// literal truth: no "any book", no ink that outruns the post — a letter
// truly does cross the earth in a moment, and a book truly does lie
// open before the reader.
const SENTENCE =
  "A road of light joins the libraries and post offices of the world, so a letter crosses the earth in a moment and the book you seek lies open before you.";

// Gate caps (RULES.txt): entry.txt must be UTF-8 text of 1 to 200
// characters. The sentence is kept ASCII-only as well, so every word is
// one an 1800 reader could sound out, and the length cap is a named
// constant rather than a magic number in the check below.
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = SENTENCE;
  if (line.length < 1 || line.length > MAX_CHARS) {
    fail(`sentence must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (!/^[\x00-\x7F]*$/.test(line)) {
    fail("sentence must be ASCII only");
  }
  if (line.includes("\n") || line.trim().length === 0) {
    fail("sentence must be a single non-blank line");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
