"use client";

import { useState } from "react";
import { portfolioData } from "@/constants/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectFilter } from "@/components/ui/ProjectFilter";

export function ProjectsSection() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Dynamically extract categories for filtering
  const categories = [
    "All",
    ...Array.from(
      new Set(
        projects
          .map((project) => project.category)
          .filter((cat): cat is string => Boolean(cat))
      )
    ),
  ];

  // Derived filtered projects list
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="relative w-full px-6 py-20 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="mb-10 md:mb-12">
        <div className="text-accentCyan font-mono text-sm md:text-base uppercase tracking-widest mb-3">
          // SELECTED WORKS
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
          Proyectos <span className="text-stroke-white">Destacados</span>
        </h2>
      </div>

      {/* Filter Bar */}
      <ProjectFilter
        categories={categories}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            featured={activeFilter === "All" && index === 0}
          />
        ))}
      </div>
    </section>
  );
}
