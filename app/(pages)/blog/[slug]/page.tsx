import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftToLineIcon } from 'lucide-react';
import { allBlogs } from '@contentlayer/generated';
import { Mdx } from '@/components/mdx';
import { Link } from '@/components/link';
import { Header } from '@/components/header';
import type { FC } from 'react';
import type { Metadata } from 'next';

type DocPageProps = {
  readonly params: {
    slug: string;
  };
};

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

if (!siteUrl) {
  throw new Error('VERCEL_PROJECT_PRODUCTION_URL is not set');
}

export const generateMetadata = ({ params }: DocPageProps): Metadata => {
  const currentPath = params.slug;
  const doc = allBlogs.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: doc.image
      ? {
          images: [
            {
              url: new URL(doc.image, siteUrl).href,
              width: 1920,
              height: 1080,
              alt: doc.title,
            },
          ],
        }
      : undefined,
  };
};

export const generateStaticParams = (): DocPageProps['params'][] =>
  allBlogs.map((doc) => ({
    slug: doc.slug,
  }));

const DocPage: FC<DocPageProps> = ({ params }) => {
  const currentPath = params.slug;
  const doc = allBlogs.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!doc) {
    notFound();
  }

  const images: string[] = [];

  if (doc.image) {
    const imageUrl = new URL(doc.image, siteUrl).href;
    images.push(imageUrl);
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
      <Header title={doc.title} description={doc.description} />
      {doc.image && doc.imageBlur ? (
        <Image
          src={doc.image}
          width={1920}
          height={1080}
          alt=""
          className="m-0 h-full w-full object-cover rounded overflow-hidden"
          priority
          blurDataURL={`data:image/jpg;base64,${doc.imageBlur}`}
          placeholder="blur"
          quality={100}
        />
      ) : null}
      <div>
        <Mdx code={doc.body.code} />
      </div>
      <hr />
      <p className="text-sm">
        Published on{' '}
        {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
          new Date(doc.date)
        )}{' '}
        • {doc.readingTime}
      </p>
    </>
  );
};

export default DocPage;
