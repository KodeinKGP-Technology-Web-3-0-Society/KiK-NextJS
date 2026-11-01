"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import events from "../../data/events/EventsData.json";
import Reveal from "./Reveal";

export default function RecentEvents() {
  const rail = useRef(null);
  const scroll = (dir) => rail.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  const items = events.slice(0, 8);

  return (
    <section className="py-16">
      <Reveal className="mx-auto mb-10 flex max-w-6xl items-end justify-between px-6">
        <div>
          <p className="font-poppins text-sm tracking-[0.25em] text-[#11e3fb] uppercase">Highlights</p>
          <h2 className="kik-gradient-text mt-3 font-kanit text-4xl font-bold md:text-5xl">Recent Events</h2>
        </div>
        <div className="hidden gap-2 md:flex">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Scroll left" : "Scroll right"}
              className="h-11 w-11 rounded-full border border-white/15 text-white transition hover:border-[#11e3fb] hover:bg-[#11e3fb]/10"
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </Reveal>

      <div ref={rail} className="kik-hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))]">
        {items.map((e) => (
          <Link
            key={e.id}
            href="/events"
            className="group w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-[#07072e]/70 transition duration-300 hover:-translate-y-2 hover:border-[#11e3fb]/50"
          >
            <div className="relative h-44 overflow-hidden">
              <Image src={e.image} alt={e.heading} fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07072e] to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-kanit text-lg font-semibold text-white">{e.heading}</h3>
              <p className="mt-2 line-clamp-3 font-poppins text-xs leading-5 text-[#a8b3c4]">{e.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
