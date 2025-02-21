import { config } from "../config/config";

export const fetchAlternativePlaces = async (query: string) => {
  if (!config.locationIqApiKey) {
    throw new Error("Alternatieve API Key is niet ingesteld.");
  }

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${config.locationIqApiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.features) {
    throw new Error("Fout bij ophalen van alternatieve plaatsgegevens.");
  }

  return data.features;
};
