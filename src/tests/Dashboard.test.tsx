import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { describe, it, expect } from "vitest";

describe("Dashboard Tests", () => {
  it("displays the add location form when the add button is clicked", async () => {
    render(<Dashboard />);

    // Wacht tot de lijst met locaties zichtbaar is
    await waitFor(() => {
      expect(screen.getByText("📍 Locaties")).toBeInTheDocument();
    });

    // Zoek de knop op aria-label en klik erop
    const addButton = screen.getByLabelText("Voeg nieuwe locatie toe");
    fireEvent.click(addButton);

    // Controleer of het formulier wordt getoond
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Nieuwe locatie toevoegen/i })
      ).toBeInTheDocument();
    });
  });

  it("adds a new location and updates the table", async () => {
    render(<Dashboard />);

    // Wacht tot de lijst is geladen
    await waitFor(() => {
      expect(screen.getByText("📍 Locaties")).toBeInTheDocument();
    });

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
});
