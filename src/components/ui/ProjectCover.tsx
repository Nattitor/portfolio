// Editorial artwork for Vellura, not a screenshot of its interface.
export function ProjectCover() {
  return (
    <div aria-hidden="true" className="project-cover project-cover-vellura">
      <span className="project-cover-wordmark">Vellura<span className="text-starGold">.</span></span>
      <svg viewBox="0 0 440 240" fill="none" className="vellura-documents" focusable="false">
        <g transform="rotate(-12 254 120)">
          <rect x="196" y="40" width="114" height="158" rx="6" fill="#3865a1" fillOpacity="0.17" stroke="#78d5e1" strokeOpacity="0.3" />
          <path d="M212 68h34m-34 16h78m-78 12h70m-70 12h75m-75 24h76m-76 12h59" stroke="#78d5e1" strokeOpacity="0.35" strokeWidth="2" />
        </g>
        <g transform="rotate(7 308 137)">
          <rect x="252" y="58" width="114" height="158" rx="6" fill="#dce5e2" />
          <path d="M268 85h28" stroke="#3865a1" strokeWidth="3" />
          <path d="M268 108h80m-80 10h73m-73 10h78m-78 22h79m-79 10h66m-66 10h77" stroke="#536674" strokeOpacity="0.65" strokeWidth="2" />
          <path d="M268 192h24" stroke="#c8a45e" strokeWidth="3" />
          <path d="m340 191 3 3 7-8" stroke="#3865a1" strokeWidth="2" />
        </g>
        <path d="M87 166h56m-7-6 7 6-7 6" stroke="#78d5e1" strokeOpacity="0.5" />
        <text x="53" y="171" fill="#78d5e1" fontSize="13" fontFamily="monospace">CV</text>
        <text x="151" y="171" fill="#c8a45e" fontSize="13" fontFamily="monospace">PDF</text>
      </svg>
    </div>
  );
}
