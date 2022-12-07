import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import Post from './post';
import { allBlogs } from '@/.contentlayer/generated';
import Divider from '@/components/divider';
import getDevPosts from '@/lib/dev';

const Blog = async (): Promise<ReactNode> => {
  const devBlogArticles = await getDevPosts();

  return (
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
      <div className="grid gap-4">
        <h2>Case Studies</h2>
        <div>
          {allBlogs.map((post, index) => (
            <Fragment key={post.slug}>
              {index > 0 && <Divider />}
              <Post {...post} />
            </Fragment>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <h2>Dev.to posts</h2>
        <div>
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
      </div>
    </main>
  );
};

export default Blog;
