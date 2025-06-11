"use client";
import React from "react";
import Leaderboard from "./Leaderboard";
import ProblemArena from "./ProblemArena";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/backend/firebase";
import { toast } from "react-toastify";

export default function Layout() {
  const { loggedIn } = useAuth();
  const router = useRouter();

  const handleAuthAction = async () => {
    if (loggedIn) {
      // Sign out user
      try {
        await signOut(auth);
        toast.success("Signed out successfully!");
      } catch (error) {
        toast.error("Error signing out: " + error.message);
      }
    } else {
      // Redirect to login page
      router.push("/auth");
    }
  };

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
      <button
        id="floatingAuthBtn"
        onClick={handleAuthAction}
        className={`group pulse-glow fixed right-6 bottom-6 z-50 flex transform cursor-pointer items-center justify-center rounded-lg px-2 py-1.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-xl md:right-8 md:bottom-8 ${loggedIn ? "bg-gradient-to-r from-cyan-500 to-cyan-600" : "bg-gradient-to-r from-red-500 to-red-600"}`}
        aria-label={loggedIn ? "Sign Out" : "Login"}
      >
        {loggedIn ? <LogOut /> : <LogIn />}
        <div className="pl-2">{loggedIn ? "Sign Out" : "Login"}</div>
      </button>
    </div>
  );
}
