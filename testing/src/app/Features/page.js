"use client";
import React, { useState, useEffect } from "react";
import CNNInputField from "./components/input";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

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
      {/* Title Animation */}
      <motion.h1 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-green-700 mb-6 mt-10"
      >
        🚀 pragatiAI {translations.features}
      </motion.h1>

      {/* Weather Forecast Section Animation */}
      <motion.div
        whileHover={{ scale: 1.02 }} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-l from-[#ffecd2] to-[#fcb69f] shadow-md rounded-lg p-4 text-black"
        style={{ textAlign: "center", padding: "20px", marginTop: "25px" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold mb-2"
        >
          🌦 {translations.weather}
        </motion.h2>

        {/* Datalist Input */}
        <input
          list="locations"
          id="state"
          className="w-full max-w-xs p-3 rounded-md mb-4 border border-gray-400 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all mx-auto"
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg"
          >
            {weather.location.name}, {weather.location.country}: {weather.current.temp_c}°C, {weather.current.condition.text}
          </motion.p>
        ) : (
          <p>Loading weather data...</p>
        )}
      </motion.div>

      {/* CNN Input Field Animation */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CNNInputField />
      </motion.div>

      {/* More Features will go here */}
    </div>
  );
};

export default Features;
