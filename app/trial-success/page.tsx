"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function TrialSuccessContent() {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get("key") ?? "your-api-key";
  const [copied, setCopied] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const curlExample = `curl "https://api.siteenrich.io/analyze?url=stripe.com" \\
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
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="mono text-[#00ff88] text-4xl mb-4">✓</div>
          <h1 className="text-4xl font-light tracking-tight mb-4">
            You're in. Here's your API key.
          </h1>
          <p className="text-[#666] text-sm">
            Your key has also been sent to your email. 7-day free trial — no credit card needed.
          </p>
        </div>

        {/* API Key */}
        <div className="card p-6 mb-6">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Your API Key
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
            Step 1 — Test it right now
          </div>
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

        {/* Step 2 - n8n */}
        <div className="card p-6 mb-6">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Step 2 — Use it in n8n
          </div>
          <p className="text-[#666] text-sm mb-4">
            Import our pre-built workflow that pre-qualifies leads before Apollo — saves 70% on credits.
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

        {/* Step 3 - Docs */}
        <div className="card p-6 mb-8">
          <div className="mono text-xs text-[#444] uppercase tracking-widest mb-3">
            Step 3 — Response schema
          </div>
          <pre className="text-xs text-[#888] bg-[#111] px-4 py-4 rounded border border-[#1a1a1a] overflow-x-auto leading-6">{`{
  "domain": "stripe.com",
  "companyName": "Stripe",
  "emails": ["support@stripe.com"],
  "socials": ["https://twitter.com/stripe"],
  "signals": {
    "hasCareersPage": true,
    "hasPricingPage": true,
    "hasContactPage": true,
    "hasAboutPage": true,
    "hasDemoCta": false
  },
  "error": null
}`}</pre>
        </div>

        <div className="text-center">
          <p className="text-[#444] text-sm mono">
            Questions? Reply to the email we just sent you or email{" "}
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