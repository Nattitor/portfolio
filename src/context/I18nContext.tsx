"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { dictionaries, languageCookie, type Dictionary, type Language } from "@/lib/i18n";

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, initialLanguage }: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  const [language, setLanguage] = useState(initialLanguage);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    const { title, description } = dictionaries[nextLanguage].metadata;
    document.title = title;
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute("content", title);
    }
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute("content", description);
    }
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", nextLanguage === "es" ? "es_AR" : "en_US");
    document.cookie = `${languageCookie}=${nextLanguage}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage, t: dictionaries[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n requires I18nProvider");
  return context;
}
