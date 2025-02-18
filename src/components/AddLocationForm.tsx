import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Location } from "../types/types";
import FormInput from "./FormInput";
import Button from "./Button";

interface AddLocationFormProps {
  onLocationAdded: (newLocation: Location) => void;
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
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [locationStatus, setLocationStatus] = useState("active");

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
        locationStatus, // ✅ Gebruik de nieuwe naam
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
        locationStatus, // ✅ Correcte naam in object
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

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">➕ Nieuwe locatie toevoegen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
