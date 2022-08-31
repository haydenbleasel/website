import Parser from 'rss-parser';
import type { MediumPost } from '../types/medium';
import type { Post } from '../types/post';

export const getMediumPosts = async (): Promise<Post[]> => {
  const parser = new Parser();
  const { items } = (await parser.parseURL(
    'https://medium.com/feed/@haydenbleasel'
  )) as { items: MediumPost[] };

  const posts: Post[] = items.map(({ guid, title, link, isoDate }) => ({
    id: guid,
    title,
    link,
    date: isoDate,
  }));

  return posts;
};
