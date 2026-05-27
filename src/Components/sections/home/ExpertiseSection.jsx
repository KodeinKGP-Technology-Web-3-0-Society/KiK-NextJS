"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import RobotAnim      from "@/data/animations/Robo.json";
import WebAnim        from "@/data/animations/WEB.json";
import BlockchainAnim from "@/data/animations/Blockchain.json";

const CARDS = [
  {
    id:    "ai",
    tag:   "// domain_01",
    title: "AI & Metaverse",
    desc:  "Enter a realm where AI drives immersive Metaverse encounters, pushing the boundaries of what's possible.",
    anim:  RobotAnim,
    color: "#a78bfa",
    chips: ["Machine Learning", "LLMs", "Computer Vision"],
  },
  {
    id:    "web",
    tag:   "// domain_02",
    title: "Web Development",
    desc:  "Crafting dynamic, responsive websites that deliver exceptional user experiences across all devices.",
    anim:  WebAnim,
    color: "#11E3FB",
    chips: ["Next.js", "React", "Node.js"],
  },
  {
    id:    "blockchain",
    tag:   "// domain_03",
    title: "Blockchain",
    desc:  "Building the decentralised future with secure, transparent blockchain solutions and smart contracts.",
    anim:  BlockchainAnim,
    color: "#fbbf24",
    chips: ["Solidity", "Web3.js", "DeFi"],
  },
];

/* ── Card component ─────────────────────────────────────────────── */
function ExpertiseCard({ card, large = false }) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-card transition-all duration-500"
      style={{
        background:     "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        border:         `1px solid ${card.color}1A`,
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${card.color}44`;
        e.currentTarget.style.boxShadow   = `0 0 36px ${card.color}14, inset 0 1px 0 rgba(255,255,255,0.07)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${card.color}1A`;
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      {/* Top accent line — glows in card color */}
      <div
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.color}70, transparent)`,
        }}
      />

      {/* Lottie area */}
      <div
        className="w-full flex-shrink-0 overflow-hidden"
        style={{ height: large ? "clamp(160px,22vw,240px)" : "clamp(120px,14vw,160px)" }}
      >
        <Lottie
          animationData={card.anim}
          loop
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Domain tag */}
        <span
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         `${card.color}80`,
            display:       "block",
            marginBottom:  "0.5rem",
          }}
        >
          {card.tag}
        </span>

        {/* Title */}
        <h3
          className="mb-2 font-kanit text-xl font-bold leading-tight transition-colors duration-300"
          style={{ color: card.color }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          className="flex-1 font-poppins text-xs leading-relaxed md:text-sm"
          style={{ color: "rgba(255,255,255,0.46)" }}
        >
          {card.desc}
        </p>

        {/* Chips — shown on large card or always */}
        {card.chips && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {card.chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding:       "0.2rem 0.6rem",
                  borderRadius:  "99px",
                  border:        `1px solid ${card.color}2A`,
                  background:    `${card.color}0C`,
                  color:         `${card.color}90`,
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

/* ── Section header ─────────────────────────────────────────────── */
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
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.68rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "rgba(17,227,251,0.55)",
          marginBottom:  "0.6rem",
        }}
      >
        What we&apos;re building
      </p>
      <h2
        className="text-gradient font-kanit font-bold"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.15 }}
      >
        Our Expertise
      </h2>
      <p
        className="mt-2 font-poppins text-sm"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Three pillars.&nbsp; One society.
      </p>
    </motion.div>
  );
}

export default function ExpertiseSection() {
  return (
    <section className="section-container py-10 md:py-16">
      <SectionHeader />

      {/* ── Desktop bento grid ─────────────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-5" style={{ gridTemplateRows: "1fr 1fr" }}>
        {/* AI — left column, spans both rows */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="row-span-2"
        >
          <ExpertiseCard card={CARDS[0]} large />
        </motion.div>

        {/* Web Dev — right top */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <ExpertiseCard card={CARDS[1]} />
        </motion.div>

        {/* Blockchain — right bottom */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <ExpertiseCard card={CARDS[2]} />
        </motion.div>
      </div>

      {/* ── Mobile vertical stack ──────────────────────────────── */}
      <div className="flex flex-col gap-5 md:hidden">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 28 }}
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
