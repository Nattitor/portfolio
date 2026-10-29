"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { useClipboard } from "@/hooks/useClipboard";
import { portfolioData } from "@/constants/portfolioData";

export function CopyEmailCard() {
  const { t } = useI18n();
  const { status, copyToClipboard } = useClipboard();
  const { email } = portfolioData.profile;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="min-w-0 rounded-2xl border border-vegaCyan/20 bg-vegaBlue/10 p-6 sm:p-8 md:col-span-4">
      <h3 id="contact-heading" className="font-display text-2xl font-semibold text-paper">{t.bento.contact.letsTalk}</h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">{t.bento.contact.description}</p>
      <p className="my-6 break-all font-display text-xl text-vegaCyan sm:text-2xl">{email}</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => void copyToClipboard(email)} aria-disabled={status === "copying"} className="button-primary aria-disabled:cursor-wait aria-disabled:opacity-70" aria-label={t.bento.contact.copy}>
          {status === "copied" ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
          {status === "copying" ? t.bento.contact.copying : t.bento.contact.copy}
        </button>
        <a href={`mailto:${email}`} className="button-secondary"><Mail aria-hidden="true" size={18} />{t.bento.contact.send}</a>
      </div>
      <p role="status" aria-atomic="true" className="mt-4 min-h-6 text-sm leading-relaxed text-slate-300">
        {status === "copied" ? t.bento.contact.copied : status === "error" ? t.bento.contact.error : ""}
      </p>
    </section>
  );
}
