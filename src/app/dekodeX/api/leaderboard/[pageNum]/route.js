import { db } from "@/backend/firebaseAdmin.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const snapshot = await db.collection("users").get();
    const { pageNum } = await params;

    if (!pageNum || isNaN(pageNum) || pageNum < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 200 });
    }

    const pageSize = 10;
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const fullLeaderboard = Object.entries(users)
      .map(([userId, userData]) => ({
        userId,
        email: userData.email,
        name: userData.username || "Anonymous",
        score: userData.submissions
          ? userData.submissions.reduce((sum, val) => sum + val, 0)
          : 0,
      }))
      .sort((a, b) => b.score - a.score);

    const rankedLeaderboard = fullLeaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    const paginatedLeaderboard = rankedLeaderboard.slice(startIndex, endIndex);

    // console.log(leaderboard);
    return NextResponse.json({ paginatedLeaderboard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
