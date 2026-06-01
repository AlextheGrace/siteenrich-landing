import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

function generateApiKey(): string {
  return 'sk-' + crypto.randomBytes(16).toString('hex');
}

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }

  const key = generateApiKey();
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 7);

  const { error } = await supabase.from('api_keys').insert({
    name,
    email,
    key,
    plan: 'trial',
    active: true,
    trial_ends_at: trialEndsAt.toISOString()
  });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await resend.emails.send({
    from: 'Alex at SiteEnrich <info@siteenrich.io>',
    to: email,
    subject: 'Your SiteEnrich API key',
    html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 40px; background: #0a0a0a; color: #fff;">
        <h2 style="color: #00ff88; margin-bottom: 8px;">Hey ${name} 👋</h2>
        <p style="color: #888;">Here's your SiteEnrich API key:</p>
        <div style="background: #111; border: 1px solid #333; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <code style="color: #00ff88; font-size: 14px;">${key}</code>
        </div>
        <p style="color: #888;">Test it right now:</p>
        <div style="background: #111; border: 1px solid #333; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <code style="color: #666; font-size: 12px;">curl "https://api.siteenrich.io/analyze?url=stripe.com" \<br>-H "X-API-Key: ${key}"</code>
        </div>
        <p style="color: #888;">Or in n8n — HTTP Request node, GET, same URL, X-API-Key header.</p>
        <p style="color: #888;">Check out the <a href="https://github.com/AlextheGrace/siteenrich-n8n-workflow" style="color: #00ff88;">n8n workflow template on GitHub</a> to get started fast.</p>
        <p style="color: #888;">Let me know what you're building — just reply to this email.</p>
        <p style="color: #666; margin-top: 40px;">Alex<br>Founder, SiteEnrich<br><a href="https://siteenrich.io" style="color: #00ff88;">siteenrich.io</a></p>
      </div>
    `
  });

  await resend.emails.send({
    from: 'SiteEnrich <info@siteenrich.io>',
    to: 'abfgrace@googlemail.com',
    subject: `New trial signup: ${name}`,
    html: `
      <p><strong>New trial signup!</strong></p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Key: ${key}</p>
      <p>Trial ends: ${trialEndsAt.toDateString()}</p>
    `
  });

  return NextResponse.json({ success: true, key });
}