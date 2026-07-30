import { cn } from "@/lib/utils";
import { ExternalLink, Code2 } from "lucide-react";

export function ActionLink({ href, type, label }: { href: string; type: "primary" | "secondary"; label: string }) {
  const isPrimary = type === "primary";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-300 active:scale-95",
        isPrimary
          ? "text-slate-300 border border-white/10 bg-[#0B0F19]/50 px-4 py-2 hover:border-[#00E5FF] hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          : "text-slate-300 border border-white/10 bg-white/5 px-4 py-2 hover:border-white/30 hover:text-white"
      )}
    >
      <span>{label}</span>
      {isPrimary ? (
        <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
      ) : (
        <Code2 className="w-3.5 h-3.5" strokeWidth={2.5} />
      )}
    </a>
  );
}
