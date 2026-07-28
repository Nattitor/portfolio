"use client";

import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";

import { LiveClock } from "@/components/ui/LiveClock";

export function LocationCard() {
  return (
    <motion.div
      variants={bentoVariants}
      className="md:col-span-2 md:row-span-2 relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 glass-card"
    >
      {/* Abstract Map Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-nebulaPurple/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 z-10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vegaCyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-vegaCyan"></span>
        </span>
        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Online</span>
      </div>
      
      {/* Massive Brutalist Clock */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-6 pointer-events-none overflow-hidden">
        <LiveClock className="text-5xl sm:text-6xl md:text-7xl font-mono font-black text-transparent text-stroke-white text-stroke-2 opacity-40 select-none" />
      </div>
      
      <div className="relative z-10 mt-24">
        <h3 className="text-xl font-display font-bold text-white">Merlo, Buenos Aires</h3>
        <p className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">Argentina (GMT-3)</p>
      </div>
    </motion.div>
  );
}
