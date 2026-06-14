import { NextResponse } from "next/server";
import { db } from "@/backend/firebaseAdmin.js";
import { requireAuth } from "@/backend/requireAuth.js";

const CERTIFICATE_APPLICATIONS_ENABLED = false;

export async function POST(request) {
  if (!CERTIFICATE_APPLICATIONS_ENABLED) {
    return NextResponse.json(
      { error: "Certificate applications are currently disabled" },
      { status: 403 }
    );
  }

  try {
    const authResult = await requireAuth(request);
    if (authResult.error) return authResult.error;
    const { email } = authResult.auth;

    const { name } = await request.json();

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
