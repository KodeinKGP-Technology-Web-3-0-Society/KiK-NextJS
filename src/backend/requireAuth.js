import { NextResponse } from "next/server";
import { admin } from "@/backend/firebaseAdmin.js";

export async function requireAuth(request, options = {}) {
  const { requireVerifiedEmail = true } = options;
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized. Missing or invalid Authorization header." },
        { status: 401 }
      ),
    };
  }

  const idToken = authHeader.slice("Bearer ".length).trim();
  if (!idToken) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized. Missing bearer token." },
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const email = decoded.email || "";

    if (!decoded.uid || !email) {
      return {
        error: NextResponse.json(
          { error: "Forbidden. Token missing required identity claims." },
          { status: 403 }
        ),
      };
    }

    if (requireVerifiedEmail && decoded.email_verified !== true) {
      return {
        error: NextResponse.json(
          { error: "Forbidden. Email verification required." },
          { status: 403 }
        ),
      };
    }

    return {
      auth: {
        uid: decoded.uid,
        email,
        claims: decoded,
      },
    };
  } catch (error) {
    return {
      error: NextResponse.json(
        { error: "Forbidden. Invalid or expired token." },
        { status: 403 }
      ),
    };
  }
}
