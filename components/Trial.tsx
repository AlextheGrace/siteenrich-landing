"use client";

import { useState } from "react";

export default function Trial() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mlgvgrkb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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
    <section id="trial" className="py-32 px-6 bg-[#080808]">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
            Free Trial
          </div>
          <h2 className="text-4xl font-light tracking-tight mb-4">
            Try SiteEnrich free for 7 days
          </h2>
          <p className="text-[#666] text-sm leading-relaxed">
            No credit card needed. Get your API key in your inbox within a few hours.
          </p>
        </div>

        {status === "sent" ? (
          <div className="card p-10 text-center border-[#00ff8833]">
            <div className="mono text-[#00ff88] text-2xl mb-4">✓</div>
            <div className="mono text-[#00ff88] text-sm mb-2">Request received</div>
            <p className="text-[#666] text-sm">
              Your trial key is on its way. Check your inbox shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div>
              <label className="mono text-xs text-[#444] uppercase tracking-widest block mb-2">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors"
              />
            </div>

            <div>
              <label className="mono text-xs text-[#444] uppercase tracking-widest block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 30px #00ff8833" }}
            >
              {status === "sending" ? "Sending..." : "Start 7-day free trial"}
            </button>

            <p className="mono text-xs text-[#333] text-center">
              No credit card. No commitment. Key delivered within a few hours.
            </p>

            {status === "error" && (
              <p className="mono text-xs text-red-400 text-center">
                Something went wrong. Email us at info@siteenrich.io
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}