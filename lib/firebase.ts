import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyCDYyH9VRsu6d-FcHdUg5wwBVb0S5oxZKg",
  authDomain: "climate-action-system.firebaseapp.com",
  projectId: "climate-action-system",
  storageBucket: "climate-action-system.firebasestorage.app",
  messagingSenderId: "425910122700",
  appId: "1:425910122700:web:cbaee43d80a8e6487bea69",
  measurementId: "G-1ZCNHNH0FE",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)

let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

export { app, auth, analytics }

