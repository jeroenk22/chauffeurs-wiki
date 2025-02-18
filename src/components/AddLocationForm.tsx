import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Location } from "../types/types";

interface AddLocationFormProps {
  onLocationAdded: (newLocation: Location) => void; // Verwacht een locatie als argument
  onCancel: () => void;
}

const AddLocationForm: React.FC<AddLocationFormProps> = ({
  onLocationAdded,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
        status,
        description,
        lastModified: new Date().toISOString(),
        modifiedBy: "Admin",
      });

      const newLocation: Location = {
        id: docRef.id, // Haal het ID op van Firestore
        name,
        address,
        postcode,
        city,
        country,
        status,
        description,
        images: [],
        lastModified: new Date().toISOString(),
        modifiedBy: "Admin",
      };

      onLocationAdded(newLocation); // Geef de nieuwe locatie terug aan Dashboard
    } catch (error) {
      console.error("Fout bij toevoegen locatie:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">➕ Nieuwe locatie toevoegen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Naam"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Adres"
          className="w-full p-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Postcode"
            className="w-1/3 p-2 border rounded"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Stad"
            className="w-1/3 p-2 border rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Land"
            className="w-1/3 p-2 border rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <textarea
          placeholder="Beschrijving"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Annuleren
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Toevoegen..." : "Opslaan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationForm;
