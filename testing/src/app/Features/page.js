"use client";
import React, { useState, useEffect } from "react";

const Features = () => {
  const [weather, setWeather] = useState(null);

  // Fetch Weather API (Placeholder for now)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=acbdcac990e84326a36204946251203&q=Delhi`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Weather API Error:", error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
        🚀 AI Agriculture Features
      </h1>

      {/* Weather Forecast Section */}
      <div className="bg-white shadow-md rounded-lg p-4 text-black">
        <h2 className="text-2xl font-semibold mb-2">🌦 Live Weather Forecast</h2>
        {weather ? (
          <p className="text-lg">
            {weather.location.name}, {weather.location.country}: {weather.current.temp_c}°C, {weather.current.condition.text}
          </p>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
      
      {/* More Features will go here */}
    </div>
  );
};

export default Features;
