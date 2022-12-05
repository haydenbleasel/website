import Link from 'next/link';
import type { FC } from 'react';
import { Fragment } from 'react';
import { allBlogs } from '@/.contentlayer/generated';
import Divider from '@/components/divider';
import formatDate from '@/lib/formatDate';

const Post: FC<typeof allBlogs[number]> = ({
  title,
  slug,
  description,
  date,
}) => (
  <Link
    href={slug}
    className="no-underline flex flex-col gap-1 py-2 sm:flex-row sm:gap-8"
  >
    <span className="flex-1 truncate">
      <span className="flex-0 flex items-center gap-2">{title}</span>
      <span className="truncate font-light text-sm flex-1 text-gray-500 dark:text-gray-400">
        {description}
      </span>
    </span>
    <span className="flex-shrink-0 text-gray-500 text-sm sm:leading-[28px] font-light">
      {formatDate(new Date(date))}
    </span>
  </Link>
);

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
