"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dataJ from "../../../data/qna/programming-questions.json";

export default function LabQuestion() {
  const [flag, setFlag] = useState(false);
  const [copy, setCopy] = useState(false);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");

  const params = useParams();
  const topic = params?.topic;
  const subTopic = params?.subTopic;
  const ind = parseInt(params?.ind);

  useEffect(() => {
    if (!topic || isNaN(ind)) return;

    let arr = [];
    if (topic === "labTest") {
      const topicArray = [
        "initialBasics",
        "loops",
        "ArrayAndStrings",
        "functionsAndRecursions",
        "structuresAndPointers",
        "sortingAnd2dArrays",
        "linkedList",
      ];
      topicArray.forEach((t) => {
        arr = arr.concat(dataJ[t][2].Elements);
      });
    } else {
      arr = dataJ[topic]?.[0]?.Elements || [];
    }

    if (arr[ind]) {
      setQuestion(arr[ind].Question);
      setSolution(arr[ind].Answer);
    }
  }, [topic, ind]);

  const handleCopy = () => {
    navigator.clipboard.writeText(solution);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  return (
    <div className="bg-[#01011b] p-5">
      <div className="mx-4 my-5 rounded-xl bg-[#222] p-5 text-base font-black text-white shadow-md">
        <pre className="overflow-x-auto whitespace-pre-wrap">{question}</pre>
      </div>

      <button
        onClick={() => setFlag(!flag)}
        className="mx-2.5 my-2.5 cursor-pointer rounded-md bg-[#00a1d9] px-5 py-2.5 text-white hover:bg-[#007dab]"
      >
        {flag ? "Hide Solution" : "Show Solution"}
      </button>

      {flag && (
        <div className="relative mx-5 my-5 flex flex-col">
          <div className="bg-[#282a36] px-0 py-0">
            <button
              className="cursor-pointer rounded-br-xl bg-[#3f3d3d] px-4 py-1 text-base text-white"
              onClick={handleCopy}
            >
              {copy ? "✅ Copied!" : "📋 Copy Code"}
            </button>
          </div>
          <SyntaxHighlighter
            language="cpp"
            style={dracula}
            customStyle={{
              padding: "1.5rem",
              margin: "0rem",
              backgroundColor: "#282a36",
              // borderRadius: '10px',
            }}
            wrapLongLines={true}
          >
            {solution}
          </SyntaxHighlighter>
        </div>
      )}

      <a
        href="https://www.programiz.com/c-programming/online-compiler/"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2.5 my-2.5 inline-block rounded-md bg-[#00a1d9] px-5 py-2.5 text-white no-underline hover:bg-[#007dab]"
      >
        Open Online Editor
      </a>
    </div>
  );
}
