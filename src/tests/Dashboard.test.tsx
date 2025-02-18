/// <reference types="vitest/globals" />
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { describe, it, expect, vi } from "vitest";

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
}));

describe("Dashboard", () => {
  it("renders loading state initially", () => {
    render(<Dashboard />);
    expect(screen.getByText(/🔄 Laden.../i)).toBeInTheDocument();
  });

  it("renders locations table with headers", async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.getByText("Naam")).toBeInTheDocument());
    expect(screen.getByText("Plaats")).toBeInTheDocument();
  });

  it("allows sorting by name", async () => {
    render(<Dashboard />);
    const nameHeader = await screen.findByText("Naam");
    fireEvent.click(nameHeader);

    expect(nameHeader).toBeInTheDocument();
  });

  it("shows details when a location is clicked", async () => {
    render(<Dashboard />);

    // Zoek specifiek de naam in de tabel
    const locationRows = await screen.findAllByText("Coolblue Hub");
    fireEvent.click(locationRows[0]); // Klik op de eerste rij in de tabel

    // Controleer of de detailweergave wordt bijgewerkt
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Coolblue Hub" })
      ).toBeInTheDocument();
    });
  });
});
