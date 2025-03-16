"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  // 🟢 State Variables
  const [data, setData] = useState({
    temperature: 28,
    soilMoisture: 55,
    humidity: 70,
    windSpeed: 10,
    rainfall: [15, 18, 20, 22, 24, 25, 27],
    cropHealth: "Healthy 🌱",
    sunlight: 6,
    marketPrice: { wheat: 1800, rice: 2200, maize: 2000, barley: 1600 },
    selectedCrop: "wheat",
    fertilizer: "Organic Compost",
    irrigation: "Irrigation Needed 🚰",
  });

  // 🟢 Simulated Data Fetching (Mimicking Backend Response)
  useEffect(() => {
    const fetchData = () => {
      setData((prev) => ({
        ...prev,
        temperature: parseFloat((prev.temperature + (Math.random() * 1.5 - 0.8)).toFixed(1)),
        soilMoisture: parseFloat(
          Math.max(40, Math.min(80, prev.soilMoisture + (Math.random() * 3 - 1.5))).toFixed(1)
        ),
        humidity: parseFloat(
          Math.max(50, Math.min(85, prev.humidity + (Math.random() * 2 - 1))).toFixed(1)
        ),
        windSpeed: parseFloat(
          Math.max(2, Math.min(15, prev.windSpeed + (Math.random() * 2 - 1))).toFixed(1)
        ),
        rainfall: [
          ...prev.rainfall.slice(1),
          parseFloat(
            Math.max(10, Math.min(40, prev.rainfall[prev.rainfall.length - 1] + (Math.random() * 3 - 1.5))).toFixed(1)
          ),
        ],
        sunlight: parseFloat(Math.max(4, Math.min(12, prev.sunlight + (Math.random() * 2 - 1))).toFixed(1)),
        marketPrice: {
          wheat: parseInt(Math.max(1500, Math.min(2500, prev.marketPrice.wheat + (Math.random() * 100 - 50)))),
          rice: parseInt(Math.max(1800, Math.min(2800, prev.marketPrice.rice + (Math.random() * 100 - 50)))),
          maize: parseInt(Math.max(1700, Math.min(2300, prev.marketPrice.maize + (Math.random() * 100 - 50)))),
          barley: parseInt(Math.max(1400, Math.min(2000, prev.marketPrice.barley + (Math.random() * 100 - 50)))),
        },
        irrigation: prev.soilMoisture < 50 ? "Irrigation Needed 🚰" : "Sufficient Moisture ✅",
      }));
    };

    const interval = setInterval(fetchData, 50000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🌾 Smart Agriculture Dashboard</h1>

      {/* Grid Layout for Key Data */}
      <div style={gridStyle}>
        <DataCard title="🌡 Temperature" value={`${data.temperature}°C`} />
        <DataCard title="💧 Soil Moisture" value={`${data.soilMoisture}%`} />
        <DataCard title="💨 Humidity" value={`${data.humidity}%`} />
        <DataCard title="🌬 Wind Speed" value={`${data.windSpeed} km/h`} />
        <DataCard title="🌱 Crop Health" value={data.cropHealth} highlight />
        <DataCard title="🌞 Sunlight Exposure" value={`${data.sunlight} hours`} />
        <MarketPriceCard data={data} setData={setData} />
        <DataCard title="🌿 Fertilizer Recommendation" value={data.fertilizer} />
        <DataCard title="🚰 Irrigation Suggestion" value={data.irrigation} />
      </div>

      {/* Rainfall Graph */}
      <div style={chartContainerStyle}>
        <h3 style={chartTitleStyle}>🌦 Rainfall Trends</h3>
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [
              {
                label: "Rainfall (mm)",
                data: data.rainfall,
                borderColor: "#2196F3",
                backgroundColor: "rgba(33, 150, 243, 0.2)",
                tension: 0.3,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

// 🟢 Market Price Component with Dropdown
const MarketPriceCard = ({ data, setData }) => {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: "0", fontSize: "18px", color: "#444" }}>💰 Market Price</h3>
      <select
        style={dropdownStyle}
        value={data.selectedCrop}
        onChange={(e) => setData((prev) => ({ ...prev, selectedCrop: e.target.value }))}
      >
        {Object.keys(data.marketPrice).map((crop) => (
          <option key={crop} value={crop}>
            {crop.charAt(0).toUpperCase() + crop.slice(1)}
          </option>
        ))}
      </select>
      <p style={dataStyle}>₹{data.marketPrice[data.selectedCrop]} per quintal</p>
    </div>
  );
};

// 🟢 Reusable Data Card Component
const DataCard = ({ title, value, highlight }) => {
  return (
    <div style={{ ...cardStyle, backgroundColor: highlight ? "#ffeb99" : "#fff" }}>
      <h3 style={{ margin: "0", fontSize: "18px", color: "#444" }}>{title}</h3>
      <p style={dataStyle}>{value}</p>
    </div>
  );
};

// 🌿 Styles
const dropdownStyle = {
  padding: "5px",
  fontSize: "16px",
  marginBottom: "5px",
};

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: "#f4f9f4",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#2d6a4f",
  fontSize: "32px",
  fontWeight: "bold",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: "#fff",
};

const dataStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#333",
};

const chartContainerStyle = {
  width: "80%",
  maxWidth: "600px",
  marginTop: "20px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const chartTitleStyle = {
  textAlign: "center",
  fontSize: "20px",
  color: "#333",
  marginBottom: "10px",
};

export default Dashboard;
