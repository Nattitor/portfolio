"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const sectionIds = ["home", "projects", "about", "contact"] as const;

export function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollHidden, setScrollHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function syncHash() {
      setActiveSection(window.location.hash.slice(1) || "home");
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let travel = 0;
    let frame = 0;

    function updateVisibility() {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - lastY;
      lastY = y;

      // Keep keyboard focus visible; pointer focus must not pin the bar open.
      if (y <= 48 || navRef.current?.querySelector(":focus-visible")) {
        travel = 0;
        setScrollHidden(false);
        return;
      }
      if (delta === 0) return;

      // Accumulate small movements, resetting when direction changes to avoid jitter.
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (Math.abs(travel) < 12) return;
      setScrollHidden(travel > 0 && y > 150);
      travel = 0;
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab") {
        travel = 0;
        setScrollHidden(false);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">{t.common.skipToContent}</a>
      <nav
        ref={navRef}
        aria-label={t.nav.label}
        className="site-nav"
        data-scroll-hidden={scrollHidden}
        onFocusCapture={() => setScrollHidden(false)}
      >
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
