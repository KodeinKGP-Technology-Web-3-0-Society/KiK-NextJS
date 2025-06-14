"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/backend/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const VerifyEmailLinkPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [needsEmail, setNeedsEmail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleMagicLinkSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let userEmail = window.localStorage.getItem('emailForSignIn');
        
        if (!userEmail) {
          // User opened the link on a different device
          setNeedsEmail(true);
          setIsLoading(false);
          return;
        }
        
        // Inside try block AFTER successful signInWithEmailLink:
try {
  const result = await signInWithEmailLink(auth, userEmail, window.location.href);
  const user = result.user;

  // 🔒 OPTIONAL: domain check (for KGP mail)
  if (!user.email.endsWith("@kgpian.iitkgp.ac.in")) {
    toast.error("Only KGP email addresses are allowed.");
    await auth.signOut();
    return;
  }

  // 🔐 Check if user is registered in your DB (e.g., 'users' collection)
  const q = query(collection(db, "users"), where("email", "==", user.email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    toast.error("Access denied. You are not registered.");
    await auth.signOut();
    return;
  }

  toast.success("Successfully signed in with magic link!");
  setTimeout(() => {
    router.push("/dekodeX");
  }, 1500);
} catch (error) {
  console.error("Error signing in with magic link:", error);
  toast.error("Failed to sign in. Please try again.");
  setTimeout(() => {
    router.push("/auth");
  }, 2000);
}
      }
        else {
        toast.error("Invalid sign-in link.");
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      }
      setIsLoading(false);
    };

    handleMagicLinkSignIn();
  }, [router]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      toast.success("Successfully signed in with magic link!");
      setTimeout(() => {
        router.push("/dekodeX");
      }, 1500);
    } catch (error) {
      console.error("Error signing in with magic link:", error);
      toast.error("Failed to sign in. Please check your email address.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[rgb(1,1,27)] px-4 sm:px-6 md:px-8">
      {/* Background decoration - matching your existing auth page */}
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

      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-full max-w-md">
          {/* Glassmorphism Background - matching your existing style */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 opacity-60 blur"></div>
          
          <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
            {isLoading ? (
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
                <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-2xl font-bold text-transparent mb-2">
                  Verifying Sign-in Link
                </h2>
                <p className="text-slate-400 text-sm">Please wait while we verify your magic link...</p>
              </div>
            ) : needsEmail ? (
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-2xl font-bold text-transparent mb-2">
                  Confirm Your Email
                </h2>
                <p className="text-slate-400 mb-6 text-sm">
                  Please enter the email address you used to request the sign-in link.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg bg-[#10162f] p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Verifying..." : "Verify & Sign In"}
                  </button>
                </form>
                <button
                  onClick={() => router.push("/auth")}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm underline transition duration-200"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-2xl font-bold text-transparent mb-2">
                  Something went wrong
                </h2>
                <p className="text-slate-400 mb-6 text-sm">
                  The sign-in link appears to be invalid or has expired.
                </p>
                <button
                  onClick={() => router.push("/auth")}
                  className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailLinkPage;