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
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-in-out z-50 flex items-center justify-center group pulse-glow py-1.5 px-2 cursor-pointer ${loggedIn ? 'bg-gradient-to-r from-cyan-500 to-cyan-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
        aria-label={loggedIn ? "Sign Out" : "Login"}
      >
        {loggedIn ? <LogOut /> : <LogIn />}
        <div className="pl-2">
          {loggedIn ? "Sign Out" : "Login"}
        </div>
      </button>
    </div>
  );
}