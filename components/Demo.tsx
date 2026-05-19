"use client";

import { useState } from "react";

const DEMO_KEY = "test-key-123"; // Replace with a dedicated demo key in Railway



export default function Demo() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState<any>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
    const [time, setTime] = useState<number | null>(null);

    async function handleAnalyze() {
        if (!url.trim()) return;
        setStatus("loading");
        setResult(null);
        setTime(null);

        const start = Date.now();
        try {
            const res = await fetch(
                `https://api.siteenrich.io/analyze?url=${encodeURIComponent(url.trim())}`,
                { headers: { "X-API-Key": DEMO_KEY } }
            );
            const data = await res.json();
            setTime(Date.now() - start);
            setResult(data);
            setStatus("done");
        } catch {
            setStatus("error");
        }
    }

    function handleKey(e: React.KeyboardEvent) {
        if (e.key === "Enter") handleAnalyze();
    }



    return (
        <section id="demo" className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="mono text-[#00ff88] text-xs tracking-widest uppercase mb-4">
                        Live Demo
                    </div>
                    <h2 className="text-4xl font-light tracking-tight mb-4">
                        Try it right now
                    </h2>
                    <p className="text-[#666] text-sm">
                        Enter any company URL and see the response instantly. No signup needed.
                    </p>
                </div>

                {/* Input */}
                <div className="flex gap-3 mb-8">
                    <div className="flex-1 relative">
                 
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="e.g. stripe.com"
                            className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-4 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00ff8833] transition-colors mono"
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={status === "loading" || !url.trim()}
                        className="px-6 py-4 bg-[#00ff88] text-black font-medium rounded-lg hover:bg-[#00e87a] transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed mono whitespace-nowrap"
                        style={{ boxShadow: status !== "loading" ? "0 0 20px #00ff8833" : "none" }}
                    >
                        {status === "loading" ? (
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />
                                Analyzing
                            </span>
                        ) : (
                            "Analyze →"
                        )}
                    </button>
                </div>

                {/* Result */}
                {status === "done" && result && (
                    <div className="card overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1a1a1a]">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                <span className="mono text-xs text-[#444] ml-2">response.json</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {result.error ? (
                                    <span className="mono text-xs text-[#ff6b6b]">
                                        error: {result.error}
                                    </span>
                                ) : (
                                    <span className="mono text-xs text-[#00ff88]">200 OK</span>
                                )}
                                {time && (
                                    <span className="mono text-xs text-[#444]">{time}ms</span>
                                )}
                            </div>
                        </div>
                        <pre className="p-6 mono text-xs text-[#ccc] overflow-x-auto leading-6">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}

                {status === "error" && (
                    <div className="card p-6 text-center border-red-900">
                        <p className="mono text-xs text-red-400">
                            Something went wrong. Try again or contact info@siteenrich.io
                        </p>
                    </div>
                )}

                {/* CTA after demo */}
                {status === "done" && (
                    <div className="mt-8 text-center">
                        <p className="text-[#666] text-sm mb-4">
                            Ready to use this in your workflow?
                        </p>
                        <a
                            href="#trial"
                            className="inline-block px-8 py-3.5 bg-[#00ff88] text-black font-medium rounded hover:bg-[#00e87a] transition-all text-sm"
                            style={{ boxShadow: "0 0 20px #00ff8833" }}
                        >
                            Start 7-day free trial
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}