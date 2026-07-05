"use client";

import { useState } from "react";

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
    cta: "Get access",
    priceId: "price_1TWedN7HuMMPx5DgGM2WdiHv",
  },
  {
    tier: "Operator",
    price: "$49",
    per: "/mo",
    rows: "10,000 rows/month",
    cta: "Get access",
    priceId: "price_1ToTnV7HuMMPx5DglvniipzV",
    featured: true,
  },
  {
    tier: "Agency",
    price: "$99",
    per: "/mo",
    rows: "25,000 rows/month",
    cta: "Get access",
    priceId: "price_1ToTnx7HuMMPx5DgB9LYQPyl",
  },
];

const CONTACT_EMAIL = "info@siteenrich.io";

interface ModalProps {
  plan: string;
  onClose: () => void;
}

function AccessModal({ plan, onClose }: ModalProps) {
  const [form, setForm] = useState({ name: "", email: "", rows: "", plan });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Modal */}
      <div className="relative bg-[#111] border border-[#222] rounded-lg p-8 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#444] hover:text-[#888] transition-colors mono text-sm"
        >
          ✕
        </button>

        {status === "sent" ? (
          <div className="text-center py-6">
            <div className="text-[#00ff88] text-3xl mb-4">✓</div>
            <h3 className="text-[#e8e6e0] text-lg font-light mb-2">Request received.</h3>
            <p className="text-[#555] text-sm leading-relaxed">
              I'll follow up personally within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="mono text-[#00ff88] text-[11px] tracking-widest uppercase mb-2">
                Unlock larger files
              </p>
              <h3 className="text-[#e8e6e0] text-xl font-light mb-3">
                Self-serve plans coming soon.
              </h3>
              <p className="text-[#555] text-[13px] leading-relaxed">
                For now I'll process your first larger file personally.
                Fill in your details and I'll be in touch within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-widest block mb-1.5">
                  Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors"
                />
              </div>

              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-widest block mb-1.5">
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors"
                />
              </div>

              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-widest block mb-1.5">
                  Estimated rows / month
                </label>
                <select
                  value={form.rows}
                  onChange={e => setForm({ ...form, rows: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ff8833] transition-colors appearance-none"
                >
                  <option value="">Select range</option>
                  <option value="100-2500">100 – 2,500</option>
                  <option value="2500-10000">2,500 – 10,000</option>
                  <option value="10000-25000">10,000 – 25,000</option>
                  <option value="25000+">25,000+</option>
                </select>
              </div>

              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-widest block mb-1.5">
                  Plan interest
                </label>
                <select
                  value={form.plan}
                  onChange={e => setForm({ ...form, plan: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ff8833] transition-colors appearance-none"
                >
                  <option value="Starter">Starter — $19/mo</option>
                  <option value="Operator">Operator — $49/mo</option>
                  <option value="Agency">Agency — $99/mo</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all text-sm mono disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Request access"}
              </button>

              {status === "error" && (
                <p className="mono text-[11px] text-red-400 text-center">
                  Something went wrong. Email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#00ff88]">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Pricing() {
  const [modalPlan, setModalPlan] = useState<string | null>(null);

  return (
    <>
      {modalPlan && (
        <AccessModal plan={modalPlan} onClose={() => setModalPlan(null)} />
      )}

      <section id="pricing" className="py-32 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
              Pricing
            </div>
            <h2 className="text-4xl font-light tracking-tight">
              Start with 100 rows free.
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
                    onClick={() => setModalPlan(plan.tier)}
                    className="mt-auto w-full border border-[#00ff8833] text-[#00ff88] px-3 py-2 rounded mono text-[12px] transition-colors hover:bg-[#00ff8808]"
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-[13px] text-[#555] max-w-md mx-auto leading-relaxed">
            Need more than 100 rows?{" "}
            <button
              onClick={() => setModalPlan("Operator")}
              className="text-[#00ff88] hover:opacity-80 transition-opacity"
            >
              Request access
            </button>{" "}
            and we'll process larger files while self-serve plans are rolling out.
          </p>
        </div>
      </section>
    </>
  );
}