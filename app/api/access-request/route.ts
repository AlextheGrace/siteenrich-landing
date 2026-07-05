import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, rows, plan } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "SiteEnrich <info@siteenrich.io>",
      to: "abfgrace@googlemail.com",
      subject: `SiteEnrich access request: ${plan} — ${name}`,
      html: `
        <div style="font-family:monospace;max-width:600px;padding:32px;background:#0a0a0a;color:#ccc;">
          <h2 style="color:#00ff88;margin-bottom:4px;">New access request</h2>
          <p style="color:#555;font-size:12px;margin-bottom:24px;">Someone wants a larger plan.</p>
          <table style="width:100%;font-size:13px;border-collapse:collapse;">
            <tr><td style="color:#555;padding:4px 0;">Name</td><td style="color:#fff;">${name}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Email</td><td style="color:#00ff88;">${email}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Plan</td><td style="color:#fff;">${plan}</td></tr>
            <tr><td style="color:#555;padding:4px 0;">Est. rows/month</td><td style="color:#fff;">${rows || "—"}</td></tr>
          </table>
          <p style="margin-top:24px;">
            <a href="mailto:${email}" style="color:#00ff88;">Reply to ${email}</a>
          </p>
        </div>
      `,
    });

    // Confirmation to the requester
    await resend.emails.send({
      from: "Alex at SiteEnrich <info@siteenrich.io>",
      to: email,
      subject: "SiteEnrich — I got your request",
      html: `
        <div style="font-family:monospace;max-width:600px;padding:32px;background:#0a0a0a;color:#ccc;">
          <h2 style="color:#00ff88;margin-bottom:8px;">Hey ${name} 👋</h2>
          <p style="color:#888;line-height:1.6;">
            Got your request for the ${plan} plan. I'll follow up personally within 24 hours.
          </p>
          <p style="color:#888;line-height:1.6;">
            In the meantime, feel free to run a free 100-row test at
            <a href="https://siteenrich.io" style="color:#00ff88;">siteenrich.io</a>
            if you haven't already.
          </p>
          <p style="color:#666;margin-top:32px;">
            Alex<br>
            Founder, SiteEnrich
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Access request email failed:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}