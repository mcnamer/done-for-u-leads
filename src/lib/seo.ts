import type { Metadata } from 'next';
import { absoluteUrl, SITE_URL } from './utils';
import { site } from '@/content/site';

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Set false on thin/legal pages you do not want competing in search. */
  index?: boolean;
};

export function buildMetadata({ title, description, path, index = true }: SeoInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title,
      description,
      locale: site.locale,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@jmcnamer',
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}
