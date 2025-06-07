'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from "@/backend/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");

    const [doSignUp, setDoSignUp] = useState(false);

    function toggleSignUp(value) {
        setUsername("");
        setEmail("");
        setPassword("");
        setCnfPassword("");
        setDoSignUp(value);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try{
            const usernameDoc = await getDoc(doc(db, 'usernames', username));
            if (usernameDoc.exists()) {
                alert('Username already taken');
                return;
            }

            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCred.user.uid;

            await setDoc(doc(db, 'usernames', username), { uid, email }); // username to uid mapping for login
            await setDoc(doc(db, 'users', uid), {
                username,
                email,
                submissions: [],
            });

            alert("Registration successful!");
            setUsername("");
            setEmail("");
            setPassword("");
            setCnfPassword("");
            setDoSignUp(false);

        }catch(err){
            console.error("Login error:", err);
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
                    alert('Username not found');
                    return;
                }
                identifierEmail = usernameDoc.data().email;
            } catch (err) {
                alert('Failed to fetch username');
                return;
            }
        }

        try{
            await signInWithEmailAndPassword(auth, identifierEmail, password);
            alert("Login successful!");
        } catch(err) {
            console.error("Login error:", err);
            alert('Login failed. Please check your credentials.');
        }

    }

    const router = useRouter();
    const { loggedIn } = useAuth();

    useEffect(() => {
        if(loggedIn)
            router.push('/')
    }, [loggedIn])

    return (
        <div>

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

export default RegForm;
