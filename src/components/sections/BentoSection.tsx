"use client";

import { motion, Variants } from "framer-motion";
import { LocationCard } from "@/components/ui/bento/LocationCard";
import { BioCard } from "@/components/ui/bento/BioCard";
import { TechMarquee } from "@/components/ui/bento/TechMarquee";
import { CopyEmailCard } from "@/components/ui/bento/CopyEmailCard";
import { SocialLinksCard } from "@/components/ui/bento/SocialLinksCard";
import { Footer } from "@/components/layout/Footer";

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
  return (
    <section id="about" className="relative w-full px-6 py-24 md:px-16 lg:px-24 bg-black">
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
