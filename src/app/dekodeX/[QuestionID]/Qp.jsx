"use client";

import { useAuth } from "@/contexts/authContext";
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
import { useAuthToken } from "../../../hooks/useAuthToken";
import { Source_Code_Pro } from "next/font/google";
import { FileText, HelpCircle, MessageCircle, Terminal } from "lucide-react";

import "highlight.js/styles/atom-one-dark.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-source-code-pro",
  display: "swap",
});

const sectionClass =
  "rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm";

function cleanCodeBlock(text) {
  if (!text) return "";
  return text.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "").trim();
}

function Qp() {
  const [testcases, setTestcases] = useState([]);
  const [questionData, setQuestionData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [testcaseUrl, setTestcaseUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const params = useParams();
  const { QuestionID } = params;
  const { user } = useAuth();
  const { token: authToken } = useAuthToken();

  useEffect(() => {
    fetch("/testcases.json")
      .then((res) => res.json())
      .then((data) => setTestcases(data))
      .catch((err) => console.error("Failed to load testcases:", err));
  }, []);

  useEffect(() => {
    const found = testcases.find((tc) => tc.questionId === QuestionID);
    setTestcaseUrl(found?.inputUrl || "");
  }, [testcases, QuestionID]);

  useEffect(() => {
    if (!authToken || !QuestionID) return;

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/dekodeX/api/question/" + QuestionID, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then((data) => setQuestionData(data))
      .catch((err) => console.error("Error fetching question:", err));
  }, [QuestionID, authToken]);

  if (!questionData) {
    return (
      <div>
        <DekodeXLoading />
      </div>
    );
  }

  const questionNumber = QuestionID?.replace("q", "") || "1";

  return (
    <div
      className={
        "relative mx-auto mt-[70px] mr-[39px] ml-[39px] flex flex-col overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_top_left,rgba(17,227,251,0.12),transparent_28rem)] shadow-2xl shadow-black/35 max-md:mt-[50px] max-md:mr-[28px] max-md:ml-[28px] max-sm:mx-4 max-sm:mt-6 " +
        sourceCodePro.className
      }
      style={{
        border: "3px solid transparent",
        backgroundImage:
          "linear-gradient(#01011B, #01011B), linear-gradient(108.74deg, rgba(33,138,203,0.6) 0%, rgba(255,255,255,0.54) 36.46%, rgba(255,255,255,0.3) 73.96%, rgba(17,227,251,0.6) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      <div
        className="relative overflow-hidden rounded-tl-[16px] rounded-tr-[16px]"
        style={{
          background:
            "linear-gradient(108.74deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 100%)",
          minHeight: 104,
        }}
      >
        <div className="absolute right-6 bottom-5 left-6 flex items-end justify-between gap-4 max-sm:right-4 max-sm:bottom-4 max-sm:left-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-cyan-200/80 uppercase sm:text-sm">
              <Terminal className="h-4 w-4 text-cyan-200" />
              <span>Problem {questionNumber.length < 2 ? "0" : ""}{questionNumber}</span>
            </div>
            <h1
              className="max-w-[min(760px,calc(100vw-180px))] break-words text-[24px] leading-tight font-bold max-md:max-w-[calc(100vw-140px)] max-md:text-[20px] max-sm:max-w-[calc(100vw-110px)] max-sm:text-[17px]"
              style={{
                background:
                  "linear-gradient(92.46deg, #218ACB 3.64%, #11E3FB 20.06%, #218ACB 31.73%, #11E3FB 47.81%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {questionData.title}
            </h1>
          </div>
          <div className="relative h-[27px] w-[75px] flex-shrink-0 max-md:w-[40px]">
            <ReturnButton />
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#11E3FB] to-transparent"></div>
      </div>

      <div className="relative mb-[72px] flex flex-col gap-5 p-6 max-sm:mb-[48px] max-sm:gap-4 max-sm:p-4">

        {questionData.question ? (
          <section className={`${sectionClass} p-4 sm:p-5`}>
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-200" />
                <h3 className="text-lg font-semibold text-cyan-100 sm:text-xl">Problem Statement</h3>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-100 uppercase">Read</span>
            </div>
            <div className="markdown-content story-section text-[16px] leading-7 text-slate-100 max-sm:text-[15px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {questionData.question}
              </ReactMarkdown>
            </div>
          </section>
        ) : null}


        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={`${sectionClass} p-4`}>
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3"><h3 className="text-[19px] font-bold text-[#00FF00] max-sm:text-[17px]">Sample Input</h3></div>
            {questionData.sampleInput ? (
              <div className="markdown-content sample-input max-h-[320px] overflow-auto rounded-xl border border-cyan-300/20 bg-[#01011b]/90 p-1">
                <div className="relative">
                  <CopyButton text={cleanCodeBlock(questionData.sampleInput)} />
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {questionData.sampleInput}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <pre className="text-white">No sample input available</pre>
            )}
          </div>

          <div className={`${sectionClass} p-4`}>
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3"><h3 className="text-[19px] font-bold text-[#00FF00] max-sm:text-[17px]">Sample Output</h3></div>
            {questionData.sampleOutput ? (
              <div className="markdown-content sample-input max-h-[320px] overflow-auto rounded-xl border border-cyan-300/20 bg-[#01011b]/90 p-1">
                <div className="relative">
                  <CopyButton text={cleanCodeBlock(questionData.sampleOutput)} />
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {questionData.sampleOutput}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <pre className="text-white">No sample output available</pre>
            )}
          </div>
        </section>

        {questionData.explanation ? (
          <section className={`${sectionClass} p-4 sm:p-5`}>
            <div className="mb-3 border-b border-white/10 pb-3">
              <h3 className="text-lg font-semibold text-cyan-100">Explanation</h3>
            </div>
            <div className="markdown-content explanation-section text-[16px] leading-7 text-slate-100 max-sm:text-[15px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {questionData.explanation}
              </ReactMarkdown>
            </div>
          </section>
        ) : null}

        {questionData.testcases ? (
          <section className={`${sectionClass} p-4`}>
            <div className="flex flex-col items-start gap-3">
              <div>
                <h3 className="text-base font-semibold text-cyan-100">Resources</h3>
                <p className="mt-1 text-xs text-slate-400">Input file, instructions, and support.</p>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                <GetInput testcaseUrl={testcaseUrl} />

              <div className="relative">
                <button
                  className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full bg-[#218ACB] text-[#01011b] transition-colors hover:bg-cyan-600"
                  aria-label="Instructions"
                  onClick={() => window.open("/instructions.pdf", "_blank")}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                </button>

                {showTooltip ? (
                  <div className="absolute left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-neutral-900 p-2 text-gray-100 shadow-lg">
                    <p className="text-sm">Instructions</p>
                  </div>
                ) : null}
              </div>

              <div className="group relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full bg-[#218ACB] text-[#01011b] transition-colors hover:bg-cyan-600"
                  aria-label="Contact support"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>

                {isOpen ? (
                  <div className="absolute right-0 z-10 mt-2 rounded-md bg-neutral-800 py-1 shadow-lg">
                    <div className="border-b px-4 py-2 text-sm text-white">Contact us</div>
                    <a
                      href="https://mail.google.com/mail/u/0/?fs=1&to=kodeinkgp@gmail.com&su=dekodeX+Queries&body=Hello,+I+have+a+question+regarding&tf=cm"
                      target="_blank"
                      className="block px-4 py-2 text-sm text-white hover:bg-neutral-700"
                    >
                      kodeinkgp@gmail.com
                    </a>
                  </div>
                ) : null}
              </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.06] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.2)] sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 border-b border-cyan-300/15 pb-3">
            <h3 className="text-[22px] font-semibold text-[#00FF00] max-sm:text-[19px]">Answer</h3>
            <span className="text-xs text-cyan-100/70">Final output only</span>
          </div>
          <div className="flex flex-row items-center gap-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
            <input
              placeholder="Enter your answer here"
              className="h-[42px] w-[500px] rounded-[16px] bg-transparent px-3 py-2 text-white placeholder:text-slate-500 focus:bg-transparent focus:outline-none max-lg:w-[400px] max-md:w-[300px] max-sm:w-full"
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
            <div className="shrink-0 max-sm:w-full">
              <SubmitButton email={user?.email} answer={answer} id={QuestionID} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Qp;
