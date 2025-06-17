// src/TrendsChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
);

function TrendsChart() {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetch("https://burnout-backend.onrender.com/burnout_trends")
      .then((res) => res.json())
      .then((data) => setTrendData(data))
      .catch((err) => console.error("Error fetching trends:", err));
  }, []);

  const chartData = {
    labels: trendData.map((d) => d.date),
    datasets: [
      {
        label: "High Burnout",
        data: trendData.map((d) => d.high),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Low Burnout",
        data: trendData.map((d) => d.low),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  return (
    <div className="mt-8 p-4 bg-white shadow rounded">
      <h3 className="text-xl font-bold mb-4 text-green-800">📊 Burnout Trends</h3>
      <Line data={chartData} />
    </div>
  );
}

export default TrendsChart;
