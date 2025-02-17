import React from "react";

interface LocationCardProps {
  name: string;
  address: string;
  onClick: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  address,
  onClick,
}) => {
  return (
    <div
      className="border rounded-lg p-4 shadow-md bg-white cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{address}</p>
    </div>
  );
};

export default LocationCard;
