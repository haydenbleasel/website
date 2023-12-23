import { allBlogs } from '@/.contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { sortBlogPostByDate } from '@/lib/utils';

import { Link } from '@/components/link';
import { Container } from '@/components/container';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/blog',
});

const blogPostsByYear = allBlogs.reduce<Record<number, typeof allBlogs>>(
  (acc, post) => {
    const year = new Date(post.date).getFullYear();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return { ...acc, [year]: [...(acc[year] || []), post] };
  },
  {}
);

const formatBlogDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));

const Blog: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-zinc-200 dark:border-zinc-800">
      {Object.entries(blogPostsByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, posts]) => (
          <div key={year} className="grid grid-cols-4">
            <p className="text-sm p-4 m-0">{year}</p>
            <div className="col-span-3 divide-y divide-zinc-200 dark:divide-zinc-800">
              {posts.sort(sortBlogPostByDate).map((post) => (
                <Link
                  className="flex flex-col no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:flex-row sm:items-center gap-1 sm:gap-4 justify-between p-4"
                  key={post.slug}
                  href={post.slug}
                >
                  <span className="m-0 text-neutral-900 dark:text-white text-sm sm:truncate">
                    {post.title}
                  </span>
                  <span className="w-[7rem] m-0 text-neutral-600 dark:text-neutral-400 text-sm sm:text-right">
                    {formatBlogDate(post.date)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  </Container>
);

export default Blog;
