/**
 * TerminalEasterEgg.tsx — Scene 6: "Wow Factor"
 * ════════════════════════════════════════════════════════════════
 * Global backtick [ ` ] listener opens a slide-up transparent
 * terminal docked to the bottom of the viewport.
 *
 * Commands
 * ────────
 *   help                  — list commands
 *   whoami                — ASCII art + society info
 *   ls domains            — list our 3 domains
 *   run ai_model          — deploy a fake neural net (w/ progress)
 *   fetch_events          — pull recent events from JSON
 *   join                  — how to join → redirects /join
 *   sudo make me a sandwich
 *   clear                 — wipe terminal
 *   exit                  — close terminal
 *
 * Discovery
 * ─────────
 * A pulsing [ ` ] TERMINAL hint button appears at bottom-right
 * 3 s after mount. It stays as a persistent soft CTA.
 * Clicking it OR pressing ` toggles the terminal.
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import eventsData from "@/data/events/EventsData.json";

/* ── Types ─────────────────────────────────────────────────────── */
type LineEntry =
  | { kind: "cmd"; text: string }
  | { kind: "out"; lines: string[] }
  | { kind: "err"; text: string };

/* ── Static command text ────────────────────────────────────────── */
const PROMPT = "visitor@kodeinkgp:~$";

const WELCOME: string[] = [
  "  ╔══════════════════════════════════════════════╗",
  "  ║   KodeinKGP Terminal  v1.0.0                 ║",
  "  ║   IIT Kharagpur — Web3.0 & Technology Society║",
  "  ╚══════════════════════════════════════════════╝",
  "",
  "  Type 'help' for available commands.",
  "  Press [ ` ] or [ Esc ] to close.",
  "",
];

const HELP: string[] = [
  "  Available commands:",
  "  ──────────────────────────────────────────────",
  "  help                   Show this message",
  "  whoami                 Who is KodeinKGP?",
  "  ls domains             List our tech domains",
  "  run ai_model           Deploy a neural network",
  "  fetch_events           Recent events",
  "  join                   How to join us",
  "  sudo make me a sandwich",
  "  clear                  Wipe terminal",
  "  exit                   Close terminal",
  "",
  "  Tip: press [ ` ] to toggle at any time.",
];

const WHOAMI: string[] = [
  "  ██╗  ██╗ ██████╗ ██████╗ ███████╗██╗███╗   ██╗",
  "  ██║ ██╔╝██╔═══██╗██╔══██╗██╔════╝██║████╗  ██║",
  "  █████╔╝ ██║   ██║██║  ██║█████╗  ██║██╔██╗ ██║",
  "  ██╔═██╗ ██║   ██║██║  ██║██╔══╝  ██║██║╚██╗██║",
  "  ██║  ██╗╚██████╔╝██████╔╝███████╗██║██║ ╚████║",
  "  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝",
  "",
  "  Web 3.0 & Technology Society — IIT Kharagpur",
  "  ──────────────────────────────────────────────",
  "  Founded  :  2021",
  "  Members  :  7,000+",
  "  Domains  :  Blockchain · AI/ML · Web Dev",
  "  Mission  :  Building the decentralised future.",
  "",
  '  "We don\'t just learn tech. We build it."',
];

const LS_DOMAINS: string[] = [
  "  drwxr-xr-x  blockchain/",
  "    └── Solidity · DeFi · ZK-Proofs · Smart Contracts",
  "",
  "  drwxr-xr-x  ai_metaverse/",
  "    └── LLMs · Computer Vision · Neural Nets · AR/VR",
  "",
  "  drwxr-xr-x  web_dev/",
  "    └── Next.js · React · Node.js · Full-Stack",
  "",
  "  3 domains  ·  1 society  ·  ∞ possibilities",
];

const AI_MODEL: string[] = [
  "  Connecting to KGP compute cluster...",
  "",
  "  [████░░░░░░░░]  33%  Loading model weights",
  "  [████████░░░░]  66%  Compiling CUDA layers",
  "  [████████████] 100%  Inference engine ready",
  "",
  "  >> Model     :  KGP-GPT-v0.1  (experimental)",
  "  >> Params    :  420 Million",
  "  >> Trained on:  IIT KGP course corpus",
  "  >> Status    :  ONLINE ✓",
  "",
  "  Access is restricted to members.",
  "  Run 'join' to apply.",
];

const JOIN: string[] = [
  "  KodeinKGP Recruitment Portal",
  "  ──────────────────────────────────────────────",
  "  Open tracks:",
  "    [1] Web Development",
  "    [2] Blockchain Research",
  "    [3] AI / ML Lab",
  "    [4] Content & Community",
  "",
  "  How to apply:",
  "    1.  kodeinkgp.com/join  → fill the form",
  "    2.  Clear the technical screening",
  "    3.  Ship something cool in the interview",
  "",
  "  Redirecting to /join in 3 s...",
];

const SANDWICH: string[] = [
  "  Checking sudoers file...",
  "  sudo: visitor is not in the sudoers file.",
  "  This incident will be reported. (just kidding.)",
  "",
  "  Fine. Here:",
  "",
  "      ______________________________",
  "     /                              \\",
  "    |   ≈ ≈ ≈ ≈  BREAD  ≈ ≈ ≈ ≈ ≈   |",
  "    |   - - - -  CHEESE - - - - -   |",
  "    |   ~ ~ ~ ~  LETTUCE ~ ~ ~ ~ ~  |",
  "    |   = = = =  TOMATO  = = = = =  |",
  "    |   ≈ ≈ ≈ ≈  BREAD  ≈ ≈ ≈ ≈ ≈   |",
  "     \\______________________________/",
  "",
  "  🥪  Enjoy your sandwich.",
];

/* ── Hint button ─────────────────────────────────────────────── */
function HintButton({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="hint"
          onClick={onClick}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-pill fixed right-6 bottom-6 z-40 flex cursor-pointer items-center gap-2 border border-cyan-400/20 px-3 py-1.5 backdrop-blur-md transition-colors duration-200 hover:border-cyan-400/45 hover:bg-[rgba(0,229,255,0.05)]"
          style={{ background: "rgba(4,8,20,0.82)" }}
          aria-label="Open terminal"
        >
          {/* Blinking cursor icon */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#00E5FF",
              lineHeight: 1,
            }}
          >
            _
          </motion.span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "rgba(0,229,255,0.5)",
            }}
          >
            [ ` ] terminal
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LineEntry[]>([
    { kind: "out", lines: WELCOME },
  ]);
  const [processing, setProcessing] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const router = useRouter();

  /* Sync ref so stable keydown handler can read latest open state */
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  /* Global backtick / Escape listener */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "`") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && openRef.current) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Focus the input whenever the terminal opens */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Auto-scroll to bottom on new history entries */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, processing]);

  /* Command processor */
  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const lower = cmd.toLowerCase();

      if (!cmd) return;

      setCmdHistory((prev) => [lower, ...prev]);
      setHistIdx(-1);
      setHistory((prev) => [...prev, { kind: "cmd", text: cmd }]);
      setInput("");

      if (lower === "clear") {
        setHistory([]);
        return;
      }

      if (lower === "exit") {
        setOpen(false);
        return;
      }

      /* Commands with artificial async delay */
      const asyncMap: Record<string, number> = {
        "run ai_model": 1800,
        fetch_events: 900,
        join: 800,
      };

      if (lower in asyncMap) {
        setProcessing(true);
        setTimeout(() => {
          setProcessing(false);
          let lines: string[] = [];

          if (lower === "run ai_model") {
            lines = AI_MODEL;
          } else if (lower === "fetch_events") {
            const recent = (
              eventsData as Array<{ heading: string; description: string }>
            )
              .slice(-3)
              .reverse();
            lines = [
              "  Fetching from KodeinKGP API...",
              "",
              "  Recent Events",
              "  ──────────────────────────────────────────────",
              ...recent.flatMap((ev, i) => [
                `  [${i + 1}] ${ev.heading}`,
                `       ${ev.description.slice(0, 68)}...`,
                "",
              ]),
              "  → Visit /events for the full list.",
            ];
          } else if (lower === "join") {
            lines = JOIN;
            setTimeout(() => router.push("/join"), 3100);
          }

          setHistory((prev) => [...prev, { kind: "out", lines }]);
        }, asyncMap[lower]);
        return;
      }

      /* Static commands */
      const map: Record<string, string[]> = {
        help: HELP,
        whoami: WHOAMI,
        "ls domains": LS_DOMAINS,
        ls: ["  Usage: ls <path>", "  Try:   ls domains"],
        "sudo make me a sandwich": SANDWICH,
      };

      const lines = map[lower];
      if (lines) {
        setHistory((prev) => [...prev, { kind: "out", lines }]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            kind: "err",
            text: `${cmd}: command not found.  Try 'help'.`,
          },
        ]);
      }
    },
    [router]
  );

  /* Input key handler */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx);
      setInput(cmdHistory[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : (cmdHistory[idx] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completions = [
        "help",
        "whoami",
        "ls domains",
        "run ai_model",
        "fetch_events",
        "join",
        "sudo make me a sandwich",
        "clear",
        "exit",
      ];
      const match = completions.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  /* Line colour resolver */
  const lineColor = (line: string): string => {
    if (line.includes("██") || line.includes("──"))
      return "rgba(0,229,255,0.75)";
    if (line.includes("100%") || line.includes("✓") || line.includes("ONLINE"))
      return "#22c55e";
    if (line.startsWith("  >>")) return "#a78bfa";
    if (line.startsWith('  "')) return "rgba(255,255,255,0.55)";
    if (line.startsWith("  [") && /\[[\d]+\]/.test(line))
      return "rgba(255,255,255,0.75)";
    return "rgba(255,255,255,0.58)";
  };

  return (
    <>
      {/* Hint button — hides when terminal is open */}
      {!open && <HintButton onClick={() => setOpen(true)} />}

      {/* Terminal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col"
            style={{
              height: "clamp(320px, 65vh, 600px)",
              background: "rgba(4,8,20,0.96)",
              borderTop: "1px solid rgba(0,229,255,0.14)",
              backdropFilter: "blur(36px)",
              boxShadow:
                "0 -24px 80px rgba(0,229,255,0.07), 0 -1px 0 rgba(0,229,255,0.1)",
            }}
          >
            {/* ── Title bar ───────────────────────────────────── */}
            <div
              className="flex flex-shrink-0 items-center justify-between px-5 py-2.5"
              style={{ borderBottom: "1px solid rgba(0,229,255,0.08)" }}
            >
              {/* macOS-style traffic lights + title */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setOpen(false)}
                    className="transition-brightness flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F57] hover:brightness-125"
                    aria-label="Close terminal"
                  />
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E] opacity-60" />
                  <div className="h-3 w-3 rounded-full bg-[#28C840] opacity-60" />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "rgba(0,229,255,0.38)",
                    letterSpacing: "0.08em",
                  }}
                >
                  kodeinkgp — terminal
                </span>
              </div>

              {/* Close hint */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.18)",
                }}
              >
                [ esc ] or [ ` ] to close
              </span>
            </div>

            {/* ── Output scroll area ──────────────────────────── */}
            <div
              className="flex-1 overflow-y-auto px-5 py-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0,229,255,0.12) transparent",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((entry, i) => {
                if (entry.kind === "cmd") {
                  return (
                    <div key={i} className="flex gap-2 leading-relaxed">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.8rem",
                          color: "rgba(0,229,255,0.58)",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {PROMPT}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {entry.text}
                      </span>
                    </div>
                  );
                }

                if (entry.kind === "out") {
                  return (
                    <div key={i} className="mb-1">
                      {entry.lines.map((line, j) => (
                        <div
                          key={j}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.78rem",
                            lineHeight: "1.75",
                            color: lineColor(line),
                            whiteSpace: "pre",
                          }}
                        >
                          {line === "" ? " " : line}
                        </div>
                      ))}
                    </div>
                  );
                }

                if (entry.kind === "err") {
                  return (
                    <div
                      key={i}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        lineHeight: "1.75",
                        color: "#FF5F57",
                      }}
                    >
                      bash: {entry.text}
                    </div>
                  );
                }

                return null;
              })}

              {/* Async processing indicator */}
              {processing && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 0.75 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "rgba(0,229,255,0.45)",
                  }}
                >
                  Processing...
                </motion.div>
              )}

              {/* Scroll anchor */}
              <div ref={bottomRef} />
            </div>

            {/* ── Input row ───────────────────────────────────── */}
            <div
              className="flex flex-shrink-0 items-center gap-3 px-5 py-3"
              style={{ borderTop: "1px solid rgba(0,229,255,0.08)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "rgba(0,229,255,0.58)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {PROMPT}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={processing}
                placeholder="type a command…"
                className="flex-1 bg-transparent outline-none placeholder:text-white/[0.12]"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.88)",
                  caretColor: "#00E5FF",
                }}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
