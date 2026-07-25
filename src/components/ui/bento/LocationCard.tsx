"use client";

import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function LocationCard() {
  return (
    <motion.div
      variants={itemVariants}
      className="md:col-span-2 md:row-span-2 relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 glass-card"
    >
      {/* Abstract Map Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentCyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accentCyan"></span>
        </span>
        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Online</span>
      </div>
      
      <div className="relative z-10 mt-24">
        <h3 className="text-xl font-display font-bold text-white">Merlo, Buenos Aires</h3>
        <p className="text-sm font-mono text-zinc-400 mt-1 uppercase tracking-wider">Argentina (GMT-3)</p>
      </div>
    </motion.div>
  );
}
