export default function Pricing() {
  const plans = [
    {
      name: "Free Test",
      price: "$0",
      period: "",
      description: "For testing SiteEnrich on a real scraped list sample.",
      requests: "20 scraped URLs",
      features: [
        "Usable / review / skip",
        "Cleaned URL",
        "Source type classification",
        "Needs resolver flag",
        "Basic website signals",
        "Reasons and warnings",
      ],
      cta: "Run 20 sample URLs",
      href: "#trial",
      featured: false,
    },
    {
      name: "Starter QA Run",
      price: "$49",
      period: "one-time",
      description: "For cleaning and checking one scraped CSV or Google Sheet.",
      requests: "Up to 1,000 URLs",
      features: [
        "Everything in Free Test",
        "CSV or Google Sheet output",
        "Directory/profile URL detection",
        "Dead or unreachable site detection",
        "Hosted subdomain detection",
        "Basic email/social/signal extraction",
      ],
      cta: "Start a QA run",
      href: "#trial",
      featured: true,
    },
    {
      name: "Operator",
      price: "$199",
      period: "/month",
      description: "For recurring lead-list QA before enrichment or outreach.",
      requests: "Up to 10,000 URLs/month",
      features: [
        "Everything in Starter QA Run",
        "API access",
        "n8n / Google Sheets setup help",
        "Workflow-ready JSON",
        "Priority beta support",
        "Early access to batch processing",
      ],
      cta: "Get beta access",
      href: "#trial",
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
            Pricing
          </div>
          <h2 className="text-4xl font-light tracking-tight">
            Beta pricing for scraped URL QA
          </h2>
          <p className="text-[#666] mt-4 text-sm">
            Start with a free 20-URL test. No credit card needed.
          </p>
          <p className="text-[#444] mt-2 text-xs mono">
            Built for messy scraped business URLs before enrichment or outreach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 relative ${
                plan.featured ? "border-[#00ff8833] green-glow" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 mono text-xs text-black bg-[#00ff88] px-3 py-1 rounded-full">
                  Best first paid test
                </div>
              )}

              <div className="mb-6">
                <div className="mono text-[#666] text-xs uppercase tracking-widest mb-2">
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-light">{plan.price}</span>
                  {plan.period && (
                    <span className="text-[#666] text-sm mb-2">
                      {plan.period}
                    </span>
                  )}
                </div>
                <div className="mono text-[#00ff88] text-xs mb-3">
                  {plan.requests}
                </div>
                <p className="text-[#666] text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-[#00ff88] mono mt-0.5">✓</span>
                    <span className="text-[#888]">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block text-center py-3.5 rounded text-sm font-medium transition-all ${
                  plan.featured
                    ? "bg-[#00ff88] text-black hover:bg-[#00e87a] green-glow"
                    : "border border-[#333] text-white hover:border-[#00ff8833] hover:bg-[#00ff8808]"
                }`}
              >
                {plan.cta}
              </a>

              <p className="text-center text-xs text-[#444] mt-3 mono">
                No credit card needed for the free test
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="mono text-[#444] text-xs uppercase tracking-widest mb-8 text-center">
            Common questions
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What does SiteEnrich do?",
                a: "SiteEnrich turns messy scraped business URLs into usable company rows before enrichment or outreach. It cleans and classifies each URL, checks whether the site is usable, and returns usable / review / skip with reasons.",
              },
              {
                q: "Is this just URL cleanup?",
                a: "No. Basic URL cleanup removes tracking parameters. SiteEnrich also detects directory/profile URLs, hosted subdomains, dead or unreachable sites, weak sites, and useful website signals so your workflow can decide what should continue downstream.",
              },
              {
                q: "Do I need an API to use it?",
                a: "Not at first. For beta users, we can return a CSV or Google Sheet. The API is available when you want to plug SiteEnrich into n8n, Google Sheets, Make, Zapier, or your own workflow.",
              },
              {
                q: "What happens in the free test?",
                a: "You get access to run 20 scraped business URLs and see the output: cleaned URL, source type, needs resolver flag, usable / review / skip, signals, reasons, and warnings.",
              },
              {
                q: "Who is this for?",
                a: "SiteEnrich is for people working with scraped local or SMB lead lists from Google Maps, Outscraper, Apify, Leadswift, directories, CSVs, or n8n workflows before sending rows into Clay, Apollo, Prospeo, CRM import, or outreach.",
              },
              {
                q: "Does it work on all websites?",
                a: "No. Some sites are blocked, dead, slow, or protected. Those failures return structured statuses and warnings so your workflow can route them instead of breaking.",
              },
            ].map((item) => (
              <div key={item.q} className="card p-6">
                <div className="font-light mb-2">{item.q}</div>
                <div className="text-[#666] text-sm leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}