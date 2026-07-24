import { Hero } from "@/components/layout/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <ProjectsSection />
    </main>
  );
}
