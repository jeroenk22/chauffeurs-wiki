import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { config } from "../config/config";

// Debugging: Log Firebase configuratie
console.log("🔥 Firebase Config Check:");
console.log("Project ID:", config.firebaseConfig.projectId);
console.log(
  "API Key:",
  config.firebaseConfig.apiKey ? "✅ Ingeladen" : "❌ NIET ingeladen"
);

// Firebase initialiseren met configuratie uit `config.ts`
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

// Voorkom Analytics-fouten in de testomgeving
let analytics;
if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
