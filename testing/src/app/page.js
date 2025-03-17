"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning! ");
    else if (hour < 18) setGreeting("Good Afternoon! ");
    else setGreeting("Good Evening! ");
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center text-center p-6 bg-gradient-to-br from-green-600 via-green-300 to-green-100 animate-gradient">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-green-800 opacity-30 blur-3xl"></div>

      {/* Glassmorphism Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-2xl border border-white/30"
      >
        {/* Hero Section */}
        <h1 className="text-6xl font-extrabold text-green-100 mb-4 drop-shadow-lg neon-text">
          AI in Agriculture
        </h1>
        <p className="text-xl text-gray-100 mb-6 font-medium animate-fade-in">
          {greeting} Welcome to the future of farming!
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/Features"
              className="relative px-8 py-3 bg-green-500 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-green-500/50"
            >
              Explore Features
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/dashboard"
              className="relative px-8 py-3 bg-blue-500 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/50 align -right-28" 
            >
              View Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Parallax Image Effect */}
    </div>
  );
}
