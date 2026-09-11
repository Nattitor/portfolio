"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    // Only run this once on mount
    const nattitorAscii = `
  _   _       _   _   _ _             
 | \\ | |     | | | | (_) |            
 |  \\| | __ _| |_| |_ _| |_ ___  _ __ 
 | . \` |/ _\` | __| __| | __/ _ \\| '__|
 | |\\  | (_| | |_| |_| | || (_) | |   
 \\_| \\_/\\__,_|\\__|\\__|_|\\__\\___/|_|   
                                      
`;
    
    console.log(
      `%c${nattitorAscii}%c\nLooking under the hood? I respect that.\nWelcome to the portfolio of Freddy Guerra.\n%c> github.com/Nattitor\n%c✦ Vega — the brightest star of Lyra. Like a shooting star.`,
      "color: #78d5e1; font-weight: bold; font-family: monospace;",
      "color: #a9b0c3; font-family: sans-serif; font-size: 14px;",
      "color: #c8a45e; font-family: monospace; font-size: 12px; margin-top: 8px; display: block;",
      "color: #78d5e1; font-family: monospace; font-size: 11px; display: block; margin-top: 6px;"
    );
  }, []);

  return null;
}
