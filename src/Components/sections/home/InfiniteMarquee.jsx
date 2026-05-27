"use client";

/* Pure-CSS infinite marquee — zero dependencies beyond React.
   Two rows scrolling in opposite directions, one solid + one ghost/outline. */

const ROW_1 = [
  "BLOCKCHAIN", "ARTIFICIAL INTELLIGENCE", "WEB 3.0",
  "METAVERSE", "DEFI", "IIT KHARAGPUR", "SMART CONTRACTS",
  "NEURAL NETWORKS", "DAO", "CRYPTOGRAPHY", "ZERO KNOWLEDGE",
];
const ROW_2 = [
  "WEB DEVELOPMENT", "HACKATHONS", "WORKSHOPS",
  "OPEN SOURCE", "DECENTRALIZED FUTURE", "MACHINE LEARNING",
  "RESEARCH", "COMMUNITY", "DEEP LEARNING", "CONSENSUS",
];

function MarqueeTrack({ items, reverse = false, ghost = false, duration = 32 }) {
  /* Triplicate → move by -33.333% → seamless loop */
  const all = [...items, ...items, ...items];
  return (
    <div
      className="flex overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={reverse ? "animate-marquee-rtl" : "animate-marquee-ltr"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          padding: "0.55rem 0",
          animationDuration: `${duration}s`,
          willChange: "transform",
        }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              userSelect: "none",
              ...(ghost
                ? {
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(17,227,251,0.28)",
                  }
                : { color: "rgba(17,227,251,0.45)" }),
            }}
          >
            {item}
            <span
              style={{
                marginLeft: "2.5rem",
                ...(ghost
                  ? {
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(17,227,251,0.14)",
                    }
                  : { color: "rgba(17,227,251,0.18)" }),
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function InfiniteMarquee() {
  return (
    <div
      className="overflow-hidden py-1"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(1,1,27,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <MarqueeTrack items={ROW_1} duration={40} />
      <MarqueeTrack items={ROW_2} reverse ghost duration={32} />
    </div>
  );
}
