"use client";
import Lottie from "lottie-react";
import WEB from "../../data/animations/WEB.json";
import Blockchain from "../../data/animations/Blockchain.json";
import Robo from "../../data/animations/Robo.json";
import { Section } from "./ui";

const AREAS = [
  { title: "Blockchain", anim: Blockchain, text: "Smart contracts, consensus and how decentralised apps fit together. Most of our hackathons have had a blockchain track." },
  { title: "Artificial intelligence", anim: Robo, text: "From neural-network basics to building with current models, in sessions run by seniors who've done it." },
  { title: "Web development", anim: WEB, text: "This site, dekodeX and the PDS Bank are built by members. New members learn by shipping to them." },
];

export default function Focus() {
  return (
    <Section label="What we do" title="Three things we keep coming back to.">
      <div className="grid gap-5 md:grid-cols-3">
        {AREAS.map((a) => (
          <div
            key={a.title}
            className="group rounded-lg border border-[#1e2333] bg-[#11141d] p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
          >
            <div className="mx-auto h-40 w-40 overflow-hidden">
              <Lottie animationData={a.anim} style={{ width: "100%", height: "100%" }} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#f8fafc]">{a.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{a.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
