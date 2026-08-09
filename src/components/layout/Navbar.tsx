"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useI18n } from "@/context/I18nContext";

export function Navbar() {
  const [active, setActive] = useState<string>("Home");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { t, language, setLanguage } = useI18n();

  const translatedNavLinks = useMemo(() => [
    { name: "Home", label: t.nav.home, href: "#home" },
    { name: "Projects", label: t.nav.projects, href: "#projects" },
    { name: "About", label: t.nav.about, href: "#about" },
  ], [t.nav.home, t.nav.projects, t.nav.about]);

  // 1. Smart Floating: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Get the previous value directly from Framer Motion (without depending on React state)
    const previous = scrollY.getPrevious() || 0;

    // 1. Bounce protection (Top): If we are at the top or negative (pull-to-refresh)
    if (latest <= 0) {
      setHidden(false);
      return;
    }

    // 2. Upward fluidity: If current value is less than previous, user is scrolling up
    if (latest < previous) {
      setHidden(false);
    } 
    // 3. Downward threshold: Only hide if scrolling down AND crossed the 150px barrier
    else if (latest > previous && latest > 150) {
      setHidden(true);
    }
  });

  // 2. Scroll Spy: Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActive((prev) => prev !== "Home" ? "Home" : prev);
        return;
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActive((prev) => prev !== "About" ? "About" : prev);
        return;
      }

      const sections = translatedNavLinks
        .map((link) => document.querySelector(link.href))
        .filter((el): el is HTMLElement => el !== null);

      let currentActive = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3) {
          const match = translatedNavLinks.find((link) => link.href === `#${section.id}`);
          if (match) currentActive = match.name;
        }
      }

      if (currentActive) {
        setActive((prev) => prev !== currentActive ? currentActive : prev);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [translatedNavLinks]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      // New ultra-safe centering without translate-x that prevents 0px collapse on mobiles
      className="fixed bottom-4 md:bottom-8 left-0 w-full z-50 flex justify-center pointer-events-none px-4"
    >
      <nav className="pointer-events-auto flex items-center gap-0.5 md:gap-1 rounded-full border border-white/10 bg-nebulaPurple/20 px-1.5 md:px-2 py-1.5 md:py-2 backdrop-blur-xl shadow-2xl">
        {translatedNavLinks.map((link) => {
          const isActive = active === link.name;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActive(link.name)}
              aria-current={isActive ? "true" : undefined}
              className={`relative rounded-full px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium transition-colors ${
                isActive ? "text-[#00E5FF]" : "text-slate-400 md:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-[#243870]/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
        
        {/* Divider */}
        <div className="w-[1px] h-4 md:h-6 bg-white/20 mx-0.5 md:mx-1" /> 
        
        {/* i18n Toggle */}
        <button
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          className="relative rounded-full px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium transition-colors text-slate-400 md:hover:text-white uppercase tracking-wider"
          aria-label="Toggle Language"
        >
          {language}
        </button>
      </nav>
    </motion.div>
  );
}
