import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const locations = [
  { id: "loc_1", name: "Amazon DC", address: "123 Logistics Way" },
  { id: "loc_2", name: "Bol.com Magazijn", address: "456 E-commerce Ln" },
  { id: "loc_3", name: "Coolblue Hub", address: "789 Tech Street" },
];

async function addTestLocations() {
  console.log("✍️ Locaties toevoegen aan Firestore...");
  try {
    for (const location of locations) {
      const locationRef = doc(collection(db, "locations"), location.id);
      await setDoc(locationRef, location);
      console.log(`✅ Toegevoegd: ${location.name}`);
    }
    console.log("🚀 Alle locaties zijn toegevoegd!");
  } catch (error) {
    console.error("❌ Fout bij toevoegen van locaties:", error);
  }
}

addTestLocations();
