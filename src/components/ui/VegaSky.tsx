/* References to Admire Vega — "the star of Lyra" (Vega is α Lyrae, the
   brightest star in the constellation Lyra).
   Real geometry: small triangle (Vega–Zeta–Epsilon) + parallelogram
   (Zeta–Sheliak–Sulafat–Delta). Epsilon Lyrae is "the Double Double". */

export function LyraConstellation({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {/* Constellation lines */}
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.55" fill="none">
        <path d="M62 50 L92 66 M62 50 L52 84 M52 84 L92 66 M92 66 L146 92 L134 140 L104 118 Z" />
      </g>
      <g fill="currentColor">
        {/* Vega — the star of Lyra, with a four-point sparkle */}
        <path d="M62 44 l1.5 4.5 4.5 1.5 -4.5 1.5 -1.5 4.5 -1.5 -4.5 -4.5 -1.5 4.5 -1.5 z" />
        {/* Epsilon Lyrae — the famous "Double Double" */}
        <circle cx="51.1" cy="83.1" r="1" />
        <circle cx="53.1" cy="85.1" r="1" />
        {/* Zeta, Sheliak, Sulafat, Delta */}
        <circle cx="92" cy="66" r="1.6" />
        <circle cx="146" cy="92" r="1.5" />
        <circle cx="134" cy="140" r="1.8" />
        <circle cx="104" cy="118" r="1.4" />
      </g>
    </svg>
  );
}
