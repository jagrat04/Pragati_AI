"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const { locale, changeLanguage, translations } = useLanguage();
  const pathname = usePathname();
  
  // Check if the current page is the home page
  const isHomePage = pathname === "/";

  return (
    <header style={{
      ...headerStyle, 
      backgroundColor: isHomePage ? "transparent" : "rgba(255, 255, 255, 0.2)", 
      backdropFilter: isHomePage ? "none" : "blur(10px)",
      WebkitBackdropFilter: isHomePage ? "none" : "blur(10px)", // For Safari support
    }}>
      <h1 style={logoStyle}>🌾 pragatiAI</h1>
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>{translations.home}</Link>
        <Link href="/Features" style={linkStyle}>{translations.features}</Link>
        <Link href="/dashboard" style={linkStyle}>{translations.dashboard}</Link>
        <Link href="/about" style={linkStyle}>{translations.about}</Link>

        {/* Language Switcher */}
        <select style={dropdownStyle} value={locale} onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </nav>
    </header>
  );
};

// Styles
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  position: "fixed",
  width: "100%",
  zIndex: 50,
  transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
};

const navStyle = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "16px",
};

const dropdownStyle = {
  fontSize: "14px",
  padding: "5px",
  borderRadius: "5px",
  border: "1px solid #333",
  cursor: "pointer",
  backgroundColor: "transparent",
  color: "#333",
};

export default Header;
