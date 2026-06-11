"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const INTRO_DURATION_MS = 2500;
const PARTICLE_COUNT = 18;
const BRAND = "deKodeX";
const INTRO_LOADER_HIDE_KEY = "dekodex_intro_hide";
const BRAND_CHARS = BRAND.split("");
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/".split("");
const SYNTAX_SYMBOLS = ["{ }", "</>", "=>", "||", "&&", "[ ]", "( )", "/*", "*/", ";", "==", "!="];
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
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
      );
      iterations++;
      if (iterations >= maxIterations) clearInterval(interval);
    }, 75);

    const closeTimer = setTimeout(() => setClosing(true), INTRO_DURATION_MS);
    const doneTimer = setTimeout(() => onCompleteRef.current?.(), INTRO_DURATION_MS + 400);

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
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#05050A] transition-all duration-500 ease-in-out ${
        closing ? "pointer-events-none scale-105 opacity-0" : "opacity-100 scale-100"
      }`}
    >
      <button
        type="button"
        onClick={handleDontShowAgain}
        className="absolute top-4 right-4 z-20 rounded-md border border-white/20 bg-black/30 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80 transition hover:border-white/40 hover:text-white"
      >
        Don&apos;t show again
      </button>

      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#110022] via-[#05050A] to-[#05050A] opacity-80" />

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
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0A0A12]/80 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* Minimalist Top Bar */}
          <div className="mb-8 flex items-center justify-between border-b border-white/[0.05] pb-4">
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
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
                          ? "text-[#B026FF] drop-shadow-[0_0_12px_rgba(176,38,255,0.6)]"
                          : "text-[#00F0FF] drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]"
                        : "text-white/30"
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>

            {/* Status indicator */}
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-white/50">
              <div className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00F0FF]" />
              </div>
              decrypting_environment...
            </div>
          </div>

          {/* Modern Progress Line */}
          <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
            <div className="progress-bar h-full w-full origin-left bg-gradient-to-r from-transparent via-[#00F0FF] to-[#B026FF]" />
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
        <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-[#B026FF]/50 rounded-br-lg" />
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
          animation: load-progress ${INTRO_DURATION_MS}ms cubic-bezier(0.8, 0, 0.2, 1) forwards;
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
