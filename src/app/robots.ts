import type { MetadataRoute } from "next";
import { portfolioData } from "@/constants/portfolioData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${portfolioData.profile.url}/sitemap.xml`,
  };
}
