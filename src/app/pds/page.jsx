import Link from "next/link";
import {
  ArrowRight,
  Code2,
  BookOpen,
  CheckCircle2,
  FileText,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Laptop,
} from "lucide-react";
import PdsVisual from "./PdsVisual";

const STATS = [
  { label: "Lab Problems", value: "208+", detail: "Tested with solutions" },
  { label: "Core Modules", value: "7", detail: "From Basics to Linked Lists" },
  { label: "Theory Units", value: "5", detail: "Lecture notes & PDFs" },
  { label: "Zero Friction", value: "100%", detail: "Saved in browser, no login" },
];

const MODULES = [
  {
    num: "01",
    title: "Initial Basics & Types",
    count: "59 problems",
    topics: "Variables, primitive types, arithmetic operators, formatted I/O",
  },
  {
    num: "02",
    title: "Control Flow & Loops",
    count: "35 problems",
    topics: "If-else branching, switch-case, for/while iterations, patterns",
  },
  {
    num: "03",
    title: "Arrays & Strings",
    count: "42 problems",
    topics: "Array indexing, multi-element buffers, string manipulation, null terminator",
  },
  {
    num: "04",
    title: "Functions & Recursion",
    count: "39 problems",
    topics: "Parameter passing, scope, call stack, base conditions, recursive trees",
  },
  {
    num: "05",
    title: "Structures & Pointers",
    count: "15 problems",
    topics: "Address-of operator, pointer arithmetic, struct memory layout, arrow syntax",
  },
  {
    num: "06",
    title: "Sorting & 2D Matrices",
    count: "9 problems",
    topics: "Bubble/selection sort, 2D matrix multiplication, transpose, grid search",
  },
  {
    num: "07",
    title: "Linked Lists & Memory",
    count: "9 problems",
    topics: "Dynamic heap allocation (malloc/free), singly linked list traversal, node ops",
  },
];

const FEATURES = [
  {
    icon: Code2,
    title: "Complete C/C++ Solutions",
    description: "Every single problem includes clean, tested reference code with standard formatting and idiomatic C programming practices.",
  },
  {
    icon: Terminal,
    title: "One-Click Online Compiler",
    description: "Test solutions instantly in your browser with pre-linked online compilers without requiring a local gcc setup.",
  },
  {
    icon: CheckCircle2,
    title: "100% Private Local Tracking",
    description: "Mark problems as completed or save your favorites. Everything is saved directly in your browser's local storage with zero login required.",
  },
  {
    icon: FileText,
    title: "Revision Lecture Notes",
    description: "Concise unit revision summaries and cheat sheets covering syntactic pitfalls, memory rules, and exam-focused conceptual topics.",
  },
];

export default function PdsHome() {
  return (
    <main className="bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#1e2333]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-14 md:grid-cols-[1.2fr_1fr] md:gap-14 md:px-8 md:pt-16 md:pb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs font-semibold text-[var(--accent)] uppercase">
              <Sparkles size={13} />
              <span>CS10001 / CS11001 · IIT Kharagpur</span>
            </div>

            <h1 className="mt-4 text-4xl leading-tight font-bold tracking-[-0.03em] text-[#f8fafc] sm:text-5xl md:text-6xl">
              Programming & Data Structures Bank
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#94a3b8] sm:text-lg">
              The premier resource hub for first-year PDS at IIT Kharagpur. Practice 208+ curated lab
              problems with verified solutions, download unit lecture notes, and master C fundamentals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/pds/lab"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#08090d] transition-transform hover:-translate-y-0.5"
              >
                <Code2 size={16} />
                <span>Practice Lab Problems</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/pds/theory"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1e2333] bg-[#11141d] px-5 py-3 text-sm font-semibold text-[#f8fafc] transition-colors hover:border-[var(--accent)]"
              >
                <BookOpen size={16} />
                <span>Theory Notes & PDFs</span>
              </Link>
            </div>
          </div>

          <PdsVisual />
        </div>

        {/* Stats Strip */}
        <div className="border-t border-[#1e2333] bg-[#11141d]/50">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-4 md:px-8">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-[#1e2333] pl-4 sm:first:border-none">
                <p className="font-mono text-2xl font-bold text-[#f8fafc] sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-[var(--accent)]">{s.label}</p>
                <p className="text-[11px] text-[#94a3b8]">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Two Main Tracks */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="mb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Curriculum Pathways
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#f8fafc] sm:text-3xl">
            Choose Your Study Path
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Lab Problems Card */}
          <Link
            href="/pds/lab"
            className="group flex flex-col justify-between rounded-2xl border border-[#1e2333] bg-[#11141d] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                  Hands-on Coding
                </span>
                <span className="font-mono text-xs text-[#94a3b8]">208 Problems</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-[#f8fafc] group-hover:text-[var(--accent)] transition-colors">
                PDS Lab Problem Archive
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#94a3b8]">
                Weekly assignment problems divided into 7 sequential chapters. Includes problem
                specifications, input/output tests, and verified C/C++ solution code.
              </p>

              <ul className="mt-6 space-y-2 border-t border-[#1e2333] pt-5 text-xs text-[#94a3b8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[var(--accent)]" />
                  <span>Organized by subtopics and difficulty levels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[var(--accent)]" />
                  <span>Revealable reference solutions with syntax highlighting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[var(--accent)]" />
                  <span>Checkbox completion tracking saved directly in local storage</span>
                </li>
              </ul>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent)] group-hover:underline">
              <span>Open Lab Problems</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Theory Notes Card */}
          <Link
            href="/pds/theory"
            className="group flex flex-col justify-between rounded-2xl border border-[#1e2333] bg-[#11141d] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-amber-300">
                  Concept Guides
                </span>
                <span className="font-mono text-xs text-[#94a3b8]">5 Units + PDFs</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-[#f8fafc] group-hover:text-[var(--accent)] transition-colors">
                Lecture Notes & Revision
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#94a3b8]">
                Downloadable PDF notes and conceptual overviews tailored specifically for IIT Kharagpur
                class tests, mid-semester, and end-semester examinations.
              </p>

              <ul className="mt-6 space-y-2 border-t border-[#1e2333] pt-5 text-xs text-[#94a3b8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-amber-400" />
                  <span>Unit 01 to 05 comprehensive revision summaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-amber-400" />
                  <span>Pointer rules, recursive call trees, and memory models</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-amber-400" />
                  <span>Common exam traps, syntax caveats, and tracing questions</span>
                </li>
              </ul>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent)] group-hover:underline">
              <span>Explore Theory Materials</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Curriculum Roadmap (7 Core Chapters) */}
      <section className="border-t border-[#1e2333] bg-[#11141d]/30 py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Structured Roadmap
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#f8fafc] sm:text-3xl">
                The 7 Core Lab Modules
              </h2>
            </div>
            <Link
              href="/pds/lab"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:underline"
            >
              <span>View full syllabus in Lab</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <Link
                key={m.num}
                href="/pds/lab"
                className="group rounded-xl border border-[#1e2333] bg-[#11141d] p-5 transition-all hover:border-[var(--accent)]/50 hover:bg-[#161a26]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">
                    Chapter {m.num}
                  </span>
                  <span className="rounded bg-[#161a26] px-2 py-0.5 font-mono text-[11px] text-[#94a3b8] group-hover:text-[#f8fafc]">
                    {m.count}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-semibold text-[#f8fafc] group-hover:text-[var(--accent)] transition-colors">
                  {m.title}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#94a3b8]">
                  {m.topics}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Practice Here / Feature Highlights */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Built for Kharagpur Freshers
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#f8fafc] sm:text-3xl">
            Everything You Need to Ace PDS
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[#94a3b8]">
            Curated by senior students at KodeinKGP who have navigated the curriculum and know what
            the evaluation criteria require.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-xl border border-[#1e2333] bg-[#11141d] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1e2333] bg-[#161a26] text-[var(--accent)]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#f8fafc]">{feat.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#94a3b8]">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
