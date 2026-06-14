// app/api/certificate/check/route.js
import { NextResponse } from "next/server";
import { db } from "@/backend/firebaseAdmin.js";
import { requireAuth } from "@/backend/requireAuth.js";

export async function GET(request) {
  const authResult = await requireAuth(request);
  if (authResult.error) return authResult.error;
  const { email } = authResult.auth;

  const doc = await db.collection("certificates").doc("allCertificates").get();
  const entries = doc.exists ? doc.data().entries || [] : [];

  const match = entries.find((entry) => entry.email === email);

  return NextResponse.json({ exists: !!match });
}
