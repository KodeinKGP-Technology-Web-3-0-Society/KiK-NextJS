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
      { name: "freeCodeCamp", href: "https://www.youtube.com/watch?v=gyMwXuJrbJQ" },
      { name: "Code Eater", href: "https://www.youtube.com/@CodeEater21/videos" },
      { name: "Whiteboard Crypto", href: "https://www.youtube.com/@WhiteboardCrypto" },
      { name: "Finematics", href: "https://www.youtube.com/@Finematics" },
    ],
  },
  {
    title: "Machine Learning",
    links: [
      { name: "DeepLearningAI", href: "https://www.youtube.com/@Deeplearningai" },
      { name: "Siraj Raval", href: "https://www.youtube.com/@SirajRaval/about" },
      { name: "sentdex", href: "https://www.youtube.com/@sentdex/playlists" },
      { name: "Corey Schafer", href: "https://www.youtube.com/@coreyms/about" },
    ],
  },
  {
    title: "Web Development",
    links: [
      { name: "CodeWithHarry", href: "https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg" },
      { name: "Apna College", href: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3H6c9OGXb5_6wcc1Mca52n" },
      { name: "net ninja", href: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G" },
      { name: "Traversy Media", href: "https://www.youtube.com/playlist?list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[#243158] bg-[#0b1430] text-[#ece9e1]">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src={Logo} alt="KiK Logo" className="h-10 w-10 object-contain" />
              <div>
                <span className="block text-xl font-bold tracking-tight text-[#ece9e1]">KodeinKGP</span>
                <span className="font-mono text-xs text-[var(--accent)]">Technology Web 3.0 Society</span>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-[#9aa3b8]">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#243158] bg-[#0f1a3a] text-[#9aa3b8] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5"
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
                        className="text-sm text-[#9aa3b8] transition-colors hover:text-[#ece9e1]"
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
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#243158] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-[#9aa3b8]">
            &copy; {new Date().getFullYear()} KodeinKGP. Open source & student-led.
          </p>
          <div className="flex items-center gap-6 font-mono text-xs text-[#9aa3b8]">
            <Link href="/pds" className="hover:text-[#ece9e1] transition-colors">
              PDS Bank
            </Link>
            <Link href="/articles" className="hover:text-[#ece9e1] transition-colors">
              Articles
            </Link>
            <Link href="/teams" className="hover:text-[#ece9e1] transition-colors">
              Teams
            </Link>
            <Link href="/events" className="hover:text-[#ece9e1] transition-colors">
              Events
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
