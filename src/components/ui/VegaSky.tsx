/* Ayabe / Admire Vega: Lyra, with Vega above its triangle and parallelogram.
   Epsilon Lyrae is drawn as a pair rather than a single point. */
export function LyraConstellation({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="28 25 145 140" className={className} aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.5" fill="none">
        <path d="M62 50 L92 66 M62 50 L52 84 M52 84 L92 66 M92 66 L146 92 L134 140 L104 118 Z" />
      </g>
      <g fill="currentColor">
        <path className="lyra-vega" d="M62 44 l1.5 4.5 4.5 1.5 -4.5 1.5 -1.5 4.5 -1.5 -4.5 -4.5 -1.5 4.5 -1.5 z" />
        <circle cx="51.1" cy="83.1" r="0.8" />
        <circle cx="53.1" cy="85.1" r="0.8" />
        <circle cx="92" cy="66" r="1.3" />
        <circle cx="146" cy="92" r="1.2" />
        <circle cx="134" cy="140" r="1.5" />
        <circle cx="104" cy="118" r="1.1" />
      </g>
    </svg>
  );
}

// A single brief pass, recalling Ayabe's “Like a Shooting Star”; never a loop.
export function ShootingStar() {
  return <span aria-hidden="true" className="shooting-star" />;
}
