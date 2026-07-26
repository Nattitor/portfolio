"use client";

import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const socials = [
  { name: "@Nattitor", url: "https://github.com/Nattitor", icon: <GithubIcon className="w-4 h-4" /> },
  { name: "@Nattitor", url: "https://linkedin.com/in/Nattitor", icon: <LinkedinIcon className="w-4 h-4" /> },
];

export function SocialLinksCard() {
  const { t } = useI18n();

  return (
    <motion.div
      variants={bentoVariants}
      className="md:col-span-2 md:row-span-2 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950 p-6 glass-card relative"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-zinc-500" />
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">{t.bento.social.connect}</span>
      </div>

      <div className="flex flex-col gap-3">
        {socials.map((social) => (
          <a
            key={social.url}
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
            <ArrowUpRight 
              className="w-4 h-4 text-zinc-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-accentCyan" 
              strokeWidth={2}
            />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
