"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Terminal,
  Code2,
  Cpu,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const QUOTES = [
  "👋 Hey KGPian! Ready to build something real?",
  "💡 260+ PDS Lab Solutions ready for 1st years",
  "🤖 AI Agents, LLMs & Neural Networks cohort",
  "⛓️ Web3 protocols, Smart Contracts & ZK circuits",
  "🏆 dekodeX: annual 10-day problem solving sprint",
];

export default function MobileHeroVisual() {
  const [quoteIdx, setQuoteIdx] = useState(0);

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div className="my-2 block w-full md:hidden">
      <div className="relative overflow-hidden rounded-xl border border-[#243158] bg-[#0f1a3a] p-5 shadow-xl">
        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b border-[#243158] pb-3 font-mono text-xs text-[#9aa3b8]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-1.5 text-[11px] text-[#ece9e1]">
              society_core.sh
            </span>
          </div>
          <span className="rounded bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
            IIT Kharagpur
          </span>
        </div>

        {/* Interactive Speech / Greeting Bubble */}
        <div
          onClick={nextQuote}
          role="button"
          tabIndex={0}
          className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-[#3a4a7a] bg-[#0b1430] p-3.5 transition-colors active:scale-[0.98]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--accent)] text-sm font-bold text-[#0b1430] shadow-sm">
            🤖
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase">
              KIK Bot &bull; Tap for tips
            </p>
            <p className="mt-1 text-xs leading-5 font-medium text-[#ece9e1]">
              {QUOTES[quoteIdx]}
            </p>
          </div>
        </div>

        {/* Pillar Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded border border-[#243158] bg-[#0b1430] px-2.5 py-1 font-mono text-[11px] text-[#c5cad6]">
            <Cpu size={11} className="text-[var(--accent)]" />
            <span>AI & ML</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-[#243158] bg-[#0b1430] px-2.5 py-1 font-mono text-[11px] text-[#c5cad6]">
            <ShieldCheck size={11} className="text-[#5ce1e6]" />
            <span>Web 3.0</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-[#243158] bg-[#0b1430] px-2.5 py-1 font-mono text-[11px] text-[#c5cad6]">
            <Code2 size={11} className="text-[#f5c542]" />
            <span>Full-Stack</span>
          </span>
        </div>

        {/* Bottom Quick Links for Mobile */}
        <div className="mt-4 flex items-center justify-between border-t border-[#243158] pt-3 font-mono text-[11px] text-[#9aa3b8]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span>Active Campus Cohorts</span>
          </span>
          <Link
            href="/pds"
            className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
          >
            <span>PDS Bank</span>
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}
