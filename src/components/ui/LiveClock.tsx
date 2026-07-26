"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
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
    <span className="font-mono font-bold text-accentCyan tabular-nums tracking-widest bg-white/5 px-2 py-0.5 rounded-md border border-white/10" suppressHydrationWarning>
      {mounted ? time : "00:00:00"}
    </span>
  );
}
