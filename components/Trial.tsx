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
            Beta Access
          </div>

          <h2 className="text-4xl font-light tracking-tight mb-4">
            Run 100 CSV rows free
          </h2>

          <p className="text-[#666] text-sm leading-relaxed">
            Upload a small sample from a real scraped local business list.
            SiteEnrich will return sendable / review / skip with cleaned
            domains, emails and phones found where possible, basic MX email
            verification, duplicate flags, reasons, and warnings before rows
            hit enrichment or outreach.
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
            {status === "sending" ? "Creating your beta key..." : "Get beta access"}
          </button>

          <p className="mono text-xs text-[#333] text-center">
            No credit card. Includes access to test one scraped local business CSV.
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