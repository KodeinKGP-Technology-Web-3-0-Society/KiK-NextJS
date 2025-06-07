import React from 'react';
import { Lock } from 'lucide-react';
import problemsData from './Question';
import { useRouter } from 'next/navigation';

const ProblemArena = () => {
  const openProblems = problemsData.filter(p => p.is_revealed);
  const lockedProblems = problemsData.filter(p => !p.is_revealed);
  const router = useRouter();

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg border-2 border-cyan-400 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4"style={{
              background:
                "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              width: 240,
            }}>Problem Arena</h1>
        <div className="h-px bg-cyan-400 mb-6"></div>

        <div className="text-gray-300 space-y-2 mb-4">
          <p>One new problem drops every day — solve it anytime during the event.</p>
          <p>Submit your answer right on the problem page. You'll see sample I/O, a submission box, and your past attempts in the Submissions tab.</p>
        </div>

        <div className="text-gray-300 space-y-1 mb-4">
          <div className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Points are awarded based on correctness and speed — faster, accurate submissions earn more.</span>
          </div>
          <div className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>The Leaderboard updates live, showing your rank and top performers.</span>
          </div>
        </div>

        <div className="text-gray-300 mb-2">
          <span className="font-semibold">This is a solo competition — no collaboration or code sharing.</span>
        </div>
        <div className="text-cyan-400 font-semibold">
          Stay sharp, code fast, and climb the ranks!
        </div>

        <div className="h-px bg-cyan-400 mt-6"></div>
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
              className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200 p-4 rounded cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-4" onClick={() => router.push(`/deKodeX/${problem.id}`)}>
                <span className="text-cyan-400 font-bold text-lg w-8">{problem.id}</span>
                <span className="text-white font-medium text-lg group-hover:text-cyan-400 transition-colors">
                  {problem.title}
                </span>
              </div>
              <span className="text-cyan-400 font-bold text-lg">{problem.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Yet to Reveal Section */}
      <div>
        <h2 className="text-2xl font-bold bg-[linear-gradient(to_right,_#218ACB_0%,_#11E3FB_33%,_#218ACB_66%,_#11E3FB_100%)] bg-clip-text text-transparent mb-4">Yet to Reveal</h2>
        <div className="space-y-2">
          {lockedProblems.map((problem) => (
            <div
              key={problem.id}
              className="bg-gray-700 p-4 rounded flex items-center justify-between opacity-60"
            >
              <div className="flex items-center space-x-4">
                <Lock className="text-cyan-400 w-5 h-5" />
                <span className="text-cyan-400 font-bold text-lg w-8">{problem.id}</span>
                <span className="text-gray-400 font-medium text-lg blur-sm">
                  {problem.title}
                </span>
              </div>
              <span className="text-cyan-400 font-bold text-lg blur-sm">{problem.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemArena;
