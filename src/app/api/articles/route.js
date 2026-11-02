import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";

export const revalidate = 1800; // 30 minutes cache

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json({ articles }, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("[api/articles] Failed to fetch:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
