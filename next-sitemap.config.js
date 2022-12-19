// Fix spread slug issues e.g.
// http://localhost:3000/work/%2Fwork%2Fcorellium
// http://localhost:3000/blog/%2Fblog%2Fpresumi

const fixPath = (path) => {
  return path
    .replace('/work/%2Fwork%2F', '/work/')
    .replace('/blog/%2Fblog%2F', '/blog/');
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  transform: async (config, path) => {
    return {
      loc: fixPath(path),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
