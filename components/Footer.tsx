export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="mono text-[#00ff88] text-sm tracking-widest uppercase">
            SiteEnrich
          </div>
          <div className="mono text-[#333] text-xs">
            Local lead-list cleanup
          </div>
          <div className="flex gap-6">
            <a
              href="mailto:info@siteenrich.io"
              className="mono text-xs text-[#444] hover:text-[#00ff88] transition-colors"
            >
              info@siteenrich.io
            </a>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex items-center justify-center gap-6 flex-wrap opacity-60 hover:opacity-100 transition-opacity">
          <a
            href="https://nicklaunches.com/products/siteenrich/?utm_source=siteenrich.io&utm_medium=badge&utm_campaign=featured"
            target="_blank"
            rel="noopener"
          >
            <img
              src="https://nicklaunches.com/badges/featured-dark.svg"
              alt="SiteEnrich on Nick Launches"
              width="160"
              height="37"
            />
          </a>
          <a
            href="https://www.saashub.com/siteenrich?utm_source=badge&utm_campaign=badge&utm_content=siteenrich&badge_variant=color&badge_kind=approved"
            target="_blank"
            rel="noopener"
          >
            <img
              src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1"
              alt="SiteEnrich on SaaSHub"
              style={{ width: "120px", height: "auto" }}
            />
          </a>
          <a
            href="https://openhunts.com"
            target="_blank"
            rel="noopener"
            title="OpenHunts Club"
          >
            <img
              src="https://cdn.openhunts.com/badges/club.webp"
              alt="OpenHunts Club Member"
              style={{ width: "120px", height: "auto" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}