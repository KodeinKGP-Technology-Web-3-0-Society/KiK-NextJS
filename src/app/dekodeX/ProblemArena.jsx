import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import problemsData from "./questionTitles";
import { useRouter } from "next/navigation";
import { NotepadText } from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";

const LoadingSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }, (_, index) => (
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, loggedIn } = useAuth();
  const showQuestionLoader = loading;
  const formatTime = (ms) => {
    if (ms <= 0) return "Loading...";
    const seconds = Math.floor(ms / 1000);
    const totalHours = Math.floor(seconds / 3600);
    // If hours > 24, show days
    if (totalHours >= 24) {
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      const d = String(days).padStart(2, "0");
      const h = String(hours).padStart(2, "0");
      const m = String(minutes).padStart(2, "0");
      const s = String(secs).padStart(2, "0");

      return `${d} day ${h} hr ${m} min ${s} sec`;
    } else {
      // Original format for less than 24 hours
      const h = String(totalHours).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");

      return `${h} hr ${m} min ${s} sec`;
    }
  };

  const getSubmissionIndex = (questionId) => {
    return parseInt(questionId.replace("q", "")) - 1;
  };
  const getGreeting = () => {
    const now = new Date();
    const timeInIST = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });
    const hour = parseInt(timeInIST.split(":")[0]);
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  const getTimeUntilUnlock = (dateString) => {
    const now = new Date();

    // Create a date for midnight IST on the unlock date
    // We need to be careful here - we want midnight IST, not midnight local time
    const unlockDateIST = new Date(dateString + "T00:00:00+05:30"); // Explicitly set IST timezone

    return unlockDateIST.getTime() - now.getTime();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Set current time in IST
      setCurrentTime(
        new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    let intervalId;

    async function fetchQuestions() {
      setLoading(true);
      try {
        const realRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/questionTitles`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const realData = await realRes.json();
        const realQuestions = realData.questions || [];
        const locked = problemsData.slice(realQuestions.length, 10);
        realQuestions.sort((a, b) => {
          return (
            parseInt(a.questionId.replace("q", "")) -
            parseInt(b.questionId.replace("q", ""))
          );
        });
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
      const timeInIST = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });
      const [hours, minutes, seconds] = timeInIST.split(":").map(Number);
      return hours === 23 && minutes === 59 && seconds >= 50;
    }

    // Start immediate fetch once
    fetchQuestions();

    intervalId = setInterval(() => {
      const now = new Date();

      if (shouldStartPolling()) {
        fetchQuestions();
      }

      // After 12:01 AM IST stop polling completely
      const timeInIST = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });
      const [hours, minutes, seconds] = timeInIST.split(":").map(Number);
      if (hours === 0 && minutes === 0 && seconds <= 10) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Modal JSX
  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="no-scrollbar relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-cyan-300/20 bg-[#071126] p-5 text-white shadow-2xl shadow-cyan-950/40 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 cursor-pointer rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        <div className="mb-3 inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-cyan-100 uppercase">
          Rules
        </div>
        <h2 className="text-lg font-semibold text-cyan-100 sm:text-xl">
          Competition Rules
        </h2>
        <p className="mt-1 text-xs text-slate-300 sm:text-sm">
          Follow these to stay eligible and maximize score.
        </p>
        <div className="my-4 h-px bg-cyan-300/25"></div>

        <div className="space-y-2.5">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-3.5">
            <p className="text-sm font-semibold text-cyan-200">Problem Release</p>
            <p className="mt-1 text-xs leading-5 text-slate-300 sm:text-sm">
              One new problem unlocks daily at midnight IST.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-3.5">
            <p className="text-sm font-semibold text-cyan-200">Submission</p>
            <p className="mt-1 text-xs leading-5 text-slate-300 sm:text-sm">
              Submit from each problem page after checking samples and your input.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-3.5">
            <p className="text-sm font-semibold text-cyan-200">Leaderboard</p>
            <p className="mt-1 text-xs leading-5 text-slate-300 sm:text-sm">
              Rankings update live based on your total score.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-3.5">
            <p className="text-sm font-semibold text-cyan-200">Scoring</p>
            <ul className="mt-1 space-y-1.5 text-xs leading-5 text-slate-300 sm:text-sm">
              <li>Full points for correct solutions.</li>
              <li>Earlier correct submissions earn higher score.</li>
              <li>Wrong answer incurs a -10 penalty.</li>
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-red-400/20 bg-red-500/10 p-3 sm:p-3.5">
          <p className="text-sm font-semibold text-red-200">Solo Competition</p>
          <p className="mt-1 text-xs leading-5 text-red-100/80 sm:text-sm">
            Collaboration, code sharing, and external assistance are not allowed.
          </p>
        </div>


      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-white/[0.055] bg-[radial-gradient(circle_at_top_left,rgba(17,227,251,0.14),transparent_28rem)] shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="relative z-10 p-4 sm:p-6 lg:p-7">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1
              className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              style={{
                width: "auto",
              }}
            >
              <span className="mb-2 block text-sm font-medium text-cyan-200/80 sm:text-base">
                {loggedIn
                  ? `${getGreeting()}, ${user?.username}`
                  : "DekodeX Challenge"}
              </span>
              Welcome to Problem Arena
            </h1>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-white/10 focus:ring-2 focus:ring-cyan-300/30 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <NotepadText
                  size={16}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  color="rgb(17,227,251)"
                />
                <span>Rules</span>
              </button>
              <Link href="/leaderboard" className="xl:hidden">
                <button className="flex cursor-pointer items-center gap-1 rounded-full border border-cyan-300 bg-cyan-300 px-3 py-2 text-sm font-semibold text-[#01011b] transition hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-300/30 focus:outline-none">
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

          <div className="mb-5 h-px bg-cyan-300/20 sm:mb-6"></div>

          <div className="rounded-2xl border border-white/10 bg-[#01011b]/35 p-4 font-sans text-white sm:p-5">
            <h1 className="text-xl font-semibold text-cyan-100">
              "ECHO BEFORE DAWN"
            </h1>
            <p className="mt-1 text-sm text-slate-300 italic">
              52,000 years of silence. 10 days to break it.
            </p>

            <hr className="my-4 border-white/10" />

            <div className="space-y-3 text-sm leading-7 text-slate-200 sm:text-base">
              <p>
                The year is 2187. Humanity has colonized Mars and proudly believes we are the first intelligent life in the universe. We are completely wrong.
                Deep under the Sahara Desert, an excavation found something impossible: ancient ruins 52,000 years old. Strangely, these stone structures are fused with advanced computer chips and digital code
              </p>

              <p>
                A faceless, powerful corporation named <strong className="text-red-400">"VANTA"</strong>  has known about this for over a century. They have buried the truth and are now initiating a strict erasure protocol to destroy the evidence.

              </p>

              <p>
                But the ruins are turning back on. A secret warning message just escaped the dig site, sent directly to you: <strong className="text-cyan-300">KAI</strong>{" "}. As a lone hacker and the daughter of the lead archaeologist, you are the only one equipped to uncover the truth. The ancient builders left this message to wake up when humanity was finally ready to understand it.
              </p>

              <p className="font-medium text-cyan-200">
                That time is now. VANTA is tightening the net, throwing up firewalls and security vaults to stop you. You have exactly 10 days to crack their obstacles and decode the ancient signal before their countdown deletes it forever.
              </p>
            </div>
          </div>

          <div className="my-5 h-px bg-cyan-300/20 sm:my-6"></div>
        </div>

        {/* Open Problems Section */}
        <div className="mb-6 sm:mb-8">
          {lockedProblems.length < 10 && (
            <h2 className="mb-3 text-xl font-semibold text-cyan-100 sm:mb-4 sm:text-2xl">
              Open
            </h2>
          )}

          <div className="space-y-2">
            {showQuestionLoader ? (
              <LoadingSkeleton count={10} />
            ) : (
              unlockedProblems.map((problem) => (
                <div
                  key={problem.questionId}
                  className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.08] sm:p-4 ${user?.submissions?.[
                      getSubmissionIndex(problem.questionId)
                    ] > 0
                      ? "border-green-400/30 bg-green-400/10"
                      : "border-white/10 bg-white/[0.045]"
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
                      <span className="block truncate text-base font-medium text-white transition-colors group-hover:text-cyan-200 sm:text-lg">
                        {problem.title}
                      </span>
                    </Link>
                  </div>
                  <span className="ml-2 flex-shrink-0 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-200">
                    {problem.score} pts
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Yet to Reveal Section */}
        <div>
          {lockedProblems.length > 0 && (
            <h2 className="mb-3 text-xl font-semibold text-cyan-100 sm:mb-4 sm:text-2xl">
              Yet to Reveal
            </h2>
          )}
          <div className="space-y-2">
            {showQuestionLoader ? (
              <></>
            ) : (
              lockedProblems.map((problem) => {
                const timeUntilUnlock = problem.unlockDate
                  ? getTimeUntilUnlock(problem.unlockDate)
                  : 0;
                const countdownText = problem.unlockDate
                  ? formatTime(timeUntilUnlock)
                  : "Coming Soon";

                return (
                  <div
                    key={problem.id}
                    className="group flex cursor-not-allowed items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-3 opacity-80 transition-colors duration-200 sm:p-4"
                  >
                    <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-4">
                      <Lock className="h-4 w-4 flex-shrink-0 text-cyan-400 sm:h-5 sm:w-5" />
                      <span className="w-6 flex-shrink-0 text-base font-bold text-cyan-400 sm:w-8 sm:text-lg">
                        {parseInt(problem.id.replace(/^q/, "")) < 10 ? "0" : ""}
                        {problem.id.replace(/^q/, "")}
                      </span>
                      <div className="min-w-0 flex-1">
                        {/* Timer display - not blurred */}
                        <span className="block text-sm font-medium text-cyan-200 sm:text-base">
                          {countdownText}
                        </span>
                        {/* Original title - blurred and hidden behind timer */}
                        <span className="absolute block truncate bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-base font-medium text-transparent opacity-0 blur-sm sm:text-lg">
                          {problem.title}
                        </span>
                      </div>
                    </div>
                    <span className="ml-2 flex-shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm font-semibold text-slate-400 blur-sm">
                      {problem.points} pts
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemArena;
