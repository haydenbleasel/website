import { Header } from '@/components/header';
import { Link } from '@/components/link';
import { allBlogs } from '@contentlayer/generated';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = {
  title,
  description,
};

const formatBlogDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(date));

const Blog: FC = () => (
  <main className="px-4 py-16 sm:py-32">
    <div className="space-y-12 prose prose-neutral prose-orange mx-auto">
      <Header title={title} description={description} />
      <div className="mt-8 grid gap-4">
        {allBlogs
          .sort((postA, postB) => (postA.date > postB.date ? -1 : 1))
          .map((post) => (
            <Link
              className="flex items-center gap-4 no-underline text-inherit font-normal group transition-colors"
              key={post.slug}
              href={post.slug}
            >
              <p className="m-0 text-neutral-950 font-medium group-hover:text-orange-500 transition-colors">
                {post.title}
              </p>
              <hr className="flex-1 m-0 group-hover:border-orange-400 transition-colors" />
              <p className="m-0 text-sm group-hover:text-orange-400 transition-colors">
                {formatBlogDate(post.date)}
              </p>
            </Link>
          ))}
      </div>
    </div>
  </main>
);

export default Blog;
