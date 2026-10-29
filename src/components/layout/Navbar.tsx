"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const sectionIds = ["home", "projects", "about", "contact"] as const;

export function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    function syncHash() {
      setActiveSection(window.location.hash.slice(1) || "home");
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <>
    <a href="#main-content" className="skip-link">{t.common.skipToContent}</a>
    <nav aria-label={t.nav.label} className="site-nav">
      {sectionIds.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={activeSection === id ? "location" : undefined}
          onClick={() => setActiveSection(id)}
          className={cn("nav-link", activeSection === id && "bg-vegaBlue/30 text-vegaCyan")}
        >
          {t.nav[id]}
        </a>
      ))}
      <span aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-vegaCyan/20" />
      <button
        type="button"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
        aria-label={t.nav.switchLanguage}
        lang={language === "es" ? "en" : "es"}
        className="nav-link font-mono text-vegaCyan"
      >
        {language === "es" ? "EN" : "ES"}
      </button>
    </nav>
    </>
  );
}
