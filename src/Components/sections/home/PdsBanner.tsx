/**
 * PdsBanner.tsx — Scene 4: "The Gateway"
 * ════════════════════════════════════════════════════════════════
 * Cinematic reveal: entire banner scales from 88% → 100% width
 * while un-blurring (8px → 0) as it enters the viewport.
 * Text layers stagger in after the container settles.
 * CTA button: moving conic-gradient border that orbits on a
 * 3-second loop — zero JS, pure CSS animation.
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import programmer from "../../../../public/programmer-image.png";

/* ── Moving-border CTA ────────────────────────────────────────── */
function MovingBorderButton() {
  return (
    /* Outer pill clips the rotating gradient to create a slim border */
    <div className="rounded-pill relative inline-flex overflow-hidden p-[1.5px]">
      {/* Rotating conic gradient — uses Tailwind's built-in "spin" keyframe */}
      <div
        className="absolute inset-[-120%] animate-spin"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #00E5FF 90deg, #007BFF 180deg, transparent 270deg)",
          animationDuration: "3s",
        }}
      />
      {/* Button face, sits above the rotating layer */}
      <Link
        href="/pds"
        className="group/btn rounded-pill relative flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors duration-300"
        style={{ background: "#040814", fontFamily: "var(--font-grotesk)" }}
      >
        <span className="text-white/85 transition-colors duration-200 group-hover/btn:text-cyan-400">
          Explore PDS Bank
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="text-white/60 transition-transform duration-200 group-hover/btn:translate-x-1 group-hover/btn:text-cyan-400"
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
    </div>
  );
}

/* ── Framer variants ──────────────────────────────────────────── */

/* Container: scale-X + blur cinematic reveal */
const bannerVariants = {
  hidden: { opacity: 0, scaleX: 0.88, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scaleX: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.1,
      delayChildren: 0.38,
    },
  },
};

/* Child text lines: fade-up */
const lineVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ── Main export ──────────────────────────────────────────────── */
export default function PdsBanner() {
  return (
    <section className="section-container py-10 md:py-16">
      <motion.div
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{ transformOrigin: "center" }}
      >
        <div className="rounded-card-lg glass-brand relative overflow-hidden p-8 md:p-12">
          {/* Ambient inner radial glow */}
          <div
            className="rounded-card-lg pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 65% at 25% 50%, rgba(0,229,255,0.07), transparent 70%)",
            }}
          />

          {/* Dot-grid texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,229,255,0.13) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
            {/* ── Text column ─────────────────────────────────────── */}
            <div className="max-w-lg text-center md:text-left">
              <motion.p variants={lineVariants} className="mono-label mb-3">
                Programming Data Structures
              </motion.p>

              <motion.h2
                variants={lineVariants}
                className="text-gradient mb-3 font-bold"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                }}
              >
                Still Getting Stuck in PDS?
              </motion.h2>

              <motion.p
                variants={lineVariants}
                style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "0.9rem",
                  lineHeight: "1.7",
                  color: "rgba(255,255,255,0.52)",
                  marginBottom: "1.5rem",
                }}
              >
                Our curated set of 260+ problems covers every topic you need —
                from arrays and linked lists to trees, graphs, and dynamic
                programming.
              </motion.p>

              <motion.div variants={lineVariants}>
                <MovingBorderButton />
              </motion.div>
            </div>

            {/* ── Illustration ────────────────────────────────────── */}
            <motion.div
              variants={lineVariants}
              className="w-48 flex-shrink-0 md:w-64"
            >
              <Image
                src={programmer}
                alt="Programmer illustration"
                className="drop-shadow-[0_0_30px_rgba(17,227,251,0.25)] transition-transform duration-500 hover:scale-105"
                priority={false}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
