import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBu6Y3xtzY1sjXl5BbsDoFGVV5vOw-7yNo",

  authDomain: "spring-test-484ad.firebaseapp.com",

  projectId: "spring-test-484ad",

  storageBucket: "spring-test-484ad.firebasestorage.app",

  messagingSenderId: "179191372716",

  appId: "1:179191372716:web:f913d6befc0a5ac3fb3809",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, analytics };
