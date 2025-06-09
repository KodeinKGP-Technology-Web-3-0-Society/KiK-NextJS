import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import problemsData from "./questionTitles";
import { useRouter } from "next/navigation";
import { NotepadText } from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";

const ProblemArena = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unlockedProblems, setUnlockedProblems] = useState([]);
  const [lockedProblems, setLockedProblems] = useState([]);
 useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const realRes = await fetch("/dekodeX/api/questionTitles");
        const realData = await realRes.json();
        const realQuestions = realData.questions || [];
        const locked = problemsData.slice(realQuestions.length, 10);
        setUnlockedProblems(realQuestions);
        setLockedProblems(locked);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  // Modal JSX
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md rounded-2xl bg-white p-6 text-black shadow-2xl dark:bg-[#111827] dark:text-white">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 cursor-pointer rounded-full p-1 text-gray-400 transition hover:text-white"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="mb-2 text-xl font-bold">Rules</h2>
        <div className="mb-4 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)]"></div>
        <p className="text-sm text-white">
          User with KGP email ID allow to Submit. <br />
          Wrong answers incur -10 penalty
          <br />
          Unique input per user
          <br />
          Leaderboard updates live.
          <br />
          No cheating—violators face disqualification and score resets.
        </p>
      </div>
    </div>
  );
  return (
    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[4px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[4px] before:border-[3px] before:border-transparent before:content-[''] before:[border-image-slice:1] before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)]">
      <div className="relative z-10 rounded p-6">
        
        {/* Header */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h1
              className="text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                width: 240,
              }}
            >
              Problem Arena
            </h1>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="focus:ring-opacity-50 flex cursor-pointer items-center gap-1 rounded-lg border border-gray-700 bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl focus:ring-1 focus:ring-blue-400 focus:outline-none sm:px-4 sm:py-1.5 sm:text-base"
                onClick={() => setIsOpen(!isOpen)}
              >
                <NotepadText size={16} className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden xl:inline">Rules</span>
              </button>
              <Link href="/leaderboard" className="xl:hidden">
                <button className="focus:ring-opacity-50 flex cursor-pointer items-center gap-1 rounded-lg border border-[rgb(17,227,251)] bg-[rgb(17,227,251)] px-2 py-1 text-xs font-medium text-[#01011b] shadow-lg transition-all duration-300 hover:bg-[rgb(15,204,226)] hover:shadow-xl focus:ring-1 focus:ring-blue-400 focus:outline-none sm:px-4 sm:py-1.5 sm:text-base">
                  <i
                    className="fa-duotone fa-solid fa-trophy text-xl"
                    style={{
                      "--fa-primary-color": "#01011b",
                      "--fa-primary-opacity": "1",
                      "--fa-secondary-color": "#01011b",
                      "--fa-secondary-opacity": "0.7",
                    }}
                  ></i>
                </button>
              </Link>
            </div>
            {mounted && isOpen && createPortal(modalContent, document.body)}
          </div>

          <div className="mb-6 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)]"></div>

          <div className="mb-4 space-y-2">
            <p>
              One new problem drops every day — solve it anytime during the
              event.
            </p>
            <p>
              Submit your answer right on the problem page. You'll see sample
              I/O, a submission box, and your past attempts in the Submissions
              tab.
            </p>
          </div>

          <div className="mb-4 space-y-1">
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Points are awarded based on correctness and speed — faster,
                accurate submissions earn more.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                The Leaderboard updates live, showing your rank and top
                performers.
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-semibold">
              This is a solo competition — no collaboration or code sharing.
            </span>
          </div>
          <div className="font-semibold">
            Stay sharp, code fast, and climb the ranks!
          </div>

          <div className="my-6 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)]"></div>
        </div>

        {/* Open Problems Section */}
        <div className="mb-8">
          <h2
            className="mb-4 bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-2xl font-bold text-transparent"
            style={{
              background:
                "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              width: 70,
            }}
          >
            Open
          </h2>
          <div className="space-y-2">
            {unlockedProblems.map((problem) => (
              <div
                key={problem.questionId}
                className="group flex cursor-pointer items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-4 transition-colors duration-200 hover:bg-gray-700"
              >
                <div
                  className="flex items-center space-x-4"
                  onClick={() => router.push(`/dekodeX/${problem.questionId}`)}
                >
                  <span className="w-8 text-lg font-bold text-[#11E3FB]">
                    {parseInt(problem.questionId.replace(/^q/, "")) < 10 ? "0" : ""}
                    {problem.questionId.replace(/^q/, "")}
                  </span>
                  <Link href={`/dekodeX/${problem.questionId}`}>
                    <span className="bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-lg font-medium text-transparent transition-colors group-hover:text-cyan-400">
                      {problem.title}
                    </span>
                  </Link>
                </div>
                <span className="text-lg font-bold text-[#218ACB]">
                  {problem.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Yet to Reveal Section */}
        <div>
          <h2 className="mb-4 w-[180px] bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-2xl font-bold text-transparent">
            Yet to Reveal
          </h2>
          <div className="space-y-2">
            {lockedProblems.map((problem) => (
              <div
                key={problem.id}
                className="group flex cursor-not-allowed items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-4 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <Lock className="h-5 w-5 text-cyan-400" />
                  <span className="w-8 text-lg font-bold text-cyan-400">
                    {parseInt(problem.id.replace(/^q/, "")) < 10 ? "0" : ""}
                    {problem.id.replace(/^q/, "")}
                  </span>
                  <span className="bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-lg font-medium text-transparent opacity-60 blur-sm">
                    {problem.title}
                  </span>
                </div>
                <span className="text-lg font-bold text-[#218ACB] blur-sm">
                  {problem.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemArena;
