import { portfolioData } from "@/constants/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="relative w-full px-6 py-20 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <div className="text-accentCyan font-mono text-sm md:text-base uppercase tracking-widest mb-3">
          // SELECTED WORKS
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
          Proyectos <span className="text-stroke-white">Destacados</span>
        </h2>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
