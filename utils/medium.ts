import { XMLParser } from 'fast-xml-parser';
import type { MediumPost } from '../types/medium';
import type { Post } from '../types/post';

export const getMediumPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://medium.com/feed/@haydenbleasel');
  const xml = await response.text();
  const parser = new XMLParser();
  const feed = parser.parse(xml) as {
    rss: {
      channel: { item?: MediumPost[] };
    };
  };

  if (!feed.rss.channel.item) {
    return [];
  }

  const posts: Post[] = feed.rss.channel.item.map(
    ({ guid, title, link, isoDate }) => ({
      id: guid,
      title,
      link,
      date: isoDate,
    })
  );

  return posts;
};
