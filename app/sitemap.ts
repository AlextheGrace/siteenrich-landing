import type { MetadataRoute } from "next";

const BASE = "https://siteenrich.io";

// Only pages with genuine content go here. Add slugs as each is written.
const landingSlugs = ["outscraper-csv-cleaner"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...landingSlugs.map((slug) => ({
      url: `${BASE}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}