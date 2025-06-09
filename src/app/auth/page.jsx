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
        console.log("emailVerified status updated successfully!");
      } catch (error) {
        console.error("Error updating emailVerified status:", error);
      }
    }

    if (user && user.emailVerified) {
      toast.success("Email verified. Redirecting...");
      updateUserStatus();
      router.push("/");
    } else if (user && !user.emailVerified) {
      toast.warn(
        "Please verify your email to continue. A verification link has been sent to your inbox. You may need to refresh after verifying."
      );
    }
  }, [loggedIn, user, router]);

  return (
    <div className="min-h-screen bg-[rgb(1,1,27)] px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
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
        <div className="relative flex bg-white/5 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10">
          <div
            className={`absolute top-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl transition-all duration-500 ease-out ${doSignUp ? 'translate-x-0 w-[calc(50%-3px)]' : 'translate-x-full w-[calc(50%-3px)]'
              }`}
          />

          <button
            className={`relative z-10 px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-xl min-w-[120px] ${doSignUp
                ? "text-white"
                : "text-slate-300 hover:text-white"
              }`}
            onClick={() => toggleSignUp(true)}
          >
            Sign up
          </button>

          <button
            className={`relative z-10 px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-xl min-w-[120px] ${!doSignUp
                ? "text-white"
                : "text-slate-300 hover:text-white"
              }`}
            onClick={() => toggleSignUp(false)}
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center gap-20 py-12 font-sans text-white sm:py-20">
        {/* Image Section */}
        <div className="hidden lg:block relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
          <Image
            src={RegImg}
            alt="Registration Image"
            width={400}
            height={400}
            className="relative rounded-2xl shadow-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md relative hover:shadow-[0_0_25px_#00ffff66] rounded-4xl">
          {/* Glassmorphism Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur opacity-60"></div>

          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 sm:p-10 shadow-2xl">
            {/* Floating Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {doSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                {doSignUp ? "Join us today and get started" : "Sign in to continue your journey"}
              </p>
            </div>

            {/* Form Content - SignIn/SignUp Components */}
            {doSignUp ? (
              <>
                <SignUp />
                <span className="block text-sm text-slate-400 text-center pt-4">
                  Already Registered for dekodeX?
                  <a
                    onClick={() => toggleSignUp(false)}
                    className="ml-1 cursor-pointer font-medium text-cyan-400 transition-all hover:underline"
                  >
                    Sign In from here!
                  </a>
                </span>
              </>
            ) : (
              <>
                <SignIn />
                <span className="block text-sm text-slate-400 text-center pt-4">
                  Not yet Registered for dekodeX?
                  <a
                    onClick={() => toggleSignUp(true)}
                    className="ml-1 cursor-pointer font-medium text-cyan-400 transition-all hover:underline"
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