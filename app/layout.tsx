import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://siteenrich.io"),
  title: "SiteEnrich — Clean Google Maps & Outscraper CSVs",
  description:
    "Upload messy Google Maps, Outscraper, Apify, or scraped local business CSVs and get an outreach-ready file with cleaned domains, contacts, duplicate flags, MX status, and sendable/review/skip reasons.",
  openGraph: {
    title: "SiteEnrich — Clean Google Maps & Outscraper CSVs",
    description:
      "Turn messy scraped local business CSVs into outreach-ready files. Clean domains, find emails and phones where possible, flag duplicates and junk rows, run basic MX checks, and classify rows as sendable, review, or skip.",
    url: "https://siteenrich.io",
    siteName: "SiteEnrich",
    type: "website",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "SiteEnrich — Clean Google Maps and Outscraper CSVs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteEnrich — Clean Google Maps & Outscraper CSVs",
    description:
      "Upload a messy scraped lead CSV and download a cleaned outreach-ready file with contacts, duplicate flags, MX status, and sendable/review/skip reasons.",
    images: ["/web-app-manifest-512x512.png"],
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