"use client";

import { useI18n } from "@/context/I18nContext";

const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Supabase", "PostgreSQL"];

export function TechStack() {
  const { t } = useI18n();

  return (
    <section className="tech-stack">
      <div>
        <h3 className="font-display text-base font-medium text-paper">{t.bento.stack.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{t.bento.stack.description}</p>
      </div>
      <ul className="tech-list" aria-label={t.bento.stack.title}>
        {technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
    </section>
  );
}
