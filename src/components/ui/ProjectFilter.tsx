"use client";

import { motion } from "framer-motion";

interface ProjectFilterProps {
  categories: string[];
  activeFilter: string;
  onSelectFilter: (category: string) => void;
}

export function ProjectFilter({
  categories,
  activeFilter,
  onSelectFilter,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-10">
      {categories.map((category) => {
        const isActive = activeFilter === category;
        return (
          <button
            key={category}
            onClick={() => onSelectFilter(category)}
            aria-pressed={isActive}
            className={`relative rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors duration-300 ${
              isActive ? "text-black font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-filter-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)] z-0"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {category === "All" ? "[ All Projects ]" : category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
