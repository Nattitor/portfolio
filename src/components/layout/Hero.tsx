"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { portfolioData } from "@/constants/portfolioData";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusBadge } from "@/components/ui/StatusBadge";

// Extracted Variants to prevent re-creation on every render (Performance Optimization)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const letterVariants: Variants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const contentFadeInVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.8,
    },
  },
};

const topBarVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Hero() {
  const { profile } = portfolioData;
  const { t } = useI18n();

  const [firstName, ...lastNameParts] = profile.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-between px-6 py-12 md:px-16 md:py-20 lg:px-24 overflow-hidden overflow-x-hidden pt-24 md:pt-32">
      {/* Background Decorative Watermark - aria-hidden for accessibility */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 -right-12 select-none pointer-events-none text-accentCyan font-display font-black text-9xl md:text-[20rem] leading-none z-0"
      >
        DEV
      </motion.div>

      {/* Ambient glowing orbs for Glassmorphism refraction */}
      <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-accentCyan/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[30rem] bg-accentViolet/10 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" aria-hidden="true" />

      {/* Top Asymmetric Bar: Status & Location */}
      <motion.div
        variants={topBarVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6"
      >
        <StatusBadge statusText={t.hero.availability} />

        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 font-mono tracking-wide">
          <MapPin className="w-4 h-4 text-zinc-500" />
          <span>{t.hero.location}</span>
        </div>
      </motion.div>

      {/* Main Asymmetric Typography Area */}
      <div className="relative z-10 my-auto py-12 flex flex-col justify-center">
        {/* Subtitle / Role Tag */}
        <div className="flex flex-col gap-2 mb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-zinc-400 font-mono text-sm md:text-base tracking-widest"
          >
            <span className="text-accentViolet">const</span> developer = <span className="text-accentCyan">"Nattitor"</span>;
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest"
          >
            // {t.hero.role}
          </motion.div>
        </div>

        {/* Gigantic Asymmetric Heading with Letter Reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.9] tracking-tighter text-white uppercase select-none"
        >
          <span className="inline-flex overflow-hidden py-1 pr-4">
            {firstName.split("").map((char, index) => (
              <motion.span key={`first-${index}`} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
          <br />
          <span className="group text-stroke-white ml-4 md:ml-12 lg:ml-24 inline-flex overflow-hidden py-1 pr-4 cursor-default transition-colors duration-500 hover:text-white hover:text-stroke-0">
            {lastName.split("").map((char, index) => (
              <motion.span key={`last-${index}`} variants={letterVariants} className="inline-block transition-colors duration-500">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Asymmetric Description & CTA Row */}
        <motion.div
          variants={contentFadeInVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 md:mt-24 flex flex-col items-start md:items-end md:text-right md:ml-auto w-full md:w-2/3 lg:w-1/2 gap-8"
        >
          <p className="max-w-lg text-zinc-400 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed select-text">
            {t.hero.description}
          </p>

          <MagneticButton href="#projects">
            <div className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-display font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span>{t.hero.viewProjects}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </div>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Decorative Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-600 border-t border-white/5 pt-4"
      >
        <span>{t.hero.portfolioVersion}</span>
        <span className="animate-bounce">{t.hero.scrollToExplore}</span>
      </motion.div>
    </section>
  );
}
