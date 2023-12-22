import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Link } from '@/components/link';
import { allWorks } from '@contentlayer/generated';
import { createMetadata } from '@/lib/metadata';
import { Mdx } from '@/components/mdx';
import { cn } from '@/lib/utils';
import type { FC } from 'react';
import type { Metadata } from 'next';

type WorkPageProps = {
  readonly params: {
    slug: string;
  };
};

export const generateMetadata = ({ params }: WorkPageProps): Metadata => {
  const currentPath = params.slug;
  const job = allWorks.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!job) {
    return {};
  }

  return createMetadata({
    title: `${job.role} at ${job.company}`,
    description: `I worked at ${job.company} as a ${job.role} from ${
      job.startYear
    } to ${job.endYear ?? 'Present'}.`,
    path: job.slug,
  });
};

export const generateStaticParams = (): WorkPageProps['params'][] =>
  allWorks.map((job) => ({
    slug: job.slug,
  }));

const WorkPage: FC<WorkPageProps> = ({ params }) => {
  const currentPath = params.slug;
  const job = allWorks.find(({ slugAsParams }) => slugAsParams === currentPath);

  if (!job) {
    notFound();
  }

  const images: string[] = [];

  if (job.image) {
    const imageUrl = new URL(job.image, process.env.NEXT_PUBLIC_SITE_URL).href;
    images.push(imageUrl);
  }

  return (
    <div className="flex flex-col gap-8 relative">
      {job.image && job.imageBlur ? (
        <Image
          src={job.image}
          width={1920}
          height={1080}
          alt=""
          className={cn(
            'm-0 h-8 w-8 object-cover rounded-full overflow-hidden absolute -top-16 ring-2 left-6',
            'ring-zinc-100',
            'dark:ring-zinc-950'
          )}
          priority
          blurDataURL={`data:image/jpg;base64,${job.imageBlur}`}
          placeholder="blur"
        />
      ) : null}
      <div>
        <div className="relative">
          <Link
            className="absolute inline-flex items-center gap-1 text-xs -left-24 text-zinc-600 dark:text-zinc-400 top-0.5"
            href="/work"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Work
          </Link>
          <h1 className="m-0 text-sm text-zinc-900 dark:text-white font-medium">
            {job.role}
          </h1>
        </div>
        <p className="my-1 mb-0">{job.company}</p>
        <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-4">
          {job.startYear} &mdash; {job.endYear ?? 'Present'} • {job.location}
        </p>
      </div>
      <div>
        <Mdx code={job.body.code} />
      </div>
    </div>
  );
};

export default WorkPage;
