import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaBell, FaEdit } from "react-icons/fa";

interface Location {
  id: string; // Automatisch toegekend door Firestore
  name: string; // Verplicht veld
  address: string; // Verplicht veld
  status: string; // Active of Deleted
  postcode: string; // Verplicht veld
  city: string; // Verplicht veld
  country: string; // Verplicht veld
  description: string; // Verplicht veld (lange tekst)
  images: string[]; // Geen verplicht veld
  lastModified: string; // Timestamp wanneer Location wordt gewijzigd
  modifiedBy: string; // Verplicht veld
  LatLngNewEntry?: { lat: number; lng: number }; // Coördinaten bij nieuwe invoer
  LatLngLastModified?: { lat: number; lng: number }; // Coördinaten bij wijziging
}

const Dashboard: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const fetchLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const locationData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Location[];
      setLocations(locationData);
      setNotifications(
        locationData.filter((loc) => loc.status === "pending").length
      );
      setLoading(false);
    };
    fetchLocations();
  }, []);

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
      <table className="w-full border-collapse border border-gray-300">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="border p-2">Naam</th>
            <th className="border p-2">Adres</th>
            <th className="border p-2">Postcode</th>
            <th className="border p-2">Plaats</th>
            <th className="border p-2">Land</th>
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
  );
};

export default Dashboard;
