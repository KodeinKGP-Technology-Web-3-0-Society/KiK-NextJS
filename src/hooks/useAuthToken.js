import { useEffect, useState } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "@/backend/firebase";

export function useAuthToken() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const idToken = await currentUser.getIdToken();
        setToken(idToken || null);
      } catch (error) {
        console.error("Error getting Firebase ID token:", error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshToken = async () => {
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setToken(null);
        return;
      }

      const idToken = await currentUser.getIdToken(true);
      setToken(idToken || null);
    } catch (error) {
      console.error("Error refreshing Firebase ID token:", error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  return { token, loading, refreshToken };
}
