/**
 * CustomCursor.tsx
 * ════════════════════════════════════════════════════════════════
 * Two-layer custom cursor:
 *   • Dot   — exact 1:1 mouse tracking (no lag)
 *   • Ring  — lags behind with Framer Motion useSpring
 *
 * Interaction states:
 *   • Default  : dot solid + ring translucent
 *   • Pointer  : dot hidden, ring expands 1.7x with brighter border
 *   • Click    : fire-and-forget ripple via key-remount trick
 *
 * Mounted guard prevents SSR mismatch.
 * Touch-device guard removes the cursor entirely on mobile.
 * ════════════════════════════════════════════════════════════════
 */

"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ── Constants ───────────────────────────────────────────────────── */
const DOT_SIZE = 8; // px
const RING_SIZE = 36; // px
const SPRING = { stiffness: 360, damping: 26, mass: 0.5 } as const;

/* ── Ripple: key-remounted on every click so the animation re-fires ─ */
interface RippleProps {
  id: number;
  x: number;
  y: number;
}

function Ripple({ x, y }: RippleProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scale: 0.4, opacity: 0.9 }}
      animate={{ scale: 3.0, opacity: 0 }}
      exit={{}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: y - RING_SIZE / 2,
        left: x - RING_SIZE / 2,
        width: RING_SIZE,
        height: RING_SIZE,
        borderRadius: "50%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0,229,255,0.75)",
        pointerEvents: "none",
        zIndex: 99997,
      }}
    />
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [ripples, setRipples] = useState<RippleProps[]>([]);

  /* Dot tracks mouse exactly */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* Ring lags behind with spring */
  const ringX = useSpring(mouseX, SPRING);
  const ringY = useSpring(mouseY, SPRING);

  useEffect(() => {
    setMounted(true);
    setIsTouch(window.matchMedia("(hover: none)").matches);

    /* ── Mouse move ── */
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    /* ── Pointer detection — crawl up DOM to find interactive ancestor ── */
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const hit = target.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="pointer"]'
      );
      setIsPointer(!!hit);
    };

    /* ── Visibility ── */
    const onDocLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const onDocEnter = () => setVisible(true);

    /* ── Click ripple — keep last 3 ripples ── */
    const onDown = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [
        ...prev.slice(-2),
        { id, x: e.clientX, y: e.clientY },
      ]);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);
    window.addEventListener("mousedown", onDown);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
      window.removeEventListener("mousedown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Prune old ripples after they finish animating */
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => setRipples((p) => p.slice(1)), 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* ── Dot — exact tracking, no spring ─────────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: visible ? 1 : 0,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
        style={{
          x: mouseX,
          y: mouseY,
          position: "fixed",
          top: 0,
          left: 0,
          marginLeft: -(DOT_SIZE / 2),
          marginTop: -(DOT_SIZE / 2),
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "50%",
          background: "#00E5FF",
          boxShadow:
            "0 0 10px rgba(0,229,255,0.95), 0 0 22px rgba(0,229,255,0.50)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />

      {/* ── Ring — lags behind with useSpring ───────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, borderColor: "rgba(0,229,255,0.40)" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isPointer ? 1.7 : 1,
          borderColor: isPointer
            ? "rgba(0,229,255,0.85)"
            : "rgba(0,229,255,0.40)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          x: ringX,
          y: ringY,
          position: "fixed",
          top: 0,
          left: 0,
          marginLeft: -(RING_SIZE / 2),
          marginTop: -(RING_SIZE / 2),
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: "50%",
          borderWidth: 1,
          borderStyle: "solid",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
        }}
      />

      {/* ── Click ripples ────────────────────────────────────────── */}
      <AnimatePresence>
        {ripples.map((r) => (
          <Ripple key={r.id} {...r} />
        ))}
      </AnimatePresence>
    </>
  );
}
