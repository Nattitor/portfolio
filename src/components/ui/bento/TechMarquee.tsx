"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { bentoVariants } from "@/lib/motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function TechMarquee() {
  const baseTech = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", 
    "FRAMER MOTION", "NODE.JS", "SUPABASE", "POSTGRESQL"
  ];
  // Duplicación perfecta para que el loop matemático del -50% sea invisible
  const technologies = [...baseTech, ...baseTech];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const [isHovered, setIsHovered] = useState(false);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -1 * (delta / 1000) * 4; 
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    if (isHovered) {
      moveBy *= 0.05; 
    }

    baseX.set(baseX.get() + moveBy);
  });

  // wrap(-50, 0, v) es más seguro que wrap(0, -50, v)
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
            className="mx-4 text-3xl md:text-5xl font-display font-black uppercase text-transparent text-stroke-white opacity-40 hover:opacity-100 hover:text-white transition-all cursor-default"
          >
            {tech} <span className="text-accentCyan ml-4 opacity-50 pointer-events-none">•</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
