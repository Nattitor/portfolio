"use client";

import { useI18n } from "@/context/I18nContext";
import type { ProjectFilterId } from "@/hooks/useProjectsFilter";

const filters: ProjectFilterId[] = ["all", "published", "development"];

export function ProjectFilter({ activeFilter, onFilterChange }: {
  activeFilter: ProjectFilterId;
  onFilterChange: (filter: ProjectFilterId) => void;
}) {
  const { t } = useI18n();

  return (
    <div role="group" aria-label={t.projects.filterLabel} className="project-filters">
      {filters.map((filter) => (
        <button type="button" key={filter} aria-pressed={activeFilter === filter} aria-controls="project-list"
          onClick={() => onFilterChange(filter)} className="project-filter">
          {t.projects.filters[filter]}
        </button>
      ))}
    </div>
  );
}
