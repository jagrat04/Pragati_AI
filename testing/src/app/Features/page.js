"use client";
import React, { useState, useEffect } from "react";
import CNNInputField from "./components/input";

import { useLanguage } from "@/context/LanguageContext";

const Features = () => {
  const [weather, setWeather] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const { translations } = useLanguage();

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
        🚀 pragatiAI {translations.features}
      </h1>

      {/* Weather Forecast Section */}
      <div className=" bg-gradient-to-l from-[#ffecd2] to-[#fcb69f] shadow-md rounded-lg p-4 text-black" style={{ textAlign: "center", padding: "20px", marginTop: "25px" }} >
        <h2 className="text-2xl font-semibold mb-2">🌦 {translations.weather}</h2>

        {/* Datalist Input */}
        <input
          list="locations"
          id="state"
          className="border p-2 rounded mb-4 cursor-pointer"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          placeholder="Select or type a city..."
          autoComplete="off" // Prevents browser autofill issues
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
