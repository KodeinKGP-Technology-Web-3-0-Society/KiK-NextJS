import { db } from "@/backend/firebaseAdmin.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { pageNum } = await params;
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const page = Number.parseInt(pageNum, 10);
    if (!Number.isFinite(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    const leaderboardRef = db.collection("leaderboard").doc("users");
    const leaderboardSnap = await leaderboardRef.get();

    if (!leaderboardSnap.exists) {
      return NextResponse.json(
        { error: "Leaderboard not found" },
        { status: 404 }
      );
    }

    const users = leaderboardSnap.data().users || [];

    // Sort by totalPts desc; tie-break by email for deterministic ordering.
    const sortedLeaderboard = [...users].sort((a, b) => {
      const ptsDelta = (b?.totalPts ?? 0) - (a?.totalPts ?? 0);
      if (ptsDelta !== 0) return ptsDelta;
      return String(a?.email ?? "").localeCompare(String(b?.email ?? ""));
    });

    const pageSizeRaw = Number.parseInt(
      searchParams.get("pageSize") ?? "10",
      10
    );
    const pageSize = Number.isFinite(pageSizeRaw)
      ? Math.min(Math.max(pageSizeRaw, 1), 50)
      : 10;

    const leaderboardSize = sortedLeaderboard.length;
    const totalPages = Math.max(1, Math.ceil(leaderboardSize / pageSize));
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const userRanking =
      email && typeof email === "string"
        ? sortedLeaderboard.findIndex((user) => user?.email === email)
        : -1;
    const currUser = userRanking >= 0 ? sortedLeaderboard[userRanking] : null;

    const paginatedLeaderboard = sortedLeaderboard
      .slice(startIndex, endIndex)
      .map((user, idx) => ({
        name: user?.name || "Anonymous",
        score: Math.max(0, user?.totalPts ?? 0),
        rank: startIndex + idx + 1,
        email: "secret", // anonymize
      }));

    const podium = sortedLeaderboard.slice(0, 3).map((user, idx) => ({
      name: user?.name || "Anonymous",
      score: Math.max(0, user?.totalPts ?? 0),
      rank: idx + 1,
      email: "secret",
    }));

    return NextResponse.json(
      {
        meta: {
          page,
          pageSize,
          leaderboardSize,
          totalPages,
        },
        paginatedLeaderboard,
        podium,
        currentUser: currUser
          ? {
              username: currUser.name || "Anonymous",
              score: Math.max(0, currUser.totalPts ?? 0),
              rank: userRanking + 1,
            }
          : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
