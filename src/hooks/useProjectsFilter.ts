import { useState, useMemo } from "react";
import { Project } from "@/constants/portfolioData";
import type { Dictionary } from "@/context/I18nContext";

interface TranslatedProject extends Project {
  baseCategory: string;
}

interface Category {
  id: string;
  label: string;
}

interface ProjectTranslation {
  category?: string;
  title?: string;
  description?: string;
}

export function useProjectsFilter(baseProjects: Project[], translationContext: Dictionary) {
  // 1. Translate projects on the fly and keep the base category for logical filtering
  const projects = useMemo(() => {
    const items: Record<string, ProjectTranslation> = translationContext.projects.items;
    return baseProjects.map((p): TranslatedProject => {
      const translation = items[p.id];
      return {
        ...p,
        baseCategory: p.category ?? "",
        title: translation?.title || p.title,
        category: translation?.category || p.category,
        shortDescription: translation?.description || p.shortDescription,
      };
    });
  }, [baseProjects, translationContext]);

  // activeFilter stores the untranslated base category (e.g. "All", "AI Integration")
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Dynamically extract categories as objects with id and translated label
  const categories = useMemo(() => {
    const uniqueBaseCategories = Array.from(
      new Set(projects.map((project) => project.baseCategory).filter(Boolean))
    );

    const result: Category[] = [
      { id: "All", label: "All" },
      ...uniqueBaseCategories.map((baseCat) => {
        const project = projects.find((p) => p.baseCategory === baseCat);
        return {
          id: baseCat,
          label: project?.category || baseCat,
        };
      }),
    ];

    return result;
  }, [projects]);

  // Derived filtered projects list based on baseCategory
  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.baseCategory === activeFilter);
  }, [activeFilter, projects]);

  return {
    activeFilter,
    setActiveFilter,
    categories,
    filteredProjects,
  };
}
