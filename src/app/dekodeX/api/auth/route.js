import { NextResponse } from "next/server";

export async function POST(request) {
  return NextResponse.json(
    { error: "Deprecated endpoint. Use Firebase ID token authentication." },
    { status: 410 }
  );
}
