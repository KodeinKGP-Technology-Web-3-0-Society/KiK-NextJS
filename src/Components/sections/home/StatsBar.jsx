"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate, motion } from "framer-motion";

const STATS = [
  {
    label:  "// pds_problems",
    value:  260,
    suffix: "+",
    desc:   "Curated problems across every DSA topic",
  },
  {
    label:  "// articles",
    value:  17,
    suffix: "+",
    desc:   "In-depth technical articles published",
  },
  {
    label:  "// events_hosted",
    value:  15,
    suffix: "+",
    desc:   "Workshops, hackathons & competitions",
  },
  {
    label:  "// community",
    value:  7000,
    suffix: "+",
    desc:   "Students in our growing network",
  },
];

/* Spark-bar decoration */
const SPARK_HEIGHTS = [28, 55, 40, 75, 50, 68, 88, 60];

function SparkBars() {
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 20 }}>
      {SPARK_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm"
          style={{ height: `${h}%`, background: "rgba(17,227,251,0.22)" }}
        />
      ))}
    </div>
  );
}

/* Custom count-up — uses Framer Motion animate() internally */
function CountUp({ to, suffix }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {to >= 1000 ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
}

/* Single stat cell */
function StatCell({ label, value, suffix, desc, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLast = index === STATS.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col px-6 py-6"
    >
      {/* Vertical separator — hidden on last column and on mobile */}
      {!isLast && (
        <div
          className="absolute right-0 top-1/2 hidden h-14 w-px -translate-y-1/2 md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(17,227,251,0.18), transparent)",
          }}
        />
      )}

      {/* Mono label */}
      <span
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color:         "rgba(17,227,251,0.42)",
          marginBottom:  "0.75rem",
          display:       "block",
        }}
      >
        {label}
      </span>

      {/* Giant number */}
      <span
        className="font-kanit font-black leading-none"
        style={{
          fontSize:               "clamp(1.9rem, 4vw, 3rem)",
          background:             "linear-gradient(135deg, #11E3FB 20%, #5BE6FF 100%)",
          WebkitBackgroundClip:   "text",
          WebkitTextFillColor:    "transparent",
          backgroundClip:         "text",
          marginBottom:           "0.6rem",
          display:                "block",
        }}
      >
        <CountUp to={value} suffix={suffix} />
      </span>

      {/* Spark bars */}
      <div style={{ marginBottom: "0.5rem" }}>
        <SparkBars />
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily:  "var(--font-poppins)",
          fontSize:    "0.72rem",
          lineHeight:  "1.55",
          color:       "rgba(255,255,255,0.38)",
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="section-container py-12 md:py-16">
      {/* Container with subtle border and glass bg */}
      <div
        className="overflow-hidden rounded-card"
        style={{
          background: "rgba(10,10,46,0.55)",
          border:     "1px solid rgba(17,227,251,0.08)",
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
