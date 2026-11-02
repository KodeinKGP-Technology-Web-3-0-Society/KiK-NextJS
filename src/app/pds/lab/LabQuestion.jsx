"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dataJ from "../../../data/qna/lab-questions.json";
import { ArrowLeft, Copy, Check, ExternalLink, Code2, Eye, EyeOff } from "lucide-react";

export default function LabQuestion() {
  const [flag, setFlag] = useState(false);
  const [copy, setCopy] = useState(false);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");

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
      setQuestion(arr[ind].Question);
      setSolution(arr[ind].Answer);
    }
  }, [topic, subTopic, ind]);

  const handleCopy = () => {
    if (!solution) return;
    navigator.clipboard.writeText(solution);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  const formattedTopic = (topic || "")
    .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
    .replace(/\bAnd\b/g, "and");

  const formattedSubTopic = (subTopic || "")
    .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
    .replace(/\bAnd\b/g, "and");

  return (
    <div className="min-h-screen bg-[#08090d] font-sans text-[#f8fafc] antialiased">
      <div className="mx-auto max-w-4xl px-5 pt-10 pb-20 md:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/pds/lab"
            className="group inline-flex items-center gap-2 font-mono text-xs text-[#94a3b8] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Lab Problems</span>
          </Link>
        </div>

        {/* Question Header & Meta */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2333] pb-6">
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
        </div>

        {/* Problem Statement Card */}
        <div className="rounded-xl border border-[#1e2333] bg-[#11141d] p-6 shadow-xl md:p-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Description & Specifications
          </p>
          <div className="mt-4 overflow-x-auto text-[15px] leading-7 text-[#f8fafc]">
            <pre className="whitespace-pre-wrap font-sans font-normal">{question || "Loading question..."}</pre>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setFlag(!flag)}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#08090d] transition-transform hover:-translate-y-0.5"
          >
            {flag ? (
              <>
                <EyeOff size={16} />
                <span>Hide Solution</span>
              </>
            ) : (
              <>
                <Eye size={16} />
                <span>Reveal Solution</span>
              </>
            )}
          </button>

          <a
            href="https://www.programiz.com/c-programming/online-compiler/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#242b3d] px-5 py-2.5 text-sm font-semibold text-[#f8fafc] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>Online C Compiler</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Solution Container */}
        {flag && (
          <div className="mt-8 overflow-hidden rounded-xl border border-[#1e2333] bg-[#11141d] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e2333] bg-[#161b28] px-5 py-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f8fafc]">
                <Code2 size={15} className="text-[var(--accent)]" />
                <span>C / C++ Verified Implementation</span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded border border-[#1e2333] bg-[#08090d] px-3 py-1.5 font-mono text-xs text-[#f8fafc] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-1">
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
      </div>
    </div>
  );
}
