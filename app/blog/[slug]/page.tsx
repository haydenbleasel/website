import { allPosts } from 'content-collections';
import { ArrowLeftToLineIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { Link } from '@/components/link';
import { Mdx } from '@/components/mdx';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

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
      <div className="-ml-28 absolute mt-1 hidden select-none lg:block">
        <Link
          className={cn(
            'flex items-center gap-2 text-nowrap text-muted-foreground text-xs transition-colors',
            'hover:text-foreground'
          )}
          href="/blog"
        >
          <ArrowLeftToLineIcon size={12} />
          Blog
        </Link>
      </div>
      <div className="not-prose not-prose mb-12 gap-0">
        <h1 className="font-medium text-4xl">{page.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{page.description}</p>
      </div>
      {page.image ? (
        <div>
          <Image
            alt={page.title}
            className="overflow-hidden rounded-lg border border-border/50"
            height={630}
            priority
            quality={100}
            src={page.image}
            width={1200}
          />
        </div>
      ) : null}
      <article className="grid gap-3">
        <Mdx code={page.body} />
      </article>
      <div className="not-prose mt-12 grid gap-1 text-muted-foreground text-sm">
        <p>
          Published on{' '}
          {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
            page.date
          )}
        </p>
        <p>{page.readingTime}</p>
      </div>
    </>
  );
};

export default Page;
