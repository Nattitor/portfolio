"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "America/Argentina/Buenos_Aires";

export function LiveClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    try {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      const updateClock = () => setTime(formatter.format(new Date()));

      updateClock();
      const interval = setInterval(updateClock, 60_000);
      return () => clearInterval(interval);
    } catch {
      // Keep the initial placeholder when this time zone is unavailable.
    }
  }, []);

  return <span className={`tabular-nums tracking-normal select-none ${className}`}>{time}</span>;
}
