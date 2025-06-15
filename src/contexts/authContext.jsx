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
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Always use the current Firebase Auth emailVerified status
          const updatedUserData = {
            ...userData,
            emailVerified: currentUser.emailVerified,
          };
          console.log("User Data:", updatedUserData);
          setUser(updatedUserData);
          return;
        } else {
          console.error("Server error: No such user document!");
        }
      } catch (error) {
        toast.error("Error fetching user data: " + error.message);
      }
    }
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      getUserData(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loggedIn: !!user && user.emailVerified,
  };

  // Debug logging
  console.log("Auth Context Debug:", {
    user: user
      ? { ...user, email: user.email, emailVerified: user.emailVerified }
      : null,
    loggedIn: !!user && user.emailVerified,
  });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
