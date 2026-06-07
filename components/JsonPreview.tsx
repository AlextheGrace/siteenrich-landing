"use client";

const json = {
  inputUrl:
    "https://sample-business.test/%3Futm_source%3Dgoogle%26utm_medium%3Dorganic",
  cleanedUrl: "https://sample-business.test",
  sourceType: "tracking_url",
  needsResolver: false,
  scoringProfile: "local_service",
  domain: "sample-business.test",
  companyName: "Sample Business",
  emails: ["info@sample-business.test"],
  socials: [],
  signals: {
    hasContactPage: true,
    hasAboutPage: true,
    hasPhone: true,
    hasQuoteCta: true,
    hasServiceKeywords: true,
  },
  preEnrichment: {
    status: "usable",
    score: 90,
    reasons: [
      "Tracking URL cleaned",
      "Real business website detected",
      "Contact page found",
      "Phone number found",
      "Quote/contact CTA found",
    ],
    warnings: [],
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
            Workflow-ready decision
          </div>
          <h2 className="text-4xl font-light tracking-tight">
            Know which rows should move forward.
          </h2>
          <p className="text-[#666] mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Every response returns a cleaned URL, source type, resolver flag,
            website signals when available, and a usable / review / skip
            decision with reasons. Bad URLs do not break your workflow — they
            get routed.
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
                field: "sourceType",
                desc: "Classifies the scraped URL as a real domain, tracking URL, hosted subdomain, directory/profile URL, dead site, or other source type.",
              },
              {
                field: "needsResolver",
                desc: "Flags rows that should not go directly into enrichment because the real business website may need to be resolved first.",
              },
              {
                field: "preEnrichment.status",
                desc: "A workflow-ready decision: usable, review, or skip before the row hits Clay, Apollo, Prospeo, CRM import, or outreach.",
              },
              {
                field: "preEnrichment.reasons",
                desc: "Human-readable reasons explaining why the row was marked usable, review, or skip.",
              },
              {
                field: "preEnrichment.warnings",
                desc: "Warnings for blocked sites, dead sites, thin signals, missing emails, directory URLs, or other issues.",
              },
              {
                field: "signals",
                desc: "When the site is reachable, SiteEnrich can return contact/about pages, phone/email/social signals, quote CTAs, and other local-business indicators.",
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
              { code: "directory_profile", desc: "Needs resolver" },
              { code: "dead_or_unreachable", desc: "Bad site" },
              { code: "hosted_subdomain", desc: "Review row" },
              { code: "tracking_url", desc: "Cleanable URL" },
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
            Expected messy inputs return structured fields, so n8n, Make,
            Zapier, Google Sheets, or custom workflows can route rows without
            stopping the run.
          </p>
        </div>
      </div>
    </section>
  );
}