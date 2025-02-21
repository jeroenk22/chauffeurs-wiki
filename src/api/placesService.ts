import { config } from "../config/config";

// Dynamische API-endpoints (met proxy-ondersteuning voor dev/test)
const GOOGLE_PLACES_URL = config.useProxy
  ? "/places-api/maps/api/place/autocomplete/json"
  : "https://maps.googleapis.com/maps/api/place/autocomplete/json";

const GOOGLE_DETAILS_URL = config.useProxy
  ? "/places-api/maps/api/place/details/json"
  : "https://maps.googleapis.com/maps/api/place/details/json";

const LOCATIONIQ_AUTOCOMPLETE_URL = config.useProxy
  ? "/locationiq-api/autocomplete.php"
  : "https://api.locationiq.com/v1/autocomplete.php";

const LOCATIONIQ_REVERSE_URL = config.useProxy
  ? "/locationiq-api/reverse.php"
  : "https://us1.locationiq.com/v1/reverse.php";

console.log("📡 Proxy status:", config.useProxy ? "Actief" : "Uitgeschakeld");

// 🔹 Haalt autocomplete suggesties op
export async function fetchPlaceSuggestions(query: string): Promise<any[]> {
  if (!query) return [];

  try {
    const results = config.useGooglePlaces
      ? await fetchGooglePlaceSuggestions(query)
      : await fetchLocationIqSuggestions(query);

    return Array.isArray(results) ? results : []; // ✅ Fix: altijd een array retourneren
  } catch (error) {
    console.error("❌ Fout bij ophalen van suggesties:", error);
    return [];
  }
}

// 🔹 Haalt gedetailleerde informatie op van een geselecteerde locatie
export async function fetchPlaceDetails(placeId: string): Promise<any | null> {
  try {
    const url = `${GOOGLE_DETAILS_URL}?place_id=${placeId}&key=${config.googleApiKey}`;
    const data = await fetchData(url, "Google Places Details");

    if (!data || !data.result) {
      console.error("⚠️ Geen geldige locatiegegevens ontvangen:", data);
      return null;
    }

    console.log("📍 Volledige Google Places Details Response:", data.result);

    const addressComponents = data.result.address_components || [];

    // Helper functie om componenten op te zoeken
    const getComponent = (type: string) =>
      addressComponents.find((c: any) => c.types.includes(type))?.long_name ||
      "";

    const formattedAddress = data.result.formatted_address || "";
    const postcode = getComponent("postal_code");
    const city =
      getComponent("locality") || getComponent("administrative_area_level_2");
    const country = getComponent("country");

    const extractedData = {
      address: formattedAddress,
      postcode,
      city,
      country,
    };

    console.log("✅ Extracted Data →", extractedData);

    return extractedData;
  } catch (error) {
    console.error("❌ Fout bij ophalen van plaatsdetails:", error);
    return null;
  }
}

// 🔹 Google Places API - Suggesties ophalen
async function fetchGooglePlaceSuggestions(query: string): Promise<any[]> {
  const url = `${GOOGLE_PLACES_URL}?input=${encodeURIComponent(query)}&key=${
    config.googleApiKey
  }`;
  const data = await fetchData(url, "Google Places Suggesties");

  if (!data || !data.predictions || !Array.isArray(data.predictions)) {
    console.warn("⚠️ Geen geldige suggesties ontvangen:", data);
    return [];
  }

  return data.predictions.map((p: any) => ({
    placeId: p.place_id,
    name: p.structured_formatting?.main_text || "Onbekende locatie",
    address:
      p.structured_formatting?.secondary_text || "Geen adres beschikbaar",
  }));
}

// 🔹 Google Places API - Detailgegevens ophalen
async function fetchGooglePlaceDetails(placeId: string): Promise<any | null> {
  const url = `${GOOGLE_DETAILS_URL}?place_id=${placeId}&key=${config.googleApiKey}`;
  const data = await fetchData(url, "Google Places Details");

  if (!data || !data.result) {
    console.warn("⚠️ Geen geldige plaatsgegevens ontvangen:", data);
    return { address: "", postcode: "", city: "", country: "" };
  }

  console.log("📍 Volledige Google Places Details Response:", data.result);

  // Helperfunctie om een specifiek component te vinden
  const getComponent = (type: string) =>
    data.result.address_components?.find((c: any) => c.types.includes(type))
      ?.long_name || "";

  // Adres, postcode, stad en land ophalen
  const formattedAddress = data.result.formatted_address || "";
  const postcode = getComponent("postal_code");
  const city =
    getComponent("locality") || getComponent("administrative_area_level_2");
  const country = getComponent("country");

  console.log("✅ Extracted Data →", {
    formattedAddress,
    postcode,
    city,
    country,
  });

  console.log(
    "🛠️ Data die wordt teruggestuurd naar `handleSelectSuggestion`:",
    {
      address: formattedAddress,
      postcode,
      city,
      country,
    }
  );

  return {
    address: formattedAddress,
    postcode,
    city,
    country,
  };
}

// 🔹 LocationIQ API - Suggesties ophalen
async function fetchLocationIqSuggestions(query: string): Promise<any[]> {
  const url = `${LOCATIONIQ_AUTOCOMPLETE_URL}?key=${
    config.locationIqApiKey
  }&q=${encodeURIComponent(query)}&format=json`;
  return await fetchData(url, "LocationIQ Suggesties");
}

// 🔹 LocationIQ API - Detailgegevens ophalen (op basis van lat/lon)
async function fetchLocationIqDetails(
  lat?: string,
  lon?: string
): Promise<any | null> {
  if (!lat || !lon) return null;

  const url = `${LOCATIONIQ_REVERSE_URL}?key=${config.locationIqApiKey}&lat=${lat}&lon=${lon}&format=json`;
  return await fetchData(url, "LocationIQ Details");
}

// 🔹 Algemene fetch-functie met foutafhandeling
export async function fetchData(
  url: string,
  logTag: string
): Promise<any | null> {
  try {
    console.log(`🌍 ${logTag} → ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP fout! Status: ${response.status}`);

    const data = await response.json();
    console.log(`✅ ${logTag} succesvol opgehaald.`);
    return data;
  } catch (error) {
    console.error(`❌ Fout bij ${logTag}:`, error);
    return null;
  }
}
