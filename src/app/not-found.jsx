"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  ArrowLeft,
  Compass,
  Terminal,
  Radio,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden bg-[#08090d] px-5 py-16 font-sans text-[#f8fafc] antialiased">
      {/* Subtle background radar circles animation */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-30">
        <div className="absolute h-[300px] w-[300px] rounded-full border border-[#1e2333] sm:h-[420px] sm:w-[420px]" />
        <div className="absolute h-[500px] w-[500px] rounded-full border border-[#1e2333] sm:h-[680px] sm:w-[680px]" />
        <div className="absolute h-[700px] w-[700px] rounded-full border border-[#1e2333]/60 sm:h-[940px] sm:w-[940px]" />

        {/* Rotating radar sweep line */}
        <div className="radar-sweep absolute h-[600px] w-[600px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(56,189,248,0.12)_360deg)] sm:h-[800px] sm:w-[800px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* Animated Beacon Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[var(--accent)] uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          <span>404 · Signal Lost in Space</span>
        </div>

        {/* Big Animated 404 Headline */}
        <div className="relative mt-6 select-none">
          <div className="font-mono text-7xl font-extrabold tracking-widest text-[#f8fafc] sm:text-9xl">
            4<span className="inline-block animate-pulse text-[var(--accent)]">0</span>4
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 font-mono text-7xl font-extrabold tracking-widest text-[var(--accent)]/20 blur-sm sm:text-9xl"
          >
            404
          </div>
        </div>

        {/* Headline & Description */}
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#f8fafc] sm:text-3xl">
          Coordinates Not Found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#94a3b8] sm:text-base">
          The requested endpoint does not exist on our servers or has drifted out of orbit.
          Use the navigational beacon below to return to known space.
        </p>

        {/* Animated Diagnostics Terminal Card */}
        <div className="mt-8 w-full max-w-lg overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d] text-left shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#1e2333] bg-[#161a26] px-4 py-2.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#94a3b8]">
              <Terminal size={14} className="text-[var(--accent)]" />
              <span>system.diagnostics // routing_error</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500/80" />
              <span className="h-2 w-2 rounded-full bg-amber-500/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          <div className="p-4 font-mono text-xs text-[#94a3b8] sm:text-[13px]">
            <p className="text-[#f8fafc]">
              <span className="text-emerald-400">&gt;</span> traceroute destination_route
            </p>
            <p className="mt-1 text-[#64748b]">
              [01] gateway.iitkgp.ac.in ........... 1.2ms [OK]
            </p>
            <p className="text-[#64748b]">
              [02] node-cluster.kodeinkgp.org .... 0.8ms [OK]
            </p>
            <p className="mt-1 text-rose-400">
              [03] target_endpoint ............... [ERR_404_PAGE_MISSING]
            </p>
            <p className="mt-2 text-[var(--accent)]">
              &gt; STATUS: 404_NOT_FOUND (signal unreachable)
              <span className="terminal-cursor inline-block ml-1 h-3.5 w-1.5 bg-[var(--accent)] align-middle" />
            </p>
          </div>
        </div>

        {/* Quick Return Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#08090d] transition-transform hover:-translate-y-0.5"
          >
            <Home size={15} />
            <span>Return to Home</span>
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#1e2333] bg-[#11141d] px-5 py-2.5 text-sm font-semibold text-[#f8fafc] transition-colors hover:border-[var(--accent)]/50 hover:bg-[#161a26]"
          >
            <ArrowLeft size={15} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Recommended Destinations */}
        <div className="mt-12 w-full">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Or Jump Directly Into
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Link
              href="/pds"
              className="group flex flex-col items-center rounded-xl border border-[#1e2333] bg-[#11141d] p-4 text-center transition-all hover:border-[var(--accent)]/50 hover:bg-[#161a26]"
            >
              <BookOpen size={18} className="text-[var(--accent)] transition-transform group-hover:scale-110" />
              <span className="mt-2 text-sm font-semibold text-[#f8fafc]">PDS Bank</span>
              <span className="mt-0.5 font-mono text-[11px] text-[#94a3b8]">208+ Lab Problems</span>
            </Link>

            <Link
              href="/articles"
              className="group flex flex-col items-center rounded-xl border border-[#1e2333] bg-[#11141d] p-4 text-center transition-all hover:border-[var(--accent)]/50 hover:bg-[#161a26]"
            >
              <Sparkles size={18} className="text-[var(--accent)] transition-transform group-hover:scale-110" />
              <span className="mt-2 text-sm font-semibold text-[#f8fafc]">Articles</span>
              <span className="mt-0.5 font-mono text-[11px] text-[#94a3b8]">Live Tech Blog</span>
            </Link>

            <Link
              href="/events"
              className="group col-span-2 flex flex-col items-center rounded-xl border border-[#1e2333] bg-[#11141d] p-4 text-center transition-all hover:border-[var(--accent)]/50 hover:bg-[#161a26] sm:col-span-1"
            >
              <Calendar size={18} className="text-[var(--accent)] transition-transform group-hover:scale-110" />
              <span className="mt-2 text-sm font-semibold text-[#f8fafc]">Events</span>
              <span className="mt-0.5 font-mono text-[11px] text-[#94a3b8]">Hackathons & Workshops</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .radar-sweep {
          animation: radar-rotate 8s linear infinite;
        }

        @keyframes radar-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .terminal-cursor {
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
