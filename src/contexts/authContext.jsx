"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/backend/firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUserData(currentUser) {
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log('User Data:', userData);

          // Ensure userData has the required properties
          setUser({
            ...userData,
            uid: currentUser.uid,
            email: currentUser.email,
            emailVerified: currentUser.emailVerified
          });
        } else {
          console.error('Server error: No such user document!');
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data: " + error.message);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);
      await getUserData(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loggedIn: !!user && user.emailVerified,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}