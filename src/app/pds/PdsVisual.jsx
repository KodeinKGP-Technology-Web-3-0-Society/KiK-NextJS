import Image from "next/image";

export default function PdsVisual() {
  return (
    <div className="group relative mx-auto w-full max-w-[380px] md:ml-auto md:mr-0">
      {/* Subtle background glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2ea8ff]/20 to-[#5ce1e6]/10 opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#243158] bg-[#0f1a3a] shadow-2xl transition-all duration-300 group-hover:border-[var(--accent)]">
        {/* Terminal / Code Window Header */}
        <div className="flex items-center justify-between border-b border-[#243158] bg-[#0b1430]/90 px-4 py-3 font-mono text-xs text-[#9aa3b8]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e5484d]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f5c542]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#2ea8ff]/80" />
            <span className="ml-2 font-semibold text-[#ece9e1]">
              PDS Lab & Algorithms
            </span>
          </div>
          <span className="rounded bg-[var(--accent)]/15 px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
            C / C++
          </span>
        </div>

        {/* Relatable illustration */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070d22]">
          <Image
            src="/pds_hero.png"
            alt="IIT Kharagpur PDS Student Coding Algorithms and Data Structures"
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
          />
        </div>

        {/* Card Footer Tagline */}
        <div className="flex items-center justify-between border-t border-[#243158] bg-[#0b1430]/60 px-4 py-2.5 font-mono text-[11px] text-[#9aa3b8]">
          <span>Problems &bull; Solutions</span>
          <span className="whitespace-nowrap text-[var(--accent)]">IIT Kharagpur</span>
        </div>
      </div>
    </div>
  );
}
