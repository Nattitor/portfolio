"use client";

import { motion, Variants } from "framer-motion";
import { LocationCard } from "@/components/ui/bento/LocationCard";
import { BioCard } from "@/components/ui/bento/BioCard";
import { TechMarquee } from "@/components/ui/bento/TechMarquee";
import { CopyEmailCard } from "@/components/ui/bento/CopyEmailCard";
import { SocialLinksCard } from "@/components/ui/bento/SocialLinksCard";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/context/I18nContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BentoSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative w-full px-6 py-24 md:px-16 lg:px-24 bg-transparent">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 md:mb-16"
      >
        <div 
          className="text-[#00E5FF] font-mono text-sm md:text-base uppercase tracking-widest mb-3 select-none before:content-[attr(data-title)]"
          data-title={`// ${t.bento.header.sectionTitle.toUpperCase()}`}
        />
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight select-none">
          {t.bento.header.heading1} <span className="text-stroke-white select-none before:content-[attr(data-title)]" data-title={t.bento.header.heading2} />
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto md:auto-rows-[minmax(120px,auto)] max-w-7xl mx-auto"
      >
        <LocationCard />
        <BioCard />
        <TechMarquee />
        <CopyEmailCard />
        <SocialLinksCard />
      </motion.div>

      <Footer />
    </section>
  );
}
