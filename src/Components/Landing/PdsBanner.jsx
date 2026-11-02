import Link from "next/link";
import Laptop from "./Laptop";

const LINKS = [
  { href: "/pds/lab", label: "Lab problems" },
  { href: "/pds/theory", label: "Theory notes" },
];

export default function PdsBanner() {
  return (
    <section className="border-t border-[#243158]">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid items-center gap-8 overflow-hidden rounded-xl border border-[#243158] bg-[#0f1a3a] p-5 text-[#ece9e1] sm:p-7 md:grid-cols-[1.2fr_1fr] md:p-12">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wide text-[var(--accent)]">
              PDS Bank &bull; for first-years
            </p>
            <h2 className="mt-3 text-2xl leading-tight font-bold tracking-tight text-[#ece9e1] sm:text-3xl md:text-5xl">
              Stuck on a PDS lab? Start here.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#9aa3b8] sm:text-[15px] sm:leading-7">
              260+ problems from the Programming and Data Structures course,
              sorted by topic, with theory notes for every unit.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
              <Link
                href="/pds"
                className="rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#0b1430] transition-transform hover:-translate-y-0.5"
              >
                Open PDS Bank
              </Link>
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md border border-[#3a4a7a] px-4 py-2 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <Laptop />
        </div>
      </div>
    </section>
  );
}
