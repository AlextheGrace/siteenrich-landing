"use client";

const json = {
  url: "https://stripe.com",
  domain: "stripe.com",
  companyName: "Stripe",
  metaDescription:
    "Stripe is a financial services platform that helps businesses accept payments.",
  companyBlurb:
    "Stripe helps businesses accept payments, manage billing, and move money globally.",
  emails: [],
  socials: [
    "https://twitter.com/stripe",
    "https://linkedin.com/company/stripe",
  ],
  signals: {
    hasCareersPage: true,
    hasContactPage: true,
    hasAboutPage: true,
    hasPricingPage: true,
    hasDemoCta: true,
  },
  preEnrichment: {
    status: "worth_enriching",
    score: 85,
    reasons: [
      "Pricing page found",
      "Demo CTA found",
      "Careers page found",
      "Contact page found",
      "About page found",
    ],
    warnings: ["No public company email found"],
  },
  error: null,
  errorMessage: null,
};

function JsonLine({
  k,
  v,
  indent = 0,
}: {
  k: string;
  v: unknown;
  indent?: number;
}) {
  if (Array.isArray(v)) {
    return (
      <>
        <div>
          <span style={{ paddingLeft: `${indent * 8}px` }} />
          <span className="text-[#9876aa]">"{k}"</span>
          <span className="text-white">: [</span>
        </div>
        {v.map((item, i) => (
          <div key={i}>
            <span style={{ paddingLeft: (indent + 1) * 8 + "px" }} />
            <span className="text-[#6a9955]">"{String(item)}"</span>
            {i < v.length - 1 && <span className="text-white">,</span>}
          </div>
        ))}
        <div>
          <span style={{ paddingLeft: `${indent * 8}px` }} />
          <span className="text-white">],</span>
        </div>
      </>
    );
  }

  if (typeof v === "object" && v !== null) {
    return (
      <>
        <div>
          <span style={{ paddingLeft: `${indent * 8}px` }} />
          <span className="text-[#9876aa]">"{k}"</span>
          <span className="text-white">: {"{"}</span>
        </div>

        {Object.entries(v).map(([k2, v2]) => (
          <div key={k2} className="pl-4">
            <JsonLine k={k2} v={v2} indent={indent + 1} />
          </div>
        ))}

        <div>
          <span style={{ paddingLeft: `${indent * 8}px` }} />
          <span className="text-white">{"}"},</span>
        </div>
      </>
    );
  }

  if (typeof v === "boolean" || typeof v === "number") {
    return (
      <div>
        <span style={{ paddingLeft: `${indent * 8}px` }} />
        <span className="text-[#9876aa]">"{k}"</span>
        <span className="text-white">: </span>
        <span className="text-[#569cd6]">{String(v)}</span>
        <span className="text-white">,</span>
      </div>
    );
  }

  if (v === null) {
    return (
      <div>
        <span style={{ paddingLeft: `${indent * 8}px` }} />
        <span className="text-[#9876aa]">"{k}"</span>
        <span className="text-white">: </span>
        <span className="text-[#569cd6]">null</span>
        <span className="text-white">,</span>
      </div>
    );
  }

  return (
    <div>
      <span style={{ paddingLeft: `${indent * 8}px` }} />
      <span className="text-[#9876aa]">"{k}"</span>
      <span className="text-white">: </span>
      <span className="text-[#ce9178]">"{String(v)}"</span>
      <span className="text-white">,</span>
    </div>
  );
}

export default function JsonPreview() {
  return (
    <section className="py-32 px-6 bg-[#080808]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
            Pre-enrichment decision
          </div>
          <h2 className="text-4xl font-light tracking-tight">
            Clean JSON your workflow can act on.
          </h2>
          <p className="text-[#666] mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Every response includes raw website signals plus a first-pass
            pre-enrichment decision: enrich, skip, or review. Failed requests
            return structured errors so your workflow can route bad domains
            without breaking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="mono text-xs text-[#444] ml-2">
                response.json
              </span>
              <span className="mono text-xs text-[#00ff88] ml-auto">
                200 OK — 387ms
              </span>
            </div>
            <div className="p-6 mono text-xs leading-6 overflow-x-auto">
              <div className="text-white">{"{"}</div>
              {Object.entries(json).map(([k, v]) => (
                <div key={k} className="pl-4">
                  <JsonLine k={k} v={v} />
                </div>
              ))}
              <div className="text-white">{"}"}</div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                field: "preEnrichment.status",
                desc: "A workflow-ready decision: worth_enriching, uncertain, or skip.",
              },
              {
                field: "preEnrichment.score",
                desc: "A simple first-pass score based on website signals, not a prediction that the company will buy.",
              },
              {
                field: "preEnrichment.reasons",
                desc: "Human-readable reasons explaining why a company was marked worth enriching or not.",
              },
              {
                field: "signals.hasPricingPage",
                desc: "Helps identify commercial intent before spending credits on deeper enrichment.",
              },
              {
                field: "signals.hasDemoCta",
                desc: "Detects demo/contact sales motion signals that often matter in outbound workflows.",
              },
              {
                field: "signals.hasCareersPage",
                desc: "A lightweight growth signal. Useful as one input, not a hard filter.",
              },
            ].map((item) => (
              <div key={item.field} className="card p-5">
                <div className="mono text-[#00ff88] text-xs mb-2">
                  {item.field}
                </div>
                <p className="text-[#666] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 card p-6 border-[#00ff8822]">
          <div className="mono text-[#00ff88] text-xs mb-3">
            Safe for automation workflows
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { code: "dns_failed", desc: "Dead domain" },
              { code: "ssl_error", desc: "Bad certificate" },
              { code: "timeout", desc: "Slow site" },
              { code: "site_blocked", desc: "Bot protected" },
            ].map((e) => (
              <div key={e.code} className="bg-[#0a0a0a] rounded p-3">
                <div className="mono text-[#ce9178] text-xs mb-1">
                  {e.code}
                </div>
                <div className="text-[#555] text-xs">{e.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-[#444] text-xs mono mt-4">
            Expected failures return a structured error field, so n8n, Make,
            Zapier, or custom workflows can route bad domains without stopping
            the run.
          </p>
        </div>
      </div>
    </section>
  );
}