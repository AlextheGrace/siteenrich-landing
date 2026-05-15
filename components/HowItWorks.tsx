const tools = [
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n" },
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier" },
  { name: "Make", icon: "https://cdn.simpleicons.org/make" },
  { name: "Pipedream", icon: "https://cdn.simpleicons.org/pipedream" },
];

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Pass in a URL",
      description:
        "Send any company website URL to the API endpoint. Works with any domain — no setup, no scraping rules to configure.",
      code: "GET /analyze?url=acme.com",
    },
    {
      number: "02",
      title: "We analyze it",
      description:
        "SiteEnrich fetches the page, extracts structured data, and normalizes it into a consistent JSON schema. Fast — ~400ms average.",
      code: "Processing... 387ms",
    },
    {
      number: "03",
      title: "Get clean JSON",
      description:
        "Receive structured company data ready to plug into your workflow. No parsing step. Every response follows the same schema.",
      code: '{ "companyName": "Acme", ... }',
    },
  ];

  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
            How it works
          </div>
          <h2 className="text-4xl font-light tracking-tight">
            Three steps. No surprises.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="card p-8">
              <div className="mono text-[#00ff88] text-xs mb-6 opacity-60">
                {step.number}
              </div>
              <h3 className="text-xl font-light mb-3">{step.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed mb-6">
                {step.description}
              </p>
              <div className="mono text-xs text-[#444] bg-[#0a0a0a] rounded px-3 py-2 border border-[#1a1a1a]">
                {step.code}
              </div>
            </div>
          ))}
        </div>

        {/* Compatibility */}
        <div className="mt-24 text-center">
          <p className="mono text-[#444] text-xs uppercase tracking-widest mb-8">
            Works with
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-3 border border-[#222] px-6 py-3 rounded-lg hover:border-[#00ff8833] hover:bg-[#00ff8808] transition-all cursor-default group"
              >
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-5 h-5 invert opacity-50 group-hover:opacity-80 transition-opacity"
                />
                <span className="mono text-base text-[#888] group-hover:text-white transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-3 border border-[#222] px-6 py-3 rounded-lg hover:border-[#00ff8833] hover:bg-[#00ff8808] transition-all cursor-default">
              <span className="mono text-base text-[#888]">REST API</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}