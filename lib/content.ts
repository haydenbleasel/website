import { allPages, allPosts } from '@/.content-collections/generated';

export const getPage = (slug: string) => {
  const page = allPages.find(({ _meta }) => _meta.fileName === `${slug}.mdx`);

  return page;
};

export const getPost = (slug: string) => {
  const post = allPosts.find(({ _meta }) => _meta.fileName === `${slug}.mdx`);

  return post;
};
