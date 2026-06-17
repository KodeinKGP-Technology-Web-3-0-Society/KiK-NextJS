"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/backend/firebase";
import SignIn from "@/Components/Auth/signIn";
import SignUp from "@/Components/Auth/signUp";
import Image from "next/image";
import RegImg from "../../../public/regImg.png";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Auth = () => {
  const [doSignUp, setDoSignUp] = useState(false);

  function toggleSignUp(value) {
    setDoSignUp(value);
  }

  const router = useRouter();
  const { loggedIn, user } = useAuth();

  useEffect(() => {
    async function updateUserStatus() {
      const uid = user.uid;
      const userDocRef = doc(db, "users", uid);
      try {
        await updateDoc(userDocRef, {
          emailVerified: true,
        });
      } catch (error) {
        console.error("Error updating emailVerified status:", error);
      }
    }

    if (user && user.emailVerified && user.hasProfile) {
      toast.success("Email verified. Redirecting...");
      updateUserStatus();
      router.push("/dekodeX");
    } else if (user && !user.emailVerified) {
      toast.warn(
        "Check your inbox and Spam for a verification link. Once verified, refresh this page to continue."
      ,{toastId: "verification"}
      );
    }
  }, [loggedIn, user, router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[rgb(1,1,27)] px-4 sm:px-6 md:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      {/* Modern Tab Navigation */}
      <div className="flex justify-center pt-8 sm:pt-4">
        <div className="relative flex rounded-xl border border-white/15 bg-[#0c1230] p-1">
          <div
            className={`absolute top-1 h-[calc(100%-8px)] rounded-lg bg-cyan-500 transition-all duration-500 ease-out ${
              doSignUp
                ? "w-[calc(50%-3px)] translate-x-0"
                : "w-[calc(50%-3px)] translate-x-full"
            }`}
          />

          <button
            className={`relative z-10 min-w-[120px] rounded-xl px-8 py-3 text-sm font-semibold transition-all duration-300 ${
              doSignUp ? "text-white" : "text-slate-300 hover:text-white"
            }`}
            onClick={() => toggleSignUp(true)}
          >
            Sign up
          </button>

          <button
            className={`relative z-10 min-w-[120px] rounded-xl px-8 py-3 text-sm font-semibold transition-all duration-300 ${
              !doSignUp ? "text-white" : "text-slate-300 hover:text-white"
            }`}
            onClick={() => toggleSignUp(false)}
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center gap-14 py-12 font-sans text-white sm:py-20">
        {/* Image Section */}
        <div className="relative hidden lg:block">
          <Image
            src={RegImg}
            alt="Registration Image"
            width={400}
            height={400}
            className="relative rounded-xl shadow-xl"
          />
        </div>

        {/* Form Section */}
        <div className="relative w-full max-w-md">
          <div className="relative rounded-2xl border border-white/15 bg-[#0b1230]/80 p-8 shadow-xl sm:p-10">
            {/* Floating Header */}
            <div className="mb-8 text-center">
              {/* <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/15">
                <svg
                  className="h-7 w-7 text-cyan-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div> */}
              <h2 className="text-3xl font-bold text-white">
                {doSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {doSignUp
                  ? "Join us today and get started"
                  : "Sign in to continue your journey"}
              </p>
            </div>

            {/* Form Content - SignIn/SignUp Components */}
            {doSignUp ? (
              <>
                <SignUp />
                <span className="block pt-4 text-center text-sm text-slate-400">
                  Already Registered for dekodeX?
                  <a
                    onClick={() => toggleSignUp(false)}
                    className="ml-1 cursor-pointer font-medium text-cyan-300 transition-all hover:underline"
                  >
                    Sign In from here!
                  </a>
                </span>
              </>
            ) : (
              <>
                <SignIn />
                <span className="block pt-4 text-center text-sm text-slate-400">
                  Not yet Registered for dekodeX?
                  <a
                    onClick={() => toggleSignUp(true)}
                    className="ml-1 cursor-pointer font-medium text-cyan-300 transition-all hover:underline"
                  >
                    Register here!
                  </a>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
