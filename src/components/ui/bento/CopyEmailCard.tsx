"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";

import { cn } from "@/lib/utils";

export function CopyEmailCard() {
  const [copied, setCopied] = useState(false);
  const email = "Ryufg.100@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      variants={bentoVariants}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={cn(
        "md:col-span-4 md:row-span-2 flex flex-col items-center justify-center rounded-3xl border transition-all duration-300 p-8 glass-card group relative overflow-hidden",
        copied 
          ? "border-green-500/50 bg-green-950/30" 
          : "border-white/10 bg-zinc-900/50 hover:border-accentCyan/50 hover:bg-zinc-900/80"
      )}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none ${copied ? 'bg-green-500/10' : 'bg-accentCyan/10'}`} />
      
      <span className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">
        {copied ? "// SUCCESS" : "// LET'S TALK"}
      </span>
      
      <h3 className={`font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight transition-colors ${copied ? 'text-green-400' : 'text-white'}`}>
        {copied ? "Copied to Clipboard!" : email}
      </h3>
      
      <p className="mt-6 text-xs font-mono uppercase tracking-widest text-zinc-500 group-hover:text-accentCyan transition-colors">
        {copied ? "Ready to paste" : "Click to copy email address"}
      </p>
    </motion.button>
  );
}
