"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

const getGreetingKey = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning_greeting";
  if (hour < 17) return "afternoon_greeting";
  if (hour < 20) return "evening_greeting";
  return "night_greeting";
};

export default function Home() {
  const greetingKey = getGreetingKey();
  const { translations } = useLanguage();

  return (
    <div className="relative flex min-h-screen items-center justify-center text-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videoplayback.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 max-w-lg md:max-w-2xl border border-white/30 w-full mx-4"
      >
        {/* Hero Section */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-100 mb-4 drop-shadow-lg neon-text">
              {translations.ai_in_agriculture}
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 mb-6 font-medium animate-fade-in">
        {translations[greetingKey]} {translations.welcome_message}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-6 space-y-4 sm:space-y-0 w-full">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/Features"
              className="relative px-6 sm:px-8 py-3 bg-green-500 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-green-500/50"
            >
              {translations.explore_features}
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="sm:ml-auto">
            <Link
              href="/dashboard"
              className="relative px-6 sm:px-8 py-3 bg-blue-500 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/50"
            >
              {translations.view_dashboard}
            </Link>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
