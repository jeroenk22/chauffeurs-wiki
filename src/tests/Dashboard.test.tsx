/// <reference types="vitest/globals" />
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { it, expect, vi } from "vitest";

// Mock Firebase Firestore
vi.mock("../firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
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
            status: "active",
          }),
        },
      ],
    })
  ),
  addDoc: vi.fn(() =>
    Promise.resolve({
      id: "2", // Mock ID voor nieuwe locatie
    })
  ),
}));

it("displays the add location form when the add button is clicked", async () => {
  render(<Dashboard />);

  // Wacht tot de tabel geladen is
  await waitFor(() => expect(screen.getByText("Naam")).toBeInTheDocument());

  // Zoek nu op de aria-label in plaats van `/plus/i`
  const addButton = screen.getByLabelText("Voeg nieuwe locatie toe");
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /Nieuwe locatie toevoegen/i })
    ).toBeInTheDocument();
  });
});

it("adds a new location and updates the table", async () => {
  render(<Dashboard />);

  // Wacht tot de lijst is geladen
  await waitFor(() => expect(screen.getByText("Naam")).toBeInTheDocument());

  // Zoek de "+" knop en klik erop
  const addButton = screen.getByLabelText("Voeg nieuwe locatie toe");
  fireEvent.click(addButton);

  // Vul het formulier in
  fireEvent.change(screen.getByPlaceholderText("Naam"), {
    target: { value: "Test Locatie" },
  });
  fireEvent.change(screen.getByPlaceholderText("Adres"), {
    target: { value: "Teststraat 123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Postcode"), {
    target: { value: "1234AB" },
  });
  fireEvent.change(screen.getByPlaceholderText("Stad"), {
    target: { value: "Amsterdam" },
  });
  fireEvent.change(screen.getByPlaceholderText("Land"), {
    target: { value: "Nederland" },
  });
  fireEvent.change(screen.getByPlaceholderText("Beschrijving"), {
    target: { value: "Test beschrijving" },
  });

  // Klik op opslaan
  fireEvent.click(screen.getByText("Opslaan"));

  // Controleer of de nieuwe locatie wordt toegevoegd aan de tabel
  await waitFor(() => {
    expect(screen.getByText("Test Locatie")).toBeInTheDocument();
    expect(screen.getByText("Amsterdam")).toBeInTheDocument();
  });
});
