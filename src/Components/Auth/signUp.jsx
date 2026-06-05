"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/backend/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, doc, runTransaction } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Script from "next/script";
import AuthLoader from "../utils/AuthLoader";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [captchaLoaded, setCaptchaLoaded] = useState(false);

  function checkMail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
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
    setLoader(true);

    // Trim whitespace from inputs
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    // Validate trimmed inputs are not empty
    if (!trimmedUsername) {
      toast.error("Username cannot be empty or contain only spaces.");
      setLoader(false);
      return;
    }

    if (!trimmedEmail) {
      toast.error("Email cannot be empty or contain only spaces.");
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

    if (password !== cnfPassword) {
      toast.error("Passwords do not match.");
      setLoader(false);
      return;
    }

    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      toast.error("Username must be between 3 and 20 characters.");
      setLoader(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoader(false);
      return;
    }

    if (!checkMail(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      setLoader(false);
      return;
    }

    try {
      // First create the Firebase Auth account to check email uniqueness
      const userCred = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );
      const user = userCred.user;
      const uid = user.uid;
      const initSubmissions = Array(10).fill(0);

      try {
        // Use transaction to ensure username uniqueness atomically
        await runTransaction(db, async (transaction) => {
          const usernameDoc = await transaction.get(
            doc(db, "usernames", trimmedUsername)
          );

          if (usernameDoc.exists()) {
            throw new Error("USERNAME_TAKEN");
          }

          // Atomically create both documents
          transaction.set(doc(db, "usernames", trimmedUsername), {
            uid,
            email: trimmedEmail,
          });
          transaction.set(doc(db, "users", uid), {
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

        // Add to leaderboard
        const leaderboardRef = doc(collection(db, "leaderboard"), "users");

        await runTransaction(db, async (transaction) => {
          const leaderboardSnap = await transaction.get(leaderboardRef);

          if (!leaderboardSnap.exists) {
            transaction.set(leaderboardRef, {
              users: [
                {
                  email: trimmedEmail,
                  name: trimmedUsername || "Anonymous",
                  totalPts: 0,
                },
              ],
            });
            return;
          }

          const leaderboardData = leaderboardSnap.data();
          const usersArray = leaderboardData.users || [];

          const alreadyExists = usersArray.some(
            (user) => user.email === trimmedEmail
          );
          if (!alreadyExists) {
            usersArray.push({
              email: trimmedEmail,
              name: trimmedUsername || "Anonymous",
              totalPts: 0,
            });

            transaction.update(leaderboardRef, { users: usersArray });
            // console.log("User added to leaderboard");
          }
        });

        toast.success(
          "Registration successful! Please check your email to verify your account. If you don't see it, check your spam folder."
        );
        setUsername("");
        setEmail("");
        setPassword("");
        setCnfPassword("");
      } catch (transactionError) {
        // Handle username already taken in transaction
        if (transactionError.message === "USERNAME_TAKEN") {
          // Delete the Firebase Auth account since username is taken
          await user.delete();
          toast.error(
            "Username already taken. Please choose a different username."
          );
        } else {
          // Other transaction errors
          await user.delete();
          toast.error(
            "Registration failed due to a database error. Please try again."
          );
        }
        setLoader(false);
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

    setLoader(false);
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="beforeInteractive"
      />
      {loader && <AuthLoader />}
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
          className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default SignUp;
