"use client";

import React, { useState } from "react";
import dataJ from "../../../data/qna/lab-questions.json";
import Questions from "./Questions";
import { ChevronDown } from "lucide-react";

export default function SubTopics({ topic, viewMode }) {
  const [openSubTopics, setOpenSubTopics] = useState([]);

  const toggleSubTopic = (sub) => {
    setOpenSubTopics((prev) =>
      prev.includes(sub) ? prev.filter((t) => t !== sub) : [...prev, sub]
    );
  };

  const subtopicsObj = dataJ[topic]?.[0]?.["Subtopics"] || {};

  return (
    <div className="w-full space-y-3">
      {Object.keys(subtopicsObj).map((subTopic, index) => {
        const isOpen = openSubTopics.includes(subTopic);
        const count = subtopicsObj[subTopic]?.length || 0;
        const formattedTitle = subTopic
          .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
          .replace(/\bAnd\b/g, "and");

        return (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-[#243158] bg-[#0f1a3a] transition-colors"
          >
            <div
              className="flex cursor-pointer items-center justify-between px-5 py-3.5 text-sm font-medium text-[#ece9e1] transition-colors hover:bg-[#142145] sm:text-base"
              onClick={() => toggleSubTopic(subTopic)}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-[#9aa3b8]">&bull;</span>
                <span>{formattedTitle}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#9aa3b8]">
                  {count} {count === 1 ? "problem" : "problems"}
                </span>
                <span
                  className={`text-[#9aa3b8] transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[var(--accent)]" : ""
                  }`}
                >
                  <ChevronDown size={14} />
                </span>
              </div>
            </div>

            {isOpen && (
              <div className="border-t border-[#243158] bg-[#0b1430] p-2 md:p-3">
                <Questions
                  topic={topic}
                  subTopic={subTopic}
                  viewMode={viewMode}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
