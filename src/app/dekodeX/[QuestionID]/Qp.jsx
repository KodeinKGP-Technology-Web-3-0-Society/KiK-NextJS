"use client";

import { useAuth } from "@/contexts/authContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReturnButton from "@/Components/utils/ReturnButton";
import CopyButton from "@/Components/utils/CopyButton";
import SubmitButton from "@/Components/utils/SubmitButton";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GetInput from "@/Components/utils/GetInput";
import DekodeXLoading from "@/Components/dekodeX_Loader/Loader";
import { Source_Code_Pro } from "next/font/google";
import {
  ClipboardList,
  FileText,
  HelpCircle,
  Info,
  Lightbulb,
  LogIn,
  MessageCircle,
  Terminal,
} from "lucide-react";

import "highlight.js/styles/atom-one-dark.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-source-code-pro",
  display: "swap",
});

const sectionClass =
  "rounded-lg border border-white/10 bg-white/[0.04] shadow-[0_12px_34px_rgba(0,0,0,0.2)]";

function SectionHeader({ icon: Icon, title, meta }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="truncate text-base font-semibold text-[#00FF00] sm:text-lg">
          {title}
        </h3>
      </div>
      {meta ? (
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

function cleanCodeBlock(text) {
  if (!text) return "";
  return text
    .replace(/```[a-zA-Z]*\n?/g, "")
    .replace(/```/g, "")
    .trim();
}

function normalizeMarkdownField(value) {
  if (typeof value !== "string" || !value.includes("\\n")) {
    return value;
  }

  return value.replace(/\\r\\n/g, "\r\n").replace(/\\n/g, "\n");
}

function Qp() {
  const [testcases, setTestcases] = useState([]);
  const [questionData, setQuestionData] = useState(null);
  const [questionError, setQuestionError] = useState("");
  const [answer, setAnswer] = useState("");
  const [testcaseUrl, setTestcaseUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const params = useParams();
  const { QuestionID } = params;
  const { user, loggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth");
  };

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
    if (!QuestionID) return;

    let cancelled = false;

    const fetchQuestion = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "/dekodeX/api/question/" +
          QuestionID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let payload = null;
      try {
        payload = await res.json();
      } catch {
        payload = null;
      }

      if (!res.ok) {
        const message =
          payload?.error ||
          payload?.message ||
          "HTTP error! status: " + res.status;

        throw new Error(message);
      }

      if (!cancelled) {
        setQuestionData({
          ...payload,
          title: normalizeMarkdownField(payload?.title),
          question: normalizeMarkdownField(payload?.question),
          sampleInput: normalizeMarkdownField(payload?.sampleInput),
          explanation: normalizeMarkdownField(payload?.explanation),
          sampleOutput: normalizeMarkdownField(payload?.sampleOutput),
        });
        setQuestionError("");
      }
    };

    fetchQuestion().catch((err) => {
      if (!cancelled) {
        setQuestionData(null);
        setQuestionError(err.message || "Failed to fetch question.");
      }
      console.error("Error fetching question:", err);
    });

    return () => {
      cancelled = true;
    };
  }, [QuestionID]);

  if (!questionData) {
    if (questionError) {
      return (
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 rounded-lg border border-red-400/25 bg-red-500/5 p-6 text-center text-red-100">
          <p className="text-sm sm:text-base">{questionError}</p>
          <ReturnButton />
        </div>
      );
    }

    return (
      <div>
        <DekodeXLoading />
      </div>
    );
  }

  const questionNumber = QuestionID?.replace("q", "") || "1";

  return (
    <>
      <div
        className={
          "dekodex-question-page relative mx-auto mt-6 mr-[39px] ml-[39px] flex flex-col overflow-hidden rounded-lg bg-[#01011B] shadow-2xl shadow-black/35 max-md:mt-5 max-md:mr-[28px] max-md:ml-[28px] max-sm:mx-4 max-sm:mt-4 " +
          sourceCodePro.className
        }
        style={{
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(#01011B, #01011B), linear-gradient(108.74deg, rgba(33,138,203,0.45) 0%, rgba(255,255,255,0.18) 48%, rgba(17,227,251,0.42) 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
      <div
        className="relative border-b border-cyan-300/20 bg-white/[0.035]"
        style={{
          background:
            "linear-gradient(108.74deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 100%)",
          minHeight: 88,
        }}
      >
        <div className="absolute right-6 bottom-4 left-6 flex items-end justify-between gap-4 max-sm:right-4 max-sm:bottom-3 max-sm:left-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-cyan-200/80 uppercase sm:text-sm">
              <Terminal className="h-4 w-4 text-cyan-200" />
              <span>
                Problem {questionNumber.length < 2 ? "0" : ""}
                {questionNumber}
              </span>
            </div>
            <h1 className="max-w-[min(800px,calc(100vw-180px))] text-[24px] leading-tight font-semibold break-words text-slate-50 max-md:max-w-[calc(100vw-140px)] max-md:text-[20px] max-sm:max-w-[calc(100vw-110px)] max-sm:text-[18px]">
              {questionData.title}
            </h1>
          </div>
          <div className="flex flex-shrink-0 items-center justify-end">
            <ReturnButton />
          </div>
        </div>
      </div>

      <div className="relative mb-[72px] flex flex-col gap-4 p-5 max-sm:mb-[48px] sm:gap-5 sm:p-6">
        {questionData.question ? (
          <section className={`${sectionClass} p-4 sm:p-5`}>
            <SectionHeader icon={FileText} title="Problem Statement" />
            <div className="markdown-content story-section text-[16px] leading-7 text-slate-100 max-sm:text-[15px]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {questionData.question}
              </ReactMarkdown>
            </div>
          </section>
        ) : null}

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={`${sectionClass} p-4`}>
            <SectionHeader
              icon={ClipboardList}
              title="Sample Input"
            />
            {questionData.sampleInput ? (
              <div className="markdown-content sample-input max-h-[320px] overflow-auto rounded-lg border border-cyan-300/15 bg-[#05071f] p-1">
                <div className="relative">
                  <CopyButton text={cleanCodeBlock(questionData.sampleInput)} />
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
          </div>

          <div className={`${sectionClass} p-4`}>
            <SectionHeader
              icon={ClipboardList}
              title="Sample Output"
            />
            {questionData.sampleOutput ? (
              <div className="markdown-content sample-output max-h-[320px] overflow-auto rounded-lg border border-cyan-300/15 bg-[#05071f] p-1">
                <div className="relative">
                  <CopyButton
                    text={cleanCodeBlock(questionData.sampleOutput)}
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
              <pre className="text-white">No sample output available</pre>
            )}
          </div>
        </section>

        {questionData.explanation ? (
          <section className={`${sectionClass} p-4 sm:p-5`}>
            <SectionHeader icon={Lightbulb} title="Explanation" />
            <div className="markdown-content explanation-section text-[16px] leading-7 text-slate-100 max-sm:text-[15px]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {questionData.explanation}
              </ReactMarkdown>
            </div>
          </section>
        ) : null}

        {questionData.testcases ? (
          <section className={`${sectionClass} p-4`}>
            <div className="flex flex-row flex-wrap items-center justify-start gap-2">
              <GetInput testcaseUrl={testcaseUrl} />

              <div className="relative">
                <button
                  className="flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/90 px-3 text-sm font-semibold text-[#01011b] transition-colors hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-300/30 focus:outline-none max-sm:w-[42px] max-sm:px-0"
                  aria-label="Instructions"
                  onClick={() => window.open("/instructions.pdf", "_blank")}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span className="max-sm:hidden">Instructions</span>
                </button>

                {showTooltip ? (
                  <div className="absolute left-1/2 z-10 mt-2 -translate-x-1/2 rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-gray-100 shadow-lg">
                    <p className="text-sm">Instructions</p>
                  </div>
                ) : null}
              </div>

              <div className="group relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/90 px-3 text-sm font-semibold text-[#01011b] transition-colors hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-300/30 focus:outline-none max-sm:w-[42px] max-sm:px-0"
                  aria-label="Contact support"
                  title="Contact support"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="max-sm:hidden">Contact us</span>
                </button>

                {isOpen ? (
                  <div className="absolute left-0 z-10 mt-2 min-w-[220px] rounded-md border border-white/10 bg-neutral-900 py-1 shadow-lg">
                    <div className="border-b border-white/10 px-4 py-2 text-sm text-white">
                      Contact us
                    </div>
                    <a
                      href="https://mail.google.com/mail/u/0/?fs=1&to=kodeinkgp@gmail.com&su=dekodeX+Queries&body=Hello,+I+have+a+question+regarding&tf=cm"
                      target="_blank"
                      className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                    >
                      kodeinkgp@gmail.com
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        <section className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.055] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.2)] sm:p-5">
          <SectionHeader icon={Info} title="Answer" meta="Final output only" />
          {loggedIn ? (
            <div className="flex flex-row items-center gap-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
              <input
                placeholder="Enter your answer here"
                className="h-[42px] min-w-0 flex-1 rounded-lg bg-[#01011b] px-3 py-2 text-white placeholder:text-slate-500 focus:bg-[#030523] focus:outline-none max-sm:w-full"
                style={{
                  border: "1px solid transparent",
                  backgroundImage:
                    "linear-gradient(#01011B, #01011B), linear-gradient(89.17deg, rgba(33,138,203,0.8) 0%, rgba(17,227,251,0.8) 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="shrink-0 max-sm:w-full">
                <SubmitButton
                  email={user?.email}
                  answer={answer}
                  id={QuestionID}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#01011b]/60 p-3 max-sm:flex-col max-sm:items-stretch">
              <p className="text-sm text-slate-300">
                Login to submit your answer and save your score.
              </p>
              <button
                onClick={handleLogin}
                className="flex h-[42px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300 px-4 text-sm font-semibold text-[#01011b] transition hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-300/30 focus:outline-none"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            </div>
          )}
        </section>
      </div>
      </div>

      {!loggedIn ? (
        <button
          id="floatingQuestionAuthBtn"
          onClick={handleLogin}
          className="group fixed right-5 bottom-5 z-50 flex cursor-pointer items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#01011b] shadow-lg shadow-cyan-950/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 md:right-8 md:bottom-8"
          aria-label="Login"
        >
          <LogIn className="h-5 w-5" />
          <span className="pl-2">Login</span>
        </button>
      ) : null}
    </>
  );
}

export default Qp;
