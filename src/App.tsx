import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header notifications={0} />
      <Dashboard />
    </div>
  );
};

export default App;
