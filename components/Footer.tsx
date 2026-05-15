export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="mono text-[#00ff88] text-sm tracking-widest uppercase">
          SiteEnrich
        </div>
        <div className="mono text-[#333] text-xs">
          Website enrichment API — Beta
        </div>
        <div className="flex gap-6">
                    <a
            href="mailto:info@siteenrich.io"
            className="mono text-xs text-[#444] hover:text-[#00ff88] transition-colors"
          >
            info@siteenrich.io
          </a>
          <a
            href="mailto:support@siteenrich.io"
            className="mono text-xs text-[#444] hover:text-[#00ff88] transition-colors"
          >
            support@siteenrich.io
          </a>
        </div>
      </div>
    </footer>
  );
}