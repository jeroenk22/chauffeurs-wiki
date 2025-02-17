import React, { useState } from "react";
import LocationList from "../components/LocationList";

const dummyLocations = [
  { id: "1", name: "Bedrijf A", address: "Straat 1, Amsterdam" },
  { id: "2", name: "Bedrijf B", address: "Straat 2, Rotterdam" },
];

const Dashboard: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <LocationList
        locations={dummyLocations}
        onLocationClick={setSelectedLocation}
      />
      {selectedLocation && (
        <p className="mt-4">Geselecteerde locatie: {selectedLocation}</p>
      )}
    </div>
  );
};

export default Dashboard;
