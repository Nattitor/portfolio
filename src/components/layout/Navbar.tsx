"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
    >
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/60 px-2 py-2 backdrop-blur-xl shadow-2xl">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setActive(link.name)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === link.name ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {active === link.name && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 z-[-1] rounded-full bg-white/10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
