import { NextResponse } from "next/server";
import { db } from "@/backend/firebaseAdmin.js";

export async function GET(request, { params }) {
  try {
    const { questionId } = await params;

    if (!questionId) {
      return NextResponse.json(
        { error: "Missing questionId in params" },
        { status: 400 }
      );
    }

    const questionDoc = await db.collection("questions").doc(questionId).get();
    if (!questionDoc.exists) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const questionData = questionDoc.data();

    // Use IST timezone for consistency
    const utcToday = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istDate = new Date(utcToday.getTime() + istOffset);

    const today =
      istDate.getFullYear() +
      "-" +
      String(istDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(istDate.getDate()).padStart(2, "0");

    const questionDate = questionData.date;
    console.log(today);
    if (questionDate > today) {
      return NextResponse.json(
        { error: "Question is not yet available" },
        { status: 403 }
      );
    }

    const testcasesSnapshot = await db
      .collection("testcases")
      .where("questionId", "==", questionId)
      .get();

    if (testcasesSnapshot.empty) {
      return NextResponse.json(
        { error: "Testcase not found" },
        { status: 404 }
      );
    }

    const testcaseData = testcasesSnapshot.docs[0].data().input;

    return NextResponse.json(
      {
        ...questionData,
        testcases: testcaseData,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching question with testcases:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
