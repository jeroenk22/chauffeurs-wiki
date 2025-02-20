import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddLocationForm from "../components/AddLocationForm";
import { it, expect, vi } from "vitest";

it("calls onLocationAdded with correct data when form is submitted", async () => {
  const mockOnLocationAdded = vi.fn();
  const mockOnCancel = vi.fn();

  render(
    <AddLocationForm
      onLocationAdded={mockOnLocationAdded}
      onCancel={mockOnCancel}
    />
  );

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

  fireEvent.click(screen.getByText("Opslaan"));

  await waitFor(() => {
    expect(mockOnLocationAdded).toHaveBeenCalledTimes(1);
  });
});
