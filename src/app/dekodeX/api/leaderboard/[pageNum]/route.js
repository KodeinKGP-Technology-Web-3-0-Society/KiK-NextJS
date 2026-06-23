import { db } from "@/backend/firebaseAdmin.js";
import { NextResponse } from "next/server";
import { getCacheEntry, setCacheEntry } from "@/backend/runtimeCache.js";
import { requireAuth } from "@/backend/requireAuth.js";
import { getLeaderboardUsersIncludingRegistered } from "@/backend/leaderboard.js";

export const dynamic = "force-dynamic";

const LEADERBOARD_USERS_CACHE_TTL_MS = 15 * 1000;
const USER_DOC_CACHE_TTL_MS = 30 * 1000;
const LEADERBOARD_PUBLIC_HEADERS = {
  "Cache-Control": "no-store",
};

export async function GET(request, { params }) {
  try {
    const { pageNum } = await params;
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const uid = searchParams.get("uid");
    const wantsUserContext =
      searchParams.get("userContext") === "1" || Boolean(email || uid);
    let authenticatedUserContext = null;

    if (wantsUserContext) {
      const authResult = await requireAuth(request, {
        requireVerifiedEmail: false,
      });
      if (authResult.error) return authResult.error;
      authenticatedUserContext = authResult.auth;
    }

    const page = Number.parseInt(pageNum, 10);
    if (!Number.isFinite(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    const leaderboardRef = db.collection("leaderboard").doc("users");
    const leaderboardUsersCacheKey = "leaderboard:users";
    let users = getCacheEntry(leaderboardUsersCacheKey);
    if (!users) {
      const leaderboardData = await getLeaderboardUsersIncludingRegistered();
      if (!leaderboardData.leaderboardExists) {
        return NextResponse.json(
          { error: "Leaderboard not found" },
          { status: 404 }
        );
      }
      users = leaderboardData.users;
      setCacheEntry(
        leaderboardUsersCacheKey,
        users,
        LEADERBOARD_USERS_CACHE_TTL_MS
      );
    }
    const contextUid = authenticatedUserContext?.uid || "";
    const normalizedRequestedEmail = authenticatedUserContext?.email
      ? authenticatedUserContext.email.trim().toLowerCase()
      : "";

    // Self-heal only for the authenticated user. Never trust query-provided
    // uid/email here because this route writes via Admin SDK.
    if (authenticatedUserContext) {
      let userDocData = null;

      if (contextUid) {
        const userCacheByUidKey = `userByUid:${contextUid}`;
        const cachedUserByUid = getCacheEntry(userCacheByUidKey);
        if (cachedUserByUid) {
          userDocData = cachedUserByUid;
        } else {
          const directUserDoc = await db
            .collection("users")
            .doc(contextUid)
            .get();
          if (directUserDoc.exists) {
            userDocData = directUserDoc.data();
            setCacheEntry(
              userCacheByUidKey,
              userDocData,
              USER_DOC_CACHE_TTL_MS
            );
          }
        }
      }

      if (!userDocData && normalizedRequestedEmail) {
        const userCacheByEmailKey = `userByEmail:${normalizedRequestedEmail}`;
        const cachedUserByEmail = getCacheEntry(userCacheByEmailKey);
        if (cachedUserByEmail) {
          userDocData = cachedUserByEmail;
        } else {
          const userQuerySnapshot = await db
            .collection("users")
            .where("email", "==", normalizedRequestedEmail)
            .limit(1)
            .get();

          if (!userQuerySnapshot.empty) {
            userDocData = userQuerySnapshot.docs[0].data();
            setCacheEntry(
              userCacheByEmailKey,
              userDocData,
              USER_DOC_CACHE_TTL_MS
            );
          }
        }
      }

      if (userDocData) {
        const computedTotalPts = (userDocData.submissions || []).reduce(
          (sum, val) => sum + Math.max(0, Number(val) || 0),
          0
        );
        const entryEmail = String(
          userDocData.email || normalizedRequestedEmail || ""
        )
          .trim()
          .toLowerCase();
        const entryName = userDocData.username || "Anonymous";

        if (entryEmail) {
          const existingIndex = users.findIndex(
            (entry) =>
              String(entry?.email ?? "")
                .trim()
                .toLowerCase() === entryEmail
          );

          let shouldPersist = false;
          if (existingIndex >= 0) {
            const existing = users[existingIndex] || {};
            if (
              Number(existing.totalPts ?? 0) !== computedTotalPts ||
              (existing.name || "Anonymous") !== entryName
            ) {
              users[existingIndex] = {
                ...existing,
                email: entryEmail,
                name: entryName,
                totalPts: computedTotalPts,
              };
              shouldPersist = true;
            }
          } else {
            users = [
              ...users,
              {
                email: entryEmail,
                name: entryName,
                totalPts: computedTotalPts,
              },
            ];
            shouldPersist = true;
          }

          if (shouldPersist) {
            await leaderboardRef.update({ users });
            setCacheEntry(
              leaderboardUsersCacheKey,
              users,
              LEADERBOARD_USERS_CACHE_TTL_MS
            );
          }
        }
      }
    }

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

    const userRanking = normalizedRequestedEmail
      ? sortedLeaderboard.findIndex(
          (user) =>
            String(user?.email ?? "")
              .trim()
              .toLowerCase() === normalizedRequestedEmail
        )
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

    const hasUserContext = Boolean(authenticatedUserContext);
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
      hasUserContext
        ? { status: 200 }
        : { status: 200, headers: LEADERBOARD_PUBLIC_HEADERS }
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
