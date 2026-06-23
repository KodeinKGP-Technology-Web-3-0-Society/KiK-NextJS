"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/backend/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Script from "next/script";
import { useRouter } from "next/navigation";

const getSuggestedUsername = (name, email) => {
  const source = name || email?.split("@")[0] || "";
  return source
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 16);
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [googleUsername, setGoogleUsername] = useState("");
  const [pendingGoogleUser, setPendingGoogleUser] = useState(null);

  const router = useRouter();
  const isLoading = Boolean(loadingAction);

  function checkMail(value) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  }

  const getVerificationSettings = () => ({
    url:
      typeof window !== "undefined"
        ? `${window.location.origin}/auth`
        : undefined,
    handleCodeInApp: false,
  });

  useEffect(() => {
    const renderTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile && !captchaLoaded) {
        const existing = document.querySelector(".cf-turnstile > div");
        if (!existing) {
          window.turnstile.render(".cf-turnstile", {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          });
          setCaptchaLoaded(true);
        }
      }
    };

    if (typeof window !== "undefined") {
      if (window.turnstile) {
        renderTurnstile();
      } else {
        window.onload = renderTurnstile;
      }
    }
  }, [captchaLoaded]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingAction("register");

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername) {
      toast.error("Username cannot be empty or contain only spaces.");
      setLoadingAction(null);
      return;
    }

    if (!trimmedEmail) {
      toast.error("Email cannot be empty or contain only spaces.");
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
      setLoadingAction(null);
      return;
    }

    if (password !== cnfPassword) {
      toast.error("Passwords do not match.");
      setLoadingAction(null);
      return;
    }

    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      toast.error("Username must be between 3 and 20 characters.");
      setLoadingAction(null);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoadingAction(null);
      return;
    }

    if (!checkMail(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      setLoadingAction(null);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );
      const user = userCred.user;
      const uid = user.uid;
      const initSubmissions = Array(10).fill(0);

      try {
        await runTransaction(db, async (transaction) => {
          const usernameDoc = await transaction.get(
            doc(db, "usernames", trimmedUsername)
          );

          if (usernameDoc.exists()) {
            throw new Error("USERNAME_TAKEN");
          }

          transaction.set(doc(db, "usernames", trimmedUsername), {
            uid,
            email: trimmedEmail,
          });
          transaction.set(doc(db, "users", uid), {
            uid,
            username: trimmedUsername,
            email: trimmedEmail,
            submissions: initSubmissions,
            emailVerified: user.emailVerified,
          });
        });

        try {
          await sendEmailVerification(user, getVerificationSettings());
          setRegisteredEmail(trimmedEmail);
        } catch (emailError) {
          console.error("Email verification error:", emailError);
          setRegisteredEmail(trimmedEmail);
          toast.warn(
            `Account created, but verification email failed: ${
              emailError.code || emailError.message
            }`
          );
        }

        // toast.success(
        //   "Registration successful! Please check your email to verify your account. If you don't see it, check your spam folder."
        // );
        setUsername("");
        setEmail("");
        setPassword("");
        setCnfPassword("");
      } catch (transactionError) {
        if (transactionError.message === "USERNAME_TAKEN") {
          await user.delete();
          toast.error(
            "Username already taken. Please choose a different username."
          );
        } else {
          await user.delete();
          toast.error(
            "Registration failed due to a database error. Please try again."
          );
        }
        setLoadingAction(null);
        return;
      }
    } catch (err) {
      console.error("Registration error:", err);
      let errorMessage = "Registration failed. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already in use. Please sign in or use a different email.";
      } else if (err.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/operation-not-allowed") {
        errorMessage = "Email/password accounts are not enabled in Firebase.";
      } else if (err.code === "permission-denied") {
        errorMessage = "Permission denied. Check your Firestore rules.";
      }

      toast.error(`Registration error: ${errorMessage}`);
    }

    setLoadingAction(null);
  };

  const handleGoogleSignup = async () => {
    setLoadingAction("google");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const userDoc = await getDoc(doc(db, "users", googleUser.uid));

      if (userDoc.exists()) {
        toast.success("Signed in successfully!");
        router.push("/dekodeX");
        return;
      }

      setPendingGoogleUser(googleUser);
      setGoogleUsername(
        getSuggestedUsername(googleUser.displayName, googleUser.email)
      );
    } catch (err) {
      console.error("Google signup error:", err);
      let errorMessage = "Google sign-up failed. Please try again.";

      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Google sign-up was cancelled.";
      } else if (err.code === "auth/account-exists-with-different-credential") {
        errorMessage =
          "An account already exists with this email. Please sign in with email/password.";
      }

      toast.error(errorMessage);
    } finally {
      setLoadingAction(null);
    }
  };

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

      await runTransaction(db, async (transaction) => {
        const usernameRef = doc(db, "usernames", trimmedUsername);
        const userRef = doc(db, "users", pendingGoogleUser.uid);
        const usernameDoc = await transaction.get(usernameRef);
        const userDoc = await transaction.get(userRef);

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
      });

      toast.success("Account created with Google!");
      router.push("/dekodeX");
    } catch (err) {
      console.error("Google username error:", err);
      if (err.message === "USERNAME_TAKEN") {
        toast.error("Username already taken. Please choose another one.");
      } else {
        toast.error("Could not save username. Please try again.");
      }
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
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="beforeInteractive"
      />
      {registeredEmail && (
        <div className="mb-4 rounded-lg border border-cyan-400/25 bg-cyan-400/10 p-3 text-sm text-slate-200">
          Verification mail sent to {registeredEmail}. Check inbox and spam.
        </div>
      )}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="w-full rounded-lg bg-[#10162f] p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-[#10162f] p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <div className="relative w-full">
          <input
            className="w-full rounded-lg bg-[#10162f] p-3 pr-10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="relative w-full">
          <input
            className="w-full rounded-lg bg-[#10162f] p-3 pr-10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
            value={cnfPassword}
            onChange={(e) => setCnfPassword(e.target.value)}
            type={showCnfPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={() => setShowCnfPassword(!showCnfPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
          >
            {showCnfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="cf-turnstile flex items-center justify-center" />

        <button
          className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isLoading}
        >
          {loadingAction === "register" ? "Registering..." : "Register"}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full cursor-pointer rounded-lg border border-white/15 bg-white/5 py-2 font-semibold text-white transition duration-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadingAction === "google" ? "Continuing..." : "Sign up with Google"}
        </button>
      </form>
    </>
  );
};

export default SignUp;
