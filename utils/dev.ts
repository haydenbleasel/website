import type { DevPost } from '../types/dev';
import type { Post } from '../types/post';

export const getDevPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    'https://dev.to/api/articles?username=haydenbleasel'
  );
  const items = (await response.json()) as DevPost[];
  const posts: Post[] = items.map(
    ({ id, title, published_timestamp, url }) => ({
      id: `${id}`,
      title,
      date: published_timestamp,
      link: url,
    })
  );

  return posts;
};
