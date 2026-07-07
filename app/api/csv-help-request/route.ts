// app/api/csv-help-request/route.ts
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Internal recipients. Keep alex@ as primary; add the googlemail as backup.
const INTERNAL_TO = ["alex@siteenrich.io", "abfgrace@googlemail.com"];
const FROM = "SiteEnrich <info@siteenrich.io>";
const FROM_ALEX = "Alex at SiteEnrich <info@siteenrich.io>";

interface HelpRequest {
  email: string;
  jobId?: string;
  fileName?: string;
  processed?: number;
  sendable?: number;
  review?: number;
  skipped?: number;
  emailsFound?: number;
  mxVerified?: number;
  phonesFound?: number;
  duplicates?: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape any value going into HTML to prevent injection.
function esc(v: unknown): string {
  if (v === undefined || v === null) return "-";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function num(v: unknown): string {
  return typeof v === "number" ? String(v) : "-";
}

export async function POST(request: NextRequest) {
  let data: HelpRequest;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (data.email || "").trim();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const {
    jobId, fileName, processed, sendable, review, skipped,
    emailsFound, mxVerified, phonesFound, duplicates,
  } = data;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666;">${label}</td>` +
    `<td style="padding:4px 0;font-family:monospace;color:#111;">${value}</td></tr>`;

  const internalHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;">
      <h2 style="margin:0 0 8px;">New result help request</h2>
      <p style="color:#444;margin:0 0 16px;">
        Someone wants help interpreting their CSV result or cleaning the full file.
      </p>
      <table style="border-collapse:collapse;font-size:14px;">
        ${row("Email", esc(email))}
        ${row("Job ID", esc(jobId))}
        ${row("File", esc(fileName))}
        ${row("Processed", num(processed))}
        ${row("Sendable", num(sendable))}
        ${row("Review", num(review))}
        ${row("Skipped", num(skipped))}
        ${row("Emails found", num(emailsFound))}
        ${row("MX verified", num(mxVerified))}
        ${row("Phones found", num(phonesFound))}
        ${row("Duplicates", num(duplicates))}
      </table>
      <p style="margin:16px 0 0;">
        <a href="mailto:${esc(email)}">Reply to ${esc(email)}</a>
      </p>
    </div>`;

  const confirmationHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;">
      <p>Hey,</p>
      <p>I got your request about your SiteEnrich result.</p>
      <p>
        I&rsquo;ll take a look and reply personally. If you want the full file
        cleaned, just reply to this email and attach the spreadsheet.
      </p>
      <table style="border-collapse:collapse;font-size:14px;margin:16px 0;">
        ${row("Processed", num(processed))}
        ${row("Sendable", num(sendable))}
        ${row("Review", num(review))}
        ${row("Skipped", num(skipped))}
        ${row("Duplicates", num(duplicates))}
      </table>
      <p style="margin:16px 0 0;">Alex<br/>
        <span style="color:#666;">Founder, SiteEnrich</span>
      </p>
    </div>`;

  try {
    // Internal notification — reply-To routes straight to the lead.
    await resend.emails.send({
      from: FROM,
      to: INTERNAL_TO,
      replyTo: email,
      subject: `SiteEnrich result help request — ${email}`,
      html: internalHtml,
    });

    // Confirmation to the requester.
    await resend.emails.send({
      from: FROM_ALEX,
      to: email,
      subject: "SiteEnrich — I got your result request",
      html: confirmationHtml,
    });

    console.log(JSON.stringify({
      event: "csv_help_request_sent",
      email, jobId, fileName, processed, sendable, review, skipped,
      emailsFound, mxVerified, phonesFound, duplicates,
      createdAt: new Date().toISOString(),
    }));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CSV help request email failed:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}