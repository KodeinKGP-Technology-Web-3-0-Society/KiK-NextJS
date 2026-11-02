import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PdsVisual from "./PdsVisual";

const PATHS = [
  {
    href: "/pds/lab",
    title: "Lab problems",
    text: "260+ lab questions by topic, with the solution code for each.",
    cta: "Open lab problems",
    primary: true,
  },
  {
    href: "/pds/theory",
    title: "Theory notes",
    text: "Revision PDFs for every unit, plus practice tests.",
    cta: "Open theory notes",
  },
];

export default function PdsHome() {
  return (
    <main className="bg-[#0b1430] font-sans text-[#ece9e1] antialiased">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-12 md:grid-cols-[1.1fr_1fr] md:gap-14 md:px-8 md:pt-16">
        <div>
          <h1 className="text-4xl leading-tight font-bold tracking-[-0.03em] text-[#ece9e1] sm:text-5xl md:text-6xl">
            PDS Bank
          </h1>
          <p className="mt-3 text-lg font-medium text-[var(--accent)] md:text-xl">
            Programming and Data Structures
          </p>
          <p className="mt-4 max-w-md text-base leading-7 text-[#9aa3b8]">
            Practice problems and notes for the first-year PDS course at IIT Kharagpur.
          </p>
        </div>
        <PdsVisual />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex min-h-[200px] flex-col justify-between rounded-xl border border-[#243158] bg-[#0f1a3a] p-8 transition-colors hover:border-[var(--accent)]"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#ece9e1]">{p.title}</h2>
                <p className="mt-3 max-w-sm text-[15px] leading-7 text-[#9aa3b8]">{p.text}</p>
              </div>
              <span
                className={`mt-8 inline-flex items-center gap-2 self-start rounded-md px-5 py-3 text-sm font-semibold transition-transform group-hover:translate-x-1 ${
                  p.primary
                    ? "bg-[var(--accent)] text-[#0b1430]"
                    : "border border-[#3a4a7a] text-[#ece9e1]"
                }`}
              >
                {p.cta}
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
