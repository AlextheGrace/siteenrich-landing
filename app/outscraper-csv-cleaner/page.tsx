import type { Metadata } from "next";
import LandingTemplate from "@/components/LandingTemplate";
import { landingConfigs } from "@/lib/landingConfigs";

const config = landingConfigs["outscraper-csv-cleaner"];

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: { canonical: `https://siteenrich.io/${config.slug}` },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    url: `https://siteenrich.io/${config.slug}`,
    type: "article",
  },
};

export default function Page() {
  return <LandingTemplate config={config} />;
}