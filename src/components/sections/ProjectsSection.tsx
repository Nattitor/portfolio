"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/constants/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectFilter } from "@/components/ui/ProjectFilter";
import { useI18n } from "@/context/I18nContext";

export function ProjectsSection() {
  const { t } = useI18n();
  const baseProjects = portfolioData.projects;

  // Translate projects on the fly and keep the base category for logical filtering
  const projects = useMemo(() => {
    return baseProjects.map((p) => {
      const translation = t.projects.items[p.id as keyof typeof t.projects.items];
      return {
        ...p,
        baseCategory: p.category,
        title: translation?.title || p.title,
        category: translation?.category || p.category,
        shortDescription: translation?.description || p.shortDescription,
      };
    });
  }, [baseProjects, t]);

  // activeFilter stores the untranslated base category (e.g. "All", "AI Integration")
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Dynamically extract categories as objects with id and translated label
  const categories = useMemo(() => {
    const uniqueBaseCategories = Array.from(
      new Set(
        projects
          .map((project) => project.baseCategory)
          .filter((cat): cat is string => Boolean(cat))
      )
    );

    return [
      { id: "All", label: "All" },
      ...uniqueBaseCategories.map((baseCat) => {
        const project = projects.find((p) => p.baseCategory === baseCat);
        return {
          id: baseCat as string,
          label: project?.category || (baseCat as string),
        };
      }),
    ];
  }, [projects]);

  // Derived filtered projects list based on baseCategory
  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.baseCategory === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="relative w-full px-6 pt-10 pb-10 md:py-20 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="mb-10 md:mb-12">
        <div className="text-vegaCyan font-mono text-sm md:text-base uppercase tracking-widest mb-3">
          // {t.projects.sectionTitle.toUpperCase()}
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
          {t.projects.heading1} <span className="text-stroke-white">{t.projects.heading2}</span>
        </h2>
      </div>

      {/* Filter Bar */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <ProjectFilter
          categories={categories}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />
      </motion.div>

      {/* Animated Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={false}
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
        </div>
      </section>
  );
}
