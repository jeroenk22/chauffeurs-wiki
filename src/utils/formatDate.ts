export const convertToDutchTime = (utcString: string): string => {
  if (!utcString) return "Onbekende datum";
  const date = new Date(utcString);
  return date.toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" });
};
