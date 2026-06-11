"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "@/backend/firebase";
import { useAuth } from "@/contexts/authContext";
import { useAuthToken } from "@/hooks/useAuthToken";
import DekodeXIntroLoader from "@/Components/dekodeX_Loader/IntroLoader";

import Leaderboard from "./Leaderboard";
import Modal from "./Modal";
import ProblemArena from "./ProblemArena";

const INTRO_LOADER_HIDE_KEY = "dekodex_intro_hide";
const CERTIFICATE_APPLICATIONS_ENABLED = false;

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
  const { token: authToken } = useAuthToken();

  const [hasCert, setHasCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIntro, setShowIntro] = useState(null);

  useEffect(() => {
    const hideIntro = localStorage.getItem(INTRO_LOADER_HIDE_KEY) === "true";
    if (hideIntro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowIntro(false);
      return;
    }
    setShowIntro(true);
  }, []);

  useEffect(() => {
    async function checkStatusAndModal() {
      if (
        !CERTIFICATE_APPLICATIONS_ENABLED ||
        !loggedIn ||
        !user?.email ||
        !authToken
      ) {
        return;
      }

      const exists = await checkCertificate(user.email, authToken);
      setHasCert(exists);

      const modalShowed = localStorage.getItem("modalShowed");
      if (modalShowed !== "true" && !exists) {
        setShowModal(true);
        localStorage.setItem("modalShowed", "true");
      }
    }

    checkStatusAndModal();
  }, [authToken, loggedIn, user?.email]);

  if (showIntro === null) {
    return <div className="min-h-screen bg-[#01011b]" />;
  }

  const handleAuthAction = async () => {
    if (loggedIn) {
      try {
        await signOut(auth);
        toast.success("Signed out successfully!");
      } catch (error) {
        toast.error(`Error signing out: ${error.message}`);
      }
      return;
    }

    router.push("/auth");
  };

  return (
    <>
      {showIntro === true ? <DekodeXIntroLoader onComplete={() => setShowIntro(false)} /> : null}

      <div className="min-h-screen bg-[#01011b] px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 xl:grid xl:grid-cols-[minmax(0,1fr)_440px] xl:items-stretch">
          <div className="min-w-0">
            <ProblemArena />
          </div>
          <aside className="hidden min-w-0 xl:block xl:h-full">
            <Leaderboard />
          </aside>
        </div>

        {loggedIn && CERTIFICATE_APPLICATIONS_ENABLED ? (
          <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Certificate Application</h1>

            {hasCert === false ? (
              <button
                className="cursor-pointer rounded border border-cyan-400 bg-neutral-800 px-4 py-2 text-white shadow-md transition-colors hover:border-cyan-300 hover:bg-cyan-600 hover:shadow-cyan-500/30"
                onClick={() => setShowModal(true)}
              >
                Apply for Certificate
              </button>
            ) : null}

            {hasCert === true ? (
              <p className="text-green-700">You have already applied for a certificate.</p>
            ) : null}

            {hasCert === null ? <p>Checking your certificate status...</p> : null}

            {showModal ? (
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
                        throw new Error(`Failed to apply for certificate: ${res.status}`);
                      }

                      setShowModal(false);
                      setHasCert(true);
                      toast.success("Certificate application submitted!");
                    } catch (err) {
                      console.error("Error submitting certificate:", err);
                      toast.error(
                        err.message || "Something went wrong. Please try again later."
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
            ) : null}
          </div>
        ) : null}

        <button
          id="floatingAuthBtn"
          onClick={handleAuthAction}
          className={`group fixed right-5 bottom-5 z-50 flex cursor-pointer items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#01011b] shadow-lg shadow-cyan-950/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 md:right-8 md:bottom-8 ${
            loggedIn ? "hidden" : ""
          }`}
          aria-label={loggedIn ? "Sign Out" : "Login"}
        >
          {loggedIn ? <LogOut /> : <LogIn />}
          <div className="pl-2">Login</div>
        </button>
      </div>
    </>
  );
}
