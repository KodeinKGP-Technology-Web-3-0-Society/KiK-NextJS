import { db } from "@/backend/firebaseAdmin.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 200 });
    }

    const fullLeaderboard = users; 

    return NextResponse.json(
      {
        leaderboardSize: fullLeaderboard.length,
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
