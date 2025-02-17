import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationCard from "../components/LocationCard";

// Test: Renderen van de locatiekaart met naam en adres
test("renders location card with name and address", () => {
  render(
    <LocationCard name="Test Locatie" address="Straat 123" onClick={() => {}} />
  );

  // Controleren of de naam en het adres in de document staan
  const nameElement = screen.getByText("Test Locatie");
  const addressElement = screen.getByText("Straat 123");

  expect(nameElement).toBeInTheDocument();
  expect(addressElement).toBeInTheDocument();
});

// Test: Controleren of de onClick functie wordt aangeroepen bij klikken
test("calls onClick when clicked", async () => {
  const handleClick = vi.fn(); // Mock functie voor klik
  render(
    <LocationCard
      name="Test Locatie"
      address="Straat 123"
      onClick={handleClick}
    />
  );

  // Simuleer een klik op de naam van de locatie
  await userEvent.click(screen.getByText("Test Locatie"));

  // Controleren of de handleClick functie precies één keer is aangeroepen
  expect(handleClick).toHaveBeenCalledTimes(1);
});
