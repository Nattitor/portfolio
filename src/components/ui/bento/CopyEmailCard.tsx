"use client";

import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/context/I18nContext";
import { useClipboard } from "@/hooks/useClipboard";

export function CopyEmailCard() {
  const { hasCopied: copied, copyToClipboard } = useClipboard(1000);
  const email = "Ryufg.100@gmail.com";
  const { t } = useI18n();

  const handleCopy = () => copyToClipboard(email);

  return (
    <motion.button
      variants={bentoVariants}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={cn(
        "md:col-span-4 md:row-span-2 flex flex-col items-center justify-center rounded-3xl transition-all duration-300 p-8 glass-panel group relative overflow-hidden active:scale-95",
        copied 
          ? "border-green-500/50 bg-green-950/30" 
          : "hover:border-vegaCyan/50 hover:bg-nebulaPurple/20"
      )}
    >
      <div className={`absolute inset-0 transition-opacity blur-3xl pointer-events-none ${copied ? 'opacity-100 bg-green-500/20' : 'opacity-0 md:group-hover:opacity-100 bg-vegaCyan/10'}`} />
      
      <span className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-4">
        {copied ? t.bento.contact.success : t.bento.contact.letsTalk}
      </span>
      
      <h3 className={`font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight transition-colors select-none ${copied ? 'text-green-400' : 'text-white'}`}>
        {copied ? t.bento.contact.copied : email}
      </h3>
      
      <p className={`mt-6 text-xs font-mono uppercase tracking-widest transition-colors ${copied ? 'text-green-500' : 'text-slate-500 md:group-hover:text-vegaCyan'}`}>
        {copied ? t.bento.contact.ready : t.bento.contact.click}
      </p>
    </motion.button>
  );
}
