"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const FLIP_WORDS = [
  "Blockchain",
  "Artificial Intelligence",
  "Web3",
  "Metaverse",
  "Decentralization",
];

/* ── Rotating domain words ───────────────────────────────────────── */
function FlipWords({ words }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((p) => (p + 1) % words.length),
      2800
    );
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient font-semibold"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Animated scroll indicator ───────────────────────────────────── */
function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
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
          style={{ background: "rgba(255,255,255,0.32)" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Corner bracket decoration ───────────────────────────────────── */
function CornerBracket({ pos }) {
  const cls = {
    tl: "top-3 left-3",
    tr: "top-3 right-3",
    bl: "bottom-3 left-3",
    br: "bottom-3 right-3",
  }[pos];
  const border = {
    tl: { borderTop: "1px solid rgba(17,227,251,0.38)", borderLeft: "1px solid rgba(17,227,251,0.38)" },
    tr: { borderTop: "1px solid rgba(17,227,251,0.38)", borderRight: "1px solid rgba(17,227,251,0.38)" },
    bl: { borderBottom: "1px solid rgba(17,227,251,0.38)", borderLeft: "1px solid rgba(17,227,251,0.38)" },
    br: { borderBottom: "1px solid rgba(17,227,251,0.38)", borderRight: "1px solid rgba(17,227,251,0.38)" },
  }[pos];
  return (
    <div
      className={`pointer-events-none absolute h-7 w-7 ${cls}`}
      style={border}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">

      {/* ── Dot grid ────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(17,227,251,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.9,
        }}
      />

      {/* ── Left radial glow ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 62% at 12% 52%, rgba(17,227,251,0.10) 0%, transparent 68%)",
        }}
      />

      {/* ── Ambient orbs ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
          style={{
            background: "rgba(17,227,251,0.06)",
            filter: "blur(110px)",
          }}
        />
        <div
          className="absolute -left-16 bottom-0 h-[380px] w-[380px] rounded-full"
          style={{
            background: "rgba(33,138,203,0.07)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="section-container relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center gap-12 py-16 md:flex-row md:gap-0 md:py-0">

        {/* LEFT — text content */}
        <div className="flex w-full flex-col items-start justify-center text-left md:w-[52%] md:pr-12">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7"
          >
            <span
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
              style={{
                border: "1px solid rgba(17,227,251,0.22)",
                background: "rgba(17,227,251,0.06)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.67rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(17,227,251,0.68)",
              }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{
                  background: "#11E3FB",
                  boxShadow: "0 0 8px rgba(17,227,251,0.9)",
                }}
              />
              Web3.0 · Blockchain · AI · IIT Kharagpur
            </span>
          </motion.div>

          {/* "WELCOME TO" */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mb-1 font-kanit font-light uppercase"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Welcome to
          </motion.p>

          {/* "KodeinKGP" — dramatic clip-from-below reveal */}
          <div
            className="mb-8 overflow-hidden leading-none"
            style={{ paddingBottom: "0.06em" }}
          >
            <motion.h1
              initial={{ y: "106%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.95,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-gradient font-kanit font-black uppercase leading-none"
              style={{
                fontSize: "clamp(3.4rem, 10.5vw, 8.5rem)",
                letterSpacing: "-0.01em",
                willChange: "transform",
              }}
            >
              KodeinKGP
            </motion.h1>
          </div>

          {/* FlipWords line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.42)",
              marginBottom: "1.2rem",
            }}
          >
            Exploring <FlipWords words={FLIP_WORDS} /> at IIT Kharagpur
          </motion.p>

          {/* Italic quote */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "0.875rem",
              fontStyle: "italic",
              lineHeight: "1.7",
              color: "rgba(91,230,255,0.52)",
              maxWidth: "28rem",
              marginBottom: "1rem",
            }}
          >
            &ldquo;The Web as I envisaged it, we have not seen it yet. The future
            is still so much bigger than the past.&rdquo;
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "0.875rem",
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.44)",
              maxWidth: "32rem",
              marginBottom: "2.25rem",
            }}
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

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.44, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/regform"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3 font-poppins text-sm font-semibold transition-all duration-300 active:scale-[0.97]"
              style={{
                background: "#11E3FB",
                color: "#01011B",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5BE6FF";
                e.currentTarget.style.boxShadow =
                  "0 0 32px rgba(17,227,251,0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#11E3FB";
                e.currentTarget.style.boxShadow = "none";
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
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-poppins text-sm font-semibold transition-all duration-300 active:scale-[0.97]"
              style={{
                border: "1px solid rgba(17,227,251,0.32)",
                color: "#5BE6FF",
                background: "rgba(17,227,251,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(17,227,251,0.62)";
                e.currentTarget.style.background = "rgba(17,227,251,0.11)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(17,227,251,0.32)";
                e.currentTarget.style.background = "rgba(17,227,251,0.05)";
              }}
            >
              View Events
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — particle field */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[340px] w-full overflow-hidden rounded-[2rem] md:h-[540px] md:w-[48%]"
          style={{
            maskImage:
              "radial-gradient(ellipse 88% 88% at 50% 50%, black 58%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 88% 88% at 50% 50%, black 58%, transparent 100%)",
          }}
        >
          {/* Corner brackets — techy accent */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {["tl", "tr", "bl", "br"].map((p) => (
              <CornerBracket key={p} pos={p} />
            ))}
          </div>

          <ParticleField />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <ScrollCue />

      {/* Bottom fade to next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to top, #01011B, transparent)" }}
      />
    </section>
  );
}
