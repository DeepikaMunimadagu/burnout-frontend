import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

function TrendsChart() {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetch("https://burnout-backend.onrender.com/burnout_trends")
      .then(res => res.json())
      .then(data => setTrendData(data));
  }, []);

  const chartData = {
    labels: trendData.map(d => d.date),
    datasets: [
      {
        label: "High Burnout",
        data: trendData.map(d => d.high),
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        fill: true,
      },
      {
        label: "Low Burnout",
        data: trendData.map(d => d.low),
        borderColor: "green",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        fill: true,
      }
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-8">
      <h3 className="pixel-font text-xl text-center mb-4 text-green-800">📈 Burnout Trends</h3>
      <Line data={chartData} />
    </div>
  );
}

export default TrendsChart;
