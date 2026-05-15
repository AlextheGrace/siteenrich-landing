"use client";

const json = {
  url: "https://stripe.com",
  domain: "stripe.com",
  companyName: "Stripe",
  metaDescription:
    "Stripe is a financial services platform that helps all types of businesses accept payments.",
  companyBlurb:
    "Stripe is a financial services platform that helps all types of businesses accept payments.",
  emails: ["press@stripe.com"],
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
  const pad = "  ".repeat(indent);

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
            <span className="text-[#6a9955]">"{item}"</span>
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
          <span className="text-[#9876aa]">"{k}"</span>
          <span className="text-white">: {"{"}</span>
        </div>
        {Object.entries(v).map(([k2, v2]) => (
          <div key={k2} className="pl-4">
            <span className="text-[#9876aa]">"{k2}"</span>
            <span className="text-white">: </span>
            <span className={v2 ? "text-[#569cd6]" : "text-[#ce9178]"}>
              {String(v2)}
            </span>
            <span className="text-white">,</span>
          </div>
        ))}
        <div>
          <span className="text-white">{"}"}</span>
        </div>
      </>
    );
  }

  return (
    <div>
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
            Response schema
          </div>
          <h2 className="text-4xl font-light tracking-tight">
            Consistent. Predictable. Ready to use.
          </h2>
          <p className="text-[#666] mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Every response follows the same schema. Failed requests return 200
            with an error field — your workflow never breaks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* JSON output */}
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

          {/* Features list */}
          <div className="space-y-4">
            {[
              {
                field: "companyName",
                desc: "Extracted from og:site_name or page title. Cleaned and decoded.",
              },
              {
                field: "emails",
                desc: "Real contact emails found on the page. Filtered to remove placeholders and false positives.",
              },
              {
                field: "socials",
                desc: "LinkedIn, Twitter/X, Facebook, Instagram, YouTube, TikTok. Deduped and filtered.",
              },
              {
                field: "signals.hasCareersPage",
                desc: "Detected across 6 languages. Useful for identifying growing companies.",
              },
              {
                field: "signals.hasPricingPage",
                desc: "Know if a company is a SaaS or service business instantly.",
              },
              {
                field: "signals.hasDemoCta",
                desc: "Detects book a call, request demo, and similar CTAs.",
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

        {/* Error handling callout */}
        <div className="mt-12 card p-6 border-[#00ff8822]">
          <div className="mono text-[#00ff88] text-xs mb-3">
            Error handling — workflow never breaks
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { code: "dns_failed", desc: "Dead domain" },
              { code: "ssl_error", desc: "Bad certificate" },
              { code: "timeout", desc: "Slow site" },
              { code: "site_blocked", desc: "Bot protected" },
            ].map((e) => (
              <div key={e.code} className="bg-[#0a0a0a] rounded p-3">
                <div className="mono text-[#ce9178] text-xs mb-1">{e.code}</div>
                <div className="text-[#555] text-xs">{e.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-[#444] text-xs mono mt-4">
            All failures return HTTP 200 with an error field — safe to use in
            automation pipelines without try/catch
          </p>
        </div>
      </div>
    </section>
  );
}