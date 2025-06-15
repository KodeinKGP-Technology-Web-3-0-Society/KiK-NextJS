"use client";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "@/backend/firebase";
import { getDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Script from "next/script";
import AuthLoader from "../utils/AuthLoader";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const captchaRenderedRef = useRef(false);
  const captchaContainerRef = useRef(null);

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

    const token = document.querySelector('input[name="cf-turnstile-response"]')?.value;

    if (!token) {
      toast.error("Please complete the CAPTCHA.");
      setLoader(false);
      return;
    }

    const res = await fetch("/dekodeX/api/verifyTurnstile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!data.success) {
      toast.error("CAPTCHA verification failed.");
      setLoader(false);
      return;
    }

    let identifierEmail = identifier;

    if (!identifier.includes("@")) {
      try {
        const usernameDoc = await getDoc(doc(db, "usernames", identifier));
        if (!usernameDoc.exists()) {
          toast.error("Username not found");
          setLoader(false);
          return;
        }
        identifierEmail = usernameDoc.data().email;
      } catch (err) {
        toast.error("Failed to fetch username");
        setLoader(false);
        return;
      }
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifierEmail, password);
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

        <div ref={captchaContainerRef} className="w-full flex justify-center" />

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default SignIn;
