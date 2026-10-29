import React from "react";

interface StatusBadgeProps {
  statusText: string;
  className?: string;
}

export function StatusBadge({ statusText, className = "" }: StatusBadgeProps) {
  return (
    <div className={`flex min-h-[44px] items-center gap-3 rounded-full border border-vegaCyan/15 bg-nightDeep/70 px-4 py-2 text-xs md:text-sm font-medium ${className}`}>
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-vegaCyan" />
      <span className="text-slate-300">{statusText}</span>
    </div>
  );
}
