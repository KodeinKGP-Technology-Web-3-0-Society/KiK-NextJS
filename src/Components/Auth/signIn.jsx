"use client";
import { useState } from "react";
import { auth, db } from "@/backend/firebase";
import { getDoc, doc } from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";
import { Eye, EyeOff, Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState("");
  const [isLoadingMagicLink, setIsLoadingMagicLink] = useState(false);
  const router = useRouter();

  // Magic Link configuration
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: (typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') + '/auth/verify-email-link',
    // This must be true.
    handleCodeInApp: true,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let identifierEmail = identifier;
    // resolving when username provided
    if (!identifier.includes("@")) {
      try {
        const usernameDoc = await getDoc(doc(db, "usernames", identifier));
        if (!usernameDoc.exists()) {
          toast.error("Username not found");
          return;
        }
        identifierEmail = usernameDoc.data().email;
      } catch (err) {
        toast.error("Failed to fetch username");
        return;
      }
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
        return;
      }
      toast.success("Login successful!");
      router.push("/dekodeX");
    } catch (err) {
      console.log("Login error:", err);
      // Provide more user-friendly error messages based on Firebase error codes
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
  };

 const handleMagicLinkSend = async (e) => {
  e.preventDefault();
  if (!magicLinkEmail) {
    toast.error("Please enter your email address");
    return;
  }

  // ✅ Email domain verification
  if (!magicLinkEmail.endsWith("@kgpian.iitkgp.ac.in")) {
    toast.error("Please register with your valid Kgpian email first");
    return;
  }

  setIsLoadingMagicLink(true);
  try {
    await sendSignInLinkToEmail(auth, magicLinkEmail, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", magicLinkEmail);
    toast.success("Login link sent! Check your email to sign in.");
    setShowMagicLink(false);
    setMagicLinkEmail("");
  } catch (error) {
    console.error("Error sending Login link:", error);
    let errorMessage = "Failed to send Login link. Please try again.";
    if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address format.";
    }
    toast.error(errorMessage);
  } finally {
    setIsLoadingMagicLink(false);
  }
};



  // Handle magic link sign-in is now handled in the separate verification page
  // No need for useEffect here

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      {!showMagicLink ? (
        // Regular sign-in form
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center space-y-5 w-full"
        >
          <input
            value={identifier}
            className="w-full rounded-lg bg-[#10162f] p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={(e) => setIdentifier(e.target.value)}
            type="text"
            placeholder="Username or Email"
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
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
          >
            Login
          </button>
        </form>
      ) : (
        // Magic link form
        <form
          onSubmit={handleMagicLinkSend}
          className="flex flex-col items-center justify-center space-y-5 w-full"
        >
          <div className="text-center text-white mb-4">
            <h3 className="text-lg font-semibold mb-2">Sign in with Magic Link</h3>
            <p className="text-gray-400 text-sm">
              Enter your email and we'll send you a secure link to sign in
            </p>
          </div>
          <input
            value={magicLinkEmail}
            className="w-full rounded-lg bg-[#10162f] p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={(e) => setMagicLinkEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            disabled={isLoadingMagicLink}
            className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            {isLoadingMagicLink ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      )}

      {/* Toggle between forms */}
      <div className="flex flex-col items-center space-y-2">
        <button
          type="button"
          onClick={() => {
            setShowMagicLink(!showMagicLink);
            setMagicLinkEmail("");
          }}
          className="text-cyan-400 hover:text-cyan-300 text-sm underline transition duration-200"
        >
          {showMagicLink ? "Back to Password Login" : "Forgot Password? Use Magic Link"}
        </button>
        
        {!showMagicLink && (
          <>
            <div className="flex items-center space-x-4 w-full">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>
            
            <button
              type="button"
              onClick={() => setShowMagicLink(true)}
              className="w-full cursor-pointer rounded-lg bg-transparent border border-cyan-400 py-2 font-semibold text-cyan-400 transition duration-200 hover:bg-cyan-400 hover:text-black flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Sign in with Magic Link
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;