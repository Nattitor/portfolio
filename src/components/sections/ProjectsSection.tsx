"use client";

import { portfolioData } from "@/constants/portfolioData";
import { useI18n } from "@/context/I18nContext";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectFilter } from "@/components/ui/ProjectFilter";

export function ProjectsSection() {
  const { t } = useI18n();
  const { activeFilter, setActiveFilter, filteredProjects } = useProjectsFilter(portfolioData.projects);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="page-width projects-section">
      <div className="projects-header">
        <div>
          <p className="section-kicker">{t.projects.sectionTitle}</p>
          <h2 id="projects-heading" className="section-heading">{t.projects.heading}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-300">{t.projects.description}</p>
        </div>
        <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>
      <p className="sr-only" role="status">{filteredProjects.length === 1 ? t.projects.result : t.projects.results.replace("{count}", String(filteredProjects.length))}</p>
      <div id="project-list" className={`project-grid${activeFilter === "all" ? " project-grid-all" : ""}`}>
        {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
      {filteredProjects.length === 0 && <p className="py-8 text-slate-300">{t.projects.empty}</p>}
    </section>
  );
}
