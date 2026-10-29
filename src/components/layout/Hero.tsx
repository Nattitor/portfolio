"use client";

import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useI18n } from "@/context/I18nContext";
import { portfolioData } from "@/constants/portfolioData";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" aria-labelledby="home-heading" className="page-width relative flex min-h-[min(820px,95svh)] flex-col justify-center gap-10 py-16 sm:py-24">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-vegaCyan/15 pb-6">
        <p className="font-display text-lg tracking-wide text-paper">{portfolioData.profile.handle}</p>
        <StatusBadge statusText={t.hero.availability} />
      </div>
      <div className="max-w-4xl">
        <p className="mb-5 font-mono text-sm tracking-widest text-vegaCyan">{t.hero.role}</p>
        <h1 id="home-heading" className="hero-name font-display font-bold tracking-tight">
          <span className="block">Freddy</span>
          <span className="block text-vegaCyan">Guerra<span className="text-starGold">.</span></span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{t.hero.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="button-primary">
            {t.hero.viewProjects}<ArrowDownRight aria-hidden="true" size={18} />
          </a>
          <a href="#contact" className="button-secondary">
            {t.hero.contact}<ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
      <p className="flex items-center gap-2 text-sm text-slate-400">
        <MapPin aria-hidden="true" size={16} className="shrink-0 text-starGold" />{t.hero.location}
      </p>
    </section>
  );
}
