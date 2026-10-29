export interface Project {
  id: "dashboard" | "vellura" | "miru";
  status: "published" | "development";
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
}

export const portfolioData = {
  profile: {
    name: "Freddy Guerra",
    handle: "Nattitor",
    url: "https://nattitor-portfolio.vercel.app",
    email: "Ryufg.100@gmail.com",
  },
  projects: [
    {
      id: "dashboard",
      status: "published",
      technologies: ["Next.js", "TypeScript", "Supabase", "Recharts", "Tailwind CSS"],
      liveUrl: "https://nattitor-dashboard.vercel.app/",
      repoUrl: "https://github.com/Nattitor/b2b-dashboard",
      image: "/images/projects/nattitor-dashboard.webp",
    },
    {
      id: "vellura",
      status: "published",
      technologies: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
      liveUrl: "https://vellura-ai.vercel.app/",
      repoUrl: "https://github.com/Nattitor/Vellura",
    },
    {
      id: "miru",
      status: "development",
      technologies: [],
    },
  ] satisfies Project[],
};
