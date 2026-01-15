"use client";

import React from "react";
import Link from "next/link";
const TechTriadPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#01011b]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-[#33bbcf]/20 blur-3xl"></div>
        <div className="absolute right-16 bottom-32 h-96 w-96 animate-pulse rounded-full bg-[#87CEEB]/10 blur-3xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 h-64 w-64 animate-pulse rounded-full bg-[#def9fa]/15 blur-3xl delay-500"></div>
        <div className="absolute bottom-20 left-1/4 h-80 w-80 animate-pulse rounded-full bg-[#5ce1e6]/10 blur-3xl delay-700"></div>
      </div>

      {/* Main Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-4">
        {/* Main Container */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1
            className="mb-4 font-[kanit] text-5xl font-bold md:text-6xl lg:text-7xl"
            style={{
              background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
                          #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
                          #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(135, 206, 235, 0.4))",
            }}
          >
            TechTriad Hackathon
          </h1>

          {/* Decorative Line */}
          <div className="mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-[#33bbcf] to-transparent"></div>

          {/* Description Card */}
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-[#87CEEB]/40 bg-gradient-to-br from-[#0a0a2e]/80 to-[#01011b]/90 p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#33bbcf]/60 hover:shadow-2xl hover:shadow-[#87CEEB]/20 md:p-12">
            {/* Card glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#87CEEB]/5 via-[#33bbcf]/10 to-[#87CEEB]/5 opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
              <p className="mb-4 font-[Poppins] text-lg leading-relaxed text-gray-300 md:text-xl">
                KodeinKGP: Technology Web3.0 Society, in collaboration with
                Kshitij 2026, presents a national-level hackathon bringing
                together developers, designers, and innovators to build
                impactful, future-ready solutions. The hackathon encourages
                participants to explore cutting-edge technologies, collaborate
                intensively, and solve real-world problems through creativity,
                technical depth, and practical execution.
              </p>
            </div>
          </div>
          <div className="mt-3 relative mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-[#87CEEB]/40 bg-gradient-to-br from-[#0a0a2e]/80 to-[#01011b]/90 p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#33bbcf]/60 hover:shadow-2xl hover:shadow-[#87CEEB]/20 md:p-8">
            {/* Card glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#87CEEB]/5 via-[#33bbcf]/10 to-[#87CEEB]/5 opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Schedule Header with Icon */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#5ce1e6]/20 to-[#33bbcf]/20 border border-[#5ce1e6]/30">
                  <svg className="h-5 w-5 text-[#5ce1e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3
                  className="font-[Kanit] text-2xl font-bold tracking-wide md:text-3xl"
                  style={{
                    background: `linear-gradient(90deg, #87CEEB 0%, #5ce1e6 50%, #33bbcf 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Event Schedule
                </h3>
              </div>

              {/* Main Description */}
              <p className="mb-5 font-[Poppins] text-base leading-relaxed text-gray-300 md:text-lg">
                The TechTriad Hackathon is a <span className="font-semibold text-[#5ce1e6]">36-hour challenge</span> bringing together innovators to create impactful solutions.
              </p>

              {/* Timeline Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Registration */}
                <div className="group rounded-xl border border-[#87CEEB]/30 bg-gradient-to-br from-[#0a0a2e]/60 to-[#01011b]/80 p-4 transition-all duration-300 hover:border-[#5ce1e6]/50 hover:shadow-lg hover:shadow-[#5ce1e6]/10">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#87CEEB] animate-pulse"></div>
                    <span className="font-[Kanit] text-sm font-semibold uppercase tracking-wider text-[#87CEEB]">Reporting Time</span>
                  </div>
                  <p className="font-[Poppins] text-gray-300">
                    <span className="block text-xl font-bold text-white md:text-2xl">11:00 PM</span>
                    <span className="text-sm text-gray-400">January 16th, 2026</span>
                  </p>
                  <p className="mt-2 text-xs text-gray-400 italic">Mandatory arrival for verification</p>
                </div>

                {/* Start Time */}
                <div className="group rounded-xl border border-[#5ce1e6]/30 bg-gradient-to-br from-[#0a0a2e]/60 to-[#01011b]/80 p-4 transition-all duration-300 hover:border-[#5ce1e6]/50 hover:shadow-lg hover:shadow-[#5ce1e6]/10">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#5ce1e6] animate-pulse"></div>
                    <span className="font-[Kanit] text-sm font-semibold uppercase tracking-wider text-[#5ce1e6]">Hackathon Start</span>
                  </div>
                  <p className="font-[Poppins] text-gray-300">
                    <span className="block text-xl font-bold text-white md:text-2xl">12:00 AM</span>
                    <span className="text-sm text-gray-400">January 17th, 2026</span>
                  </p>
                </div>

                {/* End Time */}
                <div className="group rounded-xl border border-[#33bbcf]/30 bg-gradient-to-br from-[#0a0a2e]/60 to-[#01011b]/80 p-4 transition-all duration-300 hover:border-[#33bbcf]/50 hover:shadow-lg hover:shadow-[#33bbcf]/10 md:col-span-2">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#33bbcf] animate-pulse"></div>
                    <span className="font-[Kanit] text-sm font-semibold uppercase tracking-wider text-[#33bbcf]">Hackathon End</span>
                  </div>
                  <p className="font-[Poppins] text-gray-300">
                    <span className="block text-xl font-bold text-white md:text-2xl">12:00 PM</span>
                    <span className="text-sm text-gray-400">January 18th, 2026</span>
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {/* <div className="group inline-flex items-center gap-3 rounded-full border border-[#5ce1e6]/50 bg-[#0a0a2e]/60 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:border-[#5ce1e6]/80 hover:shadow-lg hover:shadow-[#5ce1e6]/20">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5ce1e6] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#33bbcf]"></span>
              </span>
              <p
                className="font-[kanit] text-lg font-semibold tracking-wide md:text-xl"
                style={{
                  background: `linear-gradient(90deg, #87CEEB 0%, #5ce1e6 50%, #33bbcf 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Link href="https://www.ktj.in/events">
                  Register Here
                </Link>
              </p>
            </div> */}

            <div className="group inline-flex items-center gap-3 rounded-full border border-[#5ce1e6]/50 bg-[#0a0a2e]/60 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:border-[#5ce1e6]/80 hover:shadow-lg hover:shadow-[#5ce1e6]/20">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5ce1e6] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#33bbcf]"></span>
              </span>
              <p
                className="font-[kanit] text-lg font-semibold tracking-wide md:text-xl"
                style={{
                  background: `linear-gradient(90deg, #87CEEB 0%, #5ce1e6 50%, #33bbcf 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Link href="https://drive.google.com/file/d/11KFMtEQy1_ITLdMYAMu2N-SjhrMFgHjT/view?usp=sharing" target="_blank">
                  Checkout the PS
                </Link>
              </p>
            </div>
          </div>


          {/* Registration Notice */}
          {/* <div className="mt-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#5ce1e6]/50 bg-[#0a0a2e]/60 px-8 py-4 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5ce1e6] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#33bbcf]"></span>
              </span>
              <p
                className="font-[kanit] text-xl font-semibold tracking-wide md:text-2xl"
                style={{
                  background: `linear-gradient(90deg, #87CEEB 0%, #5ce1e6 50%, #33bbcf 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfkyCaOo85DJdQTJkUJ-tt5RDHkkwoA4ShCweceFS0f0iYaSA/viewform?usp=dialog" target="_blank">
                  Submit
                </Link>
              </p>
            </div>
          </div> */}
        </div>

        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute top-1/4 left-10 h-2 w-2 animate-pulse rounded-full bg-[#5ce1e6] opacity-60"></div>
        <div className="pointer-events-none absolute top-1/3 right-20 h-3 w-3 animate-pulse rounded-full bg-[#87CEEB] opacity-40 delay-300"></div>
        <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-2 w-2 animate-pulse rounded-full bg-[#33bbcf] opacity-50 delay-500"></div>
        <div className="pointer-events-none absolute right-1/3 bottom-1/3 h-4 w-4 animate-pulse rounded-full bg-[#def9fa] opacity-30 delay-700"></div>
      </section>
    </div>
  );
};

export default TechTriadPage;
