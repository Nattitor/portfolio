"use client";

import { useRef, useState } from "react";
import { motion, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { bentoVariants } from "@/lib/motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function TechMarquee() {
  const baseTech = [
    { name: "REACT", color: "#61DAFB" },
    { name: "NEXT.JS", color: "#FFFFFF" },
    { name: "TYPESCRIPT", color: "#3178C6" },
    { name: "TAILWIND CSS", color: "#38B2AC" },
    { name: "FRAMER MOTION", color: "#F51996" },
    { name: "NODE.JS", color: "#339933" },
    { name: "SUPABASE", color: "#3ECF8E" },
    { name: "POSTGRESQL", color: "#4169E1" },
  ];
  // Duplicación perfecta para que el loop matemático del -50% sea invisible
  const technologies = [...baseTech, ...baseTech];

  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    // Velocidad base constante (1.5) sin aceleración por scroll
    let moveBy = directionFactor.current * -1 * (delta / 1000) * 1.5; 

    // Pause / massive slow down on hover
    if (isHovered) {
      moveBy *= 0.05; 
    }

    baseX.set(baseX.get() + moveBy);
  });

  // wrap(-50, 0, v) asegura un loop perfecto
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <motion.div
      variants={bentoVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="md:col-span-6 md:row-span-1 flex items-center overflow-hidden rounded-3xl border border-white/10 bg-accentCyan/5 py-4 md:py-0 min-h-[100px] relative select-none"
    >
      <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="flex w-max whitespace-nowrap"
        style={{ x, willChange: "transform" }}
      >
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="group mx-4 text-3xl md:text-5xl font-display font-black uppercase text-transparent text-stroke-white opacity-40 hover:opacity-100 hover:text-stroke-0 transition-all cursor-default flex items-center"
            style={{ "--brand-color": tech.color } as React.CSSProperties}
          >
            <span className="group-hover:text-[var(--brand-color)] transition-colors duration-300">
              {tech.name}
            </span>
            <span className="text-accentCyan ml-8 opacity-50 pointer-events-none group-hover:text-stroke-white group-hover:text-transparent transition-all duration-300">•</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
