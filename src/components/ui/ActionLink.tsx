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
        "inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all duration-300 active:scale-95 active:opacity-80",
        isPrimary
          ? "text-slate-300 border border-vegaBlue/40 bg-nightBg/50 px-4 py-2 group-data-[mobile-active=true]:border-vegaCyan group-data-[mobile-active=true]:text-vegaCyan group-data-[mobile-active=true]:shadow-[0_0_15px_rgba(120,213,225,0.2)] md:hover:border-vegaCyan md:hover:text-vegaCyan md:hover:shadow-[0_0_15px_rgba(120,213,225,0.2)] active:bg-vegaBlue/20 active:border-vegaCyan"
          : "text-slate-300 border border-vegaBlue/30 bg-vegaBlue/10 px-4 py-2 group-data-[mobile-active=true]:border-vegaCyan/40 group-data-[mobile-active=true]:text-paper md:hover:border-vegaCyan/40 md:hover:text-paper active:bg-vegaBlue/15"
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
