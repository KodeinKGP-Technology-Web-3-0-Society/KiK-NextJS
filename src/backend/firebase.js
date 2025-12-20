import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_APP_ID,
  apiKey: "AIzaSyDCWxoNmrIJonXIA1acC4kcqQp2y7dcgkk",
  authDomain: "kodein-25831.firebaseapp.com",
  projectId: "kodein-25831",
  storageBucket: "kodein-25831.firebasestorage.app",
  messagingSenderId: "290213904029",
  appId: "1:290213904029:web:2dbb4c0e76602fe903de74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const auth = null;
// export const db = null;
