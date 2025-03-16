"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning! ☀️");
    else if (hour < 18) setGreeting("Good Afternoon! 🌤");
    else setGreeting("Good Evening! 🌙");
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-6">
      {/* Hero Section */}
      <h1 className="text-5xl font-bold text-green-700 mb-4">
        🌾 AI Agriculture App
      </h1>
      <p className="text-xl text-gray-700 mb-6">{greeting} Welcome to the future of farming! 🚜</p>

      {/* CTA Buttons */}
      <div className="flex space-x-4">
        <Link
          href="/Features"
          className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Explore Features
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          View Dashboard
        </Link>
      </div>

      {/* Image or Illustration */}
      <img
        src="https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Agriculture"
        className="mt-8 rounded-lg shadow-md h-[500px] w-[600px]"
      />
    </div>
  );
}
