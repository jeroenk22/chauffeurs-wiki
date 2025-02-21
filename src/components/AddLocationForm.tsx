import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Location } from "../types/types";
import FormInput from "./FormInput";
import Button from "./Button";
import { fetchPlaceSuggestions, fetchPlaceDetails } from "../api/placesService";
import { config } from "../config/config";

interface AddLocationFormProps {
  onLocationAdded: (newLocation: Location) => void;
  onCancel: () => void;
}

const AddLocationForm: React.FC<AddLocationFormProps> = ({
  onLocationAdded,
  onCancel,
}) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    { placeId: string; name: string; address: string }[]
  >([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (query.length > 2) {
      try {
        const results = await fetchPlaceSuggestions(query);
        setSuggestions([...results]);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Fout bij ophalen locatievoorstellen:", error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = async (placeId: string, name: string) => {
    setName(name);
    setSelectedPlaceId(placeId);
    setSuggestions([]);

    try {
      const details = await fetchPlaceDetails(placeId);

      console.log(
        "📍 Volledige details ontvangen in `handleSelectSuggestion`:",
        details
      );

      if (!details) {
        console.error("⚠️ Geen details ontvangen voor deze locatie!");
        return;
      }

      // Direct loggen wat we willen zetten
      console.log("🏠 Gegevens die we willen zetten:", {
        address: details.address,
        postcode: details.postcode,
        city: details.city,
        country: details.country,
      });

      // Set de state met de opgehaalde gegevens
      setAddress(details.address);
      setPostcode(details.postcode);
      setCity(details.city);
      setCountry(details.country);
    } catch (error) {
      console.error("❌ Fout bij ophalen locatiegegevens:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "locations"), {
        name,
        address,
        postcode,
        city,
        country,
        locationStatus: "active",
        description,
        lastModified: new Date().toISOString(),
        modifiedBy: "Admin",
      });

      const newLocation: Location = {
        id: docRef.id,
        name,
        address,
        postcode,
        city,
        country,
        locationStatus: "active",
        description,
        images: [],
        lastModified: new Date().toISOString(),
        modifiedBy: "Admin",
      };

      onLocationAdded(newLocation);
    } catch (error) {
      console.error("Fout bij toevoegen locatie:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("🏠 Bijgewerkte adresgegevens →", {
      address,
      postcode,
      city,
      country,
    });
  }, [address, postcode, city, country]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">➕ Nieuwe locatie toevoegen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FormInput
            placeholder="Zoek locatie"
            value={locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            required
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md w-full mt-1 max-h-60 overflow-y-auto z-50">
              {suggestions.map((s) => (
                <li
                  key={s.placeId}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleSelectSuggestion(s.placeId, s.name)}
                >
                  <strong>{s.name}</strong>
                  <br />
                  <span className="text-sm text-gray-600">{s.address}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <FormInput
          placeholder="Naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormInput
          placeholder="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div className="flex space-x-2">
          <FormInput
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
          <FormInput
            placeholder="Stad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <FormInput
            placeholder="Land"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <FormInput
          placeholder="Beschrijving"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          textarea
        />
        <div className="flex justify-between">
          <Button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuleren
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Opslaan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationForm;
