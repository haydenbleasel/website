import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { HeroSection } from '@/components/sections/hero';
import { basehub } from '@/lib/basehub';
import { richTextComponents } from '@/lib/rich-text';
import { cn } from '@/lib/utils';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({ params }: BlogPostProps) => {
  const { slug } = await params;
  const { blog } = await basehub.query({
    blog: {
      posts: {
        __args: {
          filter: {
            _sys_slug: {
              eq: slug,
            },
          },
        },
        items: {
          _title: true,
          description: true,
          ogImage: {
            url: true,
          },
        },
      },
    },
  });

  if (!blog.posts.items.length) {
    return {};
  }

  const [post] = blog.posts.items;

  return {
    title: post._title,
    description: post.description,
    openGraph: {
      images: [post.ogImage.url],
    },
  };
};

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = await params;

  return (
    <Pump
      queries={[
        {
          __typename: true,
          blog: {
            posts: {
              __args: {
                filter: {
                  _sys_slug: {
                    eq: slug,
                  },
                },
              },
              items: {
                _title: true,
                _slug: true,
                description: true,
                date: true,
                content: {
                  json: {
                    content: true,
                  },
                  readingTime: true,
                },
                image: {
                  url: true,
                  alt: true,
                  width: true,
                  height: true,
                },
              },
            },
          },
        },
      ]}
    >
      {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
      {async ([data]) => {
        'use server';

        if (!data.blog.posts.items.length) {
          return notFound();
        }

        const post = data.blog.posts.items[0];

        return (
          <>
            <HeroSection title={post._title}>
              <p className="mx-auto max-w-4xl sm:text-center">
                <Balancer>{post.description}</Balancer>
              </p>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <p>
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(new Date(post.date))}
                </p>
                <p>&bull;</p>
                <p>{post.content?.readingTime} min read</p>
              </div>
            </HeroSection>
            <Section className={cn('px-4 py-8', 'sm:px-8 sm:py-16')}>
              <Prose className="mx-auto max-w-3xl">
                <RichText
                  content={post.content?.json.content}
                  components={richTextComponents}
                />
              </Prose>
            </Section>
          </>
        );
      }}
    </Pump>
  );
};

export default BlogPost;
