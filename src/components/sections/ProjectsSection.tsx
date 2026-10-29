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
    <section id="projects" aria-labelledby="projects-heading" className="page-width py-16 sm:py-24">
      <p className="section-kicker">{t.projects.sectionTitle}</p>
      <h2 id="projects-heading" className="section-heading">{t.projects.heading}</h2>
      <p className="mt-4 mb-8 max-w-2xl leading-relaxed text-slate-300">{t.projects.description}</p>
      <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <p className="sr-only" role="status">{filteredProjects.length === 1 ? t.projects.result : t.projects.results.replace("{count}", String(filteredProjects.length))}</p>
      <div id="project-list" className="grid items-stretch gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
      {filteredProjects.length === 0 && <p className="py-8 text-slate-300">{t.projects.empty}</p>}
    </section>
  );
}
