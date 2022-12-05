import Link from 'next/link';
import type { FC } from 'react';
import { Fragment } from 'react';
import { allWorkPosts } from '@/.contentlayer/generated';
import Divider from '@/components/divider';

const sortByEndYear = (
  roleA: typeof allWorkPosts[number],
  roleB: typeof allWorkPosts[number]
) => {
  if (!roleA.endYear) {
    return -1;
  }

  if (!roleB.endYear) {
    return 1;
  }

  return roleB.endYear > roleA.endYear ? 1 : -1;
};

const Role: FC<typeof allWorkPosts[number]> = ({
  company,
  role,
  slug,
  startYear,
  endYear,
}) => (
  <Link
    href={slug}
    className="flex flex-col gap-2 py-2 no-underline sm:flex-row sm:gap-8"
  >
    <span className="flex-0 flex items-center gap-2">
      {role} at {company}
    </span>
    <span className="flex-1 truncate font-light text-zinc-500 dark:text-zinc-400 sm:text-right">
      {startYear} &mdash; {endYear ?? 'Present'}
    </span>
  </Link>
);

const Work: FC = () => (
  <main className="relative flex flex-col gap-6">
    <h1>Work</h1>
    <div>
      {allWorkPosts.sort(sortByEndYear).map((post, index) => (
        <Fragment key={post.slug}>
          {index > 0 && <Divider />}
          <Role {...post} />
        </Fragment>
      ))}
    </div>
  </main>
);

export default Work;
