export default function BeforeAfter() {
  const before = [
    "Duplicate businesses listed twice",
    "Directory/Yelp/Facebook URLs",
    "Dead or unreachable websites",
    "Missing emails and phones",
    "Encoded tracking URLs",
    "Mixed-quality rows with no classification",
  ];

  const after = [
    "Clean, normalised domains",
    "Junk rows flagged and separated",
    "Website status checked (live / dead / blocked)",
    "Emails and phones extracted where possible",
    "Duplicates detected by phone, email, and domain",
    "Every row: send / review / skip with reasons",
  ];

  return (
    <section className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-4">
            Before / After
          </p>
          <h2 className="text-3xl font-light tracking-tight">
            What your CSV looks like going in vs coming out.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Before */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg p-6">
            <p className="mono text-[11px] text-[#ff6b6b] uppercase tracking-widest mb-5">
              Before
            </p>
            <ul className="space-y-3">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-[#555]">
                  <span className="text-[#ff6b6b] mt-0.5 shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-[#0d180f] border border-[#00ff8820] rounded-lg p-6">
            <p className="mono text-[11px] text-[#00ff88] uppercase tracking-widest mb-5">
              After
            </p>
            <ul className="space-y-3">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-[#888]">
                  <span className="text-[#00ff88] mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Example output card */}
        <div className="mt-8 border border-[#1a1a1a] rounded-lg p-6 bg-[#0d0d0d]">
          <div className="flex items-center justify-between mb-4">
            <p className="mono text-[11px] text-[#444] uppercase tracking-widest">
              Example output
            </p>
            <span className="mono text-[10px] text-[#333] border border-[#1a1a1a] px-2 py-1 rounded">
              Illustrative — not real data
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "20", label: "Rows processed" },
              { val: "11", label: "Usable emails found", color: "text-[#00ff88]" },
              { val: "5", label: "Marked for review", color: "text-[#f5c842]" },
              { val: "4", label: "Skipped (bad/social)", color: "text-[#666]" },
            ].map(({ val, label, color }) => (
              <div key={label} className="text-center">
                <div className={`font-mono text-2xl font-semibold mb-1 ${color || "text-[#e8e6e0]"}`}>
                  {val}
                </div>
                <div className="text-[11px] text-[#444] leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}