"use client";

import React from "react";
import Leaderboard from "./Leaderboard";
import ProblemArena from "./ProblemArena";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-[rgb(1,1,27)]">
        <div className="flex flex-1 w-full">
            <div className="w-full md:w-[70%] bg-700 p-6 text-white">
                <ProblemArena/>
            </div>

            <div className="hidden md:block w-[30%] bg-400 p-6 text-white">
                <Leaderboard />
            </div>
        </div>
        </div>
    );
}
