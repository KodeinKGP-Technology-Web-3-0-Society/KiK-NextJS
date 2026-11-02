"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../../../public/KIK_logo-removebg.png";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/dekodeX", label: "dekodeX" },
  { href: "/pds", label: "PDS Bank" },
  { href: "/articles", label: "Articles" },
  { href: "/teams", label: "Teams" },
  { href: "/events", label: "Events" },
];

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname?.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1e2333] bg-[#08090d]">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={Logo} alt="" className="h-9 w-9" priority />
          <span className="text-[17px] font-semibold tracking-tight text-[#f8fafc]">KodeinKGP</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative block px-3 py-2 text-[15px] font-medium transition-colors ${
                    active ? "text-[#f8fafc]" : "text-[#94a3b8] hover:text-[#f8fafc]"
                  }`}
                >
                  {l.label}
                  {active && <span className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-[var(--accent)]" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span className={`h-[2px] w-6 bg-[#f8fafc] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-[#f8fafc] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-[#f8fafc] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <ul className="border-t border-[#1e2333] bg-[#08090d] px-5 pb-4 md:hidden">
          {LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href} className="border-b border-[#1e2333] last:border-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-3.5 text-base ${
                    active ? "text-[var(--accent)]" : "text-[#f8fafc]"
                  }`}
                >
                  {l.label}
                  <span aria-hidden="true" className="text-[#9aa3b8]">&rarr;</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
