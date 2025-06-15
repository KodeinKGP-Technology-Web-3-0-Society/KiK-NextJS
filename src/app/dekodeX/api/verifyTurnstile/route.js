import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const token = body.token;

    const formData = new URLSearchParams();
    formData.append("secret", process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY);
    formData.append("response", token);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: "Bot verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
