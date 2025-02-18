import React, { useState } from "react";
import Fuse from "fuse.js";
import { Location } from "../types/types";
import { FaSearch } from "react-icons/fa"; // Zoekicoontje

interface SearchBarProps {
  locations: Location[];
  onSearchResults: (results: Location[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearchResults,
}) => {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(locations, {
    keys: ["name", "city"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      onSearchResults(locations);
    } else {
      const results = fuse.search(searchQuery).map((result) => result.item);
      onSearchResults(results);
    }
  };

  return (
    <div className="relative w-full max-w-[600px] mb-4">
      {" "}
      {/* Maak even breed als de tabel */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Zoek locatie of plaats..."
        className="p-2 pl-10 border rounded w-full"
      />
    </div>
  );
};

export default SearchBar;
