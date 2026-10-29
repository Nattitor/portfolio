"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copying" | "copied" | "error";

function fallbackCopy(text: string): boolean {
  const previousFocus = document.activeElement;
  const input = document.createElement("textarea");
  input.value = text;
  input.readOnly = true;
  input.setAttribute("aria-hidden", "true");
  input.style.cssText = "position:fixed;top:0;left:-9999px";
  document.body.append(input);
  try {
    input.select();
    return document.execCommand("copy");
  } finally {
    input.remove();
    if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
  }
}

export function useClipboard(timeoutMs = 2500) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  const copying = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    if (copying.current) return;
    copying.current = true;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setStatus("copying");
    let copied: boolean;
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = fallbackCopy(text);
        }
      } else {
        copied = fallbackCopy(text);
      }
    } catch {
      copied = false;
    } finally {
      copying.current = false;
    }
    if (!mounted.current) return;
    setStatus(copied ? "copied" : "error");
    if (copied) {
      resetTimer.current = setTimeout(() => setStatus("idle"), timeoutMs);
    }
  }, [timeoutMs]);

  return { status, copyToClipboard };
}
