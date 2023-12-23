import { allWorks } from '@/.contentlayer/generated';
import { createMetadata } from '@/lib/metadata';

import { Link } from '@/components/link';
import { Container } from '@/components/container';
import type { Work } from '@/.contentlayer/generated';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/blog',
});

const workPostsByYear = allWorks.reduce<Record<number, typeof allWorks>>(
  (acc, post) => {
    const year = post.startYear;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return { ...acc, [year]: [...(acc[year] || []), post] };
  },
  {}
);

const sortWorkPostByDate = (roleA: Work, roleB: Work): number =>
  roleB.startYear > roleA.startYear ? 1 : -1;

const WorkPage: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-zinc-200 dark:border-zinc-800">
      {Object.entries(workPostsByYear)
        .sort(([yearA], [yearB]) => yearB - yearA)
        .map(([year, posts]) => (
          <div key={year} className="grid grid-cols-4">
            <p className="text-sm p-4 m-0">{year}</p>
            <div className="col-span-3 divide-y divide-zinc-200 dark:divide-zinc-800">
              {posts.sort(sortWorkPostByDate).map((post) => (
                <Link
                  className="flex flex-col no-underline hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:flex-row sm:items-center gap-1 sm:gap-4 justify-between p-4"
                  key={post.slug}
                  href={post.slug}
                >
                  <span className="m-0 text-neutral-900 dark:text-white text-sm sm:truncate">
                    {post.role}, {post.company}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  </Container>
);

export default WorkPage;
