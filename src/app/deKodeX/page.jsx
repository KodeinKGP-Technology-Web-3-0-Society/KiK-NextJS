"use client";

import React from "react";
import Leaderboard from "./Leaderboard";
import ProblemArena from "./ProblemArena";
import Link from "next/link";
import { NotepadText } from "lucide-react";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-[rgb(1,1,27)] p-4 sm:p-6">
            <div className="flex flex-1 flex-col md:flex-row w-full gap-6">
                <div className="w-full xl:w-[70%] bg-700 p-6 text-white rounded-lg shadow-lg">
                    <ProblemArena/>
                </div>

                <div className="hidden xl:block w-[30%] bg-400 p-6 text-white rounded-lg shadow-lg">
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
}
