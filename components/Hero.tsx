"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #00ff88, transparent 70%)" }}
      />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
        <div className="mono text-[#00ff88] text-sm font-medium tracking-widest uppercase">
          SiteEnrich
        </div>
        <div className="flex items-center gap-6">
          <a href="#upload" className="text-sm text-[#666] hover:text-white transition-colors">
            Free test
          </a>
          <a href="#sample" className="text-sm text-[#666] hover:text-white transition-colors">
            Sample output
          </a>
          <a href="#pricing" className="text-sm text-[#666] hover:text-white transition-colors">
            Pricing
          </a>
          <a
            href="#upload"
            className="mono text-xs px-4 py-2 border border-[#00ff88] text-[#00ff88] rounded hover:bg-[#00ff8811] transition-all"
          >
            Run 100 rows free
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-28">
        <div className="fade-up fade-up-delay-1 mono text-[#00ff88] text-xs tracking-widest uppercase mb-6">
          Pre-outreach lead-list cleanup
        </div>

        <h1 className="fade-up fade-up-delay-2 text-5xl md:text-7xl font-light tracking-tight mb-6 leading-[1.1]">
          Clean scraped lead spreadsheets
          <br />
          <span className="text-[#00ff88]">before outreach.</span>
        </h1>

        <p className="fade-up fade-up-delay-3 text-lg text-[#666] max-w-xl mx-auto mb-6 leading-relaxed font-light">
          Turn Google Maps, Outscraper, Apify, Apollo, Clay, or campaign lead
          CSVs into cleaner outreach-ready files before importing into Instantly,
          Smartlead, or your CRM.
        </p>

        {/* Pain statement */}
        <div className="fade-up fade-up-delay-3 max-w-xl mx-auto mb-10 px-4 py-3 border border-[#1a1a1a] rounded text-left">
          <p className="text-sm text-[#888] leading-relaxed">
            Most scraped lead CSVs are not ready to send. SiteEnrich flags
            duplicate companies, directory/social URLs, bad or missing websites,
            missing or risky emails, and rows that should be sent, reviewed, or skipped.
          </p>
        </div>

        <div className="fade-up fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#upload"
            className="px-8 py-3.5 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all green-glow text-sm"
          >
            Run 100 rows free
          </a>
          <a
            href="/siteenrich_sample_output.csv"
            download
            className="px-8 py-3.5 border border-[#1a1a1a] text-[#666] rounded hover:border-[#333] hover:text-white transition-all text-sm"
          >
            Download sample output
          </a>
        </div>

        {/* Flow strip */}
        <div className="fade-up fade-up-delay-4 mt-14 flex flex-wrap items-center justify-center gap-0">
          {[
            { label: "Upload file", highlight: false },
            { label: "Clean domains", highlight: false },
            { label: "Detect junk", highlight: false },
            { label: "Find emails + phones", highlight: true },
            { label: "Email check", highlight: false },
            { label: "Dedupe", highlight: false },
            { label: "Download file", highlight: true },
          ].map((step, i, arr) => (
            <span key={i} className="flex items-center">
              <span
                className={`mono text-[10px] px-2.5 py-1 rounded-sm border whitespace-nowrap ${
                  step.highlight
                    ? "text-[#00ff88] border-[#00ff8822] bg-[#00ff8808]"
                    : "text-[#444] border-[#1a1a1a] bg-[#111]"
                }`}
              >
                {step.label}
              </span>
              {i < arr.length - 1 && (
                <span className="text-[#333] text-xs px-1">→</span>
              )}
            </span>
          ))}
        </div>

        {/* Scroll prompt */}
        <a
          href="#upload"
          className="fade-up fade-up-delay-4 mt-10 flex flex-col items-center gap-2 text-[#444] hover:text-[#00ff88] transition-colors group"
        >
          <span className="mono text-xs">Upload a spreadsheet below — 100 rows free, no signup, instant output</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}