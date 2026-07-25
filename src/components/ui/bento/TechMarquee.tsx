"use client";

import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function TechMarquee() {
  const technologies = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", 
    "FRAMER MOTION", "NODE.JS", "SUPABASE", "POSTGRESQL",
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", 
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="md:col-span-6 md:row-span-1 flex items-center overflow-hidden rounded-3xl border border-white/10 bg-accentCyan/5 py-4 md:py-0 min-h-[100px] relative"
    >
      <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-[200%] animate-marquee whitespace-nowrap">
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="mx-4 text-3xl md:text-5xl font-display font-black uppercase text-transparent text-stroke-white opacity-40 hover:opacity-100 hover:text-white transition-all cursor-default"
          >
            {tech} <span className="text-accentCyan ml-4 opacity-50">•</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
