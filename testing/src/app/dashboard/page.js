'use client';

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { color } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

const Dashboard = () => {
  const { translations } = useLanguage();
  
  const [data, setData] = useState({
    temperature: 28,
    soilMoisture: 55,
    humidity: 70,
    windSpeed: 10,
    rainfall: [15, 18, 20, 22, 24, 25, 27],
    cropHealth: "Healthy ",
    sunlight: 6,
    marketPrice: { wheat: 1800, rice: 2200, maize: 2000, barley: 1600 },
    selectedCrop: "wheat",
    fertilizer: "Organic Compost",
    irrigation: "Irrigation Needed ",
  });

  useEffect(() => {
    const defaultValues = {
      temperature: 28 + Math.random() * 5 - 2.5,  // Random ±2.5°C
      soilMoisture: 50 + Math.random() * 20 - 10, // Random 40-60%
      humidity: 65 + Math.random() * 10 - 5,      // Random 60-70%
      windSpeed: 8 + Math.random() * 4 - 2,       // Random 6-10 km/h
      rainfall: [10, 15, 20, 18, 25, 22, 30],    // Pre-set pattern
      cropHealth: "Healthy",
      sunlight: 6 + Math.random() * 2 - 1,       // Random 5-7 hrs
      marketPrice: { wheat: 1800, rice: 2200, maize: 2000, barley: 1600 },
      selectedCrop: "wheat",
      fertilizer: "Organic Compost",
      irrigation: "Sufficient Moisture",
    };
  
    const fetchData = () => {
      setData((prev) => {
        // Use default values if no existing value
        const newData = { ...defaultValues, ...prev };
  
        // Simulate some fluctuations
        newData.temperature = parseFloat((newData.temperature + (Math.random() * 1.5 - 0.8)).toFixed(1));
        newData.windSpeed = parseFloat(Math.max(2, Math.min(15, newData.windSpeed + (Math.random() * 2 - 1))).toFixed(1));
        newData.humidity = parseFloat(Math.max(50, Math.min(85, newData.humidity + (Math.random() * 2 - 1))).toFixed(1));
        newData.soilMoisture = parseFloat(Math.max(30, Math.min(85, newData.soilMoisture + newData.rainfall[newData.rainfall.length - 1] * 0.1 - newData.temperature * 0.3)).toFixed(1));
        newData.rainfall = [...newData.rainfall.slice(1), parseFloat(Math.max(10, Math.min(40, newData.rainfall[newData.rainfall.length - 1] + (Math.random() * 3 - 1.5))).toFixed(1))];
  
        // Update Crop Health
        newData.cropHealth = newData.soilMoisture < 40 || newData.soilMoisture > 75 ? "At Risk" : "Healthy";
        if (newData.soilMoisture < 30 || newData.temperature > 38) newData.cropHealth = "Unhealthy";
  
        // Fertilizer Suggestion
        newData.fertilizer = newData.cropHealth === "At Risk" ? "NPK Fertilizer" : "Organic Compost";
        if (newData.cropHealth === "Unhealthy") newData.fertilizer = "Soil Conditioner";
  
        // Irrigation Decision
        newData.irrigation = newData.soilMoisture < 50 ? "Irrigation Needed" : "Sufficient Moisture";
  
        return newData;
      });
    };
  
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div style={containerStyle}>
      <div style={backgroundPatternStyle}></div>
      <h1 style={titleStyle}>🌾 {translations.dashboard_page}</h1>

      <div style={gridStyle}>
        <DataCard title=" Temp" value={`${data.temperature}°C`} icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/WhatsApp_Image_2025-03-18_at_03.26.25_2b5790ef-removebg-preview.png" gridArea="temperature" gradient="linear-gradient(135deg, #fceabb, #f8b500)" />
        <DataCard title=" Soil Moisture" value={`${data.soilMoisture}%`} icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/WhatsApp_Image_2025-03-18_at_03.26.51_f298c153-removebg-preview.png" gridArea="soilMoisture" gradient="linear-gradient(135deg, #a8edea, #fed6e3)" />
        <DataCard title=" Humid" value={`${data.humidity}%`} icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/WhatsApp_Image_2025-03-18_at_03.30.57_639b6bf3-removebg-preview.png" gridArea="humidity" gradient="linear-gradient(135deg, #e0c3fc, #8ec5fc)" />
        <DataCard title=" Wind" value={`${data.windSpeed} km/h`} icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/WhatsApp_Image_2025-03-18_at_03.23.35_109d1196-removebg-preview.png" gridArea="windSpeed" gradient="linear-gradient(135deg, #c2e59c, #64b3f4)" />
        <DataCard title=" Health" value={data.cropHealth} highlight icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/WhatsApp_Image_2025-03-18_at_01.34.59_e09b6a0a-removebg-preview.png" gridArea="cropHealth" gradient="linear-gradient(135deg, #f6d365, #fda085)" />
        <DataCard title=" Light" value={`${data.sunlight} hrs`} icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/813e9acc0988ffdc55c7b05052f1aef6-removebg-preview.png" gridArea="sunlight" gradient="linear-gradient(135deg, #ffecd2, #fcb69f)" />
        <MarketPriceCard data={data} setData={setData} gridArea="marketPrice" />
        <DataCard title=" Fert" value={data.fertilizer} icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/image-removebg-preview%20(8).png" gridArea="fertilizer" gradient="linear-gradient(135deg, #d4fc79, #96e6a1)" />
        <DataCard title=" Irrigate" value={data.irrigation} icon="https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/media/image-removebg-preview%20(7).png" gridArea="irrigation" gradient="linear-gradient(135deg, #84fab0, #8fd3f4)" />
      </div>

      <div style={chartContainerStyle}>
        <h3 style={chartTitleStyle}> Rainfall Trends</h3>
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [
              {
                label: "Rainfall (mm)",
                data: data.rainfall,
                borderColor: "#3498db",
                backgroundColor: "rgba(52, 152, 219, 0.2)",
                tension: 0.3,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const MarketPriceCard = ({ data, setData }) => {
  return (
    <div style={marketCardStyle}>
      <h3 style={{ margin: "0", fontSize: "20px", color: "#333", marginBottom: '10px' }}>💰 Market Price</h3>
      <select
        className=" text-black"
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
      <p style={marketDataStyle}>₹{data.marketPrice[data.selectedCrop]} per quintal</p>
    </div>
  );
};

const DataCard = ({ title, value, highlight, icon, gridArea, gradient }) => {
  return (
    <div style={{ ...dataCardStyle, background: gradient, gridArea }}>
      <img className="h-17 w-17" src={icon} />
      <h3 style={{ margin: "10px 0", fontSize: "20px", color: "#333" }}>{title}</h3>
      <p style={dataValueStyle}>{value}</p>
    </div>
  );
};

const dropdownStyle = {
  padding: "10px",
  fontSize: "16px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  backgroundColor: '#f9f9f9',
};

const containerStyle = {
  padding: "30px",
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  width: "100vw",
  minHeight: "100vh",
  background: "#f9f9f9", // Light base
  backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23e8f5e9" fill-opacity="0.4"%3E%3Cpath d="M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.41L38.59 40l1.41-1.41L1.41 0H0v1.41z"/%3E%3Cpath d="M0 24.93l2.83-2.83 1.41 1.41L1.41 26.34h-1.41v-1.41zM38.59 0l-2.83 2.83 1.41 1.41L40 1.41V0h-1.41z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`, // Light texture
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
};

const backgroundPatternStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  opacity: 0.1,
  backgroundImage: `
    radial-gradient(circle, rgba(144, 238, 144, 0.1) 0%, transparent 40%),
    radial-gradient(circle, rgba(173, 216, 230, 0.1) 0%, transparent 40%)
  `,
  backgroundSize: "400px 400px, 300px 300px",
  backgroundPosition: "0 0, 100% 100%",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  color:"#27ae60",
  fontSize: "36px",
  fontWeight: "600",
  letterSpacing: "1px",
  marginTop: "15px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gridTemplateAreas: `
    "temperature soilMoisture humidity"
    "windSpeed cropHealth sunlight"
    "marketPrice fertilizer irrigation"
  `,
  gap: "25px",
  justifyContent: "center",
  alignItems: "stretch",
  width: "90%",
  maxWidth: "1200px",
};

const dataCardStyle = {
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
  }
};

const marketCardStyle = {
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: '#f9f9f9',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
  }
};

const chartContainerStyle = {
  width: "100%",
  maxWidth: "800px",
  marginTop: "30px",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  gridColumn: "span 2",
};

const dataValueStyle = {
  fontSize: "26px",
  fontWeight: "600",
  color: "#333",
  marginTop: "10px",
};

const marketDataStyle = {
  fontSize: "24px",
  fontWeight: "500",
  color: "#333",
  marginTop: "10px",
};

const chartTitleStyle = {
  textAlign: "center",
  fontSize: "24px",
  color: "#333",
  marginBottom: "15px",
  fontWeight: "500"
};

export default Dashboard;