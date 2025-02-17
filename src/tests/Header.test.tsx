import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  test("displays the correct text", () => {
    render(<Header />);

    // Zoek naar het titel-element en controleer of het in de document staat
    const titleElement = screen.getByText(/Chauffeurs-Wiki/i);
    expect(titleElement).toBeInTheDocument();
  });
});
