import { ImageResponse } from 'next/og';

export const alt = 'Done For You Leads — Real estate leads that actually convert';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fbfbf7',
          padding: 0,
        }}
      >
        <div style={{ display: 'flex', height: 16, width: '100%', background: '#c6fb50' }} />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 72px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#0c0e08',
            }}
          >
            Real estate lead generation
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              color: '#0c0e08',
              lineHeight: 1,
            }}
          >
            Be the obvious
          </div>
          <div style={{ display: 'flex', marginTop: 8 }}>
            <span
              style={{
                display: 'flex',
                fontSize: 96,
                fontWeight: 700,
                letterSpacing: -3,
                color: '#0c0e08',
                lineHeight: 1,
                background: '#c6fb50',
                padding: '0 14px',
              }}
            >
              agent to call.
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '4px solid #0c0e08',
            padding: '28px 72px',
          }}
        >
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#0c0e08' }}>
            Done For You Leads
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#55584c' }}>doneforuleads.com</div>
        </div>
      </div>
    ),
    size,
  );
}
