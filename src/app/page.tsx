import { Hero } from "@/components/layout/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BentoSection } from "@/components/sections/BentoSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProjectsSection />
        <BentoSection />
      </main>
      <Footer />
    </>
  );
}
