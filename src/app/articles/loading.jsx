import React from "react";
import ArticlesSkeleton from "./ArticlesSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      <ArticlesSkeleton />
    </main>
  );
}
