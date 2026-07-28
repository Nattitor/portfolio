"use client";

import React, { useRef, useState } from "react";
import { motion, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { bentoVariants } from "@/lib/motion";

import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  TailwindIcon,
  FramerIcon,
  NodejsIcon,
  SupabaseIcon,
  PostgresqlIcon,
} from "./TechIcons";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function TechMarquee() {
  const baseTech = [
    { name: "REACT", color: "#61DAFB", Icon: ReactIcon },
    { name: "NEXT.JS", color: "#FFFFFF", Icon: NextjsIcon },
    { name: "TYPESCRIPT", color: "#3178C6", Icon: TypeScriptIcon },
    { name: "TAILWIND CSS", color: "#38B2AC", Icon: TailwindIcon },
    { name: "FRAMER MOTION", color: "#F51996", Icon: FramerIcon },
    { name: "NODE.JS", color: "#339933", Icon: NodejsIcon },
    { name: "SUPABASE", color: "#3ECF8E", Icon: SupabaseIcon },
    { name: "POSTGRESQL", color: "#4169E1", Icon: PostgresqlIcon },
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
      className="md:col-span-6 md:row-span-1 flex items-center overflow-hidden rounded-3xl border border-white/10 bg-transparent py-4 md:py-0 min-h-[100px] relative select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      
      <motion.div 
        className="flex w-max whitespace-nowrap"
        style={{ x, willChange: "transform" }}
      >
        {technologies.map((tech, index) => (
          <React.Fragment key={index}>
            <span 
              className="group flex items-center gap-3 text-3xl md:text-5xl font-display font-black uppercase text-transparent text-stroke-white opacity-40 hover:opacity-100 hover:text-stroke-0 transition-all cursor-default"
              style={{ "--brand-color": tech.color } as React.CSSProperties}
            >
              <tech.Icon className="w-7 h-7 md:w-10 md:h-10 text-white/20 group-hover:text-[var(--brand-color)] transition-colors duration-300" />
              <span className="group-hover:text-[var(--brand-color)] transition-colors duration-300">
                {tech.name}
              </span>
            </span>
            <span className="text-ayabeGold mx-6 md:mx-10 text-2xl md:text-4xl pointer-events-none transition-all duration-300">✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </motion.div>
  );
}
