import Link from "next/link";

// Shared homepage primitives. Palette:
// bg #0b1430 · panel #0f1a3a · rule #243158 · text #ece9e1 · muted #9aa3b8 · accent var(--accent)

export function Section({ label, title, children, className = "" }) {
  return (
    <section className={`border-t border-[#243158] ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
        <div className="mb-8 grid gap-2 md:mb-14 md:grid-cols-[180px_1fr] md:gap-4">
          <p className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase md:text-[#9aa3b8]">
            {label}
          </p>
          {title && (
            <h2 className="max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-[#ece9e1] sm:text-3xl md:text-4xl">
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
      className={`group inline-flex items-center gap-2 text-[#ece9e1] ${className}`}
    >
      <span className="underline decoration-[#3a4a7a] decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-[var(--accent)]">
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
