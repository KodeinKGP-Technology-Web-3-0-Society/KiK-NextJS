import Image from "next/image";
import articles from "../../data/articles/articles-list.json";
import { Section, TextLink } from "./ui";

// Latest three articles that have a local cover image (fast, no third-party hosts).
const LATEST = articles.filter((a) => a.img.startsWith("/")).slice(0, 3);

export default function Blog() {
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
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-[#243158] bg-[#0f1a3a]">
              <Image
                src={a.img}
                alt=""
                fill
                sizes="(min-width:768px) 33vw, 100vw"
                quality={70}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-center gap-3 font-mono text-xs text-[#9aa3b8]">
              <span className="text-[var(--accent)]">{a.categories.join(" · ")}</span>
              <span>{a.pubDate.replace(/,(\d)/, ", $1")}</span>
            </div>
            <h3 className="mt-2 text-lg leading-snug font-medium text-[#ece9e1] group-hover:underline group-hover:decoration-[var(--accent)] group-hover:underline-offset-4">
              {a.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#9aa3b8]">{a.description}</p>
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
