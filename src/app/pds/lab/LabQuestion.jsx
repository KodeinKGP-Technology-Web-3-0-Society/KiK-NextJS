"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dataJ from "../../../data/qna/lab-questions.json";
import CompilerClient from "../../compiler/CompilerClient";
import {
  ArrowLeft,
  Copy,
  Check,
  Code2,
  Eye,
  EyeOff,
  Terminal,
  Sparkles,
  ArrowDown,
} from "lucide-react";

export default function LabQuestion() {
  const [flag, setFlag] = useState(false);
  const [copy, setCopy] = useState(false);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [rating, setRating] = useState("");
  const [compilerCode, setCompilerCode] = useState(null);
  const [loadedToast, setLoadedToast] = useState(false);

  const compilerRef = useRef(null);

  const { topic, subTopic, ind: indStr } = useParams();
  const ind = parseInt(indStr, 10);

  useEffect(() => {
    if (!topic || isNaN(ind)) return;

    let arr = [];

    if (topic === "labTest") {
      Object.values(dataJ).forEach((chapterArray) => {
        chapterArray.forEach((chapter) => {
          if (chapter.type === "lab" && chapter.Subtopics) {
            Object.values(chapter.Subtopics).forEach((qList) => {
              arr = arr.concat(qList);
            });
          }
        });
      });
    } else {
      const chapterArray = dataJ[topic];
      if (Array.isArray(chapterArray)) {
        const chapter = chapterArray[0];
        const qList = chapter?.Subtopics?.[subTopic];
        if (Array.isArray(qList)) {
          arr = qList;
        }
      }
    }

    if (arr[ind]) {
      setQuestion(arr[ind].Question || "");
      setSolution(arr[ind].Answer || "");
      setRating(arr[ind].rating || "");
    }
  }, [topic, subTopic, ind]);

  const handleCopy = () => {
    if (!solution) return;
    navigator.clipboard.writeText(solution);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  const handleLoadIntoCompiler = () => {
    if (!solution) return;
    setCompilerCode(solution);
    setLoadedToast(true);
    setTimeout(() => setLoadedToast(false), 2500);
    compilerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCompiler = () => {
    compilerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formattedTopic = (topic || "")
    .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
    .replace(/\bAnd\b/g, "and");

  const formattedSubTopic = (subTopic || "")
    .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
    .replace(/\bAnd\b/g, "and");

  const ratingColor =
    rating.toLowerCase() === "easy"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : rating.toLowerCase() === "hard"
      ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
      : "border-amber-500/30 bg-amber-500/10 text-amber-400";

  return (
    <div className="min-h-screen bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8">
        {/* Navigation & Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/pds/lab"
            className="group inline-flex items-center gap-2 font-mono text-xs text-[#94a3b8] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Lab Problems</span>
          </Link>

          <button
            onClick={scrollToCompiler}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#94a3b8] transition-colors hover:text-[var(--accent)]"
          >
            <span>Jump to In-House Compiler</span>
            <ArrowDown size={13} />
          </button>
        </div>

        {/* Question Header & Meta */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2333] pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#94a3b8]">
              <span className="text-[var(--accent)]">{formattedTopic}</span>
              <span>/</span>
              <span>{formattedSubTopic}</span>
              <span>/</span>
              <span>Problem #{ind + 1}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#f8fafc] md:text-3xl">
              Lab Problem Statement
            </h1>
          </div>

          {rating && (
            <span
              className={`rounded-full border px-3 py-1 font-mono text-xs font-semibold capitalize ${ratingColor}`}
            >
              {rating} Level
            </span>
          )}
        </div>

        {/* Problem Statement Card */}
        <div className="rounded-xl border border-[#1e2333] bg-[#11141d] p-6 shadow-xl md:p-8">
          <div className="flex items-center justify-between border-b border-[#1e2333] pb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Specifications & Problem Details
            </span>
            <span className="font-mono text-xs text-[#94a3b8]">
              IIT Kharagpur PDS Archive
            </span>
          </div>

          <div className="mt-5 overflow-x-auto text-[15px] leading-7 text-[#f8fafc]">
            <pre className="whitespace-pre-wrap font-sans font-normal text-[#e2e8f0]">
              {question || "Loading question..."}
            </pre>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setFlag(!flag)}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#08090d] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
          >
            {flag ? (
              <>
                <EyeOff size={15} />
                <span>Hide Solution</span>
              </>
            ) : (
              <>
                <Eye size={15} />
                <span>Reveal Solution</span>
              </>
            )}
          </button>

          <button
            onClick={handleLoadIntoCompiler}
            disabled={!solution}
            className="inline-flex items-center gap-2 rounded-lg border border-[#1e2333] bg-[#11141d] px-4 py-2.5 text-sm font-semibold text-[#f8fafc] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50"
            title="Load the verified C solution directly into the embedded compiler"
          >
            {loadedToast ? (
              <>
                <Check size={15} className="text-emerald-400" />
                <span className="text-emerald-400">Loaded into Compiler!</span>
              </>
            ) : (
              <>
                <Code2 size={15} />
                <span>Load Solution into Compiler</span>
              </>
            )}
          </button>

          <button
            onClick={scrollToCompiler}
            className="inline-flex items-center gap-2 rounded-lg border border-[#1e2333] bg-[#11141d] px-4 py-2.5 text-sm font-semibold text-[#94a3b8] transition-colors hover:border-[#2e374d] hover:text-[#f8fafc]"
          >
            <Terminal size={15} />
            <span>Interactive Compiler</span>
          </button>
        </div>

        {/* Reference Solution Container */}
        {flag && (
          <div className="mt-6 overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d] shadow-2xl transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2333] bg-[#161a26] px-5 py-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f8fafc]">
                <Code2 size={15} className="text-[var(--accent)]" />
                <span>Verified Reference Implementation (C/C++)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadIntoCompiler}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/20"
                >
                  <Terminal size={12} />
                  <span>Test in Compiler</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#1e2333] bg-[#08090d] px-3 py-1 font-mono text-xs text-[#f8fafc] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  title="Copy solution"
                >
                  {copy ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="p-2">
              <SyntaxHighlighter
                language="cpp"
                style={dracula}
                customStyle={{
                  padding: "1.25rem",
                  margin: "0rem",
                  backgroundColor: "transparent",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                }}
                wrapLongLines={true}
              >
                {solution}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* Embedded In-House Compiler Workspace */}
        <div ref={compilerRef} className="mt-10 scroll-mt-6">
          <CompilerClient
            embedded={true}
            codeOverride={compilerCode}
            storageKey={`kik-lab-${topic}-${subTopic}-${ind}`}
            embeddedTitle={`Interactive C Compiler · Problem #${ind + 1}`}
          />
        </div>
      </div>
    </div>
  );
}
