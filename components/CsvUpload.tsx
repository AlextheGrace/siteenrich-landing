"use client";

import { useState, useRef, useCallback } from "react";
import * as XLSX from "xlsx";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.siteenrich.io";

const URL_COLUMN_ALIASES = [
  "website", "url", "site", "domain", "business_url", "company_website",
  "homepage", "link", "inputurl", "businesswebsite", "web"
];

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
  const [urlOnlyMode, setUrlOnlyMode] = useState(false);
  const [showFullFileModal, setShowFullFileModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const addTick = useCallback((msg: string, type: TickerLine["type"] = "info") => {
    setTicker(prev => [...prev, { msg, type }]);
    setTimeout(() => {
      if (tickerRef.current) tickerRef.current.scrollTop = tickerRef.current.scrollHeight;
    }, 50);
  }, []);

  function isUrlAlias(header: string) {
    return URL_COLUMN_ALIASES.includes(header.toLowerCase().replace(/[\s-]/g, "_"));
  }

  function autoDetect(hdrs: string[], patterns: string[]) {
    for (const p of patterns) {
      const f = hdrs.find(h => h.toLowerCase().replace(/[\s-]/g, "_").includes(p));
      if (f) return f;
    }
    return "";
  }

  function isExcelFile(f: File) {
    return /\.(xlsx|xls)$/i.test(f.name);
  }

  // Convert an Excel file to a CSV File object so the rest of the pipeline
  // (upload, mapping, backend) stays identical. Returns null on failure.
  async function excelToCsvFile(f: File): Promise<File | null> {
    try {
      const buffer = await f.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) return null;
      const sheet = workbook.Sheets[firstSheetName];
      const csvString = XLSX.utils.sheet_to_csv(sheet);
      const csvName = f.name.replace(/\.(xlsx|xls)$/i, ".csv");
      return new File([csvString], csvName, { type: "text/csv" });
    } catch {
      return null;
    }
  }

  function processHeaders(csvText: string, csvFile: File) {
    const lines = csvText.split("\n").filter(l => l.trim());
    const hdrs = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
    const count = lines.length - 1;
    setHeaders(hdrs);
    setRowCount(Math.min(count, 100));

    const detectedUrl = autoDetect(hdrs, ["website", "url", "site", "domain", "business_url", "company_website", "homepage", "link"]);
    setColUrl(detectedUrl);
    setColName(autoDetect(hdrs, ["name", "business", "company", "title"]));
    setColPhone(autoDetect(hdrs, ["phone", "tel", "mobile"]));
    setColCity(autoDetect(hdrs, ["city", "location", "area"]));
    setColState(autoDetect(hdrs, ["state", "region", "province"]));
    setColSource(autoDetect(hdrs, ["source", "origin"]));

    const isUrlOnly = hdrs.length === 1 && detectedUrl !== "";
    setUrlOnlyMode(isUrlOnly);

    if (isUrlOnly && detectedUrl) {
      setStep("processing");
      setTicker([]);
      setProgress(0);
      submitJob(csvFile, detectedUrl, "", "", "", "", "", false);
    } else {
      setStep("config");
    }
  }

  async function parseFile(f: File) {
    // If Excel, convert to CSV first
    let workingFile = f;
    if (isExcelFile(f)) {
      const converted = await excelToCsvFile(f);
      if (!converted) {
        alert("Could not read that Excel file. Try saving it as CSV and uploading again.");
        return;
      }
      workingFile = converted;
    }

    setFile(workingFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || "";
      processHeaders(text, workingFile);
    };
    reader.readAsText(workingFile);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && /\.(csv|xlsx|xls)$/i.test(f.name)) parseFile(f);
  }

  async function submitJob(
    csvFile: File,
    urlColumn: string,
    nameColumn: string,
    phoneColumn: string,
    cityColumn: string,
    stateColumn: string,
    sourceColumn: string,
    fast: boolean
  ) {
    const form = new FormData();
    form.append("file", csvFile);
    form.append("websiteColumn", urlColumn);
    if (nameColumn) form.append("businessNameColumn", nameColumn);
    if (phoneColumn) form.append("phoneColumn", phoneColumn);
    if (cityColumn) form.append("cityColumn", cityColumn);
    if (stateColumn) form.append("stateColumn", stateColumn);
    if (sourceColumn) form.append("sourceColumn", sourceColumn);
    if (fast) form.append("fastMode", "true");

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
      if (data.truncated) addTick(`Capped at 100 rows (free tier)`, "warn");
      startPolling(data.jobId, data.totalRows);
    } catch {
      addTick("Could not reach API — check your connection", "warn");
    }
  }

  async function startProcessing() {
    if (!file || !colUrl) return;
    setStep("processing");
    setTicker([]);
    setProgress(0);
    await submitJob(file, colUrl, colName, colPhone, colCity, colState, colSource, fastMode);
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
    setUrlOnlyMode(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const selectClass =
    "w-full bg-[#1c1c1a] border border-[#323230] text-[#e8e6e0] px-3 py-2 rounded text-[12px] font-mono outline-none focus:border-[#00ff88] appearance-none cursor-pointer";

  return (
    <section id="upload" className="px-6 md:px-10 py-16 max-w-4xl mx-auto border-t border-[#1a1a1a]">
      <p className="font-mono text-[11px] text-[#444] tracking-widest uppercase mb-5">
        Spreadsheet processor — free test
      </p>

      {/* STEP 1: UPLOAD */}
      {step === "upload" && (
        <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-8">
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg py-14 px-6 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-[#00ff88] bg-[#00ff8808]"
                : "border-[#222] hover:border-[#333] hover:bg-[#0f0f0f]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={e => { if (e.target.files?.[0]) parseFile(e.target.files[0]); }}
            />
            <div className="text-3xl mb-4 opacity-25">⬆</div>
            <p className="text-[15px] text-[#e8e6e0] font-medium mb-2">
              Drop your spreadsheet or click to browse
            </p>
            <p className="text-[12px] text-[#444] mb-3">
              Supports Google Sheets exports, Excel (.xlsx, .xls), and CSV
            </p>
            <p className="text-[11px] text-[#333] mb-6">
              Google Maps · Outscraper · Apify · Apollo · Clay · Scrapebox exports
            </p>
            <div className="font-mono text-[11px] text-[#333] text-left inline-block border border-[#1a1a1a] rounded px-4 py-3 bg-[#0a0a0a]">
              <div className="text-[#444] mb-1">website</div>
              <div>https://business1.com</div>
              <div>https://business2.com</div>
              <div>https://business3.com</div>
            </div>
            <p className="text-[11px] text-[#333] mt-4 font-mono">
              URL-only spreadsheets are detected automatically — no column mapping needed
            </p>
            <a
              href="/sample-output.csv"
              download
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] text-[#00ff88] mt-2 inline-block hover:opacity-80 transition-opacity font-mono"
            >
              You can also try the sample file before uploading your own data →
            </a>
          </div>
        </div>
      )}

      {/* STEP 2: CONFIG — only shown for multi-column CSVs */}
      {step === "config" && (
        <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-8">
          <p className="font-mono text-[11px] text-[#444] tracking-widest uppercase mb-4">
            Map columns
          </p>
          <div className="font-mono text-[11px] text-[#666] bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2 mb-5">
            <span className="text-[#00ff88] font-medium">{rowCount}</span> rows loaded
            {rowCount >= 100 ? " — free test processes the first 100 rows" : ""}
            {" · "}If your CSV only contains website URLs, SiteEnrich will detect the column automatically.
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
                <label className="font-mono text-[11px] text-[#666]">
                  {label}{" "}
                  {req ? (
                    <span className="text-[#00ff88]">*</span>
                  ) : (
                    <span className="text-[#333] text-[10px]">optional</span>
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
          <label className="flex items-center gap-2 text-[12px] text-[#666] cursor-pointer mb-5">
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
              Process {rowCount} rows free
            </button>
            <button
              onClick={() => setStep("upload")}
              className="border border-[#222] text-[#666] px-4 py-2.5 rounded font-mono text-[13px] transition-colors hover:border-[#444] hover:text-[#e8e6e0]"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PROCESSING */}
      {step === "processing" && (
        <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-8">
          <p className="font-mono text-[11px] text-[#444] tracking-widest uppercase mb-4">
            Processing{" "}
            <span className="text-[#e8e6e0]">{jobStatus?.totalRows ?? rowCount} rows</span>
            {urlOnlyMode && <span className="text-[#444] ml-2">— URL-only mode</span>}
          </p>
          <div className="bg-[#0a0a0a] rounded-full h-[3px] overflow-hidden mb-4">
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
              <div key={label} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5">
                <div className="font-mono text-[18px] font-semibold text-[#e8e6e0]">{val}</div>
                <div className="font-mono text-[9px] text-[#444] uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div
            ref={tickerRef}
            className="font-mono text-[11px] bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 h-28 overflow-y-auto text-[#444]"
          >
            {ticker.map((t, i) => (
              <div
                key={i}
                className={`mb-0.5 leading-relaxed ${
                  t.type === "ok" ? "text-[#00ff88]"
                  : t.type === "warn" ? "text-[#f5c842]"
                  : t.type === "skip" ? "text-[#333]"
                  : "text-[#666]"
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
        <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-8">
          <p className="font-mono text-[11px] text-[#444] tracking-widest uppercase mb-5">
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
              <div key={label} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5">
                <div className={`font-mono text-[22px] font-semibold leading-none mb-1 ${color || "text-[#e8e6e0]"}`}>
                  {val}
                </div>
                <div className="font-mono text-[9px] text-[#444] uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>

          <div className="mb-6 space-y-1.5">
            <p className="text-[14px] text-[#e8e6e0] font-medium">
              Most rows in this sample are not ready to import directly into outreach.
            </p>
            <p className="text-[13px] text-[#666] leading-relaxed">
              The downloaded spreadsheet includes a reason for every send, review,
              or skip decision.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={downloadCsv}
              className="bg-[#00ff88] text-[#0a1a0e] px-5 py-2.5 rounded font-mono text-[13px] font-bold transition-opacity hover:opacity-85"
            >
              Download spreadsheet
            </button>
            <button
              onClick={() => setShowFullFileModal(true)}
              className="border border-[#00ff8833] text-[#00ff88] px-4 py-2.5 rounded font-mono text-[13px] transition-colors hover:bg-[#00ff8808]"
            >
              Clean my full file
            </button>
            <button
              onClick={restart}
              className="border border-[#222] text-[#666] px-4 py-2.5 rounded font-mono text-[13px] transition-colors hover:border-[#444] hover:text-[#e8e6e0]"
            >
              Process another file
            </button>
          </div>
        </div>
      )}

      {showFullFileModal && jobStatus && (
        <FullFileModal
          jobId={jobId}
          fileName={file?.name}
          stats={jobStatus}
          onClose={() => setShowFullFileModal(false)}
        />
      )}
    </section>
  );
}

interface FullFileModalProps {
  jobId: string | null;
  fileName?: string;
  stats: JobStatus;
  onClose: () => void;
}

function FullFileModal({ jobId, fileName, stats, onClose }: FullFileModalProps) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/full-file-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          note,
          jobId,
          fileName,
          totalRows: stats.totalRows,
          processedRows: stats.processedRows,
          sendableRows: stats.sendableRows,
          reviewRows: stats.reviewRows,
          skippedRows: stats.skippedRows,
          duplicateRows: stats.duplicateRows,
          emailsFound: stats.emailsFound,
          mxValidEmails: stats.mxValidEmails,
          phonesFound: stats.phonesFound,
        }),
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
          className="absolute top-4 right-4 text-[#444] hover:text-[#888] transition-colors font-mono text-sm"
        >
          ✕
        </button>

        {status === "sent" ? (
          <div className="text-center py-6">
            <div className="text-[#00ff88] text-3xl mb-4">✓</div>
            <h3 className="text-[#e8e6e0] text-lg font-light mb-2">Got it.</h3>
            <p className="text-[#555] text-sm leading-relaxed">
              I'll clean your full file and follow up within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <p className="font-mono text-[#00ff88] text-[11px] tracking-widest uppercase mb-2">
              Clean my full file
            </p>
            <h3 className="text-[#e8e6e0] text-xl font-light mb-3">
              Want the full spreadsheet cleaned?
            </h3>
            <p className="text-[#666] text-[13px] leading-relaxed mb-3">
              The free test covers up to 100 rows. Leave your email and I'll
              reply personally with next steps.
            </p>
            <p className="text-[15px] font-semibold text-white mb-6">
              Full-file cleanup starts at <span className="text-[#00ff88]">$49</span>.
            </p>
            <form onSubmit={submit} className="space-y-4">
              <input
                required
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors"
              />
              <textarea
                placeholder="Optional note — how many rows, what campaign, anything I should know?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-3 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all text-sm font-mono disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Request full-file cleanup"}
              </button>
              {status === "error" && (
                <p className="font-mono text-[11px] text-red-400 text-center">
                  Something went wrong. Email alex@siteenrich.io
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}