'use client'

import { motion } from 'framer-motion'

export default function HomeFooter() {
  return (
    <motion.div
      initial={{
        clipPath: 'inset(0 100% 0 0)',
        scale: 0.98,
        opacity: 1,
      }}
      animate={{
        clipPath: 'inset(0 0% 0 0)',
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay: 7.646,           // 7646ms
        duration: 1.906,        // 9552 - 7646
        ease: [0.4, 0.0, 0.2, 1], // smooth:standard
      }}
      style={{
        position: 'absolute',
        left: 129,
        top: 803,
        width: 1183,
        height: 75,
        zIndex: 6,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* CONTENT (static markup) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          height: '100%',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* 17+ Articles */}
        <StatBlock number="17+" label="Articles" />

        {/* 15+ Events */}
        <StatBlock number="15+" label="Events" />

        {/* 5000+ Community members */}
        <StatBlock number="5000+" label="Community members" />

        {/* Highlight card */}
        <HighlightCard />
      </div>
    </motion.div>
  )
}

/* ---------- Subcomponents ---------- */

function StatBlock({ number, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontSize: 36, fontWeight: 600 }}>{number}</span>
      <span style={{ fontSize: 28, fontWeight: 500, color: '#5fe4ff' }}>
        {label}
      </span>
    </div>
  )
}

function HighlightCard() {
  return (
    <div
      style={{
        position: 'relative',
        padding: '12px 24px',
        borderRadius: 16,
        border: '2px solid #00fff7',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ fontSize: 36, fontWeight: 600 }}>260+</span>
      <span style={{ fontSize: 28, fontWeight: 500, color: '#00fff7' }}>
        PDS Problems
      </span>

      <img
        src="https://snackthis-userdata.s3-eu-west-1.amazonaws.com/e3e80c6f-64cd-4d6b-8210-1937abf0c853.png"
        alt=""
        style={{
          position: 'absolute',
          right: -12,
          bottom: -12,
          width: 25,
          height: 25,
        }}
      />
    </div>
  )
}
