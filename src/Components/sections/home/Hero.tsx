/**
 * Hero.tsx  — Scene 0: "Cold Boot"
 * ════════════════════════════════════════════════════════════════
 * THREE-LAYER PARALLAX (Framer Motion useScroll + useTransform)
 * ──────────────────────────────────────────────────────────────
 * Layer 1 — Dot-grid BG   : drifts at ≈ 0.3× scroll speed
 * Layer 2 — NeuralMesh    : drifts at ≈ 0.6× + fades on scroll
 * Layer 3 — Text column   : full scroll speed, opacity-out on exit
 *
 * BOOT SEQUENCE (fires once, 700 ms after mount)
 * ──────────────────────────────────────────────
 * 1. Scan-line sweeps (CSS, globals.css)
 * 2. Eyebrow badge fades up
 * 3. "Welcome to" fades up
 * 4. "KodeinKGP" clip-from-below reveal  ← simultaneous with…
 * 5. Text-scramble decode on the headline
 * 6. FlipWords, quote, body, CTAs stagger in
 * 7. Scroll indicator appears last
 * ════════════════════════════════════════════════════════════════
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

/* Dynamic import — R3F Canvas is browser-only */
const NeuralMesh = dynamic(() => import("./NeuralMesh"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} />,
});

/* ── Text-scramble hook ──────────────────────────────────────────── */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%&";

function useScramble(text: string, trigger: boolean): string {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    let id: ReturnType<typeof setInterval>;

    id = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(iteration)) return char; // locked
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; // random
          })
          .join("")
      );

      iteration += 0.28;
      if (iteration >= text.length) {
        setOutput(text);
        clearInterval(id);
      }
    }, 36);

    return () => clearInterval(id);
  }, [text, trigger]);

  return output || text;
}

/* ── Rotating domain words ───────────────────────────────────────── */
const FLIP_WORDS = [
  "Blockchain",
  "Artificial Intelligence",
  "Web3",
  "Metaverse",
  "Zero-Knowledge",
];

function FlipWords({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % words.length), 3000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient font-semibold"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Corner bracket accent ───────────────────────────────────────── */
type Corner = "tl" | "tr" | "bl" | "br";

function Bracket({ pos, show }: { pos: Corner; show: boolean }) {
  const isTop = pos[0] === "t";
  const isLeft = pos[1] === "l";

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ delay: 0.9 + (isTop ? 0 : 0.08), duration: 0.5 }}
      className={`pointer-events-none absolute z-20 h-7 w-7 ${
        isTop ? "top-2" : "bottom-2"
      } ${isLeft ? "left-2" : "right-2"}`}
      style={{
        borderTop: isTop ? "1px solid rgba(0,229,255,0.38)" : undefined,
        borderBottom: !isTop ? "1px solid rgba(0,229,255,0.38)" : undefined,
        borderLeft: isLeft ? "1px solid rgba(0,229,255,0.38)" : undefined,
        borderRight: !isLeft ? "1px solid rgba(0,229,255,0.38)" : undefined,
      }}
    />
  );
}

/* ── Scroll cue ──────────────────────────────────────────────────── */
function ScrollCue({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
        }}
      >
        scroll
      </span>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-8 w-5 items-start justify-center rounded-full pt-1.5"
        style={{ border: "1px solid rgba(255,255,255,0.14)" }}
      >
        <div
          className="h-1.5 w-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.30)" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Hero component
   ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Boot state — fires 700 ms after mount (after CSS scan-line) */
  const [boot, setBoot] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBoot(true), 700);
    return () => clearTimeout(t);
  }, []);

  /* Scrambled headline */
  const headline = useScramble("KodeinKGP", boot);

  /* ── Scroll-linked parallax ─────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Layer 1 — BG drifts DOWN (appears to scroll slower → depth) */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);

  /* Layer 2 — Mesh slight drift + fade out */
  const meshY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  /* Layer 3 — Text fades out as hero exits */
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -32]);

  /* Shared inline-style helpers (immune to Tailwind purge) */
  const mono = (extra?: object) => ({
    fontFamily: "var(--font-mono)",
    fontSize: "0.67rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    ...extra,
  });
  const display = (extra?: object) => ({
    fontFamily: "var(--font-grotesk)",
    ...extra,
  });
  const body = (extra?: object) => ({
    fontFamily: "var(--font-dm)",
    ...extra,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* ══════════════════════════════════════════════════════════
          LAYER 1 — Deep background (0.3× parallax)
          ══════════════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,229,255,0.115) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Radial cyan glow — centre of viewport */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(0,123,255,0.07) 0%, transparent 68%)",
          }}
        />
        {/* Ambient orbs */}
        <div
          className="absolute -top-28 -right-28 h-[580px] w-[580px] rounded-full"
          style={{ background: "rgba(0,229,255,0.045)", filter: "blur(120px)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 h-[480px] w-[480px] rounded-full"
          style={{ background: "rgba(0,123,255,0.055)", filter: "blur(110px)" }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          MAIN FLEX CONTAINER
          ══════════════════════════════════════════════════════════ */}
      <div
        className="section-container relative z-10 flex flex-col items-center gap-10 py-20 md:flex-row md:gap-0 md:py-0"
        style={{ minHeight: "100dvh" }}
      >
        {/* ── LAYER 3: Text column ───────────────────────────────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="flex w-full flex-col items-start justify-center text-left md:w-[52%] md:pr-12"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={boot ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-7"
          >
            <span
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
              style={{
                border: "1px solid rgba(0,229,255,0.20)",
                background: "rgba(0,229,255,0.05)",
                ...mono({ color: "rgba(0,229,255,0.65)" }),
              }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{
                  background: "#00E5FF",
                  boxShadow: "0 0 8px rgba(0,229,255,0.95)",
                }}
              />
              Web3.0 · Blockchain · AI · IIT Kharagpur
            </span>
          </motion.div>

          {/* "Welcome to" */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={boot ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={display({
              fontWeight: 300,
              fontSize: "clamp(1rem, 2.4vw, 1.5rem)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              marginBottom: "0.4rem",
            })}
          >
            Welcome to
          </motion.p>

          {/* ── "KodeinKGP" — clip-from-below + scramble decode ── */}
          <div
            className="mb-8 overflow-hidden"
            style={{ paddingBottom: "0.08em" }}
          >
            <motion.h1
              initial={{ y: "106%" }}
              animate={boot ? { y: "0%" } : {}}
              transition={{
                duration: 1.0,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={display({
                fontWeight: 800,
                fontSize: "clamp(3.4rem, 10.5vw, 8.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.93,
                willChange: "transform",
              })}
            >
              <span className="text-gradient">{headline}</span>
            </motion.h1>
          </div>

          {/* FlipWords rotating domain line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={boot ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.95 }}
            style={body({
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.40)",
              marginBottom: "1.1rem",
            })}
          >
            Exploring <FlipWords words={FLIP_WORDS} /> at IIT Kharagpur
          </motion.p>

          {/* Italic quote */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={boot ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.08, ease: [0.16, 1, 0.3, 1] }}
            style={body({
              fontStyle: "italic",
              fontSize: "0.875rem",
              lineHeight: 1.72,
              color: "rgba(0,229,255,0.48)",
              maxWidth: "28rem",
              marginBottom: "0.9rem",
            })}
          >
            &ldquo;The Web as I envisaged it, we have not seen it yet. The
            future is still so much bigger than the past.&rdquo;
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={boot ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={body({
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.40)",
              maxWidth: "32rem",
              marginBottom: "2.2rem",
            })}
          >
            A student-run society spreading awareness about Web 3.0 and future
            technologies. Workshops, hackathons, and real-world projects with{" "}
            <span style={{ color: "rgba(255,255,255,0.72)", fontWeight: 500 }}>
              Blockchain
            </span>{" "}
            and{" "}
            <span style={{ color: "rgba(255,255,255,0.72)", fontWeight: 500 }}>
              Artificial Intelligence
            </span>
            .
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={boot ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.34, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/regform"
              className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.97]"
              style={body({
                fontSize: "0.875rem",
                padding: "0.72rem 1.75rem",
                background: "#00E5FF",
                color: "#040814",
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#4DF7FF";
                el.style.boxShadow = "0 0 36px rgba(0,229,255,0.48)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#00E5FF";
                el.style.boxShadow = "none";
              }}
            >
              Sophomore&apos;s Selections
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.97]"
              style={body({
                fontSize: "0.875rem",
                padding: "0.72rem 1.75rem",
                border: "1px solid rgba(0,229,255,0.28)",
                color: "#4DF7FF",
                background: "rgba(0,229,255,0.05)",
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(0,229,255,0.65)";
                el.style.background = "rgba(0,229,255,0.10)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(0,229,255,0.28)";
                el.style.background = "rgba(0,229,255,0.05)";
              }}
            >
              View Events
            </Link>
          </motion.div>
        </motion.div>

        {/* ── LAYER 2: NeuralMesh column (0.6× parallax) ────────── */}
        <motion.div
          style={{ y: meshY, opacity: meshOpacity }}
          className="relative h-[360px] w-full md:h-[560px] md:w-[48%]"
        >
          {/* Radial mask — fades edges of the canvas */}
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
            }}
          >
            <NeuralMesh />
          </div>

          {/* Corner brackets */}
          {(["tl", "tr", "bl", "br"] as Corner[]).map((p) => (
            <Bracket key={p} pos={p} show={boot} />
          ))}
        </motion.div>
      </div>
      {/* /section-container */}

      {/* Scroll cue */}
      <ScrollCue show={boot} />

      {/* Bottom gradient fade to next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, #040814, transparent)" }}
      />
    </section>
  );
}
