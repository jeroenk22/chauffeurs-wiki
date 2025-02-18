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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📍 Locaties Dashboard</h1>
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications}
            </span>
          )}
        </div>
      </div>
      <div className="overflow-x-auto max-h-[70vh]">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              {[
                { label: "Naam", key: "name" },
                { label: "Adres", key: "address" },
                { label: "Postcode", key: "postcode" },
                { label: "Plaats", key: "city" },
                { label: "Land", key: "country" },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  className="border p-2 cursor-pointer hover:bg-gray-200"
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
              <th className="border p-2">Acties</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="border p-2">{loc.name}</td>
                <td className="border p-2">{loc.address}</td>
                <td className="border p-2">{loc.postcode}</td>
                <td className="border p-2">{loc.city}</td>
                <td className="border p-2">{loc.country}</td>
                <td className="border p-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
