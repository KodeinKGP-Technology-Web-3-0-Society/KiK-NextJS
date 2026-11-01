"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STATS = [
  { value: 260, label: "PDS Problems" },
  { value: 17, label: "Articles" },
  { value: 15, label: "Events" },
  { value: 7000, label: "Community Members" },
];

function Counter({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1800, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{n.toLocaleString()}+</span>;
}

export default function Stats() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-20 md:grid-cols-4 md:gap-6">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 100}>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 text-center transition hover:-translate-y-1 hover:border-[#11e3fb]/40">
            <div className="kik-gradient-text font-kanit text-4xl font-bold md:text-5xl">
              <Counter to={s.value} />
            </div>
            <div className="mt-2 font-poppins text-sm text-[#a8b3c4]">{s.label}</div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
