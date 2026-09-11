"use client";

import { motion } from "framer-motion";

interface ProjectFilterProps {
  categories: Array<{ id: string; label: string }>;
  activeFilter: string;
  onSelectFilter: (category: string) => void;
}

export function ProjectFilter({
  categories,
  activeFilter,
  onSelectFilter,
}: ProjectFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by technology"
      className="flex flex-nowrap overflow-x-auto overflow-y-hidden pb-4 mb-6 md:mb-10 items-center gap-2 snap-x scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map(({ id, label }) => {
        const isActive = activeFilter === id;
        return (
          <button
            key={id}
            onClick={() => onSelectFilter(id)}
            aria-pressed={isActive}
            className={`relative rounded-full px-5 py-2.5 md:px-4 md:py-2 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors duration-300 active:scale-95 ${
              isActive ? "text-vegaCyan font-bold" : "text-slate-400 md:hover:text-paper active:text-paper"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="projects-active-filter"
                className="absolute inset-0 rounded-full bg-transparent border border-vegaCyan shadow-[0_0_15px_rgba(120,213,225,0.18)] z-0"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {id === "All" ? "[ All Projects ]" : label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
