import type { Metadata, Viewport } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { PrismSpine } from '@/components/prism';
import { Preloader } from '@/components/preloader';
import { BookingModal } from '@/components/booking/booking-modal';
import { site } from '@/content/site';
import { SITE_URL } from '@/lib/utils';
import { graph, localBusinessSchema, personSchema, websiteSchema } from '@/lib/schema';

// Montserrat — headings and tracked labels (variable weight).
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Poppins — body text.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Done For You Leads — Real Estate Lead Generation, Done For You',
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
    'buyer leads for agents',
    'seller leads for agents',
    'real estate marketing done for you',
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
  themeColor: '#0A1626',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = graph(personSchema, localBusinessSchema, websiteSchema);

  return (
    <html
      lang="en"
      data-theme="light"
      className={`${montserrat.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          // Set the theme before first paint so there is no flash. Defaults to
          // light when nothing is stored.
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'light'}catch(e){document.documentElement.dataset.theme='light'}",
          }}
        />
        <Preloader />
        <Link
          href="#main"
          className="focus:bg-brass focus:text-onaccent sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-2.5 focus:font-medium"
        >
          Skip to content
        </Link>

        <SiteHeader />
        <PrismSpine />

        <main id="main">{children}</main>

        <SiteFooter />
        <BookingModal />

        {/* OS Analytics AI assistant chat bubble */}
        <Script
          src="https://yhr.jon.mybluehost.me/website_9ccbd311/wp-content/plugins/os-analytics/assets/assistant/embed.js"
          data-osa-business="doneforuleads"
          data-osa-base="https://yhr.jon.mybluehost.me/website_9ccbd311/wp-json/os-analytics/v1"
          data-osa-css="https://yhr.jon.mybluehost.me/website_9ccbd311/wp-content/plugins/os-analytics/assets/assistant/widget.css"
          data-osa-color="#16304D"
          data-osa-accent="#16304D"
          data-osa-primary="#16304D"
          data-osa-theme="#16304D"
          strategy="afterInteractive"
        />

        <script
          type="application/ld+json"
          // Server-rendered, static, no user input. Safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
