"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  // 🟢 Input Variables (Structured for API Integration Later)
  const [data, setData] = useState({
    temperature: 28,
    soilMoisture: 55,
    humidity: 70,
    windSpeed: 10,
    rainfall: [15, 18, 20, 22, 24, 25, 27],
    cropHealth: "Healthy 🌱",
    soilPH: 6.5,
    sunlight: 6,
    marketPrice: { wheat: 1800, rice: 2200 },
    pestAlert: "No Alert ✅",
    fertilizer: "Organic Compost",
    irrigation: "Irrigation Needed 🚰",
  });

  // 🟢 Simulated Data Fetching (Mimicking Backend Response)
  useEffect(() => {
    const fetchData = () => {
      setData((prev) => ({
        ...prev,
        temperature: parseFloat(prev.temperature) + (Math.random() * 1.5 - 0.8),
        soilMoisture: Math.max(40, Math.min(80, prev.soilMoisture + (Math.random() * 3 - 1.5))),
        humidity: Math.max(50, Math.min(85, prev.humidity + (Math.random() * 2 - 1))),
        windSpeed: Math.max(2, Math.min(15, prev.windSpeed + (Math.random() * 2 - 1))),
        rainfall: [
          ...prev.rainfall.slice(1),
          Math.max(10, Math.min(40, prev.rainfall[prev.rainfall.length - 1] + (Math.random() * 3 - 1.5))),
        ],
        soilPH: parseFloat((prev.soilPH + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        sunlight: Math.max(4, Math.min(12, prev.sunlight + (Math.random() * 2 - 1))),
        marketPrice: {
          wheat: Math.max(1500, Math.min(2500, prev.marketPrice.wheat + (Math.random() * 100 - 50))),
          rice: Math.max(1800, Math.min(2800, prev.marketPrice.rice + (Math.random() * 100 - 50))),
        },
        pestAlert: Math.random() > 0.85 ? "High Risk 🚨" : "No Alert ✅",
        fertilizer: prev.soilPH < 5.5 ? "Lime" : prev.soilPH > 7.5 ? "Sulfur" : "Organic Compost",
        irrigation: prev.soilMoisture < 50 ? "Irrigation Needed 🚰" : "Sufficient Moisture ✅",
      }));
    };

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🌾 Smart Agriculture Dashboard</h1>

      {/* Grid Layout for Key Data */}
      <div style={gridStyle}>
        <DataCard title="🌡 Temperature" value={`${data.temperature.toFixed(1)}°C`} />
        <DataCard title="💧 Soil Moisture" value={`${data.soilMoisture}%`} />
        <DataCard title="💨 Humidity" value={`${data.humidity}%`} />
        <DataCard title="🌬 Wind Speed" value={`${data.windSpeed} km/h`} />
        <DataCard title="🌱 Crop Health" value={data.cropHealth} highlight />
        <DataCard title="⚖ Soil pH Level" value={`${data.soilPH}`} />
        <DataCard title="🌞 Sunlight Exposure" value={`${data.sunlight} hours`} />
        <DataCard title="🚨 Pest Alert" value={data.pestAlert} highlight={data.pestAlert.includes("High")} />
        <DataCard title="💰 Market Price (Wheat)" value={`₹${data.marketPrice.wheat} per quintal`} />
        <DataCard title="💰 Market Price (Rice)" value={`₹${data.marketPrice.rice} per quintal`} />
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
  width: "100%",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  width: "90%",
  maxWidth: "1200px",
  padding: "10px",
};

const cardStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const dataStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#333",
};

const chartContainerStyle = {
  marginTop: "30px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#fff",
  width: "90%",
  maxWidth: "1200px",
};

const chartTitleStyle = {
  marginBottom: "10px",
  color: "#444",
};

export default Dashboard;
