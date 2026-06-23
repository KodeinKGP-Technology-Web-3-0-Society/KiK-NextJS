import { db } from "@/backend/firebaseAdmin.js";
import { NextResponse } from "next/server";

const allowedOrigins = new Set([
  "https://kodeinkgpnew.netlify.app",
  "https://kodeinkgp.in",
  "http://localhost:3000",
  "http://localhost:3001",
]);

async function verifyTurnstile(token) {
  if (!token) return false;

  const formData = new URLSearchParams();
  formData.append("secret", process.env.RECAPTCHA_SERVER_KEY);
  formData.append("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    }
  );

  const data = await response.json();
  return data.success === true;
}

export async function POST(request) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || !allowedOrigins.has(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { username, token } = await request.json();
    const normalizedUsername = String(username || "").trim();

    if (!/^[a-z0-9_]{3,20}$/.test(normalizedUsername)) {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }

    const captchaOk = await verifyTurnstile(token);
    if (!captchaOk) {
      return NextResponse.json(
        { error: "Bot verification failed" },
        { status: 400 }
      );
    }

    const usernameSnap = await db
      .collection("usernames")
      .doc(normalizedUsername)
      .get();

    if (!usernameSnap.exists) {
      return NextResponse.json({ email: null }, { status: 404 });
    }

    return NextResponse.json(
      { email: usernameSnap.data().email || null },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Error resolving username:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
