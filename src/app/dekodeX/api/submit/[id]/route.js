import { db } from "@/backend/firebaseAdmin.js";
import { NextResponse } from "next/server";

const questionIdToIndex = {
  q1: 0,
  q2: 1,
  q3: 2,
  q4: 3,
  q5: 4,
  q6: 5,
  q7: 6,
  q8: 7,
  q9: 8,
  q10: 9,
};

const baseScores = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
];
const PENALTY_PERCENTAGE = 0.0005; // 0.05% deduction per correct submission for future solvers
const WRONG_PENALTY = 10; // 0.5% penalty for wrong submissions

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    // console.log(`Received request for question ID: ${id}`);

    const body = await request.json();
    const { answer, email } = body;
    // console.log("email:", email, "answer:", answer);

    const questDoc = await db.collection("questions").doc(id).get();
    if (!questDoc.exists) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const questionData = questDoc.data();
    const questionDate = questionData.date;

    // Use IST timezone for consistency
    const now = new Date();
    const today = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // en-CA gives YYYY-MM-DD format

    if (questionDate > today) {
      return NextResponse.json(
        { error: "Question is not yet available to submit" },
        { status: 403 }
      );
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "User ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!answer) {
      return new Response(JSON.stringify({ error: "Answer is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const qIndex = questionIdToIndex[id];
    if (qIndex === undefined) {
      return new Response(JSON.stringify({ error: "Invalid question ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const questionDoc = await db.collection("testcases").doc(id).get();

    if (!questionDoc.exists) {
      return new Response(JSON.stringify({ error: "Question not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { correctAnswer } = questionDoc.data();
    const isCorrect =
      answer.toString().trim() === correctAnswer.toString().trim();

    const userQuerySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (userQuerySnapshot.empty) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userDoc = userQuerySnapshot.docs[0];
    const userRef = userDoc.ref;
    const userData = userDoc.data();
    const submissions = userData.submissions || Array(10).fill(0);

    if (submissions[qIndex] > 0) {
      return new Response(
        JSON.stringify({ error: "Question already submitted Correctly" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (isCorrect) {
      const questionRef = db.collection("questions").doc(id);
      const questionScore = questionData.score;

      submissions[qIndex] = Math.max(
        questionScore - Math.abs(submissions[qIndex]),
        0
      ); // avoid making it negative

      //upadting question score on each submission

      await db.runTransaction(async (transaction) => {
        const questionSnap = await transaction.get(questionRef);
        if (!questionSnap.exists) return;
        const base = baseScores[qIndex];
        const questionData = questionSnap.data();
        const currentQScore = questionData.score || base;
        const decayAmount = base * PENALTY_PERCENTAGE; // decay on each correct submission
        const newScore = Math.max(currentQScore - decayAmount, 100); // don't drop below 100

        transaction.update(questionRef, { score: newScore });
      });
    } else {
      submissions[qIndex] -= WRONG_PENALTY; // apply penalty for wrong submission
    }

    // --- Calculate total points after update ---
    const totalPts = submissions.reduce(
      (sum, val) => sum + Math.max(0, val),
      0
    );

    await userRef.update({ submissions });

    if (isCorrect) {
      // Wrong submissions do not change positive leaderboard points.
      const leaderboardRef = db.collection("leaderboard").doc("users");
      await db.runTransaction(async (transaction) => {
        const leaderboardSnap = await transaction.get(leaderboardRef);
        const leaderboardUser = {
          email,
          name: userData.username || "Anonymous",
          totalPts,
        };

        if (!leaderboardSnap.exists) {
          transaction.set(leaderboardRef, { users: [leaderboardUser] });
          return;
        }

        const leaderboardUsers = leaderboardSnap.data().users || [];
        const idx = leaderboardUsers.findIndex((u) => u.email === email);

        if (idx < 0) {
          leaderboardUsers.push(leaderboardUser);
          transaction.update(leaderboardRef, { users: leaderboardUsers });
          return;
        }

        const currentEntry = leaderboardUsers[idx];
        const nextName = userData.username || currentEntry.name || "Anonymous";

        if (
          currentEntry.totalPts === totalPts &&
          currentEntry.name === nextName
        ) {
          return;
        }

        leaderboardUsers[idx] = {
          ...currentEntry,
          name: nextName,
          totalPts,
        };
        transaction.update(leaderboardRef, { users: leaderboardUsers });
      });
    }

    return new Response(
      JSON.stringify({
        id,
        isCorrect,
        score: Math.max(0, submissions[qIndex]),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in /submit/[id]:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
