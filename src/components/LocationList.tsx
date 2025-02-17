import { useEffect, useState } from "react";
import { getLocations } from "../utils/getLocations";
import LocationCard from "./LocationCard";

interface Location {
  id: string;
  name: string;
  address: string;
}

interface LocationListProps {
  onLocationClick?: (id: string) => void; // Voeg de prop toe
}

export default function LocationList({ onLocationClick }: LocationListProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.error("❌ Fout bij ophalen van locaties:", err);
        setError("Kan locaties niet laden. Probeer later opnieuw.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center">🔄 Locaties laden...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (locations.length === 0)
    return <p className="text-center">❌ Geen locaties gevonden.</p>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-center">📍 Beschikbare Locaties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            name={location.name}
            address={location.address}
            onClick={() => onLocationClick?.(location.id)} // Zorg dat de prop wordt gebruikt
          />
        ))}
      </div>
    </div>
  );
}
