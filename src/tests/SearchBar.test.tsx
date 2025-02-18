import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { Location } from "../types/types";

describe("SearchBar", () => {
  const mockLocations: Location[] = [
    {
      id: "1",
      name: "Coolblue Hub",
      city: "Rotterdam",
      address: "",
      status: "",
      postcode: "",
      country: "",
      description: "",
      images: [],
      lastModified: "",
      modifiedBy: "",
    },
    {
      id: "2",
      name: "Bol.com DC",
      city: "Utrecht",
      address: "",
      status: "",
      postcode: "",
      country: "",
      description: "",
      images: [],
      lastModified: "",
      modifiedBy: "",
    },
  ];

  it("renders the search input field", () => {
    render(<SearchBar locations={mockLocations} onSearchResults={() => {}} />);
    const input = screen.getByPlaceholderText("Zoek locatie of plaats...");
    expect(input).toBeInTheDocument();
  });

  it("calls onSearchResults with matching locations by name", () => {
    const mockOnSearchResults = vi.fn();
    render(
      <SearchBar
        locations={mockLocations}
        onSearchResults={mockOnSearchResults}
      />
    );

    const input = screen.getByPlaceholderText("Zoek locatie of plaats...");
    fireEvent.change(input, { target: { value: "Coolblue" } });

    expect(mockOnSearchResults).toHaveBeenCalledTimes(1);
    expect(mockOnSearchResults).toHaveBeenCalledWith([mockLocations[0]]);
  });

  it("calls onSearchResults with matching locations by city", () => {
    const mockOnSearchResults = vi.fn();
    render(
      <SearchBar
        locations={mockLocations}
        onSearchResults={mockOnSearchResults}
      />
    );

    const input = screen.getByPlaceholderText("Zoek locatie of plaats...");
    fireEvent.change(input, { target: { value: "Rotterdam" } });

    expect(mockOnSearchResults).toHaveBeenCalledTimes(1);
    expect(mockOnSearchResults).toHaveBeenCalledWith([mockLocations[0]]);
  });

  it("returns no results when no match is found", () => {
    const mockOnSearchResults = vi.fn();
    render(
      <SearchBar
        locations={mockLocations}
        onSearchResults={mockOnSearchResults}
      />
    );

    const input = screen.getByPlaceholderText("Zoek locatie of plaats...");
    fireEvent.change(input, { target: { value: "Amazon" } });

    expect(mockOnSearchResults).toHaveBeenCalledTimes(1);
    expect(mockOnSearchResults).toHaveBeenCalledWith([]); // Geen resultaten
  });

  it("returns all locations when search is cleared", () => {
    const mockOnSearchResults = vi.fn();
    render(
      <SearchBar
        locations={mockLocations}
        onSearchResults={mockOnSearchResults}
      />
    );

    const input = screen.getByPlaceholderText("Zoek locatie of plaats...");
    fireEvent.change(input, { target: { value: "Coolblue" } }); // Zoek eerst iets
    fireEvent.change(input, { target: { value: "" } }); // Wis de input

    expect(mockOnSearchResults).toHaveBeenCalledTimes(2); // Twee aanroepen
    expect(mockOnSearchResults).toHaveBeenLastCalledWith(mockLocations); // Alle locaties weer terug
  });

  it("updates the input value when typing", () => {
    render(<SearchBar locations={mockLocations} onSearchResults={() => {}} />);
    const input = screen.getByPlaceholderText("Zoek locatie of plaats...");
    fireEvent.change(input, { target: { value: "Utrecht" } });

    expect(input).toHaveValue("Utrecht");
  });
});
