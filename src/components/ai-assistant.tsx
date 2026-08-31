'use client';

import { useEffect } from 'react';

/**
 * Done For You Leads AI assistant — the OS Analytics per-business chat widget
 * (business id "dfu-leads"), connected to the JDY / OS Analytics dashboard.
 *
 * Injects the exact same embed <script> the Kajabi/HTML embed uses, so it
 * behaves identically. The dashboard origin defaults to the current
 * (temporary) WordPress install; set NEXT_PUBLIC_OSA_ORIGIN to point at the
 * real domain once WordPress moves.
 */
const ORIGIN =
  process.env.NEXT_PUBLIC_OSA_ORIGIN || 'https://yhr.jon.mybluehost.me/website_9ccbd311';

export function AiAssistant() {
  useEffect(() => {
    if (document.getElementById('osa-embed')) return; // already added
    const s = document.createElement('script');
    s.id = 'osa-embed';
    s.src = `${ORIGIN}/wp-content/plugins/os-analytics/assets/assistant/embed.js`;
    s.defer = true;
    s.setAttribute('data-osa-business', 'dfu-leads');
    s.setAttribute('data-osa-base', `${ORIGIN}/wp-json/os-analytics/v1`);
    s.setAttribute('data-osa-css', `${ORIGIN}/wp-content/plugins/os-analytics/assets/assistant/widget.css`);
    document.body.appendChild(s);
  }, []);

  return null;
}
