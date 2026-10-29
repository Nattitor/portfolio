import { ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionLink({ href, type, label, accessibleLabel }: {
  href: string;
  type: "primary" | "secondary";
  label: string;
  accessibleLabel: string;
}) {
  const Icon = type === "primary" ? ExternalLink : Code2;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={accessibleLabel}
      className={cn("min-h-11 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors", type === "primary"
        ? "border-vegaCyan/40 text-vegaCyan hover:bg-vegaBlue/20"
        : "border-vegaCyan/20 text-slate-300 hover:border-vegaCyan/50 hover:text-paper")}
    >
      {label}<Icon aria-hidden="true" size={16} />
    </a>
  );
}
