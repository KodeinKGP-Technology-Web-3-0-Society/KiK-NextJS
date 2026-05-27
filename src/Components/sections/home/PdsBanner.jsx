// Server Component
import Link from "next/link";
import Image from "next/image";
import programmer from "../../../../public/programmer-image.png";

export default function PdsBanner() {
  return (
    <section className="section-container py-10 md:py-16">
      <Link href="/pds" className="group block">
        <div className="relative overflow-hidden rounded-card-lg glass-brand p-8 transition-all duration-400 hover:shadow-glow-md md:p-12">
          {/* Decorative inner glow on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-card-lg bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-400/5 group-hover:to-transparent group-hover:opacity-100" />

          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
            {/* Text */}
            <div className="max-w-lg text-center md:text-left">
              <p className="mono-label mb-3">Programming Data Structures</p>
              <h2 className="text-gradient mb-3 font-kanit text-display-md font-bold md:text-display-lg">
                Still Getting Stuck in PDS?
              </h2>
              <p className="mb-6 font-poppins text-sm leading-relaxed text-white/50 md:text-base">
                Our curated set of 260+ problems covers every topic you need — from arrays
                and linked lists to trees, graphs, and dynamic programming.
              </p>
              <span className="inline-flex items-center gap-2 rounded-pill bg-cyan-400 px-6 py-2.5 font-poppins text-sm font-semibold text-navy-950 transition-all duration-300 group-hover:bg-cyan-300 group-hover:shadow-glow-sm">
                Explore PDS Bank
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>

            {/* Illustration */}
            <div className="w-48 flex-shrink-0 md:w-64">
              <Image
                src={programmer}
                alt="Programmer illustration"
                className="drop-shadow-[0_0_30px_rgba(17,227,251,0.25)] transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
