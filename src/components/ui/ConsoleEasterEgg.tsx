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
      `%c${nattitorAscii}%c\nLooking under the hood? I respect that.\nWelcome to the portfolio of Freddy Guerra.\n%c> github.com/Nattitor`,
      "color: #06b6d4; font-weight: bold; font-family: monospace;",
      "color: #a1a1aa; font-family: sans-serif; font-size: 14px;",
      "color: #10b981; font-family: monospace; font-size: 12px; margin-top: 8px; display: block;"
    );
  }, []);

  return null;
}
