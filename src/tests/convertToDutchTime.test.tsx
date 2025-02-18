import { describe, it, expect } from "vitest";
import { convertToDutchTime } from "../utils/formatDate"; // Zorg dat het pad correct is!

describe("convertToDutchTime", () => {
  it("should convert a valid UTC timestamp to Dutch time", () => {
    const utcString = "2025-02-18T09:02:16.128Z";
    const result = convertToDutchTime(utcString);

    // Controleert of de output een correct geformatteerde datum-tijd string is
    expect(result).toMatch(/\d{1,2}-\d{1,2}-\d{4},? \d{1,2}:\d{1,2}:\d{1,2}/);
  });

  it("should return 'Onbekende datum' for an empty string", () => {
    const result = convertToDutchTime("");
    expect(result).toBe("Onbekende datum");
  });

  it("should return 'Onbekende datum' for an invalid date", () => {
    const result = convertToDutchTime("invalid-date");
    expect(result).toBe("Onbekende datum");
  });
});
