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
    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 no-underline text-inherit font-normal group transition-colors sm:truncate"
    key={slug}
    href={slug}
  >
    <p className="m-0 sm:truncate text-neutral-950 dark:text-white font-medium group-hover:text-orange-500 transition-colors">
      {postTitle}
    </p>
    <hr className="hidden sm:block min-w-7 flex-1 m-0 group-hover:border-orange-400 transition-colors" />
    <p className="shrink-0 m-0 text-sm group-hover:text-orange-400 transition-colors">
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
