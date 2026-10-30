"use client";

import { MapPin } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { LiveClock } from "@/components/ui/LiveClock";

export function LocationCard() {
  const { t } = useI18n();

  return (
    <section className="location-note">
      <h3 className="flex items-center gap-2 text-sm font-medium text-paper"><MapPin aria-hidden="true" size={15} className="text-starGold" />Merlo, Buenos Aires</h3>
      <LiveClock className="location-clock tabular-nums" />
      <p className="text-xs leading-relaxed text-slate-400">{t.bento.location.localTime}<span aria-hidden="true" className="mx-2 text-starGold/70">·</span>Argentina, UTC−3</p>
    </section>
  );
}
