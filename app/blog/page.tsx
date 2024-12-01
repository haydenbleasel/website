import { Prose } from '@/components/prose';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';
import Image from 'next/image';
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
              _slug: true,
              content: {
                plainText: true,
                readingTime: true,
              },
              date: true,
              featured: true,
              image: {
                url: true,
                width: true,
                height: true,
                alt: true,
              },
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

      const featuredPost = data.blog.posts.items.find((post) => post.featured);
      const remainingPosts = data.blog.posts.items.filter(
        (post) => post !== featuredPost
      );

      return (
        <div className="grid grid-cols-3">
          {featuredPost && (
            <>
              <div className="col-span-2 border-b bg-background">
                {featuredPost.image && (
                  <Image
                    className="col-span-2"
                    src={featuredPost.image.url}
                    width={featuredPost.image.width}
                    height={featuredPost.image.height}
                    alt={featuredPost.image.alt ?? ''}
                  />
                )}
              </div>
              <div className="flex flex-col items-start justify-between gap-4 border-b p-8">
                <div className="flex flex-col gap-2">
                  <small className="text-muted-foreground">Featured post</small>
                  <h2 className="font-bold text-2xl leading-normal tracking-tight">
                    {featuredPost._title}
                  </h2>
                  <Prose className="prose line-clamp-5">
                    {featuredPost.content?.plainText.slice(0, 250)}
                  </Prose>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/blog/${featuredPost._slug}`}>Read more</Link>
                </Button>
              </div>
            </>
          )}
          {remainingPosts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((post, index) => (
              <Link
                key={post._title}
                href={`/blog/${post._slug}`}
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
                  }).format(new Date(post.date))}{' '}
                  &bull; {post.content?.readingTime} min read
                </small>
              </Link>
            ))}
        </div>
      );
    }}
  </Pump>
);

export default Blog;
