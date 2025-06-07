'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from "@/backend/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import Message from "@/Components/utils/message";

const Auth = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");

    const [doSignUp, setDoSignUp] = useState(false);

    // for displaying messages instead of alerts
    const [showMsg, setShowMsg] = useState(false);
    const [msgType, setMsgType] = useState("info");
    const [msg, setMsg] = useState("");

    function toggleSignUp(value) {
        setUsername("");
        setEmail("");
        setPassword("");
        setCnfPassword("");
        setDoSignUp(value);
    }

    function checkMail(email) {
        // domain - '@kgpian.iitkgp.ac.in'
        const regex = /^[a-zA-Z0-9._%+-]+@kgpian\.iitkgp\.ac\.in$/;
        return regex.test(email);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== cnfPassword) {
            setMsg("Passwords do not match.");
            setMsgType("error");
            setShowMsg(true);
            return;
        }
        if (username.length < 3 || username.length > 20) {
            setMsg('Username must be between 3 and 20 characters.');
            setMsgType("error");
            setShowMsg(true);
            return;
        }
        if (password.length < 6) {
            setMsg('Password must be at least 6 characters long.');
            setMsgType("error");
            setShowMsg(true);
            return;
        }

        if (!checkMail(email)) {
            setMsg('Please enter a KGP email address only.');
            setMsgType("error");
            setShowMsg(true);
            return;
        }

        try{
            const usernameDoc = await getDoc(doc(db, 'usernames', username));
            if (usernameDoc.exists()) {
                setMsg('Username already taken');
                setMsgType("error");
                setShowMsg(true);
                return;
            }

            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCred.user;
            const uid = userCred.user.uid;
            let initSubmissions = [];
            for (let i = 0; i < 10; i++) {
                initSubmissions.push(0);
            }

            await sendEmailVerification(user); // email verification link

            await setDoc(doc(db, 'usernames', username), { uid, email }); // username to uid mapping for login
            await setDoc(doc(db, 'users', uid), {
                username,
                email,
                submissions: [],
                emailVerified: user.emailVerified,
            });

            setMsg("Registration successful! Please check your email to verify your account.");
            setShowMsg(true);
            setMsgType("success");
            setUsername("");
            setEmail("");
            setPassword("");
            setCnfPassword("");
            setDoSignUp(false);

        } catch (err) {
            console.error("Registration error:", err);
            let errorMessage = "Registration failed. Please try again.";
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already in use. Please sign in or use a different email.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. Please choose a stronger password.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address.";
            } else if (err.code === 'auth/operation-not-allowed') {
                errorMessage = "Email/password accounts are not enabled. Please enable them in Firebase Console.";
            } else if (err.code === 'permission-denied') { // Specific Firestore permission error
                errorMessage = "Permission denied. Check your Firestore Security Rules.";
            }
            setMsg(`Registration error: ${errorMessage}`);
            setMsgType("error");
            setShowMsg(true);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        let identifierEmail = email;

        // resolving when username provided
        if (!email.includes('@')) {
            try {
                const usernameDoc = await getDoc(doc(db, 'usernames', email));
                if (!usernameDoc.exists()) {
                    setMsg('Username not found');
                    setMsgType("error");
                    setShowMsg(true);
                    return;
                }
                identifierEmail = usernameDoc.data().email;
            } catch (err) {
                setMsg('Failed to fetch username');
                setMsgType("error");
                setShowMsg(true);
                return;
            }
        }

        try{
            await signInWithEmailAndPassword(auth, identifierEmail, password);
            setMsg("Login successful!");
            setShowMsg(true);
            setMsgType("success");
        } catch (err) {
            console.error("Login error:", err);
            // Provide more user-friendly error messages based on Firebase error codes
            let errorMessage = "Login failed. Please check your credentials.";
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                errorMessage = "Invalid email/username or password.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address format.";
            }
            setMsg(`Login error: ${errorMessage}`);
            setMsgType("error");    
            setShowMsg(true);
        }

    }

    const router = useRouter();
    const { loggedIn, user } = useAuth();

    useEffect(() => {
        if (user && user.emailVerified) {
            setMsg("Email verified. Redirecting...");
            setShowMsg(true);
            setMsgType("success");
            router.push('/');
        } else if (user && !user.emailVerified) {
            setMsg("Please verify your email to continue. A verification link has been sent to your inbox. You may need to refresh after verifying.");
            setShowMsg(true);
            setMsgType("warning");
        }
        console.log("User :", user);
    }, [loggedIn, user, router]); 

    return (
        <div>
            {
                showMsg && 
                <Message 
                    type={msgType} 
                    message={msg} 
                    setShowMsg={setShowMsg} 
                />
            }

            <div>
                <button className="cursor-pointer border-2 bg-blue-200 text-blue-600 mx-8"
                    onClick={() => toggleSignUp(true)}
                >Sign up</button>
                <button className="cursor-pointer border-2 bg-blue-200 text-blue-600 mx-8" 
                onClick={() => toggleSignUp(false)}
                >Sign in</button>
            </div>

            {
                doSignUp ? 
                <>
                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col items-center justify-center">
                        <h1>Sign up</h1>
                        <input 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" 
                            placeholder="Username" />
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                        <input value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} type="password" placeholder="confirm password" />
                        <button>Register</button>
                    </form>

                    <span>Already Registered? <a onClick={() => toggleSignUp(false)} className="cursor-pointer underline">Sign In from here!</a></span>
                </>
                :
                <>
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col items-center justify-center">
                        <h1>Sign in</h1>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder="Username or Email" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                        <button>Login</button>
                    </form>

                    <span>Don't have an account? <a onClick={() => toggleSignUp(true)} className="cursor-pointer underline">Create from here!</a></span>
                </>
            }

        </div>
    )
};

export default Auth;