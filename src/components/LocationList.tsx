import React from "react";
import LocationCard from "../components/LocationCard";

interface Location {
  id: string;
  name: string;
  address: string;
}

interface LocationListProps {
  locations: Location[];
  onLocationClick: (id: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  onLocationClick,
}) => {
  return (
    <div className="p-4 grid gap-4">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          name={location.name}
          address={location.address}
          onClick={() => onLocationClick(location.id)}
        />
      ))}
    </div>
  );
};

export default LocationList;
