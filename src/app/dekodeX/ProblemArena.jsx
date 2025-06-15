import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import problemsData from "./questionTitles";
import { useRouter } from "next/navigation";
import { NotepadText } from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="group flex cursor-pointer items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-3 transition-colors duration-200 sm:p-4"
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Question number skeleton */}
            <div className="w-6 sm:w-8">
              <div className="h-5 w-5 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500 sm:h-6 sm:w-6"></div>
            </div>

            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500 sm:h-5 sm:w-32 md:w-48 lg:w-64"></div>
            </div>
          </div>

          {/* Score skeleton */}
          <div className="h-5 w-6 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500 sm:h-6 sm:w-7 md:w-12"></div>
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
  const { user, loggedIn } = useAuth();
  const getSubmissionIndex = (questionId) => {
    return parseInt(questionId.replace("q", "")) - 1;
  };
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
      return (
        now.getHours() === 23 &&
        now.getMinutes() === 59 &&
        now.getSeconds() >= 50
      );
    }

    // Start immediate fetch once
    fetchQuestions();

    intervalId = setInterval(() => {
      const now = new Date();

      if (shouldStartPolling()) {
        fetchQuestions();
      }

      // After 12:01 AM stop polling completely
      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() <= 10
      ) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [unlockedProblems.length, lockedProblems.length]);

  // Modal JSX
  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="no-scrollbar relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-4 text-black shadow-2xl sm:p-6 dark:bg-[#111827] dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 cursor-pointer rounded-full p-1 text-gray-400 transition hover:text-white sm:top-3 sm:right-3"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="mb-2 text-lg font-bold sm:text-xl">Competition Rules</h2>
        <div className="mb-4 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)]"></div>

        <div className="mb-4 space-y-3 sm:mb-5">
          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <h3 className="mb-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
              📅 Problem Release
            </h3>
            <p className="text-xs text-blue-700 sm:text-sm dark:text-blue-200">
              One new problem drops daily at midnight IST. Solve it anytime
              during the competition period.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <h3 className="mb-2 text-sm font-semibold text-green-800 dark:text-green-300">
              💻 Submission Process
            </h3>
            <p className="text-xs text-green-700 sm:text-sm dark:text-green-200">
              Submit your answers directly on the problem page. View sample
              input/output and get your problem input.
            </p>
          </div>

          <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
            <h3 className="mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">
              🏆 Scoring System
            </h3>
            <div className="space-y-1 text-xs text-purple-700 sm:text-sm dark:text-purple-200">
              <p>
                • <strong>Correctness:</strong> Full points for passing all test
                cases
              </p>
              <p>
                • <strong>Speed Bonus:</strong> Earlier submissions earn higher
                scores
              </p>
              <p>
                • <strong>Penalty:</strong> Wrong submissions reduce final score
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
            <h3 className="mb-2 text-sm font-semibold text-orange-800 dark:text-orange-300">
              📊 Leaderboard
            </h3>
            <p className="text-xs text-orange-700 sm:text-sm dark:text-orange-200">
              Real-time ranking updates. Your position depends on total score
              across all solved problems.
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <h3 className="mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">
            🏆 Scoring System
          </h3>
          <div className="space-y-1 text-xs text-purple-700 sm:text-sm dark:text-purple-200">
            <p>
              • <strong>Correctness:</strong> Full points for passing all test
              cases
            </p>
            <p>
              • <strong>Speed Bonus:</strong> Earlier submissions earn higher
              scores
            </p>
            <p>
              • <strong>Wrong Answer Penalty:</strong> Incorrect submissions
              result in -10 points
            </p>
          </div>
        </div>
        <div className="mb-3 rounded-lg border-l-4 border-red-500 bg-red-50 p-3 dark:bg-red-900/20">
          <div className="flex items-start">
            <span className="mr-2 text-red-600 dark:text-red-400">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                Solo Competition
              </p>
              <p className="text-xs text-red-700 dark:text-red-200">
                No collaboration, code sharing, or external assistance allowed.
                Fair play is strictly enforced.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 p-3 text-center dark:from-cyan-900/20 dark:to-blue-900/20">
          <p className="text-sm font-bold text-cyan-800 dark:text-cyan-300">
            🚀 Dive deep, code fast, dominate the abyss!
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative mx-2 max-w-none overflow-hidden rounded-[4px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[4px] before:border-[3px] before:border-transparent before:content-[''] before:[border-image-slice:1] before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] sm:mx-auto sm:max-w-4xl">
      <div className="relative z-10 rounded p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h1
              className="text-xl font-bold sm:text-2xl lg:text-3xl"
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

          <div className="mb-4 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)] sm:mb-6"></div>

          <div className="mx-auto font-sans text-white">
            <h1 className="text-xl font-semibold">
              "Abyss Protocol: The Last Stand"
            </h1>
            <p className="mt-1 text-gray-300 italic">
              10 Days. One Ocean. One Chance.
            </p>

            <hr className="my-3 border-gray-600" />

            <div className="space-y-3 text-base leading-7 text-gray-200">
              <p>
                The year is 2142. Earth is submerged under oceans, and
                humanity's last survivors live within massive underwater
                biodomes — colossal structures of steel and glass that serve as
                the final bastions of civilization, powered by geothermal vents
                and protected by quantum shields that flicker against the
                crushing depths.
              </p>

              <p>
                An alien race known as{" "}
                <strong className="text-red-400">"The Varions"</strong> has
                infiltrated Earth's technology from the deepest ocean trenches.
                These silicon-based entities corrupt quantum processors, steal
                energy cores, and release weaponized digital viruses that turn
                our own systems against us, threatening the very survival of the
                remaining biodomes.
              </p>

              <p>
                You are a <strong className="text-cyan-400">Cyber-Diver</strong>{" "}
                — part human, part machine, with neural implants that connect
                your consciousness directly to the network. Your mission:
                navigate through layers of encrypted alien code, solve their
                twisted algorithmic puzzles, and reclaim control of humanity's
                digital infrastructure before the last biodome falls to eternal
                darkness.
              </p>

              <p className="font-medium text-cyan-300">
                Each algorithm you crack brings us one step closer to freedom.
                The pressure is mounting, and the Varions are watching your
                every move...
              </p>
            </div>
          </div>

          <div className="my-4 h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)] sm:my-6"></div>
        </div>

        {/* Open Problems Section */}
        <div className="mb-6 sm:mb-8">
          <h2
            className="mb-3 bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-xl font-bold text-transparent sm:mb-4 sm:text-2xl"
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
                  className={`group flex cursor-pointer items-center justify-between rounded p-3 transition-colors duration-200 hover:bg-gray-700 sm:p-4 ${
                    user?.submissions?.[
                      getSubmissionIndex(problem.questionId)
                    ] > 0
                      ? "border border-green-500/30 bg-green-500/20"
                      : "bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)]"
                  }`}
                >
                  <div
                    className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-4"
                    onClick={() =>
                      router.push(`/dekodeX/${problem.questionId}`)
                    }
                  >
                    <span className="w-6 flex-shrink-0 text-base font-bold text-[#11E3FB] sm:w-8 sm:text-lg">
                      {parseInt(problem.questionId.replace(/^q/, "")) < 10
                        ? "0"
                        : ""}
                      {problem.questionId.replace(/^q/, "")}
                    </span>
                    <Link
                      href={`/dekodeX/${problem.questionId}`}
                      className="min-w-0 flex-1"
                    >
                      <span className="block truncate bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-base font-medium text-transparent transition-colors group-hover:text-cyan-400 sm:text-lg">
                        {problem.title}
                      </span>
                    </Link>
                  </div>
                  <span className="ml-2 flex-shrink-0 text-base font-bold text-[#218ACB] sm:text-lg">
                    {"<"}
                    {problem.score}
                    {"/>"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Yet to Reveal Section */}
        <div>
          <h2 className="mb-3 bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-xl font-bold text-transparent sm:mb-4 sm:text-2xl">
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
                  className="group flex cursor-not-allowed items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-3 transition-colors duration-200 sm:p-4"
                >
                  <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-4">
                    <Lock className="h-4 w-4 flex-shrink-0 text-cyan-400 sm:h-5 sm:w-5" />
                    <span className="w-6 flex-shrink-0 text-base font-bold text-cyan-400 sm:w-8 sm:text-lg">
                      {parseInt(problem.id.replace(/^q/, "")) < 10 ? "0" : ""}
                      {problem.id.replace(/^q/, "")}
                    </span>
                    <span className="block min-w-0 truncate bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-base font-medium text-transparent opacity-60 blur-sm sm:text-lg">
                      {problem.title}
                    </span>
                  </div>
                  <span className="ml-2 flex-shrink-0 text-base font-bold text-[#218ACB] blur-sm sm:text-lg">
                    {"<"}
                    {problem.points}
                    {"/>"}
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
