import { db } from "@/backend/firebaseAdmin.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const snapshot = await db.collection("users").get();
    const { pageNum } = await params;

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    console.log(email);

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

    const userRanking = fullLeaderboard.findIndex(
      (entry) => entry.email === email
    );

    const currUser = fullLeaderboard.find((entry) => entry.email === email);

    const rankedLeaderboard = fullLeaderboard.map((entry, index) => ({
      ...entry,
      email: "secret",
      rank: index + 1,
    }));

    const paginatedLeaderboard = rankedLeaderboard.slice(startIndex, endIndex);

    // console.log(currUser.username, currUser.score, userRanking);

    // console.log(leaderboard);
    return NextResponse.json(
      {
        paginatedLeaderboard,
        currentUser: {
          username: currUser ? currUser.name : "Anonymous",
          score: currUser ? Math.max(0, currUser.score) : 0,
          rank: userRanking !== -1 ? userRanking + 1 : null,
        },
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
