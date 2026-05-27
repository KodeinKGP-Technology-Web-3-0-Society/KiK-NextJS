/**
 * Button — The site's single button primitive.
 * Variants: primary | outline | ghost
 * Sizes: sm | md | lg
 *
 * @example
 *   <Button variant="primary" size="md" href="/regform">Apply Now</Button>
 *   <Button variant="outline" onClick={fn}>Learn More</Button>
 */

"use client";

import Link from "next/link";

const BASE =
  "inline-flex items-center justify-center gap-2 font-poppins font-semibold " +
  "rounded-pill transition-all duration-400 ease-smooth-out focus-visible:outline " +
  "focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 " +
  "disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer";

const VARIANTS = {
  primary:
    "bg-brand text-navy-950 hover:bg-cyan-300 hover:shadow-glow-md " +
    "active:scale-[0.97]",
  outline:
    "bg-transparent text-brand border border-border-accent " +
    "hover:bg-brand/10 hover:border-brand hover:shadow-glow-sm " +
    "active:scale-[0.97]",
  ghost:
    "bg-transparent text-stone-400 hover:text-white hover:bg-white/5 " +
    "active:scale-[0.97]",
};

const SIZES = {
  sm: "px-4 py-2 text-body-sm",
  md: "px-6 py-3 text-body-md",
  lg: "px-8 py-4 text-body-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  className = "",
  children,
  ...props
}) {
  const classes = [BASE, VARIANTS[variant], SIZES[size], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
