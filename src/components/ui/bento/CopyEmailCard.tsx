"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { bentoVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/context/I18nContext";

export function CopyEmailCard() {
  const [copied, setCopied] = useState(false);
  const email = "Ryufg.100@gmail.com";
  const { t } = useI18n();

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-secure contexts (like mobile local network testing)
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error("Fallback copy failed", error);
        } finally {
          textArea.remove();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <motion.button
      variants={bentoVariants}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={cn(
        "md:col-span-4 md:row-span-2 flex flex-col items-center justify-center rounded-3xl border transition-all duration-300 p-8 glass-card group relative overflow-hidden active:scale-95",
        copied 
          ? "border-green-500/50 bg-green-950/30" 
          : "border-white/10 bg-white/5 hover:border-vegaCyan/50 hover:bg-nebulaPurple/20"
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
