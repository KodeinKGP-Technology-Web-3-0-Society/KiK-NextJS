import { getArticles } from "@/lib/articles";
import { Section, TextLink } from "./ui";

// Latest three posts, pulled live from Medium (refreshed hourly, saved list as fallback).
export default async function Blog() {
  const LATEST = (await getArticles()).slice(0, 3);
  return (
    <Section label="From the blog" title="Read what our members have written.">
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
        {LATEST.map((a) => (
          <a
            key={a.link}
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-[#1e2333] bg-[#11141d]">
              {/* whole cover, never cropped; blurred copy fills the frame */}
              <img src={a.img} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl" />
              <img
                src={a.img}
                alt={a.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-center gap-3 font-mono text-xs text-[#94a3b8]">
              <span className="text-[var(--accent)]">{a.categories.join(" · ")}</span>
              <span>{a.pubDate.replace(/,(\d)/, ", $1")}</span>
            </div>
            <h3 className="mt-2 text-lg leading-snug font-medium text-[#f8fafc] group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-4">
              {a.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#94a3b8]">{a.description}</p>
            <span className="mt-4 text-sm text-[var(--accent)]">
              Read on Medium <span aria-hidden="true">&rarr;</span>
            </span>
          </a>
        ))}
      </div>
      <div className="mt-12">
        <TextLink href="/articles" className="text-sm">All articles</TextLink>
      </div>
    </Section>
  );
}
