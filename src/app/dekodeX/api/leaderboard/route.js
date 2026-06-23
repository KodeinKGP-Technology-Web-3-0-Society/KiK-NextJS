import { NextResponse } from "next/server";
import { getLeaderboardUsersIncludingRegistered } from "@/backend/leaderboard.js";

export async function GET() {
  try {
    const leaderboardData = await getLeaderboardUsersIncludingRegistered();

    if (!leaderboardData.leaderboardExists) {
      return NextResponse.json(
        { error: "Leaderboard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        leaderboardSize: leaderboardData.users.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leaderboard size:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
