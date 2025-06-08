"use client";

import React from "react";
import Leaderboard from "./Leaderboard";
import ProblemArena from "./ProblemArena";
import Link from "next/link";
import { NotepadText } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(1,1,27)] p-4 sm:p-6">
      <div className="flex w-full flex-1 flex-col gap-6 md:flex-row">
        <div className="bg-700 w-full rounded-lg p-6 text-white shadow-lg xl:w-[70%]">
          <ProblemArena />
        </div>

        <div className="bg-400 hidden w-[30%] rounded-lg p-6 text-white shadow-lg xl:block">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
