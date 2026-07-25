"use client";

import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function BioCard() {
  return (
    <motion.div
      variants={itemVariants}
      className="md:col-span-4 md:row-span-2 flex flex-col justify-center rounded-3xl border border-white/10 bg-zinc-900/50 p-8 lg:p-12 glass-card relative overflow-hidden"
    >
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] pointer-events-none rounded-full"
      />
      <h2 className="relative z-10 font-display font-black text-2xl sm:text-3xl lg:text-4xl leading-tight text-white uppercase tracking-tight">
        Software Engineer <span className="text-zinc-500">obsesionado con el rendimiento y el</span> diseño pixel-perfect.
      </h2>
      <p className="relative z-10 mt-6 font-mono text-sm md:text-base text-zinc-400 max-w-2xl">
        OPERANDO A NIVEL GLOBAL // ENFOCADO EN EQUIPOS REMOTOS DE ALTO NIVEL PARA CREAR EXPERIENCIAS DIGITALES QUE SUPERAN LAS EXPECTATIVAS.
      </p>
    </motion.div>
  );
}
