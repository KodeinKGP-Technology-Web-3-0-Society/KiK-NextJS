import { useState } from "react";
import { auth, db } from "@/backend/firebase";
import { getDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

const SignIn = ({ setMsg, setMsgType, setShowMsg }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let identifierEmail = identifier;

    // resolving when username provided
    if (!identifier.includes("@")) {
      try {
        const usernameDoc = await getDoc(doc(db, "usernames", identifier));
        if (!usernameDoc.exists()) {
          setMsg("Username not found");
          setMsgType("error");
          setShowMsg(true);
          return;
        }
        identifierEmail = usernameDoc.data().email;
      } catch (err) {
        setMsg("Failed to fetch username");
        setMsgType("error");
        setShowMsg(true);
        return;
      }
    }

    try {
      await signInWithEmailAndPassword(auth, identifierEmail, password);
      setMsg("Login successful!");
      setShowMsg(true);
      setMsgType("success");
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
      setMsg(`Login error: ${errorMessage}`);
      setMsgType("error");
      setShowMsg(true);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center justify-center space-y-5"
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
        className="w-full cursor-pointer rounded-lg bg-cyan-400 py-2 font-semibold text-black transition duration-200 hover:bg-cyan-300"
        button="submit"
      >
        Login
      </button>
    </form>
  );
};

export default SignIn;
