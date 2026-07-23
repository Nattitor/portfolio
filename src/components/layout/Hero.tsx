import { portfolioData } from "@/constants/portfolioData";

export function Hero() {
  const { profile } = portfolioData;

  const [firstName, ...lastNameParts] = profile.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 py-12 md:px-16 md:py-20 lg:px-24 overflow-hidden pt-24 md:pt-32">
      {/* Background Decorative Watermark */}
      <div className="absolute top-1/4 -right-12 select-none pointer-events-none opacity-[0.03] text-accentCyan font-display font-black text-9xl md:text-[20rem] leading-none z-0">
        DEV
      </div>

      {/* Top Asymmetric Bar: Status & Location */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full text-xs md:text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentCyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accentCyan"></span>
          </span>
          <span className="text-zinc-300">{profile.availability}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-500 font-mono tracking-wide">
          📍 {profile.location}
        </div>
      </div>

      {/* Main Asymmetric Typography Area */}
      <div className="relative z-10 my-auto py-12 flex flex-col justify-center">
        {/* Subtitle / Role Tag */}
        <div className="inline-block text-accentCyan font-mono text-sm md:text-base uppercase tracking-widest mb-4">
          // {profile.role}
        </div>

        {/* Gigantic Asymmetric Heading */}
        <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.9] tracking-tighter text-white uppercase select-none">
          {firstName}
          <br />
          <span className="text-gradient-accent ml-4 md:ml-12 lg:ml-24 block">
            {lastName}
          </span>
        </h1>

        {/* Asymmetric Description & CTA Row */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <p className="max-w-md text-zinc-400 text-base md:text-lg font-normal leading-relaxed">
            Especializado en interfaces web modernas, asimétricas y con experiencias interactivas de alto impacto visual.
          </p>

          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-display font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span>Ver proyectos</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Decorative Indicator */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-600 border-t border-white/5 pt-4">
        <span>[ PORTFOLIO v2026 ]</span>
        <span className="animate-bounce">↓ SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
