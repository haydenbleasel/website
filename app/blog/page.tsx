import type { FC } from 'react';
import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import Post from './post';
import { allBlogs } from '@/.contentlayer/generated';
import Divider from '@/components/divider';
import sortBlogPostByDate from '@/lib/sortBlogPost';

const Blog: FC = () => (
  <main className="relative flex flex-col gap-12 prose-h2:m-0 prose-p:m-0">
    <ArticleJsonLd
      useAppDir
      type="Blog"
      url={new URL('/blog', process.env.NEXT_PUBLIC_SITE_URL ?? '').href}
      title="Blog"
      images={[]}
      dateModified={allBlogs[allBlogs.length - 1].date}
      datePublished={allBlogs[0].date}
      description="Thoughts, ideas, and opinions."
      authorName="Hayden Bleasel"
    />
    <h1>Blog</h1>
    <div>
      {allBlogs.sort(sortBlogPostByDate).map((post, index) => (
        <Fragment key={post.slug}>
          {index > 0 && <Divider />}
          <Post {...post} />
        </Fragment>
      ))}
    </div>
  </main>
);

export default Blog;
