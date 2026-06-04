import { NextResponse } from "next/server";
import { db } from "@/backend/firebaseAdmin.js";

const CERTIFICATE_APPLICATIONS_ENABLED = false;

export async function POST(request) {
  if (!CERTIFICATE_APPLICATIONS_ENABLED) {
    return NextResponse.json(
      { error: "Certificate applications are currently disabled" },
      { status: 403 }
    );
  }

  try {
    const { email, name } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const certRef = db.collection("certificates").doc("allCertificates");
    // Read existing entries
    const snap = await certRef.get();
    const data = snap.exists ? snap.data() : { entries: [] };
    const entries = Array.isArray(data.entries) ? data.entries : [];

    // Append new entry
    entries.push({
      email,
      name: name || null,
      requestedAt: new Date().toISOString(),
    });

    // Write back
    await certRef.set({ entries }, { merge: true });

    return NextResponse.json({ message: "Certificate application submitted" });
  } catch (err) {
    console.error("POST /apply error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
