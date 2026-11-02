import Link from "next/link";
import {
  ArrowRight,
  Code2,
  BookOpen,
  CheckCircle2,
  FileText,
  Sparkles,
  Terminal,
} from "lucide-react";
import PdsVisual from "./PdsVisual";

export const metadata = {
  title: "PDS Bank – IIT Kharagpur Programming & Data Structures",
  description:
    "The official PDS Bank for CS10001 / CS11001 at IIT Kharagpur. Practice 208+ curated C programming lab problems with verified solutions, embedded WebAssembly compiler, and unit lecture notes.",
  keywords: [
    "PDS IIT Kharagpur",
    "CS10001",
    "CS11001",
    "IIT KGP PDS",
    "Programming and Data Structures",
    "C programming practice",
    "PDS lab problems",
    "PDS lecture notes",
    "Online C compiler IIT Kharagpur",
    "KodeinKGP",
  ],
  alternates: {
    canonical: "/pds",
  },
  openGraph: {
    title: "PDS Bank – IIT Kharagpur Programming & Data Structures | KodeinKGP",
    description:
      "Practice 208+ lab problems, verified C implementations, interactive browser compiler, and lecture notes tailored for IIT Kharagpur.",
    url: "/pds",
    type: "website",
    siteName: "KodeinKGP",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDS Bank – IIT Kharagpur Programming & Data Structures",
    description:
      "208+ curated lab problems with verified C solutions and an embedded zero-latency compiler.",
  },
};

const COURSE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Programming and Data Structures (PDS)",
  courseCode: "CS10001 / CS11001",
  description:
    "Comprehensive resource bank for the first-year Programming & Data Structures curriculum at IIT Kharagpur. Includes 208+ tested lab assignments, in-browser C compiler, and lecture notes.",
  provider: {
    "@type": "CollegeOrUniversity",
    name: "IIT Kharagpur",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    instructor: {
      "@type": "Organization",
      name: "KodeinKGP",
    },
  },
};

const FEATURES = [
  {
    icon: Code2,
    title: "Complete C/C++ Solutions",
    description: "Every single problem includes clean, tested reference code with standard formatting and idiomatic C programming practices.",
  },
  {
    icon: Terminal,
    title: "Embedded In-House Compiler",
    description: "Compile and execute your code directly inside each lab problem with our zero-latency WebAssembly compiler.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_JSON_LD) }}
      />
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


      
    </main>
    </>
  );
}
