"use client";

import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";

export function TechMarquee() {
  const technologies = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", 
    "FRAMER MOTION", "NODE.JS", "SUPABASE", "POSTGRESQL",
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", 
  ];

  return (
    <motion.div
      variants={bentoVariants}
      className="md:col-span-6 md:row-span-1 flex items-center overflow-hidden rounded-3xl border border-white/10 bg-accentCyan/5 py-4 md:py-0 min-h-[100px] relative"
    >
      <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="flex w-[200%] whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        style={{ willChange: "transform" }}
      >
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="mx-4 text-3xl md:text-5xl font-display font-black uppercase text-transparent text-stroke-white opacity-40 hover:opacity-100 hover:text-white transition-all cursor-default"
          >
            {tech} <span className="text-accentCyan ml-4 opacity-50">•</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
