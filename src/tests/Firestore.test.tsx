import { describe, test, expect } from "vitest";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

describe("Firestore Tests", () => {
  test("should write and read a document", async () => {
    const testRef = doc(db, "testCollection", "testDoc");

    // Schrijf data naar Firestore
    await setDoc(testRef, { testField: "testValue" });

    // Lees data uit Firestore
    const docSnap = await getDoc(testRef);
    expect(docSnap.exists()).toBe(true);
    expect(docSnap.data()?.testField).toBe("testValue");
  }, 10000); // Verhoog de timeout naar 10 seconden
});
