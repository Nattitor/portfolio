"use client";

import { useI18n } from "@/context/I18nContext";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "PostgreSQL",
];

export function TechStack() {
  const { t } = useI18n();

  return (
    <section className="md:col-span-6 rounded-2xl border border-vegaCyan/15 bg-nightDeep/70 p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold text-paper">{t.bento.stack.title}</h3>
      <p className="mt-2 font-mono text-sm text-slate-300">{t.bento.stack.description}</p>
      <ul className="mt-6 flex flex-wrap gap-3" aria-label={t.bento.stack.title}>
        {technologies.map((technology) => (
          <li key={technology} className="rounded-lg border border-vegaCyan/15 bg-nightDeep/70 px-3 py-2 font-mono text-sm text-slate-300">
            {technology}
          </li>
        ))}
      </ul>
    </section>
  );
}
