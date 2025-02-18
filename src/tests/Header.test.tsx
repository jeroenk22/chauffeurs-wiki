import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  test("displays the correct title", () => {
    render(<Header notifications={0} />);

    const titleElement = screen.getByRole("heading", {
      name: /Chauffeurs-Wiki/i,
    });
    expect(titleElement).toBeInTheDocument();
  });

  test("displays notification bell without badge when there are 0 notifications", () => {
    render(<Header notifications={0} />);

    // Zoek de bel-icoon door te kijken naar de SVG binnen de container
    const bellIcon = screen.getByTestId("notification-bell");
    expect(bellIcon).toBeInTheDocument();

    // Check dat de badge NIET aanwezig is
    expect(screen.queryByTestId("notification-badge")).not.toBeInTheDocument();
  });

  test("displays notification bell with badge when there are notifications", () => {
    render(<Header notifications={3} />);

    const bellIcon = screen.getByTestId("notification-bell");
    expect(bellIcon).toBeInTheDocument();

    // Check dat de badge correct wordt weergegeven
    const badge = screen.getByTestId("notification-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("3");
  });
});
