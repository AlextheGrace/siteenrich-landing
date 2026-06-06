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
          <a href="#how-it-works" className="text-sm text-[#666] hover:text-white transition-colors">
            How it works
          </a>
          <a href="#pricing" className="text-sm text-[#666] hover:text-white transition-colors">
            Pricing
          </a>
          <a
            href="#trial"
            className="mono text-xs px-4 py-2 border border-[#00ff88] text-[#00ff88] rounded hover:bg-[#00ff8811] transition-all"
          >
            Free Trial
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="fade-up fade-up-delay-1 mono text-[#00ff88] text-xs tracking-widest uppercase mb-6">
      Messy scraped URLs → usable company rows
        </div>

        <h1 className="fade-up fade-up-delay-2 text-5xl md:text-7xl font-light tracking-tight mb-6 leading-[1.1]">
          Turn messy scraped business URLs into
          <br />
          <span className="text-[#00ff88]">usable company rows</span>
        </h1>

        <p className="fade-up fade-up-delay-3 text-lg text-[#666] max-w-xl mx-auto mb-6 leading-relaxed font-light">
          Paste URLs from Google Maps, Outscraper, Apify, directories, or CSVs. SiteEnrich cleans and classifies each business URL, checks if the site is usable, and returns usable / review / skip with reasons before rows hit Clay, Apollo, or outreach.
        </p>

        {/* Testimonial */}
        <div className="fade-up fade-up-delay-3 max-w-xl mx-auto mb-10 px-4 py-3 border border-[#1a1a1a] rounded text-left">
          <p className="text-sm text-[#888] italic leading-relaxed">
        "Teams often blame Clay or Apollo when the real issue is garbage going in. A cleanup layer before enrichment makes sense — the key is making the wasted rows visible."
          </p>
          <p className="mono text-xs text-[#444] mt-2">— r/n8n community</p>
        </div>

        <div className="fade-up fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#trial"
            className="px-8 py-3.5 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all green-glow text-sm"
          >
          Run 20 sample URLs
          </a>
          <a
            href="#demo"
            className="px-8 py-3.5 border border-[#1a1a1a] text-[#666] rounded hover:border-[#333] hover:text-white transition-all text-sm"
          >
            Try a messy URL
          </a>
        </div>

        {/* Quick example */}
        <div className="fade-up fade-up-delay-4 mt-16 mono text-xs text-left max-w-lg mx-auto card p-4">
          <div className="text-[#444] mb-2">$ curl api.siteenrich.io/analyze?url=messy-business-url.com \</div>
          <div className="text-[#444] mb-3 pl-4">-H "X-API-Key: your-key"</div>
          <div className="text-[#00ff88]">✓ 200 OK — 387ms</div>
        </div>

        {/* Scroll prompt */}
        <a href="#demo" className="fade-up fade-up-delay-4 mt-8 flex flex-col items-center gap-2 text-[#444] hover:text-[#00ff88] transition-colors group">
          <span className="mono text-xs">Or try it live below — no signup needed</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}