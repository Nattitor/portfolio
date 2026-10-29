"use client";

import { useI18n } from "@/context/I18nContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="page-width border-t border-vegaCyan/15 pt-8 pb-28 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
        <span>© {currentYear} Freddy Guerra</span>
        <span>{t.footer.rights}</span>
      </div>
      <a
        href="#home"
        className="inline-flex min-h-[44px] items-center rounded-full border border-vegaCyan/15 bg-nightDeep/70 px-4 font-mono text-xs text-slate-300 transition-colors hover:border-vegaCyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vegaCyan"
      >
        {t.footer.backToTop}
      </a>
    </footer>
  );
}
