export const config = {
  useGooglePlaces: import.meta.env.VITE_USE_GOOGLE_PLACES === "true",
  googleApiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY || "",
  locationIqApiKey: import.meta.env.VITE_LOCATIONIQ_API_KEY || "",

  // Gebruik de proxy alleen in ontwikkel- en testomgeving
  useProxy: import.meta.env.MODE !== "production",

  firebaseConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  },
};
