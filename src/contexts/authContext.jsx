"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/backend/firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
        unsubscribeUserDoc = null;
      }

      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      unsubscribeUserDoc = onSnapshot(
        userDocRef,
        (userDocSnap) => {
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              ...userData,
              uid: currentUser.uid,
              email: currentUser.email || userData.email || "",
              emailVerified: currentUser.emailVerified,
              hasProfile: true,
            });
          } else {
            // During signup, auth can resolve before Firestore user doc is written.
            // Keep user authenticated and let onSnapshot populate full profile once created.
            setUser((prevUser) =>
              prevUser?.uid === currentUser.uid
                ? {
                    ...prevUser,
                    email: currentUser.email || prevUser.email || "",
                    emailVerified: currentUser.emailVerified,
                    hasProfile: false,
                  }
                : {
                    uid: currentUser.uid,
                    email: currentUser.email || "",
                    emailVerified: currentUser.emailVerified,
                    submissions: [],
                    hasProfile: false,
                  }
            );
          }
          setLoading(false);
        },
        (error) => {
          toast.error("Error fetching user data: " + error.message);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email || "",
            emailVerified: currentUser.emailVerified,
            submissions: [],
            hasProfile: false,
          });
          setLoading(false);
        }
      );
    });

    return () => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
      unsubscribeAuth();
    };
  }, []);

  const value = {
    user,
    loggedIn: !loading && !!user && user.emailVerified,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
