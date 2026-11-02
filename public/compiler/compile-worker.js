// Compiles C / C++ to WebAssembly entirely in the browser using Clang built for WASM
// (@yowasp/clang, served from /clang). Stays alive between compiles so the 75 MB compiler
// is downloaded and compiled only once.
import { runClang, runLLVM } from "/clang/bundle.js";

const dec = new TextDecoder();
let warm = null;
const sources = new Map(); // fetch source -> {done,total}

function reportProgress(ev) {
  sources.set(ev.source, { done: ev.doneLength, total: ev.totalLength });
  let done = 0;
  let total = 0;
  for (const v of sources.values()) {
    done += v.done;
    total += v.total;
  }
  self.postMessage({ type: "progress", done, total });
}

function warmup() {
  if (!warm) {
    // runClang() does not report download progress, but runLLVM() does, and it loads the same
    // resources. So: fetch with progress first, then do one tiny compile to warm everything up.
    warm = runLLVM(["clang", "--version"], {}, {
      stdout: () => {},
      stderr: () => {},
      fetchProgress: reportProgress,
    })
      .then(() =>
        runClang(["clang", "tiny.c", "-o", "tiny.wasm"], { "tiny.c": "int main(void){return 0;}" }, {
          stdout: () => {},
          stderr: () => {},
        })
      )
      .then(() => {
        self.postMessage({ type: "ready" });
      });
    warm.catch((err) => {
      warm = null;
      self.postMessage({ type: "load-error", message: String(err && err.message ? err.message : err) });
    });
  }
  return warm;
}

// GCC's <bits/stdc++.h> does not exist in this C++ library, but it is what most
// competitive-programming code starts with, so we provide it as a virtual header.
const STDCXX = [
  "algorithm", "array", "bitset", "cassert", "cctype", "cfloat", "chrono", "climits", "cmath",
  "complex", "cstdint", "cstdio", "cstdlib", "cstring", "ctime", "deque", "functional", "iomanip",
  "iostream", "iterator", "limits", "list", "map", "memory", "numeric", "optional", "queue",
  "random", "set", "sstream", "stack", "string", "tuple", "unordered_map", "unordered_set",
  "utility", "vector",
]
  .map((h) => `#include <${h}>`)
  .join("\n");

// This C++ library is built without exception support, but its headers still contain `throw`
// (e.g. vector::at). These stubs let programs link; a throw ends the program with a message.
const EXC_SHIM = `#include <stdio.h>
#include <stdlib.h>
extern "C" {
void *__cxa_allocate_exception(unsigned long n) { return malloc(n ? n : 1); }
void __cxa_free_exception(void *p) { free(p); }
[[noreturn]] void __cxa_throw(void *, void *, void (*)(void *)) {
  fputs("terminate called after throwing an exception (C++ exceptions are not supported in this compiler)\\n", stderr);
  abort();
}
}
`;

async function compile({ id, lang, std, code }) {
  const t0 = performance.now();
  try {
    await warmup();
  } catch {
    return;
  }
  const isCpp = lang === "cpp";
  const file = isCpp ? "main.cpp" : "main.c";
  const log = [];
  const collect = (bytes) => {
    if (bytes) log.push(dec.decode(bytes, { stream: true }));
  };
  const args = [
    isCpp ? "clang++" : "clang",
    file,
    "-o",
    "main.wasm",
    `-std=${std}`,
    "-O1",
    "-Wall",
    "-Wno-unused-result",
    "-I.",
    // DSA programs recurse deeply: give them an 16 MB stack and allow up to 1 GB of memory
    "-Wl,-z,stack-size=16777216",
    "-Wl,--max-memory=1073741824",
  ];
  try {
    const tree = { [file]: code };
    if (isCpp) {
      tree.bits = { "stdc++.h": STDCXX };
      tree["kik_exc_shim.cpp"] = EXC_SHIM;
      args.splice(2, 0, "kik_exc_shim.cpp"); // compiled together with the user's file
    }
    const files = await runClang(args, tree, { stdout: collect, stderr: collect });
    const out = files && files["main.wasm"];
    if (!out) throw new Error("The compiler produced no output.");
    const wasm = out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength);
    self.postMessage(
      { type: "compiled", id, ok: true, wasm, log: log.join(""), ms: Math.round(performance.now() - t0) },
      [wasm]
    );
  } catch (err) {
    let text = log.join("");
    if (!text.trim()) text = String(err && err.message ? err.message : err);
    self.postMessage({ type: "compiled", id, ok: false, log: text, ms: Math.round(performance.now() - t0) });
  }
}

self.onmessage = (e) => {
  const m = e.data;
  if (m.type === "warmup") warmup().catch(() => {});
  else if (m.type === "compile") compile(m);
};
