"use client";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "@/backend/firebase";
import { collection, getDoc, doc, runTransaction } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Script from "next/script";
import AuthLoader from "../utils/AuthLoader";

const getSuggestedUsername = (name, email) => {
  const source = name || email?.split("@")[0] || "";
  return source
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 16);
};

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [googleUsername, setGoogleUsername] = useState("");
  const [pendingGoogleUser, setPendingGoogleUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const captchaRenderedRef = useRef(false);
  const captchaContainerRef = useRef(null);

  const resolveIdentifierToEmail = async (rawIdentifier) => {
    const trimmedIdentifier = rawIdentifier.trim();

    if (!trimmedIdentifier) return null;
    if (trimmedIdentifier.includes("@")) return trimmedIdentifier;

    try {
      const usernameDoc = await getDoc(doc(db, "usernames", trimmedIdentifier));
      if (!usernameDoc.exists()) return null;
      return usernameDoc.data().email || null;
    } catch (error) {
      console.error("Error resolving username to email:", error);
      return null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const renderCaptcha = () => {
      if (captchaContainerRef.current) {
        captchaContainerRef.current.innerHTML = "";
      }

      if (window.turnstile) {
        window.turnstile.render(captchaContainerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          theme: "dark",
        });
        captchaRenderedRef.current = true;
      }
    };

    if (window.turnstile) {
      renderCaptcha();
    } else {
      window.onloadTurnstileCallback = renderCaptcha;
    }

    return () => {
      if (captchaContainerRef.current) {
        captchaContainerRef.current.innerHTML = "";
      }
      captchaRenderedRef.current = false;
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);

    // Trim whitespace from identifier
    const trimmedIdentifier = identifier.trim();

    // Validate trimmed input is not empty
    if (!trimmedIdentifier) {
      toast.error("Username/Email cannot be empty or contain only spaces.");
      setLoader(false);
      return;
    }

    const token = document.querySelector(
      'input[name="cf-turnstile-response"]'
    )?.value;

    if (!token) {
      toast.error("Please complete the CAPTCHA.");
      setLoader(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/verifyTurnstile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      toast.error("CAPTCHA verification failed.");
      setLoader(false);
      return;
    }

    const identifierEmail = await resolveIdentifierToEmail(trimmedIdentifier);
    if (!identifierEmail) {
      toast.error("Invalid email/username or password.");
      setLoader(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        identifierEmail,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        setLoader(false);
        return;
      }

      toast.success("Login successful!");
      router.push("/dekodeX");
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please check your credentials.";
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email/username or password.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address format.";
      }
      toast.error(`Login error: ${errorMessage}`);
    }

    setLoader(false);
  };

  const handleGoogleLogin = async () => {
    setLoader(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const userDoc = await getDoc(doc(db, "users", googleUser.uid));

      if (userDoc.exists()) {
        toast.success("Login successful!");
        router.push("/dekodeX");
        return;
      }

      setPendingGoogleUser(googleUser);
      setGoogleUsername(
        getSuggestedUsername(googleUser.displayName, googleUser.email)
      );
    } catch (err) {
      console.error("Google login error:", err);
      let errorMessage = "Google login failed. Please try again.";

      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Google login was cancelled.";
      } else if (err.code === "auth/account-exists-with-different-credential") {
        errorMessage =
          "An account already exists with this email. Please sign in with email/password.";
      }

      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  const handleGoogleUsernameSubmit = async (e) => {
    e.preventDefault();

    if (!pendingGoogleUser) return;

    const trimmedUsername = googleUsername.trim().toLowerCase();

    if (!/^[a-z0-9_]+$/.test(trimmedUsername)) {
      toast.error("Username can only contain lowercase letters, numbers, and underscores.");
      return;
    }

    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      toast.error("Username must be between 3 and 20 characters.");
      return;
    }

    setLoader(true);

    try {
      const initSubmissions = Array(10).fill(0);
      const leaderboardRef = doc(collection(db, "leaderboard"), "users");

      await runTransaction(db, async (transaction) => {
        const usernameRef = doc(db, "usernames", trimmedUsername);
        const userRef = doc(db, "users", pendingGoogleUser.uid);
        const usernameDoc = await transaction.get(usernameRef);
        const userDoc = await transaction.get(userRef);
        const leaderboardSnap = await transaction.get(leaderboardRef);

        if (usernameDoc.exists()) {
          throw new Error("USERNAME_TAKEN");
        }

        if (userDoc.exists()) {
          return;
        }

        transaction.set(usernameRef, {
          uid: pendingGoogleUser.uid,
          email: pendingGoogleUser.email,
        });

        transaction.set(userRef, {
          uid: pendingGoogleUser.uid,
          username: trimmedUsername,
          email: pendingGoogleUser.email,
          submissions: initSubmissions,
          emailVerified: pendingGoogleUser.emailVerified,
          provider: "google",
          photoURL: pendingGoogleUser.photoURL || "",
          displayName: pendingGoogleUser.displayName || "",
        });

        if (!leaderboardSnap.exists()) {
          transaction.set(leaderboardRef, {
            users: [
              {
                email: pendingGoogleUser.email,
                name: trimmedUsername,
                totalPts: 0,
              },
            ],
          });
          return;
        }

        const leaderboardData = leaderboardSnap.data();
        const usersArray = leaderboardData.users || [];
        const alreadyExists = usersArray.some(
          (user) => user.email === pendingGoogleUser.email
        );

        if (!alreadyExists) {
          usersArray.push({
            email: pendingGoogleUser.email,
            name: trimmedUsername,
            totalPts: 0,
          });
          transaction.update(leaderboardRef, { users: usersArray });
        }
      });

      toast.success("Username saved!");
      router.push("/dekodeX");
    } catch (err) {
      console.error("Google username error:", err);
      if (err.message === "USERNAME_TAKEN") {
        toast.error("Username already taken. Please choose another one.");
      } else {
        toast.error("Could not save username. Please try again.");
      }
    } finally {
      setLoader(false);
    }
  };

  if (pendingGoogleUser) {
    return (
      <>
        {loader && <AuthLoader />}
        <form
          onSubmit={handleGoogleUsernameSubmit}
          className="flex flex-col items-center justify-center space-y-5"
        >
          <input
            value={googleUsername}
            onChange={(e) => setGoogleUsername(e.target.value)}
            type="text"
            placeholder="Choose username"
            className="w-full rounded-lg bg-[#10162f] p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
          >
            Continue
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        strategy="afterInteractive"
      />

      {loader && <AuthLoader />}

      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center space-y-5"
      >
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          type="text"
          placeholder="Username or Email"
          className="w-full rounded-lg bg-[#10162f] p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <div className="relative w-full">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-lg bg-[#10162f] p-3 pr-10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div ref={captchaContainerRef} className="flex w-full justify-center" />

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full cursor-pointer rounded-lg border border-white/15 bg-white/5 py-2 font-semibold text-white transition duration-200 hover:bg-white/10"
        >
          Continue with Google
        </button>
      </form>
    </>
  );
};

export default SignIn;
