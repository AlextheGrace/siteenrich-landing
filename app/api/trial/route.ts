
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const BLOCKED_DOMAINS = [
  "test.com", "test.de", "tes.de", "example.com", "example.org",
  "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "trashmail.com",
  "maildrop.cc", "dispostable.com", "fakeinbox.com", "spamgourmet.com",
  "spam4.me", "trashmail.me", "tempinbox.com", "throwam.com",
  "getairmail.com", "filzmail.com", "tempr.email", "discard.email"
];

const BLOCKED_LOCAL_PATTERNS = [
  /^test/i, /^fake/i, /^asdf/i, /^qwerty/i,
  /^admin123/i, /^user123/i, /^no-?reply/i, /^noreply/i,
  /^temp/i, /^trash/i, /^spam/i, /^null/i, /^void/i
];

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  const formatOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
  if (!formatOk) return false;
  if (/[|<>()\[\]\\,;:]/.test(trimmed)) return false;
  if (trimmed.length < 6 || trimmed.length > 254) return false;
  const [local, domain] = trimmed.toLowerCase().split("@");
  if (BLOCKED_DOMAINS.includes(domain)) return false;
  if (BLOCKED_LOCAL_PATTERNS.some((p) => p.test(local))) return false;
  if (!domain.includes(".")) return false;
  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2) return false;
  return true;
}

function generateApiKey(): string {
  return "sk-" + crypto.randomBytes(16).toString("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = (body.name ?? "").trim();
  const rawEmail = (body.email ?? "").trim();

  if (!name || !rawEmail) {
    return NextResponse.json(
      { error: "Name and email required" },
      { status: 400 }
    );
  }

  if (!isValidEmail(rawEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  const email = rawEmail.toLowerCase();
  const key = generateApiKey();
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 14);

  const { error } = await supabase.from("api_keys").insert({
    name,
    email,
    key,
    plan: "beta",
    active: true,
    trial_ends_at: trialEndsAt.toISOString(),
    monthly_limit: 100,
  });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Email to user — CSV workflow focus, no API key shown
  await resend.emails.send({
    from: "Alex at SiteEnrich <info@siteenrich.io>",
    to: email,
    subject: "You're in — run 100 CSV rows free",
    html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 40px; background: #0a0a0a; color: #fff;">
        <h2 style="color: #00ff88; margin-bottom: 8px;">Hey ${name} 👋</h2>

        <p style="color: #888; line-height: 1.6;">
          You're in. Your free test is ready.
        </p>

        <p style="color: #888; line-height: 1.6;">
          Upload a small Google Maps, Outscraper, or Apify CSV and SiteEnrich
          will return a cleaned outreach-ready CSV with:
        </p>

        <ul style="color: #888; line-height: 2; padding-left: 20px; margin: 16px 0;">
          <li>Cleaned domains</li>
          <li>Emails and phones found where possible</li>
          <li>Basic MX email verification</li>
          <li>Duplicate flags (phone-first)</li>
          <li>Sendable / review / skip with reasons</li>
        </ul>

        <div style="margin: 28px 0;">
          <a
            href="https://siteenrich.io/trial-success"
            style="background: #00ff88; color: #0a1a0e; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 14px;"
          >
            Upload your CSV →
          </a>
        </div>

        <p style="color: #888; line-height: 1.6;">
          The free test processes your first 100 rows. No credit card needed.
        </p>

        <p style="color: #888; line-height: 1.6;">
          Reply to this email if you run into anything or want me to run a
          larger sample manually.
        </p>

        <p style="color: #666; margin-top: 40px;">
          Alex<br>
          Founder, SiteEnrich<br>
          <a href="https://siteenrich.io" style="color: #00ff88;">siteenrich.io</a>
        </p>
      </div>
    `,
  });

  // Internal notification — key stored here for your reference only
  await resend.emails.send({
    from: "SiteEnrich <info@siteenrich.io>",
    to: "abfgrace@googlemail.com",
    subject: `New SiteEnrich beta signup: ${name}`,
    html: `
      <p><strong>New SiteEnrich beta signup</strong></p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Key: ${key}</p>
      <p>Plan: beta</p>
      <p>Limit: 100 CSV rows</p>
      <p>Trial ends: ${trialEndsAt.toDateString()}</p>
    `,
  });

  // Return success but no key — user goes straight to CSV upload
  return NextResponse.json({ success: true });
}