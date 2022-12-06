import type { ReactNode } from 'react';
import { Fragment } from 'react';
import Post from './post';
import { allBlogs } from '@/.contentlayer/generated';
import Divider from '@/components/divider';
import getDevPosts from '@/lib/dev';

const Blog = async (): Promise<ReactNode> => {
  const devBlogArticles = await getDevPosts();

  return (
    <main className="relative flex flex-col gap-6">
      <h1>Blog</h1>
      <div>
        {allBlogs.map((post, index) => (
          <Fragment key={post.slug}>
            {index > 0 && <Divider />}
            <Post {...post} />
          </Fragment>
        ))}
        <Divider />
        {devBlogArticles.map((post, index) => (
          <Fragment key={post.slug}>
            {index > 0 && <Divider />}
            <Post
              title={post.title}
              slug={post.url}
              date={post.created_at}
              description={post.description}
              target="_blank"
              rel="noopener noreferrer"
            />
          </Fragment>
        ))}
      </div>
    </main>
  );
};

export default Blog;
