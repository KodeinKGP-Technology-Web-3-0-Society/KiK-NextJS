import { useState, useEffect } from "react";

export function useAuthToken() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const authEndpoint = apiBase
    ? `${apiBase}/dekodeX/api/auth`
    : "/dekodeX/api/auth";

  useEffect(() => {
    const getSessionToken = async () => {
      try {
        // Check if we have a valid cached token
        const cachedToken = localStorage.getItem("dekodex_session_token");
        const cachedExpiry = localStorage.getItem("dekodex_session_expiry");

        if (
          cachedToken &&
          cachedExpiry &&
          Date.now() < parseInt(cachedExpiry)
        ) {
          setToken(cachedToken);
          setLoading(false);
          return;
        }

        // Fetch new session token
        const response = await fetch(authEndpoint, {
          method: "POST",
        });

        if (response.ok) {
          const data = await response.json();
          const sessionToken = data.sessionToken;

          if (!sessionToken) {
            console.error("Auth endpoint returned no sessionToken");
            return;
          }

          // Cache token with expiry (55 minutes to be safe)
          localStorage.setItem("dekodex_session_token", sessionToken);
          localStorage.setItem(
            "dekodex_session_expiry",
            (Date.now() + 55 * 60 * 1000).toString()
          );

          setToken(sessionToken);
        } else {
          const errorText = await response.text();
          console.error(
            `Failed to get session token (${response.status}):`,
            errorText
          );
        }
      } catch (error) {
        console.error("Error getting session token:", error);
      } finally {
        setLoading(false);
      }
    };

    getSessionToken();
  }, []);

  const refreshToken = async () => {
    setLoading(true);
    localStorage.removeItem("dekodex_session_token");
    localStorage.removeItem("dekodex_session_expiry");

    try {
      const response = await fetch(authEndpoint, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        const sessionToken = data.sessionToken;

        if (!sessionToken) {
          console.error("Auth endpoint returned no sessionToken");
          return;
        }

        localStorage.setItem("dekodex_session_token", sessionToken);
        localStorage.setItem(
          "dekodex_session_expiry",
          (Date.now() + 55 * 60 * 1000).toString()
        );

        setToken(sessionToken);
      } else {
        const errorText = await response.text();
        console.error(
          `Failed to refresh session token (${response.status}):`,
          errorText
        );
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    } finally {
      setLoading(false);
    }
  };

  return { token, loading, refreshToken };
}
