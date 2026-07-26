import { cn } from "@/lib/utils";

export function ActionLink({ href, type, label }: { href: string; type: "primary" | "secondary"; label: string }) {
  const isPrimary = type === "primary";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-colors",
        isPrimary
          ? "text-black bg-white px-4 py-2 hover:bg-accentCyan shadow-sm"
          : "text-zinc-300 border border-white/10 bg-white/5 px-4 py-2 hover:border-white/30 hover:text-white"
      )}
    >
      <span>{label}</span>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isPrimary ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        )}
      </svg>
    </a>
  );
}
