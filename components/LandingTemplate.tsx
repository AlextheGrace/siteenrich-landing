import CsvUpload from "@/components/CsvUpload";
import Footer from "@/components/Footer";

// ── Content block types — each page is composed of these ──
export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; intro?: string; items: string[] }
  | { type: "steps"; intro?: string; steps: { title: string; body: string }[] }
  | { type: "callout"; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "recTable"; caption?: string; rows: { business: string; domain: string; rec: "send" | "review" | "skip"; reason: string }[] }
  | { type: "recTableFull"; caption?: string; rows: { business: string; website: string; email: string; rec: "send" | "review" | "skip"; reason: string }[] }
  | { type: "compare"; leftTitle: string; leftItems: string[]; rightTitle: string; rightItems: string[] }
  | { type: "columns"; intro?: string; items: string[] }
  | { type: "cta"; heading: string; lines: string[] };

export interface LandingConfig {
  slug: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subhead: string;
  metaTitle: string;
  metaDescription: string;
  // Long-form body — genuinely different per page
  body: ContentBlock[];
  faqs: { q: string; a: string }[];
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl font-light tracking-tight text-[#e8e6e0] mt-14 mb-5">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-[15px] text-[#999] leading-[1.75] mb-5">{block.text}</p>
      );
    case "list":
      return (
        <div className="mb-6">
          {block.intro && (
            <p className="text-[15px] text-[#999] leading-[1.75] mb-3">{block.intro}</p>
          )}
          <ul className="space-y-2.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-[#999] leading-[1.6]">
                <span className="text-[#00ff88] mt-1 shrink-0 text-[12px]">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "steps":
      return (
        <div className="mb-6">
          {block.intro && (
            <p className="text-[15px] text-[#999] leading-[1.75] mb-5">{block.intro}</p>
          )}
          <div className="space-y-5">
            {block.steps.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="mono text-[#00ff88] text-[13px] font-semibold shrink-0 w-6 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-[15px] text-[#e8e6e0] font-medium mb-1">{s.title}</p>
                  <p className="text-[14px] text-[#888] leading-[1.65]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "callout":
      return (
        <div className="my-8 border-l-2 border-[#00ff88] bg-[#00ff8808] pl-5 py-4 pr-4 rounded-r">
          <p className="text-[15px] text-[#e8e6e0] leading-[1.7]">{block.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="my-8">
          {block.caption && (
            <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-3">
              {block.caption}
            </p>
          )}
          <div className="overflow-x-auto border border-[#1a1a1a] rounded-lg">
            <table className="w-full border-collapse font-mono text-[12px]">
              <thead>
                <tr className="bg-[#0d0d0d]">
                  {block.headers.map((h, i) => (
                    <th key={i} className="text-left text-[#666] px-4 py-3 border-b border-[#1a1a1a] text-[10px] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-[#1a1a1a] last:border-b-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-3 ${ci === 0 ? "text-[#aaa]" : "text-[#777]"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "recTable": {
      const tag = (rec: string) =>
        rec === "send"
          ? "bg-[#0d2016] text-[#00ff88]"
          : rec === "review"
          ? "bg-[#1e1800] text-[#f5c842]"
          : "bg-[#1e0a0a] text-[#ff6b6b]";
      return (
        <div className="my-8">
          {block.caption && (
            <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-3">
              {block.caption}
            </p>
          )}
          <div className="overflow-x-auto border border-[#1a1a1a] rounded-lg">
            <table className="w-full border-collapse font-mono text-[12px] whitespace-nowrap">
              <thead>
                <tr className="bg-[#0d0d0d]">
                  {["Business", "Clean domain", "Recommendation", "Reason"].map((h, i) => (
                    <th key={i} className="text-left text-[#666] px-4 py-3 border-b border-[#1a1a1a] text-[10px] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, ri) => (
                  <tr key={ri} className="border-b border-[#1a1a1a] last:border-b-0">
                    <td className="px-4 py-3 text-[#aaa]">{r.business}</td>
                    <td className="px-4 py-3 text-[#777]">{r.domain}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[11px] ${tag(r.rec)}`}>
                        {r.rec}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#777]">{r.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    case "cta":
      return (
        <div className="my-10 border border-[#00ff8833] rounded-lg p-8 text-center bg-[#00ff8806]">
          <h2 className="text-2xl font-light tracking-tight text-[#e8e6e0] mb-4">
            {block.heading}
          </h2>
          {block.lines.map((line, i) => (
            <p key={i} className="text-[14px] text-[#888] leading-relaxed mb-1">
              {line}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <a
              href="#upload"
              className="inline-block px-8 py-3.5 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all green-glow text-sm"
            >
              Run 100 rows free
            </a>
            <a
              href="/sample-output.csv"
              download
              className="inline-block px-8 py-3.5 border border-[#1a1a1a] text-[#666] rounded hover:border-[#333] hover:text-white transition-all text-sm"
            >
              Download sample output
            </a>
          </div>
        </div>
      );
    case "compare":
      return (
        <div className="grid md:grid-cols-2 gap-4 my-8">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg p-6">
            <p className="mono text-[11px] text-[#666] uppercase tracking-widest mb-5">
              {block.leftTitle}
            </p>
            <ul className="space-y-2.5">
              {block.leftItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-[#888] leading-[1.6]">
                  <span className="text-[#666] mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0d180f] border border-[#00ff8820] rounded-lg p-6">
            <p className="mono text-[11px] text-[#00ff88] uppercase tracking-widest mb-5">
              {block.rightTitle}
            </p>
            <ul className="space-y-2.5">
              {block.rightItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-[#aaa] leading-[1.6]">
                  <span className="text-[#00ff88] mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "columns":
      return (
        <div className="my-8">
          {block.intro && (
            <p className="text-[15px] text-[#999] leading-[1.75] mb-4">{block.intro}</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {block.items.map((item, i) => (
              <div
                key={i}
                className="mono text-[12px] text-[#888] bg-[#0d0d0d] border border-[#1a1a1a] rounded px-3 py-2.5"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    case "recTableFull": {
      const tag = (rec: string) =>
        rec === "send"
          ? "bg-[#0d2016] text-[#00ff88]"
          : rec === "review"
          ? "bg-[#1e1800] text-[#f5c842]"
          : "bg-[#1e0a0a] text-[#ff6b6b]";
      return (
        <div className="my-8">
          {block.caption && (
            <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-3">
              {block.caption}
            </p>
          )}
          <div className="overflow-x-auto border border-[#1a1a1a] rounded-lg">
            <table className="w-full border-collapse font-mono text-[12px] whitespace-nowrap">
              <thead>
                <tr className="bg-[#0d0d0d]">
                  {["Business", "Website", "Email", "Recommendation", "Reason"].map((h, i) => (
                    <th key={i} className="text-left text-[#666] px-4 py-3 border-b border-[#1a1a1a] text-[10px] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, ri) => (
                  <tr key={ri} className="border-b border-[#1a1a1a] last:border-b-0">
                    <td className="px-4 py-3 text-[#aaa]">{r.business}</td>
                    <td className="px-4 py-3 text-[#777]">{r.website}</td>
                    <td className={`px-4 py-3 ${r.email === "—" ? "text-[#444]" : "text-[#00ff88]"}`}>{r.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[11px] ${tag(r.rec)}`}>
                        {r.rec}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#777]">{r.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default function LandingTemplate({ config }: { config: LandingConfig }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Full-width nav — flush to edges */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1a] sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-50 w-full">
        <a href="/" className="mono text-[#00ff88] text-sm font-medium tracking-widest uppercase">
          SiteEnrich
        </a>
        <div className="flex items-center gap-6">
          <a href="/#sample" className="text-sm text-[#666] hover:text-white transition-colors hidden sm:block">
            Sample output
          </a>
          <a href="/#pricing" className="text-sm text-[#666] hover:text-white transition-colors hidden sm:block">
            Pricing
          </a>
          <a
            href="#upload"
            className="mono text-xs px-4 py-2 border border-[#00ff88] text-[#00ff88] rounded hover:bg-[#00ff8811] transition-all whitespace-nowrap"
          >
            Run 100 rows free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #00ff88, transparent 70%)" }}
        />

        <div className="relative max-w-3xl mx-auto">
          <p className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-5">
            {config.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6 leading-[1.12]">
            {config.headline}{" "}
            <span className="text-[#00ff88]">{config.headlineAccent}</span>
          </h1>
          <p className="text-lg text-[#888] max-w-2xl mb-8 leading-relaxed font-light">
            {config.subhead}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#upload"
              className="px-8 py-3.5 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all green-glow text-sm"
            >
              Run 100 rows free
            </a>
            <a
              href="/sample-output.csv"
              download
              className="px-8 py-3.5 border border-[#1a1a1a] text-[#666] rounded hover:border-[#333] hover:text-white transition-all text-sm"
            >
              Download sample output
            </a>
          </div>
          <p className="mono text-xs text-[#333] mt-6">
            No signup · Old or redacted files are fine · Instant output
          </p>
        </div>
      </section>

      {/* Long-form body */}
      <article className="px-6 max-w-3xl mx-auto pb-8 border-t border-[#1a1a1a] pt-12">
        {config.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>

      {/* The real tool */}
      <CsvUpload />

      {/* FAQ */}
      <section className="px-6 py-16 max-w-3xl mx-auto border-t border-[#1a1a1a]">
        <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-8">
          Common questions
        </p>
        <div className="space-y-7">
          {config.faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="text-[15px] text-[#e8e6e0] font-medium mb-2">{faq.q}</h3>
              <p className="text-[14px] text-[#888] leading-[1.7]">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Internal links */}
        <div className="mt-14 pt-8 border-t border-[#1a1a1a] flex flex-wrap gap-x-6 gap-y-2">
          <a href="/" className="mono text-[12px] text-[#666] hover:text-[#00ff88] transition-colors">
            → Home
          </a>
          <a href="/#sample" className="mono text-[12px] text-[#666] hover:text-[#00ff88] transition-colors">
            → Sample output
          </a>
          <a href="/#pricing" className="mono text-[12px] text-[#666] hover:text-[#00ff88] transition-colors">
            → Pricing
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}