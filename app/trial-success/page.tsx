"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function TrialSuccessContent() {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get("key") ?? "your-api-key";
  const [copied, setCopied] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const curlExample = `curl "https://api.siteenrich.io/analyze?url=examplecontractor.com/%3Futm_source%3Dgoogle" \\
-H "X-API-Key: ${apiKey}"`;

  function copyKey() {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyCurl() {
    navigator.clipboard.writeText(curlExample);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="mono text-[#00ff88] text-4xl mb-4">✓</div>

          <h1 className="text-4xl font-light tracking-tight mb-4">
            You’re in. Test 20 scraped URLs.
          </h1>

          <p className="text-[#666] text-sm leading-relaxed">
            Your beta key is ready. Use it to test messy scraped business URLs
            and get usable / review / skip decisions before enrichment or
            outreach.
          </p>
        </div>

        {/* API Key */}
        <div className="card p-6 mb-6">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Your Beta API Key
          </div>

          <div className="flex items-center gap-3">
            <code className="flex-1 text-[#00ff88] text-sm bg-[#111] px-4 py-3 rounded border border-[#1a1a1a] overflow-x-auto">
              {apiKey}
            </code>

            <button
              onClick={copyKey}
              className="mono text-xs px-4 py-3 border border-[#333] rounded hover:border-[#00ff8833] hover:text-[#00ff88] transition-all whitespace-nowrap"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>

        {/* Step 1 - Test it */}
        <div className="card p-6 mb-6">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Step 1 — Test a messy scraped URL
          </div>

          <p className="text-[#666] text-sm mb-4 leading-relaxed">
            Try a URL with tracking parameters, then swap in URLs from your own
            Google Maps, Outscraper, Apify, directory, or CSV exports.
          </p>

          <div className="relative">
            <pre className="text-xs text-[#888] bg-[#111] px-4 py-4 rounded border border-[#1a1a1a] overflow-x-auto leading-6">
              {curlExample}
            </pre>

            <button
              onClick={copyCurl}
              className="absolute top-3 right-3 mono text-xs px-3 py-1.5 border border-[#333] rounded hover:border-[#00ff8833] hover:text-[#00ff88] transition-all"
            >
              {copiedCurl ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>

        {/* Step 2 - What to test */}
        <div className="card p-6 mb-6">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Step 2 — What to run through it
          </div>

          <p className="text-[#666] text-sm mb-4 leading-relaxed">
            SiteEnrich is built for messy scraped business URLs before they hit
            Clay, Apollo, Prospeo, CRM import, or outreach.
          </p>

          <ul className="space-y-2 text-sm text-[#888]">
            {[
              "Tracking URLs from Google Business Profile or ads",
              "Hosted subdomains from website builders",
              "Directory/profile URLs",
              "Dead, blocked, or unreachable sites",
              "Local business websites with contact/quote signals",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[#00ff88] mono mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step 3 - Response schema */}
        <div className="card p-6 mb-8">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Step 3 — Response schema
          </div>

          <pre className="text-xs text-[#888] bg-[#111] px-4 py-4 rounded border border-[#1a1a1a] overflow-x-auto leading-6">{`{
  "inputUrl": "https://examplecontractor.com/%3Futm_source%3Dgoogle",
  "cleanedUrl": "https://examplecontractor.com",
  "sourceType": "tracking_url",
  "needsResolver": false,
  "scoringProfile": "local_service",
  "domain": "examplecontractor.com",
  "companyName": "Example Contractor",
  "emails": ["info@examplecontractor.com"],
  "socials": ["https://facebook.com/examplecontractor"],
  "signals": {
    "hasContactPage": true,
    "hasAboutPage": true,
    "hasPhone": true,
    "hasQuoteCta": true,
    "hasServiceKeywords": true
  },
  "preEnrichment": {
    "status": "usable",
    "score": 90,
    "reasons": [
      "Tracking URL cleaned",
      "Real business website detected",
      "Contact page found"
    ],
    "warnings": []
  },
  "error": null,
  "errorMessage": null
}`}</pre>
        </div>

        {/* Step 4 - Workflow */}
        <div className="card p-6 mb-8">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Step 4 — Plug it into your workflow
          </div>

          <p className="text-[#666] text-sm mb-4 leading-relaxed">
            Use the API in n8n, Google Sheets, Make, Zapier, or your own script:
            scraped URL → SiteEnrich → usable / review / skip → enrichment or
            outreach.
          </p>

          <a
            href="https://github.com/AlextheGrace/siteenrich-n8n-workflow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mono text-xs px-4 py-2.5 border border-[#333] rounded hover:border-[#00ff8833] hover:text-[#00ff88] transition-all"
          >
            View n8n workflow on GitHub →
          </a>
        </div>

        <div className="text-center">
          <p className="text-[#444] text-sm mono">
            Want us to run a full CSV? Email{" "}
            <a href="mailto:info@siteenrich.io" className="text-[#00ff88]">
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