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
      title: "Paste scraped URLs",
      description:
        "Send URLs from Google Maps, Outscraper, Apify, directories, CSVs, or n8n workflows. SiteEnrich is built for messy business URLs, not just perfect domains.",
      code: "GET /analyze?url=business.localsearch.com",
    },
    {
      number: "02",
      title: "We clean and classify",
      description:
        "SiteEnrich cleans tracking URLs, detects hosted subdomains, flags directory/profile URLs, checks if the site is live, and looks for basic business signals.",
      code: "sourceType: directory_profile",
    },
    {
      number: "03",
      title: "Route the row",
      description:
        "Get usable / review / skip with reasons. Send good rows to Clay, Apollo, Prospeo, CRM import, or outreach. Hold back weak rows before they waste credits.",
      code: "status: review",
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
            From messy URL to usable row.
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
            Fits into
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