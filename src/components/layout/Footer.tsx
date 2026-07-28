"use client";

import { useI18n } from "@/context/I18nContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="mt-24 max-w-7xl mx-auto w-full border-t border-white/10 pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
        <span>© {currentYear} Freddy Guerra</span>
        <span className="hidden md:inline-block text-slate-700">//</span>
        <span>{t.footer.rights}</span>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-nebulaPurple/20">
        <div className="w-2 h-2 rounded-full bg-vegaCyan animate-pulse" />
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.footer.status}</span>
      </div>
    </footer>
  );
}
