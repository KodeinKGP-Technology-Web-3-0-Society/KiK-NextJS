// Server Component — reads static JSON, no Firebase, no "use client"
import Image from "next/image";
import Link from "next/link";
import eventsData from "@/data/events/EventsData.json";

/* Show the 3 most recently added events (last 3 in the array) */
const PREVIEW = eventsData.slice(-3).reverse();

function EventCard({ event }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card glass border border-white/[0.07] transition-all duration-400 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.heading}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-kanit text-lg font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-cyan-300">
          {event.heading}
        </h3>
        <p className="mb-4 flex-1 font-poppins text-sm leading-relaxed text-white/45 line-clamp-3">
          {event.description}
        </p>

        {/* Sponsor chips */}
        {Array.isArray(event.sponsor) && event.sponsor.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.sponsor.map((s) => (
              <span key={s} className="badge text-[0.68rem]">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventsPreview() {
  return (
    <section className="section-container py-10 md:py-16">
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mono-label mb-2">What we&apos;ve been up to</p>
          <h2 className="text-gradient font-kanit text-display-md font-bold md:text-display-lg">
            Recent Events
          </h2>
        </div>
        <Link
          href="/events"
          className="hidden items-center gap-2 font-poppins text-sm text-cyan-400 transition-all duration-200 hover:text-cyan-300 hover:underline underline-offset-4 md:inline-flex"
        >
          View all
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PREVIEW.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>

      {/* Mobile "view all" link */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 rounded-pill border border-cyan-400/35 px-6 py-2.5 font-poppins text-sm text-cyan-400 transition-all duration-200 hover:border-cyan-400/70 hover:bg-cyan-400/8"
        >
          View all events
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
