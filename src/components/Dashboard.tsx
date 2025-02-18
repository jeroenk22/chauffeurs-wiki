import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaBell, FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";

interface Location {
  id: string;
  name: string;
  address: string;
  status: string;
  postcode: string;
  city: string;
  country: string;
  description: string;
  images: string[];
  lastModified: string;
  modifiedBy: string;
  LatLngNewEntry?: { lat: number; lng: number };
  LatLngLastModified?: { lat: number; lng: number };
}

const Dashboard: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof Location>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    const fetchLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const locationData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Location[];
      setLocations(locationData.sort((a, b) => a.name.localeCompare(b.name)));
      setNotifications(
        locationData.filter((loc) => loc.status === "pending").length
      );
      setLoading(false);
    };
    fetchLocations();
  }, []);

  const handleSort = (column: keyof Location) => {
    const newOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);

    setLocations((prevLocations) =>
      [...prevLocations].sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return newOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return 0; // Geen sortering toepassen voor niet-string waarden
      })
    );
  };

  if (loading) return <p className="text-center">🔄 Laden...</p>;

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar met locaties */}
      <div className="w-1/5 bg-gray-100 p-4 overflow-y-auto h-full">
        <h2 className="text-xl font-bold mb-4">📍 Locaties</h2>
        <div className="overflow-y-auto max-h-[80vh]">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                {[
                  { label: "Naam", key: "name" },
                  { label: "Plaats", key: "city" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="border p-2 cursor-pointer hover:bg-gray-300"
                    onClick={() => handleSort(key as keyof Location)}
                  >
                    {label}{" "}
                    {sortColumn === key &&
                      (sortOrder === "asc" ? (
                        <FaSortUp className="inline ml-1" />
                      ) : (
                        <FaSortDown className="inline ml-1" />
                      ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr
                  key={loc.id}
                  className="hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedLocation(loc)}
                >
                  <td className="border p-2">{loc.name}</td>
                  <td className="border p-2">{loc.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailweergave in het rechtergedeelte */}
      <div className="w-4/5 p-6 overflow-y-auto bg-white shadow-md rounded-lg h-full">
        {selectedLocation ? (
          <div>
            <h1 className="text-3xl font-bold mb-2">{selectedLocation.name}</h1>
            <p className="text-gray-600 text-lg">
              {selectedLocation.address}, {selectedLocation.city},{" "}
              {selectedLocation.country}
            </p>
            <p className="mt-4 text-gray-700">
              {selectedLocation.description || "Geen beschrijving beschikbaar"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Laatst gewijzigd: {selectedLocation.lastModified}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            Selecteer een locatie om details te bekijken
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
