"use client";

import React, { useState } from "react";
import dataJ from "../../../data/qna/lab-questions.json";
import Questions from "./Questions";

export default function SubTopics({ topic, viewMode }) {
  const [openSubTopics, setOpenSubTopics] = useState([]);

  const toggleSubTopic = (sub) => {
    setOpenSubTopics((prev) =>
      prev.includes(sub) ? prev.filter((t) => t !== sub) : [...prev, sub]
    );
  };

  return (
    <div className="w-full">
      {Object.keys(dataJ[topic][0]["Subtopics"]).map((subTopic, index) => (
        <div
          key={index}
          className="mb-4 w-full overflow-hidden rounded-lg bg-[#01011b]"
        >
          <div
            className="flex cursor-pointer items-center justify-between border-b border-cyan-300 bg-[#43434390] px-5 py-4 text-xl font-semibold text-white sm:text-2xl"
            onClick={() => toggleSubTopic(subTopic)}
          >
            {subTopic
              .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
              .replace(/\bAnd\b/g, "and")}
            <span className="text-2xl">
              {openSubTopics.includes(subTopic) ? "-" : "+"}
            </span>
          </div>

          {openSubTopics.includes(subTopic) && (
            <div className="bg-[#1c1a22] px-4 py-3">
              <Questions
                topic={topic}
                subTopic={subTopic}
                viewMode={viewMode}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
