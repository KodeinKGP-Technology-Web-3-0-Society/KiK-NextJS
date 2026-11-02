"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import LottieWrapper from "./LottieWrapper";
import data from "../../data/articles/articles-list.json";

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

const CategoryBadge = ({ category, primary = false }) => {
  const Icon = getCategoryIcon(category);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${primary ? "border border-cyan-400/30 bg-cyan-500/90 text-white shadow-xl backdrop-blur" : "bg-slate-700/60 text-slate-300"}`}
    >
      <Icon size={12} />
      {category}
    </span>
  );
};

const ArticleCard = ({ article, index, onHover }) => (
  <div
    className="group flex justify-center"
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(null)}
  >
    <a
      className="relative flex h-[450px] w-[380px] flex-col overflow-hidden rounded-2xl border border-cyan-500/40 bg-slate-800/40 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-400/90 hover:bg-cyan-500/8 hover:shadow-[0_20px_50px_rgba(6,182,212,0.4)] max-sm:w-full max-sm:max-w-[350px]"
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl">
        <img
          src={article.img}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-cyan-900/40" />
      </div>
      <div className="flex h-[250px] flex-col justify-between p-6">
        <div className="flex-1">
          <h3 className="mb-3 min-h-[3.5rem] text-lg leading-tight font-bold text-white">
            {article.title}
          </h3>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-2 py-1 text-xs text-cyan-400">
              <Calendar size={12} />
              <span>{article.pubDate}</span>
            </div>
            {article.categories?.slice(0, 2).map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-2 py-1 text-xs text-cyan-400"
              >
                {React.createElement(getCategoryIcon(cat), { size: 12 })}
                <span>{cat}</span>
              </div>
            ))}
          </div>
          <p className="line-clamp-3 overflow-hidden text-sm leading-relaxed text-gray-300">
            {article.description?.length > 120
              ? `${article.description.substring(0, 120)}...`
              : article.description}
          </p>
        </div>
        <div className="absolute right-4 bottom-4 z-50 translate-y-2 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-cyan-400 hover:shadow-xl">
            <span>Read now</span>
            <ExternalLink size={14} />
          </div>
        </div>
      </div>
    </a>
  </div>
);

const FeaturedCard = ({ article }) => (
  <div className="mb-16 flex justify-center px-6">
    <div className="flex w-full max-w-6xl items-center gap-6 max-lg:flex-col max-lg:gap-4">
      <div className="h-48 w-48 flex-shrink-0 max-lg:hidden">
        <img
          src="/article/image.svg"
          alt="Insights"
          className="h-full w-full object-contain"
        />
      </div>
      <h2
        className="text-[24px] font-bold whitespace-nowrap text-white max-lg:text-[28px] max-lg:whitespace-normal max-md:text-[24px]"
        style={{ fontFamily: "Kaisei Opti, serif" }}
      >
        Latest Insights:
      </h2>
      <a
        className="group hover:shadow-3xl relative flex h-[240px] flex-1 overflow-hidden rounded-2xl border border-cyan-400/60 bg-cyan-900/30 shadow-2xl shadow-cyan-500/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/80 hover:bg-cyan-800/40 hover:shadow-cyan-400/40 max-md:h-auto max-md:flex-col"
        href={article?.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="h-full w-[40%] overflow-hidden max-md:h-[200px] max-md:w-full">
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={article?.img}
            alt={article?.title}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan-900/20 group-hover:to-cyan-800/30" />
        </div>

        <div className="absolute top-0 right-0 z-10 overflow-hidden">
          <div className="translate-x-3 -translate-y-1 rotate-[5deg] transform border border-cyan-300/50 bg-cyan-400/95 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0">
            NEW
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-cyan-300">
              <Calendar size={12} />
              {article?.pubDate}
            </div>
            <h3 className="mb-3 text-[16px] leading-[20px] font-bold text-white transition-colors duration-300 group-hover:text-cyan-200 max-md:text-[14px] max-md:leading-[18px]">
              {article?.title?.length > 70
                ? `${article.title.substring(0, 70)}...`
                : article?.title}
            </h3>
            <div className="mb-3 flex flex-wrap gap-[4px]">
              {article?.categories?.map((cat, i) => (
                <CategoryBadge key={i} category={cat} primary />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] leading-[15px] text-cyan-100/80">
              {article?.description?.length > 150
                ? `${article.description.substring(0, 150)}...`
                : article?.description}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-200 transition-all duration-300 group-hover:translate-x-1 hover:text-cyan-100">
              Read More <ExternalLink size={12} />
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
);

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const allCategories = useMemo(() => {
    const categories = new Set();
    data.forEach((article) =>
      article.categories?.forEach((cat) => categories.add(cat))
    );
    return ["All", ...Array.from(categories)];
  }, []);

  const filteredArticles = useMemo(() => {
    return data.slice(1).filter((article) => {
      const matchesSearch = article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        article.categories?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Floating bubbles (only in lower sections)
  const floatingBubbles = [
    { w: 36, h: 35, b: "25%", l: "8%", d: "2s", dur: "7s" },
    { w: 60, h: 58, b: "15%", r: "20%", d: "0.5s", dur: "9s" },
    { w: 38, h: 36, t: "55%", r: "12%", d: "2.2s", dur: "8.5s" },
    { w: 66, h: 64, b: "8%", l: "45%", d: "1.2s", dur: "9.5s" },
  ];

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: "#01011B" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating bubbles */}
        {floatingBubbles.map((b, i) => (
          <div
            key={`float-${i}`}
            className="floating-circle absolute rounded-full border border-cyan-500/20 bg-cyan-500/10"
            style={{
              width: `${b.w}px`,
              height: `${b.h}px`,
              top: b.t,
              left: b.l,
              right: b.r,
              bottom: b.b,
              animationDelay: b.d,
              animationDuration: b.dur,
            }}
          />
        ))}
      </div>

      <div className="mb-12 px-6 max-sm:px-4">
        <div className="mx-auto flex max-w-7xl items-center max-lg:flex-col max-lg:text-center">
          <div className="flex flex-1 flex-col items-center justify-center max-lg:mb-8">
            <div className="text-center">
              <div
                className="text-[96px] leading-tight font-bold tracking-wide text-cyan-400 max-lg:text-[72px] max-md:text-[56px] max-sm:text-[48px]"
                style={{
                  fontFamily: "Istok Web, sans-serif",
                  filter: "drop-shadow(0 0 20px rgba(135, 206, 235, 0.2))",
                }}
              >
                Articles
              </div>
              <div className="mt-6 text-white">
                <div
                  className="mb-3 text-[38px] font-bold whitespace-nowrap text-white max-lg:text-[32px] max-lg:whitespace-normal max-md:text-[28px] max-sm:text-[24px]"
                  style={{
                    fontFamily: "Kaisei Opti, serif",
                    lineHeight: "1.2",
                  }}
                >
                  Empowering You to Build the Future
                </div>
                <p
                  className="text-[20px] font-bold text-white max-lg:text-[18px] max-md:text-[16px]"
                  style={{ fontFamily: "Kaisei Opti, serif" }}
                >
                  Mastering AI, Full-Stack Magic & Blockchain Breakthrough
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="h-[400px] w-[400px] max-[800px]:h-[300px] max-[800px]:w-[300px] max-[550px]:h-[200px] max-[550px]:w-[200px]">
              <LottieWrapper />
            </div>
          </div>
        </div>
      </div>

      <FeaturedCard article={data[0]} />

      <div className="mb-12 w-full px-6 max-sm:px-4">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-3 max-sm:justify-center max-sm:gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-200 max-sm:px-4 max-sm:py-2 max-sm:text-xs ${selectedCategory === category ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20" : "border-cyan-500/30 bg-transparent text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10"}`}
              >
                {React.createElement(getCategoryIcon(category), { size: 16 })}
                <span className="max-sm:hidden">{category}</span>
                <span className="sm:hidden">
                  {category.length > 6
                    ? category.substring(0, 6) + ".."
                    : category}
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full max-sm:min-w-0 lg:w-auto lg:min-w-[350px]">
            <input
              type="text"
              placeholder="Search article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-cyan-500/30 bg-transparent px-4 py-3 pl-12 text-white placeholder-gray-400 transition-all duration-200 focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20 focus:outline-none"
            />
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>
      </div>

      <div className="w-full px-6 max-sm:px-4">
        <div className="rounded-2xl bg-transparent p-8 max-sm:p-4">
          <div className="custom-scrollbar h-[700px] overflow-y-auto scroll-smooth pr-4 max-md:h-[600px] max-sm:h-[500px] max-sm:pr-2">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 justify-items-center gap-10 pt-4 pb-4 max-sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    article={article}
                    index={index}
                    onHover={setHoveredCard}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-lg text-gray-400 max-sm:text-center">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Istok+Web:wght@700&family=Kaisei+Opti:wght@700&display=swap");
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
          margin: 8px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          border-radius: 10px;
          border: 2px solid rgba(30, 41, 59, 0.3);
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #0891b2, #0e7490);
          border: 2px solid rgba(6, 182, 212, 0.2);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #06b6d4 rgba(30, 41, 59, 0.3);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-15px) rotate(-3deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-25px) translateX(8px) rotate(7deg);
            opacity: 0.7;
          }
        }

        .floating-circle {
          animation: float infinite ease-in-out;
          backdrop-filter: blur(1px);
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Articles;
