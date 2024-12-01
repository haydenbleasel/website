import { Prose } from '@/components/prose';
import { cn } from '@/lib/utils';
import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';
import Link from 'next/link';

export const generateMetadata = async () => {
  const { blog } = await basehub({ cache: 'no-store' }).query({
    blog: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });

  return {
    title: blog.metadata.title,
    description: blog.metadata.description,
  };
};

const Blog = () => (
  <Pump
    queries={[
      {
        __typename: true,
        blog: {
          posts: {
            items: {
              _title: true,
              content: {
                plainText: true,
                readingTime: true,
              },
              date: true,
            },
          },
        },
      },
    ]}
  >
    {async ([data]) => {
      'use server';

      if (!data.blog.posts.items.length) {
        return <div>No posts found</div>;
      }

      return (
        <div className="grid grid-cols-3">
          {data.blog.posts.items
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((post, index) => (
              <Link
                key={post._title}
                href={`/blog/${post._title}`}
                className={cn(
                  'flex flex-col gap-2 p-8 transition-colors hover:bg-background',
                  index % 3 !== 2 && 'border-r',
                  index > 2 && 'border-t'
                )}
              >
                <h2 className="font-bold text-lg leading-normal tracking-tight">
                  {post._title}
                </h2>
                <Prose className="prose-sm line-clamp-3">
                  {post.content?.plainText.slice(0, 250)}
                </Prose>
                <small className="text-muted-foreground text-xs">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(new Date(post.date))}
                </small>
              </Link>
            ))}
        </div>
      );
    }}
  </Pump>
);

export default Blog;
