export const config = {
  useGooglePlaces: import.meta.env.VITE_USE_GOOGLE_PLACES === "true",
  googleApiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY || "",
  freeAlternativeApiKey: import.meta.env.VITE_FREE_ALTERNATIVE_API_KEY || "",

  firebaseConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  },
};
