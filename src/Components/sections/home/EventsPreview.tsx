/**
 * EventsPreview.tsx — Scene 5: "Recent Transmissions"
 * ════════════════════════════════════════════════════════════════
 * Film-projector flash effect on entry:
 *   1. Image area is initially covered by a dark overlay.
 *   2. When the card enters view, the overlay instantly switches
 *      to white (projector burst — ~65 ms).
 *   3. White overlay fades to 0 over 280 ms, revealing the image.
 *
 * Scan-line overlay appears on hover (ultra-subtle raster lines).
 * Film-strip perforations decorate the top edge of each image.
 * Cards enter with spring physics + slight per-card Y-offset variation.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import eventsData from "@/data/events/EventsData.json";

interface EventData {
  id: number;
  heading: string;
  description: string;
  image: string;
  sponsor?: string | string[];
  sponsor_img?: string | string[];
}

/* Show the 3 most recently added events */
const PREVIEW = (eventsData as unknown as EventData[]).slice(-3).reverse();

/* Per-card Y entry offset variation for a more organic stagger */
const ENTRY_Y = [44, 58, 38];

/* ── Film-projector flash overlay ────────────────────────────── */
function FilmFlash({ inView, index }: { inView: boolean; index: number }) {
  const [isWhite, setIsWhite] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    /* Trigger after the spring card animation settles */
    const t = setTimeout(
      () => setIsWhite(true),
      ENTRY_Y[index] * 4 + 300 // ≈ 476–532 ms; synced with spring travel
    );
    return () => clearTimeout(t);
  }, [inView, index]);

  /* Already removed — don't render anything */
  if (gone) return null;

  /* Dark overlay — hides image until flash */
  if (!isWhite) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "#040814" }}
      />
    );
  }

  /* White flash → fades out → unmounts */
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onAnimationComplete={() => setGone(true)}
    />
  );
}

/* ── Scan-line raster overlay (hover only) ───────────────────── */
function ScanLines({ visible }: { visible: boolean }) {
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.22 }}
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 3px)",
      }}
    />
  );
}

/* ── Individual event card ────────────────────────────────────── */
function EventCard({ event, index }: { event: EventData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: ENTRY_Y[index] ?? 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: index * 0.14,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group rounded-card relative flex flex-col overflow-hidden border transition-[border-color,transform,box-shadow] duration-400"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(12px)",
        borderColor: hov ? "rgba(0,229,255,0.28)" : "rgba(255,255,255,0.07)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov
          ? "0 14px 60px rgba(0,0,0,0.6), 0 0 48px rgba(0,229,255,0.12)"
          : "none",
      }}
    >
      {/* ── Image area ────────────────────────────────────────── */}
      <div className="relative h-48 w-full overflow-hidden">
        {/* Actual image — always rendered, revealed after flash overlay fades */}
        <Image
          src={event.image}
          alt={event.heading}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient fade to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040814]/80 via-transparent to-transparent" />

        {/* Projector flash overlay */}
        <FilmFlash inView={inView} index={index} />

        {/* Scan-line hover raster */}
        <ScanLines visible={hov} />

        {/* Film-strip perforations along top edge */}
        <div
          className="absolute inset-x-0 top-0 flex items-center gap-[6px] px-2 py-[4px] opacity-[0.18]"
          aria-hidden
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="h-[5px] w-[5px] flex-shrink-0 rounded-[1px] bg-black"
            />
          ))}
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="mb-2 text-lg leading-snug font-semibold text-white transition-colors duration-200 group-hover:text-cyan-300"
          style={{ fontFamily: "var(--font-grotesk)" }}
        >
          {event.heading}
        </h3>
        <p
          className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-dm)",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {event.description}
        </p>

        {/* Sponsor chips */}
        {Array.isArray(event.sponsor) && event.sponsor.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.sponsor.map((s: string) => (
              <span key={s} className="badge text-[0.68rem]">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────────────── */
export default function EventsPreview() {
  return (
    <section className="section-container py-10 md:py-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <p className="mono-label mb-2">What we&apos;ve been up to</p>
          <h2
            className="text-gradient font-bold"
            style={{
              fontFamily: "var(--font-grotesk)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              lineHeight: 1.12,
            }}
          >
            Recent Events
          </h2>
        </div>

        <Link
          href="/events"
          className="hidden items-center gap-2 text-sm text-cyan-400 underline-offset-4 transition-all duration-200 hover:text-cyan-300 hover:underline md:inline-flex"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          View all
          <svg
            width="14"
            height="14"
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
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PREVIEW.map((ev, i) => (
          <EventCard key={ev.id} event={ev} index={i} />
        ))}
      </div>

      {/* Mobile "view all" link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 text-center md:hidden"
      >
        <Link
          href="/events"
          className="rounded-pill inline-flex items-center gap-2 border border-cyan-400/35 px-6 py-2.5 text-sm text-cyan-400 transition-all duration-200 hover:border-cyan-400/70"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          View all events
          <svg
            width="14"
            height="14"
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
      </motion.div>
    </section>
  );
}
