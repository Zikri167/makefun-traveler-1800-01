// One Sentence for a Traveler from 1800 — make.fun bounty
// u-po-pu-one-sentence-for-a-traveler-from-1800-7e6162fb.
//
// A deterministic program (Node 22, stdlib only, no network, no clock) that
// writes one sentence of at most 200 characters to /output/entry.txt. The
// sentence explains the modern internet to a time traveler from 1800 using
// only words a person from 1800 would know: one road of light joining every
// library and post office on earth, carrying letters that arrive before
// their ink dries and any book on demand.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Two runs write the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The sentence: 155 characters, one governing image — a road of light
// joining every library and post office — carrying both halves of what the
// internet does: instant letters and any book on demand.
const SENTENCE =
  "One road of light joins every library and post office on earth, so a letter arrives before its ink dries and any book you seek opens in your hands at once.";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = SENTENCE;
  if (line.length < 1 || line.length > 200) {
    fail(`sentence must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    fail("sentence must be a single non-blank line");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
