import type { MetadataRoute } from "next";
import { portfolioData } from "@/constants/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: portfolioData.profile.url }];
}
