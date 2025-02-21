import { config } from "../config/config";

export const fetchGooglePlaces = async (query: string) => {
  if (!config.googleApiKey) {
    throw new Error("Google Places API Key is niet ingesteld.");
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${config.googleApiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error("Fout bij ophalen van Google Places data.");
  }

  return data.predictions;
};
