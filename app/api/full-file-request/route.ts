import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    email, note, jobId, fileName,
    totalRows, processedRows, sendableRows, reviewRows,
    skippedRows, duplicateRows, emailsFound, mxValidEmails, phonesFound,
  } = body;

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    // Notification to you — every field from the checklist
    await resend.emails.send({
      from: "SiteEnrich <alex@siteenrich.io>",
      to: "alex@siteenrich.io",
      subject: `Full-file cleanup request — ${email}`,
      html: `
        <div style="font-family:monospace;max-width:600px;padding:32px;background:#0a0a0a;color:#ccc;">
          <h2 style="color:#00ff88;margin-bottom:4px;">Full-file cleanup request</h2>
          <p style="color:#555;font-size:12px;margin-bottom:24px;">Someone ran the free test and wants the whole file done.</p>
          <table style="width:100%;font-size:13px;border-collapse:collapse;">
            <tr><td style="color:#555;padding:4px 0;">User email</td><td style="color:#00ff88;">${email}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Note</td><td style="color:#fff;">${note || "—"}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Job ID</td><td style="color:#fff;">${jobId || "—"}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">File name</td><td style="color:#fff;">${fileName || "—"}</td></tr>
            <tr><td colspan="2" style="padding:12px 0 4px;color:#00ff88;font-size:11px;text-transform:uppercase;letter-spacing:.08em;">Sample results (first ${processedRows} rows)</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Processed rows</td><td style="color:#fff;">${processedRows}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Sendable</td><td style="color:#00ff88;">${sendableRows}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Review</td><td style="color:#f5c842;">${reviewRows}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Skipped</td><td style="color:#fff;">${skippedRows}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Duplicates</td><td style="color:#fff;">${duplicateRows}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Emails found</td><td style="color:#fff;">${emailsFound}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">MX verified</td><td style="color:#fff;">${mxValidEmails}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Phones found</td><td style="color:#fff;">${phonesFound}</td></tr>
          </table>
          <p style="margin-top:24px;">
            <a href="mailto:${email}" style="color:#00ff88;">Reply to ${email}</a>
          </p>
        </div>
      `,
    });

    // Confirmation to the user
    await resend.emails.send({
      from: "Alex at SiteEnrich <alex@siteenrich.io>",
      to: email,
      subject: "SiteEnrich — full-file cleanup",
      html: `
        <div style="font-family:monospace;max-width:600px;padding:32px;background:#0a0a0a;color:#ccc;">
          <h2 style="color:#00ff88;margin-bottom:8px;">Thanks 👋</h2>
          <p style="color:#888;line-height:1.6;">
            Got your request to clean the full file. I'll process it and follow up
            within 24 hours with the cleaned spreadsheet and next steps.
          </p>
          <p style="color:#666;margin-top:32px;">Alex<br>Founder, SiteEnrich</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Full-file request failed:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}