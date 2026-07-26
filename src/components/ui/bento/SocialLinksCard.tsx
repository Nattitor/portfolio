"use client";

import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";

const socials = [
  { name: "GITHUB", url: "#", icon: "GH" },
  { name: "LINKEDIN", url: "#", icon: "IN" },
];

export function SocialLinksCard() {
  return (
    <motion.div
      variants={bentoVariants}
      className="md:col-span-2 md:row-span-2 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950 p-6 glass-card relative"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-zinc-500" />
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Connect</span>
      </div>

      <div className="flex flex-col gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar perfil de ${social.name}`}
            className="group flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:border-accentCyan/50 hover:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-xs font-mono font-bold text-white group-hover:bg-accentCyan group-hover:text-black transition-colors">
                {social.icon}
              </span>
              <span className="font-mono text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                {social.name}
              </span>
            </div>
            <svg 
              aria-hidden="true"
              className="w-4 h-4 text-zinc-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-accentCyan" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
