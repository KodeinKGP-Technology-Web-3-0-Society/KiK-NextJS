"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const INTRO_DURATION_MS = 2500;
const PARTICLE_COUNT = 18;
const BRAND = "deKodeX";
const INTRO_LOADER_HIDE_KEY = "dekodex_intro_hide";
const BRAND_CHARS = BRAND.split("");
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/".split(
  ""
);
const SYNTAX_SYMBOLS = [
  "{ }",
  "</>",
  "=>",
  "||",
  "&&",
  "[ ]",
  "( )",
  "/*",
  "*/",
  ";",
  "==",
  "!=",
];
const PARTICLE_SEED = 20260608;

function createSeededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function buildParticles() {
  const rand = createSeededRandom(PARTICLE_SEED);
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    char: SYNTAX_SYMBOLS[Math.floor(rand() * SYNTAX_SYMBOLS.length)],
    x: rand() * 100,
    y: rand() * 100,
    scale: +(rand() * 0.5 + 0.5).toFixed(2),
    opacity: +(rand() * 0.2 + 0.05).toFixed(2),
    duration: +(rand() * 2 + 3).toFixed(2),
    delay: +(rand() * 1.5).toFixed(2),
  }));
}

export default function DekodeXIntroLoader({ onComplete }) {
  const [closing, setClosing] = useState(false);
  const [cipherText, setCipherText] = useState(BRAND_CHARS.map(() => "X"));
  const onCompleteRef = useRef(onComplete);
  const particles = useMemo(() => buildParticles(), []);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Decryption cipher effect
    let iterations = 0;
    const maxIterations = 16;
    const interval = setInterval(() => {
      setCipherText(() =>
        BRAND_CHARS.map((letter, index) => {
          // Gradually lock letters from left to right
          if (index < iterations / (maxIterations / BRAND_CHARS.length)) {
            return letter;
          }
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
      );
      iterations++;
      if (iterations >= maxIterations) clearInterval(interval);
    }, 75);

    const closeTimer = setTimeout(() => setClosing(true), INTRO_DURATION_MS);
    const doneTimer = setTimeout(
      () => onCompleteRef.current?.(),
      INTRO_DURATION_MS + 400
    );

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(doneTimer);
      clearInterval(interval);
    };
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem(INTRO_LOADER_HIDE_KEY, "true");
    setClosing(true);
    setTimeout(() => onCompleteRef.current?.(), 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#08090d] transition-all duration-500 ease-in-out ${
        closing
          ? "pointer-events-none scale-105 opacity-0"
          : "scale-100 opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={handleDontShowAgain}
        className="absolute top-4 right-4 z-20 rounded-md border border-[#1e2333] bg-[#11141d] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#f8fafc]/80 transition hover:border-cyan-300/40 hover:text-white"
      >
        Don&apos;t show again
      </button>

      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#11141d] via-[#08090d] to-[#08090d] opacity-90" />

      {/* Floating Syntax Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((item) => (
          <span
            key={item.id}
            className="absolute font-mono text-[14px] font-bold text-[#4B5563]"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: item.opacity,
              "--particle-scale": item.scale,
              animation: `float-up ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
            }}
          >
            {item.char}
          </span>
        ))}
      </div>

      {/* Main Glassmorphic Panel */}
      <div className="relative z-10 w-[min(90vw,480px)]">
        <div className="relative rounded-2xl border border-[#1e2333] bg-[#11141d] p-8 shadow-2xl">
          {/* Minimalist Top Bar */}
          <div className="mb-8 flex items-center justify-between border-b border-[#1e2333] pb-4">
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#94a3b8] uppercase">
              System.Boot()
            </span>
          </div>

          {/* Cipher Text Area */}
          <div className="flex flex-col items-center justify-center py-4">
            <h1 className="flex gap-[2px] font-mono text-4xl font-black tracking-wider sm:text-5xl">
              {cipherText.map((char, index) => {
                const isLocked = char === BRAND[index];
                const isX = char === "X";
                return (
                  <span
                    key={index}
                    className={`transition-colors duration-100 ${
                      isLocked
                        ? isX
                          ? "text-[#a855f7]"
                          : "text-[var(--accent)]"
                        : "text-white/30"
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>

            {/* Status indicator */}
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-[#94a3b8]">
              <div className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </div>
              decrypting_environment...
            </div>
          </div>

          {/* Modern Progress Line */}
          <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
            <div className="progress-bar h-full w-full origin-left bg-[var(--accent)]" />
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute -top-2 -left-2 h-5 w-5 rounded-tl-lg border-t border-l border-[#1e2333]" />
        <div className="absolute -right-2 -bottom-2 h-5 w-5 rounded-br-lg border-r border-b border-[#1e2333]" />
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(6px) scale(var(--particle-scale, 1));
          }
          100% {
            transform: translateY(-12px) scale(var(--particle-scale, 1));
          }
        }

        .progress-bar {
          animation: load-progress ${INTRO_DURATION_MS}ms
            cubic-bezier(0.8, 0, 0.2, 1) forwards;
          transform: scaleX(0);
        }

        @keyframes load-progress {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(0.4);
          }
          100% {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .progress-bar {
            animation-duration: 1ms;
          }
        }
      `}</style>
    </div>
  );
}
