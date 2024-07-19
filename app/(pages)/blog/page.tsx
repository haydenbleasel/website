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

const Post: FC<{
  readonly title: string;
  readonly date: string;
  readonly slug: string;
}> = ({ title: postTitle, date, slug }) => (
  <Link
    className="group flex flex-col gap-1 font-normal text-inherit no-underline transition-colors sm:flex-row sm:items-center sm:gap-4 sm:truncate"
    key={slug}
    href={slug}
  >
    <p className="m-0 font-medium text-neutral-950 transition-colors group-hover:text-orange-500 sm:truncate dark:text-white">
      {postTitle}
    </p>
    <hr className="m-0 hidden min-w-7 flex-1 transition-colors group-hover:border-orange-400 sm:block" />
    <p className="m-0 shrink-0 text-sm transition-colors group-hover:text-orange-400">
      {formatBlogDate(date)}
    </p>
  </Link>
);

const Blog: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="mt-8 grid gap-4">
      {allBlogs
        .sort((postA, postB) => (postA.date > postB.date ? -1 : 1))
        .map((post) => (
          <Post
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
          />
        ))}
    </div>
  </>
);

export default Blog;
