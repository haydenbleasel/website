import { allBlogs } from '@/.contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { formatDate, sortBlogPostByDate } from '@/lib/utils';
import { Section } from '@/components/section';
import { Link } from '@/components/link';
import { Container } from '@/components/container';
import type { FC } from 'react';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata = createMetadata({ title, description, path: '/blog' });

const blogPostsByYear = allBlogs.reduce<Record<number, typeof allBlogs>>(
  (acc, post) => {
    const year = new Date(post.date).getFullYear();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return { ...acc, [year]: [...(acc[year] || []), post] };
  },
  {}
);

const Blog: FC = () => (
  <Container wide>
    <section className="flex flex-col gap-1">
      <p className="m-0 text-neutral-900 dark:text-white font-medium text-sm">
        {title}
      </p>
      <p className="m-0 text-neutral-600 dark:text-neutral-400 text-sm">
        {description}
      </p>
    </section>
    <div className="flex flex-col gap-2">
      {Object.entries(blogPostsByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, posts]) => (
          <Section title={year} key={year}>
            {posts.sort(sortBlogPostByDate).map((post) => (
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 justify-between"
                key={post.slug}
              >
                <Link
                  className="m-0 text-neutral-900 dark:text-white text-sm sm:truncate"
                  href={post.slug}
                >
                  {post.title}
                </Link>
                <p className="w-[7rem] m-0 text-neutral-600 dark:text-neutral-400 text-xs sm:text-right">
                  {formatDate(post.date)}
                </p>
              </div>
            ))}
          </Section>
        ))}
    </div>
  </Container>
);

export default Blog;
