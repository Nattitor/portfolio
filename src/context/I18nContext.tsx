"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

type Language = "en" | "es";

type Dictionary = typeof en;

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Default to Spanish to keep the original vibe, or we could detect navigator language
  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("portfolio-lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang);
    } else {
      // Auto-detect browser language if possible
      const browserLang = navigator.language.startsWith("es") ? "es" : "en";
      setLanguage(browserLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  const t = language === "es" ? es : en;

  // Prevent hydration mismatch by not rendering context values until mounted,
  // although for a dictionary it might not be strictly necessary if we rely on CSR,
  // but since layout wraps everything, we just render children directly. 
  // We will have a hydration mismatch if the server renders in ES and client detects EN.
  // We can suppress hydration warnings in layout.tsx.

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
