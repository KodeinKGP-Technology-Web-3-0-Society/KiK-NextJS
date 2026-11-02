"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Brain,
  Code2,
  Coins,
  Smartphone,
  Shield,
  TrendingUp,
  Cpu,
  Globe,
  Database,
  Zap,
  Settings,
  Star,
  Search,
  Calendar,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";
import LottieWrapper from "./LottieWrapper";
import ArticlesSkeleton from "./ArticlesSkeleton";

const categoryIcons = {
  AI: Brain,
  "Machine Learning": Brain,
  "Web Development": Code2,
  Frontend: Code2,
  Backend: Database,
  Blockchain: Coins,
  Cryptocurrency: Coins,
  Mobile: Smartphone,
  Security: Shield,
  DevOps: Settings,
  Cloud: Globe,
  Performance: Zap,
  Trending: TrendingUp,
  Hardware: Cpu,
  All: Star,
};

const getCategoryIcon = (category) => categoryIcons[category] || Settings;

const CategoryBadge = ({ category }) => {
  const Icon = getCategoryIcon(category);
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-[#1e2333] bg-[#08090d] px-2.5 py-1 font-mono text-[11px] text-[#94a3b8]">
      <Icon size={12} className="text-[var(--accent)]" />
      <span>{category}</span>
    </span>
  );
};

// Cover image that is never cropped or stretched: the whole picture is shown at its own
// proportions, and a blurred copy of it fills the rest of the frame.
function Cover({ src, alt }) {
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </>
  );
}

export default function ArticlesClient({ data = [] }) {
  const [articles, setArticles] = useState(data);
  const [loading, setLoading] = useState(data.length === 0);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    async function fetchMediumArticles() {
      if (articles.length > 0) {
        setSyncing(true);
      } else {
        setLoading(true);
      }
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json.articles?.length) {
            setArticles(json.articles);
          }
        }
      } catch (err) {
        console.error("Error fetching live Medium articles:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setSyncing(false);
        }
      }
    }

    fetchMediumArticles();
    return () => {
      cancelled = true;
    };
  }, []);

  const allCategories = useMemo(() => {
    const categories = new Set();
    articles.forEach((article) =>
      article.categories?.forEach((cat) => categories.add(cat))
    );
    return ["All", ...Array.from(categories)];
  }, [articles]);

  const featuredArticle = articles[0];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = article.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        article.categories?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  if (loading && articles.length === 0) {
    return (
      <main className="min-h-screen bg-[#08090d] font-sans text-[#f8fafc] antialiased">
        <ArticlesSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      {syncing && (
        <div className="sticky top-16 z-30 flex items-center justify-center border-b border-[#1e2333] bg-[#11141d]/90 py-1.5 font-mono text-xs text-[var(--accent)] backdrop-blur-sm">
          <Loader2 size={13} className="mr-2 animate-spin" />
          <span>Syncing latest articles from Medium...</span>
        </div>
      )}
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-10 md:px-8 md:pt-12 md:pb-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-8">
          <div>
            <h1 className="text-4xl leading-tight font-bold tracking-[-0.03em] text-[#f8fafc] sm:text-5xl md:text-6xl">
              Empowering You to Build the Future.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#94a3b8] md:text-lg md:leading-8">
              Articles and engineering guides written by KodeinKGP members. We explore AI
              foundations, decentralized protocol designs, full-stack architectures, and
              hands-on developer tutorials.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://medium.com/@kodeinkgp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#08090d] transition-transform hover:-translate-y-0.5"
              >
                <span>Read on Medium</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="#all-articles"
                className="inline-flex items-center gap-2 rounded-md border border-[#242b3d] px-5 py-3 text-sm font-semibold text-[#f8fafc] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <span>Browse All ({data.length})</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-[260px] w-full max-w-[380px] sm:h-[320px] sm:max-w-[500px] md:h-[400px] md:max-w-[600px]">
              <LottieWrapper />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="border-t border-[#1e2333]">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Latest Insight
              </span>
              <span className="font-mono text-xs text-[#94a3b8]">
                Featured Article
              </span>
            </div>

            <a
              href={featuredArticle.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d] transition-all duration-300 hover:border-[var(--accent)]"
            >
              <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
                <div className="flex flex-col justify-between p-7 md:p-10">
                  <div>
                    <div className="flex items-center gap-3 font-mono text-xs text-[#94a3b8]">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-[var(--accent)]" />
                        <span>{featuredArticle.pubDate}</span>
                      </div>
                      <span>&bull;</span>
                      <span className="rounded bg-[var(--accent)]/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                        NEW
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#f8fafc] transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                      {featuredArticle.title}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-[#94a3b8] md:text-base">
                      {featuredArticle.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {featuredArticle.categories?.map((cat, i) => (
                        <CategoryBadge key={i} category={cat} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent)]">
                    <span>Read full article</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="relative min-h-[300px] overflow-hidden bg-[#08090d] md:min-h-full">
                  <Cover src={featuredArticle.img} alt={featuredArticle.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11141d] via-transparent to-transparent md:hidden" />
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* All Articles Section */}
      <section id="all-articles" className="border-t border-[#1e2333]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Browse Repository
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#f8fafc]">
                All Publications
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#1e2333] bg-[#11141d] py-2.5 pl-10 pr-4 text-sm text-[#f8fafc] placeholder-[#94a3b8] transition-colors focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mb-10 flex flex-wrap gap-2">
            {allCategories.map((category) => {
              const active = selectedCategory === category;
              const Icon = getCategoryIcon(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-[var(--accent)] font-semibold text-[#08090d]"
                      : "border border-[#1e2333] bg-[#11141d] text-[#94a3b8] hover:border-[#242b3d] hover:text-[#f8fafc]"
                  }`}
                >
                  <Icon size={13} className={active ? "text-[#08090d]" : "text-[var(--accent)]"} />
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-[#1e2333] bg-[#08090d]">
                      <Cover src={article.img} alt={article.title} />
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 font-mono text-xs text-[#94a3b8]">
                        <Calendar size={12} className="text-[var(--accent)]" />
                        <span>{article.pubDate}</span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold leading-snug text-[#f8fafc] transition-colors group-hover:text-[var(--accent)]">
                        {article.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#94a3b8] line-clamp-3">
                        {article.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {article.categories?.slice(0, 2).map((cat, i) => (
                          <CategoryBadge key={i} category={cat} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="border-t border-[#1e2333] px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)]">
                      <span>Read on Medium</span>
                      <ExternalLink size={12} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#1e2333] bg-[#11141d] p-12 text-center">
              <p className="text-base text-[#94a3b8]">
                No articles found matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[#08090d]"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
