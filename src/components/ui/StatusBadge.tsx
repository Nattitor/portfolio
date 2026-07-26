import React from "react";

interface StatusBadgeProps {
  statusText: string;
  className?: string;
}

export function StatusBadge({ statusText, className = "" }: StatusBadgeProps) {
  return (
    <div className={`flex items-center gap-3 glass-card px-4 py-2 rounded-full text-xs md:text-sm font-medium ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
      </span>
      <span className="text-zinc-300">{statusText}</span>
    </div>
  );
}
