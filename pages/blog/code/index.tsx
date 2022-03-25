import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { getDevPosts } from '../../../utils/dev';
import type { Post } from '../../../types/post';
import BlogTemplate from '../../../templates/blog';

type BlogData = {
  posts: Post[];
};

const Blog: FC<BlogData> = ({ posts }) => <BlogTemplate posts={posts} />;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getDevPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
