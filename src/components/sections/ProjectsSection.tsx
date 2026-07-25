"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/constants/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectFilter } from "@/components/ui/ProjectFilter";

export function ProjectsSection() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Dynamically extract categories for filtering (memoized)
  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          projects
            .map((project) => project.category)
            .filter((cat): cat is string => Boolean(cat))
        )
      ),
    ];
  }, [projects]);

  // Derived filtered projects list (memoized)
  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="relative w-full px-6 py-20 md:px-16 lg:px-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 md:mb-12"
      >
        <div className="text-accentCyan font-mono text-sm md:text-base uppercase tracking-widest mb-3">
          // SELECTED WORKS
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
          Proyectos <span className="text-stroke-white">Destacados</span>
        </h2>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <ProjectFilter
          categories={categories}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />
      </motion.div>

      {/* Animated Asymmetric Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
                duration: 0.2,
              }}
              className={activeFilter === "All" && index === 0 ? "md:col-span-2" : "col-span-1"}
            >
              <ProjectCard
                project={project}
                index={index}
                featured={activeFilter === "All" && index === 0}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
