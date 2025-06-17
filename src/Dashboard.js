import React from "react";
import TrendsChart from "./TrendsChart";

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl pixel-font mb-6 text-green-800 text-center">📊 Dashboard</h2>
      <TrendsChart />
    </div>
  );
}

export default Dashboard;
