// Social proof section — placeholders ready for real data.
// Replace the placeholder values with real numbers/testimonials when available.
// Do NOT use fabricated customer names or invented metrics.
 
export default function SocialProofPlaceholder() {
  return (
    <section className="py-16 px-6 border-t border-[#1a1a1a] bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto">
        <p className="mono text-[11px] text-[#333] uppercase tracking-widest text-center mb-10">
          Early results
        </p>
 
        {/* Stats — replace with real numbers when available */}
        <div className="grid grid-cols-3 gap-6 text-center mb-12">
          {[
            { val: "—", label: "CSVs processed" },
            { val: "—", label: "Rows cleaned" },
            { val: "—", label: "Emails found" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="font-mono text-3xl font-light text-[#333] mb-1">{val}</div>
              <div className="mono text-[11px] text-[#333] uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
 
        {/* Testimonial placeholder */}
        <div className="border border-[#1a1a1a] rounded-lg p-6 max-w-xl mx-auto text-center">
          <p className="text-[#333] text-[13px] italic leading-relaxed mb-4">
            Testimonials will appear here as early users share results.
          </p>
          <p className="mono text-[11px] text-[#2a2a2a]">— Placeholder</p>
        </div>
      </div>
    </section>
  );
}