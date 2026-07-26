import { NextResponse } from 'next/server';
import { contactSchema, topicLabels } from '@/lib/validation';
import { rateLimit } from '@/lib/rate-limit';
import { contact } from '@/content/site';

export const runtime = 'nodejs';

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() ?? 'unknown';
}

export async function POST(request: Request) {
  const limit = rateLimit(clientIp(request));
  if (!limit.ok) {
    return NextResponse.json(
      { error: `Too many messages. Try again in ${limit.retryAfter} seconds.` },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Some fields need another look.', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped: accept silently so the bot does not learn anything.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;

  // No mail provider wired up yet: log it rather than lose it, and do not lie
  // to the visitor about delivery.
  if (!apiKey || !from) {
    console.warn('[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not set. Enquiry:', data);
    return NextResponse.json(
      { error: 'The contact form is not connected yet. Please email jody@doneforuleads.com directly.' },
      { status: 503 },
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `doneforuleads.com — ${topicLabels[data.topic]} — ${data.name}`,
      text: [
        `Name:    ${data.name}`,
        `Email:   ${data.email}`,
        `Phone:   ${data.phone || '—'}`,
        `Topic:   ${topicLabels[data.topic]}`,
        '',
        data.message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error('[contact] Resend rejected the message:', response.status, detail);
    return NextResponse.json(
      { error: 'The message did not send. Please email jody@doneforuleads.com directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
