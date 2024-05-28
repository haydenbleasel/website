import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftToLineIcon } from 'lucide-react';
import { allBlogs } from '@contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { Link } from '@/components/link';
import { Header } from '@/components/header';
import { siteUrl } from '@/lib/consts';
import type { FC } from 'react';
import type { Metadata } from 'next';

type PageProperties = {
  readonly params: {
    slug: string;
  };
};

export const runtime = 'nodejs';

export const generateMetadata = ({ params }: PageProperties): Metadata => {
  const currentPath = params.slug;
  const page = allBlogs.find(
    ({ slugAsParams }) => slugAsParams === currentPath
  );

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
  const page = allBlogs.find(
    ({ slugAsParams }) => slugAsParams === currentPath
  );

  if (!page) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-orange-400">
        <ArrowLeftToLineIcon className="w-4 h-4 text-inherit" />
        <Link
          className="text-inherit text-sm no-underline hover:text-inherit"
          href="/blog"
        >
          Back to blog
        </Link>
      </div>
      <Header title={page.title} description={page.description} />
      {page.image && page.imageBlur ? (
        <Image
          src={page.image}
          width={1920}
          height={1080}
          alt=""
          className="m-0 h-full w-full object-cover rounded overflow-hidden"
          priority
          blurDataURL={`data:image/jpg;base64,${page.imageBlur}`}
          placeholder="blur"
          quality={100}
        />
      ) : undefined}
      <div>
        <Mdx code={page.body.code} />
      </div>
      <hr />
      <p className="text-sm">
        Published on{' '}
        {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
          new Date(page.date)
        )}{' '}
        • {page.readingTime}
      </p>
    </>
  );
};

export default Page;
