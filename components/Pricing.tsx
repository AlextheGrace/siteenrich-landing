"use client";

import { useState } from "react";

const CONTACT_EMAIL = "alex@siteenrich.io";

const plans = [
  {
    tier: "Free test",
    price: "$0",
    priceNote: "",
    rows: "100 rows",
    desc: "Run a scraped lead sample and see exactly what SiteEnrich flags.",
    cta: "Run 100 rows free",
    href: "#upload",
  },
  {
    tier: "Full file cleanup",
    price: "From $49",
    priceNote: "",
    rows: "One-off",
    desc: "We clean your full scraped lead spreadsheet and return an outreach-ready CSV with duplicate flags, website checks, email/contact quality notes, and send / review / skip reasons.",
    cta: "Clean my full file",
    modal: "Full file cleanup",
    featured: true,
  },
  {
    tier: "Monthly cleanup",
    price: "From $99",
    priceNote: "/mo",
    rows: "Recurring",
    desc: "For operators and agencies cleaning lead files every month.",
    cta: "Request monthly cleanup",
    modal: "Monthly cleanup",
  },
];

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
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70" />
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
              I'll reply personally within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="mono text-[#00ff88] text-[11px] tracking-widest uppercase mb-2">
                {plan}
              </p>
              <h3 className="text-[#e8e6e0] text-xl font-light mb-3">
                Tell me about your file.
              </h3>
              <p className="text-[#555] text-[13px] leading-relaxed">
                Drop your details and I'll reply personally within 24 hours to clean your file.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-widest block mb-1.5">Name</label>
                <input
                  required type="text" placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors"
                />
              </div>
              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-widest block mb-1.5">Email</label>
                <input
                  required type="email" placeholder="you@company.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors"
                />
              </div>
              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-widest block mb-1.5">Estimated rows</label>
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

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all text-sm mono disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send request"}
              </button>

              {status === "error" && (
                <p className="mono text-[11px] text-red-400 text-center">
                  Something went wrong. Email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#00ff88]">{CONTACT_EMAIL}</a>
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
      {modalPlan && <AccessModal plan={modalPlan} onClose={() => setModalPlan(null)} />}

      <section id="pricing" className="py-32 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
              Pricing
            </div>
            <h2 className="text-4xl font-light tracking-tight">
              Start with 100 rows free.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {plans.map((plan) => (
              <div
                key={plan.tier}
                className={`bg-[#111] rounded-lg p-6 flex flex-col border ${
                  plan.featured ? "border-[#00ff8833]" : "border-[#1a1a1a]"
                }`}
              >
                <p className="mono text-[11px] text-[#444] uppercase tracking-widest mb-2">
                  {plan.tier}
                </p>
                <p className="mono text-[26px] font-semibold text-white mb-1">
                  {plan.price}
                  {plan.priceNote && (
                    <span className="text-[14px] text-[#444] font-normal">{plan.priceNote}</span>
                  )}
                </p>
                <p className="text-[12px] text-[#666] mb-4">{plan.desc}</p>

                {plan.href ? (
                  <a
                    href={plan.href}
                    className="mt-auto w-full text-center bg-[#00ff88] text-black px-3 py-2.5 rounded mono text-[12px] font-bold transition-opacity hover:opacity-85"
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <button
                    onClick={() => setModalPlan(plan.modal!)}
                    className="mt-auto w-full border border-[#00ff8833] text-[#00ff88] px-3 py-2.5 rounded mono text-[12px] transition-colors hover:bg-[#00ff8808]"
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
              onClick={() => setModalPlan("Full file cleanup")}
              className="text-[#00ff88] hover:opacity-80 transition-opacity"
            >
              Request full-file cleanup
            </button>{" "}
            and I'll reply personally.
          </p>
        </div>
      </section>
    </>
  );
}