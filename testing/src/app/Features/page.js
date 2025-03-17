"use client";
import React, { useState, useEffect } from "react";
import CNNInputField from "./components/input";

const Features = () => {
  const [weather, setWeather] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Delhi");

  // Fetch Weather API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = selectedLocation.trim() === "" ? "Delhi" : selectedLocation; // Default to Delhi if empty
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=acbdcac990e84326a36204946251203&q=${location},India`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Weather API Error:", error);
      }
    };

    fetchWeather();
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
        🚀 AI Agriculture Features
      </h1>

      {/* Weather Forecast Section */}
      <div className=" bg-gradient-to-l from-[#ffecd2] to-[#fcb69f] shadow-md rounded-lg p-4 text-black" >
        <h2 className="text-2xl font-semibold mb-2">🌦 Live Weather Forecast</h2>
        
        {/* Datalist Input */}
        <input
          list="locations"
          id="state"
          className="border p-2 rounded mb-4"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          placeholder="Select a city..."
        />
        <datalist id="locations">
          <option value="Delhi"></option>
          <option value="Gurgaon"></option>
          <option value="Lucknow"></option>
          <option value="Mumbai"></option>
        </datalist>

        {/* Weather Display */}
        {weather ? (
          <p className="text-lg">
            {weather.location.name}, {weather.location.country}: {weather.current.temp_c}°C, {weather.current.condition.text}
          </p>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>

      <CNNInputField />
      {/* More Features will go here */}
    </div>
  );
};

export default Features;
