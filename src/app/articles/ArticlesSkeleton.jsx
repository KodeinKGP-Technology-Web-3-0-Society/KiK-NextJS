import React from "react";

export default function ArticlesSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 pb-20 md:px-8">
      {/* Top indicator with animated circle spinner */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5 rounded-full border border-[#1e2333] bg-[#11141d] px-3.5 py-1.5 font-mono text-xs text-[var(--accent)]">
          <svg
            className="h-3.5 w-3.5 animate-spin text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>Syncing latest articles with Medium...</span>
        </div>
      </div>

      {/* Featured Article Skeleton Card */}
      <div className="mb-16 overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d]">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-between p-7 md:p-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-3.5 w-24 rounded bg-[#1e2333] animate-pulse" />
                <div className="h-3.5 w-12 rounded bg-[#1e2333] animate-pulse" />
              </div>
              <div className="mt-5 space-y-3">
                <div className="h-8 w-11/12 rounded bg-[#1e2333] animate-pulse" />
                <div className="h-8 w-3/4 rounded bg-[#1e2333] animate-pulse" />
              </div>
              <div className="mt-5 space-y-2.5">
                <div className="h-4 w-full rounded bg-[#161b28] animate-pulse" />
                <div className="h-4 w-10/12 rounded bg-[#161b28] animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-[#161b28] animate-pulse" />
              </div>
              <div className="mt-6 flex gap-2">
                <div className="h-6 w-16 rounded bg-[#1e2333] animate-pulse" />
                <div className="h-6 w-16 rounded bg-[#1e2333] animate-pulse" />
              </div>
            </div>
            <div className="mt-8 h-4 w-32 rounded bg-[#1e2333] animate-pulse" />
          </div>
          {/* Featured Image Box */}
          <div className="relative min-h-[280px] bg-[#161b28] animate-pulse md:min-h-full" />
        </div>
      </div>

      {/* Section Header & Search Skeleton */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="h-3 w-32 rounded bg-[#1e2333] animate-pulse" />
          <div className="mt-2.5 h-8 w-56 rounded bg-[#1e2333] animate-pulse" />
        </div>
        <div className="h-10 w-full rounded-lg border border-[#1e2333] bg-[#11141d] animate-pulse md:w-80" />
      </div>

      {/* Category Chips Skeleton */}
      <div className="mb-10 flex flex-wrap gap-2">
        {[20, 16, 24, 20].map((w, i) => (
          <div
            key={i}
            className={`h-7.5 w-${w} rounded-md bg-[#1e2333] animate-pulse`}
            style={{ width: `${w * 4}px`, height: "30px" }}
          />
        ))}
      </div>

      {/* YouTube-like Video Grid Cards Skeleton (6 cards) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d]"
          >
            <div>
              {/* Thumbnail Skeleton */}
              <div className="aspect-[16/10] w-full bg-[#161b28] animate-pulse" />

              {/* Card Body Skeleton */}
              <div className="p-6">
                <div className="h-3 w-28 rounded bg-[#1e2333] animate-pulse" />
                <div className="mt-3.5 space-y-2">
                  <div className="h-5 w-11/12 rounded bg-[#1e2333] animate-pulse" />
                  <div className="h-5 w-3/4 rounded bg-[#1e2333] animate-pulse" />
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="h-3.5 w-full rounded bg-[#161b28] animate-pulse" />
                  <div className="h-3.5 w-5/6 rounded bg-[#161b28] animate-pulse" />
                </div>
                <div className="mt-4 flex gap-1.5">
                  <div className="h-5 w-14 rounded bg-[#1e2333] animate-pulse" />
                  <div className="h-5 w-14 rounded bg-[#1e2333] animate-pulse" />
                </div>
              </div>
            </div>
            {/* Card Footer Skeleton */}
            <div className="border-t border-[#1e2333] px-6 py-4">
              <div className="h-3.5 w-24 rounded bg-[#1e2333] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
