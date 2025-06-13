import { Link } from '@/components/link';
import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { allPosts } from 'content-collections';
import { ArrowLeftToLineIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { FC } from 'react';

type PageProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const runtime = 'nodejs';

export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const { slug } = await params;
  const page = allPosts.find((page) => page._meta.path === `blog/${slug}`);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: `/og?title=${page.title}&description=${page.description}`,
  });
};

export const generateStaticParams = (): { slug: string }[] =>
  allPosts.map((page) => ({
    slug: page._meta.path,
  }));

const Page: FC<PageProperties> = async ({ params }) => {
  const { slug } = await params;
  const page = allPosts.find((page) => page._meta.path === `blog/${slug}`);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Section
        className="-ml-28 absolute mt-1 hidden select-none lg:block"
        delay={0.6}
      >
        <Link
          href="/blog"
          className={cn(
            'flex items-center gap-2 text-nowrap text-foreground-lighter text-xs transition-colors',
            'hover:text-foreground'
          )}
        >
          <ArrowLeftToLineIcon size={12} />
          Blog
        </Link>
      </Section>
      <Section className="gap-0">
        <h1>{page.title}</h1>
        <p className="text-foreground-lighter">{page.description}</p>
      </Section>
      {page.image ? (
        <Section>
          <Image
            src={page.image}
            alt={page.title}
            width={1200}
            height={630}
            className="overflow-hidden rounded-lg border border-border/50"
            quality={100}
            priority
          />
        </Section>
      ) : null}
      <article className="grid gap-3">
        <Section delay={0.2}>
          <Mdx code={page.body} />
        </Section>
      </article>
      <Section
        className="grid gap-1 text-foreground-lighter text-sm"
        delay={0.4}
      >
        <p>
          Published on{' '}
          {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
            page.date
          )}
        </p>
        <p>{page.readingTime}</p>
      </Section>
    </>
  );
};

export default Page;
