"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeroVisual from "./HeroVisual";
import ParticleField from "./ParticleField";

const WORDS = ["Web 3.0", "Blockchain", "Artificial Intelligence", "Web Development"];

function useTypewriter(words) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0, j = 0, deleting = false, t;
    const tick = () => {
      const word = words[i];
      j += deleting ? -1 : 1;
      setText(word.slice(0, j));
      let delay = deleting ? 40 : 90;
      if (!deleting && j === word.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % words.length;
        delay = 350;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, [words]);
  return text;
}

export default function Hero() {
  const word = useTypewriter(WORDS);
  const tiltRef = useRef(null);

  const onMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  };
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <section className="relative isolate overflow-hidden">
      <ParticleField />
      <div className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#11e3fb]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[26rem] w-[26rem] rounded-full bg-[#33bbcf]/15 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#01011b] to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#11e3fb]/30 bg-[#11e3fb]/5 px-4 py-1.5 font-poppins text-xs text-[#9deffc] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[#11e3fb]" style={{ animation: "kik-pulse-ring 1.8s ease-out infinite" }} />
              <span className="relative h-2 w-2 rounded-full bg-[#11e3fb]" />
            </span>
            KodeinKGP · Technology Web 3.0 Society
          </span>

          <h1 className="mt-6 font-kanit text-[2.6rem] leading-[1.1] font-bold text-white md:text-7xl">
            Where <span className="kik-gradient-text whitespace-nowrap">Web 3.0</span>
            <br />
            gets built at
            <br />
            IIT Kharagpur
          </h1>

          <p className="mt-5 h-8 font-[family-name:var(--font-geist-mono)] text-lg text-[#9deffc] md:text-xl">
            &gt; explore {word}
            <span className="kik-caret ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-[#11e3fb]" />
          </p>

          <p className="mx-auto mt-5 max-w-xl font-poppins text-sm leading-7 text-[#a8b3c4] md:mx-0 md:text-base">
            KodeinKGP is a student-run society teaching Blockchain, AI and Web
            Development through workshops, hackathons and real projects.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/dekodeX"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#11e3fb] to-[#5be6ff] px-6 py-3 font-poppins text-sm font-semibold text-[#01011b] shadow-[0_0_30px_rgba(17,227,251,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(17,227,251,0.55)]"
            >
              Join dekodeX
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/pds"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-poppins text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#11e3fb]/60 hover:bg-[#11e3fb]/10"
            >
              Practice PDS
            </Link>
            <Link
              href="/events"
              className="px-3 py-3 font-poppins text-sm font-medium text-[#9deffc] underline-offset-4 hover:underline"
            >
              See our events
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center" onMouseMove={onMove} onMouseLeave={onLeave}>
          <div ref={tiltRef} className="relative w-full transition-transform duration-200 ease-out will-change-transform">
            <HeroVisual />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block" aria-hidden="true">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-[#11e3fb]" />
        </div>
      </div>
    </section>
  );
}
