"use client";

import { useAuth } from "@/contexts/authContext";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReturnButton from "@/Components/utils/ReturnButton";
import CopyButton from "@/Components/utils/CopyButton";
import SubmitButton from "@/Components/utils/SubmitButton";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GetInput from "@/Components/utils/GetInput";
import DekodeXLoading from "@/Components/dekodeX_Loader/Loader";

// Import highlight.js theme
import "highlight.js/styles/atom-one-dark.css";
// app/layout.js or app/page.js (if using App Router)

import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose weights as needed
  variable: "--font-source-code-pro", // Optional for Tailwind
  display: "swap",
});

function Qp() {
  const [testcases, setTestcases] = useState([]);

  const params = useParams();
  const { QuestionID } = params;
  const [questionData, setQuestionData] = useState(null);
  const { user, loggedIn } = useAuth();
  const [answer, setAnswer] = useState("");
  const [testcaseUrl, setTestcaseUrl] = useState("");
  useEffect(() => {
    fetch("/testcases.json")
      .then((res) => res.json())
      .then((data) => {
        setTestcases(data);
      });
  }, []);

  useEffect(() => {
    console.log("Fetched testcases:", testcases);
    const found = testcases.find((tc) => tc.questionId === QuestionID);
    setTestcaseUrl(found?.inputUrl || "");
  }, [testcases]);

  useEffect(() => {
    fetch(`/dekodeX/api/question/${QuestionID}`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestionData(data);
      })
      .catch((err) => {
        console.error("Error fetching question:", err);
      });
  }, [QuestionID]);

  if (!questionData) {
    return (
      <div>
        <DekodeXLoading />
      </div>
    );
  }

  // Extract question number from QuestionID for display
  const questionNumber = QuestionID?.replace("q", "") || "1";

  return (
    <div
      className={`relative mx-auto mt-[70px] mr-[39px] ml-[39px] flex flex-col overflow-hidden rounded-tl-[18px] rounded-tr-[18px] max-md:mt-[50px] max-md:mr-[28px] max-md:ml-[28px] max-sm:mx-4 max-sm:mt-6 ${sourceCodePro.className}`}
      style={{
        border: "3px solid transparent",
        backgroundImage:
          "linear-gradient(#01011B, #01011B), linear-gradient(108.74deg, rgba(33,138,203,0.6) 0%, rgba(255,255,255,0.54) 36.46%, rgba(255,255,255,0.3) 73.96%, rgba(17,227,251,0.6) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {/* Header Section */}
      <div
        className="relative rounded-tl-[16px] rounded-tr-[16px]"
        style={{
          background:
            "linear-gradient(108.74deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 100%)",
          minHeight: 80,
        }}
      >
        <div className="absolute right-6 bottom-5 left-6 flex max-sm:right-4 max-sm:bottom-3 max-sm:left-4">
          <span
            className="pb-5 text-[20px] leading-[36px] font-bold max-md:text-[18px] max-sm:text-[16px] max-sm:leading-[24px] sm:pb-0"
            style={{
              background:
                "linear-gradient(92.46deg, #218ACB 3.64%, #11E3FB 20.06%, #218ACB 31.73%, #11E3FB 47.81%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 0,
              width: "100%",
              maxWidth: 379,
              height: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            {questionNumber.length < 2 ? "0" : ""}
            {questionNumber} {questionData.title}
          </span>
          <div className="flex-shrink-0">
            <ReturnButton />
          </div>
        </div>
        <div className="absolute top-[80px] h-[17px] w-full bg-gradient-to-b from-[rgba(255,255,255,0.2)] via-[#0CC5DA] to-[#01011B] max-sm:top-[60px]"></div>
      </div>

      {/* Main Content */}
      <div className="mb-[100px] flex flex-col gap-6 p-8 max-sm:mb-[60px] max-sm:gap-4 max-sm:p-4">
        {/* Terminal Prompt */}
        <span className="absolute top-[117px] left-[9px] flex h-[20px] w-[22px] items-center justify-center text-[18px] leading-[100%] tracking-[0%] text-[#00FF00] max-sm:top-[85px] max-sm:left-[12px] max-sm:text-[16px]">
          $$
        </span>

        {/* Question Section */}
        {questionData.question && (
          <div
            className={`markdown-content story-section pt-1 ${sourceCodePro.className} text-[18px] leading-tight tracking-[0%] text-white max-sm:text-[16px] max-sm:leading-normal`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {questionData.question}
            </ReactMarkdown>
          </div>
        )}

        {/* Sample Input */}
        <h3 className="text-[22px] font-bold text-[#00FF00] max-sm:text-[20px]">
          Sample Input
        </h3>
        {questionData.sampleInput ? (
          <div className="markdown-content sample-input w-fit max-w-[320px] min-w-[240px] overflow-auto">
            <div className="relative">
              <CopyButton
                text={questionData.sampleInput.replace(/```\n?/g, "")}
              />
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {questionData.sampleInput}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <pre className="text-white">No sample input available</pre>
        )}

        {/* Explanation */}
        {questionData.explanation && (
          <div className="markdown-content explanation-section text-[18px] text-white max-sm:text-[16px] max-sm:leading-normal">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {questionData.explanation}
            </ReactMarkdown>
          </div>
        )}

        {/* Sample Output */}
        <h3 className="text-[22px] font-bold text-[#00FF00] max-sm:text-[20px]">
          Sample Output
        </h3>
        {questionData.sampleOutput ? (
          <div className="markdown-content sample-input w-fit max-w-[320px] min-w-[240px] overflow-auto">
            <div className="relative">
              <CopyButton
                text={questionData.sampleOutput.replace(/```\n?/g, "")}
              />
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {questionData.sampleOutput}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <pre className="text-white">No sample Output available</pre>
        )}

        {/* Test Cases Input */}
        {questionData.testcases && (
          <div className="flex flex-row items-center gap-2">
            <GetInput testcaseUrl={testcaseUrl} />
          </div>
        )}

        {/* Answer Section */}
        <h3 className="text-[24px] text-[#00FF00] max-sm:text-[20px]">
          Answer
        </h3>
        <div className="flex flex-row items-center gap-2 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
          <input
            placeholder="Enter your answer here"
            className="w-[500px] rounded-[16px] bg-transparent p-2 text-white focus:bg-transparent focus:outline-none max-lg:w-[400px] max-md:w-[300px] max-sm:w-full"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(#01011B, #01011B), linear-gradient(89.17deg, #218ACB 0%, #11E3FB 26.59%, #218ACB 65.77%, #11E3FB 96.97%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="max-sm:w-full">
            <SubmitButton email={user?.email} answer={answer} id={QuestionID} />
          </div>
        </div>

        {/* Footer Code Icon */}
        <div className="absolute bottom-2 left-8 h-fit w-fit bg-[linear-gradient(236.43deg,_#218ACB_18.56%,_#0CC5DA_59.05%,_#11E3FB_79.29%)] bg-clip-text text-3xl font-bold text-transparent max-sm:left-4 max-sm:text-2xl">
          {"</>"}
        </div>
      </div>
    </div>
  );
}

export default Qp;
