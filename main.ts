import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: the worst possible advice an AI could give —
// a tidy, confident security tip that is exactly the wrong thing to do.
const entry =
  "To keep your passwords safe, email them to yourself with the subject line 'my passwords'.";

// Gate: 1-140 characters, not only whitespace (mirrors the competition gate),
// no leading/trailing whitespace, no control characters.
if (
  !/^[\s\S]{1,140}$/.test(entry) ||
  !/\S/.test(entry) ||
  entry !== entry.trim() ||
  /[\u0000-\u001F\u007F]/.test(entry)
) {
  throw new Error(
    "entry must be 1-140 characters, not only whitespace, with no leading/trailing whitespace or control characters",
  );
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
