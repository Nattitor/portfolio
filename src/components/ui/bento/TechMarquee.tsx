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
  // Perfect duplication so that the -50% mathematical loop is invisible
  const technologies = [...baseTech, ...baseTech];

  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    // Constant base speed (1.5) without scroll acceleration
    let moveBy = directionFactor.current * -1 * (delta / 1000) * 1.5; 

    // Pause / massive slow down on hover
    if (isHovered) {
      moveBy *= 0.05; 
    }

    baseX.set(baseX.get() + moveBy);
  });

  // wrap(-50, 0, v) ensures a perfect loop
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <motion.div
      variants={bentoVariants}
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
          setIsHovered(false);
        }
      }}
      className="md:col-span-6 md:row-span-1 flex items-center overflow-hidden rounded-3xl border border-white/10 bg-transparent py-4 md:py-0 min-h-[100px] relative select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      
      {/* Base Layer: Gray outline on mobile, interactive on desktop */}
      <motion.div 
        className="flex w-max whitespace-nowrap items-center will-change-transform"
        style={{ x }}
      >
        {technologies.map((tech, index) => (
          <React.Fragment key={`base-${index}`}>
            <span 
              className="group flex items-center gap-3 text-3xl md:text-5xl font-display font-black uppercase text-transparent text-stroke-white opacity-40 md:hover:opacity-100 md:hover:text-stroke-0 transition-all cursor-default select-none"
              style={{ "--brand-color": tech.color } as React.CSSProperties}
            >
              <tech.Icon className="w-7 h-7 md:w-10 md:h-10 text-white/20 md:group-hover:text-[var(--brand-color)] transition-colors duration-300 select-none" />
              <span 
                className="md:group-hover:text-[var(--brand-color)] transition-colors duration-300 select-none before:content-[attr(data-tech)]"
                data-tech={tech.name}
              />
            </span>
            <span className="text-ayabeGold mx-6 md:mx-10 text-2xl md:text-4xl pointer-events-none transition-all duration-300 select-none before:content-['✦']" />
          </React.Fragment>
        ))}
      </motion.div>

      {/* Spotlight Layer: Colored center focus (Mobile Only) */}
      <div 
        className="absolute inset-0 h-full w-full pointer-events-none md:hidden flex items-center"
        style={{ 
          maskImage: "radial-gradient(circle at 50% 50%, black 10%, transparent 40%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 10%, transparent 40%)"
        }}
      >
        <motion.div 
          className="flex w-max whitespace-nowrap items-center will-change-transform"
          style={{ x }}
        >
          {technologies.map((tech, index) => (
            <React.Fragment key={`spotlight-${index}`}>
              <span 
                className="group flex items-center gap-3 text-3xl font-display font-black uppercase text-transparent text-stroke-0 select-none"
                style={{ color: tech.color }}
              >
                <tech.Icon className="w-7 h-7 select-none" style={{ color: tech.color }} />
                <span 
                  className="select-none before:content-[attr(data-tech)]"
                  data-tech={tech.name}
                />
              </span>
              <span className="text-ayabeGold mx-6 text-2xl pointer-events-none select-none before:content-['✦']" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
