"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="page-width flex flex-col items-start justify-between gap-3 border-t border-vegaCyan/15 pt-6 pb-28 text-xs text-slate-400 sm:flex-row sm:items-center">
      <div className="flex flex-wrap gap-x-4 gap-y-2 leading-relaxed">
        <span>© {currentYear} Freddy Guerra</span>
        <span>{t.footer.rights}</span>
      </div>
      <a href="#home" className="inline-flex min-h-11 items-center gap-2 text-slate-300 transition-colors hover:text-vegaCyan">
        {t.footer.backToTop}<ArrowUpRight aria-hidden="true" size={15} />
      </a>
    </footer>
  );
}
