'use client';

import Script from 'next/script';

/**
 * Done For You Leads AI assistant — the OS Analytics per-business chat widget
 * (business id "dfu-leads"). The embed loader pulls its branding + starter
 * questions from the dashboard and mounts a chat bubble.
 *
 * The dashboard origin defaults to the current (temporary) WordPress install;
 * set NEXT_PUBLIC_OSA_ORIGIN in the environment to point at the real domain
 * once WordPress moves.
 */
const ORIGIN =
  process.env.NEXT_PUBLIC_OSA_ORIGIN || 'https://yhr.jon.mybluehost.me/website_9ccbd311';

export function AiAssistant() {
  return (
    <Script
      src={`${ORIGIN}/wp-content/plugins/os-analytics/assets/assistant/embed.js`}
      strategy="afterInteractive"
      data-osa-business="dfu-leads"
      data-osa-base={`${ORIGIN}/wp-json/os-analytics/v1`}
      data-osa-css={`${ORIGIN}/wp-content/plugins/os-analytics/assets/assistant/widget.css`}
    />
  );
}
