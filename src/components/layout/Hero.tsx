"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { portfolioData } from "@/constants/portfolioData";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { 
  heroContainerVariants, 
  heroLetterVariants, 
  heroContentFadeInVariants, 
  heroTopBarVariants 
} from "@/lib/motion";

export function Hero() {
  const { profile } = portfolioData;
  const { t } = useI18n();

  const [firstName, ...lastNameParts] = profile.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <section id="home" className="relative min-h-[100dvh] w-full flex flex-col justify-between px-6 pb-6 pt-16 md:py-12 md:px-16 lg:px-24 md:pt-32 overflow-x-clip">
      {/* Background Decorative Watermark - aria-hidden for accessibility */}
      <div
        aria-hidden="true"
        className="absolute top-[32%] md:top-1/4 -right-12 md:-right-12 select-none pointer-events-none text-vegaCyan opacity-[0.03] font-display font-black text-[10rem] md:text-[20rem] leading-none z-0"
      >
        DEV
      </div>

      {/* Ambient glowing orbs for Glassmorphism refraction */}
      <div className="absolute top-1/2 left-1/4 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-vegaCyan/5 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[25rem] md:w-[40rem] h-[20rem] md:h-[30rem] bg-nebulaPurple/10 rounded-full blur-[100px] md:blur-[150px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" aria-hidden="true" />

      {/* Top Asymmetric Bar: Status & Location */}
      <motion.div
        variants={heroTopBarVariants}
        animate="visible"
        className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 border-b border-white/10 pb-8 md:pb-6"
      >
        <StatusBadge statusText={t.hero.availability} />

        <div className="flex items-center gap-3 md:gap-2 text-sm text-slate-400 font-mono tracking-wide">
          <MapPin className="w-5 h-5 md:w-4 md:h-4 text-[#CBA153]" />
          <span>{t.hero.location}</span>
        </div>
      </motion.div>

      {/* Main Asymmetric Typography Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center flex-grow pt-8 md:pt-16">
        {/* Subtitle / Role Tag */}
        <div className="flex flex-col gap-3 md:gap-2 mb-6 md:mb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-slate-400 font-mono text-sm md:text-base tracking-widest"
          >
            <span className="text-[#CBA153]">const</span> developer = <span className="text-vegaCyan">"Nattitor"</span>;
          </motion.div>
          <motion.div
            initial={false}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-slate-500 font-mono text-sm uppercase tracking-widest"
          >
            // {t.hero.role}
          </motion.div>
        </div>

        {/* Amethyst Glow Nebula Behind Text */}
        <div className="absolute top-1/2 left-1/4 w-[150%] max-w-[80rem] h-[150%] max-h-[50rem] bg-[radial-gradient(ellipse_at_center,_#7A4988_0%,_#243870_40%,_transparent_70%)] blur-[80px] md:blur-[100px] opacity-15 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]" aria-hidden="true" />

        {/* Gigantic Asymmetric Heading with Letter Reveal */}
        <motion.h1
          variants={heroContainerVariants}
          initial={false}
          animate="visible"
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.9] tracking-tighter text-white uppercase select-none"
        >
          <span className="inline-flex overflow-hidden py-2 pr-4">
            {firstName.split("").map((char, index) => (
              <motion.span key={`first-${index}`} variants={heroLetterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
          <br />
          <span className="group text-stroke-white ml-0 md:ml-12 lg:ml-24 inline-flex overflow-hidden py-2 pr-4 mt-2 md:mt-0 cursor-default transition-colors duration-500 md:hover:text-white md:hover:text-stroke-0 active:text-white active:text-stroke-0">
            {lastName.split("").map((char, index) => (
              <motion.span key={`last-${index}`} variants={heroLetterVariants} className="inline-block transition-colors duration-500">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Asymmetric Description & CTA Row */}
        <motion.div
          variants={heroContentFadeInVariants}
          animate="visible"
          className="mt-12 md:mt-24 flex flex-col items-center md:items-end md:text-right md:ml-auto w-full md:w-2/3 lg:w-1/2 gap-10 md:gap-8"
        >
          <p className="max-w-lg text-slate-400 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed select-text text-left md:text-right w-full">
            {t.hero.description}
          </p>

          <div className="w-full flex justify-center md:justify-end">
            <MagneticButton href="#projects" className="w-full md:w-auto flex">
              <div className="w-full flex justify-center items-center gap-3 px-8 py-5 md:py-4 bg-[#0B0F19]/50 backdrop-blur-md text-white border border-[#243870] font-display font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden transition-colors duration-300 hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="w-5 h-5 md:w-4 md:h-4 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00E5FF]" strokeWidth={2.5} />
              </div>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Indicator */}
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-600 border-t border-white/5 pt-6 gap-4 md:gap-0 mt-8 md:mt-0"
      >
        <span>{t.hero.portfolioVersion}</span>
        <span className="animate-bounce">{t.hero.scrollToExplore}</span>
      </motion.div>
    </section>
  );
}
