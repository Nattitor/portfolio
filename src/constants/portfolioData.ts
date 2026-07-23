export interface Profile {
  name: string;
  role: string;
  location: string;
  availability: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "John Doe", // TODO: Replace with your actual name
    role: "Web Developer",
    location: "Merlo, Buenos Aires, Argentina",
    availability: "Available for remote work",
  },
  projects: [
    {
      id: "project-1",
      title: "Modern E-Commerce",
      shortDescription: "A fast, asymmetric e-commerce platform with glassmorphism elements.",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
      liveUrl: "",
      repoUrl: "",
    },
    {
      id: "project-2",
      title: "Interactive Dashboard",
      shortDescription: "A brutalist-minimalist dashboard for real-time analytics visualization.",
      technologies: ["React", "Framer Motion", "Zustand"],
      liveUrl: "",
      repoUrl: "",
    },
  ],
};
