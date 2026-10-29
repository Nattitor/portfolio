"use client";

import { useI18n } from "@/context/I18nContext";
import { LiveClock } from "@/components/ui/LiveClock";

export function LocationCard() {
  const { t } = useI18n();

  return (
    <section className="md:col-span-2 flex min-h-[180px] flex-col justify-between rounded-2xl border border-vegaCyan/15 bg-nightDeep/70 p-6">
      <div className="flex flex-col items-start gap-5">
        <div>
          <h3 className="font-display text-xl font-bold text-paper">Merlo, Buenos Aires</h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-300">Argentina · UTC−3</p>
        </div>
        <LiveClock className="font-mono text-2xl font-bold text-slate-300 tabular-nums" />
      </div>
      <p className="font-mono text-xs text-slate-400">{t.bento.location.localTime}</p>
    </section>
  );
}
