"use client";

// components/WhatYouGetBack.tsx
// Proof block: shown directly after the hero/upload area.
// Matches existing design system (#0a0a0a bg, #00ff88 accent, mono type).

const rows = [
  {
    business: "Smith HVAC",
    website: "smithhvac.com",
    email: "owner@smithhvac.com",
    rec: "Send" as const,
    reason: "real website; email found; not duplicate",
  },
  {
    business: "Modern Bath NJ",
    website: "callmodernbath.com",
    email: "—",
    rec: "Review" as const,
    reason: "website live; phone found; no email",
  },
  {
    business: "Green Home Installations",
    website: "greenhouse.org",
    email: "info@otherdomain.com",
    rec: "Review" as const,
    reason: "email domain mismatch",
  },
  {
    business: "Geyer Construction",
    website: "localsearch.com/profile/geyer",
    email: "—",
    rec: "Skip" as const,
    reason: "directory URL; no real website",
  },
  {
    business: "Gateway Construction",
    website: "gatewayconstructionco.com",
    email: "—",
    rec: "Skip" as const,
    reason: "duplicate phone",
  },
];

const badge: Record<"Send" | "Review" | "Skip", string> = {
  Send: "bg-[#00ff8815] text-[#00ff88] border-[#00ff8840]",
  Review: "bg-[#f5c84215] text-[#f5c842] border-[#f5c84240]",
  Skip: "bg-[#ff5c5c12] text-[#ff7a7a] border-[#ff5c5c33]",
};

const summary = [
  { val: "100", label: "rows processed" },
  { val: "13", label: "sendable" },
  { val: "22", label: "review" },
  { val: "65", label: "skipped" },
  { val: "60", label: "duplicate rows" },
  { val: "60", label: "emails found" },
  { val: "100", label: "phones found" },
];

function scrollToUpload() {
  document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
}

export default function WhatYouGetBack() {
  return (
    <section className="px-6 md:px-10 py-20 max-w-4xl mx-auto border-t border-[#1a1a1a]">
      <p className="font-mono text-[12px] text-[#00ff88] tracking-widest uppercase mb-5">
        What you get back
      </p>
      <h2 className="text-[28px] md:text-[36px] font-bold text-[#e8e6e0] leading-tight tracking-tight mb-5">
        Decision columns added to every row of your scraped list.
      </h2>
      <p className="text-[17px] md:text-[19px] text-[#a8a49c] leading-relaxed max-w-2xl mb-10">
        SiteEnrich does not just clean a domain. It adds decision columns to your
        scraped lead spreadsheet so you can filter rows before importing into
        Instantly, Smartlead, Clay, Apollo, or your CRM.
      </p>

      {/* Example table */}
      <div className="border border-[#1a1a1a] rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[680px]">
          <thead>
            <tr className="bg-[#0f0f0f] font-mono text-[11px] text-[#666] uppercase tracking-widest">
              <th className="px-5 py-4 font-normal">Business</th>
              <th className="px-5 py-4 font-normal">Website</th>
              <th className="px-5 py-4 font-normal">Email</th>
              <th className="px-5 py-4 font-normal">Recommendation</th>
              <th className="px-5 py-4 font-normal">Reason</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[14px]">
            {rows.map((r, i) => (
              <tr key={r.business} className={i % 2 ? "bg-[#0c0c0c]" : "bg-[#0a0a0a]"}>
                <td className="px-5 py-4 text-[#e8e6e0] whitespace-nowrap">{r.business}</td>
                <td className="px-5 py-4 text-[#999] whitespace-nowrap">{r.website}</td>
                <td className="px-5 py-4 text-[#999] whitespace-nowrap">{r.email}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block border rounded px-2.5 py-1 text-[12px] font-semibold ${badge[r.rec]}`}>
                    {r.rec}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#777]">{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Example result summary */}
      <div className="mt-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-7">
        <p className="font-mono text-[12px] text-[#666] tracking-widest uppercase mb-5">
          Example result summary
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
          {summary.map((s) => (
            <div key={s.label} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded px-3 py-3">
              <div className="font-mono text-[24px] font-semibold text-[#e8e6e0] leading-none mb-1.5">
                {s.val}
              </div>
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-widest leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-[#a8a49c] mt-5 leading-relaxed">
          Every review or skipped row includes a reason, so you can filter the
          file before outreach.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex gap-2.5 flex-wrap mt-8">
        <button
          onClick={scrollToUpload}
          className="bg-[#00ff88] text-[#0a1a0e] px-6 py-3 rounded font-mono text-[14px] font-bold transition-opacity hover:opacity-85"
        >
          Run 100 rows free
        </button>
        <a
          href="/siteenrich_sample_output.csv"
          download
          className="border border-[#222] text-[#e8e6e0] px-5 py-3 rounded font-mono text-[14px] transition-colors hover:border-[#00ff88] flex items-center"
        >
          Download sample cleaned CSV
        </a>
      </div>
    </section>
  );
}