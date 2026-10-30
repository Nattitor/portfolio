"use client";

import { useI18n } from "@/context/I18nContext";

export function BioCard() {
  const { t } = useI18n();

  return (
    <section>
      <h3 className="bio-title">{t.bento.bio.title}</h3>
      <p className="bio-description">{t.bento.bio.description}</p>
    </section>
  );
}
