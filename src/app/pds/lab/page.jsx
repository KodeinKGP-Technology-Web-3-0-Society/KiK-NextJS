"use client";

import React, { useEffect, useState, useMemo } from "react";
import dataJ from "../../../data/qna/lab-questions.json";
import SubTopics from "./SubTopics";
import { readList } from "./storage";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
} from "lucide-react";

// Human-friendly chapter display metadata
const CHAPTER_CONFIG = {
  InitialBasics: {
    num: "01",
    title: "Initial Basics & Formatted I/O",
    desc: "Variables, primitive data types, arithmetic operators, and standard I/O specifiers.",
  },
  Loops: {
    num: "02",
    title: "Control Flow & Loops",
    desc: "Conditionals, branching, for/while iterations, nested loops, and pattern generation.",
  },
  ArrayAndStrings: {
    num: "03",
    title: "Arrays & Strings",
    desc: "1D/2D array manipulation, string buffers, indexing, and ASCII processing.",
  },
  FunctionsAndRecursions: {
    num: "04",
    title: "Functions & Recursion",
    desc: "Modular design, parameter passing, call stack execution, and recursive trees.",
  },
  StructuresAndPointers: {
    num: "05",
    title: "Structures & Pointers",
    desc: "Address arithmetic, struct definitions, pointer dereferencing, and arrow operators.",
  },
  SortingAnd2dArrays: {
    num: "06",
    title: "Sorting & 2D Matrices",
    desc: "Matrix algebra, searching algorithms, bubble/selection sorts, and multi-dimensional grids.",
  },
  LinkedList: {
    num: "07",
    title: "Linked Lists & Dynamic Memory",
    desc: "Dynamic heap nodes (malloc/free), singly linked lists, insertion, and traversal.",
  },
};

export default function Lab() {
  const [openTopics, setOpenTopics] = useState(["InitialBasics"]);
  const [viewMode, setViewMode] = useState("All Questions");
  const [stats, setStats] = useState({ completed: 0, favourites: 0 });

  // Compute total problem count across all chapters
  const { totalQuestions, topicStats } = useMemo(() => {
    let total = 0;
    const statsMap = {};

    Object.entries(dataJ).forEach(([topicKey, topicArr]) => {
      let topicTotal = 0;
      let subCount = 0;
      const subtopics = topicArr[0]?.Subtopics || {};
      subCount = Object.keys(subtopics).length;

      Object.values(subtopics).forEach((qList) => {
        topicTotal += Array.isArray(qList) ? qList.length : 0;
      });

      total += topicTotal;
      statsMap[topicKey] = {
        subtopicCount: subCount,
        questionCount: topicTotal,
      };
    });

    return { totalQuestions: total, topicStats: statsMap };
  }, []);

  // Sync stats from safe local storage
  const refreshStats = () => {
    const comp = readList("completed");
    const fav = readList("favourites");
    setStats({
      completed: comp.length,
      favourites: fav.length,
    });
  };

  useEffect(() => {
    refreshStats();

    // Listen for local updates from LabCard components
    window.addEventListener("pds-storage-updated", refreshStats);
    window.addEventListener("storage", refreshStats);
    return () => {
      window.removeEventListener("pds-storage-updated", refreshStats);
      window.removeEventListener("storage", refreshStats);
    };
  }, []);

  const toggleTopic = (topic) => {
    setOpenTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const expandAll = () => setOpenTopics(Object.keys(dataJ));
  const collapseAll = () => setOpenTopics([]);

  const completedPct =
    totalQuestions > 0 ? Math.round((stats.completed / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/pds"
            className="group inline-flex items-center gap-2 font-mono text-xs text-[#94a3b8] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to PDS Overview</span>
          </Link>
        </div>

        {/* Header & Local Progress Section */}
        <div className="mb-8 rounded-2xl border border-[#1e2333] bg-[#11141d] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[var(--accent)] uppercase">
                <Sparkles size={12} />
                <span>CS10001 / CS11001 · IIT Kharagpur</span>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#f8fafc] sm:text-4xl">
                Lab Practice Archive
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#94a3b8] sm:text-base">
                208 curated lab questions organized into 7 curriculum chapters. Click any problem to
                view the complete specifications, sample inputs, and verified C solutions.
              </p>
            </div>

            {/* Pure Local Storage Progress Widget */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#1e2333] bg-[#161a26] p-4 lg:w-80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#94a3b8]">Your Local Progress</span>
                <span className="font-mono font-semibold text-[var(--accent)]">
                  {completedPct}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#08090d]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
                  style={{ width: `${completedPct}%` }}
                />
              </div>

              <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#94a3b8]">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>
                    <strong className="text-[#f8fafc]">{stats.completed}</strong> / {totalQuestions}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#94a3b8]">
                  <Bookmark size={13} className="text-amber-400" />
                  <span>
                    <strong className="text-[#f8fafc]">{stats.favourites}</strong> saved
                  </span>
                </div>
              </div>

              <p className="border-t border-[#1e2333] pt-2 text-[11px] text-[#64748b]">
                ✓ Saved locally on your browser. No account needed.
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Accordion Control Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1e2333] bg-[#11141d] p-3">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "All Questions", label: `All Problems (${totalQuestions})` },
              { id: "Favourite Questions", label: `Favourites (${stats.favourites})` },
              { id: "Incomplete Questions", label: `Incomplete (${Math.max(0, totalQuestions - stats.completed)})` },
            ].map((f) => {
              const active = viewMode === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setViewMode(f.id)}
                  className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "border border-[var(--accent)] bg-[var(--accent)] font-semibold text-[#08090d]"
                      : "border border-[#1e2333] bg-[#161a26] text-[#94a3b8] hover:border-[var(--accent)]/40 hover:text-[#f8fafc]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Expand / Collapse All Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#1e2333] bg-[#161a26] px-3 py-1.5 text-xs font-mono text-[#94a3b8] transition-colors hover:text-[#f8fafc]"
              title="Expand all chapters"
            >
              <Maximize2 size={12} />
              <span className="hidden sm:inline">Expand All</span>
            </button>
            <button
              onClick={collapseAll}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#1e2333] bg-[#161a26] px-3 py-1.5 text-xs font-mono text-[#94a3b8] transition-colors hover:text-[#f8fafc]"
              title="Collapse all chapters"
            >
              <Minimize2 size={12} />
              <span className="hidden sm:inline">Collapse</span>
            </button>
          </div>
        </div>

        {/* Chapters Accordion List */}
        <div className="space-y-3.5">
          {Object.keys(dataJ).map((topicKey) => {
            const isOpen = openTopics.includes(topicKey);
            const meta = CHAPTER_CONFIG[topicKey] || {
              num: "--",
              title: topicKey,
              desc: "Curated problem sets.",
            };
            const cStat = topicStats[topicKey] || {
              subtopicCount: 0,
              questionCount: 0,
            };

            return (
              <div
                key={topicKey}
                className="overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleTopic(topicKey)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left transition-colors hover:bg-[#161a26]/70"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#1e2333] bg-[#161a26] font-mono text-xs font-semibold text-[var(--accent)]">
                      {meta.num}
                    </span>
                    <div>
                      <h2 className="text-base font-semibold text-[#f8fafc] sm:text-lg">
                        {meta.title}
                      </h2>
                      <p className="mt-0.5 line-clamp-1 text-xs text-[#94a3b8]">
                        {meta.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden font-mono text-xs text-[#94a3b8] sm:inline">
                      {cStat.subtopicCount} subtopics · {cStat.questionCount} problems
                    </span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-md border border-[#1e2333] bg-[#161a26] text-xs transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--accent)]" : "text-[#94a3b8]"
                      }`}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#1e2333] bg-[#08090d]/80 p-4 md:p-6">
                    <SubTopics topic={topicKey} viewMode={viewMode} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
