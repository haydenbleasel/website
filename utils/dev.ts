import slugify from 'slugify';
import type { DevPost, DevPostDetailed } from '../types/dev';
import type { Post } from '../types/post';

export const getDevPost = async (id: string): Promise<DevPostDetailed> => {
  const resp = await fetch(`https://dev.to/api/articles/${id}`);
  const data = (await resp.json()) as DevPostDetailed;

  return data;
};

export const getDevPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    'https://dev.to/api/articles?username=haydenbleasel'
  );
  const items = (await response.json()) as DevPost[];
  const posts: Post[] = items.map(({ id, title, published_timestamp }) => ({
    id: `${id}`,
    title,
    date: published_timestamp,
    link: `/blog/code/${id}-${slugify(title, { lower: true, strict: true })}`,
  }));

  return posts;
};
