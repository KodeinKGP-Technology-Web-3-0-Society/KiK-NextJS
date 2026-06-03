import React, { useEffect, useState } from "react";
import { Lock, NotepadText } from "lucide-react";
import problemsData from "./questionTitles";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/authContext";
import { useAuthToken } from "../../hooks/useAuthToken";

// --- ORIGINAL SKELETON RETAINED ---
export const LoadingSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="group flex cursor-pointer items-center justify-between rounded bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] p-3 transition-colors duration-200 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-6 sm:w-8"><div className="h-5 w-5 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500 sm:h-6 sm:w-6"></div></div>
            <div className="space-y-2"><div className="h-4 w-24 animate-pulse rounded bg-gradient-to-r from-gray-600 to-gray-500 sm:h-5 sm:w-32 md:w-48 lg:w-64"></div></div>
          </div>
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
  const [unlockedProblems, setUnlockedProblems] = useState([]);
  const [lockedProblems, setLockedProblems] = useState(problemsData);
  const { user, loggedIn } = useAuth();
  const { token: authToken } = useAuthToken();

  const formatTime = (ms) => {
    if (ms <= 0) return "Available";
    const seconds = Math.floor(ms / 1000);
    const totalHours = Math.floor(seconds / 3600);
    if (totalHours >= 24) {
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${String(days).padStart(2, "0")} day ${String(hours).padStart(2, "0")} hr ${String(minutes).padStart(2, "0")} min`;
    }
    return `${String(totalHours).padStart(2, "0")} hr ${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")} min ${String(seconds % 60).padStart(2, "0")} sec`;
  };

  const getGreeting = () => {
    const hour = parseInt(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }).split(":")[0]);
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
const isUnlocked = (problem) => {
  const unlockDateIST = new Date(problem.unlockDate + "T00:00:00+05:30");
  return new Date() >= unlockDateIST;
};
  const getTimeUntilUnlock = (dateString) => {
    const unlockDateIST = new Date(dateString + "T00:00:00+05:30");
    return unlockDateIST.getTime() - new Date().getTime();
  };

  useEffect(() => { setMounted(true); }, []);

useEffect(() => {
  async function fetchQuestions() {
    if (!authToken) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/questionTitles`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      const apiQuestions = data.questions || [];
      
      const apiMap = new Map(apiQuestions.map(q => [q.questionId, q]));

      const open = [];
      const locked = [];

      problemsData.forEach((problem) => {
        if (!problem || !problem.id) return;

        const unlockDateIST = new Date(problem.unlockDate + "T00:00:00+05:30");
        const isPastDate = new Date() >= unlockDateIST;

        if (apiMap.has(problem.id) && isPastDate) {
          const apiData = apiMap.get(problem.id);
          // MERGE: Update the local object with API data
          open.push({
            ...problem,
            title: apiData.title || problem.title, // Use API title if available
            points: apiData.score || apiData.points || problem.points // Use API score
          });
        } else {
          locked.push(problem);
        }
      });

      setUnlockedProblems(open);
      setLockedProblems(locked);
    } catch (err) { console.error("Fetch Error:", err); }
  }
  fetchQuestions();
}, [authToken]);
  const modalContent = (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
    <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 text-black shadow-2xl dark:bg-[#0f172a] dark:text-white" onClick={(e) => e.stopPropagation()}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Competition Rules</h2>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black dark:hover:text-white text-2xl">×</button>
      </div>
      <div className="mb-6 h-1 w-full bg-[linear-gradient(90deg,#218ACB,#11E3FB)] rounded-full"></div>

      {/* Rules Grid */}
      <div className="space-y-4">
        
        {/* 1. Problem Release */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">📅 Problem Release</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">One new problem drops daily at midnight IST. Solve it anytime during the competition period.</p>
        </div>

        {/* 2. Submission Process */}
        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-900">
          <h3 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-2">💻 Submission Process</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Submit your answers directly on the problem page. View sample input/output and get your problem input.</p>
        </div>

        {/* 3. Leaderboard */}
        <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border border-orange-200 dark:border-orange-900">
          <h3 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-2">📊 Leaderboard</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Real-time ranking updates. Your position depends on total score across all solved problems.</p>
        </div>

        {/* 4. Scoring System */}
        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-900">
          <h3 className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-2">🏆 Scoring System</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 mt-1 space-y-1 list-disc ml-4">
            <li><span className="font-semibold">Correctness:</span> Full points for passing all test cases.</li>
            <li><span className="font-semibold">Speed Bonus:</span> Earlier submissions earn higher scores.</li>
            <li><span className="font-semibold">Wrong Answer Penalty:</span> Incorrect submissions result in -10 points.</li>
          </ul>
        </div>

        {/* 5. Solo Warning */}
        <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-red-800 dark:text-red-200 font-medium">⚠️ Solo Competition: No collaboration, code sharing, or external assistance allowed. Fair play is strictly enforced.</p>
        </div>

        {/* Footer Button */}
        <button className="w-full py-3 bg-[linear-gradient(90deg,#218ACB,#11E3FB)] text-white font-bold rounded-lg hover:opacity-90 transition">
          🚀 Dive deep, code fast, dominate the abyss!
        </button>
      </div>
    </div>
  </div>
);
  return (
    <div className="relative mx-2 max-w-4xl sm:mx-auto rounded-[4px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] p-6 backdrop-blur-[100px] border border-white/10">
      <div className="mb-6 flex justify-between items-start">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-[linear-gradient(92.46deg,#218ACB_0%,#11E3FB_100%)]">
          {loggedIn ? `${getGreeting()}, ${user?.username}` : "Welcome"} <br /> Problem Arena
        </h1>
        <button className="flex items-center gap-2 border border-gray-700 bg-gray-900 px-4 py-2 rounded text-white" onClick={() => setIsOpen(true)}>
          <NotepadText size={18} /> Rules
        </button>
      </div>

      {/* The story intro is kept */}
      <div className="mx-auto mt-4 font-sans text-white mb-8">
        <div className="space-y-4 text-base leading-7 text-gray-200">
          <p>The year is 2142. Earth is submerged under oceans, and humanity's last survivors live within massive underwater biodomes — colossal structures of steel and glass that serve as the final bastions of civilization, powered by geothermal vents and protected by quantum shields that flicker against the crushing depths.</p>
          <p>An alien race known as <strong className="text-red-400">"The Varions"</strong> has infiltrated Earth's technology from the deepest ocean trenches. These silicon-based entities corrupt quantum processors, steal energy cores, and release weaponized digital viruses that turn our own systems against us, threatening the very survival of the remaining biodomes.</p>
          <p>You are a <strong className="text-cyan-400">Cyber-Diver</strong> — part human, part machine, with neural implants that connect your consciousness directly to the network. Your mission: navigate through layers of encrypted alien code, solve their twisted algorithmic puzzles, and reclaim control of humanity's digital infrastructure before the last biodome falls to eternal darkness.</p>
          <p className="font-medium text-cyan-300">Each algorithm you crack brings us one step closer to freedom. The pressure is mounting, and the Varions are watching your every move...</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-[#11E3FB]">Open</h2>
        <div className="space-y-2">
          {unlockedProblems.map((problem) => (
            <div key={problem.questionId} onClick={() => router.push(`/dekodeX/${problem.id}`)} className="cursor-pointer group flex items-center justify-between rounded bg-[rgba(255,255,255,0.1)] p-4 hover:bg-cyan-900/20 transition border border-cyan-500/20">
              <span className="font-bold text-[#11E3FB]">{(problem.id || "").replace("q", "").padStart(2, '0')}</span>
              <span className="text-[#11E3FB] truncate flex-1 mx-4 font-medium">{problem.title || "Untitled Problem"}</span>
              <span className="font-bold text-[#218ACB]">{"<"}{problem.points || "0"}{"/>"}</span>
            </div>
          ))}
        </div>
      </div>

      {lockedProblems.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-[#11E3FB]/50">Yet to Reveal</h2>
          <div className="space-y-2">
            {lockedProblems.map((problem) => (
              <div key={problem.id} className=" flex items-center justify-between rounded bg-[rgba(255,255,255,0.05)] p-4 border border-white/5">
                <div className="flex items-center gap-4">
                  <Lock className="text-cyan-500" />
                  <span className="font-bold text-cyan-500">{(problem.id || "").replace("q", "").padStart(2, '0')}</span>
                  <span className="text-cyan-800 font-medium italic">{formatTime(getTimeUntilUnlock(problem.unlockDate))}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </div>
  );
};

export default ProblemArena;