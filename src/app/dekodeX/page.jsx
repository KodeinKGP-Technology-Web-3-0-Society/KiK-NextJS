"use client";
import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import ProblemArena from "./ProblemArena";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/backend/firebase";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useAuthToken } from "@/hooks/useAuthToken";
import DekodeXIntroLoader from "@/Components/dekodeX_Loader/IntroLoader";

const INTRO_LOADER_HIDE_KEY = "dekodex_intro_hide";

async function checkCertificate(email, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/certificate/check?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.exists === true;
  } catch (err) {
    console.error("Error checking certificate:", err);
    return false;
  }
}

export default function Layout() {
  const { user, loggedIn } = useAuth();
  const router = useRouter();
  const [hasCert, setHasCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token: authToken } = useAuthToken();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hideIntro = localStorage.getItem(INTRO_LOADER_HIDE_KEY) === "true";
    if (hideIntro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowIntro(false);
    }
  }, []);

  useEffect(() => {
    async function checkStatusAndModal() {
      if (loggedIn && user?.email && authToken) {
        setLoading(true);
        const exists = await checkCertificate(user.email, authToken);
        setHasCert(exists);
        setLoading(false);

        const modalShowed = localStorage.getItem("modalShowed");
        if (modalShowed !== "true" && !exists) {
          setShowModal(true);
          localStorage.setItem("modalShowed", "true");
        }
      }
    }
    checkStatusAndModal();
  }, [loggedIn, user?.email, authToken]);

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
    <>
      {showIntro && (
        <DekodeXIntroLoader onComplete={() => setShowIntro(false)} />
      )}
      <div className="flex min-h-screen flex-col bg-[rgb(1,1,27)] p-4 transition-opacity duration-700 sm:p-6">
        <div className="flex w-full flex-1 flex-col gap-2 md:flex-row">
          <div className="bg-700 w-full rounded-lg p-6 text-white shadow-lg xl:w-[75%]">
            <ProblemArena />
          </div>
          <div className="bg-400 hidden rounded-lg p-6 text-white shadow-lg xl:block xl:w-[33%]">
            <Leaderboard />
          </div>
        </div>
        {loggedIn ? (
          <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Certificate Application</h1>
            {hasCert === false && (
              <button
                className="cursor-pointer rounded border border-cyan-400 bg-neutral-800 px-4 py-2 text-white shadow-md transition-colors hover:border-cyan-300 hover:bg-cyan-600 hover:shadow-cyan-500/30"
                onClick={() => setShowModal(true)}
              >
                Apply for Certificate
              </button>
            )}

            {hasCert === true && (
              <p className="text-green-700">
                You have already applied for a certificate.
              </p>
            )}

            {hasCert === null && <p>Checking your certificate status...</p>}

            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <h2 className="mb-4 text-xl font-semibold">Enter Your Name</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    try {
                      const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/certificate/apply`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            email: user.email,
                            name: name || null,
                          }),
                        }
                      );

                      if (!res.ok) {
                        throw new Error(
                          `Failed to apply for certificate: ${res.status}`
                        );
                      }

                      setShowModal(false);
                      setHasCert(true);
                      toast.success("Certificate application submitted!");
                    } catch (err) {
                      console.error("Error submitting certificate:", err);
                      toast.error(
                        err.message ||
                          "Something went wrong. Please try again later."
                      );
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <label className="mb-2 block">
                    Name:
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full border-0 border-b-1 border-gray-300 bg-transparent px-2 py-1 transition-colors focus:border-blue-500 focus:outline-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </label>
                  <button
                    type="submit"
                    className={`mt-4 w-full rounded-lg px-4 py-2 transition ${
                      isSubmitting
                        ? "cursor-not-allowed bg-gray-400 text-gray-700"
                        : "cursor-pointer border border-cyan-400 px-8 py-2 font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all hover:border-cyan-200 hover:bg-blue-950 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    }`}
                  >
                    Submit Application
                  </button>
                </form>
              </Modal>
            )}
          </div>
        ) : (
          <></>
        )}

        <button
          id="floatingAuthBtn"
          onClick={handleAuthAction}
          className={`group pulse-glow fixed right-6 bottom-6 z-50 flex transform cursor-pointer items-center justify-center rounded-lg px-2 py-1.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-xl md:right-8 md:bottom-8 ${loggedIn ? "hidden" : "bg-gradient-to-r from-red-500 to-red-600"}`}
          aria-label={loggedIn ? "Sign Out" : "Login"}
        >
          {loggedIn ? <LogOut /> : <LogIn />}
          <div className="pl-2">Login</div>
        </button>
      </div>
    </>
  );
}
