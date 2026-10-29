"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/constants/portfolioData";
import { useI18n } from "@/context/I18nContext";
import { ActionLink } from "@/components/ui/ActionLink";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const content = t.projects.items[project.id];
  const development = project.status === "development";
  const titleId = `project-${project.id}-title`;

  return (
    <article aria-labelledby={titleId} className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border border-vegaCyan/15 bg-nightDeep/80${development ? " md:col-span-2" : ""}`}>
      {project.image ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-vegaCyan/15 bg-nightBg">
          <Image src={project.image} alt={t.projects.imageAlt.replace("{title}", content.title)} fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc((100vw - 64px) / 2), 560px"
            className="object-cover object-top" />
        </div>
      ) : !development ? (
        <div aria-hidden="true" className="flex aspect-[16/9] items-center justify-between border-b border-vegaCyan/15 bg-gradient-to-br from-vegaBlue/20 to-nightDeep px-7 sm:px-10">
          <span className="font-display text-4xl font-medium tracking-tight text-vegaCyan/80 sm:text-5xl">{content.title}<span className="text-starGold">.</span></span>
          <ArrowUpRight className="h-10 w-10 shrink-0 text-starGold/80" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-400">
          <span>{content.category}</span>
          <span className="rounded-full border border-vegaCyan/20 px-2.5 py-1 text-vegaCyan">{development ? t.projects.development : t.projects.published}</span>
        </div>
        <h3 id={titleId} className="font-display text-xl font-semibold leading-snug text-paper sm:text-2xl">{content.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{content.description}</p>
        {"note" in content && <p className="mt-2 text-sm text-slate-400">{content.note}</p>}
        {project.technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => <li key={technology} className="rounded-md bg-vegaBlue/15 px-2.5 py-1 font-mono text-xs leading-relaxed text-slate-300">{technology}</li>)}
          </ul>
        )}
        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.liveUrl && <ActionLink href={project.liveUrl} type="primary" label={t.projects.liveDemo} accessibleLabel={`${t.projects.liveDemo}: ${content.title} (${t.common.newTab})`} />}
            {project.repoUrl && <ActionLink href={project.repoUrl} type="secondary" label={t.projects.sourceCode} accessibleLabel={`${t.projects.sourceCode}: ${content.title} (${t.common.newTab})`} />}
          </div>
        )}
      </div>
    </article>
  );
}
