"use client";

import { useState, useRef, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.siteenrich.io";

type Step = "upload" | "config" | "processing" | "results";

interface JobStatus {
  jobId: string;
  status: string;
  totalRows: number;
  processedRows: number;
  emailsFound: number;
  mxValidEmails: number;
  phonesFound: number;
  sendableRows: number;
  reviewRows: number;
  skippedRows: number;
  duplicateRows: number;
  errors: string[];
}

interface TickerLine {
  msg: string;
  type: "ok" | "warn" | "skip" | "info";
}

export default function CsvUpload() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [colUrl, setColUrl] = useState("");
  const [colName, setColName] = useState("");
  const [colPhone, setColPhone] = useState("");
  const [colCity, setColCity] = useState("");
  const [colState, setColState] = useState("");
  const [colSource, setColSource] = useState("");
  const [fastMode, setFastMode] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [progress, setProgress] = useState(0);
  const [ticker, setTicker] = useState<TickerLine[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const addTick = useCallback((msg: string, type: TickerLine["type"] = "info") => {
    setTicker(prev => [...prev, { msg, type }]);
    setTimeout(() => {
      if (tickerRef.current) tickerRef.current.scrollTop = tickerRef.current.scrollHeight;
    }, 50);
  }, []);

  function autoDetect(hdrs: string[], patterns: string[]) {
    for (const p of patterns) {
      const f = hdrs.find(h => h.toLowerCase().includes(p));
      if (f) return f;
    }
    return "";
  }

  function parseFile(f: File) {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || "";
      const lines = text.split("\n").filter(l => l.trim());
      const hdrs = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
      const count = lines.length - 1;
      setHeaders(hdrs);
      setRowCount(Math.min(count, 100));

      setColUrl(autoDetect(hdrs, ["website", "url", "web", "site", "domain", "link"]));
      setColName(autoDetect(hdrs, ["name", "business", "company", "title"]));
      setColPhone(autoDetect(hdrs, ["phone", "tel", "mobile"]));
      setColCity(autoDetect(hdrs, ["city", "location", "area"]));
      setColState(autoDetect(hdrs, ["state", "region", "province"]));
      setColSource(autoDetect(hdrs, ["source", "origin"]));

      setStep("config");
    };
    reader.readAsText(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.name.endsWith(".csv")) parseFile(f);
  }

  async function startProcessing() {
    if (!file || !colUrl) return;
    setStep("processing");
    setTicker([]);
    setProgress(0);

    const form = new FormData();
    form.append("file", file);
    form.append("websiteColumn", colUrl);
    if (colName) form.append("businessNameColumn", colName);
    if (colPhone) form.append("phoneColumn", colPhone);
    if (colCity) form.append("cityColumn", colCity);
    if (colState) form.append("stateColumn", colState);
    if (colSource) form.append("sourceColumn", colSource);
    if (fastMode) form.append("fastMode", "true");

    try {
      const resp = await fetch(`${API_BASE}/api/csv-jobs`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (!resp.ok) {
        addTick(`Error: ${data.error || resp.status}`, "warn");
        return;
      }
      setJobId(data.jobId);
      addTick(`Job created — ${data.totalRows} rows queued`, "info");
      if (data.truncated) addTick(`File capped at 100 rows (free tier)`, "warn");
      startPolling(data.jobId, data.totalRows);
    } catch {
      addTick("Could not reach API — check your connection", "warn");
    }
  }

  function startPolling(id: string, total: number) {
    let lastProcessed = 0;
    pollRef.current = setInterval(async () => {
      try {
        const resp = await fetch(`${API_BASE}/api/csv-jobs/${id}/status`);
        const d: JobStatus = await resp.json();
        setJobStatus(d);
        const pct = total > 0 ? Math.round((d.processedRows / total) * 100) : 0;
        setProgress(pct);

        if (d.processedRows > lastProcessed) {
          addTick(
            `${d.processedRows}/${total} — ${d.emailsFound} emails, ${d.sendableRows} sendable`,
            "info"
          );
          lastProcessed = d.processedRows;
        }

        if (d.status === "completed") {
          clearInterval(pollRef.current!);
          setProgress(100);
          addTick(
            `Done — ${d.sendableRows} sendable / ${d.reviewRows} review / ${d.skippedRows} skip`,
            "ok"
          );
          setTimeout(() => setStep("results"), 600);
        } else if (d.status === "failed") {
          clearInterval(pollRef.current!);
          addTick("Job failed", "warn");
        }
      } catch {
        addTick("Poll error", "warn");
      }
    }, 2500);
  }

  function downloadCsv() {
    if (!jobId) return;
    window.location.href = `${API_BASE}/api/csv-jobs/${jobId}/result`;
  }

  function restart() {
    if (pollRef.current) clearInterval(pollRef.current);
    setStep("upload");
    setFile(null);
    setHeaders([]);
    setJobId(null);
    setJobStatus(null);
    setProgress(0);
    setTicker([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const selectClass =
    "w-full bg-[#1c1c1a] border border-[#323230] text-[#e8e6e0] px-3 py-2 rounded text-[12px] font-mono outline-none focus:border-[#00ff88] appearance-none cursor-pointer";

  return (
    <section id="upload" className="px-6 md:px-10 py-16 max-w-4xl mx-auto border-t border-[#272724]">
      <p className="font-mono text-[11px] text-[#4a4844] tracking-widest uppercase mb-5">
        CSV processor — free test
      </p>

      {/* STEP 1: UPLOAD */}
      {step === "upload" && (
        <div className="bg-[#141413] border border-[#272724] rounded-lg p-8">
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg py-16 px-6 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-[#00ff88] bg-[#0d2016]"
                : "border-[#323230] hover:border-[#4a4844] hover:bg-[#1c1c1a]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={e => { if (e.target.files?.[0]) parseFile(e.target.files[0]); }}
            />
            <div className="text-4xl mb-4 opacity-30">⬆</div>
            <p className="text-[15px] text-[#e8e6e0] font-medium mb-2">
              Drop a CSV or click to browse
            </p>
            <p className="text-[12px] text-[#4a4844]">
              Google Maps · Outscraper · Apify · Scrapebox — any scraped local business CSV
            </p>
          </div>
        </div>
      )}

      {/* STEP 2: CONFIG */}
      {step === "config" && (
        <div className="bg-[#141413] border border-[#272724] rounded-lg p-8">
          <p className="font-mono text-[11px] text-[#4a4844] tracking-widest uppercase mb-4">
            Map columns
          </p>
          <div className="font-mono text-[11px] text-[#8a8880] bg-[#1c1c1a] border border-[#272724] rounded px-3 py-2 mb-5">
            <span className="text-[#00ff88] font-medium">{rowCount}</span> rows loaded
            {rowCount >= 100 ? " — free test processes the first 100 rows" : ""}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Website / URL", req: true, val: colUrl, set: setColUrl },
              { label: "Business name", req: false, val: colName, set: setColName },
              { label: "Phone", req: false, val: colPhone, set: setColPhone },
              { label: "City", req: false, val: colCity, set: setColCity },
              { label: "State", req: false, val: colState, set: setColState },
              { label: "Source", req: false, val: colSource, set: setColSource },
            ].map(({ label, req, val, set }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-[#8a8880]">
                  {label}{" "}
                  {req ? (
                    <span className="text-[#00ff88]">*</span>
                  ) : (
                    <span className="text-[#4a4844] text-[10px]">optional</span>
                  )}
                </label>
                <select className={selectClass} value={val} onChange={e => set(e.target.value)}>
                  {!req && <option value="">— none —</option>}
                  {headers.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <label className="flex items-center gap-2 text-[12px] text-[#8a8880] cursor-pointer mb-5">
            <input
              type="checkbox"
              checked={fastMode}
              onChange={e => setFastMode(e.target.checked)}
              className="accent-[#00ff88]"
            />
            <span className="text-[#e8e6e0] font-medium">Fast mode</span> — skip contact-page
            crawl, shorter timeout. Faster, finds fewer emails.
          </label>
          <div className="flex gap-2">
            <button
              onClick={startProcessing}
              disabled={!colUrl}
              className="bg-[#00ff88] text-[#0a1a0e] px-5 py-2.5 rounded font-mono text-[13px] font-bold transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Process CSV
            </button>
            <button
              onClick={() => setStep("upload")}
              className="border border-[#323230] text-[#8a8880] px-4 py-2.5 rounded font-mono text-[13px] transition-colors hover:border-[#8a8880] hover:text-[#e8e6e0]"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PROCESSING */}
      {step === "processing" && (
        <div className="bg-[#141413] border border-[#272724] rounded-lg p-8">
          <p className="font-mono text-[11px] text-[#4a4844] tracking-widest uppercase mb-4">
            Processing{" "}
            <span className="text-[#e8e6e0]">{jobStatus?.totalRows ?? rowCount} rows</span>
          </p>
          <div className="bg-[#1c1c1a] rounded-full h-[3px] overflow-hidden mb-4">
            <div
              className="h-full bg-[#00ff88] transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { val: jobStatus?.processedRows ?? 0, label: "Done" },
              { val: jobStatus?.emailsFound ?? 0, label: "Emails" },
              { val: jobStatus?.phonesFound ?? 0, label: "Phones" },
              { val: jobStatus?.sendableRows ?? 0, label: "Sendable" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-[#1c1c1a] border border-[#272724] rounded px-3 py-2.5">
                <div className="font-mono text-[18px] font-semibold text-[#e8e6e0]">{val}</div>
                <div className="font-mono text-[9px] text-[#4a4844] uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div
            ref={tickerRef}
            className="font-mono text-[11px] bg-[#1c1c1a] border border-[#272724] rounded px-3 py-2.5 h-28 overflow-y-auto text-[#4a4844]"
          >
            {ticker.map((t, i) => (
              <div
                key={i}
                className={`mb-0.5 leading-relaxed ${
                  t.type === "ok"
                    ? "text-[#00ff88]"
                    : t.type === "warn"
                    ? "text-[#f5c842]"
                    : t.type === "skip"
                    ? "text-[#4a4844]"
                    : "text-[#8a8880]"
                }`}
              >
                {t.msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: RESULTS */}
      {step === "results" && jobStatus && (
        <div className="bg-[#141413] border border-[#272724] rounded-lg p-8">
          <p className="font-mono text-[11px] text-[#4a4844] tracking-widest uppercase mb-5">
            Results
          </p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[
              { val: jobStatus.processedRows, label: "Processed", color: "" },
              { val: jobStatus.sendableRows, label: "Sendable", color: "text-[#00ff88]" },
              { val: jobStatus.reviewRows, label: "Review", color: "text-[#f5c842]" },
              { val: jobStatus.skippedRows, label: "Skipped", color: "" },
              { val: jobStatus.emailsFound, label: "Emails found", color: "text-[#00ff88]" },
              { val: jobStatus.mxValidEmails, label: "MX verified", color: "text-[#00ff88]" },
              { val: jobStatus.phonesFound, label: "Phones", color: "" },
              { val: jobStatus.duplicateRows, label: "Duplicates", color: "" },
            ].map(({ val, label, color }) => (
              <div key={label} className="bg-[#1c1c1a] border border-[#272724] rounded px-3 py-2.5">
                <div className={`font-mono text-[22px] font-semibold leading-none mb-1 ${color || "text-[#e8e6e0]"}`}>
                  {val}
                </div>
                <div className="font-mono text-[9px] text-[#4a4844] uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={downloadCsv}
              className="bg-[#00ff88] text-[#0a1a0e] px-5 py-2.5 rounded font-mono text-[13px] font-bold transition-opacity hover:opacity-85"
            >
              Download CSV
            </button>
            <button
              onClick={restart}
              className="border border-[#323230] text-[#8a8880] px-4 py-2.5 rounded font-mono text-[13px] transition-colors hover:border-[#8a8880] hover:text-[#e8e6e0]"
            >
              Process another file
            </button>
          </div>
        </div>
      )}
    </section>
  );
}