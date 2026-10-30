interface StatusBadgeProps {
  statusText: string;
  className?: string;
}

export function StatusBadge({ statusText, className = "" }: StatusBadgeProps) {
  return (
    <div className={`flex max-w-[65%] items-center gap-2 text-[11px] font-medium sm:text-xs ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-vegaCyan shadow-[0_0_8px_#78d5e150]" />
      <span className="text-slate-300">{statusText}</span>
    </div>
  );
}
