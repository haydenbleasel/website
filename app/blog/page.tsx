import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { basehub } from '@/lib/basehub';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';
import groupBy from 'lodash.groupby';
import Link from 'next/link';

export const generateMetadata = async () => {
  const { blog } = await basehub.query({
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
      const remainingPostsByYear = groupBy(remainingPosts, (post) =>
        new Date(post.date).getFullYear()
      );

      return (
        <Section className="divide-y border-t">
          {featuredPost && (
            <div className="grid sm:grid-cols-3">
              <div className="bg-background sm:col-span-2">
                {featuredPost.image && (
                  <ViewAnimation
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <BaseHubImage
                      className="sm:col-span-2"
                      src={featuredPost.image.url}
                      width={featuredPost.image.width}
                      height={featuredPost.image.height}
                      alt={featuredPost.image.alt ?? ''}
                    />
                  </ViewAnimation>
                )}
              </div>
              <div className="h-full">
                <ViewAnimation
                  initial={{ opacity: 0, translateY: -8 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  delay={0.4}
                  className={cn(
                    'flex h-full flex-col items-start justify-between gap-4 px-4 py-8',
                    'sm:px-8'
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <small className="text-muted-foreground">
                      Featured post
                    </small>
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
                </ViewAnimation>
              </div>
            </div>
          )}
          {Object.entries(remainingPostsByYear)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, posts]) => (
              <div
                className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                key={year}
              >
                <div className="bg-dashed">
                  <div className={cn('sticky top-16 px-4 py-8', 'sm:px-8')}>
                    <h2 className="font-bold text-2xl leading-normal tracking-tight">
                      {year}
                    </h2>
                  </div>
                </div>
                <div className="divide-y sm:col-span-2">
                  {posts
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((post) => (
                      <Link
                        key={post._title}
                        href={`/blog/${post._slug}`}
                        className="block transition-colors hover:bg-background"
                      >
                        <ViewAnimation
                          initial={{ opacity: 0, translateY: -8 }}
                          whileInView={{ opacity: 1, translateY: 0 }}
                          className={cn(
                            'flex flex-col gap-2 px-4 py-8',
                            'sm:px-8'
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
                        </ViewAnimation>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </Section>
      );
    }}
  </Pump>
);

export default Blog;
