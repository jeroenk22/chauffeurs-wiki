import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddLocationForm from "../components/AddLocationForm";
//import { Location } from "../types/types";
import { vi } from "vitest";

// Mock Firestore
vi.mock("../firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(() =>
    Promise.resolve({
      id: "12345", // Mocked Firestore ID
    })
  ),
}));

describe("AddLocationForm", () => {
  it("renders input fields correctly", () => {
    render(<AddLocationForm onLocationAdded={() => {}} onCancel={() => {}} />);

    expect(screen.getByPlaceholderText("Naam")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Adres")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Postcode")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Stad")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Land")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Beschrijving")).toBeInTheDocument();
  });

  it("updates input values when typing", () => {
    render(<AddLocationForm onLocationAdded={() => {}} onCancel={() => {}} />);

    const nameInput = screen.getByPlaceholderText("Naam");
    fireEvent.change(nameInput, { target: { value: "Test Locatie" } });
    expect(nameInput).toHaveValue("Test Locatie");

    const cityInput = screen.getByPlaceholderText("Stad");
    fireEvent.change(cityInput, { target: { value: "Rotterdam" } });
    expect(cityInput).toHaveValue("Rotterdam");
  });

  it("calls onLocationAdded with correct data when form is submitted", async () => {
    const mockOnLocationAdded = vi.fn();
    render(
      <AddLocationForm
        onLocationAdded={mockOnLocationAdded}
        onCancel={() => {}}
      />
    );

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
      target: { value: "Rotterdam" },
    });
    fireEvent.change(screen.getByPlaceholderText("Land"), {
      target: { value: "Nederland" },
    });
    fireEvent.change(screen.getByPlaceholderText("Beschrijving"), {
      target: { value: "Test beschrijving" },
    });

    // Klik op de opslaan-knop
    fireEvent.click(screen.getByText("Opslaan"));

    // Wacht op de Firestore-aanroep en controleer of onLocationAdded is aangeroepen
    await waitFor(() => {
      expect(mockOnLocationAdded).toHaveBeenCalledTimes(1);
      expect(mockOnLocationAdded).toHaveBeenCalledWith({
        id: "12345", // Firestore ID uit de mock
        name: "Test Locatie",
        address: "Teststraat 123",
        postcode: "1234AB",
        city: "Rotterdam",
        country: "Nederland",
        status: "active",
        description: "Test beschrijving",
        images: [],
        lastModified: expect.any(String), // Timestamp
        modifiedBy: "Admin",
      });
    });
  });

  it("calls onCancel when the cancel button is clicked", () => {
    const mockOnCancel = vi.fn();
    render(
      <AddLocationForm onLocationAdded={() => {}} onCancel={mockOnCancel} />
    );

    fireEvent.click(screen.getByText("Annuleren"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
