import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiteEnrich — Website Enrichment API",
  description:
    "Turn any company URL into structured data. Clean JSON with company name, emails, socials, and business signals. Built for n8n, Zapier, and Make workflows.",
  openGraph: {
    title: "SiteEnrich — Website Enrichment API",
    description:
      "Turn any company URL into structured data. No parsing needed.",
    url: "https://siteenrich.io",
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
    </html>
  );
}