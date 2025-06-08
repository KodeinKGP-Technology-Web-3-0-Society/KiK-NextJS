import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import problemsData from './Question';
import { useRouter } from 'next/navigation';
import { NotepadText } from 'lucide-react';
import { createPortal } from 'react-dom';
import Link from "next/link";

const ProblemArena = () => {
  const openProblems = problemsData.filter(p => p.is_revealed);
  const lockedProblems = problemsData.filter(p => !p.is_revealed);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal JSX
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#111827] text-black dark:text-white rounded-2xl p-6 w-[90%] max-w-md relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer rounded-full p-1 transition"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-bold mb-2">Rules</h2>
        <div className="h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)] mb-4"></div>
        <p className="text-sm text-white ">
          User with KGP email ID allow to Submit. <br />
          Wrong answers incur -10 penalty<br />
          Unique input per user<br />
          Leaderboard updates live.<br />
          No cheating—violators face disqualification and score resets.

        </p>
      </div>
    </div>
  );
  return (
    <div className="relative rounded-[4px] overflow-hidden before:absolute before:inset-0 before:rounded-[4px] before:border-[3px] before:border-transparent before:[border-image-source:linear-gradient(108.74deg,rgba(33,138,203,0.6)_0%,rgba(255,255,255,0.54)_36.46%,rgba(255,255,255,0.3)_73.96%,rgba(17,227,251,0.6)_100%)] before:[border-image-slice:1] before:content-[''] before:pointer-events-none shadow-[0_0_50px_-25px_rgba(0,0,0,0.5)] backdrop-blur-[100px] bg-[linear-gradient(108.74deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_100%)] max-w-4xl mx-auto">
      <div className="relative z-10 p-6 rounded">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-3xl font-bold " style={{
              background:
                "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              width: 240,
            }}>Problem Arena</h1>
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="px-2 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-base bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg border border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-opacity-50 flex gap-1 items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <NotepadText size={16} className="sm:w-5 sm:h-5 w-4 h-4" />
                <span className="hidden xl:inline">Rules</span>
              </button>
              <Link href="/leaderboard" className="xl:hidden">
                <button className="px-2 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-base bg-[rgb(17,227,251)] hover:bg-[rgb(15,204,226)] text-[#01011b] font-medium rounded-lg border border-[rgb(17,227,251)] transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-opacity-50 flex gap-1 items-center cursor-pointer">
                  <i className="fa-duotone fa-solid fa-trophy text-xl" style={{ "--fa-primary-color": "#01011b", "--fa-primary-opacity": "1", "--fa-secondary-color": "#01011b", "--fa-secondary-opacity": "0.7" }}></i>
                </button>
              </Link>
            </div>
            {mounted && isOpen && createPortal(modalContent, document.body)}
          </div>

          <div className="h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)] mb-6"></div>

          <div className="space-y-2 mb-4">
            <p>One new problem drops every day — solve it anytime during the event.</p>
            <p>Submit your answer right on the problem page. You'll see sample I/O, a submission box, and your past attempts in the Submissions tab.</p>
          </div>

          <div className="space-y-1 mb-4">
            <div className="flex items-start">
              <span className=" mr-2">•</span>
              <span>Points are awarded based on correctness and speed — faster, accurate submissions earn more.</span>
            </div>
            <div className="flex items-start">
              <span className=" mr-2">•</span>
              <span>The Leaderboard updates live, showing your rank and top performers.</span>
            </div>
          </div>

          <div className="mb-2">
            <span className="font-semibold">This is a solo competition — no collaboration or code sharing.</span>
          </div>
          <div className="font-semibold">
            Stay sharp, code fast, and climb the ranks!
          </div>

          <div className="h-0.5 bg-[linear-gradient(90deg,rgba(33,138,203,0.8)_0%,rgba(17,227,251,0.8)_50%,rgba(33,138,203,0.8)_75%,rgba(17,227,251,0.8)_100%)] my-6"></div>
        </div>

        {/* Open Problems Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-transparent mb-4" style={{
            background:
              "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            width: 70,
          }}>Open</h2>
          <div className="space-y-2">
            {openProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] hover:bg-gray-700 transition-colors duration-200 p-4 rounded cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4" onClick={() => router.push(`/dekodeX/${problem.id}`)}>
                  <span className="text-[#11E3FB] font-bold text-lg w-8">{problem.id < 10 ? '0' : ''}{problem.id}</span>
                  <Link href={`/dekodeX/${problem.id}`}>
                    <span className="bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] bg-clip-text text-transparent font-medium text-lg group-hover:text-cyan-400 transition-colors">
                      {problem.title}
                    </span>
                  </Link>
                </div>
                <span className="text-[#218ACB] font-bold text-lg">{problem.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Yet to Reveal Section */}
        <div>
          <h2 className="text-2xl font-bold bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-transparent mb-4 w-[180px]">Yet to Reveal</h2>
          <div className="space-y-2">
            {lockedProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-[linear-gradient(90.27deg,rgba(255,255,255,0.24)_0%,rgba(115,115,115,0.12)_100%)] transition-colors duration-200 p-4 rounded flex items-center justify-between group cursor-not-allowed"
              >
                <div className="flex items-center space-x-4">
                  <Lock className="text-cyan-400 w-5 h-5" />
                  <span className="text-cyan-400 font-bold text-lg w-8">{problem.id < 10 ? '0' : ''}{problem.id}</span>
                  <span className="bg-[linear-gradient(187.84deg,#218ACB_9.42%,#0CC5DA_69.83%,#11E3FB_130.23%)] font-medium text-lg blur-sm opacity-60 bg-clip-text text-transparent">
                    {problem.title}
                  </span>
                </div>
                <span className="text-[#218ACB] font-bold text-lg blur-sm">{problem.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemArena;
