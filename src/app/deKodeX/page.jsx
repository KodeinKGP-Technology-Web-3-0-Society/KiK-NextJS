"use client";

import React from "react";
import Leaderboard from "./Leaderboard";
import ProblemArena from "./ProblemArena";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(1,1,27)]">
      <div className="flex w-full flex-1">
        <div className="bg-700 w-full p-6 text-white md:w-[70%]">
          <ProblemArena />
        </div>

        <div className="bg-400 hidden w-[30%] p-6 text-white md:block">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
