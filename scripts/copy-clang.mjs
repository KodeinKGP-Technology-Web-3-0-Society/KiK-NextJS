// Copies the in-browser Clang toolchain (~105 MB) from node_modules into public/clang
// so the /compiler page can fetch it. Runs after `npm install`; the output is git-ignored.
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const src = "node_modules/@yowasp/clang/gen";
const dest = "public/clang";

if (!existsSync(src)) {
  console.log("[copy-clang] @yowasp/clang not installed, skipping");
  process.exit(0);
}
mkdirSync(dest, { recursive: true });
let copied = 0;
for (const name of readdirSync(src)) {
  const from = join(src, name);
  const to = join(dest, name);
  if (existsSync(to) && statSync(to).size === statSync(from).size) continue;
  copyFileSync(from, to);
  copied++;
}
console.log(`[copy-clang] ${copied} file(s) copied to ${dest}`);
