import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
    lastModified: new Date(),
  },
];

export default sitemap;
