"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/KIK_logo-removebg.png";
import IonIcon from "../utils/ionicon";

const SOCIAL_LINKS = [
  {
    name: "logo-facebook",
    href: "https://www.facebook.com/kodeinkgp?mibextid=ZbWKwL",
    label: "Facebook",
  },
  {
    name: "logo-instagram",
    href: "https://www.instagram.com/kodeinkgp_iitkgp?igsh=cmhyMXM3YTA5YzZm",
    label: "Instagram",
  },
  {
    name: "logo-linkedin",
    href: "https://www.linkedin.com/company/kodeinkgp/",
    label: "LinkedIn",
  },
  {
    name: "logo-medium",
    href: "https://medium.com/@kodeinkgp",
    label: "Medium",
  },
  {
    name: "logo-whatsapp",
    href: "https://chat.whatsapp.com/IFt69sSqZsu7FlRWl3EIbk",
    label: "WhatsApp",
  },
];

const RESOURCE_COLUMNS = [
  {
    title: "Blockchain",
    links: [
      { name: "CryptoZombies", href: "https://cryptozombies.io" },
      { name: "Speedrun Ethereum", href: "https://speedrunethereum.com" },
      { name: "Ethernaut", href: "https://ethernaut.openzeppelin.com" },
      { name: "Cyfrin Updraft", href: "https://updraft.cyfrin.io" },
      { name: "Patrick Collins (YouTube)", href: "https://www.youtube.com/@PatrickAlphaC" },
    ],
  },
  {
    title: "AI & Machine Learning",
    links: [
      { name: "Hugging Face Learn", href: "https://huggingface.co/learn" },
      { name: "Karpathy: Zero to Hero", href: "https://karpathy.ai/zero-to-hero.html" },
      { name: "Kaggle Learn", href: "https://www.kaggle.com/learn" },
      { name: "TensorFlow Playground", href: "https://playground.tensorflow.org" },
      { name: "3Blue1Brown (YouTube)", href: "https://www.youtube.com/@3blue1brown" },
    ],
  },
  {
    title: "Web Development",
    links: [
      { name: "The Odin Project", href: "https://www.theodinproject.com" },
      { name: "Scrimba", href: "https://scrimba.com" },
      { name: "roadmap.sh", href: "https://roadmap.sh" },
      { name: "MDN: Learn Web Dev", href: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
      { name: "Fireship (YouTube)", href: "https://www.youtube.com/@Fireship" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[#1e2333] bg-[#08090d] text-[#f8fafc]">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src={Logo} alt="KiK Logo" className="h-10 w-10 object-contain" />
              <div>
                <span className="block text-xl font-bold tracking-tight text-[#f8fafc]">KodeinKGP</span>
                <span className="font-mono text-xs text-[var(--accent)]">Technology Web 3.0 Society</span>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-[#94a3b8]">
              Indian Institute of Technology Kharagpur,
              <br />
              West Bengal - 721302
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e2333] bg-[#11141d] text-[#94a3b8] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5"
                >
                  <IonIcon size="default" name={s.name} className="text-current" />
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {RESOURCE_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--accent)]">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#94a3b8] transition-colors hover:text-[#f8fafc]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1e2333] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-[#94a3b8]">
            &copy; {new Date().getFullYear()} KodeinKGP. Open source & student-led.
          </p>
          <div className="flex items-center gap-6 font-mono text-xs text-[#94a3b8]">
            <Link href="/pds" className="hover:text-[#f8fafc] transition-colors">
              PDS Bank
            </Link>
            <Link href="/articles" className="hover:text-[#f8fafc] transition-colors">
              Articles
            </Link>
            <Link href="/teams" className="hover:text-[#f8fafc] transition-colors">
              Teams
            </Link>
            <Link href="/events" className="hover:text-[#f8fafc] transition-colors">
              Events
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
