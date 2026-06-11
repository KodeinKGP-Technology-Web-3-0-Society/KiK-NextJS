"use client";
import { ArrowLeft } from "lucide-react";

export default function ReturnButton() {
  return (
    <a
      href="/dekodeX"
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-cyan-300/25 bg-cyan-300 px-3 text-xs font-semibold text-[#01011B] transition-colors hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-300/40 focus:outline-none max-sm:w-9 max-sm:px-0"
      aria-label="Return to DekodeX"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="max-sm:hidden">Return</span>
    </a>
  );
}
