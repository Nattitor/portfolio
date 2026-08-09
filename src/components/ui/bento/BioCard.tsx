"use client";

import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";
import { useI18n } from "@/context/I18nContext";

export function BioCard() {
  const { t } = useI18n();

  return (
    <motion.div
      variants={bentoVariants}
      className="md:col-span-4 md:row-span-2 flex flex-col justify-center rounded-3xl p-8 lg:p-12 glass-panel relative overflow-hidden"
    >
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] pointer-events-none rounded-full"
      />
      <h2 className="relative z-10 font-display font-black text-2xl sm:text-3xl lg:text-4xl leading-tight text-white uppercase tracking-tight select-text">
        {t.bento.bio.titlePart1} <span className="text-slate-500">{t.bento.bio.titleMuted}</span> {t.bento.bio.titlePart2}
      </h2>
      <p className="relative z-10 mt-6 font-mono text-sm md:text-base text-slate-400 max-w-2xl select-text">
        {t.bento.bio.description}
      </p>
    </motion.div>
  );
}
