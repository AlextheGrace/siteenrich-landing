export default function BuiltFor() {
  const audiences = [
    {
      title: "Cold email agencies",
      desc: "Clean client lead lists before they hit your sequences. Catch obvious bad rows before they reach your outreach tool.",
    },
    {
      title: "Lead generation agencies",
      desc: "Turn raw Google Maps or Outscraper exports into qualified, outreach-ready lists faster.",
    },
    {
      title: "Appointment setters",
      desc: "See which rows have usable websites, phones, and contact signals before outreach.",
    },
    {
      title: "SEO agencies",
      desc: "Prospect local businesses from Google Maps and clean the list before pitching.",
    },
    {
      title: "Web design agencies",
      desc: "Scrape local business websites, flag the ones with weak or no online presence, and prioritise outreach.",
    },
    {
      title: "Freelancers",
      desc: "Run a quick cleanup on any Google Maps, Outscraper, or Apify export before sending the first email.",
    },
    {
      title: "n8n / Make workflows",
      desc: "API and workflow support coming soon — automate the full clean-and-download pipeline.",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-4">
            Built for
          </p>
          <h2 className="text-3xl font-light tracking-tight">
            Anyone turning scraped data into outreach.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="flex items-start gap-4 p-4 border border-[#1a1a1a] rounded-lg bg-[#0d0d0d] hover:border-[#00ff8820] transition-colors"
            >
              <span className="text-[#00ff88] mono text-[12px] mt-0.5 shrink-0">→</span>
              <div>
                <p className="text-[#e8e6e0] text-[14px] font-medium mb-1">{a.title}</p>
                <p className="text-[#555] text-[12px] leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}