import React from "react";
import { FaBell } from "react-icons/fa";

interface HeaderProps {
  notifications: number;
}

const Header: React.FC<HeaderProps> = ({ notifications }) => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Chauffeurs-Wiki</h1>
      <div className="relative">
        {/* Voeg data-testid toe voor de bel-icoon */}
        <FaBell
          data-testid="notification-bell"
          className="text-white text-2xl"
        />
        {notifications > 0 && (
          <span
            data-testid="notification-badge"
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
          >
            {notifications}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
