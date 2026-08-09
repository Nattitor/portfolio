"use client";

import React, { createContext, useContext, useState } from "react";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

type Language = "en" | "es";

type Dictionary = typeof en;

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
  mounted: boolean;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ 
  children,
  initialLanguage = "es"
}: { 
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    document.cookie = `portfolio-lang=${lang}; path=/; max-age=31536000`;
  };

  const t = language === "es" ? es : en;

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t, mounted: true }}>
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
