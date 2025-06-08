"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/backend/firebase";
import Message from "@/Components/utils/message";
import SignIn from "@/Components/Auth/signIn";
import SignUp from "@/Components/Auth/signUp";

const Auth = () => {
  const [doSignUp, setDoSignUp] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgType, setMsgType] = useState("info");
  const [msg, setMsg] = useState("");

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
      setMsg("Email verified. Redirecting...");
      setShowMsg(true);
      setMsgType("success");
      updateUserStatus();
      router.push("/");
    } else if (user && !user.emailVerified) {
      setMsg(
        "Please verify your email to continue. A verification link has been sent to your inbox. You may need to refresh after verifying."
      );
      setShowMsg(true);
      setMsgType("warning");
    }
    console.log("User :", user);
  }, [loggedIn, user, router]);

  return (
    <div className="min-h-screen bg-[#0b0f1a] px-4 sm:px-6 md:px-8">
      {showMsg && (
        <Message type={msgType} message={msg} setShowMsg={setShowMsg} />
      )}

      <div className="flex flex-wrap justify-center gap-4 pt-6 sm:pt-8">
        <button
          className={`w-full cursor-pointer rounded-full border-2 px-6 py-2 text-center text-sm font-medium transition-all duration-300 sm:w-auto ${
            doSignUp
              ? "border-cyan-400 bg-cyan-500 text-white shadow-[0_0_10px_#0ff]"
              : "border-cyan-400 bg-transparent text-cyan-300 hover:bg-cyan-700 hover:text-white"
          }`}
          onClick={() => toggleSignUp(true)}
        >
          Sign up
        </button>

        <button
          className={`w-full cursor-pointer rounded-full border-2 px-6 py-2 text-center text-sm font-medium transition-all duration-300 sm:w-auto ${
            !doSignUp
              ? "border-cyan-400 bg-cyan-500 text-white shadow-[0_0_10px_#0ff]"
              : "border-cyan-400 bg-transparent text-cyan-300 hover:bg-cyan-700 hover:text-white"
          }`}
          onClick={() => toggleSignUp(false)}
        >
          Sign in
        </button>
      </div>

      <div className="flex items-center justify-center py-10 font-sans text-white sm:py-16">
        <div className="w-full max-w-sm space-y-6 rounded-3xl bg-gradient-to-b from-[#1c2241] to-[#0a0f2c] px-6 py-10 text-center shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_#00ffff66] sm:max-w-md sm:px-8">
          <h2 className="text-2xl font-bold tracking-wide text-cyan-300 sm:text-3xl">
            {doSignUp ? "Sign Up " : "Sign In "}
          </h2>

          {doSignUp ? (
            <>
              <SignUp
                setMsg={setMsg}
                setShowMsg={setShowMsg}
                setMsgType={setMsgType}
              />
              <span className="block text-sm text-gray-300">
                Already Registered?
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
              <SignIn
                setMsg={setMsg}
                setShowMsg={setShowMsg}
                setMsgType={setMsgType}
              />
              <span className="block text-sm text-gray-300">
                Don't have an account?
                <a
                  onClick={() => toggleSignUp(true)}
                  className="ml-1 cursor-pointer font-medium text-cyan-400 transition-all hover:underline"
                >
                  Create from here!
                </a>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
