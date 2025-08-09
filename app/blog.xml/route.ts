import { allPosts } from 'content-collections';
import { Feed } from 'feed';

export function GET() {
  const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!siteUrl) {
    throw new Error(
      'Missing VERCEL_PROJECT_PRODUCTION_URL environment variable'
    );
  }

  const author = {
    name: 'Hayden Bleasel',
    email: 'hello@haydenbleasel.com',
  };

  const feed = new Feed({
    title: author.name,
    description:
      'All of my long-form thoughts on software design and product updates.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/icon.png`,
    favicon: `${siteUrl}/icon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/blog.xml`,
    },
  });

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  for (const article of sortedPosts) {
    const publicUrl = `${siteUrl}/blog/${article.slug}`;

    feed.addItem({
      title: article.title,
      id: publicUrl,
      link: publicUrl,
      content: article.body,
      author: [author],
      contributor: [author],
      date: article.date,
      description: article.description,
    });
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  });
}
