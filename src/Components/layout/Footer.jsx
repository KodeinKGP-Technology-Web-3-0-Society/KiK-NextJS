// Server Component — no "use client" needed
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/KIK_logo-removebg.png";

const SOCIAL = [
  { href: "https://www.facebook.com/kodeinkgp?mibextid=ZbWKwL",              label: "Facebook",  icon: "fa-facebook-f" },
  { href: "https://www.instagram.com/kodeinkgp_iitkgp?igsh=cmhyMXM3YTA5YzZm", label: "Instagram", icon: "fa-instagram" },
  { href: "https://www.linkedin.com/company/kodeinkgp/",                     label: "LinkedIn",  icon: "fa-linkedin-in" },
  { href: "https://medium.com/@kodeinkgp",                                   label: "Medium",    icon: "fa-medium" },
  { href: "https://chat.whatsapp.com/IFt69sSqZmu7FlRWl3EIbk",               label: "WhatsApp",  icon: "fa-whatsapp" },
];

const RESOURCES = [
  {
    title: "Blockchain",
    links: [
      { label: "freeCodeCamp",     href: "https://www.youtube.com/watch?v=gyMwXuJrbJQ" },
      { label: "Code Eater",       href: "https://www.youtube.com/@CodeEater21/videos" },
      { label: "Whiteboard Crypto",href: "https://www.youtube.com/@WhiteboardCrypto" },
      { label: "Finematics",       href: "https://www.youtube.com/@Finematics" },
    ],
  },
  {
    title: "Machine Learning",
    links: [
      { label: "DeepLearning.AI",  href: "https://www.youtube.com/@Deeplearningai" },
      { label: "Siraj Raval",      href: "https://www.youtube.com/@SirajRaval/about" },
      { label: "sentdex",          href: "https://www.youtube.com/@sentdex/playlists" },
      { label: "Corey Schafer",    href: "https://www.youtube.com/@coreyms/about" },
    ],
  },
  {
    title: "Web Development",
    links: [
      { label: "CodeWithHarry",    href: "https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg" },
      { label: "Apna College",     href: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3H6c9OGXb5_6wcc1Mca52n" },
      { label: "Net Ninja",        href: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G" },
      { label: "Traversy Media",   href: "https://www.youtube.com/playlist?list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU" },
    ],
  },
];

const SITE_LINKS = [
  { href: "/",         label: "Home" },
  { href: "/events",   label: "Events" },
  { href: "/teams",    label: "Teams" },
  { href: "/articles", label: "Articles" },
  { href: "/pds",      label: "PDS Bank" },
  { href: "/dekodeX",  label: "dekodeX" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/[0.07]">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="section-container py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <Image src={Logo} alt="KodeinKGP" width={40} height={40} />
              <span className="font-kanit text-xl font-bold text-white">KodeinKGP</span>
            </Link>
            <p className="mb-2 font-poppins text-sm leading-relaxed text-white/50">
              Web 3.0 &amp; Technology Society<br />
              Indian Institute of Technology Kharagpur<br />
              West Bengal — 721302
            </p>

            {/* Quick site links */}
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-poppins text-xs text-white/40 transition-colors duration-200 hover:text-cyan-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-200 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-glow-sm"
                >
                  <i className={`fab ${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Resource columns */}
          {RESOURCES.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-kanit text-sm font-semibold uppercase tracking-widest text-white/70">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-poppins text-sm text-white/40 transition-colors duration-200 hover:text-cyan-400"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-white/25">
            © {new Date().getFullYear()} KodeinKGP — IIT Kharagpur
          </p>
          <p className="font-mono text-xs text-white/20">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
