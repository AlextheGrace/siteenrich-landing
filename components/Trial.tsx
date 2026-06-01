"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Trial() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.key) {
        router.push(`/trial-success?key=${data.key}`);
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
            Get your API key instantly
          </h2>
          <p className="text-[#666] text-sm leading-relaxed">
            No credit card required. Get your API key instantly and start enriching company websites in under a minute.
          </p>
        </div>

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
            {status === "sending" ? "Creating your key..." : "Get instant trial key"}
          </button>

          <p className="mono text-xs text-[#333] text-center">
            No credit card. 7-day free trial. Instant API access.
          </p>

          {status === "error" && (
            <p className="mono text-xs text-red-400 text-center">
              Something went wrong. Email us at info@siteenrich.io
            </p>
          )}
        </form>
      </div>
    </section>
  );
}