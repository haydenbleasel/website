/* eslint-disable n/no-sync */
// eslint-disable-next-line import/no-nodejs-modules
import fs from 'node:fs';
import type { MetadataRoute } from 'next';

const pages = fs
  .readdirSync('app', { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((folder) => folder.name)
  .filter((folder) => !folder.startsWith('('))
  .filter((folder) => !folder.startsWith('_'))
  .filter((folder) => folder !== 'og');

const blogs = fs
  .readdirSync('content/blog', { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((folder) => folder.name);

const works = fs
  .readdirSync('content/work', { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((folder) => folder.name);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').href,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: new URL(page, process.env.NEXT_PUBLIC_SITE_URL).href,
      lastModified: new Date(),
    })),
    ...blogs.map((blog) => ({
      url: new URL(`blog/${blog}`, process.env.NEXT_PUBLIC_SITE_URL).href,
      lastModified: new Date(),
    })),
    ...works.map((work) => ({
      url: new URL(`work/${work}`, process.env.NEXT_PUBLIC_SITE_URL).href,
      lastModified: new Date(),
    })),
  ];
}
