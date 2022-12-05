import type { FC } from 'react';
import { Fragment } from 'react';
import Post from './post';
import { allBlogs } from '@/.contentlayer/generated';
import Divider from '@/components/divider';

const Blog: FC = () => (
  <main className="flex flex-col gap-6 relative">
    <h1>Blog</h1>
    <div>
      {allBlogs.map((post, index) => (
        <Fragment key={post.slug}>
          {index > 0 && <Divider />}
          <Post {...post} />
        </Fragment>
      ))}
    </div>
  </main>
);

export default Blog;
