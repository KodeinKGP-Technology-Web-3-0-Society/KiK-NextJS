import React from "react";
import { Lock } from "lucide-react";
import problemsData from "./Question";

const ProblemArena = () => {
  const openProblems = problemsData.filter((p) => p.is_revealed);
  const lockedProblems = problemsData.filter((p) => !p.is_revealed);

  return (
    <div className="mx-auto max-w-4xl rounded-lg border-2 border-cyan-400 bg-gray-800 p-6 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-4 text-3xl font-bold text-cyan-400">Problem Arena</h1>
        <div className="mb-6 h-px bg-cyan-400"></div>

        <div className="mb-4 space-y-2 text-gray-300">
          <p>
            One new problem drops every day — solve it anytime during the event.
          </p>
          <p>
            Submit your answer right on the problem page. You'll see sample I/O,
            a submission box, and your past attempts in the Submissions tab.
          </p>
        </div>

        <div className="mb-4 space-y-1 text-gray-300">
          <div className="flex items-start">
            <span className="mr-2 text-cyan-400">•</span>
            <span>
              Points are awarded based on correctness and speed — faster,
              accurate submissions earn more.
            </span>
          </div>
          <div className="flex items-start">
            <span className="mr-2 text-cyan-400">•</span>
            <span>
              The Leaderboard updates live, showing your rank and top
              performers.
            </span>
          </div>
        </div>

        <div className="mb-2 text-gray-300">
          <span className="font-semibold">
            This is a solo competition — no collaboration or code sharing.
          </span>
        </div>
        <div className="font-semibold text-cyan-400">
          Stay sharp, code fast, and climb the ranks!
        </div>

        <div className="mt-6 h-px bg-cyan-400"></div>
      </div>

      {/* Open Problems Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-cyan-400">Open</h2>
        <div className="space-y-2">
          {openProblems.map((problem) => (
            <div
              key={problem.id}
              className="group flex cursor-pointer items-center justify-between rounded bg-gray-700 p-4 transition-colors duration-200 hover:bg-gray-600"
            >
              <div className="flex items-center space-x-4">
                <span className="w-8 text-lg font-bold text-cyan-400">
                  {problem.id}
                </span>
                <span className="text-lg font-medium text-white transition-colors group-hover:text-cyan-400">
                  {problem.title}
                </span>
              </div>
              <span className="text-lg font-bold text-cyan-400">
                {problem.points}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Yet to Reveal Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-cyan-400">Yet to Reveal</h2>
        <div className="space-y-2">
          {lockedProblems.map((problem) => (
            <div
              key={problem.id}
              className="flex items-center justify-between rounded bg-gray-700 p-4 opacity-60"
            >
              <div className="flex items-center space-x-4">
                <Lock className="h-5 w-5 text-cyan-400" />
                <span className="w-8 text-lg font-bold text-cyan-400">
                  {problem.id}
                </span>
                <span className="text-lg font-medium text-gray-400 blur-sm">
                  {problem.title}
                </span>
              </div>
              <span className="text-lg font-bold text-cyan-400 blur-sm">
                {problem.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemArena;
