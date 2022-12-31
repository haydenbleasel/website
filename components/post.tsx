import type { FC, HTMLProps } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import formatDate from '@/lib/formatDate';

type PostProps = {
  title: string;
  slug?: string;
  description: string;
  date: string;
  rel?: HTMLProps<HTMLAnchorElement>['rel'];
  target?: HTMLProps<HTMLAnchorElement>['target'];
};

const PostInner: FC<Pick<PostProps, 'title' | 'description' | 'date'>> = ({
  title,
  date,
}) => (
  <>
    <span className="flex-1 font-medium text-zinc-900 line-clamp-1 dark:text-white">
      {title}
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

const Post: FC<PostProps> = ({ title, slug, description, date, rel, target }) =>
  slug ? (
    <Link
      rel={rel}
      target={target}
      href={slug}
      className="flex flex-col gap-1 py-2 no-underline sm:flex-row sm:gap-8"
    >
      <PostInner title={title} description={description} date={date} />
    </Link>
  ) : (
    <div className="flex flex-col gap-1 py-2 no-underline sm:flex-row sm:gap-8">
      <PostInner title={title} description={description} date={date} />
    </div>
  );

export default Post;
