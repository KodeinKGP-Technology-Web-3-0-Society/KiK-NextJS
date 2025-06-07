const admin = require("firebase-admin");
const fs = require("fs");

// Path to your downloaded service account key
const serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load data from JSON files
const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));
const testcases = JSON.parse(fs.readFileSync("testcases.json", "utf-8"));

async function uploadQuestions() {
  const batch = db.batch();
  questions.forEach((q) => {
    const docRef = db.collection("questions").doc(q.questionId);
    batch.set(docRef, q);
  });
  await batch.commit();
  console.log("Questions uploaded successfully");
}

async function uploadTestcases() {
  const batch = db.batch();
  testcases.forEach((t) => {
    const docRef = db.collection("testcases").doc(t.questionId);
    batch.set(docRef, t);
  });
  await batch.commit();
  console.log("Testcases uploaded successfully");
}

async function main() {
  await uploadQuestions();
  await uploadTestcases();
}

main().catch(console.error);
