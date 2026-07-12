export default function RealSampleResults() {
  const rows = [
    {
      type: "Coaching campaign lead list",
      rows: 100, sendable: 51, review: 25, skipped: 24, dupes: 12, emails: 74,
    },
    {
      type: "Property management scraped list",
      rows: 100, sendable: 13, review: 22, skipped: 65, dupes: 60, emails: 60,
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-4">
            Real sample results
          </p>
          <h2 className="text-3xl font-light tracking-tight mb-3">
            Recent anonymized samples processed by SiteEnrich.
          </h2>
        </div>

        <div className="overflow-x-auto border border-[#1a1a1a] rounded-lg mb-6">
          <table className="w-full border-collapse font-mono text-[12px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#0d0d0d]">
                {["File type", "Rows", "Sendable", "Review", "Skipped", "Duplicates", "Emails found"].map((h) => (
                  <th key={h} className="text-left text-[#444] px-4 py-3 border-b border-[#1a1a1a] text-[10px] uppercase tracking-wider font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.type} className="border-b border-[#1a1a1a] last:border-b-0">
                  <td className="px-4 py-3 text-[#888]">{r.type}</td>
                  <td className="px-4 py-3 text-[#666]">{r.rows}</td>
                  <td className="px-4 py-3 text-[#00ff88]">{r.sendable}</td>
                  <td className="px-4 py-3 text-[#f5c842]">{r.review}</td>
                  <td className="px-4 py-3 text-[#888]">{r.skipped}</td>
                  <td className="px-4 py-3 text-[#888]">{r.dupes}</td>
                  <td className="px-4 py-3 text-[#888]">{r.emails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[13px] text-[#555] leading-relaxed max-w-2xl mx-auto space-y-3 mb-8">
          <p>
            In one scraped local-business file, only <span className="text-[#00ff88]">13 of 100 rows</span> were
            immediately sendable. SiteEnrich detected <span className="text-[#e8e6e0]">60 duplicate rows</span> before
            the file reached outreach.
          </p>
          <p>
            In another campaign lead list, almost half the rows needed review or skipping before import.
          </p>
        </div>

        <div className="text-center">
          <a
            href="#upload"
            className="inline-block px-8 py-3.5 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all green-glow text-sm"
          >
            Run 100 rows free
          </a>
        </div>
      </div>
    </section>
  );
}