import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "SiteEnrich — Website Enrichment API",
  description:
    "Turn any company URL into structured data instantly. SiteEnrich returns clean JSON with company name, emails, social links, and business signals. Built for n8n, Zapier, and Make workflows. No parsing needed.",
  openGraph: {
    title: "SiteEnrich — Website Enrichment API",
    description:
      "Turn any company URL into structured data instantly. Clean JSON with emails, socials, and business signals. Built for n8n and Zapier workflows.",
    url: "https://siteenrich.io",
    siteName: "SiteEnrich",
    type: "website",
    images: [
      {
        url: "https://siteenrich.io/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "SiteEnrich — Website Enrichment API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteEnrich — Website Enrichment API",
    description:
      "Turn any company URL into structured data instantly. Built for n8n and Zapier workflows.",
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
      <body>{children}</body>
      <GoogleAnalytics gaId="G-CM1P64KGW5" />
    </html>
  );
}