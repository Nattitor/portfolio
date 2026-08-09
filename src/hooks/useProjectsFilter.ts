import { useState, useMemo } from "react";
import { Project } from "@/constants/portfolioData";

interface TranslatedProject extends Project {
  baseCategory: string;
}

interface Category {
  id: string;
  label: string;
}

export function useProjectsFilter(baseProjects: Project[], translationContext: any) {
  // 1. Translate projects on the fly and keep the base category for logical filtering
  const projects = useMemo(() => {
    return baseProjects.map((p) => {
      const translation = translationContext.projects.items[p.id as keyof typeof translationContext.projects.items];
      return {
        ...p,
        baseCategory: p.category,
        title: translation?.title || p.title,
        category: translation?.category || p.category,
        shortDescription: translation?.description || p.shortDescription,
      } as TranslatedProject;
    });
  }, [baseProjects, translationContext]);

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
    ] as Category[];
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
