import type { FC } from 'react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import clsx from 'clsx';
import formatDate from '@/lib/formatDate';

type PostProps = LinkProps & {
  title: string;
  slug?: string;
  description: string;
  date: string;
};

const PostInner: FC<Pick<PostProps, 'title' | 'description' | 'date'>> = ({
  title,
  description,
  date,
}) => (
  <>
    <span className="flex-1">
      <span className="flex-0 flex items-center gap-2 line-clamp-1">
        {title}
      </span>
      <span
        className={clsx(
          'flex-1 text-sm font-light line-clamp-1',
          'text-zinc-500',
          'dark:text-zinc-400'
        )}
      >
        {description}
      </span>
    </span>
    <span
      className={clsx(
        'flex-shrink-0 text-sm font-light sm:leading-[28px]',
        'text-zinc-500',
        'dark:text-zinc-400'
      )}
    >
      {formatDate(new Date(date))}
    </span>
  </>
);

const Post: FC<PostProps> = ({ title, slug, description, date, ...props }) =>
  slug ? (
    <Link
      {...props}
      href={slug}
      className="flex flex-col gap-1 py-2 no-underline sm:flex-row sm:gap-8"
    >
      <PostInner title={title} description={description} date={date} />
    </Link>
  ) : (
    <PostInner title={title} description={description} date={date} />
  );

export default Post;
