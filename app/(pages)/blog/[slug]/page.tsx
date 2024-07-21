import { Header } from '@/components/header';
import { Link } from '@/components/link';
import { Mdx } from '@/components/mdx';
import { siteUrl } from '@/lib/consts';
import { allBlogs } from 'content-collections';
import { ArrowLeftToLineIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { FC } from 'react';

type PageProperties = {
  readonly params: {
    slug: string;
  };
};

export const runtime = 'nodejs';

export const generateMetadata = ({ params }: PageProperties): Metadata => {
  const currentPath = params.slug;
  const page = allBlogs.find(({ slug }) => slug === currentPath);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: page.image
      ? {
          images: [
            {
              url: new URL(page.image, siteUrl).href,
              width: 1920,
              height: 1080,
              alt: page.title,
            },
          ],
        }
      : undefined,
  };
};

export const generateStaticParams = (): PageProperties['params'][] =>
  allBlogs.map((page) => ({
    slug: page.slug,
  }));

const Page: FC<PageProperties> = ({ params }) => {
  const currentPath = params.slug;
  const page = allBlogs.find(({ slug }) => slug === currentPath);

  if (!page) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center gap-2 text-neutral-500 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400">
        <ArrowLeftToLineIcon className="h-4 w-4 text-inherit" />
        <Link
          className="text-inherit text-sm no-underline hover:text-inherit"
          href="/blog"
        >
          Back to blog
        </Link>
      </div>
      <Header title={page.title} description={page.description} />
      {page.image ? (
        <Image
          src={page.image}
          width={1920}
          height={1080}
          alt=""
          className="m-0 h-full w-full overflow-hidden rounded object-cover"
          priority
          quality={100}
        />
      ) : undefined}
      <div>
        <Mdx code={page.body} />
      </div>
      <hr />
      <p className="text-sm">
        Published on{' '}
        {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
          page.date
        )}{' '}
        • {page.readingTime}
      </p>
    </>
  );
};

export default Page;
