import { describe, it, expect } from "vitest";
import { sortTableData } from "../utils/tableSort"; // Zorg dat het pad klopt

describe("sortTableData", () => {
  const sampleData = [
    {
      name: "Banana",
      age: 30,
      active: true,
      date: new Date("2025-01-01"),
      priority: "low",
    },
    {
      name: "Apple",
      age: 25,
      active: false,
      date: new Date("2024-12-01"),
      priority: "high",
    },
    {
      name: "Cherry",
      age: 35,
      active: true,
      date: new Date("2025-02-01"),
      priority: "medium",
    },
  ];

  it("should sort by string in ascending order", () => {
    const sorted = sortTableData(sampleData, "name", "asc");
    expect(sorted.map((item) => item.name)).toEqual([
      "Apple",
      "Banana",
      "Cherry",
    ]);
  });

  it("should sort by string in descending order", () => {
    const sorted = sortTableData(sampleData, "name", "desc");
    expect(sorted.map((item) => item.name)).toEqual([
      "Cherry",
      "Banana",
      "Apple",
    ]);
  });

  it("should sort by number in ascending order", () => {
    const sorted = sortTableData(sampleData, "age", "asc");
    expect(sorted.map((item) => item.age)).toEqual([25, 30, 35]);
  });

  it("should sort by number in descending order", () => {
    const sorted = sortTableData(sampleData, "age", "desc");
    expect(sorted.map((item) => item.age)).toEqual([35, 30, 25]);
  });

  it("should sort by boolean in ascending order (false first)", () => {
    const sorted = sortTableData(sampleData, "active", "asc");
    expect(sorted.map((item) => item.active)).toEqual([false, true, true]);
  });

  it("should sort by boolean in descending order (true first)", () => {
    const sorted = sortTableData(sampleData, "active", "desc");
    expect(sorted.map((item) => item.active)).toEqual([true, true, false]);
  });

  it("should sort by date in ascending order", () => {
    const sorted = sortTableData(sampleData, "date", "asc");
    expect(sorted.map((item) => item.date.toISOString())).toEqual([
      "2024-12-01T00:00:00.000Z",
      "2025-01-01T00:00:00.000Z",
      "2025-02-01T00:00:00.000Z",
    ]);
  });

  it("should sort by date in descending order", () => {
    const sorted = sortTableData(sampleData, "date", "desc");
    expect(sorted.map((item) => item.date.toISOString())).toEqual([
      "2025-02-01T00:00:00.000Z",
      "2025-01-01T00:00:00.000Z",
      "2024-12-01T00:00:00.000Z",
    ]);
  });

  it("should sort by priority in ascending order (low -> medium -> high)", () => {
    const sorted = sortTableData(sampleData, "priority", "asc");
    expect(sorted.map((item) => item.priority)).toEqual([
      "low",
      "medium",
      "high",
    ]);
  });

  it("should sort by priority in descending order (high -> medium -> low)", () => {
    const sorted = sortTableData(sampleData, "priority", "desc");
    expect(sorted.map((item) => item.priority)).toEqual([
      "high",
      "medium",
      "low",
    ]);
  });

  it("should return the same array when sorting by an unknown column", () => {
    const sorted = sortTableData(sampleData, "unknown", "asc");
    expect(sorted).toEqual(sampleData);
  });
  const sorted = sortTableData(sampleData, "priority", "asc");
  expect(sorted.map((item) => item.priority)).toEqual([
    "low",
    "medium",
    "high",
  ]);
});
