import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Link } from '@/components/link';
import { allApps } from '@contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { Mdx } from '@/components/mdx';
import { formatDate } from '@/lib/utils';
import type { FC } from 'react';
import type { Metadata } from 'next';

type DocPageProps = {
  readonly params: {
    slug: string;
  };
};

export const generateMetadata = ({ params }: DocPageProps): Metadata => {
  const currentPath = params.slug;
  const doc = allApps.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!doc) {
    return {};
  }

  return createMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.slug,
    image: doc.image,
  });
};

export const generateStaticParams = (): DocPageProps['params'][] =>
  allApps.map((doc) => ({
    slug: doc.slug,
  }));

const DocPage: FC<DocPageProps> = ({ params }) => {
  const currentPath = params.slug;
  const doc = allApps.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!doc) {
    notFound();
  }

  const images: string[] = [];

  if (doc.image) {
    const imageUrl = new URL(doc.image, process.env.NEXT_PUBLIC_SITE_URL).href;
    images.push(imageUrl);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="relative">
          <Link
            className="absolute inline-flex items-center gap-1 text-xs -left-24 text-neutral-600 dark:text-neutral-400 top-0.5"
            href="/apps"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Apps
          </Link>
          <h1 className="m-0 text-sm text-neutral-900 dark:text-white font-medium">
            {doc.title}
          </h1>
        </div>
        <p className="my-1 mb-0">{doc.description}</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-4">
          Published on {formatDate(doc.date)} • {doc.readingTime}
        </p>
      </div>
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
        />
      ) : null}
      <div>
        <Mdx code={doc.body.code} />
      </div>
    </div>
  );
};

export default DocPage;
