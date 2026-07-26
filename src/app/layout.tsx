import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { BookingModal } from '@/components/booking/booking-modal';
import { site } from '@/content/site';
import { SITE_URL } from '@/lib/utils';
import { graph, localBusinessSchema, personSchema, websiteSchema } from '@/lib/schema';

// Space Grotesk — display headings and tracked labels.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Inter — body copy.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Done For You Leads — Real Estate Leads That Actually Convert',
    template: '%s | Done For You Leads',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person, url: SITE_URL }],
  creator: site.person,
  keywords: [
    'real estate leads',
    'done for you leads',
    'real estate lead generation',
    'exclusive real estate leads',
    'unique selling proposition',
    'real estate marketing',
    'realtor lead gen',
    'Jody McNamer',
  ],
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    icon: '/logo/jm-mark-256.png',
    apple: '/logo/jm-mark-256.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#fbfbf7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = graph(personSchema, localBusinessSchema, websiteSchema);

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Link
          href="#main"
          className="focus:bg-lime focus:text-ink sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:border-2 focus:border-ink focus:px-5 focus:py-2.5 focus:font-semibold"
        >
          Skip to content
        </Link>

        <SiteHeader />

        <main id="main">{children}</main>

        <SiteFooter />
        <BookingModal />

        <script
          type="application/ld+json"
          // Server-rendered, static, no user input. Safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
