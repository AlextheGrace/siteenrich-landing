export default function SampleOutput() {
  const rows = [
    {
      name: "Elegant Kitchen & Bath",
      domain: "elegantkitchenbath.com",
      email: "info@elegantkitchenbath.com",
      phone: "(703) 555-0142",
      emailStatus: "mx_valid",
      sendable: "send",
      reason: "Email found on contact page, basic MX verification passed",
    },
    {
      name: "Summit Remodeling Knoxville",
      domain: "summitremodelingknoxville.com",
      email: "contact@summitremodeling.com",
      phone: "(865) 555-0198",
      emailStatus: "mx_valid",
      sendable: "send",
      reason: "Email found on homepage, basic MX verification passed",
    },
    {
      name: "Green Home Installations",
      domain: "greenhomeinstallations.org",
      email: "info@greenhouse.org",
      phone: "(201) 555-0167",
      emailStatus: "mx_valid",
      sendable: "review",
      reason: "Domain mismatch — email domain does not match business website",
    },
    {
      name: "Modern Bath NJ",
      domain: "callmodernbath.com",
      email: "—",
      phone: "(973) 555-0112",
      emailStatus: "missing",
      sendable: "review",
      reason: "Website live, phone found, no email found",
    },
    {
      name: "JB Renovations",
      domain: "jbrenovations.weebly.com",
      email: "—",
      phone: "—",
      emailStatus: "missing",
      sendable: "review",
      reason: "Hosted subdomain, weak signals",
    },
    {
      name: "Geyer Construction Inc",
      domain: "geyerconstructioninc.localsearch.com",
      email: "—",
      phone: "—",
      emailStatus: "missing",
      sendable: "skip",
      reason: "Directory profile URL, no real website detected",
    },
    {
      name: "Gateway Construction Co",
      domain: "gatewayconstructionco.com",
      email: "—",
      phone: "(404) 555-0134",
      emailStatus: "missing",
      sendable: "skip",
      reason: "Duplicate phone",
    },
  ];

  function tagClass(val: string) {
    if (val === "send" || val === "sendable" || val === "mx_valid")
      return "bg-[#0d2016] text-[#00ff88]";
    if (val === "review") return "bg-[#1e1800] text-[#f5c842]";
    if (val === "skip") return "bg-[#1e0a0a] text-[#ff6b6b]";
    return "bg-[#1c1c1a] text-[#4a4844] border border-[#272724]";
  }

  return (
    <section
      id="sample"
      className="px-6 md:px-10 py-16 max-w-4xl mx-auto border-t border-[#272724]"
    >
      <p className="font-mono text-[11px] text-[#4a4844] tracking-widest uppercase mb-5">
        Sample output
      </p>
      <div className="overflow-x-auto border border-[#272724] rounded-lg mb-4">
        <table className="w-full border-collapse font-mono text-[11px] whitespace-nowrap">
          <thead>
            <tr className="bg-[#1c1c1a]">
              {["businessName","cleanedDomain","email","phone","emailStatus","recommendation","reason"].map(h => (
                <th key={h} className="text-left text-[#4a4844] px-3 py-2 border-b border-[#272724] text-[10px] uppercase tracking-wider font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#272724] last:border-b-0 hover:bg-[#141413] transition-colors">
                <td className="px-3 py-2 text-[#8a8880]">{row.name}</td>
                <td className="px-3 py-2 text-[#8a8880]">{row.domain}</td>
                <td className={`px-3 py-2 ${row.email !== "—" ? "text-[#00ff88]" : "text-[#4a4844]"}`}>{row.email}</td>
                <td className="px-3 py-2 text-[#8a8880]">{row.phone}</td>
                <td className="px-3 py-2">
                  <span className={`inline-block px-1.5 py-0.5 rounded-sm text-[10px] ${tagClass(row.emailStatus)}`}>
                    {row.emailStatus}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={`inline-block px-1.5 py-0.5 rounded-sm text-[10px] ${tagClass(row.sendable)}`}>
                    {row.sendable}
                  </span>
                </td>
                <td className="px-3 py-2 text-[#8a8880] max-w-xs overflow-hidden text-ellipsis">{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-mono text-[11px] text-[#4a4844] leading-relaxed">
        Output columns: businessName · inputUrl · cleanedDomain · websiteStatus · email · emailStatus · phone · recommendation · reason · warnings · duplicateOf · duplicateReason
      </p>
    </section>
  );
}