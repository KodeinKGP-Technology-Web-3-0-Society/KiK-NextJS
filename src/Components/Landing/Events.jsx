import Image from "next/image";
import Link from "next/link";
import events from "../../data/events/EventsData.json";
import { Section, TextLink } from "./ui";

// A mix of hackathons, contests and workshops from EventsData.json
const PICK = [1, 2, 8, 3, 9, 10]; // dekodeX first: most recent

const TILT = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-1",
  "rotate-1",
];
const PIN = ["#e5484d", "#2ea8ff", "#f5c542", "#2ea8ff", "#e5484d", "#f5c542"];

// Flat thumbtack seen from the side, stuck in at an angle. Two-tone, no gradients.
function Pin({ color }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="pointer-events-none absolute -top-6 left-1/2 z-10 h-12 w-12 -translate-x-1/2 transition-transform duration-300 group-hover:rotate-[8deg]"
    >
      {/* flat shadow on the poster */}
      <path d="M22 30 L34 38 L30 41 L19 33 Z" fill="#0b1430" opacity="0.18" />
      <g transform="rotate(35 24 24)">
        {/* needle */}
        <path d="M23 30 L24 44 L25 30 Z" fill="#8b93a7" />
        {/* base plate */}
        <rect x="14" y="27" width="20" height="4" rx="2" fill={color} />
        <rect
          x="14"
          y="29"
          width="20"
          height="2"
          rx="1"
          fill="#0b1430"
          opacity="0.25"
        />
        {/* waist */}
        <path d="M19 15 L29 15 L27 27 L21 27 Z" fill={color} />
        <path d="M24 15 L29 15 L27 27 L24 27 Z" fill="#0b1430" opacity="0.2" />
        {/* top cap */}
        <rect x="15" y="9" width="18" height="7" rx="3.5" fill={color} />
        <rect
          x="24"
          y="9"
          width="9"
          height="7"
          rx="3.5"
          fill="#0b1430"
          opacity="0.2"
        />
        <rect
          x="18"
          y="10.5"
          width="5"
          height="2"
          rx="1"
          fill="#fff"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

const kind = (h) =>
  /workshop|training|session/i.test(h)
    ? "Workshop"
    : /dekodex/i.test(h)
      ? "Contest"
      : "Hackathon";

export default function Events() {
  const items = PICK.map((id) => events.find((e) => e.id === id)).filter(
    Boolean
  );
  return (
    <Section label="Past events" title="Past events and workshops.">
      <div className="rounded-lg border border-[#1e2333] bg-[#11141d] px-5 py-12 md:px-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e, i) => (
            <Link
              key={e.id}
              href="/events"
              className={`group relative block bg-[#f8fafc] p-2.5 pb-4 shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:z-10 hover:scale-[1.04] hover:rotate-0 sm:${TILT[i]}`}
            >
              <Pin color={PIN[i]} />
              <div className="relative aspect-[4/3] overflow-hidden bg-[#08090d]">
                {e.imageFocus === "square" && (
                  <Image
                    src={e.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="120px"
                    className="scale-125 object-cover opacity-70 blur-2xl"
                  />
                )}
                <Image
                  src={e.image}
                  alt={e.heading}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                  className={e.imageFocus === "square" ? "object-contain" : "object-cover"}
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3 px-1">
                <p className="font-mono text-[13px] font-semibold text-[#08090d]">
                  {e.heading}
                </p>
                <span className="shrink-0 font-mono text-[11px] text-[#64748b]">
                  {kind(e.heading)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <TextLink href="/events" className="text-sm">
          All events
        </TextLink>
      </div>
    </Section>
  );
}
