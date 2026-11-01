import Link from "next/link";
import Reveal, { SpotlightCard } from "./Reveal";

const PROGRAMS = [
  { href: "/dekodeX", icon: "⚔️", title: "dekodeX", text: "Our flagship competitive coding arena: daily DSA challenges, a live leaderboard and certificates.", span: "md:col-span-2 md:row-span-2", big: true },
  { href: "/pds", icon: "💻", title: "PDS Practice", text: "260+ curated Programming & Data Structures problems with theory notes." },
  { href: "/tech-triad", icon: "🚀", title: "TechTriad Hackathon", text: "National-level hackathon with Kshitij 2026." },
  { href: "/articles", icon: "📚", title: "Articles", text: "Deep dives into Web3, AI and blockchain written by our members." },
  { href: "/events", icon: "🎤", title: "Events", text: "Workshops, sessions and hackathons from past seasons." },
];

export default function Programs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal className="mb-12 text-center">
        <p className="font-poppins text-sm tracking-[0.25em] text-[#11e3fb] uppercase">Explore</p>
        <h2 className="kik-gradient-text mt-3 font-kanit text-4xl font-bold md:text-5xl">Start Your Journey</h2>
      </Reveal>
      <div className="grid auto-rows-[minmax(170px,auto)] gap-5 md:grid-cols-4">
        {PROGRAMS.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className={p.span || "md:col-span-1"}>
            <SpotlightCard
              as={Link}
              href={p.href}
              className={`group flex h-full flex-col justify-between rounded-3xl border border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#11e3fb]/50 ${p.big ? "bg-gradient-to-br from-[#0a2f45] via-[#071a40] to-[#06103a]" : "bg-[#07072e]/70"}`}
            >
              <div>
                <span className={`inline-block transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6 ${p.big ? "text-5xl" : "text-3xl"}`}>{p.icon}</span>
                <h3 className={`mt-4 font-kanit font-semibold text-white ${p.big ? "text-4xl" : "text-xl"}`}>{p.title}</h3>
                <p className={`mt-2 font-poppins leading-6 text-[#a8b3c4] ${p.big ? "max-w-md text-base" : "text-sm"}`}>{p.text}</p>
              </div>
              {p.big && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {["10-day challenges", "Live leaderboard", "Certificates", "DSA & problem solving"].map((c) => (
                    <span key={c} className="rounded-full border border-[#11e3fb]/30 bg-[#11e3fb]/10 px-3 py-1 font-poppins text-xs text-[#9deffc]">{c}</span>
                  ))}
                </div>
              )}
              <span className="mt-6 inline-flex items-center gap-1 font-poppins text-sm font-medium text-[#5be6ff]">
                Explore <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </span>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
