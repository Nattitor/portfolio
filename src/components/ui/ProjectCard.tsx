import { Project } from "@/constants/portfolioData";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/40 p-6 md:p-8 backdrop-blur-md ${
        featured ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Mock Glassmorphism Image Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 flex items-center justify-center p-6 mb-6 glass-card">
        <div className="absolute inset-0 bg-accentCyan/5 opacity-50 blur-xl pointer-events-none" />
        <span className="font-display font-bold text-lg md:text-xl text-zinc-300 text-center tracking-wide uppercase select-none">
          {project.title}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          {project.category && (
            <div className="text-xs font-mono uppercase tracking-widest text-accentCyan mb-2">
              // {project.category}
            </div>
          )}

          <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
            {project.title}
          </h3>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
