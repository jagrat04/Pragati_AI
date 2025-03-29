"use client";

import Link from "next/link";
import { FaTractor } from "react-icons/fa"; // Importing a tractor icon
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { translations } = useLanguage();
  return (
    <footer className="w-full text-white p-6 text-center bg-gradient-to-b from-green-500 to-green-700 relative shadow-lg">
      {/* Tractor Icon */}
      <div className="flex justify-center items-center space-x-2">
        <FaTractor className="text-white text-2xl" />
        <p className="text-lg font-semibold">{translations.empowering_farmers}</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-3 space-x-6">
        <Link href="/about" className="hover:underline">{translations.about_us}</Link>
        <Link href="/contact" className="hover:underline">{translations.contact}</Link>
        <Link href="/resources" className="hover:underline">{translations.resources}</Link>
      </nav>

      {/* Footer Text */}
      <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} pragatiAI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
