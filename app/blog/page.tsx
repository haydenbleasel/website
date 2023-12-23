import Image from 'next/image';
import { CalendarIcon } from '@radix-ui/react-icons';
import { allBlogs } from '@/.contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { formatDate, sortBlogPostByDate } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

const Blog: FC = () => (
  <Container wide>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <div className="mt-8 grid grid-cols-2 gap-8">
      {allBlogs.sort(sortBlogPostByDate).map((post) => (
        <Link
          href={post.slug}
          key={post.slug}
          className="no-underline hover:-translate-y-1 transition-transform"
        >
          <Card className="not-prose overflow-hidden bg-white dark:bg-zinc-800">
            {post.image ? (
              <Image
                src={post.image}
                alt=""
                width={1200}
                height={600}
                unoptimized
              />
            ) : null}
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {post.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  {formatDate(post.date)}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </Container>
);

export default Blog;
