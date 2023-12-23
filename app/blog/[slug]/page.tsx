import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Link } from '@/components/link';
import { allBlogs } from '@contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { Mdx } from '@/components/mdx';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/container';
import type { FC } from 'react';
import type { Metadata } from 'next';

type DocPageProps = {
  readonly params: {
    slug: string;
  };
};

export const generateMetadata = ({ params }: DocPageProps): Metadata => {
  const currentPath = params.slug;
  const doc = allBlogs.find(({ slugAsParams }) => slugAsParams === currentPath);

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
    const imageUrl = new URL(doc.image, process.env.NEXT_PUBLIC_SITE_URL).href;
    images.push(imageUrl);
  }

  return (
    <Container>
      <h1 className="mb-0">{doc.title}</h1>
      <p>{doc.description}</p>

      <div className="space-y-8">
        <div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-4">
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
      <hr className="my-8" />
      <Link
        className="flex items-center gap-1 text-xs -left-24 text-zinc-600 dark:text-zinc-400 top-0.5"
        href="/blog"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Blog
      </Link>
    </Container>
  );
};

export default DocPage;
