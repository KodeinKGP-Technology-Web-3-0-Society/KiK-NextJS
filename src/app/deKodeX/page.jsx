"use client";

import React from "react";
import Leaderboard from "./Leaderboard";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
        <div className="flex flex-1 w-full">
            <div className="w-full md:w-[70%] bg-blue-700 p-6 text-white">
                {children || <p>Questions</p>}
            </div>

            <div className="hidden md:block w-[30%] bg-blue-400 p-6 text-white">
                <Leaderboard />
            </div>
        </div>
        </div>
    );
}
