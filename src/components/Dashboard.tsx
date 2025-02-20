import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaSortUp, FaSortDown, FaPlus } from "react-icons/fa";
import { sortTableData } from "../utils/tableSort";
import SearchBar from "./SearchBar";
import { Location } from "../types/types";
import AddLocationForm from "../components/AddLocationForm";
import { convertToDutchTime } from "../utils/formatDate";
import Button from "./Button";

const Dashboard: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<keyof Location>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const locationData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Location[];

      setLocations(locationData);
      setFilteredLocations(locationData);
      setLoading(false);
    };
    fetchLocations();
  }, []);

  const handleSort = (column: keyof Location) => {
    if (!column) return;

    const newOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);

    setFilteredLocations((prevLocations) =>
      sortTableData(prevLocations, column, newOrder)
    );
  };

  if (loading) return <p className="text-center">🔄 Laden...</p>;

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar met locaties (30%) */}
      <div className="w-3/10 bg-gray-100 p-4 overflow-y-auto h-full">
        <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
          📍 Locaties
          <Button
            onClick={() => {
              setSelectedLocation(null);
              setIsAddingLocation(true);
            }}
            ariaLabel="Voeg nieuwe locatie toe"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center text-lg"
          >
            <FaPlus className="mr-1" /> Nieuwe locatie
          </Button>
        </h2>

        <SearchBar
          locations={locations}
          onSearchResults={setFilteredLocations}
        />

        <div className="overflow-y-auto max-h-[80vh]">
          <table className="w-full border-collapse border border-gray-300 table-fixed">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                {[
                  { label: "Naam", key: "name" },
                  { label: "Plaats", key: "city" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="border p-2 cursor-pointer hover:bg-gray-300 w-1/2"
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
              {filteredLocations.map((loc) => (
                <tr
                  key={loc.id}
                  className="hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setIsAddingLocation(false);
                    setSelectedLocation(loc);
                  }}
                >
                  <td className="border p-2 truncate w-1/2">{loc.name}</td>
                  <td className="border p-2 truncate w-1/2">{loc.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailweergave (70%) */}
      <div className="w-7/10 p-6 overflow-y-auto bg-white shadow-md rounded-lg h-full">
        {isAddingLocation ? (
          <AddLocationForm
            onCancel={() => setIsAddingLocation(false)}
            onLocationAdded={(newLocation) => {
              setLocations((prev) => [...prev, newLocation]);
              setFilteredLocations((prev) => [...prev, newLocation]);
              setIsAddingLocation(false);
            }}
          />
        ) : selectedLocation ? (
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
              Laatst gewijzigd:{" "}
              {convertToDutchTime(selectedLocation.lastModified)}
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
