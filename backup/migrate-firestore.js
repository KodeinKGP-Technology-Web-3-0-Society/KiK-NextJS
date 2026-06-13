#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

function loadEnvFileIfProvided() {
  const args = process.argv.slice(2);
  const envFlag = args.find((arg) => arg.startsWith("--env-file="));
  if (!envFlag) {
    return;
  }

  const envPath = envFlag.split("=")[1];
  const absPath = path.resolve(process.cwd(), envPath);

  if (!fs.existsSync(absPath)) {
    throw new Error(`Env file not found: ${absPath}`);
  }

  const content = fs.readFileSync(absPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const splitIndex = trimmed.indexOf("=");
    if (splitIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, splitIndex).trim();
    const value = trimmed.slice(splitIndex + 1);

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

function toPrivateKey(value) {
  return value.replace(/\\n/g, "\n");
}

function parseBoolean(value, defaultValue = false) {
  if (value == null || value === "") {
    return defaultValue;
  }
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function parseCollections() {
  const raw = process.env.COLLECTIONS;
  if (!raw) {
    return null;
  }

  const list = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return list.length ? new Set(list) : null;
}

async function copyCollectionRecursive({
  sourceCollection,
  targetCollection,
  dryRun,
  counters,
  batchSize,
}) {
  let lastDoc = null;

  while (true) {
    let query = sourceCollection
      .orderBy(admin.firestore.FieldPath.documentId())
      .limit(batchSize);

    if (lastDoc) {
      query = query.startAfter(lastDoc.id);
    }

    const snapshot = await query.get();
    if (snapshot.empty) {
      return;
    }

    for (const docSnap of snapshot.docs) {
      counters.read += 1;
      const targetDoc = targetCollection.doc(docSnap.id);

      if (!dryRun) {
        await targetDoc.set(docSnap.data());
      }
      counters.written += 1;

      const childCollections = await docSnap.ref.listCollections();
      for (const childCollection of childCollections) {
        await copyCollectionRecursive({
          sourceCollection: childCollection,
          targetCollection: targetDoc.collection(childCollection.id),
          dryRun,
          counters,
          batchSize,
        });
      }
    }

    lastDoc = snapshot.docs[snapshot.docs.length - 1];

    if (snapshot.size < batchSize) {
      return;
    }
  }
}

async function run() {
  loadEnvFileIfProvided();

  const oldProjectId = requiredEnv("OLD_FIREBASE_PROJECT_ID");
  const oldClientEmail = requiredEnv("OLD_FIREBASE_CLIENT_EMAIL");
  const oldPrivateKey = toPrivateKey(requiredEnv("OLD_FIREBASE_PRIVATE_KEY"));

  const newProjectId = requiredEnv("NEW_FIREBASE_PROJECT_ID");
  const newClientEmail = requiredEnv("NEW_FIREBASE_CLIENT_EMAIL");
  const newPrivateKey = toPrivateKey(requiredEnv("NEW_FIREBASE_PRIVATE_KEY"));

  const dryRun = parseBoolean(process.env.DRY_RUN, false);
  const batchSize = Number(process.env.BATCH_SIZE || "300");
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 1000) {
    throw new Error("BATCH_SIZE must be an integer between 1 and 1000");
  }

  const includeCollections = parseCollections();

  const oldApp = admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: oldProjectId,
        clientEmail: oldClientEmail,
        privateKey: oldPrivateKey,
      }),
    },
    "source-app"
  );

  const newApp = admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: newProjectId,
        clientEmail: newClientEmail,
        privateKey: newPrivateKey,
      }),
    },
    "target-app"
  );

  const sourceDb = oldApp.firestore();
  const targetDb = newApp.firestore();

  const counters = { read: 0, written: 0, collections: 0 };

  try {
    const sourceCollections = await sourceDb.listCollections();

    for (const sourceCollection of sourceCollections) {
      if (includeCollections && !includeCollections.has(sourceCollection.id)) {
        continue;
      }

      counters.collections += 1;
      console.log(`Migrating collection: ${sourceCollection.id}`);

      await copyCollectionRecursive({
        sourceCollection,
        targetCollection: targetDb.collection(sourceCollection.id),
        dryRun,
        counters,
        batchSize,
      });
    }

    console.log("Migration completed");
    console.log(`Collections processed: ${counters.collections}`);
    console.log(`Documents read: ${counters.read}`);
    console.log(`Documents written: ${counters.written}`);
    if (dryRun) {
      console.log("DRY_RUN=true, no writes were made to target project.");
    }
  } finally {
    await Promise.all([oldApp.delete(), newApp.delete()]);
  }
}

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
