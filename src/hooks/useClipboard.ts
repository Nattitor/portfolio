import { useState, useCallback } from "react";

export function useClipboard(timeoutMs: number = 1000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure contexts (like mobile local network testing)
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error("Fallback copy failed", error);
        } finally {
          textArea.remove();
        }
      }
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeoutMs);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [timeoutMs]);

  return { hasCopied, copyToClipboard };
}
