import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "SiteEnrich — Scraped Business URL QA",
  description:
    "Clean and classify scraped business URLs before enrichment or outreach. SiteEnrich returns usable, review, or skip decisions for lead lists.",
  openGraph: {
    title: "SiteEnrich — Scraped Business URL QA",
    description:
      "Turn messy scraped business URLs into usable company rows before enrichment or outreach. Clean, classify, and route lead-list URLs.",
    url: "https://siteenrich.io",
    siteName: "SiteEnrich",
    type: "website",
    images: [
      {
        url: "https://siteenrich.io/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "SiteEnrich — Scraped Business URL QA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteEnrich — Scraped Business URL QA",
    description:
      "Turn messy scraped business URLs into usable company rows before enrichment or outreach.",
    images: ["https://siteenrich.io/web-app-manifest-192x192.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-CM1P64KGW5" />
      </body>
    </html>
  );
}