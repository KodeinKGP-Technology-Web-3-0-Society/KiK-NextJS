/**
 * StatsBar.tsx — Scene 2: "Signal Lock"
 * ════════════════════════════════════════════════════════════════
 * Each of the 4 stat cards flies in from a different compass direction
 * (left, top, bottom, right), then "locks" with a cyan flash and a
 * status pill transition from "SYNC..." → "✓ LOCKED".
 * Count-up and signal bars animate only after each card locks.
 * HUD header reads "ACQUIRING_SIGNAL..." → "ALL_SYSTEMS_NOMINAL".
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate, motion, AnimatePresence } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  desc: string;
}

const STATS: Stat[] = [
  {
    label: "// pds_problems",
    value: 260,
    suffix: "+",
    desc: "Curated problems across every DSA topic",
  },
  {
    label: "// articles",
    value: 17,
    suffix: "+",
    desc: "In-depth technical articles published",
  },
  {
    label: "// events_hosted",
    value: 15,
    suffix: "+",
    desc: "Workshops, hackathons & competitions",
  },
  {
    label: "// community",
    value: 7000,
    suffix: "+",
    desc: "Students in our growing network",
  },
];

/* Entry direction per card: left ← top ↑ bottom ↓ right → */
const ENTRY: { x: number; y: number }[] = [
  { x: -110, y: 0 },
  { x: 0, y: -70 },
  { x: 0, y: 70 },
  { x: 110, y: 0 },
];

const BAR_H = [28, 55, 40, 75, 50, 68, 88, 60];

/* ── Animated signal bars ─────────────────────────────────────── */
function SignalBars({ locked }: { locked: boolean }) {
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 20 }}>
      {BAR_H.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={locked ? { scaleY: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.38,
            delay: i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            width: 3,
            height: `${h}%`,
            borderRadius: 2,
            background: "rgba(17,227,251,0.24)",
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

/* ── Count-up (direct DOM write — zero re-renders) ───────────── */
function CountUp({
  to,
  suffix,
  locked,
}: {
  to: number;
  suffix: string;
  locked: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!locked || !spanRef.current) return;
    const node = spanRef.current;
    const ctrl = animate(0, to, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent =
          (to >= 1000
            ? Math.round(v).toLocaleString()
            : String(Math.round(v))) + suffix;
      },
    });
    return ctrl.stop;
  }, [locked, to, suffix]);

  return (
    <span ref={spanRef} className="tabular-nums">
      0{suffix}
    </span>
  );
}

/* ── Individual stat cell ─────────────────────────────────────── */
function StatCell({
  label,
  value,
  suffix,
  desc,
  index,
}: Stat & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const [locked, setLocked] = useState(false);
  const [flash, setFlash] = useState(false);
  const isLast = index === STATS.length - 1;

  useEffect(() => {
    if (!inView) return;
    /* Spring travel ≈ 750 ms + per-card stagger, then brief flash → lock */
    const travelMs = 800 + index * 120;
    let flashTimer: ReturnType<typeof setTimeout>;

    const t = setTimeout(() => {
      setFlash(true);
      flashTimer = setTimeout(() => {
        setFlash(false);
        setLocked(true);
      }, 210);
    }, travelMs);

    return () => {
      clearTimeout(t);
      clearTimeout(flashTimer!);
    };
  }, [inView, index]);

  const { x, y } = ENTRY[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 170,
        damping: 20,
        delay: index * 0.12,
      }}
      className="relative flex flex-col px-6 py-6"
    >
      {/* Cyan flash overlay on lock-in */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0.45 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.22 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: "rgba(0,229,255,0.13)",
              borderRadius: "inherit",
            }}
          />
        )}
      </AnimatePresence>

      {/* Vertical column divider */}
      {!isLast && (
        <div
          className="absolute top-1/2 right-0 hidden h-14 w-px -translate-y-1/2 md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(17,227,251,0.18), transparent)",
          }}
        />
      )}

      {/* Label row + status pill */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            color: "rgba(17,227,251,0.42)",
          }}
        >
          {label}
        </span>

        <AnimatePresence mode="wait">
          {locked ? (
            <motion.span
              key="locked"
              initial={{ opacity: 0, x: 6, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.48rem",
                letterSpacing: "0.12em",
                color: "#00E5FF",
                border: "1px solid rgba(0,229,255,0.32)",
                borderRadius: 3,
                padding: "0.1rem 0.38rem",
                background: "rgba(0,229,255,0.07)",
              }}
            >
              ✓ LOCKED
            </motion.span>
          ) : inView ? (
            <motion.span
              key="sync"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ repeat: Infinity, duration: 0.85 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.48rem",
                letterSpacing: "0.12em",
                color: "rgba(0,229,255,0.4)",
                border: "1px solid rgba(0,229,255,0.14)",
                borderRadius: 3,
                padding: "0.1rem 0.38rem",
              }}
            >
              SYNC...
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Giant count */}
      <span
        className="leading-none"
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 900,
          fontSize: "clamp(1.9rem, 4vw, 3rem)",
          background: "linear-gradient(135deg, #11E3FB 20%, #5BE6FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.6rem",
          display: "block",
        }}
      >
        <CountUp to={value} suffix={suffix} locked={locked} />
      </span>

      {/* Signal bars */}
      <SignalBars locked={locked} />

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "0.72rem",
          lineHeight: "1.55",
          color: "rgba(255,255,255,0.38)",
          marginTop: "0.5rem",
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

/* ── HUD section header ───────────────────────────────────────── */
function HudHeader({ allLocked }: { allLocked: boolean }) {
  return (
    <div className="mb-1.5 flex items-center justify-between px-1">
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.56rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: "rgba(0,229,255,0.3)",
        }}
      >
        {"< "}SIGNAL_LOCK{" >"}
      </span>

      <AnimatePresence mode="wait">
        {allLocked ? (
          <motion.span
            key="nominal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "#00E5FF",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#00E5FF",
                display: "inline-block",
                boxShadow: "0 0 7px #00E5FF",
              }}
            />
            ALL_SYSTEMS_NOMINAL
          </motion.span>
        ) : (
          <motion.span
            key="acquiring"
            animate={{ opacity: [0.3, 0.85, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.3 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "rgba(0,229,255,0.4)",
            }}
          >
            ACQUIRING_SIGNAL...
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────── */
export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [lockedCount, setLockedCount] = useState(0);

  /* Track globally-locked count to flip header status */
  useEffect(() => {
    if (!sectionView) return;
    const timers = STATS.map((_, i) => {
      const delay = 800 + i * 120 + 210 + 20; // matches per-cell timing
      return setTimeout(() => setLockedCount((c) => c + 1), delay);
    });
    return () => timers.forEach(clearTimeout);
  }, [sectionView]);

  const allLocked = lockedCount >= STATS.length;

  return (
    <section ref={sectionRef} className="section-container py-12 md:py-16">
      <HudHeader allLocked={allLocked} />

      <div
        className="rounded-card overflow-hidden transition-[border-color] duration-500"
        style={{
          background: "rgba(10,10,46,0.55)",
          border: `1px solid ${allLocked ? "rgba(17,227,251,0.14)" : "rgba(17,227,251,0.07)"}`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCell key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
