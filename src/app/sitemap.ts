import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/utils';
import { posts } from '@/content/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/about-us'), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    {
      url: absoluteUrl('/how-it-works'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: absoluteUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/book'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/blogs'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    {
      url: absoluteUrl('/contact-us'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/privacy-policies'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: absoluteUrl('/terms-and-conditions'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...pages, ...articles];
}
