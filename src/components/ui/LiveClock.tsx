"use client";

import { useEffect, useState } from "react";

export function LiveClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string>("00:00:00");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Update the time immediately and then every second
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Use 24h format for a more brutalist/dev feel
      });
      setTime(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`tabular-nums tracking-widest select-none cursor-default before:content-[attr(data-time)] ${className}`} 
      data-time={mounted ? time : "00:00:00"} 
      suppressHydrationWarning
    />
  );
}
