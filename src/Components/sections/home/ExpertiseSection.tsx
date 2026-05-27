/**
 * ExpertiseSection.tsx — Scene 3: "Three Pillars"
 * ════════════════════════════════════════════════════════════════
 * Desktop bento: AI card enters from the left, Web + Blockchain
 * enter from the right — creating a "pincer lock" visual.
 *
 * Each card tracks the cursor and renders a radial spotlight
 * beneath the glass surface via direct DOM mutation (zero
 * React re-renders on mousemove).
 *
 * Corner bracket accents appear on hover with a fade-in.
 */

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import RobotAnim from "@/data/animations/Robo.json";
import WebAnim from "@/data/animations/WEB.json";
import BlockchainAnim from "@/data/animations/Blockchain.json";

interface CardData {
  id: string;
  tag: string;
  title: string;
  desc: string;
  // Lottie accepts any valid animation JSON object
  anim: object;
  color: string;
  chips: string[];
}

const CARDS: CardData[] = [
  {
    id: "ai",
    tag: "// domain_01",
    title: "AI & Metaverse",
    desc: "Enter a realm where AI drives immersive Metaverse encounters, pushing the boundaries of what's possible.",
    anim: RobotAnim,
    color: "#a78bfa",
    chips: ["Machine Learning", "LLMs", "Computer Vision"],
  },
  {
    id: "web",
    tag: "// domain_02",
    title: "Web Development",
    desc: "Crafting dynamic, responsive websites that deliver exceptional user experiences across all devices.",
    anim: WebAnim,
    color: "#11E3FB",
    chips: ["Next.js", "React", "Node.js"],
  },
  {
    id: "blockchain",
    tag: "// domain_03",
    title: "Blockchain",
    desc: "Building the decentralised future with secure, transparent blockchain solutions and smart contracts.",
    anim: BlockchainAnim,
    color: "#fbbf24",
    chips: ["Solidity", "Web3.js", "DeFi"],
  },
];

/* ── Mouse-spotlight expertise card ──────────────────────────── */
function ExpertiseCard({
  card,
  large = false,
}: {
  card: CardData;
  large?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  /* Direct DOM mutation — mousemove fires at 60 fps; avoid re-renders */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(260px circle at ${x}px ${y}px, ${card.color}1C, transparent 70%)`;
  };

  const onEnter = () => {
    setHov(true);
    if (!cardRef.current) return;
    cardRef.current.style.borderColor = `${card.color}40`;
    cardRef.current.style.boxShadow = `0 0 48px ${card.color}0E, inset 0 1px 0 rgba(255,255,255,0.07)`;
  };

  const onLeave = () => {
    setHov(false);
    if (cardRef.current) {
      cardRef.current.style.borderColor = `${card.color}1A`;
      cardRef.current.style.boxShadow = "none";
    }
    if (spotRef.current) spotRef.current.style.background = "none";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group rounded-card relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-500"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        border: `1px solid ${card.color}1A`,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Mouse-tracking spotlight — sits BELOW content */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity: hov ? 1 : 0, transition: "opacity 0.3s" }}
      />

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-px opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.color}70, transparent)`,
        }}
      />

      {/* Corner bracket accents — fade in on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-[10px] z-10"
        aria-hidden
      >
        <div
          className="absolute top-0 left-0 h-5 w-5"
          style={{
            borderTop: `1px solid ${card.color}55`,
            borderLeft: `1px solid ${card.color}55`,
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-5 w-5"
          style={{
            borderBottom: `1px solid ${card.color}55`,
            borderRight: `1px solid ${card.color}55`,
          }}
        />
      </motion.div>

      {/* Lottie animation */}
      <div
        className="relative z-10 w-full flex-shrink-0 overflow-hidden"
        style={{
          height: large
            ? "clamp(160px, 22vw, 240px)"
            : "clamp(120px, 14vw, 160px)",
        }}
      >
        <Lottie
          animationData={card.anim}
          loop
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Body copy */}
      <div className="relative z-10 flex flex-1 flex-col p-5 md:p-6">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: `${card.color}80`,
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          {card.tag}
        </span>

        <h3
          className="mb-2 text-xl leading-tight font-bold transition-colors duration-300"
          style={{ fontFamily: "var(--font-grotesk)", color: card.color }}
        >
          {card.title}
        </h3>

        <p
          className="flex-1 text-xs leading-relaxed md:text-sm"
          style={{
            fontFamily: "var(--font-dm)",
            color: "rgba(255,255,255,0.46)",
          }}
        >
          {card.desc}
        </p>

        {card.chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {card.chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  padding: "0.2rem 0.6rem",
                  borderRadius: 99,
                  border: `1px solid ${card.color}2A`,
                  background: `${card.color}0C`,
                  color: `${card.color}90`,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section header ───────────────────────────────────────────── */
function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 text-center"
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "rgba(17,227,251,0.55)",
          marginBottom: "0.6rem",
        }}
      >
        What we&apos;re building
      </p>
      <h2
        className="text-gradient font-bold"
        style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "clamp(1.75rem, 4vw, 3rem)",
          lineHeight: 1.15,
        }}
      >
        Our Expertise
      </h2>
      <p
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.35)",
          marginTop: "0.5rem",
        }}
      >
        Three pillars.&nbsp; One society.
      </p>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────────────── */
export default function ExpertiseSection() {
  return (
    <section className="section-container py-10 md:py-16">
      <SectionHeader />

      {/* ── Desktop bento: AI from left, Web + Blockchain from right ── */}
      <div
        className="hidden md:grid md:grid-cols-2 md:gap-5"
        style={{ gridTemplateRows: "1fr 1fr" }}
      >
        {/* AI — left column, 2-row span, enters ← from left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
          className="row-span-2"
        >
          <ExpertiseCard card={CARDS[0]} large />
        </motion.div>

        {/* Web Dev — right top, enters → from right */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 22,
            delay: 0.12,
          }}
        >
          <ExpertiseCard card={CARDS[1]} />
        </motion.div>

        {/* Blockchain — right bottom, enters → from right */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 22,
            delay: 0.24,
          }}
        >
          <ExpertiseCard card={CARDS[2]} />
        </motion.div>
      </div>

      {/* ── Mobile vertical stack ─────────────────────────────────── */}
      <div className="flex flex-col gap-5 md:hidden">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ExpertiseCard card={card} large />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
