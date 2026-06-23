import { db } from "@/backend/firebaseAdmin.js";

function normalizeEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export async function getLeaderboardUsersIncludingRegistered() {
  const leaderboardRef = db.collection("leaderboard").doc("users");
  const leaderboardSnap = await leaderboardRef.get();
  let users = leaderboardSnap.exists ? leaderboardSnap.data().users || [] : [];

  users = Array.isArray(users) ? [...users] : [];

  const knownEmails = new Set(
    users.map((entry) => normalizeEmail(entry?.email)).filter(Boolean)
  );

  const registeredUsersSnap = await db
    .collection("users")
    .select("email", "username")
    .get();

  let changed = false;
  registeredUsersSnap.forEach((doc) => {
    const data = doc.data() || {};
    const email = normalizeEmail(data.email);

    if (!email || knownEmails.has(email)) return;

    users.push({
      email,
      name: data.username || "Anonymous",
      totalPts: 0,
    });
    knownEmails.add(email);
    changed = true;
  });

  if (changed) {
    await leaderboardRef.set({ users }, { merge: true });
  }

  return { users, leaderboardExists: leaderboardSnap.exists || changed };
}
