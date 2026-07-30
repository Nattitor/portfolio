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
            className={`relative rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors duration-300 ${
              isActive ? "text-[#00E5FF] font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="projects-active-filter"
                className="absolute inset-0 rounded-full bg-transparent border border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)] z-0"
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
