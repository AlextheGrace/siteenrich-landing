"use client";

import { Suspense } from "react";
import CsvUpload from "@/components/CsvUpload";

function TrialSuccessContent() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="mono text-[#00ff88] text-4xl mb-4">✓</div>
          <h1 className="text-4xl font-light tracking-tight mb-4">
            You're in. Run 100 CSV rows free.
          </h1>
          <p className="text-[#666] text-sm leading-relaxed max-w-xl mx-auto">
            Upload a small Google Maps, Outscraper, or Apify CSV and SiteEnrich
            will return a cleaned outreach-ready CSV with cleaned domains,
            emails and phones found where possible, basic MX email verification,
            duplicate flags, sendable / review / skip, and reasons.
          </p>
        </div>

        <CsvUpload />

        <div className="text-center mt-16">
          <p className="mono text-xs text-[#444]">
            Questions? Email{" "}
            <a href="mailto:info@siteenrich.io" className="text-[#00ff88] hover:opacity-80 transition-opacity">
              info@siteenrich.io
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function TrialSuccess() {
  return (
    <Suspense>
      <TrialSuccessContent />
    </Suspense>
  );
}