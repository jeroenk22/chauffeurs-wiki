import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import dotenv from "dotenv";

// Laad de .env variabelen
dotenv.config();

// Firebase configuratie
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updateLocations = async () => {
  console.log("📌 Start bijwerken van locaties...");

  const locationsRef = collection(db, "locations");
  const snapshot = await getDocs(locationsRef);

  let updatedCount = 0;

  for (const locationDoc of snapshot.docs) {
    const data = locationDoc.data();

    const updatedData = {
      postcode: data.postcode || "",
      city: data.city || "",
      country: data.country || "",
      description: data.description || "Geen beschrijving beschikbaar",
      images: data.images || [],
      lastModified: data.lastModified || new Date().toISOString(),
      modifiedBy: data.modifiedBy || "Onbekend",
      LatLngNewEntry: data.LatLngNewEntry || { lat: 0, lng: 0 },
      LatLngLastModified: data.LatLngLastModified || { lat: 0, lng: 0 },
    };

    await updateDoc(doc(db, "locations", locationDoc.id), updatedData);
    updatedCount++;
  }

  console.log(`✅ Succes! ${updatedCount} locaties zijn bijgewerkt.`);
};

updateLocations().catch(console.error);
