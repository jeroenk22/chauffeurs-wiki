import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Firebase Firestore correct instellen
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>; // 🚀 Cast expliciet naar object

  return {
    ...actual,
    getFirestore: vi.fn(() => ({
      collection: vi.fn(() => ({
        path: "mockCollection",
        id: "mockId",
      })),
      doc: vi.fn(() => ({
        path: "mockDocument",
        id: "mockDocId",
      })),
    })),
    collection: vi.fn(() => ({
      path: "mockCollection",
    })),
    doc: vi.fn(() => ({
      path: "mockDocument",
    })),
    getDocs: vi.fn(() =>
      Promise.resolve({
        docs: [
          {
            id: "1",
            data: () => ({
              name: "Coolblue Hub",
              address: "E-commerce Street 10",
              city: "Rotterdam",
              country: "Nederland",
              lastModified: "2025-02-18T09:02:16.128Z",
              locationStatus: "active",
            }),
          },
        ],
      })
    ),
    addDoc: vi.fn(() =>
      Promise.resolve({
        id: "2",
      })
    ),
    setDoc: vi.fn(() => Promise.resolve()), // Zorgt ervoor dat setDoc correct wordt gemockt
    getDoc: vi.fn(() =>
      Promise.resolve({
        exists: () => true,
        data: () => ({
          testField: "testValue",
        }),
      })
    ),
  };
});
