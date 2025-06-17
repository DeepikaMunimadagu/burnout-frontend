import React, { useEffect, useState } from "react";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("https://burnout-backend.onrender.com/leaderboard");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
    setLoading(false);
  };

  const downloadCSV = async () => {
    try {
      const response = await fetch("https://burnout-backend.onrender.com/download_csv");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "burnout_predictions.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl pixel-font mb-4 text-green-800 text-center">🏆 Leaderboard</h2>
      <button
        onClick={downloadCSV}
        className="minecraft-btn bg-green-700 text-white px-4 py-2 rounded mb-4"
      >
        ⬇ Download CSV
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border border-green-600 text-sm">
            <thead className="bg-green-200 text-green-900">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Risk</th>
                <th className="border px-2 py-1">Message</th>
                <th className="border px-2 py-1">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-2 py-1">{entry.name}</td>
                  <td className={`border px-2 py-1 ${entry.burnout_risk ? "text-red-600" : "text-green-600"}`}>
                    {entry.burnout_risk ? "High" : "Low"}
                  </td>
                  <td className="border px-2 py-1">{entry.message}</td>
                  <td className="border px-2 py-1">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
