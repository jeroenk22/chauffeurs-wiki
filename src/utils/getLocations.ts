import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface Location {
  id: string;
  name: string;
  address: string;
}

export async function getLocations(): Promise<Location[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "locations"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Onbekende locatie",
        address: data.address || "Adres niet beschikbaar",
      };
    });
  } catch (error) {
    console.error("🔥 Firestore-fout:", error);
    throw error;
  }
}
