import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import problemsData from "./questionTitles";
import { useRouter } from "next/navigation";
import { NotepadText } from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="group flex cursor-pointer items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-3 sm:p-4 transition-colors duration-200"
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Question number skeleton */}
            <div className="w-6 sm:w-8">
              <div className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500"></div>
            </div>

            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 sm:h-5 sm:w-32 md:w-48 lg:w-64 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500"></div>
            </div>
          </div>

          {/* Score skeleton */}
          <div className="h-5 w-6 sm:h-6 sm:w-7 md:w-12 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500"></div>
        </div>
      ))}
    </div>
  );
};
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
    let intervalId;

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

    function shouldStartPolling() {
      const now = new Date();
      return now.getHours() === 23 && now.getMinutes() === 59 && now.getSeconds() >= 50;
    }

    // Start immediate fetch once
    fetchQuestions();

    intervalId = setInterval(() => {
      const now = new Date();

      if (shouldStartPolling()) {
        fetchQuestions();
      }

      // After 12:01 AM stop polling completely
      if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds()<= 10) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [unlockedProblems.length,lockedProblems.length]);

  // Modal JSX
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 text-black shadow-2xl dark:bg-[#111827] dark:text-white">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 cursor-pointer rounded-full p-1 text-gray-400 transition hover:text-white"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="mb-2 text-lg sm:text-xl font-bold">Rules</h2>
        <div className="mb-4 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)]"></div>
        <p className="text-xs sm:text-sm text-white">
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
    <div className="relative mx-2 sm:mx-auto max-w-none sm:max-w-4xl overflow-hidden rounded-[4px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[4px] before:border-[3px] before:border-transparent before:content-[''] before:[border-image-slice:1] before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)]">
      <div className="relative z-10 rounded p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h1
              className="text-xl sm:text-2xl lg:text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                width: "auto",
              }}
            >
              Problem Arena
            </h1>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="focus:ring-opacity-50 flex cursor-pointer items-center gap-1 rounded-lg border border-gray-700 bg-gray-900 px-2 py-1.5 text-xs font-medium text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl focus:ring-1 focus:ring-blue-400 focus:outline-none sm:px-4 sm:py-1.5 sm:text-base"
                onClick={() => setIsOpen(!isOpen)}
              >
                <NotepadText
                  size={16}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  color="rgb(17,227,251)"
                />
                <span className="hidden sm:inline xl:inline">Rules</span>
              </button>
              <Link href="/leaderboard" className="xl:hidden">
                <button className="focus:ring-opacity-50 flex cursor-pointer items-center gap-1 rounded-lg border border-[rgb(17,227,251)] bg-[rgb(17,227,251)] px-2 py-1 text-xs font-medium text-[#01011b] shadow-lg transition-all duration-300 hover:bg-[rgb(15,204,226)] hover:shadow-xl focus:ring-1 focus:ring-blue-400 focus:outline-none sm:px-4 sm:py-1.5 sm:text-base">
                  <i
                    className="fa-duotone fa-solid fa-trophy text-base sm:text-xl"
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

          <div className="mb-4 sm:mb-6 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)]"></div>

          <div className="mb-3 sm:mb-4 space-y-2">
            <p className="text-sm sm:text-base">
              One new problem drops every day — solve it anytime during the
              event.
            </p>
            <p className="text-sm sm:text-base">
              Submit your answer right on the problem page. You'll see sample
              I/O, a submission box, and your past attempts in the Submissions
              tab.
            </p>
          </div>

          <div className="mb-3 sm:mb-4 space-y-1">
            <div className="flex items-start">
              <span className="mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                Points are awarded based on correctness and speed — faster,
                accurate submissions earn more.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                The Leaderboard updates live, showing your rank and top
                performers.
              </span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-semibold text-sm sm:text-base">
              This is a solo competition — no collaboration or code sharing.
            </span>
          </div>
          <div className="font-semibold text-sm sm:text-base">
            Stay sharp, code fast, and climb the ranks!
          </div>

          <div className="my-4 sm:my-6 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)]"></div>
        </div>

        {/* Open Problems Section */}
        <div className="mb-6 sm:mb-8">
          <h2
            className="mb-3 sm:mb-4 bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-xl sm:text-2xl font-bold text-transparent"
            style={{
              background:
                "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              width: "auto",
            }}
          >
            Open
          </h2>
          <div className="space-y-2">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              unlockedProblems.map((problem) => (
                <div
                  key={problem.questionId}
                  className="group flex cursor-pointer items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-3 sm:p-4 transition-colors duration-200 hover:bg-gray-700"
                >
                  <div
                    className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0"
                    onClick={() =>
                      router.push(`/dekodeX/${problem.questionId}`)
                    }
                  >
                    <span className="w-6 sm:w-8 text-base sm:text-lg font-bold text-[#11E3FB] flex-shrink-0">
                      {parseInt(problem.questionId.replace(/^q/, "")) < 10
                        ? "0"
                        : ""}
                      {problem.questionId.replace(/^q/, "")}
                    </span>
                    <Link href={`/dekodeX/${problem.questionId}`} className="min-w-0 flex-1">
                      <span className="bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-base sm:text-lg font-medium text-transparent transition-colors group-hover:text-cyan-400 block truncate">
                        {problem.title}
                      </span>
                    </Link>
                  </div>
                  <span className="text-base sm:text-lg font-bold text-[#218ACB] ml-2 flex-shrink-0">
                    {problem.score}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Yet to Reveal Section */}
        <div>
          <h2 className="mb-3 sm:mb-4 bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-xl sm:text-2xl font-bold text-transparent">
            Yet to Reveal
          </h2>
          <div className="space-y-2">
            {loading ? (
              <div className="">
                <LoadingSkeleton />
              </div>
            ) : (
              lockedProblems.map((problem) => (
                <div
                  key={problem.id}
                  className="group flex cursor-not-allowed items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-3 sm:p-4 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0" />
                    <span className="w-6 sm:w-8 text-base sm:text-lg font-bold text-cyan-400 flex-shrink-0">
                      {parseInt(problem.id.replace(/^q/, "")) < 10 ? "0" : ""}
                      {problem.id.replace(/^q/, "")}
                    </span>
                    <span className="bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-base sm:text-lg font-medium text-transparent opacity-60 blur-sm block truncate min-w-0">
                      {problem.title}
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-bold text-[#218ACB] blur-sm ml-2 flex-shrink-0">
                    {problem.points}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemArena;