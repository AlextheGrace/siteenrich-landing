"use client";

const plans = [
  {
    tier: "Free test",
    price: "$0",
    rows: "100 rows",
    cta: "Run 100 rows free",
    href: "#upload",
    active: true,
  },
  {
    tier: "Starter",
    price: "$19",
    per: "/mo",
    rows: "2,500 rows/month",
    cta: "Contact us",
    stripeLink: `https://buy.stripe.com/test/price_1TWedN7HuMMPx5DgGM2WdiHv`,
    priceId: "price_1TWedN7HuMMPx5DgGM2WdiHv",
  },
  {
    tier: "Operator",
    price: "$49",
    per: "/mo",
    rows: "10,000 rows/month",
    cta: "Contact us",
    priceId: "price_1ToTnV7HuMMPx5DglvniipzV",
    featured: true,
  },
  {
    tier: "Agency",
    price: "$99",
    per: "/mo",
    rows: "25,000 rows/month",
    cta: "Contact us",
    priceId: "price_1ToTnx7HuMMPx5DgB9LYQPyl",
  },
];

const CONTACT_EMAIL = "info@siteenrich.io";

export default function Pricing() {
  function handlePaidPlan(tier: string, priceId: string) {
    // For now: mailto with plan context
    // When Stripe Checkout is wired up, replace this with:
    // window.location.href = `/api/checkout?priceId=${priceId}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=SiteEnrich ${tier} plan&body=Hi Alex, I'd like to sign up for the ${tier} plan ($${tier === "Starter" ? "19" : tier === "Operator" ? "49" : "99"}/mo).`;
  }

  return (
    <section
      id="pricing"
      className="py-32 px-6 border-t border-[#1a1a1a]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
            Pricing
          </div>
          <h2 className="text-4xl font-light tracking-tight">
            Start free. Scale when ready.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`bg-[#111] rounded-lg p-5 flex flex-col border ${
                plan.featured ? "border-[#00ff8833]" : "border-[#1a1a1a]"
              }`}
            >
              <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-2">
                {plan.tier}
              </p>
              <p className="mono text-[26px] font-semibold text-white mb-0.5">
                {plan.price}
                {plan.per && (
                  <span className="text-[14px] text-[#444] font-normal">{plan.per}</span>
                )}
              </p>
              <p className="text-[12px] text-[#666] mb-5">{plan.rows}</p>
              {plan.href ? (
                <a
                  href={plan.href}
                  className="mt-auto w-full text-center bg-[#00ff88] text-black px-3 py-2 rounded mono text-[12px] font-bold transition-opacity hover:opacity-85"
                >
                  {plan.cta}
                </a>
              ) : (
                <button
                  onClick={() => handlePaidPlan(plan.tier, plan.priceId!)}
                  className="mt-auto w-full border border-[#222] text-[#666] px-3 py-2 rounded mono text-[12px] transition-colors hover:border-[#444] hover:text-white"
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mono text-[12px] text-[#444]">
          Need more than 100 rows?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#00ff88] hover:opacity-80 transition-opacity"
          >
            Email info@siteenrich.io
          </a>{" "}
          and we'll process a larger file.
        </p>
      </div>
    </section>
  );
}