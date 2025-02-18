export const convertToDutchTime = (utcString: string): string => {
  if (!utcString) return "Onbekende datum";

  const date = new Date(utcString);
  if (isNaN(date.getTime())) return "Onbekende datum"; // Voorkomt "Invalid Date"

  return date.toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" });
};
