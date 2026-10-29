"use client";

import { useI18n } from "@/context/I18nContext";
import type { ProjectFilterId } from "@/hooks/useProjectsFilter";
import { cn } from "@/lib/utils";

const filters: ProjectFilterId[] = ["all", "published", "development"];

export function ProjectFilter({ activeFilter, onFilterChange }: {
  activeFilter: ProjectFilterId;
  onFilterChange: (filter: ProjectFilterId) => void;
}) {
  const { t } = useI18n();

  return (
    <div role="group" aria-label={t.projects.filterLabel} className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          aria-pressed={activeFilter === filter}
          aria-controls="project-list"
          onClick={() => onFilterChange(filter)}
          className={cn("min-h-11 rounded-full border px-4 py-2 text-sm transition-colors", activeFilter === filter
            ? "border-vegaCyan/50 bg-vegaBlue/25 text-vegaCyan"
            : "border-vegaCyan/20 text-slate-300 hover:border-vegaCyan/50 hover:text-paper")}
        >
          {t.projects.filters[filter]}
        </button>
      ))}
    </div>
  );
}
