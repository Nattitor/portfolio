export interface Profile {
  name: string;
  role: string;
  location: string;
  availability: string;
}

export interface Project {
  id: string;
  title: string;
  category?: string;
  shortDescription: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  image?: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "Freddy Guerra",
    role: "Web Developer",
    location: "Merlo, Buenos Aires, Argentina",
    availability: "Available for remote work",
  },
  projects: [
    {
      id: "01",
      title: "Nattitor Analytics Dashboard",
      category: "FULL-STACK / B2B",
      shortDescription: "Enterprise-grade analytics dashboard featuring server-side pagination, complex data visualization, and fluid layout animations within a strict Dark Brutalist design system.",
      technologies: ["Next.js 15", "Supabase", "Tailwind CSS", "Recharts", "Framer Motion"],
      liveUrl: "https://nattitor-dashboard.vercel.app/",
      repoUrl: "https://github.com/Nattitor/b2b-dashboard",
      image: "/images/projects/nattitor-dashboard.webp"
    },
    {
      id: "project-1",
      title: "Apex SaaS Engine",
      category: "Full-Stack",
      shortDescription: "Enterprise resource and analytics management dashboard built for high-scale workflows.",
      technologies: ["Next.js", "Tailwind CSS", "Supabase", "PostgreSQL"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: "project-2",
      title: "NeuraMind AI",
      category: "AI Integration",
      shortDescription: "Next-gen intelligent workspace integrating generative AI for creative content workflows.",
      technologies: ["React", "Node.js", "Gemini API", "Framer Motion"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: "project-3",
      title: "VogueVault Storefront",
      category: "Transactional Logic",
      shortDescription: "A modern, lightning-fast e-commerce engine with full Stripe API integration.",
      technologies: ["Next.js", "Zustand", "Stripe API", "Tailwind CSS"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: "project-4",
      title: "PulseStream Hub",
      category: "Sockets & Interactivity",
      shortDescription: "Low-latency real-time collaborative workspace powered by WebSocket architecture.",
      technologies: ["React", "Express", "Socket.io", "Tailwind CSS"],
      liveUrl: "#",
      repoUrl: "#",
    },
  ],
};
