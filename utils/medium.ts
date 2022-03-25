import Parser from 'rss-parser';
import slugify from 'slugify';
import type { MediumPost } from '../types/medium';
import type { Post } from '../types/post';

const fetchMediumFeed = async (): Promise<MediumPost[]> => {
  const parser = new Parser();
  const { items } = (await parser.parseURL(
    'https://medium.com/feed/@haydenbleasel'
  )) as { items: MediumPost[] };

  return items;
};

/*
 * import { JSDOM } from "jsdom";
 * import { parseISO, format } from "date-fns";
 *
 * export const formatMediumPost = (post: MediumPost) => {
 * const content = post["content:encoded"];
 * const { document } = new JSDOM(content).window;
 *
 * return {
 *  id: post.guid,
 *  title: post.title,
 *  description: document.querySelector("h4")?.textContent ?? "",
 *  caption: format(parseISO(post.isoDate), "MMMM d, yyyy"),
 *  image:
 *    document.querySelector("img")?.src.replace("max/1024", "max/3840") ?? "",
 *  link: post.link,
 *  date: post.isoDate,
 *  tags: post.categories,
 *  content,
 * };
 * };
 */

export const getMediumPost = async (id: string): Promise<MediumPost> => {
  const feed = await fetchMediumFeed();
  const post = feed.find((item) => item.guid === id);

  if (!post) {
    throw new Error(`Could not find post with id ${id}`);
  }

  return post;
};

export const getMediumPosts = async (): Promise<Post[]> => {
  const feed = await fetchMediumFeed();

  const posts: Post[] = feed.map((item) => ({
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
