"use client";
import Lottie from "lottie-react";
import WEBDEV from "../../data/animations/WEB.json";
import Robot from "../../data/animations/Robo.json";
import Blockchain from "../../data/animations/Blockchain.json";
import Reveal, { SpotlightCard } from "./Reveal";

const AREAS = [
  { title: "Web", anim: WEBDEV, text: "Crafting dynamic, responsive websites that deliver exceptional user experiences across all devices." },
  { title: "AI & Metaverse", anim: Robot, text: "Enter a realm where AI drives immersive Metaverse encounters, pushing the boundaries of what's possible." },
  { title: "Blockchain", anim: Blockchain, text: "Building the decentralized future with secure, transparent blockchain solutions and smart contracts." },
];

export default function Expertise() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal className="mb-12 text-center">
        <p className="font-poppins text-sm tracking-[0.25em] text-[#11e3fb] uppercase">What we do</p>
        <h2 className="kik-gradient-text mt-3 font-kanit text-4xl font-bold md:text-5xl">Our Expertise</h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {AREAS.map((a, i) => (
          <Reveal key={a.title} delay={i * 120}>
            <SpotlightCard className="group h-full rounded-3xl border border-white/10 bg-[#07072e]/70 p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#11e3fb]/50 hover:shadow-[0_20px_60px_-20px_rgba(17,227,251,0.35)]">
              <div className="mx-auto h-48 w-48 overflow-hidden transition-transform duration-500 group-hover:scale-110">
                <Lottie animationData={a.anim} style={{ width: "100%", height: "100%" }} />
              </div>
              <h3 className="mt-2 font-kanit text-2xl font-semibold text-[#5be6ff]">{a.title}</h3>
              <p className="mt-3 font-poppins text-sm leading-6 text-[#a8b3c4]">{a.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
