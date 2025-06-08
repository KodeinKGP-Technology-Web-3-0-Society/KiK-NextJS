import React from "react";
import leaderboard from "./leaderboard.json";

export default function Leaderboard() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-800 backdrop-blur-[100px]">
      <div className="flex w-full flex-col items-center justify-center p-3">
        <h2
          className="mb-4 text-[2rem] font-bold"
          style={{
            background:
              "linear-gradient(92.46deg, #218ACB 0%, #11E3FB 33.33%, #218ACB 66.67%, #11E3FB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Leaderboard
        </h2>
        <div className="flex items-end justify-center rounded-xl p-4">
          {/* Second Place */}
          <div className="flex h-[160px] w-[100px] flex-col items-center justify-end rounded-tl-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md">
            <div className="relative mb-2 h-16 w-16">
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${leaderboard[1].name}`}
                alt={leaderboard[1].name}
                className="h-full w-full rounded-full border-4 border-gray-200"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-white px-2 py-[2px] text-xs font-bold text-black">
                2.
              </div>
            </div>
            <p className="text-sm font-semibold text-white">
              {leaderboard[1].name.split(" ")[0]}
            </p>
            <p className="text-sm font-bold text-white">
              {leaderboard[1].score}
            </p>
          </div>

          {/* First Place */}
          <div className="flex h-[200px] w-[120px] flex-col items-center justify-end rounded-tl-xl rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-lg">
            <div className="relative mb-2 h-20 w-20">
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${leaderboard[0].name}`}
                alt={leaderboard[0].name}
                className="h-full w-full rounded-full border-4 border-yellow-400"
              />
              <img
                src="/dekodeX/crown.png"
                alt="Crown"
                className="absolute -top-7 left-1/2 w-10 -translate-x-1/2 transform"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border border-black bg-yellow-400 px-2 py-[2px] text-xs font-bold text-black">
                1.
              </div>
            </div>
            <p className="font-bold text-yellow-400">
              {leaderboard[0].name.split(" ")[0]}
            </p>
            <p className="font-extrabold text-yellow-400">
              {leaderboard[0].score}
            </p>
          </div>

          {/* Third Place */}
          <div className="flex h-[140px] w-[100px] flex-col items-center justify-end rounded-tr-xl bg-gradient-to-b from-[rgba(17,227,251,0.9)] to-[rgba(255,255,255,0.2)] py-4 shadow-md">
            <div className="relative mb-2 h-16 w-16">
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${leaderboard[2].name}`}
                alt={leaderboard[1].name}
                className="h-full w-full rounded-full border-4 border-[#B87333]"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full border bg-orange-400 px-2 py-[2px] text-xs font-bold text-black">
                3.
              </div>
            </div>
            <p className="text-sm font-semibold text-orange-400">
              {leaderboard[2].name.split(" ")[0]}
            </p>
            <p className="text-sm font-bold text-orange-400">
              {leaderboard[2].score}
            </p>
          </div>
        </div>
      </div>
      <ul className="space-y-1">
        {leaderboard.slice(3, 15).map((user) => (
          <li
            key={user.rank}
            className="hover:text-#01011B group ml-2 flex items-center space-x-4 bg-gradient-to-r from-[rgba(17,227,251,0.3)] to-[rgba(255,255,255,0.06)] px-4 transition-colors duration-300 hover:bg-[#0CC5DA] hover:bg-clip-border"
          >
            <span className="w-6 text-right text-lg font-bold group-hover:text-black">
              {user.rank}.
            </span>
            <img
              src={`https://robohash.org/${encodeURIComponent(user.name)}?set=set4`}
              alt={user.name}
              className="my-1 h-8 w-8 rounded-full border-2 border-white object-cover"
            />
            <span className="flex-1 bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-transparent group-hover:text-black">
              {user.name}
            </span>
            <span className="bg-gradient-to-b from-[#24E8FF] to-[#0CC5DA] bg-clip-text font-bold text-transparent group-hover:text-black">
              {user.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
