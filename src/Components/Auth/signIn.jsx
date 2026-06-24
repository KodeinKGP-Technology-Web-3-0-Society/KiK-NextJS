"use client";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/backend/firebase";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Script from "next/script";

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
  const [loadingAction, setLoadingAction] = useState(null);
  const router = useRouter();

  const captchaRenderedRef = useRef(false);
  const captchaContainerRef = useRef(null);
  const oneTapInitializedRef = useRef(false);

  const isLoading = Boolean(loadingAction);

  const verifyCaptcha = async (token) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/verifyTurnstile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    const data = await res.json();
    return data.success === true;
  };

  const resolveIdentifierToEmail = async (rawIdentifier, token) => {
    const trimmedIdentifier = rawIdentifier.trim();

    if (!trimmedIdentifier) return null;
    if (trimmedIdentifier.includes("@")) {
      const captchaOk = await verifyCaptcha(token);
      return captchaOk ? trimmedIdentifier : null;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dekodeX/api/resolveUsername`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: trimmedIdentifier, token }),
          cache: "no-store",
        }
      );

      if (!res.ok) return null;

      const data = await res.json();
      return data.email || null;
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

  const completeGoogleAuth = async (googleUser) => {
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
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingAction("login");

    const trimmedIdentifier = identifier.trim();

    if (!trimmedIdentifier) {
      toast.error("Username/Email cannot be empty or contain only spaces.");
      setLoadingAction(null);
      return;
    }

    const token = document.querySelector(
      'input[name="cf-turnstile-response"]'
    )?.value;

    if (!token) {
      toast.error("Please complete the CAPTCHA.");
      setLoadingAction(null);
      return;
    }

    const identifierEmail = await resolveIdentifierToEmail(
      trimmedIdentifier,
      token
    );
    if (!identifierEmail) {
      toast.error("Invalid email/username or password.");
      setLoadingAction(null);
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
        setLoadingAction(null);
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

    setLoadingAction(null);
  };

  const handleGoogleLogin = async () => {
    setLoadingAction("google");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await completeGoogleAuth(result.user);
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
      setLoadingAction(null);
    }
  };

  const handleGoogleCredentialResponse = async (response) => {
    if (!response?.credential || pendingGoogleUser) return;

    setLoadingAction("google");

    try {
      const credential = GoogleAuthProvider.credential(response.credential);
      const result = await signInWithCredential(auth, credential);
      await completeGoogleAuth(result.user);
    } catch (err) {
      console.error("Google one-tap error:", err);
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || pendingGoogleUser) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    let intervalId;
    let timeoutId;

    const initOneTap = () => {
      if (!window.google?.accounts?.id || oneTapInitializedRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: true,
        cancel_on_tap_outside: false,
        use_fedcm_for_prompt: true,
        context: "signin",
      });

      window.google.accounts.id.prompt();
      oneTapInitializedRef.current = true;
    };

    initOneTap();

    if (!oneTapInitializedRef.current) {
      intervalId = window.setInterval(() => {
        initOneTap();

        if (oneTapInitializedRef.current) {
          window.clearInterval(intervalId);
        }
      }, 300);

      timeoutId = window.setTimeout(() => {
        window.clearInterval(intervalId);
      }, 5000);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
      oneTapInitializedRef.current = false;
    };
  }, [pendingGoogleUser]);

  const handleGoogleUsernameSubmit = async (e) => {
    e.preventDefault();

    if (!pendingGoogleUser) return;

    const trimmedUsername = googleUsername.trim().toLowerCase();

    if (!/^[a-z0-9_]+$/.test(trimmedUsername)) {
      toast.error(
        "Username can only contain lowercase letters, numbers, and underscores."
      );
      return;
    }

    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      toast.error("Username must be between 3 and 20 characters.");
      return;
    }

    setLoadingAction("googleUsername");

    try {
      const initSubmissions = Array(10).fill(0);
      const userRef = doc(db, "users", pendingGoogleUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        router.push("/dekodeX");
        return;
      }

      const batch = writeBatch(db);
      batch.set(doc(db, "usernames", trimmedUsername), {
        uid: pendingGoogleUser.uid,
        email: pendingGoogleUser.email,
      });
      batch.set(userRef, {
        uid: pendingGoogleUser.uid,
        username: trimmedUsername,
        email: pendingGoogleUser.email,
        submissions: initSubmissions,
        emailVerified: pendingGoogleUser.emailVerified,
        provider: "google",
        photoURL: pendingGoogleUser.photoURL || "",
        displayName: pendingGoogleUser.displayName || "",
      });

      await batch.commit();

      toast.success("Username saved!");
      router.push("/dekodeX");
    } catch (err) {
      console.error("Google username error:", err);
      toast.error(
        "Username already taken or unavailable. Please choose another one."
      );
    } finally {
      setLoadingAction(null);
    }
  };

  if (pendingGoogleUser) {
    return (
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
          disabled={loadingAction === "googleUsername"}
          className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadingAction === "googleUsername" ? "Saving..." : "Continue"}
        </button>
      </form>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        strategy="afterInteractive"
      />
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

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
          disabled={isLoading}
          className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadingAction === "login" ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full cursor-pointer rounded-lg border border-white/15 bg-white/5 py-2 font-semibold text-white transition duration-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadingAction === "google"
            ? "Continuing..."
            : "Continue with Google"}
        </button>
      </form>
    </>
  );
};

export default SignIn;
