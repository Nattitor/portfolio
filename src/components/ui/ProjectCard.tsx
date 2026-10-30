"use client";

import Image from "next/image";
import type { Project } from "@/constants/portfolioData";
import { useI18n } from "@/context/I18nContext";
import { ActionLink } from "@/components/ui/ActionLink";
import { ProjectCover } from "@/components/ui/ProjectCover";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const content = t.projects.items[project.id];
  const development = project.status === "development";
  const titleId = `project-${project.id}-title`;

  return (
    <article aria-labelledby={titleId} className={`project-card project-${project.id}${development ? " project-next" : ""}`}>
      {project.image ? (
        <div className="project-cover project-cover-dashboard">
          <Image src={project.image} alt={t.projects.imageAlt.replace("{title}", content.title)} fill
            sizes="(max-width: 719px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 64px) / 2), 608px"
            className="object-cover object-top" />
        </div>
      ) : project.id === "vellura" ? <ProjectCover /> : null}
      <div className="project-body">
        <div className="project-meta">
          <span>{content.category}</span>
          <span className="project-status"><span aria-hidden="true" />{development ? t.projects.development : t.projects.published}</span>
        </div>
        <h3 id={titleId} className="project-title">{content.title}</h3>
        <p className="project-description">{content.description}</p>
        {"note" in content && <p className="mt-2 text-sm leading-relaxed text-slate-400">{content.note}</p>}
        {project.technologies.length > 0 && (
          <ul className="project-technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        )}
        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-6">
            {project.liveUrl && <ActionLink href={project.liveUrl} type="primary" label={t.projects.liveDemo} accessibleLabel={`${t.projects.liveDemo}: ${content.title} (${t.common.newTab})`} />}
            {project.repoUrl && <ActionLink href={project.repoUrl} type="secondary" label={t.projects.sourceCode} accessibleLabel={`${t.projects.sourceCode}: ${content.title} (${t.common.newTab})`} />}
          </div>
        )}
      </div>
    </article>
  );
}
