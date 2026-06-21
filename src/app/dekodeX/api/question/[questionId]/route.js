import { NextResponse } from "next/server";
import { db } from "@/backend/firebaseAdmin.js";
import { getCacheEntry, setCacheEntry } from "@/backend/runtimeCache.js";

const QUESTION_CACHE_TTL_MS = 30 * 1000;

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
    const now = new Date();
    const today = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // en-CA gives YYYY-MM-DD format

    const questionDate = questionData.date;
    if (questionDate > today) {
      return NextResponse.json(
        { error: "Question is not yet available" },
        { status: 403 }
      );
    }
    const cacheKey = `question:${questionId}`;
    const cachedQuestionPayload = getCacheEntry(cacheKey);
    if (cachedQuestionPayload) {
      return NextResponse.json(cachedQuestionPayload, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
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

    const payload = {
      ...questionData,
      testcases: testcaseData,
    };
    setCacheEntry(cacheKey, payload, QUESTION_CACHE_TTL_MS);

    return NextResponse.json(payload, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching question with testcases:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
