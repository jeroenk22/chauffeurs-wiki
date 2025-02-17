/// <reference types="vitest/globals" />

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationList from "../components/LocationList";

//  Mock Firestore data in plaats van echte API-calls
vi.mock("../utils/getLocations", () => ({
  getLocations: vi.fn(() =>
    Promise.resolve([
      { id: "1", name: "Locatie 1", address: "Adres 1" },
      { id: "2", name: "Locatie 2", address: "Adres 2" },
    ])
  ),
}));

describe("LocationList", () => {
  it("renders list of locations", async () => {
    render(<LocationList onLocationClick={() => {}} />);

    // Wacht tot de locaties ingeladen zijnq
    await waitFor(() =>
      expect(screen.getByText("Locatie 1")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Locatie 2")).toBeInTheDocument()
    );
  });

  it("calls onLocationClick when a location is clicked", async () => {
    const handleClick = vi.fn();
    render(<LocationList onLocationClick={handleClick} />);

    // Wacht tot de UI is geüpdatet
    await waitFor(() => screen.getByText("Locatie 1"));

    // Simuleer een klik op de eerste locatie
    await userEvent.click(screen.getByText("Locatie 1"));

    // Controleer of de klik-functie correct is aangeroepen
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith("1"); //  Zorg dat de juiste ID wordt doorgegeven
  });
});
