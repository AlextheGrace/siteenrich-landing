"use client";

import { useState } from "react";

type Props = {
  jobId: string;
  fileName?: string;
  processed: number;
  sendable: number;
  review: number;
  skipped: number;
  emailsFound: number;
  mxVerified: number;
  phonesFound: number;
  duplicates: number;
};

export default function ResultCta({
  jobId, fileName, processed, sendable, review, skipped,
  emailsFound, mxVerified, phonesFound, duplicates,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const mailto =
    "mailto:alex@siteenrich.io" +
    "?subject=" + encodeURIComponent("Full SiteEnrich cleanup") +
    "&body=" + encodeURIComponent(
      `Hi Alex, I want help cleaning my full file.\n\nJob ID: ${jobId}`
    );

  async function submit() {
    if (!email.includes("@")) return;
    setStatus("sending");
    try {
      const resp = await fetch("/api/csv-help-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(), jobId, fileName,
          processed, sendable, review, skipped,
          emailsFound, mxVerified, phonesFound, duplicates,
        }),
      });
      setStatus(resp.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
      {/* Task 8 — skipped explanation */}
      {sendable === 0 && skipped > 0 ? (
        <p className="font-mono text-[11px] text-[#f5c842] mb-4 leading-relaxed">
          All processed rows were marked skipped. Download the CSV to see the
          reason for each row.
        </p>
      ) : skipped > 0 ? (
        <p className="font-mono text-[11px] text-[#666] mb-4 leading-relaxed">
          The output CSV includes the reason each row was marked sendable,
          review, or skipped.
        </p>
      ) : null}

      <p className="text-[15px] text-[#e8e6e0] font-medium mb-1.5">
        Want the full file cleaned?
      </p>
      <p className="text-[12px] text-[#666] mb-1">
        This free sample processes up to 100 rows. Full-file cleanup starts at{" "}
        <span className="text-[#00ff88] font-mono">$49</span>.
      </p>
      <p className="text-[12px] text-[#666] mb-4">
        Email{" "}
        <a href="mailto:alex@siteenrich.io" className="text-[#e8e6e0] underline decoration-[#333] hover:decoration-[#00ff88]">
          alex@siteenrich.io
        </a>{" "}
        — I reply personally.
      </p>

      <a
        href={mailto}
        className="inline-block bg-[#00ff88] text-[#0a1a0e] px-5 py-2.5 rounded font-mono text-[13px] font-bold transition-opacity hover:opacity-85"
      >
        Clean my full file
      </a>

      <div className="mt-5 border-t border-[#1a1a1a] pt-4">
        {status === "sent" ? (
          <p className="font-mono text-[12px] text-[#00ff88]">
            Thanks — I got your request and will reply personally.
          </p>
        ) : (
          <>
            <p className="text-[12px] text-[#666] mb-2">
              Optional: leave your email if you want help interpreting this
              result or cleaning the full file.
            </p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-[#1c1c1a] border border-[#323230] text-[#e8e6e0] px-3 py-2 rounded text-[12px] font-mono outline-none focus:border-[#00ff88] w-full sm:w-64"
              />
              <button
                onClick={submit}
                disabled={status === "sending" || !email.includes("@")}
                className="border border-[#222] text-[#e8e6e0] px-4 py-2 rounded font-mono text-[12px] transition-colors hover:border-[#00ff88] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Get help with this file"}
              </button>
            </div>
            {status === "error" && (
              <p className="font-mono text-[11px] text-[#f5c842] mt-2">
                Could not send automatically. Email{" "}
                <a href="mailto:alex@siteenrich.io" className="underline">alex@siteenrich.io</a>{" "}
                directly.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}