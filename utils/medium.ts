import Parser from 'rss-parser';
import slugify from 'slugify';
import type { MediumPost } from '../types/medium';
import type { Post } from '../types/post';

export const getMediumPosts = async (): Promise<Post[]> => {
  const parser = new Parser();
  const { items } = (await parser.parseURL(
    'https://medium.com/feed/@haydenbleasel'
  )) as { items: MediumPost[] };

  const posts: Post[] = items.map((item) => ({
    id: item.guid,
    title: item.title,
    link: `/blog/other/${item.guid}-${slugify(item.title, {
      strict: true,
      lower: true,
    })}`,
    date: item.isoDate,
  }));

  return posts;
};
