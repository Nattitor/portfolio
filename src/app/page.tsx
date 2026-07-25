import { Hero } from "@/components/layout/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BentoSection } from "@/components/sections/BentoSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <Hero />
      <ProjectsSection />
      <BentoSection />
    </main>
  );
}
