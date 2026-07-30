"use client";

import { motion } from "framer-motion";
import { Project } from "@/constants/portfolioData";
import { ActionLink } from "@/components/ui/ActionLink";
import { useI18n } from "@/context/I18nContext";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const formattedIndex = (index + 1).toString().padStart(2, "0");
  const { t } = useI18n();

  return (
    <motion.article
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      whileHover={{ y: -6 }}
      style={{ willChange: "transform, opacity" }}
      className="group relative flex h-full w-full flex-col justify-between rounded-2xl glass-card p-6 md:p-8 transition-all duration-300 hover:border-vegaCyan/30 hover:shadow-[inset_0_0_30px_rgba(0,229,255,0.08)]"
    >
      {/* Top Header Row: Index & Category */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {project.category ? (
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-vegaCyan">
            <span className="h-1.5 w-1.5 rounded-full bg-vegaCyan animate-pulse" />
            {project.category}
          </span>
        ) : (
          <div />
        )}
        <span className="font-mono text-xs text-slate-600 font-bold tracking-widest">
          [{formattedIndex}]
        </span>
      </div>

      {/* Mock Glassmorphism Image Container with Brutalist Noise */}
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 mb-6 glass-card group-hover:border-white/20 transition-colors"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-vegaCyan/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity pointer-events-none mix-blend-screen" />
        <span className="relative z-10 font-display font-bold text-lg md:text-xl text-slate-300 text-center tracking-wide uppercase select-none group-hover:text-white transition-colors">
          {project.title}
        </span>
        <span className="relative z-10 mt-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          {t.projects.previewUnavailable}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3 group-hover:text-vegaCyan transition-colors select-text">
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-normal select-text">
            {project.shortDescription}
          </p>
        </div>

        {/* Bottom Metadata: Tech Pills & Action Buttons */}
        <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-700/50 bg-[#243870]/30 px-2.5 py-1 text-xs font-mono text-slate-300 transition-colors hover:border-[#00E5FF]/50 hover:text-[#00E5FF]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && (
              <ActionLink href={project.liveUrl} type="primary" label={t.projects.liveDemo} />
            )}
            {project.repoUrl && (
              <ActionLink href={project.repoUrl} type="secondary" label={t.projects.sourceCode} />
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
