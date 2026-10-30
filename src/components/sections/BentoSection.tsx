"use client";

import { BioCard } from "@/components/ui/bento/BioCard";
import { CopyEmailCard } from "@/components/ui/bento/CopyEmailCard";
import { LocationCard } from "@/components/ui/bento/LocationCard";
import { SocialLinksCard } from "@/components/ui/bento/SocialLinksCard";
import { TechStack } from "@/components/ui/bento/TechStack";
import { useI18n } from "@/context/I18nContext";

export function BentoSection() {
  const { t } = useI18n();

  return (
    <section id="about" aria-labelledby="about-heading" className="page-width about-section">
      <p className="section-kicker">{t.bento.header.sectionTitle}</p>
      <h2 id="about-heading" className="section-heading">{t.bento.header.heading}</h2>
      <div className="about-intro">
        <BioCard />
        <LocationCard />
      </div>
      <TechStack />
      <div className="contact-layout">
        <CopyEmailCard />
        <SocialLinksCard />
      </div>
    </section>
  );
}
