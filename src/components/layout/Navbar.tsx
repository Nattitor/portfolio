"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [active, setActive] = useState<string>("Home");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  // 1. Smart Floating: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastY && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastY(latest);
  });

  // 2. Scroll Spy: Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near top of page -> Home
      if (window.scrollY < 200) {
        if (active !== "Home") setActive("Home");
        return;
      }

      // Check if user is at the absolute bottom of the page -> About
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (active !== "About") setActive("About");
        return;
      }

      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter((el): el is HTMLElement => el !== null);

      let currentActive = active;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3) {
          const match = navLinks.find((link) => link.href === `#${section.id}`);
          if (match) currentActive = match.name;
        }
      }

      if (currentActive !== active) {
        setActive(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
    >
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/60 px-2 py-2 backdrop-blur-xl shadow-2xl">
        {navLinks.map((link) => {
          const isActive = active === link.name;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActive(link.name)}
              aria-current={isActive ? "page" : undefined}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
