import type { FC } from 'react';
import Link from 'next/link';
import type { allBlogs } from '@/.contentlayer/generated';
import formatDate from '@/lib/formatDate';

const Post: FC<typeof allBlogs[number]> = ({
  title,
  slug,
  description,
  date,
}) => (
  <Link
    href={slug}
    className="flex flex-col gap-1 py-2 no-underline sm:flex-row sm:gap-8"
  >
    <span className="flex-1 truncate">
      <span className="flex-0 flex items-center gap-2">{title}</span>
      <span className="flex-1 truncate text-sm font-light text-zinc-500 dark:text-zinc-400">
        {description}
      </span>
    </span>
    <span className="flex-shrink-0 text-sm font-light text-zinc-500 sm:leading-[28px]">
      {formatDate(new Date(date))}
    </span>
  </Link>
);

export default Post;
