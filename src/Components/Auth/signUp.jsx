import { useState } from "react";
import { auth, db } from "@/backend/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const SignUp = ({ setMsg, setMsgType, setShowMsg }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  function checkMail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@kgpian\.iitkgp\.ac\.in$/;
    return regex.test(email);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== cnfPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      toast.error("Username must be between 3 and 20 characters.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (!checkMail(email)) {
      toast.error("Please enter a KGP email address only.");
      return;
    }

    try {
      const usernameDoc = await getDoc(doc(db, "usernames", username));
      if (usernameDoc.exists()) {
        toast.error("Username already taken.");
        return;
      }

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      const uid = user.uid;

      const initSubmissions = Array(10).fill(0);

      await sendEmailVerification(user);

      await setDoc(doc(db, "usernames", username), { uid, email });
      await setDoc(doc(db, "users", uid), {
        username,
        email,
        submissions: initSubmissions,
        emailVerified: user.emailVerified,
      });

      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setCnfPassword("");
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
        errorMessage =
          "Email/password accounts are not enabled. Please enable them in Firebase Console.";
      } else if (err.code === "permission-denied") {
        errorMessage =
          "Permission denied. Check your Firestore Security Rules.";
      }

      toast.error(`Registration error: ${errorMessage}`);
    }
  };

  return (
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
      <button
        className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default SignUp;
