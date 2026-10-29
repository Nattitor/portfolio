"use client";

import { useI18n } from "@/context/I18nContext";

export function BioCard() {
  const { t } = useI18n();

  return (
    <section className="md:col-span-4 flex flex-col justify-center rounded-2xl border border-vegaCyan/15 bg-nightDeep/70 p-6 sm:p-8 lg:p-12">
      <h3 className="font-display text-2xl font-semibold leading-tight text-paper sm:text-3xl">
        {t.bento.bio.title}
      </h3>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
        {t.bento.bio.description}
      </p>
    </section>
  );
}
