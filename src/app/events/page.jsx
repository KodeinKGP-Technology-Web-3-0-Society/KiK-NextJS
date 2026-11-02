"use client";

import data from "../../data/events/EventsData.json";
import Image from "next/image";
import Lottie from "lottie-react";
import BlockchainAnim from "../../data/animations/Blockchain.json";

const isWorkshop = (h) => /workshop|training|session/i.test(h);
const GROUPS = [
  {
    title: "Previous Hackathons",
    items: data.filter((e) => !isWorkshop(e.heading)),
    anim: true,
  },
  {
    title: "Previous Workshops",
    items: data.filter((e) => isWorkshop(e.heading)),
    anim: false,
  },
];

function EventCard({ event, order }) {
  const sponsors = Array.isArray(event.sponsor) ? event.sponsor : [];
  return (
    <div
      className="group relative mb-12 flex w-full max-w-[920px] items-center justify-center"
      style={{
        animation: `ev-rise 0.7s ease-out ${Math.min(order, 4) * 0.08}s both`,
      }}
    >
      <div className="relative w-full overflow-hidden rounded-[20px] border-2 border-[#87CEEB]/50 bg-[#070d26] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#33bbcf] hover:shadow-2xl hover:shadow-[#87CEEB]/20 md:p-8">
        <div className="flex items-center gap-8 max-lg:flex-col max-lg:gap-6">
          {/* Poster: whole image, never stretched; blurred copy fills the rest */}
          <div className="relative h-[320px] w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-[#0a0a2e] max-lg:w-full">
            <Image
              src={event.image}
              alt=""
              aria-hidden="true"
              fill
              sizes="120px"
              className="scale-125 object-cover opacity-70 blur-2xl"
            />
            <Image
              src={event.image}
              alt={event.heading}
              fill
              sizes="(max-width: 1024px) 90vw, 400px"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              priority={order < 3}
            />
          </div>

          {/* Details: always visible */}
          <div className="flex min-h-[240px] flex-1 flex-col justify-center text-left max-lg:text-center">
            <h3 className="m-0 font-[kanit] text-[30px] leading-tight text-white max-lg:text-[26px]">
              {event.heading}
            </h3>
            <div className="mt-3 h-[3px] w-16 rounded bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] max-lg:mx-auto" />
            <p className="mt-4 font-[poppins] text-[15px] leading-7 text-[#c5d3e0]">
              {event.description}
            </p>

            {sponsors.length > 0 && (
              <div className="mt-5">
                <p className="font-[poppins] text-sm font-semibold text-[#87CEEB]">
                  Sponsored by
                </p>
                <div className="mt-2 flex flex-wrap gap-3 max-lg:justify-center">
                  {sponsors.map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-md border border-[#87CEEB]/30 bg-[#87CEEB]/10 px-3 py-1.5"
                    >
                      {event.sponsor_img?.[i] && (
                        <div className="relative h-7 w-7 overflow-hidden rounded">
                          <Image
                            src={event.sponsor_img[i]}
                            alt={name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-[14px] font-medium text-white">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  let order = 0;
  return (
    <main className="relative overflow-hidden bg-[#0b1430] pb-8 font-sans text-[#ece9e1] antialiased">
      {GROUPS.map((group) => (
        <section
          key={group.title}
          className="relative mx-auto flex w-[95%] max-w-[1100px] flex-col"
        >
          <h2 className="mt-12 mb-10 flex items-center justify-center gap-5 text-center font-[kanit] text-[44px] font-bold text-[#def9fa] max-lg:flex-col max-lg:text-[34px]">
            {group.title}
            {group.anim ? (
              <span className="block h-[110px] w-[180px] overflow-hidden rounded-full border-4 border-[#87CEEB]/50 bg-[#0a0a2e] shadow-lg shadow-[#87CEEB]/30">
                <Lottie
                  animationData={BlockchainAnim}
                  style={{ width: "100%", height: "100%" }}
                />
              </span>
            ) : (
              <img
                src="/EventsImages/workshop-anim.webp"
                alt=""
                width={180}
                height={110}
                loading="lazy"
                decoding="async"
                className="h-[110px] w-[180px] rounded-full border-4 border-[#87CEEB]/50 object-cover shadow-lg shadow-[#87CEEB]/30"
              />
            )}
          </h2>

          {/* one event per row, joined by a single vertical line */}
          <div className="relative flex flex-col items-center">
            {group.items.map((event) => (
              <EventCard key={event.id} event={event} order={order++} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
