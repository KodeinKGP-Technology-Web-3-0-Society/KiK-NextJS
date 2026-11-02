import CompilerClient from "./CompilerClient";
import Link from "next/link";
import { Terminal, Shield, Zap, BookOpen, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Online C / C++ Compiler – Fast In-Browser WebAssembly IDE",
  description:
    "Free, zero-install online C & C++ compiler powered by WebAssembly (Clang). Compile, run, and debug C17, C11, C99, and C++20 programs directly in your browser with instant stdin support, zero server latency, and complete privacy.",
  keywords: [
    "online c compiler",
    "c++ online compiler",
    "webassembly c compiler",
    "run c in browser",
    "c online ide",
    "iit kharagpur pds compiler",
    "c17 compiler online",
    "c++20 compiler online",
    "online gcc compiler",
    "c programming compiler no install",
    "browser c runner with stdin",
    "cs10001 c compiler",
    "kodeinkgp compiler",
  ],
  alternates: {
    canonical: "/compiler",
  },
  openGraph: {
    title: "Online C / C++ Compiler – Fast WebAssembly Browser IDE | KodeinKGP",
    description:
      "Run C and C++ programs locally in your browser with zero latency. Powered by WebAssembly (Clang) with full standard library, custom stdin, and syntax error diagnostics.",
    url: "/compiler",
    type: "website",
    siteName: "KodeinKGP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online C / C++ Compiler – Fast WebAssembly Browser IDE",
    description:
      "Compile and execute C & C++ code privately on your device. Zero install, zero server delay, standard input support.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "KodeinKGP Online C / C++ Compiler",
  url: "https://kodeinkgp.in/compiler",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All (Browser-based)",
  browserRequirements: "Requires WebAssembly compatible browser (Chrome, Edge, Firefox, Safari)",
  description:
    "High-performance client-side C and C++ browser compiler powered by WebAssembly and Clang. Zero installation, zero server round-trips, and full standard library execution.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "In-browser Clang/LLVM WebAssembly compiler",
    "Instant execution with zero network latency",
    "Strict ISO standard support: C17, C11, C99, and C++20, C++17, C++14",
    "Standard I/O (stdin input and stdout/stderr terminal)",
    "Precise compile error diagnostics with line-jump navigation",
    "Complete data privacy: source code never leaves the user device",
  ],
  provider: {
    "@type": "Organization",
    name: "KodeinKGP",
    url: "https://kodeinkgp.in",
  },
};

export default function CompilerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <CompilerClient />

      {/* SEO & Technical Overview Section */}
      <section className="border-t border-[#1e2333] bg-[#0b0d13] px-5 py-16 font-sans text-[#f8fafc] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Architecture & Capabilities
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#f8fafc] sm:text-3xl">
              Zero-Latency In-Browser C & C++ Compilation
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#94a3b8]">
              Engineered specifically for engineering students at IIT Kharagpur and developers worldwide,
              this compiler eliminates fragile remote servers and slow queue times by executing Clang directly
              inside your browser sandbox via WebAssembly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#1e2333] bg-[#11141d] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
                <Shield size={18} />
              </div>
              <h3 className="mt-4 font-mono text-base font-semibold text-[#f8fafc]">
                100% Private & Local
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#94a3b8]">
                Your source code is never uploaded to any remote server or third-party cloud.
                All parsing, compilation, and execution happens strictly in your device's memory.
              </p>
            </div>

            <div className="rounded-xl border border-[#1e2333] bg-[#11141d] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
                <Cpu size={18} />
              </div>
              <h3 className="mt-4 font-mono text-base font-semibold text-[#f8fafc]">
                Clang & Standard Library
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#94a3b8]">
                Supports modern C17, C11, C99 and C++20, C++17, C++14 standards. Fully includes
                standard headers like <span className="font-mono text-[#e2e8f0]">&lt;stdio.h&gt;</span>,{" "}
                <span className="font-mono text-[#e2e8f0]">&lt;stdlib.h&gt;</span>,{" "}
                <span className="font-mono text-[#e2e8f0]">&lt;math.h&gt;</span>, and{" "}
                <span className="font-mono text-[#e2e8f0]">&lt;bits/stdc++.h&gt;</span>.
              </p>
            </div>

            <div className="rounded-xl border border-[#1e2333] bg-[#11141d] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
                <Zap size={18} />
              </div>
              <h3 className="mt-4 font-mono text-base font-semibold text-[#f8fafc]">
                Interactive Stdin Input
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#94a3b8]">
                Seamlessly feed multi-line inputs to <span className="font-mono text-[#e2e8f0]">scanf()</span> and{" "}
                <span className="font-mono text-[#e2e8f0]">std::cin</span> via the dedicated input panel before
                running. Perfect for competitive programming and PDS assignment testcases.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-[#1e2333] bg-[#11141d]/70 p-6 md:p-8">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Frequently Asked Questions (FAQ)
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-[#f8fafc]">
                  How does this compiler run without a backend server?
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-[#94a3b8]">
                  The compiler uses a WebAssembly port of the LLVM/Clang toolchain running inside a dedicated Web Worker.
                  The browser compiles the C/C++ code into WebAssembly bytecode and executes it in a secure sandbox.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#f8fafc]">
                  Is it compatible with IIT Kharagpur CS10001 / CS11001 PDS?
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-[#94a3b8]">
                  Yes! All 208+ lab problems from the KodeinKGP PDS Archive can be directly compiled, solved, and tested
                  here with complete accuracy against standard gcc and clang outputs.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#f8fafc]">
                  Can I use keyboard shortcuts to run code?
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-[#94a3b8]">
                  Yes, press <kbd className="rounded bg-[#1e2333] px-1.5 py-0.5 font-mono text-[11px] text-[#e2e8f0]">Ctrl + Enter</kbd> (or <kbd className="rounded bg-[#1e2333] px-1.5 py-0.5 font-mono text-[11px] text-[#e2e8f0]">Cmd + Enter</kbd> on macOS) to instantly compile and run.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#f8fafc]">
                  Where can I practice structured lab questions?
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-[#94a3b8]">
                  Visit the{" "}
                  <Link href="/pds/lab" className="text-[var(--accent)] hover:underline">
                    PDS Lab Archive
                  </Link>{" "}
                  to practice categorized questions on loops, arrays, recursion, pointers, sorting, and linked lists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
