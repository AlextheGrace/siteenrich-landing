export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      description: "For solo builders and small workflows.",
      requests: "2,000 requests/month",
      features: [
        "Full JSON response schema",
        "Email extraction",
        "Social link detection",
        "Business signals",
        "Graceful error handling",
        "Email support",
      ],
      cta: "Start free trial",
      href: "#trial",
      featured: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For teams and production workflows.",
      requests: "10,000 requests/month",
      features: [
        "Everything in Starter",
        "5x more requests",
        "Priority support",
        "Early access to new signals",
        "Usage dashboard (coming soon)",
        "SLA guarantee (coming soon)",
      ],
      cta: "Start free trial",
      href: "#trial",
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
            Pricing
          </div>
          <h2 className="text-4xl font-light tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-[#666] mt-4 text-sm">
            Start with a free 7-day trial. No credit card needed.
          </p>
          <p className="text-[#444] mt-2 text-xs mono">
            Beta pricing — locked in forever for early customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 relative ${
                plan.featured ? "border-[#00ff8833] green-glow" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 mono text-xs text-black bg-[#00ff88] px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <div className="mono text-[#666] text-xs uppercase tracking-widest mb-2">
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-light">{plan.price}</span>
                  <span className="text-[#666] text-sm mb-2">{plan.period}</span>
                </div>
                <div className="mono text-[#00ff88] text-xs mb-3">
                  {plan.requests}
                </div>
                <p className="text-[#666] text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-[#00ff88] mono mt-0.5">✓</span>
                    <span className="text-[#888]">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block text-center py-3.5 rounded text-sm font-medium transition-all ${
                  plan.featured
                    ? "bg-[#00ff88] text-black hover:bg-[#00e87a] green-glow"
                    : "border border-[#333] text-white hover:border-[#00ff8833] hover:bg-[#00ff8808]"
                }`}
              >
                {plan.cta}
              </a>
              <p className="text-center text-xs text-[#444] mt-3 mono">
                7-day free trial — no credit card needed
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="mono text-[#444] text-xs uppercase tracking-widest mb-8 text-center">
            Common questions
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How do I start the free trial?",
                a: "Fill in the trial form above with your name and email. You'll receive an API key within a few hours. No credit card needed.",
              },
              {
                q: "How do I get my API key after paying?",
                a: "After payment you'll receive an email with your API key within a few hours. We're in beta so delivery is manual for now.",
              },
              {
                q: "What happens when I hit my limit?",
                a: "Requests return 429 when you exceed your monthly limit. Upgrade to Pro or wait until next month.",
              },
              {
                q: "Does it work on all websites?",
                a: "SiteEnrich works on ~86% of sites. JS-heavy sites protected by Cloudflare may not return full data — these return a graceful error response.",
              },
              {
                q: "Can I use it in n8n or Zapier?",
                a: "Yes — it's built for automation workflows. Use the HTTP Request node in n8n or a Webhook step in Zapier. Clean JSON out, no parsing needed.",
              },
            ].map((item) => (
              <div key={item.q} className="card p-6">
                <div className="font-light mb-2">{item.q}</div>
                <div className="text-[#666] text-sm leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}