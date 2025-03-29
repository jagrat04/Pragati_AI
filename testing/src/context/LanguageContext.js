"use client";

import { createContext, useState, useEffect, useContext } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

// Store translations
const translations = { en, hi };

// Create context
export const LanguageContext = createContext();

// Custom hook for using LanguageContext
export function useLanguage() {
  return useContext(LanguageContext);
}

// Language Provider Component
export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setLocale(savedLang);
  }, []);

  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setLocale(lang);
  };

  return (
    <LanguageContext.Provider value={{ locale, translations: translations[locale], changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
