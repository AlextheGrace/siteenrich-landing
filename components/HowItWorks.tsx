export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload your scraped spreadsheet",
      description:
        "Drop in a CSV, Excel file, or Google Sheets export from Google Maps, Outscraper, Apify, Apollo, Clay, Scrapebox, or any scraper. Map the website column and optional business name, phone, city, and state columns.",
      code: "CSV upload → column mapping → processing job",
    },
    {
      number: "02",
      title: "We clean, crawl, and classify",
      description:
        "SiteEnrich decodes tracking URLs, detects directory profiles, checks if each site is live, crawls contact pages, extracts emails and phones, runs basic MX verification, and deduplicates by phone, email, and domain.",
      code: "sourceType: real_website → email found",
    },
    {
      number: "03",
      title: "Download outreach-ready CSV",
      description:
        "Every row comes back with a cleaned domain, email, phone, MX status, and a sendable / review / skip decision with reasons. Load directly into your CRM or cold email tool.",
      code: "recommendation: send",
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
            From messy spreadsheet to outreach-ready list.
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

      </div>
    </section>
  );
}