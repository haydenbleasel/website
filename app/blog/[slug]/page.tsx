import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { richTextComponents } from '@/lib/rich-text';
import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({ params }: BlogPostProps) => {
  const { slug } = await params;
  const { blog } = await basehub({ cache: 'no-store' }).query({
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
  const { isEnabled } = await draftMode();
  const { slug } = await params;

  return (
    <Pump
      draft={isEnabled}
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
            <Section className="flex flex-col items-center justify-center gap-4 px-4 py-20 sm:px-0">
              <h1 className="text-center font-bold text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
                <Balancer>{post._title}</Balancer>
              </h1>
              <p className="mx-auto max-w-4xl text-center">
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
            </Section>
            <Section className="px-8 py-16">
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
