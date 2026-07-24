"use client";

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
            className={`relative rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                : "border border-white/10 bg-zinc-950/40 text-zinc-400 hover:border-white/30 hover:text-white backdrop-blur-md"
            }`}
          >
            {category === "All" ? "[ All Projects ]" : category}
          </button>
        );
      })}
    </div>
  );
}
