// Helperfunctie om nested waarden op te halen, zoals `user.name`
const getNestedValue = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

// Prioriteitssortering mapping
const priorityOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };

export const sortTableData = <T>(
  data: T[],
  column: string,
  order: "asc" | "desc"
): T[] => {
  return [...data].sort((a, b) => {
    const valueA = getNestedValue(a, column);
    const valueB = getNestedValue(b, column);

    // Speciale sortering voor prioriteiten
    const priorityA = priorityOrder[valueA as string] ?? null;
    const priorityB = priorityOrder[valueB as string] ?? null;

    if (priorityA !== null && priorityB !== null) {
      return order === "asc" ? priorityA - priorityB : priorityB - priorityA;
    }

    // Strings sorteren met localeCompare
    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    // Numbers direct sorteren
    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    // Booleans sorteren als 1 (true) en 0 (false)
    if (typeof valueA === "boolean" && typeof valueB === "boolean") {
      return order === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }

    // Datum sorteren op timestamp
    if (valueA instanceof Date && valueB instanceof Date) {
      return order === "asc"
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    }

    return 0; // Geen sortering als typen niet matchen
  });
};
