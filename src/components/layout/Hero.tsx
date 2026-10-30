"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LyraConstellation, ShootingStar } from "@/components/ui/VegaSky";
import { useI18n } from "@/context/I18nContext";
import { portfolioData } from "@/constants/portfolioData";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" aria-labelledby="home-heading" className="page-width hero-section">
      <div className="hero-topline">
        <p className="hero-brand font-display text-lg font-medium tracking-wide text-paper">
          <Image src="/icon.svg" alt="" aria-hidden="true" width={36} height={36} />
          <span>{portfolioData.profile.handle}<span aria-hidden="true" className="text-starGold">.</span></span>
        </p>
        <StatusBadge statusText={t.hero.availability} />
      </div>
      <div className="hero-body">
        <div className="hero-intro">
          <p className="hero-eyebrow">{t.hero.role}</p>
          <h1 id="home-heading" className="hero-name font-display font-bold tracking-tight">
            <span className="block">Freddy</span>
            <span className="hero-surname">Guerra<span className="text-starGold">.</span></span>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <a href="#projects" className="button-primary">
              {t.hero.viewProjects}<ArrowDownRight aria-hidden="true" size={18} />
            </a>
            <a href="#contact" className="button-secondary">
              {t.hero.contact}<ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
          <p className="hero-location">
            <MapPin aria-hidden="true" size={15} className="shrink-0 text-starGold" />{t.hero.location}
          </p>
        </div>
        <div className="hero-sky" aria-hidden="true">
          <div className="hero-sky-halo" />
          <LyraConstellation className="hero-constellation" />
          <ShootingStar />
          <p className="hero-sky-caption"><span>α Lyrae</span><span className="hero-sky-rule" /><span>Vega</span></p>
        </div>
      </div>
    </section>
  );
}
