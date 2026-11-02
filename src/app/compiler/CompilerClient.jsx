"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, Download, ExternalLink, Loader2, Play, RotateCcw, Square, Terminal } from "lucide-react";
import CodeEditor from "./CodeEditor";
import { STANDARDS, TEMPLATES } from "./templates";

const STORE_KEY = "kik-compiler-v1";
const RUN_LIMIT_MS = 10000;

const fmtMB = (n) => (n / 1048576).toFixed(1);
const fmtMs = (ms) => (ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${ms} ms`);

function initialState(lang) {
  const t = TEMPLATES[lang][0];
  return { code: t.code, stdin: t.stdin, std: STANDARDS[lang][0].value, tpl: t.id };
}

export default function CompilerClient({
  embedded = false,
  codeOverride = null,
  storageKey = null,
  embeddedTitle = "Interactive C/C++ Workspace",
}) {
  const activeKey = storageKey || (embedded ? "kik-compiler-embedded" : STORE_KEY);
  const [lang, setLang] = useState("c");
  const [work, setWork] = useState({ c: initialState("c"), cpp: initialState("cpp") });
  const [loaded, setLoaded] = useState(false);

  const [engine, setEngine] = useState({ state: "idle", done: 0, total: 0, error: "" });
  const [phase, setPhase] = useState("idle"); // idle | compiling | running
  const [out, setOut] = useState([]); // [{ k: 'out' | 'err' | 'warn' | 'cerr' | 'info', t }]
  const [meta, setMeta] = useState({});
  const [errorLines, setErrorLines] = useState([]);
  const [copied, setCopied] = useState(false);

  const compileWorker = useRef(null);
  const runWorker = useRef(null);
  const pending = useRef(new Map());
  const editorRef = useRef(null);
  const runTimer = useRef(null);
  const outRef = useRef(null);

  const cur = work[lang];
  const update = (patch) => setWork((w) => ({ ...w, [lang]: { ...w[lang], ...patch } }));

  // restore the last session
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(activeKey) || "null");
      if (saved?.work) {
        setWork((w) => ({
          c: { ...w.c, ...saved.work.c },
          cpp: { ...w.cpp, ...saved.work.cpp },
        }));
        if (saved.lang === "c" || saved.lang === "cpp") setLang(saved.lang);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, [activeKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(activeKey, JSON.stringify({ lang, work }));
    } catch {
      /* storage full or blocked */
    }
  }, [lang, work, loaded, activeKey]);

  // handle code override (e.g. loading reference solution from lab problem)
  useEffect(() => {
    if (codeOverride != null) {
      setWork((w) => ({
        ...w,
        [lang]: { ...w[lang], code: codeOverride },
      }));
      setOut([]);
      setMeta({});
      setErrorLines([]);
    }
  }, [codeOverride]);

  // the compiler lives in a background thread so the page never freezes
  useEffect(() => {
    const w = new Worker("/compiler/compile-worker.js", { type: "module" });
    compileWorker.current = w;
    w.onmessage = (e) => {
      const m = e.data;
      if (m.type === "progress") setEngine((s) => ({ ...s, state: "loading", done: m.done, total: m.total }));
      else if (m.type === "ready") setEngine((s) => ({ ...s, state: "ready" }));
      else if (m.type === "load-error")
        setEngine({ state: "error", done: 0, total: 0, error: m.message });
      else if (m.type === "compiled") {
        const resolve = pending.current.get(m.id);
        if (resolve) {
          pending.current.delete(m.id);
          resolve(m);
        }
      }
    };
    w.onerror = () =>
      setEngine({ state: "error", done: 0, total: 0, error: "The compiler could not be started in this browser." });

    // start downloading right away unless the visitor asked their browser to save data
    const conn = navigator.connection;
    const saveData = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""));
    if (!saveData) {
      setEngine((s) => ({ ...s, state: "loading" }));
      w.postMessage({ type: "warmup" });
    }
    return () => {
      w.terminate();
      runWorker.current?.terminate();
      clearTimeout(runTimer.current);
    };
  }, []);

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [out]);

  const append = useCallback((k, t) => {
    setOut((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.k === k) return [...prev.slice(0, -1), { k, t: last.t + t }];
      return [...prev, { k, t }];
    });
  }, []);

  const compile = (payload) =>
    new Promise((resolve) => {
      const id = Math.random().toString(36).slice(2);
      pending.current.set(id, resolve);
      setEngine((s) => (s.state === "idle" ? { ...s, state: "loading" } : s));
      compileWorker.current.postMessage({ type: "compile", id, ...payload });
    });

  const finish = useCallback(() => {
    clearTimeout(runTimer.current);
    runWorker.current?.terminate();
    runWorker.current = null;
    setPhase("idle");
  }, []);

  const run = async () => {
    if (phase !== "idle") return;
    setOut([]);
    setMeta({});
    setErrorLines([]);
    setPhase("compiling");

    const res = await compile({ lang, std: cur.std, code: cur.code });
    if (!res.ok) {
      const lines = [...res.log.matchAll(/^main\.c(?:pp)?:(\d+):\d+: (?:fatal )?error/gm)].map((m) => +m[1]);
      setErrorLines(lines);
      setOut([{ k: "cerr", t: res.log }]);
      setMeta({ failed: true, compileMs: res.ms });
      setPhase("idle");
      return;
    }
    const warnings = res.log.trim();
    setOut(warnings ? [{ k: "warn", t: res.log }] : []);
    setMeta({ compileMs: res.ms });
    setPhase("running");

    const rw = new Worker("/compiler/run-worker.js");
    runWorker.current = rw;
    runTimer.current = setTimeout(() => {
      append("err", `\n[Time limit exceeded: stopped after ${RUN_LIMIT_MS / 1000} s]\n`);
      setMeta((m) => ({ ...m, timedOut: true }));
      finish();
    }, RUN_LIMIT_MS);

    rw.onmessage = (e) => {
      const m = e.data;
      if (m.type === "stdout") append("out", m.text);
      else if (m.type === "stderr") append("err", m.text);
      else if (m.type === "done") {
        setMeta((x) => ({ ...x, exit: m.code, runMs: m.ms }));
        finish();
      } else if (m.type === "crash") {
        append("err", `\n[Runtime error: ${m.message}]\n`);
        setMeta((x) => ({ ...x, crashed: true }));
        finish();
      }
    };
    rw.onerror = () => {
      append("err", "\n[The program could not be started]\n");
      finish();
    };
    rw.postMessage({ wasm: res.wasm, stdin: cur.stdin }, [res.wasm]);
  };

  const stop = () => {
    if (phase !== "running") return;
    append("err", "\n[Stopped]\n");
    setMeta((m) => ({ ...m, stopped: true }));
    finish();
  };

  const pickTemplate = (id) => {
    const t = TEMPLATES[lang].find((x) => x.id === id);
    if (!t) return;
    update({ code: t.code, stdin: t.stdin, tpl: id });
    setOut([]);
    setMeta({});
    setErrorLines([]);
  };

  const switchLang = (next) => {
    if (next === lang || phase !== "idle") return;
    setLang(next);
    setOut([]);
    setMeta({});
    setErrorLines([]);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cur.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  const download = () => {
    const blob = new Blob([cur.code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = lang === "cpp" ? "main.cpp" : "main.c";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const goToError = (line, col) => editorRef.current?.goTo(line, col);

  const busy = phase !== "idle";
  const pct = engine.total ? Math.min(100, Math.round((engine.done / engine.total) * 100)) : 0;

  const workspace = (
    <div className="flex flex-col">
      {embedded && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2333] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
              <Terminal size={15} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-sm font-semibold text-[#f8fafc]">{embeddedTitle}</h3>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  WASM In-Browser
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#94a3b8]">
                Runs directly on your machine · Zero remote server dependency
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/compiler"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-md border border-[#1e2333] bg-[#0d1017] px-2.5 py-1.5 font-mono text-xs text-[#94a3b8] transition-colors hover:border-[var(--accent)] hover:text-[#f8fafc] sm:inline-flex"
              title="Open full page compiler in new tab"
            >
              <span>Full Screen</span>
              <ExternalLink size={12} />
            </Link>
            <EngineStatus engine={engine} pct={pct} />
          </div>
        </div>
      )}

      {/* toolbar */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-md border border-[#1e2333] bg-[#11141d] p-0.5" role="tablist" aria-label="Language">
          {[
            ["c", "C"],
            ["cpp", "C++"],
          ].map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={lang === id}
              onClick={() => switchLang(id)}
              className={`rounded px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors ${
                lang === id ? "bg-[var(--accent)] text-[#08090d]" : "text-[#94a3b8] hover:text-[#f8fafc]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Select
          label="Standard"
          value={cur.std}
          onChange={(v) => update({ std: v })}
          options={STANDARDS[lang].map((s) => [s.value, s.label])}
        />
        <Select
          label="Examples"
          value={cur.tpl}
          onChange={pickTemplate}
          options={TEMPLATES[lang].map((t) => [t.id, t.name])}
          wide
        />

        <div className="ml-auto flex items-center gap-2">
          <IconBtn onClick={copy} label="Copy code">
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
          </IconBtn>
          <IconBtn onClick={download} label="Download source file">
            <Download size={15} />
          </IconBtn>
          <IconBtn onClick={() => pickTemplate(TEMPLATES[lang][0].id)} label="Reset to Hello World">
            <RotateCcw size={15} />
          </IconBtn>
          {phase === "running" ? (
            <button
              onClick={stop}
              className="inline-flex items-center gap-2 rounded-md border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/20"
            >
              <Square size={14} fill="currentColor" /> Stop
            </button>
          ) : (
            <button
              onClick={run}
              disabled={busy}
              className="inline-flex min-w-[104px] items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#08090d] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] disabled:translate-y-0 disabled:opacity-60"
              title="Ctrl/Cmd + Enter"
            >
              {phase === "compiling" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Compiling
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" /> Run
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        {/* editor */}
        <div className={`flex ${embedded ? "h-[480px] lg:h-[560px]" : "h-[560px] lg:h-[640px]"} flex-col overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d]`}>
          <PanelHead>
            <span className="font-mono">{lang === "cpp" ? "main.cpp" : "main.c"}</span>
            <span className="text-[#475569]">Ctrl + Enter to run</span>
          </PanelHead>
          <div className="min-h-0 flex-1">
            <CodeEditor
              ref={editorRef}
              value={cur.code}
              onChange={(v) => update({ code: v })}
              lang={lang}
              onRun={run}
              errorLines={errorLines}
            />
          </div>
        </div>

        {/* input + output */}
        <div className="flex flex-col gap-4">
          <div className={`flex ${embedded ? "h-[150px]" : "h-[170px]"} flex-col overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d]`}>
            <PanelHead>
              <span>Input (stdin)</span>
              <span className="text-[#475569]">given to scanf / cin</span>
            </PanelHead>
            <textarea
              value={cur.stdin}
              onChange={(e) => update({ stdin: e.target.value })}
              spellCheck={false}
              placeholder="Type the program's input here before pressing Run"
              aria-label="Program input"
              className="min-h-0 flex-1 resize-none bg-[#0a0c11] p-3.5 font-mono text-[13.5px] leading-6 text-[#e2e8f0] outline-none placeholder:text-[#475569]"
            />
          </div>

          <div className={`flex ${embedded ? "h-[320px]" : "h-[420px]"} min-h-0 flex-col overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d] lg:h-0 lg:flex-1`}>
            <PanelHead>
              <span className="inline-flex items-center gap-2">
                <Terminal size={13} /> Output
              </span>
              {out.length > 0 && (
                <button onClick={() => setOut([])} className="text-[#64748b] hover:text-[#f8fafc]">
                  Clear
                </button>
              )}
            </PanelHead>
            <div ref={outRef} className="min-h-0 flex-1 overflow-auto bg-[#0a0c11] p-3.5 font-mono text-[13.5px] leading-6">
              {out.length === 0 && phase === "idle" && (
                <p className="text-[#475569]">Output appears here. Press Run to compile and execute.</p>
              )}
              {phase === "compiling" && out.length === 0 && (
                <p className="text-[#94a3b8]">
                  {engine.state === "ready" ? "Compiling…" : "Starting the compiler (first run only)…"}
                </p>
              )}
              {out.map((seg, i) => (
                <Segment key={i} seg={seg} onJump={goToError} />
              ))}
            </div>
            <Footer meta={meta} phase={phase} />
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="rounded-xl border border-[#1e2333] bg-[#11141d] p-5 md:p-6 shadow-xl">
        {workspace}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      <section className="mx-auto max-w-7xl px-5 pt-8 pb-14 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Online Compiler</h1>
            <p className="mt-1.5 max-w-xl text-sm text-[#94a3b8]">
              Write C or C++, press Run. It compiles on your own device, so your code is never uploaded.
            </p>
          </div>
          <EngineStatus engine={engine} pct={pct} />
        </div>

        {workspace}

        <p className="mt-4 max-w-3xl text-xs leading-5 text-[#64748b]">
          Runs on WebAssembly (Clang) inside your browser: programs are limited to {RUN_LIMIT_MS / 1000} seconds and 1 GB
          of memory. Files, networking, threads and C++ exceptions are not supported; a thrown exception ends the
          program. <span className="font-mono">&lt;bits/stdc++.h&gt;</span> works.
        </p>
      </section>
    </main>
  );
}

function EngineStatus({ engine, pct }) {
  if (engine.state === "ready")
    return (
      <div className="inline-flex items-center gap-2 rounded-md border border-[#1e2333] bg-[#11141d] px-3 py-1.5 font-mono text-xs text-[#94a3b8]">
        <span className="h-2 w-2 rounded-full bg-emerald-400" /> Compiler ready
      </div>
    );
  if (engine.state === "error")
    return (
      <div className="max-w-sm rounded-md border border-red-500/40 bg-red-500/10 px-3 py-1.5 font-mono text-xs text-red-300">
        Compiler failed to load. {engine.error}
      </div>
    );
  if (engine.state === "loading")
    return (
      <div className="w-64 rounded-md border border-[#1e2333] bg-[#11141d] px-3 py-2 font-mono text-xs text-[#94a3b8]">
        <div className="flex justify-between">
          <span>{engine.total ? "Downloading compiler" : "Starting compiler"}</span>
          {engine.total > 0 && (
            <span>
              {fmtMB(engine.done)} / {fmtMB(engine.total)} MB
            </span>
          )}
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded bg-[#1e2333]">
          <div
            className={`h-full bg-[var(--accent)] transition-all duration-300 ${engine.total ? "" : "animate-pulse"}`}
            style={{ width: engine.total ? `${pct}%` : "30%" }}
          />
        </div>
      </div>
    );
  return (
    <div className="rounded-md border border-[#1e2333] bg-[#11141d] px-3 py-1.5 font-mono text-xs text-[#94a3b8]">
      Compiler downloads on first Run (large, saved in your browser after that)
    </div>
  );
}

function Segment({ seg, onJump }) {
  if (seg.k === "out") return <pre className="m-0 whitespace-pre-wrap break-words text-[#f8fafc]">{seg.t}</pre>;
  if (seg.k === "err") return <pre className="m-0 whitespace-pre-wrap break-words text-red-400">{seg.t}</pre>;
  if (seg.k === "warn")
    return (
      <div className="mb-2 border-l-2 border-amber-400/70 pl-3">
        <p className="mb-1 text-xs font-semibold tracking-wide text-amber-300 uppercase">Warnings</p>
        <pre className="m-0 whitespace-pre-wrap break-words text-xs leading-5 text-amber-200/80">{seg.t}</pre>
      </div>
    );
  // compile errors: make "main.c:12:5:" clickable
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-wide text-red-400 uppercase">Compilation failed</p>
      <pre className="m-0 whitespace-pre-wrap break-words text-[13px] leading-5 text-red-300">
        {seg.t.split("\n").map((line, i) => {
          const m = line.match(/^(main\.c(?:pp)?):(\d+):(\d+):(.*)$/);
          if (!m) return <span key={i}>{line + "\n"}</span>;
          return (
            <span key={i}>
              <button
                onClick={() => onJump(+m[2], +m[3])}
                className="text-sky-300 underline decoration-sky-300/40 underline-offset-2 hover:decoration-sky-300"
              >{`${m[1]}:${m[2]}:${m[3]}:`}</button>
              {m[4] + "\n"}
            </span>
          );
        })}
      </pre>
    </div>
  );
}

function Footer({ meta, phase }) {
  let text = "";
  let tone = "text-[#64748b]";
  if (phase === "running") {
    text = "Running…";
    tone = "text-[#94a3b8]";
  } else if (meta.failed) {
    text = `Compilation failed · ${fmtMs(meta.compileMs)}`;
    tone = "text-red-400";
  } else if (meta.timedOut) {
    text = "Time limit exceeded";
    tone = "text-red-400";
  } else if (meta.stopped) {
    text = "Stopped";
  } else if (meta.crashed) {
    text = "Crashed";
    tone = "text-red-400";
  } else if (meta.exit !== undefined) {
    text = `Exited with code ${meta.exit} · compiled in ${fmtMs(meta.compileMs)} · ran in ${fmtMs(meta.runMs)}`;
    tone = meta.exit === 0 ? "text-emerald-400" : "text-amber-300";
  }
  return (
    <div className={`flex h-9 shrink-0 items-center border-t border-[#1e2333] px-3.5 font-mono text-xs ${tone}`}>
      {text || " "}
    </div>
  );
}

function PanelHead({ children }) {
  return (
    <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#1e2333] px-3.5 text-xs text-[#94a3b8]">
      {children}
    </div>
  );
}

function Select({ label, value, onChange, options, wide }) {
  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={`rounded-md border border-[#1e2333] bg-[#11141d] px-3 py-2 text-xs text-[#f8fafc] outline-none transition-colors hover:border-[#334155] focus:border-[var(--accent)] ${
          wide ? "max-w-[230px]" : ""
        }`}
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}

function IconBtn({ children, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1e2333] bg-[#11141d] text-[#94a3b8] transition-colors hover:border-[#334155] hover:text-[#f8fafc]"
    >
      {children}
    </button>
  );
}
