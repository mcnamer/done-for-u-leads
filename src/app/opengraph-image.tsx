import { ImageResponse } from 'next/og';
import { businesses } from '@/content/businesses';

export const alt = 'Done For You Leads — Real estate lead generation, done for you';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #0A1626 0%, #16304D 100%)',
        padding: 72,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#A46BE8',
          }}
        >
          Real estate lead generation · Done for you
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 84,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.05,
          }}
        >
          Done For You Leads
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 32,
            color: '#8FA3B8',
            maxWidth: 820,
            lineHeight: 1.35,
          }}
        >
          Campaigns built, launched and managed for you. Conversations, not cold calls.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', height: 6, width: '100%' }}>
          {businesses.map((b) => (
            <div key={b.slug} style={{ display: 'flex', flex: 1, background: b.hex }} />
          ))}
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#ffffff' }}>doneforuleads.com</div>
      </div>
    </div>,
    size,
  );
}
