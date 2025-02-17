/// <reference types="vitest/globals" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationList from "../components/LocationList";

const mockLocations = [
  { id: "1", name: "Locatie 1", address: "Adres 1" },
  { id: "2", name: "Locatie 2", address: "Adres 2" },
];

describe("LocationList", () => {
  it("renders list of locations", () => {
    render(
      <LocationList locations={mockLocations} onLocationClick={() => {}} />
    );
    expect(screen.getByText("Locatie 1")).toBeInTheDocument();
    expect(screen.getByText("Locatie 2")).toBeInTheDocument();
  });

  it("calls onLocationClick when a location is clicked", async () => {
    const handleClick = vi.fn();
    render(
      <LocationList locations={mockLocations} onLocationClick={handleClick} />
    );
    await userEvent.click(screen.getByText("Locatie 1"));
    expect(handleClick).toHaveBeenCalledWith("1");
  });
});
