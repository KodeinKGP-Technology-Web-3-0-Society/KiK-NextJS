"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/authContext";
import Logo from "../../../public/KIK_logo-removebg.png";

const NAV_LINKS = [
  { href: "/",         label: "Home" },
  { href: "/dekodeX",  label: "dekodeX" },
  { href: "/pds",      label: "PDS Bank" },
  { href: "/articles", label: "Articles" },
  { href: "/teams",    label: "Teams" },
  { href: "/events",   label: "Events" },
];

const CTA_LINK = { href: "/regform", label: "Selections" };

/* ── Underline hover link ─────────────────────────────────────── */
function NavLink({ href, label, pathname, onClick }) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-0 pb-1 font-poppins text-sm font-medium transition-colors duration-200 ${
        active ? "text-cyan-400" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-cyan-400 transition-transform duration-300 ease-smooth-out ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

/* ── CTA "Selections" link with ping dot ─────────────────────── */
function SelectionsCTA({ onClick }) {
  return (
    <Link
      href={CTA_LINK.href}
      onClick={onClick}
      className="relative inline-flex items-center gap-2 rounded-pill border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 font-poppins text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-400/80 hover:bg-cyan-400/20 hover:shadow-glow-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
      </span>
      {CTA_LINK.label}
    </Link>
  );
}

/* ── Mobile menu backdrop + panel ─────────────────────────────── */
const mobileMenuVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16,1,0.3,1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();
  const { loggedIn }          = useAuth();

  /* Track scroll for elevated glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.07] bg-navy-950/80 backdrop-blur-nav shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <nav className="section-container flex h-nav-h items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <Image src={Logo} alt="KodeinKGP logo" width={44} height={44} priority />
            <span className="font-kanit text-lg font-semibold tracking-wide text-white">
              KodeinKGP
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} label={l.label} pathname={pathname} />
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <SelectionsCTA />
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-6 origin-center rounded-full bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-[2px] w-6 rounded-full bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-6 origin-center rounded-full bg-white"
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm md:hidden"
            />
            {/* Panel */}
            <motion.div
              key="panel"
              variants={mobileMenuVariants}
              initial="hidden" animate="visible" exit="exit"
              className="fixed top-[var(--spacing-nav-h)] left-0 z-50 w-full glass border-b border-white/[0.08] px-6 py-6 md:hidden"
            >
              <ul className="flex flex-col gap-5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <NavLink href={l.href} label={l.label} pathname={pathname} onClick={close} />
                  </li>
                ))}
                <li className="pt-2">
                  <SelectionsCTA onClick={close} />
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
