"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Download, ExternalLink, BookOpen, Layers } from "lucide-react";

const THEORY_MODULES = [
  {
    id: "initialBasics",
    number: "Unit 01",
    name: "Initial Basics & Types",
    description: "Variables, primitive data types, operators, expressions, and I/O formatted specifiers in C.",
    link: "/BASICS.pdf",
    tags: ["Syntax", "Operators", "Data Types"],
  },
  {
    id: "loops",
    number: "Unit 02",
    name: "Control Flow & Loops",
    description: "Conditionals (if-else, switch-case), looping constructs (for, while, do-while), and jump statements.",
    link: "/LOOPS.pdf",
    tags: ["Branching", "Nested Loops", "Patterns"],
  },
  {
    id: "oneDArrays",
    number: "Unit 03",
    name: "1D Arrays & Strings",
    description: "Array declarations, memory layout, indexing, string manipulations, and null termination rules.",
    link: "/ARRAY.pdf",
    tags: ["Arrays", "String Functions", "Buffers"],
  },
  {
    id: "functions",
    number: "Unit 04",
    name: "Functions & Recursions",
    description: "Call stack, parameter passing by value vs reference, recursive call trees, and base cases.",
    link: "/FUNCTION.pdf",
    tags: ["Modularity", "Recursion", "Call Stack"],
  },
  {
    id: "pointers",
    number: "Unit 05",
    name: "Structures & Pointers",
    description: "Pointer arithmetic, dynamic allocation (malloc/free), structs, unions, and arrow notation.",
    link: "/STRUCTURES.pdf",
    tags: ["Pointers", "Memory Management", "Structs"],
  },
];

export default function Theory() {
  return (
    <div className="min-h-screen bg-[#0b1430] font-sans text-[#ece9e1] antialiased">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-20 md:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/pds"
            className="group inline-flex items-center gap-2 font-mono text-xs text-[#9aa3b8] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to PDS Overview</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            PDS Bank · Theory Materials
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#ece9e1] md:text-5xl">
            Lecture Notes & Theory
          </h1>
          <p className="mt-3 text-base text-[#9aa3b8]">
            Curated high-yield notes and revision summaries for the PDS curriculum at IIT Kharagpur.
            Each document covers core definitions, syntax gotchas, and typical exam questions.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {THEORY_MODULES.map((mod) => (
            <div
              key={mod.id}
              className="group flex flex-col justify-between rounded-xl border border-[#243158] bg-[#0f1a3a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-xl hover:shadow-[rgba(46,168,255,0.05)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                    {mod.number}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#243158] bg-[#0b1430] text-[#9aa3b8] group-hover:text-[var(--accent)] transition-colors">
                    <FileText size={16} />
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#ece9e1] group-hover:text-[var(--accent)] transition-colors">
                  {mod.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#9aa3b8]">
                  {mod.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mod.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-[#243158] bg-[#0b1430] px-2 py-0.5 font-mono text-[11px] text-[#9aa3b8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-[#243158] pt-4">
                <a
                  href={mod.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-[#0b1430] transition-transform hover:-translate-y-0.5"
                >
                  <Download size={14} />
                  <span>Open PDF Document</span>
                </a>
              </div>
            </div>
          ))}

          {/* Practice & Lab Tests card */}
          <div className="group flex flex-col justify-between rounded-xl border border-[#243158] bg-[#0f1a3a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-xl hover:shadow-[rgba(46,168,255,0.05)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                  Assessment
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#243158] bg-[#0b1430] text-[#9aa3b8] group-hover:text-[var(--accent)] transition-colors">
                  <Layers size={16} />
                </div>
              </div>

              <h3 className="mt-4 text-xl font-bold text-[#ece9e1] group-hover:text-[var(--accent)] transition-colors">
                Hands-on Lab Tests
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#9aa3b8]">
                Need combined practice? Test your knowledge with problem sets gathered from mid-sem and
                end-sem laboratory examinations.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded border border-[#243158] bg-[#0b1430] px-2 py-0.5 font-mono text-[11px] text-[#9aa3b8]">
                  Midsem
                </span>
                <span className="rounded border border-[#243158] bg-[#0b1430] px-2 py-0.5 font-mono text-[11px] text-[#9aa3b8]">
                  Endsem
                </span>
                <span className="rounded border border-[#243158] bg-[#0b1430] px-2 py-0.5 font-mono text-[11px] text-[#9aa3b8]">
                  Timed
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-[#243158] pt-4">
              <Link
                href="/pds/lab"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#3a4a7a] px-4 py-2.5 text-xs font-semibold text-[#ece9e1] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <BookOpen size={14} />
                <span>Practice Lab Questions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}