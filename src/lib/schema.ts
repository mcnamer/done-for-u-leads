import { absoluteUrl } from './utils';
import { contact, site, socials } from '@/content/site';
import { businesses } from '@/content/businesses';
import { faqs } from '@/content/faqs';

const PERSON_ID = absoluteUrl('/#jody');

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: site.person,
  url: absoluteUrl('/'),
  image: absoluteUrl('/images/jody/jody-hero-1200.webp'),
  jobTitle: 'Real Estate Broker and Founder of Done For You Leads',
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  sameAs: socials.map((s) => s.href),
  knowsAbout: [
    'Real estate lead generation',
    'Buyer and seller lead campaigns',
    'Real estate marketing',
    'Lead follow-up and conversion',
    'Real estate coaching',
    'Residential real estate',
  ],
  worksFor: businesses.map((b) => ({
    '@type': 'Organization',
    name: b.name,
    url: b.href,
  })),
};

export const localBusinessSchema = {
  '@type': 'ProfessionalService',
  '@id': absoluteUrl('/#business'),
  name: site.name,
  url: absoluteUrl('/'),
  image: absoluteUrl('/logo/jm-mark-256.png'),
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  priceRange: '$$',
  serviceType: 'Real estate lead generation',
  founder: { '@id': PERSON_ID },
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  areaServed: contact.serviceArea.map((name) => ({
    '@type': 'AdministrativeArea',
    name,
  })),
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  url: absoluteUrl('/'),
  name: site.name,
  description: site.description,
  publisher: { '@id': PERSON_ID },
};

export const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Wraps any set of schema nodes into one graph document. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
