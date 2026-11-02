import Link from "next/link";

// Shared homepage primitives. Palette:
// bg #08090d · panel #11141d · rule #1e2333 · text #f8fafc · muted #94a3b8 · accent var(--accent)

export function Section({ label, title, children, className = "" }) {
  return (
    <section className={`border-t border-[#1e2333] ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
        <div className="mb-8 grid gap-2 md:mb-14 md:grid-cols-[180px_1fr] md:gap-4">
          <p className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase md:text-[#94a3b8]">
            {label}
          </p>
          {title && (
            <h2 className="max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-[#f8fafc] sm:text-3xl md:text-4xl">
              {title}
            </h2>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function TextLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[#f8fafc] ${className}`}
    >
      <span className="underline decoration-[#2a334d] decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-[var(--accent)]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </Link>
  );
}
