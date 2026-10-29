"use client";

import { useState } from "react";
import type { Project } from "@/constants/portfolioData";

export type ProjectFilterId = "all" | Project["status"];

export function useProjectsFilter(projects: readonly Project[]) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all");
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.status === activeFilter);

  return { activeFilter, setActiveFilter, filteredProjects };
}
